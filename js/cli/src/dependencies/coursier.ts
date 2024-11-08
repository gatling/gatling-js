import { existsSync } from "fs";
import fs from "fs/promises";

import { downloadFile } from "./download";
import { logger } from "../log";
import { versions } from "./versions";
import { promisify } from "util";
import { exec } from "child_process";
import { osType } from "./os";

export const installCoursier = async (gatlingHomeDir: string, downloadDir: string): Promise<string> => {
  const coursierRootPath = `${gatlingHomeDir}/coursier/${versions.coursier}`;
  const coursierPath = `${coursierRootPath}/cs`;

  if (!existsSync(coursierPath)) {
    const jarUrl = `https://github.com/coursier/coursier/releases/download/v${versions.coursier}/coursier`;
    const windowsBatUrl = `https://github.com/coursier/launchers/raw/master/coursier.bat`;
    const downloadPath = `${downloadDir}/cs`;

    if (existsSync(coursierRootPath)) {
      await fs.rm(coursierRootPath, { recursive: true });
    }
    if (existsSync(downloadPath)) {
      await fs.rm(downloadPath);
    }
    await fs.mkdir(coursierRootPath, { recursive: true });

    logger.info(`Downloading Coursier ${versions.coursier} to ${downloadPath}`);
    await downloadFile(jarUrl, downloadPath);
    if (osType === "Windows_NT") {
      await downloadFile(windowsBatUrl, `${downloadPath}.bat`);
    } else {
      await fs.chmod(downloadPath, 0o744);
    }

    logger.info(`Installing Coursier to ${coursierPath}`);
    await fs.rename(downloadPath, coursierPath);
    if (osType === "Windows_NT") {
      await fs.rename(`${downloadPath}.bat`, `${coursierPath}.bat`);
    }
  } else {
    logger.info(`Coursier ${versions.coursier} already installed at ${coursierPath}`);
  }

  return coursierPath;
};

export const resolveGatlingJsDependencies = async (
  coursierPath: string,
  javaHome: string,
  postmanVersion?: string
): Promise<string> => {
  const dependencies = [
    `"io.gatling.highcharts:gatling-charts-highcharts:${versions.gatling.core}"`,
    `"io.gatling:gatling-jvm-to-js-adapter:${versions.gatling.jsAdapter}"`,
    `"io.gatling:gatling-enterprise-plugin-commons:${versions.gatling.enterprisePluginCommons}"`,
    `"org.graalvm.polyglot:js-community:${versions.graalvm.js}"`
  ];
  if (postmanVersion !== undefined) {
    dependencies.push(`"io.gatling:gatling-postman-jvm-to-js-adapter:${postmanVersion}"`);
  }

  return await resolveDependencies(coursierPath, javaHome, ...dependencies);
};

export const resolveRecorderDependencies = async (coursierPath: string, javaHome: string): Promise<string> => {
  const recorderDep = `io.gatling:gatling-recorder:${versions.gatling.core}`;
  return await resolveDependencies(coursierPath, javaHome, recorderDep);
};

const resolveDependencies = async (
  coursierPath: string,
  javaHome: string,
  ...dependencies: string[]
): Promise<string> => {
  const command = `"${coursierPath}" fetch --classpath ${dependencies.join(" ")}`;

  // TODO could add a timeout
  logger.info(`Resolving dependencies with Coursier`);
  const { stdout } = await execAsync(command, { env: { ...process.env, JAVA_HOME: javaHome } });
  return stdout;
};

const execAsync = promisify(exec);
