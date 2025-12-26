import type { MetadataRoute } from "next";

function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) return new URL(raw);
  return new URL("http://localhost:3000");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  return [
    {
      url: new URL("/", url).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

