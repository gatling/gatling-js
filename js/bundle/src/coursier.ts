import { exec } from "node:child_process";
import path from "node:path";
import fs from "node:fs/promises";
import { promisify } from "node:util";

import { downloadFile } from "./download";
import { osType } from "./os";
import { TmpDirStructure } from "./tmpDir";
import { versions } from "./versions";

export const resolveJavaLibraries = async (tmpDir: TmpDirStructure): Promise<void> => {
  const coursierPath = await downloadCoursier(tmpDir);
  console.log(`Coursier path: ${coursierPath}`);

  console.log("Resolving dependencies with Coursier");
  const command = `"${coursierPath}" fetch --classpath ${dependencies.join(" ")}`;
  const { stdout } = await execAsync(command, { env: { ...process.env, JAVA_HOME: tmpDir.graalVm.homeDir } });
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
  console.log(`Downloading Coursier JAR from ${jarUrl} to ${tmpDir.coursier.jarFile}`);
  await downloadFile(jarUrl, tmpDir.coursier.jarFile);
  if (osType === "Windows_NT") {
    console.log(`Downloading Coursier BAT from ${windowsLauncherUrl} to ${tmpDir.coursier.batFile}`);
    await downloadFile(windowsLauncherUrl, tmpDir.coursier.batFile);
    return tmpDir.coursier.batFile;
  } else {
    await fs.chmod(tmpDir.coursier.jarFile, 0o744);
    return tmpDir.coursier.jarFile;
  }
};

const execAsync = promisify(exec);

const jarUrl = "https://github.com/coursier/launchers/raw/master/coursier";
const windowsLauncherUrl = "https://github.com/coursier/launchers/raw/master/coursier.bat";

const dependencies = [
  `"io.gatling.highcharts:gatling-charts-highcharts:${versions.gatling.core}"`,
  `"io.gatling:gatling-enterprise-plugin-commons:${versions.gatling.enterprisePluginCommons}"`,
  `"io.gatling:gatling-jvm-to-js-adapter:${versions.gatling.jsAdapter}"`,
  `"io.gatling:gatling-mqtt-java:${versions.gatling.mqtt}"`,
  // TODO handle Gatling Postman version if different from Gatling JS version
  `"io.gatling:gatling-postman-jvm-to-js-adapter:${versions.gatling.jsAdapter}"`, // For Gatling Postman
  `"io.gatling:gatling-recorder:${versions.gatling.core}"`, // For the recorder
  `"org.graalvm.polyglot:js:${versions.graalvm.js}"`
];
