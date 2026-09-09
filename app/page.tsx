import { HomeClient } from "./home-client";
import { getAllPosts } from "@/lib/posts";

/**
 * Home page (Server Component).
 *
 * Fetches the latest blog posts server-side (via the Node `fs`-based loader)
 * and passes them to the client Home component for the "Articles" section.
 * The rest of the page (Lenis smooth scroll, theme toggle, section refs) is
 * client-side and lives in home-client.tsx.
 */
export default function Page() {
  const posts = getAllPosts().slice(0, 6).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt || p.description,
    cover: p.cover,
    tags: p.tags,
  }));

  return <HomeClient posts={posts} />;
}
