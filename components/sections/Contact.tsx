import { ArrowUpRight } from 'lucide-react';
import { contact, site } from '@/content/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CopyButton } from '@/components/ui/CopyButton';
import { ContactForm } from './ContactForm';

export function Contact() {
  // Read at build/request time on the server; the form adapts instead of pretending to send.
  const delivery = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO);

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-16 pt-20 md:pb-24 md:pt-32">
      <SectionHeader id="contact-title" index="06" label="Contact">
        <span className="line">
          <span>Have an</span>
        </span>
        <span className="line" style={{ '--i': 1 } as React.CSSProperties}>
          <span>
            interesting <span className="serif">idea</span>
            <span className="text-accent">?</span>
          </span>
        </span>
      </SectionHeader>

      <div className="shell">
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 xl:col-span-5 xl:col-start-4">
            <p data-reveal className="serif text-[clamp(2rem,4.2vw,4rem)] leading-[1.02]">
              {contact.headline[1]}
            </p>
            <p data-reveal className="mt-6 max-w-[30rem] text-lg leading-[1.55] text-mute">
              {contact.note}
            </p>

            <div data-reveal className="mt-12">
              <p className="label mb-3 text-mute">Write to</p>
              <a
                href={`mailto:${site.email}`}
                className="link-line break-all text-[clamp(1.25rem,2.5vw,2.25rem)] font-medium tracking-[-0.035em]"
              >
                {site.email}
              </a>
              <div className="mt-6">
                <CopyButton value={site.email} label="Copy address" />
              </div>
            </div>

            <ul data-reveal className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer" className="link-line py-2 text-lg">
                    {social.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="col-span-12 lg:col-span-3 lg:col-start-10 xl:col-span-4 xl:col-start-9">
            <p className="label mb-8 text-mute">Or leave a note</p>
            <ContactForm email={site.email} delivery={delivery} />
          </div>
        </div>
      </div>
    </section>
  );
}
