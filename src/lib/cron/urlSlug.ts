/**
 * Encode a cron expression into a URL-safe slug.
 * Star/space/slash/comma map to safe characters; reversible via decode.
 */
export function expressionToSlug(expression: string): string {
  return expression
    .trim()
    .replace(/\s+/g, "_") // fields separated by underscore
    .replace(/\*/g, "S") // * → S (star)
    .replace(/\//g, "x") // / → x
    .replace(/,/g, "-c-"); // , → -c- (preserved across decode)
}

export function slugToExpression(slug: string): string {
  return slug
    .replace(/-c-/g, ",")
    .replace(/x/g, "/")
    .replace(/S/g, "*")
    .replace(/_/g, " ");
}
