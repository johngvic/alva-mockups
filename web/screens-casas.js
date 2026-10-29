/* ================= Comunidade › Casas de Apascentamento ================= */
const HMIN=['Jovens e Adolescentes','Casais','Mulheres','Homens','Kids'];
const HPOOL=['Beatriz Nogueira','Caio Ramos','Daniel Freitas','Eduarda Lins','Fábio Moura','Gisele Prado','Hugo Lemos','Íris Campos','Jonas Paiva','Kelly Rocha','Lívia Santos','Mateus Leal','Nina Castro','Otto Barros','Priscila Reis','Raul Teles','Sara Brito','Tomás Vieira','Vera Lopes','Wagner Dias','Yara Mendes','Zeca Arruda'];
let _hid=0;
function mkCasa(n,leader,host,count,total,last,o={}){
 const id='h'+(++_hid),named=o.named||[];
 const ppl=[{n:leader,role:'Líder',since:o.since||'jan/2025'},{n:host,role:'Anfitrião',since:o.since||'jan/2025'},...named.map(x=>({n:x[0],role:'Participante',since:x[1]}))];
 let k=_hid*5;while(ppl.length<count){const nm=HPOOL[k++%HPOOL.length];if(!ppl.some(p=>p.n===nm))ppl.push({n:nm,role:'Participante',since:['fev/2025','abr/2025','jun/2025','set/2025','jan/2026','mar/2026'][k%6]});}
 ppl.forEach((p,i)=>{p.id=id+'p'+i;p.tone=TONES[(i+_hid)%6];});
 const meets=[];for(let w=0;w<8;w++){const d=new Date(last+'T12:00');d.setDate(d.getDate()-7*w);const iso=d.toISOString().slice(0,10);const pres={},why={};ppl.forEach((p,i)=>{const on=((i*7+w*3+_hid)%10)<(o.rate||7.6);pres[p.id]=on;if(!on&&(i+w)%3===0)why[p.id]=['Viagem a trabalho','Doente','Plantão','Compromisso familiar'][(i+w)%4];});meets.push({id:id+'e'+w,d:iso,desc:o.descs&&o.descs[w]||['Estudo em grupo e partilha.','Encontro de oração e partilha.','Estudo sobre os frutos do Espírito.','Comunhão com lanche coletivo.'][(w+_hid)%4],mat:w===0&&o.mat?o.mat:'',pres,why,done:true});}
 return {id,n,leader,host,addr:o.addr||'',phone:o.phone||'',min:o.min||'',tone:o.tone||TONES[_hid%6],ppl,meets,total,req:o.req||[]};
}
const CASAS=[
 mkCasa('Casa Norte — Lapa','André Rocha','Patrícia Lima',18,32,'2026-09-14',{tone:'ceu',addr:'Rua das Palmeiras, 45 — Lapa, São Paulo/SP',phone:'(11) 99234-5678',named:[['Cláudia Ferraz','mar/2025'],['Henrique Costa','jun/2025'],['Mônica Souza','ago/2025']],descs:['Estudo sobre os frutos do Espírito, cap. 3 do material de apoio.','Encontro de oração e partilha.'],req:[{n:'Rafael Teixeira',d:'2026-09-18',tone:'menta'}],rate:7.8}),
 mkCasa('Casa Sul — Ipiranga','Fernanda Alves Melo','Rogério Melo',24,28,'2026-09-13',{tone:'damasco',addr:'Rua Bom Pastor, 1200 — Ipiranga, São Paulo/SP',phone:'(11) 98811-2030',min:'Casais',rate:7.2}),
 mkCasa('Casa Leste — Tatuapé','Renan Ferreira','Júlia Ferreira',12,20,'2026-09-11',{tone:'lima',addr:'Rua Tuiuti, 310 — Tatuapé, São Paulo/SP',min:'Jovens e Adolescentes',req:[{n:'Luana Pires',d:'2026-09-25',tone:'rosado'},{n:'Igor Nunes',d:'2026-09-27',tone:'salvia'}],rate:6.6}),
 mkCasa('Casa Oeste — Pinheiros','Larissa Pinto Rocha','Marcelo Rocha',20,35,'2026-09-14',{tone:'rosado',addr:'Rua dos Pinheiros, 870 — Pinheiros, São Paulo/SP',phone:'(11) 97700-4411',rate:8.1}),
 mkCasa('Casa Centro — República','Thiago Mendes','Ana Mendes',9,15,'2026-09-10',{tone:'salvia',addr:'Av. Ipiranga, 200 — República, São Paulo/SP',rate:6.9}),
];
Object.assign(S,{casa:null,ctab:'geral',chamada:null,hq:'',hmin:'todos',hedit:null});
const hById=id=>CASAS.find(c=>c.id===id);
const mRate=(c,m)=>{const t=c.ppl.length;return t?Math.round(c.ppl.filter(p=>m.pres[p.id]).length/t*100):0;};
const cRate=c=>{const ms=c.meets.filter(m=>m.done).slice(0,4);return ms.length?Math.round(ms.reduce((a,m)=>a+mRate(c,m),0)/ms.length):0;};
const cPrev=c=>{const ms=c.meets.filter(m=>m.done).slice(4,8);return ms.length?Math.round(ms.reduce((a,m)=>a+mRate(c,m),0)/ms.length):0;};
const lastMeet=c=>c.meets.filter(m=>m.done)[0];
const hTile=(c,s=38)=>`<span class="htile" style="--s:${s}px;background:var(--tone-${c.tone});color:var(--tone-${c.tone}-ink)">${ic('home',Math.round(s*.47),1.9)}</span>`;
const pv=p=>`<span class="av" style="background:var(--tone-${p.tone});color:var(--tone-${p.tone}-ink)">${initials(p.n)}</span>`;
const dmy=iso=>{const [y,m,d]=iso.split('-');return `${d}/${m}/${y}`;};
function spark6(c){const ms=c.meets.filter(m=>m.done).slice(0,6).reverse();return `<span class="hspark" title="Presença nos últimos ${ms.length} encontros">${ms.map(m=>{const r=mRate(c,m);return `<i style="height:${Math.max(12,r)}%" title="${fmtD(m.d)}: ${r}%"></i>`;}).join('')}</span>`;}

