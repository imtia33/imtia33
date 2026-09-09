"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — initializes Lenis smooth scrolling for the blog.
 *
 * The main portfolio sets up Lenis in home-client.tsx, but the blog lives on
 * separate routes (/blog, /blog/[slug]) that don't use HomeClient. This
 * component drops Lenis onto any blog page it's rendered in, with the same
 * gentle settings as the home page.
 *
 * Render it once near the top of a blog page (it renders nothing).
 */

export function SmoothScroll() {
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
