"use client";

import { useEffect, useRef } from "react";

export function GlobalAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 220,
      isHovering: false,
    };

    // Slow organic ambient orbs
    const orbs = [
      {
        x: width * 0.25,
        y: height * 0.3,
        baseX: 0.25,
        baseY: 0.3,
        radius: 350,
        color: "rgba(255, 112, 93, 0.045)", // Coral warmth
        speedX: 0.0006,
        speedY: 0.0008,
        phase: 0,
      },
      {
        x: width * 0.75,
        y: height * 0.65,
        baseX: 0.75,
        baseY: 0.65,
        radius: 420,
        color: "rgba(72, 35, 97, 0.035)", // Subtle plum
        speedX: 0.0007,
        speedY: 0.0005,
        phase: Math.PI / 2,
      },
      {
        x: width * 0.5,
        y: height * 0.85,
        baseX: 0.5,
        baseY: 0.85,
        radius: 380,
        color: "rgba(255, 112, 93, 0.03)", // Soft peach
        speedX: 0.0005,
        speedY: 0.0007,
        phase: Math.PI,
      },
    ];

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovering = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let darkIntensity = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check if user is over dark sections (Google Pilot or Contact/Footer)
      let targetDark = 0;
      const viewCenter = window.innerHeight * 0.5;

      const googleSec = document.getElementById("google-pilot");
      if (googleSec) {
        const rect = googleSec.getBoundingClientRect();
        if (rect.top <= viewCenter && rect.bottom >= viewCenter) {
          targetDark = 1;
        }
      }

      const contactSec = document.getElementById("kontakt");
      if (contactSec) {
        const rect = contactSec.getBoundingClientRect();
        if (rect.top <= viewCenter) {
          targetDark = 1;
        }
      }

      darkIntensity += (targetDark - darkIntensity) * 0.08;
      time += 1;

      // 1. Draw slow-drifting soft ambient liquid glow pools
      if (!isReducedMotion) {
        orbs.forEach((orb) => {
          const offsetX = Math.sin(time * orb.speedX + orb.phase) * (width * 0.12);
          const offsetY = Math.cos(time * orb.speedY + orb.phase) * (height * 0.1);
          const currentX = orb.baseX * width + offsetX;
          const currentY = orb.baseY * height + offsetY;

          const grad = ctx.createRadialGradient(
            currentX,
            currentY,
            0,
            currentX,
            currentY,
            orb.radius
          );

          if (darkIntensity > 0.3) {
            // Richer violet/coral shimmer in dark mode
            grad.addColorStop(0, "rgba(255, 112, 93, 0.08)");
            grad.addColorStop(0.5, "rgba(101, 54, 131, 0.05)");
            grad.addColorStop(1, "rgba(72, 35, 97, 0)");
          } else {
            grad.addColorStop(0, orb.color);
            grad.addColorStop(1, "rgba(252, 250, 247, 0)");
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(currentX, currentY, orb.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 2. Smooth Interactive Mouse Spotlight Aura (Continuous across all sections)
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        const glowRadius = mouse.radius * (1.1 + darkIntensity * 0.3);
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );

        if (darkIntensity > 0.3) {
          glowGradient.addColorStop(0, "rgba(255, 112, 93, 0.18)");
          glowGradient.addColorStop(0.4, "rgba(101, 54, 131, 0.08)");
          glowGradient.addColorStop(0.8, "rgba(255, 112, 93, 0.02)");
          glowGradient.addColorStop(1, "rgba(255, 112, 93, 0)");
        } else {
          glowGradient.addColorStop(0, "rgba(255, 112, 93, 0.11)");
          glowGradient.addColorStop(0.4, "rgba(72, 35, 97, 0.04)");
          glowGradient.addColorStop(0.75, "rgba(255, 112, 93, 0.012)");
          glowGradient.addColorStop(1, "rgba(255, 112, 93, 0)");
        }

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full select-none"
      aria-hidden="true"
    />
  );
}
