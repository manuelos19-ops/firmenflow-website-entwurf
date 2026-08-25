import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function processNewPortrait() {
  const targetDir = "public/media/portraits";
  await fs.mkdir(targetDir, { recursive: true });

  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787618206005.jpg";

  // Full high-res portrait
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, "manu-green-door.webp"));

  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 92 })
    .toFile(path.join(targetDir, "manu-green-door.jpg"));

  // Focused portrait crop (aspect 4:5 / vertical) for editorial card
  const meta = await sharp(inputPath).metadata();
  const width = meta.width || 1024;
  const height = meta.height || 768;

  // Crop centered around Manuel's face and shirt
  const cropWidth = Math.round(height * 0.85); // 650
  const cropLeft = Math.round((width - cropWidth) / 2) + 20;

  await sharp(inputPath)
    .extract({
      left: cropLeft,
      top: 0,
      width: cropWidth,
      height: height,
    })
    .resize({ width: 800, height: 1000 })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, "manu-green-door-vertical.webp"));

  console.log("New portrait processed successfully!");
}

processNewPortrait().catch(console.error);
