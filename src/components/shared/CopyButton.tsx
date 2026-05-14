"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  className,
  label = "Copy",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handle() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  }

  return (
    <button
      onClick={handle}
      aria-label={`${label} ${text}`}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md",
        "bg-bg-field border border-border text-text-muted hover:text-text hover:border-accent/40",
        "text-xs font-medium transition-colors",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-accent-green" /> Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" /> {label}
        </>
      )}
    </button>
  );
}
