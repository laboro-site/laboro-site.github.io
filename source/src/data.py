import json, re, os, base64, io, glob
from PIL import Image
R = '/home/claude/laboro'
inn = json.load(open(f'{R}/inner2.json'))
FIX = {'педприятия':'предприятия','Росии':'России','Государственнной':'Государственной','разный видов':'разных видов','от 2х ':'от 2 ','от 3х ':'от 3 ','от 5ти ':'от 5 ','от 2-х ':'от 2 ','от 3-х ':'от 3 ','более 20-ти':'более 20','др..)':'др.)','клиентами .':'клиентами.',' ( более':' (более'}
def fx(s):
    for a,b in FIX.items(): s = s.replace(a,b)
    s = s.replace(' ',' ')
    s = re.sub(r'[ \t]+\n','\n',s); s = re.sub(r'\n{3,}','\n\n',s)
    return s.strip()
META = [ # slug, group, sym, short name
 ('otchet-ob-inventarizacii-istochnikov-vybrosov','pr','ИНВ','Инвентаризация источников выбросов','plume'),
 ('prisvoenie-kategorii-nvos','pr','НВОС','Присвоение категории НВОС','zone'),
 ('aktualizaciya-kategorii-nvos','pr','АКТ','Актуализация категории НВОС','zone'),
 ('proekt-sanitarno-zashchitnoy-zony','pr','СЗЗ','Проект санитарно-защитной зоны','zone'),
 ('proekt-ndv','pr','НДВ','Проект нормативов допустимых выбросов','limits'),
 ('proekt-noolr','pr','НООЛР','Проект НООЛР','waste'),
 ('plan-meropriyatiy-pri-nmu','pr','НМУ','План мероприятий при НМУ','plume'),
 ('programma-pek','pr','ПЭК','Программа ПЭК','expert'),
 ('pasport-blagoustroystva-territorii','pr','ПБТ','Паспорт благоустройства территории','zone'),
 ('deklaraciya-o-vos-dlya-2-kategorii','pr','ДВОС','Декларация о ВОС для II категории','report'),
 ('gosudarstvennaya-ekologicheskaya-ekspertiza','pr','ГЭЭ','Государственная экологическая экспертиза','expert'),
 ('ocenka-vozdeystviya-na-okruzhayushchuyu-sredu','pr','ОВОС','Оценка воздействия на окружающую среду','expert'),
 ('perechen-meropriyatiy-po-ohrane-okruzhayushchey-sredy-pmoos','pr','ПМООС','Перечень мероприятий по охране окружающей среды','expert'),
 ('2-tp-vozduh','ot','2ТП·В','2-ТП (воздух)','limits'),
 ('4-os','ot','4-ОС','4-ОС','report'),
 ('zhurnal-dvizheniya-othodov','ot','ЖДО','Журнал движения отходов','waste'),
 ('2-tp-othody','ot','2ТП·О','2-ТП (отходы)','waste'),
 ('deklaraciya-o-plate-za-nvos','ot','ДПНВ','Декларация о плате за НВОС','report'),
 ('otchet-po-pek','ot','ОПЭК','Отчёт по ПЭК','report'),
 ('ekologicheskiy-sbor','ot','ЭКСБ','Экологический сбор','waste'),
 ('svodnyy-kadastr-othodov','ot','СКО','Сводный кадастр отходов','waste'),
 ('ekologicheskoe-soprovozhdenie-pod-klyuch','ot','КЛЮЧ','Экологическое сопровождение под ключ','report'),
 ('laboratornye-issledovaniya','lab','ЛАБ','Лабораторные исследования','lab'),
 ('pasportizaciya-othodov','lab','ПАСП','Паспортизация отходов','waste'),
 ('licenziya-po-obrashcheniyu-s-othodami','oth','ЛИЦ','Лицензия по обращению с отходами I–IV классов','expert'),
 ('uchebnyy-centr-dopolnitelnogo-professionalnogo-obrazovaniya','oth','ДПО','Учебный центр','edu'),
]
def items(fields, tk=('li_title',), dk=('li_descr','li_text')):
    out = {}; order = []
    for f in fields:
        m = re.match(r'(li_[a-z]+)__(\d+)', f['f'])
        if not m: continue
        k, i = m.groups()
        if i not in out: out[i] = {}; order.append(i)
        if k in tk: out[i]['t'] = fx(f['t'])
        elif k in dk: out[i]['d'] = fx(f['t'])
    return [out[i] for i in order]
def fld(fields, name):
    for f in fields:
        if f['f'] == name: return fx(f['t'])
    return ''
