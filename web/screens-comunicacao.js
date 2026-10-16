/* ================= Comunicação › Notícias, Push, Banners, Transmissões ================= */
Object.assign(I,{
 image:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
 link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
 copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
 news:'<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>',
 tag:'<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".5"/>',
 send:'<path d="M14.5 21.7a.5.5 0 0 0 .9 0L22 2.5a.5.5 0 0 0-.6-.6L2.3 8.6a.5.5 0 0 0 0 .9l8 3.2a2 2 0 0 1 1.1 1.1z"/><path d="m21.9 2.1-11 10.9"/>',
 video:'<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect width="14" height="12" x="2" y="6" rx="2"/>',
 arrowUp:'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
 arrowDn:'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
 grip:'<circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/>',
 zap:'<path d="M4 14a1 1 0 0 1-.8-1.6l9.9-10.2a.5.5 0 0 1 .9.4l-1.9 6a1 1 0 0 0 .9 1.4h7a1 1 0 0 1 .8 1.6l-9.9 10.2a.5.5 0 0 1-.9-.4l1.9-6a1 1 0 0 0-.9-1.4z"/>',
});
const CTONES=['ceu','menta','damasco','rosado','lima','salvia'];
const fmtWa=t=>esc(t).replace(/\*([^*\n]+)\*/g,'<b>$1</b>').replace(/_([^_\n]+)_/g,'<i>$1</i>').replace(/~([^~\n]+)~/g,'<s>$1</s>').replace(/\n/g,'<br>');
const relD=iso=>{const n=Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);return n===0?'hoje':n===1?'amanhã':n===-1?'ontem':n>0?`em ${n} dias`:`há ${-n} dias`;};
const dIn=iso=>Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);

/* ---------- Notícias ---------- */
const NCATS=[{id:'c1',n:'Eventos',tone:'ceu'},{id:'c2',n:'Culto',tone:'menta'},{id:'c3',n:'Pastoral',tone:'salvia'},{id:'c4',n:'Missões',tone:'damasco'}];
let _nid=0;const NW=(t,c,pub,exp,desc,url='')=>({id:'nw'+(++_nid),t,c,pub,exp,desc,url,cover:''});
const NEWS=[
 NW('Retiro de Jovens 2026 — Inscrições abertas!','c1','2026-09-01','2026-10-16','*Últimas vagas!* Três dias de imersão na Chácara Alva. Inscreva-se pelo app.','/eventos/calendario/ev5'),
 NW('Culto especial de Ação de Graças','c2','2026-09-20','2026-10-04','Domingo, às 10h e às 19h. Traga sua família e um _alimento não perecível_.'),
 NW('Novo grupo de oração nas quintas-feiras','c3','2026-09-28','2026-11-30','Toda quinta, 7h, na Sala de Oração. Aberto a todos.'),
 NW('Conferência Missões — programação completa','c4','2026-09-25','2026-10-09','Palestrantes, horários e oficinas. ~Vagas esgotadas para a oficina 2~ — abrimos nova turma!','/eventos/calendario/ev7'),
 NW('Campanha Missionária 2026','c4','2026-08-01','2026-09-15','Obrigado a todos que contribuíram. Arrecadamos 112% da meta!'),
];
Object.assign(S,{ntab:'news',ntf:'ativas',ntq:''});
const ncById=id=>NCATS.find(c=>c.id===id);
const ntSt=n=>n.exp&&n.exp<NOWD?'exp':'ativa';
const catChip=c=>c?`<span class="cm-cat" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)">${esc(c.n)}</span>`:'<span class="cm-cat none">Sem categoria</span>';
const cover=(n,cls='')=>{const c=ncById(n.c)||{tone:'salvia'};return `<span class="cm-cov ${cls}" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)">${n.cover?`<img src="${esc(n.cover)}" alt="">`:ic('news',cls?26:18)}</span>`;};

