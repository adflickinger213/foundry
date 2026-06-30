import { useMemo } from "react";
import { useChapters } from "@/features/headquarters/hooks/useChapters";
import type { Chapter } from "@/types/chapter";

/**
 * Derives a single chapter from the already-cached chapters list rather
 * than firing a second query. There are only 11 chapters and the whole
 * list is tiny — splitting it into a per-chapter query would just be two
 * cache entries to keep in sync for no benefit.
 */
export function useChapter(num: number) {
  const { data: chapters, isLoading, isError } = useChapters();

  const chapter = useMemo<Chapter | undefined>(
    () => chapters?.find((c) => c.num === num),
    [chapters, num],
  );

  return { chapter, isLoading, isError };
}
