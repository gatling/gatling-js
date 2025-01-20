import { Buffer } from "buffer";
import util from "util";
import stream from "stream";
import { StringDecoder } from "string_decoder";

import crypto from "./crypto";
import uuid from "./uuid";

export * from "_stream_transform";
export * from "buffer";
export * from "crypto";
export * from "util";
export * from "stream";
export * from "string_decoder";

globalThis.Buffer = Buffer;
globalThis.StringDecoder = StringDecoder;

globalThis.crypto = crypto;
globalThis.util = util;
globalThis.uuid = uuid;
globalThis.stream = stream;

const global = globalThis;
export { global };
