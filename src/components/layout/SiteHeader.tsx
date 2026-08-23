"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const navigation = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Über Manu", href: "/#manu" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
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
          ? "bg-[var(--color-paper)]/90 backdrop-blur-md py-3.5 border-b border-[var(--color-line)] shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        <BrandMark />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-ink)]/80 hover:text-[var(--color-plum)] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <ButtonLink href="/#projektanfrage" variant="primary" size="default">
            Projekt anfragen
          </ButtonLink>
        </div>

        {/* Mobile Toggle */}
        <button
          ref={toggleButtonRef}
          type="button"
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 p-2 text-[var(--color-ink)] hover:text-[var(--color-plum)] focus-visible:outline-none"
        >
          <span className="sr-only">{isOpen ? "Menü schließen" : "Menü öffnen"}</span>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={cn(
                "block h-0.5 w-full bg-current transform transition-transform duration-300",
                isOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn("block h-0.5 w-full bg-current transition-opacity duration-300", isOpen && "opacity-0")}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-current transform transition-transform duration-300",
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
          "fixed inset-0 top-0 z-40 bg-[var(--color-paper)] flex flex-col justify-between px-6 pt-28 pb-12 transition-all duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink)] hover:text-[var(--color-coral)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-[var(--color-line)] space-y-4">
          <ButtonLink
            href="/#projektanfrage"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Projekt anfragen
          </ButtonLink>
          <p className="text-center text-xs text-[var(--color-muted)]">
            Direkt mit Manu · Wesel & Niederrhein
          </p>
        </div>
      </div>
    </header>
  );
}
