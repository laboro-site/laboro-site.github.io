const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 })).newPage();
  await p.goto('file://' + require('path').resolve(__dirname, '../dist/index.html'));
  await p.evaluate(() => { localStorage.setItem('lb1b-cookie', '1'); localStorage.setItem('lb1b-theme', 'dark'); }); await p.reload();
  await p.mouse.move(700, 300); await p.waitForTimeout(600); await p.mouse.move(820, 340, { steps: 20 }); await p.waitForTimeout(6000);
  await p.screenshot({ path: process.argv[2] || 'shots/og.png' }); await b.close(); })();
