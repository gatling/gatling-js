import "@gatling.io/jvm-types";

import { Wrapper } from "./common";

import JvmPopulationBuilder = io.gatling.javaapi.core.PopulationBuilder;

export interface PopulationBuilder extends Wrapper<JvmPopulationBuilder> {
  andThen(...children: PopulationBuilder[]): PopulationBuilder;
}

export const wrapPopulationBuilder = (_underlying: JvmPopulationBuilder): PopulationBuilder => ({
  _underlying,
  andThen: (...children: PopulationBuilder[]): PopulationBuilder =>
    wrapPopulationBuilder(_underlying.andThen(children.map((c) => c._underlying)))
});
