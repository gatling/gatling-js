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

package io.gatling.js.callbacks

import java.util.concurrent.{ ConcurrentHashMap, Executors, TimeUnit }

import scala.util.Using

import org.graalvm.polyglot.{ Context, HostAccess }
import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

class GlobalStoresSpec extends AnyFlatSpecLike with Matchers {

  private def newContext(): Context =
    Context
      .newBuilder("js")
      .allowHostAccess(HostAccess.ALL)
      .allowHostClassLookup(_ => true)
      .option("engine.WarnInterpreterOnly", "false")
      .build()

  // evaluates a JS function (store, key) => result
  private def withUpdate[T](code: String)(f: ((ConcurrentHashMap[String, AnyRef], String) => AnyRef) => T): T =
    Using.resource(newContext()) { context =>
      val fn = context.eval(
        "js",
        s"""const GlobalStores = Java.type("io.gatling.js.callbacks.GlobalStores");
           |(store, key) => GlobalStores.update(store, key, $code)""".stripMargin
      )
      f((store, key) => fn.execute(store, key).as(classOf[AnyRef]))
    }

  "update" should "pass undefined when there's no mapping" in {
    val store = new ConcurrentHashMap[String, AnyRef]()
    withUpdate("(v) => typeof v") { update =>
      update(store, "key") shouldBe "undefined"
      store.get("key") shouldBe "undefined"
    }
  }

  it should "pass the current value" in {
    val store = new ConcurrentHashMap[String, AnyRef]()
    store.put("key", Integer.valueOf(41))
    withUpdate("(v) => v + 1") { update =>
      update(store, "key") shouldBe 42
      store.get("key") shouldBe 42
    }
  }

  it should "remove the mapping when the function returns undefined or null" in {
    val store = new ConcurrentHashMap[String, AnyRef]()
    withUpdate("(v) => undefined") { update =>
      store.put("key", "value")
      Option(update(store, "key")) shouldBe None
      store.containsKey("key") shouldBe false
    }
    withUpdate("(v) => null") { update =>
      store.put("key", "value")
      Option(update(store, "key")) shouldBe None
      store.containsKey("key") shouldBe false
    }
  }

  it should "round-trip JavaScript objects" in {
    Using.resource(newContext()) { context =>
      val store = new ConcurrentHashMap[String, AnyRef]()
      val result = context
        .eval(
          "js",
          """const GlobalStores = Java.type("io.gatling.js.callbacks.GlobalStores");
            |(store) => {
            |  const obj = { count: 1 };
            |  GlobalStores.update(store, "key", () => obj);
            |  let same = false;
            |  GlobalStores.update(store, "key", (v) => { same = v === obj; v.count++; return v; });
            |  return same && obj.count === 2;
            |}""".stripMargin
        )
        .execute(store)
      result.asBoolean shouldBe true
    }
  }

  it should "be atomic across threads" in {
    val store = new ConcurrentHashMap[String, AnyRef]()
    val threads = 4
    val perThread = 1000
    val pool = Executors.newFixedThreadPool(threads)
    (1 to threads).foreach(_ =>
      pool.submit(new Runnable {
        // one context per thread, as a context can't be used by several threads concurrently
        override def run(): Unit =
          withUpdate("(v) => (v === undefined ? 0 : v) + 1") { update =>
            (1 to perThread).foreach(_ => update(store, "count"))
          }
      })
    )
    pool.shutdown()
    pool.awaitTermination(60, TimeUnit.SECONDS) shouldBe true
    store.get("count") shouldBe threads * perThread
  }
}
