import base64, json
R='/home/claude/laboro'; F=f'{R}/fonts/node_modules/@fontsource-variable'
def face(fam,pkg,sub,rng):
    b=base64.b64encode(open(f'{F}/{pkg}/files/{pkg}-{sub}-wght-normal.woff2','rb').read()).decode()
    return f"@font-face{{font-family:'{fam}';font-weight:100 900;src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}"
CYR='U+0400-04FF,U+2116,U+20BD'; LAT='U+0000-00FF,U+2000-206F'
fonts=''.join(face(f,p,s,r) for f,p in (('Inter','inter'),('Geologica','geologica'),('Unbounded','unbounded')) for s,r in (('cyrillic',CYR),('latin',LAT)))
old=json.load(open(f'{R}/build/assets.json'))['logo']
# marks: return svg inner for a 120x120 box, colour via currentColor, accent via var(--a)
def m_cell(): return '<rect x="8" y="22" width="104" height="76" rx="16" fill="none" stroke="currentColor" stroke-width="7"/><text x="60" y="80" text-anchor="middle" font-family="Inter" font-weight="700" font-size="54" letter-spacing="-2" fill="currentColor">Lã</text>'
def m_elem(): return '<rect x="10" y="10" width="100" height="100" rx="22" fill="currentColor"/><text x="24" y="36" font-family="Inter" font-weight="600" font-size="15" fill="var(--bg)" opacity=".7">17</text><text x="60" y="90" text-anchor="middle" font-family="Geologica" font-weight="600" font-size="58" letter-spacing="-2" fill="var(--bg)">Lã</text><circle cx="92" cy="30" r="6" fill="var(--a)"/>'
def m_wave(): return '<path d="M26 24V92H62" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><circle cx="84" cy="74" r="19" fill="none" stroke="currentColor" stroke-width="13"/><path d="M103 56V94" stroke="currentColor" stroke-width="13" stroke-linecap="round"/><path d="M62 34q11-13 22 0t22 0" fill="none" stroke="var(--a)" stroke-width="10" stroke-linecap="round"/>'
def m_seal(): return '<circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/><text x="60" y="76" text-anchor="middle" font-family="Unbounded" font-weight="600" font-size="40" letter-spacing="-2" fill="currentColor">Lã</text><circle cx="60" cy="14" r="5" fill="var(--a)"/>'
V=[
 dict(n='A',name='Клетка',mark=m_cell,font='Inter',fw=700,ls=-1.5,acc='#0a6cff',txt='Знак из третьей версии сайта: клетка периодической таблицы со скруглёнными углами. Самое бережное обновление — рамка и «Lã» остаются, уходят тонкие линии и мелкая подпись.',pro='Узнаётся сразу, читается в 16 px',con='Меньше всего отличается от текущего'),
 dict(n='B',name='Элемент',mark=m_elem,font='Geologica',fw=600,ls=-1,acc='#c9f73a',txt='Залитая плитка-элемент. Число 17 в углу стоит на месте атомного номера и отсылает к году основания — 2017. Точка-акцент меняет цвет под носитель.',pro='Сильное пятно, хорошо для иконки и соцсетей',con='Число 17 нужно объяснять'),
 dict(n='C',name='Шлейф',mark=m_wave,font='Geologica',fw=500,ls=-1.5,acc='#19b8f0',txt='Без рамки. Тильда над «а» превращается в волну — шлейф выброса, главный предмет работы компании. Буквы собраны из простых линий одной толщины.',pro='Самый современный и «лёгкий»',con='Дальше всего от привычного знака'),
 dict(n='D',name='Печать',mark=m_seal,font='Unbounded',fw=500,ls=-1.5,acc='#ff5a1f',txt='Круглая печать «согласовано». Говорит о результате: клиент приходит за документом с подписью и печатью. Работает как штамп на отчётах и письмах.',pro='Понятная метафора, удобно ставить на документы',con='Круглые знаки встречаются часто'),
]
def lock(v,h=64,word=True):
    w = 'Лаборо'
    return f'''<span class="lk" style="--h:{h}px"><svg viewBox="0 0 120 120" style="width:var(--h);height:var(--h);--a:{v['acc']}">{v['mark']()}</svg>{f"<b style=\"font-family:'{v['font']}';font-weight:{v['fw']};letter-spacing:{v['ls']*h/64:.2f}px\">{w}</b>" if word else ''}</span>'''
