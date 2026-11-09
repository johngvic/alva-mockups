/* ===== Kids no app administrativo: Visão geral, Salas, Planejamento e Escalas (Tiago, 08/11/2026) =====
 * Dados e status vêm da web e da spec do Kids (turma = faixa etária; sala = Espaço com limite, turma e time; planejamento = aula de cada turma em cada Culto Kids).
 * Sem check-in (vem do Zelo's Kids): saem "Crianças hoje" e a ocupação. A Escalas é o componente único de screens-escalas.js.
 * Times e Turmas ficam na web (o Time aparece na ficha do Ministério; a Turma, aqui, como faixa nas salas e no planejamento). */
const KID_TURMAS=[{id:'t1',n:'Berçário',min:0,max:2},{id:'t2',n:'Maternal',min:3,max:4},{id:'t3',n:'Jardim',min:5,max:6},{id:'t4',n:'Kids A',min:7,max:9}];
const kdTurma=id=>KID_TURMAS.find(t=>t.id===id);
const kdFaixa=t=>t.min+' a '+t.max+' anos';
const KID_SALAS=[
 {id:'s1',n:'Sala Berçário',cap:15,turma:'t1',team:'Berçário — Domingo manhã',st:'at'},
 {id:'s2',n:'Sala Maternal',cap:20,turma:'t2',team:'Maternal — Domingo manhã',st:'at'},
 {id:'s3',n:'Sala Jardim',cap:22,turma:'t3',team:'',st:'at'},
 {id:'s4',n:'Sala Kids',cap:25,turma:'t4',team:'Kids A — Domingo manhã',st:'at'},
 {id:'s5',n:'Sala Multiuso',cap:12,turma:'',team:'',st:'in'}];
/* próximas datas de Culto Kids (as das escalas do ministério) */
const kdDates=()=>[...new Set(SCL.filter(s=>s.min==='Infantil').flatMap(s=>s.dates.map(d=>d.date)))].filter(x=>x>=cuToday()).sort().slice(0,4);
function kdNextEsc(sala){if(!sala.team)return null;const l=SCL.filter(s=>s.min==='Infantil').flatMap(s=>s.dates.flatMap(d=>d.blocks.filter(b=>b.team===sala.team).map(b=>({s,d,b})))).filter(x=>x.d.date>=cuToday()).sort((a,b)=>a.d.date.localeCompare(b.d.date))[0];return l||null;}
KID_SALAS.forEach(r=>{const t=kdTurma(r.turma);Object.defineProperties(r,{
 s:{get(){const sel=[t?t.n+' · '+kdFaixa(t):'Sem turma','limite '+r.cap+' crianças'];if(r.st==='at'&&!r.team)sel.push('Sem time');return sel.join(' · ');},enumerable:true},
 d:{get(){const nx=kdNextEsc(r);return [['Limite de crianças',String(r.cap)],['Turma',t?t.n+' · '+kdFaixa(t):'Sem turma'],['Time',r.team||'Sala sem time vinculado'],['Próxima escala',r.team?(nx?sclDate(nx.d.date)+' · '+nx.d.time+' · '+nx.b.ppl.length+(nx.b.ppl.length===1?' escalado':' escalados')+' · '+SCL_ST[nx.s.st][1].toLowerCase():'Sem escala futura'):'—'],['Reservada no Culto Kids',r.st==='at'&&kdDates()[0]?sclDate(kdDates()[0])+' · 09:00':'Não está reservada em nenhum Culto Kids']];},enumerable:true}});});
/* planejamento: a aula de cada turma em cada data (biblioteca do Conteúdo) */
const KID_KINDS=[['Pregação','Pregações'],['Vídeo','Vídeos'],['Música','Músicas'],['Material','Material de apoio']];
const kdLib=kind=>{const sec=(KID_KINDS.find(k=>k[0]===kind)||KID_KINDS[0])[1];return (LSD.conteudo[sec]?LSD.conteudo[sec].rows:[]).map(r=>({t:r.n,kind}));};
const KID_PLAN={};
S.kd={f:'todos',kind:'Pregação',pick:null};
(()=>{const ds=kdDates();KID_TURMAS.forEach((t,i)=>{KID_PLAN[t.id]={};ds.slice(0,i===3?1:2).forEach((d,j)=>{const k=KID_KINDS[(i+j)%4][0],l=kdLib(k);if(l.length)KID_PLAN[t.id][d]=l[(i+j)%l.length];});});})();
const kdAula=(tid,iso)=>(KID_PLAN[tid]||{})[iso]||null;
const kdSem=()=>kdDates().reduce((a,d)=>a+KID_TURMAS.filter(t=>!kdAula(t.id,d)).length,0);
function kdPlanBody(){const ds=kdDates(),f=S.kd.f,ed=can('kids','editar');
 const cells=ds.flatMap(d=>KID_TURMAS.map(t=>({d,t,a:kdAula(t.id,d)})));
 const sem=cells.filter(c=>!c.a).length;
 if(!ds.length)return vsEmpty('Nenhum Culto Kids','Os cultos Kids são criados na Agenda, na web.');
 return vsChips('kdF',f,[['todos','Todas',cells.length],['sem','Sem aula',sem]])+fndBox('kdPl','Buscar turma')
  +`<div class="stack g4" id="kdPl">${ds.map((d,i)=>{const l=cells.filter(c=>c.d===d&&(f==='todos'||!c.a));return l.length?`<section class="stack g2"><p class="eb2">${sclDate(d)}${i===0?' · próximo culto':''}</p><div class="vl">${l.map(c=>{const inner=`<span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(c.t.n)} <small class="vs">${kdFaixa(c.t)}</small></span><span class="vs">${c.a?esc(c.a.t)+' · '+c.a.kind:'Sem aula definida'}</span></span>${c.a?'':vsTag('warning','Sem aula')}`;return ed?`<button class="vr tap" data-q="${esc(c.t.n)}" data-a="kdPlan" data-v="${c.t.id}|${d}">${inner}</button>`:`<div class="vr" data-q="${esc(c.t.n)}">${inner}</div>`;}).join('')}</div></section>`:'';}).join('')||vsEmpty('Tudo planejado','Todas as turmas têm aula nas próximas datas.')}</div>`;}
