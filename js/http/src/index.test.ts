import {
  AllowList,
  DenyList,
  ElFileBody,
  RawFileBody,
  Session,
  Simulation,
  StringBody,
  atOnceUsers,
  bodyBytes,
  bodyLength,
  bodyString,
  css,
  form,
  jmesPath,
  jsonPath,
  jsonpJmesPath,
  jsonpJsonPath,
  md5,
  regex,
  responseTimeInMillis,
  scenario,
  sha1,
  substring,
  xpath
} from "@gatling.io/core";

import {
  Cookie,
  CookieKey,
  ElFileBodyPart,
  Proxy,
  RawFileBodyPart,
  addCookie,
  currentLocation,
  currentLocationRegex,
  flushCookieJar,
  flushHttpCache,
  flushSessionCookies,
  getCookieValue,
  header,
  headerRegex,
  http,
  poll,
  status,
  sitemap
} from "./index";

const runSimulationMock = (_: Simulation): void => {};

const httpProtocol = http
  .baseUrl("url")
  .baseUrls("url1", "urls2")
  .warmUp("url")
  .disableWarmUp()
  .shareConnections()
  .localAddress("127.0.0.1")
  .localAddresses("127.0.0.1", "127.0.0.2")
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
  //.sign((request) => request)
  //.sign((request, _: Session) => request)
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
  .inferHtmlResources(AllowList("allow"))
  .inferHtmlResources(DenyList("deny"))
  .inferHtmlResources(AllowList("allow"), DenyList("deny"))
  .nameInferredHtmlResourcesAfterUrlTail()
  .nameInferredHtmlResourcesAfterAbsoluteUrl()
  .nameInferredHtmlResourcesAfterRelativeUrl()
  .nameInferredHtmlResourcesAfterPath()
  .nameInferredHtmlResourcesAfterLastPathElement()
  //.nameInferredHtmlResources(uri -> "foo")
  .proxy(Proxy("172.31.76.106", 8080))
  .proxy(Proxy("172.31.76.106", 8080).credentials("username", "password"))
  .proxy(Proxy("172.31.76.106", 8080).http())
  .proxy(Proxy("172.31.76.106", 8080).socks4())
  .proxy(Proxy("172.31.76.106", 8080).socks5())
  .proxy(Proxy("172.31.76.106", 8080).connectHeader("foo", "#{bar}"))
  .proxy(Proxy("172.31.76.106", 8080).connectHeaders({ foo: "#{bar}" }))
  .noProxyFor("host1", "host2")
  .proxyProtocolSourceIpV4Address("#{proxyProtocolSourceIpV4Address}")
  .proxyProtocolSourceIpV6Address("#{proxyProtocolSourceIpV6Address}")
  .asyncNameResolution("dnsServer1", "dnsServer2")
  .hostNameAliases({ "gatling.io": ["192.168.0.1", "192.168.0.2"] })
  .perUserNameResolution()
  .check(
    bodyBytes(),
    bodyBytes().is([102, 111, 111]),
    bodyBytes().is(RawFileBody("foo")),
    bodyBytes().saveAs("key"),
    bodyBytes().find().is([102, 111, 111]),
    bodyLength().gt(1),
    bodyString()
      .transform((str: string) => str.length)
      .lt(100000),
    bodyString().is(StringBody("foo")),
    regex("pattern").findAll(),
    regex("pattern").captureGroups(2).is(["foo", "bar"]),
    regex("pattern").findRandom(),
    regex("pattern").findRandom(2),
    regex("pattern").findRandom(2, true),
    regex("pattern").saveAs("key"),
    regex((_: Session) => "pattern").saveAs("key"),
    substring("foo").is(1),
    substring((_: Session) => "foo").is(1),
    xpath("//foo"),
    xpath("//foo", {}),
    xpath((_: Session) => "//foo"),
    xpath((_: Session) => "//foo", {}),
    css("selector"),
    css("selector", "attribute"),
    css((_: Session) => "selector"),
    css((_: Session) => "selector", "attribute"),
    form("#form"),
    form((_: Session) => "#form"),
    jsonPath("$..foo"),
    jsonPath("$..foo").ofBoolean(),
    jsonPath("$..foo").ofInt(),
    jsonPath("$..foo").ofLong(),
    jsonPath("$..foo").ofDouble(),
    jsonPath("$..foo").ofList(),
    jsonPath("$..foo").ofMap(),
    jsonPath("$..foo").ofObject(),
    jsonPath((_: Session) => "$..foo").withDefault((_: Session) => "foo"),
    jsonPath("$..foo"),
    jsonpJsonPath("$..foo"),
    jsonpJsonPath("$..foo").ofBoolean(),
    jsonpJsonPath("$..foo").ofInt(),
    jsonpJsonPath("$..foo").ofLong(),
    jsonpJsonPath("$..foo").ofDouble(),
    jsonpJsonPath("$..foo").ofList(),
    jsonpJsonPath("$..foo").ofMap(),
    jsonpJsonPath("$..foo").ofObject(),
    jsonpJsonPath((_: Session) => "$..foo"),
    jmesPath("foo"),
    jmesPath("foo").ofBoolean(),
    jmesPath("foo").ofInt(),
    jmesPath("foo").ofLong(),
    jmesPath("foo").ofDouble(),
    jmesPath("foo").ofList(),
    jmesPath("foo").ofMap(),
    jmesPath("foo").ofObject(),
    jmesPath((_: Session) => "foo"),
    jsonpJmesPath("foo"),
    jsonpJmesPath("foo").ofBoolean(),
    jsonpJmesPath("foo").ofInt(),
    jsonpJmesPath("foo").ofLong(),
    jsonpJmesPath("foo").ofDouble(),
    jsonpJmesPath("foo").ofList(),
    jsonpJmesPath("foo").ofMap(),
    jsonpJmesPath("foo").ofObject(),
    jsonpJmesPath((_: Session) => "$..foo"),
    md5().find().isEL("XXXXX"),
    sha1().find().isEL("XXXXX"),
    responseTimeInMillis().find().is(100),
    md5().find().is("XXXXX"),
    sha1().find().is("XXXXX"),
    responseTimeInMillis().find().is(100),
    status().is(200),
    currentLocation().is("url"),
    currentLocationRegex("pattern"),
    currentLocationRegex((_: Session) => "pattern"),
    header("name"),
    header((_: Session) => "name"),
    headerRegex("name", "pattern"),
    headerRegex((_: Session) => "name", "pattern"),
    headerRegex("name", (_: Session) => "pattern"),
    headerRegex(
      (_: Session) => "name",
      (_: Session) => "pattern"
    )
  )
  .checkIf("#{bool}")
  .then(jsonPath("$..foo"))
  .checkIf("#{bool}")
  .then(jsonPath("$..foo"), jsonPath("$..foo"));