def norm(rec, slugmap):
    t, F = rec['type'], rec['fields']
    if t in ('248','478'):
        return {'k':'text','title':fld(F,'title'),'text':fld(F,'text') or fld(F,'descr')}
    if t == '1066':
        return {'k':'list','title':fld(F,'btitle'),'descr':fld(F,'bdescr'),'items':items(F)}
    if t in ('497','491','1053','908','490'):
        return {'k':'feat','title':fld(F,'btitle'),'descr':fld(F,'bdescr'),'items':items(F)}
    if t in ('1107','1108'):
        its = []
        for it in items(F):
            s = it.get('d','') or it.get('t','')
            s = s.strip().rstrip('.').strip() if s.strip()=='.' else s.strip()
            if not s: continue
            if '\n' in s:
                a, b = s.split('\n',1); its.append({'t':a.strip().rstrip(':'),'d':b.strip()})
            elif ': ' in s[:60]:
                a, b = s.split(': ',1); its.append({'t':a.strip(),'d':b.strip()[:1].upper()+b.strip()[1:]})
            else: its.append({'t':s})
        return {'k':'steps','title':fld(F,'btitle').rstrip(':'),'items':its}
    if t == '704':
        s = fld(F,'title'); a, _, b = s.partition('\n')
        return {'k':'cta','title':a.strip(),'text':b.strip()}
    if t == '668':
        return {'k':'faq','items':items(F)}
    if t == '851':
        its = items(F); links = [l for l in rec['links'] if l['h'].startswith('/')]
        for it in its:
            for l in links:
                if l['t'] == it['t'] and l['h'].strip('/') in slugmap: it['slug'] = l['h'].strip('/')
        return {'k':'links','title':fld(F,'btitle'),'descr':fld(F,'bdescr'),'items':its}
    if t == '853':
        return {'k':'cards','title':fld(F,'btitle'),'descr':fld(F,'bdescr'),'items':items(F)}
    if t == '672':
        return {'k':'note','text':fld(F,'text')}
    if t == '795':
        return {'k':'head','title':fld(F,'title')}
    if t == '993':
        return {'k':'progs','items':items(F)}
    if t == '889':
        return {'k':'mission','title':fld(F,'title'),'text':fld(F,'descr'),'btn':'Выписка из реестра лицензий','href':'https://drive.google.com/file/d/1CGY5A-VICe_tk9F5UpHUJdrPAyLg9zBz/view'}
    if t == '959':
        its = items(F); d = ''
        return {'k':'tags','title':fld(F,'btitle'),'items':[i['t'] for i in its if 't' in i],'descr':next((i['d'] for i in its if 'd' in i),'')}
    return None
slugmap = {m[0] for m in META}
services = []
for slug, grp, sym, name, ill in META:
    v = inn['https://ooolaboro.ru/'+slug]
    recs = v['recs']; hero = recs[0]['fields']
    title = fld(hero,'title'); descr = fld(hero,'descr')
    full = re.sub(r'^Закажите\s+','',title); full = full[:1].upper()+full[1:]
    term = ''; price = ''
    m = re.search(r'от\s+([\d]+\s*(?:дн\w+|месяц\w*))', descr)
    if m: term = 'от '+m.group(1)
    m = re.search(r'[Сс]тоимост\w+ от ([\d ]+?) рублей( в месяц)?', descr)
    if m: price = 'от '+m.group(1).strip()+' ₽'+(' / мес' if m.group(2) else '')
    blocks = [b for b in (norm(r, slugmap) for r in recs[1:]) if b]
    if sym == 'ДПО':
        old = json.load(open(f'{R}/inner.json'))['https://ooolaboro.ru/'+slug]['recs']
        ln = [fx(x) for x in next(r['text'] for r in old if r['type']=='993').split('\n') if x.strip()]
        progs = {'k':'progs','title':'Перечень программ по направлению «Экологическая безопасность»','items':[{'t':ln[i].strip('"'),'d':ln[i+1].replace(' - ',' • ')} for i in range(0,len(ln)-1,2)]}
        hi = next(i for i,b in enumerate(blocks) if b['k']=='head'); blocks[hi] = progs
    services.append({'slug':slug,'g':grp,'sym':sym,'name':name,'full':full,'order':title,'descr':descr,'term':term,'price':price,'ill':ill,'blocks':blocks})
docs = {}
for key in ('personal','ad','privacy'):
    v = inn['https://ooolaboro.ru/docs/'+key]
    docs[key] = {'title':fx(v['recs'][0]['fields'][0]['t']).replace('\n',' '),'text':fx(v['recs'][1]['fields'][0]['t'])}