function kdPlanSheet(tid,iso){const t=kdTurma(tid),a=kdAula(tid,iso),k=S.kd.kind,l=kdLib(k);if(S.kd.pick&&S.kd.pick.tid!==tid+iso)S.kd.pick=null;
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Aula de ${sclDate(iso)} · ${esc(t.n)}</h3><p class="callout">O conteúdo é do dia: vale para a manhã e para a noite. Escolha o tipo e depois a aula.${a?' Hoje: '+esc(a.t)+' ('+a.kind+').':''}</p></div>
  ${vsChips('kdK',k,KID_KINDS.map(x=>[x[0],x[0]]))}${fndBox('kdLb','Buscar pelo título')}
  <div class="vl" id="kdLb">${l.map(x=>`<button class="vr tap" data-q="${esc(x.t)}" data-pick="${esc(x.t)}" aria-pressed="${!!(S.kd.pick&&S.kd.pick.t===x.t&&S.kd.pick.kind===x.kind)}"><span class="grow vn">${esc(x.t)}</span><span class="vs">${x.kind}</span></button>`).join('')||vsEmpty('Nada neste tipo','Cadastre o conteúdo na web.')}</div>
  <div class="otpmsg" id="kdEr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="kdGo">Definir aula</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{
  sh.querySelectorAll('[data-pick]').forEach(bt=>bt.addEventListener('click',()=>{const t2=bt.getAttribute('data-pick');S.kd.pick={tid:tid+iso,t:t2,kind:k};sh.querySelectorAll('[data-pick]').forEach(x=>x.setAttribute('aria-pressed',String(x===bt)));$('#kdEr',sh).textContent='';}));
  $('#kdGo',sh).addEventListener('click',()=>{if(!S.kd.pick||S.kd.pick.tid!==tid+iso){$('#kdEr',sh).textContent='Escolha a aula na lista.';return;}KID_PLAN[tid][iso]={t:S.kd.pick.t,kind:S.kd.pick.kind};S.kd.pick=null;closeSheet().then(()=>{softRender();toast('success','Aula definida',t.n+' · '+sclDate(iso));});});});}
