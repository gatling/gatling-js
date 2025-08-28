import { MqttMessageType as JvmMqttMessageTypeStatic, MqttQoS as JvmMqttQosStatic } from "@gatling.io/jvm-types";

import JvmMqttFixedHeader = io.netty.handler.codec.mqtt.MqttFixedHeader;
import JvmMqttMessageType = io.netty.handler.codec.mqtt.MqttMessageType;
import JvmMqttQos = io.netty.handler.codec.mqtt.MqttQoS;

import JvmMqttInboundMessage = io.gatling.mqtt.action.MqttInboundMessage;

export type MqttMessageType =
  | "CONNECT" // 1
  | "CONNACK" // 2
  | "PUBLISH" // 3
  | "PUBACK" // 4
  | "PUBREC" // 5
  | "PUBREL" // 6
  | "PUBCOMP" // 7
  | "SUBSCRIBE" // 8
  | "SUBACK" // 9
  | "UNSUBSCRIBE" // 10
  | "UNSUBACK" // 11
  | "PINGREQ" // 12
  | "PINGRESP" // 13
  | "DISCONNECT" // 14
  | "AUTH"; // 15

export type MqttQos =
  | "AT_MOST_ONCE" // 0
  | "AT_LEAST_ONCE" // 1
  | "EXACTLY_ONCE" // 2
  | "FAILURE"; // 0x80

export interface MqttFixedHeader {
  isDup(): boolean;
  isRetain(): boolean;
  messageType(): MqttMessageType;
  qosLevel(): MqttQos;
  remainingLength(): number;

  toString(): string;
}

const wrapFixedHeader = (jvmFixedHeader: JvmMqttFixedHeader): MqttFixedHeader => ({
  isDup: () => jvmFixedHeader.isDup(),
  isRetain: () => jvmFixedHeader.isRetain(),
  messageType: () => jvmFixedHeader.messageType().name() as MqttMessageType,
  qosLevel: () => jvmFixedHeader.qosLevel().name() as MqttQos,
  remainingLength: () => jvmFixedHeader.remainingLength()
});

export interface MqttProperties {}

export interface MqttPublishVariableHeader {
  topicName(): string;
  /**
   * @deprecated use {@link #packetId()} instead.
   */
  messageId(): number;
  packetId(): number;
  properties(): MqttProperties;
  toString(): string;
}

export interface MqttInboundMessage {
  timestamp(): number;
  fixedHeader(): MqttFixedHeader;
  variableHeader(): MqttPublishVariableHeader;
  payload(): number[]; // FIXME Uint8Array after introducing textencoder/decoder?
  payloadUtf8String(): string;
}

const wrapMqttInboundMessage = (jvmMessage: JvmMqttInboundMessage): MqttInboundMessage => ({
  timestamp: () => jvmMessage.timestamp(),
  fixedHeader: () => wrapFixedHeader(jvmMessage.fixedHeader()),
  variableHeader: () => jvmMessage.variableHeader(),
  payload: () => jvmMessage.payload(), // FIXME Uint8Array after introducing textencoder/decoder?
  payloadUtf8String: () => jvmMessage.payloadUtf8String()
});

export const wrapMqttInboundMessages = (jvmMessages: JvmMqttInboundMessage[]): MqttInboundMessage[] => {
  const messages: MqttInboundMessage[] = []; // map looses the original array type and turn it into object?
  jvmMessages.forEach((message) => {
    messages.push(wrapMqttInboundMessage(message));
  });

  return messages;
};
