const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public', 'brand');
const brainDir = 'C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265';

async function createBrandAurora() {
  const svg = `
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="baseGrad" cx="50%" cy="45%" r="75%">
        <stop offset="0%" stop-color="#1e1327" />
        <stop offset="45%" stop-color="#130b1a" />
        <stop offset="100%" stop-color="#09050c" />
      </radialGradient>

      <!-- Corner Glows -->
      <radialGradient id="coralTopLeft" cx="12%" cy="18%" r="48%">
        <stop offset="0%" stop-color="#ff705d" stop-opacity="0.38" />
        <stop offset="50%" stop-color="#fa5d48" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#fa5d48" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="plumTopRight" cx="88%" cy="16%" r="52%">
        <stop offset="0%" stop-color="#8a44b3" stop-opacity="0.48" />
        <stop offset="55%" stop-color="#653683" stop-opacity="0.14" />
        <stop offset="100%" stop-color="#653683" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="coralBottomRight" cx="92%" cy="84%" r="48%">
        <stop offset="0%" stop-color="#ff705d" stop-opacity="0.35" />
        <stop offset="55%" stop-color="#ff705d" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#ff705d" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="plumBottomLeft" cx="8%" cy="84%" r="52%">
        <stop offset="0%" stop-color="#653683" stop-opacity="0.45" />
        <stop offset="55%" stop-color="#3b1452" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#3b1452" stop-opacity="0" />
      </radialGradient>

      <!-- Flowing Curves -->
      <linearGradient id="stroke1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff705d" stop-opacity="0.3" />
        <stop offset="50%" stop-color="#8a44b3" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#ff705d" stop-opacity="0.05" />
      </linearGradient>

      <linearGradient id="stroke2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#653683" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#ff705d" stop-opacity="0.1" />
      </linearGradient>
    </defs>

    <rect width="1920" height="1080" fill="url(#baseGrad)" />

    <rect width="1920" height="1080" fill="url(#coralTopLeft)" />
    <rect width="1920" height="1080" fill="url(#plumTopRight)" />
    <rect width="1920" height="1080" fill="url(#coralBottomRight)" />
    <rect width="1920" height="1080" fill="url(#plumBottomLeft)" />

    <!-- Organic wave lines framing the perimeter -->
    <path d="M -120 180 C 260 80, 380 420, 120 780 C -40 960, 180 1140, 380 1140" fill="none" stroke="url(#stroke1)" stroke-width="2" />
    <path d="M -70 230 C 290 140, 400 460, 160 810 C 0 980, 210 1160, 410 1160" fill="none" stroke="url(#stroke1)" stroke-width="1.2" stroke-dasharray="6 8" opacity="0.6" />

    <path d="M 2040 180 C 1660 100, 1540 460, 1800 820 C 1960 1000, 1740 1140, 1540 1140" fill="none" stroke="url(#stroke2)" stroke-width="2" />
    <path d="M 1990 230 C 1630 150, 1510 500, 1760 850 C 1920 1020, 1700 1160, 1500 1160" fill="none" stroke="url(#stroke2)" stroke-width="1.2" stroke-dasharray="8 10" opacity="0.6" />

    <!-- Fine branding accents in corners -->
    <g opacity="0.25">
      <circle cx="100" cy="100" r="2" fill="#ff705d" />
      <circle cx="140" cy="100" r="2" fill="#ff705d" />
      <circle cx="180" cy="100" r="2" fill="#ff705d" />
      <circle cx="100" cy="140" r="2" fill="#ff705d" />
      <circle cx="140" cy="140" r="2" fill="#ff705d" />
      <circle cx="180" cy="140" r="2" fill="#ff705d" />

      <circle cx="1740" cy="100" r="2" fill="#8a44b3" />
      <circle cx="1780" cy="100" r="2" fill="#8a44b3" />
      <circle cx="1820" cy="100" r="2" fill="#8a44b3" />
      <circle cx="1740" cy="140" r="2" fill="#8a44b3" />
      <circle cx="1780" cy="140" r="2" fill="#8a44b3" />
      <circle cx="1820" cy="140" r="2" fill="#8a44b3" />
    </g>
  </svg>
  `;

  const outputPath = path.join(publicDir, 'firmenflow-meetergo-bg-brand-aurora.jpg');
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 95 })
    .toFile(outputPath);
  
  fs.copyFileSync(outputPath, path.join(brainDir, 'firmenflow-meetergo-bg-brand-aurora.jpg'));
  console.log('Brand Aurora generated!');
}

function copyFilesToBrain() {
  const files = [
    'firmenflow-meetergo-bg-glass-flow.jpg',
    'firmenflow-meetergo-bg-desk-studio.jpg',
    'firmenflow-meetergo-bg-creative-loft.jpg'
  ];
  files.forEach(f => {
    fs.copyFileSync(path.join(publicDir, f), path.join(brainDir, f));
  });
  console.log('Copied all upscaled images to brain directory!');
}

async function run() {
  await createBrandAurora();
  copyFilesToBrain();
}

run();