function casasList(){
 const tot=CASAS.reduce((a,c)=>a+c.ppl.length,0),sep=CASAS.reduce((a,c)=>a+c.meets.filter(m=>m.done&&m.d.slice(0,7)==='2026-09').length,0);
 const avg=Math.round(CASAS.reduce((a,c)=>a+cRate(c),0)/CASAS.length),prev=Math.round(CASAS.reduce((a,c)=>a+cPrev(c),0)/CASAS.length);
 const req=CASAS.reduce((a,c)=>a+c.req.length,0);
 return `<header class="ph rise"><div><p class="eb">Comunidade</p><h1>Casas de Apascentamento</h1><p class="lede">${CASAS.length} casas ativas${req?` · <b>${req} ${req>1?'pedidos':'pedido'} para entrar</b> aguardando`:''}</p></div>
  <div class="pact">${rpBtn('casas','casas')}
  <button class="btn pri" data-a="hAdd">${ic('plus',15,2.2)}Nova casa</button></div></header>
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Casas</span><span class="kv">${CASAS.length}</span><span class="kd">${CASAS.filter(c=>c.min).length} ligadas a ministérios</span></div>
  <div class="k4"><span class="kl">Participantes</span><span class="kv">${tot}</span><span class="kd up">+8 este mês</span></div>
  <div class="k4"><span class="kl">Encontros em setembro</span><span class="kv">${sep}</span><span class="kd">em ${CASAS.length} casas</span></div>
  <div class="k4"><span class="kl">Presença média</span><span class="kv">${avg}%</span><span class="kd ${avg>=prev?'up':''}">${avg>=prev?'+':''}${avg-prev} p.p. vs. 4 anteriores</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="hq" placeholder="Buscar por casa, líder ou bairro" value="${esc(S.hq)}" autocomplete="off"></label>
   <div style="position:relative"><button class="btn sec sel" data-a="hminMenu">${S.hmin==='todos'?'Todos os ministérios':S.hmin==='geral'?'Casas gerais':S.hmin}${ic('updown',14)}</button>
    <div class="pop" id="hminPop" style="left:0;top:calc(100% + 6px)">${[['todos','Todos os ministérios'],['geral','Casas gerais (sem ministério)'],...HMIN.map(m=>[m,m])].map(o=>`<button class="pi" data-a="hMin" data-v="${o[0]}">${o[1]}${S.hmin===o[0]?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div></div>
  <div id="hrows">${hRows()}</div>
 </section>`;
}
function hRows(){
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
}

/* ---------- detail ---------- */
function casaDetail(){
 const c=hById(S.casa);if(!c){S.casa=null;return casasList();}
 const lm=lastMeet(c),r=cRate(c),pr=cPrev(c);
 return `<nav class="crumb rise"><span class="soft">Comunidade</span>${ic('chevR',13,2)}<button class="lnk back" data-a="hBack">Casas de Apascentamento</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${hTile(c,64)}<div class="pn"><h1>${esc(c.n)}</h1><p>${c.leaders.length>1?'Líderes: ':'Líder: '}${c.leaders.map(esc).join(' e ')} · ${c.ppl.length} participantes${c.max?' · '+c.max+' vagas'+(caFull(c)?' (lotada)':''):''}${c.min?` · Ministério de ${c.min}`:''}</p></div></div>
  <div class="pact">${rpBtn('casas','presenca')}
   <div style="position:relative"><button class="ibtn" data-a="hMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="hPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="hRules">${ic('sliders',17)}Regras da casa</button><hr><button class="pi danger" data-a="hDel">${ic('x',17)}Excluir casa</button></div></div></div>
  <div class="ikpi hk">
   <div><b>${c.ppl.length}</b><span>Participantes</span></div><div><b>${c.total}</b><span>Encontros</span></div>
   <div><b>${r}%</b><span>Presença média <em class="${r>=pr?'up':'dn'}">${r>=pr?'↑':'↓'} ${Math.abs(r-pr)} p.p.</em></span></div><div><b>${lm?fmtD(lm.d):'—'}</b><span>Último encontro</span></div>
  </div>
  <div class="ptabs" role="tablist">${[['geral','Visão geral'],['part','Participantes'],['enc','Encontros']].map(t=>`<button role="tab" class="${S.ctab===t[0]?'on':''}" data-a="hTab" data-v="${t[0]}">${t[1]}${t[0]==='part'&&c.req.length?`<small class="warn">${c.req.length}</small>`:''}</button>`).join('')}<button role="tab" class="${S.ctab==='hist'?'on':''}" data-a="hTab" data-v="hist">Histórico</button><span class="tind"></span></div>
 </header>
 <div id="htb" class="rise" style="--d:2">${hTabBody(c)}</div>`;
}
function hTabBody(c){if(S.ctab==='hist'&&!S.chamada)return caHist(c);if(S.ctab==='enc'&&S.chamada)return hChamada(c);return ({geral:hGeral,part:hPart,enc:hEnc})[S.ctab](c);}
function caHist(c){
 const ev=[];c.meets.filter(m=>m.done).slice(0,4).forEach(m=>{const n=c.ppl.filter(p=>m.pres[p.id]).length;ev.push([m.d,'Encontro realizado e chamada registrada',n+' de '+c.ppl.length+' presentes','por '+c.leader]);});
 c.meets.filter(m=>m.series&&!m.done).slice(0,1).forEach(m=>ev.push(['2026-09-28','Série de encontros criada','Toda semana, até '+fmtD(c.meets.filter(x=>x.series===m.series).map(x=>x.d).sort().pop()),'por '+c.leader]));
 c.ppl.filter(p=>p.role==='Participante').slice(0,3).forEach((p,i)=>ev.push([['2026-08-21','2026-06-12','2026-03-30'][i],'Entrou na casa',p.n,'pedido aceito por '+c.leader]));
 ev.push(['2025-01-12','Casa criada',c.n,'por Secretaria']);
 ev.sort((a,b)=>a[0]<b[0]?1:-1);
 const MO=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],kind=t=>/Entrou/.test(t)?['userplus','brand','Participante']:/Casa criada/.test(t)?['home','mute','Casa']:/Série/.test(t)?['calendar','seq','Encontro']:['calendar','int','Encontro'];
 return `<section class="card pc mh"><div class="sh"><h2>Histórico</h2><span class="who">${ev.length} registros · mais recentes primeiro</span></div>
  <ol class="mh-l">${ev.map((x,i)=>{const k=kind(x[1]),iso=x[0];return `<li class="mh-i ${i===0?'first':''}"><span class="mh-d"><b>${+iso.slice(8)}</b><small>${MO[+iso.slice(5,7)-1]} ${iso.slice(0,4)}</small></span><span class="mh-ic k-${k[1]}">${ic(k[0],15,2)}</span><div class="mh-b"><div class="mh-h"><b>${esc(x[1])}</b><span class="mh-k">${k[2]}</span></div><span class="mh-m">${esc(x[2])} · ${avN(x[3].replace(/^por /,''))}<span>${esc(x[3])}</span></span></div></li>`;}).join('')}</ol></section>`;}
/* ---------- endereço em campos separados (FND-M-18) ---------- */
const caAddrFields=(a,pre)=>{const co=NX_COUNTRIES[a.pais||'BR']?a.pais||'BR':'BR',I=(n,l,v,o={})=>`<label class="fld ${o.wide?'wide':''}"><span class="fl">${l}${o.opt?' <small>opcional</small>':''}</span><input name="${pre}-${n}" value="${esc(v||'')}" ${o.ph?`placeholder="${o.ph}"`:''} autocomplete="off"><span class="err"></span></label>`;
 return `<label class="fld"><span class="fl">País</span><span class="selw"><select name="${pre}-pais">${Object.entries(NX_COUNTRIES).map(([k,x])=>`<option value="${k}" ${k===co?'selected':''}>${x.n}</option>`).join('')}</select>${ic('updown',14)}</span></label>`
  +`<label class="fld"><span class="fl ca-div">${NX_COUNTRIES[co].div}</span><span class="selw"><select name="${pre}-uf">${nxSubOpts(co,a.uf)}</select>${ic('updown',14)}</span><span class="err"></span></label>`
  +I('cid','Cidade',a.cid)+I('bairro','Bairro ou distrito',a.bairro,{opt:1})+I('rua','Rua',a.rua,{wide:1})+I('num','Número',a.num,{opt:1})+I('comp','Complemento',a.comp,{opt:1})+I('cep','Código postal',a.cep,{opt:1,ph:co==='BR'?'00000-000':''});};
const caReadAddr=(f,pre)=>({pais:f.elements[pre+'-pais'].value,uf:f.elements[pre+'-uf'].value,cid:f.elements[pre+'-cid'].value.trim(),bairro:f.elements[pre+'-bairro'].value.trim(),rua:f.elements[pre+'-rua'].value.trim(),num:f.elements[pre+'-num'].value.trim(),comp:f.elements[pre+'-comp'].value.trim(),cep:f.elements[pre+'-cep'].value.trim()});
const caAddrCheck=(f,pre,bad)=>{const a=caReadAddr(f,pre);if(!a.uf){bad(pre+'-uf','Escolha '+(a.pais==='CL'?'a região':a.pais==='AR'?'a província':'o estado'));return null;}if(!a.cid){bad(pre+'-cid','Informe a cidade');return null;}if(!a.rua){bad(pre+'-rua','Informe a rua');return null;}return a;};
const caBad=f=>(n,m)=>{const i=f.elements[n],fl=i.closest('.fld');fl.classList.add('bad');const e=fl.querySelector('.err');if(e)e.textContent=m;i.focus();};
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.name)return;
 if(t.name.endsWith('-pais')){const co=t.value,uf=t.form.elements[t.name.replace('pais','uf')];if(uf&&NX_COUNTRIES[co]){uf.innerHTML=nxSubOpts(co,'');const lb=uf.closest('.fld')&&uf.closest('.fld').querySelector('.ca-div');if(lb)lb.textContent=NX_COUNTRIES[co].div;}}});
document.addEventListener('input',e=>{const t=e.target;if(t&&t.matches&&t.matches('[data-caq]')){const q=norm(t.value);$$('[data-capool="'+t.dataset.caq+'"] label').forEach(l=>{l.hidden=!!q&&!norm(l.textContent).includes(q);});}});
const caSync=c=>{c.addr=caAddrStr(c.a);};

/* ---------- ficha: Visão geral (Liderança com vários líderes, Local e contato em campos, Ministério, Descrição) ---------- */
const caSec=(k,title,view,form)=>{const ed=S.hedit===k;return `<section class="card pc sec ${ed?'editing':''}" id="hsec-${k}"><div class="sh"><h2>${title}</h2>${ed?'':`<button class="btn sec sm" data-a="hEdit" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>${ed?`<form class="fgrid" data-hsec2="${k}" novalidate style="grid-template-columns:1fr 1fr">${form}<div class="dfoot"><button type="button" class="btn sec" data-a="hCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`:view}</section>`;};
const caChip=(c,n)=>`<span class="cresp">${pv(c.ppl.find(p=>p.n===n)||{n,tone:caTone(n)})}${esc(n)}</span>`;
const caPool=(c)=>[...new Set([...c.leaders,...MEMBERS.filter(m=>m.tit&&m.st==='integrado').map(m=>m.n)])];
function hGeral(c){
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
}
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
function hPart(c){
 const l4=c.meets.filter(m=>m.done).slice(0,6).reverse();const ord={'Líder':0,'Anfitrião':1,'Participante':2};
 return `${c.req.length?`<section class="card pc reqs"><div class="sh"><h2>Pedidos para entrar</h2><span class="who">${c.req.length}</span></div>${c.req.map((r,i)=>`<div class="req">${pv(r)}<span class="rq"><b>${esc(r.n)}</b><span>pediu pelo app em ${dmy(r.d)}</span></span><button class="btn ghostd sm" data-a="hReject" data-v="${i}">Recusar</button><button class="btn pri sm" data-a="hAccept" data-v="${i}">Aceitar</button></div>`).join('')}</section>`:''}
 <section class="card mtab" style="${c.req.length?'margin-top:16px':''}"><div class="tbar"><span class="who" style="margin-right:auto"><b style="color:var(--ink)">${c.ppl.length}</b> participantes</span><button class="btn pri sm" data-a="hAddP">${ic('plus',14,2.2)}Adicionar participante</button></div>
  <div class="trow hpp thead"><span>Nome</span><span>Papel</span><span>Desde</span><span>Presença recente</span><span></span></div>
  ${c.ppl.slice().sort((a,b)=>ord[a.role]-ord[b.role]).map(p=>`<div class="trow hpp"><span class="tn">${pv(p)}<span><b>${esc(p.n)}</b></span></span>
   <span class="hrole"><span class="stp" style="--c:${p.role==='Líder'?'var(--st-ace)':p.role==='Anfitrião'?'var(--st-int)':'var(--ink-muted)'};--b:${p.role==='Líder'?'var(--st-ace-bg)':p.role==='Anfitrião'?'var(--st-int-bg)':'var(--surface-2)'}"><i></i>${p.role}</span></span>
   <span class="hsince">${p.since}</span>
   <span class="hdots">${l4.map(m=>`<i class="${m.pres[p.id]?'on':''}" title="${fmtD(m.d)}: ${m.pres[p.id]?'presente':'ausente'}"></i>`).join('')}</span>
   <span class="hact">${p.role==='Participante'?`<button class="ibtn sm" data-a="hRemP" data-v="${p.id}" aria-label="Remover da casa" title="Remover da casa">${ic('x',14)}</button>`:''}</span></div>`).join('')}
 </section>`;
}
function hEnc(c){
 const ms=c.meets.filter(m=>!m.scheduled).sort((a,b)=>a.d<b.d?1:-1);
 return `<section class="card pc"><div class="sh"><h2>Encontros</h2><span class="who">${c.total} no total</span></div>
  <form class="newm" id="nmF"><label class="fld"><span class="fl">Novo encontro</span><input type="date" name="d" id="nmD" max="${addDays(30)}"></label><button class="btn pri" id="nmB" type="submit" disabled>Criar e fazer chamada</button></form>
  <div class="trow hm thead"><span>Data</span><span>Descrição</span><span>Presença</span><span></span></div>
  ${ms.map(m=>{const n=c.ppl.filter(p=>m.pres[p.id]).length,r=mRate(c,m);return `<div class="trow hm"><span class="hmd"><b>${m.done?`<button class="lnk record-title" data-a="hViewMeet" data-v="${m.id}">${fmtD(m.d)}</button>`:fmtD(m.d)}</b><span>${wd(m.d)}</span></span>
   <span class="hmx"><span>${m.desc?esc(m.desc):'<span class="soft">Sem descrição</span>'}</span>${m.mat?`<span class="mat">${ic('book',12)}${esc(m.mat)}</span>`:''}</span>
   <span class="hmp">${m.done?`<span class="tr"><i style="width:${r}%"></i></span><span><b>${n}</b>/${c.ppl.length}</span>`:'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Chamada pendente</span>'}</span>
   <span class="hma"><button class="btn ${m.done?'sec':'pri'} sm" data-a="${m.done?'hViewMeet':'hCall'}" data-v="${m.id}">${m.done?'Ver encontro':'Chamada'}</button><button class="ibtn sm" data-a="hDelM" data-v="${m.id}" aria-label="Excluir encontro" title="Excluir encontro">${ic('x',14)}</button></span></div>`;}).join('')}
 </section>`;
}
function hChamada(c){
 const m=c.meets.find(x=>x.id===S.chamada);const n=c.ppl.filter(p=>m.pres[p.id]).length;
 return `<section class="card pc chm"><div class="sh"><div style="display:flex;align-items:center;gap:10px"><button class="ibtn sm" data-a="hCallBack" aria-label="Voltar">${ic('chevL',16,2)}</button><h2>Chamada · ${wd(m.d)}, ${fmtD(m.d)}</h2></div><span class="who" id="chCnt"><b>${n}</b> de ${c.ppl.length} presentes</span></div>
  <form id="chF" class="fgrid" style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Como foi o encontro? <small>opcional</small></span><textarea class="ta" name="desc" rows="3" placeholder="Tema, destaques, pedidos">${esc(m.desc)}</textarea></label>
   <label class="fld"><span class="fl">Material de apoio <small>opcional</small></span>${atomSel(m.mref)}<span class="hint">Fica visível para os participantes no app. Pregação, vídeo, música ou material, cadastrados em Conteúdo.</span></label>
   <div class="wide chl"><div class="chh"><span class="fl">Participantes</span><button type="button" class="lnk" data-a="hAllP">Marcar todos presentes</button></div>
    ${c.ppl.map(p=>`<div class="chr ${m.pres[p.id]?'on':''}" data-p="${p.id}">${pv(p)}<span class="chn"><b>${esc(p.n)}</b><span>${p.role}</span></span>
     <input class="why" name="why-${p.id}" placeholder="Motivo da ausência (opcional)" value="${esc(m.why[p.id]||'')}">
     <label class="chk"><input type="checkbox" name="p-${p.id}" ${m.pres[p.id]?'checked':''}><span>${ic('check',14,2.6)}</span>Presente</label></div>`).join('')}</div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="hCallBack">Cancelar</button><button type="submit" class="btn pri">Salvar chamada</button></div></form></section>`;
}

function casasAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#hq');if(q)q.addEventListener('input',e=>{S.hq=e.target.value;$('#hrows').innerHTML=hRows();});
 $$('form[data-hsec2]').forEach(f=>f.addEventListener('submit',caSave));
 const d=$('#nmD');if(d)d.addEventListener('input',()=>{$('#nmB').disabled=!d.value;});
 const nm=$('#nmF');if(nm)nm.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),v=d.value;if(c.meets.some(m=>m.d===v)){toast('Já existe um encontro nessa data');return;}const m={id:c.id+'e'+Date.now(),d:v,desc:'',mat:'',pres:{},why:{},done:false};c.meets.unshift(m);c.total++;S.chamada=m.id;reH();});
 const ch=$('#chF');if(ch){const upd=()=>{const n=$$('.chr input[type=checkbox]').filter(x=>x.checked).length;$('#chCnt').innerHTML=`<b>${n}</b> de ${hById(S.casa).ppl.length} presentes`;};
  ch.addEventListener('change',e=>{if(e.target.type==='checkbox'){e.target.closest('.chr').classList.toggle('on',e.target.checked);upd();}});
  ch.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),m=c.meets.find(x=>x.id===S.chamada),fd=new FormData(ch),b=ch.querySelector('[type=submit]');b.classList.add('busy');
   setTimeout(()=>{m.desc=fd.get('desc').trim();Object.assign(m,atomPick(fd.get('mat')));c.ppl.forEach(p=>{m.pres[p.id]=fd.has('p-'+p.id);m.why[p.id]=m.pres[p.id]?'':fd.get('why-'+p.id)||'';});const was=m.done;m.entries=m.entries||(was?[{d:m.d,t:'Encontro realizado e chamada registrada',by:c.leader}]:[]);m.entries.push({d:TODAY.toISOString().slice(0,10),t:was?'Registro e chamada atualizados':'Encontro realizado e chamada registrada',by:ME.n||c.leader});m.done=true;S.chamada=null;render();toast(`Chamada salva · ${c.ppl.filter(p=>m.pres[p.id]).length} de ${c.ppl.length} presentes`);},700);});}
}
function reH(){const c=hById(S.casa);$('#htb').innerHTML=hTabBody(c);$$('.ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.ctab));tabInd();casasAfter();}
const HA={
 hexpMenu:()=>{const p=$('#hexpPop');closePops(p);p.classList.toggle('open');},
 hminMenu:()=>{const p=$('#hminPop');closePops(p);p.classList.toggle('open');},
 hMin:v=>{S.hmin=v;closePops();render();},
 hMenu:()=>{const p=$('#hPop');closePops(p);p.classList.toggle('open');},
 hOpen:v=>{S.casa=v;S.ctab='geral';S.chamada=null;S.hedit=null;render();window.scrollTo({top:0});},
 hBack:()=>{S.casa=null;render();},
 hTab:v=>{S.ctab=v;S.chamada=null;S.hedit=null;reH();},
 hEdit:v=>{S.hedit=v;reH();},
 hCancel:()=>{S.hedit=null;reH();},
 hCall:v=>{S.chamada=v;reH();$('#htb').scrollIntoView({behavior:'smooth',block:'start'});},
 hCallBack:()=>{const c=hById(S.casa),m=c.meets.find(x=>x.id===S.chamada);if(m&&!m.done){c.meets.splice(c.meets.indexOf(m),1);c.total--;}S.chamada=null;reH();},
 hAllP:()=>{$$('.chr input[type=checkbox]').forEach(x=>{x.checked=true;x.closest('.chr').classList.add('on');});$('#chCnt').innerHTML=`<b>${hById(S.casa).ppl.length}</b> de ${hById(S.casa).ppl.length} presentes`;},
 hDelM:v=>{const c=hById(S.casa),i=c.meets.findIndex(m=>m.id===v),m=c.meets[i];
  if(m&&m.series&&!m.done)return caScope(c,m,{title:'Excluir encontro?',body:'Os encontros excluídos somem da lista e dos indicadores. Os convocados são avisados.',label:'Excluir encontro',danger:1,run:l=>{l.forEach(x=>{c.meets.splice(c.meets.indexOf(x),1);c.total--;});render();toast(l.length>1?l.length+' encontros excluídos':'Encontro excluído');}});
  confirmDel({title:`Excluir o encontro de ${fmtD(m.d)}?`,body:'A chamada e a descrição deste encontro serão apagadas e a presença média será recalculada.',label:'Excluir encontro',onConfirm:()=>{c.meets.splice(i,1);c.total--;render();toast('Encontro excluído',()=>{c.meets.splice(i,0,m);c.total++;render();});}});},
 hAccept:v=>{const c=hById(S.casa),r=c.req.splice(+v,1)[0];c.ppl.push({id:c.id+'p'+Date.now(),n:r.n,tone:r.tone,role:'Participante',since:'set/2026'});render();toast(`${r.n.split(' ')[0]} agora participa da ${c.n.split(' — ')[0]}${caFull(c)?'. A casa ficou lotada.':''}`);},
 hReject:v=>{const c=hById(S.casa),r=c.req[+v];
 openDlg(`${dlgHead('Recusar o pedido de '+esc(r.n.split(' ')[0])+'?','A pessoa é avisada pelo app e pode pedir outra casa.')}<form class="fgrid one" id="caNF" novalidate><label class="fld"><span class="fl">Motivo</span><input name="w" maxlength="200" placeholder="Ex.: a casa não está recebendo novos participantes agora" autocomplete="off"><span class="err"></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Recusar pedido</button></div></form>`,'sm');
 $('#caNF').onsubmit=e=>{e.preventDefault();const w=$('#caNF').w;if(!w.value.trim()){w.closest('.fld').classList.add('bad');w.closest('.fld').querySelector('.err').textContent='Informe o motivo';return;}c.req.splice(+v,1);closeDlg();render();toast('Pedido recusado');};},
 hRemP:v=>{const c=hById(S.casa),i=c.ppl.findIndex(p=>p.id===v),p=c.ppl[i];confirmDel({title:`Remover ${p.n.split(' ')[0]} da casa?`,body:`${p.n} deixa de aparecer na chamada. O histórico de presença é mantido.`,label:'Remover',onConfirm:()=>{c.ppl.splice(i,1);render();toast(`${p.n.split(' ')[0]} removido(a)`,()=>{c.ppl.splice(i,0,p);render();});}});},
 hAddP:()=>{const c=hById(S.casa),cand=MEMBERS.filter(m=>!c.ppl.some(p=>p.n===m.n));openDlg(`${dlgHead('Adicionar participante',`Quem vai participar da ${c.n}?`)}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="hpq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="hpick">${candList(cand,'')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="hDoAddP">Adicionar</button></div>`,'sm');
  $('#hpq').addEventListener('input',e=>{$('#hpick').innerHTML=candList(cand,e.target.value);});},
 hDoAddP:(v,b)=>{const s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const m=byId(s.value),c=hById(S.casa);b.classList.add('busy');setTimeout(()=>{c.ppl.push({id:c.id+'p'+Date.now(),n:m.n,tone:m.tone,role:'Participante',since:'set/2026'});closeDlg();render();toast(`${m.n.split(' ')[0]} adicionado(a) à casa`);},600);},
 hDel:()=>{closePops();const c=hById(S.casa);confirmDel({title:`Excluir ${c.n}?`,body:`Os ${c.ppl.length} participantes ficam sem casa e os ${c.total} encontros registrados são apagados. Esta ação não pode ser desfeita.`,label:'Excluir casa',typed:c.n.split(' — ')[0],onConfirm:()=>{CASAS.splice(CASAS.indexOf(c),1);S.casa=null;render();toast(`${c.n} excluída`);}});},
 hAdd:()=>{const pool=MEMBERS.filter(m=>m.tit&&m.st==='integrado').map(m=>m.n);
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
   c.host=host;CASAS.push(c);closeDlg();S.casa=c.id;S.ctab='geral';render();toast(`${n} criada`);},800);});},
 hRules:()=>{closePops();const c=hById(S.casa);
 openDlg(`${dlgHead('Regras da casa',esc(c.n))}<form class="fgrid one" id="caRF" novalidate>
  <label class="fld"><span class="fl">Vagas <small>opcional</small></span><input name="max" type="number" min="1" inputmode="numeric" value="${c.max||''}" placeholder="Sem limite"><span class="hint">Hoje a casa tem ${c.ppl.length} participantes. A casa lotada continua recebendo pedidos: o líder decide.</span><span class="err"></span></label>
  <label class="fld"><span class="fl">Atraso: dias sem encontro</span><input name="late" type="number" min="1" max="365" inputmode="numeric" value="${c.late||14}"><span class="hint">Depois desse prazo sem encontro, a casa aparece como atrasada na lista e no relatório. Padrão: 14 dias.</span><span class="err"></span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`,'sm');
 const f=$('#caRF'),bad=caBad(f);f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.onsubmit=e=>{e.preventDefault();const mx=f.elements.max.value.trim(),lt=+f.elements.late.value;
  if(mx&&(!/^\d+$/.test(mx)||+mx<1))return bad('max','Use um número a partir de 1, ou deixe em branco');
  if(!lt||lt<1||lt>365)return bad('late','Use de 1 a 365 dias');
  c.max=mx?+mx:null;c.late=lt;closeDlg();render();toast('Regras da casa atualizadas'+(caFull(c)?' · a casa ficou lotada':''));};},
 nxHouseRenew:v=>A.nxHouseSchedule('renew:'+v),
 nxHouseSchedule:id=>{const c=hById(S.casa),rn=id&&String(id).startsWith('renew:')?String(id).slice(6):null,old=!rn&&id&&c.meets.find(m=>m.id===id),t=TODAY.toISOString().slice(0,10),
  v=old?{d:old.d,start:old.start,mode:old.mode,where:old.where||'',url:old.url||''}:{d:addDays(7),start:'19:30',mode:'Presencial',where:'',url:''},ser=old&&old.series,n=ser?caFollow(c,old).length:0,
  Q=old?null:qdInit({start:v.d,f:v.start}),qo={min:t,time:qdTime};
 if(rn){/* Renovar para o próximo ano: a regra da série, a primeira data do ano seguinte e o fim em 31/12 */
  const l=c.meets.filter(m=>m.series===rn&&!m.cancelled).sort((a,b)=>a.d<b.d?-1:1),m0=l[l.length-1],y=+m0.d.slice(0,4)+1,days=m0.rdays||[...new Set(l.map(m=>dow(m.d)))].sort(),rp=m0.rep||'semanal',u=UF('x','00:00','01:00',rp,{days,mode:'semana',date:m0.d,from:m0.d});let d0=y+'-01-01';for(let i=0;i<400&&!ruleOn(u,d0);i++)d0=addD(d0,1);
  Object.assign(Q,{freq:rp,days,start:d0,mmode:'semana',endK:'data',endD:y+'-12-31',f:m0.start});Object.assign(v,{mode:m0.mode,where:m0.where||'',url:m0.url||''});}
 if(Q)qdFix(Q);
 openDlg(dlgHead(old?'Editar encontro':rn?'Renovar para '+Q.start.slice(0,4):'Agendar encontro',esc(c.n)+'. O que foi tratado você registra na chamada.')+'<form class="fgrid" id="caSF" novalidate style="grid-template-columns:1fr 1fr">'
  +(old?'<label class="fld"><span class="fl">Data</span><input type="date" name="d" min="'+(v.d<t?v.d:t)+'" value="'+v.d+'"><span class="err"></span></label>'
  +'<label class="fld"><span class="fl">Horário</span><input type="time" name="t" value="'+v.start+'"><span class="err"></span></label>':'<div class="wide" id="qdW">'+qdBlock(Q,qo)+'</div>')
  +'<div class="fld wide"><span class="fl">Modalidade</span><div class="yn" role="radiogroup"><label><input type="radio" name="mode" value="Presencial"'+(v.mode!=='Remoto'?' checked':'')+'><span>'+ic('pin',15)+'&nbsp;Presencial</span></label><label><input type="radio" name="mode" value="Remoto"'+(v.mode==='Remoto'?' checked':'')+'><span>'+ic('monitor',15)+'&nbsp;Remoto</span></label></div></div>'
  +'<label class="fld wide" data-w="p"><span class="fl">Local <small>opcional</small></span><input name="where" value="'+esc(v.where)+'" placeholder="Ex.: Casa do líder, sala de estar"></label>'
  +'<label class="fld wide" data-w="r" hidden><span class="fl">Link da reunião</span><input name="link" type="url" value="'+esc(v.url)+'" placeholder="Meet, Teams, Zoom…"><span class="err"></span></label>'
  +(old&&ser?'<div class="fld wide"><span class="fl">Alterar</span><div class="yn" role="radiogroup"><label><input type="radio" name="sc" value="one" checked><span>Só este encontro</span></label><label><input type="radio" name="sc" value="next"><span>Este e os próximos ('+n+')</span></label></div><span class="hint">A data só muda neste encontro. Horário, modalidade, local e link valem também para os próximos, se você escolher.</span></div>':'')
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">'+(old?'Salvar':rn?'Renovar':'Agendar')+'</button></div></form>',old?'':'lg evs');
 const f=$('#caSF'),bad=caBad(f),sync=()=>{const r=f.elements.mode.value==='Remoto';f.querySelector('[data-w=r]').hidden=!r;f.querySelector('[data-w=p]').hidden=r;};sync();
 if(Q)qdBind(f,Q,()=>{qdFix(Q);$('#qdBox').outerHTML=qdBlock(Q,qo);},t);
 f.addEventListener('change',sync);f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');});
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),d=old?fd.get('d'):Q.start,tm=old?fd.get('t'):Q.f,md=fd.get('mode'),lk=(fd.get('link')||'').trim(),wh=md==='Presencial'?(fd.get('where')||'').trim():'',url=md==='Remoto'?lk:'';
  if(!old){const r=qdCheck(Q);if(r)return qdShowErr(f,r);}
  if(!d)return bad('d','Escolha a data');if(!old&&d<t)return bad('d','A data já passou. Para um encontro que já aconteceu, use Registrar');if(!tm)return bad('t','Informe o horário');
  if(md==='Remoto'&&!/^https?:\/\/\S+/i.test(lk))return bad('link',lk?'Link inválido':'Informe o link da reunião');
  if(!old){
   if(Q.freq==='none'){if(c.meets.some(m=>m.d===d&&!m.cancelled))return bad('d','Já existe um encontro nessa data');c.meets.push(caMeet(c,{d,start:tm,mode:md,where:wh,url},null));c.total++;closeDlg();render();toast('Encontro agendado para '+wd(d)+', '+fmtD(d));return;}
   const sid='sr'+Date.now();let made=0,sk=0;evOccs(Q).forEach(x=>{if(c.meets.some(m=>m.d===x&&!m.cancelled)){sk++;return;}const m=caMeet(c,{d:x,start:tm,mode:md,where:wh,url},sid);m.rep=Q.freq;m.rdays=Q.days.slice();c.meets.push(m);c.total++;made++;});
   if(rn)c.meets.forEach(m=>{if(m.series===rn)m.renewed=true;});
   closeDlg();render();toast(made+' encontros agendados'+(sk?' · '+sk+' data'+(sk>1?'s':'')+' pulada'+(sk>1?'s':'')+' (já tinha encontro)':''));return;}
  if(d!==old.d&&c.meets.some(m=>m!==old&&m.d===d&&!m.cancelled))return bad('d','Já existe um encontro nessa data');
  const next=ser&&fd.get('sc')==='next',targets=next?[old,...caFollow(c,old)]:[old],changed=d!==old.d||tm!==old.start||md!==old.mode||wh!==(old.where||'')||url!==(old.url||'');
  targets.forEach(m=>{m.start=tm;m.mode=md;m.where=wh;m.url=url;if(m===old)m.d=d;if(changed){m.rsvp={};c.ppl.forEach(p=>{m.rsvp[p.id]={r:'',why:''};});}});
  closeDlg();render();toast((targets.length>1?targets.length+' encontros atualizados':'Encontro atualizado')+(changed?' · respostas zeradas e participantes avisados':''));});},
 nxHouseCancel:id=>{const c=hById(S.casa),m=c.meets.find(x=>x.id===id);
  if(m&&m.series)return caScope(c,m,{title:'Cancelar encontro?',body:'Os encontros cancelados ficam registrados como cancelados, saem da agenda e todos os convocados são avisados.',label:'Cancelar encontro',run:l=>{l.forEach(x=>{x.cancelled=true;});render();toast(l.length>1?l.length+' encontros cancelados · convocados avisados':'Encontro cancelado · convocados avisados');}});
  confirmDel({title:'Cancelar encontro?',body:'O encontro ficará registrado como cancelado e sairá da agenda.',label:'Cancelar encontro',onConfirm:()=>{hById(S.casa).meets.find(m=>m.id===id).cancelled=true;render();}});},
};
(()=>{const c=CASAS[0],m=c.meets[0],pl=c.ppl[1],mo=c.ppl[4];m.pres[c.ppl[0].id]=true;m.pres[pl.id]=false;m.why[pl.id]='Viagem a trabalho';m.pres[mo.id]=false;m.pres[c.ppl[2].id]=true;m.pres[c.ppl[3].id]=true;})();
/* ---------- dados de exemplo: descrição, vários líderes, vagas, endereço em campos, série de encontros ---------- */
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
/* Casa Sul tem dois líderes (o casal); Casa Norte está lotada */
{const c=CASAS[1],p=c.ppl.find(x=>x.n==='Rogério Melo');if(p){p.role='Líder';c.leaders=[c.leader,p.n];}}
CASAS[0].max=18;
const caGen=(first,freq,until)=>{const out=[first],base=new Date(first+'T12:00');for(let n=1;n<=200;n++){let d;if(freq==='M'){const m=base.getMonth()+n,last=new Date(base.getFullYear(),m+1,0).getDate();d=new Date(base.getFullYear(),m,Math.min(base.getDate(),last),12);}else{d=new Date(base);d.setDate(d.getDate()+n*(freq==='W'?7:14));}
  const iso=d.toISOString().slice(0,10);if(iso>until)break;out.push(iso);}return out;};
