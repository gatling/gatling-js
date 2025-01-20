import { readdirSync } from "fs";
import { relative, resolve } from "path";
import { defineConfig } from "tsup";

function getPolyfills(root: string): string[] {
  const dirents = readdirSync(root, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const result = resolve(root, dirent.name);
    return dirent.isDirectory() ? getPolyfills(result) : result;
  });
  return Array.prototype.concat(...files);
}

const root = "src";
const polyfills = getPolyfills(root);
const entry = Object.fromEntries(
  polyfills
    .map((polyfill) => relative(root, polyfill))
    .map((polyfill) => [polyfill.slice(0, -3), `./${root}/${polyfill}`])
);

export default defineConfig({
  bundle: true,
  clean: true,
  cjsInterop: true,
  define: {
    process: JSON.stringify({
      env: {}
    })
  },
  entry,
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
