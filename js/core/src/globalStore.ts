import { shared } from "./gatlingJvm/shared";

// Ignores writes performed while loading the simulation in the context of another thread
const JsGlobalStore = Java.type<JsGlobalStoreStatic>("io.gatling.js.JsGlobalStore");

interface JsGlobalStoreStatic {
  new <K, V>(): ConcurrentHashMap<K, V>;
}

interface ConcurrentHashMap<K, V> {
  put(key: K, value: V): V | null;
  remove(key: K): V | null;
  get(key: K): V | null;
  getOrDefault(key: K, defaultValue: V): V;
  containsKey(key: K): boolean;
  clear(): void;
}

const javaStore = shared("globalStore", () => new JsGlobalStore<string, any>());

interface GlobalStores {
  update<T>(
    store: ConcurrentHashMap<string, any>,
    key: string,
    updateFunction: (oldValue?: T) => T | undefined
  ): T | null;
}

// The update function is passed as is to Java, which calls it with no argument when there's no mapping (so it
// receives undefined), and removes the mapping when it returns undefined: no JavaScript function and no Java proxy
// are created on each call
const GlobalStores = Java.type<GlobalStores>("io.gatling.js.callbacks.GlobalStores");

export interface GlobalStore {
  /**
   * Maps the specified key to the specified value in the global store. Neither the key nor the value can be null or
   * undefined.
   *
   * @param key - key with which the specified value is to be associated
   * @param value - value to be associated with the specified key
   * @returns the previous value associated with key, or `null` if there was no mapping for key
   */
  put<T>(key: string, value: T): T | undefined;

  /**
   * Attempts to compute a new value for the specified key and its currently mapped value (or `null` if there is no
   * current value). The entire method invocation is performed atomically. The supplied function is invoked exactly once
   * per invocation of this method.  Some attempted update operations on this map by other threads may be blocked while
   * computation is in progress, so the computation should be short and simple.
   *
   * The updateFunction function must not modify the global store during computation.
   *
   * @param key - key with which the specified value is to be associated
   * @param updateFunction - the function to compute a new value to update the mapping; if it returns `null`, the
   * mapping will be removed
   * @returns the new value associated with the specified key, or `null` if none
   */
  update<T>(key: string, updateFunction: (oldValue: T | undefined) => T | undefined): T | undefined;

  /**
   * Returns the value to which the specified key is mapped, or `null` if the global store contains no mapping for the
   * key.
   *
   * @param key - the key whose associated value is to be returned
   * @returns the mapping for the key, if present; else `null`
   */
  get<T>(key: string): T | undefined;

  /**
   * Returns the value to which the specified key is mapped, or the given default value if the global store contains no
   * mapping for the key.
   *
   * @param key - the key whose associated value is to be returned
   * @param defaultValue - the value to return if the global store contains no mapping for the given key
   * @returns the mapping for the key, if present; else the default value
   */
  getOrDefault<T>(key: string, defaultValue: T): T;

  /**
   * Tests if the key is present in the global store.
   *
   * @param key - possible key
   * @returns `true` if and only if the key  is present in the global store; `false` otherwise
   */
  containsKey(key: string): boolean;

  /**
   * Removes the mapping for a key from the global store if it is present.
   *
   * @param key - key whose mapping is to be removed from the map
   * @returns the previous value associated with `key`, or `null` if there was no mapping for `key`.
   */
  remove<T>(key: string): T;

  /**
   * Removes all of the mappings from the global store.
   */
  clear(): void;
}

/**
 * A global store which can be used to share data between different virtual users.
 */
export const GlobalStore: GlobalStore = {
  put: (key, value) => nullToUndefined(javaStore.put(key, value)),
  update: (key, updateFunction) => nullToUndefined(GlobalStores.update(javaStore, key, updateFunction)),
  get: (key) => nullToUndefined(javaStore.get(key)),
  getOrDefault: (key, defaultValue) => javaStore.getOrDefault(key, defaultValue),
  containsKey: (key) => javaStore.containsKey(key),
  remove: (key) => nullToUndefined(javaStore.remove(key)),
  clear: () => javaStore.clear()
};

const nullToUndefined = <T>(x: T | null): T | undefined => (x === null ? undefined : x);
