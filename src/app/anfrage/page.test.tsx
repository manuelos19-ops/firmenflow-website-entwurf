import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AnfragePage from "./page";

describe("AnfragePage", () => {
  it("bietet die kostenlose Video-Einschätzung als direkten Formularweg an", () => {
    const markup = renderToStaticMarkup(<AnfragePage />);

    expect(markup).toContain(
      "Kostenlose Video-Einschätzung für Website &amp; Google-Profil",
    );
    expect(markup).toContain('href="/#website-check"');
  });
});
