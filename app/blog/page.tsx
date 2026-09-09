import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogHeader } from "@/components/blog/blog-header";

export const metadata: Metadata = {
  title: "Blog | Imtiaz Royhan",
  description:
    "Writing about Appwrite, React Native, backend engineering, and the tools I build. Markdown-powered, with live mermaid diagrams and Chart.js charts.",
  openGraph: {
    title: "Blog | Imtiaz Royhan",
    description:
      "Writing about Appwrite, React Native, backend engineering, and the tools I build.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <header className="mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
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
                  {post.description}
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
