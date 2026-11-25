import { ActionBuilder, CheckBuilder, Duration, isDuration, Session, toJvmDuration } from "@gatling.io/core";

import { underlyingSessionToJvmDynamicMessage, wrapToJvmDynamicMessage } from "./dynamic";
import { CallCredentials, jvmCallCredentials } from "./grpc";
import { GrpcHeaders, wrapGrpcHeaders } from "./headers";
import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmGrpcUnaryActionBuilder = io.gatling.javaapi.grpc.GrpcUnaryActionBuilder;
import JvmGrpcUnaryServiceBuilder = io.gatling.javaapi.grpc.GrpcUnaryServiceBuilder;

// FIXME ReqT, RespT
export interface GrpcUnaryActionBuilder extends GrpcHeaders<GrpcUnaryActionBuilder>, ActionBuilder {
  /**
   * Set the call credentials of this request, overriding the ones of the server configuration.
   *
   * @param credentials - the call credentials, a Gatling Expression Language String resolving to call
   *   credentials stored in the session, or a function computing them from the session
   */
  callCredentials(credentials: CallCredentials): GrpcUnaryActionBuilder;
  callCredentials(credentials: string): GrpcUnaryActionBuilder;
  callCredentials(credentials: (session: Session) => CallCredentials): GrpcUnaryActionBuilder;
  // FIXME Force GrpcCheck?
  check(...checks: CheckBuilder[]): GrpcUnaryActionBuilder;
  deadlineAfter(duration: Duration): GrpcUnaryActionBuilder;
}

const wrapGrpcUnaryActionBuilder = (_underlying: JvmGrpcUnaryActionBuilder<any, any>): GrpcUnaryActionBuilder => ({
  _underlying,
  ...wrapGrpcHeaders(_underlying, wrapGrpcUnaryActionBuilder),
  callCredentials: (credentials: CallCredentials | string | ((session: Session) => CallCredentials)) =>
    wrapGrpcUnaryActionBuilder(jvmCallCredentials(_underlying, credentials)),
  check: (...checks) => wrapGrpcUnaryActionBuilder(_underlying.check(checks.map((check) => check._underlying))),
  deadlineAfter: (duration) => {
    if (isDuration(duration)) {
      return wrapGrpcUnaryActionBuilder(_underlying.deadlineAfter(toJvmDuration(duration)));
    }

    throw Error(`deadlineAfter() called with invalid argument ${duration}`);
  }
});

// FIXME ReqT
export interface GrpcUnaryServiceBuilder {
  serverConfiguration(serverConfigurationName: string): GrpcUnaryServiceBuilder;
  send(request: any): GrpcUnaryActionBuilder;
  send(request: (session: Session) => any): GrpcUnaryActionBuilder;
}

export const wrapGrpcUnaryServiceBuilder = (
  _underlying: JvmGrpcUnaryServiceBuilder<any, any>,
  inputDescriptor: JvmDescriptorsDescriptor
): GrpcUnaryServiceBuilder => {
  const toJvmDynamicMessage = wrapToJvmDynamicMessage(inputDescriptor);
  return {
    serverConfiguration: (serverConfigurationName) =>
      wrapGrpcUnaryServiceBuilder(_underlying.serverConfiguration(serverConfigurationName), inputDescriptor),
    send: (request) => {
      return wrapGrpcUnaryActionBuilder(
        typeof request === "function"
          ? _underlying.send(underlyingSessionToJvmDynamicMessage(request, toJvmDynamicMessage))
          : _underlying.send(toJvmDynamicMessage(request))
      );
    }
  };
};
