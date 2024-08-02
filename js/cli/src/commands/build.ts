import { Command } from "commander";

import {
  bundleFileOption,
  bundleFileOptionValue,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults
} from "./options";
import { findSimulations } from "../simulations";
import { bundle } from "../bundle";

export default (program: Command): void => {
  program
    .command("build")
    .description("Build Gatling simulations")
    .addOption(sourcesFolderOption)
    .addOption(bundleFileOption)
    .addOption(typescriptOption)
    .action(async (options) => {
      const sourcesFolder: string = sourcesFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);

      await bundle({ sourcesFolder, bundleFile, typescript, simulations });
    });
};
