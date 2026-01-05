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

import java.util.List;
import java.util.stream.Collectors;

import io.gatling.js.fs.JsFileSystem;

import com.oracle.truffle.js.runtime.JSContextOptions;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.EnvironmentAccess;
import org.graalvm.polyglot.HostAccess;
import org.graalvm.polyglot.PolyglotAccess;
import org.graalvm.polyglot.io.FileSystem;
import org.graalvm.polyglot.io.IOAccess;

public class JsContext {
  public static final String LANGUAGE = "js";

  public static String replacements(List<String> modules, String prefix) {
    return modules.stream()
        .map(module -> module + ":" + prefix + "/" + module + ".js")
        .collect(Collectors.joining(","));
  }

  private static Context newContext0(FileSystem fileSystem, String replacements) {
    IOAccess ioAccess = IOAccess.newBuilder().fileSystem(fileSystem).build();
    return Context.newBuilder(LANGUAGE)
        .allowCreateProcess(true)
        .allowCreateThread(true)
        .allowInnerContextOptions(true)
        .allowPolyglotAccess(PolyglotAccess.ALL)
        .allowEnvironmentAccess(EnvironmentAccess.INHERIT)
        .allowExperimentalOptions(true)
        .allowHostAccess(HostAccess.ALL)
        .allowHostClassLookup(s -> true)
        .allowIO(ioAccess)
        .allowNativeAccess(true)
        .option(JSContextOptions.COMMONJS_REQUIRE_NAME, "true")
        .option(JSContextOptions.COMMONJS_CORE_MODULES_REPLACEMENTS_NAME, replacements)
        .option(JSContextOptions.STRICT_NAME, "true")
        .build();
  }

  public static Context newContext() {
    var fileSystem = JsFileSystem.newFileSystem();
    return newContext0(fileSystem, JsPolyfills.REPLACEMENTS);
  }

  public static Context newContext(FileSystem fileSystem, String additionalReplacements) {
    var replacements = JsPolyfills.REPLACEMENTS + "," + additionalReplacements;
    return newContext0(fileSystem, replacements);
  }
}
