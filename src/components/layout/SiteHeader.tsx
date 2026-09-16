"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const navigation = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Lokalpräsenz 360°", href: "/lokalpraesenz-360" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Über Manu", href: "/ueber-manu" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] px-3 sm:px-6 pointer-events-none",
          isOpen || isScrolled
            ? "pt-2 sm:pt-3"
            : "pt-4 sm:pt-6"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between gap-4 pointer-events-auto",
            isOpen || isScrolled
              ? "max-w-6xl rounded-full bg-[var(--color-paper)]/90 backdrop-blur-2xl backdrop-saturate-150 border border-[var(--color-line)] shadow-lg shadow-[var(--color-plum)]/[0.04] px-5 sm:px-7 py-2.5 ring-1 ring-white/60"
              : "max-w-[88rem] bg-transparent px-2 sm:px-4 py-2"
          )}
        >
          {/* Brand Wordmark (Always full Firmenflow) */}
          <div className="shrink-0 flex items-center">
            <BrandMark />
          </div>

          {/* Desktop Nav (Consistent lg breakpoint) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Hauptnavigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium text-[var(--color-ink)]/75 hover:text-[var(--color-coral)] hover:bg-black/[0.03] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ButtonLink 
              href="/#kontakt" 
              variant="primary" 
              size="default"
              className="text-xs sm:text-sm px-5 py-2.5 shadow-sm"
            >
              Website prüfen lassen
            </ButtonLink>
          </div>

          {/* Mobile / Tablet Menu Toggle */}
          <button
            ref={toggleButtonRef}
            type="button"
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2 text-[var(--color-ink)] hover:text-[var(--color-coral)] focus-visible:outline-none rounded-xl"
          >
            <span className="sr-only">{isOpen ? "Menü schließen" : "Menü öffnen"}</span>
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span
                className={cn(
                  "block h-0.5 bg-current transform transition-all duration-300 origin-center",
                  isOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-current transition-all duration-200",
                  isOpen ? "w-6 opacity-0" : "w-4"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-current transform transition-all duration-300 origin-center",
                  isOpen ? "w-6 -translate-y-2.5 -rotate-45" : "w-5"
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden animate-fade-in transition-all duration-500"
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Dropdown with Double-Bezel Hardware Architecture */}
      <div
        ref={menuRef}
        className={cn(
          // Achtung: hier NICHT double-bezel-outer verwenden - die Klasse setzt
          // position: relative und gewinnt gegen Tailwinds .fixed, wodurch das
          // geschlossene Menue im Textfluss bleibt und den Seiteninhalt nach
          // unten schiebt. Die Bezel-Optik ist deshalb hier als Utilities gesetzt.
          "fixed inset-x-4 top-[4.75rem] z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[2rem] p-1.5 border border-black/[0.06] bg-[var(--color-paper)]/95 backdrop-blur-2xl shadow-2xl",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <div className="double-bezel-inner p-6 bg-white/95">
          <nav className="flex flex-col divide-y divide-[var(--color-line)]/40 mb-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-[var(--color-ink)] hover:text-[var(--color-coral)] transition-colors flex items-center justify-between py-3.5"
              >
                <span>{item.label}</span>
                <span className="w-7 h-7 rounded-full bg-black/[0.04] flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-2">
            <ButtonLink
              href="/#kontakt"
              variant="primary"
              size="default"
              className="w-full justify-center shadow-md shadow-[var(--color-coral)]/20"
              onClick={() => setIsOpen(false)}
            >
              Website prüfen lassen
            </ButtonLink>
            <p className="text-center text-xs text-[var(--color-muted)] font-medium">
              Persönlich mit Manu · Wesel &amp; Niederrhein
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
