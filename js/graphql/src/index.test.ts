import { Simulation, atOnceUsers, exec, scenario } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

import { graphql, graphqlData, graphqlErrors, graphqlExtensions, graphqlWs } from "./index";

const runSimulationMock = (_: Simulation): void => {};

// protocol
const httpProtocol = http.baseUrl("https://api.example.com").wsBaseUrl("wss://api.example.com");

const graphQlProtocol = graphql
  .endpoint("/graphql")
  .endpoint((session) => "/graphql")
  .wsEndpoint("/graphql")
  .wsEndpoint((session) => "/graphql")
  .failOnErrors()
  .failOnDataNull()
  .ignoreErrors()
  .requireNamedOperations()
  .queriesOverGet()
  .automaticPersistedQueries()
  .automaticPersistedQueriesOverGet()
  .sharePersistedQueries()
  .inferOperationNameFromFileName()
  .inferOperationNameFromRootFields()
  .inferOperationNameFromHash()
  .inferOperationName((document) =>
    document.operationType() === "MUTATION" ? null : (document.operationName() ?? document.rootFields().join("_"))
  )
  .inferOperationName((document) => undefined);

graphql.failOnDataNull();
graphql.ignoreErrors();
graphql.requireNamedOperations();
graphql.queriesOverGet();
graphql.automaticPersistedQueries();
graphql.automaticPersistedQueriesOverGet();
graphql.sharePersistedQueries();

// documents
exec(graphql.query("query GetUser($id: ID!) { user(id: $id) { name } }").variable("id", 42));
exec(
  graphql
    .mutation("mutation CreateOrder($input: OrderInput!) { createOrder(input: $input) { id } }")
    .variable("input", { sku: "abc" })
);
exec(graphql.file("graphql/getUser.graphql").variable("id", 42));
exec(graphql.file("graphql/multiple.graphql").operationName("CreateOrder"));
exec(graphql.document("{ me { id } }"));
exec(graphql.dynamicDocument("#{operationName}", "#{document}"));
exec(graphql.dynamicDocument("dynamic", (session) => session.get<string>("document")));
exec(graphql.dynamicDocument((session) => session.get<string>("operationName"), "#{document}"));
exec(
  graphql.dynamicDocument(
    (session) => session.get<string>("operationName"),
    (session) => session.get<string>("document")
  )
);

// dynamic documents
graphql
  .dynamicDocument("#{requestName}", "#{document}")
  .operationName("#{operationName}")
  .operationName((session) => session.get<string>("operationName"))
  .variables((session) => ({ id: session.get<string>("id") }))
  .variable("locale", "#{locale}")
  .requestName("Dynamic")
  .endpoint("/other/graphql")
  .header("X-Trace", "#{traceId}")
  .headers({ "X-Client": "gatling" })
  .check(graphqlData.jsonPath("$.user.id").saveAs("userId"))
  .postCheck((session) => session)
  .requestTimeout(10)
  .silent()
  .notSilent()
  .ignoreProtocolChecks();
// @ts-expect-error overGet isn't supported with dynamic documents
graphql.dynamicDocument("dynamic", "#{document}").overGet();

// operation name
graphql.file("graphql/multiple.graphql").operationName("CreateOrder");
graphqlWs.subscribeFile("graphql/orderEvents.graphql").operationName("OrderEvents");

// request name
exec(graphql.file("graphql/getUser.graphql").requestName("Get current user"));
exec(graphql.file("graphql/getUser.graphql").requestName((session) => "Get user " + session.get<string>("userId")));

// variables
graphql
  .file("graphql/getUser.graphql")
  .variable("id", 42)
  .variable("locale", "#{locale}")
  .variable("token", (session) => session.get<string>("token"))
  .variable("tags", ["a", "b"]);
graphql.file("graphql/getProducts.graphql").variables({ first: 10, after: "cursor" });
graphql
  .file("graphql/getProducts.graphql")
  .variables((session) => ({ first: 10, after: session.get<string>("cursor") }));
graphql
  .mutation("mutation CreateOrder($input: OrderInput!) { createOrder(input: $input) { id } }")
  .variablesJson('{"input": {"items": [{"sku": #{sku.jsonStringify()}, "quantity": #{randomInt(1, 4)}}]}}');

