"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { liveProjects, conceptProjects, type Project } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  RotateCw, 
  Pause, 
  Play,
  MapPin
} from "lucide-react";

export function ProjectsShowcase() {
  const allProjects: Project[] = [...liveProjects, ...conceptProjects];
  const totalCards = allProjects.length; // 4
  const anglePerCard = 360 / totalCards; // 90 deg

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Rotation state
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(360);

  // Calculate active index based on rotation
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const activeIndex = Math.round((360 - normalizedRotation) / anglePerCard) % totalCards;
  const activeProject = allProjects[activeIndex];

  // Adjust 3D radius based on screen width
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(230); // Mobile
      } else if (w < 1024) {
        setRadius(300); // Tablet
      } else {
        setRadius(380); // Desktop
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Continuous Auto-Rotation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isDraggingRef.current) {
        // Apply inertia if there is velocity
        if (Math.abs(velocityRef.current) > 0.05) {
          setRotation((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.92; // friction
        } else if (isAutoRotating && !isHovered) {
          // Slow, smooth orbit rotation (approx 20s per full 360 turn)
          setRotation((prev) => prev - 18 * delta);
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isAutoRotating, isHovered]);

  // Pointer Drag Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startRotationRef.current = rotation;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - startXRef.current;
    
    // Track velocity
    velocityRef.current = (currentX - lastXRef.current) * 0.4;
    lastXRef.current = currentX;

    // Update rotation
    setRotation(startRotationRef.current + deltaX * 0.45);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Rotate to specific project index
  const rotateToIndex = (targetIndex: number) => {
    const targetAngle = -(targetIndex * anglePerCard);
    // Find shortest rotation path
    const currentAngle = rotation;
    const diff = ((targetAngle - currentAngle + 180) % 360) - 180;
    setRotation(currentAngle + diff);
  };

  const nextProject = () => {
    rotateToIndex((activeIndex + 1) % totalCards);
  };

  const prevProject = () => {
    rotateToIndex((activeIndex - 1 + totalCards) % totalCards);
  };

  return (
    <section 
      id="projekte" 
      className="py-24 sm:py-32 md:py-40 bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/5 border border-[var(--color-plum)]/10 text-xs font-semibold text-[var(--color-plum)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-coral)]" />
            3D Showcase · Echte Arbeiten &amp; Entwürfe
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-5">
            Websites im 3D-Orbit.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            Vier ausgewählte Projekte drehen sich auf der 3D-Bühne. Ziehe mit der Maus oder dem Finger, um die Seiten interaktiv zu erkunden.
          </p>
        </div>

        {/* 3D Stage Viewport Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: "1300px" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Ambient center glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[var(--color-coral)]/10 blur-[90px] pointer-events-none"
            aria-hidden="true" 
          />

          {/* 3D Rotating Cylinder Carousel */}
          <div 
            className="relative w-[280px] sm:w-[340px] md:w-[420px] h-[360px] sm:h-[420px] md:h-[480px] transition-transform duration-75 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {allProjects.map((project, idx) => {
              const cardBaseAngle = idx * anglePerCard;
              // Angle relative to viewer (0 = front, 180 = back)
              const relAngle = ((cardBaseAngle + rotation) % 360 + 360) % 360;
              const isFront = relAngle < 45 || relAngle > 315;
              const isBack = relAngle > 135 && relAngle < 225;

              return (
                <div
                  key={project.slug}
                  onClick={() => rotateToIndex(idx)}
                  className={cn(
                    "absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group cursor-pointer border-2",
                    isFront 
                      ? "border-[var(--color-coral)]/80 shadow-2xl shadow-[var(--color-coral)]/20 ring-4 ring-[var(--color-coral)]/10" 
                      : "border-white/80 opacity-70 hover:opacity-100 shadow-xl"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${cardBaseAngle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "visible",
                    backgroundColor: "var(--color-paper)",
                  }}
                >
                  {/* Browser Mockup Top Bar */}
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-[var(--color-line)] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/90 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 inline-block" />
                    </div>
                    <div className="text-[11px] font-mono text-[var(--color-muted)] truncate max-w-[140px] sm:max-w-[180px] px-2 py-0.5 bg-[var(--color-paper)] rounded-md border border-[var(--color-line)]/50">
                      {project.url.replace("https://", "").replace(/\/$/, "")}
                    </div>
                    <div className="w-4" />
                  </div>

                  {/* High-Res Preview Screenshot */}
                  <div className="relative w-full h-[230px] sm:h-[280px] md:h-[330px] bg-slate-100 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      priority={idx === 0}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                    />
                    
                    {/* Dark gradient bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 right-3 z-10">
                      {project.kind === "live" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-500 text-white rounded-full shadow-md backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[var(--color-plum)] text-white rounded-full shadow-md backdrop-blur-md">
                          Konzept
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-sm border-t border-[var(--color-line)] flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <h4 className="font-bold text-base sm:text-lg text-[var(--color-ink)] truncate group-hover:text-[var(--color-coral)] transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-xs text-[var(--color-muted)] flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[var(--color-coral)] shrink-0" />
                        {project.region} · {project.sector}
                      </p>
                    </div>

                    <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-plum)]/5 group-hover:bg-[var(--color-coral)] group-hover:text-white text-[var(--color-plum)] flex items-center justify-center transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Orbit Controls & Active Project Summary Bar */}
        <div className="max-w-3xl mx-auto mt-6 sm:mt-10 bg-white border border-[var(--color-line)] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[var(--color-line)]/60">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-coral)]">
                  Projekt {activeIndex + 1} von {totalCards}
                </span>
                {activeProject.kind === "live" ? (
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                    Live-Website
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 text-[11px] font-medium bg-[var(--color-plum)]/10 text-[var(--color-plum)] rounded-full">
                    Konzeptentwurf
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-[var(--color-ink)] font-bold">
                {activeProject.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                {activeProject.region} · {activeProject.sector}
              </p>
            </div>

            {/* Orbit Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={prevProject}
                aria-label="Vorheriges Projekt"
                className="w-11 h-11 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] hover:bg-[var(--color-coral)] hover:text-white hover:border-[var(--color-coral)] flex items-center justify-center text-[var(--color-ink)] transition-all active:scale-95 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                aria-label={isAutoRotating ? "3D-Drehung pausieren" : "3D-Drehung starten"}
                className={cn(
                  "w-11 h-11 rounded-full border flex items-center justify-center transition-all active:scale-95 shadow-sm",
                  isAutoRotating 
                    ? "bg-[var(--color-plum)] text-white border-[var(--color-plum)]" 
                    : "bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-line)]"
                )}
              >
                {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={nextProject}
                aria-label="Nächstes Projekt"
                className="w-11 h-11 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] hover:bg-[var(--color-coral)] hover:text-white hover:border-[var(--color-coral)] flex items-center justify-center text-[var(--color-ink)] transition-all active:scale-95 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-lg">
              {activeProject.summary}
            </p>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={activeProject.kind === "live" ? `/projekte/${activeProject.slug}` : activeProject.url}
                target={activeProject.kind === "live" ? undefined : "_blank"}
                rel={activeProject.kind === "live" ? undefined : "noreferrer"}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-[var(--color-plum)] hover:bg-[var(--color-coral)] text-white text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <span>{activeProject.kind === "live" ? "Projekt ansehen" : "Live-Demo öffnen"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4 Thumbnails / Quick Jump Dots */}
          <div className="flex items-center justify-center gap-3 pt-6 mt-6 border-t border-[var(--color-line)]/50">
            {allProjects.map((p, idx) => (
              <button
                key={p.slug}
                onClick={() => rotateToIndex(idx)}
                aria-label={`Zu ${p.name} drehen`}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                  activeIndex === idx
                    ? "bg-[var(--color-coral)] text-white shadow-md shadow-[var(--color-coral)]/20 scale-105"
                    : "bg-[var(--color-paper)] text-[var(--color-muted)] hover:text-[var(--color-ink)] border border-[var(--color-line)]"
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", activeIndex === idx ? "bg-white" : "bg-[var(--color-muted)]")} />
                <span>{p.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
