import {
  ActionBuilder,
  Body,
  CheckBuilder,
  Condition,
  Duration,
  Expression,
  Session,
  SessionTo,
  asJava,
  toJvmDuration,
  underlyingSessionTo,
  underlyingSessionToJava,
  wrapCondition
} from "@gatling.io/core";

import { BodyPart } from "../bodyPart";
import { Proxy } from "../proxy";

import JvmHttpRequestActionBuilder = io.gatling.javaapi.http.HttpRequestActionBuilder;

export * from "./body";
export * from "./request";

export interface RequestWithParamsActionBuilder<T> {
  /**
   * Set some query parameter
   *
   * @param name - the name of the parameter, expressed as a Gatling Expression Language String
   * @param value - the value of the parameter, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  queryParam(name: string, value: string): T;

  /**
   * Set some query parameter
   *
   * @param name - the name of the parameter, expressed as a Gatling Expression Language String
   * @param value - the static value of the parameter
   * @returns a new DSL instance
   */
  queryParam(name: string, value: any): T;

  /**
   * Set some query parameter
   *
   * @param name - the name of the parameter, expressed as a Gatling Expression Language String
   * @param value - the value of the parameter, expressed as a function
   * @returns a new DSL instance
   */
  queryParam(name: string, value: (session: Session) => any): T;

  /**
   * Set some query parameter
   *
   * @param name - the name of the parameter, expressed as a function
   * @param value - the value of the parameter, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  queryParam(name: (session: Session) => string, value: string): T;

  /**
   * Set some query parameter
   *
   * @param name - the name of the parameter, expressed as a function
   * @param value - the static value of the parameter
   * @returns a new DSL instance
   */
  queryParam(name: (session: Session) => string, value: any): T;

  /**
   * Set some query parameter
   *
   * @param name - the name of the parameter, expressed as a function
   * @param value - the value of the parameter, expressed as a function
   * @returns a new DSL instance
   */
  queryParam(name: (session: Session) => string, value: (session: Session) => any): T;

  /**
   * Set a multivalued query parameter
   *
   * @param name - the name of the parameter, expressed as a Gatling Expression Language String
   * @param values - the list of values of the parameter, expressed as a Gatling Expression Language
   *     String
   * @returns a new DSL instance
   */
  multivaluedQueryParam(name: string, values: string): T;

  /**
   * Set a multivalued query parameter
   *
   * @param name - the name of the parameter, expressed as a Gatling Expression Language String
   * @param values - the static list of values of the parameter
   * @returns a new DSL instance
   */
  multivaluedQueryParam(name: string, values: any[]): T;

  /**
   * Set a multivalued query parameter
   *
   * @param name - the name of the parameter, expressed as a Gatling Expression Language String
   * @param values - the list of values of the parameter, expressed as a function
   * @returns a new DSL instance
   */
  multivaluedQueryParam(name: string, values: (session: Session) => any[]): T;

  /**
   * Set a multivalued query parameter
   *
   * @param name - the name of the parameter, expressed as a function
   * @param values - the list of values of the parameter, expressed as a Gatling Expression Language
   *     String
   * @returns a new DSL instance
   */
  multivaluedQueryParam(name: (session: Session) => string, values: string): T;

  /**
   * Set a multivalued query parameter
   *
   * @param name - the name of the parameter, expressed as a function
   * @param values - the static list of values of the parameter
   * @returns a new DSL instance
   */
  multivaluedQueryParam(name: (session: Session) => string, values: any[]): T;

  /**
   * Set a multivalued query parameter
   *
   * @param name - the name of the parameter, expressed as a function
   * @param values - the list of values of the parameter, expressed as a function
   * @returns a new DSL instance
   */
  multivaluedQueryParam(name: (session: Session) => string, values: (session: Session) => any[]): T;

  /**
   * Set multiple query params
   *
   * @param map - a static Map of query params
   * @returns a new DSL instance
   */
  queryParamMap(map: string): T;

  /**
   * Set multiple query params
   *
   * @param map - a Map of query params, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  queryParamMap(map: Record<string, any>): T;

  /**
   * Set multiple query params
   *
   * @param map - a Map of query params, expressed as a function
   * @returns a new DSL instance
   */
  queryParamMap(map: (session: Session) => Record<string, any>): T;

  /**
   * Set a header
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  header(name: string, value: string): T;

  /**
   * Set a header
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a function
   * @returns a new DSL instance
   */
  header(name: string, value: (session: Session) => string): T;

