/*
 * Copyright 2011-2024 GatlingCorp (https://gatling.io)
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

package io.gatling.js.callbacks;

import io.gatling.javaapi.core.Session;
import java.util.function.BiFunction;
import java.util.function.Function;
import javax.annotation.Nonnull;
import org.graalvm.polyglot.Value;

public final class CallbackWrapper {

  private static final Object lock = new Object();

  // Byte arrays

  public static byte[] wrapByteArray(Value v) {
    return v.as(byte[].class);
  }

  public static Function<Session, byte[]> wrapByteArrayFunction(
      @Nonnull Function<Session, Value> f) {
    return session -> {
      synchronized (lock) {
        Value v = f.apply(session);
        return v.as(byte[].class);
      }
    };
  }

  // Generic functions

  public static <T, R> FunctionWrapper<T, R> wrapFunction(@Nonnull Function<T, R> f) {
    return new FunctionWrapper<>(f);
  }

  public static <T, U, R> BiFunctionWrapper<T, U, R> wrapBiFunction(
      @Nonnull BiFunction<T, U, R> f) {
    return new BiFunctionWrapper<>(f);
  }

  public static class FunctionWrapper<T, R> implements Function<T, R> {

    private final Function<T, R> f;

    private FunctionWrapper(@Nonnull Function<T, R> f) {
      this.f = f;
    }

    @Override
    public R apply(T t) {
      synchronized (lock) {
        return f.apply(t);
      }
    }

    @Override
    @Nonnull
    public <V> Function<V, R> compose(@Nonnull Function<? super V, ? extends T> before) {
      return new FunctionWrapper<>(this.f.compose(before));
    }

    @Override
    @Nonnull
    public <V> Function<T, V> andThen(@Nonnull Function<? super R, ? extends V> after) {
      return new FunctionWrapper<>(this.f.andThen(after));
    }
  }

  public static class BiFunctionWrapper<T, U, R> implements BiFunction<T, U, R> {

    private final BiFunction<T, U, R> f;

    private BiFunctionWrapper(@Nonnull BiFunction<T, U, R> f) {
      this.f = f;
    }

    @Override
    @Nonnull
    public R apply(T t, U u) {
      synchronized (lock) {
        return f.apply(t, u);
      }
    }

    @Override
    @Nonnull
    public <V> BiFunction<T, U, V> andThen(@Nonnull Function<? super R, ? extends V> after) {
      return new BiFunctionWrapper<>(this.f.andThen(after));
    }
  }
}
