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

import java.{ util => ju }

import scala.jdk.CollectionConverters._
import scala.util.Using

import com.google.protobuf.{ ByteString, DescriptorProtos, Descriptors, DynamicMessage }
import org.graalvm.polyglot.Context
import org.scalatest.Inside
import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

class GrpcDynamicSpec extends AnyFlatSpecLike with Matchers with Inside {
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
        |  field_bytes: [72,101,108,108,111,32,80,114,111,116,111,98,117,102,33],
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
        |  field_repeated_bytes: [[72,101,108,108,111], [80,114,111,116,111,98,117,102], [33]],
        |  field_repeated_enum: ["CHOICE_2", "CHOICE_1", "CHOICE_0"],
        |  field_repeated_name: [
        |    { first_name: "Joe", last_name: "Dalton", age: 30 },
        |    { first_name: "Averell", last_name: "Dalton", age: 20 },
        |  ]
        |});""".stripMargin

    Using.resource(Context.create()) { context =>
      val jsObject = context.eval("js", jsCode).execute()
      val javaMessage = GrpcDynamic.convertToMessage(jsObject, messageDescriptor)

      val testEnumDescriptor = fileDescriptor.findEnumTypeByName("TestEnum")
      val Choice0 = testEnumDescriptor.findValueByName("CHOICE_0")
      val Choice1 = testEnumDescriptor.findValueByName("CHOICE_1")
      val Choice2 = testEnumDescriptor.findValueByName("CHOICE_2")

      val nameDescriptor = fileDescriptor.findMessageTypeByName("Name")

      // Scalars
      javaMessage.getField(messageDescriptor.findFieldByName("field_double")) shouldBe 1.5d
      javaMessage.getField(messageDescriptor.findFieldByName("field_float")) shouldBe 1.5f
      javaMessage.getField(messageDescriptor.findFieldByName("field_int32")) shouldBe 1
      javaMessage.getField(messageDescriptor.findFieldByName("field_int64")) shouldBe 1L
      javaMessage.getField(messageDescriptor.findFieldByName("field_uint32")) shouldBe 1
      javaMessage.getField(messageDescriptor.findFieldByName("field_uint64")) shouldBe 1L
      javaMessage.getField(messageDescriptor.findFieldByName("field_sint32")) shouldBe -1
      javaMessage.getField(messageDescriptor.findFieldByName("field_sint64")) shouldBe -1L
      javaMessage.getField(messageDescriptor.findFieldByName("field_fixed32")) shouldBe 1
      javaMessage.getField(messageDescriptor.findFieldByName("field_fixed64")) shouldBe 1L
      javaMessage.getField(messageDescriptor.findFieldByName("field_sfixed32")) shouldBe -1
      javaMessage.getField(messageDescriptor.findFieldByName("field_sfixed64")) shouldBe -1L
      javaMessage.getField(messageDescriptor.findFieldByName("field_bool")) shouldBe true
      javaMessage.getField(messageDescriptor.findFieldByName("field_string")) shouldBe "Hello Protobuf!"
      javaMessage.getField(messageDescriptor.findFieldByName("field_bytes")) shouldBe ByteString.copyFrom(
        Array[Byte](72, 101, 108, 108, 111, 32, 80, 114, 111, 116, 111, 98, 117, 102, 33)
      )
      // Enum
      javaMessage.getField(messageDescriptor.findFieldByName("field_enum")) shouldBe Choice1
      // Message
      inside(javaMessage.getField(messageDescriptor.findFieldByName("field_name"))) { case name: DynamicMessage =>
        name.getField(nameDescriptor.findFieldByName("first_name")) shouldBe "John"
        name.getField(nameDescriptor.findFieldByName("last_name")) shouldBe "Doe"
        name.getField(nameDescriptor.findFieldByName("age")) shouldBe 33
      }
      // Repeated fields
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_double")) shouldBe ju.List.of(1.5d, 2.6d, 3.7d)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_float")) shouldBe ju.List.of(1.5f, 2.6f, 3.7f)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_int32")) shouldBe ju.List.of(1, 2, 3)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_int64")) shouldBe ju.List.of(1L, 2L, 3L)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_uint32")) shouldBe ju.List.of(1, 2, 3)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_uint64")) shouldBe ju.List.of(1L, 2L, 3L)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_sint32")) shouldBe ju.List.of(-1, 0, 1)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_sint64")) shouldBe ju.List.of(-1L, 0L, 1L)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_fixed32")) shouldBe ju.List.of(1, 2, 3)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_fixed64")) shouldBe ju.List.of(1L, 2L, 3L)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_sfixed32")) shouldBe ju.List.of(-1, 0, 1)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_sfixed64")) shouldBe ju.List.of(-1L, 0L, 1L)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_bool")) shouldBe ju.List.of(true, false, true, false)
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_string")) shouldBe ju.List.of("Hello", "Protobuf", "!")
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_bytes")) shouldBe ju.List.of(
        ByteString.copyFrom(Array[Byte](72, 101, 108, 108, 111)),
        ByteString.copyFrom(Array[Byte](80, 114, 111, 116, 111, 98, 117, 102)),
        ByteString.copyFrom(Array[Byte](33))
      )
      javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_enum")) shouldBe ju.List.of(Choice2, Choice1, Choice0)
      inside(javaMessage.getField(messageDescriptor.findFieldByName("field_repeated_name"))) { case list: ju.List[_] =>
        list should have size 2
        inside(list.get(0)) { case name: DynamicMessage =>
          name.getField(nameDescriptor.findFieldByName("first_name")) shouldBe "Joe"
          name.getField(nameDescriptor.findFieldByName("last_name")) shouldBe "Dalton"
          name.getField(nameDescriptor.findFieldByName("age")) shouldBe 30
        }
        inside(list.get(1)) { case name: DynamicMessage =>
          name.getField(nameDescriptor.findFieldByName("first_name")) shouldBe "Averell"
          name.getField(nameDescriptor.findFieldByName("last_name")) shouldBe "Dalton"
          name.getField(nameDescriptor.findFieldByName("age")) shouldBe 20
        }
      }
    }
  }
}
