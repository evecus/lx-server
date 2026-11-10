//! QuickJS 沙箱引擎：单专用线程持有 Runtime + 两个 Context。
//! host 函数只把事件压入队列，绝不捕获 Ctx（避免循环引用导致 drop 断言）。
//! 事件循环负责：驱动 Promise job → 处理 HTTP / 定时器 → eval 回推 → 收结果。
use crate::crypto;
use rquickjs::{Context, Function, Runtime};
use serde_json::{json, Value};
use std::collections::VecDeque;
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};
use tokio::sync::{mpsc, oneshot};

pub type Reply = oneshot::Sender<Result<String, String>>;

#[derive(Clone, Copy, Debug, PartialEq)]
enum Sb { Builtin, User }

#[derive(Debug)]
enum Ev {
    // ---- builtin SDK ----
    Fetch { call_id: i64, url: String, options: String },
    FetchAbort,
    SetTimeout { id: i64, ms: u64 },
    ClearTimeout { id: i64 },
    Result { ok: bool, data: Option<String>, error: Option<String> },
    ActiveApi,
    // ---- user api ----
    Request { request_key: String, url: String, options: String },
    CancelRequest,
    Response { status: bool, result: Option<String>, error: Option<String> },
    Init { info: Option<String>, status: bool, error: Option<String> },
    UpdateAlert,
    UserSetTimeout { id: i64, ms: u64 },
}

#[derive(Clone)]
struct Bus { q: Arc<Mutex<VecDeque<(Sb, Ev)>>>, key_builtin: Arc<String>, key_user: Arc<String> }
impl Bus {
    fn push(&self, sb: Sb, ev: Ev) { self.q.lock().unwrap().push_back((sb, ev)); }
    fn drain(&self) -> Vec<(Sb, Ev)> { self.q.lock().unwrap().drain(..).collect() }
    fn key(&self, sb: Sb) -> &str { match sb { Sb::Builtin => &self.key_builtin, Sb::User => &self.key_user } }
}

pub enum Cmd {
    Builtin { method: String, args: String, reply: Reply },
    User { data: String, reply: Reply },
    LoadUser { script: String, reply: Reply },
}

#[derive(Clone)]
pub struct JsHandle { tx: mpsc::UnboundedSender<Cmd> }

impl JsHandle {
    pub async fn builtin(&self, method: &str, args: Value) -> Result<Value, String> {
        let (tx, rx) = oneshot::channel();
        self.tx.send(Cmd::Builtin { method: method.into(), args: args.to_string(), reply: tx })
            .map_err(|_| "JS 引擎已停止".to_string())?;
        let s = rx.await.map_err(|_| "JS 引擎无响应".to_string())??;
        serde_json::from_str(&s).map_err(|e| format!("SDK 返回非 JSON: {} | {}", e, &s[..s.len().min(300)]))
    }
    pub async fn user(&self, data: Value) -> Result<Value, String> {
        let (tx, rx) = oneshot::channel();
        self.tx.send(Cmd::User { data: data.to_string(), reply: tx })
            .map_err(|_| "JS 引擎已停止".to_string())?;
        let s = rx.await.map_err(|_| "JS 引擎无响应".to_string())??;
        serde_json::from_str(&s).map_err(|e| format!("音源返回非 JSON: {} | {}", e, &s[..s.len().min(300)]))
    }
    pub async fn load_user(&self, script: String) -> Result<Value, String> {
        let (tx, rx) = oneshot::channel();
        self.tx.send(Cmd::LoadUser { script, reply: tx }).map_err(|_| "JS 引擎已停止".to_string())?;
        let s = rx.await.map_err(|_| "JS 引擎无响应".to_string())??;
        serde_json::from_str(&s).map_err(|e| e.to_string())
    }
}

fn b64safe(s: &str) -> String {
    // 把任意字符串安全嵌入 JS 单引号字面量
    s.replace('\\', "\\\\").replace('\'', "\\'").replace('\n', "\\n").replace('\r', "\\r")
}

