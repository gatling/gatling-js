import {
  constantUsersPerSec,
  scenario,
  runSimulation,
  Session,
  ScenarioBuilder,
  exec,
  csv,
  jsonFile,
  group,
  pause,
  arrayFeeder,
  atOnceUsers,
  nothingFor,
  doWhile,
  css
} from "@gatling.io/core";
import { http } from "@gatling.io/http";

const mySimulation = runSimulation((setUp) => {
  const baseHttpProtocol = http.baseUrl("https://computer-database.gatling.io");

  const searchFeeder = arrayFeeder([
    { searchCriterion: "Macbook", searchComputerName: "MacBook Pro" },
    { searchCriterion: "eee", searchComputerName: "ASUS Eee PC 1005PE" }
  ]).random();

  // Either CSV or JSON feeder can be used in this example:
  // const createFeeder = csv("computers/create.csv").circular();
  const createFeeder = jsonFile("computers/create.json").circular();

  const scn: ScenarioBuilder = scenario("My scenario")
    .feed(searchFeeder)
    .feed(createFeeder)
    .exec(
      group("Browse").on(
        exec(session => session.set("page", 1)),
        doWhile((session: Session) => session.get<number>("page") < 3).on(
          http("Browse page #{page}").get("/computers?p=#{page}"),
          exec(session => session.set("page", session.get<number>("page") + 1)),
          pause({ amount: 500, unit: "milliseconds" })
        )
      ),
      group("Search").on(
        http("Search").get("/computers?f=#{searchCriterion}")
        .check(
          css("a:contains('#{searchComputerName}')", "href").saveAs("computerUrl")
        ),
        http("Select").get("#{computerUrl}")
      ),
      group("Create").on(
        http("Get form").get("/computers/new"),
        pause(1),
        // TODO: formParam not implemented yet, we just write to the console instead
        exec(session => {
          const name = session.get<string>("name");
          const introduced = session.get<string>("introduced");
          const discontinued = session.get<string>("discontinued");
          const company = session.get<string>("company");
          console.log(
            `Create computer (name='${name}', introduced='${introduced}', discontinued='${discontinued}', company='${company}')`
          );
          return session;
        })
        // http("Post form")
        //   .post("/computers")
        //   .formParam("name", "Beautiful Computer")
        //   .formParam("introduced", "2012-05-30")
        //   .formParam("discontinued", "")
        //   .formParam("company", "37")
      )
    );

  setUp(
    scn.injectOpen(
      atOnceUsers(10),
      nothingFor({ amount: 5, unit: "seconds" }),
      constantUsersPerSec(2).during(30)
    )
  ).protocols(baseHttpProtocol);
});

export default mySimulation;
