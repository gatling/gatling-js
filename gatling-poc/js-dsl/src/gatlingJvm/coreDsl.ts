export interface OpenInjectionStep {}

export interface OpenInjectionStepRamp {}

export interface OpenInjectionStepStressPeak {}

export interface OpenInjectionStepConstantRate {
  during(durationSeconds: number): ConstantRateOpenInjectionStep;
  // during(duration: Duration): ConstantRateOpenInjectionStep;
}

export interface ConstantRateOpenInjectionStep extends OpenInjectionStep {
  randomized(): OpenInjectionStep;
}

export interface OpenInjectionStepRampRate {}

export interface OpenInjectionStepStairs {}

export interface ProtocolBuilder {}

export interface ActionBuilder {}

export interface PopulationBuilder {}

export interface Session {}

export interface Execs<T extends Execs<T>> {
  exec(f: (session: Session) => Session): T;
  exec(actionBuilder: ActionBuilder): T;
  exec(...chainBuilders: ChainBuilder[]): T;
  exec(chainBuilders: ChainBuilder[]): T;
}

export interface ChainBuilder extends Execs<ChainBuilder> {}

export interface ScenarioBuilder extends Execs<ScenarioBuilder> {
  injectOpen(...steps: OpenInjectionStep[]): PopulationBuilder;
  injectOpen(steps: OpenInjectionStep[]): PopulationBuilder;
}

export interface CoreDsl extends Execs<ChainBuilder> {
  exec(f: (session: Session) => Session): ChainBuilder;
  exec(actionBuilder: ActionBuilder): ChainBuilder;
  exec(...chainBuilders: ChainBuilder[]): ChainBuilder;
  exec(chainBuilders: ChainBuilder[]): ChainBuilder;

  scenario(name: string): ScenarioBuilder;

  // OpenInjectionSupport
  rampUsers(users: number): OpenInjectionStepRamp;
  stressPeakUsers(users: number): OpenInjectionStepStressPeak;
  atOnceUsers(users: number): OpenInjectionStep;
  constantUsersPerSec(rate: number): OpenInjectionStepConstantRate;
  rampUsersPerSec(rate: number): OpenInjectionStepRampRate;
  nothingFor(durationSeconds: number): OpenInjectionStep;
  // nothingFor(duration: Duration): OpenInjectionStep;
  incrementUsersPerSec(rateIncrement: number): OpenInjectionStepStairs;
}

export const CoreDsl: CoreDsl = Java.type("io.gatling.javaapi.core.CoreDsl");
