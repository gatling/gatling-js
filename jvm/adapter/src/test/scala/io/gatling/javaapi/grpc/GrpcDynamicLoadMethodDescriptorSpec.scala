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

package io.gatling.javaapi.grpc

import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

// uses the compiled-protobuf-files test resource, listing services.protoc (greeter.proto and plain.proto)
class GrpcDynamicLoadMethodDescriptorSpec extends AnyFlatSpecLike with Matchers {
  "loadMethodDescriptor" should "resolve a method of a proto file with a package" in {
    val wrapper = GrpcDynamic.loadMethodDescriptor("test", "Greeter", "Hello")
    wrapper.descriptor.getFullMethodName shouldBe "test.Greeter/Hello"
    wrapper.inputDescriptor.getFullName shouldBe "test.Greeting"
  }

  it should "resolve a method of a proto file without package" in {
    val wrapper = GrpcDynamic.loadMethodDescriptor(null, "Plain", "Ping")
    wrapper.descriptor.getFullMethodName shouldBe "Plain/Ping"
    wrapper.inputDescriptor.getFullName shouldBe "Empty"
  }

  it should "fail on an unknown method" in {
    the[IllegalArgumentException] thrownBy GrpcDynamic.loadMethodDescriptor("test", "Greeter", "Unknown") should have message
      "File descriptor not found for gRPC method test.Greeter/Unknown"
  }
}