/// 生成一次「原生 → JS」调用脚本。
/// 两个 preload 的 __lx_native__(key, action, dataJson) 第三参都要求
/// JSON 字符串（内部 JSON.parse(dataJson)）；直接内联 JS 对象字面量会被
/// JSON.parse 拒绝并返回 'Invalid data'，回推被静默丢弃（Promise 永远 pending）。
/// 因此这里统一把 Value 序列化两遍：先转 JSON 文本，再包成 JS 字符串字面量。
fn native(key: &str, action: &str, data: &Value) -> String {
    // 若 __lx_native__ 返回错误字符串（Invalid key / Invalid data / Unknown action），
    // 直接抛错，避免"eval 成功但 JS 侧啥也没做"的静默失败。
    format!(
        "(function(){{var r=globalThis.__lx_native__('{}','{}',{});if(typeof r==='string'&&r.length)throw new Error('__lx_native__ rejected: '+r);}})()",
        b64safe(key), action, json!(data.to_string())
    )
}

/// 注入某沙箱的全部 host 函数。所有闭包只捕获 Bus，不捕获 Ctx。
fn inject(ctx: &rquickjs::Ctx<'_>, bus: &Bus, sb: Sb) -> rquickjs::Result<()> {
    let g = ctx.globals();
    match sb {
        Sb::Builtin => {
            g.set("__lx_builtin_key__", bus.key_builtin.as_str())?;
            let b = bus.clone();
            g.set("__lx_native_call__", Function::new(ctx.clone(), move |_key: String, action: String, data: String| {
                parse_builtin_ev(&b, &action, &data);
            })?)?;
            g.set("__lx_active_api__", Function::new(ctx.clone(), || -> String { String::new() })?)?;
        }
        Sb::User => {
            g.set("__lx_user_key__", bus.key_user.as_str())?;
            let b = bus.clone();
            g.set("__lx_native_call__", Function::new(ctx.clone(), move |_key: String, action: String, data: String| {
                parse_user_ev(&b, &action, &data);
            })?)?;
            let b = bus.clone();
            g.set("__lx_native_call__set_timeout", Function::new(ctx.clone(), move |id: i64, ms: i64| {
                b.push(Sb::User, Ev::UserSetTimeout { id, ms: ms.max(0) as u64 });
            })?)?;
        }
    }
    // crypto utils（两个沙箱共用实现）
    macro_rules! f1 { ($name:expr, $f:expr) => {{ g.set($name, Function::new(ctx.clone(), $f)?)?; }} }
    f1!("__lx_native_call__utils_b64md5", |s: String| crypto::b64md5(&s));
    f1!("__lx_native_call__utils_str2md5", |s: String| crypto::str2md5(&s));
    f1!("__lx_native_call__utils_sha1", |s: String| crypto::sha1_hex(s.as_bytes()));
    f1!("__lx_native_call__utils_str2b64", |s: String| crypto::str2b64(&s));
    f1!("__lx_native_call__utils_b642buf", |s: String| crypto::b642buf(&s));
    f1!("__lx_native_call__utils_decode_charset", |s: String, cs: String| crypto::decode_charset(&s, &cs));
    f1!("__lx_native_call__utils_encode_charset", |s: String, cs: String| crypto::encode_charset(&s, &cs));
    f1!("__lx_native_call__utils_aes_encrypt", |d: String, k: String, i: String, m: String| {
        crypto::aes(&m, true, &d, &k, &i).unwrap_or_default()
    });
    f1!("__lx_native_call__utils_aes_decrypt", |d: String, k: String, i: String, m: String| {
        crypto::aes(&m, false, &d, &k, &i).unwrap_or_default()
    });
    f1!("__lx_native_call__utils_rsa_encrypt", |d: String, k: String, p: String| {
        crypto::rsa_no_padding(&d, &k, &p).unwrap_or_default()
    });
    Ok(())
}

