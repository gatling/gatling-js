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

package io.gatling.js

import java.util.concurrent.atomic.AtomicInteger
import java.util.function.{ Function => JFunction, Supplier }

import com.oracle.truffle.js.lang.JavaScriptLanguageHack
import com.oracle.truffle.polyglot.PolyglotFunctionsHack
import org.graalvm.polyglot.Source
import org.scalatest.BeforeAndAfterEach
import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

object JsRuntimeSpec {
  // must happen before any Truffle class is loaded, requires a forked JVM
  JavaScriptLanguageHack.allowThreadAccess()
  PolyglotFunctionsHack.redirectFunctions()

  def init(): Unit = ()
}

class JsRuntimeSpec extends AnyFlatSpecLike with Matchers with BeforeAndAfterEach {
  JsRuntimeSpec.init()

  private val PreloadedReplicas = 2

  override protected def beforeEach(): Unit = {
    JsRuntime.unload()
    TestSink.reset()
  }

  private def load(code: String, setUp: AnyRef = noopSetUp): Unit = {
    val engine = JsContext.newEngine()
    JsRuntime.load(
      () => JsContext.newContext(engine),
      Source.newBuilder(JsContext.LANGUAGE, code, "test.js").build(),
      "sim",
      setUp,
      (() => noopSetUp): Supplier[AnyRef],
      PreloadedReplicas
    )
  }

  private def noopSetUp: JFunction[AnyRef, AnyRef] = _ => null

  private def onOtherThread[T](f: => T): T = {
    var result: Either[Throwable, T] = null
    val thread = new Thread(() =>
      result =
        try Right(f)
        catch { case e: Throwable => Left(e) }
    )
    thread.start()
    thread.join()
    result.fold(throw _, identity)
  }

  private val Simulation =
    """var gatling = {
      |  sim: (setUp) => {
      |    const Sink = Java.type("io.gatling.js.TestSink");
      |    const Shared = Java.type("io.gatling.js.SharedComponents");
      |    let calls = 0; // state of the context
      |    const shared = Shared.get("counter", () => Sink.newShared());
      |    Sink.addString((i) => `${i}:${++calls}:${shared.incrementAndGet()}`);
      |    Sink.addLong((i) => i * 2);
      |    Sink.addBi((i, j) => i + j + 100 * ++calls);
      |    setUp("population");
      |  }
      |};
      |""".stripMargin

  "JsRuntime" should "only pass the real setUp to the primary context" in {
    val setUpCalls = new AtomicInteger
    load(Simulation, (_ => { setUpCalls.incrementAndGet(); null }): JFunction[AnyRef, AnyRef])
    setUpCalls.get shouldBe 1
    // primary + preloaded replicas
    TestSink.STRING_FUNCTIONS.size shouldBe 1 + PreloadedReplicas
  }

  it should "execute callbacks in the primary context on the loading thread" in {
    load(Simulation)
    val f = TestSink.STRING_FUNCTIONS.get(0)
    f.apply(1) shouldBe "1:1:1"
    f.apply(1) shouldBe "1:2:2"
  }

  it should "redirect callbacks to one replica context per thread" in {
    load(Simulation)
    val f = TestSink.STRING_FUNCTIONS.get(0)
    f.apply(1) shouldBe "1:1:1"
    // each thread has its own JavaScript state, but shares the shared component
    onOtherThread {
      f.apply(1) shouldBe "1:1:2"
      f.apply(1) shouldBe "1:2:3"
    }
    onOtherThread(f.apply(1)) shouldBe "1:1:4"
    f.apply(1) shouldBe "1:2:5"
  }

  it should "create replicas lazily when preloaded ones are exhausted" in {
    load(Simulation)
    val f = TestSink.STRING_FUNCTIONS.get(0)
    (1 to PreloadedReplicas + 2).map(_ => onOtherThread(f.apply(1))).map(_.split(':')(1)) shouldBe
      Seq.fill(PreloadedReplicas + 2)("1")
    TestSink.STRING_FUNCTIONS.size shouldBe 1 + PreloadedReplicas + 2
  }

