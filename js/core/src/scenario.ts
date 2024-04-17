import "@gatling.io/jvm-types";
import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { StructureBuilder, structureBuilderImpl } from "./structure";
import { ClosedInjectionStep } from "./closedInjection";
import { OpenInjectionStep } from "./openInjection";
import { PopulationBuilder, wrapPopulationBuilder } from "./population";

import JvmScenarioBuilder = io.gatling.javaapi.core.ScenarioBuilder;

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

export const scenario = (name: string): ScenarioBuilder => {
  const jvmScenarioBuilder = JvmCoreDsl.scenario(name);
  return wrapScenarioBuilder(jvmScenarioBuilder);
};
