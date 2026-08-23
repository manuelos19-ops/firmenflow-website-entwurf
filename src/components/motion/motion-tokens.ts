export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: { large: 0.76, normal: 0.56, micro: 0.2 },
  distance: { heading: 64, item: 28, project: 48 },
  viewport: { once: true, amount: 0.18 } as const,
} as const;

const visible = { opacity: 1, x: 0, y: 0, scale: 1 };

export const revealVariants = {
  up: { hidden: { opacity: 0, y: 64 }, visible },
  left: { hidden: { opacity: 0, x: -48, y: 32 }, visible },
  right: { hidden: { opacity: 0, x: 48, y: 32 }, visible },
  image: { hidden: { opacity: 0, scale: 1.035 }, visible },
} as const;
