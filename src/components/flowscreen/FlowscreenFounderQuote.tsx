"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export function FlowscreenFounderQuote() {
  const photoRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      // Sanfter 3D-Neigungswinkel (max. ±12 Grad)
      const rotateX = (0.5 - y) * 16;
      const rotateY = (x - 0.5) * 16;
      setTransform({
        rotateX,
        rotateY,
        glareX: x * 100,
        glareY: y * 100,
        isHovered: true,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTransform({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  }, []);

  return (
    <section className="relative max-w-4xl mx-auto my-10 sm:my-14 text-left">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white/95 backdrop-blur-md shadow-xl shadow-[var(--color-plum)]/5 p-6 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[230px_1fr] gap-6 sm:gap-8 items-center">
          {/* Portrait mit interaktivem Viewfinder-Fokus & 3D-Tilt */}
          <div className="relative mx-auto md:mx-0 w-44 sm:w-48 md:w-full aspect-square shrink-0">
            {/* Ambient Aura Glow */}
            <div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[var(--color-coral)]/30 via-[var(--color-plum)]/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
              aria-hidden="true"
            />

            <div
              ref={photoRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer select-none border border-black/15 shadow-xl bg-slate-950 will-change-transform"
              style={{ perspective: "800px" }}
            >
              {/* 3D-neigbarer Container */}
              <div
                className="relative w-full h-full transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${
                    transform.isHovered ? 1.03 : 1
                  }, ${transform.isHovered ? 1.03 : 1}, 1)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src="/media/portraits/manu-flowscreen-quote.jpg"
                  alt="Manuel Landeck, Entwickler von FlowScreen"
                  fill
                  sizes="(max-width: 768px) 192px, 230px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Screenshot-Viewfinder Fokus-Ecken (Kamera-Fokus-Brackets) */}
                <div className="absolute inset-2 pointer-events-none z-20">
                  <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-coral)]/60 group-hover:border-[var(--color-coral)] rounded-tl transition-colors duration-200" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--color-coral)]/60 group-hover:border-[var(--color-coral)] rounded-tr transition-colors duration-200" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--color-coral)]/60 group-hover:border-[var(--color-coral)] rounded-bl transition-colors duration-200" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--color-coral)]/60 group-hover:border-[var(--color-coral)] rounded-br transition-colors duration-200" />
                </div>

                {/* Dynamischer Lichtglanz / Specular Glare */}
                <div
                  className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
                  style={{
                    opacity: transform.isHovered ? 0.35 : 0,
                    background: `radial-gradient(circle 140px at ${transform.glareX}% ${transform.glareY}%, rgba(255, 255, 255, 0.75), transparent 75%)`,
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Interaktiver Scanner-Beam an der Cursor-Linie */}
                {transform.isHovered && (
                  <div
                    className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-coral)] to-transparent pointer-events-none z-20"
                    style={{
                      top: `${transform.glareY}%`,
                      boxShadow: "0 0 10px var(--color-coral), 0 0 4px #ffffff",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Zitat & Hintergrund */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/25 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              <span>Hinter den Kulissen</span>
            </div>

            <blockquote className="space-y-3">
              <p className="text-lg sm:text-xl md:text-2xl font-display font-bold text-[var(--color-ink)] leading-snug">
                „Ganz ehrlich: Ich habe ewig nach einem Screenshot-Tool für Windows gesucht, das nicht aussieht wie aus den 90ern, mich nicht mit 80 Menüs erschlägt oder gleich ein 40-Euro-Abo will.“
              </p>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                Irgendwann hatte ich die Schnauze voll und hab mir das Ding einfach selbst gebaut. Keine Cloud, kein Registrierungs-Zwang, blitzschnelle 1-Klick-Mockups für saubere Kundenpräsentationen.
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
