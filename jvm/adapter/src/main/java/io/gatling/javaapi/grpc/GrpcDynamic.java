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

package io.gatling.javaapi.grpc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import com.google.protobuf.DescriptorProtos;
import com.google.protobuf.Descriptors;
import org.jspecify.annotations.Nullable;

public class GrpcDynamic {
  public static GrpcMethodDescriptorWrapper loadMethodDescriptor(
      String compiledProtosListPath, @Nullable String pkg, String service, String method)
      throws IOException {
    // Retrieve the list of all binary files
    final var allCompiledProtos = readCompiledProtosList(compiledProtosListPath);
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

  private static List<String> readCompiledProtosList(String compiledProtosListPath)
      throws IOException {
    try (final var is =
            GrpcDynamic.class.getClassLoader().getResourceAsStream(compiledProtosListPath);
        final var isr = new InputStreamReader(is, StandardCharsets.UTF_8);
        final var br = new BufferedReader(isr)) {
      return br.lines().toList();
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
      Map<Path, Descriptors.FileDescriptor> cache) {
    return cache.computeIfAbsent(
        protoPath,
        path -> {
          final var proto = fileDescriptorProtos.get(protoPath);
          if (proto == null) {
            throw new IllegalArgumentException(
                "Dependency " + protoPath + " not found in input proto file(s)");
          }
          try {
            return Descriptors.FileDescriptor.buildFrom(
                proto,
                proto.getDependencyList().stream()
                    .map(
                        dependency -> {
                          final var parent = protoPath.getParent();
                          final var dependencyPath =
                              parent != null ? parent.resolve(dependency) : Paths.get(dependency);
                          return resolveFileDescriptor(dependencyPath, fileDescriptorProtos, cache);
                        })
                    .toArray(Descriptors.FileDescriptor[]::new));

          } catch (Descriptors.DescriptorValidationException e) {
            throw new RuntimeException(e);
          }
        });
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
