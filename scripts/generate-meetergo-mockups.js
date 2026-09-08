const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public', 'brand');
const brainDir = 'C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265';

// Logo as base64
const logoPath = path.join(publicDir, 'firmenflow-wordmark-slogan.png');
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
  logoBase64 = fs.readFileSync(logoPath).toString('base64');
}

// SVG overlay that reproduces the Meetergo Connect waiting room UI
function getMeetergoOverlaySvg() {
  return `
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <!-- Top Brand Logo -->
    <g transform="translate(960, 130)">
      ${logoBase64 ? `<image href="data:image/png;base64,${logoBase64}" x="-130" y="-35" width="260" height="70" preserveAspectRatio="xMidYMid meet" />` : ''}
    </g>

    <!-- Greeting Text -->
    <text x="960" y="225" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" filter="drop-shadow(0px 2px 8px rgba(0,0,0,0.7))">
      Hi, gleich gehts los! 🟣
    </text>

    <!-- Center Video Card Container (approx 520 x 580) -->
    <g transform="translate(700, 270)">
      <!-- Main Camera Box -->
      <rect width="520" height="420" rx="24" fill="#141a24" filter="drop-shadow(0px 20px 40px rgba(0,0,0,0.65))" />
      
      <!-- Avatar Circle -->
      <circle cx="260" cy="180" r="44" fill="#253041" />
      <!-- User Icon inside avatar -->
      <path d="M 260 162 A 14 14 0 1 0 260 190 A 14 14 0 1 0 260 162 Z M 240 208 C 240 198, 250 194, 260 194 C 270 194, 280 198, 280 208 Z" fill="#7d8ea5" />

      <text x="260" y="248" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1">
        Kamera aus
      </text>

      <!-- Mic & Cam Control Pills -->
      <circle cx="230" cy="350" r="22" fill="#2a3547" />
      <!-- Mic symbol -->
      <path d="M 226 342 C 226 340, 228 338, 230 338 C 232 338, 234 340, 234 342 L 234 350 C 234 352, 232 354, 230 354 C 228 354, 226 352, 226 350 Z" fill="#ffffff" />
      
      <circle cx="290" cy="350" r="22" fill="#2a3547" />
      <!-- Cam symbol -->
      <rect x="281" y="344" width="14" height="12" rx="2" fill="#ffffff" />
      <polygon points="296,346 302,342 302,358 296,354" fill="#ffffff" />

      <!-- White Input & CTA Sub-Card -->
      <rect x="0" y="420" width="520" height="150" rx="0 0 24 24" fill="#ffffff" filter="drop-shadow(0px 10px 25px rgba(0,0,0,0.4))" />
      
      <!-- Name Input Field Placeholder -->
      <text x="35" y="460" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" fill="#94a3b8">
        Name
      </text>

      <!-- Coral Teilnehmen Button -->
      <rect x="24" y="485" width="472" height="54" rx="14" fill="#fc583e" filter="drop-shadow(0px 4px 12px rgba(252,88,62,0.35))" />
      <text x="260" y="519" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="16" font-weight="bold" fill="#ffffff">
        Teilnehmen
      </text>
    </g>

    <!-- Bottom Badge "erstellt mit meetergo" -->
    <g transform="translate(860, 890)">
      <rect width="200" height="40" rx="20" fill="rgba(20,25,35,0.85)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
      <text x="50" y="25" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="500" fill="#94a3b8">
        erstellt mit
      </text>
      <!-- meetergo icon & name -->
      <circle cx="128" cy="20" r="7" fill="none" stroke="#f59e0b" stroke-width="3" />
      <text x="142" y="25" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">
        meetergo
      </text>
    </g>
  </svg>
  `;
}

async function generateMockups() {
  const overlayBuffer = Buffer.from(getMeetergoOverlaySvg());

  const bgs = [
    { name: 'mockup-preview-glass-flow.jpg', bg: 'firmenflow-meetergo-bg-glass-flow.jpg' },
    { name: 'mockup-preview-desk-studio.jpg', bg: 'firmenflow-meetergo-bg-desk-studio.jpg' },
    { name: 'mockup-preview-brand-aurora.jpg', bg: 'firmenflow-meetergo-bg-brand-aurora.jpg' },
    { name: 'mockup-preview-creative-loft.jpg', bg: 'firmenflow-meetergo-bg-creative-loft.jpg' }
  ];

  for (const item of bgs) {
    const bgPath = path.join(publicDir, item.bg);
    if (!fs.existsSync(bgPath)) continue;

    const outPath = path.join(brainDir, item.name);
    await sharp(bgPath)
      .composite([{ input: overlayBuffer, blend: 'over' }])
      .jpeg({ quality: 92 })
      .toFile(outPath);

    console.log(`Created mockup: ${item.name}`);
  }
}

generateMockups();
