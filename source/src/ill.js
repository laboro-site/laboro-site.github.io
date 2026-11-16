/* ---------- hand-drawn technical illustrations (SVG, animated) ---------- */
const S = (b, vb = '0 0 400 260', extra = '') => `<svg class="il" viewBox="${vb}" ${extra} aria-hidden="true" focusable="false">${b}</svg>`;
const gridLines = (x0, y0, x1, y1, step) => {
  let o = '';
  for (let x = x0; x <= x1; x += step) o += `<path class="m" d="M${x} ${y0}V${y1}" opacity=".35"/>`;
  for (let y = y0; y <= y1; y += step) o += `<path class="m" d="M${x0} ${y}H${x1}" opacity=".35"/>`;
  return o;
};
const hex = (cx, cy, r) => {
  let p = '';
  for (let i = 0; i < 6; i++) { const a = Math.PI / 180 * (60 * i - 90); p += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); }
  return p + 'Z';
};
const ILL = {
  plume: () => S(`
    <path class="m" d="M20 214H380"/>
    <path class="m d" d="M20 236H380"/><path class="m" d="M20 231v10M110 231v10M200 231v10M290 231v10M380 231v10"/>
    <text x="24" y="252">0</text><text x="186" y="252">X, М</text><text x="356" y="252">2 000</text>
    <path class="f" d="M46 214V176l22-14v14l22-14v14l22-14v14h52v38Z"/>
    <path class="f" d="M70 162V118h16v44M104 162V92h16v70M138 176V136h14v40"/>
    <path d="M68 118h20M102 92h20M136 136h18"/>
    <path class="a" d="M112 90C170 58 252 46 376 30"/>
    <path class="a" d="M112 90C182 110 264 124 376 138"/>
    <path class="a flow" d="M114 90C180 78 262 72 376 64"/>
    <path class="a flow" d="M114 90C182 92 264 96 376 100"/>
    <path class="a flow2" d="M150 80C210 66 280 56 376 46"/>
    <path class="a flow2" d="M150 98C212 106 284 112 376 120"/>
    <path class="m flow2" d="M145 134c30-8 60-10 96-8"/>
    <path class="m flow2" d="M78 116c22-10 40-12 58-10"/>
    <g><circle class="a pulse" cx="214" cy="82" r="9"/><circle class="af" cx="214" cy="82" r="3"/></g>
    <g><circle class="a pulse d2" cx="282" cy="78" r="9"/><circle class="af" cx="282" cy="78" r="3"/></g>
    <g><circle class="a pulse d3" cx="346" cy="92" r="9"/><circle class="af" cx="346" cy="92" r="3"/></g>
    <path class="m" d="M214 82V200M282 78V200M346 92V200"/>
    <text x="204" y="210">Т.1</text><text x="272" y="210">Т.2</text><text x="336" y="210">Т.3</text>
    <text class="ta" x="126" y="72">0001</text><text x="62" y="110">0002</text><text x="158" y="132">0003</text>`),
  limits: () => S(`
    <path class="m" d="M44 34V212H380"/>
    <path class="m" d="M38 64h6M38 101h6M38 138h6M38 175h6"/>
    <text x="14" y="38">Г/С</text>
    <path class="a d" d="M44 64H380"/><text class="ta" x="346" y="56">НДВ</text>
    ${[72, 104, 60, 126, 92, 140, 78, 110].map((h, i) => `<rect class="${i === 5 ? 'a' : ''} f bar d${(i % 4) + 1}" x="${60 + i * 40}" y="${212 - h}" width="22" height="${h}"/>`).join('')}
    <path class="a flow2" d="M71 140L111 108L151 152L191 86L231 120L271 72L311 134L351 102"/>
    ${[[71, 140], [111, 108], [151, 152], [191, 86], [231, 120], [271, 72], [311, 134], [351, 102]].map(p => `<circle class="af" cx="${p[0]}" cy="${p[1]}" r="2.6"/>`).join('')}
    <g><circle class="a pulse" cx="271" cy="72" r="10"/></g>
    <text x="56" y="232">NO₂</text><text x="96" y="232">SO₂</text><text x="140" y="232">CO</text><text x="176" y="232">PM10</text><text x="216" y="232">NH₃</text><text x="256" y="232">C₆H₆</text><text x="302" y="232">H₂S</text><text x="342" y="232">CH₄</text>`),
  zone: () => S(`
    ${gridLines(20, 20, 380, 240, 40)}
    <g transform="rotate(-9 200 130)">
      <ellipse class="m d rot" cx="200" cy="130" rx="168" ry="112"/>
      <ellipse class="a d" cx="200" cy="130" rx="118" ry="80"/>
      <ellipse class="a" cx="200" cy="130" rx="70" ry="48" fill="var(--hl-soft)"/>
    </g>
    <path class="f" d="M170 110L226 102L236 150L178 158Z"/>
    <path d="M184 118l18-3 3 16-18 3zM210 122l12-2 4 20-12 2z"/>
    <g><circle class="a pulse" cx="204" cy="130" r="22"/><circle class="a pulse d3" cx="204" cy="130" r="22"/></g>
    <rect class="af" x="84" y="140" width="6" height="6"/><rect class="af" x="312" y="110" width="6" height="6"/><rect class="af" x="188" y="46" width="6" height="6"/><rect class="af" x="214" y="206" width="6" height="6"/>
    <g class="m"><rect x="312" y="34" width="14" height="14"/><rect x="332" y="34" width="14" height="14"/><rect x="312" y="54" width="14" height="14"/><rect x="332" y="54" width="14" height="14"/><rect x="352" y="44" width="14" height="14"/></g>
    <g class="m"><rect x="36" y="196" width="14" height="14"/><rect x="56" y="196" width="14" height="14"/><rect x="46" y="216" width="14" height="14"/></g>
    <text class="ta" x="246" y="88">СЗЗ</text><text x="306" y="84">ЖИЛАЯ ЗОНА</text>
    <circle class="m" cx="356" cy="214" r="15"/><path class="a" d="M356 204v20M356 204l-5 8M356 204l5 8"/><text x="352" y="194">N</text>
    <path d="M100 238h70M100 234v8M135 236v4M170 234v8"/><text x="176" y="241">500 М</text>`),
  waste: () => S(`
    <path class="m" d="${hex(70, 88, 30)}${hex(278, 88, 30)}${hex(96, 178, 30)}${hex(148, 178, 30)}${hex(252, 178, 30)}" opacity=".5"/>
    <path class="f hx" d="${hex(122, 88, 30)}"/><path class="f hx d2" d="${hex(174, 88, 30)}"/><path class="f hx d3" d="${hex(226, 88, 30)}"/>
    <path class="f hx d4" d="${hex(148, 133, 30)}"/><path class="f hx d5" d="${hex(200, 133, 30)}"/>
    <g text-anchor="middle" style="font-size:15px"><text x="122" y="93" style="font-size:15px;fill:currentColor">I</text><text x="174" y="93" style="font-size:15px;fill:currentColor">II</text><text x="226" y="93" style="font-size:15px;fill:currentColor">III</text><text x="148" y="138" style="font-size:15px;fill:currentColor">IV</text><text x="200" y="138" style="font-size:15px;fill:currentColor">V</text></g>
    <text x="40" y="36">КЛАСС ОПАСНОСТИ</text>
    <path class="f" d="M306 96h66l-6 122h-54Z"/><path d="M300 96h78M326 86h26v10"/>
    <path class="a d" d="M298 130H380"/><text class="ta" x="334" y="124">ЛИМИТ</text>
    <rect class="a bar" x="314" y="150" width="50" height="62" fill="var(--hl-soft)"/>
    <path class="m" d="M324 164v40M339 164v40M354 164v40"/>
    <path class="a flow" d="M200 178C230 200 262 204 300 190"/>
    <text x="40" y="240">ФККО • ПАСПОРТ • БИОТЕСТ</text>`),
  lab: () => S(`
    <path class="m" d="M30 222H380"/>
    <path class="a" fill="var(--hl-soft)" d="M92 160Q112 151 130 160T168 160L186 198Q190 208 178 208H82Q70 208 74 198Z"/>
    <path d="M114 46H146M120 46V96L74 198Q70 208 82 208H178Q190 208 186 198L140 96V46"/>
    <path class="m" d="M100 180h12M96 190h8M106 170h10"/>
    <circle class="a rise" cx="118" cy="190" r="3.5"/><circle class="a rise d2" cx="142" cy="186" r="2.5"/><circle class="a rise d3" cx="130" cy="196" r="4.5"/>
    <path class="f" d="M222 132H318M228 132V214M312 132V214M222 214H318"/>
    <g class="bob"><path class="f" d="M238 104V182a7 7 0 0 0 14 0V104"/><path d="M234 104h22"/><path class="a" d="M238 158h14"/></g>
    <g class="bob d2"><path class="f" d="M263 104V182a7 7 0 0 0 14 0V104"/><path d="M259 104h22"/><path class="a" d="M263 144h14"/></g>
    <g class="bob d3"><path class="f" d="M288 104V182a7 7 0 0 0 14 0V104"/><path d="M284 104h22"/><path class="a" d="M288 166h14"/></g>
    <path class="m" d="M214 78H384M214 30V78"/>
    <path class="a flow2" d="M214 74H236L243 44L250 74H266L272 58L278 74H298L306 28L314 74H334L339 62L344 74H384"/>
    <text x="236" y="38">CO</text><text class="ta" x="312" y="24">NO₂</text><text x="344" y="54">SO₂</text>
    <path d="M340 150a16 16 0 1 0 .1 0M340 150v-22M330 128h20"/><path class="a" d="M340 166l8 8"/>
    <text x="40" y="240">ВОЗДУХ • ВОДА • ПОЧВА • ОТХОДЫ • ШУМ</text>`),
  report: () => S(`
    <path class="m f" d="M84 38H204V226H84Z" transform="rotate(-5 144 132)"/>
    <path class="f" d="M72 34H178L204 60V226H72Z"/><path d="M178 34V60H204"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="88" y="${78 + i * 27}" width="12" height="12"/><path class="m" d="M110 ${84 + i * 27}H${[184, 170, 188, 160, 176][i]}"/><path class="a tick d${(i % 4) + 1}" d="M90 ${84 + i * 27}l4 4 7-9"/>`).join('')}
    <path d="M88 56h56"/>
    <path class="m" d="M240 70H376"/>
    ${['I', 'II', 'III', 'IV'].map((q, i) => `<circle class="${i < 3 ? 'af' : 'f'}" cx="${250 + i * 40}" cy="70" r="5"/><text x="${246 + i * 40 - (q.length - 1) * 3}" y="54">${q}</text>`).join('')}
    <path class="a" d="M250 70H330"/><g><circle class="a pulse" cx="330" cy="70" r="9"/></g>
    <text x="240" y="98">КВАРТАЛ</text>
    <circle class="a d rot" cx="312" cy="168" r="42"/><circle class="a" cx="312" cy="168" r="31"/>
    <path class="a" d="M297 168l11 11 20-24" stroke-width="2.2"/>
    <text x="270" y="236">СДАНО В СРОК</text>`),
  expert: () => S(`
    <path class="m f" d="M70 40H190V222H70Z" transform="rotate(4 130 130)"/>
    <path class="f" d="M58 30H178V222H58Z"/>
    <path d="M74 54h60"/><path class="m" d="M74 80h88M74 98h76M74 116h88M74 134h64M74 152h88M74 170h70M74 188h84"/>
    <path class="a scan" d="M58 70H178" opacity=".9"/>
    <circle class="f" cx="196" cy="150" r="36"/><circle class="a" cx="196" cy="150" r="36"/><path class="a" d="M222 176l30 30" stroke-width="2.4"/>
    <path class="m" d="M174 140h44M174 152h36M174 164h44"/>
    <path class="f" d="M312 44l52 18v46c0 34-22 56-52 68-30-12-52-34-52-68V62Z"/>
    <path class="a" d="M290 108l16 16 30-36" stroke-width="2.4"/>
    <circle class="a d rot" cx="312" cy="110" r="78" opacity=".55"/>
    <text x="268" y="218">ЗАКЛЮЧЕНИЕ</text><text class="ta" x="268" y="232">ПОЛОЖИТЕЛЬНОЕ</text>`),
  edu: () => S(`
    <path class="f" d="M40 70H276V214H40Z"/><path class="m" d="M50 80H266V204H50Z"/>
    <path d="M100 106h116"/><path class="m" d="M82 130h152M96 146h124M110 162h96"/>
    <circle class="a" cx="226" cy="184" r="15"/><circle class="a d rot" cx="226" cy="184" r="21"/><path class="a" d="M218 196l-6 22 14-8 14 8-6-22"/>
    <path class="a tick" d="M72 184l6 6 11-13" stroke-width="2"/>
    <g class="bob"><path class="f" d="M270 60L330 38L390 60L330 82Z"/><path d="M298 72V98Q330 114 362 98V72"/><path class="a" d="M390 60V94"/><circle class="af" cx="390" cy="98" r="4"/></g>
    <circle class="m" cx="336" cy="184" r="30"/><path class="a" d="M336 154a30 30 0 1 1-28.5 20.7" stroke-width="2.4"/>
    <text x="323" y="182" style="fill:currentColor;font-size:13px">72</text><text x="322" y="196">ЧАСА</text>
    <text x="40" y="240">ФИС ФРДО • УДОСТОВЕРЕНИЕ</text>`),
  radar: () => S(`
    ${gridLines(-200, 0, 600, 400, 50)}
    <circle class="m" cx="200" cy="200" r="60"/><circle class="m" cx="200" cy="200" r="120"/><circle cx="200" cy="200" r="180"/><circle class="m d" cx="200" cy="200" r="240"/>
    <path class="m" d="M-100 200H500M200 -20V420"/>
    <g class="rot" style="animation-duration:7s"><circle cx="200" cy="200" r="240" stroke="none"/><path d="M200 200L380 200" stroke-width="2"/><path d="M200 200L380 200A180 180 0 0 0 355.9 110Z" fill="currentColor" stroke="none" opacity=".14"/></g>
    <g><circle class="pulse" cx="282" cy="140" r="10"/><circle class="tf" cx="282" cy="140" r="4"/></g>
    <g><circle class="pulse d2" cx="128" cy="262" r="10"/><circle class="tf" cx="128" cy="262" r="4"/></g>
    <g><circle class="pulse d3" cx="238" cy="296" r="10"/><circle class="tf" cx="238" cy="296" r="4"/></g>
    <g><circle class="pulse d4" cx="120" cy="128" r="10"/><circle class="tf" cx="120" cy="128" r="4"/></g>
    <rect class="f" x="186" y="186" width="28" height="28"/><path d="M193 200l5 5 9-11" stroke-width="2"/>
    <text x="294" y="136" style="fill:currentColor">ДОКУМЕНТЫ</text><text x="140" y="266" style="fill:currentColor">ОТХОДЫ</text><text x="250" y="300" style="fill:currentColor">ВЫБРОСЫ</text><text x="60" y="118" style="fill:currentColor">СБРОСЫ</text>`, '0 0 400 400', 'preserveAspectRatio="xMidYMid slice"'),
};
