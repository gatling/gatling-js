#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

echo "Building polyfills"

cd "$root_dir/polyfills"
npm install
npm run clean
npm run build
