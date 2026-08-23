'use client';

import { useScrollReveal } from '../animations/useGsap';
import { PROCESS_STEPS } from '../../lib/constants';

export default function Process() {
  const headingRef = useScrollReveal({ y: 40 });
  const stepsRef = useScrollReveal({ y: 50, stagger: 0.2, selector: '.process-step' });

  return (
    <section className="py-24 md:py-32 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            So läuft&apos;s{' '}
            <span className="font-serif italic text-accent">mit Manu.</span>
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-0">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.number} className="process-step">
              <div className="flex gap-6 md:gap-10 py-8">
                <span className="text-4xl md:text-5xl font-bold text-white/20 font-serif">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
              {index < PROCESS_STEPS.length - 1 && (
                <div className="h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
