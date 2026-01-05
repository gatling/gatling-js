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

import java.io.IOException;

import io.gatling.javaapi.core.Simulation;

import com.oracle.truffle.js.lang.JavaScriptLanguageHack;

public class JsSimulation extends Simulation {

  static {
    try {
      // Implemented in as separate class because Lookup#defineClass() needs to be called from the
      // same package as the class being defined
      JavaScriptLanguageHack.allowThreadAccess();
    } catch (IOException | IllegalAccessException e) {
      throw new RuntimeException(e);
    }
  }

  public JsSimulation() {
    // Implemented in a separate class to defer loading any GraalJS class until after the modified
    // class has been loaded in this class's static block
    JsSimulationHelper.loadSimulation(this::setUp);
  }
}
