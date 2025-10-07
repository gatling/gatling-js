/*
 * Copyright 2011-2025 GatlingCorp (https://gatling.io)
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

import scala.jdk.CollectionConverters._
import scala.util.Using

import com.google.protobuf.{ DescriptorProtos, Descriptors, DynamicMessage }
import org.graalvm.polyglot.Context
import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

class GrpcDynamicSpec extends AnyFlatSpecLike with Matchers {
  "convertMessage" should "convert a valid JavaScript object" in {
    val fileDescriptorProto = Using
      .resource(getClass.getResourceAsStream("test.protoc")) { is =>
        DescriptorProtos.FileDescriptorSet.parseFrom(is)
      }
      .getFileList
      .asScala
      .find(_.getName == "test.proto")
      .get
    val fileDescriptor = Descriptors.FileDescriptor.buildFrom(fileDescriptorProto, Array.empty)
    val messageDescriptor = fileDescriptor.findMessageTypeByName("TestMessage")
    val messageBuilder = DynamicMessage.newBuilder(messageDescriptor)

    val jsCode =
      """() => ({
        |  field_double: 1.5,
        |  field_float: 1.5,
        |  field_int32: 1,
        |  field_int64: 1,
        |  field_uint32: 1,
        |  field_uint64: 1,
        |  field_sint32: -1,
        |  field_sint64: -1,
        |  field_fixed32: 1,
        |  field_fixed64: 1,
        |  field_sfixed32: -1,
        |  field_sfixed64: -1,
        |  field_bool: true,
        |  field_string: "Hello Protobuf!",
        |  field_enum: "CHOICE_1",
        |  field_name: {
        |    first_name: "John",
        |    last_name: "Doe",
        |    age: 33
        |  },
        |  field_repeated_double: [1.5, 2.6, 3.7],
        |  field_repeated_float: [1.5, 2.6, 3.7],
        |  field_repeated_int32: [1, 2, 3],
        |  field_repeated_int64: [1, 2, 3],
        |  field_repeated_uint32: [1, 2, 3],
        |  field_repeated_uint64: [1, 2, 3],
        |  field_repeated_sint32: [-1, 0, 1],
        |  field_repeated_sint64: [-1, 0, 1],
        |  field_repeated_fixed32: [1, 2, 3],
        |  field_repeated_fixed64: [1, 2, 3],
        |  field_repeated_sfixed32: [-1, 0, 1],
        |  field_repeated_sfixed64: [-1, 0, 1],
        |  field_repeated_bool: [true, false, true, false],
        |  field_repeated_string: ["Hello", "Protobuf", "!"],
        |  field_repeated_enum: ["CHOICE_2", "CHOICE_1", "CHOICE_0"],
        |  field_repeated_name: [
        |    { first_name: "Joe", last_name: "Dalton", age: 40 },
        |    { first_name: "William", last_name: "Dalton", age: 35 },
        |    { first_name: "Jack", last_name: "Dalton", age: 30 },
        |    { first_name: "Averell", last_name: "Dalton", age: 25 },
        |  ]
        |});""".stripMargin

    Using.resource(Context.create()) { context =>
      val jsObject = context.eval("js", jsCode).execute()
      val javaMessage = GrpcDynamic.convertToMessage(jsObject, messageBuilder, messageDescriptor)
      println(s"javaMessage: $javaMessage")
    }
  }
}
