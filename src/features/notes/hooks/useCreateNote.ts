import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/features/notes/api/notesApi";
import { useUIStore } from "@/stores/useUIStore";

interface CreateNoteArgs {
  chapterId: number;
  body: string;
  tags: string;
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  const pushToast = useUIStore((s) => s.pushToast);

  return useMutation({
    mutationFn: (args: CreateNoteArgs) => createNote(args),
    onSuccess: () => {
      // Notes touch two query families (per-chapter lists and Recall's
      // unfiltered/tag-filtered views) plus the tag list, so a broad
      // invalidate is correct here rather than trying to hand-patch every
      // possible filter combination in the cache.
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
      void queryClient.invalidateQueries({ queryKey: ["tags"] });
      pushToast("Saved to the manifesto.", "success");
    },
    onError: () => {
      pushToast("That note didn't save — try again.", "error");
    },
  });
}
