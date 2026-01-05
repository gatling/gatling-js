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

package io.gatling.javaapi.grpc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.google.protobuf.*;
import org.graalvm.polyglot.Value;

public class GrpcDynamic {
  public static Map<String, Object> convertFromMessage(DynamicMessage message) {
    return message.getAllFields().entrySet().stream()
        .collect(
            Collectors.toMap(
                entry -> entry.getKey().getName(),
                entry -> convertFromFieldValue(entry.getValue())));
  }

  private static Object convertFromFieldValue(Object value) {
    if (value instanceof DynamicMessage) {
      return convertFromMessage((DynamicMessage) value);
    } else if (value instanceof List) {
      return ((List<?>) value).stream().map(GrpcDynamic::convertFromFieldValue).toList();
    } else if (value instanceof ByteString) {
      // Unnecessary copy with ByteString.toByteArray, but hard to avoid with the ByteString API...
      return ((ByteString) value).toByteArray();
    } else if (value instanceof Descriptors.EnumValueDescriptor) {
      return ((Descriptors.EnumValueDescriptor) value).getName();
    } else {
      return value;
    }
  }

  public static DynamicMessage convertToMessage(Value input, Descriptors.Descriptor descriptor) {
    final var builder = DynamicMessage.newBuilder(descriptor);
    writeMessage(input, builder, descriptor);
    return builder.build();
  }

  private static void writeMessage(
      Value input, Message.Builder builder, Descriptors.Descriptor descriptor) {
    for (final var field : descriptor.getFields()) {
      final var fieldValue = input.getMember(field.getName());
      try {
        if (fieldValue != null) {
          if (field.getJavaType() == Descriptors.FieldDescriptor.JavaType.MESSAGE) {
            if (field.isRepeated()) {
              if (!fieldValue.hasArrayElements()) {
                throw new ClassCastException("Value " + fieldValue + " should be an array");
              }
              final var length = fieldValue.getArraySize();
              for (int i = 0; i < length; i++) {
                final var fieldBuilder = builder.newBuilderForField(field);
                writeMessage(fieldValue.getArrayElement(i), fieldBuilder, field.getMessageType());
                builder.addRepeatedField(field, fieldBuilder.build());
              }
            } else {
              writeMessage(fieldValue, builder.getFieldBuilder(field), field.getMessageType());
            }
          } else {
            final var convertedValue = convertFieldValue(fieldValue, field);
            try {
              builder.setField(field, convertedValue);
            } catch (IllegalArgumentException e) {
              final var msg =
                  "Value "
                      + convertedValue
                      + " cannot be written to protobuf field "
                      + field.getFullName();
              throw new IllegalArgumentException(msg, e);
            }
          }
        }
      } catch (ClassCastException e) {
        final var pbType = field.isRepeated() ? "repeated " + field.getType() : field.getType();
        final var msg =
            "Value "
                + fieldValue
                + " cannot be converted to protobuf type "
                + pbType
                + " for field "
                + field.getFullName();
        throw new IllegalArgumentException(msg, e);
      }
    }
  }

  private static Object convertFieldValue(Value fieldValue, Descriptors.FieldDescriptor field) {
    switch (field.getJavaType()) {
      case INT:
        return convertMaybeRepeated(field, fieldValue, Value::asInt);
      case LONG:
        return convertMaybeRepeated(field, fieldValue, Value::asLong);
      case FLOAT:
        // JS floating point value is always a double, needs to be cast down to float
        return convertMaybeRepeated(field, fieldValue, value -> (float) value.asDouble());
      case DOUBLE:
        return convertMaybeRepeated(field, fieldValue, Value::asDouble);
      case BOOLEAN:
        return convertMaybeRepeated(field, fieldValue, Value::asBoolean);
      case STRING:
        return convertMaybeRepeated(field, fieldValue, Value::asString);
      case BYTE_STRING:
        // Unnecessary copy with ByteString.copyFrom, but hard to avoid with the ByteString API...
        if (field.isRepeated()) {
          if (!fieldValue.hasArrayElements()) {
            throw new ClassCastException("Value " + fieldValue + " should be an array");
          }
          final var length = fieldValue.getArraySize();
          final List<Object> list = new ArrayList<>();
          for (int i = 0; i < length; i++) {
            list.add(ByteString.copyFrom(fieldValue.getArrayElement(i).as(byte[].class)));
          }
          return list;
        } else {
          return ByteString.copyFrom(fieldValue.as(byte[].class));
        }
      case ENUM:
        final var enumType = field.getEnumType();
        return convertMaybeRepeated(field, fieldValue, value -> convertEnumValue(value, enumType));
      default:
        throw new IllegalStateException("Unexpected protobuf field type: " + field.getJavaType());
    }
  }

  private static Object convertMaybeRepeated(
      Descriptors.FieldDescriptor field,
      Value fieldValue,
      Function<Value, Object> convertSingleValue) {
    if (field.isRepeated()) {
      if (!fieldValue.hasArrayElements()) {
        throw new ClassCastException("Value " + fieldValue + " should be an array");
      }
      final var length = fieldValue.getArraySize();
      final List<Object> list = new ArrayList<>();
      for (int i = 0; i < length; i++) {
        list.add(convertSingleValue.apply(fieldValue.getArrayElement(i)));
      }
      return list;
    } else {
      if (fieldValue.hasArrayElements()) {
        throw new ClassCastException("Value " + fieldValue + " should not be an array");
      }
      return convertSingleValue.apply(fieldValue);
    }
  }