  it should "only create shared components once" in {
    load(Simulation)
    onOtherThread(TestSink.STRING_FUNCTIONS.get(0).apply(1))
    TestSink.SHARED_CREATIONS.get shouldBe 1
  }

  it should "preserve the generic return type of redirected callbacks" in {
    load(Simulation)
    val result: Any = onOtherThread(TestSink.LONG_FUNCTIONS.get(0).apply(3))
    result shouldBe a[java.lang.Long]
    result shouldBe 6L
  }

  it should "redirect other functional interfaces" in {
    load(Simulation)
    val f = TestSink.BI_FUNCTIONS.get(0)
    f.apply(1, 2) shouldBe 103L
    f.apply(1, 2) shouldBe 203L
    // fresh JavaScript state in the replica context
    val result: Any = onOtherThread(f.apply(10, 20))
    result shouldBe a[java.lang.Long]
    result shouldBe 130L
  }

  it should "keep equals and hashCode stable across threads" in {
    load(Simulation)
    val f = TestSink.STRING_FUNCTIONS.get(0)
    onOtherThread(f.hashCode) shouldBe f.hashCode
    onOtherThread(f.equals(f)) shouldBe true
  }

  it should "fail fast when the simulation doesn't create the same callbacks every time" in {
    val nonDeterministic =
      """var gatling = {
        |  sim: (setUp) => {
        |    const Sink = Java.type("io.gatling.js.TestSink");
        |    if (Sink.firstLoad()) {
        |      Sink.addString((i) => `${i}`);
        |    }
        |    Sink.addLong((i) => i);
        |    setUp("population");
        |  }
        |};
        |""".stripMargin
    the[IllegalStateException] thrownBy load(nonDeterministic) should have message
      "Loading the simulation again created 1 callbacks and used 0 shared components, versus 2 and 0 the first time. " + JsRuntime.DETERMINISM_HINT
  }

  it should "fail fast when the simulation doesn't create the same shared components every time" in {
    val nonDeterministic =
      """var gatling = {
        |  sim: (setUp) => {
        |    const Sink = Java.type("io.gatling.js.TestSink");
        |    const Shared = Java.type("io.gatling.js.SharedComponents");
        |    Shared.get(Sink.firstLoad() ? "a" : "b", () => 1);
        |    setUp("population");
        |  }
        |};
        |""".stripMargin
    // thrown from JavaScript, so wrapped in a PolyglotException
    val e = the[Exception] thrownBy load(nonDeterministic)
    e.getMessage should include("Shared component #0 with key 'b' doesn't match")
  }

  it should "reject JavaScript objects as shared components" in {
    val jsObject =
      """var gatling = {
        |  sim: (setUp) => {
        |    Java.type("io.gatling.js.SharedComponents").get("obj", () => ({ a: 1 }));
        |  }
        |};
        |""".stripMargin
    val e = the[Exception] thrownBy load(jsObject)
    e.getMessage should include("must be a Java object or a primitive value")
  }

  it should "ignore global store writes when loading replicas" in {
    val withStore =
      """var gatling = {
        |  sim: (setUp) => {
        |    const Shared = Java.type("io.gatling.js.SharedComponents");
        |    const JsGlobalStore = Java.type("io.gatling.js.JsGlobalStore");
        |    const store = Shared.get("globalStore", () => new JsGlobalStore());
        |    store.put("count", 0);
        |    Java.type("io.gatling.js.TestSink").addString((i) => {
        |      store.compute("count", (k, v) => v + i);
        |      return `${store.get("count")}`;
        |    });
        |  }
        |};
        |""".stripMargin
    load(withStore)
    val f = TestSink.STRING_FUNCTIONS.get(0)
    f.apply(1) shouldBe "1"
    onOtherThread(f.apply(2)) shouldBe "3"
    // a lazily created replica must not reset the count
    (1 to PreloadedReplicas).foreach(_ => onOtherThread(f.apply(0)))
    onOtherThread(f.apply(1)) shouldBe "4"
  }
}