//.checkIf((response, session) -> true).then(jsonPath("$..foo"));

const scn = scenario("scenario")
  .exec(
    http("name")
      .get("url")
      .queryParam("key", "value")
      .queryParam((_: Session) => "key", "value")
      .queryParam("key", (_: Session) => "value")
      .queryParam(
        (_: Session) => "key",
        (_: Session) => "value"
      )
      .queryParam("key", 1)
      .queryParam((_: Session) => "key", 1)
      .queryParam("key", (_: Session) => 1)
      .queryParam(
        (_: Session) => "key",
        (_: Session) => 1
      )
      .multivaluedQueryParam("key", [1])
      .multivaluedQueryParam((_: Session) => "key", [1])
      .multivaluedQueryParam("key", (_: Session) => [1])
      .multivaluedQueryParam(
        (_: Session) => "key",
        (_: Session) => [1]
      )
      .queryParamMap({ key: "value" })
      .queryParamMap((_: Session) => ({ key: "value" }))
      .header("key", "value")
      .header("key", (_: Session) => "value")
      .headers({ key: "value" })
      .ignoreProtocolHeaders()
      .asJson()
      .asXml()
      .basicAuth("username", "password")
      .basicAuth("username", (_: Session) => "password")
      .basicAuth((_: Session) => "username", "password")
      .basicAuth(
        (_: Session) => "username",
        (_: Session) => "password"
      )
      .digestAuth("username", "password")
      .digestAuth("username", (_: Session) => "password")
      .digestAuth((_: Session) => "username", "password")
      .digestAuth(
        (_: Session) => "username",
        (_: Session) => "password"
      )
      .disableUrlEncoding()
      //.sign(request -> request)
      //.sign((request, session) -> request)
      .signWithOAuth1("consumerKey", "clientSharedSecret", "token", "tokenSecret")
      .signWithOAuth1(
        (_: Session) => "consumerKey",
        (_: Session) => "clientSharedSecret",
        (_: Session) => "token",
        (_: Session) => "tokenSecret"
      )
      .ignoreProtocolSignatureCalculators()
      .ignoreProtocolChecks()
      .silent()
      .notSilent()
      .disableFollowRedirect()
      //.transformResponse((response, session) -> response)
      .body(StringBody("static #{dynamic} static"))
      .resources(http("name").get("url"), http("name").get("url"))
      .asMultipartForm()
      .asFormUrlEncoded()
      .formParam("key", "value")
      .formParam((_: Session) => "key", "value")
      .formParam("key", (_: Session) => "value")
      .formParam(
        (_: Session) => "key",
        (_: Session) => "value"
      )
      .formParam("key", 1)
      .formParam((_: Session) => "key", 1)
      .formParam("key", (_: Session) => 1)
      .formParam(
        (_: Session) => "key",
        (_: Session) => 1
      )
      .multivaluedFormParam("key", [1])
      .multivaluedFormParam((_: Session) => "key", [1])
      .multivaluedFormParam("key", (_: Session) => [1])
      .multivaluedFormParam(
        (_: Session) => "key",
        (_: Session) => [1]
      )
      .formParamMap({ key: "value" })
      .formParamMap((_: Session) => ({ key: "value" }))
      .form("#{key}")
      .form((_: Session) => ({ key: "value" }))
      .formUpload("name", "filePath")
      .formUpload((_: Session) => "name", "filePath")
      .formUpload("name", (_: Session) => "filePath")
      .formUpload(
        (_: Session) => "name",
        (_: Session) => "filePath"
      )
      .bodyPart(RawFileBodyPart("name", "path"))
      .bodyPart(ElFileBodyPart("name", "path"))
      .bodyPart(ElFileBodyPart("name", "path").contentType("foo"))
      //.bodyPart(PebbleFileBodyPart("name", "path"))
      //.bodyPart(PebbleStringBodyPart("name", "somePebbleString"))
      .bodyParts(RawFileBodyPart("name1", "path1"), RawFileBodyPart("name2", "path2"))
      .requestTimeout(1)
      .requestTimeout({ amount: 1, unit: "seconds" })
  )
  .exec(http("name").get((_: Session) => "url"))
  .exec(http("name").put("url"))
  .exec(http("name").put((_: Session) => "url"))
  .exec(http("name").post("url"))
  .exec(http("name").post((_: Session) => "url"))
  .exec(http("name").patch("url"))
  .exec(http("name").patch((_: Session) => "url"))
  .exec(http("name").head("url"))
  .exec(http("name").head((_: Session) => "url"))
  .exec(http("name").delete("url"))
  .exec(http("name").delete((_: Session) => "url"))
  .exec(http("name").options("url"))
  .exec(http("name").options((_: Session) => "url"))
  .exec(http("name").httpRequest("JSON", "url"))
  .exec(http("name").httpRequest("JSON", (_: Session) => "url"))
  // check
  .exec(
    http("name")
      .get("url")
      .check(
        status().is(200),
        status().in(200, 210).saveAs("blablaParam"),
        header("HEADER").is("BAR"),
        headerRegex("location", ".*&id_token=(.*)&state=.*").find().exists(),
        headerRegex("location", ".*&id_token=(.*)&state=.*").is("BAR"),
        headerRegex("location", ".*&id_token=(.*)&state=.*").captureGroups(2),
        currentLocation().is("https://gatling.io"),
        currentLocationRegex("code=(.+)&"),
        currentLocationRegex("foo").find().exists(),
        bodyBytes().is([1, 1, 1, 1, 1]),
        bodyBytes().is(RawFileBody("foobar.txt")),
        bodyLength().lte(100000),
        bodyString().is("foo"),
        bodyString().is(ElFileBody("foobar.txt")),
        css(".foo"),
        css("#foo", "href"),
        //css(".foo").ofNode().count().is(1),
        css(".foo").notExists(),
        //css("#foo").ofNode().transform(Node::getNodeName),
        css(".foo").findRandom().is("some text"),
        css(".foo").findRandom(5).is(["some text"]),
        jsonPath("//foo/bar[2]/baz"),
        jsonPath("$..foo").is("bar"),
        jsonPath("$..foo").ofString().is("bar"),
        jsonPath("$..foo").ofInt().is(1),
        jsonPath("$..foo").ofList().is(["foo"]),
        jsonPath("$..foo").ofMap().is({ foo: 1 }),
        jsonPath("$..foo.bar[2].baz").transform((s: string) => s + "foo"),
        jsonPath("$..foo.bar[2].baz").transformWithSession((string: string, _: Session) => string + "foo"),
        jsonPath("$..foo.bar[2].baz").withDefault((_: Session) => "foo"),
        jsonpJsonPath("$..foo").is("bar"),
        jmesPath("[].friends[].name"),
        jmesPath("[].friends[].name").is("bar"),
        jmesPath("[].friends[].name").ofString().is("bar"),
        jmesPath("[].friends[].name").ofInt().is(1),
        jmesPath("[].friends[].name").ofList().is(["foo"]),
        jmesPath("[].friends[].name").ofMap().is({ foo: 1 }),
        jsonpJmesPath("foo").is("bar"),
        regex('<input id="text1" type="text" value="aaaa" />').optional().saveAs("var1"),
        regex('<input id="text1" type="text" value="aaaa" />').count().is(1),
        regex('<input id="text1" type="text" value="aaaa" />').notExists(),
        regex("pattern").captureGroups(2),
        substring("foo").exists(),
        xpath("//input[@id='text1']/@value"),
        xpath("//input[@id='text1']/@value").find(),
        xpath("//input[@id='text1']/@value").find().exists(),
        xpath("//input[@id='text1']/@value").find().is("expected"),
        xpath("//input[@id='text1']/@value").find().exists().saveAs("key"),
        xpath("//input[@id='text1']/@value").saveAs("key"),
        xpath("//input[@id='text1']/@value").findAll(),
        xpath("//input[@id='text1']/@value").count(),
        xpath("//input[@id='text1']/@value").name("This is a check"),
        xpath("//input[@value='#{aaaa_value}']/@id").name("foo").saveAs("sessionParam"),
        xpath("//input[@value='aaaa']/@id").not("param"),
        xpath("//input[@id='#{aaaa_value}']/@value").notExists(),
        xpath("//input[@id='text1']/@value").is("aaaa").saveAs("test2"),
        md5().is("0xA59E79AB53EEF2883D72B8F8398C9AC3"),
        sha1().is("0xA59E79AB53EEF2883D72B8F8398C9AC3"),
        responseTimeInMillis().lt(1000),
        bodyString().is("foo").logActualValueInError(false)
      )
      .checkIf("#{bool}")
      .then(jsonPath("$..foo"))
      .checkIf("#{bool}")
      .then(jsonPath("$..foo"), jsonPath("$..foo"))
    //.checkIf((response, session) -> true).then(jsonPath("$..foo"))
  )
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
  .exec(http("Request").head("/").proxy(Proxy("172.31.76.106", 8080).https()))
  .exec(http("Request").head("/").proxy(Proxy("172.31.76.106", 8080).socks4()))
  .exec(http("Request").head("/").proxy(Proxy("172.31.76.106", 8080).socks5()))
  // polling
  .exec(poll().every(10).exec(http("poll").get("/foo")))
  .exec(poll().pollerName("poll").every(10).exec(http("poll").get("/foo")))
  .exec(poll().pollerName("poll").stop())
  .exec(poll().stop())
  // addCookie
  .exec(addCookie(Cookie("foo", "bar").withDomain("foo.com")))
  // getCookieValue
  .exec(getCookieValue(CookieKey("foo").withDomain("foo.com").saveAs("newName")))
  // flushSessionCookies
  .exec(flushSessionCookies())
  // flushCookieJar
  .exec(flushCookieJar())
  // flushHttpCache
  .exec(flushHttpCache())
  // feeder
  .feed(sitemap("file"));

runSimulationMock((setUp) => {
  setUp(scn.injectOpen(atOnceUsers(1)).protocols(httpProtocol)).protocols(httpProtocol);
});
