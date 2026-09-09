"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";

/**
 * Articles — horizontal-scrolling list of blog posts.
 *
 * Card design (matches the provided reference):
 *   • Transparent container (no card border / background / shadow)
 *   • Rounded cover image at the top with an "Article" pill badge
 *   • Headline below the image (bold, foreground color)
 *   • Meta row: clock icon + "06 min read"  •  calendar icon + "Sep 26, 2026"
 *
 * The posts data (including server-computed reading time) is passed in as
 * props because the blog loader uses the Node `fs` module and can't run in
 * a client component.
 */

interface ArticleCard {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  tags: string[];
  readingTime: number;
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
    const amount = Math.round(el.clientWidth * 0.8) * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (posts.length === 0) return null;

  return (
    <section id="articles" ref={setRef} className="py-4">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Articles</h2>
          <div className="flex items-center gap-3">
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
        className="flex gap-8 overflow-x-auto pb-4 pt-6 snap-x snap-mandatory scroll-smooth -mx-1 px-1 [scrollbar-width:thin]"
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex-shrink-0 w-[300px] sm:w-[360px] snap-start"
          >
            {/* Cover image with "Article" pill badge (transparent card body) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted/30">
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
              {/* "Article" badge — top-right white pill */}
              <span className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-wide shadow-sm">
                Article
              </span>
            </div>

            {/* Headline */}
            <h3 className="mt-4 text-lg sm:text-xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Meta row: clock + read time  •  calendar + date */}
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {String(post.readingTime).padStart(2, "0")} min read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
