"use client";

import { education } from "@/constants/data";

interface EducationProps {
  setRef: (el: HTMLElement | null) => void;
}

export function Education({ setRef }: EducationProps) {
  return (
    <section id="education" ref={setRef} className="py-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Education
          </h2>
        </div>

        <div className="space-y-6 w-full max-w-[800px]">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group flex items-start justify-between py-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border/50">
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    className="w-11 h-11 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://avatar.vercel.sh/" + edu.school;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-normal group-hover:text-primary transition-colors">
                    {edu.school}
                  </h3>
                  <p className="text-muted-foreground font-normal text-sm">
                    {edu.degree}
                  </p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <div className="text-muted-foreground font-normal text-sm">
                  {edu.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
