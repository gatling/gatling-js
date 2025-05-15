import sbt._
import sbt.Keys._

object JsPolyfills {

  val jsPolyfillsTargetDirectory: SettingKey[File] = settingKey[File]("Target directory of @gatling.io/polyfills project")
  val jsPolyfills: SettingKey[Seq[File]] = settingKey[Seq[File]]("Output files from built @gatling.io/polyfills project")

  private def escape(seq: Seq[String]): String =
    seq.map(element => s""""${element.substring(0, element.length - 3)}"""").mkString(", ")

  val settings: Seq[Def.Setting[_]] = Seq(
    jsPolyfillsTargetDirectory := (ThisBuild / baseDirectory).value / ".." / "polyfills" / "target",
    jsPolyfills := (jsPolyfillsTargetDirectory.value ** "*.js").get(),
    Compile / resourceGenerators += Def.task {
      val target = jsPolyfillsTargetDirectory.value
      val destination = (Compile / resourceManaged).value
      val polyfills = (target ** "*.js").get()
        .flatMap(_ pair Path.rebase(target, destination / "@gatling.io" / "polyfills" / "target"))
      IO.copy(polyfills)
      polyfills.map(_._2)
    }.taskValue,
    Compile / sourceGenerators += Def.task {
      // Generate a file directly into the CLI project to add polyfills
      val basePath = (ThisBuild / baseDirectory).value / ".."
      val target = jsPolyfillsTargetDirectory.value
      val polyfills = jsPolyfills.value
        .flatMap(_.relativeTo(target))
        .map(_.getPath)
        .filter(!_.contains("chunk"))
        .sorted
      val content =
        s"""export const polyfills = [
           |  ${escape(polyfills)}
           |];
           |""".stripMargin
      IO.write(basePath / "js" / "cli" / "src" / "bundle" / "polyfills.ts", content)
      // These files aren't actually part of _this_ project's sources, return empty Seq
      Seq()
    }.taskValue,
    Compile / sourceGenerators += Def.task {
      val file = (Compile / sourceManaged).value / "io" / "gatling" / "js" / "JsPolyfills.java"
      val target = jsPolyfillsTargetDirectory.value
      val (chunks, polyfills) = jsPolyfills.value
        .flatMap(_.relativeTo(target))
        .map(_.getPath)
        .partition(_.contains("chunk"))
      val content =
        s"""package io.gatling.js;
           |
           |import java.util.List;
           |import java.util.Map;
           |import java.util.function.Function;
           |import java.util.stream.Collector;
           |import java.util.stream.Collectors;
           |import java.util.stream.Stream;
           |
           |public class JsPolyfills {
           |  private JsPolyfills() {}
           |  private static final String TARGET = "@gatling.io/polyfills/target";
           |  private static final boolean IS_WINDOWS = System.getProperty("os.name").startsWith("Windows");
           |  public static final String REPLACEMENTS;
           |  public static final Map<String, String> RESOLUTION_PATHS;
           |
           |  static {
           |    final List<String> polyfills = List.of(${escape(polyfills)});
           |    final List<String> chunks = List.of(${escape(chunks)});
           |
           |    final String prefix = IS_WINDOWS ? TARGET.replaceAll("/", "\\\\\\\\") : TARGET;
           |    REPLACEMENTS = JsContext.replacements(polyfills, prefix);
           |
           |    final Function<String, String> keyMapper = IS_WINDOWS ? k -> k.replaceAll("/", "\\\\\\\\") : k -> k;
           |    RESOLUTION_PATHS = Stream.concat(polyfills.stream(), chunks.stream())
           |        .map(module -> TARGET + "/" + module + ".js")
           |        .collect(Collectors.toMap(keyMapper, v -> v));
           |  }
           |}
           |""".stripMargin
      IO.write(file, content)
      Seq(file)
    }.taskValue
  )
}
