name := "scala-lib"
version := "1.0.0-SNAPSHOT"

scalaVersion := "2.13.11"

scalacOptions := Seq(
  "-encoding", "UTF-8", "-release:8", "-deprecation",
  "-feature", "-unchecked", "-language:implicitConversions", "-language:postfixOps")
