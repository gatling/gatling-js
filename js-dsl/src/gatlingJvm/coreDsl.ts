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

export interface PopulationBuilder {
  andThen(...children: PopulationBuilder[]): PopulationBuilder;
  andThen(children: PopulationBuilder[]): PopulationBuilder;
}

export interface Session {
  get<T>(key: string): T;
  set(key: string, value: any): Session;
}

export interface Execs<T extends Execs<T>> {
  exec(f: (session: Session) => Session): T;
  exec(actionBuilder: ActionBuilder): T;
  exec(...chainBuilders: ChainBuilder[]): T;
  exec(chainBuilders: ChainBuilder[]): T;
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

export interface ChainBuilder extends Execs<ChainBuilder> {}

export interface ScenarioBuilder extends StructureBuilder<ScenarioBuilder> {
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
