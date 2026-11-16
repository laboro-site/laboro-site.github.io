import base64, os, re
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); F=f'{R}/fonts/node_modules/@fontsource-variable'
def face(fam, pkg, sub, rng, w):
    b=base64.b64encode(open(f'{F}/{pkg}/files/{pkg}-{sub}-wght-normal.woff2','rb').read()).decode()
    return f"@font-face{{font-family:'{fam}';font-style:normal;font-display:swap;font-weight:{w};src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}"
CYR='U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116'
LAT='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
fonts=''.join([face('Inter','inter','cyrillic',CYR,'100 900'),face('Inter','inter','latin',LAT,'100 900')])
s=open(f'{R}/src/site.js').read()
a=s.index('  /* ---------- shell ---------- */'); b=s.index('  /* ---------- per-view behaviours ---------- */')
s=s[:a]+open(f'{R}/src/v3views.js').read()+s[b:]
s=s.replace("'lb-theme'","'lb3-theme'").replace("'lb-cookie'","'lb3-cookie'")
x="if (theme !== 'light' && theme !== 'dark') theme = 'dark';"; assert x in s; s=s.replace(x,"if (theme !== 'light' && theme !== 'dark') theme = 'light';")
x="$$('.pt .cell').forEach(c => c.classList.toggle('off', g !== 'all' && c.dataset.g !== g));"; assert x in s
s=s.replace(x,x+"\n    const em = $('.pt-empty'); if (em) em.hidden = true; const si = $('[data-search]'); if (si) si.value = '';")
x="mc.content = v === 'dark' ? '#0b0a1c' : '#f3f2ec'"; assert x in s; s=s.replace(x,"mc.content = v === 'dark' ? '#000000' : '#ffffff'")
s=s.replace("parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) - 1","parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) - 8")
open(f'{R}/src/v3.js','w').write(s)
t=open(f'{R}/src/index.tpl.html').read()
t=t.replace('data-theme="dark"','data-theme="light"').replace('content="#0b0a1c"','content="#ffffff"').replace("'lb-theme'","'lb3-theme'")
js=open(f'{R}/src/i18n.js').read()+'\n'+s
data=open(f'{R}/build/data.json').read().replace('</','<\\/')
out=t.replace('/*FONTS*/',fonts).replace('/*CSS*/',open(f'{R}/src/v3.css').read()).replace('/*DATA*/',data).replace('/*ASSETS*/',open(f'{R}/build/assets.json').read()).replace('/*JS*/',js.replace('</script','<\\/script'))
os.makedirs(f'{R}/dist3',exist_ok=True); open(f'{R}/dist3/index.html','w').write(out)
print('built v3', round(os.path.getsize(f'{R}/dist3/index.html')/1e6,2),'MB')