// HTTP options
graphql
  .file("graphql/getUser.graphql")
  .endpoint("/other/graphql")
  .endpoint((session) => "/other/graphql")
  .header("X-Trace", "#{traceId}")
  .header("X-Trace", (session) => session.get<string>("traceId"))
  .headers({ "X-Client": "gatling" })
  .requestTimeout(10)
  .requestTimeout({ amount: 10, unit: "seconds" })
  .silent()
  .notSilent()
  .ignoreProtocolChecks();
graphql.query("query GetUser($id: ID!) { user(id: $id) { name } }").variable("id", 42).overGet();

// checks
graphql
  .file("graphql/getUser.graphql")
  .check(
    graphqlData.jsonPath("$.user.name").is("Stephane"),
    graphqlData.jsonPath("$.user.id").saveAs("userId"),
    graphqlData.jmesPath("user.name").exists(),
    graphqlErrors.jsonPath("$[0].extensions.code").optional().saveAs("errorCode"),
    graphqlExtensions.jsonPath("$.tracing.duration").optional(),
    status().is(200)
  );
graphql
  .file("graphql/getUser.graphql")
  .check(graphqlData.jsonPath("$.user.name").saveAs("userName"))
  .postCheck((session) => {
    if (!session.contains("userName")) {
      throw Error("userName is missing");
    }
    return session.set("greeting", "Hello " + session.get<string>("userName"));
  });

// subscriptions
exec(graphqlWs.connect());
exec(
  graphqlWs
    .connect()
    .requestName("Open GraphQL WebSocket")
    .endpoint("/other/graphql")
    .connectionInitPayload("authorization", "Bearer #{token}")
    .connectionInitPayload("retries", 3)
    .connectionInitPayload("token", (session) => session.get<string>("token"))
    .connectionInitPayload({ locale: "en" })
    .connectionInitPayload((session) => ({ locale: session.get<string>("locale") }))
    .ackTimeout({ amount: 5, unit: "seconds" })
);
exec(graphqlWs.connect().connectionInitPayloadJson('{"authorization": "Bearer #{token.jsonStringify()}"}'));
exec(
  graphqlWs
    .subscribe("subscription OrderEvents($id: ID!) { orderCreated(customerId: $id) { id } }")
    .variable("id", "#{customerId}")
    .subscriptionName("orders")
);
exec(graphqlWs.subscribeFile("graphql/orderEvents.graphql"));
exec(
  graphqlWs
    .subscribeFile("graphql/orderEvents.graphql")
    .requestName("Order events")
    .operationName("OrderEvents")
    .variables((session) => ({ id: session.get<string>("customerId") }))
    .variablesJson('{"id": "#{customerId}"}')
    .await({ amount: 10, unit: "seconds" })
    .on(
      graphqlWs
        .checkNext()
        .check(
          graphqlWs.data.jsonPath("$.orderCreated.id").saveAs("orderId"),
          graphqlWs.errors.jsonPath("$[0].message").optional()
        )
        .postCheck((session) => session)
        .silent()
    )
);
exec(
  graphqlWs
    .subscribeFile("graphql/orderEvents.graphql")
    .await(10)
    .on(graphqlWs.checkNext("first event"))
    .awaitNext(30, 5)
);
exec(graphqlWs.unsubscribe("orders"));
exec(graphqlWs.unsubscribe("orders").requestName("Stop orders"));
exec(graphqlWs.close());

runSimulationMock((setUp) => {
  const scn = scenario("GraphQL").exec(
    graphql.query("{ me { id } }"),
    graphqlWs.connect().connectionInitPayload("authorization", "Bearer #{token}"),
    graphqlWs
      .subscribe("subscription OrderEvents($id: ID!) { orderCreated(customerId: $id) { id } }")
      .variable("id", "#{customerId}")
      .subscriptionName("orders")
      .await(10)
      .on(graphqlWs.checkNext().check(graphqlWs.data.jsonPath("$.orderCreated.id").saveAs("orderId")))
      .awaitNext(30, 3),
    graphqlWs.unsubscribe("orders"),
    graphqlWs.close()
  );

  setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocol, graphQlProtocol);
});
