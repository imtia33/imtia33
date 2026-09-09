import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPost } from "@/lib/posts";
import { BlogHeader } from "@/components/blog/blog-header";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

/**
 * Pre-render every post at build time. Content is hardcoded in the repo
 * (no database), so static generation is the natural fit.
 */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Per-post metadata for SEO + social sharing. */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: "Post not found" };
    return {
      title: `${post.title} | Imtiaz Royhan`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
    };
  })();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <article>
          {/* Post header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            )}
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post body — SSR markdown → client-rendered interactive bits */}
          <MarkdownRenderer content={post.content} />

          {/* Back link */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
