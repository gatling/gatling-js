#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Publish JVM adapter
cd "$root_dir/jvm"
sbt gatling-jvm-to-js-adapter/publishLocal

if [[ "$1" = "--bundle" ]]; then
  publish_version=0.0.0-SNAPSHOT
  publish_path=$HOME/.ivy2/local/io.gatling/gatling-jvm-to-js-adapter/$publish_version/jars
  bundle_path=$HOME/.gatling/gatling-js-bundle/$publish_version/lib/java

  cp "$publish_path/gatling-jvm-to-js-adapter.jar" \
    "$bundle_path/gatling-jvm-to-js-adapter.jar"
fi
