import { core, http, runSimulation} from "gatling-js";

const mySimulation = runSimulation((setUp) => {

  const baseHttpProtocol =
    http.baseUrl("https://computer-database.gatling.io");

  const browse = core
    .exec((session) => session.set("page", 1))
    .exec(http("Browse page 1").get("/computers?p=#{page}"));

  const scn = core.scenario("My scenario").exec([browse]);

  const openInjectionStep = core.constantUsersPerSec(2).during(30);
  const populationBuilder = scn.injectOpen([openInjectionStep]);

  setUp([populationBuilder]).protocols([baseHttpProtocol]);
});

export default mySimulation;