const caMeet=(c,q,sid)=>{const m={id:'hm'+(++_caN)+Date.now().toString(36),scheduled:true,done:false,cancelled:false,pres:{},why:{},desc:q.desc||'',mat:'',d:q.d,start:q.start,end:'',mode:q.mode,where:q.where||'',url:q.url||'',series:sid||null,rsvp:{}};c.ppl.forEach(p=>{m.rsvp[p.id]={r:'',why:''};});return m;};
const caFollow=(c,m)=>c.meets.filter(x=>x.series&&x.series===m.series&&!x.done&&!x.cancelled&&x.d>m.d);
/* aviso "séries que terminam em 31/12" na aba Encontros da casa (janela de fim de ano) */
function caRenewBanner(c){if(!qdInWin(EVTODAY))return '';const y=EVTODAY.slice(0,4),g={};c.meets.filter(x=>x.series&&!x.cancelled).forEach(x=>{(g[x.series]=g[x.series]||[]).push(x);});
 const l=Object.values(g).map(a=>a.sort((p,q)=>p.d<q.d?-1:1)).filter(a=>a[a.length-1].d.slice(0,4)===y&&!a.some(x=>x.renewed)).map(a=>({id:a[0].series,t:a[0].desc||'Encontro da casa',txt:a[0].rep==='quinzenal'?'A cada 2 semanas':a[0].rep==='mensal'?'Todo mês':'Toda semana',last:a[a.length-1].d}));
 return qdRenewBanner(l,'nxHouseRenew');}
