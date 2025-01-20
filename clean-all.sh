#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/jvm"
sbt clean

cd "$root_dir/js"
npm run clean --workspaces

cd "$root_dir/js-simulation"
npm run clean

cd "$root_dir/ts-simulation"
npm run clean

cd "$root_dir"
rm -rf tmp
find . -type d -name node_modules -maxdepth 3 -exec rm -rf {} +
