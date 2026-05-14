import type { CronFields } from "@/types/cron";

export const DEFAULT_FIELDS: CronFields = {
  minute: "*",
  hour: "*",
  dayOfMonth: "*",
  month: "*",
  dayOfWeek: "*",
};

export function parseCron(raw: string): CronFields {
  const parts = raw.trim().split(/\s+/);
  if (parts.length !== 5) return { ...DEFAULT_FIELDS };
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  return { minute, hour, dayOfMonth, month, dayOfWeek };
}
