import { Expression, Session, underlyingSessionTo } from "@gatling.io/core";
import { GrpcDsl as JvmGrpcDsl } from "@gatling.io/jvm-types";

import { GrpcUnaryServiceBuilder, wrapGrpcUnaryServiceBuilder } from "./unary";

export * from "./bidiStream";
export * from "./checks";
export * from "./clientStream";
export * from "./grpc";
export * from "./protocol";
export * from "./serverStream";
export * from "./unary";

import JvmGrpc = io.gatling.javaapi.grpc.Grpc;

import { GrpcBidirectionalStreamingServiceBuilder, wrapGrpcBidirectionalStreamingServiceBuilder } from "./bidiStream";
import { GrpcClientStreamingServiceBuilder, wrapGrpcClientStreamingServiceBuilder } from "./clientStream";
import { GrpcDynamic, JvmGrpcMethodDescriptorWrapper } from "./dynamic";
import { GrpcProtocolBuilder, grpcProtocolBuilder } from "./protocol";
import { GrpcServerStreamingServiceBuilder, wrapGrpcServerStreamingServiceBuilder } from "./serverStream";

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
  unary(fullMethodName: string): GrpcUnaryServiceBuilder;
  serverStream(fullMethodName: string): GrpcServerStreamingServiceBuilder;
  serverStream(fullMethodName: string, streamName: string): GrpcServerStreamingServiceBuilder;
  clientStream(fullMethodName: string): GrpcClientStreamingServiceBuilder;
  clientStream(fullMethodName: string, streamName: string): GrpcClientStreamingServiceBuilder;
  bidiStream(fullMethodName: string): GrpcBidirectionalStreamingServiceBuilder;
  bidiStream(fullMethodName: string, streamName: string): GrpcBidirectionalStreamingServiceBuilder;
}

const methodDescriptorWrapper = (fullMethodName: string): JvmGrpcMethodDescriptorWrapper => {
  const split1 = fullMethodName.split("/");
  if (split1.length !== 2) {
    throw Error(
      `Invalid gRPC method name '${fullMethodName}': method name must use the format 'package.Service/Method', or 'Service/Method' if there is no package defined.`
    );
  }
  const [fullServiceName, methodName] = split1;

  const split2 = fullServiceName.split(".");
  const serviceName = split2.pop() as string;
  const packageName = split2.length > 0 ? split2.join(".") : null;

  return GrpcDynamic.loadMethodDescriptor(packageName, serviceName, methodName);
};

const wrapGrpc = (_underlying: JvmGrpc): Grpc => ({
  unary: (fullMethodName) => {
    const wrapper = methodDescriptorWrapper(fullMethodName);
    return wrapGrpcUnaryServiceBuilder(
      _underlying.unary(wrapper.descriptor()),
      wrapper.newInputBuilder(),
      wrapper.inputDescriptor()
    );
  },
  serverStream: (fullMethodName, streamName?: string) => {
    const wrapper = methodDescriptorWrapper(fullMethodName);
    const wrap = wrapGrpcServerStreamingServiceBuilder(wrapper.newInputBuilder(), wrapper.inputDescriptor());
    return wrap(
      typeof streamName === "undefined"
        ? _underlying.serverStream(wrapper.descriptor())
        : _underlying.serverStream(wrapper.descriptor(), streamName)
    );
  },
  clientStream: (fullMethodName, streamName?: string) => {
    const wrapper = methodDescriptorWrapper(fullMethodName);
    const wrap = wrapGrpcClientStreamingServiceBuilder(wrapper.newInputBuilder(), wrapper.inputDescriptor());
    return wrap(
      typeof streamName === "undefined"
        ? _underlying.clientStream(wrapper.descriptor())
        : _underlying.clientStream(wrapper.descriptor(), streamName)
    );
  },
  bidiStream: (fullMethodName, streamName?: string) => {
    const wrapper = methodDescriptorWrapper(fullMethodName);
    const wrap = wrapGrpcBidirectionalStreamingServiceBuilder(wrapper.newInputBuilder(), wrapper.inputDescriptor());
    return wrap(
      typeof streamName === "undefined"
        ? _underlying.bidiStream(wrapper.descriptor())
        : _underlying.bidiStream(wrapper.descriptor(), streamName)
    );
  }
});

export const grpc: Grpc.Apply & GrpcProtocolBuilder = Object.assign(Grpc.apply, grpcProtocolBuilder);
