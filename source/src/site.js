(() => {
  'use strict';
  const D = window.__D, A = window.__A;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  let lang = 'ru';
  let theme = store.get('lb1b-theme'); if (theme !== 'light' && theme !== 'dark') theme = 'light';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const li = () => LANGS.indexOf(lang);
  const t = k => (T[k] || [k, k, k])[li()];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad2 = n => String(n).padStart(2, '0');
  const SVC = D.services, IDX = Object.fromEntries(SVC.map((s, i) => [s.slug, i]));
  const NOAB = new Set(['ИНВ', 'АКТ', 'ПБТ', 'ДПНВ', 'ОПЭК', 'ЭКСБ', 'СКО', 'КЛЮЧ', 'ЛАБ', 'ПАСП', 'ЛИЦ', 'ДПО']);
  const ab = s => NOAB.has(s.sym) ? '' : s.sym;
  const THX = D.thanks.map((n, i) => ({ n, k: 'thanks' + (i + 1) })).filter(x => x.n !== 'ИП Пасько');
  const TEAM = D.team.map((m, i) => ({ m, k: 'team' + (i + 1) })).filter(x => !['Артемий', 'Елена', 'Дарья'].includes(x.m[0]));
  const sName = s => lang === 'ru' ? s.name : SV[s.sym][lang];
  const sFull = s => lang === 'ru' ? s.full : SV[s.sym][lang];
  const fTerm = s => {
    if (!s.term) return ''; const m = s.term.match(/(\d+)\s*(дн|мес)/); if (lang === 'ru' || !m) return s.term;
    const n = +m[1], d = m[2] === 'дн';
    return lang === 'en' ? `from ${n} ${d ? (n > 1 ? 'days' : 'day') : (n > 1 ? 'months' : 'month')}` : `${n} ${d ? '天' : '个月'}起`;
  };
  const fPrice = s => {
    if (!s.price) return ''; if (lang === 'ru') return s.price;
    const m = s.price.match(/от ([\d ]+) ₽( \/ мес)?/); if (!m) return s.price; const n = m[1].trim();
    return lang === 'en' ? `from ₽${n.replace(/ /g, ',')}${m[2] ? ' / mo' : ''}` : `${n} ₽${m[2] ? ' / 月' : ''} 起`;
  };
  const TEL = '+7 (499) 322-77-99', TEL_H = 'tel:+74993227799', MAIL = 'zakaz@ooolaboro.ru';
  const TG = 'https://t.me/Passport_othodov_laboro_bot', WA = 'https://wa.me/79162305599', VK = 'https://vk.com/eco_ooolaboro';
  const I = {
    arr: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h12M9 3l5 5-5 5"/></svg>',
    arl: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8H2M7 3L2 8l5 5"/></svg>',
    up: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14V2M3 7l5-5 5 5"/></svg>',
    dn: '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1.5 3.5L5 7l3.5-3.5"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2v12M2 8h12"/></svg>',
    x: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>',
    chk: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 4.5"/></svg>',
    zoom: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9.5 2H14v4.5M6.5 14H2V9.5M14 2L9 7M2 14l5-5"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="3"/><path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.2 1.2M11.8 11.8L13 13M13 3l-1.2 1.2M4.2 11.8L3 13"/></svg>',
    moon: '<svg class="i-moon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M13.5 9.6A6 6 0 0 1 6.4 2.5a6 6 0 1 0 7.1 7.1Z"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.2v.1"/></svg>',
    shield: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2l6.5 2.4v5.2c0 4-2.8 6.8-6.5 8.4-3.7-1.6-6.5-4.4-6.5-8.4V4.4Z"/><path d="M7 10l2.2 2.2L13.2 8"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.7 4.1L3.4 10.8c-1 .4-1 1 0 1.3l4.3 1.4 1.7 5.1c.2.6.4.8.8.8s.6-.2.9-.5l2.3-2.2 4.5 3.3c.8.5 1.4.2 1.6-.8l2.9-13.8c.3-1.2-.4-1.8-1.7-1.3zM9.1 13.2l8.6-5.4c.4-.2.8-.1.5.2l-7.1 6.4-.3 3.3z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3.6 20.4l1.2-4.4a8.4 8.4 0 1 1 3.3 3.2z"/><path fill="currentColor" stroke="none" d="M9.2 7.6c-.5.3-1 1-1 1.900 0 3.200 3.100 6.300 6.300 6.300.9 0 1.600-.5 1.900-1l.3-.9-2.200-1.100-.9 1c-1.300-.5-2.400-1.600-2.900-2.900l1-.9-1.100-2.200z"/></svg>',
    vk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 17.3c-5.5 0-8.700-3.800-8.800-10h2.800c.1 4.600 2.100 6.500 3.700 6.900V7.300h2.600v4c1.600-.2 3.200-2 3.800-4h2.600a7.700 7.700 0 0 1-3.500 5 7.900 7.900 0 0 1 4.100 5h-2.900a5 5 0 0 0-4.100-3.600v3.600z"/></svg>',
  };
  const img = (k, alt = '', extra = '') => `<img src="${A[k]}" alt="${esc(alt)}" loading="lazy" decoding="async" ${extra}>`;

  /* ---------- rich text ---------- */
  function rich(txt) {
    const lines = String(txt || '').split('\n'); let out = '', ul = [], inList = false;
    const flush = () => { if (ul.length) { out += '<ul>' + ul.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>'; ul = []; } };
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (!l) { if (inList && !ul.length) continue; flush(); inList = false; continue; }
      if (/^[-–•]\s+/.test(l)) { ul.push(l.replace(/^[-–•]\s+/, '')); continue; }
      if (inList && l.length < 190 && !/[:：]$/.test(l)) { ul.push(l); continue; }
      flush();
      const head = /[:：]$/.test(l) && l.length < 110;
      inList = head;
      out += `<p${head ? ' class="em"' : ''}>${esc(l)}</p>`;
    }
    flush(); return out;
  }

  /* ---------- forms ---------- */
  let fid = 0;
  function formHTML(o = {}) {
    const id = 'f' + (++fid);
    return `<form class="form" novalidate data-form>
      <label class="fld"><input type="text" name="name" placeholder=" " autocomplete="name" maxlength="80"><span>${t('fName')}</span><small>${t('fErrName')}</small></label>
      <label class="fld"><input type="tel" name="phone" placeholder=" " autocomplete="tel" inputmode="tel" data-phone><span>${t('fPhone')}</span><small>${t('fErrPhone')}</small></label>
      ${o.msg ? `<label class="fld"><textarea name="msg" placeholder=" " maxlength="1000"></textarea><span>${t('fMsg')}</span></label>` : ''}
      <label class="chk" for="${id}a"><input type="checkbox" id="${id}a" name="c1"><i>${I.chk}</i><span>${t('fC1a')}<a href="#/docs/personal" data-nav>${t('fC1b')}</a></span><small>${t('fErrC')}</small></label>
      <label class="chk" for="${id}b"><input type="checkbox" id="${id}b" name="c2"><i>${I.chk}</i><span>${t('fC2a')}<a href="#/docs/ad" data-nav>${t('fC2b')}</a></span></label>
      <button class="btn btn-p btn-w" type="submit">${o.btn || t('fSendReq')}${I.arr}</button>
      <p class="form-note">${t('fNote')}<a href="#/docs/privacy" data-nav>${t('fPriv')}</a></p>
      <div class="form-ok" role="status"><span class="okmark">${I.chk}</span><h3 class="h3">${t('okTitle')}</h3><p>${t('okText')}</p><div class="row"><a class="btn btn-g btn-sm" href="${TEL_H}">${TEL}</a><a class="btn btn-g btn-sm" href="mailto:${MAIL}">${MAIL}</a></div></div>
    </form>`;
  }
  function maskPhone(v) {
    let d = v.replace(/\D/g, ''); if (!d) return '';
    if (d[0] === '8') d = '7' + d.slice(1); if (d[0] !== '7') d = '7' + d; d = d.slice(0, 11);
    let o = '+7'; if (d.length > 1) o += ' (' + d.slice(1, 4); if (d.length >= 5) o += ') ' + d.slice(4, 7); if (d.length >= 8) o += '-' + d.slice(7, 9); if (d.length >= 10) o += '-' + d.slice(9, 11);
    return o;
  }

  /* ---------- shell ---------- */
  const groupList = g => SVC.filter(s => s.g === g);
  const gAb = g => groupList(g).some(ab);
  const LOGO = `/*LOGO*/`;
  function renderShell() {
    const themeBtn = `<button class="ic-btn theme-btn" type="button" data-theme-toggle aria-label="${t('theme')}">${I.sun}${I.moon}</button>`;
    $('#hdr').innerHTML = `<div class="wrap hdr-in">
      <a class="logo" href="#/" data-nav aria-label="Лаборо">${LOGO}</a>
      <nav class="nav" aria-label="Main">
        <button type="button" data-mega aria-expanded="false" aria-controls="mega">${t('navServices')}${I.dn}</button>
        <a href="#/@clients" data-nav>${t('navClients')}</a><a href="#/@audit" data-nav>${t('navAudit')}</a><a href="#/@cats" data-nav>${t('navCats')}</a><a href="#/@team" data-nav>${t('navTeam')}</a><a href="#/@contacts" data-nav>${t('navContacts')}</a>
      </nav>
      <div class="hdr-r">${themeBtn}<a class="hdr-tel" href="${TEL_H}">${TEL}</a><button class="btn btn-p btn-sm" type="button" data-modal="cons">${t('ctaShort')}</button>
        <button class="burger" type="button" data-burger aria-expanded="false" aria-controls="mnav" aria-label="${t('menu')}"><i></i><i></i></button></div></div>`;
    $('#mega').innerHTML = `<div class="wrap mega-in">${D.groups.map(([g]) => `<div class="${g === 'pr' ? 'mega-pr' : ''}"><h4 class="mono"><span>${t('g_' + g)}</span><span>${pad2(groupList(g).length)}</span></h4><ul>${groupList(g).map(s => `<li><a href="#/s/${s.slug}" data-nav>${gAb(g) ? `<span>${ab(s)}</span>` : ''}${esc(sName(s))}</a></li>`).join('')}</ul></div>`).join('')}</div>`;
    $('#mnav').innerHTML = `<ul class="mnav-list">
      <li><button type="button" data-acc aria-expanded="false">${t('navServices')}${I.plus}</button><div class="mnav-sub"><div><div>${D.groups.map(([g]) => `<h5 class="mono">${t('g_' + g)}</h5>${groupList(g).map(s => `<a href="#/s/${s.slug}" data-nav>${gAb(g) ? `<span>${ab(s)}</span>` : ''}${esc(sName(s))}</a>`).join('')}`).join('')}</div></div></div></li>
      ${[['clients', 'navClients'], ['audit', 'navAudit'], ['cats', 'navCats'], ['team', 'navTeam'], ['contacts', 'navContacts']].map(([a, k]) => `<li><a href="#/@${a}" data-nav>${t(k)}</a></li>`).join('')}</ul>
      <div class="mnav-ft"><div class="row"><a class="mnav-tel" href="${TEL_H}">${TEL}</a><div class="soc"><a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a></div></div>
      <div class="row">${themeBtn}</div><button class="btn btn-p btn-w" type="button" data-modal="cons">${t('cta')}${I.arr}</button></div>`;
    $('#ft').innerHTML = `<div class="wrap"><div class="ft-top">
      <div><a class="logo" href="#/" data-nav>${LOGO}</a><p>${t('ftTag')}</p></div>
      <div><h5 class="mono">${t('navServices')}</h5><ul>${D.groups.map(([g]) => `<li><a href="#/@catalog:${g}" data-nav>${t('g_' + g)}</a></li>`).join('')}</ul></div>
      <div><h5 class="mono">${t('navContacts')}</h5><ul><li><a href="${TEL_H}">${TEL}</a></li><li><a href="mailto:${MAIL}">${MAIL}</a></li><li><a href="#/@contacts" data-nav>${t('addr')}</a></li></ul></div>
      <div><h5 class="mono">${t('ftLegal')}</h5><ul>${['personal', 'ad', 'privacy', 'cookies'].map(k => `<li><a href="#/docs/${k}" data-nav>${t('d_' + k)}</a></li>`).join('')}</ul></div></div>
      <div class="ft-big" aria-hidden="true">${lang === 'ru' ? 'Лаборо' : 'LABORO'}</div>
      <div class="ft-bot"><span>${t('ftCopy')}</span><span class="concept">${t('ftConcept')} • v/*VERSION*/</span></div></div>`;
    $('#fab').innerHTML = `<a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><button type="button" data-top aria-label="${t('toTop')}">${I.up}</button>`;
    $('#cookie').innerHTML = `<span>${t('cookie')} <a href="#/docs/cookies" data-nav>${t('more')}</a></span><button class="btn btn-g btn-sm" type="button" data-cookie>${t('ok')}</button>`;
  }

  /* ---------- views ---------- */
  const POP = [['otchet-ob-inventarizacii-istochnikov-vybrosov', 'plume', 't_1m'], ['proekt-ndv', 'limits', 't_2m'], ['proekt-sanitarno-zashchitnoy-zony', 'zone', 't_3m'], ['proekt-noolr', 'waste', 't_1m'], ['laboratornye-issledovaniya', 'lab', 't_1d'], ['ekologicheskoe-soprovozhdenie-pod-klyuch', 'report', 't_1d']];
  const STATS = [[20, 'st1'], [150, 'st2'], [650, 'st3'], [950, 'st4']];
  const srcPts = () => innerWidth < 900 ? [[.72, .15], [.2, .24], [.88, .33]] : [[.58, .2], [.9, .43], [.47, .7]];
  const secHd = (n, eb, title, sub) => `<div class="sec-hd"><span class="eyebrow mono rv">${t(eb)}</span><h2 class="h2 rv">${t(title)}</h2>${sub ? `<p class="rv" style="--i:1">${t(sub)}</p>` : '<span></span>'}</div>`;

  function catPanel(i) {
    const c = CATS[i], notes = []; let n = 0;
    const row = ([k, nk]) => { let sup = ''; if (nk) { let j = notes.indexOf(nk); if (j < 0) { notes.push(nk); j = notes.length - 1; } sup = `<sup>${j + 1}</sup>`; } n++; return `<li style="--i:${n}"><span>${pad2(n)}</span><div>${esc(CDOC[k][li()])}${sup}</div></li>`; };
    const docs = c.docs.map(row).join(''), rep = c.rep.map(k => row([k])).join(''), opt = c.opt.map(row).join('');
    return `<h4 class="mono"><span>${t('ctgDocs')}</span><span>${pad2(c.docs.length)}</span></h4><ul class="ctg-list">${docs}</ul>
      <h4 class="mono"><span>${t('ctgRep')}</span><span>${pad2(c.rep.length)}</span></h4><ul class="ctg-list">${rep}</ul>
      <h4 class="mono"><span>${t('ctgOpt')}</span><span>${pad2(c.opt.length)}</span></h4><ul class="ctg-list">${opt}</ul>
      <ul class="ctg-notes">${notes.map((k, j) => `<li><b>${j + 1}</b><span>${esc(CNOTE[k][li()])}</span></li>`).join('')}</ul>
      <button class="btn btn-p" type="button" data-modal="calc">${t('ctgBtn')}${I.arr}</button>`;
  }
  const catCount = i => CATS[i].docs.length + CATS[i].rep.length + CATS[i].opt.length;

  function viewHome() {
    const pts = srcPts();
    const cliRow = off => { const a = D.clients.map((n, i) => (i + off) % 18).map(i => `<figure>${img('client' + (i + 1), D.clients[i], `width="${D.clientDim[i][0]}" height="${D.clientDim[i][1]}"`)}</figure>`).join(''); return a + a; };
    const tk = SVC.filter(ab).map(s => `<span>${s.sym}</span>`).join(''), tick = tk + tk;
    return `
    <section class="hero" id="top">
      <div class="hero-grid"></div><canvas class="hero-cv" aria-hidden="true"></canvas><div class="hero-veil"></div>
      <div class="hud" aria-hidden="true">
        ${pts.map((p, i) => `<div class="hud-src" style="left:${p[0] * 100}%;top:${p[1] * 100}%"><em style="width:${[150, 110, 190][i]}px;height:${[150, 110, 190][i]}px"></em><i></i><span><b>${t('hudSrc')} 000${i + 1}</b>${['55.7447° N', '37.6928° E', 'H = 24 M'][i]}</span></div>`).join('')}
        <div class="hud-tag mono"><span><i class="dot"></i><b>${t('hudModel')}</b></span><span>${t('hudWind')} <b id="hudW">3.2</b> м/с <b id="hudD">ЮЗ</b></span></div>
      </div>
      <div class="wrap hero-body">
        <span class="eyebrow mono fade-up">${t('heroEyebrow')}</span>
        <h1 class="h1"><span class="ln"><span>${t('heroH1a')}</span></span><span class="ln"><span>${t('heroH1b')}</span></span></h1>
        <div class="hero-row fade-up"><p class="lead">${t('heroLead')}</p>
          <div class="hero-cta"><button class="btn btn-p" type="button" data-modal="cons">${t('cta')}${I.arr}</button><a class="btn btn-g" href="#/@catalog" data-nav>${t('heroAll')}</a></div></div>
      </div>
      <div class="wrap fade-up"><div class="hero-stats">${STATS.map(([n, k]) => `<div><b data-count="${n}">${n}+</b><span>${t(k)}</span></div>`).join('')}</div></div>
    </section>
    <div class="ticker" aria-hidden="true"><div class="ticker-in">${tick}${tick}</div></div>

    <section class="sec" id="popular"><div class="wrap">
      ${secHd('01', 'popEyebrow', 'popTitle', 'popSub')}
      <div class="pop">${POP.map(([slug, ill, tk], i) => { const s = SVC[IDX[slug]]; return `<article class="pc rv" style="--i:${i % 3}" data-spot>
        <div class="pc-top mono"><span>${t('g_' + s.g)}</span><b>${ab(s)}</b></div><div class="pc-ill">${ILL[ill]()}</div>
        <h3 class="h3">${t('p' + (i + 1) + 't')}</h3><p>${t('p' + (i + 1) + 'd')}</p>
        <div class="pc-ft"><span class="mono">${t('term')}: <b>${t(tk)}</b></span><span class="pc-go">${I.arr}</span></div>
        <a class="cover" href="#/s/${slug}" data-nav aria-label="${esc(t('p' + (i + 1) + 't'))}"></a></article>`; }).join('')}</div>
    </div></section>

    <section class="sec sec-alt" id="catalog"><div class="wrap">
      ${secHd('02', 'catEyebrow', 'catTitle', 'catSub')}
      <div class="cat-bar rv"><label class="search"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="9" cy="9" r="6"/><path d="M13.500 13.500L18 18"/></svg><input type="search" placeholder="Поиск по услугам: СЗЗ, отходы, отчёт" data-search aria-label="Поиск по услугам"></label><div class="tabs" role="tablist">${[['all', SVC.length]].concat(D.groups.map(([g]) => [g, groupList(g).length])).map(([g, n], i) => `<button class="tab" type="button" role="tab" data-filter="${g}" aria-selected="${i === 0}">${t('g_' + g)}<sup>${pad2(n)}</sup></button>`).join('')}</div></div>
      <div class="pt">${SVC.filter(ab).map((s, i) => { const a = ab(s); return `<a class="cell rv" style="--i:${i % 7}" data-g="${s.g}" data-q="${esc((s.name + ' ' + s.full + ' ' + a).toLowerCase())}" href="#/s/${s.slug}" data-nav><span class="cell-t"><span>${t('g_' + s.g)}</span><span>${esc(fTerm(s))}</span></span><b class="cell-s${a.length > 4 ? ' l5' : a.length > 3 ? ' l4' : ''}">${a}</b><span class="cell-n">${esc(sName(s))}</span></a>`; }).join('')}</div>
      <div class="pt pt2">${SVC.filter(s => !ab(s)).map((s, i) => `<a class="cell cell-w rv" style="--i:${i % 4}" data-g="${s.g}" data-q="${esc((s.name + ' ' + s.full).toLowerCase())}" href="#/s/${s.slug}" data-nav><span class="cell-t"><span>${t('g_' + s.g)}</span><span>${esc(fTerm(s))}</span></span><b class="cell-nm">${esc(sName(s))}</b><span class="cell-n">${esc(s.price || '')}</span></a>`).join('')}</div>
      <p class="pt-empty" hidden>Ничего не нашлось. Попробуйте другое слово или позвоните: ${TEL}</p>
      <div class="pt-legend mono">${D.groups.map(([g]) => `<span class="lg" data-g="${g}"><i></i>${t('g_' + g)}</span>`).join('')}</div>
    </div></section>

    <section class="sec" id="clients">
      <div class="wrap">${secHd('03', 'cliEyebrow', 'cliTitle')}</div>
      <div class="cli rv"><div class="cli-in">${cliRow(0)}</div></div><div class="cli rev rv"><div class="cli-in">${cliRow(9)}</div></div>
      <div class="wrap" style="margin-top:var(--sec)"><div class="car-hd"><div><h2 class="h2 rv">${t('thxTitle')}</h2><p class="lead rv" style="margin-top:14px;font-size:16.5px">${t('thxSub')}</p></div>
        <div class="car-nav"><button class="ic-btn" type="button" data-car="-1" aria-label="${t('back')}">${I.arl}</button><button class="ic-btn" type="button" data-car="1" aria-label="next">${I.arr}</button></div></div></div>
      <div class="car" id="car">${THX.map(({ n, k }, i) => `<button class="lt" type="button" data-lb="thanks" data-i="${i}"><div class="lt-img">${img(k, n, 'draggable="false"')}<span class="lt-zoom">${I.zoom}</span></div><div class="lt-cap"><span>${pad2(i + 1)}</span>${esc(n)}</div></button>`).join('')}</div>
      <div class="car-bar"><i></i></div>
    </section>

    <section class="sec sec-alt" id="audit"><div class="wrap"><div class="aud rv">
      <div class="aud-l"><span class="eyebrow mono">${t('audEyebrow')}</span><h2 class="h2">${t('audTitle')}</h2><p>${t('audText')}</p>
        <button class="btn" type="button" data-modal="audit">${t('audBtn')}${I.arr}</button>
        <ul class="aud-steps">${[1, 2, 3].map(i => `<li>${t('aud' + i)}</li>`).join('')}</ul></div>
      <div class="aud-r">${ILL.radar()}</div></div></div></section>

    <section class="sec" id="cats"><div class="wrap">
      ${secHd('04', 'ctgEyebrow', 'ctgTitle')}
      <div class="ctg"><div class="ctg-tabs rv" role="tablist">${['I', 'II', 'III'].map((r, i) => `<button class="ctg-tab" type="button" role="tab" data-cat="${i}" aria-selected="${i === 0}"><b>${r}</b><span>${t('ctgTab')}</span><em>${catCount(i)} ${t('ctgCount')}</em></button>`).join('')}</div>
      <div class="ctg-panel" id="ctgp" role="tabpanel">${catPanel(0)}</div></div>
    </div></section>

    <section class="sec sec-alt" id="examples"><div class="wrap">
      ${secHd('05', 'exEyebrow', 'exTitle')}
      <div class="ex rv">${[1, 2, 3, 4].map(i => `<button type="button" data-lb="ex" data-i="${i - 1}" aria-label="${t('exTitle')} ${i}">${img('example' + i, t('exTitle') + ' ' + i)}<span class="lt-zoom">${I.zoom}</span></button>`).join('')}</div>
      <div class="ex-note rv">${I.shield}<span>${t('exSub')}</span></div>
    </div></section>

    <section class="sec" id="stats"><div class="wrap">
      <div class="sec-hd"><span class="eyebrow mono rv">${t('statsTitle')}</span></div>
      <div class="stats">${STATS.map(([n, k], i) => `<div class="stat rv" style="--i:${i}"><b><span data-count="${n}">${n}</span><i>+</i></b><span>${t(k)}</span></div>`).join('')}</div>
    </div></section>

    <section class="sec sec-alt" id="team"><div class="wrap">
      ${secHd('07', 'teamEyebrow', 'teamTitle', 'teamSub')}
      <div class="team">${TEAM.map(({ m, k }, i) => `<article class="tm rv" style="--i:${i % 3}"><div class="tm-img">${img(k, m[0])}</div><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p></article>`).join('')}</div>
    </div></section>

    <section class="sec" id="contacts"><div class="wrap con">
      <div><span class="eyebrow mono rv">${t('conTitle')}</span><h2 class="h2 rv" style="margin-top:18px">${t('conSub')}</h2>
        <a class="con-tel rv" href="${TEL_H}">${TEL}</a><a class="con-mail ul rv" href="mailto:${MAIL}">${MAIL}</a>
        <dl class="con-dl rv"><div><dt class="mono">${t('address')}</dt><dd>${t('addr')}</dd></div>
          <div><dt class="mono">${t('messengers')}</dt><dd><div class="soc"><a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><a href="${VK}" target="_blank" rel="noopener" aria-label="VK">${I.vk}</a></div></dd></div></dl></div>
      <div class="card-form rv" style="--i:1">${formHTML({ msg: true, btn: t('fSend') })}</div>
    </div></section>`;
  }

  function block(b, n) {
    const hd = (title, descr) => `<div class="blk-h"><span class="mono">§ ${pad2(n)}</span>${title ? `<h2 class="h3">${esc(title)}</h2>` : ''}${descr ? `<p>${esc(descr)}</p>` : ''}</div>`;
    const wrap = (h, body) => `<section class="blk rv">${h}<div>${body}</div></section>`;
    switch (b.k) {
      case 'text': return wrap(hd(b.title), `<div class="rich">${rich(b.text)}</div>`);
      case 'list': return wrap(hd(b.title, b.descr), `<ul class="chk-list">${b.items.map(it => `<li>${I.chk}<div>${esc(it.t || it.d)}${it.t && it.d ? `<small>${esc(it.d)}</small>` : ''}</div></li>`).join('')}</ul>`);
      case 'feat': return wrap(hd(b.title, b.descr), `<div class="feats">${b.items.map((it, i) => `<div class="feat"><span class="mono">${pad2(i + 1)}</span><h4>${esc(it.t || '')}</h4>${it.d ? `<div class="rich">${rich(it.d)}</div>` : ''}</div>`).join('')}</div>`);
      case 'steps': return wrap(hd(b.title), `<ol class="steps">${b.items.map((it, i) => `<li class="step"><b>${pad2(i + 1)}</b><div><h4>${esc(it.t)}</h4>${it.d ? `<p>${esc(it.d)}</p>` : ''}</div></li>`).join('')}</ol>`);
      case 'faq': return wrap(hd(''), `<div class="faq">${b.items.map(it => `<details><summary>${esc(it.t)}${I.plus}</summary><div class="rich">${rich(it.d)}</div></details>`).join('')}</div>`);
      case 'links': return wrap(hd(b.title, b.descr), `<div class="links">${b.items.map(it => it.slug ? `<a href="#/s/${it.slug}" data-nav>${esc(it.t)}${I.arr}</a>` : `<a>${esc(it.t)}</a>`).join('')}</div>`);
      case 'cards': return wrap(hd(b.title, b.descr), `<div class="lcards">${b.items.map(it => `<div class="lcard"><h4>${esc(it.t)}</h4><div class="rich">${rich(it.d)}</div><button class="btn btn-g btn-sm" type="button" data-modal="calc" data-ctx="${esc(it.t)}">${t('svCalc')}${I.arr}</button></div>`).join('')}</div>`);
      case 'note': return wrap(hd(''), `<div class="note rich">${rich(b.text)}</div>`);
      case 'head': return '';
      case 'progs': return wrap(hd(b.title), `<ul class="progs">${b.items.map(it => `<li><div>${esc(it.t)}</div><span>${esc(it.d)}</span></li>`).join('')}</ul>`);
      case 'mission': return wrap(hd(b.title), `<div class="rich"><p>${esc(b.text)}</p></div><a class="btn btn-g" style="margin-top:22px" href="${b.href}" target="_blank" rel="noopener">${esc(b.btn)}${I.arr}</a>`);
      case 'tags': return wrap(hd(b.title, b.descr), `<ul class="tags">${b.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`);
      case 'cta': return `<section class="cta-blk rv"><div><h3>${esc(b.title)}</h3><div class="rich">${rich(b.text)}</div></div><button class="btn" type="button" data-modal="cons">${t('cta')}${I.arr}</button></section>`;
    }
    return '';
  }
  function viewService(slug) {
    const i = IDX[slug], s = SVC[i], prev = SVC[(i + SVC.length - 1) % SVC.length], next = SVC[(i + 1) % SVC.length];
    const popI = POP.findIndex(p => p[0] === slug);
    const lead = SVLEAD[s.sym] ? SVLEAD[s.sym][li()] : popI >= 0 ? t('p' + (popI + 1) + 'd') : '';
    let n = 0;
    return `<section class="sv-hero"><div class="hero-grid"></div><div class="wrap">
      <nav class="crumbs mono fade-up" aria-label="Breadcrumb"><a href="#/" data-nav>${t('svHome')}</a><i></i><a href="#/@catalog:${s.g}" data-nav>${t('g_' + s.g)}</a><i></i><span>${esc(ab(s) || sName(s))}</span></nav>
      <div class="sv-grid"><div>
        ${ab(s) ? `<div class="sv-sym fade-up"><span><span>${t('g_' + s.g)}</span></span><b>${s.sym}</b></div>` : `<span class="eyebrow mono fade-up" style="margin-bottom:22px">${t('g_' + s.g)}</span>`}
        <h1 class="sv-h1 fade-up">${esc(sFull(s))}</h1>
        ${lead ? `<p class="lead fade-up">${esc(lead)}</p>` : ''}
        ${s.term || s.price ? `<div class="chips fade-up">${s.term ? `<div class="chip"><span class="mono">${t('term')}</span><b>${esc(fTerm(s))}</b></div>` : ''}${s.price ? `<div class="chip"><span class="mono">${t('price')}</span><b>${esc(fPrice(s))}</b></div>` : ''}</div>` : ''}
        <div class="sv-ill fade-up">${ILL[s.ill]()}</div></div>
        <aside class="card-form sv-form fade-up"><h3>${t('svOrderTitle')}</h3><p>${t('svOrderSub')}</p>${formHTML()}</aside></div>
    </div></section>
    <div class="sv-body"><div class="wrap">${lang !== 'ru' ? `<div class="notice">${I.info}<span>${t('svRuOnly')}</span></div>` : ''}
      ${s.blocks.map(b => { if (b.k !== 'cta' && b.k !== 'head') n++; return block(b, n); }).join('')}</div></div>
    <nav class="sv-nav"><a href="#/s/${prev.slug}" data-nav><span class="mono">${t('svPrev')}</span><b>${esc(sName(prev))}</b></a><a href="#/s/${next.slug}" data-nav><span class="mono">${t('svNext')}</span><b>${esc(sName(next))}</b></a></nav>`;
  }
  function viewDoc(k) {
    const d = D.docs[k];
    return `<section class="doc"><div class="wrap"><nav class="crumbs mono"><a href="#/" data-nav>${t('svHome')}</a><i></i><span>${t('ftLegal')}</span></nav>
      <h1>${esc(lang === 'ru' ? d.title : t('d_' + k))}</h1>${lang !== 'ru' ? `<div class="notice">${I.info}<span>${t('docRuOnly')}</span></div>` : ''}<div class="rich">${rich(d.text)}</div></div></section>`;
  }

  /* ---------- hero flow field ---------- */
  function heroFX(cv) {
    const ctx = cv.getContext('2d'); let w = 0, h = 0, dpr = 1, P = [], raf = 0, vis = true, t0 = 0, src = [];
    const mouse = { x: -1e4, y: -1e4 };
    const wind = { g: 0, tg: 0, bx: 0, by: 0, lx: 0, ly: 0, lt: 0, shown: 0, at: 0 };
    const DIRS = ['З', 'ЮЗ', 'Ю', 'ЮВ', 'В', 'СВ', 'С', 'СЗ'];
    const hw = document.getElementById('hudW'), hd = document.getElementById('hudD');
    const col = () => theme === 'dark' ? ['150,165,255', '201,247,58'] : ['53,45,95', '42,63,255'];
    const ang = (x, y, tm) => { const s = .0017; return (Math.sin(x * s * 1.25 + tm * .00013) + Math.cos(y * s * 2.1 - tm * .00017) + Math.sin((x + y) * s * .7 + tm * .00009)) * .78 - .22; };
    function spawn(p, init) {
      p.s = Math.random() < .34;
      if (p.s) { const q = src[(Math.random() * src.length) | 0]; p.x = q[0] + (Math.random() - .5) * 8; p.y = q[1] + (Math.random() - .5) * 8; p.v = 1.25 + Math.random() * .9; p.m = 240 + Math.random() * 300; p.j = (Math.random() - .5) * .9; }
      else { p.x = Math.random() * w; p.y = Math.random() * h; p.v = .5 + Math.random() * .7; p.m = 160 + Math.random() * 260; p.j = 0; }
      p.l = init ? Math.random() * p.m : 0;
    }
    function size() {
      const r = cv.getBoundingClientRect(); w = r.width; h = r.height; if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 1.75);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      src = srcPts().map(p => [p[0] * w, p[1] * h]);
      const n = Math.max(320, Math.min(1500, Math.round(w * h / 1250)));
      P = Array.from({ length: n }, () => { const p = {}; spawn(p, true); return p; });
      $$('.hud-src').forEach((el, i) => { const p = srcPts()[i]; el.style.left = p[0] * 100 + '%'; el.style.top = p[1] * 100 + '%'; });
      if (reduce) still();
    }
    function step(tm, fade) {
      if (fade) { ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.05)'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'source-over'; }
      const c = col(), paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      for (let i = 0; i < P.length; i++) {
        const p = P[i]; let a = ang(p.x, p.y, tm) + p.j * Math.min(1, p.l / 200);
        const gm = 1 + wind.g * 1.7;
        let vx = Math.cos(a) * p.v * gm + wind.bx * wind.g * 1.5, vy = Math.sin(a) * p.v * gm + wind.by * wind.g * 1.5;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 32400) { const d = Math.sqrt(d2) || 1, f = (1 - d / 180) * 2.4; vx += (dx / d) * f - (dy / d) * f * .6; vy += (dy / d) * f + (dx / d) * f * .6; }
        const nx = p.x + vx, ny = p.y + vy; p.l++;
        const e = Math.min(1, p.l / 40) * Math.min(1, (p.m - p.l) / 60);
        const k = (p.s ? 2 : 0) + (e > .6 ? 1 : 0);
        paths[k].moveTo(p.x, p.y); paths[k].lineTo(nx, ny);
        p.x = nx; p.y = ny;
        if (p.l > p.m || nx < -20 || nx > w + 20 || ny < -20 || ny > h + 20) spawn(p, false);
      }
      const dk = theme === 'dark';
      ctx.lineWidth = 1; ctx.strokeStyle = `rgba(${c[0]},${dk ? .1 : .09})`; ctx.stroke(paths[0]);
      ctx.strokeStyle = `rgba(${c[0]},${dk ? .26 : .2})`; ctx.stroke(paths[1]);
      ctx.lineWidth = 1.25; ctx.strokeStyle = `rgba(${c[1]},${dk ? .3 : .28})`; ctx.stroke(paths[2]);
      ctx.strokeStyle = `rgba(${c[1]},${dk ? .85 : .75})`; ctx.stroke(paths[3]);
    }
    function still() { ctx.clearRect(0, 0, w, h); for (let i = 0; i < 260; i++) step(i * 16, i % 3 === 0); }
    let lt = 0, acc = 0, fr = 0;
    function gust(tm) {
      wind.g += (wind.tg - wind.g) * (wind.tg > wind.g ? .16 : .035); wind.tg *= .93;
      if (tm - wind.at < 90 || !hw) return; wind.at = tm;
      const v = 3.2 + Math.sin(tm * .0011) * .18 + wind.g * 14.4;
      if (Math.abs(v - wind.shown) > .04) { wind.shown = v; hw.textContent = v.toFixed(1); }
      // wind is named by where it blows from: opposite to the flow direction
      const fx = .8 + wind.bx * wind.g * 3, fy = -.6 + wind.by * wind.g * 3;
      const d = DIRS[((Math.round(Math.atan2(-fy, fx) / (Math.PI / 4)) % 8) + 8) % 8];
      if (hd.textContent !== d) hd.textContent = d;
    }
    function loop(tm) { raf = 0; if (!vis) return; gust(tm); if (!t0) t0 = tm; if (lt) { const d = tm - lt; if (d < 200) { acc += d; fr++; } if (fr >= 45) { if (acc / fr > 26 && P.length > 240) P.length = Math.max(240, Math.round(P.length * .65)); acc = fr = 0; } } lt = tm; step(tm, true); raf = requestAnimationFrame(loop); }
    const play = () => { if (!raf && vis && !reduce && !document.hidden) { lt = 0; raf = requestAnimationFrame(loop); } };
    const io = new IntersectionObserver(e => { vis = e[0].isIntersecting; play(); });
    io.observe(cv);
    const onMove = e => {
      const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      const now = performance.now(), dt = now - wind.lt;
      if (wind.lt && dt > 0 && dt < 120) { const dx = e.clientX - wind.lx, dy = e.clientY - wind.ly, sp = Math.hypot(dx, dy) / dt; wind.tg = Math.max(wind.tg, Math.min(1, sp / 2.2)); if (sp > .05) { const l = Math.hypot(dx, dy) || 1; wind.bx += (dx / l - wind.bx) * .2; wind.by += (dy / l - wind.by) * .2; } }
      wind.lx = e.clientX; wind.ly = e.clientY; wind.lt = now;
    };
    const onLeave = () => { mouse.x = mouse.y = -1e4; };
    const onVis = () => play();
    let rt; const onRes = () => { clearTimeout(rt); rt = setTimeout(() => { const r = cv.getBoundingClientRect(); if (Math.abs(r.width - w) > 2 || Math.abs(r.height - h) > 120) size(); }, 180); };
    const host = cv.parentElement;
    host.addEventListener('pointermove', onMove, { passive: true }); host.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis); addEventListener('resize', onRes);
    size(); play();
    return { destroy() { cancelAnimationFrame(raf); io.disconnect(); host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); document.removeEventListener('visibilitychange', onVis); removeEventListener('resize', onRes); }, repaint() { if (reduce) still(); else ctx.clearRect(0, 0, w, h); } };
  }

  /* ---------- per-view behaviours ---------- */
  let fx = null, obs = [], route = null;
  function count(el) {
    const n = +el.dataset.count, plus = el.textContent.includes('+'); if (reduce) return;
    const d = 1500, s = performance.now();
    const f = now => { const k = Math.min(1, (now - s) / d), v = Math.round(n * (1 - Math.pow(1 - k, 4))); el.textContent = v + (plus ? '+' : ''); if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }
  function initView() {
    obs.forEach(o => o.disconnect()); obs = []; if (fx) { fx.destroy(); fx = null; }
    const app = $('#app');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .06 });
    $$('.rv', app).forEach(el => io.observe(el)); obs.push(io);
    const cio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } }), { threshold: .4 });
    $$('[data-count]', app).forEach(el => cio.observe(el)); obs.push(cio);
    const cv = $('.hero-cv', app); if (cv) fx = heroFX(cv);
    const car = $('#car'); if (car) initCar(car);
    document.body.classList.remove('is-ready'); void document.body.offsetWidth; requestAnimationFrame(() => document.body.classList.add('is-ready'));
    onScroll();
  }
  function initCar(car) {
    const bar = $('.car-bar i'), btns = $$('[data-car]');
    const upd = () => { const max = car.scrollWidth - car.clientWidth, f = car.clientWidth / car.scrollWidth, p = max > 0 ? car.scrollLeft / max : 0; if (bar) { bar.style.width = (f * 100) + '%'; bar.style.left = (p * (1 - f) * 100) + '%'; } if (btns[0]) { btns[0].disabled = car.scrollLeft < 4; btns[1].disabled = car.scrollLeft > max - 4; } };
    car.addEventListener('scroll', upd, { passive: true }); upd();
    let down = false, sx = 0, sl = 0, moved = 0;
    car.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = car.scrollLeft; moved = 0; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); if (moved > 6) { car.classList.add('drag'); car.scrollLeft = sl - dx; } });
    addEventListener('pointerup', () => { if (!down) return; down = false; if (car.classList.contains('drag')) { car.classList.remove('drag'); car.dataset.sup = '1'; setTimeout(() => delete car.dataset.sup, 60); } });
    car.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---------- router ---------- */
  function parse() {
    const h = location.hash.replace(/^#\/?/, '');
    if (h.startsWith('s/') && IDX[h.slice(2)] != null) return { v: 'svc', k: h.slice(2) };
    if (h.startsWith('docs/') && D.docs[h.slice(5)]) return { v: 'doc', k: h.slice(5) };
    if (h.startsWith('@')) { const [a, f] = h.slice(1).split(':'); return { v: 'home', a, f }; }
    return { v: 'home' };
  }
  function title(r) {
    const base = lang === 'ru' ? 'НИЦ Лаборо' : 'LABORO';
    document.title = r.v === 'svc' ? `${sName(SVC[IDX[r.k]])} — ${base}` : r.v === 'doc' ? `${t('d_' + r.k)} — ${base}` : `${base} — ${t('heroH1a')} ${t('heroH1b')}`;
  }
  function paint(r) {
    $('#app').innerHTML = r.v === 'svc' ? viewService(r.k) : r.v === 'doc' ? viewDoc(r.k) : viewHome();
    document.body.dataset.view = r.v; title(r); initView();
  }
  function toAnchor(r, smooth) {
    if (r.f) setFilter(r.f);
    const el = r.a && document.getElementById(r.a);
    const y = el ? el.getBoundingClientRect().top + scrollY - (r.a === 'top' ? 0 : parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) - 1) : 0;
    scrollTo({ top: Math.max(0, y), behavior: smooth && !reduce ? 'smooth' : 'auto' });
  }
  let busy = false;
  function go() {
    const r = parse(); closeAll();
    const same = route && route.v === r.v && route.k === r.k;
    if (same) { route = r; toAnchor(r, true); return; }
    const first = !route; route = r;
    if (first || reduce) { paint(r); toAnchor(r, false); if (first && r.a && document.fonts && document.fonts.ready) { const fix = () => { if (route === r && scrollY > 0) toAnchor(r, false); }; document.fonts.ready.then(() => { fix(); setTimeout(fix, 350); }); } return; }
    if (busy) return; busy = true;
    const cur = $('.curtain'); cur.classList.add('on');
    setTimeout(() => { paint(route); toAnchor(route, false); requestAnimationFrame(() => setTimeout(() => { cur.classList.remove('on'); busy = false; }, 120)); }, 300);
  }
  function setFilter(g) {
    $$('[data-filter]').forEach(b => b.setAttribute('aria-selected', b.dataset.filter === g));
    $$('.pt .cell').forEach(c => c.classList.toggle('off', g !== 'all' && c.dataset.g !== g));
    const em = $('.pt-empty'); if (em) em.hidden = true; const si = $('[data-search]'); if (si) si.value = ''; $$('.pt .cell.hide').forEach(c => c.classList.remove('hide'));
  }

  /* ---------- overlays ---------- */
  let lastFocus = null;
  const lock = on => { const sw = innerWidth - document.documentElement.clientWidth; document.body.classList.toggle('lock', on); document.body.style.paddingRight = on && sw > 0 ? sw + 'px' : ''; $('#hdr').style.paddingRight = on && sw > 0 ? sw + 'px' : ''; };
  function openModal(kind, ctx) {
    const m = $('#modal'), map = { cons: ['mConsTitle', 'mConsSub'], audit: ['mAudTitle', 'mAudSub'], calc: ['mCalcTitle', 'svOrderSub'] }[kind] || ['mConsTitle', 'mConsSub'];
    $('.modal-in', m).innerHTML = `<h3>${t(map[0])}</h3><p>${ctx ? `<b>${esc(ctx)}.</b> ` : ''}${t(map[1])}</p>${formHTML({ msg: kind !== 'cons' })}`;
    showOverlay(m);
  }
  let LB = { set: [], i: 0 };
  function openLB(kind, i) {
    LB.set = kind === 'thanks' ? THX.map(x => ({ src: A[x.k], cap: x.n })) : [1, 2, 3, 4].map(j => ({ src: A['example' + j], cap: t('exTitle') }));
    LB.i = i; drawLB(); showOverlay($('#lb'));
  }
  function drawLB() { const it = LB.set[LB.i], lb = $('#lb'); $('img', lb).src = it.src; $('img', lb).alt = it.cap; $('.lb-cap', lb).innerHTML = `<span>${pad2(LB.i + 1)} / ${pad2(LB.set.length)}</span>${esc(it.cap)}`; }
  const stepLB = d => { LB.i = (LB.i + d + LB.set.length) % LB.set.length; drawLB(); };
  function showOverlay(m) { lastFocus = document.activeElement; closeMenus(); m.classList.add('on'); m.setAttribute('aria-hidden', 'false'); lock(true); setTimeout(() => { const f = $('input,button.x', m); if (f && matchMedia('(hover:hover)').matches) f.focus({ preventScroll: true }); }, 60); }
  function closeOverlays() { let was = false; $$('.modal.on').forEach(m => { m.classList.remove('on'); m.setAttribute('aria-hidden', 'true'); was = true; }); if (was) { lock(false); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); } }
  function closeMenus() {
    $('#mega').classList.remove('on'); $('#scrim').classList.remove('on'); const mb = $('[data-mega]'); if (mb) mb.setAttribute('aria-expanded', 'false');
    if ($('#mnav').classList.contains('on')) { $('#mnav').classList.remove('on'); const b = $('[data-burger]'); if (b) b.setAttribute('aria-expanded', 'false'); lock(false); }
    onScroll();
  }
  const closeAll = () => { closeOverlays(); closeMenus(); };
  function toggleMega(on) { const m = $('#mega'); on = on == null ? !m.classList.contains('on') : on; if (!on) return closeMenus(); m.classList.add('on'); $('#scrim').classList.add('on'); $('[data-mega]').setAttribute('aria-expanded', 'true'); $('#hdr').classList.add('is-solid'); $('#hdr').classList.remove('is-hidden'); }

  /* ---------- global events ---------- */
  let lastY = 0, ticking = false;
  function onScroll() {
    const y = scrollY, hdr = $('#hdr'), open = $('#mega').classList.contains('on') || $('#mnav').classList.contains('on');
    hdr.classList.toggle('is-solid', y > 24 || open);
    if (!open) hdr.classList.toggle('is-hidden', y > 520 && y > lastY + 4 ? true : y < lastY - 4 || y < 520 ? false : hdr.classList.contains('is-hidden'));
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight; $('.prog').style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    $('#fab').classList.toggle('off', y < 500);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  addEventListener('hashchange', go);
  let megaT;
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    if (e.target.closest('[data-mega]')) { clearTimeout(megaT); toggleMega(true); }
    else if (e.target.closest('#mega')) clearTimeout(megaT);
    else if ($('#mega').classList.contains('on') && !e.target.closest('#hdr')) { clearTimeout(megaT); megaT = setTimeout(closeMenus, 220); }
    const sp = e.target.closest('[data-spot]');
    if (sp) { const r = sp.getBoundingClientRect(); sp.style.setProperty('--mx', (e.clientX - r.left) + 'px'); sp.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
  });
  document.addEventListener('pointermove', e => { const sp = e.target.closest && e.target.closest('[data-spot]'); if (sp) { const r = sp.getBoundingClientRect(); sp.style.setProperty('--mx', (e.clientX - r.left) + 'px'); sp.style.setProperty('--my', (e.clientY - r.top) + 'px'); } }, { passive: true });
  document.addEventListener('click', e => {
    const q = s => e.target.closest(s); let el;
    if ((el = q('[data-lb]'))) { const car = el.closest('.car'); if (car && car.dataset.sup) return; openLB(el.dataset.lb, +el.dataset.i); return; }
    if ((el = q('[data-modal]'))) { openModal(el.dataset.modal, el.dataset.ctx); return; }
    if (q('[data-close]') || e.target.classList.contains('modal-bg') || e.target.classList.contains('lb-stage')) { closeOverlays(); return; }
    if ((el = q('[data-lbn]'))) { stepLB(+el.dataset.lbn); return; }
    if (q('[data-theme-toggle]')) { setTheme(theme === 'dark' ? 'light' : 'dark'); return; }
    if (q('[data-mega]')) { toggleMega(); return; }
    if (e.target.id === 'scrim') { closeMenus(); return; }
    if ((el = q('[data-burger]'))) { const m = $('#mnav'), on = !m.classList.contains('on'); if (!on) return closeMenus(); m.classList.add('on'); el.setAttribute('aria-expanded', 'true'); lock(true); $('#hdr').classList.remove('is-hidden'); $('#hdr').classList.add('is-solid'); return; }
    if ((el = q('[data-acc]'))) { const on = el.getAttribute('aria-expanded') !== 'true'; el.setAttribute('aria-expanded', on); el.nextElementSibling.classList.toggle('on', on); return; }
    if ((el = q('[data-filter]'))) { setFilter(el.dataset.filter); return; }
    if ((el = q('[data-cat]'))) { $$('[data-cat]').forEach(b => b.setAttribute('aria-selected', b === el)); $('#ctgp').innerHTML = catPanel(+el.dataset.cat); return; }
    if ((el = q('[data-car]'))) { const car = $('#car'); car.scrollBy({ left: +el.dataset.car * Math.max(280, car.clientWidth * .7), behavior: reduce ? 'auto' : 'smooth' }); return; }
    if (q('[data-top]')) { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); return; }
    if (q('[data-cookie]')) { $('#cookie').classList.remove('on'); store.set('lb1b-cookie', '1'); return; }
    if ((el = q('a[data-nav]'))) { if (el.getAttribute('href') === location.hash || (el.getAttribute('href') === '#/' && !location.hash)) { e.preventDefault(); go(); } }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
    if ($('#lb').classList.contains('on')) { if (e.key === 'ArrowRight') stepLB(1); if (e.key === 'ArrowLeft') stepLB(-1); }
    if (e.key === 'Tab') { const m = $('.modal.on'); if (m) { const f = $$('a[href],button:not([disabled]),input,textarea', m).filter(x => x.offsetParent !== null); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } else if (!m.contains(document.activeElement)) { e.preventDefault(); a.focus(); } } }
  });
  document.addEventListener('input', e => {
    const el = e.target; if (el.matches('[data-phone]')) el.value = maskPhone(el.value);
    const w = el.closest('.fld,.chk'); if (w) w.classList.remove('err');
  });
  document.addEventListener('input', e => {
    if (!e.target.matches('[data-search]')) return; const q = e.target.value.trim().toLowerCase(); let n = 0;
    $$('[data-filter]').forEach(b => b.setAttribute('aria-selected', b.dataset.filter === 'all'));
    $$('.pt .cell').forEach(c => { const hit = !q || c.dataset.q.includes(q); c.classList.toggle('hide', !hit); c.classList.remove('off'); if (hit) n++; });
    const em = $('.pt-empty'); if (em) em.hidden = n > 0;
  });
  document.addEventListener('focusin', e => { if (e.target.matches('[data-phone]') && !e.target.value) e.target.value = '+7 ('; });
  document.addEventListener('focusout', e => { if (e.target.matches('[data-phone]') && e.target.value.replace(/\D/g, '').length < 2) e.target.value = ''; });
  document.addEventListener('submit', e => {
    const f = e.target.closest('[data-form]'); if (!f) return; e.preventDefault();
    const name = f.elements.name, ph = f.elements.phone, c1 = f.elements.c1; let ok = true;
    const bad = (el, b) => { el.closest('.fld,.chk').classList.toggle('err', b); if (b && ok) { ok = false; el.focus(); } };
    bad(name, name.value.trim().length < 2); bad(ph, ph.value.replace(/\D/g, '').length !== 11); bad(c1, !c1.checked);
    if (ok) f.classList.add('sent');
  });
  addEventListener('resize', () => { if (innerWidth > 1180 && $('#mnav').classList.contains('on')) closeMenus(); });

  /* ---------- lang / theme ---------- */
  function setTheme(v) {
    theme = v; store.set('lb1b-theme', v); document.documentElement.dataset.theme = v;
    const mc = $('meta[name=theme-color]'); if (mc) mc.content = v === 'dark' ? '#0b0a1c' : '#f3f2ec';
    if (fx) fx.repaint();
  }

  /* ---------- boot ---------- */
  document.documentElement.dataset.theme = theme;
  try { history.scrollRestoration = 'manual'; } catch (e) { }
  renderShell(); go();
  if (!store.get('lb1b-cookie')) setTimeout(() => $('#cookie').classList.add('on'), 1800);
})();
