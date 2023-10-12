import * as jvm from "./gatlingJvm/app";
import { exec, scenario, constantUsersPerSec, ProtocolBuilder, PopulationBuilder } from "./core";
import { http, httpProtocol } from "./http";

export * as core from "./core"
export * as http from "./http"

export interface SetUp {
  protocols(protocols: ProtocolBuilder[]): SetUp;
}
const wrapSetUp = (jvmSetUp: jvm.SetUp): SetUp => ({
  protocols: (protocols: ProtocolBuilder[]): SetUp => wrapSetUp(jvmSetUp.protocols(protocols.map((p) => p._underlying)))
});

export type SetUpFunction = (populationBuilder: PopulationBuilder[]) => SetUp;
export type Simulation = (setUp: SetUpFunction) => void;

export const runSimulation = (simulation: Simulation): void => {
  jvm.Gatling.fromGatlingJs(
    [],
    () =>
      new jvm.JsSimulation((jvmSetUp) => {
        simulation((populationBuilder) => wrapSetUp(jvmSetUp(populationBuilder.map((p) => p._underlying))));
      })
  );
};
