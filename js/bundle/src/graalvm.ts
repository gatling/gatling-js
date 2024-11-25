import { exec } from "node:child_process";
import path from "node:path";
import fs from "node:fs/promises";
import { promisify } from "node:util";

import decompress from "decompress";

import { downloadFile } from "./download";
import { osArch, osType } from "./os";
import { TmpDirStructure } from "./tmpDir";
import { versions } from "./versions";

export const extension = osType === "Windows_NT" ? "zip" : "tar.gz";

export const buildGraalVm = async (tmpDir: TmpDirStructure): Promise<void> => {
  console.log(`Downloading GraalVM from ${url} to ${tmpDir.graalVm.downloadFile}`);
  await downloadFile(url, tmpDir.graalVm.downloadFile);

  console.log(`Unpacking GraalVM to ${tmpDir.graalVm.extractDir}`);
  await decompress(tmpDir.graalVm.downloadFile, tmpDir.graalVm.extractDir, {
    map: (file) => {
      // Remove first level of file name, because it already contains a root directory
      file.path = file.path.split("/").slice(1).join("/");
      return file;
    }
  });

  console.log(`Repackaging GraalVM using jlink to ${tmpDir.graalVm.homeDir}`);
  const graalVmHome =
    osType === "Darwin" ? path.join(tmpDir.graalVm.extractDir, "Contents", "Home") : tmpDir.graalVm.extractDir;
  const jlinkBin = osType === "Windows_NT" ? "jlink.exe" : "jlink";
  const jlinkPath = path.join(graalVmHome, "bin", jlinkBin);
  const modulePath = path.join(graalVmHome, "jmods");
  const moduleFiles = await fs.readdir(modulePath);
  const modules = moduleFiles
    .filter((f) => f.endsWith(".jmod"))
    .map((f) => f.slice(0, -5))
    .join(",");
  const command = `${jlinkPath} --module-path "${modulePath}" --add-modules "${modules}" --output ${tmpDir.graalVm.homeDir}`;
  await execAsync(command);
};

const execAsync = promisify(exec);

const os = {
  Darwin: "macos",
  Linux: "linux",
  Windows_NT: "windows"
}[osType];

const arch = {
  x64: "x64",
  arm64: "aarch64"
}[osArch];

const url = `https://github.com/graalvm/graalvm-ce-builds/releases/download/jdk-${versions.graalvm.jdk}/graalvm-community-jdk-${versions.graalvm.jdk}_${os}-${arch}_bin.${extension}`;
