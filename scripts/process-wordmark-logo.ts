import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function processWordmarkLogo() {
  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787617294198.jpg";
  const brandDir = "public/brand";
  await fs.mkdir(brandDir, { recursive: true });

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Create RGBA buffer for dark version (for light backgrounds)
  const darkBuf = Buffer.alloc(width * height * 4);
  // Create RGBA buffer for light version (for dark backgrounds)
  const lightBuf = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    // Background is near white (e.g. r>235, g>235, b>235)
    // Calculate lightness:
    const lightness = (r + g + b) / 3;

    // Alpha calculation: transparent when lightness > 240, opaque when lightness < 200
    let alpha = 0;
    if (lightness < 245) {
      alpha = Math.min(255, Math.max(0, Math.round((245 - lightness) * 3.8)));
    }

    // Determine if pixel is part of red/coral "flow" or black "FIRMEN"
    const isReddish = r > 120 && g < 130 && b < 130 && (r - g > 30);

    // Dark version:
    if (isReddish) {
      darkBuf[dstIdx] = Math.min(255, Math.round(r * 1.15));
      darkBuf[dstIdx + 1] = Math.round(g * 0.9);
      darkBuf[dstIdx + 2] = Math.round(b * 0.9);
    } else {
      // Charcoal/black
      darkBuf[dstIdx] = Math.min(255, r);
      darkBuf[dstIdx + 1] = Math.min(255, g);
      darkBuf[dstIdx + 2] = Math.min(255, b);
    }
    darkBuf[dstIdx + 3] = alpha;

    // Light version (white text + coral "flow" for dark background):
    if (isReddish) {
      lightBuf[dstIdx] = 255; // Coral red
      lightBuf[dstIdx + 1] = 112;
      lightBuf[dstIdx + 2] = 93;
    } else {
      // Pure crisp white
      lightBuf[dstIdx] = 255;
      lightBuf[dstIdx + 1] = 255;
      lightBuf[dstIdx + 2] = 255;
    }
    lightBuf[dstIdx + 3] = alpha;
  }

  // Save trimmed dark wordmark
  await sharp(darkBuf, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ quality: 100 })
    .toFile(path.join(brandDir, "firmenflow-wordmark.png"));

  await sharp(darkBuf, { raw: { width, height, channels: 4 } })
    .trim()
    .webp({ quality: 95 })
    .toFile(path.join(brandDir, "firmenflow-wordmark.webp"));

  // Save trimmed light wordmark
  await sharp(lightBuf, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ quality: 100 })
    .toFile(path.join(brandDir, "firmenflow-wordmark-light.png"));

  await sharp(lightBuf, { raw: { width, height, channels: 4 } })
    .trim()
    .webp({ quality: 95 })
    .toFile(path.join(brandDir, "firmenflow-wordmark-light.webp"));

  console.log("Wordmark logos extracted and saved successfully!");
}

processWordmarkLogo().catch(console.error);
