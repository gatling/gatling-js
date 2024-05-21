import { existsSync } from "fs";
import fs from "fs/promises";
import decompress from "decompress";

import { downloadFile } from "./download";
import { logger } from "../log";
import { osType, osArch } from "./os";
import { versions } from "./versions";

export const installGraalVm = async (gatlingHomeDir: string, downloadDir: string): Promise<string> => {
  const { os, arch, extension, homePath, binPath } = graalVmPlatformParams();
  const graalvmRootPath = `${gatlingHomeDir}/graalvm/${versions.graalvm.jdk}`;
  const graalvmHomePath = `${graalvmRootPath}${homePath}`;
  const graalvmJavaPath = `${graalvmHomePath}${binPath}`;

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
  if (osType === "Linux") {
    const os = "linux";
    const extension = "tar.gz";
    const homePath = "";
    const binPath = "/bin/java";
    if (osArch === "x64") {
      return { os, arch: "x64", extension, homePath, binPath };
    } else if (osArch === "arm64") {
      return { os, arch: "aarch64", extension, homePath, binPath };
    }
  } else if (osType === "Darwin") {
    const os = "macos";
    const extension = "tar.gz";
    const homePath = "/Contents/Home";
    const binPath = "/bin/java";
    if (osArch === "x64") {
      return { os, arch: "x64", extension, homePath, binPath };
    } else if (osArch === "arm64") {
      return { os, arch: "aarch64", extension, homePath, binPath };
    }
  } else if (osType === "Windows_NT" && osArch === "x64") {
    return { os: "windows", arch: "x64", extension: "zip", homePath: "", binPath: "/bin/java.exe" };
  }

  throw Error(`Operating system type '${osType}' with architecture '${osArch}' is not currently supported.`);
};
