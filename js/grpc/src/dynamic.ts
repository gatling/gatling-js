import { SessionTo, wrapSession } from "@gatling.io/core";

import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmSession = io.gatling.javaapi.core.Session;

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

export const dynamicMessageToX =
  <X, X2>(f: (x: X) => X2): ((dynamicMessage: any) => X2) =>
  (dynamicMessage) =>
    f(GrpcDynamic.convertFromMessage(dynamicMessage) as X);

export const wrapToJvmDynamicMessage =
  (inputDescriptor: JvmDescriptorsDescriptor) =>
  (request: Record<string, any>): any =>
    GrpcDynamic.convertToMessage(request, inputDescriptor);

export const underlyingSessionToJvmDynamicMessage =
  <X>(f: SessionTo<X>, toJvmDynamicMessage: (request: any) => any): ((jvmSession: JvmSession) => any) =>
  (jvmSession: JvmSession) =>
    toJvmDynamicMessage(f(wrapSession(jvmSession)));
