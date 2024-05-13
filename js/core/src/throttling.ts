import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Duration, toJvmDuration } from "./utils/duration";
import { Wrapper } from "./common";

import JvmThrottleStep = io.gatling.javaapi.core.ThrottleStep;
import JvmThrottleStepReachIntermediate = io.gatling.javaapi.core.ThrottleStep$ReachIntermediate;

/**
 * Bootstrap a new reachRps throttling profile, see {@link ThrottleStepReachIntermediate}
 *
 * @param target - the target requests per second
 * @returns the next DSL step
 */
export const reachRps = (target: number): ThrottleStepReachIntermediate =>
  wrapThrottleStepReachIntermediate(JvmCoreDsl.reachRps(target));

/**
 * Bootstrap a new holdFor throttling profile that limits rps to its current value
 *
 * @param duration - the duration of the plateau in seconds
 * @returns the next DSL step
 */
export const holdFor = (duration: Duration): ThrottleStep =>
  wrapThrottleStep(JvmCoreDsl.holdFor(toJvmDuration(duration)));

/**
 * Bootstrap a new jumpToRps throttling profile that change the rps limit to a new value
 *
 * @param target - the new limit
 * @returns the next DSL step
 */
export const jumpToRps = (target: number): ThrottleStep => wrapThrottleStep(JvmCoreDsl.jumpToRps(target));

export interface ThrottleStep extends Wrapper<JvmThrottleStep> {}

const wrapThrottleStep = (_underlying: JvmThrottleStep): ThrottleStep => ({
  _underlying
});

/**
 * DSL step to define the duration of a throttling ramp.
 */
export interface ThrottleStepReachIntermediate {
  /**
   * Define the duration of a throttling ramp
   *
   * @param duration - the duration
   * @returns a new ThrottleStep
   */
  in(duration: Duration): ThrottleStep;

  /**
   * Alias for `in` that's a reserved keyword in Kotlin
   *
   * @param duration - the duration
   * @returns a new ThrottleStep
   */
  during(duration: Duration): ThrottleStep;
}

const wrapThrottleStepReachIntermediate = (
  _underlying: JvmThrottleStepReachIntermediate
): ThrottleStepReachIntermediate => ({
  in: (duration) => wrapThrottleStep(_underlying.in(toJvmDuration(duration))),
  during: (duration) => wrapThrottleStep(_underlying.during(toJvmDuration(duration)))
});
