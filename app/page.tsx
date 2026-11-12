import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/sections/About';
import { Work } from '@/components/sections/Work';
import { Arsenal } from '@/components/sections/Arsenal';
import { Journey } from '@/components/sections/Journey';
import { Beyond } from '@/components/sections/Beyond';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Arsenal />
        <Journey />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
