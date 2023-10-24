#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/js-dsl"
yarn install

cd "$root_dir"
./yarn-link-js-dsl.sh

cd "$root_dir/js-simulation"
yarn install
yarn link "gatling-js"
