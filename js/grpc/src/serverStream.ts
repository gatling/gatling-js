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
import JvmGrpcServerStreamAwaitStreamEndActionBuilder = io.gatling.javaapi.grpc.GrpcServerStreamAwaitStreamEndActionBuilder;
import JvmGrpcServerStreamStreamSendActionBuilder = io.gatling.javaapi.grpc.GrpcServerStreamStreamSendActionBuilder;
import JvmGrpcServerStreamingServiceBuilder = io.gatling.javaapi.grpc.GrpcServerStreamingServiceBuilder;

// FIXME ReqT, RespT
export interface GrpcServerStreamAwaitStreamEndActionBuilder extends ActionBuilder {}

const wrapGrpcServerStreamAwaitStreamEndActionBuilder = (
  _underlying: JvmGrpcServerStreamAwaitStreamEndActionBuilder<any, any>
): GrpcServerStreamAwaitStreamEndActionBuilder => wrapActionBuilder(_underlying);

// FIXME ReqT, RespT
export interface GrpcServerStreamStreamSendActionBuilder extends ActionBuilder {}

const wrapGrpcServerStreamStreamSendActionBuilder = (
  _underlying: JvmGrpcServerStreamStreamSendActionBuilder<any, any>
): GrpcServerStreamStreamSendActionBuilder => wrapActionBuilder(_underlying);

// FIXME ReqT, RespT
export interface GrpcServerStreamingServiceBuilder extends GrpcHeaders<GrpcServerStreamingServiceBuilder> {
  // Chainable methods / global stream configuration

  //callCredentials(credentials: CallCredentials): GrpcServerStreamingServiceBuilder;
  //callCredentials(credentials: string): GrpcServerStreamingServiceBuilder;
  //callCredentials(credentials: (session: Session) => CallCredentials): GrpcServerStreamingServiceBuilder;
  // FIXME Force GrpcCheck?
  check(...checks: CheckBuilder[]): GrpcServerStreamingServiceBuilder;
  deadlineAfter(duration: Duration): GrpcServerStreamingServiceBuilder;
  messageRequestName(messageRequestName: string): GrpcServerStreamingServiceBuilder;
  messageRequestName(messageRequestName: (session: Session) => string): GrpcServerStreamingServiceBuilder;
  messageResponseTimePolicy(messageResponseTimePolicy: MessageResponseTimePolicy): GrpcServerStreamingServiceBuilder;
  streamName(streamName: string): GrpcServerStreamingServiceBuilder;

  // Terminal methods / specific actions

  // FIXME ReqT
  send(request: any): GrpcServerStreamStreamSendActionBuilder;
  send(request: (session: Session) => any): GrpcServerStreamStreamSendActionBuilder;
  // FIXME replace with real action builder
  awaitStreamEnd(): GrpcServerStreamAwaitStreamEndActionBuilder;
  awaitStreamEnd(reconcile: (main: Session, forked: Session) => Session): GrpcServerStreamAwaitStreamEndActionBuilder;
  cancel(): ActionBuilder;
}

export const wrapGrpcServerStreamingServiceBuilder =
  (
    inputDescriptor: JvmDescriptorsDescriptor
  ): ((_underlying: JvmGrpcServerStreamingServiceBuilder<any, any>) => GrpcServerStreamingServiceBuilder) =>
  (_underlying) => {
    const toJvmDynamicMessage = wrapToJvmDynamicMessage(inputDescriptor);
    const wrap = wrapGrpcServerStreamingServiceBuilder(inputDescriptor);
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
      send: (request) => {
        return wrapGrpcServerStreamStreamSendActionBuilder(
          typeof request === "function"
            ? _underlying.send(underlyingSessionToJvmDynamicMessage(request, toJvmDynamicMessage))
            : _underlying.send(toJvmDynamicMessage(request))
        );
      },
      awaitStreamEnd: (reconcile?: (main: Session, forked: Session) => Session) =>
        wrapGrpcServerStreamAwaitStreamEndActionBuilder(
          typeof reconcile === "function"
            ? _underlying.awaitStreamEnd(underlyingBiSessionTransform(reconcile))
            : _underlying.awaitStreamEnd()
        ),
      cancel: () => wrapActionBuilder(_underlying.cancel())
    };
  };
