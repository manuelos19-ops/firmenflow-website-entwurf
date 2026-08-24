import sharp from "sharp";
import path from "node:path";

async function processCleanLogo() {
  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787593507599.jpg";

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  console.log("Input image:", width, "x", height, "channels:", channels);

  const outputData = Buffer.alloc(width * height * 4);
  const outputLightData = Buffer.alloc(width * height * 4);

  // Background is light gray/white (#f0f3f8 to #ffffff)
  // Let's sample the background color from the corners (0,0), (width-1,0), etc.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const outIdx = (y * width + x) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      const l = (max + min) / 2; // 0..255

      let alpha = 255;

      // Clean white/off-white background removal
      if (l >= 244 && delta < 12) {
        alpha = 0;
      } else if (l >= 210 && delta < 20) {
        // Smooth anti-aliased edge
        const t = (l - 210) / 34;
        alpha = Math.round(255 * (1 - t));
      }

      if (alpha === 0) {
        outputData[outIdx] = 0;
        outputData[outIdx + 1] = 0;
        outputData[outIdx + 2] = 0;
        outputData[outIdx + 3] = 0;

        outputLightData[outIdx] = 0;
        outputLightData[outIdx + 1] = 0;
        outputLightData[outIdx + 2] = 0;
        outputLightData[outIdx + 3] = 0;
      } else {
        outputData[outIdx] = r;
        outputData[outIdx + 1] = g;
        outputData[outIdx + 2] = b;
        outputData[outIdx + 3] = alpha;

        // For light version (footer / dark mode):
        // If colored (ribbon or 'flow'), keep colors
        // If dark charcoal text, convert to white #ffffff
        const isColored = delta > 25 || (r > 120 && b < 100);
        if (isColored) {
          outputLightData[outIdx] = r;
          outputLightData[outIdx + 1] = g;
          outputLightData[outIdx + 2] = b;
          outputLightData[outIdx + 3] = alpha;
        } else {
          outputLightData[outIdx] = 255;
          outputLightData[outIdx + 1] = 255;
          outputLightData[outIdx + 2] = 255;
          outputLightData[outIdx + 3] = alpha;
        }
      }
    }
  }

  // Trim and save wordmark
  await sharp(outputData, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ quality: 100 })
    .toFile("public/brand/firmenflow-wordmark.png");

  await sharp(outputLightData, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ quality: 100 })
    .toFile("public/brand/firmenflow-wordmark-light.png");

  await sharp(outputData, { raw: { width, height, channels: 4 } })
    .trim()
    .webp({ quality: 95, lossless: true })
    .toFile("public/brand/firmenflow-wordmark.webp");

  await sharp(outputLightData, { raw: { width, height, channels: 4 } })
    .trim()
    .webp({ quality: 95, lossless: true })
    .toFile("public/brand/firmenflow-wordmark-light.webp");

  const metaDark = await sharp("public/brand/firmenflow-wordmark.png").metadata();
  console.log("Trimmed wordmark dimensions:", metaDark.width, "x", metaDark.height);

  // Extract standalone mark icon (the 3D ribbon)
  if (metaDark.width && metaDark.height) {
    const markWidth = Math.round(metaDark.width * 0.38);
    
    await sharp("public/brand/firmenflow-wordmark.png")
      .extract({ left: 0, top: 0, width: markWidth, height: metaDark.height })
      .trim()
      .png({ quality: 100 })
      .toFile("public/brand/firmenflow-mark.png");

    await sharp("public/brand/firmenflow-wordmark-light.png")
      .extract({ left: 0, top: 0, width: markWidth, height: metaDark.height })
      .trim()
      .png({ quality: 100 })
      .toFile("public/brand/firmenflow-mark-light.png");

    await sharp("public/brand/firmenflow-mark.png")
      .webp({ quality: 95, lossless: true })
      .toFile("public/brand/firmenflow-mark.webp");

    await sharp("public/brand/firmenflow-mark-light.png")
      .webp({ quality: 95, lossless: true })
      .toFile("public/brand/firmenflow-mark-light.webp");

    console.log("Extracted standalone mark successfully!");
  }
}

processCleanLogo().catch(console.error);
