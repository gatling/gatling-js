import { ActionBuilder } from "@gatling.io/core";

import JvmConnectActionBuilder = io.gatling.javaapi.mqtt.ConnectActionBuilder;

/** The builder for connect action */
export interface ConnectActionBuilder extends ActionBuilder {
  _underlying: JvmConnectActionBuilder;
}

export const wrapConnectActionBuilder = (_underlying: JvmConnectActionBuilder): ConnectActionBuilder => ({
  _underlying
});
