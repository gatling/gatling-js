import os from "node:os";

const _osType = os.type();
if (_osType !== "Darwin" && _osType !== "Linux" && _osType !== "Windows_NT") {
  throw Error(`Gatling JS does not support the Operating System '${_osType}'`);
}

const _osArch = os.arch();
if (_osArch !== "x64" && _osArch !== "arm64") {
  throw Error(`Gatling JS does not support the architecture '${_osArch}'`);
}

if (_osType === "Windows_NT" && _osArch === "arm64") {
  // GraalVM distribution not available for Windows on ARM
  // TODO see if we can recommend a solution
  throw Error(`Gatling JS does not support Windows on the ARM architecture`);
}

export const osType: "Darwin" | "Linux" | "Windows_NT" = _osType;
export const osArch: "x64" | "arm64" = _osArch;
