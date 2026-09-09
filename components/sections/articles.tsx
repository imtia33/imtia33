"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Articles — horizontal-scrolling list of blog posts with cover images.
 *
 * Rendered on the landing page before the Works section. The posts data is
 * fetched server-side (in the page) and passed in as props because the blog
 * loader uses the Node `fs` module and can't run in a client component.
 */

interface ArticleCard {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  tags: string[];
}

interface ArticlesProps {
  setRef: (el: HTMLElement | null) => void;
  posts: ArticleCard[];
}

export function Articles({ setRef, posts }: ArticlesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll ~80% of the visible width per click.
    const amount = Math.round(el.clientWidth * 0.8) * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (posts.length === 0) return null;

  return (
    <section id="articles" ref={setRef} className="py-4">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Articles</h2>
          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View all →
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => scrollBy("left")}
                className="p-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                aria-label="Scroll articles left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBy("right")}
                className="p-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                aria-label="Scroll articles right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth -mx-1 px-1 [scrollbar-width:thin]"
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex-shrink-0 w-[280px] sm:w-[340px] snap-start rounded-2xl border border-border/40 overflow-hidden hover:border-primary/30 transition-all duration-300 bg-card"
          >
            {/* Cover image */}
            <div className="aspect-[16/9] overflow-hidden bg-muted/30">
              {post.cover ? (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  No cover
                </div>
              )}
            </div>
            {/* Body */}
            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
