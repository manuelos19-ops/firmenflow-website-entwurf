import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { OUTPUT_DIR, PILOT, QA_DIR } from "./spec";

const expectedNames = [
  PILOT.cards.firmenflow.output,
  PILOT.cards.flowscreen.output,
].sort();

export async function validatePilotDelivery(
  outputDir = OUTPUT_DIR,
  qaDir = QA_DIR,
): Promise<void> {
  const deliveredFiles = (await readdir(outputDir)).sort();
  if (JSON.stringify(deliveredFiles) !== JSON.stringify(expectedNames)) {
    throw new Error(`Lieferordner enthält unerwartete Dateien: ${deliveredFiles.join(", ")}`);
  }

  const previews: Buffer[] = [];
  for (const name of expectedNames) {
    const file = path.join(outputDir, name);
    const metadata = await sharp(file).metadata();
    const valid =
      metadata.format === "png" &&
      metadata.width === PILOT.size.width &&
      metadata.height === PILOT.size.height &&
      metadata.space === "srgb" &&
      metadata.hasAlpha === false;
    if (!valid) {
      throw new Error(`Ungültige PNG-Eigenschaften: ${name} ${JSON.stringify(metadata)}`);
    }
    previews.push(await sharp(file).resize(600, 315).png().toBuffer());
  }

  await mkdir(qaDir, { recursive: true });
  await sharp({
    create: {
      width: 1240,
      height: 355,
      channels: 3,
      background: "#e9e3eb",
    },
  })
    .composite([
      { input: previews[0], left: 10, top: 20 },
      { input: previews[1], left: 630, top: 20 },
    ])
    .png()
    .toFile(path.join(qaDir, "qa-contact-sheet.png"));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  validatePilotDelivery()
    .then(() => console.log("OG-Pilot technisch geprüft; QA-Kontaktansicht erzeugt."))
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
