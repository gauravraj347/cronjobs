import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRESETS, findPresetBySlug } from "@/lib/cron/presets";
import { explainCron } from "@/lib/cron/explain";
import { getNextRuns } from "@/lib/cron/nextRuns";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRESETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const preset = findPresetBySlug(slug);
  if (!preset) return { title: "Preset not found" };

  const { human } = explainCron(preset.expression);
  const ogUrl = `/api/og?cron=${encodeURIComponent(preset.expression)}&title=${encodeURIComponent(preset.name)}`;
  return {
    title: `Cron: ${preset.name}`,
    description: `${preset.expression} — ${human}. ${preset.description}`,
    keywords: [
      "cron",
      preset.name.toLowerCase(),
      preset.expression,
      preset.category,
    ],
    openGraph: {
      title: `${preset.name} — Cron Builder`,
      description: human,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: preset.name,
      description: human,
      images: [ogUrl],
    },
    alternates: { canonical: `/presets/${preset.slug}` },
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

export default async function PresetDetailPage({ params }: Props) {
  const { slug } = await params;
  const preset = findPresetBySlug(slug);
  if (!preset) notFound();

  const { human, isValid } = explainCron(preset.expression);
  const { runs } = isValid
    ? getNextRuns(preset.expression, 10, "UTC")
    : { runs: [] };

  const related = PRESETS.filter(
    (p) => p.category === preset.category && p.slug !== preset.slug,
  ).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${preset.name} cron expression`,
    description: `${preset.expression} — ${human}`,
    keywords: ["cron", preset.name, preset.expression].join(", "),
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
          href="/presets"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All presets
        </Link>

        <span className="text-[10px] uppercase tracking-wider text-text-dim font-mono">
          {preset.category} preset
        </span>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-text">
          {preset.name}
        </h1>
        <p className="mt-2 text-text-muted">{preset.description}</p>

        <section
          aria-label="Cron expression"
          className="mt-8 rounded-2xl border border-yellow-400/40 bg-gradient-to-b from-yellow-400/[0.06] to-transparent p-6 shadow-[0_0_24px_-12px_rgba(250,204,21,0.35)]"
        >
          <div className="text-[10px] uppercase tracking-wider text-text-dim mb-2">
            Cron expression
          </div>
          <code className="block font-mono text-2xl md:text-3xl text-yellow-400 font-bold">
            {preset.expression}
          </code>
          <div className="mt-4 pt-4 border-t border-border-subtle">
            <div className="text-[10px] uppercase tracking-wider text-text-dim mb-1">
              In plain English
            </div>
            <p className="font-mono text-sm md:text-base text-text">{human}</p>
          </div>
        </section>

        <section aria-label="Open in builder" className="mt-6">
          <Link
            href={builderHref(preset.expression)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border border-accent/30 bg-gradient-to-b from-accent/15 to-accent/5 text-accent hover:from-accent/25 hover:border-accent/60 hover:text-text transition-all"
          >
            Open in builder →
          </Link>
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

        {related.length > 0 && (
          <section aria-label="Related presets" className="mt-12">
            <h2 className="text-lg font-semibold text-text mb-4">
              Other {preset.category} presets
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/presets/${r.slug}`}
                  className="rounded-xl border border-border bg-bg-panel/60 p-4 hover:border-accent/40 hover:bg-bg-panel transition-colors"
                >
                  <div className="font-medium text-text text-sm">{r.name}</div>
                  <code className="mt-2 block font-mono text-xs text-accent">
                    {r.expression}
                  </code>
                  <p className="mt-2 text-xs text-text-muted leading-relaxed">
                    {r.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
