import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";
import fs from "fs/promises";

import { logger } from "./log";

export interface BundleOptions {
  sourcesFolder: string;
  bundleFile: string;
  typescript: boolean;
}

export const bundle = async (options: BundleOptions): Promise<void> => {
  logger.info(`Packaging a Gatling simulation with options:
 - sourcesFolder: ${options.sourcesFolder}
 - bundleFile: ${options.bundleFile}`);

  const children = await fs.readdir(options.sourcesFolder, { recursive: false });
  const contents = children
    .filter((f) => (options.typescript ? f.endsWith(".gatling.ts") : f.endsWith(".gatling.js")))
    .map((f) => `export { default as "${f.slice(0, -11)}" } from "./${f}";`)
    .join("\n");

  const plugins = options.typescript ? [esbuildPluginTsc({ force: true })] : [];
  await esbuild.build({
    stdin: {
      contents,
      resolveDir: options.sourcesFolder
    },
    outfile: options.bundleFile,
    bundle: true,
    minify: false,
    sourcemap: true,
    format: "iife",
    globalName: "gatling",
    plugins
  });
};
