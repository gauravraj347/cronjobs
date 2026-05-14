import Link from "next/link";
import { Clock } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border-subtle bg-bg/60 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-accent/15 text-accent">
            <Clock className="w-4 h-4" />
          </span>
          <span className="font-semibold text-text group-hover:text-accent transition-colors">
            cronbuilder
          </span>
          <span className="text-text-dim text-xs font-mono">.app</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-text-muted">
          <Link href="/" className="hover:text-text">
            Builder
          </Link>
          <Link href="/presets" className="hover:text-text">
            Presets
          </Link>
          <a
            href="https://en.wikipedia.org/wiki/Cron"
            target="_blank"
            rel="noreferrer"
            className="hover:text-text"
          >
            About cron
          </a>
        </nav>
      </div>
    </header>
  );
}