fn parse_builtin_ev(b: &Bus, action: &str, data: &str) {
    let v: Value = serde_json::from_str(data).unwrap_or(Value::Null);
    let ev = match action {
        "fetch" => Ev::Fetch {
            call_id: v["callId"].as_i64().unwrap_or(0),
            url: v["url"].as_str().unwrap_or("").to_string(),
            options: serde_json::to_string(&v["options"]).unwrap_or_else(|_| "{}".into()),
        },
        "fetch_abort" => Ev::FetchAbort,
        "set_timeout" => Ev::SetTimeout { id: v["id"].as_i64().unwrap_or(0), ms: v["timeout"].as_u64().unwrap_or(0) },
        "clear_timeout" => Ev::ClearTimeout { id: v["id"].as_i64().unwrap_or(0) },
        "__lx_result__" => Ev::Result {
            ok: v["ok"].as_bool().unwrap_or(false),
            data: v["data"].as_str().map(String::from),
            error: v["error"].as_str().map(String::from),
        },
        "userApiCall" => Ev::ActiveApi, // 本服务端不走内置→自定义源转发
        _ => return,
    };
    b.push(Sb::Builtin, ev);
}

fn parse_user_ev(b: &Bus, action: &str, data: &str) {
    let v: Value = serde_json::from_str(data).unwrap_or(Value::Null);
    let ev = match action {
        "request" => Ev::Request {
            request_key: v["requestKey"].as_str().unwrap_or("").to_string(),
            url: v["url"].as_str().unwrap_or("").to_string(),
            options: serde_json::to_string(&v["options"]).unwrap_or_else(|_| "{}".into()),
        },
        "cancelRequest" => Ev::CancelRequest,
        "response" => Ev::Response {
            status: v["status"].as_bool().unwrap_or(false),
            result: if v["result"].is_null() { None } else { Some(v["result"].to_string()) },
            error: v["errorMessage"].as_str().map(String::from),
        },
        "init" => Ev::Init {
            info: if v["info"].is_null() { None } else { Some(v["info"].to_string()) },
            status: v["status"].as_bool().unwrap_or(false),
            error: v["errorMessage"].as_str().map(String::from),
        },
        "showUpdateAlert" => Ev::UpdateAlert,
        _ => return,
    };
    b.push(Sb::User, ev);
}

