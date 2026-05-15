import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { explainCron } from "@/lib/cron/explain";
import { getNextRuns } from "@/lib/cron/nextRuns";
import { validateCron } from "@/lib/cron/validate";
import { slugToExpression } from "@/lib/cron/urlSlug";
import { findPresetByExpression } from "@/lib/cron/presets";

interface Props {
  params: Promise<{ expression: string }>;
}

// Incremental Static Regeneration — render on demand, cache 24h
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { expression: slug } = await params;
  const expression = slugToExpression(slug);
  const { isValid } = validateCron(expression);

  if (!isValid) {
    return { title: "Invalid cron expression", robots: { index: false } };
  }

  const { human } = explainCron(expression);
  const ogUrl = `/api/og?cron=${encodeURIComponent(expression)}`;
  return {
    title: `${expression} — cron`,
    description: `${expression} explained: ${human}. Open in the cron builder, see the next runs.`,
    alternates: { canonical: `/examples/${slug}` },
    openGraph: {
      title: `Cron: ${expression}`,
      description: human,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: expression,
      description: human,
      images: [ogUrl],
    },
  };
}

function builderHref(expression: string): string {
  const [m, h, dom, mon, dow] = expression.split(/\s+/);
  const qs = new URLSearchParams({
    m: m ?? "*",
    h: h ?? "*",
    dom: dom ?? "*",
    mon: mon ?? "*",
    dow: dow ?? "*",
  });
  return `/?${qs.toString()}`;
}

export default async function ExamplePage({ params }: Props) {
  const { expression: slug } = await params;
  const expression = slugToExpression(slug);
  const { isValid, error } = validateCron(expression);
  if (!isValid) notFound();

  const { human } = explainCron(expression);
  const { runs } = getNextRuns(expression, 10, "UTC");
  const matchingPreset = findPresetByExpression(expression);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `Cron expression: ${expression}`,
    description: human,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="mx-auto max-w-4xl px-4 md:px-6 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>

        <span className="text-[10px] uppercase tracking-wider text-text-dim font-mono">
          Cron expression
        </span>
        <h1 className="mt-2 font-mono text-2xl md:text-4xl font-bold text-text break-all">
          {expression}
        </h1>

        <section
          aria-label="Explanation"
          className="mt-6 rounded-2xl border border-yellow-400/40 bg-gradient-to-b from-yellow-400/[0.06] to-transparent p-6 shadow-[0_0_24px_-12px_rgba(250,204,21,0.35)]"
        >
          <div className="text-[10px] uppercase tracking-wider text-text-dim mb-1">
            In plain English
          </div>
          <p className="font-mono text-base md:text-lg text-yellow-400 font-bold">
            → {human}
          </p>
        </section>

        <section className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={builderHref(expression)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border border-accent/30 bg-gradient-to-b from-accent/15 to-accent/5 text-accent hover:from-accent/25 hover:border-accent/60 hover:text-text transition-all"
          >
            Open in builder →
          </Link>
          {matchingPreset && (
            <Link
              href={`/presets/${matchingPreset.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm border border-border bg-bg-field text-text-muted hover:text-text hover:border-accent/40 transition-colors"
            >
              Matches preset: {matchingPreset.name}
            </Link>
          )}
        </section>

        {runs.length > 0 && (
          <section aria-label="Next runs" className="mt-10">
            <h2 className="text-lg font-semibold text-text mb-4">
              Next 10 runs (UTC)
            </h2>
            <ol className="rounded-xl border border-border bg-bg-panel/60 divide-y divide-border-subtle">
              {runs.map((d, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-mono text-text"
                >
                  <span className="text-text-dim w-6 text-right">{i + 1}.</span>
                  <span>{d.toUTCString()}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {error && (
          <p className="mt-6 text-sm text-red-400/80 font-mono">{error}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
