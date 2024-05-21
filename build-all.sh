#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

"$root_dir/build-jvm.sh"

"$root_dir/build-js.sh"

# Rebuild js-simulation
cd "$root_dir/js-simulation"
npm run build

# Rebuild ts-simulation
cd "$root_dir/ts-simulation"
npm run build
