import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { conceptProjects } from "@/content/projects";

export function ConceptProjects() {
  return (
    <section id="konzepte" aria-label="Konzeptentwürfe" className="py-24 sm:py-32">
      <Container className="space-y-16 sm:space-y-20">
        <Reveal>
          <SectionHeading
            eyebrow="Konzeptentwürfe"
            title="Design- und Strukturideen,"
            accent="die zeigen, wie es geht."
            body="Diese Ideen wurden als Entwürfe gezeigt. Sie sind noch nicht veröffentlicht und werden hier ausdrücklich nicht als Kundenprojekte oder erteilte Aufträge ausgegeben."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {conceptProjects.map((project, index) => (
            <Reveal key={project.slug} direction={index % 2 === 0 ? "left" : "right"} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
