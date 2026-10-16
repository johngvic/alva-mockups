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
  <div class="k4"><span class="kl">Presença média</span><span class="kv">${avg}%</span><span class="kd ${avg>=prev?'up':''}">${avg>=prev?'+':''}${avg-prev} p.p. vs. mês anterior</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="hq" placeholder="Buscar por casa, líder ou bairro" value="${esc(S.hq)}" autocomplete="off"></label>
   <div style="position:relative"><button class="btn sec sel" data-a="hminMenu">${S.hmin==='todos'?'Todos os ministérios':S.hmin==='geral'?'Casas gerais':S.hmin}${ic('updown',14)}</button>
    <div class="pop" id="hminPop" style="left:0;top:calc(100% + 6px)">${[['todos','Todos os ministérios'],['geral','Casas gerais (sem ministério)'],...HMIN.map(m=>[m,m])].map(o=>`<button class="pi" data-a="hMin" data-v="${o[0]}">${o[1]}${S.hmin===o[0]?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div></div>
  <div id="hrows">${hRows()}</div>
 </section>`;
}
function hRows(){
 const q=norm(S.hq);const l=CASAS.filter(c=>(S.hmin==='todos'||(S.hmin==='geral'?!c.min:c.min===S.hmin))&&(!q||norm(c.n+' '+c.leader+' '+c.addr).includes(q)));
 if(!l.length)return `<div class="mempty"><p>Nenhuma casa encontrada.</p><span>Tente outro termo ou ministério.</span></div>`;
 return `<div class="trow hs thead"><span>Casa</span><span>Líder</span><span>Participantes</span><span>Presença</span><span>Último encontro</span><span></span></div>
 ${l.map(c=>{const lm=lastMeet(c),ago_=lm?-inDays(lm.d):0,r=cRate(c);return `<div class="trow hs" tabindex="0" data-a="hOpen" data-v="${c.id}">
  <span class="tn">${hTile(c)}<span class="hn"><b>${esc(c.n)}</b>${c.min?`<span>Ministério de ${c.min}</span>`:`<span>${esc(c.addr.split('— ')[1]||'')}</span>`}</span></span>
  <span class="hl">${pv({n:c.leader,tone:c.tone})}${esc(c.leader)}</span>
  <span class="hp"><b>${c.ppl.length}</b>${c.req.length?`<em class="tag warn">+${c.req.length} pedido${c.req.length>1?'s':''}</em>`:''}</span>
  <span class="hr">${spark6(c)}<b>${r}%</b></span>
  <span class="hlast">${lm?`<span>${dmy(lm.d)}</span><span class="${ago_>14?'late':''}">há ${ago_} dias</span>`:'<span class="soft">Nenhum ainda</span>'}</span>
  <span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}
 <div class="tfoot"><span>${l.length} ${l.length>1?'casas encontradas':'casa encontrada'}</span></div>`;
}

/* ---------- detail ---------- */
function casaDetail(){
 const c=hById(S.casa);if(!c){S.casa=null;return casasList();}
 const lm=lastMeet(c),r=cRate(c),pr=cPrev(c);
 return `<nav class="crumb rise"><span class="soft">Comunidade</span>${ic('chevR',13,2)}<button class="lnk back" data-a="hBack">Casas de Apascentamento</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${hTile(c,64)}<div class="pn"><h1>${esc(c.n)}</h1><p>Líder: ${esc(c.leader)} · ${c.ppl.length} participantes${c.min?` · Ministério de ${c.min}`:''}</p></div></div>
  <div class="pact">${rpBtn('casas','presenca')}
   <div style="position:relative"><button class="ibtn" data-a="hMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="hPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="hDel">${ic('x',17)}Excluir casa</button></div></div></div>
  <div class="ikpi hk">
   <div><b>${c.ppl.length}</b><span>Participantes</span></div><div><b>${c.total}</b><span>Encontros</span></div>
   <div><b>${r}%</b><span>Presença média <em class="${r>=pr?'up':'dn'}">${r>=pr?'↑':'↓'} ${Math.abs(r-pr)} p.p.</em></span></div><div><b>${lm?fmtD(lm.d):'—'}</b><span>Último encontro</span></div>
  </div>
  <div class="ptabs" role="tablist">${[['geral','Visão geral'],['part','Participantes'],['enc','Encontros']].map(t=>`<button role="tab" class="${S.ctab===t[0]?'on':''}" data-a="hTab" data-v="${t[0]}">${t[1]}${t[0]==='part'&&c.req.length?`<small class="warn">${c.req.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="htb" class="rise" style="--d:2">${hTabBody(c)}</div>`;
}
function hTabBody(c){if(S.ctab==='enc'&&S.chamada)return hChamada(c);return ({geral:hGeral,part:hPart,enc:hEnc})[S.ctab](c);}
const HSECS={
 lid:{t:'Liderança',f:[['leader','Líder','person'],['host','Anfitrião','person']]},
 loc:{t:'Local e contato',f:[['addr','Endereço','text'],['phone','Telefone','tel']]},
 min:{t:'Ministério responsável',f:[['min','Ministério','min','Diz para qual público a casa é voltada e ajuda a filtrar a lista.']]},
};
function hGeral(c){
 const ms=c.meets.filter(m=>m.done).slice(0,8).reverse();
 return `<div class="pgrid"><div class="col">${['lid','loc','min'].map(k=>{const s=HSECS[k],ed=S.hedit===k;return `<section class="card pc sec ${ed?'editing':''}" id="hsec-${k}"><div class="sh"><h2>${s.t}</h2>${ed?'':`<button class="btn sec sm" data-a="hEdit" data-v="${k}">${ic('pen',14)}Editar</button>`}</div>
  ${ed?`<form class="fgrid" data-hsec="${k}" novalidate style="grid-template-columns:1fr 1fr">${s.f.map(f=>hField(c,f)).join('')}<div class="dfoot"><button type="button" class="btn sec" data-a="hCancel">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>`
  :`<dl class="kv grid2">${s.f.map(f=>{const v=c[f[0]];return `<div><dt>${f[1]}</dt><dd>${!v?`<span class="soft">${f[0]==='min'?'Nenhum — casa geral da igreja':'Não informado'}</span>`:f[0]==='addr'?`${esc(v)}<br><a class="lnk" style="padding:4px 0 0" href="https://www.google.com/maps/search/${encodeURIComponent(v)}" target="_blank" rel="noopener">${ic('pin',13)}Ver no mapa</a>`:f[2]==='person'?`<span class="cresp">${pv(c.ppl.find(p=>p.n===v)||{n:v,tone:c.tone})}${esc(v)}</span>`:esc(f[0]==='min'?'Ministério de '+v:v)}</dd></div>`;}).join('')}</dl>`}</section>`;}).join('')}</div>
  <div class="col"><section class="card pc"><div class="sh"><h2>Presença</h2><span class="who">últimos ${ms.length} encontros</span></div>
   <div class="hbars">${ms.map(m=>{const r=mRate(c,m);return `<div class="hb" title="${fmtD(m.d)}: ${c.ppl.filter(p=>m.pres[p.id]).length} de ${c.ppl.length}"><span class="hbv">${r}%</span><span class="hbt"><i style="height:${r}%"></i></span><span class="hbl">${fmtD(m.d).replace(' ',' ')}</span></div>`;}).join('')}</div>
   <p class="who" style="margin:14px 0 0">Média de <b>${cRate(c)}%</b> no último mês${c.req.length?` · <button class="lnk inl" data-a="hTab" data-v="part">${c.req.length} ${c.req.length>1?'pedidos':'pedido'} para entrar</button>`:''}</p></section>
   <section class="card pc"><div class="sh"><h2>Quem mais faltou</h2><span class="who">últimos 4</span></div>${(()=>{const l4=c.meets.filter(m=>m.done).slice(0,4);const aus=c.ppl.map(p=>({p,n:l4.filter(m=>!m.pres[p.id]).length})).filter(x=>x.n>=2).sort((a,b)=>b.n-a.n).slice(0,4);return aus.length?`<ol class="late">${aus.map(x=>`<li><div class="lt" style="cursor:default">${pv(x.p)}<span><b>${esc(x.p.n)}</b><span>${x.p.role}</span></span><em>${x.n} faltas</em></div></li>`).join('')}</ol>`:'<p class="who" style="margin:0">Ninguém com 2 ou mais faltas seguidas.</p>';})()}</section></div></div>`;
}
function hField(c,f){const id='hf-'+f[0],v=c[f[0]]||'';
 if(f[2]==='person')return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="${f[0]}">${c.ppl.map(p=>`<option ${p.n===v?'selected':''}>${esc(p.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>`;
 if(f[2]==='min')return `<label class="fld wide" for="${id}"><span class="fl">${f[1]}</span><span class="selw"><select id="${id}" name="min"><option value="">Nenhum — casa geral da igreja</option>${HMIN.map(m=>`<option ${m===v?'selected':''}>${m}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">${f[3]}</span></label>`;
 return `<label class="fld" for="${id}"><span class="fl">${f[1]}</span><input id="${id}" name="${f[0]}" type="${f[2]}" value="${esc(v)}"><span class="err"></span></label>`;}
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
   <label class="fld"><span class="fl">Material de apoio <small>opcional</small></span><span class="selw"><select name="mat"><option value="">Nenhum</option>${['Frutos do Espírito · cap. 3','O Sermão do Monte','Parábolas de Jesus','Vida em comunidade'].map(x=>`<option ${m.mat===x?'selected':''}>${x}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Fica visível para os participantes no app. Cadastrado em Conteúdo › Material de apoio.</span></label>
   <div class="wide chl"><div class="chh"><span class="fl">Participantes</span><button type="button" class="lnk" data-a="hAllP">Marcar todos presentes</button></div>
    ${c.ppl.map(p=>`<div class="chr ${m.pres[p.id]?'on':''}" data-p="${p.id}">${pv(p)}<span class="chn"><b>${esc(p.n)}</b><span>${p.role}</span></span>
     <input class="why" name="why-${p.id}" placeholder="Motivo da ausência (opcional)" value="${esc(m.why[p.id]||'')}">
     <label class="chk"><input type="checkbox" name="p-${p.id}" ${m.pres[p.id]?'checked':''}><span>${ic('check',14,2.6)}</span>Presente</label></div>`).join('')}</div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="hCallBack">Cancelar</button><button type="submit" class="btn pri">Salvar chamada</button></div></form></section>`;
}

function casasAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#hq');if(q)q.addEventListener('input',e=>{S.hq=e.target.value;$('#hrows').innerHTML=hRows();});
 $$('form[data-hsec]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),fd=new FormData(f),k=f.dataset.hsec,b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{HSECS[k].f.forEach(x=>{if(fd.has(x[0]))c[x[0]]=fd.get(x[0]);});S.hedit=null;render();toast(`${HSECS[k].t} atualizado`);},700);}));
 const d=$('#nmD');if(d)d.addEventListener('input',()=>{$('#nmB').disabled=!d.value;});
 const nm=$('#nmF');if(nm)nm.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),v=d.value;if(c.meets.some(m=>m.d===v)){toast('Já existe um encontro nessa data');return;}const m={id:c.id+'e'+Date.now(),d:v,desc:'',mat:'',pres:{},why:{},done:false};c.meets.unshift(m);c.total++;S.chamada=m.id;reH();});
 const ch=$('#chF');if(ch){const upd=()=>{const n=$$('.chr input[type=checkbox]').filter(x=>x.checked).length;$('#chCnt').innerHTML=`<b>${n}</b> de ${hById(S.casa).ppl.length} presentes`;};
  ch.addEventListener('change',e=>{if(e.target.type==='checkbox'){e.target.closest('.chr').classList.toggle('on',e.target.checked);upd();}});
  ch.addEventListener('submit',e=>{e.preventDefault();const c=hById(S.casa),m=c.meets.find(x=>x.id===S.chamada),fd=new FormData(ch),b=ch.querySelector('[type=submit]');b.classList.add('busy');
   setTimeout(()=>{m.desc=fd.get('desc').trim();m.mat=fd.get('mat');c.ppl.forEach(p=>{m.pres[p.id]=fd.has('p-'+p.id);m.why[p.id]=m.pres[p.id]?'':fd.get('why-'+p.id)||'';});const was=m.done;m.entries=m.entries||(was?[{d:m.d,t:'Encontro realizado e chamada registrada',by:c.leader}]:[]);m.entries.push({d:TODAY.toISOString().slice(0,10),t:was?'Registro e chamada atualizados':'Encontro realizado e chamada registrada',by:ME.n||c.leader});m.done=true;S.chamada=null;render();toast(`Chamada salva · ${c.ppl.filter(p=>m.pres[p.id]).length} de ${c.ppl.length} presentes`);},700);});}
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
 hDelM:v=>{const c=hById(S.casa),i=c.meets.findIndex(m=>m.id===v),m=c.meets[i];confirmDel({title:`Excluir o encontro de ${fmtD(m.d)}?`,body:'A chamada e a descrição deste encontro serão apagadas e a presença média será recalculada.',label:'Excluir encontro',onConfirm:()=>{c.meets.splice(i,1);c.total--;render();toast('Encontro excluído',()=>{c.meets.splice(i,0,m);c.total++;render();});}});},
 hAccept:v=>{const c=hById(S.casa),r=c.req.splice(+v,1)[0];c.ppl.push({id:c.id+'p'+Date.now(),n:r.n,tone:r.tone,role:'Participante',since:'set/2026'});render();toast(`${r.n.split(' ')[0]} agora participa da ${c.n.split(' — ')[0]}`);},
 hReject:v=>{const c=hById(S.casa),r=c.req[+v];confirmDel({title:`Recusar o pedido de ${r.n.split(' ')[0]}?`,body:'A pessoa é avisada pelo app e pode escolher outra casa.',label:'Recusar pedido',onConfirm:()=>{c.req.splice(+v,1);render();toast('Pedido recusado');}});},
 hRemP:v=>{const c=hById(S.casa),i=c.ppl.findIndex(p=>p.id===v),p=c.ppl[i];confirmDel({title:`Remover ${p.n.split(' ')[0]} da casa?`,body:`${p.n} deixa de aparecer na chamada. O histórico de presença é mantido.`,label:'Remover',onConfirm:()=>{c.ppl.splice(i,1);render();toast(`${p.n.split(' ')[0]} removido(a)`,()=>{c.ppl.splice(i,0,p);render();});}});},
 hAddP:()=>{const c=hById(S.casa),cand=MEMBERS.filter(m=>!c.ppl.some(p=>p.n===m.n));openDlg(`${dlgHead('Adicionar participante',`Quem vai participar da ${c.n}?`)}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="hpq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="hpick">${candList(cand,'')}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="hDoAddP">Adicionar</button></div>`,'sm');
  $('#hpq').addEventListener('input',e=>{$('#hpick').innerHTML=candList(cand,e.target.value);});},
 hDoAddP:(v,b)=>{const s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const m=byId(s.value),c=hById(S.casa);b.classList.add('busy');setTimeout(()=>{c.ppl.push({id:c.id+'p'+Date.now(),n:m.n,tone:m.tone,role:'Participante',since:'set/2026'});closeDlg();render();toast(`${m.n.split(' ')[0]} adicionado(a) à casa`);},600);},
 hDel:()=>{closePops();const c=hById(S.casa);confirmDel({title:`Excluir ${c.n}?`,body:`Os ${c.ppl.length} participantes ficam sem casa e os ${c.total} encontros registrados são apagados. Esta ação não pode ser desfeita.`,label:'Excluir casa',typed:c.n.split(' — ')[0],onConfirm:()=>{CASAS.splice(CASAS.indexOf(c),1);S.casa=null;render();toast(`${c.n} excluída`);}});},
 hAdd:()=>{const leaders=MEMBERS.filter(m=>m.tit);openDlg(`${dlgHead('Nova casa','Os participantes podem ser adicionados depois.')}
  <form class="fgrid" id="haF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome da casa</span><input name="n" placeholder="Ex.: Casa Norte — Santana" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Líder</span><span class="selw"><select name="leader">${leaders.map(m=>`<option>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Anfitrião</span><span class="selw"><select name="host">${leaders.map((m,i)=>`<option ${i===2?'selected':''}>${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld wide"><span class="fl">Endereço</span><input name="addr" placeholder="Rua, número — Bairro, Cidade/UF" autocomplete="off"></label>
   <label class="fld"><span class="fl">Telefone <small>opcional</small></span><input name="phone" type="tel" inputmode="tel" placeholder="(11) 90000-0000"></label>
   <label class="fld"><span class="fl">Ministério <small>opcional</small></span><span class="selw"><select name="min"><option value="">Nenhum — casa geral</option>${HMIN.map(m=>`<option>${m}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <p class="hint wide" style="margin:-6px 0 0">O ministério diz para qual público a casa é voltada. Uma casa do Ministério de Jovens fica fácil de filtrar na lista.</p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar casa</button></div></form>`);
  const f=$('#haF'),ph=f.querySelector('[name=phone]');ph.addEventListener('input',()=>{let d=ph.value.replace(/\D/g,'').slice(0,11);ph.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d;});
  f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim(),i=f.querySelector('[name=n]');const bad=m=>{i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;i.focus();};
   if(!n)return bad('Dê um nome à casa');if(CASAS.some(c=>norm(c.n)===norm(n)))return bad('Já existe uma casa com esse nome');if(fd.get('leader')===fd.get('host')&&false)return;
   const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const c=mkCasa(n,fd.get('leader'),fd.get('host'),2,0,TODAY.toISOString().slice(0,10),{addr:fd.get('addr'),phone:fd.get('phone'),min:fd.get('min')});c.meets=[];c.total=0;CASAS.push(c);closeDlg();S.casa=c.id;S.ctab='geral';render();toast(`${n} criada`);},800);});},
};
(()=>{const c=CASAS[0],m=c.meets[0],pl=c.ppl[1],mo=c.ppl[4];m.pres[c.ppl[0].id]=true;m.pres[pl.id]=false;m.why[pl.id]='Viagem a trabalho';m.pres[mo.id]=false;m.pres[c.ppl[2].id]=true;m.pres[c.ppl[3].id]=true;})();

