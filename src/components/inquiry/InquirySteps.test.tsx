import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { initialInquiryState } from "@/features/inquiry/reducer";
import type { InquiryDraft } from "@/features/inquiry/types";
import { ContactStep } from "./steps/ContactStep";
import { ServicesStep } from "./steps/ServicesStep";

describe("Inquiry choice surfaces", () => {
  it("stellt Leistungen als eigene Auswahlflächen mit nativen Checkboxen dar", () => {
    const data: InquiryDraft = {
      ...initialInquiryState().data,
      services: ["website"],
      websiteScope: "new",
    };
    const markup = renderToStaticMarkup(
      <ServicesStep data={data} errors={{}} onPatch={() => undefined} />,
    );

    expect(markup.match(/data-inquiry-choice=/g)).toHaveLength(2);
    expect(markup).toContain('data-selected="true"');
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('aria-checked="true"');
  });
});

describe("Inquiry summary", () => {
  it("zeigt im Kontaktschritt die gewählten Leistungen, Ziele und Kontaktdaten", () => {
    const data: InquiryDraft = {
      ...initialInquiryState().data,
      services: ["website", "lokalpraesenz"],
      websiteScope: "relaunch",
      goals: ["more-inquiries", "better-findability"],
      businessName: "Bäckerei Beispiel",
      industry: "Bäckerei",
      place: "Wesel",
      preferredContact: "phone",
    };
    const markup = renderToStaticMarkup(
      <ContactStep data={data} errors={{}} onPatch={() => undefined} />,
    );

    expect(markup).toContain('aria-label="Zusammenfassung deiner Anfrage"');
    expect(markup).toContain("Website-Relaunch");
    expect(markup).toContain("Lokalpräsenz 360°");
    expect(markup).toContain("Mehr passende Anfragen");
    expect(markup).toContain("Bäckerei Beispiel");
    expect(markup).toContain("Telefonisch");
  });
});
