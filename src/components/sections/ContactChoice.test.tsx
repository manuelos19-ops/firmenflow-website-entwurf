import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContactChoice } from "./ContactChoice";

describe("ContactChoice", () => {
  it("bietet persönliche Kontaktwege und die Website-Prüfung als Firmenflow-Buttons an", () => {
    const markup = renderToStaticMarkup(
      <ContactChoice whatsappUrl="https://wa.me/49123456789" />,
    );

    expect(markup).toContain("Ruf mich an");
    expect(markup).toContain("Termin mit mir buchen");
    expect(markup).toContain("Schreib mir per WhatsApp");
    expect(markup).toContain('aria-label="Website kostenlos prüfen lassen"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain('aria-controls="website-check-form-wrapper"');
    expect(markup).toContain("video-einschaetzung.png");
  });
});
