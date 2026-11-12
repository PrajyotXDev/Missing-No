import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { site } from '@/content/site';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Cursor } from '@/components/ui/Cursor';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const title = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    'IIT Dharwad',
    'Mathematics and Computing',
    'software engineer',
    'full-stack developer',
    'portfolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  description: site.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Dharwad', addressRegion: 'Karnataka', addressCountry: 'IN' },
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology Dharwad' },
  sameAs: site.socials.map((social) => social.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <noscript>
          <style>{`.loader{display:none}[data-reveal],.line>span,.scroll-word{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>

        {/* Pure CSS: it leaves on a timer whether or not JavaScript has loaded. */}
        <div className="loader" aria-hidden="true">
          <div className="label flex justify-between text-mute">
            <span>{site.name}</span>
            <span>{site.tagline}</span>
          </div>
          <div>
            <div className="display loader-count text-[22vw] leading-[0.8] md:text-[14vw]" />
            <div className="mt-6 h-px w-full bg-line">
              <div className="loader-bar h-full w-full bg-accent" />
            </div>
          </div>
        </div>

        {children}

        <SmoothScroll />
        <Cursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
