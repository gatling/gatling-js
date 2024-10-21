import type { Plugin } from "esbuild";
import { fileURLToPath, pathToFileURL } from "url";
import { resolve, dirname } from "path";

// This is largely inspired by https://github.com/cyco130/esbuild-plugin-polyfill-node

export const polyfill = (): Plugin => ({
  name: "gatling-js-polyfill",
  setup: async (build) => {
    // modules
    const jspmResolved = await resolveImport(`@jspm/core/nodelibs/fs`);
    build.onResolve({ filter: polyfillsFilter }, async ({ path }) => {
      const [, , moduleName] = path.match(polyfillsFilter)!;
      const resolved = customPolyfills.find((name) => name === moduleName)
        ? resolve(dirname(__filename), `../../polyfills/${moduleName}.js`)
        : resolve(jspmResolved, `../../browser/${moduleName}.js`);
      return { path: resolved };
    });

    // Globals
    build.initialOptions.inject = build.initialOptions.inject || [];
    const injectGlobal = (name: string) =>
      (build.initialOptions.inject as string[]).push(resolve(dirname(__filename), `../../polyfills/${name}.js`));
    injectGlobal("global");
  }
});

const customPolyfills = ["crypto"];

const jspmPolyfills = ["buffer", "path", "string_decoder"];

// Other available jspm-core modules:
// "_stream_duplex"
// "_stream_passthrough"
// "_stream_readable"
// "_stream_transform"
// "_stream_writable"
// "assert"
// "assert/strict"
// "async_hooks"
// "child_process"
// "cluster"
// "console"
// "constants"
// "crypto"
// "dgram"
// "diagnostics_channel"
// "dns"
// "domain"
// "events"
// "fs"
// "fs/promises"
// "http"
// "http2"
// "https"
// "module"
// "net"
// "os"
// "perf_hooks"
// "process"
// "punycode"
// "querystring"
// "readline"
// "repl"
// "stream"
// "sys"
// "timers"
// "timers/promises"
// "tls"
// "tty"
// "url"
// "util"
// "v8"
// "vm"
// "wasi"
// "worker_threads"
// "zlib"

const polyfillsFilter = new RegExp(`^(node:)?(${jspmPolyfills.concat(customPolyfills).join("|")})$`);

let importMetaResolve: (specifier: string, parent: string) => string;

const importMetaUrl = pathToFileURL(__filename).href;

const resolveImport = async (specifier: string) => {
  if (!importMetaResolve) {
    importMetaResolve = (await import("import-meta-resolve")).resolve;
  }
  const resolved = importMetaResolve(specifier, importMetaUrl);
  return fileURLToPath(resolved);
};
