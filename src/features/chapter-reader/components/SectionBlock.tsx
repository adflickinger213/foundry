import type { ChapterSection } from "@/types/chapter";

interface SectionBlockProps {
  section: ChapterSection;
  accent: string;
}

export function SectionBlock({ section, accent }: SectionBlockProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-1" style={{ color: accent }}>
        {section.heading}
      </h3>
      <p className="text-[15px] leading-relaxed text-ink">{section.body}</p>
    </div>
  );
}
