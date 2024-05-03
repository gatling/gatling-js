import JvmSetUp = io.gatling.javaapi.core.Simulation$SetUp;

import * as jvm from "./gatlingJvm/app";
import { Assertion } from "./assertions";
import { PopulationBuilder } from "./population";
import { ProtocolBuilder } from "./protocol";

// FIXME no export *
export * from "./gatlingJvm/callbacks";
export * from "./utils/duration";
export * from "./assertions";
export * from "./body";
export * from "./checks";
export * from "./closedInjection";
export * from "./common";
export * from "./feeders";
export * from "./openInjection";
export * from "./population";
export * from "./protocol";
export * from "./scenario";
export * from "./session";
export * from "./structure";

export interface SetUp {
  protocols(...protocols: ProtocolBuilder[]): SetUp;
  assertions(...assertions: Assertion[]): SetUp;
}

const wrapSetUp = (jvmSetUp: JvmSetUp): SetUp => ({
  protocols: (...protocols) => wrapSetUp(jvmSetUp.protocols(protocols.map((p) => p._underlying))),
  assertions: (...assertions) => wrapSetUp(jvmSetUp.assertions(assertions.map((p) => p._underlying)))
});

export type SetUpFunction = (...populationBuilders: PopulationBuilder[]) => SetUp;
export type Simulation = (setUp: SetUpFunction) => void;

export const runSimulation =
  (simulation: Simulation): jvm.Simulation =>
  (jvmSetUp) => {
    simulation((...populationBuilders) => wrapSetUp(jvmSetUp(populationBuilders.map((p) => p._underlying))));
  };
