import { Simulation, Session } from "@gatling.io/core";
import { atOnceUsers, scenario } from "@gatling.io/core";

import { http, Proxy } from "./index";

const runSimulationMock = (_: Simulation): void => {};

const httpProtocol = http
  .baseUrl("url")
  .baseUrls("url1", "urls2")
  //.baseUrls(...["url"])
  .warmUp("url")
  .disableWarmUp()
  .shareConnections()
  .localAddress("127.0.0.1")
  .localAddresses("127.0.0.1", "127.0.0.2")
  //.localAddresses(...["127.0.0.1"])
  .useAllLocalAddresses()
  .useAllLocalAddressesMatching("pattern")
  .maxConnectionsPerHost(1)
  //.perUserKeyManagerFactory(
  //  session -> {
  //    try {
  //      return KeyManagerFactory.getInstance("TLS");
  //    } catch (NoSuchAlgorithmException e) {
  //      throw new RuntimeException(e);
  //    }
  //  })
  .disableAutoReferer()
  .disableAutoOrigin()
  .disableCaching()
  .header("name", "value")
  .header("name", (_: Session) => "value")
  .headers({ key: "value" })
  .acceptHeader("value")
  .acceptHeader((_: Session) => "value")
  .acceptCharsetHeader("value")
  .acceptCharsetHeader((_: Session) => "value")
  .acceptEncodingHeader("value")
  .acceptEncodingHeader((_: Session) => "value")
  .acceptLanguageHeader("value")
  .acceptLanguageHeader((_: Session) => "value")
  .acceptLanguageHeader("value")
  .acceptLanguageHeader((_: Session) => "value")
  .authorizationHeader("value")
  .authorizationHeader((_: Session) => "value")
  .connectionHeader("value")
  .connectionHeader((_: Session) => "value")
  .contentTypeHeader("value")
  .contentTypeHeader((_: Session) => "value")
  .doNotTrackHeader("value")
  .doNotTrackHeader((_: Session) => "value")
  .originHeader("value")
  .originHeader((_: Session) => "value")
  .userAgentHeader("value")
  .userAgentHeader((_: Session) => "value")
  .upgradeInsecureRequestsHeader("value")
  .upgradeInsecureRequestsHeader((_: Session) => "value")
  .basicAuth("username", "password")
  .basicAuth("username", (_: Session) => "password")
  .basicAuth((_: Session) => "username", "password")
  .basicAuth(
    (_: Session) => "username",
    (_: Session) => "password"
  )
  .digestAuth((_: Session) => "username", "password")
  .digestAuth(
    (_: Session) => "username",
    (_: Session) => "password"
  )
  .silentResources()
  .silentUri("regex")
  .disableUrlEncoding()
  .sign((request) => request)
  .sign((request, _: Session) => request)
  .signWithOAuth1("consumerKey", "clientSharedSecret", "token", "tokenSecret")
  .signWithOAuth1("consumerKey", "clientSharedSecret", "token", "tokenSecret", true)
  .signWithOAuth1(
    (_: Session) => "consumerKey",
    (_: Session) => "clientSharedSecret",
    (_: Session) => "token",
    (_: Session) => "tokenSecret"
  )
  .signWithOAuth1(
    (_: Session) => "consumerKey",
    (_: Session) => "clientSharedSecret",
    (_: Session) => "token",
    (_: Session) => "tokenSecret",
    true
  )
  .enableHttp2()
  .http2PriorKnowledge({ host: true })
  .disableFollowRedirect()
  .maxRedirects(1)
  .strict302Handling()
  //.redirectNamingStrategy(
  //  (uri, originalRequestName, redirectCount) ->
  //    originalRequestName + " Redirect " + redirectCount)
  //.transformResponse((response, session) -> response)
  .inferHtmlResources()
  //.inferHtmlResources(AllowList("allow"))
  //.inferHtmlResources(DenyList("deny"))
  //.inferHtmlResources(AllowList("allow"), DenyList("deny"))
  .nameInferredHtmlResourcesAfterUrlTail()
  .nameInferredHtmlResourcesAfterAbsoluteUrl()
  .nameInferredHtmlResourcesAfterRelativeUrl()
  .nameInferredHtmlResourcesAfterPath()
  .nameInferredHtmlResourcesAfterLastPathElement()
  //.nameInferredHtmlResources(uri -> "foo")
  .noProxyFor("host1", "host2")
  .proxy(Proxy("172.31.76.106", 8080))
  .proxy(Proxy("172.31.76.106", 8080).credentials("username", "password"))
  .proxy(Proxy("172.31.76.106", 8080).http())
  .proxy(Proxy("172.31.76.106", 8080).socks4())
  .proxy(Proxy("172.31.76.106", 8080).socks5())
  .asyncNameResolution("dnsServer1", "dnsServer2")
  .perUserNameResolution();
