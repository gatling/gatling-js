// provided by GraalJS, but not declared by the es2023 lib
declare const console: { error(message: string): void };

/**
 * Call a user function that Gatling calls without catching its exceptions: an exception would crash the actor or
 * the JMS listener calling it and lose the reply, so log it and return a fallback instead.
 *
 * Internal, not exported by the package.
 */
export const safely = <T>(description: string, f: () => T, fallback: T): T => {
  try {
    return f();
  } catch (e) {
    console.error(`${description} failed: ${e}`);
    return fallback;
  }
};
