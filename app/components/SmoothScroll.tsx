"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface Props {
  active: boolean;
}

export default function SmoothScroll({ active }: Props) {
  useEffect(() => {
    if (!active) return;

    // Wait for overlay to be in DOM
    const timeout = setTimeout(() => {
      const overlay = document.querySelector(".fullscreen-overlay") as HTMLElement;
      if (!overlay) return;

      const lenis = new Lenis({
        wrapper: overlay,
        content: overlay,
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

      // Animate cards on scroll
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
        { threshold: 0.1, root: overlay }
      );

      overlay.querySelectorAll(".service-card, .services-title, .services-subtitle").forEach((el) => {
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
