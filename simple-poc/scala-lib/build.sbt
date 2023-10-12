name := "scala-lib"
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
