import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

import { SimulationFile } from "./simulations";
import { logger } from "./log";

export interface BundleOptions {
  sourcesFolder: string;
  bundleFile: string;
  typescript: boolean;
  simulations: SimulationFile[];
}

export const bundle = async (options: BundleOptions): Promise<void> => {
  logger.info(`Bundling a Gatling simulation with options:
 - sourcesFolder: ${options.sourcesFolder}
 - bundleFile: ${options.bundleFile}
 - typescript: ${options.typescript}`);

  const contents = `
${options.simulations.map((s, i) => `import simulation_${i} from "./${s.path}";`).join("\n")}

export const gatling = {
  ${options.simulations.map((s, i) => `"${s.name}": simulation_${i}`).join(",\n")}
};
`;

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
    platform: "node",
    format: "cjs",
    plugins
  });
};
