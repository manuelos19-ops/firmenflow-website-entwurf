"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("overflow-hidden py-4 border-y border-[var(--color-line)]", className)}>
        <div className="flex items-center justify-center flex-wrap gap-8 text-sm font-medium tracking-wider text-[var(--color-plum)]/80 uppercase">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden whitespace-nowrap py-4 border-y border-[var(--color-line)] select-none",
        className
      )}
    >
      <div className="flex shrink-0 items-center justify-around gap-12 min-w-full animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex shrink-0 items-center justify-around gap-12 min-w-full animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
      >
        {children}
      </div>
    </div>
  );
}
