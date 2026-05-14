export function Footer() {
  return (
    <footer className="mt-16 border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 text-xs text-text-muted flex flex-wrap items-center justify-between gap-3">
        <p>
          Built with Next.js, React, TypeScript & Tailwind. No tracking, no
          ads.
        </p>
        <p className="font-mono text-text-dim">
          v0.1.0 · MVP
        </p>
      </div>
    </footer>
  );
}
