import fs from "fs/promises";

import { installCoursier, resolveGatlingJsDependencies, resolveRecorderDependencies } from "./coursier";
import { installGraalVm } from "./graalVm";

export interface DependenciesOptions {
  gatlingHome: string;
}

export interface ResolvedDependencies {
  graalvmHome: string;
  coursierBinary: string;
  jvmClasspath: string;
}

export const installGatlingJs = async (options: DependenciesOptions): Promise<ResolvedDependencies> => {
  const downloadDir = `${options.gatlingHome}/tmp/download`;
  await fs.mkdir(downloadDir, { recursive: true });

  const graalvmHomePath = await installGraalVm(options.gatlingHome, downloadDir);
  const coursierPath = await installCoursier(options.gatlingHome, downloadDir);
  const classpath = await resolveGatlingJsDependencies(coursierPath, graalvmHomePath);
  return {
    graalvmHome: graalvmHomePath,
    coursierBinary: coursierPath,
    jvmClasspath: classpath.trim()
  };
};

export const installRecorder = async (options: DependenciesOptions): Promise<ResolvedDependencies> => {
  const downloadDir = `${options.gatlingHome}/tmp/download`;
  await fs.mkdir(downloadDir, { recursive: true });

  const graalvmHomePath = await installGraalVm(options.gatlingHome, downloadDir);
  const coursierPath = await installCoursier(options.gatlingHome, downloadDir);
  const classpath = await resolveRecorderDependencies(coursierPath, graalvmHomePath);
  return {
    graalvmHome: graalvmHomePath,
    coursierBinary: coursierPath,
    jvmClasspath: classpath.trim()
  };
};
