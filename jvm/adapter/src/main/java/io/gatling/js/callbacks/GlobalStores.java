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

package io.gatling.js.callbacks;

import java.util.concurrent.ConcurrentMap;
import org.graalvm.polyglot.Value;

public final class GlobalStores {
  private GlobalStores() {}

  /**
   * Same as {@link ConcurrentMap#compute}, with a JavaScript update function.
   *
   * <p>The function is passed as a {@link Value} rather than as a {@link
   * java.util.function.BiFunction}: converting a JavaScript function into a functional interface
   * other than {@link java.util.function.Function} creates a {@link java.lang.reflect.Proxy} and
   * its handler, which would happen on every call as GlobalStore.update is typically called from
   * virtual users.
   *
   * @param store the global store
   * @param key the key
   * @param updateFunction receives the current value, or undefined if there's no mapping, and
   *     returns the new value, or null or undefined to remove the mapping
   * @return the new value, or null if the mapping was removed
   */
  public static Object update(
      ConcurrentMap<String, Object> store, String key, Value updateFunction) {
    return store.compute(
        key,
        (k, oldValue) -> {
          final var newValue =
              oldValue == null ? updateFunction.execute() : updateFunction.execute(oldValue);
          return newValue.isNull() ? null : newValue.as(Object.class);
        });
  }
}
