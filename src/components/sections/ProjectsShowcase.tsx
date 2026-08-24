"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { liveProjects, conceptProjects, type Project } from "@/content/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && window.matchMedia("(min-width: 768px)").matches) {
      // Smooth cursor preview follower
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.35, ease: "power2.out" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.35, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Reveal animation
      gsap.fromTo(
        ".project-row",
        { 
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      gsap.set(".project-row", { opacity: 1, y: 0 });
    }
  }, { scope: containerRef });

  const handleMouseEnter = (project: Project) => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    setActiveImage(project.image);
    setActiveTitle(project.name);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    gsap.to(cursorRef.current, { 
      scale: 0.8, 
      opacity: 0, 
      duration: 0.2, 
      ease: "power2.in",
      onComplete: () => setActiveImage(null) 
    });
  };

  const renderProject = (project: Project, isConcept: boolean) => {
    const isLive = project.kind === "live";
    const href = isLive ? `/projekte/${project.slug}` : project.url;

    return (
      <Link 
        key={project.slug}
        href={href}
        target={isLive ? undefined : "_blank"}
        rel={isLive ? undefined : "noreferrer"}
        className={cn(
          "project-row group block border-b border-[var(--color-line)] py-8 md:py-12 transition-all duration-300",
          "hover:bg-[var(--color-plum)]/5 px-4 -mx-4 rounded-2xl",
          isConcept ? "opacity-75 hover:opacity-100" : "opacity-100"
        )}
        onMouseEnter={() => handleMouseEnter(project)}
        onMouseLeave={handleMouseLeave}
        onFocus={() => handleMouseEnter(project)}
        onBlur={handleMouseLeave}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-[var(--color-ink)] group-hover:text-[var(--color-coral)] transition-colors">
                {project.name}
              </h3>
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live-Website
                </span>
              ) : (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--color-plum)]/10 text-[var(--color-plum)] border border-[var(--color-plum)]/20 rounded-full">
                  Konzeptentwurf
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--color-muted)] font-normal max-w-xl">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center md:items-end flex-col gap-2 text-sm text-[var(--color-muted)] shrink-0">
            <div className="flex items-center gap-2 font-medium text-[var(--color-ink)] group-hover:text-[var(--color-coral)] transition-colors">
              <span>{project.region}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <span className="text-xs text-[var(--color-muted)]">{project.sector}</span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section 
      ref={containerRef} 
      id="projekte" 
      className="py-28 md:py-36 bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden relative"
    >
      <Container>
        <div className="mb-16 md:mb-20 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-coral)] mb-3 block">
            Echte Arbeiten &amp; Entwürfe
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-[var(--color-ink)] leading-tight mb-4">
            Was ich bisher umgesetzt habe.
          </h2>
          <p className="text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
            Transparenz zählt: Live-Kundenprojekte und Konzeptentwürfe sind klar getrennt. Fahre mit der Maus über die Projekte für eine Live-Vorschau.
          </p>
        </div>

        <div className="projects-list border-t border-[var(--color-line)]">
          {liveProjects.map((p) => renderProject(p, false))}
          {conceptProjects.map((p) => renderProject(p, true))}
        </div>
      </Container>

      {/* Floating Cursor Image Preview (Desktop Only) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 w-80 sm:w-96 aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl scale-0 opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block border-2 border-white/80 bg-white"
        style={{ transformOrigin: "center center" }}
      >
        {activeImage && (
          <div className="relative w-full h-full">
            <Image
              src={activeImage}
              alt={activeTitle || "Projektvorschau"}
              fill
              className="object-cover"
              sizes="400px"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
