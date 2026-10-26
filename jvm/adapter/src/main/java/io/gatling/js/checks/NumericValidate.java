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

package io.gatling.js.checks;

import io.gatling.javaapi.core.CheckBuilder;
import io.gatling.javaapi.core.Session;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.VarHandle;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.UnaryOperator;

/**
 * A view of a check validator that converts the numbers passed by JavaScript to the class of the
 * check value, on the Java side, before Gatling compares them.
 *
 * <p>Converting in JavaScript wouldn't work: a Java number returned to JavaScript becomes a
 * JavaScript number again, passed back as an Integer or a Double.
 */
public final class NumericValidate implements CheckBuilder.Validate<Object> {

  /**
   * The class of the check value, which Gatling uses to choose its comparators
   * (io.gatling.javaapi.core.internal.Comparisons), isn't exposed: read the private field.
   */
  private static final VarHandle X_CLASS;

  static {
    try {
      X_CLASS =
          MethodHandles.privateLookupIn(CheckBuilder.Validate.Default.class, MethodHandles.lookup())
              .findVarHandle(CheckBuilder.Validate.Default.class, "xClass", Class.class);
    } catch (ReflectiveOperationException e) {
      throw new ExceptionInInitializerError(
          new IllegalStateException(
              "Can't read the check value class (CheckBuilder.Validate.Default.xClass): numeric"
                  + " checks need updating for this Gatling version",
              e));
    }
  }

  static Class<?> valueClass(CheckBuilder.Validate<?> validate) {
    // the validators of a Find all go through find()
    CheckBuilder.Validate<?> v =
        validate instanceof CheckBuilder.Find<?> find ? find.find() : validate;
    return v instanceof CheckBuilder.Validate.Default<?, ?, ?> ? (Class<?>) X_CLASS.get(v) : null;
  }

  /**
   * @param validate a check validator
   * @return a converting view if the check value is an Integer, a Long or a Double, the validator
   *     itself otherwise
   */
  @SuppressWarnings("unchecked")
  public static CheckBuilder.Validate<Object> of(CheckBuilder.Validate<?> validate) {
    if (validate instanceof NumericValidate) {
      return (NumericValidate) validate;
    }
    NumericCoercion coercion = NumericCoercion.forClass(valueClass(validate));
    return coercion == null
        ? (CheckBuilder.Validate<Object>) validate
        : new NumericValidate((CheckBuilder.Validate<Object>) validate, coercion);
  }

  private final CheckBuilder.Validate<Object> delegate;
  private final NumericCoercion coercion;

  private NumericValidate(CheckBuilder.Validate<Object> delegate, NumericCoercion coercion) {
    this.delegate = delegate;
    this.coercion = coercion;
  }

  private static Function<Session, Object> converted(
      Function<Session, Object> f, UnaryOperator<Object> conversion) {
    return session -> conversion.apply(f.apply(session));
  }

  // converted

  @Override
  public CheckBuilder.Final is(Object expected) {
    return delegate.is(coercion.forEquality(expected));
  }

  @Override
  public CheckBuilder.Final is(Function<Session, Object> expected) {
    return delegate.is(converted(expected, coercion::forEquality));
  }

  @Override
  public CheckBuilder.Final not(Object expected) {
    return delegate.not(coercion.forEquality(expected));
  }

  @Override
  public CheckBuilder.Final not(Function<Session, Object> expected) {
    return delegate.not(converted(expected, coercion::forEquality));
  }

  @Override
  public CheckBuilder.Final lt(Object expected) {
    return delegate.lt(coercion.ceil(expected));
  }

  @Override
  public CheckBuilder.Final lt(Function<Session, Object> expected) {
    return delegate.lt(converted(expected, coercion::ceil));
  }

  @Override
  public CheckBuilder.Final lte(Object expected) {
    return delegate.lte(coercion.floor(expected));
  }

