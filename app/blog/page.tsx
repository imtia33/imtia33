import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogHeader } from "@/components/blog/blog-header";
import { SmoothScroll } from "@/components/blog/smooth-scroll";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://imtia33.github.io";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on Appwrite, React Native, delta sync, caching strategy, and backend engineering by Imtiaz Royhan. Markdown-powered with live mermaid diagrams and Chart.js charts.",
  keywords: [
    "Imtiaz Royhan blog",
    "Appwrite tutorials",
    "React Native articles",
    "caching strategy",
    "delta sync",
    "backend engineering blog",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Blog | Imtiaz Royhan",
    description:
      "Articles on Appwrite, React Native, delta sync, caching strategy, and backend engineering.",
    url: `${SITE_URL}/blog`,
    siteName: "Imtiaz Royhan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Imtiaz Royhan",
    description:
      "Articles on Appwrite, React Native, delta sync, caching, and backend engineering.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  // JSON-LD: Blog + ItemList (helps Google index the collection)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog/#blog`,
    url: `${SITE_URL}/blog`,
    name: "Imtiaz Royhan — Blog",
    description:
      "Articles on Appwrite, React Native, delta sync, caching, and backend engineering.",
    publisher: { "@id": `${SITE_URL}/#person` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.slug}#article`,
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: new Date(p.date).toISOString(),
      author: { "@id": `${SITE_URL}/#person` },
    })),
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
        <header className="mb-10 sm:mb-14">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Blog
          </h1>
          <p className="mt-2 text-muted-foreground">
            Notes on building at Appwrite, React Native, and backend
            engineering.
          </p>
        </header>

        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                {post.cover && (
                  <div className="mb-4 overflow-hidden rounded-xl border border-border aspect-[16/9] bg-muted/30">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-muted-foreground leading-relaxed">
                  {post.excerpt || post.description}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
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
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
