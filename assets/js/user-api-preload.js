(function () {
'use strict'

// user-api-preload.js — 用户音源脚本沙箱预加载
//
// 由 Kotlin 按序执行：
//   1. 注入原生函数：__lx_user_key__（沙箱密钥）、__lx_native_call__ + 6 个 utils
//   2. evaluate 本脚本  → 顶层建立桥接并定义 globalThis.lx（新模板直接解构使用）
//   3. evaluate 用户脚本 → 新模板：const { request, on, send, ... } = globalThis.lx
//                       旧模板：globalThis.lx_setup(...) 后同样使用 globalThis.lx
//
// 两代模板兼容：
//   - 新模板（lxmusic.toside.cn/custom-source）：不调 lx_setup，直接用 globalThis.lx
//   - 旧模板：调 globalThis.lx_setup(key, id, name, ...)，本脚本将其降级为 meta 记录 shim
//
// ── Kotlin 注入契约 ──────────────────────────────────────────────
//   __lx_user_key__                              string  沙箱密钥（本脚本读取后即删）
//   __lx_native_call__(key, action, dataJson)    -> null  JS → 原生异步派发
//   __lx_native_call__set_timeout(id, ms)                定时器（到期回调 __set_timeout__）
//   __lx_native_call__utils_str2b64(str)                 -> b64
//   __lx_native_call__utils_b642buf(b64)                 -> JSON 字节数组
//   __lx_native_call__utils_str2md5(encodedStr)          -> hex md5（内部 URL 解码）
//   __lx_native_call__utils_aes_encrypt(b64,b64,b64,mode)-> b64
//   __lx_native_call__utils_rsa_encrypt(b64,key,padding) -> b64
//
// ── JS → 原生 action（__lx_native_call__） ──────────────────────
//   request / cancelRequest / response / init / showUpdateAlert
// ── 原生 → JS action（__lx_native__，Kotlin 经 evaluate 调用） ──
//   request（触发脚本 request 事件）/ response（HTTP 结果回传）/ __set_timeout__ / __run_error__

const KEY = globalThis.__lx_user_key__
delete globalThis.__lx_user_key__

const _nativeCall = globalThis.__lx_native_call__
delete globalThis.__lx_native_call__

const checkLength = (str, length = 1048576) => {
  if (typeof str == 'string' && str.length > length) throw new Error('Input too long')
  return str
}
const nativeFuncNames = [
  '__lx_native_call__set_timeout',
  '__lx_native_call__utils_str2b64',
  '__lx_native_call__utils_b642buf',
  '__lx_native_call__utils_str2md5',
  '__lx_native_call__utils_aes_encrypt',
  '__lx_native_call__utils_rsa_encrypt',
]
const nativeFuncs = {}
for (const name of nativeFuncNames) {
  const nativeFunc = globalThis[name]
  delete globalThis[name]
  nativeFuncs[name.replace('__lx_native_call__', '')] = (...args) => {
    for (const arg of args) checkLength(arg)
    return nativeFunc(...args)
  }
}

const KEY_PREFIX = {
  publicKeyStart: '-----BEGIN PUBLIC KEY-----',
  publicKeyEnd: '-----END PUBLIC KEY-----',
  privateKeyStart: '-----BEGIN PRIVATE KEY-----',
  privateKeyEnd: '-----END PRIVATE KEY-----',
}
const RSA_PADDING = {
  OAEPWithSHA1AndMGF1Padding: 'RSA/ECB/OAEPWithSHA1AndMGF1Padding',
  NoPadding: 'RSA/ECB/NoPadding',
}
const AES_MODE = {
  CBC_128_PKCS7Padding: 'AES/CBC/PKCS7Padding',
  ECB_128_NoPadding: 'AES',
}

const nativeCall = (action, data) => {
  data = JSON.stringify(data)
  checkLength(data, 2097152)
  _nativeCall(KEY, action, data)
}

// ── 定时器（脚本沙箱内 setTimeout/clearTimeout） ──────────────────
const callbacks = new Map()
let timeoutId = 0
const _setTimeout = (callback, timeout = 0, ...params) => {
  if (typeof callback !== 'function') throw new Error('callback required a function')
  if (typeof timeout !== 'number' || timeout < 0) throw new Error('timeout required a number')
  if (timeoutId > 90000000000) throw new Error('max timeout')
  const id = timeoutId++
  callbacks.set(id, {
    callback(...args) {
      callback(...args)
    },
    params,
  })
  nativeFuncs.set_timeout(id, parseInt(timeout))
  return id
}
const _clearTimeout = (id) => {
  const target = callbacks.get(id)
  if (!target) return
  callbacks.delete(id)
}
const handleSetTimeout = (id) => {
  const target = callbacks.get(id)
  if (!target) return
  callbacks.delete(id)
  target.callback(...target.params)
}

// ── UTF-8 字节编解码（无 TextDecoder 环境） ──────────────────────
function bytesToString(bytes) {
  let result = ''
  let i = 0
  while (i < bytes.length) {
    const byte = bytes[i]
    if (byte < 128) {
      result += String.fromCharCode(byte)
      i++
    } else if (byte >= 192 && byte < 224) {
      result += String.fromCharCode(((byte & 31) << 6) | (bytes[i + 1] & 63))
      i += 2
    } else {
      result += String.fromCharCode(((byte & 15) << 12) | ((bytes[i + 1] & 63) << 6) | (bytes[i + 2] & 63))
      i += 3
    }
  }
  return result
}
function stringToBytes(inputString) {
  const bytes = []
  for (let i = 0; i < inputString.length; i++) {
    const charCode = inputString.charCodeAt(i)
    if (charCode < 128) {
      bytes.push(charCode)
    } else if (charCode < 2048) {
      bytes.push((charCode >> 6) | 192)
      bytes.push((charCode & 63) | 128)
    } else {
      bytes.push((charCode >> 12) | 224)
      bytes.push(((charCode >> 6) & 63) | 192)
      bytes.push((charCode & 63) | 128)
    }
  }
  return bytes
}

const NATIVE_EVENTS_NAMES = {
  init: 'init',
  showUpdateAlert: 'showUpdateAlert',
  request: 'request',
  cancelRequest: 'cancelRequest',
  response: 'response',
}
const EVENT_NAMES = {
  request: 'request',
  inited: 'inited',
  updateAlert: 'updateAlert',
}
const eventNames = Object.values(EVENT_NAMES)
const events = {
  request: null,
}

const verifyLyricInfo = (info) => {
  if (typeof info != 'object' || typeof info.lyric != 'string') throw new Error('failed')
  if (info.lyric.length > 51200) throw new Error('failed')
  return {
    lyric: info.lyric,
    tlyric: (typeof info.tlyric == 'string' && info.tlyric.length < 5120) ? info.tlyric : null,
    rlyric: (typeof info.rlyric == 'string' && info.rlyric.length < 5120) ? info.rlyric : null,
    lxlyric: (typeof info.lxlyric == 'string' && info.lxlyric.length < 8192) ? info.lxlyric : null,
  }
}

// ── HTTP：脚本 request 经原生桥执行 ──────────────────────────────
const requestQueue = new Map()
const sendNativeRequest = (url, options, callback) => {
  const requestKey = Math.random().toString()
  const requestInfo = {
    aborted: false,
    abort: () => {
      nativeCall(NATIVE_EVENTS_NAMES.cancelRequest, requestKey)
    },
  }
  requestQueue.set(requestKey, {
    callback,
    requestInfo,
  })
  nativeCall(NATIVE_EVENTS_NAMES.request, { requestKey, url, options })
  return requestInfo
}
const handleNativeResponse = ({ requestKey, error, response }) => {
  const targetRequest = requestQueue.get(requestKey)
  if (!targetRequest) return
  requestQueue.delete(requestKey)
  targetRequest.requestInfo.aborted = true
  if (error == null) targetRequest.callback(null, response)
  else targetRequest.callback(new Error(error), null)
}

let isShowedUpdateAlert = false

// ── 原生 → JS：触发脚本 request 事件处理器 ───────────────────────
const handleRequest = ({ requestKey, data }) => {
  if (!events.request) return nativeCall(NATIVE_EVENTS_NAMES.response, { requestKey, status: false, errorMessage: 'Request event is not defined' })
  try {
    events.request.call(globalThis.lx, { source: data.source, action: data.action, info: data.info }).then(response => {
      let result
      switch (data.action) {
        case 'musicUrl':
          if (typeof response != 'string' || response.length > 2048 || !/^https?:/.test(response)) throw new Error('failed')
          result = {
            source: data.source,
            action: data.action,
            data: {
              type: data.info.type,
              url: response,
            },
          }
          break
        case 'lyric':
          result = {
            source: data.source,
            action: data.action,
            data: verifyLyricInfo(response),
          }
          break
        case 'pic':
          if (typeof response != 'string' || response.length > 2048 || !/^https?:/.test(response)) throw new Error('failed')
          result = {
            source: data.source,
            action: data.action,
            data: response,
          }
          break
      }
      nativeCall(NATIVE_EVENTS_NAMES.response, { requestKey, status: true, result })
    }).catch(err => {
      nativeCall(NATIVE_EVENTS_NAMES.response, { requestKey, status: false, errorMessage: err.message })
    })
  } catch (err) {
    nativeCall(NATIVE_EVENTS_NAMES.response, { requestKey, status: false, errorMessage: err.message })
  }
}

const jsCall = (action, data) => {
  switch (action) {
    case '__run_error__':
      return
    case '__set_timeout__':
      handleSetTimeout(data)
      return
    case 'request':
      handleRequest(data)
      return
    case 'response':
      handleNativeResponse(data)
      return
  }
  return 'Unknown action: ' + action
}

Object.defineProperty(globalThis, '__lx_native__', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: (key, action, dataJson) => {
    if (key != KEY) return 'Invalid key'
    return dataJson == null ? jsCall(action) : jsCall(action, JSON.parse(dataJson))
  },
})

// ── utils（对齐原版 crypto/buffer 语义） ─────────────────────────
const dataToB64 = (data) => {
  if (typeof data === 'string') return nativeFuncs.utils_str2b64(data)
  else if (Array.isArray(data) || ArrayBuffer.isView(data)) return utils.buffer.bufToString(data, 'base64')
  throw new Error('data type error: ' + typeof data + ' raw data: ' + data)
}
const utils = {
  crypto: {
    aesEncrypt(buffer, mode, key, iv) {
      switch (mode) {
        case 'aes-128-cbc':
          return utils.buffer.from(nativeFuncs.utils_aes_encrypt(dataToB64(buffer), dataToB64(key), dataToB64(iv), AES_MODE.CBC_128_PKCS7Padding), 'base64')
        case 'aes-128-ecb':
          return utils.buffer.from(nativeFuncs.utils_aes_encrypt(dataToB64(buffer), dataToB64(key), '', AES_MODE.ECB_128_NoPadding), 'base64')
        default:
          throw new Error('Binary encoding is not supported for input strings')
      }
    },
    rsaEncrypt(buffer, key) {
      if (typeof key !== 'string') throw new Error('Invalid RSA key')
      key = key.replace(KEY_PREFIX.publicKeyStart, '')
        .replace(KEY_PREFIX.publicKeyEnd, '')
      return utils.buffer.from(nativeFuncs.utils_rsa_encrypt(dataToB64(buffer), key, RSA_PADDING.NoPadding), 'base64')
    },
    randomBytes(size) {
      const byteArray = new Uint8Array(size)
      for (let i = 0; i < size; i++) {
        byteArray[i] = Math.floor(Math.random() * 256)
      }
      return byteArray
    },
    md5(str) {
      if (typeof str !== 'string') throw new Error('param required a string')
      return nativeFuncs.utils_str2md5(encodeURIComponent(str))
    },
  },
  buffer: {
    from(input, encoding) {
      if (typeof input === 'string') {
        switch (encoding) {
          case 'binary':
            throw new Error('Binary encoding is not supported for input strings')
          case 'base64':
            return new Uint8Array(JSON.parse(nativeFuncs.utils_b642buf(input)))
          case 'hex':
            return new Uint8Array(input.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
          default:
            return new Uint8Array(stringToBytes(input))
        }
      } else if (Array.isArray(input)) {
        return new Uint8Array(input)
      } else {
        throw new Error('Unsupported input type: ' + input + ' encoding: ' + encoding)
      }
    },
    bufToString(buf, format) {
      if (Array.isArray(buf) || ArrayBuffer.isView(buf)) {
        switch (format) {
          case 'binary':
            return buf
          case 'hex':
            return new Uint8Array(buf).reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '')
          case 'base64':
            return nativeFuncs.utils_str2b64(bytesToString(Array.from(buf)))
          case 'utf8':
          case 'utf-8':
          default:
            return bytesToString(Array.from(buf))
        }
      } else {
        throw new Error('Input is not a valid buffer: ' + buf + ' format: ' + format)
      }
    },
  },
}

// ── globalThis.lx：新模板直接解构使用；桥在顶层已建好 ─────────────
globalThis.lx = {
  EVENT_NAMES,
  request(url, { method = 'get', timeout, headers, body, form, formData, binary }, callback) {
    let options = { headers, binary: binary === true }
    if (timeout && typeof timeout == 'number' && timeout > 0) options.timeout = Math.min(timeout, 60_000)

    let request = sendNativeRequest(url, { method, body, form, formData, ...options }, (err, resp) => {
      if (err) {
        callback(err, null, null)
      } else {
        callback(err, {
          statusCode: resp.statusCode,
          statusMessage: resp.statusMessage,
          headers: resp.headers,
          body: resp.body,
        }, resp.body)
      }
    })

    return () => {
      if (!request.aborted) request.abort()
      request = null
    }
  },
  send(eventName, data) {
    return new Promise((resolve, reject) => {
      if (!eventNames.includes(eventName)) return reject(new Error('The event is not supported: ' + eventName))
      switch (eventName) {
        case EVENT_NAMES.inited:
          handleInit(data)
          resolve()
          break
        case EVENT_NAMES.updateAlert:
          if (isShowedUpdateAlert) return reject(new Error('The update alert can only be called once.'))
          isShowedUpdateAlert = true
          handleShowUpdateAlert(data, resolve, reject)
          break
        default:
          reject(new Error('Unknown event name: ' + eventName))
      }
    })
  },
  on(eventName, handler) {
    if (!eventNames.includes(eventName)) return Promise.reject(new Error('The event is not supported: ' + eventName))
    switch (eventName) {
      case EVENT_NAMES.request:
        events.request = handler
        break
      default: return Promise.reject(new Error('The event is not supported: ' + eventName))
    }
    return Promise.resolve()
  },
  utils,
  currentScriptInfo: {
    name: '',
    description: '',
    version: '',
    author: '',
    homepage: '',
    rawScript: '',
  },
  version: '2.0.0',
  env: 'mobile',
}

// ── init 处理 ────────────────────────────────────────────────────
const allSources = ['kw', 'kg', 'tx', 'wy', 'mg', 'local']
const supportQualitys = {
  kw: ['128k', '320k', 'flac', 'flac24bit'],
  kg: ['128k', '320k', 'flac', 'flac24bit'],
  tx: ['128k', '320k', 'flac', 'flac24bit'],
  wy: ['128k', '320k', 'flac', 'flac24bit'],
  mg: ['128k', '320k', 'flac', 'flac24bit'],
  local: [],
}
const supportActions = {
  kw: ['musicUrl'],
  kg: ['musicUrl'],
  tx: ['musicUrl'],
  wy: ['musicUrl'],
  mg: ['musicUrl'],
  xm: ['musicUrl'],
  local: ['musicUrl', 'lyric', 'pic'],
}
const handleInit = (info) => {
  if (!info) {
    nativeCall(NATIVE_EVENTS_NAMES.init, { info: null, status: false, errorMessage: 'Missing required parameter init info' })
    return
  }
  const sourceInfo = {
    sources: {},
  }
  try {
    for (const source of allSources) {
      const userSource = info.sources[source]
      if (!userSource || userSource.type !== 'music') continue
      const qualitys = supportQualitys[source]
      const actions = supportActions[source]
      sourceInfo.sources[source] = {
        type: 'music',
        actions: actions.filter(a => userSource.actions.includes(a)),
        qualitys: qualitys.filter(q => userSource.qualitys.includes(q)),
      }
    }
  } catch (error) {
    nativeCall(NATIVE_EVENTS_NAMES.init, { info: null, status: false, errorMessage: error.message })
    return
  }
  nativeCall(NATIVE_EVENTS_NAMES.init, { info: sourceInfo, status: true })
}
const handleShowUpdateAlert = (data, resolve, reject) => {
  if (!data || typeof data != 'object') return reject(new Error('parameter format error.'))
  if (!data.log || typeof data.log != 'string') return reject(new Error('log is required.'))
  if (data.updateUrl && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(data.updateUrl) && data.updateUrl.length > 1024) delete data.updateUrl
  if (data.log.length > 1024) data.log = data.log.substring(0, 1024) + '...'
  nativeCall(NATIVE_EVENTS_NAMES.showUpdateAlert, { log: data.log, updateUrl: data.updateUrl })
  resolve()
}

globalThis.setTimeout = _setTimeout
globalThis.clearTimeout = _clearTimeout

const freezeObject = (obj, skipKey) => {
  if (typeof obj != 'object') return
  Object.freeze(obj)
  for (const [k, subObj] of Object.entries(obj)) {
    // currentScriptInfo 需保持可写：lx_setup（旧模板）在脚本运行期回填真实 meta，
    // 与 lx 原版「先填 meta 再冻结」的时序等价
    if (k === skipKey) continue
    freezeObject(subObj)
  }
}
freezeObject(globalThis.lx, 'currentScriptInfo')

// ── 旧模板兼容：lx_setup 退化为 meta 记录 shim ───────────────────
// 旧模板：globalThis.lx_setup(key, id, name, description, version, author, homepage, rawScript)
// 新规范下桥接已在顶层建立，此处仅记录 meta 供原生读取
globalThis.lx_setup = (key, id, name, description, version, author, homepage, rawScript) => {
  try {
    // currentScriptInfo 未冻结，可回填（对齐 lx 原版暴露的字段，含 rawScript）
    Object.assign(globalThis.lx.currentScriptInfo, {
      id: typeof id == 'string' ? id : '',
      name: typeof name == 'string' ? name : '',
      description: typeof description == 'string' ? description : '',
      version: typeof version == 'string' ? version : '',
      author: typeof author == 'string' ? author : '',
      homepage: typeof homepage == 'string' ? homepage : '',
      rawScript: typeof rawScript == 'string' ? rawScript : '',
    })
  } catch (e) { /* ignore */ }
}

// ── 安全加固（对齐原版：禁 eval/Function、冻结全局） ──────────────
const _toString = Function.prototype.toString
Function.prototype.toString = function() {
  return Object.getOwnPropertyDescriptors(this).name.configurable
    ? _toString.apply(this)
    : `function ${this.name}() { [native code] }`
}
globalThis.eval = function() {
  throw new Error('eval is not available')
}
const proxyFunctionConstructor = new Proxy(Function.prototype.constructor, {
  apply() {
    throw new Error('Dynamic code execution is not allowed.')
  },
  construct() {
    throw new Error('Dynamic code execution is not allowed.')
  },
})
Object.defineProperty(Function.prototype, 'constructor', {
  value: proxyFunctionConstructor,
  writable: false,
  configurable: false,
  enumerable: false,
})
globalThis.Function = proxyFunctionConstructor

const excludes = [
  Function.prototype.toString,
  Function.prototype.toLocaleString,
  Object.prototype.toString,
]
const freezeObjectProperty = (obj, freezedObj = new Set()) => {
  if (obj == null) return
  switch (typeof obj) {
    case 'object':
    case 'function':
      if (freezedObj.has(obj)) return
      freezedObj.add(obj)
      for (const [name, { ...config }] of Object.entries(Object.getOwnPropertyDescriptors(obj))) {
        if (!excludes.includes(config.value)) {
          if (config.writable) config.writable = false
          if (config.configurable) config.configurable = false
          Object.defineProperty(obj, name, config)
        }
        freezeObjectProperty(config.value, freezedObj)
      }
  }
}
freezeObjectProperty(globalThis)

console.log('Preload finished.')
})()
