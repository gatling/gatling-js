import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Duration, toJvmDuration } from "./utils/duration";
import { Wrapper } from "./common";

import JvmOpenInjectionStep = io.gatling.javaapi.core.OpenInjectionStep;
import JvmOpenInjectionStepRamp = io.gatling.javaapi.core.OpenInjectionStep$Ramp;
import JvmOpenInjectionStepStressPeak = io.gatling.javaapi.core.OpenInjectionStep$StressPeak;
import JvmOpenInjectionStepConstantRate = io.gatling.javaapi.core.OpenInjectionStep$ConstantRate;
import JvmOpenInjectionStepConstantRateConstantRateOpenInjectionStep = io.gatling.javaapi.core.ConstantRate$ConstantRateOpenInjectionStep;
import JvmOpenInjectionStepRampRate = io.gatling.javaapi.core.OpenInjectionStep$RampRate;
import JvmOpenInjectionStepRampRateDuring = io.gatling.javaapi.core.RampRate$During;
import JvmOpenInjectionStepRampRateRampRateOpenInjectionStep = io.gatling.javaapi.core.RampRate$RampRateOpenInjectionStep;
import JvmOpenInjectionStepStairs = io.gatling.javaapi.core.OpenInjectionStep$Stairs;
import JvmOpenInjectionStepStairsTimes = io.gatling.javaapi.core.Stairs$Times;
import JvmOpenInjectionStepStairsComposite = io.gatling.javaapi.core.Stairs$Composite;

/**
 * An injection profile step for using an open workload model where you control the arrival rate of
 * new users. In 99.99% of the cases, the right choice, over closed workload model.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface OpenInjectionStep extends Wrapper<JvmOpenInjectionStep> {}

const wrapOpenInjectionStep = (_underlying: JvmOpenInjectionStep): OpenInjectionStep => ({ _underlying });

export interface ConstantRateOpenInjectionStep extends OpenInjectionStep {
  randomized(): OpenInjectionStep;
}

const wrapConstantRateOpenInjectionStep = (
  _underlying: JvmOpenInjectionStepConstantRateConstantRateOpenInjectionStep
): ConstantRateOpenInjectionStep => ({
  _underlying,
  randomized: () => wrapOpenInjectionStep(_underlying.randomized())
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject a stock of users distributed
 * evenly on a given period of time. Strictly equivalent to {@link ConstantRateOpenInjectionStep}
 */
export interface OpenInjectionStepRamp extends Wrapper<JvmOpenInjectionStepRamp> {
  /**
   * Define the duration of the ramp
   *
   * @param duration - the ramp duration
   * @returns a new OpenInjectionStep
   */
  during(duration: Duration): OpenInjectionStep;
}

