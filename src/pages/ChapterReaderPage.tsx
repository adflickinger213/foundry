import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ChapterHeader } from "@/features/chapter-reader/components/ChapterHeader";
import { SectionBlock } from "@/features/chapter-reader/components/SectionBlock";
import { ExploredButton } from "@/features/chapter-reader/components/ExploredButton";
import { NoteComposer } from "@/features/chapter-reader/components/NoteComposer";
import { NoteCard } from "@/features/notes/components/NoteCard";
import { Card } from "@/components/ui/Card";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useChapter } from "@/features/chapter-reader/hooks/useChapter";
import { useProgress, useMarkExplored } from "@/features/headquarters/hooks/useProgress";
import { useSetLastChapter } from "@/features/headquarters/hooks/useLastChapter";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useEffect } from "react";
import { BookOpen } from "lucide-react";

interface ChapterReaderPageProps {
  chapterNum: number;
  onBack: () => void;
}

export function ChapterReaderPage({ chapterNum, onBack }: ChapterReaderPageProps) {
  const { chapter, isLoading } = useChapter(chapterNum);
  const { data: exploredIds = [] } = useProgress();
  const { mutate: markExplored } = useMarkExplored();
  const { mutate: setLastChapter } = useSetLastChapter();
  const { data: notes = [] } = useNotes({ chapterId: chapter?.id });

  // Persist "continue where you left off" as soon as this page mounts
  useEffect(() => {
    setLastChapter(chapterNum);
  }, [chapterNum, setLastChapter]);

  if (isLoading || !chapter) {
    return <LoadingState label="Walking the corridor…" />;
  }

  const explored = exploredIds.includes(chapter.id);

  return (
    <motion.div
      key={chapterNum}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* back nav */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-4 text-soft hover:text-ink transition-colors"
        aria-label="Back to headquarters"
      >
        <ArrowLeft size={15} strokeWidth={1.8} /> Headquarters
      </button>

      {/* chapter body */}
      <Card className="p-6 mb-5">
        <ChapterHeader chapter={chapter} />

        <div className="mt-5 space-y-5">
          {chapter.sections.map((section, i) => (
            <SectionBlock key={i} section={section} accent={chapter.accent} />
          ))}
        </div>

        <ExploredButton
          explored={explored}
          accent={chapter.accent}
          onMark={() => markExplored(chapter.id)}
        />
      </Card>

      {/* living manifesto capture */}
      <NoteComposer chapterId={chapter.id} />

      {/* chapter note list */}
      {notes.length > 0 ? (
        <div>
          <div className="text-xs uppercase tracking-[0.18em] mb-2 text-mushroom">
            Notes on this chapter
          </div>
          <div className="space-y-2">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      ) : (
        /* Only shown after a user has been here long enough to know notes exist
           as a concept — i.e., we don't aggressively display this on first visit */
        explored && (
          <EmptyState
            icon={<BookOpen size={18} />}
            title="No notes yet for this chapter."
            description="Add one above — it'll live here and in Recall."
          />
        )
      )}
    </motion.div>
  );
}
