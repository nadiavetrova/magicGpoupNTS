"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface Props {
  active: boolean;
}

export default function SmoothScroll({ active }: Props) {
  useEffect(() => {
    if (!active) return;

    // Wait for the inner scroll container (.lenis) to appear in DOM.
    // We target .lenis (the inner overlay div) — NOT .fullscreen-overlay (the outer
    // clip-path wrapper). Lenis on the outer div intercepts wheel events and blocks
    // native scroll on the inner content container.
    const timeout = setTimeout(() => {
      const scroller = document.querySelector(".lenis") as HTMLElement;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller,
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      const id = requestAnimationFrame(raf);

      // Animate legacy service-cards on scroll (tourism section)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                (entry.target as HTMLElement).style.opacity = "1";
                (entry.target as HTMLElement).style.transform = "translateY(0)";
              }, i * 80);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, root: scroller }
      );

      scroller.querySelectorAll(".service-card, .services-title, .services-subtitle").forEach((el) => {
        const elem = el as HTMLElement;
        elem.style.opacity = "0";
        elem.style.transform = "translateY(30px)";
        elem.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(elem);
      });

      return () => {
        cancelAnimationFrame(id);
        lenis.destroy();
        observer.disconnect();
      };
    }, 200);

    return () => clearTimeout(timeout);
  }, [active]);

  return null;
}
