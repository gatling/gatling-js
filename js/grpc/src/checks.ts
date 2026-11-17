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

/**
 * Bootstrap a check that captures the cause of the gRPC status, if any.
 *
 * The cause is a JVM `java.lang.Throwable`, typically used with `exists()`/`notExists()`, or transformed, for
 * example with `transform((cause) => cause.getMessage())`.
 *
 * @returns the next step in the check DSL
 */
export const statusCause = (): CheckBuilderFind<any> => wrapCheckBuilderFind(JvmGrpcDsl.statusCause());

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
