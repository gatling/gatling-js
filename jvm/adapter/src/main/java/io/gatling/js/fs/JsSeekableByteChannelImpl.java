/*
 * Copyright 2011-2025 GatlingCorp (https://gatling.io)
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

// FIXME rename and optimize + cache
// FIXME decompress jar in tmp and read from disk so we don't have to do this?
public class JsSeekableByteChannelImpl implements SeekableByteChannel {

  private final ByteBuffer buf;
  // private final AtomicBoolean closed = new AtomicBoolean();
  private int position;
  // private int size;

  public JsSeekableByteChannelImpl(byte[] data) {
    this.buf = ByteBuffer.wrap(data);
    this.position = 0;
    // this.size = data.length;
  }

  /*private void ensureOpen() throws ClosedChannelException {
      if (!isOpen()) {
          throw new ClosedChannelException();
      }
  }*/

  @Override
  public boolean isOpen() {
    return true;
    // return !closed.get();
  }

  @Override
  public void close() {
    // closed.set(true);
  }

  @Override
  public int read(ByteBuffer dst) {
    if (position >= buf.limit()) {
      return -1;
    }
    int remaining = Math.min(dst.remaining(), buf.remaining() - position);
    for (int i = 0; i < remaining; i++) {
      dst.put(buf.get(position++));
    }
    return remaining;
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
    if (newPosition < 0 || newPosition > buf.limit()) {
      throw new IllegalArgumentException("Position out of bounds: " + newPosition);
    }
    this.position = (int) newPosition;
    return this;
  }

  @Override
  public long size() {
    return buf.limit();
  }

  @Override
  public SeekableByteChannel truncate(long size) {
    throw new UnsupportedOperationException("Read-only channel");
  }
}
