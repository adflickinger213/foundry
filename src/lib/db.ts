import Database from "@tauri-apps/plugin-sql";
import { CHAPTER_SEEDS } from "@/data/chapters.seed";
import type { Chapter, ChapterRow } from "@/types/chapter";
import { parseChapterRow } from "@/types/chapter";

/**
 * Single shared connection to the local SQLite file. tauri-plugin-sql pools
 * connections internally, but we still only want to call `Database.load`
 * once and reuse the handle — opening it repeatedly is wasted work and
 * each call is async, which would mean every query pays a double await.
 */
let dbPromise: Promise<Database> | null = null;

export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = Database.load("sqlite:foundry.db");
  }
  return dbPromise;
}

/**
 * One-time seed: if the chapters table is empty (first launch, or a fresh
 * profile), populate it from the bundled seed content. Safe to call on
 * every app start — it's a no-op after the first run.
 */
export async function seedChaptersIfEmpty(): Promise<void> {
  const db = await getDb();
  const rows = await db.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM chapters",
  );
  const count = rows[0]?.count ?? 0;
  if (count > 0) return;

  for (const chapter of CHAPTER_SEEDS) {
    await db.execute(
      `INSERT INTO chapters (num, room, title, blurb, accent, sections_json)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        chapter.num,
        chapter.room,
        chapter.title,
        chapter.blurb,
        chapter.accent,
        JSON.stringify(chapter.sections),
      ],
    );
  }
}

export async function getChapters(): Promise<Chapter[]> {
  const db = await getDb();
  const rows = await db.select<ChapterRow[]>(
    "SELECT id, num, room, title, blurb, accent, sections_json FROM chapters ORDER BY num ASC",
  );
  return rows.map(parseChapterRow);
}

export async function getChapterByNum(num: number): Promise<Chapter | null> {
  const db = await getDb();
  const rows = await db.select<ChapterRow[]>(
    "SELECT id, num, room, title, blurb, accent, sections_json FROM chapters WHERE num = $1",
    [num],
  );
  const row = rows[0];
  return row ? parseChapterRow(row) : null;
}

export async function getExploredChapterIds(): Promise<number[]> {
  const db = await getDb();
  const rows = await db.select<{ chapter_id: number }[]>(
    "SELECT chapter_id FROM progress",
  );
  return rows.map((r) => r.chapter_id);
}

export async function markChapterExplored(chapterId: number): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT OR IGNORE INTO progress (chapter_id, explored_at) VALUES ($1, $2)`,
    [chapterId, Date.now()],
  );
}

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  const rows = await db.select<{ value: string }[]>(
    "SELECT value FROM settings WHERE key = $1",
    [key],
  );
  return rows[0]?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT INTO settings (key, value) VALUES ($1, $2)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [key, value],
  );
}

/**
 * Sanitizes free-text input into an FTS5 MATCH query that does a
 * prefix-match AND across terms, e.g. "willow gover" -> '"willow"* "gover"*'.
 * FTS5 treats double quotes and a few other characters as syntax, so user
 * input is never interpolated into the query directly — only ever bound
 * as parameters, with this function producing the *pattern*, not raw SQL.
 */
export function toFtsQuery(raw: string): string | null {
  const terms = raw
    .trim()
    .split(/\s+/)
    .map((t) => t.replace(/["*]/g, ""))
    .filter(Boolean);
  if (terms.length === 0) return null;
  return terms.map((t) => `"${t}"*`).join(" AND ");
}
