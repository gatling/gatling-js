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

package io.gatling.js

import java.io.FileNotFoundException
import java.nio.charset.Charset

import io.gatling.commons.validation.{ Failure, Success }
import io.gatling.core.util.ResourceCache

object Resources extends ResourceCache {
  def readResourceAsBytes(filePath: String): Array[Byte] =
    getResource(filePath).bytes

  def readResourceAsString(filePath: String, charset: String): String =
    getResource(filePath).string(Charset.forName(charset))

  private def getResource(filePath: String) =
    cachedResource(filePath) match {
      case Success(resource) => resource
      case Failure(message)  => throw new FileNotFoundException(s"Could not locate file: $message")
    }
}
