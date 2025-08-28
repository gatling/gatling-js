import {
  exec,
  bodyString,
  jsonPath,
  jmesPath,
  regex,
  bodyBytes,
  bodyLength,
  ByteArrayBody,
  ElFileBody,
  PebbleFileBody,
  PebbleStringBody,
  RawFileBody
} from "@gatling.io/core";

import { http, isWsInboundMessageBinary, isWsInboundMessageText, ws } from "./index";

const httpProtocol = http
  .wsBaseUrl("ws://localhost:9000")
  .wsBaseUrls("url1", "url2")
  .wsReconnect()
  .wsMaxReconnects(1)
  .wsAutoReplyTextFrame((txt) => (txt === "foo" ? "bar" : null))
  .wsAutoReplySocketIo4()
  .wsUnmatchedInboundMessageBufferSize(5);

const chain = exec(
  ws("Connect WS")
    .connect("/room/chat?username=#{id}")
    .subprotocol("FOO")
    .onConnected(exec(ws("Perform auth").sendText("Some auth token")).pause(1))
    .await(1)
    .on(
      ws
        .checkTextMessage("checkName")
        .matching(jsonPath("$.uuid").is("#{correlation}"))
        .check(jsonPath("$.code").ofInt().is(1), jmesPath("code").ofInt().is(1), bodyString().is("echo"))
    )
    .await(1)
    .on(
      // simple int
      ws.checkTextMessage("checkName")
    )
    .await("#{someLongOrFiniteDurationAttribute}")
    .on(
      // EL string
      ws.checkTextMessage("checkName")
    )
    .await((session) => ({ amount: 1, unit: "seconds" }))
    .on(
      // function
      ws.checkTextMessage("checkName")
    )
    .await(1)
    .on(ws.checkTextMessage((session) => "checkName")),
  ws("Say Hello WS").sendText('{"text": "Hello, I\'m #{id} and this is message #{i}!"}'),
  ws("Message1")
    .wsName("foo")
    .sendText('{"text": "Hello, I\'m #{id} and this is message #{i}!"}')
    .await({ amount: 30, unit: "seconds" })
    .on(ws.checkTextMessage("checkName1").check(jsonPath("$.message").findAll().saveAs("message1")))
    .await(30)
    .on(
      // simple int
      ws.checkTextMessage("checkName2").check(jsonPath("$.message").findAll().saveAs("message2"))
    )
    .await("#{someLongOrFiniteDurationAttribute}")
    .on(
      // EL string
      ws.checkTextMessage("checkName2").check(jsonPath("$.message").findAll().saveAs("message2"))
    )
    .await((session) => ({ amount: 30, unit: "seconds" }))
    .on(
      // expression
      ws.checkTextMessage("checkName2").check(jsonPath("$.message").findAll().saveAs("message2"))
    ),
  ws("Message2")
    .sendText('{"text": "Hello, I\'m #{id} and this is message #{i}!"}')
    .await(30)
    .on(
      ws
        .checkTextMessage("checkName1")
        .check(regex("somePattern1").saveAs("message1"), regex("somePattern2").saveAs("message2"))
        .checkIf("#{cond}")
        .then(regex("somePattern1")),
      ws.checkTextMessage("checkName2").check(regex("somePattern2").saveAs("message2"))
    ),
  ws("Message3").sendText('{"text": "Hello, I\'m #{id} and this is message #{i}!"}').await(30).on(
    // match first message
    ws.checkTextMessage("checkName")
  ),
  ws("BinaryMessage")
    .sendBytes([72, 101, 108, 108, 111]) // "Hello"
    .await(30)
    .on(
      // match first message
      ws
        .checkBinaryMessage("checkName")
        .check(
          bodyLength().lte(50),
          bodyBytes()
            .transform((bytes) => bytes.length)
            .saveAs("bytesLength")
        )
        .checkIf("#{cond}")
        .then(bodyLength().lte(10))
        .silent()
    ),
  ws("Close WS").close(),
  ws("Close WS").close(1000, "Bye"),
  ws("Open Named", "foo").connect("/bar"),
  ws("SendTextMessageWithElFileBody").sendText(ElFileBody("pathToSomeFile")),
  ws("SendTextMessageWithPebbleStringBody").sendText(PebbleStringBody("somePebbleString")),
  ws("SendTextMessageWithPebbleFileBody").sendText(PebbleFileBody("pathToSomeFile")),
  ws("SendBytesMessageWithRawFileBody").sendBytes(RawFileBody("pathToSomeFile")),
  ws("SendBytesMessageWithByteArrayBody").sendBytes(ByteArrayBody("#{someByteArray}")),
  ws.processUnmatchedMessages((messages, session) => session.set("messages", messages)),
  ws.processUnmatchedMessages("wsName", (messages, session) => {
    const copy = Array.from(messages);
    copy.reverse();
    const textMessages = copy.filter(isWsInboundMessageText).map((m) => m.message());
    if (textMessages.length > 0) {
      return session.set("lastTextMessage", textMessages[0]);
    } else {
      return session;
    }
  })
);
