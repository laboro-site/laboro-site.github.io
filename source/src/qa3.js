const { chromium } = require('playwright');
const URL = 'file://' + require('path').resolve(__dirname, '../dist3/index.html');
const VPS = [[360, 740], [390, 844], [430, 932], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080]];
const fails = []; let checks = 0;
const ok = (c, msg) => { checks++; if (!c) fails.push(msg); };
const layout = () => {
  const vw = document.documentElement.clientWidth, out = [];
  const skip = '.tabs,.stage,.hero-pin,.story-r,.vis,.bt-v,.subnav,.cli,.car,.ticker,.hero-cv,.hud,.ft-big,.aud-r,.hero-grid,.curtain,.prog,.mega,.mnav,.modal,.cookie,svg';
  document.querySelectorAll('#hdr *, #app *, #ft *').forEach(el => {
    if (el.closest(skip)) return; const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') return;
    if (r.right > vw + 1.5 || r.left < -1.5) out.push('OVF ' + el.tagName + '.' + String(el.className).slice(0, 40) + ' [' + Math.round(r.left) + ',' + Math.round(r.right) + '] ' + (el.textContent || '').trim().slice(0, 30));
  });
  document.querySelectorAll('.btn,.tab,.cell-s,.cell-t,.chip b,.hero-stats b,.stat b,.con-tel,.con-mail,.sv-h1,.h1 .ln,.h2,.h3,.nav a,.ctg-tab,.hdr-tel,.sv-sym b,.step h4,.feat h4,.lcard h4,.links a,.tags li,.progs span,.sv-nav b,.doc h1').forEach(el => {
    if (el.closest('.mega,.mnav,.modal')) return; if (!el.offsetParent) return;
    if (el.scrollWidth > el.clientWidth + 1.5) out.push('CLIP ' + el.tagName + '.' + String(el.className).slice(0, 30) + ' sw' + el.scrollWidth + '>cw' + el.clientWidth + ' ' + el.textContent.trim().slice(0, 30));
  });
  const d = document.documentElement; if (d.scrollWidth > d.clientWidth) out.push('HSCROLL ' + d.scrollWidth + '>' + d.clientWidth);
  const hi = document.querySelector('.hdr-in'); if (hi) { const kids = [...hi.children].filter(k => k.offsetParent); for (let i = 1; i < kids.length; i++) { if (kids[i].getBoundingClientRect().left < kids[i - 1].getBoundingClientRect().right - 1) out.push('HDR overlap'); } }
  return [...new Set(out)].slice(0, 12);
};
(async () => {
  const b = await chromium.launch();
  const slugs = await (async () => { const p = await b.newPage(); await p.goto(URL); const s = await p.evaluate(() => window.__D.services.map(s => s.slug)); await p.close(); return s; })();
  const pages = ['', ...slugs.map(s => '#/s/' + s), '#/docs/personal', '#/docs/ad', '#/docs/privacy', '#/docs/cookies'];
  // 1. layout matrix
  for (const [W, H] of VPS) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: W < 800, isMobile: W < 800, reducedMotion: 'reduce' });
    const p = await ctx.newPage(); const errs = [];
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
    await p.goto(URL); await p.waitForTimeout(300);
    for (const lang of ['ru']) {
      const list = lang === 'ru' ? pages : [pages[0], pages[1], pages[4], pages[6], pages[22], pages[25], pages[26], pages[27]];
      for (const pg of list) {
        await p.evaluate(h => { location.hash = h || '#/'; }, pg); await p.waitForTimeout(90);
        const r = await p.evaluate(layout);
        ok(r.length === 0, `[${W}] ${lang} ${pg || 'home'}: ` + r.join(' ; '));
        const txt = await p.evaluate(() => document.querySelector('#app').innerText.length); ok(txt > 150, `[${W}] ${lang} ${pg}: empty view`);
      }
    }
    ok(errs.length === 0, `[${W}] console: ` + errs.slice(0, 3).join(' | '));
    await ctx.close();
  }
  // 2. interactions desktop
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
    await p.goto(URL); await p.waitForTimeout(1200);
    ok(await p.evaluate(() => document.querySelectorAll('.stage .ly').length === 4), 'hero layers');
    await p.evaluate(() => scrollTo(0, 700)); await p.waitForTimeout(300);
    ok(await p.evaluate(() => { const v = +getComputedStyle(document.querySelector('.hero')).getPropertyValue('--p'); return v > .3 && v < .8 && document.body.dataset.over === 'dark'; }), 'hero scroll scene progress');
    await p.evaluate(() => { const s = document.getElementById('story'); scrollTo(0, s.offsetTop + s.offsetHeight * .5); }); await p.waitForTimeout(400);
    ok(await p.evaluate(() => document.querySelectorAll('.story-steps li.on').length === 1 && ['02', '03'].includes(document.querySelector('.story-n b').textContent)), 'story scene step');
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
    await p.hover('[data-mega]'); await p.waitForTimeout(500);
    ok(await p.evaluate(() => document.querySelector('#mega').classList.contains('on') && document.querySelectorAll('#mega a').length === 26), 'mega menu: not open / wrong links');
    await p.click('#mega a[href="#/s/proekt-ndv"]'); await p.waitForTimeout(900);
    ok(await p.evaluate(() => location.hash === '#/s/proekt-ndv' && !!document.querySelector('.sv-h1') && !document.querySelector('#mega').classList.contains('on') && scrollY === 0), 'mega link → service route');
    ok(await p.evaluate(() => document.title.includes('допустимых')), 'title not updated');
    await p.goBack(); await p.waitForTimeout(900);
    ok(await p.evaluate(() => !!document.querySelector('.hero')), 'back → home');
    await p.click('.nav a[href="#/@team"]'); await p.waitForTimeout(3500);
    ok(await p.evaluate(() => Math.abs(document.querySelector('#team').getBoundingClientRect().top - 44) < 8), 'anchor scroll to team: ' + await p.evaluate(() => document.querySelector('#team').getBoundingClientRect().top));
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    await p.click('.hero [data-modal=cons]'); await p.waitForTimeout(500);
    ok(await p.evaluate(() => document.querySelector('#modal').classList.contains('on') && document.body.classList.contains('lock')), 'modal open + lock');
    await p.click('#modal button[type=submit]'); await p.waitForTimeout(150);
    ok(await p.evaluate(() => document.querySelectorAll('#modal .err').length === 3), 'validation: expected 3 errors, got ' + await p.evaluate(() => document.querySelectorAll('#modal .err').length));
    await p.fill('#modal [name=name]', 'Иван'); await p.click('#modal [name=phone]'); await p.keyboard.type('9161234567');
    ok(await p.evaluate(() => document.querySelector('#modal [name=phone]').value === '+7 (916) 123-45-67'), 'phone mask: ' + await p.evaluate(() => document.querySelector('#modal [name=phone]').value));
    await p.click('#modal .chk:nth-of-type(1) i', { force: true }).catch(() => { }); await p.evaluate(() => { const c = document.querySelector('#modal [name=c1]'); if (!c.checked) c.click(); });
    await p.click('#modal button[type=submit]'); await p.waitForTimeout(200);
    ok(await p.evaluate(() => document.querySelector('#modal form').classList.contains('sent') && getComputedStyle(document.querySelector('#modal .form-ok')).display !== 'none'), 'form success state');
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    ok(await p.evaluate(() => !document.querySelector('#modal').classList.contains('on') && !document.body.classList.contains('lock')), 'modal Esc close + unlock');
    await p.evaluate(() => document.querySelector('#prices').scrollIntoView()); await p.click('[data-filter=ot]'); await p.waitForTimeout(200);
    ok(await p.evaluate(() => document.querySelectorAll('.pt .cell:not(.off)').length === 9), 'catalog filter ot');
    await p.click('[data-filter=all]');
    await p.evaluate(() => document.querySelector('#cats').scrollIntoView()); await p.click('[data-cat="1"]'); await p.waitForTimeout(200);
    ok(await p.evaluate(() => document.querySelectorAll('#ctgp .ctg-list li').length === 23), 'category II list = 23');
    await p.click('[data-cat="2"]'); ok(await p.evaluate(() => document.querySelectorAll('#ctgp .ctg-list li').length === 21 && document.querySelectorAll('#ctgp .ctg-notes li').length === 3), 'category III list = 21, notes 3');
    await p.evaluate(() => document.querySelector('#car').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
    await p.click('[data-car="1"]'); await p.waitForTimeout(900);
    ok(await p.evaluate(() => document.querySelector('#car').scrollLeft > 100), 'carousel next');
    await p.click('#car .lt:nth-child(5)'); await p.waitForTimeout(400);
    ok(await p.evaluate(() => document.querySelector('#lb').classList.contains('on') && document.querySelector('#lb img').naturalWidth > 100), 'lightbox open');
    await p.keyboard.press('ArrowRight'); ok(await p.evaluate(() => document.querySelector('.lb-cap').innerText.includes('06 / 14')), 'lightbox next');
    { const r = await p.evaluate(() => { const r = document.querySelector('#lb img').getBoundingClientRect(); return [r.top, r.bottom, innerHeight, r.height]; }); ok(r[0] >= 0 && r[1] <= r[2] && r[3] > 300, 'desktop lightbox fits ' + r.map(Math.round)); }
    await p.click('#lb [data-close]'); await p.waitForTimeout(400); ok(await p.evaluate(() => !document.querySelector('#lb').classList.contains('on')), 'lightbox close');
    await p.evaluate(() => document.querySelector('#examples .ex').scrollIntoView({ block: 'center' })); await p.click('.ex button:nth-child(2)'); await p.waitForTimeout(300);
    ok(await p.evaluate(() => document.querySelector('.lb-cap').innerText.includes('02 / 04')), 'examples lightbox'); await p.keyboard.press('Escape');
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
    await p.click('.hdr [data-theme-toggle]'); await p.waitForTimeout(900); ok(await p.evaluate(() => document.documentElement.dataset.theme === 'dark'), 'theme → dark');
    await p.reload(); await p.waitForTimeout(500); ok(await p.evaluate(() => document.documentElement.dataset.theme === 'dark'), 'theme persisted');
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500); await p.click('.hdr [data-theme-toggle]');
    ok(await p.evaluate(() => !document.querySelector('[data-lang]') && !/Environmental|环保/.test(document.documentElement.innerHTML)), 'no language switcher / no EN-ZH strings left');
    await p.evaluate(() => { location.hash = '#/s/ekologicheskoe-soprovozhdenie-pod-klyuch'; }); await p.waitForTimeout(900);
    await p.click('.links a'); await p.waitForTimeout(900); ok(await p.evaluate(() => location.hash === '#/s/2-tp-vozduh'), 'inner link between services');
    await p.evaluate(() => { location.hash = '#/@prices'; }); await p.waitForTimeout(1500); await p.fill('[data-search]', 'отход'); await p.waitForTimeout(150);
    ok(await p.evaluate(() => { const n = document.querySelectorAll('.pt .cell:not(.off)').length; return n >= 4 && n < 12; }), 'catalog search: ' + await p.evaluate(() => document.querySelectorAll('.pt .cell:not(.off)').length));
    await p.fill('[data-search]', 'zzzz'); ok(await p.evaluate(() => !document.querySelector('.pt-empty').hidden), 'search empty state'); await p.fill('[data-search]', '');
    await p.goto(URL + '#/@contacts'); await p.waitForTimeout(3000); ok(await p.evaluate(() => Math.abs(document.querySelector('#contacts').getBoundingClientRect().top - 44) < 10), 'deep link to section on load');
    await p.goto(URL + '#/s/proekt-noolr'); await p.reload(); await p.waitForTimeout(800); ok(await p.evaluate(() => !!document.querySelector('.sv-h1') && scrollY === 0), 'deep link to service on load');
    await p.evaluate(() => { location.hash = '#/nonexistent'; }); await p.waitForTimeout(800); ok(await p.evaluate(() => !!document.querySelector('.hero')), 'unknown route → home');
    const imgs = await p.evaluate(async () => { const bad = []; for (const i of document.images) { if (i.closest('#lb')) continue; if (!i.complete) await new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 3000); i.loading = 'eager'; }); if (!i.naturalWidth) bad.push(i.alt); } return bad; });
    ok(imgs.length === 0, 'broken images: ' + imgs.join(','));
    ok(errs.length === 0, 'desktop interactions console: ' + errs.slice(0, 3).join(' | '));
    await ctx.close();
  }
  // 3. interactions mobile
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }); const p = await ctx.newPage(); const errs = [];
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
    await p.goto(URL); await p.waitForTimeout(1000);
    await p.tap('[data-burger]'); await p.waitForTimeout(500);
    ok(await p.evaluate(() => document.querySelector('#mnav').classList.contains('on') && document.body.classList.contains('lock')), 'mobile menu open');
    await p.tap('#mnav [data-acc]'); await p.waitForTimeout(600);
    ok(await p.evaluate(() => document.querySelector('.mnav-sub').getBoundingClientRect().height > 400), 'mobile accordion');
    ok(await p.evaluate(() => { const m = document.querySelector('#mnav'); return m.scrollHeight > m.clientHeight; }), 'mobile menu scrollable when long');
    await p.evaluate(() => document.querySelector('#mnav a[href="#/s/laboratornye-issledovaniya"]').click()); await p.waitForTimeout(900);
    ok(await p.evaluate(() => location.hash === '#/s/laboratornye-issledovaniya' && !document.querySelector('#mnav').classList.contains('on') && !document.body.classList.contains('lock')), 'mobile menu link → route, closed, unlocked');
    await p.tap('.lcard [data-modal]'); await p.waitForTimeout(500);
    const mb = await p.evaluate(() => { const r = document.querySelector('.modal-box').getBoundingClientRect(); return [r.left, r.right, r.top, r.bottom, innerWidth, innerHeight]; });
    ok(mb[0] >= 0 && mb[1] <= mb[4] && mb[2] >= 0 && mb[3] <= mb[5], 'mobile modal fits viewport ' + mb.map(Math.round));
    await p.tap('#modal [data-close]'); await p.waitForTimeout(400);
    await p.evaluate(() => { location.hash = '#/@clients'; }); await p.waitForTimeout(1200);
    await p.evaluate(() => document.querySelector('#car').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
    await p.tap('#car .lt:nth-child(1)'); await p.waitForTimeout(500);
    const lb = await p.evaluate(() => { const r = document.querySelector('#lb img').getBoundingClientRect(); return [r.left, r.right, r.top, r.bottom, innerWidth, innerHeight, r.width]; });
    ok(lb[0] >= 0 && lb[1] <= lb[4] + .5 && lb[2] >= 0 && lb[3] <= lb[5] && lb[6] > 200, 'mobile lightbox fits ' + lb.map(Math.round));
    await p.tap('#lb [data-close]'); await p.waitForTimeout(300);
    const small = await p.evaluate(() => [...document.querySelectorAll('#hdr button, #hdr a, .tab, .ctg-tab, .fab button, .pc-go, .btn')].filter(e => e.offsetParent).map(e => [e.className.toString().slice(0, 24), Math.round(e.getBoundingClientRect().height)]).filter(x => x[1] < 36));
    ok(small.length === 0, 'small tap targets: ' + JSON.stringify(small.slice(0, 6)));
    await p.setViewportSize({ width: 844, height: 390 }); await p.waitForTimeout(500);
    ok((await p.evaluate(layout)).length === 0, 'landscape phone layout: ' + (await p.evaluate(layout)).join(';'));
    ok(errs.length === 0, 'mobile console: ' + errs.slice(0, 3).join(' | '));
    await ctx.close();
  }
  await b.close();
  console.log(`checks: ${checks}, failed: ${fails.length}`); fails.forEach(f => console.log(' ✗ ' + f.slice(0, 600)));
})();
