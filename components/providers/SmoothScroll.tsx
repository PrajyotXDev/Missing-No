'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scrolling plus the scroll-reveal observer.
 * Renders nothing. Smooth scrolling is skipped when the user prefers reduced motion,
 * and reveals resolve immediately.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    );
    targets.forEach((el) => observer.observe(el));

    const lenis = new Lenis({ lerp: 0.11, anchors: true });
    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