  @Override
  public CheckBuilder.Final lte(Function<Session, Object> expected) {
    return delegate.lte(converted(expected, coercion::floor));
  }

  @Override
  public CheckBuilder.Final gt(Object expected) {
    return delegate.gt(coercion.floor(expected));
  }

  @Override
  public CheckBuilder.Final gt(Function<Session, Object> expected) {
    return delegate.gt(converted(expected, coercion::floor));
  }

  @Override
  public CheckBuilder.Final gte(Object expected) {
    return delegate.gte(coercion.ceil(expected));
  }

  @Override
  public CheckBuilder.Final gte(Function<Session, Object> expected) {
    return delegate.gte(converted(expected, coercion::ceil));
  }

  @Override
  public CheckBuilder.Validate<Object> withDefault(Object value) {
    return of(delegate.withDefault(coercion.exact(value)));
  }

  @Override
  public CheckBuilder.Validate<Object> withDefault(Function<Session, Object> value) {
    return of(delegate.withDefault(converted(value, coercion::exact)));
  }

  @Override
  public CheckBuilder.Validate<Object> withDefaultEl(String value) {
    return of(delegate.withDefaultEl(value));
  }

  // unchanged: EL values are already typed by Gatling, in uses ==, transforms change the value
  // class

  @Override
  public <X2> CheckBuilder.Validate<X2> transform(Function<Object, X2> f) {
    return delegate.transform(f);
  }

  @Override
  public <X2> CheckBuilder.Validate<X2> transformWithSession(BiFunction<Object, Session, X2> f) {
    return delegate.transformWithSession(f);
  }

  @Override
  public CheckBuilder.Final validate(String name, BiFunction<Object, Session, Object> validator) {
    return delegate.validate(name, validator);
  }

  @Override
  public CheckBuilder.Final isEL(String expected) {
    return delegate.isEL(expected);
  }

  @Override
  public CheckBuilder.Final isNull() {
    return delegate.isNull();
  }

  @Override
  public CheckBuilder.Final notEL(String expected) {
    return delegate.notEL(expected);
  }

  @Override
  public CheckBuilder.Final notNull() {
    return delegate.notNull();
  }

  @Override
  public CheckBuilder.Final in(Object... expected) {
    return delegate.in(expected);
  }

  @Override
  public CheckBuilder.Final in(List<Object> expected) {
    return delegate.in(expected);
  }

  @Override
  public CheckBuilder.Final inEL(String expected) {
    return delegate.inEL(expected);
  }

  @Override
  public CheckBuilder.Final in(Function<Session, List<Object>> expected) {
    return delegate.in(expected);
  }

  @Override
  public CheckBuilder.Final exists() {
    return delegate.exists();
  }

  @Override
  public CheckBuilder.Final notExists() {
    return delegate.notExists();
  }

  @Override
  public CheckBuilder.Final optional() {
    return delegate.optional();
  }

  @Override
  public CheckBuilder.Final ltEL(String expected) {
    return delegate.ltEL(expected);
  }

  @Override
  public CheckBuilder.Final lteEL(String expected) {
    return delegate.lteEL(expected);
  }

  @Override
  public CheckBuilder.Final gtEL(String expected) {
    return delegate.gtEL(expected);
  }

  @Override
  public CheckBuilder.Final gteEL(String expected) {
    return delegate.gteEL(expected);
  }

  @Override
  public CheckBuilder.Final name(String name) {
    return delegate.name(name);
  }

  @Override
  public CheckBuilder.Final logActualValueInError(boolean logActualValueInError) {
    return delegate.logActualValueInError(logActualValueInError);
  }

  @Override
  public CheckBuilder.Final saveAs(String key) {
    return delegate.saveAs(key);
  }

  @Override
  public CheckBuilder.CheckType type() {
    return delegate.type();
  }

  @Override
  public io.gatling.core.check.CheckBuilder<?, ?> asScala() {
    return delegate.asScala();
  }
}
