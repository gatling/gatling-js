ThisBuild / organization := "io.gatling"
ThisBuild / version := "3.10.3-SNAPSHOT"
ThisBuild / scalaVersion := "2.13.12"

ThisBuild / crossPaths := false

lazy val root = (project in file("."))
  .aggregate(adapter, java2ts)

lazy val adapter = (project in file("adapter"))
  .withId("gatling-jvm-to-js-adapter")
  .enablePlugins(GatlingPlugin)
  .settings(
    name := "gatling-jvm-to-js-adapter",
    scalacOptions := Seq(
      "-encoding", "UTF-8",
      "-release", "17",
      "-deprecation",
      "-feature",
      "-unchecked",
      "-language:implicitConversions",
      "-language:postfixOps"
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







//assemblyMergeStrategy := {
//  case PathList(ps @ _*) if ps.last == "io.netty.versions.properties" =>
//    MergeStrategy.first
//  case PathList(ps @ _*) if ps.last == "module-info.class" =>
//    MergeStrategy.discard
//  case x =>
//    val oldStrategy = (ThisBuild / assemblyMergeStrategy).value
//    oldStrategy(x)
//}
