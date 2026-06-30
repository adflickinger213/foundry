import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { formatRelativeOrDate } from "@/lib/utils";
import { useDeleteNote } from "@/features/notes/hooks/useDeleteNote";
import type { Note } from "@/types/note";

interface NoteCardProps {
  note: Note;
  /** A pre-formatted label like "Ch 6 · Willow & Organizational Intelligence" — used in Recall, omitted within a chapter's own note list since it'd be redundant there. */
  chapterLabel?: string;
}

export function NoteCard({ note, chapterLabel }: NoteCardProps) {
  const [open, setOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const { mutate: remove, isPending } = useDeleteNote();

  return (
    <Card className="px-4 py-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-start gap-2"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown size={16} className="mt-0.5 text-mushroom shrink-0" />
        ) : (
          <ChevronRight size={16} className="mt-0.5 text-mushroom shrink-0" />
        )}
        <div className="flex-1">
          {chapterLabel && (
            <div className="text-[11px] uppercase tracking-wider text-terracotta">
              {chapterLabel}
            </div>
          )}
          <div className="text-[15px] text-ink">{open ? note.body : note.preview}</div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-soft">{formatRelativeOrDate(note.createdAt)}</span>
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-cream text-mushroom"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex justify-end overflow-hidden"
          >
            <div className="pt-2">
              {confirmingDelete ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-soft">Remove this note?</span>
                  <button
                    onClick={() => remove(note.id)}
                    disabled={isPending}
                    className="text-terracotta font-medium"
                  >
                    Yes
                  </button>
                  <button onClick={() => setConfirmingDelete(false)} className="text-soft">
                    No
                  </button>
                </div>
              ) : (
                <IconButton
                  label="Remove note"
                  onClick={() => setConfirmingDelete(true)}
                  className="text-xs gap-1"
                >
                  <X size={13} />
                </IconButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
