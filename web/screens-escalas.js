/* ================= Agenda › Escalas ================= */
const EST={criacao:['Em criação','var(--ink-muted)','var(--surface-2)'],aguardando:['Aguardando aceite','var(--st-sol)','var(--st-sol-bg)'],aprovada:['Aprovada','var(--st-int)','var(--st-int-bg)']};
const MST={rascunho:['Não enviado','var(--ink-muted)','var(--surface)'],aguardando:['Pendente','var(--st-sol)','var(--st-sol-bg)'],confirmado:['Aceitou','var(--st-int)','var(--st-int-bg)'],recusado:['Recusou','var(--st-rec)','var(--st-rec-bg)']};
let _bid=0;
const BK=(label,members=[],content=[],team='')=>({id:'bk'+(++_bid),label,team,members:members.map(m=>({n:m[0],role:m[1],st:m[2]||'confirmado',over:m[3]||undefined})),content:content.map(c=>({t:c[0],d:c[1]||'',k:c[2]||(/^Tom /.test(c[1]||'')?'musica':'material')}))});
const DT=(ev,blocks)=>({id:'dt'+(++_bid),ev,blocks});
/* ---------- presença no dia (o check-in da pessoa já é Presente) ---------- */
const CKDAY='2026-09-30',CKNOW=20*60+25;
const ckMin=t=>{const m=String(t).match(/(\d{1,2})h(\d{2})?/);return m?+m[1]*60+(+m[2]||0):19*60;};
const ckHM=m=>`${Math.floor(m/60)}h${String(m%60).padStart(2,'0')}`.replace('h00','h');
function ckWin(e){const st=ckMin(e.time);return {open:st-120,start:st,close:st+120};}
function ckState(e){if(!e||e.d!==CKDAY)return null;const w=ckWin(e);return CKNOW<w.open?'antes':CKNOW>w.close?'fim':'aberto';}
const CKPR={pend:['Sem check-in','var(--ink-muted)','var(--surface)'],ok:['Presente','var(--st-int)','var(--st-int-bg)'],falta:['Ausente','var(--st-rec)','var(--st-rec-bg)']};
const ckOf=m=>m.pr==='ok'?'ok':m.pr==='falta'?'falta':'pend';
const ESCALAS=[
 {id:'es0',n:'Escala Louvor — Ensaios de setembro',min:'Louvor',desc:'Ensaio geral antes dos cultos de outubro.',st:'aprovada',dates:[
  DT('ev11',[BK('Ensaio',[['Daniela Rocha','Vocal'],['Elisa Moura','Vocal'],['Diego Faria','Bateria'],['Igor Santana','Baixo'],['Clara Nunes','Teclado'],['Gustavo Mendes','Guitarra','recusado']],[['Grande é o Senhor','Tom G']],'Domingo manhã')])]},
 {id:'es1',n:'Escala Louvor — Outubro',min:'Louvor',desc:'Cultos de celebração de outubro.',st:'aprovada',dates:[
  DT('ev2',[BK('Culto inteiro',[['Ana Clara Lima','Vocal'],['Daniela Rocha','Vocal'],['Bruno Reis','Violão'],['Helena Duarte','Teclado']],[['Grande é o Senhor','Tom G'],['Te louvarei','Tom D']],'Domingo manhã')]),
  DT('ev3',[BK('Culto inteiro',[['Ana Clara Lima','Vocal'],['Elisa Moura','Vocal'],['Bruno Reis','Violão']],[['Aclame ao Senhor','Tom A']],'Domingo manhã')])]},
 {id:'es2',n:'Escala Kids — Outubro',min:'Kids',desc:'',st:'aguardando',dates:[
  DT('ev10',[BK('Manhã — Berçário',[['Mônica Souza','Monitora']],[['Apostila — Deus cuida de mim','Cap. 3']]),BK('Manhã — Maternal',[['Cláudia Ferraz','Monitora']],[['Apostila — Deus cuida de mim','Cap. 3']]),BK('Tarde — Berçário',[['Renan Ferreira','Monitor','aguardando']],[['Apostila — Deus cuida de mim','Cap. 3']]),BK('Tarde — Maternal',[],[['Apostila — Deus cuida de mim','Cap. 3']])])]},
 {id:'es3',n:'Escala Diaconia — Outubro',min:'Diaconia',desc:'',st:'criacao',dates:[DT('ev6',[BK('Evento inteiro',[['Larissa Pires','Ceia','rascunho',true],['Ana Clara Lima','Recepção','rascunho']])])]},
 {id:'es4',n:'Escala Retiro de Jovens',min:'Jovens e Adolescentes',desc:'Equipe de apoio do retiro.',st:'criacao',dates:[DT('ev5',[BK('Sábado',[['Thiago Barros','Coordenação','rascunho']]),BK('Domingo')])]},
 {id:'es5',n:'Escala Louvor — Novembro',min:'Louvor',desc:'',st:'criacao',dates:[]},
];
/* culto de hoje: cada ministério tem a sua escala; o check-in agrupa por evento */
(()=>{const ev=EVTS.find(e=>e.t==='Culto de Quarta').id;
 const mk=(id,min,ppl,marks)=>{const x={id,n:`Escala ${min} — Culto de Quarta`,min,desc:'',st:'aprovada',dates:[DT(ev,[BK('Culto inteiro',ppl)])]};x.dates[0].blocks[0].members.forEach((m,i)=>{const k=marks[i];if(k==='ok'){m.ck={at:'19h0'+(i%9)};m.pr='ok';m.by='Líder';}else if(k==='ck'){m.ck={at:'19h'+(20+i)};m.pr='ok';}});ESCALAS.push(x);};
 mk('esq1','Louvor',[['Ana Clara Lima','Vocal'],['Daniela Rocha','Vocal'],['Bruno Reis','Violão'],['Helena Duarte','Teclado'],['Diego Faria','Bateria'],['Igor Santana','Baixo']],['ok','ok','ok','ok','ok','ck']);
 mk('esq2','Kids',[['Marina Costa','Coordenação'],['Mônica Souza','Berçário'],['Cláudia Ferraz','Maternal'],['Renan Ferreira','Maternal'],['Paula Siqueira','Juniores'],['Júlia Prado','Juniores'],['Otávio Lins','Apoio']],['ok','ok','ok','ck','','','']);
 mk('esq3','Mídia',[['Diego Faria','Transmissão'],['Lucas Mendes','Câmera'],['Rafa Toledo','Projeção'],['Sofia Barros','Redes sociais']],['ok','ok','ok','ok']);
 mk('esq4','Recepção',[['Felipe Andrade','Porta principal'],['Carla Nogueira','Porta principal'],['Tiago Ramos','Estacionamento'],['Beatriz Luz','Boas-vindas'],['Henrique Pires','Boas-vindas']],['ok','ok','ck','ok','']);
 mk('esq5','Cozinha',[['Mônica Souza','Restaurante'],['Sérgio Dantas','Restaurante'],['Lívia Campos','Cafeteria'],['Nádia Reis','Cafeteria'],['Paulo Vieira','Caixa'],['Vera Lúcia','Restaurante'],['Caio Teles','Apoio']],['ok','ok','ok','ck','','','']);
 mk('esq6','Intercessão',[['Renata Campos','Sala de oração'],['Elisa Moura','Sala de oração'],['Marcos Teixeira','Altar']],['ok','ok','ok']);
})();
(()=>{const m=ESCALAS[0].dates[0].blocks[0].members;Object.assign(m[0],{ck:{at:'19h12'},pr:'ok',by:'Você'});Object.assign(m[1],{ck:{at:'20h02'},pr:'ok'});Object.assign(m[2],{ck:{at:'19h58'},pr:'ok'});})();
/* escala já realizada: culto de 27/09 com a presença registrada */
(()=>{const ev=EVTS.find(z=>z.d==='2026-09-27'&&z.kind==='culto');if(!ev)return;const d=DT(ev.id,[BK('Culto inteiro',[['Ana Clara Lima','Vocal'],['Daniela Rocha','Vocal'],['Bruno Reis','Violão'],['Helena Duarte','Teclado'],['Diego Faria','Bateria']],[['Grande é o Senhor','Tom G']],'Domingo manhã')]);
 const ms=d.blocks[0].members;ms.forEach((m,i)=>{if(i===3){m.pr='falta';}else{m.pr='ok';m.ck={at:'09h'+String(20+i*5)};}});
 ESCALAS.push({id:'es9',n:'Escala Louvor — Setembro',min:'Louvor',desc:'Cultos de celebração de setembro.',st:'aprovada',dates:[d]});})();
Object.assign(S,{esc:null,estab:'datas',esview:'blocos',esq:'',esf:'todos',esM:null,esSel:null,esCol:{}});
const esById=id=>ESCALAS.find(x=>x.id===id);
const esIsPast=d=>{const e=eById(d.ev);return !!(e&&past(e));};
const esPillDone='<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Realizada</span>';
const attPill=m=>{if(m.st==='recusado')return msPill(m);const k=ckOf(m);return `<span class="stp" style="--c:${CKPR[k][1]};--b:${CKPR[k][2]}"><i></i>${k==='pend'?'Sem registro':CKPR[k][0]}</span>`;};
const esPill=s=>`<span class="stp" style="--c:${EST[s][1]};--b:${EST[s][2]}"><i></i>${EST[s][0]}</span>`;
let msPill=(m,clickable,ref)=>`<${clickable?`button data-a="esMst" data-v="${ref}" title="Marcar como aceito"`:'span'} class="stp ${clickable?'clk':''}" style="--c:${MST[m.st][1]};--b:${MST[m.st][2]}"><i></i>${MST[m.st][0]}</${clickable?'button':'span'}>`;
const esMembers=x=>x.dates.flatMap(d=>d.blocks.flatMap(b=>b.members));
const esSorted=x=>x.dates.slice().sort((a,b)=>(eById(a.ev)?.d||'')<(eById(b.ev)?.d||'')?-1:1);
const dateState=d=>{const e=eById(d.ev);if(e&&past(e))return 'past';const ms=d.blocks.flatMap(b=>b.members);if(!ms.length)return 'empty';if(ms.some(m=>m.st==='recusado')||d.blocks.some(b=>!b.members.length))return 'acao';if(ms.some(m=>m.st!=='confirmado'))return 'wait';return 'ok';};
function teamsFor(min){if(min==='Kids')return KTEAMS.map(t=>({n:t.n,m:t.m}));const mn=MINIS.find(m=>m.n===min);return (mn?mn.teams:[]).map((t,i)=>t.ppl?{n:t.n,m:t.ppl.slice()}:({n:t.n,m:MEMBERS.filter(x=>x.tit).slice(i*2,i*2+Math.min(3,t.m)).map(x=>x.n)}));}

