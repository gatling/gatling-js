import { existsSync } from "fs";
import fs from "fs/promises";
import decompress from "decompress";

import { downloadFile } from "./download";
import { logger } from "../log";
import { osType, osArch } from "./os";
import { versions } from "./versions";

export const installGraalVm = async (gatlingHomeDir: string, downloadDir: string): Promise<string> => {
  const { os, arch, extension, homePath, binPath } = graalVmPlatformParams();
  const graalvmRootPath = `${gatlingHomeDir}/graalnodejs/${versions.graalvm.js}`;
  const graalvmHomePath = `${graalvmRootPath}${homePath}`;
  const graalvmJavaPath = `${graalvmHomePath}${binPath}`;

  if (!existsSync(graalvmJavaPath)) {
    const url = `https://github.com/oracle/graaljs/releases/download/graal-${versions.graalvm.js}/graalnodejs-community-jvm-${versions.graalvm.js}-${os}-${arch}.${extension}`;
    const downloadPath = `${downloadDir}/graalnodejs.${extension}`;

    if (existsSync(graalvmRootPath)) {
      await fs.rm(graalvmRootPath, { recursive: true });
    }
    if (existsSync(downloadPath)) {
      await fs.rm(downloadPath);
    }
    await fs.mkdir(graalvmRootPath, { recursive: true });

    logger.info(`Downloading GraalNodeJs Community Edition ${versions.graalvm.jdk} to ${downloadPath}`);
    await downloadFile(url, downloadPath);

    logger.info(`Unpacking GraalNodeJs Community Edition to ${graalvmRootPath}`);
    await decompress(downloadPath, graalvmRootPath, {
      map: (file) => {
        // Remove first level of file name, because it already contains a root directory
        file.path = file.path.split("/").slice(1).join("/");
        return file;
      }
    });

    await fs.rm(downloadPath);
  } else {
    logger.info(`GraalNodeJs Community Edition ${versions.graalvm.jdk} already installed at ${graalvmRootPath}`);
  }

  return graalvmHomePath;
};

const graalVmPlatformParams = () => {
  const homePath = "";
  const binPath = "/bin/node";

  let osAndArch: [string, string] | undefined = undefined;
  let extension = "tar.gz";
  if (osType === "Linux" && osArch === "x64") {
    osAndArch = ["linux", "amd64"];
  } else if (osType === "Linux" && osArch === "arm64") {
    osAndArch = ["linux", "aarch64"];
  } else if (osType === "Darwin" && osArch === "x64") {
    osAndArch = ["macos", "amd64"];
  } else if (osType === "Darwin" && osArch === "arm64") {
    osAndArch = ["macos", "aarch64"];
  } else if (osType === "Windows_NT" && osArch === "x64") {
    osAndArch = ["windows", "amd64"];
    extension = "zip";
  }
  if (osAndArch === undefined) {
    throw Error(`Operating system type '${osType}' with architecture '${osArch}' is not currently supported.`);
  }

  return { os: osAndArch[0], arch: osAndArch[1], extension, homePath, binPath };
};
