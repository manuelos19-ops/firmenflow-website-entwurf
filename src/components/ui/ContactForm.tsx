'use client';

import { useState } from 'react';
import Button from './Button';
import { CONTACT } from '../../lib/constants';
import { cn } from '../../lib/utils';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [selectedService, setSelectedService] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      // Honeypot
      website: formData.get('website') as string,
    };

    // Honeypot-Check (Bots füllen versteckte Felder aus)
    if (data.website) {
      setStatus('success'); // Fake-Erfolg für Bot
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Danke für deine Nachricht!</h3>
        <p className="text-muted">Ich melde mich innerhalb von 24 Stunden bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 md:p-12 space-y-6">
      {/* Honeypot – unsichtbar für echte User */}
      <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="Dein Name"
        />
      </div>

      {/* E-Mail */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">E-Mail *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="deine@email.de"
        />
      </div>

      {/* Telefon */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Telefon <span className="text-muted">(optional)</span></label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="0123 456 789"
        />
      </div>

      {/* Service-Auswahl */}
      <div>
        <p className="block text-sm font-medium text-foreground mb-3">Was brauchst du? *</p>
        <div className="grid grid-cols-2 gap-3">
          {CONTACT.services.map((service) => (
            <label
              key={service}
              className={cn(
                'flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all',
                selectedService === service
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/30 text-muted'
              )}
            >
              <input
                type="radio"
                name="service"
                value={service}
                required
                onChange={(e) => setSelectedService(e.target.value)}
                className="sr-only"
              />
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  selectedService === service ? 'border-primary' : 'border-border'
                )}
              >
                {selectedService === service && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-sm font-medium">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Nachricht */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Erzähl mir mehr</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          placeholder="Was schwebt dir vor? Gibt es eine bestehende Website?"
        />
      </div>

      {/* Submit */}
      <div>
        <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}
          className="w-full sm:w-auto">
          {status === 'sending' ? 'Wird gesendet...' : 'Anfrage senden'}
        </Button>
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="text-sm text-red-600">
          Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib direkt an mail@firmenflow.de.
        </p>
      )}
    </form>
  );
}
