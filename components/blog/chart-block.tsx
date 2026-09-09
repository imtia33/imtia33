"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  BarController,
  LineController,
  DoughnutController,
  PieController,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartConfiguration,
} from "chart.js";

/**
 * ChartBlock — renders a Chart.js chart from a JSON config string.
 *
 * Used by the markdown renderer when a fenced code block is tagged `chart`.
 * The JSON inside the block is parsed and passed to Chart.js as a full
 * `ChartConfiguration` (type, data, options). Charts are client-rendered
 * because Chart.js needs a canvas, but the surrounding markdown is SSR'd.
 *
 * Usage in markdown:
 *   ```chart
 *   { "type": "bar", "data": { ... }, "options": { ... } }
 *   ```
 */

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  BarController,
  LineController,
  DoughnutController,
  PieController,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface ChartBlockProps {
  config: string; // raw JSON from the fenced code block
}

export function ChartBlock({ config }: ChartBlockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);
  // useState (not useRef) so a parse/init error triggers a re-render.
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Destroy any previous chart on this canvas before (re)creating.
    chartRef.current?.destroy();
    chartRef.current = null;

    try {
      const parsed = JSON.parse(config) as ChartConfiguration;
      if (!canvasRef.current) return;
      chartRef.current = new ChartJS(canvasRef.current, parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [config]);

  if (error) {
    return (
      <div className="my-6 p-4 rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
        <p className="font-semibold mb-1">Chart config error</p>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <div className="my-6 p-4 rounded-xl border border-border bg-muted/30">
      <canvas ref={canvasRef} />
    </div>
  );
}
