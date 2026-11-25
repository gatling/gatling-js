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

import io.netty.util.concurrent.FastThreadLocal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.function.Supplier;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Engine;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;

/**
 * Runs a JavaScript simulation with one JavaScript context per thread.
 *
 * <p>A JavaScript context can't be used by multiple threads concurrently: doing so either fails,
 * or, with {@link com.oracle.truffle.js.lang.JavaScriptLanguageHack}, serializes all the threads on
 * the context lock. Instead:
 *
 * <ul>
 *   <li>the simulation is loaded in a primary context, which produces the Gatling model that is
 *       actually executed
 *   <li>each thread invoking JavaScript callbacks gets its own replica context, in which the
 *       simulation was loaded again, and callbacks are redirected to their equivalent in this
 *       replica
 *   <li>all the contexts share the same engine, so code is only parsed and compiled once
 * </ul>
 */
public final class JsRuntime {

  static final String DETERMINISM_HINT =
      "The simulation must create the same callbacks and shared components, in the same order, every time it's loaded.";

  private static final ThreadLocal<JsThreadContext> DEFINING_CONTEXT = new ThreadLocal<>();
  private static volatile JsRuntime instance;

  private final Supplier<Context> contextFactory;
  private final Source bundle;
  private final String simulationName;
  private final Supplier<Object> replicaSetUp;
  private final ConcurrentLinkedQueue<JsThreadContext> preloadedReplicas =
      new ConcurrentLinkedQueue<>();
  private final FastThreadLocal<JsThreadContext> threadContexts =
      new FastThreadLocal<>() {
        @Override
        protected JsThreadContext initialValue() {
          var preloaded = preloadedReplicas.poll();
          return preloaded != null ? preloaded : newReplica();
        }
      };
  private volatile JsThreadContext primary;

  private JsRuntime(
      Supplier<Context> contextFactory,
      Source bundle,
      String simulationName,
      Supplier<Object> replicaSetUp) {
    this.contextFactory = contextFactory;
    this.bundle = bundle;
    this.simulationName = simulationName;
    this.replicaSetUp = replicaSetUp;
  }

  /**
   * Load a simulation in the current thread's context, then preload replicas for other threads.
   *
   * @param contextFactory creates a context, all contexts should share the same {@link Engine}
   * @param bundle the JavaScript bundle
   * @param simulationName the name of the simulation in the bundle
   * @param setUp the real setUp function, passed to the simulation in the primary context
   * @param replicaSetUp creates a setUp function with no side effect, passed to the simulation in
   *     the replica contexts
   * @param preloadedReplicas the number of replicas to create upfront, typically the number of
   *     Gatling event loops; more are created lazily if needed
   */
  public static void load(
      Supplier<Context> contextFactory,
      Source bundle,
      String simulationName,
      Object setUp,
      Supplier<Object> replicaSetUp,
      int preloadedReplicas) {
    if (instance != null) {
      throw new IllegalStateException("A JavaScript simulation was already loaded");
    }
    var runtime = new JsRuntime(contextFactory, bundle, simulationName, replicaSetUp);
    var primary = new JsThreadContext(contextFactory.get(), true);
    runtime.define(primary, setUp);
    runtime.primary = primary;
    runtime.threadContexts.set(primary);
    instance = runtime;
    // also validates that the simulation is deterministic before starting it
    runtime.preloadReplicas(Math.max(preloadedReplicas, 1));
  }

  // for tests
  static void unload() {
    instance = null;
  }

  static JsThreadContext definingContext() {
    return DEFINING_CONTEXT.get();
  }

  static JsThreadContext primaryContext() {
    return instance.primary;
  }

  /**
   * @return the function to invoke instead of the one at this index in the primary context, or null
   *     if the primary one must be used
   */
  static Object functionForCurrentThread(int index) {
    var runtime = instance;
    if (runtime == null || DEFINING_CONTEXT.get() != null) {
      // invoked while loading the simulation (e.g. a shared component invoking a callback)
      return null;
    }
    var context = runtime.threadContexts.get();
    return context.primary ? null : context.function(index);
  }

  private void define(JsThreadContext context, Object setUp) {
    DEFINING_CONTEXT.set(context);
    try {
      context.context.eval(bundle);
      Value jsIifeWrapper = context.context.getBindings(JsContext.LANGUAGE).getMember("gatling");
      Value jsSimulationValue = jsIifeWrapper.getMember(simulationName);
      if (jsSimulationValue == null) {
        throw new NoSuchElementException(
            "Simulation '" + simulationName + "' was not found in the JavaScript bundle");
      }
      jsSimulationValue.executeVoid(setUp);
    } finally {
      DEFINING_CONTEXT.remove();
      context.freeze();
    }
  }

  private JsThreadContext newReplica() {
    var replica = new JsThreadContext(contextFactory.get(), false);
    define(replica, replicaSetUp.get());
    replica.verifyMatches(primary);
    return replica;
  }

  private void preloadReplicas(int count) {
    var executor =
        Executors.newFixedThreadPool(
            Math.min(count, Runtime.getRuntime().availableProcessors()),
            r -> {
              var thread = new Thread(r, "gatling-js-preload");
              thread.setDaemon(true);
              return thread;
            });
    try {
      List<Future<JsThreadContext>> futures = new ArrayList<>(count);
      for (int i = 0; i < count; i++) {
        futures.add(executor.submit(this::newReplica));
      }
      for (var future : futures) {
        preloadedReplicas.add(future.get());
      }
    } catch (ExecutionException e) {
      throw e.getCause() instanceof RuntimeException re
          ? re
          : new IllegalStateException("Failed to load the simulation", e.getCause());
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      throw new IllegalStateException(e);
    } finally {
      executor.shutdown();
    }
  }
}
