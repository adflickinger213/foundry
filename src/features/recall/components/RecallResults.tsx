import { Sparkles } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoteCard } from "@/features/notes/components/NoteCard";
import type { Note } from "@/types/note";
import type { Chapter } from "@/types/chapter";

interface RecallResultsProps {
  notes: Note[];
  totalNoteCount: number;
  chapters: Chapter[];
}

export function RecallResults({ notes, totalNoteCount, chapters }: RecallResultsProps) {
  if (totalNoteCount === 0) {
    return (
      <EmptyState
        icon={<Sparkles size={20} />}
        title="The manifesto is ready to grow."
        description="Open any chapter and add an idea. It'll show up here, searchable."
      />
    );
  }

  return (
    <>
      <div className="text-xs text-soft mb-2">
        {notes.length} of {totalNoteCount} {totalNoteCount === 1 ? "note" : "notes"}
      </div>
      <div className="space-y-2">
        {notes.map((note) => {
          // note.chapterId is the chapters.id surrogate key; chapters are
          // keyed by .num everywhere in the UI, so resolve through id once
          // here rather than threading two different keys around.
          const chapter = chapters.find((c) => c.id === note.chapterId);
          return (
            <NoteCard
              key={note.id}
              note={note}
              chapterLabel={chapter ? `Ch ${chapter.num} · ${chapter.title}` : undefined}
            />
          );
        })}
      </div>
    </>
  );
}
