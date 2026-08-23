'use client';

import { useScrollReveal } from '../animations/useGsap';
import ContactForm from '../ui/ContactForm';
import { CONTACT } from '../../lib/constants';

export default function Contact() {
  const headingRef = useScrollReveal({ y: 40 });

  return (
    <section id="kontakt" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {CONTACT.heading}
          </h2>
          <p className="text-lg text-muted">
            {CONTACT.subtext}
          </p>
        </div>

        {/* Formular */}
        <ContactForm />

        {/* Direkt-Kontakt */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">Oder direkt per E-Mail:</p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-lg font-medium text-primary hover:text-primary-light transition-colors"
          >
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
