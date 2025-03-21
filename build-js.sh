#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

build_pkg() {
  pkg=$1
  target_dir="$root_dir/tmp/$pkg"
  pkg_archive="$root_dir/js/gatling.io-$pkg-0.0.0.tgz"
  linked_pkgs=("${@:2}")

  echo "Building $pkg and linking it at $target_dir"
  mkdir -p "$target_dir"

  cd "$root_dir/js"
  npm run clean "--workspace=$pkg"
  npm run build "--workspace=$pkg"
  npm pack "--workspace=$pkg"
  tar xzf "$pkg_archive" -C "$target_dir"
  rm "$pkg_archive"

  cd "$target_dir/package"
  # Multiple packages MUST be linked all at once (executing 'npm link <pkg>' again will remove previous links...)
  if [[ ${#linked_pkgs[@]} -gt 0 ]]; then
    npm link "${linked_pkgs[@]}"
  else
    npm install
  fi
  npm link
}

rm -rf "$root_dir/tmp"
build_pkg "cli"
build_pkg "jvm-types"
build_pkg "core" "@gatling.io/jvm-types"
build_pkg "http" "@gatling.io/jvm-types" "@gatling.io/core"
