import {
  Expression,
  ProtocolBuilder,
  Session,
  underlyingSessionTo,
  wrapBiCallback,
  wrapCallback
} from "@gatling.io/core";

import { underlyingRequestTransform, underlyingResponseTransform } from "./index";
import { Proxy } from "./proxy";
import { Request } from "./request";
import { Response } from "./response";

import JvmHttpProtocolBuilder = io.gatling.javaapi.http.HttpProtocolBuilder;

/**
 * DSL for building HTTP protocol configurations
 *
 * <p>Immutable, so all methods returns a new occurrence and leave the original unmodified.
 */
export interface HttpProtocolBuilder extends ProtocolBuilder {
  /**
   * Define the baseUrl that will be used as a prefix for all relative urls
   *
   * @param url - the base url
   * @returns a new HttpProtocolBuilder instance
   */
  baseUrl(url: string): HttpProtocolBuilder;

  /**
   * Define multiple baseUrls that will be used as a prefix for all relative urls. Assigned once per
   * virtual user based on a round-robin strategy.
   *
   * @param urls - the base urls
   * @returns a new HttpProtocolBuilder instance
   */
  baseUrls(...urls: string[]): HttpProtocolBuilder;

  /**
   * Define the warmup url. Used to perform a blank HTTP request to load the classes in the
   * ClassLoader so the first load test request won't have to pay for this penalty. Hit
   * "https://gatling.io" by default.
   *
   * @param url - the warmup url
   * @returns a new HttpProtocolBuilder instance
   */
  warmUp(url: string): HttpProtocolBuilder;

  /**
   * Disable the warmup
   *
   * @returns a new HttpProtocolBuilder instance
   */
  disableWarmUp(): HttpProtocolBuilder;

  // Engine part

  /**
   * Share a global connection pool and a global {@link javax.net.ssl.SSLContext} amongst virtual
   * users instead of each having its own. Makes sense if you don't want to generate mob browser
   * traffic but server to server traffic.
   *
   * @returns a new HttpProtocolBuilder instance
   */
  shareConnections(): HttpProtocolBuilder;

  /**
   * Define the local address to bind from
   *
   * @param address - the local address
   * @returns a new HttpProtocolBuilder instance
   */
  localAddress(address: string): HttpProtocolBuilder;

  /**
   * Define multiple local addresses to bind from. Assigned once per virtual user based on a
   * round-robin strategy.
   *
   * @param addresses - the local addresses
   * @returns a new HttpProtocolBuilder instance
   */
  localAddresses(...addresses: string[]): HttpProtocolBuilder;

  /**
   * Bind from all detected local addresses. Assigned once per virtual user based on a round-robin
   * strategy.
   *
   * @returns a new HttpProtocolBuilder instance
   */
  useAllLocalAddresses(): HttpProtocolBuilder;

  /**
   * Bind from all detected local addresses matching at least one of the configured patterns.
   * Assigned once per virtual user based on a round-robin strategy.
   *
   * @param patterns - some <a
   *     href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   *     Expression</a> patterns
   * @returns a new HttpProtocolBuilder instance
   */
  useAllLocalAddressesMatching(...patterns: string[]): HttpProtocolBuilder;

  /**
   * Define an HTTP/1.1 connections per host limit for fetching concurrent resources
   *
   * @param max - the limit
   * @returns a new HttpProtocolBuilder instance
   */
  maxConnectionsPerHost(max: number): HttpProtocolBuilder;

  // TODO
  //perUserKeyManagerFactory(arg0: Func<long | null, any /*javax.net.ssl.KeyManagerFactory*/>): HttpProtocolBuilder;

  // Request part

  /**
   * Disable the automatic Referer header generation, based on previous requests.
   *
   * @returns a new HttpProtocolBuilder instance
   */
  disableAutoReferer(): HttpProtocolBuilder;

  /**
   * Disable the automatic Origin header generation, based the request url.
   *
   * @returns a new HttpProtocolBuilder instance
   */
  disableAutoOrigin(): HttpProtocolBuilder;

