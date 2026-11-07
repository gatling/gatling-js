import { ActionBuilder } from "@gatling.io/core";
import JvmUnsubscribeActionBuilder = io.gatling.javaapi.mqtt.UnsubscribeActionBuilder;

/**
 * DSL for actions that unsubscribe from MQTT topics
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface UnsubscribeActionBuilder extends ActionBuilder {}

export const wrapUnsubscribeActionBuilder = (_underlying: JvmUnsubscribeActionBuilder): UnsubscribeActionBuilder => ({
  _underlying
});
