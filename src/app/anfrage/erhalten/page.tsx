import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";

export const metadata: Metadata = {
  title: "Anfrage erhalten | Firmenflow",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnfrageErhaltenPage() {
  const responseTime = process.env.NEXT_PUBLIC_RESPONSE_TIME || "in der Regel innerhalb von 24 Stunden";

  return (
    <main id="main" className="pt-36 sm:pt-44 pb-28 min-h-[70vh] flex items-center">
      <Container className="max-w-2xl text-center space-y-8">
        <div className="flex justify-center">
          <FirmenflowIcon name="erfolg" size={80} decorative />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
            Danke – deine Anfrage ist angekommen!
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-lg mx-auto">
            Vielen Dank für deine Nachricht. Manu schaut sich deine Angaben in Ruhe an und meldet sich {responseTime} persönlich bei dir.
          </p>
        </div>

        <div className="pt-4">
          <ButtonLink href="/" variant="primary" size="lg" className="shadow-xl shadow-[var(--color-coral)]/25 text-white font-bold">
            Zurück zur Startseite
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
