"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { reverseProjects } from "@/constants/data";

interface ReverseEngineeringProps {
  setRef: (el: HTMLElement | null) => void;
}

/**
 * ReverseEngineering - home-page section for reverse engineering projects.
 *
 * UI mix of the "My Works" project cards and the "Articles" story cards:
 *   • In front, each entry looks exactly like a Works project row
 *     (year / title / subtitle / description / image / tech tags).
 *   • But the whole card redirects to a full story page under
 *     /reverse-engineering/[slug] - an editorial, blog-style layout that
 *     tells the whole story.
 */
export function ReverseEngineering({ setRef }: ReverseEngineeringProps) {
  return (
    <section id="reverse-engineering" ref={setRef} className="py-4">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">
            Reverse Engineering
          </h2>
          <div className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            Taking platforms apart
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-xl">
          Projects born from curiosity: platforms taken apart to understand how
          they think, then rebuilt the way they should have been. Click a
          project to read the full story.
        </p>
      </div>

      <div className="space-y-12 sm:space-y-16 mt-6">
        {reverseProjects.map((project, index) => (
          <Link
            key={index}
            href={project.story}
            aria-label={`Read the story: ${project.role}`}
            className="group grid lg:grid-cols-12 gap-8 items-center py-4 border-b border-border/30 hover:border-primary/20 transition-all duration-500"
          >
            {/* Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  {project.year}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl font-light tracking-tight group-hover:text-primary transition-colors duration-300">
                  {project.role}
                </h3>
                <div className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                  {project.company}
                </div>
                {project.anonymous && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground/80 border border-dashed border-border rounded-full px-3 py-1">
                    <Lock className="w-3 h-3" />
                    Identity withheld for security
                  </div>
                )}
              </div>
              <p className="text-muted-foreground/80 text-lg leading-relaxed max-w-md group-hover:text-foreground/90 transition-colors">
                {project.description}
              </p>

              <div className="flex items-center gap-2 pt-2 text-sm font-bold group-hover:text-primary transition-colors">
                Read the story
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 lg:mt-0">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/30 shadow-2xl group-hover:border-primary/30 transition-all duration-700">
                <img
                  src={project.image}
                  alt={project.role}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                {/* "Story" pill - signals this card redirects to a story page */}
                <span className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-wide shadow-sm">
                  Story
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                    Read the story →
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="lg:col-span-3 flex flex-wrap gap-2 lg:justify-end">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[10px] text-muted-foreground/70 uppercase tracking-widest border border-border/50 rounded-full group-hover:border-primary/40 group-hover:text-primary transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