Object.assign(A,{
 kdF:v=>{S.kd.f=v;softRender();},
 kdPlan:v=>{const [tid,iso]=v.split('|');S.kd.kind=(kdAula(tid,iso)||{kind:'Pregação'}).kind;S.kd.pick=null;kdPlanSheet(tid,iso);},
 kdK:v=>{S.kd.kind=v;const c=S.kd.cur;if(c)kdPlanSheet(c[0],c[1]);}
});
/* guarda a célula aberta para a troca de tipo */
{const base=A.kdPlan;A.kdPlan=v=>{S.kd.cur=v.split('|');base(v);};}
/* peças da visão geral (as do screens-overview.js ficam num bloco próprio) */
const kdAtt=(tone,t,s,sec)=>`<button class="ova ${tone}" data-a="ovGo" data-v="${esc(sec)}"><i></i><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${t}</span><span class="vs">${s}</span></span>${ic("chevR",18)}</button>`;
const kdSec=(t,b,link)=>`<section class="stack g3"><div class="row between"><p class="eb2">${t}</p>${link?`<button class="tlink" data-a="ovGo" data-v="${esc(link[1])}">${link[0]}</button>`:""}</div>${b}</section>`;
const kdOk=(t,s)=>`<div class="ova ok"><i></i><span class="grow stack" style="gap:2px"><span class="vn">${t}</span><span class="vs">${s}</span></span>${ic("check",18)}</div>`;
/* visão geral: o que precisa de atenção, a aula da semana e a próxima escala de cada sala */
function kdVis(){const salas=KID_SALAS.filter(r=>r.st==='at'),semT=KID_TURMAS.filter(t=>!KID_SALAS.some(s=>s.st==='at'&&s.turma===t.id)),semTime=salas.filter(r=>!r.team),
  aw=SCL.filter(s=>s.min==='Infantil'&&s.st==='aw'),pe=aw.reduce((a,s)=>a+sclCount(s).pe,0),re=aw.reduce((a,s)=>a+sclCount(s).re,0),apr=aw.filter(sclApprovable),sem=kdSem(),ds=kdDates();
 const alerts=[
  ...semT.map(t=>kdAtt('warn',esc(t.n)+' está sem sala',kdFaixa(t),'Salas')),
  ...semTime.map(r=>kdAtt('warn',esc(r.n)+' está sem time','Sala sem time vinculado','Salas')),
  ...(re?[kdAtt('bad',re+(re===1?' recusa':' recusas')+' nas escalas','Substitua a pessoa para a escala poder ser aprovada','Escalas')]:[]),
  ...(pe?[kdAtt('warn',pe+(pe===1?' pessoa sem resposta':' pessoas sem resposta'),'Escalas aguardando aceite','Escalas')]:[]),
  ...apr.map(s=>kdAtt('ok',esc(s.n)+' pode ser aprovada','Todos aceitaram','Escalas')),
  ...(sem?[kdAtt('warn',sem+(sem===1?' dia sem aula':' dias sem aula'),'Turma × data nas próximas '+ds.length+' datas','Planejamento')]:[])];
 const wk=ds[0];
 return kdSec('Precisam de atenção',alerts.join('')||kdOk('Tudo em dia','Salas, escalas e aulas sem pendência.'))
  +kdSec('Aula da semana'+(wk?' · '+sclDate(wk):''),`<div class="vl">${KID_TURMAS.map(t=>{const a=wk?kdAula(t.id,wk):null;return `<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(t.n)} <small class="vs">${kdFaixa(t)}</small></span><span class="vs">${a?esc(a.t)+' · '+a.kind:'Sem aula vinculada esta semana'}</span></span>${a?'':vsTag('warning','Sem aula')}</div>`;}).join('')}</div>`,['Ver o planejamento','Planejamento'])
  +kdSec('Salas e próximas escalas',`<div class="vl">${salas.map(r=>{const nx=kdNextEsc(r),t=kdTurma(r.turma);return `<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${t?esc(t.n)+' · limite '+r.cap:'limite '+r.cap}${r.team?' · '+esc(r.team):''}</span><span class="vs">${r.team?(nx?'Próxima escala: '+sclDate(nx.d.date)+' · '+nx.b.ppl.length+(nx.b.ppl.length===1?' escalado':' escalados'):'Sem escala futura'):'Sala sem time vinculado'}</span></span>${r.team?'':vsTag('warning','Sem time')}</div>`;}).join('')}</div>`,['Ver as salas','Salas']);}
/* as seções */
LSD.kids={
 'Visão geral':{custom:kdVis},
 'Salas':{noun:'salas',av:0,ST:{at:['ok','Ativa'],in:['off','Inativa']},acts:[],rows:KID_SALAS},
 'Planejamento':{custom:kdPlanBody},
 'Escalas':LSD.kids['Escalas']};
LEDE_DYN['kids|Visão geral']=()=>{const ds=kdDates();return ds.length?'Próximo Culto Kids: '+sclDate(ds[0]):'Nenhum Culto Kids marcado';};
LEDE_DYN['kids|Salas']=()=>{const a=KID_SALAS.filter(r=>r.st==='at');return a.length+(a.length===1?' sala ativa':' salas ativas')+' · limite de '+a.reduce((n,r)=>n+r.cap,0)+' crianças';};
LEDE_DYN['kids|Planejamento']=()=>{const n=kdSem();return n?n+(n===1?' dia sem aula':' dias sem aula')+' nas próximas datas':'Todas as turmas com aula nas próximas datas';};
LEDE_DYN['kids|Escalas']=()=>{const n=SCL.filter(s=>s.min==='Infantil'&&s.st==='aw').length;return n?n+(n===1?' escala aguardando aceite':' escalas aguardando aceite'):'Quem serve e quando, no Ministério Infantil';};
Object.defineProperty(GPEND,'kids',{configurable:true,enumerable:true,get:()=>[['Pessoas sem resposta nas escalas',SCL.filter(s=>s.min==='Infantil'&&s.st==='aw').reduce((a,s)=>a+sclCount(s).pe,0)],['Escalas para aprovar',SCL.filter(s=>s.min==='Infantil'&&s.st==='aw'&&sclApprovable(s)).length,3],['Dias sem aula',kdSem()]].filter(x=>x[1]>0)});