  /**
   * Disable HTTP caching.
   *
   * @returns a new HttpProtocolBuilder instance
   */
  disableCaching(): HttpProtocolBuilder;

  /**
   * Set a header that's common to all HTTP requests
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  header(name: string, value: string): HttpProtocolBuilder;

  /**
   * Set a header that's common to all HTTP requests
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  header(name: string, value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set multiple headers that's common to all HTTP requests
   *
   * @param headers - the headers, names are static but values are expressed as a Gatling Expression
   *     Language String
   * @returns a new HttpProtocolBuilder instance
   */
  headers(headers: Record<string, string>): HttpProtocolBuilder;

  /**
   * Set the accept header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  acceptHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the accept header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  acceptHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the accept-charset header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  acceptCharsetHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the accept-charset header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  acceptCharsetHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the accept-encoding header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  acceptEncodingHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the accept-encoding header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  acceptEncodingHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the accept-language header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  acceptLanguageHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the accept-language header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  acceptLanguageHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the authorization header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  authorizationHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the authorization header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  authorizationHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the connection header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  connectionHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the connection header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  connectionHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the content-type header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  contentTypeHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the content-type header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  contentTypeHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the do-not-track header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  doNotTrackHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the do-not-track header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  doNotTrackHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the origin header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  originHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the origin header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  originHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the user-agent header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  userAgentHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the user-agent header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  userAgentHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the upgrade-insecure-requests header
   *
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  upgradeInsecureRequestsHeader(value: string): HttpProtocolBuilder;

  /**
   * Set the upgrade-insecure-requests header
   *
   * @param value - the header value, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  upgradeInsecureRequestsHeader(value: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  basicAuth(username: string, password: string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  basicAuth(username: string, password: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  basicAuth(username: (session: Session) => string, password: string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Basic Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  basicAuth(username: (session: Session) => string, password: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  digestAuth(username: string, password: string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  digestAuth(username: string, password: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  digestAuth(username: (session: Session) => string, password: string): HttpProtocolBuilder;

  /**
   * Set the authorization header for Digest Auth
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  digestAuth(username: (session: Session) => string, password: (session: Session) => string): HttpProtocolBuilder;

  /**
   * Instruct the reporting engine to not report resources
   *
   * @returns a new HttpProtocolBuilder instance
   */
  silentResources(): HttpProtocolBuilder;

  /**
   * Instruct the reporting engine to not report requests whose uri matches the configured <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> pattern
   *
   * @param pattern - the regex pattern
   * @returns a new HttpProtocolBuilder instance
   */
  silentUri(pattern: string): HttpProtocolBuilder;

  /**
   * Disable the automatic url encoding that tries to detect unescaped reserved chars
   *
   * @returns a new HttpProtocolBuilder instance
   */
  disableUrlEncoding(): HttpProtocolBuilder;

  /**
   * Provide a function to sign the requests before writing them on the wire
   *
   * @param calculator - the signing function
   * @returns a new HttpProtocolBuilder instance
   */
  //sign(calculator: (request: Request, session: Session) => Request): HttpProtocolBuilder;

  /**
   * Instruct sign the requests with an OAuth1 Authorization header before writing them on the wire
   *
   * @param consumerKey - the consumerKey, expressed as a Gatling Expression Language String
   * @param clientSharedSecret - the clientSharedSecret, expressed as a Gatling Expression Language
   *     String
   * @param token - the token, expressed as a Gatling Expression Language String
   * @param tokenSecret - the tokenSecret, expressed as a Gatling Expression Language String
   * @returns a new HttpProtocolBuilder instance
   */
  signWithOAuth1(
    consumerKey: string,
    clientSharedSecret: string,
    token: string,
    tokenSecret: string
  ): HttpProtocolBuilder;

