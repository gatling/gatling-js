#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/js-simulation"
"$GRAALNODEJS_HOME/bin/node" --jvm "--vm.cp=$root_dir/jvm-adapter/target/scala-2.13/gatling-jvm-to-js-adapter-assembly-1.0.0-SNAPSHOT.jar" 'target/index.js'