/// 执行 JS 侧发起的 HTTP 请求，返回对齐 preload 契约的响应 JSON
fn do_http(url: &str, options: &str, sb: Sb) -> Value {
    let v: Value = serde_json::from_str(options).unwrap_or(json!({}));
    let method = v["method"].as_str().unwrap_or("get").to_ascii_uppercase();
    let timeout = v["timeout"].as_u64().unwrap_or(15000).min(60000);
    let binary = v["binary"].as_bool().unwrap_or(false);

    let client = reqwest::blocking::Client::builder()
        .timeout(Duration::from_millis(timeout))
        .redirect(reqwest::redirect::Policy::limited(5))
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        .build();
    let client = match client { Ok(c) => c, Err(e) => return json!({"error": e.to_string()}) };

    let mut req = client.request(
        reqwest::Method::from_bytes(method.as_bytes()).unwrap_or(reqwest::Method::GET), url);

    if let Some(h) = v["headers"].as_object() {
        for (k, val) in h {
            let s = match val { Value::String(s) => s.clone(), Value::Array(a) => a.iter().filter_map(|x| x.as_str()).collect::<Vec<_>>().join(","), _ => val.to_string() };
            if let Ok(hv) = reqwest::header::HeaderValue::from_str(&s) { req = req.header(k.as_str(), hv); }
        }
    }
    // body / form / formData
    if let Some(form) = v["form"].as_object() {
        let pairs: Vec<(String, String)> = form.iter().map(|(k, x)| (k.clone(), match x { Value::String(s) => s.clone(), _ => x.to_string() })).collect();
        req = req.form(&pairs);
    } else if let Some(body) = v.get("body") {
        if !body.is_null() {
            let s = match body { Value::String(s) => s.clone(), _ => body.to_string() };
            req = req.body(s);
            if v["headers"].get("Content-Type").is_none() && v["headers"].get("content-type").is_none() {
                req = req.header("Content-Type", "application/json");
            }
        }
    }

    let resp = match req.send() {
        Ok(r) => r,
        Err(e) => return json!({"error": e.to_string()}),
    };
    let status = resp.status().as_u16();
    let ok = resp.status().is_success();
    let final_url = resp.url().to_string();
    let mut headers = serde_json::Map::new();
    for (k, val) in resp.headers().iter() {
        headers.insert(k.as_str().to_ascii_lowercase(), json!(val.to_str().unwrap_or("")));
    }
    let content_type = headers.get("content-type").and_then(|x| x.as_str()).unwrap_or("").to_string();
    let bytes = match resp.bytes() { Ok(b) => b.to_vec(), Err(e) => return json!({"error": e.to_string()}) };

    match sb {
        Sb::Builtin => json!({
            "statusCode": status, "ok": ok, "url": final_url,
            "headers": Value::Object(headers), "contentType": content_type,
            "bodyText": if binary { Value::Null } else { json!(String::from_utf8_lossy(&bytes).to_string()) },
            "bodyB64": if binary { json!(crypto::b64e(&bytes)) } else { Value::Null },
            "bodySize": bytes.len(),
        }),
        Sb::User => {
            let text = String::from_utf8_lossy(&bytes).to_string();
            let body = if binary { json!(crypto::b64e(&bytes)) }
                       else { serde_json::from_str::<Value>(&text).unwrap_or(json!(text)) };
            json!({
                "statusCode": status, "statusMessage": "",
                "headers": Value::Object(headers), "body": body,
            })
        }
    }
}