  /**
   * Instruct sign the requests with OAuth1 before writing them on the wire
   *
   * @param consumerKey - the consumerKey, expressed as a Gatling Expression Language String
   * @param clientSharedSecret - the clientSharedSecret, expressed as a Gatling Expression Language
   *     String
   * @param token - the token, expressed as a Gatling Expression Language String
   * @param tokenSecret - the tokenSecret, expressed as a Gatling Expression Language String
   * @param useAuthorizationHeader - if true, sign with an Authorization header, otherwise sign forms
   *     with extra parameters and other requests with extra query params
   * @returns a new HttpProtocolBuilder instance
   */
  signWithOAuth1(
    consumerKey: string,
    clientSharedSecret: string,
    token: string,
    tokenSecret: string,
    useAuthorizationHeader: boolean
  ): HttpProtocolBuilder;

  /**
   * Instruct sign the requests with an OAuth1 Authorization before writing them on the wire
   *
   * @param consumerKey - the consumerKey, expressed as a function
   * @param clientSharedSecret - the clientSharedSecret, expressed as a function
   * @param token - the token, expressed as a function
   * @param tokenSecret - the tokenSecret, expressed as a function
   * @returns a new HttpProtocolBuilder instance
   */
  signWithOAuth1(
    consumerKey: (session: Session) => string,
    clientSharedSecret: (session: Session) => string,
    token: (session: Session) => string,
    tokenSecret: (session: Session) => string
  ): HttpProtocolBuilder;

  /**
   * Instruct sign the requests with OAuth1 before writing them on the wire
   *
   * @param consumerKey - the consumerKey, expressed as a function
   * @param clientSharedSecret - the clientSharedSecret, expressed as a function
   * @param token - the token, expressed as a function
   * @param tokenSecret - the tokenSecret, expressed as a function
   * @param useAuthorizationHeader - if true, sign with an Authorization header, otherwise sign forms
   *     with extra parameters and other requests with extra query params
   * @returns a new HttpProtocolBuilder instance
   */
  signWithOAuth1(
    consumerKey: (session: Session) => string,
    clientSharedSecret: (session: Session) => string,
    token: (session: Session) => string,
    tokenSecret: (session: Session) => string,
    useAuthorizationHeader: boolean
  ): HttpProtocolBuilder;

  /**
   * Enable HTTP/2
   *
   * @returns a new HttpProtocolBuilder instance
   */
  enableHttp2(): HttpProtocolBuilder;

  /**
   * Define the remote hosts that are known to support or not support HTTP/2
   *
   * @param remotes - the known remote hosts
   * @returns a new HttpProtocolBuilder instance
   */
  http2PriorKnowledge(remotes: Record<string, boolean>): HttpProtocolBuilder;

  // Response part

  /**
   * Disable automatically following redirects
   *
   * @returns a new HttpProtocolBuilder instance
   */
  disableFollowRedirect(): HttpProtocolBuilder;

  /**
   * Define the maximum number of redirects in a redirect chain
   *
   * @param max - the limit
   * @returns a new HttpProtocolBuilder instance
   */
  maxRedirects(max: number): HttpProtocolBuilder;

  /**
   * Apply 302 strictly and not switch to GET and re-send the request body
   *
   * @returns a new HttpProtocolBuilder instance
   */
  strict302Handling(): HttpProtocolBuilder;

  // TODO
  //redirectNamingStrategy(
  //  arg0: any /*io.gatling.javaapi.http.HttpProtocolBuilder$RedirectNamingStrategy*/
  //): HttpProtocolBuilder;

  /**
   * Define a transformation function to be applied on the {@link Response}s before checks are
   * applied. Typically used for decoding responses, eg with <a
   * href="https://developers.google.com/protocol-buffers">Protobuf</a>.
   *
   * @param f - the strategy
   * @returns a new HttpProtocolBuilder instance
   */
  //transformResponse(f: (response: Response, session: Session) => Response): HttpProtocolBuilder;

  // TODO
  //check(...arg0: io.gatling.javaapi.core.CheckBuilder[]): HttpProtocolBuilder;

  // TODO
  //check(arg0: java.util.List<io.gatling.javaapi.core.CheckBuilder>): HttpProtocolBuilder;

