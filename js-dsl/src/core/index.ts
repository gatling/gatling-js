import * as jvm from "../gatlingJvm/coreDsl";
import { Wrapper } from "../common";
import { wrapCallback } from "../gatlingJvm/callbacks";

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

export interface Session extends Wrapper<jvm.Session> {
  get<T>(key: string): T;
  set(key: string, value: any): Session;
}

export type SessionTransform = (session: Session) => Session;
const wrapSession = (_underlying: jvm.Session): Session => ({
  _underlying,
  get: <T>(key: string): T => _underlying.get(key),
  set: (key: string, value: any): Session => wrapSession(_underlying.set(key, value))
});
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

export interface PopulationBuilder extends Wrapper<jvm.PopulationBuilder> {
  andThen(children: PopulationBuilder[]): PopulationBuilder;
}

export interface ChainBuilder extends Execs<ChainBuilder>, Wrapper<jvm.ChainBuilder> {}

export type Exec = SessionTransform | ActionBuilder | ChainBuilder[];
export const underlyingExec = (exec: Exec) =>
  typeof exec === "function"
    ? wrapCallback(underlyingSessionTransform(exec))
    : Array.isArray(exec)
    ? exec.map((e) => e._underlying)
    : exec._underlying;

export interface Execs<T extends Execs<T>> {
  exec(exec: Exec): T;
}

export interface On<T extends StructureBuilder<T>> {
  on(chain: ChainBuilder): T;
}

export interface During<T extends StructureBuilder<T>> {
  during(duration: number): On<T>;
}

export interface Repeat<T extends StructureBuilder<T>> {
  repeat(times: number): On<T>;
}

export interface StructureBuilder<T extends StructureBuilder<T>> extends Execs<T>, During<T>, Repeat<T> {}

const wrapChainBuilder = (_underlying: jvm.ChainBuilder): ChainBuilder => ({
  _underlying,
  exec: (exec: Exec): ChainBuilder => {
    return wrapChainBuilder(_underlying.exec(underlyingExec(exec)));
  }
});

const wrapPopulationBuilder = (_underlying: jvm.PopulationBuilder): PopulationBuilder => ({
  _underlying,
  andThen: (children: PopulationBuilder[]): PopulationBuilder =>
    wrapPopulationBuilder(_underlying.andThen(children.map((c) => c._underlying)))
});

const wrapOn = <JvmT extends jvm.StructureBuilder<JvmT>, T extends StructureBuilder<T>>(
  jvmOn: jvm.On<JvmT>,
  wrap: (underlying: JvmT) => T
): On<T> => ({
  on: (chain: ChainBuilder): T => wrap(jvmOn.on(chain._underlying))
});

export interface ScenarioBuilder extends StructureBuilder<ScenarioBuilder> {
  injectOpen(steps: OpenInjectionStep[]): PopulationBuilder;
}

const wrapScenarioBuilder = (jvmScenarioBuilder: jvm.ScenarioBuilder): ScenarioBuilder => ({
  injectOpen: (steps: OpenInjectionStep[]): PopulationBuilder =>
    wrapPopulationBuilder(jvmScenarioBuilder.injectOpen(steps.map((s) => s._underlying))),
  during: (duration: number): On<ScenarioBuilder> => wrapOn(jvmScenarioBuilder.during(duration), wrapScenarioBuilder),
  exec: (exec) => wrapScenarioBuilder(jvmScenarioBuilder.exec(underlyingExec(exec))),
  repeat: (times: number): On<ScenarioBuilder> => wrapOn(jvmScenarioBuilder.repeat(times), wrapScenarioBuilder)
});

export const scenario = (name: string): ScenarioBuilder => {
  const jvmScenarioBuilder = jvm.CoreDsl.scenario(name);
  return wrapScenarioBuilder(jvmScenarioBuilder);
};

export const exec = (exec: Exec): ChainBuilder => wrapChainBuilder(jvm.CoreDsl.exec(underlyingExec(exec)));
