import { bundle } from "./bundle";
import { resolveJavaLibraries } from "./coursier";
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
********** Java dependencies **********
`);

  console.log("Resolving Java libraries...");
  await resolveJavaLibraries(tmpDir);
  console.log(`Java libraries resolved.`);

  console.log(`
********** Bundle **********
`);

  console.log("Creating bundle file...");
  await bundle(tmpDir);
  console.log(`Bundle file created.`);
};

run();
