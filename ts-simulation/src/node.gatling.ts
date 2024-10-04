import {
  atOnceUsers,
  scenario,
  simulation
} from "@gatling.io/core";
import { http } from "@gatling.io/http";

import { Buffer } from "node:buffer";

const println = Java.type<any>("java.lang.System").out.println;

export default simulation((setUp) => {
  const baseHttpProtocol =
    http.baseUrl("http://localhost:9999")

  const scn = scenario("My scenario")
    .execNode(session => {
      //console.log("lol");
      // return session.set("error", Error("lol"));
      return session.set("page", 1);
    })
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
