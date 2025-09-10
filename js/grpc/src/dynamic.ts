import { GrpcDynamic as JvmGrpcDynamicStatic } from "@gatling.io/jvm-types";

import JvmGrpcDynamic = io.gatling.javaapi.grpc.GrpcDynamic;

export const grpcDynamic = (JvmGrpcDynamicStatic as any).INSTANCE as JvmGrpcDynamic;

export const dynamicMessageToX =
  <X, X2>(f: (x: X) => X2): ((dynamicMessage: any) => X2) =>
  (dynamicMessage) =>
    f(grpcDynamic.convert(dynamicMessage) as X);
