# Gatling JS - JDBC module

Gatling JS is a JavaScript/TypeScript interface for the [Gatling load testing tool](https://gatling.io/).

This package contains the Gatling JS DSL for [the JDBC protocol](https://docs.gatling.io/reference/script/jdbc/).

To get started with Gatling JS, see our [introduction to JavaScript scripting](https://docs.gatling.io/tutorials/scripting-intro-js);
or simply have a look at our demo projects:

- https://github.com/gatling/gatling-js-demo
- https://github.com/gatling/gatling-jdbc-demo

## Add the JDBC driver of your database

Gatling doesn't ship any JDBC driver: declare the one of your database in the `gatling` section of your `package.json`,
with its Maven coordinates, and Gatling downloads it when running or packaging your simulations:

```json
{
  "gatling": {
    "jvmDependencies": {
      "artifacts": ["org.postgresql:postgresql:42.7.14"]
    }
  }
}
```

Use `repositories` to download dependencies from other Maven repositories than Maven Central, with their credentials if
needed:

```json
{
  "gatling": {
    "jvmDependencies": {
      "artifacts": ["com.example:my-driver:1.0.0"],
      "repositories": ["https://repo.example.com/maven"],
      "credentials": ["repo.example.com user:password"],
      "credentialFiles": ["/path/to/credentials.properties"]
    }
  }
}
```

`credentials` and `credentialFiles` (relative to `package.json`) are passed to
[Coursier](https://get-coursier.io/docs/other-credentials), which also reads the `COURSIER_CREDENTIALS` environment
variable: prefer it, or credential files, over committing secrets in `package.json`.

If the driver can't be downloaded from a Maven repository, put its JAR file in the `jvm_libs` folder of your project
instead (use `--jvm-libs-folder` to change it). Gatling adds the JAR files of this folder in addition to the
artifacts declared in `package.json`, but a JAR file name present in both is an error.

## Questions, help?

Read the [documentation](https://docs.gatling.io).

Join the [Gatling Community Forum](https://community.gatling.io).

Found a real bug? Raise an [issue](https://github.com/gatling/gatling/issues).
