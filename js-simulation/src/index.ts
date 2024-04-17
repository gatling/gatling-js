import {
  atOnceUsers,
  constantUsersPerSec,
  nothingFor,
  scenario,
  runSimulation,
  Session,
  ScenarioBuilder,
  exec
} from "@gatling.io/core";
import { http } from "@gatling.io/http"

const mySimulation = runSimulation((setUp) => {

  const baseHttpProtocol =
    http.baseUrl("https://computer-database.gatling.io");

  const scn: ScenarioBuilder = scenario("My scenario")
    .exec(session => session.set("page", 1))
    .doWhile((session: Session) => session.get<number>("page") < 10).on(
      http("Browse page #{page}").get("/computers?p=#{page}"),
      exec(session => session.set("page", session.get<number>("page") + 1))
    )

  setUp(
    scn.injectOpen(
      atOnceUsers(10),
      nothingFor({ amount: 5, unit: "seconds"}),
      constantUsersPerSec(2).during(30)
    ),
  ).protocols(baseHttpProtocol);
});

export default mySimulation;
