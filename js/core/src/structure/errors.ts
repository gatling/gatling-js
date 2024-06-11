import { SessionTo, underlyingSessionTo } from "../session";
import { On, wrapOn } from "./on";

import JvmErrors = io.gatling.javaapi.core.error.Errors;

export interface ExitBlockOnFailFunction<T extends Errors<T>> {
  /**
   * Define a block that is interrupted for a given virtual user if it experiences a failure.
   *
   * @returns a DSL component for defining the tried block
   */
  (): On<T>;
}

export interface TryMaxFunction<T extends Errors<T>> {
  /**
   * Define a block that is interrupted and retried for a given virtual user if it experiences a failure.
   *
   * @param times - the maximum number of tries, including the first one (hence number of retries + 1)
   * @returns a DSL component for defining the tried block
   */
  (times: number | string | SessionTo<number>): On<T>;

  /**
   * Define a block that is interrupted and retried for a given virtual user if it experiences a failure.
   *
   * @param times - the maximum number of tries, including the first one (hence number of retries + 1)
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the tried block
   */
  (times: number | string | SessionTo<number>, counterName: string): On<T>;
}

export interface ExitHereIfFunction<T extends Errors<T>> {
  /**
   * Have the virtual user exit here if the condition holds true
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @returns a new StructureBuilder
   */
  (condition: string): T;

  /**
   * Have the virtual user exit here if the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @returns a new StructureBuilder
   */
  (condition: SessionTo<boolean>): T;
}

export interface ExitHereFunction<T extends Errors<T>> {
  /**
   * Have the virtual user exit here
   *
   * @returns a new StructureBuilder
   */
  (): T;
}

export interface ExitHereIfFailedFunction<T extends Errors<T>> {
  /**
   * Have the virtual user exit here if the state of its Session is failed
   *
   * @returns a new StructureBuilder
   */
  (): T;
}

export interface StopInjectorFunction<T extends Errors<T>> {
  /**
   * Have the virtual user abruptly stop the injector
   *
   * @param message - the message, expressed as a Gatling Expression Language String
   * @returns a new StructureBuilder
   */
  (message: string): T;

  /**
   * Have the virtual user abruptly stop the injector
   *
   * @param message - the message, expressed as a function
   * @returns a new StructureBuilder
   */
  (message: SessionTo<string>): T;
}

export interface StopInjectorIfFunction<T extends Errors<T>> {
  /**
   * Have the virtual user abruptly stop the injector if a condition is met
   *
   * @param message - the message, expressed as a Gatling Expression Language String
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @returns a new StructureBuilder
   */
  (message: string, condition: string): T;

  /**
   * Have the virtual user abruptly stop the injector if a condition is met
   *
   * @param message - the message, expressed as a Gatling Expression Language String
   * @param condition - the condition, expressed as a function
   * @returns a new StructureBuilder
   */
  (message: string, condition: SessionTo<boolean>): T;

  /**
   * Have the virtual user abruptly stop the injector if a condition is met
   *
   * @param message - the message, expressed as a function
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @returns a new StructureBuilder
   */
  (message: SessionTo<string>, condition: string): T;

  /**
   * Have the virtual user abruptly stop the injector if a condition is met
   *
   * @param message - the message, expressed as a function
   * @param condition - the condition, expressed as a function
   * @returns a new StructureBuilder
   */
  (message: SessionTo<string>, condition: SessionTo<boolean>): T;
}

export interface Errors<T extends Errors<T>> {
  exitBlockOnFail: ExitBlockOnFailFunction<T>;
  tryMax: TryMaxFunction<T>;
  exitHereIf: ExitHereIfFunction<T>;
  exitHere: ExitHereFunction<T>;
  exitHereIfFailed: ExitHereIfFailedFunction<T>;
  stopInjector: StopInjectorFunction<T>;
  stopInjectorIf: StopInjectorIfFunction<T>;
}

export const errorsImpl = <J2, J1 extends JvmErrors<J2, any>, T extends Errors<T>>(
  jvmErrors: J1,
  wrap: (wrapped: J2) => T
): Errors<T> => ({
  exitBlockOnFail: (): On<T> => wrapOn(jvmErrors.exitBlockOnFail(), wrap),
  tryMax: (times: string | number | SessionTo<number>): On<T> =>
    wrapOn(
      typeof times === "function"
        ? jvmErrors.tryMax(underlyingSessionTo(times))
        : typeof times === "string"
          ? jvmErrors.tryMax(times)
          : jvmErrors.tryMax(times),
      wrap
    ),
  exitHereIf: (condition: string | SessionTo<boolean>): T =>
    wrap(
      typeof condition === "function"
        ? jvmErrors.exitHereIf(underlyingSessionTo(condition))
        : jvmErrors.exitHereIf(condition)
    ),
  exitHere: (): T => wrap(jvmErrors.exitHere()),
  exitHereIfFailed: (): T => wrap(jvmErrors.exitHereIfFailed()),
  stopInjector: (message: string | SessionTo<string>): T =>
    wrap(
      typeof message === "function"
        ? jvmErrors.stopInjector(underlyingSessionTo(message))
        : jvmErrors.stopInjector(message)
    ),
  stopInjectorIf: (message: string | SessionTo<string>, condition: string | SessionTo<boolean>): T => {
    if (typeof message === "function") {
      if (typeof condition === "function") {
        return wrap(jvmErrors.stopInjectorIf(underlyingSessionTo(message), underlyingSessionTo(condition)));
      } else {
        return wrap(jvmErrors.stopInjectorIf(underlyingSessionTo(message), condition));
      }
    } else {
      if (typeof condition === "function") {
        return wrap(jvmErrors.stopInjectorIf(message, underlyingSessionTo(condition)));
      } else {
        return wrap(jvmErrors.stopInjectorIf(message, condition));
      }
    }
  }
});
