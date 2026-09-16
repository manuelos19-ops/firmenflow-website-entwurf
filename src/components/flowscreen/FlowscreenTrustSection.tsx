"use client";

import Link from "next/link";
import { FileCheck2, ShieldCheck } from "lucide-react";
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
 * Zeigt SHA256-Kurzhashes + VirusTotal-Links + Link zur Verify-Seite.
 */
export function FlowscreenTrustSection() {
  return (
    <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.04] p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
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
        <li className="flex items-center justify-between gap-3 flex-wrap rounded-xl bg-white border border-[var(--color-line)] px-3.5 py-2.5">
          <span className="font-semibold text-[var(--color-ink)]">
            Setup · <span className="font-mono font-normal text-[var(--color-muted)]">{shortHash(FLOWSCREEN_HASHES.setup)}</span>
          </span>
          <a
            href={getFlowscreenVirusTotalUrl("setup")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-coral)] hover:underline underline-offset-4"
          >
            Auf VirusTotal prüfen
          </a>
        </li>
        <li className="flex items-center justify-between gap-3 flex-wrap rounded-xl bg-white border border-emerald-500/30 px-3.5 py-2.5">
          <span className="font-semibold text-[var(--color-ink)]">
            Portable · <span className="font-mono font-normal text-[var(--color-muted)]">{shortHash(FLOWSCREEN_HASHES.portable)}</span>
            {FLOWSCREEN_VIRUSTOTAL.portable && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <ShieldCheck className="w-3 h-3" />
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

      <Link
        href="/flowscreen/verify"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:opacity-90 transition-opacity"
      >
        <FileCheck2 className="w-4 h-4" />
        <span>Hash meiner Datei abgleichen – so geht&apos;s</span>
      </Link>
    </div>
  );
}
