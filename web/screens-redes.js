/* ================= Comunidade › Redes de célula ================= */
let _rid=0;
const RD=(n,sup,tone,casas)=>({id:'r'+(++_rid),n,sup,tone,casas,meets:[]});
const REDES=[RD('Rede Norte','Rodrigo Alves','ceu',['h1','h5']),RD('Rede Sul','Camila Duarte','damasco',['h2']),RD('Rede Leste/Oeste','Diego Martins','lima',['h3','h4'])];
const rById=id=>REDES.find(r=>r.id===id);
const casaRede=hid=>REDES.find(r=>r.casas.includes(hid));
function redesList(){
 const q=norm(S.rq||'');const loose=CASAS.filter(c=>!casaRede(c.id));
 const l=REDES.filter(r=>!q||norm(r.n+' '+r.sup+' '+r.casas.map(h=>hById(h)?.n||'').join(' ')).includes(q));
 return `<header class="ph rise"><div><p class="eb">Comunidade</p><h1>Redes de célula</h1><p class="lede">Hierarquia de supervisão: supervisor › líder › casa</p></div>
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
  <div class="rc1"><div><b>${esc(r.n)}</b><span>${cs.length} ${cs.length===1?'casa':'casas'} · ${ppl} pessoas${cs.length?` · presença ${avg}%`:''}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="rMenu" data-v="${r.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="rPop-${r.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="rEdit" data-v="${r.id}">${ic('pen',16)}Editar rede</button><hr><button class="pi danger" data-a="rDel" data-v="${r.id}">${ic('x',16)}Excluir rede</button></div></div></div>
  <div class="rtree">
   <div class="rsup"><span class="av" style="background:var(--tone-${r.tone});color:var(--tone-${r.tone}-ink)">${initials(r.sup)}</span><span><b>${esc(r.sup)}</b><small>Supervisor</small></span></div>
   ${cs.length?`<ul>${cs.map(c=>`<li><button class="rcasa" data-a="rGoCasa" data-v="${c.id}">${hTile(c,30)}<span class="rct"><b>${esc(c.n)}</b><small>${esc(c.leader)} · ${c.ppl.length} pessoas</small></span><span class="rpc">${cRate(c)}%</span></button></li>`).join('')}</ul>`:`<p class="who" style="margin:10px 0 0 44px">Nenhuma casa vinculada.</p>`}
  </div>
  <button class="btn sec sm" data-a="rEdit" data-v="${r.id}" style="align-self:flex-start">${ic('plus',14,2.2)}Vincular casas</button>
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

