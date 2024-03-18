import scala.collection.Seq

import net.moznion.sbt.SbtSpotless.autoImport.{ spotless, spotlessJava, spotlessKotlin }
import net.moznion.sbt.spotless.config.{ GoogleJavaFormatConfig, JavaConfig, KotlinConfig, SpotlessConfig }

ThisBuild / scalaVersion := "2.13.13"
ThisBuild / crossPaths := false

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
      "io.gatling.highcharts" % "gatling-charts-highcharts" % "3.10.4",
      "org.graalvm.polyglot" % "js-community" % "23.1.2",
    )
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
