import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RDSDatabaseRunningScheduler, TargetResource, Schedule, Secrets } from '../constructs/rds-database-running-scheduler';

export interface RDSDatabaseRunningScheduleStackProps extends StackProps {
  readonly targetResource: TargetResource;
  readonly secrets: Secrets;
  readonly enableScheduling?: boolean;
  readonly stopSchedule?: Schedule;
  readonly startSchedule?: Schedule;
}

export class RDSDatabaseRunningScheduleStack extends Stack {
  constructor(scope: Construct, id: string, props: RDSDatabaseRunningScheduleStackProps) {
    super(scope, id, props);

    new RDSDatabaseRunningScheduler(this, 'RDSDatabaseRunningScheduler', {
      targetResource: props.targetResource,
      enableScheduling: props.enableScheduling,
      stopSchedule: props.stopSchedule,
      startSchedule: props.startSchedule,
      secrets: props.secrets,
    });
  }
}