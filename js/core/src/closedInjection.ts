import "@gatling.io/jvm-types";
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

export interface ClosedInjectionStep extends Wrapper<JvmClosedInjectionStep> {}
const wrapClosedInjectionStep = (_underlying: JvmClosedInjectionStep): ClosedInjectionStep => ({ _underlying });

export interface ClosedInjectionStepConstant extends Wrapper<JvmClosedInjectionStepConstant> {
  during(duration: Duration): ClosedInjectionStep;
}
const wrapClosedInjectionStepConstant = (_underlying: JvmClosedInjectionStepConstant): ClosedInjectionStepConstant => ({
  _underlying,
  during: (duration: Duration) => wrapClosedInjectionStep(_underlying.during(toJvmDuration(duration)))
});

export interface ClosedInjectionStepRamp extends Wrapper<JvmClosedInjectionStepRamp> {
  to(t: number): ClosedInjectionStepRampTo;
}
const wrapClosedInjectionStepRamp = (_underlying: JvmClosedInjectionStepRamp): ClosedInjectionStepRamp => ({
  _underlying,
  to: (t: number) => wrapClosedInjectionStepRampTo(_underlying.to(t))
});

export interface ClosedInjectionStepRampTo extends Wrapper<JvmClosedInjectionStepRampTo> {
  during(duration: Duration): ClosedInjectionStep;
}
const wrapClosedInjectionStepRampTo = (_underlying: JvmClosedInjectionStepRampTo): ClosedInjectionStepRampTo => ({
  _underlying,
  during: (duration: Duration) => wrapClosedInjectionStep(_underlying.during(toJvmDuration(duration)))
});

export interface ClosedInjectionStepStairs extends Wrapper<JvmClosedInjectionStepStairs> {
  times(levels: number): ClosedInjectionStepStairsWithTime;
}
const wrapClosedInjectionStepStairs = (_underlying: JvmClosedInjectionStepStairs): ClosedInjectionStepStairs => ({
  _underlying,
  times: (levels: number) => wrapClosedInjectionStepStairsWithTime(_underlying.times(levels))
});

export interface ClosedInjectionStepStairsWithTime extends Wrapper<JvmClosedInjectionStepStairsWithTime> {
  eachLevelLasting(duration: Duration): ClosedInjectionStepComposite;
}
const wrapClosedInjectionStepStairsWithTime = (
  _underlying: JvmClosedInjectionStepStairsWithTime
): ClosedInjectionStepStairsWithTime => ({
  _underlying,
  eachLevelLasting: (duration: Duration) =>
    wrapClosedInjectionStepComposite(_underlying.eachLevelLasting(toJvmDuration(duration)))
});

export interface ClosedInjectionStepComposite extends ClosedInjectionStep {
  startingFrom(startingUsers: number): ClosedInjectionStepComposite;
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

export const constantConcurrentUsers = (users: number): ClosedInjectionStepConstant =>
  wrapClosedInjectionStepConstant(JvmCoreDsl.constantConcurrentUsers(users));
export const rampConcurrentUsers = (from: number): ClosedInjectionStepRamp =>
  wrapClosedInjectionStepRamp(JvmCoreDsl.rampConcurrentUsers(from));
export const incrementConcurrentUsers = (usersIncrement: number): ClosedInjectionStepStairs =>
  wrapClosedInjectionStepStairs(JvmCoreDsl.incrementConcurrentUsers(usersIncrement));