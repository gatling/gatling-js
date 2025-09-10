import { simulation, scenario, atOnceUsers, bodyString, pause } from "@gatling.io/core";
import { http, ws, isWsInboundMessageText } from "@gatling.io/http";

export default simulation((setUp) => {
  const httpProtocol = http.wsBaseUrl("wss://echo.websocket.org").wsUnmatchedInboundMessageBufferSize(10);

  const scn = scenario("Scenario")
    .exec((session) => session.set("message", "Hello WebSocket server!"))
    .exec(
      ws("Connect WS")
        .connect("/")
        .await(5)
        .on(ws.checkTextMessage("Check connect response").check(bodyString().saveAs("response0"))),
      ws("Message 1")
        .sendText("Hello WebSocket server! (1)")
        .await(5)
        .on(ws.checkTextMessage("Check response 1").check(bodyString().saveAs("response1"))),
      ws("Message 2").sendText("#{message} (2)"),
      ws("Message 3").sendText((session) => `${session.get<string>("message")} (3)`),
      pause(5),
      ws.processUnmatchedMessages((messages, session) => {
        const unmatchedMessages = messages.map((m) => (isWsInboundMessageText(m) ? m.message() : "<binary message>"));
        return session.set("unmatchedMessages", unmatchedMessages);
      }),
      ws("Close WS").close()
    )
    .exec((session) => {
      console.log(`Connect response: ${session.get<string>("response0")}`);
      console.log(`Response 1: ${session.get<string>("response1")}`);
      console.log(`Unmatched responses: ${session.get<string[]>("unmatchedMessages")}`);
      return session;
    });

  setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocol);
});
