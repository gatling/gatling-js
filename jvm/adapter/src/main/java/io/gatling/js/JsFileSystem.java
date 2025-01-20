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

package io.gatling.js;

import java.io.IOException;
import java.lang.reflect.Field;
import java.net.URI;
import java.nio.channels.SeekableByteChannel;
import java.nio.file.*;
import java.nio.file.attribute.FileAttribute;
import java.util.*;
import org.graalvm.polyglot.io.FileSystem;

public class JsFileSystem implements FileSystem {

  private static final boolean DEBUG = "true".equals(System.getenv("DEBUG"));

  private static final List<String> JS_POLYFILLS =
      JsPolyfills.FILES_AND_CHUNKS.stream().map(f -> f + ".js").toList();

  private static final List<String> POSTMAN_DEPENDENCIES;

  @SuppressWarnings("unchecked")
  private static List<String> getPostmanDependencies()
      throws ClassNotFoundException, NoSuchFieldException, IllegalAccessException {
    Class<?> dependencies = Class.forName("io.gatling.postman.PostmanDependencies");
    Field field = dependencies.getField("FILES_AND_CHUNKS");
    return (List<String>) field.get(null);
  }

  static {
    List<String> tmp;
    System.out.println("ALLO?????");
    try {
      tmp = getPostmanDependencies();
    } catch (Exception e) {
      System.out.println("getPostmanDependencies error: " + e.getMessage());
      e.printStackTrace();
      tmp = Collections.emptyList();
    }
    POSTMAN_DEPENDENCIES = tmp.stream().map(t -> t + ".js").toList();
    for (String polyfill : JS_POLYFILLS) {
      System.out.println("Gatling JS polyfill: " + polyfill);
    }
    for (String dependency : POSTMAN_DEPENDENCIES) {
      System.out.println("Gatling Postman dependency: " + dependency);
    }
  }

  // FIXME cache?
  private static String getPolyfillOrDependency(Path path) {
    for (String polyfill : JS_POLYFILLS) {
      if (path.endsWith(polyfill)) {
        return "polyfills/" + polyfill;
      }
    }
    for (String dependency : POSTMAN_DEPENDENCIES) {
      if (path.endsWith(dependency)) {
        return "dependencies/" + dependency;
      }
    }
    return null;
  }

  private final FileSystem delegate;

  public JsFileSystem(FileSystem delegate) {
    this.delegate = delegate;
  }

  @Override
  public Path parsePath(URI uri) {
    Path result = this.delegate.parsePath(uri);
    if (DEBUG) {
      System.out.printf("parsePath(%s): %s\n", uri.toString(), result.toString());
    }
    return result;
  }

  @Override
  public Path parsePath(String path) {
    Path result = this.delegate.parsePath(path);
    if (DEBUG) {
      System.out.printf("parsePath(%s): %s\n", path, result.toString());
    }
    return result;
  }

  @Override
  public void checkAccess(Path path, Set<? extends AccessMode> modes, LinkOption... linkOptions)
      throws IOException {
    if (getPolyfillOrDependency(path) != null) {
      if (DEBUG) {
        System.out.printf(
            "checkAccess(%s, %s, %s): success (polyfill)\n",
            path, modes, Arrays.toString(linkOptions));
      }
      return;
    }

    boolean success = false;
    try {
      this.delegate.checkAccess(path, modes, linkOptions);
      success = true;
    } finally {
      if (DEBUG) {
        System.out.printf(
            "checkAccess(%s, %s, %s): %s\n",
            path, modes, Arrays.toString(linkOptions), success ? "success" : "failure");
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
      if (DEBUG) {
        System.out.printf(
            "createDirectory(%s, %s): %s\n",
            dir, Arrays.toString(attrs), success ? "success" : "failure");
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
      if (DEBUG) {
        System.out.printf("delete(%s): %s\n", path, success ? "success" : "failure");
      }
    }
  }

  @Override
  public SeekableByteChannel newByteChannel(
      Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs) throws IOException {
    String polyfillOrDependency = getPolyfillOrDependency(path);
    if (polyfillOrDependency != null) {
      if (DEBUG) {
        System.out.printf("newByteChannel(%s): polyfill\n", path);
      }
      try (var is =
          Thread.currentThread()
              .getContextClassLoader()
              .getResourceAsStream(polyfillOrDependency)) {
        if (is == null) {
          System.out.println("Resource not found: " + polyfillOrDependency);
        }
        // FIXME null?
        byte[] bytes = is.readAllBytes();
        // FIXME cache?
        return new IsThisAProperSeekableByteChannelImpl(bytes);
      }
    }

    SeekableByteChannel result = null;
    try {
      result = this.delegate.newByteChannel(path, options, attrs);
    } finally {
      if (DEBUG) {
        System.out.printf(
            "newByteChannel(%s): %s\n", path, result == null ? "null" : result.toString());
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
      if (DEBUG) {
        System.out.printf(
            "newDirectoryStream(%s): %s\n", dir, result == null ? "null" : result.toString());
      }
    }
    return result;
  }

  @Override
  public Path toAbsolutePath(Path path) {
    Path result = this.delegate.toAbsolutePath(path);
    if (DEBUG) {
      System.out.printf("toAbsolutePath(%s): %s\n", path.toString(), result.toString());
    }
    return result;
  }

  @Override
  public Path toRealPath(Path path, LinkOption... linkOptions) throws IOException {
    Path result = null;
    try {
      result = this.delegate.toRealPath(path, linkOptions);
    } finally {
      if (DEBUG) {
        System.out.printf(
            "toRealPath(%s, %s): %s\n",
            path, Arrays.toString(linkOptions), result == null ? "null" : result.toString());
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
    if (getPolyfillOrDependency(path) != null) {
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
      if (DEBUG) {
        System.out.printf(
            "readAttributes(%s, |%s|, %s): %s\n",
            path,
            attributes,
            Arrays.toString(options),
            result == null ? "null" : result.toString());
      }
    }
    return result;
  }
}