//.check(
//  bodyBytes(),
//  bodyBytes().is("foo".getBytes(UTF_8)),
//  bodyBytes().is(RawFileBody("foo")),
//  bodyBytes().saveAs("key"),
//  bodyBytes().find().is("foo".getBytes(UTF_8)),
//  bodyLength().gt(1),
//  bodyString().transform(String::length).lt(100000),
//  bodyString().is(StringBody("foo")),
//  bodyStream(),
//  regex("pattern").findAll(),
//  regex("pattern").captureGroups(2).is(Arrays.asList("foo", "bar")),
//  regex("pattern").findRandom(),
//  regex("pattern").findRandom(2),
//  regex("pattern").findRandom(2, true),
//  regex("pattern").saveAs("key"),
//  regex(session -> "pattern").saveAs("key"),
//  substring("foo").is(1),
//  substring(session -> "foo").is(1),
//  xpath("//foo"),
//  xpath("//foo", Map.of()),
//  xpath(session -> "//foo"),
//  xpath(session -> "//foo", Map.of()),
//  css("selector"),
//  css("selector", "attribute"),
//  css(session -> "selector"),
//  css(session -> "selector", "attribute"),
//  form("#form"),
//  form(session -> "#form"),
//  jsonPath("$..foo"),
//  jsonPath("$..foo").ofBoolean(),
//  jsonPath("$..foo").ofInt(),
//  jsonPath("$..foo").ofLong(),
//  jsonPath("$..foo").ofDouble(),
//  jsonPath("$..foo").ofList(),
//  jsonPath("$..foo").ofMap(),
//  jsonPath("$..foo").ofObject(),
//  jsonPath(session -> "$..foo").withDefault(session -> "foo"),
//  jsonPath("$..foo"),
//  jsonpJsonPath("$..foo"),
//  jsonpJsonPath("$..foo").ofBoolean(),
//  jsonpJsonPath("$..foo").ofInt(),
//  jsonpJsonPath("$..foo").ofLong(),
//  jsonpJsonPath("$..foo").ofDouble(),
//  jsonpJsonPath("$..foo").ofList(),
//  jsonpJsonPath("$..foo").ofMap(),
//  jsonpJsonPath("$..foo").ofObject(),
//  jsonpJsonPath(session -> "$..foo"),
//  jmesPath("foo"),
//  jmesPath("foo").ofBoolean(),
//  jmesPath("foo").ofInt(),
//  jmesPath("foo").ofLong(),
//  jmesPath("foo").ofDouble(),
//  jmesPath("foo").ofList(),
//  jmesPath("foo").ofMap(),
//  jmesPath("foo").ofObject(),
//  jmesPath(session -> "foo"),
//  jsonpJmesPath("foo"),
//  jsonpJmesPath("foo").ofBoolean(),
//  jsonpJmesPath("foo").ofInt(),
//  jsonpJmesPath("foo").ofLong(),
//  jsonpJmesPath("foo").ofDouble(),
//  jsonpJmesPath("foo").ofList(),
//  jsonpJmesPath("foo").ofMap(),
//  jsonpJmesPath("foo").ofObject(),
//  jsonpJmesPath(session -> "$..foo"),
//  md5().find().isEL("XXXXX"),
//  sha1().find().isEL("XXXXX"),
//  responseTimeInMillis().find().is(100),
//  md5().find().is("XXXXX"),
//  sha1().find().is("XXXXX"),
//  responseTimeInMillis().find().is(100),
//  status().is(200),
//  currentLocation().is("url"),
//  currentLocationRegex("pattern"),
//  currentLocationRegex(session -> "pattern"),
//  header("name"),
//  header(HttpHeaderNames.CONTENT_TYPE),
//  header(session -> HttpHeaderNames.CONTENT_TYPE),
//  headerRegex("name", "pattern"),
//  headerRegex(HttpHeaderNames.CONTENT_TYPE, "pattern"),
//  headerRegex(session -> HttpHeaderNames.CONTENT_TYPE, "pattern"),
//  headerRegex("name", session -> "pattern"),
//  headerRegex(HttpHeaderNames.CONTENT_TYPE, session -> "pattern"),
//  headerRegex(session -> HttpHeaderNames.CONTENT_TYPE, session -> "pattern")
//)
//.checkIf("#{bool}").then(jsonPath("$..foo"))
//.checkIf("#{bool}").then(jsonPath("$..foo"), jsonPath("$..foo"))
//.checkIf((response, session) -> true).then(jsonPath("$..foo"));
const scn = scenario("scenario")
  .exec(
    http("name").get("url")
    //.queryParam("key", "value")
    //.queryParam(session -> "key", "value")
    //.queryParam("key", session -> "value")
    //.queryParam(session -> "key", session -> "value")
    //.queryParam("key", 1)
    //.queryParam(session -> "key", 1)
    //.queryParam("key", session -> 1)
    //.queryParam(session -> "key", session -> 1)
    //.multivaluedQueryParam("key", List.of(1))
    //.multivaluedQueryParam(session -> "key", List.of(1))
    //.multivaluedQueryParam("key", session -> List.of(1))
    //.multivaluedQueryParam(session -> "key", session -> List.of(1))
    //.queryParamSeq(List.of(new AbstractMap.SimpleImmutableEntry<>("foo", "bar")))
    //.queryParamSeq(session -> List.of(new AbstractMap.SimpleImmutableEntry<>("foo", "bar")))
    //.queryParamMap(Map.of("key", "value"))
    //.queryParamMap(session -> Map.of("key", "value"))
    //.header("key", "value")
    //.header("key", session -> "value")
    //.headers(Map.of("key", "value"))
    //.ignoreProtocolHeaders()
    //.asJson()
    //.asXml()
    //.basicAuth("username", "password")
    //.basicAuth("username", session -> "password")
    //.basicAuth(session -> "username", "password")
    //.basicAuth(session -> "username", session -> "password")
    //.digestAuth("username", "password")
    //.digestAuth("username", session -> "password")
    //.digestAuth(session -> "username", "password")
    //.digestAuth(session -> "username", session -> "password")
    //.virtualHost("virtualHost")
    //.virtualHost(session -> "virtualHost")
    //.disableUrlEncoding()
    //.sign(request -> request)
    //.sign((request, session) -> request)
    //.signWithOAuth1("consumerKey", "clientSharedSecret", "token", "tokenSecret")
    //.signWithOAuth1(
    //  session -> "consumerKey",
    //  session -> "clientSharedSecret",
    //  session -> "token",
    //  session -> "tokenSecret")
    //.ignoreProtocolChecks()
    //.silent()
    //.notSilent()
    //.disableFollowRedirect()
    //.transformResponse((response, session) -> response)
    //.body(StringBody("static #{dynamic} static"))
    //.resources(http("name").get("url"), http("name").get("url"))
    //.asMultipartForm()
    //.asFormUrlEncoded()
    //.formParam("key", "value")
    //.formParam(session -> "key", "value")
    //.formParam("key", session -> "value")
    //.formParam(session -> "key", session -> "value")
    //.formParam("key", 1)
    //.formParam(session -> "key", 1)
    //.formParam("key", session -> 1)
    //.formParam(session -> "key", session -> 1)
    //.multivaluedFormParam("key", List.of(1))
    //.multivaluedFormParam(session -> "key", List.of(1))
    //.multivaluedFormParam("key", session -> List.of(1))
    //.multivaluedFormParam(session -> "key", session -> List.of(1))
    //.formParamSeq(List.of(new AbstractMap.SimpleImmutableEntry<>("foo", "bar")))
    //.formParamSeq(
    //  session -> List.of(new AbstractMap.SimpleImmutableEntry<>("foo", "bar")))
    //.formParamMap(Map.of("key", "value"))
    //.formParamMap(session -> Map.of("key", "value"))
    //.form("#{key}")
    //.form(session -> Map.of("key", "value"))
    //.formUpload("name", "filePath")
    //.formUpload(session -> "name", "filePath")
    //.formUpload("name", session -> "filePath")
    //.bodyPart(RawFileBodyPart("name", "path"))
    //.bodyPart(ElFileBodyPart("name", "path"))
    //.bodyPart(ElFileBodyPart("name", "path").contentType("foo"))
    //.bodyPart(PebbleFileBodyPart("name", "path"))
    //.bodyPart(PebbleStringBodyPart("name", "somePebbleString"))
    //.bodyParts(RawFileBodyPart("name1", "path1"), RawFileBodyPart("name2", "path2"))
    //.formUpload(session -> "name", session -> "filePath")
    //.requestTimeout(1)
    //.requestTimeout(Duration.ofSeconds(1))
  )
  .exec(http("name").get((session) => "url"))
  //.exec(http("name").put("url"))
  //.exec(http("name").put(session -> "url"))
  //.exec(http("name").post("url"))
  //.exec(http("name").post(session -> "url"))
  //.exec(http("name").patch("url"))
  //.exec(http("name").patch(session -> "url"))
  //.exec(http("name").head("url"))
  //.exec(http("name").head(session -> "url"))
  //.exec(http("name").delete("url"))
  //.exec(http("name").delete(session -> "url"))
  //.exec(http("name").options("url"))
  //.exec(http("name").options(session -> "url"))
  //.exec(http("name").httpRequest("JSON", "url"))
  //.exec(http("name").httpRequest("JSON", session -> "url"))
  // check
  .exec(
    http("name").get("url")
    //.check(status().is(200))
    //.checkIf("#{bool}").then(jsonPath("$..foo"))
    //.checkIf("#{bool}").then(jsonPath("$..foo"), jsonPath("$..foo"))
    //.checkIf((response, session) -> true).then(jsonPath("$..foo"))
  );
