'use strict';

// builtin-sdk-preload.js — 内置音源 SDK 沙箱预加载脚本
//
// 由 Kotlin 按序执行：
//   1. 注入原生函数（见下方「Kotlin 注入契约」）
//   2. evaluate 本脚本
//   3. evaluate music-sdk.js（IIFE，内部设置 globalThis.Buffer / globalThis.__lx_builtin_sdk）
//
// 本脚本提供 music-sdk.js 运行所需的 Web/Node 兼容环境：
//   - process（kg 请求签名使用 process.versions.app）
//   - fetch / AbortController / FileReader（经原生 HTTP 桥，OkHttp 执行）
//   - setTimeout / clearTimeout + __lx_bg_set_timeout__ / __lx_bg_clear_timeout__
//     （后者供 react-native-background-timer shim 使用）
//   - __lx_user_api_call__（active api 为 user_api* 时，转发到用户脚本沙箱）
//   - __lx_builtin_call__（Kotlin 调用 SDK 的统一入口）
//   - __lx_native__（原生 → JS 分发入口，Kotlin 经 evaluate 调用）
//
// ── Kotlin 注入契约（本沙箱） ────────────────────────────────────────────
//   __lx_builtin_key__                          string  沙箱密钥（本脚本读取后即删）
//   __lx_native_call__(key, action, dataJson)   -> null  JS → 原生异步派发
//   __lx_active_api__()                         -> string 当前 api 源 id（'' / user_api_xxx）
//   __lx_native_call__utils_b64md5(b64)                    -> hex md5
//   __lx_native_call__utils_str2md5(encodedStr)            -> hex md5（内部 URL 解码）
//   __lx_native_call__utils_aes_encrypt(b64,b64,b64,mode)  -> b64
//   __lx_native_call__utils_aes_decrypt(b64,b64,b64,mode)  -> b64
//   __lx_native_call__utils_rsa_encrypt(b64,key,padding)   -> b64
//   __lx_native_call__utils_decode_charset(b64,cs)         -> string
//   __lx_native_call__utils_encode_charset(str,cs)         -> b64
//   __lx_native_call__utils_sha1(str)                      -> hex sha1（tx zzcSign）
//
// ── JS → 原生 action（__lx_native_call__） ──────────────────────────────
//   fetch         { callId, url, options: { method, headers, body, binary } }
//   fetch_abort   { callId }
//   userApiCall   { callId, action, data }   （转发用户脚本沙箱）
//   set_timeout   { id, timeout } / clear_timeout { id }
//   __lx_result__ { callId, ok, data, error }  （__lx_builtin_call__ 的结果）
//
// ── 原生 → JS action（__lx_native__，Kotlin 经 evaluate 调用） ───────────
//   fetch_result    { callId, ok, data | error }
//   userApi_result  { callId, ok, data | error }
//   set_timeout     { id }

