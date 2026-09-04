"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { liveProjects, conceptProjects, type Project } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
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
  const hasMovedRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Rotation state
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState(330);

  // Calculate active index based on rotation
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const activeIndex = Math.round((360 - normalizedRotation) / anglePerCard) % totalCards;
  const activeProject = allProjects[activeIndex];

  // Adjust 3D radius based on screen width
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(195); // Mobile
      } else if (w < 1024) {
        setRadius(260); // Tablet
      } else {
        setRadius(340); // Desktop
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
        } else if (isAutoRotating) {
          // Slow down slightly on card hover (4 deg/s on desktop), otherwise normal orbit (14 deg/s)
          const currentSpeed = hoveredCardIndex !== null ? 4 : 14;
          setRotation((prev) => prev - currentSpeed * delta);
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isAutoRotating, hoveredCardIndex]);

  // Pointer & Touch Drag Handlers (Mouse & Touch on Android / iOS / Desktop)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startRotationRef.current = rotation;
    velocityRef.current = 0;
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const currentX = e.clientX;
      const deltaX = currentX - startXRef.current;
      
      if (Math.abs(deltaX) > 6) {
        hasMovedRef.current = true;
      }

      velocityRef.current = (currentX - lastXRef.current) * 0.45;
      lastXRef.current = currentX;
      setRotation(startRotationRef.current + deltaX * 0.48);
    };

    const handleGlobalPointerEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setHoveredCardIndex(null);
    };

    window.addEventListener("pointermove", handleGlobalPointerMove);
    window.addEventListener("pointerup", handleGlobalPointerEnd);
    window.addEventListener("pointercancel", handleGlobalPointerEnd);
    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerEnd);
      window.removeEventListener("pointercancel", handleGlobalPointerEnd);
    };
  }, []);

  // Dedicated Native Touch Handlers for Mobile WebKit & Android Chrome
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    lastXRef.current = touch.clientX;
    startRotationRef.current = rotation;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const deltaX = currentX - startXRef.current;
    
    if (Math.abs(deltaX) > 6) {
      hasMovedRef.current = true;
    }

    velocityRef.current = (currentX - lastXRef.current) * 0.45;
    lastXRef.current = currentX;
    setRotation(startRotationRef.current + deltaX * 0.48);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setHoveredCardIndex(null);
  };

  // Rotate to specific project index
  const rotateToIndex = (targetIndex: number) => {
    const targetAngle = -(targetIndex * anglePerCard);
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

  // Card click handler: open tab natively if front card or rotate if side/back card
  const handleCardClick = (e: React.MouseEvent, project: Project, idx: number, isFront: boolean) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      return;
    }

    if (!isFront && idx !== activeIndex) {
      e.preventDefault();
      rotateToIndex(idx);
    }
  };

  return (
    <section 
      id="projekte" 
      className="py-20 sm:py-28 md:py-36 bg-transparent text-[var(--color-ink)] overflow-hidden relative"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/5 border border-[var(--color-plum)]/10 text-xs font-semibold text-[var(--color-plum)] mb-4">
            <BrandIcon className="w-4 h-3.5" />
            <span>3D Showcase · Echte Arbeiten &amp; Entwürfe</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-4">
            Websites im 3D-Orbit.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            Ausgewählte Live-Websites &amp; Web-Apps drehen sich auf der 3D-Bühne. Ziehe mit der Maus oder klicke auf eine Karte, um das Projekt direkt in einem neuen Tab zu öffnen.
          </p>
        </div>

        {/* 3D Stage Viewport Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[430px] sm:h-[490px] md:h-[550px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-pan-y"
          style={{ 
            perspective: "1300px", 
            WebkitPerspective: "1300px",
            touchAction: "pan-y" 
          }}
          onPointerDown={handlePointerDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {/* Ambient 3D Orbit Center Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[var(--color-coral)]/15 blur-[70px] pointer-events-none"
            aria-hidden="true" 
          />

          {/* Clean Glowing 3D Orbit Stage Floor */}
          <div 
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 pointer-events-none rounded-full bg-gradient-to-r from-[var(--color-coral)]/10 via-[var(--color-plum)]/20 to-[var(--color-coral)]/10 blur-xl"
            style={{
              width: `${radius * 2.2}px`,
              height: `${radius * 0.9}px`,
              transform: "rotateX(75deg)",
              WebkitTransform: "rotateX(75deg)",
            }}
            aria-hidden="true"
          />

          {/* 3D Rotating Stage with All 4 Visible Cards & Central Core */}
          <div 
            className="relative w-[250px] sm:w-[300px] md:w-[350px] h-[330px] sm:h-[380px] md:h-[420px]"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
          >
            {/* All 4 Cards: Permanently visible 360° orbiting around central logo */}
            {allProjects.map((project, idx) => {
              const cardBaseAngle = idx * anglePerCard;
              const currentAngleRad = ((cardBaseAngle + rotation) * Math.PI) / 180;
              
              // True 3D Parametric Orbit Coordinates
              const x = Math.sin(currentAngleRad) * radius;
              const z = Math.cos(currentAngleRad) * radius; // -radius (back) to +radius (front)
              const zDepth = z / radius; // -1 to +1

              const scale = 0.78 + (zDepth + 1) * 0.11; // 0.78 (back) to 1.0 (front)
              const opacity = 0.72 + (zDepth + 1) * 0.14; // 0.72 (back) to 1.0 (front)
              const isFront = zDepth > 0.55;
              // Center logo is at zIndex 50. Back cards sit at 2..48, front cards sit at 52..98
              const zIndex = Math.round((zDepth + 1) * 48) + 2;

              return (
                <a
                  key={project.slug}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleCardClick(e, project, idx, isFront)}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
                      setHoveredCardIndex(idx);
                    }
                  }}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className={cn(
                    "absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden transition-shadow duration-300 group cursor-pointer border-2 select-none block",
                    isFront 
                      ? "border-[var(--color-coral)] shadow-2xl shadow-[var(--color-coral)]/25 ring-4 ring-[var(--color-coral)]/15" 
                      : "border-white/85 shadow-xl hover:opacity-100 hover:border-[var(--color-coral)]/60"
                  )}
                  style={{
                    transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                    WebkitTransform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                    zIndex: zIndex,
                    opacity: opacity,
                    backgroundColor: "var(--color-paper)",
                    willChange: "transform",
                  }}
                >
                  {/* Browser Mockup Top Bar */}
                  <div className="bg-white/95 px-3.5 py-2 border-b border-[var(--color-line)] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/90 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 inline-block" />
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-[var(--color-muted)] truncate max-w-[130px] sm:max-w-[160px] px-2 py-0.5 bg-[var(--color-paper)] rounded-md border border-[var(--color-line)]/50">
                      {project.url.replace("https://", "").replace(/\/$/, "")}
                    </div>
                    <div className="w-4" />
                  </div>

                  {/* High-Res Preview Screenshot */}
                  <div className="relative w-full h-[210px] sm:h-[250px] md:h-[290px] bg-slate-100 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      priority={idx === 0}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 350px"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    <div className="absolute top-2.5 right-2.5 z-10">
                      {project.kind === "live" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold bg-emerald-500 text-white rounded-full shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          Live-Projekt
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold bg-[var(--color-plum)] text-white rounded-full shadow-md">
                          Showcase
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-3.5 sm:p-4 bg-white/95 border-t border-[var(--color-line)] flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <h4 className="font-bold text-sm sm:text-base text-[var(--color-ink)] truncate group-hover:text-[var(--color-coral)] transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[var(--color-muted)] flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[var(--color-coral)] shrink-0" />
                        {project.region} · {project.sector}
                      </p>
                    </div>

                    <span
                      aria-label={`${project.name} in neuem Tab öffnen`}
                      className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--color-plum)]/5 group-hover:bg-[var(--color-coral)] group-hover:text-white text-[var(--color-plum)] flex items-center justify-center transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </a>
              );
            })}

            {/* Central Floating FIRMENflow 360° Wordmark Core (Z-Index 50, strictly in middle of orbit) */}
            <div 
              className="absolute inset-0 m-auto w-52 h-32 pointer-events-none flex flex-col items-center justify-center select-none"
              style={{
                transform: "translate3d(0px, 0px, 0px)",
                WebkitTransform: "translate3d(0px, 0px, 0px)",
                zIndex: 50,
                willChange: "transform",
              }}
              aria-hidden="true"
            >
              <div 
                className="relative flex flex-col items-center justify-center gap-1.5"
                style={{
                  animation: "float-orbit 4s ease-in-out infinite",
                }}
              >
                {/* Ambient Core Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--color-coral)]/30 to-[var(--color-plum)]/30 blur-2xl animate-pulse" />

                {/* Official FF Icon Mark */}
                <div className="relative w-12 h-7 drop-shadow-md">
                  <Image
                    src="/brand/firmenflow-mark.webp"
                    alt="Firmenflow Logo Mark"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Clean Wordmark (No extra redundant 360 Orbit badge) */}
                <div className="flex items-center gap-1 bg-white/95 px-4 py-1.5 rounded-full shadow-2xl border border-[var(--color-line)]">
                  <span className="font-display font-black text-base sm:text-lg tracking-tight text-[var(--color-ink)]">FIRMEN</span>
                  <span className="font-editorial italic font-normal text-base sm:text-lg text-[var(--color-coral)]">flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Orbit Controls & Active Project Summary Bar - Fixed height to prevent any layout shift during auto-rotation */}
        <div className="max-w-3xl mx-auto mt-6 sm:mt-8 bg-white border border-[var(--color-line)] rounded-3xl p-6 sm:p-8 shadow-xl min-h-[220px] sm:min-h-[196px] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[var(--color-line)]/60">
            <div className="min-h-[72px] flex flex-col justify-center">
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
              <h3 className="text-2xl sm:text-3xl font-display text-[var(--color-ink)] font-bold truncate max-w-[270px] sm:max-w-md">
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

          <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 min-h-[56px]">
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-lg min-h-[42px] flex items-center">
              {activeProject.summary}
            </p>

            {/* High-Contrast Action Button with 100% White Text */}
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-[var(--color-coral)]/25 active:scale-95 cursor-pointer"
              >
                <span className="text-white font-bold">
                  {activeProject.kind === "live" ? "Website in neuem Tab öffnen" : "Live-Demo in neuem Tab öffnen"}
                </span>
                <ExternalLink className="w-4 h-4 text-white shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
