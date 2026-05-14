import parser from "cron-parser";

export function validateCron(expression: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    parser.parseExpression(expression);
    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
