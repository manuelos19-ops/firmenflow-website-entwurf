const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildAllBrandAssets() {
  console.log('--- Starte Generierung aller Brand-Assets ---');

  const srcWordmark = 'C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1788641903722.png';
  const srcMark = 'C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1788641903723.png';

  // 1. WORDMARK TRIMMED (940 x 221)
  const wmTrimmed = sharp(srcWordmark).trim();
  const { data: wmData, info: wmInfo } = await wmTrimmed.raw().toBuffer({ resolveWithObject: true });
  console.log('Wordmark getrimmt:', wmInfo.width, 'x', wmInfo.height);

  // 1a. Standard Wordmark PNG & WEBP
  const wmStandardBuffer = await sharp(wmData, { raw: { width: wmInfo.width, height: wmInfo.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-wordmark.png', wmStandardBuffer);

  const wmStandardWebp = await sharp(wmData, { raw: { width: wmInfo.width, height: wmInfo.height, channels: 4 } })
    .webp({ lossless: true })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-wordmark.webp', wmStandardWebp);

  // 1b. Light Wordmark (FIRMEN und Subline weiß, flow coral)
  const wmLightData = Buffer.from(wmData);
  for (let i = 0; i < wmLightData.length; i += 4) {
    const a = wmLightData[i+3];
    if (a > 0) {
      const r = wmLightData[i];
      const g = wmLightData[i+1];
      const b = wmLightData[i+2];
      const isCoral = (r > 160 && r > g * 1.4 && r > b * 1.4);
      if (!isCoral) {
        wmLightData[i] = 255;
        wmLightData[i+1] = 255;
        wmLightData[i+2] = 255;
      }
    }
  }

  const wmLightBuffer = await sharp(wmLightData, { raw: { width: wmInfo.width, height: wmInfo.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-wordmark-light.png', wmLightBuffer);

  const wmLightWebp = await sharp(wmLightData, { raw: { width: wmInfo.width, height: wmInfo.height, channels: 4 } })
    .webp({ lossless: true })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-wordmark-light.webp', wmLightWebp);

  // 1c. Wordmark SVGs
  const wmSvg = `<svg width="${wmInfo.width}" height="${wmInfo.height}" viewBox="0 0 ${wmInfo.width} ${wmInfo.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <image width="${wmInfo.width}" height="${wmInfo.height}" href="data:image/png;base64,${wmStandardBuffer.toString('base64')}" />
</svg>`;
  fs.writeFileSync('public/brand/firmenflow-wordmark.svg', wmSvg);

  const wmLightSvg = `<svg width="${wmInfo.width}" height="${wmInfo.height}" viewBox="0 0 ${wmInfo.width} ${wmInfo.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <image width="${wmInfo.width}" height="${wmInfo.height}" href="data:image/png;base64,${wmLightBuffer.toString('base64')}" />
</svg>`;
  fs.writeFileSync('public/brand/firmenflow-wordmark-light.svg', wmLightSvg);


  // 2. FF-MARK TRIMMED (414 x 328)
  const markTrimmed = sharp(srcMark).trim();
  const { data: markData, info: markInfo } = await markTrimmed.raw().toBuffer({ resolveWithObject: true });
  console.log('FF-Mark getrimmt:', markInfo.width, 'x', markInfo.height);

  const markLightData = Buffer.from(markData);
  for (let i = 0; i < markLightData.length; i += 4) {
    const a = markLightData[i+3];
    if (a > 0) {
      const r = markLightData[i];
      const g = markLightData[i+1];
      const b = markLightData[i+2];
      const isCoral = (r > 160 && r > g * 1.4 && r > b * 1.4);
      if (!isCoral) {
        markLightData[i] = 255;
        markLightData[i+1] = 255;
        markLightData[i+2] = 255;
      }
    }
  }

  // 2a. Trimmed WebP versions (fuer BrandIcon maximale Schaerfe und Groesse)
  const markWebp = await sharp(markData, { raw: { width: markInfo.width, height: markInfo.height, channels: 4 } })
    .webp({ lossless: true })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-mark.webp', markWebp);

  const markLightWebp = await sharp(markLightData, { raw: { width: markInfo.width, height: markInfo.height, channels: 4 } })
    .webp({ lossless: true })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-mark-light.webp', markLightWebp);

  // 2b. 512x512 Canvas versionen (fuer OpenGraph, PWA, Browser-Icons)
  const targetMarkW = 440;
  const targetMarkH = Math.round(markInfo.height * (targetMarkW / markInfo.width)); // ~348px
  
  const resizedMarkData = await sharp(markData, { raw: { width: markInfo.width, height: markInfo.height, channels: 4 } })
    .resize(targetMarkW, targetMarkH)
    .png()
    .toBuffer();

  const resizedMarkLightData = await sharp(markLightData, { raw: { width: markInfo.width, height: markInfo.height, channels: 4 } })
    .resize(targetMarkW, targetMarkH)
    .png()
    .toBuffer();

  const mark512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resizedMarkData, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-mark.png', mark512);
  fs.writeFileSync('public/icon.png', mark512);

  const markLight512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resizedMarkLightData, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync('public/brand/firmenflow-mark-light.png', markLight512);

  // 2c. Apple Touch Icon 180x180
  const appleTouchW = 150;
  const appleTouchH = Math.round(markInfo.height * (appleTouchW / markInfo.width)); // ~119px
  const appleResized = await sharp(markData, { raw: { width: markInfo.width, height: markInfo.height, channels: 4 } })
    .resize(appleTouchW, appleTouchH)
    .png()
    .toBuffer();

  const appleIcon = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: appleResized, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync('public/apple-touch-icon.png', appleIcon);
  fs.writeFileSync('public/apple-icon.png', appleIcon);

  // 2d. Favicon 32x32
  const favW = 30;
  const favH = Math.round(markInfo.height * (favW / markInfo.width)); // ~24px
  const favResized = await sharp(markData, { raw: { width: markInfo.width, height: markInfo.height, channels: 4 } })
    .resize(favW, favH)
    .png()
    .toBuffer();

  const favicon32 = await sharp({
    create: {
      width: 32,
      height: 32,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: favResized, gravity: 'center' }])
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon.ico', favicon32);

  // 2e. Mark SVGs
  const markSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <image width="512" height="512" href="data:image/png;base64,${mark512.toString('base64')}" />
</svg>`;
  fs.writeFileSync('public/brand/firmenflow-mark.svg', markSvg);

  const markLightSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <image width="512" height="512" href="data:image/png;base64,${markLight512.toString('base64')}" />
</svg>`;
  fs.writeFileSync('public/brand/firmenflow-mark-light.svg', markLightSvg);

  // 3. Update Skill Assets
  const skillAssetDir = 'C:/Users/manue/.gemini/config/skills/firmenflow-design-system/assets';
  if (fs.existsSync(skillAssetDir)) {
    fs.writeFileSync(path.join(skillAssetDir, 'firmenflow-wordmark.png'), wmStandardBuffer);
    fs.writeFileSync(path.join(skillAssetDir, 'firmenflow-ff-mark.png'), mark512);
    console.log('Skill assets in firmenflow-design-system ebenfalls aktualisiert!');
  }

  console.log('--- Alle Brand-Assets erfolgreich generiert und geschrieben! ---');
}

buildAllBrandAssets().catch(console.error);
