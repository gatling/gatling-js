import { PopulationBuilder, ProtocolBuilder } from "./coreDsl";

export interface SetUp {
  protocols(...protocols: ProtocolBuilder[]): SetUp;
  protocols(protocols: ProtocolBuilder[]): SetUp;
}

export type SetUpFunction = (populationBuilders: PopulationBuilder[]) => SetUp;
export type Simulation = (setUp: SetUpFunction) => void;

// export interface JsSimulationConstructor {
//   new (executeSetUp: (setUp: SetUpFunction) => void): JsSimulation;
// }
// export interface JsSimulation {}
// export const JsSimulation: JsSimulationConstructor = Java.type("io.gatling.js.JsSimulation");
//
// export interface Gatling {
//   fromGatlingJs(args: string[], newSimulation: () => JsSimulation): number;
// }
// export const Gatling: Gatling = Java.type("io.gatling.app.Gatling");