const wrapOpenInjectionStepRamp = (_underlying: JvmOpenInjectionStepRamp): OpenInjectionStepRamp => ({
  _underlying,
  during: (duration: Duration) => wrapOpenInjectionStep(_underlying.during(toJvmDuration(duration)))
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject a stock of users distributed
 * with a <a hreh="https://en.wikipedia.org/wiki/Heaviside_step_function">Heaviside</a>
 * distribution on a given period of time. Strictly equivalent to {@link OpenInjectionStepConstantRate}
 */
export interface OpenInjectionStepStressPeak extends Wrapper<JvmOpenInjectionStepStressPeak> {
  /**
   * Define the duration of the Heaviside distribution
   *
   * @param duration - the duration
   * @returns a new OpenInjectionStep
   */
  during(duration: Duration): OpenInjectionStep;
}

const wrapOpenInjectionStepStressPeak = (_underlying: JvmOpenInjectionStepStressPeak): OpenInjectionStepStressPeak => ({
  _underlying,
  during: (duration: Duration) => wrapOpenInjectionStep(_underlying.during(toJvmDuration(duration)))
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject users at a constant rate for a
 * given duration.
 */
export interface OpenInjectionStepConstantRate extends Wrapper<JvmOpenInjectionStepConstantRate> {
  /**
   * Define the duration of the step
   *
   * @param duration - the duration
   * @returns a new OpenInjectionStep
   */
  during(duration: Duration): ConstantRateOpenInjectionStep;
}

const wrapOpenInjectionStepConstantRate = (
  _underlying: JvmOpenInjectionStepConstantRate
): OpenInjectionStepConstantRate => ({
  _underlying,
  during: (duration: Duration) => wrapConstantRateOpenInjectionStep(_underlying.during(toJvmDuration(duration)))
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject users at a rate that will
 * increase linearly for a given duration.
 */
export interface OpenInjectionStepRampRate extends Wrapper<JvmOpenInjectionStepRampRate> {
  /**
   * Define the target rate at the end of the ramp
   *
   * @param to - the target rate
   * @returns the next DSL step
   */
  to(to: number): OpenInjectionStepRampRateDuring;
}

const wrapOpenInjectionStepRampRate = (_underlying: JvmOpenInjectionStepRampRate): OpenInjectionStepRampRate => ({
  _underlying,
  to: (to: number) => wrapOpenInjectionStepRampRateDuring(_underlying.to(to))
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject users at a rate that will
 * increase linearly for a given duration.
 */
export interface OpenInjectionStepRampRateDuring extends Wrapper<JvmOpenInjectionStepRampRateDuring> {
  /**
   * Define the duration of the ramp
   *
   * @param duration - the duration
   * @returns a new OpenInjectionStep
   */
  during(duration: Duration): RampRateOpenInjectionStep;
}

const wrapOpenInjectionStepRampRateDuring = (
  _underlying: JvmOpenInjectionStepRampRateDuring
): OpenInjectionStepRampRateDuring => ({
  _underlying,
  during: (duration: Duration) => wrapRampRateOpenInjectionStep(_underlying.during(toJvmDuration(duration)))
});

/**
 * A special {@link OpenInjectionStep} that supports "randomized".
 */
export interface RampRateOpenInjectionStep extends OpenInjectionStep {
  randomized(): OpenInjectionStep;
}

const wrapRampRateOpenInjectionStep = (
  _underlying: JvmOpenInjectionStepRampRateRampRateOpenInjectionStep
): ConstantRateOpenInjectionStep => ({
  _underlying,
  randomized: () => wrapOpenInjectionStep(_underlying.randomized())
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject users with stairs rates.
 */
export interface OpenInjectionStepStairs extends Wrapper<JvmOpenInjectionStepStairs> {
  /**
   * Define the number of levels
   *
   * @param levels - the number of levels in the stairs
   * @returns the next DSL step
   */
  times(levels: number): OpenInjectionStepStairsTimes;
}

const wrapOpenInjectionStepStairs = (_underlying: JvmOpenInjectionStepStairs): OpenInjectionStepStairs => ({
  _underlying,
  times: (levels: number) => wrapOpenInjectionStepStairsTimes(_underlying.times(levels))
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject users with stairs rates.
 */
export interface OpenInjectionStepStairsTimes extends Wrapper<JvmOpenInjectionStepStairsTimes> {
  /**
   * Define the duration of each level
   *
   * @param duration - the duration
   * @returns the next DSL step
   */
  eachLevelLasting(duration: Duration): OpenInjectionStepStairsComposite;
}

const wrapOpenInjectionStepStairsTimes = (
  _underlying: JvmOpenInjectionStepStairsTimes
): OpenInjectionStepStairsTimes => ({
  _underlying,
  eachLevelLasting: (duration: Duration) =>
    wrapOpenInjectionStepStairsComposite(_underlying.eachLevelLasting(toJvmDuration(duration)))
});

/**
 * A DSL for creating a {@link OpenInjectionStep} that will inject users with stairs rates.
 */
export interface OpenInjectionStepStairsComposite extends OpenInjectionStep {
  /**
   * Define the initial number of users per second rate (optional)
   *
   * @param startingRate - the initial rate
   * @returns a usable {@link OpenInjectionStep}
   */
  startingFrom(startingRate: number): OpenInjectionStepStairsComposite;

  /**
   * Define ramps separating levels (optional)
   *
   * @param duration - the duration
   * @returns a usable {@link OpenInjectionStep}
   */
  separatedByRampsLasting(duration: Duration): OpenInjectionStepStairsComposite;
}

const wrapOpenInjectionStepStairsComposite = (
  _underlying: JvmOpenInjectionStepStairsComposite
): OpenInjectionStepStairsComposite => ({
  _underlying,
  startingFrom: (startingRate: number) => wrapOpenInjectionStepStairsComposite(_underlying.startingFrom(startingRate)),
  separatedByRampsLasting: (duration: Duration) =>
    wrapOpenInjectionStepStairsComposite(_underlying.separatedByRampsLasting(toJvmDuration(duration)))
});

/**
 * Bootstrap a new open workload rampUsers injection profile, see {@link OpenInjectionStepRamp}
 *
 * @param users - the total number of users to inject
 * @returns the next DSL step
 */
export const rampUsers = (users: number): OpenInjectionStepRamp =>
  wrapOpenInjectionStepRamp(JvmCoreDsl.rampUsers(users));

/**
 * Bootstrap a new open workload stress peak injection profile, see {@link
 * OpenInjectionStepStressPeak}
 *
 * @param users - the total number of users to inject
 * @returns the next DSL step
 */
export const stressPeakUsers = (users: number): OpenInjectionStepStressPeak =>
  wrapOpenInjectionStepStressPeak(JvmCoreDsl.stressPeakUsers(users));

/**
 * Inject a bunch of users at the same time.
 *
 * @param users - the number of users to inject
 * @returns a new OpenInjectionStep
 */
export const atOnceUsers = (users: number): OpenInjectionStep => wrapOpenInjectionStep(JvmCoreDsl.atOnceUsers(users));

/**
 * Bootstrap a new open workload constantUsersPerSec injection profile, see {@link
 * OpenInjectionStepConstantRate}
 *
 * @param rate - the users per second rate
 * @returns the next DSL step
 */
export const constantUsersPerSec = (rate: number): OpenInjectionStepConstantRate =>
  wrapOpenInjectionStepConstantRate(JvmCoreDsl.constantUsersPerSec(rate));

/**
 * Bootstrap a new open workload rampUsersPerSec injection profile, see {@link
 * OpenInjectionStepRampRate}
 *
 * @param rate - the users per second start rate
 * @returns the next DSL step
 */
export const rampUsersPerSec = (rate: number): OpenInjectionStepRampRate =>
  wrapOpenInjectionStepRampRate(JvmCoreDsl.rampUsersPerSec(rate));

/**
 * Don't inject any new user for a given duration
 *
 * @param duration - the duration
 * @returns a new OpenInjectionStep
 */
export const nothingFor = (duration: Duration): OpenInjectionStep =>
  wrapOpenInjectionStep(JvmCoreDsl.nothingFor(toJvmDuration(duration)));

/**
 * Bootstrap a new open workload incrementUsersPerSec injection profile, see {@link
 * OpenInjectionStepStairs}
 *
 * @param rateIncrement - the difference of users per second rate between levels of the stairs
 * @returns the next DSL step
 */
export const incrementUsersPerSec = (rateIncrement: number): OpenInjectionStepStairs =>
  wrapOpenInjectionStepStairs(JvmCoreDsl.incrementUsersPerSec(rateIncrement));
