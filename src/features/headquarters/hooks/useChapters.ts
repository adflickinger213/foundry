import { useQuery } from "@tanstack/react-query";
import { getChapters } from "@/lib/db";
import { queryKeys } from "@/app/queryClient";

export function useChapters() {
  return useQuery({
    queryKey: queryKeys.chapters,
    queryFn: getChapters,
    staleTime: Infinity, // chapter content only changes via a future Constitution Editor, which will invalidate this key itself
  });
}
