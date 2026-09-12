"use client";

import { useEffect } from "react";
import { GA_CONSENT_DEFAULT, GA_MEASUREMENT_ID } from "@/config/analytics";

const CONSENT_STORAGE_KEY = "firmenflow_consent";

type ConsentDetail = { analytics?: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored) as ConsentDetail;
    return Boolean(parsed.analytics);
  } catch {
    return false;
  }
}

/**
 * Lädt gtag.js ausschließlich NACH einer erteilten Analytics-Einwilligung.
 * Ohne Consent wird kein einziges Byte an Google gesendet (TDDDG-konform).
 */
function loadGoogleAnalytics() {
  if (typeof window === "undefined" || document.getElementById("ga-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  window.gtag("consent", "default", { ...GA_CONSENT_DEFAULT });
  window.gtag("consent", "update", { analytics_storage: "granted" });

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (readStoredAnalyticsConsent()) {
      loadGoogleAnalytics();
      return;
    }

    // Reagiert auf den CustomEvent aus dem Cookie-Consent-Banner
    const handleConsentUpdate = (event: Event) => {
      const detail = (event as CustomEvent<ConsentDetail>).detail;
      if (detail?.analytics) loadGoogleAnalytics();
    };
    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    return () => window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
  }, []);

  return null;
}
