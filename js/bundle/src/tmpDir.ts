import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { extension as graalVmExtension } from "./graalvm";
import { versions } from "./versions";
import { osArch, osType } from "./os";

export interface TmpDirStructure {
  dir: string;
  bundleFile: string;
  graalVm: {
    dir: string;
    downloadFile: string;
    extractDir: string;
    homeDir: string;
  };
  coursier: {
    dir: string;
    jarFile: string;
    batFile: string;
  };
}

export const initTmpDir = (): TmpDirStructure => {
  const entrypointFilePath = path.parse(process.argv[1]);
  const rootDir = path.parse(entrypointFilePath.dir).dir;

  const tmpDir = path.join(rootDir, "tmp");
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }
  fs.mkdirSync(tmpDir);

  const graalVmDir = path.join(tmpDir, "graalvm");
  fs.mkdirSync(graalVmDir);

  const coursierDir = path.join(tmpDir, "coursier");
  fs.mkdirSync(coursierDir);

  const libDir = path.join(tmpDir, "lib");
  fs.mkdirSync(libDir);
  const libJavaDir = path.join(libDir, "java");
  fs.mkdirSync(libJavaDir);

  const result = {
    dir: tmpDir,
    bundleFile: path.join(tmpDir, `gatling-js-bundle-${versions.gatling.jsAdapter}-${osType}-${osArch}.zip`),
    graalVm: {
      dir: graalVmDir,
      downloadFile: path.join(graalVmDir, `archive.${graalVmExtension}`),
      extractDir: path.join(graalVmDir, "archive"),
      homeDir: path.join(graalVmDir, "home")
    },
    coursier: {
      dir: coursierDir,
      jarFile: path.join(coursierDir, "coursier"),
      batFile: path.join(coursierDir, "coursier.bat")
    }
  };

  console.log("Tmp directory paths:");
  logStructure(result);

  return result;
};

const logStructure = (structure: object, level: number = 0): void => {
  Object.entries(structure).forEach(([key, value]) => {
    if (typeof value === "object") {
      console.log(" ".repeat(level * 2) + `- ${key}:`);
      logStructure(value, level + 1);
    } else {
      console.log(" ".repeat(level * 2) + `- ${key}: ${value}`);
    }
  });
};
