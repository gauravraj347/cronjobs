import type { CronPreset } from "@/types/cron";

export const PRESETS: CronPreset[] = [
  // ── Intervals ─────────────────────────────────────────
  {
    slug: "every-minute",
    name: "Every minute",
    expression: "* * * * *",
    description: "Runs once every minute, every day.",
    category: "interval",
  },
  {
    slug: "every-2-minutes",
    name: "Every 2 minutes",
    expression: "*/2 * * * *",
    description: "Runs every 2 minutes.",
    category: "interval",
  },
  {
    slug: "every-5-minutes",
    name: "Every 5 minutes",
    expression: "*/5 * * * *",
    description: "Runs every 5 minutes.",
    category: "interval",
  },
  {
    slug: "every-10-minutes",
    name: "Every 10 minutes",
    expression: "*/10 * * * *",
    description: "Runs every 10 minutes.",
    category: "interval",
  },
  {
    slug: "every-15-minutes",
    name: "Every 15 minutes",
    expression: "*/15 * * * *",
    description: "Runs every quarter hour.",
    category: "interval",
  },
  {
    slug: "every-20-minutes",
    name: "Every 20 minutes",
    expression: "*/20 * * * *",
    description: "Runs every 20 minutes.",
    category: "interval",
  },
  {
    slug: "every-30-minutes",
    name: "Every 30 minutes",
    expression: "*/30 * * * *",
    description: "Runs every half hour.",
    category: "interval",
  },
  {
    slug: "every-45-minutes",
    name: "Every 45 minutes",
    expression: "*/45 * * * *",
    description: "Runs every 45 minutes.",
    category: "interval",
  },
  {
    slug: "hourly",
    name: "Every hour",
    expression: "0 * * * *",
    description: "Runs at the top of every hour.",
    category: "common",
  },
  {
    slug: "every-2-hours",
    name: "Every 2 hours",
    expression: "0 */2 * * *",
    description: "Runs every other hour, on the hour.",
    category: "interval",
  },
  {
    slug: "every-3-hours",
    name: "Every 3 hours",
    expression: "0 */3 * * *",
    description: "Runs every 3 hours, on the hour.",
    category: "interval",
  },
  {
    slug: "every-4-hours",
    name: "Every 4 hours",
    expression: "0 */4 * * *",
    description: "Runs every 4 hours, on the hour.",
    category: "interval",
  },
  {
    slug: "every-6-hours",
    name: "Every 6 hours",
    expression: "0 */6 * * *",
    description: "Runs four times a day, every 6 hours.",
    category: "interval",
  },
  {
    slug: "every-8-hours",
    name: "Every 8 hours",
    expression: "0 */8 * * *",
    description: "Runs three times a day, every 8 hours.",
    category: "interval",
  },
  {
    slug: "every-12-hours",
    name: "Every 12 hours",
    expression: "0 */12 * * *",
    description: "Runs twice a day at midnight and noon.",
    category: "interval",
  },

  // ── Times of day ──────────────────────────────────────
  {
    slug: "daily-midnight",
    name: "Daily at midnight",
    expression: "0 0 * * *",
    description: "Runs once a day at 12:00 AM.",
    category: "common",
  },
  {
    slug: "daily-1am",
    name: "Daily at 1 AM",
    expression: "0 1 * * *",
    description: "Runs once a day at 1:00 AM — popular for backups.",
    category: "time",
  },
  {
    slug: "daily-3am",
    name: "Daily at 3 AM",
    expression: "0 3 * * *",
    description: "Runs once a day at 3:00 AM — low traffic window.",
    category: "time",
  },
  {
    slug: "daily-6am",
    name: "Daily at 6 AM",
    expression: "0 6 * * *",
    description: "Runs once a day at 6:00 AM.",
    category: "time",
  },
  {
    slug: "daily-8am",
    name: "Daily at 8 AM",
    expression: "0 8 * * *",
    description: "Runs once a day at 8:00 AM.",
    category: "time",
  },
  {
    slug: "daily-9am",
    name: "Daily at 9 AM",
    expression: "0 9 * * *",
    description: "Runs once a day at 9:00 AM.",
    category: "time",
  },
  {
    slug: "daily-noon",
    name: "Daily at noon",
    expression: "0 12 * * *",
    description: "Runs once a day at 12:00 PM.",
    category: "time",
  },
  {
    slug: "daily-5pm",
    name: "Daily at 5 PM",
    expression: "0 17 * * *",
    description: "Runs once a day at 5:00 PM — end of workday.",
    category: "time",
  },
  {
    slug: "daily-6pm",
    name: "Daily at 6 PM",
    expression: "0 18 * * *",
    description: "Runs once a day at 6:00 PM.",
    category: "time",
  },
  {
    slug: "daily-10pm",
    name: "Daily at 10 PM",
    expression: "0 22 * * *",
    description: "Runs once a day at 10:00 PM.",
    category: "time",
  },
  {
    slug: "twice-daily",
    name: "Twice a day",
    expression: "0 0,12 * * *",
    description: "Runs at midnight and noon.",
    category: "advanced",
  },
  {
    slug: "thrice-daily",
    name: "Three times a day",
    expression: "0 8,14,20 * * *",
    description: "Runs at 8 AM, 2 PM, and 8 PM.",
    category: "advanced",
  },

  // ── Weekday / weekend patterns ────────────────────────
  {
    slug: "weekday-9am",
    name: "Every weekday at 9 AM",
    expression: "0 9 * * 1-5",
    description: "Runs at 9:00 AM Monday through Friday.",
    category: "common",
  },
  {
    slug: "weekday-5pm",
    name: "Every weekday at 5 PM",
    expression: "0 17 * * 1-5",
    description: "Runs at 5:00 PM Monday through Friday.",
    category: "common",
  },
  {
    slug: "weekday-business-hours",
    name: "Hourly during business hours",
    expression: "0 9-17 * * 1-5",
    description: "Runs hourly from 9 AM to 5 PM on weekdays.",
    category: "advanced",
  },
  {
    slug: "every-5m-business-hours",
    name: "Every 5 min during business hours",
    expression: "*/5 9-17 * * 1-5",
    description: "Runs every 5 minutes between 9 AM and 5 PM on weekdays.",
    category: "advanced",
  },
  {
    slug: "every-15m-business-hours",
    name: "Every 15 min during business hours",
    expression: "*/15 9-17 * * 1-5",
    description: "Runs every 15 minutes during weekday business hours.",
    category: "advanced",
  },
  {
    slug: "weekend-only",
    name: "Weekends only",
    expression: "0 10 * * 6,0",
    description: "Runs at 10:00 AM on Saturdays and Sundays.",
    category: "advanced",
  },

  // ── Day of week ───────────────────────────────────────
  {
    slug: "weekly-monday",
    name: "Every Monday at 9 AM",
    expression: "0 9 * * 1",
    description: "Runs every Monday at 9:00 AM.",
    category: "common",
  },
  {
    slug: "weekly-tuesday",
    name: "Every Tuesday at 9 AM",
    expression: "0 9 * * 2",
    description: "Runs every Tuesday at 9:00 AM.",
    category: "time",
  },
  {
    slug: "weekly-wednesday",
    name: "Every Wednesday at 9 AM",
    expression: "0 9 * * 3",
    description: "Runs every Wednesday at 9:00 AM.",
    category: "time",
  },
  {
    slug: "weekly-thursday",
    name: "Every Thursday at 9 AM",
    expression: "0 9 * * 4",
    description: "Runs every Thursday at 9:00 AM.",
    category: "time",
  },
  {
    slug: "weekly-friday",
    name: "Every Friday at 5 PM",
    expression: "0 17 * * 5",
    description: "Runs every Friday at 5:00 PM.",
    category: "common",
  },
  {
    slug: "weekly-saturday",
    name: "Every Saturday at 10 AM",
    expression: "0 10 * * 6",
    description: "Runs every Saturday at 10:00 AM.",
    category: "time",
  },
  {
    slug: "weekly-sunday",
    name: "Every Sunday at midnight",
    expression: "0 0 * * 0",
    description: "Runs every Sunday at midnight.",
    category: "time",
  },

  // ── Day of month / monthly ────────────────────────────
  {
    slug: "first-of-month",
    name: "First day of every month",
    expression: "0 0 1 * *",
    description: "Runs at midnight on the 1st of every month.",
    category: "common",
  },
  {
    slug: "15th-of-month",
    name: "15th of every month",
    expression: "0 9 15 * *",
    description: "Runs at 9:00 AM on the 15th of every month.",
    category: "time",
  },
  {
    slug: "last-day-of-month",
    name: "Last day of month",
    expression: "0 0 L * *",
    description: "Runs at midnight on the last day of each month (Quartz/AWS).",
    category: "advanced",
  },
  {
    slug: "first-and-fifteenth",
    name: "1st and 15th of month",
    expression: "0 9 1,15 * *",
    description: "Runs at 9:00 AM on the 1st and 15th — payroll style.",
    category: "advanced",
  },

  // ── Quarterly / yearly ────────────────────────────────
  {
    slug: "quarterly",
    name: "Quarterly",
    expression: "0 0 1 */3 *",
    description: "Runs at midnight on the 1st day every 3 months.",
    category: "advanced",
  },
  {
    slug: "yearly",
    name: "Once a year (Jan 1)",
    expression: "0 0 1 1 *",
    description: "Runs at midnight on January 1st.",
    category: "common",
  },
  {
    slug: "monthly-first-monday",
    name: "First Monday of month",
    expression: "0 9 1-7 * 1",
    description: "Runs 9 AM on the first Monday of each month.",
    category: "advanced",
  },

  // ── Specific months ───────────────────────────────────
  {
    slug: "january-daily",
    name: "Daily in January",
    expression: "0 9 * 1 *",
    description: "Runs at 9:00 AM every day in January.",
    category: "time",
  },
  {
    slug: "summer-months",
    name: "Daily in summer months",
    expression: "0 9 * 6-8 *",
    description: "Runs at 9:00 AM every day in June, July, and August.",
    category: "advanced",
  },
  {
    slug: "holidays",
    name: "Christmas Day",
    expression: "0 9 25 12 *",
    description: "Runs at 9:00 AM on December 25th every year.",
    category: "time",
  },
];

export function findPresetByExpression(expr: string): CronPreset | undefined {
  return PRESETS.find((p) => p.expression === expr.trim());
}

export function findPresetBySlug(slug: string): CronPreset | undefined {
  return PRESETS.find((p) => p.slug === slug);
}
