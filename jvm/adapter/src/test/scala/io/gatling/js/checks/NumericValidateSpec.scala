/*
 * Copyright 2011-2026 GatlingCorp (https://gatling.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.gatling.js.checks

import java.{ lang => jl, util => ju }
import java.lang.reflect.{ InvocationHandler, Method, Proxy }

import scala.util.Using

import io.gatling.commons.validation.{ Failure, Success, Validation }
import io.gatling.core.Predef
import io.gatling.core.config.GatlingConfiguration
import io.gatling.core.session.Expression
import io.gatling.javaapi.core.{ CheckBuilder, CoreDsl }
import io.gatling.javaapi.core.internal.CoreCheckType
import io.gatling.javaapi.http.HttpDsl

import org.graalvm.polyglot.{ Context, HostAccess, PolyglotException }
import org.scalatest.flatspec.AnyFlatSpecLike
import org.scalatest.matchers.should.Matchers

class NumericValidateSpec extends AnyFlatSpecLike with Matchers {

  // needed by the static initialization of the http DSL
  Predef._configuration = GatlingConfiguration.loadForTest()

  "valueClass" should "read the value class Gatling chooses its comparators with" in {
    NumericValidate.valueClass(CoreDsl.jsonPath("$.a").ofInt()) shouldBe classOf[jl.Integer]
    NumericValidate.valueClass(CoreDsl.jsonPath("$.a").ofLong()) shouldBe classOf[jl.Long]
    NumericValidate.valueClass(CoreDsl.jsonPath("$.a").ofDouble()) shouldBe classOf[jl.Double]
    NumericValidate.valueClass(CoreDsl.jsonPath("$.a").ofDouble().find()) shouldBe classOf[jl.Double]
    NumericValidate.valueClass(CoreDsl.jmesPath("a").ofInt()) shouldBe classOf[jl.Integer]
    NumericValidate.valueClass(CoreDsl.jsonPath("$.a").count()) shouldBe classOf[jl.Integer]
    NumericValidate.valueClass(CoreDsl.substring("a")) shouldBe classOf[jl.Integer]
    NumericValidate.valueClass(CoreDsl.bodyLength()) shouldBe classOf[jl.Integer]
    NumericValidate.valueClass(CoreDsl.responseTimeInMillis()) shouldBe classOf[jl.Integer]
    NumericValidate.valueClass(HttpDsl.status()) shouldBe classOf[jl.Integer]
    NumericValidate.valueClass(CoreDsl.jsonPath("$.a")) shouldBe classOf[String]
    NumericValidate.valueClass(CoreDsl.jsonPath("$.a").ofInt().findAll()) shouldBe classOf[ju.List[_]]
  }

  "of" should "only wrap checks of numeric values" in {
    NumericValidate.of(CoreDsl.jsonPath("$.a").ofInt()) shouldBe a[NumericValidate]
    NumericValidate.of(CoreDsl.jsonPath("$.a").ofLong()) shouldBe a[NumericValidate]
    NumericValidate.of(CoreDsl.jsonPath("$.a").ofDouble()) shouldBe a[NumericValidate]

    val string = CoreDsl.jsonPath("$.a")
    NumericValidate.of(string) should be theSameInstanceAs string
    val list = CoreDsl.jsonPath("$.a").ofInt().findAll()
    NumericValidate.of(list) should be theSameInstanceAs list
  }

  it should "not wrap a view twice" in {
    val view = NumericValidate.of(CoreDsl.jsonPath("$.a").ofInt())
    NumericValidate.of(view) should be theSameInstanceAs view
  }

  "NumericCoercion.INTEGER" should "convert integral numbers exactly" in {
    NumericCoercion.INTEGER.exact(Int.box(42)) shouldBe Int.box(42)
    NumericCoercion.INTEGER.exact(Double.box(42.0)) shouldBe Int.box(42)
    NumericCoercion.INTEGER.exact(Long.box(42L)) shouldBe Int.box(42)
    NumericCoercion.INTEGER.exact(Double.box(Int.MaxValue.toDouble)) shouldBe Int.box(Int.MaxValue)
  }

  it should "reject numbers without an Integer equivalent" in {
    the[IllegalArgumentException] thrownBy NumericCoercion.INTEGER.exact(Double.box(42.5)) should have message
      "42.5 is not an integer, while this check extracts Integer values"
    an[IllegalArgumentException] should be thrownBy NumericCoercion.INTEGER.exact(Double.box(Int.MaxValue + 1.0))
    an[IllegalArgumentException] should be thrownBy NumericCoercion.INTEGER.exact(Double.box(Double.NaN))
  }

  it should "round fractional bounds the way that keeps comparisons exact" in {
    // x < 42.5 is x < 43, x >= 41.5 is x >= 42, x <= 42.5 is x <= 42, x > 41.5 is x > 41
    NumericCoercion.INTEGER.ceil(Double.box(42.5)) shouldBe Int.box(43)
    NumericCoercion.INTEGER.ceil(Double.box(41.5)) shouldBe Int.box(42)
    NumericCoercion.INTEGER.floor(Double.box(42.5)) shouldBe Int.box(42)
    NumericCoercion.INTEGER.floor(Double.box(41.5)) shouldBe Int.box(41)
    NumericCoercion.INTEGER.ceil(Double.box(-0.5)) shouldBe Int.box(0)
    NumericCoercion.INTEGER.ceil(Int.box(42)) shouldBe Int.box(42)
    an[IllegalArgumentException] should be thrownBy NumericCoercion.INTEGER.ceil(Double.box(Double.NaN))
    an[IllegalArgumentException] should be thrownBy NumericCoercion.INTEGER.floor(Double.box(1e10))
  }

  it should "only convert for equality, as Gatling unboxes Integer values" in {
    NumericCoercion.INTEGER.forEquality(Double.box(42.0)) shouldBe Int.box(42)
    NumericCoercion.LONG.forEquality(Double.box(42.5)) shouldBe Double.box(42.5)
    NumericCoercion.DOUBLE.forEquality(Int.box(2)) shouldBe Int.box(2)
  }

  "NumericCoercion.LONG" should "convert integral numbers exactly" in {
    NumericCoercion.LONG.exact(Int.box(42)) shouldBe Long.box(42L)
    NumericCoercion.LONG.exact(Double.box(5000000000.0)) shouldBe Long.box(5000000000L)
    NumericCoercion.LONG.ceil(Double.box(42.5)) shouldBe Long.box(43L)
    an[IllegalArgumentException] should be thrownBy NumericCoercion.LONG.exact(Double.box(math.pow(2, 63)))
  }

  "NumericCoercion.DOUBLE" should "convert any number" in {
    NumericCoercion.DOUBLE.exact(Int.box(2)) shouldBe Double.box(2.0)
    NumericCoercion.DOUBLE.ceil(Double.box(42.5)) shouldBe Double.box(42.5)
  }

  "NumericCoercion" should "pass non numbers through" in {
    NumericCoercion.INTEGER.exact("foo") shouldBe "foo"
    NumericCoercion.INTEGER.ceil(null) shouldBe (null: AnyRef)
  }

  // Records the expected values that reach Gatling's Scala check builder
  private final class Recorder extends InvocationHandler {
    var calls: Vector[(String, Validation[Any])] = Vector.empty

    override def invoke(proxy: AnyRef, method: Method, args: Array[AnyRef]): AnyRef =
      method.getName match {
        case name @ ("is" | "not" | "lt" | "lte" | "gt" | "gte") =>
          calls :+= name -> args(0).asInstanceOf[Expression[Any]](null)
          null
        case "withDefault" =>
          calls :+= "withDefault" -> args(0).asInstanceOf[Expression[Any]](null)
          proxy
        case other => throw new UnsupportedOperationException(other)
      }
  }

  // runs a script with `v` the validator of a check extracting values of class `valueClass`, and `long` a Java long
  // (arithmetic with a Java long yields a JavaScript double, which GraalJS passes as a Double)
  private def recordedFromJs(valueClass: Class[_], numeric: Boolean)(script: String): Vector[(String, Validation[Any])] = {
    val recorder = new Recorder
    val scalaValidate = Proxy
      .newProxyInstance(getClass.getClassLoader, Array(classOf[io.gatling.core.check.CheckBuilder.Validate[_, _, _]]), recorder)
      .asInstanceOf[io.gatling.core.check.CheckBuilder.Validate[Any, Any, AnyRef]]
    val validate = new CheckBuilder.Validate.Default[Any, Any, AnyRef](scalaValidate, CoreCheckType.JsonPath, valueClass)
    Using.resource(
      Context
        .newBuilder("js")
        .allowHostAccess(HostAccess.ALL)
        .allowHostClassLookup(_ => true)
        .option("engine.WarnInterpreterOnly", "false")
        .build()
    ) { context =>
      val bindings = context.getBindings("js")
      bindings.putMember("v", if (numeric) NumericValidate.of(validate) else validate)
      bindings.putMember("long", Long.box(3L))
      context.eval("js", script)
    }
    recorder.calls
  }

  private def boxed(validation: Validation[Any]): (Class[_], Any) =
    validation match {
      case Success(value)   => value.getClass -> value
      case Failure(message) => classOf[Failure] -> message
    }

  "A computed JavaScript number" should "reach Gatling as a Double without the view" in {
    val calls = recordedFromJs(classOf[jl.Integer], numeric = false)("v.is(long + 39)")
    calls.map { case (name, v) => name -> boxed(v) } shouldBe Vector("is" -> (classOf[jl.Double] -> 42.0))
  }

  "NumericValidate" should "convert constants and function results for Integer checks" in {
    val calls = recordedFromJs(classOf[jl.Integer], numeric = true)(
      """v.is(long + 39);
        |v.not(long + 40);
        |v.is(() => long + 39);
        |v.lt(42.5);
        |v.lte(() => 42.5);
        |v.gt(41.5);
        |v.gte(-0.5);
        |v.withDefault(() => long + 4).is(7);""".stripMargin
    )
    calls.map { case (name, v) => name -> boxed(v) } shouldBe Vector(
      "is" -> (classOf[jl.Integer] -> 42),
      "not" -> (classOf[jl.Integer] -> 43),
      "is" -> (classOf[jl.Integer] -> 42),
      "lt" -> (classOf[jl.Integer] -> 43),
      "lte" -> (classOf[jl.Integer] -> 42),
      "gt" -> (classOf[jl.Integer] -> 41),
      "gte" -> (classOf[jl.Integer] -> 0),
      "withDefault" -> (classOf[jl.Integer] -> 7),
      "is" -> (classOf[jl.Integer] -> 7)
    )
  }

  it should "convert ordering bounds for Long and Double checks" in {
    recordedFromJs(classOf[jl.Long], numeric = true)("v.lt(43); v.gte(() => long + 39)")
      .map { case (name, v) => name -> boxed(v) } shouldBe Vector(
      "lt" -> (classOf[jl.Long] -> 43L),
      "gte" -> (classOf[jl.Long] -> 42L)
    )
    recordedFromJs(classOf[jl.Double], numeric = true)("v.lt(2)")
      .map { case (name, v) => name -> boxed(v) } shouldBe Vector("lt" -> (classOf[jl.Double] -> 2.0))
  }

  it should "reject a constant without an equivalent when the check is built" in {
    val e = the[PolyglotException] thrownBy recordedFromJs(classOf[jl.Integer], numeric = true)("v.is(42.5)")
    e.getMessage should include("42.5 is not an integer, while this check extracts Integer values")
  }

  it should "fail the check when a function returns a number without an equivalent" in {
    val calls = recordedFromJs(classOf[jl.Integer], numeric = true)("v.is(() => 42.5)")
    calls.map { case (name, v) => name -> boxed(v) } match {
      case Vector(("is", (failure, message: String))) =>
        failure shouldBe classOf[Failure]
        message should include("42.5 is not an integer, while this check extracts Integer values")
      case other => fail(s"unexpected calls: $other")
    }
  }
}
