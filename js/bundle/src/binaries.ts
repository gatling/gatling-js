import fs from "node:fs/promises";

import { downloadFile } from "./download";
import { osType, osArch } from "./os";
import { TmpDirStructure } from "./tmpDir";
import { versions } from "./versions";

export const resolveNativeBinaries = async (tmpDir: TmpDirStructure): Promise<void> => {
  await downloadProtoc(tmpDir);
};

const downloadProtoc = async (tmpDir: TmpDirStructure) => {
  const version = versions.protobuf.protoc;
  const filename = `protoc-${version}-${osMavenClassifier}.exe`;
  const url = `https://repo1.maven.org/maven2/com/google/protobuf/protoc/${version}/${filename}`;

  console.log(`Downloading protoc binary from ${url} to ${tmpDir.bin.protocFile}`);
  await downloadFile(url, tmpDir.bin.protocFile);
  if (osType !== "Windows_NT") {
    console.log(`chmod ${tmpDir.bin.protocFile}`);
    await fs.chmod(tmpDir.bin.protocFile, 0o744);
  }
};

const osTypeMavenClassifier = (): string => {
  switch (osType) {
    case "Windows_NT":
      return "windows";
    case "Linux":
      return "linux";
    case "Darwin":
      return "osx";
  }
};

const osArchMavenClassifier = (): string => {
  switch (osArch) {
    case "x64":
      return "x86_64";
    case "arm64":
      return "aarch_64";
  }
};

const osMavenClassifier = `${osTypeMavenClassifier()}-${osArchMavenClassifier()}`;
