#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

cd "$root_dir/jvm"
sbt gatling-java2ts/processJava2tsAnnotations

cp "$root_dir/jvm/java2ts/target/java2ts/j2ts/gatling.d.ts" "$root_dir/js/jvm-types/gatling.d.ts"
cp "$root_dir/jvm/java2ts/target/java2ts/j2ts/gatling-types.ts" "$root_dir/js/jvm-types/index.ts"

cd "$root_dir/js"
npm run format --workspace=jvm-types
npm run build --workspace=jvm-types
