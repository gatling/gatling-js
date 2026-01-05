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

package io.gatling.grpc

import java.{ util => ju }

import io.gatling.core.check.CheckBuilder
import io.gatling.core.session.el._
import io.gatling.grpc.check.status.{ GrpcStatusCheckType, GrpcStatusCodeStringCheckBuilder }
import io.gatling.grpc.protocol.{ GrpcProtocolBuilder, GrpcServerConfigurationBuilder }

import io.grpc.Status

object GrpcDslAddons {
  // Checks
  val statusCodeAsString: CheckBuilder.Find[GrpcStatusCheckType, Status, String] = GrpcStatusCodeStringCheckBuilder
  // Protocol
  def channelCredentialsEL(builder: GrpcProtocolBuilder, credentials: String): GrpcProtocolBuilder = {
    val el = credentials.el[ju.Map[String, String]]
    builder.channelCredentials { session =>
      el(session).map { m =>
        io.gatling.javaapi.grpc.GrpcDslAddons.channelCredentials(m.get("rootCerts"), m.get("certChain"), m.get("privateKey"))
      }
    }
  }
  // Server configuration
  def channelCredentialsEL(builder: GrpcServerConfigurationBuilder, credentials: String): GrpcServerConfigurationBuilder = {
    val el = credentials.el[ju.Map[String, String]]
    builder.channelCredentials { session =>
      el(session).map { m =>
        io.gatling.javaapi.grpc.GrpcDslAddons.channelCredentials(m.get("rootCerts"), m.get("certChain"), m.get("privateKey"))
      }
    }
  }
}
