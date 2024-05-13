import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Wrapper } from "./common";
import { Duration, toJvmDuration } from "./utils/duration";

import JvmClosedInjectionStep = io.gatling.javaapi.core.ClosedInjectionStep;
import JvmClosedInjectionStepConstant = io.gatling.javaapi.core.ClosedInjectionStep$Constant;
import JvmClosedInjectionStepRamp = io.gatling.javaapi.core.ClosedInjectionStep$Ramp;
import JvmClosedInjectionStepRampTo = io.gatling.javaapi.core.ClosedInjectionStep$RampTo;
import JvmClosedInjectionStepStairs = io.gatling.javaapi.core.ClosedInjectionStep$Stairs;
import JvmClosedInjectionStepStairsWithTime = io.gatling.javaapi.core.ClosedInjectionStep$StairsWithTime;
import JvmClosedInjectionStepComposite = io.gatling.javaapi.core.ClosedInjectionStep$Composite;

/**
 * An injection profile step for using a closed workload model where you control the concurrent
 * number of users. Only use if your system has a queue limiting entry. Don't use otherwise or your
 * test will not match any production use case.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface ClosedInjectionStep extends Wrapper<JvmClosedInjectionStep> {}

const wrapClosedInjectionStep = (_underlying: JvmClosedInjectionStep): ClosedInjectionStep => ({ _underlying });

/**
 * DSL component for building a {@link ClosedInjectionStep} that will inject new users in a way to
 * maintain a constant number of concurrent users for a given duration.
 */
export interface ClosedInjectionStepConstant extends Wrapper<JvmClosedInjectionStepConstant> {
  /**
   * Define the duration of the step
   *
   * @param duration - the duration
   * @returns a new ClosedInjectionStep
   */
  during(duration: Duration): ClosedInjectionStep;
}

const wrapClosedInjectionStepConstant = (_underlying: JvmClosedInjectionStepConstant): ClosedInjectionStepConstant => ({
  _underlying,
  during: (duration: Duration) => wrapClosedInjectionStep(_underlying.during(toJvmDuration(duration)))
});

/**
 * DSL step for building a {@link ClosedInjectionStep} that will inject new users in a way to ramp
 * the number of concurrent users for a given duration.
 */
export interface ClosedInjectionStepRamp extends Wrapper<JvmClosedInjectionStepRamp> {
  /**
   * Define the target number of concurrent users at the end of the ramp.
   *
   * @param t - the target number
   * @returns a RampConcurrentUsersInjectionTo
   */
  to(t: number): ClosedInjectionStepRampTo;
}

const wrapClosedInjectionStepRamp = (_underlying: JvmClosedInjectionStepRamp): ClosedInjectionStepRamp => ({
  _underlying,
  to: (t: number) => wrapClosedInjectionStepRampTo(_underlying.to(t))
});

/**
 * DSL step for building a {@link ClosedInjectionStep} that will inject new users in a way to ramp
 * the number of concurrent users for a given duration.
 */
export interface ClosedInjectionStepRampTo extends Wrapper<JvmClosedInjectionStepRampTo> {
  /**
   * Define the duration of the ramp.
   *
   * @param duration - the duration
   * @returns a complete ClosedInjectionStep
   */
  during(duration: Duration): ClosedInjectionStep;
}

const wrapClosedInjectionStepRampTo = (_underlying: JvmClosedInjectionStepRampTo): ClosedInjectionStepRampTo => ({
  _underlying,
  during: (duration: Duration) => wrapClosedInjectionStep(_underlying.during(toJvmDuration(duration)))
});

/**
 * DSL step for building a {@link ClosedInjectionStep} that will inject new users in a way to ramp
 * the number of concurrent users in a stairs fashion
 */
export interface ClosedInjectionStepStairs extends Wrapper<JvmClosedInjectionStepStairs> {
  /**
   * Define the number of levels
   *
   * @param levels - the number of levels in the stairs
   * @returns the next DSL step
   */
  times(levels: number): ClosedInjectionStepStairsWithTime;
}

const wrapClosedInjectionStepStairs = (_underlying: JvmClosedInjectionStepStairs): ClosedInjectionStepStairs => ({
  _underlying,
  times: (levels: number) => wrapClosedInjectionStepStairsWithTime(_underlying.times(levels))
});

/**
 * DSL step for building a {@link ClosedInjectionStep} that will inject new users in a way to ramp
 * the number of concurrent users in a stairs fashion
 */
export interface ClosedInjectionStepStairsWithTime extends Wrapper<JvmClosedInjectionStepStairsWithTime> {
  /**
   * Define the duration of each level
   *
   * @param duration - the duration
   * @returns the next DSL step
   */
  eachLevelLasting(duration: Duration): ClosedInjectionStepComposite;
}

const wrapClosedInjectionStepStairsWithTime = (
  _underlying: JvmClosedInjectionStepStairsWithTime
): ClosedInjectionStepStairsWithTime => ({
  _underlying,
  eachLevelLasting: (duration: Duration) =>
    wrapClosedInjectionStepComposite(_underlying.eachLevelLasting(toJvmDuration(duration)))
});

/**
 * DSL step for building a {@link ClosedInjectionStep} that will inject new users in a way to ramp
 * the number of concurrent users in a stairs fashion
 */
export interface ClosedInjectionStepComposite extends ClosedInjectionStep {
  /**
   * Define the initial number of concurrent users (optional)
   *
   * @param startingUsers - the initial number of concurrent users
   * @returns a usable {@link ClosedInjectionStep}
   */
  startingFrom(startingUsers: number): ClosedInjectionStepComposite;

  /**
   * Define ramps separating levels (optional)
   *
   * @param duration - the duration of the ramps
   * @returns a usable {@link ClosedInjectionStep}
   */
  separatedByRampsLasting(duration: Duration): ClosedInjectionStepComposite;
}

const wrapClosedInjectionStepComposite = (
  _underlying: JvmClosedInjectionStepComposite
): ClosedInjectionStepComposite => ({
  _underlying,
  startingFrom: (startingUsers: number) => wrapClosedInjectionStepComposite(_underlying.startingFrom(startingUsers)),
  separatedByRampsLasting: (duration: Duration) =>
    wrapClosedInjectionStepComposite(_underlying.separatedByRampsLasting(toJvmDuration(duration)))
});

/**
 * Bootstrap a new closed workload constantConcurrentUsers injection profile, see {@link
 * ClosedInjectionStepConstant}
 *
 * @param users - the number of concurrent users
 * @returns the next DSL step
 */
export const constantConcurrentUsers = (users: number): ClosedInjectionStepConstant =>
  wrapClosedInjectionStepConstant(JvmCoreDsl.constantConcurrentUsers(users));

/**
 * Bootstrap a new closed workload rampConcurrentUsers injection profile, see {@link
 * ClosedInjectionStepRamp}
 *
 * @param from - the number of concurrent users at the start of the ramp
 * @returns the next DSL step
 */
export const rampConcurrentUsers = (from: number): ClosedInjectionStepRamp =>
  wrapClosedInjectionStepRamp(JvmCoreDsl.rampConcurrentUsers(from));

/**
 * Bootstrap a new closed workload incrementConcurrentUsers injection profile, see {@link
 * ClosedInjectionStepStairs}
 *
 * @param usersIncrement - the difference of concurrent users between levels of the stairs
 * @returns the next DSL step
 */
export const incrementConcurrentUsers = (usersIncrement: number): ClosedInjectionStepStairs =>
  wrapClosedInjectionStepStairs(JvmCoreDsl.incrementConcurrentUsers(usersIncrement));
