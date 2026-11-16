const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file:///home/claude/laboro/plan/plan.html'); await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: '/mnt/user-data/outputs/Лаборо — план переезда с Tilda.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-size:7px;font-family:monospace;color:#888;padding:0 16mm;display:flex;justify-content:space-between"><span>ЛАБОРО • ПЛАН ПЕРЕЕЗДА С TILDA</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>' });
  await b.close(); })();
