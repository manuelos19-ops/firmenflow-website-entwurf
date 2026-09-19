import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generatePilotCards } from "./generate";
import { ASSET_PATHS, PILOT } from "./spec";
import { validatePilotDelivery } from "./validate";

describe("OG-Social-Pilot PNG-Ausgabe", () => {
  let tempRoot: string;
  let outputDir: string;
  let qaDir: string;

  beforeAll(async () => {
    tempRoot = await mkdtemp(path.join(os.tmpdir(), "firmenflow-og-pilot-"));
    outputDir = path.join(tempRoot, "outputs");
    qaDir = path.join(tempRoot, "qa");
    await generatePilotCards(outputDir);
  }, 30_000);

  afterAll(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  it.each(["firmenflow", "flowscreen"] as const)(
    "erzeugt %s als opakes sRGB-PNG in 1200 × 630",
    async (variant) => {
      const file = path.join(outputDir, PILOT.cards[variant].output);
      const metadata = await sharp(file).metadata();
      expect(metadata.format).toBe("png");
      expect(metadata.width).toBe(1200);
      expect(metadata.height).toBe(630);
      expect(metadata.space).toBe("srgb");
      expect(metadata.hasAlpha).toBe(false);
    },
  );

  it("liefert exakt die zwei freigegebenen PNG-Dateien", async () => {
    expect((await readdir(outputDir)).sort()).toEqual([
      "firmenflow-og-social.png",
      "flowscreen-og-social.png",
    ]);
  });

  it("erzeugt nach erfolgreicher Prüfung die kleine Kontaktansicht", async () => {
    await validatePilotDelivery(outputDir, qaDir);
    const metadata = await sharp(path.join(qaDir, "qa-contact-sheet.png")).metadata();
    expect(metadata.width).toBe(1240);
    expect(metadata.height).toBe(355);
  });

  it("lehnt zusätzliche PNG-Dateien im Lieferordner ab", async () => {
    await writeFile(path.join(outputDir, "nicht-freigegeben.png"), Buffer.from("x"));
    await expect(validatePilotDelivery(outputDir, qaDir)).rejects.toThrow(
      "Lieferordner enthält unerwartete Dateien",
    );
    await rm(path.join(outputDir, "nicht-freigegeben.png"));
  });

  it("bricht bei fehlender Schrift vor dem Browserstart ab", async () => {
    await expect(
      generatePilotCards(path.join(tempRoot, "missing-font"), {
        ...ASSET_PATHS,
        sansFont: "public/fonts/switzer/fehlt.woff2",
      }),
    ).rejects.toThrow("Quellasset fehlt: public/fonts/switzer/fehlt.woff2");
  });

  it("bricht bei einem beschädigten Bild ab, statt unbegrenzt zu warten", async () => {
    const corruptImage = path.join(tempRoot, "corrupt.png");
    await writeFile(corruptImage, Buffer.from("kein gueltiges png"));

    await expect(
      generatePilotCards(path.join(tempRoot, "corrupt-image"), {
        ...ASSET_PATHS,
        firmenflowWordmark: corruptImage,
      }),
    ).rejects.toThrow("Bild konnte nicht geladen werden: Firmenflow");
  }, 8_000);

  it("bricht bei einer beschädigten Schrift ab, statt Ersatzschrift zu rendern", async () => {
    const corruptFont = path.join(tempRoot, "corrupt.woff2");
    await writeFile(corruptFont, Buffer.from("keine gueltige schrift"));

    await expect(
      generatePilotCards(path.join(tempRoot, "corrupt-font"), {
        ...ASSET_PATHS,
        sansFont: corruptFont,
      }),
    ).rejects.toThrow("Schrift konnte nicht geladen werden: Switzer");
  }, 8_000);
});
