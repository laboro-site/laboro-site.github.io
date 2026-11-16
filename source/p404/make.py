import base64, json
R='/home/claude/laboro'; F=f'{R}/fonts/node_modules/@fontsource-variable'
def face(fam,pkg,sub,rng):
    b=base64.b64encode(open(f'{F}/{pkg}/files/{pkg}-{sub}-wght-normal.woff2','rb').read()).decode()
    return f"@font-face{{font-family:'{fam}';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}"
CYR='U+0400-04FF,U+2116'; LAT='U+0000-00FF,U+2000-206F'
fonts=''.join(face(f,p,s,r) for f,p in (('Geologica','geologica'),('Onest','onest'),('JetBrains Mono','jetbrains-mono')) for s,r in (('cyrillic',CYR),('latin',LAT)))
logo=json.load(open(f'{R}/build/assets.json'))['logo']
claw='<path d="M0 0C-26-6-40-34-28-60C-20-44-8-36 8-36C2-26 0-14 0 0Z"/><path d="M6 2C30 0 46-22 42-48C34-34 24-30 12-32C12-20 10-8 6 2Z"/>'
html=f'''<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta name="theme-color" content="#0b0a1c">
<title>404 — НИЦ Лаборо</title><style>{fonts}
:root{{--bg:#0b0a1c;--tx:#f1f0ea;--tx2:rgba(241,240,234,.66);--tx3:rgba(241,240,234,.42);--line:rgba(255,255,255,.09);--line2:rgba(255,255,255,.18);--hl:#c9f73a;--card:#141230;--ease:cubic-bezier(.2,.7,.1,1)}}
*{{box-sizing:border-box}}html,body{{height:100%}}
body{{margin:0;background:var(--bg);color:var(--tx);font-family:'Onest',system-ui,sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;min-height:100svh;overflow-x:hidden}}
body::before{{content:'';position:fixed;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:clamp(56px,7vw,112px) clamp(56px,7vw,112px);-webkit-mask-image:radial-gradient(110% 90% at 60% 40%,#000,transparent 78%);mask-image:radial-gradient(110% 90% at 60% 40%,#000,transparent 78%);opacity:.7;pointer-events:none}}
a{{color:inherit;text-decoration:none}}
header{{position:relative;height:72px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,4.2vw,64px)}}
header img{{width:122px;height:auto;filter:brightness(0) invert(1);display:block}}
.mono{{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.06em;text-transform:uppercase;font-weight:500}}
header .mono{{color:var(--tx2)}}
main{{position:relative;flex:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);align-items:center;gap:clamp(20px,4vw,70px);padding:clamp(16px,3vw,40px) clamp(20px,4.2vw,64px) clamp(28px,5vw,64px);max-width:1488px;width:100%;margin:0 auto}}
.eyebrow{{display:inline-flex;align-items:center;gap:10px;color:var(--tx2)}}.eyebrow::before{{content:'';width:8px;height:8px;background:var(--hl)}}
.num{{font-family:'Geologica';font-weight:500;font-size:clamp(96px,17vw,250px);line-height:.86;letter-spacing:-.06em;margin:clamp(14px,2vw,26px) 0 clamp(10px,1.6vw,20px);display:flex}}
.num span:nth-child(2){{color:var(--hl)}}
.num span{{display:inline-block;animation:drop 1s var(--ease) both}}.num span:nth-child(2){{animation-delay:.08s}}.num span:nth-child(3){{animation-delay:.16s}}
@keyframes drop{{from{{transform:translateY(40%);opacity:0}}}}
h1{{font-family:'Geologica';font-weight:400;font-size:clamp(26px,3.5vw,52px);line-height:1.06;letter-spacing:-.035em;margin:0;text-wrap:balance}}
h1 em{{font-style:normal;color:var(--hl)}}
p{{color:var(--tx2);font-size:clamp(16px,1.3vw,19px);line-height:1.5;max-width:44ch;margin:clamp(14px,1.8vw,22px) 0 clamp(22px,2.6vw,34px)}}
.cta{{display:flex;flex-wrap:wrap;gap:12px}}
.btn{{position:relative;display:inline-flex;align-items:center;gap:12px;height:56px;padding:0 26px;border-radius:4px;font-weight:600;font-size:15px;white-space:nowrap;overflow:hidden;isolation:isolate;transition:color .35s var(--ease),border-color .35s}}
.btn::before{{content:'';position:absolute;inset:0;background:var(--tx);transform:translateY(101%);transition:transform .45s var(--ease);z-index:-1}}
.btn:hover{{color:var(--bg)}}.btn:hover::before{{transform:none}}
.btn-p{{background:var(--hl);color:#0b0a1c}}.btn-g{{border:1px solid var(--line2)}}.btn-g:hover{{border-color:var(--tx)}}
.btn svg{{width:16px;height:16px;transition:transform .35s var(--ease)}}.btn:hover svg{{transform:translateX(4px)}}
.art{{position:relative;min-width:0}}.art svg{{display:block;width:100%;height:auto;overflow:visible}}
.il{{fill:none;stroke:var(--tx);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}}
.il .f{{fill:var(--card)}}.il .a{{stroke:var(--hl)}}.il .af{{fill:var(--hl);stroke:none}}.il .m{{stroke:var(--tx3)}}.il .tf{{fill:var(--tx);stroke:none}}
.il text{{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;fill:var(--tx3);stroke:none}}.il text.ta{{fill:var(--hl)}}
.cl{{transform-box:fill-box;transform-origin:50% 100%;animation:grip 1.6s ease-in-out infinite alternate}}.cl.r{{animation-delay:-.8s}}
@keyframes grip{{from{{transform:rotate(-7deg)}}to{{transform:rotate(7deg)}}}}
.pipe{{transform-box:fill-box;transform-origin:50% 100%;animation:bend 1.6s ease-in-out infinite alternate}}
@keyframes bend{{from{{transform:scaleY(1) translateY(0)}}to{{transform:scaleY(.9) translateY(3px)}}}}
.ant{{transform-box:fill-box;transform-origin:0 100%;animation:sway 3s ease-in-out infinite alternate}}.ant.b{{animation-duration:3.8s;animation-direction:alternate-reverse}}
@keyframes sway{{from{{transform:rotate(-5deg)}}to{{transform:rotate(6deg)}}}}
.eye{{transform-box:fill-box;transform-origin:center;animation:blink 4.5s infinite}}
@keyframes blink{{0%,93%,100%{{transform:scaleY(1)}}96%{{transform:scaleY(.1)}}}}
.puff{{transform-box:fill-box;transform-origin:center;animation:puff 2.6s linear infinite}}.puff.d2{{animation-delay:-.9s}}.puff.d3{{animation-delay:-1.7s}}
@keyframes puff{{0%{{transform:translate(0,0) scale(.5);opacity:0}}25%{{opacity:1}}100%{{transform:translate(26px,-34px) scale(1.5);opacity:0}}}}
.leg{{transform-box:fill-box;transform-origin:50% 0;animation:tap 1.1s ease-in-out infinite alternate}}.leg:nth-of-type(even){{animation-delay:-.55s}}
@keyframes tap{{from{{transform:rotate(-5deg)}}to{{transform:rotate(5deg)}}}}
.dash{{stroke-dasharray:6 8;animation:ds 2.4s linear infinite}}@keyframes ds{{to{{stroke-dashoffset:-56}}}}
footer{{position:relative;display:flex;flex-wrap:wrap;gap:8px 28px;justify-content:space-between;padding:18px clamp(20px,4.2vw,64px);border-top:1px solid var(--line);font-size:12.5px;color:var(--tx3)}}
@media (max-width:860px){{main{{grid-template-columns:1fr}}.art{{order:-1;max-width:460px;margin:0 auto;width:100%}}header .mono{{display:none}}.cta .btn{{flex:1 1 auto;justify-content:center}}}}
@media (prefers-reduced-motion:reduce){{*,*::before{{animation:none!important;transition:none!important}}}}
</style></head><body>
<header><a href="ooolaboro1.html" aria-label="На главную"><img src="{logo}" alt="НИЦ Лаборо" width="400" height="167"></a><span class="mono">Ошибка 404 • страница не найдена</span></header>
<main>
<div><span class="eyebrow mono">Страница не найдена</span>
<div class="num" aria-hidden="true"><span>4</span><span>0</span><span>4</span></div>
<h1>Давайте позже, заняты — <em>конкурентов раком гнём</em></h1>
<p>Такой страницы у нас нет. Возможно, адрес изменился или в ссылке опечатка. Всё остальное на месте.</p>
<div class="cta"><a class="btn btn-p" href="ooolaboro1.html">На главную<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h12M9 3l5 5-5 5"/></svg></a><a class="btn btn-g" href="tel:+74993227799">+7 (499) 322-77-99</a></div></div>
<div class="art"><svg class="il" viewBox="0 0 560 420" role="img" aria-label="Рак клешнями сгибает дымовую трубу конкурента">
<path class="m dash" d="M10 372H550"/>
<circle class="m" cx="300" cy="200" r="178" stroke-dasharray="3 9" opacity=".5"/>
<!-- bent chimney of the competitor -->
<g class="pipe"><path d="M236 150C262 34 392 30 420 148" stroke-width="40" stroke="var(--tx)"/><path d="M236 150C262 34 392 30 420 148" stroke-width="35" stroke="var(--card)"/><path class="a" d="M236 150C262 34 392 30 420 148" stroke-width="35" stroke-dasharray="14 30" stroke-linecap="butt" opacity=".9"/></g>
<g class="a"><circle class="puff" cx="438" cy="176" r="8"/><circle class="puff d2" cx="430" cy="186" r="6"/><circle class="puff d3" cx="446" cy="190" r="10"/></g>
<text x="318" y="34" text-anchor="middle">ТРУБА КОНКУРЕНТА</text><path class="m" d="M318 40V58"/>
<!-- crayfish -->
<g><path class="f" d="M92 318c-22 10-46 4-58-14 16 2 28-2 36-12z"/><path class="f" d="M96 326c-14 20-38 28-58 20 16-6 24-16 28-28z"/><path class="f" d="M108 330c-4 22-22 38-44 40 12-12 16-24 14-38z"/>
<circle class="f" cx="118" cy="306" r="24"/><circle class="f" cx="150" cy="288" r="30"/><circle class="f" cx="190" cy="270" r="36"/>
<path class="m" d="M104 292q16 6 22 26M130 268q20 8 28 34M164 244q26 10 34 46"/>
<g><path class="leg" d="M226 300l-10 34 12 34"/><path class="leg" d="M254 304l-4 32 14 32"/><path class="leg" d="M282 302l4 32 16 30"/><path class="leg" d="M308 294l12 32 18 28"/></g>
<ellipse class="f" cx="262" cy="258" rx="78" ry="50"/>
<path class="m" d="M214 232q46-20 96 0M206 262q56 22 112 0"/>
<path class="a" d="M246 284q16 12 34 0" stroke-width="3"/>
<path d="M296 222l10-30M322 232l16-26"/>
<g class="eye"><circle class="f" cx="308" cy="182" r="12"/><circle class="tf" cx="311" cy="181" r="4.500"/></g><g class="eye"><circle class="f" cx="342" cy="198" r="12"/><circle class="tf" cx="345" cy="197" r="4.500"/></g>
<path d="M298 164l18 4M334 180l18 2" stroke-width="3"/>
<path class="ant a" d="M330 236C392 214 440 232 500 196"/><path class="ant b a" d="M334 248C400 244 452 268 520 250"/>
<!-- arms and claws -->
<path d="M216 228C196 204 204 184 226 172" stroke-width="12"/><path d="M216 228C196 204 204 184 226 172" stroke-width="7" stroke="var(--card)"/>
<path d="M322 222C366 216 404 200 416 176" stroke-width="12"/><path d="M322 222C366 216 404 200 416 176" stroke-width="7" stroke="var(--card)"/>
<g transform="translate(232 180)"><g class="cl f">{claw}</g></g>
<g transform="translate(418 182)"><g class="cl r f">{claw}</g></g>
</g>
<text class="ta" x="40" y="398">ИЗА 0404</text><text x="118" y="398">ИСТОЧНИК НЕ ОБНАРУЖЕН</text>
</svg></div>
</main>
<footer><span>ООО «Научно-исследовательский центр «Лаборо» © 2017–2026</span><span>Концепт редизайна • демо-версия, не официальный сайт</span></footer>
</body></html>'''
open('/mnt/user-data/outputs/ooolaboro1-404.html','w').write(html)
