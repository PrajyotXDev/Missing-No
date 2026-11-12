import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArsenalMap } from './ArsenalMap';

export function Arsenal() {
  return (
    <section id="arsenal" aria-labelledby="arsenal-title" className="bg-ink-2 pb-24 pt-20 md:pb-40 md:pt-32">
      <SectionHeader
        id="arsenal-title"
        index="03"
        label="Technical arsenal"
        aside="No proficiency bars. Just the tools, and the builds that prove each one. The small number is how many projects it shipped in."
      >
        <span className="line">
          <span>Tools, traced</span>
        </span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}>
          <span>
            to the <span className="serif">work</span>
            <span className="text-accent">.</span>
          </span>
        </span>
      </SectionHeader>
      <ArsenalMap />
    </section>
  );
}
