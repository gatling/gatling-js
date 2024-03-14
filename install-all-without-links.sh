#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Publish JVM adapter
cd "$root_dir/jvm"
sbt gatling-jvm-to-js-adapter/publishLocal

# Install js-cli
cd "$root_dir/js-cli"
npm install
npm run build # Make sure that js-cli build works

# Install and link js-dsl
cd "$root_dir/js-dsl"
npm install
npm run build # Make sure that js-dsl build works

# Install js-simulation
cd "$root_dir/js-simulation"
npm install
npm run build # Make sure that js-simulation build works
