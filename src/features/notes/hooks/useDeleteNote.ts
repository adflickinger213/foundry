import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/features/notes/api/notesApi";
import { useUIStore } from "@/stores/useUIStore";

export function useDeleteNote() {
  const queryClient = useQueryClient();
  const pushToast = useUIStore((s) => s.pushToast);

  return useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
      void queryClient.invalidateQueries({ queryKey: ["tags"] });
      pushToast("Note removed.", "info");
    },
    onError: () => {
      pushToast("Couldn't remove that note — try again.", "error");
    },
  });
}
