"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://firmenflow.de/links";
    const shareData = {
      title: "Manu · Firmenflow Hub",
      text: "Persönliche Projekt- und Link-Übersicht von Manuel Osten (Firmenflow)",
      url: url,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // Fallback to clipboard if share cancelled or failed
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Ignored
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none shadow-sm ${
        copied
          ? "bg-emerald-600 text-white shadow-emerald-600/20"
          : "bg-white border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-coral)]/40 hover:bg-stone-50"
      }`}
      aria-label="Link zu dieser Seite teilen oder kopieren"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-white" />
          <span>Link kopiert!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-[var(--color-muted)]" />
          <span>Seite teilen</span>
        </>
      )}
    </button>
  );
}
