import { atOnceUsers, global, jmesPath, scenario, simulation } from "@gatling.io/core";
import { graphql, graphqlData } from "@gatling.io/graphql";
import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  // Example using GraphQLZero, a free public GraphQL API backed by JSONPlaceholder data: https://graphqlzero.almansi.me/
  const httpProtocol = http.baseUrl("https://graphqlzero.almansi.me").acceptHeader("application/json");

  const graphqlProtocol = graphql.endpoint("/api").failOnErrors();

  const scn = scenario("GraphQL")
    .exec((session) => session.set("postId", 1).set("title", "Hello from Gatling"))
    .exec(
      // variable() with an EL String, a function and a static value
      graphql
        .query("query GetPost($id: ID!) { post(id: $id) { id title user { name } } }")
        .variable("id", "#{postId}")
        .check(graphqlData.jmesPath("post.id").is("1"), graphqlData.jmesPath("post.user.name").saveAs("userName")),
      graphql
        .query(
          "query GetPosts($options: PageQueryOptions) { posts(options: $options) { data { id } meta { totalCount } } }"
        )
        .variable("options", (session) => ({ paginate: { page: 1, limit: session.get<number>("postId") + 4 } }))
        .check(graphqlData.jsonPath("$.posts.data[*].id").count().is(5)),
      // variables() with a static object and a function
      graphql
        .mutation("mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id title body } }")
        .variables({ input: { title: "Static title", body: "Static body" } })
        .check(graphqlData.jmesPath("createPost.title").is("Static title")),
      graphql
        .mutation("mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id title body } }")
        .requestName("mutation CreatePost (dynamic)")
        .variables((session) => ({
          input: { title: session.get<string>("title"), body: "By " + session.get<string>("userName") }
        }))
        .check(
          graphqlData.jmesPath("createPost.title").isEL("#{title}"),
          graphqlData.jmesPath("createPost.body").isEL("By #{userName}")
        ),
      // GraphQLZero doesn't expose request headers, so send this one to Postman Echo, which echoes back the request
      // headers and the JSON body (under "data", conveniently, so graphqlData sees the GraphQL payload we sent)
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
          graphqlData.jmesPath("operationName").is("GetPost"),
          graphqlData.jmesPath("variables.id").ofInt().is(42),
          graphqlData.jmesPath("variables.tags[1]").is("b"),
          graphqlData.jmesPath("variables.nested.flag").ofBoolean().is(true),
          graphqlData.jmesPath("variables.extra").isEL("#{title}"),
          graphqlData.jmesPath("variables.static.list[2]").ofInt().is(3),
          graphqlData.jmesPath("variables.static.nested.key").is("value")
        )
    );

  setUp(scn.injectOpen(atOnceUsers(1)))
    .assertions(global().failedRequests().count().is(0))
    .protocols(httpProtocol, graphqlProtocol);
});
