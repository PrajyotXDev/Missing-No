import { about, site } from '@/content/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollText } from './ScrollText';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper pb-24 pt-20 text-ink md:pb-40 md:pt-32">
      <SectionHeader id="about-title" index="01" label="About" tone="light">
        <span className="line">
          <span>Between the</span>
        </span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}>
          <span>
            <span className="serif">proof</span> and the
          </span>
        </span>
        <span className="line" style={{ '--i': 2 } as React.CSSProperties}>
          <span>
            product<span className="text-accent">.</span>
          </span>
        </span>
      </SectionHeader>

      <div className="shell">
        <div className="grid-12 gap-y-14">
          {/* Fact sheet */}
          <aside className="col-span-12 md:col-span-3" aria-label="At a glance">
            <div
              data-reveal
              className="relative mb-8 flex aspect-[4/5] max-w-[15rem] items-end overflow-hidden bg-ink p-5 text-paper"
            >
              <span
                aria-hidden="true"
                className="serif absolute -right-3 -top-10 text-[13rem] leading-none text-paper/[0.07]"
              >
                P
              </span>
              <span aria-hidden="true" className="absolute left-5 top-5 block h-2 w-2 rounded-full bg-accent" />
              <p className="label relative leading-relaxed text-mute">
                {site.name}
                <br />
                <span className="text-paper">{site.coordinates}</span>
              </p>
            </div>
            <dl className="max-w-[15rem]">
              {about.facts.map((fact, i) => (
                <div
                  key={fact.label}
                  data-reveal
                  style={{ '--i': i } as React.CSSProperties}
                  className="flex items-baseline justify-between gap-4 border-t border-line-ink py-3 last:border-b"
                >
                  <dt className="label text-graphite">{fact.label}</dt>
                  <dd className="text-right text-[0.9375rem] font-medium tracking-tight">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* Statement */}
          <div className="col-span-12 md:col-span-9">
            <ScrollText
              text={about.statement}
              className="text-[clamp(1.75rem,3.9vw,4rem)] font-medium leading-[1.08] tracking-[-0.035em]"
            />

            <div className="mt-16 grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 sm:grid-cols-2 md:mt-24">
              {about.columns.map((column, i) => (
                <div
                  key={column.label}
                  data-reveal
                  style={{ '--i': i % 2 } as React.CSSProperties}
                  className="border-t border-line-ink pt-4"
                >
                  <h3 className="label mb-5 flex gap-3 text-graphite">
                    <span className="text-accent">0{i + 1}</span>
                    {column.label}
                  </h3>
                  <p className="max-w-[30rem] text-lg leading-[1.55] text-ink/80">{column.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
