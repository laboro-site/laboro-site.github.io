import base64, json, os
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); F=f'{R}/fonts/node_modules/@fontsource-variable'
def face(fam, pkg, file, rng, w):
    b=base64.b64encode(open(f'{F}/{pkg}/files/{file}','rb').read()).decode()
    return f"@font-face{{font-family:'{fam}';font-style:normal;font-display:swap;font-weight:{w};src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}"
CYR='U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116'
LAT='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
fonts=''.join([face('Geologica','geologica','geologica-cyrillic-wght-normal.woff2',CYR,'100 900'),face('Geologica','geologica','geologica-latin-wght-normal.woff2',LAT,'100 900'),
 face('Onest','onest','onest-cyrillic-wght-normal.woff2',CYR,'100 900'),face('Onest','onest','onest-latin-wght-normal.woff2',LAT,'100 900'),
 face('JetBrains Mono','jetbrains-mono','jetbrains-mono-cyrillic-wght-normal.woff2',CYR,'100 800'),face('JetBrains Mono','jetbrains-mono','jetbrains-mono-latin-wght-normal.woff2',LAT,'100 800')])
t=open(f'{R}/src/index.tpl.html').read().replace('data-theme="dark"','data-theme="light"').replace('content="#0b0a1c"','content="#eef0f5"').replace("'lb-theme'","'lb1b-theme'")
js=''.join(open(f'{R}/src/{f}').read()+'\n' for f in ('i18n.js','ill.js','site.js'))
data=open(f'{R}/build/data.json').read().replace('</','<\\/')
assets=open(f'{R}/build/assets.json').read()
out=t.replace('/*FONTS*/',fonts).replace('/*CSS*/',open(f'{R}/src/site.css').read()).replace('/*DATA*/',data).replace('/*ASSETS*/',assets).replace('/*JS*/',js.replace('</script','<\\/script'))
SITE='https://laboro-site.github.io'
OG=f'''<meta property="og:type" content="website"><meta property="og:site_name" content="НИЦ Лаборо"><meta property="og:locale" content="ru_RU"><meta property="og:url" content="{SITE}/"><meta property="og:title" content="НИЦ Лаборо — экологическая документация"><meta property="og:description" content="Экологические проекты, отчётность и лабораторные исследования — от выезда на объект до согласования в надзорных органах."><meta property="og:image" content="{SITE}/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
'''
import urllib.parse
BR=json.load(open(f'{R}/brand/logo.json')); FAV=open(f'{R}/brand/favicon.svg').read()
ICON=f'''<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,{urllib.parse.quote(FAV, safe="/:=' ")}"><link rel="apple-touch-icon" href="{SITE}/apple-touch-icon.png">
'''
out=out.replace('<title>',OG+ICON+'<title>',1).replace('/*LOGO*/',BR['logo'])
VERSION=open(f'{R}/VERSION').read().strip()
out=out.replace('/*VERSION*/',VERSION)
open(f'{R}/dist/index.html','w').write(out)
open(f'{R}/dist/laboro-v{VERSION}.html','w').write(out)
print('built', round(os.path.getsize(f'{R}/dist/index.html')/1e6,2),'MB')
