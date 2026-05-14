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
  minute: { key: "minute", label: "Minute", min: 0, max: 59 },
  hour: { key: "hour", label: "Hour", min: 0, max: 23 },
  dayOfMonth: { key: "dayOfMonth", label: "Day", min: 1, max: 31 },
  month: {
    key: "month",
    label: "Month",
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
    label: "Weekday",
    min: 0,
    max: 6,
    names: {
      0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed",
      4: "Thu", 5: "Fri", 6: "Sat",
    },
  },
};
