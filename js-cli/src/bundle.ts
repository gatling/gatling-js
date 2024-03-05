import { logger } from "./log";
import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

export interface BundleOptions {
  entryPoint: string;
  outfile: string;
  typescript: boolean;
}

export const bundle = async (options: BundleOptions): Promise<void> => {
  logger.info(`Packaging a Gatling simulation with options:
 - entryPoint: ${options.entryPoint}
 - outfile: ${options.outfile}`);

  const plugins = options.typescript ? [esbuildPluginTsc({ force: true })] : [];
  await esbuild.build({
    entryPoints: [options.entryPoint],
    outfile: options.outfile,
    bundle: true,
    minify: false,
    sourcemap: true,
    format: "iife",
    globalName: "gatling",
    plugins
  });
};
