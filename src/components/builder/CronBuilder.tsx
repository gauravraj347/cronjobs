"use client";

import { useCronStore } from "@/stores/cronStore";
import { CronField } from "./CronField";
import { FIELD_ORDER } from "@/lib/cron/fieldMeta";
import { HumanExplanation } from "@/components/explainer/HumanExplanation";
import { SpecialCharsLegend } from "@/components/explainer/SpecialCharsLegend";
import { NextRunsList } from "@/components/explainer/NextRunsList";
import { QuickPicks } from "./QuickPicks";
import { CopyButton } from "@/components/shared/CopyButton";
import { useCronUrlSync } from "@/hooks/useCronUrlSync";

export function CronBuilder() {
  const fields = useCronStore((s) => s.fields);
  const setField = useCronStore((s) => s.setField);
  const expression = useCronStore((s) => s.expression());

  useCronUrlSync();

  const sep = (
    <span aria-hidden className="text-text-dim text-xl select-none">
      ·
    </span>
  );

  return (
    <section
      aria-label="Cron expression builder"
      className="w-full rounded-2xl border border-border bg-bg-panel/80 backdrop-blur p-6 md:p-8 shadow-panel"
    >
      <div className="text-xs uppercase tracking-wider text-text-muted mb-5">
        What a cron expression looks like (5-field standard)
      </div>

      <div className="rounded-xl border border-border-subtle bg-bg/40 p-5 md:p-6">
        <HumanExplanation expression={expression} />

        <div className="flex flex-wrap items-end gap-3 md:gap-4 justify-center">
          {FIELD_ORDER.map((key, i) => (
            <div key={key} className="flex items-end gap-3 md:gap-4">
              <CronField
                fieldKey={key}
                value={fields[key]}
                onChange={(v) => setField(key, v)}
              />
              {i < FIELD_ORDER.length - 1 && (
                <div className="pb-7">{sep}</div>
              )}
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
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-5">
        <QuickPicks />
        <NextRunsList expression={expression} />
      </div>
    </section>
  );
}
