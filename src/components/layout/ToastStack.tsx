import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, AlertTriangle } from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";

const ICONS = {
  success: <Check size={15} strokeWidth={2.4} className="text-sage" />,
  info: <Info size={15} strokeWidth={2} className="text-lavender" />,
  error: <AlertTriangle size={15} strokeWidth={2} className="text-terracotta" />,
};

/** A quiet, bottom-of-screen toast stack — confirmations, not interruptions. */
export function ToastStack() {
  const toasts = useUIStore((s) => s.toasts);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-line shadow-card text-sm text-ink"
          >
            {ICONS[t.tone]}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
