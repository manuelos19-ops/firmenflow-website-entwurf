"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (...args: unknown[]) => void;
  }
}

/**
 * Trackt das Absenden der kostenlosen Website-Video-Prüfung.
 */
export function trackVideoAuditSubmit(hasWebsite: boolean) {
  try {
    if (typeof window !== "undefined" && typeof window.va === "function") {
      window.va("event", {
        name: "video_audit_submit",
        data: { has_website: hasWebsite },
      });
    }
  } catch {
    // Tracking darf die Formularlogik nie blockieren
  }

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "video_audit_submit", {
        event_category: "lead",
        has_website: hasWebsite,
      });
    }
  } catch {
    // Tracking darf die Formularlogik nie blockieren
  }
}

/**
 * Trackt das Absenden der geführten 5-Schritte-Projektanfrage.
 */
export function trackProjectInquirySubmit() {
  try {
    if (typeof window !== "undefined" && typeof window.va === "function") {
      window.va("event", {
        name: "project_inquiry_submit",
      });
    }
  } catch {
    // Tracking darf die Formularlogik nie blockieren
  }

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "project_inquiry_submit", {
        event_category: "lead",
      });
    }
  } catch {
    // Tracking darf die Formularlogik nie blockieren
  }
}

/**
 * Trackt Klicks auf die meetergo-Terminbuchung.
 */
export function trackMeetergoClick(placement: string) {
  try {
    if (typeof window !== "undefined" && typeof window.va === "function") {
      window.va("event", {
        name: "meetergo_click",
        data: { placement },
      });
    }
  } catch {
    // Tracking darf die Benutzerinteraktion nie blockieren
  }

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "meetergo_click", {
        event_category: "conversion",
        placement,
      });
    }
  } catch {
    // Tracking darf die Benutzerinteraktion nie blockieren
  }
}

/**
 * Trackt Klicks auf den WhatsApp-Kontaktweg.
 */
export function trackWhatsAppClick(placement: string) {
  try {
    if (typeof window !== "undefined" && typeof window.va === "function") {
      window.va("event", {
        name: "whatsapp_click",
        data: { placement },
      });
    }
  } catch {
    // Tracking darf die Benutzerinteraktion nie blockieren
  }

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", {
        event_category: "conversion",
        placement,
      });
    }
  } catch {
    // Tracking darf die Benutzerinteraktion nie blockieren
  }
}