  /**
   * Set multiple headers
   *
   * @param headers - the headers, names are static but values are expressed as a Gatling Expression
   *     Language String
   * @returns a new DSL instance
   */
  headers(headers: Record<string, string>): T;

  /**
   * Ignore common headers set in the Http protocol configuration
   *
   * @returns a new DSL instance
   */
  ignoreProtocolHeaders(): T;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  basicAuth(username: string, password: string): T;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a function
   * @returns a new DSL instance
   */
  basicAuth(username: string, password: (session: Session) => string): T;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  basicAuth(username: (session: Session) => string, password: string): T;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a function
   * @returns a new DSL instance
   */
  basicAuth(username: (session: Session) => string, password: (session: Session) => string): T;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  digestAuth(username: string, password: string): T;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a function
   * @returns a new DSL instance
   */
  digestAuth(username: string, password: (session: Session) => string): T;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  digestAuth(username: (session: Session) => string, password: string): T;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a function
   * @returns a new DSL instance
   */
  digestAuth(username: (session: Session) => string, password: (session: Session) => string): T;

  /**
   * Disable the automatic url encoding that tries to detect unescaped reserved chars
   *
   * @returns a new DSL instance
   */
  disableUrlEncoding(): T;

  /**
   * Define a Proxy to be used for this request
   *
   * @param proxy - the proxy
   * @returns a new DSL instance
   */
  proxy(proxy: Proxy): T;

  // TODO sign

  /**
   * Instruct sign the request with OAuth1 before writing it on the wire
   *
   * @param consumerKey - the consumerKey, expressed as a Gatling Expression Language String
   * @param clientSharedSecret - the clientSharedSecret, expressed as a Gatling Expression Language
   *     String
   * @param token - the token, expressed as a Gatling Expression Language String
   * @param tokenSecret - the tokenSecret, expressed as a Gatling Expression Language String
   * @returns a new DSL instance
   */
  signWithOAuth1(consumerKey: string, clientSharedSecret: string, token: string, tokenSecret: string): T;

