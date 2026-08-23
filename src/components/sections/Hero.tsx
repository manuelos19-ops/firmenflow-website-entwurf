'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../ui/Button';
import MagneticElement from '../ui/MagneticElement';
import { HERO } from '../../lib/constants';

// Pfeil-SVG für CTA
const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const lines = containerRef.current.querySelectorAll('.hero-line');
    const buttons = containerRef.current.querySelectorAll('.hero-cta');
    const region = containerRef.current.querySelector('.hero-region');

    tl.fromTo(lines[0], { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(lines[1], { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.7')
      .fromTo(lines[2], { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
      .fromTo(lines[3], { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
      .fromTo(buttons, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, '-=0.4')
      .fromTo(region, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Kernversprechen */}
        <div className="space-y-2 md:space-y-3">
          <div className="overflow-hidden">
            <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              {HERO.line1}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              {HERO.line2}
            </p>
          </div>
          <div className="overflow-hidden pt-4">
            <p className="hero-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-primary">
              {HERO.line3}
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="hero-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-primary">
              {HERO.line4}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <MagneticElement strength={0.15}>
            <div className="hero-cta">
              <Button href="#kontakt" variant="primary" size="lg" icon={<ArrowRight />}>
                {HERO.ctaPrimary}
              </Button>
            </div>
          </MagneticElement>
          <div className="hero-cta">
            <Button href="#leistungen" variant="secondary" size="lg">
              {HERO.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Region */}
        <p className="hero-region mt-16 text-sm text-muted tracking-widest uppercase">
          {HERO.region}
        </p>
      </div>
    </section>
  );
}
