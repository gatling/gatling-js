import { Expression, Session, underlyingSessionTo } from "@gatling.io/core";
import { GrpcDsl as JvmGrpcDsl, GrpcDynamic as JvmGrpcDynamicStatic } from "@gatling.io/jvm-types";

import { GrpcUnaryServiceBuilder, wrapGrpcUnaryServiceBuilder } from "./unary";

export * from "./unary";
export * from "./checks";
export * from "./protocol";

import JvmGrpc = io.gatling.javaapi.grpc.Grpc;

import { grpcDynamic } from "./dynamic";
import { grpcProtocolBuilder, GrpcProtocolBuilder } from "./protocol";

export namespace Grpc {
  export interface Apply {
    (requestName: string): Grpc;
    (requestName: (session: Session) => string): Grpc;
  }

  export const apply = (requestName: Expression<string>): Grpc => {
    // Handle overloading
    const jvmGrpc =
      typeof requestName === "function"
        ? JvmGrpcDsl.grpc(underlyingSessionTo(requestName))
        : JvmGrpcDsl.grpc(requestName);
    return wrapGrpc(jvmGrpc);
  };
}

// FIXME methodDescriptor: MethodDescriptor<ReqT, RespT> -> methodName: string
export interface Grpc {
  // FIXME methodName: fullMethodName?
  unary(methodName: string): GrpcUnaryServiceBuilder;
  //serverStream(methodName: string): GrpcServerStreamingServiceBuilder;
  //serverStream(methodName: string, streamName: string): GrpcServerStreamingServiceBuilder;
  //clientStream(methodName: string): GrpcClientStreamingServiceBuilder;
  //clientStream(methodName: string, String streamName): GrpcClientStreamingServiceBuilder;
  //bidiStream(methodName: string): GrpcBidirectionalStreamingServiceBuilder;
  //bidiStream(methodName: string, streamName: string): GrpcBidirectionalStreamingServiceBuilder;
}

const wrapGrpc = (_underlying: JvmGrpc): Grpc => ({
  unary: (methodName) => {
    const greetingFile = grpcDynamic.loadBinaryDescriptorResource("greeting.protoc", "greeting.proto");
    // FIXME greeting.GreetingService/Greet
    const method = greetingFile.service("GreetingService").method("Greet");
    return wrapGrpcUnaryServiceBuilder(
      _underlying.unary(method.descriptor()),
      method.newInputBuilder(),
      method.inputDescriptor()
    );
  }
});

export const grpc: Grpc.Apply & GrpcProtocolBuilder = Object.assign(Grpc.apply, grpcProtocolBuilder);
