import markdown, re, base64, json
R='/home/claude/laboro'; F=f'{R}/fonts/node_modules/@fontsource-variable'
def face(fam,pkg,file):
    b=base64.b64encode(open(f'{F}/{pkg}/files/{file}','rb').read()).decode()
    return f"@font-face{{font-family:'{fam}';font-weight:100 900;src:url(data:font/woff2;base64,{b}) format('woff2')}}"
fonts=''.join(face(f,p,f'{p}-{s}-wght-normal.woff2') for f,p in (('Geologica','geologica'),('Onest','onest'),('JetBrains Mono','jetbrains-mono')) for s in ('cyrillic','latin'))
# split cyr/lat into separate family names is unnecessary: later @font-face with same family overrides -> use unicode-range
fonts=fonts.replace("format('woff2')}","format('woff2');unicode-range:U+0400-04FF,U+2116}",1)
parts=fonts.split('@font-face'); out=[]
for i,p in enumerate(parts[1:]):
    rng = 'U+0400-04FF,U+2116,U+20BD' if i%2==0 else 'U+0000-00FF,U+2000-206F,U+2190-21FF'
    p=re.sub(r";unicode-range:[^}]*","",p).replace("format('woff2')}",f"format('woff2');unicode-range:{rng}}}")
    out.append('@font-face'+p)
fonts=''.join(out)
md=open('plan.md').read()
md=re.sub(r'^- \[ \] (.*)$', r'- <span class="cb"></span>\1', md, flags=re.M)
body=markdown.markdown(md, extensions=['tables'])
secs=re.split(r'(?=<h2>)', body); n=0; html=''
for s in secs:
    if not s.strip(): continue
    n+=1; s=s.replace('<h2>', f'<h2><span class="num">{n:02d}</span>',1)
    cls='sec'+(' lead' if n==1 else '')
    html+=f'<section class="{cls}">{s}</section>'
