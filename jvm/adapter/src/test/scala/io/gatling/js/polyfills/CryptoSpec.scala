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

package io.gatling.js.polyfills

import java.util.UUID
import java.util.concurrent.{ ConcurrentHashMap, Executors, TimeUnit }

import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

class CryptoSpec extends AnyFlatSpecLike with Matchers {
  "randomBytes" should "return the requested number of bytes" in {
    Crypto.randomBytes(0) shouldBe empty
    Crypto.randomBytes(37) should have length 37
  }

  it should "return different values" in {
    Crypto.randomBytes(16) should not equal Crypto.randomBytes(16)
  }

  "randomUUID" should "return version 4 IETF variant UUIDs" in {
    val raw = Crypto.randomUUID()
    raw should fullyMatch regex "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
    val uuid = UUID.fromString(raw)
    uuid.version shouldBe 4
    uuid.variant shouldBe 2
  }

  it should "return unique values across threads" in {
    val threads = 8
    val perThread = 10000
    val uuids = ConcurrentHashMap.newKeySet[String]()
    val pool = Executors.newFixedThreadPool(threads)
    (1 to threads).foreach(_ => pool.submit(new Runnable { override def run(): Unit = (1 to perThread).foreach(_ => uuids.add(Crypto.randomUUID())) }))
    pool.shutdown()
    pool.awaitTermination(30, TimeUnit.SECONDS) shouldBe true
    uuids.size shouldBe threads * perThread
  }
}
