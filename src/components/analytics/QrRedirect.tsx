"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { track } from "@vercel/analytics";

interface QrRedirectProps {
  eventName: string;
  badgeText: string;
}

export function QrRedirect({ eventName, badgeText }: QrRedirectProps) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // 1. Vercel Analytics Custom Event feuern
    try {
      track(eventName, { source: "qr_code", medium: "print" });
    } catch {
      // Analytics-Fehler abfangen
    }

    // 2. Nach 1,2 Sekunden geschmeidig zur Startseite weiterleiten
    const timer = setTimeout(() => {
      setRedirecting(true);
      router.replace("/");
    }, 1200);

    return () => clearTimeout(timer);
  }, [router, eventName]);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#FDFBF7] text-[#1E1926] px-6 select-none">
      <div className="flex flex-col items-center max-w-sm w-full space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
        {/* Firmenflow Wordmark Logo */}
        <div className="relative w-48 h-12">
          <Image
            src="/brand/firmenflow-wordmark.webp"
            alt="Firmenflow"
            fill
            priority
            className="object-contain"
            sizes="200px"
          />
        </div>

        {/* Willkommens-Text & Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B55]/10 border border-[#FF6B55]/20 text-[#FF6B55] text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B55] animate-ping" />
            <span>{badgeText}</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1E1926] italic pt-1">
            Willkommen bei Firmenflow
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5565] max-w-xs mx-auto leading-relaxed">
            Schön, dass du da bist. Einen kurzen Moment, ich leite dich direkt auf die Website weiter…
          </p>
        </div>

        {/* Geschmeidiger Fortschrittsbalken (1.2s Füllzeit) */}
        <div className="w-48 h-1.5 bg-[#1E1926]/8 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#FF6B55] to-[#7B2869] rounded-full transition-all ease-out"
            style={{
              width: redirecting ? "100%" : "95%",
              transitionDuration: "1200ms",
            }}
          />
        </div>

        {/* Barrierefreier Fallback für manuelle Weiterleitung */}
        <div className="pt-2">
          <a
            href="/"
            className="text-xs text-[#5C5565]/70 hover:text-[#FF6B55] underline underline-offset-4 transition-colors"
          >
            Klicke hier, falls es nicht automatisch weitergeht →
          </a>
        </div>
      </div>
    </div>
  );
}
