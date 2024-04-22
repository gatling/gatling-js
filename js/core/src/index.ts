import * as jvm from "./gatlingJvm/app";

import { PopulationBuilder } from "./population";
import { ProtocolBuilder } from "./protocol";

// FIXME no export *
export * from "./gatlingJvm/callbacks";

export * from "./body";
export {
  CheckBuilder,
  CheckBuilderFinal,
  CheckBuilderValidate,
  CheckBuilderFind,
  CheckBuilderMultipleFind,
  bodyString,
  bodyLength,
  substring,
  xpath,
  css,
  form,
  // TODO jsonPath, jmesPath, jsonpJsonPath, jsonpJmesPath, regex
  md5,
  sha1,
  responseTimeInMillis,
  wrapCheckBuilderFind,
  wrapCheckBuilderMultipleFind
} from "./checks";
export * from "./closedInjection";
export * from "./common";
export {
  FeederBuilder,
  FileBasedFeederBuilder,
  BatchableFeederBuilder,
  csv,
  ssv,
  tsv,
  separatedValues,
  jsonFile,
  jsonUrl,
  arrayFeeder
} from "./feederBuilder";
export * from "./openInjection";
export * from "./population";
export * from "./protocol";
export * from "./scenario";
export * from "./session";
export * from "./structure";

export interface SetUp {
  protocols(...protocols: ProtocolBuilder[]): SetUp;
}

const wrapSetUp = (jvmSetUp: jvm.SetUp): SetUp => ({
  protocols: (...protocols: ProtocolBuilder[]): SetUp =>
    wrapSetUp(jvmSetUp.protocols(protocols.map((p) => p._underlying)))
});

export type SetUpFunction = (...populationBuilders: PopulationBuilder[]) => SetUp;
export type Simulation = (setUp: SetUpFunction) => void;

export const runSimulation =
  (simulation: Simulation): jvm.Simulation =>
  (jvmSetUp) => {
    simulation((...populationBuilders) => wrapSetUp(jvmSetUp(populationBuilders.map((p) => p._underlying))));
  };
