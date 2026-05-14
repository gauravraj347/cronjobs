"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "default" | "premium" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZE_STYLES: Record<Size, { wrap: string; icon: string }> = {
  sm: { wrap: "px-2.5 py-1 text-xs gap-1.5", icon: "w-3 h-3" },
  md: { wrap: "px-3 py-1.5 text-xs gap-2", icon: "w-3.5 h-3.5" },
  lg: { wrap: "px-5 py-2.5 text-sm gap-2.5 font-semibold", icon: "w-4 h-4" },
};

export function CopyButton({
  text,
  className,
  label = "Copy",
  variant = "default",
  size = "md",
  showText = false,
}: {
  text: string;
  className?: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  showText?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handle() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  const variants: Record<Variant, string> = {
    default:
      "bg-bg-field border border-border text-text-muted hover:text-text hover:border-accent/40",
    premium: cn(
      "relative isolate overflow-hidden",
      "bg-gradient-to-b from-accent/15 to-accent/5",
      "border border-accent/30 text-accent",
      "hover:from-accent/25 hover:to-accent/10 hover:border-accent/60 hover:text-text",
      "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_0_24px_-12px_rgba(124,156,255,0.5)]",
    ),
    ghost:
      "bg-transparent border border-transparent text-text-muted hover:text-text hover:bg-bg-field",
  };

  const sz = SIZE_STYLES[size];

  return (
    <button
      onClick={handle}
      aria-label={`${label} ${text}`}
      className={cn(
        "group inline-flex items-center rounded-md font-medium",
        "transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-bg",
        sz.wrap,
        variants[variant],
        className,
      )}
    >
      {showText && (
        <code className="font-mono text-[12px] tracking-tight">{text}</code>
      )}
      <span className={cn("relative", sz.icon)}>
        <Copy
          className={cn(
            "absolute inset-0 transition-all duration-200",
            sz.icon,
            copied ? "opacity-0 scale-50 rotate-12" : "opacity-100 scale-100",
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 text-accent-green transition-all duration-200",
            sz.icon,
            copied ? "opacity-100 scale-100" : "opacity-0 scale-50 -rotate-12",
          )}
        />
      </span>
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}
