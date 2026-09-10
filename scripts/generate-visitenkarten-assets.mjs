import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';

const OUT_DIR = path.resolve('public/print/visitenkarten');
const SVG_DIR = path.join(OUT_DIR, 'svg');
const PNG_2048_DIR = path.join(OUT_DIR, 'png-2048');
const PNG_1024_DIR = path.join(OUT_DIR, 'png-1024');

[SVG_DIR, PNG_2048_DIR, PNG_1024_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Brand colors
const CORAL_START = '#ff705d';
const CORAL_END = '#fa5d48';
const PLUM_DARK = '#17131a';
const PLUM_LOGO = '#653683';
const PAPER_BG = '#fcfaf7';
const WHITE = '#ffffff';
const BORDER_LIGHT = '#e7e2dc';

// High-precision Icon Geometries (centered on 512x512)
const ICONS = {
  // 1. WhatsApp & Telefon Kombi (WhatsApp-Blase mit integriertem Telefon-Hörer)
  whatsapp_telefon: {
    name: 'WhatsApp & Telefon',
    shortDesc: 'Kombinierte WhatsApp-Sprechblase mit Telefonhörer für universelle Erreichbarkeit',
    render: (color) => `
      <!-- WhatsApp Bubble Base -->
      <path d="M 256 122 C 182 122 122 182 122 256 C 122 281.8 129.5 306.1 142.4 326.8 L 126 386 L 188.1 369.8 C 208.2 381.6 231.5 388.5 256 388.5 C 330 388.5 390 328.5 390 256 C 390 182 330 122 256 122 Z" 
            fill="none" stroke="${color}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Ergonomic Phone Receiver inside -->
      <path d="M 212 198 C 206 198 198 203 193 210 C 184 220 182 234 188 247 C 207 285 240 318 280 338 C 292 344 306 342 316 334 L 327 325 C 333 320 336 312 334 304 L 325 281 C 322 273 314 268 306 270 L 292 274 C 277 263 265 250 256 234 L 263 222 C 267 214 265 204 257 200 L 235 188 C 229 185 221 186 212 198 Z" 
            fill="${color}"/>
      <!-- Signal waves indicating incoming call/message -->
      <path d="M 324 186 C 336 198 336 218 324 230" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
      <path d="M 346 168 C 368 190 368 226 346 248" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
    `
  },

  // 2. WhatsApp Solo
  whatsapp: {
    name: 'WhatsApp (Solo)',
    shortDesc: 'Klassische WhatsApp-Sprechblase mit Hörer für direkten Chat-Fokus',
    render: (color) => `
      <!-- WhatsApp Bubble -->
      <path d="M 256 118 C 179.8 118 118 179.8 118 256 C 118 282.6 125.6 307.5 138.8 328.7 L 122 390 L 185.6 373.4 C 206.2 385.6 230.3 392.8 256 392.8 C 332.2 392.8 394 331 394 256 C 394 179.8 332.2 118 256 118 Z" 
            fill="none" stroke="${color}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Handset -->
      <path d="M 206 194 C 201 194 193 199 187 207 C 177 218 175 233 182 248 C 203 289 238 324 282 346 C 295 353 310 351 321 342 L 333 332 C 340 326 343 317 341 308 L 331 283 C 328 274 319 269 310 271 L 295 276 C 279 264 266 250 256 233 L 264 220 C 269 211 267 200 258 195 L 234 182 C 227 179 219 180 206 194 Z" 
            fill="${color}"/>
    `
  },

  // 3. Telefon Solo (Klassischer Hörer)
  phone: {
    name: 'Telefon (Hörer)',
    shortDesc: 'Eleganter Telefonhörer für direkte telefonische Kontaktaufnahme',
    render: (color) => `
      <!-- Solid Handset -->
      <g transform="translate(0, 0)">
        <path d="M 188 144 C 176 144 164 150 157 160 L 140 184 C 130 198 128 218 137 234 C 166 290 213 341 273 376 C 288 385 308 384 323 375 L 349 359 C 359 353 365 342 365 330 C 365 323 363 317 358 311 L 314 261 C 305 251 290 249 279 256 L 258 268 C 236 254 219 236 206 215 L 220 195 C 228 185 228 170 219 160 L 206 147 C 201 145 194 144 188 144 Z" 
              fill="${color}"/>
      </g>
    `
  },

  // 4. E-Mail
  email: {
    name: 'E-Mail',
    shortDesc: 'Moderner Briefumschlag mit sauberer Geometrie und Kontur',
    render: (color) => `
      <!-- Mail Envelope -->
      <g transform="translate(0, 0)">
        <!-- Envelope Body -->
        <rect x="114" y="152" width="284" height="208" rx="34" ry="34" 
              fill="none" stroke="${color}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Flap Fold -->
        <path d="M 122 170 L 238.4 260 C 248.8 268 263.2 268 273.6 260 L 390 170" 
              fill="none" stroke="${color}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Bottom Folds -->
        <path d="M 124 344 L 208 274" 
              fill="none" stroke="${color}" stroke-width="20" stroke-linecap="round"/>
        <path d="M 388 344 L 304 274" 
              fill="none" stroke="${color}" stroke-width="20" stroke-linecap="round"/>
      </g>
    `
  },

  // 5. Website / Globus
  website: {
    name: 'Website (Globus)',
    shortDesc: 'Eleganter Globus mit Längen- und Breitengraden für Webpräsenz',
    render: (color) => `
      <!-- Website Globe -->
      <g transform="translate(0, 0)">
        <!-- Outer Circle -->
        <circle cx="256" cy="256" r="136" fill="none" stroke="${color}" stroke-width="26"/>
        <!-- Equator -->
        <line x1="120" y1="256" x2="392" y2="256" stroke="${color}" stroke-width="24" stroke-linecap="round"/>
        <!-- Prime Meridian -->
        <line x1="256" y1="120" x2="256" y2="392" stroke="${color}" stroke-width="24" stroke-linecap="round"/>
        <!-- Latitude Top -->
        <path d="M 154 196 C 182 216 330 216 358 196" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round"/>
        <!-- Latitude Bottom -->
        <path d="M 154 316 C 182 296 330 296 358 316" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round"/>
        <!-- Longitude Oval -->
        <ellipse cx="256" cy="256" rx="68" ry="136" fill="none" stroke="${color}" stroke-width="24"/>
      </g>
    `
  },

  // 6. Standort / Adresse (Bonus)
  location: {
    name: 'Standort / Adresse',
    shortDesc: 'Eleganter Map-Pin für Adresse, Region Wesel & Niederrhein',
    render: (color) => `
      <!-- Location Pin -->
      <g transform="translate(0, 0)">
        <path d="M 256 122 C 196.4 122 148 170.4 148 230 C 148 305 240 380 251.2 388.8 C 254.1 391.1 257.9 391.1 260.8 388.8 C 272 380 364 305 364 230 C 364 170.4 315.6 122 256 122 Z" 
              fill="none" stroke="${color}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="256" cy="226" r="42" fill="${color}"/>
      </g>
    `
  }
};

// Style Presets
const STYLES = [
  {
    id: 'coral',
    label: 'Firmenflow Signature Coral',
    desc: 'Korallroter Brand-Button mit weißem Icon (maximaler Wiedererkennungswert, warme Haptik)',
    shape: 'squircle',
    iconColor: WHITE,
    bgSvg: `
      <defs>
        <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${CORAL_START}"/>
          <stop offset="100%" stop-color="${CORAL_END}"/>
        </linearGradient>
        <filter id="shadowCoral" x="-15%" y="-10%" width="130%" height="135%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="rgba(250, 93, 72, 0.32)"/>
        </filter>
      </defs>
      <rect x="52" y="52" width="408" height="408" rx="112" ry="112" 
            fill="url(#coralGrad)" filter="url(#shadowCoral)" />
      <!-- Subtle top inner highlight border -->
      <rect x="54" y="54" width="404" height="404" rx="110" ry="110" 
            fill="none" stroke="rgba(255, 255, 255, 0.28)" stroke-width="3"/>
    `
  },
  {
    id: 'white',
    label: 'Paper & Ceramic White',
    desc: 'Edle weiße Kachel mit feiner Kontur & Brand-Korall Icon (hebt sich sanft von #fcfaf7 ab)',
    shape: 'squircle',
    iconColor: CORAL_START,
    bgSvg: `
      <defs>
        <filter id="shadowWhite" x="-15%" y="-10%" width="130%" height="135%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="rgba(23, 19, 26, 0.08)"/>
        </filter>
      </defs>
      <rect x="52" y="52" width="408" height="408" rx="112" ry="112" 
            fill="${WHITE}" filter="url(#shadowWhite)" stroke="${BORDER_LIGHT}" stroke-width="4"/>
    `
  },
  {
    id: 'dark',
    label: 'Deep Plum & Ink Luxury',
    desc: 'Tiefviolettes Anthrazit mit warmweißem Icon (hoher Kontrast, extrem nobel)',
    shape: 'squircle',
    iconColor: WHITE,
    bgSvg: `
      <defs>
        <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#24192b"/>
          <stop offset="100%" stop-color="${PLUM_DARK}"/>
        </linearGradient>
        <filter id="shadowDark" x="-15%" y="-10%" width="130%" height="135%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="rgba(23, 19, 26, 0.25)"/>
        </filter>
      </defs>
      <rect x="52" y="52" width="408" height="408" rx="112" ry="112" 
            fill="url(#darkGrad)" filter="url(#shadowDark)" stroke="rgba(255,255,255,0.12)" stroke-width="3"/>
    `
  },
  {
    id: 'circle_coral',
    label: 'Signature Coral Circle',
    desc: 'Klassischer runder Button mit Korallverlauf und weißem Icon',
    shape: 'circle',
    iconColor: WHITE,
    bgSvg: `
      <defs>
        <linearGradient id="coralCircGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${CORAL_START}"/>
          <stop offset="100%" stop-color="${CORAL_END}"/>
        </linearGradient>
        <filter id="shadowCirc" x="-15%" y="-10%" width="130%" height="135%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="rgba(250, 93, 72, 0.32)"/>
        </filter>
      </defs>
      <circle cx="256" cy="256" r="198" fill="url(#coralCircGrad)" filter="url(#shadowCirc)"/>
      <circle cx="256" cy="256" r="196" fill="none" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
    `
  },
  {
    id: 'pure_coral',
    label: 'Pure Icon (Freigestellt Coral)',
    desc: 'Reines Vektor-Icon in Firmenflow-Korall ohne Box-Hintergrund für direkten Text-Satz',
    shape: 'pure',
    iconColor: CORAL_START,
    bgSvg: ``
  },
  {
    id: 'pure_ink',
    label: 'Pure Icon (Freigestellt Ink)',
    desc: 'Reines Vektor-Icon in Tiefanthrazit für maximalen Druckkontrast',
    shape: 'pure',
    iconColor: PLUM_DARK,
    bgSvg: ``
  }
];

async function run() {
  console.log('🚀 Starte Erstellung der erweiterten Visitenkarten-Grafiken...');

  const manifest = [];

  for (const style of STYLES) {
    for (const [iconKey, iconObj] of Object.entries(ICONS)) {
      const fileBase = `button-${iconKey}-${style.id}`;
      const svgPath = path.join(SVG_DIR, `${fileBase}.svg`);
      const png2048Path = path.join(PNG_2048_DIR, `${fileBase}.png`);
      const png1024Path = path.join(PNG_1024_DIR, `${fileBase}.png`);

      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Style: ${style.label} | Icon: ${iconObj.name} -->
  ${style.bgSvg}
  ${iconObj.render(style.iconColor)}
</svg>`;

      fs.writeFileSync(svgPath, svgContent, 'utf-8');

      // Convert to 2048x2048 PNG (Ultra-High-Res for 600+ DPI Print)
      const svgBuffer = Buffer.from(svgContent);
      await sharp(svgBuffer, { density: 600 })
        .resize(2048, 2048, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toFile(png2048Path);

      // Convert to 1024x1024 PNG (Compact High-Res)
      await sharp(svgBuffer, { density: 300 })
        .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toFile(png1024Path);

      manifest.push({
        iconKey,
        iconName: iconObj.name,
        shortDesc: iconObj.shortDesc,
        styleId: style.id,
        styleLabel: style.label,
        styleDesc: style.desc,
        fileBase,
        svgRel: `svg/${fileBase}.svg`,
        png2048Rel: `png-2048/${fileBase}.png`,
        png1024Rel: `png-1024/${fileBase}.png`,
        filesize2048: (fs.statSync(png2048Path).size / 1024).toFixed(1) + ' KB'
      });
    }
  }

  console.log(`✅ Insgesamt ${manifest.length} Icon-Variationen (SVG + 2048px PNG + 1024px PNG) erfolgreich generiert!`);

  // Build ZIP Archive of all assets for 1-click download
  createZipArchive();

  // Build HTML Preview
  generatePreviewHtml(manifest);
}

function createZipArchive() {
  try {
    const zipPath = path.join(OUT_DIR, 'firmenflow-visitenkarten-buttons.zip');
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

    // Use PowerShell Compress-Archive
    const cmd = `powershell -Command "Compress-Archive -Path '${SVG_DIR}', '${PNG_2048_DIR}', '${PNG_1024_DIR}' -DestinationPath '${zipPath}' -Force"`;
    execSync(cmd);
    console.log(`📦 Komplettes ZIP-Paket erstellt: ${zipPath}`);
  } catch (err) {
    console.warn('⚠️ ZIP-Erstellung fehlgeschlagen (optional):', err.message);
  }
}

function generatePreviewHtml(manifest) {
  const previewPath = path.join(OUT_DIR, 'preview.html');

  // Group by style
  const byStyle = {};
  for (const item of manifest) {
    if (!byStyle[item.styleId]) byStyle[item.styleId] = [];
    byStyle[item.styleId].push(item);
  }

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Firmenflow Visitenkarten Button-Kollektion (Print-Ready)</title>
  <style>
    @font-face {
      font-family: 'Atmosphere Grotesk';
      src: url('../../fonts/atmosphere/AtmosphereGrotesk-Bold.otf') format('opentype');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'Atmosphere Grotesk';
      src: url('../../fonts/atmosphere/AtmosphereGrotesk-Regular.otf') format('opentype');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Switzer';
      src: url('../../fonts/switzer/Switzer-Variable.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
    }

    :root {
      --paper: #fcfaf7;
      --ink: #17131a;
      --muted: #746d76;
      --coral: #ff705d;
      --coral-hover: #fa5d48;
      --border: #e7e2dc;
      --plum: #653683;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--paper);
      color: var(--ink);
      font-family: 'Switzer', -apple-system, sans-serif;
      padding: 40px 24px 100px;
      line-height: 1.5;
    }

    .container {
      max-width: 1240px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 45px;
      padding-bottom: 25px;
      border-bottom: 1px solid var(--border);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 112, 93, 0.1);
      border: 1px solid rgba(255, 112, 93, 0.25);
      color: var(--coral);
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    h1 {
      font-family: 'Atmosphere Grotesk', sans-serif;
      font-size: 38px;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
      color: var(--ink);
    }
    .subline {
      color: var(--muted);
      font-size: 17px;
      max-width: 720px;
      margin: 0 auto 20px;
    }

    .top-cta-bar {
      display: flex;
      justify-content: center;
      gap: 14px;
      margin-top: 15px;
      flex-wrap: wrap;
    }
    .zip-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--ink);
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(23, 19, 26, 0.18);
      transition: all 0.2s ease;
    }
    .zip-btn:hover {
      background: var(--coral);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(255, 112, 93, 0.28);
    }

    /* Live Business Card Mockup Section */
    .mockup-section {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 36px;
      margin-bottom: 60px;
      box-shadow: 0 10px 30px -10px rgba(23, 19, 26, 0.05);
    }
    .mockup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .mockup-header h2 {
      font-size: 21px;
      font-weight: 700;
    }
    .mockup-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 26px;
    }
    .card-preview {
      background: #fcfaf7;
      border: 1px solid #e7e2dc;
      border-radius: 20px;
      padding: 32px 26px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.06);
      position: relative;
    }
    .card-preview .card-label {
      position: absolute;
      top: 14px;
      right: 18px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--muted);
    }
    .card-name {
      font-family: 'Atmosphere Grotesk', sans-serif;
      font-size: 26px;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }
    .card-role {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 28px;
      font-weight: 500;
    }
    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .contact-item img {
      width: 44px;
      height: 44px;
      object-fit: contain;
      flex-shrink: 0;
    }
    .contact-text {
      display: flex;
      flex-direction: column;
    }
    .contact-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 700;
      color: var(--muted);
      margin-bottom: 2px;
    }
    .contact-val {
      font-family: 'Atmosphere Grotesk', sans-serif;
      font-size: 17px;
      color: var(--ink);
      letter-spacing: -0.01em;
      white-space: nowrap;
    }

    /* Style Section */
    .style-block {
      margin-bottom: 50px;
    }
    .style-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .style-desc {
      color: var(--muted);
      font-size: 14px;
      margin-bottom: 20px;
    }
    .assets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 20px;
    }
    .asset-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .asset-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0,0,0,0.06);
    }
    .asset-canvas {
      width: 100%;
      height: 150px;
      background: #fcfaf7;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      border: 1px dashed rgba(231, 226, 220, 0.8);
      position: relative;
    }
    .asset-canvas img {
      width: 90px;
      height: 90px;
      object-fit: contain;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.06));
    }
    .asset-name {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 4px;
    }
    .asset-meta {
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 16px;
    }
    .download-btns {
      display: flex;
      gap: 8px;
      width: 100%;
    }
    .btn {
      flex: 1;
      padding: 8px 10px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .btn-svg {
      background: #fcfaf7;
      border: 1px solid var(--border);
      color: var(--ink);
    }
    .btn-svg:hover {
      background: #f5f0eb;
      border-color: var(--ink);
    }
    .btn-png {
      background: var(--coral);
      color: #ffffff;
      border: 1px solid var(--coral);
    }
    .btn-png:hover {
      background: var(--coral-hover);
    }

    .footer-note {
      text-align: center;
      margin-top: 60px;
      padding: 30px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 14px;
    }
    .pill-badge {
      display: inline-block;
      font-size: 10px;
      background: rgba(101, 54, 131, 0.1);
      color: var(--plum);
      padding: 2px 8px;
      border-radius: 6px;
      margin-left: 6px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">✨ Firmenflow Print Assets • Visitenkarten-Edition</div>
      <h1>Buttons für deine Visitenkarten</h1>
      <p class="subline">
        Exakt optimiert für den Firmenflow-Papierhintergrund <strong>#fcfaf7</strong> und typografisch abgestimmt auf 
        <strong>Atmosphäre Grotesk</strong>. Verfügbar als verlustfreie Vektoren (SVG) und ultra-scharfe 2048 × 2048 Pixel PNGs (600 DPI Druckauflösung).
      </p>
      <div class="top-cta-bar">
        <a href="firmenflow-visitenkarten-buttons.zip" download class="zip-btn">
          📦 Alle Buttons als ZIP herunterladen (SVG + 2048px PNG)
        </a>
      </div>
    </header>

    <!-- LIVE MOCKUP SHOWCASE ON #fcfaf7 -->
    <section class="mockup-section">
      <div class="mockup-header">
        <div>
          <h2>Echtzeit-Vorschau: Visitenkarten auf Hintergrund #fcfaf7</h2>
          <p style="font-size: 13px; color: var(--muted);">So wirken die 3 Buttons mit deiner Schriftart <em>Atmosphäre Grotesk</em> im realen Druckformat</p>
        </div>
        <span class="pill-badge">Hintergrund: #FCFAF7</span>
      </div>

      <div class="mockup-grid">
        <!-- Card 1: Signature Coral Buttons -->
        <div class="card-preview">
          <div class="card-label">Variante A • Signature Coral</div>
          <div class="card-name">Manuel Landeck</div>
          <div class="card-role">Inhaber Firmenflow • Persönlich mit Manu</div>
          <div class="contact-list">
            <div class="contact-item">
              <img src="svg/button-whatsapp_telefon-coral.svg" alt="WhatsApp / Telefon">
              <div class="contact-text">
                <span class="contact-label">WhatsApp & Anruf</span>
                <span class="contact-val">+49 155 67277155</span>
              </div>
            </div>
            <div class="contact-item">
              <img src="svg/button-email-coral.svg" alt="E-Mail">
              <div class="contact-text">
                <span class="contact-label">E-Mail</span>
                <span class="contact-val">manu@firmenflow.de</span>
              </div>
            </div>
            <div class="contact-item">
              <img src="svg/button-website-coral.svg" alt="Website">
              <div class="contact-text">
                <span class="contact-label">Website</span>
                <span class="contact-val">firmenflow.de</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: White Ceramic Buttons -->
        <div class="card-preview">
          <div class="card-label">Variante B • White Ceramic</div>
          <div class="card-name">Manuel Landeck</div>
          <div class="card-role">Inhaber Firmenflow • Persönlich mit Manu</div>
          <div class="contact-list">
            <div class="contact-item">
              <img src="svg/button-whatsapp_telefon-white.svg" alt="WhatsApp / Telefon">
              <div class="contact-text">
                <span class="contact-label">WhatsApp & Anruf</span>
                <span class="contact-val">+49 155 67277155</span>
              </div>
            </div>
            <div class="contact-item">
              <img src="svg/button-email-white.svg" alt="E-Mail">
              <div class="contact-text">
                <span class="contact-label">E-Mail</span>
                <span class="contact-val">manu@firmenflow.de</span>
              </div>
            </div>
            <div class="contact-item">
              <img src="svg/button-website-white.svg" alt="Website">
              <div class="contact-text">
                <span class="contact-label">Website</span>
                <span class="contact-val">firmenflow.de</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3: Deep Plum Luxury Buttons -->
        <div class="card-preview">
          <div class="card-label">Variante C • Deep Plum & Ink</div>
          <div class="card-name">Manuel Landeck</div>
          <div class="card-role">Inhaber Firmenflow • Persönlich mit Manu</div>
          <div class="contact-list">
            <div class="contact-item">
              <img src="svg/button-whatsapp_telefon-dark.svg" alt="WhatsApp / Telefon">
              <div class="contact-text">
                <span class="contact-label">WhatsApp & Anruf</span>
                <span class="contact-val">+49 155 67277155</span>
              </div>
            </div>
            <div class="contact-item">
              <img src="svg/button-email-dark.svg" alt="E-Mail">
              <div class="contact-text">
                <span class="contact-label">E-Mail</span>
                <span class="contact-val">manu@firmenflow.de</span>
              </div>
            </div>
            <div class="contact-item">
              <img src="svg/button-website-dark.svg" alt="Website">
              <div class="contact-text">
                <span class="contact-label">Website</span>
                <span class="contact-val">firmenflow.de</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ASSET DOWNLOAD SECTIONS BY STYLE -->
    ${STYLES.map(style => {
      const items = byStyle[style.id] || [];
      return `
      <div class="style-block">
        <h3 class="style-title">${style.label}</h3>
        <p class="style-desc">${style.desc}</p>
        <div class="assets-grid">
          ${items.map(item => `
            <div class="asset-card">
              <div class="asset-canvas">
                <img src="${item.svgRel}" alt="${item.iconName}">
              </div>
              <div class="asset-name">${item.iconName}</div>
              <div class="asset-meta" style="font-size: 11px; color: var(--muted); margin-bottom: 4px;">${item.shortDesc}</div>
              <div class="asset-meta">2048 × 2048 px (${item.filesize2048})</div>
              <div class="download-btns">
                <a href="${item.svgRel}" download class="btn btn-svg">SVG (Vektor)</a>
                <a href="${item.png2048Rel}" download class="btn btn-png">PNG (2048px)</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      `;
    }).join('')}

    <div class="footer-note">
      <p>💡 <strong>Druck-Tipp:</strong> Für professionellen Druck (InDesign, Illustrator, Affinity Designer, Flyeralarm, Online-Druckereien) empfiehlt sich direkt die <strong>SVG-Vektordatei</strong> (100% randscharf ohne Pixel). Falls dein Druck- oder Layout-Tool Pixelbilder verlangt, nimm die <strong>2048 × 2048 px PNG</strong> mit transparentem Hintergrund.</p>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(previewPath, html, 'utf-8');
  console.log(`✅ Interaktive Vorschau- & Download-Seite erstellt: ${previewPath}`);
}

run().catch(console.error);
