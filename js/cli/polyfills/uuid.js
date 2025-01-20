const plc = "x";
const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
const bit = /[xy]/g;

const replacer = function (c) {
  const r = Math.random() * 16 | 0;
  const v = c === plc ? r : (r & 0x3 | 0x8);
  return v.toString(16);
};

const uuid = function () {
  return pattern.replace(bit, replacer);
};

uuid.v4 = function () {
  return pattern.replace(bit, replacer);
};

globalThis.uuid = uuid;

export default uuid;
