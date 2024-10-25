/*
 * Project: java2typescript - https://github.com/bsorrentino/java2typescript
 *
 * Author: bsorrentino
 *
 * TYPESCRIPT DEFINITIONS
 *
 */

type int = number;
type long = number;
type float = number;
type double = number;
type byte = number;
type char = string;

type chararray = char[];
type bytearray = byte[];

declare namespace java.lang {
  interface Class<T> {}
  interface AutoCloseable {}
  interface Cloneable {}

  type Object = any;
}

declare namespace java.util {
  interface RandomAccess {}

  type List<E> = E[];

  type Map<K extends keyof any, V> = Record<K, V>;
}

declare namespace java.io {
  interface Closeable {}
  interface Serializable {}
}

//
// Nashorn compatibility
//

declare function print(...args: any[]): void;

declare function load(module: string): void;

declare namespace Java {
  export function type<T>(t: string): T;

  export function from<T>(list: java.util.List<T>): Array<T>;
}

//
// Generated declarations
//

declare namespace io.gatling.http.client {
  class Request /* extends java.lang.Object*/ {
    copyWithCopiedHeaders(): Request;
    copyWithHttp2PriorKnowledge(arg0: any /*io.gatling.http.client.Http2PriorKnowledge*/): Request;
    copyWithNewBody(arg0: io.gatling.http.client.body.RequestBody): Request;
    copyWithNewUri(arg0: any /*io.gatling.http.client.uri.Uri*/): Request;
    equals(arg0: any /*java.lang.Object*/): boolean;
    getBody(): io.gatling.http.client.body.RequestBody;
    getCookies(): java.util.List<any /*io.netty.handler.codec.http.cookie.Cookie*/>;
    getHeaders(): io.netty.handler.codec.http.HttpHeaders;
    getHttp2PriorKnowledge(): any /*io.gatling.http.client.Http2PriorKnowledge*/;
    getLocalAddresses(): any /*io.gatling.http.client.LocalAddresses*/;
    getMethod(): any /*io.netty.handler.codec.http.HttpMethod*/;
    getName(): string;
    getNameResolver(): any /*io.gatling.http.client.resolver.InetAddressNameResolver*/;
    getProxyProtocolSourceIpV4Address(): string;
    getProxyProtocolSourceIpV6Address(): string;
    getProxyServer(): any /*io.gatling.http.client.proxy.ProxyServer*/;
    getRealm(): any /*io.gatling.http.client.realm.Realm*/;
    getRequestTimeout(): long;
    getSignatureCalculator(): Func<Request, Request>;
    getUri(): any /*io.gatling.http.client.uri.Uri*/;
    getWsSubprotocol(): string;
    isAutoOrigin(): boolean;
    isHttp2Enabled(): boolean;
    toString(): string;
  } // end Request
} // end namespace io.gatling.http.client
declare namespace io.gatling.http.client.body {
  interface RequestBody {
    build(arg0: any /*io.netty.buffer.ByteBufAllocator*/): any /*io.gatling.http.client.body.WritableContent*/;
    getBytes(): bytearray;
    getPatchedContentType(): any /*java.lang.CharSequence*/;
    newBuilder(): any /*io.gatling.http.client.body.RequestBodyBuilder*/;
    print(arg0: int): string;
  } // end RequestBody
} // end namespace io.gatling.http.client.body
declare namespace io.gatling.http.response {
  class Response /* extends java.lang.Object implements HttpResult, scala.Product, java.io.Serializable*/ {
    body(): ResponseBody;
    canEqual(x$1: any /*java.lang.Object*/): boolean;
    checksum(algorithm: any /*io.gatling.core.check.ChecksumAlgorithm*/): any /*scala.Option*/;
    checksums(): any /*scala.collection.immutable.Map*/;
    cookies(): any /*scala.collection.immutable.List*/;
    copy(
      request: io.gatling.http.client.Request,
      startTimestamp: long,
      endTimestamp: long,
      status: io.netty.handler.codec.http.HttpResponseStatus,
      headers: io.netty.handler.codec.http.HttpHeaders,
      body: ResponseBody,
      checksums: any /*scala.collection.immutable.Map*/,
      isHttp2: boolean
    ): Response;
    endTimestamp(): long;
    equals(x$1: any /*java.lang.Object*/): boolean;
    header(name: any /*java.lang.CharSequence*/): any /*scala.Option*/;
    headers(): io.netty.handler.codec.http.HttpHeaders;
    headers(name: any /*java.lang.CharSequence*/): any /*scala.collection.immutable.Seq*/;
    isHttp2(): boolean;
    isRedirect(): boolean;
    lastModifiedOrEtag(protocol: any /*io.gatling.http.protocol.HttpProtocol*/): any /*scala.Option*/;
    productArity(): int;
    productElement(x$1: int): any /*java.lang.Object*/;
    productElementName(x$1: int): string;
    productElementNames(): any /*scala.collection.Iterator*/;
    productIterator(): any /*scala.collection.Iterator*/;
    productPrefix(): string;
    request(): io.gatling.http.client.Request;
    startTimestamp(): long;
    status(): io.netty.handler.codec.http.HttpResponseStatus;
    toString(): string;
  } // end Response
} // end namespace io.gatling.http.response
declare namespace io.gatling.http.response {
  interface ResponseBody {
    bytes(): bytearray;
    chars(): chararray;
    charset(): any /*java.nio.charset.Charset*/;
    length(): int;
    stream(): any /*java.io.InputStream*/;
    string(): string;
  } // end ResponseBody
} // end namespace io.gatling.http.response
declare namespace io.gatling.javaapi.core {
  class Assertion$WithPath /* extends java.lang.Object*/ {
    allRequests(): Assertion$WithPathAndCountMetric;
    equals(arg0: any /*java.lang.Object*/): boolean;
    failedRequests(): Assertion$WithPathAndCountMetric;
    requestsPerSec(): Assertion$WithPathAndTarget<double | null>;
    responseTime(): Assertion$WithPathAndTimeMetric;
    successfulRequests(): Assertion$WithPathAndCountMetric;
    toString(): string;
  } // end Assertion$WithPath
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Assertion$WithPathAndCountMetric /* extends java.lang.Object*/ {
    count(): Assertion$WithPathAndTarget<long | null>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    percent(): Assertion$WithPathAndTarget<double | null>;
    toString(): string;
  } // end Assertion$WithPathAndCountMetric
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Assertion$WithPathAndTarget<T> /* extends java.lang.Object*/ {
    around(arg0: T, arg1: T): Assertion;
    around(arg0: T, arg1: T, arg2: boolean): Assertion;
    between(arg0: T, arg1: T): Assertion;
    between(arg0: T, arg1: T, arg2: boolean): Assertion;
    deviatesAround(arg0: T, arg1: double): Assertion;
    deviatesAround(arg0: T, arg1: double, arg2: boolean): Assertion;
    equals(arg0: any /*java.lang.Object*/): boolean;
    gt(arg0: T): Assertion;
    gte(arg0: T): Assertion;
    in(...arg0: T[]): Assertion;
    in(arg0: java.util.Set<T>): Assertion;
    is(arg0: T): Assertion;
    lt(arg0: T): Assertion;
    lte(arg0: T): Assertion;
    shouldBe(arg0: T): Assertion;
    toString(): string;
    within(...arg0: T[]): Assertion;
    within(arg0: java.util.Set<T>): Assertion;
  } // end Assertion$WithPathAndTarget
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Assertion$WithPathAndTimeMetric /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    max(): Assertion$WithPathAndTarget<int | null>;
    mean(): Assertion$WithPathAndTarget<int | null>;
    min(): Assertion$WithPathAndTarget<int | null>;
    percentile(arg0: double): Assertion$WithPathAndTarget<int | null>;
    percentile1(): Assertion$WithPathAndTarget<int | null>;
    percentile2(): Assertion$WithPathAndTarget<int | null>;
    percentile3(): Assertion$WithPathAndTarget<int | null>;
    percentile4(): Assertion$WithPathAndTarget<int | null>;
    stdDev(): Assertion$WithPathAndTarget<int | null>;
    toString(): string;
  } // end Assertion$WithPathAndTimeMetric
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Assertion /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.commons.stats.assertion.Assertion*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Assertion
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Body$WithBytes /* extends Body implements java.util.function.Function<any, any>*/ {
    andThen<R, T, V>(arg0: Func<R, V>): Func<T, V>;
    apply(arg0: Session): bytearray;
    asScala(): any /*io.gatling.core.body.Body*/;
    compose<R, T, V>(arg0: Func<V, T>): Func<V, R>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Body$WithBytes
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Body$WithString /* extends Body implements java.util.function.Function<any, any>*/ {
    andThen<R, T, V>(arg0: Func<R, V>): Func<T, V>;
    apply(arg0: Session): string;
    asScala(): any /*io.gatling.core.body.Body*/;
    compose<R, T, V>(arg0: Func<V, T>): Func<V, R>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Body$WithString
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Body /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.core.body.Body*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Body
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ChainBuilder /* extends StructureBuilder<any, any> implements io.gatling.javaapi.core.exec.Executable*/ {
    asLongAs<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: Func<Session, boolean | null>, arg1: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: Func<Session, boolean | null>, arg1: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(
      arg0: Func<Session, boolean | null>,
      arg1: string,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: java.time.Duration): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: long): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: long, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: long, arg2: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: string,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    crashLoadGenerator<T>(arg0: Func<Session, string>): T;
    crashLoadGenerator<T>(arg0: string): T;
    crashLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: Func<Session, boolean | null>): T;
    crashLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: string): T;
    crashLoadGeneratorIf<T>(arg0: string, arg1: Func<Session, boolean | null>): T;
    crashLoadGeneratorIf<T>(arg0: string, arg1: string): T;
    doIf<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.condition.DoIf$Then<T>;
    doIf<T>(arg0: string): io.gatling.javaapi.core.condition.DoIf$Then<T>;
    doIfEquals<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(
      arg0: string,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(arg0: string, arg1: any /*java.lang.Object*/): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(arg0: string, arg1: string): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: string,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: string,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(arg0: string, arg1: string): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfOrElse<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.condition.DoIfOrElse$Then<T>;
    doIfOrElse<T>(arg0: string): io.gatling.javaapi.core.condition.DoIfOrElse$Then<T>;
    doSwitch<T>(arg0: Func<Session, any /*java.lang.Object*/>): io.gatling.javaapi.core.condition.DoSwitch$On<T>;
    doSwitch<T>(arg0: string): io.gatling.javaapi.core.condition.DoSwitch$On<T>;
    doSwitchOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<T>;
    doSwitchOrElse<T>(arg0: string): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<T>;
    doWhile<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile<T>(arg0: Func<Session, boolean | null>, arg1: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile<T>(arg0: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: Func<Session, boolean | null>, arg1: long): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: java.time.Duration): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: long): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: long, arg2: boolean): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: long, arg2: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: string,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    during<T>(arg0: Func<Session, java.time.Duration>): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: Func<Session, java.time.Duration>, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: Func<Session, java.time.Duration>, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(
      arg0: Func<Session, java.time.Duration>,
      arg1: string,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    exec<T>(arg0: Func<Session, Session>): T;
    exec<T>(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    exec<T>(arg0: java.util.List<ChainBuilder>): T;
    exitBlockOnFail<T>(): io.gatling.javaapi.core.error.Errors$ExitBlockOnFail<T>;
    exitHere<T>(): T;
    exitHereIf<T>(arg0: Func<Session, boolean | null>): T;
    exitHereIf<T>(arg0: string): T;
    exitHereIfFailed<T>(): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: Func<Session, int | null>): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: int): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: string): T;
    feed<T>(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>): T;
    feed<T>(
      arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>,
      arg1: Func<Session, int | null>
    ): T;
    feed<T>(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: int): T;
    feed<T>(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: string): T;
    feed<T>(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>): T;
    feed<T>(
      arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>,
      arg1: Func<Session, int | null>
    ): T;
    feed<T>(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: int): T;
    feed<T>(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: string): T;
    foreach<T>(
      arg0: Func<Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(
      arg0: Func<Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string,
      arg2: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(
      arg0: java.util.List<any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(
      arg0: java.util.List<any /*java.lang.Object*/>,
      arg1: string,
      arg2: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.ForEach$On<T>;
    forever<T>(): io.gatling.javaapi.core.loop.Forever$On<T>;
    forever<T>(arg0: string): io.gatling.javaapi.core.loop.Forever$On<T>;
    group<T>(arg0: Func<Session, string>): io.gatling.javaapi.core.group.Groups$On<T>;
    group<T>(arg0: string): io.gatling.javaapi.core.group.Groups$On<T>;
    pace<T>(arg0: Func<Session, java.time.Duration>): T;
    pace<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>): T;
    pace<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>, arg2: string): T;
    pace<T>(arg0: Func<Session, java.time.Duration>, arg1: string): T;
    pace<T>(arg0: java.time.Duration): T;
    pace<T>(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pace<T>(arg0: java.time.Duration, arg1: java.time.Duration, arg2: string): T;
    pace<T>(arg0: java.time.Duration, arg1: string): T;
    pace<T>(arg0: long): T;
    pace<T>(arg0: long, arg1: long): T;
    pace<T>(arg0: long, arg1: long, arg2: string): T;
    pace<T>(arg0: long, arg1: string): T;
    pace<T>(arg0: string): T;
    pace<T>(arg0: string, arg1: string): T;
    pace<T>(arg0: string, arg1: string, arg2: string): T;
    pause<T>(arg0: Func<Session, java.time.Duration>): T;
    pause<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>): T;
    pause<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>, arg2: PauseType): T;
    pause<T>(arg0: Func<Session, java.time.Duration>, arg1: PauseType): T;
    pause<T>(arg0: java.time.Duration): T;
    pause<T>(arg0: java.time.Duration, arg1: PauseType): T;
    pause<T>(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pause<T>(arg0: java.time.Duration, arg1: java.time.Duration, arg2: PauseType): T;
    pause<T>(arg0: long): T;
    pause<T>(arg0: long, arg1: PauseType): T;
    pause<T>(arg0: long, arg1: long): T;
    pause<T>(arg0: long, arg1: long, arg2: PauseType): T;
    pause<T>(arg0: string): T;
    pause<T>(arg0: string, arg1: PauseType): T;
    pause<T>(arg0: string, arg1: string): T;
    pause<T>(arg0: string, arg1: string, arg2: PauseType): T;
    randomSwitch<T>(): io.gatling.javaapi.core.condition.RandomSwitch$On<T>;
    randomSwitchOrElse<T>(): io.gatling.javaapi.core.condition.RandomSwitchOrElse$On<T>;
    rendezVous<T>(arg0: int): T;
    repeat<T>(arg0: Func<Session, int | null>): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: Func<Session, int | null>, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: int): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: int, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    roundRobinSwitch<T>(): io.gatling.javaapi.core.condition.RoundRobinSwitch$On<T>;
    stopLoadGenerator<T>(arg0: Func<Session, string>): T;
    stopLoadGenerator<T>(arg0: string): T;
    stopLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: Func<Session, boolean | null>): T;
    stopLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: string): T;
    stopLoadGeneratorIf<T>(arg0: string, arg1: Func<Session, boolean | null>): T;
    stopLoadGeneratorIf<T>(arg0: string, arg1: string): T;
    toChainBuilder(): ChainBuilder;
    toString(): string;
    tryMax<T>(arg0: Func<Session, int | null>): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: Func<Session, int | null>, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: int): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: int, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: string, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    uniformRandomSwitch<T>(): io.gatling.javaapi.core.condition.UniformRandomSwitch$On<T>;
  } // end ChainBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Choice$WithKey /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Choice$WithKey
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Choice$WithWeight /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Choice$WithWeight
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Choice /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Choice
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ClosedInjectionStep$Composite /* extends ClosedInjectionStep*/ {
    asScala(): any /*io.gatling.core.controller.inject.closed.ClosedInjectionStep*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    separatedByRampsLasting(arg0: java.time.Duration): ClosedInjectionStep$Composite;
    separatedByRampsLasting(arg0: long): ClosedInjectionStep$Composite;
    startingFrom(arg0: int): ClosedInjectionStep$Composite;
    toString(): string;
  } // end ClosedInjectionStep$Composite
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ClosedInjectionStep$Constant /* extends java.lang.Object*/ {
    during(arg0: java.time.Duration): ClosedInjectionStep;
    during(arg0: long): ClosedInjectionStep;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end ClosedInjectionStep$Constant
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ClosedInjectionStep$Ramp /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    to(arg0: int): ClosedInjectionStep$RampTo;
    toString(): string;
  } // end ClosedInjectionStep$Ramp
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ClosedInjectionStep$RampTo /* extends java.lang.Object*/ {
    during(arg0: java.time.Duration): ClosedInjectionStep;
    during(arg0: long): ClosedInjectionStep;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end ClosedInjectionStep$RampTo
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ClosedInjectionStep$Stairs /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    times(arg0: int): ClosedInjectionStep$StairsWithTime;
    toString(): string;
  } // end ClosedInjectionStep$Stairs
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ClosedInjectionStep$StairsWithTime /* extends java.lang.Object*/ {
    eachLevelLasting(arg0: java.time.Duration): ClosedInjectionStep$Composite;
    eachLevelLasting(arg0: long): ClosedInjectionStep$Composite;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end ClosedInjectionStep$StairsWithTime
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ClosedInjectionStep /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.core.controller.inject.closed.ClosedInjectionStep*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end ClosedInjectionStep
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ConstantRate$ConstantRateOpenInjectionStep /* extends OpenInjectionStep*/ {
    asScala(): any /*io.gatling.core.controller.inject.open.OpenInjectionStep*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    randomized(): OpenInjectionStep;
    toString(): string;
  } // end ConstantRate$ConstantRateOpenInjectionStep
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class CoreDsl /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end CoreDsl
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Filter$AllowList /* extends Filter<any>*/ {
    asScala<W>(): W;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Filter$AllowList
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Filter$DenyList /* extends Filter<any>*/ {
    asScala<W>(): W;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Filter$DenyList
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Filter<W> /* extends java.lang.Object*/ {
    asScala(): W;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Filter
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class OpenInjectionStep$ConstantRate /* extends java.lang.Object*/ {
    during(arg0: java.time.Duration): ConstantRate$ConstantRateOpenInjectionStep;
    during(arg0: long): ConstantRate$ConstantRateOpenInjectionStep;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end OpenInjectionStep$ConstantRate
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class OpenInjectionStep$Ramp /* extends java.lang.Object*/ {
    during(arg0: java.time.Duration): OpenInjectionStep;
    during(arg0: long): OpenInjectionStep;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end OpenInjectionStep$Ramp
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class OpenInjectionStep$RampRate /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    to(arg0: double): RampRate$During;
    toString(): string;
  } // end OpenInjectionStep$RampRate
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class OpenInjectionStep$Stairs /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    times(arg0: int): Stairs$Times;
    toString(): string;
  } // end OpenInjectionStep$Stairs
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class OpenInjectionStep$StressPeak /* extends java.lang.Object*/ {
    during(arg0: java.time.Duration): OpenInjectionStep;
    during(arg0: long): OpenInjectionStep;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end OpenInjectionStep$StressPeak
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class OpenInjectionStep /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.core.controller.inject.open.OpenInjectionStep*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end OpenInjectionStep
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class PauseType$Custom /* extends PauseType*/ {
    asScala(): any /*io.gatling.core.pause.PauseType*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end PauseType$Custom
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class PauseType$NormalWithPercentageDuration /* extends PauseType*/ {
    asScala(): any /*io.gatling.core.pause.PauseType*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end PauseType$NormalWithPercentageDuration
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class PauseType$NormalWithStdDevDuration /* extends PauseType*/ {
    asScala(): any /*io.gatling.core.pause.PauseType*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end PauseType$NormalWithStdDevDuration
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class PauseType$UniformDuration /* extends PauseType*/ {
    asScala(): any /*io.gatling.core.pause.PauseType*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end PauseType$UniformDuration
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class PauseType$UniformPercentage /* extends PauseType*/ {
    asScala(): any /*io.gatling.core.pause.PauseType*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end PauseType$UniformPercentage
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class PauseType /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.core.pause.PauseType*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end PauseType
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class PopulationBuilder /* extends java.lang.Object*/ {
    andThen(...arg0: PopulationBuilder[]): PopulationBuilder;
    andThen(arg0: java.util.List<PopulationBuilder>): PopulationBuilder;
    asScala(): any /*io.gatling.core.structure.PopulationBuilder*/;
    constantPauses(): PopulationBuilder;
    customPauses(arg0: Func<Session, long | null>): PopulationBuilder;
    disablePauses(): PopulationBuilder;
    equals(arg0: any /*java.lang.Object*/): boolean;
    exponentialPauses(): PopulationBuilder;
    noShard(): PopulationBuilder;
    pauses(arg0: PauseType): PopulationBuilder;
    protocols(...arg0: ProtocolBuilder[]): PopulationBuilder;
    protocols(arg0: java.util.List<ProtocolBuilder>): PopulationBuilder;
    throttle(...arg0: ThrottleStep[]): PopulationBuilder;
    throttle(arg0: java.util.List<ThrottleStep>): PopulationBuilder;
    toString(): string;
    uniformPauses(arg0: double): PopulationBuilder;
    uniformPauses(arg0: java.time.Duration): PopulationBuilder;
  } // end PopulationBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class RampRate$During /* extends java.lang.Object*/ {
    during(arg0: java.time.Duration): RampRate$RampRateOpenInjectionStep;
    during(arg0: long): RampRate$RampRateOpenInjectionStep;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end RampRate$During
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class RampRate$RampRateOpenInjectionStep /* extends OpenInjectionStep*/ {
    asScala(): any /*io.gatling.core.controller.inject.open.OpenInjectionStep*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    randomized(): OpenInjectionStep;
    toString(): string;
  } // end RampRate$RampRateOpenInjectionStep
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ScenarioBuilder /* extends StructureBuilder<any, any>*/ {
    asLongAs<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: Func<Session, boolean | null>, arg1: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: Func<Session, boolean | null>, arg1: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(
      arg0: Func<Session, boolean | null>,
      arg1: string,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: java.time.Duration): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: long): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: long, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: long, arg2: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring<T>(
      arg0: string,
      arg1: string,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    crashLoadGenerator<T>(arg0: Func<Session, string>): T;
    crashLoadGenerator<T>(arg0: string): T;
    crashLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: Func<Session, boolean | null>): T;
    crashLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: string): T;
    crashLoadGeneratorIf<T>(arg0: string, arg1: Func<Session, boolean | null>): T;
    crashLoadGeneratorIf<T>(arg0: string, arg1: string): T;
    doIf<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.condition.DoIf$Then<T>;
    doIf<T>(arg0: string): io.gatling.javaapi.core.condition.DoIf$Then<T>;
    doIfEquals<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(
      arg0: string,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(arg0: string, arg1: any /*java.lang.Object*/): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals<T>(arg0: string, arg1: string): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: string,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(
      arg0: string,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse<T>(arg0: string, arg1: string): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfOrElse<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.condition.DoIfOrElse$Then<T>;
    doIfOrElse<T>(arg0: string): io.gatling.javaapi.core.condition.DoIfOrElse$Then<T>;
    doSwitch<T>(arg0: Func<Session, any /*java.lang.Object*/>): io.gatling.javaapi.core.condition.DoSwitch$On<T>;
    doSwitch<T>(arg0: string): io.gatling.javaapi.core.condition.DoSwitch$On<T>;
    doSwitchOrElse<T>(
      arg0: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<T>;
    doSwitchOrElse<T>(arg0: string): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<T>;
    doWhile<T>(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile<T>(arg0: Func<Session, boolean | null>, arg1: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile<T>(arg0: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: Func<Session, boolean | null>, arg1: long): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: java.time.Duration): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: long): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: long, arg2: boolean): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: long, arg2: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring<T>(
      arg0: string,
      arg1: string,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    during<T>(arg0: Func<Session, java.time.Duration>): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: Func<Session, java.time.Duration>, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: Func<Session, java.time.Duration>, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(
      arg0: Func<Session, java.time.Duration>,
      arg1: string,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: java.time.Duration, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: long, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during<T>(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    exec<T>(arg0: Func<Session, Session>): T;
    exec<T>(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    exec<T>(arg0: java.util.List<ChainBuilder>): T;
    exitBlockOnFail<T>(): io.gatling.javaapi.core.error.Errors$ExitBlockOnFail<T>;
    exitHere<T>(): T;
    exitHereIf<T>(arg0: Func<Session, boolean | null>): T;
    exitHereIf<T>(arg0: string): T;
    exitHereIfFailed<T>(): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: Func<Session, int | null>): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: int): T;
    feed<T>(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: string): T;
    feed<T>(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>): T;
    feed<T>(
      arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>,
      arg1: Func<Session, int | null>
    ): T;
    feed<T>(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: int): T;
    feed<T>(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: string): T;
    feed<T>(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>): T;
    feed<T>(
      arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>,
      arg1: Func<Session, int | null>
    ): T;
    feed<T>(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: int): T;
    feed<T>(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: string): T;
    foreach<T>(
      arg0: Func<Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(
      arg0: Func<Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string,
      arg2: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(
      arg0: java.util.List<any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(
      arg0: java.util.List<any /*java.lang.Object*/>,
      arg1: string,
      arg2: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach<T>(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.ForEach$On<T>;
    forever<T>(): io.gatling.javaapi.core.loop.Forever$On<T>;
    forever<T>(arg0: string): io.gatling.javaapi.core.loop.Forever$On<T>;
    group<T>(arg0: Func<Session, string>): io.gatling.javaapi.core.group.Groups$On<T>;
    group<T>(arg0: string): io.gatling.javaapi.core.group.Groups$On<T>;
    injectClosed(...arg0: ClosedInjectionStep[]): PopulationBuilder;
    injectClosed(arg0: java.util.List<ClosedInjectionStep>): PopulationBuilder;
    injectOpen(...arg0: OpenInjectionStep[]): PopulationBuilder;
    injectOpen(arg0: java.util.List<OpenInjectionStep>): PopulationBuilder;
    pace<T>(arg0: Func<Session, java.time.Duration>): T;
    pace<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>): T;
    pace<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>, arg2: string): T;
    pace<T>(arg0: Func<Session, java.time.Duration>, arg1: string): T;
    pace<T>(arg0: java.time.Duration): T;
    pace<T>(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pace<T>(arg0: java.time.Duration, arg1: java.time.Duration, arg2: string): T;
    pace<T>(arg0: java.time.Duration, arg1: string): T;
    pace<T>(arg0: long): T;
    pace<T>(arg0: long, arg1: long): T;
    pace<T>(arg0: long, arg1: long, arg2: string): T;
    pace<T>(arg0: long, arg1: string): T;
    pace<T>(arg0: string): T;
    pace<T>(arg0: string, arg1: string): T;
    pace<T>(arg0: string, arg1: string, arg2: string): T;
    pause<T>(arg0: Func<Session, java.time.Duration>): T;
    pause<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>): T;
    pause<T>(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>, arg2: PauseType): T;
    pause<T>(arg0: Func<Session, java.time.Duration>, arg1: PauseType): T;
    pause<T>(arg0: java.time.Duration): T;
    pause<T>(arg0: java.time.Duration, arg1: PauseType): T;
    pause<T>(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pause<T>(arg0: java.time.Duration, arg1: java.time.Duration, arg2: PauseType): T;
    pause<T>(arg0: long): T;
    pause<T>(arg0: long, arg1: PauseType): T;
    pause<T>(arg0: long, arg1: long): T;
    pause<T>(arg0: long, arg1: long, arg2: PauseType): T;
    pause<T>(arg0: string): T;
    pause<T>(arg0: string, arg1: PauseType): T;
    pause<T>(arg0: string, arg1: string): T;
    pause<T>(arg0: string, arg1: string, arg2: PauseType): T;
    randomSwitch<T>(): io.gatling.javaapi.core.condition.RandomSwitch$On<T>;
    randomSwitchOrElse<T>(): io.gatling.javaapi.core.condition.RandomSwitchOrElse$On<T>;
    rendezVous<T>(arg0: int): T;
    repeat<T>(arg0: Func<Session, int | null>): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: Func<Session, int | null>, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: int): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: int, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat<T>(arg0: string, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    roundRobinSwitch<T>(): io.gatling.javaapi.core.condition.RoundRobinSwitch$On<T>;
    stopLoadGenerator<T>(arg0: Func<Session, string>): T;
    stopLoadGenerator<T>(arg0: string): T;
    stopLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: Func<Session, boolean | null>): T;
    stopLoadGeneratorIf<T>(arg0: Func<Session, string>, arg1: string): T;
    stopLoadGeneratorIf<T>(arg0: string, arg1: Func<Session, boolean | null>): T;
    stopLoadGeneratorIf<T>(arg0: string, arg1: string): T;
    toString(): string;
    tryMax<T>(arg0: Func<Session, int | null>): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: Func<Session, int | null>, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: int): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: int, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax<T>(arg0: string, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    uniformRandomSwitch<T>(): io.gatling.javaapi.core.condition.UniformRandomSwitch$On<T>;
  } // end ScenarioBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Session /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.core.session.Session*/;
    contains(arg0: string): boolean;
    equals(arg0: any /*java.lang.Object*/): boolean;
    get<T>(arg0: string): T;
    getBoolean(arg0: string): boolean;
    getBooleanWrapper(arg0: string): boolean | null;
    getDouble(arg0: string): double;
    getDoubleWrapper(arg0: string): double | null;
    getInt(arg0: string): int;
    getIntegerWrapper(arg0: string): int | null;
    getList<T>(arg0: string): java.util.List<T>;
    getLong(arg0: string): long;
    getLongWrapper(arg0: string): long | null;
    getMap<T>(arg0: string): java.util.Map<string, T>;
    getSet<T>(arg0: string): java.util.Set<T>;
    getString(arg0: string): string;
    groups(): java.util.List<string>;
    isFailed(): boolean;
    markAsFailed(): Session;
    markAsSucceeded(): Session;
    remove(arg0: string): Session;
    removeAll(...arg0: string[]): Session;
    reset(): Session;
    scenario(): string;
    set(arg0: string, arg1: any /*java.lang.Object*/): Session;
    setAll(arg0: java.util.Map<string, any /*java.lang.Object*/>): Session;
    toString(): string;
    userId(): long;
  } // end Session
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Simulation$SetUp /* extends java.lang.Object*/ {
    assertions(...arg0: Assertion[]): Simulation$SetUp;
    assertions(arg0: java.util.List<Assertion>): Simulation$SetUp;
    constantPauses(): Simulation$SetUp;
    customPauses(arg0: Func<Session, long | null>): Simulation$SetUp;
    disablePauses(): Simulation$SetUp;
    equals(arg0: any /*java.lang.Object*/): boolean;
    exponentialPauses(): Simulation$SetUp;
    maxDuration(arg0: java.time.Duration): Simulation$SetUp;
    maxDuration(arg0: long): Simulation$SetUp;
    normalPausesWithPercentageDuration(arg0: double): Simulation$SetUp;
    normalPausesWithStdDevDuration(arg0: java.time.Duration): Simulation$SetUp;
    pauses(arg0: PauseType): Simulation$SetUp;
    protocols(...arg0: ProtocolBuilder[]): Simulation$SetUp;
    protocols(arg0: java.util.List<ProtocolBuilder>): Simulation$SetUp;
    throttle(...arg0: ThrottleStep[]): Simulation$SetUp;
    throttle(arg0: java.util.List<ThrottleStep>): Simulation$SetUp;
    toString(): string;
    uniformPauses(arg0: double): Simulation$SetUp;
    uniformPauses(arg0: java.time.Duration): Simulation$SetUp;
  } // end Simulation$SetUp
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Simulation /* extends java.lang.Object*/ {
    after(): void;
    before(): void;
    equals(arg0: any /*java.lang.Object*/): boolean;
    params(
      arg0: any /*io.gatling.core.config.GatlingConfiguration*/
    ): any /*io.gatling.core.scenario.SimulationParams*/;
    setUp(...arg0: PopulationBuilder[]): Simulation$SetUp;
    setUp(arg0: java.util.List<PopulationBuilder>): Simulation$SetUp;
    toString(): string;
  } // end Simulation
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Stairs$Composite /* extends OpenInjectionStep*/ {
    asScala(): any /*io.gatling.core.controller.inject.open.OpenInjectionStep*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    separatedByRampsLasting(arg0: java.time.Duration): Stairs$Composite;
    separatedByRampsLasting(arg0: long): Stairs$Composite;
    startingFrom(arg0: double): Stairs$Composite;
    toString(): string;
  } // end Stairs$Composite
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class Stairs$Times /* extends java.lang.Object*/ {
    eachLevelLasting(arg0: java.time.Duration): Stairs$Composite;
    eachLevelLasting(arg0: long): Stairs$Composite;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Stairs$Times
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class StructureBuilder<
    T,
    W
  > /* extends java.lang.Object implements io.gatling.javaapi.core.exec.Execs<T, W>, io.gatling.javaapi.core.group.Groups<T, W>, io.gatling.javaapi.core.feed.Feeds<T, W>, io.gatling.javaapi.core.pause.Pauses<T, W>, io.gatling.javaapi.core.pause.Paces<T, W>, io.gatling.javaapi.core.pause.RendezVous<T, W>, io.gatling.javaapi.core.loop.Repeat<T, W>, io.gatling.javaapi.core.loop.ForEach<T, W>, io.gatling.javaapi.core.loop.During<T, W>, io.gatling.javaapi.core.loop.Forever<T, W>, io.gatling.javaapi.core.loop.AsLongAs<T, W>, io.gatling.javaapi.core.loop.DoWhile<T, W>, io.gatling.javaapi.core.loop.AsLongAsDuring<T, W>, io.gatling.javaapi.core.loop.DoWhileDuring<T, W>, io.gatling.javaapi.core.condition.DoIf<T, W>, io.gatling.javaapi.core.condition.DoIfOrElse<T, W>, io.gatling.javaapi.core.condition.DoIfEquals<T, W>, io.gatling.javaapi.core.condition.DoIfEqualsOrElse<T, W>, io.gatling.javaapi.core.condition.DoSwitch<T, W>, io.gatling.javaapi.core.condition.DoSwitchOrElse<T, W>, io.gatling.javaapi.core.condition.RandomSwitch<T, W>, io.gatling.javaapi.core.condition.RandomSwitchOrElse<T, W>, io.gatling.javaapi.core.condition.UniformRandomSwitch<T, W>, io.gatling.javaapi.core.condition.RoundRobinSwitch<T, W>, io.gatling.javaapi.core.error.Errors<T, W>*/ {
    asLongAs(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs(arg0: Func<Session, boolean | null>, arg1: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs(arg0: Func<Session, boolean | null>, arg1: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs(
      arg0: Func<Session, boolean | null>,
      arg1: string,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs(arg0: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs(arg0: string, arg1: string): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAs(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: Func<Session, boolean | null>, arg1: long): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: java.time.Duration): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: long): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: long, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: long, arg2: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: string,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<T>;
    crashLoadGenerator(arg0: Func<Session, string>): T;
    crashLoadGenerator(arg0: string): T;
    crashLoadGeneratorIf(arg0: Func<Session, string>, arg1: Func<Session, boolean | null>): T;
    crashLoadGeneratorIf(arg0: Func<Session, string>, arg1: string): T;
    crashLoadGeneratorIf(arg0: string, arg1: Func<Session, boolean | null>): T;
    crashLoadGeneratorIf(arg0: string, arg1: string): T;
    doIf(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.condition.DoIf$Then<T>;
    doIf(arg0: string): io.gatling.javaapi.core.condition.DoIf$Then<T>;
    doIfEquals(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals(
      arg0: string,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals(arg0: string, arg1: any /*java.lang.Object*/): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEquals(arg0: string, arg1: string): io.gatling.javaapi.core.condition.DoIfEquals$Then<T>;
    doIfEqualsOrElse(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(
      arg0: Func<Session, any /*java.lang.Object*/>,
      arg1: string
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(
      arg0: string,
      arg1: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(
      arg0: string,
      arg1: any /*java.lang.Object*/
    ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(arg0: string, arg1: string): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<T>;
    doIfOrElse(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.condition.DoIfOrElse$Then<T>;
    doIfOrElse(arg0: string): io.gatling.javaapi.core.condition.DoIfOrElse$Then<T>;
    doSwitch(arg0: Func<Session, any /*java.lang.Object*/>): io.gatling.javaapi.core.condition.DoSwitch$On<T>;
    doSwitch(arg0: string): io.gatling.javaapi.core.condition.DoSwitch$On<T>;
    doSwitchOrElse(
      arg0: Func<Session, any /*java.lang.Object*/>
    ): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<T>;
    doSwitchOrElse(arg0: string): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<T>;
    doWhile(arg0: Func<Session, boolean | null>): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile(arg0: Func<Session, boolean | null>, arg1: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile(arg0: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhile(arg0: string, arg1: string): io.gatling.javaapi.core.loop.DoWhile$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: Func<Session, boolean | null>, arg1: long): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: Func<Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: java.time.Duration): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: java.time.Duration,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: long): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: long, arg2: boolean): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: long, arg2: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: string,
      arg2: string,
      arg3: boolean
    ): io.gatling.javaapi.core.loop.DoWhileDuring$On<T>;
    during(arg0: Func<Session, java.time.Duration>): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: Func<Session, java.time.Duration>, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: Func<Session, java.time.Duration>, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during(
      arg0: Func<Session, java.time.Duration>,
      arg1: string,
      arg2: boolean
    ): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: java.time.Duration): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: java.time.Duration, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: java.time.Duration, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: java.time.Duration, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: long): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: long, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: long, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: long, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: string): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: string, arg1: string): io.gatling.javaapi.core.loop.During$On<T>;
    during(arg0: string, arg1: string, arg2: boolean): io.gatling.javaapi.core.loop.During$On<T>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    exec(arg0: Func<Session, Session>): T;
    exec(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    exec(arg0: java.util.List<ChainBuilder>): T;
    exitBlockOnFail(): io.gatling.javaapi.core.error.Errors$ExitBlockOnFail<T>;
    exitHere(): T;
    exitHereIf(arg0: Func<Session, boolean | null>): T;
    exitHereIf(arg0: string): T;
    exitHereIfFailed(): T;
    feed(arg0: FeederBuilder<any /*java.lang.Object*/>): T;
    feed(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: Func<Session, int | null>): T;
    feed(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: int): T;
    feed(arg0: FeederBuilder<any /*java.lang.Object*/>, arg1: string): T;
    feed(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>): T;
    feed(
      arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>,
      arg1: Func<Session, int | null>
    ): T;
    feed(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: int): T;
    feed(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: string): T;
    feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>): T;
    feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: Func<Session, int | null>): T;
    feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: int): T;
    feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: string): T;
    foreach(
      arg0: Func<Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach(
      arg0: Func<Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string,
      arg2: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach(arg0: java.util.List<any /*java.lang.Object*/>, arg1: string): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach(
      arg0: java.util.List<any /*java.lang.Object*/>,
      arg1: string,
      arg2: string
    ): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach(arg0: string, arg1: string): io.gatling.javaapi.core.loop.ForEach$On<T>;
    foreach(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.loop.ForEach$On<T>;
    forever(): io.gatling.javaapi.core.loop.Forever$On<T>;
    forever(arg0: string): io.gatling.javaapi.core.loop.Forever$On<T>;
    group(arg0: Func<Session, string>): io.gatling.javaapi.core.group.Groups$On<T>;
    group(arg0: string): io.gatling.javaapi.core.group.Groups$On<T>;
    pace(arg0: Func<Session, java.time.Duration>): T;
    pace(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>): T;
    pace(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>, arg2: string): T;
    pace(arg0: Func<Session, java.time.Duration>, arg1: string): T;
    pace(arg0: java.time.Duration): T;
    pace(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pace(arg0: java.time.Duration, arg1: java.time.Duration, arg2: string): T;
    pace(arg0: java.time.Duration, arg1: string): T;
    pace(arg0: long): T;
    pace(arg0: long, arg1: long): T;
    pace(arg0: long, arg1: long, arg2: string): T;
    pace(arg0: long, arg1: string): T;
    pace(arg0: string): T;
    pace(arg0: string, arg1: string): T;
    pace(arg0: string, arg1: string, arg2: string): T;
    pause(arg0: Func<Session, java.time.Duration>): T;
    pause(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>): T;
    pause(arg0: Func<Session, java.time.Duration>, arg1: Func<Session, java.time.Duration>, arg2: PauseType): T;
    pause(arg0: Func<Session, java.time.Duration>, arg1: PauseType): T;
    pause(arg0: java.time.Duration): T;
    pause(arg0: java.time.Duration, arg1: PauseType): T;
    pause(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pause(arg0: java.time.Duration, arg1: java.time.Duration, arg2: PauseType): T;
    pause(arg0: long): T;
    pause(arg0: long, arg1: PauseType): T;
    pause(arg0: long, arg1: long): T;
    pause(arg0: long, arg1: long, arg2: PauseType): T;
    pause(arg0: string): T;
    pause(arg0: string, arg1: PauseType): T;
    pause(arg0: string, arg1: string): T;
    pause(arg0: string, arg1: string, arg2: PauseType): T;
    randomSwitch(): io.gatling.javaapi.core.condition.RandomSwitch$On<T>;
    randomSwitchOrElse(): io.gatling.javaapi.core.condition.RandomSwitchOrElse$On<T>;
    rendezVous(arg0: int): T;
    repeat(arg0: Func<Session, int | null>): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat(arg0: Func<Session, int | null>, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat(arg0: int): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat(arg0: int, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat(arg0: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    repeat(arg0: string, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<T>;
    roundRobinSwitch(): io.gatling.javaapi.core.condition.RoundRobinSwitch$On<T>;
    stopLoadGenerator(arg0: Func<Session, string>): T;
    stopLoadGenerator(arg0: string): T;
    stopLoadGeneratorIf(arg0: Func<Session, string>, arg1: Func<Session, boolean | null>): T;
    stopLoadGeneratorIf(arg0: Func<Session, string>, arg1: string): T;
    stopLoadGeneratorIf(arg0: string, arg1: Func<Session, boolean | null>): T;
    stopLoadGeneratorIf(arg0: string, arg1: string): T;
    toString(): string;
    tryMax(arg0: Func<Session, int | null>): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax(arg0: Func<Session, int | null>, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax(arg0: int): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax(arg0: int, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax(arg0: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    tryMax(arg0: string, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<T>;
    uniformRandomSwitch(): io.gatling.javaapi.core.condition.UniformRandomSwitch$On<T>;
  } // end StructureBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ThrottleStep$ReachIntermediate /* extends java.lang.Object*/ {
    during(arg0: java.time.Duration): ThrottleStep;
    during(arg0: long): ThrottleStep;
    equals(arg0: any /*java.lang.Object*/): boolean;
    in(arg0: java.time.Duration): ThrottleStep;
    in(arg0: long): ThrottleStep;
    toString(): string;
  } // end ThrottleStep$ReachIntermediate
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class ThrottleStep /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.core.controller.throttle.ThrottleStep*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end ThrottleStep
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class WithKey$Then /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(
      arg0: io.gatling.javaapi.core.exec.Executable,
      ...arg1: io.gatling.javaapi.core.exec.Executable[]
    ): Choice$WithKey;
    toString(): string;
  } // end WithKey$Then
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  class WithWeight$Then /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(
      arg0: io.gatling.javaapi.core.exec.Executable,
      ...arg1: io.gatling.javaapi.core.exec.Executable[]
    ): Choice$WithWeight;
    toString(): string;
  } // end WithWeight$Then
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface ActionBuilder /* extends io.gatling.javaapi.core.exec.Executable*/ {
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    toChainBuilder(): ChainBuilder;
  } // end ActionBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
  } // end CheckBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder$CaptureGroupCheckBuilder /* extends CheckBuilder$MultipleFind<any>*/ {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    captureGroups(arg0: int): CheckBuilder$MultipleFind<java.util.List<string>>;
    count(): CheckBuilder$Validate<int | null>;
    exists(): CheckBuilder$Final;
    find<JavaX>(): CheckBuilder$Validate<JavaX>;
    find<JavaX>(arg0: int): CheckBuilder$Validate<JavaX>;
    findAll<JavaX>(): CheckBuilder$Validate<java.util.List<JavaX>>;
    findRandom<JavaX>(): CheckBuilder$Validate<JavaX>;
    findRandom<JavaX>(arg0: int): CheckBuilder$Validate<java.util.List<JavaX>>;
    findRandom<JavaX>(arg0: int, arg1: boolean): CheckBuilder$Validate<java.util.List<JavaX>>;
    gt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gt<X>(arg0: X): CheckBuilder$Final;
    gtEL(arg0: string): CheckBuilder$Final;
    gte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gte<X>(arg0: X): CheckBuilder$Final;
    gteEL(arg0: string): CheckBuilder$Final;
    in<X>(...arg0: X[]): CheckBuilder$Final;
    in<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    in<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    inEL(arg0: string): CheckBuilder$Final;
    is<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    is<X>(arg0: X): CheckBuilder$Final;
    isEL(arg0: string): CheckBuilder$Final;
    isNull(): CheckBuilder$Final;
    lt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lt<X>(arg0: X): CheckBuilder$Final;
    ltEL(arg0: string): CheckBuilder$Final;
    lte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lte<X>(arg0: X): CheckBuilder$Final;
    lteEL(arg0: string): CheckBuilder$Final;
    name(arg0: string): CheckBuilder$Final;
    not<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    not<X>(arg0: X): CheckBuilder$Final;
    notEL(arg0: string): CheckBuilder$Final;
    notExists(): CheckBuilder$Final;
    notNull(): CheckBuilder$Final;
    optional(): CheckBuilder$Final;
    saveAs(arg0: string): CheckBuilder$Final;
    shouldBe<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    shouldBe<X>(arg0: X): CheckBuilder$Final;
    transform<X, X2>(arg0: Func<X, X2>): CheckBuilder$Validate<X2>;
    transformWithSession<X, X2>(arg0: BiFunction<X, Session, X2>): CheckBuilder$Validate<X2>;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
    validate<X>(arg0: string, arg1: BiFunction<X, Session, X>): CheckBuilder$Final;
    withDefault<X>(arg0: Func<Session, X>): CheckBuilder$Validate<X>;
    withDefault<X>(arg0: X): CheckBuilder$Validate<X>;
    withDefaultEl<X>(arg0: string): CheckBuilder$Validate<X>;
    within<X>(...arg0: X[]): CheckBuilder$Final;
    within<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    within<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    withinEL(arg0: string): CheckBuilder$Final;
  } // end CheckBuilder$CaptureGroupCheckBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder$Final /* extends CheckBuilder*/ {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    name(arg0: string): CheckBuilder$Final;
    saveAs(arg0: string): CheckBuilder$Final;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
  } // end CheckBuilder$Final
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder$Find<JavaX> /* extends CheckBuilder$Validate<JavaX>*/ {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    exists(): CheckBuilder$Final;
    find(): CheckBuilder$Validate<JavaX>;
    gt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gt<X>(arg0: X): CheckBuilder$Final;
    gtEL(arg0: string): CheckBuilder$Final;
    gte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gte<X>(arg0: X): CheckBuilder$Final;
    gteEL(arg0: string): CheckBuilder$Final;
    in<X>(...arg0: X[]): CheckBuilder$Final;
    in<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    in<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    inEL(arg0: string): CheckBuilder$Final;
    is<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    is<X>(arg0: X): CheckBuilder$Final;
    isEL(arg0: string): CheckBuilder$Final;
    isNull(): CheckBuilder$Final;
    lt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lt<X>(arg0: X): CheckBuilder$Final;
    ltEL(arg0: string): CheckBuilder$Final;
    lte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lte<X>(arg0: X): CheckBuilder$Final;
    lteEL(arg0: string): CheckBuilder$Final;
    name(arg0: string): CheckBuilder$Final;
    not<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    not<X>(arg0: X): CheckBuilder$Final;
    notEL(arg0: string): CheckBuilder$Final;
    notExists(): CheckBuilder$Final;
    notNull(): CheckBuilder$Final;
    optional(): CheckBuilder$Final;
    saveAs(arg0: string): CheckBuilder$Final;
    shouldBe<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    shouldBe<X>(arg0: X): CheckBuilder$Final;
    transform<X, X2>(arg0: Func<X, X2>): CheckBuilder$Validate<X2>;
    transformWithSession<X, X2>(arg0: BiFunction<X, Session, X2>): CheckBuilder$Validate<X2>;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
    validate<X>(arg0: string, arg1: BiFunction<X, Session, X>): CheckBuilder$Final;
    withDefault<X>(arg0: Func<Session, X>): CheckBuilder$Validate<X>;
    withDefault<X>(arg0: X): CheckBuilder$Validate<X>;
    withDefaultEl<X>(arg0: string): CheckBuilder$Validate<X>;
    within<X>(...arg0: X[]): CheckBuilder$Final;
    within<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    within<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    withinEL(arg0: string): CheckBuilder$Final;
  } // end CheckBuilder$Find
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder$JsonOfTypeFind /* extends CheckBuilder$Find<any>*/ {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    exists(): CheckBuilder$Final;
    find<JavaX>(): CheckBuilder$Validate<JavaX>;
    gt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gt<X>(arg0: X): CheckBuilder$Final;
    gtEL(arg0: string): CheckBuilder$Final;
    gte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gte<X>(arg0: X): CheckBuilder$Final;
    gteEL(arg0: string): CheckBuilder$Final;
    in<X>(...arg0: X[]): CheckBuilder$Final;
    in<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    in<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    inEL(arg0: string): CheckBuilder$Final;
    is<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    is<X>(arg0: X): CheckBuilder$Final;
    isEL(arg0: string): CheckBuilder$Final;
    isNull(): CheckBuilder$Final;
    lt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lt<X>(arg0: X): CheckBuilder$Final;
    ltEL(arg0: string): CheckBuilder$Final;
    lte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lte<X>(arg0: X): CheckBuilder$Final;
    lteEL(arg0: string): CheckBuilder$Final;
    name(arg0: string): CheckBuilder$Final;
    not<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    not<X>(arg0: X): CheckBuilder$Final;
    notEL(arg0: string): CheckBuilder$Final;
    notExists(): CheckBuilder$Final;
    notNull(): CheckBuilder$Final;
    ofBoolean(): CheckBuilder$Find<boolean | null>;
    ofDouble(): CheckBuilder$Find<double | null>;
    ofInt(): CheckBuilder$Find<int | null>;
    ofList(): CheckBuilder$Find<java.util.List<any /*java.lang.Object*/>>;
    ofLong(): CheckBuilder$Find<long | null>;
    ofMap(): CheckBuilder$Find<java.util.Map<string, any /*java.lang.Object*/>>;
    ofObject(): CheckBuilder$Find<any /*java.lang.Object*/>;
    ofString(): CheckBuilder$Find<string>;
    optional(): CheckBuilder$Final;
    saveAs(arg0: string): CheckBuilder$Final;
    shouldBe<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    shouldBe<X>(arg0: X): CheckBuilder$Final;
    transform<X, X2>(arg0: Func<X, X2>): CheckBuilder$Validate<X2>;
    transformWithSession<X, X2>(arg0: BiFunction<X, Session, X2>): CheckBuilder$Validate<X2>;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
    validate<X>(arg0: string, arg1: BiFunction<X, Session, X>): CheckBuilder$Final;
    withDefault<X>(arg0: Func<Session, X>): CheckBuilder$Validate<X>;
    withDefault<X>(arg0: X): CheckBuilder$Validate<X>;
    withDefaultEl<X>(arg0: string): CheckBuilder$Validate<X>;
    within<X>(...arg0: X[]): CheckBuilder$Final;
    within<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    within<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    withinEL(arg0: string): CheckBuilder$Final;
  } // end CheckBuilder$JsonOfTypeFind
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder$JsonOfTypeMultipleFind /* extends CheckBuilder$MultipleFind<any>*/ {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    count(): CheckBuilder$Validate<int | null>;
    exists(): CheckBuilder$Final;
    find<JavaX>(): CheckBuilder$Validate<JavaX>;
    find<JavaX>(arg0: int): CheckBuilder$Validate<JavaX>;
    findAll<JavaX>(): CheckBuilder$Validate<java.util.List<JavaX>>;
    findRandom<JavaX>(): CheckBuilder$Validate<JavaX>;
    findRandom<JavaX>(arg0: int): CheckBuilder$Validate<java.util.List<JavaX>>;
    findRandom<JavaX>(arg0: int, arg1: boolean): CheckBuilder$Validate<java.util.List<JavaX>>;
    gt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gt<X>(arg0: X): CheckBuilder$Final;
    gtEL(arg0: string): CheckBuilder$Final;
    gte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gte<X>(arg0: X): CheckBuilder$Final;
    gteEL(arg0: string): CheckBuilder$Final;
    in<X>(...arg0: X[]): CheckBuilder$Final;
    in<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    in<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    inEL(arg0: string): CheckBuilder$Final;
    is<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    is<X>(arg0: X): CheckBuilder$Final;
    isEL(arg0: string): CheckBuilder$Final;
    isNull(): CheckBuilder$Final;
    lt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lt<X>(arg0: X): CheckBuilder$Final;
    ltEL(arg0: string): CheckBuilder$Final;
    lte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lte<X>(arg0: X): CheckBuilder$Final;
    lteEL(arg0: string): CheckBuilder$Final;
    name(arg0: string): CheckBuilder$Final;
    not<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    not<X>(arg0: X): CheckBuilder$Final;
    notEL(arg0: string): CheckBuilder$Final;
    notExists(): CheckBuilder$Final;
    notNull(): CheckBuilder$Final;
    ofBoolean(): CheckBuilder$MultipleFind<boolean | null>;
    ofDouble(): CheckBuilder$MultipleFind<double | null>;
    ofInt(): CheckBuilder$MultipleFind<int | null>;
    ofList(): CheckBuilder$MultipleFind<java.util.List<any /*java.lang.Object*/>>;
    ofLong(): CheckBuilder$MultipleFind<long | null>;
    ofMap(): CheckBuilder$MultipleFind<java.util.Map<string, any /*java.lang.Object*/>>;
    ofObject(): CheckBuilder$MultipleFind<any /*java.lang.Object*/>;
    ofString(): CheckBuilder$MultipleFind<string>;
    optional(): CheckBuilder$Final;
    saveAs(arg0: string): CheckBuilder$Final;
    shouldBe<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    shouldBe<X>(arg0: X): CheckBuilder$Final;
    transform<X, X2>(arg0: Func<X, X2>): CheckBuilder$Validate<X2>;
    transformWithSession<X, X2>(arg0: BiFunction<X, Session, X2>): CheckBuilder$Validate<X2>;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
    validate<X>(arg0: string, arg1: BiFunction<X, Session, X>): CheckBuilder$Final;
    withDefault<X>(arg0: Func<Session, X>): CheckBuilder$Validate<X>;
    withDefault<X>(arg0: X): CheckBuilder$Validate<X>;
    withDefaultEl<X>(arg0: string): CheckBuilder$Validate<X>;
    within<X>(...arg0: X[]): CheckBuilder$Final;
    within<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    within<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    withinEL(arg0: string): CheckBuilder$Final;
  } // end CheckBuilder$JsonOfTypeMultipleFind
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder$MultipleFind<JavaX> /* extends CheckBuilder$Find<JavaX>*/ {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    count(): CheckBuilder$Validate<int | null>;
    exists(): CheckBuilder$Final;
    find(): CheckBuilder$Validate<JavaX>;
    find(arg0: int): CheckBuilder$Validate<JavaX>;
    findAll(): CheckBuilder$Validate<java.util.List<JavaX>>;
    findRandom(): CheckBuilder$Validate<JavaX>;
    findRandom(arg0: int): CheckBuilder$Validate<java.util.List<JavaX>>;
    findRandom(arg0: int, arg1: boolean): CheckBuilder$Validate<java.util.List<JavaX>>;
    gt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gt<X>(arg0: X): CheckBuilder$Final;
    gtEL(arg0: string): CheckBuilder$Final;
    gte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    gte<X>(arg0: X): CheckBuilder$Final;
    gteEL(arg0: string): CheckBuilder$Final;
    in<X>(...arg0: X[]): CheckBuilder$Final;
    in<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    in<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    inEL(arg0: string): CheckBuilder$Final;
    is<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    is<X>(arg0: X): CheckBuilder$Final;
    isEL(arg0: string): CheckBuilder$Final;
    isNull(): CheckBuilder$Final;
    lt<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lt<X>(arg0: X): CheckBuilder$Final;
    ltEL(arg0: string): CheckBuilder$Final;
    lte<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    lte<X>(arg0: X): CheckBuilder$Final;
    lteEL(arg0: string): CheckBuilder$Final;
    name(arg0: string): CheckBuilder$Final;
    not<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    not<X>(arg0: X): CheckBuilder$Final;
    notEL(arg0: string): CheckBuilder$Final;
    notExists(): CheckBuilder$Final;
    notNull(): CheckBuilder$Final;
    optional(): CheckBuilder$Final;
    saveAs(arg0: string): CheckBuilder$Final;
    shouldBe<X>(arg0: Func<Session, X>): CheckBuilder$Final;
    shouldBe<X>(arg0: X): CheckBuilder$Final;
    transform<X, X2>(arg0: Func<X, X2>): CheckBuilder$Validate<X2>;
    transformWithSession<X, X2>(arg0: BiFunction<X, Session, X2>): CheckBuilder$Validate<X2>;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
    validate<X>(arg0: string, arg1: BiFunction<X, Session, X>): CheckBuilder$Final;
    withDefault<X>(arg0: Func<Session, X>): CheckBuilder$Validate<X>;
    withDefault<X>(arg0: X): CheckBuilder$Validate<X>;
    withDefaultEl<X>(arg0: string): CheckBuilder$Validate<X>;
    within<X>(...arg0: X[]): CheckBuilder$Final;
    within<X>(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    within<X>(arg0: java.util.List<X>): CheckBuilder$Final;
    withinEL(arg0: string): CheckBuilder$Final;
  } // end CheckBuilder$MultipleFind
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface CheckBuilder$Validate<X> /* extends CheckBuilder$Final*/ {
    asScala(): any /*io.gatling.core.check.CheckBuilder*/;
    exists(): CheckBuilder$Final;
    gt(arg0: Func<Session, X>): CheckBuilder$Final;
    gt(arg0: X): CheckBuilder$Final;
    gtEL(arg0: string): CheckBuilder$Final;
    gte(arg0: Func<Session, X>): CheckBuilder$Final;
    gte(arg0: X): CheckBuilder$Final;
    gteEL(arg0: string): CheckBuilder$Final;
    in(...arg0: X[]): CheckBuilder$Final;
    in(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    in(arg0: java.util.List<X>): CheckBuilder$Final;
    inEL(arg0: string): CheckBuilder$Final;
    is(arg0: Func<Session, X>): CheckBuilder$Final;
    is(arg0: X): CheckBuilder$Final;
    isEL(arg0: string): CheckBuilder$Final;
    isNull(): CheckBuilder$Final;
    lt(arg0: Func<Session, X>): CheckBuilder$Final;
    lt(arg0: X): CheckBuilder$Final;
    ltEL(arg0: string): CheckBuilder$Final;
    lte(arg0: Func<Session, X>): CheckBuilder$Final;
    lte(arg0: X): CheckBuilder$Final;
    lteEL(arg0: string): CheckBuilder$Final;
    name(arg0: string): CheckBuilder$Final;
    not(arg0: Func<Session, X>): CheckBuilder$Final;
    not(arg0: X): CheckBuilder$Final;
    notEL(arg0: string): CheckBuilder$Final;
    notExists(): CheckBuilder$Final;
    notNull(): CheckBuilder$Final;
    optional(): CheckBuilder$Final;
    saveAs(arg0: string): CheckBuilder$Final;
    shouldBe(arg0: Func<Session, X>): CheckBuilder$Final;
    shouldBe(arg0: X): CheckBuilder$Final;
    transform<X2>(arg0: Func<X, X2>): CheckBuilder$Validate<X2>;
    transformWithSession<X2>(arg0: BiFunction<X, Session, X2>): CheckBuilder$Validate<X2>;
    type(): any /*io.gatling.javaapi.core.CheckBuilder$CheckType*/;
    validate(arg0: string, arg1: BiFunction<X, Session, X>): CheckBuilder$Final;
    withDefault(arg0: Func<Session, X>): CheckBuilder$Validate<X>;
    withDefault(arg0: X): CheckBuilder$Validate<X>;
    withDefaultEl(arg0: string): CheckBuilder$Validate<X>;
    within(...arg0: X[]): CheckBuilder$Final;
    within(arg0: Func<Session, java.util.List<X>>): CheckBuilder$Final;
    within(arg0: java.util.List<X>): CheckBuilder$Final;
    withinEL(arg0: string): CheckBuilder$Final;
  } // end CheckBuilder$Validate
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface FeederBuilder$Batchable<T> /* extends FeederBuilder$FileBased<T>*/ {
    asScala(): any /*scala.Function0*/;
    batch(): FeederBuilder$Batchable<T>;
    batch(arg0: int): FeederBuilder$Batchable<T>;
    circular(): FeederBuilder$Batchable<T>;
    eager(): FeederBuilder$Batchable<T>;
    queue(): FeederBuilder$Batchable<T>;
    random(): FeederBuilder$Batchable<T>;
    readRecords(): java.util.List<java.util.Map<string, any /*java.lang.Object*/>>;
    recordsCount(): int;
    shard(): FeederBuilder$Batchable<T>;
    shuffle(): FeederBuilder$Batchable<T>;
    transform(arg0: BiFunction<string, T, any /*java.lang.Object*/>): FeederBuilder<any /*java.lang.Object*/>;
    unzip(): FeederBuilder$Batchable<T>;
  } // end FeederBuilder$Batchable
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface FeederBuilder$FileBased<T> /* extends FeederBuilder<T>*/ {
    asScala(): any /*scala.Function0*/;
    circular(): FeederBuilder$FileBased<T>;
    queue(): FeederBuilder$FileBased<T>;
    random(): FeederBuilder$FileBased<T>;
    readRecords(): java.util.List<java.util.Map<string, any /*java.lang.Object*/>>;
    recordsCount(): int;
    shard(): FeederBuilder$FileBased<T>;
    shuffle(): FeederBuilder$FileBased<T>;
    transform(arg0: BiFunction<string, T, any /*java.lang.Object*/>): FeederBuilder<any /*java.lang.Object*/>;
    unzip(): FeederBuilder$FileBased<T>;
  } // end FeederBuilder$FileBased
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface FeederBuilder<T> {
    asScala(): any /*scala.Function0*/;
    circular(): FeederBuilder<T>;
    queue(): FeederBuilder<T>;
    random(): FeederBuilder<T>;
    readRecords(): java.util.List<java.util.Map<string, any /*java.lang.Object*/>>;
    recordsCount(): int;
    shard(): FeederBuilder<T>;
    shuffle(): FeederBuilder<T>;
    transform(arg0: BiFunction<string, T, any /*java.lang.Object*/>): FeederBuilder<any /*java.lang.Object*/>;
  } // end FeederBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core {
  interface ProtocolBuilder {
    protocol(): any /*io.gatling.core.protocol.Protocol*/;
  } // end ProtocolBuilder
} // end namespace io.gatling.javaapi.core
declare namespace io.gatling.javaapi.core.condition {
  class DoIf$Then<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end DoIf$Then
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class DoIfEquals$Then<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end DoIfEquals$Then
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class DoIfEqualsOrElse$Then<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(
      arg0: io.gatling.javaapi.core.exec.Executable,
      ...arg1: io.gatling.javaapi.core.exec.Executable[]
    ): any /*io.gatling.javaapi.core.condition.DoIfEqualsOrElse$OrElse*/;
    toString(): string;
  } // end DoIfEqualsOrElse$Then
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class DoIfOrElse$OrElse<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    orElse(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end DoIfOrElse$OrElse
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class DoIfOrElse$Then<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(
      arg0: io.gatling.javaapi.core.exec.Executable,
      ...arg1: io.gatling.javaapi.core.exec.Executable[]
    ): DoIfOrElse$OrElse<T>;
    toString(): string;
  } // end DoIfOrElse$Then
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class DoSwitch$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(...arg0: io.gatling.javaapi.core.Choice$WithKey[]): T;
    on(arg0: java.util.List<io.gatling.javaapi.core.Choice$WithKey>): T;
    toString(): string;
  } // end DoSwitch$On
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class DoSwitchOrElse$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(...arg0: io.gatling.javaapi.core.Choice$WithKey[]): DoSwitchOrElse$OrElse<T>;
    on(arg0: java.util.List<io.gatling.javaapi.core.Choice$WithKey>): DoSwitchOrElse$OrElse<T>;
    toString(): string;
  } // end DoSwitchOrElse$On
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class DoSwitchOrElse$OrElse<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    orElse(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end DoSwitchOrElse$OrElse
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class RandomSwitch$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(...arg0: io.gatling.javaapi.core.Choice$WithWeight[]): T;
    on(arg0: java.util.List<io.gatling.javaapi.core.Choice$WithWeight>): T;
    toString(): string;
  } // end RandomSwitch$On
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class RandomSwitchOrElse$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(...arg0: io.gatling.javaapi.core.Choice$WithWeight[]): RandomSwitchOrElse$OrElse<T>;
    on(arg0: java.util.List<io.gatling.javaapi.core.Choice$WithWeight>): RandomSwitchOrElse$OrElse<T>;
    toString(): string;
  } // end RandomSwitchOrElse$On
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class RandomSwitchOrElse$OrElse<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    orElse(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end RandomSwitchOrElse$OrElse
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class RoundRobinSwitch$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    on(arg0: java.util.List<io.gatling.javaapi.core.ChainBuilder>): T;
    toString(): string;
  } // end RoundRobinSwitch$On
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  class UniformRandomSwitch$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    on(arg0: java.util.List<io.gatling.javaapi.core.ChainBuilder>): T;
    toString(): string;
  } // end UniformRandomSwitch$On
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface DoIf<T, W> {
    doIf(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>): DoIf$Then<T>;
    doIf(arg0: string): DoIf$Then<T>;
  } // end DoIf
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface DoIfEquals<T, W> {
    doIfEquals(
      arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
      arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
    ): DoIfEquals$Then<T>;
    doIfEquals(
      arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): DoIfEquals$Then<T>;
    doIfEquals(arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>, arg1: string): DoIfEquals$Then<T>;
    doIfEquals(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>): DoIfEquals$Then<T>;
    doIfEquals(arg0: string, arg1: any /*java.lang.Object*/): DoIfEquals$Then<T>;
    doIfEquals(arg0: string, arg1: string): DoIfEquals$Then<T>;
  } // end DoIfEquals
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface DoIfEqualsOrElse<T, W> {
    doIfEqualsOrElse(
      arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
      arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
    ): DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(
      arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
      arg1: any /*java.lang.Object*/
    ): DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(
      arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
      arg1: string
    ): DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
    ): DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(arg0: string, arg1: any /*java.lang.Object*/): DoIfEqualsOrElse$Then<T>;
    doIfEqualsOrElse(arg0: string, arg1: string): DoIfEqualsOrElse$Then<T>;
  } // end DoIfEqualsOrElse
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface DoIfOrElse<T, W> {
    doIfOrElse(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>): DoIfOrElse$Then<T>;
    doIfOrElse(arg0: string): DoIfOrElse$Then<T>;
  } // end DoIfOrElse
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface DoSwitch<T, W> {
    doSwitch(arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>): DoSwitch$On<T>;
    doSwitch(arg0: string): DoSwitch$On<T>;
  } // end DoSwitch
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface DoSwitchOrElse<T, W> {
    doSwitchOrElse(arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>): DoSwitchOrElse$On<T>;
    doSwitchOrElse(arg0: string): DoSwitchOrElse$On<T>;
  } // end DoSwitchOrElse
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface RandomSwitch<T, W> {
    randomSwitch(): RandomSwitch$On<T>;
  } // end RandomSwitch
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface RandomSwitchOrElse<T, W> {
    randomSwitchOrElse(): RandomSwitchOrElse$On<T>;
  } // end RandomSwitchOrElse
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface RoundRobinSwitch<T, W> {
    roundRobinSwitch(): RoundRobinSwitch$On<T>;
  } // end RoundRobinSwitch
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.condition {
  interface UniformRandomSwitch<T, W> {
    uniformRandomSwitch(): UniformRandomSwitch$On<T>;
  } // end UniformRandomSwitch
} // end namespace io.gatling.javaapi.core.condition
declare namespace io.gatling.javaapi.core.error {
  class Errors$ExitBlockOnFail<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end Errors$ExitBlockOnFail
} // end namespace io.gatling.javaapi.core.error
declare namespace io.gatling.javaapi.core.error {
  class Errors$TryMax<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end Errors$TryMax
} // end namespace io.gatling.javaapi.core.error
declare namespace io.gatling.javaapi.core.error {
  interface Errors<T, W> {
    crashLoadGenerator(arg0: Func<io.gatling.javaapi.core.Session, string>): T;
    crashLoadGenerator(arg0: string): T;
    crashLoadGeneratorIf(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
    ): T;
    crashLoadGeneratorIf(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    crashLoadGeneratorIf(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, boolean | null>): T;
    crashLoadGeneratorIf(arg0: string, arg1: string): T;
    exitBlockOnFail(): Errors$ExitBlockOnFail<T>;
    exitHere(): T;
    exitHereIf(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>): T;
    exitHereIf(arg0: string): T;
    exitHereIfFailed(): T;
    stopLoadGenerator(arg0: Func<io.gatling.javaapi.core.Session, string>): T;
    stopLoadGenerator(arg0: string): T;
    stopLoadGeneratorIf(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
    ): T;
    stopLoadGeneratorIf(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    stopLoadGeneratorIf(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, boolean | null>): T;
    stopLoadGeneratorIf(arg0: string, arg1: string): T;
    tryMax(arg0: Func<io.gatling.javaapi.core.Session, int | null>): Errors$TryMax<T>;
    tryMax(arg0: Func<io.gatling.javaapi.core.Session, int | null>, arg1: string): Errors$TryMax<T>;
    tryMax(arg0: int): Errors$TryMax<T>;
    tryMax(arg0: int, arg1: string): Errors$TryMax<T>;
    tryMax(arg0: string): Errors$TryMax<T>;
    tryMax(arg0: string, arg1: string): Errors$TryMax<T>;
  } // end Errors
} // end namespace io.gatling.javaapi.core.error
declare namespace io.gatling.javaapi.core.exec {
  interface Execs<T, W> {
    exec(arg0: Executable, ...arg1: Executable[]): T;
    exec(arg0: Func<io.gatling.javaapi.core.Session, io.gatling.javaapi.core.Session>): T;
    exec(arg0: java.util.List<io.gatling.javaapi.core.ChainBuilder>): T;
  } // end Execs
} // end namespace io.gatling.javaapi.core.exec
declare namespace io.gatling.javaapi.core.exec {
  interface Executable {
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
  } // end Executable
} // end namespace io.gatling.javaapi.core.exec
declare namespace io.gatling.javaapi.core.feed {
  interface Feeds<T, W> {
    feed(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>): T;
    feed(
      arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>,
      arg1: Func<io.gatling.javaapi.core.Session, int | null>
    ): T;
    feed(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: int): T;
    feed(arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>, arg1: string): T;
    feed(arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>): T;
    feed(
      arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>,
      arg1: Func<io.gatling.javaapi.core.Session, int | null>
    ): T;
    feed(arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>, arg1: int): T;
    feed(arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>, arg1: string): T;
    feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>): T;
    feed(
      arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>,
      arg1: Func<io.gatling.javaapi.core.Session, int | null>
    ): T;
    feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: int): T;
    feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>, arg1: string): T;
  } // end Feeds
} // end namespace io.gatling.javaapi.core.feed
declare namespace io.gatling.javaapi.core.group {
  class Groups$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end Groups$On
} // end namespace io.gatling.javaapi.core.group
declare namespace io.gatling.javaapi.core.group {
  interface Groups<T, W> {
    group(arg0: Func<io.gatling.javaapi.core.Session, string>): Groups$On<T>;
    group(arg0: string): Groups$On<T>;
  } // end Groups
} // end namespace io.gatling.javaapi.core.group
declare namespace io.gatling.javaapi.core.loop {
  class AsLongAs$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end AsLongAs$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  class AsLongAsDuring$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end AsLongAsDuring$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  class DoWhile$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end DoWhile$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  class DoWhileDuring$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end DoWhileDuring$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  class During$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end During$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  class ForEach$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end ForEach$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  class Forever$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end Forever$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  class Repeat$On<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    on(arg0: io.gatling.javaapi.core.exec.Executable, ...arg1: io.gatling.javaapi.core.exec.Executable[]): T;
    toString(): string;
  } // end Repeat$On
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface AsLongAs<T, W> {
    asLongAs(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>): AsLongAs$On<T>;
    asLongAs(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>, arg1: boolean): AsLongAs$On<T>;
    asLongAs(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>, arg1: string): AsLongAs$On<T>;
    asLongAs(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>, arg1: string, arg2: boolean): AsLongAs$On<T>;
    asLongAs(arg0: string): AsLongAs$On<T>;
    asLongAs(arg0: string, arg1: boolean): AsLongAs$On<T>;
    asLongAs(arg0: string, arg1: string): AsLongAs$On<T>;
    asLongAs(arg0: string, arg1: string, arg2: boolean): AsLongAs$On<T>;
  } // end AsLongAs
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface AsLongAsDuring<T, W> {
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>, arg1: long): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: long,
      arg2: string
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: java.time.Duration): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: java.time.Duration, arg2: boolean): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: java.time.Duration, arg2: string): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: java.time.Duration, arg2: string, arg3: boolean): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: long): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: long, arg2: boolean): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: long, arg2: string): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: long, arg2: string, arg3: boolean): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: string): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: string, arg2: boolean): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: string, arg2: string): AsLongAsDuring$On<T>;
    asLongAsDuring(arg0: string, arg1: string, arg2: string, arg3: boolean): AsLongAsDuring$On<T>;
  } // end AsLongAsDuring
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface DoWhile<T, W> {
    doWhile(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>): DoWhile$On<T>;
    doWhile(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>, arg1: string): DoWhile$On<T>;
    doWhile(arg0: string): DoWhile$On<T>;
    doWhile(arg0: string, arg1: string): DoWhile$On<T>;
  } // end DoWhile
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface DoWhileDuring<T, W> {
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: java.time.Duration,
      arg2: string,
      arg3: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>, arg1: long): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: long,
      arg2: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: long,
      arg2: string
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
      arg1: long,
      arg2: string,
      arg3: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string
    ): DoWhileDuring$On<T>;
    doWhileDuring(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string,
      arg3: boolean
    ): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: java.time.Duration): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: java.time.Duration, arg2: boolean): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: java.time.Duration, arg2: string): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: java.time.Duration, arg2: string, arg3: boolean): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: long): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: long, arg2: boolean): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: long, arg2: string): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: long, arg2: string, arg3: boolean): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: string): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: string, arg2: boolean): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: string, arg2: string): DoWhileDuring$On<T>;
    doWhileDuring(arg0: string, arg1: string, arg2: string, arg3: boolean): DoWhileDuring$On<T>;
  } // end DoWhileDuring
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface During<T, W> {
    during(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>): During$On<T>;
    during(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>, arg1: boolean): During$On<T>;
    during(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>, arg1: string): During$On<T>;
    during(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>, arg1: string, arg2: boolean): During$On<T>;
    during(arg0: java.time.Duration): During$On<T>;
    during(arg0: java.time.Duration, arg1: boolean): During$On<T>;
    during(arg0: java.time.Duration, arg1: string): During$On<T>;
    during(arg0: java.time.Duration, arg1: string, arg2: boolean): During$On<T>;
    during(arg0: long): During$On<T>;
    during(arg0: long, arg1: boolean): During$On<T>;
    during(arg0: long, arg1: string): During$On<T>;
    during(arg0: long, arg1: string, arg2: boolean): During$On<T>;
    during(arg0: string): During$On<T>;
    during(arg0: string, arg1: boolean): During$On<T>;
    during(arg0: string, arg1: string): During$On<T>;
    during(arg0: string, arg1: string, arg2: boolean): During$On<T>;
  } // end During
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface ForEach<T, W> {
    foreach(
      arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string
    ): ForEach$On<T>;
    foreach(
      arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>,
      arg1: string,
      arg2: string
    ): ForEach$On<T>;
    foreach(arg0: java.util.List<any /*java.lang.Object*/>, arg1: string): ForEach$On<T>;
    foreach(arg0: java.util.List<any /*java.lang.Object*/>, arg1: string, arg2: string): ForEach$On<T>;
    foreach(arg0: string, arg1: string): ForEach$On<T>;
    foreach(arg0: string, arg1: string, arg2: string): ForEach$On<T>;
  } // end ForEach
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface Forever<T, W> {
    forever(): Forever$On<T>;
    forever(arg0: string): Forever$On<T>;
  } // end Forever
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.loop {
  interface Repeat<T, W> {
    repeat(arg0: Func<io.gatling.javaapi.core.Session, int | null>): Repeat$On<T>;
    repeat(arg0: Func<io.gatling.javaapi.core.Session, int | null>, arg1: string): Repeat$On<T>;
    repeat(arg0: int): Repeat$On<T>;
    repeat(arg0: int, arg1: string): Repeat$On<T>;
    repeat(arg0: string): Repeat$On<T>;
    repeat(arg0: string, arg1: string): Repeat$On<T>;
  } // end Repeat
} // end namespace io.gatling.javaapi.core.loop
declare namespace io.gatling.javaapi.core.pause {
  interface Paces<T, W> {
    pace(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>): T;
    pace(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): T;
    pace(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: string
    ): T;
    pace(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>, arg1: string): T;
    pace(arg0: java.time.Duration): T;
    pace(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pace(arg0: java.time.Duration, arg1: java.time.Duration, arg2: string): T;
    pace(arg0: java.time.Duration, arg1: string): T;
    pace(arg0: long): T;
    pace(arg0: long, arg1: long): T;
    pace(arg0: long, arg1: long, arg2: string): T;
    pace(arg0: long, arg1: string): T;
    pace(arg0: string): T;
    pace(arg0: string, arg1: string): T;
    pace(arg0: string, arg1: string, arg2: string): T;
  } // end Paces
} // end namespace io.gatling.javaapi.core.pause
declare namespace io.gatling.javaapi.core.pause {
  interface Pauses<T, W> {
    pause(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>): T;
    pause(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): T;
    pause(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
      arg2: io.gatling.javaapi.core.PauseType
    ): T;
    pause(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>, arg1: io.gatling.javaapi.core.PauseType): T;
    pause(arg0: java.time.Duration): T;
    pause(arg0: java.time.Duration, arg1: io.gatling.javaapi.core.PauseType): T;
    pause(arg0: java.time.Duration, arg1: java.time.Duration): T;
    pause(arg0: java.time.Duration, arg1: java.time.Duration, arg2: io.gatling.javaapi.core.PauseType): T;
    pause(arg0: long): T;
    pause(arg0: long, arg1: io.gatling.javaapi.core.PauseType): T;
    pause(arg0: long, arg1: long): T;
    pause(arg0: long, arg1: long, arg2: io.gatling.javaapi.core.PauseType): T;
    pause(arg0: string): T;
    pause(arg0: string, arg1: io.gatling.javaapi.core.PauseType): T;
    pause(arg0: string, arg1: string): T;
    pause(arg0: string, arg1: string, arg2: io.gatling.javaapi.core.PauseType): T;
  } // end Pauses
} // end namespace io.gatling.javaapi.core.pause
declare namespace io.gatling.javaapi.core.pause {
  interface RendezVous<T, W> {
    rendezVous(arg0: int): T;
  } // end RendezVous
} // end namespace io.gatling.javaapi.core.pause
declare namespace io.gatling.javaapi.http {
  class AddCookie /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.http.action.cookie.AddCookieDsl*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
    withDomain(arg0: string): AddCookie;
    withMaxAge(arg0: int): AddCookie;
    withPath(arg0: string): AddCookie;
    withSecure(arg0: boolean): AddCookie;
  } // end AddCookie
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class BodyPart /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.http.request.BodyPart*/;
    charset(arg0: string): BodyPart;
    contentId(arg0: Func<io.gatling.javaapi.core.Session, string>): BodyPart;
    contentId(arg0: string): BodyPart;
    contentType(arg0: Func<io.gatling.javaapi.core.Session, string>): BodyPart;
    contentType(arg0: string): BodyPart;
    dispositionType(arg0: Func<io.gatling.javaapi.core.Session, string>): BodyPart;
    dispositionType(arg0: string): BodyPart;
    equals(arg0: any /*java.lang.Object*/): boolean;
    fileName(arg0: Func<io.gatling.javaapi.core.Session, string>): BodyPart;
    fileName(arg0: string): BodyPart;
    header(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): BodyPart;
    header(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): BodyPart;
    header(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): BodyPart;
    header(arg0: string, arg1: string): BodyPart;
    toString(): string;
    transferEncoding(arg0: string): BodyPart;
  } // end BodyPart
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class GetCookie /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.http.action.cookie.GetCookieDsl*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    saveAs(arg0: string): GetCookie;
    toString(): string;
    withDomain(arg0: Func<io.gatling.javaapi.core.Session, string>): GetCookie;
    withDomain(arg0: string): GetCookie;
    withPath(arg0: string): GetCookie;
    withSecure(arg0: boolean): GetCookie;
  } // end GetCookie
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class Http /* extends java.lang.Object*/ {
    delete(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    delete(arg0: string): HttpRequestActionBuilder;
    equals(arg0: any /*java.lang.Object*/): boolean;
    get(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    get(arg0: string): HttpRequestActionBuilder;
    head(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    head(arg0: string): HttpRequestActionBuilder;
    httpRequest(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    httpRequest(arg0: string, arg1: string): HttpRequestActionBuilder;
    options(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    options(arg0: string): HttpRequestActionBuilder;
    patch(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    patch(arg0: string): HttpRequestActionBuilder;
    post(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    post(arg0: string): HttpRequestActionBuilder;
    put(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpRequestActionBuilder;
    put(arg0: string): HttpRequestActionBuilder;
    toString(): string;
  } // end Http
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class HttpDsl /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end HttpDsl
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class HttpProtocolBuilder$TypedCondition /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(...arg0: io.gatling.javaapi.core.CheckBuilder[]): HttpProtocolBuilder;
    then(arg0: java.util.List<io.gatling.javaapi.core.CheckBuilder>): HttpProtocolBuilder;
    toString(): string;
  } // end HttpProtocolBuilder$TypedCondition
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class HttpProtocolBuilder$UntypedCondition /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    then(...arg0: io.gatling.javaapi.core.CheckBuilder[]): HttpProtocolBuilder;
    then(arg0: java.util.List<io.gatling.javaapi.core.CheckBuilder>): HttpProtocolBuilder;
    toString(): string;
  } // end HttpProtocolBuilder$UntypedCondition
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class HttpProtocolBuilder /* extends java.lang.Object implements io.gatling.javaapi.core.ProtocolBuilder*/ {
    acceptCharsetHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    acceptCharsetHeader(arg0: string): HttpProtocolBuilder;
    acceptEncodingHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    acceptEncodingHeader(arg0: string): HttpProtocolBuilder;
    acceptHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    acceptHeader(arg0: string): HttpProtocolBuilder;
    acceptLanguageHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    acceptLanguageHeader(arg0: string): HttpProtocolBuilder;
    asyncNameResolution(...arg0: string[]): HttpProtocolBuilder;
    asyncNameResolution(arg0: [any /*java.net.InetSocketAddress*/]): HttpProtocolBuilder;
    authorizationHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    authorizationHeader(arg0: string): HttpProtocolBuilder;
    baseUrl(arg0: string): HttpProtocolBuilder;
    baseUrls(...arg0: string[]): HttpProtocolBuilder;
    baseUrls(arg0: java.util.List<string>): HttpProtocolBuilder;
    basicAuth(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): HttpProtocolBuilder;
    basicAuth(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): HttpProtocolBuilder;
    basicAuth(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    basicAuth(arg0: string, arg1: string): HttpProtocolBuilder;
    check(...arg0: io.gatling.javaapi.core.CheckBuilder[]): HttpProtocolBuilder;
    check(arg0: java.util.List<io.gatling.javaapi.core.CheckBuilder>): HttpProtocolBuilder;
    checkIf(
      arg0: BiFunction<io.gatling.http.response.Response, io.gatling.javaapi.core.Session, boolean | null>
    ): HttpProtocolBuilder$TypedCondition;
    checkIf(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>): HttpProtocolBuilder$UntypedCondition;
    checkIf(arg0: string): HttpProtocolBuilder$UntypedCondition;
    connectionHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    connectionHeader(arg0: string): HttpProtocolBuilder;
    contentTypeHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    contentTypeHeader(arg0: string): HttpProtocolBuilder;
    digestAuth(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): HttpProtocolBuilder;
    digestAuth(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): HttpProtocolBuilder;
    digestAuth(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    digestAuth(arg0: string, arg1: string): HttpProtocolBuilder;
    disableAutoOrigin(): HttpProtocolBuilder;
    disableAutoReferer(): HttpProtocolBuilder;
    disableCaching(): HttpProtocolBuilder;
    disableFollowRedirect(): HttpProtocolBuilder;
    disableUrlEncoding(): HttpProtocolBuilder;
    disableWarmUp(): HttpProtocolBuilder;
    doNotTrackHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    doNotTrackHeader(arg0: string): HttpProtocolBuilder;
    enableHttp2(): HttpProtocolBuilder;
    equals(arg0: any /*java.lang.Object*/): boolean;
    header(
      arg0: any /*java.lang.CharSequence*/,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): HttpProtocolBuilder;
    header(arg0: any /*java.lang.CharSequence*/, arg1: string): HttpProtocolBuilder;
    headers(arg0: java.util.Map<any /*java.lang.CharSequence*/, string>): HttpProtocolBuilder;
    hostNameAliases(arg0: java.util.Map<string, java.util.List<string>>): HttpProtocolBuilder;
    http2PriorKnowledge(arg0: java.util.Map<string, boolean | null>): HttpProtocolBuilder;
    inferHtmlResources(): HttpProtocolBuilder;
    inferHtmlResources(arg0: io.gatling.javaapi.core.Filter$AllowList): HttpProtocolBuilder;
    inferHtmlResources(
      arg0: io.gatling.javaapi.core.Filter$AllowList,
      arg1: io.gatling.javaapi.core.Filter$DenyList
    ): HttpProtocolBuilder;
    inferHtmlResources(arg0: io.gatling.javaapi.core.Filter$DenyList): HttpProtocolBuilder;
    localAddress(arg0: string): HttpProtocolBuilder;
    localAddresses(...arg0: string[]): HttpProtocolBuilder;
    localAddresses(arg0: java.util.List<string>): HttpProtocolBuilder;
    maxConnectionsPerHost(arg0: int): HttpProtocolBuilder;
    maxRedirects(arg0: int): HttpProtocolBuilder;
    nameInferredHtmlResources(arg0: Func<any /*io.gatling.http.client.uri.Uri*/, string>): HttpProtocolBuilder;
    nameInferredHtmlResourcesAfterAbsoluteUrl(): HttpProtocolBuilder;
    nameInferredHtmlResourcesAfterLastPathElement(): HttpProtocolBuilder;
    nameInferredHtmlResourcesAfterPath(): HttpProtocolBuilder;
    nameInferredHtmlResourcesAfterRelativeUrl(): HttpProtocolBuilder;
    nameInferredHtmlResourcesAfterUrlTail(): HttpProtocolBuilder;
    noProxyFor(...arg0: string[]): HttpProtocolBuilder;
    originHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    originHeader(arg0: string): HttpProtocolBuilder;
    perUserKeyManagerFactory(arg0: Func<long | null, any /*javax.net.ssl.KeyManagerFactory*/>): HttpProtocolBuilder;
    perUserNameResolution(): HttpProtocolBuilder;
    protocol(): any /*io.gatling.core.protocol.Protocol*/;
    proxy(arg0: Proxy): HttpProtocolBuilder;
    proxyProtocolSourceIpV4Address(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    proxyProtocolSourceIpV4Address(arg0: string): HttpProtocolBuilder;
    proxyProtocolSourceIpV6Address(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    proxyProtocolSourceIpV6Address(arg0: string): HttpProtocolBuilder;
    redirectNamingStrategy(
      arg0: any /*io.gatling.javaapi.http.HttpProtocolBuilder$RedirectNamingStrategy*/
    ): HttpProtocolBuilder;
    shareConnections(): HttpProtocolBuilder;
    sign(
      arg0: BiFunction<io.gatling.http.client.Request, io.gatling.javaapi.core.Session, io.gatling.http.client.Request>
    ): HttpProtocolBuilder;
    sign(arg0: Func<io.gatling.http.client.Request, io.gatling.http.client.Request>): HttpProtocolBuilder;
    signWithOAuth1(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>,
      arg2: Func<io.gatling.javaapi.core.Session, string>,
      arg3: Func<io.gatling.javaapi.core.Session, string>
    ): HttpProtocolBuilder;
    signWithOAuth1(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>,
      arg2: Func<io.gatling.javaapi.core.Session, string>,
      arg3: Func<io.gatling.javaapi.core.Session, string>,
      arg4: boolean
    ): HttpProtocolBuilder;
    signWithOAuth1(arg0: string, arg1: string, arg2: string, arg3: string): HttpProtocolBuilder;
    signWithOAuth1(arg0: string, arg1: string, arg2: string, arg3: string, arg4: boolean): HttpProtocolBuilder;
    silentResources(): HttpProtocolBuilder;
    silentUri(arg0: string): HttpProtocolBuilder;
    sseUnmatchedInboundMessageBufferSize(arg0: int): HttpProtocolBuilder;
    strict302Handling(): HttpProtocolBuilder;
    toString(): string;
    transformResponse(
      arg0: BiFunction<
        io.gatling.http.response.Response,
        io.gatling.javaapi.core.Session,
        io.gatling.http.response.Response
      >
    ): HttpProtocolBuilder;
    upgradeInsecureRequestsHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    upgradeInsecureRequestsHeader(arg0: string): HttpProtocolBuilder;
    useAllLocalAddresses(): HttpProtocolBuilder;
    useAllLocalAddressesMatching(...arg0: string[]): HttpProtocolBuilder;
    userAgentHeader(arg0: Func<io.gatling.javaapi.core.Session, string>): HttpProtocolBuilder;
    userAgentHeader(arg0: string): HttpProtocolBuilder;
    warmUp(arg0: string): HttpProtocolBuilder;
    wsAutoReplySocketIo4(): HttpProtocolBuilder;
    wsAutoReplyTextFrame(arg0: Func<string, string>): HttpProtocolBuilder;
    wsBaseUrl(arg0: string): HttpProtocolBuilder;
    wsBaseUrls(...arg0: string[]): HttpProtocolBuilder;
    wsBaseUrls(arg0: java.util.List<string>): HttpProtocolBuilder;
    wsMaxReconnects(arg0: int): HttpProtocolBuilder;
    wsReconnect(): HttpProtocolBuilder;
    wsUnmatchedInboundMessageBufferSize(arg0: int): HttpProtocolBuilder;
  } // end HttpProtocolBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class HttpRequestActionBuilder /* extends RequestWithBodyActionBuilder<any, any>*/ {
    asFormUrlEncoded<T>(): T;
    asJson<T>(): T;
    asMultipartForm<T>(): T;
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    asXml<T>(): T;
    basicAuth<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    basicAuth<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    basicAuth<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    basicAuth<T>(arg0: string, arg1: string): T;
    body<T>(arg0: io.gatling.javaapi.core.Body): T;
    bodyPart<T>(arg0: BodyPart): T;
    bodyParts<T>(...arg0: BodyPart[]): T;
    bodyParts<T>(arg0: java.util.List<BodyPart>): T;
    check(...arg0: io.gatling.javaapi.core.CheckBuilder[]): HttpRequestActionBuilder;
    check(arg0: java.util.List<io.gatling.javaapi.core.CheckBuilder>): HttpRequestActionBuilder;
    checkIf(
      arg0: BiFunction<io.gatling.http.response.Response, io.gatling.javaapi.core.Session, boolean | null>
    ): any /*io.gatling.javaapi.http.HttpRequestActionBuilder$TypedCondition*/;
    checkIf(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>
    ): any /*io.gatling.javaapi.http.HttpRequestActionBuilder$UntypedCondition*/;
    checkIf(arg0: string): any /*io.gatling.javaapi.http.HttpRequestActionBuilder$UntypedCondition*/;
    digestAuth<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    digestAuth<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    digestAuth<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    digestAuth<T>(arg0: string, arg1: string): T;
    disableFollowRedirect(): HttpRequestActionBuilder;
    disableUrlEncoding<T>(): T;
    equals(arg0: any /*java.lang.Object*/): boolean;
    form<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.Map<string, any /*java.lang.Object*/>>): T;
    form<T>(arg0: string): T;
    formParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
    ): T;
    formParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: any /*java.lang.Object*/): T;
    formParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    formParam<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>): T;
    formParam<T>(arg0: string, arg1: any /*java.lang.Object*/): T;
    formParam<T>(arg0: string, arg1: string): T;
    formParamMap<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.Map<string, any /*java.lang.Object*/>>): T;
    formParamMap<T>(arg0: java.util.Map<string, any /*java.lang.Object*/>): T;
    formParamSeq<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.util.Map$Entry*/>>): T;
    formParamSeq<T>(arg0: java.util.List<any /*java.util.Map$Entry*/>): T;
    formUpload<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    formUpload<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    formUpload<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    formUpload<T>(arg0: string, arg1: string): T;
    header<T>(arg0: any /*java.lang.CharSequence*/, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    header<T>(arg0: any /*java.lang.CharSequence*/, arg1: string): T;
    headers<T>(arg0: java.util.Map<any /*java.lang.CharSequence*/, string>): T;
    ignoreProtocolChecks(): HttpRequestActionBuilder;
    ignoreProtocolHeaders<T>(): T;
    multivaluedFormParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedFormParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: java.util.List<any /*java.lang.Object*/>
    ): T;
    multivaluedFormParam<T>(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedFormParam<T>(arg0: string, arg1: java.util.List<any /*java.lang.Object*/>): T;
    multivaluedFormParam<T>(arg0: string, arg1: string): T;
    multivaluedQueryParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedQueryParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: java.util.List<any /*java.lang.Object*/>
    ): T;
    multivaluedQueryParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    multivaluedQueryParam<T>(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedQueryParam<T>(arg0: string, arg1: java.util.List<any /*java.lang.Object*/>): T;
    multivaluedQueryParam<T>(arg0: string, arg1: string): T;
    notSilent(): HttpRequestActionBuilder;
    processRequestBody<T>(arg0: Func<io.gatling.javaapi.core.Body, io.gatling.javaapi.core.Body>): T;
    proxy<T>(arg0: Proxy): T;
    queryParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
    ): T;
    queryParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: any /*java.lang.Object*/): T;
    queryParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    queryParam<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>): T;
    queryParam<T>(arg0: string, arg1: any /*java.lang.Object*/): T;
    queryParam<T>(arg0: string, arg1: string): T;
    queryParamMap<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.Map<string, any /*java.lang.Object*/>>): T;
    queryParamMap<T>(arg0: java.util.Map<string, any /*java.lang.Object*/>): T;
    queryParamMap<T>(arg0: string): T;
    queryParamSeq<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.util.Map$Entry*/>>): T;
    queryParamSeq<T>(arg0: java.util.List<any /*java.util.Map$Entry*/>): T;
    queryParamSeq<T>(arg0: string): T;
    requestTimeout(arg0: int): HttpRequestActionBuilder;
    requestTimeout(arg0: java.time.Duration): HttpRequestActionBuilder;
    resources(...arg0: HttpRequestActionBuilder[]): HttpRequestActionBuilder;
    resources(arg0: java.util.List<HttpRequestActionBuilder>): HttpRequestActionBuilder;
    sign<T>(
      arg0: BiFunction<io.gatling.http.client.Request, io.gatling.javaapi.core.Session, io.gatling.http.client.Request>
    ): T;
    sign<T>(arg0: Func<io.gatling.http.client.Request, io.gatling.http.client.Request>): T;
    signWithOAuth1<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>,
      arg2: Func<io.gatling.javaapi.core.Session, string>,
      arg3: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    signWithOAuth1<T>(arg0: string, arg1: string, arg2: string, arg3: string): T;
    silent(): HttpRequestActionBuilder;
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
    toString(): string;
    transformResponse(
      arg0: BiFunction<
        io.gatling.http.response.Response,
        io.gatling.javaapi.core.Session,
        io.gatling.http.response.Response
      >
    ): HttpRequestActionBuilder;
  } // end HttpRequestActionBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class Polling$Every /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    exec(arg0: HttpRequestActionBuilder): io.gatling.javaapi.core.ActionBuilder;
    toString(): string;
  } // end Polling$Every
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class Polling /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    every(arg0: java.time.Duration): Polling$Every;
    every(arg0: long): Polling$Every;
    pollerName(arg0: string): Polling;
    stop(): io.gatling.javaapi.core.ActionBuilder;
    toString(): string;
  } // end Polling
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class Proxy /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.http.protocol.Proxy*/;
    credentials(arg0: string, arg1: string): Proxy;
    equals(arg0: any /*java.lang.Object*/): boolean;
    http(): Proxy;
    https(): Proxy;
    socks4(): Proxy;
    socks5(): Proxy;
    toString(): string;
  } // end Proxy
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class Sse /* extends java.lang.Object*/ {
    close(): io.gatling.javaapi.core.ActionBuilder;
    equals(arg0: any /*java.lang.Object*/): boolean;
    get(arg0: Func<io.gatling.javaapi.core.Session, string>): SseConnectActionBuilder;
    get(arg0: string): SseConnectActionBuilder;
    post(arg0: Func<io.gatling.javaapi.core.Session, string>): SseConnectActionBuilder;
    post(arg0: string): SseConnectActionBuilder;
    setCheck(): SseSetCheckActionBuilder;
    sseName(arg0: Func<io.gatling.javaapi.core.Session, string>): Sse;
    sseName(arg0: string): Sse;
    toString(): string;
  } // end Sse
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class SseConnectActionBuilder /* extends RequestWithBodyActionBuilder<any, any> implements SseAwaitActionBuilder<any, any>*/ {
    asFormUrlEncoded<T>(): T;
    asJson<T>(): T;
    asMultipartForm<T>(): T;
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    asXml<T>(): T;
    await(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: java.time.Duration): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: long): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: string): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    basicAuth<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    basicAuth<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    basicAuth<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    basicAuth<T>(arg0: string, arg1: string): T;
    body<T>(arg0: io.gatling.javaapi.core.Body): T;
    bodyPart<T>(arg0: BodyPart): T;
    bodyParts<T>(...arg0: BodyPart[]): T;
    bodyParts<T>(arg0: java.util.List<BodyPart>): T;
    digestAuth<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    digestAuth<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    digestAuth<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    digestAuth<T>(arg0: string, arg1: string): T;
    disableUrlEncoding<T>(): T;
    equals(arg0: any /*java.lang.Object*/): boolean;
    form<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.Map<string, any /*java.lang.Object*/>>): T;
    form<T>(arg0: string): T;
    formParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
    ): T;
    formParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: any /*java.lang.Object*/): T;
    formParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    formParam<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>): T;
    formParam<T>(arg0: string, arg1: any /*java.lang.Object*/): T;
    formParam<T>(arg0: string, arg1: string): T;
    formParamMap<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.Map<string, any /*java.lang.Object*/>>): T;
    formParamMap<T>(arg0: java.util.Map<string, any /*java.lang.Object*/>): T;
    formParamSeq<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.util.Map$Entry*/>>): T;
    formParamSeq<T>(arg0: java.util.List<any /*java.util.Map$Entry*/>): T;
    formUpload<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    formUpload<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    formUpload<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    formUpload<T>(arg0: string, arg1: string): T;
    header<T>(arg0: any /*java.lang.CharSequence*/, arg1: Func<io.gatling.javaapi.core.Session, string>): T;
    header<T>(arg0: any /*java.lang.CharSequence*/, arg1: string): T;
    headers<T>(arg0: java.util.Map<any /*java.lang.CharSequence*/, string>): T;
    ignoreProtocolHeaders<T>(): T;
    multivaluedFormParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedFormParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: java.util.List<any /*java.lang.Object*/>
    ): T;
    multivaluedFormParam<T>(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedFormParam<T>(arg0: string, arg1: java.util.List<any /*java.lang.Object*/>): T;
    multivaluedFormParam<T>(arg0: string, arg1: string): T;
    multivaluedQueryParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedQueryParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: java.util.List<any /*java.lang.Object*/>
    ): T;
    multivaluedQueryParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    multivaluedQueryParam<T>(
      arg0: string,
      arg1: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>
    ): T;
    multivaluedQueryParam<T>(arg0: string, arg1: java.util.List<any /*java.lang.Object*/>): T;
    multivaluedQueryParam<T>(arg0: string, arg1: string): T;
    processRequestBody<T>(arg0: Func<io.gatling.javaapi.core.Body, io.gatling.javaapi.core.Body>): T;
    proxy<T>(arg0: Proxy): T;
    queryParam<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
    ): T;
    queryParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: any /*java.lang.Object*/): T;
    queryParam<T>(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): T;
    queryParam<T>(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>): T;
    queryParam<T>(arg0: string, arg1: any /*java.lang.Object*/): T;
    queryParam<T>(arg0: string, arg1: string): T;
    queryParamMap<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.Map<string, any /*java.lang.Object*/>>): T;
    queryParamMap<T>(arg0: java.util.Map<string, any /*java.lang.Object*/>): T;
    queryParamMap<T>(arg0: string): T;
    queryParamSeq<T>(arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.util.Map$Entry*/>>): T;
    queryParamSeq<T>(arg0: java.util.List<any /*java.util.Map$Entry*/>): T;
    queryParamSeq<T>(arg0: string): T;
    sign<T>(
      arg0: BiFunction<io.gatling.http.client.Request, io.gatling.javaapi.core.Session, io.gatling.http.client.Request>
    ): T;
    sign<T>(arg0: Func<io.gatling.http.client.Request, io.gatling.http.client.Request>): T;
    signWithOAuth1<T>(
      arg0: Func<io.gatling.javaapi.core.Session, string>,
      arg1: Func<io.gatling.javaapi.core.Session, string>,
      arg2: Func<io.gatling.javaapi.core.Session, string>,
      arg3: Func<io.gatling.javaapi.core.Session, string>
    ): T;
    signWithOAuth1<T>(arg0: string, arg1: string, arg2: string, arg3: string): T;
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
    toString(): string;
  } // end SseConnectActionBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class SseMessageCheck /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.http.check.sse.SseMessageCheck*/;
    check(...arg0: io.gatling.javaapi.core.CheckBuilder[]): SseMessageCheck;
    check(arg0: java.util.List<io.gatling.javaapi.core.CheckBuilder>): SseMessageCheck;
    checkIf(
      arg0: BiFunction<string, io.gatling.javaapi.core.Session, boolean | null>
    ): any /*io.gatling.javaapi.http.SseMessageCheck$TypedCondition*/;
    checkIf(
      arg0: Func<io.gatling.javaapi.core.Session, boolean | null>
    ): any /*io.gatling.javaapi.http.SseMessageCheck$UntypedCondition*/;
    checkIf(arg0: string): any /*io.gatling.javaapi.http.SseMessageCheck$UntypedCondition*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    matching(...arg0: io.gatling.javaapi.core.CheckBuilder[]): SseMessageCheck;
    matching(arg0: java.util.List<io.gatling.javaapi.core.CheckBuilder>): SseMessageCheck;
    toString(): string;
  } // end SseMessageCheck
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class SseSetCheckActionBuilder /* extends java.lang.Object implements SseAwaitActionBuilder<any, any>*/ {
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    await(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: java.time.Duration): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: long): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: string): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
    toString(): string;
  } // end SseSetCheckActionBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class Ws /* extends java.lang.Object*/ {
    close(): io.gatling.javaapi.core.ActionBuilder;
    close(arg0: int, arg1: string): io.gatling.javaapi.core.ActionBuilder;
    connect(
      arg0: Func<io.gatling.javaapi.core.Session, string>
    ): any /*io.gatling.javaapi.http.WsConnectActionBuilder*/;
    connect(arg0: string): any /*io.gatling.javaapi.http.WsConnectActionBuilder*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    sendBytes(arg0: Func<io.gatling.javaapi.core.Session, bytearray>): WsSendBinaryActionBuilder;
    sendBytes(arg0: bytearray): WsSendBinaryActionBuilder;
    sendBytes(arg0: string): WsSendBinaryActionBuilder;
    sendText(arg0: Func<io.gatling.javaapi.core.Session, string>): WsSendTextActionBuilder;
    sendText(arg0: string): WsSendTextActionBuilder;
    toString(): string;
    wsName(arg0: Func<io.gatling.javaapi.core.Session, string>): Ws;
    wsName(arg0: string): Ws;
  } // end Ws
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class WsFrameCheck /* extends java.lang.Object*/ {
    asScala(): any /*io.gatling.http.check.ws.WsFrameCheck*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end WsFrameCheck
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class WsSendBinaryActionBuilder /* extends java.lang.Object implements WsAwaitActionBuilder<any, any>*/ {
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    await(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: java.time.Duration): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: long): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: string): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
    toString(): string;
  } // end WsSendBinaryActionBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  class WsSendTextActionBuilder /* extends java.lang.Object implements WsAwaitActionBuilder<any, any>*/ {
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    await(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: java.time.Duration): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: long): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: string): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    equals(arg0: any /*java.lang.Object*/): boolean;
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
    toString(): string;
  } // end WsSendTextActionBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  interface SseAwaitActionBuilder<T, W> /* extends io.gatling.javaapi.core.ActionBuilder*/ {
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    await(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: java.time.Duration): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: long): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    await(arg0: string): any /*io.gatling.javaapi.http.SseAwaitActionBuilder$On*/;
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
  } // end SseAwaitActionBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.gatling.javaapi.http {
  interface WsAwaitActionBuilder<T, W> /* extends io.gatling.javaapi.core.ActionBuilder*/ {
    asScala(): any /*io.gatling.core.action.builder.ActionBuilder*/;
    await(
      arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>
    ): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: java.time.Duration): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: long): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    await(arg0: string): any /*io.gatling.javaapi.http.WsAwaitActionBuilder$On*/;
    toChainBuilder(): io.gatling.javaapi.core.ChainBuilder;
  } // end WsAwaitActionBuilder
} // end namespace io.gatling.javaapi.http
declare namespace io.netty.handler.codec.http {
  class HttpHeaders /* extends java.lang.Object implements java.lang.Iterable<any>*/ {
    add(arg0: HttpHeaders): HttpHeaders;
    add(arg0: any /*java.lang.CharSequence*/, arg1: any /*java.lang.Object*/): HttpHeaders;
    add(arg0: any /*java.lang.CharSequence*/, arg1: java.lang.Iterable<any /*java.lang.Object*/>): HttpHeaders;
    add(arg0: string, arg1: any /*java.lang.Object*/): HttpHeaders;
    add(arg0: string, arg1: java.lang.Iterable<any /*java.lang.Object*/>): HttpHeaders;
    addInt(arg0: any /*java.lang.CharSequence*/, arg1: int): HttpHeaders;
    addShort(arg0: any /*java.lang.CharSequence*/, arg1: any /*short*/): HttpHeaders;
    clear(): HttpHeaders;
    contains(arg0: any /*java.lang.CharSequence*/): boolean;
    contains(arg0: any /*java.lang.CharSequence*/, arg1: any /*java.lang.CharSequence*/, arg2: boolean): boolean;
    contains(arg0: string): boolean;
    contains(arg0: string, arg1: string, arg2: boolean): boolean;
    containsValue(arg0: any /*java.lang.CharSequence*/, arg1: any /*java.lang.CharSequence*/, arg2: boolean): boolean;
    copy(): HttpHeaders;
    entries(): java.util.List<any /*java.util.Map$Entry*/>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    forEach<T>(arg0: Consumer<T>): void;
    get(arg0: any /*java.lang.CharSequence*/): string;
    get(arg0: any /*java.lang.CharSequence*/, arg1: string): string;
    get(arg0: string): string;
    getAll(arg0: any /*java.lang.CharSequence*/): java.util.List<string>;
    getAll(arg0: string): java.util.List<string>;
    getAllAsString(arg0: any /*java.lang.CharSequence*/): java.util.List<string>;
    getAsString(arg0: any /*java.lang.CharSequence*/): string;
    getInt(arg0: any /*java.lang.CharSequence*/): int | null;
    getInt(arg0: any /*java.lang.CharSequence*/, arg1: int): int;
    getShort(arg0: any /*java.lang.CharSequence*/): any /*java.lang.Short*/;
    getShort(arg0: any /*java.lang.CharSequence*/, arg1: any /*short*/): any /*short*/;
    getTimeMillis(arg0: any /*java.lang.CharSequence*/): long | null;
    getTimeMillis(arg0: any /*java.lang.CharSequence*/, arg1: long): long;
    isEmpty(): boolean;
    iterator(): java.util.Iterator<any /*java.util.Map$Entry*/>;
    iteratorAsString(): java.util.Iterator<any /*java.util.Map$Entry*/>;
    iteratorCharSequence(): java.util.Iterator<any /*java.util.Map$Entry*/>;
    names(): java.util.Set<string>;
    remove(arg0: any /*java.lang.CharSequence*/): HttpHeaders;
    remove(arg0: string): HttpHeaders;
    set(arg0: HttpHeaders): HttpHeaders;
    set(arg0: any /*java.lang.CharSequence*/, arg1: any /*java.lang.Object*/): HttpHeaders;
    set(arg0: any /*java.lang.CharSequence*/, arg1: java.lang.Iterable<any /*java.lang.Object*/>): HttpHeaders;
    set(arg0: string, arg1: any /*java.lang.Object*/): HttpHeaders;
    set(arg0: string, arg1: java.lang.Iterable<any /*java.lang.Object*/>): HttpHeaders;
    setAll(arg0: HttpHeaders): HttpHeaders;
    setInt(arg0: any /*java.lang.CharSequence*/, arg1: int): HttpHeaders;
    setShort(arg0: any /*java.lang.CharSequence*/, arg1: any /*short*/): HttpHeaders;
    size(): int;
    spliterator(): any /*java.util.Spliterator*/;
    toString(): string;
    valueCharSequenceIterator(arg0: any /*java.lang.CharSequence*/): java.util.Iterator<any /*java.lang.CharSequence*/>;
    valueStringIterator(arg0: any /*java.lang.CharSequence*/): java.util.Iterator<string>;
  } // end HttpHeaders
} // end namespace io.netty.handler.codec.http
declare namespace io.netty.handler.codec.http {
  class HttpResponseStatus /* extends java.lang.Object implements java.lang.Comparable<any>*/ {
    code(): int;
    codeAsText(): any /*io.netty.util.AsciiString*/;
    codeClass(): any /*io.netty.handler.codec.http.HttpStatusClass*/;
    compareTo(arg0: HttpResponseStatus): int;
    equals(arg0: any /*java.lang.Object*/): boolean;
    reasonPhrase(): string;
    toString(): string;
  } // end HttpResponseStatus
} // end namespace io.netty.handler.codec.http
declare namespace java.lang {
  class String /* extends Object implements java.io.Serializable, Comparable<any>, CharSequence, java.lang.constant.Constable, java.lang.constant.ConstantDesc*/ {
    charAt(arg0: int): any /*char*/;
    chars(): any /*java.util.stream.IntStream*/;
    codePointAt(arg0: int): int;
    codePointBefore(arg0: int): int;
    codePointCount(arg0: int, arg1: int): int;
    codePoints(): any /*java.util.stream.IntStream*/;
    compareTo(arg0: string): int;
    compareToIgnoreCase(arg0: string): int;
    concat(arg0: string): string;
    contains(arg0: any /*java.lang.CharSequence*/): boolean;
    contentEquals(arg0: any /*java.lang.CharSequence*/): boolean;
    contentEquals(arg0: any /*java.lang.StringBuffer*/): boolean;
    describeConstable(): java.util.Optional<string>;
    endsWith(arg0: string): boolean;
    equals(arg0: any /*java.lang.Object*/): boolean;
    equalsIgnoreCase(arg0: string): boolean;
    formatted(...arg0: any /*java.lang.Object*/[]): string;
    getBytes(): bytearray;
    getBytes(arg0: any /*java.nio.charset.Charset*/): bytearray;
    getBytes(arg0: int, arg1: int, arg2: bytearray, arg3: int): void;
    getBytes(arg0: string): bytearray;
    getChars(arg0: int, arg1: int, arg2: chararray, arg3: int): void;
    indent(arg0: int): string;
    indexOf(arg0: int): int;
    indexOf(arg0: int, arg1: int): int;
    indexOf(arg0: int, arg1: int, arg2: int): int;
    indexOf(arg0: string): int;
    indexOf(arg0: string, arg1: int): int;
    indexOf(arg0: string, arg1: int, arg2: int): int;
    intern(): string;
    isBlank(): boolean;
    isEmpty(): boolean;
    lastIndexOf(arg0: int): int;
    lastIndexOf(arg0: int, arg1: int): int;
    lastIndexOf(arg0: string): int;
    lastIndexOf(arg0: string, arg1: int): int;
    length(): int;
    lines(): java.util.stream.Stream<string>;
    matches(arg0: string): boolean;
    offsetByCodePoints(arg0: int, arg1: int): int;
    regionMatches(arg0: boolean, arg1: int, arg2: string, arg3: int, arg4: int): boolean;
    regionMatches(arg0: int, arg1: string, arg2: int, arg3: int): boolean;
    repeat(arg0: int): string;
    replace(arg0: any /*char*/, arg1: any /*char*/): string;
    replace(arg0: any /*java.lang.CharSequence*/, arg1: any /*java.lang.CharSequence*/): string;
    replaceAll(arg0: string, arg1: string): string;
    replaceFirst(arg0: string, arg1: string): string;
    resolveConstantDesc(arg0: any /*java.lang.invoke.MethodHandles$Lookup*/): string;
    split(arg0: string): [string];
    split(arg0: string, arg1: int): [string];
    splitWithDelimiters(arg0: string, arg1: int): [string];
    startsWith(arg0: string): boolean;
    startsWith(arg0: string, arg1: int): boolean;
    strip(): string;
    stripIndent(): string;
    stripLeading(): string;
    stripTrailing(): string;
    subSequence(arg0: int, arg1: int): any /*java.lang.CharSequence*/;
    substring(arg0: int): string;
    substring(arg0: int, arg1: int): string;
    toCharArray(): chararray;
    toLowerCase(): string;
    toLowerCase(arg0: any /*java.util.Locale*/): string;
    toString(): string;
    toUpperCase(): string;
    toUpperCase(arg0: any /*java.util.Locale*/): string;
    transform<R>(arg0: Func<string, R>): R;
    translateEscapes(): string;
    trim(): string;
  } // end String
} // end namespace java.lang
declare namespace java.lang {
  class System /* extends Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end System
} // end namespace java.lang
declare namespace java.lang {
  interface Comparable<T> {
    compareTo(arg0: T): int;
  } // end Comparable
} // end namespace java.lang
declare namespace java.lang {
  interface Iterable<T> {
    (): java.util.Iterator<T>;
    forEach?(arg0: Consumer<T>): void;
    spliterator?(): any /*java.util.Spliterator*/;
  } // end Iterable
} // end namespace java.lang
declare namespace java.lang {
  interface Runnable {
    (): void;
  } // end Runnable
} // end namespace java.lang
declare namespace java.time {
  class Duration /* extends java.lang.Object implements java.time.temporal.TemporalAmount, java.lang.Comparable<any>, java.io.Serializable*/ {
    abs(): Duration;
    addTo(arg0: any /*java.time.temporal.Temporal*/): any /*java.time.temporal.Temporal*/;
    compareTo(arg0: Duration): int;
    dividedBy(arg0: Duration): long;
    dividedBy(arg0: long): Duration;
    equals(arg0: any /*java.lang.Object*/): boolean;
    get(arg0: java.time.temporal.TemporalUnit): long;
    getNano(): int;
    getSeconds(): long;
    getUnits(): java.util.List<java.time.temporal.TemporalUnit>;
    isNegative(): boolean;
    isPositive(): boolean;
    isZero(): boolean;
    minus(arg0: Duration): Duration;
    minus(arg0: long, arg1: java.time.temporal.TemporalUnit): Duration;
    minusDays(arg0: long): Duration;
    minusHours(arg0: long): Duration;
    minusMillis(arg0: long): Duration;
    minusMinutes(arg0: long): Duration;
    minusNanos(arg0: long): Duration;
    minusSeconds(arg0: long): Duration;
    multipliedBy(arg0: long): Duration;
    negated(): Duration;
    plus(arg0: Duration): Duration;
    plus(arg0: long, arg1: java.time.temporal.TemporalUnit): Duration;
    plusDays(arg0: long): Duration;
    plusHours(arg0: long): Duration;
    plusMillis(arg0: long): Duration;
    plusMinutes(arg0: long): Duration;
    plusNanos(arg0: long): Duration;
    plusSeconds(arg0: long): Duration;
    subtractFrom(arg0: any /*java.time.temporal.Temporal*/): any /*java.time.temporal.Temporal*/;
    toDays(): long;
    toDaysPart(): long;
    toHours(): long;
    toHoursPart(): int;
    toMillis(): long;
    toMillisPart(): int;
    toMinutes(): long;
    toMinutesPart(): int;
    toNanos(): long;
    toNanosPart(): int;
    toSeconds(): long;
    toSecondsPart(): int;
    toString(): string;
    truncatedTo(arg0: java.time.temporal.TemporalUnit): Duration;
    withNanos(arg0: int): Duration;
    withSeconds(arg0: long): Duration;
  } // end Duration
} // end namespace java.time
declare namespace java.time.temporal {
  /* enum */ class ChronoUnit /* extends java.lang.Enum<any> implements TemporalUnit*/ {
    // NANOS:ChronoUnit;
    // MICROS:ChronoUnit;
    // MILLIS:ChronoUnit;
    // SECONDS:ChronoUnit;
    // MINUTES:ChronoUnit;
    // HOURS:ChronoUnit;
    // HALF_DAYS:ChronoUnit;
    // DAYS:ChronoUnit;
    // WEEKS:ChronoUnit;
    // MONTHS:ChronoUnit;
    // YEARS:ChronoUnit;
    // DECADES:ChronoUnit;
    // CENTURIES:ChronoUnit;
    // MILLENNIA:ChronoUnit;
    // ERAS:ChronoUnit;
    // FOREVER:ChronoUnit;

    addTo<R>(arg0: R, arg1: long): R;
    between(arg0: any /*java.time.temporal.Temporal*/, arg1: any /*java.time.temporal.Temporal*/): long;
    compareTo<E>(arg0: E): int;
    describeConstable(): java.util.Optional<any /*java.lang.Enum$EnumDesc*/>;
    equals(arg0: any /*java.lang.Object*/): boolean;
    getDeclaringClass<E>(): java.lang.Class<E>;
    getDuration(): java.time.Duration;
    isDateBased(): boolean;
    isDurationEstimated(): boolean;
    isSupportedBy(arg0: any /*java.time.temporal.Temporal*/): boolean;
    isTimeBased(): boolean;
    name(): string;
    ordinal(): int;
    toString(): string;
  } // end ChronoUnit
} // end namespace java.time.temporal
declare namespace java.time.temporal {
  interface TemporalUnit {
    addTo<R>(arg0: R, arg1: long): R;
    between(arg0: any /*java.time.temporal.Temporal*/, arg1: any /*java.time.temporal.Temporal*/): long;
    getDuration(): java.time.Duration;
    isDateBased(): boolean;
    isDurationEstimated(): boolean;
    isSupportedBy(arg0: any /*java.time.temporal.Temporal*/): boolean;
    isTimeBased(): boolean;
    toString(): string;
  } // end TemporalUnit
} // end namespace java.time.temporal
declare namespace java.util {
  class Optional<T> /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    filter(arg0: Predicate<T>): Optional<T>;
    flatMap<U>(arg0: Func<T, Optional<U>>): Optional<U>;
    get(): T;
    ifPresent(arg0: Consumer<T>): void;
    ifPresentOrElse(arg0: Consumer<T>, arg1: java.lang.Runnable): void;
    isEmpty(): boolean;
    isPresent(): boolean;
    map<U>(arg0: Func<T, U>): Optional<U>;
    or(arg0: Supplier<Optional<T>>): Optional<T>;
    orElse(arg0: T): T;
    orElseGet(arg0: Supplier<T>): T;
    orElseThrow(): T;
    orElseThrow<X>(arg0: Supplier<X>): T;
    stream(): java.util.stream.Stream<T>;
    toString(): string;
  } // end Optional
} // end namespace java.util
declare namespace java.util {
  interface Collection<E> /* extends java.lang.Iterable<E>*/ {
    add(arg0: E): boolean;
    addAll(arg0: Collection<E>): boolean;
    clear(): void;
    contains(arg0: any /*java.lang.Object*/): boolean;
    containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
    equals(arg0: any /*java.lang.Object*/): boolean;
    forEach<T>(arg0: Consumer<T>): void;
    isEmpty(): boolean;
    iterator(): Iterator<E>;
    parallelStream(): java.util.stream.Stream<E>;
    remove(arg0: any /*java.lang.Object*/): boolean;
    removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
    removeIf(arg0: Predicate<E>): boolean;
    retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
    size(): int;
    spliterator(): any /*java.util.Spliterator*/;
    stream(): java.util.stream.Stream<E>;
    toArray(): [any /*java.lang.Object*/];
    toArray<T>(arg0: T[]): T[];
    toArray<T>(arg0: any /*java.util.function.IntFunction*/): T[];
  } // end Collection
} // end namespace java.util
declare namespace java.util {
  interface Iterator<E> {
    forEachRemaining(arg0: Consumer<E>): void;
    hasNext(): boolean;
    next(): E;
    remove(): void;
  } // end Iterator
} // end namespace java.util
declare namespace java.util {
  interface Set<E> /* extends Collection<E>*/ {
    // static copyOf<E>( arg0:Collection<E> ):Set<E>;
    // static of<E>(  ):Set<E>;
    // static of<E>( ...arg0:E[] ):Set<E>;
    // static of<E>( arg0:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E ):Set<E>;
    // static of<E>( arg0:E, arg1:E, arg2:E, arg3:E, arg4:E, arg5:E, arg6:E, arg7:E, arg8:E, arg9:E ):Set<E>;
    add(arg0: E): boolean;
    addAll(arg0: Collection<E>): boolean;
    clear(): void;
    contains(arg0: any /*java.lang.Object*/): boolean;
    containsAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
    equals(arg0: any /*java.lang.Object*/): boolean;
    forEach<T>(arg0: Consumer<T>): void;
    isEmpty(): boolean;
    iterator(): Iterator<E>;
    parallelStream(): java.util.stream.Stream<E>;
    remove(arg0: any /*java.lang.Object*/): boolean;
    removeAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
    removeIf(arg0: Predicate<E>): boolean;
    retainAll(arg0: Collection<any /*java.lang.Object*/>): boolean;
    size(): int;
    spliterator(): any /*java.util.Spliterator*/;
    stream(): java.util.stream.Stream<E>;
    toArray(): [any /*java.lang.Object*/];
    toArray<T>(arg0: T[]): T[];
    toArray<T>(arg0: any /*java.util.function.IntFunction*/): T[];
  } // end Set
} // end namespace java.util
declare namespace java.util.stream {
  class Collectors /* extends java.lang.Object*/ {
    equals(arg0: any /*java.lang.Object*/): boolean;
    toString(): string;
  } // end Collectors
} // end namespace java.util.stream
declare namespace java.util.stream {
  interface Stream<T> /* extends BaseStream<T, any>*/ {
    allMatch(arg0: Predicate<T>): boolean;
    anyMatch(arg0: Predicate<T>): boolean;
    close(): void;
    collect<R>(arg0: Supplier<R>, arg1: BiConsumer<R, T>, arg2: BiConsumer<R, R>): R;
    collect<R>(arg0: any /*java.util.stream.Collector*/): R;
    count(): long;
    distinct(): Stream<T>;
    dropWhile(arg0: Predicate<T>): Stream<T>;
    filter(arg0: Predicate<T>): Stream<T>;
    findAny(): java.util.Optional<T>;
    findFirst(): java.util.Optional<T>;
    flatMap<R>(arg0: Func<T, Stream<R>>): Stream<R>;
    flatMapToDouble(arg0: Func<T, any /*java.util.stream.DoubleStream*/>): any /*java.util.stream.DoubleStream*/;
    flatMapToInt(arg0: Func<T, any /*java.util.stream.IntStream*/>): any /*java.util.stream.IntStream*/;
    flatMapToLong(arg0: Func<T, any /*java.util.stream.LongStream*/>): any /*java.util.stream.LongStream*/;
    forEach(arg0: Consumer<T>): void;
    forEachOrdered(arg0: Consumer<T>): void;
    gather<R>(arg0: any /*java.util.stream.Gatherer*/): Stream<R>;
    isParallel(): boolean;
    iterator(): java.util.Iterator<T>;
    limit(arg0: long): Stream<T>;
    map<R>(arg0: Func<T, R>): Stream<R>;
    mapMulti<R>(arg0: BiConsumer<T, Consumer<R>>): Stream<R>;
    mapMultiToDouble(
      arg0: BiConsumer<T, any /*java.util.function.DoubleConsumer*/>
    ): any /*java.util.stream.DoubleStream*/;
    mapMultiToInt(arg0: BiConsumer<T, any /*java.util.function.IntConsumer*/>): any /*java.util.stream.IntStream*/;
    mapMultiToLong(arg0: BiConsumer<T, any /*java.util.function.LongConsumer*/>): any /*java.util.stream.LongStream*/;
    mapToDouble(arg0: any /*java.util.function.ToDoubleFunction*/): any /*java.util.stream.DoubleStream*/;
    mapToInt(arg0: any /*java.util.function.ToIntFunction*/): any /*java.util.stream.IntStream*/;
    mapToLong(arg0: any /*java.util.function.ToLongFunction*/): any /*java.util.stream.LongStream*/;
    max(arg0: any /*java.util.Comparator*/): java.util.Optional<T>;
    min(arg0: any /*java.util.Comparator*/): java.util.Optional<T>;
    noneMatch(arg0: Predicate<T>): boolean;
    onClose<S>(arg0: java.lang.Runnable): S;
    parallel<S>(): S;
    peek(arg0: Consumer<T>): Stream<T>;
    reduce(arg0: BinaryOperator<T>): java.util.Optional<T>;
    reduce(arg0: T, arg1: BinaryOperator<T>): T;
    reduce<U>(arg0: U, arg1: BiFunction<U, T, U>, arg2: BinaryOperator<U>): U;
    sequential<S>(): S;
    skip(arg0: long): Stream<T>;
    sorted(): Stream<T>;
    sorted(arg0: any /*java.util.Comparator*/): Stream<T>;
    spliterator(): any /*java.util.Spliterator*/;
    takeWhile(arg0: Predicate<T>): Stream<T>;
    toArray(): [any /*java.lang.Object*/];
    toArray<A>(arg0: any /*java.util.function.IntFunction*/): A[];
    toList(): java.util.List<T>;
    unordered<S>(): S;
  } // end Stream
} // end namespace java.util.stream
interface BiConsumer<T, U> /*java.util.function.BiConsumer*/ {
  (arg0: T, arg1: U): void;
  andThen?(arg0: BiConsumer<T, U>): BiConsumer<T, U>;
} // end BiConsumer
interface BiFunction<T, U, R> /*java.util.function.BiFunction*/ {
  (arg0: T, arg1: U): R;
  andThen?<V>(arg0: Func<R, V>): BiFunction<T, U, V>;
} // end BiFunction
interface BiPredicate<T, U> /*java.util.function.BiPredicate*/ {
  (arg0: T, arg1: U): boolean;
  and?(arg0: BiPredicate<T, U>): BiPredicate<T, U>;
  negate?(): BiPredicate<T, U>;
  or?(arg0: BiPredicate<T, U>): BiPredicate<T, U>;
} // end BiPredicate
interface BinaryOperator<T> /*java.util.function.BinaryOperator extends BiFunction<T, any, any>*/ {
  <R, U>(arg0: T, arg1: U): R;
  // static maxBy<T>( arg0:any /*java.util.Comparator*/ ):BinaryOperator<T>;
  // static minBy<T>( arg0:any /*java.util.Comparator*/ ):BinaryOperator<T>;
  andThen?<R, U, V>(arg0: Func<R, V>): BiFunction<T, U, V>;
} // end BinaryOperator
interface Consumer<T> /*java.util.function.Consumer*/ {
  (arg0: T): void;
  andThen?(arg0: Consumer<T>): Consumer<T>;
} // end Consumer
interface Func<T, R> /*java.util.function.Function*/ {
  (arg0: T): R;
  // static identity<T>(  ):Func<T, T>;
  andThen?<V>(arg0: Func<R, V>): Func<T, V>;
  compose?<V>(arg0: Func<V, T>): Func<V, R>;
} // end Func
interface Predicate<T> /*java.util.function.Predicate*/ {
  (arg0: T): boolean;
  // static isEqual<T>( arg0:any /*java.lang.Object*/ ):Predicate<T>;
  // static not<T>( arg0:Predicate<T> ):Predicate<T>;
  and?(arg0: Predicate<T>): Predicate<T>;
  negate?(): Predicate<T>;
  or?(arg0: Predicate<T>): Predicate<T>;
} // end Predicate
interface Supplier<T> /*java.util.function.Supplier*/ {
  (): T;
} // end Supplier
interface UnaryOperator<T> /*java.util.function.UnaryOperator extends Function<T, any>*/ {
  <R>(arg0: T): R;
  // static identity<T>(  ):UnaryOperator<T>;
  andThen?<R, V>(arg0: Func<R, V>): Func<T, V>;
  compose?<R, V>(arg0: Func<V, T>): Func<V, R>;
} // end UnaryOperator
