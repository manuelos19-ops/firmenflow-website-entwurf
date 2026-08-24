import sharp from "sharp";

async function cropMark() {
  const mark = await sharp("public/brand/firmenflow-wordmark.png")
    .extract({ left: 0, top: 0, width: 280, height: 219 })
    .trim()
    .png({ quality: 100 })
    .toFile("public/brand/firmenflow-mark.png");

  const markLight = await sharp("public/brand/firmenflow-wordmark-light.png")
    .extract({ left: 0, top: 0, width: 280, height: 219 })
    .trim()
    .png({ quality: 100 })
    .toFile("public/brand/firmenflow-mark-light.png");

  await sharp("public/brand/firmenflow-mark.png")
    .webp({ quality: 95, lossless: true })
    .toFile("public/brand/firmenflow-mark.webp");

  await sharp("public/brand/firmenflow-mark-light.png")
    .webp({ quality: 95, lossless: true })
    .toFile("public/brand/firmenflow-mark-light.webp");

  console.log("Successfully extracted ff mark!");
}

cropMark().catch(console.error);
