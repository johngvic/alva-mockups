/* ================= Relatórios (listas por domínio) ================= */
/* Menu Relatórios (Gestão) com um submenu por domínio. Cada submenu abre a mesma página: abas com os relatórios disponíveis,
   chips de situação do domínio, busca e filtros, tabela, escolha de colunas e exportação em CSV e PDF só do que está filtrado.
   Os botões "Exportar" dos módulos viraram o atalho "Relatórios", que abre o relatório do domínio. Análises (DRE, perfil,
   entradas e saídas) são outra coisa e ficam fora daqui. Exportar exige Editar ou Administrar no módulo (regra da documentação). */
const RP={},RP_ORDER=[];
function rpDef(key,l,lede,tabs){RP[key]={key,l,lede,tabs};RP_ORDER.push(key);}
const rpYes=b=>b?'Sim':'Não';
const rpD=d=>d?dBR(String(d).slice(0,10)):'—';
const rpCh=(k,l,c,b)=>[k,l,c||'var(--ink-muted)',b||'var(--surface-2)'];
const rpOk=['var(--st-int)','var(--st-int-bg)'],rpWarn=['var(--st-sol)','var(--st-sol-bg)'],rpBad=['var(--st-rec)','var(--st-rec-bg)'],rpOff=['var(--ink-muted)','var(--surface-2)'],rpInfo=['var(--st-ace)','var(--st-ace-bg)'];
const rpC=(k,l,t)=>rpCh(k,l,t[0],t[1]);
Object.assign(S,{rpTab:{},rpSt:{}});
const rpState=(d,t)=>S.rpSt[d+'/'+t]||(S.rpSt[d+'/'+t]={chip:'todos',q:'',f:{},hide:null,sort:null});
const rpTabOf=d=>RP[d].tabs.find(t=>t.k===S.rpTab[d])||RP[d].tabs[0];
const rpHidden=(T,st)=>st.hide||T.cols.filter(c=>c.off).map(c=>c.k);
const rpCols=(D,T)=>{const h=rpHidden(T,rpState(D.key,T.k));return T.cols.filter(c=>!h.includes(c.k));};
const rpFv=(st,f)=>st.f[f.k]!==undefined?st.f[f.k]:(f.def?f.def():'todos');
/* linhas depois dos filtros e da busca (sem o chip), usadas para contar os chips */
function rpBase(D,T){
 const st=rpState(D.key,T.k);let rows=T.rows();
 (T.fl||[]).forEach(f=>{const v=rpFv(st,f);if(v!==''&&v!=='todos')rows=rows.filter(r=>f.ok(r,v));});
 const q=norm(st.q||'');if(q){const cs=rpCols(D,T);rows=rows.filter(r=>norm(cs.map(c=>c.v(r)).join(' ')).includes(q));}
 return rows;
}
function rpFinal(D,T){
 const st=rpState(D.key,T.k);let rows=rpBase(D,T);
 if(T.chip&&st.chip!=='todos')rows=rows.filter(r=>T.chip.by(r)===st.chip);
 const so=st.sort||T.sort;
 if(so){const c=T.cols.find(x=>x.k===so.k);if(c){const key=r=>c.raw?c.raw(r):c.v(r);rows=rows.slice().sort((a,b)=>{const x=key(a),y=key(b);return (typeof x==='number'&&typeof y==='number'?x-y:String(x).localeCompare(String(y),'pt-BR',{numeric:true}))*so.d;});}}
 return rows;
}
const rpChipItems=(T,base)=>!T.chip?[]:typeof T.chip.items==='function'?T.chip.items(base):T.chip.items;
function rpFilterText(D,T){
 const st=rpState(D.key,T.k),p=[];
 if(T.chip&&st.chip!=='todos'){const it=rpChipItems(T,T.rows()).find(x=>x[0]===st.chip);p.push((T.chip.l||'Situação')+': '+(it?it[1]:st.chip));}
 (T.fl||[]).forEach(f=>{const v=rpFv(st,f);if(v!==''&&v!=='todos'){const o=f.opts().find(x=>String(x[0])===String(v));p.push(f.l+': '+(o?o[1]:v));}});
 if(st.q)p.push('Busca: “'+st.q+'”');
 return p.length?p.join(' · '):'Nenhum filtro (todos os registros)';
}
function rpBody(D,T){
 const rows=rpFinal(D,T),cols=rpCols(D,T),st=rpState(D.key,T.k),total=T.rows().length,so=st.sort||T.sort,show=rows.slice(0,200);
 const grid='grid-template-columns:'+cols.map(c=>c.n?'minmax(92px,.55fr)':'minmax(130px,1fr)').join(' ')+';min-width:'+cols.length*132+'px';
 return `<p class="rp-sum"><b>${rows.length}</b> de ${total} ${total===1?'registro':'registros'} · ${cols.length} ${cols.length===1?'coluna':'colunas'} <span>${esc(rpFilterText(D,T))}</span></p>
  ${rows.length?`<div class="rp-tw"><div class="rp-r head" style="${grid}">${cols.map(c=>`<button class="rp-th ${so&&so.k===c.k?'on':''} ${c.n?'num':''}" data-a="rptSort" data-v="${c.k}">${esc(c.l)}${so&&so.k===c.k?`<span class="sd ${so.d<0?'dn':''}">${ic('chevR',11,2.4)}</span>`:''}${c.s?`<i class="rp-lk" title="Dado pessoal">${ic('lock',10,2.4)}</i>`:''}</button>`).join('')}</div>
   ${show.map(r=>`<div class="rp-r" style="${grid}">${cols.map(c=>`<span class="${c.n?'num':''}" title="${esc(String(c.v(r)))}">${c.pill?c.pill(r):esc(String(c.v(r)))}</span>`).join('')}</div>`).join('')}</div>
   ${rows.length>200?`<p class="rp-more">Mostrando 200 de ${rows.length}. O arquivo exportado leva todos os ${rows.length}.</p>`:''}`
  :`<div class="mempty"><p>Nada por aqui.</p><span>Nenhum registro com esses filtros. <button class="lnk" data-a="rptClear">Limpar filtros</button></span></div>`}`;
}
function rpPage(key){
 const D=RP[key],T=rpTabOf(key),st=rpState(key,T.k),base=rpBase(D,T);
 const items=rpChipItems(T,T.rows());
 return sxHead('Relatórios',D.l,D.lede,`<button class="btn sec" data-a="rptCols">${ic('sliders',15)}Colunas</button><button class="btn sec" data-a="rptPdf">${ic('file',15)}Gerar PDF</button><button class="btn pri" data-a="rptCsv">${ic('download',15)}Exportar CSV</button>`)
 +(D.tabs.length>1?sxSeg('rptTab',D.tabs.map(t=>[t.k,t.l]),T.k):'')
 +`<div class="sx-note rise" style="--d:2;--c:var(--brand-text)">${ic('shield',17,2)}<span>${key==='multi'?'<b>Escopo: toda a organização.</b> <small>Vê, filtra e exporta as igrejas e regionais a que a pessoa tem acesso, não só a igreja ativa. ':'<b>Escopo: toda a igreja.</b> <small>Quem tem acesso só a uma Casa ou a um ministério vê, filtra e exporta só o que é dele. '}${esc(T.note||'Exportar PDF e CSV exige Editar ou Administrar neste módulo.')}</small></span></div>`
 +`<section class="card sx-list rise" style="--d:3"><div class="sx-bar"><label class="sbox">${ic('search',16)}<input data-rpq placeholder="Buscar nos campos mostrados" value="${esc(st.q||'')}" autocomplete="off"></label>
   ${(T.fl||[]).map(f=>`<label class="fld sx-mes"><span class="selw"><select data-rps="${f.k}" aria-label="${esc(f.l)}"><option value="todos">${esc(f.l)}: todos</option>${f.opts().map(o=>`<option value="${esc(o[0])}" ${String(rpFv(st,f))===String(o[0])?'selected':''}>${esc(o[1])}</option>`).join('')}</select>${ic('updown',14)}</span></label>`).join('')}</div>
  ${T.chip?`<div class="sx-bar" style="padding-top:0"><div class="chips">${[['todos','Todos',null,null],...items].map(it=>`<button class="chipf ${st.chip===it[0]?'on':''}" data-a="rptChip" data-v="${it[0]}">${it[0]!=='todos'?`<i style="background:${it[2]}"></i>`:''}${esc(it[1])}<small>${it[0]==='todos'?base.length:base.filter(r=>T.chip.by(r)===it[0]).length}</small></button>`).join('')}</div></div>`:''}
  <div id="rpBody">${rpBody(D,T)}</div></section>`;
}
/* exportações: CSV de verdade (baixa no navegador) e PDF em pré-visualização; os dois levam só o que está filtrado e as colunas escolhidas */
const rpAct=()=>{const k=S.active.slice(3),D=RP[k];return {D,T:rpTabOf(k)};};
const rpNum=n=>String(n).replace('.',',');
function rpLogExp(D,T,kind,n,cols){const sens=cols.some(c=>c.s);sxLog('Exportou','Relatório',D.l+' · '+T.l,kind+' · '+n+' linhas, '+cols.length+' colunas'+(sens?' (com dados pessoais)':''));}
function rpCsv(){
 const {D,T}=rpAct(),rows=rpFinal(D,T),cols=rpCols(D,T);
 const q=v=>{const s=String(v);return /[;"\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
 const lines=[cols.map(c=>q(c.l)).join(';'),...rows.map(r=>cols.map(c=>q(c.raw&&typeof c.raw(r)==='number'?rpNum(c.raw(r)):c.v(r))).join(';'))];
 const name=`relatorio-${D.key}-${T.k}-${SX_TODAY}.csv`;
 try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},600);}catch(e){}
 rpLogExp(D,T,'CSV',rows.length,cols);toast(`CSV gerado: ${rows.length} linhas e ${cols.length} colunas (${name})`);
}
function rpPdf(){
 const {D,T}=rpAct(),rows=rpFinal(D,T),cols=rpCols(D,T),pages=Math.max(1,Math.ceil(rows.length/28)),show=rows.slice(0,14);
 const ch=CHURCHES[S.church];
 openDlg(dlgHead('Pré-visualização do PDF',`${esc(D.l)} · ${esc(T.l)} · ${rows.length} ${rows.length===1?'linha':'linhas'}`)
  +`<div class="sx-paper rp-paper"><div class="rp-ph"><span>${sunMark(16)}<b>${esc(ch.n)}</b></span><small>Gerado em ${dBR(SX_TODAY)} por ${esc(sxMe)}</small></div>
   <h2>${esc(D.l.toUpperCase())} · ${esc(T.l.toUpperCase())}</h2><p class="rp-fl">${esc(rpFilterText(D,T))}</p>
   <div class="rp-pt"><div class="rp-pr h" style="grid-template-columns:repeat(${cols.length},1fr)">${cols.map(c=>`<b>${esc(c.l)}</b>`).join('')}</div>${show.map(r=>`<div class="rp-pr" style="grid-template-columns:repeat(${cols.length},1fr)">${cols.map(c=>`<span>${esc(String(c.v(r)))}</span>`).join('')}</div>`).join('')}</div>
   ${rows.length>show.length?`<p class="rp-pm">… e mais ${rows.length-show.length} linhas nas ${pages} páginas do arquivo.</p>`:''}
   <div class="rp-pf"><span>${esc(ch.n)} · relatório de lista</span><span>Página 1 de ${pages}</span></div></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="rptPdfGo">${ic('download',15)}Baixar PDF</button></div>`,'sc-dlg sc-wide');
}
function rpColsDlg(){
 const {D,T}=rpAct(),h=rpHidden(T,rpState(D.key,T.k));
 sxDlg('Colunas do relatório','Valem para a tela, o CSV e o PDF.',
  `<div class="rp-cl">${T.cols.map(c=>`<label class="chk3"><input type="checkbox" name="c" value="${c.k}" ${h.includes(c.k)?'':'checked'}><span>${esc(c.l)}${c.s?` <em class="rp-sens">${ic('lock',11,2.2)}dado pessoal</em>`:''}</span></label>`).join('')}</div>
   <p class="hint">Dados pessoais, como telefone, e-mail, endereço e nascimento, vêm desmarcados. Marque só o que o relatório precisa mostrar.</p>`,
  `<button type="button" class="btn sec" id="rpColsReset">Restaurar padrão</button>${sxOk('Aplicar')}`);
 const f=$('#sxF');
 $('#rpColsReset').onclick=()=>{rpState(D.key,T.k).hide=null;closeDlg();render();};
 f.onsubmit=e=>{e.preventDefault();const on=[...f.querySelectorAll('input[name=c]:checked')].map(x=>x.value);if(!on.length){toast('Escolha ao menos uma coluna');return;}rpState(D.key,T.k).hide=T.cols.map(c=>c.k).filter(k=>!on.includes(k));closeDlg();render();};
}
function rpBtn(dom,tab,label){return `<button class="btn sec" data-a="rptGo" data-v="${dom}|${tab||''}">${ic('clipboard',15)}${label||'Relatórios'}</button>`;}
Object.assign(A,{
 rptGo:v=>{const [d,t]=v.split('|');if(!RP[d])return;if(t&&RP[d].tabs.some(x=>x.k===t))S.rpTab[d]=t;A.nav('rp-'+d);},
 rptTab:v=>{const k=S.active.slice(3);S.rpTab[k]=v;render();},
 rptChip:v=>{const {D,T}=rpAct();rpState(D.key,T.k).chip=v;render();},
 rptSort:v=>{const {D,T}=rpAct(),st=rpState(D.key,T.k),c=st.sort||T.sort;st.sort=c&&c.k===v?{k:v,d:-c.d}:{k:v,d:1};render();},
 rptClear:()=>{const {D,T}=rpAct(),st=rpState(D.key,T.k);st.chip='todos';st.q='';st.f={};(T.fl||[]).forEach(f=>{st.f[f.k]='todos';});render();},
 rptCols:()=>rpColsDlg(),rptCsv:()=>rpCsv(),rptPdf:()=>rpPdf(),
 rptPdfGo:()=>{const {D,T}=rpAct(),rows=rpFinal(D,T),cols=rpCols(D,T);rpLogExp(D,T,'PDF',rows.length,cols);closeDlg();toast(`PDF gerado: ${rows.length} linhas (simulado)`);}
});
ACOL.Exportou='var(--st-sol)';ACOL.Enviou='var(--st-int)';
document.addEventListener('input',e=>{const t=e.target;if(!t||!t.hasAttribute||!t.hasAttribute('data-rpq')||!S.active||S.active.slice(0,3)!=='rp-')return;const {D,T}=rpAct();rpState(D.key,T.k).q=t.value;$('#rpBody').innerHTML=rpBody(D,T);});
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.dataset||t.dataset.rps===undefined||!S.active||S.active.slice(0,3)!=='rp-')return;const {D,T}=rpAct();rpState(D.key,T.k).f[t.dataset.rps]=t.value;render();});