html=html.replace('<ul>\n<li><span class="cb">','<ul class="checks">\n<li><span class="cb">')
logo=json.load(open(f'{R}/build/assets.json'))['logo']
doc=f'''<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"><title>Переезд сайта «Лаборо» с Tilda на свой хостинг</title><style>{fonts}
@page{{size:A4;margin:18mm 16mm 20mm}}
@page:first{{margin:0}}
*{{box-sizing:border-box}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{margin:0;font-family:'Onest',sans-serif;font-size:10.4pt;line-height:1.5;color:#15113a}}
.cover{{height:297mm;background:#0b0a1c;color:#f1f0ea;padding:22mm 18mm 18mm;display:flex;flex-direction:column;page-break-after:always;position:relative;overflow:hidden}}
.cover::before{{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:18mm 18mm;-webkit-mask-image:radial-gradient(120% 80% at 80% 30%,#000,transparent 75%)}}
.cover>*{{position:relative}}
.cover img{{width:42mm;filter:brightness(0) invert(1)}}
.tag{{font-family:'JetBrains Mono',monospace;font-size:8pt;letter-spacing:.08em;text-transform:uppercase;color:rgba(241,240,234,.6);display:flex;align-items:center;gap:3mm}}
.tag::before{{content:'';width:2.4mm;height:2.4mm;background:#c9f73a}}
.cover h1{{font-family:'Geologica',sans-serif;font-weight:500;font-size:44pt;line-height:.98;letter-spacing:-.04em;margin:8mm 0 0}}
.cover h1 span{{color:rgba(241,240,234,.4)}}
.cover p{{font-size:13pt;line-height:1.45;max-width:120mm;color:rgba(241,240,234,.8);margin:9mm 0 0}}
.mid{{margin-top:auto}}
.facts{{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.18);margin-top:16mm}}
.facts div{{padding:5mm 4mm 0 0}}
.facts b{{display:block;font-family:'Geologica',sans-serif;font-weight:400;font-size:24pt;letter-spacing:-.04em;line-height:1}}
.facts b i{{font-style:normal;color:#c9f73a}}
.facts span{{display:block;margin-top:2mm;font-size:8.6pt;line-height:1.3;color:rgba(241,240,234,.62)}}
.foot{{display:flex;justify-content:space-between;margin-top:12mm;font-family:'JetBrains Mono',monospace;font-size:7.6pt;letter-spacing:.06em;text-transform:uppercase;color:rgba(241,240,234,.5)}}
.sec{{margin:0 0 9mm}}
h2{{font-family:'Geologica',sans-serif;font-weight:500;font-size:18pt;letter-spacing:-.03em;line-height:1.1;margin:0 0 4mm;padding-top:4mm;border-top:1.2pt solid #15113a;display:flex;gap:4mm;align-items:baseline;break-after:avoid}}
h2 .num{{font-family:'JetBrains Mono',monospace;font-size:8pt;font-weight:500;letter-spacing:.06em;color:#2a3fff}}
p{{margin:0 0 3mm;orphans:3;widows:3}}
.lead p:first-of-type{{font-size:12.4pt;line-height:1.45}}
table{{width:100%;border-collapse:collapse;margin:1mm 0 4mm;font-size:9.4pt;line-height:1.4}}
th{{text-align:left;font-family:'JetBrains Mono',monospace;font-size:7.4pt;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:rgba(21,17,58,.55);padding:0 3mm 2mm 0;border-bottom:1pt solid #15113a}}
td{{padding:2.4mm 3mm 2.4mm 0;border-bottom:.5pt solid rgba(21,17,58,.16);vertical-align:top}}
td:first-child{{font-weight:600;width:27%}}
tr{{break-inside:avoid}}
ol{{margin:0 0 4mm;padding:0;list-style:none;counter-reset:s}}
ol li{{counter-increment:s;position:relative;padding:2.6mm 0 2.6mm 13mm;border-bottom:.5pt solid rgba(21,17,58,.16);break-inside:avoid}}
ol li::before{{content:counter(s,decimal-leading-zero);position:absolute;left:0;top:1.6mm;font-family:'Geologica',sans-serif;font-weight:300;font-size:16pt;letter-spacing:-.04em;color:#2a3fff}}
ul{{margin:0 0 4mm;padding:0;list-style:none}}
ul li{{position:relative;padding:1.6mm 0 1.6mm 6mm;break-inside:avoid}}
ul li::before{{content:'';position:absolute;left:0;top:4.4mm;width:3mm;height:.5pt;background:#2a3fff}}
ul.checks li{{padding-left:8mm;border-bottom:.5pt solid rgba(21,17,58,.16);padding-top:2.4mm;padding-bottom:2.4mm}}
ul.checks li::before{{display:none}}
.cb{{position:absolute;left:0;top:2.9mm;width:3.6mm;height:3.6mm;border:.9pt solid #15113a;border-radius:.6mm}}
strong{{font-weight:600}}
</style></head><body>
<div class="cover"><img src="{logo}" alt="">
<div class="mid"><div class="tag">План переезда • 13 ноября 2026</div>
<h1>Переезд с&nbsp;Tilda <span>на свой хостинг</span></h1>
<p>Как сайт ooolaboro.ru получает новый дизайн и переходит в собственность компании — без простоя, без потери заявок и позиций в поиске.</p>
<div class="facts"><div><b>33</b><span>страницы сохраняют свои адреса</span></div><div><b>0</b><span>минут простоя при переключении</span></div><div><b>8</b><span>шагов от утверждения дизайна до закрытия Tilda</span></div><div><b>≈1 000<i> ₽</i></b><span>в месяц за хостинг с защитой</span></div></div></div>
<div class="foot"><span>НИЦ Лаборо</span><span>Концепт редизайна и план работ</span></div></div>
{html}</body></html>'''
open('plan.html','w').write(doc)
