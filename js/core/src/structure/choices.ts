import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Wrapper } from "../common";
import { Executable } from "./execs";

import JvmChoiceWithKey = io.gatling.javaapi.core.Choice$WithKey;
import JvmChoiceWithKeyThen = io.gatling.javaapi.core.WithKey$Then;
import JvmChoiceWithWeight = io.gatling.javaapi.core.Choice$WithWeight;
import JvmChoiceWithWeightThen = io.gatling.javaapi.core.WithWeight$Then;

export interface ChoiceWithKey extends Wrapper<JvmChoiceWithKey> {}
const wrapChoiceWithKey = (_underlying: JvmChoiceWithKey): ChoiceWithKey => ({
  _underlying
});

interface ChoiceWithKeyThen {
  then(executable: Executable<any>, ...executables: Executable<any>[]): ChoiceWithKey;
}

const wrapChoiceWithKeyThen = (jvmChoiceWithKeyThen: JvmChoiceWithKeyThen): ChoiceWithKeyThen => ({
  then: (executable: Executable<any>, ...executables: Executable<any>[]): ChoiceWithKey =>
    wrapChoiceWithKey(jvmChoiceWithKeyThen.then(executable._underlying, ...executables.map((e) => e._underlying)))
});

export const onCase = (key: unknown): ChoiceWithKeyThen => wrapChoiceWithKeyThen(JvmCoreDsl.onCase(key));

export interface ChoiceWithWeight extends Wrapper<JvmChoiceWithWeight> {}
const wrapChoiceWithWeight = (_underlying: JvmChoiceWithWeight): ChoiceWithWeight => ({
  _underlying
});

interface ChoiceWithWeightThen {
  then(executable: Executable<any>, ...executables: Executable<any>[]): ChoiceWithWeight;
}

const wrapChoiceWithWeightThen = (jvmChoiceWithWeightThen: JvmChoiceWithWeightThen): ChoiceWithWeightThen => ({
  then: (executable: Executable<any>, ...executables: Executable<any>[]): ChoiceWithWeight =>
    wrapChoiceWithWeight(jvmChoiceWithWeightThen.then(executable._underlying, ...executables.map((e) => e._underlying)))
});

export const percent = (percent: number): ChoiceWithWeightThen => wrapChoiceWithWeightThen(JvmCoreDsl.percent(percent));
