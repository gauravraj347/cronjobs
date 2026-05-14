import cronstrue from "cronstrue";

export function explainCron(expression: string, locale = "en"): {
  human: string;
  isValid: boolean;
  error?: string;
} {
  try {
    const human = cronstrue.toString(expression, {
      throwExceptionOnParseError: true,
      use24HourTimeFormat: false,
      locale,
    });
    return { human, isValid: true };
  } catch (err) {
    return {
      human: "Invalid cron expression",
      isValid: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
