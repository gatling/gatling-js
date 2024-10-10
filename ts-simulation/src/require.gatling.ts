import {
  atOnceUsers,
  scenario,
  simulation
} from "@gatling.io/core";
import { http } from "@gatling.io/http";

//import moment from "moment";
//console.log("formatted date =", moment().format("MMM Do YYYY"));

export default simulation((setUp) => {
  const baseHttpProtocol =
    http.baseUrl("http://localhost:9999")

  const script = `
let moment = require('moment');
let jsonResponse = pm.response.json();
console.log("formatted date =", moment(jsonResponse.args.randomDate).format("MMM Do YYYY"));
throw Error("lol");
`;

  const scn = scenario("Require")
    .execScript(script)
    //.exitHereIfFailed()
    .exec(http("Home").get("/"))
    /*.exec(
      http("Page #{page}")
        .get("/computers?page=#{page}")
    )*/;

  setUp(
    scn.injectOpen(
      atOnceUsers(1)
    )
  ).protocols(baseHttpProtocol)
});
