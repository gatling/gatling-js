import {
  CheckBuilderFind,
  CheckBuilderMultipleFind,
  wrapCheckBuilderFind,
  wrapCheckBuilderMultipleFind
} from "@gatling.io/core";
import { GrpcDsl as JvmGrpcDsl } from "@gatling.io/jvm-types";

import { dynamicMessageToX } from "./dynamic";
import { GrpcDslAddons as JvmGrpcDslAddons, Status } from "./grpc";

export const statusCode = (): CheckBuilderFind<Status.Code> =>
  wrapCheckBuilderFind(JvmGrpcDslAddons.statusCodeString());

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

// FIXME X, X2???
export const response = <X, X2>(transform: (x: X) => X2): CheckBuilderFind<X2> =>
  wrapCheckBuilderFind(JvmGrpcDsl.response(dynamicMessageToX(transform)));
