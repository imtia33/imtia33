import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getAllSlugs, getPost, readingTime } from "@/lib/posts";
import { BlogHeader } from "@/components/blog/blog-header";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { SmoothScroll } from "@/components/blog/smooth-scroll";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://axistro.dev";

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
      <SmoothScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <article itemScope itemType="https://schema.org/BlogPosting">
          {/* Post header — centered editorial layout (title, excerpt, date
              pill badge, then full-width cover image) */}
          <header className="mb-12 text-center">
            <h1
              className="font-light tracking-tight leading-[1.1] text-4xl sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              itemProp="headline"
            >
              {post.title}
            </h1>
            {(post.excerpt || post.description) && (
              <p
                className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed opacity-80"
                style={{ fontFamily: "var(--font-almarai), sans-serif" }}
                itemProp="description"
              >
                {post.excerpt || post.description}
              </p>
            )}
            {/* Date in a pill badge with a calendar icon */}
            <div className="mt-8 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs sm:text-sm font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.date} itemProp="datePublished">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden className="opacity-40">·</span>
                <span>{minutes} min read</span>
                <meta itemProp="author" content={post.author} />
              </span>
            </div>
            {/* Cover image — full width, sharp corners */}
            {post.cover && (
              <div className="mt-10 overflow-hidden">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                  itemProp="image"
                />
              </div>
            )}
          </header>

          {/* Tags row (kept compact, left-aligned with the body) */}
          {post.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
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
