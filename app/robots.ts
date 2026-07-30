import type { MetadataRoute } from "next";

// Required for `output: 'export'` — emit a static robots.txt at build time.
export const dynamic = "force-static";

const BASE = "https://solace-by-fia.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
