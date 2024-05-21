import os from "os";

const resolveOsType = () => {
  const t = os.type();
  if (t !== "Darwin" && t !== "Linux" && t !== "Windows_NT") {
    throw Error(`Gatling JS does not support the Operating System '${t}'`);
  }
  return t;
};
export const osType: "Darwin" | "Linux" | "Windows_NT" = resolveOsType();

const resolveOsArch = () => {
  const a = os.arch();
  if (a !== "x64" && a !== "arm64") {
    throw Error(`Gatling JS does not support the architecture '${a}'`);
  }
  if (osType === "Windows_NT" && a === "arm64") {
    // GraalVM distribution not available for Windows on ARM
    // TODO see if we can recommend a solution
    throw Error(`Gatling JS does not support Windows on the ARM architecture`);
  }
  return a;
};
export const osArch: "x64" | "arm64" = resolveOsArch();
