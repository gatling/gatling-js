scalaVersion := "2.13.18"
crossPaths := false

githubPath := "gatling/gatling-js"
gatlingDevelopers := Seq(
  GatlingDeveloper("slandelle@gatling.io", "Stephane Landelle", isGatlingCorp = true),
  GatlingDeveloper("gcorre@gatling.io", "Guillaume Corré", isGatlingCorp = true),
  GatlingDeveloper("ggaly@gatling.io", "Guillaume Galy", isGatlingCorp = true)
)
val compilerRelease = 21
val graalvmJdkTag = "graal-25.5.5.0.3"
val graalvmJdkVersion = "25i5-25.0.5.0.3"
val graalvmJsVersion = "25.5.5.0.3"
val gatlingVersion = "3.16.1-M6"
val gatlingGraphqlVersion = "3.16.1-M3"
val gatlingJdbcVersion = "3.16.1-M4"
val gatlingGrpcVersion = "3.16.1-M3"
val gatlingKafkaVersion = "3.16.1-M4"
val gatlingMqttVersion = "3.16.1-M6"
val protocVersion = "4.35.1"

// bit weird cause this is not a dependency of this project
val gatlingEnterprisePluginCommonsVersion = "1.27.0"

lazy val root = rootProject
  .enablePlugins(GatlingOssPlugin)
  .aggregate(adapter, java2ts)

// FIXME unused loggers
lazy val adapter = (project in file("adapter"))
  .withId("gatling-jvm-to-js-adapter")
  .enablePlugins(GatlingOssPlugin)
  .settings(JsPolyfills.settings)
  .settings(
    name := "gatling-jvm-to-js-adapter",
    gatlingCompilerRelease := compilerRelease,
    Compile / javacOptions ++= Seq("-encoding", "utf8", "-Xdoclint:none"), // FIXME: see why -Xdoclint:none does not seem to work
    Test / javacOptions ++= Seq("-encoding", "utf8"),
    // JsRuntimeSpec patches Truffle classes, which must not be loaded yet
    Test / fork := true,
    Test / javaOptions += "-Dpolyglot.engine.WarnInterpreterOnly=false",
    javafmtOnCompile := !sys.env.getOrElse("CI", "false").toBoolean,
    autoScalaLibrary := false,
    libraryDependencies ++= Seq(
      "io.gatling"           % "gatling-core-java" % gatlingVersion     % "provided",
      "io.gatling"           % "gatling-grpc-java" % gatlingGrpcVersion % "provided",
      "io.gatling"           % "gatling-http-java" % gatlingVersion     % "provided",
      "org.ow2.asm"          % "asm-tree"          % "9.11.1",
      "org.graalvm.polyglot" % "js"                % graalvmJsVersion,
      "org.scala-lang"       % "scala-library"     % scalaVersion.value % "provided",
      "org.scalatest"       %% "scalatest"         % "3.2.20"           % Test
    ),
    Compile / sourceGenerators += Def.task {
      // Generate a file directly into the CLI project and bundle project to share version numbers
      val basePath = (ThisBuild / baseDirectory).value / ".."
      val jsAdapterVersion = version.value
      val content =
        s"""export const versions = {
           |  graalvm: {
           |    jdkTag: "$graalvmJdkTag",
           |    jdkVersion: "$graalvmJdkVersion",
           |    js: "$graalvmJsVersion"
           |  },
           |  java: {
           |    compilerRelease: "$compilerRelease"
           |  },
           |  gatling: {
           |    core: "$gatlingVersion",
           |    enterprisePluginCommons: "$gatlingEnterprisePluginCommonsVersion",
           |    jsAdapter: "$jsAdapterVersion",
           |    graphql: "$gatlingGraphqlVersion",
           |    jdbc: "$gatlingJdbcVersion",
           |    grpc: "$gatlingGrpcVersion",
           |    kafka: "$gatlingKafkaVersion",
           |    mqtt: "$gatlingMqttVersion"
           |  },
           |  protobuf: {
           |    protoc: "$protocVersion"
           |  }
           |};
           |""".stripMargin
      IO.write(basePath / "js" / "cli" / "src" / "dependencies" / "versions.ts", content)
      IO.write(basePath / "js" / "bundle" / "src" / "versions.ts", content)
      // These files aren't actually part of _this_ project's sources, return empty Seq
      Seq.empty[File]
    }.taskValue,
    // Exception: public artifact, but we only publish privately (public distribution is through the bundle):
    // route to the private repositories, and do not sign as no GPG key is available.
    GatlingPublishPlugin.gatlingPublicArtifact := false,
    GatlingPublishPlugin.unsignedAetherArtifact,
    Compile / packageDoc / mappings := Seq.empty,
    Compile / packageSrc / mappings := Seq.empty
  )

lazy val java2ts = (project in file("java2ts"))
  .withId("gatling-java2ts")
  .enablePlugins(GatlingAutomatedScalafmtPlugin)
  .settings(
    name := "gatling-java2ts",
    libraryDependencies ++= Seq(
      "io.gatling" % "gatling-core-java"    % gatlingVersion,
      "io.gatling" % "gatling-graphql-java" % gatlingGraphqlVersion,
      "io.gatling" % "gatling-grpc-java"    % gatlingGrpcVersion,
      "io.gatling" % "gatling-http-java"    % gatlingVersion,
      "io.gatling" % "gatling-jdbc-java"    % gatlingJdbcVersion,
      "io.gatling" % "gatling-jms-java"     % gatlingVersion,
      "io.gatling" % "gatling-kafka-java"   % gatlingKafkaVersion,
      "io.gatling" % "gatling-mqtt-java"    % gatlingMqttVersion
    ),
    publish / skip := true
  )
  .settings(Java2ts.java2tsSettings)

/**
 * Dummy project used simply so that its dependencies (used by JS projects) are resolved and checked by Scala Steward.
 */
lazy val dummy = (project in file("dummy"))
  .settings(
    publish / skip := true,
    libraryDependencies ++= Seq(
      "io.gatling" % "gatling-enterprise-plugin-commons" % gatlingEnterprisePluginCommonsVersion
    )
  )
