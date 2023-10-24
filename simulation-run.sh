#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

#cd "$root_dir/js-simulation"
#"$GRAALNODEJS_HOME/bin/node" --jvm "--vm.cp=$root_dir/jvm-adapter/target/scala-2.13/gatling-jvm-to-js-adapter-assembly-1.0.0-SNAPSHOT.jar" 'target/index.js'

#"$GRAALVM_HOME/bin/java" -jar "$root_dir/jvm-adapter/target/scala-2.13/gatling-jvm-to-js-adapter-assembly-1.0.0-SNAPSHOT.jar" "$root_dir/js-simulation/target/index.js"

cd "$root_dir/jvm-adapter"
sbt -java-home "$GRAALVM_HOME" \
  "-Dgatling.js.bundlePath=$root_dir/js-simulation/target/bundle.js" \
  "-Dgatling.js.entryPoint=mySimulation" \
  "runMain io.gatling.app.Gatling --simulation io.gatling.js.JsSimulation"
