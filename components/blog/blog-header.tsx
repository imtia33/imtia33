"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";

/**
 * BlogHeader — sticky top bar for the blog section.
 *
 * The main portfolio manages dark mode via an `isDark` state on the home
 * page (defaulting to dark). The blog is a separate route, so this header
 * owns its own theme state, defaulting to dark to match the rest of the site.
 * The toggle persists to localStorage so a reader's choice sticks across
 * posts.
 */

export function BlogHeader() {
  const [isDark, setIsDark] = useState(true);

  // Apply the theme class on mount + when toggled.
  useEffect(() => {
    const stored = localStorage.getItem("blog-theme");
    const dark = stored === null ? true : stored === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("blog-theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to portfolio</span>
          <span className="sm:hidden">Home</span>
        </Link>
        <Link
          href="/blog"
          className="text-sm font-bold hover:text-primary transition-colors"
        >
          Blog
        </Link>
        <button
          onClick={toggle}
          className="p-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
