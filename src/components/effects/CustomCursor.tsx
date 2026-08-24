"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<"default" | "link" | "cta">("default");
  const [isMobile, setIsMobile] = useState(true);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setIsMobile(!mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile || !dotRef.current || !ringRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestLink = target.closest("a, button, [role='button'], [data-cursor='cta']");
      if (closestLink) {
        if (closestLink.hasAttribute("data-cursor")) {
          setCursorState("cta");
        } else {
          setCursorState("link");
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [data-cursor='cta']")) {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const dotSize = cursorState === "default" ? 8 : 0;
  const ringSize = cursorState === "default" ? 0 : cursorState === "link" ? 40 : 56;
  const ringBorder = cursorState === "cta" ? "2px solid var(--color-coral)" : "1.5px solid var(--color-plum)";

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          background: "var(--color-ink)",
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, opacity 0.25s ease",
          opacity: cursorState === "default" ? 1 : 0,
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          border: ringBorder,
          transition: "width 0.3s ease, height 0.3s ease, margin 0.3s ease, border 0.3s ease, opacity 0.3s ease",
          opacity: cursorState === "default" ? 0 : 0.8,
          backdropFilter: cursorState === "cta" ? "blur(4px)" : "none",
        }}
      />
    </>
  );
}
