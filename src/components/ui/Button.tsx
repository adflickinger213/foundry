import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-terracotta text-white hover:opacity-90",
  outline: "border-[1.5px] border-terracotta text-terracotta hover:bg-terracotta/5",
  ghost: "text-soft hover:bg-cream",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-opacity",
        VARIANT_CLASSES[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
