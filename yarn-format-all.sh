#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/js-cli"
yarn format

cd "$root_dir/js-dsl"
yarn format

cd "$root_dir/js-simulation"
yarn format
