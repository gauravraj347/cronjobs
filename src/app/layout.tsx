import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cron Expression Builder & Explainer",
    template: "%s · Cron Builder",
  },
  description:
    "Visually build, validate, and understand cron expressions in real time. Free, fast, and open.",
  keywords: [
    "cron",
    "cron expression",
    "cron builder",
    "cron generator",
    "cron parser",
    "crontab",
    "schedule",
  ],
  openGraph: {
    title: "Cron Expression Builder & Explainer",
    description:
      "Visually build, validate, and understand cron expressions in real time.",
    type: "website",
    images: [
      {
        url: "/api/og?cron=*%2F5+9+*+*+1-5&title=Build+cron+expressions+visually",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cron Expression Builder & Explainer",
    description:
      "Visually build, validate, and understand cron expressions in real time.",
    images: [
      "/api/og?cron=*%2F5+9+*+*+1-5&title=Build+cron+expressions+visually",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-bg text-text antialiased">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
