import * as jvm from "./gatlingJvm/app";
import { ProtocolBuilder, PopulationBuilder } from "./core";

export * as core from "./core";
export * as http from "./http";

export interface SetUp {
  protocols(protocols: ProtocolBuilder[]): SetUp;
}
const wrapSetUp = (jvmSetUp: jvm.SetUp): SetUp => ({
  protocols: (protocols: ProtocolBuilder[]): SetUp => wrapSetUp(jvmSetUp.protocols(protocols.map((p) => p._underlying)))
});

export type SetUpFunction = (populationBuilder: PopulationBuilder[]) => SetUp;
export type Simulation = (setUp: SetUpFunction) => void;

export const runSimulation =
  (simulation: Simulation): jvm.Simulation =>
  (jvmSetUp) => {
    simulation((populationBuilders) => wrapSetUp(jvmSetUp(populationBuilders.map((p) => p._underlying))));
  };
