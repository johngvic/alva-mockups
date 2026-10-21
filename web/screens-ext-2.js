/* ---- Ajustes de 09/10/2026: Vídeos e Séries abrem pela lista, marcador de visibilidade e Cursos em cartões ---- */
const nxBaseNav=A.nav;A.nav=v=>{S.nxVideo=null;S.nxSeries=null;S.nxSeriesTab='items';nxBaseNav(v);};
const NX_VIS_ICON={'Público':'globe','Interno':'users','Restrito':'lock'};
const nxVisKey=v=>({'Público':'pub','Interno':'int','Restrito':'res'}[v]);
const nxVisMark=(o,cls='')=>{const v=nxVis(o);return '<span class="nx-vis-c nx-v-'+nxVisKey(v)+' '+cls+'" title="Visibilidade: '+v+'" aria-label="Visibilidade: '+v+'">'+ic(NX_VIS_ICON[v],12,2)+v+'</span>';};
const NX_MARK={pgOpen:id=>PREGS.find(x=>x.id===id),mtOpen:id=>MATS.find(x=>x.id===id),nxVideoOpen:id=>NX_VIDEOS.find(x=>x.id===id),nxSeriesOpen:id=>NX_SERIES.find(x=>x.id===id),joOpen:id=>JORNS.find(x=>x.id===id),csOpen:v=>{const [j,c]=v.split('|');return [...JORNS,...CSOLO].find(x=>x.id===j)?.courses.find(x=>x.id===c);},sgEdit:id=>SONGS.find(x=>x.id===id)};
function nxDecorateMarks(){
 if(!['pregacoes','musicas','material','jornadas','cursos','videos','series'].includes(S.active))return;
 Object.entries(NX_MARK).forEach(([a,find])=>$$('[data-a="'+a+'"][data-v]').forEach(el=>{
  const row=el.classList.contains('ct-sr');if(!row&&!el.classList.contains('card'))return;
  if(el.querySelector('.nx-vis-c'))return;const o=find(el.dataset.v);if(!o)return;
  el.insertAdjacentHTML('beforeend',nxVisMark(o,row?'row':''));}));
}
let nxMarkQueued=false;new MutationObserver(()=>{if(nxMarkQueued)return;nxMarkQueued=true;queueMicrotask(()=>{nxMarkQueued=false;nxDecorateMarks();});}).observe(document.getElementById('main'),{childList:true,subtree:true});
/* Cursos: lista em cartões com progresso, no mesmo padrão de Jornadas e Séries */
csPage=function(){
 if(S.jor&&S.cur)return cuDetail();
 const all=csAll(),q=norm(S.csq),n=k=>all.filter(r=>csKind(r)===k).length;
 const l=all.filter(r=>(S.csf==='todos'||csKind(r)===S.csf)&&(!q||norm(r.c.n+' '+r.c.desc+' '+(r.j.n||'')+' '+(r.j.min||'')).includes(q)));
 const card=r=>{const k=csKind(r),ci=r.j.courses.indexOf(r.c),pr=pAvg(r.j.people.map(p=>p.prog[ci]||0)),mn=MINIS.find(m=>m.n===r.j.min),hue=k==='jor'?(r.j.h||0):(k==='min'?2:4),ico=k==='jor'?r.j.icon:k==='min'?(mn?.icon||'users'):'book',au=r.c.aulas.length;
  const link=k==='jor'?'Curso '+(ci+1)+'/'+r.j.courses.length+' · '+esc(r.j.n)+(JORNS.filter(o=>o.courses.includes(r.c)).length>1?' +'+(JORNS.filter(o=>o.courses.includes(r.c)).length-1):''):k==='min'?'Ministério de '+esc(r.j.min):'Avulso';
  const st=r.c.on?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativo</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativo</span>';
  return '<article class="card ct-jc '+(r.c.on?'':'off')+'" tabindex="0" data-a="csOpen" data-v="'+r.j.id+'|'+r.c.id+'"><div class="ct-jh" style="background:'+thumbBg(hue)+'"><span class="ct-ji">'+ic(ico,22)+'</span>'+st+'</div>'
   +'<div class="ct-jb"><b>'+esc(r.c.n)+'</b><span class="ct-jm">'+au+' aula'+(au===1?'':'s')+' · '+link+'</span><p class="ct-jd">'+esc(r.c.desc)+'</p>'
   +'<footer>'+(r.j.people.length?'<span class="avs">'+r.j.people.slice(0,4).map(p=>avN(p.n)).join('')+'</span><span class="ct-jn"><b>'+(r.j.people.length+(r.j.more||0))+'</b> inscritos</span>':'<span class="soft">Sem inscritos</span>')+ring(pr,52,r.c.on?'var(--brand)':'var(--ink-muted)')+'</footer></div></article>';};
 return '<header class="ph rise"><div><p class="eb">Conteúdo</p><h1>Cursos</h1><p class="lede">Conteúdo estruturado em aulas — avulso, em jornada ou de um ministério</p></div><div class="pact">'+rpBtn('conteudo','cursos')+'<button class="btn pri" data-a="csNew">'+ic('plus',15,2.2)+'Novo curso</button></div></header>'
 +'<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Cursos</span><span class="kv">'+all.length+'</span><span class="kd">'+all.filter(r=>r.c.on).length+' ativos</span></div><div class="k4"><span class="kl">Em jornadas</span><span class="kv">'+n('jor')+'</span><span class="kd">dentro de '+JORNS.filter(j=>j.courses.length).length+' trilhas</span></div><div class="k4"><span class="kl">De ministérios</span><span class="kv">'+n('min')+'</span><span class="kd">'+n('av')+' avulso'+(n('av')===1?'':'s')+'</span></div><div class="k4"><span class="kl">Aulas no total</span><span class="kv">'+all.reduce((a,r)=>a+r.c.aulas.length,0)+'</span><span class="kd">somando todos os cursos</span></div></section>'
 +'<div class="ct-bar rise" style="--d:2"><label class="sbox">'+ic('search',16)+'<input id="csq" placeholder="Buscar curso, jornada ou ministério" value="'+esc(S.csq)+'" autocomplete="off"></label><div class="chips">'+[['todos','Todos',all.length],['av','Avulsos',n('av')],['jor','Em jornada',n('jor')],['min','De ministério',n('min')]].map(c=>'<button class="chipf '+(S.csf===c[0]?'on':'')+'" data-a="csF" data-v="'+c[0]+'">'+c[1]+'<small>'+c[2]+'</small></button>').join('')+'</div></div>'
 +(l.length?'<div class="ct-jg rise" style="--d:3">'+l.map(card).join('')+'<button class="cm-badd" data-a="csNew" style="min-height:300px"><span>'+ic('plus',20,2)+'</span><b>Novo curso</b><small>Avulso, em jornada ou de um ministério</small></button></div>':'<section class="card mempty rise"><p>Nenhum curso aqui.</p><span>Nada corresponde a esse filtro.</span></section>');
};
/* ---- Encontros de Casas e de Acompanhamento no padrão do Discipulado: Agendados e Realizados, data à esquerda, ações à direita ---- */
const nxEncWhen=d=>{const n=inDays(d);return n===0?'hoje':n>0?'em '+n+' dia'+(n===1?'':'s'):'há '+(-n)+' dia'+(n===-1?'':'s');};
const nxEncTime=(a,b)=>a?String(a).replace(':00','h')+(b?'–'+String(b).replace(':00','h'):''):'';
const nxEncDate=d=>'<span class="ed"><b>'+fmtD(d).split(' ')[0]+'</b><span>'+fmtD(d).split(' ')[1]+'</span></span>';
const nxEncEmpty=(btns)=>'<section class="card pc"><div class="eempty"><span class="eei">'+ic('calendar',22)+'</span><p>Nenhum encontro ainda.</p><span class="who">Agende o próximo ou registre um encontro que já aconteceu.</span><div class="row2" style="justify-content:center">'+btns+'</div></div></section>';
const nxEncList=(label,items)=>items.length?'<p class="eh">'+label+'</p><ol class="elist">'+items.join('')+'</ol>':'';
function nxHouseEncounters(c){
 const all=c.meets.slice(),sched=all.filter(m=>!m.done&&!m.cancelled).sort((a,b)=>(a.d+(a.start||'')).localeCompare(b.d+(b.start||''))),done=all.filter(m=>m.done&&!m.cancelled).sort((a,b)=>a.d<b.d?1:-1),canc=all.filter(m=>m.cancelled).sort((a,b)=>a.d<b.d?1:-1);
 const btns='<button class="btn sec" data-a="nxHouseRegNew">Registrar encontro</button><button class="btn pri" data-a="nxHouseSchedule">Agendar encontro</button>';
 if(!all.length)return nxEncEmpty(btns);
 const item=(m,kind)=>{const pend=!m.scheduled&&!m.done,n=c.ppl.filter(p=>m.pres&&m.pres[p.id]).length;
  const title=kind==='done'?'<button class="lnk record-title" data-a="hViewMeet" data-v="'+m.id+'">'+esc(m.desc||'Encontro realizado')+'</button>':kind==='canc'?esc(m.desc||'Encontro cancelado'):(m.desc?esc(m.desc):(m.mode==='Remoto'?'Encontro remoto':'Encontro presencial'));
  const meta=[wd(m.d),nxEncTime(m.start,m.end),m.mode,(m.mode==='Presencial'&&m.where?esc(m.where):''),kind==='sched'?(pend?'chamada pendente':nxEncWhen(m.d)):kind==='done'?'presença '+n+'/'+c.ppl.length:'cancelado',m.series&&kind==='sched'?'repete':'',m.mat?esc(m.mat):''].filter(Boolean).join(' · ');
  let act='';
  if(kind==='sched'){ if(pend)act='<button class="btn pri sm" data-a="hCall" data-v="'+m.id+'">Chamada</button><button class="ibtn sm" data-a="hDelM" data-v="'+m.id+'" aria-label="Excluir encontro" title="Excluir encontro">'+ic('x',14)+'</button>';
   else act=(m.mode==='Remoto'&&m.url?'<button class="btn sec sm" data-a="copy" data-v="'+esc(m.url)+'">Copiar link</button>':'')+'<button class="ibtn sm" data-a="nxHouseSchedule" data-v="'+m.id+'" aria-label="Editar encontro" title="Editar encontro">'+ic('pen',14)+'</button><button class="btn pri sm" data-a="nxHouseRegister" data-v="'+m.id+'">Registrar</button><button class="ibtn sm" data-a="nxHouseCancel" data-v="'+m.id+'" aria-label="Cancelar encontro" title="Cancelar encontro">'+ic('x',14)+'</button>'; }
  else if(kind==='done')act='<button class="ibtn sm" data-a="hDelM" data-v="'+m.id+'" aria-label="Excluir encontro" title="Excluir encontro">'+ic('x',14)+'</button>';
  return '<li class="'+(kind==='canc'?'cancel':kind)+'">'+nxEncDate(m.d)+'<div class="eb2"><div class="et"><div><b>'+title+'</b><span class="who">'+meta+'</span></div><div class="ea">'+act+'</div></div></div></li>';};
 return '<section class="card pc"><div class="sh"><h2>Encontros</h2><div class="row2"><button class="btn sec sm" data-a="nxHouseRegNew">Registrar</button><button class="btn pri sm" data-a="nxHouseSchedule">Agendar</button></div></div>'
  +nxEncList('Agendados',sched.map(m=>item(m,'sched')))+nxEncList('Realizados',done.map(m=>item(m,'done')))+nxEncList('Cancelados',canc.map(m=>item(m,'canc')))+'</section>';
}
hEnc=nxHouseEncounters;hGeral=nxOldHGeral;
Object.assign(A,{nxHouseRegNew:()=>{const c=hById(S.casa),t=TODAY.toISOString().slice(0,10);openDlg(dlgHead('Registrar encontro',esc(c.n)+'. Para um encontro que já aconteceu e não foi agendado.')+'<form id="nxHrF" class="fgrid one" novalidate><label class="fld"><span class="fl">Data</span><input type="date" name="d" value="'+t+'" max="'+t+'"><span class="err"></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Registrar e fazer chamada</button></div></form>');const f=$('#nxHrF');f.onsubmit=e=>{e.preventDefault();const v=f.elements.d.value;if(!v)return;if(c.meets.some(m=>m.d===v&&!m.cancelled)){toast('Já existe um encontro nessa data');return;}const m={id:c.id+'e'+Date.now(),d:v,desc:'',mat:'',pres:{},why:{},done:false};c.meets.unshift(m);c.total++;closeDlg();S.ctab='enc';S.chamada=m.id;render();};}});
/* Acompanhamento pastoral: mesmo padrão */
careMeetings=function(c){
 careInit(c);
 const sched=c.sched.map((m,i)=>({m,i})).sort((a,b)=>(a.m.d+(a.m.t||'')).localeCompare(b.m.d+(b.m.t||''))),done=c.meets.slice().sort((a,b)=>a.d<b.d?1:-1),canc=c.cancelled.slice().sort((a,b)=>a.d<b.d?1:-1);
 const btns='<button class="btn sec" data-a="cReg" data-v="'+c.id+'">Registrar encontro</button><button class="btn pri" data-a="cSched" data-v="'+c.id+'">Agendar encontro</button>';
 if(!sched.length&&!done.length&&!canc.length)return nxEncEmpty(btns);
 const li=(kind,m,title,meta,act,extra)=>'<li class="'+kind+'">'+nxEncDate(m.d)+'<div class="eb2"><div class="et"><div><b>'+title+'</b><span class="who">'+meta+'</span></div><div class="ea">'+(act||'')+'</div></div>'+(extra||'')+'</div></li>';
 const sItems=sched.map(({m,i})=>li('sched',m,m.mode==='Remoto'?'Encontro remoto':'Encontro '+esc((m.mode||'pastoral').toLowerCase()),[wd(m.d),nxEncTime(m.t),m.mode,m.where?esc(m.where):'',nxEncWhen(m.d)].filter(Boolean).join(' · '),(m.link?'<button class="btn sec sm" data-a="copy" data-v="'+esc(m.link)+'">Copiar link</button>':'')+'<button class="btn pri sm" data-a="cDone" data-v="'+c.id+'|'+i+'">Concluir</button><button class="ibtn sm" data-a="cUnsched" data-v="'+c.id+'|'+i+'" aria-label="Cancelar encontro" title="Cancelar encontro">'+ic('x',14)+'</button>'));
 const dItems=done.map(m=>li('done',m,'<button class="lnk record-title" data-a="careMeet" data-v="'+m.rid+'">'+esc(m.t||'Encontro realizado')+'</button>',[wd(m.d),nxEncTime(m.time),m.mode||'Pastoral'].filter(Boolean).join(' · '),'',m.result?'<p class="who" style="margin:6px 0 0">Resultado: '+esc(m.result)+'</p>':''));
 const cItems=canc.map(m=>li('cancel',m,'<button class="lnk record-title" data-a="careMeet" data-v="'+m.rid+'">Encontro cancelado</button>',[wd(m.d),nxEncTime(m.t),m.mode].filter(Boolean).join(' · '),''));
 return '<section class="card pc"><div class="sh"><h2>Encontros</h2><div class="row2"><button class="btn sec sm" data-a="cReg" data-v="'+c.id+'">Registrar</button><button class="btn pri sm" data-a="cSched" data-v="'+c.id+'">Agendar</button></div></div>'+nxEncList('Agendados',sItems)+nxEncList('Realizados',dItems)+nxEncList('Cancelados',cItems)+'</section>';
};

