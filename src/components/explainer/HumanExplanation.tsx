"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { explainCron } from "@/lib/cron/explain";
import { cn } from "@/lib/utils";

function toSimpleEnglish(human: string): string {
  if (!human) return human;
  const lower = human.toLowerCase();
  if (lower.startsWith("at ")) return "Runs at " + human.slice(3);
  if (lower.startsWith("every ")) return "Runs every " + human.slice(6);
  return human;
}

export function HumanExplanation({ expression }: { expression: string }) {
  const { human, isValid, error } = useMemo(
    () => explainCron(expression),
    [expression],
  );

  const friendly = toSimpleEnglish(human);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "relative rounded-xl border bg-gradient-to-b from-yellow-400/[0.06] to-transparent",
        "px-4 py-3 mb-5",
        "shadow-[0_0_24px_-12px_rgba(250,204,21,0.35)]",
        isValid ? "border-yellow-400/40" : "border-red-500/40 bg-red-500/5",
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={friendly}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-2 font-mono text-sm md:text-base"
        >
          <span aria-hidden className="text-yellow-400 text-xs">
            
          </span>
          <span className="text-yellow-400 font-bold">→</span>
          <span className="text-yellow-400 font-bold truncate">
            {isValid ? friendly : "Invalid cron expression"}
          </span>
        </motion.div>
      </AnimatePresence>
      {!isValid && error && (
        <p className="mt-1 text-xs text-red-400/80">{error}</p>
      )}
    </div>
  );
}
