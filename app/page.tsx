"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { GithubActivity } from "@/components/sections/github-activity";
import { Experience } from "@/components/sections/experience";
import { Works } from "@/components/sections/works";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Connect } from "@/components/sections/connect";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle scroll events for active section
    lenis.on(
      "scroll",
      ({ scroll, limit }: { scroll: number; limit: number }) => {
        // Update active section based on scroll position
        sectionsRef.current.forEach((section) => {
          if (section) {
            const rect = section.getBoundingClientRect();
            const viewportMiddle = window.innerHeight / 2;

            if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
              setActiveSection(section.id);
            }
          }
        });
      },
    );

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: -80,
        duration: 1.5,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <Hero setRef={(el) => (sectionsRef.current[0] = el)} />
        <GithubActivity />
        <Experience setRef={(el) => (sectionsRef.current[1] = el)} />
        <Education setRef={(el) => (sectionsRef.current[5] = el)} />
        <Works setRef={(el) => (sectionsRef.current[2] = el)} />
        <Skills setRef={(el) => (sectionsRef.current[3] = el)} />
        <Connect setRef={(el) => (sectionsRef.current[4] = el)} />
        <Footer isDark={isDark} toggleTheme={toggleTheme} />
      </main>

      
      <style>{`
        /* Lenis smooth scroll wrapper */
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }

        /* Hide scrollbar for GitHub chart container while maintaining scrollability */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
