# The Foundry HQ

> *The operating system for autonomous organizations.*

A production-grade desktop app built with **Tauri + React + TypeScript + SQLite** that serves as the permanent, explorable home for [The Foundry Design Bible](docs/DESIGN_BIBLE.md).

---

## Why Tauri and not Electron?

Tauri shells a Webview (system WebKit/WebView2) around the React frontend rather than bundling a full Chromium instance. For a personal productivity app this means:

| | Tauri | Electron |
|---|---|---|
| Binary size | ~8–20 MB | ~150–200 MB |
| RAM at rest | ~30–50 MB | ~100–200 MB |
| Cold start | fast | slower |
| Offline | ✓ | ✓ |

The tradeoff: Tauri requires the Rust toolchain to build (one-time setup). Once installed, `npm run tauri dev` and `npm run tauri build` work the same as any Vite project.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| Rust / cargo | stable (latest) |
| System WebView | macOS: pre-installed · Windows: WebView2 pre-installed on Win11 · Linux: `libwebkit2gtk-4.1` |

Install Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

---

## Setup

```bash
# 1. Install JS deps
npm install

# 2. Add self-hosted fonts (required for fully offline operation)
#    See src/assets/fonts/README.md

# 3. Start dev server + native window
npm run tauri dev

# 4. Build a distributable binary
npm run tauri build
```

The first `tauri dev` run compiles the Rust shell (~2–4 min). Subsequent runs are fast.

---

## Architecture

```
foundry-hq/
├── src-tauri/           # Rust shell (Tauri + SQLite plugin + migrations)
│   ├── src/
│   │   ├── main.rs                  # Entry point — registers SQL plugin & migrations
│   │   └── migrations/
│   │       └── 0001_init.sql        # Full schema (chapters, notes, tags, FTS5 index)
│   └── tauri.conf.json
│
└── src/                 # React frontend
    ├── app/             # QueryClient setup + initialization hook
    ├── components/
    │   ├── ui/          # Design-system primitives (Card, Button, Input, …)
    │   └── layout/      # Header, NavTabs, ToastStack, ErrorBoundary
    ├── data/            # chapters.seed.ts — Design Bible content (seeded once on first launch)
    ├── features/
    │   ├── headquarters/   # HQ view: building directory, resume card
    │   ├── chapter-reader/ # Chapter reading + note capture
    │   ├── notes/          # Notes API, NoteCard, CRUD hooks
    │   └── recall/         # Search + tag filter + FTS-backed Recall view
    ├── hooks/           # Shared: debounce, keyboard shortcuts
    ├── lib/             # db.ts (connection + queries + toFtsQuery), utils.ts
    ├── pages/           # HQPage, ChapterReaderPage, RecallPage
    ├── stores/          # Zustand: ephemeral UI state (toasts) only
    ├── styles/          # globals.css (Tailwind + @font-face)
    └── types/           # Shared TS types for all DB entities
```

### Storage strategy

The database is a single SQLite file (`foundry.db`) in the app's local data directory. The schema has one feature specifically designed for recall at scale:

**FTS5 full-text index** (`notes_fts`) — a virtual table kept in sync with `notes` via INSERT/UPDATE/DELETE triggers. Recall search queries this index rather than scanning note bodies with LIKE, so search time grows with the size of the inverted index (logarithmic) instead of the number of rows (linear).

Tag filtering is a normalized join (`note_tags`), not a text scan, so combining a tag filter with a search term is two fast index operations, not one slow text scan.

---

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Jump to Recall, focus search |
| `⌘Enter` / `Ctrl+Enter` | Save note in composer |

---

## Expanding the app

The architecture was deliberately designed to accept these features without structural refactoring. See `docs/ROADMAP.md` for the full plan.

- **Organizational Health Dashboard** — new feature folder, new page, same SQLite DB
- **Constitution Editor** — chapter content is stored as editable data in SQLite, not hardcoded in source, for exactly this reason
- **AI Assistant** — Tauri's command layer + a Rust-side API call keeps the key out of the renderer
- **Knowledge Graph** — add a `nodes` + `edges` table to the existing schema
- **Cloud Sync** — add a sync plugin; the SQLite schema is already normalized and portable
- **Themes** — Tailwind custom theme is already centralized in `tailwind.config.ts`

---

## Design system

Palette, typography, and design token decisions are in `docs/DESIGN.md` and `tailwind.config.ts`.

The app targets the *cottagecore* aesthetic: cream base, warm terracotta, sage, gold, lavender. No corporate blues. No pure white or black. Rounded corners everywhere. The design intention is a calm, polished tool that doesn't feel like a dashboard.

---

## License

Personal use.
