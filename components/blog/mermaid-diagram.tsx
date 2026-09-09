"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

/**
 * MermaidDiagram — renders a mermaid diagram definition to SVG on the client.
 *
 * Mermaid can't run during SSR (it needs the DOM), so this component renders
 * a small placeholder during SSR/hydration and then swaps in the real SVG
 * once the chart is drawn.
 *
 * Usage in markdown:
 *   ```mermaid
 *   flowchart TD
 *     A --> B
 *   ```
 */

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive overflow-x-auto">
        <p className="font-semibold mb-1">Mermaid render error</p>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 p-4 rounded-xl border border-border bg-muted/30 overflow-x-auto [&_svg]:max-w-full"
      // dangerouslySetInnerHTML is safe here: mermaid with securityLevel "loose"
      // produces SVG from our own trusted repo content, not user input.
      dangerouslySetInnerHTML={{ __html: svg ?? "" }}
    />
  );
}
