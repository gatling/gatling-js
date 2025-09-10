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

import java.io.IOException;

import io.gatling.javaapi.core.CheckBuilder;
import io.gatling.javaapi.grpc.internal.GrpcCheckType;

import io.grpc.ChannelCredentials;
import io.grpc.TlsChannelCredentials;

public class GrpcDslAddons {
  public static CheckBuilder.Find<String> statusCodeString() {
    return new CheckBuilder.Find.Default<>(
        io.gatling.grpc.GrpcDslAddons.statusCodeString(), GrpcCheckType.Status, String.class, null);
  }

  public GrpcProtocolBuilder channelCredentials(GrpcProtocolBuilder builder, String credentials) {
    // return io.gatling.grpc.GrpcDslAddons.channelCredentials(builder.a, credentials);
    return builder;
  }

  public static ChannelCredentials tlsChannelCredentials(
      String rootCerts, String certChain, String privateKey) throws IOException {
    final var credentials = TlsChannelCredentials.newBuilder();
    final var classLoader = GrpcDslAddons.class.getClassLoader();
    if (rootCerts != null) {
      final var rootsCertsInputStream = classLoader.getResourceAsStream(rootCerts);
      if (rootsCertsInputStream == null) {
        throw new IllegalArgumentException("resource not found: " + rootCerts);
      } else {
        credentials.trustManager(rootsCertsInputStream);
      }
    }
    if (certChain != null && privateKey != null) {
      final var certChainInputStream = classLoader.getResourceAsStream(certChain);
      if (certChainInputStream == null) {
        throw new IllegalArgumentException("resource not found: " + certChain);
      }
      final var privateKeyInputStream = classLoader.getResourceAsStream(privateKey);
      if (privateKeyInputStream == null) {
        throw new IllegalArgumentException("resource not found: " + privateKey);
      }
      credentials.keyManager(certChainInputStream, privateKeyInputStream);
    }
    return credentials.build();
  }
}
