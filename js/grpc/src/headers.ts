import {
  Expression,
  Session,
  asByteArray,
  asByteArrayFunction,
  asByteArrayMap,
  isSessionTo,
  underlyingSessionTo
} from "@gatling.io/core";

import JvmGrpcHeaders = io.gatling.javaapi.grpc.GrpcHeaders;

export namespace GrpcHeaders {
  import JvmValue = io.gatling.javaapi.grpc.GrpcHeaders$Value;

  export interface Value<B, V> {
    value(value: V): B;
    value(value: (session: Session) => V): B;
    valueEL(value: string): B;
  }

  export const wrapAsciiValue = <B extends GrpcHeaders<B>, J>(
    _underlying: JvmValue<J, string>,
    wrap: (underlying: J) => B
  ): Value<B, string> => ({
    value: (value: Expression<string>) =>
      wrap(isSessionTo(value) ? _underlying.value(underlyingSessionTo(value)) : _underlying.value(value)),
    valueEL: (value) => wrap(_underlying.valueEL(value))
  });

  export const wrapBinaryValue = <B extends GrpcHeaders<B>, J>(
    _underlying: JvmValue<J, number[]>,
    wrap: (underlying: J) => B
  ): Value<B, number[]> => ({
    value: (value: Expression<number[]>) =>
      wrap(
        isSessionTo(value)
          ? _underlying.value(asByteArrayFunction(underlyingSessionTo(value)))
          : _underlying.value(asByteArray(value))
      ),
    valueEL: (value) => wrap(_underlying.valueEL(value))
  });
}

export interface GrpcHeaders<B extends GrpcHeaders<B>> {
  asciiHeader(key: string): GrpcHeaders.Value<B, string>;
  asciiHeaders(map: Record<string, string>): B;
  binaryHeader(key: string): GrpcHeaders.Value<B, number[]>;
  // FIXME Uint8Array?
  binaryHeaders(map: Record<string, number[]>): B;
}

export const wrapGrpcHeaders = <B extends GrpcHeaders<B>, J>(
  _underlying: JvmGrpcHeaders<J, any>,
  wrap: (underlying: J) => B
): GrpcHeaders<B> => ({
  asciiHeader: (key) => GrpcHeaders.wrapAsciiValue(_underlying.asciiHeader(key), wrap),
  asciiHeaders: (map) => wrap(_underlying.asciiHeaders(map)),
  binaryHeader: (key) => GrpcHeaders.wrapBinaryValue(_underlying.binaryHeader(key), wrap),
  // FIXME Uint8Array?
  binaryHeaders: (map) => wrap(_underlying.binaryHeaders(asByteArrayMap(map)))
});
