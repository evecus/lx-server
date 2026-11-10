mod assets;
mod config;
mod crypto;
mod js_engine;
mod server;
mod sources;

use std::path::PathBuf;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::try_from_default_env()
            .unwrap_or_else(|_| "lx_rs=info".into()))
        .init();

    // 只读资产（Web 前端 + QuickJS 引擎）由 build.rs 编译期内嵌，运行时无需磁盘。
    // data/ 只保留运行时需要读写的文件：配置、自定义音源脚本、用户数据、缓存。
    let data = PathBuf::from(std::env::var("DATA_PATH").unwrap_or_else(|_| "data".into()));
    std::fs::create_dir_all(data.join("users"))?;
    std::fs::create_dir_all(data.join("cache"))?;
    let cfg = config::Config::load(&data)?;
    let data = cfg.data_path();
    for d in ["scripts", "users", "cache"] {
        std::fs::create_dir_all(data.join(d))?;
    }

    // 内嵌资产自检（fail-fast，编译期已保证存在，这里只防打包遗漏）
    if assets::web("music/index.html").is_none() || assets::js("music-sdk.js").is_none() {
        anyhow::bail!("内嵌资产不完整，请确认 assets/ 目录已随源码一同编译");
    }

    let (js, _worker) = js_engine::spawn()?;
    let sources = sources::SourceStore::new(data.join("scripts"))?;

    // 启动时加载已启用的音源（若有），让首播无需等待
    if let Some((item, script)) = sources.enabled_script() {
        match js.load_user(script).await {
            Ok(_) => tracing::info!("已加载音源: {} ({})", item.name, item.id),
            Err(e) => tracing::warn!("音源 {} 加载失败: {}", item.name, e),
        }
    } else {
        tracing::info!("尚未启用音源，可在 Web 界面导入");
    }

    let http = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(60))
        .redirect(reqwest::redirect::Policy::limited(5))
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36")
        .build()?;

    let st = server::AppState {
        cfg: std::sync::Arc::new(cfg.clone()),
        js, sources,
        data: std::sync::Arc::new(data.clone()),
        http,
    };
    let app = server::router(st);
    let addr = format!("{}:{}", cfg.server.bind_ip, cfg.server.port);
    let listener = tokio::net::TcpListener::bind(&addr).await
        .map_err(|e| anyhow::anyhow!("监听 {} 失败: {}", addr, e))?;
    tracing::info!("lx-rs 已启动: http://{}  (数据目录: {})", addr, data.display());
    tracing::info!("Web 播放器: http://127.0.0.1:{}/music/", cfg.server.port);
    axum::serve(listener, app).await?;
    Ok(())
}
