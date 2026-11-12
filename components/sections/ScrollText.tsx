'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

type WordProps = { children: string; progress: MotionValue<number>; range: [number, number] };

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="scroll-word" style={{ opacity }}>
      {children}{' '}
    </motion.span>
  );
}

/** A paragraph that is read into focus, word by word, as it scrolls through the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.5'] });
  const words = text.split(' ');

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1.5) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}
