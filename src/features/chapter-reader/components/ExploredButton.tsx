import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExploredButtonProps {
  explored: boolean;
  accent: string;
  onMark: () => void;
}

export function ExploredButton({ explored, accent, onMark }: ExploredButtonProps) {
  return (
    <motion.button
      onClick={onMark}
      disabled={explored}
      whileTap={explored ? undefined : { scale: 0.96 }}
      className={cn(
        "mt-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors",
        explored ? "bg-sage text-white" : "bg-transparent",
      )}
      style={explored ? undefined : { color: accent, border: `1.5px solid ${accent}` }}
    >
      <Check size={15} strokeWidth={2.2} />
      {explored ? "Explored" : "Mark as explored"}
    </motion.button>
  );
}
