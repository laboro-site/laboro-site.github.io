  /* ---------- shell (v3) ---------- */
  const groupList = g => SVC.filter(s => s.g === g);
  let vid = 0;
  const VIS = {
    plume: () => { const u = 'p' + (++vid); return `<svg class="vis" viewBox="20 0 600 430" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs>
      <linearGradient id="${u}a" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3d6bff"/><stop offset=".5" stop-color="#19b8f0"/><stop offset="1" stop-color="#2bd47d" stop-opacity="0"/></linearGradient>
      <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5a66"/><stop offset="1" stop-color="#1b1b20"/></linearGradient>
      <filter id="${u}f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="16"/></filter></defs>
      <g filter="url(#${u}f)" opacity=".95"><path class="v-drift" d="M170 250C230 150 330 150 420 110S560 40 640 10" fill="none" stroke="url(#${u}a)" stroke-width="64" stroke-linecap="round"/><path class="v-drift d2" d="M250 290C320 220 400 230 470 190S590 130 660 120" fill="none" stroke="url(#${u}a)" stroke-width="46" stroke-linecap="round" opacity=".8"/></g>
      <g fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5" stroke-linecap="round"><path class="v-dash" d="M170 250C230 150 330 150 420 110S560 40 640 10" stroke-dasharray="3 14"/><path class="v-dash" d="M250 290C320 220 400 230 470 190S590 130 660 120" stroke-dasharray="3 14"/></g>
      <rect x="140" y="230" width="58" height="180" rx="12" fill="url(#${u}b)"/><rect x="222" y="272" width="54" height="138" rx="12" fill="url(#${u}b)"/><rect x="60" y="300" width="56" height="110" rx="12" fill="url(#${u}b)"/>
      <rect x="140" y="230" width="58" height="12" rx="6" fill="#8a8a96"/><rect x="222" y="272" width="54" height="12" rx="6" fill="#8a8a96"/><rect x="60" y="300" width="56" height="12" rx="6" fill="#8a8a96"/>
      <g fill="#fff"><circle class="v-pulse" cx="420" cy="110" r="7"/><circle class="v-pulse d2" cx="520" cy="62" r="7"/><circle class="v-pulse d3" cx="470" cy="190" r="7"/></g></svg>`; },
    limits: () => { const u = 'l' + (++vid); return `<svg class="vis" viewBox="10 60 590 372" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#19b8f0"/><stop offset="1" stop-color="#3d6bff"/></linearGradient>
      <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb340"/><stop offset="1" stop-color="#ff5e3a"/></linearGradient></defs>
      ${[150, 210, 120, 250, 180, 318, 160, 230].map((h, i) => `<rect class="v-bar d${i % 4 + 1}" x="${44 + i * 66}" y="${420 - h}" width="46" height="${h}" rx="23" fill="url(#${u}${i === 5 ? 'b' : 'a'})"/>`).join('')}
      <path d="M20 118H580" stroke="currentColor" stroke-opacity=".5" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>
      <g transform="translate(520 92)"><rect x="-34" y="-17" width="68" height="30" rx="15" fill="currentColor"/><text x="0" y="4" text-anchor="middle" font-size="13" font-weight="700" fill="var(--tile)">НДВ</text></g></svg>`; },
    zone: full => { const u = 'z' + (++vid); return `<svg class="vis" viewBox="50 -20 500 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2bd47d"/><stop offset="1" stop-color="#19b8f0"/></linearGradient>
      <radialGradient id="${u}g"><stop offset="0" stop-color="#2bd47d" stop-opacity=".55"/><stop offset="1" stop-color="#2bd47d" stop-opacity="0"/></radialGradient></defs>
      <circle cx="300" cy="230" r="230" fill="url(#${u}g)"/>
      <g fill="none" stroke="url(#${u}a)"><circle cx="300" cy="230" r="210" stroke-width="1.5" stroke-dasharray="2 12" stroke-linecap="round" class="v-spin"/><circle cx="300" cy="230" r="158" stroke-width="2" opacity=".55"/><circle cx="300" cy="230" r="106" stroke-width="3" opacity=".8"/><circle class="v-ring" cx="300" cy="230" r="60" stroke-width="5"/></g>
      <rect x="268" y="198" width="64" height="64" rx="16" fill="#fff"/><path d="M286 240v-18l14-9 14 9v18z" fill="none" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
      <g fill="#fff"><circle cx="142" cy="230" r="6"/><circle cx="458" cy="230" r="6"/><circle cx="300" cy="72" r="6"/></g></svg>`; },
    waste: () => { const u = 'w' + (++vid); const hx = (cx, cy, r) => { let p = ''; for (let i = 0; i < 6; i++) { const a = Math.PI / 180 * (60 * i - 90); p += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); } return p + 'Z'; };
      const C = [['#ff5e3a', '#ff2d55', 'I'], ['#ffb340', '#ff7a1a', 'II'], ['#ffe14d', '#ffb800', 'III'], ['#5fe08a', '#17b26a', 'IV'], ['#5ac8fa', '#3d6bff', 'V']], P = [[150, 190], [300, 190], [450, 190], [225, 320], [375, 320]];
      return `<svg class="vis" viewBox="50 92 500 332" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs>${C.map((c, i) => `<linearGradient id="${u}${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('')}</defs>
      ${P.map((p, i) => `<g class="v-bob d${i % 3 + 1}"><path d="${hx(p[0], p[1] + 12, 78)}" fill="${C[i][1]}" opacity=".35"/><path d="${hx(p[0], p[1], 78)}" fill="url(#${u}${i})" stroke-linejoin="round" stroke="url(#${u}${i})" stroke-width="10"/><text x="${p[0]}" y="${p[1] + 14}" text-anchor="middle" font-size="40" font-weight="700" fill="#fff">${C[i][2]}</text></g>`).join('')}</svg>`; },
    lab: () => { const u = 'b' + (++vid); return `<svg class="vis" viewBox="110 50 380 364" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c86bff"/><stop offset=".55" stop-color="#ff5e8a"/><stop offset="1" stop-color="#ffb340"/></linearGradient>
      <linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></linearGradient>
      <clipPath id="${u}c"><path d="M262 70V168L152 372Q140 400 172 400H428Q460 400 448 372L338 168V70Z"/></clipPath></defs>
      <g clip-path="url(#${u}c)"><rect x="100" y="250" width="400" height="200" fill="url(#${u}a)"/><path class="v-wave" d="M60 262Q140 236 220 262T380 262T540 262T700 262V300H60Z" fill="url(#${u}a)"/><g fill="#fff" fill-opacity=".75"><circle class="v-rise" cx="250" cy="370" r="9"/><circle class="v-rise d2" cx="330" cy="380" r="6"/><circle class="v-rise d3" cx="290" cy="360" r="12"/></g></g>
      <path d="M262 70V168L152 372Q140 400 172 400H428Q460 400 448 372L338 168V70" fill="none" stroke="url(#${u}g)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M244 70H356" stroke="url(#${u}g)" stroke-width="7" stroke-linecap="round"/><path d="M236 250l-36 68" stroke="#fff" stroke-opacity=".7" stroke-width="7" stroke-linecap="round"/></svg>`; },
    report: () => { const u = 'r' + (++vid); return `<svg class="vis" viewBox="120 56 430 440" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs>
      <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e6e6ee"/></linearGradient>
      <linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fe08a"/><stop offset="1" stop-color="#17b26a"/></linearGradient></defs>
      <g class="v-bob d3"><rect x="150" y="120" width="250" height="330" rx="26" style="fill:var(--sh,#fff)" opacity=".35" transform="rotate(-10 275 285)"/></g>
      <g class="v-bob d2"><rect x="185" y="100" width="250" height="330" rx="26" style="fill:var(--sh,#fff)" opacity=".6" transform="rotate(-4 310 265)"/></g>
      <g class="v-bob"><rect x="220" y="84" width="250" height="340" rx="26" style="fill:var(--sh,#fff);stroke:var(--sh-b,transparent)" stroke-width="1.5"/>
      ${[0, 1, 2, 3].map(i => `<circle cx="258" cy="${148 + i * 54}" r="13" fill="url(#${u}b)"/><path d="M252 ${148 + i * 54}l4.500 4.500 8-9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="284" y="${141 + i * 54}" width="${[150, 120, 158, 104][i]}" height="14" rx="7" style="fill:var(--sh-l,#c9c9d4)"/>`).join('')}
      <circle cx="462" cy="418" r="56" fill="url(#${u}b)" style="stroke:var(--tile)" stroke-width="8"/><path d="M439 419l16 16 31-36" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`; },
  };
  VIS.expert = VIS.report; VIS.edu = VIS.report;
  function renderShell() {
    const themeBtn = `<button class="ic-btn theme-btn" type="button" data-theme-toggle aria-label="${t('theme')}">${I.sun}${I.moon}</button>`;
    $('#hdr').innerHTML = `<div class="hdr-in">
      <a class="logo" href="#/" data-nav aria-label="Лаборо">${img('logo', 'НИЦ Лаборо', 'width="400" height="167" loading="eager"')}</a>
      <nav class="nav" aria-label="Main">
        <button type="button" data-mega aria-expanded="false" aria-controls="mega">${t('navServices')}${I.dn}</button>
        <a href="#/@prices" data-nav>Цены</a><a href="#/@story" data-nav>Как работаем</a><a href="#/@audit" data-nav>${t('navAudit')}</a><a href="#/@cats" data-nav>${t('navCats')}</a><a href="#/@team" data-nav>${t('navTeam')}</a><a href="#/@contacts" data-nav>${t('navContacts')}</a>
      </nav>
      <div class="hdr-r"><a class="hdr-tel" href="${TEL_H}">${TEL}</a>${themeBtn}<button class="btn btn-p btn-sm" type="button" data-modal="cons">${t('ctaShort')}</button>
        <button class="burger" type="button" data-burger aria-expanded="false" aria-controls="mnav" aria-label="${t('menu')}"><i></i><i></i></button></div></div>`;
    $('#mega').innerHTML = `<div class="mega-in">${D.groups.map(([g]) => `<div class="${g === 'pr' ? 'mega-pr' : ''}"><h4>${t('g_' + g)}</h4><ul>${groupList(g).map(s => `<li><a href="#/s/${s.slug}" data-nav>${esc(sName(s))}</a></li>`).join('')}</ul></div>`).join('')}</div>`;
    $('#mnav').innerHTML = `<ul class="mnav-list">
      <li><button type="button" data-acc aria-expanded="false">${t('navServices')}${I.plus}</button><div class="mnav-sub"><div><div>${D.groups.map(([g]) => `<h5>${t('g_' + g)}</h5>${groupList(g).map(s => `<a href="#/s/${s.slug}" data-nav>${esc(sName(s))}</a>`).join('')}`).join('')}</div></div></div></li>
      ${[['prices', 'Цены'], ['story', 'Как работаем'], ['audit', t('navAudit')], ['cats', t('navCats')], ['team', t('navTeam')], ['contacts', t('navContacts')]].map(([a, k]) => `<li><a href="#/@${a}" data-nav>${k}</a></li>`).join('')}</ul>
      <div class="mnav-ft"><div class="row"><a class="mnav-tel" href="${TEL_H}">${TEL}</a>${themeBtn}</div>
      <button class="btn btn-p btn-w" type="button" data-modal="cons">${t('cta')}</button></div>`;
    $('#ft').innerHTML = `<div class="wrap"><p class="ft-note">${t('ftConcept')}. Сроки и цены взяты с действующего сайта компании; точную стоимость называют после знакомства с объектом.</p>
      <div class="ft-top">${D.groups.map(([g]) => `<div><h5>${t('g_' + g)}</h5><ul>${groupList(g).slice(0, 9).map(s => `<li><a href="#/s/${s.slug}" data-nav>${esc(sName(s))}</a></li>`).join('')}</ul></div>`).join('')}
        <div><h5>${t('ftLegal')}</h5><ul>${['personal', 'ad', 'privacy', 'cookies'].map(k => `<li><a href="#/docs/${k}" data-nav>${t('d_' + k)}</a></li>`).join('')}</ul>
        <h5 style="margin-top:22px">${t('navContacts')}</h5><ul><li><a href="${TEL_H}">${TEL}</a></li><li><a href="mailto:${MAIL}">${MAIL}</a></li></ul></div></div>
      <div class="ft-bot"><span>${t('ftCopy')}</span><span>${t('addr')}</span></div></div>`;
    $('#fab').innerHTML = `<a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><button type="button" data-top aria-label="${t('toTop')}">${I.up}</button>`;
    $('#cookie').innerHTML = `<span>${t('cookie')} <a href="#/docs/cookies" data-nav>${t('more')}</a></span><button class="btn btn-p btn-sm" type="button" data-cookie>${t('ok')}</button>`;
  }

  /* ---------- views (v3) ---------- */
  const POP = [['otchet-ob-inventarizacii-istochnikov-vybrosov', 'plume', 't_1m', 'dark t-wide'], ['proekt-ndv', 'limits', 't_2m', ''], ['proekt-sanitarno-zashchitnoy-zony', 'zone', 't_3m', 'dark'], ['proekt-noolr', 'waste', 't_1m', ''], ['laboratornye-issledovaniya', 'lab', 't_1d', 'dark'], ['ekologicheskoe-soprovozhdenie-pod-klyuch', 'report', 't_1d', 'grad t-wide']];
  const STATS = [[20, 'st1'], [150, 'st2'], [650, 'st3'], [950, 'st4']];
  const STORY = [['Выезд на объект', 'Приезжаем, изучаем территорию и документацию, отбираем пробы и делаем замеры.'], ['Расчёты и проект', 'Получаем справки, считаем нормативы и лимиты, готовим проектную документацию.'], ['Согласование', 'Проходим экспертизу и получаем заключения в надзорных органах.'], ['Сдача и сопровождение', 'Передаём готовый комплект и, если нужно, ведём отчётность объекта под ключ.']];
  const LAYERS = [['Исходные данные', 'Справки, замеры, инвентаризация'], ['Расчёты', 'Нормативы, лимиты, рассеивание'], ['Проект', 'Документ по требованиям закона'], ['Заключение', 'Экспертиза и согласование']];
  const srcPts = () => [];
  const more = (href, txt, nav = true) => `<a class="more" href="${href}" ${nav ? 'data-nav' : ''}>${txt}<svg viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1.500 1l5 5-5 5"/></svg></a>`;
  function catPanel(i) {
    const c = CATS[i], notes = [];
    const row = ([k, nk]) => { let sup = ''; if (nk) { let j = notes.indexOf(nk); if (j < 0) { notes.push(nk); j = notes.length - 1; } sup = `<sup>${j + 1}</sup>`; } return `<li class="ctg-list-i">${I.chk}<span>${esc(CDOC[k][0])}${sup}</span></li>`; };
    const docs = c.docs.map(row).join(''), rep = c.rep.map(k => row([k])).join(''), opt = c.opt.map(row).join('');
    return `<div class="ctg-cols"><div class="tile"><h4>${t('ctgDocs')}<b>${c.docs.length}</b></h4><ul class="ctg-list">${docs}</ul></div>
      <div class="ctg-r"><div class="tile"><h4>${t('ctgRep')}<b>${c.rep.length}</b></h4><ul class="ctg-list">${rep}</ul></div><div class="tile"><h4>${t('ctgOpt')}<b>${c.opt.length}</b></h4><ul class="ctg-list">${opt}</ul></div></div></div>
      <ul class="ctg-notes">${notes.map((k, j) => `<li><b>${j + 1}</b><span>${esc(CNOTE[k][0])}</span></li>`).join('')}</ul>
      <div class="center"><button class="btn btn-p" type="button" data-modal="calc">${t('ctgBtn')}</button></div>`;
  }
  const catCount = i => CATS[i].docs.length + CATS[i].rep.length + CATS[i].opt.length;
  const paper = i => `<div class="pg"><div class="pg-h"><b>Lã</b><span>${['Исходные данные', 'Расчёт нормативов', 'Проект НДВ', 'Экспертное заключение'][i]}</span></div>
    ${i === 1 ? `<div class="pg-bars">${[40, 62, 34, 78, 52, 66].map(h => `<i style="height:${h}%"></i>`).join('')}</div>` : i === 0 ? `<div class="pg-grid">${Array.from({ length: 12 }, () => '<i></i>').join('')}</div>` : `<div class="pg-l">${[90, 76, 84, 60, 88, 70].map(w => `<i style="width:${w}%"></i>`).join('')}</div>`}
    ${i === 3 ? `<div class="pg-seal">${I.chk}</div>` : `<div class="pg-l">${[80, 64].map(w => `<i style="width:${w}%"></i>`).join('')}</div>`}</div>`;

  function viewHome() {
    const svc = k => SVC[IDX[k]];
    return `
    <section class="hero" id="top" data-scrub><div class="hero-pin">
      <div class="hero-tx"><p class="eyebrow fade-up">НИЦ Лаборо</p><h1 class="h1 fade-up">Экологическая<br><span class="gt">документация</span></h1>
        <p class="hero-sub fade-up">Проекты, отчётность и лаборатория — от выезда на объект до согласования.</p>
        <div class="hero-cta fade-up"><button class="btn btn-p" type="button" data-modal="cons">${t('cta')}</button>${more('#/@prices', 'Услуги и цены')}</div></div>
      <div class="stage hero-cv fade-up" aria-hidden="true"><div class="stage-in">${[0, 1, 2, 3].map(i => `<div class="ly" style="--n:${i}">${paper(i)}</div>`).join('')}</div>
        <ul class="callouts">${LAYERS.map((l, i) => `<li style="--n:${i}"><b>${l[0]}</b><span>${l[1]}</span></li>`).join('')}</ul></div>
      <p class="hero-cap">Каждый проект — четыре слоя работы</p>
    </div></section>

    <section class="sec" id="intro"><div class="wrap center">
      <h2 class="h2 rv">Вся экологическая документация —<br><span class="mut">одна команда</span></h2>
      <p class="lead rv">${t('heroLead')}</p>
      <div class="stats rv">${STATS.map(([n, k]) => `<div class="stat"><b class="gt"><span data-count="${n}">${n}</span>+</b><span>${t(k)}</span></div>`).join('')}</div>
    </div></section>

    <section class="sec alt" id="popular"><div class="wrap">
      <div class="sec-hd"><h2 class="h2 rv">Популярные услуги</h2><p class="sub rv">С этими задачами к нам приходят чаще всего.</p></div>
      <div class="bento">${POP.map(([k, v, tk, cls], i) => { const s = svc(k); return `<article class="tile bt ${cls} rv" style="--i:${i % 2}">
        <div class="bt-tx"><p class="eyebrow">${s.sym}</p><h3>${t('p' + (i + 1) + 't')}</h3><p class="bt-d">${t('p' + (i + 1) + 'd')}</p>
          <p class="bt-m">${t(tk)}${s.price ? ` • ${esc(s.price)}` : ''}</p><span class="more">Подробнее<svg viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1.500 1l5 5-5 5"/></svg></span></div>
        <div class="bt-v">${VIS[v]()}</div><a class="cover" href="#/s/${k}" data-nav aria-label="${esc(t('p' + (i + 1) + 't'))}"></a></article>`; }).join('')}</div>
    </div></section>

    <section class="story" id="story" data-scrub><div class="story-pin"><div class="wrap story-g">
      <div class="story-l"><p class="eyebrow">Как работаем</p><h2 class="h2">От первого выезда<br>до согласования</h2>
        <ol class="story-steps">${STORY.map((s, i) => `<li data-step="${i}"><b>${pad2(i + 1)}</b><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('')}</ol></div>
      <div class="story-r" aria-hidden="true"><svg viewBox="0 0 400 400"><defs><linearGradient id="stg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2bd47d"/><stop offset=".5" stop-color="#19b8f0"/><stop offset="1" stop-color="#3d6bff"/></linearGradient></defs>
        <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="14"/><circle class="story-ring" cx="200" cy="200" r="170" fill="none" stroke="url(#stg)" stroke-width="14" stroke-linecap="round" pathLength="100" stroke-dasharray="100" transform="rotate(-90 200 200)"/></svg>
        <div class="story-n"><b>01</b><span>из 04</span></div></div>
    </div></div></section>

    <section class="sec" id="prices"><div class="wrap">
      <div class="sec-hd"><h2 class="h2 rv">Все услуги, сроки и цены</h2><p class="sub rv">26 услуг. Найдите документ по названию или выберите раздел.</p></div>
      <div class="cat-bar rv"><label class="search">${I.info}<input type="search" placeholder="Поиск: СЗЗ, отходы, 2-ТП" data-search aria-label="Поиск по услугам"></label>
        <div class="tabs" role="tablist">${[['all', SVC.length]].concat(D.groups.map(([g]) => [g, groupList(g).length])).map(([g, n], i) => `<button class="tab" type="button" role="tab" data-filter="${g}" aria-selected="${i === 0}">${t('g_' + g)}</button>`).join('')}</div></div>
      <div class="pt rv">${SVC.map(s => `<a class="cell tile" data-g="${s.g}" data-q="${esc((s.name + ' ' + s.full + ' ' + s.sym).toLowerCase())}" href="#/s/${s.slug}" data-nav><span class="cell-s">${s.sym}</span><span class="cell-n">${esc(sName(s))}</span><span class="cell-m">${esc(fTerm(s) || 'срок по запросу')}<br><b>${esc(s.price || 'цена по запросу')}</b></span></a>`).join('')}<p class="pt-empty" hidden>Ничего не нашлось. Попробуйте другое слово или позвоните: ${TEL}</p></div>
    </div></section>

    <section class="sec alt" id="audit"><div class="wrap"><div class="tile dark aud rv">
      <div class="aud-tx"><p class="eyebrow">${t('audEyebrow')}</p><h2 class="h2"><span class="nw">Экологический аудит</span><br><span class="gt nw">вашего объекта</span></h2><p>${t('audText')}</p>
        <div class="hero-cta"><button class="btn btn-p" type="button" data-modal="audit">${t('audBtn')}</button></div>
        <ul class="aud-steps">${[1, 2, 3].map(i => `<li><b>${i}</b>${t('aud' + i)}</li>`).join('')}</ul></div>
      <div class="aud-v">${VIS.zone(true)}</div></div></div></section>

    <section class="sec" id="cats"><div class="wrap">
      <div class="sec-hd center"><h2 class="h2 rv">Какие документы нужны<br>вашему объекту</h2><p class="sub rv">Выберите категорию НВОС — покажем полный перечень.</p></div>
      <div class="seg3 rv" role="tablist">${['I', 'II', 'III'].map((r, i) => `<button class="ctg-tab" type="button" role="tab" data-cat="${i}" aria-selected="${i === 0}">${r} ${t('ctgTab')}</button>`).join('')}</div>
      <div class="ctg-panel rv" id="ctgp" role="tabpanel">${catPanel(0)}</div>
    </div></section>

    <section class="sec alt" id="clients"><div class="wrap">
      <div class="sec-hd center"><h2 class="h2 rv">Нам доверяют</h2><p class="sub rv">${t('cliTitle')}</p></div>
      <div class="logos rv">${D.clients.map((n, i) => `<figure>${img('client' + (i + 1), n, `width="${D.clientDim[i][0]}" height="${D.clientDim[i][1]}"`)}</figure>`).join('')}</div>
    </div>
      <div class="wrap" style="margin-top:var(--sec)"><div class="car-hd"><div><h2 class="h2 rv">${t('thxTitle')}</h2><p class="sub rv">${t('thxSub')}</p></div>
        <div class="car-nav"><button class="ic-btn" type="button" data-car="-1" aria-label="${t('back')}">${I.arl}</button><button class="ic-btn" type="button" data-car="1" aria-label="next">${I.arr}</button></div></div></div>
      <div class="car" id="car">${D.thanks.map((n, i) => `<button class="lt" type="button" data-lb="thanks" data-i="${i}"><div class="lt-img">${img('thanks' + (i + 1), n, 'draggable="false"')}</div><div class="lt-cap">${esc(n)}</div></button>`).join('')}</div>
      <div class="car-bar"><i></i></div>
    </section>

    <section class="sec" id="examples"><div class="wrap">
      <div class="sec-hd"><h2 class="h2 rv">${t('exTitle')}</h2><p class="sub rv">${t('exSub')}</p></div>
      <div class="ex rv">${[1, 2, 3, 4].map(i => `<button class="tile" type="button" data-lb="ex" data-i="${i - 1}" aria-label="${t('exTitle')} ${i}">${img('example' + i, t('exTitle') + ' ' + i)}</button>`).join('')}</div>
    </div></section>

    <section class="sec alt" id="team"><div class="wrap">
      <div class="sec-hd center"><h2 class="h2 rv">${t('teamTitle')}</h2><p class="sub rv">${t('teamSub')}</p></div>
      <div class="team">${D.team.map((m, i) => `<article class="tm rv" style="--i:${i % 4}"><div class="tm-img tile">${img('team' + (i + 1), m[0])}</div><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p></article>`).join('')}</div>
    </div></section>

    <section class="sec" id="contacts"><div class="wrap"><div class="con">
      <div class="con-l rv"><h2 class="h2">Обсудим<br><span class="gt">ваш объект</span></h2><p class="sub">${t('conSub')}</p>
        <a class="con-tel" href="${TEL_H}">${TEL}</a><a class="more con-mail" href="mailto:${MAIL}">${MAIL}</a>
        <p class="con-addr">${t('addr')}</p>
        <div class="soc"><a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><a href="${VK}" target="_blank" rel="noopener" aria-label="VK">${I.vk}</a></div></div>
      <div class="card-form tile rv">${formHTML({ msg: true, btn: t('fSend') })}</div>
    </div></div></section>`;
  }

  function block(b) {
    const wrap = (title, descr, body, cls = '') => `<section class="blk ${cls} rv"><div class="blk-h">${title ? `<h2 class="h3">${esc(title)}</h2>` : ''}${descr ? `<p>${esc(descr)}</p>` : ''}</div>${body}</section>`;
    switch (b.k) {
      case 'text': return wrap(b.title, '', `<div class="rich">${rich(b.text)}</div>`, 'blk-text');
      case 'list': return wrap(b.title, b.descr, `<ul class="chk-list">${b.items.map(it => `<li class="tile">${I.chk}<div>${esc(it.t || it.d)}${it.t && it.d ? `<small>${esc(it.d)}</small>` : ''}</div></li>`).join('')}</ul>`);
      case 'feat': return wrap(b.title, b.descr, `<div class="feats">${b.items.map((it, i) => `<div class="feat tile"><span class="num gt">${pad2(i + 1)}</span><h4>${esc(it.t || '')}</h4>${it.d ? `<div class="rich">${rich(it.d)}</div>` : ''}</div>`).join('')}</div>`);
      case 'steps': return wrap(b.title, '', `<ol class="steps">${b.items.map((it, i) => `<li class="step tile"><b class="gt">${i + 1}</b><h4>${esc(it.t)}</h4>${it.d ? `<p>${esc(it.d)}</p>` : ''}</li>`).join('')}</ol>`);
      case 'faq': return wrap('', '', `<div class="faq">${b.items.map(it => `<details class="tile"><summary>${esc(it.t)}${I.plus}</summary><div class="rich">${rich(it.d)}</div></details>`).join('')}</div>`);
      case 'links': return wrap(b.title, b.descr, `<div class="links">${b.items.map(it => it.slug ? `<a class="tile" href="#/s/${it.slug}" data-nav>${esc(it.t)}${I.arr}</a>` : `<a class="tile">${esc(it.t)}</a>`).join('')}</div>`);
      case 'cards': return wrap(b.title, b.descr, `<div class="lcards">${b.items.map(it => `<div class="lcard tile"><h4>${esc(it.t)}</h4><div class="rich">${rich(it.d)}</div><button class="more" type="button" data-modal="calc" data-ctx="${esc(it.t)}">${t('svCalc')}<svg viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1.500 1l5 5-5 5"/></svg></button></div>`).join('')}</div>`);
      case 'note': return wrap('', '', `<div class="note tile rich">${rich(b.text)}</div>`);
      case 'head': return '';
      case 'progs': return wrap(b.title, '', `<ul class="progs tile">${b.items.map(it => `<li><div>${esc(it.t)}</div><span>${esc(it.d)}</span></li>`).join('')}</ul>`);
      case 'mission': return wrap(b.title, '', `<div class="rich"><p>${esc(b.text)}</p><p>${more(b.href, esc(b.btn), false).replace('<a ', '<a target="_blank" rel="noopener" ')}</p></div>`, 'blk-text');
      case 'tags': return wrap(b.title, b.descr, `<ul class="tags">${b.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`);
      case 'cta': return `<section class="cta-blk tile dark rv"><h3 class="h2">${esc(b.title)}</h3><div class="rich">${rich(b.text)}</div><div class="hero-cta"><button class="btn btn-p" type="button" data-modal="cons">${t('cta')}</button>${more(TEL_H, TEL, false)}</div></section>`;
    }
    return '';
  }
  function viewService(slug) {
    const i = IDX[slug], s = SVC[i], prev = SVC[(i + SVC.length - 1) % SVC.length], next = SVC[(i + 1) % SVC.length];
    const popI = POP.findIndex(p => p[0] === slug);
    const lead = SVLEAD[s.sym] ? SVLEAD[s.sym][0] : popI >= 0 ? t('p' + (popI + 1) + 'd') : '';
    const meta = [fTerm(s), s.price].filter(Boolean).join(' • ');
    return `<div class="subnav"><div class="wrap"><b>${esc(sName(s))}</b><span>${esc(meta)}</span><button class="btn btn-p btn-sm" type="button" data-modal="cons">${t('svOrder')}</button></div></div>
    <section class="sv-hero"><div class="wrap center">
      <p class="eyebrow fade-up">${t('g_' + s.g)} • ${s.sym}</p>
      <h1 class="sv-h1 fade-up">${esc(sFull(s))}</h1>
      ${lead ? `<p class="lead fade-up">${esc(lead)}</p>` : ''}
      ${meta ? `<p class="sv-meta fade-up">${esc(meta)}</p>` : ''}
      <div class="hero-cta fade-up"><button class="btn btn-p" type="button" data-modal="cons">${t('cta')}</button>${more(TEL_H, TEL, false)}</div>
      <div class="sv-vis tile dark fade-up">${VIS[s.ill]()}</div>
    </div></section>
    <div class="sv-body"><div class="wrap">${s.blocks.map(b => block(b)).join('')}
      <section class="blk sv-order rv"><div class="blk-h"><h2 class="h3">${t('svOrderTitle')}</h2><p>${t('svOrderSub')}</p></div><div class="card-form tile">${formHTML()}</div></section></div></div>
    <nav class="sv-nav"><div class="wrap"><a class="tile" href="#/s/${prev.slug}" data-nav><small>${t('svPrev')}</small><b>${esc(sName(prev))}</b></a><a class="tile" href="#/s/${next.slug}" data-nav><small>${t('svNext')}</small><b>${esc(sName(next))}</b></a></div></nav>`;
  }
  function viewDoc(k) {
    const d = D.docs[k];
    return `<section class="doc"><div class="wrap"><p class="eyebrow">${t('ftLegal')}</p><h1>${esc(d.title)}</h1><div class="rich">${rich(d.text)}</div></div></section>`;
  }

  /* ---------- scroll scenes (v3) ---------- */
  function heroFX() {
    const els = $$('[data-scrub]'); let raf = 0;
    const upd = () => {
      raf = 0; const vh = innerHeight; let dark = false;
      els.forEach(el => {
        const r = el.getBoundingClientRect(), span = r.height - vh, p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
        el.style.setProperty('--p', p.toFixed(4));
        if (r.top <= 52 && r.bottom > 52) dark = true;
        if (el.id === 'story') {
          const k = Math.min(STORY.length - 1, Math.floor(p * STORY.length));
          if (el.dataset.k !== String(k)) { el.dataset.k = k; $$('[data-step]', el).forEach(li => li.classList.toggle('on', +li.dataset.step === k)); const n = $('.story-n b', el); if (n) n.textContent = pad2(k + 1); }
          const ring = $('.story-ring', el); if (ring) ring.style.strokeDashoffset = 100 - Math.max(6, p * 100);
        }
      });
      document.body.dataset.over = dark ? 'dark' : '';
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); upd();
    return { destroy() { document.body.dataset.over = ''; removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); }, repaint() { } };
  }
  document.addEventListener('click', e => { const tb = e.target.closest('.tabs .tab'); if (tb) { const box = tb.parentElement; box.scrollTo({ left: tb.offsetLeft - (box.clientWidth - tb.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' }); } });
  document.addEventListener('input', e => {
    if (!e.target.matches('[data-search]')) return; const q = e.target.value.trim().toLowerCase(); let n = 0;
    $$('[data-filter]').forEach(b => b.setAttribute('aria-selected', b.dataset.filter === 'all'));
    $$('.pt .cell').forEach(c => { const hit = !q || c.dataset.q.includes(q); c.classList.toggle('off', !hit); if (hit) n++; });
    const em = $('.pt-empty'); if (em) em.hidden = n > 0;
  });

