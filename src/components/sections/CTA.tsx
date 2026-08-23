'use client';

import { useScrollReveal } from '../animations/useGsap';
import Button from '../ui/Button';
import MagneticElement from '../ui/MagneticElement';
import { CTA as CTA_DATA } from '../../lib/constants';

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10H16M16 10L11 5M16 10L11 15" />
  </svg>
);

export default function CTA() {
  const ref = useScrollReveal({ y: 50, stagger: 0.15, selector: '.cta-item' });

  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="cta-item text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {CTA_DATA.heading}
        </h2>
        <p className="cta-item text-lg text-muted mb-10">
          {CTA_DATA.subtext}
        </p>
        <div className="cta-item">
          <MagneticElement strength={0.15}>
            <Button href="#kontakt" variant="primary" size="lg" icon={<ArrowRight />}>
              {CTA_DATA.button}
            </Button>
          </MagneticElement>
        </div>
      </div>
    </section>
  );
}
