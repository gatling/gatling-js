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

import org.graalvm.polyglot.Value;

/**
 * Components created only once, when the simulation is first loaded, and reused by the JavaScript
 * contexts of all the other threads.
 */
public final class SharedComponents {

  @FunctionalInterface
  interface Factory {
    Object create();
  }

  private SharedComponents() {}

  /**
   * Create a shared component, or retrieve the one created in the primary context.
   *
   * <p>The factory is passed as a {@link Value} rather than a functional interface so that it isn't
   * recorded as a callback.
   *
   * @param key a key identifying the component, used to detect a simulation that doesn't create the
   *     same shared components every time it's loaded
   * @param factory a JavaScript function creating the component, must return a Java object or a
   *     primitive value (JavaScript objects belong to the context that created them)
   * @return the component
   */
  public static Object get(String key, Value factory) {
    JsThreadContext definingContext = JsRuntime.definingContext();
    if (definingContext == null) {
      // not loading a simulation (e.g. called from a callback)
      return toJava(key, factory.execute());
    }
    return definingContext.sharedComponent(key, () -> toJava(key, factory.execute()));
  }

  /**
   * @return true when loading the simulation again in the context of another thread, in which case
   *     side effects on shared state must be skipped
   */
  public static boolean isReplicaDefinition() {
    JsThreadContext definingContext = JsRuntime.definingContext();
    return definingContext != null && !definingContext.primary;
  }

  private static Object toJava(String key, Value value) {
    if (value.isNull()) {
      return null;
    } else if (value.isHostObject()) {
      return value.asHostObject();
    } else if (value.isString()) {
      return value.asString();
    } else if (value.isBoolean()) {
      return value.asBoolean();
    } else if (value.isNumber()) {
      return value.fitsInInt()
          ? (Object) value.asInt()
          : value.fitsInLong() ? (Object) value.asLong() : (Object) value.asDouble();
    }
    throw new IllegalArgumentException(
        "Shared component '"
            + key
            + "' must be a Java object or a primitive value, got "
            + value
            + ". Convert JavaScript objects and arrays with asJava().");
  }
}
