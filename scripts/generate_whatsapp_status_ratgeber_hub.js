const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Image paths
const WEBSITE_IMG_PATH = 'D:/KI Projekte/01_Marke_und_Websites/Antigravity Firmenflow Website/firmenflow-website/public/images/ratgeber/website-fehler-lokale-betriebe.jpg';
const MAPS_IMG_PATH = 'D:/KI Projekte/01_Marke_und_Websites/Antigravity Firmenflow Website/firmenflow-website/public/images/ratgeber/google-maps-nicht-gefunden.jpg';
const MANU_PORTRAIT_PATH = 'D:/KI Projekte/01_Marke_und_Websites/Pitches/Kruemelranch Alpen/manuel_portrait.jpg';
const APP_ICON_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/firmenflow-app-icon-3d.webp';

const ICON_THEMEN_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/01_Prozess_und_Website/01-neue-website.webp';
const ICON_VERSTAENDLICH_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/04_Lokalpraesenz_360/07-handlungsempfehlung.webp';
const ICON_QUIZ_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/03_Kontakt_und_Aktion/08-faq.webp';

function toBase64(filePath, mimeType) {
  const fileData = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${fileData.toString('base64')}`;
}

const websiteImgBase64 = toBase64(WEBSITE_IMG_PATH, 'image/jpeg');
const mapsImgBase64 = toBase64(MAPS_IMG_PATH, 'image/jpeg');
const manuPortraitBase64 = toBase64(MANU_PORTRAIT_PATH, 'image/jpeg');
const appIconBase64 = toBase64(APP_ICON_PATH, 'image/webp');
const iconThemenBase64 = toBase64(ICON_THEMEN_PATH, 'image/webp');
const iconVerstaendlichBase64 = toBase64(ICON_VERSTAENDLICH_PATH, 'image/webp');
const iconQuizBase64 = toBase64(ICON_QUIZ_PATH, 'image/webp');

const htmlContent = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Firmenflow WhatsApp Status - Neuer Ratgeber Übersicht</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1080px;
      height: 1920px;
      background-color: #FCFAF7;
      background-image: 
        radial-gradient(circle at 18% 12%, rgba(255, 112, 93, 0.09) 0%, transparent 42%),
        radial-gradient(circle at 82% 38%, rgba(101, 54, 131, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 50% 88%, rgba(72, 35, 97, 0.06) 0%, transparent 52%);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #17131A;
      overflow: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient paper texture grid subtle */
    .bg-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: 36px 36px;
      background-image: radial-gradient(rgba(101, 54, 131, 0.045) 1.5px, transparent 1.5px);
      pointer-events: none;
      z-index: 1;
    }

    /* Status Container with precise safe zones */
    .status-container {
      width: 1080px;
      height: 1920px;
      padding: 150px 64px 170px 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 10;
    }

    /* 1. Header Bar */
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 84px;
    }

    .author-pill {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border: 1.5px solid #E7E2DC;
      border-radius: 999px;
      padding: 8px 24px 8px 8px;
      box-shadow: 0 6px 20px rgba(72, 35, 97, 0.06);
    }

    .author-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
      border: 2px solid #FFFFFF;
      box-shadow: 0 3px 10px rgba(72, 35, 97, 0.18);
    }

    .author-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .author-name {
      font-size: 24px;
      font-weight: 700;
      color: #17131A;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .author-meta {
      font-size: 18px;
      font-weight: 600;
      color: #653683;
      letter-spacing: -0.01em;
    }

    .badge-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border: 1.5px solid #E7E2DC;
      border-radius: 999px;
      padding: 12px 24px;
      box-shadow: 0 6px 20px rgba(72, 35, 97, 0.06);
    }

    .app-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      object-fit: contain;
    }

    .badge-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #653683;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .badge-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #FF705D;
      box-shadow: 0 0 10px #FF705D;
    }

    /* 2. Headline & Hook */
    .hero-text-block {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .kicker-pill {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 112, 93, 0.12);
      border: 1.5px solid rgba(255, 112, 93, 0.32);
      border-radius: 999px;
      padding: 9px 20px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #D34330;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 56px;
      font-weight: 800;
      line-height: 1.14;
      color: #17131A;
      letter-spacing: -0.035em;
    }

    .headline-highlight {
      background: linear-gradient(135deg, #653683 0%, #482361 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subline {
      font-size: 27px;
      font-weight: 500;
      line-height: 1.38;
      color: #58505C;
      letter-spacing: -0.015em;
    }

    .subline strong {
      color: #17131A;
      font-weight: 700;
    }

    /* 3. Centerpiece Showcase Visual (Dual Category Showcase) */
    .showcase-wrapper {
      width: 952px;
      height: 520px;
      display: flex;
      gap: 18px;
      position: relative;
    }

    .category-card {
      flex: 1;
      height: 100%;
      border-radius: 28px;
      background: linear-gradient(145deg, #FFFFFF 0%, #F6F2EC 100%);
      border: 2px solid #EAE5DF;
      box-shadow: 
        0 24px 50px -12px rgba(72, 35, 97, 0.14),
        0 8px 20px rgba(255, 112, 93, 0.08);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 26px;
    }

    .category-badge-top {
      position: absolute;
      top: 18px;
      left: 18px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid #E7E2DC;
      border-radius: 999px;
      padding: 8px 18px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #17131A;
      box-shadow: 0 4px 14px rgba(72, 35, 97, 0.1);
      letter-spacing: 0.02em;
    }

    .category-badge-bottom {
      position: absolute;
      bottom: 18px;
      left: 18px;
      right: 18px;
      background: rgba(72, 35, 97, 0.94);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 10px 16px;
      text-align: center;
      font-size: 19px;
      font-weight: 700;
      color: #FFFFFF;
      box-shadow: 0 8px 20px rgba(72, 35, 97, 0.25);
    }

    /* Floating Center Pill for the 2 Quizzes */
    .showcase-center-pill {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #FF705D 0%, #FA5D48 100%);
      color: #FFFFFF;
      border: 2.5px solid #FFFFFF;
      border-radius: 999px;
      padding: 14px 28px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 21px;
      font-weight: 800;
      box-shadow: 
        0 14px 32px rgba(255, 112, 93, 0.45),
        0 4px 12px rgba(72, 35, 97, 0.2);
      white-space: nowrap;
      z-index: 5;
    }

    /* 4. Three Core Points */
    .points-stack {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .point-card {
      display: flex;
      align-items: center;
      gap: 22px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid #E7E2DC;
      border-radius: 22px;
      padding: 18px 26px;
      box-shadow: 0 5px 18px rgba(72, 35, 97, 0.05);
    }

    .point-icon-box {
      width: 70px;
      height: 70px;
      border-radius: 18px;
      background: #F7F4EE;
      border: 1.5px solid #EAE5DF;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 6px;
    }

    .point-icon-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 3px 6px rgba(72, 35, 97, 0.18));
    }

    .point-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .point-title {
      font-size: 27px;
      font-weight: 700;
      color: #17131A;
      letter-spacing: -0.02em;
    }

    .point-text {
      font-size: 22px;
      font-weight: 500;
      color: #6E6872;
      line-height: 1.32;
      letter-spacing: -0.01em;
    }

    .point-tag {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 7px 16px;
      border-radius: 999px;
      white-space: nowrap;
    }

    .tag-coral {
      background: rgba(255, 112, 93, 0.12);
      color: #D34330;
      border: 1px solid rgba(255, 112, 93, 0.28);
    }

    .tag-plum {
      background: rgba(101, 54, 131, 0.12);
      color: #653683;
      border: 1px solid rgba(101, 54, 131, 0.24);
    }

    /* 5. CTA Box */
    .cta-card {
      width: 100%;
      height: 150px;
      border-radius: 26px;
      background: linear-gradient(135deg, #482361 0%, #5B2F75 60%, #431E5B 100%);
      border: 2px solid rgba(255, 112, 93, 0.4);
      box-shadow: 
        0 18px 40px rgba(72, 35, 97, 0.35),
        0 6px 16px rgba(255, 112, 93, 0.25);
      padding: 0 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    .cta-left {
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 2;
    }

    .cta-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #FF9B8E;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .cta-url {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .cta-url span {
      color: #FF705D;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #FF705D 0%, #FA5D48 100%);
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 26px;
      font-weight: 700;
      padding: 19px 34px;
      border-radius: 18px;
      box-shadow: 0 8px 24px rgba(255, 112, 93, 0.5);
      letter-spacing: -0.01em;
      border: 1px solid rgba(255, 255, 255, 0.3);
      z-index: 2;
    }

    .cta-button-arrow {
      font-size: 28px;
      line-height: 1;
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>

  <div class="status-container">
    <!-- 1. Header Bar -->
    <div class="header-bar">
      <div class="author-pill">
        <img src="${manuPortraitBase64}" alt="Manuel Landeck" class="author-avatar">
        <div class="author-info">
          <span class="author-name">Manuel Landeck</span>
          <span class="author-meta">Persönlich mit Manu &bull; Firmenflow</span>
        </div>
      </div>

      <div class="badge-pill">
        <img src="${appIconBase64}" alt="Firmenflow" class="app-icon">
        <span class="badge-text">Ratgeber</span>
        <span class="badge-dot"></span>
      </div>
    </div>

    <!-- 2. Headline & Hook (Allgemein auf Ratgeber ausgerichtet) -->
    <div class="hero-text-block">
      <div class="kicker-pill">
        <span>💡 NEU ONLINE &bull; FIRMENFLOW RATGEBER</span>
      </div>
      <h1 class="headline">
        Echte Praxistipps für deinen<br><span class="headline-highlight">Betrieb vor Ort.</span>
      </h1>
      <p class="subline">
        Kein Fachchinesisch, sondern konkrete Anleitungen für deine <strong>Website</strong>, dein <strong>Google-Profil</strong> und neue Kunden aus deiner Region.
      </p>
    </div>

    <!-- 3. Centerpiece Showcase Visual (Beide Kategorien + Quiz Badge) -->
    <div class="showcase-wrapper">
      <!-- Karte Links: Website & Auftritt -->
      <div class="category-card">
        <img src="${websiteImgBase64}" alt="Kategorie Website" class="category-image">
        <div class="category-badge-top">
          <span>🌐 Website &amp; Tempo</span>
        </div>
        <div class="category-badge-bottom">
          <span>Fehler vermeiden &amp; Kunden gewinnen</span>
        </div>
      </div>

      <!-- Karte Rechts: Lokale Sichtbarkeit & Google Maps -->
      <div class="category-card">
        <img src="${mapsImgBase64}" alt="Kategorie Google Maps" class="category-image">
        <div class="category-badge-top">
          <span>📍 Google Maps &amp; Profil</span>
        </div>
        <div class="category-badge-bottom">
          <span>Vor Ort endlich gefunden werden</span>
        </div>
      </div>

      <!-- Schwebender Mittel-Badge fuer die 2 interaktiven Quiz-Arten -->
      <div class="showcase-center-pill">
        <span>🎯 Inkl. 2 Quiz-Arten je Beitrag</span>
      </div>
    </div>

    <!-- 4. Three Core Points (Klar, menschlich, verstaendlich, ohne KI-Geschwurbel) -->
    <div class="points-stack">
      <!-- Punkt 1: Themenvielfalt -->
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconThemenBase64}" alt="Themenvielfalt">
        </div>
        <div class="point-body">
          <span class="point-title">1. Verschiedene Kategorien</span>
          <span class="point-text">Von moderner Website über Google Maps bis hin zu Bewertungen &amp; Azubis.</span>
        </div>
        <div class="point-tag tag-plum">Kategorien</div>
      </div>

      <!-- Punkt 2: Ohne Fachchinesisch -->
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconVerstaendlichBase64}" alt="Verstaendlich">
        </div>
        <div class="point-body">
          <span class="point-title">2. Ohne Fachbegriffe erklärt</span>
          <span class="point-text">Praktische Checklisten &amp; Tipps, die du sofort selbst anwenden kannst.</span>
        </div>
        <div class="point-tag tag-coral">Praxisnah</div>
      </div>

      <!-- Punkt 3: Die 2 interaktiven Quizzes -->
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconQuizBase64}" alt="Interaktive Quizzes">
        </div>
        <div class="point-body">
          <span class="point-title">3. Zwei interaktive Quizzes je Beitrag</span>
          <span class="point-text">Wähle zwischen schnellem 5-Fragen-Kompakt-Check und 10-Fragen-Meister-Check.</span>
        </div>
        <div class="point-tag tag-plum">Zum Mitmachen</div>
      </div>
    </div>

    <!-- 5. CTA Box -->
    <div class="cta-card">
      <div class="cta-left">
        <div class="cta-eyebrow">
          <span>🔥 JETZT KOSTENLOS ENTDECKEN</span>
        </div>
        <div class="cta-url">
          firmenflow.de/<span>ratgeber</span>
        </div>
      </div>
      <div class="cta-button">
        <span>Ratgeber öffnen</span>
        <span class="cta-button-arrow">&rarr;</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const HTML_HUB_PATH = path.join(__dirname, 'whatsapp_status_ratgeber_hub.html');
fs.writeFileSync(HTML_HUB_PATH, htmlContent, 'utf-8');
console.log('✅ HTML hub file written:', HTML_HUB_PATH);

(async () => {
  console.log('🚀 Rendering general WhatsApp Status graphic with Playwright...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const OUT_DIR_BRAND = 'D:/KI Projekte/01_Marke_und_Websites/Antigravity Firmenflow Website/firmenflow-website/public/brand/whatsapp';
  const OUT_DIR_BRAIN = 'C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265';

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });

  await page.goto('file:///' + HTML_HUB_PATH.replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Output as the primary 01_Status graphic
  const outJpg1 = path.join(OUT_DIR_BRAND, '01_Status_Ratgeber_Uebersicht_1080x1920.jpg');
  const outPng1 = path.join(OUT_DIR_BRAND, '01_Status_Ratgeber_Uebersicht_1080x1920.png');
  const outJpg1Brain = path.join(OUT_DIR_BRAIN, '01_Status_Ratgeber_Uebersicht_1080x1920.jpg');

  // Also replace 01_Status_Ratgeber_Google_Maps_1080x1920.jpg if user considers this the 1st graphic of the series
  await page.screenshot({ path: outJpg1, type: 'jpeg', quality: 95 });
  await page.screenshot({ path: outPng1, type: 'png' });
  await page.screenshot({ path: outJpg1Brain, type: 'jpeg', quality: 95 });

  console.log('✅ General status graphic rendered successfully!');
  console.log('   - ' + outJpg1);
  console.log('   - ' + outJpg1Brain);

  await browser.close();
})();
