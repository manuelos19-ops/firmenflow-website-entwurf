import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  ArrowUpRight,
  FirmenflowUiIcon,
  firmenflowUiIconNames,
} from "./FirmenflowUiIcon";

const expectedIconNames = [
  "arrow-left",
  "arrow-right",
  "arrow-up-right",
  "check",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "clock",
  "close",
  "download",
  "external-link",
  "globe",
  "hard-drive",
  "loader",
  "mail",
  "map-pin",
  "message-circle",
  "minus",
  "monitor",
  "pause",
  "phone",
  "play",
  "plus",
  "refresh",
  "share",
  "shield-check",
  "user",
] as const;

describe("FirmenflowUiIcon", () => {
  it("stellt den vollständigen Firmenflow-Mikro-Iconkatalog bereit", () => {
    expect(firmenflowUiIconNames).toEqual(expectedIconNames);
  });

  it("ist ohne Label dekorativ und reicht SVG-Attribute durch", () => {
    const markup = renderToStaticMarkup(
      <FirmenflowUiIcon
        name="download"
        className="h-4 w-4"
        data-state="bereit"
      />,
    );

    expect(markup).toContain('data-firmenflow-icon="download"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('data-state="bereit"');
    expect(markup).toContain('class="h-4 w-4"');
  });

  it("wird mit Label als benanntes Bild ausgegeben", () => {
    const markup = renderToStaticMarkup(
      <FirmenflowUiIcon name="shield-check" label="Datenschutz geprüft" />,
    );

    expect(markup).toContain('role="img"');
    expect(markup).toContain('aria-label="Datenschutz geprüft"');
    expect(markup).not.toContain('aria-hidden="true"');
  });

  it("stellt kompatible benannte Exporte mit dem Firmenflow-Marker bereit", () => {
    const markup = renderToStaticMarkup(<ArrowUpRight className="h-4 w-4" />);

    expect(markup).toContain('data-firmenflow-icon="arrow-up-right"');
  });
});

describe("ButtonLink", () => {
  it("verwendet die Firmenflow-Pfeilinsel, eine Lichtspur und einen sichtbaren Fokuszustand", () => {
    const markup = renderToStaticMarkup(
      <ButtonLink href="/anfrage">Kostenlos anfragen</ButtonLink>,
    );

    expect(markup).toContain('data-firmenflow-icon="arrow-up-right"');
    expect(markup).toContain('data-flow-sheen="true"');
    expect(markup).toContain("focus-visible:ring-2");
    expect(markup).toContain('href="/anfrage"');
    expect(markup).toContain("Kostenlos anfragen");
  });
});
