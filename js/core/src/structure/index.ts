import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import JvmChainBuilder = io.gatling.javaapi.core.ChainBuilder;

import { JvmStructureBuilderLike } from "./jvmStructureBuilder";
import { ExecFunction, Execs, execImpl, Executable } from "./execs";
import { GroupFunction, Groups, groupImpl } from "./groups";
import { FeedFunction, Feeds, feedImpl } from "./feeds";
import { PauseFunction, Pauses, pauseImpl } from "./pauses";
import { Paces, paceImpl } from "./paces";
import { RendezVous, rendezVousImpl } from "./rendezVous";
import { Repeat, repeatImpl } from "./repeat";
import { ForEach, foreachImpl } from "./forEach";
import { During, duringImpl } from "./during";
import { Forever, foreverImpl } from "./forever";
import { AsLongAs, asLongAsImpl } from "./asLongAs";
import { DoWhile, doWhileImpl } from "./doWhile";
import { AsLongAsDuring, asLongAsDuringImpl } from "./asLongAsDuring";
import { DoWhileDuring, doWhileDuringImpl } from "./doWhileDuring";
import { DoIf, DoIfEquals, doIfImpl, doIfEqualsImpl } from "./doIf";
import { DoIfOrElse, DoIfEqualsOrElse, doIfOrElseImpl, doIfEqualsOrElseImpl } from "./doIfOrElse";
import { DoSwitch, doSwitchImpl } from "./doSwitch";
import { DoSwitchOrElse, doSwitchOrElseImpl } from "./doSwitchOrElse";
import { RandomSwitch, randomSwitchImpl } from "./randomSwitch";
import { RandomSwitchOrElse, randomSwitchOrElseImpl } from "./randomSwitchOrElse";
import { UniformRandomSwitch, uniformRandomSwitchImpl } from "./uniformRandomSwitch";
import { RoundRobinSwitch, roundRobinSwitchImpl } from "./roundRobinSwitch";
import { Errors, errorsImpl } from "./errors";

export interface StructureBuilder<T extends StructureBuilder<T>>
  extends Execs<T>,
    Groups<T>,
    Feeds<T>,
    Pauses<T>,
    Paces<T>,
    RendezVous<T>,
    Repeat<T>,
    ForEach<T>,
    During<T>,
    Forever<T>,
    AsLongAs<T>,
    DoWhile<T>,
    AsLongAsDuring<T>,
    DoWhileDuring<T>,
    DoIf<T>,
    DoIfOrElse<T>,
    DoIfEquals<T>,
    DoIfEqualsOrElse<T>,
    DoSwitch<T>,
    DoSwitchOrElse<T>,
    RandomSwitch<T>,
    RandomSwitchOrElse<T>,
    UniformRandomSwitch<T>,
    RoundRobinSwitch<T>,
    Errors<T> {}

export const structureBuilderImpl = <J2, J1 extends JvmStructureBuilderLike<J2, any>, T extends StructureBuilder<T>>(
  jvm: J1,
  wrap: (wrapped: J2) => T
): StructureBuilder<T> => ({
  exec: execImpl(jvm, wrap),
  group: groupImpl(jvm, wrap),
  feed: feedImpl(jvm, wrap),
  pause: pauseImpl(jvm, wrap),
  pace: paceImpl(jvm, wrap),
  rendezVous: rendezVousImpl(jvm, wrap),
  repeat: repeatImpl(jvm, wrap),
  foreach: foreachImpl(jvm, wrap),
  during: duringImpl(jvm, wrap),
  forever: foreverImpl(jvm, wrap),
  asLongAs: asLongAsImpl(jvm, wrap),
  doWhile: doWhileImpl(jvm, wrap),
  asLongAsDuring: asLongAsDuringImpl(jvm, wrap),
  doWhileDuring: doWhileDuringImpl(jvm, wrap),
  doIf: doIfImpl(jvm, wrap),
  doIfOrElse: doIfOrElseImpl(jvm, wrap),
  doIfEquals: doIfEqualsImpl(jvm, wrap),
  doIfEqualsOrElse: doIfEqualsOrElseImpl(jvm, wrap),
  doSwitch: doSwitchImpl(jvm, wrap),
  doSwitchOrElse: doSwitchOrElseImpl(jvm, wrap),
  randomSwitch: randomSwitchImpl(jvm, wrap),
  randomSwitchOrElse: randomSwitchOrElseImpl(jvm, wrap),
  uniformRandomSwitch: uniformRandomSwitchImpl(jvm, wrap),
  roundRobinSwitch: roundRobinSwitchImpl(jvm, wrap),
  ...errorsImpl(jvm, wrap)
});

