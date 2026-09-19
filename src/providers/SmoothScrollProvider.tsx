"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";

function LenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      window.__lenis = lenis as unknown as Window["__lenis"];
    }
    return () => {
      if (window.__lenis) delete window.__lenis;
    };
  }, [lenis]);
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
