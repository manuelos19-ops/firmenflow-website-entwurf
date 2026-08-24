import sharp from "sharp";
import path from "node:path";

async function processNewLogo() {
  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787593097281.jpg";
  
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 3 for JPG or 4 for PNG

  console.log("Input image:", width, "x", height, "channels:", channels);

  // Create transparent buffer (RGBA)
  const outputData = Buffer.alloc(width * height * 4);
  const outputLightData = Buffer.alloc(width * height * 4);

  // Analyze checkerboard pattern:
  // The checkerboard has pixels around #808080 (gray ~128) and #ffffff (white ~255) or #b0b0b0 (~176)
  // Let's analyze the checkerboard pixels vs logo pixels:
  // - Checkerboard: r, g, b are almost identical (|r-g| < 15, |g-b| < 15) and brightness is gray/white
  // - Logo ribbon: high saturation colors (coral, red, purple, orange, violet: delta > 25 or deep dark < 60)
  // - Logo text: FIRMEN is dark charcoal/black/deep plum (r ~ 40, g ~ 40, b ~ 40)
  // - Logo text: flow is coral (r > 180, g < 130, b < 130)
  // - Subline: dark charcoal (r ~ 50, g ~ 50, b ~ 50)

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

      // Checkerboard tiles in this JPG are:
      // White tiles: l > 200, delta < 15
      // Gray tiles: l between 120 and 185, delta < 15
      // Checkerboard edge transitions: delta < 18 and l > 115
      if (delta < 18 && l > 110) {
        alpha = 0;
      } else if (delta < 25 && l > 110) {
        // Smooth anti-aliased edge
        const t = (delta - 18) / 7;
        alpha = Math.round(255 * t);
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

        // For light version:
        // If it's the dark text (FIRMEN or subline), make it crisp white #ffffff
        // If it's the coral/ribbon, preserve exact colors!
        const isColored = delta > 25 || (r > 120 && b < 100);
        if (isColored) {
          outputLightData[outIdx] = r;
          outputLightData[outIdx + 1] = g;
          outputLightData[outIdx + 2] = b;
          outputLightData[outIdx + 3] = alpha;
        } else {
          // Dark text -> white text
          outputLightData[outIdx] = 255;
          outputLightData[outIdx + 1] = 255;
          outputLightData[outIdx + 2] = 255;
          outputLightData[outIdx + 3] = alpha;
        }
      }
    }
  }

  // Trim and save
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
  console.log("Trimmed dimensions:", metaDark.width, "x", metaDark.height);
}

processNewLogo().catch(console.error);
