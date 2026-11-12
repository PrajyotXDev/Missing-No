import { ArrowUpRight, Plus } from 'lucide-react';
import { archive, projects, type Project } from '@/content/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ToAdd } from '@/components/ui/ToAdd';
import { Magnetic } from '@/components/ui/Magnetic';
import { cn } from '@/lib/cn';
import { ProjectPlate } from './ProjectPlate';

function CaseStudy({ project, flip }: { project: Project; flip: boolean }) {
  const titleId = `project-${project.id}`;
  return (
    <article aria-labelledby={titleId} className="project shell pb-16 md:pb-28">
      <div data-reveal="rule" className="h-px w-full bg-line" aria-hidden="true" />

      <div className="grid-12 label pt-5 text-mute" data-reveal>
        <p className="col-span-2 text-accent md:col-span-1">{project.index}</p>
        <p className="col-span-10 md:col-span-4">{project.kind}</p>
        <p className="col-span-12 mt-2 text-dim md:col-span-5 md:mt-0">{project.context}</p>
        <p className="col-span-12 mt-2 md:col-span-2 md:mt-0 md:text-right">
          {project.year ?? <ToAdd what="Year" />}
        </p>
      </div>

      <h3
        id={titleId}
        data-reveal="lines"
        className="mb-10 mt-10 text-[clamp(2.5rem,7.4vw,8rem)] font-medium leading-[0.92] tracking-[-0.05em] md:mb-16 md:mt-14"
      >
        <span className="line">
          <span>{project.name}</span>
        </span>
      </h3>

      <div className="grid-12 items-start gap-y-10">
        <div data-reveal className={cn('col-span-12 lg:col-span-7', flip && 'lg:order-2 lg:col-start-6')}>
          <ProjectPlate kind={project.plate} index={project.index} caption={project.plateCaption} label={project.name} />
        </div>

        <div
          className={cn(
            'col-span-12 lg:col-span-4 lg:sticky lg:top-28',
            flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9',
          )}
        >
          <p data-reveal className="text-[1.375rem] leading-[1.3] tracking-[-0.02em] md:text-[1.625rem]">
            {project.summary}
          </p>

          <div data-reveal className="mt-8">
            <h4 className="label mb-3 text-mute">The problem</h4>
            <p className="leading-[1.6] text-mute">{project.problem}</p>
          </div>

          <div data-reveal className="mt-8">
            <h4 className="label mb-3 text-mute">Stack</h4>
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {project.stack.map((tech) => (
                <li key={tech} className="label rounded-full border border-line px-3 py-1.5 text-paper">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="mt-9 flex flex-wrap items-center gap-3">
            {project.repo ? (
              <Magnetic>
                <a href={project.repo} target="_blank" rel="noreferrer" className="btn">
                  Repository <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> for {project.name} (opens in a new tab)</span>
                </a>
              </Magnetic>
            ) : (
              <ToAdd what="Repository link" />
            )}
            {project.live ? (
              <Magnetic>
                <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-solid">
                  Live <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> demo of {project.name} (opens in a new tab)</span>
                </a>
              </Magnetic>
            ) : null}
          </div>

          <details data-reveal className="group mt-10 border-y border-line">
            <summary className="flex items-center justify-between py-5">
              <span className="label text-paper">Engineering notes</span>
              <Plus size={18} className="plus text-mute" aria-hidden="true" />
            </summary>
            <div className="details-body pb-7">
              <h4 className="label mb-4 text-mute">Key challenges</h4>
              <ol className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <li key={challenge} className="flex gap-4 leading-[1.55] text-paper/85">
                    <span className="label mt-1.5 shrink-0 text-accent">0{i + 1}</span>
                    {challenge}
                  </li>
                ))}
              </ol>
              <h4 className="label mb-4 mt-8 text-mute">What it does</h4>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[0.9375rem] leading-snug text-mute">
                    <span className="mt-[0.55em] block h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </article>
  );
}

function Archive() {
  return (
    <div className="shell pt-16 md:pt-28">
      <div className="grid-12 pb-8">
        <h3 data-reveal className="col-span-12 text-3xl font-medium tracking-[-0.035em] md:col-span-6 md:text-5xl">
          Also <span className="serif">built</span>
        </h3>
        <p data-reveal className="col-span-12 mt-4 max-w-[26rem] text-mute md:col-span-5 md:col-start-8 md:mt-2">
          Smaller builds, experiments and team work. Each one taught something the last one did not.
        </p>
      </div>

      <ul className="border-b border-line">
        {archive.map((entry, i) => {
          const inner = (
            <>
              <span className="label row-mute col-span-2 text-mute md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-10 text-2xl font-medium tracking-[-0.03em] md:col-span-4 md:text-[1.75rem]">
                {entry.name}
              </span>
              <span className="row-mute col-span-10 col-start-3 mt-2 leading-snug text-mute md:col-span-4 md:col-start-auto md:mt-0">
                {entry.description}
              </span>
              <span className="label row-mute col-span-8 col-start-3 mt-3 text-mute md:col-span-2 md:col-start-auto md:mt-0">
                {entry.stack.join(' · ')}
              </span>
              <span className="label row-mute col-span-2 mt-3 flex items-center justify-end gap-3 text-mute md:col-span-1 md:mt-0">
                {entry.year ?? '—'}
                {entry.href ? <ArrowUpRight size={16} aria-hidden="true" /> : null}
              </span>
            </>
          );
          const className = 'row grid-12 items-baseline border-t border-line py-6 md:py-7';
          return (
            <li key={entry.name} data-reveal>
              {entry.href ? (
                <a href={entry.href} target="_blank" rel="noreferrer" className={className}>
                  {inner}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <div className={className}>
                  {inner}
                  <span className="col-span-10 col-start-3 mt-3 md:col-span-11 md:col-start-2">
                    <ToAdd what="Repository and details" />
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="pb-24 pt-20 md:pb-40 md:pt-32">
      <SectionHeader
        id="work-title"
        index="02"
        label="Selected work"
        aside="Four case studies — a store that takes real payments, two machine-learning tools that explain themselves, and a game."
      >
        <span className="line">
          <span>Things I have</span>
        </span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}>
          <span>
            <span className="serif">actually</span> built<span className="text-accent">.</span>
          </span>
        </span>
      </SectionHeader>

      {projects.map((project, i) => (
        <CaseStudy key={project.id} project={project} flip={i % 2 === 1} />
      ))}

      <Archive />
    </section>
  );
}
