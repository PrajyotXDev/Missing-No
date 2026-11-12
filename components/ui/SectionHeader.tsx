import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  aside?: ReactNode;
  tone?: 'dark' | 'light';
};

/** Numbered section opener: a rule that draws itself, a mono label, an oversized heading. */
export function SectionHeader({ id, index, label, children, aside, tone = 'dark' }: Props) {
  const light = tone === 'light';
  return (
    <header className="shell">
      <div
        data-reveal="rule"
        className={cn('h-px w-full', light ? 'bg-line-ink' : 'bg-line')}
        aria-hidden="true"
      />
      <div className="grid-12 pt-5 pb-14 md:pb-24">
        <p
          data-reveal
          className={cn(
            'label col-span-12 mb-8 md:col-span-3 md:mb-0',
            light ? 'text-graphite' : 'text-mute',
          )}
        >
          <span className="text-accent">{index}</span>
          <span className="mx-2">/</span>
          {label}
        </p>
        <div className="col-span-12 md:col-span-9">
          <h2 id={id} data-reveal="lines" className="h-section">
            {children}
          </h2>
          {aside ? (
            <p
              data-reveal
              className={cn(
                'mt-8 max-w-[34rem] text-lg leading-relaxed md:text-xl',
                light ? 'text-graphite' : 'text-mute',
              )}
            >
              {aside}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
