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

import java.util.concurrent.ConcurrentHashMap;
import java.util.function.BiFunction;

/**
 * Backing map of the JavaScript GlobalStore, shared by all the JavaScript contexts.
 *
 * <p>Writes performed while loading the simulation again in another thread's context are ignored,
 * so that values initialized when the simulation is first loaded, then updated by virtual users,
 * aren't reset.
 */
public final class JsGlobalStore extends ConcurrentHashMap<String, Object> {

  @Override
  public Object put(String key, Object value) {
    return SharedComponents.isReplicaDefinition() ? get(key) : super.put(key, value);
  }

  @Override
  public Object compute(
      String key, BiFunction<? super String, ? super Object, ? extends Object> remappingFunction) {
    return SharedComponents.isReplicaDefinition()
        ? get(key)
        : super.compute(key, remappingFunction);
  }

  @Override
  public Object remove(Object key) {
    return SharedComponents.isReplicaDefinition() ? get(key) : super.remove(key);
  }

  @Override
  public void clear() {
    if (!SharedComponents.isReplicaDefinition()) {
      super.clear();
    }
  }
}
