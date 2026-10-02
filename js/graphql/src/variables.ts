import { Session, SessionTo, asJava, isSessionTo, underlyingSessionToJava } from "@gatling.io/core";

interface JvmWithVariables<J> {
  operationName(name: string): J;
  variable(name: string, value: any): J;
  variables(variables: any): J;
  variablesJson(json: string): J;
}

export interface WithVariables<T> {
  /**
   * Select the operation to execute when the document contains multiple operations
   *
   * @param name - the operation name
   * @returns a new instance
   */
  operationName(name: string): T;

  /**
   * Set a variable
   *
   * @param name - the variable name
   * @param value - the variable value, expressed as a Gatling Expression Language String
   * @returns a new instance
   */
  variable(name: string, value: string): T;

  /**
   * Set a variable
   *
   * @param name - the variable name
   * @param value - the variable value, expressed as a function
   * @returns a new instance
   */
  variable(name: string, value: (session: Session) => any): T;

  /**
   * Set a variable
   *
   * @param name - the variable name
   * @param value - the static variable value, such as a number, a boolean, an array or an object
   * @returns a new instance
   */
  variable(name: string, value: any): T;

  /**
   * Set multiple variables
   *
   * @param variables - the variables, expressed as a function
   * @returns a new instance
   */
  variables(variables: (session: Session) => Record<string, any>): T;

  /**
   * Set multiple variables
   *
   * @param variables - the static variables, use a function for dynamic values
   * @returns a new instance
   */
  variables(variables: Record<string, any>): T;

  /**
   * Set all the variables at once as a JSON object. Can't be combined with variable() or variables().
   *
   * @param json - the variables JSON object, expressed as a Gatling Expression Language String
   * @returns a new instance
   */
  variablesJson(json: string): T;
}

export const withVariables = <J, T>(jvm: JvmWithVariables<J>, wrap: (underlying: J) => T): WithVariables<T> => ({
  operationName: (name: string) => wrap(jvm.operationName(name)),
  variable: (name: string, value: any) =>
    wrap(
      isSessionTo(value)
        ? jvm.variable(name, underlyingSessionToJava(value as SessionTo<any>))
        : jvm.variable(name, asJava(value))
    ),
  variables: (variables: Record<string, any> | SessionTo<Record<string, any>>) =>
    wrap(jvm.variables(isSessionTo(variables) ? underlyingSessionToJava(variables) : asJava(variables))),
  variablesJson: (json: string) => wrap(jvm.variablesJson(json))
});
