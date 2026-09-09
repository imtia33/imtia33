import { HomeClient } from "./home-client";
import { getAllPosts, getPost, readingTime } from "@/lib/posts";

/**
 * Home page (Server Component).
 *
 * Fetches the latest blog posts server-side (via the Node `fs`-based loader)
 * and passes them to the client Home component for the "Articles" section.
 * Reading time is computed server-side from the full markdown body so the
 * client cards can show "06 min read" without shipping the post content.
 */
export default function Page() {
  const posts = getAllPosts().slice(0, 6).map((meta) => {
    const full = getPost(meta.slug);
    const minutes = full ? readingTime(full.content) : 1;
    return {
      slug: meta.slug,
      title: meta.title,
      date: meta.date,
      excerpt: meta.excerpt || meta.description,
      cover: meta.cover,
      tags: meta.tags,
      readingTime: minutes,
    };
  });

  return <HomeClient posts={posts} />;
}
