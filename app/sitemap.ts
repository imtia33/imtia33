import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";
import { getAllStorySlugs } from "@/lib/reverse-stories";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://axistro.dev";

/**
 * sitemap.ts - auto-generated sitemap.xml for Google indexing.
 *
 * Includes the home page, blog listing, every blog post, and every reverse
 * engineering story page. Posts/stories get a higher priority + lastModified
 * date so Google knows they're fresh content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const postPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const storyPages: MetadataRoute.Sitemap = getAllStorySlugs().map((slug) => ({
    url: `${SITE_URL}/reverse-engineering/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...postPages, ...storyPages];
}
