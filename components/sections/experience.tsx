"use client";

import { useState } from "react";
import {
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
  CircleDashed,
} from "lucide-react";
import { experiences } from "@/constants/data";
import { motion, AnimatePresence } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { BrandIcon, BRAND_COLORS, toBrandName } from "@/components/brand-icons";

interface ExperienceProps {
  setRef: (el: HTMLElement | null) => void;
}

/* ───────────────────────────────────────────────────────────────────────
 *  Platform badge — real brand SVG icon + platform name, tinted with the
 *  brand's official color. Used inside each timeline item's content.
 * ─────────────────────────────────────────────────────────────────────── */
function PlatformBadge({ platform }: { platform: string }) {
  const brand = toBrandName(platform);
  const color = BRAND_COLORS[brand];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-semibold whitespace-nowrap"
      style={{
        color: color === "currentColor" ? undefined : color,
        borderColor: color === "currentColor" ? "currentColor" : `${color}55`,
        backgroundColor: color === "currentColor" ? "transparent" : `${color}14`,
      }}
    >
      <BrandIcon name={brand} className="w-3.5 h-3.5" />
      {platform}
    </span>
  );
}

/* ───────────────────────────────────────────────────────────────────────
 *  Status pill — "Done" (green) or "Pending" (muted)
 * ─────────────────────────────────────────────────────────────────────── */
function StatusPill({ done }: { done: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded " +
        (done
          ? "bg-primary/15 text-primary"
          : "bg-muted text-muted-foreground")
      }
    >
      {done ? "Done" : "Pending"}
    </span>
  );
}

type Feature = {
  platform: string;
  title: string;
  description: string;
  status: "done" | "pending";
  link?: string;
  image?: string;
  imageAlt?: string;
};

/* ───────────────────────────────────────────────────────────────────────
 *  Feature timeline — built on the HeroUI Pro Timeline component.
 *  Each feature is a Timeline.Item:
 *    • Marker  = a static status icon (Check for done, CircleDashed for
 *                pending). The brand icons are NOT used in the markers —
 *                they already appear in the platform badges beside the text.
 *    • Content = platform badge + status pill + title + description +
 *                (optional) PR link + (optional) rounded preview image
 *  To mark a feature complete, flip its `status` from "pending" → "done"
 *  in constants/data.ts — the marker turns into a green check and the PR
 *  link appears.
 * ─────────────────────────────────────────────────────────────────────── */
