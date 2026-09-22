import Image from "next/image";

export function FlowscreenFounderQuote() {
  return (
    <section className="relative max-w-4xl mx-auto my-10 sm:my-14 text-left">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white/95 backdrop-blur-md shadow-xl shadow-[var(--color-plum)]/5 p-6 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[230px_1fr] gap-6 sm:gap-8 items-center">
          {/* Portrait */}
          <div className="relative mx-auto md:mx-0 w-44 sm:w-48 md:w-full aspect-square rounded-2xl overflow-hidden border border-black/10 shadow-lg bg-slate-900 shrink-0">
            <Image
              src="/media/portraits/manu-flowscreen-quote.jpg"
              alt="Manuel Landeck – Entwickler von FlowScreen"
              fill
              sizes="(max-width: 768px) 192px, 230px"
              className="object-cover object-center"
            />
            <div className="absolute bottom-2 inset-x-2 px-2 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-center">
              <p className="text-[11px] font-semibold text-white/90 tracking-wide">
                Persönlich mit Manu
              </p>
            </div>
          </div>

          {/* Quote & Story */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/25 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              <span>Hinter den Kulissen</span>
            </div>

            <blockquote className="space-y-3">
              <p className="text-lg sm:text-xl md:text-2xl font-display font-bold text-[var(--color-ink)] leading-snug">
                „Ganz ehrlich: Ich habe ewig nach einem Screenshot-Tool für Windows gesucht, das nicht aussieht wie aus den 90ern, mich nicht mit 80 Menüs erschlägt oder gleich ein 40-Euro-Abo will.“
              </p>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                Irgendwann hatte ich die Schnauze voll – und hab mir das Ding einfach selbst gebaut. Keine Cloud, kein Registrierungs-Zwang, blitzschnelle 1-Klick-Mockups für saubere Kundenpräsentationen. Unser ganzes Team nutzt es täglich – und du kriegst es for free.
              </p>
            </blockquote>

            <div className="pt-3 border-t border-[var(--color-line)] flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[var(--color-ink)]">
                  Manuel „Manu“ Landeck
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  Gründer Firmenflow &amp; Entwickler von FlowScreen
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100 % selbst gebaut &amp; kostenlos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
