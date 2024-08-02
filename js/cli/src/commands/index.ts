import { Command } from "commander";

import registerInstallCommand from "./install";
import registerBuildCommand from "./build";
import registerRunOnlyCommand from "./runOnly";
import registerRunCommand from "./run";
import registerRecorderCommand from "./recorder";
import registerEnterprisePackageCommand from "./enterprisePackage";
import registerEnterpriseDeployCommand from "./enterpriseDeploy";
import registerEnterpriseStartCommand from "./enterpriseStart";
import { versions } from "../dependencies";

export const program: Command = new Command()
  .name("gatling-js-cli")
  .version(versions.gatling.jsAdapter)
  .description("The Gatling Javascript run & packaging tool");

registerInstallCommand(program);
registerBuildCommand(program);
registerRunOnlyCommand(program);
registerRunCommand(program);
registerRecorderCommand(program);
registerEnterprisePackageCommand(program);
registerEnterpriseDeployCommand(program);
registerEnterpriseStartCommand(program);
