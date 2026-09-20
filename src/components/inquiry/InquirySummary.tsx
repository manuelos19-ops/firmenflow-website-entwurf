import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import type { InquiryDraft } from "@/features/inquiry/types";

const goalLabels: Record<InquiryDraft["goals"][number], string> = {
  "more-inquiries": "Mehr passende Anfragen",
  "professional-presentation": "Professioneller Auftritt",
  "clear-offer": "Verständlichere Leistungen",
  "easy-contact": "Einfachere Kontaktaufnahme",
  "better-findability": "Bessere Auffindbarkeit",
  "profile-current": "Aktuelles Google-Profil",
  "reviews-handled": "Betreute Bewertungen",
  "less-daytoday": "Weniger Aufwand im Alltag",
};

const contactLabels: Record<InquiryDraft["preferredContact"], string> = {
  email: "Per E-Mail",
  phone: "Telefonisch",
  whatsapp: "Per WhatsApp",
};

function serviceLabels(data: InquiryDraft): string[] {
  if (data.guidance) return ["Persönliche Empfehlung"];

  const labels: string[] = [];
  if (data.services.includes("website")) {
    labels.push(
      data.websiteScope === "new"
        ? "Neue Website"
        : data.websiteScope === "relaunch"
          ? "Website-Relaunch"
          : "Website-Beratung",
    );
  }
  if (data.services.includes("lokalpraesenz")) labels.push("Lokalpräsenz 360°");
  return labels;
}

export function InquirySummary({ data }: { data: InquiryDraft }) {
  const services = serviceLabels(data);
  const goals = data.goals.map((goal) => goalLabels[goal]).filter(Boolean);
  const business = data.businessName || [data.industry, data.place].filter(Boolean).join(" · ");

  return (
    <section
      aria-label="Zusammenfassung deiner Anfrage"
      className="overflow-hidden rounded-2xl border border-[var(--color-plum)]/15 bg-[linear-gradient(145deg,rgba(72,35,97,0.055),rgba(255,112,93,0.055))]"
    >
      <div className="flex items-center gap-3 border-b border-[var(--color-plum)]/10 px-4 py-3 sm:px-5">
        <FirmenflowIcon name="formular" size={34} decorative />
        <div>
          <h3 className="text-sm font-bold text-[var(--color-ink)]">Deine Auswahl auf einen Blick</h3>
          <p className="text-xs text-[var(--color-muted)]">Du kannst mit „Zurück“ jederzeit etwas ändern.</p>
        </div>
      </div>

      <dl className="grid gap-4 p-4 text-sm sm:grid-cols-2 sm:p-5">
        <div className="space-y-1">
          <dt className="text-xs font-semibold text-[var(--color-muted)]">Leistungen</dt>
          <dd className="font-bold text-[var(--color-plum)]">{services.join(" + ") || "Noch nicht gewählt"}</dd>
        </div>
        <div className="space-y-1">
          <dt className="text-xs font-semibold text-[var(--color-muted)]">Betrieb</dt>
          <dd className="font-semibold text-[var(--color-ink)]">{business || "Noch nicht angegeben"}</dd>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <dt className="text-xs font-semibold text-[var(--color-muted)]">Ziele</dt>
          <dd className="text-[var(--color-ink)]">{goals.join(" · ") || "Persönlich herausfinden"}</dd>
        </div>
        <div className="space-y-1">
          <dt className="text-xs font-semibold text-[var(--color-muted)]">Kontaktweg</dt>
          <dd className="font-semibold text-[var(--color-ink)]">{contactLabels[data.preferredContact]}</dd>
        </div>
        {data.supportPhotoVideo ? (
          <div className="space-y-1">
            <dt className="text-xs font-semibold text-[var(--color-muted)]">Zusatz</dt>
            <dd className="font-semibold text-[var(--color-ink)]">Fotos und Imagefilm</dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
