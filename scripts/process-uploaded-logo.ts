import sharp from "sharp";
import path from "node:path";

async function processLogo() {
  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787591911028.png";
  
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  // Create clean transparent buffer
  const outputData = Buffer.alloc(width * height * 4);
  const outputLightData = Buffer.alloc(width * height * 4);

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
      
      // If it's the checkerboard background
      if (l > 185 && delta < 25) {
        alpha = 0;
      } else if (l > 150 && delta < 35) {
        const t = (l - 150) / 35;
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

        const isCoralOrWave = (r > 150 && g < 130);
        if (isCoralOrWave) {
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

  // Save to public/brand/
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
  console.log("Processed logo successfully! Trimmed dimensions:", metaDark.width, "x", metaDark.height);
}

processLogo().catch(console.error);
