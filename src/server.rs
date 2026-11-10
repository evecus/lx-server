//! HTTP 服务：复用 lx-music-server 前端契约，后端全部由 Rust 实现。
use crate::{config::Config, js_engine::JsHandle, sources::{AddOutcome, SourceStore}};
use axum::{
    body::Body, extract::{Query, Request, State}, http::{header, HeaderMap, StatusCode},
    middleware::{self, Next},
    response::{IntoResponse, Redirect, Response}, routing::{get, post}, Json, Router,
};
use futures::StreamExt;
use serde_json::{json, Value};
use std::{collections::{HashMap, HashSet}, path::PathBuf, sync::{Arc, Mutex, OnceLock}};

#[derive(Clone)]
pub struct AppState {
    pub cfg: Arc<Config>,
    pub js: JsHandle,
    pub sources: SourceStore,
    pub data: Arc<PathBuf>,
    pub http: reqwest::Client,
    /// 已登录会话 token（内存保存，重启后需重新登录）
    pub sessions: Arc<Mutex<HashSet<String>>>,
}

type R = Result<Json<Value>, (StatusCode, Json<Value>)>;
fn ok(v: Value) -> R { Ok(Json(v)) }
fn err(s: impl Into<String>) -> (StatusCode, Json<Value>) {
    (StatusCode::OK, Json(json!({"error": s.into(), "code": 500})))
}
fn bad(s: impl Into<String>) -> (StatusCode, Json<Value>) {
    (StatusCode::BAD_REQUEST, Json(json!({"error": s.into()})))
}

pub fn router(st: AppState) -> Router {
    Router::new()
        // ---------- 动态配置（前端 window.CONFIG 依赖） ----------
        .route("/js/config.js", get(dynamic_config))
        // ---------- 播放器核心 ----------
        .route("/api/music/config", get(music_config))
        .route("/api/music/auth", post(auth_login))
        .route("/api/music/auth/verify", get(auth_verify))
        .route("/api/music/auth/logout", post(auth_logout))
        .route("/api/music/search", get(music_search))
        .route("/api/music/tipSearch", get(music_tip_search))
        .route("/api/music/hotSearch", get(music_hot_search))
        .route("/api/music/url", post(music_url))
        .route("/api/music/lyric", get(music_lyric_get).post(music_lyric_post))
        // ---------- 封面：kw/kg 搜索结果不带封面，需调用 SDK getPic 单独解析 ----------
        .route("/api/music/pic", get(music_pic_get).post(music_pic_post))
        .route("/api/music/cover", get(music_cover))
        .route("/api/music/songList/tags", get(songlist_tags))
        .route("/api/music/songList/list", get(songlist_list))
        .route("/api/music/songList/detail", get(songlist_detail))
        .route("/api/music/songList/search", get(songlist_search))
        .route("/api/music/leaderboard/boards", get(leaderboard_boards))
        .route("/api/music/leaderboard/list", get(leaderboard_list))
        .route("/api/music/comment", post(music_comment))
        .route("/api/music/progress", get(music_progress))
        .route("/api/music/download", get(music_download))
        // ---------- 自定义音源 ----------
        .route("/api/custom-source/validate", post(source_validate))
        .route("/api/custom-source/import", post(source_import))
        .route("/api/custom-source/upload", post(source_upload))
        .route("/api/custom-source/list", get(source_list))
        .route("/api/custom-source/toggle", post(source_toggle))
        .route("/api/custom-source/delete", post(source_delete))
        .route("/api/custom-source/reorder", post(source_reorder))
        // ---------- 用户设置 ----------
        .route("/api/user/settings", get(user_settings_get).post(user_settings_post))
        .route("/api/user/verify", post(user_verify))
        .route("/api/user/list", get(user_list).post(user_list_post))
        .route("/api/music/user/list/remove", post(user_list_remove))
        // ---------- 服务端缓存（最小实现，避免前端报错） ----------
        .route("/api/music/cache/config", post(cache_stub))
        .route("/api/music/cache/check", get(cache_check))
        .route("/api/music/cache/stats", get(cache_stats))
        .route("/api/music/cache/list", get(cache_list))
        .route("/api/music/cache/download", post(cache_stub))
        .route("/api/music/cache/stop", post(cache_stub))
        .route("/api/music/cache/clear", post(cache_stub))
        .route("/api/music/cache/remove", post(cache_stub))
        .route("/api/music/cache/lyric", get(cache_lyric).post(cache_stub))
        .route("/api/music/cache/lyric/clear", post(cache_stub))
        .route("/api/music/cache/progress", get(cache_progress))
        .route("/api/music/cache/cover", get(cache_cover))
        .route("/api/music/cache/file/{id}", get(cache_file))
        // ---------- 服务发现 ----------
        .route("/hello", get(|| async { "Hello~::^-^::~v4~" }))
        .route("/id", get(|| async { "OjppZDo6lx-rs" }))
        // ---------- 静态资源：全部来自编译期内嵌资产，/js/config.js 由上面的动态路由优先处理 ----------
        .route("/", get(|| async { axum::response::Redirect::temporary("/music/") }))
        .route("/music/login", get(|| async { serve_embedded("music/login.html") }))
        .fallback(serve_static)
        .layer(middleware::from_fn_with_state(st.clone(), auth_guard))
        .with_state(st)
}

