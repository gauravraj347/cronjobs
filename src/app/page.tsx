import { CronBuilder } from "@/components/builder/CronBuilder";
import { PresetGrid } from "@/components/presets/PresetGrid";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <section className="mb-10 md:mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text">
            Cron Expression{" "}
            <span className="text-accent">Builder & Explainer</span>
          </h1>
          <p className="mt-4 text-text-muted text-base md:text-lg">
            Click any field below to edit it. The explanation, next run times,
            and shareable URL update instantly.
          </p>
        </section>

        <CronBuilder />

        <section className="mt-14">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-semibold text-text">
              Common presets
            </h2>
            <span className="text-xs uppercase tracking-wider text-text-muted">
              click to copy &amp; load
            </span>
          </div>
          <PresetGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
