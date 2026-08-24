import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";
import { siteIdentity } from "@/config/site";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-plum)] text-white pt-20 pb-12 mt-auto">
      <Container className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <BrandMark variant="light" />
            <p className="font-editorial text-lg text-white/80">
              {siteIdentity.slogan}
            </p>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Persönliches Webdesign und digitale Sichtbarkeit für lokale Unternehmen in Wesel, am Niederrhein und in NRW.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-coral)]">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/#leistungen" className="hover:text-white transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="/#projekte" className="hover:text-white transition-colors">
                  Projekte
                </Link>
              </li>
              <li>
                <Link href="/#manu" className="hover:text-white transition-colors">
                  Über Manu
                </Link>
              </li>
              <li>
                <Link href="/#ablauf" className="hover:text-white transition-colors">
                  Ablauf
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-coral)]">
              Rechtliches
            </p>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {currentYear} {siteIdentity.legalName}. Alle Rechte vorbehalten.
          </p>
          <p>Direkt mit Manu · Wesel & Niederrhein</p>
        </div>
      </Container>
    </footer>
  );
}
