import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

import { logger } from "./log";

export interface BundleOptions {
  entryPointFile: string;
  bundleFilePath: string;
  typescript: boolean;
}

export const bundle = async (options: BundleOptions): Promise<void> => {
  logger.info(`Packaging a Gatling simulation with options:
 - entryPointFile: ${options.entryPointFile}
 - bundleFilePath: ${options.bundleFilePath}`);

  const plugins = options.typescript ? [esbuildPluginTsc({ force: true })] : [];
  await esbuild.build({
    entryPoints: [options.entryPointFile],
    outfile: options.bundleFilePath,
    bundle: true,
    minify: false,
    sourcemap: true,
    format: "iife",
    globalName: "gatling",
    plugins
  });
};
