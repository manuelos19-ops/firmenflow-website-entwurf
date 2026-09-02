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
  { label: "Google Business 360°", href: "/google-business-360" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Über Manu", href: "/#manu" },
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isOpen || isScrolled
            ? "bg-[var(--color-paper)]/85 backdrop-blur-xl backdrop-saturate-150 py-3 border-b border-[var(--color-line)] shadow-sm"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <Container className="flex items-center justify-between gap-4">
          {/* Brand Wordmark (Always full Firmenflow) */}
          <div className="shrink-0 flex items-center">
            <BrandMark />
          </div>

          {/* Desktop Nav (Consistent lg breakpoint) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Hauptnavigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--color-ink)]/75 hover:text-[var(--color-coral)] active:scale-[0.96] transition-all duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ButtonLink 
              href="/#projektanfrage" 
              variant="primary" 
              size="default"
              className="text-xs sm:text-sm px-5 py-2.5 shadow-sm"
            >
              Lass uns sprechen
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
        </Container>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-x-3 top-[4.5rem] z-50 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-3xl shadow-2xl p-6 transition-all duration-300 lg:hidden max-h-[calc(100vh-6rem)] overflow-y-auto",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col divide-y divide-[var(--color-line)]/40 mb-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-[var(--color-ink)] hover:text-[var(--color-coral)] transition-colors flex items-center justify-between py-3.5"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--color-muted)]" />
            </Link>
          ))}
        </nav>

        <div className="space-y-3 pt-2">
          <ButtonLink
            href="/#projektanfrage"
            variant="primary"
            size="default"
            className="w-full justify-center shadow-md shadow-[var(--color-coral)]/20"
            onClick={() => setIsOpen(false)}
          >
            Lass uns sprechen
          </ButtonLink>
          <p className="text-center text-xs text-[var(--color-muted)] font-medium">
            Persönlich mit Manu · Wesel &amp; Niederrhein
          </p>
        </div>
      </div>
    </>
  );
}
