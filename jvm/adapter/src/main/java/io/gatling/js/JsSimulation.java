/*
 * Copyright 2011-2024 GatlingCorp (https://gatling.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.gatling.js;

import com.oracle.truffle.js.runtime.JSContextOptions;
import io.gatling.javaapi.core.PopulationBuilder;
import io.gatling.javaapi.core.Simulation;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;

public class JsSimulation extends Simulation {
  private static final String JS = "js";
  private static final Map<String, Consumer<Function<List<PopulationBuilder>, SetUp>>>
      JS_SIMULATIONS = new HashMap<>();

  public static void registerJsSimulation(
      String name, Consumer<Function<List<PopulationBuilder>, SetUp>> simulation) {
    if (JS_SIMULATIONS.containsKey(name)) {
      throw new RuntimeException("A simulation named " + name + " already exists.");
    }
    JS_SIMULATIONS.put(name, simulation);
  }

  public JsSimulation() {
    var simulationName =
        Optional.ofNullable(System.getProperty("gatling.js.simulationName"))
            .orElseThrow(
                () ->
                    new NoSuchElementException(
                        "System property gatling.js.simulationName must be defined"));
    var bundleUrl =
        Optional.ofNullable(System.getProperty("gatling.js.bundle.filePath"))
            .map(this::filePathToUrl)
            .or(
                () ->
                    Optional.ofNullable(System.getProperty("gatling.js.bundle.resourcePath"))
                        .map(this::resourcePathToUrl))
            .orElseThrow(
                () ->
                    new NoSuchElementException(
                        "One of the system properties gatling.js.bundle.filePath or gatling.js.bundle.resourcePath must be defined"));

    // Context is never closed because it will live for the entire duration of the process
    var context =
        Context.newBuilder(JS)
            .allowAllAccess(true)
            .option(JSContextOptions.STRICT_NAME, "true")
            .build();

    try {
      context.eval(Source.newBuilder(JS, bundleUrl).mimeType("application/javascript").build());
    } catch (IOException e) {
      throw new IllegalStateException("Cannot load Javascript bundle file at " + bundleUrl, e);
    }

    context.getBindings(JS).getMember("gatling");

    var jsSimulation = JS_SIMULATIONS.get(simulationName);
    if (jsSimulation == null) {
      throw new RuntimeException("Simulation named " + simulationName + " was not found.");
    }
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
