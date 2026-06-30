import { create } from "zustand";

/**
 * Zustand holds only ephemeral, client-only UI state — things that have no
 * meaning once the window closes. Anything that should survive a restart
 * (last chapter, explored chapters, notes, tags) lives in SQLite and is
 * read through TanStack Query instead. Mixing the two would create two
 * sources of truth for the same fact; this store deliberately can't.
 */

export type ToastTone = "success" | "info" | "error";

export interface Toast {
  id: string;
  message: string;
  tone: ToastTone;
}

interface UIState {
  toasts: Toast[];
  pushToast: (message: string, tone?: ToastTone) => void;
  dismissToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  pushToast: (message, tone = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }));
    // Self-clearing — callers never need to remember to dismiss.
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 2600);
  },
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
