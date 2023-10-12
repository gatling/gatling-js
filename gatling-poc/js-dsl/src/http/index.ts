import * as jvm from "../gatlingJvm/httpDsl";
import * as core from "../core";
import { Wrapper } from "../common";

export interface HttpProtocolBuilder extends core.ProtocolBuilder {
  baseUrl(url: string): HttpProtocolBuilder;
}
const wrapHttpProtocolBuilder = (_underlying: jvm.HttpProtocolBuilder): HttpProtocolBuilder => ({
  _underlying,
  baseUrl: (url: string): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.baseUrl(url))
});

export const httpProtocol = (): HttpProtocolBuilder => wrapHttpProtocolBuilder(jvm.HttpDslProtocolBuilder());

export interface RequestActionBuilder extends core.ActionBuilder {}

export interface HttpRequestActionBuilder extends RequestActionBuilder {}
const wrapHttpRequestActionBuilder = (_underlying: jvm.HttpRequestActionBuilder): HttpRequestActionBuilder => ({
  _underlying
});

type Name = string | core.SessionToString;

export interface Http {
  get(url: Name): HttpRequestActionBuilder;
  // etc.
}
const wrapHttp = (jvmHttp: jvm.Http): Http => ({
  get: (url: Name): HttpRequestActionBuilder => {
    // Handle overloading
    const jvmHttpRequestActionBuilder =
      typeof url === "string" ? jvmHttp.get(url) : jvmHttp.get(core.underlyingSessionToString(url));
    return wrapHttpRequestActionBuilder(jvmHttpRequestActionBuilder);
  }
});

export const http = (name: Name): Http => {
  // Handle overloading
  const jvmHttp =
    typeof name === "string" ? jvm.HttpDsl.http(name) : jvm.HttpDsl.http(core.underlyingSessionToString(name));
  return wrapHttp(jvmHttp);
};
