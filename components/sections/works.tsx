"use client";

import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/constants/data";

interface WorksProps {
  setRef: (el: HTMLElement | null) => void;
}

export function Works({ setRef }: WorksProps) {
  return (
    <section id="work" ref={setRef} className="min-h-screen py-4">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">My Works</h2>
          <div className="text-sm text-muted-foreground font-mono">
            2023 — 2026
          </div>
        </div>

        <div className="space-y-12 sm:space-y-20">
          {projects.map((project, index) => (
            <div
              key={index}
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
                </div>
                <p className="text-muted-foreground/80 text-lg leading-relaxed max-w-md group-hover:text-foreground/90 transition-colors">
                  {project.description}
                </p>

                <div className="flex gap-6 pt-4">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                    >
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    {project.links?.live && (
                      <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                        VIEW PROJECT
                      </span>
                    )}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
