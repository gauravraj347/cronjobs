"use client";

import * as Popover from "@radix-ui/react-popover";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FIELD_META } from "@/lib/cron/fieldMeta";
import type { CronFieldName } from "@/types/cron";
import { FieldEditor } from "./FieldEditor";

interface Props {
  fieldKey: CronFieldName;
  value: string;
  onChange: (value: string) => void;
}

export function CronField({ fieldKey, value, onChange }: Props) {
  const meta = FIELD_META[fieldKey];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-label={`Edit ${meta.label} field, current value ${value}`}
            className={cn(
              "relative min-w-[88px] h-[72px] px-4 rounded-field",
              "bg-bg-field hover:bg-bg-fieldHover transition-colors",
              "border border-border shadow-field",
              "font-mono text-2xl text-text",
              "flex items-center justify-center",
              "focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-bg",
              open && "ring-2 ring-accent/60 ring-offset-2 ring-offset-bg",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={value}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {value}
              </motion.span>
            </AnimatePresence>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            align="center"
            className={cn(
              "z-50 w-[320px] rounded-xl border border-border",
              "bg-bg-panel shadow-panel p-4",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
            )}
          >
            <FieldEditor
              fieldKey={fieldKey}
              value={value}
              onChange={(v) => {
                onChange(v);
              }}
              onDone={() => setOpen(false)}
            />
            <Popover.Arrow className="fill-bg-panel" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <span className="text-xs uppercase tracking-wider text-text-muted">
        {meta.label}
      </span>
    </div>
  );
}
