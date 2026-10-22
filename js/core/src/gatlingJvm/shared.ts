interface SharedComponents {
  get<T>(key: string, factory: () => T): T;
}

const SharedComponents = Java.type<SharedComponents>("io.gatling.js.SharedComponents");

/**
 * Create a component only once, and share it between all the threads executing the simulation.
 *
 * Gatling executes JavaScript callbacks in one JavaScript context per thread, so the simulation code is loaded once
 * per thread. Use this function for components that are expensive to create (e.g. data loaded from a file) or that
 * must be unique (e.g. state shared between virtual users). Shared components must be created in the same order every
 * time the simulation is loaded.
 *
 * @param key - a key identifying the component, used to detect a simulation that doesn't create the same shared
 * components every time it's loaded
 * @param factory - creates the component, must return a Java object or a primitive value (convert JavaScript objects
 * and arrays with asJava)
 * @returns the component created the first time the simulation was loaded
 */
export const shared = <T>(key: string, factory: () => T): T => SharedComponents.get(key, factory);
