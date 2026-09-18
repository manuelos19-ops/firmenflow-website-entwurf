"use client";

import { Container } from "@/components/ui/Container";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { 
  FileCheck2, 
  CheckCircle2, 
  Globe2, 
  CalendarClock, 
  FolderDown 
} from "lucide-react";

const commitments = [
  {
    icon: FileCheck2,
    title: "Verbindlicher Leistungsumfang und klarer Preis vor dem Start",
    detail: "Kein Angebot, das im Nachhinein teurer wird. Du kennst Umfang und Festpreis vor dem ersten Handgriff.",
  },
  {
    icon: CheckCircle2,
    title: "Online erst nach deiner Freigabe",
    detail: "Wir prüfen den Entwurf gemeinsam auf deinem Handy. Erst wenn du nickst, geht deine Seite öffentlich live.",
  },
  {
    icon: Globe2,
    title: "Die Domain läuft auf dich",
    detail: "Deine Webadresse gehört dir und bleibt dein Eigentum – unabhängig davon, ob wir langfristig zusammenarbeiten.",
  },
  {
    icon: CalendarClock,
    title: "Betreuung monatlich kündbar",
    detail: "Keine 12- oder 24-Monats-Verträge. Du bleibst, weil der Service dir den Rücken freihält – nicht wegen einer Klausel.",
  },
  {
    icon: FolderDown,
    title: "Das vollständige Projekt erhältst du auf Wunsch",
    detail: "Alle Dateien, Texte und der Code gehören dir. Du kannst dein Projekt jederzeit exportieren oder umziehen.",
  },
];

export function TrustCommitmentSection() {
  return (
    <section 
      id="vertrauen" 
      className="py-12 sm:py-16 md:py-20 bg-stone-50/70 border-b border-[var(--color-line)]/70 scroll-mt-24"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="badge-eyebrow mb-4">
            <BrandIcon className="w-3.5 h-3" />
            <span>Verbindliche Zusagen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] leading-tight mb-3">
            Du weißt vorher, worauf du dich einlässt.
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed max-w-xl mx-auto">
            Fünf feste Vereinbarungen für eine Zusammenarbeit auf Augenhöhe – verbindlich, transparent und ohne Agentur-Klauseln.
          </p>
        </div>

        {/* 5 Commitments Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            const isWide = idx === 0;
            return (
              <div
                key={item.title}
                className={`p-5 sm:p-6 rounded-2xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
                  isWide ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-coral)]/10 text-[var(--color-coral)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-ink)] mb-2 font-sans leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
