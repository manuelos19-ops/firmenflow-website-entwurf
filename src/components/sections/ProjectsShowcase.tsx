"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { liveProjects, conceptProjects } from '@/content/projects';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

type Project = {
  title: string;
  slug?: string;
  url?: string;
  description: string;
  tags: string[];
  region: string;
  badge?: string;
  notice?: string;
  image?: string;
};

export function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorImgRef = useRef<HTMLImageElement>(null);
  
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && window.matchMedia('(min-width: 768px)').matches) {
      // Hover follow logic
      const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.4, ease: 'power3' });
      const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.4, ease: 'power3' });

      const handleMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Reveal animation
      gsap.fromTo(
        '.project-row',
        { 
          opacity: 0,
          x: -50,
          y: 20
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-list',
            start: 'top 80%',
            once: true,
          }
        }
      );

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } else {
      // Setup SSR fallback for non-js or reduced motion
      gsap.set('.project-row', { opacity: 1, x: 0, y: 0 });
    }
  }, { scope: containerRef });

  const handleMouseEnter = (imgUrl: string) => {
    if (window.matchMedia('(max-width: 767px)').matches) return;
    setActiveImage(imgUrl);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(max-width: 767px)').matches) return;
    setActiveImage(null);
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.out' });
  };

  const renderProject = (project: Project, isConcept: boolean) => {
    const href = project.slug ? `/projekte/${project.slug}` : project.url || '#';
    // Use project image or fallback random generated image placeholder
    const imgUrl = project.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=random&size=400&color=fff`;

    return (
      <Link 
        key={project.title}
        href={href}
        className={cn(
          "project-row group block border-b border-[var(--color-line)] py-8 md:py-12 transition-colors duration-300",
          "hover:text-[var(--color-coral)] focus:text-[var(--color-coral)] focus:outline-none",
          isConcept ? "opacity-70" : "opacity-100"
        )}
        onMouseEnter={() => handleMouseEnter(imgUrl)}
        onMouseLeave={handleMouseLeave}
        onFocus={() => handleMouseEnter(imgUrl)}
        onBlur={handleMouseLeave}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <h3 className="text-4xl md:text-6xl font-bold font-sans tracking-tight">
                {project.title}
              </h3>
              {project.badge && !isConcept && (
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-[var(--color-plum)] text-white rounded-full">
                  {project.badge}
                </span>
              )}
            </div>
            {isConcept && (
              <p className="text-sm text-[var(--color-muted)] font-medium">
                {project.notice || 'Konzeptentwurf – noch nicht veröffentlicht'}
              </p>
            )}
          </div>
          <div className="flex flex-wrap md:flex-col md:text-right gap-2 md:gap-1 text-sm text-[var(--color-muted)] group-hover:text-inherit group-focus:text-inherit transition-colors">
            <span>{project.region}</span>
            <span className="hidden md:inline">•</span>
            <span>{project.tags?.join(', ')}</span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section ref={containerRef} className="py-24 bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden relative" data-component="projects-showcase">
      <Container>
        <div className="mb-16">
          <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-coral)] mb-4 block">
            Projekte
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-tight">
            Was ich bisher umgesetzt habe.
          </h2>
        </div>

        <div className="projects-list border-t border-[var(--color-line)]">
          {liveProjects.map(p => renderProject(p as unknown as Project, false))}
          {conceptProjects.map(p => renderProject(p as unknown as Project, true))}
        </div>
      </Container>

      {/* Floating Cursor Image for Desktop */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 w-64 h-64 rounded-xl overflow-hidden shadow-2xl scale-0 opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ transformOrigin: 'center center' }}
      >
        {activeImage && (
          <img
            ref={cursorImgRef}
            src={activeImage}
            alt="Project Preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
