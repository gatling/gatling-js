import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { ClosedInjectionStep } from "./closedInjection";
import { OpenInjectionStep } from "./openInjection";
import { PopulationBuilder, wrapPopulationBuilder } from "./population";
import { StructureBuilder, structureBuilderImpl } from "./structure";

import JvmScenarioBuilder = io.gatling.javaapi.core.ScenarioBuilder;

/**
 * Javascript wrapper of a Java ScenarioBuilder.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface ScenarioBuilder extends StructureBuilder<ScenarioBuilder> {
  injectOpen(...steps: OpenInjectionStep[]): PopulationBuilder;
  injectClosed(...steps: ClosedInjectionStep[]): PopulationBuilder;
}

const wrapScenarioBuilder = (jvmScenarioBuilder: JvmScenarioBuilder): ScenarioBuilder => ({
  injectOpen: (...steps: OpenInjectionStep[]): PopulationBuilder =>
    wrapPopulationBuilder(jvmScenarioBuilder.injectOpen(steps.map((s) => s._underlying))),
  injectClosed: (...steps: ClosedInjectionStep[]): PopulationBuilder =>
    wrapPopulationBuilder(jvmScenarioBuilder.injectClosed(steps.map((s) => s._underlying))),
  ...structureBuilderImpl(jvmScenarioBuilder, wrapScenarioBuilder)
});

/**
 * Create a new immutable Scenario builder
 *
 * @param name - the scenario name
 * @returns a new Scenario builder
 */
export const scenario = (name: string): ScenarioBuilder => {
  const jvmScenarioBuilder = JvmCoreDsl.scenario(name);
  return wrapScenarioBuilder(jvmScenarioBuilder);
};
