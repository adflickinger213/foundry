import { useQuery } from "@tanstack/react-query";
import { fetchAllTags } from "@/features/notes/api/notesApi";
import { queryKeys } from "@/app/queryClient";

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags,
    queryFn: fetchAllTags,
  });
}
