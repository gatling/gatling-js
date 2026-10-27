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

package io.gatling.js;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.function.Function;

/**
 * Hooks called by the patched Truffle classes wrapping JavaScript functions, see {@link
 * com.oracle.truffle.polyglot.PolyglotFunctionsHack}.
 */
public final class JsCallbacks {

  /** Returned by the redirect methods when the original function must be used. */
  public static final Object NOT_REDIRECTED = new Object();

  private JsCallbacks() {}

  /**
   * Called every time a JavaScript function is converted into a Java functional interface.
   *
   * @param function the PolyglotFunction or PolyglotFunctionProxyHandler
   * @param signature the signature of the function, used to detect non-deterministic simulations
   * @return the index of the function in the primary context, or -1 if it must not be redirected
   */
  public static int onFunctionCreated(Object function, Object signature) {
    var definingContext = JsRuntime.definingContext();
    return definingContext == null ? -1 : definingContext.recordFunction(function, signature);
  }

  /**
   * Called before invoking a {@link Function} created in the primary context.
   *
   * @return the result of the redirected call, or {@link #NOT_REDIRECTED}
   */
  @SuppressWarnings("unchecked")
  public static Object redirectApply(int index, Object arg) {
    var function = (Function<Object, Object>) JsRuntime.functionForCurrentThread(index);
    return function == null ? NOT_REDIRECTED : function.apply(arg);
  }

  /**
   * Called before invoking a proxy of another functional interface created in the primary context.
   *
   * @return the result of the redirected call, or {@link #NOT_REDIRECTED}
   */
  public static Object redirectInvoke(int index, Object proxy, Method method, Object[] args)
      throws Throwable {
    if (!Modifier.isAbstract(method.getModifiers()) || isObjectMethod(method)) {
      // default method (will call the functional method on the proxy) or equals/hashCode/toString
      return NOT_REDIRECTED;
    }
    var handler = (InvocationHandler) JsRuntime.functionForCurrentThread(index);
    return handler == null ? NOT_REDIRECTED : handler.invoke(proxy, method, args);
  }

  private static boolean isObjectMethod(Method m) {
    return switch (m.getParameterCount()) {
      case 0 -> m.getName().equals("hashCode") || m.getName().equals("toString");
      case 1 -> m.getName().equals("equals") && m.getParameterTypes()[0] == Object.class;
      default -> false;
    };
  }
}