(function () {
  const KEY = globalThis.__lx_builtin_key__
  delete globalThis.__lx_builtin_key__

  const _nativeCall = globalThis.__lx_native_call__
  delete globalThis.__lx_native_call__

  const MAX_PAYLOAD = 8 * 1024 * 1024
  const nativeCall = (action, data) => {
    const json = data === undefined ? null : JSON.stringify(data)
    if (json != null && json.length > MAX_PAYLOAD) throw new Error('Input too long')
    return _nativeCall(KEY, action, json)
  }

  // ──────────────────────────────────────────────────────────────
  // process（kg 请求头签名依赖 process.versions.app，对齐上游 globalData.ts）
  // ──────────────────────────────────────────────────────────────
  if (globalThis.process == null) {
    globalThis.process = {
      versions: { app: '1.0.1' },
      env: {},
      platform: 'android',
      nextTick(fn, ...args) {
        Promise.resolve().then(() => fn(...args))
      },
      cwd() { return '/' },
    }
  } else {
    if (globalThis.process.versions == null) globalThis.process.versions = {}
    globalThis.process.versions.app = '1.0.1'
  }

  // ──────────────────────────────────────────────────────────────
  // global 别名：对齐 metro 行为。RN 源码里 fetchData/blobToBuffer
  // （src/utils/request.js）使用裸 global.fetch / global.FileReader /
  // global.AbortController，dateFormat（src/utils/index.ts）使用
  // global.i18n.t(...)，QuickJS 沙箱不提供 global 全局
  // ──────────────────────────────────────────────────────────────
  if (globalThis.global == null) globalThis.global = globalThis

  // i18n 兜底：SDK 沙箱不加载语言包，dateFormat 等路径调用
  // global.i18n.t 时做简单 {name} 插值，缺 key 返回 key 本身
  if (globalThis.i18n == null) {
    globalThis.i18n = {
      t(key, params) {
        if (key == null) return ''
        if (params == null) return String(key)
        return String(key).replace(/\{(\w+)\}/g, (m, name) => (name in params ? String(params[name]) : m))
      },
    }
  }

  // ──────────────────────────────────────────────────────────────
  // 定时器：裸 setTimeout/clearTimeout（kw/util.js wait 等使用）
  // 与 __lx_bg_*（react-native-background-timer shim 入口）
  // ──────────────────────────────────────────────────────────────
  const timerCallbacks = new Map()
  let timerId = 0
  const setTimer = (callback, timeout = 0) => {
    if (typeof callback !== 'function') throw new Error('callback required a function')
    const id = ++timerId
    timerCallbacks.set(id, callback)
    const t = parseInt(timeout)
    nativeCall('set_timeout', { id, timeout: isNaN(t) || t < 0 ? 0 : t })
    return id
  }
  const clearTimer = (id) => {
    if (!timerCallbacks.has(id)) return
    timerCallbacks.delete(id)
    nativeCall('clear_timeout', { id })
  }
  globalThis.setTimeout = setTimer
  globalThis.clearTimeout = clearTimer
  globalThis.__lx_bg_set_timeout__ = (fn, ms) => setTimer(fn, ms)
  globalThis.__lx_bg_clear_timeout__ = (id) => clearTimer(id)

  // ──────────────────────────────────────────────────────────────
  // base64 编解码（自包含，不依赖 music-sdk.js 注入的 Buffer）
  // ──────────────────────────────────────────────────────────────
  const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  const B64_LOOKUP = {}
  for (let i = 0; i < B64_CHARS.length; i++) B64_LOOKUP[B64_CHARS[i]] = i
  const bytesToB64 = (bytes) => {
    let out = ''
    const len = bytes.length
    for (let i = 0; i < len; i += 3) {
      const b0 = bytes[i]
      const b1 = i + 1 < len ? bytes[i + 1] : 0
      const b2 = i + 2 < len ? bytes[i + 2] : 0
      out += B64_CHARS[b0 >> 2]
      out += B64_CHARS[((b0 & 3) << 4) | (b1 >> 4)]
      out += i + 1 < len ? B64_CHARS[((b1 & 15) << 2) | (b2 >> 6)] : '='
      out += i + 2 < len ? B64_CHARS[b2 & 63] : '='
    }
    return out
  }
  const b64ToBytes = (b64) => {
    const clean = b64.replace(/[^A-Za-z0-9+/]/g, '')
    const bytes = []
    for (let i = 0; i < clean.length; i += 4) {
      const c0 = B64_LOOKUP[clean[i]]
      const c1 = B64_LOOKUP[clean[i + 1]]
      const c2 = B64_LOOKUP[clean[i + 2]]
      const c3 = B64_LOOKUP[clean[i + 3]]
      bytes.push((c0 << 2) | (c1 >> 4))
      if (c2 !== undefined) bytes.push(((c1 & 15) << 4) | (c2 >> 2))
      if (c3 !== undefined) bytes.push(((c2 & 3) << 6) | c3)
    }
    return bytes
  }

  // ──────────────────────────────────────────────────────────────
  // AbortController / fetch / FileReader
  // 语义对齐 whatwg-fetch（RN fetch 实现）：
  //   - fetchData 使用 resp.text() / resp.blob() / resp.headers.map / resp.status / resp.ok / resp.url
  //   - binary: true 时走 blob() → blobToBuffer() → FileReader.readAsDataURL()
  // ──────────────────────────────────────────────────────────────
  const makeAbortError = () => {
    const err = new Error('Aborted')
    err.name = 'AbortError'
    return err
  }

  globalThis.AbortController = class AbortController {
    constructor() {
      const listeners = []
      this.signal = {
        aborted: false,
        onabort: null,
        addEventListener(type, fn) {
          if (type === 'abort' && typeof fn === 'function') listeners.push(fn)
        },
        removeEventListener(type, fn) {
          if (type === 'abort') {
            const i = listeners.indexOf(fn)
            if (i > -1) listeners.splice(i, 1)
          }
        },
        _fire() {
          if (this.aborted) return
          this.aborted = true
          if (typeof this.onabort === 'function') this.onabort()
          for (const fn of listeners.slice()) fn()
        },
      }
    }
    abort() {
      this.signal._fire()
    }
  }

  const pendingFetches = new Map()
  let fetchCallId = 0

  const detachAbort = (entry) => {
    if (entry.signal && entry.onAbort) entry.signal.removeEventListener('abort', entry.onAbort)
  }

  globalThis.fetch = (url, options = {}) => {
    const callId = ++fetchCallId
    const opts = {
      method: options.method || 'get',
      headers: options.headers || {},
      binary: options.binary === true,
    }
    if (options.body != null) {
      opts.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
    }
    return new Promise((resolve, reject) => {
      const entry = { resolve, reject, signal: options.signal || null, onAbort: null }
      pendingFetches.set(callId, entry)
      if (entry.signal && entry.signal.aborted) {
        pendingFetches.delete(callId)
        reject(makeAbortError())
        return
      }
      if (entry.signal) {
        entry.onAbort = () => {
          if (!pendingFetches.has(callId)) return
          pendingFetches.delete(callId)
          nativeCall('fetch_abort', { callId })
          reject(makeAbortError())
        }
        entry.signal.addEventListener('abort', entry.onAbort)
      }
      try {
        nativeCall('fetch', { callId, url: String(url), options: opts })
      } catch (err) {
        detachAbort(entry)
        pendingFetches.delete(callId)
        reject(err)
      }
    })
  }

  const buildHeadersMap = (headers) => {
    const map = {}
    if (headers == null) return map
    for (const name of Object.keys(headers)) {
      const value = headers[name]
      map[name] = Array.isArray(value) ? value.join(',') : String(value)
    }
    return map
  }

  const resolveFetch = (callId, data) => {
    const entry = pendingFetches.get(callId)
    if (!entry) return
    pendingFetches.delete(callId)
    detachAbort(entry)
    const headersMap = buildHeadersMap(data.headers)
    entry.resolve({
      status: data.statusCode,
      statusCode: data.statusCode,
      ok: data.ok,
      url: data.url,
      headers: { map: headersMap },
      text() {
        return Promise.resolve(data.bodyText == null ? '' : data.bodyText)
      },
      blob() {
        if (data.bodyB64 != null) {
          return Promise.resolve({
            __lx_b64: data.bodyB64,
            size: data.bodySize || 0,
            type: data.contentType || 'application/octet-stream',
          })
        }
        return Promise.resolve({
          size: 0,
          type: 'text/plain',
          text() { return Promise.resolve(data.bodyText == null ? '' : data.bodyText) },
        })
      },
    })
  }

  const rejectFetch = (callId, message) => {
    const entry = pendingFetches.get(callId)
    if (!entry) return
    pendingFetches.delete(callId)
    detachAbort(entry)
    entry.reject(new Error(message || 'request failed'))
  }

  globalThis.FileReader = class FileReader {
    constructor() {
      this.result = null
      this.error = null
      this.readyState = 0
      this.onload = null
      this.onerror = null
    }
    readAsDataURL(blob) {
      Promise.resolve().then(() => {
        try {
          if (blob != null && typeof blob.__lx_b64 === 'string') {
            this.result = 'data:' + (blob.type || 'application/octet-stream') + ';base64,' + blob.__lx_b64
          } else if (blob != null && (ArrayBuffer.isView(blob) || blob instanceof ArrayBuffer)) {
            const bytes = blob instanceof ArrayBuffer ? new Uint8Array(blob) : new Uint8Array(blob.buffer, blob.byteOffset, blob.byteLength)
            this.result = 'data:application/octet-stream;base64,' + bytesToB64(Array.from(bytes))
          } else {
            throw new Error('Unsupported blob type')
          }
          this.readyState = 2
          if (typeof this.onload === 'function') this.onload({ target: this })
        } catch (err) {
          this.error = err
          this.readyState = 2
          if (typeof this.onerror === 'function') this.onerror(err)
        }
      })
    }
  }

  // ──────────────────────────────────────────────────────────────
  // 用户脚本桥：__lx_user_api_call__(action, data) → Promise
  // action ∈ musicUrl | lyric | pic；data = { source, type?, musicInfo }
  // 解析值语义对齐原版 userApi/index.ts：
  //   musicUrl → { type, url }；lyric → { lyric, tlyric, rlyric, lxlyric }；pic → url 字符串
  // ──────────────────────────────────────────────────────────────
  const pendingUserApiCalls = new Map()
  let userApiCallId = 0
  let builtinCallId = 0
  globalThis.__lx_user_api_call__ = (action, data) => new Promise((resolve, reject) => {
    const callId = ++userApiCallId
    pendingUserApiCalls.set(callId, { resolve, reject })
    nativeCall('userApiCall', { callId, action, data })
  })

  const resolveUserApiCall = (callId, data) => {
    const target = pendingUserApiCalls.get(callId)
    if (!target) return
    pendingUserApiCalls.delete(callId)
    target.resolve(data)
  }
  const rejectUserApiCall = (callId, message) => {
    const target = pendingUserApiCalls.get(callId)
    if (!target) return
    pendingUserApiCalls.delete(callId)
    target.reject(new Error(message || 'request failed'))
  }

  // ──────────────────────────────────────────────────────────────
  // Kotlin 调用入口：__lx_builtin_call__(method, argsJson)
  //   init      {}                                        → musicSdk.init()
  //   search    { source, keyword, page, limit }          → musicSearch.search(...)
  //   findMusic { musicInfo }                             → findMusic(...)（换源重试）
  //   musicUrl  { source, musicInfo, type }               → getMusicUrl(...).promise
  //   lyric     { source, musicInfo }                     → getLyric(...).promise
  //   pic       { source, musicInfo }                     → getPic(...).promise
//   getBoards { source }                                → leaderboard.getBoards()（平台榜单列表）
//   boardList { source, id, page }                      → leaderboard.getList(bangid, page)（榜内歌曲，id 为 bangid）
//   songListSorts { source }                            → songList.sortList（排序方式，静态数据）
//   songListTags { source }                             → songList.getTags()（歌单标签）
//   songList { source, sortId, tagId, page }            → songList.getList(sortId, tagId, page)（歌单列表）
//   songListDetail { source, id, page }                 → songList.getListDetail(id, page)（歌单内歌曲）
  // 结果经 __lx_result__ 异步回传（data 为 JSON 字符串，避免二次编码大对象）
  // ──────────────────────────────────────────────────────────────
  globalThis.__lx_builtin_call__ = (method, argsJson) => {
    let args = {}
    if (argsJson) {
      try {
        args = JSON.parse(argsJson)
      } catch (err) {
        return null
      }
    }
    const callId = ++builtinCallId // callId 仅用于 Kotlin 侧配对 __lx_result__
    const sdk = globalThis.__lx_builtin_sdk
    const finish = (ok, dataJson, error) => {
      nativeCall('__lx_result__', { callId, ok, data: dataJson, error })
    }
    let promise
    try {
      switch (method) {
        case 'init':
          promise = Promise.resolve(sdk.init())
          break
        case 'search':
          promise = sdk[args.source].musicSearch.search(args.keyword, args.page, args.limit)
          break
        case 'tipSearch':
          promise = sdk[args.source].tipSearch.search(args.keyword)
          break
        case 'hotSearch':
          promise = sdk[args.source].hotSearch.getList()
          break
        case 'findMusic':
          promise = Promise.resolve(sdk.findMusic(args.musicInfo || args))
          break
        case 'musicUrl':
          promise = sdk[args.source].getMusicUrl(args.musicInfo, args.type).promise
          break
        case 'lyric':
          promise = sdk[args.source].getLyric(args.musicInfo).promise
          break
        case 'pic':
          promise = sdk[args.source].getPic(args.musicInfo).promise
          break
        case 'mvUrl':
          promise = sdk[args.source].mv.getMvUrl(args.mvId).then((r) => ({ url: r.url }))
          break
        case 'mvInfo':
          // 补全歌单曲目缺失的 mv 字段（mobile listMvRefresh 同款）
          promise = sdk[args.source].mv.getMvInfo(args.musicInfo).then((mv) => ({ mv }))
          break
        case 'getBoards':
          promise = sdk[args.source].leaderboard.getBoards()
          break
        case 'boardList':
          promise = sdk[args.source].leaderboard.getList(args.id, args.page)
          break
        case 'songListSorts':
          promise = Promise.resolve(sdk[args.source].songList.sortList || [])
          break
        case 'songListTags':
          promise = sdk[args.source].songList.getTags()
          break
        case 'songList':
          promise = sdk[args.source].songList.getList(args.sortId || '', args.tagId || '', args.page)
          break
        case 'songListDetail':
          promise = sdk[args.source].songList.getListDetail(args.id, args.page)
          break
        default:
          finish(false, null, 'Unknown method: ' + method)
          return null
      }
    } catch (err) {
      finish(false, null, String((err && err.message) || err))
      return null
    }
    promise.then(data => {
      let dataJson = null
      try {
        dataJson = JSON.stringify(data === undefined ? null : data)
      } catch (err) {
        finish(false, null, 'stringify result failed: ' + String((err && err.message) || err))
        return
      }
      finish(true, dataJson, null)
    }).catch(err => {
      finish(false, null, String((err && err.message) || err))
    })
    return null
  }

  // ──────────────────────────────────────────────────────────────
  // 原生 → JS 分发入口（Kotlin 经 evaluate 调用，evaluate 会抽干 job 队列，
  // 因此 promise 链在本调用返回前即可继续推进）
  // ──────────────────────────────────────────────────────────────
  globalThis.__lx_native__ = (key, action, dataJson) => {
    if (key !== KEY) return 'Invalid key'
    let data = null
    if (dataJson != null) {
      try {
        data = JSON.parse(dataJson)
      } catch (err) {
        return 'Invalid data'
      }
    }
    switch (action) {
      case 'fetch_result':
        if (data.ok) resolveFetch(data.callId, data.data)
        else rejectFetch(data.callId, data.error)
        return
      case 'userApi_result':
        if (data.ok) resolveUserApiCall(data.callId, data.data)
        else rejectUserApiCall(data.callId, data.error)
        return
      case 'set_timeout': {
        const cb = timerCallbacks.get(data.id)
        if (cb) {
          timerCallbacks.delete(data.id)
          cb()
        }
        return
      }
    }
    return 'Unknown action: ' + action
  }
})()
