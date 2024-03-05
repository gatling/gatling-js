#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/js-cli"
yarn build
yarn pack

rm -rf "$root_dir/tmp/js-cli"
mkdir -p "$root_dir/tmp/js-cli"
mv "$root_dir/js-cli/gatling-js-cli-v1.0.0.tgz" "$root_dir/tmp/js-cli.tgz"
tar xzf "$root_dir/tmp/js-cli.tgz" -C "$root_dir/tmp/js-cli"
cd "$root_dir/tmp/js-cli/package"
yarn link
