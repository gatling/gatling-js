organization := "io.gatling"
name := "gatling-jvm-to-js-adapter"
version := "1.0.0-SNAPSHOT"

scalaVersion := "2.13.12"

scalacOptions := Seq(
  "-encoding", "UTF-8",
  "-release", "17",
  "-deprecation",
  "-feature",
  "-unchecked",
  "-language:implicitConversions",
  "-language:postfixOps"
)

libraryDependencies ++= Seq(
  "io.gatling.highcharts" % "gatling-charts-highcharts" % "3.9.5",
  "org.graalvm.polyglot" % "polyglot" % "23.1.0",
  "org.graalvm.polyglot" % "js-community" % "23.1.0",
)

assemblyMergeStrategy := {
  case PathList(ps @ _*) if ps.last == "io.netty.versions.properties" =>
    MergeStrategy.first
  case PathList(ps @ _*) if ps.last == "module-info.class" =>
    MergeStrategy.discard
  case x =>
    val oldStrategy = (ThisBuild / assemblyMergeStrategy).value
    oldStrategy(x)
}
