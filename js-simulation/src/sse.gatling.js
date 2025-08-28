import {atOnceUsers, jmesPath, pause, simulation, scenario, substring} from "@gatling.io/core";
import { http, sse } from "@gatling.io/http";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("https://sse.dev")
    .sseUnmatchedInboundMessageBufferSize(10);

  const scn = scenario("Scenario")
    .exec(
      sse("test")
        .get("/test")
        .queryParam("interval", "1")
        .queryParam("jsonobj", "{\"message\":\"salutations maximales\"}")
        .await(5)//{ amount: 5, unit: "seconds" })
        .on(
          sse.checkMessage("data")
            .matching(substring("data"))
            .check(jmesPath("data").is("{\"message\":\"salutations maximales\"}"))
        ),
      sse("setCheck")
        .setCheck()
        .await(1)
        .on(
          sse.checkMessage("data 2").check(jmesPath("data").is("{\"message\":\"salutations maximales\"}"))
        ),
      pause(5),//{ amount: 5, unit: "seconds"}),
      sse.processUnmatchedMessages((messages, session) => {
        console.log("unmatched messages", messages);
        return session;
      }),
      sse("close").close()
    );

  setUp(scn.injectOpen(atOnceUsers(1)))
    .protocols(httpProtocol);
});
