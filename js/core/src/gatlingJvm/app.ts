import JvmPopulationBuilder = io.gatling.javaapi.core.PopulationBuilder;
import JvmSetUp = io.gatling.javaapi.core.Simulation$SetUp;

export type SetUpFunction = (populationBuilders: JvmPopulationBuilder[]) => JvmSetUp;
export type Simulation = (setUp: SetUpFunction) => void;
