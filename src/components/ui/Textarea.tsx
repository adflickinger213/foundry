import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-2xl p-3 text-[15px] bg-ivory border border-line text-ink outline-none resize-none placeholder:text-soft/70",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
