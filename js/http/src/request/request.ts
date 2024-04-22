import { Wrapper } from "@gatling.io/core";

import { HttpHeaders, wrapHttpHeaders } from "../headers";
import { RequestBody, wrapRequestBody } from "./body";

import JvmRequest = io.gatling.http.client.Request;

export interface Request extends Wrapper<JvmRequest> {
  //copyWithCopiedHeaders(): Request;
  //copyWithHttp2PriorKnowledge(arg0: any /*io.gatling.http.client.Http2PriorKnowledge*/): Request;
  //copyWithNewBody(arg0: io.gatling.http.client.body.RequestBody): Request;
  //copyWithNewUri(arg0: any /*io.gatling.http.client.uri.Uri*/): Request;
  body(): RequestBody;
  //getCookies(): java.util.List<any /*io.netty.handler.codec.http.cookie.Cookie*/>;
  headers(): HttpHeaders;
  //getHttp2PriorKnowledge(): any /*io.gatling.http.client.Http2PriorKnowledge*/;
  //getLocalIpV4Address(): any /*java.net.InetAddress*/;
  //getLocalIpV6Address(): any /*java.net.InetAddress*/;
  //getMethod(): any /*io.netty.handler.codec.http.HttpMethod*/;
  //getName(): string;
  //getNameResolver(): any /*io.gatling.http.client.resolver.InetAddressNameResolver*/;
  //getProxyServer(): any /*io.gatling.http.client.proxy.ProxyServer*/;
  //getRealm(): any /*io.gatling.http.client.realm.Realm*/;
  //getRequestTimeout(): long;
  //getSignatureCalculator(): Func<Request, Request>;
  //getUri(): any /*io.gatling.http.client.uri.Uri*/;
  //getVirtualHost(): string;
  //getWsSubprotocol(): string;
  //isAutoOrigin(): boolean;
  //isHttp2Enabled(): boolean;
}

export const wrapRequest = (_underlying: JvmRequest): Request => ({
  _underlying,
  body: (): RequestBody => wrapRequestBody(_underlying.getBody()),
  headers: (): HttpHeaders => wrapHttpHeaders(_underlying.getHeaders())
});
