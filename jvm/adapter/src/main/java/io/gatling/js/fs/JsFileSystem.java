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

package io.gatling.js.fs;

import java.io.IOException;
import java.net.URI;
import java.nio.channels.SeekableByteChannel;
import java.nio.file.*;
import java.nio.file.attribute.FileAttribute;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.gatling.js.JsPolyfills;

import org.graalvm.polyglot.io.FileSystem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JsFileSystem implements FileSystem {

  private static final Logger LOGGER = LoggerFactory.getLogger(JsFileSystem.class);

  public static JsFileSystem newFileSystem() {
    var delegate = FileSystem.newDefaultFileSystem();
    return new JsFileSystem(delegate, JsPolyfills.RESOLUTION_PATHS);
  }

  public static JsFileSystem newFileSystem(Set<String> additionalResolutionPaths) {
    var delegate = FileSystem.newDefaultFileSystem();
    var resolutionPaths =
        Stream.concat(JsPolyfills.RESOLUTION_PATHS.stream(), additionalResolutionPaths.stream())
            .collect(Collectors.toSet());
    return new JsFileSystem(delegate, resolutionPaths);
  }

  private final FileSystem delegate;
  private final Set<String> replacementsResolutionPaths;

  private JsFileSystem(FileSystem delegate, Set<String> additionalReplacements) {
    this.delegate = delegate;
    this.replacementsResolutionPaths = new HashSet<>(additionalReplacements);
  }

  private String getReplacement(Path path) {
    LOGGER.trace("getReplacement({})", path.toString());
    String p = path.toString();
    int index = p.indexOf("@gatling.io");
    if (index >= 0) {
      String replacementPath = p.substring(index);
      LOGGER.trace("=> checking for replacement '{}'", replacementPath);
      if (replacementsResolutionPaths.contains(replacementPath)) {
        return replacementPath;
      }
    }
    return null;
  }

  @Override
  public Path parsePath(URI uri) {
    Path result = this.delegate.parsePath(uri);
    if (LOGGER.isTraceEnabled()) {
      LOGGER.trace("parsePath({}): {}", uri.toString(), result.toString());
    }
    return result;
  }

  @Override
  public Path parsePath(String path) {
    Path result = this.delegate.parsePath(path);
    if (LOGGER.isTraceEnabled()) {
      LOGGER.trace("parsePath({}): {}", path, result.toString());
    }
    return result;
  }

  @Override
  public void checkAccess(Path path, Set<? extends AccessMode> modes, LinkOption... linkOptions)
      throws IOException {
    if (getReplacement(path) != null) {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace(
            "checkAccess({}, {}, {}): success (polyfill)",
            path,
            modes,
            Arrays.toString(linkOptions));
      }
      return;
    }

    boolean success = false;
    try {
      this.delegate.checkAccess(path, modes, linkOptions);
      success = true;
    } finally {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace(
            "checkAccess({}, {}, {}): {}",
            path,
            modes,
            Arrays.toString(linkOptions),
            success ? "success" : "failure");
      }
    }
  }

  @Override
  public void createDirectory(Path dir, FileAttribute<?>... attrs) throws IOException {
    boolean success = false;
    try {
      this.delegate.createDirectory(dir, attrs);
      success = true;
    } finally {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace(
            "createDirectory({}, {}): {}",
            dir,
            Arrays.toString(attrs),
            success ? "success" : "failure");
      }
    }
  }

  @Override
  public void delete(Path path) throws IOException {
    boolean success = false;
    try {
      this.delegate.delete(path);
      success = true;
    } finally {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace("delete({}): {}", path, success ? "success" : "failure");
      }
    }
  }

  @Override
  public SeekableByteChannel newByteChannel(
      Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs) throws IOException {
    String replacement = getReplacement(path);
    if (replacement != null) {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace("newByteChannel({}): polyfill", path);
      }
      try (var is =
          Thread.currentThread().getContextClassLoader().getResourceAsStream(replacement)) {
        if (is == null) {
          throw new IOException("Resource not found: " + replacement);
        }
        byte[] bytes = is.readAllBytes();
        return new JsSeekableByteChannelImpl(bytes);
      }
    }

    SeekableByteChannel result = null;
    try {
      result = this.delegate.newByteChannel(path, options, attrs);
    } finally {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace("newByteChannel({}): {}", path, result == null ? "null" : result.toString());
      }
    }
    return result;
  }

  @Override
  public DirectoryStream<Path> newDirectoryStream(
      Path dir, DirectoryStream.Filter<? super Path> filter) throws IOException {
    DirectoryStream<Path> result = null;
    try {
      result = this.delegate.newDirectoryStream(dir, filter);
    } finally {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace(
            "newDirectoryStream({}): {}", dir, result == null ? "null" : result.toString());
      }
    }
    return result;
  }

  @Override
  public Path toAbsolutePath(Path path) {
    Path result = this.delegate.toAbsolutePath(path);
    if (LOGGER.isTraceEnabled()) {
      LOGGER.trace("toAbsolutePath({}): {}", path.toString(), result.toString());
    }
    return result;
  }

  @Override
  public Path toRealPath(Path path, LinkOption... linkOptions) throws IOException {
    Path result = null;
    try {
      result = this.delegate.toRealPath(path, linkOptions);
    } finally {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace(
            "toRealPath({}, {}): {}",
            path,
            Arrays.toString(linkOptions),
            result == null ? "null" : result.toString());
      }
    }
    return result;
  }

  private static String[] split(String attribute) {
    String[] s = new String[2];
    int pos = attribute.indexOf(':');
    if (pos == -1) {
      s[0] = "basic";
      s[1] = attribute;
    } else {
      s[0] = attribute.substring(0, pos++);
      s[1] = (pos == attribute.length()) ? "" : attribute.substring(pos);
    }
    return s;
  }

  @Override
  public Map<String, Object> readAttributes(Path path, String attributes, LinkOption... options)
      throws IOException {
    if (getReplacement(path) != null) {
      Map<String, Object> result = new HashMap<>();
      for (String attribute : split(attributes)) {
        result.put(attribute, true);
      }
      return result;
    }

    Map<String, Object> result = null;
    try {
      result = this.delegate.readAttributes(path, attributes, options);
    } finally {
      if (LOGGER.isTraceEnabled()) {
        LOGGER.trace(
            "readAttributes({}, {}, {}): {}",
            path,
            attributes,
            Arrays.toString(options),
            result == null ? "null" : result.toString());
      }
    }
    return result;
  }
}
