import { Wrapper } from "@gatling.io/core";

import JvmRequestBody = io.gatling.http.client.body.RequestBody;

export interface RequestBody extends Wrapper<JvmRequestBody> {
  bytes(): Int8Array;
}

export const wrapRequestBody = (_underlying: JvmRequestBody): RequestBody => ({
  _underlying,
  bytes: (): Int8Array => new Int8Array(_underlying.getBytes())
});