  /**
   * Instruct sign the request with OAuth1 before writing it on the wire
   *
   * @param consumerKey - the consumerKey, expressed as a function
   * @param clientSharedSecret - the clientSharedSecret, expressed as a function
   * @param token - the token, expressed as a function
   * @param tokenSecret - the tokenSecret, expressed as a function
   * @returns a new DSL instance
   */
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
        return wrap(jvmBuilder.queryParam(underlyingSessionTo(name), underlyingSessionTo(value)));
      } else if (typeof value === "string") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.queryParam(underlyingSessionTo(name), value));
      } else {
        // FIXME it shows the value:func overload?
        return wrap(jvmBuilder.queryParam(underlyingSessionTo(name), value));
      }
    } else {
      if (typeof value === "function") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.queryParam(name, underlyingSessionTo(value)));
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
          jvmBuilder.multivaluedQueryParam(underlyingSessionTo(name), underlyingSessionToJava(values) as any)
        );
      } else if (typeof values === "string") {
        return wrap(jvmBuilder.multivaluedQueryParam(underlyingSessionTo(name), values));
      } else {
        return wrap(jvmBuilder.multivaluedQueryParam(underlyingSessionTo(name), values));
      }
    } else {
      if (typeof values === "function") {
        return wrap(jvmBuilder.multivaluedQueryParam(name, underlyingSessionToJava(values) as any));
      } else if (typeof values === "string") {
        return wrap(jvmBuilder.multivaluedQueryParam(name, values));
      } else {
        return wrap(jvmBuilder.multivaluedQueryParam(name, values));
      }
    }
  },
  queryParamMap: (map: string | Expression<Record<string, any>>): T => {
    if (typeof map === "function") {
      return wrap(jvmBuilder.queryParamMap(underlyingSessionToJava(map as SessionTo<Record<string, any>>)));
    } else if (typeof map === "object") {
      return wrap(jvmBuilder.queryParamMap(map));
    } else {
      return wrap(jvmBuilder.queryParamMap(map));
    }
  },
  header: (name: string, value: Expression<string>): T =>
    wrap(
      typeof value === "function" ? jvmBuilder.header(name, underlyingSessionTo(value)) : jvmBuilder.header(name, value)
    ),
  headers: (headers: Record<string, string>): T => wrap(jvmBuilder.headers(asJava(headers) as any)),
  ignoreProtocolHeaders: (): T => wrap(jvmBuilder.ignoreProtocolHeaders()),
  basicAuth: (username: Expression<string>, password: Expression<string>): T =>
    wrap(
      typeof username === "function"
        ? typeof password === "function"
          ? jvmBuilder.basicAuth(underlyingSessionTo(username), underlyingSessionTo(password))
          : jvmBuilder.basicAuth(underlyingSessionTo(username), password)
        : typeof password === "function"
          ? jvmBuilder.basicAuth(username, underlyingSessionTo(password))
          : jvmBuilder.basicAuth(username, password)
    ),
  digestAuth: (username: Expression<string>, password: Expression<string>): T =>
    wrap(
      typeof username === "function"
        ? typeof password === "function"
          ? jvmBuilder.digestAuth(underlyingSessionTo(username), underlyingSessionTo(password))
          : jvmBuilder.digestAuth(underlyingSessionTo(username), password)
        : typeof password === "function"
          ? jvmBuilder.digestAuth(username, underlyingSessionTo(password))
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
            underlyingSessionTo(consumerKey),
            underlyingSessionTo(clientSharedSecret),
            underlyingSessionTo(token),
            underlyingSessionTo(tokenSecret)
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
  /**
   * Define a request body
   *
   * @param body - the request body
   * @returns a new HttpRequestActionBuilder instance
   */
  body(body: Body): T;

  // TODO processRequestBody

  /**
   * Set a multipart body part
   *
   * @param part - the part
   * @returns a new HttpRequestActionBuilder instance
   */
  bodyPart(part: BodyPart): T;

  /**
   * Set multiple multipart body parts
   *
   * @param parts - the parts
   * @returns a new HttpRequestActionBuilder instance
   */
  bodyParts(...parts: BodyPart[]): T;

  /**
   * Set the content-type header for multipart body.
   *
   * @returns a new HttpRequestActionBuilder instance
   */
  asMultipartForm(): T;

  /**
   * Set the content-type header for form-urlencoding body.
   *
   * @returns a new HttpRequestActionBuilder instance
   */
  asFormUrlEncoded(): T;

  /**
   * Set an HTML form parameter
   *
   * @param key - the parameter key, expressed as a Gatling Expression Language String
   * @param value - the parameter value, expressed as a Gatling Expression Language String
   * @returns a new HttpRequestActionBuilder instance
   */
  formParam(key: string, value: string): T;

  /**
   * Set an HTML form parameter
   *
   * @param key - the parameter key, expressed as a Gatling Expression Language String
   * @param value - the parameter static value
   * @returns a new HttpRequestActionBuilder instance
   */
  formParam(key: string, value: any): T;

  /**
   * Set an HTML form parameter
   *
   * @param key - the parameter key, expressed as a Gatling Expression Language String
   * @param value - the parameter value, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  formParam(key: string, value: (session: Session) => any): T;

  /**
   * Set an HTML form parameter
   *
   * @param key - the parameter key, expressed as a function
   * @param value - the parameter value, expressed as a Gatling Expression Language String
   * @returns a new HttpRequestActionBuilder instance
   */
  formParam(key: (session: Session) => string, value: string): T;

  /**
   * Set an HTML form parameter
   *
   * @param key - the parameter key, expressed as a function
   * @param value - the parameter static value
   * @returns a new HttpRequestActionBuilder instance
   */
  formParam(key: (session: Session) => string, value: any): T;

  /**
   * Set an HTML form parameter
   *
   * @param key - the parameter key, expressed as a function
   * @param value - the parameter value, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  formParam(key: (session: Session) => string, value: (session: Session) => any): T;

  /**
   * Set an HTML form multivalued parameter
   *
   * @param key - the parameter key, expressed as a Gatling Expression Language String
   * @param values - the parameter values, as a Gatling EL string
   * @returns a new HttpRequestActionBuilder instance
   */
  multivaluedFormParam(key: string, values: string): T;

  /**
   * Set an HTML form multivalued parameter
   *
   * @param key - the parameter key, expressed as a Gatling Expression Language String
   * @param values - the static parameter values
   * @returns a new HttpRequestActionBuilder instance
   */
  multivaluedFormParam(key: string, values: any[]): T;

  /**
   * Set an HTML form multivalued parameter
   *
   * @param key - the parameter key, expressed as a Gatling Expression Language String
   * @param values - the parameter values, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  multivaluedFormParam(key: string, values: (session: Session) => any[]): T;

  // FIXME missing overload multivaluedFormParam(name: (session: Session) => string, value: string): T;

  /**
   * Set an HTML form multivalued parameter
   *
   * @param key - the parameter key, expressed as a function
   * @param values - the static parameter values
   * @returns a new HttpRequestActionBuilder instance
   */
  multivaluedFormParam(key: (session: Session) => string, values: any[]): T;

  /**
   * Set an HTML form multivalued parameter
   *
   * @param key - the parameter key, expressed as a function
   * @param values - the parameter values, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  multivaluedFormParam(key: (session: Session) => string, values: (session: Session) => any[]): T;

  /**
   * Set multiple form parameters
   *
   * @param map - the static parameters
   * @returns a new HttpRequestActionBuilder instance
   */
  formParamMap(map: Record<string, any>): T;

  /**
   * Set multiple form parameters
   *
   * @param map - the parameters, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  formParamMap(map: (session: Session) => Record<string, any>): T;

  /**
   * Set a form, typically captured from a form check
   *
   * @param form - the form inputs, expressed as a Gatling Expression Language String
   * @returns a new HttpRequestActionBuilder instance
   */
  form(form: string): T;

  /**
   * Set a form, typically captured from a form check
   *
   * @param map - the form inputs, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  form(map: (session: Session) => Record<string, any>): T;

  /**
   * Set a form file upload
   *
   * @param name - the name of the file part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns a new HttpRequestActionBuilder instance
   */
  formUpload(name: string, filePath: string): T;

  /**
   * Set a form file upload
   *
   * @param name - the name of the file part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns a new HttpRequestActionBuilder instance
   */
  formUpload(name: (session: Session) => string, filePath: string): T;

  /**
   * Set a form file upload
   *
   * @param name - the name of the file part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  formUpload(name: string, filePath: (session: Session) => string): T;

  /**
   * Set a form file upload
   *
   * @param name - the name of the file part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns a new HttpRequestActionBuilder instance
   */
  formUpload(name: (session: Session) => string, filePath: (session: Session) => string): T;

  /**
   * Set the content-type header for JSON
   *
   * @returns a new DSL instance
   */
  asJson(): T;

  /**
   * Set the content-type header for XML
   *
   * @returns a new DSL instance
   */
  asXml(): T;
}

