"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/cn";
import { getFlowscreenDownloadUrl, FLOWSCREEN_VERSION } from "@/lib/flowscreen";
import { trackFlowscreenDownload } from "@/lib/track-flowscreen";

/**
 * Sticky Download-Leiste für /flowscreen.
 * Erscheint erst nach dem Hero (Scroll > 700px), damit sie nicht mit dem
 * Haupt-CTA konkurriert. Mobile als Bottom-Bar, Desktop als kompakte Pille.
 */
export function FlowscreenStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)]/95 px-4 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl sm:rounded-full sm:px-6">
        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-bold text-[var(--color-ink)]">
            FlowScreen v{FLOWSCREEN_VERSION} · kostenlos
          </p>
          <p className="hidden truncate text-xs text-[var(--color-muted)] sm:block">
            100 % lokal · Kein Konto · Windows 10/11
          </p>
        </div>
        <a
          href={getFlowscreenDownloadUrl("setup")}
          onClick={() => trackFlowscreenDownload("setup", "sticky-bar")}
          tabIndex={visible ? 0 : -1}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[var(--color-coral)]/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          <span>Jetzt laden</span>
        </a>
      </div>
    </div>
  );
}
