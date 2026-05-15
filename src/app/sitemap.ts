import type { MetadataRoute } from "next";
import { PRESETS } from "@/lib/cron/presets";
import { SITE, absoluteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/presets"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/learn"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const presetRoutes: MetadataRoute.Sitemap = PRESETS.map((p) => ({
    url: absoluteUrl(`/presets/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // suppress unused warning while SITE is only referenced indirectly
  void SITE;

  return [...staticRoutes, ...presetRoutes];
}
