import { QueryClient } from "@tanstack/react-query";

// This is a single-user, fully local SQLite database — there's no server
// to go stale against, so a longer staleTime than a typical web app is
// fine. Mutations explicitly invalidate the queries they affect (see the
// notes hooks), which is what actually keeps the UI correct; staleTime
// here just controls incidental refetching, not correctness.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const queryKeys = {
  chapters: ["chapters"] as const,
  chapter: (num: number) => ["chapters", num] as const,
  progress: ["progress"] as const,
  notes: (filters: Record<string, unknown>) => ["notes", filters] as const,
  tags: ["tags"] as const,
  setting: (key: string) => ["settings", key] as const,
};
