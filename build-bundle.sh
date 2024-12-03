#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Build bundle
cd "$root_dir/js"
npm run generate --workspace=bundle

# Install bundle (manually)
bundle_file="../js/bundle/tmp/gatling-js-bundle-0.0.0-SNAPSHOT-Darwin-arm64.zip"
install_dir="$HOME/.gatling/gatling-js-bundle/0.0.0-SNAPSHOT/"
rm -rf "$install_dir"
"${root_dir}/js/cli/target/index.js" install "$bundle_file"
