import { Command } from "commander";

import { ResolvedOptions } from "./resolveOptions";
import { findSimulations } from "../simulations";
import { bundle } from "../bundle";
import { enterprisePackage } from "../enterprise";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("enterprise-package")
    .description("Build Gatling simulations and package them for Gatling Enterprise")
    .addOption(opts.sourcesFolderOption)
    .addOption(opts.resourcesFolderOption)
    .addOption(opts.bundleFileOption)
    .addOption(opts.packageFileOption)
    .addOption(opts.postmanOption)
    .addOption(opts.typescriptOption)
    .action(async (options) => {
      const sourcesFolder = opts.sourcesFolderOptionValue(options);
      const resourcesFolder = opts.resourcesFolderOptionValue(options);
      const bundleFile = opts.bundleFileOptionValue(options);
      const packageFile = opts.packageFileOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = opts.postmanOptionValueWithDefaults(options);
      const typescript = opts.typescriptOptionValueWithDefaults(options, simulations);

      await bundle({ sourcesFolder, bundleFile, postman, typescript, simulations });

      await enterprisePackage({ bundleFile, resourcesFolder, packageFile, postman, simulations });
    });
};
