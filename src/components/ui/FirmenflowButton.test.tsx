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
        Schreib mir per WhatsApp
      </FirmenflowButton>,
    );

    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('aria-label="Schreib mir per WhatsApp"');
    expect(markup).toContain("Schreib mir per WhatsApp");
    expect(markup).toContain("Direkter Chat mit mir");
  });

  it("zeigt nur das passende Motiv und keinen zusätzlichen Aktionspfeil", () => {
    const markup = renderToStaticMarkup(
      <FirmenflowButton href="/anfrage" buttonIcon="projekt-besprechen">
        Kostenlos anfragen
      </FirmenflowButton>,
    );

    expect(markup).toContain("projekt-besprechen.png");
    expect(markup).not.toContain("action-arrow.png");
    expect(markup).not.toContain("ff-btn-action");
  });
});
