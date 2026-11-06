import { CheckBuilder, CheckBuilderFind, wrapCheckBuilder, wrapCheckBuilderFind } from "@gatling.io/core";

import { JmsMessage, wrapJmsMessage } from "./message";

import { JmsDsl as JvmJmsDsl } from "@gatling.io/jvm-types";

import JvmCheckBuilderFind = io.gatling.javaapi.core.CheckBuilder$Find;
import JvmJmsPropertyOfTypeFind = io.gatling.javaapi.jms.JmsCheckBuilder$JmsPropertyOfTypeFind;

// provided by GraalJS, but not declared by the es2023 lib
declare const console: { error(message: string): void };

/**
 * A special {@link CheckBuilderFind<string>} that works on JMS message properties
 */
export interface JmsPropertyOfTypeFind extends CheckBuilderFind<string> {
  /**
   * Define that the extracted value is a String
   *
   * @returns a new CheckBuilderFind
   */
  ofString(): CheckBuilderFind<string>;

  /**
   * Define that the extracted value is a Boolean
   *
   * @returns a new CheckBuilderFind
   */
  ofBoolean(): CheckBuilderFind<boolean>;

  /**
   * Define that the extracted value is an Integer
   *
   * @returns a new CheckBuilderFind
   */
  ofInt(): CheckBuilderFind<number>;

  /**
   * Define that the extracted value is a Long
   *
   * @returns a new CheckBuilderFind
   */
  ofLong(): CheckBuilderFind<number>;

  /**
   * Define that the extracted value is a Double
   *
   * @returns a new CheckBuilderFind
   */
  ofDouble(): CheckBuilderFind<number>;

  /**
   * Define that the extracted value is an untyped object
   *
   * @returns a new CheckBuilderFind
   */
  ofObject(): CheckBuilderFind<unknown>;
}

const wrapJmsPropertyOfTypeFind = (_underlying: JvmJmsPropertyOfTypeFind): JmsPropertyOfTypeFind => ({
  ...wrapCheckBuilderFind<string>(_underlying),
  ofString: (): CheckBuilderFind<string> => wrapCheckBuilderFind(_underlying.ofString()),
  ofBoolean: (): CheckBuilderFind<boolean> =>
    wrapCheckBuilderFind(_underlying.ofBoolean() as JvmCheckBuilderFind<boolean>),
  ofInt: (): CheckBuilderFind<number> => wrapCheckBuilderFind(_underlying.ofInt() as JvmCheckBuilderFind<number>),
  ofLong: (): CheckBuilderFind<number> => wrapCheckBuilderFind(_underlying.ofLong() as JvmCheckBuilderFind<number>),
  ofDouble: (): CheckBuilderFind<number> => wrapCheckBuilderFind(_underlying.ofDouble() as JvmCheckBuilderFind<number>),
  ofObject: (): CheckBuilderFind<unknown> => wrapCheckBuilderFind(_underlying.ofObject())
});

/**
 * Bootstrap a check on a property of the reply
 *
 * @param name - the name of the property
 * @returns the next DSL step
 */
export const jmsProperty = (name: string): JmsPropertyOfTypeFind =>
  wrapJmsPropertyOfTypeFind(JvmJmsDsl.jmsProperty(name));

/**
 * Create a check on the reply from a function. The check fails if the function throws.
 *
 * @param f - the function, returns true if the reply is valid
 * @returns a CheckBuilder
 */
export const simpleCheck = (f: (message: JmsMessage) => boolean): CheckBuilder =>
  wrapCheckBuilder(
    JvmJmsDsl.simpleCheck((message: any) => {
      // Gatling doesn't catch the exceptions of this function, which would crash the actor waiting for the replies and
      // lose the virtual user, so never throw and always return a boolean
      try {
        return Boolean(f(wrapJmsMessage(message)));
      } catch (e) {
        console.error(`JMS simpleCheck failed: ${e}`);
        return false;
      }
    })
  );
