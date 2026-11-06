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

package com.oracle.truffle.polyglot;

import static org.objectweb.asm.Opcodes.*;

import java.io.IOException;
import java.lang.invoke.MethodHandles;
import org.objectweb.asm.*;

/**
 * Patches the Truffle classes that wrap JavaScript functions converted into Java functional
 * interfaces, so that invocations can be redirected to the equivalent function in the JavaScript
 * context owned by the current thread, see {@link io.gatling.js.JsRuntime}:
 *
 * <ul>
 *   <li>PolyglotFunction, used for {@link java.util.function.Function}
 *   <li>PolyglotFunctionProxyHandler, the InvocationHandler used for all other functional
 *       interfaces
 * </ul>
 *
 * <p>In both cases:
 *
 * <ul>
 *   <li>the constructor stores the index returned by {@code JsCallbacks.onFunctionCreated}, -1
 *       meaning the function must never be redirected
 *   <li>the invocation method first calls {@code JsCallbacks.redirect*}, and only falls back to the
 *       original implementation when the call wasn't redirected
 * </ul>
 */
public class PolyglotFunctionsHack {
  private static final String PACKAGE = "com/oracle/truffle/polyglot/";
  private static final String INDEX_FIELD = "gatlingCallbackIndex";
  private static final String CALLBACKS = "io/gatling/js/JsCallbacks";

  public static void redirectFunctions() throws IOException, IllegalAccessException {
    // PolyglotFunction(PolyglotLanguageContext languageContext, Object function, Class<?>
    // returnClass, Type returnType, Class<?> paramClass, Type paramType)
    patch(
        "PolyglotFunction",
        "(Lcom/oracle/truffle/polyglot/PolyglotLanguageContext;Ljava/lang/Object;Ljava/lang/Class;Ljava/lang/reflect/Type;Ljava/lang/Class;Ljava/lang/reflect/Type;)V",
        4,
        "apply",
        "(Ljava/lang/Object;)Ljava/lang/Object;",
        "redirectApply",
        "(ILjava/lang/Object;)Ljava/lang/Object;");
    // PolyglotFunctionProxyHandler(Object obj, Method functionMethod, Type genericType,
    // PolyglotLanguageContext languageContext)
    patch(
        "PolyglotFunctionProxyHandler",
        "(Ljava/lang/Object;Ljava/lang/reflect/Method;Ljava/lang/reflect/Type;Lcom/oracle/truffle/polyglot/PolyglotLanguageContext;)V",
        2,
        "invoke",
        "(Ljava/lang/Object;Ljava/lang/reflect/Method;[Ljava/lang/Object;)Ljava/lang/Object;",
        "redirectInvoke",
        "(ILjava/lang/Object;Ljava/lang/reflect/Method;[Ljava/lang/Object;)Ljava/lang/Object;");
  }

  /**
   * @param signatureArgIndex the index of the constructor argument describing the function's
   *     signature, used to detect non-deterministic simulations
   */
  private static void patch(
      String simpleClassName,
      String constructorDescriptor,
      int signatureArgIndex,
      String methodName,
      String methodDescriptor,
      String redirectName,
      String redirectDescriptor)
      throws IOException, IllegalAccessException {
    final String className = PACKAGE + simpleClassName;
    final byte[] modifiedClass;

    try (final var classInputStream =
        PolyglotFunctionsHack.class.getClassLoader().getResourceAsStream(className + ".class")) {
      if (classInputStream == null) {
        throw new IllegalStateException(
            simpleClassName + " class file not found: Truffle dependency is probably missing");
      }

      final ClassReader classReader = new ClassReader(classInputStream);
      // Frames are written by hand so that ASM never has to load Truffle classes to compute them
      final var classWriter = new ClassWriter(ClassWriter.COMPUTE_MAXS);
      final var classAdapter =
          new FunctionClassAdapter(
              classWriter,
              className,
              constructorDescriptor,
              signatureArgIndex,
              methodName,
              methodDescriptor,
              redirectName,
              redirectDescriptor);
      classReader.accept(classAdapter, 0);
      if (!classAdapter.constructorPatched || !classAdapter.methodPatched) {
        throw new IllegalStateException(
            "Unsupported Truffle version: " + simpleClassName + " doesn't have the expected shape");
      }
      modifiedClass = classWriter.toByteArray();
    }

    MethodHandles.lookup().defineClass(modifiedClass);
  }

  private static class FunctionClassAdapter extends ClassVisitor {
    private final String className;
    private final String constructorDescriptor;
    private final int signatureArgIndex;
    private final String methodName;
    private final String methodDescriptor;
    private final String redirectName;
    private final String redirectDescriptor;
    boolean constructorPatched;
    boolean methodPatched;

