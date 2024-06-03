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

package com.oracle.truffle.js.lang;

import static io.gatling.internal.asm.Opcodes.*;

import io.gatling.internal.asm.*;
import java.io.IOException;
import java.lang.invoke.MethodHandles;

public class JavaScriptLanguageHack {
  public static void allowThreadAccess() throws IOException, IllegalAccessException {
    final byte[] modifiedJavaScriptLanguage;

    try (final var classInputStream =
        ClassLoader.getSystemClassLoader()
            .getResourceAsStream("com/oracle/truffle/js/lang/JavaScriptLanguage.class")) {
      if (classInputStream == null) {
        throw new IllegalStateException(
            "JavaScriptLanguage class file not found: GraalJS dependency is probably missing");
      }

      final ClassReader classReader = new ClassReader(classInputStream);
      final var classWriter =
          new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
      ClassVisitor classVisitor = new JavaScriptLanguageClassAdapter(classWriter) {};
      classReader.accept(classVisitor, 0);
      modifiedJavaScriptLanguage = classWriter.toByteArray();
    }

    MethodHandles.lookup().defineClass(modifiedJavaScriptLanguage);
  }

  private static class JavaScriptLanguageClassAdapter extends ClassVisitor {
    public JavaScriptLanguageClassAdapter(ClassVisitor cv) {
      super(ASM9, cv);
    }

    @Override
    public void visitEnd() {
      final var mv =
          cv.visitMethod(
              ACC_PROTECTED, "isThreadAccessAllowed", "(Ljava/lang/Thread;Z)Z", null, null);
      mv.visitCode();
      mv.visitInsn(ICONST_1);
      mv.visitInsn(IRETURN);
      mv.visitMaxs(1, 2);
      mv.visitEnd();

      super.visitEnd();
    }
  }
}