/// 内嵌静态资源服务：URL 路径即内嵌 key，目录补 index.html。
async fn serve_static(uri: axum::http::Uri) -> Response {
    let raw = uri.path().trim_start_matches('/');
    let key = if raw.is_empty() || raw.ends_with('/') {
        format!("{raw}index.html")
    } else {
        raw.to_string()
    };
    serve_embedded(&key)
}

fn serve_embedded(key: &str) -> Response {
    match crate::assets::web(key) {
        Some(bytes) => (
            [(header::CONTENT_TYPE, crate::assets::mime(key))],
            axum::body::Bytes::from_static(bytes),
        ).into_response(),
        None => (StatusCode::NOT_FOUND, "not found").into_response(),
    }
}

// ============================ 配置/鉴权 ============================
async fn dynamic_config(State(st): State<AppState>) -> Response {
    let c = &st.cfg;
    let body = format!("window.CONFIG = {};", json!({
        "version": "v1.0.0-rs", "buildHash": "rust", "serverName": c.server.name,
        "disableTelemetry": true, "proxy.enabled": !c.proxy.real_ip_header.is_empty(),
        "user.enablePath": false, "user.enableRoot": true,
        "user.enablePublicRestriction": false, "maxSnapshotNum": 10,
        "list.addMusicLocationType": "top", "player.enableAuth": c.auth_enabled(),
        "port": c.server.port, "bindIP": c.server.bind_ip,
    }));
    ([(header::CONTENT_TYPE, "application/javascript; charset=utf-8"),
      (header::CACHE_CONTROL, "no-cache, no-store, must-revalidate")], body).into_response()
}

async fn music_config(State(st): State<AppState>) -> R {
    ok(json!({"player.enableAuth": st.cfg.auth_enabled(), "user.enablePublicRestriction": false}))
}

const COOKIE_NAME: &str = "lx_session";

fn cookie_token(headers: &HeaderMap) -> Option<String> {
    let raw = headers.get(header::COOKIE)?.to_str().ok()?;
    raw.split(';').filter_map(|kv| kv.trim().split_once('='))
        .find(|(k, _)| *k == COOKIE_NAME).map(|(_, v)| v.to_string())
}
fn is_authed(st: &AppState, headers: &HeaderMap) -> bool {
    if !st.cfg.auth_enabled() { return true; }
    cookie_token(headers).map(|t| st.sessions.lock().unwrap().contains(&t)).unwrap_or(false)
}

/// 全站唯一的登录校验：只认 /music/login 的访问密码，生成的 cookie 会话。
/// 未登录时：API 返回 401，页面入口跳转登录页；登录页及其静态资源放行。
async fn auth_guard(State(st): State<AppState>, req: Request, next: Next) -> Response {
    if !st.cfg.auth_enabled() || is_authed(&st, req.headers()) {
        return next.run(req).await;
    }
    let path = req.uri().path();
    let open = path == "/music/login"
        || path == "/api/music/config"
        || path == "/api/music/auth"
        || path == "/api/music/auth/verify"
        || path == "/api/music/auth/logout"
        || path == "/js/config.js"
        || path == "/hello" || path == "/id";
    if open { return next.run(req).await; }
    if path.starts_with("/api/") {
        return (StatusCode::UNAUTHORIZED, Json(json!({"error": "未登录", "code": 401}))).into_response();
    }
    if path == "/" || path == "/music" || path == "/music/" || path == "/music/index.html" {
        return Redirect::temporary("/music/login").into_response();
    }
    next.run(req).await // 登录页依赖的静态资源（css/js/字体/logo）
}

