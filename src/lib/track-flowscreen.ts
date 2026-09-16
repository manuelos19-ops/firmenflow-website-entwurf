"use client";

import type { FlowscreenVariant } from "@/lib/flowscreen";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (...args: unknown[]) => void;
  }
}

/**
 * Trackt FlowScreen-Download-Klicks DSGVO-sauber:
 * - Vercel Analytics nur als Queue (wird vom <Analytics/>-Script verarbeitet)
 * - GA4 nur, wenn gtag nach Consent geladen wurde (siehe GoogleAnalytics.tsx)
 */
export function trackFlowscreenDownload(variant: FlowscreenVariant, placement: string) {
  const payload = {
    variant,
    placement,
    version: "1.1.0",
  };

  try {
    if (typeof window !== "undefined" && typeof window.va === "function") {
      window.va("event", { name: "flowscreen_download", data: payload });
    }
  } catch {
    // Tracking darf den Download nie blockieren.
  }

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "flowscreen_download", {
        download_variant: variant,
        placement,
        app_version: "1.1.0",
      });
    }
  } catch {
    // Tracking darf den Download nie blockieren.
  }
}
