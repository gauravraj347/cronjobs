import { Suspense } from "react";
import { CronBuilder } from "@/components/builder/CronBuilder";
import { CollapsiblePresetSection } from "@/components/presets/CollapsiblePresetSection";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function CronBuilderSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-border bg-bg-panel/40 p-6 md:p-8 min-h-[480px]" />
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <section className="mb-10 md:mb-12 text-center mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-text md:whitespace-nowrap">
            Cron Expression{" "}
            <span className="text-accent">Builder & Explainer</span>
          </h1>
          <p className="mt-4 text-text-muted text-sm md:text-base lg:text-[17px] md:whitespace-nowrap">
            Click any field below to edit it. The explanation, next run times, and shareable URL update instantly.
          </p>
        </section>

        <Suspense fallback={<CronBuilderSkeleton />}>
          <CronBuilder />
        </Suspense>

        <section className="mt-14">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-semibold text-text">
              Common presets
            </h2>
            <span className="text-xs uppercase tracking-wider text-text-muted">
              click to copy &amp; load
            </span>
          </div>
          <CollapsiblePresetSection initialCount={15} />
        </section>
      </main>
      <Footer />
    </>
  );
}
