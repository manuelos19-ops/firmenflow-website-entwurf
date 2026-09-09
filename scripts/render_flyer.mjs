import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log('Using browser executable:', execPath);

  const browser = await chromium.launch({
    executablePath: execPath,
    headless: true,
  });

  const context = await browser.newContext({
    deviceScaleFactor: 3, // High-res ~300 DPI
    viewport: { width: 1400, height: 1200 }
  });

  const page = await context.newPage();
  
  const htmlFile = 'C:/Users/manue/Downloads/firmenflow-flyer-a6.html';
  const htmlUrl = 'file:///' + path.resolve(htmlFile).replace(/\\/g, '/');
  console.log('Navigating to:', htmlUrl);

  await page.goto(htmlUrl, { waitUntil: 'networkidle' });

  // Wait for Google webfonts to be fully ready
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  // Ensure guides and toolbar are hidden
  await page.evaluate(() => {
    document.body.classList.remove('show-guides');
    const toolbar = document.querySelector('.toolbar');
    if (toolbar) toolbar.remove();
  });

  // 1. Render EXACT 2-Page PDF with Vistaprint dimensions (108mm x 151mm)
  const pdfOut = 'C:/Users/manue/Downloads/firmenflow-flyer-a6-druck.pdf';
  await page.pdf({
    path: pdfOut,
    width: '108mm',
    height: '151mm',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    preferCSSPageSize: true,
  });
  console.log('PDF successfully rendered to:', pdfOut);

  // 2. High-res PNG for Front (Seite 1)
  const page1 = page.locator('#page1');
  const frontPng = 'C:/Users/manue/Downloads/firmenflow-flyer-a6-vorderseite-300dpi.png';
  await page1.screenshot({ path: frontPng });
  console.log('Front PNG screenshot saved to:', frontPng);

  // 3. High-res PNG for Back (Seite 2)
  const page2 = page.locator('#page2');
  const backPng = 'C:/Users/manue/Downloads/firmenflow-flyer-a6-rueckseite-300dpi.png';
  await page2.screenshot({ path: backPng });
  console.log('Back PNG screenshot saved to:', backPng);

  await browser.close();
}

main().catch(err => {
  console.error('Error during render:', err);
  process.exit(1);
});
