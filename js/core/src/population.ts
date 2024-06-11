import { Duration, toJvmDuration } from "./utils/duration";
import { PauseType, toJvmPauseType } from "./structure/pauses";
import { Wrapper } from "./common";
import { ProtocolBuilder } from "./protocol";
import { SessionTo, underlyingSessionTo } from "./session";
import { ThrottleStep } from "./throttling";

import JvmPopulationBuilder = io.gatling.javaapi.core.PopulationBuilder;

/**
 * A builder for a Population = a Scenario + an injection profile.
 *
 * Immutable, meaning each method doesn't mutate the current instance but return a new one.
 */
export interface PopulationBuilder extends Wrapper<JvmPopulationBuilder> {
  /**
   * Define the optional protocols for this PopulationBuilder
   *
   * @param protocols - the protocols
   * @returns a new PopulationBuilder
   */
  protocols(...protocols: ProtocolBuilder[]): PopulationBuilder;

  /**
   * Define some other PopulationBuilder to be executed once all the users of this PopulationBuilder
   * complete their Scenario.
   *
   * @param children - the children PopulationBuilder
   * @returns a new PopulationBuilder
   */
  andThen(...children: PopulationBuilder[]): PopulationBuilder;

  /**
   * Disable the pauses
   *
   * @return a new PopulationBuilder
   */
  disablePauses(): PopulationBuilder;

  /**
   * Use constant pauses
   *
   * @return a new PopulationBuilder
   */
  constantPauses(): PopulationBuilder;

  /**
   * Use exponential pauses
   *
   * @return a new PopulationBuilder
   */
  exponentialPauses(): PopulationBuilder;

  /**
   * Use custom pauses
   *
   * @return a new PopulationBuilder
   */
  customPauses(f: SessionTo<number>): PopulationBuilder;

  /**
   * Use uniform pauses with a standard deviation percentage
   *
   * @return a new PopulationBuilder
   */
  uniformPauses(plusOrMinus: Duration): PopulationBuilder;

  /**
   * Use pauses configured with a given strategy
   *
   * @param pauseType the pause type
   * @return a new PopulationBuilder
   */
  pauses(pauseType: PauseType): PopulationBuilder;

  /**
   * Define the optional throttling profile
   *
   * @param throttleSteps the throttling profile steps
   * @return a new PopulationBuilder
   */
  throttle(...throttleSteps: ThrottleStep[]): PopulationBuilder;

  /**
   * Disable the injection profile sharding that happens normally when running with Gatling
   * Enterprise. Only effective when the test is running with Gatling Enterprise, noop otherwise.
   *
   * @return a new PopulationBuilder
   */
  noShard(): PopulationBuilder;
}

export const wrapPopulationBuilder = (_underlying: JvmPopulationBuilder): PopulationBuilder => ({
  _underlying,
  protocols: (...protocols) => wrapPopulationBuilder(_underlying.protocols(protocols.map((p) => p._underlying))),
  andThen: (...children) => wrapPopulationBuilder(_underlying.andThen(children.map((c) => c._underlying))),
  disablePauses: () => wrapPopulationBuilder(_underlying.disablePauses()),
  constantPauses: () => wrapPopulationBuilder(_underlying.constantPauses()),
  exponentialPauses: () => wrapPopulationBuilder(_underlying.exponentialPauses()),
  customPauses: (f) => wrapPopulationBuilder(_underlying.customPauses(underlyingSessionTo(f))),
  uniformPauses: (plusOrMinus) => wrapPopulationBuilder(_underlying.uniformPauses(toJvmDuration(plusOrMinus))),
  pauses: (pauseType) => wrapPopulationBuilder(_underlying.pauses(toJvmPauseType(pauseType))),
  throttle: (...throttleSteps) => wrapPopulationBuilder(_underlying.throttle(throttleSteps.map((t) => t._underlying))),
  noShard: () => wrapPopulationBuilder(_underlying.noShard())
});
