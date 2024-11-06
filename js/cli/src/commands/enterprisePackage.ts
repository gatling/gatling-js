import { Command } from "commander";

import {
  bundleFileOption,
  bundleFileOptionValue,
  packageFileOption,
  packageFileOptionValue,
  postmanOption,
  postmanOptionValueWithDefaults,
  resourcesFolderOption,
  resourcesFolderOptionValue,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults
} from "./options";
import { findSimulations } from "../simulations";
import { bundle } from "../bundle";
import { enterprisePackage } from "../enterprise";

export default (program: Command): void => {
  program
    .command("enterprise-package")
    .description("Build Gatling simulations and package them for Gatling Enterprise")
    .addOption(sourcesFolderOption)
    .addOption(resourcesFolderOption)
    .addOption(bundleFileOption)
    .addOption(packageFileOption)
    .addOption(postmanOption)
    .addOption(typescriptOption)
    .action(async (options) => {
      const sourcesFolder: string = sourcesFolderOptionValue(options);
      const resourcesFolder: string = resourcesFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const packageFile = packageFileOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = postmanOptionValueWithDefaults(options);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);

      await bundle({ sourcesFolder, bundleFile, postman, typescript, simulations });

      await enterprisePackage({ bundleFile, resourcesFolder, packageFile, simulations });
    });
};
