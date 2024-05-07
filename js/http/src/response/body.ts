import { Wrapper } from "@gatling.io/core";

import JvmResponseBody = io.gatling.http.response.ResponseBody;

export interface ResponseBody extends Wrapper<JvmResponseBody> {
  bytes(): number[];
  chars(): string[];
  // TODO charset(): any /*java.nio.charset.Charset*/;
  length(): number;
  string(): string;
}

export const wrapResponseBody = (_underlying: JvmResponseBody): ResponseBody => ({
  _underlying,
  bytes: (): number[] => _underlying.bytes(),
  chars: (): string[] => _underlying.chars(),
  length: (): number => _underlying.length(),
  string: (): string => _underlying.string()
});