/* ---------- definições dos relatórios, por domínio ---------- */
const rpCol=(k,l,v,o)=>Object.assign({k,l,v},o||{});
const rpMonths=()=>MONTHS.map((n,i)=>[String(i+1),n[0].toUpperCase()+n.slice(1)]);
const rpUniq=(l)=>[...new Set(l.filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),'pt-BR')).map(x=>[x,x]);
const rpAddr=a=>a?[a.rua,a.num,a.bairro,a.cid&&a.uf?a.cid+'/'+a.uf:''].filter(Boolean).join(', '):'—';
const rpDays=d=>d?-inDays(String(d).slice(0,10)):null;
const rpPres=c=>{const l=c.meets.slice(0,4);if(!l.length||!c.ppl.length)return 0;const t=l.reduce((n,m)=>n+c.ppl.filter(p=>m.pres[p.id]).length,0);return Math.round(t/(l.length*c.ppl.length)*100);};

rpDef('membros','Membros','Lista de membros com situação, integração e ministérios. Filtre e gere PDF ou CSV só do que você precisa.',[
 {k:'membros',l:'Membros',rows:()=>MEMBERS.slice(),
  chip:{l:'Situação',by:r=>sxSitOf(r)||'nao',items:[...Object.keys(SX_SITS).map(k=>rpCh(k,SX_SITS[k][0],SX_SITS[k][1])),rpCh('nao','Não integrados','var(--st-ace)')]},
  fl:[{k:'min',l:'Ministério',opts:()=>MIN_ALL.map(m=>[m,m]),ok:(r,v)=>r.min.includes(v)},{k:'bap',l:'Batismo',opts:()=>[['s','Batizados'],['n','Não batizados']],ok:(r,v)=>v==='s'?r.bap:!r.bap},{k:'int',l:'Integração',opts:()=>[...new Set(MEMBERS.map(m=>m.int))].sort().reverse().map(k=>[k,monthLabel(k)]),ok:(r,v)=>r.int===v}],
  cols:[rpCol('n','Nome',r=>r.n),rpCol('sit','Situação',r=>sxSitOf(r)?SX_SITS[sxSitOf(r)][0]:'Em integração'),rpCol('st','Integração',r=>ST[r.st].l),rpCol('int','Integrada em',r=>monthLabel(r.int)),rpCol('min','Ministérios',r=>r.min.join(', ')||'—'),rpCol('bap','Batizado',r=>rpYes(r.bap)),rpCol('tit','Titular',r=>rpYes(r.tit),{off:true}),rpCol('e','E-mail',r=>r.e||'—',{s:1,off:true}),rpCol('ph','Telefone',r=>r.ph||'—',{s:1,off:true}),rpCol('nasc','Nascimento',r=>rpD(r.nasc),{s:1,off:true})]},
 {k:'aniv',l:'Aniversariantes',rows:()=>MEMBERS.filter(m=>m.nasc&&['ativo','afastado'].includes(sxSitOf(m))),sort:{k:'dia',d:1},note:'Exportar PDF e CSV exige Editar ou Administrar neste módulo. Respeita a preferência de aniversário de cada pessoa, quando a fundação a definir.',
  fl:[{k:'mes',l:'Mês',def:()=>'9',opts:rpMonths,ok:(r,v)=>+r.nasc.slice(5,7)===+v}],
  cols:[rpCol('n','Nome',r=>r.n),rpCol('dia','Dia',r=>r.nasc.slice(8)+'/'+r.nasc.slice(5,7),{raw:r=>+r.nasc.slice(5,7)*100+ +r.nasc.slice(8)}),rpCol('idade','Faz',r=>(2026-+r.nasc.slice(0,4))+' anos',{n:1,raw:r=>2026-+r.nasc.slice(0,4)}),rpCol('min','Ministérios',r=>r.min.join(', ')||'—'),rpCol('ph','Telefone',r=>r.ph||'—',{s:1,off:true})]},
 {k:'familia',l:'Por família',rows:()=>MEMBERS.filter(m=>m.tit&&m.st==='integrado'),
  cols:[rpCol('n','Titular',r=>r.n),rpCol('fam','Familiares',r=>r.fam.map(f=>(byId(f[0])?byId(f[0]).n:'—')+' ('+f[1]+')').join('; ')||'—'),rpCol('q','Pessoas',r=>1+r.fam.length,{n:1}),rpCol('addr','Endereço',r=>rpAddr(r.addr),{s:1,off:true}),rpCol('ph','Telefone',r=>r.ph||'—',{s:1,off:true})]}
]);

