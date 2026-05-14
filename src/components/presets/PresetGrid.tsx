"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useCronStore } from "@/stores/cronStore";
import { PRESETS } from "@/lib/cron/presets";
import { cn } from "@/lib/utils";

export function PresetGrid({ limit }: { limit?: number }) {
  const setFromExpression = useCronStore((s) => s.setFromExpression);
  const current = useCronStore((s) => s.expression());
  const items = limit ? PRESETS.slice(0, limit) : PRESETS;

  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  async function handleClick(slug: string, expression: string) {
    setFromExpression(expression);

    try {
      await navigator.clipboard.writeText(expression);
      setCopiedSlug(slug);
      setTimeout(() => {
        setCopiedSlug((s) => (s === slug ? null : s));
      }, 1400);
    } catch {
      /* clipboard write blocked — silently ignore, builder still loads */
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((p) => {
        const active = current === p.expression;
        const copied = copiedSlug === p.slug;
        return (
          <button
            key={p.slug}
            onClick={() => handleClick(p.slug, p.expression)}
            aria-label={`Use ${p.name} preset, copies ${p.expression} to clipboard`}
            className={cn(
              "relative overflow-hidden text-left rounded-xl border p-4 transition-colors",
              active
                ? "border-accent bg-accent/5"
                : "border-border bg-bg-panel/60 hover:border-accent/40 hover:bg-bg-panel",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium text-text text-sm">{p.name}</div>
              <span className="text-[10px] uppercase tracking-wider text-text-dim">
                {p.category}
              </span>
            </div>
            <code className="mt-2 block font-mono text-xs text-accent">
              {p.expression}
            </code>
            <p className="mt-2 text-xs text-text-muted leading-relaxed">
              {p.description}
            </p>

            <AnimatePresence>
              {copied && (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center bg-bg-panel/90 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 text-accent-green font-medium text-sm"
                  >
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                    Copied to clipboard
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
