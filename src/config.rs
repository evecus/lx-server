use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct Config {
    pub server: ServerConfig,
    pub auth: AuthConfig,
    pub proxy: ProxyConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct ServerConfig {
    pub name: String,
    pub bind_ip: String,
    pub port: u16,
    pub data_dir: String,
    /// 日志等级：off / error / warn / info / debug / trace
    pub log_level: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct AuthConfig {
    /// 唯一的访问密码（/music/login），留空表示不启用认证
    pub password: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct ProxyConfig {
    /// 出口代理，例如 socks5://127.0.0.1:1080，留空直连
    pub outbound: String,
    /// 反向代理下真实 IP 的请求头
    pub real_ip_header: String,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            server: ServerConfig::default(),
            auth: AuthConfig::default(),
            proxy: ProxyConfig::default(),
        }
    }
}
impl Default for ServerConfig {
    fn default() -> Self {
        Self { name: "lx-rs".into(), bind_ip: "0.0.0.0".into(), port: 9527, data_dir: "data".into(), log_level: "info".into() }
    }
}
impl Default for AuthConfig {
    fn default() -> Self {
        Self { password: String::new() }
    }
}
impl Default for ProxyConfig {
    fn default() -> Self {
        Self { outbound: String::new(), real_ip_header: "x-real-ip".into() }
    }
}

impl Config {
    /// 加载配置。`path` 为 None 时完全使用内置默认值（不读取、不生成任何配置文件）；
    /// 指定了路径但文件不存在或内容非法则直接报错。
    /// 返回的 `server.data_dir` 已解析为最终路径：
    /// 指定配置文件时相对路径以配置文件所在目录为基准，否则以当前目录为基准。
    pub fn load(path: Option<&Path>) -> anyhow::Result<Self> {
        let mut cfg = match path {
            Some(p) => {
                let text = std::fs::read_to_string(p)
                    .map_err(|e| anyhow::anyhow!("读取配置 {} 失败: {}", p.display(), e))?;
                toml::from_str::<Config>(&text)
                    .map_err(|e| anyhow::anyhow!("配置 {} 解析失败: {}", p.display(), e))?
            }
            None => Config::default(),
        };
        if let Ok(v) = std::env::var("PORT") {
            cfg.server.port = v.parse().map_err(|_| anyhow::anyhow!("PORT 必须是数字"))?;
        }
        if let Ok(v) = std::env::var("BIND_IP") { cfg.server.bind_ip = v; }
        if let Ok(v) = std::env::var("PLAYER_PASSWORD") { cfg.auth.password = v; }
        if let Ok(v) = std::env::var("OUTBOUND_PROXY") { cfg.proxy.outbound = v; }
        if let Ok(v) = std::env::var("LOG_LEVEL") { cfg.server.log_level = v; }
        cfg.server.log_level = cfg.server.log_level.trim().to_ascii_lowercase();
        if !["off", "error", "warn", "info", "debug", "trace"].contains(&cfg.server.log_level.as_str()) {
            anyhow::bail!("log_level 无效: {}（可选 off/error/warn/info/debug/trace）", cfg.server.log_level);
        }

        // 数据目录：DATA_PATH 环境变量（相对当前目录）优先，否则按配置文件所在目录解析
        let data = if let Ok(v) = std::env::var("DATA_PATH") {
            PathBuf::from(v)
        } else {
            let d = PathBuf::from(&cfg.server.data_dir);
            match path {
                Some(p) if !d.is_absolute() => p.parent().unwrap_or_else(|| Path::new("")).join(d),
                _ => d,
            }
        };
        cfg.server.data_dir = data.to_string_lossy().into_owned();
        Ok(cfg)
    }

    /// 配置了密码即启用认证
    pub fn auth_enabled(&self) -> bool { !self.auth.password.is_empty() }

    pub fn data_path(&self) -> PathBuf { PathBuf::from(&self.server.data_dir) }
}
