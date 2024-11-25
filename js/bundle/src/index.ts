import { bundle } from "./bundle";
import { buildGraalVm } from "./graalvm";
import { osType, osArch } from "./os";
import { initTmpDir } from "./tmpDir";
import { versions } from "./versions";

const run = async () => {
  console.log(`
********** Initial setup **********
`);

  console.log(`OS type: ${osType}
OS arch: ${osArch}
Gatling JS version: ${versions.gatling.jsAdapter}
Gatling version: ${versions.gatling.core}
GraalVM version: ${versions.graalvm.jdk}
GraalJS version: ${versions.graalvm.js}`);

  console.log("Initialize tmp directory...");
  const tmpDir = initTmpDir();
  console.log(`Tmp directory initialized.`);

  console.log(`
********** GraalVM **********
`);

  console.log("Building slimmed down GraalVM...");
  await buildGraalVm(tmpDir);
  console.log(`Slimmed down GraalVM built.`);

  console.log(`
********** Bundle **********
`);

  console.log("Creating bundle file...");
  await bundle(tmpDir);
  console.log(`Bundle file created.`);
};

run();
