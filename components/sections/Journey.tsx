import { ArrowUpRight } from 'lucide-react';
import { journey } from '@/content/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ToAdd } from '@/components/ui/ToAdd';
import { ProgressRail } from './ProgressRail';

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="pb-24 pt-20 md:pb-40 md:pt-32">
      <SectionHeader id="journey-title" index="04" label="Education & journey">
        <span className="line">
          <span>
            Still <span className="serif">early</span>
            <span className="text-accent">.</span>
          </span>
        </span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}>
          <span>Already moving.</span>
        </span>
      </SectionHeader>

      <div className="shell">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <ProgressRail>
              <ol>
                {journey.map((item, i) => (
                  <li
                    key={`${item.title}-${item.org}`}
                    data-reveal
                    className="relative grid grid-cols-1 gap-x-8 gap-y-3 border-b border-line py-9 pl-7 md:grid-cols-[9rem_1fr] md:py-12 md:pl-12"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[2.9rem] block h-px w-4 bg-line md:top-[3.9rem] md:w-7"
                    />
                    <p className="label pt-1.5 text-mute md:pt-3">
                      {item.date ?? <ToAdd what="Date" />}
                    </p>
                    <div>
                      <h3 className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                        {item.title}
                      </h3>
                      <p className="label mt-3 text-accent">{item.org}</p>
                      <p className="mt-5 max-w-[36rem] text-lg leading-[1.55] text-mute">{item.body}</p>
                      {item.link ? (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-line mt-5 py-1 text-[0.9375rem]"
                        >
                          {item.link.label}
                          <ArrowUpRight size={14} aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : null}
                    </div>
                    <span className="label absolute right-0 top-9 hidden text-dim md:top-12 md:block" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ol>
            </ProgressRail>
          </div>
        </div>
      </div>
    </section>
  );
}
