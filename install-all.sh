#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Publish JVM adapter
cd "$root_dir/jvm"
sbt gatling-jvm-to-js-adapter/publishLocal

# Install and link js-cli
cd "$root_dir/js-cli"
yarn install
yarn build
yarn pack
rm -rf "$root_dir/tmp/js-cli"
mkdir -p "$root_dir/tmp/js-cli"
tar xzf "$root_dir/js-cli/gatling-js-cli-v1.0.0.tgz" -C "$root_dir/tmp/js-cli"
rm "$root_dir/js-cli/gatling-js-cli-v1.0.0.tgz"
cd "$root_dir/tmp/js-cli/package"
yarn install
yarn link

# Install and link js-dsl
cd "$root_dir/js-dsl"
yarn install
yarn build
yarn pack
rm -rf "$root_dir/tmp/js-dsl"
mkdir -p "$root_dir/tmp/js-dsl"
tar xzf "$root_dir/js-dsl/gatling-js-v1.0.0.tgz" -C "$root_dir/tmp/js-dsl"
rm "$root_dir/js-dsl/gatling-js-v1.0.0.tgz"
cd "$root_dir/tmp/js-dsl/package"
yarn install
yarn link

# Install js-simulation
cd "$root_dir/js-simulation"
yarn install
yarn link "gatling-js-cli"
yarn link "gatling-js"
yarn build # Make sure that js-simulation build works
