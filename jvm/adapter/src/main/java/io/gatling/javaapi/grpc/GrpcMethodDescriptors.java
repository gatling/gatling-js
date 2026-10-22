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

import com.google.protobuf.DescriptorProtos;
import com.google.protobuf.Descriptors;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Loads gRPC method descriptors from the protobuf files compiled by the gatling-js CLI, listed in
 * the {@code compiled-protobuf-files} resource.
 *
 * <p>Everything is cached, as loading a method descriptor means parsing all the compiled files,
 * then building and validating the file descriptor and its dependencies:
 *
 * <ul>
 *   <li>compiled files are only read once
 *   <li>each file descriptor is only built once, and shared by all the methods of the file and by
 *       the files depending on it
 *   <li>each method descriptor is only created once
 * </ul>
 */
final class GrpcMethodDescriptors {

  static final String COMPILED_PROTOS_LIST = "compiled-protobuf-files";

  @FunctionalInterface
  interface ResourceLoader {
    /**
     * @return the resource content, or null if it doesn't exist
     */
    InputStream open(String path);
  }

  private static final class ClasspathHolder {
    private static final GrpcMethodDescriptors INSTANCE =
        new GrpcMethodDescriptors(
            path -> GrpcMethodDescriptors.class.getClassLoader().getResourceAsStream(path));
  }

  static GrpcMethodDescriptors fromClasspath() {
    return ClasspathHolder.INSTANCE;
  }

  private final ResourceLoader resources;
  // all guarded by this
  private Map<Path, DescriptorProtos.FileDescriptorProto> fileDescriptorProtos;
  private final Map<Path, Descriptors.FileDescriptor> fileDescriptors = new HashMap<>();
  private final Map<String, GrpcMethodDescriptorWrapper> methodDescriptors = new HashMap<>();

  GrpcMethodDescriptors(ResourceLoader resources) {
    this.resources = resources;
  }

  synchronized GrpcMethodDescriptorWrapper load(String pkg, String service, String method)
      throws IOException, Descriptors.DescriptorValidationException {
    final var pkgPrefix = pkg != null ? pkg + "." : "";
    final var fullMethodName = pkgPrefix + service + "/" + method;
    final var cached = methodDescriptors.get(fullMethodName);
    if (cached != null) {
      return cached;
    }

    if (fileDescriptorProtos == null) {
      // Load all the binary files
      fileDescriptorProtos = loadFileDescriptors(readCompiledProtosList());
    }

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
                () ->
                    new IllegalArgumentException(
                        "File descriptor not found for gRPC method " + fullMethodName))
            .getKey();

    // Convert to a FileDescriptor with resolved dependencies
    final var fileDescriptor =
        resolveFileDescriptor(fileDescriptorPath, fileDescriptorProtos, fileDescriptors);

    // Find and convert method
    final var serviceDescriptor = fileDescriptor.findServiceByName(service);
    final var methodDescriptor = serviceDescriptor.findMethodByName(method);
    final var wrapper = new GrpcMethodDescriptorWrapper(methodDescriptor);
    methodDescriptors.put(fullMethodName, wrapper);
    return wrapper;
  }

  private List<String> readCompiledProtosList() throws IOException {
    try (final var is = resources.open(COMPILED_PROTOS_LIST)) {
      if (is == null) {
        return Collections.emptyList();
      }
      try (final var isr = new InputStreamReader(is, StandardCharsets.UTF_8);
          final var br = new BufferedReader(isr)) {
        return br.lines().toList();
      }
    }
  }

  private Map<Path, DescriptorProtos.FileDescriptorProto> loadFileDescriptors(List<String> paths) {
    return paths.stream()
        .flatMap(
            resource -> {
              final DescriptorProtos.FileDescriptorSet fileDescriptorSet;
              try (final var is = resources.open(resource)) {
                fileDescriptorSet = DescriptorProtos.FileDescriptorSet.parseFrom(is);
              } catch (IOException e) {
                throw new RuntimeException(
                    "Failed to read compiled protobuf file from resource path '" + resource + "'",
                    e);
              }

              return fileDescriptorSet.getFileList().stream()
                  .map(
                      fileDescriptorProto -> {
                        final var path = Paths.get(fileDescriptorProto.getName());
                        return new Pair<>(path, fileDescriptorProto);
                      });
            })
        .collect(Collectors.toMap(p -> p.key, p -> p.value));
  }

  /** Uses proto-path-root-relative paths for file descriptor names and their dependencies. */
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
                        final var dependencyPath = Paths.get(dependency);
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
