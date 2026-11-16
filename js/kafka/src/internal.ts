import { Expression, underlyingSessionTo } from "@gatling.io/core";

// A string expression as the Java DSL takes it: the EL String, or the function wrapped for the JVM
export const toJvmStringExpression = (expression: Expression<string>): any =>
  typeof expression === "function" ? underlyingSessionTo(expression) : expression;