rpDef('integracao','Integração','Pessoas em integração e as turmas, com a etapa de cada uma.',[
 {k:'pessoas',l:'Pessoas',rows:()=>INTEGS.flatMap(i=>i.ppl.map(p=>Object.assign({turma:i.n},p))),
  chip:{l:'Situação',by:r=>r.st,items:['pendente','aceito','andamento','integrado'].map(k=>rpCh(k,IST[k][0],IST[k][1]))},
  fl:[{k:'turma',l:'Integração',opts:()=>INTEGS.map(i=>[i.n,i.n]),ok:(r,v)=>r.turma===v}],
  cols:[rpCol('n','Nome',r=>r.n),rpCol('turma','Integração',r=>r.turma),rpCol('st','Situação',r=>IST[r.st][0]),rpCol('step','Etapa',r=>r.step+' de 5',{raw:r=>r.step}),rpCol('ph','Telefone',r=>r.ph||'—',{s:1,off:true})]},
 {k:'turmas',l:'Integrações',rows:()=>INTEGS.slice(),
  cols:[rpCol('n','Integração',r=>r.n),rpCol('date','Data',r=>rpD(r.date)),rpCol('time','Horário',r=>r.time||'—'),rpCol('q','Pessoas',r=>r.ppl.length,{n:1}),rpCol('ok','Integradas',r=>r.ppl.filter(p=>p.st==='integrado').length,{n:1}),rpCol('and','Em etapas',r=>r.ppl.filter(p=>p.st==='andamento').length,{n:1}),rpCol('lim','Limite',r=>r.limit||'—',{n:1}),rpCol('resp','Responsável',r=>{const m=byId(r.resp);return m?m.n:'—';}),rpCol('cur','Atual',r=>rpYes(r.current))]}
]);

rpDef('discipulado','Discipulado','Quem discipula quem, o ritmo de contato e o último encontro.',[
 {k:'pares',l:'Discípulos e discipuladores',rows:()=>DISC.filter(d=>d.parent),
  chip:{l:'Situação',by:r=>dStatus(r),items:['emdia','atrasado','pausado'].map(k=>rpCh(k,DST[k][0],DST[k][1]))},
  fl:[{k:'par',l:'Discipulador',opts:()=>rpUniq(DISC.filter(d=>d.parent).map(d=>(DISC.find(x=>x.id===d.parent)||{}).n)),ok:(r,v)=>(DISC.find(x=>x.id===r.parent)||{}).n===v}],
  cols:[rpCol('n','Discípulo',r=>r.n.replace('Pr. ','')),rpCol('par','Discipulador',r=>(DISC.find(x=>x.id===r.parent)||{n:'—'}).n),rpCol('role','Papel',r=>r.role),rpCol('stage','Etapa',r=>r.stage?TRILHA[r.stage-1]:'—'),rpCol('rhy','Ritmo',r=>RHY[r.rhythm]||'—'),rpCol('last','Último contato',r=>dLbl(r.last),{raw:r=>r.last}),rpCol('enc','Encontros',r=>r.meets.length,{n:1}),rpCol('st','Situação',r=>DST[dStatus(r)][0])]}
]);

rpDef('acompanhamento','Acompanhamento','Casos de acompanhamento pastoral: quem cuida, desde quando e o último contato.',[
 {k:'casos',l:'Casos',rows:()=>CASES.slice(),note:'Descrição e anotações do caso nunca entram no relatório.',
  chip:{l:'Situação',by:r=>r.st,items:['urgente','acompanhando','resolvido'].map(k=>rpCh(k,CST[k][0],CST[k][1]))},
  fl:[{k:'resp',l:'Responsável',opts:()=>rpUniq(CASES.map(c=>c.resp)),ok:(r,v)=>r.resp===v},{k:'tipo',l:'Tipo',opts:()=>rpUniq(CASES.map(c=>c.type)),ok:(r,v)=>r.type===v}],
  cols:[rpCol('n','Pessoa',r=>r.n),rpCol('type','Tipo',r=>r.type),rpCol('st','Situação',r=>CST[r.st][0]),rpCol('resp','Responsável',r=>r.resp),rpCol('op','Aberto em',r=>rpD(r.opened),{raw:r=>r.opened}),rpCol('last','Último contato',r=>rpD(r.meets[0]&&r.meets[0].d),{raw:r=>r.meets[0]?r.meets[0].d:''}),rpCol('q','Encontros',r=>r.meets.length,{n:1}),rpCol('rs','Restrito',r=>rpYes(r.restr))]}
]);

rpDef('oracao','Pedidos de oração','Pedidos de oração e quantas pessoas estão intercedendo. O texto do pedido não entra no relatório.',[
 {k:'pedidos',l:'Pedidos',rows:()=>PRAYERS.slice(),note:'O texto do pedido nunca entra no relatório.',
  chip:{l:'Situação',by:r=>r.st,items:rows=>[...new Set(rows.map(r=>r.st))].map(k=>rpCh(k,k==='ativo'?'Em oração':k==='respondido'?'Respondido':k[0].toUpperCase()+k.slice(1),k==='respondido'?'var(--st-int)':'var(--st-sol)'))},
  cols:[rpCol('n','Solicitante',r=>r.priv?'Pedido privado':r.n),rpCol('when','Há',r=>r.when===0?'hoje':r.when+' dias',{raw:r=>r.when}),rpCol('cnt','Intercessores',r=>r.count,{n:1}),rpCol('st','Situação',r=>r.st==='ativo'?'Em oração':r.st==='respondido'?'Respondido':r.st),rpCol('priv','Privado',r=>rpYes(r.priv))]}
]);

