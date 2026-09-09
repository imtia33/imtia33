"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { MermaidDiagram } from "./mermaid-diagram";
import { ChartBlock } from "./chart-block";
import { CodeBlock } from "./code-block";

/**
 * MarkdownRenderer — renders markdown content with:
 *   • GitHub-Flavored Markdown (tables, strikethrough, task lists) via remark-gfm
 *   • Fenced code blocks with a copy button (CodeBlock)
 *   • `mermaid` fenced blocks → MermaidDiagram (client-rendered SVG)
 *   • `chart` fenced blocks → ChartBlock (client-rendered Chart.js)
 *   • Inline code with subtle styling
 *   • Links open in a new tab
 *   • Theme-aware images (Appwrite wordmark swaps per theme via CSS)
 *   • LaTeX math via remark-math + rehype-katex ($...$ inline, $$...$$ block)
 *
 * react-markdown v10 API notes:
 *   - The `code` component receives `inline` (boolean) to distinguish block
 *     vs inline code. We use that to route to the right renderer.
 *   - For fenced blocks, `className` is like `language-chart` and `children`
 *     is the raw code string (fences already stripped).
 */

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // In react-markdown v10, `code` handles both inline and block code.
          // We distinguish via the presence of a `language-*` className
          // (block code gets one, inline code does not).
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match ? match[1] : "";
            // Normalize children to a string; react-markdown passes a string
            // (sometimes with a trailing newline) for block code.
            const raw = Array.isArray(children)
              ? children.join("")
              : String(children ?? "");
            const text = raw.replace(/\n$/, "");

            // Block code: has a language class (fenced block) OR is multi-line.
            if (lang || raw.includes("\n")) {
              if (lang === "mermaid") {
                return <MermaidDiagram chart={text} />;
              }
              if (lang === "chart") {
                return <ChartBlock config={text} />;
              }
              return <CodeBlock language={lang} code={text} />;
            }

            // Inline code
            return (
              <code
                className="px-1.5 py-0.5 rounded-md bg-muted/70 text-primary text-[0.875em] font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          // `pre` wraps block `code` — we let our CodeBlock/Mermaid/Chart
          // wrappers provide their own container, so pass children through.
          pre({ children }) {
            return <>{children}</>;
          },
          // Links open in a new tab
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {children}
              </a>
            );
          },
          // Theme-aware images
          img({ src, alt }) {
            return (
              <img
                src={typeof src === "string" ? src : ""}
                alt={alt || ""}
                className="my-4 rounded-lg max-w-full h-auto inline-block"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
