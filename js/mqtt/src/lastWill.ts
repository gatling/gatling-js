import { Body, Expression, Session, Wrapper, underlyingSessionTo } from "@gatling.io/core";
import { MqttDsl as JvmMqttDsl } from "@gatling.io/jvm-types";

import JvmLastWillBuilder = io.gatling.javaapi.mqtt.LastWillBuilder;

export interface LastWillBuilder extends Wrapper<JvmLastWillBuilder> {
  /**
   * Use an at-most-once QoS
   *
   * @returns a new LastWillBuilder instance
   */
  qosAtMostOnce(): LastWillBuilder;

  /**
   * Use an at-least-once QoS
   *
   * @returns a new LastWillBuilder instance
   */
  qosAtLeastOnce(): LastWillBuilder;

  /**
   * Use an exactly-once QoS
   *
   * @returns a new LastWillBuilder instance
   */
  qosExactlyOnce(): LastWillBuilder;

  /**
   * Instruct the server to retain the last will message
   *
   * @returns a new LastWillBuilder instance
   */
  retain(newRetain: boolean): LastWillBuilder;
}

export const wrapLastWillBuilder = (_underlying: JvmLastWillBuilder): LastWillBuilder => ({
  _underlying,
  qosAtMostOnce: (): LastWillBuilder => wrapLastWillBuilder(_underlying.qosAtMostOnce()),
  qosAtLeastOnce: (): LastWillBuilder => wrapLastWillBuilder(_underlying.qosAtLeastOnce()),
  qosExactlyOnce: (): LastWillBuilder => wrapLastWillBuilder(_underlying.qosExactlyOnce()),
  retain: (newRetain: boolean): LastWillBuilder => wrapLastWillBuilder(_underlying.retain(newRetain))
});

export namespace LastWill {
  export interface Apply {
    /**
     * Bootstrap a builder for last will messages
     *
     * @param topic - the topic to send last will messages to, expressed as a Gatling Expression
     *     Language String
     * @param message - the last will message
     * @returns the next DSL step
     */
    (topic: string, message: Body): LastWillBuilder;

    /**
     * Bootstrap a builder for last will messages
     *
     * @param topic - the topic to send last will messages to, expressed as a function
     * @param message - the last will message
     * @returns the next DSL step
     */
    (topic: (session: Session) => string, message: Body): LastWillBuilder;
  }
}

export const LastWill: LastWill.Apply = (topic: Expression<string>, message: Body): LastWillBuilder =>
  typeof topic === "function"
    ? wrapLastWillBuilder(JvmMqttDsl.LastWill(underlyingSessionTo(topic), message._underlying))
    : wrapLastWillBuilder(JvmMqttDsl.LastWill(topic, message._underlying));