rpDef('casas','Casas de Apascentamento','Casas, participantes, presença nos últimos encontros e redes de casa.',[
 {k:'casas',l:'Casas',rows:()=>CASAS.slice(),
  chip:{l:'Encontros',by:r=>(rpDays(r.meets[0]&&r.meets[0].d)||0)>(r.late||14)?'atrasada':'emdia',items:[rpC('emdia','Em dia (dentro do limite da casa)',rpOk),rpC('atrasada','Atrasada (acima do limite da casa)',rpWarn)]},
  fl:[{k:'rede',l:'Rede',opts:()=>REDES.map(r=>[r.n,r.n]),ok:(r,v)=>{const x=casaRede(r.id);return x&&x.n===v;}}],
  cols:[rpCol('n','Casa',r=>r.n),rpCol('leader','Líder',r=>r.leader),rpCol('host','Anfitrião',r=>r.host),rpCol('q','Participantes',r=>r.ppl.length,{n:1}),rpCol('enc','Encontros',r=>r.meets.length,{n:1}),rpCol('last','Último encontro',r=>rpD(r.meets[0]&&r.meets[0].d),{raw:r=>r.meets[0]?r.meets[0].d:''}),rpCol('pr','Presença média',r=>rpPres(r)+'%',{n:1,raw:r=>rpPres(r)}),rpCol('rede','Rede',r=>{const x=casaRede(r.id);return x?x.n:'—';}),rpCol('addr','Endereço',r=>r.addr||'—',{s:1,off:true}),rpCol('ph','Telefone',r=>r.phone||'—',{s:1,off:true})]},
 {k:'participantes',l:'Participantes',rows:()=>CASAS.flatMap(c=>c.ppl.map(p=>Object.assign({casa:c.n,c},p))),
  chip:{l:'Função',by:r=>r.role,items:['Líder','Anfitrião','Participante'].map(k=>rpCh(k,k))},
  fl:[{k:'casa',l:'Casa',opts:()=>CASAS.map(c=>[c.n,c.n]),ok:(r,v)=>r.casa===v}],
  cols:[rpCol('n','Nome',r=>r.n),rpCol('casa','Casa',r=>r.casa),rpCol('role','Função',r=>r.role),rpCol('since','Desde',r=>r.since||'—'),rpCol('pr','Presença (8 encontros)',r=>{const l=r.c.meets;return l.length?Math.round(l.filter(m=>m.pres[r.id]).length/l.length*100)+'%':'—';},{n:1,raw:r=>{const l=r.c.meets;return l.length?Math.round(l.filter(m=>m.pres[r.id]).length/l.length*100):0;}})]},
 {k:'presenca',l:'Últimos encontros',rows:()=>CASAS.flatMap(c=>c.meets.slice(0,4).map(m=>({casa:c.n,m,c}))).sort((a,b)=>a.m.d<b.m.d?1:-1),
  fl:[{k:'casa',l:'Casa',opts:()=>CASAS.map(c=>[c.n,c.n]),ok:(r,v)=>r.casa===v}],
  cols:[rpCol('d','Data',r=>rpD(r.m.d),{raw:r=>r.m.d}),rpCol('casa','Casa',r=>r.casa),rpCol('desc','Assunto',r=>r.m.desc||'—'),rpCol('pres','Presentes',r=>r.c.ppl.filter(p=>r.m.pres[p.id]).length+' de '+r.c.ppl.length),rpCol('pc','Presença',r=>Math.round(r.c.ppl.filter(p=>r.m.pres[p.id]).length/Math.max(1,r.c.ppl.length)*100)+'%',{n:1,raw:r=>Math.round(r.c.ppl.filter(p=>r.m.pres[p.id]).length/Math.max(1,r.c.ppl.length)*100)})]},
 {k:'redes',l:'Redes',rows:()=>REDES.slice(),
  cols:[rpCol('n','Rede',r=>r.n),rpCol('sup','Supervisor',r=>r.sup),rpCol('q','Casas',r=>r.casas.length,{n:1}),rpCol('p','Participantes',r=>r.casas.reduce((n,h)=>n+(hById(h)?hById(h).ppl.length:0),0),{n:1}),rpCol('cs','Casas da rede',r=>r.casas.map(h=>hById(h)?hById(h).n:'').filter(Boolean).join('; '))]}
]);

rpDef('ministerios','Ministérios','Ministérios, líderes, times e membros por ministério.',[
 {k:'lista',l:'Ministérios',rows:()=>MINIS.slice(),
  chip:{l:'Situação',by:r=>r.active?'on':'off',items:[rpC('on','Ativos',rpOk),rpC('off','Inativos',rpOff)]},
  cols:[rpCol('n','Ministério',r=>r.n),rpCol('lead','Líder',r=>r.lead),rpCol('mem','Membros',r=>r.mem,{n:1}),rpCol('teams','Times',r=>r.teamsN,{n:1}),rpCol('st','Situação',r=>r.active?'Ativo':'Inativo'),rpCol('ph','Telefone',r=>r.phone,{off:true})]},
 {k:'membros',l:'Membros por ministério',rows:()=>MEMBERS.flatMap(m=>m.min.map(x=>({m,min:x}))),
  fl:[{k:'min',l:'Ministério',opts:()=>MIN_ALL.map(x=>[x,x]),ok:(r,v)=>r.min===v}],
  cols:[rpCol('min','Ministério',r=>r.min),rpCol('n','Membro',r=>r.m.n),rpCol('role','Função',r=>r.m.role),rpCol('since','Desde',r=>r.m.since),rpCol('ph','Telefone',r=>r.m.ph||'—',{s:1,off:true})]}
]);

rpDef('kids','Kids','Salas, turmas e times do Ministério Infantil.',[
 {k:'salas',l:'Salas',rows:()=>SALAS.slice(),
  chip:{l:'Situação',by:r=>r.active?'on':'off',items:[rpC('on','Ativas',rpOk),rpC('off','Inativas',rpOff)]},
  cols:[rpCol('n','Sala',r=>r.n),rpCol('t','Turma',r=>(tById(r.turma)||{n:'—'}).n),rpCol('age','Faixa etária',r=>{const t=tById(r.turma);return t?t.min+' a '+t.max+' anos':'—';}),rpCol('cap','Capacidade',r=>r.cap,{n:1}),rpCol('team','Time',r=>(kTeamOf(r)&&kTeamOf(r).n)||'Sem time')]},
 {k:'turmas',l:'Turmas',rows:()=>TURMAS.slice(),
  cols:[rpCol('n','Turma',r=>r.n),rpCol('age','Faixa etária',r=>faixa(r)),rpCol('sl','Salas',r=>SALAS.filter(s=>s.turma===r.id).map(s=>s.n).join(', ')||'Sem sala'),rpCol('st','Situação',r=>'Ativa'),rpCol('aula','Aula da semana',r=>{const a=kAulaDe(r);return a.length?a[0].t:'—';})]},
 {k:'times',l:'Times e voluntários',rows:()=>kTeams().flatMap(t=>t.ppl.map(p=>({t,p}))),
  fl:[{k:'time',l:'Time',opts:()=>kTeams().map(t=>[t.n,t.n]),ok:(r,v)=>r.t.n===v}],
  cols:[rpCol('t','Time',r=>r.t.n),rpCol('s','Salas atendidas',r=>SALAS.filter(s=>kTeamOf(s)===r.t).map(s=>s.n).join(', ')||'—'),rpCol('v','Voluntário',r=>r.p),rpCol('c','Cargo',r=>r.p===r.t.lead?'Líder':'Voluntário')]}
]);

const rpEvRows=()=>EVTS.slice();
const rpEvCols=()=>[rpCol('t','Título',r=>r.t),rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('time','Horário',r=>r.time||'—'),rpCol('place','Local',r=>r.place||'—'),rpCol('type','Tipo',r=>r.type||'—'),rpCol('min','Ministério',r=>r.min||'—'),rpCol('st','Situação',r=>r.st||'—'),rpCol('regs','Inscritos',r=>r.regs.length,{n:1}),rpCol('cer','Bebês, pessoas ou casais',r=>isCer(r)?ceList(r).length:'—',{n:1}),rpCol('cap','Vagas',r=>r.cap||'—',{n:1}),rpCol('price','Valor',r=>r.paid?brl2(r.price):'Gratuito',{n:1,raw:r=>r.paid?r.price:0})];
rpDef('agenda','Agenda e eventos','Eventos de todos os tipos (cultos, apresentações, batismos, consagrações, casamentos, retiros…), inscrições e o financeiro de cada evento.',[
 {k:'eventos',l:'Eventos',rows:()=>rpEvRows(),chip:{l:'Situação',by:r=>r.st,items:rows=>rpUniq(rows.map(r=>r.st)).map(x=>rpCh(x[0],x[0][0].toUpperCase()+x[0].slice(1)))},fl:[{k:'type',l:'Tipo',opts:()=>ETYPES.map(t=>[t,t]),ok:(r,v)=>r.type===v}],cols:rpEvCols()},
 {k:'inscricoes',l:'Inscrições',rows:()=>EVTS.flatMap(e=>e.regs.map(r=>Object.assign({e},r))),
  chip:{l:'Pagamento',by:r=>r.pay,items:[rpC('pago','Pagas',rpOk),rpC('pendente','Pendentes',rpWarn),rpC('—','Gratuitas',rpOff)]},
  fl:[{k:'ev',l:'Evento',opts:()=>EVTS.filter(e=>e.regs.length).map(e=>[e.id,e.t]),ok:(r,v)=>r.e.id===v}],
  cols:[rpCol('n','Inscrito',r=>r.n),rpCol('ev','Evento',r=>r.e.t),rpCol('ed','Data do evento',r=>rpD(r.e.d),{raw:r=>r.e.d}),rpCol('d','Inscrição em',r=>rpD(r.d),{raw:r=>r.d}),rpCol('pay','Pagamento',r=>r.pay==='pago'?'Pago':r.pay==='pendente'?'Pendente':'Gratuita'),rpCol('val','Valor',r=>brl2(r.val),{n:1,raw:r=>r.val}),rpCol('vch','Voucher',r=>r.vch||'—')]},
 {k:'financeiro',l:'Financeiro do evento',note:'Cada recorte mostra o mesmo dinheiro por um ângulo: ingressos mais compras adicionais somam o mesmo total de Forma de pagamento; Descontos mostra o quanto foi abatido. Exportar PDF e CSV exige Editar ou Administrar neste módulo.',
  rows:()=>evFinRepRows(),
  chip:{l:'Recorte',by:r=>r.g,items:[rpC('ing','Por ingresso',rpOk),rpC('buy','Compras adicionais',rpInfo),rpC('pay','Forma de pagamento',rpWarn),rpC('dsc','Descontos',rpOff)]},
  fl:[{k:'ev',l:'Evento',def:()=>{const l=evFinRepRows();return l.length?l[0].e.id:'todos';},opts:()=>[...new Map(evFinRepRows().map(r=>[r.e.id,r.e.t])).entries()],ok:(r,v)=>r.e.id===v}],
  cols:[rpCol('ev','Evento',r=>r.e.t),rpCol('g','Recorte',r=>({ing:'Ingresso',buy:'Compra adicional',pay:'Forma de pagamento',dsc:'Desconto'})[r.g]),rpCol('lab','Item',r=>r.lab),rpCol('q','Quantidade',r=>r.q,{n:1}),rpCol('gross','Bruto',r=>r.gross<0?'− '+brl2(-r.gross):brl2(r.gross),{n:1,raw:r=>r.gross}),rpCol('fee','Taxa',r=>r.g==='dsc'?'—':brl2(r.fee),{n:1,raw:r=>r.g==='dsc'?'':r.fee}),rpCol('net','Líquido',r=>r.g==='dsc'?'—':brl2(r.gross-r.fee),{n:1,raw:r=>r.g==='dsc'?'':Math.round((r.gross-r.fee)*100)/100}),rpCol('rec','A receber',r=>r.g==='dsc'?'—':brl2(r.rec),{n:1,raw:r=>r.g==='dsc'?'':r.rec})]}
]);
S.rpSt['agenda/financeiro']={chip:'ing',q:'',f:{},hide:null,sort:null};

