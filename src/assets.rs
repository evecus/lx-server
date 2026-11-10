//! 只读资产访问层：Web 前端 + QuickJS 引擎资产由 build.rs 编译期内嵌。
//! 运行时不读取磁盘，数据目录（由配置指定）只保留需要读写的音源、用户数据与缓存。
include!(concat!(env!("OUT_DIR"), "/embedded_assets.rs"));

/// 按 URL 路径（不含前导 `/`）取内嵌前端文件，例如 `music/index.html`。
pub fn web(path: &str) -> Option<&'static [u8]> {
    WEB.iter().find(|(k, _)| *k == path).map(|(_, v)| *v)
}

/// 按文件名取内嵌 JS 资产，例如 `music-sdk.js`。
pub fn js(name: &str) -> Option<&'static str> {
    JS.iter().find(|(k, _)| *k == name).map(|(_, v)| *v)
}

/// 按扩展名推断 Content-Type（字体/音频/wav 需要正确 MIME 才能加载）。
pub fn mime(path: &str) -> &'static str {
    let ext = path.rsplit('.').next().unwrap_or("").to_ascii_lowercase();
    match ext.as_str() {
        "html" | "htm" => "text/html; charset=utf-8",
        "js" | "mjs" => "application/javascript; charset=utf-8",
        "css" => "text/css; charset=utf-8",
        "json" | "map" => "application/json; charset=utf-8",
        "svg" => "image/svg+xml",
        "png" => "image/png",
        "jpg" | "jpeg" => "image/jpeg",
        "gif" => "image/gif",
        "ico" => "image/x-icon",
        "woff2" => "font/woff2",
        "woff" => "font/woff",
        "ttf" => "font/ttf",
        "wav" => "audio/wav",
        "mp3" => "audio/mpeg",
        "webmanifest" => "application/manifest+json",
        "md" | "txt" => "text/plain; charset=utf-8",
        _ => "application/octet-stream",
    }
}
