#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/js-dsl"
yarn build
yarn pack

rm -rf "$root_dir/tmp/js-dsl"
mkdir -p "$root_dir/tmp/js-dsl"
mv "$root_dir/js-dsl/gatling-js-v1.0.0.tgz" "$root_dir/tmp/js-dsl.tgz"
tar xzf "$root_dir/tmp/js-dsl.tgz" -C "$root_dir/tmp/js-dsl"
cd "$root_dir/tmp/js-dsl/package"
yarn link