    FunctionClassAdapter(
        ClassVisitor cv,
        String className,
        String constructorDescriptor,
        int signatureArgIndex,
        String methodName,
        String methodDescriptor,
        String redirectName,
        String redirectDescriptor) {
      super(ASM9, cv);
      this.className = className;
      this.constructorDescriptor = constructorDescriptor;
      this.signatureArgIndex = signatureArgIndex;
      this.methodName = methodName;
      this.methodDescriptor = methodDescriptor;
      this.redirectName = redirectName;
      this.redirectDescriptor = redirectDescriptor;
    }

    @Override
    public MethodVisitor visitMethod(
        int access, String name, String descriptor, String signature, String[] exceptions) {
      final var mv = super.visitMethod(access, name, descriptor, signature, exceptions);
      if (name.equals("<init>") && descriptor.equals(constructorDescriptor)) {
        constructorPatched = true;
        return new ConstructorAdapter(mv, className, signatureArgIndex);
      } else if (name.equals(methodName) && descriptor.equals(methodDescriptor)) {
        methodPatched = true;
        return new InvocationAdapter(
            mv,
            className,
            Type.getArgumentTypes(methodDescriptor).length,
            redirectName,
            redirectDescriptor);
      }
      return mv;
    }

    @Override
    public void visitEnd() {
      cv.visitField(ACC_PRIVATE, INDEX_FIELD, "I", null, null).visitEnd();
      super.visitEnd();
    }
  }

  // this.gatlingCallbackIndex = JsCallbacks.onFunctionCreated(this, signature);
  private static class ConstructorAdapter extends MethodVisitor {
    private final String className;
    private final int signatureArgIndex;

    ConstructorAdapter(MethodVisitor mv, String className, int signatureArgIndex) {
      super(ASM9, mv);
      this.className = className;
      this.signatureArgIndex = signatureArgIndex;
    }

    @Override
    public void visitInsn(int opcode) {
      if (opcode == RETURN) {
        mv.visitVarInsn(ALOAD, 0);
        mv.visitVarInsn(ALOAD, 0);
        mv.visitVarInsn(ALOAD, signatureArgIndex);
        mv.visitMethodInsn(
            INVOKESTATIC,
            CALLBACKS,
            "onFunctionCreated",
            "(Ljava/lang/Object;Ljava/lang/Object;)I",
            false);
        mv.visitFieldInsn(PUTFIELD, className, INDEX_FIELD, "I");
      }
      super.visitInsn(opcode);
    }
  }

  // if (gatlingCallbackIndex >= 0) {
  //   Object result = JsCallbacks.redirect*(gatlingCallbackIndex, ...args);
  //   if (result != JsCallbacks.NOT_REDIRECTED) return result;
  // }
  // ...original code
  private static class InvocationAdapter extends MethodVisitor {
    private final String className;
    private final int argCount;
    private final String redirectName;
    private final String redirectDescriptor;

    InvocationAdapter(
        MethodVisitor mv,
        String className,
        int argCount,
        String redirectName,
        String redirectDescriptor) {
      super(ASM9, mv);
      this.className = className;
      this.argCount = argCount;
      this.redirectName = redirectName;
      this.redirectDescriptor = redirectDescriptor;
    }

    @Override
    public void visitCode() {
      super.visitCode();
      final var notRedirectedWithResult = new Label();
      final var original = new Label();

      mv.visitVarInsn(ALOAD, 0);
      mv.visitFieldInsn(GETFIELD, className, INDEX_FIELD, "I");
      mv.visitJumpInsn(IFLT, original);

      mv.visitVarInsn(ALOAD, 0);
      mv.visitFieldInsn(GETFIELD, className, INDEX_FIELD, "I");
      for (int i = 1; i <= argCount; i++) {
        mv.visitVarInsn(ALOAD, i);
      }
      mv.visitMethodInsn(INVOKESTATIC, CALLBACKS, redirectName, redirectDescriptor, false);
      mv.visitInsn(DUP);
      mv.visitFieldInsn(GETSTATIC, CALLBACKS, "NOT_REDIRECTED", "Ljava/lang/Object;");
      mv.visitJumpInsn(IF_ACMPEQ, notRedirectedWithResult);
      mv.visitInsn(ARETURN);

      mv.visitLabel(notRedirectedWithResult);
      mv.visitFrame(F_SAME1, 0, null, 1, new Object[] {"java/lang/Object"});
      mv.visitInsn(POP);

      mv.visitLabel(original);
      mv.visitFrame(F_SAME, 0, null, 0, null);
    }
  }
}