/// 通用事件循环：入口 eval 后，反复推进 job + 处理事件，直到命中终止条件
fn drive(
    bus: &Bus,
    rt: &Runtime,
    ctxs: &mut Sandboxes,
    entry: Sb,
    entry_script: String,
    stop: Stop,
    timeout_ms: u64,
) -> Result<String, String> {
    ctxs.eval(entry, &entry_script).map_err(|e| format!("JS 入口执行失败: {}", e))?;
    tracing::debug!("JS 入口已执行: {}", &entry_script[..entry_script.len().min(200)]);
    let deadline = Instant::now() + Duration::from_millis(timeout_ms);
    let mut timers: Vec<(Instant, Sb, i64)> = Vec::new();

    loop {
        // 1) 驱动 Promise 链（用 Runtime 版本以便捕获被吞掉的异常）
        for _ in 0..1000 {
            match rt.execute_pending_job() {
                Ok(true) => continue,
                Ok(false) => break,
                Err(e) => {
                    let msg = e.0.with(|c| {
                        let v = c.catch();
                        let _ = c.globals().set("__tmp_err", v);
                        c.eval::<String, _>("String((__tmp_err && (__tmp_err.stack || __tmp_err.message)) || __tmp_err)")
                            .unwrap_or_else(|_| "unknown".into())
                    });
                    tracing::debug!("JS job 异常: {}", msg);
                    break;
                }
            }
        }
        // 2) 到期定时器
        let now = Instant::now();
        let due: Vec<(Sb, i64)> = timers.iter().filter(|(t, _, _)| *t <= now).map(|(_, s, id)| (*s, *id)).collect();
        timers.retain(|(t, _, _)| *t > now);
        for (sb, id) in due {
            let script = match sb {
                Sb::Builtin => native(bus.key(sb), "set_timeout", &json!({ "id": id })),
                Sb::User => native(bus.key(sb), "__set_timeout__", &json!(id)),
            };
            if let Err(e) = ctxs.eval(sb, &script) { tracing::debug!("定时器回推失败: {}", e); }
        }
        // 3) 处理 host 事件
        let evs = bus.drain();
        if !evs.is_empty() { tracing::debug!("事件: {:?}", evs.iter().map(|(s,e)| format!("{:?}:{:?}", s, e)).collect::<Vec<_>>()); }
        for (sb, ev) in evs {
            match ev {
                Ev::Fetch { call_id, url, options } => {
                    let payload = do_http(&url, &options, Sb::Builtin);
                    tracing::debug!("HTTP 完成 status={} url={}", payload["statusCode"], url);
                    let is_err = payload.get("error").is_some();
                    let data = if is_err { json!({"callId": call_id, "ok": false, "error": payload["error"]}) }
                               else { json!({"callId": call_id, "ok": true, "data": payload}) };
                    let s = native(bus.key(sb), "fetch_result", &data);
                    match ctxs.eval(sb, &s) { Ok(()) => tracing::debug!("fetch_result 回推成功"), Err(e) => tracing::debug!("fetch_result 回推失败: {} | {}", e, &s[..s.len().min(300)]) }
                }
                Ev::Request { request_key, url, options } => {
                    let payload = do_http(&url, &options, Sb::User);
                    let (error, response) = if payload.get("error").is_some() {
                        (json!(payload["error"].as_str().unwrap_or("request failed")), Value::Null)
                    } else { (Value::Null, payload) };
                    let data = json!({"requestKey": request_key, "error": error, "response": response});
                    let s = native(bus.key(sb), "response", &data);
                    if let Err(e) = ctxs.eval(sb, &s) { tracing::debug!("response 回推失败: {} | {}", e, &s[..s.len().min(300)]); }
                }
                Ev::SetTimeout { id, ms } => timers.push((Instant::now() + Duration::from_millis(ms.min(30000)), sb, id)),
                Ev::UserSetTimeout { id, ms } => timers.push((Instant::now() + Duration::from_millis(ms.min(30000)), sb, id)),
                Ev::ClearTimeout { id } => timers.retain(|(_, _, x)| *x != id),
                Ev::FetchAbort | Ev::CancelRequest | Ev::ActiveApi | Ev::UpdateAlert => {}
                Ev::Result { ok, data, error } => {
                    return match &stop {
                        Stop::BuiltinResult => if ok { Ok(data.unwrap_or_else(|| "null".into())) }
                                               else { Err(error.unwrap_or_else(|| "SDK 调用失败".into())) },
                        _ => Ok(data.unwrap_or_else(|| "null".into())),
                    };
                }
                Ev::Response { status, result, error } => {
                    if let Stop::UserResult = &stop {
                        return if status { Ok(result.unwrap_or_else(|| "null".into())) }
                               else { Err(error.unwrap_or_else(|| "音源脚本调用失败".into())) };
                    }
                }
                Ev::Init { info, status, error } => {
                    if let Stop::Init = &stop {
                        return if status { Ok(info.unwrap_or_else(|| "{}".into())) }
                               else { Err(error.unwrap_or_else(|| "音源初始化失败".into())) };
                    }
                }
            }
        }
        if Instant::now() > deadline { return Err(format!("JS 调用超时 ({}ms)", timeout_ms)); }
        std::thread::sleep(Duration::from_millis(2));
    }
}

enum Stop { BuiltinResult, UserResult, Init }

/// 持有两个 Context。user 可重建（脚本切换时 preload 冻结了全局）。
struct Sandboxes { builtin: Context, user: Option<Context> }
impl Sandboxes {
    fn eval(&self, sb: Sb, script: &str) -> Result<(), String> {
        let c = match sb { Sb::Builtin => Some(&self.builtin), Sb::User => self.user.as_ref() };
        match c {
            Some(c) => c.with(|cc| cc.eval::<(), _>(script.to_string())).map_err(|e| e.to_string()),
            None => Err("用户音源沙箱未加载".into()),
        }
    }
}