def page(v):
    return f'''<section class="pg"><header><span class="n">{v['n']}</span><div><h2>{v['name']}</h2><p>{v['txt']}</p></div></header>
<div class="grid"><div class="pl light big">{lock(v,104)}</div><div class="pl dark big">{lock(v,104)}</div>
<div class="pl light">{lock(v,40)}<span class="cap">Шапка сайта</span></div><div class="pl acc" style="background:{v['acc']};color:{'#0b0a1c' if v['acc'] in ('#c9f73a','#19b8f0') else '#fff'};--bg:{v['acc']}">{lock(v,56,False)}<span class="cap">Иконка приложения</span></div>
<div class="pl dark"><span class="sizes">{lock(v,48,False)}{lock(v,32,False)}{lock(v,20,False)}{lock(v,16,False)}</span><span class="cap">48 • 32 • 20 • 16 px</span></div><div class="pl light doc"><div class="sheet">{lock(v,22)}<i></i><i style="width:70%"></i><i style="width:84%"></i><i style="width:52%"></i></div><span class="cap">Бланк</span></div></div>
<footer><span><b>Плюс:</b> {v['pro']}</span><span><b>Минус:</b> {v['con']}</span></footer></section>'''
html=f'''<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"><title>Лаборо — варианты обновления логотипа</title><style>{fonts}
@page{{size:A4 landscape;margin:0}}*{{box-sizing:border-box}}html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{margin:0;font-family:'Inter',sans-serif;color:#1c1c1e;font-size:10.5pt;line-height:1.45;letter-spacing:-.01em}}
.pg{{width:297mm;height:210mm;padding:16mm 18mm 13mm;page-break-after:always;display:flex;flex-direction:column;gap:7mm;overflow:hidden}}
.cover{{background:#0b0b0d;color:#f4f4f6;justify-content:space-between}}
.cover h1{{font-size:54pt;font-weight:700;letter-spacing:-.045em;line-height:1;margin:0}}.cover h1 span{{color:#6b6b70}}
.cover p{{font-size:14pt;color:#a0a0a6;max-width:170mm;margin:6mm 0 0;font-weight:500}}
.tag{{font-size:9pt;font-weight:600;color:#a0a0a6;text-transform:uppercase;letter-spacing:.08em}}
.row4{{display:grid;grid-template-columns:repeat(4,1fr);gap:5mm}}.row4>div{{border-radius:6mm;background:#161618;height:46mm;display:grid;place-items:center;color:#f4f4f6;--bg:#161618;position:relative}}
.row4 small{{position:absolute;left:5mm;top:4mm;font-size:9pt;font-weight:600;color:#6b6b70}}
header{{display:flex;gap:8mm;align-items:flex-start}}.n{{font-size:46pt;font-weight:700;letter-spacing:-.05em;line-height:.9;color:#c7c7cc}}
h2{{font-size:24pt;font-weight:700;letter-spacing:-.04em;margin:0 0 2mm;line-height:1}}header p{{margin:0;color:#6b6b70;max-width:190mm;font-weight:500}}
.grid{{flex:1;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;grid-template-rows:1.5fr 1fr;gap:4mm;min-height:0}}
.pl{{border-radius:6mm;display:grid;place-items:center;position:relative;overflow:hidden}}.big{{grid-column:span 2}}
.light{{background:#f4f4f6;color:#1c1c1e;--bg:#f4f4f6}}.dark{{background:#0b0b0d;color:#f4f4f6;--bg:#0b0b0d}}
.cap{{position:absolute;left:5mm;bottom:4mm;font-size:8pt;font-weight:600;opacity:.5}}
.lk{{display:inline-flex;align-items:center;gap:calc(var(--h)*.26)}}.lk svg{{display:block;flex:none}}.lk b{{font-size:calc(var(--h)*.6);line-height:1}}
.acc svg{{--a:currentColor!important}}
.sizes{{display:flex;align-items:center;gap:6mm}}
.sheet{{width:44mm;height:auto;background:#fff;border-radius:3mm;padding:5mm;display:grid;gap:2.2mm;box-shadow:0 6mm 14mm -6mm rgba(0,0,0,.3);margin-bottom:5mm}}.sheet i{{height:1.6mm;border-radius:1mm;background:#dcdce2;margin-top:1mm}}.sheet .lk{{margin-bottom:2mm}}
footer{{display:flex;gap:12mm;font-size:9.5pt;color:#6b6b70;font-weight:500}}footer b{{color:#1c1c1e}}
table{{border-collapse:collapse;width:100%;font-size:10.5pt}}th{{text-align:left;font-size:8.5pt;text-transform:uppercase;letter-spacing:.06em;color:#6b6b70;font-weight:600;padding:0 4mm 3mm 0;border-bottom:1.2pt solid #1c1c1e}}td{{padding:4mm 4mm 4mm 0;border-bottom:.5pt solid #d8d8de;vertical-align:middle;font-weight:500}}td:first-child{{width:62mm}}
.old{{display:grid;grid-template-columns:1fr 1.3fr;gap:10mm;flex:1;min-height:0}}.old .pl img{{width:70mm}}
ul{{margin:0;padding:0;list-style:none;display:grid;gap:3.5mm}}li{{padding-left:6mm;position:relative;font-weight:500}}li::before{{content:'';position:absolute;left:0;top:2.4mm;width:2.4mm;height:2.4mm;border-radius:50%;background:#0a6cff}}
h3{{font-size:14pt;font-weight:700;letter-spacing:-.03em;margin:0 0 4mm}}
</style></head><body>
<section class="pg cover"><span class="tag">НИЦ Лаборо • предложение • 13 ноября 2026</span>
<div><h1>Логотип: <span>четыре варианта обновления</span></h1><p>Идея знака — клетка периодической таблицы с «Lã» — сильная, её стоит сохранить. Ниже четыре способа сделать её чище и современнее. Это эскизы направления, а не готовые товарные знаки.</p></div>
<div class="row4">{''.join(f'<div><small>{v["n"]} • {v["name"]}</small>{lock(v,58)}</div>' for v in V)}</div></section>
<section class="pg"><header><span class="n">0</span><div><h2>Что есть сейчас</h2><p>Текущий знак и причины, по которым его стоит освежить.</p></div></header>
<div class="old"><div class="pl light"><img src="{old}"></div><div style="display:grid;gap:9mm;align-content:center">
<div><h3>Что сохраняем</h3><ul><li>Клетку периодической таблицы — она сразу говорит «наука, лаборатория»</li><li>Сочетание «Lã» с тильдой — узнаваемый элемент</li><li>Название «Лаборо» рядом со знаком</li></ul></div>
<div><h3>Что мешает</h3><ul><li>Мелкая подпись «Научно-исследовательский центр» не читается в шапке сайта и на телефоне</li><li>Тонкие линии и двойная рамка пропадают в маленьком размере, например в иконке вкладки</li><li>Знак и название набраны разными по характеру шрифтами</li></ul></div></div></div></section>
{''.join(page(v) for v in V)}
<section class="pg"><header><span class="n">→</span><div><h2>Сравнение и следующий шаг</h2><p>Выберите направление — после этого знак дорабатывается: точная отрисовка, цвета, правила использования, файлы для печати и сайта.</p></div></header>
<table><tr><th>Вариант</th><th>Характер</th><th>Близость к текущему</th><th>Лучше всего для</th></tr>
{''.join(f'<tr><td>{lock(v,34)}</td><td>{c}</td><td>{d}</td><td>{e}</td></tr>' for v,(c,d,e) in zip(V,[('Спокойный, технологичный','Высокая','Сайта в стиле третьей версии'),('Плотный, уверенный','Средняя','Иконок, соцсетей, первой версии сайта'),('Лёгкий, современный','Низкая','Полного обновления бренда'),('Официальный, «документный»','Низкая','Бланков, отчётов, второй версии сайта')]))}</table>
<ul style="margin-top:auto"><li>Перед использованием любой вариант нужно проверить на сходство с зарегистрированными товарными знаками — эта проверка не проводилась.</li><li>На сайты из трёх версий новые знаки не поставлены: там везде текущий логотип компании.</li></ul></section>
</body></html>'''
open('logo.html','w').write(html)
