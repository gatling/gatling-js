import { ActionBuilder, Body, CheckBuilder, Expression, Session } from "@gatling.io/core";
import { underlyingSessionTo, wrapCallback } from "@gatling.io/core";

import { underlyingResponseTransform } from "../index";
import { Response } from "../response";

import JvmHttpRequestActionBuilder = io.gatling.javaapi.http.HttpRequestActionBuilder;

export * from "./body";
export * from "./request";

export interface RequestWithParamsActionBuilder<T> {
  // queryParam
  // multivaluedQueryParam
  // queryParamSeq
  // queryParamMap
  header(name: string, value: string): T;
  header(name: string, value: (session: Session) => string): T;
  // headers
  // ignoreProtocolHeaders
  // basicAuth
  // digestAuth
  // disableUrlEncoding
  // proxy
  // sign
  // signWithOAuth1
}

const requestWithParamsActionBuilderImpl = <T>(
  jvmBuilder: JvmHttpRequestActionBuilder,
  wrap: (_underlying: JvmHttpRequestActionBuilder) => T
): RequestWithParamsActionBuilder<T> => ({
  header: (name: string, value: Expression<string>): T =>
    wrap(
      typeof value === "function"
        ? jvmBuilder.header(name, wrapCallback(underlyingSessionTo(value)))
        : jvmBuilder.header(name, value)
    )
});

export interface RequestWithBodyActionBuilder<T> {
  body(body: Body): T;
  // processRequestBody
  // bodyPart
  // bodyParts
  // asMultipartForm
  // asFormUrlEncoded
  // formParam
  // multivaluedFormParam
  // formParamSeq
  // formParamMap
  // form
  // formUpload
  // asJson
  // asXml
}

const requestWithBodyActionBuilderImpl = <T>(
  jvmBuilder: JvmHttpRequestActionBuilder,
  wrap: (_underlying: JvmHttpRequestActionBuilder) => T
): RequestWithBodyActionBuilder<T> => ({
  body: (body: Body): T => wrap(jvmBuilder.body(body._underlying))
});

export interface RequestActionBuilder<T> {
  check(...checks: CheckBuilder[]): T;
  // checkIf
  // ignoreProtocolChecks
  silent(): T;
  // notSilent
  // disableFollowRedirect
  //transformResponse(f: (response: Response, session: Session) => Response): T;
  // resources
  // requestTimeout
}

const requestActionBuilderImpl = <T>(
  jvmBuilder: JvmHttpRequestActionBuilder,
  wrap: (_underlying: JvmHttpRequestActionBuilder) => T
): RequestActionBuilder<T> => ({
  check: (...checks) => wrap(jvmBuilder.check(checks.map((c) => c._underlying))),
  silent: (): T => wrap(jvmBuilder.silent()),
  //transformResponse: (f: (response: Response, session: Session) => Response): T =>
  //  wrap(jvmBuilder.transformResponse(wrapBiCallback(underlyingResponseTransform(f))))
});

export interface HttpRequestActionBuilder
  extends RequestWithParamsActionBuilder<HttpRequestActionBuilder>,
    RequestWithBodyActionBuilder<HttpRequestActionBuilder>,
    RequestActionBuilder<HttpRequestActionBuilder>,
    ActionBuilder {
  // Assembling all original subtypes
}

export const wrapHttpRequestActionBuilder = (_underlying: JvmHttpRequestActionBuilder): HttpRequestActionBuilder => ({
  _underlying,
  ...requestWithParamsActionBuilderImpl(_underlying, wrapHttpRequestActionBuilder),
  ...requestWithBodyActionBuilderImpl(_underlying, wrapHttpRequestActionBuilder),
  ...requestActionBuilderImpl(_underlying, wrapHttpRequestActionBuilder)
});