export interface ChainBuilder extends StructureBuilder<ChainBuilder>, Executable<JvmChainBuilder> {}

const wrapChainBuilder = (_underlying: JvmChainBuilder): ChainBuilder => ({
  _underlying,
  ...structureBuilderImpl(_underlying, wrapChainBuilder)
});

// CoreDsl elements
export { ActionBuilder, wrapActionBuilder } from "./execs";
export { onCase, percent } from "./choices";
export const exec: ExecFunction<ChainBuilder> = execImpl(JvmCoreDsl, wrapChainBuilder);
export const group: GroupFunction<ChainBuilder> = groupImpl(JvmCoreDsl, wrapChainBuilder);
export const feed: FeedFunction<ChainBuilder> = feedImpl(JvmCoreDsl, wrapChainBuilder);
export const pause: PauseFunction<ChainBuilder> = pauseImpl(JvmCoreDsl, wrapChainBuilder);
export const pace = paceImpl(JvmCoreDsl, wrapChainBuilder);
export const rendezVous = rendezVousImpl(JvmCoreDsl, wrapChainBuilder);
export const repeat = repeatImpl(JvmCoreDsl, wrapChainBuilder);
export const foreach = foreachImpl(JvmCoreDsl, wrapChainBuilder);
export const during = duringImpl(JvmCoreDsl, wrapChainBuilder);
export const forever = foreverImpl(JvmCoreDsl, wrapChainBuilder);
export const asLongAs = asLongAsImpl(JvmCoreDsl, wrapChainBuilder);
export const doWhile = doWhileImpl(JvmCoreDsl, wrapChainBuilder);
export const asLongAsDuring = asLongAsDuringImpl(JvmCoreDsl, wrapChainBuilder);
export const doWhileDuring = doWhileDuringImpl(JvmCoreDsl, wrapChainBuilder);
export const doIf = doIfImpl(JvmCoreDsl, wrapChainBuilder);
export const doIfOrElse = doIfOrElseImpl(JvmCoreDsl, wrapChainBuilder);
export const doIfEquals = doIfEqualsImpl(JvmCoreDsl, wrapChainBuilder);
export const doIfEqualsOrElse = doIfEqualsOrElseImpl(JvmCoreDsl, wrapChainBuilder);
export const doSwitch = doSwitchImpl(JvmCoreDsl, wrapChainBuilder);
export const doSwitchOrElse = doSwitchOrElseImpl(JvmCoreDsl, wrapChainBuilder);
export const randomSwitch = randomSwitchImpl(JvmCoreDsl, wrapChainBuilder);
export const randomSwitchOrElse = randomSwitchOrElseImpl(JvmCoreDsl, wrapChainBuilder);
export const uniformRandomSwitch = uniformRandomSwitchImpl(JvmCoreDsl, wrapChainBuilder);
export const roundRobinSwitch = roundRobinSwitchImpl(JvmCoreDsl, wrapChainBuilder);
export const exitBlockOnFail = errorsImpl(JvmCoreDsl, wrapChainBuilder).exitBlockOnFail;
export const tryMax = errorsImpl(JvmCoreDsl, wrapChainBuilder).tryMax;
export const exitHereIf = errorsImpl(JvmCoreDsl, wrapChainBuilder).exitHereIf;
export const exitHere = errorsImpl(JvmCoreDsl, wrapChainBuilder).exitHere;
export const exitHereIfFailed = errorsImpl(JvmCoreDsl, wrapChainBuilder).exitHereIfFailed;
export const stopLoadGenerator = errorsImpl(JvmCoreDsl, wrapChainBuilder).stopLoadGenerator;
export const stopLoadGeneratorIf = errorsImpl(JvmCoreDsl, wrapChainBuilder).stopLoadGeneratorIf;
export const crashLoadGenerator = errorsImpl(JvmCoreDsl, wrapChainBuilder).crashLoadGenerator;
export const crashLoadGeneratorIf = errorsImpl(JvmCoreDsl, wrapChainBuilder).crashLoadGeneratorIf;
