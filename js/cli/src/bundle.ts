import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

import { logger } from "./log";

export interface BundleOptions {
  entrypointFile: string;
  bundleFile: string;
  typescript: boolean;
}

export const bundle = async (options: BundleOptions): Promise<void> => {
  logger.info(`Packaging a Gatling simulation with options:
 - entrypointFile: ${options.entrypointFile}
 - bundleFile: ${options.bundleFile}`);

  const plugins = options.typescript ? [esbuildPluginTsc({ force: true })] : [];
  await esbuild.build({
    entryPoints: [options.entrypointFile],
    outfile: options.bundleFile,
    bundle: true,
    minify: false,
    sourcemap: true,
    format: "iife",
    globalName: "gatling",
    plugins
  });
};
