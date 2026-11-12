import { ArrowUp } from 'lucide-react';
import { site } from '@/content/site';
import { LocalTime } from '@/components/ui/LocalTime';

export function Footer() {
  return (
    <footer className="overflow-hidden pt-10">
      <div className="shell">
        <div className="h-px w-full bg-line" aria-hidden="true" />
        <div className="grid-12 label gap-y-4 py-6 text-mute">
          <p className="col-span-6 md:col-span-3">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="col-span-6 text-right md:col-span-3 md:text-left">
            {site.location.split(',')[0]} · <LocalTime timeZone={site.timeZone} />
          </p>
          <p className="col-span-8 text-dim md:col-span-4">Next.js · TypeScript · Tailwind · WebGL</p>
          <p className="col-span-4 text-right md:col-span-2">
            <a href="#top" className="inline-flex items-center gap-2 py-2 transition-colors hover:text-paper">
              Top <ArrowUp size={12} aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="display -mb-[0.16em] select-none whitespace-nowrap text-center text-[23.5vw] leading-[0.8] text-paper/[0.06]"
      >
        {site.firstName}
        <span className="text-accent/60">.</span>
      </p>
    </footer>
  );
}
