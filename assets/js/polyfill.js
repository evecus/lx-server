// QuickJS 默认不提供浏览器/Node 全局，补全 preload 与 SDK 所需的最小集合。
// 在任何 preload 之前执行。
(function () {
  'use strict';
  if (typeof globalThis.console === 'undefined') {
    globalThis.console = {
      log() {}, info() {}, warn() {}, error() {}, debug() {}, trace() {},
      time() {}, timeEnd() {}, assert() {}, dir() {}, table() {}, group() {}, groupEnd() {},
    };
  }
  if (typeof globalThis.atob === 'undefined') {
    const C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    globalThis.atob = (s) => {
      const clean = String(s).replace(/[^A-Za-z0-9+/]/g, '');
      let out = '';
      for (let i = 0; i < clean.length; i += 4) {
        const a = C.indexOf(clean[i]), b = C.indexOf(clean[i+1]);
        const c = C.indexOf(clean[i+2]), d = C.indexOf(clean[i+3]);
        out += String.fromCharCode((a << 2) | (b >> 4));
        if (c >= 0) out += String.fromCharCode(((b & 15) << 4) | (c >> 2));
        if (d >= 0) out += String.fromCharCode(((c & 3) << 6) | d);
      }
      return out;
    };
    globalThis.btoa = (s) => {
      let out = '';
      for (let i = 0; i < s.length; i += 3) {
        const a = s.charCodeAt(i), b = i+1 < s.length ? s.charCodeAt(i+1) : 0, c = i+2 < s.length ? s.charCodeAt(i+2) : 0;
        out += C[a >> 2] + C[((a & 3) << 4) | (b >> 4)];
        out += i+1 < s.length ? C[((b & 15) << 2) | (c >> 6)] : '=';
        out += i+2 < s.length ? C[c & 63] : '=';
      }
      return out;
    };
  }
  if (typeof globalThis.TextEncoder === 'undefined') {
    globalThis.TextEncoder = class TextEncoder {
      encode(str = '') {
        const s = String(str), out = [];
        for (let i = 0; i < s.length; i++) {
          let c = s.charCodeAt(i);
          if (c < 0x80) out.push(c);
          else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
          else if (c >= 0xd800 && c <= 0xdbff && i + 1 < s.length) {
            const c2 = s.charCodeAt(++i);
            const cp = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
            out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
          } else out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
        }
        return new Uint8Array(out);
      }
    };
    globalThis.TextDecoder = class TextDecoder {
      constructor(label) { this.enc = String(label || 'utf-8').toLowerCase(); }
      decode(buf) {
        const a = buf instanceof Uint8Array ? buf : new Uint8Array(buf || []);
        if (this.enc.includes('gbk') || this.enc.includes('gb18030') || this.enc.includes('gb2312')) {
          return globalThis.__lx_native_call__utils_decode_charset(
            globalThis.__native_b64 ? globalThis.__native_b64(a) : '', 'gbk');
        }
        let s = '';
        for (let i = 0; i < a.length; i++) {
          const b = a[i];
          if (b < 0x80) s += String.fromCharCode(b);
          else if (b < 0xe0 && i + 1 < a.length) { s += String.fromCharCode(((b & 31) << 6) | (a[++i] & 63)); }
          else if (b < 0xf0 && i + 2 < a.length) {
            const c = ((b & 15) << 12) | ((a[i+1] & 63) << 6) | (a[i+2] & 63); i += 2; s += String.fromCharCode(c);
          }
        }
        return s;
      }
    };
  }
  if (typeof globalThis.Uint8Array !== 'undefined' && typeof globalThis.__native_b64 === 'undefined') {
    // 供 TextDecoder 与脚本内部 base64 转换使用
    globalThis.__native_b64 = (bytes) => {
      const C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let out = '';
      for (let i = 0; i < bytes.length; i += 3) {
        const a = bytes[i], b = i+1 < bytes.length ? bytes[i+1] : 0, c = i+2 < bytes.length ? bytes[i+2] : 0;
        out += C[a >> 2] + C[((a & 3) << 4) | (b >> 4)];
        out += i+1 < bytes.length ? C[((b & 15) << 2) | (c >> 6)] : '=';
        out += i+2 < bytes.length ? C[c & 63] : '=';
      }
      return out;
    };
  }
})();
