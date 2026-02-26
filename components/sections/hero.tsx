"use client";

import { SkillTag } from "@/components/skill-tags";

interface HeroProps {
  setRef: (el: HTMLElement | null) => void;
}

const skills = [
  {
    name: "React Native",
    description:
      "Expertly building cross-platform mobile applications for iOS and Android, focusing on performance and native feel.",
    experience: "",
  },
  {
    name: "Appwrite",
    description:
      "Experienced in using Appwrite as a Backend-as-a-Service for authentication, realtime databases, and serverless functions.",
    experience: "",
  },
  {
    name: "Javascript",
    description:
      "Good understanding of modern JavaScript (ES6+), asynchronous programming, and performance optimization.",
    experience: "",
  },
  {
    name: "OpenStreetMaps",
    description:
      "Skilled in integrating and customizing OpenStreetMaps and related libraries (Leaflet, Mapbox GL JS) for web and mobile mapping solutions.",
    experience: "",
  },
  {
    name: "Node.js",
    description:
      "Building scalable backend services, REST APIs, and microservices Node.js frameworks.",
    experience: "",
  },
  {
    name: "Mapping Algorithms",
    description:
      "Proficient in implementing algorithms like Dijkstra's, A*, and custom routing logic for pathfinding and distance calculation.",
    experience: "",
  },
];

export function Hero({ setRef }: HeroProps) {
  return (
    <header id="intro" ref={setRef} className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-2">
            <div className="lg:hidden w-48 h-48 mx-auto mt-18 mb-10">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="/profile.png"
                  alt="Imtiaz Royhan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground font-mono tracking-wider">
              PORTFOLIO / 2025
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              Imtiaz
              <br />
              <span className="text-muted-foreground">Royhan</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Developing
              <span className="text-foreground"> design</span>,
              <span className="text-foreground"> technology</span>, and
              <span className="text-foreground"> personal experience</span>.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Available for work
              </div>
              <div>Bangladesh</div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-78 h-78">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src="/profile.png"
              alt="Imtiaz Royhan"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0 ">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">
              CURRENTLY
            </div>
            <div className="space-y-2">
              <div className="text-foreground">Student</div>
              <div className="text-muted-foreground">@IIUC</div>
              <div className="text-xs text-muted-foreground">
                2023 — Present
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2 relative min-h-24">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <SkillTag skill={skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
