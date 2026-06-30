import { useMemo } from "react";
import { ResumeCard } from "@/features/headquarters/components/ResumeCard";
import { BuildingDirectory } from "@/features/headquarters/components/BuildingDirectory";
import { LoadingState } from "@/components/ui/LoadingState";
import { useChapters } from "@/features/headquarters/hooks/useChapters";
import { useProgress } from "@/features/headquarters/hooks/useProgress";
import { useLastChapter } from "@/features/headquarters/hooks/useLastChapter";
import { useNoteCountsByChapter } from "@/features/headquarters/hooks/useNoteCountsByChapter";

interface HQPageProps {
  onOpenChapter: (num: number) => void;
}

export function HQPage({ onOpenChapter }: HQPageProps) {
  const { data: chapters, isLoading: chaptersLoading } = useChapters();
  const { data: exploredIds = [] } = useProgress();
  const { data: lastChapterNum = 1 } = useLastChapter();
  const { data: noteCounts = new Map() } = useNoteCountsByChapter();

  const lastChapter = useMemo(
    () => chapters?.find((c) => c.num === lastChapterNum) ?? chapters?.[0],
    [chapters, lastChapterNum],
  );

  if (chaptersLoading || !chapters || !lastChapter) {
    return <LoadingState label="Opening the headquarters…" />;
  }

  return (
    <div>
      <ResumeCard
        chapter={lastChapter}
        wasExplored={exploredIds.includes(lastChapter.id)}
        onClick={() => onOpenChapter(lastChapter.num)}
      />
      <BuildingDirectory
        chapters={chapters}
        exploredIds={exploredIds}
        noteCountByChapterId={noteCounts}
        onOpen={onOpenChapter}
      />
    </div>
  );
}
