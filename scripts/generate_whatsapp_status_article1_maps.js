const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Image paths
const MAPS_IMG_PATH = 'D:/KI Projekte/01_Marke_und_Websites/Antigravity Firmenflow Website/firmenflow-website/public/images/ratgeber/google-maps-nicht-gefunden.jpg';
const MANU_PORTRAIT_PATH = 'D:/KI Projekte/01_Marke_und_Websites/Pitches/Kruemelranch Alpen/manuel_portrait.jpg';
const APP_ICON_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/firmenflow-app-icon-3d.webp';

const ICON_PROFIL_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/04_Lokalpraesenz_360/02-profil-aufraeumen.webp';
const ICON_ZEITEN_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/03_Kontakt_und_Aktion/03-termin.webp';
const ICON_QUIZ_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/03_Kontakt_und_Aktion/08-faq.webp';

function toBase64(filePath, mimeType) {
  const fileData = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${fileData.toString('base64')}`;
}

const mapsImgBase64 = toBase64(MAPS_IMG_PATH, 'image/jpeg');
const manuPortraitBase64 = toBase64(MANU_PORTRAIT_PATH, 'image/jpeg');
const appIconBase64 = toBase64(APP_ICON_PATH, 'image/webp');
const iconProfilBase64 = toBase64(ICON_PROFIL_PATH, 'image/webp');
const iconZeitenBase64 = toBase64(ICON_ZEITEN_PATH, 'image/webp');
const iconQuizBase64 = toBase64(ICON_QUIZ_PATH, 'image/webp');

const htmlContent = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Firmenflow WhatsApp Status - Ratgeber Artikel 1 Google Maps</title>
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

    /* Ambient paper texture grid */
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

    /* 3. Centerpiece Showcase Visual */
    .visual-card {
      width: 952px;
      height: 540px;
      border-radius: 32px;
      background: linear-gradient(145deg, #FFFFFF 0%, #F6F2EC 100%);
      border: 2px solid #EAE5DF;
      box-shadow: 
        0 28px 60px -12px rgba(72, 35, 97, 0.16),
        0 10px 24px rgba(255, 112, 93, 0.1);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .visual-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 30px;
    }

    .float-tag-top {
      position: absolute;
      top: 22px;
      left: 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid #E7E2DC;
      border-radius: 999px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 21px;
      font-weight: 700;
      color: #17131A;
      box-shadow: 0 6px 20px rgba(72, 35, 97, 0.12);
    }

    .float-tag-bottom {
      position: absolute;
      bottom: 22px;
      right: 24px;
      background: rgba(72, 35, 97, 0.96);
      backdrop-filter: blur(14px);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 21px;
      font-weight: 700;
      color: #FFFFFF;
      box-shadow: 0 10px 28px rgba(72, 35, 97, 0.35);
    }

    /* 4. Three Core Points (Menschlich, verstaendlich, klar strukturiert) */
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
        <span class="badge-text">Artikel 1</span>
        <span class="badge-dot"></span>
      </div>
    </div>

    <!-- 2. Headline & Hook -->
    <div class="hero-text-block">
      <div class="kicker-pill">
        <span>📍 TEIL 1 &bull; LOKALE SICHTBARKEIT</span>
      </div>
      <h1 class="headline">
        Warum dein Betrieb bei<br><span class="headline-highlight">Google Maps</span> nicht gefunden wird.
      </h1>
      <p class="subline">
        Ein Kunde sucht deine Leistung vor Ort – und sieht <strong>3 andere Betriebe</strong>. Die häufigsten Ursachen &amp; wie du nach oben kommst.
      </p>
    </div>

    <!-- 3. Centerpiece Showcase Visual -->
    <div class="visual-card">
      <img src="${mapsImgBase64}" alt="Google Maps Sichtbarkeit" class="visual-image">
      <div class="float-tag-top">
        <span>📍 198 Betriebe am Niederrhein analysiert</span>
      </div>
      <div class="float-tag-bottom">
        <span>⚠️ Fast jeder 2. Betrieb verliert Anfragen</span>
      </div>
    </div>

    <!-- 4. Three Core Points (Menschlich, verstaendlich, klar) -->
    <div class="points-stack">
      <!-- Punkt 1: Inhaber-Bestaetigung -->
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconProfilBase64}" alt="Profil bestaetigen">
        </div>
        <div class="point-body">
          <span class="point-title">1. Profil nie als Inhaber bestätigt</span>
          <span class="point-text">Google legt Betriebe oft selbst an. Ohne Zugriff verschenkst du wertvolle Aufträge.</span>
        </div>
        <div class="point-tag tag-coral">Offenes Profil</div>
      </div>

      <!-- Punkt 2: Oeffnungszeiten & Kategorie -->
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconZeitenBase64}" alt="Zeiten und Kategorie">
        </div>
        <div class="point-body">
          <span class="point-title">2. Falsche Zeiten oder Kategorie</span>
          <span class="point-text">Veraltete Öffnungszeiten und unpassende Branchen stufen dein Profil herab.</span>
        </div>
        <div class="point-tag tag-coral">Ranking-Bremse</div>
      </div>

      <!-- Punkt 3: Interaktives Quiz zum Artikel -->
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconQuizBase64}" alt="Interaktives Quiz">
        </div>
        <div class="point-body">
          <span class="point-title">3. Inkl. 2 interaktiver Quizzes</span>
          <span class="point-text">Finde mit dem 5-Fragen-Kompakt-Check in 2 Minuten heraus, was bei dir fehlt.</span>
        </div>
        <div class="point-tag tag-plum">Direkt testen</div>
      </div>
    </div>

    <!-- 5. CTA Box -->
    <div class="cta-card">
      <div class="cta-left">
        <div class="cta-eyebrow">
          <span>🔥 ARTIKEL 1 &bull; JETZT KOSTENLOS LESEN</span>
        </div>
        <div class="cta-url">
          firmenflow.de/<span>ratgeber</span>
        </div>
      </div>
      <div class="cta-button">
        <span>Artikel lesen</span>
        <span class="cta-button-arrow">&rarr;</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const HTML_MAPS_ARTICLE_PATH = path.join(__dirname, 'whatsapp_status_article1_maps.html');
fs.writeFileSync(HTML_MAPS_ARTICLE_PATH, htmlContent, 'utf-8');
console.log('✅ HTML article 1 file written:', HTML_MAPS_ARTICLE_PATH);

(async () => {
  console.log('🚀 Rendering Article 1 WhatsApp Status graphic with Playwright...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const OUT_DIR_BRAND = 'D:/KI Projekte/01_Marke_und_Websites/Antigravity Firmenflow Website/firmenflow-website/public/brand/whatsapp';
  const OUT_DIR_BRAIN = 'C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265';

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });

  await page.goto('file:///' + HTML_MAPS_ARTICLE_PATH.replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const outJpg = path.join(OUT_DIR_BRAND, '02_Status_Ratgeber_Google_Maps_1080x1920.jpg');
  const outPng = path.join(OUT_DIR_BRAND, '02_Status_Ratgeber_Google_Maps_1080x1920.png');
  const outJpgBrain = path.join(OUT_DIR_BRAIN, '02_Status_Ratgeber_Google_Maps_1080x1920.jpg');

  await page.screenshot({ path: outJpg, type: 'jpeg', quality: 95 });
  await page.screenshot({ path: outPng, type: 'png' });
  await page.screenshot({ path: outJpgBrain, type: 'jpeg', quality: 95 });

  console.log('✅ Article 1 status graphic rendered successfully:');
  console.log('   - ' + outJpg);
  console.log('   - ' + outJpgBrain);

  await browser.close();
})();
