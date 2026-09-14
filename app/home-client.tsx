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
import { Articles } from "@/components/sections/articles";
import { Footer } from "@/components/footer";

interface ArticleCard {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  tags: string[];
  readingTime: number;
}

export function HomeClient({ posts }: { posts: ArticleCard[] }) {
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

      <main className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/*
          "Darth Vader Arrives" profile effect (real Discord APNG, fetched via
          the DexAssets API + bundled locally at /public/profile-effects/darth-vader.apng).
          MOBILE ONLY (hidden on desktop). Absolutely positioned at the very top
          z-index so it overlays EVERY element (navbar, profile picture, text,
          cards…). The APNG itself has transparent areas, so the Vader figure
          visibly covers the components beneath it while letting the page show
          through elsewhere. It is `pointer-events-none` so taps/clicks still
          pass through to the real UI underneath. object-contain keeps the full
          450x880 figure visible (never cropped/distorted) and responsive.
        */}
        <div className="vader-backdrop pointer-events-none fixed inset-0 z-[9999] overflow-hidden lg:hidden">
          <img
            src="/profile-effects/darth-vader.apng"
            alt="Darth Vader Arrives — Discord profile effect"
            className="vader-effect-img absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-100"
            draggable={false}
            aria-hidden
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Hero setRef={(el) => (sectionsRef.current[0] = el)} />
          <GithubActivity />
          <Experience setRef={(el) => (sectionsRef.current[1] = el)} />
          <Education setRef={(el) => (sectionsRef.current[5] = el)} />
          <Articles
            setRef={(el) => (sectionsRef.current[6] = el)}
            posts={posts}
          />
          <Works setRef={(el) => (sectionsRef.current[2] = el)} />
          <Skills setRef={(el) => (sectionsRef.current[3] = el)} />
          <Connect setRef={(el) => (sectionsRef.current[4] = el)} />
          <Footer isDark={isDark} toggleTheme={toggleTheme} />
        </div>
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