  // TODO
  //checkIf(
  //  arg0: BiFunction<any /*io.gatling.http.response.Response*/, io.gatling.javaapi.core.Session, boolean | null>
  //): any /*io.gatling.javaapi.http.HttpProtocolBuilder$TypedCondition*/;

  // TODO
  //checkIf(
  //  arg0: Func<io.gatling.javaapi.core.Session, boolean | null>
  //): any /*io.gatling.javaapi.http.HttpProtocolBuilder$UntypedCondition*/;

  // TODO
  //checkIf(arg0: string): any /*io.gatling.javaapi.http.HttpProtocolBuilder$UntypedCondition*/;

  /**
   * Automatically infer resources from HTML payloads
   *
   * @returns a new HttpProtocolBuilder instance
   */
  inferHtmlResources(): HttpProtocolBuilder;

  // TODO
  //inferHtmlResources(arg0: any /*io.gatling.javaapi.core.Filter$AllowList*/): HttpProtocolBuilder;

  // TODO
  //inferHtmlResources(
  //  arg0: any /*io.gatling.javaapi.core.Filter$AllowList*/,
  //  arg1: any /*io.gatling.javaapi.core.Filter$DenyList*/
  //): HttpProtocolBuilder;

  // TODO
  //inferHtmlResources(arg0: any /*io.gatling.javaapi.core.Filter$DenyList*/): HttpProtocolBuilder;

  /**
   * Name the inferred resources' requests based on the tail of the url
   *
   * @returns a new HttpProtocolBuilder instance
   */
  nameInferredHtmlResourcesAfterUrlTail(): HttpProtocolBuilder;

  /**
   * Name the inferred resources' requests based on the absolute url
   *
   * @returns a new HttpProtocolBuilder instance
   */
  nameInferredHtmlResourcesAfterAbsoluteUrl(): HttpProtocolBuilder;

  /**
   * Name the inferred resources' requests based on the relative url
   *
   * @returns a new HttpProtocolBuilder instance
   */
  nameInferredHtmlResourcesAfterRelativeUrl(): HttpProtocolBuilder;

  /**
   * Name the inferred resources' requests based on the path
   *
   * @returns a new HttpProtocolBuilder instance
   */
  nameInferredHtmlResourcesAfterPath(): HttpProtocolBuilder;

  /**
   * Name the inferred resources' requests based on the last element of the path
   *
   * @returns a new HttpProtocolBuilder instance
   */
  nameInferredHtmlResourcesAfterLastPathElement(): HttpProtocolBuilder;

  // TODO
  //nameInferredHtmlResources(arg0: Func<any /*io.gatling.http.client.uri.Uri*/, string>): HttpProtocolBuilder;

  // WebSockets part

  // TODO
  //wsBaseUrl(arg0: string): HttpProtocolBuilder;

  // TODO
  //wsBaseUrls(...arg0: string[]): HttpProtocolBuilder;

  // TODO
  //wsBaseUrls(arg0: java.util.List<string>): HttpProtocolBuilder;

  // TODO
  //wsReconnect(): HttpProtocolBuilder;

  // TODO
  //wsMaxReconnects(arg0: int): HttpProtocolBuilder;

  // TODO
  //wsAutoReplyTextFrame(arg0: Func<string, string>): HttpProtocolBuilder;

  // TODO
  //wsAutoReplySocketIo4(): HttpProtocolBuilder;

  // FIXME missing wsUnmatchedInboundMessageBufferSize

  // SSE part

  // FIXME missing sseUnmatchedInboundMessageBufferSize

  // Proxy part

  /**
   * Ignore any configured proxy for some hosts
   *
   * @param hosts - the hosts that must be connected directly without the proxy
   * @returns a new HttpProtocolBuilder instance
   */
  noProxyFor(...hosts: string[]): HttpProtocolBuilder;

  /**
   * Define a Proxy to be used for all requests
   *
   * @param proxy - the proxy
   * @returns a new HttpProtocolBuilder instance
   */
  proxy(proxy: Proxy): HttpProtocolBuilder;

