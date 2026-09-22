"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

interface RatgeberViewTrackerProps {
  slug: string;
  title: string;
  category: string;
}

/**
 * Sendet beim Aufruf eines Ratgeber-Artikels ein strukturiertes Event an Vercel Analytics,
 * damit im Vercel Dashboard unter "Custom Events" exakt nachvollzogen werden kann,
 * wie oft Artikel 1, Artikel 2 etc. aufgerufen wurden.
 */
export function RatgeberViewTracker({ slug, title, category }: RatgeberViewTrackerProps) {
  useEffect(() => {
    try {
      track("ratgeber_article_view", {
        slug,
        title,
        category,
      });
    } catch {
      // Fehler silent abfangen
    }
  }, [slug, title, category]);

  return null;
}
