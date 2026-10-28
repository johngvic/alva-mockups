/* ================= Kids ================= */
let _kid=0;const kid=p=>p+(++_kid);
const TURMAS=[{id:'t1',n:'Berçário',min:0,max:2},{id:'t2',n:'Maternal',min:3,max:4},{id:'t3',n:'Jardim',min:5,max:6},{id:'t4',n:'Kids A',min:7,max:9}];
/* os times do Kids são os do Ministério Kids (Comunidade › Ministérios); as pessoas de cada data vêm da escala */
const KT_SEED=[{n:'Berçário — Domingo manhã',m:['Cláudia Ferraz','Patrícia Lima']},{n:'Maternal — Domingo manhã',m:['Mônica Souza']},{n:'Kids A — Domingo manhã',m:['Henrique Costa','Giovanna Martins']}];
const kidsMin=()=>MINIS.find(x=>x.n==='Kids');
/* a sala é um Espaço (de Espaços): o nome vem de lá; o Kids guarda o limite de crianças, a turma e o time */
const kEsp=id=>ESPS.find(e=>e.id===id);
const kSalaMk=o=>Object.defineProperty(o,'n',{get(){const e=kEsp(this.esp);return e?e.n:'Espaço removido';},enumerable:true,configurable:true});
const SALAS=[{id:'s1',esp:'s7',cap:15,turma:'t1',team:0,active:true,pres:8,mon:'Carla Nunes'},{id:'s2',esp:'s8',cap:20,turma:'t2',team:1,active:true,pres:12,mon:'João Lima'},{id:'s3',esp:'s9',cap:22,turma:'t3',team:'',active:true,pres:15,mon:'Ana Souza'},{id:'s4',esp:'s4',cap:25,turma:'t4',team:2,active:true,pres:18,mon:'Marcos Pereira'}].map(kSalaMk);
kidsMin().teams=KT_SEED.map(t=>({n:t.n,lead:t.m[0],ppl:[...t.m],m:t.m.length}));
SALAS.forEach(s=>{s.team=s.team===''?'':kidsMin().teams[s.team];});
/* garante que quem está num time também é membro do ministério */
const kTeams=()=>{const m=kidsMin();mnPpl(m);m.teams.forEach(t=>t.ppl.forEach(n=>{if(!m.ppl.some(p=>p.n===n))m.ppl.push({n,role:'Equipe',since:'2026'});}));return m.teams;};
const kTeamPick=v=>v===''?'':(kTeams()[+v]||'');
const kTeamOf=s=>{const t=s.team;return t&&kidsMin().teams.includes(t)?t:null;};
/* planejamento do trimestre: cada domingo de cada turma é definido à mão; uma série só ajuda a preencher os domingos vazios */
const kISO=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
/* o planejamento acompanha os Cultos Kids: as datas são as dos eventos da Agenda do ministério Kids (o nome K_SUNDAYS ficou, mas são datas de culto) */
const kIsKidsEv=e=>e.min===kidsMin().n&&e.st==='confirmado'&&!!e.d;
const K_SUNDAYS=[];
const kDays=()=>{const d=[...new Set(EVTS.filter(kIsKidsEv).map(e=>e.d))].sort();K_SUNDAYS.length=0;K_SUNDAYS.push(...d);return K_SUNDAYS;};
const kSundayOf=iso=>{kDays();return K_SUNDAYS.find(d=>d>=iso)||K_SUNDAYS[K_SUNDAYS.length-1]||iso;};
const KPLAN={t1:{serie:'sx1',aulas:{}},t2:{serie:'sv1',aulas:{}},t3:{serie:'sm1',aulas:{}},t4:{serie:'sr1',aulas:{}}};
Object.assign(S,{kpo:null,kpMode:'weeks',kpMonth:null});
const kPlanOf=t=>KPLAN[t.id]||(KPLAN[t.id]={serie:'',aulas:{}});
const kSerie=t=>NX_SERIES.find(s=>s.id===kPlanOf(t).serie);
const kItemRef=id=>{const o=nxItemObj('',id),f=nxItemInfo('',o);return {id,t:f.t,kind:o?nxKind(o):'Conteúdo'};};
/* exemplo: a coordenação já preencheu os primeiros domingos a partir da série da turma */
const kSeed=()=>{kDays();if(KPLAN._s)return;KPLAN._s=1;TURMAS.forEach(t=>{const s=kSerie(t);if(s)s.items.slice(0,4).forEach((id,i)=>{kPlanOf(t).aulas[K_SUNDAYS[i]]=kItemRef(id);});});};
const kAulaOn=(t,iso)=>{kSeed();return kPlanOf(t).aulas[iso]||null;};
const kAulaDe=t=>{const a=kAulaOn(t,kSundayOf(NOWD));return a?[a]:[];};
/* preenche só os domingos vazios, a partir de uma data, com os itens da série em ordem */
const kFill=(t,serieId,start)=>{const s=NX_SERIES.find(x=>x.id===serieId);if(!s)return 0;const p=kPlanOf(t);p.serie=serieId;let n=0,i=0;K_SUNDAYS.filter(d=>d>=start).forEach(d=>{if(p.aulas[d]||i>=s.items.length)return;p.aulas[d]=kItemRef(s.items[i++]);n++;});return n;};
/* ocorrências do dia (cultos do Calendário), bloco do time na escala e estado do quadradinho */
const K_PER=e=>{const h=parseInt(e.time)||0;return h<12?'Manhã':h<18?'Tarde':'Noite';};
const kOcc=iso=>EVTS.filter(e=>kIsKidsEv(e)&&e.d===iso).sort((a,b)=>(parseInt(a.time)||0)-(parseInt(b.time)||0));
const kRoomOf=t=>SALAS.find(x=>x.turma===t.id&&x.active);
const kCmpEv=(a,b)=>a.d<b.d?-1:a.d>b.d?1:(parseInt(a.time)||0)-(parseInt(b.time)||0);
const kNextCultoOf=s=>EVTS.filter(e=>kIsKidsEv(e)&&e.d>=NOWD&&(e.rooms||[]).includes(s.esp)).sort(kCmpEv)[0]||null;
const kCultoSeries=()=>{const m={};EVTS.filter(kIsKidsEv).forEach(e=>{const k=e.ser||e.id;(m[k]=m[k]||[]).push(e);});return Object.values(m).map(l=>{l.sort(kCmpEv);return {first:l[0],next:l.find(x=>x.d>=NOWD)||l[l.length-1],n:l.length};}).sort((a,b)=>(parseInt(a.first.time)||0)-(parseInt(b.first.time)||0));};
const kEscBlock=(tm,e)=>{for(const x of ESCALAS.filter(x=>x.min==='Kids'))for(const d of x.dates)if(d.ev===e.id){const b=d.blocks.find(b=>b.team===tm.n);if(b)return {x,d,b,e};}return null;};
const kQuad=(x,b)=>!b.members.length?'empty':x.st==='criacao'?'acao':b.members.every(m=>m.st==='confirmado')?'ok':'wait';
const kTeamOfTurma=t=>{const s=SALAS.find(x=>x.turma===t.id);return s?kTeamOf(s):null;};
/* conteúdo do dia: o definido no planejamento ou o que a escala já carrega */
const kDayContent=(t,iso)=>{const tm=kTeamOfTurma(t),a=kAulaOn(t,iso),inEsc=tm?kOcc(iso).map(e=>kEscBlock(tm,e)).filter(Boolean).flatMap(z=>z.b.content.map(c=>({t:c.t,per:K_PER(z.e),x:z.x}))):[];return {plan:a,esc:inEsc,has:!!a||inEsc.length>0};};
/* na escala do Kids, o bloco mostra a aula prevista da turma da sala do time (só leitura) */
function kAulaPrevista(d,b){if(!b.team)return '';const s=SALAS.find(x=>x.team&&x.team.n===b.team);if(!s)return '';const t=tById(s.turma),e=eById(d.ev);if(!t||!e)return '';const a=kAulaOn(t,e.d);
 return a?`<div class="escs"><div class="escc"><span class="cti" style="width:28px;height:28px;border-radius:8px">${ic('book',13)}</span><span class="dkt"><b>${esc(a.t)}</b><span>Aula prevista · ${esc(t.n)} · do planejamento do Kids</span></span></div></div>`:`<p class="who" style="margin:0 0 6px">Sem aula planejada para ${esc(t.n)} nesta data.</p>`;}
