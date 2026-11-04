import { execFile } from "node:child_process";
import path from "node:path";
import fs from "node:fs/promises";
import { promisify } from "node:util";

import { downloadFile } from "./download";
import { osType } from "./os";
import { TmpDirStructure } from "./tmpDir";
import { versions } from "./versions";

export const resolveJavaLibraries = async (tmpDir: TmpDirStructure): Promise<void> => {
  await downloadCoursier(tmpDir);

  console.log("Resolving dependencies with Coursier");
  const javaPath = path.join(tmpDir.graalVm.homeDir, "bin", "java");
  const args = ["-jar", tmpDir.coursier.jarFile, "fetch", "--classpath", ...dependencies];
  console.log(`Running: ${javaPath} ${args.join(" ")}`);
  const { stdout } = await execFileAsync(javaPath, args);
  console.log(`stdout: ${stdout}`);

  console.log(`Copying Java libraries to ${tmpDir.lib.javaDir}`);
  const separator = osType === "Windows_NT" ? ";" : ":";
  const resolvedLibraries = stdout.trim().split(separator);
  for (const sourcePath of resolvedLibraries) {
    const fileName = path.parse(sourcePath).base;
    const targetPath = path.join(tmpDir.lib.javaDir, fileName);
    await fs.cp(sourcePath, targetPath);
  }
};

const downloadCoursier = async (tmpDir: TmpDirStructure) => {
  console.log(`Downloading Coursier JAR-based launcher from ${launcherUrl} to ${tmpDir.coursier.jarFile}`);
  await downloadFile(launcherUrl, tmpDir.coursier.jarFile);
};

const execFileAsync = promisify(execFile);

// The JAR-based launcher, see https://get-coursier.io/docs/cli-installation#jar-based-launcher: a small bootstrap JAR
// that downloads the actual Coursier CLI on its first run
const launcherUrl = "https://github.com/coursier/launchers/raw/master/coursier";

const dependencies = [
  `io.gatling.highcharts:gatling-charts-highcharts:${versions.gatling.core}`,
  `io.gatling:gatling-enterprise-plugin-commons:${versions.gatling.enterprisePluginCommons}`,
  `io.gatling:gatling-jvm-to-js-adapter:${versions.gatling.jsAdapter}`,
  `io.gatling:gatling-graphql-java:${versions.gatling.graphql}`,
  `io.gatling:gatling-jdbc-java:${versions.gatling.jdbc}`,
  `io.gatling:gatling-grpc-java:${versions.gatling.grpc}`,
  `io.gatling:gatling-mqtt-java:${versions.gatling.mqtt}`,
  // TODO handle Gatling Postman version if different from Gatling JS version
  `io.gatling:gatling-postman-jvm-to-js-adapter:${versions.gatling.jsAdapter}`, // For Gatling Postman
  `io.gatling:gatling-recorder:${versions.gatling.core}`, // For the recorder
  `org.graalvm.polyglot:js:${versions.graalvm.js}`
];
