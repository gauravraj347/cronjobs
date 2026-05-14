import type { CronFields } from "@/types/cron";

export function stringifyCron(fields: CronFields): string {
  return [
    fields.minute,
    fields.hour,
    fields.dayOfMonth,
    fields.month,
    fields.dayOfWeek,
  ]
    .map((p) => (p && p.trim().length > 0 ? p.trim() : "*"))
    .join(" ");
}
