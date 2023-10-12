import { ActionBuilder, ProtocolBuilder, Session } from "./coreDsl";

export interface HttpProtocolBuilder extends ProtocolBuilder {
  baseUrl(url: string): HttpProtocolBuilder;
}

export interface RequestActionBuilder extends ActionBuilder {}

export interface HttpRequestActionBuilder extends RequestActionBuilder {}

export interface Http {
  get(url: string): HttpRequestActionBuilder;
  get(url: (session: Session) => string): HttpRequestActionBuilder;
  // etc.
}

export interface HttpDsl {
  // http: HttpProtocolBuilder; // causes duplicate identifier, so we declare a separate HttpDslProtocolBuilder...
  http(name: string): Http;
  http(name: (session: Session) => string): Http;
}

export const HttpDslProtocolBuilder = (): HttpProtocolBuilder => Java.type<any>("io.gatling.javaapi.http.HttpDsl").http;
export const HttpDsl: HttpDsl = Java.type("io.gatling.javaapi.http.HttpDsl");
