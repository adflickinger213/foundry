import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Pill({ className, active, ...props }: PillProps) {
  return (
    <button
      className={cn(
        "text-xs px-2.5 py-1 rounded-full transition-colors",
        active ? "bg-lavender text-white" : "bg-cream text-mushroom hover:bg-beige",
        className,
      )}
      {...props}
    />
  );
}
