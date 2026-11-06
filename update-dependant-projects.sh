#!/usr/bin/env bash

set -e

root_dir="$(dirname "$(realpath -- "$0")")"

usage() {
  echo "Opens a pull request on every project depending on gatling-js, updating it to a newly released version." >&2
  echo >&2
  echo "Usage: $(basename -- "$0") <version>" >&2
  echo "  <version>  the newly released version, e.g. 3.15.108" >&2
}

# Check that all required tools are available
for tool in git gh hugo npm jq; do
  if ! command -v "$tool" > /dev/null; then
    echo "Error: '$tool' is required but was not found in PATH." >&2
    exit 1
  fi
done

# Check that we got exactly one argument, holding a valid version
if [[ $# -ne 1 ]]; then
  echo "Error: expected exactly one argument, got $#." >&2
  usage
  exit 1
fi

version="$1"

if ! [[ "$version" =~ ^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$ ]]; then
  echo "Error: '$version' is not a valid version, expected MAJOR.MINOR.PATCH." >&2
  usage
  exit 1
fi

branch_name="update-gatling-js-$version"
commit_message="chore: update gatling-js to $version"

# Work in a temporary directory, removed when the script exits
tmp_dir="$root_dir/tmp/update-dependant-projects"

cleanup() {
  rm -rf -- "$tmp_dir"
}
trap cleanup EXIT INT TERM

rm -rf -- "$tmp_dir"
mkdir -p -- "$tmp_dir"

# Opened pull requests, collected by 'update_project' and reported at the end of the script
pull_requests_file="$tmp_dir/pull-requests"
: > "$pull_requests_file"

# Clone a dependant project, apply the modifications performed by the given function, then open a pull request.
# Usage: update_project <owner/repo> <modify function>
# The modify function is called with the project's directory as its working directory.
update_project() {
  local project="$1"
  local modify="$2"
  local project_dir="$tmp_dir/${project##*/}"
  local default_branch
  local pull_request

  echo "### Updating $project"

  # Shallow clone of the default branch only
  git clone --depth=1 --single-branch "git@github.com:$project.git" "$project_dir"

  (
    cd "$project_dir"

    default_branch="$(git branch --show-current)"

    git switch --create "$branch_name"

    "$modify"

    if [[ -z "$(git status --porcelain)" ]]; then
      echo "Warning: '$modify' left $project unchanged, skipping." >&2
      exit 0
    fi

    git add --all
    git commit --message "$commit_message"
    git push --set-upstream origin "$branch_name"

    pull_request="$(gh pr create \
      --base "$default_branch" \
      --head "$branch_name" \
      --title "$commit_message" \
      --body "Update gatling-js to [$version](https://github.com/gatling/gatling-js/releases/tag/v$version).")"

    echo "$project $pull_request" >> "$pull_requests_file"
    echo "Opened $pull_request"
  )
}

# Update all '@gatling.io/*' dependencies and devDependencies of the package.json in the current directory
update_package_json() {
  jq --arg version "$version" '
      def bump: with_entries(if (.key | startswith("@gatling.io/")) then .value = $version else . end);
      (if has("dependencies") then .dependencies |= bump else . end)
      | (if has("devDependencies") then .devDependencies |= bump else . end)
    ' package.json > package.json.new
  mv package.json.new package.json
}

# Update every npm project found in the current project, then reinstall its dependencies
update_npm_projects() {
  local package_file

  while IFS= read -r package_file; do
    echo "Updating $package_file"
    (
      cd "$(dirname "$package_file")"
      update_package_json
      npm install --min-release-age 0
      npm update
    )
  done < <(find . -name package.json -not -path '*/node_modules/*' | sort)
}

# gatling/frontline-cloud
update_frontline_cloud() {
  local versions_file="back/project/src/main/scala/gatling/sbt/GatlingVersionAxis.scala"
  local major minor patch key

  IFS='.' read -r major minor patch <<< "$version"
  # The maps are keyed by the matching gatling version, e.g. 'gatling315Version' for gatling-js 3.15.x
  key="gatling$major${minor}Version"

  awk -v key="$key" -v js_version="$version" -v postman_version="$version.FL" '
      /^  private val gatlingJsVersions = Map\($/ { map = "js" }
      /^  private val gatlingPostmanVersions = Map\($/ { map = "postman" }
      map != "" && $0 ~ ("^ +" key " ->") {
        sub(/"[^"]*"/, "\"" (map == "js" ? js_version : postman_version) "\"")
        updated[map] = 1
      }
      /^  \)$/ { map = "" }
      { print }
      END {
        if (!updated["js"]) { print "Error: no \"" key "\" entry found in gatlingJsVersions." > "/dev/stderr"; exit 1 }
        if (!updated["postman"]) { print "Error: no \"" key "\" entry found in gatlingPostmanVersions." > "/dev/stderr"; exit 1 }
      }
    ' "$versions_file" > "$versions_file.new"
  mv "$versions_file.new" "$versions_file"

  # Only update the versions, the npm projects exported by the nocode feature are never built here
  (
    cd back/nocode-export-projects/javascript-npm
    update_package_json
  )
}


# gatling/gatling.io-doc
update_gatling_io_doc() {
  local variables_file="data/variables.toml"

  if ! grep --quiet --extended-regexp '^gatlingJsVersion = ".*"$' "$variables_file"; then
    echo "Error: no 'gatlingJsVersion' entry found in $variables_file." >&2
    exit 1
  fi

  sed -E 's|^gatlingJsVersion = ".*"$|gatlingJsVersion = "'"$version"'"|' "$variables_file" > "$variables_file.new"
  mv "$variables_file.new" "$variables_file"

  update_package_json

  hugo mod get -u
  hugo mod npm pack
  npm install --min-release-age 0
}

# Update Gatling Enterprise
update_project "gatling/frontline-cloud" "update_frontline_cloud"

# Update the demo and test projects
# TODO gatling-js-demo also has a top-level '"version"' field in its package.json files, tracking the gatling-js
# version (the other projects use '1.0.0-SNAPSHOT'): need to decide how to handle it.
update_project "gatling/gatling-js-demo" "update_npm_projects"
update_project "gatling/gatling-grpc-demo" "update_npm_projects"
update_project "gatling/gatling-mqtt-demo" "update_npm_projects"
update_project "gatling/gatling-postman-demo" "update_npm_projects"
update_project "gatling/se-ecommerce-demo-gatling-tests" "update_npm_projects"
update_project "gatling/qa-simulations" "update_npm_projects"

# Update the documentation
update_project "gatling/gatling.io-doc" "update_gatling_io_doc"

# Report the opened pull requests, before the temporary directory is removed
echo
if [[ -s "$pull_requests_file" ]]; then
  echo "### Opened pull requests:"
  while read -r project pull_request; do
    echo "  $project: $pull_request"
  done < "$pull_requests_file"
else
  echo "### No pull request opened."
fi
