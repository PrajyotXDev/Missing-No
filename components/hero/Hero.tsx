import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { hero, site } from '@/content/site';
import { LocalTime } from '@/components/ui/LocalTime';
import { Magnetic } from '@/components/ui/Magnetic';
import { Field } from './Field';

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* The field — fades out toward the name so type always wins. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[82%] md:h-[88%]"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 52%, transparent 96%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 52%, transparent 96%)',
        }}
      >
        <Field />
      </div>

      {/* Meta row */}
      <div className="shell relative z-10 pt-24 md:pt-28">
        <div className="grid-12 label text-mute">
          <p className="intro-fade col-span-7 md:col-span-4">
            {site.programme}
            <span className="mx-2 text-dim">/</span>
            {site.institute}
          </p>
          <p className="intro-fade col-span-4 hidden md:block" style={{ '--i': 1 } as React.CSSProperties}>
            {site.coordinates}
          </p>
          <p
            className="intro-fade col-span-5 text-right md:col-span-4"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            <LocalTime timeZone={site.timeZone} />
          </p>
        </div>
      </div>

      {/* Figure caption for the field */}
      <p
        aria-hidden="true"
        className="intro-fade label pointer-events-none absolute right-[var(--gutter)] top-[38%] hidden text-right text-dim lg:block"
        style={{ '--i': 6 } as React.CSSProperties}
      >
        Fig. 0 — z = f(x, y, t)
        <br />
        <span className="text-mute">Move the cursor to disturb it</span>
      </p>

      <div className="flex-1" />

      {/* Name */}
      <div className="shell relative z-10">
        <h1 className="display text-[19.5vw] md:text-[16.2vw] 3xl:text-[18.2rem]">
          <span className="intro-line">
            <span>{site.firstName}</span>
          </span>
          <span className="intro-line pl-[9vw] md:pl-[19vw]" style={{ '--i': 1 } as React.CSSProperties}>
            <span className="serif !tracking-[-0.035em]">
              {site.lastName}
              <span className="text-accent not-italic">.</span>
            </span>
          </span>
        </h1>
      </div>

      {/* Statement, intro, links */}
      <div className="shell relative z-10 pb-7 pt-8 md:pb-9 md:pt-12">
        <div className="h-px w-full bg-line" aria-hidden="true" />
        <div className="grid-12 gap-y-8 pt-6">
          <p
            className="intro-fade serif col-span-12 text-[1.75rem] leading-none md:col-span-3 md:text-[2rem]"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            {site.tagline}
          </p>

          <p
            className="intro-fade col-span-12 max-w-[30rem] text-[1.0625rem] leading-[1.55] text-mute md:col-span-5 md:text-lg"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            {hero.intro}
          </p>

          <div
            className="intro-fade col-span-12 flex items-end justify-between gap-6 md:col-span-4 md:justify-end md:gap-10"
            style={{ '--i': 4 } as React.CSSProperties}
          >
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] sm:gap-x-6">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <Magnetic>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-line py-2"
                    >
                      {social.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Magnetic>
                </li>
              ))}
              <li>
                <Magnetic>
                  <a href={`mailto:${site.email}`} className="link-line py-2">
                    Email
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </Magnetic>
              </li>
            </ul>

            <a
              href="#about"
              className="label group flex shrink-0 items-center gap-3 py-2 text-mute transition-colors hover:text-paper"
            >
              <span className="scroll-cue relative block h-9 w-px overflow-hidden bg-line" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Scroll</span>
              <ArrowDown size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
