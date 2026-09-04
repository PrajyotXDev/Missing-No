import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prajyot Satarde — Portfolio',
  description: 'Full-stack portfolio of Prajyot Satarde, Mathematics and Computing student at IIT Dharwad.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
