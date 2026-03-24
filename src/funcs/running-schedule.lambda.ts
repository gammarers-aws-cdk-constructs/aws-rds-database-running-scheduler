import {
  type DurableContext,
  withDurableExecution,
} from '@aws/durable-execution-sdk-js';
import {
  DescribeDBClustersCommand,
  DescribeDBInstancesCommand,
  RDSClient,
  StartDBClusterCommand,
  StartDBInstanceCommand,
  StopDBClusterCommand,
  StopDBInstanceCommand,
} from '@aws-sdk/client-rds';
import {
  GetResourcesCommand,
  type ResourceTagMapping,
  ResourceGroupsTaggingAPIClient,
} from '@aws-sdk/client-resource-groups-tagging-api';
import { WebClient } from '@slack/web-api';
import { secretFetcher } from 'aws-lambda-secret-fetcher';
import { SafeEnvGetter } from 'safe-env-getter';

/**
 * Canonical status labels and emojis used in Slack notifications.
 */
const STATE_LIST = [
  { name: 'AVAILABLE', emoji: '🤩', state: 'available' },
  { name: 'STOPPED', emoji: '😴', state: 'stopped' },
] as const;

/**
 * RDS statuses that indicate an in-progress transition.
 */
const TRANSITIONING_STATES = [
  'starting',
  'configuring-enhanced-monitoring',
  'backing-up',
  'modifying',
  'stopping',
] as const;

/**
 * Event payload for scheduled start/stop execution.
 */
interface ScheduleEvent {
  Params: {
    TagKey: string;
    TagValues: string[];
    Mode: 'Start' | 'Stop';
  };
}

/**
 * Parsed metadata for an RDS resource ARN.
 */
interface TargetInfo {
  targetResource: string;
  identifier: string;
  type: 'db' | 'cluster';
  account: string;
  region: string;
}

/**
 * Secret shape used to access Slack Web API.
 */
interface SlackSecret {
  token: string;
  channel: string;
}

/**
 * Processing result for a single RDS resource.
 */
interface ProcessingResult {
  resource: string;
  status: string;
  account: string;
  region: string;
  identifier: string;
  type: 'db' | 'cluster';
}

/**
 * Parses an RDS ARN and extracts targeting metadata.
 *
 * @param arn Full RDS resource ARN.
 * @returns Parsed resource information used by the workflow.
 */
const parseArn = (arn: string): TargetInfo => {
  const parts = arn.split(':');
  return {
    targetResource: arn,
    identifier: parts[6] ?? '',
    type: (parts[5] === 'cluster' ? 'cluster' : 'db') as 'db' | 'cluster',
    account: parts[4] ?? '',
    region: parts[3] ?? '',
  };
};

/**
 * Converts a raw RDS status into a display-friendly label for Slack.
 *
 * @param current Current RDS status string.
 * @returns Emoji and name pair when a known status is found, otherwise `undefined`.
 */
const getStateDisplay = (current: string): { emoji: string; name: string } | undefined => {
  const found = STATE_LIST.find((s) => s.state === current);
  return found ? { emoji: found.emoji, name: found.name } : undefined;
};


/**
 * Processes one RDS resource until it reaches a stable state.
 *
 * The function polls status, triggers start/stop when needed, and waits while
 * the resource is transitioning.
 *
 * @param context Durable execution context.
 * @param targetResource Target RDS resource ARN.
 * @param mode Requested operation mode.
 * @returns Final processing result including status and resource metadata.
 */