const tById=id=>TURMAS.find(t=>t.id===id),sById=id=>SALAS.find(s=>s.id===id);
const faixa=t=>t?`${t.min}–${t.max} anos`:'—';
const KTONE=['ceu','damasco','lima','rosado','menta','salvia'];
const kTone=i=>KTONE[i%KTONE.length];
const kHead=(t,sub,act)=>`<header class="ph rise"><div><p class="eb">Kids</p><h1>${t}</h1><p class="lede">${sub}</p></div><div class="pact">${act||''}</div></header>`;

/* estado e próxima escala de um time (as escalas são do Ministério Kids; aqui só se mostra) */
const K_ESC_ST={criacao:'Em criação',aguardando:'Aguardando aceite',aprovada:'Aprovada'};
const kNextEsc=tm=>tm?mnTeamEsc(kidsMin(),tm)[0]:null;
function kVis(){
 const T=kTeams(),act=SALAS.filter(s=>s.active),noRoom=TURMAS.filter(t=>!SALAS.some(s=>s.turma===t.id)).length,noTeam=SALAS.filter(s=>!kTeamOf(s)).length,emptyT=T.filter(t=>!t.ppl.length).length;
 const sched=new Set(T.flatMap(t=>t.ppl)).size,here=Math.max(0,sched-1),withLesson=TURMAS.filter(t=>kAulaDe(t).length).length,toApprove=ESCALAS.filter(x=>x.min==='Kids'&&x.st!=='aprovada').length;
 const warn=n=>n?'color:var(--st-sol)':'';
 return `${kHead('Kids','Administração do Ministério Infantil')}
 <section class="card korg rise" style="--d:1"><div class="kon"><span class="eb" style="margin:0">Como se organiza</span><p class="who" style="margin:4px 0 0">Salas, times e turmas são geridos aqui. Os cultos do Kids são eventos da Agenda: eles reservam as salas e trazem a escala. Cadastro de crianças e famílias fica em Membros; o check-in, no Zelo's Kids.</p></div>
  <div class="kflow">
   <button class="kfn" data-a="nav" data-v="kturmas"><span class="kfi">${ic('users',16)}</span><span><b>Turma</b><small>a faixa etária</small></span></button><span class="kfa">${ic('arrowR',14,2)}<small>alocada em</small></span>
   <button class="kfn kmain" data-a="nav" data-v="ksalas"><span class="kfi">${ic('door',16)}</span><span><b>Sala</b><small>o espaço, com limite de crianças</small></span></button><span class="kfa rev">${ic('arrowR',14,2)}<small>servida por</small></span>
   <button class="kfn" data-a="nav" data-v="ktimes"><span class="kfi">${ic('hand',16)}</span><span><b>Time</b><small>quem serve é definido na escala</small></span></button><span class="kfa">${ic('arrowR',14,2)}<small>escalado em</small></span>
   <button class="kfn" data-a="nav" data-v="kescalas"><span class="kfi">${ic('calendar',16)}</span><span><b>Escala</b><small>quem serve e quando</small></span></button>
  </div></section>
 <section class="card kpis4 rise" style="--d:2">
  <div class="k4"><span class="kl">Salas ativas</span><span class="kv">${act.length}</span><span class="kd">de ${SALAS.length} cadastradas</span></div>
  <div class="k4"><span class="kl">Turmas sem sala</span><span class="kv" style="${warn(noRoom)}">${noRoom}</span><span class="kd">${noRoom?'ainda sem espaço':'todas alocadas'}</span></div>
  <div class="k4"><span class="kl">Salas sem time</span><span class="kv" style="${warn(noTeam)}">${noTeam}</span><span class="kd">${noTeam?'sem voluntários vinculados':'todas com time'}</span></div>
  <div class="k4"><span class="kl">Times sem voluntário</span><span class="kv" style="${warn(emptyT)}">${emptyT}</span><span class="kd">de ${T.length} times</span></div>
 </section>
 <section class="card kpis4 k3 rise" style="--d:3">
  <div class="k4"><span class="kl">Voluntários hoje</span><span class="kv">${here}<small class="kof"> de ${sched}</small></span><span class="kd">presentes × escalados</span></div>
  <div class="k4"><span class="kl">Escalas a aprovar</span><span class="kv" style="${warn(toApprove)}">${toApprove}</span><span class="kd"><button class="lnk inl" data-a="nav" data-v="kescalas">Ver as escalas</button></span></div>
  <div class="k4"><span class="kl">Aula da semana</span><span class="kv">${withLesson}<small class="kof"> de ${TURMAS.length} turmas</small></span><span class="kd"><button class="lnk inl" data-a="nav" data-v="kplano">Ver o planejamento</button></span></div>
 </section>
 <section class="card pc rise" style="--d:4;margin-top:6px"><div class="sh"><h2>Cultos Kids</h2><span class="who">eventos da Agenda que reservam as salas</span><button class="btn pri sm" data-a="kCultoNew">${ic('plus',14,2.2)}Novo culto Kids</button></div>
  ${kCultoSeries().map(c=>{const e=c.first,n=c.next;return `<div class="ct1"><span class="cti">${ic('calendar',16)}</span><span class="ctt"><b>${esc(e.t)}</b><small>${esc(e.recTxt||'Uma vez')} · ${esc(e.time)}${e.end?'–'+hm(e.end):''} · ${(e.rooms||[]).length} salas reservadas · próximo ${wd(n.d)}, ${fmtD(n.d)}</small></span><button class="btn sec sm" data-a="evOpen" data-v="${n.id}">Abrir na Agenda</button></div>`;}).join('')||'<p class="who" style="margin:0">Nenhum Culto Kids ainda. Crie o primeiro: ele reserva as salas e abre o planejamento.</p>'}</section>
 <div class="sh rise" style="--d:4;margin-top:16px"><h2>Salas e escalas</h2><span class="who">quem serve em cada sala, pela escala do time</span></div>
 <div class="kroom rise" style="--d:4">${act.map((s,i)=>{const t=tById(s.turma),tm=kTeamOf(s),nx=kNextEsc(tm),cx=kNextCultoOf(s);return `<article class="card kr">
  <div class="kr1"><div><b>${esc(s.n)}</b><span>${t?esc(t.n)+' · '+faixa(t):'Sem turma'}</span></div><span class="krn"><b>${s.cap}</b> crianças</span></div>
  <p class="who" style="margin:0">${cx?`Reservada no ${esc(cx.t.split(' · ')[0])} · ${wd(cx.d)}, ${fmtD(cx.d)} · ${esc(cx.time)}`:'Não está reservada em nenhum Culto Kids'}</p>
  ${tm?`<div class="kr3"><span class="cresp">${ic('hand',14)}${esc(tm.n)}</span><span class="soft">${tm.ppl.length} ${tm.ppl.length===1?'pessoa':'pessoas'}</span></div>
  ${nx?`<button class="lnk" style="text-align:left" data-a="mnEscGo" data-v="${nx.x.id}">${wd(nx.e.d)}, ${fmtD(nx.e.d)} · ${esc(nx.b.label)} · ${nx.b.members.length} ${nx.b.members.length===1?'escalado':'escalados'} · ${K_ESC_ST[nx.x.st]||nx.x.st}</button>
  <div class="kmem">${nx.b.members.slice(0,5).map((m,j)=>`<span class="kmc"><span class="av" style="background:var(--tone-${kTone(i+j)});color:var(--tone-${kTone(i+j)}-ink)">${initials(m.n)}</span>${esc(m.n.split(' ')[0])}</span>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhuma escala futura usa este time.</p>'}`
  :`<button class="kwarn" data-a="nav" data-v="ksalas">${ic('alert',13,2)}Sala sem time vinculado</button>`}
 </article>`;}).join('')}</div>
 <section class="card pc rise" style="--d:5;margin-top:16px"><div class="sh"><h2>Aula da semana por turma</h2><span class="who">do planejamento do trimestre</span></div>
  ${TURMAS.slice().sort((a,b)=>a.min-b.min).map(t=>{const l=kAulaDe(t);return `<div class="ct1"><span class="cti">${ic('book',16)}</span><span class="ctt"><b>${esc(t.n)} <small class="soft">· ${faixa(t)}</small></b><small>${l.length?l.map(a=>esc(a.t)+' ('+a.kind+')').join(' · '):'Sem aula vinculada esta semana'}</small></span><button class="btn sec sm" data-a="kAulas" data-v="${t.id}">Aulas</button></div>`;}).join('')}</section>`;
}

function kSalas(){
 const act=SALAS.filter(s=>s.active),cap=act.reduce((a,s)=>a+s.cap,0),noT=SALAS.filter(s=>!s.turma).length,noTeam=SALAS.filter(s=>!kTeamOf(s)).length;
 return `${kHead('Salas','Espaços físicos do Ministério Infantil',`${rpBtn('kids','salas')}<button class="btn pri" data-a="kSala">${ic('plus',15,2.2)}Nova sala</button>`)}
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Salas ativas</span><span class="kv">${act.length}</span><span class="kd">${SALAS.length-act.length} inativa${SALAS.length-act.length===1?'':'s'}</span></div>
  <div class="k4"><span class="kl">Limite total</span><span class="kv">${cap}</span><span class="kd">crianças por culto</span></div>
  <div class="k4"><span class="kl">Sem turma</span><span class="kv">${noT}</span><span class="kd">sem faixa etária definida</span></div>
  <div class="k4"><span class="kl">Sem time</span><span class="kv" style="${noTeam?'color:var(--st-sol)':''}">${noTeam}</span><span class="kd">sem voluntários escalados</span></div>
 </section>
 <section class="card mtab rise" style="--d:2">
  <div class="trow ks thead"><span>Sala</span><span>Turma</span><span>Limite de crianças</span><span>Time</span><span>Status</span><span></span></div>
  ${SALAS.map((s,i)=>{const t=tById(s.turma),tm=kTeamOf(s),nx=kNextEsc(tm);return `<div class="trow ks ${s.active?'':'off'}">
   <span class="tn"><span class="htile" style="--s:36px;background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${ic('door',17)}</span><span class="hn"><b>${esc(s.n)}</b>${kEsp(s.esp)&&kEsp(s.esp).act?'':' <em class="tag warn">Espaço indisponível</em>'}<span>${t?faixa(t):'Sem faixa etária'}</span></span></span>
   <span class="kt">${t?esc(t.n):'<span class="soft">—</span>'}</span>
   <span class="kc"><span class="kcap">${Array.from({length:Math.ceil(s.cap/5)},()=>'<i></i>').join('')}</span><b>${s.cap}</b></span>
   <span class="ktm">${tm?`${esc(tm.n)}<small class="soft" style="display:block">${nx?`Próxima escala: ${fmtD(nx.e.d)} · ${K_ESC_ST[nx.x.st]||nx.x.st}`:'Sem escala futura'}</small>`:'<em class="tag warn">Sem time</em>'}</span>
   <span class="ts">${s.active?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Ativa</span>':'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Inativa</span>'}</span>
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="kMenu" data-v="${s.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kPop-${s.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="kSala" data-v="${s.id}">${ic('pen',16)}Editar sala</button><button class="pi" data-a="kSalaTog" data-v="${s.id}">${ic(s.active?'pause':'check',16)}${s.active?'Desativar':'Reativar'}</button><hr><button class="pi danger" data-a="kSalaDel" data-v="${s.id}">${ic('x',16)}Excluir sala</button></div></div></span></div>`;}).join('')}
  <div class="tfoot"><span>${SALAS.length} salas</span></div></section>`;
}

/* Times e Escalas do Kids são os do Ministério Kids: mesma tela, mesmos diálogos (só as ações abrem o ministério certo) */
function kTimes(){
const m=kidsMin(),T=kTeams(),vol=new Set(T.flatMap(t=>t.ppl)).size,empty=T.filter(t=>!t.ppl.length).length;
 return `${kHead('Times','Os times do Ministério Kids',`<button class="btn sec" data-a="kGoMin">${ic('users',15)}Abrir no ministério</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Times</span><span class="kv">${T.length}</span><span class="kd">${SALAS.filter(s=>kTeamOf(s)).length} salas atendidas</span></div>
  <div class="k4"><span class="kl">Voluntários</span><span class="kv">${vol}</span><span class="kd">servindo nos times</span></div>
  <div class="k4"><span class="kl">Times sem membro</span><span class="kv" style="${empty?'color:var(--st-sol)':''}">${empty}</span><span class="kd">${empty?'precisam de voluntários':'todos com gente'}</span></div>
 </section>
 <p class="who rise" style="--d:2;margin:2px 4px 12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">${ic('swap',13,2)}É a mesma lista de Comunidade › Ministérios › Kids, com o mesmo cadastro. Quem serve em cada data é definido na <button class="lnk inl" data-a="nav" data-v="kescalas">escala</button>.</p>
 <div class="rise" style="--d:3">${mnTimes(m).replace(/data-a="mnAddTeam"/g,'data-a="kTeamNew"').replace(/data-a="mnTeamEdit"/g,'data-a="kTeamEdit"').replace(/data-a="mnDelTeam"/g,'data-a="kTeamDel"')}</div>`;
}
function kPlano(){
 kSeed();
 if(!K_SUNDAYS.length)return `${kHead('Planejamento','O planejamento acompanha os Cultos Kids',`<button class="btn pri" data-a="kCultoNew">${ic('plus',15,2.2)}Novo culto Kids</button>`)}<section class="card pc rise" style="--d:1"><div class="mempty"><p>Nenhum Culto Kids ainda.</p><span>O Culto Kids é um evento da Agenda: você escolhe as salas, a programação e ele já reserva tudo. Depois é só planejar a aula de cada turma.</span><button class="btn pri" data-a="kCultoNew">${ic('plus',15,2.2)}Novo culto Kids</button></div></section>`;
 const T=TURMAS.slice().sort((a,b)=>a.min-b.min),cur=kSundayOf(NOWD),ci=Math.max(0,K_SUNDAYS.indexOf(cur)),month=S.kpMode==='month',ym=S.kpMonth||cur.slice(0,7),i0=S.kpo==null?ci:S.kpo;
 const cols=month?K_SUNDAYS.filter(d=>d.slice(0,7)===ym):K_SUNDAYS.slice(i0,i0+4),isCur=month?ym===cur.slice(0,7):i0===ci;
 const first=K_SUNDAYS[0].slice(0,7),last=K_SUNDAYS[K_SUNDAYS.length-1].slice(0,7),atStart=month?ym<=first:i0<=0,atEnd=month?ym>=last:i0+4>=K_SUNDAYS.length;
 const next4=K_SUNDAYS.filter(d=>d>=cur).slice(0,4),pend=[];let noEsc=0,defined=0;
 T.forEach(t=>{const tm=kTeamOfTurma(t);next4.forEach(d=>{if(!kDayContent(t,d).has)pend.push({t,d});if(tm)kOcc(d).forEach(e=>{if(!kEscBlock(tm,e))noEsc++;});});defined+=K_SUNDAYS.filter(d=>kAulaOn(t,d)).length;});
 const cell=(t,iso)=>{const tm=kTeamOfTurma(t),c=kDayContent(t,iso),occ=kOcc(iso),past=iso<cur,rm=kRoomOf(t);
  const main=c.plan?`<span class="kpi">${ic('book',15)}</span><span class="kpx"><b>${esc(c.plan.t)}</b><small>${esc(c.plan.kind)}</small></span>`:c.esc.length?`<span class="kpi alt">${ic('layers',15)}</span><span class="kpx"><b>${esc(c.esc[0].t)}</b><small>Conteúdo na escala${c.esc.length>1?' · +'+(c.esc.length-1):''}</small></span>`:`<span class="kpadd">${ic('plus',13,2.2)}Escolher aula</span>`;
  const chips=!occ.length?'<span class="soft">Sem culto no calendário</span>':!tm?'<span class="soft">Sala sem time</span>':occ.map(e=>{if(rm&&!(e.rooms||[]).includes(rm.esp))return `<span class="kpq off" title="${esc(rm.n)} não está reservada neste culto"><i class="escd empty"></i>${K_PER(e)} · sem sala</span>`;const z=kEscBlock(tm,e),per=K_PER(e);return z?`<button class="kpq" data-a="mnEscGo" data-v="${z.x.id}" title="${per} · ${z.b.members.length} ${z.b.members.length===1?'escalado':'escalados'} · ${K_ESC_ST[z.x.st]||z.x.st}"><i class="escd ${kQuad(z.x,z.b)}"></i>${per} · ${z.b.members.length}</button>`:`<span class="kpq off" title="${per} · sem escala"><i class="escd ${past?'past':'empty'}"></i>${per} · ${past?'—':'sem escala'}</span>`;}).join('');
  return `<div class="kpc ${iso===cur?'now':''}"><button class="kpa ${c.has?'':'empty'}" data-a="kPlanCell" data-v="${t.id}|${iso}" title="Escolher ou trocar a aula deste dia">${main}</button>
  <div class="kpe">${chips}</div>${!c.has&&!past?`<em class="tag warn kpw">${ic('alert',11,2.4)}Sem conteúdo vinculado</em>`:''}</div>`;};
 const label=month?monthName(ym):fmtD(cols[0])+' a '+fmtD(cols[cols.length-1]);
 return `${kHead('Planejamento','Os Cultos Kids, com a escala e o conteúdo de cada turma',`<button class="btn sec" data-a="nav" data-v="kescalas">${ic('calendar',15)}Ver as escalas</button><button class="btn pri" data-a="kCultoNew">${ic('plus',15,2.2)}Novo culto Kids</button>`)}
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Próximas datas</span><span class="kv">${next4.length}</span><span class="kd">${next4.length?'de '+fmtD(next4[0])+' a '+fmtD(next4[next4.length-1]):'nenhum'}</span></div>
  <div class="k4"><span class="kl">Dias sem conteúdo</span><span class="kv" style="${pend.length?'color:var(--st-sol)':''}">${pend.length}</span><span class="kd">turma × data, nas próximas 4</span></div>
  <div class="k4"><span class="kl">Cultos sem escala</span><span class="kv" style="${noEsc?'color:var(--st-sol)':''}">${noEsc}</span><span class="kd">turma × culto, nas próximas 4 datas</span></div>
  <div class="k4"><span class="kl">Aulas definidas</span><span class="kv">${defined}</span><span class="kd">no trimestre, todas as turmas</span></div>
 </section>
 ${pend.length?`<section class="card pc rise" style="--d:2"><div class="sh"><h2>Próximos dias sem conteúdo</h2><span class="who">${pend.length} para resolver</span></div>${pend.slice(0,6).map(p=>`<div class="ct1"><span class="cti">${ic('calendar',16)}</span><span class="ctt"><b>${esc(p.t.n)} <small class="soft">· ${faixa(p.t)}</small></b><small>${wd(p.d)} ${fmtD(p.d)}${p.d===cur?' · próxima data':''}</small></span><button class="btn sec sm" data-a="kPlanCell" data-v="${p.t.id}|${p.d}">Escolher aula</button></div>`).join('')}</section>`:''}
 <div class="fi-mbar fd-tb rise" style="--d:2;margin-top:16px"><div class="mp"><button class="ibtn" data-a="kPlanOff" data-v="-1" aria-label="${month?'Mês anterior':'Datas anteriores'}" ${atStart?'disabled':''}>${ic('chevL',16,2)}</button>
  <button type="button" class="mp-btn fd-pick" data-a="kPlanToday" title="Voltar para o período atual">${ic('calendar',16)}<b>${label}</b>${isCur?`<em>${month?'mês atual':'a partir de hoje'}</em>`:''}</button>
  <button class="ibtn" data-a="kPlanOff" data-v="1" aria-label="${month?'Próximo mês':'Próximas datas'}" ${atEnd?'disabled':''}>${ic('chevR',16,2)}</button></div>
  <div class="segc" role="group" aria-label="Período"><button data-a="kPlanMode" data-v="weeks" aria-pressed="${!month}">4 datas</button><button data-a="kPlanMode" data-v="month" aria-pressed="${month}">Por mês</button></div>
  ${isCur?'':`<button class="lnk" data-a="kPlanToday">Voltar para o período atual</button>`}</div>
 <p class="who rise" style="--d:2;margin:0 4px 12px">${ic('swap',13,2)} Conteúdo é do dia: vale para a manhã e para a noite. Cada data é um Culto Kids da Agenda: o quadradinho mostra a escala de cada culto, e "sem sala" avisa quando a sala da turma não foi reservada nele. Clique numa célula para escolher a aula.</p>
 <section class="card kpg rise" style="--d:3"><div class="kpl" style="grid-template-columns:minmax(210px,240px) repeat(${cols.length},minmax(180px,1fr))">
  <div class="kph"></div>${cols.map(d=>`<div class="kph ${d===cur?'now':''}"><b>${d.slice(8)}</b><span>${wd(d)} · ${MONTHS[+d.slice(5,7)-1].slice(0,3)}</span>${d===cur?'<em>próxima</em>':''}</div>`).join('')}
  ${T.map((t,i)=>{const s=SALAS.find(x=>x.turma===t.id),tm=kTeamOfTurma(t),n=K_SUNDAYS.filter(d=>kAulaOn(t,d)).length;return `<div class="kpt"><div class="kpt1"><span class="htile" style="--s:34px;background:var(--tone-${kTone(i)});color:var(--tone-${kTone(i)}-ink)">${ic('users',16)}</span><span class="dkt"><b>${esc(t.n)}</b><small>${faixa(t)}</small></span></div>
   <small>${s?esc(s.n):'Sem sala'}${tm?' · '+esc(tm.n):''}</small><span class="kpbar" title="${n} de ${K_SUNDAYS.length} dias com aula"><i style="width:${Math.round(n/K_SUNDAYS.length*100)}%"></i></span><small style="${n<K_SUNDAYS.length?'color:var(--st-sol)':''}">${n} de ${K_SUNDAYS.length} dias com aula</small><button class="lnk" style="text-align:left" data-a="kPlanFill" data-v="${t.id}">Preencher a partir de uma série</button></div>${cols.map(d=>cell(t,d)).join('')}`;}).join('')}
 </div></section>`;
}
function kEscalas(){
 const m=kidsMin();
 return `${kHead('Escalas','Quem serve e quando, no Ministério Kids',`<button class="btn sec" data-a="kGoMin">${ic('users',15)}Abrir no ministério</button>`)}
 <p class="who rise" style="--d:1;margin:2px 4px 12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">${ic('swap',13,2)}São as mesmas escalas da aba Escalas do Ministério Kids. A escala diz quem serve, em qual data e em qual time; a aula prevista vem do <button class="lnk inl" data-a="nav" data-v="kplano">planejamento</button>.</p>
 <div class="rise" style="--d:2">${mnEsc(m).replace(/data-a="mnEscF"/g,'data-a="kEscF"')}</div>`;
}

function kTurmas(){
 const linked=TURMAS.filter(t=>SALAS.some(s=>s.turma===t.id)).length,MAX=12;
 return `${kHead('Turmas','Faixas etárias do Ministério Infantil',`<button class="btn pri" data-a="kTurma">${ic('plus',15,2.2)}Nova turma</button>`)}
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Turmas</span><span class="kv">${TURMAS.length}</span><span class="kd">de ${Math.min(...TURMAS.map(t=>t.min))} a ${Math.max(...TURMAS.map(t=>t.max))} anos</span></div>
  <div class="k4"><span class="kl">Com sala</span><span class="kv">${linked}</span><span class="kd">alocadas em uma sala</span></div>
  <div class="k4"><span class="kl">Sem sala</span><span class="kv" style="${TURMAS.length-linked?'color:var(--st-sol)':''}">${TURMAS.length-linked}</span><span class="kd">ainda sem espaço</span></div>
 </section>
 <p class="who rise" style="--d:2;margin:2px 4px">Turma é só a faixa etária. As aulas do trimestre são uma Série de Conteúdo, escolhida para a turma em Planejamento.</p>
 <section class="card pc rise" style="--d:3"><div class="sh"><h2>Faixas etárias</h2><span class="who">0 a ${MAX} anos</span></div>
  <div class="ages"><div class="agax">${Array.from({length:MAX+1},(_,i)=>`<span style="left:${(i+.5)/(MAX+1)*100}%">${i}</span>`).join('')}</div>
  ${TURMAS.slice().sort((a,b)=>a.min-b.min).map((t,i)=>{const rooms=SALAS.filter(s=>s.turma===t.id);return `<div class="agr"><div class="agn"><b>${esc(t.n)}</b><span>${rooms.length?rooms.map(r=>esc(r.n)).join(', '):'<em class="tag warn">Sem sala</em>'}</span></div>
   <div class="agt"><span class="agb" style="left:${t.min/(MAX+1)*100}%;width:${(t.max-t.min+1)/(MAX+1)*100}%;background:var(--tone-${t.cor||kTone(i)});color:var(--tone-${t.cor||kTone(i)}-ink)">${faixa(t)}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="kTuMenu" data-v="${t.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kTuPop-${t.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="kAulas" data-v="${t.id}">${ic('book',16)}Aulas da turma</button><button class="pi" data-a="kTurma" data-v="${t.id}">${ic('pen',16)}Editar turma</button><hr><button class="pi danger" data-a="kTurmaDel" data-v="${t.id}">${ic('x',16)}Excluir turma</button></div></div></div>`;}).join('')}</div>
 </section>`;
}

const pop=id=>{const p=$('#'+id);closePops(p);p.classList.toggle('open');};
const KA={
 kAulas:v=>{closePops();const t=tById(v),l=K_SUNDAYS.filter(d=>kAulaOn(t,d));
  openDlg(`${dlgHead('Aulas · '+esc(t.n),faixa(t))}
   ${l.map(d=>{const a=kAulaOn(t,d);return `<div class="ct1"><span class="cti">${ic('book',16)}</span><span class="ctt"><b>${esc(a.t)}</b><small>${esc(a.kind)} · ${wd(d)} ${fmtD(d)}</small></span></div>`;}).join('')||'<p class="who" style="margin:0">Nenhuma aula definida para esta turma.</p>'}
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn sec" data-a="kPlanFill" data-v="${t.id}">Preencher a partir de uma série</button><button class="btn pri" data-a="nav" data-v="kplano">Abrir o planejamento</button></div>`,'sm');},
 kCultoNew:()=>{closePops();evForm('culto',{type:'Culto',t:'Culto Kids · tarde',min:kidsMin().n,rooms:SALAS.filter(s=>s.active&&s.esp).map(s=>s.esp),f:'15:00',to:'17:00',back:'kplano'});},
 kPlanOff:v=>{const cur=kSundayOf(NOWD);if(S.kpMode==='month'){const ms=[...new Set(K_SUNDAYS.map(d=>d.slice(0,7)))],i=ms.indexOf(S.kpMonth||cur.slice(0,7));S.kpMonth=ms[Math.max(0,Math.min(ms.length-1,i+ +v))];}else{const c=S.kpo==null?Math.max(0,K_SUNDAYS.indexOf(cur)):S.kpo;S.kpo=Math.max(0,Math.min(K_SUNDAYS.length-4,c+4*(+v)));}render();},
 kPlanMode:v=>{S.kpMode=v;S.kpo=null;S.kpMonth=null;render();},
 kPlanToday:()=>{S.kpo=null;S.kpMonth=null;render();},
 kPlanCell:v=>{const [tid,iso]=v.split('|'),t=tById(tid),cur=kAulaOn(t,iso),dc=kDayContent(t,iso);
  /* mesmo seletor de "Adicionar à série" (tipo, busca e lista), mas escolhe um item só */
  const TY=[['Pregação',PREGS,'pregacoes'],['Vídeo',NX_VIDEOS,'videos'],['Música',SONGS,'musicas'],['Material',MATS,'material']],typeOf=id=>{const x=TY.find(y=>y[1].some(o=>o.id===id));return x?x[0]:null;},MAX=40;
  let type=(cur&&typeOf(cur.id))||TY[0][0],sel=cur?cur.id:'',q='';
  openDlg(dlgHead('Aula de '+wd(iso)+' '+fmtD(iso)+' · '+esc(t.n),'O conteúdo é do dia: vale para a manhã e para a noite. Escolha o tipo e depois a aula.')
   +(dc.esc.length?'<div class="fld" style="margin-bottom:10px"><span class="fl">Já está na escala</span>'+dc.esc.map(c=>'<div class="ct1"><span class="cti">'+ic('book',16)+'</span><span class="ctt"><b>'+esc(c.t)+'</b><small>Conteúdo do bloco · '+c.per+'</small></span><button type="button" class="lnk" data-a="mnEscGo" data-v="'+c.x.id+'">Abrir escala</button></div>').join('')+'</div>':'')
   +'<div class="mcp"><div class="mcp-ty">'+TY.map(y=>'<button type="button" data-ty="'+y[0]+'" class="'+(y[0]===type?'on':'')+'"><span class="mc-i t-'+y[2]+'">'+ic(NX_TYPE_IC[y[0]],15,1.8)+'</span>'+y[0]+'<small id="kpN-'+y[0]+'"></small></button>').join('')+'</div>'
   +'<div class="mcp-r"><label class="sbox">'+ic('search',16)+'<input id="kpQ" placeholder="Buscar na biblioteca" autocomplete="off"></label><div class="mtf-list" id="kpL" style="max-height:300px"></div></div></div>'
   +'<label class="tog" style="margin-top:12px"><input type="checkbox" id="kpAll"><span class="sw"></span><span><b>Mesma aula para todas as turmas</b><small>Neste dia, em todas as turmas</small></span></label>'
   +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn sec" data-a="kMatNew" data-v="'+t.id+'|'+iso+'">Enviar material novo</button>'+(cur?'<button type="button" class="btn sec" id="kpDel">Retirar aula</button>':'')+'<button type="button" class="btn pri" id="kpOk" disabled>Definir aula</button></div>','lg');
  const cls=TY.reduce((m,y)=>{m[y[0]]=y[2];return m;},{});
  const paint=()=>{const ql=norm(q),all=TY.find(y=>y[0]===type)[1].filter(o=>{const x=nxItemInfo(type,o);return !ql||norm(x.t+' '+x.sub).includes(ql);}),l=all.slice(0,MAX);
   $('#kpL').innerHTML=l.map(o=>{const x=nxItemInfo(type,o),on=sel===o.id;return '<button type="button" class="mtf-p '+(on?'on':'')+'" data-k="'+o.id+'"><span class="mc-i t-'+cls[type]+'">'+ic(NX_TYPE_IC[type],14,1.8)+'</span><span class="dkt"><b>'+esc(x.t)+'</b><span>'+esc([x.sub.replace(/^[^·]+(· )?/,''),x.dur?nxMin(x.dur):''].filter(Boolean).join(' · ')||type)+(cur&&cur.id===o.id?' · aula atual':'')+'</span></span><i class="mtf-ck">'+ic('check',12,2.6)+'</i></button>';}).join('')
    +(all.length>MAX?'<p class="who" style="padding:10px">Mostrando '+MAX+' de '+all.length+'. Use a busca para achar o resto.</p>':'')||'<p class="who" style="padding:10px">Nada encontrado.</p>';
   TY.forEach(y=>{$('#kpN-'+y[0]).textContent=sel&&y[1].some(o=>o.id===sel)?'1':'';});
   const ok=$('#kpOk');ok.disabled=!sel;};
  const D=$('.mcp');D.addEventListener('click',e=>{const x=e.target.closest('[data-ty],[data-k]');if(!x)return;
   if(x.dataset.ty){type=x.dataset.ty;D.querySelectorAll('[data-ty]').forEach(y=>y.classList.toggle('on',y===x));paint();}
   if(x.dataset.k){sel=x.dataset.k;paint();}});
  $('#kpQ').addEventListener('input',e=>{q=e.target.value;paint();});paint();
  const turmas=()=>$('#kpAll').checked?TURMAS:[t];
  $('#kpOk').onclick=()=>{if(!sel)return;const ts=turmas();ts.forEach(x=>{kPlanOf(x).aulas[iso]=kItemRef(sel);});closeDlg();render();toast(ts.length>1?'Aula definida em todas as turmas':'Aula definida');};
  const dl=$('#kpDel');if(dl)dl.onclick=()=>{const ts=turmas();ts.forEach(x=>{delete kPlanOf(x).aulas[iso];});closeDlg();render();toast('Aula retirada deste dia');};},
 kMatNew:v=>{const [tid,iso]=v.split('|'),t=tById(tid);
  openDlg(`${dlgHead('Enviar material novo','Cadastra em Conteúdo › Material de apoio, visível ao Kids, e já liga a '+esc(t.n)+' em '+wd(iso)+' '+fmtD(iso)+'.')}<form class="fgrid one" id="kmatF" novalidate>
   <label class="fld"><span class="fl">Título</span><input name="t" placeholder="Ex.: Aula 4 · Davi e Golias" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Arquivo <small>opcional</small></span><input name="f" type="file"></label>
   <label class="fld"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="d" rows="2"></textarea></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Enviar e ligar</button></div></form>`,'sm');
  const f=$('#kmatF');f.addEventListener('submit',e=>{e.preventDefault();const ti=f.elements.t.value.trim();if(!ti){const fl=f.elements.t.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Dê um título ao material';return;}
   const fl=f.elements.f.files&&f.elements.f.files[0],m=MTR(ti,f.elements.d.value.trim(),NOWD,'outro','',[fl?fl.name:'Material.pdf'],'Kids');MATS.unshift(m);kPlanOf(t).aulas[iso]=kItemRef(m.id);closeDlg();render();toast('Material cadastrado em Conteúdo e ligado a este dia');});},
 kPlanFill:v=>{closePops();const t=tById(v),p=kPlanOf(t);
  openDlg(`${dlgHead('Preencher a partir de uma série',esc(t.n))}<form class="fgrid one" id="kfillF" novalidate>
   <label class="fld"><span class="fl">Série</span><span class="selw"><select name="serie">${NX_SERIES.map(s=>`<option value="${s.id}" ${s.id===p.serie?'selected':''}>${esc(s.n)} · ${s.items.length} ${s.items.length===1?'item':'itens'}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">A partir de</span><span class="selw"><select name="start">${K_SUNDAYS.map(d=>`<option value="${d}">${wd(d)} ${fmtD(d)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Os itens vão para as datas vazias, em ordem. O que já está definido não muda, e cada domingo pode ser trocado depois.</span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Preencher</button></div></form>`,'sm');
  $('#kfillF').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target),n=kFill(t,fd.get('serie'),fd.get('start'));closeDlg();render();toast(n?`${n} ${n===1?'data preenchida':'datas preenchidas'}`:'Nenhuma data vazia para preencher');});},
 kGoMin:()=>{const m=MINIS.find(x=>x.n==='Kids');S.active='ministerios';S.mini=m?m.id:null;S.mtab='times';render();window.scrollTo({top:0});},
 kMenu:v=>pop('kPop-'+v),kTuMenu:v=>pop('kTuPop-'+v),
 kSala:v=>{closePops();const s=v?sById(v):null;openDlg(`${dlgHead(s?'Editar sala':'Nova sala')}<form class="fgrid" id="ksF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Espaço</span>${s?`<input value="${esc(s.n)}" disabled>`:`<span class="selw"><select name="esp"><option value="">Escolha um espaço…</option>${ESPS.filter(e=>e.act&&!SALAS.some(x=>x.esp===e.id)).map(e=>`<option value="${e.id}">${esc(e.n)}</option>`).join('')}</select>${ic('updown',14)}</span>`}<span class="hint">A sala é um Espaço de Espaços; o nome vem de lá.</span><span class="err"></span></label>
   <label class="fld"><span class="fl">Limite de crianças</span><input name="cap" type="number" min="1" inputmode="numeric" value="${s?s.cap:''}" placeholder="Nº de crianças"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Turma <small>opcional</small></span><span class="selw"><select name="turma"><option value="">Nenhuma</option>${TURMAS.map(t=>`<option value="${t.id}" ${s&&s.turma===t.id?'selected':''}>${esc(t.n)} · ${faixa(t)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Define a faixa etária da sala.</span></label>
   <label class="fld wide"><span class="fl">Time <small>opcional</small></span><span class="selw"><select name="team"><option value="">Nenhum</option>${kTeams().map((t,i)=>`<option value="${i}" ${s&&kTeamOf(s)===t?'selected':''}>${esc(t.n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Time do Ministério Kids. Quem serve em cada data é definido na escala.</span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${s?'Salvar':'Criar sala'}</button></div></form>`);
  const f=$('#ksF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;if(ok)i.focus();ok=false;};
   const esp=s?s.esp:fd.get('esp'),n=(kEsp(esp)||{}).n,cap=+fd.get('cap');if(!esp){const fl=f.querySelector('[name=esp]').closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escolha o espaço';ok=false;}if(!cap||cap<1)bad('cap','Informe o limite de crianças');if(!ok)return;
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{if(s)Object.assign(s,{cap,turma:fd.get('turma'),team:kTeamPick(fd.get('team'))});else SALAS.push(kSalaMk({id:kid('s'),esp,cap,turma:fd.get('turma'),team:kTeamPick(fd.get('team')),active:true,pres:0,mon:'—'}));closeDlg();render();toast(s?`${n} atualizada`:`${n} criada`);},700);});},
 kSalaTog:v=>{closePops();const s=sById(v);s.active=!s.active;render();toast(s.active?`${s.n} reativada`:`${s.n} desativada`);},
 kSalaDel:v=>{closePops();const s=sById(v);confirmDel({title:`Excluir a sala ${s.n}?`,body:'Ela deixa de aparecer nos seletores. As crianças e o histórico de frequência não são apagados.',label:'Excluir sala',onConfirm:()=>{const i=SALAS.indexOf(s);SALAS.splice(i,1);render();toast(`${s.n} excluída`,()=>{SALAS.splice(i,0,s);render();});}});},
 kTeamNew:()=>mnTeamForm(null,kidsMin().id),
 kTeamEdit:v=>{closePops();mnTeamForm(+v,kidsMin().id);},
 kTeamDel:v=>{closePops();const m=kidsMin(),t=m.teams[+v],rooms=SALAS.filter(s=>s.team===t);confirmDel({title:`Excluir o time ${t.n}?`,body:`${rooms.length?`${rooms.map(r=>r.n).join(', ')} fica${rooms.length>1?'m':''} sem time. `:''}As ${t.ppl.length} pessoas continuam no ministério, mas saem das escalas deste time.`,label:'Excluir time',onConfirm:()=>{const i=m.teams.indexOf(t);m.teams.splice(i,1);rooms.forEach(r=>{r.team='';});render();toast('Time excluído',()=>{m.teams.splice(i,0,t);rooms.forEach(r=>{r.team=t;});render();});}});},
 kEscF:v=>{S.mnesf=v;render();},
 kTurma:v=>{closePops();const t=v?tById(v):null;openDlg(`${dlgHead(t?'Editar turma':'Nova turma')}<form class="fgrid" id="ktF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(t?t.n:'')}" placeholder="Ex.: Pré-adolescentes" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Idade mínima</span><input name="min" type="number" min="0" max="17" inputmode="numeric" value="${t?t.min:''}" placeholder="anos"><span class="err"></span></label>
   <label class="fld"><span class="fl">Idade máxima</span><input name="max" type="number" min="0" max="17" inputmode="numeric" value="${t?t.max:''}" placeholder="anos"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Cor <small>opcional</small></span><span class="selw"><select name="cor"><option value="">Automática</option>${[['ceu','Azul'],['damasco','Laranja'],['lima','Lima'],['rosado','Rosa'],['menta','Verde'],['salvia','Sálvia']].map(c=>`<option value="${c[0]}" ${t&&t.cor===c[0]?'selected':''}>${c[1]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <p class="hint wide" id="ktH" style="margin:-4px 0 0"></p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${t?'Salvar':'Criar turma'}</button></div></form>`,'sm');
  const f=$('#ktF'),hint=()=>{const a=+f.min.value,b=+f.max.value;if(f.min.value===''||f.max.value===''){$('#ktH').textContent='';return;}const ov=TURMAS.filter(x=>x!==t&&a<=x.max&&b>=x.min);$('#ktH').innerHTML=ov.length?`<span style="color:var(--st-sol)">Sobrepõe ${ov.map(x=>x.n+' ('+faixa(x)+')').join(', ')}</span>`:`${a}–${b} anos · sem sobreposição`;};
  f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');hint();});hint();
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);let ok=true;const bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;if(ok)i.focus();ok=false;};
   const n=fd.get('n').trim(),a=fd.get('min'),b=fd.get('max');if(!n)bad('n','Dê um nome à turma');if(a==='')bad('min','Informe');if(b==='')bad('max','Informe');else if(+b<+a)bad('max','Menor que a mínima');if(!ok)return;
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{const cor=fd.get('cor');if(t)Object.assign(t,{n,min:+a,max:+b,cor});else TURMAS.push({id:kid('t'),n,min:+a,max:+b,cor});closeDlg();render();toast(t?`${n} atualizada`:`Turma ${n} criada`);},600);});},
 kTurmaDel:v=>{closePops();const t=tById(v),rooms=SALAS.filter(s=>s.turma===t.id);confirmDel({title:`Excluir a turma ${t.n}?`,body:`${rooms.length?`${rooms.map(r=>r.n).join(', ')} fica${rooms.length>1?'m':''} sem faixa etária definida. `:''}As crianças cadastradas não são afetadas.`,label:'Excluir turma',onConfirm:()=>{const i=TURMAS.indexOf(t);TURMAS.splice(i,1);rooms.forEach(r=>r.turma='');render();toast('Turma excluída',()=>{TURMAS.splice(i,0,t);rooms.forEach(r=>r.turma=t.id);render();});}});},
};

