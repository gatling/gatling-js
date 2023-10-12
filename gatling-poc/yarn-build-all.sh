#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

rm -rf "$root_dir/tmp/js-dsl"
mkdir -p "$root_dir/tmp/js-dsl"

cd "$root_dir/js-dsl"
yarn build
yarn pack


mv "$root_dir/js-dsl/gatling-js-v1.0.0.tgz" "$root_dir/tmp/js-dsl.tgz"
tar xzf "$root_dir/tmp/js-dsl.tgz" -C "$root_dir/tmp/js-dsl"

cd "$root_dir/tmp/js-dsl/package"
yarn link

cd "$root_dir/js-simulation"
yarn link "gatling-js"
yarn build
