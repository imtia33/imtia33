import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPost } from "@/lib/posts";
import { BlogHeader } from "@/components/blog/blog-header";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://imtia33.github.io";

/** Pre-render every post at build time (content is hardcoded, no DB). */
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
    const url = `${SITE_URL}/blog/${slug}`;
    const ogImage = post.cover
      ? post.cover.startsWith("http")
        ? post.cover
        : `${SITE_URL}${post.cover}`
      : `${SITE_URL}/profile.png`;
    return {
      title: post.title,
      description: post.excerpt || post.description,
      keywords: post.keywords ?? post.tags,
      authors: [{ name: post.author, url: SITE_URL }],
      creator: post.author,
      publisher: "Imtiaz Royhan",
      alternates: {
        canonical: post.canonical || url,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
      openGraph: {
        title: post.title,
        description: post.excerpt || post.description,
        url,
        siteName: "Imtiaz Royhan",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: new Date(post.date).toISOString(),
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || post.description,
        images: [ogImage],
        creator: "@imtia33",
      },
    };
  })();
}

/** Estimate reading time from markdown body (words / 200 wpm). */
function readingTime(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ") // strip code blocks
    .replace(/[#*_>`-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const minutes = readingTime(post.content);
  const ogImage = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${SITE_URL}${post.cover}`
    : `${SITE_URL}/profile.png`;

  // JSON-LD Article structured data → rich Google results (Article schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt || post.description,
    image: [ogImage],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Imtiaz Royhan",
      url: SITE_URL,
      image: `${SITE_URL}/profile.png`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: (post.keywords ?? post.tags).join(", "),
    articleSection: "Technology",
    wordCount: post.content.split(/\s+/).length,
    url,
    isPartOf: { "@id": `${SITE_URL}/blog/#blog` },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <article itemScope itemType="https://schema.org/BlogPosting">
          {/* Post header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <time dateTime={post.date} itemProp="datePublished">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span itemProp="author">{post.author}</span>
              <span>·</span>
              <span>{minutes} min read</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
              itemProp="headline"
            >
              {post.title}
            </h1>
            {(post.excerpt || post.description) && (
              <p
                className="mt-3 text-lg text-muted-foreground leading-relaxed"
                itemProp="description"
              >
                {post.excerpt || post.description}
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
            {post.cover && (
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                  itemProp="image"
                />
              </div>
            )}
          </header>

          {/* Post body — SSR markdown → client-rendered interactive bits */}
          <div itemProp="articleBody">
            <MarkdownRenderer content={post.content} />
          </div>

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
