import { Wrapper } from "@gatling.io/core";

import { HttpHeaders, wrapHttpHeaders } from "../headers";
import { ResponseBody, wrapResponseBody } from "./body";
import { fromJvmHttpResponseStatus, HttpResponseStatus } from "./status";

import JvmResponse = io.gatling.http.response.Response;

export * from "./body";
export * from "./status";

export interface Response extends Wrapper<JvmResponse> {
  body(): ResponseBody;
  //checksum(algorithm: any /*io.gatling.core.check.ChecksumAlgorithm*/): any /*scala.Option*/;
  //checksums(): any /*scala.collection.immutable.Map*/;
  //cookies(): any /*scala.collection.immutable.List*/;
  //copy(
  //request: Request,
  //startTimestamp: number,
  //endTimestamp: number,
  ////status: any /*io.netty.handler.codec.http.HttpResponseStatus*/,
  ////headers: HttpHeaders,
  ////body: any /*io.gatling.http.response.ResponseBody*/,
  ////checksums: any /*scala.collection.immutable.Map*/,
  //isHttp2: boolean
  //): Response;
  //endTimestamp(): long;
  //header(name: string): any;
  headers(): HttpHeaders;
  //headers(name: any /*java.lang.CharSequence*/): any /*scala.collection.immutable.Seq*/;
  isHttp2(): boolean;
  isRedirect(): boolean;
  //lastModifiedOrEtag(protocol: any /*io.gatling.http.protocol.HttpProtocol*/): any /*scala.Option*/;
  //request(): io.gatling.http.client.Request;
  //startTimestamp(): long;
  status(): HttpResponseStatus;
}

export const wrapResponse = (_underlying: JvmResponse): Response => ({
  _underlying,
  body: (): ResponseBody => wrapResponseBody(_underlying.body()),
  //copy: (
  //  request: Request = wrapRequest(_underlying.request()),
  //  startTimestamp: number = _underlying.startTimestamp(),
  //  endTimestamp: number = _underlying.endTimestamp(),
  //  //status: any /*io.netty.handler.codec.http.HttpResponseStatus*/,
  //  //headers: HttpHeaders,
  //  //body: any /*io.gatling.http.response.ResponseBody*/,
  //  //checksums: any /*scala.collection.immutable.Map*/,
  //  isHttp2: boolean = _underlying.isHttp2()
  //): Response => wrapResponse(_underlying.copy(
  //  request = request._underlying,
  //  startTimestamp = startTimestamp,
  //  endTimestamp = endTimestamp,
  //  isHttp2
  //)),
  headers: (): HttpHeaders => wrapHttpHeaders(_underlying.headers()),
  isHttp2: (): boolean => _underlying.isHttp2(),
  isRedirect: (): boolean => _underlying.isRedirect(),
  status: (): HttpResponseStatus => fromJvmHttpResponseStatus(_underlying.status())
});
