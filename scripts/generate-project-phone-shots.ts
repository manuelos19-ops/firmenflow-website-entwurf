/**
 * Erzeugt aus jeder Projekt-URL einen echten Handy-Screenshot in einem
 * erkennbaren Geraeterahmen.
 *
 * Warum echte Screenshots statt gezeichneter Mockups: Die verlinkten Seiten
 * aendern sich (aus der Kaesekuchen-Demo wurde Cafe Goldstueck), ohne dass
 * die Projektkarte es merkt. Mit diesem Skript ist ein Abgleich ein Befehl.
 *
 * Aufruf:  npx tsx scripts/generate-project-phone-shots.ts
 */
import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { allProjects } from "../src/content/projects";

// Alles in Geraete-Pixeln bei doppelter Aufloesung gerechnet.
const VIEWPORT = { width: 390, height: 844 };
const SCALE = 2;
const SHOT_W = VIEWPORT.width * SCALE;
const SHOT_H = VIEWPORT.height * SCALE;
const BEZEL = 44;
const DEVICE_W = SHOT_W + BEZEL * 2;
const DEVICE_H = SHOT_H + BEZEL * 2;
const SCREEN_RADIUS = 76;
const DEVICE_RADIUS = 112;
const OUTPUT_WIDTH = 560;

const outDir = path.join(process.cwd(), "public/media/projects");

const deviceBody = Buffer.from(`
<svg width="${DEVICE_W}" height="${DEVICE_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3a3340"/>
      <stop offset="45%" stop-color="#16131a"/>
      <stop offset="100%" stop-color="#2b2530"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${DEVICE_W}" height="${DEVICE_H}" rx="${DEVICE_RADIUS}" fill="url(#frame)"/>
  <rect x="3" y="3" width="${DEVICE_W - 6}" height="${DEVICE_H - 6}" rx="${DEVICE_RADIUS - 3}"
        fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="3"/>
  <rect x="${BEZEL - 4}" y="${BEZEL - 4}" width="${SHOT_W + 8}" height="${SHOT_H + 8}"
        rx="${SCREEN_RADIUS + 4}" fill="#000"/>
  <!-- Seitentasten: muessen innerhalb der deklarierten Flaeche bleiben,
       sonst vergroessert librsvg die gerenderte Leinwand und der
       Composite-Schritt schlaegt fehl. -->
  <rect x="${DEVICE_W - 6}" y="${Math.round(DEVICE_H * 0.26)}" width="6" height="150" rx="3" fill="#0f0d12"/>
  <rect x="0" y="${Math.round(DEVICE_H * 0.23)}" width="6" height="84" rx="3" fill="#0f0d12"/>
  <rect x="0" y="${Math.round(DEVICE_H * 0.32)}" width="6" height="84" rx="3" fill="#0f0d12"/>
</svg>`);

const screenMask = Buffer.from(`
<svg width="${SHOT_W}" height="${SHOT_H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${SHOT_W}" height="${SHOT_H}" rx="${SCREEN_RADIUS}" fill="#fff"/>
</svg>`);

const dynamicIsland = Buffer.from(`
<svg width="${DEVICE_W}" height="${DEVICE_H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${Math.round((DEVICE_W - 186) / 2)}" y="${BEZEL + 22}" width="186" height="50" rx="25" fill="#000"/>
</svg>`);

/** Consent-Banner wegklicken, damit der Screenshot die Seite zeigt statt eines Overlays. */
async function dismissConsent(page: import("@playwright/test").Page) {
  const patterns = [/alle ablehnen/i, /nur essenziell/i, /ablehnen/i, /akzeptieren/i, /verstanden/i];
  for (const pattern of patterns) {
    const button = page.getByRole("button", { name: pattern }).first();
    try {
      if (await button.isVisible({ timeout: 1200 })) {
        await button.click({ timeout: 2500 });
        await page.waitForTimeout(700);
        return pattern.source;
      }
    } catch {
      // Button nicht vorhanden oder nicht klickbar - naechstes Muster probieren.
    }
  }
  return null;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    isMobile: true,
    hasTouch: true,
    locale: "de-DE",
  });

  for (const project of allProjects) {
    const page = await context.newPage();
    const target = path.join(outDir, `${project.slug}-phone.webp`);

    try {
      await page.goto(project.url, { waitUntil: "networkidle", timeout: 45_000 });
      const dismissed = await dismissConsent(page);
      // Einblend-Animationen durchlaufen lassen.
      await page.waitForTimeout(2500);

      const shot = await page.screenshot({ type: "png" });

      // Jeder Schritt einzeln und als Buffer, damit die Masse zwischen den
      // Operationen garantiert feststehen. Verkettetes resize+composite hat
      // hier zu Groessenkonflikten gefuehrt.
      const normalized = await sharp(shot)
        .resize(SHOT_W, SHOT_H, { fit: "cover", position: "top" })
        .png()
        .toBuffer();

      const roundedScreen = await sharp(normalized)
        .composite([{ input: screenMask, blend: "dest-in" }])
        .png()
        .toBuffer();

      // Der Geraeterahmen ist die Basis - so entspricht die Leinwand
      // zwangslaeufig seinen Massen.
      const frameBase = await sharp(deviceBody).png().toBuffer();

      const assembled = await sharp(frameBase)
        .composite([
          { input: roundedScreen, top: BEZEL, left: BEZEL },
          { input: dynamicIsland, top: 0, left: 0 },
        ])
        .png()
        .toBuffer();

      await sharp(assembled).resize({ width: OUTPUT_WIDTH }).webp({ quality: 92 }).toFile(target);

      const title = await page.title();
      console.log(
        `  [OK] ${project.slug.padEnd(24)} -> ${path.basename(target)}` +
          `  | ${title.slice(0, 48)}` +
          (dismissed ? `  | Banner: ${dismissed}` : "")
      );
    } catch (error) {
      console.log(`  [FEHLER] ${project.slug}: ${String(error).split("\n")[0].slice(0, 110)}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\nFertig. Die bisherigen Bilder wurden nicht ueberschrieben.");
}

main();
