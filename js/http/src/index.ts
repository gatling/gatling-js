import { Expression, Session, wrapCallback, wrapSession } from "@gatling.io/core";
import { underlyingSessionTo } from "@gatling.io/core";
import { HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";

import { HttpProtocolBuilder, wrapHttpProtocolBuilder } from "./protocol";
import { HttpRequestActionBuilder, Request, wrapHttpRequestActionBuilder, wrapRequest } from "./request";
import { Response, wrapResponse } from "./response";

export * from "./bodyPart";
export * from "./checks";
export * from "./cookies";
export * from "./headers";
export * from "./method";
export * from "./polling";
export * from "./protocol";
export * from "./proxy";
export * from "./request";
export * from "./response";

import JvmHttp = io.gatling.javaapi.http.Http;
import JvmRequest = io.gatling.http.client.Request;
import JvmResponse = io.gatling.http.response.Response;
import JvmSession = io.gatling.javaapi.core.Session;

export type RequestTransform = (request: Request, session: Session) => Request;

export const underlyingRequestTransform =
  (f: RequestTransform): ((jvmRequest: JvmRequest, jvmSession: JvmSession) => JvmRequest) =>
  (jvmRequest: JvmRequest, jvmSession: JvmSession) =>
    f(wrapRequest(jvmRequest), wrapSession(jvmSession))._underlying;

export type ResponseTransform = (response: Response, session: Session) => Response;

export const underlyingResponseTransform =
  (f: ResponseTransform): ((jvmResponse: JvmResponse, jvmSession: JvmSession) => JvmResponse) =>
  (jvmResponse: JvmResponse, jvmSession: JvmSession) =>
    f(wrapResponse(jvmResponse), wrapSession(jvmSession))._underlying;

const httpProtocolBuilder: HttpProtocolBuilder = wrapHttpProtocolBuilder(
  // HttpDsl.http doesn't get properly generated by java2ts because of conflicts with methods of the same name
  Java.type<any>("io.gatling.javaapi.http.HttpDsl").http
);

/**
 * DSL for bootstrapping HTTP requests.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface Http {
  /**
   * Define a GET request
   *
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  get(url: string): HttpRequestActionBuilder;

  /**
   * Define a GET request
   *
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  get(url: (session: Session) => string): HttpRequestActionBuilder;

  /**
   * Define a PUT request
   *
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  put(url: string): HttpRequestActionBuilder;

  /**
   * Define a PUT request
   *
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  put(url: (session: Session) => string): HttpRequestActionBuilder;

  /**
   * Define a POST request
   *
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  post(url: string): HttpRequestActionBuilder;

  /**
   * Define a POST request
   *
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  post(url: (session: Session) => string): HttpRequestActionBuilder;

  /**
   * Define a PATCH request
   *
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  patch(url: string): HttpRequestActionBuilder;

  /**
   * Define a PATCH request
   *
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  patch(url: (session: Session) => string): HttpRequestActionBuilder;

  /**
   * Define a HEAD request
   *
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  head(url: string): HttpRequestActionBuilder;

  /**
   * Define a HEAD request
   *
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  head(url: (session: Session) => string): HttpRequestActionBuilder;

  /**
   * Define a DELETE request
   *
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  delete(url: string): HttpRequestActionBuilder;

  /**
   * Define a DELETE request
   *
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  delete(url: (session: Session) => string): HttpRequestActionBuilder;

  /**
   * Define a OPTIONS request
   *
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  options(url: string): HttpRequestActionBuilder;

  /**
   * Define a OPTIONS request
   *
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  options(url: (session: Session) => string): HttpRequestActionBuilder;

  /**
   * Define a HTTP request
   *
   * @param method - the HTTP method
   * @param url - the url, expressed as a Gatling Expression Language String
   * @returns a new instance of HttpRequestActionBuilder
   */
  httpRequest(method: string, url: string): HttpRequestActionBuilder;

  /**
   * Define a HTTP request
   *
   * @param method - the HTTP method
   * @param url - the url, expressed as a function
   * @returns a new instance of HttpRequestActionBuilder
   */
  httpRequest(method: string, url: (session: Session) => string): HttpRequestActionBuilder;
}

const wrapHttp = (jvmHttp: JvmHttp): Http => ({
  get: (url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function" ? jvmHttp.get(wrapCallback(underlyingSessionTo(url))) : jvmHttp.get(url)
    ),
  put: (url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function" ? jvmHttp.put(wrapCallback(underlyingSessionTo(url))) : jvmHttp.put(url)
    ),
  post: (url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function" ? jvmHttp.post(wrapCallback(underlyingSessionTo(url))) : jvmHttp.post(url)
    ),
  patch: (url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function" ? jvmHttp.patch(wrapCallback(underlyingSessionTo(url))) : jvmHttp.patch(url)
    ),
  head: (url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function" ? jvmHttp.head(wrapCallback(underlyingSessionTo(url))) : jvmHttp.head(url)
    ),
  delete: (url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function" ? jvmHttp.delete(wrapCallback(underlyingSessionTo(url))) : jvmHttp.delete(url)
    ),
  options: (url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function" ? jvmHttp.options(wrapCallback(underlyingSessionTo(url))) : jvmHttp.options(url)
    ),
  httpRequest: (method: string, url: Expression<string>): HttpRequestActionBuilder =>
    wrapHttpRequestActionBuilder(
      typeof url === "function"
        ? jvmHttp.httpRequest(method, wrapCallback(underlyingSessionTo(url)))
        : jvmHttp.httpRequest(method, url)
    )
});

/**
 * The entrypoint of the Gatling HTTP DSL
 */
export interface HttpApply {
  /**
   * Bootstrap a HTTP request configuration
   *
   * @param name - the HTTP request name, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string): Http;

  /**
   * Bootstrap a HTTP request configuration
   *
   * @param name - the HTTP request name, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string): Http;
}

const httpApply = (name: Expression<string>): Http => {
  // Handle overloading
  const jvmHttp =
    typeof name === "string" ? JvmHttpDsl.http(name) : JvmHttpDsl.http(wrapCallback(underlyingSessionTo(name)));
  return wrapHttp(jvmHttp);
};

export const http: HttpApply & HttpProtocolBuilder = Object.assign(httpApply, httpProtocolBuilder);