  private static Descriptors.EnumValueDescriptor convertEnumValue(
      Value fieldValue, Descriptors.EnumDescriptor enumType) {
    Descriptors.EnumValueDescriptor enumValue = null;
    if (fieldValue.isNumber()) {
      enumValue = enumType.findValueByNumber(fieldValue.asInt());
    } else if (fieldValue.isString()) {
      enumValue = enumType.findValueByName(fieldValue.asString());
    }
    if (enumValue == null) {
      throw new ClassCastException(
          "Cannot convert " + fieldValue + "  to enum type " + enumType.getFullName());
    }
    return enumValue;
  }

  public static GrpcMethodDescriptorWrapper loadMethodDescriptor(
      String pkg, String service, String method)
      throws IOException, Descriptors.DescriptorValidationException {
    // Retrieve the list of all binary files
    final var allCompiledProtos = readCompiledProtosList();
    // Load all the binary files
    final var fileDescriptorProtos = loadFileDescriptors(allCompiledProtos);

    // Find the correct entry point binary file
    final var fileDescriptorPath =
        fileDescriptorProtos.entrySet().stream()
            .filter(
                entry -> {
                  final var fileDescriptorProto = entry.getValue();
                  return Objects.equals(fileDescriptorProto.getPackage(), pkg)
                      && fileDescriptorProto.getServiceList().stream()
                          .anyMatch(
                              serviceDescriptorProto ->
                                  service.equals(serviceDescriptorProto.getName())
                                      && serviceDescriptorProto.getMethodList().stream()
                                          .anyMatch(
                                              methodDescriptorProto ->
                                                  method.equals(methodDescriptorProto.getName())));
                })
            .findFirst()
            .orElseThrow(
                () -> {
                  final var pkgPrefix = pkg != null ? pkg + "." : "";
                  return new IllegalArgumentException(
                      "File descriptor not found for gRPC method "
                          + pkgPrefix
                          + service
                          + "/"
                          + method);
                })
            .getKey();

    // Convert to a FileDescriptor with resolved dependencies
    final var fileDescriptor =
        resolveFileDescriptor(fileDescriptorPath, fileDescriptorProtos, new HashMap<>());

    // Find and convert method
    final var serviceDescriptor = fileDescriptor.findServiceByName(service);
    final var methodDescriptor = serviceDescriptor.findMethodByName(method);
    return new GrpcMethodDescriptorWrapper(methodDescriptor);
  }

  private static List<String> readCompiledProtosList() throws IOException {
    try (final var is =
        GrpcDynamic.class.getClassLoader().getResourceAsStream("compiled-protobuf-files")) {
      if (is == null) {
        return Collections.emptyList();
      }
      try (final var isr = new InputStreamReader(is, StandardCharsets.UTF_8);
          final var br = new BufferedReader(isr)) {
        return br.lines().toList();
      }
    }
  }

  private static Map<Path, DescriptorProtos.FileDescriptorProto> loadFileDescriptors(
      List<String> paths) {
    return paths.stream()
        .flatMap(
            resource -> {
              final DescriptorProtos.FileDescriptorSet fileDescriptorSet;
              try (final var is =
                  GrpcDynamic.class.getClassLoader().getResourceAsStream(resource)) {
                fileDescriptorSet = DescriptorProtos.FileDescriptorSet.parseFrom(is);
              } catch (IOException e) {
                throw new RuntimeException(
                    "Failed to read compiled protobuf file from resource path '" + resource + "'",
                    e);
              }

              final var parent = Paths.get(resource).getParent();
              return fileDescriptorSet.getFileList().stream()
                  .map(
                      fileDescriptorProto -> {
                        final var path =
                            parent != null
                                ? parent.resolve(fileDescriptorProto.getName())
                                : Paths.get(fileDescriptorProto.getName());
                        return new Pair<>(path, fileDescriptorProto);
                      });
            })
        .collect(Collectors.toMap(p -> p.key, p -> p.value));
  }

  /** Uses relative paths to proto file dependencies. */
  private static Descriptors.FileDescriptor resolveFileDescriptor(
      Path protoPath,
      Map<Path, DescriptorProtos.FileDescriptorProto> fileDescriptorProtos,
      Map<Path, Descriptors.FileDescriptor> cache)
      throws Descriptors.DescriptorValidationException {
    // We cannot simply use cache.computeIfAbsent because the recursive call then leads to a
    // ConcurrentModificationException
    if (!cache.containsKey(protoPath)) {
      final var proto = fileDescriptorProtos.get(protoPath);
      if (proto == null) {
        throw new IllegalArgumentException(
            "Dependency " + protoPath + " not found in input proto file(s)");
      }
      final var fileDescriptor =
          Descriptors.FileDescriptor.buildFrom(
              proto,
              proto.getDependencyList().stream()
                  .map(
                      dependency -> {
                        final var parent = protoPath.getParent();
                        final var dependencyPath =
                            parent != null ? parent.resolve(dependency) : Paths.get(dependency);
                        try {
                          return resolveFileDescriptor(dependencyPath, fileDescriptorProtos, cache);
                        } catch (Descriptors.DescriptorValidationException e) {
                          throw new RuntimeException(e);
                        }
                      })
                  .toArray(Descriptors.FileDescriptor[]::new));
      cache.put(protoPath, fileDescriptor);
    }
    return cache.get(protoPath);
  }

  private static final class Pair<K, V> {
    public final K key;
    public final V value;

    public Pair(K key, V value) {
      this.key = key;
      this.value = value;
    }
  }
}
