/* ================= Comunidade › Redes de casa ================= */
let _rid=0;
const RD=(n,sup,tone,casas)=>({id:'r'+(++_rid),n,sup,tone,casas,meets:[]});
const REDES=[RD('Rede Norte','Rodrigo Alves','ceu',['h1','h5']),RD('Rede Sul','Camila Duarte','damasco',['h2']),RD('Rede Leste/Oeste','Diego Martins','lima',['h3','h4'])];
const rById=id=>REDES.find(r=>r.id===id);
const casaRede=hid=>REDES.find(r=>r.casas.includes(hid));
function redesList(){
 if(S.rede){const rr=rById(S.rede);if(rr)return redeDetail(rr);S.rede=null;}
 const q=norm(S.rq||'');const loose=CASAS.filter(c=>!casaRede(c.id));
 const l=REDES.filter(r=>!q||norm(r.n+' '+r.sup+' '+r.casas.map(h=>hById(h)?.n||'').join(' ')).includes(q));
 return `<header class="ph rise"><div><p class="eb">Comunidade</p><h1>Redes de casa</h1><p class="lede">Hierarquia de supervisão: supervisor › líder › casa</p></div>
  <div class="pact">${rpBtn('casas','redes')}
  <button class="btn pri" data-a="rAdd">${ic('plus',15,2.2)}Nova rede</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Redes</span><span class="kv">${REDES.length}</span><span class="kd">${REDES.length} supervisores</span></div>
  <div class="k4"><span class="kl">Casas vinculadas</span><span class="kv">${CASAS.length-loose.length}<small class="kof"> de ${CASAS.length}</small></span><span class="kmeter"><i style="width:${Math.round((CASAS.length-loose.length)/CASAS.length*100)}%"></i></span></div>
  <div class="k4"><span class="kl">Pessoas nas redes</span><span class="kv">${REDES.reduce((a,r)=>a+r.casas.reduce((b,h)=>b+(hById(h)?.ppl.length||0),0),0)}</span><span class="kd">participantes das casas</span></div>
 </section>
 ${loose.length?`<div class="dupn rise" style="--d:2"><span class="dd"></span><span><b>${loose.length} ${loose.length>1?'casas sem rede':'casa sem rede'}</b> · ${loose.map(c=>esc(c.n)).join(', ')}</span></div>`:''}
 <label class="sbox rise" style="--d:2;max-width:360px">${ic('search',16)}<input id="rq" placeholder="Buscar rede, supervisor ou casa" value="${esc(S.rq||'')}" autocomplete="off"></label>
 <div class="rgrid2 rise" style="--d:3" id="rrows">${l.length?l.map(rCard).join(''):'<div class="card mempty" style="grid-column:1/-1"><p>Nenhuma rede encontrada.</p></div>'}</div>`;
}
function rCard(r){
 const cs=r.casas.map(hById).filter(Boolean),ppl=cs.reduce((a,c)=>a+c.ppl.length,0),avg=cs.length?Math.round(cs.reduce((a,c)=>a+cRate(c),0)/cs.length):0;
 return `<article class="card rc">
  <div class="rc1"><div><button class="lnk" data-a="rOpen" data-v="${r.id}"><b>${esc(r.n)}</b></button><span>${cs.length} ${cs.length===1?'casa':'casas'} · ${ppl} pessoas${cs.length?` · presença ${avg}%`:''}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="rMenu" data-v="${r.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="rPop-${r.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="rEdit" data-v="${r.id}">${ic('pen',16)}Editar rede</button><hr><button class="pi danger" data-a="rDel" data-v="${r.id}">${ic('x',16)}Excluir rede</button></div></div></div>
  <div class="rtree">
   <div class="rsup">${pav(r.sup,r.tone,'')}<span><b>${esc(r.sup)}</b><small>Supervisor</small></span></div>
   ${cs.length?`<ul>${cs.map(c=>`<li><button class="rcasa" data-a="rGoCasa" data-v="${c.id}">${hTile(c,30)}<span class="rct"><b>${esc(c.n)}</b><small>${esc(c.leader)} · ${c.ppl.length} pessoas</small></span><span class="rpc">${cRate(c)}%</span></button></li>`).join('')}</ul>`:`<p class="who" style="margin:10px 0 0 44px">Nenhuma casa vinculada.</p>`}
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sec sm" data-a="rOpen" data-v="${r.id}">${ic('chevR',14,2)}Abrir rede</button><button class="btn sec sm" data-a="rEdit" data-v="${r.id}">${ic('plus',14,2.2)}Vincular casas</button></div>
 </article>`;
}
function rForm(r){
 const leaders=MEMBERS.filter(m=>m.tit);
 return `<form class="fgrid one" id="rF" novalidate>
  <label class="fld"><span class="fl">Nome da rede</span><input name="n" value="${esc(r?r.n:'')}" placeholder="Ex.: Rede Centro" autocomplete="off"><span class="err"></span></label>
  <label class="fld"><span class="fl">Supervisor</span><span class="selw"><select name="sup">${[...new Set([...(r?[r.sup]:[]),...leaders.map(m=>m.n)])].map(n=>`<option ${r&&r.sup===n?'selected':''}>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Precisa ser um membro cadastrado.</span></label>
  <div class="fld"><span class="fl">Casas vinculadas <small>opcional</small></span><div class="cpick">${CASAS.map(c=>{const o=casaRede(c.id),mine=r&&o===r;return `<label class="${o&&!mine?'taken':''}"><input type="checkbox" name="casa" value="${c.id}" ${mine?'checked':''}>${hTile(c,26)}<span><b>${esc(c.n)}</b><small>${o&&!mine?'Hoje em '+esc(o.n)+' · será movida':esc(c.leader)}</small></span><i class="cb">${ic('check',12,2.8)}</i></label>`;}).join('')}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${r?'Salvar':'Criar rede'}</button></div></form>`;
}
function rBind(r){const f=$('#rF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),n=fd.get('n').trim(),i=f.querySelector('[name=n]');
  if(!n){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Dê um nome à rede';i.focus();return;}
  if(REDES.some(x=>x!==r&&norm(x.n)===norm(n))){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Já existe uma rede com esse nome';i.focus();return;}
  const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const sel=fd.getAll('casa');REDES.forEach(x=>{x.casas=x.casas.filter(h=>!sel.includes(h));});
   if(r){r.n=n;r.sup=fd.get('sup');r.casas=sel;}else REDES.push(RD(n,fd.get('sup'),TONES[REDES.length%6],sel));closeDlg();render();toast(r?`${n} atualizada`:`${n} criada`);},700);});}

/* ---------- Ficha da rede (GRP-WEB-05): Visão geral, Casas, Encontros, Mensagens e Histórico ---------- */
Object.assign(S,{rede:null,rtab:'geral'});
const RSUP_CT={'Rodrigo Alves':['(11) 98123-4455','rodrigo.alves@email.com'],'Camila Duarte':['(11) 97654-3210','camila.duarte@email.com'],'Diego Martins':['(11) 99871-2043','diego.martins@email.com']};
const rSupCt=n=>{const m=MEMBERS.find(x=>x.n===n);return m&&(m.ph||m.e)?[m.ph||'',m.e||'']:(RSUP_CT[n]||['','']);};
const rCasasOf=r=>r.casas.map(hById).filter(Boolean);
const rPpl=r=>rCasasOf(r).reduce((a,c)=>a+c.ppl.length,0);
const rTile=(r,s)=>`<span class="htile" style="--s:${s}px;background:var(--tone-${r.tone});color:var(--tone-${r.tone}-ink)">${ic('users',Math.round(s*.47),1.9)}</span>`;
function redeDetail(r){
 const cs=rCasasOf(r),ppl=rPpl(r),avg=cs.length?Math.round(cs.reduce((a,c)=>a+cRate(c),0)/cs.length):0;
 const nx=r.meets.filter(m=>!m.done&&!m.cancelled).sort((a,b)=>a.d.localeCompare(b.d))[0];
 return `<nav class="crumb rise"><span class="soft">Comunidade</span>${ic('chevR',13,2)}<button class="lnk back" data-a="rBack">Redes de casa</button>${ic('chevR',13,2)}<span>${esc(r.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid">${rTile(r,64)}<div class="pn"><h1>${esc(r.n)}</h1><p>Supervisor: ${esc(r.sup)} · ${cs.length} ${cs.length===1?'casa':'casas'} · ${ppl} pessoas</p></div></div>
  <div class="pact">${msgBtn('rede|'+r.n+'|'+ppl)}
   <div style="position:relative"><button class="ibtn" data-a="rMenu" data-v="${r.id}" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="rPop-${r.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="rEdit" data-v="${r.id}">${ic('pen',16)}Editar rede</button><hr><button class="pi danger" data-a="rDel" data-v="${r.id}">${ic('x',16)}Excluir rede</button></div></div></div>
  <div class="ikpi hk">
   <div><b>${cs.length}</b><span>Casas</span></div><div><b>${ppl}</b><span>Pessoas</span></div>
   <div><b>${cs.length?avg+'%':'—'}</b><span>Presença média das casas</span></div><div><b>${nx?fmtD(nx.d):'—'}</b><span>Próximo encontro do supervisor</span></div>
  </div>
  <div class="ptabs" role="tablist">${[['geral','Visão geral'],['casas','Casas'],['enc','Encontros'],['msg','Mensagens'],['hist','Histórico']].map(t=>`<button role="tab" class="${S.rtab===t[0]?'on':''}" data-a="rTab" data-v="${t[0]}">${t[1]}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${rTabBody(r)}</div>`;
}
function rTabBody(r){return ({geral:rGeral,casas:rCasasTab,enc:r=>seCanSee(r)?seEncounters('rede',r):'<section class="card mempty"><p>Sem acesso aos encontros desta rede.</p><span>Só o supervisor e quem tem Editar ou Admin na rede veem os encontros.</span></section>',msg:()=>msgTabHtml('rede'),hist:rHist})[S.rtab](r);}
function rGeral(r){
 const ct=rSupCt(r.sup),cs=rCasasOf(r),none='<span class="soft">Não informado</span>';
 return `<div class="pgrid"><div class="col"><section class="card pc"><div class="sh"><h2>Supervisor</h2></div>
  <div class="rsup" style="margin-bottom:14px">${pav(r.sup,r.tone,'')}<span><b>${esc(r.sup)}</b><small>Supervisor da rede</small></span></div>
  <dl class="kv grid2"><div><dt>Telefone</dt><dd>${ct[0]?esc(ct[0]):none}</dd></div><div><dt>E-mail</dt><dd>${ct[1]?esc(ct[1]):none}</dd></div></dl></section></div>
  <div class="col"><section class="card pc"><div class="sh"><h2>Dados da rede</h2></div>
  <dl class="kv grid2"><div><dt>Nome</dt><dd>${esc(r.n)}</dd></div><div><dt>Casas vinculadas</dt><dd>${cs.length}</dd></div><div><dt>Pessoas nas casas</dt><dd>${rPpl(r)}</dd></div><div><dt>Líderes de casa</dt><dd>${cs.length}</dd></div></dl></section></div></div>`;
}
function rCasasTab(r){
 const cs=rCasasOf(r);
 return `<section class="card pc"><div class="sh"><h2>Casas vinculadas</h2><button class="btn sec sm" data-a="rEdit" data-v="${r.id}">${ic('plus',14,2.2)}Vincular casas</button></div>
  ${cs.length?`<ul class="rcl">${cs.map(c=>`<li><button class="rcasa" data-a="rGoCasa" data-v="${c.id}">${hTile(c,30)}<span class="rct"><b>${esc(c.n)}</b><small>${esc(c.leader)} · ${c.ppl.length} pessoas</small></span><span class="rpc">${cRate(c)}%</span></button></li>`).join('')}</ul>`:`<div class="mempty"><p>Nenhuma casa vinculada.</p><span>Use "Vincular casas" para ligar casas a esta rede.</span></div>`}</section>`;
}
function rHist(r){
 const ev=[],MO=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
 r.meets.filter(m=>m.done&&!m.cancelled).forEach(m=>ev.push([m.d,'Encontro do supervisor realizado',m.topic||'Encontro com os líderes','por '+r.sup,'calendar','int','Encontro']));
 rCasasOf(r).forEach((c,i)=>ev.push([['2025-03-10','2025-06-02','2025-09-15'][i%3],'Casa vinculada à rede',c.n,'por Secretaria','home','brand','Casa']));
 ev.push(['2025-02-20','Supervisor definido',r.sup,'por Secretaria','userplus','seq','Supervisor']);
 ev.push(['2025-02-20','Rede criada',r.n,'por Secretaria','users','mute','Rede']);
 ev.sort((a,b)=>a[0]<b[0]?1:-1);
 return `<section class="card pc mh"><div class="sh"><h2>Histórico</h2><span class="who">${ev.length} registros · mais recentes primeiro</span></div>
  <ol class="mh-l">${ev.map((x,i)=>{const iso=x[0];return `<li class="mh-i ${i===0?'first':''}"><span class="mh-d"><b>${+iso.slice(8)}</b><small>${MO[+iso.slice(5,7)-1]} ${iso.slice(0,4)}</small></span><span class="mh-ic k-${x[5]}">${ic(x[4],15,2)}</span><div class="mh-b"><div class="mh-h"><b>${esc(x[1])}</b><span class="mh-k">${x[6]}</span></div><span class="mh-m">${esc(x[2])} · ${avN(x[3].replace(/^por /,''))}<span>${esc(x[3])}</span></span></div></li>`;}).join('')}</ol></section>`;
}
