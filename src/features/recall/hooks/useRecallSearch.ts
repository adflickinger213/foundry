import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useTags } from "@/features/notes/hooks/useTags";

/**
 * Composes search input + tag filter + the underlying notes query. The
 * debounce is what keeps typing smooth — without it, every keystroke would
 * fire a fresh FTS query mid-word. 220ms is short enough to feel instant
 * once you stop typing, long enough to skip the in-between keystrokes.
 */
export function useRecallSearch() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const debouncedQuery = useDebouncedValue(query, 220);

  const notesQuery = useNotes({
    search: debouncedQuery || undefined,
    tag,
    limit: 200,
  });
  const tagsQuery = useTags();

  return {
    query,
    setQuery,
    tag,
    setTag,
    notes: notesQuery.data ?? [],
    isLoading: notesQuery.isLoading,
    allTags: tagsQuery.data ?? [],
  };
}
