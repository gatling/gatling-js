// Minimal, dependency-free graphql-transport-ws server for src/graphqlws.gatling.ts: node graphql-ws-echo-server.mjs
// Every subscription receives a single "next" message echoing the connection_init payload and the subscription
// variables, followed by "complete".
import { createHash } from "node:crypto";
import { createServer } from "node:http";

const port = 4567;
const protocol = "graphql-transport-ws";

const encodeFrame = (text) => {
  const payload = Buffer.from(text);
  const header =
    payload.length < 126
      ? Buffer.from([0x81, payload.length])
      : payload.length < 65536
        ? Buffer.from([0x81, 126, payload.length >> 8, payload.length & 0xff])
        : Buffer.concat([Buffer.from([0x81, 127]), Buffer.alloc(4), Buffer.from([0, 0, 0, 0])]);
  if (payload.length >= 65536) header.writeUInt32BE(payload.length, 6);
  return Buffer.concat([header, payload]);
};

// returns [frame, rest] or undefined if the buffer doesn't contain a full frame yet
const decodeFrame = (buffer) => {
  if (buffer.length < 2) return undefined;
  const opcode = buffer[0] & 0x0f;
  const masked = (buffer[1] & 0x80) !== 0;
  let length = buffer[1] & 0x7f;
  let offset = 2;
  if (length === 126) {
    if (buffer.length < 4) return undefined;
    length = buffer.readUInt16BE(2);
    offset = 4;
  } else if (length === 127) {
    if (buffer.length < 10) return undefined;
    length = Number(buffer.readBigUInt64BE(2));
    offset = 10;
  }
  const maskOffset = offset;
  if (masked) offset += 4;
  if (buffer.length < offset + length) return undefined;
  const payload = Buffer.from(buffer.subarray(offset, offset + length));
  if (masked) {
    for (let i = 0; i < payload.length; i++) payload[i] ^= buffer[maskOffset + (i % 4)];
  }
  return [{ opcode, payload }, buffer.subarray(offset + length)];
};

const server = createServer((_, res) => res.writeHead(426).end());

server.on("upgrade", (req, socket) => {
  const protocols = (req.headers["sec-websocket-protocol"] ?? "").split(",").map((p) => p.trim());
  if (req.url !== "/graphql" || !protocols.includes(protocol)) {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    return;
  }
  const accept = createHash("sha1")
    .update(req.headers["sec-websocket-key"] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    .digest("base64");
  socket.write(
    "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n" +
      `Sec-WebSocket-Accept: ${accept}\r\nSec-WebSocket-Protocol: ${protocol}\r\n\r\n`
  );

  const send = (message) => socket.write(encodeFrame(JSON.stringify(message)));
  let connectionInitPayload = null;
  let buffer = Buffer.alloc(0);

  socket.on("data", (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    for (let decoded = decodeFrame(buffer); decoded; decoded = decodeFrame(buffer)) {
      const [frame, rest] = decoded;
      buffer = rest;
      if (frame.opcode === 0x8) {
        socket.end(Buffer.from([0x88, 0]));
        return;
      }
      if (frame.opcode !== 0x1) continue;
      const message = JSON.parse(frame.payload.toString());
      console.log("<<", JSON.stringify(message));
      switch (message.type) {
        case "connection_init":
          connectionInitPayload = message.payload ?? null;
          send({ type: "connection_ack" });
          break;
        case "ping":
          send({ type: "pong" });
          break;
        case "subscribe":
          send({
            id: message.id,
            type: "next",
            payload: { data: { echo: { init: connectionInitPayload, variables: message.payload.variables ?? null } } }
          });
          send({ id: message.id, type: "complete" });
          break;
      }
    }
  });
  socket.on("error", () => socket.destroy());
});

server.listen(port, () => console.log(`graphql-transport-ws echo server listening on ws://localhost:${port}/graphql`));
