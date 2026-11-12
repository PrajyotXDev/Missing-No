'use client';

import { useMemo, useState } from 'react';
import { arsenal, arsenalProjects } from '@/content/site';
import { cn } from '@/lib/cn';

type Focus = { type: 'tech'; name: string } | { type: 'project'; name: string } | null;

/**
 * Technologies on the left, the projects they shipped in on the right.
 * Pointing at either side lights up its counterpart, so the list reads as a graph
 * of what was used where rather than a wall of logos.
 */
export function ArsenalMap() {
  const [hover, setHover] = useState<Focus>(null);
  const [pinned, setPinned] = useState<Focus>(null);
  const focus = hover ?? pinned;

  const usage = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const group of arsenal) for (const item of group.items) map.set(item.name, item.usedIn);
    return map;
  }, []);

  const techLit = (name: string) => {
    if (!focus) return true;
    if (focus.type === 'tech') return focus.name === name;
    return usage.get(name)?.includes(focus.name) ?? false;
  };
  const projectLit = (name: string) => {
    if (!focus) return true;
    if (focus.type === 'project') return focus.name === name;
    return usage.get(focus.name)?.includes(name) ?? false;
  };

  const same = (a: Focus, b: Focus) => a?.type === b?.type && a?.name === b?.name;
  const toggle = (next: Focus) => setPinned((current) => (same(current, next) ? null : next));

  const focusedTechUsage = focus?.type === 'tech' ? (usage.get(focus.name) ?? []) : null;
  const status = !focus
    ? 'Point at a technology or a project to trace where it was used.'
    : focus.type === 'tech'
      ? focusedTechUsage && focusedTechUsage.length > 0
        ? `${focus.name} — used in ${focusedTechUsage.length} ${focusedTechUsage.length === 1 ? 'build' : 'builds'}.`
        : `${focus.name} — part of the everyday toolkit rather than one project.`
      : `${focus.name} — built with the highlighted technologies.`;

  return (
    <div className="shell">
      <div className="grid-12 gap-y-14" onPointerLeave={() => setHover(null)}>
        {/* Technologies */}
        <div className="col-span-12 lg:col-span-8">
          {arsenal.map((group, g) => (
            <div
              key={group.id}
              data-reveal
              style={{ '--i': g % 3 } as React.CSSProperties}
              className="grid-12 border-t border-line py-6 md:py-8"
            >
              <h3 className="label col-span-12 mb-4 text-mute md:col-span-3 md:mb-0 md:pt-3">
                <span className="mr-2 text-accent">{String(g + 1).padStart(2, '0')}</span>
                {group.label}
              </h3>
              <ul className="col-span-12 flex flex-wrap gap-x-5 gap-y-1 md:col-span-9 md:gap-x-7">
                {group.items.map((item) => {
                  const me: Focus = { type: 'tech', name: item.name };
                  const lit = techLit(item.name);
                  return (
                    <li key={item.name}>
                      <button
                        type="button"
                        aria-pressed={same(pinned, me)}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(me)}
                        onFocus={() => setHover(me)}
                        onBlur={() => setHover(null)}
                        onClick={() => toggle(me)}
                        className={cn(
                          'relative py-1 text-[clamp(1.6rem,3.3vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.045em] transition-[opacity,color] duration-500',
                          lit ? 'opacity-100' : 'opacity-20',
                          focus && lit && 'text-accent',
                        )}
                      >
                        {item.name}
                        {item.usedIn.length > 0 ? (
                          <sup className="label ml-1 align-super text-[0.5625rem] text-mute">{item.usedIn.length}</sup>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="h-px w-full bg-line" aria-hidden="true" />
        </div>

        {/* Projects */}
        <div className="col-span-12 lg:col-span-3 lg:col-start-10">
          <div className="lg:sticky lg:top-28" data-reveal>
            <h3 className="label mb-5 text-mute">Shipped in</h3>
            <ul className="border-b border-line">
              {arsenalProjects.map((name) => {
                const me: Focus = { type: 'project', name };
                const lit = projectLit(name);
                return (
                  <li key={name} className="border-t border-line">
                    <button
                      type="button"
                      aria-pressed={same(pinned, me)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(me)}
                      onFocus={() => setHover(me)}
                      onBlur={() => setHover(null)}
                      onClick={() => toggle(me)}
                      className={cn(
                        'flex min-h-11 w-full items-center justify-between gap-4 py-2.5 text-left text-[0.9375rem] tracking-tight transition-opacity duration-500',
                        lit ? 'opacity-100' : 'opacity-25',
                      )}
                    >
                      <span>{name}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'block h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500',
                          focus && lit ? 'bg-accent' : 'bg-line',
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 min-h-[3.5rem] text-sm leading-relaxed text-mute" aria-live="polite">
              {status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
