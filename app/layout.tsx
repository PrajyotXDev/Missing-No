import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prajyot Satarde — Developer Portfolio',
  description: 'Portfolio of Prajyot Satarde, Mathematics and Computing student at IIT Dharwad, building across AI, full-stack development, games, robotics and astronomy.',
  metadataBase: new URL('https://prajyotxdev.github.io'),
  openGraph: {
    title: 'Prajyot Satarde — Developer Portfolio',
    description: 'Student builder working across AI, software, games, robotics and astronomy.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prajyot Satarde — Developer Portfolio',
    description: 'Student builder working across AI, software, games, robotics and astronomy.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#07090b',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
