export const SITE = {
  name: "Cron Expression Builder",
  shortName: "cronbuilder",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "https://cronbuilder.app",
  description:
    "Visually build, validate, and understand cron expressions in real time. Free, fast, and open.",
} as const;

export function absoluteUrl(path: string): string {
  const base = SITE.url.startsWith("http") ? SITE.url : `https://${SITE.url}`;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