/* ---- Tenant: Organização → Redes → Igrejas, e encontros do supervisor (rede de casa e rede regional) ---- */
const NX_PL={Rede:'Redes',Regional:'Regionais','Região':'Regiões',Bloco:'Blocos',Campo:'Campos'};
const NX_LABELS=Object.keys(NX_PL);
const NL=()=>{const l=ORG.label,m=l==='Bloco'||l==='Campo',p=NX_PL[l]||l+'s';return {s:l,p,lo:l.toLowerCase(),plo:p.toLowerCase(),nova:m?'Novo':'Nova',da:m?'do':'da',art:m?'o':'a',um:m?'um':'uma',outra:m?'outro':'outra'};};
const NX_COUNTRIES={
 BR:{n:'Brasil',cur:'real (BRL)',div:'Estado',subs:[['AC','Acre'],['AL','Alagoas'],['AP','Amapá'],['AM','Amazonas'],['BA','Bahia'],['CE','Ceará'],['DF','Distrito Federal'],['ES','Espírito Santo'],['GO','Goiás'],['MA','Maranhão'],['MT','Mato Grosso'],['MS','Mato Grosso do Sul'],['MG','Minas Gerais'],['PA','Pará'],['PB','Paraíba'],['PR','Paraná'],['PE','Pernambuco'],['PI','Piauí'],['RJ','Rio de Janeiro'],['RN','Rio Grande do Norte'],['RS','Rio Grande do Sul'],['RO','Rondônia'],['RR','Roraima'],['SC','Santa Catarina'],['SP','São Paulo'],['SE','Sergipe'],['TO','Tocantins']]},
 AR:{n:'Argentina',cur:'peso argentino (ARS)',div:'Província',subs:[['C','Ciudad Autónoma de Buenos Aires'],['B','Buenos Aires'],['K','Catamarca'],['H','Chaco'],['U','Chubut'],['X','Córdoba'],['W','Corrientes'],['E','Entre Ríos'],['P','Formosa'],['Y','Jujuy'],['L','La Pampa'],['F','La Rioja'],['M','Mendoza'],['N','Misiones'],['Q','Neuquén'],['R','Río Negro'],['A','Salta'],['J','San Juan'],['D','San Luis'],['Z','Santa Cruz'],['S','Santa Fe'],['G','Santiago del Estero'],['V','Tierra del Fuego'],['T','Tucumán']]},
 CL:{n:'Chile',cur:'peso chileno (CLP)',div:'Região',subs:[['AP','Arica y Parinacota'],['TA','Tarapacá'],['AN','Antofagasta'],['AT','Atacama'],['CO','Coquimbo'],['VS','Valparaíso'],['RM','Metropolitana de Santiago'],['LI','O’Higgins'],['ML','Maule'],['NB','Ñuble'],['BI','Biobío'],['AR','La Araucanía'],['LR','Los Ríos'],['LL','Los Lagos'],['AI','Aysén'],['MA','Magallanes']]}
};
const nxSubOpts=(country,cur)=>'<option value="">Selecione</option>'+NX_COUNTRIES[country].subs.map(([c,n])=>'<option value="'+c+'"'+(c===cur?' selected':'')+'>'+esc(n)+'</option>').join('');
function chpPlace(c){const co=c.country||'BR',s=NX_COUNTRIES[co].subs.find(x=>x[0]===c.sub),sub=c.sub?(co==='BR'?c.sub:(s?s[1]:c.sub)):'';return [c.city,sub].filter(Boolean).join(', ');}
const netMain=()=>NETS.find(n=>n.main)||NETS[0];
const netChurches=n=>IGREJAS.filter(g=>g.rede===n.id);
const NX_MODES=['Presencial','Remoto'];
const nxLeadersPool=()=>MEMBERS.filter(m=>m.tit).map(m=>m.n);

