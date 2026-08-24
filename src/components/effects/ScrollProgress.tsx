export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        background: "var(--color-coral)",
        transform: "scaleX(0)",
        animationTimeline: "scroll()",
      } as React.CSSProperties}
    />
  );
}