  // DNS part

  /**
   * Enable Gatling non-blocking DNS resolution instead of using Java's blocking implementation
   *
   * @param dnsServers - the DNS servers
   * @returns a new HttpProtocolBuilder instance
   */
  asyncNameResolution(...dnsServers: string[]): HttpProtocolBuilder;

  // TODO
  //hostNameAliases(arg0: java.util.Map<string, java.util.List<string>>): HttpProtocolBuilder;

  /**
   * Force each virtual user to have its own DNS cache and perform its own DNS resolutions instead
   * of using a global shared resolver
   *
   * @returns a new HttpProtocolBuilder instance
   */
  perUserNameResolution(): HttpProtocolBuilder;
}

export const wrapHttpProtocolBuilder = (_underlying: JvmHttpProtocolBuilder): HttpProtocolBuilder => ({
  _underlying,

  baseUrl: (url: string): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.baseUrl(url)),
  baseUrls: (...urls: string[]): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.baseUrls(...urls)),
  warmUp: (url: string): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.warmUp(url)),
  disableWarmUp: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.disableWarmUp()),

  // Engine part

  shareConnections: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.shareConnections()),
  localAddress: (address: string): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.localAddress(address)),
  localAddresses: (...addresses: string[]): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.localAddresses(...addresses)),
  useAllLocalAddresses: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.useAllLocalAddresses()),
  useAllLocalAddressesMatching: (...patterns: string[]): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.useAllLocalAddressesMatching(...patterns)),
  maxConnectionsPerHost: (max: int): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.maxConnectionsPerHost(max)),
  // TODO perUserKeyManagerFactory

  // Request part

  disableAutoOrigin: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.disableAutoOrigin()),
  disableAutoReferer: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.disableAutoReferer()),
  disableCaching: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.disableCaching()),
  header: (name: string, value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.header(name, wrapCallback(underlyingSessionTo(value)))
        : _underlying.header(name, value)
    ),
  headers: (headers: Record<string, string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.headers(headers as any)),
  acceptHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.acceptHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.acceptHeader(value)
    ),
  acceptCharsetHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.acceptCharsetHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.acceptCharsetHeader(value)
    ),
  acceptEncodingHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.acceptEncodingHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.acceptEncodingHeader(value)
    ),
  acceptLanguageHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.acceptLanguageHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.acceptLanguageHeader(value)
    ),
  authorizationHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.authorizationHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.authorizationHeader(value)
    ),
  connectionHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.connectionHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.connectionHeader(value)
    ),
  contentTypeHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.contentTypeHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.contentTypeHeader(value)
    ),
  doNotTrackHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.doNotTrackHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.doNotTrackHeader(value)
    ),
  originHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.originHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.originHeader(value)
    ),
  userAgentHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.userAgentHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.userAgentHeader(value)
    ),
  upgradeInsecureRequestsHeader: (value: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof value === "function"
        ? _underlying.upgradeInsecureRequestsHeader(wrapCallback(underlyingSessionTo(value)))
        : _underlying.upgradeInsecureRequestsHeader(value)
    ),
  basicAuth: (username: Expression<string>, password: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof username === "function"
        ? typeof password === "function"
          ? _underlying.basicAuth(
              wrapCallback(underlyingSessionTo(username)),
              wrapCallback(underlyingSessionTo(password))
            )
          : _underlying.basicAuth(wrapCallback(underlyingSessionTo(username)), password)
        : typeof password === "function"
          ? _underlying.basicAuth(username, wrapCallback(underlyingSessionTo(password)))
          : _underlying.basicAuth(username, password)
    ),
  digestAuth: (username: Expression<string>, password: Expression<string>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof username === "function"
        ? typeof password === "function"
          ? _underlying.digestAuth(
              wrapCallback(underlyingSessionTo(username)),
              wrapCallback(underlyingSessionTo(password))
            )
          : _underlying.digestAuth(wrapCallback(underlyingSessionTo(username)), password)
        : typeof password === "function"
          ? _underlying.digestAuth(username, wrapCallback(underlyingSessionTo(password)))
          : _underlying.digestAuth(username, password)
    ),
  silentResources: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.silentResources()),
  silentUri: (pattern: string): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.silentUri(pattern)),
  disableUrlEncoding: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.disableUrlEncoding()),
  //sign: (calculator: (request: Request, session: Session) => Request): HttpProtocolBuilder =>
  //  wrapHttpProtocolBuilder(_underlying.sign(wrapBiCallback(underlyingRequestTransform(calculator)))),
  signWithOAuth1: (
    consumerKey: Expression<string>,
    clientSharedSecret: Expression<string>,
    token: Expression<string>,
    tokenSecret: Expression<string>,
    useAuthorizationHeader?: boolean
  ): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(
      typeof consumerKey == "function" &&
        typeof clientSharedSecret === "function" &&
        typeof token === "function" &&
        typeof tokenSecret === "function"
        ? typeof useAuthorizationHeader !== "undefined"
          ? _underlying.signWithOAuth1(
              wrapCallback(underlyingSessionTo(consumerKey)),
              wrapCallback(underlyingSessionTo(clientSharedSecret)),
              wrapCallback(underlyingSessionTo(token)),
              wrapCallback(underlyingSessionTo(tokenSecret)),
              useAuthorizationHeader
            )
          : _underlying.signWithOAuth1(
              wrapCallback(underlyingSessionTo(consumerKey)),
              wrapCallback(underlyingSessionTo(clientSharedSecret)),
              wrapCallback(underlyingSessionTo(token)),
              wrapCallback(underlyingSessionTo(tokenSecret))
            )
        : typeof useAuthorizationHeader !== "undefined"
          ? _underlying.signWithOAuth1(
              consumerKey as string,
              clientSharedSecret as string,
              token as string,
              tokenSecret as string,
              useAuthorizationHeader
            )
          : _underlying.signWithOAuth1(
              consumerKey as string,
              clientSharedSecret as string,
              token as string,
              tokenSecret as string
            )
    ),
  enableHttp2: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.enableHttp2()),
  http2PriorKnowledge: (remotes: Record<string, boolean>): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.http2PriorKnowledge(remotes as any)),

  // Response part

  disableFollowRedirect: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.disableFollowRedirect()),
  maxRedirects: (max: number): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.maxRedirects(max)),
  strict302Handling: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.strict302Handling()),

  //transformResponse: (f: (response: Response, session: Session) => Response): HttpProtocolBuilder =>
  //  wrapHttpProtocolBuilder(_underlying.transformResponse(wrapBiCallback(underlyingResponseTransform(f)))),

  inferHtmlResources: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.inferHtmlResources()),

  nameInferredHtmlResourcesAfterUrlTail: (): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.nameInferredHtmlResourcesAfterUrlTail()),
  nameInferredHtmlResourcesAfterAbsoluteUrl: (): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.nameInferredHtmlResourcesAfterAbsoluteUrl()),
  nameInferredHtmlResourcesAfterRelativeUrl: (): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.nameInferredHtmlResourcesAfterRelativeUrl()),
  nameInferredHtmlResourcesAfterPath: (): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.nameInferredHtmlResourcesAfterPath()),
  nameInferredHtmlResourcesAfterLastPathElement: (): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.nameInferredHtmlResourcesAfterLastPathElement()),

  // Proxy part

  noProxyFor: (...hosts: string[]): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.noProxyFor(...hosts)),
  proxy: (proxy: Proxy): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.proxy(proxy._underlying)),

  // DNS part

  asyncNameResolution: (...dnsServers: string[]): HttpProtocolBuilder =>
    wrapHttpProtocolBuilder(_underlying.asyncNameResolution(...dnsServers)),
  perUserNameResolution: (): HttpProtocolBuilder => wrapHttpProtocolBuilder(_underlying.perUserNameResolution())
});
