# Обложка для превью ссылки (Open Graph), 1200×630. Запуск: python3 brand/og.py && node brand/og.js
import os, json, base64, math, random
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); F=f'{R}/fonts/node_modules/@fontsource-variable'
def face(fam,pkg,sub):
    b=base64.b64encode(open(f'{F}/{pkg}/files/{pkg}-{sub}-wght-normal.woff2','rb').read()).decode()
    rng='U+0400-045F,U+0490-0491,U+2116' if sub=='cyrillic' else 'U+0000-00FF,U+2000-206F,U+2022'
    return f"@font-face{{font-family:'{fam}';font-weight:100 900;src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}"
fonts=''.join(face(f,p,s) for f,p in (('Geologica','geologica'),('JetBrains Mono','jetbrains-mono')) for s in ('cyrillic','latin'))
logo=json.load(open(f'{R}/brand/logo.json'))['logo']
random.seed(7)
def plume(sx,sy,ang,spread,n,length):
    out=[]
    for i in range(n):
        t=(i/(n-1)-.5); a=math.radians(ang+t*spread+random.uniform(-2,2)); L=length*random.uniform(.55,1.05)
        bend=random.uniform(-.5,.5)+t*1.1
        c1=(sx+math.cos(a)*L*.35, sy+math.sin(a)*L*.35)
        a2=a+bend*.55; c2=(sx+math.cos(a2)*L*.7, sy+math.sin(a2)*L*.7)
        a3=a+bend; e=(sx+math.cos(a3)*L, sy+math.sin(a3)*L)
        o=random.uniform(.10,.55)*(1-abs(t)*.9); w=random.uniform(.8,1.8)
        out.append(f'<path d="M{sx:.1f} {sy:.1f}C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {e[0]:.1f} {e[1]:.1f}" stroke-width="{w:.2f}" opacity="{o:.2f}"/>')
    return ''.join(out)
def src(x,y,r,label,sub):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="#c9f73a" stroke-opacity=".28" stroke-width="5"/><circle cx="{x}" cy="{y}" r="{r+20}" fill="none" stroke="#fff" stroke-opacity=".16" stroke-dasharray="2 7"/><circle cx="{x}" cy="{y}" r="6" fill="#c9f73a"/><path d="M{x+r+10} {y-22}V{y+22}" stroke="#fff" stroke-opacity=".25"/><text x="{x+r+22}" y="{y-6}" fill="#c9f73a">{label}</text><text x="{x+r+22}" y="{y+16}" fill="#fff" fill-opacity=".5">{sub}</text>'
art=f'''<svg class="art" viewBox="0 0 1200 630" fill="none" stroke-linecap="round"><g stroke="#c9f73a">{plume(850,146,112,50,70,500)}{plume(1000,378,128,44,44,330)}</g><g font-family="JetBrains Mono" font-size="15" letter-spacing="1.2">{src(850,146,34,'ИЗА 0001','55.7447° N')}{src(1000,378,26,'ИЗА 0002','37.6928° E')}</g></svg>'''
html=f'''<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"><style>{fonts}
*{{box-sizing:border-box}}html,body{{margin:0}}
body{{width:1200px;height:630px;background:#0b0a1c;color:#f1f0ea;position:relative;overflow:hidden;font-family:'Geologica',sans-serif;-webkit-font-smoothing:antialiased}}
.grid{{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:100px 100px;background-position:-36px -22px;-webkit-mask-image:radial-gradient(90% 100% at 70% 40%,#000,transparent 85%)}}
.art{{position:absolute;inset:0;width:1200px;height:630px}}
.veil{{position:absolute;inset:0;background:linear-gradient(90deg,#0b0a1c 0,#0b0a1c 38%,rgba(11,10,28,.82) 60%,rgba(11,10,28,0) 84%),linear-gradient(0deg,#0b0a1c 0,rgba(11,10,28,0) 34%)}}
.in{{position:absolute;inset:0;padding:56px 64px 52px;display:flex;flex-direction:column}}
.lg{{width:236px;height:auto;display:block;color:#f1f0ea}}
.mono{{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:17px;letter-spacing:.09em;text-transform:uppercase}}
.eye{{display:flex;align-items:center;gap:12px;color:rgba(241,240,234,.7);margin-top:auto}}.eye::before{{content:'';width:11px;height:11px;background:#c9f73a}}
h1{{font-weight:500;font-size:112px;line-height:.94;letter-spacing:-.05em;margin:22px 0 0 -6px}}h1 span{{display:block;color:rgba(241,240,234,.42)}}
.ft{{display:flex;justify-content:space-between;align-items:center;margin-top:38px;padding-top:22px;border-top:1px solid rgba(255,255,255,.14);color:rgba(241,240,234,.62)}}.ft b{{font-weight:500;color:#c9f73a}}
</style></head><body><div class="grid"></div>{art}<div class="veil"></div>
<div class="in">{logo}
<div class="eye mono">Научно-исследовательский центр • Москва • с 2017</div>
<h1>Экологическая<span>документация</span></h1>
<div class="ft mono"><span>Проекты • Отчётность • Лаборатория</span><b>от выезда до согласования</b></div></div></body></html>'''
open(f'{R}/brand/og.html','w').write(html)
