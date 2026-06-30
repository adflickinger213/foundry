import { useQuery } from "@tanstack/react-query";
import { getDb } from "@/lib/db";

interface CountRow {
  chapter_id: number;
  count: number;
}

/**
 * Returns a Map<chapterId, noteCount> via a single aggregating query.
 * The HQ building directory shows badge counts on every chapter row, and
 * looping 11 individual `COUNT(*)` queries would be needlessly chatty —
 * one GROUP BY is the right shape here.
 */
async function fetchNoteCountsByChapter(): Promise<Map<number, number>> {
  const db = await getDb();
  const rows = await db.select<CountRow[]>(
    "SELECT chapter_id, COUNT(*) as count FROM notes GROUP BY chapter_id",
  );
  return new Map(rows.map((r) => [r.chapter_id, r.count]));
}

export function useNoteCountsByChapter() {
  return useQuery({
    queryKey: ["notes", "counts-by-chapter"],
    queryFn: fetchNoteCountsByChapter,
    // Keep the per-chapter badges fresh when notes are added/deleted.
    // The broad ["notes"] invalidation in useCreateNote/useDeleteNote
    // matches this key because TanStack Query does prefix matching.
    staleTime: 5_000,
  });
}
