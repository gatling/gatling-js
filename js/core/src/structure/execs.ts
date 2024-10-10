import { Wrapper } from "../common";
import { SessionTransform, underlyingSessionTransform } from "../session";

import { String as JvmString } from "@gatling.io/jvm-types"

import JvmActionBuilder = io.gatling.javaapi.core.ActionBuilder;
import JvmExecs = io.gatling.javaapi.core.exec.Execs;
import JvmExecutable = io.gatling.javaapi.core.exec.Executable;

export interface Executable<T extends JvmExecutable> extends Wrapper<T> {}

export interface ActionBuilder extends Executable<JvmActionBuilder> {}

export const wrapActionBuilder = (_underlying: JvmActionBuilder): ActionBuilder => ({
  _underlying
});

export interface ExecFunction<T extends Execs<T>> {
  /**
   * Attach some `Executable`s. Chains will be attached sequentially.
   *
   * @example
   * ```ts
   * const chain1: ChainBuilder = ???
   * const chain2: ChainBuilder = ???
   * const chain1ThenChain2 = exec(chain1, chain2)
   * ```
   *
   * @param executable - some `ChainBuilder` or `ActionBuilder`
   * @param executables - other `ChainBuilder`s or `ActionBuilder`s
   * @returns a new `StructureBuilder`
   */
  (executable: Executable<any>, ...executables: Array<Executable<any>>): T;

  /**
   * Attach a new action that will execute a function. Important: the function must only perform
   * fast in-memory operations. In particular, it mustn't perform any long block I/O operation, or
   * it will hurt Gatling performance badly.
   *
   * @example
   * ```ts
   * exec(session => session.set("foo", "bar"))
   * ```
   *
   * @param executable - the function
   * @returns a new `StructureBuilder`
   */
  (executable: SessionTransform): T;
}

export interface Execs<T extends Execs<T>> {
  exec: ExecFunction<T>;
  execScript: (script: string) => T;
}

export const execImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(jvmExecs: J1, wrap: (wrapped: J2) => T): ExecFunction<T> =>
  (arg0: Executable<any> | SessionTransform, ...arg1: Array<Executable<any>>) =>
    wrap(
      typeof arg0 === "function"
        ? jvmExecs.exec(underlyingSessionTransform(arg0)) // arg0: SessionTransform
        : jvmExecs.exec(arg0._underlying, ...arg1.map((e) => e._underlying)) // arg0: Executable, ...arg1: Executable[]
    );

// FIXME concurrent hash map
const requireCache: any = {};

const Files = Java.type<any>("java.nio.file.Files");
const Paths = Java.type<any>("java.nio.file.Paths");
const StandardCharsets = Java.type<any>("java.nio.charset.StandardCharsets");

const fs = {
  readFileSync(filename: string): string {
    const bytes: byte[] = Files.readAllBytes(Paths.get(filename))
    return new JvmString(bytes, StandardCharsets.UTF_8);
  }
}

const evalInPostmanContext = (script: string) => {
  const pm = {
    response: {
      json() {
        return JSON.parse(`{"message":"salutations maximales","args":{"randomDate":1728487778769}}`);
      }
    }
  };
  const require = (moduleName: string) => {
    // FIXME cwd?
    const moduleHome = `node_modules/${moduleName}`;
    const moduleConf = JSON.parse(fs.readFileSync(`${moduleHome}/package.json`));

    // FIXME main always present?
    const filename = `${moduleHome}/${moduleConf["main"]}`;

    let source;
    if (requireCache.hasOwnProperty(filename)) {
      source = requireCache[filename];
    } else {
      source = fs.readFileSync(filename);
      requireCache[filename] = source;
    }

    const module = { exports: {} };

    const wrapper = new Function("module", "exports", "require", source);
    wrapper(module, module.exports, require);

    return module.exports;
  }
  eval(script);
};

export const execScriptImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(
    jvmExecs: J1,
    wrap: (wrapped: J2) => T
  ) => (script: string): T =>
    wrap(jvmExecs.execAsync((session, callback) => {
      try {
        evalInPostmanContext(script);
        callback(session, null as any);
      } catch (e) {
        let message;
        if (e instanceof Error) {
          message = e.message;
        } else if (e instanceof String) {
          message = e;
        } else {
          message = (e as any).toString();
        }
        callback(null as any, message as any)
      }
    }));
