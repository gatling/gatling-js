import util from "util";
export default util;
export var _extend = util._extend;
export var callbackify = util.callbackify;
export var debuglog = util.debuglog;
export var deprecate = util.deprecate;
export var format = util.format;
export var inherits = util.inherits;
export var inspect = util.inspect;
export var isArray = util.isArray;
export var isBoolean = util.isBoolean;
export var isBuffer = util.isBuffer;
export var isDate = util.isDate;
export var isError = util.isError;
export var isFunction = util.isFunction;
export var isNull = util.isNull;
export var isNullOrUndefined = util.isNullOrUndefined;
export var isNumber = util.isNumber;
export var isObject = util.isObject;
export var isPrimitive = util.isPrimitive;
export var isRegExp = util.isRegExp;
export var isString = util.isString;
export var isSymbol = util.isSymbol;
export var isUndefined = util.isUndefined;
export var log = util.log;
export var promisify = util.promisify;
export var types = util.types;

export const TextEncoder = (util.TextEncoder = globalThis.TextEncoder);
export const TextDecoder = (util.TextDecoder = globalThis.TextDecoder);
