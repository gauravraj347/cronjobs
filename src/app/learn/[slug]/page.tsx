import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LESSONS, findLesson } from "@/lib/learn/lessons";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = findLesson(slug);
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: lesson.title,
    description: lesson.summary,
    alternates: { canonical: `/learn/${lesson.slug}` },
    openGraph: {
      title: `${lesson.title} — Learn cron`,
      description: lesson.summary,
      type: "article",
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

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = findLesson(slug);
  if (!lesson) notFound();

  const idx = LESSONS.findIndex((l) => l.slug === slug);
  const prev = idx > 0 ? LESSONS[idx - 1] : undefined;
  const next = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.summary,
    learningResourceType: "Lesson",
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All lessons
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-bg-field border border-border text-xl">
            {lesson.emoji}
          </span>
          <span className="text-xs text-text-dim font-mono uppercase tracking-wider">
            Lesson {idx + 1} of {LESSONS.length}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text">
          {lesson.title}
        </h1>
        <p className="mt-2 text-text-muted">{lesson.summary}</p>

        <article className="mt-8 space-y-5 prose-invert">
          {lesson.sections.map((s, i) => {
            if (s.type === "p") {
              return (
                <p
                  key={i}
                  className="text-text leading-relaxed text-[15px]"
                >
                  {s.text}
                </p>
              );
            }
            if (s.type === "h2") {
              return (
                <h2
                  key={i}
                  className="text-lg md:text-xl font-semibold text-text mt-8"
                >
                  {s.text}
                </h2>
              );
            }
            if (s.type === "list") {
              return (
                <ul key={i} className="space-y-1.5">
                  {s.items.map((it, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-text leading-relaxed text-[15px]"
                    >
                      <span className="text-accent shrink-0">›</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            // code block
            return (
              <div
                key={i}
                className="rounded-xl border border-yellow-400/30 bg-gradient-to-b from-yellow-400/[0.05] to-transparent p-4"
              >
                <code className="block font-mono text-base md:text-lg text-yellow-400 font-bold">
                  {s.expression}
                </code>
                <p className="mt-2 font-mono text-xs text-text-muted">
                  → {s.explain}
                </p>
                <Link
                  href={builderHref(s.expression)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent hover:text-text"
                >
                  Try in builder →
                </Link>
              </div>
            );
          })}
        </article>

        <nav
          aria-label="Lesson navigation"
          className="mt-12 grid grid-cols-2 gap-3"
        >
          {prev ? (
            <Link
              href={`/learn/${prev.slug}`}
              className="rounded-xl border border-border bg-bg-panel/60 p-4 hover:border-accent/40 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-wider text-text-dim mb-1">
                ← Previous
              </div>
              <div className="text-sm font-medium text-text">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/learn/${next.slug}`}
              className="rounded-xl border border-border bg-bg-panel/60 p-4 hover:border-accent/40 transition-colors text-right"
            >
              <div className="text-[10px] uppercase tracking-wider text-text-dim mb-1">
                Next →
              </div>
              <div className="text-sm font-medium text-text">{next.title}</div>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
