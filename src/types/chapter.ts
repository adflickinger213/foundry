export interface ChapterSection {
  heading: string;
  body: string;
}

/** A chapter as stored in SQLite (sections_json parsed). */
export interface Chapter {
  id: number;
  num: number;
  room: string;
  title: string;
  blurb: string;
  accent: string;
  sections: ChapterSection[];
}

/** Raw row shape returned by `select()` before JSON parsing. */
export interface ChapterRow {
  id: number;
  num: number;
  room: string;
  title: string;
  blurb: string;
  accent: string;
  sections_json: string;
}

export function parseChapterRow(row: ChapterRow): Chapter {
  return {
    id: row.id,
    num: row.num,
    room: row.room,
    title: row.title,
    blurb: row.blurb,
    accent: row.accent,
    sections: JSON.parse(row.sections_json) as ChapterSection[],
  };
}
