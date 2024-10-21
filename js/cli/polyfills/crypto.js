import { Buffer } from "buffer"

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES = 65536;

// Node supports requesting up to this number of bytes
// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
const MAX_UINT32 = 4294967295;

const JavaCrypto = Java.type("io.gatling.js.polyfills.Crypto");

export const randomBytes = (size, cb) => {
  // Node supports requesting up to this number of bytes
  // https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
  if (size > MAX_UINT32) {
    throw new RangeError('requested too many random bytes');
  }
  const bytes = Buffer.from(JavaCrypto.randomBytes(size));
  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes);
    })
  }
  return bytes;
};
export const rng = randomBytes;
export const pseudoRandomBytes = randomBytes;
export const prng = randomBytes;
export const getRandomValues = (values) => {
  const byteView = new Uint8Array(values.buffer, values.byteOffset, values.byteLength);
  const bytes = randomBytes(byteView.length);
  for (let i = 0; i < byteView.length; i++) {
    // The range of Math.random() is [0, 1) and the ToUint8 abstract operation rounds down
    byteView[i] = bytes[i];
  }
  return values;
};
export const randomUUID = () => JavaCrypto.randomUUID();

// export const Cipher = crypto.Cipher;
// export const Cipheriv = crypto.Cipheriv;
// export const Decipher = crypto.Decipher;
// export const Decipheriv = crypto.Decipheriv;
// export const DiffieHellman = crypto.DiffieHellman;
// export const DiffieHellmanGroup = crypto.DiffieHellmanGroup;
// export const Hash = crypto.Hash;
// export const Hmac = crypto.Hmac;
// export const Sign = crypto.Sign;
// export const Verify = crypto.Verify;
// export const constants = crypto.constants;
// export const createCipher = crypto.createCipher;
// export const createCipheriv = crypto.createCipheriv;
// export const createCredentials = crypto.createCredentials;
// export const createDecipher = crypto.createDecipher;
// export const createDecipheriv = crypto.createDecipheriv;
// export const createDiffieHellman = crypto.createDiffieHellman;
// export const createDiffieHellmanGroup = crypto.createDiffieHellmanGroup;
// export const createECDH = crypto.createECDH;
// export const createHash = crypto.createHash;
// export const createHmac = crypto.createHmac;
// export const createSign = crypto.createSign;
// export const createVerify = crypto.createVerify;
// export const getCiphers = crypto.getCiphers;
// export const getDiffieHellman = crypto.getDiffieHellman;
// export const getHashes = crypto.getHashes;
// export const listCiphers = crypto.listCiphers;
// export const pbkdf2 = crypto.pbkdf2;
// export const pbkdf2Sync = crypto.pbkdf2Sync;
// export const privateDecrypt = crypto.privateDecrypt;
// export const privateEncrypt = crypto.privateEncrypt;
// export const publicDecrypt = crypto.publicDecrypt;
// export const publicEncrypt = crypto.publicEncrypt;
// export const randomFill = crypto.randomFill;
// export const randomFillSync = crypto.randomFillSync;

const crypto = {
  randomBytes,
  rng,
  pseudoRandomBytes,
  prng,
  getRandomValues,
  randomUUID,
};
crypto.webcrypto = crypto;
globalThis.crypto = crypto;
export default crypto;
