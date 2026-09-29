import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * lib/reverse-stories.ts - server-only markdown story loader.
 *
 * Reads `.md` files from `content/reverse-engineering/`, parses their
 * frontmatter with gray-matter, and exposes typed helpers for the
 * Reverse Engineering story pages (/reverse-engineering/[slug]).
 *
 * Mirrors lib/posts.ts (the blog loader) but with its own content folder so
 * the two sections stay independent. Because these functions use the Node
 * `fs` module, they must only be called from Server Components.
 */

const STORIES_DIR = path.join(process.cwd(), "content", "reverse-engineering");

export interface StoryMeta {
  slug: string;
  title: string;
  date: string; // ISO date from frontmatter (e.g. "2026-08-20")
  description: string;
  tags: string[];
  author: string;
  cover?: string; // cover image path for section/story cards
  excerpt?: string; // short summary (falls back to description)
}

export interface Story extends StoryMeta {
  content: string; // raw markdown body (frontmatter stripped)
  keywords?: string[];
}

interface Frontmatter {
  title?: string;
  date?: string;
  description?: string;
  excerpt?: string;
  tags?: string[];
  author?: string;
  cover?: string;
  keywords?: string[];
}

function validateFrontmatter(fm: Frontmatter, slug: string): StoryMeta {
  if (!fm.title)
    throw new Error(`Story "${slug}" is missing required frontmatter: title`);
  if (!fm.date)
    throw new Error(`Story "${slug}" is missing required frontmatter: date`);
  return {
    slug,
    title: fm.title,
    date: fm.date,
    description: fm.description ?? "",
    excerpt: fm.excerpt ?? fm.description ?? "",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    author: fm.author ?? "Imtiaz Royhan",
    cover: fm.cover,
  };
}

/** List all `.md` files in the stories directory (without extension). */
function getSlugs(): string[] {
  if (!fs.existsSync(STORIES_DIR)) return [];
  return fs
    .readdirSync(STORIES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Get metadata for all stories, sorted newest-first by date. */
export function getAllStories(): StoryMeta[] {
  return getSlugs()
    .map((slug) => {
      const fullPath = path.join(STORIES_DIR, `${slug}.md`);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      return validateFrontmatter(data as Frontmatter, slug);
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Get a single story (metadata + raw markdown body). Returns null if not found. */
export function getStory(slug: string): Story | null {
  const fullPath = path.join(STORIES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const meta = validateFrontmatter(data as Frontmatter, slug);
  return {
    ...meta,
    content,
    keywords: Array.isArray(data.keywords) ? data.keywords : undefined,
  };
}

/** Slugs for `generateStaticParams` (pre-renders every story at build time). */
export function getAllStorySlugs(): string[] {
  return getSlugs();
}

/** Estimate reading time (minutes) from a markdown body. Strips code
 *  blocks and markdown syntax, counts words at ~200 wpm. Mirrors the
 *  helper in lib/posts.ts. */
export function readingTime(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*_>`-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
