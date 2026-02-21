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

const STATE_LIST = [
  { name: 'AVAILABLE', emoji: '🤩', state: 'available' },
  { name: 'STOPPED', emoji: '😴', state: 'stopped' },
] as const;

const TRANSITIONING_STATES = [
  'starting',
  'configuring-enhanced-monitoring',
  'backing-up',
  'modifying',
  'stopping',
] as const;

interface ScheduleEvent {
  Params: {
    TagKey: string;
    TagValues: string[];
    Mode: 'Start' | 'Stop';
  };
}

interface TargetInfo {
  targetResource: string;
  identifier: string;
  type: 'db' | 'cluster';
  account: string;
  region: string;
}

interface SlackSecret {
  token: string;
  channel: string;
}

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

const getStateDisplay = (current: string): { emoji: string; name: string } | undefined => {
  const found = STATE_LIST.find((s) => s.state === current);
  return found ? { emoji: found.emoji, name: found.name } : undefined;
};


const processing = async (
  context: DurableContext,
  targetResource: string,
  mode: 'Start' | 'Stop',
): Promise<{ resource: string; status: string; account: string; region: string; identifier: string; type: 'db' | 'cluster' }> => {
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

export const handler = withDurableExecution(
  async (event: ScheduleEvent, context: DurableContext) => {
    const params = event.Params;
    if (!params?.TagKey || !params?.TagValues || !params?.Mode) {
      throw new Error('Invalid event: Params.TagKey, Params.TagValues, Params.Mode are required.');
    }
    const slackSecretName = process.env.SLACK_SECRET_NAME;
    if (!slackSecretName) {
      throw new Error('missing environment variable SLACK_SECRET_NAME.');
    }
    const slackSecretValue = await context.step('fetch-slack-secret', async () => {
      return secretFetcher.getSecretValue<SlackSecret>(slackSecretName);
    });

    if (!slackSecretValue?.token || !slackSecretValue?.channel) {
      throw new Error('Slack secret must contain token and channel.');
    }

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
