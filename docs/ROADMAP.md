# The Foundry HQ — Feature Roadmap

Phases correspond to the Design Bible chapters. Each is described as a
"done when" test so there's no ambiguity about when a phase ships.

## Phase 0 — Current (shipped)
- Explorable building directory with 11 chapters
- Chapter reader with full Design Bible content
- Living-manifesto note capture per chapter
- FTS5-backed Recall with tag filtering
- Progress tracking (explored ring)
- Continue where you left off
- Fully offline, SQLite persistence
- Cottagecore design, ADHD-friendly UX

## Phase 1 — Constitution Editor
Chapter content is already stored as editable data in SQLite (sections_json).
Done when: a user can open any chapter and edit its section text, with changes
persisting and reflected everywhere.

## Phase 2 — Organizational Health Dashboard
New page rendering the health metrics from Chapter 8 as real, editable gauges.
Done when: a user can track and update Innovation / Collaboration / Burnout Risk
etc. as actual numbers over time, with a simple chart of each over weeks.

## Phase 3 — Knowledge Graph
Nodes and edges table added to the schema. Notes can be linked to other notes
and to chapter sections. Done when: a node can be opened and its connections
traversed, Obsidian-style.

## Phase 4 — AI Assistant (Jarvis v0)
A Tauri Rust command issues API calls server-side (key never in renderer).
The assistant can answer questions about your captured notes and the Design
Bible content. Done when: natural-language query returns a cited answer from
local content.

## Phase 5 — Daily Journal
A dated journal entry per day, tagged to chapters or free. Done when: entries
persist, appear in Recall search, and can be filtered by date range.

## Phase 6 — Cross-linked Notes
Notes can reference other notes. Done when: "related notes" appears on a
NoteCard and clicking one opens it.

## Phase 7 — Cloud Sync
User chooses a sync provider (Dropbox path, iCloud Drive, or self-hosted).
The local SQLite file is the source of truth; sync is a one-way export/import
on demand. Done when: database can be exported and imported on a second machine
without data loss.

## Phase 8 — Themes
Light cottagecore (current), dark cottagecore, and a user-importable theme
JSON. Done when: the active theme can be switched at runtime without a rebuild.

## Phase 9 — Plugin API
External scripts can register new panels and new search providers. Done when:
a toy plugin can add a sidebar panel with its own persistence.
