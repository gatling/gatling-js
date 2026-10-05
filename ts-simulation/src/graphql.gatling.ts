import { atOnceUsers, global, jmesPath, scenario, simulation } from "@gatling.io/core";
import { graphql } from "@gatling.io/graphql";
import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  // Example using GraphQLZero, a free public GraphQL API backed by JSONPlaceholder data: https://graphqlzero.almansi.me/
  const httpProtocol = http.baseUrl("https://graphqlzero.almansi.me").acceptHeader("application/json");

  const graphqlProtocol = graphql.endpoint("/api").failOnErrors();

  const scn = scenario("GraphQL")
    .exec((session) =>
      session
        .set("postId", 1)
        .set("title", "Hello from Gatling")
        .set("operation", "GetPost")
        .set("document", "query GetPost($id: ID!) { post(id: $id) { id title } }")
    )
    .exec(
      // variable() with an EL String, a function and a static value
      graphql
        .query("query GetPost($id: ID!) { post(id: $id) { id title user { name } } }")
        .variable("id", "#{postId}")
        .check(
          graphql.data.jmesPath("post.id").is("1"),
          graphql.data.jmesPath("post.user.name").saveAs("userName"),
          graphql.errors.jmesPath("[0]").notExists(),
          graphql.extensions.jmesPath("tracing").notExists()
        ),
      graphql
        .query(
          "query GetPosts($options: PageQueryOptions) { posts(options: $options) { data { id } meta { totalCount } } }"
        )
        .variable("options", (session) => ({ paginate: { page: 1, limit: session.get<number>("postId") + 4 } }))
        .check(graphql.data.jsonPath("$.posts.data[*].id").count().is(5)),
      // variables() with a static object and a function
      graphql
        .mutation("mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id title body } }")
        .variables({ input: { title: "Static title", body: "Static body" } })
        .check(graphql.data.jmesPath("createPost.title").is("Static title")),
      graphql
        .mutation("mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id title body } }")
        .requestName("mutation CreatePost (dynamic)")
        .variables((session) => ({
          input: { title: session.get<string>("title"), body: "By " + session.get<string>("userName") }
        }))
        .check(
          graphql.data.jmesPath("createPost.title").isEL("#{title}"),
          graphql.data.jmesPath("createPost.body").isEL("By #{userName}")
        ),
      // GraphQLZero doesn't expose request headers, so send this one to Postman Echo, which echoes back the request
      // headers and the JSON body (under "data", conveniently, so graphql.data sees the GraphQL payload we sent)
      graphql
        .query("query GetPost($id: ID!) { post(id: $id) { id } }")
        .requestName("headers and variables echo")
        .endpoint("https://postman-echo.com/post")
        .header("X-Single", "#{userName}")
        .headers({ "X-Client": "gatling", "X-Post-Id": "#{postId}" })
        .variables({ id: 42, tags: ["a", "b"], nested: { flag: true } })
        .variable("extra", (session) => session.get<string>("title"))
        .variable("static", { list: [1, 2, 3], nested: { key: "value" } })
        .check(
          jmesPath('headers."x-single"').isEL("#{userName}"),
          jmesPath('headers."x-client"').is("gatling"),
          jmesPath('headers."x-post-id"').is("1"),
          jmesPath('headers."content-type"').is("application/json"),
          graphql.data.jmesPath("operationName").is("GetPost"),
          graphql.data.jmesPath("variables.id").ofInt().is(42),
          graphql.data.jmesPath("variables.tags[1]").is("b"),
          graphql.data.jmesPath("variables.nested.flag").ofBoolean().is(true),
          graphql.data.jmesPath("variables.extra").isEL("#{title}"),
          graphql.data.jmesPath("variables.static.list[2]").ofInt().is(3),
          graphql.data.jmesPath("variables.static.nested.key").is("value")
        ),
      // dynamicDocument() with a document only known at runtime: the first parameter is the request name, the
      // operation name is only sent with operationName(), as an EL String or a function
      graphql
        .dynamicDocument("dynamic #{operation}", "#{document}")
        .operationName("#{operation}")
        .variable("id", "#{postId}")
        .check(graphql.data.jmesPath("post.title").exists()),
      graphql
        .dynamicDocument("dynamic echo", (session) => session.get<string>("document"))
        .endpoint("https://postman-echo.com/post")
        .operationName((session) => session.get<string>("operation"))
        .check(graphql.data.jmesPath("operationName").is("GetPost"), graphql.data.jmesPath("query").isEL("#{document}"))
    );

  setUp(scn.injectOpen(atOnceUsers(1)))
    .assertions(global().failedRequests().count().is(0))
    .protocols(httpProtocol, graphqlProtocol);
});
