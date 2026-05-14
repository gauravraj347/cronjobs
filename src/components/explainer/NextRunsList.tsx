"use client";

import { useEffect, useMemo, useState } from "react";
import { getNextRuns } from "@/lib/cron/nextRuns";

function formatDate(d: Date, tz: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
  } catch {
    return d.toISOString();
  }
}

export function NextRunsList({ expression }: { expression: string }) {
  const [tz, setTz] = useState<string>("UTC");

  useEffect(() => {
    try {
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    } catch {
      setTz("UTC");
    }
  }, []);

  const { runs, error } = useMemo(
    () => getNextRuns(expression, 5, tz),
    [expression, tz],
  );

  return (
    <div className="rounded-xl border border-border-subtle bg-bg/40 p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-xs uppercase tracking-wider text-text-muted">
          Next 5 runs
        </div>
        <div className="text-[10px] text-text-dim font-mono">{tz}</div>
      </div>
      {error ? (
        <p className="text-xs text-red-400/80 font-mono">{error}</p>
      ) : (
        <ol className="space-y-1.5">
          {runs.map((d, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm font-mono text-text"
            >
              <span className="text-text-dim w-5 text-right">{i + 1}.</span>
              <span>{formatDate(d, tz)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
