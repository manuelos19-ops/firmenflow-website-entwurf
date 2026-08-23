import Link from 'next/link';
import { FOOTER, NAV_LINKS } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Marke */}
          <div>
            <p className="text-2xl font-bold mb-1">{FOOTER.brand}</p>
            <p className="text-white/50 text-sm font-serif italic">{FOOTER.slogan}</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">Navigation</p>
            <nav className="flex flex-col gap-2" aria-label="Footer-Navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Rechtliches */}
          <div>
            <p className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">Rechtliches</p>
            <nav className="flex flex-col gap-2" aria-label="Rechtliche Links">
              {FOOTER.legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30">{FOOTER.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
