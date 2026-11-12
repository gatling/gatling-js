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
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.BiFunction;
import java.util.function.Function;

/** Java side of the JavaScript simulations used in JsRuntimeSpec. */
public final class TestSink {
  public static final List<Function<Integer, String>> STRING_FUNCTIONS =
      new CopyOnWriteArrayList<>();
  public static final List<Function<Integer, Long>> LONG_FUNCTIONS = new CopyOnWriteArrayList<>();
  public static final List<BiFunction<Integer, Integer, Long>> BI_FUNCTIONS =
      new CopyOnWriteArrayList<>();
  public static final AtomicInteger SHARED_CREATIONS = new AtomicInteger();
  public static final AtomicInteger LOADS = new AtomicInteger();

  private TestSink() {}

  public static void addString(Function<Integer, String> f) {
    STRING_FUNCTIONS.add(f);
  }

  public static void addLong(Function<Integer, Long> f) {
    LONG_FUNCTIONS.add(f);
  }

  public static void addBi(BiFunction<Integer, Integer, Long> f) {
    BI_FUNCTIONS.add(f);
  }

  public static AtomicInteger newShared() {
    SHARED_CREATIONS.incrementAndGet();
    return new AtomicInteger();
  }

  public static boolean firstLoad() {
    return LOADS.getAndIncrement() == 0;
  }

  public static void reset() {
    STRING_FUNCTIONS.clear();
    LONG_FUNCTIONS.clear();
    BI_FUNCTIONS.clear();
    SHARED_CREATIONS.set(0);
    LOADS.set(0);
  }
}
