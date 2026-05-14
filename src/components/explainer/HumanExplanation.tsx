"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { explainCron } from "@/lib/cron/explain";
import { cn } from "@/lib/utils";

export function HumanExplanation({ expression }: { expression: string }) {
  const { human, isValid, error } = useMemo(
    () => explainCron(expression),
    [expression],
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mt-5 rounded-lg border bg-bg-field/60 px-4 py-3",
        isValid ? "border-border-subtle" : "border-red-500/40 bg-red-500/5",
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={human}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="font-mono text-sm md:text-[15px] text-text"
        >
          <span className="text-accent mr-2">→</span>
          <span className="text-text">{`"${human}"`}</span>
        </motion.div>
      </AnimatePresence>
      {!isValid && error && (
        <p className="mt-1 text-xs text-red-400/80">{error}</p>
      )}
    </div>
  );
}
