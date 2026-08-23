import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Process from '../components/sections/Process';
import Region from '../components/sections/Region';
import CTA from '../components/sections/CTA';
import Contact from '../components/sections/Contact';
import Marquee from '../components/ui/Marquee';
import { INDUSTRIES } from '../lib/constants';

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Branchen-Marquee */}
      <div className="py-8 border-y border-border">
        <Marquee items={INDUSTRIES} />
      </div>
      
      <About />
      <Services />
      <Projects />
      <Process />
      <Region />
      <CTA />
      <Contact />
    </main>
  );
}
