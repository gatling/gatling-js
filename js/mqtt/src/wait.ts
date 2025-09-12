import { ActionBuilder, Duration, isDuration, toJvmDuration } from "@gatling.io/core";

import JvmWaitForMessagesActionBuilder = io.gatling.javaapi.mqtt.WaitForMessagesActionBuilder;

export interface WaitForMessagesActionBuilder extends ActionBuilder {
  /**
   * Define the timeout for waiting for pending expects
   *
   * @param timeout - the timeout
   * @returns a new WaitForMessagesActionBuilder instance
   */
  timeout(timeout: Duration): WaitForMessagesActionBuilder;
}

export const wrapWaitForMessagesActionBuilder = (
  _underlying: JvmWaitForMessagesActionBuilder
): WaitForMessagesActionBuilder => ({
  _underlying,
  timeout: (timeout) => {
    if (isDuration(timeout)) {
      return wrapWaitForMessagesActionBuilder(_underlying.timeout(toJvmDuration(timeout)));
    }

    throw Error(`timeout() called with invalid argument ${timeout}`);
  }
});
