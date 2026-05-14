"use client";

import { useCronStore } from "@/stores/cronStore";
import { cn } from "@/lib/utils";

const QUICK_PICKS = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Every 5 min", expr: "*/5 * * * *" },
  { label: "Hourly", expr: "0 * * * *" },
  { label: "Daily 9am", expr: "0 9 * * *" },
  { label: "Weekdays 9am", expr: "0 9 * * 1-5" },
  { label: "Weekly Mon", expr: "0 9 * * 1" },
  { label: "1st of month", expr: "0 0 1 * *" },
];

export function QuickPicks() {
  const setFromExpression = useCronStore((s) => s.setFromExpression);
  const current = useCronStore((s) => s.expression());

  return (
    <div className="rounded-xl border border-border-subtle bg-bg/40 p-4">
      <div className="text-xs uppercase tracking-wider text-text-muted mb-3">
        Quick picks
      </div>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_PICKS.map((q) => (
          <button
            key={q.expr}
            onClick={() => setFromExpression(q.expr)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
              current === q.expr
                ? "bg-accent text-bg"
                : "bg-bg-field border border-border text-text-muted hover:text-text hover:border-accent/40",
            )}
          >
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}
