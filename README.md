# gatling-js-poc

## Project layout

- `jvm`: sbt project
  -  `jvm/adapter`: Java code used by gatling-js
  -  `jvm/java2ts`: typescript interfaces generation from Java code (used internally in gatling-js), see [gatling/java2typescript](https://github.com/gatling/java2typescript) for our fork of java2typescript, used here
- `js`: npm project with multiple [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) for the different components of gatling-js
  - `js/cli`: CLI tool used by an end user to build/run/package gatling-js projects
  - `js/jvm-types`: generated typescript interfaces fot Gatling Java (generated from `jvm/java2ts`)
  - `js/core`: Gatling Core module
  - `js/http`: Gatling HTTP module
- `js-simulation`: sample simulation

Also:
- `tmp`: where we copy npm packages to link to them from the sample simulation (see "Run the sample simulation locally" below).
- `~/.gatling`: home directory for the CLI tool, where it downloads GraalVM and Coursier.

Code generated in `jvm/java2ts` needs to be copied to `js/jvm-types` (just use the script `./regen-java2ts.sh` to generate, copy, format, and compile the code).

## Requirements

For local development: JDK 21+, sbt, a recent version of node.
To run a JS simulation using published artifacts: a recent version of node, access to the previews CodeArtifact repository.

## Run the sample simulation locally

This setup uses [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link) to link the sample simulation project to locally built npm dependencies rather than downloading them from an npm registry.

TL;DR:

1. Install everything with `./install-all-with-links.sh`, which:
   - publishes `/jvm/adapter` to your local repo
   - installs and builds the npm workspaces in `js` (note: the npm packages get copied to `tmp`)
   - installs and builds `js-simulation`
2. (When you change code in `jvm/adapter` or `js`, you can just rebuild everything with `./build-all.sh`)
3. Run the sample simulation:
   ```shell
   cd js-simulation
   npm run start
   ```

### How to use npm workspaces in `/js`

Examples:
- format code in all workspaces: `npm run format --workspaces`
- format code only in the core workspace: `npm run format --workspace=core`

## Run the sample simulation using published artifacts

### Set up access to the previews CodeArtifact repository (on AWS Sandbox)

Environment variables used in projects .npmrc:

```shell
export AWS_CODEARTIFACT_DOMAIN="mydomain"
export AWS_CODEARTIFACT_OWNER="000000000000"
export AWS_CODEARTIFACT_REGION="eu-west-3"
export AWS_CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain "$AWS_CODEARTIFACT_DOMAIN" --domain-owner "$AWS_CODEARTIFACT_OWNER" --query authorizationToken --output text)
```

Environment variables used by Coursier (which is used by the gatling-js-cli tool to download Java dependencies):

```shell
export COURSIER_REPOSITORIES="ivy2Local|central|https://$AWS_CODEARTIFACT_DOMAIN-$AWS_CODEARTIFACT_OWNER.d.codeartifact.$AWS_CODEARTIFACT_REGION.amazonaws.com/maven/previews/"
export COURSIER_CREDENTIALS="$AWS_CODEARTIFACT_DOMAIN-$AWS_CODEARTIFACT_OWNER.d.codeartifact.$AWS_CODEARTIFACT_REGION.amazonaws.com aws:$AWS_CODEARTIFACT_AUTH_TOKEN"
```

### Run the sample simulation

Configure the version of the `@gatling.io` dependencies in `/js-simulation` (see latest preview published on AWS Sandbox > CodeArtifact > Repositories > previews). Then:

```shell
npm install
npm run start
```
