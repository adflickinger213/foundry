-- Foundry HQ — initial schema
--
-- Design notes on why this shape was chosen (the part that matters for
-- "recall doesn't slow down" at real scale):
--
-- 1. notes is a plain table. chapter_id and created_at are both indexed,
--    because the two most common reads are "notes for this chapter" and
--    "notes in recency order".
-- 2. notes_fts is a SQLite FTS5 virtual table kept in sync with notes via
--    triggers. Full-text search runs against this index, not a LIKE scan
--    over notes.body — that's what keeps Recall fast at tens of thousands
--    of rows instead of just thousands.
-- 3. tags are normalized into their own table with a note_tags join table,
--    rather than a comma-separated string on notes. That keeps tag
--    filtering an indexed join instead of a text scan, and keeps tag
--    renames/merges (a likely future feature) a one-row update.
-- 4. chapters and progress are tables, not hardcoded JS, on purpose — the
--    planned Constitution Editor will need chapter content to be editable
--    data, not source code.

CREATE TABLE IF NOT EXISTS chapters (
  id            INTEGER PRIMARY KEY,
  num           INTEGER NOT NULL UNIQUE,
  room          TEXT NOT NULL,
  title         TEXT NOT NULL,
  blurb         TEXT NOT NULL,
  accent        TEXT NOT NULL,
  sections_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  preview    TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notes_chapter  ON notes(chapter_id);
CREATE INDEX IF NOT EXISTS idx_notes_created  ON notes(created_at DESC);

CREATE TABLE IF NOT EXISTS tags (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);

CREATE TABLE IF NOT EXISTS note_tags (
  note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  tag_id  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_note_tags_tag ON note_tags(tag_id);

CREATE TABLE IF NOT EXISTS progress (
  chapter_id  INTEGER PRIMARY KEY REFERENCES chapters(id) ON DELETE CASCADE,
  explored_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Full-text index over note content. `content='notes', content_rowid='id'`
-- makes this an "external content" FTS table: it stores no text of its own,
-- just the search index, and is kept in sync by the triggers below. This
-- keeps the database smaller and writes cheap.
CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts USING fts5(
  body,
  preview,
  content='notes',
  content_rowid='id'
);

CREATE TRIGGER IF NOT EXISTS notes_after_insert AFTER INSERT ON notes BEGIN
  INSERT INTO notes_fts(rowid, body, preview)
  VALUES (new.id, new.body, new.preview);
END;

CREATE TRIGGER IF NOT EXISTS notes_after_delete AFTER DELETE ON notes BEGIN
  INSERT INTO notes_fts(notes_fts, rowid, body, preview)
  VALUES ('delete', old.id, old.body, old.preview);
END;

CREATE TRIGGER IF NOT EXISTS notes_after_update AFTER UPDATE ON notes BEGIN
  INSERT INTO notes_fts(notes_fts, rowid, body, preview)
  VALUES ('delete', old.id, old.body, old.preview);
  INSERT INTO notes_fts(rowid, body, preview)
  VALUES (new.id, new.body, new.preview);
END;
