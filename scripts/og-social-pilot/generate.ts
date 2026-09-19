import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { loadPilotAssets } from "./assets";
import { renderPilotDocument } from "./render";
import {
  ASSET_PATHS,
  OUTPUT_DIR,
  PILOT,
  type PilotAssetPaths,
  type PilotVariant,
} from "./spec";

export async function generatePilotCards(
  outputDir = OUTPUT_DIR,
  paths: PilotAssetPaths = ASSET_PATHS,
): Promise<Record<PilotVariant, string>> {
  const assets = await loadPilotAssets(paths);
  const html = renderPilotDocument(assets);
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: PILOT.size,
      deviceScaleFactor: 1,
    });
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const fontFaces = Array.from(document.fonts);
      for (const family of ["Space Grotesk", "Switzer", "Crimson Text"]) {
        const matchingFaces = fontFaces.filter(
          (face) => face.family.replace(/^['"]|['"]$/g, "") === family,
        );
        if (
          matchingFaces.length === 0 ||
          matchingFaces.some((face) => face.status !== "loaded")
        ) {
          throw new Error(`Schrift konnte nicht geladen werden: ${family}`);
        }
      }

      const images = Array.from(document.images);
      await Promise.all(
        images.map((image) => {
          if (image.complete) {
            if (image.naturalWidth > 0) return Promise.resolve();
            throw new Error(`Bild konnte nicht geladen werden: ${image.alt}`);
          }
          return new Promise<void>((resolve, reject) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener(
              "error",
              () => reject(new Error(`Bild konnte nicht geladen werden: ${image.alt}`)),
              { once: true },
            );
          });
        }),
      );
    });

    const files = {} as Record<PilotVariant, string>;
    for (const variant of ["firmenflow", "flowscreen"] as const) {
      const target = path.join(outputDir, PILOT.cards[variant].output);
      const raw = await page.locator(`[data-card="${variant}"]`).screenshot({
        type: "png",
        omitBackground: false,
      });
      const normalized = await sharp(raw)
        .removeAlpha()
        .toColourspace("srgb")
        .png({ compressionLevel: 9, palette: false })
        .toBuffer();
      await writeFile(target, normalized);
      files[variant] = target;
    }
    return files;
  } finally {
    await browser.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generatePilotCards()
    .then((files) => console.log(`OG-Pilot erzeugt:\n${files.firmenflow}\n${files.flowscreen}`))
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
