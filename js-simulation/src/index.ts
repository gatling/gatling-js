import { core, http, runSimulation } from "gatling-js";

export const mySimulation = runSimulation((setUp) => {
  const browse = core
    .exec((session) => session.set("page", 1))
    .exec((session) => session.set("page", 1))
    .exec((session) => session.set("page", 1))
    .exec(http.http("Browse page 1").get("/computers?p=#{page}"));
  // const browse = exec(http("Browse page 1").get("/computers?p=1"));

  const scn = core.scenario("My scenario").exec([browse]);

  const openInjectionStep = //core.constantUsersPerSec(2).during(30);
    core.atOnceUsers(1000);
  const populationBuilder = scn.injectOpen([openInjectionStep]);

  const protocolBuilder = http.httpProtocol().baseUrl("https://computer-database.gatling.io");

  setUp([populationBuilder]).protocols([protocolBuilder]);

  // const baseHttpProtocol = http.httpProtocol().baseUrl("https://172.31.15.11:8001");
  //
  // const warmUp = core
  //   .scenario("benchmark-app-netty: warm up")
  //   .during(60)
  //   .on(core.exec(http.http("json 1K").get("/json/1k.json")));
  //
  // const scn = core
  //     .scenario("benchmark-app-netty")
  //     .repeat(50000)
  //     .on(
  //         core
  //             .exec(session => session)
  //             .exec(http.http("json 1K").get("/json/1k.json"))
  //     );
  //
  // setUp([warmUp.injectOpen([core.atOnceUsers(1000)]).andThen([scn.injectOpen([core.atOnceUsers(1000)])])]).protocols([
  //   baseHttpProtocol
  // ]);
});
