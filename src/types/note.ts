export interface Note {
  id: number;
  chapterId: number;
  body: string;
  preview: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

/** Raw row shape for a note joined with its tag names (group_concat). */
export interface NoteRow {
  id: number;
  chapter_id: number;
  body: string;
  preview: string;
  created_at: number;
  updated_at: number;
  tag_names: string | null;
}

export function parseNoteRow(row: NoteRow): Note {
  return {
    id: row.id,
    chapterId: row.chapter_id,
    body: row.body,
    preview: row.preview,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    tags: row.tag_names ? row.tag_names.split("\u0001").filter(Boolean) : [],
  };
}

export interface NoteFilters {
  chapterId?: number;
  tag?: string | null;
  search?: string;
  limit?: number;
  offset?: number;
}
