import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="main" className="pt-40 sm:pt-48 pb-28 min-h-[70vh] flex items-center">
      <Container className="max-w-2xl text-center space-y-8">
        <span className="font-editorial text-4xl sm:text-5xl text-[var(--color-coral)] block">
          404
        </span>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
            Hier ist der Flow kurz abgebogen.
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            Die gesuchte Seite existiert leider nicht oder wurde verschoben. Kein Problem – hier kommst du direkt wieder auf den richtigen Pfad.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <ButtonLink href="/" variant="primary" size="lg">
            Zur Startseite
          </ButtonLink>
          <ButtonLink href="/#projektanfrage" variant="secondary" size="lg">
            Projekt anfragen
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
