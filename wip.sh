#!/usr/bin/env bash

set -eu

root_dir="$(dirname "$(realpath -- "$0")")"
gatling_version="3.10.3"
graalvm_js_version="23.1.2"

# GraalVM install
graalvm_home_path="$root_dir/tmp/graalvm/Contents/Home" # Depends on platform, seems to be just "$root_dir/tmp/graalvm" on Linux
if [ ! -f "$graalvm_home_path/bin/java" ]; then
  jdk="21"
  os="macos" # linux, macos, windows
  arch="aarch64" # aarch64, x64

  echo "Downloading GraalVM"
  rm -rf "$root_dir/tmp/graalvm"
  mkdir -p "$root_dir/tmp/graalvm"
  curl -L -o "$root_dir/tmp/graalvm.tgz" "https://download.oracle.com/graalvm/$jdk/latest/graalvm-jdk-${jdk}_${os}-${arch}_bin.tar.gz"
  echo "Unpacking GraalVM"
  tar xzf "$root_dir/tmp/graalvm.tgz" --strip-components=1 -C "$root_dir/tmp/graalvm"
else
  echo "GraalVM already downloaded"
fi
"$graalvm_home_path/bin/java" -version
echo
export JAVA_HOME=$graalvm_home_path

# Coursier install
coursier_path="$root_dir/tmp/coursier"
if [ ! -f "$coursier_path" ]; then
  echo "Downloading Coursier"
  curl -L -o "$coursier_path" "https://git.io/coursier-cli"
  chmod +x "$coursier_path"
else
  echo "Coursier already downloaded"
fi
echo "Coursier version: $("$coursier_path" --version)"
echo

# Resolve dependencies
classpath=$(
  "$coursier_path" fetch --classpath \
    "io.gatling.highcharts:gatling-charts-highcharts:$gatling_version" \
    "org.graalvm.polyglot:js-community:$graalvm_js_version"
)
# Local JVM adapter instead of resolved
cd "$root_dir/jvm-adapter"
sbt package
classpath="$root_dir/jvm-adapter/target/scala-2.13/gatling-jvm-to-js-adapter_2.13-1.0.0-SNAPSHOT.jar:$classpath"
# Add bundle directory to classpath
classpath="$root_dir/js-simulation/target:$classpath"
echo "Resolved Java dependencies"
echo

# Build JS simulation
cd "$root_dir/js-simulation"
yarn build
cd "$root_dir"
echo "Bundled JS simulation"
echo

# Run simulation
"$graalvm_home_path/bin/java" \
  -server \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:MaxInlineLevel=20 \
  -XX:MaxTrivialSize=12 \
  -Xmx1G \
  -classpath "$classpath" \
  "-Dgatling.js.bundle.resourcePath=bundle.js" \
  "-Dgatling.js.entryPoint=mySimulation" \
  io.gatling.app.Gatling --simulation io.gatling.js.JsSimulation
