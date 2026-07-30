import type { MetadataRoute } from "next";
import { getAll } from "@/lib/products";

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

const BASE = "https://solace-by-fia.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes with sensible crawl priorities.
  const routes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/shop", priority: 0.9, changeFrequency: "daily" },
    { path: "/new-arrivals", priority: 0.8, changeFrequency: "daily" },
    { path: "/clearance", priority: 0.8, changeFrequency: "daily" },
    { path: "/reviews", priority: 0.5, changeFrequency: "weekly" },
    { path: "/about", priority: 0.4, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // One entry per product, pulled from Sanity (same source the pages use).
  const productEntries: MetadataRoute.Sitemap = getAll().map((p) => ({
    url: `${BASE}/product/${p.code}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
