package io.gatling.js;

import com.oracle.truffle.js.runtime.JSContextOptions;
import io.gatling.javaapi.core.PopulationBuilder;
import io.gatling.javaapi.core.Simulation;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.TypeLiteral;
import scala.Function0;

import javax.annotation.Nonnull;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class JsSimulation extends Simulation {
    private static final String JS = "js";

    public JsSimulation() {
        var bundlePath = new File(getProperty("gatling.js.bundlePath"));
        var entryPoint = getProperty("gatling.js.entryPoint");

        // Context is not closed because it will live for the entire duration of the process
        var context = Context.newBuilder(JS)
                .allowAllAccess(true)
                .option(JSContextOptions.STRICT_NAME, "true")
                .build();

        try {
            context.eval(Source.newBuilder(JS, bundlePath).mimeType("application/javascript").build());
        } catch (IOException e) {
            throw new IllegalStateException("Cannot load Javascript bundle file at path " + bundlePath, e);
        }

        Consumer<Function<List<PopulationBuilder>, SetUp>> jsSimulation = context.getBindings(JS)
                .getMember("gatling")
                .getMember(entryPoint)
                .as(new TypeLiteral<>() {});

        jsSimulation.accept(this::setUp);
    }

    private String getProperty(String name) {
        var p = System.getProperty(name);
        if (p == null) {
            throw new IllegalStateException("System property " + name + " must be defined to run a Javascript simulation");
        }
        return p;
    }
}
