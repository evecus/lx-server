(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer5;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer5.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer5.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          var proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer5.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer5.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer5.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer5.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        var buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer5.prototype);
        return buf;
      }
      function Buffer5(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer5.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        var valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer5.from(valueOf, encodingOrOffset, length);
        }
        var b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer5.from(
            value[Symbol.toPrimitive]("string"),
            encodingOrOffset,
            length
          );
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer5.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer5.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer5, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer5.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer5.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer5.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer5.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        var length = byteLength(string, encoding) | 0;
        var buf = createBuffer(length);
        var actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0;
        var buf = createBuffer(length);
        for (var i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          var copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        var buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer5.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer5.isBuffer(obj)) {
          var len = checked(obj.length) | 0;
          var buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer5.alloc(+length);
      }
      Buffer5.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer5.prototype;
      };
      Buffer5.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer5.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer5.from(b, b.offset, b.byteLength);
        if (!Buffer5.isBuffer(a) || !Buffer5.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer5.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer5.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer5.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer5.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              Buffer5.from(buf).copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer5.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer5.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        var len = string.length;
        var mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer5.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer5.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer5.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer5.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer5.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer5.prototype.toString = function toString2() {
        var length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer5.prototype.toLocaleString = Buffer5.prototype.toString;
      Buffer5.prototype.equals = function equals(b) {
        if (!Buffer5.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer5.compare(this, b) === 0;
      };
      Buffer5.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer5.prototype[customInspectSymbol] = Buffer5.prototype.inspect;
      }
      Buffer5.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer5.from(target, target.offset, target.byteLength);
        }
        if (!Buffer5.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer5.from(val, encoding);
        }
        if (Buffer5.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer5.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer5.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer5.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer5.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer5.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer5.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        var newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer5.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer5.prototype.readUintLE = Buffer5.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer5.prototype.readUintBE = Buffer5.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        var val = this[offset + --byteLength2];
        var mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer5.prototype.readUint8 = Buffer5.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer5.prototype.readUint16LE = Buffer5.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer5.prototype.readUint16BE = Buffer5.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer5.prototype.readUint32LE = Buffer5.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer5.prototype.readUint32BE = Buffer5.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer5.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer5.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        var i = byteLength2;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer5.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer5.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer5.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer5.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer5.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer5.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer5.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer5.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer5.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer5.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer5.prototype.writeUintLE = Buffer5.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer5.prototype.writeUintBE = Buffer5.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer5.prototype.writeUint8 = Buffer5.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer5.prototype.writeUint16LE = Buffer5.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer5.prototype.writeUint16BE = Buffer5.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer5.prototype.writeUint32LE = Buffer5.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer5.prototype.writeUint32BE = Buffer5.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer5.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer5.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer5.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer5.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer5.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer5.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer5.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer5.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer5.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer5.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer5.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer5.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer5.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer5.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer5.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = Buffer5.isBuffer(val) ? val : Buffer5.from(val, encoding);
          var len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        var alphabet = "0123456789abcdef";
        var table = new Array(256);
        for (var i = 0; i < 16; ++i) {
          var i16 = i * 16;
          for (var j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/buffer-global.js
  var require_buffer_global = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/buffer-global.js"() {
      var import_buffer4 = __toESM(require_buffer());
      globalThis.Buffer = import_buffer4.Buffer;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/shims/background-timer.js
  var background_timer_default;
  var init_background_timer = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/shims/background-timer.js"() {
      background_timer_default = {
        setTimeout(fn, ms) {
          return globalThis.__lx_bg_set_timeout__(fn, ms);
        },
        clearTimeout(id) {
          return globalThis.__lx_bg_clear_timeout__(id);
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/message.ts
  var requestMsg;
  var init_message = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/message.ts"() {
      requestMsg = {
        fail: "\u8BF7\u6C42\u5F02\u5E38\u{1F62E}\uFF0C\u53EF\u4EE5\u591A\u8BD5\u51E0\u6B21\uFF0C\u82E5\u8FD8\u662F\u4E0D\u884C\u5C31\u6362\u4E00\u9996\u5427\u3002\u3002\u3002",
        unachievable: "\u54E6No\u{1F631}...\u63A5\u53E3\u65E0\u6CD5\u8BBF\u95EE\u4E86\uFF01",
        timeout: "\u8BF7\u6C42\u8D85\u65F6",
        // unachievable: '哦No😱...接口无法访问了！已帮你切换到临时接口，重试下看能不能播放吧~',
        notConnectNetwork: "\u65E0\u6CD5\u8FDE\u63A5\u5230\u670D\u52A1\u5668",
        cancelRequest: "\u53D6\u6D88http\u8BF7\u6C42"
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/options.js
  var bHh, headers;
  var init_options = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/options.js"() {
      bHh = "624868746c";
      headers = {
        "User-Agent": "lx-music mobile request",
        [bHh]: [bHh]
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/dist/pako.esm.mjs
  function zero$1(buf) {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED$2;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
    this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
    this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new Uint16Array(MAX_BITS + 1);
    this.heap = new Uint16Array(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new Uint16Array(2 * L_CODES + 1);
    zero(this.depth);
    this.sym_buf = 0;
    this.lit_bufsize = 0;
    this.sym_next = 0;
    this.sym_end = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  function Deflate$1(options) {
    this.options = common.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY
    }, options || {});
    let opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = deflate_1$2.deflateInit2(
      this.strm,
      opt.level,
      opt.method,
      opt.windowBits,
      opt.memLevel,
      opt.strategy
    );
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    if (opt.header) {
      deflate_1$2.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      let dict;
      if (typeof opt.dictionary === "string") {
        dict = strings.string2buf(opt.dictionary);
      } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = deflate_1$2.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK$2) {
        throw new Error(messages[status]);
      }
      this._dict_set = true;
    }
  }
  function deflate$1(input, options) {
    const deflator = new Deflate$1(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || messages[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return deflate$1(input, options);
  }
  function gzip$1(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate$1(input, options);
  }
  function InflateState() {
    this.strm = null;
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new Uint16Array(320);
    this.work = new Uint16Array(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  function GZheader() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  function Inflate$1(options) {
    this.options = common.assign({
      chunkSize: 1024 * 64,
      windowBits: 15,
      to: ""
    }, options || {});
    const opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = inflate_1$2.inflateInit2(
      this.strm,
      opt.windowBits
    );
    if (status !== Z_OK) {
      throw new Error(messages[status]);
    }
    this.header = new gzheader();
    inflate_1$2.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== Z_OK) {
          throw new Error(messages[status]);
        }
      }
    }
  }
  function inflate$1(input, options) {
    const inflator = new Inflate$1(options);
    inflator.push(input);
    if (inflator.err) throw inflator.msg || messages[inflator.err];
    return inflator.result;
  }
  function inflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return inflate$1(input, options);
  }
  var Z_FIXED$1, Z_BINARY, Z_TEXT, Z_UNKNOWN$1, STORED_BLOCK, STATIC_TREES, DYN_TREES, MIN_MATCH$1, MAX_MATCH$1, LENGTH_CODES$1, LITERALS$1, L_CODES$1, D_CODES$1, BL_CODES$1, HEAP_SIZE$1, MAX_BITS$1, Buf_size, MAX_BL_BITS, END_BLOCK, REP_3_6, REPZ_3_10, REPZ_11_138, extra_lbits, extra_dbits, extra_blbits, bl_order, DIST_CODE_LEN, static_ltree, static_dtree, _dist_code, _length_code, base_length, base_dist, static_l_desc, static_d_desc, static_bl_desc, d_code, put_short, send_bits, send_code, bi_reverse, bi_flush, gen_bitlen, gen_codes, tr_static_init, init_block, bi_windup, smaller, pqdownheap, compress_block, build_tree, scan_tree, send_tree, build_bl_tree, send_all_trees, detect_data_type, static_init_done, _tr_init$1, _tr_stored_block$1, _tr_align$1, _tr_flush_block$1, _tr_tally$1, _tr_init_1, _tr_stored_block_1, _tr_flush_block_1, _tr_tally_1, _tr_align_1, trees, adler32, adler32_1, makeTable, crcTable, crc32, crc32_1, messages, constants$2, _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align, Z_NO_FLUSH$2, Z_PARTIAL_FLUSH, Z_FULL_FLUSH$1, Z_FINISH$3, Z_BLOCK$1, Z_OK$3, Z_STREAM_END$3, Z_STREAM_ERROR$2, Z_DATA_ERROR$2, Z_BUF_ERROR$1, Z_DEFAULT_COMPRESSION$1, Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED, Z_DEFAULT_STRATEGY$1, Z_UNKNOWN, Z_DEFLATED$2, MAX_MEM_LEVEL, MAX_WBITS$1, DEF_MEM_LEVEL, LENGTH_CODES, LITERALS, L_CODES, D_CODES, BL_CODES, HEAP_SIZE, MAX_BITS, MIN_MATCH, MAX_MATCH, MIN_LOOKAHEAD, PRESET_DICT, INIT_STATE, GZIP_STATE, EXTRA_STATE, NAME_STATE, COMMENT_STATE, HCRC_STATE, BUSY_STATE, FINISH_STATE, BS_NEED_MORE, BS_BLOCK_DONE, BS_FINISH_STARTED, BS_FINISH_DONE, OS_CODE, err, rank, zero, slide_hash, HASH_ZLIB, HASH, flush_pending, flush_block_only, put_byte, putShortMSB, read_buf, longest_match, fill_window, deflate_stored, deflate_fast, deflate_slow, deflate_rle, deflate_huff, configuration_table, lm_init, deflateStateCheck, deflateResetKeep, deflateReset, deflateSetHeader, deflateInit2, deflateInit, deflate$2, deflateEnd, deflateSetDictionary, deflateInit_1, deflateInit2_1, deflateReset_1, deflateResetKeep_1, deflateSetHeader_1, deflate_2$1, deflateEnd_1, deflateSetDictionary_1, deflateInfo, deflate_1$2, _has, assign, flattenChunks, common, STR_APPLY_UIA_OK, _utf8len, string2buf, buf2binstring, buf2string, utf8border, strings, zstream, toString$1, Z_NO_FLUSH$1, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH$2, Z_OK$2, Z_STREAM_END$2, Z_DEFAULT_COMPRESSION, Z_DEFAULT_STRATEGY, Z_DEFLATED$1, Deflate_1$1, deflate_2, deflateRaw_1$1, gzip_1$1, constants$1, deflate_1$1, BAD$1, TYPE$1, inffast, MAXBITS, ENOUGH_LENS$1, ENOUGH_DISTS$1, CODES$1, LENS$1, DISTS$1, lbase, lext, dbase, dext, inflate_table, inftrees, CODES, LENS, DISTS, Z_FINISH$1, Z_BLOCK, Z_TREES, Z_OK$1, Z_STREAM_END$1, Z_NEED_DICT$1, Z_STREAM_ERROR$1, Z_DATA_ERROR$1, Z_MEM_ERROR$1, Z_BUF_ERROR, Z_DEFLATED, HEAD, FLAGS, TIME, OS, EXLEN, EXTRA, NAME, COMMENT, HCRC, DICTID, DICT, TYPE, TYPEDO, STORED, COPY_, COPY, TABLE, LENLENS, CODELENS, LEN_, LEN, LENEXT, DIST, DISTEXT, MATCH, LIT, CHECK, LENGTH, DONE, BAD, MEM, SYNC, ENOUGH_LENS, ENOUGH_DISTS, MAX_WBITS, DEF_WBITS, zswap32, inflateStateCheck, inflateResetKeep, inflateReset, inflateReset2, inflateInit2, inflateInit, virgin, lenfix, distfix, fixedtables, updatewindow, inflate$2, inflateEnd, inflateGetHeader, inflateSetDictionary, inflateReset_1, inflateReset2_1, inflateResetKeep_1, inflateInit_1, inflateInit2_1, inflate_2$1, inflateEnd_1, inflateGetHeader_1, inflateSetDictionary_1, inflateInfo, inflate_1$2, gzheader, toString, Z_NO_FLUSH, Z_FINISH, Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR, Inflate_1$1, inflate_2, inflateRaw_1$1, ungzip$1, constants, inflate_1$1, Deflate, deflate, deflateRaw, gzip, Inflate, inflate, inflateRaw, ungzip, Deflate_1, deflate_1, deflateRaw_1, gzip_1, Inflate_1, inflate_1, inflateRaw_1, ungzip_1, constants_1, pako;
  var init_pako_esm = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/dist/pako.esm.mjs"() {
      Z_FIXED$1 = 4;
      Z_BINARY = 0;
      Z_TEXT = 1;
      Z_UNKNOWN$1 = 2;
      STORED_BLOCK = 0;
      STATIC_TREES = 1;
      DYN_TREES = 2;
      MIN_MATCH$1 = 3;
      MAX_MATCH$1 = 258;
      LENGTH_CODES$1 = 29;
      LITERALS$1 = 256;
      L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
      D_CODES$1 = 30;
      BL_CODES$1 = 19;
      HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
      MAX_BITS$1 = 15;
      Buf_size = 16;
      MAX_BL_BITS = 7;
      END_BLOCK = 256;
      REP_3_6 = 16;
      REPZ_3_10 = 17;
      REPZ_11_138 = 18;
      extra_lbits = /* extra bits for each length code */
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
      extra_dbits = /* extra bits for each distance code */
      new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
      extra_blbits = /* extra bits for each bit length code */
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
      bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      DIST_CODE_LEN = 512;
      static_ltree = new Array((L_CODES$1 + 2) * 2);
      zero$1(static_ltree);
      static_dtree = new Array(D_CODES$1 * 2);
      zero$1(static_dtree);
      _dist_code = new Array(DIST_CODE_LEN);
      zero$1(_dist_code);
      _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
      zero$1(_length_code);
      base_length = new Array(LENGTH_CODES$1);
      zero$1(base_length);
      base_dist = new Array(D_CODES$1);
      zero$1(base_dist);
      d_code = (dist) => {
        return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
      };
      put_short = (s, w) => {
        s.pending_buf[s.pending++] = w & 255;
        s.pending_buf[s.pending++] = w >>> 8 & 255;
      };
      send_bits = (s, value, length) => {
        if (s.bi_valid > Buf_size - length) {
          s.bi_buf |= value << s.bi_valid & 65535;
          put_short(s, s.bi_buf);
          s.bi_buf = value >> Buf_size - s.bi_valid;
          s.bi_valid += length - Buf_size;
        } else {
          s.bi_buf |= value << s.bi_valid & 65535;
          s.bi_valid += length;
        }
      };
      send_code = (s, c, tree) => {
        send_bits(
          s,
          tree[c * 2],
          tree[c * 2 + 1]
          /*.Len*/
        );
      };
      bi_reverse = (code, len) => {
        let res = 0;
        do {
          res |= code & 1;
          code >>>= 1;
          res <<= 1;
        } while (--len > 0);
        return res >>> 1;
      };
      bi_flush = (s) => {
        if (s.bi_valid === 16) {
          put_short(s, s.bi_buf);
          s.bi_buf = 0;
          s.bi_valid = 0;
        } else if (s.bi_valid >= 8) {
          s.pending_buf[s.pending++] = s.bi_buf & 255;
          s.bi_buf >>= 8;
          s.bi_valid -= 8;
        }
      };
      gen_bitlen = (s, desc) => {
        const tree = desc.dyn_tree;
        const max_code = desc.max_code;
        const stree = desc.stat_desc.static_tree;
        const has_stree = desc.stat_desc.has_stree;
        const extra = desc.stat_desc.extra_bits;
        const base = desc.stat_desc.extra_base;
        const max_length = desc.stat_desc.max_length;
        let h;
        let n, m;
        let bits;
        let xbits;
        let f;
        let overflow = 0;
        for (bits = 0; bits <= MAX_BITS$1; bits++) {
          s.bl_count[bits] = 0;
        }
        tree[s.heap[s.heap_max] * 2 + 1] = 0;
        for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
          n = s.heap[h];
          bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }
          tree[n * 2 + 1] = bits;
          if (n > max_code) {
            continue;
          }
          s.bl_count[bits]++;
          xbits = 0;
          if (n >= base) {
            xbits = extra[n - base];
          }
          f = tree[n * 2];
          s.opt_len += f * (bits + xbits);
          if (has_stree) {
            s.static_len += f * (stree[n * 2 + 1] + xbits);
          }
        }
        if (overflow === 0) {
          return;
        }
        do {
          bits = max_length - 1;
          while (s.bl_count[bits] === 0) {
            bits--;
          }
          s.bl_count[bits]--;
          s.bl_count[bits + 1] += 2;
          s.bl_count[max_length]--;
          overflow -= 2;
        } while (overflow > 0);
        for (bits = max_length; bits !== 0; bits--) {
          n = s.bl_count[bits];
          while (n !== 0) {
            m = s.heap[--h];
            if (m > max_code) {
              continue;
            }
            if (tree[m * 2 + 1] !== bits) {
              s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
              tree[m * 2 + 1] = bits;
            }
            n--;
          }
        }
      };
      gen_codes = (tree, max_code, bl_count) => {
        const next_code = new Array(MAX_BITS$1 + 1);
        let code = 0;
        let bits;
        let n;
        for (bits = 1; bits <= MAX_BITS$1; bits++) {
          code = code + bl_count[bits - 1] << 1;
          next_code[bits] = code;
        }
        for (n = 0; n <= max_code; n++) {
          let len = tree[n * 2 + 1];
          if (len === 0) {
            continue;
          }
          tree[n * 2] = bi_reverse(next_code[len]++, len);
        }
      };
      tr_static_init = () => {
        let n;
        let bits;
        let length;
        let code;
        let dist;
        const bl_count = new Array(MAX_BITS$1 + 1);
        length = 0;
        for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
          base_length[code] = length;
          for (n = 0; n < 1 << extra_lbits[code]; n++) {
            _length_code[length++] = code;
          }
        }
        _length_code[length - 1] = code;
        dist = 0;
        for (code = 0; code < 16; code++) {
          base_dist[code] = dist;
          for (n = 0; n < 1 << extra_dbits[code]; n++) {
            _dist_code[dist++] = code;
          }
        }
        dist >>= 7;
        for (; code < D_CODES$1; code++) {
          base_dist[code] = dist << 7;
          for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
            _dist_code[256 + dist++] = code;
          }
        }
        for (bits = 0; bits <= MAX_BITS$1; bits++) {
          bl_count[bits] = 0;
        }
        n = 0;
        while (n <= 143) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        while (n <= 255) {
          static_ltree[n * 2 + 1] = 9;
          n++;
          bl_count[9]++;
        }
        while (n <= 279) {
          static_ltree[n * 2 + 1] = 7;
          n++;
          bl_count[7]++;
        }
        while (n <= 287) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
        for (n = 0; n < D_CODES$1; n++) {
          static_dtree[n * 2 + 1] = 5;
          static_dtree[n * 2] = bi_reverse(n, 5);
        }
        static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
        static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
        static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
      };
      init_block = (s) => {
        let n;
        for (n = 0; n < L_CODES$1; n++) {
          s.dyn_ltree[n * 2] = 0;
        }
        for (n = 0; n < D_CODES$1; n++) {
          s.dyn_dtree[n * 2] = 0;
        }
        for (n = 0; n < BL_CODES$1; n++) {
          s.bl_tree[n * 2] = 0;
        }
        s.dyn_ltree[END_BLOCK * 2] = 1;
        s.opt_len = s.static_len = 0;
        s.sym_next = s.matches = 0;
      };
      bi_windup = (s) => {
        if (s.bi_valid > 8) {
          put_short(s, s.bi_buf);
        } else if (s.bi_valid > 0) {
          s.pending_buf[s.pending++] = s.bi_buf;
        }
        s.bi_buf = 0;
        s.bi_valid = 0;
      };
      smaller = (tree, n, m, depth) => {
        const _n2 = n * 2;
        const _m2 = m * 2;
        return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
      };
      pqdownheap = (s, tree, k) => {
        const v = s.heap[k];
        let j = k << 1;
        while (j <= s.heap_len) {
          if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
            j++;
          }
          if (smaller(tree, v, s.heap[j], s.depth)) {
            break;
          }
          s.heap[k] = s.heap[j];
          k = j;
          j <<= 1;
        }
        s.heap[k] = v;
      };
      compress_block = (s, ltree, dtree) => {
        let dist;
        let lc;
        let sx = 0;
        let code;
        let extra;
        if (s.sym_next !== 0) {
          do {
            dist = s.pending_buf[s.sym_buf + sx++] & 255;
            dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
            lc = s.pending_buf[s.sym_buf + sx++];
            if (dist === 0) {
              send_code(s, lc, ltree);
            } else {
              code = _length_code[lc];
              send_code(s, code + LITERALS$1 + 1, ltree);
              extra = extra_lbits[code];
              if (extra !== 0) {
                lc -= base_length[code];
                send_bits(s, lc, extra);
              }
              dist--;
              code = d_code(dist);
              send_code(s, code, dtree);
              extra = extra_dbits[code];
              if (extra !== 0) {
                dist -= base_dist[code];
                send_bits(s, dist, extra);
              }
            }
          } while (sx < s.sym_next);
        }
        send_code(s, END_BLOCK, ltree);
      };
      build_tree = (s, desc) => {
        const tree = desc.dyn_tree;
        const stree = desc.stat_desc.static_tree;
        const has_stree = desc.stat_desc.has_stree;
        const elems = desc.stat_desc.elems;
        let n, m;
        let max_code = -1;
        let node;
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE$1;
        for (n = 0; n < elems; n++) {
          if (tree[n * 2] !== 0) {
            s.heap[++s.heap_len] = max_code = n;
            s.depth[n] = 0;
          } else {
            tree[n * 2 + 1] = 0;
          }
        }
        while (s.heap_len < 2) {
          node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
          tree[node * 2] = 1;
          s.depth[node] = 0;
          s.opt_len--;
          if (has_stree) {
            s.static_len -= stree[node * 2 + 1];
          }
        }
        desc.max_code = max_code;
        for (n = s.heap_len >> 1; n >= 1; n--) {
          pqdownheap(s, tree, n);
        }
        node = elems;
        do {
          n = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[
            1
            /*SMALLEST*/
          ] = s.heap[s.heap_len--];
          pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          );
          m = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[--s.heap_max] = n;
          s.heap[--s.heap_max] = m;
          tree[node * 2] = tree[n * 2] + tree[m * 2];
          s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
          tree[n * 2 + 1] = tree[m * 2 + 1] = node;
          s.heap[
            1
            /*SMALLEST*/
          ] = node++;
          pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          );
        } while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[
          1
          /*SMALLEST*/
        ];
        gen_bitlen(s, desc);
        gen_codes(tree, max_code, s.bl_count);
      };
      scan_tree = (s, tree, max_code) => {
        let n;
        let prevlen = -1;
        let curlen;
        let nextlen = tree[0 * 2 + 1];
        let count = 0;
        let max_count = 7;
        let min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1] = 65535;
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            s.bl_tree[curlen * 2] += count;
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              s.bl_tree[curlen * 2]++;
            }
            s.bl_tree[REP_3_6 * 2]++;
          } else if (count <= 10) {
            s.bl_tree[REPZ_3_10 * 2]++;
          } else {
            s.bl_tree[REPZ_11_138 * 2]++;
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      };
      send_tree = (s, tree, max_code) => {
        let n;
        let prevlen = -1;
        let curlen;
        let nextlen = tree[0 * 2 + 1];
        let count = 0;
        let max_count = 7;
        let min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            do {
              send_code(s, curlen, s.bl_tree);
            } while (--count !== 0);
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              send_code(s, curlen, s.bl_tree);
              count--;
            }
            send_code(s, REP_3_6, s.bl_tree);
            send_bits(s, count - 3, 2);
          } else if (count <= 10) {
            send_code(s, REPZ_3_10, s.bl_tree);
            send_bits(s, count - 3, 3);
          } else {
            send_code(s, REPZ_11_138, s.bl_tree);
            send_bits(s, count - 11, 7);
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      };
      build_bl_tree = (s) => {
        let max_blindex;
        scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
        scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
        build_tree(s, s.bl_desc);
        for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
          if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
            break;
          }
        }
        s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        return max_blindex;
      };
      send_all_trees = (s, lcodes, dcodes, blcodes) => {
        let rank2;
        send_bits(s, lcodes - 257, 5);
        send_bits(s, dcodes - 1, 5);
        send_bits(s, blcodes - 4, 4);
        for (rank2 = 0; rank2 < blcodes; rank2++) {
          send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
        }
        send_tree(s, s.dyn_ltree, lcodes - 1);
        send_tree(s, s.dyn_dtree, dcodes - 1);
      };
      detect_data_type = (s) => {
        let block_mask = 4093624447;
        let n;
        for (n = 0; n <= 31; n++, block_mask >>>= 1) {
          if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
            return Z_BINARY;
          }
        }
        if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
          return Z_TEXT;
        }
        for (n = 32; n < LITERALS$1; n++) {
          if (s.dyn_ltree[n * 2] !== 0) {
            return Z_TEXT;
          }
        }
        return Z_BINARY;
      };
      static_init_done = false;
      _tr_init$1 = (s) => {
        if (!static_init_done) {
          tr_static_init();
          static_init_done = true;
        }
        s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
        s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
        s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
        s.bi_buf = 0;
        s.bi_valid = 0;
        init_block(s);
      };
      _tr_stored_block$1 = (s, buf, stored_len, last) => {
        send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
        bi_windup(s);
        put_short(s, stored_len);
        put_short(s, ~stored_len);
        if (stored_len) {
          s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
        }
        s.pending += stored_len;
      };
      _tr_align$1 = (s) => {
        send_bits(s, STATIC_TREES << 1, 3);
        send_code(s, END_BLOCK, static_ltree);
        bi_flush(s);
      };
      _tr_flush_block$1 = (s, buf, stored_len, last) => {
        let opt_lenb, static_lenb;
        let max_blindex = 0;
        if (s.level > 0) {
          if (s.strm.data_type === Z_UNKNOWN$1) {
            s.strm.data_type = detect_data_type(s);
          }
          build_tree(s, s.l_desc);
          build_tree(s, s.d_desc);
          max_blindex = build_bl_tree(s);
          opt_lenb = s.opt_len + 3 + 7 >>> 3;
          static_lenb = s.static_len + 3 + 7 >>> 3;
          if (static_lenb <= opt_lenb) {
            opt_lenb = static_lenb;
          }
        } else {
          opt_lenb = static_lenb = stored_len + 5;
        }
        if (stored_len + 4 <= opt_lenb && buf !== -1) {
          _tr_stored_block$1(s, buf, stored_len, last);
        } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
          send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
          compress_block(s, static_ltree, static_dtree);
        } else {
          send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
          send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
          compress_block(s, s.dyn_ltree, s.dyn_dtree);
        }
        init_block(s);
        if (last) {
          bi_windup(s);
        }
      };
      _tr_tally$1 = (s, dist, lc) => {
        s.pending_buf[s.sym_buf + s.sym_next++] = dist;
        s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
        s.pending_buf[s.sym_buf + s.sym_next++] = lc;
        if (dist === 0) {
          s.dyn_ltree[lc * 2]++;
        } else {
          s.matches++;
          dist--;
          s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
          s.dyn_dtree[d_code(dist) * 2]++;
        }
        return s.sym_next === s.sym_end;
      };
      _tr_init_1 = _tr_init$1;
      _tr_stored_block_1 = _tr_stored_block$1;
      _tr_flush_block_1 = _tr_flush_block$1;
      _tr_tally_1 = _tr_tally$1;
      _tr_align_1 = _tr_align$1;
      trees = {
        _tr_init: _tr_init_1,
        _tr_stored_block: _tr_stored_block_1,
        _tr_flush_block: _tr_flush_block_1,
        _tr_tally: _tr_tally_1,
        _tr_align: _tr_align_1
      };
      adler32 = (adler, buf, len, pos) => {
        let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
        while (len !== 0) {
          n = len > 2e3 ? 2e3 : len;
          len -= n;
          do {
            s1 = s1 + buf[pos++] | 0;
            s2 = s2 + s1 | 0;
          } while (--n);
          s1 %= 65521;
          s2 %= 65521;
        }
        return s1 | s2 << 16 | 0;
      };
      adler32_1 = adler32;
      makeTable = () => {
        let c, table = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          }
          table[n] = c;
        }
        return table;
      };
      crcTable = new Uint32Array(makeTable());
      crc32 = (crc, buf, len, pos) => {
        const t = crcTable;
        const end = pos + len;
        crc ^= -1;
        for (let i = pos; i < end; i++) {
          crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
        }
        return crc ^ -1;
      };
      crc32_1 = crc32;
      messages = {
        2: "need dictionary",
        /* Z_NEED_DICT       2  */
        1: "stream end",
        /* Z_STREAM_END      1  */
        0: "",
        /* Z_OK              0  */
        "-1": "file error",
        /* Z_ERRNO         (-1) */
        "-2": "stream error",
        /* Z_STREAM_ERROR  (-2) */
        "-3": "data error",
        /* Z_DATA_ERROR    (-3) */
        "-4": "insufficient memory",
        /* Z_MEM_ERROR     (-4) */
        "-5": "buffer error",
        /* Z_BUF_ERROR     (-5) */
        "-6": "incompatible version"
        /* Z_VERSION_ERROR (-6) */
      };
      constants$2 = {
        /* Allowed flush values; see deflate() and inflate() below for details */
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        /* Return codes for the compression/decompression functions. Negative values
        * are errors, positive values are used for special but normal events.
        */
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        //Z_VERSION_ERROR: -6,
        /* compression levels */
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        /* Possible values of the data_type field (though see inflate()) */
        Z_BINARY: 0,
        Z_TEXT: 1,
        //Z_ASCII:                1, // = Z_TEXT (deprecated)
        Z_UNKNOWN: 2,
        /* The deflate compression method */
        Z_DEFLATED: 8
        //Z_NULL:                 null // Use -1 or null inline, depending on var type
      };
      ({ _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees);
      ({
        Z_NO_FLUSH: Z_NO_FLUSH$2,
        Z_PARTIAL_FLUSH,
        Z_FULL_FLUSH: Z_FULL_FLUSH$1,
        Z_FINISH: Z_FINISH$3,
        Z_BLOCK: Z_BLOCK$1,
        Z_OK: Z_OK$3,
        Z_STREAM_END: Z_STREAM_END$3,
        Z_STREAM_ERROR: Z_STREAM_ERROR$2,
        Z_DATA_ERROR: Z_DATA_ERROR$2,
        Z_BUF_ERROR: Z_BUF_ERROR$1,
        Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
        Z_FILTERED,
        Z_HUFFMAN_ONLY,
        Z_RLE,
        Z_FIXED,
        Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
        Z_UNKNOWN,
        Z_DEFLATED: Z_DEFLATED$2
      } = constants$2);
      MAX_MEM_LEVEL = 9;
      MAX_WBITS$1 = 15;
      DEF_MEM_LEVEL = 8;
      LENGTH_CODES = 29;
      LITERALS = 256;
      L_CODES = LITERALS + 1 + LENGTH_CODES;
      D_CODES = 30;
      BL_CODES = 19;
      HEAP_SIZE = 2 * L_CODES + 1;
      MAX_BITS = 15;
      MIN_MATCH = 3;
      MAX_MATCH = 258;
      MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
      PRESET_DICT = 32;
      INIT_STATE = 42;
      GZIP_STATE = 57;
      EXTRA_STATE = 69;
      NAME_STATE = 73;
      COMMENT_STATE = 91;
      HCRC_STATE = 103;
      BUSY_STATE = 113;
      FINISH_STATE = 666;
      BS_NEED_MORE = 1;
      BS_BLOCK_DONE = 2;
      BS_FINISH_STARTED = 3;
      BS_FINISH_DONE = 4;
      OS_CODE = 3;
      err = (strm, errorCode) => {
        strm.msg = messages[errorCode];
        return errorCode;
      };
      rank = (f) => {
        return f * 2 - (f > 4 ? 9 : 0);
      };
      zero = (buf) => {
        let len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      };
      slide_hash = (s) => {
        let n, m;
        let p;
        let wsize = s.w_size;
        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= wsize ? m - wsize : 0;
        } while (--n);
        n = wsize;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= wsize ? m - wsize : 0;
        } while (--n);
      };
      HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
      HASH = HASH_ZLIB;
      flush_pending = (strm) => {
        const s = strm.state;
        let len = s.pending;
        if (len > strm.avail_out) {
          len = strm.avail_out;
        }
        if (len === 0) {
          return;
        }
        strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
        strm.next_out += len;
        s.pending_out += len;
        strm.total_out += len;
        strm.avail_out -= len;
        s.pending -= len;
        if (s.pending === 0) {
          s.pending_out = 0;
        }
      };
      flush_block_only = (s, last) => {
        _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
        s.block_start = s.strstart;
        flush_pending(s.strm);
      };
      put_byte = (s, b) => {
        s.pending_buf[s.pending++] = b;
      };
      putShortMSB = (s, b) => {
        s.pending_buf[s.pending++] = b >>> 8 & 255;
        s.pending_buf[s.pending++] = b & 255;
      };
      read_buf = (strm, buf, start, size) => {
        let len = strm.avail_in;
        if (len > size) {
          len = size;
        }
        if (len === 0) {
          return 0;
        }
        strm.avail_in -= len;
        buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
        if (strm.state.wrap === 1) {
          strm.adler = adler32_1(strm.adler, buf, len, start);
        } else if (strm.state.wrap === 2) {
          strm.adler = crc32_1(strm.adler, buf, len, start);
        }
        strm.next_in += len;
        strm.total_in += len;
        return len;
      };
      longest_match = (s, cur_match) => {
        let chain_length = s.max_chain_length;
        let scan = s.strstart;
        let match;
        let len;
        let best_len = s.prev_length;
        let nice_match = s.nice_match;
        const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
        const _win = s.window;
        const wmask = s.w_mask;
        const prev = s.prev;
        const strend = s.strstart + MAX_MATCH;
        let scan_end1 = _win[scan + best_len - 1];
        let scan_end = _win[scan + best_len];
        if (s.prev_length >= s.good_match) {
          chain_length >>= 2;
        }
        if (nice_match > s.lookahead) {
          nice_match = s.lookahead;
        }
        do {
          match = cur_match;
          if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
            continue;
          }
          scan += 2;
          match++;
          do {
          } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
          len = MAX_MATCH - (strend - scan);
          scan = strend - MAX_MATCH;
          if (len > best_len) {
            s.match_start = cur_match;
            best_len = len;
            if (len >= nice_match) {
              break;
            }
            scan_end1 = _win[scan + best_len - 1];
            scan_end = _win[scan + best_len];
          }
        } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
        if (best_len <= s.lookahead) {
          return best_len;
        }
        return s.lookahead;
      };
      fill_window = (s) => {
        const _w_size = s.w_size;
        let n, more, str;
        do {
          more = s.window_size - s.lookahead - s.strstart;
          if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
            s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
            s.match_start -= _w_size;
            s.strstart -= _w_size;
            s.block_start -= _w_size;
            if (s.insert > s.strstart) {
              s.insert = s.strstart;
            }
            slide_hash(s);
            more += _w_size;
          }
          if (s.strm.avail_in === 0) {
            break;
          }
          n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
          s.lookahead += n;
          if (s.lookahead + s.insert >= MIN_MATCH) {
            str = s.strstart - s.insert;
            s.ins_h = s.window[str];
            s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
            while (s.insert) {
              s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
              s.prev[str & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = str;
              str++;
              s.insert--;
              if (s.lookahead + s.insert < MIN_MATCH) {
                break;
              }
            }
          }
        } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
      };
      deflate_stored = (s, flush) => {
        let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
        let len, left, have, last = 0;
        let used = s.strm.avail_in;
        do {
          len = 65535;
          have = s.bi_valid + 42 >> 3;
          if (s.strm.avail_out < have) {
            break;
          }
          have = s.strm.avail_out - have;
          left = s.strstart - s.block_start;
          if (len > left + s.strm.avail_in) {
            len = left + s.strm.avail_in;
          }
          if (len > have) {
            len = have;
          }
          if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
            break;
          }
          last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
          _tr_stored_block(s, 0, 0, last);
          s.pending_buf[s.pending - 4] = len;
          s.pending_buf[s.pending - 3] = len >> 8;
          s.pending_buf[s.pending - 2] = ~len;
          s.pending_buf[s.pending - 1] = ~len >> 8;
          flush_pending(s.strm);
          if (left) {
            if (left > len) {
              left = len;
            }
            s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
            s.strm.next_out += left;
            s.strm.avail_out -= left;
            s.strm.total_out += left;
            s.block_start += left;
            len -= left;
          }
          if (len) {
            read_buf(s.strm, s.strm.output, s.strm.next_out, len);
            s.strm.next_out += len;
            s.strm.avail_out -= len;
            s.strm.total_out += len;
          }
        } while (last === 0);
        used -= s.strm.avail_in;
        if (used) {
          if (used >= s.w_size) {
            s.matches = 2;
            s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
            s.strstart = s.w_size;
            s.insert = s.strstart;
          } else {
            if (s.window_size - s.strstart <= used) {
              s.strstart -= s.w_size;
              s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
              if (s.matches < 2) {
                s.matches++;
              }
              if (s.insert > s.strstart) {
                s.insert = s.strstart;
              }
            }
            s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
            s.strstart += used;
            s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
          }
          s.block_start = s.strstart;
        }
        if (s.high_water < s.strstart) {
          s.high_water = s.strstart;
        }
        if (last) {
          return BS_FINISH_DONE;
        }
        if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
          return BS_BLOCK_DONE;
        }
        have = s.window_size - s.strstart;
        if (s.strm.avail_in > have && s.block_start >= s.w_size) {
          s.block_start -= s.w_size;
          s.strstart -= s.w_size;
          s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
          if (s.matches < 2) {
            s.matches++;
          }
          have += s.w_size;
          if (s.insert > s.strstart) {
            s.insert = s.strstart;
          }
        }
        if (have > s.strm.avail_in) {
          have = s.strm.avail_in;
        }
        if (have) {
          read_buf(s.strm, s.window, s.strstart, have);
          s.strstart += have;
          s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
        }
        if (s.high_water < s.strstart) {
          s.high_water = s.strstart;
        }
        have = s.bi_valid + 42 >> 3;
        have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
        min_block = have > s.w_size ? s.w_size : have;
        left = s.strstart - s.block_start;
        if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
          len = left > have ? have : left;
          last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
          _tr_stored_block(s, s.block_start, len, last);
          s.block_start += len;
          flush_pending(s.strm);
        }
        return last ? BS_FINISH_STARTED : BS_NEED_MORE;
      };
      deflate_fast = (s, flush) => {
        let hash_head;
        let bflush;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
            s.match_length = longest_match(s, hash_head);
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
              s.match_length--;
              do {
                s.strstart++;
                s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              } while (--s.match_length !== 0);
              s.strstart++;
            } else {
              s.strstart += s.match_length;
              s.match_length = 0;
              s.ins_h = s.window[s.strstart];
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
            }
          } else {
            bflush = _tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH$3) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      deflate_slow = (s, flush) => {
        let hash_head;
        let bflush;
        let max_insert;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          s.prev_length = s.match_length;
          s.prev_match = s.match_start;
          s.match_length = MIN_MATCH - 1;
          if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
            s.match_length = longest_match(s, hash_head);
            if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
              s.match_length = MIN_MATCH - 1;
            }
          }
          if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
            max_insert = s.strstart + s.lookahead - MIN_MATCH;
            bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
            s.lookahead -= s.prev_length - 1;
            s.prev_length -= 2;
            do {
              if (++s.strstart <= max_insert) {
                s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              }
            } while (--s.prev_length !== 0);
            s.match_available = 0;
            s.match_length = MIN_MATCH - 1;
            s.strstart++;
            if (bflush) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
              }
            }
          } else if (s.match_available) {
            bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
            if (bflush) {
              flush_block_only(s, false);
            }
            s.strstart++;
            s.lookahead--;
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          } else {
            s.match_available = 1;
            s.strstart++;
            s.lookahead--;
          }
        }
        if (s.match_available) {
          bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
          s.match_available = 0;
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH$3) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      deflate_rle = (s, flush) => {
        let bflush;
        let prev;
        let scan, strend;
        const _win = s.window;
        for (; ; ) {
          if (s.lookahead <= MAX_MATCH) {
            fill_window(s);
            if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          s.match_length = 0;
          if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
            scan = s.strstart - 1;
            prev = _win[scan];
            if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
              strend = s.strstart + MAX_MATCH;
              do {
              } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
              s.match_length = MAX_MATCH - (strend - scan);
              if (s.match_length > s.lookahead) {
                s.match_length = s.lookahead;
              }
            }
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            s.strstart += s.match_length;
            s.match_length = 0;
          } else {
            bflush = _tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH$3) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      deflate_huff = (s, flush) => {
        let bflush;
        for (; ; ) {
          if (s.lookahead === 0) {
            fill_window(s);
            if (s.lookahead === 0) {
              if (flush === Z_NO_FLUSH$2) {
                return BS_NEED_MORE;
              }
              break;
            }
          }
          s.match_length = 0;
          bflush = _tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH$3) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      configuration_table = [
        /*      good lazy nice chain */
        new Config(0, 0, 0, 0, deflate_stored),
        /* 0 store only */
        new Config(4, 4, 8, 4, deflate_fast),
        /* 1 max speed, no lazy matches */
        new Config(4, 5, 16, 8, deflate_fast),
        /* 2 */
        new Config(4, 6, 32, 32, deflate_fast),
        /* 3 */
        new Config(4, 4, 16, 16, deflate_slow),
        /* 4 lazy matches */
        new Config(8, 16, 32, 32, deflate_slow),
        /* 5 */
        new Config(8, 16, 128, 128, deflate_slow),
        /* 6 */
        new Config(8, 32, 128, 256, deflate_slow),
        /* 7 */
        new Config(32, 128, 258, 1024, deflate_slow),
        /* 8 */
        new Config(32, 258, 258, 4096, deflate_slow)
        /* 9 max compression */
      ];
      lm_init = (s) => {
        s.window_size = 2 * s.w_size;
        zero(s.head);
        s.max_lazy_match = configuration_table[s.level].max_lazy;
        s.good_match = configuration_table[s.level].good_length;
        s.nice_match = configuration_table[s.level].nice_length;
        s.max_chain_length = configuration_table[s.level].max_chain;
        s.strstart = 0;
        s.block_start = 0;
        s.lookahead = 0;
        s.insert = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        s.ins_h = 0;
      };
      deflateStateCheck = (strm) => {
        if (!strm) {
          return 1;
        }
        const s = strm.state;
        if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
        s.status !== GZIP_STATE && //#endif
        s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
          return 1;
        }
        return 0;
      };
      deflateResetKeep = (strm) => {
        if (deflateStateCheck(strm)) {
          return err(strm, Z_STREAM_ERROR$2);
        }
        strm.total_in = strm.total_out = 0;
        strm.data_type = Z_UNKNOWN;
        const s = strm.state;
        s.pending = 0;
        s.pending_out = 0;
        if (s.wrap < 0) {
          s.wrap = -s.wrap;
        }
        s.status = //#ifdef GZIP
        s.wrap === 2 ? GZIP_STATE : (
          //#endif
          s.wrap ? INIT_STATE : BUSY_STATE
        );
        strm.adler = s.wrap === 2 ? 0 : 1;
        s.last_flush = -2;
        _tr_init(s);
        return Z_OK$3;
      };
      deflateReset = (strm) => {
        const ret = deflateResetKeep(strm);
        if (ret === Z_OK$3) {
          lm_init(strm.state);
        }
        return ret;
      };
      deflateSetHeader = (strm, head) => {
        if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
          return Z_STREAM_ERROR$2;
        }
        strm.state.gzhead = head;
        return Z_OK$3;
      };
      deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
        if (!strm) {
          return Z_STREAM_ERROR$2;
        }
        let wrap = 1;
        if (level === Z_DEFAULT_COMPRESSION$1) {
          level = 6;
        }
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else if (windowBits > 15) {
          wrap = 2;
          windowBits -= 16;
        }
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
          return err(strm, Z_STREAM_ERROR$2);
        }
        if (windowBits === 8) {
          windowBits = 9;
        }
        const s = new DeflateState();
        strm.state = s;
        s.strm = strm;
        s.status = INIT_STATE;
        s.wrap = wrap;
        s.gzhead = null;
        s.w_bits = windowBits;
        s.w_size = 1 << s.w_bits;
        s.w_mask = s.w_size - 1;
        s.hash_bits = memLevel + 7;
        s.hash_size = 1 << s.hash_bits;
        s.hash_mask = s.hash_size - 1;
        s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
        s.window = new Uint8Array(s.w_size * 2);
        s.head = new Uint16Array(s.hash_size);
        s.prev = new Uint16Array(s.w_size);
        s.lit_bufsize = 1 << memLevel + 6;
        s.pending_buf_size = s.lit_bufsize * 4;
        s.pending_buf = new Uint8Array(s.pending_buf_size);
        s.sym_buf = s.lit_bufsize;
        s.sym_end = (s.lit_bufsize - 1) * 3;
        s.level = level;
        s.strategy = strategy;
        s.method = method;
        return deflateReset(strm);
      };
      deflateInit = (strm, level) => {
        return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
      };
      deflate$2 = (strm, flush) => {
        if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
          return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
        }
        const s = strm.state;
        if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
          return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
        }
        const old_flush = s.last_flush;
        s.last_flush = flush;
        if (s.pending !== 0) {
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
          return err(strm, Z_BUF_ERROR$1);
        }
        if (s.status === FINISH_STATE && strm.avail_in !== 0) {
          return err(strm, Z_BUF_ERROR$1);
        }
        if (s.status === INIT_STATE && s.wrap === 0) {
          s.status = BUSY_STATE;
        }
        if (s.status === INIT_STATE) {
          let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
          let level_flags = -1;
          if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }
          header |= level_flags << 6;
          if (s.strstart !== 0) {
            header |= PRESET_DICT;
          }
          header += 31 - header % 31;
          putShortMSB(s, header);
          if (s.strstart !== 0) {
            putShortMSB(s, strm.adler >>> 16);
            putShortMSB(s, strm.adler & 65535);
          }
          strm.adler = 1;
          s.status = BUSY_STATE;
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        }
        if (s.status === GZIP_STATE) {
          strm.adler = 0;
          put_byte(s, 31);
          put_byte(s, 139);
          put_byte(s, 8);
          if (!s.gzhead) {
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, OS_CODE);
            s.status = BUSY_STATE;
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
          } else {
            put_byte(
              s,
              (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
            );
            put_byte(s, s.gzhead.time & 255);
            put_byte(s, s.gzhead.time >> 8 & 255);
            put_byte(s, s.gzhead.time >> 16 & 255);
            put_byte(s, s.gzhead.time >> 24 & 255);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, s.gzhead.os & 255);
            if (s.gzhead.extra && s.gzhead.extra.length) {
              put_byte(s, s.gzhead.extra.length & 255);
              put_byte(s, s.gzhead.extra.length >> 8 & 255);
            }
            if (s.gzhead.hcrc) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
            }
            s.gzindex = 0;
            s.status = EXTRA_STATE;
          }
        }
        if (s.status === EXTRA_STATE) {
          if (s.gzhead.extra) {
            let beg = s.pending;
            let left = (s.gzhead.extra.length & 65535) - s.gzindex;
            while (s.pending + left > s.pending_buf_size) {
              let copy = s.pending_buf_size - s.pending;
              s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
              s.pending = s.pending_buf_size;
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              s.gzindex += copy;
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK$3;
              }
              beg = 0;
              left -= copy;
            }
            let gzhead_extra = new Uint8Array(s.gzhead.extra);
            s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
            s.pending += left;
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            s.gzindex = 0;
          }
          s.status = NAME_STATE;
        }
        if (s.status === NAME_STATE) {
          if (s.gzhead.name) {
            let beg = s.pending;
            let val;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                if (s.pending !== 0) {
                  s.last_flush = -1;
                  return Z_OK$3;
                }
                beg = 0;
              }
              if (s.gzindex < s.gzhead.name.length) {
                val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            s.gzindex = 0;
          }
          s.status = COMMENT_STATE;
        }
        if (s.status === COMMENT_STATE) {
          if (s.gzhead.comment) {
            let beg = s.pending;
            let val;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                if (s.pending !== 0) {
                  s.last_flush = -1;
                  return Z_OK$3;
                }
                beg = 0;
              }
              if (s.gzindex < s.gzhead.comment.length) {
                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
          }
          s.status = HCRC_STATE;
        }
        if (s.status === HCRC_STATE) {
          if (s.gzhead.hcrc) {
            if (s.pending + 2 > s.pending_buf_size) {
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK$3;
              }
            }
            put_byte(s, strm.adler & 255);
            put_byte(s, strm.adler >> 8 & 255);
            strm.adler = 0;
          }
          s.status = BUSY_STATE;
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        }
        if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
          let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
          if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
            s.status = FINISH_STATE;
          }
          if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
            if (strm.avail_out === 0) {
              s.last_flush = -1;
            }
            return Z_OK$3;
          }
          if (bstate === BS_BLOCK_DONE) {
            if (flush === Z_PARTIAL_FLUSH) {
              _tr_align(s);
            } else if (flush !== Z_BLOCK$1) {
              _tr_stored_block(s, 0, 0, false);
              if (flush === Z_FULL_FLUSH$1) {
                zero(s.head);
                if (s.lookahead === 0) {
                  s.strstart = 0;
                  s.block_start = 0;
                  s.insert = 0;
                }
              }
            }
            flush_pending(strm);
            if (strm.avail_out === 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
          }
        }
        if (flush !== Z_FINISH$3) {
          return Z_OK$3;
        }
        if (s.wrap <= 0) {
          return Z_STREAM_END$3;
        }
        if (s.wrap === 2) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          put_byte(s, strm.adler >> 16 & 255);
          put_byte(s, strm.adler >> 24 & 255);
          put_byte(s, strm.total_in & 255);
          put_byte(s, strm.total_in >> 8 & 255);
          put_byte(s, strm.total_in >> 16 & 255);
          put_byte(s, strm.total_in >> 24 & 255);
        } else {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        flush_pending(strm);
        if (s.wrap > 0) {
          s.wrap = -s.wrap;
        }
        return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
      };
      deflateEnd = (strm) => {
        if (deflateStateCheck(strm)) {
          return Z_STREAM_ERROR$2;
        }
        const status = strm.state.status;
        strm.state = null;
        return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
      };
      deflateSetDictionary = (strm, dictionary) => {
        let dictLength = dictionary.length;
        if (deflateStateCheck(strm)) {
          return Z_STREAM_ERROR$2;
        }
        const s = strm.state;
        const wrap = s.wrap;
        if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
          return Z_STREAM_ERROR$2;
        }
        if (wrap === 1) {
          strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
        }
        s.wrap = 0;
        if (dictLength >= s.w_size) {
          if (wrap === 0) {
            zero(s.head);
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
          let tmpDict = new Uint8Array(s.w_size);
          tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
          dictionary = tmpDict;
          dictLength = s.w_size;
        }
        const avail = strm.avail_in;
        const next = strm.next_in;
        const input = strm.input;
        strm.avail_in = dictLength;
        strm.next_in = 0;
        strm.input = dictionary;
        fill_window(s);
        while (s.lookahead >= MIN_MATCH) {
          let str = s.strstart;
          let n = s.lookahead - (MIN_MATCH - 1);
          do {
            s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
          } while (--n);
          s.strstart = str;
          s.lookahead = MIN_MATCH - 1;
          fill_window(s);
        }
        s.strstart += s.lookahead;
        s.block_start = s.strstart;
        s.insert = s.lookahead;
        s.lookahead = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        strm.next_in = next;
        strm.input = input;
        strm.avail_in = avail;
        s.wrap = wrap;
        return Z_OK$3;
      };
      deflateInit_1 = deflateInit;
      deflateInit2_1 = deflateInit2;
      deflateReset_1 = deflateReset;
      deflateResetKeep_1 = deflateResetKeep;
      deflateSetHeader_1 = deflateSetHeader;
      deflate_2$1 = deflate$2;
      deflateEnd_1 = deflateEnd;
      deflateSetDictionary_1 = deflateSetDictionary;
      deflateInfo = "pako deflate (from Nodeca project)";
      deflate_1$2 = {
        deflateInit: deflateInit_1,
        deflateInit2: deflateInit2_1,
        deflateReset: deflateReset_1,
        deflateResetKeep: deflateResetKeep_1,
        deflateSetHeader: deflateSetHeader_1,
        deflate: deflate_2$1,
        deflateEnd: deflateEnd_1,
        deflateSetDictionary: deflateSetDictionary_1,
        deflateInfo
      };
      _has = (obj, key) => {
        return Object.prototype.hasOwnProperty.call(obj, key);
      };
      assign = function(obj) {
        const sources2 = Array.prototype.slice.call(arguments, 1);
        while (sources2.length) {
          const source = sources2.shift();
          if (!source) {
            continue;
          }
          if (typeof source !== "object") {
            throw new TypeError(source + "must be non-object");
          }
          for (const p in source) {
            if (_has(source, p)) {
              obj[p] = source[p];
            }
          }
        }
        return obj;
      };
      flattenChunks = (chunks) => {
        let len = 0;
        for (let i = 0, l = chunks.length; i < l; i++) {
          len += chunks[i].length;
        }
        const result = new Uint8Array(len);
        for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
          let chunk = chunks[i];
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return result;
      };
      common = {
        assign,
        flattenChunks
      };
      STR_APPLY_UIA_OK = true;
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (__) {
        STR_APPLY_UIA_OK = false;
      }
      _utf8len = new Uint8Array(256);
      for (let q = 0; q < 256; q++) {
        _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
      }
      _utf8len[254] = _utf8len[254] = 1;
      string2buf = (str) => {
        if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
          return new TextEncoder().encode(str);
        }
        let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        }
        buf = new Uint8Array(buf_len);
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          if (c < 128) {
            buf[i++] = c;
          } else if (c < 2048) {
            buf[i++] = 192 | c >>> 6;
            buf[i++] = 128 | c & 63;
          } else if (c < 65536) {
            buf[i++] = 224 | c >>> 12;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          } else {
            buf[i++] = 240 | c >>> 18;
            buf[i++] = 128 | c >>> 12 & 63;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          }
        }
        return buf;
      };
      buf2binstring = (buf, len) => {
        if (len < 65534) {
          if (buf.subarray && STR_APPLY_UIA_OK) {
            return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
          }
        }
        let result = "";
        for (let i = 0; i < len; i++) {
          result += String.fromCharCode(buf[i]);
        }
        return result;
      };
      buf2string = (buf, max) => {
        const len = max || buf.length;
        if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
          return new TextDecoder().decode(buf.subarray(0, max));
        }
        let i, out;
        const utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
          let c = buf[i++];
          if (c < 128) {
            utf16buf[out++] = c;
            continue;
          }
          let c_len = _utf8len[c];
          if (c_len > 4) {
            utf16buf[out++] = 65533;
            i += c_len - 1;
            continue;
          }
          c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
          while (c_len > 1 && i < len) {
            c = c << 6 | buf[i++] & 63;
            c_len--;
          }
          if (c_len > 1) {
            utf16buf[out++] = 65533;
            continue;
          }
          if (c < 65536) {
            utf16buf[out++] = c;
          } else {
            c -= 65536;
            utf16buf[out++] = 55296 | c >> 10 & 1023;
            utf16buf[out++] = 56320 | c & 1023;
          }
        }
        return buf2binstring(utf16buf, out);
      };
      utf8border = (buf, max) => {
        max = max || buf.length;
        if (max > buf.length) {
          max = buf.length;
        }
        let pos = max - 1;
        while (pos >= 0 && (buf[pos] & 192) === 128) {
          pos--;
        }
        if (pos < 0) {
          return max;
        }
        if (pos === 0) {
          return max;
        }
        return pos + _utf8len[buf[pos]] > max ? pos : max;
      };
      strings = {
        string2buf,
        buf2string,
        utf8border
      };
      zstream = ZStream;
      toString$1 = Object.prototype.toString;
      ({
        Z_NO_FLUSH: Z_NO_FLUSH$1,
        Z_SYNC_FLUSH,
        Z_FULL_FLUSH,
        Z_FINISH: Z_FINISH$2,
        Z_OK: Z_OK$2,
        Z_STREAM_END: Z_STREAM_END$2,
        Z_DEFAULT_COMPRESSION,
        Z_DEFAULT_STRATEGY,
        Z_DEFLATED: Z_DEFLATED$1
      } = constants$2);
      Deflate$1.prototype.push = function(data, flush_mode) {
        const strm = this.strm;
        const chunkSize = this.options.chunkSize;
        let status, _flush_mode;
        if (this.ended) {
          return false;
        }
        if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
        else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
        if (typeof data === "string") {
          strm.input = strings.string2buf(data);
        } else if (toString$1.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        for (; ; ) {
          if (strm.avail_out === 0) {
            strm.output = new Uint8Array(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
            this.onData(strm.output.subarray(0, strm.next_out));
            strm.avail_out = 0;
            continue;
          }
          status = deflate_1$2.deflate(strm, _flush_mode);
          if (status === Z_STREAM_END$2) {
            if (strm.next_out > 0) {
              this.onData(strm.output.subarray(0, strm.next_out));
            }
            status = deflate_1$2.deflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return status === Z_OK$2;
          }
          if (strm.avail_out === 0) {
            this.onData(strm.output);
            continue;
          }
          if (_flush_mode > 0 && strm.next_out > 0) {
            this.onData(strm.output.subarray(0, strm.next_out));
            strm.avail_out = 0;
            continue;
          }
          if (strm.avail_in === 0) break;
        }
        return true;
      };
      Deflate$1.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Deflate$1.prototype.onEnd = function(status) {
        if (status === Z_OK$2) {
          this.result = common.flattenChunks(this.chunks);
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      Deflate_1$1 = Deflate$1;
      deflate_2 = deflate$1;
      deflateRaw_1$1 = deflateRaw$1;
      gzip_1$1 = gzip$1;
      constants$1 = constants$2;
      deflate_1$1 = {
        Deflate: Deflate_1$1,
        deflate: deflate_2,
        deflateRaw: deflateRaw_1$1,
        gzip: gzip_1$1,
        constants: constants$1
      };
      BAD$1 = 16209;
      TYPE$1 = 16191;
      inffast = function inflate_fast(strm, start) {
        let _in;
        let last;
        let _out;
        let beg;
        let end;
        let dmax;
        let wsize;
        let whave;
        let wnext;
        let s_window;
        let hold;
        let bits;
        let lcode;
        let dcode;
        let lmask;
        let dmask;
        let here;
        let op;
        let len;
        let dist;
        let from;
        let from_source;
        let input, output;
        const state = strm.state;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
        dmax = state.dmax;
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;
        top:
          do {
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = lcode[hold & lmask];
            dolen:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op === 0) {
                  output[_out++] = here & 65535;
                } else if (op & 16) {
                  len = here & 65535;
                  op &= 15;
                  if (op) {
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                    len += hold & (1 << op) - 1;
                    hold >>>= op;
                    bits -= op;
                  }
                  if (bits < 15) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  here = dcode[hold & dmask];
                  dodist:
                    for (; ; ) {
                      op = here >>> 24;
                      hold >>>= op;
                      bits -= op;
                      op = here >>> 16 & 255;
                      if (op & 16) {
                        dist = here & 65535;
                        op &= 15;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                          if (bits < op) {
                            hold += input[_in++] << bits;
                            bits += 8;
                          }
                        }
                        dist += hold & (1 << op) - 1;
                        if (dist > dmax) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD$1;
                          break top;
                        }
                        hold >>>= op;
                        bits -= op;
                        op = _out - beg;
                        if (dist > op) {
                          op = dist - op;
                          if (op > whave) {
                            if (state.sane) {
                              strm.msg = "invalid distance too far back";
                              state.mode = BAD$1;
                              break top;
                            }
                          }
                          from = 0;
                          from_source = s_window;
                          if (wnext === 0) {
                            from += wsize - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          } else if (wnext < op) {
                            from += wsize + wnext - op;
                            op -= wnext;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = 0;
                              if (wnext < len) {
                                op = wnext;
                                len -= op;
                                do {
                                  output[_out++] = s_window[from++];
                                } while (--op);
                                from = _out - dist;
                                from_source = output;
                              }
                            }
                          } else {
                            from += wnext - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                          while (len > 2) {
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            len -= 3;
                          }
                          if (len) {
                            output[_out++] = from_source[from++];
                            if (len > 1) {
                              output[_out++] = from_source[from++];
                            }
                          }
                        } else {
                          from = _out - dist;
                          do {
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            len -= 3;
                          } while (len > 2);
                          if (len) {
                            output[_out++] = output[from++];
                            if (len > 1) {
                              output[_out++] = output[from++];
                            }
                          }
                        }
                      } else if ((op & 64) === 0) {
                        here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                        continue dodist;
                      } else {
                        strm.msg = "invalid distance code";
                        state.mode = BAD$1;
                        break top;
                      }
                      break;
                    }
                } else if ((op & 64) === 0) {
                  here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dolen;
                } else if (op & 32) {
                  state.mode = TYPE$1;
                  break top;
                } else {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } while (_in < last && _out < end);
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
        strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
        state.hold = hold;
        state.bits = bits;
        return;
      };
      MAXBITS = 15;
      ENOUGH_LENS$1 = 852;
      ENOUGH_DISTS$1 = 592;
      CODES$1 = 0;
      LENS$1 = 1;
      DISTS$1 = 2;
      lbase = new Uint16Array([
        /* Length codes 257..285 base */
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        13,
        15,
        17,
        19,
        23,
        27,
        31,
        35,
        43,
        51,
        59,
        67,
        83,
        99,
        115,
        131,
        163,
        195,
        227,
        258,
        0,
        0
      ]);
      lext = new Uint8Array([
        /* Length codes 257..285 extra */
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        17,
        17,
        17,
        17,
        18,
        18,
        18,
        18,
        19,
        19,
        19,
        19,
        20,
        20,
        20,
        20,
        21,
        21,
        21,
        21,
        16,
        72,
        78
      ]);
      dbase = new Uint16Array([
        /* Distance codes 0..29 base */
        1,
        2,
        3,
        4,
        5,
        7,
        9,
        13,
        17,
        25,
        33,
        49,
        65,
        97,
        129,
        193,
        257,
        385,
        513,
        769,
        1025,
        1537,
        2049,
        3073,
        4097,
        6145,
        8193,
        12289,
        16385,
        24577,
        0,
        0
      ]);
      dext = new Uint8Array([
        /* Distance codes 0..29 extra */
        16,
        16,
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
        26,
        27,
        27,
        28,
        28,
        29,
        29,
        64,
        64
      ]);
      inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
        const bits = opts.bits;
        let len = 0;
        let sym = 0;
        let min = 0, max = 0;
        let root = 0;
        let curr = 0;
        let drop = 0;
        let left = 0;
        let used = 0;
        let huff = 0;
        let incr;
        let fill;
        let low;
        let mask;
        let next;
        let base = null;
        let match;
        const count = new Uint16Array(MAXBITS + 1);
        const offs = new Uint16Array(MAXBITS + 1);
        let extra = null;
        let here_bits, here_op, here_val;
        for (len = 0; len <= MAXBITS; len++) {
          count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
          count[lens[lens_index + sym]]++;
        }
        root = bits;
        for (max = MAXBITS; max >= 1; max--) {
          if (count[max] !== 0) {
            break;
          }
        }
        if (root > max) {
          root = max;
        }
        if (max === 0) {
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          opts.bits = 1;
          return 0;
        }
        for (min = 1; min < max; min++) {
          if (count[min] !== 0) {
            break;
          }
        }
        if (root < min) {
          root = min;
        }
        left = 1;
        for (len = 1; len <= MAXBITS; len++) {
          left <<= 1;
          left -= count[len];
          if (left < 0) {
            return -1;
          }
        }
        if (left > 0 && (type === CODES$1 || max !== 1)) {
          return -1;
        }
        offs[1] = 0;
        for (len = 1; len < MAXBITS; len++) {
          offs[len + 1] = offs[len] + count[len];
        }
        for (sym = 0; sym < codes; sym++) {
          if (lens[lens_index + sym] !== 0) {
            work[offs[lens[lens_index + sym]]++] = sym;
          }
        }
        if (type === CODES$1) {
          base = extra = work;
          match = 20;
        } else if (type === LENS$1) {
          base = lbase;
          extra = lext;
          match = 257;
        } else {
          base = dbase;
          extra = dext;
          match = 0;
        }
        huff = 0;
        sym = 0;
        len = min;
        next = table_index;
        curr = root;
        drop = 0;
        low = -1;
        used = 1 << root;
        mask = used - 1;
        if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
          return 1;
        }
        for (; ; ) {
          here_bits = len - drop;
          if (work[sym] + 1 < match) {
            here_op = 0;
            here_val = work[sym];
          } else if (work[sym] >= match) {
            here_op = extra[work[sym] - match];
            here_val = base[work[sym] - match];
          } else {
            here_op = 32 + 64;
            here_val = 0;
          }
          incr = 1 << len - drop;
          fill = 1 << curr;
          min = fill;
          do {
            fill -= incr;
            table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
          } while (fill !== 0);
          incr = 1 << len - 1;
          while (huff & incr) {
            incr >>= 1;
          }
          if (incr !== 0) {
            huff &= incr - 1;
            huff += incr;
          } else {
            huff = 0;
          }
          sym++;
          if (--count[len] === 0) {
            if (len === max) {
              break;
            }
            len = lens[lens_index + work[sym]];
          }
          if (len > root && (huff & mask) !== low) {
            if (drop === 0) {
              drop = root;
            }
            next += min;
            curr = len - drop;
            left = 1 << curr;
            while (curr + drop < max) {
              left -= count[curr + drop];
              if (left <= 0) {
                break;
              }
              curr++;
              left <<= 1;
            }
            used += 1 << curr;
            if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
              return 1;
            }
            low = huff & mask;
            table[low] = root << 24 | curr << 16 | next - table_index | 0;
          }
        }
        if (huff !== 0) {
          table[next + huff] = len - drop << 24 | 64 << 16 | 0;
        }
        opts.bits = root;
        return 0;
      };
      inftrees = inflate_table;
      CODES = 0;
      LENS = 1;
      DISTS = 2;
      ({
        Z_FINISH: Z_FINISH$1,
        Z_BLOCK,
        Z_TREES,
        Z_OK: Z_OK$1,
        Z_STREAM_END: Z_STREAM_END$1,
        Z_NEED_DICT: Z_NEED_DICT$1,
        Z_STREAM_ERROR: Z_STREAM_ERROR$1,
        Z_DATA_ERROR: Z_DATA_ERROR$1,
        Z_MEM_ERROR: Z_MEM_ERROR$1,
        Z_BUF_ERROR,
        Z_DEFLATED
      } = constants$2);
      HEAD = 16180;
      FLAGS = 16181;
      TIME = 16182;
      OS = 16183;
      EXLEN = 16184;
      EXTRA = 16185;
      NAME = 16186;
      COMMENT = 16187;
      HCRC = 16188;
      DICTID = 16189;
      DICT = 16190;
      TYPE = 16191;
      TYPEDO = 16192;
      STORED = 16193;
      COPY_ = 16194;
      COPY = 16195;
      TABLE = 16196;
      LENLENS = 16197;
      CODELENS = 16198;
      LEN_ = 16199;
      LEN = 16200;
      LENEXT = 16201;
      DIST = 16202;
      DISTEXT = 16203;
      MATCH = 16204;
      LIT = 16205;
      CHECK = 16206;
      LENGTH = 16207;
      DONE = 16208;
      BAD = 16209;
      MEM = 16210;
      SYNC = 16211;
      ENOUGH_LENS = 852;
      ENOUGH_DISTS = 592;
      MAX_WBITS = 15;
      DEF_WBITS = MAX_WBITS;
      zswap32 = (q) => {
        return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
      };
      inflateStateCheck = (strm) => {
        if (!strm) {
          return 1;
        }
        const state = strm.state;
        if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
          return 1;
        }
        return 0;
      };
      inflateResetKeep = (strm) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR$1;
        }
        const state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = "";
        if (state.wrap) {
          strm.adler = state.wrap & 1;
        }
        state.mode = HEAD;
        state.last = 0;
        state.havedict = 0;
        state.flags = -1;
        state.dmax = 32768;
        state.head = null;
        state.hold = 0;
        state.bits = 0;
        state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
        state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
        state.sane = 1;
        state.back = -1;
        return Z_OK$1;
      };
      inflateReset = (strm) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR$1;
        }
        const state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep(strm);
      };
      inflateReset2 = (strm, windowBits) => {
        let wrap;
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR$1;
        }
        const state = strm.state;
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else {
          wrap = (windowBits >> 4) + 5;
          if (windowBits < 48) {
            windowBits &= 15;
          }
        }
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
          return Z_STREAM_ERROR$1;
        }
        if (state.window !== null && state.wbits !== windowBits) {
          state.window = null;
        }
        state.wrap = wrap;
        state.wbits = windowBits;
        return inflateReset(strm);
      };
      inflateInit2 = (strm, windowBits) => {
        if (!strm) {
          return Z_STREAM_ERROR$1;
        }
        const state = new InflateState();
        strm.state = state;
        state.strm = strm;
        state.window = null;
        state.mode = HEAD;
        const ret = inflateReset2(strm, windowBits);
        if (ret !== Z_OK$1) {
          strm.state = null;
        }
        return ret;
      };
      inflateInit = (strm) => {
        return inflateInit2(strm, DEF_WBITS);
      };
      virgin = true;
      fixedtables = (state) => {
        if (virgin) {
          lenfix = new Int32Array(512);
          distfix = new Int32Array(32);
          let sym = 0;
          while (sym < 144) {
            state.lens[sym++] = 8;
          }
          while (sym < 256) {
            state.lens[sym++] = 9;
          }
          while (sym < 280) {
            state.lens[sym++] = 7;
          }
          while (sym < 288) {
            state.lens[sym++] = 8;
          }
          inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
          sym = 0;
          while (sym < 32) {
            state.lens[sym++] = 5;
          }
          inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
          virgin = false;
        }
        state.lencode = lenfix;
        state.lenbits = 9;
        state.distcode = distfix;
        state.distbits = 5;
      };
      updatewindow = (strm, src, end, copy) => {
        let dist;
        const state = strm.state;
        if (state.window === null) {
          state.wsize = 1 << state.wbits;
          state.wnext = 0;
          state.whave = 0;
          state.window = new Uint8Array(state.wsize);
        }
        if (copy >= state.wsize) {
          state.window.set(src.subarray(end - state.wsize, end), 0);
          state.wnext = 0;
          state.whave = state.wsize;
        } else {
          dist = state.wsize - state.wnext;
          if (dist > copy) {
            dist = copy;
          }
          state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
          copy -= dist;
          if (copy) {
            state.window.set(src.subarray(end - copy, end), 0);
            state.wnext = copy;
            state.whave = state.wsize;
          } else {
            state.wnext += dist;
            if (state.wnext === state.wsize) {
              state.wnext = 0;
            }
            if (state.whave < state.wsize) {
              state.whave += dist;
            }
          }
        }
        return 0;
      };
      inflate$2 = (strm, flush) => {
        let state;
        let input, output;
        let next;
        let put;
        let have, left;
        let hold;
        let bits;
        let _in, _out;
        let copy;
        let from;
        let from_source;
        let here = 0;
        let here_bits, here_op, here_val;
        let last_bits, last_op, last_val;
        let len;
        let ret;
        const hbuf = new Uint8Array(4);
        let opts;
        let n;
        const order = (
          /* permutation of code lengths */
          new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
        );
        if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
          return Z_STREAM_ERROR$1;
        }
        state = strm.state;
        if (state.mode === TYPE) {
          state.mode = TYPEDO;
        }
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        _in = have;
        _out = left;
        ret = Z_OK$1;
        inf_leave:
          for (; ; ) {
            switch (state.mode) {
              case HEAD:
                if (state.wrap === 0) {
                  state.mode = TYPEDO;
                  break;
                }
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.wrap & 2 && hold === 35615) {
                  if (state.wbits === 0) {
                    state.wbits = 15;
                  }
                  state.check = 0;
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32_1(state.check, hbuf, 2, 0);
                  hold = 0;
                  bits = 0;
                  state.mode = FLAGS;
                  break;
                }
                if (state.head) {
                  state.head.done = false;
                }
                if (!(state.wrap & 1) || /* check if zlib header allowed */
                (((hold & 255) << 8) + (hold >> 8)) % 31) {
                  strm.msg = "incorrect header check";
                  state.mode = BAD;
                  break;
                }
                if ((hold & 15) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                hold >>>= 4;
                bits -= 4;
                len = (hold & 15) + 8;
                if (state.wbits === 0) {
                  state.wbits = len;
                }
                if (len > 15 || len > state.wbits) {
                  strm.msg = "invalid window size";
                  state.mode = BAD;
                  break;
                }
                state.dmax = 1 << state.wbits;
                state.flags = 0;
                strm.adler = state.check = 1;
                state.mode = hold & 512 ? DICTID : TYPE;
                hold = 0;
                bits = 0;
                break;
              case FLAGS:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.flags = hold;
                if ((state.flags & 255) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                if (state.flags & 57344) {
                  strm.msg = "unknown header flags set";
                  state.mode = BAD;
                  break;
                }
                if (state.head) {
                  state.head.text = hold >> 8 & 1;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32_1(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = TIME;
              /* falls through */
              case TIME:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.time = hold;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  hbuf[2] = hold >>> 16 & 255;
                  hbuf[3] = hold >>> 24 & 255;
                  state.check = crc32_1(state.check, hbuf, 4, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = OS;
              /* falls through */
              case OS:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.xflags = hold & 255;
                  state.head.os = hold >> 8;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32_1(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = EXLEN;
              /* falls through */
              case EXLEN:
                if (state.flags & 1024) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length = hold;
                  if (state.head) {
                    state.head.extra_len = hold;
                  }
                  if (state.flags & 512 && state.wrap & 4) {
                    hbuf[0] = hold & 255;
                    hbuf[1] = hold >>> 8 & 255;
                    state.check = crc32_1(state.check, hbuf, 2, 0);
                  }
                  hold = 0;
                  bits = 0;
                } else if (state.head) {
                  state.head.extra = null;
                }
                state.mode = EXTRA;
              /* falls through */
              case EXTRA:
                if (state.flags & 1024) {
                  copy = state.length;
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy) {
                    if (state.head) {
                      len = state.head.extra_len - state.length;
                      if (!state.head.extra) {
                        state.head.extra = new Uint8Array(state.head.extra_len);
                      }
                      state.head.extra.set(
                        input.subarray(
                          next,
                          // extra field is limited to 65536 bytes
                          // - no need for additional size check
                          next + copy
                        ),
                        /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                        len
                      );
                    }
                    if (state.flags & 512 && state.wrap & 4) {
                      state.check = crc32_1(state.check, input, copy, next);
                    }
                    have -= copy;
                    next += copy;
                    state.length -= copy;
                  }
                  if (state.length) {
                    break inf_leave;
                  }
                }
                state.length = 0;
                state.mode = NAME;
              /* falls through */
              case NAME:
                if (state.flags & 2048) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.name += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512 && state.wrap & 4) {
                    state.check = crc32_1(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.name = null;
                }
                state.length = 0;
                state.mode = COMMENT;
              /* falls through */
              case COMMENT:
                if (state.flags & 4096) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.comment += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512 && state.wrap & 4) {
                    state.check = crc32_1(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.comment = null;
                }
                state.mode = HCRC;
              /* falls through */
              case HCRC:
                if (state.flags & 512) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.wrap & 4 && hold !== (state.check & 65535)) {
                    strm.msg = "header crc mismatch";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                if (state.head) {
                  state.head.hcrc = state.flags >> 9 & 1;
                  state.head.done = true;
                }
                strm.adler = state.check = 0;
                state.mode = TYPE;
                break;
              case DICTID:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                strm.adler = state.check = zswap32(hold);
                hold = 0;
                bits = 0;
                state.mode = DICT;
              /* falls through */
              case DICT:
                if (state.havedict === 0) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  return Z_NEED_DICT$1;
                }
                strm.adler = state.check = 1;
                state.mode = TYPE;
              /* falls through */
              case TYPE:
                if (flush === Z_BLOCK || flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case TYPEDO:
                if (state.last) {
                  hold >>>= bits & 7;
                  bits -= bits & 7;
                  state.mode = CHECK;
                  break;
                }
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.last = hold & 1;
                hold >>>= 1;
                bits -= 1;
                switch (hold & 3) {
                  case 0:
                    state.mode = STORED;
                    break;
                  case 1:
                    fixedtables(state);
                    state.mode = LEN_;
                    if (flush === Z_TREES) {
                      hold >>>= 2;
                      bits -= 2;
                      break inf_leave;
                    }
                    break;
                  case 2:
                    state.mode = TABLE;
                    break;
                  case 3:
                    strm.msg = "invalid block type";
                    state.mode = BAD;
                }
                hold >>>= 2;
                bits -= 2;
                break;
              case STORED:
                hold >>>= bits & 7;
                bits -= bits & 7;
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                  strm.msg = "invalid stored block lengths";
                  state.mode = BAD;
                  break;
                }
                state.length = hold & 65535;
                hold = 0;
                bits = 0;
                state.mode = COPY_;
                if (flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case COPY_:
                state.mode = COPY;
              /* falls through */
              case COPY:
                copy = state.length;
                if (copy) {
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy > left) {
                    copy = left;
                  }
                  if (copy === 0) {
                    break inf_leave;
                  }
                  output.set(input.subarray(next, next + copy), put);
                  have -= copy;
                  next += copy;
                  left -= copy;
                  put += copy;
                  state.length -= copy;
                  break;
                }
                state.mode = TYPE;
                break;
              case TABLE:
                while (bits < 14) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.nlen = (hold & 31) + 257;
                hold >>>= 5;
                bits -= 5;
                state.ndist = (hold & 31) + 1;
                hold >>>= 5;
                bits -= 5;
                state.ncode = (hold & 15) + 4;
                hold >>>= 4;
                bits -= 4;
                if (state.nlen > 286 || state.ndist > 30) {
                  strm.msg = "too many length or distance symbols";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = LENLENS;
              /* falls through */
              case LENLENS:
                while (state.have < state.ncode) {
                  while (bits < 3) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.lens[order[state.have++]] = hold & 7;
                  hold >>>= 3;
                  bits -= 3;
                }
                while (state.have < 19) {
                  state.lens[order[state.have++]] = 0;
                }
                state.lencode = state.lendyn;
                state.lenbits = 7;
                opts = { bits: state.lenbits };
                ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid code lengths set";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = CODELENS;
              /* falls through */
              case CODELENS:
                while (state.have < state.nlen + state.ndist) {
                  for (; ; ) {
                    here = state.lencode[hold & (1 << state.lenbits) - 1];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (here_val < 16) {
                    hold >>>= here_bits;
                    bits -= here_bits;
                    state.lens[state.have++] = here_val;
                  } else {
                    if (here_val === 16) {
                      n = here_bits + 2;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      if (state.have === 0) {
                        strm.msg = "invalid bit length repeat";
                        state.mode = BAD;
                        break;
                      }
                      len = state.lens[state.have - 1];
                      copy = 3 + (hold & 3);
                      hold >>>= 2;
                      bits -= 2;
                    } else if (here_val === 17) {
                      n = here_bits + 3;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 3 + (hold & 7);
                      hold >>>= 3;
                      bits -= 3;
                    } else {
                      n = here_bits + 7;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 11 + (hold & 127);
                      hold >>>= 7;
                      bits -= 7;
                    }
                    if (state.have + copy > state.nlen + state.ndist) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD;
                      break;
                    }
                    while (copy--) {
                      state.lens[state.have++] = len;
                    }
                  }
                }
                if (state.mode === BAD) {
                  break;
                }
                if (state.lens[256] === 0) {
                  strm.msg = "invalid code -- missing end-of-block";
                  state.mode = BAD;
                  break;
                }
                state.lenbits = 9;
                opts = { bits: state.lenbits };
                ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid literal/lengths set";
                  state.mode = BAD;
                  break;
                }
                state.distbits = 6;
                state.distcode = state.distdyn;
                opts = { bits: state.distbits };
                ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                state.distbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid distances set";
                  state.mode = BAD;
                  break;
                }
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case LEN_:
                state.mode = LEN;
              /* falls through */
              case LEN:
                if (have >= 6 && left >= 258) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  inffast(strm, _out);
                  put = strm.next_out;
                  output = strm.output;
                  left = strm.avail_out;
                  next = strm.next_in;
                  input = strm.input;
                  have = strm.avail_in;
                  hold = state.hold;
                  bits = state.bits;
                  if (state.mode === TYPE) {
                    state.back = -1;
                  }
                  break;
                }
                state.back = 0;
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_op && (here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                state.length = here_val;
                if (here_op === 0) {
                  state.mode = LIT;
                  break;
                }
                if (here_op & 32) {
                  state.back = -1;
                  state.mode = TYPE;
                  break;
                }
                if (here_op & 64) {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD;
                  break;
                }
                state.extra = here_op & 15;
                state.mode = LENEXT;
              /* falls through */
              case LENEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                state.was = state.length;
                state.mode = DIST;
              /* falls through */
              case DIST:
                for (; ; ) {
                  here = state.distcode[hold & (1 << state.distbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                if (here_op & 64) {
                  strm.msg = "invalid distance code";
                  state.mode = BAD;
                  break;
                }
                state.offset = here_val;
                state.extra = here_op & 15;
                state.mode = DISTEXT;
              /* falls through */
              case DISTEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.offset += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                if (state.offset > state.dmax) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
                state.mode = MATCH;
              /* falls through */
              case MATCH:
                if (left === 0) {
                  break inf_leave;
                }
                copy = _out - left;
                if (state.offset > copy) {
                  copy = state.offset - copy;
                  if (copy > state.whave) {
                    if (state.sane) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD;
                      break;
                    }
                  }
                  if (copy > state.wnext) {
                    copy -= state.wnext;
                    from = state.wsize - copy;
                  } else {
                    from = state.wnext - copy;
                  }
                  if (copy > state.length) {
                    copy = state.length;
                  }
                  from_source = state.window;
                } else {
                  from_source = output;
                  from = put - state.offset;
                  copy = state.length;
                }
                if (copy > left) {
                  copy = left;
                }
                left -= copy;
                state.length -= copy;
                do {
                  output[put++] = from_source[from++];
                } while (--copy);
                if (state.length === 0) {
                  state.mode = LEN;
                }
                break;
              case LIT:
                if (left === 0) {
                  break inf_leave;
                }
                output[put++] = state.length;
                left--;
                state.mode = LEN;
                break;
              case CHECK:
                if (state.wrap) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold |= input[next++] << bits;
                    bits += 8;
                  }
                  _out -= left;
                  strm.total_out += _out;
                  state.total += _out;
                  if (state.wrap & 4 && _out) {
                    strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
                    state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
                  }
                  _out = left;
                  if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
                    strm.msg = "incorrect data check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = LENGTH;
              /* falls through */
              case LENGTH:
                if (state.wrap && state.flags) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
                    strm.msg = "incorrect length check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = DONE;
              /* falls through */
              case DONE:
                ret = Z_STREAM_END$1;
                break inf_leave;
              case BAD:
                ret = Z_DATA_ERROR$1;
                break inf_leave;
              case MEM:
                return Z_MEM_ERROR$1;
              case SYNC:
              /* falls through */
              default:
                return Z_STREAM_ERROR$1;
            }
          }
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
          if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap & 4 && _out) {
          strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
          state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
        if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
          ret = Z_BUF_ERROR;
        }
        return ret;
      };
      inflateEnd = (strm) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR$1;
        }
        let state = strm.state;
        if (state.window) {
          state.window = null;
        }
        strm.state = null;
        return Z_OK$1;
      };
      inflateGetHeader = (strm, head) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR$1;
        }
        const state = strm.state;
        if ((state.wrap & 2) === 0) {
          return Z_STREAM_ERROR$1;
        }
        state.head = head;
        head.done = false;
        return Z_OK$1;
      };
      inflateSetDictionary = (strm, dictionary) => {
        const dictLength = dictionary.length;
        let state;
        let dictid;
        let ret;
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR$1;
        }
        state = strm.state;
        if (state.wrap !== 0 && state.mode !== DICT) {
          return Z_STREAM_ERROR$1;
        }
        if (state.mode === DICT) {
          dictid = 1;
          dictid = adler32_1(dictid, dictionary, dictLength, 0);
          if (dictid !== state.check) {
            return Z_DATA_ERROR$1;
          }
        }
        ret = updatewindow(strm, dictionary, dictLength, dictLength);
        if (ret) {
          state.mode = MEM;
          return Z_MEM_ERROR$1;
        }
        state.havedict = 1;
        return Z_OK$1;
      };
      inflateReset_1 = inflateReset;
      inflateReset2_1 = inflateReset2;
      inflateResetKeep_1 = inflateResetKeep;
      inflateInit_1 = inflateInit;
      inflateInit2_1 = inflateInit2;
      inflate_2$1 = inflate$2;
      inflateEnd_1 = inflateEnd;
      inflateGetHeader_1 = inflateGetHeader;
      inflateSetDictionary_1 = inflateSetDictionary;
      inflateInfo = "pako inflate (from Nodeca project)";
      inflate_1$2 = {
        inflateReset: inflateReset_1,
        inflateReset2: inflateReset2_1,
        inflateResetKeep: inflateResetKeep_1,
        inflateInit: inflateInit_1,
        inflateInit2: inflateInit2_1,
        inflate: inflate_2$1,
        inflateEnd: inflateEnd_1,
        inflateGetHeader: inflateGetHeader_1,
        inflateSetDictionary: inflateSetDictionary_1,
        inflateInfo
      };
      gzheader = GZheader;
      toString = Object.prototype.toString;
      ({
        Z_NO_FLUSH,
        Z_FINISH,
        Z_OK,
        Z_STREAM_END,
        Z_NEED_DICT,
        Z_STREAM_ERROR,
        Z_DATA_ERROR,
        Z_MEM_ERROR
      } = constants$2);
      Inflate$1.prototype.push = function(data, flush_mode) {
        const strm = this.strm;
        const chunkSize = this.options.chunkSize;
        const dictionary = this.options.dictionary;
        let status, _flush_mode, last_avail_out;
        if (this.ended) return false;
        if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
        else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
        if (toString.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        for (; ; ) {
          if (strm.avail_out === 0) {
            strm.output = new Uint8Array(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = inflate_1$2.inflate(strm, _flush_mode);
          if (status === Z_NEED_DICT && dictionary) {
            status = inflate_1$2.inflateSetDictionary(strm, dictionary);
            if (status === Z_OK) {
              status = inflate_1$2.inflate(strm, _flush_mode);
            } else if (status === Z_DATA_ERROR) {
              status = Z_NEED_DICT;
            }
          }
          while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
            inflate_1$2.inflateReset(strm);
            status = inflate_1$2.inflate(strm, _flush_mode);
          }
          switch (status) {
            case Z_STREAM_ERROR:
            case Z_DATA_ERROR:
            case Z_NEED_DICT:
            case Z_MEM_ERROR:
              this.onEnd(status);
              this.ended = true;
              return false;
          }
          last_avail_out = strm.avail_out;
          if (strm.next_out) {
            if (strm.avail_out === 0 || status === Z_STREAM_END) {
              if (this.options.to === "string") {
                let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                let tail = strm.next_out - next_out_utf8;
                let utf8str = strings.buf2string(strm.output, next_out_utf8);
                strm.next_out = tail;
                strm.avail_out = chunkSize - tail;
                if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
                this.onData(utf8str);
              } else {
                this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
              }
            }
          }
          if (status === Z_OK && last_avail_out === 0) continue;
          if (status === Z_STREAM_END) {
            status = inflate_1$2.inflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return true;
          }
          if (strm.avail_in === 0) break;
        }
        return true;
      };
      Inflate$1.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Inflate$1.prototype.onEnd = function(status) {
        if (status === Z_OK) {
          if (this.options.to === "string") {
            this.result = this.chunks.join("");
          } else {
            this.result = common.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      Inflate_1$1 = Inflate$1;
      inflate_2 = inflate$1;
      inflateRaw_1$1 = inflateRaw$1;
      ungzip$1 = inflate$1;
      constants = constants$2;
      inflate_1$1 = {
        Inflate: Inflate_1$1,
        inflate: inflate_2,
        inflateRaw: inflateRaw_1$1,
        ungzip: ungzip$1,
        constants
      };
      ({ Deflate, deflate, deflateRaw, gzip } = deflate_1$1);
      ({ Inflate, inflate, inflateRaw, ungzip } = inflate_1$1);
      Deflate_1 = Deflate;
      deflate_1 = deflate;
      deflateRaw_1 = deflateRaw;
      gzip_1 = gzip;
      Inflate_1 = Inflate;
      inflate_1 = inflate;
      inflateRaw_1 = inflateRaw;
      ungzip_1 = ungzip;
      constants_1 = constants$2;
      pako = {
        Deflate: Deflate_1,
        deflate: deflate_1,
        deflateRaw: deflateRaw_1,
        gzip: gzip_1,
        Inflate: Inflate_1,
        inflate: inflate_1,
        inflateRaw: inflateRaw_1,
        ungzip: ungzip_1,
        constants: constants_1
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/request.js
  var defaultHeaders, httpFetch, httpGet, handleDeflateRaw, regx, handleRequestData, blobToBuffer, fetchData;
  var init_request = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/request.js"() {
      init_background_timer();
      init_message();
      init_options();
      init_pako_esm();
      defaultHeaders = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
      };
      httpFetch = (url, options = { method: "get" }) => {
        const requestObj = fetchData(url, options);
        return {
          promise: requestObj.request.catch((err2) => {
            console.log("\u51FA\u9519", err2.message);
            switch (err2.message) {
              case "socket hang up":
                return Promise.reject(new Error(requestMsg.unachievable));
              case "Aborted":
                return Promise.reject(new Error(requestMsg.timeout));
              case "Network request failed":
                return Promise.reject(new Error(requestMsg.notConnectNetwork));
              default:
                return Promise.reject(err2);
            }
          }),
          cancelHttp() {
            requestObj.abort();
          }
        };
      };
      httpGet = (url, options, callback) => {
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        const requestObj = fetchData(url, { ...options, method: "get" });
        requestObj.request.then((resp) => {
          callback(null, resp, resp.body);
        }).catch((err2) => {
          callback(err2, null, null);
        });
        return () => {
          requestObj.abort();
        };
      };
      handleDeflateRaw = (data) => new Promise((resolve, reject) => {
        resolve(Buffer.from(deflateRaw_1(data)));
      });
      regx = /(?:\d\w)+/g;
      handleRequestData = async (url, {
        method = "get",
        headers: headers2 = {},
        format = "json",
        cache = "no-store",
        ...options
      }) => {
        headers2 = Object.assign({
          Accept: "application/json"
        }, headers2);
        options.cache = cache;
        if (method.toLocaleLowerCase() === "post" && !headers2["Content-Type"]) {
          if (options.form) {
            headers2["Content-Type"] = "application/x-www-form-urlencoded";
            const formBody = [];
            for (let [key, value] of Object.entries(options.form)) {
              let encodedKey = encodeURIComponent(key);
              let encodedValue = encodeURIComponent(value);
              formBody.push(`${encodedKey}=${encodedValue}`);
            }
            options.body = formBody.join("&");
            delete options.form;
          } else if (options.formData) {
            headers2["Content-Type"] = "multipart/form-data";
            const formBody = [];
            for (let [key, value] of Object.entries(options.form)) {
              let encodedKey = encodeURIComponent(key);
              let encodedValue = encodeURIComponent(value);
              formBody.push(`${encodedKey}=${encodedValue}`);
            }
            options.body = options.formData;
            delete options.formData;
          } else {
            headers2["Content-Type"] = "application/json";
          }
        }
        if (headers2["Content-Type"] === "application/json" && options.body) {
          options.body = JSON.stringify(options.body);
        }
        if (headers2[bHh]) {
          let s = Buffer.from(bHh, "hex").toString();
          s = s.replace(s.substr(-1), "");
          s = Buffer.from(s, "base64").toString();
          const v = process.versions.app.split("-")[0].split(".").map((n) => n.length < 3 ? n.padStart(3, "0") : n).join("");
          const v2 = process.versions.app.split("-")[1] || "";
          headers2[s] = !s || `${(await handleDeflateRaw(Buffer.from(JSON.stringify(`${url}${v}`.match(regx), null, 1).concat(v)).toString("base64"))).toString("hex")}&${parseInt(v)}${v2}`;
          delete headers2[bHh];
        }
        return {
          ...options,
          method,
          headers: Object.assign({}, defaultHeaders, headers2)
        };
      };
      blobToBuffer = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new global.FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            const data = reader.result.slice(reader.result.indexOf("base64,") + 7);
            resolve(Buffer.from(data, "base64"));
          };
          reader.readAsDataURL(blob);
        });
      };
      fetchData = (url, { timeout = 15e3, ...options }) => {
        console.log("---start---", url);
        const controller = new global.AbortController();
        let id = background_timer_default.setTimeout(() => {
          id = null;
          controller.abort();
        }, timeout);
        return {
          request: handleRequestData(url, options).then((options2) => {
            return global.fetch(url, {
              ...options2,
              signal: controller.signal
            }).then((resp) => (options2.binary ? resp.blob() : resp.text()).then((text) => {
              return {
                headers: resp.headers.map,
                body: text,
                statusCode: resp.status,
                url: resp.url,
                ok: resp.ok
              };
            })).then((resp) => {
              if (options2.binary) {
                return blobToBuffer(resp.body).then((buffer) => {
                  resp.body = buffer;
                  return resp;
                });
              } else {
                try {
                  resp.body = JSON.parse(resp.body);
                } catch {
                }
                return resp;
              }
            }).catch((err2) => {
              return Promise.reject(err2);
            }).finally(() => {
              if (id == null) return;
              background_timer_default.clearTimeout(id);
            });
          }),
          abort() {
            controller.abort();
          }
        };
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/common.ts
  var sizeFormate, toDateObj, numFix, dateFormat, formatPlayTime, encodeNames, decodeName, b64DecodeUnicode;
  var init_common = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/common.ts"() {
      sizeFormate = (size) => {
        if (!size) return "0 B";
        let units = ["B", "KB", "MB", "GB", "TB"];
        let number = Math.floor(Math.log(size) / Math.log(1024));
        return `${(size / Math.pow(1024, Math.floor(number))).toFixed(2)} ${units[number]}`;
      };
      toDateObj = (date) => {
        if (!date) return "";
        switch (typeof date) {
          case "string":
            if (!date.includes("T")) date = date.split(".")[0].replace(/-/g, "/");
          // eslint-disable-next-line no-fallthrough
          case "number":
            date = new Date(date);
          // eslint-disable-next-line no-fallthrough
          case "object":
            break;
          default:
            return "";
        }
        return date;
      };
      numFix = (n) => n < 10 ? `0${n}` : n.toString();
      dateFormat = (_date, format = "Y-M-D h:m:s") => {
        const date = toDateObj(_date);
        if (!date) return "";
        return format.replace("Y", date.getFullYear().toString()).replace("M", numFix(date.getMonth() + 1)).replace("D", numFix(date.getDate())).replace("h", numFix(date.getHours())).replace("m", numFix(date.getMinutes())).replace("s", numFix(date.getSeconds()));
      };
      formatPlayTime = (time) => {
        let m = Math.trunc(time / 60);
        let s = Math.trunc(time % 60);
        return m == 0 && s == 0 ? "--/--" : numFix(m) + ":" + numFix(s);
      };
      encodeNames = {
        "&nbsp;": " ",
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'",
        "&#039;": "'"
      };
      decodeName = (str = "") => {
        return str?.replace(/(?:&amp;|&lt;|&gt;|&quot;|&apos;|&#039;|&nbsp;)/gm, (s) => encodeNames[s]) ?? "";
      };
      b64DecodeUnicode = (str) => {
        return Buffer.from(str, "base64").toString();
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/simplify-chinese-main/chinese.js
  var init_chinese = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/simplify-chinese-main/chinese.js"() {
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/simplify-chinese-main/index.js
  var init_simplify_chinese_main = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/simplify-chinese-main/index.js"() {
      init_chinese();
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/index.ts
  var formatSingerName, dateFormat2;
  var init_utils = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/index.ts"() {
      init_common();
      init_simplify_chinese_main();
      init_common();
      formatSingerName = (names, type = "name", joinStr = "\u3001") => {
        if (Array.isArray(names)) {
          const arr = [];
          names.forEach((item) => {
            const name = item[type];
            if (name) arr.push(name);
          });
          return decodeName(arr.join(joinStr));
        }
        return decodeName(String(names ?? ""));
      };
      dateFormat2 = (time) => {
        let differ = Math.trunc((Date.now() - time) / 1e3);
        if (differ < 60) {
          return global.i18n.t("date_format_second", { num: differ });
        } else if (differ < 3600) {
          return global.i18n.t("date_format_minute", { num: Math.trunc(differ / 60) });
        } else if (differ < 86400) {
          return global.i18n.t("date_format_hour", { num: Math.trunc(differ / 3600) });
        } else {
          return dateFormat(time);
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/trees.js
  var require_trees = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/trees.js"(exports, module) {
      "use strict";
      var Z_FIXED2 = 4;
      var Z_BINARY2 = 0;
      var Z_TEXT2 = 1;
      var Z_UNKNOWN2 = 2;
      function zero2(buf) {
        let len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      }
      var STORED_BLOCK2 = 0;
      var STATIC_TREES2 = 1;
      var DYN_TREES2 = 2;
      var MIN_MATCH2 = 3;
      var MAX_MATCH2 = 258;
      var LENGTH_CODES2 = 29;
      var LITERALS2 = 256;
      var L_CODES2 = LITERALS2 + 1 + LENGTH_CODES2;
      var D_CODES2 = 30;
      var BL_CODES2 = 19;
      var HEAP_SIZE2 = 2 * L_CODES2 + 1;
      var MAX_BITS2 = 15;
      var Buf_size2 = 16;
      var MAX_BL_BITS2 = 7;
      var END_BLOCK2 = 256;
      var REP_3_62 = 16;
      var REPZ_3_102 = 17;
      var REPZ_11_1382 = 18;
      var extra_lbits2 = (
        /* extra bits for each length code */
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
      );
      var extra_dbits2 = (
        /* extra bits for each distance code */
        new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
      );
      var extra_blbits2 = (
        /* extra bits for each bit length code */
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
      );
      var bl_order2 = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      var DIST_CODE_LEN2 = 512;
      var static_ltree2 = new Array((L_CODES2 + 2) * 2);
      zero2(static_ltree2);
      var static_dtree2 = new Array(D_CODES2 * 2);
      zero2(static_dtree2);
      var _dist_code2 = new Array(DIST_CODE_LEN2);
      zero2(_dist_code2);
      var _length_code2 = new Array(MAX_MATCH2 - MIN_MATCH2 + 1);
      zero2(_length_code2);
      var base_length2 = new Array(LENGTH_CODES2);
      zero2(base_length2);
      var base_dist2 = new Array(D_CODES2);
      zero2(base_dist2);
      function StaticTreeDesc2(static_tree, extra_bits, extra_base, elems, max_length) {
        this.static_tree = static_tree;
        this.extra_bits = extra_bits;
        this.extra_base = extra_base;
        this.elems = elems;
        this.max_length = max_length;
        this.has_stree = static_tree && static_tree.length;
      }
      var static_l_desc2;
      var static_d_desc2;
      var static_bl_desc2;
      function TreeDesc2(dyn_tree, stat_desc) {
        this.dyn_tree = dyn_tree;
        this.max_code = 0;
        this.stat_desc = stat_desc;
      }
      var d_code2 = (dist) => {
        return dist < 256 ? _dist_code2[dist] : _dist_code2[256 + (dist >>> 7)];
      };
      var put_short2 = (s, w) => {
        s.pending_buf[s.pending++] = w & 255;
        s.pending_buf[s.pending++] = w >>> 8 & 255;
      };
      var send_bits2 = (s, value, length) => {
        if (s.bi_valid > Buf_size2 - length) {
          s.bi_buf |= value << s.bi_valid & 65535;
          put_short2(s, s.bi_buf);
          s.bi_buf = value >> Buf_size2 - s.bi_valid;
          s.bi_valid += length - Buf_size2;
        } else {
          s.bi_buf |= value << s.bi_valid & 65535;
          s.bi_valid += length;
        }
      };
      var send_code2 = (s, c, tree) => {
        send_bits2(
          s,
          tree[c * 2],
          tree[c * 2 + 1]
          /*.Len*/
        );
      };
      var bi_reverse2 = (code, len) => {
        let res = 0;
        do {
          res |= code & 1;
          code >>>= 1;
          res <<= 1;
        } while (--len > 0);
        return res >>> 1;
      };
      var bi_flush2 = (s) => {
        if (s.bi_valid === 16) {
          put_short2(s, s.bi_buf);
          s.bi_buf = 0;
          s.bi_valid = 0;
        } else if (s.bi_valid >= 8) {
          s.pending_buf[s.pending++] = s.bi_buf & 255;
          s.bi_buf >>= 8;
          s.bi_valid -= 8;
        }
      };
      var gen_bitlen2 = (s, desc) => {
        const tree = desc.dyn_tree;
        const max_code = desc.max_code;
        const stree = desc.stat_desc.static_tree;
        const has_stree = desc.stat_desc.has_stree;
        const extra = desc.stat_desc.extra_bits;
        const base = desc.stat_desc.extra_base;
        const max_length = desc.stat_desc.max_length;
        let h;
        let n, m;
        let bits;
        let xbits;
        let f;
        let overflow = 0;
        for (bits = 0; bits <= MAX_BITS2; bits++) {
          s.bl_count[bits] = 0;
        }
        tree[s.heap[s.heap_max] * 2 + 1] = 0;
        for (h = s.heap_max + 1; h < HEAP_SIZE2; h++) {
          n = s.heap[h];
          bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }
          tree[n * 2 + 1] = bits;
          if (n > max_code) {
            continue;
          }
          s.bl_count[bits]++;
          xbits = 0;
          if (n >= base) {
            xbits = extra[n - base];
          }
          f = tree[n * 2];
          s.opt_len += f * (bits + xbits);
          if (has_stree) {
            s.static_len += f * (stree[n * 2 + 1] + xbits);
          }
        }
        if (overflow === 0) {
          return;
        }
        do {
          bits = max_length - 1;
          while (s.bl_count[bits] === 0) {
            bits--;
          }
          s.bl_count[bits]--;
          s.bl_count[bits + 1] += 2;
          s.bl_count[max_length]--;
          overflow -= 2;
        } while (overflow > 0);
        for (bits = max_length; bits !== 0; bits--) {
          n = s.bl_count[bits];
          while (n !== 0) {
            m = s.heap[--h];
            if (m > max_code) {
              continue;
            }
            if (tree[m * 2 + 1] !== bits) {
              s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
              tree[m * 2 + 1] = bits;
            }
            n--;
          }
        }
      };
      var gen_codes2 = (tree, max_code, bl_count) => {
        const next_code = new Array(MAX_BITS2 + 1);
        let code = 0;
        let bits;
        let n;
        for (bits = 1; bits <= MAX_BITS2; bits++) {
          code = code + bl_count[bits - 1] << 1;
          next_code[bits] = code;
        }
        for (n = 0; n <= max_code; n++) {
          let len = tree[n * 2 + 1];
          if (len === 0) {
            continue;
          }
          tree[n * 2] = bi_reverse2(next_code[len]++, len);
        }
      };
      var tr_static_init2 = () => {
        let n;
        let bits;
        let length;
        let code;
        let dist;
        const bl_count = new Array(MAX_BITS2 + 1);
        length = 0;
        for (code = 0; code < LENGTH_CODES2 - 1; code++) {
          base_length2[code] = length;
          for (n = 0; n < 1 << extra_lbits2[code]; n++) {
            _length_code2[length++] = code;
          }
        }
        _length_code2[length - 1] = code;
        dist = 0;
        for (code = 0; code < 16; code++) {
          base_dist2[code] = dist;
          for (n = 0; n < 1 << extra_dbits2[code]; n++) {
            _dist_code2[dist++] = code;
          }
        }
        dist >>= 7;
        for (; code < D_CODES2; code++) {
          base_dist2[code] = dist << 7;
          for (n = 0; n < 1 << extra_dbits2[code] - 7; n++) {
            _dist_code2[256 + dist++] = code;
          }
        }
        for (bits = 0; bits <= MAX_BITS2; bits++) {
          bl_count[bits] = 0;
        }
        n = 0;
        while (n <= 143) {
          static_ltree2[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        while (n <= 255) {
          static_ltree2[n * 2 + 1] = 9;
          n++;
          bl_count[9]++;
        }
        while (n <= 279) {
          static_ltree2[n * 2 + 1] = 7;
          n++;
          bl_count[7]++;
        }
        while (n <= 287) {
          static_ltree2[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        gen_codes2(static_ltree2, L_CODES2 + 1, bl_count);
        for (n = 0; n < D_CODES2; n++) {
          static_dtree2[n * 2 + 1] = 5;
          static_dtree2[n * 2] = bi_reverse2(n, 5);
        }
        static_l_desc2 = new StaticTreeDesc2(static_ltree2, extra_lbits2, LITERALS2 + 1, L_CODES2, MAX_BITS2);
        static_d_desc2 = new StaticTreeDesc2(static_dtree2, extra_dbits2, 0, D_CODES2, MAX_BITS2);
        static_bl_desc2 = new StaticTreeDesc2(new Array(0), extra_blbits2, 0, BL_CODES2, MAX_BL_BITS2);
      };
      var init_block2 = (s) => {
        let n;
        for (n = 0; n < L_CODES2; n++) {
          s.dyn_ltree[n * 2] = 0;
        }
        for (n = 0; n < D_CODES2; n++) {
          s.dyn_dtree[n * 2] = 0;
        }
        for (n = 0; n < BL_CODES2; n++) {
          s.bl_tree[n * 2] = 0;
        }
        s.dyn_ltree[END_BLOCK2 * 2] = 1;
        s.opt_len = s.static_len = 0;
        s.sym_next = s.matches = 0;
      };
      var bi_windup2 = (s) => {
        if (s.bi_valid > 8) {
          put_short2(s, s.bi_buf);
        } else if (s.bi_valid > 0) {
          s.pending_buf[s.pending++] = s.bi_buf;
        }
        s.bi_buf = 0;
        s.bi_valid = 0;
      };
      var smaller2 = (tree, n, m, depth) => {
        const _n2 = n * 2;
        const _m2 = m * 2;
        return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
      };
      var pqdownheap2 = (s, tree, k) => {
        const v = s.heap[k];
        let j = k << 1;
        while (j <= s.heap_len) {
          if (j < s.heap_len && smaller2(tree, s.heap[j + 1], s.heap[j], s.depth)) {
            j++;
          }
          if (smaller2(tree, v, s.heap[j], s.depth)) {
            break;
          }
          s.heap[k] = s.heap[j];
          k = j;
          j <<= 1;
        }
        s.heap[k] = v;
      };
      var compress_block2 = (s, ltree, dtree) => {
        let dist;
        let lc;
        let sx = 0;
        let code;
        let extra;
        if (s.sym_next !== 0) {
          do {
            dist = s.pending_buf[s.sym_buf + sx++] & 255;
            dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
            lc = s.pending_buf[s.sym_buf + sx++];
            if (dist === 0) {
              send_code2(s, lc, ltree);
            } else {
              code = _length_code2[lc];
              send_code2(s, code + LITERALS2 + 1, ltree);
              extra = extra_lbits2[code];
              if (extra !== 0) {
                lc -= base_length2[code];
                send_bits2(s, lc, extra);
              }
              dist--;
              code = d_code2(dist);
              send_code2(s, code, dtree);
              extra = extra_dbits2[code];
              if (extra !== 0) {
                dist -= base_dist2[code];
                send_bits2(s, dist, extra);
              }
            }
          } while (sx < s.sym_next);
        }
        send_code2(s, END_BLOCK2, ltree);
      };
      var build_tree2 = (s, desc) => {
        const tree = desc.dyn_tree;
        const stree = desc.stat_desc.static_tree;
        const has_stree = desc.stat_desc.has_stree;
        const elems = desc.stat_desc.elems;
        let n, m;
        let max_code = -1;
        let node;
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE2;
        for (n = 0; n < elems; n++) {
          if (tree[n * 2] !== 0) {
            s.heap[++s.heap_len] = max_code = n;
            s.depth[n] = 0;
          } else {
            tree[n * 2 + 1] = 0;
          }
        }
        while (s.heap_len < 2) {
          node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
          tree[node * 2] = 1;
          s.depth[node] = 0;
          s.opt_len--;
          if (has_stree) {
            s.static_len -= stree[node * 2 + 1];
          }
        }
        desc.max_code = max_code;
        for (n = s.heap_len >> 1; n >= 1; n--) {
          pqdownheap2(s, tree, n);
        }
        node = elems;
        do {
          n = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[
            1
            /*SMALLEST*/
          ] = s.heap[s.heap_len--];
          pqdownheap2(
            s,
            tree,
            1
            /*SMALLEST*/
          );
          m = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[--s.heap_max] = n;
          s.heap[--s.heap_max] = m;
          tree[node * 2] = tree[n * 2] + tree[m * 2];
          s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
          tree[n * 2 + 1] = tree[m * 2 + 1] = node;
          s.heap[
            1
            /*SMALLEST*/
          ] = node++;
          pqdownheap2(
            s,
            tree,
            1
            /*SMALLEST*/
          );
        } while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[
          1
          /*SMALLEST*/
        ];
        gen_bitlen2(s, desc);
        gen_codes2(tree, max_code, s.bl_count);
      };
      var scan_tree2 = (s, tree, max_code) => {
        let n;
        let prevlen = -1;
        let curlen;
        let nextlen = tree[0 * 2 + 1];
        let count = 0;
        let max_count = 7;
        let min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1] = 65535;
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            s.bl_tree[curlen * 2] += count;
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              s.bl_tree[curlen * 2]++;
            }
            s.bl_tree[REP_3_62 * 2]++;
          } else if (count <= 10) {
            s.bl_tree[REPZ_3_102 * 2]++;
          } else {
            s.bl_tree[REPZ_11_1382 * 2]++;
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      };
      var send_tree2 = (s, tree, max_code) => {
        let n;
        let prevlen = -1;
        let curlen;
        let nextlen = tree[0 * 2 + 1];
        let count = 0;
        let max_count = 7;
        let min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            do {
              send_code2(s, curlen, s.bl_tree);
            } while (--count !== 0);
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              send_code2(s, curlen, s.bl_tree);
              count--;
            }
            send_code2(s, REP_3_62, s.bl_tree);
            send_bits2(s, count - 3, 2);
          } else if (count <= 10) {
            send_code2(s, REPZ_3_102, s.bl_tree);
            send_bits2(s, count - 3, 3);
          } else {
            send_code2(s, REPZ_11_1382, s.bl_tree);
            send_bits2(s, count - 11, 7);
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      };
      var build_bl_tree2 = (s) => {
        let max_blindex;
        scan_tree2(s, s.dyn_ltree, s.l_desc.max_code);
        scan_tree2(s, s.dyn_dtree, s.d_desc.max_code);
        build_tree2(s, s.bl_desc);
        for (max_blindex = BL_CODES2 - 1; max_blindex >= 3; max_blindex--) {
          if (s.bl_tree[bl_order2[max_blindex] * 2 + 1] !== 0) {
            break;
          }
        }
        s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        return max_blindex;
      };
      var send_all_trees2 = (s, lcodes, dcodes, blcodes) => {
        let rank2;
        send_bits2(s, lcodes - 257, 5);
        send_bits2(s, dcodes - 1, 5);
        send_bits2(s, blcodes - 4, 4);
        for (rank2 = 0; rank2 < blcodes; rank2++) {
          send_bits2(s, s.bl_tree[bl_order2[rank2] * 2 + 1], 3);
        }
        send_tree2(s, s.dyn_ltree, lcodes - 1);
        send_tree2(s, s.dyn_dtree, dcodes - 1);
      };
      var detect_data_type2 = (s) => {
        let block_mask = 4093624447;
        let n;
        for (n = 0; n <= 31; n++, block_mask >>>= 1) {
          if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
            return Z_BINARY2;
          }
        }
        if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
          return Z_TEXT2;
        }
        for (n = 32; n < LITERALS2; n++) {
          if (s.dyn_ltree[n * 2] !== 0) {
            return Z_TEXT2;
          }
        }
        return Z_BINARY2;
      };
      var static_init_done2 = false;
      var _tr_init2 = (s) => {
        if (!static_init_done2) {
          tr_static_init2();
          static_init_done2 = true;
        }
        s.l_desc = new TreeDesc2(s.dyn_ltree, static_l_desc2);
        s.d_desc = new TreeDesc2(s.dyn_dtree, static_d_desc2);
        s.bl_desc = new TreeDesc2(s.bl_tree, static_bl_desc2);
        s.bi_buf = 0;
        s.bi_valid = 0;
        init_block2(s);
      };
      var _tr_stored_block2 = (s, buf, stored_len, last) => {
        send_bits2(s, (STORED_BLOCK2 << 1) + (last ? 1 : 0), 3);
        bi_windup2(s);
        put_short2(s, stored_len);
        put_short2(s, ~stored_len);
        if (stored_len) {
          s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
        }
        s.pending += stored_len;
      };
      var _tr_align2 = (s) => {
        send_bits2(s, STATIC_TREES2 << 1, 3);
        send_code2(s, END_BLOCK2, static_ltree2);
        bi_flush2(s);
      };
      var _tr_flush_block2 = (s, buf, stored_len, last) => {
        let opt_lenb, static_lenb;
        let max_blindex = 0;
        if (s.level > 0) {
          if (s.strm.data_type === Z_UNKNOWN2) {
            s.strm.data_type = detect_data_type2(s);
          }
          build_tree2(s, s.l_desc);
          build_tree2(s, s.d_desc);
          max_blindex = build_bl_tree2(s);
          opt_lenb = s.opt_len + 3 + 7 >>> 3;
          static_lenb = s.static_len + 3 + 7 >>> 3;
          if (static_lenb <= opt_lenb) {
            opt_lenb = static_lenb;
          }
        } else {
          opt_lenb = static_lenb = stored_len + 5;
        }
        if (stored_len + 4 <= opt_lenb && buf !== -1) {
          _tr_stored_block2(s, buf, stored_len, last);
        } else if (s.strategy === Z_FIXED2 || static_lenb === opt_lenb) {
          send_bits2(s, (STATIC_TREES2 << 1) + (last ? 1 : 0), 3);
          compress_block2(s, static_ltree2, static_dtree2);
        } else {
          send_bits2(s, (DYN_TREES2 << 1) + (last ? 1 : 0), 3);
          send_all_trees2(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
          compress_block2(s, s.dyn_ltree, s.dyn_dtree);
        }
        init_block2(s);
        if (last) {
          bi_windup2(s);
        }
      };
      var _tr_tally2 = (s, dist, lc) => {
        s.pending_buf[s.sym_buf + s.sym_next++] = dist;
        s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
        s.pending_buf[s.sym_buf + s.sym_next++] = lc;
        if (dist === 0) {
          s.dyn_ltree[lc * 2]++;
        } else {
          s.matches++;
          dist--;
          s.dyn_ltree[(_length_code2[lc] + LITERALS2 + 1) * 2]++;
          s.dyn_dtree[d_code2(dist) * 2]++;
        }
        return s.sym_next === s.sym_end;
      };
      module.exports._tr_init = _tr_init2;
      module.exports._tr_stored_block = _tr_stored_block2;
      module.exports._tr_flush_block = _tr_flush_block2;
      module.exports._tr_tally = _tr_tally2;
      module.exports._tr_align = _tr_align2;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/adler32.js
  var require_adler32 = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/adler32.js"(exports, module) {
      "use strict";
      var adler322 = (adler, buf, len, pos) => {
        let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
        while (len !== 0) {
          n = len > 2e3 ? 2e3 : len;
          len -= n;
          do {
            s1 = s1 + buf[pos++] | 0;
            s2 = s2 + s1 | 0;
          } while (--n);
          s1 %= 65521;
          s2 %= 65521;
        }
        return s1 | s2 << 16 | 0;
      };
      module.exports = adler322;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/crc32.js
  var require_crc32 = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/crc32.js"(exports, module) {
      "use strict";
      var makeTable2 = () => {
        let c, table = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          }
          table[n] = c;
        }
        return table;
      };
      var crcTable2 = new Uint32Array(makeTable2());
      var crc322 = (crc, buf, len, pos) => {
        const t = crcTable2;
        const end = pos + len;
        crc ^= -1;
        for (let i = pos; i < end; i++) {
          crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
        }
        return crc ^ -1;
      };
      module.exports = crc322;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/messages.js
  var require_messages = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/messages.js"(exports, module) {
      "use strict";
      module.exports = {
        2: "need dictionary",
        /* Z_NEED_DICT       2  */
        1: "stream end",
        /* Z_STREAM_END      1  */
        0: "",
        /* Z_OK              0  */
        "-1": "file error",
        /* Z_ERRNO         (-1) */
        "-2": "stream error",
        /* Z_STREAM_ERROR  (-2) */
        "-3": "data error",
        /* Z_DATA_ERROR    (-3) */
        "-4": "insufficient memory",
        /* Z_MEM_ERROR     (-4) */
        "-5": "buffer error",
        /* Z_BUF_ERROR     (-5) */
        "-6": "incompatible version"
        /* Z_VERSION_ERROR (-6) */
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/constants.js
  var require_constants = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/constants.js"(exports, module) {
      "use strict";
      module.exports = {
        /* Allowed flush values; see deflate() and inflate() below for details */
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        /* Return codes for the compression/decompression functions. Negative values
        * are errors, positive values are used for special but normal events.
        */
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        //Z_VERSION_ERROR: -6,
        /* compression levels */
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        /* Possible values of the data_type field (though see inflate()) */
        Z_BINARY: 0,
        Z_TEXT: 1,
        //Z_ASCII:                1, // = Z_TEXT (deprecated)
        Z_UNKNOWN: 2,
        /* The deflate compression method */
        Z_DEFLATED: 8
        //Z_NULL:                 null // Use -1 or null inline, depending on var type
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/deflate.js
  var require_deflate = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/deflate.js"(exports, module) {
      "use strict";
      var { _tr_init: _tr_init2, _tr_stored_block: _tr_stored_block2, _tr_flush_block: _tr_flush_block2, _tr_tally: _tr_tally2, _tr_align: _tr_align2 } = require_trees();
      var adler322 = require_adler32();
      var crc322 = require_crc32();
      var msg = require_messages();
      var {
        Z_NO_FLUSH: Z_NO_FLUSH2,
        Z_PARTIAL_FLUSH: Z_PARTIAL_FLUSH2,
        Z_FULL_FLUSH: Z_FULL_FLUSH2,
        Z_FINISH: Z_FINISH2,
        Z_BLOCK: Z_BLOCK2,
        Z_OK: Z_OK2,
        Z_STREAM_END: Z_STREAM_END2,
        Z_STREAM_ERROR: Z_STREAM_ERROR2,
        Z_DATA_ERROR: Z_DATA_ERROR2,
        Z_BUF_ERROR: Z_BUF_ERROR2,
        Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION2,
        Z_FILTERED: Z_FILTERED2,
        Z_HUFFMAN_ONLY: Z_HUFFMAN_ONLY2,
        Z_RLE: Z_RLE2,
        Z_FIXED: Z_FIXED2,
        Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY2,
        Z_UNKNOWN: Z_UNKNOWN2,
        Z_DEFLATED: Z_DEFLATED2
      } = require_constants();
      var MAX_MEM_LEVEL2 = 9;
      var MAX_WBITS2 = 15;
      var DEF_MEM_LEVEL2 = 8;
      var LENGTH_CODES2 = 29;
      var LITERALS2 = 256;
      var L_CODES2 = LITERALS2 + 1 + LENGTH_CODES2;
      var D_CODES2 = 30;
      var BL_CODES2 = 19;
      var HEAP_SIZE2 = 2 * L_CODES2 + 1;
      var MAX_BITS2 = 15;
      var MIN_MATCH2 = 3;
      var MAX_MATCH2 = 258;
      var MIN_LOOKAHEAD2 = MAX_MATCH2 + MIN_MATCH2 + 1;
      var PRESET_DICT2 = 32;
      var INIT_STATE2 = 42;
      var GZIP_STATE2 = 57;
      var EXTRA_STATE2 = 69;
      var NAME_STATE2 = 73;
      var COMMENT_STATE2 = 91;
      var HCRC_STATE2 = 103;
      var BUSY_STATE2 = 113;
      var FINISH_STATE2 = 666;
      var BS_NEED_MORE2 = 1;
      var BS_BLOCK_DONE2 = 2;
      var BS_FINISH_STARTED2 = 3;
      var BS_FINISH_DONE2 = 4;
      var OS_CODE2 = 3;
      var err2 = (strm, errorCode) => {
        strm.msg = msg[errorCode];
        return errorCode;
      };
      var rank2 = (f) => {
        return f * 2 - (f > 4 ? 9 : 0);
      };
      var zero2 = (buf) => {
        let len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      };
      var slide_hash2 = (s) => {
        let n, m;
        let p;
        let wsize = s.w_size;
        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= wsize ? m - wsize : 0;
        } while (--n);
        n = wsize;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= wsize ? m - wsize : 0;
        } while (--n);
      };
      var HASH_ZLIB2 = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
      var HASH2 = HASH_ZLIB2;
      var flush_pending2 = (strm) => {
        const s = strm.state;
        let len = s.pending;
        if (len > strm.avail_out) {
          len = strm.avail_out;
        }
        if (len === 0) {
          return;
        }
        strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
        strm.next_out += len;
        s.pending_out += len;
        strm.total_out += len;
        strm.avail_out -= len;
        s.pending -= len;
        if (s.pending === 0) {
          s.pending_out = 0;
        }
      };
      var flush_block_only2 = (s, last) => {
        _tr_flush_block2(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
        s.block_start = s.strstart;
        flush_pending2(s.strm);
      };
      var put_byte2 = (s, b) => {
        s.pending_buf[s.pending++] = b;
      };
      var putShortMSB2 = (s, b) => {
        s.pending_buf[s.pending++] = b >>> 8 & 255;
        s.pending_buf[s.pending++] = b & 255;
      };
      var read_buf2 = (strm, buf, start, size) => {
        let len = strm.avail_in;
        if (len > size) {
          len = size;
        }
        if (len === 0) {
          return 0;
        }
        strm.avail_in -= len;
        buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
        if (strm.state.wrap === 1) {
          strm.adler = adler322(strm.adler, buf, len, start);
        } else if (strm.state.wrap === 2) {
          strm.adler = crc322(strm.adler, buf, len, start);
        }
        strm.next_in += len;
        strm.total_in += len;
        return len;
      };
      var longest_match2 = (s, cur_match) => {
        let chain_length = s.max_chain_length;
        let scan = s.strstart;
        let match;
        let len;
        let best_len = s.prev_length;
        let nice_match = s.nice_match;
        const limit = s.strstart > s.w_size - MIN_LOOKAHEAD2 ? s.strstart - (s.w_size - MIN_LOOKAHEAD2) : 0;
        const _win = s.window;
        const wmask = s.w_mask;
        const prev = s.prev;
        const strend = s.strstart + MAX_MATCH2;
        let scan_end1 = _win[scan + best_len - 1];
        let scan_end = _win[scan + best_len];
        if (s.prev_length >= s.good_match) {
          chain_length >>= 2;
        }
        if (nice_match > s.lookahead) {
          nice_match = s.lookahead;
        }
        do {
          match = cur_match;
          if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
            continue;
          }
          scan += 2;
          match++;
          do {
          } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
          len = MAX_MATCH2 - (strend - scan);
          scan = strend - MAX_MATCH2;
          if (len > best_len) {
            s.match_start = cur_match;
            best_len = len;
            if (len >= nice_match) {
              break;
            }
            scan_end1 = _win[scan + best_len - 1];
            scan_end = _win[scan + best_len];
          }
        } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
        if (best_len <= s.lookahead) {
          return best_len;
        }
        return s.lookahead;
      };
      var fill_window2 = (s) => {
        const _w_size = s.w_size;
        let n, more, str;
        do {
          more = s.window_size - s.lookahead - s.strstart;
          if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD2)) {
            s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
            s.match_start -= _w_size;
            s.strstart -= _w_size;
            s.block_start -= _w_size;
            if (s.insert > s.strstart) {
              s.insert = s.strstart;
            }
            slide_hash2(s);
            more += _w_size;
          }
          if (s.strm.avail_in === 0) {
            break;
          }
          n = read_buf2(s.strm, s.window, s.strstart + s.lookahead, more);
          s.lookahead += n;
          if (s.lookahead + s.insert >= MIN_MATCH2) {
            str = s.strstart - s.insert;
            s.ins_h = s.window[str];
            s.ins_h = HASH2(s, s.ins_h, s.window[str + 1]);
            while (s.insert) {
              s.ins_h = HASH2(s, s.ins_h, s.window[str + MIN_MATCH2 - 1]);
              s.prev[str & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = str;
              str++;
              s.insert--;
              if (s.lookahead + s.insert < MIN_MATCH2) {
                break;
              }
            }
          }
        } while (s.lookahead < MIN_LOOKAHEAD2 && s.strm.avail_in !== 0);
      };
      var deflate_stored2 = (s, flush) => {
        let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
        let len, left, have, last = 0;
        let used = s.strm.avail_in;
        do {
          len = 65535;
          have = s.bi_valid + 42 >> 3;
          if (s.strm.avail_out < have) {
            break;
          }
          have = s.strm.avail_out - have;
          left = s.strstart - s.block_start;
          if (len > left + s.strm.avail_in) {
            len = left + s.strm.avail_in;
          }
          if (len > have) {
            len = have;
          }
          if (len < min_block && (len === 0 && flush !== Z_FINISH2 || flush === Z_NO_FLUSH2 || len !== left + s.strm.avail_in)) {
            break;
          }
          last = flush === Z_FINISH2 && len === left + s.strm.avail_in ? 1 : 0;
          _tr_stored_block2(s, 0, 0, last);
          s.pending_buf[s.pending - 4] = len;
          s.pending_buf[s.pending - 3] = len >> 8;
          s.pending_buf[s.pending - 2] = ~len;
          s.pending_buf[s.pending - 1] = ~len >> 8;
          flush_pending2(s.strm);
          if (left) {
            if (left > len) {
              left = len;
            }
            s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
            s.strm.next_out += left;
            s.strm.avail_out -= left;
            s.strm.total_out += left;
            s.block_start += left;
            len -= left;
          }
          if (len) {
            read_buf2(s.strm, s.strm.output, s.strm.next_out, len);
            s.strm.next_out += len;
            s.strm.avail_out -= len;
            s.strm.total_out += len;
          }
        } while (last === 0);
        used -= s.strm.avail_in;
        if (used) {
          if (used >= s.w_size) {
            s.matches = 2;
            s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
            s.strstart = s.w_size;
            s.insert = s.strstart;
          } else {
            if (s.window_size - s.strstart <= used) {
              s.strstart -= s.w_size;
              s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
              if (s.matches < 2) {
                s.matches++;
              }
              if (s.insert > s.strstart) {
                s.insert = s.strstart;
              }
            }
            s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
            s.strstart += used;
            s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
          }
          s.block_start = s.strstart;
        }
        if (s.high_water < s.strstart) {
          s.high_water = s.strstart;
        }
        if (last) {
          return BS_FINISH_DONE2;
        }
        if (flush !== Z_NO_FLUSH2 && flush !== Z_FINISH2 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
          return BS_BLOCK_DONE2;
        }
        have = s.window_size - s.strstart;
        if (s.strm.avail_in > have && s.block_start >= s.w_size) {
          s.block_start -= s.w_size;
          s.strstart -= s.w_size;
          s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
          if (s.matches < 2) {
            s.matches++;
          }
          have += s.w_size;
          if (s.insert > s.strstart) {
            s.insert = s.strstart;
          }
        }
        if (have > s.strm.avail_in) {
          have = s.strm.avail_in;
        }
        if (have) {
          read_buf2(s.strm, s.window, s.strstart, have);
          s.strstart += have;
          s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
        }
        if (s.high_water < s.strstart) {
          s.high_water = s.strstart;
        }
        have = s.bi_valid + 42 >> 3;
        have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
        min_block = have > s.w_size ? s.w_size : have;
        left = s.strstart - s.block_start;
        if (left >= min_block || (left || flush === Z_FINISH2) && flush !== Z_NO_FLUSH2 && s.strm.avail_in === 0 && left <= have) {
          len = left > have ? have : left;
          last = flush === Z_FINISH2 && s.strm.avail_in === 0 && len === left ? 1 : 0;
          _tr_stored_block2(s, s.block_start, len, last);
          s.block_start += len;
          flush_pending2(s.strm);
        }
        return last ? BS_FINISH_STARTED2 : BS_NEED_MORE2;
      };
      var deflate_fast2 = (s, flush) => {
        let hash_head;
        let bflush;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD2) {
            fill_window2(s);
            if (s.lookahead < MIN_LOOKAHEAD2 && flush === Z_NO_FLUSH2) {
              return BS_NEED_MORE2;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH2) {
            s.ins_h = HASH2(s, s.ins_h, s.window[s.strstart + MIN_MATCH2 - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD2) {
            s.match_length = longest_match2(s, hash_head);
          }
          if (s.match_length >= MIN_MATCH2) {
            bflush = _tr_tally2(s, s.strstart - s.match_start, s.match_length - MIN_MATCH2);
            s.lookahead -= s.match_length;
            if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH2) {
              s.match_length--;
              do {
                s.strstart++;
                s.ins_h = HASH2(s, s.ins_h, s.window[s.strstart + MIN_MATCH2 - 1]);
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              } while (--s.match_length !== 0);
              s.strstart++;
            } else {
              s.strstart += s.match_length;
              s.match_length = 0;
              s.ins_h = s.window[s.strstart];
              s.ins_h = HASH2(s, s.ins_h, s.window[s.strstart + 1]);
            }
          } else {
            bflush = _tr_tally2(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only2(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE2;
            }
          }
        }
        s.insert = s.strstart < MIN_MATCH2 - 1 ? s.strstart : MIN_MATCH2 - 1;
        if (flush === Z_FINISH2) {
          flush_block_only2(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED2;
          }
          return BS_FINISH_DONE2;
        }
        if (s.sym_next) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
        return BS_BLOCK_DONE2;
      };
      var deflate_slow2 = (s, flush) => {
        let hash_head;
        let bflush;
        let max_insert;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD2) {
            fill_window2(s);
            if (s.lookahead < MIN_LOOKAHEAD2 && flush === Z_NO_FLUSH2) {
              return BS_NEED_MORE2;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH2) {
            s.ins_h = HASH2(s, s.ins_h, s.window[s.strstart + MIN_MATCH2 - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          s.prev_length = s.match_length;
          s.prev_match = s.match_start;
          s.match_length = MIN_MATCH2 - 1;
          if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD2) {
            s.match_length = longest_match2(s, hash_head);
            if (s.match_length <= 5 && (s.strategy === Z_FILTERED2 || s.match_length === MIN_MATCH2 && s.strstart - s.match_start > 4096)) {
              s.match_length = MIN_MATCH2 - 1;
            }
          }
          if (s.prev_length >= MIN_MATCH2 && s.match_length <= s.prev_length) {
            max_insert = s.strstart + s.lookahead - MIN_MATCH2;
            bflush = _tr_tally2(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH2);
            s.lookahead -= s.prev_length - 1;
            s.prev_length -= 2;
            do {
              if (++s.strstart <= max_insert) {
                s.ins_h = HASH2(s, s.ins_h, s.window[s.strstart + MIN_MATCH2 - 1]);
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              }
            } while (--s.prev_length !== 0);
            s.match_available = 0;
            s.match_length = MIN_MATCH2 - 1;
            s.strstart++;
            if (bflush) {
              flush_block_only2(s, false);
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE2;
              }
            }
          } else if (s.match_available) {
            bflush = _tr_tally2(s, 0, s.window[s.strstart - 1]);
            if (bflush) {
              flush_block_only2(s, false);
            }
            s.strstart++;
            s.lookahead--;
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE2;
            }
          } else {
            s.match_available = 1;
            s.strstart++;
            s.lookahead--;
          }
        }
        if (s.match_available) {
          bflush = _tr_tally2(s, 0, s.window[s.strstart - 1]);
          s.match_available = 0;
        }
        s.insert = s.strstart < MIN_MATCH2 - 1 ? s.strstart : MIN_MATCH2 - 1;
        if (flush === Z_FINISH2) {
          flush_block_only2(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED2;
          }
          return BS_FINISH_DONE2;
        }
        if (s.sym_next) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
        return BS_BLOCK_DONE2;
      };
      var deflate_rle2 = (s, flush) => {
        let bflush;
        let prev;
        let scan, strend;
        const _win = s.window;
        for (; ; ) {
          if (s.lookahead <= MAX_MATCH2) {
            fill_window2(s);
            if (s.lookahead <= MAX_MATCH2 && flush === Z_NO_FLUSH2) {
              return BS_NEED_MORE2;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          s.match_length = 0;
          if (s.lookahead >= MIN_MATCH2 && s.strstart > 0) {
            scan = s.strstart - 1;
            prev = _win[scan];
            if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
              strend = s.strstart + MAX_MATCH2;
              do {
              } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
              s.match_length = MAX_MATCH2 - (strend - scan);
              if (s.match_length > s.lookahead) {
                s.match_length = s.lookahead;
              }
            }
          }
          if (s.match_length >= MIN_MATCH2) {
            bflush = _tr_tally2(s, 1, s.match_length - MIN_MATCH2);
            s.lookahead -= s.match_length;
            s.strstart += s.match_length;
            s.match_length = 0;
          } else {
            bflush = _tr_tally2(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only2(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE2;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH2) {
          flush_block_only2(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED2;
          }
          return BS_FINISH_DONE2;
        }
        if (s.sym_next) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
        return BS_BLOCK_DONE2;
      };
      var deflate_huff2 = (s, flush) => {
        let bflush;
        for (; ; ) {
          if (s.lookahead === 0) {
            fill_window2(s);
            if (s.lookahead === 0) {
              if (flush === Z_NO_FLUSH2) {
                return BS_NEED_MORE2;
              }
              break;
            }
          }
          s.match_length = 0;
          bflush = _tr_tally2(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
          if (bflush) {
            flush_block_only2(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE2;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH2) {
          flush_block_only2(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED2;
          }
          return BS_FINISH_DONE2;
        }
        if (s.sym_next) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
        return BS_BLOCK_DONE2;
      };
      function Config2(good_length, max_lazy, nice_length, max_chain, func) {
        this.good_length = good_length;
        this.max_lazy = max_lazy;
        this.nice_length = nice_length;
        this.max_chain = max_chain;
        this.func = func;
      }
      var configuration_table2 = [
        /*      good lazy nice chain */
        new Config2(0, 0, 0, 0, deflate_stored2),
        /* 0 store only */
        new Config2(4, 4, 8, 4, deflate_fast2),
        /* 1 max speed, no lazy matches */
        new Config2(4, 5, 16, 8, deflate_fast2),
        /* 2 */
        new Config2(4, 6, 32, 32, deflate_fast2),
        /* 3 */
        new Config2(4, 4, 16, 16, deflate_slow2),
        /* 4 lazy matches */
        new Config2(8, 16, 32, 32, deflate_slow2),
        /* 5 */
        new Config2(8, 16, 128, 128, deflate_slow2),
        /* 6 */
        new Config2(8, 32, 128, 256, deflate_slow2),
        /* 7 */
        new Config2(32, 128, 258, 1024, deflate_slow2),
        /* 8 */
        new Config2(32, 258, 258, 4096, deflate_slow2)
        /* 9 max compression */
      ];
      var lm_init2 = (s) => {
        s.window_size = 2 * s.w_size;
        zero2(s.head);
        s.max_lazy_match = configuration_table2[s.level].max_lazy;
        s.good_match = configuration_table2[s.level].good_length;
        s.nice_match = configuration_table2[s.level].nice_length;
        s.max_chain_length = configuration_table2[s.level].max_chain;
        s.strstart = 0;
        s.block_start = 0;
        s.lookahead = 0;
        s.insert = 0;
        s.match_length = s.prev_length = MIN_MATCH2 - 1;
        s.match_available = 0;
        s.ins_h = 0;
      };
      function DeflateState2() {
        this.strm = null;
        this.status = 0;
        this.pending_buf = null;
        this.pending_buf_size = 0;
        this.pending_out = 0;
        this.pending = 0;
        this.wrap = 0;
        this.gzhead = null;
        this.gzindex = 0;
        this.method = Z_DEFLATED2;
        this.last_flush = -1;
        this.w_size = 0;
        this.w_bits = 0;
        this.w_mask = 0;
        this.window = null;
        this.window_size = 0;
        this.prev = null;
        this.head = null;
        this.ins_h = 0;
        this.hash_size = 0;
        this.hash_bits = 0;
        this.hash_mask = 0;
        this.hash_shift = 0;
        this.block_start = 0;
        this.match_length = 0;
        this.prev_match = 0;
        this.match_available = 0;
        this.strstart = 0;
        this.match_start = 0;
        this.lookahead = 0;
        this.prev_length = 0;
        this.max_chain_length = 0;
        this.max_lazy_match = 0;
        this.level = 0;
        this.strategy = 0;
        this.good_match = 0;
        this.nice_match = 0;
        this.dyn_ltree = new Uint16Array(HEAP_SIZE2 * 2);
        this.dyn_dtree = new Uint16Array((2 * D_CODES2 + 1) * 2);
        this.bl_tree = new Uint16Array((2 * BL_CODES2 + 1) * 2);
        zero2(this.dyn_ltree);
        zero2(this.dyn_dtree);
        zero2(this.bl_tree);
        this.l_desc = null;
        this.d_desc = null;
        this.bl_desc = null;
        this.bl_count = new Uint16Array(MAX_BITS2 + 1);
        this.heap = new Uint16Array(2 * L_CODES2 + 1);
        zero2(this.heap);
        this.heap_len = 0;
        this.heap_max = 0;
        this.depth = new Uint16Array(2 * L_CODES2 + 1);
        zero2(this.depth);
        this.sym_buf = 0;
        this.lit_bufsize = 0;
        this.sym_next = 0;
        this.sym_end = 0;
        this.opt_len = 0;
        this.static_len = 0;
        this.matches = 0;
        this.insert = 0;
        this.bi_buf = 0;
        this.bi_valid = 0;
      }
      var deflateStateCheck2 = (strm) => {
        if (!strm) {
          return 1;
        }
        const s = strm.state;
        if (!s || s.strm !== strm || s.status !== INIT_STATE2 && //#ifdef GZIP
        s.status !== GZIP_STATE2 && //#endif
        s.status !== EXTRA_STATE2 && s.status !== NAME_STATE2 && s.status !== COMMENT_STATE2 && s.status !== HCRC_STATE2 && s.status !== BUSY_STATE2 && s.status !== FINISH_STATE2) {
          return 1;
        }
        return 0;
      };
      var deflateResetKeep2 = (strm) => {
        if (deflateStateCheck2(strm)) {
          return err2(strm, Z_STREAM_ERROR2);
        }
        strm.total_in = strm.total_out = 0;
        strm.data_type = Z_UNKNOWN2;
        const s = strm.state;
        s.pending = 0;
        s.pending_out = 0;
        if (s.wrap < 0) {
          s.wrap = -s.wrap;
        }
        s.status = //#ifdef GZIP
        s.wrap === 2 ? GZIP_STATE2 : (
          //#endif
          s.wrap ? INIT_STATE2 : BUSY_STATE2
        );
        strm.adler = s.wrap === 2 ? 0 : 1;
        s.last_flush = -2;
        _tr_init2(s);
        return Z_OK2;
      };
      var deflateReset2 = (strm) => {
        const ret = deflateResetKeep2(strm);
        if (ret === Z_OK2) {
          lm_init2(strm.state);
        }
        return ret;
      };
      var deflateSetHeader2 = (strm, head) => {
        if (deflateStateCheck2(strm) || strm.state.wrap !== 2) {
          return Z_STREAM_ERROR2;
        }
        strm.state.gzhead = head;
        return Z_OK2;
      };
      var deflateInit22 = (strm, level, method, windowBits, memLevel, strategy) => {
        if (!strm) {
          return Z_STREAM_ERROR2;
        }
        let wrap = 1;
        if (level === Z_DEFAULT_COMPRESSION2) {
          level = 6;
        }
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else if (windowBits > 15) {
          wrap = 2;
          windowBits -= 16;
        }
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL2 || method !== Z_DEFLATED2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED2 || windowBits === 8 && wrap !== 1) {
          return err2(strm, Z_STREAM_ERROR2);
        }
        if (windowBits === 8) {
          windowBits = 9;
        }
        const s = new DeflateState2();
        strm.state = s;
        s.strm = strm;
        s.status = INIT_STATE2;
        s.wrap = wrap;
        s.gzhead = null;
        s.w_bits = windowBits;
        s.w_size = 1 << s.w_bits;
        s.w_mask = s.w_size - 1;
        s.hash_bits = memLevel + 7;
        s.hash_size = 1 << s.hash_bits;
        s.hash_mask = s.hash_size - 1;
        s.hash_shift = ~~((s.hash_bits + MIN_MATCH2 - 1) / MIN_MATCH2);
        s.window = new Uint8Array(s.w_size * 2);
        s.head = new Uint16Array(s.hash_size);
        s.prev = new Uint16Array(s.w_size);
        s.lit_bufsize = 1 << memLevel + 6;
        s.pending_buf_size = s.lit_bufsize * 4;
        s.pending_buf = new Uint8Array(s.pending_buf_size);
        s.sym_buf = s.lit_bufsize;
        s.sym_end = (s.lit_bufsize - 1) * 3;
        s.level = level;
        s.strategy = strategy;
        s.method = method;
        return deflateReset2(strm);
      };
      var deflateInit3 = (strm, level) => {
        return deflateInit22(strm, level, Z_DEFLATED2, MAX_WBITS2, DEF_MEM_LEVEL2, Z_DEFAULT_STRATEGY2);
      };
      var deflate2 = (strm, flush) => {
        if (deflateStateCheck2(strm) || flush > Z_BLOCK2 || flush < 0) {
          return strm ? err2(strm, Z_STREAM_ERROR2) : Z_STREAM_ERROR2;
        }
        const s = strm.state;
        if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE2 && flush !== Z_FINISH2) {
          return err2(strm, strm.avail_out === 0 ? Z_BUF_ERROR2 : Z_STREAM_ERROR2);
        }
        const old_flush = s.last_flush;
        s.last_flush = flush;
        if (s.pending !== 0) {
          flush_pending2(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK2;
          }
        } else if (strm.avail_in === 0 && rank2(flush) <= rank2(old_flush) && flush !== Z_FINISH2) {
          return err2(strm, Z_BUF_ERROR2);
        }
        if (s.status === FINISH_STATE2 && strm.avail_in !== 0) {
          return err2(strm, Z_BUF_ERROR2);
        }
        if (s.status === INIT_STATE2 && s.wrap === 0) {
          s.status = BUSY_STATE2;
        }
        if (s.status === INIT_STATE2) {
          let header = Z_DEFLATED2 + (s.w_bits - 8 << 4) << 8;
          let level_flags = -1;
          if (s.strategy >= Z_HUFFMAN_ONLY2 || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }
          header |= level_flags << 6;
          if (s.strstart !== 0) {
            header |= PRESET_DICT2;
          }
          header += 31 - header % 31;
          putShortMSB2(s, header);
          if (s.strstart !== 0) {
            putShortMSB2(s, strm.adler >>> 16);
            putShortMSB2(s, strm.adler & 65535);
          }
          strm.adler = 1;
          s.status = BUSY_STATE2;
          flush_pending2(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK2;
          }
        }
        if (s.status === GZIP_STATE2) {
          strm.adler = 0;
          put_byte2(s, 31);
          put_byte2(s, 139);
          put_byte2(s, 8);
          if (!s.gzhead) {
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY2 || s.level < 2 ? 4 : 0);
            put_byte2(s, OS_CODE2);
            s.status = BUSY_STATE2;
            flush_pending2(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK2;
            }
          } else {
            put_byte2(
              s,
              (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
            );
            put_byte2(s, s.gzhead.time & 255);
            put_byte2(s, s.gzhead.time >> 8 & 255);
            put_byte2(s, s.gzhead.time >> 16 & 255);
            put_byte2(s, s.gzhead.time >> 24 & 255);
            put_byte2(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY2 || s.level < 2 ? 4 : 0);
            put_byte2(s, s.gzhead.os & 255);
            if (s.gzhead.extra && s.gzhead.extra.length) {
              put_byte2(s, s.gzhead.extra.length & 255);
              put_byte2(s, s.gzhead.extra.length >> 8 & 255);
            }
            if (s.gzhead.hcrc) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending, 0);
            }
            s.gzindex = 0;
            s.status = EXTRA_STATE2;
          }
        }
        if (s.status === EXTRA_STATE2) {
          if (s.gzhead.extra) {
            let beg = s.pending;
            let left = (s.gzhead.extra.length & 65535) - s.gzindex;
            while (s.pending + left > s.pending_buf_size) {
              let copy = s.pending_buf_size - s.pending;
              s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
              s.pending = s.pending_buf_size;
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              s.gzindex += copy;
              flush_pending2(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK2;
              }
              beg = 0;
              left -= copy;
            }
            let gzhead_extra = new Uint8Array(s.gzhead.extra);
            s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
            s.pending += left;
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            s.gzindex = 0;
          }
          s.status = NAME_STATE2;
        }
        if (s.status === NAME_STATE2) {
          if (s.gzhead.name) {
            let beg = s.pending;
            let val;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending2(strm);
                if (s.pending !== 0) {
                  s.last_flush = -1;
                  return Z_OK2;
                }
                beg = 0;
              }
              if (s.gzindex < s.gzhead.name.length) {
                val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte2(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            s.gzindex = 0;
          }
          s.status = COMMENT_STATE2;
        }
        if (s.status === COMMENT_STATE2) {
          if (s.gzhead.comment) {
            let beg = s.pending;
            let val;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending2(strm);
                if (s.pending !== 0) {
                  s.last_flush = -1;
                  return Z_OK2;
                }
                beg = 0;
              }
              if (s.gzindex < s.gzhead.comment.length) {
                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte2(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
          }
          s.status = HCRC_STATE2;
        }
        if (s.status === HCRC_STATE2) {
          if (s.gzhead.hcrc) {
            if (s.pending + 2 > s.pending_buf_size) {
              flush_pending2(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK2;
              }
            }
            put_byte2(s, strm.adler & 255);
            put_byte2(s, strm.adler >> 8 & 255);
            strm.adler = 0;
          }
          s.status = BUSY_STATE2;
          flush_pending2(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK2;
          }
        }
        if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH2 && s.status !== FINISH_STATE2) {
          let bstate = s.level === 0 ? deflate_stored2(s, flush) : s.strategy === Z_HUFFMAN_ONLY2 ? deflate_huff2(s, flush) : s.strategy === Z_RLE2 ? deflate_rle2(s, flush) : configuration_table2[s.level].func(s, flush);
          if (bstate === BS_FINISH_STARTED2 || bstate === BS_FINISH_DONE2) {
            s.status = FINISH_STATE2;
          }
          if (bstate === BS_NEED_MORE2 || bstate === BS_FINISH_STARTED2) {
            if (strm.avail_out === 0) {
              s.last_flush = -1;
            }
            return Z_OK2;
          }
          if (bstate === BS_BLOCK_DONE2) {
            if (flush === Z_PARTIAL_FLUSH2) {
              _tr_align2(s);
            } else if (flush !== Z_BLOCK2) {
              _tr_stored_block2(s, 0, 0, false);
              if (flush === Z_FULL_FLUSH2) {
                zero2(s.head);
                if (s.lookahead === 0) {
                  s.strstart = 0;
                  s.block_start = 0;
                  s.insert = 0;
                }
              }
            }
            flush_pending2(strm);
            if (strm.avail_out === 0) {
              s.last_flush = -1;
              return Z_OK2;
            }
          }
        }
        if (flush !== Z_FINISH2) {
          return Z_OK2;
        }
        if (s.wrap <= 0) {
          return Z_STREAM_END2;
        }
        if (s.wrap === 2) {
          put_byte2(s, strm.adler & 255);
          put_byte2(s, strm.adler >> 8 & 255);
          put_byte2(s, strm.adler >> 16 & 255);
          put_byte2(s, strm.adler >> 24 & 255);
          put_byte2(s, strm.total_in & 255);
          put_byte2(s, strm.total_in >> 8 & 255);
          put_byte2(s, strm.total_in >> 16 & 255);
          put_byte2(s, strm.total_in >> 24 & 255);
        } else {
          putShortMSB2(s, strm.adler >>> 16);
          putShortMSB2(s, strm.adler & 65535);
        }
        flush_pending2(strm);
        if (s.wrap > 0) {
          s.wrap = -s.wrap;
        }
        return s.pending !== 0 ? Z_OK2 : Z_STREAM_END2;
      };
      var deflateEnd2 = (strm) => {
        if (deflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        const status = strm.state.status;
        strm.state = null;
        return status === BUSY_STATE2 ? err2(strm, Z_DATA_ERROR2) : Z_OK2;
      };
      var deflateSetDictionary2 = (strm, dictionary) => {
        let dictLength = dictionary.length;
        if (deflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        const s = strm.state;
        const wrap = s.wrap;
        if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE2 || s.lookahead) {
          return Z_STREAM_ERROR2;
        }
        if (wrap === 1) {
          strm.adler = adler322(strm.adler, dictionary, dictLength, 0);
        }
        s.wrap = 0;
        if (dictLength >= s.w_size) {
          if (wrap === 0) {
            zero2(s.head);
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
          let tmpDict = new Uint8Array(s.w_size);
          tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
          dictionary = tmpDict;
          dictLength = s.w_size;
        }
        const avail = strm.avail_in;
        const next = strm.next_in;
        const input = strm.input;
        strm.avail_in = dictLength;
        strm.next_in = 0;
        strm.input = dictionary;
        fill_window2(s);
        while (s.lookahead >= MIN_MATCH2) {
          let str = s.strstart;
          let n = s.lookahead - (MIN_MATCH2 - 1);
          do {
            s.ins_h = HASH2(s, s.ins_h, s.window[str + MIN_MATCH2 - 1]);
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
          } while (--n);
          s.strstart = str;
          s.lookahead = MIN_MATCH2 - 1;
          fill_window2(s);
        }
        s.strstart += s.lookahead;
        s.block_start = s.strstart;
        s.insert = s.lookahead;
        s.lookahead = 0;
        s.match_length = s.prev_length = MIN_MATCH2 - 1;
        s.match_available = 0;
        strm.next_in = next;
        strm.input = input;
        strm.avail_in = avail;
        s.wrap = wrap;
        return Z_OK2;
      };
      module.exports.deflateInit = deflateInit3;
      module.exports.deflateInit2 = deflateInit22;
      module.exports.deflateReset = deflateReset2;
      module.exports.deflateResetKeep = deflateResetKeep2;
      module.exports.deflateSetHeader = deflateSetHeader2;
      module.exports.deflate = deflate2;
      module.exports.deflateEnd = deflateEnd2;
      module.exports.deflateSetDictionary = deflateSetDictionary2;
      module.exports.deflateInfo = "pako deflate (from Nodeca project)";
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/utils/common.js
  var require_common = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/utils/common.js"(exports, module) {
      "use strict";
      var _has2 = (obj, key) => {
        return Object.prototype.hasOwnProperty.call(obj, key);
      };
      module.exports.assign = function(obj) {
        const sources2 = Array.prototype.slice.call(arguments, 1);
        while (sources2.length) {
          const source = sources2.shift();
          if (!source) {
            continue;
          }
          if (typeof source !== "object") {
            throw new TypeError(source + "must be non-object");
          }
          for (const p in source) {
            if (_has2(source, p)) {
              obj[p] = source[p];
            }
          }
        }
        return obj;
      };
      module.exports.flattenChunks = (chunks) => {
        let len = 0;
        for (let i = 0, l = chunks.length; i < l; i++) {
          len += chunks[i].length;
        }
        const result = new Uint8Array(len);
        for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
          let chunk = chunks[i];
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return result;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/utils/strings.js
  var require_strings = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/utils/strings.js"(exports, module) {
      "use strict";
      var STR_APPLY_UIA_OK2 = true;
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (__) {
        STR_APPLY_UIA_OK2 = false;
      }
      var _utf8len2 = new Uint8Array(256);
      for (let q = 0; q < 256; q++) {
        _utf8len2[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
      }
      _utf8len2[254] = _utf8len2[254] = 1;
      module.exports.string2buf = (str) => {
        if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
          return new TextEncoder().encode(str);
        }
        let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        }
        buf = new Uint8Array(buf_len);
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          if (c < 128) {
            buf[i++] = c;
          } else if (c < 2048) {
            buf[i++] = 192 | c >>> 6;
            buf[i++] = 128 | c & 63;
          } else if (c < 65536) {
            buf[i++] = 224 | c >>> 12;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          } else {
            buf[i++] = 240 | c >>> 18;
            buf[i++] = 128 | c >>> 12 & 63;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          }
        }
        return buf;
      };
      var buf2binstring2 = (buf, len) => {
        if (len < 65534) {
          if (buf.subarray && STR_APPLY_UIA_OK2) {
            return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
          }
        }
        let result = "";
        for (let i = 0; i < len; i++) {
          result += String.fromCharCode(buf[i]);
        }
        return result;
      };
      module.exports.buf2string = (buf, max) => {
        const len = max || buf.length;
        if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
          return new TextDecoder().decode(buf.subarray(0, max));
        }
        let i, out;
        const utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
          let c = buf[i++];
          if (c < 128) {
            utf16buf[out++] = c;
            continue;
          }
          let c_len = _utf8len2[c];
          if (c_len > 4) {
            utf16buf[out++] = 65533;
            i += c_len - 1;
            continue;
          }
          c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
          while (c_len > 1 && i < len) {
            c = c << 6 | buf[i++] & 63;
            c_len--;
          }
          if (c_len > 1) {
            utf16buf[out++] = 65533;
            continue;
          }
          if (c < 65536) {
            utf16buf[out++] = c;
          } else {
            c -= 65536;
            utf16buf[out++] = 55296 | c >> 10 & 1023;
            utf16buf[out++] = 56320 | c & 1023;
          }
        }
        return buf2binstring2(utf16buf, out);
      };
      module.exports.utf8border = (buf, max) => {
        max = max || buf.length;
        if (max > buf.length) {
          max = buf.length;
        }
        let pos = max - 1;
        while (pos >= 0 && (buf[pos] & 192) === 128) {
          pos--;
        }
        if (pos < 0) {
          return max;
        }
        if (pos === 0) {
          return max;
        }
        return pos + _utf8len2[buf[pos]] > max ? pos : max;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/zstream.js
  var require_zstream = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/zstream.js"(exports, module) {
      "use strict";
      function ZStream2() {
        this.input = null;
        this.next_in = 0;
        this.avail_in = 0;
        this.total_in = 0;
        this.output = null;
        this.next_out = 0;
        this.avail_out = 0;
        this.total_out = 0;
        this.msg = "";
        this.state = null;
        this.data_type = 2;
        this.adler = 0;
      }
      module.exports = ZStream2;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/deflate.js
  var require_deflate2 = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/deflate.js"(exports, module) {
      "use strict";
      var zlib_deflate = require_deflate();
      var utils = require_common();
      var strings2 = require_strings();
      var msg = require_messages();
      var ZStream2 = require_zstream();
      var toString2 = Object.prototype.toString;
      var {
        Z_NO_FLUSH: Z_NO_FLUSH2,
        Z_SYNC_FLUSH: Z_SYNC_FLUSH2,
        Z_FULL_FLUSH: Z_FULL_FLUSH2,
        Z_FINISH: Z_FINISH2,
        Z_OK: Z_OK2,
        Z_STREAM_END: Z_STREAM_END2,
        Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION2,
        Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY2,
        Z_DEFLATED: Z_DEFLATED2
      } = require_constants();
      function Deflate2(options) {
        this.options = utils.assign({
          level: Z_DEFAULT_COMPRESSION2,
          method: Z_DEFLATED2,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: Z_DEFAULT_STRATEGY2
        }, options || {});
        let opt = this.options;
        if (opt.raw && opt.windowBits > 0) {
          opt.windowBits = -opt.windowBits;
        } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
          opt.windowBits += 16;
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream2();
        this.strm.avail_out = 0;
        let status = zlib_deflate.deflateInit2(
          this.strm,
          opt.level,
          opt.method,
          opt.windowBits,
          opt.memLevel,
          opt.strategy
        );
        if (status !== Z_OK2) {
          throw new Error(msg[status]);
        }
        if (opt.header) {
          zlib_deflate.deflateSetHeader(this.strm, opt.header);
        }
        if (opt.dictionary) {
          let dict;
          if (typeof opt.dictionary === "string") {
            dict = strings2.string2buf(opt.dictionary);
          } else if (toString2.call(opt.dictionary) === "[object ArrayBuffer]") {
            dict = new Uint8Array(opt.dictionary);
          } else {
            dict = opt.dictionary;
          }
          status = zlib_deflate.deflateSetDictionary(this.strm, dict);
          if (status !== Z_OK2) {
            throw new Error(msg[status]);
          }
          this._dict_set = true;
        }
      }
      Deflate2.prototype.push = function(data, flush_mode) {
        const strm = this.strm;
        const chunkSize = this.options.chunkSize;
        let status, _flush_mode;
        if (this.ended) {
          return false;
        }
        if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
        else _flush_mode = flush_mode === true ? Z_FINISH2 : Z_NO_FLUSH2;
        if (typeof data === "string") {
          strm.input = strings2.string2buf(data);
        } else if (toString2.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        for (; ; ) {
          if (strm.avail_out === 0) {
            strm.output = new Uint8Array(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          if ((_flush_mode === Z_SYNC_FLUSH2 || _flush_mode === Z_FULL_FLUSH2) && strm.avail_out <= 6) {
            this.onData(strm.output.subarray(0, strm.next_out));
            strm.avail_out = 0;
            continue;
          }
          status = zlib_deflate.deflate(strm, _flush_mode);
          if (status === Z_STREAM_END2) {
            if (strm.next_out > 0) {
              this.onData(strm.output.subarray(0, strm.next_out));
            }
            status = zlib_deflate.deflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return status === Z_OK2;
          }
          if (strm.avail_out === 0) {
            this.onData(strm.output);
            continue;
          }
          if (_flush_mode > 0 && strm.next_out > 0) {
            this.onData(strm.output.subarray(0, strm.next_out));
            strm.avail_out = 0;
            continue;
          }
          if (strm.avail_in === 0) break;
        }
        return true;
      };
      Deflate2.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Deflate2.prototype.onEnd = function(status) {
        if (status === Z_OK2) {
          this.result = utils.flattenChunks(this.chunks);
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function deflate2(input, options) {
        const deflator = new Deflate2(options);
        deflator.push(input, true);
        if (deflator.err) {
          throw deflator.msg || msg[deflator.err];
        }
        return deflator.result;
      }
      function deflateRaw2(input, options) {
        options = options || {};
        options.raw = true;
        return deflate2(input, options);
      }
      function gzip2(input, options) {
        options = options || {};
        options.gzip = true;
        return deflate2(input, options);
      }
      module.exports.Deflate = Deflate2;
      module.exports.deflate = deflate2;
      module.exports.deflateRaw = deflateRaw2;
      module.exports.gzip = gzip2;
      module.exports.constants = require_constants();
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/inffast.js
  var require_inffast = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/inffast.js"(exports, module) {
      "use strict";
      var BAD2 = 16209;
      var TYPE2 = 16191;
      module.exports = function inflate_fast2(strm, start) {
        let _in;
        let last;
        let _out;
        let beg;
        let end;
        let dmax;
        let wsize;
        let whave;
        let wnext;
        let s_window;
        let hold;
        let bits;
        let lcode;
        let dcode;
        let lmask;
        let dmask;
        let here;
        let op;
        let len;
        let dist;
        let from;
        let from_source;
        let input, output;
        const state = strm.state;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
        dmax = state.dmax;
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;
        top:
          do {
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = lcode[hold & lmask];
            dolen:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op === 0) {
                  output[_out++] = here & 65535;
                } else if (op & 16) {
                  len = here & 65535;
                  op &= 15;
                  if (op) {
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                    len += hold & (1 << op) - 1;
                    hold >>>= op;
                    bits -= op;
                  }
                  if (bits < 15) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  here = dcode[hold & dmask];
                  dodist:
                    for (; ; ) {
                      op = here >>> 24;
                      hold >>>= op;
                      bits -= op;
                      op = here >>> 16 & 255;
                      if (op & 16) {
                        dist = here & 65535;
                        op &= 15;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                          if (bits < op) {
                            hold += input[_in++] << bits;
                            bits += 8;
                          }
                        }
                        dist += hold & (1 << op) - 1;
                        if (dist > dmax) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD2;
                          break top;
                        }
                        hold >>>= op;
                        bits -= op;
                        op = _out - beg;
                        if (dist > op) {
                          op = dist - op;
                          if (op > whave) {
                            if (state.sane) {
                              strm.msg = "invalid distance too far back";
                              state.mode = BAD2;
                              break top;
                            }
                          }
                          from = 0;
                          from_source = s_window;
                          if (wnext === 0) {
                            from += wsize - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          } else if (wnext < op) {
                            from += wsize + wnext - op;
                            op -= wnext;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = 0;
                              if (wnext < len) {
                                op = wnext;
                                len -= op;
                                do {
                                  output[_out++] = s_window[from++];
                                } while (--op);
                                from = _out - dist;
                                from_source = output;
                              }
                            }
                          } else {
                            from += wnext - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                          while (len > 2) {
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            len -= 3;
                          }
                          if (len) {
                            output[_out++] = from_source[from++];
                            if (len > 1) {
                              output[_out++] = from_source[from++];
                            }
                          }
                        } else {
                          from = _out - dist;
                          do {
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            len -= 3;
                          } while (len > 2);
                          if (len) {
                            output[_out++] = output[from++];
                            if (len > 1) {
                              output[_out++] = output[from++];
                            }
                          }
                        }
                      } else if ((op & 64) === 0) {
                        here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                        continue dodist;
                      } else {
                        strm.msg = "invalid distance code";
                        state.mode = BAD2;
                        break top;
                      }
                      break;
                    }
                } else if ((op & 64) === 0) {
                  here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dolen;
                } else if (op & 32) {
                  state.mode = TYPE2;
                  break top;
                } else {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD2;
                  break top;
                }
                break;
              }
          } while (_in < last && _out < end);
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
        strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
        state.hold = hold;
        state.bits = bits;
        return;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/inftrees.js
  var require_inftrees = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/inftrees.js"(exports, module) {
      "use strict";
      var MAXBITS2 = 15;
      var ENOUGH_LENS2 = 852;
      var ENOUGH_DISTS2 = 592;
      var CODES2 = 0;
      var LENS2 = 1;
      var DISTS2 = 2;
      var lbase2 = new Uint16Array([
        /* Length codes 257..285 base */
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        13,
        15,
        17,
        19,
        23,
        27,
        31,
        35,
        43,
        51,
        59,
        67,
        83,
        99,
        115,
        131,
        163,
        195,
        227,
        258,
        0,
        0
      ]);
      var lext2 = new Uint8Array([
        /* Length codes 257..285 extra */
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        17,
        17,
        17,
        17,
        18,
        18,
        18,
        18,
        19,
        19,
        19,
        19,
        20,
        20,
        20,
        20,
        21,
        21,
        21,
        21,
        16,
        72,
        78
      ]);
      var dbase2 = new Uint16Array([
        /* Distance codes 0..29 base */
        1,
        2,
        3,
        4,
        5,
        7,
        9,
        13,
        17,
        25,
        33,
        49,
        65,
        97,
        129,
        193,
        257,
        385,
        513,
        769,
        1025,
        1537,
        2049,
        3073,
        4097,
        6145,
        8193,
        12289,
        16385,
        24577,
        0,
        0
      ]);
      var dext2 = new Uint8Array([
        /* Distance codes 0..29 extra */
        16,
        16,
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
        26,
        27,
        27,
        28,
        28,
        29,
        29,
        64,
        64
      ]);
      var inflate_table2 = (type, lens, lens_index, codes, table, table_index, work, opts) => {
        const bits = opts.bits;
        let len = 0;
        let sym = 0;
        let min = 0, max = 0;
        let root = 0;
        let curr = 0;
        let drop = 0;
        let left = 0;
        let used = 0;
        let huff = 0;
        let incr;
        let fill;
        let low;
        let mask;
        let next;
        let base = null;
        let match;
        const count = new Uint16Array(MAXBITS2 + 1);
        const offs = new Uint16Array(MAXBITS2 + 1);
        let extra = null;
        let here_bits, here_op, here_val;
        for (len = 0; len <= MAXBITS2; len++) {
          count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
          count[lens[lens_index + sym]]++;
        }
        root = bits;
        for (max = MAXBITS2; max >= 1; max--) {
          if (count[max] !== 0) {
            break;
          }
        }
        if (root > max) {
          root = max;
        }
        if (max === 0) {
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          opts.bits = 1;
          return 0;
        }
        for (min = 1; min < max; min++) {
          if (count[min] !== 0) {
            break;
          }
        }
        if (root < min) {
          root = min;
        }
        left = 1;
        for (len = 1; len <= MAXBITS2; len++) {
          left <<= 1;
          left -= count[len];
          if (left < 0) {
            return -1;
          }
        }
        if (left > 0 && (type === CODES2 || max !== 1)) {
          return -1;
        }
        offs[1] = 0;
        for (len = 1; len < MAXBITS2; len++) {
          offs[len + 1] = offs[len] + count[len];
        }
        for (sym = 0; sym < codes; sym++) {
          if (lens[lens_index + sym] !== 0) {
            work[offs[lens[lens_index + sym]]++] = sym;
          }
        }
        if (type === CODES2) {
          base = extra = work;
          match = 20;
        } else if (type === LENS2) {
          base = lbase2;
          extra = lext2;
          match = 257;
        } else {
          base = dbase2;
          extra = dext2;
          match = 0;
        }
        huff = 0;
        sym = 0;
        len = min;
        next = table_index;
        curr = root;
        drop = 0;
        low = -1;
        used = 1 << root;
        mask = used - 1;
        if (type === LENS2 && used > ENOUGH_LENS2 || type === DISTS2 && used > ENOUGH_DISTS2) {
          return 1;
        }
        for (; ; ) {
          here_bits = len - drop;
          if (work[sym] + 1 < match) {
            here_op = 0;
            here_val = work[sym];
          } else if (work[sym] >= match) {
            here_op = extra[work[sym] - match];
            here_val = base[work[sym] - match];
          } else {
            here_op = 32 + 64;
            here_val = 0;
          }
          incr = 1 << len - drop;
          fill = 1 << curr;
          min = fill;
          do {
            fill -= incr;
            table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
          } while (fill !== 0);
          incr = 1 << len - 1;
          while (huff & incr) {
            incr >>= 1;
          }
          if (incr !== 0) {
            huff &= incr - 1;
            huff += incr;
          } else {
            huff = 0;
          }
          sym++;
          if (--count[len] === 0) {
            if (len === max) {
              break;
            }
            len = lens[lens_index + work[sym]];
          }
          if (len > root && (huff & mask) !== low) {
            if (drop === 0) {
              drop = root;
            }
            next += min;
            curr = len - drop;
            left = 1 << curr;
            while (curr + drop < max) {
              left -= count[curr + drop];
              if (left <= 0) {
                break;
              }
              curr++;
              left <<= 1;
            }
            used += 1 << curr;
            if (type === LENS2 && used > ENOUGH_LENS2 || type === DISTS2 && used > ENOUGH_DISTS2) {
              return 1;
            }
            low = huff & mask;
            table[low] = root << 24 | curr << 16 | next - table_index | 0;
          }
        }
        if (huff !== 0) {
          table[next + huff] = len - drop << 24 | 64 << 16 | 0;
        }
        opts.bits = root;
        return 0;
      };
      module.exports = inflate_table2;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/inflate.js
  var require_inflate = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/inflate.js"(exports, module) {
      "use strict";
      var adler322 = require_adler32();
      var crc322 = require_crc32();
      var inflate_fast2 = require_inffast();
      var inflate_table2 = require_inftrees();
      var CODES2 = 0;
      var LENS2 = 1;
      var DISTS2 = 2;
      var {
        Z_FINISH: Z_FINISH2,
        Z_BLOCK: Z_BLOCK2,
        Z_TREES: Z_TREES2,
        Z_OK: Z_OK2,
        Z_STREAM_END: Z_STREAM_END2,
        Z_NEED_DICT: Z_NEED_DICT2,
        Z_STREAM_ERROR: Z_STREAM_ERROR2,
        Z_DATA_ERROR: Z_DATA_ERROR2,
        Z_MEM_ERROR: Z_MEM_ERROR2,
        Z_BUF_ERROR: Z_BUF_ERROR2,
        Z_DEFLATED: Z_DEFLATED2
      } = require_constants();
      var HEAD2 = 16180;
      var FLAGS2 = 16181;
      var TIME2 = 16182;
      var OS2 = 16183;
      var EXLEN2 = 16184;
      var EXTRA2 = 16185;
      var NAME2 = 16186;
      var COMMENT2 = 16187;
      var HCRC2 = 16188;
      var DICTID2 = 16189;
      var DICT2 = 16190;
      var TYPE2 = 16191;
      var TYPEDO2 = 16192;
      var STORED2 = 16193;
      var COPY_2 = 16194;
      var COPY2 = 16195;
      var TABLE2 = 16196;
      var LENLENS2 = 16197;
      var CODELENS2 = 16198;
      var LEN_2 = 16199;
      var LEN2 = 16200;
      var LENEXT2 = 16201;
      var DIST2 = 16202;
      var DISTEXT2 = 16203;
      var MATCH2 = 16204;
      var LIT2 = 16205;
      var CHECK2 = 16206;
      var LENGTH2 = 16207;
      var DONE2 = 16208;
      var BAD2 = 16209;
      var MEM2 = 16210;
      var SYNC2 = 16211;
      var ENOUGH_LENS2 = 852;
      var ENOUGH_DISTS2 = 592;
      var MAX_WBITS2 = 15;
      var DEF_WBITS2 = MAX_WBITS2;
      var zswap322 = (q) => {
        return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
      };
      function InflateState2() {
        this.strm = null;
        this.mode = 0;
        this.last = false;
        this.wrap = 0;
        this.havedict = false;
        this.flags = 0;
        this.dmax = 0;
        this.check = 0;
        this.total = 0;
        this.head = null;
        this.wbits = 0;
        this.wsize = 0;
        this.whave = 0;
        this.wnext = 0;
        this.window = null;
        this.hold = 0;
        this.bits = 0;
        this.length = 0;
        this.offset = 0;
        this.extra = 0;
        this.lencode = null;
        this.distcode = null;
        this.lenbits = 0;
        this.distbits = 0;
        this.ncode = 0;
        this.nlen = 0;
        this.ndist = 0;
        this.have = 0;
        this.next = null;
        this.lens = new Uint16Array(320);
        this.work = new Uint16Array(288);
        this.lendyn = null;
        this.distdyn = null;
        this.sane = 0;
        this.back = 0;
        this.was = 0;
      }
      var inflateStateCheck2 = (strm) => {
        if (!strm) {
          return 1;
        }
        const state = strm.state;
        if (!state || state.strm !== strm || state.mode < HEAD2 || state.mode > SYNC2) {
          return 1;
        }
        return 0;
      };
      var inflateResetKeep2 = (strm) => {
        if (inflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        const state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = "";
        if (state.wrap) {
          strm.adler = state.wrap & 1;
        }
        state.mode = HEAD2;
        state.last = 0;
        state.havedict = 0;
        state.flags = -1;
        state.dmax = 32768;
        state.head = null;
        state.hold = 0;
        state.bits = 0;
        state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS2);
        state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS2);
        state.sane = 1;
        state.back = -1;
        return Z_OK2;
      };
      var inflateReset3 = (strm) => {
        if (inflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        const state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep2(strm);
      };
      var inflateReset22 = (strm, windowBits) => {
        let wrap;
        if (inflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        const state = strm.state;
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else {
          wrap = (windowBits >> 4) + 5;
          if (windowBits < 48) {
            windowBits &= 15;
          }
        }
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
          return Z_STREAM_ERROR2;
        }
        if (state.window !== null && state.wbits !== windowBits) {
          state.window = null;
        }
        state.wrap = wrap;
        state.wbits = windowBits;
        return inflateReset3(strm);
      };
      var inflateInit22 = (strm, windowBits) => {
        if (!strm) {
          return Z_STREAM_ERROR2;
        }
        const state = new InflateState2();
        strm.state = state;
        state.strm = strm;
        state.window = null;
        state.mode = HEAD2;
        const ret = inflateReset22(strm, windowBits);
        if (ret !== Z_OK2) {
          strm.state = null;
        }
        return ret;
      };
      var inflateInit3 = (strm) => {
        return inflateInit22(strm, DEF_WBITS2);
      };
      var virgin2 = true;
      var lenfix2;
      var distfix2;
      var fixedtables2 = (state) => {
        if (virgin2) {
          lenfix2 = new Int32Array(512);
          distfix2 = new Int32Array(32);
          let sym = 0;
          while (sym < 144) {
            state.lens[sym++] = 8;
          }
          while (sym < 256) {
            state.lens[sym++] = 9;
          }
          while (sym < 280) {
            state.lens[sym++] = 7;
          }
          while (sym < 288) {
            state.lens[sym++] = 8;
          }
          inflate_table2(LENS2, state.lens, 0, 288, lenfix2, 0, state.work, { bits: 9 });
          sym = 0;
          while (sym < 32) {
            state.lens[sym++] = 5;
          }
          inflate_table2(DISTS2, state.lens, 0, 32, distfix2, 0, state.work, { bits: 5 });
          virgin2 = false;
        }
        state.lencode = lenfix2;
        state.lenbits = 9;
        state.distcode = distfix2;
        state.distbits = 5;
      };
      var updatewindow2 = (strm, src, end, copy) => {
        let dist;
        const state = strm.state;
        if (state.window === null) {
          state.wsize = 1 << state.wbits;
          state.wnext = 0;
          state.whave = 0;
          state.window = new Uint8Array(state.wsize);
        }
        if (copy >= state.wsize) {
          state.window.set(src.subarray(end - state.wsize, end), 0);
          state.wnext = 0;
          state.whave = state.wsize;
        } else {
          dist = state.wsize - state.wnext;
          if (dist > copy) {
            dist = copy;
          }
          state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
          copy -= dist;
          if (copy) {
            state.window.set(src.subarray(end - copy, end), 0);
            state.wnext = copy;
            state.whave = state.wsize;
          } else {
            state.wnext += dist;
            if (state.wnext === state.wsize) {
              state.wnext = 0;
            }
            if (state.whave < state.wsize) {
              state.whave += dist;
            }
          }
        }
        return 0;
      };
      var inflate3 = (strm, flush) => {
        let state;
        let input, output;
        let next;
        let put;
        let have, left;
        let hold;
        let bits;
        let _in, _out;
        let copy;
        let from;
        let from_source;
        let here = 0;
        let here_bits, here_op, here_val;
        let last_bits, last_op, last_val;
        let len;
        let ret;
        const hbuf = new Uint8Array(4);
        let opts;
        let n;
        const order = (
          /* permutation of code lengths */
          new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
        );
        if (inflateStateCheck2(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
          return Z_STREAM_ERROR2;
        }
        state = strm.state;
        if (state.mode === TYPE2) {
          state.mode = TYPEDO2;
        }
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        _in = have;
        _out = left;
        ret = Z_OK2;
        inf_leave:
          for (; ; ) {
            switch (state.mode) {
              case HEAD2:
                if (state.wrap === 0) {
                  state.mode = TYPEDO2;
                  break;
                }
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.wrap & 2 && hold === 35615) {
                  if (state.wbits === 0) {
                    state.wbits = 15;
                  }
                  state.check = 0;
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                  hold = 0;
                  bits = 0;
                  state.mode = FLAGS2;
                  break;
                }
                if (state.head) {
                  state.head.done = false;
                }
                if (!(state.wrap & 1) || /* check if zlib header allowed */
                (((hold & 255) << 8) + (hold >> 8)) % 31) {
                  strm.msg = "incorrect header check";
                  state.mode = BAD2;
                  break;
                }
                if ((hold & 15) !== Z_DEFLATED2) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD2;
                  break;
                }
                hold >>>= 4;
                bits -= 4;
                len = (hold & 15) + 8;
                if (state.wbits === 0) {
                  state.wbits = len;
                }
                if (len > 15 || len > state.wbits) {
                  strm.msg = "invalid window size";
                  state.mode = BAD2;
                  break;
                }
                state.dmax = 1 << state.wbits;
                state.flags = 0;
                strm.adler = state.check = 1;
                state.mode = hold & 512 ? DICTID2 : TYPE2;
                hold = 0;
                bits = 0;
                break;
              case FLAGS2:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.flags = hold;
                if ((state.flags & 255) !== Z_DEFLATED2) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD2;
                  break;
                }
                if (state.flags & 57344) {
                  strm.msg = "unknown header flags set";
                  state.mode = BAD2;
                  break;
                }
                if (state.head) {
                  state.head.text = hold >> 8 & 1;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = TIME2;
              /* falls through */
              case TIME2:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.time = hold;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  hbuf[2] = hold >>> 16 & 255;
                  hbuf[3] = hold >>> 24 & 255;
                  state.check = crc322(state.check, hbuf, 4, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = OS2;
              /* falls through */
              case OS2:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.xflags = hold & 255;
                  state.head.os = hold >> 8;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = EXLEN2;
              /* falls through */
              case EXLEN2:
                if (state.flags & 1024) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length = hold;
                  if (state.head) {
                    state.head.extra_len = hold;
                  }
                  if (state.flags & 512 && state.wrap & 4) {
                    hbuf[0] = hold & 255;
                    hbuf[1] = hold >>> 8 & 255;
                    state.check = crc322(state.check, hbuf, 2, 0);
                  }
                  hold = 0;
                  bits = 0;
                } else if (state.head) {
                  state.head.extra = null;
                }
                state.mode = EXTRA2;
              /* falls through */
              case EXTRA2:
                if (state.flags & 1024) {
                  copy = state.length;
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy) {
                    if (state.head) {
                      len = state.head.extra_len - state.length;
                      if (!state.head.extra) {
                        state.head.extra = new Uint8Array(state.head.extra_len);
                      }
                      state.head.extra.set(
                        input.subarray(
                          next,
                          // extra field is limited to 65536 bytes
                          // - no need for additional size check
                          next + copy
                        ),
                        /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                        len
                      );
                    }
                    if (state.flags & 512 && state.wrap & 4) {
                      state.check = crc322(state.check, input, copy, next);
                    }
                    have -= copy;
                    next += copy;
                    state.length -= copy;
                  }
                  if (state.length) {
                    break inf_leave;
                  }
                }
                state.length = 0;
                state.mode = NAME2;
              /* falls through */
              case NAME2:
                if (state.flags & 2048) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.name += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512 && state.wrap & 4) {
                    state.check = crc322(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.name = null;
                }
                state.length = 0;
                state.mode = COMMENT2;
              /* falls through */
              case COMMENT2:
                if (state.flags & 4096) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.comment += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512 && state.wrap & 4) {
                    state.check = crc322(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.comment = null;
                }
                state.mode = HCRC2;
              /* falls through */
              case HCRC2:
                if (state.flags & 512) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.wrap & 4 && hold !== (state.check & 65535)) {
                    strm.msg = "header crc mismatch";
                    state.mode = BAD2;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                if (state.head) {
                  state.head.hcrc = state.flags >> 9 & 1;
                  state.head.done = true;
                }
                strm.adler = state.check = 0;
                state.mode = TYPE2;
                break;
              case DICTID2:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                strm.adler = state.check = zswap322(hold);
                hold = 0;
                bits = 0;
                state.mode = DICT2;
              /* falls through */
              case DICT2:
                if (state.havedict === 0) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  return Z_NEED_DICT2;
                }
                strm.adler = state.check = 1;
                state.mode = TYPE2;
              /* falls through */
              case TYPE2:
                if (flush === Z_BLOCK2 || flush === Z_TREES2) {
                  break inf_leave;
                }
              /* falls through */
              case TYPEDO2:
                if (state.last) {
                  hold >>>= bits & 7;
                  bits -= bits & 7;
                  state.mode = CHECK2;
                  break;
                }
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.last = hold & 1;
                hold >>>= 1;
                bits -= 1;
                switch (hold & 3) {
                  case 0:
                    state.mode = STORED2;
                    break;
                  case 1:
                    fixedtables2(state);
                    state.mode = LEN_2;
                    if (flush === Z_TREES2) {
                      hold >>>= 2;
                      bits -= 2;
                      break inf_leave;
                    }
                    break;
                  case 2:
                    state.mode = TABLE2;
                    break;
                  case 3:
                    strm.msg = "invalid block type";
                    state.mode = BAD2;
                }
                hold >>>= 2;
                bits -= 2;
                break;
              case STORED2:
                hold >>>= bits & 7;
                bits -= bits & 7;
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                  strm.msg = "invalid stored block lengths";
                  state.mode = BAD2;
                  break;
                }
                state.length = hold & 65535;
                hold = 0;
                bits = 0;
                state.mode = COPY_2;
                if (flush === Z_TREES2) {
                  break inf_leave;
                }
              /* falls through */
              case COPY_2:
                state.mode = COPY2;
              /* falls through */
              case COPY2:
                copy = state.length;
                if (copy) {
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy > left) {
                    copy = left;
                  }
                  if (copy === 0) {
                    break inf_leave;
                  }
                  output.set(input.subarray(next, next + copy), put);
                  have -= copy;
                  next += copy;
                  left -= copy;
                  put += copy;
                  state.length -= copy;
                  break;
                }
                state.mode = TYPE2;
                break;
              case TABLE2:
                while (bits < 14) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.nlen = (hold & 31) + 257;
                hold >>>= 5;
                bits -= 5;
                state.ndist = (hold & 31) + 1;
                hold >>>= 5;
                bits -= 5;
                state.ncode = (hold & 15) + 4;
                hold >>>= 4;
                bits -= 4;
                if (state.nlen > 286 || state.ndist > 30) {
                  strm.msg = "too many length or distance symbols";
                  state.mode = BAD2;
                  break;
                }
                state.have = 0;
                state.mode = LENLENS2;
              /* falls through */
              case LENLENS2:
                while (state.have < state.ncode) {
                  while (bits < 3) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.lens[order[state.have++]] = hold & 7;
                  hold >>>= 3;
                  bits -= 3;
                }
                while (state.have < 19) {
                  state.lens[order[state.have++]] = 0;
                }
                state.lencode = state.lendyn;
                state.lenbits = 7;
                opts = { bits: state.lenbits };
                ret = inflate_table2(CODES2, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid code lengths set";
                  state.mode = BAD2;
                  break;
                }
                state.have = 0;
                state.mode = CODELENS2;
              /* falls through */
              case CODELENS2:
                while (state.have < state.nlen + state.ndist) {
                  for (; ; ) {
                    here = state.lencode[hold & (1 << state.lenbits) - 1];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (here_val < 16) {
                    hold >>>= here_bits;
                    bits -= here_bits;
                    state.lens[state.have++] = here_val;
                  } else {
                    if (here_val === 16) {
                      n = here_bits + 2;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      if (state.have === 0) {
                        strm.msg = "invalid bit length repeat";
                        state.mode = BAD2;
                        break;
                      }
                      len = state.lens[state.have - 1];
                      copy = 3 + (hold & 3);
                      hold >>>= 2;
                      bits -= 2;
                    } else if (here_val === 17) {
                      n = here_bits + 3;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 3 + (hold & 7);
                      hold >>>= 3;
                      bits -= 3;
                    } else {
                      n = here_bits + 7;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 11 + (hold & 127);
                      hold >>>= 7;
                      bits -= 7;
                    }
                    if (state.have + copy > state.nlen + state.ndist) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD2;
                      break;
                    }
                    while (copy--) {
                      state.lens[state.have++] = len;
                    }
                  }
                }
                if (state.mode === BAD2) {
                  break;
                }
                if (state.lens[256] === 0) {
                  strm.msg = "invalid code -- missing end-of-block";
                  state.mode = BAD2;
                  break;
                }
                state.lenbits = 9;
                opts = { bits: state.lenbits };
                ret = inflate_table2(LENS2, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid literal/lengths set";
                  state.mode = BAD2;
                  break;
                }
                state.distbits = 6;
                state.distcode = state.distdyn;
                opts = { bits: state.distbits };
                ret = inflate_table2(DISTS2, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                state.distbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid distances set";
                  state.mode = BAD2;
                  break;
                }
                state.mode = LEN_2;
                if (flush === Z_TREES2) {
                  break inf_leave;
                }
              /* falls through */
              case LEN_2:
                state.mode = LEN2;
              /* falls through */
              case LEN2:
                if (have >= 6 && left >= 258) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  inflate_fast2(strm, _out);
                  put = strm.next_out;
                  output = strm.output;
                  left = strm.avail_out;
                  next = strm.next_in;
                  input = strm.input;
                  have = strm.avail_in;
                  hold = state.hold;
                  bits = state.bits;
                  if (state.mode === TYPE2) {
                    state.back = -1;
                  }
                  break;
                }
                state.back = 0;
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_op && (here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                state.length = here_val;
                if (here_op === 0) {
                  state.mode = LIT2;
                  break;
                }
                if (here_op & 32) {
                  state.back = -1;
                  state.mode = TYPE2;
                  break;
                }
                if (here_op & 64) {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD2;
                  break;
                }
                state.extra = here_op & 15;
                state.mode = LENEXT2;
              /* falls through */
              case LENEXT2:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                state.was = state.length;
                state.mode = DIST2;
              /* falls through */
              case DIST2:
                for (; ; ) {
                  here = state.distcode[hold & (1 << state.distbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                if (here_op & 64) {
                  strm.msg = "invalid distance code";
                  state.mode = BAD2;
                  break;
                }
                state.offset = here_val;
                state.extra = here_op & 15;
                state.mode = DISTEXT2;
              /* falls through */
              case DISTEXT2:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.offset += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                if (state.offset > state.dmax) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD2;
                  break;
                }
                state.mode = MATCH2;
              /* falls through */
              case MATCH2:
                if (left === 0) {
                  break inf_leave;
                }
                copy = _out - left;
                if (state.offset > copy) {
                  copy = state.offset - copy;
                  if (copy > state.whave) {
                    if (state.sane) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD2;
                      break;
                    }
                  }
                  if (copy > state.wnext) {
                    copy -= state.wnext;
                    from = state.wsize - copy;
                  } else {
                    from = state.wnext - copy;
                  }
                  if (copy > state.length) {
                    copy = state.length;
                  }
                  from_source = state.window;
                } else {
                  from_source = output;
                  from = put - state.offset;
                  copy = state.length;
                }
                if (copy > left) {
                  copy = left;
                }
                left -= copy;
                state.length -= copy;
                do {
                  output[put++] = from_source[from++];
                } while (--copy);
                if (state.length === 0) {
                  state.mode = LEN2;
                }
                break;
              case LIT2:
                if (left === 0) {
                  break inf_leave;
                }
                output[put++] = state.length;
                left--;
                state.mode = LEN2;
                break;
              case CHECK2:
                if (state.wrap) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold |= input[next++] << bits;
                    bits += 8;
                  }
                  _out -= left;
                  strm.total_out += _out;
                  state.total += _out;
                  if (state.wrap & 4 && _out) {
                    strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
                    state.flags ? crc322(state.check, output, _out, put - _out) : adler322(state.check, output, _out, put - _out);
                  }
                  _out = left;
                  if (state.wrap & 4 && (state.flags ? hold : zswap322(hold)) !== state.check) {
                    strm.msg = "incorrect data check";
                    state.mode = BAD2;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = LENGTH2;
              /* falls through */
              case LENGTH2:
                if (state.wrap && state.flags) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
                    strm.msg = "incorrect length check";
                    state.mode = BAD2;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = DONE2;
              /* falls through */
              case DONE2:
                ret = Z_STREAM_END2;
                break inf_leave;
              case BAD2:
                ret = Z_DATA_ERROR2;
                break inf_leave;
              case MEM2:
                return Z_MEM_ERROR2;
              case SYNC2:
              /* falls through */
              default:
                return Z_STREAM_ERROR2;
            }
          }
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        if (state.wsize || _out !== strm.avail_out && state.mode < BAD2 && (state.mode < CHECK2 || flush !== Z_FINISH2)) {
          if (updatewindow2(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
            state.mode = MEM2;
            return Z_MEM_ERROR2;
          }
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap & 4 && _out) {
          strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
          state.flags ? crc322(state.check, output, _out, strm.next_out - _out) : adler322(state.check, output, _out, strm.next_out - _out);
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE2 ? 128 : 0) + (state.mode === LEN_2 || state.mode === COPY_2 ? 256 : 0);
        if ((_in === 0 && _out === 0 || flush === Z_FINISH2) && ret === Z_OK2) {
          ret = Z_BUF_ERROR2;
        }
        return ret;
      };
      var inflateEnd2 = (strm) => {
        if (inflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        let state = strm.state;
        if (state.window) {
          state.window = null;
        }
        strm.state = null;
        return Z_OK2;
      };
      var inflateGetHeader2 = (strm, head) => {
        if (inflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        const state = strm.state;
        if ((state.wrap & 2) === 0) {
          return Z_STREAM_ERROR2;
        }
        state.head = head;
        head.done = false;
        return Z_OK2;
      };
      var inflateSetDictionary2 = (strm, dictionary) => {
        const dictLength = dictionary.length;
        let state;
        let dictid;
        let ret;
        if (inflateStateCheck2(strm)) {
          return Z_STREAM_ERROR2;
        }
        state = strm.state;
        if (state.wrap !== 0 && state.mode !== DICT2) {
          return Z_STREAM_ERROR2;
        }
        if (state.mode === DICT2) {
          dictid = 1;
          dictid = adler322(dictid, dictionary, dictLength, 0);
          if (dictid !== state.check) {
            return Z_DATA_ERROR2;
          }
        }
        ret = updatewindow2(strm, dictionary, dictLength, dictLength);
        if (ret) {
          state.mode = MEM2;
          return Z_MEM_ERROR2;
        }
        state.havedict = 1;
        return Z_OK2;
      };
      module.exports.inflateReset = inflateReset3;
      module.exports.inflateReset2 = inflateReset22;
      module.exports.inflateResetKeep = inflateResetKeep2;
      module.exports.inflateInit = inflateInit3;
      module.exports.inflateInit2 = inflateInit22;
      module.exports.inflate = inflate3;
      module.exports.inflateEnd = inflateEnd2;
      module.exports.inflateGetHeader = inflateGetHeader2;
      module.exports.inflateSetDictionary = inflateSetDictionary2;
      module.exports.inflateInfo = "pako inflate (from Nodeca project)";
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/gzheader.js
  var require_gzheader = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/zlib/gzheader.js"(exports, module) {
      "use strict";
      function GZheader2() {
        this.text = 0;
        this.time = 0;
        this.xflags = 0;
        this.os = 0;
        this.extra = null;
        this.extra_len = 0;
        this.name = "";
        this.comment = "";
        this.hcrc = 0;
        this.done = false;
      }
      module.exports = GZheader2;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/inflate.js
  var require_inflate2 = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/lib/inflate.js"(exports, module) {
      "use strict";
      var zlib_inflate = require_inflate();
      var utils = require_common();
      var strings2 = require_strings();
      var msg = require_messages();
      var ZStream2 = require_zstream();
      var GZheader2 = require_gzheader();
      var toString2 = Object.prototype.toString;
      var {
        Z_NO_FLUSH: Z_NO_FLUSH2,
        Z_FINISH: Z_FINISH2,
        Z_OK: Z_OK2,
        Z_STREAM_END: Z_STREAM_END2,
        Z_NEED_DICT: Z_NEED_DICT2,
        Z_STREAM_ERROR: Z_STREAM_ERROR2,
        Z_DATA_ERROR: Z_DATA_ERROR2,
        Z_MEM_ERROR: Z_MEM_ERROR2
      } = require_constants();
      function Inflate2(options) {
        this.options = utils.assign({
          chunkSize: 1024 * 64,
          windowBits: 15,
          to: ""
        }, options || {});
        const opt = this.options;
        if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
          opt.windowBits = -opt.windowBits;
          if (opt.windowBits === 0) {
            opt.windowBits = -15;
          }
        }
        if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
          opt.windowBits += 32;
        }
        if (opt.windowBits > 15 && opt.windowBits < 48) {
          if ((opt.windowBits & 15) === 0) {
            opt.windowBits |= 15;
          }
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream2();
        this.strm.avail_out = 0;
        let status = zlib_inflate.inflateInit2(
          this.strm,
          opt.windowBits
        );
        if (status !== Z_OK2) {
          throw new Error(msg[status]);
        }
        this.header = new GZheader2();
        zlib_inflate.inflateGetHeader(this.strm, this.header);
        if (opt.dictionary) {
          if (typeof opt.dictionary === "string") {
            opt.dictionary = strings2.string2buf(opt.dictionary);
          } else if (toString2.call(opt.dictionary) === "[object ArrayBuffer]") {
            opt.dictionary = new Uint8Array(opt.dictionary);
          }
          if (opt.raw) {
            status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
            if (status !== Z_OK2) {
              throw new Error(msg[status]);
            }
          }
        }
      }
      Inflate2.prototype.push = function(data, flush_mode) {
        const strm = this.strm;
        const chunkSize = this.options.chunkSize;
        const dictionary = this.options.dictionary;
        let status, _flush_mode, last_avail_out;
        if (this.ended) return false;
        if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
        else _flush_mode = flush_mode === true ? Z_FINISH2 : Z_NO_FLUSH2;
        if (toString2.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        for (; ; ) {
          if (strm.avail_out === 0) {
            strm.output = new Uint8Array(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_inflate.inflate(strm, _flush_mode);
          if (status === Z_NEED_DICT2 && dictionary) {
            status = zlib_inflate.inflateSetDictionary(strm, dictionary);
            if (status === Z_OK2) {
              status = zlib_inflate.inflate(strm, _flush_mode);
            } else if (status === Z_DATA_ERROR2) {
              status = Z_NEED_DICT2;
            }
          }
          while (strm.avail_in > 0 && status === Z_STREAM_END2 && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
            zlib_inflate.inflateReset(strm);
            status = zlib_inflate.inflate(strm, _flush_mode);
          }
          switch (status) {
            case Z_STREAM_ERROR2:
            case Z_DATA_ERROR2:
            case Z_NEED_DICT2:
            case Z_MEM_ERROR2:
              this.onEnd(status);
              this.ended = true;
              return false;
          }
          last_avail_out = strm.avail_out;
          if (strm.next_out) {
            if (strm.avail_out === 0 || status === Z_STREAM_END2) {
              if (this.options.to === "string") {
                let next_out_utf8 = strings2.utf8border(strm.output, strm.next_out);
                let tail = strm.next_out - next_out_utf8;
                let utf8str = strings2.buf2string(strm.output, next_out_utf8);
                strm.next_out = tail;
                strm.avail_out = chunkSize - tail;
                if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
                this.onData(utf8str);
              } else {
                this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
              }
            }
          }
          if (status === Z_OK2 && last_avail_out === 0) continue;
          if (status === Z_STREAM_END2) {
            status = zlib_inflate.inflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return true;
          }
          if (strm.avail_in === 0) break;
        }
        return true;
      };
      Inflate2.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Inflate2.prototype.onEnd = function(status) {
        if (status === Z_OK2) {
          if (this.options.to === "string") {
            this.result = this.chunks.join("");
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function inflate3(input, options) {
        const inflator = new Inflate2(options);
        inflator.push(input);
        if (inflator.err) throw inflator.msg || msg[inflator.err];
        return inflator.result;
      }
      function inflateRaw2(input, options) {
        options = options || {};
        options.raw = true;
        return inflate3(input, options);
      }
      module.exports.Inflate = Inflate2;
      module.exports.inflate = inflate3;
      module.exports.inflateRaw = inflateRaw2;
      module.exports.ungzip = inflate3;
      module.exports.constants = require_constants();
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/index.js
  var require_pako = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/node_modules/pako/index.js"(exports, module) {
      "use strict";
      var { Deflate: Deflate2, deflate: deflate2, deflateRaw: deflateRaw2, gzip: gzip2 } = require_deflate2();
      var { Inflate: Inflate2, inflate: inflate3, inflateRaw: inflateRaw2, ungzip: ungzip2 } = require_inflate2();
      var constants3 = require_constants();
      module.exports.Deflate = Deflate2;
      module.exports.deflate = deflate2;
      module.exports.deflateRaw = deflateRaw2;
      module.exports.gzip = gzip2;
      module.exports.Inflate = Inflate2;
      module.exports.inflate = inflate3;
      module.exports.inflateRaw = inflateRaw2;
      module.exports.ungzip = ungzip2;
      module.exports.constants = constants3;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/shims/iconv-lite.js
  var iconv_lite_exports = {};
  __export(iconv_lite_exports, {
    decode: () => decode,
    default: () => iconv_lite_default,
    encode: () => encode
  });
  function decode(buffer, encoding) {
    const cs = CHARSETS[String(encoding).toLowerCase()];
    if (!cs) throw new Error("Unsupported encoding: " + encoding);
    return globalThis.__lx_native_call__utils_decode_charset(import_buffer.Buffer.from(buffer).toString("base64"), cs);
  }
  function encode(str, encoding) {
    const cs = CHARSETS[String(encoding).toLowerCase()];
    if (!cs) throw new Error("Unsupported encoding: " + encoding);
    return import_buffer.Buffer.from(globalThis.__lx_native_call__utils_encode_charset(str, cs), "base64");
  }
  var import_buffer, CHARSETS, iconv_lite_default;
  var init_iconv_lite = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/shims/iconv-lite.js"() {
      import_buffer = __toESM(require_buffer());
      CHARSETS = {
        gb18030: "GB18030",
        gbk: "GBK",
        gb2312: "GB2312",
        big5: "Big5",
        utf8: "UTF-8",
        "utf-8": "UTF-8"
      };
      iconv_lite_default = { decode, encode };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/decodeLyric.js
  var inflate2, iconv, handleInflate, buf_key, buf_key_len, decodeLyric, decodeLyric_default;
  var init_decodeLyric = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/decodeLyric.js"() {
      ({ inflate: inflate2 } = require_pako());
      iconv = (init_iconv_lite(), __toCommonJS(iconv_lite_exports));
      handleInflate = (data) => new Promise((resolve, reject) => {
        resolve(Buffer.from(inflate2(data)));
      });
      buf_key = Buffer.from("yeelion");
      buf_key_len = buf_key.length;
      decodeLyric = async (buf, isGetLyricx) => {
        if (buf.toString("utf8", 0, 10) != "tp=content") return "";
        const lrcData = await handleInflate(buf.slice(buf.indexOf("\r\n\r\n") + 4));
        if (!isGetLyricx) return iconv.decode(lrcData, "gb18030");
        const buf_str = Buffer.from(lrcData.toString(), "base64");
        const buf_str_len = buf_str.length;
        const output = new Uint16Array(buf_str_len);
        let i = 0;
        while (i < buf_str_len) {
          let j = 0;
          while (j < buf_key_len && i < buf_str_len) {
            output[i] = buf_str[i] ^ buf_key[j];
            i++;
            j++;
          }
        }
        return iconv.decode(Buffer.from(output), "gb18030");
      };
      decodeLyric_default = async ({ lrcBuffer, isGetLyricx }) => {
        const lrc = await decodeLyric(lrcBuffer, isGetLyricx);
        return Buffer.from(lrc).toString("base64");
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/util.js
  var kw_token, objStr2JSON, formatSinger, matchToken, wait, getToken, tokenRequest, lrcTools;
  var init_util = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/util.js"() {
      init_request();
      init_decodeLyric();
      kw_token = {
        token: null,
        isGetingToken: false
      };
      objStr2JSON = (str) => {
        return JSON.parse(str.replace(/('(?=(,\s*')))|('(?=:))|((?<=([:,]\s*))')|((?<={)')|('(?=}))/g, '"'));
      };
      formatSinger = (rawData) => rawData.replace(/&/g, "\u3001");
      matchToken = (headers2) => {
        try {
          return headers2["set-cookie"].match(/kw_token=(\w+)/)[1];
        } catch (err2) {
          return null;
        }
      };
      wait = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
      getToken = (retryNum = 0) => new Promise((resolve, reject) => {
        if (retryNum > 2) return Promise.reject(new Error("try max num"));
        if (kw_token.isGetingToken) return wait(1e3).then(() => getToken(retryNum).then((token) => resolve(token)));
        if (kw_token.token) return resolve(kw_token.token);
        kw_token.isGetingToken = true;
        httpGet("http://www.kuwo.cn/", (err2, resp) => {
          kw_token.isGetingToken = false;
          if (err2) return getToken(++retryNum);
          if (resp.statusCode != 200) return reject(new Error("\u83B7\u53D6\u5931\u8D25"));
          const token = kw_token.token = matchToken(resp.headers);
          resolve(token);
        });
      });
      tokenRequest = async (url, options = {}) => {
        let token = kw_token.token;
        if (!token) token = await getToken();
        if (!options.headers) {
          options.headers = {
            Referer: "http://www.kuwo.cn/",
            csrf: token,
            cookie: "kw_token=" + token
          };
        }
        const requestObj = httpFetch(url, options);
        requestObj.promise = requestObj.promise.then((resp) => {
          if (resp.statusCode == 200) {
            kw_token.token = matchToken(resp.headers);
          }
          return resp;
        });
        return requestObj;
      };
      lrcTools = {
        rxps: {
          wordLine: /^(\[\d{1,2}:.*\d{1,4}\])\s*(\S+(?:\s+\S+)*)?\s*/,
          tagLine: /\[(ver|ti|ar|al|offset|by|kuwo):\s*(\S+(?:\s+\S+)*)\s*\]/,
          wordTimeAll: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/g,
          wordTime: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/
        },
        offset: 1,
        offset2: 1,
        isOK: false,
        lines: [],
        tags: [],
        getWordInfo(str, str2, prevWord) {
          const offset = parseInt(str);
          const offset2 = parseInt(str2);
          let startTime = Math.abs((offset + offset2) / (this.offset * 2));
          let endTime = Math.abs((offset - offset2) / (this.offset2 * 2)) + startTime;
          if (prevWord) {
            if (startTime < prevWord.endTime) {
              prevWord.endTime = startTime;
              if (prevWord.startTime > prevWord.endTime) {
                prevWord.startTime = prevWord.endTime;
              }
              prevWord.newTimeStr = `<${prevWord.startTime},${prevWord.endTime - prevWord.startTime}>`;
            }
          }
          return {
            startTime,
            endTime,
            timeStr: `<${startTime},${endTime - startTime}>`
          };
        },
        parseLine(line) {
          if (line.length < 6) return;
          let result = this.rxps.wordLine.exec(line);
          if (result) {
            const time = result[1];
            let words = result[2];
            if (words == null) {
              words = "";
            }
            const wordTimes = words.match(this.rxps.wordTimeAll);
            if (!wordTimes) return;
            let preTimeInfo;
            for (const timeStr of wordTimes) {
              const result2 = this.rxps.wordTime.exec(timeStr);
              const wordInfo = this.getWordInfo(result2[1], result2[2], preTimeInfo);
              words = words.replace(timeStr, wordInfo.timeStr);
              if (preTimeInfo?.newTimeStr) words = words.replace(preTimeInfo.timeStr, preTimeInfo.newTimeStr);
              preTimeInfo = wordInfo;
            }
            this.lines.push(time + words);
            return;
          }
          result = this.rxps.tagLine.exec(line);
          if (!result) return;
          if (result[1] == "kuwo") {
            let content = result[2];
            if (content != null && content.includes("][")) {
              content = content.substring(0, content.indexOf("]["));
            }
            const valueOf = parseInt(content, 8);
            this.offset = Math.trunc(valueOf / 10);
            this.offset2 = Math.trunc(valueOf % 10);
            if (this.offset == 0 || Number.isNaN(this.offset) || this.offset2 == 0 || Number.isNaN(this.offset2)) {
              this.isOK = false;
            }
          } else {
            this.tags.push(line);
          }
        },
        parse(lrc) {
          const lines = lrc.split(/\r\n|\r|\n/);
          const tools = Object.create(this);
          tools.isOK = true;
          tools.offset = 1;
          tools.offset2 = 1;
          tools.lines = [];
          tools.tags = [];
          for (const line of lines) {
            if (!tools.isOK) throw new Error("failed");
            tools.parseLine(line);
          }
          if (!tools.lines.length) return "";
          let lrcs = tools.lines.join("\n");
          if (tools.tags.length) lrcs = `${tools.tags.join("\n")}
${lrcs}`;
          return lrcs;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/tempSearch.js
  var tempSearch_default;
  var init_tempSearch = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/tempSearch.js"() {
      init_utils();
      init_util();
      tempSearch_default = {
        regExps: {
          relWord: /RELWORD=(.+)/
        },
        requestObj: null,
        async tempSearch(str) {
          this.cancelTempSearch();
          this.requestObj = await tokenRequest(`http://www.kuwo.cn/api/www/search/searchKey?key=${encodeURIComponent(str)}`);
          return this.requestObj.promise.then(({ body }) => {
            if (body.code !== 200) return Promise.reject(new Error("\u8BF7\u6C42\u5931\u8D25"));
            return body;
          });
        },
        handleResult(rawData) {
          return rawData.map((info) => {
            let matchResult = info.match(this.regExps.relWord);
            return matchResult ? decodeName(matchResult[1]) : "";
          });
        },
        cancelTempSearch() {
          if (this.requestObj && this.requestObj.cancelHttp) this.requestObj.cancelHttp();
        },
        async search(str) {
          return this.tempSearch(str).then((result) => this.handleResult(result.data));
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/musicSearch.js
  var musicSearch_default;
  var init_musicSearch = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/musicSearch.js"() {
      init_request();
      init_utils();
      init_util();
      musicSearch_default = {
        regExps: {
          mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/
        },
        limit: 30,
        total: 0,
        page: 0,
        allPage: 1,
        // cancelFn: null,
        musicSearch(str, page, limit) {
          const musicSearchRequestObj = httpFetch(`http://search.kuwo.cn/r.s?client=kt&all=${encodeURIComponent(str)}&pn=${page - 1}&rn=${limit}&uid=794762570&ver=kwplayer_ar_9.2.2.1&vipver=1&show_copyright_off=1&newver=1&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&vermerge=1&mobi=1&issubtitle=1`);
          return musicSearchRequestObj.promise;
        },
        // getImg(songId) {
        //   return httpGet(`http://player.kuwo.cn/webmusic/sj/dtflagdate?flag=6&rid=MUSIC_${songId}`)
        // },
        // getLrc(songId) {
        //   return httpGet(`http://mobile.kuwo.cn/mpage/html5/songinfoandlrc?mid=${songId}&flag=0`)
        // },
        handleResult(rawData) {
          const result = [];
          if (!rawData) return result;
          for (let i = 0; i < rawData.length; i++) {
            const info = rawData[i];
            let songId = info.MUSICRID.replace("MUSIC_", "");
            if (!info.N_MINFO) {
              console.log("N_MINFO is undefined");
              return null;
            }
            const types = [];
            const _types = {};
            let infoArr = info.N_MINFO.split(";");
            for (let info2 of infoArr) {
              info2 = info2.match(this.regExps.mInfo);
              if (info2) {
                switch (info2[2]) {
                  case "4000":
                    types.push({ type: "flac24bit", size: info2[4] });
                    _types.flac24bit = {
                      size: info2[4].toLocaleUpperCase()
                    };
                    break;
                  case "2000":
                    types.push({ type: "flac", size: info2[4] });
                    _types.flac = {
                      size: info2[4].toLocaleUpperCase()
                    };
                    break;
                  case "320":
                    types.push({ type: "320k", size: info2[4] });
                    _types["320k"] = {
                      size: info2[4].toLocaleUpperCase()
                    };
                    break;
                  case "192":
                  case "128":
                    types.push({ type: "128k", size: info2[4] });
                    _types["128k"] = {
                      size: info2[4].toLocaleUpperCase()
                    };
                    break;
                }
              }
            }
            types.reverse();
            let interval = parseInt(info.DURATION);
            result.push({
              name: decodeName(info.SONGNAME),
              singer: formatSinger(decodeName(info.ARTIST)),
              source: "kw",
              // img = (info.album.name === '' || info.album.name === '空')
              //   ? `http://player.kuwo.cn/webmusic/sj/dtflagdate?flag=6&rid=MUSIC_160911.jpg`
              //   : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${info.album.mid}.jpg`
              songmid: songId,
              albumId: decodeName(info.ALBUMID || ""),
              interval: Number.isNaN(interval) ? 0 : formatPlayTime(interval),
              albumName: info.ALBUM ? decodeName(info.ALBUM) : "",
              lrc: null,
              img: null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            });
          }
          return result;
        },
        search(str, page = 1, limit, retryNum = 0) {
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          if (limit == null) limit = this.limit;
          return this.musicSearch(str, page, limit).then(({ body: result }) => {
            if (!result || result.TOTAL !== "0" && result.SHOW === "0") return this.search(str, page, limit, ++retryNum);
            let list = this.handleResult(result.abslist);
            if (list == null) return this.search(str, page, limit, ++retryNum);
            this.total = parseInt(result.TOTAL);
            this.page = page;
            this.allPage = Math.ceil(this.total / limit);
            return Promise.resolve({
              list,
              allPage: this.allPage,
              total: this.total,
              limit,
              source: "kw"
            });
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/leaderboard.js
  var boardList, leaderboard_default;
  var init_leaderboard = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/leaderboard.js"() {
      init_request();
      init_utils();
      init_util();
      boardList = [{ id: "kw__93", name: "\u9177\u6211\u98D9\u5347\u699C", bangid: "93" }, { id: "kw__17", name: "\u9177\u6211\u65B0\u6B4C\u699C", bangid: "17" }, { id: "kw__16", name: "\u9177\u6211\u70ED\u6B4C\u699C", bangid: "16" }, { id: "kw__158", name: "\u6296\u97F3\u70ED\u6B4C\u699C", bangid: "158" }, { id: "kw__284", name: "\u9177\u6211\u70ED\u8BC4\u699C", bangid: "284" }, { id: "kw__290", name: "ACG\u65B0\u6B4C\u699C", bangid: "290" }, { id: "kw__286", name: "\u53F0\u6E7EKKBOX\u699C", bangid: "286" }, { id: "kw__279", name: "\u6625\u65E5\u6D45\u5531\u699C", bangid: "279" }, { id: "kw__281", name: "\u5DF4\u58EB\u968F\u8EAB\u542C\u699C", bangid: "281" }, { id: "kw__255", name: "KTV\u70B9\u5531\u699C", bangid: "255" }, { id: "kw__280", name: "\u5BB6\u52A1\u8FDB\u884C\u66F2\u699C", bangid: "280" }, { id: "kw__282", name: "\u71AC\u591C\u4FEE\u4ED9\u699C", bangid: "282" }, { id: "kw__283", name: "\u6795\u8FB9\u8F7B\u97F3\u4E50\u699C", bangid: "283" }, { id: "kw__278", name: "\u53E4\u98CE\u97F3\u4E50\u699C", bangid: "278" }, { id: "kw__264", name: "Vlog\u97F3\u4E50\u699C", bangid: "264" }, { id: "kw__242", name: "\u9177\u6211\u7535\u97F3\u699C", bangid: "242" }, { id: "kw__187", name: "\u6D41\u884C\u8D8B\u52BF\u699C", bangid: "187" }, { id: "kw__204", name: "\u73B0\u573A\u97F3\u4E50\u699C", bangid: "204" }, { id: "kw__186", name: "ACG\u795E\u66F2\u699C", bangid: "186" }, { id: "kw__185", name: "\u6700\u5F3A\u7FFB\u5531\u699C", bangid: "185" }, { id: "kw__26", name: "\u7ECF\u5178\u6000\u65E7\u699C", bangid: "26" }, { id: "kw__104", name: "\u9177\u6211\u534E\u8BED\u699C", bangid: "104" }, { id: "kw__182", name: "\u9177\u6211\u7CA4\u8BED\u699C", bangid: "182" }, { id: "kw__22", name: "\u9177\u6211\u6B27\u7F8E\u699C", bangid: "22" }, { id: "kw__184", name: "\u9177\u6211\u97E9\u8BED\u699C", bangid: "184" }, { id: "kw__183", name: "\u9177\u6211\u65E5\u8BED\u699C", bangid: "183" }, { id: "kw__145", name: "\u4F1A\u5458\u7545\u542C\u699C", bangid: "145" }, { id: "kw__153", name: "\u7F51\u7EA2\u65B0\u6B4C\u699C", bangid: "153" }, { id: "kw__64", name: "\u5F71\u89C6\u91D1\u66F2\u699C", bangid: "64" }, { id: "kw__176", name: "DJ\u55E8\u6B4C\u699C", bangid: "176" }, { id: "kw__106", name: "\u9177\u6211\u771F\u58F0\u97F3", bangid: "106" }, { id: "kw__12", name: "Billboard\u699C", bangid: "12" }, { id: "kw__49", name: "iTunes\u97F3\u4E50\u699C", bangid: "49" }, { id: "kw__180", name: "beatport\u7535\u97F3\u699C", bangid: "180" }, { id: "kw__13", name: "\u82F1\u56FDUK\u699C", bangid: "13" }, { id: "kw__164", name: "\u767E\u5927DJ\u699C", bangid: "164" }, { id: "kw__246", name: "YouTube\u97F3\u4E50\u6392\u884C\u699C", bangid: "246" }, { id: "kw__265", name: "\u97E9\u56FDGenie\u699C", bangid: "265" }, { id: "kw__14", name: "\u97E9\u56FDM-net\u699C", bangid: "14" }, { id: "kw__8", name: "\u9999\u6E2F\u7535\u53F0\u699C", bangid: "8" }, { id: "kw__15", name: "\u65E5\u672C\u516C\u4FE1\u699C", bangid: "15" }, { id: "kw__151", name: "\u817E\u8BAF\u97F3\u4E50\u4EBA\u539F\u521B\u699C", bangid: "151" }];
      leaderboard_default = {
        list: [
          {
            id: "kwbiaosb",
            name: "\u98D9\u5347\u699C",
            bangid: 93
          },
          {
            id: "kwregb",
            name: "\u70ED\u6B4C\u699C",
            bangid: 16
          },
          {
            id: "kwhuiyb",
            name: "\u4F1A\u5458\u699C",
            bangid: 145
          },
          {
            id: "kwdouyb",
            name: "\u6296\u97F3\u699C",
            bangid: 158
          },
          {
            id: "kwqsb",
            name: "\u8D8B\u52BF\u699C",
            bangid: 187
          },
          {
            id: "kwhuaijb",
            name: "\u6000\u65E7\u699C",
            bangid: 26
          },
          {
            id: "kwhuayb",
            name: "\u534E\u8BED\u699C",
            bangid: 104
          },
          {
            id: "kwyueyb",
            name: "\u7CA4\u8BED\u699C",
            bangid: 182
          },
          {
            id: "kwoumb",
            name: "\u6B27\u7F8E\u699C",
            bangid: 22
          },
          {
            id: "kwhanyb",
            name: "\u97E9\u8BED\u699C",
            bangid: 184
          },
          {
            id: "kwriyb",
            name: "\u65E5\u8BED\u699C",
            bangid: 183
          }
        ],
        getUrl: (p, l, id) => `http://kbangserver.kuwo.cn/ksong.s?from=pc&fmt=json&pn=${p - 1}&rn=${l}&type=bang&data=content&id=${id}&show_copyright_off=0&pcmp4=1&isbang=1`,
        regExps: {},
        limit: 100,
        _requestBoardsObj: null,
        getBoardsData() {
          if (this._requestBoardsObj) this._requestBoardsObj.cancelHttp();
          this._requestBoardsObj = httpFetch("http://qukudata.kuwo.cn/q.k?op=query&cont=tree&node=2&pn=0&rn=1000&fmt=json&level=2");
          return this._requestBoardsObj.promise;
        },
        getData(url) {
          const requestDataObj = httpFetch(url);
          return requestDataObj.promise;
        },
        filterData(rawList) {
          return rawList.map((item, inedx) => {
            let formats = item.formats.split("|");
            let types = [];
            let _types = {};
            if (formats.includes("MP3128")) {
              types.push({ type: "128k", size: null });
              _types["128k"] = {
                size: null
              };
            }
            if (formats.includes("MP3H")) {
              types.push({ type: "320k", size: null });
              _types["320k"] = {
                size: null
              };
            }
            if (formats.includes("ALFLAC")) {
              types.push({ type: "flac", size: null });
              _types.flac = {
                size: null
              };
            }
            if (formats.includes("HIRFLAC")) {
              types.push({ type: "flac24bit", size: null });
              _types.flac24bit = {
                size: null
              };
            }
            return {
              singer: formatSinger(decodeName(item.artist)),
              name: decodeName(item.name),
              albumName: decodeName(item.album),
              albumId: item.albumid,
              songmid: item.id,
              source: "kw",
              interval: formatPlayTime(parseInt(item.song_duration)),
              img: item.pic,
              lrc: null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        filterBoardsData(rawList) {
          let list = [];
          for (const board of rawList) {
            if (board.source != "1") continue;
            list.push({
              id: "kw__" + board.sourceid,
              name: board.name,
              bangid: String(board.sourceid)
            });
          }
          return list;
        },
        async getBoards(retryNum = 0) {
          this.list = boardList;
          return {
            list: boardList,
            source: "kw"
          };
        },
        getList(id, page, retryNum = 0) {
          if (++retryNum > 3) return Promise.reject(new Error("try max num"));
          return this.getData(this.getUrl(page, this.limit, id)).then(({ statusCode, body }) => {
            if (statusCode !== 200 || !body.musiclist) return this.getList(id, page, retryNum);
            let total = parseInt(body.num);
            let list = this.filterData(body.musiclist);
            return {
              total,
              list,
              limit: this.limit,
              page,
              source: "kw"
            };
          });
        }
        // getDetailPageUrl(id) {
        //   return `http://www.kuwo.cn/rankList/${id}`
        // },
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/lyric.js
  var buf_key2, buf_key_len2, buildParams, timeExp, existTimeExp, lyric_default;
  var init_lyric = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/lyric.js"() {
      init_request();
      init_util();
      init_utils();
      buf_key2 = Buffer.from("yeelion");
      buf_key_len2 = buf_key2.length;
      buildParams = (id, isGetLyricx) => {
        let params = `user=12345,web,web,web&requester=localhost&req=1&rid=MUSIC_${id}`;
        if (isGetLyricx) params += "&lrcx=1";
        const buf_str = Buffer.from(params);
        const buf_str_len = buf_str.length;
        const output = new Uint16Array(buf_str_len);
        let i = 0;
        while (i < buf_str_len) {
          let j = 0;
          while (j < buf_key_len2 && i < buf_str_len) {
            output[i] = buf_key2[j] ^ buf_str[i];
            i++;
            j++;
          }
        }
        return Buffer.from(output).toString("base64");
      };
      timeExp = /^\[([\d:.]*)\]{1}/g;
      existTimeExp = /\[\d{1,2}:.*\d{1,4}\]/;
      lyric_default = {
        /* sortLrcArr(arr) {
            const lrcSet = new Set()
            let lrc = []
            let lrcT = []
            let markIndex = []
            for (const item of arr) {
              if (lrcSet.has(item.time)) {
                if (lrc.length < 2) continue
                const index = lrc.findIndex(l => l.time == item.time)
                markIndex.push(index)
                if (index == lrc.length - 1) {
                  lrcT.push({ ...lrc[index], time: item.time })
                  lrc.push(item)
                } else {
                  lrcT.push({ ...lrc[index], time: lrc[index + 1].time })
                  if (item.text) {
                    //   const lastIndex = lrc.length - 1
                    //   markIndex.push(lastIndex)
                    //   lrcT.push({ ...lrc[lastIndex], time: lrc[lastIndex - 1].time })
                    lrc.push(item)
                  }
                }
              } else {
                lrc.push(item)
                lrcSet.add(item.time)
              }
            }
        
            // console.log(markIndex)
            markIndex = Array.from(new Set(markIndex))
            for (let index = markIndex.length - 1; index >= 0; index--) {
              lrc.splice(markIndex[index], 1)
            }
        
            // if (lrcT.length) {
            //   if (lrc.length * 0.4 < lrcT.length) { // 翻译数量需大于歌词数量的0.4倍，否则认为没有翻译
            //     const tItem = lrc.pop()
            //     tItem.time = lrc[lrc.length - 1].time
            //     lrcT.push(tItem)
            //   } else {
            //     lrc = arr
            //     lrcT = []
            //   }
            // }
        
            console.log(lrc, lrcT)
        
            return {
              lrc,
              lrcT,
            }
          }, */
        sortLrcArr(arr) {
          const lrcSet = /* @__PURE__ */ new Set();
          let lrc = [];
          let lrcT = [];
          for (const item of arr) {
            if (lrcSet.has(item.time)) {
              if (lrc.length < 2) continue;
              const tItem = lrc.pop();
              tItem.time = lrc[lrc.length - 1].time;
              lrcT.push(tItem);
              lrc.push(item);
            } else {
              lrc.push(item);
              lrcSet.add(item.time);
            }
          }
          if (lrcT.length > lrc.length * 0.3) {
            throw new Error("failed");
          }
          return {
            lrc,
            lrcT
          };
        },
        transformLrc(tags, lrclist) {
          return `${tags.join("\n")}
${lrclist ? lrclist.map((l) => `[${l.time}]${l.text}
`).join("") : "\u6682\u65E0\u6B4C\u8BCD"}`;
        },
        parseLrc(lrc) {
          const lines = lrc.split(/\r\n|\r|\n/);
          let tags = [];
          let lrcArr = [];
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            let result = timeExp.exec(line);
            if (result) {
              const text = line.replace(timeExp, "").trim();
              let time = result[1];
              if (/\.\d\d$/.test(time)) time += "0";
              lrcArr.push({
                time,
                text
              });
            } else if (lrcTools.rxps.tagLine.test(line)) {
              tags.push(line);
            }
          }
          const lrcInfo = this.sortLrcArr(lrcArr);
          return {
            lyric: decodeName(this.transformLrc(tags, lrcInfo.lrc)),
            tlyric: lrcInfo.lrcT.length ? decodeName(this.transformLrc(tags, lrcInfo.lrcT)) : ""
          };
        },
        // getLyric2(musicInfo, isGetLyricx = true) {
        //   const requestObj = httpFetch(`http://newlyric.kuwo.cn/newlyric.lrc?${buildParams(musicInfo.songmid, isGetLyricx)}`)
        //   requestObj.promise = requestObj.promise.then(({ statusCode, body, raw }) => {
        //     if (statusCode != 200) return Promise.reject(new Error(JSON.stringify(body)))
        //     return decodeLyric({ lrcBase64: raw.toString('base64'), isGetLyricx }).then(base64Data => {
        //       let lrcInfo
        //       console.log(Buffer.from(base64Data, 'base64').toString())
        //       try {
        //         lrcInfo = this.parseLrc(Buffer.from(base64Data, 'base64').toString())
        //       } catch {
        //         return Promise.reject(new Error('Get lyric failed'))
        //       }
        //       if (lrcInfo.tlyric) lrcInfo.tlyric = lrcInfo.tlyric.replace(lrcTools.rxps.wordTimeAll, '')
        //       lrcInfo.lxlyric = lrcTools.parse(lrcInfo.lyric)
        //       // console.log(lrcInfo.lyric)
        //       // console.log(lrcInfo.tlyric)
        //       // console.log(lrcInfo.lxlyric)
        //       // console.log(JSON.stringify(lrcInfo))
        //     })
        //   })
        //   return requestObj
        // },
        getLyric(musicInfo, isGetLyricx = true) {
          const requestObj = httpFetch(`http://newlyric.kuwo.cn/newlyric.lrc?${buildParams(musicInfo.songmid, isGetLyricx)}`, {
            cache: false,
            binary: true
          });
          requestObj.promise = requestObj.promise.then(({ statusCode, body }) => {
            if (statusCode != 200) return Promise.reject(new Error(JSON.stringify(body)));
            return decodeLyric_default({ lrcBuffer: body, isGetLyricx }).then((base64Data) => {
              let lrcInfo;
              try {
                lrcInfo = this.parseLrc(Buffer.from(base64Data, "base64").toString());
              } catch (err2) {
                return Promise.reject(new Error("Get lyric failed"));
              }
              if (lrcInfo.tlyric) lrcInfo.tlyric = lrcInfo.tlyric.replace(lrcTools.rxps.wordTimeAll, "");
              try {
                lrcInfo.lxlyric = lrcTools.parse(lrcInfo.lyric);
              } catch {
                lrcInfo.lxlyric = "";
              }
              lrcInfo.lyric = lrcInfo.lyric.replace(lrcTools.rxps.wordTimeAll, "");
              if (!existTimeExp.test(lrcInfo.lyric)) return Promise.reject(new Error("Get lyric failed"));
              return lrcInfo;
            });
          });
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/pic.js
  var pic_default;
  var init_pic = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/pic.js"() {
      init_request();
      pic_default = {
        getPic({ songmid }) {
          const requestObj = httpFetch(`http://artistpicserver.kuwo.cn/pic.web?corp=kuwo&type=rid_pic&pictype=500&size=500&rid=${songmid}`);
          requestObj.promise = requestObj.promise.then(({ body }) => /^http/.test(body) ? body : null);
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/api-source.js
  var supportQuality, apis;
  var init_api_source = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/api-source.js"() {
      supportQuality = {};
      apis = (source) => {
        const activeApi = globalThis.__lx_active_api__();
        if (activeApi.startsWith("user_api")) {
          return {
            getMusicUrl(songInfo, type) {
              return {
                promise: globalThis.__lx_user_api_call__("musicUrl", { source, type, musicInfo: songInfo }).then((data) => ({ type, url: data.url }))
              };
            },
            getLyric(songInfo) {
              return {
                promise: globalThis.__lx_user_api_call__("lyric", { source, musicInfo: songInfo })
              };
            },
            getPic(songInfo) {
              return {
                promise: globalThis.__lx_user_api_call__("pic", { source, musicInfo: songInfo })
              };
            }
          };
        }
        throw new Error("Api is not found");
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/album.js
  var album_default;
  var init_album = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/album.js"() {
      init_request();
      init_utils();
      init_util();
      album_default = {
        limit_list: 36,
        limit_song: 1e3,
        filterListDetail(rawList, albumName, albumId) {
          return rawList.map((item, inedx) => {
            let formats = item.formats.split("|");
            let types = [];
            let _types = {};
            if (formats.includes("MP3128")) {
              types.push({ type: "128k", size: null });
              _types["128k"] = {
                size: null
              };
            }
            if (formats.includes("MP3H")) {
              types.push({ type: "320k", size: null });
              _types["320k"] = {
                size: null
              };
            }
            if (formats.includes("ALFLAC")) {
              types.push({ type: "flac", size: null });
              _types.flac = {
                size: null
              };
            }
            if (formats.includes("HIRFLAC")) {
              types.push({ type: "flac24bit", size: null });
              _types.flac24bit = {
                size: null
              };
            }
            return {
              singer: formatSinger(decodeName(item.artist)),
              name: decodeName(item.name),
              albumName,
              albumId,
              songmid: item.id,
              source: "kw",
              interval: null,
              img: item.pic,
              lrc: null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        /**
         * 格式化播放数量
         * @param {*} num
         */
        formatPlayCount(num) {
          if (num > 1e8) return parseInt(num / 1e7) / 10 + "\u4EBF";
          if (num > 1e4) return parseInt(num / 1e3) / 10 + "\u4E07";
          return num;
        },
        getAlbumListDetail(id, page, retryNum = 0) {
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          const requestObj_listDetail = httpFetch(`http://search.kuwo.cn/r.s?pn=${page - 1}&rn=${this.limit_song}&stype=albuminfo&albumid=${id}&show_copyright_off=0&encoding=utf&vipver=MUSIC_9.1.0`);
          return requestObj_listDetail.promise.then(({ statusCode, body }) => {
            if (statusCode !== 200) return this.getAlbumListDetail(id, page, ++retryNum);
            body = objStr2JSON(body);
            if (!body.musiclist) return this.getAlbumListDetail(id, page, ++retryNum);
            body.name = decodeName(body.name);
            return {
              list: this.filterListDetail(body.musiclist, body.name, body.albumid),
              page,
              limit: this.limit_song,
              total: parseInt(body.songnum),
              source: "kw",
              info: {
                name: body.name,
                img: body.img || body.hts_img,
                desc: decodeName(body.info),
                author: decodeName(body.artist)
                // play_count: this.formatPlayCount(body.playnum),
              }
            };
          });
        }
        // getAlbumListDetail(id, page, retryNum = 0) {
        //   if (retryNum > 2) return Promise.reject(new Error('try max num'))
        //   return tokenRequest(`http://www.kuwo.cn/api/www/album/albumInfo?albumId=${id}&pn=${page}&rn=${this.limit_song}&httpsStatus=1`).then((resp) => {
        //     return resp.promise.then(({ statusCode, body }) => {
        //       console.log(body)
        //       return Promise.reject(new Error('failed'))
        //       // if (statusCode !== 200) return this.getAlbumListDetail(id, page, ++retryNum)
        //       // const data = body.data
        //       // console.log(data)
        //       // if (!data.musicList) return this.getAlbumListDetail(id, page, ++retryNum)
        //       // return {
        //       //   list: this.filterListDetail(data.musiclist),
        //       //   page,
        //       //   limit: this.limit_song,
        //       //   total: data.total,
        //       //   source: 'kw',
        //       //   info: {
        //       //     name: data.album,
        //       //     img: data.pic,
        //       //     desc: data.albuminfo,
        //       //     author: data.artist,
        //       //     play_count: this.formatPlayCount(data.playCnt),
        //       //   },
        //       // }
        //     })
        //   })
        // },
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/songList.js
  var songList_default;
  var init_songList = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/songList.js"() {
      init_request();
      init_utils();
      init_util();
      init_album();
      songList_default = {
        _requestObj_tags: null,
        _requestObj_hotTags: null,
        _requestObj_list: null,
        limit_list: 36,
        limit_song: 1e3,
        successCode: 200,
        sortList: [
          {
            name: "\u6700\u65B0",
            tid: "new",
            id: "new"
          },
          {
            name: "\u6700\u70ED",
            tid: "hot",
            id: "hot"
          }
        ],
        regExps: {
          mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
          // http://www.kuwo.cn/playlist_detail/2886046289
          // https://m.kuwo.cn/h5app/playlist/2736267853?t=qqfriend
          listDetailLink: /^.+\/playlist(?:_detail)?\/(\d+)(?:\?.*|&.*$|#.*$|$)/
        },
        tagsUrl: "http://wapi.kuwo.cn/api/pc/classify/playlist/getTagList?cmd=rcm_keyword_playlist&user=0&prod=kwplayer_pc_9.0.5.0&vipver=9.0.5.0&source=kwplayer_pc_9.0.5.0&loginUid=0&loginSid=0&appUid=76039576",
        hotTagUrl: "http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmTagList?loginUid=0&loginSid=0&appUid=76039576",
        getListUrl({ sortId, id, type, page }) {
          if (!id) return `http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?loginUid=0&loginSid=0&appUid=76039576&&pn=${page}&rn=${this.limit_list}&order=${sortId}`;
          switch (type) {
            case "10000":
              return `http://wapi.kuwo.cn/api/pc/classify/playlist/getTagPlayList?loginUid=0&loginSid=0&appUid=76039576&pn=${page}&id=${id}&rn=${this.limit_list}`;
            case "43":
              return `http://mobileinterfaces.kuwo.cn/er.s?type=get_pc_qz_data&f=web&id=${id}&prod=pc`;
          }
        },
        getListDetailUrl(id, page) {
          return `http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${id}&pn=${page - 1}&rn=${this.limit_song}&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1`;
        },
        // http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=2849349915&pn=0&rn=100&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1
        // 获取标签
        getTag(tryNum = 0) {
          if (this._requestObj_tags) this._requestObj_tags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_tags = httpFetch(this.tagsUrl);
          return this._requestObj_tags.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getTag(++tryNum);
            return this.filterTagInfo(body.data);
          });
        },
        // 获取标签
        getHotTag(tryNum = 0) {
          if (this._requestObj_hotTags) this._requestObj_hotTags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_hotTags = httpFetch(this.hotTagUrl);
          return this._requestObj_hotTags.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getHotTag(++tryNum);
            return this.filterInfoHotTag(body.data[0].data);
          });
        },
        filterInfoHotTag(rawList) {
          return rawList.map((item) => ({
            id: `${item.id}-${item.digest}`,
            name: item.name,
            source: "kw"
          }));
        },
        filterTagInfo(rawList) {
          return rawList.map((type) => ({
            name: type.name,
            list: type.data.map((item) => ({
              parent_id: type.id,
              parent_name: type.name,
              id: `${item.id}-${item.digest}`,
              name: item.name,
              source: "kw"
            }))
          }));
        },
        // 获取列表数据
        getList(sortId, tagId, page, tryNum = 0) {
          if (this._requestObj_list) this._requestObj_list.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          let id;
          let type;
          if (tagId) {
            let arr = tagId.split("-");
            id = arr[0];
            type = arr[1];
          } else {
            id = null;
          }
          this._requestObj_list = httpFetch(this.getListUrl({ sortId, id, type, page }));
          return this._requestObj_list.promise.then(({ body }) => {
            if (!id || type == "10000") {
              if (body.code !== this.successCode) return this.getList(sortId, tagId, page, ++tryNum);
              return {
                list: this.filterList(body.data.data),
                total: body.data.total,
                page: body.data.pn,
                limit: body.data.rn,
                source: "kw"
              };
            } else if (!body.length) {
              return this.getList(sortId, tagId, page, ++tryNum);
            }
            return {
              list: this.filterList2(body),
              total: 1e3,
              page,
              limit: 1e3,
              source: "kw"
            };
          });
        },
        /**
         * 格式化播放数量
         * @param {*} num
         */
        formatPlayCount(num) {
          if (num > 1e8) return parseInt(num / 1e7) / 10 + "\u4EBF";
          if (num > 1e4) return parseInt(num / 1e3) / 10 + "\u4E07";
          return num;
        },
        filterList(rawData) {
          return rawData.map((item) => ({
            play_count: this.formatPlayCount(item.listencnt),
            id: `digest-${item.digest}__${item.id}`,
            author: item.uname,
            name: item.name,
            // time: item.publish_time,
            total: item.total,
            img: item.img,
            grade: item.favorcnt / 10,
            desc: item.desc,
            source: "kw"
          }));
        },
        filterList2(rawData) {
          const list = [];
          rawData.forEach((item) => {
            if (!item.label) return;
            list.push(...item.list.map((item2) => ({
              play_count: item2.play_count && this.formatPlayCount(item2.listencnt),
              id: `digest-${item2.digest}__${item2.id}`,
              author: item2.uname,
              name: item2.name,
              total: item2.total,
              // time: item.publish_time,
              img: item2.img,
              grade: item2.favorcnt && item2.favorcnt / 10,
              desc: item2.desc,
              source: "kw"
            })));
          });
          return list;
        },
        getListDetailDigest8(id, page, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          const requestObj = httpFetch(this.getListDetailUrl(id, page));
          return requestObj.promise.then(({ body }) => {
            if (body.result !== "ok") return this.getListDetail(id, page, ++tryNum);
            return {
              list: this.filterListDetail(body.musiclist),
              page,
              limit: body.rn,
              total: body.total,
              source: "kw",
              info: {
                name: body.title,
                img: body.pic,
                desc: body.info,
                author: body.uname,
                play_count: this.formatPlayCount(body.playnum)
              }
            };
          });
        },
        getListDetailDigest5Info(id, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          const requestObj = httpFetch(`http://qukudata.kuwo.cn/q.k?op=query&cont=ninfo&node=${id}&pn=0&rn=1&fmt=json&src=mbox&level=2`);
          return requestObj.promise.then(({ statusCode, body }) => {
            if (statusCode != 200 || !body.child) return this.getListDetail(id, ++tryNum);
            return body.child.length ? body.child[0].sourceid : null;
          });
        },
        getListDetailDigest5Music(id, page, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          const requestObj = httpFetch(`http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${id}&pn=${page - 1}}&rn=${this.limit_song}&encode=utf-8&keyset=pl2012&identity=kuwo&pcmp4=1`);
          return requestObj.promise.then(({ body }) => {
            if (body.result !== "ok") return this.getListDetail(id, page, ++tryNum);
            return {
              list: this.filterListDetail(body.musiclist),
              page,
              limit: body.rn,
              total: body.total,
              source: "kw",
              info: {
                name: body.title,
                img: body.pic,
                desc: body.info,
                author: body.uname,
                play_count: this.formatPlayCount(body.playnum)
              }
            };
          });
        },
        async getListDetailDigest5(id, page, retryNum) {
          const detailId = await this.getListDetailDigest5Info(id, retryNum);
          return this.getListDetailDigest5Music(detailId, page, retryNum);
        },
        filterBDListDetail(rawList) {
          return rawList.map((item) => {
            let types = [];
            let _types = {};
            for (let info of item.audios) {
              info.size = info.size?.toLocaleUpperCase();
              switch (info.bitrate) {
                case "4000":
                  types.push({ type: "flac24bit", size: info.size });
                  _types.flac24bit = {
                    size: info.size
                  };
                  break;
                case "2000":
                  types.push({ type: "flac", size: info.size });
                  _types.flac = {
                    size: info.size
                  };
                  break;
                case "320":
                  types.push({ type: "320k", size: info.size });
                  _types["320k"] = {
                    size: info.size
                  };
                  break;
                case "192":
                case "128":
                  types.push({ type: "128k", size: info.size });
                  _types["128k"] = {
                    size: info.size
                  };
                  break;
              }
            }
            types.reverse();
            return {
              singer: item.artists.map((s) => s.name).join("\u3001"),
              name: item.name,
              albumName: item.album,
              albumId: item.albumId,
              songmid: item.id,
              source: "kw",
              interval: formatPlayTime(item.duration),
              img: item.albumPic,
              releaseDate: item.releaseDate,
              lrc: null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        getReqId() {
          function t() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
          }
          return t() + t() + t() + t() + t() + t() + t() + t();
        },
        async getListDetailMusicListByBDListInfo(id, source) {
          const { body: infoData } = await httpFetch(`https://bd-api.kuwo.cn/api/service/playlist/info/${id}?reqId=${this.getReqId()}&source=${source}`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
              plat: "h5"
            }
          }).promise.catch(() => ({ code: 0 }));
          if (infoData.code != 200) return null;
          return {
            name: infoData.data.name,
            img: infoData.data.pic,
            desc: infoData.data.description,
            author: infoData.data.creatorName,
            play_count: infoData.data.playNum
          };
        },
        async getListDetailMusicListByBDUserPub(id) {
          const { body: infoData } = await httpFetch(`https://bd-api.kuwo.cn/api/ucenter/users/pub/${id}?reqId=${this.getReqId()}`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
              plat: "h5"
            }
          }).promise.catch(() => ({ code: 0 }));
          if (infoData.code != 200) return null;
          return {
            name: infoData.data.userInfo.nickname + "\u559C\u6B22\u7684\u97F3\u4E50",
            img: infoData.data.userInfo.headImg,
            desc: "",
            author: infoData.data.userInfo.nickname,
            play_count: ""
          };
        },
        async getListDetailMusicListByBDList(id, source, page, tryNum = 0) {
          const { body: listData } = await httpFetch(`https://bd-api.kuwo.cn/api/service/playlist/${id}/musicList?reqId=${this.getReqId()}&source=${source}&pn=${page}&rn=${this.limit_song}`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
              plat: "h5"
            }
          }).promise.catch(() => {
            if (tryNum > 2) return Promise.reject(new Error("try max num"));
            return this.getListDetailMusicListByBDList(id, source, page, ++tryNum);
          });
          if (listData.code !== 200) return Promise.reject(new Error("failed"));
          return {
            list: this.filterBDListDetail(listData.data.list),
            page,
            limit: listData.data.pageSize,
            total: listData.data.total,
            source: "kw"
          };
        },
        async getListDetailMusicListByBD(id, page) {
          const uid = /uid=(\d+)/.exec(id)?.[1];
          const listId = /playlistId=(\d+)/.exec(id)?.[1];
          const source = /source=(\d+)/.exec(id)?.[1];
          if (!listId) return Promise.reject(new Error("failed"));
          const task = [this.getListDetailMusicListByBDList(listId, source, page)];
          switch (source) {
            case "4":
              task.push(this.getListDetailMusicListByBDListInfo(listId, source));
              break;
            case "5":
              task.push(this.getListDetailMusicListByBDUserPub(uid ?? listId));
              break;
          }
          const [listData, info] = await Promise.all(task);
          listData.info = info ?? {
            name: "",
            img: "",
            desc: "",
            author: "",
            play_count: ""
          };
          return listData;
        },
        // 获取歌曲列表内的音乐
        getListDetail(id, page, retryNum = 0) {
          if (/\/bodian\//.test(id)) return this.getListDetailMusicListByBD(id, page);
          if (/[?&:/]/.test(id)) id = id.replace(this.regExps.listDetailLink, "$1");
          else if (/^digest-/.test(id)) {
            let [digest, _id] = id.split("__");
            digest = digest.replace("digest-", "");
            id = _id;
            switch (digest) {
              case "8":
                break;
              case "13":
                return album_default.getAlbumListDetail(id, page, retryNum);
              case "5":
              default:
                return this.getListDetailDigest5(id, page, retryNum);
            }
          }
          return this.getListDetailDigest8(id, page, retryNum);
        },
        filterListDetail(rawData) {
          return rawData.map((item) => {
            let infoArr = item.N_MINFO.split(";");
            let types = [];
            let _types = {};
            for (let info of infoArr) {
              info = info.match(this.regExps.mInfo);
              if (info) {
                switch (info[2]) {
                  case "4000":
                    types.push({ type: "flac24bit", size: info[4] });
                    _types.flac24bit = {
                      size: info[4].toLocaleUpperCase()
                    };
                    break;
                  case "2000":
                    types.push({ type: "flac", size: info[4] });
                    _types.flac = {
                      size: info[4].toLocaleUpperCase()
                    };
                    break;
                  case "320":
                    types.push({ type: "320k", size: info[4] });
                    _types["320k"] = {
                      size: info[4].toLocaleUpperCase()
                    };
                    break;
                  case "192":
                  case "128":
                    types.push({ type: "128k", size: info[4] });
                    _types["128k"] = {
                      size: info[4].toLocaleUpperCase()
                    };
                    break;
                }
              }
            }
            types.reverse();
            return {
              singer: formatSinger(decodeName(item.artist)),
              name: decodeName(item.name),
              albumName: decodeName(item.album),
              albumId: item.albumid,
              songmid: item.id,
              source: "kw",
              interval: formatPlayTime(parseInt(item.duration)),
              img: null,
              lrc: null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        getTags() {
          return Promise.all([this.getTag(), this.getHotTag()]).then(([tags, hotTag]) => ({ tags, hotTag, source: "kw" }));
        },
        getDetailPageUrl(id) {
          if (/[?&:/]/.test(id)) id = id.replace(this.regExps.listDetailLink, "$1");
          else if (/^digest-/.test(id)) {
            let result = id.split("__");
            id = result[1];
          }
          return `http://www.kuwo.cn/playlist_detail/${id}`;
        },
        search(text, page, limit = 20) {
          return httpFetch(`http://search.kuwo.cn/r.s?all=${encodeURIComponent(text)}&pn=${page - 1}&rn=${limit}&rformat=json&encoding=utf8&ver=mbox&vipver=MUSIC_8.7.7.0_BCS37&plat=pc&devid=28156413&ft=playlist&pay=0&needliveshow=0`).promise.then(({ body }) => {
            body = objStr2JSON(body);
            return {
              list: body.abslist.map((item) => {
                return {
                  play_count: this.formatPlayCount(item.playcnt),
                  id: item.playlistid,
                  author: decodeName(item.nickname),
                  name: decodeName(item.name),
                  total: item.songnum,
                  // time: item.publish_time,
                  img: item.pic,
                  desc: decodeName(item.intro),
                  source: "kw"
                };
              }),
              limit,
              total: parseInt(body.TOTAL),
              source: "kw"
            };
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/hotSearch.js
  var hotSearch_default;
  var init_hotSearch = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/hotSearch.js"() {
      init_request();
      hotSearch_default = {
        _requestObj: null,
        async getList(retryNum = 0) {
          if (this._requestObj) this._requestObj.cancelHttp();
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          const _requestObj = httpFetch("http://hotword.kuwo.cn/hotword.s?prod=kwplayer_ar_9.3.0.1&corp=kuwo&newver=2&vipver=9.3.0.1&source=kwplayer_ar_9.3.0.1_40.apk&p2p=1&notrace=0&uid=0&plat=kwplayer_ar&rformat=json&encoding=utf8&tabid=1", {
            headers: {
              "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9;)"
            }
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.status !== "ok") throw new Error("\u83B7\u53D6\u70ED\u641C\u8BCD\u5931\u8D25");
          return { source: "kw", list: this.filterList(body.tagvalue) };
        },
        filterList(rawList) {
          return rawList.map((item) => item.key);
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/comment.js
  var comment_default;
  var init_comment = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/comment.js"() {
      init_request();
      init_utils();
      comment_default = {
        _requestObj: null,
        _requestObj2: null,
        async getComment({ songmid }, page = 1, limit = 20) {
          if (this._requestObj) this._requestObj.cancelHttp();
          const _requestObj = httpFetch(`http://comment.kuwo.cn/com.s?type=get_comment&uid=0&digest=15&sid=${songmid}&page=${page}&rows=${limit}&f=web&prod=MUSIC_8.7.7.0_BCS37&devid=28556413`, {
            headers: {
              "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9;)"
            }
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.result !== "ok") throw new Error("\u83B7\u53D6\u8BC4\u8BBA\u5931\u8D25");
          return { source: "kw", comments: this.filterComment(body.rows), total: body.total, page, limit, maxPage: Math.ceil(body.total / limit) || 1 };
        },
        async getHotComment({ songmid }, page = 1, limit = 100) {
          if (this._requestObj2) this._requestObj2.cancelHttp();
          const _requestObj2 = httpFetch(`http://comment.kuwo.cn/com.s?type=get_rec_comment&uid=0&digest=15&sid=${songmid}&page=${page}&rows=${limit}&f=web&prod=MUSIC_8.7.7.0_BCS37&devid=28556413`, {
            headers: {
              "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9;)"
            }
          });
          const { body, statusCode } = await _requestObj2.promise;
          if (statusCode != 200 || body.result !== "ok") throw new Error("\u83B7\u53D6\u70ED\u95E8\u8BC4\u8BBA\u5931\u8D25");
          return { source: "kw", comments: this.filterComment(body.rows), total: body.total, page, limit, maxPage: Math.ceil(body.total / limit) || 1 };
        },
        filterComment(rawList) {
          if (!rawList) return [];
          return rawList.map((item) => {
            let data = {
              id: item.id,
              text: item.msg.split("\n"),
              time: item.time,
              timeStr: dateFormat2(new Date(item.time).getTime()),
              userName: decodeURIComponent(item.u_name),
              avatar: item.u_pic,
              userId: item.u_id,
              likedCount: item.like_num,
              reply: []
            };
            return item.reply ? {
              id: item.id,
              rootId: item.reply.id,
              text: item.reply.msg.split("\n"),
              time: item.reply.time,
              timeStr: dateFormat2(new Date(item.reply.time).getTime()),
              userName: decodeURIComponent(item.reply.u_name),
              avatar: item.reply.u_pic,
              userId: item.reply.u_id,
              likedCount: item.reply.like_num,
              reply: [data]
            } : data;
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/index.js
  var kw, kw_default;
  var init_kw = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kw/index.js"() {
      init_request();
      init_tempSearch();
      init_musicSearch();
      init_util();
      init_leaderboard();
      init_lyric();
      init_pic();
      init_api_source();
      init_songList();
      init_hotSearch();
      init_comment();
      kw = {
        _musicInfoRequestObj: null,
        _musicInfoPromiseCancelFn: null,
        _musicPicRequestObj: null,
        _musicPicPromiseCancelFn: null,
        // context: null,
        // init(context) {
        //   if (this.isInited) return
        //   this.isInited = true
        //   this.context = context
        //   // this.musicSearch.search('我又想你了').then(res => {
        //   //   console.log(res)
        //   // })
        //   // this.getMusicUrl('62355680', '320k').then(url => {
        //   //   console.log(url)
        //   // })
        // },
        tempSearch: tempSearch_default,
        musicSearch: musicSearch_default,
        leaderboard: leaderboard_default,
        songList: songList_default,
        hotSearch: hotSearch_default,
        comment: comment_default,
        getLyric(songInfo, isGetLyricx) {
          return lyric_default.getLyric(songInfo, isGetLyricx);
        },
        handleMusicInfo(songInfo) {
          return this.getMusicInfo(songInfo).then((info) => {
            songInfo.name = info.name;
            songInfo.singer = formatSinger(info.artist);
            songInfo.img = info.pic;
            songInfo.albumName = info.album;
            return songInfo;
          });
        },
        getMusicUrl(songInfo, type) {
          return apis("kw").getMusicUrl(songInfo, type);
        },
        getMusicInfo(songInfo) {
          if (this._musicInfoRequestObj) this._musicInfoRequestObj.cancelHttp();
          this._musicInfoRequestObj = httpFetch(`http://www.kuwo.cn/api/www/music/musicInfo?mid=${songInfo.songmid}`);
          return this._musicInfoRequestObj.promise.then(({ body }) => {
            return body.code === 200 ? body.data : Promise.reject(new Error(body.msg));
          });
        },
        getMusicUrls(musicInfo, cb) {
          let tasks = [];
          let songId = musicInfo.songmid;
          musicInfo.types.forEach((type) => {
            tasks.push(kw.getMusicUrl(songId, type.type).promise);
          });
          Promise.all(tasks).then((urlInfo) => {
            let typeUrl = {};
            urlInfo.forEach((info) => {
              typeUrl[info.type] = info.url;
            });
            cb(typeUrl);
          });
        },
        getPic(songInfo) {
          return pic_default.getPic(songInfo);
        },
        getMusicDetailPageUrl(songInfo) {
          return `http://www.kuwo.cn/play_detail/${songInfo.songmid}`;
        },
        init() {
          return getToken();
        }
      };
      kw_default = kw;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/leaderboard.js
  var boardList2, leaderboard_default2;
  var init_leaderboard2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/leaderboard.js"() {
      init_request();
      init_utils();
      boardList2 = [{ id: "kg__8888", name: "\u9177\u72D7TOP500", bangid: "8888" }, { id: "kg__6666", name: "\u9177\u72D7\u98D9\u5347\u699C", bangid: "6666" }, { id: "kg__37361", name: "\u9177\u72D7\u96F7\u8FBE\u699C", bangid: "37361" }, { id: "kg__23784", name: "\u7F51\u7EDC\u7EA2\u6B4C\u699C", bangid: "23784" }, { id: "kg__24971", name: "DJ\u70ED\u6B4C\u699C", bangid: "24971" }, { id: "kg__35811", name: "\u4F1A\u5458\u4E13\u4EAB\u70ED\u6B4C\u699C", bangid: "35811" }, { id: "kg__31308", name: "\u534E\u8BED\u65B0\u6B4C\u699C", bangid: "31308" }, { id: "kg__31310", name: "\u6B27\u7F8E\u65B0\u6B4C\u699C", bangid: "31310" }, { id: "kg__31311", name: "\u97E9\u56FD\u65B0\u6B4C\u699C", bangid: "31311" }, { id: "kg__31312", name: "\u65E5\u672C\u65B0\u6B4C\u699C", bangid: "31312" }, { id: "kg__31313", name: "\u7CA4\u8BED\u65B0\u6B4C\u699C", bangid: "31313" }, { id: "kg__33162", name: "ACG\u65B0\u6B4C\u699C", bangid: "33162" }, { id: "kg__21101", name: "\u9177\u72D7\u5206\u4EAB\u699C", bangid: "21101" }, { id: "kg__30972", name: "\u817E\u8BAF\u97F3\u4E50\u4EBA\u539F\u521B\u699C", bangid: "30972" }, { id: "kg__22603", name: "5sing\u97F3\u4E50\u699C", bangid: "22603" }, { id: "kg__33160", name: "\u7535\u97F3\u70ED\u6B4C\u699C", bangid: "33160" }, { id: "kg__21335", name: "\u7E41\u661F\u97F3\u4E50\u699C", bangid: "21335" }, { id: "kg__33161", name: "\u53E4\u98CE\u65B0\u6B4C\u699C", bangid: "33161" }, { id: "kg__33163", name: "\u5F71\u89C6\u91D1\u66F2\u699C", bangid: "33163" }, { id: "kg__33166", name: "\u6B27\u7F8E\u91D1\u66F2\u699C", bangid: "33166" }, { id: "kg__33165", name: "\u7CA4\u8BED\u91D1\u66F2\u699C", bangid: "33165" }, { id: "kg__36107", name: "\u5C0F\u8BED\u79CD\u70ED\u6B4C\u699C", bangid: "36107" }, { id: "kg__4681", name: "\u7F8E\u56FDBillBoard\u699C", bangid: "4681" }, { id: "kg__4680", name: "\u82F1\u56FD\u5355\u66F2\u699C", bangid: "4680" }, { id: "kg__4673", name: "\u65E5\u672C\u516C\u4FE1\u699C", bangid: "4673" }, { id: "kg__38623", name: "\u97E9\u56FDMelon\u97F3\u4E50\u699C", bangid: "38623" }, { id: "kg__42807", name: "joox\u672C\u5730\u70ED\u6B4C\u699C", bangid: "42807" }, { id: "kg__42808", name: "\u53F0\u6E7EKKBOX\u98CE\u4E91\u699C", bangid: "42808" }];
      leaderboard_default2 = {
        listDetailLimit: 100,
        list: [
          {
            id: "kgtop500",
            name: "\u9177\u72D7TOP500",
            bangid: "8888"
          },
          {
            id: "kgwlhgb",
            name: "\u7F51\u7EDC\u699C",
            bangid: "23784"
          },
          {
            id: "kgbsb",
            name: "\u98D9\u5347\u699C",
            bangid: "6666"
          },
          {
            id: "kgfxb",
            name: "\u5206\u4EAB\u699C",
            bangid: "21101"
          },
          {
            id: "kgcyyb",
            name: "\u7EAF\u97F3\u4E50\u699C",
            bangid: "33164"
          },
          {
            id: "kggfjqb",
            name: "\u53E4\u98CE\u699C",
            bangid: "33161"
          },
          {
            id: "kgyyjqb",
            name: "\u7CA4\u8BED\u699C",
            bangid: "33165"
          },
          {
            id: "kgomjqb",
            name: "\u6B27\u7F8E\u699C",
            bangid: "33166"
          },
          {
            id: "kgdyrgb",
            name: "\u7535\u97F3\u699C",
            bangid: "33160"
          },
          {
            id: "kgjdrgb",
            name: "DJ\u70ED\u6B4C\u699C",
            bangid: "24971"
          },
          {
            id: "kghyxgb",
            name: "\u534E\u8BED\u65B0\u6B4C\u699C",
            bangid: "31308"
          }
        ],
        getUrl(p, id, limit) {
          return `http://mobilecdnbj.kugou.com/api/v3/rank/song?version=9108&ranktype=1&plat=0&pagesize=${limit}&area_code=1&page=${p}&rankid=${id}&with_res_tag=0&show_portrait_mv=1`;
        },
        regExps: {
          total: /total: '(\d+)',/,
          page: /page: '(\d+)',/,
          limit: /pagesize: '(\d+)',/,
          listData: /global\.features = (\[.+\]);/
        },
        _requestBoardsObj: null,
        getBoardsData() {
          if (this._requestBoardsObj) this._requestBoardsObj.cancelHttp();
          this._requestBoardsObj = httpFetch("http://mobilecdnbj.kugou.com/api/v3/rank/list?version=9108&plat=0&showtype=2&parentid=0&apiver=6&area_code=1&withsong=1");
          return this._requestBoardsObj.promise;
        },
        getData(url) {
          const requestDataObj = httpFetch(url);
          return requestDataObj.promise;
        },
        getSinger(singers) {
          let arr = [];
          singers.forEach((singer) => {
            arr.push(singer.author_name);
          });
          return arr.join("\u3001");
        },
        filterData(rawList) {
          return rawList.map((item) => {
            const types = [];
            const _types = {};
            if (item.filesize !== 0) {
              let size = sizeFormate(item.filesize);
              types.push({ type: "128k", size, hash: item.hash });
              _types["128k"] = {
                size,
                hash: item.hash
              };
            }
            if (item["320filesize"] !== 0) {
              let size = sizeFormate(item["320filesize"]);
              types.push({ type: "320k", size, hash: item["320hash"] });
              _types["320k"] = {
                size,
                hash: item["320hash"]
              };
            }
            if (item.sqfilesize !== 0) {
              let size = sizeFormate(item.sqfilesize);
              types.push({ type: "flac", size, hash: item.sqhash });
              _types.flac = {
                size,
                hash: item.sqhash
              };
            }
            if (item.filesize_high !== 0) {
              let size = sizeFormate(item.filesize_high);
              types.push({ type: "flac24bit", size, hash: item.hash_high });
              _types.flac24bit = {
                size,
                hash: item.hash_high
              };
            }
            return {
              singer: decodeName(this.getSinger(item.authors)),
              name: decodeName(item.songname),
              albumName: decodeName(item.remark),
              albumId: item.album_id,
              songmid: item.audio_id,
              source: "kg",
              interval: formatPlayTime(item.duration),
              img: null,
              lrc: null,
              hash: item.hash,
              otherSource: null,
              // MV hash：用于播放MV/下载MV菜单（mvhash 为空时尝试从 mvdata 中取）
              mv: item.mvhash || (Array.isArray(item.mvdata) && item.mvdata.length > 0 ? item.mvdata[0].hash : null) || null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        filterBoardsData(rawList) {
          let list = [];
          for (const board of rawList) {
            if (board.isvol != 1) continue;
            list.push({
              id: "kg__" + board.rankid,
              name: board.rankname,
              bangid: String(board.rankid)
            });
          }
          return list;
        },
        async getBoards(retryNum = 0) {
          this.list = boardList2;
          return {
            list: boardList2,
            source: "kg"
          };
        },
        async getList(bangid, page, retryNum = 0) {
          if (++retryNum > 3) throw new Error("try max num");
          const { body } = await this.getData(this.getUrl(page, bangid, this.listDetailLimit));
          if (body.errcode != 0) return this.getList(bangid, page, retryNum);
          let total = body.data.total;
          let limit = 100;
          let listData = this.filterData(body.data.info);
          return {
            total,
            list: listData,
            limit,
            page,
            source: "kg"
          };
        },
        getDetailPageUrl(id) {
          if (typeof id == "string") id = id.replace("kg__", "");
          return `https://www.kugou.com/yy/rank/home/1-${id}.html`;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/shims/node-crypto.js
  function createHash(algorithm) {
    if (algorithm !== "md5") throw new Error("Unsupported hash algorithm: " + algorithm);
    let chunks = [];
    return {
      update(data) {
        chunks.push(typeof data === "string" ? stringToUtf8Bytes(data) : Array.from(import_buffer2.Buffer.from(data)));
        return this;
      },
      digest(encoding) {
        const bytes = chunks.length === 1 ? chunks[0] : [].concat(...chunks);
        const hex = globalThis.__lx_native_call__utils_b64md5(import_buffer2.Buffer.from(bytes).toString("base64"));
        if (encoding === "hex" || encoding == null) return hex;
        if (encoding === "base64") return import_buffer2.Buffer.from(hex, "hex").toString("base64");
        return import_buffer2.Buffer.from(hex, "hex");
      }
    };
  }
  function publicEncrypt(options, buffer) {
    if (options.padding !== 3) throw new Error("Unsupported rsa padding: " + options.padding);
    const key = String(options.key).replace(/-----(BEGIN|END) PUBLIC KEY-----/g, "").replace(/\s+/g, "");
    return fromB64(globalThis.__lx_native_call__utils_rsa_encrypt(toB64(buffer), key, "RSA/ECB/NoPadding"));
  }
  function randomBytes(size) {
    const out = new Uint8Array(size);
    for (let i = 0; i < size; i++) out[i] = Math.floor(Math.random() * 256);
    return out;
  }
  var import_buffer2, toB64, fromB64, EMPTY, stringToUtf8Bytes, makeCipher, createCipheriv, createDecipheriv, constants2, node_crypto_default;
  var init_node_crypto = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/shims/node-crypto.js"() {
      import_buffer2 = __toESM(require_buffer());
      toB64 = (data) => {
        if (typeof data === "string") return import_buffer2.Buffer.from(data, "utf8").toString("base64");
        return import_buffer2.Buffer.from(data).toString("base64");
      };
      fromB64 = (b64) => import_buffer2.Buffer.from(b64, "base64");
      EMPTY = import_buffer2.Buffer.alloc(0);
      stringToUtf8Bytes = (inputString) => {
        const bytes = [];
        for (let i = 0; i < inputString.length; i++) {
          const charCode = inputString.charCodeAt(i);
          if (charCode < 128) {
            bytes.push(charCode);
          } else if (charCode < 2048) {
            bytes.push(charCode >> 6 | 192);
            bytes.push(charCode & 63 | 128);
          } else {
            bytes.push(charCode >> 12 | 224);
            bytes.push(charCode >> 6 & 63 | 128);
            bytes.push(charCode & 63 | 128);
          }
        }
        return bytes;
      };
      makeCipher = (decrypt2) => (algorithm, key, iv2) => {
        const mode = algorithm === "aes-128-cbc" ? "AES/CBC/PKCS7Padding" : algorithm === "aes-128-ecb" ? "AES/ECB/PKCS5Padding" : null;
        if (!mode) throw new Error("Unsupported cipher algorithm: " + algorithm);
        const keyB64 = toB64(key);
        const ivB64 = iv2 && iv2.length ? toB64(iv2) : "";
        const call = decrypt2 ? globalThis.__lx_native_call__utils_aes_decrypt : globalThis.__lx_native_call__utils_aes_encrypt;
        let pending = null;
        return {
          update(data) {
            pending = pending ? import_buffer2.Buffer.concat([pending, import_buffer2.Buffer.from(data)]) : import_buffer2.Buffer.from(data);
            return EMPTY;
          },
          final() {
            if (!pending) return EMPTY;
            const out = call(toB64(pending), keyB64, ivB64, mode);
            pending = null;
            return fromB64(out);
          }
        };
      };
      createCipheriv = makeCipher(false);
      createDecipheriv = makeCipher(true);
      constants2 = { RSA_NO_PADDING: 3 };
      node_crypto_default = { createHash, createCipheriv, createDecipheriv, publicEncrypt, randomBytes, constants: constants2 };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/utils.js
  var toMD5;
  var init_utils2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/utils.js"() {
      init_node_crypto();
      toMD5 = (str) => node_crypto_default.createHash("md5").update(str).digest("hex");
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/vendors/infSign.min.js
  var require_infSign_min = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/vendors/infSign.min.js"(exports, module) {
      !function(t, n) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self, t.infSign = n());
      }(exports, function() {
        "use strict";
        function t(t2, n2, r2) {
          return n2 in t2 ? Object.defineProperty(t2, n2, { value: r2, enumerable: true, configurable: true, writable: true }) : t2[n2] = r2, t2;
        }
        function n(t2, n2) {
          var r2 = Object.keys(t2);
          if (Object.getOwnPropertySymbols) {
            var e2 = Object.getOwnPropertySymbols(t2);
            n2 && (e2 = e2.filter(function(n3) {
              return Object.getOwnPropertyDescriptor(t2, n3).enumerable;
            })), r2.push.apply(r2, e2);
          }
          return r2;
        }
        function r(r2) {
          for (var e2 = 1; e2 < arguments.length; e2++) {
            var o2 = null != arguments[e2] ? arguments[e2] : {};
            e2 % 2 ? n(o2, true).forEach(function(n2) {
              t(r2, n2, o2[n2]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r2, Object.getOwnPropertyDescriptors(o2)) : n(o2).forEach(function(t2) {
              Object.defineProperty(r2, t2, Object.getOwnPropertyDescriptor(o2, t2));
            });
          }
          return r2;
        }
        function e(t2, n2) {
          return n2 = { exports: {} }, t2(n2, n2.exports), n2.exports;
        }
        function o(t2) {
          return !!t2.constructor && "function" == typeof t2.constructor.isBuffer && t2.constructor.isBuffer(t2);
        }
        function i(t2) {
          return "function" == typeof t2.readFloatLE && "function" == typeof t2.slice && o(t2.slice(0, 0));
        }
        function c() {
          var t2, n2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i2 = false, c2 = false, a2 = "json", l2 = r({}, n2), u2 = s.isInClient();
          "function" == typeof o2 ? t2 = o2 : (t2 = o2.callback, i2 = o2.useH5 || false, a2 = o2.postType || "json", c2 = o2.isCDN || false), e2 && ("[object Object]" != Object.prototype.toString.call(e2) ? u2 = false : "urlencoded" == a2 && (u2 = false));
          var f2 = function() {
            var n3 = (/* @__PURE__ */ new Date()).getTime(), i3 = [], s2 = [], u3 = "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt", f3 = { srcappid: "2919", clientver: "20000", clienttime: n3, mid: n3, uuid: n3, dfid: "-" };
            c2 && (delete f3.clienttime, delete f3.mid, delete f3.uuid, delete f3.dfid), l2 = r({}, f3, {}, l2);
            for (var g2 in l2) i3.push(g2);
            if (i3.sort(), i3.forEach(function(t3) {
              s2.push(t3 + "=" + l2[t3]);
            }), e2) if ("[object Object]" == Object.prototype.toString.call(e2)) if ("json" == a2) s2.push(JSON.stringify(e2));
            else {
              var b = [];
              for (var g2 in e2) b.push(g2 + "=" + e2[g2]);
              s2.push(b.join("&"));
            }
            else s2.push(e2);
            s2.unshift(u3), s2.push(u3), l2.signature = d(s2.join("")), o2.log && (console.log("H5\u7B7E\u540D\u524D\u53C2\u6570", s2), console.log("H5\u7B7E\u540D\u540E\u8FD4\u56DE", l2)), e2 ? t2 && t2(l2, "[object Object]" == Object.prototype.toString.call(e2) && "json" == a2 ? JSON.stringify(e2) : e2) : t2 && t2(l2);
          };
          if (u2 && !i2) {
            var g = false;
            s.mobileCall(764, { get: l2, post: e2 }, function(n3) {
              return !g && (g = true, n3 && n3.status ? (delete n3.status, o2.log && (console.log("\u5BA2\u6237\u7AEF\u7B7E\u540D\u524D\u53C2\u6570", { get: l2, post: e2 }), console.log("\u5BA2\u6237\u7AEF\u7B7E\u540D\u540E\u8FD4\u56DE", r({}, l2, {}, n3))), l2 = r({}, l2, {}, n3), e2 ? t2 && t2(l2, "[object Object]" == Object.prototype.toString.call(e2) && "json" == a2 ? JSON.stringify(e2) : e2) : t2 && t2(l2), false) : (u2 = false, void f2()));
            });
          } else u2 = false, f2();
        }
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
        var s = e(function(t2, n2) {
          !function(n3, r2) {
            t2.exports = function() {
              var t3 = { str2Json: function(t4) {
                var n4 = {};
                if ("[object String]" === Object.prototype.toString.call(t4)) try {
                  n4 = JSON.parse(t4);
                } catch (t5) {
                  n4 = {};
                }
                return n4;
              }, json2Str: function(t4) {
                var n4 = t4;
                if ("string" != typeof t4) try {
                  n4 = JSON.stringify(t4);
                } catch (t5) {
                  n4 = "";
                }
                return n4;
              }, _extend: function(t4, n4) {
                if (n4) for (var r3 in t4) n4.hasOwnProperty(r3) || (n4[r3] = t4[r3]);
                return n4;
              }, formatURL: { browser: "", url: "" }, formatSong: { filename: "", filesize: "", hash: "", bitrate: "", extname: "", duration: "", mvhash: "", m4afilesize: "", "320hash": "", "320filesize": "", sqhash: "", sqfilesize: 0, feetype: 0, isfirst: 0 }, formatMV: { filename: "", singername: "", hash: "", imgurl: "" }, formatShare: { shareName: "", topicName: "", hash: "", listID: "", type: "", suid: "", slid: "", imgUrl: "", filename: "", duration: "", shareData: { linkUrl: "", picUrl: "", content: "", title: "" } }, cbNum: 0, isIOS: false, isKugouAndroid: false, isAndroid: true, loadUrl: function(t4) {
                var n4 = document.createElement("iframe");
                n4.setAttribute("src", t4), n4.setAttribute("style", "display:none;"), n4.setAttribute("height", "0px"), n4.setAttribute("width", "0px"), n4.setAttribute("frameborder", "0"), document.body.appendChild(n4), n4.parentNode.removeChild(n4), n4 = null;
              }, callCmd: function(n4) {
                var r3 = t3;
                if (r3.isKugouAndroid) {
                  var e2 = {}, o2 = "";
                  if (n4.cmd && (e2.cmd = n4.cmd), n4.jsonStr && (e2.jsonStr = n4.jsonStr), n4.callback && (o2 = "kgandroidmobilecall" + ++r3.cbNum + Math.random().toString().substr(2, 9), e2.callback = o2, window[o2] = function(t4, e3) {
                    void 0 !== t4 && ("[object String]" === Object.prototype.toString.call(t4) ? (t4 = "#" === e3 ? decodeURIComponent(t4) : decodeURIComponent(decodeURIComponent(t4)), n4.callback(r3.str2Json(t4))) : n4.callback(t4));
                  }), n4.AndroidCallback) {
                    var i2 = r3.str2Json(n4.jsonStr);
                    i2.AndroidCallback = o2, n4.jsonStr = r3.json2Str(i2), n4.jsonStr && (e2.jsonStr = n4.jsonStr);
                  }
                  var c2 = encodeURIComponent(JSON.stringify(e2)), s2 = "kugoujsbridge://start.kugou_jsbridge/?".concat(c2);
                  r3.loadUrl(s2);
                } else if (r3.isAndroid) {
                  var a2 = "", l2 = "";
                  if (n4.jsonStr) {
                    if (n4.callback && "" !== n4.callback && true === n4.AndroidCallback) {
                      l2 = "kgmobilecall" + ++r3.cbNum + Math.random().toString().substr(2, 9), window[l2] = function(t4, e3) {
                        void 0 !== t4 && ("[object String]" === Object.prototype.toString.call(t4) ? (t4 = "#" === e3 ? decodeURIComponent(t4) : decodeURIComponent(decodeURIComponent(t4)), n4.callback(r3.str2Json(t4))) : n4.callback(t4));
                      };
                      var u2 = r3.str2Json(n4.jsonStr);
                      u2.AndroidCallback = l2, n4.jsonStr = r3.json2Str(u2);
                    }
                    try {
                      a2 = external.superCall(n4.cmd, n4.jsonStr);
                    } catch (t4) {
                    }
                  } else try {
                    a2 = external.superCall(n4.cmd);
                  } catch (t4) {
                  }
                  n4.callback && "" !== n4.callback && "AndroidCallback" != a2 && (a2 = r3.str2Json(a2), n4.callback(a2));
                } else {
                  var f2 = "", d2 = "";
                  n4.callback && (d2 = "kgmobilecall" + ++r3.cbNum + Math.random().toString().substr(2, 9), window[d2] = function(t4) {
                    void 0 !== t4 && n4.callback && ("[object String]" === Object.prototype.toString.call(t4) ? n4.callback(r3.str2Json(t4)) : n4.callback(t4));
                  }), d2 && "" != d2 && n4.jsonStr && (f2 = 'kugouurl://start.music/?{"cmd":' + n4.cmd + ', "jsonStr":' + n4.jsonStr + ', "callback":"' + d2 + '"}'), d2 && "" != d2 && !n4.jsonStr && (f2 = 'kugouurl://start.music/?{"cmd":' + n4.cmd + ', "callback":"' + d2 + '"}'), "" == d2 && n4.jsonStr && (f2 = 'kugouurl://start.music/?{"cmd":' + n4.cmd + ', "jsonStr":' + n4.jsonStr + "}"), "" != d2 || n4.jsonStr || (f2 = 'kugouurl://start.music/?{"cmd":' + n4.cmd + "}"), r3.loadUrl(f2);
                }
              }, formartData: function(n4, r3) {
                n4 && 123 == n4 && r3 && (r3 = t3._extend(t3.formatURL, r3)), n4 && 123 == n4 && r3 && (r3 = t3._extend(t3.formatURL, r3));
              } };
              return { isIOS: t3.isIOS, isKugouAndroid: t3.isKugouAndroid, isAndroid: t3.isAndroid, isInClient: function() {
                return !(!t3.isAndroid && !t3.isKugouAndroid && !t3.isIOS);
              }, mobileCall: function(n4, r3, e2) {
                var o2 = "";
                if (r3 && (o2 = t3.json2Str(r3)), !n4) return console.error("\u8BF7\u8F93\u5165\u547D\u4EE4\u53F7\uFF01"), false;
                var i2 = {};
                n4 && (i2.cmd = n4), "" != o2 && (i2.jsonStr = o2), e2 && (i2.callback = e2), n4 && 186 == n4 && e2 && (i2.AndroidCallback = true), t3.callCmd(i2);
              }, KgWebMobileCall: function(t4, n4) {
                if (t4) try {
                  var r3 = t4.split(".");
                  r3.reduce(function(e2, o2) {
                    if (e2[o2]) {
                      if (o2 === r3[r3.length - 1]) {
                        var i2 = e2[o2];
                        return "function" == typeof i2 ? (e2[o2] = function(t5) {
                          i2 && i2(t5), n4 && n4(t5);
                        }, e2[o2]) : (console.error("\u8BF7\u68C0\u67E5\uFF0C\u5F53\u524D\u73AF\u5883\u53D8\u91CF\u5DF2\u6CE8\u518C\u4E86\u5BF9\u8C61\uFF1A" + t4 + "\uFF0C\u4E14\u8BE5\u5BF9\u8C61\u4E0D\u662F\u65B9\u6CD5"), null);
                      }
                      return e2[o2];
                    }
                    return o2 === r3[r3.length - 1] ? e2[o2] = function(t5) {
                      n4 && n4(t5);
                    } : e2[o2] = new Object(), e2[o2];
                  }, window);
                } catch (t5) {
                }
              } };
            }();
          }();
        }), a = e(function(t2) {
          !function() {
            var n2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r2 = { rotl: function(t3, n3) {
              return t3 << n3 | t3 >>> 32 - n3;
            }, rotr: function(t3, n3) {
              return t3 << 32 - n3 | t3 >>> n3;
            }, endian: function(t3) {
              if (t3.constructor == Number) return 16711935 & r2.rotl(t3, 8) | 4278255360 & r2.rotl(t3, 24);
              for (var n3 = 0; n3 < t3.length; n3++) t3[n3] = r2.endian(t3[n3]);
              return t3;
            }, randomBytes: function(t3) {
              for (var n3 = []; t3 > 0; t3--) n3.push(Math.floor(256 * Math.random()));
              return n3;
            }, bytesToWords: function(t3) {
              for (var n3 = [], r3 = 0, e2 = 0; r3 < t3.length; r3++, e2 += 8) n3[e2 >>> 5] |= t3[r3] << 24 - e2 % 32;
              return n3;
            }, wordsToBytes: function(t3) {
              for (var n3 = [], r3 = 0; r3 < 32 * t3.length; r3 += 8) n3.push(t3[r3 >>> 5] >>> 24 - r3 % 32 & 255);
              return n3;
            }, bytesToHex: function(t3) {
              for (var n3 = [], r3 = 0; r3 < t3.length; r3++) n3.push((t3[r3] >>> 4).toString(16)), n3.push((15 & t3[r3]).toString(16));
              return n3.join("");
            }, hexToBytes: function(t3) {
              for (var n3 = [], r3 = 0; r3 < t3.length; r3 += 2) n3.push(parseInt(t3.substr(r3, 2), 16));
              return n3;
            }, bytesToBase64: function(t3) {
              for (var r3 = [], e2 = 0; e2 < t3.length; e2 += 3) for (var o2 = t3[e2] << 16 | t3[e2 + 1] << 8 | t3[e2 + 2], i2 = 0; i2 < 4; i2++) 8 * e2 + 6 * i2 <= 8 * t3.length ? r3.push(n2.charAt(o2 >>> 6 * (3 - i2) & 63)) : r3.push("=");
              return r3.join("");
            }, base64ToBytes: function(t3) {
              t3 = t3.replace(/[^A-Z0-9+\/]/gi, "");
              for (var r3 = [], e2 = 0, o2 = 0; e2 < t3.length; o2 = ++e2 % 4) 0 != o2 && r3.push((n2.indexOf(t3.charAt(e2 - 1)) & Math.pow(2, -2 * o2 + 8) - 1) << 2 * o2 | n2.indexOf(t3.charAt(e2)) >>> 6 - 2 * o2);
              return r3;
            } };
            t2.exports = r2;
          }();
        }), l = { utf8: { stringToBytes: function(t2) {
          return l.bin.stringToBytes(unescape(encodeURIComponent(t2)));
        }, bytesToString: function(t2) {
          return decodeURIComponent(escape(l.bin.bytesToString(t2)));
        } }, bin: { stringToBytes: function(t2) {
          for (var n2 = [], r2 = 0; r2 < t2.length; r2++) n2.push(255 & t2.charCodeAt(r2));
          return n2;
        }, bytesToString: function(t2) {
          for (var n2 = [], r2 = 0; r2 < t2.length; r2++) n2.push(String.fromCharCode(t2[r2]));
          return n2.join("");
        } } }, u = l, f = function(t2) {
          return null != t2 && (o(t2) || i(t2) || !!t2._isBuffer);
        }, d = e(function(t2) {
          !function() {
            var n2 = a, r2 = u.utf8, e2 = f, o2 = u.bin, i2 = function(t3, c2) {
              t3.constructor == String ? t3 = c2 && "binary" === c2.encoding ? o2.stringToBytes(t3) : r2.stringToBytes(t3) : e2(t3) ? t3 = Array.prototype.slice.call(t3, 0) : Array.isArray(t3) || (t3 = t3.toString());
              for (var s2 = n2.bytesToWords(t3), a2 = 8 * t3.length, l2 = 1732584193, u2 = -271733879, f2 = -1732584194, d2 = 271733878, g = 0; g < s2.length; g++) s2[g] = 16711935 & (s2[g] << 8 | s2[g] >>> 24) | 4278255360 & (s2[g] << 24 | s2[g] >>> 8);
              s2[a2 >>> 5] |= 128 << a2 % 32, s2[14 + (a2 + 64 >>> 9 << 4)] = a2;
              for (var b = i2._ff, p = i2._gg, h = i2._hh, m = i2._ii, g = 0; g < s2.length; g += 16) {
                var y = l2, j = u2, S = f2, v = d2;
                u2 = m(u2 = m(u2 = m(u2 = m(u2 = h(u2 = h(u2 = h(u2 = h(u2 = p(u2 = p(u2 = p(u2 = p(u2 = b(u2 = b(u2 = b(u2 = b(u2, f2 = b(f2, d2 = b(d2, l2 = b(l2, u2, f2, d2, s2[g + 0], 7, -680876936), u2, f2, s2[g + 1], 12, -389564586), l2, u2, s2[g + 2], 17, 606105819), d2, l2, s2[g + 3], 22, -1044525330), f2 = b(f2, d2 = b(d2, l2 = b(l2, u2, f2, d2, s2[g + 4], 7, -176418897), u2, f2, s2[g + 5], 12, 1200080426), l2, u2, s2[g + 6], 17, -1473231341), d2, l2, s2[g + 7], 22, -45705983), f2 = b(f2, d2 = b(d2, l2 = b(l2, u2, f2, d2, s2[g + 8], 7, 1770035416), u2, f2, s2[g + 9], 12, -1958414417), l2, u2, s2[g + 10], 17, -42063), d2, l2, s2[g + 11], 22, -1990404162), f2 = b(f2, d2 = b(d2, l2 = b(l2, u2, f2, d2, s2[g + 12], 7, 1804603682), u2, f2, s2[g + 13], 12, -40341101), l2, u2, s2[g + 14], 17, -1502002290), d2, l2, s2[g + 15], 22, 1236535329), f2 = p(f2, d2 = p(d2, l2 = p(l2, u2, f2, d2, s2[g + 1], 5, -165796510), u2, f2, s2[g + 6], 9, -1069501632), l2, u2, s2[g + 11], 14, 643717713), d2, l2, s2[g + 0], 20, -373897302), f2 = p(f2, d2 = p(d2, l2 = p(l2, u2, f2, d2, s2[g + 5], 5, -701558691), u2, f2, s2[g + 10], 9, 38016083), l2, u2, s2[g + 15], 14, -660478335), d2, l2, s2[g + 4], 20, -405537848), f2 = p(f2, d2 = p(d2, l2 = p(l2, u2, f2, d2, s2[g + 9], 5, 568446438), u2, f2, s2[g + 14], 9, -1019803690), l2, u2, s2[g + 3], 14, -187363961), d2, l2, s2[g + 8], 20, 1163531501), f2 = p(f2, d2 = p(d2, l2 = p(l2, u2, f2, d2, s2[g + 13], 5, -1444681467), u2, f2, s2[g + 2], 9, -51403784), l2, u2, s2[g + 7], 14, 1735328473), d2, l2, s2[g + 12], 20, -1926607734), f2 = h(f2, d2 = h(d2, l2 = h(l2, u2, f2, d2, s2[g + 5], 4, -378558), u2, f2, s2[g + 8], 11, -2022574463), l2, u2, s2[g + 11], 16, 1839030562), d2, l2, s2[g + 14], 23, -35309556), f2 = h(f2, d2 = h(d2, l2 = h(l2, u2, f2, d2, s2[g + 1], 4, -1530992060), u2, f2, s2[g + 4], 11, 1272893353), l2, u2, s2[g + 7], 16, -155497632), d2, l2, s2[g + 10], 23, -1094730640), f2 = h(f2, d2 = h(d2, l2 = h(l2, u2, f2, d2, s2[g + 13], 4, 681279174), u2, f2, s2[g + 0], 11, -358537222), l2, u2, s2[g + 3], 16, -722521979), d2, l2, s2[g + 6], 23, 76029189), f2 = h(f2, d2 = h(d2, l2 = h(l2, u2, f2, d2, s2[g + 9], 4, -640364487), u2, f2, s2[g + 12], 11, -421815835), l2, u2, s2[g + 15], 16, 530742520), d2, l2, s2[g + 2], 23, -995338651), f2 = m(f2, d2 = m(d2, l2 = m(l2, u2, f2, d2, s2[g + 0], 6, -198630844), u2, f2, s2[g + 7], 10, 1126891415), l2, u2, s2[g + 14], 15, -1416354905), d2, l2, s2[g + 5], 21, -57434055), f2 = m(f2, d2 = m(d2, l2 = m(l2, u2, f2, d2, s2[g + 12], 6, 1700485571), u2, f2, s2[g + 3], 10, -1894986606), l2, u2, s2[g + 10], 15, -1051523), d2, l2, s2[g + 1], 21, -2054922799), f2 = m(f2, d2 = m(d2, l2 = m(l2, u2, f2, d2, s2[g + 8], 6, 1873313359), u2, f2, s2[g + 15], 10, -30611744), l2, u2, s2[g + 6], 15, -1560198380), d2, l2, s2[g + 13], 21, 1309151649), f2 = m(f2, d2 = m(d2, l2 = m(l2, u2, f2, d2, s2[g + 4], 6, -145523070), u2, f2, s2[g + 11], 10, -1120210379), l2, u2, s2[g + 2], 15, 718787259), d2, l2, s2[g + 9], 21, -343485551), l2 = l2 + y >>> 0, u2 = u2 + j >>> 0, f2 = f2 + S >>> 0, d2 = d2 + v >>> 0;
              }
              return n2.endian([l2, u2, f2, d2]);
            };
            i2._ff = function(t3, n3, r3, e3, o3, i3, c2) {
              var s2 = t3 + (n3 & r3 | ~n3 & e3) + (o3 >>> 0) + c2;
              return (s2 << i3 | s2 >>> 32 - i3) + n3;
            }, i2._gg = function(t3, n3, r3, e3, o3, i3, c2) {
              var s2 = t3 + (n3 & e3 | r3 & ~e3) + (o3 >>> 0) + c2;
              return (s2 << i3 | s2 >>> 32 - i3) + n3;
            }, i2._hh = function(t3, n3, r3, e3, o3, i3, c2) {
              var s2 = t3 + (n3 ^ r3 ^ e3) + (o3 >>> 0) + c2;
              return (s2 << i3 | s2 >>> 32 - i3) + n3;
            }, i2._ii = function(t3, n3, r3, e3, o3, i3, c2) {
              var s2 = t3 + (r3 ^ (n3 | ~e3)) + (o3 >>> 0) + c2;
              return (s2 << i3 | s2 >>> 32 - i3) + n3;
            }, i2._blocksize = 16, i2._digestsize = 16, t2.exports = function(t3, r3) {
              if (void 0 === t3 || null === t3) throw new Error("Illegal argument " + t3);
              var e3 = n2.wordsToBytes(i2(t3, r3));
              return r3 && r3.asBytes ? e3 : r3 && r3.asString ? o2.bytesToString(e3) : n2.bytesToHex(e3);
            };
          }();
        });
        return c;
      });
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/songList.js
  var import_infSign, handleSignature, songList_default2;
  var init_songList2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/songList.js"() {
      init_request();
      init_utils();
      init_utils2();
      import_infSign = __toESM(require_infSign_min());
      handleSignature = (id, page, limit) => new Promise((resolve, reject) => {
        (0, import_infSign.default)({ appid: 1058, type: 0, module: "playlist", page, pagesize: limit, specialid: id }, null, {
          useH5: true,
          isCDN: true,
          callback(i) {
            resolve(i.signature);
          }
        });
      });
      songList_default2 = {
        _requestObj_tags: null,
        _requestObj_listInfo: null,
        _requestObj_list: null,
        _requestObj_listRecommend: null,
        listDetailLimit: 1e4,
        currentTagInfo: {
          id: void 0,
          info: void 0
        },
        sortList: [
          {
            name: "\u63A8\u8350",
            tid: "recommend",
            id: "5"
          },
          {
            name: "\u6700\u70ED",
            tid: "hot",
            id: "6"
          },
          {
            name: "\u6700\u65B0",
            tid: "new",
            id: "7"
          },
          {
            name: "\u70ED\u85CF",
            tid: "hot_collect",
            id: "3"
          },
          {
            name: "\u98D9\u5347",
            tid: "rise",
            id: "8"
          }
        ],
        cache: /* @__PURE__ */ new Map(),
        regExps: {
          listData: /global\.data = (\[.+\]);/,
          listInfo: /global = {[\s\S]+?name: "(.+)"[\s\S]+?pic: "(.+)"[\s\S]+?};/,
          // https://www.kugou.com/yy/special/single/1067062.html
          listDetailLink: /^.+\/(\d+)\.html(?:\?.*|&.*$|#.*$|$)/
        },
        getInfoUrl(tagId) {
          return tagId ? `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&cdn=cdn&t=5&c=${tagId}` : "http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&";
        },
        getSongListUrl(sortId, tagId, page) {
          if (tagId == null) tagId = "";
          return `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_ajax=1&cdn=cdn&t=${sortId}&c=${tagId}&p=${page}`;
        },
        getSongListDetailUrl(id) {
          return `http://www2.kugou.kugou.com/yueku/v9/special/single/${id}-5-9999.html`;
        },
        /**
         * 格式化播放数量
         * @param {*} num
         */
        formatPlayCount(num) {
          if (num > 1e8) return parseInt(num / 1e7) / 10 + "\u4EBF";
          if (num > 1e4) return parseInt(num / 1e3) / 10 + "\u4E07";
          return num;
        },
        filterInfoHotTag(rawData) {
          const result = [];
          if (rawData.status !== 1) return result;
          for (const key of Object.keys(rawData.data)) {
            let tag = rawData.data[key];
            result.push({
              id: tag.special_id,
              name: tag.special_name,
              source: "kg"
            });
          }
          return result;
        },
        filterTagInfo(rawData) {
          const result = [];
          for (const name of Object.keys(rawData)) {
            result.push({
              name,
              list: rawData[name].data.map((tag) => ({
                parent_id: tag.parent_id,
                parent_name: tag.pname,
                id: tag.id,
                name: tag.name,
                source: "kg"
              }))
            });
          }
          return result;
        },
        getSongList(sortId, tagId, page, tryNum = 0) {
          if (this._requestObj_list) this._requestObj_list.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_list = httpFetch(
            this.getSongListUrl(sortId, tagId, page)
          );
          return this._requestObj_list.promise.then(({ body }) => {
            if (!body || body.status !== 1) return this.getSongList(sortId, tagId, page, ++tryNum);
            return this.filterList(body.special_db);
          });
        },
        getSongListRecommend(tryNum = 0) {
          if (this._requestObj_listRecommend) this._requestObj_listRecommend.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_listRecommend = httpFetch(
            "http://everydayrec.service.kugou.com/guess_special_recommend",
            {
              method: "post",
              headers: {
                "User-Agent": "KuGou2012-8275-web_browser_event_handler"
              },
              body: {
                appid: 1001,
                clienttime: 1566798337219,
                clientver: 8275,
                key: "f1f93580115bb106680d2375f8032d96",
                mid: "21511157a05844bd085308bc76ef3343",
                platform: "pc",
                userid: "262643156",
                return_min: 6,
                return_max: 15
              }
            }
          );
          return this._requestObj_listRecommend.promise.then(({ body }) => {
            if (body.status !== 1) return this.getSongListRecommend(++tryNum);
            return this.filterList(body.data.special_list);
          });
        },
        filterList(rawData) {
          return rawData.map((item) => ({
            play_count: item.total_play_count || this.formatPlayCount(item.play_count),
            id: "id_" + item.specialid,
            author: item.nickname,
            name: item.specialname,
            time: dateFormat(item.publish_time || item.publishtime, "Y-M-D"),
            img: item.img || item.imgurl,
            total: item.songcount,
            grade: item.grade,
            desc: item.intro,
            source: "kg"
          }));
        },
        async createHttp(url, options, retryNum = 0) {
          if (retryNum > 2) throw new Error("try max num");
          let result;
          options.cache = "default";
          try {
            result = await httpFetch(url, options).promise;
          } catch (err2) {
            console.log(err2);
            return this.createHttp(url, options, ++retryNum);
          }
          if (result.statusCode !== 200 || (result.body.error_code !== void 0 ? result.body.error_code : result.body.errcode !== void 0 ? result.body.errcode : result.body.err_code) !== 0) return this.createHttp(url, options, ++retryNum);
          if (result.body.data) return result.body.data;
          if (Array.isArray(result.body.info)) return result.body;
          return result.body.info;
        },
        createTask(hashs) {
          let data = {
            appid: 1001,
            clienttime: 639437935,
            clientver: 9020,
            fields: "album_info,author_name,audio_info,ori_audio_name",
            is_publish: "1",
            key: "0475af1457cd3363c7b45b871e94428a",
            mid: "21511157a05844bd085308bc76ef3342",
            show_privilege: 1
          };
          let list = hashs;
          let tasks = [];
          while (list.length) {
            tasks.push(Object.assign({ data: list.slice(0, 100) }, data));
            if (list.length < 100) break;
            list = list.slice(100);
          }
          let url = "http://kmr.service.kugou.com/v2/album_audio/audio";
          return tasks.map((task) => this.createHttp(url, {
            method: "POST",
            body: task,
            headers: {
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
            }
          }).then((data2) => data2.map((s) => s[0])));
        },
        async getUserListDetailByCode(id) {
          const songInfo = await this.createHttp("http://t.kugou.com/command/", {
            method: "POST",
            headers: {
              "KG-RC": 1,
              "KG-THash": "network_super_call.cpp:3676261689:379",
              "User-Agent": ""
            },
            body: { appid: 1001, clientver: 9020, mid: "21511157a05844bd085308bc76ef3343", clienttime: 640612895, key: "36164c4015e704673c588ee202b9ecb8", data: id }
          });
          let songList;
          let info = songInfo.info;
          if (info.global_collection_id) return this.getUserListDetail2(info.global_collection_id);
          if (info.userid != null) {
            songList = await this.createHttp("http://www2.kugou.kugou.com/apps/kucodeAndShare/app/", {
              method: "POST",
              headers: {
                "KG-RC": 1,
                "KG-THash": "network_super_call.cpp:3676261689:379",
                "User-Agent": ""
              },
              body: { appid: 1001, clientver: 9020, mid: "21511157a05844bd085308bc76ef3343", clienttime: 640612895, key: "36164c4015e704673c588ee202b9ecb8", data: { id: info.id, type: 3, userid: info.userid, collect_type: 0, page: 1, pagesize: info.count } }
            });
          }
          let result = await Promise.all(this.createTask((songList || songInfo.list).map((item) => ({ hash: item.hash })))).then(([...datas]) => datas.flat());
          result = this.enrichMvInfo(songList || songInfo.list, result);
          return {
            list: this.filterData2(result) || [],
            page: 1,
            limit: info.count,
            total: info.count,
            source: "kg",
            info: {
              name: info.name,
              img: info.img_size && info.img_size.replace("{size}", 240) || info.img,
              // desc: body.result.info.list_desc,
              author: info.username
              // play_count: this.formatPlayCount(info.count),
            }
          };
        },
        async getUserListDetail3(chain, page) {
          const songInfo = await this.createHttp(`http://m.kugou.com/schain/transfer?pagesize=${this.listDetailLimit}&chain=${chain}&su=1&page=${page}&n=0.7928855356604456`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
            }
          });
          if (!songInfo.list) {
            if (songInfo.global_collection_id) return this.getUserListDetail2(songInfo.global_collection_id);
            else return this.getUserListDetail4(songInfo, chain, page).catch(() => this.getUserListDetail5(chain));
          }
          let result = await Promise.all(this.createTask(songInfo.list.map((item) => ({ hash: item.hash })))).then(([...datas]) => datas.flat());
          result = this.enrichMvInfo(songInfo.list, result);
          return {
            list: this.filterData2(result) || [],
            page: 1,
            limit: this.listDetailLimit,
            total: songInfo.count,
            source: "kg",
            info: {
              name: songInfo.info.name,
              img: songInfo.info.img,
              // desc: body.result.info.list_desc,
              author: songInfo.info.username
              // play_count: this.formatPlayCount(info.count),
            }
          };
        },
        deDuplication(datas) {
          let ids = /* @__PURE__ */ new Set();
          return datas.filter(({ hash }) => {
            if (ids.has(hash)) return false;
            ids.add(hash);
            return true;
          });
        },
        // mobile getMusicInfos 同款：聚合接口(gateway)的 audio_info 不返回 mvhash，
        // 从原始列表收集 mv，再按 hash 或「归一化歌名+歌手」写回聚合结果，由 filterData2 读取
        normName(s) {
          return decodeName(s || "").replace(/\s*[-_—–]\s*[^-_—–]*$/, "").trim();
        },
        normSinger(s) {
          return decodeName(s || "").replace(/[\/、，,|&\s]+/g, "");
        },
        enrichMvInfo(rawList, datas) {
          const mvHashes = /* @__PURE__ */ new Map();
          const mvNameMap = /* @__PURE__ */ new Map();
          (rawList || []).forEach((item) => {
            const mv = item?.mvhash || item?.mv_hash || item?.audio_info?.mvhash || item?.base?.mvhash || item?.high_mv_hash;
            if (!mv) return;
            if (item.hash) mvHashes.set(item.hash, mv);
            if (item.songname != null) {
              const key = `${this.normName(item.songname)}|${this.normSinger(item.singername || item.author_name)}`;
              if (key !== "|") mvNameMap.set(key, mv);
            }
          });
          (datas || []).forEach((item) => {
            if (!item?.audio_info) return;
            const mv = mvHashes.get(item.audio_info.hash) ?? mvNameMap.get(`${this.normName(item.songname)}|${this.normSinger(item.author_name)}`);
            if (mv) item.audio_info.mvhash = mv;
          });
          return datas;
        },
        async getUserListDetailByLink({ info }, link) {
          let listInfo = info["0"];
          let total = listInfo.count;
          let tasks = [];
          let page = 0;
          while (total) {
            const limit = total > 90 ? 90 : total;
            total -= limit;
            page += 1;
            tasks.push(this.createHttp(link.replace(/pagesize=\d+/, "pagesize=" + limit).replace(/page=\d+/, "page=" + page), {
              headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
                Referer: link
              }
            }).then((data) => data.list.info));
          }
          let result = await Promise.all(tasks).then(([...datas]) => datas.flat());
          const rawList1 = result;
          result = await Promise.all(this.createTask(this.deDuplication(result).map((item) => ({ hash: item.hash })))).then(([...datas]) => datas.flat());
          result = this.enrichMvInfo(rawList1, result);
          return {
            list: this.filterData2(result) || [],
            page,
            limit: this.listDetailLimit,
            total: listInfo.count,
            source: "kg",
            info: {
              name: listInfo.name,
              img: listInfo.pic && listInfo.pic.replace("{size}", 240),
              // desc: body.result.info.list_desc,
              author: listInfo.list_create_username
              // play_count: this.formatPlayCount(listInfo.count),
            }
          };
        },
        createGetListDetail2Task(id, total) {
          let tasks = [];
          let page = 0;
          while (total) {
            const limit = total > 300 ? 300 : total;
            total -= limit;
            page += 1;
            tasks.push(this.createHttp("https://mobiles.kugou.com/api/v5/special/song_v2?appid=1058&global_specialid=" + id + "&specialid=0&plat=0&version=8000&page=" + page + "&pagesize=" + limit + "&srcappid=2919&clientver=20000&clienttime=1586163263991&mid=1586163263991&uuid=1586163263991&dfid=-&signature=" + toMD5("NVPh5oo715z5DIWAeQlhMDsWXXQV4hwtappid=1058clienttime=1586163263991clientver=20000dfid=-global_specialid=" + id + "mid=1586163263991page=" + page + "pagesize=" + limit + "plat=0specialid=0srcappid=2919uuid=1586163263991version=8000NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt"), {
              headers: {
                mid: "1586163263991",
                Referer: "https://m3ws.kugou.com/share/index.php",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
                dfid: "-",
                clienttime: "1586163263991"
              }
            }).then((data) => data.info));
          }
          return Promise.all(tasks).then(([...datas]) => datas.flat());
        },
        async getUserListDetail2(global_collection_id) {
          let id = global_collection_id;
          if (id.length > 1e3) throw new Error("get list error");
          let info = await this.createHttp("https://mobiles.kugou.com/api/v5/special/info_v2?appid=1058&specialid=0&global_specialid=" + id + "&format=jsonp&srcappid=2919&clientver=20000&clienttime=1586163242519&mid=1586163242519&uuid=1586163242519&dfid=-&signature=" + toMD5("NVPh5oo715z5DIWAeQlhMDsWXXQV4hwtappid=1058clienttime=1586163242519clientver=20000dfid=-format=jsonpglobal_specialid=" + id + "mid=1586163242519specialid=0srcappid=2919uuid=1586163242519NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt"), {
            headers: {
              mid: "1586163242519",
              Referer: "https://m3ws.kugou.com/share/index.php",
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
              dfid: "-",
              clienttime: "1586163242519"
            }
          });
          const songInfo = await this.createGetListDetail2Task(id, info.songcount);
          let result = await Promise.all(this.createTask(this.deDuplication(songInfo).map((item) => ({ hash: item.hash })))).then(([...datas]) => datas.flat());
          result = this.enrichMvInfo(songInfo, result);
          return {
            list: this.filterData2(result) || [],
            page: 1,
            limit: this.listDetailLimit,
            total: info.songcount,
            source: "kg",
            info: {
              name: info.specialname,
              img: info.imgurl && info.imgurl.replace("{size}", 240),
              // desc: body.result.info.list_desc,
              author: info.nickname
              // play_count: this.formatPlayCount(info.count),
            }
          };
        },
        async getListInfoByChain(chain) {
          if (this.cache.has(chain)) return this.cache.get(chain);
          const { body } = await httpFetch(`https://m.kugou.com/share/?chain=${chain}&id=${chain}`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
            }
          }).promise;
          let result = body.match(/var\sphpParam\s=\s({.+?});/);
          if (result) result = JSON.parse(result[1]);
          this.cache.set(chain, result);
          return result;
        },
        async getUserListDetailByPcChain(chain) {
          let key = `${chain}_pc_list`;
          if (this.cache.has(key)) return this.cache.get(key);
          const { body } = await httpFetch(`http://www.kugou.com/share/${chain}.html`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
            }
          }).promise;
          let result = body.match(/var\sdataFromSmarty\s=\s(\[.+?\])/);
          if (result) result = JSON.parse(result[1]);
          this.cache.set(chain, result);
          const rawList2 = result;
          result = await Promise.all(this.createTask(result.map((item) => ({ hash: item.hash })))).then(([...datas]) => datas.flat());
          result = this.enrichMvInfo(rawList2, result);
          return this.filterData2(result);
        },
        async getUserListDetail4(songInfo, chain, page) {
          const limit = 100;
          const [listInfo, list] = await Promise.all([
            this.getListInfoByChain(chain),
            this.getUserListDetailById(songInfo.id, page, limit)
          ]);
          return {
            list: list || [],
            page,
            limit,
            total: listInfo.songcount,
            source: "kg",
            info: {
              name: listInfo.specialname,
              img: listInfo.imgurl && listInfo.imgurl.replace("{size}", 240),
              // desc: body.result.info.list_desc,
              author: listInfo.nickname
              // play_count: this.formatPlayCount(info.count),
            }
          };
        },
        async getUserListDetail5(chain) {
          const [listInfo, list] = await Promise.all([
            this.getListInfoByChain(chain),
            this.getUserListDetailByPcChain(chain)
          ]);
          return {
            list: list || [],
            page: 1,
            limit: this.listDetailLimit,
            total: listInfo.songcount,
            source: "kg",
            info: {
              name: listInfo.specialname,
              img: listInfo.imgurl && listInfo.imgurl.replace("{size}", 240),
              // desc: body.result.info.list_desc,
              author: listInfo.nickname
              // play_count: this.formatPlayCount(info.count),
            }
          };
        },
        async getUserListDetailById(id, page, limit) {
          const signature = await handleSignature(id, page, limit);
          let info = await this.createHttp(`https://pubsongscdn.kugou.com/v2/get_other_list_file?srcappid=2919&clientver=20000&appid=1058&type=0&module=playlist&page=${page}&pagesize=${limit}&specialid=${id}&signature=${signature}`, {
            headers: {
              Referer: "https://m3ws.kugou.com/share/index.php",
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
              dfid: "-"
            }
          });
          let result = await Promise.all(this.createTask(info.info.map((item) => ({ hash: item.hash })))).then(([...datas]) => datas.flat());
          result = this.enrichMvInfo(info.info, result);
          return this.filterData2(result);
        },
        async getUserListDetail(link, page, retryNum = 0) {
          if (retryNum > 3) return Promise.reject(new Error("link try max num"));
          if (link.includes("#")) link = link.replace(/#.*$/, "");
          if (link.includes("global_collection_id")) return this.getUserListDetail2(link.replace(/^.*?global_collection_id=(\w+)(?:&.*$|#.*$|$)/, "$1"));
          if (link.includes("chain=")) return this.getUserListDetail3(link.replace(/^.*?chain=(\w+)(?:&.*$|#.*$|$)/, "$1"), page);
          if (link.includes(".html")) {
            if (link.includes("zlist.html")) {
              link = link.replace(/^(.*)zlist\.html/, "https://m3ws.kugou.com/zlist/list");
              if (link.includes("pagesize")) {
                link = link.replace("pagesize=30", "pagesize=" + this.listDetailLimit).replace("page=1", "page=" + page);
              } else {
                link += `&pagesize=${this.listDetailLimit}&page=${page}`;
              }
            } else if (!link.includes("song.html")) return this.getUserListDetail3(link.replace(/.+\/(\w+).html(?:\?.*|&.*$|#.*$|$)/, "$1"), page);
          }
          const requestObj_listDetailLink = httpFetch(link, {
            headers: {
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
              Referer: link
            }
          });
          const { url: location, statusCode, body } = await requestObj_listDetailLink.promise;
          if (statusCode > 400) return this.getUserListDetail(link, page, ++retryNum);
          if (location.split("?")[0] != link.split("?")[0]) {
            if (location.includes("global_collection_id")) return this.getUserListDetail2(location.replace(/^.*?global_collection_id=(\w+)(?:&.*$|#.*$|$)/, "$1"));
            if (location.includes("chain=")) return this.getUserListDetail3(location.replace(/^.*?chain=(\w+)(?:&.*$|#.*$|$)/, "$1"), page);
            if (location.includes(".html")) {
              if (location.includes("zlist.html")) {
                let link2 = location.replace(/^(.*)zlist\.html/, "https://m3ws.kugou.com/zlist/list");
                if (link2.includes("pagesize")) {
                  link2 = link2.replace("pagesize=30", "pagesize=" + this.listDetailLimit).replace("page=1", "page=" + page);
                } else {
                  link2 += `&pagesize=${this.listDetailLimit}&page=${page}`;
                }
                return this.getUserListDetail(link2, page, ++retryNum);
              } else return this.getUserListDetail3(location.replace(/.+\/(\w+).html(?:\?.*|&.*$|#.*$|$)/, "$1"), page);
            }
          }
          if (typeof body == "string") return this.getUserListDetail2(body.replace(/^[\s\S]+?"global_collection_id":"(\w+)"[\s\S]+?$/, "$1"));
          if (body.errcode !== 0) return this.getUserListDetail(link, page, ++retryNum);
          return this.getUserListDetailByLink(body, link);
        },
        getListDetail(id, page, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          id = id.toString();
          if (id.includes("special/single/")) {
            id = id.replace(this.regExps.listDetailLink, "$1");
          } else if (/https?:/.test(id)) {
            return this.getUserListDetail(id.replace(/^.*?http/, "http"), page);
          } else if (/^\d+$/.test(id)) {
            return this.getUserListDetailByCode(id);
          } else if (id.startsWith("id_")) {
            id = id.replace("id_", "");
          }
          const requestObj_listDetail = httpFetch(this.getSongListDetailUrl(id));
          return requestObj_listDetail.promise.then(({ body }) => {
            let listData = body.match(this.regExps.listData);
            let listInfo = body.match(this.regExps.listInfo);
            if (!listData) return this.getListDetail(id, page, ++tryNum);
            listData = this.filterData(JSON.parse(listData[1]));
            let name;
            let pic;
            if (listInfo) {
              name = listInfo[1];
              pic = listInfo[2];
            }
            return {
              list: listData,
              page: 1,
              limit: 1e4,
              total: listData.length,
              source: "kg",
              info: {
                name,
                img: pic
                // desc: body.result.info.list_desc,
                // author: body.result.info.userinfo.username,
                // play_count: this.formatPlayCount(body.result.listen_num),
              }
            };
          });
        },
        filterData(rawList) {
          return rawList.map((item) => {
            const types = [];
            const _types = {};
            if (item.filesize !== 0) {
              let size = sizeFormate(item.filesize);
              types.push({ type: "128k", size, hash: item.hash });
              _types["128k"] = {
                size,
                hash: item.hash
              };
            }
            if (item.filesize_320 !== 0) {
              let size = sizeFormate(item.filesize_320);
              types.push({ type: "320k", size, hash: item.hash_320 });
              _types["320k"] = {
                size,
                hash: item.hash_320
              };
            }
            if (item.filesize_ape !== 0) {
              let size = sizeFormate(item.filesize_ape);
              types.push({ type: "ape", size, hash: item.hash_ape });
              _types.ape = {
                size,
                hash: item.hash_ape
              };
            }
            if (item.filesize_flac !== 0) {
              let size = sizeFormate(item.filesize_flac);
              types.push({ type: "flac", size, hash: item.hash_flac });
              _types.flac = {
                size,
                hash: item.hash_flac
              };
            }
            return {
              singer: decodeName(item.singername),
              name: decodeName(item.songname),
              albumName: decodeName(item.album_name),
              albumId: item.album_id,
              songmid: item.audio_id,
              source: "kg",
              interval: formatPlayTime(item.duration / 1e3),
              img: null,
              lrc: null,
              hash: item.hash,
              mv: item.mvhash || item.mv_hash || (item.audio_info && item.audio_info.mvhash) || (item.base && item.base.mvhash) || item.high_mv_hash || (Array.isArray(item.mvdata) && item.mvdata.length > 0 ? item.mvdata[0].hash : null) || null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        // hash list filter
        filterData2(rawList) {
          let ids = /* @__PURE__ */ new Set();
          let list = [];
          rawList.forEach((item) => {
            if (!item) return;
            if (ids.has(item.audio_info.audio_id)) return;
            ids.add(item.audio_info.audio_id);
            const types = [];
            const _types = {};
            if (item.audio_info.filesize !== "0") {
              let size = sizeFormate(parseInt(item.audio_info.filesize));
              types.push({ type: "128k", size, hash: item.audio_info.hash });
              _types["128k"] = {
                size,
                hash: item.audio_info.hash
              };
            }
            if (item.audio_info.filesize_320 !== "0") {
              let size = sizeFormate(parseInt(item.audio_info.filesize_320));
              types.push({ type: "320k", size, hash: item.audio_info.hash_320 });
              _types["320k"] = {
                size,
                hash: item.audio_info.hash_320
              };
            }
            if (item.audio_info.filesize_flac !== "0") {
              let size = sizeFormate(parseInt(item.audio_info.filesize_flac));
              types.push({ type: "flac", size, hash: item.audio_info.hash_flac });
              _types.flac = {
                size,
                hash: item.audio_info.hash_flac
              };
            }
            list.push({
              singer: decodeName(item.author_name),
              name: decodeName(item.ori_audio_name),
              albumName: decodeName(item.album_info.album_name),
              albumId: item.album_info.album_id,
              songmid: item.audio_info.audio_id,
              source: "kg",
              interval: formatPlayTime(parseInt(item.audio_info.timelength) / 1e3),
              img: null,
              lrc: null,
              hash: item.audio_info.hash,
              mv: item.audio_info.mvhash || item.mvhash || null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            });
          });
          return list;
        },
        // 获取列表信息
        getListInfo(tagId, tryNum = 0) {
          if (this._requestObj_listInfo) this._requestObj_listInfo.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_listInfo = httpFetch(this.getInfoUrl(tagId));
          return this._requestObj_listInfo.promise.then(({ body }) => {
            if (body.status !== 1) return this.getListInfo(tagId, ++tryNum);
            return {
              limit: body.data.params.pagesize,
              page: body.data.params.p,
              total: body.data.params.total,
              source: "kg"
            };
          });
        },
        // 获取列表数据
        getList(sortId, tagId, page) {
          let tasks = [this.getSongList(sortId, tagId, page)];
          tasks.push(
            this.currentTagInfo.id === tagId ? Promise.resolve(this.currentTagInfo.info) : this.getListInfo(tagId).then((info) => {
              this.currentTagInfo.id = tagId;
              this.currentTagInfo.info = Object.assign({}, info);
              return info;
            })
          );
          if (!tagId && page === 1 && sortId === this.sortList[0].id) tasks.push(this.getSongListRecommend());
          return Promise.all(tasks).then(([list, info, recommendList]) => {
            if (recommendList) list.unshift(...recommendList);
            return {
              list,
              ...info
            };
          });
        },
        // 获取标签
        getTags(tryNum = 0) {
          if (this._requestObj_tags) this._requestObj_tags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_tags = httpFetch(this.getInfoUrl());
          return this._requestObj_tags.promise.then(({ body }) => {
            if (body.status !== 1) return this.getTags(++tryNum);
            return {
              hotTag: this.filterInfoHotTag(body.data.hotTag),
              tags: this.filterTagInfo(body.data.tagids),
              source: "kg"
            };
          });
        },
        getDetailPageUrl(id) {
          if (typeof id == "string") {
            if (/^https?:\/\//.test(id)) return id;
            id = id.replace("id_", "");
          }
          return `https://www.kugou.com/yy/special/single/${id}.html`;
        },
        search(text, page, limit = 20) {
          return httpFetch(`http://msearchretry.kugou.com/api/v3/search/special?keyword=${encodeURIComponent(text)}&page=${page}&pagesize=${limit}&showtype=10&filter=0&version=7910&sver=2`).promise.then(({ body }) => {
            if (body.errcode != 0) throw new Error("filed");
            return {
              list: body.data.info.map((item) => {
                return {
                  play_count: this.formatPlayCount(item.playcount),
                  id: "id_" + item.specialid,
                  author: item.nickname,
                  name: item.specialname,
                  time: dateFormat(item.publishtime, "Y-M-D"),
                  img: item.imgurl,
                  grade: item.grade,
                  desc: item.intro,
                  total: item.songcount,
                  source: "kg"
                };
              }),
              limit,
              total: body.data.total,
              source: "kg"
            };
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/musicSearch.js
  var musicSearch_default2;
  var init_musicSearch2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/musicSearch.js"() {
      init_request();
      init_utils();
      musicSearch_default2 = {
        limit: 30,
        total: 0,
        page: 0,
        allPage: 1,
        musicSearch(str, page, limit) {
          const searchRequest = httpFetch(`https://songsearch.kugou.com/song_search_v2?keyword=${encodeURIComponent(str)}&page=${page}&pagesize=${limit}&userid=0&clientver=&platform=WebFilter&filter=2&iscorrection=1&privilege_filter=0`);
          return searchRequest.promise.then(({ body }) => body);
        },
        filterData(rawData) {
          const types = [];
          const _types = {};
          if (rawData.FileSize !== 0) {
            let size = sizeFormate(rawData.FileSize);
            types.push({ type: "128k", size, hash: rawData.FileHash });
            _types["128k"] = {
              size,
              hash: rawData.FileHash
            };
          }
          if (rawData.HQFileSize !== 0) {
            let size = sizeFormate(rawData.HQFileSize);
            types.push({ type: "320k", size, hash: rawData.HQFileHash });
            _types["320k"] = {
              size,
              hash: rawData.HQFileHash
            };
          }
          if (rawData.SQFileSize !== 0) {
            let size = sizeFormate(rawData.SQFileSize);
            types.push({ type: "flac", size, hash: rawData.SQFileHash });
            _types.flac = {
              size,
              hash: rawData.SQFileHash
            };
          }
          if (rawData.ResFileSize !== 0) {
            let size = sizeFormate(rawData.ResFileSize);
            types.push({ type: "flac24bit", size, hash: rawData.ResFileHash });
            _types.flac24bit = {
              size,
              hash: rawData.ResFileHash
            };
          }
          return {
            singer: decodeName(rawData.SingerName),
            name: decodeName(rawData.SongName),
            albumName: decodeName(rawData.AlbumName),
            albumId: rawData.AlbumID,
            songmid: rawData.Audioid,
            source: "kg",
            interval: formatPlayTime(rawData.Duration),
            _interval: rawData.Duration,
            img: null,
            lrc: null,
            otherSource: null,
            hash: rawData.FileHash,
            types,
            _types,
            typeUrl: {},
            mv: rawData.MvHash || null
          };
        },
        handleResult(rawData) {
          let ids = /* @__PURE__ */ new Set();
          const list = [];
          rawData.forEach((item) => {
            const key = item.Audioid + item.FileHash;
            if (ids.has(key)) return;
            ids.add(key);
            list.push(this.filterData(item));
            for (const childItem of item.Grp) {
              const key2 = item.Audioid + item.FileHash;
              if (ids.has(key2)) continue;
              ids.add(key2);
              list.push(this.filterData(childItem));
            }
          });
          return list;
        },
        search(str, page = 1, limit, retryNum = 0) {
          if (++retryNum > 3) return Promise.reject(new Error("try max num"));
          if (limit == null) limit = this.limit;
          return this.musicSearch(str, page, limit).then((result) => {
            if (!result || result.error_code !== 0) return this.search(str, page, limit, retryNum);
            let list = this.handleResult(result.data.lists);
            if (list == null) return this.search(str, page, limit, retryNum);
            this.total = result.data.total;
            this.page = page;
            this.allPage = Math.ceil(this.total / limit);
            return Promise.resolve({
              list,
              allPage: this.allPage,
              limit,
              total: this.total,
              source: "kg"
            });
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/pic.js
  var pic_default2;
  var init_pic2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/pic.js"() {
      init_request();
      pic_default2 = {
        getPic(songInfo) {
          const requestObj = httpFetch(
            "http://media.store.kugou.com/v1/get_res_privilege",
            {
              method: "POST",
              headers: {
                "KG-RC": 1,
                "KG-THash": "expand_search_manager.cpp:852736169:451",
                "User-Agent": "KuGou2012-9020-ExpandSearchManager"
              },
              body: {
                appid: 1001,
                area_code: "1",
                behavior: "play",
                clientver: "9020",
                need_hash_offset: 1,
                relate: 1,
                resource: [
                  {
                    album_audio_id: songInfo.songmid.length == 32 ? songInfo.audioId.split("_")[0] : songInfo.songmid,
                    album_id: songInfo.albumId,
                    hash: songInfo.hash,
                    id: 0,
                    name: `${songInfo.singer} - ${songInfo.name}.mp3`,
                    type: "audio"
                  }
                ],
                token: "",
                userid: 2626431536,
                vip: 1
              }
            }
          );
          requestObj.promise = requestObj.promise.then(({ body }) => {
            if (body.error_code !== 0) return Promise.reject("\u56FE\u7247\u83B7\u53D6\u5931\u8D25");
            let info = body.data[0].info;
            const img = info.imgsize ? info.image.replace("{size}", info.imgsize[0]) : info.image;
            if (!img) return Promise.reject("Pic get failed");
            return img;
          });
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/util.js
  var import_buffer3, enc_key, decodeLyric2;
  var init_util2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/util.js"() {
      init_pako_esm();
      import_buffer3 = __toESM(require_buffer());
      enc_key = import_buffer3.Buffer.from([64, 71, 97, 119, 94, 50, 116, 71, 81, 54, 49, 45, 206, 210, 110, 105], "binary");
      decodeLyric2 = (str) => new Promise((resolve, reject) => {
        if (!str.length) return;
        const buf_str = import_buffer3.Buffer.from(str, "base64").slice(4);
        for (let i = 0, len = buf_str.length; i < len; i++) {
          buf_str[i] = buf_str[i] ^ enc_key[i % 16];
        }
        const result = pako.inflate(buf_str, { to: "string" });
        resolve(result);
      });
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/lyric.js
  var headExp, parseLyric, lyric_default2;
  var init_lyric2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/lyric.js"() {
      init_request();
      init_util2();
      init_utils();
      headExp = /^.*\[id:\$\w+\]\n/;
      parseLyric = (str) => {
        str = str.replace(/\r/g, "");
        if (headExp.test(str)) str = str.replace(headExp, "");
        let trans = str.match(/\[language:([\w=\\/+]+)\]/);
        let lyric;
        let rlyric;
        let tlyric;
        if (trans) {
          str = str.replace(/\[language:[\w=\\/+]+\]\n/, "");
          let json = JSON.parse(Buffer.from(trans[1], "base64").toString());
          for (const item of json.content) {
            switch (item.type) {
              case 0:
                rlyric = item.lyricContent;
                break;
              case 1:
                tlyric = item.lyricContent;
                break;
            }
          }
        }
        let i = 0;
        let lxlyric = str.replace(/\[((\d+),\d+)\].*/g, (str2) => {
          let result = str2.match(/\[((\d+),\d+)\].*/);
          let time = parseInt(result[2]);
          let ms = time % 1e3;
          time /= 1e3;
          let m = parseInt(time / 60).toString().padStart(2, "0");
          time %= 60;
          let s = parseInt(time).toString().padStart(2, "0");
          time = `${m}:${s}.${ms}`;
          if (rlyric) rlyric[i] = `[${time}]${rlyric[i]?.join("") ?? ""}`;
          if (tlyric) tlyric[i] = `[${time}]${tlyric[i]?.join("") ?? ""}`;
          i++;
          return str2.replace(result[1], time);
        });
        rlyric = rlyric ? rlyric.join("\n") : "";
        tlyric = tlyric ? tlyric.join("\n") : "";
        lxlyric = lxlyric.replace(/<(\d+,\d+),\d+>/g, "<$1>");
        lxlyric = decodeName(lxlyric);
        lyric = lxlyric.replace(/<\d+,\d+>/g, "");
        rlyric = decodeName(rlyric);
        tlyric = decodeName(tlyric);
        return {
          lyric,
          tlyric,
          rlyric,
          lxlyric
        };
      };
      lyric_default2 = {
        getIntv(interval) {
          let intvArr = interval.split(":");
          let intv = 0;
          let unit = 1;
          while (intvArr.length) {
            intv += intvArr.pop() * unit;
            unit *= 60;
          }
          return parseInt(intv);
        },
        // getLyric(songInfo, tryNum = 0) {
        //   let requestObj = httpFetch(`http://m.kugou.com/app/i/krc.php?cmd=100&keyword=${encodeURIComponent(songInfo.name)}&hash=${songInfo.hash}&timelength=${songInfo._interval || this.getIntv(songInfo.interval)}&d=0.38664927426725626`, {
        //     headers: {
        //       'KG-RC': 1,
        //       'KG-THash': 'expand_search_manager.cpp:852736169:451',
        //       'User-Agent': 'KuGou2012-9020-ExpandSearchManager',
        //     },
        //   })
        //   requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
        //     if (statusCode !== 200) {
        //       if (tryNum > 5) return Promise.reject('歌词获取失败')
        //       let tryRequestObj = this.getLyric(songInfo, ++tryNum)
        //       requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj)
        //       return tryRequestObj.promise
        //     }
        //     return {
        //       lyric: body,
        //       tlyric: '',
        //     }
        //   })
        //   return requestObj
        // },
        searchLyric(name, hash, time, tryNum = 0) {
          let requestObj = httpFetch(`http://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${encodeURIComponent(name)}&hash=${hash}&timelength=${time}`, {
            headers: {
              "KG-RC": 1,
              "KG-THash": "expand_search_manager.cpp:852736169:451",
              "User-Agent": "KuGou2012-9020-ExpandSearchManager"
            }
          });
          requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
            if (statusCode !== 200) {
              if (tryNum > 5) return Promise.reject("\u6B4C\u8BCD\u83B7\u53D6\u5931\u8D25");
              let tryRequestObj = this.searchLyric(name, hash, time, ++tryNum);
              requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj);
              return tryRequestObj.promise;
            }
            if (body.candidates.length) {
              let info = body.candidates[0];
              return { id: info.id, accessKey: info.accesskey };
            }
            return null;
          });
          return requestObj;
        },
        getLyricDownload(id, accessKey, tryNum = 0) {
          let requestObj = httpFetch(`http://lyrics.kugou.com/download?ver=1&client=pc&id=${id}&accesskey=${accessKey}&fmt=krc&charset=utf8`, {
            headers: {
              "KG-RC": 1,
              "KG-THash": "expand_search_manager.cpp:852736169:451",
              "User-Agent": "KuGou2012-9020-ExpandSearchManager"
            }
          });
          requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
            if (statusCode !== 200) {
              if (tryNum > 5) return Promise.reject("\u6B4C\u8BCD\u83B7\u53D6\u5931\u8D25");
              let tryRequestObj = this.getLyric(id, accessKey, ++tryNum);
              requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj);
              return tryRequestObj.promise;
            }
            return decodeLyric2(body.content).then((result) => parseLyric(result));
          });
          return requestObj;
        },
        getLyric(songInfo, tryNum = 0) {
          let requestObj = this.searchLyric(songInfo.name, songInfo.hash, songInfo._interval || this.getIntv(songInfo.interval));
          requestObj.promise = requestObj.promise.then((result) => {
            if (!result) return Promise.reject(new Error("Get lyric failed"));
            let requestObj2 = this.getLyricDownload(result.id, result.accessKey);
            requestObj.cancelHttp = requestObj2.cancelHttp.bind(requestObj2);
            return requestObj2.promise;
          });
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/hotSearch.js
  var hotSearch_default2;
  var init_hotSearch2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/hotSearch.js"() {
      init_request();
      init_utils();
      hotSearch_default2 = {
        _requestObj: null,
        async getList(retryNum = 0) {
          if (this._requestObj) this._requestObj.cancelHttp();
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          const _requestObj = httpFetch("http://gateway.kugou.com/api/v3/search/hot_tab?signature=ee44edb9d7155821412d220bcaf509dd&appid=1005&clientver=10026&plat=0", {
            method: "get",
            cache: null,
            headers: {
              dfid: "1ssiv93oVqMp27cirf2CvoF1",
              mid: "156798703528610303473757548878786007104",
              clienttime: 1584257267,
              "x-router": "msearch.kugou.com",
              "user-agent": "Android9-AndroidPhone-10020-130-0-searchrecommendprotocol-wifi",
              "kg-rc": 1
            }
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.errcode !== 0) throw new Error("\u83B7\u53D6\u70ED\u641C\u8BCD\u5931\u8D25");
          return { source: "kg", list: this.filterList(body.data.list) };
        },
        filterList(rawList) {
          const list = [];
          rawList.forEach((item) => {
            item.keywords.map((k) => list.push(decodeName(k.keyword)));
          });
          return list;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/comment.js
  var signatureParams, comment_default2;
  var init_comment2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/comment.js"() {
      init_request();
      init_utils();
      init_utils2();
      signatureParams = (params) => {
        let OIlwieks = "28dk2k092lksi2UIkp";
        let sign_params = `OIlwieks${OIlwieks}${params.replace(/&/g, "")}OIlwieks${OIlwieks}`;
        return toMD5(sign_params);
      };
      comment_default2 = {
        _requestObj: null,
        _requestObj2: null,
        async getComment({ hash }, page = 1, limit = 20) {
          if (this._requestObj) this._requestObj.cancelHttp();
          let timestamp = Date.now();
          const params = `appid=1005&clienttime=${timestamp}&clienttoken=0&clientver=11409&code=fc4be23b4e972707f36b8a828a93ba8a&dfid=0&extdata=${hash}&kugouid=0&mid=16249512204336365674023395779019&mixsongid=0&p=${page}&pagesize=${limit}&uuid=0&ver=10`;
          let signature = signatureParams(params);
          const _requestObj = httpFetch(`http://m.comment.service.kugou.com/v1/cmtlist?${params}&signature=${signature}`, {
            cache: "default",
            headers: {
              "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.24"
            }
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.err_code !== 0) throw new Error("\u83B7\u53D6\u8BC4\u8BBA\u5931\u8D25");
          return { source: "kg", comments: this.filterComment(body.list || []), total: body.count, page, limit, maxPage: body.maxPage };
        },
        async getHotComment({ hash }, page = 1, limit = 20) {
          if (this._requestObj2) this._requestObj2.cancelHttp();
          let timestamp = Date.now();
          const params = `appid=1005&clienttime=${timestamp}&clienttoken=0&clientver=11409&code=fc4be23b4e972707f36b8a828a93ba8a&dfid=0&extdata=${hash}&kugouid=0&mid=16249512204336365674023395779019&mixsongid=0&p=${page}&pagesize=${limit}&uuid=0&ver=10`;
          let signature = signatureParams(params);
          const _requestObj2 = httpFetch(`http://m.comment.service.kugou.com/v1/weightlist?${params}&signature=${signature}`, {
            cache: "default",
            headers: {
              "User-Agent": "Android712-AndroidPhone-8983-18-0-COMMENT-wifi"
            }
          });
          const { body, statusCode } = await _requestObj2.promise;
          if (statusCode != 200 || body.err_code !== 0) throw new Error("\u83B7\u53D6\u70ED\u95E8\u8BC4\u8BBA\u5931\u8D25");
          const total = body.count ?? 0;
          return { source: "kg", comments: this.filterComment(body.list || []), total, page, limit, maxPage: Math.ceil(body.count / limit) || 1 };
        },
        async getReplyComment({ songmid, audioId }, replyId, page = 1, limit = 100) {
          if (this._requestObj2) this._requestObj2.cancelHttp();
          songmid = songmid.length == 32 ? audioId.split("_")[0] : songmid;
          const _requestObj2 = httpFetch(`http://comment.service.kugou.com/index.php?r=commentsv2/getReplyWithLike&code=fc4be23b4e972707f36b8a828a93ba8a&p=${page}&pagesize=${limit}&ver=1.01&clientver=8373&kugouid=687373022&need_show_image=1&appid=1001&childrenid=${songmid}&tid=${replyId}`, {
            headers: {
              "User-Agent": "Android712-AndroidPhone-8983-18-0-COMMENT-wifi"
            }
          });
          const { body, statusCode } = await _requestObj2.promise;
          if (statusCode != 200 || body.err_code !== 0) throw new Error("\u83B7\u53D6\u56DE\u590D\u8BC4\u8BBA\u5931\u8D25");
          return { source: "kg", comments: this.filterComment(body.list || []) };
        },
        filterComment(rawList) {
          return rawList.map((item) => {
            let data = {
              id: item.id,
              text: decodeName(item.content || "").split("\n"),
              images: item.images ? item.images.map((i) => i.url) : [],
              location: item.location,
              time: item.addtime,
              timeStr: dateFormat2(new Date(item.addtime).getTime()),
              userName: item.user_name,
              avatar: item.user_pic,
              userId: item.user_id,
              likedCount: item.like.likenum,
              replyNum: item.reply_num,
              reply: []
            };
            return item.pcontent ? {
              id: item.id,
              text: decodeName(item.pcontent).split("\n"),
              time: null,
              userName: item.puser,
              avatar: null,
              userId: item.puser_id,
              likedCount: null,
              replyNum: null,
              reply: [data]
            } : data;
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/index.js
  var kg, kg_default;
  var init_kg = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/kg/index.js"() {
      init_leaderboard2();
      init_api_source();
      init_songList2();
      init_musicSearch2();
      init_pic2();
      init_lyric2();
      init_hotSearch2();
      init_comment2();
      kg = {
        leaderboard: leaderboard_default2,
        songList: songList_default2,
        musicSearch: musicSearch_default2,
        hotSearch: hotSearch_default2,
        comment: comment_default2,
        getMusicUrl(songInfo, type) {
          return apis("kg").getMusicUrl(songInfo, type);
        },
        mv: {
          getMvUrl(mvHash, retryNum) {
            if (retryNum == null) retryNum = 0;
            if (retryNum > 2) return Promise.reject(new Error("try max num"));
            const requestObj = httpFetch(
              `http://m.kugou.com/app/i/mv.php?cmd=100&hash=${mvHash}&ismp3=1&ext=mp4`,
              {
                headers: {
                  "User-Agent": "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36"
                }
              }
            );
            return requestObj.promise.then(({ body, statusCode }) => {
              if (statusCode !== 200 || !body || !body.mvdata) {
                return kg.mv.getMvUrl(mvHash, retryNum + 1);
              }
              // 画质优先级：超清(sq) > 标清(le) > 流畅(rq)
              const mvdata = body.mvdata;
              const quality = mvdata.sq || mvdata.le || mvdata.rq || null;
              if (!quality || !quality.downurl) {
                return Promise.reject(new Error("获取MV链接失败"));
              }
              return { url: quality.downurl };
            });
          },
          // mobile listMvRefresh 同款：聚合接口不返回 mvhash，
          // 用 v3/song/info 直接查单首歌（已实测返回 data.mvhash），空表示没有 MV
          getMvInfo(musicInfo) {
            const requestObj = httpFetch(
              `http://mobilecdnbj.kugou.com/api/v3/song/info?hash=${musicInfo.hash}&version=9108&plat=0&area_code=1`,
              {
                headers: {
                  "User-Agent": "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36"
                }
              }
            );
            requestObj.promise = requestObj.promise.then(({ body }) => {
              return (body && body.data && body.data.mvhash) || null;
            });
            return requestObj;
          }
        },
        getLyric(songInfo) {
          return lyric_default2.getLyric(songInfo);
        },
        // getLyric(songInfo) {
        //   return apis('kg').getLyric(songInfo)
        // },
        getPic(songInfo) {
          return pic_default2.getPic(songInfo);
        },
        getMusicDetailPageUrl(songInfo) {
          return `https://www.kugou.com/song/#hash=${songInfo.hash}&album_id=${songInfo.albumId}`;
        }
        // getPic(songInfo) {
        //   return apis('kg').getPic(songInfo)
        // },
      };
      kg_default = kg;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/leaderboard.js
  var boardList3, leaderboard_default3;
  var init_leaderboard3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/leaderboard.js"() {
      init_request();
      init_utils();
      boardList3 = [{ id: "tx__4", name: "\u6D41\u884C\u6307\u6570\u699C", bangid: "4" }, { id: "tx__26", name: "\u70ED\u6B4C\u699C", bangid: "26" }, { id: "tx__27", name: "\u65B0\u6B4C\u699C", bangid: "27" }, { id: "tx__62", name: "\u98D9\u5347\u699C", bangid: "62" }, { id: "tx__58", name: "\u8BF4\u5531\u699C", bangid: "58" }, { id: "tx__57", name: "\u7535\u97F3\u699C", bangid: "57" }, { id: "tx__28", name: "\u7F51\u7EDC\u6B4C\u66F2\u699C", bangid: "28" }, { id: "tx__5", name: "\u5185\u5730\u699C", bangid: "5" }, { id: "tx__3", name: "\u6B27\u7F8E\u699C", bangid: "3" }, { id: "tx__59", name: "\u9999\u6E2F\u5730\u533A\u699C", bangid: "59" }, { id: "tx__16", name: "\u97E9\u56FD\u699C", bangid: "16" }, { id: "tx__60", name: "\u6296\u97F3\u6392\u884C\u699C", bangid: "60" }, { id: "tx__29", name: "\u5F71\u89C6\u91D1\u66F2\u699C", bangid: "29" }, { id: "tx__17", name: "\u65E5\u672C\u699C", bangid: "17" }, { id: "tx__52", name: "\u817E\u8BAF\u97F3\u4E50\u4EBA\u539F\u521B\u699C", bangid: "52" }, { id: "tx__36", name: "K\u6B4C\u91D1\u66F2\u699C", bangid: "36" }, { id: "tx__61", name: "\u53F0\u6E7E\u5730\u533A\u699C", bangid: "61" }, { id: "tx__63", name: "DJ\u821E\u66F2\u699C", bangid: "63" }, { id: "tx__64", name: "\u7EFC\u827A\u65B0\u6B4C\u699C", bangid: "64" }, { id: "tx__65", name: "\u56FD\u98CE\u70ED\u6B4C\u699C", bangid: "65" }, { id: "tx__66", name: "ACG\u65B0\u6B4C\u699C", bangid: "66" }, { id: "tx__67", name: "\u542C\u6B4C\u8BC6\u66F2\u699C", bangid: "67" }, { id: "tx__70", name: "\u8FBE\u4EBA\u97F3\u4E50\u699C", bangid: "70" }];
      leaderboard_default3 = {
        limit: 300,
        list: [
          {
            id: "txlxzsb",
            name: "\u6D41\u884C\u699C",
            bangid: 4
          },
          {
            id: "txrgb",
            name: "\u70ED\u6B4C\u699C",
            bangid: 26
          },
          {
            id: "txwlhgb",
            name: "\u7F51\u7EDC\u699C",
            bangid: 28
          },
          {
            id: "txdyb",
            name: "\u6296\u97F3\u699C",
            bangid: 60
          },
          {
            id: "txndb",
            name: "\u5185\u5730\u699C",
            bangid: 5
          },
          {
            id: "txxgb",
            name: "\u9999\u6E2F\u699C",
            bangid: 59
          },
          {
            id: "txtwb",
            name: "\u53F0\u6E7E\u699C",
            bangid: 61
          },
          {
            id: "txoumb",
            name: "\u6B27\u7F8E\u699C",
            bangid: 3
          },
          {
            id: "txhgb",
            name: "\u97E9\u56FD\u699C",
            bangid: 16
          },
          {
            id: "txrbb",
            name: "\u65E5\u672C\u699C",
            bangid: 17
          },
          {
            id: "txtybb",
            name: "YouTube\u699C",
            bangid: 128
          }
        ],
        listDetailRequest(id, period, limit) {
          return httpFetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
            method: "post",
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)"
            },
            body: {
              toplist: {
                module: "musicToplist.ToplistInfoServer",
                method: "GetDetail",
                param: {
                  topid: id,
                  num: limit,
                  period
                }
              },
              comm: {
                uin: 0,
                format: "json",
                ct: 20,
                cv: 1859
              }
            }
          }).promise;
        },
        regExps: {
          periodList: /<i class="play_cover__btn c_tx_link js_icon_play" data-listkey=".+?" data-listname=".+?" data-tid=".+?" data-date=".+?" .+?<\/i>/g,
          period: /data-listname="(.+?)" data-tid=".*?\/(.+?)" data-date="(.+?)" .+?<\/i>/
        },
        periods: {},
        periodUrl: "https://c.y.qq.com/node/pc/wk_v15/top.html",
        _requestBoardsObj: null,
        getBoardsData() {
          if (this._requestBoardsObj) this._requestBoardsObj.cancelHttp();
          this._requestBoardsObj = httpFetch("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&uin=0&needNewCode=1&platform=h5");
          return this._requestBoardsObj.promise;
        },
        getData(url) {
          const requestDataObj = httpFetch(url);
          return requestDataObj.promise;
        },
        getSinger(singers) {
          let arr = [];
          singers.forEach((singer) => {
            arr.push(singer.name);
          });
          return arr.join("\u3001");
        },
        filterData(rawList) {
          return rawList.map((item) => {
            let types = [];
            let _types = {};
            if (item.file.size_128mp3 !== 0) {
              let size = sizeFormate(item.file.size_128mp3);
              types.push({ type: "128k", size });
              _types["128k"] = {
                size
              };
            }
            if (item.file.size_320mp3 !== 0) {
              let size = sizeFormate(item.file.size_320mp3);
              types.push({ type: "320k", size });
              _types["320k"] = {
                size
              };
            }
            if (item.file.size_flac !== 0) {
              let size = sizeFormate(item.file.size_flac);
              types.push({ type: "flac", size });
              _types.flac = {
                size
              };
            }
            if (item.file.size_hires !== 0) {
              let size = sizeFormate(item.file.size_hires);
              types.push({ type: "flac24bit", size });
              _types.flac24bit = {
                size
              };
            }
            return {
              singer: this.getSinger(item.singer),
              name: item.name,
              albumName: item.album.name,
              albumId: item.album.mid,
              source: "tx",
              interval: formatPlayTime(item.interval),
              songId: item.id,
              albumMid: item.album.mid,
              strMediaMid: item.file.media_mid,
              songmid: item.mid,
              img: item.album.name === "" || item.album.name === "\u7A7A" ? item.singer?.length ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg` : "" : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${item.album.mid}.jpg`,
              lrc: null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        getPeriods(bangid) {
          return this.getData(this.periodUrl).then(({ body: html }) => {
            let result = html.match(this.regExps.periodList);
            if (!result) return Promise.reject(new Error("get data failed"));
            result.forEach((item) => {
              let result2 = item.match(this.regExps.period);
              if (!result2) return;
              this.periods[result2[2]] = {
                name: result2[1],
                bangid: result2[2],
                period: result2[3]
              };
            });
            const info = this.periods[bangid];
            return info && info.period;
          });
        },
        filterBoardsData(rawList) {
          let list = [];
          for (const board of rawList) {
            if (board.id == 201) continue;
            if (board.topTitle.startsWith("\u5DC5\u5CF0\u699C\xB7")) {
              board.topTitle = board.topTitle.substring(4, board.topTitle.length);
            }
            if (!board.topTitle.endsWith("\u699C")) board.topTitle += "\u699C";
            list.push({
              id: "tx__" + board.id,
              name: board.topTitle,
              bangid: String(board.id)
            });
          }
          return list;
        },
        async getBoards(retryNum = 0) {
          this.list = boardList3;
          return {
            list: boardList3,
            source: "tx"
          };
        },
        getList(bangid, page, retryNum = 0) {
          if (++retryNum > 3) return Promise.reject(new Error("try max num"));
          bangid = parseInt(bangid);
          let info = this.periods[bangid];
          let p = info ? Promise.resolve(info.period) : this.getPeriods(bangid);
          return p.then((period) => {
            return this.listDetailRequest(bangid, period, this.limit).then((resp) => {
              if (resp.body.code !== 0) return this.getList(bangid, page, retryNum);
              return {
                total: resp.body.toplist.data.songInfoList.length,
                list: this.filterData(resp.body.toplist.data.songInfoList),
                limit: this.limit,
                page: 1,
                source: "tx"
              };
            });
          });
        },
        getDetailPageUrl(id) {
          if (typeof id == "string") id = id.replace("tx__", "");
          return `https://y.qq.com/n/ryqq/toplist/${id}`;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/lyric.js
  var lyric_default3;
  var init_lyric3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/lyric.js"() {
      init_request();
      init_utils();
      lyric_default3 = {
        regexps: {
          matchLrc: /.+"lyric":"([\w=+/]*)".+/
        },
        getLyric(songmid) {
          const requestObj = httpFetch(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&platform=yqq`, {
            headers: {
              Referer: "https://y.qq.com/portal/player.html"
            }
          });
          requestObj.promise = requestObj.promise.then(({ body }) => {
            if (body.code != 0 || !body.lyric) return Promise.reject(new Error("Get lyric failed"));
            return {
              lyric: decodeName(b64DecodeUnicode(body.lyric)),
              tlyric: decodeName(b64DecodeUnicode(body.trans))
            };
          });
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/songList.js
  var songList_default3;
  var init_songList3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/songList.js"() {
      init_request();
      init_utils();
      songList_default3 = {
        _requestObj_tags: null,
        _requestObj_hotTags: null,
        _requestObj_list: null,
        limit_list: 36,
        limit_song: 1e5,
        successCode: 0,
        sortList: [
          {
            name: "\u6700\u70ED",
            tid: "hot",
            id: 5
          },
          {
            name: "\u6700\u65B0",
            tid: "new",
            id: 2
          }
        ],
        regExps: {
          hotTagHtml: /class="c_bg_link js_tag_item" data-id="\w+">.+?<\/a>/g,
          hotTag: /data-id="(\w+)">(.+?)<\/a>/,
          // https://y.qq.com/n/yqq/playlist/7217720898.html
          // https://i.y.qq.com/n2/m/share/details/taoge.html?platform=11&appshare=android_qq&appversion=9050006&id=7217720898&ADTAG=qfshare
          listDetailLink: /\/playlist\/(\d+)/,
          listDetailLink2: /id=(\d+)/
        },
        tagsUrl: "https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=%7B%22tags%22%3A%7B%22method%22%3A%22get_all_categories%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22playlist.PlaylistAllCategoriesServer%22%7D%7D",
        hotTagUrl: "https://c.y.qq.com/node/pc/wk_v15/category_playlist.html",
        getListUrl(sortId, id, page) {
          if (id) {
            id = parseInt(id);
            return `https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=${encodeURIComponent(JSON.stringify({
              comm: { cv: 1602, ct: 20 },
              playlist: {
                method: "get_category_content",
                param: {
                  titleid: id,
                  caller: "0",
                  category_id: id,
                  size: this.limit_list,
                  page: page - 1,
                  use_page: 1
                },
                module: "playlist.PlayListCategoryServer"
              }
            }))}`;
          }
          return `https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=${encodeURIComponent(JSON.stringify({
            comm: { cv: 1602, ct: 20 },
            playlist: {
              method: "get_playlist_by_tag",
              param: { id: 1e7, sin: this.limit_list * (page - 1), size: this.limit_list, order: sortId, cur_page: page },
              module: "playlist.PlayListPlazaServer"
            }
          }))}`;
        },
        getListDetailUrl(id) {
          return `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&disstid=${id}&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`;
        },
        // http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=2849349915&pn=0&rn=100&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1
        // 获取标签
        getTag(tryNum = 0) {
          if (this._requestObj_tags) this._requestObj_tags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_tags = httpFetch(this.tagsUrl);
          return this._requestObj_tags.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getTag(++tryNum);
            return this.filterTagInfo(body.tags.data.v_group);
          });
        },
        // 获取标签
        getHotTag(tryNum = 0) {
          if (this._requestObj_hotTags) this._requestObj_hotTags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_hotTags = httpFetch(this.hotTagUrl);
          return this._requestObj_hotTags.promise.then(({ statusCode, body }) => {
            if (statusCode !== 200) return this.getHotTag(++tryNum);
            return this.filterInfoHotTag(body);
          });
        },
        filterInfoHotTag(html) {
          let hotTag = html.match(this.regExps.hotTagHtml);
          const hotTags = [];
          if (!hotTag) return hotTags;
          hotTag.forEach((tagHtml) => {
            let result = tagHtml.match(this.regExps.hotTag);
            if (!result) return;
            hotTags.push({
              id: parseInt(result[1]),
              name: result[2],
              source: "tx"
            });
          });
          return hotTags;
        },
        filterTagInfo(rawList) {
          return rawList.map((type) => ({
            name: type.group_name,
            list: type.v_item.map((item) => ({
              parent_id: type.group_id,
              parent_name: type.group_name,
              id: item.id,
              name: item.name,
              source: "tx"
            }))
          }));
        },
        // 获取列表数据
        getList(sortId, tagId, page, tryNum = 0) {
          if (this._requestObj_list) this._requestObj_list.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_list = httpFetch(
            this.getListUrl(sortId, tagId, page)
          );
          return this._requestObj_list.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getList(sortId, tagId, page, ++tryNum);
            return tagId ? this.filterList2(body.playlist.data, page) : this.filterList(body.playlist.data, page);
          });
        },
        /**
         * 格式化播放数量
         * @param {*} num
         */
        formatPlayCount(num) {
          if (num > 1e8) return parseInt(num / 1e7) / 10 + "\u4EBF";
          if (num > 1e4) return parseInt(num / 1e3) / 10 + "\u4E07";
          return num;
        },
        filterList(data, page) {
          return {
            list: data.v_playlist.map((item) => ({
              play_count: this.formatPlayCount(item.access_num),
              id: item.tid,
              author: item.creator_info.nick,
              name: item.title,
              time: item.modify_time ? dateFormat(item.modify_time * 1e3, "Y-M-D") : "",
              img: item.cover_url_medium,
              // grade: item.favorcnt / 10,
              total: item.song_ids?.length,
              desc: item.desc,
              source: "tx"
            })),
            total: data.total,
            page,
            limit: this.limit_list,
            source: "tx"
          };
        },
        filterList2({ content }, page) {
          return {
            list: content.v_item.map(({ basic }) => ({
              play_count: this.formatPlayCount(basic.play_cnt),
              id: basic.tid,
              author: basic.creator.nick,
              name: basic.title,
              // time: basic.publish_time,
              img: basic.cover.medium_url || basic.cover.default_url,
              // grade: basic.favorcnt / 10,
              desc: decodeName(basic.desc).replace(/<br>/g, "\n"),
              source: "tx"
            })),
            total: content.total_cnt,
            page,
            limit: this.limit_list,
            source: "tx"
          };
        },
        async handleParseId(link, retryNum = 0) {
          if (retryNum > 2) return Promise.reject(new Error("link try max num"));
          const requestObj_listDetailLink = httpFetch(link);
          const { url, statusCode } = await requestObj_listDetailLink.promise;
          if (statusCode > 400) return this.handleParseId(link, ++retryNum);
          return url;
        },
        async getListId(id) {
          if (/[?&:/]/.test(id)) {
            if (!this.regExps.listDetailLink.test(id)) {
              id = await this.handleParseId(id);
            }
            let result = this.regExps.listDetailLink.exec(id);
            if (!result) {
              result = this.regExps.listDetailLink2.exec(id);
              if (!result) throw new Error("failed");
            }
            id = result[1];
          }
          return id;
        },
        // 获取歌曲列表内的音乐
        async getListDetail(id, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          id = await this.getListId(id);
          const requestObj_listDetail = httpFetch(this.getListDetailUrl(id), {
            headers: {
              Origin: "https://y.qq.com",
              Referer: `https://y.qq.com/n/yqq/playsquare/${id}.html`
            }
          });
          const { body } = await requestObj_listDetail.promise;
          if (body.code !== this.successCode) return this.getListDetail(id, ++tryNum);
          const cdlist = body.cdlist[0];
          return {
            list: this.filterListDetail(cdlist.songlist),
            page: 1,
            limit: cdlist.songlist.length + 1,
            total: cdlist.songlist.length,
            source: "tx",
            info: {
              name: cdlist.dissname,
              img: cdlist.logo,
              desc: decodeName(cdlist.desc).replace(/<br>/g, "\n"),
              author: cdlist.nickname,
              play_count: this.formatPlayCount(cdlist.visitnum)
            }
          };
        },
        getSinger(singers) {
          let arr = [];
          singers.forEach((singer) => {
            arr.push(singer.name);
          });
          return arr.join("\u3001");
        },
        filterListDetail(rawList) {
          return rawList.map((item) => {
            let types = [];
            let _types = {};
            if (item.file.size_128mp3 !== 0) {
              let size = sizeFormate(item.file.size_128mp3);
              types.push({ type: "128k", size });
              _types["128k"] = {
                size
              };
            }
            if (item.file.size_320mp3 !== 0) {
              let size = sizeFormate(item.file.size_320mp3);
              types.push({ type: "320k", size });
              _types["320k"] = {
                size
              };
            }
            if (item.file.size_flac !== 0) {
              let size = sizeFormate(item.file.size_flac);
              types.push({ type: "flac", size });
              _types.flac = {
                size
              };
            }
            if (item.file.size_hires !== 0) {
              let size = sizeFormate(item.file.size_hires);
              types.push({ type: "flac24bit", size });
              _types.flac24bit = {
                size
              };
            }
            return {
              singer: this.getSinger(item.singer),
              name: item.name,
              albumName: item.album.name,
              albumId: item.album.mid,
              source: "tx",
              interval: formatPlayTime(item.interval),
              songId: item.id,
              albumMid: item.album.mid,
              strMediaMid: item.file.media_mid,
              songmid: item.mid,
              img: item.album.name === "" || item.album.name === "\u7A7A" ? item.singer?.length ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg` : "" : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${item.album.mid}.jpg`,
              lrc: null,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        getTags() {
          return Promise.all([this.getTag(), this.getHotTag()]).then(([tags, hotTag]) => ({ tags, hotTag, source: "tx" }));
        },
        async getDetailPageUrl(id) {
          id = await this.getListId(id);
          return `https://y.qq.com/n/ryqq/playlist/${id}`;
        },
        search(text, page, limit = 20, retryNum = 0) {
          if (retryNum > 5) throw new Error("max retry");
          return httpFetch(`http://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist?page_no=${page - 1}&num_per_page=${limit}&format=json&query=${encodeURIComponent(text)}&remoteplace=txt.yqq.playlist&inCharset=utf8&outCharset=utf-8`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)",
              Referer: "http://y.qq.com/portal/search.html"
            }
          }).promise.then(({ body }) => {
            if (body.code != 0) return this.search(text, page, limit, ++retryNum);
            return {
              list: body.data.list.map((item) => {
                return {
                  play_count: this.formatPlayCount(item.listennum),
                  id: item.dissid,
                  author: item.creator.name,
                  name: item.dissname,
                  time: dateFormat(item.createtime, "Y-M-D"),
                  img: item.imgurl,
                  // grade: item.favorcnt / 10,
                  total: item.song_count,
                  desc: item.introduction,
                  source: "tx"
                };
              }),
              limit,
              total: body.data.sum,
              source: "tx"
            };
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/signRequest.js
  var signIndex1, signIndex2, signXorKey, pick, zzcSign, signRequest;
  var init_signRequest = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/signRequest.js"() {
      init_request();
      signIndex1 = [23, 14, 6, 36, 16, 40, 7, 19];
      signIndex2 = [16, 1, 32, 12, 19, 27, 8, 5];
      signXorKey = [89, 39, 179, 150, 218, 82, 58, 252, 177, 52, 186, 123, 120, 64, 242, 133, 143, 161, 121, 179];
      pick = (str, index) => index.map((i) => str[i]).join("");
      zzcSign = async (str) => {
        const hash = await globalThis.__lx_native_call__utils_sha1(str);
        const p = pick(hash, signIndex1);
        const l = pick(hash, signIndex2);
        const s = signXorKey.map((n, t) => n ^ parseInt(hash.slice(2 * t, 2 * t + 2), 16));
        return `zzc${p}${Buffer.from(s).toString("base64").replace(/[\\/+=]/g, "")}${l}`.toLowerCase();
      };
      signRequest = async (data) => {
        const sign = await zzcSign(JSON.stringify(data));
        return httpFetch(`https://u.y.qq.com/cgi-bin/musics.fcg?sign=${sign}`, {
          method: "post",
          headers: {
            "User-Agent": "QQMusic 14090508(android 12)"
          },
          body: data
        }).promise;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/musicSearch.js
  var musicSearch_default3;
  var init_musicSearch3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/musicSearch.js"() {
      init_utils();
      init_signRequest();
      musicSearch_default3 = {
        limit: 50,
        total: 0,
        page: 0,
        allPage: 1,
        successCode: 0,
        musicSearch(str, page, limit, retryNum = 0) {
          if (retryNum > 5) return Promise.reject(new Error("\u641C\u7D22\u5931\u8D25"));
          return signRequest({
            comm: {
              ct: "11",
              cv: "14090508",
              v: "14090508",
              tmeAppID: "qqmusic",
              phonetype: "EBG-AN10",
              deviceScore: "553.47",
              devicelevel: "50",
              newdevicelevel: "20",
              rom: "HuaWei/EMOTION/EmotionUI_14.2.0",
              os_ver: "12",
              OpenUDID: "0",
              OpenUDID2: "0",
              QIMEI36: "0",
              udid: "0",
              chid: "0",
              aid: "0",
              oaid: "0",
              taid: "0",
              tid: "0",
              wid: "0",
              uid: "0",
              sid: "0",
              modeSwitch: "6",
              teenMode: "0",
              ui_mode: "2",
              nettype: "1020",
              v4ip: ""
            },
            req: {
              module: "music.search.SearchCgiService",
              method: "DoSearchForQQMusicMobile",
              param: {
                search_type: 0,
                searchid: Math.random().toString().slice(2),
                query: str,
                page_num: page,
                num_per_page: limit,
                highlight: 0,
                nqc_flag: 0,
                multi_zhida: 0,
                cat: 2,
                grp: 1,
                sin: 0,
                sem: 0
              }
            }
          }).then(({ body }) => {
            if (body && body.req && body.code == this.successCode && body.req.code == this.successCode) return body.req.data;
            return this.musicSearch(str, page, limit, ++retryNum);
          });
        },
        handleResult(rawList) {
          if (!rawList || !Array.isArray(rawList)) return [];
          const list = [];
          rawList.forEach((item) => {
            if (!item.file?.media_mid) return;
            let types = [];
            let _types = {};
            const file = item.file;
            if (file.size_128mp3 != 0) {
              let size = sizeFormate(file.size_128mp3);
              types.push({ type: "128k", size });
              _types["128k"] = {
                size
              };
            }
            if (file.size_320mp3 !== 0) {
              let size = sizeFormate(file.size_320mp3);
              types.push({ type: "320k", size });
              _types["320k"] = {
                size
              };
            }
            if (file.size_flac !== 0) {
              let size = sizeFormate(file.size_flac);
              types.push({ type: "flac", size });
              _types.flac = {
                size
              };
            }
            if (file.size_hires !== 0) {
              let size = sizeFormate(file.size_hires);
              types.push({ type: "flac24bit", size });
              _types.flac24bit = {
                size
              };
            }
            let albumId = "";
            let albumName = "";
            if (item.album) {
              albumName = item.album.name;
              albumId = item.album.mid;
            }
            list.push({
              singer: formatSingerName(item.singer, "name"),
              name: item.title,
              albumName,
              albumId,
              source: "tx",
              interval: formatPlayTime(item.interval),
              songId: item.id,
              albumMid: item.album?.mid ?? "",
              strMediaMid: item.file.media_mid,
              songmid: item.mid,
              img: albumId === "" || albumId === "\u7A7A" ? item.singer?.length ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg` : "" : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${albumId}.jpg`,
              types,
              _types,
              typeUrl: {}
            });
          });
          return list;
        },
        search(str, page = 1, limit) {
          if (limit == null) limit = this.limit;
          return this.musicSearch(str, page, limit).then(({ body, meta }) => {
            let list = this.handleResult(body.item_song);
            this.total = meta.estimate_sum;
            this.page = page;
            this.allPage = Math.ceil(this.total / limit);
            return Promise.resolve({
              list,
              allPage: this.allPage,
              limit,
              total: this.total,
              source: "tx"
            });
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/hotSearch.js
  var hotSearch_default3;
  var init_hotSearch3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/hotSearch.js"() {
      init_request();
      hotSearch_default3 = {
        _requestObj: null,
        async getList(retryNum = 0) {
          if (this._requestObj) this._requestObj.cancelHttp();
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          const _requestObj = httpFetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
            method: "post",
            body: {
              comm: {
                ct: "19",
                cv: "1803",
                guid: "0",
                patch: "118",
                psrf_access_token_expiresAt: 0,
                psrf_qqaccess_token: "",
                psrf_qqopenid: "",
                psrf_qqunionid: "",
                tmeAppID: "qqmusic",
                tmeLoginType: 0,
                uin: "0",
                wid: "0"
              },
              hotkey: {
                method: "GetHotkeyForQQMusicPC",
                module: "tencent_musicsoso_hotkey.HotkeyService",
                param: {
                  search_id: "",
                  uin: 0
                }
              }
            },
            headers: {
              Referer: "https://y.qq.com/portal/player.html"
            }
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.code !== 0) throw new Error("\u83B7\u53D6\u70ED\u641C\u8BCD\u5931\u8D25");
          return { source: "tx", list: this.filterList(body.hotkey.data.vec_hotkey) };
        },
        filterList(rawList) {
          return rawList.map((item) => item.query);
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/musicInfo.js
  var getSinger, musicInfo_default;
  var init_musicInfo = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/musicInfo.js"() {
      init_request();
      init_utils();
      getSinger = (singers) => {
        let arr = [];
        singers.forEach((singer) => {
          arr.push(singer.name);
        });
        return arr.join("\u3001");
      };
      musicInfo_default = (songmid) => {
        const requestObj = httpFetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
          method: "post",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)"
          },
          body: {
            comm: {
              ct: "19",
              cv: "1859",
              uin: "0"
            },
            req: {
              module: "music.pf_song_detail_svr",
              method: "get_song_detail_yqq",
              param: {
                song_type: 0,
                song_mid: songmid
              }
            }
          }
        });
        return requestObj.promise.then(({ body }) => {
          if (body.code != 0 || body.req.code != 0) return Promise.reject("\u83B7\u53D6\u6B4C\u66F2\u4FE1\u606F\u5931\u8D25");
          const item = body.req.data.track_info;
          if (!item.file?.media_mid) return null;
          let types = [];
          let _types = {};
          const file = item.file;
          if (file.size_128mp3 != 0) {
            let size = sizeFormate(file.size_128mp3);
            types.push({ type: "128k", size });
            _types["128k"] = {
              size
            };
          }
          if (file.size_320mp3 !== 0) {
            let size = sizeFormate(file.size_320mp3);
            types.push({ type: "320k", size });
            _types["320k"] = {
              size
            };
          }
          if (file.size_flac !== 0) {
            let size = sizeFormate(file.size_flac);
            types.push({ type: "flac", size });
            _types.flac = {
              size
            };
          }
          if (file.size_hires !== 0) {
            let size = sizeFormate(file.size_hires);
            types.push({ type: "flac24bit", size });
            _types.flac24bit = {
              size
            };
          }
          let albumId = "";
          let albumName = "";
          if (item.album) {
            albumName = item.album.name;
            albumId = item.album.mid;
          }
          return {
            singer: getSinger(item.singer),
            name: item.name,
            albumName,
            albumId,
            source: "tx",
            interval: formatPlayTime(item.interval),
            songId: item.id,
            albumMid: item.album?.mid ?? "",
            strMediaMid: item.file.media_mid,
            songmid: item.mid,
            img: albumId === "" || albumId === "\u7A7A" ? item.singer?.length ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg` : "" : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${albumId}.jpg`,
            types,
            _types,
            typeUrl: {}
          };
        });
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/comment.js
  var emojis, songIdMap, promises, comment_default3;
  var init_comment3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/comment.js"() {
      init_request();
      init_utils();
      init_musicInfo();
      emojis = {
        e400846: "\u{1F618}",
        e400874: "\u{1F634}",
        e400825: "\u{1F603}",
        e400847: "\u{1F619}",
        e400835: "\u{1F60D}",
        e400873: "\u{1F633}",
        e400836: "\u{1F60E}",
        e400867: "\u{1F62D}",
        e400832: "\u{1F60A}",
        e400837: "\u{1F60F}",
        e400875: "\u{1F62B}",
        e400831: "\u{1F609}",
        e400855: "\u{1F621}",
        e400823: "\u{1F604}",
        e400862: "\u{1F628}",
        e400844: "\u{1F616}",
        e400841: "\u{1F613}",
        e400830: "\u{1F608}",
        e400828: "\u{1F606}",
        e400833: "\u{1F60B}",
        e400822: "\u{1F600}",
        e400843: "\u{1F615}",
        e400829: "\u{1F607}",
        e400824: "\u{1F602}",
        e400834: "\u{1F60C}",
        e400877: "\u{1F637}",
        e400132: "\u{1F349}",
        e400181: "\u{1F37A}",
        e401067: "\u2615\uFE0F",
        e400186: "\u{1F967}",
        e400343: "\u{1F437}",
        e400116: "\u{1F339}",
        e400126: "\u{1F343}",
        e400613: "\u{1F48B}",
        e401236: "\u2764\uFE0F",
        e400622: "\u{1F494}",
        e400637: "\u{1F4A3}",
        e400643: "\u{1F4A9}",
        e400773: "\u{1F52A}",
        e400102: "\u{1F31B}",
        e401328: "\u{1F31E}",
        e400420: "\u{1F44F}",
        e400914: "\u{1F64C}",
        e400408: "\u{1F44D}",
        e400414: "\u{1F44E}",
        e401121: "\u270B",
        e400396: "\u{1F44B}",
        e400384: "\u{1F449}",
        e401115: "\u270A",
        e400402: "\u{1F44C}",
        e400905: "\u{1F648}",
        e400906: "\u{1F649}",
        e400907: "\u{1F64A}",
        e400562: "\u{1F47B}",
        e400932: "\u{1F64F}",
        e400644: "\u{1F4AA}",
        e400611: "\u{1F489}",
        e400185: "\u{1F381}",
        e400655: "\u{1F4B0}",
        e400325: "\u{1F425}",
        e400612: "\u{1F48A}",
        e400198: "\u{1F389}",
        e401685: "\u26A1\uFE0F",
        e400631: "\u{1F49D}",
        e400768: "\u{1F525}",
        e400432: "\u{1F451}"
      };
      songIdMap = /* @__PURE__ */ new Map();
      promises = /* @__PURE__ */ new Map();
      comment_default3 = {
        _requestObj: null,
        _requestObj2: null,
        async getSongId({ songId, songmid }) {
          if (songId) return songId;
          if (songIdMap.has(songmid)) return songIdMap.get(songmid);
          if (promises.has(songmid)) return (await promises.get(songmid)).songId;
          const promise = musicInfo_default(songmid);
          promises.set(promise);
          const info = await promise;
          songIdMap.set(songmid, info.songId);
          promises.delete(songmid);
          return info.songId;
        },
        async getComment(mInfo, page = 1, limit = 20) {
          if (this._requestObj) this._requestObj.cancelHttp();
          const songId = await this.getSongId(mInfo);
          const _requestObj = httpFetch("http://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg", {
            method: "POST",
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)"
            },
            form: {
              uin: "0",
              format: "json",
              cid: "205360772",
              reqtype: "2",
              biztype: "1",
              topid: songId,
              cmd: "8",
              needmusiccrit: "1",
              pagenum: page - 1,
              pagesize: limit
            }
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.code !== 0) throw new Error("\u83B7\u53D6\u8BC4\u8BBA\u5931\u8D25");
          const comment = body.comment;
          return {
            source: "tx",
            comments: this.filterComment(comment.commentlist),
            total: comment.commenttotal,
            page,
            limit,
            maxPage: Math.ceil(comment.commenttotal / limit) || 1
          };
        },
        async getHotComment(mInfo, page = 1, limit = 100) {
          if (this._requestObj2) this._requestObj2.cancelHttp();
          const songId = await this.getSongId(mInfo);
          const _requestObj2 = httpFetch("http://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg", {
            method: "POST",
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)"
            },
            form: {
              uin: "0",
              format: "json",
              cid: "205360772",
              reqtype: "2",
              biztype: "1",
              topid: songId,
              cmd: "9",
              needmusiccrit: "1",
              pagenum: page - 1,
              pagesize: limit
            }
          });
          const { body, statusCode } = await _requestObj2.promise;
          if (statusCode != 200 || body.code !== 0) throw new Error("\u83B7\u53D6\u70ED\u95E8\u8BC4\u8BBA\u5931\u8D25");
          const comment = body.comment;
          return {
            source: "tx",
            comments: this.filterComment(comment.commentlist),
            total: comment.commenttotal,
            page,
            limit,
            maxPage: Math.ceil(comment.commenttotal / limit) || 1
          };
        },
        replaceEmoji(msg) {
          let rxp = /^\[em\](e\d+)\[\/em\]$/;
          let result = msg.match(/\[em\]e\d+\[\/em\]/g);
          if (!result) return msg;
          result = Array.from(new Set(result));
          for (let item of result) {
            let code = item.replace(rxp, "$1");
            msg = msg.replace(new RegExp(item.replace("[em]", "\\[em\\]").replace("[/em]", "\\[\\/em\\]"), "g"), emojis[code] || "");
          }
          return msg;
        },
        filterComment(rawList) {
          return rawList.map((item) => {
            let time = String(item.time).length < 10 ? null : parseInt(item.time + "000");
            let timeStr = time ? dateFormat2(time) : null;
            if (item.middlecommentcontent) {
              let firstItem = item.middlecommentcontent[0];
              firstItem.avatarurl = item.avatarurl;
              firstItem.praisenum = item.praisenum;
              item.avatarurl = null;
              item.praisenum = null;
              item.middlecommentcontent.reverse();
            }
            return {
              id: `${item.rootcommentid}_${item.commentid}`,
              rootId: item.rootcommentid,
              text: item.rootcommentcontent ? this.replaceEmoji(item.rootcommentcontent).replace(/\\n/g, "\n").split("\n") : [],
              time: item.rootcommentid == item.commentid ? time : null,
              timeStr: item.rootcommentid == item.commentid ? timeStr : null,
              userName: item.rootcommentnick ? item.rootcommentnick.substring(1) : "",
              avatar: item.avatarurl,
              userId: item.encrypt_rootcommentuin,
              likedCount: item.praisenum,
              reply: item.middlecommentcontent ? item.middlecommentcontent.map((c) => {
                return {
                  id: `sub_${item.rootcommentid}_${c.subcommentid}`,
                  text: this.replaceEmoji(c.subcommentcontent).replace(/\\n/g, "\n").split("\n"),
                  time: c.subcommentid == item.commentid ? time : null,
                  timeStr: c.subcommentid == item.commentid ? timeStr : null,
                  userName: c.replynick.substring(1),
                  avatar: c.avatarurl,
                  userId: c.encrypt_replyuin,
                  likedCount: c.praisenum
                };
              }) : []
            };
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/index.js
  var tx, tx_default;
  var init_tx = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/tx/index.js"() {
      init_leaderboard3();
      init_lyric3();
      init_songList3();
      init_musicSearch3();
      init_api_source();
      init_hotSearch3();
      init_comment3();
      tx = {
        leaderboard: leaderboard_default3,
        songList: songList_default3,
        musicSearch: musicSearch_default3,
        hotSearch: hotSearch_default3,
        comment: comment_default3,
        getMusicUrl(songInfo, type) {
          return apis("tx").getMusicUrl(songInfo, type);
        },
        getLyric(songInfo) {
          return lyric_default3.getLyric(songInfo.songmid);
        },
        getPic(songInfo) {
          return {
            promise: Promise.resolve(`https://y.gtimg.cn/music/photo_new/T002R500x500M000${songInfo.albumId}.jpg`)
          };
        },
        getMusicDetailPageUrl(songInfo) {
          return `https://y.qq.com/n/yqq/song/${songInfo.songmid}.html`;
        }
      };
      tx_default = tx;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/utils/crypto.js
  var iv, presetKey, linuxapiKey, base62, publicKey, eapiKey, aesEncrypt, rsaEncrypt, weapi, linuxapi, eapi;
  var init_crypto = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/utils/crypto.js"() {
      init_node_crypto();
      iv = Buffer.from("0102030405060708");
      presetKey = Buffer.from("0CoJUm6Qyw8W8jud");
      linuxapiKey = Buffer.from("rFgB&h#%2?^eDg:Q");
      base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB\n-----END PUBLIC KEY-----";
      eapiKey = "e82ckenh8dichen8";
      aesEncrypt = (buffer, mode, key, iv2) => {
        const cipher = createCipheriv(mode, key, iv2);
        return Buffer.concat([cipher.update(buffer), cipher.final()]);
      };
      rsaEncrypt = (buffer, key) => {
        buffer = Buffer.concat([Buffer.alloc(128 - buffer.length), buffer]);
        return publicEncrypt({ key, padding: 3 }, buffer);
      };
      weapi = (object) => {
        const text = JSON.stringify(object);
        const secretKey = randomBytes(16).map((n) => base62.charAt(n % 62).charCodeAt());
        return {
          params: aesEncrypt(Buffer.from(aesEncrypt(Buffer.from(text), "aes-128-cbc", presetKey, iv).toString("base64")), "aes-128-cbc", secretKey, iv).toString("base64"),
          encSecKey: rsaEncrypt(secretKey.reverse(), publicKey).toString("hex")
        };
      };
      linuxapi = (object) => {
        const text = JSON.stringify(object);
        return {
          eparams: aesEncrypt(Buffer.from(text), "aes-128-ecb", linuxapiKey, "").toString("hex").toUpperCase()
        };
      };
      eapi = (url, object) => {
        const text = typeof object === "object" ? JSON.stringify(object) : object;
        const message = `nobody${url}use${text}md5forencrypt`;
        const digest = createHash("md5").update(message).digest("hex");
        const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;
        return {
          params: aesEncrypt(Buffer.from(data), "aes-128-ecb", eapiKey, "").toString("hex").toUpperCase()
        };
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/musicDetail.js
  var musicDetail_default;
  var init_musicDetail = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/musicDetail.js"() {
      init_request();
      init_crypto();
      init_utils();
      musicDetail_default = {
        getSinger(singers) {
          let arr = [];
          singers?.forEach((singer) => {
            arr.push(singer.name);
          });
          return arr.join("\u3001");
        },
        filterList({ songs, privileges }) {
          const list = [];
          songs.forEach((item, index) => {
            const types = [];
            const _types = {};
            let size;
            let privilege = privileges[index];
            if (privilege.id !== item.id) privilege = privileges.find((p) => p.id === item.id);
            if (!privilege) return;
            if (privilege.maxBrLevel == "hires") {
              size = item.hr ? sizeFormate(item.hr.size) : null;
              types.push({ type: "flac24bit", size });
              _types.flac24bit = {
                size
              };
            }
            switch (privilege.maxbr) {
              case 999e3:
                size = item.sq ? sizeFormate(item.sq.size) : null;
                types.push({ type: "flac", size });
                _types.flac = {
                  size
                };
              case 32e4:
                size = item.h ? sizeFormate(item.h.size) : null;
                types.push({ type: "320k", size });
                _types["320k"] = {
                  size
                };
              case 192e3:
              case 128e3:
                size = item.l ? sizeFormate(item.l.size) : null;
                types.push({ type: "128k", size });
                _types["128k"] = {
                  size
                };
            }
            types.reverse();
            if (item.pc) {
              list.push({
                singer: item.pc.ar ?? "",
                name: item.pc.sn ?? "",
                albumName: item.pc.alb ?? "",
                albumId: item.al?.id,
                source: "wy",
                interval: formatPlayTime(item.dt / 1e3),
                songmid: item.id,
                mv: item.mv != null ? String(item.mv) : null,
                img: item.al?.picUrl ?? "",
                lrc: null,
                otherSource: null,
                types,
                _types,
                typeUrl: {}
              });
            } else {
              list.push({
                singer: this.getSinger(item.ar),
                name: item.name ?? "",
                albumName: item.al?.name,
                albumId: item.al?.id,
                source: "wy",
                interval: formatPlayTime(item.dt / 1e3),
                songmid: item.id,
                mv: item.mv != null ? String(item.mv) : null,
                img: item.al?.picUrl,
                lrc: null,
                otherSource: null,
                types,
                _types,
                typeUrl: {}
              });
            }
          });
          return list;
        },
        async getList(ids = [], retryNum = 0) {
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          const requestObj = httpFetch("https://music.163.com/weapi/v3/song/detail", {
            method: "post",
            headers: {
              "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
              origin: "https://music.163.com"
            },
            form: weapi({
              c: "[" + ids.map((id) => '{"id":' + id + "}").join(",") + "]",
              ids: "[" + ids.join(",") + "]"
            })
          });
          const { body, statusCode } = await requestObj.promise;
          if (statusCode != 200 || body.code !== 200) throw new Error("\u83B7\u53D6\u6B4C\u66F2\u8BE6\u60C5\u5931\u8D25");
          return { source: "wy", list: this.filterList(body) };
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/leaderboard.js
  var topList, leaderboard_default4;
  var init_leaderboard4 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/leaderboard.js"() {
      init_crypto();
      init_request();
      init_musicDetail();
      topList = [
        { id: "wy__19723756", bangid: "19723756", name: "\u4E91\u97F3\u4E50\u98D9\u5347\u699C" },
        { id: "wy__3778678", bangid: "3778678", name: "\u4E91\u97F3\u4E50\u70ED\u6B4C\u699C" },
        { id: "wy__3779629", bangid: "3779629", name: "\u4E91\u97F3\u4E50\u65B0\u6B4C\u699C" },
        { id: "wy__2884035", bangid: "2884035", name: "\u4E91\u97F3\u4E50\u539F\u521B\u699C" },
        { id: "wy__2250011882", bangid: "2250011882", name: "\u6296\u97F3\u6392\u884C\u699C" },
        { id: "wy__1978921795", bangid: "1978921795", name: "\u4E91\u97F3\u4E50\u7535\u97F3\u699C" },
        { id: "wy__4395559", bangid: "4395559", name: "\u534E\u8BED\u91D1\u66F2\u699C" },
        { id: "wy__71384707", bangid: "71384707", name: "\u4E91\u97F3\u4E50\u53E4\u5178\u97F3\u4E50\u699C" },
        { id: "wy__10520166", bangid: "10520166", name: "\u4E91\u97F3\u4E50\u56FD\u7535\u699C" },
        { id: "wy__2006508653", bangid: "2006508653", name: "\u7535\u7ADE\u97F3\u4E50\u699C" },
        { id: "wy__991319590", bangid: "991319590", name: "\u4E91\u97F3\u4E50\u8BF4\u5531\u699C" },
        { id: "wy__180106", bangid: "180106", name: "UK\u6392\u884C\u699C\u5468\u699C" },
        { id: "wy__60198", bangid: "60198", name: "\u7F8E\u56FDBillboard\u5468\u699C" },
        { id: "wy__21845217", bangid: "21845217", name: "KTV\u55E8\u699C" },
        { id: "wy__11641012", bangid: "11641012", name: "iTunes\u699C" },
        { id: "wy__120001", bangid: "120001", name: "Hit FM Top\u699C" },
        { id: "wy__60131", bangid: "60131", name: "\u65E5\u672COricon\u5468\u699C" },
        { id: "wy__3733003", bangid: "3733003", name: "\u97E9\u56FDMelon\u6392\u884C\u699C\u5468\u699C" },
        { id: "wy__60255", bangid: "60255", name: "\u97E9\u56FDMnet\u6392\u884C\u699C\u5468\u699C" },
        { id: "wy__46772709", bangid: "46772709", name: "\u97E9\u56FDMelon\u539F\u58F0\u5468\u699C" },
        { id: "wy__64016", bangid: "64016", name: "\u4E2D\u56FDTOP\u6392\u884C\u699C(\u5185\u5730\u699C)" },
        { id: "wy__112504", bangid: "112504", name: "\u4E2D\u56FDTOP\u6392\u884C\u699C(\u6E2F\u53F0\u699C)" },
        { id: "wy__3112516681", bangid: "3112516681", name: "\u4E2D\u56FD\u65B0\u4E61\u6751\u97F3\u4E50\u6392\u884C\u699C" },
        { id: "wy__10169002", bangid: "10169002", name: "\u9999\u6E2F\u7535\u53F0\u4E2D\u6587\u6B4C\u66F2\u9F99\u864E\u699C" },
        { id: "wy__27135204", bangid: "27135204", name: "\u6CD5\u56FD NRJ EuroHot 30\u5468\u699C" },
        { id: "wy__1899724", bangid: "1899724", name: "\u4E2D\u56FD\u563B\u54C8\u699C" },
        { id: "wy__112463", bangid: "112463", name: "\u53F0\u6E7EHito\u6392\u884C\u699C" },
        { id: "wy__3812895", bangid: "3812895", name: "Beatport\u5168\u7403\u7535\u5B50\u821E\u66F2\u699C" },
        { id: "wy__2617766278", bangid: "2617766278", name: "\u65B0\u58F0\u699C" },
        { id: "wy__745956260", bangid: "745956260", name: "\u4E91\u97F3\u4E50\u97E9\u8BED\u699C" },
        { id: "wy__2847251561", bangid: "2847251561", name: "\u8BF4\u5531TOP\u699C" },
        { id: "wy__2023401535", bangid: "2023401535", name: "\u82F1\u56FDQ\u6742\u5FD7\u4E2D\u6587\u7248\u5468\u699C" },
        { id: "wy__2809513713", bangid: "2809513713", name: "\u4E91\u97F3\u4E50\u6B27\u7F8E\u70ED\u6B4C\u699C" },
        { id: "wy__2809577409", bangid: "2809577409", name: "\u4E91\u97F3\u4E50\u6B27\u7F8E\u65B0\u6B4C\u699C" },
        { id: "wy__71385702", bangid: "71385702", name: "\u4E91\u97F3\u4E50ACG\u97F3\u4E50\u699C" },
        { id: "wy__3001835560", bangid: "3001835560", name: "\u4E91\u97F3\u4E50ACG\u52A8\u753B\u699C" },
        { id: "wy__3001795926", bangid: "3001795926", name: "\u4E91\u97F3\u4E50ACG\u6E38\u620F\u699C" },
        { id: "wy__3001890046", bangid: "3001890046", name: "\u4E91\u97F3\u4E50ACG VOCALOID\u699C" }
      ];
      leaderboard_default4 = {
        limit: 1e5,
        list: [
          {
            id: "wybsb",
            name: "\u98D9\u5347\u699C",
            bangid: "19723756"
          },
          {
            id: "wyrgb",
            name: "\u70ED\u6B4C\u699C",
            bangid: "3778678"
          },
          {
            id: "wyxgb",
            name: "\u65B0\u6B4C\u699C",
            bangid: "3779629"
          },
          {
            id: "wyycb",
            name: "\u539F\u521B\u699C",
            bangid: "2884035"
          },
          {
            id: "wygdb",
            name: "\u53E4\u5178\u699C",
            bangid: "71384707"
          },
          {
            id: "wydouyb",
            name: "\u6296\u97F3\u699C",
            bangid: "2250011882"
          },
          {
            id: "wyhyb",
            name: "\u97E9\u8BED\u699C",
            bangid: "745956260"
          },
          {
            id: "wydianyb",
            name: "\u7535\u97F3\u699C",
            bangid: "1978921795"
          },
          {
            id: "wydjb",
            name: "\u7535\u7ADE\u699C",
            bangid: "2006508653"
          },
          {
            id: "wyktvbb",
            name: "KTV\u551B\u699C",
            bangid: "21845217"
          }
        ],
        getUrl(id) {
          return `https://music.163.com/discover/toplist?id=${id}`;
        },
        regExps: {
          list: /<textarea id="song-list-pre-data" style="display:none;">(.+?)<\/textarea>/
        },
        _requestBoardsObj: null,
        getBoardsData() {
          if (this._requestBoardsObj) this._requestBoardsObj.cancelHttp();
          this._requestBoardsObj = httpFetch("https://music.163.com/weapi/toplist", {
            method: "post",
            form: weapi({})
          });
          return this._requestBoardsObj.promise;
        },
        getData(id) {
          const requestBoardsDetailObj = httpFetch("https://music.163.com/weapi/v3/playlist/detail", {
            method: "post",
            form: weapi({
              id,
              n: 1e5,
              p: 1
            })
          });
          return requestBoardsDetailObj.promise;
        },
        filterBoardsData(rawList) {
          let list = [];
          for (const board of rawList) {
            list.push({
              id: "wy__" + board.id,
              name: board.name,
              bangid: String(board.id)
            });
          }
          return list;
        },
        async getBoards(retryNum = 0) {
          this.list = topList;
          return {
            list: topList,
            source: "wy"
          };
        },
        async getList(bangid, page, retryNum = 0) {
          if (++retryNum > 6) return Promise.reject(new Error("try max num"));
          let resp;
          try {
            resp = await this.getData(bangid);
          } catch (err2) {
            if (err2.message == "try max num") {
              throw err2;
            } else {
              return this.getList(bangid, page, retryNum);
            }
          }
          if (resp.statusCode !== 200 || resp.body.code !== 200) return this.getList(bangid, page, retryNum);
          let musicDetail;
          try {
            musicDetail = await musicDetail_default.getList(resp.body.playlist.trackIds.map((trackId) => trackId.id));
          } catch (err2) {
            console.log(err2);
            if (err2.message == "try max num") {
              throw err2;
            } else {
              return this.getList(bangid, page, retryNum);
            }
          }
          return {
            total: musicDetail.list.length,
            list: musicDetail.list,
            limit: this.limit,
            page,
            source: "wy"
          };
        },
        getDetailPageUrl(id) {
          if (typeof id == "string") id = id.replace("wy__", "");
          return `https://music.163.com/#/discover/toplist?id=${id}`;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/lyric.js
  var eapiRequest, parseTools, lyric_default4;
  var init_lyric4 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/lyric.js"() {
      init_request();
      init_crypto();
      eapiRequest = (url, data) => {
        return httpFetch("https://interface3.music.163.com/eapi/song/lyric/v1", {
          method: "post",
          headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
            origin: "https://music.163.com"
            // cookie: 'os=pc; deviceId=A9C064BB4584D038B1565B58CB05F95290998EE8B025AA2D07AE; osver=Microsoft-Windows-10-Home-China-build-19043-64bit; appver=2.5.2.197409; channel=netease; MUSIC_A=37a11f2eb9de9930cad479b2ad495b0e4c982367fb6f909d9a3f18f876c6b49faddb3081250c4980dd7e19d4bd9bf384e004602712cf2b2b8efaafaab164268a00b47359f85f22705cc95cb6180f3aee40f5be1ebf3148d888aa2d90636647d0c3061cd18d77b7a0; __csrf=05b50d54082694f945d7de75c210ef94; mode=Z7M-KP5(7)GZ; NMTID=00OZLp2VVgq9QdwokUgq3XNfOddQyIAAAF_6i8eJg; ntes_kaola_ad=1',
          },
          form: eapi(url, data)
        });
      };
      parseTools = {
        rxps: {
          info: /^{"/,
          lineTime: /^\[(\d+),\d+\]/,
          wordTime: /\(\d+,\d+,\d+\)/,
          wordTimeAll: /(\(\d+,\d+,\d+\))/g
        },
        msFormat(timeMs) {
          if (Number.isNaN(timeMs)) return "";
          let ms = timeMs % 1e3;
          timeMs /= 1e3;
          let m = parseInt(timeMs / 60).toString().padStart(2, "0");
          timeMs %= 60;
          let s = parseInt(timeMs).toString().padStart(2, "0");
          return `[${m}:${s}.${ms}]`;
        },
        parseLyric(lines) {
          const lxlrcLines = [];
          const lrcLines = [];
          for (let line of lines) {
            line = line.trim();
            let result = this.rxps.lineTime.exec(line);
            if (!result) {
              if (line.startsWith("[offset")) {
                lxlrcLines.push(line);
                lrcLines.push(line);
              }
              continue;
            }
            const startMsTime = parseInt(result[1]);
            const startTimeStr = this.msFormat(startMsTime);
            if (!startTimeStr) continue;
            let words = line.replace(this.rxps.lineTime, "");
            lrcLines.push(`${startTimeStr}${words.replace(this.rxps.wordTimeAll, "")}`);
            let times = words.match(this.rxps.wordTimeAll);
            if (!times) continue;
            times = times.map((time) => {
              const result2 = /\((\d+),(\d+),\d+\)/.exec(time);
              return `<${Math.max(parseInt(result2[1]) - startMsTime, 0)},${result2[2]}>`;
            });
            const wordArr = words.split(this.rxps.wordTime);
            wordArr.shift();
            const newWords = times.map((time, index) => `${time}${wordArr[index]}`).join("");
            lxlrcLines.push(`${startTimeStr}${newWords}`);
          }
          return {
            lyric: lrcLines.join("\n"),
            lxlyric: lxlrcLines.join("\n")
          };
        },
        parseHeaderInfo(str) {
          str = str.trim();
          str = str.replace(/\r/g, "");
          if (!str) return null;
          const lines = str.split("\n");
          return lines.map((line) => {
            if (!this.rxps.info.test(line)) return line;
            try {
              const info = JSON.parse(line);
              const timeTag = this.msFormat(info.t);
              return timeTag ? `${timeTag}${info.c.map((t) => t.tx).join("")}` : "";
            } catch {
              return "";
            }
          });
        },
        getIntv(interval) {
          let [m, s, ms] = interval.split(/:|\./);
          return parseInt(m) * 36e5 + parseInt(s) * 1e3 + parseInt(ms);
        },
        fixTimeTag(lrc, targetlrc) {
          let lrcLines = lrc.split("\n");
          const targetlrcLines = targetlrc.split("\n");
          const timeRxp = /^\[([\d:.]+)\]/;
          let temp = [];
          let newLrc = [];
          targetlrcLines.forEach((line) => {
            const result = timeRxp.exec(line);
            if (!result) return;
            const words = line.replace(timeRxp, "");
            if (!words.trim()) return;
            const t1 = this.getIntv(result[1]);
            while (lrcLines.length) {
              const lrcLine = lrcLines.shift();
              const lrcLineResult = timeRxp.exec(lrcLine);
              if (!lrcLineResult) continue;
              const t2 = this.getIntv(lrcLineResult[1]);
              if (Math.abs(t1 - t2) < 100) {
                const lrc2 = line.replace(timeRxp, lrcLineResult[0]).trim();
                if (!lrc2) continue;
                newLrc.push(lrc2);
                break;
              }
              temp.push(lrcLine);
            }
            lrcLines = [...temp, ...lrcLines];
            temp = [];
          });
          return newLrc.join("\n");
        },
        parse(ylrc, ytlrc, yrlrc, lrc, tlrc, rlrc) {
          const info = {
            lyric: "",
            tlyric: "",
            rlyric: "",
            lxlyric: ""
          };
          if (ylrc) {
            let lines = this.parseHeaderInfo(ylrc);
            if (lines) {
              const result = this.parseLyric(lines);
              if (ytlrc) {
                const lines2 = this.parseHeaderInfo(ytlrc);
                if (lines2) {
                  info.tlyric = this.fixTimeTag(result.lyric, lines2.join("\n"));
                }
              }
              if (yrlrc) {
                const lines2 = this.parseHeaderInfo(yrlrc);
                if (lines2) {
                  info.rlyric = this.fixTimeTag(result.lyric, lines2.join("\n"));
                }
              }
              const timeRxp = /^\[[\d:.]+\]/;
              const headers2 = lines.filter((l) => timeRxp.test(l)).join("\n");
              info.lyric = `${headers2}
${result.lyric}`;
              info.lxlyric = result.lxlyric;
              return info;
            }
          }
          if (lrc) {
            const lines = this.parseHeaderInfo(lrc);
            if (lines) info.lyric = lines.join("\n");
          }
          if (tlrc) {
            const lines = this.parseHeaderInfo(tlrc);
            if (lines) info.tlyric = lines.join("\n");
          }
          if (rlrc) {
            const lines = this.parseHeaderInfo(rlrc);
            if (lines) info.rlyric = lines.join("\n");
          }
          return info;
        }
      };
      lyric_default4 = (songmid) => {
        const requestObj = eapiRequest("/api/song/lyric/v1", {
          id: songmid,
          cp: false,
          tv: 0,
          lv: 0,
          rv: 0,
          kv: 0,
          yv: 0,
          ytv: 0,
          yrv: 0
        });
        requestObj.promise = requestObj.promise.then(({ body }) => {
          if (body.code !== 200 || !body?.lrc?.lyric) return Promise.reject(new Error("Get lyric failed"));
          const info = parseTools.parse(body.yrc?.lyric, body.ytlrc?.lyric, body.yromalrc?.lyric, body.lrc.lyric, body.tlyric?.lyric, body.romalrc?.lyric);
          if (!info.lyric) return Promise.reject(new Error("Get lyric failed"));
          return info;
        });
        return requestObj;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/musicInfo.js
  var musicInfo_default2;
  var init_musicInfo2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/musicInfo.js"() {
      init_request();
      init_crypto();
      musicInfo_default2 = (songmid) => {
        const requestObj = httpFetch("https://music.163.com/weapi/v3/song/detail", {
          method: "post",
          headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
            Referer: "https://music.163.com/song?id=" + songmid,
            origin: "https://music.163.com"
          },
          form: weapi({
            c: `[{"id":${songmid}}]`,
            ids: `[${songmid}]`
          })
        });
        requestObj.promise = requestObj.promise.then(({ body }) => {
          if (body.code !== 200 || !body.songs.length) return Promise.reject("\u83B7\u53D6\u6B4C\u66F2\u4FE1\u606F\u5931\u8D25");
          return body.songs[0];
        });
        return requestObj;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/utils/index.js
  var eapiRequest2;
  var init_utils3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/utils/index.js"() {
      init_request();
      init_crypto();
      eapiRequest2 = (url, data) => {
        return httpFetch("http://interface.music.163.com/eapi/batch", {
          method: "post",
          headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
            origin: "https://music.163.com"
            // cookie: 'os=pc; deviceId=A9C064BB4584D038B1565B58CB05F95290998EE8B025AA2D07AE; osver=Microsoft-Windows-10-Home-China-build-19043-64bit; appver=2.5.2.197409; channel=netease; MUSIC_A=37a11f2eb9de9930cad479b2ad495b0e4c982367fb6f909d9a3f18f876c6b49faddb3081250c4980dd7e19d4bd9bf384e004602712cf2b2b8efaafaab164268a00b47359f85f22705cc95cb6180f3aee40f5be1ebf3148d888aa2d90636647d0c3061cd18d77b7a0; __csrf=05b50d54082694f945d7de75c210ef94; mode=Z7M-KP5(7)GZ; NMTID=00OZLp2VVgq9QdwokUgq3XNfOddQyIAAAF_6i8eJg; ntes_kaola_ad=1',
          },
          form: eapi(url, data)
        });
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/musicSearch.js
  var musicSearch_default4;
  var init_musicSearch4 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/musicSearch.js"() {
      init_utils();
      init_utils3();
      musicSearch_default4 = {
        limit: 30,
        total: 0,
        page: 0,
        allPage: 1,
        musicSearch(str, page, limit) {
          const searchRequest = eapiRequest2("/api/cloudsearch/pc", {
            s: str,
            type: 1,
            // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
            limit,
            total: page == 1,
            offset: limit * (page - 1)
          });
          return searchRequest.promise.then(({ body }) => body);
        },
        getSinger(singers) {
          let arr = [];
          singers.forEach((singer) => {
            arr.push(singer.name);
          });
          return arr.join("\u3001");
        },
        handleResult(rawList) {
          if (!rawList) return [];
          return rawList.map((item) => {
            const types = [];
            const _types = {};
            let size;
            if (item.privilege.maxBrLevel == "hires") {
              size = item.hr ? sizeFormate(item.hr.size) : null;
              types.push({ type: "flac24bit", size });
              _types.flac24bit = {
                size
              };
            }
            switch (item.privilege.maxbr) {
              case 999e3:
                size = item.sq ? sizeFormate(item.sq.size) : null;
                types.push({ type: "flac", size });
                _types.flac = {
                  size
                };
              case 32e4:
                size = item.h ? sizeFormate(item.h.size) : null;
                types.push({ type: "320k", size });
                _types["320k"] = {
                  size
                };
              case 192e3:
              case 128e3:
                size = item.l ? sizeFormate(item.l.size) : null;
                types.push({ type: "128k", size });
                _types["128k"] = {
                  size
                };
            }
            types.reverse();
            return {
              singer: this.getSinger(item.ar),
              name: item.name,
              albumName: item.al.name,
              albumId: item.al.id,
              source: "wy",
              interval: formatPlayTime(item.dt / 1e3),
              songmid: item.id,
              mv: item.mv != null ? String(item.mv) : null,
              img: item.al.picUrl,
              lrc: null,
              types,
              _types,
              typeUrl: {}
            };
          });
        },
        search(str, page = 1, limit, retryNum = 0) {
          if (++retryNum > 3) return Promise.reject(new Error("try max num"));
          if (limit == null) limit = this.limit;
          return this.musicSearch(str, page, limit).then((result) => {
            if (!result || result.code !== 200) return this.search(str, page, limit, retryNum);
            let list = this.handleResult(result.result.songs || []);
            if (list == null) return this.search(str, page, limit, retryNum);
            this.total = result.result.songCount || 0;
            this.page = page;
            this.allPage = Math.ceil(this.total / this.limit);
            return {
              list,
              allPage: this.allPage,
              limit: this.limit,
              total: this.total,
              source: "wy"
            };
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/songList.js
  var songList_default4;
  var init_songList4 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/songList.js"() {
      init_crypto();
      init_request();
      init_utils();
      init_musicDetail();
      init_utils3();
      songList_default4 = {
        _requestObj_tags: null,
        _requestObj_hotTags: null,
        _requestObj_list: null,
        limit_list: 30,
        limit_song: 1e5,
        successCode: 200,
        cookie: "MUSIC_U=",
        sortList: [
          {
            name: "\u6700\u70ED",
            tid: "hot",
            id: "hot"
          }
          // {
          //   name: '最新',
          //   tid: 'new',
          //   id: 'new',
          // },
        ],
        regExps: {
          listDetailLink: /^.+(?:\?|&)id=(\d+)(?:&.*$|#.*$|$)/,
          listDetailLink2: /^.+\/playlist\/(\d+)\/\d+\/.+$/
        },
        /**
         * 格式化播放数量
         * @param {*} num
         */
        formatPlayCount(num) {
          if (num > 1e8) return parseInt(num / 1e7) / 10 + "\u4EBF";
          if (num > 1e4) return parseInt(num / 1e3) / 10 + "\u4E07";
          return num;
        },
        getSinger(singers) {
          let arr = [];
          singers?.forEach((singer) => {
            arr.push(singer.name);
          });
          return arr.join("\u3001");
        },
        async handleParseId(link, retryNum = 0) {
          if (retryNum > 2) throw new Error("link try max num");
          const requestObj_listDetailLink = httpFetch(link);
          const { url, statusCode } = await requestObj_listDetailLink.promise;
          if (statusCode > 400) return this.handleParseId(link, ++retryNum);
          return this.regExps.listDetailLink.test(url) ? url.replace(this.regExps.listDetailLink, "$1") : url.replace(this.regExps.listDetailLink2, "$1");
        },
        async getListId(id) {
          let cookie;
          if (/###/.test(id)) {
            const [url, token] = id.split("###");
            id = url;
            cookie = `MUSIC_U=${token}`;
          }
          if (/[?&:/]/.test(id)) {
            if (this.regExps.listDetailLink.test(id)) {
              id = id.replace(this.regExps.listDetailLink, "$1");
            } else if (this.regExps.listDetailLink2.test(id)) {
              id = id.replace(this.regExps.listDetailLink2, "$1");
            } else {
              id = await this.handleParseId(id);
            }
          }
          return { id, cookie };
        },
        async getListDetail(rawId, page, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          const { id, cookie } = await this.getListId(rawId);
          if (cookie) this.cookie = cookie;
          const requestObj_listDetail = httpFetch("https://music.163.com/api/linux/forward", {
            method: "post",
            headers: {
              "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
              Cookie: this.cookie
            },
            cache: "default",
            form: linuxapi({
              method: "POST",
              url: "https://music.163.com/api/v3/playlist/detail",
              params: {
                id,
                n: this.limit_song,
                s: 8
              }
            })
          });
          const { statusCode, body } = await requestObj_listDetail.promise;
          if (statusCode !== 200 || body.code !== this.successCode) return this.getListDetail(id, page, ++tryNum);
          let limit = 1e3;
          let rangeStart = (page - 1) * limit;
          let list;
          if (body.playlist.trackIds.length == body.privileges.length) {
            list = this.filterListDetail(body);
          } else {
            try {
              list = (await musicDetail_default.getList(body.playlist.trackIds.slice(rangeStart, limit * page).map((trackId) => trackId.id))).list;
            } catch (err2) {
              console.log(err2);
              if (err2.message == "try max num") {
                throw err2;
              } else {
                return this.getListDetail(id, page, ++tryNum);
              }
            }
          }
          return {
            list,
            page,
            limit,
            total: body.playlist.trackIds.length,
            source: "wy",
            info: {
              play_count: this.formatPlayCount(body.playlist.playCount),
              name: body.playlist.name,
              img: body.playlist.coverImgUrl,
              desc: body.playlist.description,
              author: body.playlist.creator.nickname
            }
          };
        },
        filterListDetail({ playlist: { tracks }, privileges }) {
          const list = [];
          tracks.forEach((item, index) => {
            const types = [];
            const _types = {};
            let size;
            let privilege = privileges[index];
            if (privilege.id !== item.id) privilege = privileges.find((p) => p.id === item.id);
            if (!privilege) return;
            if (privilege.maxBrLevel == "hires") {
              size = item.hr ? sizeFormate(item.hr.size) : null;
              types.push({ type: "flac24bit", size });
              _types.flac24bit = {
                size
              };
            }
            switch (privilege.maxbr) {
              case 999e3:
                size = null;
                types.push({ type: "flac", size });
                _types.flac = {
                  size
                };
              case 32e4:
                size = item.h ? sizeFormate(item.h.size) : null;
                types.push({ type: "320k", size });
                _types["320k"] = {
                  size
                };
              case 192e3:
              case 128e3:
                size = item.l ? sizeFormate(item.l.size) : null;
                types.push({ type: "128k", size });
                _types["128k"] = {
                  size
                };
            }
            types.reverse();
            if (item.pc) {
              list.push({
                singer: item.pc.ar ?? "",
                name: item.pc.sn ?? "",
                albumName: item.pc.alb ?? "",
                albumId: item.al?.id,
                source: "wy",
                interval: formatPlayTime(item.dt / 1e3),
                songmid: item.id,
                mv: item.mv != null ? String(item.mv) : null,
                img: item.al?.picUrl ?? "",
                lrc: null,
                otherSource: null,
                types,
                _types,
                typeUrl: {}
              });
            } else {
              list.push({
                singer: this.getSinger(item.ar),
                name: item.name ?? "",
                albumName: item.al?.name,
                albumId: item.al?.id,
                source: "wy",
                interval: formatPlayTime(item.dt / 1e3),
                songmid: item.id,
                mv: item.mv != null ? String(item.mv) : null,
                img: item.al?.picUrl,
                lrc: null,
                otherSource: null,
                types,
                _types,
                typeUrl: {}
              });
            }
          });
          return list;
        },
        // 获取列表数据
        getList(sortId, tagId, page, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          if (this._requestObj_list) this._requestObj_list.cancelHttp();
          this._requestObj_list = httpFetch("https://music.163.com/weapi/playlist/list", {
            method: "post",
            form: weapi({
              cat: tagId || "\u5168\u90E8",
              // 全部,华语,欧美,日语,韩语,粤语,小语种,流行,摇滚,民谣,电子,舞曲,说唱,轻音乐,爵士,乡村,R&B/Soul,古典,民族,英伦,金属,朋克,蓝调,雷鬼,世界音乐,拉丁,另类/独立,New Age,古风,后摇,Bossa Nova,清晨,夜晚,学习,工作,午休,下午茶,地铁,驾车,运动,旅行,散步,酒吧,怀旧,清新,浪漫,性感,伤感,治愈,放松,孤独,感动,兴奋,快乐,安静,思念,影视原声,ACG,儿童,校园,游戏,70后,80后,90后,网络歌曲,KTV,经典,翻唱,吉他,钢琴,器乐,榜单,00后
              order: sortId,
              // hot,new
              limit: this.limit_list,
              offset: this.limit_list * (page - 1),
              total: true
            })
          });
          return this._requestObj_list.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getList(sortId, tagId, page, ++tryNum);
            return {
              list: this.filterList(body.playlists),
              total: parseInt(body.total),
              page,
              limit: this.limit_list,
              source: "wy"
            };
          });
        },
        filterList(rawData) {
          return rawData.map((item) => ({
            play_count: this.formatPlayCount(item.playCount),
            id: item.id,
            author: item.creator.nickname,
            name: item.name,
            time: item.createTime ? dateFormat(item.createTime, "Y-M-D") : "",
            img: item.coverImgUrl,
            grade: item.grade,
            total: item.trackCount,
            desc: item.description,
            source: "wy"
          }));
        },
        // 获取标签
        getTag(tryNum = 0) {
          if (this._requestObj_tags) this._requestObj_tags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_tags = httpFetch("https://music.163.com/weapi/playlist/catalogue", {
            method: "post",
            form: weapi({})
          });
          return this._requestObj_tags.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getTag(++tryNum);
            return this.filterTagInfo(body);
          });
        },
        filterTagInfo({ sub, categories }) {
          const subList = {};
          for (const item of sub) {
            if (!subList[item.category]) subList[item.category] = [];
            subList[item.category].push({
              parent_id: categories[item.category],
              parent_name: categories[item.category],
              id: item.name,
              name: item.name,
              source: "wy"
            });
          }
          const list = [];
          for (const key of Object.keys(categories)) {
            list.push({
              name: categories[key],
              list: subList[key],
              source: "wy"
            });
          }
          return list;
        },
        // 获取热门标签
        getHotTag(tryNum = 0) {
          if (this._requestObj_hotTags) this._requestObj_hotTags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_hotTags = httpFetch("https://music.163.com/weapi/playlist/hottags", {
            method: "post",
            form: weapi({})
          });
          return this._requestObj_hotTags.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getTag(++tryNum);
            return this.filterHotTagInfo(body.tags);
          });
        },
        filterHotTagInfo(rawList) {
          return rawList.map((item) => ({
            id: item.playlistTag.name,
            name: item.playlistTag.name,
            source: "wy"
          }));
        },
        getTags() {
          return Promise.all([this.getTag(), this.getHotTag()]).then(([tags, hotTag]) => ({ tags, hotTag, source: "wy" }));
        },
        async getDetailPageUrl(rawId) {
          const { id } = await this.getListId(rawId);
          return `https://music.163.com/#/playlist?id=${id}`;
        },
        search(text, page, limit = 20) {
          return eapiRequest2("/api/cloudsearch/pc", {
            s: text,
            type: 1e3,
            // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
            limit,
            total: page == 1,
            offset: limit * (page - 1)
          }).promise.then(({ body }) => {
            if (body.code != this.successCode) throw new Error("filed");
            return {
              list: this.filterList(body.result.playlists),
              limit,
              total: body.result.playlistCount,
              source: "wy"
            };
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/hotSearch.js
  var hotSearch_default4;
  var init_hotSearch4 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/hotSearch.js"() {
      init_request();
      init_crypto();
      hotSearch_default4 = {
        _requestObj: null,
        async getList(retryNum = 0) {
          if (this._requestObj) this._requestObj.cancelHttp();
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          const _requestObj = httpFetch("https://music.163.com/weapi/search/hot", {
            method: "post",
            headers: {
              "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
              origin: "https://music.163.com"
            },
            form: weapi({ type: 1111 })
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.code !== 200) throw new Error("\u83B7\u53D6\u70ED\u641C\u8BCD\u5931\u8D25");
          return { source: "wy", list: this.filterList(body.result.hots) };
        },
        filterList(rawList) {
          return rawList.map((item) => item.first);
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/comment.js
  var emojis2, applyEmoji, cursorTools, comment_default4;
  var init_comment4 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/comment.js"() {
      init_request();
      init_crypto();
      init_utils();
      emojis2 = [
        ["\u5927\u7B11", "\u{1F603}"],
        ["\u53EF\u7231", "\u{1F60A}"],
        ["\u61A8\u7B11", "\u263A\uFE0F"],
        ["\u8272", "\u{1F60D}"],
        ["\u4EB2\u4EB2", "\u{1F619}"],
        ["\u60CA\u6050", "\u{1F631}"],
        ["\u6D41\u6CEA", "\u{1F62D}"],
        ["\u4EB2", "\u{1F61A}"],
        ["\u5446", "\u{1F633}"],
        ["\u54C0\u4F24", "\u{1F614}"],
        ["\u5472\u7259", "\u{1F601}"],
        ["\u5410\u820C", "\u{1F61D}"],
        ["\u6487\u5634", "\u{1F612}"],
        ["\u6012", "\u{1F621}"],
        ["\u5978\u7B11", "\u{1F60F}"],
        ["\u6C57", "\u{1F613}"],
        ["\u75DB\u82E6", "\u{1F616}"],
        ["\u60F6\u6050", "\u{1F630}"],
        ["\u751F\u75C5", "\u{1F628}"],
        ["\u53E3\u7F69", "\u{1F637}"],
        ["\u5927\u54ED", "\u{1F602}"],
        ["\u6655", "\u{1F635}"],
        ["\u53D1\u6012", "\u{1F47F}"],
        ["\u5F00\u5FC3", "\u{1F604}"],
        ["\u9B3C\u8138", "\u{1F61C}"],
        ["\u76B1\u7709", "\u{1F61E}"],
        ["\u6D41\u611F", "\u{1F622}"],
        ["\u7231\u5FC3", "\u2764\uFE0F"],
        ["\u5FC3\u788E", "\u{1F494}"],
        ["\u949F\u60C5", "\u{1F498}"],
        ["\u661F\u661F", "\u2B50\uFE0F"],
        ["\u751F\u6C14", "\u{1F4A2}"],
        ["\u4FBF\u4FBF", "\u{1F4A9}"],
        ["\u5F3A", "\u{1F44D}"],
        ["\u5F31", "\u{1F44E}"],
        ["\u62DC", "\u{1F64F}"],
        ["\u7275\u624B", "\u{1F46B}"],
        ["\u8DF3\u821E", "\u{1F46F}\u200D\u2640\uFE0F"],
        ["\u7981\u6B62", "\u{1F645}\u200D\u2640\uFE0F"],
        ["\u8FD9\u8FB9", "\u{1F481}\u200D\u2640\uFE0F"],
        ["\u7231\u610F", "\u{1F48F}"],
        ["\u793A\u7231", "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F468}"],
        ["\u5634\u5507", "\u{1F444}"],
        ["\u72D7", "\u{1F436}"],
        ["\u732B", "\u{1F431}"],
        ["\u732A", "\u{1F437}"],
        ["\u5154\u5B50", "\u{1F430}"],
        ["\u5C0F\u9E21", "\u{1F424}"],
        ["\u516C\u9E21", "\u{1F414}"],
        ["\u5E7D\u7075", "\u{1F47B}"],
        ["\u5723\u8BDE", "\u{1F385}"],
        ["\u5916\u661F", "\u{1F47D}"],
        ["\u94BB\u77F3", "\u{1F48E}"],
        ["\u793C\u7269", "\u{1F381}"],
        ["\u7537\u5B69", "\u{1F466}"],
        ["\u5973\u5B69", "\u{1F467}"],
        ["\u86CB\u7CD5", "\u{1F382}"],
        ["18", "\u{1F51E}"],
        ["\u5708", "\u2B55"],
        ["\u53C9", "\u274C"]
      ];
      applyEmoji = (text) => {
        for (const e of emojis2) text = text.replaceAll(`[${e[0]}]`, e[1]);
        return text;
      };
      cursorTools = {
        cache: {},
        getCursor(id, page, limit) {
          let cacheData = this.cache[id];
          if (!cacheData) cacheData = this.cache[id] = {};
          let orderType;
          let cursor;
          let offset;
          if (page == 1) {
            cacheData.page = 1;
            cursor = cacheData.cursor = cacheData.prevCursor = Date.now();
            orderType = 1;
            offset = 0;
          } else if (cacheData.page) {
            cursor = cacheData.cursor;
            if (page > cacheData.page) {
              orderType = 1;
              offset = (page - cacheData.page - 1) * limit;
            } else if (page < cacheData.page) {
              orderType = 0;
              offset = (cacheData.page - page - 1) * limit;
            } else {
              cursor = cacheData.cursor = cacheData.prevCursor;
              offset = cacheData.offset;
              orderType = cacheData.orderType;
            }
          }
          return {
            orderType,
            cursor,
            offset
          };
        },
        setCursor(id, cursor, orderType, offset, page) {
          let cacheData = this.cache[id];
          if (!cacheData) cacheData = this.cache[id] = {};
          cacheData.prevCursor = cacheData.cursor;
          cacheData.cursor = cursor;
          cacheData.orderType = orderType;
          cacheData.offset = offset;
          cacheData.page = page;
        }
      };
      comment_default4 = {
        _requestObj: null,
        _requestObj2: null,
        async getComment({ songmid }, page = 1, limit = 20) {
          if (this._requestObj) this._requestObj.cancelHttp();
          const id = "R_SO_4_" + songmid;
          const cursorInfo = cursorTools.getCursor(songmid, page, limit);
          const _requestObj = httpFetch("https://music.163.com/weapi/comment/resource/comments/get", {
            method: "post",
            headers: {
              "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
              origin: "https://music.163.com",
              Refere: "http://music.163.com/"
            },
            form: weapi({
              cursor: cursorInfo.cursor,
              offset: cursorInfo.offset,
              orderType: cursorInfo.orderType,
              pageNo: page,
              pageSize: limit,
              rid: id,
              threadId: id
            })
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.code !== 200) throw new Error("\u83B7\u53D6\u8BC4\u8BBA\u5931\u8D25");
          cursorTools.setCursor(songmid, body.data.cursor, cursorInfo.orderType, cursorInfo.offset, page);
          return { source: "wy", comments: this.filterComment(body.data.comments), total: body.data.totalCount, page, limit, maxPage: Math.ceil(body.data.totalCount / limit) || 1 };
        },
        async getHotComment({ songmid }, page = 1, limit = 100) {
          if (this._requestObj2) this._requestObj2.cancelHttp();
          const id = "R_SO_4_" + songmid;
          const _requestObj2 = httpFetch("https://music.163.com/weapi/comment/resource/comments/get", {
            method: "post",
            headers: {
              "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
              origin: "https://music.163.com",
              Refere: "http://music.163.com/"
            },
            form: weapi({
              cursor: Date.now().toString(),
              offset: 0,
              orderType: 1,
              pageNo: page,
              pageSize: limit,
              rid: id,
              threadId: id
            })
          });
          const { body, statusCode } = await _requestObj2.promise;
          if (statusCode != 200 || body.code !== 200) throw new Error("\u83B7\u53D6\u70ED\u95E8\u8BC4\u8BBA\u5931\u8D25");
          const total = body.data.hotComments?.length ?? 0;
          return { source: "wy", comments: this.filterComment(body.data.hotComments), total, page, limit, maxPage: 1 };
        },
        filterComment(rawList) {
          return rawList.map((item) => {
            let data = {
              id: item.commentId,
              text: item.content ? applyEmoji(item.content).split("\n") : "",
              time: item.time ? item.time : "",
              timeStr: item.time ? dateFormat2(item.time) : "",
              userName: item.user.nickname,
              avatar: item.user.avatarUrl,
              userId: item.user.userId,
              likedCount: item.likedCount,
              reply: []
            };
            let replyData = item.beReplied && item.beReplied[0];
            return replyData ? {
              id: item.commentId,
              rootId: replyData.beRepliedCommentId,
              text: replyData.content ? applyEmoji(replyData.content).split("\n") : "",
              time: item.time,
              timeStr: null,
              userName: replyData.user.nickname,
              avatar: replyData.user.avatarUrl,
              userId: replyData.user.userId,
              likedCount: null,
              reply: [data]
            } : data;
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/index.js
  var wy, wy_default;
  var init_wy = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/wy/index.js"() {
      init_leaderboard4();
      init_api_source();
      init_lyric4();
      init_musicInfo2();
      init_musicSearch4();
      init_songList4();
      init_hotSearch4();
      init_comment4();
      wy = {
        leaderboard: leaderboard_default4,
        musicSearch: musicSearch_default4,
        songList: songList_default4,
        hotSearch: hotSearch_default4,
        comment: comment_default4,
        getMusicUrl(songInfo, type) {
          return apis("wy").getMusicUrl(songInfo, type);
        },
        mv: {
          getMvUrl(mvId, retryNum) {
            if (retryNum == null) retryNum = 0;
            if (retryNum > 2) return Promise.reject(new Error("try max num"));
            const requestObj = httpFetch(
              "https://music.163.com/weapi/song/enhance/play/mv/url",
              {
                method: "post",
                headers: {
                  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
                  origin: "https://music.163.com"
                },
                form: weapi({
                  id: mvId,
                  r: 1080
                })
              }
            );
            return requestObj.promise.then(({ body, statusCode }) => {
              if (statusCode !== 200 || body.code !== 200) {
                return Promise.reject(new Error("获取MV链接失败"));
              }
              if (!body.data.url) {
                return Promise.reject(new Error(body.data.msg || "获取MV链接失败"));
              }
              return { url: body.data.url };
            });
          }
        },
        // mobile listMvRefresh 同款：重新拉取单曲详情补全 mv 字段（数值 id，0 表示没有 MV）
        getMvInfo(musicInfo) {
          const requestObj = musicInfo_default2(musicInfo.songmid);
          requestObj.promise = requestObj.promise.then((info) => {
            const mv = info.mv != null ? Number(info.mv) : 0;
            return mv > 0 ? String(mv) : null;
          });
          return requestObj;
        },
        getLyric(songInfo) {
          return lyric_default4(songInfo.songmid);
        },
        getPic(songInfo) {
          const requestObj = musicInfo_default2(songInfo.songmid);
          requestObj.promise = requestObj.promise.then((info) => info.al.picUrl);
          return requestObj;
        },
        getMusicDetailPageUrl(songInfo) {
          return `https://music.163.com/#/song?id=${songInfo.songmid}`;
        }
      };
      wy_default = wy;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/leaderboard.js
  var boardList4, leaderboard_default5;
  var init_leaderboard5 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/leaderboard.js"() {
      init_request();
      init_utils();
      boardList4 = [{ id: "mg__27553319", name: "\u5C16\u53EB\u65B0\u6B4C\u699C", bangid: "27553319", webId: "jianjiao_newsong" }, { id: "mg__27186466", name: "\u5C16\u53EB\u70ED\u6B4C\u699C", bangid: "27186466", webId: "jianjiao_hotsong" }, { id: "mg__27553408", name: "\u5C16\u53EB\u539F\u521B\u699C", bangid: "27553408", webId: "jianjiao_original" }, { id: "mg__23189800", name: "\u6E2F\u53F0\u699C", bangid: "23189800", webId: "hktw" }, { id: "mg__23189399", name: "\u5185\u5730\u699C", bangid: "23189399", webId: "mainland" }, { id: "mg__19190036", name: "\u6B27\u7F8E\u699C", bangid: "19190036", webId: "eur_usa" }, { id: "mg__23189813", name: "\u65E5\u97E9\u699C", bangid: "23189813", webId: "jpn_kor" }, { id: "mg__23190126", name: "\u5F69\u94C3\u699C", bangid: "23190126", webId: "coloring" }, { id: "mg__15140045", name: "KTV\u699C", bangid: "15140045", webId: "ktv" }, { id: "mg__15140034", name: "\u7F51\u7EDC\u699C", bangid: "15140034", webId: "network" }, { id: "mg__21958042", name: "\u7F8E\u56FDiTunes\u699C", bangid: "21958042", webId: "itunes" }, { id: "mg__21975570", name: "\u7F8E\u56FDbillboard\u699C", bangid: "21975570", webId: "billboard" }, { id: "mg__22272815", name: "\u53F0\u6E7EHito\u4E2D\u6587\u699C", bangid: "22272815", webId: "hito" }, { id: "mg__22272943", name: "\u97E9\u56FDMelon\u699C", bangid: "22272943", webId: "mnet" }, { id: "mg__22273437", name: "\u82F1\u56FDUK\u699C", bangid: "22273437", webId: "uk" }];
      leaderboard_default5 = {
        limit: 200,
        list: [
          {
            id: "mgyyb",
            name: "\u97F3\u4E50\u699C",
            bangid: "27553319"
          },
          {
            id: "mgysb",
            name: "\u5F71\u89C6\u699C",
            bangid: "23603721"
          },
          {
            id: "mghybnd",
            name: "\u534E\u8BED\u5185\u5730\u699C",
            bangid: "23603926"
          },
          {
            id: "mghyjqbgt",
            name: "\u534E\u8BED\u6E2F\u53F0\u699C",
            bangid: "23603954"
          },
          {
            id: "mgomb",
            name: "\u6B27\u7F8E\u699C",
            bangid: "23603974"
          },
          {
            id: "mgrhb",
            name: "\u65E5\u97E9\u699C",
            bangid: "23603982"
          },
          {
            id: "mgwlb",
            name: "\u7F51\u7EDC\u699C",
            bangid: "23604058"
          },
          {
            id: "mgclb",
            name: "\u5F69\u94C3\u699C",
            bangid: "23604023"
          },
          {
            id: "mgktvb",
            name: "KTV\u699C",
            bangid: "23604040"
          },
          {
            id: "mgrcb",
            name: "\u539F\u521B\u699C",
            bangid: "23604032"
          }
        ],
        getUrl(id, page) {
          return `https://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/querycontentbyId.do?columnId=${id}&needAll=0`;
        },
        successCode: "000000",
        requestBoardsObj: null,
        getBoardsData() {
          if (this.requestBoardsObj) this._requestBoardsObj.cancelHttp();
          this.requestBoardsObj = httpFetch("https://app.c.nf.migu.cn/MIGUM3.0/v1.0/template/rank-list/release", {
            // this.requestBoardsObj = httpFetch('https://app.c.nf.migu.cn/MIGUM2.0/v2.0/content/indexrank.do?templateVersion=8', {
            headers: {
              Referer: "https://app.c.nf.migu.cn/",
              "User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
              channel: "0146921"
            }
          });
          return this.requestBoardsObj.promise;
        },
        getData(url) {
          const requestObj = httpFetch(url);
          return requestObj.promise;
        },
        getSinger(singers) {
          let arr = [];
          singers.forEach((singer) => {
            arr.push(singer.name);
          });
          return arr.join("\u3001");
        },
        filterData(rawData) {
          let ids = /* @__PURE__ */ new Set();
          const list = [];
          rawData.forEach(({ objectInfo: item }) => {
            if (ids.has(item.copyrightId)) return;
            ids.add(item.copyrightId);
            const types = [];
            const _types = {};
            item.newRateFormats && item.newRateFormats.forEach((type) => {
              let size;
              switch (type.formatType) {
                case "PQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "128k", size });
                  _types["128k"] = {
                    size
                  };
                  break;
                case "HQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "320k", size });
                  _types["320k"] = {
                    size
                  };
                  break;
                case "SQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "flac", size });
                  _types.flac = {
                    size
                  };
                  break;
                case "ZQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "flac24bit", size });
                  _types.flac24bit = {
                    size
                  };
                  break;
              }
            });
            const intervalTest = /(\d\d:\d\d)$/.exec(item.length);
            list.push({
              singer: this.getSinger(item.artists),
              name: item.songName,
              albumName: item.album,
              albumId: item.albumId,
              songmid: item.copyrightId,
              songId: item.songId,
              copyrightId: item.copyrightId,
              source: "mg",
              interval: intervalTest ? intervalTest[1] : null,
              img: item.albumImgs && item.albumImgs.length ? item.albumImgs[0].img : null,
              lrc: null,
              lrcUrl: item.lrcUrl,
              mrcUrl: item.mrcUrl,
              trcUrl: item.trcUrl,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            });
          });
          return list;
        },
        filterBoardsData(rawList) {
          let list = [];
          for (const board of rawList) {
            if (board.template != "group1") continue;
            for (const item of board.itemList) {
              if (item.template != "row1" && item.template != "grid1" && !item.actionUrl || !item.actionUrl.includes("rank-info")) continue;
              let data = item.displayLogId.param;
              list.push({
                id: "mg__" + data.rankId,
                name: data.rankName,
                bangid: String(data.rankId)
              });
            }
          }
          return list;
        },
        async getBoards(retryNum = 0) {
          this.list = boardList4;
          return {
            list: boardList4,
            source: "mg"
          };
        },
        getList(bangid, page, retryNum = 0) {
          if (++retryNum > 3) return Promise.reject(new Error("try max num"));
          return this.getData(this.getUrl(bangid, page)).then(({ statusCode, body }) => {
            if (statusCode !== 200 || body.code !== this.successCode) return this.getList(bangid, page, retryNum);
            const list = this.filterData(body.columnInfo.contents);
            return {
              total: list.length,
              list,
              limit: this.limit,
              page,
              source: "mg"
            };
          });
        },
        getDetailPageUrl(id) {
          if (typeof id == "string") id = id.replace("mg__", "");
          for (const item of boardList4) {
            if (item.bangid == id) {
              return `https://music.migu.cn/v3/music/top/${item.webId}`;
            }
          }
          return null;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/songList.js
  var songList_default5;
  var init_songList5 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/songList.js"() {
      init_request();
      init_utils();
      songList_default5 = {
        _requestObj_tags: null,
        _requestObj_list: null,
        limit_list: 10,
        limit_song: 30,
        successCode: "000000",
        cachedDetailInfo: {},
        cachedUrl: {},
        sortList: [
          {
            name: "\u63A8\u8350",
            id: "15127315",
            tid: "recommend"
            // id: '1',
          },
          {
            name: "\u6700\u65B0",
            id: "15127272",
            tid: "new"
            // id: '2',
          }
        ],
        regExps: {
          list: /<li><div class="thumb">.+?<\/li>/g,
          listInfo: /.+data-original="(.+?)".*data-id="(\d+)".*<div class="song-list-name"><a\s.*?>(.+?)<\/a>.+<i class="iconfont cf-bofangliang"><\/i>(.+?)<\/div>/,
          // https://music.migu.cn/v3/music/playlist/161044573?page=1
          listDetailLink: /^.+\/playlist\/(\d+)(?:\?.*|&.*$|#.*$|$)/
        },
        tagsUrl: "https://app.c.nf.migu.cn/MIGUM3.0/v1.0/template/musiclistplaza-taglist/release",
        // tagsUrl: 'https://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/indexTagPage.do?needAll=0',
        getSongListUrl(sortId, tagId, page) {
          if (tagId == null) {
            return `https://m.music.migu.cn/migu/remoting/playlist_bycolumnid_tag?playListType=2&type=1&columnId=${sortId}&startIndex=${(page - 1) * 10}`;
          }
          return `https://m.music.migu.cn/migu/remoting/playlist_bycolumnid_tag?playListType=2&type=1&tagId=${tagId}&startIndex=${(page - 1) * 10}`;
        },
        getSongListDetailUrl(id, page) {
          return `https://app.c.nf.migu.cn/MIGUM2.0/v1.0/user/queryMusicListSongs.do?musicListId=${id}&pageNo=${page}&pageSize=${this.limit_song}`;
        },
        defaultHeaders: {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
          Referer: "https://m.music.migu.cn/"
          // language: 'Chinese',
          // ua: 'Android_migu',
          // mode: 'android',
          // version: '6.8.5',
        },
        /**
         * 格式化播放数量
         * @param {*} num
         */
        formatPlayCount(num) {
          if (num > 1e8) return parseInt(num / 1e7) / 10 + "\u4EBF";
          if (num > 1e4) return parseInt(num / 1e3) / 10 + "\u4E07";
          return num;
        },
        getListDetailList(id, page, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          if (/playlist\/index\.html\?/.test(id)) {
            id = id.replace(/.*(?:\?|&)id=(\d+)(?:&.*|$)/, "$1");
          } else if (/[?&:/]/.test(id)) id = id.replace(this.regExps.listDetailLink, "$1");
          const requestObj_listDetail = httpFetch(this.getSongListDetailUrl(id, page), { headers: this.defaultHeaders });
          return requestObj_listDetail.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getListDetail(id, page, ++tryNum);
            return {
              list: this.filterListDetail(body.list),
              page,
              limit: this.limit_song,
              total: body.totalCount,
              source: "mg"
            };
          });
        },
        getListDetailInfo(id, tryNum = 0) {
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          if (this.cachedDetailInfo[id]) return Promise.resolve(this.cachedDetailInfo[id]);
          const requestObj_listDetailInfo = httpFetch(`https://c.musicapp.migu.cn/MIGUM3.0/resource/playlist/v2.0?playlistId=${id}`, {
            headers: this.defaultHeaders
          });
          return requestObj_listDetailInfo.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getListDetail(id, ++tryNum);
            const cachedDetailInfo = this.cachedDetailInfo[id] = {
              name: body.data.title,
              img: body.data.imgItem.img,
              desc: body.data.summary,
              author: body.data.ownerName,
              play_count: this.formatPlayCount(body.data.opNumItem.playNum)
            };
            return cachedDetailInfo;
          });
        },
        async getDetailUrl(link, page, retryNum = 0) {
          if (retryNum > 3) return Promise.reject(new Error("link try max num"));
          const requestObj_listDetailLink = httpFetch(link, {
            headers: {
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
              Referer: link
            }
          });
          const { url: location, statusCode } = await requestObj_listDetailLink.promise;
          if (statusCode > 400) return this.getDetailUrl(link, page, ++retryNum);
          if (location.split("?")[0] != link.split("?")[0]) {
            this.cachedUrl[link] = location;
            return this.getListDetail(location, page);
          }
          return Promise.reject(new Error("link get failed"));
        },
        getListDetail(id, page, retryNum = 0) {
          if (/playlist\/index\.html\?/.test(id)) {
            id = id.replace(/.*(?:\?|&)id=(\d+)(?:&.*|$)/, "$1");
          } else if (this.regExps.listDetailLink.test(id)) {
            id = id.replace(this.regExps.listDetailLink, "$1");
          } else if (/[?&:/]/.test(id)) {
            const url = this.cachedUrl[id];
            return url ? this.getListDetail(url, page) : this.getDetailUrl(id, page);
          }
          return Promise.all([
            this.getListDetailList(id, page, retryNum),
            this.getListDetailInfo(id, retryNum)
          ]).then(([listData, info]) => {
            listData.info = info;
            return listData;
          });
        },
        filterListDetail(rawList) {
          let ids = /* @__PURE__ */ new Set();
          const list = [];
          rawList.forEach((item) => {
            if (ids.has(item.songId)) return;
            ids.add(item.songId);
            const types = [];
            const _types = {};
            item.newRateFormats && item.newRateFormats.forEach((type) => {
              let size;
              switch (type.formatType) {
                case "PQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "128k", size });
                  _types["128k"] = {
                    size
                  };
                  break;
                case "HQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "320k", size });
                  _types["320k"] = {
                    size
                  };
                  break;
                case "SQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "flac", size });
                  _types.flac = {
                    size
                  };
                  break;
                case "ZQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "flac24bit", size });
                  _types.flac24bit = {
                    size
                  };
                  break;
              }
            });
            const intervalTest = /(\d\d:\d\d)$/.exec(item.length);
            list.push({
              singer: item.singer,
              name: item.songName,
              albumName: item.album,
              albumId: item.albumId,
              songmid: item.copyrightId,
              copyrightId: item.copyrightId,
              songId: item.songId,
              source: "mg",
              interval: intervalTest ? intervalTest[1] : null,
              img: item.albumImgs && item.albumImgs.length ? item.albumImgs[0].img : null,
              lrc: null,
              lrcUrl: item.lrcUrl,
              mrcUrl: item.mrcUrl,
              trcUrl: item.trcUrl,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            });
          });
          return list;
        },
        // 获取列表数据
        getList(sortId, tagId, page, tryNum = 0) {
          if (this._requestObj_list) this._requestObj_list.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_list = httpFetch(this.getSongListUrl(sortId, tagId, page), {
            headers: this.defaultHeaders
            // headers: {
            //   sign: 'c3b7ae985e2206e97f1b2de8f88691e2',
            //   timestamp: 1578225871982,
            //   appId: 'yyapp2',
            //   mode: 'android',
            //   ua: 'Android_migu',
            //   version: '6.9.4',
            //   osVersion: 'android 7.0',
            //   'User-Agent': 'okhttp/3.9.1',
            // },
          });
          return this._requestObj_list.promise.then(({ body }) => {
            if (body.retCode !== "100000" || body.retMsg.code !== this.successCode) return this.getList(sortId, tagId, page, ++tryNum);
            return {
              list: this.filterList(body.retMsg.playlist),
              total: parseInt(body.retMsg.countSize),
              page,
              limit: this.limit_list,
              source: "mg"
            };
          });
        },
        filterList(rawData) {
          return rawData.map((item) => ({
            play_count: this.formatPlayCount(item.playCount),
            id: item.playListId,
            author: item.createName,
            name: item.playListName,
            time: dateFormat(item.createTime, "Y-M-D"),
            img: item.image,
            grade: item.grade,
            total: item.contentCount,
            desc: item.summary,
            source: "mg"
          }));
        },
        // 获取标签
        getTag(tryNum = 0) {
          if (this._requestObj_tags) this._requestObj_tags.cancelHttp();
          if (tryNum > 2) return Promise.reject(new Error("try max num"));
          this._requestObj_tags = httpFetch(this.tagsUrl, { headers: this.defaultHeaders });
          return this._requestObj_tags.promise.then(({ body }) => {
            if (body.code !== this.successCode) return this.getTag(++tryNum);
            return this.filterTagInfo(body.data);
          });
        },
        filterTagInfo(rawList) {
          return {
            hotTag: rawList[0].content.map(({ texts: [name, id] }) => ({
              id,
              name,
              source: "mg"
            })),
            tags: rawList.slice(1).map(({ header, content }) => ({
              name: header.title,
              list: content.map(({ texts: [name, id] }) => ({
                // parent_id: objectInfo.columnId,
                // parent_name: objectInfo.columnTitle,
                id,
                name,
                source: "mg"
              }))
            })),
            source: "mg"
          };
        },
        getTags() {
          return this.getTag();
        },
        getDetailPageUrl(id) {
          if (/playlist\/index\.html\?/.test(id)) {
            id = id.replace(/.*(?:\?|&)id=(\d+)(?:&.*|$)/, "$1");
          } else if (this.regExps.listDetailLink.test(id)) {
            id = id.replace(this.regExps.listDetailLink, "$1");
          }
          return `https://music.migu.cn/v3/music/playlist/${id}`;
        },
        search(text, page, limit = 20) {
          return httpFetch(`http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?ua=Android_migu&version=5.0.1&text=${encodeURIComponent(text)}&pageNo=${page}&pageSize=${limit}&searchSwitch=%7B%22song%22%3A0%2C%22album%22%3A0%2C%22singer%22%3A0%2C%22tagSong%22%3A0%2C%22mvSong%22%3A0%2C%22bestShow%22%3A1%2C%22songlist%22%3A1%2C%22lyricSong%22%3A0%7D`, {
            headers: {
              "User-Agent": "okhttp/3.9.1",
              osVersion: "android 7.0"
            }
            // family: 6,
          }).promise.then(({ body }) => {
            if (body.code != this.successCode) throw new Error("failed");
            return {
              list: body.songListResultData.result.map((item) => {
                return {
                  play_count: this.formatPlayCount(item.playcount),
                  id: item.id,
                  // author: item.createName,
                  name: item.name,
                  // time: item.createTime,
                  img: item.musicListPicUrl,
                  total: item.musicNum,
                  source: "mg"
                };
              }),
              limit,
              total: parseInt(body.songListResultData.totalCount),
              source: "mg"
            };
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/musicSearch.js
  var musicSearch_default5;
  var init_musicSearch5 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/musicSearch.js"() {
      init_request();
      init_utils();
      musicSearch_default5 = {
        limit: 20,
        total: 0,
        page: 0,
        allPage: 1,
        musicSearch(str, page, limit) {
          const searchRequest = httpFetch(`http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?ua=Android_migu&version=5.0.1&text=${encodeURIComponent(str)}&pageNo=${page}&pageSize=${limit}&searchSwitch=%7B%22song%22%3A1%2C%22album%22%3A0%2C%22singer%22%3A0%2C%22tagSong%22%3A0%2C%22mvSong%22%3A0%2C%22songlist%22%3A0%2C%22bestShow%22%3A1%7D`, {
            // searchRequest = httpFetch(`http://jadeite.migu.cn:7090/music_search/v2/search/searchAll?sid=4f87090d01c84984a11976b828e2b02c18946be88a6b4c47bcdc92fbd40762db&isCorrect=1&isCopyright=1&searchSwitch=%7B%22song%22%3A1%2C%22album%22%3A0%2C%22singer%22%3A0%2C%22tagSong%22%3A1%2C%22mvSong%22%3A0%2C%22bestShow%22%3A1%2C%22songlist%22%3A0%2C%22lyricSong%22%3A0%7D&pageSize=${limit}&text=${encodeURIComponent(str)}&pageNo=${page}&sort=0`, {
            headers: {
              // sign: 'c3b7ae985e2206e97f1b2de8f88691e2',
              // timestamp: 1578225871982,
              // appId: 'yyapp2',
              // mode: 'android',
              // ua: 'Android_migu',
              // version: '6.9.4',
              osVersion: "android 7.0",
              "User-Agent": "okhttp/3.9.1"
            }
          });
          return searchRequest.promise.then(({ body }) => body);
        },
        getSinger(singers) {
          let arr = [];
          singers.forEach((singer) => {
            arr.push(singer.name);
          });
          return arr.join("\u3001");
        },
        handleResult(rawData) {
          let ids = /* @__PURE__ */ new Set();
          const list = [];
          rawData.forEach((item) => {
            if (ids.has(item.id)) return;
            ids.add(item.id);
            const types = [];
            const _types = {};
            item.newRateFormats && item.newRateFormats.forEach((type) => {
              let size;
              switch (type.formatType) {
                case "PQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "128k", size });
                  _types["128k"] = {
                    size
                  };
                  break;
                case "HQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "320k", size });
                  _types["320k"] = {
                    size
                  };
                  break;
                case "SQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "flac", size });
                  _types.flac = {
                    size
                  };
                  break;
                case "ZQ":
                  size = sizeFormate(type.size ?? type.androidSize);
                  types.push({ type: "flac24bit", size });
                  _types.flac24bit = {
                    size
                  };
                  break;
              }
            });
            const albumNInfo = item.albums && item.albums.length ? {
              id: item.albums[0].id,
              name: item.albums[0].name
            } : {};
            list.push({
              singer: this.getSinger(item.singers),
              name: item.name,
              albumName: albumNInfo.name,
              albumId: albumNInfo.id,
              songmid: item.copyrightId,
              songId: item.songId,
              copyrightId: item.copyrightId,
              source: "mg",
              interval: null,
              img: item.imgItems && item.imgItems.length ? item.imgItems[0].img : null,
              lrc: null,
              lrcUrl: item.lyricUrl,
              mrcUrl: item.mrcurl,
              trcUrl: item.trcUrl,
              otherSource: null,
              types,
              _types,
              typeUrl: {}
            });
          });
          return list;
        },
        search(str, page = 1, limit, retryNum = 0) {
          if (++retryNum > 3) return Promise.reject(new Error("try max num"));
          if (limit == null) limit = this.limit;
          return this.musicSearch(str, page, limit).then((result) => {
            if (!result || result.code !== "000000") return Promise.reject(new Error(result ? result.info : "\u641C\u7D22\u5931\u8D25"));
            const songResultData = result.songResultData || { result: [], totalCount: 0 };
            let list = this.handleResult(songResultData.result);
            if (list == null) return this.search(str, page, limit, retryNum);
            this.total = parseInt(songResultData.totalCount);
            this.page = page;
            this.allPage = Math.ceil(this.total / limit);
            return Promise.resolve({
              list,
              allPage: this.allPage,
              limit,
              total: this.total,
              source: "mg"
            });
          });
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/pic.js
  var pic_default3;
  var init_pic3 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/pic.js"() {
      init_request();
      pic_default3 = {
        getPic(songInfo, tryNum = 0) {
          let requestObj = httpFetch(`http://music.migu.cn/v3/api/music/audioPlayer/getSongPic?songId=${songInfo.songmid}`, {
            headers: {
              Referer: "http://music.migu.cn/v3/music/player/audio?from=migu"
            }
          });
          requestObj.promise = requestObj.promise.then(({ body }) => {
            if (body.returnCode !== "000000") {
              if (tryNum > 5) return Promise.reject("\u56FE\u7247\u83B7\u53D6\u5931\u8D25");
              let tryRequestObj = this.getPic(songInfo, ++tryNum);
              requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj);
              return tryRequestObj.promise;
            }
            return body.largePic || body.mediumPic || body.smallPic;
          });
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/mrc.js
  var DELTA, MIN_LENGTH, keyArr, teaDecrypt, longArrToString, longToBytes, toBigintArray, MAX, MIN, toLong, decrypt;
  var init_mrc = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/mrc.js"() {
      DELTA = 2654435769n;
      MIN_LENGTH = 32;
      keyArr = [
        27303562373562475n,
        18014862372307051n,
        22799692160172081n,
        34058940340699235n,
        30962724186095721n,
        27303523720101991n,
        27303523720101998n,
        31244139033526382n,
        28992395054481524n
      ];
      teaDecrypt = (data, key) => {
        const length = data.length;
        const lengthBitint = BigInt(length);
        if (length >= 1) {
          let j2 = data[0];
          let j3 = toLong((6n + 52n / lengthBitint) * DELTA);
          while (true) {
            let j4 = j3;
            if (j4 == 0n) break;
            let j5 = toLong(3n & toLong(j4 >> 2n));
            let j6 = lengthBitint;
            while (true) {
              j6--;
              if (j6 > 0n) {
                let j7 = data[j6 - 1n];
                let i = j6;
                j2 = toLong(data[i] - (toLong(toLong(j2 ^ j4) + toLong(j7 ^ key[toLong(toLong(3n & j6) ^ j5)])) ^ toLong(toLong(toLong(j7 >> 5n) ^ toLong(j2 << 2n)) + toLong(toLong(j2 >> 3n) ^ toLong(j7 << 4n)))));
                data[i] = j2;
              } else break;
            }
            let j8 = data[lengthBitint - 1n];
            j2 = toLong(data[0n] - toLong(toLong(toLong(key[toLong(toLong(j6 & 3n) ^ j5)] ^ j8) + toLong(j2 ^ j4)) ^ toLong(toLong(toLong(j8 >> 5n) ^ toLong(j2 << 2n)) + toLong(toLong(j2 >> 3n) ^ toLong(j8 << 4n)))));
            data[0] = j2;
            j3 = toLong(j4 - DELTA);
          }
        }
        return data;
      };
      longArrToString = (data) => {
        const arrayList = [];
        for (const j of data) arrayList.push(longToBytes(j).toString("utf16le"));
        return arrayList.join("");
      };
      longToBytes = (l) => {
        const result = Buffer.alloc(8);
        for (let i = 0; i < 8; i++) {
          result[i] = parseInt(l & 0xFFn);
          l >>= 8n;
        }
        return result;
      };
      toBigintArray = (data) => {
        const length = Math.floor(data.length / 16);
        const jArr = Array(length);
        for (let i = 0; i < length; i++) {
          jArr[i] = toLong(data.substring(i * 16, i * 16 + 16));
        }
        return jArr;
      };
      MAX = 9223372036854775807n;
      MIN = -9223372036854775808n;
      toLong = (str) => {
        const num = typeof str == "string" ? BigInt("0x" + str) : str;
        if (num > MAX) return toLong(num - (1n << 64n));
        else if (num < MIN) return toLong(num + (1n << 64n));
        return num;
      };
      decrypt = (data) => {
        return data == null || data.length < MIN_LENGTH ? data : longArrToString(teaDecrypt(toBigintArray(data), keyArr));
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/lyric.js
  var mrcTools, lyric_default5;
  var init_lyric5 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/lyric.js"() {
      init_request();
      init_musicSearch5();
      init_mrc();
      mrcTools = {
        rxps: {
          lineTime: /^\s*\[(\d+),\d+\]/,
          wordTime: /\(\d+,\d+\)/,
          wordTimeAll: /(\(\d+,\d+\))/g
        },
        parseLyric(str) {
          str = str.replace(/\r/g, "");
          const lines = str.split("\n");
          const lxlrcLines = [];
          const lrcLines = [];
          for (const line of lines) {
            if (line.length < 6) continue;
            let result = this.rxps.lineTime.exec(line);
            if (!result) continue;
            const startTime = parseInt(result[1]);
            let time = startTime;
            let ms = time % 1e3;
            time /= 1e3;
            let m = parseInt(time / 60).toString().padStart(2, "0");
            time %= 60;
            let s = parseInt(time).toString().padStart(2, "0");
            time = `${m}:${s}.${ms}`;
            let words = line.replace(this.rxps.lineTime, "");
            lrcLines.push(`[${time}]${words.replace(this.rxps.wordTimeAll, "")}`);
            let times = words.match(this.rxps.wordTimeAll);
            if (!times) continue;
            times = times.map((time2) => {
              const result2 = /\((\d+),(\d+)\)/.exec(time2);
              return `<${parseInt(result2[1]) - startTime},${result2[2]}>`;
            });
            const wordArr = words.split(this.rxps.wordTime);
            const newWords = times.map((time2, index) => `${time2}${wordArr[index]}`).join("");
            lxlrcLines.push(`[${time}]${newWords}`);
          }
          return {
            lyric: lrcLines.join("\n"),
            lxlyric: lxlrcLines.join("\n")
          };
        },
        getText(url, tryNum = 0) {
          const requestObj = httpFetch(url, {
            headers: {
              Referer: "https://app.c.nf.migu.cn/",
              "User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
              channel: "0146921"
            }
          });
          return requestObj.promise.then(({ statusCode, body }) => {
            if (statusCode == 200) return body;
            if (tryNum > 5 || statusCode == 404) return Promise.reject("\u6B4C\u8BCD\u83B7\u53D6\u5931\u8D25");
            return this.getText(url, ++tryNum);
          });
        },
        getMrc(url) {
          return this.getText(url).then((text) => {
            return this.parseLyric(decrypt(text));
          });
        },
        getLrc(url) {
          return this.getText(url).then((text) => ({ lxlyric: "", lyric: text }));
        },
        getTrc(url) {
          if (!url) return Promise.resolve("");
          return this.getText(url);
        },
        getMusicInfo(songInfo) {
          return songInfo.mrcUrl == null ? musicSearch_default5.search(`${songInfo.name} ${songInfo.singer || ""}`.trim(), 1, { limit: 25 }).then(({ list }) => {
            const targetSong = list.find((s) => s.songmid == songInfo.songmid);
            return targetSong ? { lrcUrl: targetSong.lrcUrl, mrcUrl: targetSong.mrcUrl, trcUrl: targetSong.trcUrl } : Promise.reject("\u83B7\u53D6\u6B4C\u8BCD\u5931\u8D25");
          }) : Promise.resolve({ lrcUrl: songInfo.lrcUrl, mrcUrl: songInfo.mrcUrl, trcUrl: songInfo.trcUrl });
        },
        getLyric(songInfo) {
          return {
            promise: this.getMusicInfo(songInfo).then((info) => {
              let p;
              if (info.mrcUrl) p = this.getMrc(info.mrcUrl);
              else if (info.lrcUrl) p = this.getLrc(info.lrcUrl);
              if (p == null) return Promise.reject("\u83B7\u53D6\u6B4C\u8BCD\u5931\u8D25");
              return Promise.all([p, this.getTrc(info.trcUrl)]).then(([lrcInfo, tlyric]) => {
                lrcInfo.tlyric = tlyric;
                return lrcInfo;
              });
            }),
            cancelHttp() {
            }
          };
        }
      };
      lyric_default5 = {
        getLyricWeb(songInfo, tryNum = 0) {
          if (songInfo.lrcUrl) {
            let requestObj = httpFetch(songInfo.lrcUrl);
            requestObj.promise = requestObj.promise.then(({ body, statusCode }) => {
              if (statusCode !== 200) {
                if (tryNum > 5) return Promise.reject("\u6B4C\u8BCD\u83B7\u53D6\u5931\u8D25");
                let tryRequestObj = this.getLyricWeb(songInfo, ++tryNum);
                requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj);
                return tryRequestObj.promise;
              }
              return {
                lyric: body,
                tlyric: ""
              };
            });
            return requestObj;
          } else {
            let requestObj = httpFetch(`https://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=${songInfo.copyrightId}`, {
              headers: {
                Referer: "https://music.migu.cn/v3/music/player/audio?from=migu"
              }
            });
            requestObj.promise = requestObj.promise.then(({ body }) => {
              if (body.returnCode !== "000000" || !body.lyric) {
                if (tryNum > 5) return Promise.reject(new Error("Get lyric failed"));
                let tryRequestObj = this.getLyricWeb(songInfo, ++tryNum);
                requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj);
                return tryRequestObj.promise;
              }
              return {
                lyric: body.lyric,
                tlyric: ""
              };
            });
            return requestObj;
          }
        },
        getLyric(songInfo) {
          let requestObj = mrcTools.getLyric(songInfo);
          requestObj.promise = requestObj.promise.catch(() => {
            let webRequestObj = this.getLyricWeb(songInfo);
            requestObj.cancelHttp = webRequestObj.cancelHttp.bind(webRequestObj);
            return webRequestObj.promise;
          });
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/hotSearch.js
  var hotSearch_default5;
  var init_hotSearch5 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/hotSearch.js"() {
      init_request();
      hotSearch_default5 = {
        _requestObj: null,
        async getList(retryNum = 0) {
          if (this._requestObj) this._requestObj.cancelHttp();
          if (retryNum > 2) return Promise.reject(new Error("try max num"));
          const _requestObj = httpFetch("http://jadeite.migu.cn:7090/music_search/v2/search/hotword");
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.code !== "000000") throw new Error("\u83B7\u53D6\u70ED\u641C\u8BCD\u5931\u8D25");
          return { source: "mg", list: this.filterList(body.data) };
        },
        filterList(rawList) {
          return rawList.map((item) => item.word);
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/album.js
  var album_default2;
  var init_album2 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/album.js"() {
      init_request();
      album_default2 = {
        getAlbum(songInfo, tryNum = 0) {
          let requestObj = httpFetch(`http://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/queryAlbumSong?albumId=${songInfo.albumId}&pageNo=1`, {
            headers: {
              sign: "46DB65104950B98FE451AD41047CC6C4",
              timestamp: 1603451430776,
              appId: "yyapp2",
              mode: "android",
              ua: "Android_migu",
              version: "6.9.4",
              osVersion: "android 7.0",
              "User-Agent": "okhttp/3.9.1",
              channel: "0146832"
            }
          });
          requestObj.promise = requestObj.promise.then(({ body }) => {
            if (body.code !== "000000") {
              if (tryNum > 5) return Promise.reject("\u83B7\u53D6\u4E13\u8F91\u5931\u8D25");
              let tryRequestObj = this.getAlbum(songInfo, ++tryNum);
              requestObj.cancelHttp = tryRequestObj.cancelHttp.bind(tryRequestObj);
              return tryRequestObj.promise;
            }
            return body.songList;
          });
          return requestObj;
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/comment.js
  var comment_default5;
  var init_comment5 = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/comment.js"() {
      init_request();
      init_album2();
      init_utils();
      comment_default5 = {
        _requestObj: null,
        _requestObj2: null,
        _requestObj3: null,
        async getSongId(musicInfo) {
          if (this._requestObj3) this._requestObj3.cancelHttp();
          this.requestObj3 = album_default2.getAlbum(musicInfo);
          const list = await this.requestObj3.promise;
          const copyrightId = musicInfo.copyrightId;
          let info = list.find((s) => s.copyrightId == copyrightId);
          const songmid = musicInfo.songmid;
          if (!info) info = list.find((s) => s.songId == songmid);
          return info ? info.songId : null;
        },
        async getComment(musicInfo, page = 1, limit = 10) {
          if (this._requestObj) this._requestObj.cancelHttp();
          if (!musicInfo.songId) {
            let id = await this.getSongId(musicInfo);
            if (!id) throw new Error("\u83B7\u53D6\u8BC4\u8BBA\u5931\u8D25");
            musicInfo.songId = id;
          }
          const _requestObj = httpFetch(`https://music.migu.cn/v3/api/comment/listComments?targetId=${musicInfo.songId}&pageSize=${limit}&pageNo=${page}`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4195.1 Safari/537.36",
              Referer: "https://music.migu.cn"
            }
          });
          const { body, statusCode } = await _requestObj.promise;
          if (statusCode != 200 || body.returnCode !== "000000") throw new Error("\u83B7\u53D6\u8BC4\u8BBA\u5931\u8D25");
          return { source: "mg", comments: this.filterComment(body.data.items), total: body.data.itemTotal, page, limit, maxPage: Math.ceil(body.data.itemTotal / limit) || 1 };
        },
        async getHotComment(musicInfo, page = 1, limit = 5) {
          if (this._requestObj2) this._requestObj2.cancelHttp();
          if (!musicInfo.songId) {
            let id = await this.getSongId(musicInfo);
            if (!id) throw new Error("\u83B7\u53D6\u8BC4\u8BBA\u5931\u8D25");
            musicInfo.songId = id;
          }
          const _requestObj2 = httpFetch(`https://music.migu.cn/v3/api/comment/listTopComments?targetId=${musicInfo.songId}&pageSize=${limit}&pageNo=${page}`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4195.1 Safari/537.36",
              Referer: "https://music.migu.cn"
            }
          });
          const { body, statusCode } = await _requestObj2.promise;
          if (statusCode != 200 || body.returnCode !== "000000") throw new Error("\u83B7\u53D6\u70ED\u95E8\u8BC4\u8BBA\u5931\u8D25");
          return { source: "mg", comments: this.filterComment(body.data.items), total: body.data.itemTotal, page, limit, maxPage: Math.ceil(body.data.itemTotal / limit) || 1 };
        },
        async getReplyComment(musicInfo, replyId, page = 1, limit = 10) {
          if (this._requestObj2) this._requestObj2.cancelHttp();
          const _requestObj2 = httpFetch(`https://music.migu.cn/v3/api/comment/listCommentsById?commentId=${replyId}&pageSize=${limit}&pageNo=${page}`, {
            headers: {
              "User-Agent": "Android712-AndroidPhone-8983-18-0-COMMENT-wifi"
            }
          });
          const { body, statusCode } = await _requestObj2.promise;
          if (statusCode != 200 || body.returnCode !== "000000") throw new Error("\u83B7\u53D6\u56DE\u590D\u8BC4\u8BBA\u5931\u8D25");
          return { source: "mg", comments: this.filterComment(body.data.items) };
        },
        filterComment(rawList) {
          return rawList.map((item) => ({
            id: item.commentId,
            text: item.body.split("\n"),
            time: item.createTime,
            timeStr: dateFormat2(new Date(item.createTime).getTime()),
            userName: item.author.name,
            avatar: item.author.avatar && item.author.avatar.startsWith("//") ? `http:${item.author.avatar}` : item.author.avatar,
            userId: item.author.id,
            likedCount: item.praiseCount,
            replyNum: item.replyTotal,
            reply: item.replyCommentList.map((c) => ({
              id: c.commentId,
              text: c.body.split("\n"),
              time: c.createTime,
              timeStr: dateFormat2(new Date(c.createTime).getTime()),
              userName: c.author.name,
              avatar: c.author.avatar,
              userId: c.author.id,
              likedCount: c.praiseCount,
              replyNum: c.replyTotal
            }))
          }));
        }
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/index.js
  var mg, mg_default;
  var init_mg = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/mg/index.js"() {
      init_api_source();
      init_leaderboard5();
      init_songList5();
      init_musicSearch5();
      init_pic3();
      init_lyric5();
      init_hotSearch5();
      init_comment5();
      mg = {
        songList: songList_default5,
        musicSearch: musicSearch_default5,
        leaderboard: leaderboard_default5,
        hotSearch: hotSearch_default5,
        comment: comment_default5,
        getMusicUrl(songInfo, type) {
          return apis("mg").getMusicUrl(songInfo, type);
        },
        getLyric(songInfo) {
          return lyric_default5.getLyric(songInfo);
        },
        getPic(songInfo) {
          return pic_default3.getPic(songInfo);
        },
        getMusicDetailPageUrl(songInfo) {
          return `http://music.migu.cn/v3/music/song/${songInfo.copyrightId}`;
        }
      };
      mg_default = mg;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/xm.js
  var xm, xm_default;
  var init_xm = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/xm.js"() {
      xm = {
        // songList,
        // musicSearch,
        // leaderboard,
        // hotSearch,
        // closeVerifyModal,
        comment: {
          getComment() {
            return Promise.reject(new Error("fail"));
          },
          getHotComment() {
            return Promise.reject(new Error("fail"));
          }
        },
        getMusicUrl(songInfo, type) {
          return {
            promise: Promise.reject(new Error("fail"))
          };
        },
        getLyric(songInfo) {
          return {
            promise: Promise.reject(new Error("fail"))
          };
        },
        getPic(songInfo) {
          return {
            promise: Promise.reject(new Error("fail"))
          };
        }
        // getMusicDetailPageUrl(songInfo) {
        //   if (songInfo.songStringId) return `https://www.xiami.com/song/${songInfo.songStringId}`
        //   musicInfo.getMusicInfo(songInfo).then(({ data }) => {
        //     songInfo.songStringId = data.songStringId
        //   })
        //   return `https://www.xiami.com/song/${songInfo.songmid}`
        // },
        // init() {
        //   getToken()
        // },
      };
      xm_default = xm;
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/index.js
  var sources, musicSdk_default, init, findMusic;
  var init_musicSdk = __esm({
    "../root/.codebuddy/artifact/lxmusic/bundle/src/utils/musicSdk/index.js"() {
      init_kw();
      init_kg();
      init_tx();
      init_wy();
      init_mg();
      init_xm();
      init_api_source();
      sources = {
        sources: [
          {
            name: "\u9177\u6211\u97F3\u4E50",
            id: "kw"
          },
          {
            name: "\u9177\u72D7\u97F3\u4E50",
            id: "kg"
          },
          {
            name: "QQ\u97F3\u4E50",
            id: "tx"
          },
          {
            name: "\u7F51\u6613\u97F3\u4E50",
            id: "wy"
          },
          {
            name: "\u54AA\u5495\u97F3\u4E50",
            id: "mg"
          }
          // {
          //   name: '百度音乐',
          //   id: 'bd',
          // },
        ],
        kw: kw_default,
        kg: kg_default,
        tx: tx_default,
        wy: wy_default,
        mg: mg_default,
        // bd,
        xm: xm_default
      };
      musicSdk_default = {
        ...sources,
        supportQuality
      };
      init = () => {
        const tasks = [];
        for (let source of sources.sources) {
          let sm = sources[source.id];
          sm && sm.init && tasks.push(sm.init());
        }
        return Promise.all(tasks);
      };
      // 与 lx-music-mobile src/utils/musicSdk/index.js 的 searchMusic + findMusic 逐行对齐
      findMusic = async (musicInfo) => {
        const { name, singer, albumName, interval, source: s } = musicInfo;
        const trimStr0 = (str) => typeof str == "string" ? str.trim() : str;
        const musicName0 = trimStr0(name);
        const searchTasks = [];
        const excludeSource = ["xm"];
        for (const source of sources.sources) {
          if (!sources[source.id].musicSearch || source.id == s || excludeSource.includes(source.id)) continue;
          searchTasks.push(sources[source.id].musicSearch.search(`${musicName0} ${singer || ""}`.trim(), 1, 25).catch((_) => null));
        }
        const lists = (await Promise.all(searchTasks)).filter((s2) => s2 && Array.isArray(s2.list));
        const singersRxp = /、|&|;|；|\/|,|，|\|/;
        const sortSingle = (singer2) => singersRxp.test(singer2) ? singer2.split(singersRxp).sort((a, b) => a.localeCompare(b)).join("、") : singer2 || "";
        const sortMusic = (arr, callback) => {
          const tempResult = [];
          for (let i = arr.length - 1; i > -1; i--) {
            const item = arr[i];
            if (callback(item)) {
              delete item.fSinger;
              delete item.fMusicName;
              delete item.fAlbumName;
              delete item.fInterval;
              tempResult.push(item);
              arr.splice(i, 1);
            }
          }
          tempResult.reverse();
          return tempResult;
        };
        const getIntv = (interval2) => {
          if (!interval2) return 0;
          if (typeof interval2 != "string") return Number(interval2) || 0;
          let intvArr = interval2.split(":");
          let intv = 0;
          let unit = 1;
          while (intvArr.length) {
            intv += parseInt(intvArr.pop()) * unit;
            unit *= 60;
          }
          return intv || 0;
        };
        const trimStr = (str) => typeof str == "string" ? str.trim() : str || "";
        const filterStr = (str) => typeof str == "string" ? str.replace(/\s|'|\.|,|，|&|"|、|\(|\)|（|）|`|~|-|<|>|\||\/|\]|\[|!|！/g, "") : String(str || "");
        const fMusicName = filterStr(name).toLowerCase();
        const fSinger = filterStr(sortSingle(singer)).toLowerCase();
        const fAlbumName = filterStr(albumName).toLowerCase();
        const fInterval = getIntv(interval);
        const isEqualsInterval = (intv) => Math.abs((fInterval || intv) - (intv || fInterval)) < 5;
        const isIncludesName = (name2) => fMusicName.includes(name2) || name2.includes(fMusicName);
        const isIncludesSinger = (singer2) => fSinger ? fSinger.includes(singer2) || singer2.includes(fSinger) : true;
        const isEqualsAlbum = (album) => fAlbumName ? fAlbumName == album : true;
        const result = lists.map((source) => {
          for (const item of source.list) {
            item.name = trimStr(item.name);
            item.singer = trimStr(item.singer);
            item.fSinger = filterStr(sortSingle(item.singer).toLowerCase());
            item.fMusicName = filterStr(String(item.name ?? "").toLowerCase());
            item.fAlbumName = filterStr(String(item.albumName ?? "").toLowerCase());
            item.fInterval = getIntv(item.interval);
            if (!isEqualsInterval(item.fInterval)) {
              item.name = null;
              continue;
            }
            if (item.fMusicName == fMusicName && isIncludesSinger(item.fSinger)) return item;
          }
          for (const item of source.list) {
            if (item.name == null) continue;
            if (item.fSinger == fSinger && isIncludesName(item.fMusicName)) return item;
          }
          for (const item of source.list) {
            if (item.name == null) continue;
            if (isEqualsAlbum(item.fAlbumName) && isIncludesSinger(item.fSinger) && isIncludesName(item.fMusicName)) return item;
          }
          return null;
        }).filter((s2) => s2);
        const newResult = [];
        if (result.length) {
          newResult.push(...sortMusic(result, (item) => item.fSinger == fSinger && item.fMusicName == fMusicName && item.interval == interval));
          newResult.push(...sortMusic(result, (item) => item.fMusicName == fMusicName && item.fSinger == fSinger && item.fAlbumName == fAlbumName));
          newResult.push(...sortMusic(result, (item) => item.fSinger == fSinger && item.fMusicName == fMusicName));
          newResult.push(...sortMusic(result, (item) => item.fMusicName == fMusicName && item.interval == interval));
          newResult.push(...sortMusic(result, (item) => item.fSinger == fSinger && item.interval == interval));
          newResult.push(...sortMusic(result, (item) => item.interval == interval));
          newResult.push(...sortMusic(result, (item) => item.fMusicName == fMusicName));
          newResult.push(...sortMusic(result, (item) => item.fSinger == fSinger));
          newResult.push(...sortMusic(result, (item) => item.fAlbumName == fAlbumName));
          for (const item of result) {
            delete item.fSinger;
            delete item.fMusicName;
            delete item.fAlbumName;
            delete item.fInterval;
          }
          newResult.push(...result);
        }
        return newResult;
      };
    }
  });

  // ../root/.codebuddy/artifact/lxmusic/bundle/entry.js
  var require_entry = __commonJS({
    "../root/.codebuddy/artifact/lxmusic/bundle/entry.js"() {
      var import_buffer_global = __toESM(require_buffer_global());
      init_musicSdk();
      Object.assign(musicSdk_default, { init, findMusic });
      globalThis.__lx_builtin_sdk = musicSdk_default;
    }
  });
  require_entry();

  // ── tipSearch 移植（lx-music-mobile src/utils/musicSdk/*/tipSearch.js） ──
  // bundle 打包版本未含 tipSearch，此处以沙箱 fetch 自包含补齐（kw/kg/tx/mg 直连，
  // wy 走 weapi：native aes-cbc 两层 + rsa NoPadding，对齐 init_wy 内 crypto 实现）
  ;(function () {
    const sdk = globalThis.__lx_builtin_sdk;
    if (!sdk) return;
    const enc = encodeURIComponent;
    const toJson = (t) => { try { return JSON.parse(t); } catch (e) { throw new Error("响应解析失败"); } };
    const assertOk = (resp) => {
      if (resp.statusCode != 200) throw new Error("请求失败(" + resp.statusCode + ")");
      return resp;
    };

    const tipSearchers = {
      kw: {
        async search(str) {
          const resp = assertOk(await fetch("https://tips.kuwo.cn/t.s?corp=kuwo&newver=3&p2p=1&notrace=0&c=mbox&w=" + enc(str) + "&encoding=utf8&rformat=json", { headers: { Referer: "http://www.kuwo.cn/" } }));
          const body = toJson(await resp.text());
          if (!body.WORDITEMS) throw new Error("请求失败");
          return body.WORDITEMS.map((item) => item.RELWORD);
        },
      },
      kg: {
        async search(str) {
          const resp = assertOk(await fetch("https://searchtip.kugou.com/getSearchTip?MusicTipCount=10&keyword=" + enc(str), { headers: { referer: "https://www.kugou.com/" } }));
          const body = toJson(await resp.text());
          // lx 原版 createHttpFetch 返回的 body 已是响应 JSON 的 data 字段
          const records = (body.data || body)[0].RecordDatas;
          return records.map((info) => info.HintInfo);
        },
      },
      tx: {
        async search(str) {
          const resp = assertOk(await fetch("https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=json&key=" + enc(str) + "&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0", { headers: { Referer: "https://y.qq.com/portal/player.html" } }));
          const body = toJson(await resp.text());
          if (body.code != 0) throw new Error("请求失败");
          return body.data.song.itemlist.map((info) => info.name + " - " + info.singer);
        },
      },
      mg: {
        async search(str) {
          const resp = assertOk(await fetch("https://music.migu.cn/v3/api/search/suggest?keyword=" + enc(str), { headers: { referer: "https://music.migu.cn/v3" } }));
          const body = toJson(await resp.text());
          return body.songs.map((info) => info.name + " - " + info.singerName);
        },
      },
      wy: {
        // weapi：对齐 init_wy 内 crypto.js（aes-128-cbc 两层 + rsa NoPadding）
        _b62: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        _pubKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB",
        _aesEnc(b64Data, keyStr, ivStr) {
          return globalThis.__lx_native_call__utils_aes_encrypt(b64Data, Buffer.from(keyStr).toString("base64"), Buffer.from(ivStr).toString("base64"), "CBC_128_PKCS7Padding");
        },
        _weapi(object) {
          const text = JSON.stringify(object);
          const base62 = this._b62;
          const secretKey = Buffer.from(Array.from({ length: 16 }, () => base62.charAt(Math.floor(Math.random() * 62))));
          const iv = "0102030405060708";
          // 层1：text → base64 → aes-cbc(presetKey)
          const p1 = this._aesEnc(Buffer.from(text).toString("base64"), "0CoJUm6Qyw8W8jud", iv);
          // 层2：p1 字符串本身作为字节 → aes-cbc(secretKey)
          const params = this._aesEnc(Buffer.from(p1, "utf8").toString("base64"), secretKey.toString("latin1"), iv);
          // encSecKey：secretKey 反转后左侧补零至 128 字节，rsa NoPadding → hex
          const reversed = Array.from(secretKey).reverse();
          const padded = Buffer.concat([Buffer.alloc(128 - reversed.length), Buffer.from(reversed)]);
          const encSecKey = Buffer.from(globalThis.__lx_native_call__utils_rsa_encrypt(padded.toString("base64"), this._pubKey, "RSA/ECB/NoPadding"), "base64").toString("hex");
          return { params, encSecKey };
        },
        async search(str) {
          const form = this._weapi({ s: str });
          const resp = assertOk(await fetch("https://music.163.com/weapi/search/suggest/web", {
            method: "post",
            headers: {
              referer: "https://music.163.com/",
              origin: "https://music.163.com/",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "params=" + enc(form.params) + "&encSecKey=" + enc(form.encSecKey),
          }));
          const body = toJson(await resp.text());
          if (body.code != 200) throw new Error("请求失败");
          return body.result.songs.map((info) => info.name + " - " + (info.artists || []).map((a) => a.name).join("、"));
        },
      },
    };
    for (const src of Object.keys(tipSearchers)) {
      if (sdk[src]) sdk[src].tipSearch = tipSearchers[src];
    }
  })();
  // ── kg 歌单（含「打开外部歌单」：链接 / 酷狗码 / special id）对齐 lx-music-mobile ──
  // bundle 内的 kg/songList 为旧版，缺 getListDetailBySpecialId / decodeGcid 等，
  // 此处直接移植 lx 当前 src/utils/musicSdk/kg/songList.js（含 util.signatureParams）。
  ;(function () {
    const sdk = globalThis.__lx_builtin_sdk;
    if (!sdk || !sdk.kg || !sdk.kg.songList) return;
    const formatPlayCount = (num) => {
      if (num > 100000000) return `${Math.trunc(num / 10000000) / 10}亿`;
      if (num > 10000) return `${Math.trunc(num / 1000) / 10}万`;
      return String(num);
    };
    // kg/util.js signatureParams
    const signatureParams = (params, platform = "android", body = "") => {
      let keyparam = "OIlwieks28dk2k092lksi2UIkp";
      if (platform === "web") keyparam = "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt";
      let param_list = params.split("&");
      param_list.sort();
      let sign_params = `${keyparam}${param_list.join("")}${body}${keyparam}`;
      return toMD5(sign_params);
    };
// 歌单接口加固：主用 https（加密防运营商劫持），重试时交替回退 http；
// 重试间隔 1 秒给网络抖动留出恢复时间，超时放宽到 30 秒
const RETRY_DELAY = 1000
const REQUEST_TIMEOUT = 30000
const retryDelay = () => new Promise(resolve => setTimeout(resolve, RETRY_DELAY))

    const lxKgSongList = {
  _requestObj_tags: null,
  _requestObj_listInfo: null,
  _requestObj_list: null,
  _requestObj_listRecommend: null,
  listDetailLimit: 10000,
  currentTagInfo: {
    id: undefined,
    info: undefined,
  },
  sortList: [
    {
      name: '推荐',
      tid: 'recommend',
      id: '5',
    },
    {
      name: '最热',
      tid: 'hot',
      id: '6',
    },
    {
      name: '最新',
      tid: 'new',
      id: '7',
    },
    {
      name: '热藏',
      tid: 'hot_collect',
      id: '3',
    },
    {
      name: '飙升',
      tid: 'rise',
      id: '8',
    },
  ],
  cache: new Map(),
  regExps: {
    listData: /global\.data = (\[.+\]);/,
    listInfo: /global = {[\s\S]+?name: "(.+)"[\s\S]+?pic: "(.+)"[\s\S]+?};/,
    // https://www.kugou.com/yy/special/single/1067062.html
    listDetailLink: /^.+\/(\d+)\.html(?:\?.*|&.*$|#.*$|$)/,
  },
  // async getGlobalSpecialId(specialId) {
  //   return httpFetch(`http://mobilecdnbj.kugou.com/api/v5/special/info?specialid=${specialId}`, {
  //     headers: {
  //       'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HLK-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Mobile Safari/537.36 EdgA/104.0.1293.70',
  //     },
  //   }).promise.then(({ body }) => {
  //     // console.log(body)
  //     if (!body.data.global_specialid) Promise.reject(new Error('Failed to get global collection id.'))
  //     return body.data.global_specialid
  //   })
  // },
  // async getListInfoBySpecialId(special_id, retry = 0) {
  //   if (++retry > 2) throw new Error('failed')
  //   return httpFetch(`https://m.kugou.com/plist/list/${special_id}/?json=true`, {
  //     headers: {
  //       'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HLK-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Mobile Safari/537.36 EdgA/104.0.1293.70',
  //     },
  //     follow_max: 2,
  //   }).promise.then(({ body }) => {
  //     // console.log(body)
  //     if (!body.info.list) return this.getListInfoBySpecialId(special_id, retry)
  //     let listinfo = body.info.list
  //     return {
  //       listInfo: {
  //         name: listinfo.specialname,
  //         image: listinfo.imgurl.replace('{size}', '150'),
  //         intro: listinfo.intro,
  //         author: listinfo.nickname,
  //         playcount: listinfo.playcount,
  //         total: listinfo.songcount,
  //       },
  //       globalSpecialId: listinfo.global_specialid,
  //     }
  //   })
  // },
  // async getSongListDetailByGlobalSpecialId(id, page, limit = 100, retry = 0) {
  //   if (++retry > 2) throw new Error('failed')
  //   console.log(id)
  //   const params = `specialid=0&need_sort=1&module=CloudMusic&clientver=11409&pagesize=${limit}&global_collection_id=${id}&userid=0&page=${page}&type=1&area_code=1&appid=1005`
  //   return httpFetch(`http://pubsongscdn.tx.kugou.com/v2/get_other_list_file?${params}&signature=${signatureParams(params)}`).promise.then(({ body }) => {
  //     // console.log(body)
  //     if (body.data?.info == null) return this.getSongListDetailByGlobalSpecialId(id, page, limit, retry)
  //     return body.data.info
  //   })
  // },
  parseHtmlDesc(html) {
    const prefix = '<div class="pc_specail_text pc_singer_tab_content" id="specailIntroduceWrap">'
    let index = html.indexOf(prefix)
    if (index < 0) return null
    const afterStr = html.substring(index + prefix.length)
    index = afterStr.indexOf('</div>')
    if (index < 0) return null
    return decodeName(afterStr.substring(0, index))
  },
  async getListDetailBySpecialId(id, page, tryNum = 0) {
    if (tryNum > 2) throw new Error('try max num')

    let body
    try {
      ;({ body } = await httpFetch(this.getSongListDetailUrl(id, tryNum % 2 === 1), { timeout: REQUEST_TIMEOUT }).promise)
    } catch (err) {
      await retryDelay()
      return this.getListDetailBySpecialId(id, page, ++tryNum)
    }
    let listData = body.match(this.regExps.listData)
    let listInfo = body.match(this.regExps.listInfo)
    if (!listData) {
      await retryDelay()
      return this.getListDetailBySpecialId(id, page, ++tryNum)
    }
    let list = await this.getMusicInfos(JSON.parse(listData[1]))
    // listData = this.filterData(JSON.parse(listData[1]))
    let name
    let pic
    if (listInfo) {
      name = listInfo[1]
      pic = listInfo[2]
    }
    let desc = this.parseHtmlDesc(body)


    return {
      list,
      page: 1,
      limit: 10000,
      total: list.length,
      source: 'kg',
      info: {
        name,
        img: pic,
        desc,
        // author: body.result.info.userinfo.username,
        // play_count: formatPlayCount(body.result.listen_num),
      },
    }

    // const globalSpecialId = await this.getGlobalSpecialId(id)
    // const limit = 100
    // const listData = await this.getSongListDetailByGlobalSpecialId(globalSpecialId, page, limit)
    // if (!Array.isArray(listData))
    // return this.getUserListDetail2(globalSpecialId)
    // return {
    //   list: this.filterDatav9(listData),
    //   page,
    //   limit,
    //   total: listInfo.total,
    //   source: 'kg',
    //   info: {
    //     name: listInfo.name,
    //     img: listInfo.image,
    //     desc: listInfo.intro,
    //     author: listInfo.author,
    //     play_count: formatPlayCount(listInfo.playcount),
    //   },
    // }
  },
  getInfoUrl(tagId, useHttp = false) {
    const protocol = useHttp ? 'http' : 'https'
    return tagId
      ? `${protocol}://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&cdn=cdn&t=5&c=${tagId}`
      : `${protocol}://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&`
  },
  getSongListUrl(sortId, tagId, page, useHttp = false) {
    if (tagId == null) tagId = ''
    const protocol = useHttp ? 'http' : 'https'
    return `${protocol}://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_ajax=1&cdn=cdn&t=${sortId}&c=${tagId}&p=${page}`
  },
  getSongListDetailUrl(id, useHttp = false) {
    const protocol = useHttp ? 'http' : 'https'
    return `${protocol}://www2.kugou.kugou.com/yueku/v9/special/single/${id}-5-9999.html`
  },

  filterInfoHotTag(rawData) {
    const result = []
    if (rawData.status !== 1) return result
    for (const key of Object.keys(rawData.data)) {
      let tag = rawData.data[key]
      result.push({
        id: tag.special_id,
        name: tag.special_name,
        source: 'kg',
      })
    }
    return result
  },
  filterTagInfo(rawData) {
    const result = []
    for (const name of Object.keys(rawData)) {
      result.push({
        name,
        list: rawData[name].data.map(tag => ({
          parent_id: tag.parent_id,
          parent_name: tag.pname,
          id: tag.id,
          name: tag.name,
          source: 'kg',
        })),
      })
    }
    return result
  },

  getSongList(sortId, tagId, page, tryNum = 0) {
    if (this._requestObj_list) this._requestObj_list.cancelHttp()
    if (tryNum > 2) return Promise.reject(new Error('try max num'))
    // 主用 https，奇数次重试回退 http（个别网络环境下两者通断情况不同）
    const useHttp = tryNum % 2 === 1
    this._requestObj_list = httpFetch(
      this.getSongListUrl(sortId, tagId, page, useHttp),
      { timeout: REQUEST_TIMEOUT },
    )
    return this._requestObj_list.promise.then(({ body }) => {
      if (!body || body.status !== 1) return retryDelay().then(() => this.getSongList(sortId, tagId, page, ++tryNum))
      return this.filterList(body.special_db)
    }).catch(err => {
      // 网络层失败（超时/DNS/断网）也纳入重试
      if (tryNum >= 2) throw err
      return retryDelay().then(() => this.getSongList(sortId, tagId, page, ++tryNum))
    })
  },
  getSongListRecommend(tryNum = 0) {
    if (this._requestObj_listRecommend) this._requestObj_listRecommend.cancelHttp()
    if (tryNum > 2) return Promise.reject(new Error('try max num'))
    this._requestObj_listRecommend = httpFetch(
      'http://everydayrec.service.kugou.com/guess_special_recommend',
      {
        method: 'post',
        headers: {
          'User-Agent': 'KuGou2012-8275-web_browser_event_handler',
        },
        body: {
          appid: 1001,
          clienttime: 1566798337219,
          clientver: 8275,
          key: 'f1f93580115bb106680d2375f8032d96',
          mid: '21511157a05844bd085308bc76ef3343',
          platform: 'pc',
          userid: '262643156',
          return_min: 6,
          return_max: 15,
        },
      },
    )
    return this._requestObj_listRecommend.promise.then(({ body }) => {
      if (body.status !== 1) return this.getSongListRecommend(++tryNum)
      return this.filterList(body.data.special_list)
    })
  },
  filterList(rawData) {
    return rawData.map(item => ({
      play_count: item.total_play_count || formatPlayCount(item.play_count),
      id: 'id_' + item.specialid,
      author: item.nickname,
      name: item.specialname,
      time: dateFormat(item.publish_time || item.publishtime, 'Y-M-D'),
      img: item.img || item.imgurl,
      total: item.songcount,
      grade: item.grade,
      desc: item.intro,
      source: 'kg',
    }))
  },

  async createHttp(url, options, retryNum = 0) {
    if (retryNum > 2) throw new Error('try max num')
    let result
    options.cache = 'default'
    try {
      result = await httpFetch(url, options).promise
    } catch (err) {
      console.log(err)
      return this.createHttp(url, options, ++retryNum)
    }
    // console.log(result.statusCode, result.body)
    if (result.statusCode !== 200 ||
      (
        (result.body.error_code !== undefined
          ? result.body.error_code
          : result.body.errcode !== undefined
            ? result.body.errcode
            : result.body.err_code
        ) !== 0)
    ) return this.createHttp(url, options, ++retryNum)
    if (result.body.data) return result.body.data
    if (Array.isArray(result.body.info)) return result.body
    return result.body.info
  },

  createTask(hashs) {
    let data = {
      area_code: '1',
      show_privilege: 1,
      show_album_info: '1',
      is_publish: '',
      appid: 1005,
      clientver: 11451,
      mid: '1',
      dfid: '-',
      clienttime: Date.now(),
      key: 'OIlwieks28dk2k092lksi2UIkp',
      fields: 'album_info,author_name,audio_info,ori_audio_name,base,songname',
    }
    let list = hashs
    let tasks = []
    while (list.length) {
      tasks.push(Object.assign({ data: list.slice(0, 100) }, data))
      if (list.length < 100) break
      list = list.slice(100)
    }
    let url = 'http://gateway.kugou.com/v2/album_audio/audio'
    return tasks.map(task => this.createHttp(url, {
      method: 'POST',
      body: task,
      headers: {
        'KG-THash': '13a3164',
        'KG-RC': '1',
        'KG-Fake': '0',
        'KG-RF': '00869891',
        'User-Agent': 'Android712-AndroidPhone-11451-376-0-FeeCacheUpdate-wifi',
        'x-router': 'kmr.service.kugou.com',
      },
    }).then(data => data.map(s => s[0])))
  },
async getMusicInfos(list) {
// 注意：gateway(v3/album_audio/audio) 的 audio_info 模块不返回 mvhash，
// 且聚合接口返回的 hash 与歌单原始数据的 hash 体系不一致（同一首歌两边 hash 不同，无法按 hash 对齐），
// 因此：song_v2/v5 接口（分享/合集页）按 hash 命中；v9 网页版数据按「歌名+歌手」匹配，
// MV 属于歌曲而非某个音频版本，歌名+歌手一致即认为匹配
// 命中后把 mvhash 写进聚合返回的 audio_info.mvhash，由 filterData2 读取
const mvHashes = new Map()
const mvNameMap = new Map()
// 歌手名归一化：去掉分隔符与空白，避免 v9 的 “A、B” 与聚合的 “A/B” 对不上
const normSinger = s => decodeName(s || '').replace(/[\/、，,|&\s]+/g, '')
const normName = s => decodeName(s || '').replace(/\s*[-_—–]\s*[^-_—–]*$/, '').trim()
list.forEach(item => {
const mv = item?.mvhash || item?.mv_hash || item?.audio_info?.mvhash || item?.base?.mvhash || item?.high_mv_hash
if (!mv) return
if (item.hash) mvHashes.set(item.hash, mv)
if (item.songname != null) {
const key = `${normName(item.songname)}|${normSinger(item.singername || item.author_name)}`
if (key !== '|') mvNameMap.set(key, mv)
}
})
const datas = await Promise.all(
this.createTask(
this.deDuplication(list)
.map(item => ({ hash: item.hash })),
))
.then(([...datas]) => datas.flat())
datas.forEach(item => {
if (!item?.audio_info) return
const mv = mvHashes.get(item.audio_info.hash) ??
mvNameMap.get(`${normName(item.songname)}|${normSinger(item.author_name)}`)
if (mv) item.audio_info.mvhash = mv
})
return this.filterData2(datas)
},

  async getUserListDetailByCode(id) {
    const songInfo = await this.createHttp('http://t.kugou.com/command/', {
      method: 'POST',
      headers: {
        'KG-RC': 1,
        'KG-THash': 'network_super_call.cpp:3676261689:379',
        'User-Agent': '',
      },
      body: { appid: 1001, clientver: 9020, mid: '21511157a05844bd085308bc76ef3343', clienttime: 640612895, key: '36164c4015e704673c588ee202b9ecb8', data: id },
    })
    // console.log(songInfo)
    // type 1单曲，2歌单，3电台，4酷狗码，5别人的播放队列
    let songList
    let info = songInfo.info
    switch (info.type) {
      case 2:
        if (!info.global_collection_id) return this.getListDetailBySpecialId(info.id)
        break

      default:
        break
    }
    if (info.global_collection_id) return this.getUserListDetail2(info.global_collection_id)
    if (info.userid != null) {
      songList = await this.createHttp('http://www2.kugou.kugou.com/apps/kucodeAndShare/app/', {
        method: 'POST',
        headers: {
          'KG-RC': 1,
          'KG-THash': 'network_super_call.cpp:3676261689:379',
          'User-Agent': '',
        },
        body: { appid: 1001, clientver: 9020, mid: '21511157a05844bd085308bc76ef3343', clienttime: 640612895, key: '36164c4015e704673c588ee202b9ecb8', data: { id: info.id, type: 3, userid: info.userid, collect_type: 0, page: 1, pagesize: info.count } },
      })
      // console.log(songList)
    }
    let list = await this.getMusicInfos(songList || songInfo.list)
    return {
      list,
      page: 1,
      limit: info.count,
      total: list.length,
      source: 'kg',
      info: {
        name: info.name,
        img: (info.img_size && info.img_size.replace('{size}', 240)) || info.img,
        // desc: body.result.info.list_desc,
        author: info.username,
        // play_count: formatPlayCount(info.count),
      },
    }
  },

  async getUserListDetail3(chain, page) {
    const songInfo = await this.createHttp(`http://m.kugou.com/schain/transfer?pagesize=${this.listDetailLimit}&chain=${chain}&su=1&page=${page}&n=0.7928855356604456`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      },
    })
    if (!songInfo.list) {
      if (songInfo.global_collection_id) return this.getUserListDetail2(songInfo.global_collection_id)
      else return this.getUserListDetail4(songInfo, chain, page).catch(() => this.getUserListDetail5(chain))
    }
    let list = await this.getMusicInfos(songInfo.list)
    // console.log(info, songInfo)
    return {
      list,
      page: 1,
      limit: this.listDetailLimit,
      total: list.length,
      source: 'kg',
      info: {
        name: songInfo.info.name,
        img: songInfo.info.img,
        // desc: body.result.info.list_desc,
        author: songInfo.info.username,
        // play_count: formatPlayCount(info.count),
      },
    }
  },

  deDuplication(datas) {
    let ids = new Set()
    return datas.filter(({ hash }) => {
      if (ids.has(hash)) return false
      ids.add(hash)
      return true
    })
  },

  async decodeGcid(gcid) {
    const params = 'dfid=-&appid=1005&mid=0&clientver=20109&clienttime=640612895&uuid=-'
    const body = {
      ret_info: 1,
      data: [
        {
          id: gcid,
          id_type: 2,
        },
      ],
    }
    const result = await this.createHttp(`https://t.kugou.com/v1/songlist/batch_decode?${params}&signature=${signatureParams(params, 'android', JSON.stringify(body))}`, {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HUAWEI HMA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
        Referer: 'https://m.kugou.com/',
      },
      body,
    })
    return result.list[0].global_collection_id
  },

  async getUserListDetailByLink({ info }, link) {
    let listInfo = info['0']
    let total = listInfo.count
    let tasks = []
    let page = 0
    while (total) {
      const limit = total > 90 ? 90 : total
      total -= limit
      page += 1
      tasks.push(this.createHttp(link.replace(/pagesize=\d+/, 'pagesize=' + limit).replace(/page=\d+/, 'page=' + page), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
          Referer: link,
        },
      }).then(data => data.list.info))
    }
    let result = await Promise.all(tasks).then(([...datas]) => datas.flat())
    result = await this.getMusicInfos(result)
    // console.log(result)
    return {
      list: result,
      page,
      limit: this.listDetailLimit,
      total: result.length,
      source: 'kg',
      info: {
        name: listInfo.name,
        img: listInfo.pic && listInfo.pic.replace('{size}', 240),
        // desc: body.result.info.list_desc,
        author: listInfo.list_create_username,
        // play_count: formatPlayCount(listInfo.count),
      },
    }
  },
  createGetListDetail2Task(id, total) {
    let tasks = []
    let page = 0
    while (total) {
      const limit = total > 300 ? 300 : total
      total -= limit
      page += 1
      const params = 'appid=1058&global_specialid=' + id + '&specialid=0&plat=0&version=8000&page=' + page + '&pagesize=' + limit + '&srcappid=2919&clientver=20000&clienttime=1586163263991&mid=1586163263991&uuid=1586163263991&dfid=-'
      tasks.push(this.createHttp(`https://mobiles.kugou.com/api/v5/special/song_v2?${params}&signature=${signatureParams(params, 'web')}`, {
        headers: {
          mid: '1586163263991',
          Referer: 'https://m3ws.kugou.com/share/index.php',
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
          dfid: '-',
          clienttime: '1586163263991',
        },
      }).then(data => data.info))
    }
    return Promise.all(tasks).then(([...datas]) => datas.flat())
  },
  async getUserListDetail2(global_collection_id) {
    let id = global_collection_id
    if (id.length > 1000) throw new Error('get list error')
    const params = 'appid=1058&specialid=0&global_specialid=' + id + '&format=jsonp&srcappid=2919&clientver=20000&clienttime=1586163242519&mid=1586163242519&uuid=1586163242519&dfid=-'
    let info = await this.createHttp(`https://mobiles.kugou.com/api/v5/special/info_v2?${params}&signature=${signatureParams(params, 'web')}`, {
      headers: {
        mid: '1586163242519',
        Referer: 'https://m3ws.kugou.com/share/index.php',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        dfid: '-',
        clienttime: '1586163242519',
      },
    })
    const songInfo = await this.createGetListDetail2Task(id, info.songcount)
    let list = await this.getMusicInfos(songInfo)
    // console.log(info, songInfo, list)
    return {
      list,
      page: 1,
      limit: this.listDetailLimit,
      total: list.length,
      source: 'kg',
      info: {
        name: info.specialname,
        img: info.imgurl && info.imgurl.replace('{size}', 240),
        desc: info.intro,
        author: info.nickname,
        play_count: formatPlayCount(info.playcount),
      },
    }
  },

  async getListInfoByChain(chain) {
    if (this.cache.has(chain)) return this.cache.get(chain)
    const { body } = await httpFetch(`https://m.kugou.com/share/?chain=${chain}&id=${chain}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      },
    }).promise
    let result = body.match(/var\sphpParam\s=\s({.+?});/)
    if (result) result = JSON.parse(result[1])
    this.cache.set(chain, result)
    return result
  },

  async getUserListDetailByPcChain(chain) {
    let key = `${chain}_pc_list`
    if (this.cache.has(key)) return this.cache.get(key)
    const { body } = await httpFetch(`http://www.kugou.com/share/${chain}.html`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
      },
    }).promise
    let result = body.match(/var\sdataFromSmarty\s=\s(\[.+?\])/)
    if (result) result = JSON.parse(result[1])
    this.cache.set(chain, result)
    result = await this.getMusicInfos(result)
    // console.log(info, songInfo)
    return result
  },

  async getUserListDetail4(songInfo, chain, page) {
    const limit = 100
    const [listInfo, list] = await Promise.all([
      this.getListInfoByChain(chain),
      this.getUserListDetailById(songInfo.id, page, limit),
    ])
    return {
      list: list || [],
      page,
      limit,
      total: list.length ?? 0,
      source: 'kg',
      info: {
        name: listInfo.specialname,
        img: listInfo.imgurl && listInfo.imgurl.replace('{size}', 240),
        // desc: body.result.info.list_desc,
        author: listInfo.nickname,
        // play_count: formatPlayCount(info.count),
      },
    }
  },

  async getUserListDetail5(chain) {
    const [listInfo, list] = await Promise.all([
      this.getListInfoByChain(chain),
      this.getUserListDetailByPcChain(chain),
    ])
    return {
      list: list || [],
      page: 1,
      limit: this.listDetailLimit,
      total: list.length ?? 0,
      source: 'kg',
      info: {
        name: listInfo.specialname,
        img: listInfo.imgurl && listInfo.imgurl.replace('{size}', 240),
        // desc: body.result.info.list_desc,
        author: listInfo.nickname,
        // play_count: formatPlayCount(info.count),
      },
    }
  },

  async getUserListDetailById(id, page, limit) {
    const signature = await handleSignature(id, page, limit)
    let info = await this.createHttp(`https://pubsongscdn.kugou.com/v2/get_other_list_file?srcappid=2919&clientver=20000&appid=1058&type=0&module=playlist&page=${page}&pagesize=${limit}&specialid=${id}&signature=${signature}`, {
      headers: {
        Referer: 'https://m3ws.kugou.com/share/index.php',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        dfid: '-',
      },
    })

    // console.log(info)
    let result = await this.getMusicInfos(info.info)
    // console.log(info, songInfo)
    return result
  },

  async getUserListDetail(link, page, retryNum = 0) {
    if (retryNum > 3) return Promise.reject(new Error('link try max num'))
    if (link.includes('#')) link = link.replace(/#.*$/, '')
    if (link.includes('global_collection_id')) return this.getUserListDetail2(link.replace(/^.*?global_collection_id=(\w+)(?:&.*$|#.*$|$)/, '$1'))
    if (link.includes('gcid_')) {
      let gcid = link.match(/gcid_\w+/)?.[0]
      if (gcid) {
        const global_collection_id = await this.decodeGcid(gcid)
        if (global_collection_id) return this.getUserListDetail2(global_collection_id)
      }
    }
    if (link.includes('chain=')) return this.getUserListDetail3(link.replace(/^.*?chain=(\w+)(?:&.*$|#.*$|$)/, '$1'), page)
    if (link.includes('.html')) {
      if (link.includes('zlist.html')) {
        link = link.replace(/^(.*)zlist\.html/, 'https://m3ws.kugou.com/zlist/list')
        if (link.includes('pagesize')) {
          link = link.replace('pagesize=30', 'pagesize=' + this.listDetailLimit).replace('page=1', 'page=' + page)
        } else {
          link += `&pagesize=${this.listDetailLimit}&page=${page}`
        }
      } else if (!link.includes('song.html')) return this.getUserListDetail3(link.replace(/.+\/(\w+).html(?:\?.*|&.*$|#.*$|$)/, '$1'), page)
    }

    const requestObj_listDetailLink = httpFetch(link, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        Referer: link,
      },
    })
    const { url: location, statusCode, body } = await requestObj_listDetailLink.promise
    // console.log(body, location)
    if (statusCode > 400) return this.getUserListDetail(link, page, ++retryNum)
    if (location.split('?')[0] != link.split('?')[0]) {
      // console.log(location)
      if (location.includes('global_collection_id')) return this.getUserListDetail2(location.replace(/^.*?global_collection_id=(\w+)(?:&.*$|#.*$|$)/, '$1'))
      if (location.includes('gcid_')) {
        let gcid = location.match(/gcid_\w+/)?.[0]
        if (gcid) {
          const global_collection_id = await this.decodeGcid(gcid)
          if (global_collection_id) return this.getUserListDetail2(global_collection_id)
        }
      }
      if (location.includes('chain=')) return this.getUserListDetail3(location.replace(/^.*?chain=(\w+)(?:&.*$|#.*$|$)/, '$1'), page)
      if (location.includes('.html')) {
        if (location.includes('zlist.html')) {
          let link = location.replace(/^(.*)zlist\.html/, 'https://m3ws.kugou.com/zlist/list')
          if (link.includes('pagesize')) {
            link = link.replace('pagesize=30', 'pagesize=' + this.listDetailLimit).replace('page=1', 'page=' + page)
          } else {
            link += `&pagesize=${this.listDetailLimit}&page=${page}`
          }
          return this.getUserListDetail(link, page, ++retryNum)
        } else return this.getUserListDetail3(location.replace(/.+\/(\w+).html(?:\?.*|&.*$|#.*$|$)/, '$1'), page)
      }
      // console.log('location', location)
      // 最终地址与原地址不同但未命中以上任何类型，按新地址重新走一遍完整流程
      return this.getUserListDetail(location, page, ++retryNum)
    }
    if (typeof body == 'string') {
      // 对齐桌面端：从分享页 HTML 中提取歌单 id，gcid 形式需先解码；
      // 提取不到时直接报错，避免把整段 HTML 当作 id 传给后续接口
      let global_collection_id = body.match(/"global_collection_id":"(\w+)"/)?.[1]
      if (!global_collection_id) {
        let gcid = body.match(/"encode_gic":"(\w+)"/)?.[1]
        if (!gcid) gcid = body.match(/"encode_src_gid":"(\w+)"/)?.[1]
        if (gcid) global_collection_id = await this.decodeGcid(gcid)
      }
      if (!global_collection_id) throw new Error('get list error')
      return this.getUserListDetail2(global_collection_id)
    }
    if (body.errcode !== 0) return this.getUserListDetail(link, page, ++retryNum)
    return this.getUserListDetailByLink(body, link)
  },

  async getListDetail(id, page) { // 获取歌曲列表内的音乐
    id = id.toString()
    if (id.includes('special/single/')) {
      id = id.replace(this.regExps.listDetailLink, '$1')
    } else if (/https?:/.test(id)) {
      // fix https://www.kugou.com/songlist/xxx/?uid=xxx&chl=qq_client&cover=http%3A%2F%2Fimge.kugou.com%xxx.jpg&iszlist=1
      return this.getUserListDetail(id.replace(/^.*?http/, 'http'), page)
    } else if (/^\d+$/.test(id)) {
      return this.getUserListDetailByCode(id)
    } else if (id.startsWith('id_')) {
      id = id.replace('id_', '')
    }
    // if ((/[?&:/]/.test(id))) id = id.replace(this.regExps.listDetailLink, '$1')

    return this.getListDetailBySpecialId(id, page)
  },
  filterData(rawList) {
    // console.log(rawList)
    return rawList.map(item => {
      const types = []
      const _types = {}
      if (item.filesize !== 0) {
        let size = sizeFormate(item.filesize)
        types.push({ type: '128k', size, hash: item.hash })
        _types['128k'] = {
          size,
          hash: item.hash,
        }
      }
      if (item.filesize_320 !== 0) {
        let size = sizeFormate(item.filesize_320)
        types.push({ type: '320k', size, hash: item.hash_320 })
        _types['320k'] = {
          size,
          hash: item.hash_320,
        }
      }
      if (item.filesize_ape !== 0) {
        let size = sizeFormate(item.filesize_ape)
        types.push({ type: 'ape', size, hash: item.hash_ape })
        _types.ape = {
          size,
          hash: item.hash_ape,
        }
      }
      if (item.filesize_flac !== 0) {
        let size = sizeFormate(item.filesize_flac)
        types.push({ type: 'flac', size, hash: item.hash_flac })
        _types.flac = {
          size,
          hash: item.hash_flac,
        }
      }
      return {
        singer: decodeName(item.singername),
        name: decodeName(item.songname),
        albumName: decodeName(item.album_name),
        albumId: item.album_id,
        songmid: item.audio_id,
        source: 'kg',
        interval: formatPlayTime(item.duration / 1000),
        img: null,
lrc: null,
hash: item.hash,
mv: item.mvhash || null,
types,
_types,
typeUrl: {},
}
})
  },
  // getSinger(singers) {
  //   let arr = []
  //   singers?.forEach(singer => {
  //     arr.push(singer.name)
  //   })
  //   return arr.join('、')
  // },
  // v9 API
  // filterDatav9(rawList) {
  //   console.log(rawList)
  //   return rawList.map(item => {
  //     const types = []
  //     const _types = {}
  //     item.relate_goods.forEach(qualityObj => {
  //       if (qualityObj.level === 2) {
  //         let size = sizeFormate(qualityObj.size)
  //         types.push({ type: '128k', size, hash: qualityObj.hash })
  //         _types['128k'] = {
  //           size,
  //           hash: qualityObj.hash,
  //         }
  //       } else if (qualityObj.level === 4) {
  //         let size = sizeFormate(qualityObj.size)
  //         types.push({ type: '320k', size, hash: qualityObj.hash })
  //         _types['320k'] = {
  //           size,
  //           hash: qualityObj.hash,
  //         }
  //       } else if (qualityObj.level === 5) {
  //         let size = sizeFormate(qualityObj.size)
  //         types.push({ type: 'flac', size, hash: qualityObj.hash })
  //         _types.flac = {
  //           size,
  //           hash: qualityObj.hash,
  //         }
  //       } else if (qualityObj.level === 6) {
  //         let size = sizeFormate(qualityObj.size)
  //         types.push({ type: 'flac24bit', size, hash: qualityObj.hash })
  //         _types.flac24bit = {
  //           size,
  //           hash: qualityObj.hash,
  //         }
  //       }
  //     })
  //     const nameInfo = item.name.split(' - ')
  //     return {
  //       singer: this.getSinger(item.singerinfo),
  //       name: decodeName((nameInfo[1] ?? nameInfo[0]).trim()),
  //       albumName: decodeName(item.albuminfo.name),
  //       albumId: item.albuminfo.id,
  //       songmid: item.audio_id,
  //       source: 'kg',
  //       interval: formatPlayTime(item.timelen / 1000),
  //       img: null,
  //       lrc: null,
  //       hash: item.hash,
  //       types,
  //       _types,
  //       typeUrl: {},
  //     }
  //   })
  // },

  // hash list filter
  filterData2(rawList) {
    // console.log(rawList)
    let ids = new Set()
    let list = []
    rawList.forEach(item => {
      if (!item) return
      if (ids.has(item.audio_info.audio_id)) return
      ids.add(item.audio_info.audio_id)
      const types = []
      const _types = {}
      if (item.audio_info.filesize !== '0') {
        let size = sizeFormate(parseInt(item.audio_info.filesize))
        types.push({ type: '128k', size, hash: item.audio_info.hash })
        _types['128k'] = {
          size,
          hash: item.audio_info.hash,
        }
      }
      if (item.audio_info.filesize_320 !== '0') {
        let size = sizeFormate(parseInt(item.audio_info.filesize_320))
        types.push({ type: '320k', size, hash: item.audio_info.hash_320 })
        _types['320k'] = {
          size,
          hash: item.audio_info.hash_320,
        }
      }
      if (item.audio_info.filesize_flac !== '0') {
        let size = sizeFormate(parseInt(item.audio_info.filesize_flac))
        types.push({ type: 'flac', size, hash: item.audio_info.hash_flac })
        _types.flac = {
          size,
          hash: item.audio_info.hash_flac,
        }
      }
      if (item.audio_info.filesize_high !== '0') {
        let size = sizeFormate(parseInt(item.audio_info.filesize_high))
        types.push({ type: 'flac24bit', size, hash: item.audio_info.hash_high })
        _types.flac24bit = {
          size,
          hash: item.audio_info.hash_high,
        }
      }
      list.push({
        singer: decodeName(item.author_name),
        name: decodeName(item.songname),
        albumName: decodeName(item.album_info.album_name),
        albumId: item.album_info.album_id,
        songmid: item.audio_info.audio_id,
        source: 'kg',
        interval: formatPlayTime(parseInt(item.audio_info.timelength) / 1000),
img: null,
lrc: null,
hash: item.audio_info.hash,
otherSource: null,
mv: item.audio_info.mvhash || item.mvhash || null,
types,
_types,
typeUrl: {},
})
    })
    return list
  },

  // 获取列表信息
  getListInfo(tagId, tryNum = 0) {
    if (this._requestObj_listInfo) this._requestObj_listInfo.cancelHttp()
    if (tryNum > 2) return Promise.reject(new Error('try max num'))
    const useHttp = tryNum % 2 === 1
    this._requestObj_listInfo = httpFetch(this.getInfoUrl(tagId, useHttp), { timeout: REQUEST_TIMEOUT })
    return this._requestObj_listInfo.promise.then(({ body }) => {
      if (body.status !== 1) return retryDelay().then(() => this.getListInfo(tagId, ++tryNum))
      return {
        limit: body.data.params.pagesize,
        page: body.data.params.p,
        total: body.data.params.total,
        source: 'kg',
      }
    }).catch(err => {
      if (tryNum >= 2) throw err
      return retryDelay().then(() => this.getListInfo(tagId, ++tryNum))
    })
  },

  // 获取列表数据
  getList(sortId, tagId, page) {
    let tasks = [this.getSongList(sortId, tagId, page)]
    tasks.push(
      this.currentTagInfo.id === tagId
        ? Promise.resolve(this.currentTagInfo.info)
        : this.getListInfo(tagId).then(info => {
          this.currentTagInfo.id = tagId
          this.currentTagInfo.info = Object.assign({}, info)
          return info
        }),
    )
    if (!tagId && page === 1 && sortId === this.sortList[0].id) tasks.push(this.getSongListRecommend()) // 如果是所有类别，则顺便获取推荐列表
    return Promise.all(tasks).then(([list, info, recommendList]) => {
      if (recommendList) list.unshift(...recommendList)
      return {
        list,
        ...info,
      }
    })
  },

  // 获取标签
  getTags(tryNum = 0) {
    if (this._requestObj_tags) this._requestObj_tags.cancelHttp()
    if (tryNum > 2) return Promise.reject(new Error('try max num'))
    const useHttp = tryNum % 2 === 1
    this._requestObj_tags = httpFetch(this.getInfoUrl(undefined, useHttp), { timeout: REQUEST_TIMEOUT })
    return this._requestObj_tags.promise.then(({ body }) => {
      if (body.status !== 1) return retryDelay().then(() => this.getTags(++tryNum))
      return {
        hotTag: this.filterInfoHotTag(body.data.hotTag),
        tags: this.filterTagInfo(body.data.tagids),
        source: 'kg',
      }
    }).catch(err => {
      if (tryNum >= 2) throw err
      return retryDelay().then(() => this.getTags(++tryNum))
    })
  },

  getDetailPageUrl(id) {
    if (typeof id == 'string') {
      if (/^https?:\/\//.test(id)) return id
      id = id.replace('id_', '')
    }
    return `https://www.kugou.com/yy/special/single/${id}.html`
  },

  search(text, page, limit = 20) {
    // http://msearchretry.kugou.com/api/v3/search/special?version=9209&keyword=%E5%91%A8%E6%9D%B0%E4%BC%A6&pagesize=20&filter=0&page=1&sver=2&with_res_tag=0
    // return httpFetch(`http://ioscdn.kugou.com/api/v3/search/special?keyword=${encodeURIComponent(text)}&page=${page}&pagesize=${limit}&showtype=10&plat=2&version=7910&correct=1&sver=5`)
    return httpFetch(`http://msearchretry.kugou.com/api/v3/search/special?keyword=${encodeURIComponent(text)}&page=${page}&pagesize=${limit}&showtype=10&filter=0&version=7910&sver=2`)
      .promise.then(({ body }) => {
        if (body.errcode != 0) throw new Error('filed')
        // console.log(body.data.info)
        return {
          list: body.data.info.map(item => {
            return {
              play_count: formatPlayCount(item.playcount),
              id: 'id_' + item.specialid,
              author: item.nickname,
              name: item.specialname,
              time: dateFormat(item.publishtime, 'Y-M-D'),
              img: item.imgurl,
              grade: item.grade,
              desc: item.intro,
              total: item.songcount,
              source: 'kg',
            }
          }),
          limit,
          total: body.data.total,
          source: 'kg',
        }
      })
  },
}
    Object.assign(sdk.kg.songList, lxKgSongList);
  })();

  // ── mg 歌单：对齐 lx 的链接解析（支持 music.migu.cn/v5/#/playlist?playlistId=xxx 等新版链接）──
  ;(function () {
    const sdk = globalThis.__lx_builtin_sdk;
    if (!sdk || !sdk.mg || !sdk.mg.songList) return;
    sdk.mg.songList.getListDetail = function (id, page, retryNum = 0) {
      // https://h5.nf.migu.cn/app/v4/p/share/playlist/index.html?id=184187437&channel=0146921
      // http://c.migu.cn/00bTY6?ifrom=babddaadfde4ebeda289d671ab62f236
      // https://music.migu.cn/v5/#/playlist?playlistId=221573417
      if (/\/playlist[/?]/.test(id)) {
        id = /(?:playlistId|id)=(\d+)/.exec(id)?.[1];
        if (!id) throw new Error("list detail id parse failed");
      } else if (this.regExps.listDetailLink.test(id)) {
        id = id.replace(this.regExps.listDetailLink, "$1");
      } else if (/[?&:/]/.test(id)) {
        const url = this.cachedUrl[id];
        return url ? this.getListDetail(url, page) : this.getDetailUrl(id, page);
      }
      return Promise.all([
        this.getListDetailList(id, page, retryNum),
        this.getListDetailInfo(id, retryNum),
      ]).then(([listData, info]) => {
        listData.info = info;
        return listData;
      });
    };
  })();

})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
