"use client";

import { useEffect, useState, useId } from "react";
import Link from "next/link";

export interface ConsentSettings {
  essential: boolean; // Always true
  analytics: boolean; // Google Analytics (G-EKM1716MWN)
  timestamp: number;
  version: string;
}

const STORAGE_KEY = "firmenflow_consent";
const CURRENT_VERSION = "1.0";

// Helper to update Google Consent Mode v2
function updateGtagConsent(analyticsGranted: boolean) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("consent", "update", {
      analytics_storage: analyticsGranted ? "granted" : "denied",
    });
  }
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Settings state in Modal
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  const titleId = useId();
  const descId = useId();
  const modalTitleId = useId();

  // Load existing consent on mount
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ConsentSettings = JSON.parse(stored);
        setAnalyticsChecked(Boolean(parsed.analytics));
        // Ensure Google Consent Mode aligns with saved state
        updateGtagConsent(Boolean(parsed.analytics));
      } else {
        // No choice made yet: show level 1 banner
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }

    // Listen for footer or external trigger to re-open settings
    const handleOpenSettings = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: ConsentSettings = JSON.parse(stored);
          setAnalyticsChecked(Boolean(parsed.analytics));
        }
      } catch {
        // ignore
      }
      setShowBanner(false);
      setShowModal(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const saveConsent = (analyticsGranted: boolean) => {
    const consent: ConsentSettings = {
      essential: true,
      analytics: analyticsGranted,
      timestamp: Date.now(),
      version: CURRENT_VERSION,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // ignore storage failures (e.g. strict incognito)
    }

    updateGtagConsent(analyticsGranted);
    setAnalyticsChecked(analyticsGranted);
    setShowBanner(false);
    setShowModal(false);

    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", { detail: consent })
    );
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleRejectAll = () => {
    saveConsent(false);
  };

  const handleOpenSettings = () => {
    setShowBanner(false);
    setShowModal(true);
  };

  const handleSaveModalSettings = () => {
    saveConsent(analyticsChecked);
  };

  if (!mounted) return null;

  return (
    <>
      {/* =========================================================================
          EBENE 1: Direkt sichtbares Banner (Unten fixiert)
          Anforderungen e-Recht24:
          - 3 gleichwertige Buttons (Akzeptieren, Ablehnen/Essenzielle, Einstellungen)
          - Kein Nudging / Dark Patterns
          - Direkte Links zu Impressum & Datenschutzerklärung
          ========================================================================= */}
      {showBanner && (
        <div
          role="dialog"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 transition-all duration-300 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto bg-[var(--color-paper)]/95 backdrop-blur-md text-[var(--color-ink)] border border-[var(--color-plum)]/15 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 space-y-5 ring-1 ring-black/5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-coral)]" />
                <h2
                  id={titleId}
                  className="font-bold text-base sm:text-lg text-[var(--color-plum)] tracking-tight"
                >
                  Deine Privatsphäre & Cookie-Einstellungen
                </h2>
              </div>
              <p
                id={descId}
                className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed"
              >
                Wir nutzen Cookies und Tracking-Technologien (Google Analytics), um unsere Website für dich nutzerfreundlich zu gestalten, Zugriffe zu analysieren und unser Angebot zu verbessern. Du kannst selbst entscheiden, welche Kategorien du zulässt. Weitere Details findest du in unserer{" "}
                <Link
                  href="/datenschutz"
                  className="underline font-medium text-[var(--color-plum)] hover:text-[var(--color-coral)] transition-colors"
                >
                  Datenschutzerklärung
                </Link>{" "}
                sowie im{" "}
                <Link
                  href="/impressum"
                  className="underline font-medium text-[var(--color-plum)] hover:text-[var(--color-coral)] transition-colors"
                >
                  Impressum
                </Link>
                .
              </p>
            </div>

            {/* Die 3 gleichwertigen Buttons nach e-Recht24 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2 border-t border-[var(--color-plum)]/10">
              <button
                type="button"
                onClick={handleOpenSettings}
                className="px-4 py-2.5 rounded-xl border border-[var(--color-plum)]/20 text-xs sm:text-sm font-semibold text-[var(--color-plum)] hover:bg-[var(--color-plum)]/5 transition-all text-center order-3 sm:order-1 focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:outline-none"
              >
                Einstellungen
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className="px-5 py-2.5 rounded-xl border border-[var(--color-plum)]/30 text-xs sm:text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-plum)]/5 transition-all text-center order-2 focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:outline-none"
              >
                Nur essenzielle Cookies
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-6 py-2.5 rounded-xl bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white text-xs sm:text-sm font-bold shadow-md shadow-[var(--color-coral)]/20 transition-all text-center order-1 sm:order-3 focus-visible:ring-2 focus-visible:ring-[var(--color-plum)] focus-visible:outline-none"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          EBENE 2: Detail-Einstellungen Modal
          Anforderungen e-Recht24:
          - Granulare Auswahl einzelner Kategorien
          - Essenziell fest aktiviert
          - Analyse / Google Analytics NICHT vorausgewählt (Opt-in-Pflicht)
          - Direkte Buttons zum Speichern, Ablehnen oder allem Zustimmen
          ========================================================================= */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
        >
          <div className="w-full max-w-2xl bg-[var(--color-paper)] text-[var(--color-ink)] rounded-2xl sm:rounded-3xl border border-[var(--color-plum)]/20 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-plum)]/10">
              <div className="space-y-1">
                <h3
                  id={modalTitleId}
                  className="font-bold text-lg sm:text-xl text-[var(--color-plum)] tracking-tight"
                >
                  Cookie- & Datenschutz-Einstellungen
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                  Wähle hier granular aus, welche Cookies und Verarbeitungen du auf Firmenflow erlauben möchtest.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-plum)]/10 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:outline-none"
                aria-label="Dialog schließen"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content / Kategorien */}
            <div className="space-y-4 overflow-y-auto pr-1 flex-1 text-sm">
              {/* Kategorie 1: Technisch essenziell */}
              <div className="p-4 rounded-xl border border-[var(--color-plum)]/15 bg-white/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--color-plum)] flex items-center gap-2">
                    Essenziell & Technisch notwendig
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-plum)]/10 text-[var(--color-plum)]">
                      Immer aktiv
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked
                    disabled
                    aria-label="Essenzielle Cookies sind immer aktiv"
                    className="w-4 h-4 rounded text-[var(--color-plum)] focus:ring-0 cursor-not-allowed opacity-75"
                  />
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Diese Cookies sind für den technischen Betrieb der Website unverzichtbar (z. B. Navigation, Barrierefreiheit, Sicherheit und das Speichern deiner Cookie-Einstellungen). Sie können nicht deaktiviert werden.
                </p>
              </div>

              {/* Kategorie 2: Analyse / Google Analytics */}
              <div className="p-4 rounded-xl border border-[var(--color-plum)]/15 bg-white/70 space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="category-analytics"
                    className="font-bold text-[var(--color-plum)] cursor-pointer select-none"
                  >
                    Analyse & Reichweitenmessung (Google Analytics)
                  </label>
                  <input
                    id="category-analytics"
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--color-coral)] focus:ring-[var(--color-coral)] cursor-pointer"
                  />
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Erlaubt uns, mittels Google Analytics 4 (Property: <code className="text-[11px] bg-black/5 px-1 py-0.5 rounded">G-EKM1716MWN</code>) das Besucherverhalten anonymisiert zu analysieren und die Website kontinuierlich zu optimieren. Es werden Gerätekennungen und Cookies gesetzt. Die Datenverarbeitung erfolgt nur mit deiner ausdrücklichen Einwilligung.
                </p>
              </div>
            </div>

            {/* Modal Footer / Aktionen */}
            <div className="pt-4 border-t border-[var(--color-plum)]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-xs text-[var(--color-muted)]">
                <Link
                  href="/datenschutz"
                  className="underline hover:text-[var(--color-coral)] transition-colors"
                >
                  Datenschutzerklärung
                </Link>{" "}
                ·{" "}
                <Link
                  href="/impressum"
                  className="underline hover:text-[var(--color-coral)] transition-colors"
                >
                  Impressum
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="px-4 py-2 rounded-xl border border-[var(--color-plum)]/25 text-xs sm:text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-plum)]/5 transition-all text-center focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:outline-none"
                >
                  Alle ablehnen
                </button>
                <button
                  type="button"
                  onClick={handleSaveModalSettings}
                  className="px-5 py-2 rounded-xl bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] text-white text-xs sm:text-sm font-bold transition-all text-center focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:outline-none"
                >
                  Auswahl speichern
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2 rounded-xl bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white text-xs sm:text-sm font-bold shadow-md shadow-[var(--color-coral)]/20 transition-all text-center focus-visible:ring-2 focus-visible:ring-[var(--color-plum)] focus-visible:outline-none"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
