import { Wrapper } from "@gatling.io/core";

import JvmRequestBody = io.gatling.http.client.body.RequestBody;

export interface RequestBody extends Wrapper<JvmRequestBody> {
  bytes(): number[];
}

export const wrapRequestBody = (_underlying: JvmRequestBody): RequestBody => ({
  _underlying,
  bytes: (): number[] => _underlying.getBytes()
});
