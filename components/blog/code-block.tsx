"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * CodeBlock — a fenced code block with a copy-to-clipboard button.
 *
 * Renders the code in a <pre><code> with a header showing the language and
 * a copy button. The actual syntax highlighting is handled by the markdown
 * renderer's own `code` styling (we use a lightweight token-color approach
 * via CSS rather than a heavy highlighter dependency for the blog).
 */

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable (non-secure context) — ignore
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          {language || "text"}
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-primary" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-[#e6edf3]">{code}</code>
      </pre>
    </div>
  );
}
