import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadPilotAssets } from "./assets";
import { renderPilotDocument } from "./render";
import { ASSET_PATHS, OUTPUT_DIR, PILOT, QA_DIR } from "./spec";

describe("OG-Social-Pilotvertrag", () => {
  it("fixiert Maße, Dateinamen und freigegebene Texte", () => {
    expect(PILOT.size).toEqual({ width: 1200, height: 630 });
    expect(PILOT.cards.firmenflow.output).toBe("firmenflow-og-social.png");
    expect(PILOT.cards.flowscreen.output).toBe("flowscreen-og-social.png");
    expect(PILOT.cards.firmenflow.headline).toBe(
      "Mehr Lokalpräsenz. Weniger Agenturtheater.",
    );
    expect(PILOT.cards.firmenflow.subline).toBe(
      "Websites und Google-Profile persönlich mit Manu.",
    );
    expect(PILOT.cards.flowscreen.headline).toBe(
      "Schluss mit hässlichen Screenshots.",
    );
    expect(PILOT.cards.flowscreen.subline).toBe(
      "Das kostenlose Screenshot-Studio für Windows.",
    );
    expect(JSON.stringify(PILOT).toLowerCase()).not.toContain("direkt mit manu");
  });

  it("hält Lieferung und QA aus public und src heraus", () => {
    expect(path.relative(process.cwd(), OUTPUT_DIR).split(path.sep).join("/"))
      .toBe("outputs/og-social-pilot");
    expect(path.relative(process.cwd(), QA_DIR).split(path.sep).join("/"))
      .toBe("work/og-social-pilot");
  });

  it("lädt alle freigegebenen Originalassets", async () => {
    const assets = await loadPilotAssets();
    expect(Object.keys(assets).sort()).toEqual(Object.keys(ASSET_PATHS).sort());
    for (const value of Object.values(assets)) {
      expect(value).toMatch(/^data:[^;]+;base64,/);
    }
  });

  it("nennt ein fehlendes Quellasset im Fehler", async () => {
    await expect(
      loadPilotAssets({
        ...ASSET_PATHS,
        manuPortrait: "public/media/fehlt-manu.webp",
      }),
    ).rejects.toThrow("Quellasset fehlt: public/media/fehlt-manu.webp");
  });

  it("rendert jede freigegebene Karte genau einmal", async () => {
    const html = renderPilotDocument(await loadPilotAssets());
    expect(html.match(/data-card="firmenflow"/g)).toHaveLength(1);
    expect(html.match(/data-card="flowscreen"/g)).toHaveLength(1);
    expect(html).toContain(PILOT.cards.firmenflow.primaryLine);
    expect(html).toContain(PILOT.cards.firmenflow.editorialLine);
    expect(html).toContain(PILOT.cards.firmenflow.subline);
    expect(html).toContain(PILOT.cards.flowscreen.lineOne);
    expect(html).toContain(PILOT.cards.flowscreen.accentLine);
    expect(html).toContain(PILOT.cards.flowscreen.subline);
  });

  it("verankert die Schutzfläche und vollflächige Hintergründe", async () => {
    const html = renderPilotDocument(await loadPilotAssets());
    expect(html).toContain("--safe: 64px");
    expect(html).toContain("width: 1200px");
    expect(html).toContain("height: 630px");
    expect(html).toContain(`background: ${PILOT.colors.paper}`);
    expect(html).toContain(`background: ${PILOT.colors.flowDark}`);
  });

  it("rendert die freigegebenen sichtbaren Claims wortgleich", async () => {
    const html = renderPilotDocument(await loadPilotAssets());
    const visibleText = html
      .replace(/<style>[\s\S]*?<\/style>/, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    expect(visibleText).toContain(
      "Mehr Lokalpräsenz. Weniger Agenturtheater.",
    );
    expect(visibleText).toContain(
      "Schluss mit hässlichen Screenshots.",
    );
    expect(visibleText).toContain(
      "Websites und Google-Profile persönlich mit Manu.",
    );
    expect(visibleText.toLowerCase()).not.toContain("direkt mit manu");
  });
});
