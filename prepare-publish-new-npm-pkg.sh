#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

usage() {
  cat <<EOF
Usage: $(basename "$0") <pkg>... [--otp=<code>] [--dry-run]

Prepares new @gatling.io npm packages so that the release workflow can publish them. For each package:
  - publishes a 0.0.0-placeholder version, as trusted publishing can only be configured for existing
    packages (skipped if the package already exists on npm)
  - configures trusted publishing from the release workflow (.github/workflows/release.yml)
  - requires two-factor authentication and disallows tokens bypassing it for publishing

Arguments:
  <pkg>          Package name without the @gatling.io/ scope, must match a directory in js/
  --otp=<code>   One-time password from your authenticator, used for all npm operations
                 (if omitted, npm asks to authenticate in the browser for each operation)
  --dry-run      Show what would be done without changing anything on npm
  --help         Show this help

Example:
  $(basename "$0") jdbc kafka --otp=123456
    prepares @gatling.io/jdbc and @gatling.io/kafka
EOF
}

pkgs=()
dry_run=false
npm_opts=()
for arg in "$@"; do
  case "$arg" in
    --otp=*)
      npm_opts+=("$arg")
      ;;
    --dry-run)
      dry_run=true
      npm_opts+=("$arg")
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    -*)
      usage >&2
      exit 1
      ;;
    *)
      pkgs+=("$arg")
      ;;
  esac
done
if [[ ${#pkgs[@]} -eq 0 ]]; then
  usage >&2
  exit 1
fi

# Validate all packages before changing anything on npm
for pkg in "${pkgs[@]}"; do
  if [[ ! -f "$root_dir/js/$pkg/package.json" ]]; then
    echo "No package found at js/$pkg" >&2
    exit 1
  fi
done

version="0.0.0-placeholder"
work_dir=$(mktemp -d)
trap 'rm -rf "$work_dir"' EXIT

prepare_pkg() {
  pkg=$1
  name="@gatling.io/$pkg"

  status=$(curl \
    --location \
    --silent \
    --output /dev/null \
    --write-out "%{http_code}" \
    "https://registry.npmjs.org/@gatling.io%2F$pkg")
  if [[ "$status" = "200" ]]; then
    echo "=== $name already exists on npm, skipping placeholder publication"
  elif [[ "$status" = "404" ]]; then
    echo "=== Publishing $name@$version"
    placeholder_dir="$work_dir/$pkg"
    mkdir "$placeholder_dir"
    cat > "$placeholder_dir/package.json" <<EOF
{
  "name": "$name",
  "version": "$version",
  "description": "Placeholder, do not use. Real versions are published by the Gatling JS release workflow.",
  "license": "Apache-2.0",
  "homepage": "https://gatling.io",
  "repository": "github:gatling/gatling-js",
  "bugs": "https://github.com/gatling/gatling/issues"
}
EOF
    cat > "$placeholder_dir/README.md" <<EOF
# $name

Placeholder version, do not use. See https://docs.gatling.io/tutorials/scripting-intro-js/
EOF
    (cd "$placeholder_dir" && npm publish --access public --tag placeholder "${npm_opts[@]}")
  else
    echo "Failed to check $name on npm (HTTP status $status)" >&2
    exit 1
  fi

  echo "=== Configuring trusted publishing for $name"
  npm trust github "$name" \
    --repository gatling/gatling-js \
    --file release.yml \
    --environment npm \
    --allow-publish \
    --yes \
    "${npm_opts[@]}"

  echo "=== Requiring two-factor authentication and disallowing tokens for $name"
  # npm access does not support --dry-run
  if [[ "$dry_run" = "false" ]]; then
    npm access set mfa=publish "$name" "${npm_opts[@]}"
  fi
}

for pkg in "${pkgs[@]}"; do
  prepare_pkg "$pkg"
done
