import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PresetGrid } from "@/components/presets/PresetGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cron presets — 20 common expressions",
  description:
    "A gallery of 20 ready-made cron expressions for the most common scheduling needs.",
};

export default function PresetsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text">
          Cron presets
        </h1>
        <p className="mt-3 text-text-muted max-w-2xl">
          Pick any pattern to load it into the builder. Each preset is a
          standard 5-field cron expression.
        </p>
        <div className="mt-8">
          <PresetGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
