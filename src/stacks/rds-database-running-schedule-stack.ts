import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RDSDatabaseRunningScheduler, TargetResource, Schedule, Secrets } from '../constructs/rds-database-running-scheduler';

/**
 * Properties for the RDS database running schedule stack.
 */
export interface RDSDatabaseRunningScheduleStackProps extends StackProps {
  /** Tag filter used to select target RDS resources. */
  readonly targetResource: TargetResource;
  /** Secret references required by the scheduler construct. */
  readonly secrets: Secrets;
  /** Enables or disables schedule creation. */
  readonly enableScheduling?: boolean;
  /** Optional cron configuration for stop operations. */
  readonly stopSchedule?: Schedule;
  /** Optional cron configuration for start operations. */
  readonly startSchedule?: Schedule;
}

/**
 * CDK stack that provisions scheduled start/stop control for tagged RDS resources.
 */
export class RDSDatabaseRunningScheduleStack extends Stack {
  /**
   * Creates the stack and instantiates the scheduler construct.
   *
   * @param scope Parent construct scope.
   * @param id Stack identifier.
   * @param props Stack configuration.
   */
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