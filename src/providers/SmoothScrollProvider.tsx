"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { NAV_OFFSET } from "@/lib/scroll";

function LenisBridge() {
  const lenis = useLenis();
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (lenis) {
      window.__lenis = lenis as unknown as Window["__lenis"];
    }
    return () => {
      if (window.__lenis) delete window.__lenis;
    };
  }, [lenis]);

  // Manuelle Scroll-Restoration aktivieren, damit der Browser nicht mit Lenis kollidiert
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Auf Hash-Änderungen und Klicks auf In-Page-Links (z.B. /#kontakt auf "/") reagieren,
  // da Next.js pushState nutzt und window.onhashchange dadurch allein nicht feuert
  useEffect(() => {
    if (!lenis) return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const targetId = decodeURIComponent(hash.replace(/^#/, ""));
      const el = document.getElementById(targetId);
      if (el) {
        lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.0 });
      }
    };

    const handleDocumentClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
      const target = (e.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      const isCurrentPageHash =
        href.startsWith("#") ||
        (href.startsWith("/#") && typeof window !== "undefined" && window.location.pathname === "/");

      if (isCurrentPageHash) {
        const hash = href.startsWith("/#") ? href.slice(2) : href.slice(1);
        if (!hash) return;
        const targetId = decodeURIComponent(hash);
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          try {
            const nextUrl = href.startsWith("#")
              ? `${window.location.pathname}${href}`
              : href;
            window.history.pushState(null, "", nextUrl);
          } catch {}
          lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.0 });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, [lenis]);

  // Bei jedem Routenwechsel (pathname) Scroll-Position zuverlässig nach oben zurücksetzen
  useEffect(() => {
    if (!lenis) return;

    const isFirstMount = prevPathnameRef.current === null;
    const hasPathnameChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (hash) {
      const targetId = decodeURIComponent(hash.replace(/^#/, ""));
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          lenis.scrollTo(el, { offset: -NAV_OFFSET, immediate: false, duration: 0.9 });
        }
      }, isFirstMount ? 150 : 60);
      return () => clearTimeout(timer);
    }

    if (hasPathnameChanged && !isFirstMount) {
      // Wenn eine neue Seite ohne Hash aufgerufen wird: Sofort an den Seitenanfang scrollen!
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

