#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

rm -rf "$root_dir/tmp/js-dsl"
mkdir -p "$root_dir/tmp/js-dsl"

./yarn-link-js-dsl.sh

cd "$root_dir/js-simulation"
yarn link "gatling-js"
yarn build
