import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * lib/posts.ts — server-only markdown post loader.
 *
 * Reads `.md` files from `content/blog/`, parses their frontmatter with
 * gray-matter, and exposes typed helpers for the blog listing + post pages.
 *
 * No database. Content is hardcoded into the repo (as requested). Because
 * these functions use the Node `fs` module, they must only be called from
 * Server Components / server-side code — never from a Client Component.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO string from frontmatter (e.g. "2026-09-08")
  description: string;
  tags: string[];
  author: string;
}

export interface Post extends PostMeta {
  content: string; // raw markdown body (frontmatter stripped)
}

/** Raw shape of the frontmatter we expect in each .md file. */
interface Frontmatter {
  title?: string;
  date?: string;
  description?: string;
  tags?: string[];
  author?: string;
}

function validateFrontmatter(fm: Frontmatter, slug: string): PostMeta {
  if (!fm.title) throw new Error(`Post "${slug}" is missing required frontmatter: title`);
  if (!fm.date) throw new Error(`Post "${slug}" is missing required frontmatter: date`);
  return {
    slug,
    title: fm.title,
    date: fm.date,
    description: fm.description ?? "",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    author: fm.author ?? "Imtiaz Royhan",
  };
}

/** List all `.md` files in the blog directory (without extension). */
function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Get metadata for all posts, sorted newest-first by date. */
export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      const fullPath = path.join(BLOG_DIR, `${slug}.md`);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      return validateFrontmatter(data as Frontmatter, slug);
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Get a single post (metadata + raw markdown body). Returns null if not found. */
export function getPost(slug: string): Post | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const meta = validateFrontmatter(data as Frontmatter, slug);
  return { ...meta, content };
}

/** Slugs for `generateStaticParams` (pre-renders every post at build time). */
export function getAllSlugs(): string[] {
  return getSlugs();
}
