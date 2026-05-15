import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LESSONS } from "@/lib/learn/lessons";

export const metadata: Metadata = {
  title: "Learn cron",
  description:
    "Short, focused lessons covering everything you need to know about cron expressions: the five fields, special characters, intervals, ranges, lists, timezones, and common mistakes.",
  alternates: { canonical: "/learn" },
};

export default function LearnHubPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-14">
        <header className="max-w-2xl">
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-text-dim font-mono">
            6 lessons · ~20 min
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-text">
            Learn cron <span className="text-accent">properly</span>.
          </h1>
          <p className="mt-4 text-text-muted text-base md:text-lg leading-relaxed">
            Short, focused lessons. Each one teaches a single concept with live
            cron examples you can open straight in the builder.
          </p>
        </header>

        <ol className="mt-12 grid sm:grid-cols-2 gap-4">
          {LESSONS.map((lesson, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={lesson.slug}>
                <Link
                  href={`/learn/${lesson.slug}`}
                  className="
                    group relative flex flex-col gap-4 h-full p-5 md:p-6 rounded-2xl
                    border border-border bg-bg-panel/60 backdrop-blur
                    transition-all duration-200
                    hover:bg-bg-panel hover:border-accent/40 hover:-translate-y-0.5
                  "
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono font-bold leading-none text-5xl md:text-6xl text-text-dim group-hover:text-text transition-colors">
                      {num}
                    </span>
                    <ArrowUpRight
                      className="w-5 h-5 text-text-dim group-hover:text-accent transition-colors"
                      strokeWidth={2}
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-semibold text-text leading-snug">
                      {lesson.title}
                    </h2>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {lesson.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-subtle">
                    <span className="text-[10px] uppercase tracking-wider text-text-dim font-mono">
                      Example
                    </span>
                    <code className="mt-1 block font-mono text-sm md:text-base font-semibold text-text">
                      {lesson.previewCron}
                    </code>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        <section className="mt-12 rounded-2xl border border-border-subtle bg-bg-panel/40 p-6 md:p-8 text-center">
          <h2 className="text-xl font-semibold text-text">
            Done reading? Build something.
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            The fastest way to internalize cron is to play with it.
          </p>
          <Link
            href="/"
            className="
              mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold
              border border-accent/30 bg-gradient-to-b from-accent/15 to-accent/5 text-accent
              hover:from-accent/25 hover:border-accent/60 hover:text-text transition-all
            "
          >
            Open the builder <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
