package io.gatling.js.callbacks;

import java.util.function.Function;
import javax.annotation.Nonnull;

public final class CallbackWrapper<T, R> implements Function<T, R> {
  private static final Object lock = new Object();

  public static <T, R> CallbackWrapper<T, R> wrap(@Nonnull Function<T, R> f) {
    return new CallbackWrapper<>(f);
  }

  private CallbackWrapper(@Nonnull Function<T, R> f) {
    this.f = f;
  }

  private final Function<T, R> f;

  @Override
  public R apply(T t) {
    synchronized (lock) {
      return f.apply(t);
    }
  }

  @Override
  @Nonnull
  public <V> Function<V, R> compose(@Nonnull Function<? super V, ? extends T> before) {
    return new CallbackWrapper<>(this.f.compose(before));
  }

  @Override
  @Nonnull
  public <V> Function<T, V> andThen(@Nonnull Function<? super R, ? extends V> after) {
    return new CallbackWrapper<>(this.f.andThen(after));
  }
}
