#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

# Publish JVM adapter
cd "$root_dir/jvm"
sbt gatling-js-agent/publishLocal gatling-jvm-to-js-adapter/publishLocal
