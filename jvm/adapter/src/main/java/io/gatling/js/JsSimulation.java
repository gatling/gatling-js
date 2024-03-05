package io.gatling.js;

import com.oracle.truffle.js.runtime.JSContextOptions;
import io.gatling.javaapi.core.PopulationBuilder;
import io.gatling.javaapi.core.Simulation;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.TypeLiteral;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;

public class JsSimulation extends Simulation {
    private static final String JS = "js";

    public JsSimulation() {
        var entryPoint = Optional.ofNullable(System.getProperty("gatling.js.entryPoint")).orElseThrow(() -> new NoSuchElementException("System property gatling.js.entryPoint must be defined"));
        var bundleUrl =
                Optional.ofNullable(System.getProperty("gatling.js.bundle.filePath")).map(this::filePathToUrl)
                        .or(() -> Optional.ofNullable(System.getProperty("gatling.js.bundle.resourcePath")).map(this::resourcePathToUrl))
                        .orElseThrow(() -> new NoSuchElementException("One of the system properties gatling.js.bundle.filePath or gatling.js.bundle.resourcePath must be defined"));

        // Context is not closed because it will live for the entire duration of the process
        var context = Context.newBuilder(JS)
                .allowAllAccess(true)
                .option(JSContextOptions.STRICT_NAME, "true")
                .build();

        try {
            context.eval(Source.newBuilder(JS, bundleUrl).mimeType("application/javascript").build());
        } catch (IOException e) {
            throw new IllegalStateException("Cannot load Javascript bundle file at " + bundleUrl, e);
        }

        Consumer<Function<List<PopulationBuilder>, SetUp>> jsSimulation = context.getBindings(JS)
                .getMember("gatling")
                .getMember(entryPoint)
                .as(new TypeLiteral<>() {});

        jsSimulation.accept(this::setUp);
    }

    private URL filePathToUrl(String filePath) {
        try {
            return Paths.get(filePath).toUri().toURL();
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Not a valid file path: " + filePath, e);
        }
    }

    private URL resourcePathToUrl(String resourcePath) {
        var url = getClass().getClassLoader().getResource(resourcePath);
        if (url == null) {
            throw new IllegalArgumentException("Not a valid resource path: " + resourcePath);
        }
        return url;
    }
}
