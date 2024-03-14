#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/js-cli"
npm run format

cd "$root_dir/js-dsl"
npm run format

cd "$root_dir/js-simulation"
npm run format
