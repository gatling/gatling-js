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

package io.gatling.js.fs;

import java.nio.ByteBuffer;
import java.nio.channels.SeekableByteChannel;

class JsSeekableByteChannelImpl implements SeekableByteChannel {

  private final byte[] data;
  private int position;

  public JsSeekableByteChannelImpl(byte[] data) {
    this.data = data;
    this.position = 0;
  }

  @Override
  public int read(ByteBuffer dst) {
    if (position >= data.length) {
      return -1;
    } else if (position == 0 && dst.remaining() >= data.length) {
      dst.put(data);
      return data.length;
    } else {
      int readableBytes = Math.min(dst.remaining(), data.length - position);
      for (int i = 0; i < readableBytes; i++) {
        dst.put(data[position++]);
      }
      return readableBytes;
    }
  }

  @Override
  public int write(ByteBuffer src) {
    throw new UnsupportedOperationException("Read-only channel");
  }

  @Override
  public long position() {
    return position;
  }

  @Override
  public SeekableByteChannel position(long newPosition) {
    if (newPosition < 0 || newPosition > data.length) {
      throw new IndexOutOfBoundsException("New position is out of bounds: " + newPosition);
    }
    this.position = (int) newPosition;
    return this;
  }

  @Override
  public long size() {
    return data.length;
  }

  @Override
  public SeekableByteChannel truncate(long size) {
    throw new UnsupportedOperationException("Read-only channel");
  }

  @Override
  public boolean isOpen() {
    return true;
  }

  @Override
  public void close() {
    // Do nothing.
  }
}
