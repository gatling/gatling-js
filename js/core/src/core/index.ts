import "@gatling.io/jvm-types";
import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Wrapper } from "../common";
import { wrapCallback } from "../gatlingJvm/callbacks";
import JvmProtocolBuilder = io.gatling.javaapi.core.ProtocolBuilder;
import JvmSession = io.gatling.javaapi.core.Session;
import JvmActionBuilder = io.gatling.javaapi.core.ActionBuilder;
import JvmChainBuilder = io.gatling.javaapi.core.ChainBuilder;
import JvmPopulationBuilder = io.gatling.javaapi.core.PopulationBuilder;
import JvmStructureBuilder = io.gatling.javaapi.core.StructureBuilder;
import JvmScenarioBuilder = io.gatling.javaapi.core.ScenarioBuilder;

import { ClosedInjectionStep } from "./closedInjection";
import { OpenInjectionStep } from "./openInjection";

export * from "./closedInjection";
export * from "./openInjection";

export interface ProtocolBuilder extends Wrapper<JvmProtocolBuilder> {}

export interface Session extends Wrapper<JvmSession> {
  get<T>(key: string): T;
  set(key: string, value: any): Session;
}

export type SessionTransform = (session: Session) => Session;
const wrapSession = (_underlying: JvmSession): Session => ({
  _underlying,
  get: <T>(key: string): T => _underlying.get(key),
  set: (key: string, value: any): Session => wrapSession(_underlying.set(key, value))
});
export const underlyingSessionTransform =
  (f: SessionTransform): ((jvmSession: JvmSession) => JvmSession) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession))._underlying;
export type SessionToString = (session: Session) => string;
export const underlyingSessionToString =
  (f: SessionToString): ((jvmSession: JvmSession) => string) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession));

export interface ActionBuilder extends Wrapper<JvmActionBuilder> {}

export interface PopulationBuilder extends Wrapper<JvmPopulationBuilder> {
  andThen(children: PopulationBuilder[]): PopulationBuilder;
}

export interface ChainBuilder extends Execs<ChainBuilder>, Wrapper<JvmChainBuilder> {}

export type Exec = SessionTransform | ActionBuilder | ChainBuilder[];
interface JvmExecs {
  exec<T>(...arg0: JvmChainBuilder[]): T;
  exec<T>(arg0: JvmActionBuilder): T;
  exec<T>(arg0: Func<JvmSession, JvmSession>): T;
  exec<T>(arg0: JvmChainBuilder[]): T;
}
export const underlyingExec = <T>(jvmExecs: JvmExecs, exec: Exec): T =>
  typeof exec === "function"
    ? jvmExecs.exec<T>(wrapCallback(underlyingSessionTransform(exec)))
    : Array.isArray(exec)
      ? jvmExecs.exec<T>(exec.map((e) => e._underlying))
      : jvmExecs.exec<T>(exec._underlying);

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

const wrapChainBuilder = (_underlying: JvmChainBuilder): ChainBuilder => ({
  _underlying,
  exec: (exec: Exec): ChainBuilder => {
    return wrapChainBuilder(underlyingExec<JvmChainBuilder>(_underlying, exec));
  }
});

const wrapPopulationBuilder = (_underlying: JvmPopulationBuilder): PopulationBuilder => ({
  _underlying,
  andThen: (children: PopulationBuilder[]): PopulationBuilder =>
    wrapPopulationBuilder(_underlying.andThen(children.map((c) => c._underlying)))
});

interface JvmOn<T> {
  // In the Java DSL, there is a different On class for each type of condition/loop, but the signature of the on method
  // remains the same.
  on(arg0: JvmChainBuilder): T;
}

const wrapOn = <JvmT extends JvmStructureBuilder<JvmT, any>, T extends StructureBuilder<T>>(
  jvmOn: JvmOn<JvmT>,
  wrap: (underlying: JvmT) => T
): On<T> => ({
  on: (chain: ChainBuilder): T => wrap(jvmOn.on(chain._underlying))
});

export interface ScenarioBuilder extends StructureBuilder<ScenarioBuilder> {
  injectOpen(...steps: OpenInjectionStep[]): PopulationBuilder;
  injectClosed(...steps: ClosedInjectionStep[]): PopulationBuilder;
}

const wrapScenarioBuilder = (jvmScenarioBuilder: JvmScenarioBuilder): ScenarioBuilder => ({
  injectOpen: (...steps: OpenInjectionStep[]): PopulationBuilder =>
    wrapPopulationBuilder(jvmScenarioBuilder.injectOpen(steps.map((s) => s._underlying))),
  injectClosed: (...steps: ClosedInjectionStep[]): PopulationBuilder =>
    wrapPopulationBuilder(jvmScenarioBuilder.injectClosed(steps.map((s) => s._underlying))),
  during: (duration: number): On<ScenarioBuilder> =>
    wrapOn(jvmScenarioBuilder.during<JvmScenarioBuilder>(duration), wrapScenarioBuilder),
  exec: (exec) => wrapScenarioBuilder(underlyingExec<JvmScenarioBuilder>(jvmScenarioBuilder, exec)),
  repeat: (times: number): On<ScenarioBuilder> =>
    wrapOn(jvmScenarioBuilder.repeat<JvmScenarioBuilder>(times), wrapScenarioBuilder)
});

export const scenario = (name: string): ScenarioBuilder => {
  const jvmScenarioBuilder = JvmCoreDsl.scenario(name);
  return wrapScenarioBuilder(jvmScenarioBuilder);
};

export const exec = (exec: Exec): ChainBuilder => wrapChainBuilder(underlyingExec<JvmChainBuilder>(JvmCoreDsl, exec));
