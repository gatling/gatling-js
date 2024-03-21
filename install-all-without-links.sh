#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Publish JVM adapter
"$root_dir/build-jvm.sh"

cd "$root_dir/jvm"
sbt gatling-jvm-to-js-adapter/publishLocal

# Install js
cd "$root_dir/js"
npm install
npm run build --workspaces # Make sure that js builds works

# Install js-simulation
cd "$root_dir/js-simulation"
npm install
npm run build # Make sure that js-simulation build works
