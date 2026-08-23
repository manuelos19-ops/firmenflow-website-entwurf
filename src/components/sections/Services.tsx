'use client';

import { useScrollReveal } from '../animations/useGsap';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { SERVICES } from '../../lib/constants';

// Einfache SVG Icons
const icons: Record<string, React.ReactNode> = {
  globe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  refresh: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6" />
      <path d="M2.5 22v-6h6" />
      <path d="M2.5 11.5a10 10 0 0 1 18.37-4.5" />
      <path d="M21.5 12.5a10 10 0 0 1-18.37 4.5" />
    </svg>
  ),
  mapPin: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function Services() {
  const headingRef = useScrollReveal({ y: 40 });
  const cardsRef = useScrollReveal({ y: 60, stagger: 0.2, selector: '.service-card' });
  const noteRef = useScrollReveal({ y: 30, delay: 0.3 });

  return (
    <section id="leistungen" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Was ich für dich{' '}
            <span className="font-serif italic text-primary">umsetze.</span>
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card group relative bg-background rounded-2xl p-8 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Badge für Pilot */}
              {service.badge && (
                <div className="absolute top-6 right-6">
                  <Badge variant="pilot">{service.badge}</Badge>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                {icons[service.icon]}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-1">{service.title}</h3>
              <p className="text-sm font-medium text-accent mb-4">{service.subtitle}</p>
              <p className="text-muted leading-relaxed mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Preis-Hinweis */}
        <div ref={noteRef} className="mt-12 text-center">
          <p className="text-muted mb-4">
            Kein Festpreis-Baukasten. Jedes Projekt wird individuell kalkuliert.
          </p>
          <Button href="#kontakt" variant="ghost">
            Projekt anfragen →
          </Button>
        </div>
      </div>
    </section>
  );
}
