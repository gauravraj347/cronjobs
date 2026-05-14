"use client";

import { useState } from "react";
import { FIELD_META } from "@/lib/cron/fieldMeta";
import type { CronFieldName } from "@/types/cron";
import { cn } from "@/lib/utils";

interface Props {
  fieldKey: CronFieldName;
  value: string;
  onChange: (value: string) => void;
  onDone: () => void;
}

type Mode = "any" | "every" | "specific" | "range" | "custom";

function detectMode(v: string): Mode {
  if (v === "*") return "any";
  if (/^\*\/\d+$/.test(v)) return "every";
  if (/^\d+(,\d+)+$/.test(v)) return "specific";
  if (/^\d+-\d+$/.test(v)) return "range";
  return "custom";
}

export function FieldEditor({ fieldKey, value, onChange, onDone }: Props) {
  const meta = FIELD_META[fieldKey];
  const [mode, setMode] = useState<Mode>(detectMode(value));
  const [raw, setRaw] = useState(value);

  // mode-specific state
  const initEvery = value.startsWith("*/") ? parseInt(value.slice(2), 10) : 5;
  const [everyN, setEveryN] = useState(initEvery);

  const initRange =
    /^\d+-\d+$/.test(value)
      ? value.split("-").map(Number)
      : [meta.min, meta.max];
  const [rangeFrom, setRangeFrom] = useState(initRange[0]);
  const [rangeTo, setRangeTo] = useState(initRange[1]);

  const initSpecific = /^\d+(,\d+)*$/.test(value)
    ? new Set(value.split(",").map(Number))
    : new Set<number>();
  const [specific, setSpecific] = useState<Set<number>>(initSpecific);

  function commit(next: string) {
    setRaw(next);
    onChange(next);
  }

  function toggleSpecific(n: number) {
    const s = new Set(specific);
    if (s.has(n)) s.delete(n);
    else s.add(n);
    setSpecific(s);
    const sorted = [...s].sort((a, b) => a - b);
    commit(sorted.length === 0 ? "*" : sorted.join(","));
  }

  const numbers: number[] = [];
  for (let i = meta.min; i <= meta.max; i++) numbers.push(i);

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wider text-text-muted">
        {meta.label}
      </div>

      <div className="flex flex-wrap gap-1">
        {(
          [
            { id: "any", label: "Any" },
            { id: "every", label: "Every" },
            { id: "specific", label: "Specific" },
            { id: "range", label: "Range" },
            { id: "custom", label: "Custom" },
          ] as { id: Mode; label: string }[]
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setMode(t.id);
              if (t.id === "any") commit("*");
              else if (t.id === "every") commit(`*/${everyN}`);
              else if (t.id === "range") commit(`${rangeFrom}-${rangeTo}`);
              else if (t.id === "specific") {
                const sorted = [...specific].sort((a, b) => a - b);
                commit(sorted.length === 0 ? "*" : sorted.join(","));
              }
            }}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium",
              mode === t.id
                ? "bg-accent text-bg"
                : "bg-bg-field text-text-muted hover:text-text",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {mode === "any" && (
        <p className="text-sm text-text-muted">
          Matches every {meta.label.toLowerCase()}.
        </p>
      )}

      {mode === "every" && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-muted">Every</span>
          <input
            type="number"
            min={1}
            max={meta.max}
            value={everyN}
            onChange={(e) => {
              const n = Math.max(1, parseInt(e.target.value || "1", 10));
              setEveryN(n);
              commit(`*/${n}`);
            }}
            className="w-16 bg-bg-field border border-border rounded px-2 py-1 text-text font-mono"
          />
          <span className="text-text-muted">{meta.label.toLowerCase()}(s)</span>
        </div>
      )}

      {mode === "range" && (
        <div className="flex items-center gap-2 text-sm">
          <input
            type="number"
            min={meta.min}
            max={meta.max}
            value={rangeFrom}
            onChange={(e) => {
              const n = parseInt(e.target.value || `${meta.min}`, 10);
              setRangeFrom(n);
              commit(`${n}-${rangeTo}`);
            }}
            className="w-16 bg-bg-field border border-border rounded px-2 py-1 text-text font-mono"
          />
          <span className="text-text-muted">to</span>
          <input
            type="number"
            min={meta.min}
            max={meta.max}
            value={rangeTo}
            onChange={(e) => {
              const n = parseInt(e.target.value || `${meta.max}`, 10);
              setRangeTo(n);
              commit(`${rangeFrom}-${n}`);
            }}
            className="w-16 bg-bg-field border border-border rounded px-2 py-1 text-text font-mono"
          />
        </div>
      )}

      {mode === "specific" && (
        <div className="max-h-48 overflow-y-auto scrollbar-thin grid grid-cols-6 gap-1">
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => toggleSpecific(n)}
              className={cn(
                "rounded px-2 py-1 text-xs font-mono",
                specific.has(n)
                  ? "bg-accent text-bg"
                  : "bg-bg-field text-text-muted hover:text-text",
              )}
            >
              {meta.names?.[n] ?? n}
            </button>
          ))}
        </div>
      )}

      {mode === "custom" && (
        <input
          type="text"
          value={raw}
          onChange={(e) => commit(e.target.value)}
          placeholder="e.g. */5 or 1,5,10 or 0-30"
          className="w-full bg-bg-field border border-border rounded px-3 py-2 text-text font-mono text-sm"
        />
      )}

      <div className="pt-2 flex justify-between items-center border-t border-border-subtle">
        <code className="text-xs font-mono text-text-muted">{raw}</code>
        <button
          onClick={onDone}
          className="text-xs px-3 py-1 rounded bg-accent text-bg font-medium hover:opacity-90"
        >
          Done
        </button>
      </div>
    </div>
  );
}
