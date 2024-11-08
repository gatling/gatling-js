import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

import { polyfill } from "./polyfill";
import { SimulationFile } from "../simulations";
import { logger } from "../log";

export interface BundleOptions {
  sourcesFolder: string;
  bundleFile: string;
  postman?: string;
  typescript: boolean;
  simulations: SimulationFile[];
}

export const bundle = async (options: BundleOptions): Promise<void> => {
  logger.info(`Bundling a Gatling simulation with options:
 - sourcesFolder: ${options.sourcesFolder}
 - bundleFile: ${options.bundleFile}
 - typescript: ${options.typescript}`);

  const contents = options.simulations.map((s) => `export { default as "${s.name}" } from "./${s.path}";`).join("\n");

  const plugins = options.typescript ? [esbuildPluginTsc({ force: true })] : [];
  if (options.postman !== undefined) {
    plugins.push(polyfill());
  }
  await esbuild.build({
    stdin: {
      contents,
      resolveDir: options.sourcesFolder
    },
    outfile: options.bundleFile,
    platform: "neutral",
    mainFields: ["main", "module"],
    bundle: true,
    minify: false,
    sourcemap: true,
    format: "iife",
    globalName: "gatling",
    plugins
  });
};
