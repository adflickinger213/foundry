import { Library } from "lucide-react";
import { ChapterRow } from "./ChapterRow";
import type { Chapter } from "@/types/chapter";

interface BuildingDirectoryProps {
  chapters: Chapter[];
  exploredIds: number[];
  noteCountByChapterId: Map<number, number>;
  onOpen: (chapterNum: number) => void;
}

export function BuildingDirectory({
  chapters,
  exploredIds,
  noteCountByChapterId,
  onOpen,
}: BuildingDirectoryProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 text-mushroom">
        <Library size={15} strokeWidth={1.8} />
        <span className="text-xs uppercase tracking-[0.18em]">The building directory</span>
      </div>
      <div className="space-y-2.5">
        {chapters.map((chapter, i) => (
          <ChapterRow
            key={chapter.id}
            chapter={chapter}
            index={i}
            explored={exploredIds.includes(chapter.id)}
            noteCount={noteCountByChapterId.get(chapter.id) ?? 0}
            onClick={() => onOpen(chapter.num)}
          />
        ))}
      </div>
    </div>
  );
}
