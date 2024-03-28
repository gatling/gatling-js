import PopulationBuilder = io.gatling.javaapi.core.PopulationBuilder;
import ProtocolBuilder = io.gatling.javaapi.core.ProtocolBuilder;

export interface SetUp {
  protocols(...protocols: ProtocolBuilder[]): SetUp;
  protocols(protocols: ProtocolBuilder[]): SetUp;
}

export type SetUpFunction = (populationBuilders: PopulationBuilder[]) => SetUp;
export type Simulation = (setUp: SetUpFunction) => void;
