import { Duration, RemovalPolicy, TimeZone } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import * as targets from 'aws-cdk-lib/aws-scheduler-targets';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { RunningScheduleFunction } from '../funcs/running-schedule-function';

export interface Schedule {
  readonly timezone: TimeZone;
  readonly minute?: string;
  readonly hour?: string;
  readonly week?: string;
}

export interface TargetResource {
  readonly tagKey: string;
  readonly tagValues: string[];
}

export interface Secrets {
  readonly slackSecretName: string;
}

export interface RDSDatabaseRunningSchedulerProps {
  readonly targetResource: TargetResource;
  readonly enableScheduling?: boolean;
  readonly secrets: Secrets;
  readonly stopSchedule?: Schedule;
  readonly startSchedule?: Schedule;
}

export class RDSDatabaseRunningScheduler extends Construct {
  constructor(scope: Construct, id: string, props: RDSDatabaseRunningSchedulerProps) {
    super(scope, id);

    const slackSecret = Secret.fromSecretNameV2(this, 'SlackSecret', props.secrets.slackSecretName);

    // 👇 Lambda Function
    const runningScheduleFunction = new RunningScheduleFunction(this, 'RunningScheduleFunction', {
      description: 'A function to run the scheduled RDS Database or Cluster.',
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.minutes(15),
      memorySize: 512,
      retryAttempts: 2,
      durableConfig: {
        executionTimeout: Duration.hours(2),
        retentionPeriod: Duration.days(1),
      },
      environment: {
        SLACK_SECRET_NAME: props.secrets.slackSecretName,
      },
      paramsAndSecrets: lambda.ParamsAndSecretsLayerVersion.fromVersion(lambda.ParamsAndSecretsVersions.V1_0_103, {
        cacheSize: 500,
        logLevel: lambda.ParamsAndSecretsLogLevel.INFO,
      }),
      role: new iam.Role(this, 'RunningScheduleFunctionRole', {
        description: 'A role to control the RDS Database or Cluster.',
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicDurableExecutionRolePolicy'),
        ],
      }),
      logGroup: new logs.LogGroup(this, 'RunningScheduleFunctionLogGroup', {
        retention: logs.RetentionDays.THREE_MONTHS,
        removalPolicy: RemovalPolicy.DESTROY,
      }),
      loggingFormat: lambda.LoggingFormat.JSON,
      systemLogLevelV2: lambda.SystemLogLevel.INFO,
      applicationLogLevelV2: lambda.ApplicationLogLevel.INFO,
    });
    runningScheduleFunction.addToRolePolicy(new iam.PolicyStatement({
      sid: 'GetResources',
      effect: iam.Effect.ALLOW,
      actions: [
        'tag:GetResources',
      ],
      resources: ['*'],
    }));
    // Grant read access to the RDS API
    runningScheduleFunction.addToRolePolicy(new iam.PolicyStatement({
      sid: 'RdsRunningControl',
      effect: iam.Effect.ALLOW,
      actions: [
        'rds:DescribeDBInstances',
        'rds:DescribeDBClusters',
        'rds:StartDBInstance',
        'rds:StartDBCluster',
        'rds:StopDBInstance',
        'rds:StopDBCluster',
      ],
      resources: ['*'],
    }));
    // Grant read access to the Slack secret
    slackSecret.grantRead(runningScheduleFunction);

    // https://docs.aws.amazon.com/lambda/latest/dg/durable-getting-started-iac.html
    const runningScheduleFunctionAlias = runningScheduleFunction.addAlias('live');

    // 👇 Schedule state
    const scheduleEnabled: boolean = (() => {
      if (props.enableScheduling === undefined || props.enableScheduling) {
        return true;
      } else {
        return false;
      }
    })();

    // Schedule (Durable Functions: Lambda performs tag lookup, export, and polling in one run)
    new scheduler.Schedule(this, 'RunningStartSchedule', {
      description: 'running start schedule',
      enabled: scheduleEnabled,
      schedule: scheduler.ScheduleExpression.cron({
        minute: props.startSchedule?.minute ?? '50',
        hour: props.startSchedule?.hour ?? '7',
        weekDay: props.startSchedule?.week ?? 'MON-FRI',
        timeZone: props.startSchedule?.timezone ?? TimeZone.ETC_UTC,
      }),
      target: new targets.LambdaInvoke(runningScheduleFunctionAlias, {
        input: scheduler.ScheduleTargetInput.fromObject({
          Params: {
            TagKey: props.targetResource.tagKey,
            TagValues: props.targetResource.tagValues,
            Mode: 'Start',
          },
        }),
      }),
    });

    new scheduler.Schedule(this, 'RunningStopSchedule', {
      description: 'running stop schedule',
      enabled: scheduleEnabled,
      schedule: scheduler.ScheduleExpression.cron({
        minute: props.stopSchedule?.minute ?? '5',
        hour: props.stopSchedule?.hour ?? '19',
        weekDay: props.stopSchedule?.week ?? 'MON-FRI',
        timeZone: props.stopSchedule?.timezone ?? TimeZone.ETC_UTC,
      }),
      target: new targets.LambdaInvoke(runningScheduleFunctionAlias, {
        input: scheduler.ScheduleTargetInput.fromObject({
          Params: {
            TagKey: props.targetResource.tagKey,
            TagValues: props.targetResource.tagValues,
            Mode: 'Stop',
          },
        }),
      }),
    });

  }
}

