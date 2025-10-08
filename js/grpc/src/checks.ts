import {
  CheckBuilderFind,
  CheckBuilderMultipleFind,
  wrapCheckBuilderFind,
  wrapCheckBuilderMultipleFind
} from "@gatling.io/core";
import { GrpcDsl as JvmGrpcDsl } from "@gatling.io/jvm-types";

import { transformJvmDynamicMessage } from "./dynamic";
import { GrpcDslAddons as JvmGrpcDslAddons, Status } from "./grpc";

export const statusCode = (): CheckBuilderFind<Status.Code> =>
  wrapCheckBuilderFind(JvmGrpcDslAddons.statusCodeAsString());

export const statusDescription = (): CheckBuilderFind<string> => wrapCheckBuilderFind(JvmGrpcDsl.statusDescription());

export const asciiHeader = (key: string): CheckBuilderMultipleFind<string> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.asciiHeader(key));

// FIXME Uint8Array?
export const binaryHeader = (key: string): CheckBuilderMultipleFind<number[]> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.binaryHeader(key));

export const asciiTrailer = (key: string): CheckBuilderMultipleFind<string> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.asciiTrailer(key));

export const binaryTrailer = (key: string): CheckBuilderMultipleFind<number[]> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.binaryTrailer(key));

export const response = (transform: (x: any) => any): CheckBuilderFind<any> =>
  wrapCheckBuilderFind(JvmGrpcDsl.response(transformJvmDynamicMessage(transform)));
