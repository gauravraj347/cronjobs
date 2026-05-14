import type { CronFieldName } from "@/types/cron";

export interface FieldMeta {
  key: CronFieldName;
  label: string;
  min: number;
  max: number;
  names?: Record<number, string>;
}

export const FIELD_ORDER: CronFieldName[] = [
  "minute",
  "hour",
  "dayOfMonth",
  "month",
  "dayOfWeek",
];

export const FIELD_META: Record<CronFieldName, FieldMeta> = {
  minute: { key: "minute", label: "MIN", min: 0, max: 59 },
  hour: { key: "hour", label: "HOUR", min: 0, max: 23 },
  dayOfMonth: { key: "dayOfMonth", label: "DAY", min: 1, max: 31 },
  month: {
    key: "month",
    label: "MONTH",
    min: 1,
    max: 12,
    names: {
      1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
      5: "May", 6: "Jun", 7: "Jul", 8: "Aug",
      9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
    },
  },
  dayOfWeek: {
    key: "dayOfWeek",
    label: "WEEKDAY",
    min: 0,
    max: 6,
    names: {
      0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed",
      4: "Thu", 5: "Fri", 6: "Sat",
    },
  },
};
