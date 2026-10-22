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

package io.gatling.js.polyfills;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.UUID;

public class Crypto {
  // One generator per thread: SecureRandom.getInstanceStrong() and UUID.randomUUID() both rely on
  // generators shared by the whole JVM behind a lock (and getInstanceStrong() also looks up a
  // provider on each call), which serializes all the threads generating random values.
  // SHA1PRNG is seeded once from system entropy, then doesn't perform any system call.
  private static final ThreadLocal<SecureRandom> RANDOM =
      ThreadLocal.withInitial(Crypto::newSecureRandom);

  private Crypto() {}

  private static SecureRandom newSecureRandom() {
    try {
      return SecureRandom.getInstance("SHA1PRNG");
    } catch (NoSuchAlgorithmException e) {
      return new SecureRandom();
    }
  }

  public static byte[] randomBytes(int size) {
    final byte[] bytes = new byte[size];
    RANDOM.get().nextBytes(bytes);
    return bytes;
  }

  public static String randomUUID() {
    final byte[] bytes = randomBytes(16);
    // version 4 (random), IETF variant, as in UUID.randomUUID()
    bytes[6] = (byte) ((bytes[6] & 0x0f) | 0x40);
    bytes[8] = (byte) ((bytes[8] & 0x3f) | 0x80);
    long msb = 0;
    long lsb = 0;
    for (int i = 0; i < 8; i++) {
      msb = (msb << 8) | (bytes[i] & 0xff);
    }
    for (int i = 8; i < 16; i++) {
      lsb = (lsb << 8) | (bytes[i] & 0xff);
    }
    return new UUID(msb, lsb).toString();
  }
}
