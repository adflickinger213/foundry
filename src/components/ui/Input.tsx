import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-full px-3 py-1.5 text-sm bg-ivory border border-line text-ink outline-none placeholder:text-soft/70",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