rpDef('escalas','Escalas','Escalas por ministério, datas e pessoas escaladas.',[
 {k:'escalas',l:'Escalas',rows:()=>ESCALAS.slice(),
  chip:{l:'Situação',by:r=>r.st,items:rows=>rpUniq(rows.map(r=>r.st)).map(x=>rpCh(x[0],x[0][0].toUpperCase()+x[0].slice(1)))},
  fl:[{k:'min',l:'Ministério',opts:()=>rpUniq(ESCALAS.map(e=>e.min)),ok:(r,v)=>r.min===v}],
  cols:[rpCol('n','Escala',r=>r.n),rpCol('min','Ministério',r=>r.min),rpCol('st','Situação',r=>r.st),rpCol('dt','Datas',r=>r.dates.length,{n:1}),rpCol('per','Período',r=>{const l=r.dates.map(d=>(EVTS.find(e=>e.id===d.ev)||{}).d).filter(Boolean).sort();return l.length?rpD(l[0])+(l.length>1?' a '+rpD(l[l.length-1]):''):'—';}),rpCol('ppl','Pessoas escaladas',r=>new Set(r.dates.flatMap(d=>d.blocks.flatMap(b=>b.members.map(m=>m.n)))).size,{n:1})]},
 {k:'impressao',l:'Para imprimir',note:'Escala por data e bloco, pronta para o PDF impresso.',sort:{k:'d',d:1},rows:()=>ESCALAS.flatMap(e=>e.dates.flatMap(d=>d.blocks.map(b=>({e,d,b})))),
  fl:[{k:'e',l:'Escala',opts:()=>ESCALAS.map(e=>[e.id,e.n]),ok:(r,v)=>r.e.id===v}],
  cols:[rpCol('d','Data',r=>rpD((EVTS.find(x=>x.id===r.d.ev)||{}).d),{raw:r=>(EVTS.find(x=>x.id===r.d.ev)||{}).d||''}),rpCol('ev','Culto ou evento',r=>(EVTS.find(x=>x.id===r.d.ev)||{t:'—'}).t),rpCol('e','Escala',r=>r.e.n),rpCol('b','Bloco',r=>r.b.label||'—'),rpCol('eq','Equipe',r=>r.b.members.map(m=>m.n+(m.role?' ('+m.role+')':'')).join('; ')||'—'),rpCol('c','Repertório e materiais',r=>r.b.content.map(c=>c.t+(c.d?' · '+c.d:'')).join('; ')||'—')]},
 {k:'pessoas',l:'Pessoas escaladas',rows:()=>ESCALAS.flatMap(e=>e.dates.flatMap(d=>d.blocks.flatMap(b=>b.members.map(m=>({e,d,b,m}))))),
  chip:{l:'Resposta',by:r=>r.m.st,items:rows=>rpUniq(rows.map(r=>r.m.st)).map(x=>rpCh(x[0],x[0][0].toUpperCase()+x[0].slice(1)))},
  fl:[{k:'e',l:'Escala',opts:()=>ESCALAS.map(e=>[e.id,e.n]),ok:(r,v)=>r.e.id===v}],
  cols:[rpCol('n','Pessoa',r=>r.m.n),rpCol('role','Função',r=>r.m.role||'—'),rpCol('e','Escala',r=>r.e.n),rpCol('d','Data',r=>rpD((EVTS.find(x=>x.id===r.d.ev)||{}).d),{raw:r=>(EVTS.find(x=>x.id===r.d.ev)||{}).d||''}),rpCol('b','Bloco',r=>r.b.label||'—'),rpCol('st','Resposta',r=>r.m.st)]}
]);

rpDef('espacos','Espaços','Reservas de salas e espaços.',[
 {k:'reservas',l:'Reservas',rows:()=>RESERVAS.slice(),
  chip:{l:'Situação',by:r=>r.st,items:rows=>rpUniq(rows.map(r=>r.st)).map(x=>rpCh(x[0],x[0][0].toUpperCase()+x[0].slice(1)))},
  fl:[{k:'s',l:'Sala',opts:()=>ESPS.map(s=>[s.id,s.n]),ok:(r,v)=>r.s===v}],
  cols:[rpCol('s','Sala',r=>(ESPS.find(x=>x.id===r.s)||{n:'—'}).n),rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('f','Início',r=>r.f),rpCol('t','Fim',r=>r.t),rpCol('p','Pessoas',r=>r.p,{n:1}),rpCol('who','Solicitante',r=>r.who),rpCol('why','Finalidade',r=>r.why||'—'),rpCol('st','Situação',r=>r.st),rpCol('reason','Motivo',r=>r.reason||'—',{off:true})]}
]);

const rpLoanDone=l=>l.back.reduce((n,b)=>n+b[0],0);
rpDef('almoxarifado','Almoxarifado','Itens, empréstimos e movimentações do estoque.',[
 {k:'itens',l:'Itens',rows:()=>ITEMS.slice(),
  fl:[{k:'cat',l:'Categoria',opts:()=>ICATS.map(c=>[c.id,c.n]),ok:(r,v)=>r.cat===v}],
  cols:[rpCol('n','Item',r=>r.n),rpCol('sku','Código',r=>r.sku||'—'),rpCol('cat','Categoria',r=>(ICATS.find(c=>c.id===r.cat)||{n:'—'}).n),rpCol('tipo','Tipo',r=>r.tipo==='emp'?'Emprestável':'Consumível'),rpCol('tot','Total',r=>r.total,{n:1}),rpCol('out','Emprestados',r=>LOANS.filter(l=>l.item===r.id).reduce((n,l)=>n+l.qty-rpLoanDone(l),0),{n:1}),rpCol('av','Disponíveis',r=>r.total-LOANS.filter(l=>l.item===r.id).reduce((n,l)=>n+l.qty-rpLoanDone(l),0),{n:1})]},
 {k:'emprestimos',l:'Empréstimos',rows:()=>LOANS.slice(),
  chip:{l:'Situação',by:r=>rpLoanDone(r)>=r.qty?'dev':r.due<SX_TODAY?'atr':'ab',items:[rpC('ab','Em aberto',rpWarn),rpC('atr','Atrasados',rpBad),rpC('dev','Devolvidos',rpOk)]},
  cols:[rpCol('it','Item',r=>(itm(r.item)||{n:'—'}).n),rpCol('q','Quantidade',r=>r.qty,{n:1}),rpCol('who','Quem',r=>r.who),rpCol('from','Saída',r=>rpD(r.from),{raw:r=>r.from}),rpCol('due','Prazo',r=>rpD(r.due),{raw:r=>r.due}),rpCol('back','Devolvido',r=>rpLoanDone(r)+' de '+r.qty,{n:1}),rpCol('st','Situação',r=>rpLoanDone(r)>=r.qty?'Devolvido':r.due<SX_TODAY?'Atrasado':'Em aberto')]},
 {k:'movimentacoes',l:'Movimentações',rows:()=>moves(),
  chip:{l:'Tipo',by:r=>r.t,items:Object.keys(MVT).map(k=>rpCh(k,MVT[k][0],MVT[k][2],MVT[k][3]))},
  cols:[rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('t','Tipo',r=>MVT[r.t][0]),rpCol('it','Item',r=>(itm(r.it)||{n:'Item removido'}).n),rpCol('q','Quantidade',r=>r.q,{n:1}),rpCol('txt','Detalhe',r=>r.txt||'—')]},
 {k:'resumo',l:'Por categoria',rows:()=>ICATS.slice(),
  cols:[rpCol('n','Categoria',r=>r.n),rpCol('it','Itens',r=>ITEMS.filter(i=>i.cat===r.id).length,{n:1}),rpCol('u','Unidades',r=>ITEMS.filter(i=>i.cat===r.id).reduce((n,i)=>n+i.total,0),{n:1}),rpCol('o','Emprestadas',r=>ITEMS.filter(i=>i.cat===r.id).reduce((n,i)=>n+LOANS.filter(l=>l.item===i.id).reduce((m,l)=>m+l.qty-rpLoanDone(l),0),0),{n:1})]}
]);

