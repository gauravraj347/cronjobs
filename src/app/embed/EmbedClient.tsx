"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CronField } from "@/components/builder/CronField";
import { FIELD_ORDER } from "@/lib/cron/fieldMeta";
import { HumanExplanation } from "@/components/explainer/HumanExplanation";
import { SpecialCharsLegend } from "@/components/explainer/SpecialCharsLegend";
import { CopyButton } from "@/components/shared/CopyButton";
import { useCronStore } from "@/stores/cronStore";

export function EmbedClient({
  initialExpression,
}: {
  initialExpression: string;
}) {
  const fields = useCronStore((s) => s.fields);
  const setField = useCronStore((s) => s.setField);
  const setFromExpression = useCronStore((s) => s.setFromExpression);
  const expression = useCronStore((s) => s.expression());

  // Hydrate from query string once.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (hydrated) return;
    setFromExpression(initialExpression);
    setHydrated(true);
  }, [hydrated, initialExpression, setFromExpression]);

  const sep = useMemo(
    () => (
      <span aria-hidden className="text-text-dim text-xl select-none">
        ·
      </span>
    ),
    [],
  );

  return (
    <div className="min-h-screen bg-bg p-4">
      <section
        aria-label="Cron expression builder"
        className="w-full max-w-3xl mx-auto rounded-2xl border border-border bg-bg-panel/80 backdrop-blur p-5 md:p-6 shadow-panel"
      >
        <HumanExplanation expression={expression} />

        <div className="flex flex-wrap items-end gap-3 md:gap-4 justify-center">
          {FIELD_ORDER.map((key, i) => (
            <div key={key} className="flex items-end gap-3 md:gap-4">
              <CronField
                fieldKey={key}
                value={fields[key]}
                onChange={(v) => setField(key, v)}
              />
              {i < FIELD_ORDER.length - 1 && <div className="pb-7">{sep}</div>}
            </div>
          ))}

          <div className="pb-7 ml-2 md:ml-4">
            <CopyButton
              text={expression}
              variant="premium"
              size="lg"
              label="Copy Cron"
            />
          </div>
        </div>

        <SpecialCharsLegend />

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-dim">
          <span>Powered by</span>
          <Link
            href="/"
            target="_blank"
            className="text-text-muted hover:text-accent font-mono"
          >
            cronbuilder.app →
          </Link>
        </div>
      </section>
    </div>
  );
}
