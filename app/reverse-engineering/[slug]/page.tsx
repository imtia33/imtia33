import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, KeyRound } from "lucide-react";
import { getAllStorySlugs, getStory, readingTime } from "@/lib/reverse-stories";
import { BlogHeader } from "@/components/blog/blog-header";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { SmoothScroll } from "@/components/blog/smooth-scroll";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://axistro.dev";

/** Pre-render every story at build time (content is hardcoded, no DB). */
export function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }));
}

/** Per-story metadata for SEO + social sharing. */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const story = getStory(slug);
    if (!story) return { title: "Story not found" };
    const url = `${SITE_URL}/reverse-engineering/${slug}`;
    const ogImage = story.cover
      ? story.cover.startsWith("http")
        ? story.cover
        : `${SITE_URL}${story.cover}`
      : `${SITE_URL}/profile.png`;
    return {
      title: story.title,
      description: story.excerpt || story.description,
      keywords: story.keywords ?? story.tags,
      authors: [{ name: story.author, url: SITE_URL }],
      creator: story.author,
      publisher: "Imtiaz Royhan",
      alternates: {
        canonical: url,
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
        title: story.title,
        description: story.excerpt || story.description,
        url,
        siteName: "Imtiaz Royhan",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: story.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: new Date(story.date).toISOString(),
        authors: [story.author],
        tags: story.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: story.title,
        description: story.excerpt || story.description,
        images: [ogImage],
        creator: "@imtia33",
      },
    };
  })();
}

export default async function ReverseStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const url = `${SITE_URL}/reverse-engineering/${slug}`;
  const minutes = readingTime(story.content);
  const ogImage = story.cover
    ? story.cover.startsWith("http")
      ? story.cover
      : `${SITE_URL}${story.cover}`
    : `${SITE_URL}/profile.png`;

  // JSON-LD Article structured data → rich Google results (Article schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: story.title,
    description: story.excerpt || story.description,
    image: [ogImage],
    datePublished: new Date(story.date).toISOString(),
    dateModified: new Date(story.date).toISOString(),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: story.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Imtiaz Royhan",
      image: `${SITE_URL}/profile.png`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: (story.keywords ?? story.tags).join(", "),
    articleSection: "Reverse Engineering",
    wordCount: story.content.split(/\s+/).length,
    url,
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
        <article itemScope itemType="https://schema.org/Article">
          {/* "Reverse Engineering" banner pill */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <KeyRound className="w-3.5 h-3.5" />
              Reverse Engineering · The Story
            </span>
          </div>

          {/* Story header - centered editorial layout (title, excerpt, date
              pill badge, then full-width cover image) */}
          <header className="mb-12 text-center">
            <h1
              className="font-light tracking-tight leading-[1.1] text-4xl sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              itemProp="headline"
            >
              {story.title}
            </h1>
            {(story.excerpt || story.description) && (
              <p
                className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed opacity-80"
                style={{ fontFamily: "var(--font-almarai), sans-serif" }}
                itemProp="description"
              >
                {story.excerpt || story.description}
              </p>
            )}
            {/* Date in a pill badge with a calendar icon */}
            <div className="mt-8 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs sm:text-sm font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={story.date} itemProp="datePublished">
                  {new Date(story.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden className="opacity-40">·</span>
                <span>{minutes} min read</span>
                <meta itemProp="author" content={story.author} />
              </span>
            </div>
            {/* Cover image - full width, sharp corners */}
            {story.cover && (
              <div className="mt-10 overflow-hidden">
                <img
                  src={story.cover}
                  alt={story.title}
                  className="w-full h-auto object-cover"
                  itemProp="image"
                />
              </div>
            )}
          </header>

          {/* Tags row (kept compact, left-aligned with the body) */}
          {story.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Story body - SSR markdown → client-rendered interactive bits */}
          <div itemProp="articleBody">
            <MarkdownRenderer content={story.content} />
          </div>

          {/* Back links */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to portfolio
              </Link>
              <Link
                href="/#reverse-engineering"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <KeyRound className="w-4 h-4" />
                All reverse engineering projects
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