const rpFoodSt={completed:['Concluída',rpOk],cancelled:['Cancelada',rpBad],refunded:['Estornada',rpWarn]};
const rpFoodKind={entry:'Entrada',sale:'Venda',loss:'Perda',correction:'Correção',refund:'Estorno'};
function rpFood(key,label,lede){
 const st=()=>FOOD_STORES[key],it=id=>(st().items.find(x=>x.id===id)||{name:'Item removido'});
 rpDef(key,label,lede,[
  {k:'vendas',l:'Vendas',rows:()=>FOOD_SALES.filter(s=>s.store===key).slice().sort((a,b)=>(a.date+a.time)<(b.date+b.time)?1:-1),
   chip:{l:'Situação',by:r=>r.status,items:Object.keys(rpFoodSt).map(k=>rpC(k,rpFoodSt[k][0],rpFoodSt[k][1]))},
   fl:[{k:'method',l:'Pagamento',opts:()=>[['Pix','Pix'],['Cartão','Cartão'],['Dinheiro','Dinheiro']],ok:(r,v)=>r.method===v},{k:'mes',l:'Mês',opts:()=>['04','05','06','07','08','09'].map(m=>[m,MONTHS[+m-1][0].toUpperCase()+MONTHS[+m-1].slice(1)]),ok:(r,v)=>r.date.slice(5,7)===v}],
   cols:[rpCol('id','Venda',r=>r.id),rpCol('d','Data',r=>rpD(r.date)+' '+r.time,{raw:r=>r.date+r.time}),rpCol('it','Itens',r=>r.lines.map(l=>l.qty+'× '+l.name).join('; ')),rpCol('m','Pagamento',r=>r.method),rpCol('tot','Total',r=>foodMoney(r.total),{n:1,raw:r=>r.total/100}),rpCol('st','Situação',r=>rpFoodSt[r.status]?rpFoodSt[r.status][0]:r.status),rpCol('who','Quem vendeu',r=>r.seller||r.who||'—',{off:true})]},
  {k:'itens',l:'Itens e estoque',rows:()=>st().items.slice(),
   chip:{l:'Estoque',by:r=>r.stock<=r.min?'baixo':'ok',items:[rpC('ok','Normal',rpOk),rpC('baixo','No mínimo ou abaixo',rpWarn)]},
   fl:[{k:'cat',l:'Categoria',opts:()=>st().cats.map(c=>[c.id,c.name]),ok:(r,v)=>r.cat===v}],
   cols:[rpCol('sku','Código',r=>r.sku||'—'),rpCol('n','Item',r=>r.name),rpCol('cat','Categoria',r=>(st().cats.find(c=>c.id===r.cat)||{name:'—'}).name),rpCol('p','Preço',r=>foodMoney(r.price),{n:1,raw:r=>r.price/100}),rpCol('s','Estoque',r=>r.stock,{n:1}),rpCol('min','Mínimo',r=>r.min,{n:1}),rpCol('a','Situação',r=>r.active?'Ativo':'Inativo')]},
  {k:'movimentacoes',l:'Movimentações',rows:()=>FOOD_MOVES.filter(m=>m.store===key).slice().sort((a,b)=>a.date<b.date?1:-1),
   chip:{l:'Tipo',by:r=>r.kind,items:rows=>[...new Set(rows.map(r=>r.kind))].map(k=>rpCh(k,rpFoodKind[k]||k))},
   cols:[rpCol('d','Data',r=>rpD(r.date),{raw:r=>r.date}),rpCol('k','Tipo',r=>rpFoodKind[r.kind]||r.kind),rpCol('it','Item',r=>it(r.item).name),rpCol('q','Quantidade',r=>r.qty,{n:1}),rpCol('why','Motivo',r=>r.reason||'—')]}
 ]);
}
rpFood('cafe','Cafeteria','Vendas, itens e movimentações de estoque da cafeteria.');
rpFood('rest','Restaurante','Vendas, itens e movimentações de estoque do restaurante.');
rpFood('shop','Loja','Vendas, itens e movimentações de estoque da loja.');

rpDef('conteudo','Conteúdo','Catálogo de pregações, músicas, vídeos, séries, jornadas, cursos e materiais.',[
 {k:'pregacoes',l:'Pregações',rows:()=>PREGS.slice(),fl:[{k:'who',l:'Pregador',opts:()=>rpUniq(PREGS.map(p=>p.who)),ok:(r,v)=>r.who===v}],
  cols:[rpCol('t','Título',r=>r.t),rpCol('who','Pregador',r=>r.who),rpCol('sr','Série',r=>(PSERIES.find(s=>s.id===r.sr)||{n:'—'}).n),rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('dur','Duração',r=>r.dur+' min',{n:1,raw:r=>r.dur}),rpCol('ref','Referência',r=>r.ref||'—'),rpCol('v','Visualizações',r=>r.views,{n:1})]},
 {k:'musicas',l:'Músicas',rows:()=>SONGS.slice(),chip:{l:'Categoria',by:r=>r.cat,items:()=>SCATS.map(c=>rpCh(c,c))},
  cols:[rpCol('n','Música',r=>r.n),rpCol('art','Artista',r=>r.art),rpCol('key','Tom',r=>r.key),rpCol('bpm','BPM',r=>r.bpm,{n:1}),rpCol('cat','Categoria',r=>r.cat),rpCol('min','Ministério',r=>r.min||'—'),rpCol('yt','Vídeo',r=>rpYes(r.yt))]},
 {k:'videos',l:'Vídeos',rows:()=>NX_VIDEOS.slice(),chip:{l:'Visibilidade',by:r=>r.visibility,items:['Público','Interno','Restrito'].map(v=>rpCh(v,v))},
  cols:[rpCol('t','Vídeo',r=>r.t),rpCol('tag','Tema',r=>r.tag||'—'),rpCol('vis','Visibilidade',r=>r.visibility),rpCol('min','Ministério',r=>r.min||'—'),rpCol('f','Arquivos',r=>(r.files||[]).length,{n:1}),rpCol('a','Situação',r=>r.active?'Ativo':'Inativo')]},
 {k:'series',l:'Séries',rows:()=>NX_SERIES.slice(),chip:{l:'Visibilidade',by:r=>r.visibility,items:['Público','Interno','Restrito'].map(v=>rpCh(v,v))},
  cols:[rpCol('n','Série',r=>r.n),rpCol('type','Tipo',r=>r.type),rpCol('q','Itens',r=>r.items.length,{n:1}),rpCol('p','Pessoas acompanhando',r=>r.people.length,{n:1}),rpCol('vis','Visibilidade',r=>r.visibility)]},
 {k:'jornadas',l:'Jornadas',rows:()=>JORNS.filter(j=>!j.solo),chip:{l:'Situação',by:r=>r.st,items:rows=>rpUniq(rows.map(r=>r.st)).map(x=>rpCh(x[0],x[0][0].toUpperCase()+x[0].slice(1)))},
  cols:[rpCol('n','Jornada',r=>r.n),rpCol('c','Cursos',r=>r.courses.length,{n:1}),rpCol('wk','Semanas',r=>r.wk,{n:1}),rpCol('p','Pessoas',r=>r.people.length+(r.more||0),{n:1}),rpCol('st','Situação',r=>r.st)]},
 {k:'cursos',l:'Cursos',rows:()=>[...JORNS.filter(j=>!j.solo).flatMap(j=>j.courses.map(c=>({c,o:'Jornada: '+j.n,p:j.people.length+(j.more||0)}))),...CSOLO.flatMap(s=>s.courses.map(c=>({c,o:s.min?'Avulso · '+s.min:'Avulso',p:s.people.length+(s.more||0)})))],
  fl:[{k:'o',l:'Origem',opts:()=>rpUniq([...JORNS.filter(j=>!j.solo).map(j=>'Jornada: '+j.n),'Avulso']),ok:(r,v)=>v==='Avulso'?r.o.startsWith('Avulso'):r.o===v}],
  cols:[rpCol('n','Curso',r=>r.c.n),rpCol('o','Origem',r=>r.o),rpCol('a','Aulas',r=>r.c.aulas.length,{n:1}),rpCol('p','Pessoas',r=>r.p,{n:1}),rpCol('on','Situação',r=>r.c.on?'Ativo':'Inativo')]},
 {k:'materiais',l:'Materiais de apoio',rows:()=>MATS.slice(),
  cols:[rpCol('t','Material',r=>r.t),rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('f','Arquivos',r=>r.files.length,{n:1}),rpCol('min','Ministério',r=>r.min||'—'),rpCol('dl','Downloads no mês',r=>r.dl,{n:1})]}
]);

