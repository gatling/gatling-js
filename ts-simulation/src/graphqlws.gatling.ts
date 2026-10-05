import { atOnceUsers, global, scenario, simulation } from "@gatling.io/core";
import { graphql, graphqlWs } from "@gatling.io/graphql";
import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  // Requires the local echo server, which sends back the connection_init payload and the subscription variables:
  // node graphql-ws-echo-server.mjs
  const httpProtocol = http.wsBaseUrl("ws://localhost:4567");

  const graphqlProtocol = graphql.wsEndpoint("/graphql");

  const subscribe = graphqlWs
    .subscribe("subscription Echo($id: ID!) { echo(id: $id) }")
    .variables({ id: 7, nested: { list: [1, 2] } })
    .await(5);

  // connectionInitPayload() with an EL String, a static value, a function and a static object
  const staticForms = scenario("connectionInitPayload entries")
    .exec((session) => session.set("token", "abc"))
    .exec(
      graphqlWs
        .connect()
        .connectionInitPayload("authorization", "Bearer #{token}")
        .connectionInitPayload("retries", 3)
        .connectionInitPayload("nested", { a: [1, 2], b: { c: true } })
        .connectionInitPayload("token", (session) => session.get<string>("token") + "-fn")
        .connectionInitPayload({ locale: "en", list: [1, 2, 3] }),
      subscribe.on(
        graphqlWs
          .checkNext()
          .check(
            graphqlWs.data.jsonPath("$.echo.init.authorization").is("Bearer abc"),
            graphqlWs.data.jsonPath("$.echo.init.retries").ofInt().is(3),
            graphqlWs.data.jsonPath("$.echo.init.nested.a[1]").ofInt().is(2),
            graphqlWs.data.jsonPath("$.echo.init.nested.b.c").ofBoolean().is(true),
            graphqlWs.data.jsonPath("$.echo.init.token").is("abc-fn"),
            graphqlWs.data.jsonPath("$.echo.init.locale").is("en"),
            graphqlWs.data.jsonPath("$.echo.init.list[2]").ofInt().is(3),
            graphqlWs.data.jsonPath("$.echo.variables.id").ofInt().is(7),
            graphqlWs.data.jsonPath("$.echo.variables.nested.list[1]").ofInt().is(2),
            graphqlWs.errors.jsonPath("$[0]").notExists(),
            graphqlWs.extensions.jsonPath("$.tracing").notExists()
          )
      ),
      graphqlWs.close()
    );

  // connectionInitPayload() and variables() with functions
  const functionForms = scenario("connectionInitPayload function")
    .exec((session) => session.set("locale", "fr").set("id", 9))
    .exec(
      graphqlWs.connect().connectionInitPayload((session) => ({ locale: session.get<string>("locale"), list: [4, 5] })),
      graphqlWs
        .subscribe("subscription Echo($id: ID!) { echo(id: $id) }")
        .variables((session) => ({ id: session.get<number>("id") }))
        .variable("extra", (session) => session.get<number>("id") + 1)
        .await(5)
        .on(
          graphqlWs
            .checkNext()
            .check(
              graphqlWs.data.jsonPath("$.echo.init.locale").is("fr"),
              graphqlWs.data.jsonPath("$.echo.init.list[1]").ofInt().is(5),
              graphqlWs.data.jsonPath("$.echo.variables.id").ofInt().is(9),
              graphqlWs.data.jsonPath("$.echo.variables.extra").ofInt().is(10)
            )
        ),
      graphqlWs.close()
    );

  setUp(staticForms.injectOpen(atOnceUsers(1)), functionForms.injectOpen(atOnceUsers(1)))
    .assertions(global().failedRequests().count().is(0))
    .protocols(httpProtocol, graphqlProtocol);
});
