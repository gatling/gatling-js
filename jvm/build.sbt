import scala.collection.Seq

import net.moznion.sbt.spotless.config.{ GoogleJavaFormatConfig, JavaConfig, SpotlessConfig }

ThisBuild / scalaVersion := "2.13.14"
ThisBuild / crossPaths := false

ThisBuild / sonatypeCredentialHost := "s01.oss.sonatype.org"
Global / githubPath := "gatling/gatling-js"
Global / gatlingDevelopers := Seq(
  GatlingDeveloper("slandelle@gatling.io", "Stephane Landelle", isGatlingCorp = true),
  GatlingDeveloper("gcorre@gatling.io", "Guillaume Corré", isGatlingCorp = true),
  GatlingDeveloper("ggaly@gatling.io", "Guillaume Galy", isGatlingCorp = true)
)

val graalvmJdkVersion = "22.0.1"
val graalvmJsVersion = "24.0.1"
val coursierVersion = "2.1.10"
val gatlingVersion = "3.11.4"

// bit weird cause this is not a dependency of this project
val gatlingEnterpriseComponentPluginVersion = "1.9.4"

lazy val root = (project in file("."))
  .aggregate(adapter, java2ts)

lazy val adapter = (project in file("adapter"))
  .withId("gatling-jvm-to-js-adapter")
  .enablePlugins(GatlingOssPlugin)
  .settings(
    name := "gatling-jvm-to-js-adapter",
    gatlingCompilerRelease := 21,
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
      "org.graalvm.polyglot" % "js-community" % graalvmJsVersion,
      "io.gatling" % "gatling-asm-shaded" % "9.7.0"
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
           |        enterprisePluginCommons: "$gatlingEnterpriseComponentPluginVersion",
           |        jsAdapter: "$jsAdapterVersion"
           |    }
           |};
           |""".stripMargin
      IO.write(path, content)
      // The file isn't actually part of _this_ project's sources, return empty Seq
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
    ),
    publish / skip := true
  )
  .settings(Java2ts.java2tsSettings)
