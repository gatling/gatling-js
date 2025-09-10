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
import { MessageResponseTimePolicy, toJvmMessageResponseTimePolicy } from "./grpc";
import { GrpcHeaders, wrapGrpcHeaders } from "./headers";

import JvmDynamicMessageBuilder = com.google.protobuf.DynamicMessage$Builder;
import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmGrpcBidiStreamAwaitStreamEndActionBuilder = io.gatling.javaapi.grpc.GrpcBidiStreamAwaitStreamEndActionBuilder;
import JvmGrpcBidirectionalStreamingServiceBuilder = io.gatling.javaapi.grpc.GrpcBidirectionalStreamingServiceBuilder;

export interface GrpcBidiStreamAwaitStreamEndActionBuilder extends ActionBuilder {}

const wrapGrpcBidiStreamAwaitStreamEndActionBuilder = (
  _underlying: JvmGrpcBidiStreamAwaitStreamEndActionBuilder<any, any>
): GrpcBidiStreamAwaitStreamEndActionBuilder => wrapActionBuilder(_underlying);

// FIXME ReqT, RespT
// FIXME GrpcBidiStreamAwaitStreamEndActionBuilder but GrpcBidirectionalStreamingServiceBuilder?
export interface GrpcBidirectionalStreamingServiceBuilder
  extends GrpcHeaders<GrpcBidirectionalStreamingServiceBuilder> {
  // Chainable methods / global stream configuration

  //callCredentials(credentials: CallCredentials): GrpcBidirectionalStreamingServiceBuilder;
  //callCredentials(credentials: string): GrpcBidirectionalStreamingServiceBuilder;
  //callCredentials(credentials: (session: Session) => CallCredentials): GrpcBidirectionalStreamingServiceBuilder;
  // FIXME Force GrpcCheck?
  check(...checks: CheckBuilder[]): GrpcBidirectionalStreamingServiceBuilder;
  deadlineAfter(duration: Duration): GrpcBidirectionalStreamingServiceBuilder;
  messageRequestName(messageRequestName: string): GrpcBidirectionalStreamingServiceBuilder;
  messageRequestName(messageRequestName: (session: Session) => string): GrpcBidirectionalStreamingServiceBuilder;
  messageResponseTimePolicy(
    messageResponseTimePolicy: MessageResponseTimePolicy
  ): GrpcBidirectionalStreamingServiceBuilder;
  streamName(streamName: string): GrpcBidirectionalStreamingServiceBuilder;

  // Terminal methods / specific actions

  start(): ActionBuilder; // FIXME return type
  cancel(): ActionBuilder; // FIXME return type
  // FIXME ReqT
  send(request: any): ActionBuilder; // FIXME return type
  send(request: (session: Session) => any): ActionBuilder; // FIXME return type
  halfClose(): ActionBuilder; // FIXME return type
  awaitStreamEnd(): GrpcBidiStreamAwaitStreamEndActionBuilder;
  awaitStreamEnd(reconcile: (main: Session, forked: Session) => Session): GrpcBidiStreamAwaitStreamEndActionBuilder;
}

export const wrapGrpcBidirectionalStreamingServiceBuilder =
  (
    builder: JvmDynamicMessageBuilder,
    inputDescriptor: JvmDescriptorsDescriptor
  ): ((
    _underlying: JvmGrpcBidirectionalStreamingServiceBuilder<any, any>
  ) => GrpcBidirectionalStreamingServiceBuilder) =>
  (_underlying) => {
    const toJvmDynamicMessage = wrapToJvmDynamicMessage(builder, inputDescriptor);
    const wrap = wrapGrpcBidirectionalStreamingServiceBuilder(builder, inputDescriptor);
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
      cancel: () => wrapActionBuilder(_underlying.cancel()),
      send: (request) => {
        return wrapActionBuilder(
          typeof request === "function"
            ? _underlying.send(underlyingSessionToJvmDynamicMessage(request, toJvmDynamicMessage))
            : _underlying.send(toJvmDynamicMessage(request))
        );
      },
      halfClose: () => wrapActionBuilder(_underlying.halfClose()),
      awaitStreamEnd: (reconcile?: (main: Session, forked: Session) => Session) =>
        wrapGrpcBidiStreamAwaitStreamEndActionBuilder(
          typeof reconcile === "function"
            ? _underlying.awaitStreamEnd(underlyingBiSessionTransform(reconcile))
            : _underlying.awaitStreamEnd()
        )
    };
  };
