#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Install and build polyfills
"$root_dir/build-polyfills.sh"

# Publish JVM adapter
"$root_dir/build-jvm.sh"

# Install and link js
cd "$root_dir/js"
npm install
"$root_dir/build-js.sh"

# Install js-simulation
cd "$root_dir/js-simulation"
# Multiple packages MUST be linked all at once (executing 'npm link <pkg>' again will remove previous links...):
npm link "@gatling.io/cli" "@gatling.io/core" "@gatling.io/http"
npm run build # Make sure that js-simulation build works

# Install ts-simulation
cd "$root_dir/ts-simulation"
# Multiple packages MUST be linked all at once (executing 'npm link <pkg>' again will remove previous links...):
npm link "@gatling.io/cli" "@gatling.io/core" "@gatling.io/http"
npm run build # Make sure that ts-simulation build works
