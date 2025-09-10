import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Expression,
  isDuration,
  Session,
  toJvmDuration,
  underlyingSessionTo
} from "@gatling.io/core";

import { CallCredentials } from "./grpc";
import { GrpcHeaders, wrapGrpcHeaders } from "./headers";

import JvmDynamicMessageBuilder = com.google.protobuf.DynamicMessage$Builder;
import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmGrpcUnaryActionBuilder = io.gatling.javaapi.grpc.GrpcUnaryActionBuilder;
import JvmGrpcUnaryServiceBuilder = io.gatling.javaapi.grpc.GrpcUnaryServiceBuilder;

// FIXME ReqT, RespT
export interface GrpcUnaryActionBuilder extends GrpcHeaders<GrpcUnaryActionBuilder>, ActionBuilder {
  // FIXME java methods order?
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
  callCredentials: (credentials: string | Expression<CallCredentials>) =>
    wrapGrpcUnaryActionBuilder(
      typeof credentials === "string"
        ? _underlying.callCredentials(credentials as string)
        : typeof credentials === "function"
          ? _underlying.callCredentials(underlyingSessionTo(credentials as any)) // FIXME ??
          : _underlying.callCredentials(credentials as any)
    ),
  check: (...checks) => wrapGrpcUnaryActionBuilder(_underlying.check(checks.map((check) => check._underlying))),
  deadlineAfter: (duration: Duration) => {
    if (isDuration(duration)) {
      return wrapGrpcUnaryActionBuilder(_underlying.deadlineAfter(toJvmDuration(duration)));
    }

    throw Error(`deadlineAfter() called with invalid argument ${duration}`);
  }
});

// FIXME ReqT
export interface GrpcUnaryServiceBuilder {
  send(request: any): GrpcUnaryActionBuilder;
  send(request: (session: Session) => any): GrpcUnaryActionBuilder;
}

const wrapRequest = (
  builder: JvmDynamicMessageBuilder,
  inputDescriptor: JvmDescriptorsDescriptor,
  request: any
): any => {
  const fieldDescriptor = inputDescriptor.findFieldByName("greeting");
  builder
    .getFieldBuilder(fieldDescriptor)
    .setField(fieldDescriptor.getMessageType().findFieldByName("first_name"), request.greeting.firstName)
    .setField(fieldDescriptor.getMessageType().findFieldByName("last_name"), request.greeting.lastName);
  return builder.build();
};

export const wrapGrpcUnaryServiceBuilder = (
  _underlying: JvmGrpcUnaryServiceBuilder<any, any>,
  builder: JvmDynamicMessageBuilder,
  inputDescriptor: JvmDescriptorsDescriptor
): GrpcUnaryServiceBuilder => ({
  send: (request: Expression<any>) =>
    wrapGrpcUnaryActionBuilder(
      typeof request === "function"
        ? _underlying.send(underlyingSessionTo(request)) // FIXME apply field per field?
        : _underlying.send(wrapRequest(builder, inputDescriptor, request))
    )
});
