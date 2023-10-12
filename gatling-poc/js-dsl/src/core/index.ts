import * as jvm from "../gatlingJvm/coreDsl";
import { Wrapper } from "../common";

// OpenInjectionSupport
export interface OpenInjectionStep extends Wrapper<jvm.OpenInjectionStep> {}
export interface ConstantRateOpenInjectionStep extends OpenInjectionStep {
  randomized(): OpenInjectionStep;
}
const wrapOpenInjectionStep = (jvmOpenInjectionStep: jvm.OpenInjectionStep): OpenInjectionStep => ({
  _underlying: jvmOpenInjectionStep
});
const wrapConstantRateOpenInjectionStep = (
  jvmOpenInjectionStep: jvm.ConstantRateOpenInjectionStep
): ConstantRateOpenInjectionStep => ({
  _underlying: jvmOpenInjectionStep,
  randomized: (): OpenInjectionStep => wrapOpenInjectionStep(jvmOpenInjectionStep.randomized())
});

// export interface OpenInjectionStepRamp {}
// export interface OpenInjectionStepStressPeak {}
export interface OpenInjectionStepConstantRate {
  during(durationSeconds: number): ConstantRateOpenInjectionStep;
  // during(duration: Duration): ConstantRateOpenInjectionStep;
}
// export interface OpenInjectionStepRampRate {}
// export interface OpenInjectionStepStairs {}

// rampUsers(users: number): OpenInjectionStepRamp;
// stressPeakUsers(users: number): OpenInjectionStepStressPeak;
export const atOnceUsers = (users: number): OpenInjectionStep => wrapOpenInjectionStep(jvm.CoreDsl.atOnceUsers(users));
export const constantUsersPerSec = (rate: number): OpenInjectionStepConstantRate => {
  const jvmOpenInjectionStepConstantRate = jvm.CoreDsl.constantUsersPerSec(rate);
  return {
    during: (durationSeconds: number): ConstantRateOpenInjectionStep =>
      wrapConstantRateOpenInjectionStep(jvmOpenInjectionStepConstantRate.during(durationSeconds))
  };
};
// rampUsersPerSec(rate: number): OpenInjectionStepRampRate;
// nothingFor(durationSeconds: number): OpenInjectionStep;
// nothingFor(duration: Duration): OpenInjectionStep;
// incrementUsersPerSec(rateIncrement: number): OpenInjectionStepStairs;

// end OpenInjectionSupport

export interface ProtocolBuilder extends Wrapper<jvm.ProtocolBuilder> {}

export interface Session extends Wrapper<jvm.Session> {}

export type SessionTransform = (session: Session) => Session;
const wrapSession = (_underlying: jvm.Session): Session => ({ _underlying });
export const underlyingSessionTransform =
  (f: SessionTransform): ((jvmSession: jvm.Session) => jvm.Session) =>
  (jvmSession: jvm.Session) =>
    f(wrapSession(jvmSession))._underlying;
export type SessionToString = (session: Session) => string;
export const underlyingSessionToString =
  (f: SessionToString): ((jvmSession: jvm.Session) => string) =>
  (jvmSession: jvm.Session) =>
    f(wrapSession(jvmSession));

export interface ActionBuilder extends Wrapper<jvm.ActionBuilder> {}

export interface PopulationBuilder extends Wrapper<jvm.PopulationBuilder> {}

export interface ChainBuilder extends Execs<ChainBuilder>, Wrapper<jvm.ChainBuilder> {}

export type Exec = SessionTransform | ActionBuilder | ChainBuilder[];
export const underlyingExec = (exec: Exec) =>
  typeof exec === "function"
    ? underlyingSessionTransform(exec)
    : Array.isArray(exec)
    ? exec.map((e) => e._underlying)
    : exec._underlying;

export interface Execs<T extends Execs<T>> {
  exec(exec: Exec): T;
}

const wrapChainBuilder = (jvmChainBuilder: jvm.ChainBuilder): ChainBuilder => ({
  _underlying: jvmChainBuilder,
  exec: (exec: Exec): ChainBuilder => {
    return wrapChainBuilder(jvmChainBuilder.exec(underlyingExec(exec)));
  }
});

const wrapPopulationBuilder = (jvmPopulationBuilder: jvm.PopulationBuilder): PopulationBuilder => ({
  _underlying: jvmPopulationBuilder
});

export interface ScenarioBuilder extends Execs<ScenarioBuilder> {
  injectOpen(steps: OpenInjectionStep[]): PopulationBuilder;
}

const wrapScenarioBuilder = (jvmScenarioBuilder: jvm.ScenarioBuilder): ScenarioBuilder => ({
  injectOpen: (steps: OpenInjectionStep[]): PopulationBuilder =>
    wrapPopulationBuilder(jvmScenarioBuilder.injectOpen(steps.map((s) => s._underlying))),
  exec: (exec) => wrapScenarioBuilder(jvmScenarioBuilder.exec(underlyingExec(exec)))
});

export const scenario = (name: string): ScenarioBuilder => {
  const jvmScenarioBuilder = jvm.CoreDsl.scenario(name);
  return wrapScenarioBuilder(jvmScenarioBuilder);
};

export const exec = (exec: Exec): ChainBuilder => wrapChainBuilder(jvm.CoreDsl.exec(underlyingExec(exec)));
