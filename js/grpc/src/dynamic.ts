import { SessionTo, wrapSession } from "@gatling.io/core";

import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmSession = io.gatling.javaapi.core.Session;
import { GrpcInboundMessage } from "./grpc";

export interface JvmGrpcMethodDescriptorWrapper {
  inputDescriptor(): JvmDescriptorsDescriptor;
  outputDescriptor(): JvmDescriptorsDescriptor;
  descriptor(): any;
}

export interface JvmGrpcDynamicStatic {
  convertFromMessage(message: any): Record<string, any>;
  convertToMessage(input: Record<string, any>, descriptor: JvmDescriptorsDescriptor): any;
  loadMethodDescriptor(pkg: string | null, service: string, method: string): JvmGrpcMethodDescriptorWrapper;
}

export const GrpcDynamic: JvmGrpcDynamicStatic = Java.type("io.gatling.javaapi.grpc.GrpcDynamic");

export interface JvmGrpcInboundMessage {
  timestamp(): number;
  message(): any;
}

export const transformJvmDynamicMessage =
  (f: (x: any) => any): ((dynamicMessage: any) => any) =>
  (dynamicMessage) =>
    f(GrpcDynamic.convertFromMessage(dynamicMessage));

export const transformJvmInboundMessages = (jvmInboundMessages: JvmGrpcInboundMessage[]): GrpcInboundMessage[] =>
  jvmInboundMessages.map((m) => ({ timestamp: m.timestamp(), message: GrpcDynamic.convertFromMessage(m.message()) }));

export const wrapToJvmDynamicMessage =
  (inputDescriptor: JvmDescriptorsDescriptor) =>
  (request: Record<string, any>): any =>
    GrpcDynamic.convertToMessage(request, inputDescriptor);

export const underlyingSessionToJvmDynamicMessage =
  (f: SessionTo<any>, toJvmDynamicMessage: (request: any) => any): ((jvmSession: JvmSession) => any) =>
  (jvmSession: JvmSession) =>
    toJvmDynamicMessage(f(wrapSession(jvmSession)));