// processRequestBody
//.exec(
//  http("Request")
//    .post("/things")
//    .body(StringBody("FOO#{BAR}BAZ"))
//    .processRequestBody(Function.identity())
//)
//.exec(
//  http("Request")
//    .post("/things")
//    .body(ByteArrayBody("#{bytes}"))
//    .processRequestBody(gzipBody)
//)
// proxy
//.exec(http("Request").head("/").proxy(Proxy("172.31.76.106", 8080).httpsPort(8081)))
//.exec(http("Request").head("/").proxy(Proxy("172.31.76.106", 8080).socks4()))
//.exec(http("Request").head("/").proxy(Proxy("172.31.76.106", 8080).socks5()))
// polling
//.exec(poll().every(10).exec(http("poll").get("/foo")))
//.exec(poll().pollerName("poll").every(10).exec(http("poll").get("/foo")))
//.exec(poll().pollerName("poll").stop())
//.exec(poll().stop())
// addCookie
//.exec(addCookie(Cookie("foo", "bar").withDomain("foo.com")))
// getCookieValue
//.exec(getCookieValue(CookieKey("foo").withDomain("foo.com").saveAs("newName")))
// flushSessionCookies
//.exec(flushSessionCookies())
// flushCookieJar
//.exec(flushCookieJar())
// flushHttpCache
//.exec(flushHttpCache())
// feeder
//.feed(sitemap("file"));

runSimulationMock((setUp) => {
  setUp(
    scn.injectOpen(atOnceUsers(1))
    //.protocols(httpProtocol)
  ).protocols(httpProtocol);
});
