import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExploredChapterIds, markChapterExplored } from "@/lib/db";
import { queryKeys } from "@/app/queryClient";

export function useProgress() {
  return useQuery({
    queryKey: queryKeys.progress,
    queryFn: getExploredChapterIds,
  });
}

export function useMarkExplored() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chapterId: number) => markChapterExplored(chapterId),

    // Optimistic update: the checkmark and ring should feel instant, not
    // wait on a round trip to SQLite for what is a tiny, low-risk write.
    onMutate: async (chapterId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.progress });
      const previous = queryClient.getQueryData<number[]>(queryKeys.progress);
      queryClient.setQueryData<number[]>(queryKeys.progress, (old) =>
        old && !old.includes(chapterId) ? [...old, chapterId] : old ?? [chapterId],
      );
      return { previous };
    },

    onError: (_err, _chapterId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.progress, context.previous);
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.progress });
    },
  });
}
