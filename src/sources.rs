//! 自定义音源脚本的持久化：<data_dir>/scripts/*.js + sources.json
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::path::PathBuf;

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

    /// 落盘 + 更新索引。返回 id。
    pub fn add(&self, script: &str, source_url: &str, sources: &[String], enable: bool) -> anyhow::Result<String> {
        let m = Self::metadata(script);
        let id = format!("{}.js", uuid::Uuid::new_v4().simple());
        std::fs::write(self.dir.join(&id), script)?;
        let item = SourceItem {
            id: id.clone(),
            name: m["name"].as_str().unwrap_or("").to_string(),
            description: m["description"].as_str().unwrap_or("").to_string(),
            version: m["version"].as_str().unwrap_or("").to_string(),
            author: m["author"].as_str().unwrap_or("").to_string(),
            homepage: m["homepage"].as_str().unwrap_or("").to_string(),
            enabled: enable,
            sources: sources.to_vec(),
            owner: "open".into(),
            filename: id.clone(),
            source_url: source_url.to_string(),
        };
        let mut items = self.list();
        if enable { for x in items.iter_mut() { x.enabled = false; } } // 单活动源
        items.push(item);
        self.write(&items)?;
        Ok(id)
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
        self.list().into_iter().map(|s| json!({
            "id": s.id, "name": s.name, "description": s.description,
            "version": s.version, "author": s.author, "homepage": s.homepage,
            "enabled": s.enabled, "sources": s.sources, "owner": s.owner,
            "status": if s.enabled { "success" } else { "disabled" },
            "sourceUrl": s.source_url,
        })).collect()
    }
}
