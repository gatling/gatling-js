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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.graalvm.polyglot.Context;

/**
 * A JavaScript context in which the simulation was defined.
 *
 * <p>The primary context defines the simulation that is actually executed. Replicas evaluate the
 * same simulation code, so that each JavaScript function converted into a Java callback in the
 * primary context has an equivalent at the same index in each replica. Components created with
 * {@link SharedComponents} are only created in the primary context, replicas reuse them.
 */
final class JsThreadContext {

  final Context context;
  final boolean primary;

  // only mutated during definition, by the defining thread, then safely published
  private final List<Object> functions = new ArrayList<>();
  private final List<Object> functionSignatures = new ArrayList<>();
  private final List<String> sharedKeys = new ArrayList<>();
  private final List<Object> sharedValues = new ArrayList<>();
  private Object[] frozenFunctions;
  private int sharedCursor;

  JsThreadContext(Context context, boolean primary) {
    this.context = context;
    this.primary = primary;
  }

  int recordFunction(Object function, Object signature) {
    int index = functions.size();
    functions.add(function);
    functionSignatures.add(signature);
    // functions created in replicas are only invoked through redirection from the primary ones
    return primary ? index : -1;
  }

  Object function(int index) {
    return frozenFunctions[index];
  }

  Object sharedComponent(String key, SharedComponents.Factory factory) {
    if (primary) {
      Object value = factory.create();
      sharedKeys.add(key);
      sharedValues.add(value);
      return value;
    }
    int index = sharedCursor++;
    var primaryContext = JsRuntime.primaryContext();
    if (index >= primaryContext.sharedKeys.size()
        || !primaryContext.sharedKeys.get(index).equals(key)) {
      throw new IllegalStateException(
          "Shared component #"
              + index
              + " with key '"
              + key
              + "' doesn't match the one created when the simulation was first loaded"
              + (index < primaryContext.sharedKeys.size()
                  ? " ('" + primaryContext.sharedKeys.get(index) + "')"
                  : "")
              + ". "
              + JsRuntime.DETERMINISM_HINT);
    }
    return primaryContext.sharedValues.get(index);
  }

  void freeze() {
    frozenFunctions = functions.toArray();
  }

  void verifyMatches(JsThreadContext primaryContext) {
    if (functionSignatures.size() != primaryContext.functionSignatures.size()
        || sharedCursor != primaryContext.sharedKeys.size()) {
      throw new IllegalStateException(
          "Loading the simulation again created "
              + functionSignatures.size()
              + " callbacks and used "
              + sharedCursor
              + " shared components, versus "
              + primaryContext.functionSignatures.size()
              + " and "
              + primaryContext.sharedKeys.size()
              + " the first time. "
              + JsRuntime.DETERMINISM_HINT);
    }
    for (int i = 0; i < functionSignatures.size(); i++) {
      if (!Objects.equals(functionSignatures.get(i), primaryContext.functionSignatures.get(i))) {
        throw new IllegalStateException(
            "Callback #"
                + i
                + " has signature "
                + functionSignatures.get(i)
                + " but had signature "
                + primaryContext.functionSignatures.get(i)
                + " the first time the simulation was loaded. "
                + JsRuntime.DETERMINISM_HINT);
      }
    }
  }
}
