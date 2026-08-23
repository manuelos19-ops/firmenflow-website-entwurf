import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { liveProjects } from "@/content/projects";

export function LiveProjects() {
  return (
    <section id="projekte" aria-label="Live-Projekte" className="py-24 sm:py-32 bg-[var(--color-paper)]">
      <Container className="space-y-16 sm:space-y-20">
        <Reveal>
          <SectionHeading
            eyebrow="Echte Referenzen"
            title="Aktuelle Projekte"
            accent="aus der Praxis."
            body="Öffentlich erreichbare Websites für regionale Unternehmen. Sauber umgesetzt, nachvollziehbar aufgebaut und im echten Kundeneinsatz."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {liveProjects.map((project, index) => (
            <Reveal key={project.slug} direction={index % 2 === 0 ? "left" : "right"} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
