/* ================= Casas e Redes de casa · ajustes de 16/10/2026 =================
   Pontuais (o protótipo não precisa ser 100% fiel): Regras da casa, cadastro com descrição, vários líderes e endereço em campos,
   recorrência com "só este / este e os próximos", motivo na recusa, um participante suspenso, Histórico e convocados adicionados pelo supervisor.
   Carrega depois de todo o resto e sobrescreve só o que muda. */
let _caN=0;
const caAddrStr=a=>{const l1=[[a.rua,a.num].filter(Boolean).join(', '),a.comp].filter(Boolean).join(' · '),l2=[a.bairro,[a.cid,a.uf].filter(Boolean).join('/')].filter(Boolean).join(', ');return [l1,l2].filter(Boolean).join(' — ');};
const caFull=c=>!!c.max&&c.ppl.length>=c.max;
const caTone=n=>(MEMBERS.find(m=>m.n===n)||{}).tone||'ceu';
const CA_DESC=['Encontro semanal de oração e estudo, com famílias da região norte. Todo mundo traz um prato para o lanche.','Casa de casais: estudo, partilha e um café no final. Aberta a casais de qualquer tempo de caminhada.','Casa de jovens e adolescentes: música, estudo e muita conversa. Recebe quem está chegando.','Estudo da Palavra e oração por pedidos da vizinhança. Aberta a novos participantes.','Casa pequena no centro, ideal para quem trabalha por perto. Encontros curtos e objetivos.'];
CASAS.forEach((c,i)=>{
 const m=(c.addr||'').match(/^(.+?),\s*([^—]+?)\s*—\s*(.+?),\s*(.+?)\/(\w\w)$/);
 c.a=m?{pais:'BR',rua:m[1],num:m[2],bairro:m[3],cid:m[4],uf:m[5],comp:'',cep:''}:{pais:'BR',rua:c.addr||'',num:'',bairro:'',cid:'',uf:'SP',comp:'',cep:''};
 c.desc=CA_DESC[i%CA_DESC.length];c.late=c.late||14;c.max=c.max||null;c.leaders=[c.leader];
});
/* Casa Sul tem dois líderes (o casal); Casa Norte está lotada; uma participante afastada fica suspensa */
{const c=CASAS[1],p=c.ppl.find(x=>x.n==='Rogério Melo');if(p){p.role='Líder';c.leaders=[c.leader,p.n];}}
CASAS[0].max=18;
/* endereço de membro com país (a ficha já era em partes; faltava país e a divisão do catálogo) */
MEMBERS.forEach(m=>{if(m.addr&&!m.addr.pais)m.addr.pais='BR';});

