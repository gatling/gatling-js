import {
  ActionBuilder,
  Body,
  CheckBuilder,
  Condition,
  Duration,
  Expression,
  Session,
  SessionTo,
  toJvmDuration,
  underlyingSessionTo,
  wrapCallback,
  wrapCheckBuilder,
  wrapCondition
} from "@gatling.io/core";

import { Proxy, underlyingResponseTransform } from "../index";
import { Response } from "../response";

import JvmHttpRequestActionBuilder = io.gatling.javaapi.http.HttpRequestActionBuilder;

export * from "./body";
export * from "./request";

export interface RequestWithParamsActionBuilder<T> {
  queryParam(name: string, value: string): T;
  queryParam(name: string, value: any): T;
  queryParam(name: string, value: (session: Session) => any): T;
  queryParam(name: (session: Session) => string, value: string): T;
  queryParam(name: (session: Session) => string, value: any): T;
  queryParam(name: (session: Session) => string, value: (session: Session) => any): T;
  multivaluedQueryParam(name: string, values: string): T;
  multivaluedQueryParam(name: string, values: any[]): T;
  multivaluedQueryParam(name: string, values: (session: Session) => any[]): T;
  multivaluedQueryParam(name: (session: Session) => string, values: string): T;
  multivaluedQueryParam(name: (session: Session) => string, values: any[]): T;
  multivaluedQueryParam(name: (session: Session) => string, values: (session: Session) => any[]): T;
  queryParamSeq(seq: string): T;
  queryParamSeq(seq: Array<Record<string, any>>): T;
  queryParamSeq(seq: (session: Session) => Array<Record<string, any>>): T;
  queryParamMap(map: string): T;
  queryParamMap(map: Record<string, any>): T;
  queryParamMap(map: (session: Session) => Record<string, any>): T;
  header(name: string, value: string): T;
  header(name: string, value: (session: Session) => string): T;
  headers(headers: Record<string, string>): T;
  ignoreProtocolHeaders(): T;
  basicAuth(username: string, password: string): T;
  basicAuth(username: string, password: (session: Session) => string): T;
  basicAuth(username: (session: Session) => string, password: string): T;
  basicAuth(username: (session: Session) => string, password: (session: Session) => string): T;
  digestAuth(username: string, password: string): T;
  digestAuth(username: string, password: (session: Session) => string): T;
  digestAuth(username: (session: Session) => string, password: string): T;
  digestAuth(username: (session: Session) => string, password: (session: Session) => string): T;
  disableUrlEncoding(): T;
  proxy(proxy: Proxy): T;
  // sign
  signWithOAuth1(consumerKey: string, clientSharedSecret: string, token: string, tokenSecret: string): T;
  signWithOAuth1(
    consumerKey: (session: Session) => string,
    clientSharedSecret: (session: Session) => string,
    token: (session: Session) => string,
    tokenSecret: (session: Session) => string
  ): T;
}

