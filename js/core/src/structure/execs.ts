import { String as JvmString } from "@gatling.io/jvm-types";

import { Wrapper } from "../common";
import { SessionTransform, underlyingSessionTransform } from "../session";

import JvmActionBuilder = io.gatling.javaapi.core.ActionBuilder;
import JvmExecs = io.gatling.javaapi.core.exec.Execs;
import JvmExecutable = io.gatling.javaapi.core.exec.Executable;
import { getEnvironmentVariable } from "../parameters";

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

const File = Java.type<any>("java.io.File");
const Files = Java.type<any>("java.nio.file.Files");
const Paths = Java.type<any>("java.nio.file.Paths");
const StandardCharsets = Java.type<any>("java.nio.charset.StandardCharsets");

const path = {
  dirname(path: string): string {
    return Paths.get(path).getParent().toString();
  },
  normalize(path: string): string {
    return Paths.get(path).normalize().toString();
  }
};

const fs = {
  readFileSync(filename: string): string {
    const bytes: byte[] = Files.readAllBytes(Paths.get(filename));
    return new JvmString(bytes, StandardCharsets.UTF_8);
  }
};

// FIXME concurrent hash map?
// require.cache?
const moduleExportsCache: { [filename: string]: unknown } = {};

const indent = (n: number) => {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += "  ";
  }
  return str;
};

// FIXME all of these above are available in the script scope?
const evalInPostmanContext = (script: string) => {
  const pm = {
    response: {
      json() {
        return JSON.parse(`{"message":"salutations maximales","args":{"randomDate":1728487778769}}`);
      }
    }
  };

  //const __filenames: string[] = [];
  const __dirnames: string[] = [];

  const __isDebugEnabled = getEnvironmentVariable("DEBUG") === "true";
  const __debug = __isDebugEnabled
    ? (str: string) => {
        console.log(indent(__dirnames.length), str);
      }
    : (_: string) => {};

  // https://github.com/oracle/graaljs/blob/master/graal-nodejs/doc/api/modules.md#all-together
  const __require = (moduleName: string) => {
    if ((globalThis as any)[moduleName] !== undefined) {
      return (globalThis as any)[moduleName];
    }

    if (typeof __dirname !== "undefined" && __dirname !== null) {
      __debug(`surprise dirname: ${__dirname}`);
      throw Error(`require: nope ${__dirname}`);
    }

    if (__dirnames.length > 0) {
      const dirname = __dirnames[__dirnames.length - 1];
      __debug(
        `require: trying to load module or file ${moduleName} from ${dirname} (filenames: ${__dirnames.join(", ")})`
      );
    } else {
      __debug(`require: trying to load module or file ${moduleName} from exec script`);
    }

    let filename: string;
    if (moduleName.startsWith(".")) {
      if (__dirnames.length === 0) {
        //throw Error(`require: requiring local file \`${moduleName}\` outside a node module is not allowed`);
        filename = `src/${moduleName}`;
      } else {
        const dirname = __dirnames[__dirnames.length - 1];
        filename = `${dirname}/${moduleName}`;
      }
      const file = new File(filename);
      if (file.isDirectory()) {
        filename = filename + "/index.js";
      } else if (!filename.endsWith(".js") && !filename.endsWith(".json")) {
        // FIXME file exists instead?
        filename = filename + ".js";
      }
      //throw Error(`require: embedded require in module ${currentDepthModule} for module ${moduleName}`);
    } else {
      const moduleHome = `node_modules/${moduleName}`;
      // FIXME try catch
      const moduleConf = JSON.parse(fs.readFileSync(`${moduleHome}/package.json`));

      // FIXME main always present? => index.js
      if (moduleConf.hasOwnProperty("main")) {
        filename = `${moduleHome}/${moduleConf["main"]}`;
      } else {
        filename = `${moduleHome}/index.js`;
      }
    }

    filename = path.normalize(filename);
    __debug(`filename ${typeof filename} ${filename}`);
    let dirname = path.dirname(filename);
    __debug(`dirname ${typeof dirname} ${dirname}`);

    if (moduleExportsCache.hasOwnProperty(filename)) {
      __debug("require: cache hit");
      return moduleExportsCache[filename];
    }
    __debug("require: cache miss");

    __dirnames.push(dirname);

    const source = fs.readFileSync(filename);

    let result: any;
    if (filename.endsWith(".js")) {
      const wrapper = new Function("exports", "require", "module", "__filename", "__dirname", source);

      const module = { exports: {} };
      __debug(`require: module eval start ${moduleName}`);
      wrapper(module.exports, __require, module, filename, dirname, source);
      __debug(`require: module eval end ${moduleName}`);

      result = module.exports;
    } else {
      if (filename.endsWith(".json")) {
        result = JSON.parse(source);
      } else {
        result = source;
      }
    }

    moduleExportsCache[filename] = result;
    __dirnames.pop();

    return result;
  };
  eval(script);
};

export const execScriptImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(jvmExecs: J1, wrap: (wrapped: J2) => T) =>
  (script: string): T =>
    wrap(
      jvmExecs.execAsync((session, callback) => {
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
          callback(null as any, message as any);
        }
      })
    );
