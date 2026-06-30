import { Building2 } from "lucide-react";
import { ProgressRing } from "@/components/ui/ProgressRing";

interface HeaderProps {
  exploredCount: number;
  totalChapters: number;
}

export function Header({ exploredCount, totalChapters }: HeaderProps) {
  return (
    <header className="pt-8 pb-5 flex items-end justify-between flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-2 text-terracotta">
          <Building2 size={18} strokeWidth={1.8} />
          <span className="text-xs tracking-[0.22em] uppercase text-mushroom">
            The Foundry · v1.0
          </span>
        </div>
        <h1 className="font-display font-semibold text-[2.4rem] leading-[1.05] text-ink mt-1">
          The Headquarters
        </h1>
        <p className="text-sm mt-1 text-soft">
          The operating system for autonomous organizations
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ProgressRing value={exploredCount} total={totalChapters} />
        <div className="text-xs text-soft leading-tight">
          chapters
          <br />
          explored
        </div>
      </div>
    </header>
  );
}