const processing = async (
  context: DurableContext,
  targetResource: string,
  mode: 'Start' | 'Stop',
): Promise<ProcessingResult> => {
  const target = await context.step('get-identifier', async () => parseArn(targetResource));

  const rds = new RDSClient({});
  let iteration = 0;

  for (;;) {
    const stepName = `describe-${target.type}-${target.identifier}-${iteration}`;
    const statusResult = await context.step(stepName, async () => {
      if (target.type === 'db') {
        const res = await rds.send(new DescribeDBInstancesCommand({ DBInstanceIdentifier: target.identifier }));
        const current = res.DBInstances?.[0]?.DBInstanceStatus;
        if (current == null) {
          throw new Error(`DB instance not found: ${target.identifier}`);
        }
        return { current, type: target.type as string, identifier: target.identifier };
      }
      try {
        const res = await rds.send(new DescribeDBClustersCommand({ DBClusterIdentifier: target.identifier }));
        const current = res.DBClusters?.[0]?.Status;
        if (current == null) {
          return { current: 'not-found', type: target.type as string, identifier: target.identifier };
        }
        return { current, type: target.type as string, identifier: target.identifier };
      } catch (err: unknown) {
        const code = err && typeof err === 'object' && 'name' in err ? (err as { name: string }).name : '';
        if (code === 'DBClusterNotFoundFault' || code === 'DbClusterNotFoundException') {
          return { current: 'not-found', type: target.type as string, identifier: target.identifier };
        }
        throw err;
      }
    });
    iteration += 1;

    if (statusResult.current === 'not-found') {
      return { resource: targetResource, status: 'skipped', account: target.account, region: target.region, identifier: target.identifier, type: target.type };
    }

    const current = statusResult.current;
    const isDb = target.type === 'db';
    const isCluster = target.type === 'cluster';

    const needStart = mode === 'Start' && current === 'stopped';
    const needStop = mode === 'Stop' && current === 'available';
    const alreadyDone =
      (mode === 'Start' && (current === 'available')) || (mode === 'Stop' && current === 'stopped');
    const isTransitioning = TRANSITIONING_STATES.includes(current as (typeof TRANSITIONING_STATES)[number]);

    if (needStart && isDb) {
      await context.step(`start-db-${target.identifier}`, async () => {
        await rds.send(new StartDBInstanceCommand({ DBInstanceIdentifier: target.identifier }));
      });
      await context.wait({ seconds: 60 });
      continue;
    }
    if (needStart && isCluster) {
      await context.step(`start-cluster-${target.identifier}`, async () => {
        await rds.send(new StartDBClusterCommand({ DBClusterIdentifier: target.identifier }));
      });
      await context.wait({ seconds: 60 });
      continue;
    }
    if (needStop && isDb) {
      await context.step(`stop-db-${target.identifier}`, async () => {
        await rds.send(new StopDBInstanceCommand({ DBInstanceIdentifier: target.identifier }));
      });
      await context.wait({ seconds: 60 });
      continue;
    }
    if (needStop && isCluster) {
      await context.step(`stop-cluster-${target.identifier}`, async () => {
        await rds.send(new StopDBClusterCommand({ DBClusterIdentifier: target.identifier }));
      });
      await context.wait({ seconds: 60 });
      continue;
    }
    if (alreadyDone) {
      return {
        resource: targetResource,
        status: current,
        account: target.account,
        region: target.region,
        identifier: target.identifier,
        type: target.type,
      };
    }
    if (isTransitioning) {
      await context.wait({ seconds: 60 });
      continue;
    }

    throw new Error(`db instance or cluster status fail: type=${target.type} identifier=${target.identifier} current=${current}`);
  }
};

/**
 * Scheduled Lambda handler that finds tagged RDS resources, applies
 * start/stop actions, and posts progress/results to Slack.
 *
 * @param event Scheduler event payload containing tag filters and operation mode.
 * @param context Durable execution context from the durable execution SDK.
 * @returns Processed resource count and per-resource results.
 */
export const handler = withDurableExecution(
  async (event: ScheduleEvent, context: DurableContext) => {
    const params = event.Params;
    if (!params?.TagKey || !params?.TagValues || !params?.Mode) {
      throw new Error('Invalid event: Params.TagKey, Params.TagValues, Params.Mode are required.');
    }
    // safe get Secrets name from environment variable
    const slackSecretName = SafeEnvGetter.getEnv('SLACK_SECRET_NAME');

    const slackSecretValue = await context.step('fetch-slack-secret', async () => {
      return secretFetcher.getSecretValue<SlackSecret>(slackSecretName);
    });

    const targetResources = await context.step('get-resources', async () => {
      const client = new ResourceGroupsTaggingAPIClient({});
      const response = await client.send(
        new GetResourcesCommand({
          ResourceTypeFilters: ['rds:db', 'rds:cluster'],
          TagFilters: [{ Key: params.TagKey, Values: params.TagValues }],
        }),
      );
      return (response.ResourceTagMappingList ?? []).map((m: ResourceTagMapping) => m.ResourceARN ?? '').filter(Boolean);
    });

    if (targetResources.length === 0) {
      return { processed: 0, results: [] };
    }

    const client = new WebClient(slackSecretValue.token);
    const channel = slackSecretValue.channel;

    // send slack message
    const slackParentMessageResult = await context.step('post-slack-messages', async () => {
      return client.chat.postMessage({
        channel,
        text: `${params.Mode === 'Start' ? '😆 Starts' : '🥱 Stops'} the scheduled RDS Database or Cluster.`,
      });
    });

    const results = await context.map(
      targetResources,
      async (ctx: DurableContext, targetResource: string, index: number) => {
        return ctx.runInChildContext(`resource-${index}`, async (childCtx: DurableContext) => {
          const result = await processing(childCtx, targetResource, params.Mode);
          if (result.status === 'skipped') {
            return result;
          }
          // send slack thread message
          await childCtx.step('post-slack-child-messages', async () => {
            const display = getStateDisplay(result.status);

            return client.chat.postMessage({
              channel,
              thread_ts: slackParentMessageResult?.ts,
              attachments: [
                {
                  color: '#36a64f',
                  pretext: `${display?.emoji} The status of the RDS ${result.type} changed to ${display?.name} due to the schedule.`,
                  fields: [
                    { title: 'Account', value: result.account, short: true },
                    { title: 'Region', value: result.region, short: true },
                    { title: 'Type', value: result.type, short: true },
                    { title: 'Identifier', value: result.identifier, short: true },
                    { title: 'Status', value: (display?.name ?? 'Unknown'), short: true },
                  ],
                },
              ],
            });
          });
          return result;
        });
      },
      { maxConcurrency: 10 },
    );

    return { processed: results.totalCount, results: results.getResults() };
  },
);
