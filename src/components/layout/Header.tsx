'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from '../../lib/constants';
import { cn } from '../../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body-Scroll sperren wenn Mobile-Menü offen
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border/50 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Markenname */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-foreground tracking-tight">
              Manu
            </span>
            <span className="text-xs text-muted hidden sm:inline font-medium">
              für deine Lokalpräsenz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Hauptnavigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button href="#kontakt" variant="primary" size="default">
                Projekt starten
              </Button>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={cn(
                  'w-6 h-[2px] bg-foreground transition-all duration-300',
                  isMobileMenuOpen && 'rotate-45 translate-y-[5px]'
                )}
              />
              <span
                className={cn(
                  'w-6 h-[2px] bg-foreground transition-all duration-300',
                  isMobileMenuOpen && '-rotate-45 -translate-y-[3px]'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
