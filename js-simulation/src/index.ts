import { core, http, runSimulation } from "gatling-js";

export const mySimulation = runSimulation((setUp) => {
  const browse = core
    .exec((session) => session.set("page", 1))
    .exec(http.http("Browse page 1").get("/computers?p=#{page}"));
  // const browse = exec(http("Browse page 1").get("/computers?p=1"));

  const scn = core.scenario("My scenario").exec([browse]);

  const openInjectionStep = core.constantUsersPerSec(1).during(30);
  const populationBuilder = scn.injectOpen([openInjectionStep]);

  const protocolBuilder = http.httpProtocol().baseUrl("https://computer-database.gatling.io");

  setUp([populationBuilder]).protocols([protocolBuilder]);
});
