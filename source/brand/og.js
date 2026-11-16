const { chromium } = require('playwright'); const d = __dirname;
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  await p.goto('file://' + d + '/og.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300); await p.screenshot({ path: d + '/og.png' }); await b.close(); })();