pub fn spawn() -> anyhow::Result<(JsHandle, std::thread::JoinHandle<()>)> {
    let (tx, mut rx) = mpsc::unbounded_channel::<Cmd>();
    // 只读资产由 build.rs 编译期内嵌；缺失直接 fail-fast，不静默降级
    let js = |name: &str| -> anyhow::Result<String> {
        crate::assets::js(name).map(str::to_string)
            .ok_or_else(|| anyhow::anyhow!("缺少内嵌 JS 资产: {}", name))
    };
    let preload_b = js("builtin-sdk-preload.js")?;
    let sdk = js("music-sdk.js")?;
    let preload_u = js("user-api-preload.js")?;
    let polyfill = js("polyfill.js")?;

    let handle = std::thread::spawn(move || {
        let rt = match Runtime::new() { Ok(r) => r, Err(e) => { eprintln!("QuickJS Runtime 创建失败: {}", e); return; } };
        let bus = Bus {
            q: Arc::new(Mutex::new(VecDeque::new())),
            key_builtin: Arc::new(uuid::Uuid::new_v4().simple().to_string()),
            key_user: Arc::new(uuid::Uuid::new_v4().simple().to_string()),
        };
        let builtin = Context::full(&rt).unwrap();
        builtin.with(|c| {
            inject(&c, &bus, Sb::Builtin).unwrap();
            c.eval::<(), _>(polyfill.as_str()).unwrap();
            c.eval::<(), _>(preload_b.as_str()).unwrap();
            c.eval::<(), _>(sdk.as_str()).unwrap();
        });
        tracing::info!("内置 music-sdk.js 已加载");
        let mut ctxs = Sandboxes { builtin, user: None };

        while let Some(cmd) = rx.blocking_recv() {
            let result: Result<String, String> = match cmd {
                Cmd::Builtin { method, args, reply } => {
                    let script = format!("globalThis.__lx_builtin_call__('{}',{})", b64safe(&method), json!(args));
                    let r = drive(&bus, &rt, &mut ctxs, Sb::Builtin, script, Stop::BuiltinResult, 60_000);
                    let _ = reply.send(r.clone()); r
                }
                Cmd::User { data, reply } => {
                    if ctxs.user.is_none() {
                        let r = Err("未导入或未启用任何音源脚本".into()); let _ = reply.send(r.clone()); r
                    } else {
                        let rk = uuid::Uuid::new_v4().simple().to_string();
                        let inner = json!({"requestKey": rk, "data": serde_json::from_str::<Value>(&data).unwrap_or(json!({}))});
                        let script = native(bus.key(Sb::User), "request", &inner);
                        let r = drive(&bus, &rt, &mut ctxs, Sb::User, script, Stop::UserResult, 45_000);
                        let _ = reply.send(r.clone()); r
                    }
                }
                Cmd::LoadUser { script, reply } => {
                    let r = (|| -> Result<String, String> {
                        // 重建 user context（preload 冻结全局，无法在同一 context 二次注入）
                        ctxs.user = None;
                        let c = Context::full(&rt).map_err(|e| e.to_string())?;
                        c.with(|cc| {
                            inject(&cc, &bus, Sb::User).unwrap();
                            cc.eval::<(), _>(polyfill.as_str()).unwrap();
                            cc.eval::<(), _>(preload_u.as_str()).unwrap();
                        });
                        ctxs.user = Some(c);
                        let init = drive(&bus, &rt, &mut ctxs, Sb::User, script, Stop::Init, 10_000)?;
                        Ok(init)
                    })();
                    let _ = reply.send(r.clone()); r
                }
            };
            if let Err(e) = &result { tracing::debug!("JS 调用失败: {}", e); }
        }
        // 显式清理，避免 quickjs drop 断言
        ctxs.user = None;
        drop(bus);
    });
    Ok((JsHandle { tx }, handle))
}
