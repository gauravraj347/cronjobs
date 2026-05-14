"use client";

import { useCronStore } from "@/stores/cronStore";
import { PRESETS } from "@/lib/cron/presets";
import { cn } from "@/lib/utils";

export function PresetGrid({ limit }: { limit?: number }) {
  const setFromExpression = useCronStore((s) => s.setFromExpression);
  const current = useCronStore((s) => s.expression());
  const items = limit ? PRESETS.slice(0, limit) : PRESETS;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((p) => {
        const active = current === p.expression;
        return (
          <button
            key={p.slug}
            onClick={() => {
              setFromExpression(p.expression);
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={cn(
              "text-left rounded-xl border p-4 transition-colors",
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
          </button>
        );
      })}
    </div>
  );
}