/* ---------- list ---------- */
function escList(){
 const c=k=>ESCALAS.filter(x=>x.st===k).length,q=norm(S.esq);
 const l=ESCALAS.filter(x=>(S.esf==='todos'||x.st===S.esf)&&(!q||norm(x.n+' '+x.min).includes(q)));
 return `<header class="ph rise"><div><p class="eb">Agenda</p><h1>Escalas</h1><p class="lede">Quem serve em cada culto e evento, por ministério</p></div>
  <div class="pact"><button class="btn sec" data-a="lmOpen" data-v="lim">${ic('sliders',15)}Regras de escala</button>${rpBtn('escalas','escalas')}
  <button class="btn pri" data-a="esAdd">${ic('plus',15,2.2)}Nova escala</button></div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Aprovadas</span><span class="kv" style="color:var(--st-int)">${c('aprovada')}</span><span class="kd">todos aceitaram</span></div>
  <div class="k4"><span class="kl">Aguardando aceite</span><span class="kv" style="color:var(--st-sol)">${c('aguardando')}</span><span class="kd">${ESCALAS.filter(x=>x.st==='aguardando').reduce((a,x)=>a+esMembers(x).filter(m=>m.st==='aguardando').length,0)} pessoas sem resposta</span></div>
  <div class="k4"><span class="kl">Em criação</span><span class="kv">${c('criacao')}</span><span class="kd">ainda não enviadas</span></div>
 </section>
 ${ckStrip()}
 <section class="card mtab rise" style="--d:3"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="esq" placeholder="Buscar escala ou ministério" value="${esc(S.esq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todas',ESCALAS.length],['aprovada','Aprovadas',c('aprovada')],['aguardando','Aguardando aceite',c('aguardando')],['criacao','Em criação',c('criacao')]].map(x=>`<button class="chipf ${S.esf===x[0]?'on':''}" data-a="esF" data-v="${x[0]}">${x[0]!=='todos'?`<i style="background:${EST[x[0]][1]}"></i>`:''}${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow es thead"><span>Escala</span><span>Datas</span><span>Aceites</span><span>Status</span><span></span></div>${l.map(x=>esRow(x,'esOpen')).join('')}`:'<div class="mempty"><p>Nenhuma escala.</p><span>Nada corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} escalas</span></div></section>`;
}

/* linha da lista de escalas (tela de Escalas, aba Escalas do ministério e do evento) */
const esRow=(x,act,ev)=>{const ds=ev?x.dates.filter(d=>d.ev===ev):esSorted(x),ms=ev?ds.flatMap(d=>d.blocks.flatMap(b=>b.members)):esMembers(x),ok=ms.filter(m=>m.st==='confirmado').length;return `<div class="trow es" tabindex="0" data-a="${act}" data-v="${x.id}">
   <span class="tn"><span class="htile" style="--s:36px;background:var(--tone-${(MINIS.find(m=>m.n===x.min)||{tone:'ceu'}).tone});color:var(--tone-${(MINIS.find(m=>m.n===x.min)||{tone:'ceu'}).tone}-ink)">${ic((MINIS.find(m=>m.n===x.min)||{icon:'users'}).icon,17)}</span><span class="hn"><b>${esc(x.n)}</b><span>Ministério de ${esc(x.min)}</span></span></span>
   <span class="esd">${ds.length?ds.slice(0,4).map(d=>{const e=eById(d.ev);return `<span class="esdc ${dateState(d)}" title="${esc(e.t)}">${+e.d.slice(8)}<small>${MONTHS[+e.d.slice(5,7)-1].slice(0,3)}</small></span>`;}).join('')+(ds.length>4?`<span class="soft">+${ds.length-4}</span>`:''):'<span class="soft">Nenhuma data</span>'}</span>
   <span class="esc">${ms.length?`<span class="tr"><i style="width:${ok/ms.length*100}%"></i></span><span><b>${ok}</b>/${ms.length}</span>`:'<span class="soft">Ninguém escalado</span>'}</span>
   <span class="ts">${esDone(x)?esPillDone:esPill(x.st)}</span><span class="tc">${ic('chevR',16)}</span></div>`;};
const esDone=x=>x.dates.length>0&&x.dates.every(d=>{const e=eById(d.ev);return e&&past(e);});
const esHead='<div class="trow es thead"><span>Escala</span><span>Datas</span><span>Aceites</span><span>Status</span><span></span></div>';
Object.assign(S,{mnesf:'abertas'});
const esCntMin=m=>ESCALAS.filter(x=>x.min===m.n&&!esDone(x)).length||null;
function mnEsc(m){const all=ESCALAS.filter(x=>x.min===m.n),ab=all.filter(x=>!esDone(x)),re=all.filter(esDone),l=S.mnesf==='real'?re:ab;
 return `<section class="card mtab"><div class="tbar"><div class="chips">${[['abertas','Abertas',ab.length],['real','Realizadas',re.length]].map(c=>`<button class="chipf ${S.mnesf===c[0]?'on':''}" data-a="mnEscF" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  ${l.length?esHead+l.map(x=>esRow(x,'mnEscGo')).join(''):`<div class="mempty"><p>Nenhuma escala ${S.mnesf==='real'?'realizada':'aberta'}.</p><span>As escalas do Ministério de ${esc(m.n)} aparecem aqui.</span></div>`}
  <div class="tfoot"><span>${l.length} ${l.length===1?'escala':'escalas'}</span></div></section>`;}
/* aba Escalas do evento e do culto: só leitura, uma linha por escala que usa a data */
const esOfEvt=e=>ESCALAS.filter(x=>x.dates.some(d=>d.ev===e.id));
function evEsc(e){const l=esOfEvt(e);
 return `<section class="card mtab">${l.length?esHead+l.map(x=>esRow(x,'mnEscGo',e.id)).join(''):`<div class="mempty"><p>Nenhuma escala usa esta data.</p><span>As escalas são montadas em Escalas, escolhendo esta data entre os eventos do Calendário.</span></div>`}
  <div class="tfoot"><span>${l.length} ${l.length===1?'escala':'escalas'}</span></div></section>`;}

/* ---------- detail ---------- */
function escDetail(){
 const x=esById(S.esc);if(!x){S.esc=null;return escList();}
 const ms=esMembers(x),ok=ms.filter(m=>m.st==='confirmado').length,pend=ms.filter(m=>m.st==='aguardando').length,bl=x.dates.reduce((a,d)=>a+d.blocks.length,0),allOk=ms.length&&ok===ms.length;
 const act=x.st==='criacao'?`<button class="btn pri" data-a="esSend" ${ms.length?'':'disabled title="Adicione pessoas antes de enviar"'}>${ic('mail',15)}Enviar para os escalados</button>`:x.st==='aguardando'?(allOk?`<button class="btn pri" data-a="esApprove">${ic('check',15,2.4)}Aprovar escala</button>`:`<button class="btn sec" data-a="esRemind" ${pend?'':'disabled'}>${ic('bell',15)}Lembrar ${pend} pendente${pend===1?'':'s'}</button>`):'';
 return `<nav class="crumb rise"><span class="soft">Agenda</span>${ic('chevR',13,2)}<button class="lnk back" data-a="esBack">Escalas</button>${ic('chevR',13,2)}<span>${esc(x.n)}</span></nav>
 <header class="card prof rise" style="--d:1"><div class="pid"><div class="pn"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h1>${esc(x.n)}</h1>${esDone(x)?esPillDone:esPill(x.st)}</div><p>Ministério de ${esc(x.min)}${x.desc?' · '+esc(x.desc):''}</p></div></div>
  <div class="pact">${act}<div style="position:relative"><button class="ibtn" data-a="esMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="esPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="esDup">${ic('layers',17)}Duplicar para o próximo mês</button><hr><button class="pi danger" data-a="esDel">${ic('x',17)}Excluir escala</button></div></div></div>
  ${x.st==='criacao'?`<div class="esflow"><span class="on"><i>1</i>Montar</span><b></b><span><i>2</i>Escalados aceitam</span><b></b><span><i>3</i>Aprovada</span></div>`:x.st==='aguardando'?`<div class="esflow"><span class="done"><i>${ic('check',11,3)}</i>Montar</span><b class="on"></b><span class="on"><i>2</i>Escalados aceitam</span><b></b><span><i>3</i>Aprovada</span></div>`:''}
  <div class="ikpi hk"><div><b>${x.dates.length}</b><span>Datas</span></div><div><b>${bl}</b><span>Blocos</span></div><div><b>${ms.length}</b><span>Pessoas escaladas</span></div><div><b>${ok}<small class="kof">/${ms.length}</small></b><span>Aceitaram</span></div></div>
  <div class="ptabs" role="tablist">${[['det','Detalhes'],['datas','Datas',x.dates.length],['ck','Check-in']].map(t=>`<button role="tab" class="${S.estab===t[0]?'on':''}" data-a="esTab" data-v="${t[0]}">${t[0]==='ck'&&ckToday(x)?'<i class="cklive"></i>':''}${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${S.estab==='det'?esDet(x):S.estab==='ck'?esCk(x):esDatas(x)}</div>`;
}
function esDet(x){
 const ms=esMembers(x),tot=ms.length||1,cnt=k=>ms.filter(m=>m.st===k).length,mn=MINIS.find(m=>m.n===x.min)||{tone:'ceu',icon:'users'},tm=teamsFor(x.min),ds=esSorted(x);
 const seg=[['confirmado','var(--st-int)'],['aguardando','var(--st-sol)'],['recusado','var(--st-rec)'],['rascunho','var(--line-strong)']];
  return `<section class="card esdet">
  <div class="esdf"><div class="sh" style="margin-bottom:14px"><h2>Sobre a escala</h2><span class="who" id="essaved">Salva sozinha</span></div>
   <div class="fgrid">
    <label class="fld"><span class="fl">Nome</span><input id="esN" value="${esc(x.n)}"></label>
    <label class="fld"><span class="fl">Ministério</span><span class="selw"><select id="esMin">${MINIS.filter(m=>m.active).map(m=>`<option value="${esc(m.n)}" ${m.n===x.min?'selected':''}>Ministério de ${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
    <label class="fld" style="grid-column:1/-1"><span class="fl">Recado para quem vai servir <small>opcional</small></span><textarea class="ta" id="esDesc" rows="3" placeholder="Ex.: chegar 40 min antes para oração e passagem de som">${esc(x.desc)}</textarea><span class="hint">Aparece no convite que cada pessoa recebe no app.</span></label>
   </div>
   <p class="who esauto" style="margin:14px 0 0">${ic('bell',14,2)}O lembrete automático antes da data é configurado em Comunicação (padrão de 1 dia).</p>
  </div>
  <aside class="esdx">
   <div class="esxm"><span class="htile" style="--s:40px;background:var(--tone-${mn.tone});color:var(--tone-${mn.tone}-ink)">${ic(mn.icon,19)}</span><span class="dkt"><b>Ministério de ${esc(x.min)}</b><span>${tm.length} time${tm.length===1?'':'s'} disponíve${tm.length===1?'l':'is'} para escalar</span></span></div>
   ${tm.length?`<div class="esxt">${tm.map(t=>`<span>${ic('users',12)}${esc(t.n)}<small>${(t.m||[]).length||''}</small></span>`).join('')}</div>`:''}
   <div class="esxb"><p class="fl">Respostas</p>
    <div class="esbar">${ms.length?seg.map(z=>cnt(z[0])?`<i style="flex:${cnt(z[0])};background:${z[1]}"></i>`:'').join(''):'<i style="flex:1;background:var(--line)"></i>'}</div>
    <div class="eslg">${seg.map(z=>`<span><i style="background:${z[1]}"></i>${MST[z[0]][0]}<b>${cnt(z[0])}</b></span>`).join('')}</div></div>
   <div class="esxb"><p class="fl">Datas cobertas</p>${ds.length?`<div class="esd">${ds.map(d=>{const e=eById(d.ev);return `<button class="esdc ${dateState(d)}" data-a="esGoBlocks" data-v="${d.id}" title="${esc(e.t)}">${+e.d.slice(8)}<small>${MONTHS[+e.d.slice(5,7)-1].slice(0,3)}</small></button>`;}).join('')}</div>`:'<p class="who" style="margin:0">Nenhuma data ainda.</p>'}</div>
  </aside></section>`;
}
function esDatas(x){
 const ds=esSorted(x);
 return `<section class="card pc"><div class="sh"><div class="segc" role="group"><button data-a="esView" data-v="blocos" aria-pressed="${S.esview==='blocos'}">Blocos</button><button data-a="esView" data-v="cal" aria-pressed="${S.esview==='cal'}">Calendário</button></div><span class="row2">${S.esview==='blocos'&&ds.length>0?`<button class="btn ghost sm" data-a="esColAll">${ic(ds.every(d=>S.esCol[d.id])?'expand':'collapse',14)}${ds.every(d=>S.esCol[d.id])?'Expandir tudo':'Recolher tudo'}</button>`:''}${esDone(x)?'':`<button class="btn pri sm" data-a="esAddDate">${ic('plus',14,2.2)}Adicionar data</button>`}</span></div>
  ${!ds.length?`<div class="eempty"><span class="eei">${ic('calendar',22)}</span><p>Nenhuma data ainda.</p><span class="who">Escolha um culto ou evento do Calendário para começar a escalar.</span><button class="btn pri" data-a="esAddDate" style="margin-top:10px">${ic('plus',14,2.2)}Adicionar data</button></div>`
  :S.esview==='cal'?esCal(x,ds):`<p class="who" style="margin:-4px 0 16px;max-width:640px">Cada data começa com um bloco para o evento inteiro. Se precisar de mais de um time ao mesmo tempo, ou trocar de time ao longo do dia, adicione blocos. O nome do bloco é livre.</p>${ds.map(d=>esDateCard(x,d)).join('')}`}
 </section>`;
}
function esDateCard(x,d){
 const e=eById(d.ev),st=dateState(d),col=!!S.esCol[d.id],ms=d.blocks.flatMap(b=>b.members),ok=ms.filter(m=>m.st==='confirmado').length,pd=esIsPast(d),pres=ms.filter(m=>ckOf(m)==='ok').length;
 return `<article class="esdt ${col?'col':''}" id="${d.id}"><header class="esdh"><button class="ibtn sm estog" data-a="esCol" data-v="${d.id}" aria-expanded="${!col}" aria-label="${col?'Expandir':'Recolher'} data" title="${col?'Expandir':'Recolher'}">${ic('chevD',15,2.2)}</button>${dTile(e)}<div class="dkt"><b>${esc(e.t)}</b><span>${wd(e.d)}, ${dBR(e.d)} · ${e.time} · ${esc(e.place)}</span></div>${tTag(e.type)}<span class="esst ${st}">${{ok:'Tudo aceito',wait:'Aguardando respostas',acao:'Precisa de ação',empty:'Sem ninguém',past:`Realizada · ${pres} de ${ms.length} presentes`}[st]}</span>${pd?'':`<button class="ibtn sm" data-a="esDelDate" data-v="${d.id}" aria-label="Remover data" title="Remover data">${ic('x',14)}</button>`}</header>
  ${ckBar(d,e)}${col?`<button class="esmini" data-a="esCol" data-v="${d.id}"><span>${d.blocks.map(b=>`<em>${esc(b.label)}</em>`).join('')}</span><span class="esmc">${ms.length?`<b>${ok}</b>/${ms.length} aceitaram`:'Ninguém escalado'}</span><span class="avs">${ms.slice(0,5).map(m=>`<span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span>`).join('')}</span></button>`:`<div class="esbl">${d.blocks.map(b=>esBlock(x,d,b)).join('')}</div>
  ${pd?'':`<button class="btn sec sm esaddb" data-a="esAddBlock" data-v="${d.id}">${ic('plus',13,2.2)}Adicionar bloco</button>`}`}</article>`;
}
function esBlock(x,d,b){
 const ym=lmYmOf(d),r=`${d.id}|${b.id}`,pd=esIsPast(d),pend=b.members.filter(m=>m.st==='aguardando'||m.st==='rascunho').length;
 return `<div class="esb"><div class="esbh"><input class="esbl-in" value="${esc(b.label)}" data-ref="${r}" aria-label="Nome do bloco" ${pd?'readonly':''}>${d.blocks.length>1&&!pd?`<button class="ibtn sm" data-a="esDelBlock" data-v="${r}" aria-label="Remover bloco" title="Remover bloco">${ic('x',14)}</button>`:''}</div>
  <div class="esbc"><div><p class="fl">Time e pessoas</p>
   ${b.team?`<span class="esteam">${ic('users',13)}${esc(b.team)}${pd?'':`<button data-a="esTeamClr" data-v="${r}" aria-label="Tirar time">${ic('x',11,2.4)}</button>`}</span>`:''}
   ${b.members.length?`<div class="esms">${b.members.map((m,i)=>`<div class="esm"><span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span><span class="dkt"><b>${esc(m.n)}</b><span>${esc(m.role)}${m.over&&m.st!=='recusado'?` <em class="lm-x" title="Escalado(a) acima do limite mensal">${ic('alert',10,2.6)}Exceção ao limite</em>`:''}${m.sub?` <em class="es-sub" title="${esc(m.sub.why)}">${ic('swap',10,2.4)}no lugar de ${esc(m.sub.from.split(' ')[0])}</em>`:''}</span></span>${!pd&&m.st!=='recusado'&&['over','full','pause'].includes(lmUse(m.n,ym).st)?lmPill(m.n,ym):''}${pd?attPill(m):msPill(m,x.st==='aguardando'&&m.st==='aguardando',r+'|'+i)}${pd?'':`<button class="ibtn sm" data-a="esSwap" data-v="${r}|${i}" aria-label="Substituir ${esc(m.n)}" title="Substituir">${ic('swap',13)}</button><button class="ibtn sm" data-a="esDelM" data-v="${r}|${i}" aria-label="Remover ${esc(m.n)}" title="Remover">${ic('x',13)}</button>`}</div>`).join('')}</div>`:`<p class="esempty">${ic('alert',13,2)}Ninguém escalado neste bloco.</p>`}
   ${pd?'':`<div class="row2" style="margin-top:8px">`}${pd?'':`${b.team?'':`<button class="btn sec sm" data-a="esTeam" data-v="${r}">${ic('users',13)}Selecionar time</button>`}<button class="btn sec sm" data-a="esAddM" data-v="${r}">${ic('plus',13,2.2)}Pessoa</button>${x.st!=='criacao'?`<button class="btn sec sm" data-a="esNotify" data-v="${r}" ${pend?'':'disabled'}>${ic('bell',13)}Notificar</button>`:''}`}${pd?'':`</div>`}</div>
  <div><p class="fl">Conteúdo <small>repertório, material de apoio…</small></p>
   ${b.content.length?`<div class="escs">${b.content.map((c,i)=>`<div class="escc"><span class="cti ec-k ${c.k||'outro'}" style="width:28px;height:28px;border-radius:8px">${ic(ECT[c.k||'outro'][2],13)}</span><span class="dkt"><b>${esc(c.t)}</b><span>${ECT[c.k||'outro'][0]}${c.d?' · '+esc(c.d):''}</span></span>${pd?'':`<button class="ibtn sm" data-a="esDelC" data-v="${r}|${i}" aria-label="Remover">${ic('x',13)}</button>`}</div>`).join('')}</div>`:'<p class="who" style="margin:0 0 4px">Nada ainda.</p>'}
   ${pd?'':`<div class="row2" style="margin-top:8px"><button class="btn sec sm" data-a="esAddC" data-v="${r}">${ic('plus',13,2.2)}Conteúdo</button><button class="btn sec sm" data-a="esReuse" data-v="${r}">${ic('layers',13)}Reaproveitar de outro bloco</button></div>`}</div></div></div>`;
}
function esCal(x,ds){
 const first=eById(ds[0].ev).d;S.esM=S.esM||first.slice(0,7);const [y,m]=S.esM.split('-').map(Number),off=new Date(y,m-1,1).getDay(),days=new Date(y,m,0).getDate();
 const by={};ds.forEach(d=>{by[eById(d.ev).d]=d;});const sel=S.esSel&&by[S.esSel]?S.esSel:(Object.keys(by).find(k=>k.startsWith(S.esM))||null);
 const cells=[];for(let i=0;i<off;i++)cells.push('<span></span>');for(let d=1;d<=days;d++){const iso=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`,dd=by[iso];cells.push(dd?`<button class="escd ${dateState(dd)} ${sel===iso?'sel':''}" data-a="esDay" data-v="${iso}">${d}</button>`:`<span class="escd no">${d}</span>`);}
 const sd=sel&&by[sel],se=sd&&eById(sd.ev);
 return `<div class="escal"><div><div class="sh" style="margin-bottom:10px"><button class="ibtn sm" data-a="esM" data-v="-1" aria-label="Mês anterior">${ic('chevL',14,2)}</button><b style="font:600 15px/1 var(--font-display)">${MONTHS[m-1][0].toUpperCase()+MONTHS[m-1].slice(1)} ${y}</b><button class="ibtn sm" data-a="esM" data-v="1" aria-label="Próximo mês">${ic('chevR',14,2)}</button></div>
  <div class="escg">${['D','S','T','Q','Q','S','S'].map(w=>`<span class="cwd">${w}</span>`).join('')}${cells.join('')}</div>
  <div class="esleg">${[['ok','Tudo aceito'],['wait','Aguardando alguém'],['acao','Precisa de ação'],['past','Já aconteceu'],['empty','Sem ninguém']].map(l=>`<span><i class="escd ${l[0]}"></i>${l[1]}</span>`).join('')}</div></div>
  <div class="essum">${sd?`<div class="esdh" style="padding:0 0 12px">${dTile(se)}<div class="dkt"><b>${esc(se.t)}</b><span>${wd(se.d)}, ${dBR(se.d)} · ${se.time}</span></div><button class="btn sec sm" data-a="esGoBlocks" data-v="${sd.id}">Editar blocos</button></div>
   ${sd.blocks.map(b=>`<div class="essb"><p class="fl">${esc(b.label)}</p>${b.members.length?b.members.map(mm=>`<div class="essr"><span>${esc(mm.n)} <span class="soft">· ${esc(mm.role)}</span></span>${msPill(mm)}</div>`).join(''):'<p class="esempty">Ninguém escalado ainda.</p>'}</div>`).join('')}`:'<div class="soft-empty"><p>Nenhuma data neste mês.</p></div>'}</div></div>`;
}

function escAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#esq');if(q)q.addEventListener('input',e=>{S.esq=e.target.value;const p=e.target.selectionStart;render();const n=$('#esq');n.focus();n.setSelectionRange(p,p);});
 const x=S.esc&&esById(S.esc);if(!x)return;
 $$('.esbl-in').forEach(i=>i.addEventListener('change',()=>{const [di,bi]=i.dataset.ref.split('|'),b=x.dates.find(d=>d.id===di).blocks.find(b=>b.id===bi),v=i.value.trim();if(!v){i.value=b.label;return;}b.label=v;toast('Nome do bloco salvo');}));
 let t;const sv=()=>{clearTimeout(t);$('#essaved').textContent='Salvando…';t=setTimeout(()=>{const n=$('#esN').value.trim();if(n)x.n=n;x.min=$('#esMin').value;x.desc=$('#esDesc').value.trim();$('#essaved').innerHTML=`${ic('check',13,2.4)} Salvo`;$('#essaved').style.color='var(--st-int)';$('.prof .pn p').textContent='Ministério de '+x.min+(x.desc?' · '+x.desc:'');$('.prof h1').textContent=x.n;$('.crumb>span:last-child').textContent=x.n;},600);};
 ['esN','esDesc'].forEach(id=>{const el=$('#'+id);if(el)el.addEventListener('input',sv);});
 const mi=$('#esMin');if(mi)mi.addEventListener('change',()=>{x.min=mi.value;esRe();toast('Ministério alterado');});
 }
const esRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const refB=v=>{const x=esById(S.esc),[di,bi,mi]=v.split('|'),d=x.dates.find(z=>z.id===di),b=d&&d.blocks.find(z=>z.id===bi);return {x,d,b,mi:mi!==undefined?+mi:null};};
function sentSt(x){return x.st==='criacao'?'rascunho':'aguardando';}
const EA={
 esExpMenu:()=>{const p=$('#esExpPop');closePops(p);p.classList.toggle('open');},
 esMenu:()=>{const p=$('#esPop');closePops(p);p.classList.toggle('open');},
 esF:v=>{S.esf=v;render();},
 esOpen:v=>{S.esc=v;S.estab='det';S.esview='blocos';S.esM=null;S.esSel=null;render();window.scrollTo({top:0});},
 esBack:()=>{S.esc=null;render();},
 esTab:v=>{S.estab=v;esRe();},
 esCol:v=>{S.esCol[v]=!S.esCol[v];esRe();},
 esColAll:()=>{const x=esById(S.esc),all=x.dates.every(d=>S.esCol[d.id]);x.dates.forEach(d=>S.esCol[d.id]=!all);esRe();},
 esView:v=>{S.esview=v;esRe();},
 esM:v=>{let [y,m]=S.esM.split('-').map(Number);m+=+v;if(m<1){m=12;y--;}if(m>12){m=1;y++;}S.esM=`${y}-${String(m).padStart(2,'0')}`;S.esSel=null;esRe();},
 esDay:v=>{S.esSel=v;esRe();},
 esGoBlocks:v=>{S.esview='blocos';S.estab='datas';render();setTimeout(()=>{const el=document.getElementById(v);el&&el.scrollIntoView({behavior:'smooth',block:'start'});},60);},
 esAdd:()=>{openDlg(`${dlgHead('Nova escala','Depois você adiciona as datas e quem serve em cada uma.')}<form class="fgrid one" id="esF" novalidate>
   <label class="fld"><span class="fl">Ministério</span><span class="selw"><select name="min">${MINIS.filter(m=>m.active).map(m=>`<option value="${esc(m.n)}">Ministério de ${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Escala Louvor — Novembro" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="2"></textarea></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar escala</button></div></form>`,'sm');
  const f=$('#esF'),fill=()=>{if(!f.n.dataset.touched)f.n.value=`Escala ${f.min.value.split(' ')[0]} — Novembro`;};fill();f.min.addEventListener('change',fill);f.n.addEventListener('input',()=>{f.n.dataset.touched=1;f.n.closest('.fld').classList.remove('bad');});
  f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(!n){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Dê um nome';return;}if(ESCALAS.some(x=>norm(x.n)===norm(n))){f.n.closest('.fld').classList.add('bad');f.n.nextElementSibling.textContent='Já existe uma escala com esse nome';return;}
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{const x={id:'es'+Date.now(),n,min:f.min.value,desc:f.desc.value.trim(),st:'criacao',dates:[]};ESCALAS.unshift(x);closeDlg();S.esc=x.id;S.estab='datas';render();toast(`${n} criada`);},600);});},
 esAddDate:()=>{const x=esById(S.esc),used=new Set(x.dates.map(d=>d.ev)),opts=EVTS.filter(e=>e.st==='confirmado'&&!past(e)&&!used.has(e.id)).sort((a,b)=>a.d<b.d?-1:1);
  openDlg(`${dlgHead('Adicionar data','A data e o tipo vêm do evento cadastrado no Calendário. Começa com um bloco; divida depois se precisar.')}<div class="pick" id="edp">${opts.length?opts.map((e,i)=>`<label class="pk">${dTile(e)}<span><b>${esc(e.t)}</b><small>${e.time} · ${esc(e.place)}${e.min?' · '+esc(e.min):''}</small></span><input type="radio" name="ev" value="${e.id}" ${!i?'checked':''}></label>`).join(''):'<p class="who" style="padding:12px">Todos os eventos futuros já estão nesta escala.</p>'}</div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoDate" ${opts.length?'':'disabled'}>Adicionar</button></div>`,'sm');},
 esDoDate:(v,b)=>{const x=esById(S.esc),s=$('input[name=ev]:checked');if(!s)return;b.classList.add('busy');setTimeout(()=>{const d=DT(s.value,[BK('Evento inteiro')]);x.dates.push(d);closeDlg();S.esview='blocos';esRe();setTimeout(()=>document.getElementById(d.id)?.scrollIntoView({behavior:'smooth',block:'center'}),80);toast(`${eById(s.value).t} adicionado`);},400);},
 esDelDate:v=>{const x=esById(S.esc),i=x.dates.findIndex(d=>d.id===v),d=x.dates[i],e=eById(d.ev),n=d.blocks.reduce((a,b)=>a+b.members.length,0);confirmDel({title:`Remover ${e.t} (${fmtD(e.d)}) da escala?`,body:`${n?`As ${n} pessoas escaladas nesta data ${x.st==='criacao'?'saem da escala':'são avisadas de que não precisam mais servir'}. `:''}O evento continua no Calendário.`,label:'Remover data',onConfirm:()=>{x.dates.splice(i,1);esRe();toast('Data removida',()=>{x.dates.splice(i,0,d);esRe();});}});},
 esAddBlock:v=>{const x=esById(S.esc),d=x.dates.find(z=>z.id===v);if(d.blocks.length===1&&d.blocks[0].label==='Evento inteiro')d.blocks[0].label='Bloco 1';d.blocks.push(BK('Bloco '+(d.blocks.length+1)));esRe();const ins=$$(`#${v} .esbl-in`);ins[ins.length-1]?.select();},
 esDelBlock:v=>{const {d,b}=refB(v);const go=()=>{const i=d.blocks.indexOf(b);d.blocks.splice(i,1);esRe();toast('Bloco removido',()=>{d.blocks.splice(i,0,b);esRe();});};if(!b.members.length&&!b.content.length)return go();confirmDel({title:`Remover o bloco “${b.label}”?`,body:`${b.members.length?`${b.members.length} pessoa${b.members.length>1?'s saem':' sai'} da escala nesta data. `:''}${b.content.length?'O conteúdo do bloco também é removido.':''}`,label:'Remover bloco',onConfirm:go});},
 esTeam:v=>{const {x,b}=refB(v),ts=teamsFor(x.min);openDlg(`${dlgHead('Selecionar time',`Times do Ministério de ${esc(x.min)}. As pessoas do time entram no bloco.`)}<div class="pick">${ts.length?ts.map((t,i)=>`<label class="pk"><span class="cti">${ic('users',15)}</span><span><b>${esc(t.n)}</b><small>${t.m.length?t.m.join(', '):'Sem pessoas'}</small></span><input type="radio" name="tm" value="${i}" ${!i?'checked':''}></label>`).join(''):'<p class="who" style="padding:12px">Este ministério ainda não tem times. Crie em Comunidade › Ministérios.</p>'}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoTeam" data-v="${v}" ${ts.length?'':'disabled'}>Usar este time</button></div>`,'sm');},
 esDoTeam:v=>{const {x,d,b}=refB(v),t=teamsFor(x.min)[+$('input[name=tm]:checked').value],ym=lmYmOf(d),nw=t.m.filter(n=>!b.members.some(m=>m.n===n)),blk=nw.filter(n=>{const u=lmUse(n,ym);return u.c>=u.lim;});
  if(blk.length){window._lmTeam={x,b,t,ym};const free=nw.length-blk.length;openDlg(`${dlgHead(`${blk.length} ${blk.length===1?'pessoa do time já chegou':'pessoas do time já chegaram'} ao limite`,`${esc(t.n)} · ${esc(eById(d.ev).t)}, ${dBR(eById(d.ev).d)}. O limite soma todos os ministérios em ${lmMon(ym)}.`)}<div class="lm-cl">${blk.map(n=>{const u=lmUse(n,ym);return `<div class="lm-hr">${lmAv(n)}<span class="lm-hn">${esc(n)}${u.e?`<small>${u.lim===0?'Em pausa':'Exceção'}: ${esc(u.e.why)}</small>`:''}</span>${lmDots(u.c,u.lim)}${lmPill(n,ym)}</div>`;}).join('')}</div>
   <p class="lm-hint">${ic('info',12,2.2)}Se adicionar mesmo assim, o convite chega marcado como exceção e a pessoa pode recusar sem constrangimento.</p>
   <div class="dfoot lm-tf"><button class="btn sec" data-a="lmTeamGo" data-v="all">Adicionar todos mesmo assim</button><button class="btn pri" data-a="lmTeamGo" data-v="free" ${free?'':'disabled'}>Adicionar só quem tem vaga (${free})</button></div>`,'sm');return;}
  b.team=t.n;let add=0;t.m.forEach(n=>{if(!b.members.some(m=>m.n===n)){b.members.push({n,role:'Equipe',st:sentSt(x)});add++;}});closeDlg();esRe();toast(`${t.n}: ${add} ${add===1?'pessoa adicionada':'pessoas adicionadas'}${x.st!=='criacao'&&add?' e avisadas':''}`);},
 esTeamClr:v=>{const {b}=refB(v);b.team='';esRe();},
 esAddM:v=>{const {x,d,b}=refB(v),cand=MEMBERS.filter(m=>!b.members.some(z=>z.n===m.n));openDlg(`${dlgHead('Adicionar pessoa',`${esc(b.label)} · ${esc(eById(d.ev).t)}`)}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="emq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="emp" style="max-height:200px">${lmCand(cand,'',lmYmOf(d))}</div><p class="eswarn" id="emw" hidden></p><div id="eml"></div>
   <label class="fld" style="margin-top:12px"><span class="fl">Responsabilidade</span><input id="emr" placeholder="Ex.: Vocal, Bateria, Monitor…" autocomplete="off" list="emrl"><datalist id="emrl">${[...new Set(esMembers(x).map(m=>m.role))].map(r=>`<option value="${esc(r)}">`).join('')}</datalist><span class="err"></span></label>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoM" data-v="${v}">Adicionar</button></div>`,'sm');
  const ym=lmYmOf(d),warn=()=>{const s=$('input[name=pm]:checked'),w=$('#emw'),L=$('#eml'),bt=$('[data-a=esDoM]');if(!s){w.hidden=true;L.innerHTML='';bt.textContent='Adicionar';bt.classList.remove('lm-go');return;}const n=byId(s.value).n,o=d.blocks.find(z=>z!==b&&z.members.some(m=>m.n===n));w.hidden=!o;if(o)w.innerHTML=`${ic('alert',13,2)}${esc(n.split(' ')[0])} já está em “${esc(o.label)}” nesta data. Cada bloco conta 1 no limite do mês.`;
   L.innerHTML=lmWarn(n,ym);const ov=!!L.querySelector('.lm-w.bad');bt.textContent=ov?'Escalar acima do limite':'Adicionar';bt.classList.toggle('lm-go',ov);};
  $('#emp').addEventListener('change',warn);$('#emq').addEventListener('input',e=>{$('#emp').innerHTML=lmCand(cand,e.target.value,ym);warn();});},
 esDoM:(v,bt)=>{const {x,b}=refB(v),s=$('input[name=pm]:checked'),r=$('#emr');if(!s){toast('Escolha uma pessoa');return;}if(!r.value.trim()){r.closest('.fld').classList.add('bad');r.nextElementSibling.textContent='Diga o que a pessoa vai fazer';r.focus();return;}
  const n=byId(s.value).n,{d}=refB(v),ym=lmYmOf(d),u=lmUse(n,ym),ov=u.c>=u.lim,ack=$('#emack');
  if(ov&&!(ack&&ack.checked)){const l=ack.closest('.lm-ack');l.classList.remove('shk');void l.offsetWidth;l.classList.add('shk','bad');return;}
  bt.classList.add('busy');setTimeout(()=>{b.members.push({n,role:r.value.trim(),st:sentSt(x),over:ov||undefined});if(ov)LOG.unshift({u:'Rafael Pereira',a:'Escalou acima do limite',e:'Escala',x:n,det:`${u.c+1}/${u.lim} em ${lmMon(ym)} · ${x.n}`,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});closeDlg();esRe();const f=n.split(' ')[0];toast(ov?`${f} escalado(a) como exceção: ${u.c+1} de ${u.lim} em ${lmMon(ym)}${x.st!=='criacao'?'. O convite avisa que pode recusar':''}`:u.c+1===u.lim&&LMR.on?`${f} adicionado(a) · fechou o limite de ${lmMon(ym)} (${u.lim}/${u.lim})`:x.st==='criacao'?`${f} adicionado(a)`:`${f} adicionado(a) e avisado(a)`);},400);},
 esDelM:v=>{const {x,b,mi}=refB(v),m=b.members[mi];const go=()=>{b.members.splice(mi,1);esRe();toast(`${m.n.split(' ')[0]} removido(a)`,()=>{b.members.splice(mi,0,m);esRe();});};if(x.st==='criacao')return go();confirmDel({title:`Tirar ${m.n.split(' ')[0]} deste bloco?`,body:`${m.n} ${m.st==='confirmado'?'já tinha aceitado e ':''}será avisado(a) de que não precisa mais servir em “${esc(b.label)}”.`,label:'Tirar da escala',onConfirm:go});},
 esSwap:v=>{const {x,d,b,mi}=refB(v),m=b.members[mi],f=m.n.split(' ')[0],ym=lmYmOf(d),cand=MEMBERS.filter(z=>z.n!==m.n&&!b.members.some(y=>y.n===z.n)),ev=eById(d.ev);
  const WHY=[['Imprevisto pessoal','alert'],['Saúde','heart'],['Viagem','car'],['Trabalho','clipboard'],['Troca combinada','swap'],['Outro','dots']];
  openDlg(`${dlgHead('Substituir '+esc(f),`${esc(b.label)} · ${esc(ev.t)} · ${dBR(ev.d)}`)}<div class="esw">
   <div class="esw-pair"><div class="esw-p out"><span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span><span class="dkt"><b>${esc(m.n)}</b><span>${esc(m.role)} · sai</span></span></div><span class="esw-ar">${ic('arrowR',16,2)}</span><div class="esw-p in" id="eswIn"><span class="av esw-q">?</span><span class="dkt"><b>Quem entra</b><span>Escolha abaixo</span></span></div></div>
   <p class="fl">Quem entra no lugar</p><label class="sbox" style="margin-bottom:8px">${ic('search',16)}<input id="emq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="emp" style="max-height:184px">${lmCand(cand,'',ym)}</div><div id="eml"></div>
   <label class="fld" style="margin-top:12px"><span class="fl">Responsabilidade</span><input id="emr" value="${esc(m.role)}" autocomplete="off"><span class="err"></span></label>
   <p class="fl" style="margin:14px 0 8px">Motivo da substituição</p><div class="ckwhy esw-why" id="eswWhy">${WHY.map(([w,i])=>`<button type="button" class="chipf" data-w="${w}"><span>${ic(i,15,2)}</span>${w}</button>`).join('')}</div>
   <label class="fld" id="eswObsF" hidden><span class="fl">Conte o motivo</span><input id="eswObs" placeholder="Ex.: Mudou de turno no trabalho" autocomplete="off"><span class="err"></span></label>
   <p class="eswarn" id="eswE" hidden>${ic('alert',13,2)}Escolha um motivo. Fica registrado no histórico da escala.</p>
   ${x.st!=='criacao'?`<p class="esw-note">${ic('bell',13,2)}${esc(f)} é avisado(a) de que não precisa mais servir, e quem entra recebe o convite${m.st==='confirmado'?' para aceitar':''}.</p>`:''}</div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoSwap" data-v="${v}" id="eswOk">Substituir</button></div>`);
  const sync=()=>{const sel=$('input[name=pm]:checked'),box=$('#eswIn');$('#eml').innerHTML=sel?lmWarn(byId(sel.value).n,ym):'';if(sel){const p=byId(sel.value);box.classList.add('on');box.innerHTML=`${mav(p)}<span class="dkt"><b>${esc(p.n)}</b><span>${esc($('#emr').value||m.role)} · entra</span></span>`;}};
  $('#emp').addEventListener('change',sync);$('#emq').addEventListener('input',e=>{$('#emp').innerHTML=lmCand(cand,e.target.value,ym);sync();});$('#emr').addEventListener('input',sync);
  $('#eswWhy').addEventListener('click',e=>{const t=e.target.closest('[data-w]');if(!t)return;$$('#eswWhy .chipf').forEach(z=>z.classList.toggle('on',z===t));$('#eswE').hidden=true;const o=t.dataset.w==='Outro';$('#eswObsF').hidden=!o;if(o)$('#eswObs').focus();});},
 esDoSwap:(v,bt)=>{const {x,d,b,mi}=refB(v),m=b.members[mi],sel=$('input[name=pm]:checked'),r=$('#emr'),w=$('#eswWhy .chipf.on'),obs=$('#eswObs');
  if(!sel){const p=$('#emp');p.classList.remove('shk');void p.offsetWidth;p.classList.add('shk');toast('Escolha quem entra no lugar');return;}
  if(!r.value.trim()){r.closest('.fld').classList.add('bad');r.nextElementSibling.textContent='Diga o que a pessoa vai fazer';return;}
  if(!w){$('#eswE').hidden=false;return;}
  if(w.dataset.w==='Outro'&&!obs.value.trim()){obs.closest('.fld').classList.add('bad');obs.nextElementSibling.textContent='Conte em poucas palavras';obs.focus();return;}
  const n=byId(sel.value).n,ym=lmYmOf(d),u=lmUse(n,ym),ov=u.c>=u.lim,ack=$('#emack');
  if(ov&&!(ack&&ack.checked)){const l=ack.closest('.lm-ack');l.classList.remove('shk');void l.offsetWidth;l.classList.add('shk','bad');return;}
  const why=w.dataset.w==='Outro'?obs.value.trim():w.dataset.w+(obs.value.trim()?' · '+obs.value.trim():''),nw={n,role:r.value.trim(),st:sentSt(x),over:ov||undefined,sub:{from:m.n,why,at:'08/10'}};
  bt.classList.add('busy');setTimeout(()=>{b.members.splice(mi,1,nw);LOG.unshift({u:'Rafael Pereira',a:'Substituiu na escala',e:'Escala',x:`${m.n} → ${n}`,det:`${why} · ${b.label} · ${x.n}`,d:'2026-10-08',t:new Date().toTimeString().slice(0,5)});closeDlg();esRe();
   toast(`${n.split(' ')[0]} entrou no lugar de ${m.n.split(' ')[0]}${x.st!=='criacao'?' · os dois foram avisados':''}`,()=>{b.members.splice(mi,1,m);esRe();});},450);},
 esMst:v=>{const {x,b,mi}=refB(v),m=b.members[mi];m.st='confirmado';esRe();toast(`${m.n.split(' ')[0]} marcado(a) como aceito`,()=>{m.st='aguardando';esRe();});},
 esNotify:(v,bt)=>{const {b}=refB(v),p=b.members.filter(m=>m.st==='aguardando'||m.st==='rascunho');busy(bt,800,'Avisado',()=>{p.forEach(m=>m.st='aguardando');toast(`${p.map(m=>m.n.split(' ')[0]).join(', ')} ${p.length>1?'foram avisados':'foi avisado(a)'}`);setTimeout(esRe,900);});},
 esAddC:v=>{const {x,b}=refB(v);window._ecS={v,k:x.min==='Louvor'?'musica':x.min==='Kids'?'material':'musica',sel:{video:{ids:[],cfg:{}},musica:{ids:[],cfg:{}},material:{ids:[],cfg:{}},pregacao:{ids:[],cfg:{}}},out:{t:'',d:''},q:''};
  openDlg(`${dlgHead('Adicionar conteúdo',`${esc(b.label)} · escolha o tipo e depois o item da biblioteca`)}<div class="ec-ty" role="radiogroup" aria-label="Tipo de conteúdo">${Object.entries(ECT).map(([k,t])=>`<button type="button" role="radio" class="ec-t ${k}" data-k="${k}"><span class="ec-ti">${ic(t[2],16)}</span><b>${t[0]}</b><small>${t[1]}</small><em class="ec-bd" data-bd="${k}"></em></button>`).join('')}</div><div id="ecBody"></div>
   <div class="dfoot ec-ft"><span class="ec-sum" id="ecSum"></span><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" data-a="esDoC" data-v="${v}" id="ecGo" disabled>Adicionar</button></div>`,'lg');
  $('.ec-ty').addEventListener('click',e=>{const t=e.target.closest('[data-k]');if(!t)return;const E=window._ecS;if(E.k===t.dataset.k)return;Object.assign(E,{k:t.dataset.k,q:''});ecPaint();});ecPaint();},
 esDoC:(v,bt)=>{const E=window._ecS,{b}=refB(v),err=(m,k)=>{if(k&&k!==E.k){E.k=k;E.q='';ecPaint();}const e=$('#ecErr');e.innerHTML=`${ic('alert',13,2)}${m}`;e.hidden=false;};const items=[];
  for(const k of ['musica','material','pregacao','video']){const P=E.sel[k],lib=ecSrc(k);
   for(const id of P.ids){const src=lib.find(z=>z.id===id),o=src.o,cf=P.cfg[id];
    if(k==='musica'){if(b.content.some(c=>c.k==='musica'&&c.ref===id&&c.key===cf.key))return err(`${src.t} em ${cf.key} já está neste bloco`,k);items.push({t:src.t,d:`Tom ${cf.key}${cf.key!==o.key?' (original '+o.key+')':''} · ${o.art}`,k,ref:id,key:cf.key});}
    else if(k==='video'){items.push({t:src.t,d:o.url,k,ref:id});}
    else if(k==='material'){const fs=o.files.map(f=>f.n).filter(n=>cf.files.includes(n));if(o.files.length&&!fs.length)return err(`Marque pelo menos um arquivo de “${src.t}”`,k);items.push({t:src.t,d:fs.length===o.files.length?(fs.length?`${fs.length} arquivo${fs.length===1?'':'s'}`:'sem arquivos'):fs.join(', '),k,ref:id,files:fs});}
    else items.push({t:src.t,d:`${o.who} · ${fmtD(o.d)}`,k,ref:id});}}
  const ot=E.out.t.trim();if(ot)items.push({t:ot,d:E.out.d.trim(),k:'outro'});
  if(!items.length)return err(E.k==='outro'?'Dê um título ou selecione itens de outro tipo':'Selecione pelo menos um item');
  bt.classList.add('busy');setTimeout(()=>{b.content.push(...items);closeDlg();esRe();toast(items.length>1?`${items.length} itens adicionados ao bloco`:`${ECT[items[0].k][0]}: ${items[0].t} adicionad${items[0].k==='musica'||items[0].k==='pregacao'?'a':'o'}`);},350);},
 esDelC:v=>{const {b,mi}=refB(v),c=b.content[mi];b.content.splice(mi,1);esRe();toast(`${c.t} removido`,()=>{b.content.splice(mi,0,c);esRe();});},
 esReuse:v=>{const {x,b}=refB(v),src=x.dates.flatMap(d=>d.blocks.filter(z=>z!==b&&z.content.length).map(z=>({d,z})));
  openDlg(`${dlgHead('Reaproveitar conteúdo','Copia o conteúdo de outro bloco desta escala.')}<div class="pick">${src.length?src.map((s,i)=>`<label class="pk"><span class="cti">${ic('layers',15)}</span><span><b>${esc(s.z.label)} · ${fmtD(eById(s.d.ev).d)}</b><small>${s.z.content.map(c=>esc(c.t)).join(', ')}</small></span><input type="radio" name="rs" value="${i}" ${!i?'checked':''}></label>`).join(''):'<p class="who" style="padding:12px">Nenhum outro bloco tem conteúdo ainda.</p>'}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoReuse" data-v="${v}" ${src.length?'':'disabled'}>Copiar conteúdo</button></div>`,'sm');
  window._esSrc=src;},
 esDoReuse:v=>{const {b}=refB(v),s=window._esSrc[+$('input[name=rs]:checked').value];let n=0;s.z.content.forEach(c=>{if(!b.content.some(z=>z.t===c.t)){b.content.push({...c});n++;}});closeDlg();esRe();toast(n?`${n} ${n===1?'item copiado':'itens copiados'}`:'Esse conteúdo já estava no bloco');},
 esSend:(v,bt)=>{const x=esById(S.esc),ms=esMembers(x),empty=x.dates.reduce((a,d)=>a+d.blocks.filter(b=>!b.members.length).length,0);
  openDlg(`${dlgHead('Enviar para os escalados?',`${ms.length} ${ms.length===1?'pessoa recebe':'pessoas recebem'} o pedido no app e por e-mail para aceitar ou recusar.`)}${empty?`<p class="eswarn">${ic('alert',13,2)}${empty} ${empty===1?'bloco está':'blocos estão'} sem ninguém. Dá para completar depois.</p>`:''}${(()=>{const ov=[...new Set(ms.filter(m=>m.over&&m.st!=='recusado').map(m=>m.n))];return ov.length?`<div class="lm-w bad" style="margin-top:10px">${ic('alert',14,2.2)}<div><b>${ov.length} ${ov.length===1?'convite vai':'convites vão'} como exceção ao limite mensal</b><span>${ov.map(n=>esc(n.split(' ')[0])).join(', ')} ${ov.length===1?'vê':'veem'} o aviso no app e ${ov.length===1?'pode':'podem'} recusar sem constrangimento.</span></div></div>`:'';})()}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="esDoSend">Enviar</button></div>`,'sm');},
 esDoSend:(v,bt)=>{bt.classList.add('busy');setTimeout(()=>{const x=esById(S.esc);x.st='aguardando';esMembers(x).forEach(m=>{if(m.st==='rascunho')m.st='aguardando';});closeDlg();esRe();toast('Pedidos enviados. Você será avisado quando responderem.');},800);},
 esRemind:(v,bt)=>busy(bt,800,'Lembrete enviado',()=>{const x=esById(S.esc),p=esMembers(x).filter(m=>m.st==='aguardando');toast(`Lembrete enviado para ${p.map(m=>m.n.split(' ')[0]).join(', ')}`);}),
 esApprove:(v,bt)=>{bt.classList.add('busy');setTimeout(()=>{const x=esById(S.esc);x.st='aprovada';esRe();toast(`${x.n} aprovada`);},600);},
 esDup:()=>{closePops();const x=esById(S.esc),c=JSON.parse(JSON.stringify(x));c.id='es'+Date.now();c.n=x.n.replace(/— \w+$/,'')+'(cópia)';c.st='criacao';c.dates=[];ESCALAS.unshift(c);S.esc=c.id;render();toast('Escala duplicada sem datas. Adicione as do próximo mês.');},
 esDel:()=>{closePops();const x=esById(S.esc),n=esMembers(x).length;confirmDel({title:`Excluir ${x.n}?`,body:`${n&&x.st!=='criacao'?`As ${n} pessoas escaladas são avisadas do cancelamento. `:''}Os eventos continuam no Calendário. Esta ação não pode ser desfeita.`,label:'Excluir escala',typed:n&&x.st!=='criacao'?x.n:null,onConfirm:()=>{ESCALAS.splice(ESCALAS.indexOf(x),1);S.esc=null;render();toast(`${x.n} excluída`);}});},
};

Object.assign(EA,{mnEscF:v=>{S.mnesf=v;reMn();},mnEscGo:v=>{S.active='escalas';S.esc=v;S.estab='datas';S.esview='blocos';S.esM=null;S.esSel=null;S.mini=null;S.evt=null;render();window.scrollTo({top:0});}});

/* ---------- limite mensal de escalas ---------- */
const LMR={on:true,limit:3,notifyMember:true,warnNear:true};
const LMX=[
 {n:'Helena Duarte',lim:1,until:'2026-11',why:'Semestre de provas na faculdade',by:'Rafael Pereira',at:'2026-09-12'},
 {n:'Daniela Rocha',lim:5,until:'',why:'Líder do Louvor, serve na maioria dos cultos',by:'Ana Lima',at:'2026-08-30'},
 {n:'Larissa Pires',lim:0,until:'2026-10',why:'Mudança de casa neste mês',by:'Rafael Pereira',at:'2026-09-25'}];
const LMPREF={'Bruno Reis':2};
const LMYM='2026-10';
Object.assign(S,{lmtab:'lim',lmD:null,lmYm:LMYM,lmEx:null,lmq:'',lmF:null,lmConf:false});
const lmMon=ym=>MONTHS[+ym.slice(5,7)-1];
const lmMs=ym=>lmMon(ym).slice(0,3);
const lmYmOf=d=>(eById(d.ev)||{}).d?.slice(0,7)||'';
const lmMonY=ym=>lmMon(ym)[0].toUpperCase()+lmMon(ym).slice(1)+' '+ym.slice(0,4);
function lmEntries(n,ym){const r=[];ESCALAS.forEach(x=>x.dates.forEach(d=>{if(lmYmOf(d)!==ym)return;d.blocks.forEach(b=>b.members.forEach(m=>{if(m.n===n&&m.st!=='recusado')r.push({x,d,b,m});}));}));return r;}
const lmCount=(n,ym)=>lmEntries(n,ym).length;
function lmExc(n,ym){const e=LMX.find(z=>z.n===n);return e&&(!e.until||e.until>=ym)?e:null;}
function lmLim(n,ym,r=LMR){const e=lmExc(n,ym);return e?e.lim:r.on?r.limit:Infinity;}
function lmUse(n,ym,r=LMR){const c=lmCount(n,ym),lim=lmLim(n,ym,r),e=lmExc(n,ym);const st=lim===0?(c?'over':'pause'):lim===Infinity?'free':c>lim?'over':c===lim?'full':c===lim-1?'near':'free';return {c,lim,e,st,pref:LMPREF[n]};}
const LMST={over:['Acima do limite','var(--st-rec)','var(--st-rec-bg)'],full:['No limite','var(--st-rec)','var(--st-rec-bg)'],pause:['Em pausa','var(--ink-muted)','var(--surface-2)'],near:['Última vaga','var(--st-sol)','var(--st-sol-bg)'],free:['Com vaga','var(--st-int)','var(--st-int-bg)']};
const LMORD=['over','full','pause','near','free'];
const lmSort=(a,b)=>LMORD.indexOf(a.st)-LMORD.indexOf(b.st)||b.c-a.c||a.n.localeCompare(b.n);
const lmPill=(n,ym,r)=>{const u=lmUse(n,ym,r);if(u.lim===Infinity)return '';return `<span class="lm-p ${u.st}" title="${u.c} de ${u.lim} escalas em ${lmMon(ym)}${u.e?' · exceção individual':''}">${u.lim===0?`${ic('pause',10,2.6)}Pausa`:`<b>${u.c}</b>/${u.lim}`}<small>${lmMs(ym)}</small></span>`;};
const lmStp=s=>`<span class="stp" style="--c:${LMST[s][1]};--b:${LMST[s][2]}"><i></i>${LMST[s][0]}</span>`;
const lmDots=(c,lim)=>{const t=Math.min(10,Math.max(c,lim===Infinity?c:lim));return `<span class="lm-dots" aria-hidden="true">${Array.from({length:t},(_,i)=>`<i class="${i<c?(i>=lim?'ov':'on'):''}"></i>`).join('')}</span>`;};
const lmAv=n=>`<span class="av" style="background:var(--tone-${TONES[n.length%6]});color:var(--tone-${TONES[n.length%6]}-ink)">${initials(n)}</span>`;
function lmPeople(ym,r){const s=new Set();ESCALAS.forEach(x=>x.dates.forEach(d=>{if(lmYmOf(d)===ym)d.blocks.forEach(b=>b.members.forEach(m=>{if(m.st!=='recusado')s.add(m.n);}));}));LMX.forEach(e=>{if(!e.until||e.until>=ym)s.add(e.n);});return [...s].map(n=>({n,...lmUse(n,ym,r)}));}
function lmCand(c,q,ym){q=norm(q);const l=c.filter(m=>norm(m.n).includes(q)).slice(0,8);return l.length?l.map(m=>`<label class="pk">${mav(m)}<span><b>${esc(m.n)}</b><small>${m.min.length?m.min.join(', '):ST[m.st].l}</small></span>${lmPill(m.n,ym)}<input type="radio" name="pm" value="${m.id}"></label>`).join(''):'<p class="who" style="padding:10px">Ninguém encontrado.</p>';}

function lmCard(){
 const ym=LMYM,p=lmPeople(ym),k=s=>p.filter(z=>z.st===s).length,hot=p.filter(z=>['over','full','near','pause'].includes(z.st)).sort(lmSort).slice(0,4);
 return `<section class="card lm-bal rise" style="--d:2">
  <div class="lm-rule"><div class="lm-big ${LMR.on?'':'off'}"><b>${LMR.on?LMR.limit:'∞'}</b><span>${LMR.on?'por mês':'sem teto'}</span></div>
   <div class="dkt"><b>${LMR.on?`Até ${LMR.limit} escalas por pessoa`:'Limite mensal desligado'}</b><span>${LMR.on?'Somando todos os ministérios':'Só as exceções individuais valem'} · ${LMX.length} exceç${LMX.length===1?'ão':'ões'}</span>
   <button class="btn sec sm" data-a="lmOpen" data-v="lim" style="margin-top:10px;align-self:flex-start">${ic('sliders',14)}Regras de escala</button></div></div>
  <div class="lm-cnt">${[['over','Acima'],['full','No limite'],['near','Última vaga'],['pause','Em pausa']].map(s=>`<button class="lm-c ${s[0]}" data-a="lmOpen" data-v="carga"><b>${k(s[0])}</b><span>${s[1]}</span></button>`).join('')}</div>
  <div class="lm-hot"><div class="sh" style="margin:0 0 8px"><p class="fl" style="margin:0">Equilíbrio de ${lmMon(ym)}</p><button class="lnk" data-a="lmOpen" data-v="carga">Ver todos</button></div>
   ${hot.length?hot.map(z=>`<div class="lm-hr">${lmAv(z.n)}<span class="lm-hn">${esc(z.n)}</span>${lmDots(z.c,z.lim)}${lmPill(z.n,ym)}</div>`).join(''):`<p class="who" style="margin:0">Ninguém perto do limite em ${lmMon(ym)}.</p>`}</div>
 </section>`;
}

/* rules dialog */
function lmPaint(){
 const t=S.lmtab,el=$('#lmIn');if(!el)return;
 el.innerHTML=`<div class="segc lm-tabs" role="tablist">${[['lim','Limite'],['exc','Exceções',LMX.length],['carga','Carga do mês']].map(z=>`<button data-a="lmTab" data-v="${z[0]}" aria-pressed="${t===z[0]}">${z[1]}${z[2]!==undefined?`<small>${z[2]}</small>`:''}</button>`).join('')}</div>
 <div class="lm-body">${t==='lim'?(S.lmConf?lmConfView():lmTabLim()):t==='exc'?(S.lmEx!==null?lmExForm():lmTabExc()):lmTabCarga()}</div>`;
 lmMount();
}
const lmDirty=()=>{const D=S.lmD;return D.on!==LMR.on||D.limit!==LMR.limit||D.notifyMember!==LMR.notifyMember||D.warnNear!==LMR.warnNear;};
function lmTabLim(){
 const D=S.lmD,p=lmPeople(LMYM,D),ov=p.filter(z=>z.st==='over').length,fu=p.filter(z=>z.st==='full').length;
 const impact=!D.on?'Sem limite. Só as exceções individuais valem.':ov||fu?`Em ${lmMon(LMYM)}: ${[fu?`${fu} ${fu===1?'pessoa':'pessoas'} no limite`:'',ov?`<b>${ov} acima</b>`:''].filter(Boolean).join(' · ')}`:`Em ${lmMon(LMYM)}, ninguém chega no limite.`;
 return `<div class="lm2 ${D.on?'':'off'}">
  <div class="lm2-top"><span class="lm2-lbl">Limite mensal</span><label class="tog lm2-sw"><input type="checkbox" id="lmOn" ${D.on?'checked':''}><span class="sw"></span><span>${D.on?'Ligado':'Desligado'}</span></label></div>
  <div class="lm2-main"><span>Cada pessoa serve até</span>
   <span class="lm2-step"><button type="button" data-a="lmStep" data-v="-1" ${!D.on||D.limit<=1?'disabled':''} aria-label="Diminuir">${ic('minus',16,2.4)}</button><output aria-live="polite"><b>${D.limit}</b></output><button type="button" data-a="lmStep" data-v="1" ${!D.on||D.limit>=10?'disabled':''} aria-label="Aumentar">${ic('plus',16,2.4)}</button></span>
   <span>${D.limit===1?'vez':'vezes'} por mês</span></div>
  <p class="lm2-sub">Somando todos os ministérios. Acima disso, só como exceção.</p>
  <button type="button" class="lm2-imp ${ov?'bad':''}" data-a="lmTab" data-v="carga">${impact}${D.on?ic('chevR',13,2.2):''}</button>
 </div>
 <details class="lm2-how" ${S.lmHow?'open':''}><summary>${ic('info',14,2)}Como a conta funciona${ic('chevD',14,2.2)}</summary><ul><li>Convites <b>aceitos e pendentes</b> contam.</li><li>Se a pessoa <b>recusa</b>, a vaga volta.</li><li>Cada <b>bloco</b> conta 1 (manhã e tarde = 2).</li></ul></details>
 <label class="tog lm2-ntf"><input type="checkbox" id="lmNm" ${D.notifyMember?'checked':''}><span class="sw"></span><span><b>Enviar avisos</b><small>Para a pessoa quando chega no limite, e para o líder na última vaga</small></span></label>
 <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="lmSave" ${lmDirty()?'':'disabled'}>Salvar</button></div>`;
}
function lmConfView(){
 const D=S.lmD,nw=lmPeople(LMYM,D).filter(z=>z.st==='over'&&lmUse(z.n,LMYM).st!=='over').sort(lmSort);
 return `<div class="lm-conf"><span class="lm-ci">${ic('alert',20,2)}</span><h4>${nw.length} ${nw.length===1?'pessoa fica':'pessoas ficam'} acima do novo limite</h4><p class="who">Em ${lmMon(LMYM)}, com ${D.limit} por mês. Nada é desfeito: as escalas já feitas continuam e ninguém é avisado. Novos convites para essas pessoas vão exigir exceção.</p>
  <div class="lm-cl">${nw.map(z=>`<div class="lm-hr">${lmAv(z.n)}<span class="lm-hn">${esc(z.n)}</span>${lmDots(z.c,z.lim)}${lmPill(z.n,LMYM,D)}</div>`).join('')}</div></div>
  <div class="dfoot"><button class="btn sec" data-a="lmBack">Voltar</button><button class="btn pri" data-a="lmSave" data-v="force">Salvar mesmo assim</button></div>`;
}
function lmTabExc(){
 const q=norm(S.lmq),l=LMX.map((e,i)=>({e,i})).filter(z=>!q||norm(z.e.n+' '+z.e.why).includes(q));
 return `<div class="lm-exh"><label class="sbox">${ic('search',16)}<input id="lmq" placeholder="Buscar pessoa ou motivo" value="${esc(S.lmq)}" autocomplete="off"></label><button class="btn pri sm" data-a="lmExNew">${ic('plus',14,2.2)}Nova exceção</button></div>
 <p class="who" style="margin:0 0 10px">Um limite próprio para quem precisa servir menos (ou mais) que o padrão. Limite 0 é uma pausa: a pessoa não aparece como disponível.</p>
 ${l.length?`<div class="lm-exl">${l.map(({e,i})=>{const exp=e.until&&e.until<LMYM,u=lmUse(e.n,LMYM),k=e.lim===0?'pz':e.lim>LMR.limit?'up':'dn',cap=e.lim===0?0:e.lim;
   return `<article class="lmx ${k} ${exp?'exp':''}">
    <div class="lmx-h">${lmAv(e.n)}<div class="lmx-n"><b>${esc(e.n)}</b><span>${esc(e.why)}</span></div>
     <div class="lmx-r"><span class="lmx-v">${e.lim===0?`${ic('pause',13,2.6)}<b>Pausa</b>`:`<b>${e.lim}</b><small>por mês</small>`}</span>
      <div class="lmx-a"><button class="ibtn sm" data-a="lmExEdit" data-v="${i}" aria-label="Editar exceção" title="Editar">${ic('sliders',14)}</button><button class="ibtn sm lm-del" data-a="lmExDel" data-v="${i}" aria-label="Remover exceção" title="Remover">${ic('x',14)}</button></div></div></div>
    <div class="lmx-f"><span class="lmx-t">${e.lim===0?'Não aparece como disponível':e.lim>LMR.limit?`Acima do padrão (${LMR.limit})`:`Abaixo do padrão (${LMR.limit})`}</span><span class="lmx-d">${ic('clock',12,2)}${exp?'Expirou':e.until?'até '+lmMs(e.until)+'/'+e.until.slice(2,4):'Sem prazo'}</span>
     <span class="lmx-u ${u.st}">${e.lim===0?(u.c?`<b>${u.c}</b> escala${u.c===1?'':'s'} em ${lmMs(LMYM)}`:`Nenhuma escala em ${lmMs(LMYM)}`):`${lmDots(u.c,cap)}<b>${u.c}</b>/${cap} em ${lmMs(LMYM)}`}</span></div>
   </article>`;}).join('')}</div>`
 :`<div class="mempty"><p>${q?'Nenhuma exceção encontrada':'Nenhuma exceção'}</p><span>${q?'Tente outro nome.':'Todos seguem o limite da igreja.'}</span></div>`}`;
}
const LMUNTIL=['','2026-10','2026-11','2026-12','2027-01','2027-02','2027-03'];
function lmExForm(){
 const F=S.lmF,isNew=S.lmEx===-1,u=F.n?lmUse(F.n,LMYM):null,names=[...new Set(MEMBERS.map(m=>m.n))],dup=isNew&&F.n&&LMX.some(e=>e.n===F.n);
 const cmp=!LMR.on?'A igreja está sem limite. Esta exceção vira o teto dessa pessoa.':F.lim===0?'Pausa: não aparece como disponível e qualquer convite vira exceção.':F.lim<LMR.limit?`Menos que o padrão da igreja (${LMR.limit}). Para aliviar.`:F.lim>LMR.limit?`Mais que o padrão da igreja (${LMR.limit}). Use para líderes e quem pediu mais.`:`Igual ao padrão da igreja (${LMR.limit}).`;
 return `<div class="lm-exf"><button class="lnk back" data-a="lmExBack">${ic('chevL',13,2.2)}Exceções</button><h4>${isNew?'Nova exceção':'Editar exceção'}</h4>
  <div class="fld"><span class="fl">Membro</span>${isNew?`<label class="sbox">${ic('search',16)}<input id="lxq" placeholder="Buscar membro" autocomplete="off" value="${esc(S.lxq||'')}"></label><div class="pick" id="lxp" style="max-height:170px;margin-top:6px">${lmXList(names)}</div>`:`<div class="lm-xm">${lmAv(F.n)}<b>${esc(F.n)}</b>${lmPill(F.n,LMYM)}</div>`}<span class="err" id="lxe1"></span>
   ${dup?`<p class="eswarn">${ic('info',13,2)}${esc(F.n.split(' ')[0])} já tem uma exceção. Salvar substitui a atual.</p>`:''}</div>
  <div class="fgrid lm-x2">
   <div class="fld"><span class="fl">Limite próprio</span><div class="lm-step sm"><button type="button" data-a="lmXStep" data-v="-1" ${F.lim<=0?'disabled':''} aria-label="Diminuir">${ic('minus',14,2.4)}</button><output><b>${F.lim===0?'Pausa':F.lim}</b><small>${F.lim===0?'não escalar':F.lim===1?'escala por mês':'escalas por mês'}</small></output><button type="button" data-a="lmXStep" data-v="1" ${F.lim>=10?'disabled':''} aria-label="Aumentar">${ic('plus',14,2.4)}</button></div><span class="hint">${cmp}</span><span class="err" id="lxe2"></span></div>
   <label class="fld"><span class="fl">Vale até</span><span class="selw"><select id="lxu">${LMUNTIL.map(v=>`<option value="${v}" ${F.until===v?'selected':''}>${v?lmMonY(v):'Sem prazo'}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Depois disso volta ao limite da igreja, sozinho.</span></label>
  </div>
  <label class="fld"><span class="fl">Motivo</span><input id="lxw" maxlength="120" value="${esc(F.why)}" placeholder="Ex.: semestre de provas, líder do ministério…" autocomplete="off"><span class="hint">Só líderes e admins veem. <span id="lxc">${F.why.length}</span>/120</span><span class="err" id="lxe3"></span></label>
  ${u&&F.lim<u.c?`<p class="eswarn">${ic('alert',13,2)}${esc(F.n.split(' ')[0])} já tem ${u.c} escalas em ${lmMon(LMYM)}. Elas continuam; novos convites viram exceção.</p>`:''}
  <div class="dfoot"><button class="btn sec" data-a="lmExBack">Cancelar</button><button class="btn pri" data-a="lmExSave">${isNew?'Criar exceção':'Salvar exceção'}</button></div></div>`;
}
function lmXList(names){const q=norm(S.lxq||''),l=names.filter(n=>norm(n).includes(q)).slice(0,8);return l.length?l.map(n=>`<label class="pk">${lmAv(n)}<span><b>${esc(n)}</b><small>${LMX.some(e=>e.n===n)?'Já tem exceção':lmCount(n,LMYM)+' escala'+(lmCount(n,LMYM)===1?'':'s')+' em '+lmMon(LMYM)}</small></span>${lmPill(n,LMYM)}<input type="radio" name="lxm" value="${esc(n)}" ${S.lmF.n===n?'checked':''}></label>`).join(''):'<p class="who" style="padding:10px">Ninguém encontrado.</p>';}
function lmTabCarga(){
 const ym=S.lmYm,p=lmPeople(ym).sort(lmSort),tot=p.reduce((a,z)=>a+z.c,0);
 return `<div class="lm-mh"><button class="ibtn sm" data-a="lmYm" data-v="-1" ${ym<='2026-10'?'disabled':''} aria-label="Mês anterior">${ic('chevL',14,2)}</button><b>${lmMonY(ym)}</b><button class="ibtn sm" data-a="lmYm" data-v="1" ${ym>='2026-12'?'disabled':''} aria-label="Próximo mês">${ic('chevR',14,2)}</button><span class="who">${p.length} pessoas · ${tot} escalas</span></div>
 ${p.length?`<div class="lm-tb">${p.map(z=>{const mins=[...new Set(lmEntries(z.n,ym).map(e=>e.x.min))];return `<div class="lm-tr">${lmAv(z.n)}<span class="dkt"><b>${esc(z.n)}</b><span>${mins.length?mins.join(', '):'Sem escalas'}${z.e?` · <em class="lm-xt">exceção</em>`:''}${z.pref?` · prefere até ${z.pref}`:''}</span></span>${lmDots(z.c,z.lim)}<span class="lm-n"><b>${z.c}</b>/${z.lim===Infinity?'∞':z.lim}</span>${lmStp(z.st)}</div>`;}).join('')}</div>`
 :`<div class="mempty"><p>Ninguém escalado em ${lmMon(ym)}</p><span>As escalas desse mês ainda não foram montadas.</span></div>`}`;
}
function lmMount(){
 const on=$('#lmOn');if(on)on.addEventListener('change',()=>{S.lmD.on=on.checked;lmPaint();});
 const hw=$('.lm2-how');if(hw)hw.addEventListener('toggle',()=>{S.lmHow=hw.open;});const nm=$('#lmNm');if(nm)nm.addEventListener('change',()=>{S.lmD.notifyMember=nm.checked;S.lmD.warnNear=nm.checked;lmPaint();});
 const wn=$('#lmWn');if(wn)wn.addEventListener('change',()=>{S.lmD.warnNear=wn.checked;lmPaint();});
 const q=$('#lmq');if(q)q.addEventListener('input',()=>{S.lmq=q.value;const p=q.selectionStart;lmPaint();const n=$('#lmq');n.focus();n.setSelectionRange(p,p);});
 const lq=$('#lxq');if(lq)lq.addEventListener('input',()=>{S.lxq=lq.value;$('#lxp').innerHTML=lmXList([...new Set(MEMBERS.map(m=>m.n))]);});
 const lp=$('#lxp');if(lp)lp.addEventListener('change',e=>{if(e.target.name==='lxm'){S.lmF.n=e.target.value;const ex=LMX.find(z=>z.n===S.lmF.n);if(ex)Object.assign(S.lmF,{lim:ex.lim,until:ex.until,why:ex.why});lmPaint();}});
 const lu=$('#lxu');if(lu)lu.addEventListener('change',()=>{S.lmF.until=lu.value;});
 const lw=$('#lxw');if(lw)lw.addEventListener('input',()=>{S.lmF.why=lw.value;$('#lxc').textContent=lw.value.length;lw.closest('.fld').classList.remove('bad');});
}
const lmErr=(id,msg)=>{const e=$('#'+id);if(!e)return;e.textContent=msg;e.closest('.fld').classList.add('bad');};
function myLimit(){const c=MYESC.filter(x=>x.d.startsWith(LMYM)).length,lim=lmLim('Rafael Pereira',LMYM);if(lim===Infinity)return '';const st=c>lim?'over':c===lim?'full':c===lim-1?'near':'free';
 return `<div class="lm-me ${st}">${lmDots(c,lim)}<span class="dkt"><b>${c} de ${lim} escalas em ${lmMon(LMYM)}</b><span>${st==='full'||st==='over'?'Você chegou no limite do mês. Novos convites só chegam como exceção.':st==='near'?'Falta 1 para o seu limite do mês.':'Limite da igreja para ninguém ficar sobrecarregado.'}</span></span></div>`;}

const LMA={
 lmOpen:v=>{closePops&&closePops();S.lmtab=v||'lim';S.lmD={...LMR};S.lmEx=null;S.lmConf=false;S.lmq='';S.lmYm=LMYM;openDlg(`${dlgHead('Regras de escala','Para ninguém ficar sobrecarregado.')}<div id="lmIn"></div>`,'lm-dlg');lmPaint();},
 lmTab:v=>{S.lmtab=v;S.lmEx=null;S.lmConf=false;lmPaint();},
 lmStep:v=>{const D=S.lmD;D.limit=Math.max(1,Math.min(10,D.limit+ +v));lmPaint();const o=$('.lm-step output b');o&&o.animate([{transform:`translateY(${+v>0?6:-6}px)`,opacity:.3},{transform:'none',opacity:1}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});},
 lmBack:()=>{S.lmConf=false;lmPaint();},
 lmSave:(v,bt)=>{const D=S.lmD,nw=lmPeople(LMYM,D).filter(z=>z.st==='over'&&lmUse(z.n,LMYM).st!=='over');
  if(nw.length&&v!=='force'){S.lmConf=true;lmPaint();return;}
  const was={...LMR};busy(bt,700,'Salvo',()=>{Object.assign(LMR,D);LOG.unshift({u:'Rafael Pereira',a:'Alterou',e:'Regras de escala',x:'Limite mensal',det:D.on?`${was.on?was.limit:'sem limite'} → ${D.limit} por mês`:'Limite desligado',d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});
   setTimeout(()=>{closeDlg();render();toast(D.on?(was.on&&was.limit!==D.limit?`Limite alterado para ${D.limit} escalas por mês`:`Limite de ${D.limit} escalas por mês salvo`):'Limite mensal desligado. As exceções continuam valendo');},350);});},
 lmExNew:()=>{S.lmEx=-1;S.lxq='';S.lmF={n:'',lim:1,until:'',why:''};lmPaint();setTimeout(()=>$('#lxq')?.focus(),30);},
 lmExEdit:v=>{const e=LMX[+v];S.lmEx=+v;S.lmF={n:e.n,lim:e.lim,until:e.until,why:e.why};lmPaint();},
 lmExBack:()=>{S.lmEx=null;lmPaint();},
 lmXStep:v=>{S.lmF.lim=Math.max(0,Math.min(10,S.lmF.lim+ +v));lmPaint();},
 lmExSave:(v,bt)=>{const F=S.lmF;let ok=true;F.why=F.why.trim();
  if(!F.n){lmErr('lxe1','Escolha um membro');ok=false;}
  if(LMR.on&&F.lim===LMR.limit){lmErr('lxe2',`Igual ao limite da igreja (${LMR.limit}). Não precisa de exceção.`);ok=false;}
  if(!F.why){lmErr('lxe3','Conte o motivo. Ajuda outros líderes a entender');ok=false;}
  if(!ok)return;
  busy(bt,600,'Salvo',()=>{const i=LMX.findIndex(e=>e.n===F.n),rec={n:F.n,lim:F.lim,until:F.until,why:F.why,by:'Rafael Pereira',at:'2026-10-01'};if(i>-1)LMX[i]=rec;else LMX.unshift(rec);
   LOG.unshift({u:'Rafael Pereira',a:i>-1?'Editou':'Adicionou',e:'Exceção de escala',x:F.n,det:F.lim===0?'Pausa':`${F.lim} por mês`,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});
   const u=lmUse(F.n,LMYM),f=F.n.split(' ')[0];setTimeout(()=>{S.lmEx=null;S.lmq='';lmPaint();if(S.active==='escalas'&&!S.esc){const y=window.scrollY;render();window.scrollTo(0,y);}toast(F.lim===0?`${f} em pausa${F.until?' até '+lmMs(F.until):''}`:`${f}: até ${F.lim} por mês${u.c>F.lim?` · já tem ${u.c} em ${lmMon(LMYM)}, mantidas`:''}`);},300);});},
 lmExDel:v=>{const e=LMX[+v],f=e.n.split(' ')[0],c=lmCount(e.n,LMYM);confirmDel({title:`Remover a exceção de ${f}?`,body:`${esc(e.n)} volta a seguir o limite da igreja (${LMR.on?LMR.limit+' por mês':'sem limite'}).${LMR.on&&c>LMR.limit?` Já tem ${c} escalas em ${lmMon(LMYM)}: elas continuam valendo.`:''}`,label:'Remover exceção',onConfirm:()=>{const i=LMX.indexOf(e);LMX.splice(i,1);LOG.unshift({u:'Rafael Pereira',a:'Removeu',e:'Exceção de escala',x:e.n,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});if(S.active==='escalas'&&!S.esc)render();LMA.lmOpen('exc');toast(`Exceção de ${f} removida`,()=>{LMX.splice(i,0,e);if(S.active==='escalas'&&!S.esc)render();});}});},
 lmYm:v=>{let [y,m]=S.lmYm.split('-').map(Number);m+=+v;if(m<1){m=12;y--;}if(m>12){m=1;y++;}S.lmYm=`${y}-${String(m).padStart(2,'0')}`;lmPaint();},
 lmTeamGo:(v,bt)=>{const P=window._lmTeam;if(!P)return;const {x,b,t,ym}=P,list=t.m.filter(n=>!b.members.some(m=>m.n===n)),blk=list.filter(n=>{const u=lmUse(n,ym);return u.c>=u.lim;}),use=v==='all'?list:list.filter(n=>!blk.includes(n));
  b.team=t.n;use.forEach(n=>b.members.push({n,role:'Equipe',st:sentSt(x),over:blk.includes(n)||undefined}));if(v==='all'&&blk.length)LOG.unshift({u:'Rafael Pereira',a:'Escalou acima do limite',e:'Escala',x:blk.join(', '),det:x.n,d:'2026-10-01',t:new Date().toTimeString().slice(0,5)});
  closeDlg();esRe();toast(`${t.n}: ${use.length} ${use.length===1?'pessoa adicionada':'pessoas adicionadas'}${v==='all'&&blk.length?` · ${blk.length} como exceção`:blk.length?` · ${blk.length} ficaram de fora (limite)`:''}`);},
};

function lmWarn(n,ym){const u=lmUse(n,ym),f=esc(n.split(' ')[0]),mon=lmMon(ym);if(u.lim===Infinity)return '';let h='';
 if(u.lim===0)h=`<div class="lm-w bad">${ic('pause',14,2.4)}<div><b>${f} está em pausa${u.e.until?' até '+lmMonY(u.e.until).toLowerCase():''}</b><span>Motivo: ${esc(u.e.why)}. Só escale se já tiver combinado com ${f}.</span></div></div>`;
 else if(u.c>=u.lim)h=`<div class="lm-w bad">${ic('alert',14,2.2)}<div><b>${f} já tem ${u.c} de ${u.lim} escalas em ${mon}</b><span>${u.e?`Limite próprio (${esc(u.e.why)}).`:'Limite da igreja, somando todos os ministérios.'} Dá para escalar mesmo assim: o convite chega marcado como exceção e ${f} pode recusar sem constrangimento.</span></div></div>`;
 else if(u.c===u.lim-1&&LMR.warnNear)h=`<div class="lm-w near">${ic('info',14,2.2)}<div><b>Última vaga de ${f} em ${mon}</b><span>Com este convite fica ${u.lim} de ${u.lim}. Outros ministérios não vão conseguir escalar sem exceção.</span></div></div>`;
 if(u.pref&&u.c>=u.pref&&u.c<u.lim)h+=`<div class="lm-w soft">${ic('heart',14,2)}<div><b>${f} prefere servir até ${u.pref}x por mês</b><span>Definiu no app. Não bloqueia, mas vale conversar antes.</span></div></div>`;
 if(u.c>=u.lim)h+=`<label class="lm-ack"><input type="checkbox" id="emack"><span class="lm-ck">${ic('check',11,3)}</span><span>Entendo e quero escalar ${f} como exceção</span></label>`;
 return h;}

/* conteúdo do bloco: tipo + item da biblioteca */
const ECT={video:['Vídeo','Da biblioteca','play'],musica:['Música','Do repertório','music'],material:['Material de apoio','Apostilas e arquivos','file'],pregacao:['Pregação','Mensagem gravada','play'],outro:['Outro','Observação livre','layers']};
function ecSrc(k){return k==='video'?NX_VIDEOS.filter(v=>v.active).map(v=>({id:v.id,t:v.t,sub:v.tag,tag:v.tag,o:{...v,files:[]}})):k==='musica'?SONGS.map(z=>({id:z.id,t:z.n,sub:`${z.art} · Tom ${z.key} · ${z.bpm} bpm`,tag:z.cat,o:z})):k==='material'?MATS.map(z=>({id:z.id,t:z.t,sub:`${z.files.length} arquivo${z.files.length===1?'':'s'}${z.min?' · '+z.min:''}`,tag:'',o:z})):k==='pregacao'?PREGS.slice().sort((a,b)=>a.d<b.d?1:-1).map(z=>({id:z.id,t:z.t,sub:`${z.who} · ${fmtD(z.d)}`,tag:'',o:z})):[];}
function ecPaint(){const E=window._ecS,el=$('#ecBody');if(!el)return;$$('.ec-t').forEach(t=>t.setAttribute('aria-checked',t.dataset.k===E.k));const go=$('#ecGo'),P=E.sel[E.k]||{ids:[],cfg:{}};ecFoot();
 if(E.k==='outro'){el.innerHTML=`<div class="ec-out"><p class="ec-note">${ic('info',13,2)}Use só para o que não está na biblioteca, como um recado ou uma dinâmica.</p><label class="fld"><span class="fl">Título</span><input id="ecT" maxlength="80" placeholder="Ex.: Momento de oração pelos pais" autocomplete="off" value="${esc(E.out.t)}"><span class="err"></span></label><label class="fld"><span class="fl">Observação <small>opcional</small></span><input id="ecD" maxlength="120" placeholder="Duração, responsável, link…" autocomplete="off" value="${esc(E.out.d)}"></label></div>`;$('#ecT').addEventListener('input',e=>{E.out.t=e.target.value;e.target.closest('.fld').classList.remove('bad');ecFoot();});$('#ecD').addEventListener('input',e=>{E.out.d=e.target.value;});setTimeout(()=>$('#ecT').focus(),30);return;}
 const lib={video:'Vídeos',musica:'Repertório',material:'Material de apoio',pregacao:'Pregações'}[E.k],src=ecSrc(E.k),{b}=refB(E.v);
 el.innerHTML=`<div class="ec-2"><div class="ec-l"><div class="ec-lh"><p class="fl">1 · Selecione em ${lib}</p><span class="ec-n" id="ecN"></span></div><label class="sbox">${ic('search',16)}<input id="ecQ" placeholder="Buscar ${E.k==='musica'?'música ou artista':E.k==='material'?'material':'pregação ou pregador'}" value="${esc(E.q)}" autocomplete="off"></label><div class="ec-grid" id="ecL"></div></div><div class="ec-r" id="ecR"></div></div><p class="eswarn" id="ecErr" hidden></p>`;
 const inBlk=id=>b.content.some(c=>c.k===E.k&&c.ref===id);
 const list=()=>{const q=norm(E.q),l=src.filter(z=>!q||norm(z.t+' '+z.sub).includes(q));$('#ecL').innerHTML=l.length?l.map(z=>{const on=P.ids.includes(z.id),ib=inBlk(z.id)&&E.k!=='musica';return `<button type="button" class="ec-it ${on?'on':''}" data-id="${z.id}" aria-pressed="${on}" ${ib?'disabled title="Já está neste bloco"':''}><span class="cti ec-k ${E.k}">${ic(ECT[E.k][2],14)}</span><span class="dkt"><b>${esc(z.t)}</b><span>${ib?'Já está neste bloco':esc(z.sub)}</span></span><span class="ec-cb">${ic(ib||on?'check':'plus',12,2.6)}</span></button>`;}).join(''):`<p class="who" style="padding:10px">Nada encontrado. Cadastre em Conteúdo › ${lib}.</p>`;};
 const detail=()=>{const r=$('#ecR'),n=P.ids.length;$('#ecN').textContent=n?`${n} selecionad${E.k==='musica'||E.k==='pregacao'?'a':'o'}${n===1?'':'s'}`:'';ecFoot();
  if(!n){r.innerHTML=`<div class="ec-empty"><span>${ic(ECT[E.k][2],20)}</span><p>Toque nos itens ao lado para selecionar.<br>Dá para escolher mais de um.</p></div>`;return;}
  r.innerHTML=`<p class="fl">2 · ${E.k==='musica'?'Tom de cada música':E.k==='material'?'Arquivos de cada material':'Selecionadas'}</p><div class="ec-sl">${P.ids.map((id,i)=>{const z=src.find(q=>q.id===id),o=z.o,cf=P.cfg[id];
   const body=E.k==='musica'?`<div class="ec-kr"><span class="soft">${esc(o.art)}</span><span class="selw sm"><select data-key="${id}" aria-label="Tom de ${esc(o.n)}">${KEYS.map(k=>`<option ${k===cf.key?'selected':''}>${k}</option>`).join('')}</select>${ic('updown',12)}</span>${cf.key!==o.key?`<small class="ec-tr">de ${o.key}</small>`:''}</div>`
    :E.k==='material'?(o.files.length?`<div class="ec-chips">${o.files.map(f=>`<button type="button" class="ec-fc ${cf.files.includes(f.n)?'on':''}" data-f="${id}|${esc(f.n)}" aria-pressed="${cf.files.includes(f.n)}">${fTile(f.n,20)}<span>${esc(f.n)}</span>${ic('check',11,3)}</button>`).join('')}</div>`:`<p class="ec-note warn" style="margin:4px 0 0">${ic('alert',12,2)}Sem arquivos. Vai como referência.</p>`)
    :E.k==='video'?`<span class="soft">${esc(o.desc||o.tag)}</span>`:`<span class="soft">${esc(o.who)} · ${fmtD(o.d)} · ${o.dur} min</span>`;
   return `<div class="ec-s" style="--i:${i}"><div class="ec-sh"><span class="cti ec-k ${E.k}">${ic(ECT[E.k][2],13)}</span><b>${esc(z.t)}</b><button type="button" class="ibtn sm" data-rm="${id}" aria-label="Tirar ${esc(z.t)}">${ic('x',12)}</button></div>${body}</div>`;}).join('')}</div>`;};
 list();detail();
 $('#ecQ').addEventListener('input',e=>{E.q=e.target.value;list();});
 $('#ecL').addEventListener('click',e=>{const t=e.target.closest('.ec-it');if(!t||t.disabled)return;const id=t.dataset.id,i=P.ids.indexOf(id);if(i>-1)P.ids.splice(i,1);else{P.ids.push(id);const o=src.find(z=>z.id===id).o;P.cfg[id]=P.cfg[id]||(E.k==='musica'?{key:o.key}:E.k==='material'?{files:o.files.map(f=>f.n)}:{});}$('#ecErr').hidden=true;list();detail();});
 $('#ecR').addEventListener('click',e=>{const rm=e.target.closest('[data-rm]');if(rm){P.ids.splice(P.ids.indexOf(rm.dataset.rm),1);list();detail();return;}
  const fc=e.target.closest('[data-f]');if(fc){const [id,n]=fc.dataset.f.split('|'),fs=P.cfg[id].files,i=fs.indexOf(n);if(i>-1)fs.splice(i,1);else fs.push(n);fc.classList.toggle('on',i<0);fc.setAttribute('aria-pressed',i<0);$('#ecErr').hidden=true;}});
 $('#ecR').addEventListener('change',e=>{const s=e.target.closest('[data-key]');if(s){P.cfg[s.dataset.key].key=s.value;detail();}});
}

function ecFoot(){const E=window._ecS,go=$('#ecGo');if(!go)return;const c={video:E.sel.video?.ids.length||0,musica:E.sel.musica.ids.length,material:E.sel.material.ids.length,pregacao:E.sel.pregacao.ids.length,outro:E.out.t.trim()?1:0},n=c.video+c.musica+c.material+c.pregacao+c.outro;
 $$('[data-bd]').forEach(x=>{const v=c[x.dataset.bd];x.textContent=v||'';x.classList.toggle('on',!!v);});
 go.disabled=!n;go.textContent=n>1?`Adicionar ${n} itens`:'Adicionar';
 const sm=$('#ecSum');if(sm){const parts=[[c.video,'vídeo','vídeos'],[c.musica,'música','músicas'],[c.material,'material','materiais'],[c.pregacao,'pregação','pregações'],[c.outro,'outro','outros']].filter(z=>z[0]).map(z=>`${z[0]} ${z[0]===1?z[1]:z[2]}`);sm.innerHTML=parts.length?`${ic('check',12,2.6)}No bloco vão: ${parts.join(' · ')}`:'';}}

/* presença: UI */
function ckBar(d,e){const st=ckState(e);if(!st)return '';const w=ckWin(e),ms=d.blocks.flatMap(b=>b.members).filter(m=>m.st==='confirmado'),c=k=>ms.filter(m=>ckOf(m)===k).length;
 const tx=st==='antes'?`Check-in abre às ${ckHM(w.open)}, 2h antes`:st==='fim'?`Check-in encerrou às ${ckHM(w.close)}`:`Check-in aberto até ${ckHM(w.close)}`;
 return `<div class="ckbar ${st}"><span class="ckb-i">${ic('pin',16,2)}</span><div class="dkt"><b>Hoje · ${tx}</b><span>${esc(e.place)} · agora ${ckHM(CKNOW)}</span></div>
  <div class="ckb-n">${[['ok','presentes'],['pend','sem check-in'],['falta','ausentes']].filter(z=>c(z[0])||z[0]!=='falta').map(z=>`<span class="${z[0]}"><b>${c(z[0])}</b>${z[1]}</span>`).join('')}</div>
  ${S.estab==='ck'?'':`<button class="btn pri sm" data-a="esTab" data-v="ck">Abrir check-in${ic('arrowR',14,2)}</button>`}</div>`;}
function ckCell(m,ref,e){const k=ckOf(m),w=ckWin(e),pill=(lab,sub)=>`<span class="ckp ${k}"><b>${lab}</b>${sub?`<small>${sub}</small>`:''}</span>`,und=`<button class="ibtn sm" data-a="ckUndo" data-v="${ref}" aria-label="Desfazer" title="Desfazer">${ic('swap',13)}</button>`;
 if(k==='ok')return `${pill('Presente',m.manual?`marcado por ${m.by.toLowerCase()}${m.why?' · '+esc(m.why):''}`:`check-in ${m.ck.at}`)}<button class="btn sec sm ckf" data-a="ckFalta" data-v="${ref}">Ausente</button>${und}`;
 if(k==='falta')return `${pill('Ausente','marcado por você')}<button class="btn sec sm" data-a="ckMan" data-v="${ref}">Marcar presente</button>${und}`;
 const pre=CKNOW<w.start;return `${pill('Sem check-in','')}<button class="btn sec sm" data-a="ckMan" data-v="${ref}">Marcar presente</button><button class="btn sec sm ckf" data-a="ckFalta" data-v="${ref}" ${pre?`disabled title="Disponível depois do início (${ckHM(w.start)})"`:''}>Ausente</button>`;}
const CKA={
 ckMan:v=>{const {b,mi}=refB(v),m=b.members[mi],f=m.n.split(' ')[0];
  openDlg(`${dlgHead(`Marcar ${esc(f)} como presente?`,`Use quando a pessoa está no local mas não fez o check-in.`)}<p class="fl ckwhy-l">Motivo <small>opcional</small></p><div class="ckwhy" id="ckWhy">${[['Esqueceu o celular','phone'],['Sem internet','radio'],['Chegou depois','clock'],['Outro','dots']].map(([w,i])=>`<button type="button" class="chipf" data-w="${w}"><span>${ic(i,15,2)}</span>${w}</button>`).join('')}</div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="ckDoMan" data-v="${v}">Marcar presente</button></div>`,'sm');
  $('#ckWhy').addEventListener('click',e=>{const t=e.target.closest('[data-w]');if(!t)return;const was=t.classList.contains('on');$$('#ckWhy .chipf').forEach(z=>z.classList.toggle('on',z===t&&!was));});},
 ckDoMan:(v,bt)=>{const w=$('#ckWhy .chipf.on')||{dataset:{w:''}};const {b,mi}=refB(v),m=b.members[mi];bt.classList.add('busy');setTimeout(()=>{Object.assign(m,{pr:'ok',manual:true,why:w.dataset.w,by:'Você'});LOG.unshift({u:'Rafael Pereira',a:'Marcou presença',e:'Escala',x:m.n,det:w.dataset.w?`Manual · ${w.dataset.w}`:'Manual',d:CKDAY,t:ckHM(CKNOW)});closeDlg();esRe();toast(`${m.n.split(' ')[0]} marcado(a) como presente`,()=>{delete m.pr;delete m.manual;delete m.why;esRe();});},400);},
 ckFalta:v=>{const {b,mi}=refB(v),m=b.members[mi],f=m.n.split(' ')[0];confirmDel({title:`Marcar ${f} como ausente?`,body:`${esc(m.n)} fica como ausente nesta data. Fica no histórico de serviço. Dá para desfazer.`,label:'Marcar ausente',onConfirm:()=>{delete m.manual;delete m.why;m.pr='falta';LOG.unshift({u:'Rafael Pereira',a:'Registrou ausência',e:'Escala',x:m.n,d:CKDAY,t:ckHM(CKNOW)});esRe();toast(`${f} marcado(a) como ausente`,()=>{delete m.pr;esRe();});}});},
 ckUndo:v=>{const {b,mi}=refB(v),m=b.members[mi],old={pr:m.pr,manual:m.manual,why:m.why};delete m.pr;delete m.manual;delete m.why;esRe();toast(`Presença de ${m.n.split(' ')[0]} reaberta`,()=>{Object.assign(m,old);esRe();});},
};

/* aba Check-in */
const ckToday=x=>x.dates.find(d=>{const e=eById(d.ev);return e&&e.d===CKDAY;});
function esCk(x){const d=ckToday(x),ds=esSorted(x),fut=ds.filter(z=>{const e=eById(z.ev);return e&&e.d>CKDAY;}),pas=ds.filter(z=>{const e=eById(z.ev);return e&&e.d<CKDAY;});
 if(!d&&!fut.length&&pas.length)return esCkPast(pas[pas.length-1]);
 const how=`<div class="ckhow"><span>${ic('clock',15,2)}<b>Abre 2h antes</b><small>e fecha 2h depois do início</small></span><span>${ic('check',15,2.4)}<b>Check-in = Presente</b><small>a pessoa faz no app</small></span><span>${ic('swap',15,2)}<b>Você ajusta</b><small>marca presente, ausente ou desfaz</small></span></div>`;
 if(!d){const nx=fut[0],e=nx&&eById(nx.ev),w=e&&ckWin(e);
  return `<section class="card ckempty"><span class="cke-i">${ic('pin',26,1.8)}<i></i></span><h2>${nx?'O check-in ainda não abriu':'Nenhuma data com check-in'}</h2><p class="who">${nx?`Os check-ins aparecem aqui no dia da escala. O próximo é <b>${esc(e.t)}</b>, ${wd(e.d)}, ${dBR(e.d)}, a partir das <b>${ckHM(w.open)}</b>.`:'Adicione datas futuras na aba Datas para acompanhar a presença do time.'}</p>
   ${nx?`<div class="cknext">${fut.slice(0,4).map(z=>{const ev=eById(z.ev),wn=ckWin(ev),n=z.blocks.reduce((a,b)=>a+b.members.filter(m=>m.st!=='recusado').length,0);return `<div class="ckn-r">${dTile(ev)}<span class="dkt"><b>${esc(ev.t)}</b><span>${n} pessoa${n===1?'':'s'} · abre às ${ckHM(wn.open)}</span></span><span class="ckn-in">em ${inDays(ev.d)} dia${inDays(ev.d)===1?'':'s'}</span></div>`;}).join('')}</div>`:`<button class="btn pri" data-a="esTab" data-v="datas" style="margin-top:6px">Ir para Datas</button>`}
   ${how}</section>`;}
 const e=eById(d.ev),ms=d.blocks.flatMap(b=>b.members.map((m,i)=>({m,b,i}))).filter(z=>z.m.st==='confirmado'),c=k=>ms.filter(z=>ckOf(z.m)===k).length,tot=ms.length,okp=Math.round(c('ok')/Math.max(tot,1)*100);
 const ord={ck:0,pend:1,ok:2,falta:3},nck=c('ck');
 return `<section class="card ckpanel">${ckBar(d,e)}
  <div class="ckgrid"><div class="ckring" style="--p:${okp}"><div><b>${c('ok')}<small>/${tot}</small></b><span>presentes</span></div></div>
   <div class="cklist">${ms.sort((a,b)=>ord[ckOf(a.m)]-ord[ckOf(b.m)]).map(({m,b,i})=>`<div class="esm ckr ${ckOf(m)}"><span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span><span class="dkt"><b>${esc(m.n)}</b><span>${esc(m.role)}${d.blocks.length>1?' · '+esc(b.label):''}</span></span>${ckCell(m,`${d.id}|${b.id}|${i}`,e)}</div>`).join('')}</div></div>
  ${d.blocks.flatMap(b=>b.members).some(m=>m.st!=='confirmado'&&m.st!=='recusado')?`<p class="eswarn" style="margin-top:12px">${ic('alert',13,2)}Quem não confirmou a escala não aparece no check-in.</p>`:''}
 </section>`;}

/* escala realizada: presença da última data, só leitura */
function esCkPast(d){const e=eById(d.ev),l=d.blocks.flatMap(b=>b.members.map(m=>({m,b}))).filter(z=>z.m.st==='confirmado'),n=k=>l.filter(z=>ckOf(z.m)===k).length,ord={ok:0,falta:1,pend:2};
 return `<section class="card ckpanel"><div class="ckbar fim"><span class="ckb-i">${ic('check',16,2)}</span><div class="dkt"><b>${esc(e.t)} · ${wd(e.d)}, ${dBR(e.d)}</b><span>Realizada · a presença abaixo é só para consulta</span></div><div class="ckb-n"><span class="ok"><b>${n('ok')}</b>presentes</span><span class="falta"><b>${n('falta')}</b>ausentes</span></div></div>
  <div class="cklist" style="margin-top:12px">${l.sort((a,b)=>ord[ckOf(a.m)]-ord[ckOf(b.m)]).map(({m,b})=>`<div class="esm ckr ${ckOf(m)}"><span class="av" style="background:var(--tone-${TONES[m.n.length%6]});color:var(--tone-${TONES[m.n.length%6]}-ink)">${initials(m.n)}</span><span class="dkt"><b>${esc(m.n)}</b><span>${esc(m.role)}${d.blocks.length>1?' · '+esc(b.label):''}</span></span>${attPill(m)}</div>`).join('')}</div></section>`;}
function ckGroups(){const g={};ESCALAS.forEach(x=>{const d=ckToday(x);if(!d)return;const e=eById(d.ev);(g[e.id]=g[e.id]||{e,list:[]}).list.push({x,d});});
 return Object.values(g).map(G=>{G.list.forEach(z=>{const ms=z.d.blocks.flatMap(b=>b.members).filter(m=>m.st==='confirmado');z.tot=ms.length;z.ok=ms.filter(m=>ckOf(m)==='ok').length;z.ck=ms.filter(m=>ckOf(m)==='ck').length;z.pend=ms.filter(m=>ckOf(m)==='pend').length;z.mn=MINIS.find(m=>m.n===z.x.min)||{icon:'users',lead:''};});
  G.list.sort((a,b)=>b.pend-a.pend||b.ck-a.ck||a.x.min.localeCompare(b.x.min));['tot','ok','ck','pend'].forEach(k=>G[k]=G.list.reduce((n,z)=>n+z[k],0));return G;}).sort((a,b)=>b.list.length-a.list.length||b.tot-a.tot);}
const ckStTxt=e=>{const st=ckState(e),w=ckWin(e);return st==='aberto'?`check-in aberto até ${ckHM(w.close)}`:st==='antes'?`check-in abre às ${ckHM(w.open)}`:'check-in encerrado';};
function ckLane(z){const done=!z.pend&&!z.ck,arr=z.ok+z.ck;return `<button class="ckl ${z.pend?'pend':done?'done':'wait'}" data-a="ckGo" data-v="${z.x.id}" title="${esc(z.x.n)}"><span class="ckl-i">${ic(done?'check':z.mn.icon,13,2)}</span><span class="ckl-t"><b>${esc(z.x.min)}</b><span class="ckl-b"><i style="width:${arr/Math.max(1,z.tot)*100}%"></i></span></span><span class="ckl-n">${arr}/${z.tot}</span></button>`;}
function ckEvent(G,compact){const e=G.e,arr=G.ok+G.ck,MAX=5,more=G.list.length-MAX;
 const head=`<span class="ckb-i">${ic('pin',16,2)}</span><div class="dkt"><b>Hoje · ${esc(e.t)} · ${ckStTxt(e)}</b><span>${e.time} · ${esc(e.place)} · ${G.list.length>1?G.list.length+' ministérios':esc(G.list[0].x.min)}</span></div>`;
 const sum=`<div class="ckt-n"><span><b>${G.ok}</b>presentes</span><span class="${G.pend?'warn':''}"><b>${G.pend}</b>sem check-in</span></div>`;
 const btn=`<button class="btn sm" data-a="${G.list.length>1?'ckEv':'ckGo'}" data-v="${G.list.length>1?e.id:G.list[0].x.id}">Abrir check-in${ic('arrowR',14,2)}</button>`;
 if(compact||G.list.length===1)return `<section class="cktoday-strip ${compact?'cmp':''}">${head}${sum}${btn}</section>`;
 return `<section class="cktoday-strip ckev"><div class="ckev-h">${head}<div class="ckev-p"><span><b>${arr}</b> de ${G.tot} já chegaram</span><span class="ckev-bar"><i style="width:${G.ok/Math.max(1,G.tot)*100}%"></i><em style="width:${G.ck/Math.max(1,G.tot)*100}%"></em></span></div>${btn}</div>
  <div class="ckev-l">${G.list.slice(0,more>0?MAX:G.list.length).map(ckLane).join('')}${more>0?`<button class="ckl more" data-a="ckEv" data-v="${e.id}"><b>+${more}</b> ministério${more>1?'s':''}</button>`:''}</div>
  <div class="ckev-f"><span><i class="d ok"></i>${G.ok} presentes</span><span><i class="d pend"></i>${G.pend} sem check-in</span></div></section>`;}
function ckStrip(){const gs=ckGroups();if(!gs.length)return '';const open=S.ckMore,rest=gs.slice(1);
 return `<div class="ckstack rise" style="--d:1">${ckEvent(gs[0])}</div>`;}
CKA.ckMore=()=>{S.ckMore=!S.ckMore;render();};
CKA.ckEv=v=>{const G=ckGroups().find(g=>g.e.id===v);if(!G)return;
 openDlg(`${dlgHead('Check-in · '+G.e.t,`Hoje, ${G.e.time} · ${ckStTxt(G.e)}`)}<div class="ckd"><div class="ckd-s"><span><b>${G.ok}</b>presentes</span><span class="${G.pend?'warn':''}"><b>${G.pend}</b>sem check-in</span></div>
  <div class="ckd-l">${G.list.map(z=>{const arr=z.ok+z.ck,done=!z.pend&&!z.ck;return `<button class="ckd-r" data-a="ckGo" data-v="${z.x.id}"><span class="htile" style="--s:36px;background:var(--tone-${z.mn.tone||'ceu'});color:var(--tone-${z.mn.tone||'ceu'}-ink)">${ic(z.mn.icon,16)}</span><span class="dkt"><b>${esc(z.x.min)}</b><span>${z.mn.lead?esc(z.mn.lead)+' · ':''}${z.tot} na escala</span></span><span class="ckd-p"><span class="ckev-bar sm"><i style="width:${z.ok/Math.max(1,z.tot)*100}%"></i><em style="width:${z.ck/Math.max(1,z.tot)*100}%"></em></span><small>${arr}/${z.tot}${z.pend?` · <b>${z.pend} sem check-in</b>`:done?' · completo':''}</small></span>${ic('chevR',15,2)}</button>`;}).join('')}</div></div>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`);};
CKA.ckGo=v=>{closeDlg();S.esc=v;S.estab='ck';S.esview='blocos';render();window.scrollTo({top:0});};

