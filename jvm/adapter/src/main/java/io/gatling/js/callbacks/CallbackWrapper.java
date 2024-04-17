package io.gatling.js.callbacks;

import java.util.function.BiFunction;
import java.util.function.Function;
import javax.annotation.Nonnull;

public final class CallbackWrapper {

  private static final Object lock = new Object();

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
