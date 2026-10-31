/* ---------- Membros: situação dentro da tabela e paginação ---------- */
Object.assign(S,{mpg:1,mpp:10,dsF:'todos',dsT:'todos',dsQ:''});
{const _row=row;row=m=>{const h=_row(m),st=sxSitOf(m);if(!st||st==='ativo')return h;const both=stPill(m.st)+sxSitPill(st);return h.includes(both)?h.replace(both,'<span title="Integrado · situação atual: '+SX_SITS[st][0]+'">'+sxSitPill(st)+'</span>'):h;};}
{const _m=members;members=function(){let h=_m();
 h=h.replace(/<div class="sx-sitbar rise"[\s\S]*?<\/div><\/div>(?=<section class="card mtab)/,'');
 const cur=S.sxSit||'todas',lbl=cur==='todas'?'Todas as situações':SX_SITS[cur][0],c=k=>sxInteg().filter(m=>sxSitOf(m)===k).length;
 const dd='<div style="position:relative"><button class="btn sec sel" data-a="mSitMenu" aria-haspopup="menu">'+(cur!=='todas'?'<i class="msd" style="background:'+SX_SITS[cur][1]+'"></i>':'')+lbl+ic('updown',14)+'</button><div class="pop" id="mSitPop" role="menu" style="left:0;top:calc(100% + 6px)"><button class="pi" data-a="sxSitF" data-v="todas">Todas as situações'+(cur==='todas'?'<span class="ck">'+ic('check',16,2.25)+'</span>':'')+'</button><hr>'+Object.keys(SX_SITS).map(k=>'<button class="pi" data-a="sxSitF" data-v="'+k+'"><i class="msd" style="background:'+SX_SITS[k][1]+'"></i>'+SX_SITS[k][0]+'<small style="margin-left:6px;color:var(--ink-soft)">'+c(k)+'</small>'+(cur===k?'<span class="ck">'+ic('check',16,2.25)+'</span>':'')+'</button>').join('')+'</div></div>';
 return h.replace('<div class="chips" role="tablist" aria-label="Status">',dd+'<div class="chips" role="tablist" aria-label="Status">');};}
{const _r=rows;rows=function(){const all=sorted(filtered()),sig=[S.q,S.filter,S.month,S.sxSit,S.sort&&S.sort.k,S.sort&&S.sort.d].join('|');if(S.mSig!==sig){S.mSig=sig;S.mpg=1;}
 if(!all.length)return _r();
 const pp=S.mpp,pages=Math.max(1,Math.ceil(all.length/pp));S.mpg=Math.min(Math.max(1,S.mpg),pages);const st=(S.mpg-1)*pp,list=all.slice(st,st+pp);
 const th=(k,l)=>`<button class="th ${S.sort.k===k?'on':''}" data-a="sort" data-v="${k}">${l}${S.sort.k===k?`<span class="sd ${S.sort.d<0?'dn':''}">${ic('chevR',12,2.4)}</span>`:''}</button>`;
 const nums=[];for(let i=1;i<=pages;i++){if(i===1||i===pages||Math.abs(i-S.mpg)<=1)nums.push(i);else if(nums[nums.length-1]!=='…')nums.push('…');}
 const pager=pages>1?'<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="mPage" data-v="'+(S.mpg-1)+'" '+(S.mpg===1?'disabled':'')+' aria-label="Página anterior">'+ic('chevL',14,2)+'</button>'+nums.map(i=>i==='…'?'<span class="mpg-e">…</span>':'<button class="mpg-n '+(i===S.mpg?'on':'')+'" data-a="mPage" data-v="'+i+'" aria-current="'+(i===S.mpg?'page':'false')+'">'+i+'</button>').join('')+'<button class="ibtn sm" data-a="mPage" data-v="'+(S.mpg+1)+'" '+(S.mpg===pages?'disabled':'')+' aria-label="Próxima página">'+ic('chevR',14,2)+'</button></div>':'';
 return `<div class="trow thead" role="row">${th('n','Nome')}<span>E-mail</span><span>Telefone</span>${th('int','Integração')}<span>Ministério</span>${th('st','Status')}<span></span></div>
 <div class="mrows-b">${list.map(row).join('')}</div>
 <div class="tfoot"><span>${st+1}–${st+list.length} de ${all.length} ${all.length>1?'resultados':'resultado'}${S.filter!=='todos'||S.q||S.month!=='todas'||(S.sxSit&&S.sxSit!=='todas')?' · <button class="lnk" data-a="clearFilters">Limpar filtros</button>':''}</span>${pager}</div>`;};}
function mFit(){const box=$('#mrows');if(!box||S.active!=='membros'||S.member)return;const r=box.querySelector('.mrows-b .trow');if(!r)return;
 const top=box.getBoundingClientRect().top+window.scrollY,head=(box.querySelector('.thead')||{}).offsetHeight||0,foot=(box.querySelector('.tfoot')||{}).offsetHeight||52;
 const avail=window.innerHeight-Math.min(top,window.innerHeight*.55)-head-foot-28,pp=Math.max(5,Math.min(30,Math.floor(avail/r.offsetHeight)));
 if(pp!==S.mpp){const first=(S.mpg-1)*S.mpp;S.mpp=pp;S.mpg=Math.floor(first/pp)+1;box.innerHTML=rows();}}
{const base=render;render=function(){const x=base.apply(this,arguments);requestAnimationFrame(mFit);return x;};}
window.addEventListener('resize',()=>{clearTimeout(window._mfT);window._mfT=setTimeout(mFit,120);});
document.addEventListener('input',e=>{if(e.target.id==='mq')requestAnimationFrame(mFit);});
Object.assign(A,{
 mPage:v=>{S.mpg=+v;const b=$('#mrows');if(b){b.innerHTML=rows();b.closest('.mtab').scrollIntoView({block:'nearest',behavior:'smooth'});}},
 mSitMenu:()=>{const p=$('#mSitPop');closePops(p);p.classList.toggle('open');}});
{const base=A.clearFilters;A.clearFilters=function(){S.sxSit='todas';return base.apply(this,arguments);};}

/* ---------- Disciplina: tabela com busca e filtros ---------- */
if(!SX_DISC.some(x=>x.m==='Elisa Moura'))SX_DISC.push(
 {id:'ds4',m:'Elisa Moura',t:'afa',d:'2026-08-12',rev:'2026-11-12',resp:'Pr. Rafael Pereira',obs:'Afastamento combinado durante a mudança temporária de cidade.',st:'vigente',req:'Away',conf:'2026-08-12',h:[['2026-08-12','Registro criado']]},
 {id:'ds5',m:'Bruno Reis',t:'des',d:'2026-06-20',rev:'',resp:'Pr. Marcos Souza',obs:'Desligamento a pedido do próprio membro.',st:'encerrada',h:[['2026-06-20','Registro criado'],['2026-06-20','Encerrado']]});
discPage=function(){
 const vig=SX_DISC.filter(x=>x.st==='vigente'),q=norm(S.dsQ),stOf=x=>sxRevDue(x)?'vencida':x.st==='vigente'?'vigente':'encerrada';
 const base=SX_DISC.filter(x=>(S.dsT==='todos'||x.t===S.dsT)&&(!q||norm(x.m+' '+x.resp+' '+SX_DISC_T[x.t][0]).includes(q)));
 const l=base.filter(x=>S.dsF==='todos'||(S.dsF==='vigente'?x.st==='vigente':S.dsF==='vencida'?sxRevDue(x):x.st!=='vigente')).sort((a,b)=>(sxRevDue(b)-sxRevDue(a))||(a.d<b.d?1:-1));
 const cnt=k=>base.filter(x=>k==='todos'||(k==='vigente'?x.st==='vigente':k==='vencida'?sxRevDue(x):x.st!=='vigente')).length;
 const chips=[['todos','Todos',''],['vigente','Em vigor','var(--st-int)'],['vencida','Revisão vencida','var(--st-rec)'],['encerrada','Encerrados','var(--ink-soft)']];
 const tdd='<div style="position:relative"><button class="btn sec sel" data-a="dsTMenu" aria-haspopup="menu">'+(S.dsT==='todos'?'Todos os tipos':SX_DISC_T[S.dsT][0])+ic('updown',14)+'</button><div class="pop" id="dsTPop" role="menu" style="left:0;top:calc(100% + 6px)"><button class="pi" data-a="dsT" data-v="todos">Todos os tipos'+(S.dsT==='todos'?'<span class="ck">'+ic('check',16,2.25)+'</span>':'')+'</button><hr>'+Object.keys(SX_DISC_T).map(k=>'<button class="pi" data-a="dsT" data-v="'+k+'"><i class="msd" style="background:'+SX_DISC_T[k][1]+'"></i>'+SX_DISC_T[k][0]+'<small style="margin-left:6px;color:var(--ink-soft)">'+SX_DISC.filter(x=>x.t===k).length+'</small>'+(S.dsT===k?'<span class="ck">'+ic('check',16,2.25)+'</span>':'')+'</button>').join('')+'</div></div>';
 const filt=S.dsF!=='todos'||S.dsT!=='todos'||S.dsQ;
 return sxHead('Cuidado','Disciplina','Registro pastoral de admoestações, afastamentos e desligamentos. Acesso super restrito.',`<button class="btn pri" data-a="sxDiNew">${ic('plus',15,2.2)}Novo registro</button>`)
 +`<div class="sx-lock rise" style="--d:1">${ic('lock',20,2)}<span><b>Área restrita</b> · só o Administrador e quem a igreja autorizar para a Disciplina. Cada consulta e cada alteração vai para a auditoria. Estes registros <b>não aparecem</b> em buscas, listas, exportações, no app nem em avisos, e nunca são mostrados ao próprio membro.</span></div>`
 +sxKpis([['Em vigor',vig.length,'registros abertos'],['Revisão vencida',vig.filter(sxRevDue).length,'pedem uma conversa',vig.some(sxRevDue)?'var(--st-rec)':''],['Encerrados',SX_DISC.length-vig.length,'no histórico']])
 +`<section class="card mtab rise" style="--d:3" aria-label="Registros de disciplina"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="dsq" placeholder="Pesquisar pessoa ou responsável" value="${esc(S.dsQ)}" autocomplete="off"></label>${tdd}
  <div class="chips" role="tablist" aria-label="Situação">${chips.map(c=>`<button role="tab" class="chipf ${S.dsF===c[0]?'on':''}" data-a="sxDiF" data-v="${c[0]}" aria-selected="${S.dsF===c[0]}">${c[2]?`<i style="background:${c[2]}"></i>`:''}${c[1]}<small>${cnt(c[0])}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="dsr thead"><span>Pessoa</span><span>Tipo</span><span>Desde</span><span>Responsável</span><span>Revisão</span><span>Situação</span><span></span></div>`+l.map(x=>{const m=sxMem(x.m),k=stOf(x);return `<div class="dsr ${k}" role="row" tabindex="0" data-a="sxDiOpen" data-v="${x.id}"><span class="ds-p">${m?mav(m):sxAv(x.m)}<b>${esc(x.m)}</b></span><span class="ds-t">${sxPill(SX_DISC_T[x.t][0],SX_DISC_T[x.t][1],SX_DISC_T[x.t][2])}</span><span class="ds-d">${dBR(x.d)}</span><span class="ds-r">${esc(x.resp)}</span><span class="ds-v">${x.rev?dBR(x.rev):'<span class="soft">—</span>'}</span><span class="ds-s">${x.st==='vigente'&&x.req&&!x.conf?'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Aguardando a Secretaria</span>':k==='vencida'?'<span class="stp" style="--c:var(--st-rec);--b:var(--st-rec-bg)"><i></i>Revisão vencida</span>':k==='vigente'?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Em vigor</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Encerrado</span>'}</span><span class="ds-c">${ic('chevR',16)}</span></div>`;}).join('')
   +`<div class="tfoot"><span>${l.length} ${l.length>1?'registros':'registro'}${filt?' · <button class="lnk" data-a="dsClear">Limpar filtros</button>':''}</span></div>`
  :`<div class="mempty"><p>Nenhum registro.</p><span>${filt?'Nada corresponde a esses filtros.':'Os registros aparecem aqui.'}</span>${filt?'<button class="lnk" data-a="dsClear">Limpar filtros</button>':''}</div>`}</section>`;};
Object.assign(A,{
 sxDiF:v=>{S.dsF=v;render();},
 dsT:v=>{S.dsT=v;closePops();render();},
 dsTMenu:()=>{const p=$('#dsTPop');closePops(p);p.classList.toggle('open');},
 dsClear:()=>{S.dsF='todos';S.dsT='todos';S.dsQ='';render();}});
document.addEventListener('input',e=>{if(e.target.id!=='dsq')return;S.dsQ=e.target.value;const pos=e.target.selectionStart;render();const i=$('#dsq');if(i){i.focus();i.setSelectionRange(pos,pos);}});

/* ---------- Relatórios: filtros no padrão das tabelas ---------- */
rpPage=function(key){
 const D=RP[key],T=rpTabOf(key),st=rpState(key,T.k),base=rpBase(D,T),items=rpChipItems(T,T.rows());
 const dd=f=>{const v=String(rpFv(st,f)),o=f.opts().find(x=>String(x[0])===v),on=v!=='todos'&&v!=='';
  return '<div style="position:relative"><button class="btn sec sel '+(on?'on':'')+'" data-a="rpsMenu" data-v="'+f.k+'" aria-haspopup="menu">'+esc(f.l)+(on&&o?': <b>'+esc(o[1])+'</b>':': todos')+ic('updown',14)+'</button>'
  +'<div class="pop" id="rpsPop-'+f.k+'" role="menu" style="left:0;top:calc(100% + 6px);max-height:300px;overflow:auto"><button class="pi" data-a="rpsPick" data-v="'+f.k+'|todos">'+esc(f.l)+': todos'+(!on?'<span class="ck">'+ic('check',16,2.25)+'</span>':'')+'</button><hr>'
  +f.opts().map(x=>'<button class="pi" data-a="rpsPick" data-v="'+f.k+'|'+esc(x[0])+'">'+esc(x[1])+(String(x[0])===v?'<span class="ck">'+ic('check',16,2.25)+'</span>':'')+'</button>').join('')+'</div></div>';};
 return sxHead('Relatórios',D.l,D.lede,`<button class="btn sec" data-a="rptCols">${ic('sliders',15)}Colunas</button><button class="btn sec" data-a="rptPdf">${ic('file',15)}Gerar PDF</button><button class="btn pri" data-a="rptCsv">${ic('download',15)}Exportar CSV</button>`)
 +(D.tabs.length>1?sxSeg('rptTab',D.tabs.map(t=>[t.k,t.l]),T.k):'')
 +`<div class="sx-note rise" style="--d:2;--c:var(--brand-text)">${ic('shield',17,2)}<span>${key==='multi'?'<b>Escopo: toda a organização.</b> <small>Vê, filtra e exporta as igrejas e regionais a que a pessoa tem acesso, não só a igreja ativa. ':'<b>Escopo: toda a igreja.</b> <small>Quem tem acesso só a uma Casa ou a um ministério vê, filtra e exporta só o que é dele. '}${esc(T.note||'Exportar PDF e CSV exige Editar ou Administrar neste módulo.')}</small></span></div>`
 +`<section class="card mtab rpt rise" style="--d:3" aria-label="${esc(D.l)}"><div class="tbar"><label class="sbox">${ic('search',16)}<input data-rpq placeholder="Buscar nos campos mostrados" value="${esc(st.q||'')}" autocomplete="off"></label>${(T.fl||[]).map(dd).join('')}
   ${T.chip?`<div class="chips" role="tablist" aria-label="${esc(T.chip.l||'Situação')}">${[['todos','Todos',null,null],...items].map(it=>`<button role="tab" class="chipf ${st.chip===it[0]?'on':''}" data-a="rptChip" data-v="${it[0]}" aria-selected="${st.chip===it[0]}">${it[0]!=='todos'?`<i style="background:${it[2]}"></i>`:''}${esc(it[1])}<small>${it[0]==='todos'?base.length:base.filter(r=>T.chip.by(r)===it[0]).length}</small></button>`).join('')}</div>`:''}</div>
  <div id="rpBody">${rpBody(D,T)}</div></section>`;};
Object.assign(A,{
 rpsMenu:v=>{const p=$('#rpsPop-'+v);closePops(p);p.classList.toggle('open');},
 rpsPick:v=>{const i=v.indexOf('|'),k=v.slice(0,i),val=v.slice(i+1);const {D,T}=rpAct();rpState(D.key,T.k).f[k]=val;closePops();render();}});

/* ---------- Relatórios: aniversariantes mais completos ---------- */
{const tb=(RP.membros&&RP.membros.tabs||[]).find(t=>t.k==='aniv');if(tb){
 const nx=r=>{const t=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate());let d=new Date(t.getFullYear(),+r.nasc.slice(5,7)-1,+r.nasc.slice(8));if(d<t)d=new Date(t.getFullYear()+1,d.getMonth(),d.getDate());return {d,n:Math.round((d-t)/864e5)};};
 const casaOf=r=>{const c=CASAS.find(c=>c.ppl.some(p=>p.n===r.n));return c?c.n:'—';};
 const WDS=['dom','seg','ter','qua','qui','sex','sáb'];
 tb.sort={k:'dia',d:1};
 tb.fl=[{k:'mes',l:'Período',def:()=>'prox',opts:()=>[['prox','Próximos 30 dias'],...rpMonths()],ok:(r,v)=>v==='prox'?nx(r).n<=30:+r.nasc.slice(5,7)===+v}];
 tb.cols=[
  rpCol('n','Nome',r=>r.n,{pill:r=>'<span class="rp-nm">'+mav(r)+'<b>'+esc(r.n)+'</b></span>'}),
  rpCol('dia','Aniversário',r=>r.nasc.slice(8)+'/'+r.nasc.slice(5,7),{raw:r=>nx(r).n,pill:r=>{const x=nx(r);return '<span class="rp-dt"><b>'+r.nasc.slice(8)+'/'+r.nasc.slice(5,7)+'</b><small>'+WDS[x.d.getDay()]+'</small>'+(x.n===0?'<em class="hoje">hoje</em>':x.n<=7?'<em>em '+x.n+' dia'+(x.n>1?'s':'')+'</em>':'')+'</span>';}}),
  rpCol('idade','Completa',r=>(nx(r).d.getFullYear()-+r.nasc.slice(0,4))+' anos',{raw:r=>nx(r).d.getFullYear()-+r.nasc.slice(0,4)}),
  rpCol('min','Ministérios',r=>r.min.join(', ')||'—'),
  rpCol('sit','Situação',r=>SX_SITS[sxSitOf(r)][0],{pill:r=>sxSitPill(sxSitOf(r))}),
  rpCol('ph','Telefone',r=>r.ph||'—',{s:1,off:true})];}}
/* ---------- Relatórios: colunas proporcionais e paginação de 50 linhas ---------- */
S.rpPP=50;
rpBody=function(D,T){
 const rows=rpFinal(D,T),cols=rpCols(D,T),st=rpState(D.key,T.k),total=T.rows().length,so=st.sort||T.sort;
 const sig=[D.key,T.k,st.q,st.chip,JSON.stringify(st.f),so&&so.k,so&&so.d].join('|');if(st.sig!==sig){st.sig=sig;st.pg=1;}
 const pp=S.rpPP,pages=Math.max(1,Math.ceil(rows.length/pp));st.pg=Math.min(Math.max(1,st.pg||1),pages);const ofs=(st.pg-1)*pp,show=rows.slice(ofs,ofs+pp);
 const w=c=>c===cols[0]?'minmax(200px,1.5fr)':c.n?'minmax(84px,.45fr)':'minmax(120px,1fr)';
 const grid='grid-template-columns:'+cols.map(w).join(' ')+';min-width:'+Math.max(560,cols.length*140)+'px';
 const nums=[];for(let i=1;i<=pages;i++){if(i===1||i===pages||Math.abs(i-st.pg)<=1)nums.push(i);else if(nums[nums.length-1]!=='…')nums.push('…');}
 const pager=pages>1?'<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="rpPage" data-v="'+(st.pg-1)+'" '+(st.pg===1?'disabled':'')+' aria-label="Página anterior">'+ic('chevL',14,2)+'</button>'+nums.map(i=>i==='…'?'<span class="mpg-e">…</span>':'<button class="mpg-n '+(i===st.pg?'on':'')+'" data-a="rpPage" data-v="'+i+'">'+i+'</button>').join('')+'<button class="ibtn sm" data-a="rpPage" data-v="'+(st.pg+1)+'" '+(st.pg===pages?'disabled':'')+' aria-label="Próxima página">'+ic('chevR',14,2)+'</button></div>':'';
 return `<p class="rp-sum"><b>${rows.length}</b> de ${total} ${total===1?'registro':'registros'} · ${cols.length} ${cols.length===1?'coluna':'colunas'} <span>${esc(rpFilterText(D,T))}</span></p>
  ${rows.length?`<div class="rp-tw"><div class="rp-r head" style="${grid}">${cols.map(c=>`<button class="rp-th ${so&&so.k===c.k?'on':''} ${c.n?'num':''}" data-a="rptSort" data-v="${c.k}">${esc(c.l)}${so&&so.k===c.k?`<span class="sd ${so.d<0?'dn':''}">${ic('chevR',11,2.4)}</span>`:''}</button>`).join('')}</div>
   <div class="rp-rows">${show.map(r=>`<div class="rp-r" style="${grid}">${cols.map(c=>`<span class="${c.n?'num':''}" title="${esc(String(c.v(r)))}">${c.pill?c.pill(r):esc(String(c.v(r)))}</span>`).join('')}</div>`).join('')}</div></div>
   <div class="tfoot"><span>${ofs+1}–${ofs+show.length} de ${rows.length} · o arquivo exportado leva todos</span>${pager}</div>`
  :`<div class="mempty"><p>Nada por aqui.</p><span>Nenhum registro com esses filtros. <button class="lnk" data-a="rptClear">Limpar filtros</button></span></div>`}`;};
Object.assign(A,{rpPage:v=>{const {D,T}=rpAct();rpState(D.key,T.k).pg=+v;const b=$('#rpBody');if(b){b.innerHTML=rpBody(D,T);b.closest('.card').scrollIntoView({block:'nearest',behavior:'smooth'});}}});

/* ---------- Secretaria: Registrar ato ---------- */
sxAtoNew=function(){
 /* formulário manual: para um ato feito aqui sem evento na Agenda, ou informado de outra igreja. Os atos de eventos aparecem sozinhos em Atos. */
 const people=sxInteg().filter(m=>!SX_BLOCK.includes(sxSitOf(m))),sel=new Set(),ext=[];
 const OFF=[...new Set(['Pr. Marcos Souza','Pr. Rafael Pereira',...SX_ATOS.map(x=>x.of).filter(Boolean)])];
 const TYPES=[['batismo','Batismo','Nas águas, com uma ou mais pessoas'],['casamento','Casamento','Duas pessoas, com ou sem ficha'],['consagracao','Consagração','De obreiros e líderes'],['apresentacao','Apresentação','De um bebê ao Senhor']];
 openDlg(dlgHead('Registrar ato','Para um ato feito aqui sem evento na Agenda, ou informado de outra igreja. O que acontece num evento da Agenda já aparece aqui sozinho.')
  +`<form id="sxF" class="atf" novalidate><div class="atf-l">
   <div class="fld"><span class="fl">Tipo de ato</span><div class="atf-ty" role="radiogroup">${TYPES.map((t,i)=>`<label><input type="radio" name="t" value="${t[0]}" ${i===0?'checked':''}><span class="atf-ti">${ic(SX_ATO_T[t[0]][1],18,1.9)}</span><span><b>${t[1]}</b><small>${t[2]}</small></span></label>`).join('')}</div></div>
   <div class="fld"><span class="fl">Onde aconteceu</span><div class="yn" role="radiogroup"><label><input type="radio" name="inf" value="" checked><span>${ic('church',15)}&nbsp;Nesta igreja</span></label><label><input type="radio" name="inf" value="1"><span>${ic('swap',15)}&nbsp;Em outra igreja</span></label></div><span class="hint" id="atInfH">Celebrado aqui. Alimenta a ficha e permite emitir certidão.</span></div>
   <div class="fgrid" style="grid-template-columns:1fr 1fr;gap:12px">${sxF('Data',`<input type="date" name="d" value="${SX_TODAY}" max="${SX_TODAY}">`)}${sxF('Local','<input name="loc" placeholder="Ex.: Chácara Alva" autocomplete="off">')}</div>
   ${sxF('Quem oficiou','<input name="of" list="atOff" placeholder="Ex.: Pr. Marcos Souza" autocomplete="off"><datalist id="atOff">'+OFF.map(o=>'<option value="'+esc(o)+'">').join('')+'</datalist>')}
   ${sxF('Observação <small>opcional</small>','<textarea class="ta" name="obs" rows="2" maxlength="300" placeholder="Ex.: Batismo nas águas, domingo à tarde."></textarea>')}
   <div id="atDec" hidden><div class="fld"><span class="fl">Reconhecer este ato?</span><div class="yn" role="radiogroup"><label><input type="radio" name="dec" value="aceito" checked><span>${ic('check',15)}&nbsp;Aceitar</span></label><label><input type="radio" name="dec" value="recusado"><span>${ic('x',15)}&nbsp;Recusar</span></label></div><span class="hint">Fica decidido já ao registrar. Não muda o que a pessoa declarou na ficha, só o reconhecimento desta igreja.</span></div><div id="atCgW" hidden>${sxF('Cargo da consagração',sxSel('cg',['Diácono(a)','Presbítero(a)','Evangelista','Missionário(a)','Pastor(a)','Outro'],'Diácono(a)'))}<div id="atCgO" hidden>${sxF('Qual cargo?','<input name="cgo" placeholder="Ex.: Missionário(a)" autocomplete="off">')}</div></div></div>
  </div><div class="atf-r">
   <div id="atBB" hidden><div class="fgrid" style="grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">${sxF('Nome do bebê','<input name="bn" autocomplete="off">')}${sxF('Nascimento',`<input type="date" name="nasc" max="${SX_TODAY}">`)}</div></div>
   <div class="fld" id="atPF"><span class="fl"><span id="atPL">Pessoas</span> <em id="atN"></em></span>
    <div class="atf-sel" id="atSel"></div>
    <label class="sbox">${ic('search',15)}<input type="search" id="atQ" placeholder="Buscar membro" autocomplete="off"></label>
    <div class="atf-list" id="atList">${people.map(m=>`<label class="atf-p" data-n="${esc(norm(m.n))}"><input type="checkbox" name="p" value="${m.id}">${sxAv(m.n)}<span><b>${esc(m.n)}</b><small>${m.bap?'Já batizado(a)':'Membro'}</small></span><i class="cb">${ic('check',12,2.8)}</i></label>`).join('')}<p class="atf-none" hidden>Ninguém com esse nome.</p></div>
    <div class="atf-ext"><input id="atExt" placeholder="Pessoa sem ficha na igreja" autocomplete="off"><button type="button" class="btn sec sm" id="atExtB">${ic('plus',14,2.2)}Adicionar</button></div>
    <span class="hint" id="atPH">Marque os membros. Quem não tem ficha (como o cônjuge de fora) entra pelo campo acima.</span><span class="err" id="atPE"></span></div>
  </div>
  <div class="dfoot"><span class="atf-st" id="atSt"></span><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Registrar ato</button></div></form>`,'sc-dlg atd');
 const f=$('#sxF'),q=$('#atQ');
 const paint=()=>{const t=f.querySelector('[name=t]:checked').value,inf=f.querySelector('[name=inf]:checked').value==='1',d=f.d.value,fut=!inf&&d>SX_TODAY,stt=inf?['Informado','var(--st-ace)','var(--st-ace-bg)']:fut?['Data futura: crie o evento na Agenda','var(--st-rec)','var(--st-rec-bg)']:['Realizado','var(--st-int)','var(--st-int-bg)'],ap=t==='apresentacao';
  const names=[...[...sel].map(i=>({k:'m'+i,n:byId(i).n})),...ext.map((n,i)=>({k:'e'+i,n,ext:1}))];
  $('#atBB').hidden=!ap;{const dc=inf&&!ap,ac=f.querySelector('[name=dec]:checked').value==='aceito';$('#atDec').hidden=!dc;$('#atCgW').hidden=!(dc&&ac&&t==='consagracao');$('#atCgO').hidden=f.cg.value!=='Outro';}$('#atPL').textContent=ap?'Responsáveis':'Pessoas';
  $('#atSel').innerHTML=names.length?names.map(x=>`<span class="atf-c">${sxAv(x.n)}${esc(x.n)}${x.ext?'<small>sem ficha</small>':''}<button type="button" data-rm="${x.k}" aria-label="Tirar ${esc(x.n)}">${ic('x',11,2.4)}</button></span>`).join(''):'<span class="atf-c0">Ninguém selecionado ainda</span>';
  $('#atN').textContent=names.length?names.length+(t==='casamento'?' de 2':''):'';
  $('#atPH').textContent=t==='casamento'?'Casamento tem exatamente duas pessoas. Se um dos noivos não tem ficha, adicione pelo nome.':t==='consagracao'?'Marque quem foi consagrado.':ap?'Marque os responsáveis do bebê. Quem não tem ficha entra pelo campo acima.':'Marque quem foi batizado. Pessoas sem ficha entram pelo campo acima.';
  $('#atInfH').textContent=inf?'Só informa um ato feito fora, para constar na ficha. Não emite certidão nem certificado. Use uma data passada.':'Celebrado aqui. Alimenta a ficha e permite emitir certidão.';
  $('#atSt').innerHTML=(inf?'Será registrado como ':fut?'':'Será registrado como ')+'<span class="stp" style="--c:'+stt[1]+';--b:'+stt[2]+'"><i></i>'+stt[0]+'</span>';
  $('#atPF').classList.remove('bad');$('#atPE').textContent='';};
 f.addEventListener('change',e=>{if(e.target.name==='p'){e.target.checked?sel.add(e.target.value):sel.delete(e.target.value);}paint();});
 f.addEventListener('input',e=>{if(e.target.name==='d')paint();e.target.closest('.fld')?.classList.remove('bad');});
 q.addEventListener('input',()=>{const v=norm(q.value);let n=0;$$('#atList .atf-p').forEach(l=>{const h=!!v&&!l.dataset.n.includes(v);l.hidden=h;if(!h)n++;});$('#atList .atf-none').hidden=n>0;});
 const addExt=()=>{const i=$('#atExt'),v=i.value.trim();if(!v)return;ext.push(v);i.value='';paint();i.focus();};
 $('#atExtB').onclick=addExt;$('#atExt').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addExt();}});
 $('#atSel').addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(!b)return;const k=b.dataset.rm;if(k[0]==='m'){sel.delete(k.slice(1));const c=f.querySelector('input[name=p][value="'+k.slice(1)+'"]');if(c)c.checked=false;}else ext.splice(+k.slice(1),1);paint();});
 paint();
 const pErr=m=>{$('#atPF').classList.add('bad');$('#atPE').textContent=m;return false;};
 f.onsubmit=e=>{e.preventDefault();sxClr(f);
  const ids=[...sel],t=f.querySelector('[name=t]:checked').value,inf=f.querySelector('[name=inf]:checked').value==='1';
  if(!f.d.value)return sxErr(f,'d','Informe a data');
  if(inf&&f.d.value>SX_TODAY)return sxErr(f,'d','Ato informado já aconteceu: use uma data passada');
  if(!inf&&f.d.value>SX_TODAY)return sxErr(f,'d','Para um ato que ainda vai acontecer, crie o evento em Agenda › Eventos');
  const ppl=[...ids.map(i=>byId(i).n),...ext];
  const st=inf?'informado':'realizado',base={id:'at'+Date.now(),t,st,d:f.d.value,loc:inf?(f.loc.value.trim()||'Outra igreja (informado)'):f.loc.value.trim(),of:f.of.value.trim(),obs:f.obs.value.trim()};
  let a;
  if(t==='apresentacao'){const bn=f.bn.value.trim();if(!bn)return sxErr(f,'bn','Informe o nome do bebê');if(!f.nasc.value)return sxErr(f,'nasc','Informe o nascimento');if(!ppl.length)return pErr('Escolha ao menos um responsável');
   a=Object.assign(base,{ppl:[bn],pais:ppl,nasc:f.nasc.value,obs:base.obs||'Responsáveis: '+ppl.join(' e ')});}
  else{if(!ppl.length)return pErr('Escolha ao menos uma pessoa');if(t==='casamento'&&ppl.length!==2)return pErr('Casamento tem duas pessoas (com ficha ou sem)');a=Object.assign(base,{ppl});}
  if(inf&&t!=='apresentacao'){const dec=f.querySelector('[name=dec]:checked').value;let role='';
   if(t==='consagracao'&&dec==='aceito'){role=f.cg.value==='Outro'?f.cgo.value.trim():f.cg.value;if(!role)return sxErr(f,'cgo','Informe o cargo');a.cargo=role;}
   a.dec=dec;a.decBy=sxMe;a.decAt=SX_TODAY;ids.forEach(i=>{const m=byId(i);m[SX_DEC[t][0]]=dec==='aceito';if(t==='consagracao'&&dec==='aceito')m.consRole=role;});}
  SX_ATOS.unshift(a);if(t==='batismo'&&st==='realizado')ids.forEach(i=>{byId(i).bap=true;});
  sxLog('Registrou','Ato',SX_ATO_T[t][0]+' · '+a.ppl.length+' '+(a.ppl.length>1?'pessoas':'pessoa')+(inf?(a.dec==='recusado'?' (informado, recusado)':' (informado)'):''),dBR(a.d));
  closeDlg();render();toast(SX_ATO_T[t][0]+(inf?(a.dec==='recusado'?' informado e recusado':a.dec==='aceito'?' informado e aceito':' informado registrado'):' registrado'));};};
Object.assign(A,{sxAtoNew:()=>sxAtoNew()});

/* ---------- Integração: fila de espera ---------- */
{const EM=['mariana.teixeira@gmail.com','gustavo.lopes@outlook.com','paulamenezes@gmail.com','rogerio.alves@hotmail.com','tati.duarte@gmail.com'],OR=[['app','App Alva'],['vem','Visitou um culto'],['app','App Alva'],['casa','Indicado por uma casa'],['site','Site da igreja']];IGFILA.forEach((p,i)=>{p.em=p.em||EM[i]||norm(p.n).replace(/\s+/g,'.')+'@gmail.com';p.or=p.or||OR[i%OR.length][1];});}
igFila=function(){
 const cur=INTEGS.find(g=>g.current),free=igFree(),n=Math.min(IGFILA.length,free===Infinity?IGFILA.length:free),lim=cur&&cur.limit?+cur.limit:0,used=cur?cur.ppl.length:0;
 const ago=d=>{const k=Math.round((new Date(TODAY.toISOString().slice(0,10)+'T12:00')-new Date(d+'T12:00'))/864e5);return k<=0?'hoje':k===1?'há 1 dia':'há '+k+' dias';};
 const cap=!cur?'<div class="igq-cap off"><span class="igq-ci">'+ic('calendar',18,1.9)+'</span><div><b>Nenhuma integração aberta</b><span>Crie uma integração para chamar a fila.</span></div></div>'
  :'<div class="igq-cap '+(free>0?'':'full')+'"><span class="igq-ci">'+ic('users',18,1.9)+'</span><div><b>'+esc(cur.n)+'</b><span>'+(free===Infinity?'Sem limite de vagas':free>0?free+' '+(free===1?'vaga livre':'vagas livres')+' de '+lim:'Lotada · '+used+' de '+lim+' vagas')+'</span>'+(lim?'<span class="igq-bar"><i style="width:'+Math.min(100,Math.round(used/lim*100))+'%"></i></span>':'')+'</div></div>';
 return `<section class="card igq rise" style="--d:2" aria-label="Fila de espera">
  <div class="igq-top">${cap}<div class="igq-k"><b>${IGFILA.length}</b><span>${IGFILA.length===1?'pessoa na fila':'pessoas na fila'}</span></div>${n>0?`<button class="btn pri" data-a="igCallN">${ic('userplus',15)}Chamar ${n===IGFILA.length&&n>1?'todos os '+n:n===1?'o próximo':'os próximos '+n}</button>`:''}</div>
  <p class="igq-note">${ic('info',14,2)}<span>A fila é da igreja, não de uma integração. Entra quem pede com a integração lotada, fora da janela de pedidos ou sem integração aberta, por ordem de chegada. Chamar aceita a pessoa na integração atual e avisa no app${INTR.aceite==='auto'?'; com o aceite automático, a fila é chamada sozinha quando uma integração abre':''}.</span></p>
  ${IGFILA.length?`<div class="igq-r igq-h"><span>#</span><span>Pessoa</span><span>Telefone</span><span>E-mail</span><span>Motivo</span><span>Na fila</span><span></span></div>`+IGFILA.map((p,i)=>`<div class="igq-r ${i<n&&n<IGFILA.length?'next':''}"><span class="igq-pos">${i+1}º</span><span class="igq-p">${avN(p.n)}<span><b>${esc(p.n)}</b><small>${esc(p.or||'Pediu pelo app')}</small></span>${i<n&&n<IGFILA.length?'<em>próxima vaga</em>':''}</span><span class="igq-ct"><a href="tel:${esc(p.ph.replace(/\D/g,''))}" onclick="event.preventDefault()">${esc(p.ph)}</a></span><span class="igq-ct"><a href="mailto:${esc(p.em||'')}" onclick="event.preventDefault()">${esc(p.em||'—')}</a></span><span class="igq-w">${sxPill(IGWHY[p.why][0],IGWHY[p.why][1],IGWHY[p.why][2])}</span><span class="igq-d"><b>${ago(p.since)}</b><small>desde ${dBR(p.since)}</small></span><span class="igq-a"><button class="btn sec sm" data-a="igCall" data-v="${p.id}" ${free>0?'':'disabled'} title="${free>0?'Aceitar em '+esc(cur.n):'Sem vaga na integração atual'}">${ic('userplus',14)}Chamar</button><button class="ibtn sm" data-a="igRm" data-v="${p.id}" aria-label="Remover da fila" title="Remover da fila">${ic('x',14)}</button></span></div>`).join('')
   :`<div class="mempty"><p>Ninguém na fila.</p><span>Quando uma integração lotar ou não houver uma aberta, quem pedir entra aqui.</span></div>`}</section>`;};

/* ---------- Salas: Uso fixo ---------- */
slUso=function(s){const ed=S.uEd,fl=S.ufF||'vig',isEnd=u=>u.to&&u.to<NOWD,cnt=k=>s.uso.filter(u=>k==='todos'||(k==='venc'?isEnd(u):!isEnd(u))).length,
 list=s.uso.slice().filter(u=>fl==='todos'||(fl==='venc'?isEnd(u):!isEnd(u))).sort((a,b)=>(ruleNext(a,1)[0]||'9')<(ruleNext(b,1)[0]||'9')?-1:1);
 const nx=s.uso.filter(u=>!isEnd(u)).map(u=>[ruleNext(u,1)[0],u]).filter(x=>x[0]).sort((a,b)=>a[0]<b[0]?-1:1)[0];
 return `<div class="uf-wrap">
  ${ed?'':`<section class="card ufh"><div class="ufh-t"><span class="ufh-i">${ic('clock',18,1.9)}</span><div class="ufh-x"><b>Horários fixos da sala</b><span>Bloqueiam a reserva nesses horários, como cultos e encontros recorrentes. Cada um vale dentro da própria vigência.</span></div>${s.uso.length?`<button class="btn pri" data-a="ufNew">${ic('plus',15,2.2)}Adicionar uso fixo</button>`:''}</div>
   ${s.uso.length?`<div class="ufh-b"><div class="chips" role="tablist" aria-label="Vigência">${[['vig','Vigentes','var(--st-int)'],['venc','Vencidos','var(--ink-soft)'],['todos','Todos','']].map(c=>`<button role="tab" class="chipf ${fl===c[0]?'on':''}" data-a="ufF" data-v="${c[0]}" aria-selected="${fl===c[0]}">${c[2]?`<i style="background:${c[2]}"></i>`:''}${c[1]}<small>${cnt(c[0])}</small></button>`).join('')}</div>${nx?`<span class="ufh-nx">${ic('calendar',13,2)}Próximo bloqueio: <b>${esc(nx[1].l)}</b> · ${dNx(nx[0])}</span>`:''}</div>`:''}</section>`}
  ${ed==='new'?ufForm():''}
  ${list.length?list.map(u=>ed===u.id?ufForm(u):ufCard(u)).join(''):ed?'':s.uso.length?`<section class="card pc"><div class="soft-empty"><p>Nada por aqui.</p><span class="who">Nenhum uso fixo ${fl==='venc'?'vencido':'vigente'}.</span></div></section>`:`<section class="card pc"><div class="soft-empty"><p>Nenhum uso fixo.</p><span class="who">A sala fica livre para reserva em qualquer horário.</span><button class="btn pri" data-a="ufNew">${ic('plus',15,2.2)}Adicionar uso fixo</button></div></section>`}
 </div>`;};

/* ---------- Dashboard: cards de atenção com o mesmo esqueleto ---------- */
const ACT_WAIT=[3,2,1],ACT_ROLE=['Louvor · vocal','Recepção','Kids · monitor','Mídia · câmera'];
const actRow=(lead,t,sub,cls)=>`<div class="ar">${lead}<span class="ar-t"><b>${t}</b><small class="${cls||''}">${sub}</small></span></div>`;
const actMore=(n,act,v,l)=>n>0?`<button class="ar-more" data-a="${act}" data-v="${v||''}">+ ${n} ${l}</button>`:'';
actCards=function(){
 const [t1,t2]=TASKS;
 return `<div class="acts acts2" id="acts">
  <article class="card act ${t1.done?'gone':''}" id="t1" style="${t1.done?'display:none':''}">
   <div class="top"><span class="tg" style="background:var(--warm)"></span>Acolhimento<button class="x" data-a="done" data-v="t1" aria-label="Marcar como resolvido" title="Marcar como resolvido">${ic('check',16,2.25)}</button></div>
   <div class="hero"><span class="n">${WAITING.length}</span><span class="u">pessoas esperando o primeiro contato</span></div>
   <div class="act-m warm">${ic('clock',13,2)}A mais antiga há ${ACT_WAIT[0]} dias</div>
   <div class="act-box">${WAITING.slice(0,3).map((p,i)=>actRow(av(p),esc(p.n),'Esperando há '+ACT_WAIT[i]+' dia'+(ACT_WAIT[i]>1?'s':''),ACT_WAIT[i]>=3?'warm':'')).join('')}</div>
   <div class="foot"><button class="btn pri" data-a="goTask" data-v="t1">Acolher agora</button><button class="lnk" data-a="nav" data-v="integracao">Ver integração</button></div>
  </article>
  <article class="card act ${t2.done?'gone':''}" id="t2" style="${t2.done?'display:none':''}">
   <div class="top"><span class="tg" style="background:var(--seq3)"></span>Escalas<button class="x" data-a="done" data-v="t2" aria-label="Marcar como resolvido" title="Marcar como resolvido">${ic('check',16,2.25)}</button></div>
   <div class="hero"><span class="n">${PENDING.length}</span><span class="u">sem resposta para o culto de domingo</span></div>
   <div class="act-m"><span class="act-bar"><i style="width:${Math.round(12/16*100)}%"></i></span>12/16 aceitaram</div>
   <div class="act-box">${PENDING.slice(0,3).map((p,i)=>actRow(av(p),esc(p.n),ACT_ROLE[i])).join('')}${actMore(PENDING.length-3,'goTask','t2','sem resposta')}
    <div class="ar-foot">${ic('calendar',13,2)}<span><b>${DRAFTS.length} escalas de outubro</b> em rascunho · fecham dia 10</span></div></div>
   <div class="foot"><button class="btn pri" data-a="remind">Lembrar os ${PENDING.length}</button><button class="lnk" data-a="goTask" data-v="t2">Abrir escalas</button></div>
  </article>
  ${myTasksAct()}
  <article class="card act alldone" id="allDone" style="${openCount()?'display:none':''}">${logo(18,false)}<p>Tudo em dia por aqui.</p><span class="who">Nada pendente agora. Que tal olhar a escala de domingo com calma?</span><button class="lnk" data-a="undoAll">Restaurar pendências</button></article>
 </div>`;};
myTasksAct=function(){const all=myTasks(),u=myUrgent(),late=u.filter(x=>x.late).length,shown=u.slice(0,3);
 const row=({b,t})=>{const m=t.min&&mnById(t.min),dd=myDue(t),col=(b.cols.find(c=>c.id===t.col)||{}).n;
  return `<button class="ar ar-btn" data-a="myTask" data-v="${b.id}|${t.id}"><span class="ar-i" ${m?`style="--tc:var(--tone-${m.tone}-ink);--tb:var(--tone-${m.tone})"`:''}>${ic(m?m.icon:'check',14,1.9)}</span><span class="ar-t"><b class="two">${esc(t.t)}</b><small>${dd?`<span class="${dd[0]==='is-late'?'is-late':dd[0]==='is-soon'?'is-warm':''}">${dd[0]==='is-late'?'Atrasada':dd[1][0].toUpperCase()+dd[1].slice(1)}</span> · `:''}${esc(b.name)}</small></span></button>`;};
 return `<article class="card act act-tasks" id="tk"><div class="top"><span class="tg" style="background:var(--brand)"></span>Suas tarefas</div>
  ${u.length?`<div class="hero"><span class="n">${u.length}</span><span class="u">${u.length>1?'tarefas vencem':'tarefa vence'} em até ${MYT_DAYS} dias</span></div>
  <div class="act-m ${late?'is-late':''}">${ic(late?'alert':'calendar',13,2)}${late?late+' atrasada'+(late>1?'s':''):'Nenhuma atrasada'}</div>
  <div class="act-box">${shown.map(row).join('')}${actMore(all.length-shown.length,'tkAll','',all.length-shown.length===1?'tarefa no total':'tarefas no total')}</div>`
  :`<div class="hero"><span class="n">${ic('check',26,2)}</span><span class="u">${all.length?'Nada urgente nos próximos '+MYT_DAYS+' dias':'Você não tem tarefas nos quadros'}</span></div><div class="act-m">${ic('calendar',13,2)}${all.length?all.length+' tarefa'+(all.length>1?'s':'')+' com prazo mais longo':'Quando alguém te atribuir uma tarefa, ela aparece aqui'}</div><div class="act-box empty"></div>`}
  <div class="foot">${all.length?`<button class="btn pri" data-a="tkAll">Ver tarefas</button><button class="lnk" data-a="tkAll">${all.length} no total</button>`:''}</div></article>`;};

/* ---------- Caixas: visão do caixa ---------- */
{const _v=cxView;cxView=function(c){let h=_v(c);
 const bal=cxBal(c),nIn=c.entries.filter(e=>e.t==='in'&&!e.rev).length,nOut=c.entries.filter(e=>e.t==='out'&&!e.rev).length,xf=cxXf(c),closed=c.status==='encerrado';
 const kp='<div class="cxs"><div class="cxs-bal '+(bal<0?'neg':'')+'"><span class="cxs-l">Saldo do caixa</span><b>'+cxMoney(bal)+'</b><small>'+(bal<0?'Saiu mais do que entrou.':cxValid(c).length?cxValid(c).length+' lançamento'+(cxValid(c).length===1?'':'s')+' válido'+(cxValid(c).length===1?'':'s'):'Ainda sem movimentação')+'</small></div>'
  +'<div class="cxs-k"><span class="cxs-i in">'+ic('arrowDn',15,2.2)+'</span><span><small>Entradas</small><b class="cx-in">'+cxMoney(cxIn(c))+'</b><em>'+nIn+' lançamento'+(nIn===1?'':'s')+'</em></span></div>'
  +'<div class="cxs-k"><span class="cxs-i out">'+ic('arrowUp',15,2.2)+'</span><span><small>Saídas</small><b class="cx-out">'+cxMoney(cxOut(c))+'</b><em>'+nOut+' lançamento'+(nOut===1?'':'s')+'</em></span></div>'
  +'<div class="cxs-k"><span class="cxs-i xf">'+ic('arrowRL',15,2.2)+'</span><span><small>Aportes e repasses</small><b class="cx-xf">'+(xf>0?'+':'')+cxMoney(xf)+'</b><em>'+(c.main?'Entre o principal e os outros caixas':'Recebido do principal, menos o devolvido')+'</em></span></div></div>';
 h=h.replace(/<div class="cx-kp">[\s\S]*?<\/div><\/div><div class="tbar cx-tb">/,kp+'<div class="cxt"><div class="tbar cx-tb">');
 h=h.replace(/<div class="cx-list" id="cxRows">([\s\S]*)<\/div><\/section>$/,'<div class="cx-list" id="cxRows">$1</div></div></section>');
 if(!c.entries.length&&!closed)h=h.replace(/<div class="soft-empty" style="padding:28px 16px">[\s\S]*?<\/div>(?=<\/div><\/div><\/section>$)/,'<div class="cxe"><span class="cxe-i">'+ic('wallet',22,1.8)+'</span><p>Nenhum lançamento ainda</p><span class="who">Registre a primeira entrada ou saída deste caixa. Dá para anexar o comprovante.</span><div class="row2" style="justify-content:center"><button class="btn sec sm" data-a="cxEntry" data-v="'+c.id+'|out">'+ic('minus',14,2.2)+'Registrar saída</button><button class="btn pri sm" data-a="cxEntry" data-v="'+c.id+'|in">'+ic('plus',14,2.2)+'Registrar entrada</button></div></div>');
 return h;};}

{const _v=cxView;cxView=function(c){let h=_v(c);
 h=h.replace(/<button class="btn sec sm" data-a="cxEntry" data-v="([^"|]+)\|out">[\s\S]*?<\/button><button class="btn pri sm" data-a="cxEntry" data-v="[^"|]+\|in">[\s\S]*?<\/button>/,'<button class="btn pri sm" data-a="cxEntry" data-v="$1|in">'+ic('plus',14,2.2)+'Novo lançamento</button>');
 h=h.replace(/<div class="row2" style="justify-content:center"><button class="btn sec sm" data-a="cxEntry" data-v="([^"|]+)\|out">[\s\S]*?<\/button><button class="btn pri sm" data-a="cxEntry"[\s\S]*?<\/button><\/div>/,'<button class="btn pri sm" data-a="cxEntry" data-v="$1|in" style="margin-top:6px">'+ic('plus',14,2.2)+'Registrar o primeiro lançamento</button>');
 return h;};}
cxEntryDlg=function(cid,t){
 const c=CAIXAS.find(x=>x.id===cid);if(!c||c.status==='encerrado')return;let file=null,cat='';
 openDlg(dlgHead('Novo lançamento',esc(c.name)+' · saldo atual '+cxMoney(cxBal(c)))+'<form id="cxF" class="cxf" novalidate>'
  +'<div class="cxf-ty" role="radiogroup" aria-label="Tipo"><label class="in"><input type="radio" name="t" value="in"'+(t!=='out'?' checked':'')+'><span class="cxf-ti">'+ic('arrowDn',16,2.2)+'</span><span><b>Entrada</b><small>Oferta, inscrição, venda</small></span></label><label class="out"><input type="radio" name="t" value="out"'+(t==='out'?' checked':'')+'><span class="cxf-ti">'+ic('arrowUp',16,2.2)+'</span><span><b>Saída</b><small>Compra, serviço, despesa</small></span></label></div>'
  +'<div class="cxf-g"><label class="fld"><span class="fl">Valor</span><span class="cxf-v"><em>R$</em><input name="v" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0,00"></span><span class="err"></span></label>'
  +'<label class="fld"><span class="fl">Data</span><input type="date" name="d" value="'+myTd()+'" max="'+myTd()+'"><span class="err"></span></label></div>'
  +'<label class="fld"><span class="fl">Descrição</span><input name="desc" maxlength="80" autocomplete="off" placeholder="Ex.: Compra de cordas"><span class="err"></span></label>'
  +'<div class="fld"><span class="fl">Categoria</span><div class="cxf-cats" id="cxCats"></div></div>'
  +'<div class="fld"><span class="fl">Comprovante <small>opcional</small></span><label class="cxf-drop" id="cxDrop"><input type="file" name="file" accept="image/*,application/pdf"><span class="cxf-di">'+ic('upload',18,2)+'</span><span class="cxf-dt"><b>Arraste o arquivo aqui ou <u>escolha no computador</u></b><small>Foto ou PDF da nota, até 10 MB</small></span></label><div class="cxf-file" id="cxFile" hidden></div></div>'
  +'<p class="cxf-warn" id="cxH" hidden>'+ic('alert',14,2)+'<span>Esta saída é maior que o saldo e deixa o caixa negativo.</span></p>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="cxGo">Lançar</button></div></form>','cxfd');
 const f=$('#cxF'),typ=()=>f.querySelector('[name=t]:checked').value;
 const paint=()=>{const k=typ();if(!CX_CATS[k].includes(cat))cat=CX_CATS[k][0];
  $('#cxCats').innerHTML=CX_CATS[k].map(x=>'<button type="button" class="chipf '+(x===cat?'on':'')+'" data-cat="'+esc(x)+'">'+esc(x)+'</button>').join('');
  const v=Math.round((+f.elements.v.value||0)*100);$('#cxH').hidden=!(k==='out'&&v>cxBal(c));
  f.dataset.t=k;$('#cxGo').textContent=(k==='in'?'Lançar entrada':'Lançar saída')+(v?' · '+cxMoney(v):'');};
 const showFile=fl=>{file=fl;const b=$('#cxFile'),d=$('#cxDrop');if(!fl){b.hidden=true;d.hidden=false;f.elements.file.value='';return;}
  const kb=fl.size?Math.max(1,Math.round(fl.size/1024)):0,pdf=/pdf$/i.test(fl.type||fl.name);
  b.innerHTML='<span class="cxf-fi">'+ic(pdf?'file':'image',16,2)+'</span><span class="cxf-dt"><b>'+esc(fl.name)+'</b><small>'+(pdf?'PDF':'Imagem')+(kb?' · '+(kb>1024?(kb/1024).toFixed(1)+' MB':kb+' KB'):'')+'</small></span><button type="button" class="ibtn sm" id="cxFRm" aria-label="Tirar comprovante">'+ic('x',14)+'</button>';
  b.hidden=false;d.hidden=true;$('#cxFRm').onclick=()=>showFile(null);};
 paint();setTimeout(()=>f.elements.v.focus(),60);
 f.addEventListener('change',e=>{if(e.target.name==='t')paint();if(e.target.name==='file')showFile(e.target.files[0]||null);});
 f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');if(e.target.name==='v')paint();});
 $('#cxCats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;cat=b.dataset.cat;paint();});
 const dz=$('#cxDrop');['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over');}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over');}));
 dz.addEventListener('drop',e=>{const fl=e.dataTransfer&&e.dataTransfer.files[0];if(fl)showFile(fl);});
 f.onsubmit=e=>{e.preventDefault();const q=f.elements,bad=(n,m)=>{const i=q[n],fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;i.focus();};
  const v=+q.v.value;if(!(v>0))return bad('v','Informe um valor maior que zero');if(!q.d.value)return bad('d','Escolha a data');if(!q.desc.value.trim())return bad('desc','Descreva o lançamento');
  cxAdd(c,typ(),v,q.d.value,q.desc.value.trim(),cat,ME_NAME,{file:file?file.name:''});
  closeDlg();bdRe();toast((typ()==='in'?'Entrada':'Saída')+' de '+cxMoney(Math.round(v*100))+' lançada');};};

cxCloseDlg=function(cid){
 const c=CAIXAS.find(x=>x.id===cid);if(!c||c.main)return;const bal=cxBal(c),others=cxOwn(c.ownerType,c.ownerId).filter(x=>x.id!==c.id&&x.status!=='encerrado'),n=cxValid(c).length;
 const opts=[...others.map(x=>['to:'+x.id,x.main?'Devolver ao '+esc(x.name):'Transferir para '+esc(x.name),x.main?'O saldo volta para o caixa principal do ministério':'Passa para outro caixa aberto',x.main?'undo':'arrowRL',cxMoney(cxBal(x))+' hoje']),['church','Repassar à igreja','Sai do ministério e vai para o Financeiro da igreja','church',''],['keep','Deixar neste caixa','O saldo fica parado no caixa encerrado','lock','']];
 openDlg(dlgHead('Encerrar caixa','Fica só para consulta, sem novos lançamentos. Dá para reabrir depois.')+'<form id="cxC" class="cxc" novalidate>'
  +'<div class="cxc-s"><span class="cxc-i">'+ic('wallet',18,1.9)+'</span><div><b>'+esc(c.name)+'</b><small>'+n+' lançamento'+(n===1?'':'s')+' · entradas '+cxMoney(cxIn(c))+' · saídas '+cxMoney(cxOut(c))+'</small></div><div class="cxc-b '+(bal<0?'neg':'')+'"><small>Saldo</small><b>'+cxMoney(bal)+'</b></div></div>'
  +(bal>0?'<div class="fld"><span class="fl">O que fazer com o saldo?</span><div class="cxc-o" role="radiogroup">'+opts.map((o,i)=>'<label><input type="radio" name="dest" value="'+o[0]+'"'+(i===0?' checked':'')+'><span class="cxc-oi">'+ic(o[3],16,2)+'</span><span class="cxc-ot"><b>'+o[1]+'</b><small>'+o[2]+'</small></span>'+(o[4]?'<em>'+o[4]+'</em>':'')+'<i class="cxc-rd"></i></label>').join('')+'</div></div>'
   +'<div class="cxc-res" id="cxRes"></div>'
   :'<p class="cxc-note">'+ic('info',14,2)+'<span>'+(bal<0?'O saldo está negativo ('+cxMoney(bal)+') e fica registrado no caixa encerrado.':'O saldo está zerado. Não há nada a transferir.')+'</span></p>')
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="cxCGo">Encerrar caixa</button></div></form>','cxcd');
 const f=$('#cxC'),paint=()=>{if(!(bal>0))return;const v=f.querySelector('[name=dest]:checked').value,keep=v==='keep',to=v.startsWith('to:')?CAIXAS.find(x=>x.id===v.slice(3)):null;
  $('#cxRes').innerHTML='<span>Saldo final deste caixa</span><b>'+cxMoney(keep?bal:0)+'</b>'+(to?'<span class="cxc-ar">'+ic('arrowR',13,2)+esc(to.name)+' fica com '+cxMoney(cxBal(to)+bal)+'</span>':v==='church'?'<span class="cxc-ar">'+ic('arrowR',13,2)+'lançado como repasse à igreja</span>':'');
  $('#cxCGo').textContent=keep?'Encerrar caixa':to?(to.main?'Encerrar e devolver ':'Encerrar e transferir ')+cxMoney(bal):'Encerrar e repassar '+cxMoney(bal);};
 paint();f.addEventListener('change',paint);
 f.onsubmit=e=>{e.preventDefault();const r=f.querySelector('[name=dest]:checked'),dest=bal>0&&r?r.value:'keep',t=myTd();
  if(dest.startsWith('to:')){const to=CAIXAS.find(x=>x.id===dest.slice(3));cxXfer(c,to,bal/100,t,ME_NAME);}
  else if(dest==='church')cxAdd(c,'out',bal/100,t,'Repasse à igreja no encerramento','Repasse',ME_NAME);
  c.status='encerrado';c.closedAt=t;closeDlg();S.cxv='encerrado';bdRe();toast('Caixa encerrado');};};

/* ---------- Quadros: comentários ---------- */
bdCmList=function(bid,tid){const b=BOARDS.find(x=>x.id===bid),t=b&&b.tasks.find(x=>x.id===tid);if(!t)return;closeDlg(true);
 const l=bdCm(t),closed=b.status==='encerrado',k=bid+'|'+tid,td=myTd();
 const dayL=d=>{const n=Math.round((new Date(td+'T12:00')-new Date(d+'T12:00'))/864e5);return n===0?'Hoje':n===1?'Ontem':fmtDate(d);};
 let last='';const items=l.map(c=>{const sep=c.d!==last?'<div class="bdt-day"><span>'+dayL(c.d)+'</span></div>':'';last=c.d;const me=c.by===ME_NAME;
  return sep+'<article class="bdt-i'+(me?' mine':'')+'">'+(me?'':avN(c.by))+'<div class="bdt-b"><header><b>'+(me?'Você':esc(c.by))+'</b></header><p>'+esc(c.text)+'</p></div></article>';}).join('');
 openDlg(dlgHead('Comentários',esc(t.t)+' · '+(l.length?l.length+' comentário'+(l.length>1?'s':''):'nenhum comentário'))
  +'<div class="bdt" id="bdT">'+(l.length?items:'<div class="bdt-empty"><span>'+ic('message',20,1.8)+'</span><p>Nenhum comentário ainda</p><small>Deixe uma atualização ou um recado para quem trabalha nesta tarefa.</small></div>')+'</div>'
  +(closed?'<p class="tkv-n">'+ic('lock',13,2)+'Quadro encerrado: os comentários ficam só para consulta.</p>'
   :'<form class="bdt-f" id="bdTF" novalidate>'+avN(ME_NAME)+'<textarea name="c" rows="1" maxlength="400" placeholder="Escreva um comentário…" aria-label="Comentário"></textarea><button type="submit" class="btn pri sm" aria-label="Enviar comentário">'+ic('send',14,2)+'Enviar</button></form><p class="bdt-h">Enter envia · Shift + Enter quebra a linha</p>')
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="bdCmBack" data-v="'+k+'">'+ic('chevL',14,2)+'Voltar à tarefa</button></div>','bdtd');
 const el=$('#bdT');if(el)el.scrollTop=el.scrollHeight;
 const f=$('#bdTF');if(!f)return;const ta=f.elements.c,grow=()=>{ta.style.height='auto';ta.style.height=Math.min(120,ta.scrollHeight)+'px';};
 setTimeout(()=>ta.focus(),60);ta.addEventListener('input',()=>{grow();f.classList.remove('bad');});
 ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();f.requestSubmit();}});
 f.onsubmit=e=>{e.preventDefault();const x=ta.value.trim();if(!x){f.classList.add('bad');ta.focus();return;}bdCm(t).push({by:ME_NAME,d:myTd(),text:x});bdRe();bdCmList(bid,tid);toast('Comentário enviado');};};

/* ---------- Membro: histórico ---------- */
tHist=function(m){const h=history(m).reverse();
 const kind=t=>/Certid|Emitid|Carta|Declara/i.test(t)?['file','ace','Documento']:/Batismo/i.test(t)?['bucket','int','Ato']:/Casamento/i.test(t)?['heart','int','Ato']:/Consagra/i.test(t)?['flame','int','Ato']:/minist/i.test(t)?['users','seq','Ministério']:/Situação/i.test(t)?['swap','sol','Situação']:/Integra|integrar/i.test(t)?['userplus','brand','Integração']:/Cadastro/i.test(t)?['user','mute','Cadastro']:['dot','mute','Registro'];
 return `<section class="card pc mh"><div class="sh"><h2>Histórico</h2><span class="who">${h.length} registros · mais recentes primeiro</span></div>
  <ol class="mh-l">${h.map((x,i)=>{const k=kind(x[0]),sys=x[2]==='sys',d=String(x[3]),p=d.split(/[ \/]/);
   return `<li class="mh-i ${i===0?'first':''}"><span class="mh-d"><b>${esc(p[0])}</b><small>${esc(p.slice(1).join(' '))}</small></span><span class="mh-ic k-${k[1]}">${ic(k[0]==='dot'?'info':k[0],15,2)}</span><div class="mh-b"><div class="mh-h"><b>${esc(x[0])}</b><span class="mh-k">${k[2]}</span></div><span class="mh-m">${sys?'<span class="mh-sys">'+ic('zap',11,2.2)+'Automático</span>'+esc(x[1]):avN(x[1])+'<span>por '+esc(x[1])+'</span>'}</span></div></li>`;}).join('')}</ol></section>`;};

/* ---------- Acompanhamento: detalhes e histórico ---------- */
{const CHINT={urgente:'Precisa de atenção nos próximos dias',acompanhando:'Em andamento, com encontros',resolvido:'Acompanhamento encerrado'};
 const kv=(i,l,v)=>`<div class="cdx-kv"><span class="cdx-ki">${ic(i,15,2)}</span><span class="cdx-kt"><small>${l}</small><b>${v}</b></span></div>`;
 const careDet=c=>{const sch=(c.sched||[]).slice().sort((x,y)=>x.d.localeCompare(y.d)),nx=sch[0],last=c.meets.slice().sort((x,y)=>y.d.localeCompare(x.d))[0];
  return `<div class="cdx">
  <section class="card pc cdx-about"><div class="sh"><h2>Sobre o caso</h2></div>
   <p class="cdx-desc">${esc(c.desc)}</p>
   <div class="cdx-g">${kv(CTYPE[c.type]||'info','Tipo',esc(c.type))+kv('user','Responsável',crespInner(c))+kv(c.restr?'lock':'eye','Quem vê',(c.restr?`Administrar e ${(c.viewers||[c.resp]).length} pastor${(c.viewers||[c.resp]).length>1?'es':''}`:'Todos os pastores')+` <button type="button" class="lnk" data-a="cTriage" data-v="${c.id}">Alterar</button>`)+kv('calendar','Aberto em',`${fmtD(c.opened)} <i>· ${ago(c.opened)}</i>`)}</div>
   <button class="cdx-nx ${nx?'':'none'}" data-a="careTab" data-v="meetings">${nx?`<span class="cdx-nd"><b>${+nx.d.slice(8)}</b><small>${fmtD(nx.d).split(' ')[1]}</small></span><span class="cdx-nt"><small>Próximo encontro</small><b>${nx.mode==='Remoto'?'Encontro remoto':'Encontro presencial'} · ${esc(nx.t)}</b></span>`:`<span class="cdx-nd e">${ic('calendar',16,2)}</span><span class="cdx-nt"><small>Próximo encontro</small><b>Nenhum agendado</b></span>`}<span class="cdx-go">Ver encontros${ic('arrowR',13,2)}</span></button>
  </section>
  <aside class="stack-col">
   <section class="card pc"><div class="sh"><h2>Situação</h2></div>
    <div class="cdx-st" role="radiogroup" id="cstG">${Object.keys(CST).map(k=>`<label style="--c:${CST[k][1]};--cb:${CST[k][2]}"><input type="radio" name="cst" value="${k}" ${c.st===k?'checked':''}><span class="cdx-sd"></span><span class="cdx-sl"><b>${CST[k][0]}</b><small>${CHINT[k]||''}</small></span><span class="cdx-ck">${ic('check',12,3)}</span></label>`).join('')}</div>
   </section>
   <section class="card pc"><div class="sh"><h2>Encontros</h2></div>
    <div class="cdx-s"><div><b>${c.meets.length}</b><small>Realizado${c.meets.length===1?'':'s'}</small></div><div><b>${sch.length}</b><small>Agendado${sch.length===1?'':'s'}</small></div><div><b>${last?fmtD(last.d):'—'}</b><small>Último</small></div></div>
   </section>
  </aside></div>`;};
 const _cd=caseDetail;caseDetail=function(){let h=_cd.apply(this,arguments);const c=cById(S.case);if(!c)return h;
  h=h.replace(/<button class="btn sec" data-a="cReg"[^>]*>Registrar encontro<\/button><button class="btn pri" data-a="cSched"[^>]*>[\s\S]*?Agendar<\/button>/,'');
  const i=h.indexOf('<div class="care-details">');if(i>-1)h=h.slice(0,i)+careDet(c)+'</div>';return (S.careTab||'details')==='details'?h+careTrail(c):h;};
 A.cTriage=cTriage;
 const KIND=t=>/aberto/i.test(t)?['plus','brand','Abertura']:/resolvido/i.test(t)?['check','int','Encerramento']:/cancel/i.test(t)?['x','mute','Encontro']:/realizado/i.test(t)?['check','int','Encontro']:/agendado/i.test(t)?['calendar','ace','Encontro']:/Situa/i.test(t)?['swap','sol','Situação']:['info','mute','Registro'];
 careTimeline=function(c){careInit(c);const ev=c.events.slice().sort((a,b)=>b.d.localeCompare(a.d));
  return `<section class="card pc mh care-h"><div class="sh"><h2>Histórico do acompanhamento</h2><span class="who">${ev.length} registros · mais recentes primeiro</span></div>
   <ol class="mh-l">${ev.map((e,i)=>{const k=KIND(e.title),p=fmtD(e.d.slice(0,10)).split(' '),tm=e.d.includes('T')?new Date(e.d).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'';
    return `<li class="mh-i ${i===0?'first':''}"><span class="mh-d"><b>${p[0]}</b><small>${p[1]}${tm?' · '+tm:''}</small></span><span class="mh-ic k-${k[1]}">${ic(k[0],15,2)}</span><div class="mh-b"><div class="mh-h"><b>${esc(e.title)}</b><span class="mh-k">${k[2]}</span></div>${histTxt(e)?`<p class="care-ht">${esc(histTxt(e))}</p>`:''}<span class="mh-m">${avN(e.by)}<span>por ${esc(e.by)}</span>${e.ref?`<button class="lnk care-hl" data-a="careMeet" data-v="${e.ref}">Ver encontro${ic('arrowR',12,2)}</button>`:''}</span></div></li>`;}).join('')}</ol></section>`;};}

/* ---------- Evento: Financeiro ---------- */
evFinDet=function(e){
 if(!evMoney(e))return '';const f=evFinSum(e),tot=f.gross+f.toRec,pc=v=>tot?Math.round(v/tot*1000)/10:0;
 const seg=[['net',f.net,'Líquido'],['fee',f.fees,'Taxas'],['rec',f.toRec,'A receber']];
 return `<section class="card pc efx"><div class="sh"><div><h2>Financeiro</h2><p class="who efx-sub">Pagamentos das inscrições e compras adicionais</p></div><button class="btn sec sm" data-a="evFinRep" data-v="${e.id}" title="Por ingresso, compra adicional, forma de pagamento e desconto, em Relatórios › Agenda e eventos">${ic('clipboard',14)}Detalhamento</button></div>
  <div class="efx-g">
   <div class="efx-hero"><span class="efx-l">Arrecadado</span><b class="efx-v">${brl2(f.gross)}</b><small>${f.paid.length} ${f.paid.length===1?'pagamento confirmado':'pagamentos confirmados'}</small></div>
   <div class="efx-t"><span class="efx-i k-int">${ic('wallet',16,2)}</span><span class="efx-l">Líquido</span><b class="efx-v sm" style="color:var(--st-int)">${brl2(f.net)}</b><small>${f.fees?brl2(f.fees)+' em taxas':'sem taxas'}</small></div>
   <div class="efx-t"><span class="efx-i k-sol">${ic('clock',16,2)}</span><span class="efx-l">A receber</span><b class="efx-v sm" style="${f.toRec?'color:var(--st-sol)':''}">${brl2(f.toRec)}</b><small>${f.pend.length} ${f.pend.length===1?'pagamento pendente':'pagamentos pendentes'}</small></div>
  </div>
  ${tot?`<div class="efx-bar" role="img" aria-label="Composição do total previsto">${seg.filter(x=>x[1]>0).map(x=>`<i class="b-${x[0]}" style="flex:${x[1]}"></i>`).join('')}</div>
  <div class="efx-lg">${seg.map(x=>`<span><i class="b-${x[0]}"></i>${x[2]} <b>${pc(x[1]).toLocaleString('pt-BR')}%</b></span>`).join('')}<span class="efx-tt">Total previsto <b>${brl2(tot)}</b></span></div>`:''}
  <div class="sx-note efx-n" style="--c:${past(e)?'var(--st-int)':'var(--brand)'};margin:16px 0 0">${ic(past(e)?'check':'calendar',18,2)}<span>${past(e)?`Líquido de <b>${brl2(f.net)}</b> recebido nas inscrições. O dinheiro entra na conta pelo extrato.`:`O líquido das inscrições chega à conta pelo extrato${e.d?`, depois do evento (<b>${dBR(e.d)}</b>)`:''}.`}</span></div></section>`;};

Object.assign(A,{eiPg:v=>{S.eipg=+v;const b=$('#eirows');if(b){b.innerHTML=eiRows(eById(S.evt));b.closest('.mtab').scrollIntoView({block:'nearest',behavior:'smooth'});}}});

/* ---------- Evento: tabela de inscrições ---------- */
Object.assign(S,{rgq:'',rgf:'todos',rgt:'todos',rgpg:1});
/* a compra tem dois estados: situação (Confirmada, Pendente, Cancelada) e pagamento (Pago, Pendente, Reembolso solicitado, Reembolsado) */
const rgSit=r=>r.st==='cancelada'?stpill('var(--st-rec)','var(--st-rec-bg)','Cancelada'):r.pay==='pendente'?stpill('var(--st-sol)','var(--st-sol-bg)','Pendente'):stpill('var(--st-int)','var(--st-int-bg)','Confirmada');
const rgPay=r=>r.pay==='pago'?stpill('var(--st-int)','var(--st-int-bg)','Pago'+(r.cm?' · '+cmLab(r.cm)+' (balcão)':'')):r.pay==='pendente'?stpill('var(--st-sol)','var(--st-sol-bg)','Pendente'):r.pay==='reembolso'?stpill('var(--st-sol)','var(--st-sol-bg)','Reembolso solicitado'):r.pay==='reembolsado'?stpill('var(--ink-muted)','var(--surface-2)','Reembolsado'):r.pay==='cancelado'?'<span class="soft">Sem cobrança</span>':'<span class="soft">Gratuita</span>';
{const ev=EVTS.find(z=>z.paid&&z.regs.filter(r=>r.pay==='pago').length>2);if(ev){const p=ev.regs.filter(r=>r.pay==='pago');Object.assign(p[1],{st:'cancelada',pay:'reembolso'});Object.assign(p[2],{st:'cancelada',pay:'reembolsado'});}}
function rgRows(e){const mny=evMoney(e),mt=e.tickets.length>1,q=norm(S.rgq),sig=[e.id,S.rgq,S.rgf,S.rgt].join('|');if(S.rgSig!==sig){S.rgSig=sig;S.rgpg=1;}
 const l=e.regs.filter(r=>(S.rgf==='todos'||r.pay===S.rgf)&&(S.rgt==='todos'||(tkOf(e,r)||{}).id===S.rgt)&&(!q||norm(r.n+' '+(r.vch||'')).includes(q)));
 if(!e.regs.length)return `<div class="mempty"><p>Ninguém inscrito ainda.</p><span>Compartilhe o link do evento ou adicione alguém manualmente.</span></div>`;
 if(!l.length)return `<div class="mempty"><p>Nada por aqui.</p><span>Nenhuma inscrição corresponde a esses filtros.</span></div>`;
 const pp=10,P=Math.max(1,Math.ceil(l.length/pp));S.rgpg=Math.min(Math.max(1,S.rgpg),P);const c=S.rgpg,pg=l.slice((c-1)*pp,c*pp);
 const cls=`trow rg2 ${mt?'mt':''} ${mny?'':'free'}`;
 const head=`<div class="${cls} thead"><span>Nome</span>${mt?'<span>Ingresso</span>':''}<span>Inscrição</span>${mny?'<span>Situação</span><span>Pagamento</span><span>Valor</span>':''}<span></span></div>`;
 const body=pg.map(r=>{const tk=tkOf(e,r),nb=buyOf(e,r).length,tot=regTot(e,r);return `<div class="${cls} ${S.rgHi===r.id?'hi':''}" id="rg-${r.id}" tabindex="0" data-a="rgView" data-v="${r.id}"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span class="hn"><b>${esc(r.n)}</b>${nb||r.vch?`<span class="rg2-s">${nb?`+${nb} ${nb===1?'compra':'compras'}`:''}${r.vch?`<span class="mono vtag">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</span>`:''}</span></span>
  ${mt?`<span class="rg2-tk">${esc(tk?tk.n:'—')}</span>`:''}<span class="rdt">${dBR(r.d)}</span>${mny?`<span class="ts sit">${rgSit(r)}</span><span class="ts">${rgPay(r)}</span><span class="rv mono">${r.pay==='—'?'—':tot?brl(tot):'Bolsa'}</span>`:''}
  <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="rgMenu" data-v="${r.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="rgPop-${r.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="rgView" data-v="${r.id}">${ic('eye',16)}Ver inscrição</button><hr>${mny&&r.pay==='pendente'?`<button class="pi" data-a="rgPaid" data-v="${r.id}">${ic('check',16)}Marcar como pago</button><button class="pi" data-a="rgLink" data-v="${r.id}">${ic('mail',16)}Reenviar link de pagamento</button><hr>`:''}${r.st==='cancelada'?'':`<button class="pi danger" data-a="rgDel" data-v="${r.id}">${ic('x',16)}Cancelar compra</button>`}</div></div></span></div>`;}).join('');
 const n=[];for(let i=1;i<=P;i++){if(i===1||i===P||Math.abs(i-c)<=1)n.push(i);else if(n[n.length-1]!=='…')n.push('…');}
 const pager=P>1?`<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="rgPg" data-v="${c-1}" ${c===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${n.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===c?'on':''}" data-a="rgPg" data-v="${i}">${i}</button>`).join('')}<button class="ibtn sm" data-a="rgPg" data-v="${c+1}" ${c===P?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`:'';
 return head+body+`<div class="tfoot rg2-f"><span>${P>1?`${(c-1)*pp+1}–${Math.min(l.length,c*pp)} de ${l.length} inscrições`:`${l.length} ${l.length===1?'inscrição':'inscrições'}`}${e.cap?` · ${e.regs.length} de ${e.cap} vagas`:''}</span>${pager}</div>`;}
evIns=function(e){evEnsure(e);const mny=evMoney(e),mt=e.tickets.length>1,cnt=k=>e.regs.filter(r=>r.pay===k).length;
 if(S.rgt!=='todos'&&!e.tickets.some(t=>t.id===S.rgt))S.rgt='todos';
 const tdd=mt?`<div style="position:relative"><button class="btn sec sel" data-a="rgTMenu" aria-haspopup="menu">${S.rgt==='todos'?'Todos os ingressos':esc(e.tickets.find(t=>t.id===S.rgt).n)}${ic('updown',14)}</button><div class="pop" id="rgTPop" role="menu" style="left:0;top:calc(100% + 6px)"><button class="pi" data-a="rgT" data-v="todos">Todos os ingressos${S.rgt==='todos'?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button><hr>${e.tickets.map(t=>`<button class="pi" data-a="rgT" data-v="${t.id}">${esc(t.n)}<small style="margin-left:6px;color:var(--ink-soft)">${tkSold(e,t)}</small>${S.rgt===t.id?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>`:'';
 const chips=mny?`<div class="chips">${[['todos','Todos',e.regs.length],['pago','Pagos',cnt('pago')],['pendente','Pendentes',cnt('pendente')]].map(c=>`<button class="chipf ${S.rgf===c[0]?'on':''}" data-a="rgF" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div>`:'';
 return `<section class="card mtab rg2t"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="rgq" placeholder="Buscar pessoa ou voucher" value="${esc(S.rgq)}" autocomplete="off"></label>${tdd}${chips}<button class="btn pri sm rg2-add" data-a="evReg">${ic('plus',14,2.2)}Adicionar inscrição</button></div><div id="rgrows">${rgRows(e)}</div></section>`;};
Object.assign(A,{rgF:v=>{S.rgf=v;rerEv();},rgT:v=>{S.rgt=v;closePops();rerEv();},rgTMenu:()=>{const p=$('#rgTPop');closePops(p);p.classList.toggle('open');},
 rgPg:v=>{S.rgpg=+v;const b=$('#rgrows');if(b){b.innerHTML=rgRows(eById(S.evt));b.closest('.mtab').scrollIntoView({block:'nearest',behavior:'smooth'});}}});
document.addEventListener('input',x=>{if(x.target.id!=='rgq')return;S.rgq=x.target.value;const b=$('#rgrows');if(b)b.innerHTML=rgRows(eById(S.evt));});

/* ---------- Agenda › Inscrições: tabela ---------- */
Object.assign(S,{iqpg:1});
inscPage=function(){
 const rows=EVTS.flatMap(e=>{evEnsure(e);return e.regs.map(r=>({...r,e,_r:r}));}),q=norm(S.iq);
 const evs=EVTS.filter(e=>e.regs.length),scope=S.iqe==='todos'?rows:rows.filter(r=>r.e.id===S.iqe);
 const tkNames=[...new Set(scope.map(r=>{const t=tkOf(r.e,r);return t&&r.e.tickets.length>1?t.n:null;}).filter(Boolean))];
 if(S.iqt!=='todos'&&!tkNames.includes(S.iqt))S.iqt='todos';
 const base=rows.filter(r=>(S.iqe==='todos'||r.e.id===S.iqe)&&(S.iqt==='todos'||(tkOf(r.e,r)||{}).n===S.iqt)&&(S.iqc==='todos'||insCk(r.e,r._r).k===S.iqc)&&(!q||norm(r.n+' '+r.e.t+' '+(r.vch||'')).includes(q)));
 const fk=r=>r.pay==='pago'?'pago':r.pay==='pendente'?'pendente':'gratis';
 const l=base.filter(r=>S.iqf==='todos'||fk(r)===S.iqf).sort((a,b)=>a.d<b.d?1:-1);
 const sig=[S.iq,S.iqf,S.iqe,S.iqt,S.iqc].join('|');if(S.iqSig!==sig){S.iqSig=sig;S.iqpg=1;}
 const pp=10,P=Math.max(1,Math.ceil(l.length/pp));S.iqpg=Math.min(Math.max(1,S.iqpg),P);const c=S.iqpg,pg=l.slice((c-1)*pp,c*pp);
 const pend=rows.filter(r=>r.pay==='pendente');
 const dd=(k,val,opts)=>{const cur=opts.find(o=>o[0]===val)||opts[0];return `<div style="position:relative"><button class="btn sec sel" data-a="iqMenu" data-v="${k}" aria-haspopup="menu">${esc(cur[1])}${ic('updown',14)}</button><div class="pop" id="iqPop-${k}" role="menu" style="left:0;top:calc(100% + 6px)">${opts.map((o,i)=>`${i===1?'<hr>':''}<button class="pi" data-a="iqPick" data-v="${k}|${esc(o[0])}">${o[2]?`<i class="msd" style="background:${o[2]}"></i>`:''}${esc(o[1])}${val===o[0]?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>`;};
 const n=[];for(let i=1;i<=P;i++){if(i===1||i===P||Math.abs(i-c)<=1)n.push(i);else if(n[n.length-1]!=='…')n.push('…');}
 const pager=P>1?`<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="iqPg" data-v="${c-1}" ${c===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${n.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===c?'on':''}" data-a="iqPg" data-v="${i}">${i}</button>`).join('')}<button class="ibtn sm" data-a="iqPg" data-v="${c+1}" ${c===P?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`:'';
 const cnt=k=>k==='todos'?base.length:base.filter(r=>fk(r)===k).length;
 return `<header class="ph rise"><div><p class="eb">Agenda</p><h1>Inscrições</h1><p class="lede">Todas as inscrições dos eventos</p></div><div class="pact">${rpBtn('agenda','inscricoes')}</div></header>
 ${insSum(rows,pend)}
 <section class="card mtab iqt rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="iq2" placeholder="Buscar pessoa, evento ou voucher" value="${esc(S.iq)}" autocomplete="off"></label>
  <div class="iq-dd">${dd('iqe',S.iqe,[['todos','Todos os eventos'],...evs.map(e=>[e.id,e.t])])}${tkNames.length?dd('iqt',S.iqt,[['todos','Todos os ingressos'],...tkNames.map(x=>[x,x])]):''}${dd('iqc',S.iqc,[['todos','Qualquer check-in'],['in','Entrou','var(--st-int)'],['part','Parcial','var(--st-sol)'],['wait','Aguardando','var(--ink-soft)'],['nock','Evento sem check-in','var(--line-strong)']])}</div>
  <div class="chips">${[['todos','Todas'],['pendente','Pendentes'],['pago','Pagas'],['gratis','Gratuitas']].map(x=>`<button class="chipf ${S.iqf===x[0]?'on':''}" data-a="iqF" data-v="${x[0]}">${x[1]}<small>${cnt(x[0])}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow ax2 thead"><span>Pessoa</span><span>Evento e ingresso</span><span>Pagamento</span><span>Check-in</span><span>Data</span></div>${pg.map(r=>{const tk=tkOf(r.e,r),nb=buyOf(r.e,r).length,tot=regTot(r.e,r),ck=insCk(r.e,r._r);return `<div class="trow ax2" tabindex="0" data-a="insView" data-v="${r.e.id}|${r.id}"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span class="hn"><b>${esc(r.n)}</b>${r.vch?`<span class="mono vtag">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</span></span>
   <span class="aev"><b>${esc(r.e.t)}</b><small>${[tk&&r.e.tickets.length>1?esc(tk.n):'',nb?`+${nb} ${nb===1?'compra':'compras'}`:''].filter(Boolean).join(' · ')||'Inscrição'}</small></span>
   <span class="ts iq-pay">${r.pay==='pago'?stpill('var(--st-int)','var(--st-int-bg)','Pago')+`<small>${tot?brl(tot):'Bolsa'}</small>`:r.pay==='pendente'?stpill('var(--st-sol)','var(--st-sol-bg)','Pendente')+`<small>${brl(tot)}</small>`:stpill('var(--ink-muted)','var(--surface-2)','Gratuita')}</span>
   <span class="ack">${insCkPill(ck)}</span><span class="rdt">${dBR(r.d)}</span></div>`;}).join('')}`:'<div class="mempty"><p>Nada encontrado.</p><span>Tente outros filtros.</span></div>'}
  <div class="tfoot iq-f"><span>${P>1?`${(c-1)*pp+1}–${Math.min(l.length,c*pp)} de ${l.length} inscrições`:`${l.length} ${l.length===1?'inscrição':'inscrições'}`}</span>${pager}</div></section>`;
};
Object.assign(A,{iqMenu:v=>{const p=$('#iqPop-'+v);closePops(p);p.classList.toggle('open');},
 iqPick:v=>{const i=v.indexOf('|'),k=v.slice(0,i),val=v.slice(i+1);S[k]=val;if(k==='iqe')S.iqt='todos';closePops();render();},
 iqPg:v=>{S.iqpg=+v;render();$('.iqt')?.scrollIntoView({block:'nearest',behavior:'smooth'});}});

/* ---------- Secretaria: tabelas no padrão ---------- */
Object.assign(S,{sxAtoQ:'',sxAtoSt:'todos',sxAtoPg:1,sxDocF:'todos',sxDocTy:'todos',sxDocPg:1,sxMdQ:'',sxMdPg:1});
const sxPager=(c,P,act)=>{if(P<2)return '';const n=[];for(let i=1;i<=P;i++){if(i===1||i===P||Math.abs(i-c)<=1)n.push(i);else if(n[n.length-1]!=='…')n.push('…');}
 return `<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="${act}" data-v="${c-1}" ${c===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${n.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===c?'on':''}" data-a="${act}" data-v="${i}">${i}</button>`).join('')}<button class="ibtn sm" data-a="${act}" data-v="${c+1}" ${c===P?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`;};
const sxPage=(l,key,pp)=>{const P=Math.max(1,Math.ceil(l.length/pp));S[key]=Math.min(Math.max(1,S[key]||1),P);const c=S[key];return {c,P,list:l.slice((c-1)*pp,c*pp),foot:(lab1,labN,act)=>`<div class="tfoot sxt-f"><span>${P>1?`${(c-1)*pp+1}–${Math.min(l.length,c*pp)} de ${l.length} ${labN}`:`${l.length} ${l.length===1?lab1:labN}`}</span>${sxPager(c,P,act)}</div>`};};
const sxDD=(id,act,val,opts)=>{const cur=opts.find(o=>o[0]===val)||opts[0];return `<div style="position:relative"><button class="btn sec sel" data-a="sxDDm" data-v="${id}" aria-haspopup="menu">${esc(cur[1])}${ic('updown',14)}</button><div class="pop" id="sxDD-${id}" role="menu" style="left:0;top:calc(100% + 6px)">${opts.map((o,i)=>`${i===1?'<hr>':''}<button class="pi" data-a="${act}" data-v="${esc(o[0])}">${o[2]?`<i class="msd" style="background:${o[2]}"></i>`:''}${esc(o[1])}${val===o[0]?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>`;};
/* atos */
function sxAtoRows(){const all=sxAtoAll(),q=norm(S.sxAtoQ),sig=[S.sxAto,S.sxAtoSt,S.sxAtoQ].join('|');if(S.sxAtoSig!==sig){S.sxAtoSig=sig;S.sxAtoPg=1;}
 const l=all.filter(a=>(S.sxAto==='todos'||a.t===S.sxAto)&&(S.sxAtoSt==='todos'||sxAtoSit(a)===S.sxAtoSt)&&(!q||norm(SX_ATO_T[a.t][0]+' '+a.ppl.join(' ')+' '+(a.loc||'')).includes(q)));
 if(!l.length)return '<div class="mempty"><p>Nenhum ato por aqui.</p><span>Mude os filtros ou registre um novo ato.</span></div>';
 const pg=sxPage(l,'sxAtoPg',8);
 return `<div class="trow sxt-ato thead"><span>Ato</span><span>Pessoas</span><span>Data</span><span>Local</span><span>Situação</span><span></span></div>${pg.list.map(a=>`<div class="trow sxt-ato" tabindex="0" data-a="sxAtoOpen" data-v="${a.id}"><span class="tn"><span class="sxt-ic">${ic(SX_ATO_T[a.t][1],16,2)}</span><span class="hn"><b>${SX_ATO_T[a.t][0]}</b><small>${a.t==='casamento'?'1 casal':a.ppl.length+' '+(a.ppl.length>1?'pessoas':'pessoa')}</small></span></span><span class="sxt-pp">${a.t==='casamento'?sxAtoPpl(a):a.ppl.slice(0,3).map(esc).join(', ')+(a.ppl.length>3?' e mais '+(a.ppl.length-3):'')}</span><span class="sxt-d">${dBR(a.d)}</span><span class="sxt-l">${esc(a.loc||'—')}</span><span>${sxAtoPillA(a)}</span><span class="sxt-ch">${ic('chevR',16)}</span></div>`).join('')}${pg.foot('ato','atos','sxAtoPg')}`;}
secAtos=function(){const all=sxAtoAll(),c=k=>all.filter(a=>a.t===k).length;
 const done=all.filter(a=>a.st==='realizado'&&a.d.startsWith('2026')),pp=done.reduce((n,a)=>n+a.ppl.length,0),inf=all.filter(a=>a.st==='informado'&&(!a.dec||a.dec==='aceito')),pend=all.filter(a=>a.auto&&a.dec==='pendente');
 return sxHead('Secretaria','Atos','Batismos, casamentos, consagrações, apresentações e cursos concluídos. O que acontece num evento da Agenda aparece aqui sozinho; o que a pessoa declara na integração chega para você decidir; o resto é registrado à mão. Alimentam a ficha do membro e as certidões.',`<button class="btn pri" data-a="sxAtoNew">${ic('plus',15,2.2)}Registrar ato</button>`)
 +sxKpis([['Realizados em 2026',done.length,pp+' pessoas envolvidas'],['Informados',inf.length,'feitos em outras igrejas'],['Pendentes de decisão',pend.length,pend.length?'declarados na integração':'nada a decidir',pend.length?'var(--st-sol)':''],['Casamentos e consagrações',c('casamento')+c('consagracao'),'registrados']])
 +`<section class="card mtab sxt rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input data-sxq="ato" placeholder="Buscar pessoa ou local" value="${esc(S.sxAtoQ)}" autocomplete="off"></label>${sxDD('ast','sxAtoSt',S.sxAtoSt,[['todos','Qualquer situação'],['pendente','Pendente de decisão','var(--st-sol)'],['realizado','Realizado','var(--st-int)'],['informado','Informado','var(--ink-soft)'],['recusado','Recusado','var(--st-rec)']])}
  <div class="chips">${[['todos','Todos',all.length],['batismo','Batismos',c('batismo')],['casamento','Casamentos',c('casamento')],['consagracao','Consagrações',c('consagracao')],['apresentacao','Apresentações',c('apresentacao')],['curso','Cursos',c('curso')]].map(x=>`<button class="chipf ${S.sxAto===x[0]?'on':''}" data-a="sxAtoF" data-v="${x[0]}">${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div><div id="sxAtL">${sxAtoRows()}</div></section>`;};
/* documentos emitidos */
sxDocList=function(){const q=norm(S.sxDocQ||''),sig=[S.sxDocQ,S.sxDocF,S.sxDocTy].join('|');if(S.sxDocSig!==sig){S.sxDocSig=sig;S.sxDocPg=1;}
 const l=SX_DOCS.slice().sort((a,b)=>a.d===b.d?SX_DOCS.indexOf(b)-SX_DOCS.indexOf(a):a.d<b.d?1:-1).filter(d=>(S.sxDocF==='todos'||d.st===S.sxDocF)&&(S.sxDocTy==='todos'||d.t===S.sxDocTy)&&(!q||norm(d.pessoa+' '+d.t+' '+d.num+' '+d.code).includes(q)));
 if(!l.length)return '<div class="mempty"><p>Nenhum documento encontrado.</p><span>Mude os filtros ou emita um novo documento.</span></div>';
 const pg=sxPage(l,'sxDocPg',8);
 return `<div class="trow sxt-doc thead"><span>Documento</span><span>Pessoa</span><span>Emitido em</span><span>Assinado por</span><span>Situação</span><span></span></div>${pg.list.map(d=>`<div class="trow sxt-doc" tabindex="0" data-a="sxDocOpen" data-v="${d.id}"><span class="tn"><span class="sxt-ic">${ic(SX_DOC_T[d.t].ic,16,2)}</span><span class="hn"><b>${esc(d.t)}</b><small class="mono">nº ${d.num}${d.by==='Automático'?' · automático':''}</small></span></span><span class="sxt-pp">${esc(d.pessoa)}</span><span class="sxt-d">${dBR(d.d)}</span><span class="sxt-l">${esc(d.sig.split(' — ')[0])}</span><span>${d.st==='valido'?sxPill('Válido','var(--st-int)','var(--st-int-bg)'):sxPill('Revogado','var(--st-rec)','var(--st-rec-bg)')}</span><span class="sxt-ch">${ic('chevR',16)}</span></div>`).join('')}${pg.foot('documento','documentos','sxDocPg')}`;};
{const _sd=secDocs;secDocs=function(){let h=_sd.apply(this,arguments).replace('Documentos emitidos, o arquivo da secretaria (estatuto, atas, contratos) e os modelos usados para gerar os documentos.','Documentos emitidos, arquivo da secretaria e modelos de documento.');if(S.sxDocT!=='emitidos')return h;
 const i=h.indexOf('<section class="card sx-list rise" style="--d:3"><div class="sx-bar">'),j=h.indexOf('<div id="sxDl">',i);if(i<0||j<0)return h;
 const val=SX_DOCS.filter(d=>d.st==='valido').length,tys=[...new Set(SX_DOCS.map(d=>d.t))];
 return h.slice(0,i)+`<section class="card mtab sxt rise" style="--d:3"><div class="tbar"><label class="sbox">${ic('search',16)}<input data-scq="doc" placeholder="Buscar por pessoa, número ou código" value="${esc(S.sxDocQ||'')}" autocomplete="off"></label>${sxDD('dty','sxDocTy',S.sxDocTy,[['todos','Todos os tipos'],...tys.map(t=>[t,t])])}<div class="chips">${[['todos','Todos',SX_DOCS.length],['valido','Válidos',val],['revogado','Revogados',SX_DOCS.length-val]].map(x=>`<button class="chipf ${S.sxDocF===x[0]?'on':''}" data-a="sxDocF" data-v="${x[0]}">${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div>`+h.slice(j);};}
/* mandatos */
function sxMdRows(){const q=norm(S.sxMdQ),sig=[S.sxMdQ,S.sxMdF].join('|');if(S.sxMdSig!==sig){S.sxMdSig=sig;S.sxMdPg=1;}
 const l=SX_MAND.slice().filter(x=>(S.sxMdF==='todos'||sxMandSt(x)!=='encerrado')&&(!q||norm(x.pessoa+' '+sxCargo(x.cg).n).includes(q))).sort((a,b)=>((sxMandSt(a)==='encerrado')-(sxMandSt(b)==='encerrado'))||((a.fim||'9')<(b.fim||'9')?-1:1));
 if(!l.length)return '<div class="mempty"><p>Nenhum mandato encontrado.</p><span>Mude a busca ou crie um novo mandato.</span></div>';
 const pill=x=>{const st=sxMandSt(x);if(st==='encerrado')return sxPill('Encerrado','var(--ink-muted)','var(--surface-2)');if(st==='agendado')return sxPill('Começa em '+dBR(x.ini),'var(--st-ace)','var(--st-ace-bg)');const d=x.fim?sxDays(SX_TODAY,x.fim):null;return d!==null&&d<=90?sxPill('Vence em '+d+' dias','var(--st-sol)','var(--st-sol-bg)'):sxPill('Vigente','var(--st-int)','var(--st-int-bg)');};
 const acc=x=>{const c=sxCargo(x.cg);return x.sc?`<span class="sxt-acc">${ic('key',12,2)}${esc(c.ac.area)} · ${c.ac.perm==='Visualizar'?'Ver':c.ac.perm}</span>`:c.ac&&sxMandSt(x)==='vigente'?'<span class="soft">Não concedido</span>':'<span class="soft">—</span>';};
 const pg=sxPage(l,'sxMdPg',8);
 return `<div class="trow sxt-md thead"><span>Pessoa</span><span>Cargo</span><span>Período</span><span>Acesso</span><span>Situação</span><span></span></div>${pg.list.map(x=>{const ata=SX_ARQ.find(a=>a.id===x.ata),end=sxMandSt(x)==='encerrado';return `<div class="trow sxt-md"><span class="tn">${sxAv(x.pessoa)}<span class="hn"><b>${esc(x.pessoa)}</b>${ata?`<small>${ic('file',11,2)} ${esc(ata.n)}</small>`:''}</span></span><span class="sxt-pp">${esc(sxCargo(x.cg).n)}</span><span class="sxt-d">${dBR(x.ini)} → ${x.fim?dBR(x.fim):'sem prazo'}</span><span>${acc(x)}</span><span>${pill(x)}</span><span class="hact">${end?'':`<div style="position:relative"><button class="ibtn sm" data-a="sxMdMenu" data-v="${x.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="sxMdPop-${x.id}" style="right:0;top:calc(100% + 4px)"><button class="pi danger" data-a="sxMdEnd" data-v="${x.id}">${ic('x',16)}Encerrar mandato</button></div></div>`}</span></div>`;}).join('')}${pg.foot('mandato','mandatos','sxMdPg')}`;}
{const _sc=secCargos;secCargos=function(){let h=_sc.apply(this,arguments);if(S.sxCg!=='mandatos')return h;
 const i=h.indexOf('<section class="card sx-list rise" style="--d:3"><div class="sx-bar">');if(i<0)return h;const j=h.indexOf('</section>',i);
 return h.slice(0,i)+`<section class="card mtab sxt rise" style="--d:3"><div class="tbar"><label class="sbox">${ic('search',16)}<input data-sxq="md" placeholder="Buscar pessoa ou cargo" value="${esc(S.sxMdQ)}" autocomplete="off"></label><div class="chips">${[['vigentes','Vigentes e futuros'],['todos','Todos, com encerrados']].map(c=>`<button class="chipf ${(S.sxMdF||'vigentes')===c[0]?'on':''}" data-a="sxMdF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div><div id="sxMdL">${sxMdRows()}</div></section>`+h.slice(j+10);};}
/* visão geral */
{const _sv=secVis;secVis=function(){let h=_sv.apply(this,arguments);
 h=h.replace('O que a secretaria precisa acompanhar: situação dos membros, atos, documentos e mandatos.','Situação dos membros, atos, documentos e mandatos da igreja.');
 h=h.replace(/\(([^()<>]*\(a\))\) vence/g,'· $1 · vence');
 const i=h.indexOf('<section class="card rise" style="--d:4;padding:18px 20px"><div class="sh"><h2>Atalhos</h2>');
 if(i>-1){const j=h.indexOf('</section>',i)+10;const docs=SX_DOCS.slice().sort((a,b)=>a.d<b.d?1:-1).slice(0,4);
  h=h.slice(0,i)+`<section class="card rise" style="--d:4;padding:18px 20px"><div class="sh"><h2>Documentos recentes</h2><button class="lnk" data-a="sxGo" data-v="sec-docs">Ver todos</button></div>${docs.map(d=>`<button class="sx-bd sxv-doc" data-a="sxDocOpen" data-v="${d.id}"><span class="sxt-ic">${ic(SX_DOC_T[d.t].ic,15,2)}</span><span class="sx-m"><b>${esc(d.t)}</b><small>${esc(d.pessoa)} · ${dBR(d.d)}</small></span>${d.st==='valido'?'':sxPill('Revogado','var(--st-rec)','var(--st-rec-bg)')}</button>`).join('')}</section>`+h.slice(j);}
 return h;};}
Object.assign(A,{sxDDm:v=>{const p=$('#sxDD-'+v);closePops(p);p.classList.toggle('open');},
 sxAtoSt:v=>{S.sxAtoSt=v;closePops();render();},sxAtoPg:v=>{S.sxAtoPg=+v;$('#sxAtL').innerHTML=sxAtoRows();},
 sxDocF:v=>{S.sxDocF=v;render();},sxDocTy:v=>{S.sxDocTy=v;closePops();render();},sxDocPg:v=>{S.sxDocPg=+v;$('#sxDl').innerHTML=sxDocList();},
 sxMdPg:v=>{S.sxMdPg=+v;$('#sxMdL').innerHTML=sxMdRows();},sxMdMenu:v=>{const p=$('#sxMdPop-'+v);closePops(p);p.classList.toggle('open');}});
{const _e=A.sxMdEnd;A.sxMdEnd=v=>{closePops();_e(v);};}
document.addEventListener('input',e=>{const k=e.target&&e.target.dataset&&e.target.dataset.sxq;if(!k)return;
 if(k==='ato'){S.sxAtoQ=e.target.value;$('#sxAtL').innerHTML=sxAtoRows();}else if(k==='md'){S.sxMdQ=e.target.value;$('#sxMdL').innerHTML=sxMdRows();}});
/* modais: emitir documento com prévia ao lado */
{const _d=sxDocDlg;sxDocDlg=function(){_d.apply(this,arguments);const f=$('#sxF');if(f)f.closest('.dlg').classList.add('sx-docdlg');};}
{const _m=sxMdDlg;sxMdDlg=function(){_m.apply(this,arguments);const f=$('#sxF');if(!f)return;f.closest('.dlg').classList.add('sx-mddlg');
 const box=document.createElement('div');box.className='sx-cgi';f.insertBefore(box,f.children[1]);const upd=()=>{const c=sxCargo(f.cg.value);box.innerHTML=`${ic('info',15,2)}<span><b>${esc(c.n)}</b>${esc(c.desc||'')}${c.ac?` <i>Acesso sugerido: ${esc(c.ac.area)} · ${c.ac.perm==='Visualizar'?'Ver':c.ac.perm}</i>`:''}</span>`;};f.cg.addEventListener('change',upd);upd();};}

/* ---------- Apresentação: pedido ---------- */
A.bbOpen=(v,b,ev)=>{if(ev&&ev.target.closest('[data-a=bbOk],[data-a=bbCert],[data-a=bbDone]'))return;const p=BBP.find(x=>x.id===v),e=bbEv(p),m=bbM(p.nasc,e.d),ov=m>BBR.maxM&&p.st!=='realizada',doc=bbDoc(p);
 const steps=[['Pedido recebido',dBR(p.at),1],['Confirmado',p.st==='aguardando'?'aguardando':p.st==='recusado'?'—':'pela secretaria',['confirmado','realizada'].includes(p.st)],['Apresentação',dBR(e.d),p.st==='realizada'],['Certificado',doc?'nº '+doc.num:'a emitir',!!doc]];
 const cur=steps.findIndex(x=>!x[2]);
 openDlg(`${dlgHead('Pedido de apresentação',`Recebido em ${dBR(p.at)}`)}
  <div class="bbx-hero" style="--h:${(p.bebe.length*37)%360}"><span class="bbx-av">${ic('pacifier',22,1.8)}</span><div class="bbx-n"><b>${esc(p.bebe)}</b><span>Nasceu em ${dBR(p.nasc)}<i class="bbx-age ${ov?'bad':''}">${bbAge(m)} na data</i></span></div>${bbPill(p.st)}</div>
  ${p.st==='recusado'?'':`<ol class="bbx-st">${steps.map((x,i)=>`<li class="${x[2]?'done':i===cur?'cur':''}"><span>${x[2]?ic('check',11,3):i+1}</span><b>${x[0]}</b><small>${esc(x[1])}</small></li>`).join('')}</ol>`}
  ${ov?`<div class="sx-note" style="--c:var(--st-rec);margin:0 0 14px">${ic('alert',18,2)}<span><b>Acima da idade da regra (${bbMaxTx()}).</b> Converse com a família antes de confirmar. Dá para confirmar mesmo assim.</span></div>`:''}
  ${p.why?`<div class="sx-note" style="--c:var(--st-rec);margin:0 0 14px">${ic('info',18,2)}<span><b>Motivo da recusa.</b> ${esc(p.why)}</span></div>`:''}
  <div class="bbx-g">
   <div class="bbx-c"><span class="bbx-ci">${ic('calendar',16,2)}</span><div><small>Culto</small><b>${esc(e.t)}</b><span>${wd(e.d)}, ${dBR(e.d)} · ${e.time}</span></div></div>
   <div class="bbx-c"><span class="bbx-ci">${ic('users',16,2)}</span><div><small>Responsáveis</small>${p.pais.map(n=>`<span class="bbx-p">${esc(n)}<i>${ic('check',9,3)}membro</i></span>`).join('')}</div></div>
  </div>
  <label class="fld bbx-f"><span class="fl">Nome no certificado</span><input id="bbCn" value="${esc(p.cert)}" ${doc?'disabled':''} autocomplete="off"><span class="hint">${doc?`Certificado nº ${doc.num} emitido pela secretaria.`:'A secretaria emite o certificado com este nome. Confira a grafia com a família.'}</span><span class="err"></span></label>
  <div class="dfoot bb-ft bbx-ft">${p.st==='aguardando'?`<button class="btn sec" data-a="bbNo" data-v="${p.id}">Recusar</button><button class="btn pri" data-a="bbOk" data-v="${p.id}">${ov?'Confirmar mesmo assim':'Confirmar'}</button>`:p.st==='confirmado'?`<button class="btn sec bbx-x" data-a="bbCancel" data-v="${p.id}">Cancelar apresentação</button><span class="bbx-r">${past(e)||e.d===CKDAY?`<button class="btn sec" data-a="bbSaveName" data-v="${p.id}">Salvar nome</button><button class="btn pri" data-a="bbDone" data-v="${p.id}">Marcar realizada</button>`:`<button class="btn pri" data-a="bbSaveName" data-v="${p.id}">Salvar</button>`}</span>`:p.st==='realizada'?`<button class="btn sec" data-a="bbSaveName" data-v="${p.id}" ${doc?'disabled':''}>Salvar nome</button><button class="btn pri" data-a="bbCert" data-v="${p.id}">${ic('award',14)}Ver certificado</button>`:`<button class="btn sec" data-a="closeDlg">Fechar</button>`}</div>`,'bbx');};

/* ---------- Documentos: modelos e arquivo ---------- */
sxModList=function(){const n=t=>SX_DOCS.filter(d=>d.t===t).length;
 return `<div class="trow sxt-mod thead"><span>Modelo</span><span>Arquivo em uso</span><span>Atualizado</span><span>Emitidos</span><span>Versão</span><span></span></div>`+Object.keys(SX_DOC_T).map(t=>{const T=SX_DOC_T[t],k=n(t);
  if(T.fin)return `<div class="trow sxt-mod fixed"><span class="tn"><span class="sxt-ic">${ic(T.ic,16,2)}</span><span class="hn"><b>${esc(t)}</b><small>Modelo do sistema</small></span></span><span class="sxt-file"><i class="sxt-ext sys">${ic('lock',12,2)}</i><span class="sxt-fn"><b>Layout do sistema</b><small>exigido para o informe</small></span></span><span class="sxt-l">—</span><span class="sxt-n ${k?'':'z'}">${k}</span><span><span class="sxt-fix">${ic('lock',12,2)}Fixo</span></span><span></span></div>`;
  const m=sxModOf(t)[0],id='md'+norm(t).replace(/[^a-z0-9]/g,'');
  return `<div class="trow sxt-mod" tabindex="0" data-a="sxModHist" data-v="${esc(t)}"><span class="tn"><span class="sxt-ic">${ic(T.ic,16,2)}</span><span class="hn"><b>${esc(t)}</b><small>${(SX_VARS[t]||[]).length+SX_VARS_ALL.length} campos preenchidos</small></span></span><span class="sxt-file"><i class="sxt-ext ${/\.pdf$/i.test(m.file)?'pdf':''}">${(m.file.split('.').pop()||'').toUpperCase()}</i><span class="sxt-fn"><b>${esc(m.file.replace(/\.[^.]+$/,''))}</b><small>${/\.pdf$/i.test(m.file)?'PDF':'Word'} · ${m.sz}</small></span></span><span class="sxt-up"><b>${dBR(m.d)}</b><small>${esc(m.by)}</small></span><span class="sxt-n ${k?'':'z'}">${k}</span><span>${sxPill('v'+m.v+' ativa','var(--st-int)','var(--st-int-bg)')}</span>
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="sxRowMenu" data-v="${id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="sxRm-${id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="sxModNew" data-v="${esc(t)}">${ic('upload',16,2)}Enviar nova versão</button><button class="pi" data-a="sxModHist" data-v="${esc(t)}">${ic('clock',16,2)}Ver histórico</button><button class="pi" data-a="sxModDl" data-v="${esc(m.file)}">${ic('download',16,2)}Baixar arquivo</button></div></div></span></div>`;}).join('');};
sxArqList=function(){const q=norm(S.sxArqQ),c=S.sxArq;
 const l=SX_ARQ.filter(x=>(c==='todas'||x.cat===c)&&(!q||norm(x.n+' '+x.cat+' '+(x.sub||'')).includes(q))).sort((a,b)=>a.d<b.d?1:-1);
 if(!l.length)return '<div class="mempty"><p>Nenhum arquivo por aqui.</p><span>Envie estatutos, atas, contratos e certidões em “Enviar arquivo”.</span></div>';
 return `<div class="trow sxt-arq thead"><span>Arquivo</span><span>Categoria</span><span>Data</span><span>Enviado por</span><span>Quem pode abrir</span><span></span></div>`+l.map(x=>`<div class="trow sxt-arq" tabindex="0" data-a="sxArqOpen" data-v="${x.id}"><span class="tn"><span class="sxt-ic">${ic('folder',16,2)}</span><span class="hn"><b>${esc(x.n)}</b><small>${x.sz}</small></span></span><span class="sxt-pp">${esc(x.cat)}${x.sub?`<small class="sxt-sub">${esc(x.sub)}</small>`:''}</span><span class="sxt-d">${dBR(x.d)}</span><span class="sxt-l">${esc(x.by||sxMe)}</span><span>${sxAccPill(x.acc)}</span>
  <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="sxRowMenu" data-v="${x.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="sxRm-${x.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="sxArqOpen" data-v="${x.id}">${ic('eye',16,2)}Abrir</button><button class="pi" data-a="sxArqAcc" data-v="${x.id}">${ic('lock',16,2)}Quem pode abrir</button></div></div></span></div>`).join('')+`<div class="tfoot"><span>${l.length} ${l.length===1?'arquivo':'arquivos'}</span></div>`;};
{const _sd=secDocs;secDocs=function(){let h=_sd.apply(this,arguments);if(S.sxDocT==='emitidos')return h;
 h=h.replace('<section class="card sx-list rise" style="--d:3"><div class="sx-bar">','<section class="card mtab sxt rise" style="--d:3"><div class="tbar">').replace('<section class="card sx-list rise" style="--d:3">','<section class="card mtab sxt rise" style="--d:3">');
 h=h.replace(/<p class="sx-priv">[\s\S]*?<\/p>/,'');
 h=h.replace(/<small>Você envia um arquivo Word[\s\S]*?<\/small>/,'<small>Envie um Word (.docx) ou PDF com campos como {{nome}}. A versão nova vale nas próximas emissões; o que já foi emitido não muda.</small>');
 if(S.sxDocT==='arquivo')h=h.replace('<div id="sxAl">',`<div class="sxt-priv">${ic('lock',13,2)}Cada arquivo diz quem pode abrir. Aberturas ficam na auditoria.</div><div id="sxAl">`);
 return h;};}
Object.assign(A,{sxRowMenu:v=>{const p=$('#sxRm-'+v);closePops(p);p.classList.toggle('open');}});
['sxModNew','sxModHist','sxModDl','sxArqAcc','sxArqOpen'].forEach(k=>{const f=A[k];if(f)A[k]=function(){closePops();return f.apply(this,arguments);};});

/* ---------- Modelos: nova versão e histórico ---------- */
A.sxModNew=t=>{closePops();const a=sxModOf(t)[0],nv=a.v+1;
 sxDlg('Nova versão do modelo',esc(t),
  `<div class="sxm-cur"><span class="sxm-v">v${a.v}</span><span class="sxm-ct"><small>Em uso hoje</small><b>${esc(a.file)}</b><span>${dBR(a.d)} por ${esc(a.by)} · ${a.sz}</span></span><button type="button" class="ibtn sm" data-a="sxModDl" data-v="${esc(a.file)}" aria-label="Baixar" title="Baixar o modelo atual">${ic('download',15)}</button></div>`
  +`<div class="fld"><span class="fl">Arquivo da v${nv}</span><label class="cxf-drop" id="sxmDrop"><input type="file" name="fi" accept=".docx,.pdf"><span class="cxf-di">${ic('upload',18,2)}</span><span class="cxf-dt"><b>Arraste o arquivo aqui ou <u>escolha no computador</u></b><small>Word (.docx) ou PDF · opcional no protótipo</small></span></label><div class="cxf-file" id="sxmFile" hidden></div><span class="err"></span></div>`
  +sxF('O que mudou <small>opcional</small>','<input name="note" placeholder="Ex.: novo texto de assinatura" autocomplete="off">')
  +`<div class="fld"><span class="fl">Campos que o arquivo pode usar</span><div class="sxm-vars"><div><small>Todo documento</small><div class="sx-vars">${SX_VARS_ALL.map(x=>`<button type="button" data-cp="{{${esc(x)}}}">{{${esc(x)}}}</button>`).join('')}</div></div>${(SX_VARS[t]||[]).length?`<div><small>Deste documento</small><div class="sx-vars">${SX_VARS[t].map(x=>`<button type="button" data-cp="{{${esc(x)}}}">{{${esc(x)}}}</button>`).join('')}</div></div>`:''}</div><span class="hint">Clique para copiar. Número, assinatura, código e QR entram sozinhos.</span></div>`
  +`<div class="sx-note" style="--c:var(--brand);margin:0">${ic('info',18,2)}<span>A v${nv} vale nas próximas emissões. O que já foi emitido não muda. <button type="button" class="lnk" data-a="sxModDl" data-v="${esc(sxModFile(t).replace('.docx','-exemplo.docx'))}">Baixar um exemplo</button></span></div>`,
  sxOk('Enviar v'+nv),'sxm-dlg');
 const f=$('#sxF');let file=null;
 const show=fl=>{file=fl;const b=$('#sxmFile'),d=$('#sxmDrop');if(!fl){b.hidden=true;d.hidden=false;f.fi.value='';return;}const kb=Math.max(1,Math.round((fl.size||0)/1024)),pdf=/\.pdf$/i.test(fl.name);
  b.innerHTML=`<span class="cxf-fi">${ic('file',16,2)}</span><span class="cxf-dt"><b>${esc(fl.name)}</b><small>${pdf?'PDF':'Word'} · ${kb>1024?(kb/1024).toFixed(1).replace('.',',')+' MB':kb+' KB'} · vira a v${nv}</small></span><button type="button" class="ibtn sm" id="sxmRm" aria-label="Tirar arquivo">${ic('x',14)}</button>`;b.hidden=false;d.hidden=true;$('#sxmRm').onclick=()=>show(null);f.fi.closest('.fld').classList.remove('bad');};
 f.addEventListener('change',e=>{if(e.target.name==='fi')show(e.target.files[0]||null);});
 const dz=$('#sxmDrop');['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over');}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over');}));dz.addEventListener('drop',e=>{const fl=e.dataTransfer&&e.dataTransfer.files[0];if(fl)show(fl);});
 f.addEventListener('click',e=>{const b=e.target.closest('[data-cp]');if(!b)return;try{navigator.clipboard&&navigator.clipboard.writeText(b.dataset.cp);}catch(_){}b.classList.add('ok');setTimeout(()=>b.classList.remove('ok'),900);toast(b.dataset.cp+' copiado');});
 f.onsubmit=e=>{e.preventDefault();sxClr(f);
  if(file&&!/\.(docx|pdf)$/i.test(file.name)){const fl=f.fi.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Envie um arquivo Word (.docx) ou PDF';return;}
  const x={v:nv,file:file?file.name:sxModFile(t),by:sxMe,d:SX_TODAY,sz:file?(file.size>1048576?(file.size/1048576).toFixed(1).replace('.',',')+' MB':Math.max(1,Math.round(file.size/1024))+' KB'):'38 KB',note:f.note.value.trim()};
  SX_MOD[t].unshift(x);sxLog('Enviou','Modelo',t+' v'+x.v,x.file);closeDlg();render();toast('Modelo de '+t.toLowerCase()+' atualizado: v'+x.v+' está ativa');};};
A.sxModHist=t=>{closePops();const l=sxModOf(t);
 openDlg(dlgHead('Histórico do modelo',esc(t)+` · ${l.length} ${l.length===1?'versão':'versões'}`)+`<ol class="sxm-h">${l.map((x,i)=>{const n=SX_DOCS.filter(d=>d.t===t&&(d.mv||1)===x.v).length;return `<li class="${i===0?'on':''}"><span class="sxm-v">v${x.v}</span><div class="sxm-hb"><div class="sxm-hh"><b>${esc(x.file)}</b>${i===0?sxPill('Ativa','var(--st-int)','var(--st-int-bg)'):''}</div><span class="sxm-hm">${dBR(x.d)} · ${esc(x.by)} · ${x.sz}</span>${x.note?`<span class="sxm-hn">“${esc(x.note)}”</span>`:''}<div class="sxm-hf"><span class="sxm-c">${ic('file',12,2)}${n} ${n===1?'emitido':'emitidos'} com esta versão</span><span class="sxm-ha">${i===0?'':`<button class="btn sec sm" data-a="sxModRe" data-v="${esc(t)}|${x.v}">Reativar</button>`}<button class="ibtn sm" data-a="sxModDl" data-v="${esc(x.file)}" aria-label="Baixar" title="Baixar">${ic('download',15)}</button></span></div></div></li>`;}).join('')}</ol>
  <div class="sx-note" style="--c:var(--brand);margin:14px 0 0">${ic('info',18,2)}<span>Reativar cria uma versão nova com o mesmo arquivo. Nada é apagado, e o que já foi emitido mantém a versão que usou.</span></div>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="sxModNew" data-v="${esc(t)}">${ic('upload',14,2)}Enviar nova versão</button></div>`,'sc-dlg sxm-dlg');};

/* ---------- menu e dashboard ---------- */
lede=function(){return '';};
{const gi=NAV.findIndex(g=>g[0]==='Comunicação');if(gi>=0){const items=NAV[gi][1],ct=items.find(i=>i[0]==='conteudo'),cm=items.find(i=>i[0]==='comunicacao');
 if(ct)NAV.find(g=>g[0]==='Geral')[1].push(ct);
 if(cm){const ge=NAV.find(g=>g[0]==='Gestão')[1],ri=ge.findIndex(i=>i[0]==='relatorios');ge.splice(ri<0?ge.length:ri,0,cm);}
 NAV.splice(gi,1);}}

/* ---------- menu: ordem pelo fluxo de uso (visão geral primeiro, análises por último) ---------- */
{const ORD={
 Geral:['Dashboard','Pessoas','Comunidade','Cuidado','Kids','Conteúdo'],
 Operação:['Agenda','Espaços','Almoxarifado','Cafeteria','Restaurante','Loja'],
 Gestão:['Secretaria','Financeiro','Comunicação','Relatórios','Administração']};
 const SUB={
 Pessoas:['Integração','Membros'],
 Comunidade:['Casas de Apascentamento','Redes de casa','Ministérios'],
 Cuidado:['Discipulado','Acompanhamento','Pedidos de oração','Como estou me sentindo','Disciplina'],
 Kids:['Visão geral','Turmas','Salas','Times','Planejamento','Escalas'],
 Conteúdo:['Pregações','Séries','Vídeos','Músicas','Cursos','Jornadas','Material de apoio'],
 Agenda:['Calendário','Cultos','Eventos','Inscrições','Escalas','Apresentações','Batismos','Consagrações','Casamentos'],
 Espaços:['Salas','Reservas'],
 Almoxarifado:['Visão geral','Itens','Categorias','Empréstimos','Devoluções','Distribuições','Transferências','Movimentações'],
 Cafeteria:['Visão geral','Itens','Categorias','Vendas','Caixa diário','Movimentações'],
 Restaurante:['Visão geral','Itens','Categorias','Vendas','Caixa diário','Movimentações'],
 Loja:['Visão geral','Itens','Categorias','Vendas','Pedidos do app','Caixa diário','Movimentações'],
 Secretaria:['Visão geral','Atos','Documentos','Cargos e mandatos','Análises'],
 Financeiro:['Visão geral','Lançamentos','Contas financeiras','Contas a receber','Contas a pagar','Previsibilidade','Doações','Aprovações','Importar e exportar','Análises','Configurar'],
 Comunicação:['Notícias','Banners','Notificações','Transmissões'],
 Relatórios:['Integração','Membros','Casas de Apascentamento','Ministérios','Discipulado','Acompanhamento','Pedidos de oração','Kids','Conteúdo','Agenda e eventos','Escalas','Espaços','Almoxarifado','Cafeteria','Restaurante','Loja','Secretaria','Financeiro','Doações','Comunicação','Multi-igreja'],
 Administração:['Usuários e permissões','Superusuários','Visitantes','Recursos habilitados','Parâmetros do sistema','Multi-igreja','Auditoria e LGPD']};
 const by=(list,key,order)=>{const ix=x=>{const i=order.indexOf(key(x));return i<0?999:i;};list.sort((a,b)=>ix(a)-ix(b));};
 const apply=()=>NAV.forEach(g=>{if(ORD[g[0]])by(g[1],x=>x[2],ORD[g[0]]);g[1].forEach(n=>{if(n[3]&&SUB[n[2]])by(n[3],c=>c[1],SUB[n[2]]);});});
 apply();const _sb=sidebar;sidebar=function(){apply();return _sb.apply(this,arguments);};}

/* ---------- Notícias ---------- */
{const _p=ntPage;ntPage=function(){let h=_p.apply(this,arguments);
 h=h.replace(/<div class="segc" role="tablist">[\s\S]*?<\/div>\s*/,'');
 const cnt={ativas:NEWS.filter(n=>ntSt(n)==='ativa').length,exp:NEWS.filter(n=>ntSt(n)==='exp').length,todas:NEWS.length};
 h=h.replace(/(<button class="chipf[^"]*" data-a="ntF" data-v="(ativas|exp|todas)">[^<]*)<\/button>/g,(m,p,k)=>p+'<small>'+cnt[k]+'</small></button>');
 h=h.replace('<section class="card mtab rise" style="--d:2">',sxSeg('ntTab',[['news','Notícias',NEWS.length],['cats','Categorias',NCATS.length]],S.ntab)+'<section class="card mtab nt-t rise" style="--d:3">');
 h=h.replace(/<div class="tbar">\s*<\/div>/,'');
 return h;};}
{const _l=ntList;ntList=function(){const h=_l.apply(this,arguments);return h.startsWith('<div class="cm-nl">')?h.replace('<div class="cm-nl">','<div class="cm-nl"><div class="cm-nh"><span>Notícia</span><span>Saída do ar</span><span>Situação</span><span></span></div>'):h;};}

/* O histórico guarda só o fato (quem, o quê, quando): o conteúdo tratado no encontro fica no próprio encontro. */
function histTxt(e){return /^Encontro realizado/.test(e.title)?'':e.text;}
/* ---------- Discipulado: histórico ---------- */
function dLog(d,title,text,kind){(d.hist=d.hist||[]).push({d:new Date().toISOString(),title,text,by:ME.n||'Rafael Pereira',kind});}
function dEvents(d){const p=d.parent&&dById(d.parent),done=d.meets.filter(m=>m.type==='done').sort((a,b)=>a.d<b.d?-1:1);
 const since=done.length?addDays(-(Math.round((TODAY-new Date(done[0].d))/864e5)+21)):addDays(-((d.last||14)+45));
 const ev=[{d:since,title:'Entrou na rede de discipulado',text:p?'Discipulado por '+p.n:'Topo da rede',by:p?p.n:'',kind:'start'},
  {d:since,title:'Ritmo de contato definido',text:RHY[d.rhythm],by:p?p.n:'',kind:'rhy'}];
 d.meets.forEach(m=>ev.push(m.type==='done'?{d:m.d,title:'Encontro realizado',text:m.content||m.mode,by:p?p.n:'',kind:'meet',ref:m.id}:{d:addDays(-2),title:'Encontro agendado',text:wd(m.d)+', '+fmtD(m.d)+' às '+m.time.replace(':00','h'),by:p?p.n:'',kind:'sched',ref:m.id}));
 kids(d.id).forEach((k,i)=>ev.push({d:addDays(-((k.last||14)+30+i*9)),title:'Passou a discipular '+k.n,text:RHY[k.rhythm],by:'',kind:'kid'}));
 if(d.paused)ev.push({d:addDays(-Math.max(1,(d.last||10)-5)),title:'Discipulado pausado',text:d.notes||'',by:p?p.n:'',kind:'pause'});
 return ev.concat(d.hist||[]).sort((a,b)=>b.d.localeCompare(a.d));}
const DK={start:['plus','brand','Rede'],rhy:['clock','mute','Ritmo'],stage:['award','int','Trilha'],meet:['check','int','Encontro'],sched:['calendar','ace','Encontro'],kid:['userplus','seq','Rede'],pause:['pause','sol','Situação'],resume:['play','int','Situação'],transfer:['swap','sol','Rede']};
function dHist(d){const ev=dEvents(d);
 return `<section class="card pc mh care-h"><div class="sh"><h2>Histórico do discipulado</h2><span class="who">${ev.length} registros · mais recentes primeiro</span></div>
  <ol class="mh-l">${ev.map((e,i)=>{const k=DK[e.kind]||['info','mute','Registro'],p=fmtD(e.d.slice(0,10)).split(' '),tm=e.d.includes('T')?new Date(e.d).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'';
   return `<li class="mh-i ${i===0?'first':''}"><span class="mh-d"><b>${p[0]}</b><small>${p[1]}${tm?' · '+tm:''}</small></span><span class="mh-ic k-${k[1]}">${ic(k[0],15,2)}</span><div class="mh-b"><div class="mh-h"><b>${esc(e.title)}</b><span class="mh-k">${k[2]}</span></div>${histTxt(e)?`<p class="care-ht">${esc(histTxt(e))}</p>`:''}<span class="mh-m">${e.by?avN(e.by)+`<span>por ${esc(e.by)}</span>`:`<span class="mh-sys">${ic('zap',11,2.2)}Automático</span>`}${e.ref&&e.kind==='meet'?`<button class="lnk care-hl" data-a="dViewMeet" data-v="${e.ref}">Ver encontro${ic('arrowR',12,2)}</button>`:''}</span></div></li>`;}).join('')}</ol></section>`;}
{const _dd=discDetail;discDetail=function(){let h=_dd.apply(this,arguments);const d=dById(S.disc);if(!d)return h;
 h=h.replace('<span class="tind"></span></div>\n </header>',`<button role="tab" class="${S.dpt==='hist'?'on':''}" data-a="dpt" data-v="hist">Histórico</button><span class="tind"></span></div>\n </header>`);
 if(S.dpt==='hist'){const i=h.indexOf('<div id="dtb"');h=h.slice(0,i)+`<div id="dtb" class="rise" style="--d:2">${dHist(d)}</div>`;}
 return h;};}
{const _r=reDisc;reDisc=function(){_r.apply(this,arguments);if(S.dpt==='hist'){const d=dById(S.disc);$('#dtb').innerHTML=dHist(d);}};}
{const _s=A.dStage;A.dStage=function(){const d=dById(S.disc),t=TRILHA[d.stage-1];dLog(d,'Concluiu “'+t+'”','Etapa '+d.stage+' de 6 da trilha','stage');return _s.apply(this,arguments);};}
{const _p=A.dPause;A.dPause=function(){const d=dById(S.disc);dLog(d,d.paused?'Discipulado retomado':'Discipulado pausado','',d.paused?'resume':'pause');return _p.apply(this,arguments);};}
document.addEventListener('change',e=>{if(e.target&&e.target.name==='rhy'&&S.disc){const d=dById(S.disc);if(d)dLog(d,'Ritmo de contato alterado',RHY[+e.target.value],'rhy');}},true);

/* ---------- Administração: tabelas ---------- */
const admPill=(t,k)=>`<span class="stp" style="--c:var(--${k});--b:var(--${k}-bg)"><i></i>${esc(t)}</span>`;
const admMute=t=>`<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>${esc(t)}</span>`;
const admAv=n=>`<span class="av" style="background:var(--tone-${TONES[n.length%6]});color:var(--tone-${TONES[n.length%6]}-ink)">${initials(n)}</span>`;
const admMenu=(id,items)=>`<div style="position:relative"><button class="ibtn sm" data-a="admRowMenu" data-v="${id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="admRm-${id}" style="right:0;top:calc(100% + 4px)">${items.join('')}</div></div>`;
const admChips=(act,cur,list)=>`<div class="chips">${list.map(([v,t,n])=>`<button class="chipf ${cur===v?'on':''}" data-a="${act}" data-v="${v}">${t}<small>${n}</small></button>`).join('')}</div>`;
usersTab=function(){const q=norm(S.uq||''),scope=USERS.filter(u=>!u.revoked&&(S.idListScope==='org'||u.cur===idChurchId()));
 const base=scope.filter(u=>!q||norm(u.n+' '+u.e+' '+u.role).includes(q)),list=base.filter(u=>!S.idStatusFilter||idStatus(u)===S.idStatusFilter),cnt=t=>t?base.filter(u=>idStatus(u)===t).length:base.length;
 return `<section class="card mtab admt"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="uq" placeholder="Buscar por nome, e-mail ou papel" value="${esc(S.uq||'')}" autocomplete="off"></label>${admChips('idStatusFilter',S.idStatusFilter||'',[['','Todos',cnt('')],['Ativo','Ativos',cnt('Ativo')],['Convidado','Convidados',cnt('Convidado')],['Suspenso','Suspensos',cnt('Suspenso')]])}<div class="segc adm-sc">${[['church','Desta igreja'],['org','Da organização']].map(([k,t])=>`<button data-a="idListScope" data-v="${k}" aria-pressed="${(S.idListScope||'church')===k}">${t}</button>`).join('')}</div></div>
  ${list.length?`<div class="trow admu thead"><span>Usuário</span><span>Papel</span><span>Situação</span><span>Último acesso</span><span></span></div>${list.map(u=>`<div class="trow admu" tabindex="0" data-a="uOpen" data-v="${u.id}"><span class="tn">${uAv(u)}<span class="hn"><b>${esc(u.n)}</b><small>${esc(u.e)}</small></span></span><span>${rPill(u.role)}</span><span>${idStatusPill(u)}</span><span class="adm-d">${idLast(u)}</span><span class="adm-ch">${ic('chevR',16)}</span></div>`).join('')}`:'<div class="mempty"><p>Nenhum usuário corresponde aos filtros.</p><span>Mude a busca ou os filtros.</span></div>'}
  <div class="tfoot"><span>${list.length} ${list.length===1?'usuário':'usuários'}</span></div></section>`;};
idVisitors=function(){const q=norm(S.visQuery||''),base=ID_VISITORS.filter(x=>!q||norm(x.n+' '+x.e).includes(q)),list=base.filter(x=>!S.visStatus||x.status===S.visStatus),pp=8,P=Math.max(1,Math.ceil(list.length/pp)),c=Math.min(S.visPage||0,P-1),pg=list.slice(c*pp,c*pp+pp);
 const ig=t=>t==='Solicitado'?admPill(t,'st-ace'):t==='Em andamento'?admPill(t,'st-sol'):t==='Concluída'?admPill(t,'st-int'):admMute(t);
 return `${admHead('Visitantes','Contas de visitantes da igreja','')}
 <section class="card mtab admt rise" style="--d:1"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="visq" placeholder="Buscar nome ou e-mail" value="${esc(S.visQuery||'')}" autocomplete="off"></label>${admChips('idVisFilter',S.visStatus||'',[['','Todos',base.length],['Ativo','Ativos',base.filter(x=>x.status==='Ativo').length],['Acesso revogado','Revogados',base.filter(x=>x.status!=='Ativo').length]])}</div>
  ${pg.length?`<div class="trow admv thead"><span>Visitante</span><span>Igreja</span><span>Criado em</span><span>Integração</span><span>Situação</span><span></span></div>${pg.map(x=>`<div class="trow admv"><span class="tn">${admAv(x.n)}<span class="hn"><b>${esc(x.n)}</b><small>${esc(x.e)}</small></span></span><span class="adm-l">${esc(x.church)}</span><span class="adm-d">${dBRs(x.created)}</span><span>${ig(x.integration)}</span><span>${x.status==='Ativo'?admPill('Ativo','st-int'):admPill('Acesso revogado','st-rec')}</span><span class="hact">${admMenu(x.id,[x.status==='Ativo'?`<button class="pi danger" data-a="idVisToggle" data-v="${x.id}">${ic('x',16)}Revogar acesso</button>`:`<button class="pi" data-a="idVisToggle" data-v="${x.id}">${ic('check',16)}Restabelecer acesso</button>`])}</span></div>`).join('')}`:'<div class="mempty"><p>Nenhum visitante encontrado.</p><span>Mude a busca ou os filtros.</span></div>'}
  <div class="tfoot adm-f"><span>${P>1?`${c*pp+1}–${Math.min(list.length,c*pp+pp)} de ${list.length} visitantes`:`${list.length} ${list.length===1?'visitante':'visitantes'}`}</span>${P>1?`<div class="mpg"><button class="ibtn sm" data-a="idVisPage" data-v="${c-1}" ${c===0?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${Array.from({length:P},(_,i)=>`<button class="mpg-n ${i===c?'on':''}" data-a="idVisPage" data-v="${i}">${i+1}</button>`).join('')}<button class="ibtn sm" data-a="idVisPage" data-v="${c+1}" ${c===P-1?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`:''}</div></section>`;};
idSuperUsers=function(){const st=s=>s==='Ativo'?admPill(s,'st-int'):s==='Convidado'?admPill(s,'st-sol'):s==='Suspenso'?admPill(s,'st-rec'):admMute(s);
 return `${admHead('Superusuários','Acesso administrativo à plataforma',`<button class="btn pri" data-a="idSuperInvite">${ic('plus',16)}Convidar</button>`)}
 <section class="card mtab admt rise" style="--d:1"><div class="trow adms thead"><span>Pessoa</span><span>Tipo</span><span>Situação</span><span>Último acesso</span><span></span></div>${ID_SUPERS.map(x=>`<div class="trow adms"><span class="tn">${admAv(x.n)}<span class="hn"><b>${esc(x.n)}</b><small>${esc(x.e)}</small></span></span><span><span class="adm-ty ${x.type==='SuperAdmin'?'adm':''}">${ic(x.type==='SuperAdmin'?'shield':'key',12,2)}${x.type==='SuperAdmin'?'Super admin':'Super operador'}</span></span><span>${st(x.status)}</span><span class="adm-d">${x.last}</span><span class="hact">${x.status==='Revogado'?'':admMenu(x.id,[x.status==='Convidado'?`<button class="pi" data-a="idSuperResend" data-v="${x.id}">${ic('mail',16)}Reenviar convite</button>`:`<button class="pi" data-a="idSuperToggle" data-v="${x.id}">${ic(x.status==='Suspenso'?'check':'pause',16)}${x.status==='Suspenso'?'Reativar':'Suspender'}</button>`,'<hr>',`<button class="pi danger" data-a="idSuperRevoke" data-v="${x.id}">${ic('x',16)}Revogar acesso</button>`])}</span></div>`).join('')}<div class="tfoot"><span>${ID_SUPERS.length} superusuários</span></div></section>`;};
const FLAG_INFO={cafeteria:['coffee','Cafeteria','Vendas, caixa e itens da cafeteria'],restaurante:['chef','Restaurante','Refeições, caixa e itens do restaurante'],loja:['bag','Loja','Produtos, pedidos do app e caixa da loja']};
const FLAG_STAGE_LABEL=Object.fromEntries(FLAG_STAGES);
idFlags=function(){return `${admHead('Recursos habilitados','Configuração de funcionalidades da plataforma',`<button class="btn pri" data-a="idFlagNew">${ic('plus',16)}Cadastrar recurso</button>`)}
 <section class="card mtab admt rise" style="--d:1"><div class="trow admf thead"><span>Recurso</span><span>Chave</span><span>Atualizado em</span><span>Estágio</span></div>${ID_FLAGS.map((x,i)=>{const f=FLAG_INFO[x.key]||['sliders',x.key.replace(/^./,c=>c.toUpperCase()),'Recurso cadastrado'];
  return `<div class="trow admf ${x.stage==='off'?'off':''}"><span class="tn"><span class="adm-fi">${ic(f[0],16,2)}</span><span class="hn"><b>${esc(f[1])}</b><small>${esc(f[2])}</small></span></span><span><code class="adm-k">${esc(x.key)}</code></span><span class="adm-d">${x.updated}</span><span class="adm-tg"><div style="position:relative"><button class="btn sec sm" data-a="idFlagMenu" data-v="${i}">${FLAG_STAGE_LABEL[x.stage]}${ic('chevD',14)}</button><div class="pop" id="flagPop-${i}" style="right:0;top:calc(100% + 6px)">${FLAG_STAGES.map(([k,t])=>`<button class="pi" data-a="idFlagStage" data-v="${i}|${k}">${x.stage===k?ic('check',16):`<span style="width:16px;display:inline-block"></span>`}${t}</button>`).join('')}</div></div></span></div>${x.stage==='selected'?idFlagPilotsPanel(x,i):''}`;}).join('')}<div class="tfoot"><span>${ID_FLAGS.filter(x=>x.stage==='all').length} de ${ID_FLAGS.length} em Geral para todo mundo</span></div></section>`;};
function idFlagPilotsPanel(x,i){const q=norm((S.flagPilotQ&&S.flagPilotQ[i])||'');
 const cands=ORGS.filter(o=>!x.pilots.some(p=>p.id===o.id)&&norm(o.n)!=='global'&&(!q||norm(o.n).includes(q)));
 return `<div style="padding:14px 20px;border-top:1px solid var(--line);background:var(--surface-2)">
  <span class="fl">Organizações-piloto <small>a Global já tem acesso neste estágio; adicione aqui as demais</small></span>
  ${x.pilots.length?`<ol class="cip-list" style="margin:8px 0">${x.pilots.map(p=>{const o=ORGS.find(z=>z.id===p.id);return `<li class="cip-row"><span style="flex:1">${esc(o?o.n:p.id)}</span><span class="soft">incluída em ${p.added}</span><span class="cip-ra"><button type="button" class="ibtn sm cip-rm" data-a="idFlagPilotDel" data-v="${i}|${p.id}" aria-label="Remover">${ic('x',14,2)}</button></span></li>`;}).join('')}</ol>`:'<p class="who" style="margin:6px 0">Nenhuma organização-piloto ainda.</p>'}
  <label class="sbox sm" style="max-width:280px;margin-top:6px">${ic('search',14)}<input id="flagPilotQ-${i}" data-fi="${i}" placeholder="Buscar organização" value="${esc((S.flagPilotQ&&S.flagPilotQ[i])||'')}" autocomplete="off"></label>
  <div class="pick" style="margin-top:6px">${cands.length?cands.map(o=>`<button type="button" class="pk" data-a="idFlagPilotAdd" data-v="${i}|${o.id}">${ic('plus',14)}<span><b>${esc(o.n)}</b></span></button>`).join(''):'<p class="who" style="padding:6px 0">Nenhuma organização encontrada.</p>'}</div>
 </div>`;}
Object.assign(A,{admRowMenu:v=>{const p=$('#admRm-'+v);closePops(p);p.classList.toggle('open');},idFlagMenu:v=>{const p=$('#flagPop-'+v);closePops(p);p.classList.toggle('open');}});
['idVisToggle','idSuperToggle','idSuperResend','idSuperRevoke','idFlagStage'].forEach(k=>{const f=A[k];if(f)A[k]=function(){closePops();return f.apply(this,arguments);};});
document.addEventListener('input',e=>{if(e.target.id!=='visq')return;S.visQuery=e.target.value;S.visPage=0;const p=e.target.selectionStart;admRe();const n=$('#visq');if(n){n.focus();n.setSelectionRange(p,p);}});

/* ---------- Almoxarifado: cadeia de eventos ---------- */
Object.assign(S,{mvq:'',trq:''});
const MVV={emp:'emprestou',dev:'devolveu',dist:'distribuiu',tr:'transferiu',aj:'ajustou'};
const axDayH=d=>`<div class="mgh" style="position:static"><span>${inDays(d)===0?'Hoje':wd(d)+', '+fmtD(d)}</span></div>`;
function axLogRows(l,row){const g={};l.forEach(m=>(g[m.d]=g[m.d]||[]).push(m));return Object.keys(g).sort().reverse().map(d=>axDayH(d)+`<ol class="alog axl">${g[d].map(row).join('')}</ol>`).join('');}
function axMvList(){const all=moves(),q=norm(S.mvq),l=all.filter(m=>(S.mvf==='todos'||m.t===S.mvf)&&(!q||norm(((itm(m.it)||{}).n||'')+' '+m.txt).includes(q)));
 if(!l.length)return '<div class="mempty"><p>Nada encontrado.</p><span>Nenhuma movimentação corresponde a esse filtro.</span></div>';
 return axLogRows(l,m=>{const v=MVT[m.t],it=itm(m.it),sg=m.t==='dev'||(m.t==='aj'&&m.q>0)?'in':m.t==='tr'?'':'out';
  return `<li><span class="at axq ${sg}">${m.t==='dev'?'+':m.t==='aj'?(m.q>0?'+':m.q<0?'−':''):m.t==='tr'?'':'−'}${Math.abs(m.q)}</span><span class="adot" style="background:${v[2]}"></span><span class="ab"><span><b>${esc(it?it.n:'Item removido')}</b> · <span class="aa" style="color:${v[2]}">${v[0].toLowerCase()}</span> <span class="soft">${esc(m.txt)}</span></span></span></li>`;});}
axMoves=function(){const all=moves(),c=k=>all.filter(m=>m.t===k).length;
 return axHead('Movimentações','Tudo o que entrou, saiu e voltou — numa linha do tempo',`${rpBtn('almoxarifado','movimentacoes')}`)
 +`<section class="card mtab axlt rise" style="--d:1"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="mvq" placeholder="Buscar item ou destino" value="${esc(S.mvq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todas',all.length],...Object.entries(MVT).map(([k,v])=>[k,v[0]+(c(k)===1?'':'s'),c(k)])].map(x=>`<button class="chipf ${S.mvf===x[0]?'on':''}" data-a="mvF" data-v="${x[0]}">${x[0]!=='todos'?`<i style="background:${MVT[x[0]][2]}"></i>`:''}${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div>
  <div id="mvL">${axMvList()}</div>
  <div class="tfoot"><span>Gerado a partir de empréstimos, devoluções, distribuições, transferências e ajustes de estoque.</span></div></section>`;};
function axTrList(){const T=DISTS.flatMap(d=>d.tr.map(t=>({it:itm(d.item),from:t.from||d.dest,...t,d:t.date}))),q=norm(S.trq),l=T.filter(t=>!q||norm(t.it.n+' '+t.from+' '+t.to).includes(q));
 if(!l.length)return '<div class="mempty"><p>Nada encontrado.</p><span>Nenhuma transferência corresponde a essa busca.</span></div>';
 return axLogRows(l,t=>`<li><span class="at axq">×${t.qty}</span><span class="adot" style="background:${MVT.tr[2]}"></span><span class="ab"><span><b>${esc(t.it.n)}</b> · <span class="aa" style="color:${MVT.tr[2]}">transferido</span> de <b>${esc(t.from)}</b> ${ic('arrowR',12,2)} <b>${esc(t.to)}</b></span></span></li>`);}
{const _t=axTrans;axTrans=function(){let h=_t.apply(this,arguments);const i=h.indexOf('<section class="card ax-feed rise"');if(i<0)return h;const j=h.indexOf('</section>',i)+10;
 return h.slice(0,i)+`<section class="card mtab axlt rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="trq" placeholder="Buscar item ou destino" value="${esc(S.trq)}" autocomplete="off"></label></div><div id="trL">${axTrList()}</div><div class="tfoot"><span>Repasses feitos a partir de Distribuições, sem passar pelo estoque central.</span></div></section>`+h.slice(j);};}
document.addEventListener('input',e=>{const id=e.target&&e.target.id;if(id==='mvq'){S.mvq=e.target.value;$('#mvL').innerHTML=axMvList();}else if(id==='trq'){S.trq=e.target.value;$('#trL').innerHTML=axTrList();}});

/* ---------- Ministérios: paginação que cabe na tela ---------- */
Object.assign(A,{mnPg:v=>{S.mnpg=+v;const b=$('#mnrows');if(b){b.innerHTML=mnRows();b.closest('.mtab').scrollIntoView({block:'nearest',behavior:'smooth'});}}});
function mnFit(){const box=$('#mnrows');if(!box||S.active!=='ministerios'||S.mini)return;const r=box.querySelector('.trow.mn:not(.thead)');if(!r)return;
 const top=box.getBoundingClientRect().top+window.scrollY,head=(box.querySelector('.thead')||{}).offsetHeight||0,foot=(box.querySelector('.tfoot')||{}).offsetHeight||52;
 const avail=window.innerHeight-Math.min(top,window.innerHeight*.55)-head-foot-28,pp=Math.max(4,Math.min(30,Math.floor(avail/r.offsetHeight)));
 if(pp!==(S.mnpp||8)){const first=((S.mnpg||1)-1)*(S.mnpp||8);S.mnpp=pp;S.mnpg=Math.floor(first/pp)+1;box.innerHTML=mnRows();}}
{const base=render;render=function(){const x=base.apply(this,arguments);requestAnimationFrame(mnFit);return x;};}
window.addEventListener('resize',()=>{clearTimeout(window._mnT);window._mnT=setTimeout(mnFit,150);});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='mnq')requestAnimationFrame(mnFit);});

