import {
  CheckBuilderJsonOfTypeFind,
  CheckBuilderJsonOfTypeMultipleFind,
  Wrapper,
  wrapCheckBuilderJsonOfTypeFind,
  wrapCheckBuilderJsonOfTypeMultipleFind
} from "@gatling.io/core";

import JvmGraphQlJsonScope = io.gatling.javaapi.graphql.GraphQlJsonScope;

/**
 * A part of a GraphQL response payload (data, errors or extensions) that checks can be applied on
 */
export interface GraphQlJsonScope extends Wrapper<JvmGraphQlJsonScope> {
  /**
   * Bootstrap a check that capture some JsonPath expression result in this part of the payload
   *
   * @param path - the JsonPath expression, relative to this part of the payload
   * @returns the next step in the check DSL
   */
  jsonPath(path: string): CheckBuilderJsonOfTypeMultipleFind;

  /**
   * Bootstrap a check that capture some JMESPath expression result in this part of the payload
   *
   * @param path - the JMESPath expression, relative to this part of the payload
   * @returns the next step in the check DSL
   */
  jmesPath(path: string): CheckBuilderJsonOfTypeFind;
}

export const wrapGraphQlJsonScope = (_underlying: JvmGraphQlJsonScope): GraphQlJsonScope => ({
  _underlying,
  jsonPath: (path: string) => wrapCheckBuilderJsonOfTypeMultipleFind(_underlying.jsonPath(path)),
  jmesPath: (path: string) => wrapCheckBuilderJsonOfTypeFind(_underlying.jmesPath(path))
});
