import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import type { Chapter } from "@/types/chapter";

interface ResumeCardProps {
  chapter: Chapter;
  wasExplored: boolean;
  onClick: () => void;
}

/**
 * The first thing a user sees on the HQ view — "continue where you left off."
 * This is the anti-empty-state: the default view always shows something in
 * progress, never a blank starting grid.
 */
export function ResumeCard({ chapter, wasExplored, onClick }: ResumeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        onClick={onClick}
        className="w-full text-left rounded-3xl p-5 mb-6 transition-transform active:scale-[0.99] bg-card border border-line shadow-card"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider mb-1 text-terracotta">
          <BookOpen size={14} strokeWidth={1.8} />
          {wasExplored ? "Pick up where you left off" : "Start here"}
        </div>
        <div className="font-display text-[1.5rem] text-ink leading-snug">
          {chapter.num}. {chapter.title}
        </div>
        <div className="text-sm mt-0.5 text-soft">{chapter.blurb}</div>
        <div
          className="mt-3 text-xs font-medium"
          style={{ color: chapter.accent }}
        >
          {chapter.room}
        </div>
      </button>
    </motion.div>
  );
}
