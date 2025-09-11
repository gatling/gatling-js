import { Command } from "commander";

import {
  bundleFileOption,
  bundleFileOptionValue,
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  postmanOption,
  postmanOptionValueWithDefaults,
  protoFolderOption,
  protoFolderOptionValue,
  protoTargetFolderOption,
  protoTargetFolderOptionValue,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults
} from "./options";
import { findSimulations } from "../simulations";
import { bundle } from "../bundle";
import { resolveBundle } from "../dependencies";

export default (program: Command): void => {
  program
    .command("build")
    .description("Build Gatling simulations")
    .addOption(sourcesFolderOption)
    .addOption(protoFolderOption)
    .addOption(bundleFileOption)
    .addOption(protoTargetFolderOption)
    .addOption(postmanOption)
    .addOption(typescriptOption)
    .addOption(gatlingHomeOption)
    .action(async (options) => {
      const sourcesFolder = sourcesFolderOptionValue(options);
      const protoFolder = protoFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const protoTargetFolder = protoTargetFolderOptionValue(options);
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
    });
};
