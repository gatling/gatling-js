/*
 * Copyright 2011-2026 GatlingCorp (https://gatling.io)
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

import io.gatling.javaapi.core.PopulationBuilder;
import io.gatling.javaapi.core.Simulation;
import io.netty.util.NettyRuntime;
import io.netty.util.internal.SystemPropertyUtil;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;
import org.graalvm.polyglot.Source;

public class JsSimulationHelper {

  public static void loadSimulation(Function<List<PopulationBuilder>, Simulation.SetUp> setUp) {
    var simulationName =
        Optional.ofNullable(System.getProperty("gatling.js.simulation"))
            .orElseThrow(
                () ->
                    new NoSuchElementException(
                        "System property gatling.js.simulation must be defined"));
    var bundleUrl =
        Optional.ofNullable(System.getProperty("gatling.js.bundle.filePath"))
            .map(JsSimulationHelper::filePathToUrl)
            .or(
                () ->
                    Optional.ofNullable(System.getProperty("gatling.js.bundle.resourcePath"))
                        .map(JsSimulationHelper::resourcePathToUrl))
            .orElseThrow(
                () ->
                    new NoSuchElementException(
                        "One of the system properties gatling.js.bundle.filePath or gatling.js.bundle.resourcePath must be defined"));

    Source bundle;
    try {
      bundle =
          Source.newBuilder(JsContext.LANGUAGE, bundleUrl)
              .mimeType("application/javascript")
              .build();
    } catch (IOException e) {
      throw new IllegalStateException("Cannot load Javascript bundle file at " + bundleUrl, e);
    }

    // Engine and contexts are never closed because they will live for the entire duration of the
    // process
    var engine = JsContext.newEngine();
    Supplier<Object> replicaSetUp =
        () -> {
          // throwaway simulation, so that setUp has no side effect
          Function<List<PopulationBuilder>, Simulation.SetUp> noopSetUp =
              new Simulation() {}::setUp;
          return noopSetUp;
        };
    JsRuntime.load(
        () -> JsContext.newContext(engine),
        bundle,
        simulationName,
        setUp,
        replicaSetUp,
        Integer.getInteger("gatling.js.preloadedContexts", defaultEventLoopCount()));
  }

  // same as Netty's default, used by Gatling
  private static int defaultEventLoopCount() {
    return Math.max(
        1,
        SystemPropertyUtil.getInt(
            "io.netty.eventLoopThreads", NettyRuntime.availableProcessors() * 2));
  }

  private static URL filePathToUrl(String filePath) {
    try {
      Path path = Paths.get(filePath);
      return URI.create("file:" + path.toString().replaceAll("\\\\", "/")).toURL();
    } catch (MalformedURLException e) {
      throw new IllegalArgumentException("Not a valid file path: " + filePath, e);
    }
  }

  private static URL resourcePathToUrl(String resourcePath) {
    var url = JsSimulationHelper.class.getClassLoader().getResource(resourcePath);
    if (url == null) {
      throw new IllegalArgumentException("Not a valid resource path: " + resourcePath);
    }
    return url;
  }
}
