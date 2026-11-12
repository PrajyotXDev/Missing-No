'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, summary, [data-cursor]';

/** A ring that trails the native pointer. Desktop, fine pointers only. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX;
      ty = e.clientY;
      if (!el.classList.contains('is-on')) {
        x = tx;
        y = ty;
        el.classList.add('is-on');
      }
      const target = e.target as Element | null;
      el.classList.toggle('is-hover', Boolean(target?.closest(INTERACTIVE)));
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => el.classList.remove('is-on');
    const onDown = () => el.classList.add('is-down');
    const onUp = () => el.classList.remove('is-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
