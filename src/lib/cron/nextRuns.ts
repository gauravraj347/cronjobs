import parser from "cron-parser";

export function getNextRuns(
  expression: string,
  count = 5,
  tz?: string,
): { runs: Date[]; error?: string } {
  try {
    const interval = parser.parseExpression(expression, {
      currentDate: new Date(),
      tz: tz,
    });
    const runs: Date[] = [];
    for (let i = 0; i < count; i++) {
      runs.push(interval.next().toDate());
    }
    return { runs };
  } catch (err) {
    return {
      runs: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
