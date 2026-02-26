"use client";

import { SkillTag } from "@/components/skill-tags";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface HeroProps {
  setRef: (el: HTMLElement | null) => void;
}

const skills = [
  {
    name: "React Native",
    description:
      "I build high-performance, cross-platform mobile applications for iOS and Android, focusing on a fluid native feel.",
    experience: "",
  },
  {
    name: "Appwrite",
    description:
      "I have extensive experience using Appwrite as a Backend-as-a-Service for authentication, real-time databases, and serverless functions.",
    experience: "",
  },
  {
    name: "Javascript",
    description:
      "I possess a deep understanding of modern JavaScript (ES6+), asynchronous programming, and performance optimization.",
    experience: "",
  },
  {
    name: "OpenStreetMaps",
    description:
      "I am skilled at integrating and customizing OpenStreetMaps and related libraries for web and mobile mapping solutions.",
    experience: "",
  },
  {
    name: "Node.js",
    description:
      "I build scalable backend services, REST APIs, and microservices using modern Node.js frameworks.",
    experience: "",
  },
  {
    name: "Mapping Algorithms",
    description:
      "I am proficient in implementing algorithms like Dijkstra's, A*, and custom routing logic for pathfinding and distance calculation.",
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
              PORTFOLIO / 2026
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              Imtiaz
              <br />
              <span className="text-muted-foreground">Royhan</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              I am a developer dedicated to blending
              <span className="text-foreground"> design</span>,
              <span className="text-foreground"> technology</span>, and
              <span className="text-foreground"> personal experience</span> into
              every project I build.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Available for work
              </div>
              <div>Bangladesh</div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                className="group border-muted-foreground/20 hover:border-foreground transition-colors"
                asChild
              >
                <a
                  href="/imtiaz-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Get Resume
                </a>
              </Button>
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
        </div>
      </div>
    </header>
  );
}
