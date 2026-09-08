"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

interface QrRedirectProps {
  eventName: string;
  label: string;
}

export function QrRedirect({ eventName, label }: QrRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    // 1. Vercel Analytics Custom Event feuern (erscheint unter "Custom Events" im Vercel Dashboard)
    try {
      track(eventName, { source: "qr_code", medium: "print" });
    } catch {
      // Ignorieren falls blockiert
    }

    // 2. Nach 350ms (damit Pageview & Event-Beacon sicher übertragen werden) geräuschlos zur Startseite
    const timer = setTimeout(() => {
      router.replace("/");
    }, 350);

    return () => clearTimeout(timer);
  }, [router, eventName]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] text-[#1E1926] px-6 text-center selection:bg-[#FF6B55]/20">
      <div className="flex flex-col items-center max-w-sm space-y-4">
        {/* Eleganter Marken-Ladeindikator */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#7B2869]/15" />
          <div className="w-10 h-10 rounded-full border-2 border-[#FF6B55] border-t-transparent animate-spin" />
        </div>

        <div className="space-y-1">
          <p className="font-editorial text-2xl text-[#1E1926] italic">
            Willkommen bei Firmenflow
          </p>
          <p className="text-xs text-[#5C5565] tracking-wider uppercase font-medium">
            {label}
          </p>
        </div>

        {/* Fallback falls JS deaktiviert ist */}
        <noscript>
          <div className="pt-4">
            <a
              href="/"
              className="inline-block px-4 py-2 bg-[#FF6B55] text-white rounded-lg text-sm font-medium hover:bg-[#ff553b] transition-colors"
            >
              Direkt zur Startseite →
            </a>
          </div>
        </noscript>
      </div>
    </div>
  );
}
