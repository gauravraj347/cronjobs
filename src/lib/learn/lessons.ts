export type LessonAccent = "yellow" | "blue" | "green" | "pink" | "cyan" | "orange";

export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  emoji: string;
  accent: LessonAccent;
  /** A representative cron expression shown on the lesson card */
  previewCron: string;
  /** Difficulty / category label shown as a chip on the card */
  tag: string;
  /** Markdown-ish content rendered with simple block components */
  sections: LessonSection[];
}

export type LessonSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; expression: string; explain: string }
  | { type: "list"; items: string[] };

export const LESSONS: Lesson[] = [
  {
    slug: "cron-basics",
    title: "Cron basics — the 5 fields",
    summary:
      "What each position in a standard cron expression means, with examples.",
    emoji: "⏱",
    accent: "yellow",
    tag: "Beginner",
    previewCron: "0 9 * * 1-5",
    sections: [
      {
        type: "p",
        text: "A standard cron expression has five space-separated fields. Each field controls a different unit of time.",
      },
      {
        type: "code",
        expression: "0 9 * * 1-5",
        explain: "9:00 AM, Monday through Friday",
      },
      { type: "h2", text: "The five positions" },
      {
        type: "list",
        items: [
          "Position 1 — minute (0–59)",
          "Position 2 — hour (0–23, 24-hour clock)",
          "Position 3 — day of month (1–31)",
          "Position 4 — month (1–12)",
          "Position 5 — day of week (0–6, where 0 is Sunday)",
        ],
      },
      {
        type: "p",
        text: "If you leave a field as *, it matches every value. So 0 * * * * means \"at minute 0 of every hour\" — i.e. hourly on the hour.",
      },
    ],
  },
  {
    slug: "special-characters",
    title: "Special characters: * / , - L W #",
    summary:
      "The full vocabulary of cron — wildcards, intervals, ranges, lists, and dialect extras.",
    emoji: "✱",
    accent: "blue",
    tag: "Reference",
    previewCron: "*/15 9-17 * * 1-5",
    sections: [
      { type: "h2", text: "Standard tokens" },
      {
        type: "list",
        items: [
          "*  — any value (every minute, every hour, etc.)",
          "*/n — every n units (*/5 in the minute field = every 5 minutes)",
          "a-b — a range from a to b inclusive (9-17 = 9 AM through 5 PM)",
          "a,b,c — a list of specific values (0,15,30,45 in the minute field)",
        ],
      },
      { type: "h2", text: "Dialect extras (Quartz / AWS / Spring)" },
      {
        type: "list",
        items: [
          "L — last day of the month or last weekday",
          "W — nearest weekday to the given day of month",
          "# — the Nth weekday of the month (e.g. 2#1 = first Monday)",
          "? — used in place of * for day-of-month or day-of-week",
        ],
      },
      {
        type: "code",
        expression: "*/15 9-17 * * 1-5",
        explain: "Every 15 minutes from 9 AM to 5 PM on weekdays",
      },
    ],
  },
  {
    slug: "intervals-and-steps",
    title: "Intervals and step values (*/n)",
    summary:
      "How to schedule tasks at fixed intervals — every 5 minutes, every 3 hours, every other day.",
    emoji: "🔁",
    accent: "green",
    tag: "Beginner",
    previewCron: "*/5 * * * *",
    sections: [
      {
        type: "p",
        text: "The step operator */n tells cron to fire every n units within whatever range the field allows. */5 in the minute field means \"every 5 minutes starting at 0\".",
      },
      {
        type: "code",
        expression: "*/5 * * * *",
        explain: "Every 5 minutes",
      },
      {
        type: "code",
        expression: "0 */3 * * *",
        explain: "Every 3 hours, on the hour",
      },
      { type: "h2", text: "Step gotchas" },
      {
        type: "list",
        items: [
          "*/7 in the minute field does NOT spread evenly — it fires at 0, 7, 14, 21, 28, 35, 42, 49, 56, then jumps back to 0 (only 4 minutes later).",
          "If you need exactly N evenly spaced runs per hour, use a list like 0,15,30,45 instead of */15.",
          "Step values are relative to the field range start, not the current time.",
        ],
      },
    ],
  },
  {
    slug: "ranges-and-lists",
    title: "Ranges (a-b) and lists (a,b,c)",
    summary:
      "When to use range syntax vs comma-separated lists — and how they combine.",
    emoji: "📏",
    accent: "cyan",
    tag: "Intermediate",
    previewCron: "0 9 * * 1,3,5",
    sections: [
      {
        type: "p",
        text: "Ranges and lists let you specify exactly which values trigger the job. They can also be combined for advanced patterns.",
      },
      {
        type: "code",
        expression: "0 9 * * 1-5",
        explain: "9 AM, Monday through Friday (range)",
      },
      {
        type: "code",
        expression: "0 9 * * 1,3,5",
        explain: "9 AM, Mon/Wed/Fri only (list)",
      },
      {
        type: "code",
        expression: "0 9-12,14-17 * * *",
        explain: "Hourly 9–12 AM and 2–5 PM (combining ranges and lists)",
      },
      { type: "h2", text: "When to use which" },
      {
        type: "list",
        items: [
          "Use a-b when the values are contiguous (1-5 for weekdays).",
          "Use a,b,c when they aren't (1,3,5 for Mon/Wed/Fri).",
          "Combine with commas: 1-3,5 means 1, 2, 3, and 5.",
        ],
      },
    ],
  },
  {
    slug: "am-pm-and-24-hour",
    title: "AM/PM, 24-hour clock, and timezones",
    summary:
      "Cron uses 24-hour time and your server's timezone by default — here's how to think about it.",
    emoji: "🕘",
    accent: "orange",
    tag: "Gotchas",
    previewCron: "0 17 * * *",
    sections: [
      {
        type: "p",
        text: "Cron expressions don't have AM/PM. The hour field is 0–23 in 24-hour time. 0 = midnight, 12 = noon, 17 = 5 PM, 23 = 11 PM.",
      },
      {
        type: "code",
        expression: "0 17 * * *",
        explain: "Every day at 5:00 PM",
      },
      { type: "h2", text: "Timezone behavior" },
      {
        type: "list",
        items: [
          "Standard Unix cron runs in the server's local timezone — whatever the OS is set to.",
          "Most cloud schedulers (AWS EventBridge, GCP Cloud Scheduler, Vercel Cron) default to UTC.",
          "Quartz and Spring let you specify a timezone explicitly per job.",
          "Always check your platform's docs — the same expression can fire at different wall-clock times depending on TZ.",
        ],
      },
      {
        type: "p",
        text: "The \"Next runs\" panel on this site uses your browser's local timezone for display, but the underlying expression is timezone-agnostic.",
      },
    ],
  },
  {
    slug: "common-mistakes",
    title: "Common mistakes & how to avoid them",
    summary:
      "Off-by-one errors, conflicting day fields, and other traps that bite beginners.",
    emoji: "🐛",
    accent: "pink",
    tag: "Pro tips",
    previewCron: "* 9 * * *",
    sections: [
      { type: "h2", text: "Day-of-month vs day-of-week conflict" },
      {
        type: "p",
        text: "When you set BOTH the day-of-month field and the day-of-week field to non-* values, behavior is dialect-dependent: Unix cron uses an OR (fires if either matches), but Quartz requires you to use ? in one of them.",
      },
      {
        type: "code",
        expression: "0 9 15 * 1",
        explain:
          "In Unix cron: 9 AM on the 15th OR every Monday. In Quartz: error.",
      },
      { type: "h2", text: "Step value confusion" },
      {
        type: "p",
        text: "*/7 in minutes does not fire 7 times an hour — it fires at minute 0, 7, 14, 21, 28, 35, 42, 49, 56 (9 times), then 0 again. The gap between :56 and :00 is only 4 minutes.",
      },
      { type: "h2", text: "Sunday: 0 or 7?" },
      {
        type: "p",
        text: "Most cron flavours accept both 0 and 7 as Sunday in the day-of-week field. To stay portable, prefer 0.",
      },
      { type: "h2", text: "Forgetting the minute" },
      {
        type: "code",
        expression: "* 9 * * *",
        explain:
          "This runs every minute from 9:00 to 9:59. You probably meant 0 9 * * * (once at 9:00).",
      },
    ],
  },
];

export function findLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}
