import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem<T extends string> {
  id: T;
  label: string;
  icon: ReactNode;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  active: T;
  onChange: (id: T) => void;
}

export function Tabs<T extends string>({ items, active, onChange }: TabsProps<T>) {
  return (
    <nav
      role="tablist"
      aria-label="Primary"
      className="flex gap-1.5 p-1 rounded-full w-fit bg-white/40 border border-line"
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
              isActive ? "bg-card text-terracotta shadow-soft" : "text-soft",
            )}
          >
            {item.icon} {item.label}
          </button>
        );
      })}
    </nav>
  );
}
