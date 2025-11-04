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
import io.gatling.js.Resources;

import io.grpc.ChannelCredentials;
import io.grpc.TlsChannelCredentials;

public class GrpcDslAddons {

  // Checks

  public static CheckBuilder.Find<String> statusCodeAsString() {
    return new CheckBuilder.Find.Default<>(
        io.gatling.grpc.GrpcDslAddons.statusCodeAsString(),
        GrpcCheckType.Status,
        String.class,
        null);
  }

  // Protocol & Server configurations

  public static GrpcProtocolBuilder channelCredentialsEL(
      GrpcProtocolBuilder builder, String credentials) {
    return new GrpcProtocolBuilder(
        io.gatling.grpc.GrpcDslAddons.channelCredentialsEL(builder.asScala(), credentials));
  }

  public static GrpcServerConfigurationBuilder channelCredentialsEL(
      GrpcServerConfigurationBuilder builder, String credentials) {
    return new GrpcServerConfigurationBuilder(
        io.gatling.grpc.GrpcDslAddons.channelCredentialsEL(builder.asScala(), credentials));
  }

  public static ChannelCredentials channelCredentials(
      String rootCerts, String certChain, String privateKey) throws IOException {
    final var credentials = TlsChannelCredentials.newBuilder();
    if (rootCerts != null) {
      final var rootCertsInputStream = Resources.readResourceAsInputStream(rootCerts);
      if (rootCertsInputStream == null) {
        throw new IllegalArgumentException("resource not found: " + rootCerts);
      } else {
        credentials.trustManager(rootCertsInputStream);
      }
    }
    if (certChain != null && privateKey != null) {
      final var certChainInputStream = Resources.readResourceAsInputStream(certChain);
      if (certChainInputStream == null) {
        throw new IllegalArgumentException("resource not found: " + certChain);
      }
      final var privateKeyInputStream = Resources.readResourceAsInputStream(privateKey);
      if (privateKeyInputStream == null) {
        throw new IllegalArgumentException("resource not found: " + privateKey);
      }
      credentials.keyManager(certChainInputStream, privateKeyInputStream);
    }
    return credentials.build();
  }
}
