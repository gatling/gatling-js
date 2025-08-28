/*
 * Copyright 2011-2025 GatlingCorp (https://gatling.io)
 *
 * All rights reserved.
 */

package io.gatling.javaapi.mqtt;

import java.util.function.Function;

import io.gatling.javaapi.core.Body;
import io.gatling.javaapi.core.Session;

import edu.umd.cs.findbugs.annotations.NonNull;

import static io.gatling.javaapi.core.internal.Expressions.*;

/** The entrypoint of the Gatling MQTT DSL */
public final class MqttDsl {
  private MqttDsl() {}

  /**
   * Bootstrap a builder for last will messages
   *
   * @param topic the topic to send last will messages to, expressed as a Gatling Expression
   *     Language String
   * @param message the last will message
   * @return the next DSL step
   */
  @NonNull
  public static LastWillBuilder LastWill(@NonNull String topic, @NonNull Body message) {
    return new LastWillBuilder(
      io.gatling.mqtt.Predef.LastWill(toStringExpression(topic), message.asScala()));
  }

  /**
   * Bootstrap a builder for last will messages
   *
   * @param topic the topic to send last will messages to, expressed as a function
   * @param message the last will message
   * @return the next DSL step
   */
  @NonNull
  public static LastWillBuilder LastWill(
    @NonNull Function<Session, String> topic, @NonNull Body message) {
    return new LastWillBuilder(
      io.gatling.mqtt.Predef.LastWill(
        javaFunctionToExpression(topic), message.asScala()));
  }

  // TODO ggaly: find a better fix than overriding this entire file (currently fails during java2typescript processing
  //   because of this static field initialization)
  /** Bootstrap a MQTT/MQTT protocol configuration */
  public static final Mqtt mqtt = null;
  //    new Mqtt(io.gatling.mqtt.Predef.mqtt(io.gatling.core.Predef.configuration()));

  /**
   * Boostrap a builder for a MQTT action
   *
   * @param name the action name, expressed as a Gatling Expression Language String
   * @return the next DSL step
   */
  @NonNull
  public static MqttBuilder mqtt(@NonNull String name) {
    return new MqttBuilder(toStringExpression(name));
  }

  /**
   * Boostrap a builder for a MQTT action
   *
   * @param name the action name, expressed as a function
   * @return the next DSL step
   */
  @NonNull
  public static MqttBuilder mqtt(@NonNull Function<Session, String> name) {
    return new MqttBuilder(javaFunctionToExpression(name));
  }
}
