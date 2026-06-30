import { getDb, toFtsQuery } from "@/lib/db";
import { distill, parseTagInput } from "@/lib/utils";
import type { Note, NoteFilters, NoteRow } from "@/types/note";
import { parseNoteRow } from "@/types/note";
import type { Tag } from "@/types/tag";

const TAG_SEP = "\u0001"; // unit separator — never appears in human-typed tags

/**
 * The single query behind both "notes for this chapter" and Recall search.
 * Two paths, same shape of result, so the UI layer (NoteCard, lists) never
 * has to know which mode produced the rows:
 *
 *  - No search term: a plain indexed read, ordered by recency
 *    (idx_notes_created / idx_notes_chapter do the work).
 *  - Search term present: join through notes_fts (the FTS5 index), which
 *    is what keeps this fast at large note counts — SQLite walks the
 *    inverted index instead of scanning every row's text.
 *
 * Tag filtering, when present, is an indexed join through note_tags in
 * both paths rather than a text-list scan.
 */
export async function fetchNotes(filters: NoteFilters = {}): Promise<Note[]> {
  const db = await getDb();
  const { chapterId, tag, search, limit = 100, offset = 0 } = filters;

  const params: unknown[] = [];
  const where: string[] = [];
  let fromClause = "FROM notes n";

  const ftsQuery = search ? toFtsQuery(search) : null;
  if (ftsQuery) {
    fromClause += ` JOIN notes_fts f ON f.rowid = n.id`;
    // When an FTS5 table is joined under an alias, MATCH must reference
    // that alias — referencing the bare table name here would not bind
    // to the joined instance and silently returns no rows.
    where.push(`f MATCH $${params.length + 1}`);
    params.push(ftsQuery);
  }

  if (typeof chapterId === "number") {
    where.push(`n.chapter_id = $${params.length + 1}`);
    params.push(chapterId);
  }

  if (tag) {
    fromClause += `
      JOIN note_tags nt ON nt.note_id = n.id
      JOIN tags t ON t.id = nt.tag_id AND t.name = $${params.length + 1}
    `;
    params.push(tag);
  }

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  params.push(limit, offset);

  const sql = `
    SELECT
      n.id, n.chapter_id, n.body, n.preview, n.created_at, n.updated_at,
      (
        SELECT group_concat(tg.name, '${TAG_SEP}')
        FROM note_tags nt2
        JOIN tags tg ON tg.id = nt2.tag_id
        WHERE nt2.note_id = n.id
      ) AS tag_names
    ${fromClause}
    ${whereClause}
    ORDER BY n.created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `;

  const rows = await db.select<NoteRow[]>(sql, params);
  return rows.map(parseNoteRow);
}

export async function fetchAllTags(): Promise<Tag[]> {
  const db = await getDb();
  return db.select<Tag[]>(`
    SELECT t.id, t.name, COUNT(nt.note_id) as count
    FROM tags t
    LEFT JOIN note_tags nt ON nt.tag_id = t.id
    GROUP BY t.id
    HAVING count > 0
    ORDER BY t.name ASC
  `);
}

interface CreateNoteInput {
  chapterId: number;
  body: string;
  tags: string;
}

export async function createNote({
  chapterId,
  body,
  tags,
}: CreateNoteInput): Promise<void> {
  const db = await getDb();
  const now = Date.now();
  const preview = distill(body);

  const result = await db.execute(
    `INSERT INTO notes (chapter_id, body, preview, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $4)`,
    [chapterId, body, preview, now],
  );
  const noteId = result.lastInsertId;

  const tagNames = parseTagInput(tags);
  for (const name of tagNames) {
    await db.execute(`INSERT OR IGNORE INTO tags (name) VALUES ($1)`, [name]);
    const tagRows = await db.select<{ id: number }[]>(
      `SELECT id FROM tags WHERE name = $1`,
      [name],
    );
    const tagId = tagRows[0]?.id;
    if (tagId) {
      await db.execute(
        `INSERT OR IGNORE INTO note_tags (note_id, tag_id) VALUES ($1, $2)`,
        [noteId, tagId],
      );
    }
  }
}

export async function deleteNote(noteId: number): Promise<void> {
  const db = await getDb();
  // ON DELETE CASCADE on note_tags handles the join rows; the notes_after_delete
  // trigger handles cleaning up the FTS index entry. One statement, fully consistent.
  await db.execute(`DELETE FROM notes WHERE id = $1`, [noteId]);
}