const requestWithParamsActionBuilderImpl = <T>(
  jvmBuilder: JvmHttpRequestActionBuilder,
  wrap: (_underlying: JvmHttpRequestActionBuilder) => T
): RequestWithParamsActionBuilder<T> => ({
  queryParam: (name: Expression<string>, value: string | Expression<any>): T => {
    if (typeof name === "function") {
      if (typeof value === "function") {
        return wrap(
          jvmBuilder.queryParam(wrapCallback(underlyingSessionTo(name)), wrapCallback(underlyingSessionTo(value)))
        );
      } else if (typeof value === "string") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.queryParam(wrapCallback(underlyingSessionTo(name)), value));
      } else {
        // FIXME it shows the value:func overload?
        return wrap(jvmBuilder.queryParam(wrapCallback(underlyingSessionTo(name)), value));
      }
    } else {
      if (typeof value === "function") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.queryParam(name, wrapCallback(underlyingSessionTo(value))));
      } else if (typeof value === "string") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.queryParam(name, value));
      } else {
        return wrap(jvmBuilder.queryParam(name, value));
      }
    }
  },
  multivaluedQueryParam: (name: Expression<string>, values: string | Expression<any[]>): T => {
    if (typeof name === "function") {
      if (typeof values === "function") {
        return wrap(
          jvmBuilder.multivaluedQueryParam(
            wrapCallback(underlyingSessionTo(name)),
            wrapCallback(underlyingSessionTo(values))
          )
        );
      } else if (typeof values === "string") {
        return wrap(jvmBuilder.multivaluedQueryParam(wrapCallback(underlyingSessionTo(name)), values));
      } else {
        return wrap(jvmBuilder.multivaluedQueryParam(wrapCallback(underlyingSessionTo(name)), values));
      }
    } else {
      if (typeof values === "function") {
        return wrap(jvmBuilder.multivaluedQueryParam(name, wrapCallback(underlyingSessionTo(values))));
      } else if (typeof values === "string") {
        return wrap(jvmBuilder.multivaluedQueryParam(name, values));
      } else {
        return wrap(jvmBuilder.multivaluedQueryParam(name, values));
      }
    }
  },
  queryParamSeq: (seq: string | Expression<Array<Record<string, any>>>): T => {
    if (Array.isArray(seq)) {
      return wrap(jvmBuilder.queryParamSeq(seq));
    } else if (typeof seq === "function") {
      return wrap(jvmBuilder.queryParamSeq(wrapCallback(underlyingSessionTo(seq))));
    } else {
      return wrap(jvmBuilder.queryParamSeq(seq));
    }
  },
  queryParamMap: (map: string | Expression<Record<string, any>>): T => {
    if (typeof map === "function") {
      return wrap(jvmBuilder.queryParamMap(wrapCallback(underlyingSessionTo(map as any))));
    } else if (typeof map === "object") {
      return wrap(jvmBuilder.queryParamMap(map as any));
    } else {
      return wrap(jvmBuilder.queryParamMap(map));
    }
  },
  header: (name: string, value: Expression<string>): T =>
    wrap(
      typeof value === "function"
        ? jvmBuilder.header(name, wrapCallback(underlyingSessionTo(value)))
        : jvmBuilder.header(name, value)
    ),
  headers: (headers: Record<string, string>): T => wrap(jvmBuilder.headers(headers as any)),
  ignoreProtocolHeaders: (): T => wrap(jvmBuilder.ignoreProtocolHeaders()),
  basicAuth: (username: Expression<string>, password: Expression<string>): T =>
    wrap(
      typeof username === "function"
        ? typeof password === "function"
          ? jvmBuilder.basicAuth(
              wrapCallback(underlyingSessionTo(username)),
              wrapCallback(underlyingSessionTo(password))
            )
          : jvmBuilder.basicAuth(wrapCallback(underlyingSessionTo(username)), password)
        : typeof password === "function"
          ? jvmBuilder.basicAuth(username, wrapCallback(underlyingSessionTo(password)))
          : jvmBuilder.basicAuth(username, password)
    ),
  digestAuth: (username: Expression<string>, password: Expression<string>): T =>
    wrap(
      typeof username === "function"
        ? typeof password === "function"
          ? jvmBuilder.digestAuth(
              wrapCallback(underlyingSessionTo(username)),
              wrapCallback(underlyingSessionTo(password))
            )
          : jvmBuilder.digestAuth(wrapCallback(underlyingSessionTo(username)), password)
        : typeof password === "function"
          ? jvmBuilder.digestAuth(username, wrapCallback(underlyingSessionTo(password)))
          : jvmBuilder.digestAuth(username, password)
    ),
  disableUrlEncoding: (): T => wrap(jvmBuilder.disableUrlEncoding()),
  proxy: (proxy: Proxy): T => wrap(jvmBuilder.proxy(proxy._underlying)),
  signWithOAuth1: (
    consumerKey: Expression<string>,
    clientSharedSecret: Expression<string>,
    token: Expression<string>,
    tokenSecret: Expression<string>
  ): T =>
    wrap(
      typeof consumerKey === "function" &&
        typeof clientSharedSecret === "function" &&
        typeof token === "function" &&
        typeof tokenSecret === "function"
        ? jvmBuilder.signWithOAuth1(
            wrapCallback(underlyingSessionTo(consumerKey)),
            wrapCallback(underlyingSessionTo(clientSharedSecret)),
            wrapCallback(underlyingSessionTo(token)),
            wrapCallback(underlyingSessionTo(tokenSecret))
          )
        : jvmBuilder.signWithOAuth1(
            consumerKey as string,
            clientSharedSecret as string,
            token as string,
            tokenSecret as string
          )
    )
});

