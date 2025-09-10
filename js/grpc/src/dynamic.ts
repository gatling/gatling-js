import { SessionTo, wrapSession } from "@gatling.io/core";

import JvmDynamicMessageBuilder = com.google.protobuf.DynamicMessage$Builder;
import JvmDescriptorsDescriptor = com.google.protobuf.Descriptors$Descriptor;
import JvmSession = io.gatling.javaapi.core.Session;

export interface JvmGrpcMethodDescriptorWrapper {
  inputDescriptor(): JvmDescriptorsDescriptor;
  outputDescriptor(): JvmDescriptorsDescriptor;
  descriptor(): any;
  newInputBuilder(): JvmDynamicMessageBuilder;
}

export interface JvmGrpcDynamicStatic {
  convert(message: any): Record<string, any>;
  loadMethodDescriptor(pkg: string | null, service: string, method: string): JvmGrpcMethodDescriptorWrapper;
}

export const GrpcDynamic: JvmGrpcDynamicStatic = Java.type("io.gatling.javaapi.grpc.GrpcDynamic");

export const dynamicMessageToX =
  <X, X2>(f: (x: X) => X2): ((dynamicMessage: any) => X2) =>
  (dynamicMessage) =>
    f(GrpcDynamic.convert(dynamicMessage) as X);

export const wrapToJvmDynamicMessage =
  (builder: JvmDynamicMessageBuilder, inputDescriptor: JvmDescriptorsDescriptor): ((request: any) => any) =>
  (request) => {
    //builder.setField(inputDescriptor.findFieldByName("number"), request.number);
    //builder.setField(inputDescriptor.findFieldByName("first_number"), request.firstNumber);
    //builder.setField(inputDescriptor.findFieldByName("second_number"), request.secondNumber);
    const fieldDescriptor = inputDescriptor.findFieldByName("greeting");
    builder
      .getFieldBuilder(fieldDescriptor)
      .setField(fieldDescriptor.getMessageType().findFieldByName("first_name"), request.greeting.firstName)
      .setField(fieldDescriptor.getMessageType().findFieldByName("last_name"), request.greeting.lastName);
    return builder.build();
  };

export const underlyingSessionToJvmDynamicMessage =
  <X>(f: SessionTo<X>, toJvmDynamicMessage: (request: any) => any): ((jvmSession: JvmSession) => any) =>
  (jvmSession: JvmSession) =>
    toJvmDynamicMessage(f(wrapSession(jvmSession)));
