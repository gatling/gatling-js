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

package io.gatling.js;

import static io.gatling.internal.asm.Opcodes.*;

import io.gatling.internal.asm.*;
import io.gatling.internal.asm.ClassReader;
import io.gatling.internal.asm.ClassWriter;
import java.lang.instrument.ClassFileTransformer;
import java.lang.instrument.IllegalClassFormatException;
import java.lang.instrument.Instrumentation;
import java.security.ProtectionDomain;

public class JavaScriptLanguageHack {
  public static void premain(String args, Instrumentation instrumentation) {
    instrumentation.addTransformer(new JavaScriptLanguageClassFileTransformer());
    try {
      Class.forName("com.oracle.truffle.js.lang.JavaScriptLanguage");
    } catch (ClassNotFoundException e) {
      throw new IllegalStateException(
          "JavaScriptLanguage class file not found: GraalJS dependency is probably missing");
    }
  }

  private static class JavaScriptLanguageClassFileTransformer implements ClassFileTransformer {
    @Override
    public byte[] transform(
        ClassLoader loader,
        String className,
        Class<?> classBeingRedefined,
        ProtectionDomain protectionDomain,
        byte[] classfileBuffer)
        throws IllegalClassFormatException {
      if (!className.equals("com/oracle/truffle/js/lang/JavaScriptLanguage")) {
        return null;
      }
      ClassReader reader = new ClassReader(classfileBuffer);
      ClassWriter writer = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS);
      reader.accept(new JavaScriptLanguageClassVisitor(writer), ClassReader.EXPAND_FRAMES);
      return writer.toByteArray();
    }
  }

  private static class JavaScriptLanguageClassVisitor extends ClassVisitor {
    public JavaScriptLanguageClassVisitor(ClassVisitor cv) {
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
