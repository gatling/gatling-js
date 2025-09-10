import { Expression, Session, SessionTo, asJava, underlyingSessionTo } from "@gatling.io/core";

import { Metadata } from "./grpc";

import JvmGrpcHeaders = io.gatling.javaapi.grpc.GrpcHeaders;

export namespace GrpcHeaders {
  // FIXME has generics?!
  import JvmValue = io.gatling.javaapi.grpc.GrpcHeaders$Value;

  export interface Value<B, V> {
    value(value: V): B;
    value(value: (session: Session) => V): B;
    valueEl(value: string): B;
  }

  // FIXME generics?
  export const wrapValue = <B extends GrpcHeaders<B>, J, V>(
    _underlying: JvmValue<J, V>,
    wrap: (underlying: J) => B
  ): Value<B, V> => ({
    value: (value: Expression<V>): B =>
      wrap(
        typeof value === "function"
          ? _underlying.value(underlyingSessionTo(value as SessionTo<V>)) // FIXME cast???
          : _underlying.value(value)
      ),
    valueEl: (value: string): B => wrap(_underlying.valueEl(value))
  });
}

export interface GrpcHeaders<B extends GrpcHeaders<B>> {
  asciiHeader(key: string): GrpcHeaders.Value<B, string>;
  asciiHeaders(record: Record<string, string>): B;
  binaryHeader(key: string): GrpcHeaders.Value<B, number[]>;
  // FIXME Uint8Array?
  binaryHeaders(record: Record<string, number[]>): B;
  header<T>(key: Metadata.Key<T>): GrpcHeaders.Value<B, T>;
}

export const wrapGrpcHeaders = <B extends GrpcHeaders<B>, J>(
  _underlying: JvmGrpcHeaders<J, any>,
  wrap: (underlying: J) => B
): GrpcHeaders<B> => ({
  asciiHeader: (key) => GrpcHeaders.wrapValue(_underlying.asciiHeader(key), wrap),
  asciiHeaders: (record) => wrap(_underlying.asciiHeaders(asJava(record) as any)),
  binaryHeader: (key) => GrpcHeaders.wrapValue(_underlying.binaryHeader(key), wrap),
  // FIXME Uint8Array?
  binaryHeaders: (record) => wrap(_underlying.binaryHeaders(asJava(record) as any)),
  // FIXME wrap metadata?
  header: (key) => GrpcHeaders.wrapValue(_underlying.header(key as any), wrap)
});
