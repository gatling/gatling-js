import { defineConfig } from "tsup";

const polyfills = [
  "assert.js",
  "assert/strict.js",
  "buffer.js",
  "crypto.js",
  "path.js",
  "string_decoder.js",
  "util.js"
];

const entries = Object.fromEntries(
  polyfills
    .filter(n => !n.startsWith("__") && n.endsWith(".js"))
    .map(n => [n.slice(0, -3), "./src/" + n])
);

const imports = {
};

export default defineConfig({
  bundle: true,
  clean: true,
  cjsInterop: true,
  define: {
    "process": JSON.stringify({
      env: {}
    })
  },
  entry: {
    ...entries,
    ...imports,
  },
  format: "cjs",
  platform: "neutral",
  minify: false,
  outDir: "./target",
  outExtension: () => ({
    js: ".js"
  }),
  target: "es2021",
  sourcemap: false,
  splitting: true
});
