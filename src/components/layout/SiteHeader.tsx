"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";

const navigation = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Direkt mit Manu", href: "/#manu" },
  { label: "Google Business", href: "/#google-pilot" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "FAQ", href: "/#faq" },
] as const;

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--color-paper)]/90 backdrop-blur-lg py-3 border-b border-[var(--color-line)] shadow-sm"
          : "bg-transparent py-4 sm:py-5"
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <div className="shrink-0">
          <BrandMark />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-7" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-ink)]/75 hover:text-[var(--color-coral)] transition-colors duration-200"
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
            Projekt anfragen
          </ButtonLink>
        </div>

        {/* Mobile / Tablet Menu Toggle */}
        <button
          ref={toggleButtonRef}
          type="button"
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden relative z-50 p-2.5 rounded-xl text-[var(--color-ink)] hover:bg-[var(--color-plum)]/5 focus-visible:outline-none"
        >
          <span className="sr-only">{isOpen ? "Menü schließen" : "Menü öffnen"}</span>
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={cn(
                "block h-0.5 w-full bg-current transform transition-transform duration-300 origin-center",
                isOpen && "translate-y-1.5 rotate-45"
              )}
            />
            <span
              className={cn("block h-0.5 w-full bg-current transition-opacity duration-200", isOpen && "opacity-0")}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-current transform transition-transform duration-300 origin-center",
                isOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </Container>

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-x-4 top-20 z-40 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-3xl shadow-2xl p-6 transition-all duration-300 xl:hidden",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-3.5 mb-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-[var(--color-ink)] hover:text-[var(--color-coral)] transition-colors flex items-center justify-between py-1"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--color-muted)]" />
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-[var(--color-line)] space-y-3">
          <ButtonLink
            href="/#projektanfrage"
            variant="primary"
            size="default"
            className="w-full justify-center"
            onClick={() => setIsOpen(false)}
          >
            Projekt anfragen
          </ButtonLink>
          <p className="text-center text-xs text-[var(--color-muted)]">
            Direkt mit Manu · Wesel &amp; Niederrhein
          </p>
        </div>
      </div>
    </header>
  );
}
