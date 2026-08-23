"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { motionTokens, revealVariants } from "./motion-tokens";

type RevealProps = {
  children: ReactNode;
  direction?: keyof typeof revealVariants;
  delay?: number;
  className?: string;
};

export function Reveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setForceVisible(true), 1_400);
    return () => window.clearTimeout(timer);
  }, []);

  if (reduced || forceVisible) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      variants={revealVariants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={motionTokens.viewport}
      transition={{ duration: motionTokens.duration.large, ease: motionTokens.ease, delay }}
    >
      {children}
    </motion.div>
  );
}
