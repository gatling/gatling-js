#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Rebuild js-dsl
cd "$root_dir/js-dsl"
npm run build
npm pack
rm -rf "$root_dir/tmp/js-dsl"
mkdir -p "$root_dir/tmp/js-dsl"
tar xzf "$root_dir/js-dsl/gatling-js-0.0.0.tgz" -C "$root_dir/tmp/js-dsl"
rm "$root_dir/js-dsl/gatling-js-0.0.0.tgz"
cd "$root_dir/tmp/js-dsl/package"
npm install
