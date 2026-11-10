mod assets;
mod config;
mod crypto;
mod js_engine;
mod server;
mod sources;

use std::path::PathBuf;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // 命令行：lx-server [-c <config.toml>]。不带 -c 时完全使用内置默认配置，不读取也不生成配置文件
    let mut cfg_path: Option<PathBuf> = None;
    let mut args = std::env::args().skip(1);
    while let Some(a) = args.next() {
        match a.as_str() {
            "-c" | "--config" => {
                cfg_path = Some(PathBuf::from(args.next()
                    .ok_or_else(|| anyhow::anyhow!("{} 需要指定配置文件路径", a))?));
            }
            "-h" | "--help" => {
                println!("用法: lx-server [-c <config.toml>]\n  -c, --config  配置文件路径；不指定则全部使用默认配置（端口 9527、数据目录 ./data、无密码）");
                return Ok(());
            }
            other => anyhow::bail!("未知参数: {}（用 -h 查看用法）", other),
        }
    }

    // Web 前端 + QuickJS 引擎资产由 build.rs 编译期内嵌，运行时只需要这一个二进制。
    // 数据目录（自定义音源、用户数据、缓存）由配置指定，启动时自动创建。
    let cfg = config::Config::load(cfg_path.as_deref())?;
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::try_from_default_env()
            .unwrap_or_else(|_| format!("lx_server={}", cfg.server.log_level).into()))
        .init();
    let data = cfg.data_path();
    for d in ["scripts", "users", "cache"] {
        std::fs::create_dir_all(data.join(d))
            .map_err(|e| anyhow::anyhow!("创建数据目录 {} 失败: {}", data.join(d).display(), e))?;
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
        sessions: Default::default(),
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
