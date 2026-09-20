import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RatgeberHub } from "./RatgeberHub";

describe("RatgeberHub", () => {
  it("führt mit einem Firmenflow-Button zum vollständigen Beitrag", () => {
    const markup = renderToStaticMarkup(
      <RatgeberHub
        posts={[
          {
            slug: "website-fehler-lokale-betriebe",
            title: "Website-Fehler lokaler Betriebe",
            description: "Ein kurzer Überblick für lokale Unternehmen.",
            date: "2026-09-19",
            category: "Website & Vertrauen",
            tags: ["Website"],
            image: "/images/ratgeber/beispiel.webp",
            imageAlt: "Beispielhafte Website",
            readingMinutes: 5,
          },
        ]}
      />,
    );

    expect(markup).toContain('href="/ratgeber/website-fehler-lokale-betriebe"');
    expect(markup).toContain("ff-btn ff-btn--compact");
    expect(markup).toContain("Beitrag lesen");
  });
});