function FeatureTimeline({ features }: { features: Feature[] }) {
  const doneCount = features.filter((f) => f.status === "done").length;
  const pendingCount = features.length - doneCount;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h4 className="text-sm font-bold tracking-tight">Feature Timeline</h4>
        <span className="text-xs text-muted-foreground">
          ({doneCount} done · {pendingCount} pending · {features.length} total)
        </span>
      </div>

      <Timeline size="md" density="comfortable">
        {features.map((feature, index) => {
          const isDone = feature.status === "done";
          const status = isDone ? "success" : "default";

          return (
            <Timeline.Item key={index} status={status}>
              {/* Status marker — Check for done, static CircleDashed for pending.
                  No className is passed so the HeroUI CSS sizes the icon and
                  the absolute-centering rule in our globals.css centers it. */}
              <Timeline.Marker status={status}>
                {isDone ? (
                  <Check strokeWidth={3} />
                ) : (
                  <CircleDashed strokeWidth={2} />
                )}
              </Timeline.Marker>

              <Timeline.Content>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <PlatformBadge platform={feature.platform} />
                  <StatusPill done={isDone} />
                </div>
                <p className="text-sm font-semibold leading-snug mb-1">
                  {feature.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                {feature.link && isDone && (
                  <a
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold hover:text-primary transition-colors w-fit mt-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View PR
                  </a>
                )}
                {feature.image && (
                  <div className="mt-3 w-full max-w-md">
                    <img
                      src={feature.image}
                      alt={feature.imageAlt ?? feature.title}
                      loading="lazy"
                      className="w-full rounded-xl border border-border/40 shadow-sm object-cover"
                    />
                  </div>
                )}
              </Timeline.Content>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────
 *  Company logo in the card header.
 *  SVG logos (e.g. Appwrite) use `object-contain` so the full logo fits
 *  inside the circle instead of being cropped by `object-cover`.
 * ─────────────────────────────────────────────────────────────────────── */
function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const isSvg = src.toLowerCase().endsWith(".svg");
  return (
    <img
      src={src}
      alt={alt}
      className={
        "w-11 h-11 rounded-full bg-muted/40 " +
        (isSvg ? "object-contain p-1.5" : "object-cover")
      }
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://avatar.vercel.sh/" + alt;
      }}
    />
  );
}

/* ───────────────────────────────────────────────────────────────────────
 *  renderPoint — converts a plain-text bullet point into HTML.
 *   1. Bolds a curated set of keywords (Appwrite is replaced with the
 *      wordmark below, so it's excluded from this list).
 *   2. Replaces "Appwrite" with a theme-aware wordmark image (black text on
 *      light theme, white text on dark theme) — the official Appwrite
 *      logotype. Sits inline like text.
 *   3. Turns "Matej Bačo" into an inline embedded link (with a small
 *      arrow icon) that opens his portfolio in a new tab.
 * ─────────────────────────────────────────────────────────────────────── */
const ARROW_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

// Inline Appwrite logotype. The default `src` is the wordmark meant for
// LIGHT backgrounds (dark text #19191D); the `.dark` CSS rule swaps it to
// the DARK-background wordmark (light text #EDEDF0) via `content: url(...)`.
const APPWRITE_WORDMARK_HTML =
  '<img alt="Appwrite" class="appwrite-wordmark" aria-label="Appwrite" src="/brands/appwrite-wordmark-white.svg">';

function renderPoint(point: string): string {
  // 1. Bold keywords (Appwrite & Matej Bačo are handled separately, so they
  //    are intentionally excluded from this list).
  let html = point.replace(
    /\b(React Native|Mobile app development|productivity tools|UI\/UX patterns|OAuth|open-source|Cloudflare|Vercel|Supabase|Netlify|Firebase|HRMS|multi-tenant|OTP|magic-URL|deep links)\b/g,
    "<strong>$1</strong>",
  );
  // 2. Replace the plain-text "Appwrite" mentions with the wordmark image.
  html = html.replace(/\bAppwrite\b/g, APPWRITE_WORDMARK_HTML);
  // 3. Replace the plain-text name with an inline link + arrow icon.
  html = html.replace(
    /Matej Bačo/g,
    `<a href="https://matejbaco.eu" target="_blank" rel="noopener noreferrer" class="inline-person-link">Matej Bačo&nbsp;${ARROW_SVG}</a>`,
  );
  return html;
}

export function Experience({ setRef }: ExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" ref={setRef} className="py-4">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Work Experience
          </h2>
        </div>

        <div className="space-y-6 w-full max-w-[800px] mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group border-b border-border/20 last:border-0 pb-6 mb-6"
            >
              <div
                className="flex items-start justify-between cursor-pointer py-2"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center gap-4">
                  <CompanyLogo src={exp.logo} alt={exp.company} />
                  <div>
                    <h3 className="text-xl font-regular flex items-center gap-1 group-hover:text-primary transition-colors">
                      {exp.company}{" "}
                      {expandedIndex === index ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </h3>
                    <p className="text-muted-foreground font-regular text-sm">
                      {exp.role}
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-muted-foreground font-medium">
                    {exp.duration}
                  </div>
                </div>
              </div>

              <div className="sm:hidden mt-2 text-sm text-muted-foreground font-medium">
                {exp.duration}
              </div>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-0 sm:pl-16 space-y-5">
                      <ul className="space-y-3">
                        {exp.points.map((point, pIndex) => (
                          <li
                            key={pIndex}
                            className="text-muted-foreground leading-relaxed list-disc marker:text-muted-foreground/50"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: renderPoint(point),
                              }}
                            />
                          </li>
                        ))}
                      </ul>

                      {/* Feature timeline for entries that declare one (e.g. Appwrite) */}
                      {exp.features && exp.features.length > 0 && (
                        <FeatureTimeline features={exp.features} />
                      )}

                      <div className="flex gap-4 mt-4 flex-wrap">
                        {exp.website && (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors"
                          >
                            <Globe className="w-4 h-4" /> Website
                          </a>
                        )}
                        {exp.recommendation && (
                          <a
                            href={exp.recommendation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors"
                          >
                            <span className="w-4 h-4 flex items-center justify-center text-[10px] border border-current rounded-sm font-bold">
                              L
                            </span>{" "}
                            Recommendation
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