async fn auth_login(State(st): State<AppState>, body: String) -> Response {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    if !st.cfg.auth_enabled() {
        return Json(json!({"success": true})).into_response();
    }
    let pass = v["password"].as_str().unwrap_or("");
    if !pass.is_empty() && pass == st.cfg.auth.password {
        let token = format!("{}{}", uuid::Uuid::new_v4().simple(), uuid::Uuid::new_v4().simple());
        st.sessions.lock().unwrap().insert(token.clone());
        let cookie = format!("{COOKIE_NAME}={token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000");
        ([(header::SET_COOKIE, cookie)], Json(json!({"success": true}))).into_response()
    } else {
        (StatusCode::UNAUTHORIZED, Json(json!({"success": false, "error": "密码错误"}))).into_response()
    }
}
async fn auth_verify(State(st): State<AppState>, headers: HeaderMap) -> R {
    let ok_ = is_authed(&st, &headers);
    ok(json!({"success": ok_, "valid": ok_, "authenticated": ok_}))
}
async fn auth_logout(State(st): State<AppState>, headers: HeaderMap) -> Response {
    if let Some(t) = cookie_token(&headers) { st.sessions.lock().unwrap().remove(&t); }
    let cookie = format!("{COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
    ([(header::SET_COOKIE, cookie)], Json(json!({"success": true}))).into_response()
}

// ============================ 内置 SDK 调用 ============================
fn qs(m: &HashMap<String, String>, k: &str, d: &str) -> String {
    m.get(k).cloned().filter(|s| !s.is_empty()).unwrap_or_else(|| d.into())
}
fn qi(m: &HashMap<String, String>, k: &str, d: i64) -> i64 {
    m.get(k).and_then(|s| s.parse().ok()).unwrap_or(d)
}

async fn music_search(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    let name = qs(&q, "name", "");
    if name.is_empty() { return Err(bad("Missing name")); }
    let args = json!({"source": qs(&q, "source", "kw"), "keyword": name,
                      "page": qi(&q, "page", 1), "limit": qi(&q, "limit", 20)});
    let data = st.js.builtin("search", args).await.map_err(err)?;
    ok(Value::Array(data["list"].as_array().cloned().unwrap_or_default()))
}
async fn music_tip_search(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    let args = json!({"source": qs(&q, "source", "kw"), "keyword": qs(&q, "name", "")});
    ok(st.js.builtin("tipSearch", args).await.map_err(err)?)
}
async fn music_hot_search(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    ok(st.js.builtin("hotSearch", json!({"source": qs(&q, "source", "kw")})).await.map_err(err)?)
}

/// 核心：播放链接。优先自定义音源（musicUrl action），失败回退内置 SDK。
async fn music_url(State(st): State<AppState>, headers: HeaderMap, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let song = &v["songInfo"];
    let quality = v["quality"].as_str().unwrap_or("128k").to_string();
    let source = song["source"].as_str().unwrap_or("").to_string();
    if source.is_empty() { return Err(bad("Invalid songInfo")); }

    let mut attempts: Vec<Value> = Vec::new();
    // 1) 自定义音源
    if let Some((item, _)) = st.sources.enabled_script() {
        let supported = item.sources.is_empty() || item.sources.contains(&source);
        if supported {
            let call = json!({"source": source, "action": "musicUrl",
                              "info": {"musicInfo": song, "type": quality}});
            match st.js.user(call).await {
                Ok(res) => {
                    // preload 返回 {source, action, data:{type,url}}
                    let d = &res["data"];
                    let url = d["url"].as_str().or_else(|| res["url"].as_str()).unwrap_or("");
                    if url.starts_with("http") {
                        return ok(json!({"url": url, "type": d["type"].as_str().unwrap_or(&quality),
                                         "sourceName": item.name, "attempts": attempts}));
                    }
                    attempts.push(json!({"name": item.name, "status": "fail", "message": "未返回有效链接"}));
                }
                Err(e) => attempts.push(json!({"name": item.name, "status": "fail", "message": e})),
            }
        }
    }
    // 2) 内置 SDK 兜底
    match st.js.builtin("musicUrl", json!({"source": source, "musicInfo": song, "type": quality})).await {
        Ok(res) => {
            let url = res["url"].as_str().unwrap_or("");
            if url.starts_with("http") {
                return ok(json!({"url": url, "type": quality, "sourceName": "内置SDK", "attempts": attempts}));
            }
        }
        Err(e) => attempts.push(json!({"name": "内置SDK", "status": "fail", "message": e})),
    }
    let _ = headers;
    // 没有启用任何自定义音源：给出明确提示，前端据此直接停止，不再降音质/换源/切歌
    if st.sources.enabled_script().is_none() {
        return Err(err("未导入或未启用任何音源脚本"));
    }
    Err(err(format!("未找到 {} 平台的可用播放链接", source)))
}

fn lyric_songinfo(q: &HashMap<String, String>) -> Value {
    let source = qs(q, "source", "kw");
    let mut id = qs(q, "songmid", "");
    if id.is_empty() { id = qs(q, "songId", ""); }
    if id.is_empty() { id = qs(q, "id", ""); }
    let pfx = format!("{}_", source);
    if id.starts_with(&pfx) { id = id[pfx.len()..].to_string(); }
    json!({"source": source, "songmid": id, "id": id, "name": qs(q, "name", ""),
           "singer": qs(q, "singer", ""), "hash": qs(q, "hash", ""),
           "albumId": qs(q, "albumId", ""), "interval": qs(q, "interval", "")})
}
async fn music_lyric_get(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    let si = lyric_songinfo(&q);
    ok(st.js.builtin("lyric", json!({"source": si["source"], "musicInfo": si})).await.map_err(err)?)
}
async fn music_lyric_post(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    ok(st.js.builtin("lyric", json!({"source": v["source"], "musicInfo": v["songInfo"]})).await.map_err(err)?)
}
async fn songlist_tags(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    let source = qs(&q, "source", "kw");
    let tags = st.js.builtin("songListTags", json!({"source": source})).await.map_err(err)?;
    ok(json!({"tags": tags, "sortList": []}))
}
async fn songlist_list(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    ok(st.js.builtin("songList", json!({"source": qs(&q, "source", "kw"),
        "sortId": qs(&q, "sortId", ""), "tagId": qs(&q, "tagId", ""), "page": qi(&q, "page", 1)})).await.map_err(err)?)
}
async fn songlist_detail(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    ok(st.js.builtin("songListDetail", json!({"source": qs(&q, "source", "kw"),
        "id": qs(&q, "id", ""), "page": qi(&q, "page", 1)})).await.map_err(err)?)
}
async fn songlist_search(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    // SDK 未暴露独立 search 方法，用内置 search 近似
    ok(st.js.builtin("search", json!({"source": qs(&q, "source", "kw"),
        "keyword": qs(&q, "text", ""), "page": qi(&q, "page", 1), "limit": 20})).await.map_err(err)?)
}
async fn leaderboard_boards(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    ok(st.js.builtin("getBoards", json!({"source": qs(&q, "source", "kw")})).await.map_err(err)?)
}
async fn leaderboard_list(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    ok(st.js.builtin("boardList", json!({"source": qs(&q, "source", "kw"),
        "id": qs(&q, "bangid", ""), "page": qi(&q, "page", 1)})).await.map_err(err)?)
}
async fn music_comment(State(_st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    ok(json!({"list": [], "total": 0, "source": v["source"]}))
}

// ============================ SSE 进度 ============================
async fn music_progress() -> Response {
    // 前端 EventSource 只用于展示解析进度，返回保持连接的空流即可
    let stream: futures::stream::Chain<
        futures::stream::Once<std::future::Ready<Result<axum::body::Bytes, std::io::Error>>>,
        futures::stream::Pending<Result<axum::body::Bytes, std::io::Error>>,
    > = futures::stream::once(std::future::ready(
        Ok::<_, std::io::Error>(axum::body::Bytes::from_static(b": connected\n\n"))
    )).chain(futures::stream::pending());
    ([(header::CONTENT_TYPE, "text/event-stream"),
      (header::CACHE_CONTROL, "no-cache")], Body::from_stream(stream)).into_response()
}

// ============================ 流式代理（播放核心） ============================
async fn music_download(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>, headers: HeaderMap) -> Response {
    let url = match q.get("url") { Some(u) if u.starts_with("http") => u.clone(), _ => return (StatusCode::BAD_REQUEST, "missing url").into_response() };
    let mut req = st.http.get(&url);
    if let Some(r) = headers.get(header::RANGE).and_then(|x| x.to_str().ok()) {
        req = req.header(header::RANGE, r);
    }
    if let Some(r) = headers.get(header::REFERER).and_then(|x| x.to_str().ok()) {
        req = req.header(header::REFERER, r);
    }
    let resp = match req.send().await {
        Ok(r) => r,
        Err(e) => return (StatusCode::BAD_GATEWAY, format!("upstream: {}", e)).into_response(),
    };
    let status = StatusCode::from_u16(resp.status().as_u16()).unwrap_or(StatusCode::OK);
    let mut b = Response::builder().status(status);
    for h in ["content-type", "content-length", "content-range", "accept-ranges", "content-disposition", "cache-control"] {
        if let Some(v) = resp.headers().get(h).and_then(|x| x.to_str().ok()) {
            b = b.header(h, v);
        }
    }
    if resp.headers().get(header::CONTENT_TYPE).is_none() { b = b.header(header::CONTENT_TYPE, "audio/mpeg"); }
    match b.body(Body::from_stream(resp.bytes_stream())) {
        Ok(r) => r,
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response(),
    }
}

// ============================ 封面解析（对齐 FMusic 的 getPic） ============================
// kw/kg 的搜索结果里 img 恒为 null，封面必须调用 SDK 的 getPic 单独获取。
// FMusic 的 PlayViewModel 正是走 jsController.pic → SDK getPic 这条链路；
// lx-server 之前完全没有暴露 pic 能力，所以酷狗/酷我封面一直显示占位图。
// 这里补上 pic 接口，并提供同源图片代理：CDN 返回的是 http 图片，
// 由服务端取回转成同源响应，避免浏览器 mixed-content/防盗链导致加载失败。
static PIC_CACHE: OnceLock<Mutex<HashMap<String, Option<String>>>> = OnceLock::new();
fn pic_cache() -> &'static Mutex<HashMap<String, Option<String>>> {
    PIC_CACHE.get_or_init(|| Mutex::new(HashMap::new()))
}

/// 从歌曲对象里取现成的封面 URL（兼容 SDK 原始字段与标准化 meta 字段）
fn direct_pic(song: &Value) -> Option<String> {
    for k in ["picUrl", "img", "pic", "picture"] {
        if let Some(s) = song.get(k).and_then(|x| x.as_str()) {
            if s.starts_with("http") { return Some(s.trim().to_string()); }
        }
    }
    for p in ["/meta/picUrl", "/meta/img", "/meta/pic", "/album/picUrl", "/album/img", "/al/picUrl", "/al/img"] {
        if let Some(s) = song.pointer(p).and_then(|x| x.as_str()) {
            if s.starts_with("http") { return Some(s.trim().to_string()); }
        }
    }
    None
}

/// SDK / 自定义音源的 pic 结果可能是裸 URL 字符串，也可能是 {url: ...}
fn pic_from_result(v: &Value) -> Option<String> {
    match v {
        Value::String(s) if s.starts_with("http") => Some(s.clone()),
        Value::Object(_) => pic_from_result(&v["url"]),
        _ => None,
    }
}

fn pick_str(v: &Value, keys: &[&str]) -> String {
    for k in keys {
        let x = v.get(*k).or_else(|| v.get("meta").and_then(|m| m.get(*k)));
        if let Some(x) = x {
            match x {
                Value::String(s) if !s.is_empty() && s != "null" => return s.clone(),
                Value::Number(n) => return n.to_string(),
                _ => {}
            }
        }
    }
    String::new()
}

/// 把前端传来的稀疏歌曲信息补齐成 SDK getPic 需要的 musicInfo。
/// kg 需要 hash / albumId / songmid / audioId / name / singer，kw 需要 songmid；
/// 标准化后的歌曲 id 形如 `kw_118990` 或 `339589_<hash>`，需要还原。
fn normalize_song(song: &Value) -> Value {
    let source = pick_str(song, &["source"]).to_ascii_lowercase();
    let mut songmid = pick_str(song, &["songmid", "songId", "musicId", "id"]);
    let mut hash = pick_str(song, &["hash"]);
    if let Some(rest) = songmid.strip_prefix("kw_") { songmid = rest.to_string(); }
    if source == "kg" && songmid.contains('_') {
        let mut it = songmid.splitn(2, '_');
        let a = it.next().unwrap_or("").to_string();
        let b = it.next().unwrap_or("").to_string();
        songmid = a;
        if hash.is_empty() { hash = b; }
    }
    if source == "kg" && songmid.len() == 32 && hash.is_empty() { hash = songmid.clone(); }
    let audio_id = {
        let a = pick_str(song, &["audioId"]);
        if a.is_empty() && source == "kg" && songmid.len() == 32 { songmid.clone() } else { a }
    };
    json!({
        "source": source,
        "songmid": songmid,
        "id": songmid,
        "hash": hash,
        "albumId": pick_str(song, &["albumId", "albumMid"]),
        "audioId": audio_id,
        "name": pick_str(song, &["name"]),
        "singer": pick_str(song, &["singer"]),
        "albumName": pick_str(song, &["albumName"]),
    })
}

/// 解析封面 URL：现成字段 → 内置 SDK getPic → 自定义音源 pic action（失败兜底）。
/// 结果按 source|songmid|hash 缓存，避免同一首歌在列表/播放页/队列里反复占用 JS 引擎。
async fn resolve_pic_url(st: &AppState, song: &Value) -> Option<String> {
    if let Some(u) = direct_pic(song) { return Some(u); }
    let song = normalize_song(song);
    let source = song["source"].as_str().unwrap_or("").to_string();
    if source.is_empty() { return None; }
    let key = format!("{}|{}|{}", source,
        song["songmid"].as_str().unwrap_or(""), song["hash"].as_str().unwrap_or(""));
    if let Some(hit) = pic_cache().lock().unwrap().get(&key) { return hit.clone(); }

    let mut url = match st.js.builtin("pic", json!({"source": source, "musicInfo": song})).await {
        Ok(v) => pic_from_result(&v),
        Err(e) => { tracing::debug!("SDK getPic 失败 ({}): {}", source, e); None }
    };
    // 自定义音源也注册了 pic action 时兜底，等价于 FMusic 的 user_api 转发
    if url.is_none() {
        if let Some((item, _)) = st.sources.enabled_script() {
            let supported = item.sources.is_empty() || item.sources.contains(&source);
            if supported {
                // 音源未注册 pic 时脚本可能一直不回结果，限定 8s 避免拖慢封面加载
                let call = st.js.user(json!({"source": source, "action": "pic", "info": song}));
                match tokio::time::timeout(std::time::Duration::from_secs(8), call).await {
                    Ok(Ok(res)) => url = pic_from_result(&res["data"]).or_else(|| pic_from_result(&res)),
                    Ok(Err(e)) => tracing::debug!("自定义音源 pic 失败 ({}): {}", source, e),
                    Err(_) => tracing::debug!("自定义音源 pic 超时 ({})", source),
                }
            }
        }
    }
    let url = url.filter(|u| u.starts_with("http"));
    if let Some(u) = &url {
        let mut c = pic_cache().lock().unwrap();
        if c.len() > 2000 { c.clear(); }
        c.insert(key, Some(u.clone()));
    }
    url
}

/// GET 参数（/api/music/cover 与 /api/music/pic 的 GET 形式共用）
fn cover_query_song(q: &HashMap<String, String>) -> Value {
    let mut m = serde_json::Map::new();
    // 只接受歌曲标识字段：不接受任意 picUrl/img，避免该路由被当作开放代理 (SSRF)
    for k in ["source", "songmid", "id", "hash", "albumId", "audioId", "name", "singer", "albumName"] {
        if let Some(v) = q.get(k) {
            if !v.is_empty() { m.insert(k.to_string(), json!(v)); }
        }
    }
    Value::Object(m)
}

/// 返回封面 URL（JSON），对齐 FMusic 的 pic 结果语义（裸字符串 / {url}）
async fn music_pic_get(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> R {
    let song = cover_query_song(&q);
    match resolve_pic_url(&st, &song).await {
        Some(u) => ok(json!({"url": u})),
        None => ok(json!({"url": Value::Null, "error": "封面获取失败"})),
    }
}
async fn music_pic_post(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let mut song = v.get("musicInfo").or_else(|| v.get("songInfo")).cloned().unwrap_or_else(|| v.clone());
    if !song.is_object() { song = json!({}); }
    if song.get("source").and_then(|x| x.as_str()).unwrap_or("").is_empty() {
        if let Some(s) = v["source"].as_str() { song["source"] = json!(s); }
    }
    match resolve_pic_url(&st, &song).await {
        Some(u) => ok(json!({"url": u})),
        None => ok(json!({"url": Value::Null, "error": "封面获取失败"})),
    }
}

fn logo_response() -> Response {
    let svg: &[u8] = crate::assets::web("music/assets/logo.svg").unwrap_or(
        b"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"128\" height=\"128\"></svg>");
    ([(header::CONTENT_TYPE, "image/svg+xml".to_string()),
      (header::CACHE_CONTROL, "public, max-age=3600".to_string())], svg.to_vec()).into_response()
}

/// 同源图片代理：解析出封面 URL 后由服务端取回字节流，
/// 浏览器只访问本站地址，彻底规避 http 图片的 mixed-content 与 CDN 防盗链问题。
async fn music_cover(State(st): State<AppState>, Query(q): Query<HashMap<String, String>>) -> Response {
    let url = match resolve_pic_url(&st, &cover_query_song(&q)).await {
        Some(u) => u,
        None => return logo_response(),
    };
    let resp = match st.http.get(&url)
        .header(header::USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36")
        .header(header::ACCEPT, "image/avif,image/webp,image/apng,image/*,*/*;q=0.8")
        .send().await {
        Ok(r) => r,
        Err(e) => { tracing::debug!("封面下载失败 {}: {}", url, e); return logo_response(); }
    };
    if !resp.status().is_success() { return logo_response(); }
    let ct = resp.headers().get(header::CONTENT_TYPE).and_then(|v| v.to_str().ok())
        .filter(|s| s.starts_with("image/")).unwrap_or("image/jpeg").to_string();
    let bytes = match resp.bytes().await { Ok(b) => b.to_vec(), Err(_) => return logo_response() };
    if bytes.is_empty() { return logo_response(); }
    ([(header::CONTENT_TYPE, ct),
      (header::CACHE_CONTROL, "public, max-age=86400".to_string())], bytes).into_response()
}

// ============================ 自定义音源管理 ============================
async fn validate_script(st: &AppState, script: &str) -> Result<Value, String> {
    let meta = SourceStore::metadata(script);
    let info = st.js.load_user(script.to_string()).await.map_err(|e| e)?;
    let sources: Vec<String> = info["sources"].as_object().map(|m| m.keys().cloned().collect()).unwrap_or_default();
    if sources.is_empty() { return Err("脚本没有注册任何音源".into()); }
    // 恢复当前启用的脚本，避免 validate 把活动源顶掉
    reload_active(st).await;
    Ok(json!({"valid": true, "metadata": meta, "sources": sources, "sourcesCount": sources.len()}))
}
async fn reload_active(st: &AppState) {
    match st.sources.enabled_script() {
        Some((_, s)) => { let _ = st.js.load_user(s).await; }
        None => { let _ = st.js.unload_user().await; }
    }
}
/// 前端传 sourceId，兼容旧的 id
fn source_id(v: &Value) -> String {
    v["sourceId"].as_str().or_else(|| v["id"].as_str()).unwrap_or("").to_string()
}
async fn source_validate(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let script = v["script"].as_str().unwrap_or("");
    match validate_script(&st, script).await {
        Ok(x) => ok(x),
        Err(e) => ok(json!({"valid": false, "error": e, "metadata": SourceStore::metadata(script)})),
    }
}
async fn source_upload(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let script = v["content"].as_str().unwrap_or("");
    if script.is_empty() { return Err(bad("脚本内容为空")); }
    let info = match validate_script(&st, script).await {
        Ok(x) => x,
        Err(e) => { reload_active(&st).await; return ok(json!({"success": false, "error": e})); }
    };
    let sources: Vec<String> = serde_json::from_value(info["sources"].clone()).unwrap_or_default();
    match st.sources.add(script, "", &sources, true) {
        Ok((id, o)) => { reload_active(&st).await; ok(json!({"success": true, "id": id, "duplicate": o == AddOutcome::Duplicate, "updated": o == AddOutcome::Updated, "metadata": info["metadata"], "supportedSources": sources, "owner": "open"})) }
        Err(e) => ok(json!({"success": false, "error": e.to_string()})),
    }
}
async fn source_import(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    // 支持直接给 content，或给 url 由服务端下载（GitHub/Gitee blob 自动转直链）
    let (script, url) = if let Some(c) = v["content"].as_str() {
        (c.to_string(), String::new())
    } else {
        let raw = v["url"].as_str().unwrap_or("");
        let u = normalize_script_url(raw);
        let resp = st.http.get(&u).header("User-Agent", "Mozilla/5.0").send().await
            .map_err(|e| bad(format!("下载脚本失败: {}", e)))?;
        if !resp.status().is_success() { return Err(bad(format!("下载失败 HTTP {}", resp.status()))); }
        (resp.text().await.map_err(|e| bad(e.to_string()))?, u)
    };
    if script.is_empty() { return Err(bad("脚本内容为空")); }
    let info = match validate_script(&st, &script).await {
        Ok(x) => x,
        Err(e) => { reload_active(&st).await; return ok(json!({"success": false, "error": e})); }
    };
    let sources: Vec<String> = serde_json::from_value(info["sources"].clone()).unwrap_or_default();
    match st.sources.add(&script, &url, &sources, true) {
        Ok((id, o)) => { reload_active(&st).await; ok(json!({"success": true, "duplicate": o == AddOutcome::Duplicate, "updated": o == AddOutcome::Updated, "filename": info["metadata"]["name"], "id": id, "metadata": info["metadata"], "supportedSources": sources, "owner": "open"})) }
        Err(e) => ok(json!({"success": false, "error": e.to_string()})),
    }
}
fn normalize_script_url(raw: &str) -> String {
    let u = raw.trim();
    let u = if u.starts_with("http") { u.to_string() } else { format!("https://{}", u) };
    let gh = regex_lite(&u, "github.com");
    if gh {
        if u.contains("/blob/") { return u.replacen("github.com", "raw.githubusercontent.com", 1).replace("/blob/", "/"); }
        if u.contains("/raw/") { return u.replacen("github.com", "raw.githubusercontent.com", 1).replace("/raw/", "/"); }
    }
    if u.contains("gitee.com") && u.contains("/blob/") { return u.replace("/blob/", "/raw/"); }
    u
}
fn regex_lite(s: &str, pat: &str) -> bool { s.contains(pat) }

async fn source_list(State(st): State<AppState>) -> R { ok(Value::Array(st.sources.enrich())) }
async fn source_toggle(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let id = source_id(&v);
    let enabled = v["enabled"].as_bool().unwrap_or(true);
    if !st.sources.list().iter().any(|x| x.id == id) {
        return ok(json!({"success": false, "error": "音源不存在"}));
    }
    let prev = st.sources.list();
    if let Err(e) = st.sources.set_enabled(&id, enabled) {
        return ok(json!({"success": false, "error": e.to_string()}));
    }
    if enabled {
        // 启用：加载脚本，失败则回滚到启用前的状态
        let script = st.sources.enabled_script().map(|(_, s)| s).unwrap_or_default();
        if let Err(e) = st.js.load_user(script).await {
            let _ = st.sources.restore(prev);
            reload_active(&st).await;
            return ok(json!({"success": false, "error": format!("音源加载失败: {}", e)}));
        }
    } else {
        reload_active(&st).await;
    }
    ok(json!({"success": true, "enabled": enabled}))
}
async fn source_delete(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let id = source_id(&v);
    if !st.sources.list().iter().any(|x| x.id == id) {
        return ok(json!({"success": false, "error": "音源不存在"}));
    }
    match st.sources.remove(&id) {
        Ok(_) => { reload_active(&st).await; ok(json!({"success": true})) }
        Err(e) => ok(json!({"success": false, "error": e.to_string()})),
    }
}
async fn source_reorder(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let ids: Vec<String> = v["sourceIds"].as_array().or_else(|| v["ids"].as_array())
        .map(|a| a.iter().filter_map(|x| x.as_str().map(String::from)).collect()).unwrap_or_default();
    let _ = st.sources.reorder(&ids);
    ok(json!({"success": true}))
}

// ============================ 用户设置 ============================
fn user_file(st: &AppState, name: &str) -> PathBuf { st.data.join("users").join(name) }
async fn read_json(p: PathBuf, default: Value) -> Value {
    tokio::fs::read_to_string(p).await.ok().and_then(|s| serde_json::from_str(&s).ok()).unwrap_or(default)
}
async fn write_json(p: PathBuf, v: &Value) -> anyhow::Result<()> {
    if let Some(d) = p.parent() { tokio::fs::create_dir_all(d).await?; }
    tokio::fs::write(p, serde_json::to_string_pretty(v)?).await?; Ok(())
}
async fn user_settings_get(State(st): State<AppState>) -> R { ok(read_json(user_file(&st, "settings.json"), json!({})).await) }
async fn user_settings_post(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let _ = write_json(user_file(&st, "settings.json"), &v).await;
    ok(json!({"success": true}))
}
async fn user_verify() -> R { ok(json!({"success": true, "username": "default"})) }
async fn user_list(State(st): State<AppState>) -> R { ok(read_json(user_file(&st, "lists.json"), json!([])).await) }
async fn user_list_post(State(st): State<AppState>, body: String) -> R {
    let v: Value = serde_json::from_str(&body).unwrap_or(json!({}));
    let _ = write_json(user_file(&st, "lists.json"), &v).await;
    ok(json!({"success": true}))
}
async fn user_list_remove() -> R { ok(json!({"success": true})) }

// ============================ 缓存 stub ============================
async fn cache_stub() -> R { ok(json!({"success": true})) }
async fn cache_check() -> R { ok(json!({"cached": false})) }
async fn cache_stats() -> R { ok(json!({"totalSize": 0, "count": 0, "lyricCount": 0})) }
async fn cache_list() -> R { ok(json!([])) }
async fn cache_lyric() -> R { ok(json!({"lyric": ""})) }
async fn cache_progress() -> R { ok(json!({"progress": 100})) }
async fn cache_cover() -> R { ok(json!({})) }
async fn cache_file() -> Response { (StatusCode::NOT_FOUND, "no cache").into_response() }
