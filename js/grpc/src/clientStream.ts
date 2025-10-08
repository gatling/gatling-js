import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Session,
  isDuration,
  toJvmDuration,
  underlyingBiSessionTransform,
  underlyingSessionTo,
  wrapActionBuilder
} from "@gatling.io/core";

import { underlyingSessionToJvmDynamicMessage, wrapToJvmDynamicMessage } from "./dynamic";
import { GrpcHeaders, wrapGrpcHeaders } from "./headers";
import { MessageResponseTimePolicy, toJvmMessageResponseTimePolicy } from "./grpc";

import JvmDynamicMessageBuilder = com.google.protobuf.DynamicMessage$Builder;
import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmGrpcClientStreamAwaitStreamEndActionBuilder = io.gatling.javaapi.grpc.GrpcClientStreamAwaitStreamEndActionBuilder;
import JvmGrpcClientStreamingServiceBuilder = io.gatling.javaapi.grpc.GrpcClientStreamingServiceBuilder;

export interface GrpcClientStreamAwaitStreamEndActionBuilder extends ActionBuilder {}

const wrapGrpcClientStreamAwaitStreamEndActionBuilder = (
  _underlying: JvmGrpcClientStreamAwaitStreamEndActionBuilder<any, any>
): GrpcClientStreamAwaitStreamEndActionBuilder => wrapActionBuilder(_underlying);

// FIXME ReqT, RespT
export interface GrpcClientStreamingServiceBuilder extends GrpcHeaders<GrpcClientStreamingServiceBuilder> {
  // Chainable methods / global stream configuration

  //callCredentials(credentials: CallCredentials): GrpcClientStreamingServiceBuilder;
  //callCredentials(credentials: string): GrpcClientStreamingServiceBuilder;
  //callCredentials(credentials: (session: Session) => CallCredentials): GrpcClientStreamingServiceBuilder;
  // FIXME Force GrpcCheck?
  check(...checks: CheckBuilder[]): GrpcClientStreamingServiceBuilder;
  deadlineAfter(duration: Duration): GrpcClientStreamingServiceBuilder;
  messageRequestName(messageRequestName: string): GrpcClientStreamingServiceBuilder;
  messageRequestName(messageRequestName: (session: Session) => string): GrpcClientStreamingServiceBuilder;
  messageResponseTimePolicy(messageResponseTimePolicy: MessageResponseTimePolicy): GrpcClientStreamingServiceBuilder;
  streamName(streamName: string): GrpcClientStreamingServiceBuilder;

  // Terminal methods / specific actions

  start(): ActionBuilder; // FIXME return type
  // FIXME ReqT
  send(request: any): ActionBuilder; // FIXME return type
  send(request: (session: Session) => any): ActionBuilder; // FIXME return type
  halfClose(): ActionBuilder; // FIXME return type
  awaitStreamEnd(): GrpcClientStreamAwaitStreamEndActionBuilder;
  awaitStreamEnd(reconcile: (main: Session, forked: Session) => Session): GrpcClientStreamAwaitStreamEndActionBuilder;
  cancel(): ActionBuilder; // FIXME return type
}

export const wrapGrpcClientStreamingServiceBuilder =
  (
    inputDescriptor: JvmDescriptorsDescriptor
  ): ((_underlying: JvmGrpcClientStreamingServiceBuilder<any, any>) => GrpcClientStreamingServiceBuilder) =>
  (_underlying) => {
    const toJvmDynamicMessage = wrapToJvmDynamicMessage(inputDescriptor);
    const wrap = wrapGrpcClientStreamingServiceBuilder(inputDescriptor);
    return {
      ...wrapGrpcHeaders(_underlying, wrap),
      // Chainable methods / global stream configuration
      // FIXME callCredentials
      check: (...checks) => wrap(_underlying.check(checks.map((check) => check._underlying))),
      deadlineAfter: (duration) => {
        if (isDuration(duration)) {
          return wrap(_underlying.deadlineAfter(toJvmDuration(duration)));
        }

        throw Error(`deadlineAfter() called with invalid argument ${duration}`);
      },
      messageRequestName: (messageRequestName) =>
        wrap(
          typeof messageRequestName === "function"
            ? _underlying.messageRequestName(underlyingSessionTo(messageRequestName))
            : _underlying.messageRequestName(messageRequestName)
        ),
      messageResponseTimePolicy: (messageResponseTimePolicy) =>
        wrap(_underlying.messageResponseTimePolicy(toJvmMessageResponseTimePolicy(messageResponseTimePolicy))),
      streamName: (streamName) => wrap(_underlying.streamName(streamName)),
      // Terminal methods / specific actions
      start: () => wrapActionBuilder(_underlying.start()),
      send: (request) => {
        return wrapActionBuilder(
          typeof request === "function"
            ? _underlying.send(underlyingSessionToJvmDynamicMessage(request, toJvmDynamicMessage))
            : _underlying.send(toJvmDynamicMessage(request))
        );
      },
      halfClose: () => wrapActionBuilder(_underlying.halfClose()),
      awaitStreamEnd: (reconcile?: (main: Session, forked: Session) => Session) =>
        wrapGrpcClientStreamAwaitStreamEndActionBuilder(
          typeof reconcile === "function"
            ? _underlying.awaitStreamEnd(underlyingBiSessionTransform(reconcile))
            : _underlying.awaitStreamEnd()
        ),
      cancel: () => wrapActionBuilder(_underlying.cancel())
    };
  };
