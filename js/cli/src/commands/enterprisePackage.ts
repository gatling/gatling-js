import { Command } from "commander";

import {
  bundleFileOption,
  bundleFileOptionValue,
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  packageFileOption,
  packageFileOptionValue,
  postmanOption,
  postmanOptionValueWithDefaults,
  protoFolderOption,
  protoFolderOptionValue,
  protoTargetFolderOption,
  protoTargetFolderOptionValue,
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
import { resolveBundle } from "../dependencies";

export default (program: Command): void => {
  program
    .command("enterprise-package")
    .description("Build Gatling simulations and package them for Gatling Enterprise")
    .addOption(sourcesFolderOption)
    .addOption(protoFolderOption)
    .addOption(resourcesFolderOption)
    .addOption(bundleFileOption)
    .addOption(protoTargetFolderOption)
    .addOption(packageFileOption)
    .addOption(postmanOption)
    .addOption(typescriptOption)
    .addOption(gatlingHomeOption)
    .action(async (options) => {
      const sourcesFolder: string = sourcesFolderOptionValue(options);
      const protoFolder: string = protoFolderOptionValue(options);
      const resourcesFolder: string = resourcesFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const protoTargetFolder = protoTargetFolderOptionValue(options);
      const packageFile = packageFileOptionValue(options);
      const gatlingHome = gatlingHomeOptionValueWithDefaults(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = postmanOptionValueWithDefaults(options);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);

      const { protocPath } = await resolveBundle({ gatlingHome });

      await bundle({
        sourcesFolder,
        protoFolder,
        bundleFile,
        protoTargetFolder,
        postman,
        typescript,
        simulations,
        protocPath
      });

      await enterprisePackage({ bundleFile, resourcesFolder, protoTargetFolder, packageFile, postman, simulations });
    });
};
