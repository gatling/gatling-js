import "@gatling.io/jvm-types";
import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Wrapper } from "../common";
import { TimeUnit, toJvmDuration } from "../utils/duration";

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

export interface OpenInjectionStepRamp extends Wrapper<JvmOpenInjectionStepRamp> {
  during(duration: number, timeUnit?: TimeUnit): OpenInjectionStep;
}
const wrapOpenInjectionStepRamp = (_underlying: JvmOpenInjectionStepRamp): OpenInjectionStepRamp => ({
  _underlying,
  during: (duration: number, timeUnit?: TimeUnit) =>
    wrapOpenInjectionStep(_underlying.during(toJvmDuration(duration, timeUnit)))
});

export interface OpenInjectionStepStressPeak extends Wrapper<JvmOpenInjectionStepStressPeak> {
  during(duration: number, timeUnit?: TimeUnit): OpenInjectionStep;
}
const wrapOpenInjectionStepStressPeak = (_underlying: JvmOpenInjectionStepStressPeak): OpenInjectionStepStressPeak => ({
  _underlying,
  during: (duration: number, timeUnit?: TimeUnit) =>
    wrapOpenInjectionStep(_underlying.during(toJvmDuration(duration, timeUnit)))
});

export interface OpenInjectionStepConstantRate extends Wrapper<JvmOpenInjectionStepConstantRate> {
  during(duration: number, timeUnit?: TimeUnit): ConstantRateOpenInjectionStep;
}
const wrapOpenInjectionStepConstantRate = (
  _underlying: JvmOpenInjectionStepConstantRate
): OpenInjectionStepConstantRate => ({
  _underlying,
  during: (duration: number, timeUnit?: TimeUnit) =>
    wrapConstantRateOpenInjectionStep(_underlying.during(toJvmDuration(duration, timeUnit)))
});

export interface OpenInjectionStepRampRate extends Wrapper<JvmOpenInjectionStepRampRate> {
  to(to: number): OpenInjectionStepRampRateDuring;
}
const wrapOpenInjectionStepRampRate = (_underlying: JvmOpenInjectionStepRampRate): OpenInjectionStepRampRate => ({
  _underlying,
  to: (to: number) => wrapOpenInjectionStepRampRateDuring(_underlying.to(to))
});

export interface OpenInjectionStepRampRateDuring extends Wrapper<JvmOpenInjectionStepRampRateDuring> {
  during(duration: number, timeUnit?: TimeUnit): RampRateOpenInjectionStep;
}
const wrapOpenInjectionStepRampRateDuring = (
  _underlying: JvmOpenInjectionStepRampRateDuring
): OpenInjectionStepRampRateDuring => ({
  _underlying,
  during: (duration: number, timeUnit?: TimeUnit) =>
    wrapRampRateOpenInjectionStep(_underlying.during(toJvmDuration(duration, timeUnit)))
});

export interface RampRateOpenInjectionStep extends OpenInjectionStep {
  randomized(): OpenInjectionStep;
}
const wrapRampRateOpenInjectionStep = (
  _underlying: JvmOpenInjectionStepRampRateRampRateOpenInjectionStep
): ConstantRateOpenInjectionStep => ({
  _underlying,
  randomized: () => wrapOpenInjectionStep(_underlying.randomized())
});

export interface OpenInjectionStepStairs extends Wrapper<JvmOpenInjectionStepStairs> {
  times(levels: number): OpenInjectionStepStairsTimes;
}
const wrapOpenInjectionStepStairs = (_underlying: JvmOpenInjectionStepStairs): OpenInjectionStepStairs => ({
  _underlying,
  times: (levels: number) => wrapOpenInjectionStepStairsTimes(_underlying.times(levels))
});

export interface OpenInjectionStepStairsTimes extends Wrapper<JvmOpenInjectionStepStairsTimes> {
  eachLevelLasting(duration: number, timeUnit?: TimeUnit): OpenInjectionStepStairsComposite;
}
const wrapOpenInjectionStepStairsTimes = (
  _underlying: JvmOpenInjectionStepStairsTimes
): OpenInjectionStepStairsTimes => ({
  _underlying,
  eachLevelLasting: (duration: number, timeUnit?: TimeUnit) =>
    wrapOpenInjectionStepStairsComposite(_underlying.eachLevelLasting(toJvmDuration(duration, timeUnit)))
});

export interface OpenInjectionStepStairsComposite extends OpenInjectionStep {
  startingFrom(startingRate: number): OpenInjectionStepStairsComposite;
  separatedByRampsLasting(duration: number, timeUnit?: TimeUnit): OpenInjectionStepStairsComposite;
}
const wrapOpenInjectionStepStairsComposite = (
  _underlying: JvmOpenInjectionStepStairsComposite
): OpenInjectionStepStairsComposite => ({
  _underlying,
  startingFrom: (startingRate: number) => wrapOpenInjectionStepStairsComposite(_underlying.startingFrom(startingRate)),
  separatedByRampsLasting: (duration: number, timeUnit?: TimeUnit) =>
    wrapOpenInjectionStepStairsComposite(_underlying.separatedByRampsLasting(toJvmDuration(duration, timeUnit)))
});

export const rampUsers = (users: number): OpenInjectionStepRamp =>
  wrapOpenInjectionStepRamp(JvmCoreDsl.rampUsers(users));
export const stressPeakUsers = (users: number): OpenInjectionStepStressPeak =>
  wrapOpenInjectionStepStressPeak(JvmCoreDsl.stressPeakUsers(users));
export const atOnceUsers = (users: number): OpenInjectionStep => wrapOpenInjectionStep(JvmCoreDsl.atOnceUsers(users));
export const constantUsersPerSec = (rate: number): OpenInjectionStepConstantRate =>
  wrapOpenInjectionStepConstantRate(JvmCoreDsl.constantUsersPerSec(rate));
export const rampUsersPerSec = (rate: number): OpenInjectionStepRampRate =>
  wrapOpenInjectionStepRampRate(JvmCoreDsl.rampUsersPerSec(rate));
export const nothingFor = (duration: number, timeUnit?: TimeUnit): OpenInjectionStep =>
  wrapOpenInjectionStep(JvmCoreDsl.nothingFor(toJvmDuration(duration, timeUnit)));
export const incrementUsersPerSec = (rateIncrement: number): OpenInjectionStepStairs =>
  wrapOpenInjectionStepStairs(JvmCoreDsl.incrementUsersPerSec(rateIncrement));
