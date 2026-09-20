import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FirmenflowButton } from "./FirmenflowButton";

describe("FirmenflowButton", () => {
  it("stellt wichtige CTAs in einer kompakten Größenstufe bereit", () => {
    const markup = renderToStaticMarkup(
      <FirmenflowButton
        href="/anfrage"
        buttonIcon="projekt-besprechen"
        size="compact"
      >
        Kostenlos anfragen
      </FirmenflowButton>,
    );

    expect(markup).toContain('href="/anfrage"');
    expect(markup).toContain("ff-btn--compact");
    expect(markup).toContain("Kostenlos anfragen");
  });

  it("benennt den externen WhatsApp-Kontakt sichtbar und zugänglich", () => {
    const markup = renderToStaticMarkup(
      <FirmenflowButton
        href="https://wa.me/49123456789"
        external
        buttonIcon="whatsapp"
        size="compact"
        subline="Direkter Chat mit mir"
      >
        Mir per WhatsApp schreiben
      </FirmenflowButton>,
    );

    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('aria-label="Mir per WhatsApp schreiben"');
    expect(markup).toContain("Mir per WhatsApp schreiben");
    expect(markup).toContain("Direkter Chat mit mir");
  });
});
