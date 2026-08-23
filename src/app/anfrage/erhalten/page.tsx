import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

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
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
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
          <ButtonLink href="/" variant="secondary" size="lg">
            Zurück zur Startseite
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
