"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface SectionItem {
  id: string;
  number: string;
  label: string;
}

const sections: SectionItem[] = [
  { id: "hero", number: "01", label: "Start" },
  { id: "problem", number: "02", label: "Die Realität" },
  { id: "story", number: "03", label: "3-Akt Story" },
  { id: "projekte", number: "04", label: "3D-Orbit" },
  { id: "leistungen", number: "05", label: "Leistungen" },
  { id: "manu", number: "06", label: "Direkt mit Manu" },
  { id: "google-pilot", number: "07", label: "Google 360°" },
  { id: "ablauf", number: "08", label: "Ablauf" },
  { id: "faq", number: "09", label: "FAQ" },
  { id: "kontakt", number: "10", label: "Anfrage" },
];

export function SectionDotNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.38;

      let currentId = sections[0].id;

      // Iterate through sections from top to bottom
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section has reached the upper third of the viewport, it's active
          if (rect.top <= triggerY) {
            currentId = sec.id;
          }
        }
      }

      // If scrolled near bottom of page, highlight last section (kontakt)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        currentId = sections[sections.length - 1].id;
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check after paint
    handleScroll();
    const timeout = setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <aside 
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5 items-end pointer-events-auto select-none bg-white/70 backdrop-blur-md px-2 py-3.5 rounded-full border border-[var(--color-line)]/80 shadow-lg shadow-black/5"
      aria-label="Abschnittsnavigation"
    >
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <div
            key={sec.id}
            className="group relative flex items-center justify-end"
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Tooltip Label sliding in on hover */}
            <div
              className={cn(
                "absolute right-8 pointer-events-none transition-all duration-200 ease-out whitespace-nowrap z-50",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none"
              )}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[var(--color-ink)] shadow-2xl border border-[var(--color-line)] backdrop-blur-md text-xs font-bold font-sans">
                <span className="text-[var(--color-coral)] font-mono">{sec.number}</span>
                <span>{sec.label}</span>
              </div>
            </div>

            {/* Clickable Dot Indicator */}
            <button
              type="button"
              onClick={() => scrollTo(sec.id)}
              aria-label={`Springe zu ${sec.label}`}
              className={cn(
                "relative rounded-full transition-all duration-300 ease-[var(--ease-out)] cursor-pointer flex items-center justify-center",
                isActive
                  ? "h-7 w-2.5 bg-[var(--color-coral)] shadow-md shadow-[var(--color-coral)]/40 ring-4 ring-[var(--color-coral)]/20"
                  : "h-2 w-2 bg-[var(--color-ink)]/25 hover:bg-[var(--color-coral)] hover:scale-150"
              )}
            >
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              )}
            </button>
          </div>
        );
      })}
    </aside>
  );
}
