'use client';

import { useScrollReveal } from '../animations/useGsap';
import { ABOUT } from '../../lib/constants';

export default function About() {
  const textRef = useScrollReveal({ y: 40, stagger: 0.1, selector: '.about-item' });
  const imageRef = useScrollReveal({ y: 60, duration: 1.2 });

  return (
    <section id="ueber-manu" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Bild */}
          <div ref={imageRef} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
            {/* Platzhalter bis echtes Foto kommt */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-serif italic text-primary">M</span>
                </div>
                <p className="text-sm text-muted">Profilfoto folgt</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef}>
            <p className="about-item text-sm font-medium text-accent uppercase tracking-widest mb-4">
              {ABOUT.region}
            </p>
            <h2 className="about-item text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {ABOUT.heading.split('.')[0]}.
              <br />
              <span className="font-serif italic text-primary">
                {ABOUT.heading.split('.')[1]?.trim()}
              </span>
            </h2>
            <p className="about-item text-lg text-muted leading-relaxed">
              {ABOUT.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
