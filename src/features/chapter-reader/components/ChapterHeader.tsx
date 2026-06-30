import type { Chapter } from "@/types/chapter";

interface ChapterHeaderProps {
  chapter: Chapter;
}

export function ChapterHeader({ chapter }: ChapterHeaderProps) {
  return (
    <div>
      <div
        className="text-[11px] uppercase tracking-[0.2em] mb-1"
        style={{ color: chapter.accent }}
      >
        {chapter.room}
      </div>
      <h2 className="font-display text-[2rem] leading-[1.1] text-ink">
        {chapter.num}. {chapter.title}
      </h2>
    </div>
  );
}
