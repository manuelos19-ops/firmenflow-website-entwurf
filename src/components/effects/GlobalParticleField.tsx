"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
};

export function GlobalParticleField() {
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
      radius: 170,
      isHovering: false,
    };

    // Sophisticated Firmenflow Brand Color Palette
    const colors = ["#ff705d", "#482361", "#e0533c", "#653683", "#f87171", "#c084fc"];

    const totalParticles = 48;
    const particles: Particle[] = [];

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      if (particles.length === 0) {
        for (let i = 0; i < totalParticles; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: -0.12 - Math.random() * 0.15, // Gentle upward drift
            size: Math.random() * 2.2 + 1.0,
            baseAlpha: Math.random() * 0.4 + 0.2,
            alpha: Math.random() * 0.4 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            twinkleSpeed: Math.random() * 0.02 + 0.008,
            twinklePhase: Math.random() * Math.PI * 2,
          });
        }
      }
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

    // Smooth transition factor for dark section particle density (0 = light main, 1 = dark footer/pilot)
    let darkIntensity = 0;

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

      // Smooth damped mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // FULL, VIBRANT, BEAUTIFUL MOUSE GLOW EVERYWHERE (Zero clipping, seamless everywhere)
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        const glowRadius = mouse.radius * 1.5;
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );

        glowGradient.addColorStop(0, "rgba(255, 112, 93, 0.13)");
        glowGradient.addColorStop(0.35, "rgba(72, 35, 97, 0.05)");
        glowGradient.addColorStop(0.7, "rgba(255, 112, 93, 0.015)");
        glowGradient.addColorStop(1, "rgba(255, 112, 93, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // In main text area: only 12 subtle, non-intrusive particles. In dark footer/pilot: full 48 particles.
      const activeCount = Math.round(12 + darkIntensity * 36);

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          p.twinklePhase += p.twinkleSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.twinklePhase) * 0.1;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          if (mouse.x > 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius && dist > 0) {
              const force = (1 - dist / mouse.radius) * 1.2;
              const angle = Math.atan2(dy, dx);
              p.x -= Math.cos(angle) * force * 1.4;
              p.y -= Math.sin(angle) * force * 1.4;
            }
          }
        }

        // Particle alpha: subtle in light area (0.15 max), vivid in footer (0.75 max)
        const alphaFactor = 0.18 + darkIntensity * 0.57;
        const particleAlpha = p.alpha * alphaFactor;
        const particleSize = p.size * (0.8 + darkIntensity * 0.3);

        ctx.save();
        ctx.globalAlpha = Math.max(0.04, Math.min(0.8, particleAlpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = darkIntensity > 0.3 ? 6 : 2;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Constellation lines: only active in dark sections
        if (darkIntensity > 0.25) {
          for (let j = i + 1; j < activeCount; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 85;

            if (dist < maxDist) {
              ctx.save();
              const lineAlpha = (1 - dist / maxDist) * 0.15 * darkIntensity;
              ctx.globalAlpha = lineAlpha;
              ctx.strokeStyle = "#ff705d";
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
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