docs['cookies'] = {'title':'Использование файлов cookie','text':'Используя данный сайт, вы даёте согласие на использование файлов cookie, помогающих нам стать удобнее для вас.\n\nОригинальная страница политики cookie на действующем сайте не содержит текста; подробности обработки данных — в политике конфиденциальности.'}
# categories
h = open(f'{R}/page.html').read()
cats = []
for n in (1,2,3):
    i = h.find(f'data-tooltip-hook="#popup:infoblock{n}"')
    seg = h[i:i+20000]
    t = re.search(r't390__title[^>]*>(.*?)</div>', seg, re.S).group(1)
    dsc = re.search(r't390__descr[^>]*>(.*?)</div>\s*</div>\s*</div>', seg, re.S).group(1)
    dsc = re.sub(r' data-list="[a-z]+"','',dsc).replace('&nbsp;',' ')
    main, _, foot = dsc.partition('_______________________________')
    main = re.sub(r'(<br>\s*)+При необходимости:(<br>\s*)+','<h4>При необходимости</h4>',main)
    main = re.sub(r'(<br>\s*)+$','',main)
    foot = re.sub(r'^(<br>\s*)+','',foot)
    notes = [re.sub(r'<sup>\s*(\d)\s*</sup>\s*',r'',x).strip() for x in re.split(r'<br>',foot) if x.strip()]
    cats.append({'title':fx(t),'html':main,'notes':notes})
data = {
 'services': services, 'docs': docs, 'cats': cats,
 'groups': [['pr','Проекты'],['ot','Отчётность'],['lab','Лаборатория'],['oth','Другие услуги']],
 'team': [['Артём','Генеральный директор'],['Алексей','Коммерческий директор'],['Родион','Руководитель отдела экологической безопасности'],['Светлана','Эколог'],['Дарья','Эколог'],['Наталья','Эколог'],['Артемий','Руководитель отдела экологического проектирования'],['Виталина','Эколог-проектировщик'],['Евгений','Эколог-проектировщик'],['Елизавета','Эколог-проектировщик'],['Елена','Эколог-проектировщик'],['Татьяна','Специалист отдела экологического проектирования']],
 'thanks': ['ИП Пасько','ООО «ОФФПРАЙС»','АО «Русхимсеть»','АО «Элевел Инженер»','ООО «СПП»','АО «Сан Кемикэл»','ООО «БиоДжет»','АНО ДПО «Образовательный стандарт»','Оздоровительный комплекс «Архангельское»','АНО ДПО «ГТИ»','ООО «Промресурссервис»','ООО «Простые решения»','ООО УЦ «Школа безопасности»','ООО «АлтайБахила»'],
 'clients': ['Москва Карго','ВР-Ресурс','Radisson','ММЗ Авангард','Архангельское','МИД России','Газпром ВНИИГАЗ','Динамо','АэроМар','МЧС России','ЭкоНива','Роскосмос','НЦВ Миль и Камов','Белая Дача','Новатэк','Offprice','Очаково','РЖД'],
}
# assets
def b64(im, fmt='WEBP', **kw):
    bio = io.BytesIO(); im.save(bio, fmt, **kw); 
    return f'data:image/{fmt.lower()};base64,' + base64.b64encode(bio.getvalue()).decode(), len(bio.getvalue())
A = {}; tot = 0
def add(k, v): 
    global tot; A[k] = v[0]; tot += v[1]
for f in sorted(glob.glob(f'{R}/assets_raw/team_*')):
    im = Image.open(f).convert('RGB'); n = int(re.search(r'_(\d+)\.',f).group(1))
    w,hh = im.size; th = int(w*1.3)  # crop 10:13
    im = im.crop((0,0,w,min(hh,th)))
    add(f'team{n}', b64(im, quality=80, method=6))
for f in sorted(glob.glob(f'{R}/assets_raw/thanks_*')):
    im = Image.open(f).convert('RGB'); n = int(re.search(r'_(\d+)\.',f).group(1))
    add(f'thanks{n}', b64(im, quality=62, method=6))
for f in sorted(glob.glob(f'{R}/assets_raw/example_*')):
    im = Image.open(f).convert('RGB'); n = int(re.search(r'_(\d+)\.',f).group(1))
    add(f'example{n}', b64(im, quality=66, method=6))
for f in sorted(glob.glob(f'{R}/assets_raw/client_*')):
    im = Image.open(f).convert('RGBA'); n = int(re.search(r'_(\d+)\.',f).group(1))
    bb = im.getchannel('A').getbbox(); im = im.crop(bb); im.thumbnail((320,150), Image.LANCZOS)
    # keep only alpha as black silhouette for consistent tinting
    add(f'client{n}', b64(im, quality=88, method=6))
    data.setdefault('clientDim',[]).append([im.width, im.height])
im = Image.open(f'{R}/assets_raw/logo_01.png').convert('RGBA')
add('logo', b64(im, 'PNG', optimize=True))
print('assets bytes', tot, 'count', len(A))
json.dump(data, open(f'{R}/build/data.json','w'), ensure_ascii=False)
json.dump(A, open(f'{R}/build/assets.json','w'))
print('data bytes', os.path.getsize(f'{R}/build/data.json'))
for s in services: print(s['sym'], '|', s['term'], '|', s['price'], '|', [b['k'] for b in s['blocks']])
