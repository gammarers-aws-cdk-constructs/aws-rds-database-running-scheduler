import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.232.0',
  typescriptVersion: '5.9.x',
  jsiiVersion: '5.9.x',
  defaultReleaseBranch: 'main',
  name: 'aws-rds-database-running-scheduler',
  description: 'AWS RDS Database Running Scheduler',
  keywords: ['aws', 'cdk', 'aws-cdk', 'rds', 'scheduler', 'cost', 'saving'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers-aws-cdk-constructs/aws-rds-database-running-scheduler.git',
  deps: [],
  devDeps: [
    '@aws/durable-execution-sdk-js@^1',
    '@aws-sdk/client-cost-explorer@^3',
    '@aws-sdk/client-lambda@^3',
    '@aws-sdk/client-rds@^3',
    '@aws-sdk/client-resource-groups-tagging-api@^3',
    '@slack/web-api@^6',
    '@types/aws-lambda@^8',
    'aws-lambda-secret-fetcher@^0.3',
    'aws-sdk-client-mock@^2',
    'aws-sdk-client-mock-jest@^2',
  ],
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  majorVersion: 3,
  minNodeVersion: '20.0.0',
  workflowNodeVersion: '24.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.NEVER,
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
  // publishToPypi: {
  //   distName: 'gammarers.aws-rds-database-running-schedule-stack',
  //   module: 'gammarers.aws_rds_database_running_schedule_stack',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'Gammarers.CDK.AWS',
  //   packageId: 'Gammarers.CDK.AWS.RdsDatabaseRunningScheduleStack',
  // },
});
project.synth();