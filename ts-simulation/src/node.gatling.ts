import {
  atOnceUsers,
  scenario,
  simulation
} from "@gatling.io/core";
import { http } from "@gatling.io/http";

import { Buffer } from "node:buffer";

const println = Java.type<any>("java.lang.System").out.println;

console.log = println;

export default simulation((setUp) => {
  const baseHttpProtocol =
    http.baseUrl("http://localhost:9999")

  const scn = scenario("My scenario")
    .execNode(session => {
      // console.log("lol");
      println("HOME: " + process.env["HOME"]);
      const b = Buffer.from([102, 111, 111]);
      console.log("LOL: " + b.toString());
      return session.set("page", 1);
    })
    .exec(
      http("Page #{page}")
        .get("/computers?page=#{page}")
    );

  setUp(
    scn.injectOpen(
      atOnceUsers(1)
    )
  ).protocols(baseHttpProtocol)
});
