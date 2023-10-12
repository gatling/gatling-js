package io.gatling.js;

import io.gatling.javaapi.core.PopulationBuilder;
import io.gatling.javaapi.core.Simulation;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class JsSimulation extends Simulation {
    public JsSimulation(
            Consumer<Function<List<PopulationBuilder>, Simulation.SetUp>> executeSetUp
    ) {
        executeSetUp.accept(this::setUp);
    }
}