export interface RequestWithBodyActionBuilder<T> {
  body(body: Body): T;
  // processRequestBody
  // bodyPart
  // bodyParts
  asMultipartForm(): T;
  asFormUrlEncoded(): T;
  formParam(name: string, value: string): T;
  formParam(name: string, value: any): T;
  formParam(name: string, value: (session: Session) => any): T;
  formParam(name: (session: Session) => string, value: string): T;
  formParam(name: (session: Session) => string, value: any): T;
  formParam(name: (session: Session) => string, value: (session: Session) => any): T;
  multivaluedFormParam(name: string, value: string): T;
  multivaluedFormParam(name: string, values: any[]): T;
  multivaluedFormParam(name: string, value: (session: Session) => any[]): T;
  // FIXME multivaluedFormParam(name: (session: Session) => string, value: string): T;
  multivaluedFormParam(name: (session: Session) => string, value: any[]): T;
  multivaluedFormParam(name: (session: Session) => string, value: (session: Session) => any[]): T;
  formParamSeq(seq: Array<Record<string, any>>): T;
  formParamSeq(seq: (session: Session) => Array<Record<string, any>>): T;
  formParamMap(map: Record<string, any>): T;
  formParamMap(map: (session: Session) => Record<string, any>): T;
  form(form: string): T;
  form(map: (session: Session) => Record<string, any>): T;
  formUpload(name: string, filePath: string): T;
  formUpload(name: (session: Session) => string, filePath: string): T;
  formUpload(name: string, filePath: (session: Session) => string): T;
  formUpload(name: (session: Session) => string, filePath: (session: Session) => string): T;
  asJson(): T;
  asXml(): T;
}

