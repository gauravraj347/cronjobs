import type { Metadata } from "next";
import { EmbedClient } from "./EmbedClient";

export const metadata: Metadata = {
  title: "Embed — Cron Builder",
  robots: { index: false },
  alternates: { canonical: "/embed" },
};

interface SearchParams {
  cron?: string;
  theme?: "dark" | "light";
}

export default async function EmbedPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const initial = (params.cron ?? "*/5 9 * * 1-5").trim();
  return <EmbedClient initialExpression={initial} />;
}
