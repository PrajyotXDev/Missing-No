'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { nav, site } from '@/content/site';
import { cn } from '@/lib/cn';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track the section currently crossing the middle of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menu: lock scroll, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 text-white mix-blend-difference transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          hidden && !open && '-translate-y-full',
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 py-2 text-[0.9375rem] font-medium tracking-tight">
            <span className="block h-2 w-2 rounded-full bg-white" aria-hidden="true" />
            {site.name}
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'label group flex items-baseline gap-1.5 py-2 transition-opacity duration-300 hover:opacity-100',
                      active === item.id ? 'opacity-100' : 'opacity-55',
                    )}
                  >
                    <span className="text-[0.5625rem] opacity-60">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="label -mr-2 flex h-11 items-center gap-3 px-2 md:hidden"
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="relative block h-2.5 w-6" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 top-0 h-px w-full bg-white transition-transform duration-500',
                  open && 'translate-y-[5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-500',
                  open && '-translate-y-[4px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col bg-ink md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center pt-16">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.id} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      autoFocus={i === 0}
                      className="flex items-baseline justify-between py-4"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.05 }}
                    >
                      <span className="text-[2.6rem] font-medium leading-none tracking-[-0.045em]">
                        {item.label}
                      </span>
                      <span className="label text-mute">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="shell label flex justify-between pb-8 text-mute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a href={`mailto:${site.email}`} className="py-2 text-paper">
                Email
              </a>
              {site.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="py-2 text-paper">
                  {social.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
