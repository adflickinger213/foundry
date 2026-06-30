import { Pill } from "@/components/ui/Pill";
import type { Tag } from "@/types/tag";

interface TagFilterBarProps {
  tags: Tag[];
  active: string | null;
  onSelect: (name: string | null) => void;
}

export function TagFilterBar({ tags, active, onSelect }: TagFilterBarProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex gap-1.5 flex-wrap mb-4">
      {tags.map((t) => (
        <Pill
          key={t.id}
          active={active === t.name}
          onClick={() => onSelect(active === t.name ? null : t.name)}
        >
          #{t.name}
          <span className="ml-1 opacity-70">{t.count}</span>
        </Pill>
      ))}
    </div>
  );
}