const requestWithBodyActionBuilderImpl = <T>(
  jvmBuilder: JvmHttpRequestActionBuilder,
  wrap: (_underlying: JvmHttpRequestActionBuilder) => T
): RequestWithBodyActionBuilder<T> => ({
  body: (body: Body): T => wrap(jvmBuilder.body(body._underlying)),
  asMultipartForm: (): T => wrap(jvmBuilder.asMultipartForm()),
  asFormUrlEncoded: (): T => wrap(jvmBuilder.asFormUrlEncoded()),
  formParam: (name: Expression<string>, value: string | Expression<any>): T => {
    if (typeof name === "function") {
      if (typeof value === "function") {
        return wrap(
          jvmBuilder.formParam(wrapCallback(underlyingSessionTo(name)), wrapCallback(underlyingSessionTo(value)))
        );
      } else if (typeof value === "string") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.formParam(wrapCallback(underlyingSessionTo(name)), value));
      } else {
        // FIXME it shows the value:func overload?
        return wrap(jvmBuilder.formParam(wrapCallback(underlyingSessionTo(name)), value));
      }
    } else {
      if (typeof value === "function") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.formParam(name, wrapCallback(underlyingSessionTo(value))));
      } else if (typeof value === "string") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.formParam(name, value));
      } else {
        return wrap(jvmBuilder.formParam(name, value));
      }
    }
  },
  multivaluedFormParam: (name: Expression<string>, values: string | Expression<any[]>): T => {
    if (typeof name === "function") {
      if (typeof values === "function") {
        return wrap(
          jvmBuilder.multivaluedFormParam(
            wrapCallback(underlyingSessionTo(name)),
            wrapCallback(underlyingSessionTo(values))
          )
        );
      } else if (typeof values === "string") {
        throw Error(`multivaluedFormParam() called with invalid arguments ${name}, ${values}`);
      } else {
        return wrap(jvmBuilder.multivaluedFormParam(wrapCallback(underlyingSessionTo(name)), values));
      }
    } else {
      if (typeof values === "function") {
        return wrap(jvmBuilder.multivaluedFormParam(name, wrapCallback(underlyingSessionTo(values))));
      } else if (typeof values === "string") {
        return wrap(jvmBuilder.multivaluedFormParam(name, values));
      } else {
        return wrap(jvmBuilder.multivaluedFormParam(name, values));
      }
    }
  },
  formParamSeq: (seq: Expression<Array<Record<string, any>>>): T =>
    wrap(
      typeof seq === "function"
        ? jvmBuilder.formParamSeq(wrapCallback(underlyingSessionTo(seq)))
        : jvmBuilder.formParamSeq(seq)
    ),
  formParamMap: (map: Expression<Record<string, any>>): T =>
    wrap(
      typeof map === "function"
        ? jvmBuilder.formParamMap(wrapCallback(underlyingSessionTo(map as any)))
        : jvmBuilder.formParamMap(map as any)
    ),
  form: (form: string | ((session: Session) => Record<string, any>)): T =>
    wrap(
      typeof form === "function"
        ? jvmBuilder.form(wrapCallback(underlyingSessionTo(form as any)))
        : jvmBuilder.form(form)
    ),
  formUpload: (name: Expression<string>, filePath: Expression<string>): T =>
    wrap(
      typeof name === "function"
        ? typeof filePath === "function"
          ? jvmBuilder.formUpload(wrapCallback(underlyingSessionTo(name)), wrapCallback(underlyingSessionTo(filePath)))
          : jvmBuilder.formUpload(wrapCallback(underlyingSessionTo(name)), filePath)
        : typeof filePath === "function"
          ? jvmBuilder.formUpload(name, wrapCallback(underlyingSessionTo(filePath)))
          : jvmBuilder.formUpload(name, filePath)
    ),
  asJson: (): T => wrap(jvmBuilder.asJson()),
  asXml: (): T => wrap(jvmBuilder.asXml())
});

export interface RequestActionBuilder<T> {
  check(...checks: CheckBuilder[]): T;
  checkIf(condition: string): Condition<T>;
  checkIf(condition: (session: Session) => boolean): Condition<T>;
  // checkIf response
  ignoreProtocolChecks(): T;
  silent(): T;
  notSilent(): T;
  disableFollowRedirect(): T;
  //transformResponse(f: (response: Response, session: Session) => Response): T;
  resources(...res: HttpRequestActionBuilder[]): T;
  requestTimeout(timeout: Duration): T;
}

const requestActionBuilderImpl = <T>(
  jvmBuilder: JvmHttpRequestActionBuilder,
  wrap: (_underlying: JvmHttpRequestActionBuilder) => T
): RequestActionBuilder<T> => ({
  check: (...checks: CheckBuilder[]): T => wrap(jvmBuilder.check(checks.map((c: CheckBuilder) => c._underlying))),
  checkIf: (condition: string | SessionTo<boolean>): Condition<T> =>
    wrapCondition(
      typeof condition === "string"
        ? jvmBuilder.checkIf(condition)
        : jvmBuilder.checkIf(wrapCallback(underlyingSessionTo(condition))),
      wrap
    ),
  ignoreProtocolChecks: (): T => wrap(jvmBuilder.ignoreProtocolChecks()),
  silent: (): T => wrap(jvmBuilder.silent()),
  notSilent: (): T => wrap(jvmBuilder.notSilent()),
  disableFollowRedirect: (): T => wrap(jvmBuilder.disableFollowRedirect()),
  //transformResponse: (f: (response: Response, session: Session) => Response): T =>
  //  wrap(jvmBuilder.transformResponse(wrapBiCallback(underlyingResponseTransform(f))))
  resources: (...res: HttpRequestActionBuilder[]): T =>
    wrap(jvmBuilder.resources(res.map((r) => r._underlying as JvmHttpRequestActionBuilder))),
  requestTimeout: (duration: Duration): T => wrap(jvmBuilder.requestTimeout(toJvmDuration(duration)))
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