rpDef('comunicacao','Comunicação','Notícias e envios de push e e-mail.',[
 {k:'noticias',l:'Notícias',rows:()=>NEWS.slice(),
  chip:{l:'Situação',by:r=>r.exp&&r.exp<SX_TODAY?'exp':r.pub>SX_TODAY?'ag':'no',items:[rpC('no','No ar',rpOk),rpC('ag','Agendadas',rpInfo),rpC('exp','Expiradas',rpOff)]},
  cols:[rpCol('t','Notícia',r=>r.t),rpCol('c','Categoria',r=>(NCATS.find(c=>c.id===r.c)||{n:'—'}).n),rpCol('pub','Publicação',r=>rpD(r.pub),{raw:r=>r.pub}),rpCol('exp','Expira em',r=>rpD(r.exp)),rpCol('st','Situação',r=>r.exp&&r.exp<SX_TODAY?'Expirada':r.pub>SX_TODAY?'Agendada':'No ar')]},
 {k:'envios',l:'Envios',rows:()=>PUSHES.slice(),
  chip:{l:'Situação',by:r=>r.st,items:rows=>rpUniq(rows.map(r=>r.st)).map(x=>rpCh(x[0],x[0][0].toUpperCase()+x[0].slice(1)))},
  cols:[rpCol('t','Envio',r=>r.t),rpCol('seg','Público',r=>r.seg),rpCol('type','Tipo',r=>r.type),rpCol('ch','Canais',r=>(r.ch||[]).join(', ')),rpCol('dt','Data',r=>r.dt||'—'),rpCol('st','Situação',r=>r.st),rpCol('open','Abertura',r=>r.open===null||r.open===undefined?'—':r.open+'%',{n:1})]}
]);

const rpMesesDn=()=>[...new Set(CAMPS.flatMap(c=>c.donors.map(d=>d[2].slice(5,7))))].sort().map(m=>[m,MONTHS[+m-1][0].toUpperCase()+MONTHS[+m-1].slice(1)]);
rpDef('doacoes','Doações','Contribuições e campanhas, com doador, valor e situação.',[
 {k:'doacoes',l:'Contribuições',rows:()=>CAMPS.flatMap(c=>c.donors.map(d=>({c,n:c.lt==='fixed'?'Anônimo':d[0],v:d[1],d:d[2],est:!!d[6]}))).sort((a,b)=>a.d<b.d?1:-1),
  chip:{l:'Situação',by:r=>r.est?'est':'conf',items:[rpC('conf','Confirmadas',rpOk),rpC('aguard','Aguardando',rpWarn),rpC('est','Estornadas',rpBad)]},
  fl:[{k:'c',l:'Campanha',opts:()=>CAMPS.map(c=>[c.id,c.n]),ok:(r,v)=>r.c.id===v},{k:'o',l:'Origem',opts:()=>[['person','Por pessoa'],['fixed','Link fixo']],ok:(r,v)=>(r.c.lt==='person'?'person':'fixed')===v},{k:'mes',l:'Mês',opts:rpMesesDn,ok:(r,v)=>r.d.slice(5,7)===v}],
  cols:[rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('n','Doador',r=>r.n),rpCol('c','Campanha',r=>r.c.n),rpCol('v','Valor',r=>brl2(r.v),{n:1,raw:r=>r.v}),rpCol('o','Origem',r=>r.c.lt==='person'?'Por pessoa':'Link fixo'),rpCol('p','Situação',r=>r.est?'Estornada':'Confirmada')]},
 {k:'campanhas',l:'Campanhas',rows:()=>CAMPS.slice(),
  chip:{l:'Situação',by:r=>r.st==='ativo'?'on':'off',items:[rpC('on','Ativas',rpOk),rpC('off','Encerradas',rpOff)]},
  cols:[rpCol('n','Campanha',r=>r.n),rpCol('st','Situação',r=>r.st==='ativo'?'Ativa':'Encerrada'),rpCol('lt','Tipo de link',r=>dnLt(r)),rpCol('meta','Meta',r=>brl2(r.meta),{n:1,raw:r=>r.meta}),rpCol('got','Arrecadado',r=>brl2(r.got),{n:1,raw:r=>r.got}),rpCol('pct','% da meta',r=>Math.round(r.got/Math.max(1,r.meta)*100)+'%',{n:1,raw:r=>Math.round(r.got/Math.max(1,r.meta)*100)}),rpCol('cx','No caixa',r=>brl2(dnTot(r).cx),{n:1,raw:r=>dnTot(r).cx}),rpCol('q','Contribuições',r=>r.donors.filter(d=>!d[6]).length,{n:1})]}
]);

const rpConta='Conta principal',rpLcSt={ok:'Aprovado',pend:'Pendente',rej:'Rejeitado'};
const rpRecSt=r=>(r.got||0)>=r.v?'rec':(r.prev&&r.prev<SX_TODAY)?'atr':'prev';
const rpCxEx={ex:1,name:'Ministério de Louvor · Caixa principal',kind:'Ministério',in:420000,out:185000};
const rpCxRows=()=>{const l=CAIXAS.filter(x=>x.entries.length);return l.length?l:[rpCxEx];};
const rpCxV=x=>x.ex?x:{name:cxOwnerName(x)+' · '+x.name,kind:cxOwnerKind(x),in:cxIn(x),out:cxOut(x)};
rpDef('financeiro','Financeiro','Lançamentos, contas a pagar e a receber, contas financeiras e caixas. DRE e fluxo de caixa ficam em Análises.',[
 {k:'lancamentos',l:'Lançamentos',rows:()=>LANCS.slice().sort((a,b)=>a.d<b.d?1:-1),
  chip:{l:'Tipo',by:r=>r.tipo,items:[rpC('e','Entradas',rpOk),rpC('s','Saídas',rpBad),rpC('t','Transferências',rpInfo)]},
  fl:[{k:'comp',l:'Competência',opts:()=>[...new Set(LANCS.map(l=>l.comp))].sort().reverse().map(k=>[k,monthName(k)]),ok:(r,v)=>r.comp===v},{k:'cat',l:'Categoria',opts:()=>rpUniq(LANCS.map(l=>l.cat)),ok:(r,v)=>r.cat===v},{k:'conta',l:'Conta',opts:()=>[[rpConta,rpConta]],ok:(r,v)=>(r.conta||rpConta)===v},{k:'st',l:'Situação',opts:()=>Object.keys(rpLcSt).map(k=>[k,rpLcSt[k]]),ok:(r,v)=>r.st===v}],
  cols:[rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('comp','Competência',r=>monthName(r.comp)),rpCol('desc','Descrição',r=>r.desc),rpCol('conta','Conta',r=>r.conta||rpConta),rpCol('cat','Categoria',r=>r.cat),rpCol('tipo','Tipo',r=>r.tipo==='e'?'Entrada':r.tipo==='s'?'Saída':'Transferência'),rpCol('v','Valor',r=>brl2(r.v),{n:1,raw:r=>r.v}),rpCol('st','Situação',r=>rpLcSt[r.st]||r.st),rpCol('orig','Origem',r=>r.orig||'Manual'),rpCol('who','Lançado por',r=>r.who||'—',{off:true})]},
 {k:'pagar',l:'Contas a pagar',rows:()=>PAGAR.slice().sort((a,b)=>a.venc<b.venc?-1:1),
  chip:{l:'Situação',by:r=>r.paid?'pg':r.venc<SX_TODAY?'ven':'ab',items:[rpC('ab','A vencer',rpWarn),rpC('ven','Vencidas',rpBad),rpC('pg','Pagas',rpOk)]},
  cols:[rpCol('desc','Conta',r=>r.desc),rpCol('cat','Categoria',r=>r.cat),rpCol('venc','Vencimento',r=>rpD(r.venc),{raw:r=>r.venc}),rpCol('v','Valor',r=>brl2(r.v),{n:1,raw:r=>r.v}),rpCol('st','Situação',r=>r.paid?'Paga':r.venc<SX_TODAY?'Vencida':'A vencer')]},
 {k:'receber',l:'Contas a receber',rows:()=>RECEB.slice(),
  chip:{l:'Situação',by:r=>rpRecSt(r),items:[rpC('prev','Previstas',rpInfo),rpC('atr','Atrasadas',rpBad),rpC('rec','Recebidas',rpOk)]},
  cols:[rpCol('desc','Descrição',r=>r.desc),rpCol('prev','Previsão',r=>rpD(r.prev),{raw:r=>r.prev||''}),rpCol('v','Valor previsto',r=>brl2(r.v),{n:1,raw:r=>r.v}),rpCol('st','Situação',r=>({prev:'Prevista',atr:'Atrasada',rec:'Recebida'})[rpRecSt(r)]),rpCol('got','Valor recebido',r=>rpRecSt(r)==='rec'?brl2(r.got):'—',{n:1,raw:r=>rpRecSt(r)==='rec'?r.got:0})]},
 {k:'contas',l:'Contas financeiras',rows:()=>[{n:rpConta,tipo:'Corrente',banco:'Banco do Brasil',ini:40000,atual:57830,on:true}],
  chip:{l:'Situação',by:r=>r.on?'on':'off',items:[rpC('on','Ativas',rpOk),rpC('off','Inativas',rpOff)]},
  cols:[rpCol('n','Conta',r=>r.n),rpCol('tipo','Tipo',r=>r.tipo),rpCol('b','Banco',r=>r.banco),rpCol('ini','Saldo inicial',r=>brl2(r.ini),{n:1,raw:r=>r.ini}),rpCol('at','Saldo atual',r=>brl2(r.atual),{n:1,raw:r=>r.atual}),rpCol('st','Situação',r=>r.on?'Ativa':'Inativa')]},
 {k:'caixas',l:'Caixas',rows:()=>rpCxRows(),
  fl:[{k:'tipo',l:'Tipo',opts:()=>[['Ministério','Ministério'],['Evento','Evento'],['Culto','Culto'],['Campanha','Campanha']],ok:(r,v)=>rpCxV(r).kind===v}],
  cols:[rpCol('n','Caixa',r=>rpCxV(r).name),rpCol('k','Tipo',r=>rpCxV(r).kind),rpCol('in','Entradas',r=>cxMoney(rpCxV(r).in),{n:1,raw:r=>rpCxV(r).in/100}),rpCol('out','Saídas',r=>cxMoney(rpCxV(r).out),{n:1,raw:r=>rpCxV(r).out/100}),rpCol('bal','No caixa',r=>cxMoney(rpCxV(r).in-rpCxV(r).out),{n:1,raw:r=>(rpCxV(r).in-rpCxV(r).out)/100})]}
]);

