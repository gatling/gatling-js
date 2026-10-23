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

import java.io.{ ByteArrayInputStream, InputStream }
import java.nio.charset.StandardCharsets
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicInteger

import com.google.protobuf.DescriptorProtos._
import io.grpc.MethodDescriptor.MethodType
import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

class GrpcMethodDescriptorsSpec extends AnyFlatSpecLike with Matchers {

  // common/name.proto: package test; message Name { string first_name = 1; }
  private val nameFile = FileDescriptorProto
    .newBuilder()
    .setName("common/name.proto")
    .setPackage("test")
    .setSyntax("proto3")
    .addMessageType(
      DescriptorProto
        .newBuilder()
        .setName("Name")
        .addField(
          FieldDescriptorProto
            .newBuilder()
            .setName("first_name")
            .setNumber(1)
            .setType(FieldDescriptorProto.Type.TYPE_STRING)
        )
    )
    .build()

  // service.proto: package test; import "common/name.proto"; message Request { Name name = 1; }
  // service Greeter { rpc Hello(Request) returns (Name); rpc Stream(Request) returns (stream Name); }
  private val serviceFile = FileDescriptorProto
    .newBuilder()
    .setName("service.proto")
    .setPackage("test")
    .setSyntax("proto3")
    .addDependency("common/name.proto")
    .addMessageType(
      DescriptorProto
        .newBuilder()
        .setName("Request")
        .addField(
          FieldDescriptorProto
            .newBuilder()
            .setName("name")
            .setNumber(1)
            .setType(FieldDescriptorProto.Type.TYPE_MESSAGE)
            .setTypeName(".test.Name")
        )
    )
    .addService(
      ServiceDescriptorProto
        .newBuilder()
        .setName("Greeter")
        .addMethod(MethodDescriptorProto.newBuilder().setName("Hello").setInputType(".test.Request").setOutputType(".test.Name"))
        .addMethod(
          MethodDescriptorProto.newBuilder().setName("Stream").setInputType(".test.Request").setOutputType(".test.Name").setServerStreaming(true)
        )
    )
    .build()

  private def compiled(files: FileDescriptorProto*): Array[Byte] = {
    val set = FileDescriptorSet.newBuilder()
    files.foreach(set.addFile)
    set.build().toByteArray
  }

  private class CountingResources(resources: Map[String, Array[Byte]]) extends GrpcMethodDescriptors.ResourceLoader {
    val reads = new ConcurrentHashMap[String, AtomicInteger]()

    override def open(path: String): InputStream = {
      reads.computeIfAbsent(path, _ => new AtomicInteger).incrementAndGet()
      resources.get(path).map(new ByteArrayInputStream(_)).orNull
    }

    def readCount(path: String): Int = Option(reads.get(path)).fold(0)(_.get)
  }

  private def newResources(): CountingResources =
    new CountingResources(
      Map(
        GrpcMethodDescriptors.COMPILED_PROTOS_LIST -> "service.protoc\nname.protoc".getBytes(StandardCharsets.UTF_8),
        "service.protoc" -> compiled(serviceFile),
        "name.protoc" -> compiled(nameFile)
      )
    )

  "load" should "resolve a method and its dependencies" in {
    val descriptors = new GrpcMethodDescriptors(newResources())
    val hello = descriptors.load("test", "Greeter", "Hello")
    hello.descriptor.getFullMethodName shouldBe "test.Greeter/Hello"
    hello.descriptor.getType shouldBe MethodType.UNARY
    hello.inputDescriptor.getFullName shouldBe "test.Request"
    hello.inputDescriptor.findFieldByName("name").getMessageType.getFullName shouldBe "test.Name"
    hello.outputDescriptor.getFullName shouldBe "test.Name"

    descriptors.load("test", "Greeter", "Stream").descriptor.getType shouldBe MethodType.SERVER_STREAMING
  }

  it should "only read compiled files once" in {
    val resources = newResources()
    val descriptors = new GrpcMethodDescriptors(resources)
    descriptors.load("test", "Greeter", "Hello")
    descriptors.load("test", "Greeter", "Stream")
    descriptors.load("test", "Greeter", "Hello")
    Seq(GrpcMethodDescriptors.COMPILED_PROTOS_LIST, "service.protoc", "name.protoc").map(resources.readCount) shouldBe Seq(1, 1, 1)
  }

  it should "return the same method descriptor every time" in {
    val descriptors = new GrpcMethodDescriptors(newResources())
    descriptors.load("test", "Greeter", "Hello") should be theSameInstanceAs descriptors.load("test", "Greeter", "Hello")
  }

  it should "share file descriptors between methods" in {
    val descriptors = new GrpcMethodDescriptors(newResources())
    val hello = descriptors.load("test", "Greeter", "Hello")
    val stream = descriptors.load("test", "Greeter", "Stream")
    stream.inputDescriptor should be theSameInstanceAs hello.inputDescriptor
    stream.outputDescriptor should be theSameInstanceAs hello.outputDescriptor
  }

  it should "fail on an unknown method, without breaking later loads" in {
    val resources = newResources()
    val descriptors = new GrpcMethodDescriptors(resources)
    the[IllegalArgumentException] thrownBy descriptors.load("test", "Greeter", "Unknown") should have message
      "File descriptor not found for gRPC method test.Greeter/Unknown"
    the[IllegalArgumentException] thrownBy descriptors.load("test", "Greeter", "Unknown") should have message
      "File descriptor not found for gRPC method test.Greeter/Unknown"
    descriptors.load("test", "Greeter", "Hello").descriptor.getFullMethodName shouldBe "test.Greeter/Hello"
    resources.readCount("service.protoc") shouldBe 1
  }

  it should "fail when no protobuf file was compiled" in {
    val descriptors = new GrpcMethodDescriptors(new CountingResources(Map.empty))
    the[IllegalArgumentException] thrownBy descriptors.load("test", "Greeter", "Hello") should have message
      "File descriptor not found for gRPC method test.Greeter/Hello"
  }
}
