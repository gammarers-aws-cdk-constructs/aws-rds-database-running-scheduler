# AWS RDS Database Running Scheduler

[![GitHub](https://img.shields.io/github/license/gammarers-aws-cdk-constructs/aws-rds-database-running-scheduler?style=flat-square)](https://github.com/gammarers-aws-cdk-constructs/aws-rds-database-running-scheduler/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/aws-rds-database-running-scheduler?style=flat-square)](https://www.npmjs.com/package/aws-rds-database-running-scheduler)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/gammarers-aws-cdk-constructs/aws-rds-database-running-scheduler/release.yml?branch=main&label=release&style=flat-square)](https://github.com/gammarers-aws-cdk-constructs/aws-rds-database-running-scheduler/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/gammarers-aws-cdk-constructs/aws-rds-database-running-scheduler?sort=semver&style=flat-square)](https://github.com/gammarers-aws-cdk-constructs/aws-rds-database-running-scheduler/releases)

[![View on Construct Hub](https://constructs.dev/badge?package=aws-rds-database-running-scheduler)](https://constructs.dev/packages/aws-rds-database-running-scheduler)

This AWS CDK construct controls the start and stop of RDS DB instances and Aurora clusters based on resource tags. It uses EventBridge Scheduler to invoke a Lambda (with Durable Execution) at configurable times, so databases run only during defined working hours. Default schedule: start 07:50 UTC, stop 19:05 UTC, Monday–Friday.

## Features

- **Tag-based targeting**: Start and stop RDS instances and Aurora clusters that have a given tag key and values.
- **EventBridge Scheduler**: Cron-based start and stop schedules with configurable timezone, time, and weekdays.
- **Lambda with Durable Execution**: Single Lambda run discovers resources by tag, starts or stops them, and polls until they reach the desired state (with timeout).
- **Slack notifications**: Optional Slack messages for schedule results via a secret stored in AWS Secrets Manager.
- **Supported resources**: RDS DB instances and RDS Aurora clusters.

## Installation

**npm**

```bash
npm install aws-rds-database-running-scheduler
```

**yarn**

```bash
yarn add aws-rds-database-running-scheduler
```

## Usage

Use the **Construct** `RDSDatabaseRunningScheduler` when adding the scheduler into an existing Stack or any CDK scope.

```typescript
import { RDSDatabaseRunningScheduler } from 'aws-rds-database-running-scheduler';

new RDSDatabaseRunningScheduler(scope, 'RDSDatabaseRunningScheduler', {
  targetResource: { tagKey: 'WorkHoursRunning', tagValues: ['YES'] },
  secrets: { slackSecretName: 'example/slack/webhook' },
  enableScheduling: true,
  startSchedule: { timezone: 'Asia/Tokyo', minute: '50', hour: '7', week: 'MON-FRI' },
  stopSchedule: { timezone: 'Asia/Tokyo', minute: '5', hour: '19', week: 'MON-FRI' },
});
```

Use the **Stack** `RDSDatabaseRunningScheduleStack` when you want a dedicated Stack that only contains the scheduler. Both accept the same props.

```typescript
import { RDSDatabaseRunningScheduleStack } from 'aws-rds-database-running-scheduler';

new RDSDatabaseRunningScheduleStack(app, 'RDSDatabaseRunningScheduleStack', {
  targetResource: { tagKey: 'WorkHoursRunning', tagValues: ['YES'] },
  secrets: { slackSecretName: 'example/slack/webhook' },
  enableScheduling: true,
  startSchedule: { timezone: 'Asia/Tokyo', minute: '50', hour: '7', week: 'MON-FRI' },
  stopSchedule: { timezone: 'Asia/Tokyo', minute: '5', hour: '19', week: 'MON-FRI' },
});
```

Tag your RDS instances or Aurora clusters with the same `tagKey` and one of the `tagValues` so they are included in the schedule.

## Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `targetResource` | `TargetResource` | Yes | Tag key and values used to select RDS resources. |
| `secrets` | `Secrets` | Yes | Slack configuration. `slackSecretName`: Secrets Manager secret name for Slack (token and channel). |
| `enableScheduling` | `boolean` | No | Whether schedules are enabled. Default: `true`. |
| `startSchedule` | `Schedule` | No | Start schedule. Default: 07:50 UTC, MON–FRI. |
| `stopSchedule` | `Schedule` | No | Stop schedule. Default: 19:05 UTC, MON–FRI. |

### Schedule

| Field | Type | Description |
|-------|------|-------------|
| `timezone` | `string` | IANA timezone (e.g. `Asia/Tokyo`, `UTC`). |
| `minute` | `string` | Cron minute (e.g. `'50'`). |
| `hour` | `string` | Cron hour (e.g. `'7'`, `'19'`). |
| `week` | `string` | Cron week day (e.g. `'MON-FRI'`). |

### TargetResource

| Field | Type | Description |
|-------|------|-------------|
| `tagKey` | `string` | Tag key to filter RDS resources. |
| `tagValues` | `string[]` | Tag values to match (resources with any of these values are targeted). |

## Requirements

- **Node.js**: >= 20.0.0
- **AWS CDK**: ^2.232.0
- **constructs**: ^10.0.5
- **AWS**: Account and region with permissions to create EventBridge Scheduler, Lambda, IAM, and RDS usage; Secrets Manager for Slack secret.

## License

This project is licensed under the Apache-2.0 License.
