import scala.collection.Seq

import net.moznion.sbt.spotless.Target
import net.moznion.sbt.spotless.config.{ GoogleJavaFormatConfig, JavaConfig, SpotlessConfig }

ThisBuild / scalaVersion := "2.13.18"
ThisBuild / crossPaths := false

Global / githubPath := "gatling/gatling-js"
Global / gatlingDevelopers := Seq(
  GatlingDeveloper("slandelle@gatling.io", "Stephane Landelle", isGatlingCorp = true),
  GatlingDeveloper("gcorre@gatling.io", "Guillaume Corré", isGatlingCorp = true),
  GatlingDeveloper("ggaly@gatling.io", "Guillaume Galy", isGatlingCorp = true)
)

val compilerRelease = 21
val graalvmJdkVersion = "25.0.1"
val graalvmJsVersion = "25.0.1"
val gatlingVersion = "3.14.9"
val gatlingGrpcVersion = "3.14.9.1"
val gatlingMqttVersion = "3.14.9"
val protocVersion = "4.33.0"

// bit weird cause this is not a dependency of this project
val gatlingEnterprisePluginCommonsVersion = "1.22.5"

lazy val root = (project in file("."))
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
    spotless := SpotlessConfig(
      applyOnCompile = !sys.env.getOrElse("CI", "false").toBoolean
    ),
    spotlessJava := {
      val targetExclude = sourceManaged.value.relativeTo(baseDirectory.value)
        .map(target => Target.IsString(target + "/**/*"))
        .toSeq
      JavaConfig(
        googleJavaFormat = GoogleJavaFormatConfig(),
        importOrder = Seq("java", "javax", "scala", "io.gatling", "", "\\#"),
        targetExclude = targetExclude
      )
    },
    autoScalaLibrary := false,
    libraryDependencies ++= Seq(
      "io.gatling.highcharts" % "gatling-charts-highcharts" % gatlingVersion % "provided",
      "io.gatling" % "gatling-asm-shaded" % "9.9.1",
      "io.gatling" % "gatling-grpc-java" % gatlingGrpcVersion % "provided",
      "io.gatling" % "gatling-mqtt-java" % gatlingMqttVersion % "provided",
      "org.graalvm.polyglot" % "js" % graalvmJsVersion,
      "org.scala-lang" % "scala-library" % scalaVersion.value % "provided",
      "org.scalatest" %% "scalatest" % "3.2.19" % Test
),
    Compile / sourceGenerators += Def.task {
      // Generate a file directly into the CLI project and bundle project to share version numbers
      val basePath = (ThisBuild / baseDirectory).value / ".."
      val jsAdapterVersion = version.value
      val content =
        s"""export const versions = {
           |  graalvm: {
           |    jdk: "$graalvmJdkVersion",
           |    js: "$graalvmJsVersion"
           |  },
           |  java: {
           |    compilerRelease: "$compilerRelease"
           |  },
           |  gatling: {
           |    core: "$gatlingVersion",
           |    enterprisePluginCommons: "$gatlingEnterprisePluginCommonsVersion",
           |    jsAdapter: "$jsAdapterVersion",
           |    grpc: "$gatlingGrpcVersion",
           |    mqtt: "$gatlingMqttVersion"
           |  },
           |  protobuf: {
           |    protoc: "$protocVersion"
           |  }
           |};
           |""".stripMargin
      IO.write(basePath / "js" / "cli" / "src" / "dependencies" / "versions.ts", content)
      IO.write(basePath / "js" / "bundle" / "src"/ "versions.ts", content)
      // These files aren't actually part of _this_ project's sources, return empty Seq
      Seq()
    }.taskValue,
    Compile / packageDoc / mappings := Seq.empty,
    Compile / packageSrc / mappings := Seq.empty
  )

lazy val java2ts = (project in file("java2ts"))
  .withId("gatling-java2ts")
  .settings(
    name := "gatling-java2ts",
    libraryDependencies ++= Seq(
      "io.gatling" % "gatling-core-java" % gatlingVersion,
      "io.gatling" % "gatling-grpc-java" % gatlingGrpcVersion,
      "io.gatling" % "gatling-http-java" % gatlingVersion,
      "io.gatling" % "gatling-mqtt-java" % gatlingMqttVersion
    ),
    publish / skip := true
  )
  .settings(Java2ts.java2tsSettings)
