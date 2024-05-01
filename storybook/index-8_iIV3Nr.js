import { _ as __toESM, a as __commonJS } from './chunk-DANUECVT-CT6BCriE.js';

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol = root_default.Symbol;
var Symbol_default = Symbol;

// node_modules/lodash-es/_getRawTag.js
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
var nativeObjectToString = objectProto$3.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$3.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2$3 = Object.prototype;
var nativeObjectToString2 = objectProto2$3.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag$1 = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto$2 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty$2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_Map.js
var Map = getNative_default(root_default, "Map");
var Map_default = Map;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto2$2 = Object.prototype;
var hasOwnProperty2$2 = objectProto2$2.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty2$2.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto3$1 = Object.prototype;
var hasOwnProperty3$1 = objectProto3$1.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty3$1.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/_Set.js
var Set = getNative_default(root_default, "Set");
var Set_default = Set;

// node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty_default = defineProperty;

// node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag$1 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag$1;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty$1.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag$1 = "[object Array]";
var boolTag$1 = "[object Boolean]";
var dateTag$1 = "[object Date]";
var errorTag$1 = "[object Error]";
var funcTag = "[object Function]";
var mapTag$1 = "[object Map]";
var numberTag$1 = "[object Number]";
var objectTag$1 = "[object Object]";
var regexpTag$1 = "[object RegExp]";
var setTag$1 = "[object Set]";
var stringTag$1 = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]";
var dataViewTag$1 = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto2$1 = Object.prototype;
var hasOwnProperty2$1 = objectProto2$1.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty2$1.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_isPrototype.js
var objectProto3 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto3;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty3.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto5 = Object.prototype;
var propertyIsEnumerable2 = objectProto5.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView");
var DataView_default = DataView;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_WeakMap.js
var WeakMap = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap;

// node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array = root_default.Uint8Array;
var Uint8Array_default = Uint8Array;

// node_modules/lodash-es/isSymbol.js
var symbolTag$1 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag$1;
}
var isSymbol_default = isSymbol;

// node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/lodash-es/_SetCache.js
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default = arrayMap;

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq_default(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray_default;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var objectTag = "[object Object]";
var objectProto2 = Object.prototype;
var hasOwnProperty2 = objectProto2.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag : getTag_default(object), othTag = othIsArr ? arrayTag : getTag_default(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
var getMatchData_default = getMatchData;

// node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var memoizeCapped_default = memoizeCapped;

// node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath_default = stringToPath;

// node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto2 ? symbolProto2.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var baseToString_default = baseToString;

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// node_modules/lodash-es/_toKey.js
var INFINITY2 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
}
var toKey_default = toKey;

// node_modules/lodash-es/_baseGet.js
function baseGet(object, path) {
  path = castPath_default(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey_default(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default = baseGet;

// node_modules/lodash-es/get.js
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_default = get;

// node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// node_modules/lodash-es/_hasPath.js
function hasPath(object, path, hasFunc) {
  path = castPath_default(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey_default(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// node_modules/lodash-es/hasIn.js
function hasIn(object, path) {
  return object != null && hasPath_default(object, path, baseHasIn_default);
}
var hasIn_default = hasIn;

// node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey_default(path) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path) {
  return function(object) {
    return baseGet_default(object, path);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// node_modules/lodash-es/property.js
function property(path) {
  return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
}
var property_default = property;

// node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// node_modules/esutils/lib/ast.js
var require_ast = __commonJS({
  "node_modules/esutils/lib/ast.js"(exports, module) {
    (function() {
      function isExpression(node) {
        if (node == null) {
          return false;
        }
        switch (node.type) {
          case "ArrayExpression":
          case "AssignmentExpression":
          case "BinaryExpression":
          case "CallExpression":
          case "ConditionalExpression":
          case "FunctionExpression":
          case "Identifier":
          case "Literal":
          case "LogicalExpression":
          case "MemberExpression":
          case "NewExpression":
          case "ObjectExpression":
          case "SequenceExpression":
          case "ThisExpression":
          case "UnaryExpression":
          case "UpdateExpression":
            return true;
        }
        return false;
      }
      function isIterationStatement(node) {
        if (node == null) {
          return false;
        }
        switch (node.type) {
          case "DoWhileStatement":
          case "ForInStatement":
          case "ForStatement":
          case "WhileStatement":
            return true;
        }
        return false;
      }
      function isStatement(node) {
        if (node == null) {
          return false;
        }
        switch (node.type) {
          case "BlockStatement":
          case "BreakStatement":
          case "ContinueStatement":
          case "DebuggerStatement":
          case "DoWhileStatement":
          case "EmptyStatement":
          case "ExpressionStatement":
          case "ForInStatement":
          case "ForStatement":
          case "IfStatement":
          case "LabeledStatement":
          case "ReturnStatement":
          case "SwitchStatement":
          case "ThrowStatement":
          case "TryStatement":
          case "VariableDeclaration":
          case "WhileStatement":
          case "WithStatement":
            return true;
        }
        return false;
      }
      function isSourceElement(node) {
        return isStatement(node) || node != null && node.type === "FunctionDeclaration";
      }
      function trailingStatement(node) {
        switch (node.type) {
          case "IfStatement":
            if (node.alternate != null) {
              return node.alternate;
            }
            return node.consequent;
          case "LabeledStatement":
          case "ForStatement":
          case "ForInStatement":
          case "WhileStatement":
          case "WithStatement":
            return node.body;
        }
        return null;
      }
      function isProblematicIfStatement(node) {
        var current;
        if (node.type !== "IfStatement") {
          return false;
        }
        if (node.alternate == null) {
          return false;
        }
        current = node.consequent;
        do {
          if (current.type === "IfStatement") {
            if (current.alternate == null) {
              return true;
            }
          }
          current = trailingStatement(current);
        } while (current);
        return false;
      }
      module.exports = {
        isExpression,
        isStatement,
        isIterationStatement,
        isSourceElement,
        isProblematicIfStatement,
        trailingStatement
      };
    })();
  }
});

// node_modules/esutils/lib/code.js
var require_code = __commonJS({
  "node_modules/esutils/lib/code.js"(exports, module) {
    (function() {
      var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;
      ES5Regex = {
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
      };
      ES6Regex = {
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
      };
      function isDecimalDigit(ch2) {
        return 48 <= ch2 && ch2 <= 57;
      }
      function isHexDigit(ch2) {
        return 48 <= ch2 && ch2 <= 57 || // 0..9
        97 <= ch2 && ch2 <= 102 || // a..f
        65 <= ch2 && ch2 <= 70;
      }
      function isOctalDigit(ch2) {
        return ch2 >= 48 && ch2 <= 55;
      }
      NON_ASCII_WHITESPACES = [
        5760,
        8192,
        8193,
        8194,
        8195,
        8196,
        8197,
        8198,
        8199,
        8200,
        8201,
        8202,
        8239,
        8287,
        12288,
        65279
      ];
      function isWhiteSpace(ch2) {
        return ch2 === 32 || ch2 === 9 || ch2 === 11 || ch2 === 12 || ch2 === 160 || ch2 >= 5760 && NON_ASCII_WHITESPACES.indexOf(ch2) >= 0;
      }
      function isLineTerminator(ch2) {
        return ch2 === 10 || ch2 === 13 || ch2 === 8232 || ch2 === 8233;
      }
      function fromCodePoint(cp) {
        if (cp <= 65535) {
          return String.fromCharCode(cp);
        }
        var cu1 = String.fromCharCode(Math.floor((cp - 65536) / 1024) + 55296);
        var cu2 = String.fromCharCode((cp - 65536) % 1024 + 56320);
        return cu1 + cu2;
      }
      IDENTIFIER_START = new Array(128);
      for (ch = 0; ch < 128; ++ch) {
        IDENTIFIER_START[ch] = ch >= 97 && ch <= 122 || // a..z
        ch >= 65 && ch <= 90 || // A..Z
        ch === 36 || ch === 95;
      }
      IDENTIFIER_PART = new Array(128);
      for (ch = 0; ch < 128; ++ch) {
        IDENTIFIER_PART[ch] = ch >= 97 && ch <= 122 || // a..z
        ch >= 65 && ch <= 90 || // A..Z
        ch >= 48 && ch <= 57 || // 0..9
        ch === 36 || ch === 95;
      }
      function isIdentifierStartES5(ch2) {
        return ch2 < 128 ? IDENTIFIER_START[ch2] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch2));
      }
      function isIdentifierPartES5(ch2) {
        return ch2 < 128 ? IDENTIFIER_PART[ch2] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch2));
      }
      function isIdentifierStartES6(ch2) {
        return ch2 < 128 ? IDENTIFIER_START[ch2] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch2));
      }
      function isIdentifierPartES6(ch2) {
        return ch2 < 128 ? IDENTIFIER_PART[ch2] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch2));
      }
      module.exports = {
        isDecimalDigit,
        isHexDigit,
        isOctalDigit,
        isWhiteSpace,
        isLineTerminator,
        isIdentifierStartES5,
        isIdentifierPartES5,
        isIdentifierStartES6,
        isIdentifierPartES6
      };
    })();
  }
});