/* ---- Encontros do supervisor com os líderes (mesmo padrão dos encontros de uma casa) ---- */
let _seId=0;
const seM=(dd,start,mode,o={})=>({id:'se'+(++_seId),d:addDays(dd),start,mode,where:o.where||'',url:o.url||'',topic:o.topic||'',pres:o.pres||{},notes:o.notes||'',done:!!o.done,cancelled:!!o.cancelled});
const SE_O=(k,id)=>k==='net'?NETS.find(n=>n.id===id):REDES.find(r=>r.id===id);
const seLeaders=(k,o)=>k==='net'?netChurches(o).map(g=>g.lead).filter(Boolean):o.casas.map(hById).filter(Boolean).map(c=>c.leader);
const seKey=(k,o,m)=>k+'|'+o.id+(m?'|'+m.id:'');
function seEncounters(k,o,leaders){
 const all=o.meets,by=(a,b)=>(a.d+(a.start||'')).localeCompare(b.d+(b.start||'')),sched=all.filter(m=>!m.done&&!m.cancelled).sort(by),done=all.filter(m=>m.done&&!m.cancelled).sort((a,b)=>by(b,a)),canc=all.filter(m=>m.cancelled).sort((a,b)=>by(b,a));
 const btns='<button class="btn sec" data-a="seReg" data-v="'+seKey(k,o)+'">Registrar encontro</button><button class="btn pri" data-a="seSched" data-v="'+seKey(k,o)+'">Agendar encontro</button>';
 if(!all.length)return nxEncEmpty(btns);
 const item=(m,kind)=>{const key=seKey(k,o,m),n=leaders.filter(x=>m.pres&&m.pres[x]).length;
  const title=kind==='done'?'<button class="lnk record-title" data-a="seView" data-v="'+key+'">'+esc(m.topic||'Encontro realizado')+'</button>':esc(m.topic||(kind==='canc'?'Encontro cancelado':'Encontro com os líderes'));
  const meta=[wd(m.d),nxEncTime(m.start),m.mode,m.mode==='Presencial'&&m.where?esc(m.where):'',kind==='sched'?nxEncWhen(m.d):kind==='done'?'presença '+n+'/'+leaders.length:'cancelado'].filter(Boolean).join(' · ');
  let act='';
  if(kind==='sched')act=(m.mode==='Remoto'&&m.url?'<button class="btn sec sm" data-a="copy" data-v="'+esc(m.url)+'">Copiar link</button>':'')+'<button class="ibtn sm" data-a="seSched" data-v="'+key+'" aria-label="Editar encontro" title="Editar encontro">'+ic('pen',14)+'</button><button class="btn pri sm" data-a="seCall" data-v="'+key+'">Registrar</button><button class="ibtn sm" data-a="seCancel" data-v="'+key+'" aria-label="Cancelar encontro" title="Cancelar encontro">'+ic('x',14)+'</button>';
  else act='<button class="ibtn sm" data-a="seDel" data-v="'+key+'" aria-label="Excluir encontro" title="Excluir encontro">'+ic('x',14)+'</button>';
  return '<li class="'+(kind==='canc'?'cancel':kind)+'">'+nxEncDate(m.d)+'<div class="eb2"><div class="et"><div><b>'+title+'</b><span class="who">'+meta+'</span></div><div class="ea">'+act+'</div></div></div></li>';};
 return '<section class="card pc"><div class="sh"><h2>Encontros</h2><div class="row2"><button class="btn sec sm" data-a="seReg" data-v="'+seKey(k,o)+'">Registrar</button><button class="btn pri sm" data-a="seSched" data-v="'+seKey(k,o)+'">Agendar</button></div></div>'
  +nxEncList('Agendados',sched.map(m=>item(m,'sched')))+nxEncList('Realizados',done.map(m=>item(m,'done')))+nxEncList('Cancelados',canc.map(m=>item(m,'canc')))+'</section>';
}
function seDetail(){
 const k=S.seK,o=SE_O(k,S.seId);if(!o){S.seK=null;S.seId=null;return k==='net'?multiList():redesList();}
 const isNet=k==='net',leaders=seLeaders(k,o),done=o.meets.filter(m=>m.done&&!m.cancelled),sched=o.meets.filter(m=>!m.done&&!m.cancelled);
 const avg=done.length&&leaders.length?Math.round(done.reduce((a,m)=>a+leaders.filter(n=>m.pres&&m.pres[n]).length,0)/(done.length*leaders.length)*100):0;
 const who=isNet?(leaders.length===1?'líder de igreja':'líderes de igreja'):(leaders.length===1?'líder de casa':'líderes de casa');
 return '<nav class="crumb rise" aria-label="Você está em"><span class="soft">'+(isNet?'Administração':'Comunidade')+'</span>'+ic('chevR',13,2)+'<button class="lnk back" data-a="seBack">'+(isNet?'Multi-igreja':'Redes de casa')+'</button>'+ic('chevR',13,2)+'<span>'+esc(o.n)+'</span></nav>'
  +'<header class="ph rise"><div><p class="eb">Encontros do supervisor</p><h1>'+esc(o.n)+'</h1><p class="lede">'+(o.sup?'Supervisor: '+esc(o.sup):'Sem supervisor definido')+' · '+leaders.length+' '+who+'</p></div></header>'
  +'<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Realizados</span><span class="kv">'+done.length+'</span><span class="kd">encontros com os líderes</span></div><div class="k4"><span class="kl">Agendados</span><span class="kv">'+sched.length+'</span><span class="kd">'+(sched.length?'próximo em '+fmtD(sched.slice().sort((a,b)=>a.d.localeCompare(b.d))[0].d):'nenhum marcado')+'</span></div><div class="k4"><span class="kl">Presença média</span><span class="kv">'+(done.length?avg+'%':'—')+'</span><span class="kd">dos líderes nos encontros</span></div></section>'
  +'<section class="card pc rise" style="--d:2"><div class="sh"><h2>Líderes convocados</h2></div>'+(leaders.length?'<div class="kmem">'+leaders.map((n,i)=>'<span class="kmc"><span class="av" style="background:var(--tone-'+TONES[i%6]+');color:var(--tone-'+TONES[i%6]+'-ink)">'+initials(n)+'</span>'+esc(n)+'</span>').join('')+'</div>':'<p class="who">'+(isNet?'Nenhuma igreja nesta rede ainda.':'Nenhuma casa vinculada a esta rede ainda.')+'</p>')+'</section>'
  +'<div class="rise" style="--d:3">'+seEncounters(k,o,leaders)+'</div>';
}
function seForm(k,oid,mid){
 const o=SE_O(k,oid),m=mid&&o.meets.find(x=>x.id===mid);
 nxSchedDlg({id:'seF',title:m?'Editar encontro':'Agendar encontro',sub:esc(o.n)+'. Reunião do supervisor com os líderes.',vals:m?{d:m.d,start:m.start,mode:m.mode,where:m.where,url:m.url}:null,linkReq:true,noPast:!m,submit:m?'Salvar':'Agendar',wherePh:'Ex.: Sala 3 da igreja sede',
  onSubmit:q=>{if(m)Object.assign(m,q);else{const x=seM(0,'','',{});Object.assign(x,q);o.meets.push(x);}closeDlg();admRe();toast(m?'Encontro atualizado':'Encontro agendado para '+fmtD(q.d));}});
}
function seCallDlg(k,oid,mid){
 const o=SE_O(k,oid),m=mid&&o.meets.find(x=>x.id===mid),leaders=seLeaders(k,o),t=TODAY.toISOString().slice(0,10);
 openDlg(dlgHead('Registrar encontro',esc(o.n)+(m?' · '+fmtD(m.d):'. Para um encontro que já aconteceu e não foi agendado.'))+'<form id="seC" class="fgrid one" novalidate>'
  +(m?'':'<label class="fld"><span class="fl">Data</span><input type="date" name="d" value="'+t+'" max="'+t+'"><span class="err"></span></label>')
  +'<div class="fld"><span class="fl">Quem participou</span><div class="cpick">'+(leaders.length?leaders.map((n,i)=>'<label><input type="checkbox" name="p" value="'+esc(n)+'"'+(m&&m.pres&&m.pres[n]?' checked':'')+'><span class="htile" style="--s:26px;background:var(--tone-'+TONES[i%6]+');color:var(--tone-'+TONES[i%6]+'-ink);font:600 10px/1 var(--font-text)">'+initials(n)+'</span><span><b>'+esc(n)+'</b></span><i class="cb">'+ic('check',12,2.8)+'</i></label>').join(''):'<p class="who">Ainda não há líderes vinculados.</p>')+'</div></div>'
  +'<label class="fld"><span class="fl">O que foi tratado <small>opcional</small></span><textarea class="ta" name="notes" rows="3" maxlength="500" placeholder="Resumo do encontro">'+esc(m?m.notes:'')+'</textarea></label>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Salvar encontro</button></div></form>');
 const f=$('#seC');f.onsubmit=e=>{e.preventDefault();const pres={};leaders.forEach(n=>{pres[n]=false;});$$('[name=p]:checked',f).forEach(i=>{pres[i.value]=true;});const notes=f.elements.notes.value.trim();
  if(m){m.done=true;m.pres=pres;m.notes=notes;}else{const d=f.elements.d.value;if(!d){const fl=f.elements.d.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escolha a data';return;}const x=seM(0,'','',{});x.d=d;x.done=true;x.pres=pres;x.notes=notes;o.meets.push(x);}
  closeDlg();admRe();toast('Encontro registrado');};
}
const SE_PARSE=v=>{const [k,oid,mid]=v.split('|');return {k,oid,mid,o:SE_O(k,oid),m:mid?SE_O(k,oid).meets.find(x=>x.id===mid):null};};
const SEA={
 seOpen:v=>{const [k,id]=v.split('|');S.seK=k;S.seId=id;S.chp=null;render();window.scrollTo({top:0});},
 seBack:()=>{S.seK=null;S.seId=null;render();window.scrollTo({top:0});},
 seSched:v=>{const {k,oid,mid}=SE_PARSE(v);seForm(k,oid,mid);},
 seReg:v=>{const {k,oid}=SE_PARSE(v);seCallDlg(k,oid,null);},
 seCall:v=>{const {k,oid,mid}=SE_PARSE(v);seCallDlg(k,oid,mid);},
 seCancel:v=>{const {o,m}=SE_PARSE(v);confirmDel({title:'Cancelar este encontro?',body:'O encontro de '+fmtD(m.d)+' vai para a lista de cancelados. Os líderes não são avisados automaticamente neste protótipo.',label:'Cancelar encontro',onConfirm:()=>{m.cancelled=true;admRe();toast('Encontro cancelado');}});},
 seDel:v=>{const {o,m}=SE_PARSE(v);confirmDel({title:'Excluir este encontro?',body:'O registro de '+fmtD(m.d)+' é apagado do histórico do supervisor.',onConfirm:()=>{o.meets.splice(o.meets.indexOf(m),1);admRe();toast('Encontro excluído');}});},
 seView:v=>{const {k,o,m}=SE_PARSE(v),leaders=seLeaders(k,o),yes=leaders.filter(n=>m.pres&&m.pres[n]),no=leaders.filter(n=>!(m.pres&&m.pres[n]));recordDialog('Encontro realizado',esc(o.n)+' · '+fmtD(m.d)+(m.start?' · '+nxEncTime(m.start):''),recordField('O que foi tratado',m.notes)+recordField('Presentes ('+yes.length+')',yes.join(', '))+recordField('Ausentes ('+no.length+')',no.join(', ')||'Ninguém faltou'));}
};
Object.assign(A,SEA);
{const base=A.nav;A.nav=v=>{S.seK=null;S.seId=null;base(v);};}
{const base=redesList;redesList=function(){return S.seK==='rede'?seDetail():base();};}
{const base=rCard;rCard=function(r){const h=base(r),b='<button class="btn sec sm" data-a="rEdit" data-v="'+r.id+'" style="align-self:flex-start">';const i=h.indexOf(b);if(i<0)return h;const e=h.indexOf('</button>',i)+9;
 return h.slice(0,i)+'<div class="row2" style="align-self:flex-start"><button class="btn sec sm" data-a="seOpen" data-v="rede|'+r.id+'">'+ic('calendar',14)+'Encontros'+(r.meets.some(m=>!m.done&&!m.cancelled)?' <small>('+r.meets.filter(m=>!m.done&&!m.cancelled).length+' agendado'+(r.meets.filter(m=>!m.done&&!m.cancelled).length>1?'s':'')+')</small>':'')+'</button>'+h.slice(i,e).replace(' style="align-self:flex-start"','')+'</div>'+h.slice(e);};}

/* ---- Multi-igreja: organização no topo, redes dentro, igrejas dentro das redes ---- */
multiList=function(){
 if(S.seK==='net')return seDetail();
 const L=NL(),multi=NETS.length>1,main=netMain(),admins=ORG.admins.map(uById).filter(Boolean);
 const churchRow=g=>{const us=USERS.filter(u=>u.igs.includes(g.id));return '<div class="gi g2"><button class="gi-open" data-a="chpOpen" data-v="'+g.id+'"><span class="dot" style="width:34px;height:34px;border-radius:10px;background:var(--brand-soft);color:var(--brand-text);display:grid;place-items:center;flex:none">'+ic('church',16)+'</span><span class="dkt"><b>'+esc(g.n)+'</b><span>'+us.length+' usuários · perfil no app '+chpPct(g.id)+'%</span></span><span class="stack sm">'+us.slice(0,4).map(u=>uAv(u)).join('')+'</span><span class="gi-go">'+ic('chevR',16)+'</span></button>'+(multi?'<button class="ibtn sm" data-a="gMove" data-v="'+g.id+'" aria-label="Mover igreja para '+L.outra+' '+L.lo+'" title="Mover para '+L.outra+' '+L.lo+'">'+ic('arrowR',14)+'</button>':'')+'</div>';};
 const menu=(n)=>'<div style="position:relative"><button class="ibtn sm" data-a="nMenu" data-v="'+n.id+'" aria-label="Ações">'+ic('dots',15)+'</button><div class="pop" id="nPop-'+n.id+'" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="netRen" data-v="'+n.id+'">'+ic('pen',16)+'Renomear '+L.lo+'</button>'+(multi?'<button class="pi" data-a="netSup" data-v="'+n.id+'">'+ic('users',16)+'Trocar supervisor</button>':'')+'<button class="pi" data-a="gAdd" data-v="'+n.id+'">'+ic('plus',16)+'Adicionar igreja</button>'+(n.main?'':'<hr><button class="pi danger" data-a="nDel" data-v="'+n.id+'">'+ic('x',16)+'Excluir '+L.lo+'</button>')+'</div></div>';
 const netCard=n=>{const gs=netChurches(n);return '<article class="card rc"><div class="rc1"><div><b>'+esc(n.n)+(n.main?' <span class="pill" title="'+L.s+' principal: recebe as igrejas novas. Pode ser renomead'+(L.art==='a'?'a':'o')+', não excluíd'+(L.art==='a'?'a':'o')+'.">Principal</span>':'')+'</b><span>'+gs.length+' '+(gs.length===1?'igreja':'igrejas')+'</span></div>'+menu(n)+'</div>'
  +'<div class="rsupbar"><div class="rsup">'+(n.sup?'<span class="av" style="background:var(--tone-'+n.tone+');color:var(--tone-'+n.tone+'-ink)">'+initials(n.sup)+'</span><span><b>'+esc(n.sup)+'</b><small>Supervisor</small></span>':'<span><b class="soft">Sem supervisor</b><small>Define quem acompanha os líderes</small></span>')+'</div><button class="btn sec sm" data-a="seOpen" data-v="net|'+n.id+'">'+ic('calendar',14)+'Encontros'+(n.meets.some(m=>!m.done&&!m.cancelled)?' <small>('+n.meets.filter(m=>!m.done&&!m.cancelled).length+')</small>':'')+'</button></div>'
  +'<div class="glist">'+(gs.map(churchRow).join('')||'<p class="who" style="margin:0">Nenhuma igreja n'+(L.art==='a'?'esta':'este')+' '+L.lo+'.</p>')+'</div></article>';};
 const single=()=>{const gs=netChurches(main);return '<article class="card rc"><div class="rc1"><div><b>Igrejas</b><span>'+gs.length+' '+(gs.length===1?'igreja':'igrejas')+' · todas n'+(L.art==='a'?'a':'o')+' '+esc(main.n)+', '+L.art+' '+L.lo+' principal</span></div>'+menu(main)+'</div><div class="glist">'+gs.map(churchRow).join('')+'</div></article>';};
 return admHead('Multi-igreja',esc(ORG.n)+' · organização, '+L.plo+' e igrejas',''+rpBtn('multi','igrejas')+'<button class="btn sec" data-a="nAdd">'+ic('plus',15,2.2)+L.nova+' '+L.lo+'</button><button class="btn pri" data-a="gAdd" data-v="'+main.id+'">'+ic('plus',15,2.2)+'Nova igreja</button>')
  +'<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Igrejas</span><span class="kv">'+IGREJAS.length+'</span><span class="kd">na organização</span></div><div class="k4"><span class="kl">'+L.p+'</span><span class="kv">'+NETS.length+'</span><span class="kd">'+(multi?'agrupam as igrejas':'só '+L.art+' principal')+'</span></div><div class="k4"><span class="kl">Administradores da organização</span><span class="kv">'+admins.length+'</span><span class="kd">veem todas as igrejas</span></div></section>'
  +'<section class="card pc rise" style="--d:2"><div class="sh"><div><h2>'+esc(ORG.n)+'</h2><p class="who" style="margin:4px 0 0">Organização · tudo o que está abaixo pertence a ela. O agrupamento de igrejas se chama “'+ORG.label+'”.</p></div><button class="btn sec sm" data-a="orgEdit">'+ic('pen',14)+'Configurar</button></div>'
  +'<div class="gglob" style="border-top:0;padding-top:0"><span class="fl">Administradores da organização</span><div class="kmem">'+admins.map(u=>'<span class="kmc">'+uAv(u)+esc(u.n)+'</span>').join('')+'<button class="kmc add" data-a="orgUsers">Gerenciar em Usuários e permissões</button></div></div></section>'
  +(multi?'':'<p class="who rise" style="--d:3;margin:0 0 12px">As igrejas ainda não estão agrupadas. Crie '+L.um+' '+L.lo+' para separá-las por região; o nível passa a aparecer assim que houver mais de '+L.um+'.</p>')
  +'<div class="rgrid2 rise" style="--d:3">'+(multi?NETS.map(netCard).join(''):single())+'</div>';
};
const nxTone=n=>TONES[NETS.indexOf(n)%6];
NETS.forEach(n=>{n.tone=nxTone(n);});
const nxNameDlg=(title,sub,val,ph,onOk)=>{openDlg(dlgHead(title,sub)+'<form class="fgrid one" id="nnF" novalidate><label class="fld"><span class="fl">Nome</span><input name="v" value="'+esc(val)+'" placeholder="'+ph+'" maxlength="40" autocomplete="off"><span class="err"></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Salvar</button></div></form>','sm');const f=$('#nnF'),i=f.elements.v;setTimeout(()=>i.select(),80);i.addEventListener('input',()=>i.closest('.fld').classList.remove('bad'));f.onsubmit=e=>{e.preventDefault();const x=i.value.trim(),r=onOk(x);if(r){i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=r;i.focus();}};};
const nxSupSelect=cur=>'<label class="fld"><span class="fl">Supervisor <small>opcional</small></span><span class="selw"><select name="sup"><option value="">Definir depois</option>'+[...new Set([...(cur?[cur]:[]),...nxLeadersPool()])].map(n=>'<option'+(n===cur?' selected':'')+'>'+esc(n)+'</option>').join('')+'</select>'+ic('updown',14)+'</span><span class="hint">O supervisor só acompanha os líderes e marca encontros com eles. Não ganha acesso ao sistema por isso.</span></label>';
Object.assign(A,{
 orgUsers:()=>{S.idListScope='org';A.nav('usuarios');},
 orgEdit:()=>{const L=NL();openDlg(dlgHead('Configurar organização','Nome e o jeito de chamar o agrupamento de igrejas.')+'<form class="fgrid one" id="orgF" novalidate><label class="fld"><span class="fl">Nome da organização</span><input name="n" value="'+esc(ORG.n)+'" maxlength="50" autocomplete="off"><span class="err"></span></label><label class="fld"><span class="fl">Como vocês chamam o agrupamento de igrejas?</span><span class="selw"><select name="label">'+NX_LABELS.map(x=>'<option'+(x===ORG.label?' selected':'')+'>'+x+'</option>').join('')+'</select>'+ic('updown',14)+'</span><span class="hint">Só muda o nome que aparece nas telas. A estrutura é a mesma.</span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Salvar</button></div></form>','sm');
  const f=$('#orgF');f.onsubmit=e=>{e.preventDefault();const n=f.elements.n.value.trim();if(!n){const fl=f.elements.n.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Dê um nome à organização';return;}ORG.n=n;ORG.label=f.elements.label.value;closeDlg();admRe();toast('Organização atualizada');};},
 netRen:v=>{closePops();const n=NETS.find(x=>x.id===v),L=NL();nxNameDlg('Renomear '+L.lo,n.main?'É '+L.art+' '+L.lo+' principal: pode mudar de nome, mas não pode ser excluíd'+(L.art==='a'?'a':'o')+'.':'O nome aparece no seletor de igrejas e no painel.',n.n,'Ex.: Regional Litoral',x=>{if(!x)return 'Dê um nome';if(NETS.some(o=>o!==n&&norm(o.n)===norm(x)))return 'Já existe com esse nome';const old=n.n;n.n=x;closeDlg();admRe();toast('Renomead'+(L.art==='a'?'a':'o')+' para '+x,()=>{n.n=old;admRe();});});},
 netSup:v=>{closePops();const n=NETS.find(x=>x.id===v);openDlg(dlgHead('Supervisor',esc(n.n))+'<form class="fgrid one" id="nsF" novalidate>'+nxSupSelect(n.sup)+'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Salvar</button></div></form>','sm');$('#nsF').onsubmit=e=>{e.preventDefault();n.sup=e.target.elements.sup.value;closeDlg();admRe();toast('Supervisor atualizado');};},
 nAdd:()=>{const L=NL();openDlg(dlgHead(L.nova+' '+L.lo,'Agrupa igrejas. O supervisor acompanha os líderes delas.')+'<form class="fgrid one" id="nnF" novalidate><label class="fld"><span class="fl">Nome</span><input name="v" placeholder="Ex.: Regional Litoral" maxlength="40" autocomplete="off"><span class="err"></span></label>'+nxSupSelect('')+'<div class="fld"><span class="fl">Igrejas <small>opcional</small></span><div class="cpick">'+IGREJAS.map(g=>'<label><input type="checkbox" name="g" value="'+g.id+'"><span class="htile" style="--s:26px;background:var(--brand-soft);color:var(--brand-text)">'+ic('church',13)+'</span><span><b>'+esc(g.n)+'</b><small>Hoje em '+esc((NETS.find(n=>n.id===g.rede)||{}).n||'—')+' · será movida</small></span><i class="cb">'+ic('check',12,2.8)+'</i></label>').join('')+'</div></div><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Criar '+L.lo+'</button></div></form>');
  const f=$('#nnF'),i=f.elements.v;f.addEventListener('input',()=>i.closest('.fld').classList.remove('bad'));f.onsubmit=e=>{e.preventDefault();const x=i.value.trim(),bad=t=>{i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=t;i.focus();};if(!x){bad('Dê um nome');return;}if(NETS.some(n=>norm(n.n)===norm(x))){bad('Já existe com esse nome');return;}
   const was=NETS.length>1,n={id:'n'+Date.now(),n:x,sup:f.elements.sup.value,tone:TONES[NETS.length%6],main:false,meets:[]};NETS.push(n);$$('[name=g]:checked',f).forEach(c=>{IGREJAS.find(g=>g.id===c.value).rede=n.id;});closeDlg();admRe();toast(was?x+' criad'+(L.art==='a'?'a':'o'):x+' criad'+(L.art==='a'?'a':'o')+'. Agora as igrejas aparecem agrupadas por '+L.plo);};},
 nDel:v=>{closePops();const n=NETS.find(x=>x.id===v),L=NL(),main=netMain(),gs=netChurches(n);if(n.main){toast(L.s+' principal não pode ser excluíd'+(L.art==='a'?'a':'o')+'. Você pode renomear.');return;}
  confirmDel({title:'Excluir '+n.n+'?',body:(gs.length?gs.map(g=>g.n).join(', ')+' passa'+(gs.length>1?'m':'')+' para '+main.n+' ('+L.lo+' principal). ':'')+(n.meets.length?'Os '+n.meets.length+' encontros do supervisor são apagados. ':'')+'As igrejas e os dados delas não são apagados.',label:'Excluir '+L.lo,typed:gs.length?n.n:null,onConfirm:()=>{gs.forEach(g=>{g.rede=main.id;});NETS.splice(NETS.indexOf(n),1);if(S.seId===n.id){S.seK=null;S.seId=null;}admRe();toast(n.n+' excluíd'+(L.art==='a'?'a':'o'));}});},
 gMove:v=>{closePops();const g=IGREJAS.find(x=>x.id===v),L=NL(),others=NETS.filter(n=>n.id!==g.rede);openDlg(dlgHead('Mover igreja',esc(g.n))+'<form class="fgrid one" id="gmF" novalidate><label class="fld"><span class="fl">Mover para</span><span class="selw"><select name="r">'+others.map(n=>'<option value="'+n.id+'">'+esc(n.n)+'</option>').join('')+'</select>'+ic('updown',14)+'</span><span class="hint">Só muda o agrupamento. Membros, usuários e dados da igreja continuam os mesmos.</span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Mover</button></div></form>','sm');$('#gmF').onsubmit=e=>{e.preventDefault();const to=NETS.find(n=>n.id===e.target.elements.r.value),old=g.rede;g.rede=to.id;closeDlg();admRe();toast(g.n+' agora está em '+to.n,()=>{g.rede=old;admRe();});};},
 gAdd:v=>{closePops();const L=NL(),multi=NETS.length>1,rid=NETS.some(n=>n.id===v)?v:netMain().id;
  openDlg(dlgHead('Nova igreja','O país define a moeda e as divisões do endereço.')+'<form class="fgrid" id="gnF" novalidate><label class="fld wide"><span class="fl">Nome da igreja</span><input name="n" placeholder="Ex.: Alva Santos" maxlength="60" autocomplete="off"><span class="err"></span></label>'
   +'<label class="fld"><span class="fl">País</span><span class="selw"><select name="country">'+Object.entries(NX_COUNTRIES).map(([k,c])=>'<option value="'+k+'">'+c.n+'</option>').join('')+'</select>'+ic('updown',14)+'</span></label>'
   +'<label class="fld"><span class="fl" id="gnDiv">Estado</span><span class="selw"><select name="sub">'+nxSubOpts('BR','')+'</select>'+ic('updown',14)+'</span><span class="err"></span></label>'
   +'<label class="fld wide"><span class="fl">Cidade</span><input name="city" placeholder="Ex.: Santos" maxlength="60" autocomplete="off"><span class="err"></span></label>'
   +'<label class="fld"><span class="fl">Bairro ou distrito <small>opcional</small></span><input name="district" maxlength="60" autocomplete="off"></label><label class="fld"><span class="fl">Código postal <small>opcional</small></span><input name="cep" maxlength="12" autocomplete="off"></label><label class="fld wide"><span class="fl">Rua <small>opcional</small></span><input name="street" maxlength="80" autocomplete="off"></label><label class="fld"><span class="fl">Número <small>opcional</small></span><input name="num" maxlength="20" autocomplete="off"></label><label class="fld"><span class="fl">Complemento <small>opcional</small></span><input name="comp" maxlength="60" autocomplete="off"></label>'
   +(multi?'<label class="fld wide"><span class="fl">'+L.s+'</span><span class="selw"><select name="r">'+NETS.map(n=>'<option value="'+n.id+'"'+(n.id===rid?' selected':'')+'>'+esc(n.n)+(n.main?' (principal)':'')+'</option>').join('')+'</select>'+ic('updown',14)+'</span></label>':'')
   +'<p class="hint wide" id="gnCur">A moeda da igreja será real (BRL) e não muda depois. O país também não muda depois que a igreja tem dados.</p>'
   +'<div class="dfoot wide"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Criar igreja</button></div></form>');
  const f=$('#gnF'),bad=(n,t)=>{const i=f.elements[n],fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=t;i.focus();};
  f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.elements.country.addEventListener('change',()=>{const c=NX_COUNTRIES[f.elements.country.value];$('#gnDiv').textContent=c.div;f.elements.sub.innerHTML=nxSubOpts(f.elements.country.value,'');$('#gnCur').textContent='A moeda da igreja será '+c.cur+' e não muda depois. O país também não muda depois que a igreja tem dados.';});
  f.onsubmit=e=>{e.preventDefault();const n=f.elements.n.value.trim(),city=f.elements.city.value.trim(),co=f.elements.country.value,sub=f.elements.sub.value;
   if(!n){bad('n','Dê um nome à igreja');return;}if(IGREJAS.some(g=>norm(g.n)===norm(n))){bad('n','Já existe uma igreja com esse nome');return;}if(!sub){bad('sub','Escolha '+(co==='CL'?'a região':co==='AR'?'a província':'o estado'));return;}if(!city){bad('city','Informe a cidade');return;}
   const id='g'+Date.now();IGREJAS.push({id,n,rede:multi?f.elements.r.value:netMain().id,lead:''});CHP[id]={tagline:'',story:'',founded:'',stats:false,values:[],social:[],live:'',hours:'',wa:'',phone:'',email:'',street:f.elements.street.value.trim(),num:f.elements.num.value.trim(),comp:f.elements.comp.value.trim(),district:f.elements.district.value.trim(),city,sub,country:co,cep:f.elements.cep.value.trim(),requests:[],services:[]};CHP_MEM[id]=0;CHP_CASAS[id]=0;
   closeDlg();admRe();toast(n+' criada');};}
});
/* dados de demonstração dos encontros do supervisor */
(()=>{const l0=seLeaders('rede',REDES[0]);REDES[0].meets.push(seM(-14,'19:30','Presencial',{done:1,where:'Sala 2 da igreja sede',topic:'Alinhamento do trimestre',pres:Object.fromEntries(l0.map((n,i)=>[n,i!==1])),notes:'Revisamos as metas de multiplicação e combinamos a visita às casas novas.'}),seM(6,'19:30','Remoto',{url:'https://meet.google.com/abc-defg-hij',topic:'Multiplicação de casas'}));
 REDES[1].meets.push(seM(3,'20:00','Presencial',{where:'Casa da Camila'}));
 const ln=seLeaders('net',NETS[0]);NETS[0].meets.push(seM(-21,'19:00','Presencial',{done:1,where:'Auditório da sede',topic:'Visão do ano',pres:Object.fromEntries(ln.map(n=>[n,true])),notes:'Apresentação do calendário e das metas das igrejas.'}),seM(9,'19:00','Remoto',{url:'https://meet.google.com/xyz-uvwx-rst',topic:'Encontro de líderes'}));})();

/* ---- Jornada: vincular curso que já existe; Série: mesma trilha da Jornada, com ícone, duração e progresso por item ---- */
NX_VIDEOS.forEach((v,i)=>{if(!v.dur)v.dur=[9,14,18][i]||0;});
const NX_TYPE_IC={'Pregação':'book','Vídeo':'play','Música':'music','Material':'file','Misto':'layers'};
const NX_TYPE_PL={'Pregação':'pregações','Vídeo':'vídeos','Música':'músicas','Material':'materiais','Misto':'conteúdos'};
const NX_TYPE_LO={'Pregação':'pregação','Vídeo':'vídeo','Música':'música','Material':'material','Misto':'conteúdo'};
const nxMin=m=>m>=60?Math.floor(m/60)+' h'+(m%60?' '+String(m%60).padStart(2,'0'):''):m+' min';
/* série mista: cada item é de um tipo; o tipo vem do próprio item */
const nxKind=o=>!o?'':PREGS.includes(o)?'Pregação':NX_VIDEOS.includes(o)?'Vídeo':SONGS.includes(o)?'Música':'Material';
const nxItemObj=(type,id)=>[PREGS,NX_VIDEOS,SONGS,MATS].map(l=>l.find(x=>x.id===id)).find(Boolean);
const nxItemInfo=(type,o)=>{const k=nxKind(o);return !o?{t:'Conteúdo indisponível',sub:'Foi removido da biblioteca',dur:0}:k==='Vídeo'?{t:o.t,sub:[k,o.tag||o.desc||''].filter(Boolean).join(' · '),dur:o.dur||0}:k==='Música'?{t:o.n,sub:[k,o.art,o.key?'Tom '+o.key:''].filter(Boolean).join(' · '),dur:0}:k==='Material'?{t:o.t,sub:k+' · '+o.files.length+' arquivo'+(o.files.length===1?'':'s'),dur:0}:{t:o.t,sub:[k,o.who,o.ref].filter(Boolean).join(' · '),dur:o.dur||0};};
function nxSerTotal(s){return s.items.reduce((a,id)=>a+nxItemInfo(s.type,nxItemObj(s.type,id)).dur,0);}
function nxSerDur(s){const t=nxSerTotal(s);return t?' · '+nxMin(t):'';}
const nxSerCur=()=>NX_SERIES.find(x=>x.id===S.nxSeries);
nxSeriesPage=function(){
 nxSyncSr();
 const s=nxSerCur();if(!s)return nxSeriesList();
 const idx=NX_SERIES.indexOf(s),ti=NX_TYPE_IC[s.type],track=s.type!=='Música',n=s.items.length,total=nxSerTotal(s),one=NX_TYPE_LO[s.type],many=NX_TYPE_PL[s.type];
 const pct=i=>s.people.length?Math.round(s.people.filter(p=>p.done>i).length/s.people.length*100):0;
 const avg=n&&s.people.length?Math.round(s.people.reduce((a,p)=>a+Math.min(n,p.done)/n,0)/s.people.length*100):0;
 const tab=track&&S.nxSeriesTab==='progress'?'progress':'items';
 const kp=[[n,'Itens'],[total?nxMin(total):'—','Duração']].concat(track?[[s.people.length,'Inscritos'],[avg+'<small class="kof">%</small>','Progresso médio']]:[]);
 const tabs=[['items','Itens','nxSeriesTab',n]].concat(track?[['progress','Inscritos e progresso','nxSeriesTab',null]]:[]);
 const head=joHead(s,'<span class="soft">Conteúdo</span>'+ic('chevR',13,2)+'<button class="lnk back" data-a="nxSeriesBack">Séries</button>'+ic('chevR',13,2)+'<span>'+esc(s.n)+'</span>',
  '<span class="nx-sh"><span class="nx-si" style="background:'+thumbBg(idx%6)+(s.cover?";background-image:url('"+s.cover+"');background-size:cover;background-position:center":'')+'">'+ic(ti,22)+'</span>'+esc(s.n)+'</span>',
  'Série de '+many+(s.desc?' · '+esc(s.desc):''),kp,tabs,tab,nxBadge(s)+'<button class="btn sec sm" data-a="nxSeriesEdit" data-v="'+s.id+'">'+ic('pen',14)+'Editar série</button>');
 let body;
 if(tab==='progress'){
  body='<section class="card mtab"><div class="trow pp thead"><span>Pessoa</span><span>Progresso</span><span>Onde está</span><span>Situação</span></div>'+(s.people.length?s.people.map(p=>{const pr=n?Math.min(100,Math.round(Math.min(n,p.done)/n*100)):0,cur=Math.min(p.done,n-1),ci=nxItemInfo(s.type,nxItemObj(s.type,s.items[cur]));
   return '<div class="trow pp"><span class="tn">'+avN(p.n)+'<b>'+esc(p.n)+'</b></span><span class="ct-pg"><span class="tr '+(pr===100?'done':'')+'"><i style="width:'+pr+'%"></i></span><b>'+pr+'%</b></span><span class="ct-where">'+(pr===100?'<span class="sp-ok">'+ic('check',13,2.4)+'Concluiu a série</span>':'Item '+(cur+1)+' de '+n+' · <span class="soft">'+esc(ci.t)+'</span>')+'</span><span class="ts">'+(pr===100?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Concluída</span>':'<span class="soft">Falta '+(100-pr)+'%</span>')+'</span></div>';}).join(''):'<div class="tfoot"><span>Ninguém começou ainda.</span></div>')+'</section>';
 }else{
  body='<section class="card ct-trail"><div class="sh"><p class="who" style="margin:0">'+ic('grip',13,2)+' Arraste para mudar a ordem. '+(track?'Quem acompanha a série segue os itens nessa sequência.':'As músicas aparecem nessa sequência no app.')+'</p><button class="btn pri sm" data-a="nxSeriesAdd">'+ic('plus',14,2.2)+'Adicionar '+one+'</button></div>'
   +'<ol class="ct-tl" id="nxSerList">'+s.items.map((id,i)=>{const f=nxItemInfo(s.type,nxItemObj(s.type,id));
    return '<li data-id="'+id+'"><span class="ct-node">'+(i+1)+'</span><div class="ct-cc" tabindex="0" data-a="nxSeriesItem" data-v="'+id+'"><span class="cm-grip" title="Arraste para reordenar">'+ic('grip',14,2)+'</span><div class="ct-ccb"><b>'+esc(f.t)+'</b><span>'+esc(f.sub)+'</span></div><span class="ct-ccm">'+(f.dur?'<b>'+nxMin(f.dur)+'</b>':'')+'</span>'
     +(track?'<span class="ct-ccp"><span class="tr"><i style="width:'+pct(i)+'%"></i></span><small>'+pct(i)+'% concluído</small></span>':'<span class="ct-ccp"></span>')
     +'<button type="button" class="ibtn sm" data-a="nxSeriesRemove" data-v="'+i+'" aria-label="Remover da série" title="Remover da série">'+ic('x',14)+'</button>'+ic('chevR',16)+'</div></li>';}).join('')
   +'<li class="ct-addn"><span class="ct-node add">'+ic('plus',14,2.2)+'</span><button class="ct-cc add" data-a="nxSeriesAdd"><b>Adicionar '+one+'</b><span>Escolha na biblioteca de '+many+'</span></button></li></ol></section>';
 }
 return head+'<div class="rise" style="--d:2">'+body+'</div>';
};
function nxSeriesAddDlg(){
 const s=nxSerCur();if(!s)return;
 const TY=[['Pregação',PREGS,'pregacoes'],['Vídeo',NX_VIDEOS,'videos'],['Música',SONGS,'musicas'],['Material',MATS,'material']],lib=k=>TY.find(t=>t[0]===k)[1].filter(o=>!s.items.includes(o.id));
 let type=TY[0][0],sel=[],q='';
 openDlg(dlgHead('Adicionar à série','Escolha o tipo e selecione os itens. Dá para misturar tipos na mesma série.')+'<div class="mcp"><div class="mcp-ty">'+TY.map(t=>'<button type="button" data-ty="'+t[0]+'" class="'+(t[0]===type?'on':'')+'"><span class="mc-i t-'+t[2]+'">'+ic(NX_TYPE_IC[t[0]],15,1.8)+'</span>'+t[0]+'<small id="saN-'+t[0]+'"></small></button>').join('')+'</div>'
  +'<div class="mcp-r"><label class="sbox">'+ic('search',16)+'<input id="saQ" placeholder="Buscar na biblioteca" autocomplete="off"></label><div class="mtf-list" id="saL" style="max-height:300px"></div></div></div>'
  +'<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" id="saOk" disabled>Adicionar</button></div>','lg');
 const cls=TY.reduce((m,t)=>{m[t[0]]=t[2];return m;},{});
 const paint=()=>{const ql=norm(q),l=lib(type).filter(o=>{const f=nxItemInfo(type,o);return !ql||norm(f.t+' '+f.sub).includes(ql);});
  $('#saL').innerHTML=l.map(o=>{const f=nxItemInfo(type,o),on=sel.includes(o.id);return '<button type="button" class="mtf-p '+(on?'on':'')+'" data-k="'+o.id+'"><span class="mc-i t-'+cls[type]+'">'+ic(NX_TYPE_IC[type],14,1.8)+'</span><span class="dkt"><b>'+esc(f.t)+'</b><span>'+esc([f.sub.replace(/^[^·]+(· )?/,''),f.dur?nxMin(f.dur):''].filter(Boolean).join(' · ')||type)+'</span></span><i class="mtf-ck">'+ic('check',12,2.6)+'</i></button>';}).join('')||'<p class="who" style="padding:10px">'+(lib(type).length?'Nada encontrado.':'Tudo desta biblioteca já está na série.')+'</p>';
  TY.forEach(t=>{const n=sel.filter(id=>t[1].some(o=>o.id===id)).length;$('#saN-'+t[0]).textContent=n||'';});
  const ok=$('#saOk');ok.disabled=!sel.length;ok.textContent=sel.length?'Adicionar '+sel.length+(sel.length===1?' item':' itens'):'Adicionar';};
 const D=$('.mcp');D.addEventListener('click',e=>{const t=e.target.closest('[data-ty],[data-k]');if(!t)return;
  if(t.dataset.ty){type=t.dataset.ty;D.querySelectorAll('[data-ty]').forEach(x=>x.classList.toggle('on',x===t));paint();}
  if(t.dataset.k){const k=t.dataset.k,i=sel.indexOf(k);if(i>-1)sel.splice(i,1);else sel.push(k);paint();}});
 $('#saQ').addEventListener('input',e=>{q=e.target.value;paint();});paint();
 $('#saOk').onclick=()=>{if(!sel.length)return;const ids=sel.slice();ids.forEach(id=>{s.items.push(id);const p=PREGS.find(p=>p.id===id);if(p)p.sr=s.id;});nxSyncSr();closeDlg();render();toast(ids.length>1?ids.length+' itens adicionados à série':'Item adicionado à série');};
}
function nxLinkCourseDlg(){
 const j=jById(S.jor);if(!j)return;
 const inJ=c=>JORNS.filter(o=>o.courses.includes(c)).map(o=>o.n),seen=new Set(j.courses.map(c=>c.id)),cand=[];
 [...CSOLO.filter(x=>!x.min).map(x=>x.courses[0]),...JORNS.flatMap(o=>o.courses)].forEach(c=>{if(seen.has(c.id))return;seen.add(c.id);cand.push(c);});
 openDlg(dlgHead('Vincular curso','Escolha cursos que já existem. As aulas continuam no próprio curso, e o mesmo curso pode estar em mais de uma jornada.')+'<form id="cuLF" class="fgrid one" novalidate>'
  +(cand.length?'<div class="cpick" style="max-height:340px;overflow:auto">'+cand.map((c,i)=>{const w=inJ(c);return '<label><input type="checkbox" name="c" value="'+c.id+'"><span class="htile" style="--s:30px;background:'+thumbBg(4+i)+';color:#fff">'+ic('book',14)+'</span><span><b>'+esc(c.n)+'</b><small>'+c.aulas.length+' aula'+(c.aulas.length===1?'':'s')+(c.on?'':' · inativo')+' · '+(w.length?'Em '+esc(w.join(', ')):'Avulso')+'</small></span><i class="cb">'+ic('check',12,2.8)+'</i></label>';}).join('')+'</div><p class="hint" style="margin:0">Cursos de ministério e séries não entram em jornadas.</p>'
   :'<p class="who">Não há outros cursos para vincular. Crie o curso em Conteúdo › Cursos e volte aqui. Cursos de ministério e séries não entram em jornadas.</p>')
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" disabled>Vincular</button></div></form>');
 const f=$('#cuLF'),b=f.querySelector('[type=submit]');f.addEventListener('change',()=>{const k=$$('[name=c]:checked',f).length;b.disabled=!k;b.textContent=k>1?'Vincular '+k:'Vincular';});
 f.onsubmit=e=>{e.preventDefault();const ids=$$('[name=c]:checked',f).map(i=>i.value),moved=ids.map(id=>cand.find(c=>c.id===id)).filter(Boolean);if(!moved.length)return;
  moved.forEach(c=>{j.courses.push(c);j.people.forEach(p=>p.prog.push(0));});closeDlg();ctRe();
  toast(moved.length>1?moved.length+' cursos vinculados à trilha':moved[0].n+' vinculado à trilha',()=>{moved.forEach(c=>{const i=j.courses.indexOf(c);if(i<0)return;j.courses.splice(i,1);j.people.forEach(p=>p.prog.splice(i,1));});ctRe();});};
}
Object.assign(A,{
 cuLink:nxLinkCourseDlg,
 cuUnlink:v=>{const j=jById(S.jor),c=cuById(j,v);if(!c)return;const n=JORNS.filter(o=>o!==j&&o.courses.includes(c)).length;confirmDel({title:'Desvincular '+esc(c.n)+'?',body:'O curso sai desta trilha'+(n?' e continua nas outras '+n+' jornada'+(n>1?'s':''):' e volta a ser um curso avulso, com as suas aulas')+'. O progresso dos inscritos desta jornada neste curso deixa de aparecer aqui.',label:'Desvincular',onConfirm:()=>{const i=j.courses.indexOf(c);j.courses.splice(i,1);j.people.forEach(p=>{p.prog.splice(i,1);p.certC=p.certC.filter(x=>x!==i).map(x=>x>i?x-1:x);});if(!n&&!CSOLO.some(x=>x.courses.includes(c)))CSOLO.push({id:'cs'+Date.now(),n:'',solo:true,min:'',courses:[c],people:[],more:0});ctRe();toast(c.n+' desvinculado da trilha');}});},
 cuDel:v=>{const j=jById(S.jor),c=cuById(j,v);if(!c)return;const n=JORNS.filter(o=>o.courses.includes(c)).length;confirmDel({title:'Excluir '+esc(c.n)+'?',body:'As '+c.aulas.length+' aulas e o progresso dos inscritos neste curso serão apagados'+(n>1?', e ele sai das '+n+' jornadas em que está':'')+'.',typed:c.n,onConfirm:()=>{JORNS.forEach(o=>{const i=o.courses.indexOf(c);if(i<0)return;o.courses.splice(i,1);o.people.forEach(p=>{p.prog.splice(i,1);p.certC=p.certC.filter(x=>x!==i).map(x=>x>i?x-1:x);});});CSOLO.filter(x=>x.courses.includes(c)).forEach(x=>CSOLO.splice(CSOLO.indexOf(x),1));S.cur=null;S.jtab='trilha';if(S.active==='cursos'||j.solo)S.jor=null;ctGo();toast('Curso excluído');}});},
 nxSeriesAdd:nxSeriesAddDlg,
 nxSeriesItem:(id,b,e)=>{if(e&&e.target.closest('.cm-grip'))return;const s=nxSerCur();if(!s)return;if(s.type==='Música'){A.sgEdit(id);return;}A.nav(s.type==='Vídeo'?'videos':'pregacoes');if(s.type==='Vídeo')S.nxVideo=id;else S.preg=id;render();window.scrollTo({top:0});}
});
{const main=document.getElementById('main');new MutationObserver(()=>{const b=document.getElementById('nxSerList');if(!b||b.dataset.sort)return;b.dataset.sort='1';
 sortable(b,'li[data-id]','.cm-grip',ids=>{const s=nxSerCur();if(!s)return;const old=s.items.slice(),next=ids.filter(id=>old.includes(id));if(next.join()===old.join())return;s.items=next;render();toast('Ordem da série atualizada',()=>{s.items=old;render();});});}).observe(main,{childList:true,subtree:true});}

/* ---- Item em várias séries; curso em várias jornadas; visibilidade própria (a série e a jornada filtram, não herdam) ---- */
function nxSyncSr(){PREGS.forEach(p=>{p.sr=(NX_SERIES.find(s=>s.items.includes(p.id))||{}).id||'';});}
function nxApplySeries(type,id,ids){NX_SERIES.forEach(s=>{const has=s.items.includes(id),want=ids.includes(s.id);if(want&&!has)s.items.push(id);if(!want&&has)s.items.splice(s.items.indexOf(id),1);});nxSyncSr();}
function nxSerField(type,id){const list=NX_SERIES.slice();
 return '<div class="fld wide"><span class="fl">Séries <small>opcional</small></span>'+(list.length?'<div class="cpick nx-serpick">'+list.map(s=>'<label><input type="checkbox" name="sr" value="'+s.id+'"'+(id&&s.items.includes(id)?' checked':'')+'><span class="htile" style="--s:26px;background:var(--brand-soft);color:var(--brand-text)">'+ic(NX_TYPE_IC[type],13)+'</span><span><b>'+esc(s.n)+'</b></span><i class="cb">'+ic('check',12,2.8)+'</i></label>').join('')+'</div><span class="hint">Pode estar em mais de uma série. Também dá para adicionar pela página da série.</span>':'<span class="hint">Ainda não há séries de '+NX_TYPE_PL[type]+'. Crie em Conteúdo › Séries.</span>')+'</div>';}
{const ids=['sr1','sr2'];if(!NX_SERIES.some(s=>s.id==='sr5')){PSERIES.push({id:'sr5',n:'Abraão e a fé',h:1});NX_SERIES.push({id:'sr5',n:'Abraão e a fé',type:'Pregação',desc:'A caminhada de Abraão, mensagem por mensagem.',min:'',visibility:'Interno',items:[PREGS[0].id,PREGS[1].id],people:[{n:'Ana Lima',done:1}]});}nxSyncSr();}

/* ---- Cuidado › Como estou me sentindo: no mesmo desenho de Pedidos de oração ---- */
const FEEL_TONE={'Grato':'damasco','Em paz':'menta','Cansado':'ceu','Preciso de oração':'rosado'};
const FEEL_L=Object.keys(FEEL_TONE);
let _flid=0;
const FL=(n,mood,when,o={})=>({id:'fl'+(++_flid),n,mood,when,priv:!!o.priv,text:o.text||'',prayer:!!o.prayer});
const FEELS=[];
(()=>{const nm=(i,j,d)=>(CASAS[i]&&CASAS[i].ppl[j]?CASAS[i].ppl[j].n:d);
 FEELS.push(FL(nm(0,1,'Bruno Reis'),'Preciso de oração',0,{text:'Estou passando por um momento difícil no trabalho e preciso de força.',prayer:true}),
  FL(nm(0,0,'Ana Lima'),'Grato',0),FL(nm(1,0,'Carlos Mendes'),'Cansado',1),FL(nm(0,2,'Clara Nunes'),'Em paz',1),
  FL(nm(1,1,'Diego Faria'),'Preciso de oração',2,{text:'Peço oração pela saúde do meu pai.'}),FL(nm(0,3,'Elisa Moura'),'Grato',3),
  FL(nm(1,2,'Paulo Alves'),'Cansado',3),FL(nm(0,4,'Luana Souza'),'Em paz',5));})();
Object.assign(S,{ff:'todos'});
const feelHouse=n=>CASAS.find(c=>c.ppl.some(p=>p.n===n));
function feelCard(f){
 const c=feelHouse(f.n),t=FEEL_TONE[f.mood],canPray=!f.prayer;
 return '<article class="card prc ativo" id="'+f.id+'"><div class="pr1">'+avN(f.n)+'<div class="prn"><b>'+esc(f.n)+'</b><span>'+whenL(f.when)+'</span></div>'
  +'<div style="position:relative;margin-left:auto"><button class="ibtn sm" data-a="fMenu" data-v="'+f.id+'" aria-label="Ações">'+ic('dots',15)+'</button><div class="pop" id="fPop-'+f.id+'" style="right:0;top:calc(100% + 4px)">'+(canPray?'<button class="pi" data-a="fToPray" data-v="'+f.id+'">'+ic('hands',16)+'Virar pedido de oração</button>':'<button class="pi" data-a="fSeePray" data-v="'+f.id+'">'+ic('hands',16)+'Ver em Pedidos de oração</button>')+'<button class="pi" data-a="fCase" data-v="'+f.id+'">'+ic('heart',16)+'Abrir caso pastoral</button></div></div></div>'
  +'<div><span class="stp" style="--c:var(--tone-'+t+'-ink);--b:var(--tone-'+t+')"><i></i>'+f.mood+'</span></div>'
  +(f.text?'<blockquote class="prq">'+esc(f.text)+'</blockquote>':'')
  +(f.prayer?'<p class="prnote">'+ic('hands',13)+'Virou pedido de oração</p>':'')+'</article>';
}
function feelList(){
 const l=FEELS.filter(f=>S.ff==='todos'||f.mood===S.ff),cnt=m=>FEELS.filter(f=>f.mood===m).length,top=FEEL_L.map(m=>[m,cnt(m)]).sort((a,b)=>b[1]-a[1])[0],need=cnt('Preciso de oração');
 return '<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Como estou me sentindo</h1><p class="lede">Como os membros dizem que estão, pelo app. Cada envio é um registro novo e não pode ser editado nem apagado.</p></div><div class="pact"></div></header>'
  +'<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Registros</span><span class="kv">'+FEELS.length+'</span><span class="kd">nos últimos 7 dias</span></div><div class="k4"><span class="kl">Mais frequente</span><span class="kv" style="font-size:22px">'+top[0]+'</span><span class="kd">'+top[1]+' registro'+(top[1]===1?'':'s')+'</span></div><div class="k4"><span class="kl">Preciso de oração</span><span class="kv" style="'+(need?'color:var(--st-sol)':'')+'">'+need+'</span><span class="kd">'+FEELS.filter(f=>f.prayer).length+' viraram pedido de oração</span></div></section>'
  +'<div class="chips rise" style="--d:2">'+[['todos','Todos',FEELS.length]].concat(FEEL_L.map(m=>[m,m,cnt(m)])).map(c=>'<button class="chipf '+(S.ff===c[0]?'on':'')+'" data-a="fFilter" data-v="'+c[0]+'">'+c[1]+'<small>'+c[2]+'</small></button>').join('')+'</div>'
  +'<div class="pgrid2 rise" style="--d:3">'+(l.length?l.map(feelCard).join(''):'<div class="card mempty" style="grid-column:1/-1"><p>Nenhum registro aqui.</p><span>Ninguém registrou este sentimento nos últimos dias.</span></div>')+'</div>';
}
Object.assign(A,{
 fFilter:v=>{S.ff=v;render();},
 fMenu:v=>{const p=$('#fPop-'+v);closePops(p);p.classList.toggle('open');},
 fToPray:v=>{closePops();const f=FEELS.find(x=>x.id===v);PRAYERS.unshift(PR(f.n,f.text||'Pedido de oração a partir de “Como estou me sentindo”.',0,0,{tone:TONES[f.n.length%6]}));f.prayer=true;render();toast('Pedido de oração criado para '+f.n.split(' ')[0]);},
 fSeePray:()=>{closePops();A.nav('oracao');},
 fCase:v=>{closePops();const f=FEELS.find(x=>x.id===v);A.nav('acompanhamento');toast('Em Adicionar caso, escolha '+f.n.split(' ')[0]+' para abrir o caso pastoral');}
});
LSTD.sentimentos={list:'.pgrid2',move:'.wrap>.chips',item:'.pgrid2>.card',ph:'Buscar pessoa ou sentimento'};
NAV.find(g=>g[0]==='Geral')[1].find(i=>i[0]==='cuidado')[3].push(['sentimentos','Como estou me sentindo']);

