"use client";

import { useState } from "react";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "@/constants/data";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceProps {
  setRef: (el: HTMLElement | null) => void;
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
                  <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-11 h-11 object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://avatar.vercel.sh/" + exp.company;
                      }}
                    />
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
                    <div className="pt-4 pl-16 space-y-4">
                      <ul className="space-y-3">
                        {exp.points.map((point, pIndex) => (
                          <li
                            key={pIndex}
                            className="text-muted-foreground leading-relaxed list-disc marker:text-muted-foreground/50"
                          >
                            {/* Process points to bold specific keywords manually if needed or just provide clean text */}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: point.replace(
                                  /\b(React Native|Mobile app development|productivity tools|UI\/UX patterns)\b/g,
                                  "<strong>$1</strong>",
                                ),
                              }}
                            />
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-4 mt-4">
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
