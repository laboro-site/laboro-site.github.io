# Логотип «Клетка» (вариант A): буквы переведены в кривые, чтобы знак не зависел от шрифта.
import os, json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); F=f'{R}/fonts/node_modules/@fontsource-variable/inter/files'
def font(sub):
    f=TTFont(f'{F}/inter-{sub}-wght-normal.woff2'); return instantiateVariableFont(f,{'wght':700,**({'opsz':32} if 'opsz' in [a.axisTag for a in f['fvar'].axes] else {})})
def run(f,text,size,x,y,ls,split=False):
    """returns (list of path d strings, end x). Baseline at y, start at x."""
    gs=f.getGlyphSet(); cmap=f.getBestCmap(); upm=f['head'].unitsPerEm; k=size/upm; out=[]
    for ch in text:
        g=gs[cmap[ord(ch)]]
        p=SVGPathPen(gs, lambda v: f'{v:.2f}'.rstrip('0').rstrip('.')); g.draw(TransformPen(p,(k,0,0,-k,x,y))); out.append(p.getCommands()); x+=g.width*k+ls
    return out, x-ls
def width(f,text,size,ls): return run(f,text,size,0,0,ls)[1]
lat=font('latin'); cyr=font('cyrillic')
# знак: рамка 104×76, «Lã» 54 pt по центру (как в PDF с вариантами), скругление 12 → 4 px при высоте знака 40 px
def mark(ox=0,oy=0,rx=12):
    w=width(lat,'Lã',54,-2); ps,_=run(lat,'Lã',54,ox+60-w/2,oy+80,-2)
    return f'<rect x="{ox+8}" y="{oy+22}" width="104" height="76" rx="{rx}" fill="none" stroke="currentColor" stroke-width="7"/>', ps
def split_tilde(f,size,x,y):
    """«ã» по контурам: (буква, тильда). Тильда — контур с самой высокой нижней границей."""
    from fontTools.pens.recordingPen import DecomposingRecordingPen, RecordingPen
    gs=f.getGlyphSet(); g=gs[f.getBestCmap()[ord('ã')]]; rp=DecomposingRecordingPen(gs); g.draw(rp)
    cs=[]; cur=[]
    for op,args in rp.value:
        cur.append((op,args))
        if op in('closePath','endPath'): cs.append(cur); cur=[]
    k=size/f['head'].unitsPerEm
    def ymin(c):
        r=RecordingPen(); r.value=c; b=BoundsPen(None); r.replay(b); return b.bounds[1]
    def d(c):
        r=RecordingPen(); r.value=c; sp=SVGPathPen(None, lambda v: f'{v:.2f}'.rstrip('0').rstrip('.')); r.replay(TransformPen(sp,(k,0,0,-k,x,y))); return sp.getCommands()
    cs.sort(key=ymin); return ''.join(d(c) for c in cs[:-1]), d(cs[-1])
rect,(L,A)=mark(-4.5,-18.5)            # знак сдвинут в левый верхний угол: рамка занимает 0..111 × 0..83
wps,wend=run(cyr,'Лаборо',72,111+31,0,-2.8)
bp=BoundsPen(cyr.getGlyphSet()); cyr.getGlyphSet()[cyr.getBestCmap()[ord('Л')]].draw(bp); cap=bp.bounds[3]*72/cyr['head'].unitsPerEm
by=41.5+cap/2                          # слово по вертикали по центру рамки
wps,wend=run(cyr,'Лаборо',72,111+31,by,-2.8)
W=round(wend+1); H=83
logo=f'<svg class="lg" viewBox="0 0 {W} {H}" fill="currentColor" role="img" aria-label="Лаборо"><title>Лаборо</title>{rect}<path d="{L}{A}"/><path d="{"".join(wps)}"/></svg>'
open(f'{R}/brand/logo.svg','w').write(logo.replace('<svg class="lg"','<svg xmlns="http://www.w3.org/2000/svg"').replace('currentColor','#15113a'))
# фавикон: залитая плитка, белые буквы, лаймовая тильда
FS=80; w=width(lat,'Lã',FS,-3); (fl,_),_=run(lat,'Lã',FS,60-w/2,89,-3); lw=width(lat,'L',FS,0)-3; body,til=split_tilde(lat,FS,60-w/2+lw,89)
fav=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="24" fill="#15113a"/><path fill="#fff" d="{fl}{body}"/><path fill="#c9f73a" d="{til}"/></svg>'
open(f'{R}/brand/favicon.svg','w').write(fav)
json.dump({'logo':logo,'w':W,'h':H},open(f'{R}/brand/logo.json','w'),ensure_ascii=False)
print(W,H,len(logo),len(fav))
