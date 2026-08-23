"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { motionTokens } from "./motion-tokens";

export function FlowLine({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div aria-hidden="true" className={cn("w-px bg-[var(--color-coral)]/40", className)} />;
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleY: 0, originY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={motionTokens.viewport}
      transition={{ duration: motionTokens.duration.large, ease: motionTokens.ease }}
      className={cn("w-px bg-[var(--color-coral)]/40", className)}
    />
  );
}
