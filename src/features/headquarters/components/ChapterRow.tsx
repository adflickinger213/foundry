import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { Chapter } from "@/types/chapter";

interface ChapterRowProps {
  chapter: Chapter;
  explored: boolean;
  noteCount: number;
  index: number;
  onClick: () => void;
}

export function ChapterRow({ chapter, explored, noteCount, index, onClick }: ChapterRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
    >
      <button
        onClick={onClick}
        className="w-full text-left flex items-stretch gap-0 rounded-2xl overflow-hidden transition-transform active:scale-[0.995] bg-card border border-line shadow-soft"
      >
        {/* accent stripe */}
        <div className="w-1.5 shrink-0" style={{ background: chapter.accent }} />

        <div className="flex-1 py-3.5 px-4">
          <div className="flex items-center justify-between gap-3">
            <span
              className="text-[11px] uppercase tracking-wider"
              style={{ color: chapter.accent }}
            >
              {chapter.room}
            </span>

            <div className="flex items-center gap-2">
              {noteCount > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cream text-mushroom">
                  {noteCount} {noteCount === 1 ? "note" : "notes"}
                </span>
              )}
              {explored && (
                <span
                  aria-label="Explored"
                  className="flex items-center justify-center rounded-full bg-sage"
                  style={{ width: 20, height: 20 }}
                >
                  <Check size={13} strokeWidth={2.4} color="#fff" />
                </span>
              )}
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display text-[1.05rem] text-mushroom">{chapter.num}</span>
            <span className="font-display text-[1.25rem] text-ink">{chapter.title}</span>
          </div>
          <div className="text-sm mt-0.5 text-soft">{chapter.blurb}</div>
        </div>
      </button>
    </motion.div>
  );
}
