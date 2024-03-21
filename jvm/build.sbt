import scala.collection.Seq

import net.moznion.sbt.spotless.config.{ GoogleJavaFormatConfig, JavaConfig, SpotlessConfig }

ThisBuild / scalaVersion := "2.13.13"
ThisBuild / crossPaths := false

val graalvmJdkVersion = "21.0.2"
val graalvmJsVersion = "23.1.2"
val coursierVersion = "2.1.9"
val gatlingVersion = "3.10.4"

lazy val root = (project in file("."))
  .aggregate(adapter, java2ts)

lazy val adapter = (project in file("adapter"))
  .withId("gatling-jvm-to-js-adapter")
  .enablePlugins(
    // GatlingCorpPlugin, but without AutomateHeaderPlugin
    GatlingAutomatedScalafixPlugin,
    GatlingAutomatedScalafmtPlugin,
    GatlingVersioningPlugin,
    GatlingBasicInfoPlugin,
    GatlingCompilerSettingsPlugin,
    GatlingPublishPlugin,
    GatlingReleasePlugin,
    GatlingEnvPlugin,
  )
  .settings(
    name := "gatling-jvm-to-js-adapter",
    gatlingCompilerRelease := 21,
    releasePublishArtifactsAction := Keys.publish.value,
    Compile / javacOptions ++= Seq("-encoding", "utf8", "-Xdoclint:none"), // FIXME: see why -Xdoclint:none does not seem to work
    Test / javacOptions ++= Seq("-encoding", "utf8"),
    spotless := SpotlessConfig(
      applyOnCompile = !sys.env.getOrElse("CI", "false").toBoolean
    ),
    spotlessJava := JavaConfig(
      googleJavaFormat = GoogleJavaFormatConfig()
    ),
    libraryDependencies ++= Seq(
      "io.gatling.highcharts" % "gatling-charts-highcharts" % gatlingVersion,
      "org.graalvm.polyglot" % "js-community" % "23.1.2",
    ),
    Compile / sourceGenerators += Def.task {
      // Bit of a hack, generate a file directly into the CLI project to share version numbers
      val path = (ThisBuild / baseDirectory).value / ".." / "js" / "cli" / "src" / "dependencies" / "versions.ts"
      val jsAdapterVersion = version.value
      val content =
        s"""export const versions = {
           |    graalvm: {
           |        jdk: "$graalvmJdkVersion",
           |        js: "$graalvmJsVersion"
           |    },
           |    coursier: "$coursierVersion",
           |    gatling: {
           |        core: "$gatlingVersion",
           |        jsAdapter: "$jsAdapterVersion"
           |    }
           |};
           |""".stripMargin
      IO.write(path, content)
      // The file isn't actually part of _this_ project's sources, return empty Seq
      Seq()
    }.taskValue
  )

lazy val java2ts = (project in file("java2ts"))
  .withId("gatling-java2ts")
  .settings(
    name := "gatling-java2ts",
    libraryDependencies ++= Seq(
      "io.gatling" % "gatling-core-java" % "3.10.4",
      "io.gatling" % "gatling-http-java" % "3.10.4",
    ),
    publish := false
  )
  .settings(Java2ts.java2tsSettings)
