// Foundry HQ — Tauri shell.
//
// This binary is intentionally thin. All application logic (reading and
// writing chapters, notes, tags, progress, settings) lives in the React/TS
// frontend and talks to SQLite through @tauri-apps/plugin-sql, which is
// registered below with its migrations. There is no hand-written Rust
// command layer for CRUD here on purpose: tauri-plugin-sql already gives
// the frontend safe, parameterized `select`/`execute` access scoped by the
// capabilities file, so a duplicate Rust wrapper would just be more surface
// area to keep in sync for no real benefit. If a feature later needs logic
// that must run on the Rust side (e.g. file system access for the planned
// Attachments module), add a `commands/` module then — see docs/ROADMAP.md.

use tauri_plugin_sql::{Migration, MigrationKind};

fn migrations() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "init schema (chapters, notes, tags, note_tags, progress, settings, notes_fts)",
        sql: include_str!("migrations/0001_init.sql"),
        kind: MigrationKind::Up,
    }]
}

fn main() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:foundry.db", migrations())
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running Foundry HQ");
}
