"use client";

import { create } from "zustand";
import type { CronFields, CronFieldName } from "@/types/cron";
import { DEFAULT_FIELDS } from "@/lib/cron/parse";
import { stringifyCron } from "@/lib/cron/stringify";

interface CronStore {
  fields: CronFields;
  setField: (key: CronFieldName, value: string) => void;
  setAll: (fields: CronFields) => void;
  setFromExpression: (expr: string) => void;
  reset: () => void;
  expression: () => string;
}

export const useCronStore = create<CronStore>((set, get) => ({
  fields: { ...DEFAULT_FIELDS },
  setField: (key, value) =>
    set((s) => ({ fields: { ...s.fields, [key]: value || "*" } })),
  setAll: (fields) => set({ fields: { ...fields } }),
  setFromExpression: (expr) => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length === 5) {
      set({
        fields: {
          minute: parts[0],
          hour: parts[1],
          dayOfMonth: parts[2],
          month: parts[3],
          dayOfWeek: parts[4],
        },
      });
    }
  },
  reset: () => set({ fields: { ...DEFAULT_FIELDS } }),
  expression: () => stringifyCron(get().fields),
}));
