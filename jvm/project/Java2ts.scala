import sbt.Keys.*
import sbt.*

object Java2ts {
  // https://stackoverflow.com/questions/25623915/sbt-how-to-run-an-annotation-processing-plugin

  lazy val processJava2tsAnnotations = taskKey[Unit]("Process java2ts annotations")

  def java2tsSettings: Seq[Def.Setting[?]] = Seq(
    resolvers += Resolver.mavenLocal,
    libraryDependencies += "io.gatling" % "java2ts-processor" % "1.4.1",
    javacOptions += "-proc:none",
    processJava2tsAnnotations := Def.uncached {
      val log = streams.value.log
      val fc = fileConverter.value

      log.info("Processing annotations ...")

      val sourceDir = (Compile / unmanagedSourceDirectories).value

      val productPaths = (Compile / products).value
      val dependencyPaths = (Compile / dependencyClasspath).value.map(f => fc.toPath(f.data).toFile)
      val classpath = (productPaths ++ dependencyPaths).mkString(":")

      val destinationDirectory = new File((Compile / target).value, "java2ts")
      val filesToProcess = (Compile / unmanagedSources).value.collect {
        case f if f.name == "package-info.java" => f.getAbsolutePath
      }

      val command: Seq[String] = Seq(
        "javac",
        "-J--enable-native-access=ALL-UNNAMED",
        "-J--sun-misc-unsafe-memory-access=allow",
        "-classpath",
        classpath,
        "-proc:only",
        "-processor",
        "org.bsc.processor.TypescriptProcessor",
        "-XprintRounds",
        "-d",
        destinationDirectory.getAbsolutePath,
        "-Acompatibility=graaljs",
        "-Ats.outfile=gatling"
      ) ++ filesToProcess

      failIfNonZeroExitStatus(command, "Failed to process annotations.", log)

      log.info("Done processing annotations.")
    }
  )

  def failIfNonZeroExitStatus(command: Seq[String], message: => String, log: Logger): Unit = {
    import scala.sys.process.*
    val result = command.!
    if (result != 0) {
      log.error(message)
      sys.error("Failed running command: " + command)
    }
  }
}