function ntPage(){
 const act=NEWS.filter(n=>ntSt(n)==='ativa'),soon=act.filter(n=>n.exp&&dIn(n.exp)<=7);
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Notícias</h1><p class="lede">Avisos e comunicados que aparecem no app</p></div><div class="pact">${rpBtn('comunicacao','noticias')}<button class="btn pri" data-a="${S.ntab==='cats'?'ncNew':'ntNew'}">${ic('plus',15,2.2)}${S.ntab==='cats'?'Nova categoria':'Nova notícia'}</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">No ar</span><span class="kv" style="color:var(--st-int)">${act.length}</span><span class="kd">visíveis no app agora</span></div>
  <div class="k4"><span class="kl">Saem do ar em 7 dias</span><span class="kv" style="${soon.length?'color:var(--st-sol)':''}">${soon.length}</span><span class="kd">${soon.length?esc(soon.sort((a,b)=>a.exp<b.exp?-1:1)[0].t.split(' — ')[0])+' '+relD(soon[0].exp):'nenhuma'}</span></div>
  <div class="k4"><span class="kl">Expiradas</span><span class="kv">${NEWS.length-act.length}</span><span class="kd">guardadas no histórico</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><div class="segc" role="tablist"><button data-a="ntTab" data-v="news" aria-pressed="${S.ntab==='news'}">Notícias</button><button data-a="ntTab" data-v="cats" aria-pressed="${S.ntab==='cats'}">Categorias <small class="cm-n">${NCATS.length}</small></button></div>
  ${S.ntab==='news'?`<label class="sbox">${ic('search',16)}<input id="ntq" placeholder="Buscar notícia" value="${esc(S.ntq)}" autocomplete="off"></label><div class="chips">${[['ativas','No ar'],['exp','Expiradas'],['todas','Todas']].map(c=>`<button class="chipf ${S.ntf===c[0]?'on':''}" data-a="ntF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div>`:''}</div>
  ${S.ntab==='news'?ntList():ncList()}</section>`;
}
function ntList(){
 const q=norm(S.ntq),l=NEWS.filter(n=>(S.ntf==='todas'||(S.ntf==='exp'?ntSt(n)==='exp':ntSt(n)==='ativa'))&&(!q||norm(n.t+' '+(ncById(n.c)?.n||'')).includes(q))).sort((a,b)=>a.pub<b.pub?1:-1);
 if(!l.length)return `<div class="mempty"><p>Nenhuma notícia aqui.</p><span>${S.ntf==='exp'?'Quando uma notícia passa da data de expiração, ela vem para cá.':'Nada corresponde a essa busca.'}</span></div>`;
 return `<div class="cm-nl">${l.map(n=>{const st=ntSt(n),life=n.exp?Math.max(0,Math.min(100,(dIn(n.pub)*-1)/((new Date(n.exp)-new Date(n.pub))/864e5)*100)):0;return `<div class="cm-nr ${st}" tabindex="0" data-a="ntEdit" data-v="${n.id}">${cover(n)}
  <div class="cm-nt"><b>${esc(n.t)}</b><span>${catChip(ncById(n.c))}<span class="soft">Publicada ${fmtD(n.pub)}</span></span></div>
  <div class="cm-life">${n.exp?`<span>${st==='exp'?`Expirou ${relD(n.exp)}`:`Sai do ar <b>${relD(n.exp)}</b>`}</span><span class="tr ${st==='ativa'&&dIn(n.exp)<=7?'warn':''}"><i style="width:${st==='exp'?100:life}%"></i></span>`:'<span>Sem data para sair</span>'}</div>
  <span class="ts">${st==='exp'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Expirada</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>No ar</span>'}</span>
  <div class="hact" style="position:relative"><button class="ibtn sm" data-a="ntMenu" data-v="${n.id}" aria-label="Ações">${ic('dots',16)}</button><div class="pop" id="ntPop-${n.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="ntEdit" data-v="${n.id}">${ic('pen',16)}Editar</button><button class="pi" data-a="ntDup" data-v="${n.id}">${ic('copy',16)}Duplicar</button>${st==='exp'?`<button class="pi" data-a="ntRenew" data-v="${n.id}">${ic('clock',16)}Republicar por 30 dias</button>`:''}<hr><button class="pi danger" data-a="ntDel" data-v="${n.id}">${ic('x',16)}Excluir</button></div></div></div>`;}).join('')}</div><div class="tfoot"><span>${l.length} notícia${l.length===1?'':'s'}</span></div>`;
}
function ncList(){
 return `<div class="cm-cats">${NCATS.map(c=>{const ns=NEWS.filter(n=>n.c===c.id),on=ns.filter(n=>ntSt(n)==='ativa').length;return `<div class="cm-cc" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)"><span class="cm-ci">${ic('tag',18)}</span><input class="cm-cn" value="${esc(c.n)}" data-id="${c.id}" aria-label="Nome da categoria"><span class="cm-cs"><b>${ns.length}</b> notícia${ns.length===1?'':'s'}${on?` · ${on} no ar`:''}</span><button class="ibtn sm" data-a="ncDel" data-v="${c.id}" aria-label="Excluir ${esc(c.n)}">${ic('x',14)}</button></div>`;}).join('')}
  <button class="cm-cc add" data-a="ncNew"><span class="cm-ci">${ic('plus',18,2)}</span><b>Nova categoria</b></button></div>
  <p class="who" style="padding:0 20px 18px;margin:0">Clique no nome para renomear. As alterações salvam sozinhas.</p>`;
}
function ncForm(after){openDlg(`${dlgHead('Nova categoria','Ajuda os membros a filtrar as notícias no app.')}<form id="ncF" class="fgrid one" novalidate><label class="fld"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Jovens" autocomplete="off"><span class="err"></span></label>
  <div class="fld"><span class="fl">Cor</span><div class="cm-sw">${CTONES.map((t,i)=>`<label><input type="radio" name="tone" value="${t}" ${i===NCATS.length%6?'checked':''}><span style="background:var(--tone-${t})"></span></label>`).join('')}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Adicionar</button></div></form>`,'sm');
 const f=$('#ncF'),ok=f.querySelector('[type=submit]');f.n.focus();f.n.addEventListener('input',()=>{ok.disabled=!f.n.value.trim();f.n.closest('.fld').classList.remove('bad');});
 f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(NCATS.some(c=>norm(c.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Essa categoria já existe';return;}const c={id:'c'+Date.now(),n,tone:f.tone.value};NCATS.push(c);closeDlg();if(after)after(c);else{cmRe();toast(`Categoria ${n} criada`);}});}

function ntForm(id){
 const n=id?NEWS.find(x=>x.id===id):null,v=n?{...n}:{t:'',c:NCATS[0]?.id||'',exp:addD(NOWD,30),url:'',desc:'',cover:''};
 openDlg(`${dlgHead(n?'Editar notícia':'Nova notícia',n?`Publicada em ${fmtDate(n.pub)}`:'Aparece no app assim que você publicar.')}
  <div class="cm-split"><form id="ntF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(v.t)}" maxlength="90" placeholder="Ex.: Culto especial de Ação de Graças" autocomplete="off"></label>
   <div class="fld wide"><span class="fl">Categoria</span><div class="cm-catpick" id="ntCats">${ntCatPick(v.c)}</div></div>
   <div class="fld wide"><span class="fl">Sai do ar em</span><div class="cm-exp"><div class="cm-q">${[[7,'1 semana'],[30,'1 mês'],[90,'3 meses'],[0,'Nunca']].map(x=>`<button type="button" data-q="${x[0]}">${x[1]}</button>`).join('')}</div><input type="date" name="exp" value="${v.exp||''}" min="${NOWD}"></div></div>
   <div class="fld wide"><span class="fl">Foto de capa <small>opcional</small></span><div class="cm-drop" id="ntDrop"><span>${ic('image',18)}</span><div><b>Arraste uma imagem ou <u>escolha um arquivo</u></b><small>JPG ou PNG, 1200 × 630 px</small></div><input type="url" name="cover" value="${esc(v.cover)}" placeholder="ou cole uma URL"></div></div>
   <label class="fld wide"><span class="fl">Link ao tocar <small>opcional</small></span><span class="cm-pre">${ic('link',14)}<input name="url" value="${esc(v.url)}" placeholder="https://… ou /eventos/…" autocomplete="off"></span></label>
   <div class="fld wide"><span class="fl">Descrição</span><div class="cm-fmt"><button type="button" data-w="*" title="Negrito"><b>B</b></button><button type="button" data-w="_" title="Itálico"><i>I</i></button><button type="button" data-w="~" title="Riscado"><s>S</s></button><span class="hint">Como no WhatsApp: *negrito*, _itálico_, ~riscado~</span></div><textarea class="ta" name="desc" rows="4" placeholder="O que os membros precisam saber?">${esc(v.desc)}</textarea></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="ntOk">${n?'Salvar':'Publicar'}</button></div>
  </form><aside class="cm-prev"><p class="fl">Como aparece no app</p><div class="cm-phone" id="ntPrev"></div></aside></div>`,'xl');
 const f=$('#ntF'),ok=$('#ntOk');
 const prev=()=>{const c=ncById(f.dataset.c||v.c),t=f.t.value.trim(),cv=f.cover.value.trim();$('#ntPrev').innerHTML=`<div class="cm-pbar"><span>9:41</span><span>Notícias</span><span></span></div><div class="cm-pcard"><div class="cm-pcov" style="--t:var(--tone-${c?.tone||'salvia'});--ti:var(--tone-${c?.tone||'salvia'}-ink)">${cv?`<img src="${esc(cv)}" alt="" onerror="this.remove()">`:ic('news',30)}</div><div class="cm-pbody">${c?`<span class="cm-cat" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)">${esc(c.n)}</span>`:''}<h4>${t?esc(t):'<span class="soft">Título da notícia</span>'}</h4><p>${f.desc.value.trim()?fmtWa(f.desc.value.trim()):'<span class="soft">A descrição aparece aqui.</span>'}</p>${f.url.value.trim()?`<span class="cm-plink">Saiba mais ${ic('arrowR',12,2)}</span>`:''}</div></div>`;ok.disabled=!t||!f.desc.value.trim();
  $$('.cm-q button',f).forEach(b=>b.classList.toggle('on',+b.dataset.q===0?!f.exp.value:f.exp.value===addD(NOWD,+b.dataset.q)));};
 f.dataset.c=v.c;
 f.addEventListener('input',prev);
 $('#ntCats').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.new!==undefined)return ntInlineCat();f.dataset.c=b.dataset.c;$('#ntCats').innerHTML=ntCatPick(b.dataset.c);prev();});
 $$('.cm-q button',f).forEach(b=>b.onclick=()=>{f.exp.value=+b.dataset.q?addD(NOWD,+b.dataset.q):'';prev();});
 $$('.cm-fmt button',f).forEach(b=>b.onclick=()=>{const ta=f.desc,s=ta.selectionStart,e=ta.selectionEnd,w=b.dataset.w,sel=ta.value.slice(s,e)||'texto';ta.setRangeText(w+sel+w,s,e,'select');ta.focus();prev();});
 $('#ntDrop').addEventListener('click',e=>{if(e.target.tagName==='INPUT')return;f.cover.value='';toast('Upload de imagem: em breve no protótipo — cole uma URL por enquanto');});
 prev();setTimeout(()=>f.t.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={t:f.t.value.trim(),c:f.dataset.c,exp:f.exp.value,url:f.url.value.trim(),desc:f.desc.value.trim(),cover:f.cover.value.trim()};
  if(n)Object.assign(n,o);else NEWS.push({...NW(o.t,o.c,NOWD,o.exp,o.desc,o.url),cover:o.cover});closeDlg();S.ntab='news';if(!n)S.ntf='ativas';cmRe();toast(n?'Notícia atualizada':'Notícia publicada no app');},650);});
}
function ntCatPick(sel){return NCATS.map(c=>`<button type="button" class="${c.id===sel?'on':''}" data-c="${c.id}" style="--t:var(--tone-${c.tone});--ti:var(--tone-${c.tone}-ink)"><i></i>${esc(c.n)}</button>`).join('')+`<button type="button" class="new" data-new>${ic('plus',13,2.2)}Nova</button>`;}
function ntInlineCat(){const w=$('#ntCats');if($('#ntNc'))return;w.insertAdjacentHTML('beforeend',`<span class="cm-inl" id="ntNc"><input placeholder="Nome da categoria" maxlength="24"><button type="button" class="btn pri sm">Criar</button><button type="button" class="ibtn sm" aria-label="Cancelar">${ic('x',13)}</button></span>`);
 const box=$('#ntNc'),inp=box.querySelector('input');inp.focus();
 const go=()=>{const n=inp.value.trim();if(!n){inp.focus();return;}let c=NCATS.find(x=>norm(x.n)===norm(n));if(!c){c={id:'c'+Date.now(),n,tone:CTONES[NCATS.length%6]};NCATS.push(c);}const f=$('#ntF');f.dataset.c=c.id;w.innerHTML=ntCatPick(c.id);f.dispatchEvent(new Event('input'));toast(`Categoria ${n} criada`);};
 box.querySelector('.btn').onclick=go;inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}if(e.key==='Escape'){e.stopPropagation();box.remove();}});box.querySelector('.ibtn').onclick=()=>box.remove();}

/* ---------- Envio de Push ---------- */
const SEGS=[['todos','Todos os membros',1247,'users'],['integrados','Membros integrados',986,'circleCheck'],['grupos','Participantes de Casas',483,'home'],['jovens','Jovens (18–35 anos)',198,'flame'],['aniv','Aniversariantes do mês',34,'gift'],['mini','Um ministério',0,'music']];
let _psid=0;const PS=(t,msg,seg,type,st,dt,ch=['push'],open=null)=>({id:'ps'+(++_psid),t,msg,seg,type,st,dt,ch,open});
const PUSHES=[
 PS('Culto de Celebração — hoje às 19h','Te esperamos! Chegue cedo e traga um amigo 🙌','todos','manual','enviado','2026-09-18 09:00',['push'],46),
 PS('Feliz aniversário, Ana Clara Lima! 🎂','Que Deus abençoe seu novo ciclo. Com carinho, Alva Sede.','aniv','auto','agendado','2026-10-03 08:00'),
 PS('Feliz aniversário, Marcos Souza Ramos! 🎂','Que Deus abençoe seu novo ciclo. Com carinho, Alva Sede.','aniv','auto','agendado','2026-10-06 08:00'),
 PS('Você está escalado — Culto de Domingo','Louvor · Domingo, 10h. Confirme pelo app.','mini:Louvor','auto','agendado','2026-10-03 10:00'),
 PS('Inscrições abertas — Retiro de Jovens 2026','Últimas vagas! Garanta a sua pelo app.','jovens','manual','enviado','2026-09-01 12:00',['push','email'],58),
 PS('Conferência Missões começa sexta','Confira a programação e escolha suas oficinas.','todos','manual','agendado','2026-10-08 18:00',['push','email']),
];
const AUTOS=[{id:'au1',n:'Aniversário',d:'No dia, às 8h, para o aniversariante',icon:'gift',on:true},{id:'au2',n:'Escala',d:'1 dia antes, para quem está escalado',icon:'calendar',on:true},{id:'au3',n:'Boas-vindas',d:'Quando um membro é integrado',icon:'smile',on:false}];
Object.assign(S,{puf:'prox',pw:null});
const segOf=k=>k.startsWith('mini:')?['mini','Ministério de '+k.slice(5),(MINIS.find(m=>m.n===k.slice(5))||{m:24}).m||24,'music']:SEGS.find(s=>s[0]===k);
const dtFmt=dt=>{const [d,t]=dt.split(' ');return `${wd(d)}, ${fmtD(d)} · ${hm(t)}`;};

function puPage(){
 if(S.pw)return puWizard();
 const ag=PUSHES.filter(p=>p.st==='agendado'),env=PUSHES.filter(p=>p.st==='enviado'),op=env.filter(p=>p.open),rate=op.length?Math.round(op.reduce((a,p)=>a+p.open,0)/op.length):0;
 const l=PUSHES.filter(p=>S.puf==='todos'||(S.puf==='prox'?p.st==='agendado':S.puf==='env'?p.st==='enviado':p.st==='cancelado')).sort((a,b)=>(a.dt<b.dt?-1:1)*(S.puf==='prox'?1:-1));
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Push e e-mail</h1><p class="lede">Avisos que chegam no celular e na caixa de entrada dos membros</p></div><div class="pact">${rpBtn('comunicacao','envios')}<button class="btn pri" data-a="puNew">${ic('send',15)}Novo envio</button></div></header>
 <div class="cm-pg rise" style="--d:1">
  <section class="card kpis4 k3"><div class="k4"><span class="kl">Agendados</span><span class="kv">${ag.length}</span><span class="kd">${ag.length?'próximo '+relD(ag.sort((a,b)=>a.dt<b.dt?-1:1)[0].dt.slice(0,10)):'nenhum'}</span></div><div class="k4"><span class="kl">Enviados no mês</span><span class="kv">${env.length}</span><span class="kd">${env.reduce((a,p)=>a+segOf(p.seg)[2],0).toLocaleString('pt-BR')} pessoas alcançadas</span></div><div class="k4"><span class="kl">Taxa de abertura</span><span class="kv" style="color:var(--st-int)">${rate}<small style="font-size:.55em">%</small></span><span class="kd">média dos últimos envios</span></div></section>
  <section class="card cm-auto"><div class="sh"><h2>${ic('zap',16,2)} Automáticos</h2></div>${AUTOS.map(a=>`<label class="tog cm-au"><span class="htile" style="--s:34px;background:var(--brand-soft);color:var(--brand-text)">${ic(a.icon,16)}</span><span><b>${a.n}</b><small>${a.d}</small></span><input type="checkbox" data-au="${a.id}" ${a.on?'checked':''}><span class="sw"></span></label>`).join('')}</section>
 </div>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><div class="chips">${[['prox','Agendados',ag.length],['env','Enviados',env.length],['canc','Cancelados',PUSHES.filter(p=>p.st==='cancelado').length],['todos','Todos',PUSHES.length]].map(c=>`<button class="chipf ${S.puf===c[0]?'on':''}" data-a="puF" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="cm-pl">${l.map(p=>{const s=segOf(p.seg);return `<div class="cm-pr ${p.st}">
   <span class="cm-pd"><b>${+p.dt.slice(8,10)}</b><small>${MONTHS[+p.dt.slice(5,7)-1].slice(0,3)}</small><em>${hm(p.dt.slice(11))}</em></span>
   <div class="cm-pt"><b>${esc(p.t)}</b><span>${esc(p.msg)}</span></div>
   <div class="cm-pm"><span class="cm-seg">${ic(s[3],13)}${esc(s[1])}<small>${s[2].toLocaleString('pt-BR')}</small></span><span class="cm-chs">${p.ch.map(c=>`<i title="${c==='push'?'Push':'E-mail'}">${ic(c==='push'?'bell':'mail',12)}</i>`).join('')}${p.type==='auto'?`<em title="Automático">${ic('zap',11,2)}Auto</em>`:''}</span></div>
   <div class="cm-ps">${p.st==='enviado'?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Enviado</span>${p.open?`<small>${p.open}% abriram</small>`:''}`:p.st==='agendado'?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>${relD(p.dt.slice(0,10)).replace(/^./,c=>c.toUpperCase())}</span>`:'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Cancelado</span>'}</div>
   <div class="cm-pa">${p.st==='agendado'?`<button class="btn sec sm" data-a="puCancel" data-v="${p.id}">Cancelar</button>`:p.st==='enviado'?`<button class="btn ghost sm" data-a="puAgain" data-v="${p.id}">${ic('copy',13)}Reenviar</button>`:''}</div></div>`;}).join('')}</div>`:'<div class="mempty"><p>Nada por aqui.</p><span>Os envios aparecem aqui conforme forem criados.</span></div>'}
  <div class="tfoot"><span>${l.length} envio${l.length===1?'':'s'}</span><span>${ic('gift',13)} Ao integrar um membro, o aniversário dele já entra nos automáticos.</span></div></section>`;
}
const PSTEPS=['Conteúdo','Público','Quando','Revisão'];
function puWizard(){const w=S.pw,s=segOf(w.seg==='mini'?'mini:'+w.mini:w.seg);
 return `<nav class="crumb rise"><span class="soft">Comunicação</span>${ic('chevR',13,2)}<button class="lnk back" data-a="puBack">Push e e-mail</button>${ic('chevR',13,2)}<span>Novo envio</span></nav>
 <header class="ph rise" style="--d:1"><div><h1>Novo envio</h1><p class="lede">Escreva, escolha quem recebe e quando</p></div></header>
 ${w.done?puDone(w,s):`<ol class="cm-steps rise" style="--d:1">${PSTEPS.map((t,i)=>`<li class="${i<w.step?'done':i===w.step?'on':''}"><button ${i<w.step?`data-a="puStep" data-v="${i}"`:'disabled'}><i>${i<w.step?ic('check',12,3):i+1}</i>${t}</button></li>`).join('')}</ol>
 <div class="cm-wz rise" style="--d:2"><section class="card cm-wc" id="puCard">${puStepHtml(w,s)}</section>
  <aside class="cm-wp"><div class="cm-lock"><span class="cm-pvl">Prévia</span><span class="cm-lt">${w.when==='later'&&w.d?(()=>{const s=`${['domingo','segunda','terça','quarta','quinta','sexta','sábado'][dow(w.d)]}, ${+w.d.slice(8)} de ${MONTHS[+w.d.slice(5,7)-1]}`;return s[0].toUpperCase()+s.slice(1);})():'Quinta, 1 de outubro'}</span><b class="cm-lc">${w.when==='later'&&w.t?(+w.t.slice(0,2))+':'+w.t.slice(3):'9:41'}</b>
   <div class="cm-nt2 ${w.ch.includes('push')?'':'off'}"><span class="cm-na">a</span><div><span class="cm-nh"><b>Alva</b><small>${w.when==='later'?'agendado':'agora'}</small></span><b id="pvT">${w.title?esc(w.title):'Título da notificação'}</b><p id="pvM">${w.msg?esc(w.msg):'A mensagem aparece aqui…'}</p></div></div>
   ${w.ch.includes('email')?`<div class="cm-nt2 mail"><span class="cm-na m">${ic('mail',14)}</span><div><span class="cm-nh"><b>Alva Sede</b><small>e-mail</small></span><b>${w.title?esc(w.title):'Assunto do e-mail'}</b><p>${w.msg?esc(w.msg):'…'}</p></div></div>`:''}
   <div class="cm-reach in">${ic('users',14)}<b>${s[2].toLocaleString('pt-BR')}</b><span>pessoas vão receber</span></div></div></aside></div>`}`;
}
function puStepHtml(w,s){
 const foot=(ok=true,label='Avançar')=>`<div class="cm-wf"><button class="btn sec" data-a="${w.step?'puPrev':'puBack'}">${w.step?ic('chevL',14,2)+'Voltar':'Cancelar'}</button><button class="btn pri" data-a="puNext" id="puNx" ${ok?'':'disabled'}>${label}${w.step<3?ic('arrowR',14,2):''}</button></div>`;
 if(w.step===0)return `<h2>O que você quer dizer?</h2>
  <div class="fld"><span class="fl">Enviar por</span><div class="cm-chpick">${[['push','Push no app','bell'],['email','E-mail','mail']].map(c=>`<label><input type="checkbox" data-ch="${c[0]}" ${w.ch.includes(c[0])?'checked':''}><span>${ic(c[2],15)}${c[1]}</span></label>`).join('')}</div></div>
  <label class="fld"><span class="fl cm-cnt">Título <small id="ctT">${w.title.length}/65</small></span><input id="puT" maxlength="65" value="${esc(w.title)}" placeholder="Ex.: 🙌 Lembrete: Culto de Domingo"></label>
  <label class="fld"><span class="fl cm-cnt">Mensagem <small id="ctM">${w.msg.length}/200</small></span><textarea class="ta" id="puM" maxlength="200" rows="3" placeholder="Ex.: O culto começa às 10h. Te esperamos!">${esc(w.msg)}</textarea></label>
  <div class="cm-emo">${['🙌','🙏','❤️','🎉','📖','🎂','⛪'].map(e=>`<button type="button" data-e="${e}">${e}</button>`).join('')}<span class="hint">Toque para inserir na mensagem</span></div>
  <label class="fld"><span class="fl">Ao tocar, abrir <small>opcional</small></span><span class="selw"><select id="puL"><option value="">A tela inicial do app</option>${EVTS.filter(e=>!past(e)&&e.st!=='previsao').slice(0,6).map(e=>`<option ${w.link===e.t?'selected':''}>${esc(e.t)}</option>`).join('')}<option ${w.link==='Doações'?'selected':''}>Doações</option></select>${ic('updown',14)}</span></label>
  ${foot(w.title.trim()&&w.msg.trim()&&w.ch.length)}`;
 if(w.step===1)return `<h2>Quem vai receber?</h2><div class="cm-segs">${SEGS.map(g=>`<label class="${w.seg===g[0]?'on':''}"><input type="radio" name="seg" value="${g[0]}" ${w.seg===g[0]?'checked':''}><span class="htile" style="--s:36px;background:var(--brand-soft);color:var(--brand-text)">${ic(g[3],17)}</span><span><b>${g[1]}</b><small>${g[0]==='mini'?'escolha abaixo':g[2].toLocaleString('pt-BR')+' pessoas'}</small></span><i class="cm-rd"></i></label>`).join('')}</div>
  ${w.seg==='mini'?`<div class="cm-minis">${MINIS.filter(m=>m.active).map(m=>`<button type="button" class="${w.mini===m.n?'on':''}" data-mini="${esc(m.n)}">${esc(m.n)}<small>${m.m||''}</small></button>`).join('')}</div>`:''}
  ${foot(w.seg!=='mini'||w.mini)}`;
 if(w.step===2)return `<h2>Quando enviar?</h2><div class="cm-when">${[['now','Enviar agora','Chega em segundos','zap'],['later','Agendar','Escolha dia e hora','clock']].map(o=>`<label class="${w.when===o[0]?'on':''}"><input type="radio" name="when" value="${o[0]}" ${w.when===o[0]?'checked':''}><span class="htile" style="--s:36px;background:var(--brand-soft);color:var(--brand-text)">${ic(o[3],17)}</span><span><b>${o[1]}</b><small>${o[2]}</small></span><i class="cm-rd"></i></label>`).join('')}</div>
  ${w.when==='later'?`<div class="cm-sug">${[['2026-10-04','08:00','Domingo, 8h'],['2026-10-02','09:00','Amanhã, 9h'],['2026-10-03','18:00','Sábado, 18h']].map(x=>`<button type="button" class="${w.d===x[0]&&w.t===x[1]?'on':''}" data-d="${x[0]}" data-t="${x[1]}">${x[2]}</button>`).join('')}</div>
   <div class="fgrid"><label class="fld"><span class="fl">Data</span><input type="date" id="puD" min="${NOWD}" value="${w.d||''}"></label><label class="fld"><span class="fl">Hora</span><input type="time" id="puH" value="${w.t||'09:00'}" step="900"></label></div>`:''}
  ${foot(w.when==='now'||(w.d&&w.t))}`;
 return `<h2>Tudo certo?</h2><dl class="cm-rev">${[['Canais',w.ch.map(c=>c==='push'?'Push no app':'E-mail').join(' + '),0],['Título',esc(w.title),0],['Mensagem',esc(w.msg),0],['Ao tocar',esc(w.link||'Tela inicial do app'),0],['Público',`${esc(s[1])} · ${s[2].toLocaleString('pt-BR')} pessoas`,1],['Quando',w.when==='now'?'Agora':dtFmt(w.d+' '+w.t),2]].map(r=>`<div><dt>${r[0]}</dt><dd>${r[1]}</dd><button class="lnk" data-a="puStep" data-v="${r[2]}">Editar</button></div>`).join('')}</dl>
  ${foot(true,w.when==='now'?ic('send',15)+'Enviar agora':ic('clock',15)+'Agendar envio')}`;
}
function puDone(w,s){return `<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('check',30,2.6)}</span><h2>${w.when==='now'?'Enviado!':'Envio agendado'}</h2><p>${w.when==='now'?`Sua mensagem está chegando para <b>${s[2].toLocaleString('pt-BR')}</b> pessoas.`:`Vai para <b>${esc(s[1])}</b> em ${dtFmt(w.d+' '+w.t)}.`}</p>
 <div class="cm-dsum"><b>${esc(w.title)}</b><span>${esc(w.msg)}</span></div><div class="row2" style="justify-content:center"><button class="btn sec" data-a="puNew">Novo envio</button><button class="btn pri" data-a="puBack">Ver envios</button></div></section>`;}
function puAfter(){
 $$('[data-au]').forEach(i=>i.addEventListener('change',()=>{const a=AUTOS.find(x=>x.id===i.dataset.au);a.on=i.checked;toast(`${a.n}: envio automático ${a.on?'ligado':'desligado'}`);}));
 const w=S.pw;if(!w||w.done)return;const c=$('#puCard');if(!c)return;
 const valid=()=>{const nx=$('#puNx');if(!nx)return;nx.disabled=w.step===0?!(w.title.trim()&&w.msg.trim()&&w.ch.length):w.step===1?(w.seg==='mini'&&!w.mini):w.step===2?!(w.when==='now'||(w.d&&w.t)):false;};
 const T=$('#puT'),M=$('#puM');
 if(T){T.addEventListener('input',()=>{w.title=T.value;$('#ctT').textContent=`${T.value.length}/65`;$$('#pvT').forEach(x=>x.textContent=T.value||'Título da notificação');const ms=$('.cm-nt2.mail div>b');if(ms)ms.textContent=T.value||'Assunto do e-mail';valid();});
  M.addEventListener('input',()=>{w.msg=M.value;$('#ctM').textContent=`${M.value.length}/200`;$('#pvM').textContent=M.value||'A mensagem aparece aqui…';valid();});
  $('#puL').addEventListener('change',e=>w.link=e.target.value);
  $$('.cm-emo button').forEach(b=>b.onclick=()=>{const s=M.selectionStart??M.value.length;M.setRangeText(b.dataset.e,s,M.selectionEnd??s,'end');M.focus();M.dispatchEvent(new Event('input'));});
  $$('[data-ch]').forEach(i=>i.addEventListener('change',()=>{w.ch=$$('[data-ch]').filter(x=>x.checked).map(x=>x.dataset.ch);puRe();}));}
 $$('[name=seg]').forEach(r=>r.addEventListener('change',()=>{w.seg=r.value;if(r.value!=='mini')w.mini=null;puRe();}));
 $$('[data-mini]').forEach(b=>b.onclick=()=>{w.mini=b.dataset.mini;puRe();});
 $$('[name=when]').forEach(r=>r.addEventListener('change',()=>{w.when=r.value;puRe();}));
 $$('.cm-sug button').forEach(b=>b.onclick=()=>{w.d=b.dataset.d;w.t=b.dataset.t;puRe();});
 const D=$('#puD'),H=$('#puH');if(D){D.addEventListener('change',()=>{w.d=D.value;puRe();});H.addEventListener('change',()=>{w.t=H.value;puRe();});}
}
const puRe=()=>{const y=window.scrollY,a=document.activeElement?.id;render();window.scrollTo(0,y);if(a&&$('#'+a))$('#'+a).focus();};

/* ---------- Banners ---------- */
const GRADS=[['ceu','#2f6fbd','#7fb4ec'],['mata','#1f8a4c','#6cc690'],['ambar','#b4561b','#e3a06a'],['vinho','#7a2048','#c96a92'],['noite','#1d2b4f','#5a6ea8'],['areia','#8a6d3b','#d7bb84']];
let _bid2=0;const BN=(t,g,f,to,dest,act=true)=>({id:'bn'+(++_bid2),t,g,f,to,dest,act,sub:''});
const BANNERS=[BN('Retiro de Jovens 2026','ceu','2026-09-01','2026-10-16',['evento','ev5']),BN('Campanha Reforma do Templo','mata','2026-08-01','2026-12-31',['doacoes','']),BN('Conferência Missões','ambar','2026-09-15','2026-10-09',['evento','ev7'],false)];
BANNERS[0].sub='Últimas vagas · 17 a 19 de outubro';BANNERS[1].sub='Faltam R$ 48 mil para a meta';BANNERS[2].sub='9 de outubro, 19h30';
Object.assign(S,{bnI:0});
const gBg=g=>{const x=GRADS.find(z=>z[0]===g)||GRADS[0];return `linear-gradient(120deg,${x[1]},${x[2]})`;};
const destTxt=d=>d[0]==='evento'?(eById(d[1])?.t||'Evento'):d[0]==='doacoes'?'Doações':d[0]==='noticia'?(NEWS.find(n=>n.id===d[1])?.t||'Notícia'):d[1]||'Link externo';
const destIc=d=>({evento:'calendar',doacoes:'wallet',noticia:'news',link:'link'})[d[0]];
const bnLive=b=>b.act&&b.f<=NOWD&&b.to>=NOWD;
function bnPage(){
 const live=BANNERS.filter(bnLive);if(S.bnI>=live.length)S.bnI=0;
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Banners</h1><p class="lede">Os destaques que giram no topo do app e do site</p></div><div class="pact"><button class="btn pri" data-a="bnNew">${ic('plus',15,2.2)}Novo banner</button></div></header>
 <section class="card cm-bhero rise" style="--d:1"><div class="cm-bph"><div class="cm-bscr">${live.length?live.map((b,i)=>`<div class="cm-bsl ${i===S.bnI?'on':''}" style="background:${gBg(b.g)}"><b>${esc(b.t)}</b><span>${esc(b.sub)}</span></div>`).join(''):'<div class="cm-bsl on empty"><span>Nenhum banner no ar</span></div>'}<div class="cm-dots">${live.map((_,i)=>`<i class="${i===S.bnI?'on':''}"></i>`).join('')}</div></div><div class="cm-bsk"><i></i><i></i><i></i></div></div>
  <div class="cm-bht"><p class="eb">No ar agora</p><h2>${live.length} banner${live.length===1?'':'s'} girando no app</h2><p class="who">Trocam a cada 5 segundos, na ordem abaixo. Arraste ou use as setas para mudar.</p>
   <ol class="cm-bord">${BANNERS.filter(b=>b.act).map((b,i,a)=>`<li data-id="${b.id}"><span class="cm-grip" title="Arraste para reordenar">${ic('grip',14,2)}</span><span class="cm-bsw" style="background:${gBg(b.g)}"></span><span class="cm-bon">${esc(b.t)}${bnLive(b)?'':`<small>${b.f>NOWD?'entra '+relD(b.f):'período encerrado'}</small>`}</span><button class="ibtn sm" data-a="bnUp" data-v="${b.id}" ${i?'':'disabled'} aria-label="Subir">${ic('arrowUp',13,2)}</button><button class="ibtn sm" data-a="bnDn" data-v="${b.id}" ${i<a.length-1?'':'disabled'} aria-label="Descer">${ic('arrowDn',13,2)}</button></li>`).join('')}</ol></div></section>
 <p class="cm-dhint rise" style="--d:2">${ic('grip',13,2)}Arraste os cartões pelo ${ic('grip',12,2)} para mudar a ordem no carrossel</p><div class="cm-bgrid rise" id="bnGrid" style="--d:2">${BANNERS.map(b=>{const ord=BANNERS.filter(x=>x.act).indexOf(b)+1;const tot=Math.max(1,(new Date(b.to)-new Date(b.f))/864e5),pg=Math.max(0,Math.min(100,(new Date(NOWD)-new Date(b.f))/864e5/tot*100)),lv=bnLive(b);return `<article class="card cm-bc ${b.act?'':'off'}" data-id="${b.id}">
  <div class="cm-bv" style="background:${gBg(b.g)}"><button class="cm-bgrip" type="button" aria-label="Arrastar para reordenar" title="Arraste para reordenar">${ic('grip',16,2.2)}</button>${b.act?`<span class="cm-bord-n">${ord}º</span>`:''}<b>${esc(b.t)}</b><span>${esc(b.sub)}</span>${lv?'<em class="cm-onair">No ar</em>':''}</div>
  <div class="cm-bb"><div class="cm-bper"><span>${fmtD(b.f)} – ${fmtD(b.to)}</span><span class="soft">${b.to<NOWD?'encerrado':b.f>NOWD?'começa '+relD(b.f):'termina '+relD(b.to)}</span></div><span class="tr"><i style="width:${b.to<NOWD?100:b.f>NOWD?0:pg}%"></i></span>
   <span class="cm-dest">${ic(destIc(b.dest),13)}${esc(destTxt(b.dest))}</span>
   <footer><label class="tog cm-bt"><input type="checkbox" data-bn="${b.id}" ${b.act?'checked':''}><span class="sw"></span><span>${b.act?'Ativo':'Pausado'}</span></label><span class="row2"><button class="btn sec sm" data-a="bnEdit" data-v="${b.id}">${ic('pen',13)}Editar</button><button class="ibtn sm" data-a="bnDel" data-v="${b.id}" aria-label="Excluir">${ic('x',14)}</button></span></footer></div></article>`;}).join('')}
  <button class="cm-badd" data-a="bnNew"><span>${ic('plus',20,2)}</span><b>Novo banner</b><small>Imagem, período e destino</small></button></div>`;
}
function bnForm(id){const b=id?BANNERS.find(x=>x.id===id):null,v=b?{...b}:{t:'',sub:'',g:'noite',f:NOWD,to:addD(NOWD,30),dest:['evento',EVTS.find(e=>!past(e)&&e.st!=='previsao')?.id]};
 openDlg(`${dlgHead(b?'Editar banner':'Novo banner','Formato 16:9 no app, 3:1 no site.')}
  <div class="cm-bprev" id="bnPv"></div>
  <form id="bnF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Título</span><input name="t" value="${esc(v.t)}" maxlength="40" placeholder="Ex.: Conferência Missões" autocomplete="off"></label>
   <label class="fld wide"><span class="fl">Linha de apoio <small>opcional</small></span><input name="sub" value="${esc(v.sub)}" maxlength="50" placeholder="Ex.: 9 de outubro, 19h30" autocomplete="off"></label>
   <div class="fld wide"><span class="fl">Fundo</span><div class="cm-gp">${GRADS.map(g=>`<label><input type="radio" name="g" value="${g[0]}" ${v.g===g[0]?'checked':''}><span style="background:linear-gradient(120deg,${g[1]},${g[2]})"></span></label>`).join('')}<button type="button" class="cm-up" id="bnUp">${ic('image',15)}Enviar imagem</button></div></div>
   <label class="fld"><span class="fl">Começa em</span><input type="date" name="f" value="${v.f}"></label>
   <label class="fld"><span class="fl">Termina em</span><input type="date" name="to" value="${v.to}"><span class="err"></span></label>
   <div class="fld wide"><span class="fl">Ao tocar, abrir</span><div class="cm-dpick">${[['evento','Evento','calendar'],['noticia','Notícia','news'],['doacoes','Doações','wallet'],['link','Link','link']].map(d=>`<label><input type="radio" name="dt" value="${d[0]}" ${v.dest[0]===d[0]?'checked':''}><span>${ic(d[2],14)}${d[1]}</span></label>`).join('')}</div><div id="bnDx"></div></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="bnOk">${b?'Salvar':'Adicionar banner'}</button></div></form>`,'lg');
 const f=$('#bnF'),ok=$('#bnOk');let dv=v.dest[1]||'';
 const dx=()=>{const t=f.dt.value;$('#bnDx').innerHTML=t==='evento'?`<span class="selw" style="margin-top:8px"><select id="bnSel">${EVTS.filter(e=>!past(e)&&e.st!=='previsao').map(e=>`<option value="${e.id}" ${dv===e.id?'selected':''}>${esc(e.t)} · ${fmtD(e.d)}</option>`).join('')}</select>${ic('updown',14)}</span>`:t==='noticia'?`<span class="selw" style="margin-top:8px"><select id="bnSel">${NEWS.filter(n=>ntSt(n)==='ativa').map(n=>`<option value="${n.id}" ${dv===n.id?'selected':''}>${esc(n.t)}</option>`).join('')}</select>${ic('updown',14)}</span>`:t==='link'?`<span class="cm-pre" style="margin-top:8px">${ic('link',14)}<input id="bnSel" value="${esc(dv.startsWith('http')?dv:'')}" placeholder="https://…"></span>`:'<p class="hint" style="margin:8px 0 0">Abre a tela de doações do app.</p>';const s=$('#bnSel');if(s){dv=s.value;s.addEventListener('input',()=>{dv=s.value;});s.addEventListener('change',()=>{dv=s.value;});}};
 const pv=()=>{$('#bnPv').innerHTML=`<div style="background:${gBg(f.g.value)}"><b>${esc(f.t.value.trim()||'Título do banner')}</b><span>${esc(f.sub.value.trim())}</span></div>`;const badD=f.to.value&&f.f.value&&f.to.value<f.f.value;f.to.closest('.fld').classList.toggle('bad',badD);f.to.nextElementSibling.textContent=badD?'Termina antes de começar':'';ok.disabled=!f.t.value.trim()||!f.f.value||!f.to.value||badD;};
 f.addEventListener('input',pv);$$('[name=dt]',f).forEach(r=>r.addEventListener('change',()=>{dv='';dx();}));dx();pv();setTimeout(()=>f.t.focus(),80);
 $('#bnUp').onclick=()=>toast('Upload de imagem: em breve no protótipo');
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={t:f.t.value.trim(),sub:f.sub.value.trim(),g:f.g.value,f:f.f.value,to:f.to.value,dest:[f.dt.value,dv]};if(b)Object.assign(b,o);else BANNERS.unshift({...BN(o.t,o.g,o.f,o.to,o.dest),sub:o.sub});closeDlg();cmRe();toast(b?'Banner atualizado':'Banner adicionado');},600);});
}

/* ---------- Transmissões ---------- */
let _chid=0;const CH=(n,pl,url,sch,act=true)=>({id:'ch'+(++_chid),n,pl,url,sch,act});
const CHANS=[CH('Canal Principal','youtube','youtube.com/@AlvaIgreja',[[0,'09:00'],[0,'19:00']]),CH('Canal de Jovens','youtube','youtube.com/@AlvaJovens',[[3,'20:00']]),CH('Instagram da igreja','instagram','instagram.com/alvasede',[],false)];
const PLAT={youtube:['YouTube','#e62117'],instagram:['Instagram','#c13584'],facebook:['Facebook','#1877f2']};
const WDN=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const chById=id=>CHANS.find(c=>c.id===id);
function nextLive(){let best=null;CHANS.filter(c=>c.act).forEach(c=>c.sch.forEach(([d,t])=>{for(let i=0;i<8;i++){const iso=addD(NOWD,i);if(dow(iso)===d&&(i>0||mm(t)>NOWM)){const k=iso+' '+t;if(!best||k<best.k)best={k,c,iso,t};break;}}}));return best;}
/* "ao vivo" não é mais iniciado/encerrado manualmente: o status é calculado a partir da grade de horários (dentro da janela programada de cada canal) */
function currentLive(){const d=dow(NOWD);for(const c of CHANS.filter(c=>c.act))for(const [sd,t] of c.sch)if(sd===d){const start=mm(t);if(NOWM>=start&&NOWM<start+120)return {c,t};}return null;}
function txPage(){
 const L=currentLive(),nx=nextLive();
 return `<header class="ph rise"><div><p class="eb">Comunicação</p><h1>Transmissões</h1><p class="lede">Canais e lives que os membros assistem pelo app</p></div><div class="pact"><button class="btn pri" data-a="chNew">${ic('plus',15,2.2)}Novo canal</button></div></header>
 <section class="card cm-live ${L?'on':''} rise" style="--d:1">${L?`<span class="cm-lv">${ic('video',26)}<i></i></span><div class="cm-lt2"><span class="cm-badge">● Ao vivo</span><b>${esc(L.c.n)}</b><span>começou às ${hm(L.t)}</span></div>`
  :`<span class="cm-lv idle">${ic('video',26)}</span><div class="cm-lt2"><b>Nenhuma live agora</b><span>${nx?`Próxima: <b>${WDN[dow(nx.iso)].toLowerCase()}, ${hm(nx.t)}</b> no ${esc(nx.c.n)} · ${relD(nx.iso)}`:'Nenhuma live programada'}</span></div>`}</section>
 <div class="cm-tx rise" style="--d:2"><div class="cm-chs2">${CHANS.map(c=>`<article class="card cm-ch ${c.act?'':'off'}"><header><span class="cm-plat" style="--p:${PLAT[c.pl][1]}">${ic(c.pl==='youtube'?'play':c.pl==='instagram'?'camera':'video',18)}</span><div class="dkt"><b>${esc(c.n)}</b><span>${PLAT[c.pl][0]}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="chMenu" data-v="${c.id}" aria-label="Ações">${ic('dots',16)}</button><div class="pop" id="chPop-${c.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="chEdit" data-v="${c.id}">${ic('pen',16)}Editar</button><hr><button class="pi danger" data-a="chDel" data-v="${c.id}">${ic('x',16)}Excluir</button></div></div></header>
   <button class="cm-url" data-a="chCopy" data-v="${c.id}" title="Copiar link"><span>${esc(c.url)}</span>${ic('copy',14)}</button>
   <div class="cm-sch">${c.sch.length?c.sch.map(([d,t])=>`<span><b>${WDN[d].slice(0,3)}</b>${hm(t)}</span>`).join(''):'<span class="soft">Sem horário fixo</span>'}</div>
   <footer><label class="tog cm-bt"><input type="checkbox" data-ch2="${c.id}" ${c.act?'checked':''}><span class="sw"></span><span>${c.act?'Visível no app':'Oculto'}</span></label></footer></article>`).join('')}</div></div>`;
}
function chForm(id){const c=id?chById(id):null,v=c?{...c,sch:c.sch.map(x=>[...x])}:{n:'',pl:'youtube',url:'',sch:[[0,'09:00']]};
 openDlg(`${dlgHead(c?'Editar canal':'Novo canal','As lives desse canal aparecem na aba Ao vivo do app.')}<form id="chF" class="fgrid one" novalidate>
  <label class="fld"><span class="fl">Nome</span><input name="n" value="${esc(v.n)}" placeholder="Ex.: Canal Principal" autocomplete="off"></label>
  <div class="fld"><span class="fl">Plataforma</span><div class="cm-dpick">${Object.entries(PLAT).map(([k,p])=>`<label><input type="radio" name="pl" value="${k}" ${v.pl===k?'checked':''}><span><i style="width:8px;height:8px;border-radius:50%;background:${p[1]}"></i>${p[0]}</span></label>`).join('')}</div></div>
  <label class="fld"><span class="fl">Link do canal</span><span class="cm-pre">${ic('link',14)}<input name="url" value="${esc(v.url)}" placeholder="youtube.com/@suaigreja" autocomplete="off"></span><span class="err"></span></label>
  <div class="fld"><span class="fl">Horários das lives <small>opcional</small></span><div id="chS"></div><button type="button" class="btn ghost sm" id="chAdd" style="align-self:flex-start">${ic('plus',13,2.2)}Adicionar horário</button></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="chOk">${c?'Salvar':'Adicionar canal'}</button></div></form>`,'sm');
 const f=$('#chF'),ok=$('#chOk');
 const rs=()=>{$('#chS').innerHTML=v.sch.map(([d,t],i)=>`<div class="cm-sr"><span class="selw"><select data-i="${i}" data-k="d">${WDN.map((w,j)=>`<option value="${j}" ${j===d?'selected':''}>${w}</option>`).join('')}</select>${ic('updown',14)}</span><input type="time" data-i="${i}" data-k="t" value="${t}" step="900"><button type="button" class="ibtn sm" data-rm="${i}" aria-label="Remover">${ic('x',13)}</button></div>`).join('');};
 const val=()=>{const u=f.url.value.trim(),bad=u&&!/\.(com|tv|be)\//.test(u);f.url.closest('.fld').classList.toggle('bad',!!bad);f.url.closest('.fld').querySelector('.err').textContent=bad?'Cole o link do canal, ex.: youtube.com/@suaigreja':'';ok.disabled=!f.n.value.trim()||!u||bad;};
 $('#chS').addEventListener('change',e=>{const el=e.target;if(el.dataset.i==null)return;v.sch[+el.dataset.i][el.dataset.k==='d'?0:1]=el.dataset.k==='d'?+el.value:el.value;});
 $('#chS').addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(b){v.sch.splice(+b.dataset.rm,1);rs();}});
 $('#chAdd').onclick=()=>{v.sch.push([0,'19:00']);rs();};
 f.addEventListener('input',val);rs();val();setTimeout(()=>f.n.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={n:f.n.value.trim(),pl:f.pl.value,url:f.url.value.trim().replace(/^https?:\/\//,''),sch:v.sch.sort((a,b)=>a[0]-b[0]||(a[1]<b[1]?-1:1))};if(c)Object.assign(c,o);else CHANS.push(CH(o.n,o.pl,o.url,o.sch));closeDlg();cmRe();toast(c?'Canal atualizado':'Canal adicionado');},600);});
}

/* drag-to-reorder (pointer events: mouse + touch) */
function sortable(box,itemSel,handleSel,onDone){if(!box)return;
 box.addEventListener('pointerdown',e=>{const h=e.target.closest(handleSel);if(!h||!box.contains(h))return;const it=h.closest(itemSel);if(!it)return;e.preventDefault();
  for(let a=box;a&&a!==document.body;a=a.parentElement)if(getComputedStyle(a).animationName!=='none'||getComputedStyle(a).transform!=='none')a.style.animation='none',a.style.transform='none';
  const r=it.getBoundingClientRect(),ox=e.clientX-r.left,oy=e.clientY-r.top,ph=document.createElement(it.tagName);ph.className='cm-ph';ph.style.height=r.height+'px';ph.style.width=r.width+'px';
  it.parentNode.insertBefore(ph,it);Object.assign(it.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',zIndex:60,pointerEvents:'none'});it.classList.add('cm-drag');document.body.classList.add('cm-dragging');
  const items=()=>[...box.querySelectorAll(itemSel)].filter(x=>x!==it);
  const flip=fn=>{const els=items(),pos=new Map(els.map(x=>[x,x.getBoundingClientRect()]));fn();els.forEach(x=>{const a=pos.get(x),b=x.getBoundingClientRect(),dx=a.left-b.left,dy=a.top-b.top;if(dx||dy)x.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});});};
  const mv=ev=>{it.style.left=(ev.clientX-ox)+'px';it.style.top=(ev.clientY-oy)+'px';
   const tgt=items().find(x=>{const b=x.getBoundingClientRect();return ev.clientX>=b.left&&ev.clientX<=b.right&&ev.clientY>=b.top&&ev.clientY<=b.bottom;});
   if(tgt){const b=tgt.getBoundingClientRect(),horiz=getComputedStyle(box).display.includes('grid')&&b.width<box.clientWidth*.8,after=horiz?ev.clientX>b.left+b.width/2:ev.clientY>b.top+b.height/2,ref=after?tgt.nextSibling:tgt;if(ref!==ph&&ref!==ph.nextSibling)flip(()=>box.insertBefore(ph,ref));}
   const m=40;if(ev.clientY<m)window.scrollBy(0,-12);else if(ev.clientY>innerHeight-m)window.scrollBy(0,12);};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);const pr=ph.getBoundingClientRect();
   it.animate([{left:it.style.left,top:it.style.top},{left:pr.left+'px',top:pr.top+'px'}],{duration:180,easing:'ease-out'}).onfinish=()=>{ph.replaceWith(it);it.removeAttribute('style');it.classList.remove('cm-drag');document.body.classList.remove('cm-dragging');onDone([...box.querySelectorAll(itemSel)].map(x=>x.dataset.id));};};
  addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up);});
}
function bnReorder(ids,activeOnly){const before=BANNERS.map(b=>b.id).join();let next;
 if(activeOnly){const act=ids.map(id=>BANNERS.find(b=>b.id===id));let k=0;next=BANNERS.map(b=>b.act?act[k++]:b);}else next=ids.map(id=>BANNERS.find(b=>b.id===id));
 if(next.map(b=>b.id).join()===before){return;}const old=BANNERS.slice();BANNERS.splice(0,BANNERS.length,...next);S.bnI=0;cmRe();toast('Ordem do carrossel atualizada',()=>{BANNERS.splice(0,BANNERS.length,...old);cmRe();});}

/* ---------- shared ---------- */
function cmAfter(){
 const q=$('#ntq');if(q)q.addEventListener('input',e=>{S.ntq=e.target.value;const p=e.target.selectionStart;cmRe();const n=$('#ntq');n.focus();n.setSelectionRange(p,p);});
 $$('.cm-cn').forEach(i=>i.addEventListener('change',()=>{const c=ncById(i.dataset.id),v=i.value.trim();if(!v||NCATS.some(x=>x!==c&&norm(x.n)===norm(v))){i.value=c.n;toast(v?'Já existe uma categoria com esse nome':'O nome não pode ficar vazio');return;}c.n=v;toast('Categoria renomeada');}));
 $$('[data-bn]').forEach(i=>i.addEventListener('change',()=>{const b=BANNERS.find(x=>x.id===i.dataset.bn);b.act=i.checked;cmRe();toast(`${b.t} ${b.act?'ativado':'pausado'}`);}));
 $$('[data-ch2]').forEach(i=>i.addEventListener('change',()=>{const c=chById(i.dataset.ch2);c.act=i.checked;cmRe();toast(`${c.n} ${c.act?'visível no app':'oculto do app'}`);}));
 if(S.active==='banners'){sortable($('#bnGrid'),'.cm-bc','.cm-bgrip',ids=>bnReorder(ids,false));sortable($('.cm-bord'),'li','.cm-grip',ids=>bnReorder(ids,true));}
 clearInterval(window._bnT);if(S.active==='banners'){const n=BANNERS.filter(bnLive).length;if(n>1)window._bnT=setInterval(()=>{if(S.active!=='banners'||!$('.cm-bscr')){clearInterval(window._bnT);return;}S.bnI=(S.bnI+1)%n;$$('.cm-bsl').forEach((s,i)=>s.classList.toggle('on',i===S.bnI));$$('.cm-dots i').forEach((s,i)=>s.classList.toggle('on',i===S.bnI));},5000);}
 if(S.active==='push')puAfter();
}
const cmRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const CMA={
 ntTab:v=>{S.ntab=v;cmRe();},ntF:v=>{S.ntf=v;cmRe();},
 ntNew:()=>ntForm(),ntEdit:(v,b,e)=>{if(e&&e.target.closest('.hact')&&!e.target.closest('.pi'))return;closePops();ntForm(v);},
 ntMenu:v=>{const p=$('#ntPop-'+v);closePops(p);p.classList.toggle('open');},
 ntDup:v=>{closePops();const n=NEWS.find(x=>x.id===v);NEWS.push({...n,id:'nw'+(++_nid),t:n.t+' (cópia)',pub:NOWD,exp:addD(NOWD,30)});S.ntf='ativas';cmRe();toast('Notícia duplicada');},
 ntRenew:v=>{closePops();const n=NEWS.find(x=>x.id===v),old=n.exp;n.exp=addD(NOWD,30);S.ntf='ativas';cmRe();toast('Notícia de volta no ar por 30 dias',()=>{n.exp=old;cmRe();});},
 ntDel:v=>{closePops();const n=NEWS.find(x=>x.id===v);confirmDel({title:'Excluir esta notícia?',body:`“${esc(n.t)}” sai do app e do histórico.`,onConfirm:()=>{const i=NEWS.indexOf(n);NEWS.splice(i,1);cmRe();toast('Notícia excluída',()=>{NEWS.splice(i,0,n);cmRe();});}});},
 ncNew:()=>ncForm(),
 ncDel:v=>{const c=ncById(v),ns=NEWS.filter(n=>n.c===v);confirmDel({title:`Excluir a categoria ${esc(c.n)}?`,body:ns.length?`${ns.length} notícia${ns.length===1?' fica':'s ficam'} sem categoria. Nenhuma notícia é apagada.`:'Nenhuma notícia usa essa categoria.',onConfirm:()=>{const i=NCATS.indexOf(c);NCATS.splice(i,1);ns.forEach(n=>n.c='');cmRe();toast('Categoria excluída',()=>{NCATS.splice(i,0,c);ns.forEach(n=>n.c=v);cmRe();});}});},
 puF:v=>{S.puf=v;cmRe();},
 puNew:()=>{S.pw={step:0,ch:['push'],title:'',msg:'',link:'',seg:'todos',mini:null,when:'now',d:'',t:'09:00'};render();window.scrollTo({top:0});},
 puBack:()=>{if(S.pw&&!S.pw.done&&(S.pw.title||S.pw.msg)){confirmDel({title:'Descartar este envio?',body:'O que você escreveu não será salvo.',label:'Descartar',onConfirm:()=>{S.pw=null;render();}});return;}S.pw=null;render();window.scrollTo({top:0});},
 puStep:v=>{S.pw.step=+v;puRe();},puPrev:()=>{S.pw.step--;puRe();},
 puNext:(v,b)=>{const w=S.pw;if(w.step<3){w.step++;puRe();window.scrollTo({top:0,behavior:'smooth'});return;}b.classList.add('busy');setTimeout(()=>{const dt=w.when==='now'?NOWD+' '+tt(NOWM):w.d+' '+w.t;PUSHES.push(PS(w.title,w.msg,w.seg==='mini'?'mini:'+w.mini:w.seg,'manual',w.when==='now'?'enviado':'agendado',dt,w.ch,w.when==='now'?null:null));w.done=true;S.puf=w.when==='now'?'env':'prox';render();window.scrollTo({top:0});},800);},
 puCancel:v=>{const p=PUSHES.find(x=>x.id===v);confirmDel({title:'Cancelar este envio?',body:`“${esc(p.t)}” não será enviado ${relD(p.dt.slice(0,10))}.`,label:'Cancelar envio',onConfirm:()=>{p.st='cancelado';cmRe();toast('Envio cancelado',()=>{p.st='agendado';cmRe();});}});},
 puAgain:v=>{const p=PUSHES.find(x=>x.id===v);S.pw={step:3,ch:[...p.ch],title:p.t,msg:p.msg,link:'',seg:p.seg.startsWith('mini:')?'mini':p.seg,mini:p.seg.startsWith('mini:')?p.seg.slice(5):null,when:'now',d:'',t:'09:00'};render();window.scrollTo({top:0});},
 bnNew:()=>bnForm(),bnEdit:v=>bnForm(v),
 bnDel:v=>{const b=BANNERS.find(x=>x.id===v);confirmDel({title:'Excluir este banner?',body:`“${esc(b.t)}” sai do app e do site.`,onConfirm:()=>{const i=BANNERS.indexOf(b);BANNERS.splice(i,1);cmRe();toast('Banner excluído',()=>{BANNERS.splice(i,0,b);cmRe();});}});},
 bnUp:v=>{const a=BANNERS.filter(b=>b.act),i=a.findIndex(b=>b.id===v),x=BANNERS.indexOf(a[i]),y=BANNERS.indexOf(a[i-1]);[BANNERS[x],BANNERS[y]]=[BANNERS[y],BANNERS[x]];S.bnI=0;cmRe();},
 bnDn:v=>{const a=BANNERS.filter(b=>b.act),i=a.findIndex(b=>b.id===v),x=BANNERS.indexOf(a[i]),y=BANNERS.indexOf(a[i+1]);[BANNERS[x],BANNERS[y]]=[BANNERS[y],BANNERS[x]];S.bnI=0;cmRe();},
 chNew:()=>chForm(),chEdit:v=>{closePops();chForm(v);},
 chMenu:v=>{const p=$('#chPop-'+v);closePops(p);p.classList.toggle('open');},
 chCopy:(v,b)=>{const c=chById(v);try{navigator.clipboard.writeText('https://'+c.url);}catch(e){}b.classList.add('ok');setTimeout(()=>b.classList.remove('ok'),1200);toast('Link copiado');},
 chDel:v=>{closePops();const c=chById(v);confirmDel({title:`Excluir ${esc(c.n)}?`,body:'O canal some da aba Ao vivo do app. As lives antigas continuam no YouTube.',typed:c.n,onConfirm:()=>{const i=CHANS.indexOf(c);CHANS.splice(i,1);cmRe();toast('Canal excluído',()=>{CHANS.splice(i,0,c);cmRe();});}});},
};