// node_modules/esutils/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/esutils/lib/keyword.js"(exports, module) {
    (function() {
      var code = require_code();
      function isStrictModeReservedWordES6(id) {
        switch (id) {
          case "implements":
          case "interface":
          case "package":
          case "private":
          case "protected":
          case "public":
          case "static":
          case "let":
            return true;
          default:
            return false;
        }
      }
      function isKeywordES5(id, strict) {
        if (!strict && id === "yield") {
          return false;
        }
        return isKeywordES6(id, strict);
      }
      function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
          return true;
        }
        switch (id.length) {
          case 2:
            return id === "if" || id === "in" || id === "do";
          case 3:
            return id === "var" || id === "for" || id === "new" || id === "try";
          case 4:
            return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum";
          case 5:
            return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "const" || id === "yield" || id === "class" || id === "super";
          case 6:
            return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "export" || id === "import";
          case 7:
            return id === "default" || id === "finally" || id === "extends";
          case 8:
            return id === "function" || id === "continue" || id === "debugger";
          case 10:
            return id === "instanceof";
          default:
            return false;
        }
      }
      function isReservedWordES5(id, strict) {
        return id === "null" || id === "true" || id === "false" || isKeywordES5(id, strict);
      }
      function isReservedWordES6(id, strict) {
        return id === "null" || id === "true" || id === "false" || isKeywordES6(id, strict);
      }
      function isRestrictedWord(id) {
        return id === "eval" || id === "arguments";
      }
      function isIdentifierNameES5(id) {
        var i, iz, ch;
        if (id.length === 0) {
          return false;
        }
        ch = id.charCodeAt(0);
        if (!code.isIdentifierStartES5(ch)) {
          return false;
        }
        for (i = 1, iz = id.length; i < iz; ++i) {
          ch = id.charCodeAt(i);
          if (!code.isIdentifierPartES5(ch)) {
            return false;
          }
        }
        return true;
      }
      function decodeUtf16(lead, trail) {
        return (lead - 55296) * 1024 + (trail - 56320) + 65536;
      }
      function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;
        if (id.length === 0) {
          return false;
        }
        check = code.isIdentifierStartES6;
        for (i = 0, iz = id.length; i < iz; ++i) {
          ch = id.charCodeAt(i);
          if (55296 <= ch && ch <= 56319) {
            ++i;
            if (i >= iz) {
              return false;
            }
            lowCh = id.charCodeAt(i);
            if (!(56320 <= lowCh && lowCh <= 57343)) {
              return false;
            }
            ch = decodeUtf16(ch, lowCh);
          }
          if (!check(ch)) {
            return false;
          }
          check = code.isIdentifierPartES6;
        }
        return true;
      }
      function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
      }
      function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
      }
      module.exports = {
        isKeywordES5,
        isKeywordES6,
        isReservedWordES5,
        isReservedWordES6,
        isRestrictedWord,
        isIdentifierNameES5,
        isIdentifierNameES6,
        isIdentifierES5,
        isIdentifierES6
      };
    })();
  }
});

// node_modules/esutils/lib/utils.js
var require_utils = __commonJS({
  "node_modules/esutils/lib/utils.js"(exports) {
    (function() {
      exports.ast = require_ast();
      exports.code = require_code();
      exports.keyword = require_keyword();
    })();
  }
});

// node_modules/doctrine/package.json
var require_package = __commonJS({
  "node_modules/doctrine/package.json"(exports, module) {
    module.exports = {
      name: "doctrine",
      description: "JSDoc parser",
      homepage: "https://github.com/eslint/doctrine",
      main: "lib/doctrine.js",
      version: "3.0.0",
      engines: {
        node: ">=6.0.0"
      },
      directories: {
        lib: "./lib"
      },
      files: [
        "lib"
      ],
      maintainers: [
        {
          name: "Nicholas C. Zakas",
          email: "nicholas+npm@nczconsulting.com",
          web: "https://www.nczonline.net"
        },
        {
          name: "Yusuke Suzuki",
          email: "utatane.tea@gmail.com",
          web: "https://github.com/Constellation"
        }
      ],
      repository: "eslint/doctrine",
      devDependencies: {
        coveralls: "^3.0.1",
        dateformat: "^1.0.11",
        eslint: "^1.10.3",
        "eslint-release": "^1.0.0",
        linefix: "^0.1.1",
        mocha: "^3.4.2",
        "npm-license": "^0.3.1",
        nyc: "^10.3.2",
        semver: "^5.0.3",
        shelljs: "^0.5.3",
        "shelljs-nodecli": "^0.1.1",
        should: "^5.0.1"
      },
      license: "Apache-2.0",
      scripts: {
        pretest: "npm run lint",
        test: "nyc mocha",
        coveralls: "nyc report --reporter=text-lcov | coveralls",
        lint: "eslint lib/",
        "generate-release": "eslint-generate-release",
        "generate-alpharelease": "eslint-generate-prerelease alpha",
        "generate-betarelease": "eslint-generate-prerelease beta",
        "generate-rcrelease": "eslint-generate-prerelease rc",
        "publish-release": "eslint-publish-release"
      },
      dependencies: {
        esutils: "^2.0.2"
      }
    };
  }
});

// node_modules/browser-assert/lib/assert.js
var require_assert = __commonJS({
  "node_modules/browser-assert/lib/assert.js"(exports, module) {
    function assert(expr, message) {
      if (!Boolean(expr)) {
        throw new Error(message || "unknown assertion error");
      }
    }
    module.exports = assert;
  }
});

// node_modules/doctrine/lib/utility.js
var require_utility = __commonJS({
  "node_modules/doctrine/lib/utility.js"(exports) {
    (function() {
      var VERSION;
      VERSION = require_package().version;
      exports.VERSION = VERSION;
      function DoctrineError(message) {
        this.name = "DoctrineError";
        this.message = message;
      }
      DoctrineError.prototype = function() {
        var Middle = function() {
        };
        Middle.prototype = Error.prototype;
        return new Middle();
      }();
      DoctrineError.prototype.constructor = DoctrineError;
      exports.DoctrineError = DoctrineError;
      function throwError(message) {
        throw new DoctrineError(message);
      }
      exports.throwError = throwError;
      exports.assert = require_assert();
    })();
  }
});

