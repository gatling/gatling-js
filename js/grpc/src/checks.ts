import {
  CheckBuilderFind,
  CheckBuilderMultipleFind,
  wrapCheckBuilderFind,
  wrapCheckBuilderMultipleFind
} from "@gatling.io/core";
import { GrpcDsl as JvmGrpcDsl } from "@gatling.io/jvm-types";

import { dynamicMessageToX } from "./dynamic";
import { Metadata, Status } from "./grpc";

// FIXME GrpcStatusCodeCheckBuilder implements CheckBuilder.Final BUT
export const statusCode = (): CheckBuilderFind<Status.Code> => wrapCheckBuilderFind(JvmGrpcDsl.statusCode());

export const statusDescription = (): CheckBuilderFind<string> => wrapCheckBuilderFind(JvmGrpcDsl.statusDescription());

// FIXME public static CheckBuilder.Find<Throwable> statusCause() {

export const asciiHeader = (key: string): CheckBuilderMultipleFind<string> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.asciiHeader(key));

// FIXME Uint8Array?
export const binaryHeader = (key: string): CheckBuilderMultipleFind<number[]> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.binaryHeader(key));

// FIXME ???
export const header = <X>(key: Metadata.Key<X>): CheckBuilderMultipleFind<X> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.header(key as any));

export const asciiTrailer = (key: string): CheckBuilderMultipleFind<string> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.asciiTrailer(key));

export const binaryTrailer = (key: string): CheckBuilderMultipleFind<number[]> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.binaryTrailer(key));

// FIXME ???
export const trailer = <X>(key: Metadata.Key<X>): CheckBuilderMultipleFind<X> =>
  wrapCheckBuilderMultipleFind(JvmGrpcDsl.trailer(key as any));

// FIXME ???
export const response = <X, X2>(transform: (x: X) => X2): CheckBuilderFind<X2> =>
  wrapCheckBuilderFind(JvmGrpcDsl.response(dynamicMessageToX(transform)));
