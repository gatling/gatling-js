#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Rebuild js-cli
cd "$root_dir/js-cli"
npm run build
npm pack
rm -rf "$root_dir/tmp/js-cli"
mkdir -p "$root_dir/tmp/js-cli"
tar xzf "$root_dir/js-cli/gatling-js-cli-0.0.0.tgz" -C "$root_dir/tmp/js-cli"
rm "$root_dir/js-cli/gatling-js-cli-0.0.0.tgz"
cd "$root_dir/tmp/js-cli/package"
npm install