// node_modules/doctrine/lib/typed.js
var require_typed = __commonJS({
  "node_modules/doctrine/lib/typed.js"(exports) {
    (function() {
      var Syntax2, Token, source, length, index, previous, token, value, esutils, utility, rangeOffset, addRange;
      esutils = require_utils();
      utility = require_utility();
      Syntax2 = {
        NullableLiteral: "NullableLiteral",
        AllLiteral: "AllLiteral",
        NullLiteral: "NullLiteral",
        UndefinedLiteral: "UndefinedLiteral",
        VoidLiteral: "VoidLiteral",
        UnionType: "UnionType",
        ArrayType: "ArrayType",
        RecordType: "RecordType",
        FieldType: "FieldType",
        FunctionType: "FunctionType",
        ParameterType: "ParameterType",
        RestType: "RestType",
        NonNullableType: "NonNullableType",
        OptionalType: "OptionalType",
        NullableType: "NullableType",
        NameExpression: "NameExpression",
        TypeApplication: "TypeApplication",
        StringLiteralType: "StringLiteralType",
        NumericLiteralType: "NumericLiteralType",
        BooleanLiteralType: "BooleanLiteralType"
      };
      Token = {
        ILLEGAL: 0,
        // ILLEGAL
        DOT_LT: 1,
        // .<
        REST: 2,
        // ...
        LT: 3,
        // <
        GT: 4,
        // >
        LPAREN: 5,
        // (
        RPAREN: 6,
        // )
        LBRACE: 7,
        // {
        RBRACE: 8,
        // }
        LBRACK: 9,
        // [
        RBRACK: 10,
        // ]
        COMMA: 11,
        // ,
        COLON: 12,
        // :
        STAR: 13,
        // *
        PIPE: 14,
        // |
        QUESTION: 15,
        // ?
        BANG: 16,
        // !
        EQUAL: 17,
        // =
        NAME: 18,
        // name token
        STRING: 19,
        // string
        NUMBER: 20,
        // number
        EOF: 21
      };
      function isTypeName(ch) {
        return "><(){}[],:*|?!=".indexOf(String.fromCharCode(ch)) === -1 && !esutils.code.isWhiteSpace(ch) && !esutils.code.isLineTerminator(ch);
      }
      function Context(previous2, index2, token2, value2) {
        this._previous = previous2;
        this._index = index2;
        this._token = token2;
        this._value = value2;
      }
      Context.prototype.restore = function() {
        previous = this._previous;
        index = this._index;
        token = this._token;
        value = this._value;
      };
      Context.save = function() {
        return new Context(previous, index, token, value);
      };
      function maybeAddRange(node, range) {
        if (addRange) {
          node.range = [range[0] + rangeOffset, range[1] + rangeOffset];
        }
        return node;
      }
      function advance() {
        var ch = source.charAt(index);
        index += 1;
        return ch;
      }
      function scanHexEscape(prefix) {
        var i, len, ch, code = 0;
        len = prefix === "u" ? 4 : 2;
        for (i = 0; i < len; ++i) {
          if (index < length && esutils.code.isHexDigit(source.charCodeAt(index))) {
            ch = advance();
            code = code * 16 + "0123456789abcdef".indexOf(ch.toLowerCase());
          } else {
            return "";
          }
        }
        return String.fromCharCode(code);
      }
      function scanString() {
        var str = "", quote, ch, code, unescaped, restore;
        quote = source.charAt(index);
        ++index;
        while (index < length) {
          ch = advance();
          if (ch === quote) {
            quote = "";
            break;
          } else if (ch === "\\") {
            ch = advance();
            if (!esutils.code.isLineTerminator(ch.charCodeAt(0))) {
              switch (ch) {
                case "n":
                  str += "\n";
                  break;
                case "r":
                  str += "\r";
                  break;
                case "t":
                  str += "	";
                  break;
                case "u":
                case "x":
                  restore = index;
                  unescaped = scanHexEscape(ch);
                  if (unescaped) {
                    str += unescaped;
                  } else {
                    index = restore;
                    str += ch;
                  }
                  break;
                case "b":
                  str += "\b";
                  break;
                case "f":
                  str += "\f";
                  break;
                case "v":
                  str += "\v";
                  break;
                default:
                  if (esutils.code.isOctalDigit(ch.charCodeAt(0))) {
                    code = "01234567".indexOf(ch);
                    if (index < length && esutils.code.isOctalDigit(source.charCodeAt(index))) {
                      code = code * 8 + "01234567".indexOf(advance());
                      if ("0123".indexOf(ch) >= 0 && index < length && esutils.code.isOctalDigit(source.charCodeAt(index))) {
                        code = code * 8 + "01234567".indexOf(advance());
                      }
                    }
                    str += String.fromCharCode(code);
                  } else {
                    str += ch;
                  }
                  break;
              }
            } else {
              if (ch === "\r" && source.charCodeAt(index) === 10) {
                ++index;
              }
            }
          } else if (esutils.code.isLineTerminator(ch.charCodeAt(0))) {
            break;
          } else {
            str += ch;
          }
        }
        if (quote !== "") {
          utility.throwError("unexpected quote");
        }
        value = str;
        return Token.STRING;
      }
      function scanNumber() {
        var number, ch;
        number = "";
        ch = source.charCodeAt(index);
        if (ch !== 46) {
          number = advance();
          ch = source.charCodeAt(index);
          if (number === "0") {
            if (ch === 120 || ch === 88) {
              number += advance();
              while (index < length) {
                ch = source.charCodeAt(index);
                if (!esutils.code.isHexDigit(ch)) {
                  break;
                }
                number += advance();
              }
              if (number.length <= 2) {
                utility.throwError("unexpected token");
              }
              if (index < length) {
                ch = source.charCodeAt(index);
                if (esutils.code.isIdentifierStartES5(ch)) {
                  utility.throwError("unexpected token");
                }
              }
              value = parseInt(number, 16);
              return Token.NUMBER;
            }
            if (esutils.code.isOctalDigit(ch)) {
              number += advance();
              while (index < length) {
                ch = source.charCodeAt(index);
                if (!esutils.code.isOctalDigit(ch)) {
                  break;
                }
                number += advance();
              }
              if (index < length) {
                ch = source.charCodeAt(index);
                if (esutils.code.isIdentifierStartES5(ch) || esutils.code.isDecimalDigit(ch)) {
                  utility.throwError("unexpected token");
                }
              }
              value = parseInt(number, 8);
              return Token.NUMBER;
            }
            if (esutils.code.isDecimalDigit(ch)) {
              utility.throwError("unexpected token");
            }
          }
          while (index < length) {
            ch = source.charCodeAt(index);
            if (!esutils.code.isDecimalDigit(ch)) {
              break;
            }
            number += advance();
          }
        }
        if (ch === 46) {
          number += advance();
          while (index < length) {
            ch = source.charCodeAt(index);
            if (!esutils.code.isDecimalDigit(ch)) {
              break;
            }
            number += advance();
          }
        }
        if (ch === 101 || ch === 69) {
          number += advance();
          ch = source.charCodeAt(index);
          if (ch === 43 || ch === 45) {
            number += advance();
          }
          ch = source.charCodeAt(index);
          if (esutils.code.isDecimalDigit(ch)) {
            number += advance();
            while (index < length) {
              ch = source.charCodeAt(index);
              if (!esutils.code.isDecimalDigit(ch)) {
                break;
              }
              number += advance();
            }
          } else {
            utility.throwError("unexpected token");
          }
        }
        if (index < length) {
          ch = source.charCodeAt(index);
          if (esutils.code.isIdentifierStartES5(ch)) {
            utility.throwError("unexpected token");
          }
        }
        value = parseFloat(number);
        return Token.NUMBER;
      }
      function scanTypeName() {
        var ch, ch2;
        value = advance();
        while (index < length && isTypeName(source.charCodeAt(index))) {
          ch = source.charCodeAt(index);
          if (ch === 46) {
            if (index + 1 >= length) {
              return Token.ILLEGAL;
            }
            ch2 = source.charCodeAt(index + 1);
            if (ch2 === 60) {
              break;
            }
          }
          value += advance();
        }
        return Token.NAME;
      }
      function next() {
        var ch;
        previous = index;
        while (index < length && esutils.code.isWhiteSpace(source.charCodeAt(index))) {
          advance();
        }
        if (index >= length) {
          token = Token.EOF;
          return token;
        }
        ch = source.charCodeAt(index);
        switch (ch) {
          case 39:
          case 34:
            token = scanString();
            return token;
          case 58:
            advance();
            token = Token.COLON;
            return token;
          case 44:
            advance();
            token = Token.COMMA;
            return token;
          case 40:
            advance();
            token = Token.LPAREN;
            return token;
          case 41:
            advance();
            token = Token.RPAREN;
            return token;
          case 91:
            advance();
            token = Token.LBRACK;
            return token;
          case 93:
            advance();
            token = Token.RBRACK;
            return token;
          case 123:
            advance();
            token = Token.LBRACE;
            return token;
          case 125:
            advance();
            token = Token.RBRACE;
            return token;
          case 46:
            if (index + 1 < length) {
              ch = source.charCodeAt(index + 1);
              if (ch === 60) {
                advance();
                advance();
                token = Token.DOT_LT;
                return token;
              }
              if (ch === 46 && index + 2 < length && source.charCodeAt(index + 2) === 46) {
                advance();
                advance();
                advance();
                token = Token.REST;
                return token;
              }
              if (esutils.code.isDecimalDigit(ch)) {
                token = scanNumber();
                return token;
              }
            }
            token = Token.ILLEGAL;
            return token;
          case 60:
            advance();
            token = Token.LT;
            return token;
          case 62:
            advance();
            token = Token.GT;
            return token;
          case 42:
            advance();
            token = Token.STAR;
            return token;
          case 124:
            advance();
            token = Token.PIPE;
            return token;
          case 63:
            advance();
            token = Token.QUESTION;
            return token;
          case 33:
            advance();
            token = Token.BANG;
            return token;
          case 61:
            advance();
            token = Token.EQUAL;
            return token;
          case 45:
            token = scanNumber();
            return token;
          default:
            if (esutils.code.isDecimalDigit(ch)) {
              token = scanNumber();
              return token;
            }
            utility.assert(isTypeName(ch));
            token = scanTypeName();
            return token;
        }
      }
      function consume(target, text) {
        utility.assert(token === target, text || "consumed token not matched");
        next();
      }
      function expect(target, message) {
        if (token !== target) {
          utility.throwError(message || "unexpected token");
        }
        next();
      }
      function parseUnionType() {
        var elements, startIndex = index - 1;
        consume(Token.LPAREN, "UnionType should start with (");
        elements = [];
        if (token !== Token.RPAREN) {
          while (true) {
            elements.push(parseTypeExpression());
            if (token === Token.RPAREN) {
              break;
            }
            expect(Token.PIPE);
          }
        }
        consume(Token.RPAREN, "UnionType should end with )");
        return maybeAddRange({
          type: Syntax2.UnionType,
          elements
        }, [startIndex, previous]);
      }
      function parseArrayType() {
        var elements, startIndex = index - 1, restStartIndex;
        consume(Token.LBRACK, "ArrayType should start with [");
        elements = [];
        while (token !== Token.RBRACK) {
          if (token === Token.REST) {
            restStartIndex = index - 3;
            consume(Token.REST);
            elements.push(maybeAddRange({
              type: Syntax2.RestType,
              expression: parseTypeExpression()
            }, [restStartIndex, previous]));
            break;
          } else {
            elements.push(parseTypeExpression());
          }
          if (token !== Token.RBRACK) {
            expect(Token.COMMA);
          }
        }
        expect(Token.RBRACK);
        return maybeAddRange({
          type: Syntax2.ArrayType,
          elements
        }, [startIndex, previous]);
      }
      function parseFieldName() {
        var v = value;
        if (token === Token.NAME || token === Token.STRING) {
          next();
          return v;
        }
        if (token === Token.NUMBER) {
          consume(Token.NUMBER);
          return String(v);
        }
        utility.throwError("unexpected token");
      }
      function parseFieldType() {
        var key, rangeStart = previous;
        key = parseFieldName();
        if (token === Token.COLON) {
          consume(Token.COLON);
          return maybeAddRange({
            type: Syntax2.FieldType,
            key,
            value: parseTypeExpression()
          }, [rangeStart, previous]);
        }
        return maybeAddRange({
          type: Syntax2.FieldType,
          key,
          value: null
        }, [rangeStart, previous]);
      }
      function parseRecordType() {
        var fields, rangeStart = index - 1, rangeEnd;
        consume(Token.LBRACE, "RecordType should start with {");
        fields = [];
        if (token === Token.COMMA) {
          consume(Token.COMMA);
        } else {
          while (token !== Token.RBRACE) {
            fields.push(parseFieldType());
            if (token !== Token.RBRACE) {
              expect(Token.COMMA);
            }
          }
        }
        rangeEnd = index;
        expect(Token.RBRACE);
        return maybeAddRange({
          type: Syntax2.RecordType,
          fields
        }, [rangeStart, rangeEnd]);
      }
      function parseNameExpression() {
        var name = value, rangeStart = index - name.length;
        expect(Token.NAME);
        if (token === Token.COLON && (name === "module" || name === "external" || name === "event")) {
          consume(Token.COLON);
          name += ":" + value;
          expect(Token.NAME);
        }
        return maybeAddRange({
          type: Syntax2.NameExpression,
          name
        }, [rangeStart, previous]);
      }
      function parseTypeExpressionList() {
        var elements = [];
        elements.push(parseTop());
        while (token === Token.COMMA) {
          consume(Token.COMMA);
          elements.push(parseTop());
        }
        return elements;
      }
      function parseTypeName() {
        var expr, applications, startIndex = index - value.length;
        expr = parseNameExpression();
        if (token === Token.DOT_LT || token === Token.LT) {
          next();
          applications = parseTypeExpressionList();
          expect(Token.GT);
          return maybeAddRange({
            type: Syntax2.TypeApplication,
            expression: expr,
            applications
          }, [startIndex, previous]);
        }
        return expr;
      }
      function parseResultType() {
        consume(Token.COLON, "ResultType should start with :");
        if (token === Token.NAME && value === "void") {
          consume(Token.NAME);
          return {
            type: Syntax2.VoidLiteral
          };
        }
        return parseTypeExpression();
      }
      function parseParametersType() {
        var params = [], optionalSequence = false, expr, rest = false, startIndex, restStartIndex = index - 3, nameStartIndex;
        while (token !== Token.RPAREN) {
          if (token === Token.REST) {
            consume(Token.REST);
            rest = true;
          }
          startIndex = previous;
          expr = parseTypeExpression();
          if (expr.type === Syntax2.NameExpression && token === Token.COLON) {
            nameStartIndex = previous - expr.name.length;
            consume(Token.COLON);
            expr = maybeAddRange({
              type: Syntax2.ParameterType,
              name: expr.name,
              expression: parseTypeExpression()
            }, [nameStartIndex, previous]);
          }
          if (token === Token.EQUAL) {
            consume(Token.EQUAL);
            expr = maybeAddRange({
              type: Syntax2.OptionalType,
              expression: expr
            }, [startIndex, previous]);
            optionalSequence = true;
          } else {
            if (optionalSequence) {
              utility.throwError("unexpected token");
            }
          }
          if (rest) {
            expr = maybeAddRange({
              type: Syntax2.RestType,
              expression: expr
            }, [restStartIndex, previous]);
          }
          params.push(expr);
          if (token !== Token.RPAREN) {
            expect(Token.COMMA);
          }
        }
        return params;
      }
      function parseFunctionType() {
        var isNew, thisBinding, params, result, fnType, startIndex = index - value.length;
        utility.assert(token === Token.NAME && value === "function", "FunctionType should start with 'function'");
        consume(Token.NAME);
        expect(Token.LPAREN);
        isNew = false;
        params = [];
        thisBinding = null;
        if (token !== Token.RPAREN) {
          if (token === Token.NAME && (value === "this" || value === "new")) {
            isNew = value === "new";
            consume(Token.NAME);
            expect(Token.COLON);
            thisBinding = parseTypeName();
            if (token === Token.COMMA) {
              consume(Token.COMMA);
              params = parseParametersType();
            }
          } else {
            params = parseParametersType();
          }
        }
        expect(Token.RPAREN);
        result = null;
        if (token === Token.COLON) {
          result = parseResultType();
        }
        fnType = maybeAddRange({
          type: Syntax2.FunctionType,
          params,
          result
        }, [startIndex, previous]);
        if (thisBinding) {
          fnType["this"] = thisBinding;
          if (isNew) {
            fnType["new"] = true;
          }
        }
        return fnType;
      }
      function parseBasicTypeExpression() {
        var context, startIndex;
        switch (token) {
          case Token.STAR:
            consume(Token.STAR);
            return maybeAddRange({
              type: Syntax2.AllLiteral
            }, [previous - 1, previous]);
          case Token.LPAREN:
            return parseUnionType();
          case Token.LBRACK:
            return parseArrayType();
          case Token.LBRACE:
            return parseRecordType();
          case Token.NAME:
            startIndex = index - value.length;
            if (value === "null") {
              consume(Token.NAME);
              return maybeAddRange({
                type: Syntax2.NullLiteral
              }, [startIndex, previous]);
            }
            if (value === "undefined") {
              consume(Token.NAME);
              return maybeAddRange({
                type: Syntax2.UndefinedLiteral
              }, [startIndex, previous]);
            }
            if (value === "true" || value === "false") {
              consume(Token.NAME);
              return maybeAddRange({
                type: Syntax2.BooleanLiteralType,
                value: value === "true"
              }, [startIndex, previous]);
            }
            context = Context.save();
            if (value === "function") {
              try {
                return parseFunctionType();
              } catch (e) {
                context.restore();
              }
            }
            return parseTypeName();
          case Token.STRING:
            next();
            return maybeAddRange({
              type: Syntax2.StringLiteralType,
              value
            }, [previous - value.length - 2, previous]);
          case Token.NUMBER:
            next();
            return maybeAddRange({
              type: Syntax2.NumericLiteralType,
              value
            }, [previous - String(value).length, previous]);
          default:
            utility.throwError("unexpected token");
        }
      }
      function parseTypeExpression() {
        var expr, rangeStart;
        if (token === Token.QUESTION) {
          rangeStart = index - 1;
          consume(Token.QUESTION);
          if (token === Token.COMMA || token === Token.EQUAL || token === Token.RBRACE || token === Token.RPAREN || token === Token.PIPE || token === Token.EOF || token === Token.RBRACK || token === Token.GT) {
            return maybeAddRange({
              type: Syntax2.NullableLiteral
            }, [rangeStart, previous]);
          }
          return maybeAddRange({
            type: Syntax2.NullableType,
            expression: parseBasicTypeExpression(),
            prefix: true
          }, [rangeStart, previous]);
        } else if (token === Token.BANG) {
          rangeStart = index - 1;
          consume(Token.BANG);
          return maybeAddRange({
            type: Syntax2.NonNullableType,
            expression: parseBasicTypeExpression(),
            prefix: true
          }, [rangeStart, previous]);
        } else {
          rangeStart = previous;
        }
        expr = parseBasicTypeExpression();
        if (token === Token.BANG) {
          consume(Token.BANG);
          return maybeAddRange({
            type: Syntax2.NonNullableType,
            expression: expr,
            prefix: false
          }, [rangeStart, previous]);
        }
        if (token === Token.QUESTION) {
          consume(Token.QUESTION);
          return maybeAddRange({
            type: Syntax2.NullableType,
            expression: expr,
            prefix: false
          }, [rangeStart, previous]);
        }
        if (token === Token.LBRACK) {
          consume(Token.LBRACK);
          expect(Token.RBRACK, "expected an array-style type declaration (" + value + "[])");
          return maybeAddRange({
            type: Syntax2.TypeApplication,
            expression: maybeAddRange({
              type: Syntax2.NameExpression,
              name: "Array"
            }, [rangeStart, previous]),
            applications: [expr]
          }, [rangeStart, previous]);
        }
        return expr;
      }
      function parseTop() {
        var expr, elements;
        expr = parseTypeExpression();
        if (token !== Token.PIPE) {
          return expr;
        }
        elements = [expr];
        consume(Token.PIPE);
        while (true) {
          elements.push(parseTypeExpression());
          if (token !== Token.PIPE) {
            break;
          }
          consume(Token.PIPE);
        }
        return maybeAddRange({
          type: Syntax2.UnionType,
          elements
        }, [0, index]);
      }
      function parseTopParamType() {
        var expr;
        if (token === Token.REST) {
          consume(Token.REST);
          return maybeAddRange({
            type: Syntax2.RestType,
            expression: parseTop()
          }, [0, index]);
        }
        expr = parseTop();
        if (token === Token.EQUAL) {
          consume(Token.EQUAL);
          return maybeAddRange({
            type: Syntax2.OptionalType,
            expression: expr
          }, [0, index]);
        }
        return expr;
      }
      function parseType2(src, opt) {
        var expr;
        source = src;
        length = source.length;
        index = 0;
        previous = 0;
        addRange = opt && opt.range;
        rangeOffset = opt && opt.startIndex || 0;
        next();
        expr = parseTop();
        if (opt && opt.midstream) {
          return {
            expression: expr,
            index: previous
          };
        }
        if (token !== Token.EOF) {
          utility.throwError("not reach to EOF");
        }
        return expr;
      }
      function parseParamType2(src, opt) {
        var expr;
        source = src;
        length = source.length;
        index = 0;
        previous = 0;
        addRange = opt && opt.range;
        rangeOffset = opt && opt.startIndex || 0;
        next();
        expr = parseTopParamType();
        if (opt && opt.midstream) {
          return {
            expression: expr,
            index: previous
          };
        }
        if (token !== Token.EOF) {
          utility.throwError("not reach to EOF");
        }
        return expr;
      }
      function stringifyImpl(node, compact, topLevel) {
        var result, i, iz;
        switch (node.type) {
          case Syntax2.NullableLiteral:
            result = "?";
            break;
          case Syntax2.AllLiteral:
            result = "*";
            break;
          case Syntax2.NullLiteral:
            result = "null";
            break;
          case Syntax2.UndefinedLiteral:
            result = "undefined";
            break;
          case Syntax2.VoidLiteral:
            result = "void";
            break;
          case Syntax2.UnionType:
            if (!topLevel) {
              result = "(";
            } else {
              result = "";
            }
            for (i = 0, iz = node.elements.length; i < iz; ++i) {
              result += stringifyImpl(node.elements[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "|" : " | ";
              }
            }
            if (!topLevel) {
              result += ")";
            }
            break;
          case Syntax2.ArrayType:
            result = "[";
            for (i = 0, iz = node.elements.length; i < iz; ++i) {
              result += stringifyImpl(node.elements[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += "]";
            break;
          case Syntax2.RecordType:
            result = "{";
            for (i = 0, iz = node.fields.length; i < iz; ++i) {
              result += stringifyImpl(node.fields[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += "}";
            break;
          case Syntax2.FieldType:
            if (node.value) {
              result = node.key + (compact ? ":" : ": ") + stringifyImpl(node.value, compact);
            } else {
              result = node.key;
            }
            break;
          case Syntax2.FunctionType:
            result = compact ? "function(" : "function (";
            if (node["this"]) {
              if (node["new"]) {
                result += compact ? "new:" : "new: ";
              } else {
                result += compact ? "this:" : "this: ";
              }
              result += stringifyImpl(node["this"], compact);
              if (node.params.length !== 0) {
                result += compact ? "," : ", ";
              }
            }
            for (i = 0, iz = node.params.length; i < iz; ++i) {
              result += stringifyImpl(node.params[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += ")";
            if (node.result) {
              result += (compact ? ":" : ": ") + stringifyImpl(node.result, compact);
            }
            break;
          case Syntax2.ParameterType:
            result = node.name + (compact ? ":" : ": ") + stringifyImpl(node.expression, compact);
            break;
          case Syntax2.RestType:
            result = "...";
            if (node.expression) {
              result += stringifyImpl(node.expression, compact);
            }
            break;
          case Syntax2.NonNullableType:
            if (node.prefix) {
              result = "!" + stringifyImpl(node.expression, compact);
            } else {
              result = stringifyImpl(node.expression, compact) + "!";
            }
            break;
          case Syntax2.OptionalType:
            result = stringifyImpl(node.expression, compact) + "=";
            break;
          case Syntax2.NullableType:
            if (node.prefix) {
              result = "?" + stringifyImpl(node.expression, compact);
            } else {
              result = stringifyImpl(node.expression, compact) + "?";
            }
            break;
          case Syntax2.NameExpression:
            result = node.name;
            break;
          case Syntax2.TypeApplication:
            result = stringifyImpl(node.expression, compact) + ".<";
            for (i = 0, iz = node.applications.length; i < iz; ++i) {
              result += stringifyImpl(node.applications[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += ">";
            break;
          case Syntax2.StringLiteralType:
            result = '"' + node.value + '"';
            break;
          case Syntax2.NumericLiteralType:
            result = String(node.value);
            break;
          case Syntax2.BooleanLiteralType:
            result = String(node.value);
            break;
          default:
            utility.throwError("Unknown type " + node.type);
        }
        return result;
      }
      function stringify(node, options) {
        if (options == null) {
          options = {};
        }
        return stringifyImpl(node, options.compact, options.topLevel);
      }
      exports.parseType = parseType2;
      exports.parseParamType = parseParamType2;
      exports.stringify = stringify;
      exports.Syntax = Syntax2;
    })();
  }
});

// node_modules/doctrine/lib/doctrine.js
var require_doctrine = __commonJS({
  "node_modules/doctrine/lib/doctrine.js"(exports) {
    (function() {
      var typed, utility, jsdoc, esutils, hasOwnProperty;
      esutils = require_utils();
      typed = require_typed();
      utility = require_utility();
      function sliceSource(source, index, last) {
        return source.slice(index, last);
      }
      hasOwnProperty = /* @__PURE__ */ function() {
        var func = Object.prototype.hasOwnProperty;
        return function hasOwnProperty2(obj, name) {
          return func.call(obj, name);
        };
      }();
      function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            ret[key] = obj[key];
          }
        }
        return ret;
      }
      function isASCIIAlphanumeric(ch) {
        return ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57;
      }
      function isParamTitle(title) {
        return title === "param" || title === "argument" || title === "arg";
      }
      function isReturnTitle(title) {
        return title === "return" || title === "returns";
      }
      function isProperty(title) {
        return title === "property" || title === "prop";
      }
      function isNameParameterRequired(title) {
        return isParamTitle(title) || isProperty(title) || title === "alias" || title === "this" || title === "mixes" || title === "requires";
      }
      function isAllowedName(title) {
        return isNameParameterRequired(title) || title === "const" || title === "constant";
      }
      function isAllowedNested(title) {
        return isProperty(title) || isParamTitle(title);
      }
      function isAllowedOptional(title) {
        return isProperty(title) || isParamTitle(title);
      }
      function isTypeParameterRequired(title) {
        return isParamTitle(title) || isReturnTitle(title) || title === "define" || title === "enum" || title === "implements" || title === "this" || title === "type" || title === "typedef" || isProperty(title);
      }
      function isAllowedType(title) {
        return isTypeParameterRequired(title) || title === "throws" || title === "const" || title === "constant" || title === "namespace" || title === "member" || title === "var" || title === "module" || title === "constructor" || title === "class" || title === "extends" || title === "augments" || title === "public" || title === "private" || title === "protected";
      }
      var WHITESPACE = "[ \\f\\t\\v\\u00a0\\u1680\\u180e\\u2000-\\u200a\\u202f\\u205f\\u3000\\ufeff]";
      var STAR_MATCHER = "(" + WHITESPACE + "*(?:\\*" + WHITESPACE + "?)?)(.+|[\r\n\u2028\u2029])";
      function unwrapComment2(doc) {
        return doc.replace(/^\/\*\*?/, "").replace(/\*\/$/, "").replace(new RegExp(STAR_MATCHER, "g"), "$2").replace(/\s*$/, "");
      }
      function convertUnwrappedCommentIndex(originalSource, unwrappedIndex) {
        var replacedSource = originalSource.replace(/^\/\*\*?/, "");
        var numSkippedChars = 0;
        var matcher = new RegExp(STAR_MATCHER, "g");
        var match;
        while (match = matcher.exec(replacedSource)) {
          numSkippedChars += match[1].length;
          if (match.index + match[0].length > unwrappedIndex + numSkippedChars) {
            return unwrappedIndex + numSkippedChars + originalSource.length - replacedSource.length;
          }
        }
        return originalSource.replace(/\*\/$/, "").replace(/\s*$/, "").length;
      }
      (function(exports2) {
        var Rules, index, lineNumber, length, source, originalSource, recoverable, sloppy, strict;
        function advance() {
          var ch = source.charCodeAt(index);
          index += 1;
          if (esutils.code.isLineTerminator(ch) && !(ch === 13 && source.charCodeAt(index) === 10)) {
            lineNumber += 1;
          }
          return String.fromCharCode(ch);
        }
        function scanTitle() {
          var title = "";
          advance();
          while (index < length && isASCIIAlphanumeric(source.charCodeAt(index))) {
            title += advance();
          }
          return title;
        }
        function seekContent() {
          var ch, waiting, last = index;
          waiting = false;
          while (last < length) {
            ch = source.charCodeAt(last);
            if (esutils.code.isLineTerminator(ch) && !(ch === 13 && source.charCodeAt(last + 1) === 10)) {
              waiting = true;
            } else if (waiting) {
              if (ch === 64) {
                break;
              }
              if (!esutils.code.isWhiteSpace(ch)) {
                waiting = false;
              }
            }
            last += 1;
          }
          return last;
        }
        function parseType2(title, last, addRange) {
          var ch, brace, type2, startIndex, direct = false;
          while (index < last) {
            ch = source.charCodeAt(index);
            if (esutils.code.isWhiteSpace(ch)) {
              advance();
            } else if (ch === 123) {
              advance();
              break;
            } else {
              direct = true;
              break;
            }
          }
          if (direct) {
            return null;
          }
          brace = 1;
          type2 = "";
          while (index < last) {
            ch = source.charCodeAt(index);
            if (esutils.code.isLineTerminator(ch)) {
              advance();
            } else {
              if (ch === 125) {
                brace -= 1;
                if (brace === 0) {
                  advance();
                  break;
                }
              } else if (ch === 123) {
                brace += 1;
              }
              if (type2 === "") {
                startIndex = index;
              }
              type2 += advance();
            }
          }
          if (brace !== 0) {
            return utility.throwError("Braces are not balanced");
          }
          if (isAllowedOptional(title)) {
            return typed.parseParamType(type2, { startIndex: convertIndex(startIndex), range: addRange });
          }
          return typed.parseType(type2, { startIndex: convertIndex(startIndex), range: addRange });
        }
        function scanIdentifier(last) {
          var identifier;
          if (!esutils.code.isIdentifierStartES5(source.charCodeAt(index)) && !source[index].match(/[0-9]/)) {
            return null;
          }
          identifier = advance();
          while (index < last && esutils.code.isIdentifierPartES5(source.charCodeAt(index))) {
            identifier += advance();
          }
          return identifier;
        }
        function skipWhiteSpace(last) {
          while (index < last && (esutils.code.isWhiteSpace(source.charCodeAt(index)) || esutils.code.isLineTerminator(source.charCodeAt(index)))) {
            advance();
          }
        }
        function parseName(last, allowBrackets, allowNestedParams) {
          var name = "", useBrackets, insideString;
          skipWhiteSpace(last);
          if (index >= last) {
            return null;
          }
          if (source.charCodeAt(index) === 91) {
            if (allowBrackets) {
              useBrackets = true;
              name = advance();
            } else {
              return null;
            }
          }
          name += scanIdentifier(last);
          if (allowNestedParams) {
            if (source.charCodeAt(index) === 58 && (name === "module" || name === "external" || name === "event")) {
              name += advance();
              name += scanIdentifier(last);
            }
            if (source.charCodeAt(index) === 91 && source.charCodeAt(index + 1) === 93) {
              name += advance();
              name += advance();
            }
            while (source.charCodeAt(index) === 46 || source.charCodeAt(index) === 47 || source.charCodeAt(index) === 35 || source.charCodeAt(index) === 45 || source.charCodeAt(index) === 126) {
              name += advance();
              name += scanIdentifier(last);
            }
          }
          if (useBrackets) {
            skipWhiteSpace(last);
            if (source.charCodeAt(index) === 61) {
              name += advance();
              skipWhiteSpace(last);
              var ch;
              var bracketDepth = 1;
              while (index < last) {
                ch = source.charCodeAt(index);
                if (esutils.code.isWhiteSpace(ch)) {
                  if (!insideString) {
                    skipWhiteSpace(last);
                    ch = source.charCodeAt(index);
                  }
                }
                if (ch === 39) {
                  if (!insideString) {
                    insideString = "'";
                  } else {
                    if (insideString === "'") {
                      insideString = "";
                    }
                  }
                }
                if (ch === 34) {
                  if (!insideString) {
                    insideString = '"';
                  } else {
                    if (insideString === '"') {
                      insideString = "";
                    }
                  }
                }
                if (ch === 91) {
                  bracketDepth++;
                } else if (ch === 93 && --bracketDepth === 0) {
                  break;
                }
                name += advance();
              }
            }
            skipWhiteSpace(last);
            if (index >= last || source.charCodeAt(index) !== 93) {
              return null;
            }
            name += advance();
          }
          return name;
        }
        function skipToTag() {
          while (index < length && source.charCodeAt(index) !== 64) {
            advance();
          }
          if (index >= length) {
            return false;
          }
          utility.assert(
            source.charCodeAt(index) === 64
            /* '@' */
          );
          return true;
        }
        function convertIndex(rangeIndex) {
          if (source === originalSource) {
            return rangeIndex;
          }
          return convertUnwrappedCommentIndex(originalSource, rangeIndex);
        }
        function TagParser(options, title) {
          this._options = options;
          this._title = title.toLowerCase();
          this._tag = {
            title,
            description: null
          };
          if (this._options.lineNumbers) {
            this._tag.lineNumber = lineNumber;
          }
          this._first = index - title.length - 1;
          this._last = 0;
          this._extra = {};
        }
        TagParser.prototype.addError = function addError(errorText) {
          var args = Array.prototype.slice.call(arguments, 1), msg = errorText.replace(
            /%(\d)/g,
            function(whole, index2) {
              utility.assert(index2 < args.length, "Message reference must be in range");
              return args[index2];
            }
          );
          if (!this._tag.errors) {
            this._tag.errors = [];
          }
          if (strict) {
            utility.throwError(msg);
          }
          this._tag.errors.push(msg);
          return recoverable;
        };
        TagParser.prototype.parseType = function() {
          if (isTypeParameterRequired(this._title)) {
            try {
              this._tag.type = parseType2(this._title, this._last, this._options.range);
              if (!this._tag.type) {
                if (!isParamTitle(this._title) && !isReturnTitle(this._title)) {
                  if (!this.addError("Missing or invalid tag type")) {
                    return false;
                  }
                }
              }
            } catch (error) {
              this._tag.type = null;
              if (!this.addError(error.message)) {
                return false;
              }
            }
          } else if (isAllowedType(this._title)) {
            try {
              this._tag.type = parseType2(this._title, this._last, this._options.range);
            } catch (e) {
            }
          }
          return true;
        };
        TagParser.prototype._parseNamePath = function(optional) {
          var name;
          name = parseName(this._last, sloppy && isAllowedOptional(this._title), true);
          if (!name) {
            if (!optional) {
              if (!this.addError("Missing or invalid tag name")) {
                return false;
              }
            }
          }
          this._tag.name = name;
          return true;
        };
        TagParser.prototype.parseNamePath = function() {
          return this._parseNamePath(false);
        };
        TagParser.prototype.parseNamePathOptional = function() {
          return this._parseNamePath(true);
        };
        TagParser.prototype.parseName = function() {
          var assign, name;
          if (isAllowedName(this._title)) {
            this._tag.name = parseName(this._last, sloppy && isAllowedOptional(this._title), isAllowedNested(this._title));
            if (!this._tag.name) {
              if (!isNameParameterRequired(this._title)) {
                return true;
              }
              if (isParamTitle(this._title) && this._tag.type && this._tag.type.name) {
                this._extra.name = this._tag.type;
                this._tag.name = this._tag.type.name;
                this._tag.type = null;
              } else {
                if (!this.addError("Missing or invalid tag name")) {
                  return false;
                }
              }
            } else {
              name = this._tag.name;
              if (name.charAt(0) === "[" && name.charAt(name.length - 1) === "]") {
                assign = name.substring(1, name.length - 1).split("=");
                if (assign.length > 1) {
                  this._tag["default"] = assign.slice(1).join("=");
                }
                this._tag.name = assign[0];
                if (this._tag.type && this._tag.type.type !== "OptionalType") {
                  this._tag.type = {
                    type: "OptionalType",
                    expression: this._tag.type
                  };
                }
              }
            }
          }
          return true;
        };
        TagParser.prototype.parseDescription = function parseDescription() {
          var description = sliceSource(source, index, this._last).trim();
          if (description) {
            if (/^-\s+/.test(description)) {
              description = description.substring(2);
            }
            this._tag.description = description;
          }
          return true;
        };
        TagParser.prototype.parseCaption = function parseDescription() {
          var description = sliceSource(source, index, this._last).trim();
          var captionStartTag = "<caption>";
          var captionEndTag = "</caption>";
          var captionStart = description.indexOf(captionStartTag);
          var captionEnd = description.indexOf(captionEndTag);
          if (captionStart >= 0 && captionEnd >= 0) {
            this._tag.caption = description.substring(
              captionStart + captionStartTag.length,
              captionEnd
            ).trim();
            this._tag.description = description.substring(captionEnd + captionEndTag.length).trim();
          } else {
            this._tag.description = description;
          }
          return true;
        };
        TagParser.prototype.parseKind = function parseKind() {
          var kind, kinds;
          kinds = {
            "class": true,
            "constant": true,
            "event": true,
            "external": true,
            "file": true,
            "function": true,
            "member": true,
            "mixin": true,
            "module": true,
            "namespace": true,
            "typedef": true
          };
          kind = sliceSource(source, index, this._last).trim();
          this._tag.kind = kind;
          if (!hasOwnProperty(kinds, kind)) {
            if (!this.addError("Invalid kind name '%0'", kind)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.parseAccess = function parseAccess() {
          var access;
          access = sliceSource(source, index, this._last).trim();
          this._tag.access = access;
          if (access !== "private" && access !== "protected" && access !== "public") {
            if (!this.addError("Invalid access name '%0'", access)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.parseThis = function parseThis() {
          var value = sliceSource(source, index, this._last).trim();
          if (value && value.charAt(0) === "{") {
            var gotType = this.parseType();
            if (gotType && this._tag.type.type === "NameExpression" || this._tag.type.type === "UnionType") {
              this._tag.name = this._tag.type.name;
              return true;
            } else {
              return this.addError("Invalid name for this");
            }
          } else {
            return this.parseNamePath();
          }
        };
        TagParser.prototype.parseVariation = function parseVariation() {
          var variation, text;
          text = sliceSource(source, index, this._last).trim();
          variation = parseFloat(text, 10);
          this._tag.variation = variation;
          if (isNaN(variation)) {
            if (!this.addError("Invalid variation '%0'", text)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.ensureEnd = function() {
          var shouldBeEmpty = sliceSource(source, index, this._last).trim();
          if (shouldBeEmpty) {
            if (!this.addError("Unknown content '%0'", shouldBeEmpty)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.epilogue = function epilogue() {
          var description;
          description = this._tag.description;
          if (isAllowedOptional(this._title) && !this._tag.type && description && description.charAt(0) === "[") {
            this._tag.type = this._extra.name;
            if (!this._tag.name) {
              this._tag.name = void 0;
            }
            if (!sloppy) {
              if (!this.addError("Missing or invalid tag name")) {
                return false;
              }
            }
          }
          return true;
        };
        Rules = {
          // http://usejsdoc.org/tags-access.html
          "access": ["parseAccess"],
          // http://usejsdoc.org/tags-alias.html
          "alias": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-augments.html
          "augments": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-constructor.html
          "constructor": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-constructor.html
          "class": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-extends.html
          "extends": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-example.html
          "example": ["parseCaption"],
          // http://usejsdoc.org/tags-deprecated.html
          "deprecated": ["parseDescription"],
          // http://usejsdoc.org/tags-global.html
          "global": ["ensureEnd"],
          // http://usejsdoc.org/tags-inner.html
          "inner": ["ensureEnd"],
          // http://usejsdoc.org/tags-instance.html
          "instance": ["ensureEnd"],
          // http://usejsdoc.org/tags-kind.html
          "kind": ["parseKind"],
          // http://usejsdoc.org/tags-mixes.html
          "mixes": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-mixin.html
          "mixin": ["parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-member.html
          "member": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-method.html
          "method": ["parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-module.html
          "module": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-method.html
          "func": ["parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-method.html
          "function": ["parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-member.html
          "var": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-name.html
          "name": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-namespace.html
          "namespace": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-private.html
          "private": ["parseType", "parseDescription"],
          // http://usejsdoc.org/tags-protected.html
          "protected": ["parseType", "parseDescription"],
          // http://usejsdoc.org/tags-public.html
          "public": ["parseType", "parseDescription"],
          // http://usejsdoc.org/tags-readonly.html
          "readonly": ["ensureEnd"],
          // http://usejsdoc.org/tags-requires.html
          "requires": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-since.html
          "since": ["parseDescription"],
          // http://usejsdoc.org/tags-static.html
          "static": ["ensureEnd"],
          // http://usejsdoc.org/tags-summary.html
          "summary": ["parseDescription"],
          // http://usejsdoc.org/tags-this.html
          "this": ["parseThis", "ensureEnd"],
          // http://usejsdoc.org/tags-todo.html
          "todo": ["parseDescription"],
          // http://usejsdoc.org/tags-typedef.html
          "typedef": ["parseType", "parseNamePathOptional"],
          // http://usejsdoc.org/tags-variation.html
          "variation": ["parseVariation"],
          // http://usejsdoc.org/tags-version.html
          "version": ["parseDescription"]
        };
        TagParser.prototype.parse = function parse3() {
          var i, iz, sequences, method;
          if (!this._title) {
            if (!this.addError("Missing or invalid title")) {
              return null;
            }
          }
          this._last = seekContent(this._title);
          if (this._options.range) {
            this._tag.range = [this._first, source.slice(0, this._last).replace(/\s*$/, "").length].map(convertIndex);
          }
          if (hasOwnProperty(Rules, this._title)) {
            sequences = Rules[this._title];
          } else {
            sequences = ["parseType", "parseName", "parseDescription", "epilogue"];
          }
          for (i = 0, iz = sequences.length; i < iz; ++i) {
            method = sequences[i];
            if (!this[method]()) {
              return null;
            }
          }
          return this._tag;
        };
        function parseTag(options) {
          var title, parser, tag;
          if (!skipToTag()) {
            return null;
          }
          title = scanTitle();
          parser = new TagParser(options, title);
          tag = parser.parse();
          while (index < parser._last) {
            advance();
          }
          return tag;
        }
        function scanJSDocDescription(preserveWhitespace) {
          var description = "", ch, atAllowed;
          atAllowed = true;
          while (index < length) {
            ch = source.charCodeAt(index);
            if (atAllowed && ch === 64) {
              break;
            }
            if (esutils.code.isLineTerminator(ch)) {
              atAllowed = true;
            } else if (atAllowed && !esutils.code.isWhiteSpace(ch)) {
              atAllowed = false;
            }
            description += advance();
          }
          return preserveWhitespace ? description : description.trim();
        }
        function parse2(comment, options) {
          var tags = [], tag, description, interestingTags, i, iz;
          if (options === void 0) {
            options = {};
          }
          if (typeof options.unwrap === "boolean" && options.unwrap) {
            source = unwrapComment2(comment);
          } else {
            source = comment;
          }
          originalSource = comment;
          if (options.tags) {
            if (Array.isArray(options.tags)) {
              interestingTags = {};
              for (i = 0, iz = options.tags.length; i < iz; i++) {
                if (typeof options.tags[i] === "string") {
                  interestingTags[options.tags[i]] = true;
                } else {
                  utility.throwError('Invalid "tags" parameter: ' + options.tags);
                }
              }
            } else {
              utility.throwError('Invalid "tags" parameter: ' + options.tags);
            }
          }
          length = source.length;
          index = 0;
          lineNumber = 0;
          recoverable = options.recoverable;
          sloppy = options.sloppy;
          strict = options.strict;
          description = scanJSDocDescription(options.preserveWhitespace);
          while (true) {
            tag = parseTag(options);
            if (!tag) {
              break;
            }
            if (!interestingTags || interestingTags.hasOwnProperty(tag.title)) {
              tags.push(tag);
            }
          }
          return {
            description,
            tags
          };
        }
        exports2.parse = parse2;
      })(jsdoc = {});
      exports.version = utility.VERSION;
      exports.parse = jsdoc.parse;
      exports.parseType = typed.parseType;
      exports.parseParamType = typed.parseParamType;
      exports.unwrapComment = unwrapComment2;
      exports.Syntax = shallowCopy(typed.Syntax);
      exports.Error = utility.DoctrineError;
      exports.type = {
        Syntax: exports.Syntax,
        parseType: typed.parseType,
        parseParamType: typed.parseParamType,
        stringify: typed.stringify
      };
    })();
  }
});

// commonjs-named-exports:doctrine
var import_doctrine = __toESM(require_doctrine());
import_doctrine.Error;
import_doctrine.Syntax;
import_doctrine.default;
import_doctrine.parse;
import_doctrine.parseParamType;
import_doctrine.parseType;
import_doctrine.type;
import_doctrine.unwrapComment;
import_doctrine.version;

var TypeSystem=(TypeSystem2=>(TypeSystem2.JAVASCRIPT="JavaScript",TypeSystem2.FLOW="Flow",TypeSystem2.TYPESCRIPT="TypeScript",TypeSystem2.UNKNOWN="Unknown",TypeSystem2))(TypeSystem||{});var str=obj=>{if(!obj)return "";if(typeof obj=="string")return obj;throw new Error(`Description: expected string, got: ${JSON.stringify(obj)}`)};var enhanceArgTypes=context=>{let{component,argTypes:userArgTypes,parameters:{docs={}}}=context,{extractArgTypes}=docs,extractedArgTypes=extractArgTypes&&component?extractArgTypes(component):{};return extractedArgTypes?__STORYBOOK_MODULE_PREVIEW_API__.combineParameters(extractedArgTypes,userArgTypes):userArgTypes};var ADDON_ID="storybook/docs",SNIPPET_RENDERED=`${ADDON_ID}/snippet-rendered`,SourceType=(SourceType2=>(SourceType2.AUTO="auto",SourceType2.CODE="code",SourceType2.DYNAMIC="dynamic",SourceType2))(SourceType||{});

export { nodeUtil_default as A, getTag_default as B, isBuffer_default as C, Stack_default as D, isArray_default as E, getAllKeys_default as F, keys_default as G, baseUnary_default as H, isObjectLike_default as I, str as J, SourceType as S, Uint8Array_default as U, SNIPPET_RENDERED as a, isSymbol_default as b, baseGetAllKeys_default as c, arrayPush_default as d, enhanceArgTypes as e, isArrayLike_default as f, getSymbols_default as g, arrayLikeKeys_default as h, isObject_default as i, eq_default as j, baseAssignValue_default as k, isPrototype_default as l, arrayMap_default as m, baseIteratee_default as n, overArg_default as o, baseGet_default as p, castPath_default as q, root_default as r, stubArray_default as s, toKey_default as t, isIndex_default as u, Set_default as v, setToArray_default as w, SetCache_default as x, cacheHas_default as y, Symbol_default as z };
