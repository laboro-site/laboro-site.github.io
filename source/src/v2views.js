  /* ---------- shell (v2) ---------- */
  const groupList = g => SVC.filter(s => s.g === g);
  const IC2 = {
    plume: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40h32M12 40V24h6v16M22 40V16h6v24M32 40V28h6v12"/><path d="M25 12c2-4 6-5 9-4s5 4 9 3M15 20c1-3 4-4 6-3"/></svg>',
    limits: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 34a18 18 0 0 1 36 0"/><path d="M24 34l8-12"/><circle cx="24" cy="34" r="2.5"/><path d="M12 22l2 2M24 16v3M36 22l-2 2"/></svg>',
    zone: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18" stroke-dasharray="3 5"/><circle cx="24" cy="24" r="11"/><path d="M19 28v-7l5-3 5 3v7z"/></svg>',
    waste: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16h24l-2 24H14z"/><path d="M9 16h30M19 16v-5h10v5M20 23v10M28 23v10"/></svg>',
    lab: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 8h10M21 8v11L10 38a2 2 0 0 0 2 3h24a2 2 0 0 0 2-3L27 19V8"/><path d="M15 31h18"/><circle cx="22" cy="35" r="1.3"/><circle cx="28" cy="27" r="1.3"/></svg>',
    report: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6h17l8 8v28H12z"/><path d="M29 6v8h8M18 24l3 3 6-7M18 34h12"/></svg>',
  };
  function renderShell() {
    const themeBtn = `<button class="ic-btn theme-btn" type="button" data-theme-toggle aria-label="${t('theme')}">${I.sun}${I.moon}</button>`;
    $('#hdr').innerHTML = `<div class="hdr-in">
      <a class="logo" href="#/" data-nav aria-label="Лаборо">${img('logo', 'НИЦ Лаборо', 'width="400" height="167" loading="eager"')}</a>
      <nav class="nav" aria-label="Main">
        <button type="button" data-mega aria-expanded="false" aria-controls="mega">${t('navServices')}${I.dn}</button>
        <a href="#/@prices" data-nav>Цены</a><a href="#/@audit" data-nav>${t('navAudit')}</a><a href="#/@cats" data-nav>${t('navCats')}</a><a href="#/@clients" data-nav>${t('navClients')}</a><a href="#/@team" data-nav>${t('navTeam')}</a>
      </nav>
      <div class="hdr-r">${themeBtn}<a class="hdr-tel" href="${TEL_H}">${TEL}</a><button class="btn btn-p btn-sm" type="button" data-modal="cons">${t('ctaShort')}</button>
        <button class="burger" type="button" data-burger aria-expanded="false" aria-controls="mnav" aria-label="${t('menu')}"><i></i><i></i></button></div></div>`;
    $('#mega').innerHTML = `<div class="mega-in">${D.groups.map(([g]) => `<div class="${g === 'pr' ? 'mega-pr' : ''}"><h4><span>${t('g_' + g)}</span><span>${groupList(g).length}</span></h4><ul>${groupList(g).map(s => `<li><a href="#/s/${s.slug}" data-nav>${esc(sName(s))}</a></li>`).join('')}</ul></div>`).join('')}</div>`;
    $('#mnav').innerHTML = `<ul class="mnav-list">
      <li><button type="button" data-acc aria-expanded="false">${t('navServices')}${I.plus}</button><div class="mnav-sub"><div><div>${D.groups.map(([g]) => `<h5>${t('g_' + g)}</h5>${groupList(g).map(s => `<a href="#/s/${s.slug}" data-nav>${esc(sName(s))}</a>`).join('')}`).join('')}</div></div></div></li>
      ${[['prices', 'Цены'], ['audit', t('navAudit')], ['cats', t('navCats')], ['clients', t('navClients')], ['team', t('navTeam')], ['contacts', t('navContacts')]].map(([a, k]) => `<li><a href="#/@${a}" data-nav>${k}</a></li>`).join('')}</ul>
      <div class="mnav-ft"><div class="row"><a class="mnav-tel" href="${TEL_H}">${TEL}</a>${themeBtn}</div>
      <div class="soc"><a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><a href="${VK}" target="_blank" rel="noopener" aria-label="VK">${I.vk}</a></div>
      <button class="btn btn-p btn-w" type="button" data-modal="cons">${t('cta')}${I.arr}</button></div>`;
    $('#ft').innerHTML = `<div class="wrap"><div class="ft-card"><div class="ft-top">
      <div><a class="logo" href="#/" data-nav>${img('logo', 'НИЦ Лаборо', 'width="400" height="167"')}</a><p>${t('ftTag')}</p></div>
      <div><h5>${t('navServices')}</h5><ul>${D.groups.map(([g]) => `<li><a href="#/@prices:${g}" data-nav>${t('g_' + g)}</a></li>`).join('')}</ul></div>
      <div><h5>${t('navContacts')}</h5><ul><li><a href="${TEL_H}">${TEL}</a></li><li><a href="mailto:${MAIL}">${MAIL}</a></li><li><a href="#/@contacts" data-nav>${t('addr')}</a></li></ul></div>
      <div><h5>${t('ftLegal')}</h5><ul>${['personal', 'ad', 'privacy', 'cookies'].map(k => `<li><a href="#/docs/${k}" data-nav>${t('d_' + k)}</a></li>`).join('')}</ul></div></div>
      <div class="ft-bot"><span>${t('ftCopy')}</span><span class="concept">${t('ftConcept')}</span></div></div></div>`;
    $('#fab').innerHTML = `<a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><button type="button" data-top aria-label="${t('toTop')}">${I.up}</button>`;
    $('#cookie').innerHTML = `<span>${t('cookie')} <a href="#/docs/cookies" data-nav>${t('more')}</a></span><button class="btn btn-g btn-sm" type="button" data-cookie>${t('ok')}</button>`;
  }

  /* ---------- views (v2) ---------- */
  const POP = [['otchet-ob-inventarizacii-istochnikov-vybrosov', 'plume', 't_1m', 'c-deep'], ['proekt-ndv', 'limits', 't_2m', ''], ['proekt-sanitarno-zashchitnoy-zony', 'zone', 't_3m', ''], ['proekt-noolr', 'waste', 't_1m', ''], ['laboratornye-issledovaniya', 'lab', 't_1d', ''], ['ekologicheskoe-soprovozhdenie-pod-klyuch', 'report', 't_1d', 'c-acc']];
  const STATS = [[20, 'st1'], [150, 'st2'], [650, 'st3'], [950, 'st4']];
  const srcPts = () => [];
  const hd = (label, title, sub) => `<div class="sec-hd"><span class="pill rv">${label}</span><h2 class="h2 rv">${title}</h2>${sub ? `<p class="sub rv">${sub}</p>` : ''}</div>`;
  function catPanel(i) {
    const c = CATS[i], notes = [];
    const row = ([k, nk]) => { let sup = ''; if (nk) { let j = notes.indexOf(nk); if (j < 0) { notes.push(nk); j = notes.length - 1; } sup = `<sup>${j + 1}</sup>`; } return `<li class="ctg-list-i">${I.chk}<span>${esc(CDOC[k][0])}${sup}</span></li>`; };
    const docs = c.docs.map(row).join(''), rep = c.rep.map(k => row([k])).join(''), opt = c.opt.map(row).join('');
    return `<div class="ctg-cols"><div><h4>${t('ctgDocs')}<b>${c.docs.length}</b></h4><ul class="ctg-list">${docs}</ul></div>
      <div><h4>${t('ctgRep')}<b>${c.rep.length}</b></h4><ul class="ctg-list">${rep}</ul><h4 style="margin-top:28px">${t('ctgOpt')}<b>${c.opt.length}</b></h4><ul class="ctg-list">${opt}</ul></div></div>
      <ul class="ctg-notes">${notes.map((k, j) => `<li><b>${j + 1}</b><span>${esc(CNOTE[k][0])}</span></li>`).join('')}</ul>
      <button class="btn btn-p" type="button" data-modal="calc">${t('ctgBtn')}${I.arr}</button>`;
  }
  const catCount = i => CATS[i].docs.length + CATS[i].rep.length + CATS[i].opt.length;
  const sheet = (cls, sym, name, st, body) => `<div class="sheet ${cls}"><div class="sheet-h"><b>${sym}</b><span>${name}</span></div>${body}<div class="sheet-f"><i></i><span>${st}</span></div></div>`;
  const lines = n => `<div class="sheet-l">${Array.from({ length: n }, (_, i) => `<i style="width:${[92, 78, 86, 64, 90, 72][i % 6]}%"></i>`).join('')}</div>`;
  const stamp = `<svg class="stamp" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="stp" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0"/></defs><circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width="1.5"/><text font-size="11.5" font-weight="700" letter-spacing="2.2" fill="currentColor"><textPath href="#stp">СОГЛАСОВАНО • ПРОЕКТ ПРИНЯТ • </textPath></text><path d="M45 61l11 11 20-23" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function viewHome() {
    const cli = D.clients.map((n, i) => `<figure>${img('client' + (i + 1), n, `width="${D.clientDim[i][0]}" height="${D.clientDim[i][1]}"`)}</figure>`).join('');
    const svc = k => SVC[IDX[k]];
    return `
    <section class="hero" id="top"><div class="wrap hero-grid2">
      <div class="hero-l">
        <span class="pill fade-up"><i class="dot"></i>НИЦ Лаборо • Москва • с 2017</span>
        <h1 class="h1 fade-up">Экологическая документация <em>под ключ</em></h1>
        <p class="lead fade-up">${t('heroLead')}</p>
        <div class="hero-cta fade-up"><button class="btn btn-p" type="button" data-modal="cons">${t('cta')}${I.arr}</button><a class="btn btn-g" href="#/@prices" data-nav>Услуги и цены</a></div>
        <ul class="hero-trust fade-up">${[[20, 'st1'], [650, 'st3'], [950, 'st4']].map(([n, k]) => `<li><b data-count="${n}">${n}+</b><span>${t(k)}</span></li>`).join('')}</ul>
      </div>
      <div class="hero-r fade-up" aria-hidden="true"><div class="stack hero-cv">
        ${sheet('s1', 'СЗЗ', 'Проект санитарно-защитной зоны', 'Решение получено', `<svg class="sheet-art" viewBox="0 0 200 110"><ellipse cx="100" cy="55" rx="88" ry="44" fill="none" stroke="currentColor" stroke-dasharray="4 6" opacity=".45"/><ellipse cx="100" cy="55" rx="56" ry="28" fill="none" stroke="var(--acc)" stroke-width="2"/><rect x="86" y="44" width="28" height="22" rx="3" fill="currentColor" opacity=".85"/></svg>${lines(2)}`)}
        ${sheet('s2', 'НДВ', 'Нормативы допустимых выбросов', 'Экспертное заключение', `<svg class="sheet-art" viewBox="0 0 200 110"><path d="M8 26H192" stroke="var(--acc)" stroke-width="2" stroke-dasharray="5 5"/>${[52, 70, 40, 78, 60, 46, 66].map((h, i) => `<rect x="${14 + i * 26}" y="${102 - h}" width="15" height="${h}" rx="3" fill="currentColor" opacity="${i === 3 ? 1 : .28}"/>`).join('')}</svg>${lines(2)}`)}
        ${sheet('s3', 'ПЭК', 'Программа экологического контроля', 'Сдано в срок', `${lines(5)}`)}
        ${sheet('s4', '2-ТП', 'Отчётность', 'Отчёт принят', `<div class="sheet-chk">${['2-ТП (воздух)', '2-ТП (отходы)', '4-ОС', 'Декларация о плате'].map(x => `<span>${I.chk}${x}</span>`).join('')}</div>`)}
        ${stamp}
      </div></div>
    </div>
    <div class="wrap"><div class="quick fade-up">${POP.map(([k]) => { const s = svc(k); return `<a href="#/s/${k}" data-nav><b>${s.sym}</b><span>${esc(fTerm(s) || 'от 1 дня')}</span>${I.arr}</a>`; }).join('')}</div></div>
    </section>

    <section class="sec sec-tight" id="clients"><div class="wrap"><p class="cli-t rv">Нам доверяют</p></div>
      <div class="cli rv"><div class="cli-in">${cli}${cli}</div></div></section>

    <section class="sec" id="popular"><div class="wrap">
      ${hd('Популярное', 'С чем приходят чаще всего', 'Сроки и цены — с действующего сайта компании. Точную стоимость назовём после знакомства с объектом.')}
      <div class="bento">${POP.map(([k, ic, tk, cls], i) => { const s = svc(k); return `<article class="bc b${i + 1} ${cls} rv" style="--i:${i % 3}">
        <div class="bc-top"><span class="bc-ic">${IC2[ic]}</span><span class="tag">${s.sym}</span></div>
        <h3>${t('p' + (i + 1) + 't')}</h3><p>${t('p' + (i + 1) + 'd')}</p>
        <div class="bc-ft"><div><small>${t('term')}</small><b>${t(tk)}</b></div>${s.price ? `<div><small>${t('price')}</small><b>${esc(s.price)}</b></div>` : ''}<span class="go">${I.arr}</span></div>
        <a class="cover" href="#/s/${k}" data-nav aria-label="${esc(t('p' + (i + 1) + 't'))}"></a></article>`; }).join('')}</div>
    </div></section>

    <section class="sec" id="prices"><div class="wrap">
      ${hd('Каталог', 'Все услуги, сроки и цены', '26 услуг. Найдите документ по названию или выберите раздел.')}
      <div class="cat-bar rv"><label class="search">${I.info}<input type="search" placeholder="Например: СЗЗ, отходы, 2-ТП" data-search aria-label="Поиск по услугам"></label>
        <div class="tabs" role="tablist">${[['all', SVC.length]].concat(D.groups.map(([g]) => [g, groupList(g).length])).map(([g, n], i) => `<button class="tab" type="button" role="tab" data-filter="${g}" aria-selected="${i === 0}">${t('g_' + g)}<sup>${n}</sup></button>`).join('')}</div></div>
      <div class="pt rv">${SVC.map(s => `<a class="cell" data-g="${s.g}" data-q="${esc((s.name + ' ' + s.full + ' ' + s.sym).toLowerCase())}" href="#/s/${s.slug}" data-nav><span class="tag">${s.sym}</span><span class="cell-n">${esc(sName(s))}</span><span class="cell-t">${esc(fTerm(s) || '—')}</span><span class="cell-p">${esc(s.price || 'по запросу')}</span><span class="go">${I.arr}</span></a>`).join('')}<p class="pt-empty" hidden>Ничего не нашлось. Попробуйте другое слово или позвоните: ${TEL}</p></div>
    </div></section>

    <section class="sec" id="risks"><div class="wrap"><div class="risk rv">
      <div class="risk-hd"><span class="pill">Зачем это нужно</span><h2 class="h2">Отсутствие документов обходится дороже их разработки</h2><p>Цифры — со страниц услуг «Лаборо»: проект НДВ (ст. 8.21 КоАП РФ) и проект СЗЗ.</p></div>
      <div class="risk-g"><div><b>до 250 000 ₽</b><span>штраф юридическому лицу за отсутствие проекта НДВ</span></div><div><b>до 90 суток</b><span>приостановление деятельности предприятия</span></div><div><b>до 250 000 ₽</b><span>штраф за отсутствие проекта санитарно-защитной зоны</span></div></div>
    </div></div></section>

    <section class="sec" id="audit"><div class="wrap"><div class="aud rv">
      <div><span class="pill">${t('audEyebrow')}</span><h2 class="h2">${t('audTitle')}</h2><p>${t('audText')}</p><button class="btn btn-d" type="button" data-modal="audit">${t('audBtn')}${I.arr}</button></div>
      <ol class="aud-steps">${[1, 2, 3].map(i => `<li><b>${i}</b><span>${t('aud' + i)}</span></li>`).join('')}</ol></div></div></section>

    <section class="sec" id="cats"><div class="wrap">
      ${hd('Категории НВОС', 'Какие документы нужны вашему объекту', 'Выберите категорию объекта — покажем полный перечень.')}
      <div class="ctg rv"><div class="seg3" role="tablist">${['I', 'II', 'III'].map((r, i) => `<button class="ctg-tab" type="button" role="tab" data-cat="${i}" aria-selected="${i === 0}"><b>${r}</b><span>${t('ctgTab')} • ${catCount(i)}</span></button>`).join('')}</div>
      <div class="ctg-panel" id="ctgp" role="tabpanel">${catPanel(0)}</div></div>
    </div></section>

    <section class="sec" id="stats"><div class="wrap">
      ${hd('В цифрах', t('statsTitle'))}
      <div class="stats">${STATS.map(([n, k], i) => `<div class="stat rv ${i === 1 ? 'c-deep' : i === 3 ? 'c-acc' : ''}" style="--i:${i}"><b><span data-count="${n}">${n}</span>+</b><span class="st-l">${t(k)}</span></div>`).join('')}</div>
    </div></section>

    <section class="sec" id="thanks">
      <div class="wrap"><div class="car-hd"><div class="sec-hd" style="margin:0"><span class="pill rv">Отзывы</span><h2 class="h2 rv">${t('thxTitle')}</h2><p class="sub rv">${t('thxSub')}</p></div>
        <div class="car-nav"><button class="ic-btn" type="button" data-car="-1" aria-label="${t('back')}">${I.arl}</button><button class="ic-btn" type="button" data-car="1" aria-label="next">${I.arr}</button></div></div></div>
      <div class="car" id="car">${D.thanks.map((n, i) => `<button class="lt" type="button" data-lb="thanks" data-i="${i}"><div class="lt-img">${img('thanks' + (i + 1), n, 'draggable="false"')}</div><div class="lt-cap">${esc(n)}</div></button>`).join('')}</div>
      <div class="car-bar"><i></i></div>
    </section>

    <section class="sec" id="examples"><div class="wrap">
      ${hd('Результат', t('exTitle'), t('exSub'))}
      <div class="ex rv">${[1, 2, 3, 4].map(i => `<button type="button" data-lb="ex" data-i="${i - 1}" aria-label="${t('exTitle')} ${i}">${img('example' + i, t('exTitle') + ' ' + i)}<span class="go">${I.zoom}</span></button>`).join('')}</div>
    </div></section>

    <section class="sec" id="team"><div class="wrap">
      ${hd('Команда', t('teamTitle'), t('teamSub'))}
      <div class="team">${D.team.map((m, i) => `<article class="tm rv" style="--i:${i % 6}"><div class="tm-img">${img('team' + (i + 1), m[0])}</div><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p></article>`).join('')}</div>
    </div></section>

    <section class="sec" id="contacts"><div class="wrap"><div class="con rv">
      <div class="con-l"><span class="pill">${t('conTitle')}</span><h2 class="h2">${t('conSub')}</h2>
        <a class="con-tel" href="${TEL_H}">${TEL}</a><a class="con-mail" href="mailto:${MAIL}">${MAIL}</a>
        <p class="con-addr">${t('addr')}</p>
        <div class="soc"><a href="${TG}" target="_blank" rel="noopener" aria-label="Telegram">${I.tg}</a><a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><a href="${VK}" target="_blank" rel="noopener" aria-label="VK">${I.vk}</a></div></div>
      <div class="card-form">${formHTML({ msg: true, btn: t('fSend') })}</div>
    </div></div></section>`;
  }

  function block(b, n) {
    const wrap = (title, descr, body, cls = '') => `<section class="blk ${cls} rv"><div class="blk-h">${title ? `<h2 class="h3">${esc(title)}</h2>` : ''}${descr ? `<p>${esc(descr)}</p>` : ''}</div>${body}</section>`;
    switch (b.k) {
      case 'text': return wrap(b.title, '', `<div class="rich">${rich(b.text)}</div>`, 'blk-text');
      case 'list': return wrap(b.title, b.descr, `<ul class="chk-list">${b.items.map(it => `<li>${I.chk}<div>${esc(it.t || it.d)}${it.t && it.d ? `<small>${esc(it.d)}</small>` : ''}</div></li>`).join('')}</ul>`);
      case 'feat': return wrap(b.title, b.descr, `<div class="feats">${b.items.map((it, i) => `<div class="feat"><span class="num">${pad2(i + 1)}</span><h4>${esc(it.t || '')}</h4>${it.d ? `<div class="rich">${rich(it.d)}</div>` : ''}</div>`).join('')}</div>`);
      case 'steps': return wrap(b.title, '', `<ol class="steps">${b.items.map((it, i) => `<li class="step"><b>${i + 1}</b><h4>${esc(it.t)}</h4>${it.d ? `<p>${esc(it.d)}</p>` : ''}</li>`).join('')}</ol>`);
      case 'faq': return wrap('', '', `<div class="faq">${b.items.map(it => `<details><summary>${esc(it.t)}${I.plus}</summary><div class="rich">${rich(it.d)}</div></details>`).join('')}</div>`);
      case 'links': return wrap(b.title, b.descr, `<div class="links">${b.items.map(it => it.slug ? `<a href="#/s/${it.slug}" data-nav>${esc(it.t)}${I.arr}</a>` : `<a>${esc(it.t)}</a>`).join('')}</div>`);
      case 'cards': return wrap(b.title, b.descr, `<div class="lcards">${b.items.map(it => `<div class="lcard"><h4>${esc(it.t)}</h4><div class="rich">${rich(it.d)}</div><button class="btn btn-g btn-sm" type="button" data-modal="calc" data-ctx="${esc(it.t)}">${t('svCalc')}${I.arr}</button></div>`).join('')}</div>`);
      case 'note': return wrap('', '', `<div class="note rich">${rich(b.text)}</div>`);
      case 'head': return '';
      case 'progs': return wrap(b.title, '', `<ul class="progs">${b.items.map(it => `<li><div>${esc(it.t)}</div><span>${esc(it.d)}</span></li>`).join('')}</ul>`);
      case 'mission': return wrap(b.title, '', `<div class="rich"><p>${esc(b.text)}</p></div><a class="btn btn-g" style="margin-top:22px" href="${b.href}" target="_blank" rel="noopener">${esc(b.btn)}${I.arr}</a>`, 'blk-text');
      case 'tags': return wrap(b.title, b.descr, `<ul class="tags">${b.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`);
      case 'cta': return `<section class="cta-blk rv"><div><h3>${esc(b.title)}</h3><div class="rich">${rich(b.text)}</div></div><button class="btn btn-d" type="button" data-modal="cons">${t('cta')}${I.arr}</button></section>`;
    }
    return '';
  }
  function viewService(slug) {
    const i = IDX[slug], s = SVC[i], prev = SVC[(i + SVC.length - 1) % SVC.length], next = SVC[(i + 1) % SVC.length];
    const popI = POP.findIndex(p => p[0] === slug);
    const lead = SVLEAD[s.sym] ? SVLEAD[s.sym][0] : popI >= 0 ? t('p' + (popI + 1) + 'd') : '';
    return `<section class="sv-hero"><div class="wrap">
      <nav class="crumbs fade-up" aria-label="Breadcrumb"><a href="#/" data-nav>${t('svHome')}</a><i>/</i><a href="#/@prices:${s.g}" data-nav>${t('g_' + s.g)}</a><i>/</i><span>${s.sym}</span></nav>
      <div class="sv-grid"><div>
        <span class="pill fade-up"><i class="dot"></i>${t('g_' + s.g)} • ${s.sym}</span>
        <h1 class="sv-h1 fade-up">${esc(sFull(s))}</h1>
        ${lead ? `<p class="lead fade-up">${esc(lead)}</p>` : ''}
        <div class="chips fade-up"><div class="chip"><span>${t('term')}</span><b>${esc(fTerm(s) || 'по запросу')}</b></div><div class="chip c-deep"><span>${t('price')}</span><b>${esc(s.price || 'по запросу')}</b></div></div>
        <div class="hero-cta fade-up"><button class="btn btn-p" type="button" data-modal="cons">${t('cta')}${I.arr}</button><a class="btn btn-g" href="${TEL_H}">${TEL}</a></div></div>
        <aside class="card-form sv-form fade-up"><h3>${t('svOrderTitle')}</h3><p>${t('svOrderSub')}</p>${formHTML()}</aside></div>
    </div></section>
    <div class="sv-body"><div class="wrap">${s.blocks.map(b => block(b)).join('')}</div></div>
    <nav class="sv-nav"><div class="wrap"><a href="#/s/${prev.slug}" data-nav>${I.arl}<span><small>${t('svPrev')}</small><b>${esc(sName(prev))}</b></span></a><a href="#/s/${next.slug}" data-nav><span><small>${t('svNext')}</small><b>${esc(sName(next))}</b></span>${I.arr}</a></div></nav>`;
  }
  function viewDoc(k) {
    const d = D.docs[k];
    return `<section class="doc"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/" data-nav>${t('svHome')}</a><i>/</i><span>${t('ftLegal')}</span></nav>
      <h1>${esc(d.title)}</h1><div class="rich">${rich(d.text)}</div></div></section>`;
  }

  /* ---------- hero document stack (v2) ---------- */
  function heroFX(el) {
    const host = el.closest('.hero'); let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, idx = 0, timer = 0;
    const sheets = [...el.querySelectorAll('.sheet')], st = el.querySelector('.stamp');
    const tick = () => { raf = 0; cx += (tx - cx) * .08; cy += (ty - cy) * .08; el.style.setProperty('--px', cx.toFixed(3)); el.style.setProperty('--py', cy.toFixed(3)); if (Math.abs(tx - cx) + Math.abs(ty - cy) > .002) raf = requestAnimationFrame(tick); };
    const onMove = e => { if (e.pointerType && e.pointerType !== 'mouse') return; const r = host.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5; if (!raf) raf = requestAnimationFrame(tick); };
    const onLeave = () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(tick); };
    const approve = () => {
      sheets.forEach(s => s.classList.remove('ok')); const s = sheets[idx % sheets.length]; idx++;
      st.classList.remove('hit'); void st.offsetWidth; st.dataset.on = s.className.match(/s\d/)[0]; st.classList.add('hit'); s.classList.add('ok');
    };
    if (!reduce) { host.addEventListener('pointermove', onMove, { passive: true }); host.addEventListener('pointerleave', onLeave); timer = setInterval(approve, 2600); setTimeout(approve, 900); }
    else { sheets[0].classList.add('ok'); st.dataset.on = 's1'; st.classList.add('hit'); }
    return { destroy() { clearInterval(timer); cancelAnimationFrame(raf); host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); }, repaint() { } };
  }
  document.addEventListener('input', e => {
    if (!e.target.matches('[data-search]')) return; const q = e.target.value.trim().toLowerCase(); let n = 0;
    $$('[data-filter]').forEach(b => b.setAttribute('aria-selected', b.dataset.filter === 'all'));
    $$('.pt .cell').forEach(c => { const hit = !q || c.dataset.q.includes(q); c.classList.toggle('off', !hit); if (hit) n++; });
    const em = $('.pt-empty'); if (em) em.hidden = n > 0;
  });

