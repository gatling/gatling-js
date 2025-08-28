import scala.collection.Seq

import net.moznion.sbt.spotless.Target
import net.moznion.sbt.spotless.config.{ GoogleJavaFormatConfig, JavaConfig, SpotlessConfig }

ThisBuild / scalaVersion := "2.13.16"
ThisBuild / crossPaths := false

Global / githubPath := "gatling/gatling-js"
Global / gatlingDevelopers := Seq(
  GatlingDeveloper("slandelle@gatling.io", "Stephane Landelle", isGatlingCorp = true),
  GatlingDeveloper("gcorre@gatling.io", "Guillaume Corré", isGatlingCorp = true),
  GatlingDeveloper("ggaly@gatling.io", "Guillaume Galy", isGatlingCorp = true)
)

val compilerRelease = 21
val graalvmJdkVersion = "24.0.2"
val graalvmJsVersion = "25.0.0"
val gatlingVersion = "3.14.4"

val gatlingMqttVersion = "3.14.4"

// bit weird cause this is not a dependency of this project
val gatlingEnterpriseComponentPluginVersion = "1.20.2"

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
      "io.gatling" % "gatling-asm-shaded" % "9.8.0",
      "io.gatling" % "gatling-mqtt-java" % gatlingMqttVersion % "provided",
      "org.graalvm.polyglot" % "js" % graalvmJsVersion,
      "org.scala-lang" % "scala-library" % scalaVersion.value % "provided"
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
           |    enterprisePluginCommons: "$gatlingEnterpriseComponentPluginVersion",
           |    jsAdapter: "$jsAdapterVersion",
           |    mqtt: "$gatlingMqttVersion"
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
      "io.gatling" % "gatling-http-java" % gatlingVersion,
      "io.gatling" % "gatling-mqtt-java" % gatlingMqttVersion
    ),
    publish / skip := true
  )
  .settings(Java2ts.java2tsSettings)
