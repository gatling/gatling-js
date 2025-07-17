import { Simulation, StringBody, exec, jmesPath, jsonPath, regex, group } from "@gatling.io/core";

import { http, sse } from "./index";

const httpProtocol = http.sseUnmatchedInboundMessageBufferSize(5);

const chain = exec(
  sse("connect")
    .sseName("sse")
    .get("/stocks/prices")
    .await(30)
    .on(
      sse
        .checkMessage("checkName1")
        .check(regex("event: snapshot(.*)"))
        .checkIf("#{cond}")
        .then(regex("event: snapshot(.*)"))
    ),
  sse("waitForSomeMessage")
    .setCheck()
    .await(30)
    .on(sse.checkMessage("checkName1").check(jsonPath("$.foo"), jmesPath("foo"))),
  sse("close").close(),
  sse("foo", "bar").get("url"),
  sse("foo", "bar").post("url").body(StringBody("")),
  sse.processUnmatchedMessages((messages, session) => session.set("messages", messages)),
  sse.processUnmatchedMessages("sseName", (messages, session) =>
    messages.length !== 0 ? session.set("lastMessage", messages[messages.length - 1].message()) : session
  )
);
