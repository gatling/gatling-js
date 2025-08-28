import {
  ActionBuilder,
  Expression,
  Session,
  underlyingJvmXToXWithSessionToSession,
  underlyingSessionTo,
  wrapActionBuilder
} from "@gatling.io/core";

import { ConnectActionBuilder, wrapConnectActionBuilder } from "./connect";
import { MqttInboundMessage, wrapMqttInboundMessages } from "./message";
import { MqttProtocolBuilder, mqttProtocolBuilder } from "./protocol";
import { PublishActionBuilder } from "./publish";
import { SubscribeActionBuilder, wrapSubscribeActionBuilder } from "./subscribe";
import { WaitForMessagesActionBuilder, wrapWaitForMessagesActionBuilder } from "./wait";

export * from "./connect";
export * from "./lastWill";
export * from "./message";
export * from "./protocol";
export * from "./publish";
export * from "./subscribe";
export * from "./wait";

import { MqttDsl as JvmMqttDsl } from "@gatling.io/jvm-types";

import JvmMqtt = io.gatling.javaapi.mqtt.Mqtt;
import JvmMqttBuilder = io.gatling.javaapi.mqtt.MqttBuilder;

export namespace Mqtt {
  export interface Apply {
    /**
     * Boostrap a builder for a MQTT action
     *
     * @param name - the action name, expressed as a Gatling Expression Language String
     * @returns the next DSL step
     */
    (name: string): MqttBuilder;

    /**
     * Boostrap a builder for a MQTT action
     *
     * @param name - the action name, expressed as a function
     * @returns the next DSL step
     */
    (name: (session: Session) => string): MqttBuilder;
  }

  export const apply = (name: Expression<string>): MqttBuilder => {
    const jvmMqttBuilder =
      typeof name === "function" ? JvmMqttDsl.mqtt(underlyingSessionTo(name)) : JvmMqttDsl.mqtt(name);
    return wrapMqttBuilder(jvmMqttBuilder);
  };

  export interface Prefix {
    /**
     * Boostrap a builder for an action that waits for all awaited inbound messages to arrive
     *
     * @returns the next DSL step
     */
    waitForMessages(): WaitForMessagesActionBuilder;

    /**
     * Process the currently buffered inbound MQTT messages and empty the buffer
     *
     * @param topic - the name of the topic, expressed as a Gatling Expression Language String
     * @param f - the function to process the buffered messages
     * @returns an ActionBuilder
     */
    processUnmatchedMessages(
      topic: string,
      f: (messages: Array<MqttInboundMessage>, session: Session) => Session
    ): ActionBuilder;
  }

  const jvmMqtt = JvmMqttDsl.mqtt as any as JvmMqtt;

  export const prefix: Prefix = {
    waitForMessages: () => wrapWaitForMessagesActionBuilder(jvmMqtt.waitForMessages()),
    processUnmatchedMessages: (
      topic: string,
      f: (messages: Array<MqttInboundMessage>, session: Session) => Session
    ): ActionBuilder =>
      wrapActionBuilder(
        jvmMqtt.processUnmatchedMessages(topic, underlyingJvmXToXWithSessionToSession(f, wrapMqttInboundMessages))
      )
  };
}

export interface MqttBuilder {
  /**
   * Create a builder for actions that create a MQTT connection
   *
   * @returns a new ActionBuilder instance
   */
  connect(): ConnectActionBuilder;

  /**
   * Create a builder for actions that subscribe to a MQTT topic
   *
   * @param topic - the name of the topic, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  subscribe(topic: string): SubscribeActionBuilder;

  /**
   * Create a builder for actions that subscribe to a MQTT topic
   *
   * @param topic - the name of the topic, expressed as a function
   * @returns a new ActionBuilder instance
   */
  subscribe(topic: (session: Session) => string): SubscribeActionBuilder;

  /**
   * Create a builder for actions that publish to a MQTT topic
   *
   * @param topic - the name of the topic, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  publish(topic: string): PublishActionBuilder.Base;

  /**
   * Create a builder for actions that publish to a MQTT topic
   *
   * @param topic - the name of the topic, expressed as a function
   * @returns a new ActionBuilder instance
   */
  publish(topic: (session: Session) => string): PublishActionBuilder.Base;
}

const wrapMqttBuilder = (jvmMqtt: JvmMqttBuilder): MqttBuilder => ({
  connect: () => wrapConnectActionBuilder(jvmMqtt.connect()),
  subscribe: (topic: Expression<string>) =>
    wrapSubscribeActionBuilder(
      typeof topic === "function" ? jvmMqtt.subscribe(underlyingSessionTo(topic)) : jvmMqtt.subscribe(topic)
    ),
  publish: (topic: Expression<string>): PublishActionBuilder.Base =>
    PublishActionBuilder.wrapBase(
      typeof topic === "function" ? jvmMqtt.publish(underlyingSessionTo(topic)) : jvmMqtt.publish(topic)
    )
});

export const mqtt: Mqtt.Apply & Mqtt.Prefix & MqttProtocolBuilder = Object.assign(
  Mqtt.apply,
  Mqtt.prefix,
  mqttProtocolBuilder
);
