"use client";

declare global {
  interface Window {
    __lenis?: { scrollTo: (target: number | string | HTMLElement, options?: Record<string, unknown>) => void };
  }
}

const NAV_OFFSET = 96;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function nativeScrollTo(top: number, behavior: ScrollBehavior) {
  window.scrollTo({ top: Math.max(0, top), behavior });
}

/** Lenis-kompatibles Scrollen mit Header-Offset. Fallback: natives smooth Scrollen. */
export function scrollToTop(immediate = false) {
  if (typeof window === "undefined") return;
  const behavior: ScrollBehavior = immediate || prefersReducedMotion() ? "auto" : "smooth";
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: behavior === "auto" ? 0 : 1.1 });
    return;
  }
  nativeScrollTo(0, behavior);
}

/**
 * Ein Anker kann per `data-anchor-target="#anderes-element"` umleiten. So bleibt
 * z. B. die Sektions-ID (Dot-Nav, Hintergrund) erhalten, der Sprung landet aber
 * am Inhalt statt am oberen Innenabstand der Sektion.
 */
export function resolveAnchor(el: HTMLElement): HTMLElement {
  const selector = el.dataset.anchorTarget;
  if (!selector) return el;
  return document.querySelector<HTMLElement>(selector) ?? el;
}

/**
 * Lenis rechnet bei `scrollTo(element)` den `scroll-padding-top` der Seite und den
 * `scroll-margin-top` des Ziels selbst ein. Zusammen mit unserem Header-Offset
 * landete der Sprung dadurch bis zu 200 px zu früh. Dieser Offset gleicht das aus,
 * sodass jeder Anker genau `offset` Pixel unter der Oberkante landet.
 */
export function lenisOffset(el: HTMLElement, offset = NAV_OFFSET): number {
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return padding + margin - offset;
}

export function scrollToElement(target: string | HTMLElement, offset = NAV_OFFSET) {
  if (typeof window === "undefined") return;
  const found = typeof target === "string" ? document.getElementById(target) : target;
  if (!found) return;
  const el = resolveAnchor(found);
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  if (window.__lenis) {
    window.__lenis.scrollTo(Math.max(0, top), { duration: behavior === "auto" ? 0 : 1.1 });
    return;
  }
  nativeScrollTo(top, behavior);
}

/** Scrollt so, dass das Element unterhalb des fixen Headers sichtbar startet. */
export function scrollToId(id: string, offset = NAV_OFFSET) {
  scrollToElement(id, offset);
}

export { NAV_OFFSET };