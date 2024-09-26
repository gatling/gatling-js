import "@gatling.io/jvm-types";
import JvmSetUp = io.gatling.javaapi.core.Simulation$SetUp;

import * as jvm from "./gatlingJvm/app";
import { PauseType, toJvmPauseType } from "./structure/pauses";
import { Duration, toJvmDuration } from "./utils/duration";
import { SessionTo, underlyingSessionTo } from "./session";
import { Assertion } from "./assertions";
import { PopulationBuilder } from "./population";
import { ProtocolBuilder } from "./protocol";
import { ThrottleStep } from "./throttling";

// FIXME no export *
export { asJava } from "./gatlingJvm/collections";
export { asByteArray, asByteArrayFunction } from "./gatlingJvm/byteArrays";
export { readResourceAsBytes, readResourceAsString } from "./gatlingJvm/resources";
export * from "./utils/duration";
export * from "./assertions";
export * from "./body";
export * from "./checks";
export * from "./closedInjection";
export * from "./common";
export * from "./feeders";
export * from "./filters";
export { GlobalStore } from "./globalStore";
export * from "./openInjection";
export * from "./population";
export { getParameter, getOption, getEnvironmentVariable, GetWithDefault } from "./parameters";
export * from "./protocol";
export * from "./scenario";
export * from "./session";
export * from "./structure";
export * from "./throttling";

export interface SetUp {
  /**
   * Define the desired protocol configurations
   *
   * @param protocols - the protocols
   * @returns the same mutated setup instance
   */
  protocols(...protocols: ProtocolBuilder[]): SetUp;

  /**
   * Define the desired assertions
   *
   * @param assertions - the assertions
   * @returns the same mutated setup instance
   */
  assertions(...assertions: Assertion[]): SetUp;

  /**
   * Define the run max duration
   *
   * @param duration - the max duration
   * @returns the same mutated setup instance
   */
  maxDuration(duration: Duration): SetUp;

  /**
   * Define the throttling, meaning a maximum throughput over time
   *
   * @param throttleSteps - the throttling DSL steps
   * @returns the same mutated setup instance
   */
  throttle(...throttleSteps: ThrottleStep[]): SetUp;

  /**
   * Disable the pauses
   *
   *  @returns the same mutated setup instance
   */
  disablePauses(): SetUp;

  /**
   * Apply constant pauses
   *
   * @returns the same mutated setup instance
   */
  constantPauses(): SetUp;

  /**
   * Apply exponential pauses
   *
   * @returns the same mutated setup instance
   */
  exponentialPauses(): SetUp;

  /**
   * Apply custom pauses
   *
   * @returns the same mutated setup instance
   */
  customPauses(f: SessionTo<number>): SetUp;

  /**
   * Apply uniform pauses with half-width defined as a percentage
   *
   * @returns the same mutated setup instance
   */
  uniformPauses(plusOrMinus: number): SetUp;

  /**
   * Apply uniform pauses with half-width defined as an absolute value
   *
   * @returns the same mutated setup instance
   */
  uniformPauses(plusOrMinus: Duration): SetUp;

  /**
   * Apply normal distribution pauses with the standard deviation defined as an absolute value
   *
   * @param stdDevDuration - the standard deviation of the distribution.
   * @returns the same mutated setup instance
   */
  normalPausesWithStdDevDuration(stdDevDuration: Duration): SetUp;

  /**
   * Apply normal distribution pauses with the standard deviation defined as a percentage of the
   * value defined in the scenario
   *
   * @param stdDevPercent - the standard deviation of the distribution in percents.
   * @returns the same mutated setup instance
   */
  normalPausesWithPercentageDuration(stdDevPercent: number): SetUp;

  /**
   * Apply uniform pauses with a given strategy
   *
   * @param pauseType - the pause type
   * @returns the same mutated setup instance
   */
  pauses(pauseType: PauseType): SetUp;
}

const wrapSetUp = (jvmSetUp: JvmSetUp): SetUp => ({
  protocols: (...protocols) => wrapSetUp(jvmSetUp.protocols(protocols.map((p) => p._underlying))),
  assertions: (...assertions) => wrapSetUp(jvmSetUp.assertions(assertions.map((p) => p._underlying))),
  maxDuration: (duration) => wrapSetUp(jvmSetUp.maxDuration(toJvmDuration(duration))),
  throttle: (...throttleSteps) => wrapSetUp(jvmSetUp.throttle(throttleSteps.map((t) => t._underlying))),
  disablePauses: () => wrapSetUp(jvmSetUp.disablePauses()),
  constantPauses: () => wrapSetUp(jvmSetUp.constantPauses()),
  exponentialPauses: () => wrapSetUp(jvmSetUp.exponentialPauses()),
  customPauses: (f) => wrapSetUp(jvmSetUp.customPauses(underlyingSessionTo(f))),
  uniformPauses: (plusOrMinus) => wrapSetUp(jvmSetUp.uniformPauses(toJvmDuration(plusOrMinus))),
  normalPausesWithStdDevDuration: (stdDevDuration) =>
    wrapSetUp(jvmSetUp.normalPausesWithStdDevDuration(toJvmDuration(stdDevDuration))),
  normalPausesWithPercentageDuration: (stdDevPercent) =>
    wrapSetUp(jvmSetUp.normalPausesWithPercentageDuration(stdDevPercent)),
  pauses: (pauseType) => wrapSetUp(jvmSetUp.pauses(toJvmPauseType(pauseType)))
});

export type SetUpFunction = (...populationBuilders: PopulationBuilder[]) => SetUp;
export type Simulation = (setUp: SetUpFunction) => void;

export const simulation =
  (simulation: Simulation): jvm.Simulation =>
  (jvmSetUp) => {
    simulation((...populationBuilders) => wrapSetUp(jvmSetUp(populationBuilders.map((p) => p._underlying))));
  };
