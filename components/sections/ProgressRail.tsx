'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/** Wraps a list with a vertical rail that fills as the list scrolls through the viewport. */
export function ProgressRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true">
        <motion.div
          className="h-full w-full origin-top bg-accent"
          style={{ scaleY: reduced ? 1 : scaleY }}
        />
      </div>
      {children}
    </div>
  );
}
