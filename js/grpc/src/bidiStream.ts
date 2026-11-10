import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Session,
  isDuration,
  toJvmDuration,
  underlyingBiSessionTransform,
  underlyingSessionTo,
  wrapActionBuilder,
  underlyingJvmXToXWithSessionToSession,
  underlyingJvmXToXWithBiSessionToSession
} from "@gatling.io/core";

import { transformJvmInboundMessages, underlyingSessionToJvmDynamicMessage, wrapToJvmDynamicMessage } from "./dynamic";
import {
  GrpcInboundMessage,
  InitialTimestampFunction,
  MessageResponseTimePolicy,
  toJvmInitialTimestampFunction,
  toJvmMessageResponseTimePolicy
} from "./grpc";
import { GrpcHeaders, wrapGrpcHeaders } from "./headers";

import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmGrpcBidiStreamAwaitStreamEndActionBuilder = io.gatling.javaapi.grpc.GrpcBidiStreamAwaitStreamEndActionBuilder;
import JvmGrpcBidirectionalStreamingServiceBuilder = io.gatling.javaapi.grpc.GrpcBidirectionalStreamingServiceBuilder;

export interface GrpcBidiStreamAwaitStreamEndActionBuilder extends ActionBuilder {}

const wrapGrpcBidiStreamAwaitStreamEndActionBuilder = (
  _underlying: JvmGrpcBidiStreamAwaitStreamEndActionBuilder<any, any>
): GrpcBidiStreamAwaitStreamEndActionBuilder => wrapActionBuilder(_underlying);

// FIXME ReqT, RespT
// FIXME GrpcBidiStreamAwaitStreamEndActionBuilder but GrpcBidirectionalStreamingServiceBuilder?
export interface GrpcBidirectionalStreamingServiceBuilder extends GrpcHeaders<GrpcBidirectionalStreamingServiceBuilder> {
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
  messageResponseTimePolicy(
    initialTimestampFunction: InitialTimestampFunction
  ): GrpcBidirectionalStreamingServiceBuilder;
  serverConfiguration(serverConfigurationName: string): GrpcBidirectionalStreamingServiceBuilder;
  streamName(streamName: string): GrpcBidirectionalStreamingServiceBuilder;

  // Terminal methods / specific actions

  start(): ActionBuilder; // FIXME return type
  // FIXME ReqT
  send(request: any): ActionBuilder; // FIXME return type
  send(request: (session: Session) => any): ActionBuilder; // FIXME return type
  halfClose(): ActionBuilder; // FIXME return type
  processUnmatchedMessages(f: (messages: GrpcInboundMessage[], session: Session) => Session): ActionBuilder;
  awaitStreamEnd(): GrpcBidiStreamAwaitStreamEndActionBuilder;
  awaitStreamEnd(reconcile: (main: Session, forked: Session) => Session): GrpcBidiStreamAwaitStreamEndActionBuilder;
  /**
   * @param f - processes the unmatched messages, aware of the main Session and, optionally, of the stream's forked
   *     Session to reconcile them: `(messages, main) => …` or `(messages, main, forked) => …`
   */
  awaitStreamEndAndProcessUnmatchedMessages(
    f: (messages: GrpcInboundMessage[], main: Session, forked: Session) => Session
  ): GrpcBidiStreamAwaitStreamEndActionBuilder;
  cancel(): ActionBuilder; // FIXME return type
}

export const wrapGrpcBidirectionalStreamingServiceBuilder =
  (
    inputDescriptor: JvmDescriptorsDescriptor
  ): ((
    _underlying: JvmGrpcBidirectionalStreamingServiceBuilder<any, any>
  ) => GrpcBidirectionalStreamingServiceBuilder) =>
  (_underlying) => {
    const toJvmDynamicMessage = wrapToJvmDynamicMessage(inputDescriptor);
    const wrap = wrapGrpcBidirectionalStreamingServiceBuilder(inputDescriptor);
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
        wrap(
          typeof messageResponseTimePolicy === "function"
            ? _underlying.messageResponseTimePolicy(toJvmInitialTimestampFunction(messageResponseTimePolicy))
            : _underlying.messageResponseTimePolicy(toJvmMessageResponseTimePolicy(messageResponseTimePolicy))
        ),
      serverConfiguration: (serverConfigurationName) => wrap(_underlying.serverConfiguration(serverConfigurationName)),
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
      processUnmatchedMessages: (f) =>
        wrapActionBuilder(
          _underlying.processUnmatchedMessages(underlyingJvmXToXWithSessionToSession(f, transformJvmInboundMessages))
        ),
      awaitStreamEnd: (reconcile?: (main: Session, forked: Session) => Session) =>
        wrapGrpcBidiStreamAwaitStreamEndActionBuilder(
          typeof reconcile === "function"
            ? _underlying.awaitStreamEnd(underlyingBiSessionTransform(reconcile))
            : _underlying.awaitStreamEnd()
        ),
      awaitStreamEndAndProcessUnmatchedMessages: (f) =>
        wrapGrpcBidiStreamAwaitStreamEndActionBuilder(
          // always the reconcile-aware variant, so a function without the forked Session simply ignores it
          // a JS function converts to both BiFunction and GrpcProcessMessagesAndReconcile, and GraalJS can't choose: select the overload explicitly
          (_underlying as any)[
            "awaitStreamEndAndProcessUnmatchedMessages(io.gatling.javaapi.grpc.GrpcProcessMessagesAndReconcile)"
          ](underlyingJvmXToXWithBiSessionToSession(f, transformJvmInboundMessages))
        ),
      cancel: () => wrapActionBuilder(_underlying.cancel())
    };
  };
