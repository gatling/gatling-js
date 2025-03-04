import { Command } from "commander";

import { ResolvedOptions } from "./resolveOptions";
import { findSimulations } from "../simulations";
import { bundle } from "../bundle";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("build")
    .description("Build Gatling simulations")
    .addOption(opts.sourcesFolderOption)
    .addOption(opts.bundleFileOption)
    .addOption(opts.postmanOption)
    .addOption(opts.typescriptOption)
    .action(async (options) => {
      const sourcesFolder = opts.sourcesFolderOptionValue(options);
      const bundleFile = opts.bundleFileOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = opts.postmanOptionValueWithDefaults(options);
      const typescript = opts.typescriptOptionValueWithDefaults(options, simulations);

      await bundle({ sourcesFolder, bundleFile, postman, typescript, simulations });
    });
};
