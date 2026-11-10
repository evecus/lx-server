//! 自定义音源脚本的持久化：<data_dir>/scripts/*.js + sources.json
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use md5::{Digest, Md5};
use std::path::PathBuf;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum AddOutcome { Added, Updated, Duplicate }

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SourceItem {
    pub id: String,
    pub name: String,
    pub description: String,
    pub version: String,
    pub author: String,
    pub homepage: String,
    pub enabled: bool,
    pub sources: Vec<String>,
    pub owner: String,
    pub filename: String,
    #[serde(default)]
    pub source_url: String,
}

#[derive(Clone)]
pub struct SourceStore { dir: PathBuf }

fn meta_field(script: &str, key: &str) -> String {
    // 从 /*! @name xxx */ 头部注释提取
    let head = script.split("*/").next().unwrap_or("");
    for line in head.lines() {
        let t = line.trim().trim_start_matches('*').trim();
        if let Some(rest) = t.strip_prefix(&format!("@{}", key)) {
            return rest.trim().to_string();
        }
    }
    String::new()
}

impl SourceStore {
    pub fn new(dir: PathBuf) -> anyhow::Result<Self> {
        std::fs::create_dir_all(&dir)?;
        let s = Self { dir };
        if !s.meta_path().exists() { s.write(&[])?; }
        Ok(s)
    }
    fn meta_path(&self) -> PathBuf { self.dir.join("sources.json") }
    pub fn list(&self) -> Vec<SourceItem> {
        std::fs::read_to_string(self.meta_path()).ok()
            .and_then(|s| serde_json::from_str::<Vec<SourceItem>>(&s).ok()).unwrap_or_default()
    }
    fn write(&self, items: &[SourceItem]) -> anyhow::Result<()> {
        std::fs::write(self.meta_path(), serde_json::to_string_pretty(items)?)?; Ok(())
    }
    pub fn enabled_script(&self) -> Option<(SourceItem, String)> {
        for it in self.list() {
            if it.enabled {
                if let Some(s) = std::fs::read_to_string(self.dir.join(&it.filename)).ok() {
                    return Some((it, s));
                }
            }
        }
        None
    }

    pub fn metadata(script: &str) -> Value {
        let mut name = meta_field(script, "name");
        if name.is_empty() { name = "未命名音源".to_string(); }
        let mut homepage = meta_field(script, "homepage");
        if homepage.is_empty() { homepage = meta_field(script, "repository"); }
        json!({
            "name": name,
            "description": meta_field(script, "description"),
            "version": meta_field(script, "version"),
            "author": meta_field(script, "author"),
            "homepage": homepage,
        })
    }

    /// 落盘 + 更新索引，带去重：
    /// - 脚本内容完全相同 → 不新增，沿用已有条目（需要启用时切换为启用），返回 Duplicate
    /// - 来源 URL 相同但内容不同 → 原地更新该条目的脚本与元数据，返回 Updated
    /// - 其余 → 新增，返回 Added
    pub fn add(&self, script: &str, source_url: &str, sources: &[String], enable: bool) -> anyhow::Result<(String, AddOutcome)> {
        let m = Self::metadata(script);
        let mut items = self.list();
        let digest = |s: &str| hex::encode(Md5::digest(s.as_bytes()));
        let new_hash = digest(script);

        let same_content = items.iter().position(|x| {
            std::fs::read_to_string(self.dir.join(&x.filename)).map(|c| digest(&c) == new_hash).unwrap_or(false)
        });
        let same_url = if source_url.is_empty() { None }
            else { items.iter().position(|x| x.source_url == source_url) };

        let (idx, outcome) = match (same_content, same_url) {
            (Some(i), _) => {
                // 重复项：若原条目没有来源 URL，补记，后续同 URL 出新版本时即可原地更新
                if items[i].source_url.is_empty() && !source_url.is_empty() {
                    items[i].source_url = source_url.to_string();
                }
                (i, AddOutcome::Duplicate)
            }
            (None, Some(i)) => {
                std::fs::write(self.dir.join(&items[i].filename), script)?;
                let x = &mut items[i];
                x.name = m["name"].as_str().unwrap_or("").to_string();
                x.description = m["description"].as_str().unwrap_or("").to_string();
                x.version = m["version"].as_str().unwrap_or("").to_string();
                x.author = m["author"].as_str().unwrap_or("").to_string();
                x.homepage = m["homepage"].as_str().unwrap_or("").to_string();
                x.sources = sources.to_vec();
                (i, AddOutcome::Updated)
            }
            (None, None) => {
                let id = format!("{}.js", uuid::Uuid::new_v4().simple());
                std::fs::write(self.dir.join(&id), script)?;
                items.push(SourceItem {
                    id: id.clone(),
                    name: m["name"].as_str().unwrap_or("").to_string(),
                    description: m["description"].as_str().unwrap_or("").to_string(),
                    version: m["version"].as_str().unwrap_or("").to_string(),
                    author: m["author"].as_str().unwrap_or("").to_string(),
                    homepage: m["homepage"].as_str().unwrap_or("").to_string(),
                    enabled: false,
                    sources: sources.to_vec(),
                    owner: "open".into(),
                    filename: id,
                    source_url: source_url.to_string(),
                });
                (items.len() - 1, AddOutcome::Added)
            }
        };
        if enable { // 单活动源
            for (i, x) in items.iter_mut().enumerate() { x.enabled = i == idx; }
        }
        let id = items[idx].id.clone();
        self.write(&items)?;
        Ok((id, outcome))
    }

    pub fn set_enabled(&self, id: &str, enabled: bool) -> anyhow::Result<()> {
        let mut items = self.list();
        if enabled { for x in items.iter_mut() { x.enabled = false; } }
        for x in items.iter_mut() { if x.id == id { x.enabled = enabled; } }
        self.write(&items)?; Ok(())
    }
    pub fn remove(&self, id: &str) -> anyhow::Result<()> {
        let mut items = self.list();
        if let Some(it) = items.iter().find(|x| x.id == id) {
            let _ = std::fs::remove_file(self.dir.join(&it.filename));
        }
        items.retain(|x| x.id != id);
        self.write(&items)?; Ok(())
    }
    pub fn reorder(&self, ids: &[String]) -> anyhow::Result<()> {
        let mut items = self.list();
        items.sort_by_key(|x| ids.iter().position(|i| i == &x.id).unwrap_or(usize::MAX));
        self.write(&items)?; Ok(())
    }
    pub fn enrich(&self) -> Vec<Value> {
        self.list().into_iter().map(|s| {
            let meta = std::fs::metadata(self.dir.join(&s.filename)).ok();
            let size = meta.as_ref().map(|m| m.len()).unwrap_or(0);
            let upload_time = meta.and_then(|m| m.modified().ok())
                .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
                .map(|d| d.as_millis() as u64).unwrap_or(0);
            json!({
            "size": size, "uploadTime": upload_time, "supportedSources": s.sources,
            "id": s.id, "name": s.name, "description": s.description,
            "version": s.version, "author": s.author, "homepage": s.homepage,
            "enabled": s.enabled, "sources": s.sources, "owner": s.owner,
            "status": if s.enabled { "success" } else { "disabled" },
            "sourceUrl": s.source_url,
        })}).collect()
    }
}