/* ---------- lista ---------- */
hRows=function(){
 const q=norm(S.hq);const l=CASAS.filter(c=>(S.hmin==='todos'||(S.hmin==='geral'?!c.min:c.min===S.hmin))&&(!q||norm(c.n+' '+c.leaders.join(' ')+' '+c.addr).includes(q)));
 if(!l.length)return `<div class="mempty"><p>Nenhuma casa encontrada.</p><span>Tente outro termo ou ministério.</span></div>`;
 return `<div class="trow hs thead"><span>Casa</span><span>Líder</span><span>Participantes</span><span>Presença</span><span>Último encontro</span><span></span></div>
 ${l.map(c=>{const lm=lastMeet(c),ago_=lm?-inDays(lm.d):0,r=cRate(c);return `<div class="trow hs" tabindex="0" data-a="hOpen" data-v="${c.id}">
  <span class="tn">${hTile(c)}<span class="hn"><b>${esc(c.n)}</b>${c.min?`<span>Ministério de ${c.min}</span>`:`<span>${esc(c.addr.split('— ')[1]||'')}</span>`}</span></span>
  <span class="hl">${pv({n:c.leader,tone:c.tone})}${esc(c.leader)}${c.leaders.length>1?` <small class="soft">+${c.leaders.length-1}</small>`:''}</span>
  <span class="hp"><b>${c.ppl.length}</b>${caFull(c)?'<em class="tag warn">Lotada</em>':''}${c.req.length?`<em class="tag warn">+${c.req.length} pedido${c.req.length>1?'s':''}</em>`:''}</span>
  <span class="hr">${spark6(c)}<b>${r}%</b></span>
  <span class="hlast">${lm?`<span>${dmy(lm.d)}</span><span class="${ago_>(c.late||14)?'late':''}">há ${ago_} dias</span>`:'<span class="soft">Nenhum ainda</span>'}</span>
  <span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
 <div class="tfoot"><span>${l.length} ${l.length>1?'casas encontradas':'casa encontrada'}</span></div>`;
};
{const _l=casasList;casasList=function(){return _l().replace('p.p. vs. mês anterior','p.p. vs. 4 anteriores');};}

/* ---------- endereço em campos separados (FND-M-18) ---------- */
const caAddrFields=(a,pre)=>{const co=NX_COUNTRIES[a.pais||'BR']?a.pais||'BR':'BR',I=(n,l,v,o={})=>`<label class="fld ${o.wide?'wide':''}"><span class="fl">${l}${o.opt?' <small>opcional</small>':''}</span><input name="${pre}-${n}" value="${esc(v||'')}" ${o.ph?`placeholder="${o.ph}"`:''} autocomplete="off"><span class="err"></span></label>`;
 return `<label class="fld"><span class="fl">País</span><span class="selw"><select name="${pre}-pais">${Object.entries(NX_COUNTRIES).map(([k,x])=>`<option value="${k}" ${k===co?'selected':''}>${x.n}</option>`).join('')}</select>${ic('updown',14)}</span></label>`
  +`<label class="fld"><span class="fl ca-div">${NX_COUNTRIES[co].div}</span><span class="selw"><select name="${pre}-uf">${nxSubOpts(co,a.uf)}</select>${ic('updown',14)}</span><span class="err"></span></label>`
  +I('cid','Cidade',a.cid)+I('bairro','Bairro ou distrito',a.bairro,{opt:1})+I('rua','Rua',a.rua,{wide:1})+I('num','Número',a.num,{opt:1})+I('comp','Complemento',a.comp,{opt:1})+I('cep','Código postal',a.cep,{opt:1,ph:co==='BR'?'00000-000':''});};
const caReadAddr=(f,pre)=>({pais:f.elements[pre+'-pais'].value,uf:f.elements[pre+'-uf'].value,cid:f.elements[pre+'-cid'].value.trim(),bairro:f.elements[pre+'-bairro'].value.trim(),rua:f.elements[pre+'-rua'].value.trim(),num:f.elements[pre+'-num'].value.trim(),comp:f.elements[pre+'-comp'].value.trim(),cep:f.elements[pre+'-cep'].value.trim()});
const caAddrCheck=(f,pre,bad)=>{const a=caReadAddr(f,pre);if(!a.uf){bad(pre+'-uf','Escolha '+(a.pais==='CL'?'a região':a.pais==='AR'?'a província':'o estado'));return null;}if(!a.cid){bad(pre+'-cid','Informe a cidade');return null;}if(!a.rua){bad(pre+'-rua','Informe a rua');return null;}return a;};
const caBad=f=>(n,m)=>{const i=f.elements[n],fl=i.closest('.fld');fl.classList.add('bad');const e=fl.querySelector('.err');if(e)e.textContent=m;i.focus();};
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.name)return;
 if(t.name.endsWith('-pais')||t.name==='addr.pais'){const co=t.value,uf=t.form.elements[t.name.replace('pais','uf')];if(uf&&NX_COUNTRIES[co]){uf.innerHTML=nxSubOpts(co,'');const lb=uf.closest('.fld')&&uf.closest('.fld').querySelector('.ca-div');if(lb)lb.textContent=NX_COUNTRIES[co].div;}}});
document.addEventListener('input',e=>{const t=e.target;if(t&&t.matches&&t.matches('[data-caq]')){const q=norm(t.value);$$('[data-capool="'+t.dataset.caq+'"] label').forEach(l=>{l.hidden=!!q&&!norm(l.textContent).includes(q);});}});
const caSync=c=>{c.addr=caAddrStr(c.a);};

/* ---------- ficha: Visão geral (Liderança com vários líderes, Local e contato em campos, Ministério, Descrição) ---------- */
const caSec=(k,title,view,form)=>{const ed=S.hedit===k;return `<section class="card pc sec ${ed?'editing':''}" id="hsec-${k}"><div class="sh"><h2>${title}</h2>${ed?'':`<button class="btn sec sm" data-a="hEdit" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>${ed?`<form class="fgrid" data-hsec2="${k}" novalidate style="grid-template-columns:1fr 1fr">${form}<div class="dfoot"><button type="button" class="btn sec" data-a="hCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`:view}</section>`;};
const caChip=(c,n)=>`<span class="cresp">${pv(c.ppl.find(p=>p.n===n)||{n,tone:caTone(n)})}${esc(n)}</span>`;
const caPool=(c)=>[...new Set([...c.leaders,...MEMBERS.filter(m=>m.tit&&m.st==='integrado').map(m=>m.n)])];
hGeral=function(c){
 const ms=c.meets.filter(m=>m.done).slice(0,8).reverse(),a=c.a;
 const lid=caSec('lid','Liderança',`<dl class="kv grid2"><div><dt>${c.leaders.length>1?'Líderes':'Líder'}</dt><dd class="ca-lds">${c.leaders.map(n=>caChip(c,n)).join('')}</dd></div><div><dt>Anfitrião</dt><dd>${caChip(c,c.host)}</dd></div></dl>`,
  `<div class="fld wide"><span class="fl">Líderes</span><label class="sbox">${ic('search',15)}<input data-caq="lid" placeholder="Buscar membro" autocomplete="off"></label><div class="cpick" data-capool="lid">${caPool(c).map(n=>`<label><input type="checkbox" name="leaders" value="${esc(n)}" ${c.leaders.includes(n)?'checked':''}>${pv({n,tone:caTone(n)})}<span><b>${esc(n)}</b><small>${c.ppl.some(p=>p.n===n)?'Já participa da casa':'Passa a participar da casa'}</small></span><i class="cb">${ic('check',12,2.8)}</i></label>`).join('')}</div><span class="hint">A casa pode ter mais de um líder. O anfitrião pode ser um deles.</span><span class="err"></span></div>`
  +`<label class="fld wide"><span class="fl">Anfitrião</span><span class="selw"><select name="host">${caPool(c).map(n=>`<option ${n===c.host?'selected':''}>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>`);
 const loc=caSec('loc','Local e contato',`<dl class="kv grid2"><div><dt>Endereço</dt><dd>${esc(caAddrStr(a))}<br><span class="soft">${esc(NX_COUNTRIES[a.pais||'BR'].n)}${a.cep?' · '+esc(a.cep):''}</span><br><a class="lnk" style="padding:4px 0 0" href="https://www.google.com/maps/search/${encodeURIComponent(c.addr)}" target="_blank" rel="noopener">${ic('pin',13)}Ver no mapa</a></dd></div><div><dt>Telefone</dt><dd>${c.phone?esc(c.phone):'<span class="soft">Não informado</span>'}</dd></div></dl>`,
  caAddrFields(a,'ad')+`<label class="fld"><span class="fl">Telefone <small>opcional</small></span><input name="phone" type="tel" value="${esc(c.phone||'')}" inputmode="tel" autocomplete="off"></label>`);
 const min=caSec('min','Ministério responsável',`<dl class="kv grid2"><div><dt>Ministério</dt><dd>${c.min?esc('Ministério de '+c.min):'<span class="soft">Nenhum — casa geral da igreja</span>'}</dd></div></dl>`,
  `<label class="fld wide"><span class="fl">Ministério</span><span class="selw"><select name="min"><option value="">Nenhum — casa geral da igreja</option>${HMIN.map(m=>`<option ${m===c.min?'selected':''}>${m}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Diz para qual público a casa é voltada e ajuda a filtrar a lista.</span></label>`);
 const des=caSec('desc','Descrição',`<p class="ca-desc">${c.desc?esc(c.desc):'<span class="soft">Sem descrição</span>'}</p>`,`<label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="3" maxlength="500" placeholder="Para quem é a casa, como são os encontros">${esc(c.desc||'')}</textarea></label>`);
 return `<div class="pgrid"><div class="col">${des}${lid}${loc}${min}</div>
  <div class="col"><section class="card pc"><div class="sh"><h2>Presença</h2><span class="who">últimos ${ms.length} encontros</span></div>
   <div class="hbars">${ms.map(m=>{const r=mRate(c,m);return `<div class="hb" title="${fmtD(m.d)}: ${c.ppl.filter(p=>m.pres[p.id]).length} de ${c.ppl.length}"><span class="hbv">${r}%</span><span class="hbt"><i style="height:${r}%"></i></span><span class="hbl">${fmtD(m.d)}</span></div>`;}).join('')}</div>
   <p class="who" style="margin:14px 0 0">Média de <b>${cRate(c)}%</b> nos últimos 4 encontros${c.req.length?` · <button class="lnk inl" data-a="hTab" data-v="part">${c.req.length} ${c.req.length>1?'pedidos':'pedido'} para entrar</button>`:''}</p></section>
   <section class="card pc"><div class="sh"><h2>Quem mais faltou</h2><span class="who">últimos 4</span></div>${(()=>{const l4=c.meets.filter(m=>m.done).slice(0,4);const aus=c.ppl.map(p=>({p,n:l4.filter(m=>!m.pres[p.id]).length})).filter(x=>x.n>=2&&!x.p.susp).sort((a,b)=>b.n-a.n).slice(0,4);return aus.length?`<ol class="late">${aus.map(x=>`<li><div class="lt" style="cursor:default">${pv(x.p)}<span><b>${esc(x.p.n)}</b><span>${x.p.role}</span></span><em>${x.n} faltas</em></div></li>`).join('')}</ol>`:'<p class="who" style="margin:0">Ninguém com 2 ou mais faltas nos últimos 4.</p>';})()}</section></div></div>`;
};
{const _cs=casasAfter;casasAfter=function(){_cs();$$('form[data-hsec2]').forEach(f=>f.addEventListener('submit',caSave));};}
function caSave(e){e.preventDefault();const f=e.target,k=f.dataset.hsec2,c=hById(S.casa),bad=caBad(f),fd=new FormData(f);
 f.querySelectorAll('.fld.bad').forEach(x=>x.classList.remove('bad'));
 if(k==='lid'){const sel=fd.getAll('leaders'),host=fd.get('host');if(!sel.length){const fl=f.querySelector('.cpick').closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escolha ao menos um líder';return;}
  const add=(n,role)=>{let p=c.ppl.find(x=>x.n===n);if(!p){p={id:c.id+'p'+Date.now()+Math.random().toString(36).slice(2,5),n,tone:caTone(n),role,since:'set/2026'};c.ppl.push(p);}return p;};
  c.ppl.forEach(p=>{if(p.role==='Líder'&&!sel.includes(p.n))p.role='Participante';if(p.role==='Anfitrião'&&p.n!==host)p.role='Participante';});
  sel.forEach(n=>{add(n,'Líder').role='Líder';});if(!sel.includes(host))add(host,'Anfitrião').role='Anfitrião';c.leaders=sel;c.leader=sel[0];c.host=host;}
 if(k==='loc'){const a=caAddrCheck(f,'ad',bad);if(!a)return;c.a=a;caSync(c);c.phone=fd.get('phone')||'';}
 if(k==='min')c.min=fd.get('min')||'';
 if(k==='desc')c.desc=(fd.get('desc')||'').trim();
 S.hedit=null;render();toast({lid:'Liderança atualizada',loc:'Local e contato atualizados',min:'Ministério atualizado',desc:'Descrição atualizada'}[k]);}

/* ---------- cabeçalho: líderes, vagas, menu Regras e aba Histórico ---------- */
{const _cd=casaDetail;casaDetail=function(){let h=_cd();const c=hById(S.casa);if(!c)return h;
 h=h.replace('Líder: '+esc(c.leader)+' · ',(c.leaders.length>1?'Líderes: ':'Líder: ')+c.leaders.map(esc).join(' e ')+' · ');
 h=h.replace(c.ppl.length+' participantes',c.ppl.length+' participantes'+(c.max?' · '+c.max+' vagas'+(caFull(c)?' (lotada)':''):''));
 h=h.replace('<button class="pi danger" data-a="hDel">','<button class="pi" data-a="hRules">'+ic('sliders',17)+'Regras da casa</button><hr><button class="pi danger" data-a="hDel">');
 h=h.replace('<span class="tind"></span>','<button role="tab" class="'+(S.ctab==='hist'?'on':'')+'" data-a="hTab" data-v="hist">Histórico</button><span class="tind"></span>');
 return h;};}
{const _tb=hTabBody;hTabBody=function(c){if(S.ctab==='hist'&&!S.chamada)return caHist(c);return _tb(c);};}
function caHist(c){
 const ev=[];c.meets.filter(m=>m.done).slice(0,4).forEach(m=>{const n=c.ppl.filter(p=>m.pres[p.id]).length;ev.push([m.d,'Encontro realizado e chamada registrada',n+' de '+c.ppl.length+' presentes','por '+c.leader]);});
 c.meets.filter(m=>m.series&&!m.done).slice(0,1).forEach(m=>ev.push(['2026-09-28','Série de encontros criada','Toda semana, até '+fmtD(c.meets.filter(x=>x.series===m.series).map(x=>x.d).sort().pop()),'por '+c.leader]));
 c.ppl.filter(p=>p.role==='Participante').slice(0,3).forEach((p,i)=>ev.push([['2026-08-21','2026-06-12','2026-03-30'][i],'Entrou na casa',p.n,'pedido aceito por '+c.leader]));
 ev.push(['2025-01-12','Casa criada',c.n,'por Secretaria']);
 ev.sort((a,b)=>a[0]<b[0]?1:-1);
 const MO=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],kind=t=>/Entrou/.test(t)?['userplus','brand','Participante']:/Casa criada/.test(t)?['home','mute','Casa']:/Série/.test(t)?['calendar','seq','Encontro']:['calendar','int','Encontro'];
 return `<section class="card pc mh"><div class="sh"><h2>Histórico</h2><span class="who">${ev.length} registros · mais recentes primeiro</span></div>
  <ol class="mh-l">${ev.map((x,i)=>{const k=kind(x[1]),iso=x[0];return `<li class="mh-i ${i===0?'first':''}"><span class="mh-d"><b>${+iso.slice(8)}</b><small>${MO[+iso.slice(5,7)-1]} ${iso.slice(0,4)}</small></span><span class="mh-ic k-${k[1]}">${ic(k[0],15,2)}</span><div class="mh-b"><div class="mh-h"><b>${esc(x[1])}</b><span class="mh-k">${k[2]}</span></div><span class="mh-m">${esc(x[2])} · ${avN(x[3].replace(/^por /,''))}<span>${esc(x[3])}</span></span></div></li>`;}).join('')}</ol></section>`;}

/* O Afastado sai da casa e não fica "suspenso": não há esse estado */

/* ---------- Nova casa: descrição, vários líderes, endereço em campos ---------- */
A.hAdd=()=>{const pool=MEMBERS.filter(m=>m.tit&&m.st==='integrado').map(m=>m.n);
 openDlg(`${dlgHead('Nova casa','Os participantes podem ser adicionados depois.')}
  <form class="fgrid" id="haF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome da casa</span><input name="n" placeholder="Ex.: Casa Norte — Santana" autocomplete="off"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="2" maxlength="500" placeholder="Para quem é a casa, como são os encontros"></textarea></label>
   <div class="fld wide"><span class="fl">Líderes</span><label class="sbox">${ic('search',15)}<input data-caq="nl" placeholder="Buscar membro" autocomplete="off"></label><div class="cpick" data-capool="nl">${pool.map((n,i)=>`<label><input type="checkbox" name="leaders" value="${esc(n)}" ${i===0?'checked':''}>${pv({n,tone:caTone(n)})}<span><b>${esc(n)}</b><small>Membro integrado</small></span><i class="cb">${ic('check',12,2.8)}</i></label>`).join('')}</div><span class="hint">Escolha um ou mais líderes. O anfitrião pode ser um deles.</span><span class="err"></span></div>
   <label class="fld wide"><span class="fl">Anfitrião</span><span class="selw"><select name="host">${pool.map((n,i)=>`<option ${i===0?'selected':''}>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   ${caAddrFields({pais:'BR',uf:'SP'},'ad')}
   <label class="fld"><span class="fl">Telefone <small>opcional</small></span><input name="phone" type="tel" inputmode="tel" placeholder="(11) 90000-0000" autocomplete="off"></label>
   <label class="fld"><span class="fl">Ministério <small>opcional</small></span><span class="selw"><select name="min"><option value="">Nenhum — casa geral</option>${HMIN.map(m=>`<option>${m}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <p class="hint wide" style="margin:-6px 0 0">O mapa localiza a casa a partir do endereço. O endereço completo só aparece para quem for aceito na casa.</p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar casa</button></div></form>`,'lg');
 const f=$('#haF'),bad=caBad(f),ph=f.elements.phone;ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
 f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim(),sel=fd.getAll('leaders');
  if(!n)return bad('n','Dê um nome à casa');if(CASAS.some(c=>norm(c.n)===norm(n)))return bad('n','Já existe uma casa com esse nome');
  if(!sel.length){const fl=f.querySelector('.cpick').closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escolha ao menos um líder';return;}
  const a=caAddrCheck(f,'ad',bad);if(!a)return;
  const b=f.querySelector('[type=submit]');b.classList.add('busy');
  setTimeout(()=>{const host=fd.get('host'),c=mkCasa(n,sel[0],host,2,0,TODAY.toISOString().slice(0,10),{addr:caAddrStr(a),phone:fd.get('phone'),min:fd.get('min')});c.meets=[];c.total=0;
   c.a=a;c.desc=(fd.get('desc')||'').trim();c.late=14;c.max=null;c.leaders=sel;
   c.ppl=c.ppl.filter((p,i)=>!(i===1&&host===sel[0]));c.ppl[0].role='Líder';if(host!==sel[0]&&!sel.includes(host)){const h=c.ppl.find(p=>p.n===host);if(h)h.role='Anfitrião';}
   sel.slice(1).forEach(x=>{const p=c.ppl.find(q=>q.n===x);if(p)p.role='Líder';else c.ppl.push({id:c.id+'p'+Date.now()+x.length,n:x,tone:caTone(x),role:'Líder',since:'set/2026'});});
   if(host!==sel[0]&&sel.includes(host)){c.ppl=c.ppl.filter(p=>!(p.role==='Anfitrião'&&p.n===host));}
   c.host=host;CASAS.push(c);closeDlg();S.casa=c.id;S.ctab='geral';render();toast(`${n} criada`);},800);});};

/* ---------- Regras da casa: vagas e atraso ---------- */
A.hRules=()=>{closePops();const c=hById(S.casa);
 openDlg(`${dlgHead('Regras da casa',esc(c.n))}<form class="fgrid one" id="caRF" novalidate>
  <label class="fld"><span class="fl">Vagas <small>opcional</small></span><input name="max" type="number" min="1" inputmode="numeric" value="${c.max||''}" placeholder="Sem limite"><span class="hint">Hoje a casa tem ${c.ppl.length} participantes. A casa lotada continua recebendo pedidos: o líder decide.</span><span class="err"></span></label>
  <label class="fld"><span class="fl">Atraso: dias sem encontro</span><input name="late" type="number" min="1" max="365" inputmode="numeric" value="${c.late||14}"><span class="hint">Depois desse prazo sem encontro, a casa aparece como atrasada na lista e no relatório. Padrão: 14 dias.</span><span class="err"></span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`,'sm');
 const f=$('#caRF'),bad=caBad(f);f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.onsubmit=e=>{e.preventDefault();const mx=f.elements.max.value.trim(),lt=+f.elements.late.value;
  if(mx&&(!/^\d+$/.test(mx)||+mx<1))return bad('max','Use um número a partir de 1, ou deixe em branco');
  if(!lt||lt<1||lt>365)return bad('late','Use de 1 a 365 dias');
  c.max=mx?+mx:null;c.late=lt;closeDlg();render();toast('Regras da casa atualizadas'+(caFull(c)?' · a casa ficou lotada':''));};};

/* ---------- pedidos: aceitar mesmo lotada; recusar com motivo opcional ---------- */
A.hAccept=v=>{const c=hById(S.casa),r=c.req.splice(+v,1)[0];c.ppl.push({id:c.id+'p'+Date.now(),n:r.n,tone:r.tone,role:'Participante',since:'set/2026'});render();toast(`${r.n.split(' ')[0]} agora participa da ${c.n.split(' — ')[0]}${caFull(c)?'. A casa ficou lotada.':''}`);};
A.hReject=v=>{const c=hById(S.casa),r=c.req[+v];
 openDlg(`${dlgHead('Recusar o pedido de '+esc(r.n.split(' ')[0])+'?','A pessoa é avisada pelo app e pode pedir outra casa.')}<form class="fgrid one" id="caNF" novalidate><label class="fld"><span class="fl">Motivo <small>opcional</small></span><input name="w" maxlength="200" placeholder="Ex.: a casa não está recebendo novos participantes agora" autocomplete="off"></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Recusar pedido</button></div></form>`,'sm');
 $('#caNF').onsubmit=e=>{e.preventDefault();c.req.splice(+v,1);closeDlg();render();toast('Pedido recusado');};};

/* ---------- encontros: repetir, "só este / este e os próximos" ---------- */
const caGen=(first,freq,until)=>{const out=[first],base=new Date(first+'T12:00');for(let n=1;n<=200;n++){let d;if(freq==='M'){const m=base.getMonth()+n,last=new Date(base.getFullYear(),m+1,0).getDate();d=new Date(base.getFullYear(),m,Math.min(base.getDate(),last),12);}else{d=new Date(base);d.setDate(d.getDate()+n*(freq==='W'?7:14));}
  const iso=d.toISOString().slice(0,10);if(iso>until)break;out.push(iso);}return out;};
const caMeet=(c,q,sid)=>{const m={id:'hm'+(++_caN)+Date.now().toString(36),scheduled:true,done:false,cancelled:false,pres:{},why:{},desc:q.desc||'',mat:'',d:q.d,start:q.start,end:'',mode:q.mode,where:q.where||'',url:q.url||'',series:sid||null,rsvp:{}};c.ppl.forEach(p=>{m.rsvp[p.id]={r:'',why:''};});return m;};
const caFollow=(c,m)=>c.meets.filter(x=>x.series&&x.series===m.series&&!x.done&&!x.cancelled&&x.d>m.d);
/* uma série de exemplo: Casa Norte, toda quarta */
{const c=CASAS[0],sid='sr-norte';caGen('2026-10-07','W','2026-12-02').forEach((d,i)=>{const m=caMeet(c,{d,start:'19:30',mode:'Presencial',where:'Casa do líder',desc:'Estudo e partilha'},sid);if(i===0)delete m.rsvp;c.meets.push(m);c.total++;});}
A.nxHouseSchedule=id=>{const c=hById(S.casa),old=id&&c.meets.find(m=>m.id===id),t=TODAY.toISOString().slice(0,10),
  v=old?{d:old.d,start:old.start,mode:old.mode,where:old.where||'',url:old.url||''}:{d:addDays(7),start:'19:30',mode:'Presencial',where:'',url:''},ser=old&&old.series,n=ser?caFollow(c,old).length:0;
 openDlg(dlgHead(old?'Editar encontro':'Agendar encontro',esc(c.n)+'. O que foi tratado você registra na chamada.')+'<form class="fgrid" id="caSF" novalidate style="grid-template-columns:1fr 1fr">'
  +'<label class="fld"><span class="fl">Data</span><input type="date" name="d" min="'+(v.d<t?v.d:t)+'" value="'+v.d+'"><span class="err"></span></label>'
  +'<label class="fld"><span class="fl">Horário</span><input type="time" name="t" value="'+v.start+'"><span class="err"></span></label>'
  +'<div class="fld wide"><span class="fl">Modalidade</span><div class="yn" role="radiogroup"><label><input type="radio" name="mode" value="Presencial"'+(v.mode!=='Remoto'?' checked':'')+'><span>'+ic('pin',15)+'&nbsp;Presencial</span></label><label><input type="radio" name="mode" value="Remoto"'+(v.mode==='Remoto'?' checked':'')+'><span>'+ic('monitor',15)+'&nbsp;Remoto</span></label></div></div>'
  +'<label class="fld wide" data-w="p"><span class="fl">Local <small>opcional</small></span><input name="where" value="'+esc(v.where)+'" placeholder="Ex.: Casa do líder, sala de estar"></label>'
  +'<label class="fld wide" data-w="r" hidden><span class="fl">Link da reunião</span><input name="link" type="url" value="'+esc(v.url)+'" placeholder="Meet, Teams, Zoom…"><span class="err"></span></label>'
  +(old?(ser?'<div class="fld wide"><span class="fl">Alterar</span><div class="yn" role="radiogroup"><label><input type="radio" name="sc" value="one" checked><span>Só este encontro</span></label><label><input type="radio" name="sc" value="next"><span>Este e os próximos ('+n+')</span></label></div><span class="hint">A data só muda neste encontro. Horário, modalidade, local e link valem também para os próximos, se você escolher.</span></div>':'')
   :'<div class="fld wide"><span class="fl">Repetir</span><div class="yn" role="radiogroup"><label><input type="radio" name="rep" value="" checked><span>Não repete</span></label><label><input type="radio" name="rep" value="W"><span>Toda semana</span></label><label><input type="radio" name="rep" value="Q"><span>A cada 15 dias</span></label><label><input type="radio" name="rep" value="M"><span>Todo mês</span></label></div></div><label class="fld wide" data-w="u" hidden><span class="fl">Repetir até</span><input type="date" name="until" min="'+t+'"><span class="hint" id="caRepN">Escolha a data de fim: todos os encontros futuros são criados de uma vez, e você pode mover ou apagar cada um.</span><span class="err"></span></label>')
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">'+(old?'Salvar':'Agendar')+'</button></div></form>');
 const f=$('#caSF'),bad=caBad(f),sync=()=>{const r=f.elements.mode.value==='Remoto';f.querySelector('[data-w=r]').hidden=!r;f.querySelector('[data-w=p]').hidden=r;const u=f.querySelector('[data-w=u]');if(u)u.hidden=!f.elements.rep.value;
  if(u&&f.elements.rep.value&&f.elements.until.value&&f.elements.d.value){const l=caGen(f.elements.d.value,f.elements.rep.value,f.elements.until.value),sk=l.filter(x=>c.meets.some(m=>m.d===x&&!m.cancelled)).length;$('#caRepN').textContent='Serão criados '+(l.length-sk)+' encontros'+(sk?' · '+sk+' data'+(sk>1?'s':'')+' já tem encontro e será pulada':'')+'.';}};sync();
 f.addEventListener('change',sync);f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');if(e.target.name==='until'||e.target.name==='d')sync();});
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),d=fd.get('d'),tm=fd.get('t'),md=fd.get('mode'),lk=(fd.get('link')||'').trim(),wh=md==='Presencial'?(fd.get('where')||'').trim():'',url=md==='Remoto'?lk:'';
  if(!d)return bad('d','Escolha a data');if(!old&&d<t)return bad('d','A data já passou. Para um encontro que já aconteceu, use Registrar');if(!tm)return bad('t','Informe o horário');
  if(md==='Remoto'&&!/^https?:\/\/\S+/i.test(lk))return bad('link',lk?'Link inválido':'Informe o link da reunião');
  if(!old){const rep=fd.get('rep');
   if(!rep){if(c.meets.some(m=>m.d===d&&!m.cancelled))return bad('d','Já existe um encontro nessa data');c.meets.push(caMeet(c,{d,start:tm,mode:md,where:wh,url},null));c.total++;closeDlg();render();toast('Encontro agendado para '+wd(d)+', '+fmtD(d));return;}
   const until=fd.get('until');if(!until||until<d)return bad('until','Escolha a data de fim');
   const sid='sr'+Date.now();let made=0,sk=0;caGen(d,rep,until).forEach(x=>{if(c.meets.some(m=>m.d===x&&!m.cancelled)){sk++;return;}c.meets.push(caMeet(c,{d:x,start:tm,mode:md,where:wh,url},sid));c.total++;made++;});
   closeDlg();render();toast(made+' encontros agendados'+(sk?' · '+sk+' data'+(sk>1?'s':'')+' pulada'+(sk>1?'s':'')+' (já tinha encontro)':''));return;}
  if(d!==old.d&&c.meets.some(m=>m!==old&&m.d===d&&!m.cancelled))return bad('d','Já existe um encontro nessa data');
  const next=ser&&fd.get('sc')==='next',targets=next?[old,...caFollow(c,old)]:[old],changed=d!==old.d||tm!==old.start||md!==old.mode||wh!==(old.where||'')||url!==(old.url||'');
  targets.forEach(m=>{m.start=tm;m.mode=md;m.where=wh;m.url=url;if(m===old)m.d=d;if(changed){m.rsvp={};c.ppl.forEach(p=>{m.rsvp[p.id]={r:'',why:''};});}});
  closeDlg();render();toast((targets.length>1?targets.length+' encontros atualizados':'Encontro atualizado')+(changed?' · respostas zeradas e participantes avisados':''));});};
function caScope(c,m,o){const n=caFollow(c,m).length;
 openDlg(dlgHead(o.title,esc(c.n)+' · '+wd(m.d)+', '+fmtD(m.d))+'<form id="caScF" class="fgrid one" novalidate><div class="fld"><div class="yn" role="radiogroup"><label><input type="radio" name="sc" value="one" checked><span>Só este encontro</span></label><label><input type="radio" name="sc" value="next"><span>Este e os próximos ('+n+')</span></label></div></div><p class="hint" style="margin:0">'+o.body+'</p><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Voltar</button><button type="submit" class="btn pri'+(o.danger?' danger':'')+'">'+o.label+'</button></div></form>','sm');
 $('#caScF').onsubmit=e=>{e.preventDefault();const next=new FormData($('#caScF')).get('sc')==='next';closeDlg();o.run(next?[m,...caFollow(c,m)]:[m]);};}
{const _cancel=A.nxHouseCancel;A.nxHouseCancel=id=>{const c=hById(S.casa),m=c.meets.find(x=>x.id===id);if(!m||!m.series)return _cancel(id);
 caScope(c,m,{title:'Cancelar encontro?',body:'Os encontros cancelados ficam registrados como cancelados, saem da agenda e todos os convocados são avisados.',label:'Cancelar encontro',run:l=>{l.forEach(x=>{x.cancelled=true;});render();toast(l.length>1?l.length+' encontros cancelados · convocados avisados':'Encontro cancelado · convocados avisados');}});};
 const _del=A.hDelM;A.hDelM=v=>{const c=hById(S.casa),m=c.meets.find(x=>x.id===v);if(!m||!m.series||m.done)return _del(v);
  caScope(c,m,{title:'Excluir encontro?',body:'Os encontros excluídos somem da lista e dos indicadores. Os convocados são avisados.',label:'Excluir encontro',danger:1,run:l=>{l.forEach(x=>{c.meets.splice(c.meets.indexOf(x),1);c.total--;});render();toast(l.length>1?l.length+' encontros excluídos':'Encontro excluído');}});};}

/* ---------- Redes de casa: o supervisor adiciona os convocados (pastores e outras pessoas) ---------- */
{const _p=seConvPicker;seConvPicker=function(k,o,sel){let h=_p(k,o,sel);if(k==='net')return h;
 h=h.replace('Todos os líderes','Adicionar líderes das casas');
 const pastors=['Pr. Marcos Souza','Pr. Rafael Pereira'],extra='<div class="scv-g" id="seExtra"><div class="scv-gh"><b>'+ic('users',13,2)+'Pastores e outras pessoas</b></div>'
  +pastors.map(n=>'<label class="scv-p" data-q="'+esc(norm(n+' pastor'))+'"><input type="checkbox" name="cv" value="'+esc(n)+'" data-from="Igreja" data-role="Pastor" data-lead="0"'+(sel.includes(n)?' checked':'')+'>'+avN(n)+'<span><b>'+esc(n)+'</b><small>Pastor da igreja</small></span><i class="cb">'+ic('check',12,2.8)+'</i></label>').join('')+'</div>'
  +'<div class="scv-add"><input id="seAddQ" list="seAddL" placeholder="Adicionar outra pessoa: digite o nome de um membro" autocomplete="off"><datalist id="seAddL">'+MEMBERS.filter(m=>m.st==='integrado').map(m=>'<option value="'+esc(m.n)+'">').join('')+'</datalist><button type="button" class="btn sec sm" id="seAddB">'+ic('plus',14,2.2)+'Adicionar</button></div>';
 return h.replace('<span class="err"></span><span class="hint">',extra+'<span class="err"></span><span class="hint">');};}
{const _f=seForm;seForm=function(k,oid,mid){_f(k,oid,mid);const b=$('#seAddB');if(!b)return;
 b.onclick=()=>{const i=$('#seAddQ'),n=i.value.trim(),m=MEMBERS.find(x=>norm(x.n)===norm(n));if(!m){toast('Digite o nome de um membro da igreja');return;}
  const ex=$$('[name=cv]').find(x=>x.value===m.n);if(ex){ex.checked=true;ex.dispatchEvent(new Event('change',{bubbles:true}));i.value='';return;}
  const l=document.createElement('label');l.className='scv-p';l.dataset.q=norm(m.n);l.innerHTML='<input type="checkbox" name="cv" value="'+esc(m.n)+'" data-from="Adicionada" data-role="Convocado(a)" data-lead="0" checked>'+avN(m.n)+'<span><b>'+esc(m.n)+'</b><small>Adicionado pelo supervisor</small></span><i class="cb">'+ic('check',12,2.8)+'</i>';
  $('#seExtra').appendChild(l);i.value='';l.querySelector('input').dispatchEvent(new Event('change',{bubbles:true}));};};}

/* ---------- membro: endereço com país e divisão do catálogo ---------- */
SECS.end.f=[['addr.pais','País','country'],['addr.uf','Estado, província ou região','sub'],['addr.cid','Cidade','text'],['addr.bairro','Bairro ou distrito','text'],['addr.rua','Rua','text'],['addr.num','Número','text'],['addr.comp','Complemento','text'],['addr.cep','Código postal','text']];
{const _field=field;field=function(m,f){
 if(f[2]==='country'){const v=gv(m,f[0])||'BR';return `<label class="fld"><span class="fl">${f[1]}</span><span class="selw"><select name="${f[0]}">${Object.entries(NX_COUNTRIES).map(([k,x])=>`<option value="${k}" ${k===v?'selected':''}>${x.n}</option>`).join('')}</select>${ic('updown',14)}</span></label>`;}
 if(f[2]==='sub'){const co=gv(m,'addr.pais')||'BR';return `<label class="fld"><span class="fl ca-div">${NX_COUNTRIES[co].div}</span><span class="selw"><select name="${f[0]}">${nxSubOpts(co,gv(m,f[0]))}</select>${ic('updown',14)}</span></label>`;}
 return _field(m,f);};}
{const _sv=showVal;showVal=function(f,v){if(f[2]==='country')return NX_COUNTRIES[v||'BR'].n;if(f[2]==='sub'){const m=byId(S.member),co=(m&&m.addr&&m.addr.pais)||'BR',s=NX_COUNTRIES[co].subs.find(x=>x[0]===v);return v?(co==='BR'?v:(s?s[1]:v)):'';}return _sv(f,v);};}
