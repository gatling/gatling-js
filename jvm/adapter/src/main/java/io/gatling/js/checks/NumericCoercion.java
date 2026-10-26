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

/**
 * Converts a number coming from JavaScript to the class of the check value.
 *
 * <p>GraalJS passes a JavaScript number to an {@link Object} parameter as an {@link Integer}, a
 * {@link Long} or a {@link Double}, depending on how it holds it at that point, while Gatling
 * compares check values with a comparator chosen for their class, which casts.
 */
enum NumericCoercion {
  INTEGER(Integer.class, "an integer") {
    @Override
    Object exact(Number n) {
      if (n instanceof Integer) {
        return n;
      }
      double d = n.doubleValue();
      if (d == Math.rint(d) && d >= Integer.MIN_VALUE && d <= Integer.MAX_VALUE) {
        return (int) d;
      }
      throw unrepresentable(n);
    }

    @Override
    Object fromIntegral(double d, Number original) {
      if (d >= Integer.MIN_VALUE && d <= Integer.MAX_VALUE) {
        return (int) d;
      }
      throw unrepresentable(original);
    }
  },
  LONG(Long.class, "a long integer") {
    @Override
    Object exact(Number n) {
      if (n instanceof Long) {
        return n;
      }
      if (n instanceof Integer i) {
        return i.longValue();
      }
      double d = n.doubleValue();
      // 2^63 is a double, Long.MAX_VALUE isn't
      if (d == Math.rint(d) && d >= -0x1p63 && d < 0x1p63) {
        return (long) d;
      }
      throw unrepresentable(n);
    }

    @Override
    Object fromIntegral(double d, Number original) {
      if (d >= -0x1p63 && d < 0x1p63) {
        return (long) d;
      }
      throw unrepresentable(original);
    }
  },
  DOUBLE(Double.class, "a number") {
    @Override
    Object exact(Number n) {
      return n instanceof Double ? n : n.doubleValue();
    }

    @Override
    Object fromIntegral(double d, Number original) {
      return d;
    }
  };

  private final Class<?> valueClass;
  private final String description;

  NumericCoercion(Class<?> valueClass, String description) {
    this.valueClass = valueClass;
    this.description = description;
  }

  abstract Object exact(Number n);

  abstract Object fromIntegral(double d, Number original);

  static NumericCoercion forClass(Class<?> valueClass) {
    if (valueClass == Integer.class) {
      return INTEGER;
    } else if (valueClass == Long.class) {
      return LONG;
    } else if (valueClass == Double.class) {
      return DOUBLE;
    }
    return null;
  }

  /**
   * For is and not: only Integer values are unboxed, Long and Double values are compared with ==
   */
  Object forEquality(Object value) {
    return this == INTEGER ? exact(value) : value;
  }

  /** For withDefault: the default becomes the check value */
  Object exact(Object value) {
    return value instanceof Number n ? exact(n) : value;
  }

  /** For lt and gte: x < v is x < ceil(v), and x >= v is x >= ceil(v), for an integral x */
  Object ceil(Object value) {
    return rounded(value, Math::ceil);
  }

  /** For lte and gt: x <= v is x <= floor(v), and x > v is x > floor(v), for an integral x */
  Object floor(Object value) {
    return rounded(value, Math::floor);
  }

  private Object rounded(Object value, java.util.function.DoubleUnaryOperator rounding) {
    if (!(value instanceof Number n)
        || this == DOUBLE
        || n instanceof Integer
        || n instanceof Long) {
      return exact(value);
    }
    double d = n.doubleValue();
    if (Double.isNaN(d)) {
      throw unrepresentable(n);
    }
    return fromIntegral(rounding.applyAsDouble(d), n);
  }

  IllegalArgumentException unrepresentable(Number n) {
    return new IllegalArgumentException(
        n
            + " is not "
            + description
            + ", while this check extracts "
            + valueClass.getSimpleName()
            + " values");
  }
}