rpDef('secretaria','Secretaria','Atos, documentos emitidos e mandatos da igreja.',[
 {k:'atos',l:'Atos',rows:()=>sxAtoAll(),
  chip:{l:'Situação',by:r=>sxAtoSit(r),items:[rpC('realizado','Realizados',rpOk),rpC('pendente','Pendentes de decisão',rpWarn),rpC('informado','Informados',rpOff),rpC('recusado','Recusados',rpBad)]},
  fl:[{k:'t',l:'Tipo',opts:()=>Object.keys(SX_ATO_T).map(k=>[k,SX_ATO_T[k][0]]),ok:(r,v)=>r.t===v}],
  cols:[rpCol('t','Tipo',r=>SX_ATO_T[r.t][0]),rpCol('d','Data',r=>rpD(r.d),{raw:r=>r.d}),rpCol('loc','Local',r=>r.loc||'—'),rpCol('of','Quem oficiou',r=>r.of||'—'),rpCol('p','Pessoas',r=>r.ppl.join('; ')),rpCol('st','Situação',r=>r.dec==='pendente'?'Pendente de decisão':r.dec==='recusado'?'Recusado':r.dec==='aceito'?'Informado (aceito)':r.st==='realizado'?'Realizado':r.st==='previsto'?'Previsto':'Informado')]},
 {k:'documentos',l:'Documentos emitidos',rows:()=>SX_DOCS.slice().reverse(),
  chip:{l:'Situação',by:r=>r.st,items:[rpC('valido','Válidos',rpOk),rpC('revogado','Revogados',rpBad)]},
  fl:[{k:'t',l:'Tipo',opts:()=>Object.keys(SX_DOC_T).map(k=>[k,k]),ok:(r,v)=>r.t===v}],
  cols:[rpCol('num','Número',r=>r.num),rpCol('t','Documento',r=>r.t),rpCol('p','Pessoa',r=>r.pessoa),rpCol('d','Emissão',r=>rpD(r.d),{raw:r=>r.d}),rpCol('sig','Assinado por',r=>r.sig),rpCol('st','Situação',r=>r.st==='valido'?'Válido':'Revogado')]},
 {k:'mandatos',l:'Cargos e mandatos',rows:()=>SX_MAND.slice(),
  chip:{l:'Situação',by:r=>sxMandSt(r),items:[rpC('vigente','Vigentes',rpOk),rpC('agendado','Agendados',rpInfo),rpC('encerrado','Encerrados',rpOff)]},
  fl:[{k:'cg',l:'Cargo',opts:()=>SX_CARGOS.map(c=>[c.id,c.n]),ok:(r,v)=>r.cg===v}],
  cols:[rpCol('p','Pessoa',r=>r.pessoa),rpCol('cg','Cargo',r=>sxCargo(r.cg).n),rpCol('i','Início',r=>rpD(r.ini),{raw:r=>r.ini}),rpCol('f','Fim',r=>r.fim?rpD(r.fim):'Sem prazo'),rpCol('st','Situação',r=>({vigente:'Vigente',agendado:'Agendado',encerrado:'Encerrado'})[sxMandSt(r)]),rpCol('ac','Acesso concedido',r=>r.sc?(sxCargo(r.cg).ac.area+' · '+sxCargo(r.cg).ac.perm):'—')]}
]);

rpDef('multi','Multi-igreja','Regionais e igrejas da organização.',[
 {k:'igrejas',l:'Igrejas',rows:()=>IGREJAS.slice(),fl:[{k:'rede',l:'Regional',opts:()=>NETS.map(n=>[n.id,n.n]),ok:(r,v)=>r.rede===v}],
  cols:[rpCol('n','Igreja',r=>r.n),rpCol('rede','Regional',r=>(NETS.find(n=>n.id===r.rede)||{n:'—'}).n),rpCol('lead','Responsável',r=>r.lead||'—')]},
 {k:'redes',l:'Regionais',rows:()=>NETS.slice(),
  cols:[rpCol('n','Regional',r=>r.n),rpCol('sup','Supervisor',r=>r.sup||'—'),rpCol('q','Igrejas',r=>IGREJAS.filter(g=>g.rede===r.id).length,{n:1}),rpCol('main','Principal',r=>rpYes(r.main))]}
]);

/* Usuários e visitantes: relatório sem módulo dono, segue o papel Administrador/Plataforma (IDN-P-30) */
rpDef('usuarios','Usuários e visitantes','Contas do painel e contas de visitantes. Sem módulo dono: aparece para quem administra a plataforma.',[
 {k:'usuarios',l:'Usuários',rows:()=>USERS.filter(u=>!u.revoked),
  chip:{l:'Situação',by:r=>idStatus(r),items:[rpC('Ativo','Ativos',rpOk),rpC('Convidado','Convidados',rpWarn),rpC('Suspenso','Suspensos',rpBad)]},
  fl:[{k:'role',l:'Papel',opts:()=>rpUniq(USERS.map(u=>u.role)),ok:(r,v)=>r.role===v}],
  cols:[rpCol('n','Usuário',r=>r.n),rpCol('role','Papel',r=>r.role),rpCol('st','Situação',r=>idStatus(r)),rpCol('last','Último acesso',r=>idLast(r)),rpCol('e','E-mail',r=>r.e||'—',{s:1,off:true})]},
 {k:'visitantes',l:'Visitantes',rows:()=>ID_VISITORS.slice(),
  chip:{l:'Situação',by:r=>r.status==='Ativo'?'Ativo':'Revogado',items:[rpC('Ativo','Ativos',rpOk),rpC('Revogado','Revogados',rpBad)]},
  cols:[rpCol('n','Visitante',r=>r.n),rpCol('church','Igreja',r=>r.church),rpCol('created','Criado em',r=>rpD(r.created),{raw:r=>r.created}),rpCol('int','Integração',r=>r.integration||'—'),rpCol('st','Situação',r=>r.status),rpCol('e','E-mail',r=>r.e||'—',{s:1,off:true})]}
]);

/* menu Relatórios e roteamento */
(()=>{const g=NAV.find(x=>x[0]==='Gestão')[1],i=g.findIndex(n=>n[0]==='admin');g.splice(i<0?g.length:i,0,['relatorios','clipboard','Relatórios',RP_ORDER.map(k=>['rp-'+k,RP[k].l])]);})();
{const _ph2=placeholder;placeholder=id=>typeof id==='string'&&id.slice(0,3)==='rp-'&&RP[id.slice(3)]?rpPage(id.slice(3)):_ph2(id);}

