import { exec } from "child_process";
import decompress from "decompress";
import { existsSync } from "fs";
import fs from "fs/promises";
import os from "os";
import { promisify } from "util";

import { downloadFile } from "./download";
import { logger } from "../log";

export const execAsync = promisify(exec);
export interface DependenciesOptions {
  gatlingHomeDir: string;
}

export interface ResolvedDependencies {
  graalvmHomePath: string;
  coursierPath: string;
  jvmClasspath: string;
}

export const installAll = async (options: DependenciesOptions): Promise<ResolvedDependencies> => {
  const downloadDir = `${options.gatlingHomeDir}/tmp/download`;
  await fs.mkdir(downloadDir, { recursive: true });

  const graalvmHomePath = await installGraalVm(options.gatlingHomeDir, downloadDir);

  const coursierPath = await installCoursier(options.gatlingHomeDir, downloadDir);

  const classpath = await resolveDependencies(coursierPath, graalvmHomePath);

  return {
    graalvmHomePath,
    coursierPath,
    jvmClasspath: classpath.trim()
  };
};

const versions = {
  graalvm: {
    jdk: "21.0.2",
    js: "23.1.2"
  },
  coursier: "2.1.9",
  gatling: {
    core: "3.10.4",
    jsAdapter: "0.0.0+21-e6d55f80+20240318-1611-SNAPSHOT"
  }
};

const installGraalVm = async (gatlingHomeDir: string, downloadDir: string): Promise<string> => {
  // TODO test Linux and Windows

  const { os, arch, extension, homePath } = graalVmPlatformParams();
  const graalvmRootPath = `${gatlingHomeDir}/graalvm/${versions.graalvm.jdk}`;
  const graalvmHomePath = `${graalvmRootPath}${homePath}`;
  const graalvmJavaPath = `${graalvmHomePath}/bin/java`;

  if (!existsSync(graalvmJavaPath)) {
    const url = `https://github.com/graalvm/graalvm-ce-builds/releases/download/jdk-${versions.graalvm.jdk}/graalvm-community-jdk-${versions.graalvm.jdk}_${os}-${arch}_bin.${extension}`;
    const downloadPath = `${downloadDir}/graalvm.${extension}`;

    if (existsSync(graalvmRootPath)) {
      await fs.rm(graalvmRootPath, { recursive: true });
    }
    if (existsSync(downloadPath)) {
      await fs.rm(downloadPath);
    }
    await fs.mkdir(graalvmRootPath, { recursive: true });

    logger.info(`Downloading GraalVM Community Edition ${versions.graalvm.jdk} to ${downloadPath}`);
    await downloadFile(url, downloadPath);

    logger.info(`Unpacking GraalVM to ${graalvmRootPath}`);
    await decompress(downloadPath, graalvmRootPath, {
      map: (file) => {
        // Remove first level of file name, because it already contains a root directory
        file.path = file.path.split("/").slice(1).join("/");
        return file;
      }
    });

    await fs.rm(downloadPath);
  } else {
    logger.info(`GraalVM Community Edition ${versions.graalvm.jdk} already installed at ${graalvmRootPath}`);
  }

  return graalvmHomePath;
};

const graalVmPlatformParams = () => {
  const osType = os.type(); // 'Darwin', 'Linux', 'Windows_NT'
  const osArch = os.arch(); // 'x64', 'arm64', etc.

  if (osType === "Linux") {
    const os = "linux";
    const extension = "tar.gz";
    const homePath = "";
    if (osArch === "x64") {
      return { os, arch: "x64", extension, homePath };
    } else if (osArch === "arm64") {
      return { os, arch: "aarch64", extension, homePath };
    }
  } else if (osType === "Darwin") {
    const os = "macos";
    const extension = "tar.gz";
    const homePath = "/Contents/Home";
    if (osArch === "x64") {
      return { os, arch: "x64", extension, homePath };
    } else if (osArch === "arm64") {
      return { os, arch: "aarch64", extension, homePath };
    }
  } else if (osType === "Windows_NT" && osArch === "x64") {
    return { os: "windows", arch: "x64", extension: "zip", homePath: "" };
  }

  throw Error(`Operating system type '${osType}' with architecture '${osArch}' is not currently supported.`);
};

const installCoursier = async (gatlingHomeDir: string, downloadDir: string): Promise<string> => {
  const coursierRootPath = `${gatlingHomeDir}/coursier/${versions.coursier}`;
  const coursierPath = `${coursierRootPath}/cs`;

  if (!existsSync(coursierPath)) {
    // TODO test Linux/windows

    const url = `https://github.com/coursier/coursier/releases/download/v${versions.coursier}/coursier`;
    const downloadPath = `${downloadDir}/cs`;

    if (existsSync(coursierRootPath)) {
      await fs.rm(coursierRootPath, { recursive: true });
    }
    if (existsSync(downloadPath)) {
      await fs.rm(downloadPath);
    }
    await fs.mkdir(coursierRootPath, { recursive: true });

    logger.info(`Downloading Coursier ${versions.coursier} to ${downloadPath}`);
    await downloadFile(url, downloadPath);
    await fs.chmod(downloadPath, 0o744);

    logger.info(`Installing Coursier to ${coursierPath}`);
    await fs.rename(downloadPath, coursierPath);
  } else {
    logger.info(`Coursier ${versions.coursier} already installed at ${coursierPath}`);
  }

  return coursierPath;
};

const resolveDependencies = async (coursierPath: string, javaHome: string): Promise<string> => {
  const gatlingDep = `"io.gatling.highcharts:gatling-charts-highcharts:${versions.gatling.core}"`;
  const gatlingAdapterDep = `"io.gatling:gatling-jvm-to-js-adapter:${versions.gatling.jsAdapter}"`;
  const graalvmJsDep = `"org.graalvm.polyglot:js-community:${versions.graalvm.js}"`;

  const command = `"${coursierPath}" fetch --classpath ${gatlingDep} ${gatlingAdapterDep} ${graalvmJsDep}`;

  // TODO could add a timeout
  logger.info(`Resolving dependencies with Coursier`);
  const { stdout } = await execAsync(command, { env: { ...process.env, JAVA_HOME: javaHome } });
  return stdout;
};
