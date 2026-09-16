"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, FileCheck2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  FLOWSCREEN_FILE_NAMES,
  FLOWSCREEN_FILE_SIZES,
  FLOWSCREEN_HASHES,
  FLOWSCREEN_RELEASE_TAG_URL,
  FLOWSCREEN_VERSION,
  FLOWSCREEN_VIRUSTOTAL,
  getFlowscreenVirusTotalUrl,
  type FlowscreenVariant,
} from "@/lib/flowscreen";

function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}

function HashRow({ variantKey, label }: { variantKey: FlowscreenVariant; label: string }) {
  const [copied, setCopied] = useState(false);
  const hash = FLOWSCREEN_HASHES[variantKey];

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard-API nicht verfügbar – dann einfach nichts tun.
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-6 space-y-3">
      <p className="font-bold text-[var(--color-ink)] text-sm sm:text-base">
        {label} · <span className="font-mono text-xs">{FLOWSCREEN_FILE_NAMES[variantKey]}</span>
      </p>
      <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-3 py-2.5">
        <code className="flex-1 min-w-0 break-all font-mono text-[11px] sm:text-xs text-[var(--color-ink)]">
          {hash}
        </code>
        <button
          type="button"
          onClick={copyHash}
          aria-label={`SHA256-Hash für ${label} kopieren`}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white border border-[var(--color-line)] px-3 py-1.5 text-xs font-semibold hover:border-[var(--color-coral)] hover:text-[var(--color-coral)] transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Kopiert!" : "Kopieren"}</span>
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-[var(--color-muted)] font-mono">
          {formatBytes(FLOWSCREEN_FILE_SIZES[variantKey])} · SHA256
          {variantKey === "portable" && FLOWSCREEN_VIRUSTOTAL.portable && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-sans text-[11px] font-bold text-emerald-700">
              <ShieldCheck className="w-3 h-3" />
              <span>VirusTotal: 0/{FLOWSCREEN_VIRUSTOTAL.portable.total} sauber (16.09.2026)</span>
            </span>
          )}
        </span>
        <a
          href={getFlowscreenVirusTotalUrl(variantKey)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--color-coral)] hover:underline underline-offset-4"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{variantKey === "portable" ? "Ergebnis ansehen" : "Auf VirusTotal prüfen"}</span>
        </a>
      </div>
    </div>
  );
}


export function FlowscreenVerifyView() {
  return (
    <main id="main" className="pt-28 sm:pt-36 pb-24">
      <Container className="max-w-3xl space-y-10">
        <Link
          href="/flowscreen"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-coral)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zu FlowScreen</span>
        </Link>

        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-bold">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Sicherheit &amp; Echtheit · v{FLOWSCREEN_VERSION}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
            Ist meine Datei echt &amp; sauber?
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            Vergleiche den SHA256-Hash deiner heruntergeladenen Datei mit den offiziellen Werten hier. Stimmen
            sie überein, hast du garantiert die unveränderte Original-Datei.
          </p>
        </div>

        <div className="space-y-4">
          <HashRow variantKey="setup" label="Setup Installer" />
          <HashRow variantKey="portable" label="Portable" />
        </div>

        <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
            In 3 Schritten selbst prüfen – ohne Zusatz-Tool
          </h2>
          <ol className="space-y-4 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed list-none p-0">
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-plum)] text-white text-sm font-bold flex items-center justify-center">
                1
              </span>
              <span>
                <strong className="text-[var(--color-ink)]">PowerShell öffnen:</strong> Windows-Taste,{" "}
                <code className="font-mono text-xs bg-white border border-[var(--color-line)] rounded px-1.5 py-0.5">
                  powershell
                </code>{" "}
                tippen, Enter.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-plum)] text-white text-sm font-bold flex items-center justify-center">
                2
              </span>
              <span className="min-w-0 flex-1">
                <strong className="text-[var(--color-ink)]">Hash berechnen</strong> (Dateiname ggf. anpassen):
                <code className="block mt-2 font-mono text-[11px] sm:text-xs bg-white border border-[var(--color-line)] rounded-xl px-3 py-2.5 break-all">
                  Get-FileHash ~/Downloads/{FLOWSCREEN_FILE_NAMES.setup} -Algorithm SHA256
                </code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-plum)] text-white text-sm font-bold flex items-center justify-center">
                3
              </span>
              <span>
                <strong className="text-[var(--color-ink)]">Vergleichen:</strong> Exakt gleich = unverändertes
                Original. Oder die Datei direkt bei VirusTotal hochladen – 70+ Scanner prüfen sie automatisch.
              </span>
            </li>
          </ol>
          <a
            href={FLOWSCREEN_RELEASE_TAG_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-coral)] transition-colors"
          >
            <span>Offizielles Release v{FLOWSCREEN_VERSION} auf GitHub ansehen</span>
          </a>
        </div>
      </Container>
    </main>
  );
}
