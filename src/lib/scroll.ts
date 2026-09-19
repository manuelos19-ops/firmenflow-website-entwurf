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

export function scrollToElement(target: string | HTMLElement, offset = NAV_OFFSET) {
  if (typeof window === "undefined") return;
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;
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