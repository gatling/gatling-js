import { Wrapper } from "@gatling.io/core";

import { HttpHeaders, wrapHttpHeaders } from "../headers";
import { RequestBody, wrapRequestBody } from "./body";

import JvmRequest = io.gatling.http.client.Request;

export interface Request extends Wrapper<JvmRequest> {
  //copyWithCopiedHeaders(): Request;
  //copyWithNewUri(arg0: any /*io.gatling.http.client.uri.Uri*/): Request;
  //copyWithNewBody(arg0: io.gatling.http.client.body.RequestBody): Request;
  //copyWithHttp2PriorKnowledge(arg0: any /*io.gatling.http.client.Http2PriorKnowledge*/): Request;
  //getName(): string;
  //getMethod(): any /*io.netty.handler.codec.http.HttpMethod*/;
  //getUri(): any /*io.gatling.http.client.uri.Uri*/;
  headers(): HttpHeaders;
  //getCookies(): java.util.List<any /*io.netty.handler.codec.http.cookie.Cookie*/>;
  body(): RequestBody;
  //getRequestTimeout(): long;
  //isAutoOrigin(): boolean;
  //getLocalAddresses(): any /*io.gatling.http.client.LocalAddresses*/;
  //getRealm(): any /*io.gatling.http.client.realm.Realm*/;
  //getProxyServer(): any /*io.gatling.http.client.proxy.ProxyServer*/;
  //getProxyProtocolSourceIpV4Address(): string;
  //getProxyProtocolSourceIpV6Address(): string;
  //getSignatureCalculator(): Func<Request, Request>;
  //getNameResolver(): any /*io.gatling.http.client.resolver.InetAddressNameResolver*/;
  //isHttp2Enabled(): boolean;
  //getHttp2PriorKnowledge(): any /*io.gatling.http.client.Http2PriorKnowledge*/;
  //getWsSubprotocol(): string;
}

export const wrapRequest = (_underlying: JvmRequest): Request => ({
  _underlying,
  headers: (): HttpHeaders => wrapHttpHeaders(_underlying.getHeaders()),
  body: (): RequestBody => wrapRequestBody(_underlying.getBody())
});
