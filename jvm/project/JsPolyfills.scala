import sbt._
import sbt.Keys._

object JsPolyfills {

  val jsPolyfillsTargetDirectory: SettingKey[File] = settingKey[File]("Target directory of @gatling.io/polyfills project")
  val jsPolyfills: SettingKey[Seq[File]] = settingKey[Seq[File]]("Output files from built @gatling.io/polyfills project")

  private def escape(seq: Seq[String]): String =
    seq.map(element => s""""${element.substring(0, element.length - 3)}"""").mkString(",")

  val settings: Seq[Def.Setting[_]] = Seq(
    jsPolyfillsTargetDirectory := (ThisBuild / baseDirectory).value / ".." / "polyfills" / "target",
    jsPolyfills := (jsPolyfillsTargetDirectory.value ** "*.js").get(),
    Compile / resourceGenerators += Def.task {
      val target = jsPolyfillsTargetDirectory.value
      val destination = (Compile / resourceManaged).value
      val polyfills = (target ** "*.js").get()
        .flatMap(_ pair Path.rebase(target, destination / "polyfills"))
      IO.copy(polyfills)
      polyfills.map(_._2)
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
           |import java.util.List;
           |import java.util.stream.Stream;
           |public class JsPolyfills {
           |  private JsPolyfills() {}
           |  public static final List<String> CHUNKS =
           |    List.of(${escape(chunks)});
           |  public static final List<String> FILES =
           |    List.of(${escape(polyfills)});
           |  public static final List<String> FILES_AND_CHUNKS =
           |    Stream.concat(FILES.stream(), CHUNKS.stream()).toList();
           |}
           |""".stripMargin
      IO.write(file, content)
      Seq(file)
    }.taskValue
  )
}
