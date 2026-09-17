"use client";

import { FlowscreenIcon } from "@/components/brand/FirmenflowIcon";
import {
  FLOWSCREEN_HASHES,
  FLOWSCREEN_VERSION,
  FLOWSCREEN_VIRUSTOTAL,
  getFlowscreenVirusTotalUrl,
} from "@/lib/flowscreen";

function shortHash(hash: string): string {
  return `${hash.slice(0, 12)}…${hash.slice(-8)}`;
}

/**
 * Vertrauens-Sektion für /flowscreen (unter den Download-Cards).
 * Zeigt SHA256-Kurzhashes + VirusTotal-Ergebnisse.
 */
export function FlowscreenTrustSection() {
  return (
    <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.04] p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <FlowscreenIcon name="lokal-ohne-cloud" size={40} decorative />
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[var(--color-ink)]">
            Geprüft sauber – verifiziere es selbst
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-muted)]">
            Offizielle SHA256-Hashes · v{FLOWSCREEN_VERSION} · Kein Konto, keine Cloud
          </p>
        </div>
      </div>

      <ul className="space-y-2.5 text-xs sm:text-sm">
        <li className="flex items-center justify-between gap-3 flex-wrap rounded-xl bg-white border border-emerald-500/30 px-3.5 py-2.5">
          <span className="font-semibold text-[var(--color-ink)]">
            Setup · <span className="font-mono font-normal text-[var(--color-muted)]">{shortHash(FLOWSCREEN_HASHES.setup)}</span>
            {FLOWSCREEN_VIRUSTOTAL.setup && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <span>
                  VirusTotal: 0/{FLOWSCREEN_VIRUSTOTAL.setup.total} sauber
                </span>
              </span>
            )}
          </span>
          <a
            href={getFlowscreenVirusTotalUrl("setup")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-coral)] hover:underline underline-offset-4"
          >
            Ergebnis ansehen
          </a>
        </li>
        <li className="flex items-center justify-between gap-3 flex-wrap rounded-xl bg-white border border-emerald-500/30 px-3.5 py-2.5">
          <span className="font-semibold text-[var(--color-ink)]">
            Portable · <span className="font-mono font-normal text-[var(--color-muted)]">{shortHash(FLOWSCREEN_HASHES.portable)}</span>
            {FLOWSCREEN_VIRUSTOTAL.portable && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <span>
                  VirusTotal: 0/{FLOWSCREEN_VIRUSTOTAL.portable.total} sauber
                </span>
              </span>
            )}
          </span>
          <a
            href={getFlowscreenVirusTotalUrl("portable")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-coral)] hover:underline underline-offset-4"
          >
            Ergebnis ansehen
          </a>
        </li>
      </ul>

      <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
        Vom Inhaber persönlich geprüft und virenfrei – lade einfach herunter und lege los. Bei der
        Windows-Warnung beim ersten Start: „Weitere Informationen“ → „Trotzdem ausführen“.
      </p>
    </div>
  );
}