const requestWithBodyActionBuilderImpl = <T>(
  jvmBuilder: JvmHttpRequestActionBuilder,
  wrap: (_underlying: JvmHttpRequestActionBuilder) => T
): RequestWithBodyActionBuilder<T> => ({
  body: (body: Body): T => wrap(jvmBuilder.body(body._underlying)),
  bodyPart: (part: BodyPart): T => wrap(jvmBuilder.bodyPart(part._underlying)),
  bodyParts: (...parts: BodyPart[]): T => wrap(jvmBuilder.bodyParts(parts.map((part) => part._underlying))),
  asMultipartForm: (): T => wrap(jvmBuilder.asMultipartForm()),
  asFormUrlEncoded: (): T => wrap(jvmBuilder.asFormUrlEncoded()),
  formParam: (key: Expression<string>, value: string | Expression<any>): T => {
    if (typeof key === "function") {
      if (typeof value === "function") {
        return wrap(jvmBuilder.formParam(underlyingSessionTo(key), underlyingSessionTo(value)));
      } else if (typeof value === "string") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.formParam(underlyingSessionTo(key), value));
      } else {
        // FIXME it shows the value:func overload?
        return wrap(jvmBuilder.formParam(underlyingSessionTo(key), value));
      }
    } else {
      if (typeof value === "function") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.formParam(key, underlyingSessionTo(value)));
      } else if (typeof value === "string") {
        // FIXME it shows the value:any overload?
        return wrap(jvmBuilder.formParam(key, value));
      } else {
        return wrap(jvmBuilder.formParam(key, value));
      }
    }
  },
  multivaluedFormParam: (key: Expression<string>, values: string | Expression<any[]>): T => {
    if (typeof key === "function") {
      if (typeof values === "function") {
        return wrap(jvmBuilder.multivaluedFormParam(underlyingSessionTo(key), underlyingSessionToJava(values) as any));
      } else if (typeof values === "string") {
        throw Error(`multivaluedFormParam() called with invalid arguments ${key}, ${values}`);
      } else {
        return wrap(jvmBuilder.multivaluedFormParam(underlyingSessionTo(key), values));
      }
    } else {
      if (typeof values === "function") {
        return wrap(jvmBuilder.multivaluedFormParam(key, underlyingSessionToJava(values) as any));
      } else if (typeof values === "string") {
        return wrap(jvmBuilder.multivaluedFormParam(key, values));
      } else {
        return wrap(jvmBuilder.multivaluedFormParam(key, values));
      }
    }
  },
  formParamMap: (map: Expression<Record<string, any>>): T =>
    wrap(
      typeof map === "function"
        ? (jvmBuilder as any)["formParamMap(java.util.function.Function)"](underlyingSessionToJava(map as any))
        : jvmBuilder.formParamMap(map)
    ),
  form: (form: string | ((session: Session) => Record<string, any>)): T =>
    wrap(typeof form === "function" ? jvmBuilder.form(underlyingSessionToJava(form) as any) : jvmBuilder.form(form)),
  formUpload: (name: Expression<string>, filePath: Expression<string>): T =>
    wrap(
      typeof name === "function"
        ? typeof filePath === "function"
          ? jvmBuilder.formUpload(underlyingSessionTo(name), underlyingSessionTo(filePath))
          : jvmBuilder.formUpload(underlyingSessionTo(name), filePath)
        : typeof filePath === "function"
          ? jvmBuilder.formUpload(name, underlyingSessionTo(filePath))
          : jvmBuilder.formUpload(name, filePath)
    ),
  asJson: (): T => wrap(jvmBuilder.asJson()),
  asXml: (): T => wrap(jvmBuilder.asXml())
});

