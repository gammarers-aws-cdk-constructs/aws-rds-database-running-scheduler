import { Duration, Stack } from 'aws-cdk-lib';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export interface RunningControlStateMachineProps extends sfn.StateMachineProps {
  // notificationTopic: sns.ITopic;
}

export class RunningControlStateMachine extends sfn.StateMachine {
  constructor(scope: Construct, id: string, props: RunningControlStateMachineProps) {
    super(scope, id, {
      ...props,
      definitionBody: (() => {

        // 👇 Get account
        const account = Stack.of(scope).account;

        const initStateListDefinition: sfn.Pass = new sfn.Pass(scope, 'InitStateListDefinition', {
          result: sfn.Result.fromObject([
            { name: 'AVAILABLE', emoji: '🤩', state: 'available' },
            { name: 'STOPPED', emoji: '😴', state: 'stopped' },
          ]),
          resultPath: '$.definition.stateList',
        });

        // 👇 Succeed
        const stateChangeSucceed = new sfn.Succeed(scope, 'StateChangeSucceed');

        const prepareTopicValue = new sfn.Pass(scope, 'PrepareTopicValue', {
          resultPath: '$.prepare.topic.values',
          parameters: {
            emoji: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringAt('$.definition.stateList[?(@.state == $.Result.status.current)].emoji'), 0),
            status: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringAt('$.definition.stateList[?(@.state == $.Result.status.current)].name'), 0),
            account: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), ':'), 4), // account
            region: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), ':'), 3), // region
          },
        }).next(new sfn.Pass(scope, 'GenerateTopic', {
          resultPath: '$.Generate.Topic',
          parameters: {
            Subject: sfn.JsonPath.format('{} [{}] AWS RDS DB {} Running Notification [{}][{}]',
              sfn.JsonPath.stringAt('$.prepare.topic.values.emoji'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
              sfn.JsonPath.stringAt('$.params.Mode'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.account'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.region'),
            ),
            TextMessage: sfn.JsonPath.format('{}\n\nAccount : {}\nRegion : {}\nType : {}\nIdentifier : {}\nStatus : {}',
              sfn.JsonPath.format('The status of the RDS {} changed to {} due to the schedule.',
                sfn.JsonPath.stringAt('$.Result.target.type'),
                sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
              ),
              sfn.JsonPath.stringAt('$.prepare.topic.values.account'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.region'),
              sfn.JsonPath.stringAt('$.Result.target.type'),
              sfn.JsonPath.stringAt('$.Result.target.identifier'),
              sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
            ),
            SlackJsonMessage: {
              attachments: [
                {
                  color: '#36a64f',
                  pretext: sfn.JsonPath.format('{} The status of the RDS {} changed to {} due to the schedule.',
                    sfn.JsonPath.stringAt('$.prepare.topic.values.emoji'),
                    sfn.JsonPath.stringAt('$.Result.target.type'),
                    sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
                  ),
                  fields: [
                    {
                      title: 'Account',
                      value: sfn.JsonPath.stringAt('$.prepare.topic.values.account'),
                      short: true,
                    },
                    {
                      title: 'Region',
                      value: sfn.JsonPath.stringAt('$.prepare.topic.values.region'),
                      short: true,
                    },
                    {
                      title: 'Type',
                      value: sfn.JsonPath.stringAt('$.Result.target.type'),
                      short: true,
                    },
                    {
                      title: 'Identifier',
                      value: sfn.JsonPath.stringAt('$.Result.target.identifier'),
                      short: true,
                    },
                    {
                      title: 'Status',
                      value: sfn.JsonPath.stringAt('$.prepare.topic.values.status'),
                      short: true,
                    },
                  ],
                },
              ],
            },
          },
        }).next(stateChangeSucceed));

        // 👇 Get DB Instance Resources (Filter by Tag)
        const getResources = new tasks.CallAwsService(scope, 'GetResources', {
          iamResources: ['*'],
          iamAction: 'tag:GetResources',
          service: 'resourcegroupstaggingapi',
          action: 'getResources',
          parameters: {
            ResourceTypeFilters: [
              'rds:db',
              'rds:cluster',
            ],
            TagFilters: [
              {
                Key: sfn.JsonPath.stringAt('$.Params.TagKey'),
                Values: sfn.JsonPath.stringAt('$.Params.TagValues'),
              },
            ],
          },
          resultPath: '$.Result',
          resultSelector: {
            TargetResources: sfn.JsonPath.stringAt('$..ResourceTagMappingList[*].ResourceARN'),
          },
        });

        initStateListDefinition.next(getResources);

        // 👇 Describe DB Instance Task
        const describeDBInstancesTask = new tasks.CallAwsService(scope, 'DescribeDBInstances', {
          iamResources: [`arn:aws:rds:*:${account}:db:*`],
          service: 'rds',
          action: 'describeDBInstances',
          parameters: {
            DbInstanceIdentifier: sfn.JsonPath.stringAt('$.Result.target.identifier'),
          },
          resultPath: '$.Result.status',
          resultSelector: {
            current: sfn.JsonPath.stringAt('$.DbInstances[0].DbInstanceStatus'),
          },
        });

        // 👇 Stop DB Instance Task
        const stopDBInstanceTask = new tasks.CallAwsService(scope, 'StopDBInstance', {
          iamResources: [`arn:aws:rds:*:${account}:db:*`],
          service: 'rds',
          action: 'stopDBInstance',
          parameters: {
            DbInstanceIdentifier: sfn.JsonPath.stringAt('$.Result.target.identifier'),
          },
          resultPath: '$.Result.StopDBInstance',
        });

        // 👇 Start DB Instance Task
        const startDBInstanceTask = new tasks.CallAwsService(scope, 'StartDBInstance', {
          iamResources: [`arn:aws:rds:*:${account}:db:*`],
          service: 'rds',
          action: 'startDBInstance',
          parameters: {
            DbInstanceIdentifier: sfn.JsonPath.stringAt('$.Result.target.identifier'),
          },
          resultPath: '$.Result.StartDBInstance',
        });

        // 👇 Describe DB Cluster Task
        const describeDBClustersTask = new tasks.CallAwsService(scope, 'DescribeDBClusters', {
          iamResources: [`arn:aws:rds:*:${account}:cluster:*`],
          service: 'rds',
          action: 'describeDBClusters',
          parameters: {
            DbClusterIdentifier: sfn.JsonPath.stringAt('$.Result.target.identifier'),
          },
          resultPath: '$.Result.status',
          resultSelector: {
            current: sfn.JsonPath.stringAt('$.DbClusters[0].Status'),
          },
        });

        const handleDbClusterNotFound = new sfn.Pass(scope, 'HandleDbClusterNotFound', {
          result: sfn.Result.fromObject({
            message: 'DB Cluster not found, but continuing...',
          }),
        });

        describeDBClustersTask.addCatch(handleDbClusterNotFound, {
          errors: ['Rds.DbClusterNotFoundException'],
        });

        // 👇 Stop DB Cluster Task
        const stopDBClusterTask = new tasks.CallAwsService(scope, 'StopDBCluster', {
          iamResources: [`arn:aws:rds:*:${account}:cluster:*`],
          service: 'rds',
          action: 'stopDBCluster',
          parameters: {
            DbClusterIdentifier: sfn.JsonPath.stringAt('$.Result.target.identifier'),
          },
          resultPath: '$.Result.StopDBCluster',
        });

        // 👇 Stop DB Cluster Task
        const startDBClusterTask = new tasks.CallAwsService(scope, 'StartDBCluster', {
          iamResources: [`arn:aws:rds:*:${account}:cluster:*`],
          service: 'rds',
          action: 'startDBCluster',
          parameters: {
            DbClusterIdentifier: sfn.JsonPath.stringAt('$.Result.target.identifier'),
          },
          resultPath: '$.Result.StartDBCluster',
        });

        const describeTypeChoice = new sfn.Choice(scope, 'DescribeTypeChoice')
          .when(
            sfn.Condition.stringEquals('$.Result.target.type', 'db'),
            describeDBInstancesTask,
          )
          .when(
            sfn.Condition.stringEquals('$.Result.target.type', 'cluster'),
            describeDBClustersTask,
          )
          .otherwise(new sfn.Fail(scope, 'UnknownType'));

        const statusChangeWait = new sfn.Wait(scope, 'StatusChangeWait', {
          time: sfn.WaitTime.duration(Duration.minutes(1)),
        });
        statusChangeWait.next(describeTypeChoice);

        startDBInstanceTask.next(statusChangeWait);
        stopDBInstanceTask.next(statusChangeWait);

        startDBClusterTask.next(statusChangeWait);
        stopDBClusterTask.next(statusChangeWait);

        const statusChoice = new sfn.Choice(scope, 'StatusChoice')
          // db instance start on status.stopped
          .when(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.params.Mode', 'Start'),
              sfn.Condition.stringEquals('$.Result.target.type', 'db'),
              sfn.Condition.stringEquals('$.Result.status.current', 'stopped'),
            ),
            startDBInstanceTask,
          )
          // db instance stop on status.available
          .when(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.params.Mode', 'Stop'),
              sfn.Condition.stringEquals('$.Result.target.type', 'db'),
              sfn.Condition.stringEquals('$.Result.status.current', 'available'),
            ),
            stopDBInstanceTask,
          )
          // start on status.stopped
          .when(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.params.Mode', 'Start'),
              sfn.Condition.stringEquals('$.Result.target.type', 'cluster'),
              sfn.Condition.stringEquals('$.Result.status.current', 'stopped'),
            ),
            startDBClusterTask,
          )
          // stop on status.available
          .when(
            sfn.Condition.and(
              sfn.Condition.stringEquals('$.params.Mode', 'Stop'),
              sfn.Condition.stringEquals('$.Result.target.type', 'cluster'),
              sfn.Condition.stringEquals('$.Result.status.current', 'available'),
            ),
            stopDBClusterTask,
          )
          // status change succeed, generate topic
          .when(
            sfn.Condition.or(
              sfn.Condition.and(
                sfn.Condition.stringEquals('$.params.Mode', 'Start'),
                sfn.Condition.or(
                  sfn.Condition.stringEquals('$.Result.target.type', 'db'),
                  sfn.Condition.stringEquals('$.Result.target.type', 'cluster'),
                ),
                sfn.Condition.stringEquals('$.Result.status.current', 'available'),
              ),
              sfn.Condition.and(
                sfn.Condition.stringEquals('$.params.Mode', 'Stop'),
                sfn.Condition.or(
                  sfn.Condition.stringEquals('$.Result.target.type', 'db'),
                  sfn.Condition.stringEquals('$.Result.target.type', 'cluster'),
                ),
                sfn.Condition.stringEquals('$.Result.status.current', 'stopped'),
              ),
            ),
            prepareTopicValue,
          )
          .when(
            // start & starting/configuring-enhanced-monitoring/backing-up or stop modifying/stopping
            sfn.Condition.or(
              sfn.Condition.and(
                sfn.Condition.and(
                  sfn.Condition.stringEquals('$.params.Mode', 'Start'),
                  sfn.Condition.or(
                    sfn.Condition.stringEquals('$.Result.target.type', 'db'),
                    sfn.Condition.stringEquals('$.Result.target.type', 'cluster'),
                  ),
                  sfn.Condition.or(
                    sfn.Condition.stringEquals('$.Result.status.current', 'starting'),
                    sfn.Condition.stringEquals('$.Result.status.current', 'configuring-enhanced-monitoring'),
                    sfn.Condition.stringEquals('$.Result.status.current', 'backing-up'),
                    sfn.Condition.stringEquals('$.Result.status.current', 'modifying'),
                  ),
                ),
              ),
              sfn.Condition.and(
                sfn.Condition.and(
                  sfn.Condition.stringEquals('$.params.Mode', 'Stop'),
                  sfn.Condition.or(
                    sfn.Condition.stringEquals('$.Result.target.type', 'db'),
                    sfn.Condition.stringEquals('$.Result.target.type', 'cluster'),
                  ),
                  sfn.Condition.or(
                    sfn.Condition.stringEquals('$.Result.status.current', 'modifying'),
                    sfn.Condition.stringEquals('$.Result.status.current', 'stopping'),
                  ),
                ),
              ),
            ),
            statusChangeWait,
          )
          .otherwise(new sfn.Fail(scope, 'StatusFail', {
            cause: 'db instance or cluster status fail.',
          }));

        getResources.next(
          new sfn.Map(scope, 'ResourceProcessingMap', {
            itemsPath: sfn.JsonPath.stringAt('$.Result.TargetResources'),
            parameters: {
              TargetResource: sfn.JsonPath.stringAt('$$.Map.Item.Value'),
              params: sfn.JsonPath.stringAt('$.Params'),
              definition: sfn.JsonPath.stringAt('$.definition'),
            },
            maxConcurrency: 10,
          }).itemProcessor(
            new sfn.Pass(scope, 'GetIdentifier', {
              resultPath: '$.Result.target',
              parameters: {
                identifier: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), ':'), 6),
                type: sfn.JsonPath.arrayGetItem(sfn.JsonPath.stringSplit(sfn.JsonPath.stringAt('$.TargetResource'), ':'), 5), // db or cluster
              },
            }).next(describeTypeChoice)));

        describeDBInstancesTask.next(statusChoice);
        describeDBClustersTask.next(statusChoice);

        return sfn.DefinitionBody.fromChainable(initStateListDefinition);
      })(),
    });
  }
}
