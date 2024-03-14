#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

"$root_dir/build-jvm.sh"

# Install and link js-cli
cd "$root_dir/js-cli"
npm install
"$root_dir/build-js-cli.sh"
cd "$root_dir/tmp/js-cli/package"
npm link

# Install and link js-dsl
cd "$root_dir/js-dsl"
npm install
"$root_dir/build-js-dsl.sh"
cd "$root_dir/tmp/js-dsl/package"
npm link

# Install js-simulation
cd "$root_dir/js-simulation"
npm install
npm link "@gatling/js-cli" "@gatling/js" # Multiple packages MUST be linked all at once (executing npm link again will remove previous links...)
npm run build # Make sure that js-simulation build works
