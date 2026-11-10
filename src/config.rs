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
        Self { name: "lx-rs".into(), bind_ip: "0.0.0.0".into(), port: 9527, data_dir: "data".into() }
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
    /// fail-fast：文件存在但内容非法时直接报错，不静默降级
    pub fn load(data_dir: &Path) -> anyhow::Result<Self> {
        let p = data_dir.join("config.toml");
        let mut cfg = if p.exists() {
            let text = std::fs::read_to_string(&p)
                .map_err(|e| anyhow::anyhow!("读取配置 {} 失败: {}", p.display(), e))?;
            toml::from_str::<Config>(&text)
                .map_err(|e| anyhow::anyhow!("配置 {} 解析失败: {}", p.display(), e))?
        } else {
            let c = Config::default();
            std::fs::write(&p, toml::to_string_pretty(&c)?)
                .map_err(|e| anyhow::anyhow!("写入默认配置失败: {}", e))?;
            c
        };
        if let Ok(v) = std::env::var("PORT") {
            cfg.server.port = v.parse().map_err(|_| anyhow::anyhow!("PORT 必须是数字"))?;
        }
        if let Ok(v) = std::env::var("BIND_IP") { cfg.server.bind_ip = v; }
        if let Ok(v) = std::env::var("DATA_PATH") { cfg.server.data_dir = v; }
        if let Ok(v) = std::env::var("PLAYER_PASSWORD") { cfg.auth.password = v; }
        if let Ok(v) = std::env::var("OUTBOUND_PROXY") { cfg.proxy.outbound = v; }
        Ok(cfg)
    }

    /// 配置了密码即启用认证
    pub fn auth_enabled(&self) -> bool { !self.auth.password.is_empty() }

    pub fn data_path(&self) -> PathBuf { PathBuf::from(&self.server.data_dir) }
}
