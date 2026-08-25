"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, .cursor-grab");
        setIsHovered(Boolean(isInteractive));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out select-none"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Mini Firmenflow ff Mark following cursor */}
      <div 
        className="relative -top-2 -left-2 flex items-center justify-center transition-all duration-200"
        style={{
          transform: `scale(${isClicking ? 0.8 : isHovered ? 1.35 : 1})`,
        }}
      >
        {/* Subtle glow on hover */}
        <div 
          className="absolute -inset-1 rounded-full bg-[var(--color-coral)]/30 blur-sm transition-opacity duration-200"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* 3D Ribbon Monogram Cursor Mark */}
        <div className="relative w-5 h-5 rounded-full bg-white/95 shadow-md border border-[var(--color-plum)]/15 flex items-center justify-center p-0.5 backdrop-blur-sm">
          <Image
            src="/brand/firmenflow-mark.webp"
            alt=""
            width={20}
            height={20}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
