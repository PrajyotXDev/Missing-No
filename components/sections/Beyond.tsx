import { ArrowUpRight } from 'lucide-react';
import { beyond } from '@/content/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Beyond() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="bg-paper pb-24 pt-20 text-ink md:pb-40 md:pt-32">
      <SectionHeader
        id="beyond-title"
        index="05"
        label="Beyond code"
        tone="light"
        aside="The things I chase when nobody has assigned them."
      >
        <span className="line">
          <span>Outside the</span>
        </span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}>
          <span>
            <span className="serif">editor</span>
            <span className="text-accent">.</span>
          </span>
        </span>
      </SectionHeader>

      <div className="shell">
        <ul className="border-b border-line-ink">
          {beyond.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              className="group grid-12 items-baseline gap-y-4 border-t border-line-ink py-8 md:py-11"
            >
              <span className="label col-span-12 text-graphite md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="serif col-span-12 text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[0.98] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:col-span-6">
                {item.title}
              </h3>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <p className="text-lg leading-[1.55] text-ink/80">{item.body}</p>
                {item.link ? (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line mt-4 py-1 text-[0.9375rem] font-medium"
                  >
                    {item.link.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
