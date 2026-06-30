import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSetting, setSetting } from "@/lib/db";
import { queryKeys } from "@/app/queryClient";

const KEY = "last_chapter_num";

export function useLastChapter() {
  return useQuery({
    queryKey: queryKeys.setting(KEY),
    queryFn: async () => {
      const raw = await getSetting(KEY);
      return raw ? Number(raw) : 1;
    },
  });
}

export function useSetLastChapter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (num: number) => setSetting(KEY, String(num)),
    onSuccess: (_data, num) => {
      queryClient.setQueryData(queryKeys.setting(KEY), num);
    },
  });
}