export interface RequestActionBuilder<T> {
  /**
   * Apply some checks
   *
   * @param checks - the checks
   * @returns a new HttpRequestActionBuilder instance
   */
  check(...checks: CheckBuilder[]): T;

  /**
   * Apply some checks if some condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @returns the next DSL step
   */
  checkIf(condition: string): Condition<T>;

  /**
   * Apply some checks if some condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @returns the next DSL step
   */
  checkIf(condition: (session: Session) => boolean): Condition<T>;

  // TODO checkIf response

  /**
   * Have this request ignore the common checks defined on the HTTP protocol configuration
   *
   * @returns a new HttpRequestActionBuilder instance
   */
  ignoreProtocolChecks(): T;

  /**
   * Have this request ignore the common checks defined on the HTTP protocol configuration
   *
   * @returns a new HttpRequestActionBuilder instance
   */
  silent(): T;

  /**
   * Instruct the reporting engine to forcefully report stats about this request, ignoring HTTP
   * protocol configuration
   *
   * @returns a new HttpRequestActionBuilder instance
   */
  notSilent(): T;

  /**
   * Disable automatic redirect following
   *
   * @returns a new HttpRequestActionBuilder instance
   */
  disableFollowRedirect(): T;

  // TODO transformResponse(f: (response: Response, session: Session) => Response): T;

  /**
   * Set some resources to be fetched concurrently after the main request. Next action in the
   * Scenario will be performed once all resources are fetched.
   *
   * @param res - the resources
   * @returns a new HttpRequestActionBuilder instance
   */
  resources(...res: HttpRequestActionBuilder[]): T;

  /**
   * Override the default request timeout defined in gatling.conf
   *
   * @param timeout - timeout the timeout
   * @returns a new HttpRequestActionBuilder instance
   */
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
        : jvmBuilder.checkIf(underlyingSessionTo(condition)),
      wrap
    ),
  ignoreProtocolChecks: (): T => wrap(jvmBuilder.ignoreProtocolChecks()),
  silent: (): T => wrap(jvmBuilder.silent()),
  notSilent: (): T => wrap(jvmBuilder.notSilent()),
  disableFollowRedirect: (): T => wrap(jvmBuilder.disableFollowRedirect()),
  // TODO transformResponse: (f: (response: Response, session: Session) => Response): T =>
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
  _underlying: JvmHttpRequestActionBuilder;
}

export const wrapHttpRequestActionBuilder = (_underlying: JvmHttpRequestActionBuilder): HttpRequestActionBuilder => ({
  _underlying,
  ...requestWithParamsActionBuilderImpl(_underlying, wrapHttpRequestActionBuilder),
  ...requestWithBodyActionBuilderImpl(_underlying, wrapHttpRequestActionBuilder),
  ...requestActionBuilderImpl(_underlying, wrapHttpRequestActionBuilder)
});
