# Gatling JS

Gatling JavaScript and Typescript DSL.

## Project layout

- `jvm`: sbt project
  -  `jvm/adapter`: Java code used by gatling-js
  -  `jvm/java2ts`: TypeScript interfaces generation from Java code (used internally in gatling-js), see [gatling/java2typescript](https://github.com/gatling/java2typescript) for our fork of java2typescript, used here
- `js`: npm project with multiple [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) for the different components of gatling-js
  - `js/cli`: CLI tool used by an end user to build/run/package gatling-js projects
  - `js/jvm-types`: generated TypesSript interfaces for Gatling Java (generated from `jvm/java2ts`)
  - `js/core`: Gatling Core module
  - `js/http`: Gatling HTTP module
- `js-simulation`: sample JavaScript simulation
- `ts-simulation`: sample TypeScript simulation

Also:
- `tmp`: where we copy npm packages to link to them from the sample simulation (see "Run the sample simulation locally" below).
- `~/.gatling`: home directory for the CLI tool, where it downloads GraalVM and Coursier.

Code generated in `jvm/java2ts` needs to be copied to `js/jvm-types` (just use the script `./regen-java2ts.sh` to generate, copy, format, and compile the code).

## Requirements

For local development: JDK 21+, sbt, a recent version of node.
To run a JS simulation using published artifacts: a recent version of node.

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

## Run the sample simulation

Configure the version of the `@gatling.io` dependencies in `/js-simulation` or `/ts-simulation`. Then:

```shell
npm install
npm run start
```

## Questions, help?

Read the [documentation](https://docs.gatling.io).

Join the [Gatling Community Forum](https://community.gatling.io).

Found a real bug? Raise an [issue](https://github.com/gatling/gatling/issues).
