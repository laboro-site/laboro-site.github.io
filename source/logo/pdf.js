const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file:///home/claude/laboro/logo/logo.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.pdf({ path: '/mnt/user-data/outputs/Лаборо — варианты логотипа.pdf', preferCSSPageSize: true, printBackground: true }); await b.close(); })();
