import { runSimulation } from "gatling-js";
import { exec, scenario, constantUsersPerSec } from "gatling-js/core";
import { http, httpProtocol } from "gatling-js/http";

runSimulation((setUp) => {
  const browseRequest = http("Browse page 1").get("/computers?p=1");
  const browse = exec(browseRequest);

  const scn = scenario("My scenario").exec([browse]);

  const openInjectionStep = constantUsersPerSec(1).during(30);
  const populationBuilder = scn.injectOpen([openInjectionStep]);

  const protocolBuilder = httpProtocol().baseUrl("https://computer-database.gatling.io");

  setUp([populationBuilder]).protocols([protocolBuilder]);
});
