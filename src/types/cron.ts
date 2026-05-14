export type CronFormat = "standard" | "quartz";

export type CronFieldName =
  | "minute"
  | "hour"
  | "dayOfMonth"
  | "month"
  | "dayOfWeek";

export interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export interface CronExpression {
  format: CronFormat;
  fields: CronFields;
  raw: string;
}

export interface ExplainResult {
  human: string;
  isValid: boolean;
  errors: string[];
  nextRuns: Date[];
  timezone: string;
}

export interface CronPreset {
  slug: string;
  name: string;
  expression: string;
  description: string;
  category: "common" | "time" | "interval" | "advanced";
}
