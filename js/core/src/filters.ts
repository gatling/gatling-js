import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmFilter = io.gatling.javaapi.core.Filter;
import JvmFilterAllowList = io.gatling.javaapi.core.Filter$AllowList;
import JvmFilterDenyList = io.gatling.javaapi.core.Filter$DenyList;

import { Wrapper } from "./common";

export interface Filter<T extends JvmFilter<unknown>> extends Wrapper<T> {
  type: "allow" | "deny";
}

export interface AllowListFilter extends Filter<JvmFilterAllowList> {
  type: "allow";
}

export interface DenyListFilter extends Filter<JvmFilterDenyList> {
  type: "deny";
}

const wrapAllowListFilter = (_underlying: JvmFilterAllowList): AllowListFilter => ({
  _underlying,
  type: "allow"
});

const wrapDenyListFilter = (_underlying: JvmFilterDenyList): DenyListFilter => ({
  _underlying,
  type: "deny"
});

/**
 * Create a new AllowList based on some <a
 * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java regular
 * expression patterns</a>. Typically used to filter HTTP resources.
 *
 * @param patterns some Java regex patterns
 * @return a new AllowList
 */
export const AllowList = (...patterns: string[]): AllowListFilter =>
  wrapAllowListFilter(JvmCoreDsl.AllowList(patterns));

/**
 * Create a new DenyList based on some <a
 * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java regular
 * expression patterns</a> Typically used to filter HTTP resources.
 *
 * @param patterns some Java regex patterns
 * @return a new DenyList
 */
export const DenyList = (...patterns: string[]): DenyListFilter => wrapDenyListFilter(JvmCoreDsl.DenyList(patterns));
