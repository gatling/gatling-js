import { OpenInjectionStep } from "@gatling/js";
import { atOnceUsers, constantUsersPerSec, http, nothingFor, scenario } from "@gatling/js";
import { runSimulation } from "@gatling/js";

const mySimulation = runSimulation((setUp) => {

  const baseHttpProtocol =
    http.baseUrl("https://computer-database.gatling.io");

  const scn = scenario("My scenario")
    .exec((session) => session.set("page", 1))
    .exec(http("Browse page 1").get("/computers?p=#{page}"));

  const injectionSteps: OpenInjectionStep[] = [
    atOnceUsers(10),
    nothingFor(5, "seconds"),
    constantUsersPerSec(2).during(30)
  ];

  setUp(
    scn.injectOpen(...injectionSteps),
  ).protocols(baseHttpProtocol);
});

export default mySimulation;
