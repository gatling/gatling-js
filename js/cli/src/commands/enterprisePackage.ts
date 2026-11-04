import { Command } from "commander";

import {
  bundleFileOption,
  bundleFileOptionValue,
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  jvmLibsFolderOption,
  jvmLibsFolderOptionValue,
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
  typescriptOption
} from "./options";
import { findSimulations } from "../simulations";
import { bundle } from "../bundle";
import { enterprisePackage } from "../enterprise";
import { resolveBundle } from "../dependencies";
import { resolveJvmDependencies } from "../dependencies/jvmDependencies";

export default (program: Command): void => {
  program
    .command("enterprise-package")
    .description("Build Gatling simulations and package them for Gatling Enterprise")
    .addOption(sourcesFolderOption)
    .addOption(protoFolderOption)
    .addOption(resourcesFolderOption)
    .addOption(jvmLibsFolderOption)
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
      const jvmLibsFolder: string = jvmLibsFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const protoTargetFolder = protoTargetFolderOptionValue(options);
      const packageFile = packageFileOptionValue(options);
      const gatlingHome = gatlingHomeOptionValueWithDefaults(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = postmanOptionValueWithDefaults(options);

      const { graalvmHome, jvmClasspath, protocPath, coursierJarPath } = await resolveBundle({ gatlingHome });
      const jvmDependencies = await resolveJvmDependencies({
        graalvmHome,
        jvmClasspath,
        coursierJarPath,
        jvmLibsFolder
      });

      await bundle({
        sourcesFolder,
        protoFolder,
        bundleFile,
        protoTargetFolder,
        postman,
        simulations,
        protocPath
      });

      await enterprisePackage({
        bundleFile,
        resourcesFolder,
        protoTargetFolder,
        packageFile,
        postman,
        simulations,
        jvmDependencies
      });
    });
};
