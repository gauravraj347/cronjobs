"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PresetGrid } from "./PresetGrid";
import { PRESETS } from "@/lib/cron/presets";
import { cn } from "@/lib/utils";

export function CollapsiblePresetSection({
  initialCount = 15,
}: {
  initialCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const total = PRESETS.length;
  const visible = expanded ? total : Math.min(initialCount, total);
  const remaining = total - initialCount;

  return (
    <>
      <PresetGrid limit={visible} />

      {remaining > 0 && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={cn(
              "group inline-flex items-center gap-2 px-5 py-2.5 rounded-md",
              "text-sm font-semibold transition-all duration-150",
              "border border-accent/30 bg-gradient-to-b from-accent/15 to-accent/5 text-accent",
              "hover:from-accent/25 hover:border-accent/60 hover:text-text",
              "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_0_24px_-12px_rgba(124,156,255,0.5)]",
              "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-bg",
            )}
          >
            <span>
              {expanded
                ? "Show fewer"
                : `Show ${remaining} more preset${remaining === 1 ? "" : "s"}`}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                expanded && "rotate-180",
              )}
            />
          </button>

          <Link
            href="/presets"
            className="text-xs text-text-muted hover:text-text underline-offset-4 hover:underline"
          >
            Browse all on the dedicated page →
          </Link>
        </div>
      )}
    </>
  );
}
