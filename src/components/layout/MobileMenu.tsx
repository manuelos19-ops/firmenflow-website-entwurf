'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../ui/Button';
import { NAV_LINKS } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current || !linksRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        duration: prefersReducedMotion ? 0 : 0.3,
        pointerEvents: 'auto',
      });

      if (!prefersReducedMotion) {
        const links = linksRef.current.querySelectorAll('.mobile-link');
        gsap.fromTo(
          links,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power3.out' }
        );
      }
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: prefersReducedMotion ? 0 : 0.3,
        pointerEvents: 'none',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-40 bg-background opacity-0 pointer-events-none md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Hauptnavigation"
    >
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <nav ref={linksRef} className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="mobile-link text-3xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-link mt-4">
            <Button href="#kontakt" variant="primary" size="lg" onClick={onClose}>
              Projekt starten
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
