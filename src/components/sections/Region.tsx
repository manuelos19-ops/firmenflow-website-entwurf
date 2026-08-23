'use client';

import { useScrollReveal } from '../animations/useGsap';
import { REGION } from '../../lib/constants';

export default function Region() {
  const ref = useScrollReveal({ y: 50, stagger: 0.15, selector: '.region-item' });

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <p className="region-item text-sm font-medium text-accent uppercase tracking-widest mb-6">
          Lokalpräsenz
        </p>
        <h2 className="region-item text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
          {REGION.heading}
        </h2>
        <h2 className="region-item text-3xl md:text-4xl lg:text-5xl font-bold font-serif italic text-primary mb-8">
          {REGION.subheading}
        </h2>
        <p className="region-item text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          {REGION.text}
        </p>
      </div>
    </section>
  );
}