/* uma série de exemplo: Casa Norte, toda quarta (entra depois dos encontros agendados de cada casa, em Encontros da casa) */
function caSeedSeries(){const c=CASAS[0],sid='sr-norte';caGen('2026-10-07','W','2026-12-02').forEach((d,i)=>{const m=caMeet(c,{d,start:'19:30',mode:'Presencial',where:'Casa do líder',desc:'Estudo e partilha'},sid);if(i===0)delete m.rsvp;m.rep='semanal';m.rdays=[3];c.meets.push(m);c.total++;});}
function caScope(c,m,o){const n=caFollow(c,m).length;
 openDlg(dlgHead(o.title,esc(c.n)+' · '+wd(m.d)+', '+fmtD(m.d))+'<form id="caScF" class="fgrid one" novalidate><div class="fld"><div class="yn" role="radiogroup"><label><input type="radio" name="sc" value="one" checked><span>Só este encontro</span></label><label><input type="radio" name="sc" value="next"><span>Este e os próximos ('+n+')</span></label></div></div><p class="hint" style="margin:0">'+o.body+'</p><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Voltar</button><button type="submit" class="btn pri'+(o.danger?' danger':'')+'">'+o.label+'</button></div></form>','sm');
 $('#caScF').onsubmit=e=>{e.preventDefault();const next=new FormData($('#caScF')).get('sc')==='next';closeDlg();o.run(next?[m,...caFollow(c,m)]:[m]);};}


