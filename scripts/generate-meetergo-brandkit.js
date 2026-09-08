const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateMeetergoAssets() {
  console.log('--- Generiere CI-konforme Meetergo Banner & Square Assets (Plum #653683, Coral #FF705D) ---');

  const brandkitDir = 'd:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow';
  const sharedPhotosDir = 'd:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/Shared_Assets/Founder_Photos';
  const webBrandDir = 'public/brand';

  const portraitCrop = path.join(sharedPhotosDir, 'manu-signature-portrait-crop.png');
  const wordmarkPath = path.join(brandkitDir, 'firmenflow-wordmark-slogan.png');

  if (!fs.existsSync(portraitCrop)) {
    throw new Error('Portrait crop not found at: ' + portraitCrop);
  }
  if (!fs.existsSync(wordmarkPath)) {
    throw new Error('Wordmark not found at: ' + wordmarkPath);
  }

  // 1. Prepare circular/rounded portrait
  const portraitSize = 440;
  const portraitBuf = await sharp(portraitCrop)
    .resize(portraitSize, portraitSize)
    .png()
    .toBuffer();

  const portraitBase64 = portraitBuf.toString('base64');
  const wordmarkBuf = fs.readFileSync(wordmarkPath);
  const wordmarkBase64 = wordmarkBuf.toString('base64');

  // 2. SVG Banner 1200 x 630 (16:9 / Landscape)
  const bannerSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFAF7" />
      <stop offset="50%" stop-color="#FBF7F2" />
      <stop offset="100%" stop-color="#F5EFE6" />
    </linearGradient>
    
    <!-- Accent Gradient -->
    <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF705D" />
      <stop offset="100%" stop-color="#FA5D48" />
    </linearGradient>

    <!-- Clip Path for Rounded Portrait -->
    <clipPath id="portraitClip">
      <rect x="730" y="105" width="400" height="420" rx="36" />
    </clipPath>
    
    <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#17131a" flood-opacity="0.08" />
    </filter>

    <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#17131a" flood-opacity="0.06" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Subtle Decorative Shapes -->
  <circle cx="1150" cy="80" r="280" fill="#FF705D" fill-opacity="0.04" />
  <circle cx="100" cy="550" r="220" fill="#653683" fill-opacity="0.03" />

  <!-- Outer Card Frame (Subtle) -->
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#E7E2DC" stroke-width="1.5" />

  <!-- LEFT COLUMN: Content -->
  <!-- Wordmark + Slogan -->
  <image x="70" y="62" width="225" height="58" href="data:image/png;base64,${wordmarkBase64}" />

  <!-- Badge -->
  <g transform="translate(70, 142)">
    <rect width="270" height="34" rx="17" fill="#FFFFFF" stroke="#E7E2DC" stroke-width="1.2" filter="url(#badgeShadow)" />
    <circle cx="20" cy="17" r="4.5" fill="#10B981" />
    <text x="34" y="22" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="0.08em" fill="#653683">
      KOSTENLOS • 30 MINUTEN
    </text>
  </g>

  <!-- Main Title -->
  <text x="70" y="235" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" fill="#17131A" letter-spacing="-0.03em">
    Erstgespräch mit Manu
  </text>
  <text x="70" y="278" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="600" fill="#FF705D" letter-spacing="-0.01em">
    Deine Website &amp; Lokalpräsenz
  </text>

  <!-- Subtitle -->
  <text x="70" y="325" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="#746D76">
    Ehrlicher Blick auf deinen Betrieb – ohne Fachchinesisch und ohne Agenturtheater.
  </text>

  <!-- 3 Bullets with Icons -->
  <!-- Bullet 1 -->
  <g transform="translate(70, 375)">
    <circle cx="14" cy="14" r="14" fill="#FFF2F0" />
    <path d="M9 14L13 18L19 10" stroke="#FF705D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="40" y="19" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#17131A">
      Bestandsaufnahme: <tspan font-weight="400" fill="#5A545C">Wo steht dein Betrieb heute online?</tspan>
    </text>
  </g>

  <!-- Bullet 2 -->
  <g transform="translate(70, 425)">
    <circle cx="14" cy="14" r="14" fill="#FFF2F0" />
    <path d="M9 14L13 18L19 10" stroke="#FF705D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="40" y="19" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#17131A">
      Lokal-Potenzial: <tspan font-weight="400" fill="#5A545C">Sichtbarkeit bei Google &amp; Kunden vor Ort</tspan>
    </text>
  </g>

  <!-- Bullet 3 -->
  <g transform="translate(70, 475)">
    <circle cx="14" cy="14" r="14" fill="#FFF2F0" />
    <path d="M9 14L13 18L19 10" stroke="#FF705D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="40" y="19" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#17131A">
      Klarer Fahrplan: <tspan font-weight="400" fill="#5A545C">Konkrete Schritte ohne Verkaufsdruck</tspan>
    </text>
  </g>

  <!-- Footer hint with clean SVG icon -->
  <g transform="translate(70, 542)">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#FF705D" transform="scale(0.8) translate(0, -2)" />
    <text x="22" y="12" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#746D76">
      Wesel &amp; Niederrhein • Telefonisch oder per Video-Call
    </text>
  </g>

  <!-- RIGHT COLUMN: Portrait Card -->
  <!-- White Card Backing with Shadow -->
  <rect x="718" y="93" width="424" height="444" rx="42" fill="#FFFFFF" stroke="#E7E2DC" stroke-width="1.5" filter="url(#cardShadow)" />
  
  <!-- Coral Accent Border Ring -->
  <rect x="726" y="101" width="408" height="428" rx="38" fill="none" stroke="url(#coralGrad)" stroke-width="2.5" opacity="0.7" />

  <!-- The Portrait -->
  <image x="730" y="105" width="400" height="420" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,${portraitBase64}" clip-path="url(#portraitClip)" />

  <!-- Floating Badge on Portrait -->
  <g transform="translate(760, 485)" filter="url(#badgeShadow)">
    <rect width="340" height="54" rx="16" fill="#FFFFFF" stroke="#E7E2DC" stroke-width="1" />
    <text x="20" y="24" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#17131A">
      Manuel Landeck (Manu)
    </text>
    <text x="20" y="43" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#653683">
      Inhaber &amp; Webdesigner • Firmenflow
    </text>
  </g>
</svg>
`;

  // 3. SVG Square Card 800 x 800 (1:1 Thumbnail / Card)
  const squareSvg = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradSq" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFAF7" />
      <stop offset="60%" stop-color="#FBF6F0" />
      <stop offset="100%" stop-color="#F5EFE6" />
    </linearGradient>

    <linearGradient id="coralGradSq" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF705D" />
      <stop offset="100%" stop-color="#FA5D48" />
    </linearGradient>

    <clipPath id="portraitClipSq">
      <circle cx="400" cy="310" r="170" />
    </clipPath>

    <filter id="shadowSq" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#17131a" flood-opacity="0.1" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#bgGradSq)" />
  <circle cx="700" cy="150" r="260" fill="#FF705D" fill-opacity="0.05" />
  <circle cx="100" cy="700" r="240" fill="#653683" fill-opacity="0.04" />
  <rect x="20" y="20" width="760" height="760" rx="32" fill="none" stroke="#E7E2DC" stroke-width="1.5" />

  <!-- Wordmark Top Center -->
  <image x="270" y="45" width="260" height="67" href="data:image/png;base64,${wordmarkBase64}" />

  <!-- Portrait Circle with Glow & Border -->
  <circle cx="400" cy="310" r="178" fill="#FFFFFF" filter="url(#shadowSq)" stroke="#E7E2DC" stroke-width="2" />
  <circle cx="400" cy="310" r="174" fill="none" stroke="url(#coralGradSq)" stroke-width="3" />
  <image x="230" y="140" width="340" height="340" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,${portraitBase64}" clip-path="url(#portraitClipSq)" />

  <!-- Pill Badge on Photo (centered) -->
  <g transform="translate(295, 465)">
    <rect width="210" height="34" rx="17" fill="#FFFFFF" stroke="#E7E2DC" stroke-width="1.2" filter="url(#shadowSq)" />
    <circle cx="20" cy="17" r="4.5" fill="#10B981" />
    <text x="35" y="22" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="0.08em" fill="#653683">
      30 MIN. • KOSTENLOS
    </text>
  </g>

  <!-- Bottom Content Box -->
  <text x="400" y="555" text-anchor="middle" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="800" fill="#17131A" letter-spacing="-0.03em">
    Erstgespräch mit Manu
  </text>
  
  <text x="400" y="598" text-anchor="middle" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#FF705D" letter-spacing="-0.01em">
    Website &amp; Lokalpräsenz
  </text>

  <text x="400" y="645" text-anchor="middle" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="#746D76">
    Ehrliche Bestandsaufnahme • Klare nächste Schritte
  </text>

  <text x="400" y="675" text-anchor="middle" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="#746D76">
    Ganz entspannt ohne Verkaufsdruck
  </text>

  <!-- Footer Tag -->
  <rect x="250" y="718" width="300" height="30" rx="15" fill="#FFFFFF" stroke="#E7E2DC" stroke-width="1" />
  <text x="400" y="738" text-anchor="middle" font-family="'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#99929B">
    FIRMENFLOW • MANUEL LANDECK
  </text>
</svg>
`;

  // Targets: Brandkit and public/brand
  const bannerTargets = [
    path.join(brandkitDir, 'firmenflow-meetergo-banner.png'),
    path.join(webBrandDir, 'firmenflow-meetergo-banner.png')
  ];

  const squareTargets = [
    path.join(brandkitDir, 'firmenflow-meetergo-square.png'),
    path.join(webBrandDir, 'firmenflow-meetergo-square.png')
  ];

  for (const t of bannerTargets) {
    await sharp(Buffer.from(bannerSvg)).png({ quality: 100 }).toFile(t);
    console.log('Banner gerendert nach:', t);
  }

  for (const t of squareTargets) {
    await sharp(Buffer.from(squareSvg)).png({ quality: 100 }).toFile(t);
    console.log('Square gerendert nach:', t);
  }

  console.log('--- Alle Meetergo Assets erfolgreich mit CI-Farben gerendert! ---');
}

generateMeetergoAssets().catch(err => {
  console.error('Fehler bei der Asset-Generierung:', err);
  process.exit(1);
});
