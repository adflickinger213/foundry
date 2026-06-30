import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/features/notes/api/notesApi";
import { queryKeys } from "@/app/queryClient";
import type { NoteFilters } from "@/types/note";

export function useNotes(filters: NoteFilters) {
  return useQuery({
    queryKey: queryKeys.notes(filters as Record<string, unknown>),
    queryFn: () => fetchNotes(filters),
    placeholderData: (prev) => prev, // keep the last result visible while a new filter settles, instead of flashing a loading state
  });
}
