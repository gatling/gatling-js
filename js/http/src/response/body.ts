import { Wrapper } from "@gatling.io/core";

import JvmResponseBody = io.gatling.http.response.ResponseBody;

export interface ResponseBody extends Wrapper<JvmResponseBody> {
  bytes(): Int8Array;
  chars(): string;
  //charset(): any /*java.nio.charset.Charset*/;
  //length(): int;
  //stream(): any /*java.io.InputStream*/;
  string(): string;
}

export const wrapResponseBody = (_underlying: JvmResponseBody): ResponseBody => ({
  _underlying,
  bytes: (): Int8Array => new Int8Array(_underlying.bytes()),
  chars: (): string => _underlying.chars().join(""), // FIXME ???
  string: (): string => _underlying.string()
});
