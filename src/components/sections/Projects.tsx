'use client';

import { useScrollReveal } from '../animations/useGsap';
import Badge from '../ui/Badge';
import { PROJECTS } from '../../lib/constants';
import type { Project } from '../../lib/constants';

function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === 'live';
  
  return (
    <div className="group">
      {/* Bild */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface mb-4">
        {/* Platzhalter */}
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <p className="text-sm text-muted">Screenshot folgt</p>
        </div>
        
        {/* Hover Overlay */}
        {isLive && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <span className="text-white font-medium flex items-center gap-2">
              Zur Website
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 15L15 5M15 5H8M15 5V12" />
              </svg>
            </span>
          </a>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-foreground">{project.title}</h3>
          <p className="text-sm text-muted">{project.industry}</p>
        </div>
        <Badge variant={isLive ? 'live' : 'concept'}>
          {isLive ? 'Live' : 'Konzept'}
        </Badge>
      </div>
    </div>
  );
}

export default function Projects() {
  const headingRef = useScrollReveal({ y: 40 });
  const liveRef = useScrollReveal({ y: 50, stagger: 0.2, selector: '.project-item' });
  const conceptRef = useScrollReveal({ y: 50, stagger: 0.2, selector: '.project-item' });

  const liveProjects = PROJECTS.filter((p) => p.status === 'live');
  const conceptProjects = PROJECTS.filter((p) => p.status === 'concept');

  return (
    <section id="projekte" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Projekte.
          </h2>
        </div>

        {/* Live-Projekte */}
        {liveProjects.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-lg font-semibold text-foreground">Live</h3>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div ref={liveRef} className="grid md:grid-cols-2 gap-8">
              {liveProjects.map((project) => (
                <div key={project.id} className="project-item">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Konzept-Projekte */}
        {conceptProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-foreground">Konzeptentwürfe</h3>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-sm text-muted mb-8">
              Entwürfe – nicht umgesetzte Konzepte zur Veranschaulichung der Arbeitsweise.
            </p>
            <div ref={conceptRef} className="grid md:grid-cols-2 gap-8">
              {conceptProjects.map((project) => (
                <div key={project.id} className="project-item">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
