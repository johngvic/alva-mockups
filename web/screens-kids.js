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
 const T=kTeams(),act=SALAS.filter(s=>s.active),withLesson=TURMAS.filter(t=>kAulaDe(t).length).length;
 const pl=(n,u,us)=>`${n} ${n===1?u:us}`,andJ=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' e '+a[a.length-1],first=n=>n.split(' ')[0];
 const WD=['domingo','segunda','terça','quarta','quinta','sexta','sábado'],dd=iso=>{const [y,m,d]=iso.split('-');return `${WD[new Date(iso+'T12:00').getDay()]}, ${d} ${MONTHS[+m-1].slice(0,3).toLowerCase()}`;};
 const cultos=kCultoSeries(),nextD=cultos.map(c=>c.next.d).filter(d=>d>=NOWD).sort()[0],nextT=cultos.filter(c=>c.next.d===nextD).map(c=>c.next.time);
 const rooms=act.map((s,i)=>{const t=tById(s.turma),tm=kTeamOf(s),nx=kNextEsc(tm);return {s,t,tm,nx,tone:kTone(i),mem:nx?nx.b.members:[]};});
 const allMem=rooms.flatMap(r=>r.mem),conf=allMem.filter(m=>m.st==='confirmado').length;
 const withRoom=TURMAS.filter(t=>SALAS.some(s=>s.turma===t.id)).length,withTeam=act.filter(s=>kTeamOf(s)).length;
 const stat=(v,of,l)=>`<div class="kz-st"><span class="kz-v"><b>${v}</b><small>/${of}</small>${v<of?'<i class="kz-dot" title="Incompleto"></i>':''}</span><span class="kz-l">${l}</span></div>`;
 /* pendências até o próximo culto */
 const todo=[];
 rooms.filter(r=>!r.tm).forEach(r=>todo.push(['warn',`${esc(r.s.n)} está sem time`,`${r.s.cap} crianças`,`<button class="btn sec sm" data-a="nav" data-v="ksalas">Vincular time</button>`]));
 TURMAS.filter(t=>!SALAS.some(s=>s.turma===t.id)).forEach(t=>todo.push(['warn',`${esc(t.n)} está sem sala`,faixa(t),`<button class="btn sec sm" data-a="nav" data-v="kturmas">Alocar sala</button>`]));
 const pend=rooms.filter(r=>r.nx&&r.nx.x.st!=='aprovada');
 if(pend.length)todo.push(['',`${pl(pend.length,'escala aguardando aceite','escalas aguardando aceite')}`,andJ(pend.map(r=>esc(r.t?r.t.n:r.s.n))),`<button class="btn sec sm" data-a="nav" data-v="kescalas">Aprovar</button>`]);
 rooms.forEach(r=>r.mem.filter(m=>m.st!=='confirmado').forEach(m=>{const k=r.s.id+'|'+m.n,sent=(S.kRem||[]).includes(k);todo.push(['',`${esc(first(m.n))} ainda não confirmou`,esc(r.t?r.t.n:r.s.n),`<button class="btn sec sm" data-a="kRemind" data-v="${esc(k)}" ${sent?'disabled':''}>${sent?ic('check',13,2.4)+'Lembrete enviado':'Lembrar'}</button>`]);}));
 return `<header class="ph rise"><div><p class="eb">Kids</p><h1>Kids</h1><p class="lede">${nextD?`Próximo culto: <b>${dd(nextD)}</b> · ${andJ(nextT)}`:'Nenhum Culto Kids agendado'}</p></div><div class="pact"><button class="btn pri" data-a="kCultoNew">${ic('plus',15,2.2)}Novo culto Kids</button></div></header>
 <section class="card kz-card kz-how rise" style="--d:1"><div class="kz-h"><h2>Como o Kids funciona</h2><span class="who">Crianças e famílias ficam em Membros; o check-in, no Zelo's Kids.</span></div>
  <div class="kz-flow">${[['kturmas','users','menta','Turma','a faixa etária','fica na'],['ksalas','door','damasco','Sala','o espaço e o limite','recebe um'],['ktimes','hand','lima','Time','quem serve ali','entra na'],['kescalas','calendar','ceu','Escala','do Culto Kids','']].map(f=>`<button class="kz-node" data-a="nav" data-v="${f[0]}"><span class="kz-ic" style="background:var(--tone-${f[2]});color:var(--tone-${f[2]}-ink)">${ic(f[1],18,1.9)}</span><span class="kz-nt"><b>${f[3]}</b><small>${f[4]}</small></span></button>${f[5]?`<span class="kz-ar"><small>${f[5]}</small><i></i></span>`:''}`).join('')}</div></section>
 <section class="card kz-card kz-stats rise" style="--d:2">${stat(act.length,SALAS.length,'Salas ativas')}${stat(withRoom,TURMAS.length,'Turmas com sala')}${stat(withTeam,act.length,'Salas com time')}${stat(conf,allMem.length,'Voluntários confirmados')}${stat(withLesson,TURMAS.length,'Aulas planejadas')}</section>
 <section class="card kz-card rise" style="--d:3"><div class="kz-h"><h2>${nextD?'Para resolver até '+WD[new Date(nextD+'T12:00').getDay()]:'Para resolver'}</h2></div>
  ${todo.length?`<div class="kz-list">${todo.map(x=>`<div class="kz-row kz-todo"><i class="kz-dot ${x[0]}"></i><span class="kz-tx"><b>${x[1]}</b> <span>· ${x[2]}</span></span>${x[3]}</div>`).join('')}</div>`:`<p class="kz-ok">${ic('check',15,2.4)}Tudo pronto para o próximo culto.</p>`}</section>
 <section class="card kz-card rise" style="--d:4"><div class="kz-h"><h2>${nextD?'Salas no '+WD[new Date(nextD+'T12:00').getDay()]:'Salas'}</h2><button class="btn sec sm" data-a="nav" data-v="kescalas">Ver escalas</button></div>
  <div class="kz-list">${rooms.map(r=>`<div class="kz-row kz-room"><span class="kz-nm"><i class="kz-sq" style="background:var(--tone-${r.tone}-ink)"></i><span><b>${esc(r.s.n)}</b><small>${r.t?esc(r.t.n)+' · '+faixa(r.t):'Sem turma'} · ${r.s.cap} vagas</small></span></span>
   <span class="kz-who">${r.tm?(r.mem.length?`<span class="stack sm">${r.mem.slice(0,3).map(m=>`<span class="av" title="${esc(m.n)}">${initials(m.n)}</span>`).join('')}</span>${andJ(r.mem.map(m=>esc(first(m.n))))}`:'<span class="soft">Ninguém escalado</span>'):'<span class="soft">Nenhum time vinculado</span>'}</span>
   <span class="kz-end">${r.tm?(r.nx?`<button class="lnk kz-st2" data-a="mnEscGo" data-v="${r.nx.x.id}">${K_ESC_ST[r.nx.x.st]||r.nx.x.st}</button>`:'<span class="soft">Sem escala</span>'):`<button class="btn sec sm" data-a="nav" data-v="ksalas">Vincular time</button>`}</span></div>`).join('')}</div></section>
 <div class="kz-two rise" style="--d:5">
  <section class="card kz-card"><div class="kz-h"><h2>Cultos Kids</h2></div>
   ${cultos.length?`<div class="kz-list">${cultos.map(c=>{const e=c.first,nx=c.next,p=e.t.split(' · '),nm=p[1]?p[1].charAt(0).toUpperCase()+p[1].slice(1):e.t;return `<div class="kz-row"><span class="kz-tx2"><b>${esc(nm)}</b><small>${esc(e.recTxt||'Uma vez')} · ${esc(e.time)}${e.end?'–'+hm(e.end):''} · ${pl((e.rooms||[]).length,'sala','salas')}</small></span><button class="btn sec sm" data-a="evOpen" data-v="${nx.id}">Abrir na Agenda</button></div>`;}).join('')}</div>`:`<p class="who" style="margin:0">Nenhum Culto Kids ainda. Crie o primeiro: ele reserva as salas e abre o planejamento.</p>`}</section>
  <section class="card kz-card"><div class="kz-h"><h2>Aula da semana</h2><button class="btn sec sm" data-a="nav" data-v="kplano">Planejamento</button></div>
   <div class="kz-list">${TURMAS.slice().sort((a,b)=>a.min-b.min).map(t=>{const l=kAulaDe(t),i=act.findIndex(s=>s.turma===t.id),tone=kTone(i<0?0:i);return `<button class="kz-row kz-aula" data-a="kAulas" data-v="${t.id}"><span class="kz-tu"><i class="kz-sq" style="background:var(--tone-${tone}-ink)"></i>${esc(t.n)}</span><b class="kz-at">${l.length?esc(l[0].t):'<span class="soft">Sem aula</span>'}</b><span class="kz-k">${l.length?esc(l[0].kind):''}</span></button>`;}).join('')}</div></section>
 </div>`;
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
 <div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('swap',17,2)}<span><b>É a mesma lista de Comunidade › Ministérios › Kids.</b> <small>Mesmo cadastro. Quem serve em cada data é definido na <button class="lnk inl" data-a="nav" data-v="kescalas">escala</button>.</small></span></div>
 <div class="rise" style="--d:3">${mnTimes(m).replace(/data-a="mnAddTeam"/g,'data-a="kTeamNew"').replace(/data-a="mnTeamEdit"/g,'data-a="kTeamEdit"').replace(/data-a="mnDelTeam"/g,'data-a="kTeamDel"')}</div>`;
}
function kPlano(){
 kSeed();
 if(!K_SUNDAYS.length)return `${kHead('Planejamento','As aulas de cada turma em cada Culto Kids',`<button class="btn pri" data-a="kCultoNew">${ic('plus',15,2.2)}Novo culto Kids</button>`)}<section class="card pc rise" style="--d:1"><div class="mempty"><p>Nenhum Culto Kids ainda.</p><span>O Culto Kids é um evento da Agenda: você escolhe as salas, a programação e ele já reserva tudo. Depois é só planejar a aula de cada turma.</span><button class="btn pri" data-a="kCultoNew">${ic('plus',15,2.2)}Novo culto Kids</button></div></section>`;
 const T=TURMAS.slice().sort((a,b)=>a.min-b.min),cur=kSundayOf(NOWD),ci=Math.max(0,K_SUNDAYS.indexOf(cur)),month=S.kpMode==='month',ym=S.kpMonth||cur.slice(0,7),i0=S.kpo==null?ci:S.kpo;
 const cols=month?K_SUNDAYS.filter(d=>d.slice(0,7)===ym):K_SUNDAYS.slice(i0,i0+4),isCur=month?ym===cur.slice(0,7):i0===ci;
 const first=K_SUNDAYS[0].slice(0,7),last=K_SUNDAYS[K_SUNDAYS.length-1].slice(0,7),atStart=month?ym<=first:i0<=0,atEnd=month?ym>=last:i0+4>=K_SUNDAYS.length;
 const andJ=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' e '+a[a.length-1],dL=iso=>`${wd(iso)}, ${fmtD(iso)}`,tone=t=>kTone(T.indexOf(t));
 const next4=K_SUNDAYS.filter(d=>d>=cur).slice(0,4);
 /* pendências das próximas datas, agrupadas por data */
 const groups=next4.map(d=>{const miss=T.filter(t=>!kDayContent(t,d).has),esc=[];kOcc(d).forEach(e=>{const ts=T.filter(t=>{const tm=kTeamOfTurma(t);return tm&&!kEscBlock(tm,e);});if(ts.length)esc.push({e,ts});});return {d,miss,esc};});
 const nMiss=groups.reduce((a,g)=>a+g.miss.length,0),nEsc=groups.reduce((a,g)=>a+g.esc.reduce((b,x)=>b+x.ts.length,0),0),todo=groups.filter(g=>g.miss.length||g.esc.length);
 const total=T.length*K_SUNDAYS.length,defined=T.reduce((a,t)=>a+K_SUNDAYS.filter(d=>kAulaOn(t,d)).length,0);
 const tab=S.kpTab||(todo.length?'pend':'cal');
 const tile=(t,ico)=>`<span class="kp-ti" style="background:var(--tone-${tone(t)});color:var(--tone-${tone(t)}-ink)">${ic(ico||'users',16)}</span>`;
 /* conteúdo e escala de uma turma num dia */
 const aula=(t,iso)=>{const c=kDayContent(t,iso),past=iso<cur;
  const main=c.plan?`<span class="kpic">${ic('book',15)}</span><span class="kpx"><b>${esc(c.plan.t)}</b><small>${esc(c.plan.kind)}</small></span>`:c.esc.length?`<span class="kpic alt">${ic('layers',15)}</span><span class="kpx"><b>${esc(c.esc[0].t)}</b><small>Conteúdo na escala${c.esc.length>1?' · +'+(c.esc.length-1):''}</small></span>`:`<span class="kpadd">${ic('plus',13,2.2)}Escolher aula</span>`;
  return `<button class="kpa ${c.has?'':'empty'} ${!c.has&&!past?'need':''}" data-a="kPlanCell" data-v="${t.id}|${iso}" title="${c.has?'Trocar a aula deste dia':'Escolher a aula deste dia'}">${main}</button>`;};
 const escala=(t,iso)=>{const tm=kTeamOfTurma(t),occ=kOcc(iso),past=iso<cur,rm=kRoomOf(t);
  if(!occ.length)return '<span class="kp-mut">Sem culto no calendário</span>';if(!tm)return '<span class="kp-mut">Sala sem time</span>';
  return occ.map(e=>{const per=K_PER(e);if(rm&&!(e.rooms||[]).includes(rm.esp))return `<span class="kpq off" title="${esc(rm.n)} não está reservada neste culto"><i class="escd none"></i>${per} · sem sala</span>`;const z=kEscBlock(tm,e);
   return z?`<button class="kpq" data-a="mnEscGo" data-v="${z.x.id}" title="${per} · ${z.b.members.length} ${z.b.members.length===1?'escalado':'escalados'} · ${K_ESC_ST[z.x.st]||z.x.st}"><i class="escd ${kQuad(z.x,z.b)}"></i>${per}<b>${z.b.members.length}</b></button>`:`<span class="kpq off" title="${per} · ${past?'sem registro':'sem escala'}"><i class="escd none"></i>${per}</span>`;}).join('');};
 const head=`${kHead('Planejamento','As aulas de cada turma em cada Culto Kids',`<button class="btn sec" data-a="nav" data-v="kescalas">${ic('calendar',15)}Ver as escalas</button><button class="btn pri" data-a="kCultoNew">${ic('plus',15,2.2)}Novo culto Kids</button>`)}
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Próximas datas</span><span class="kv">${next4.length}</span><span class="kd">${next4.length?fmtD(next4[0])+' a '+fmtD(next4[next4.length-1]):'nenhuma'}</span></div>
  <div class="k4"><span class="kl">Sem aula</span><span class="kv" style="${nMiss?'color:var(--st-sol)':''}">${nMiss}</span><span class="kd">turmas, nas próximas datas</span></div>
  <div class="k4"><span class="kl">Sem escala</span><span class="kv" style="${nEsc?'color:var(--st-sol)':''}">${nEsc}</span><span class="kd">turmas por culto, nas próximas datas</span></div>
  <div class="k4"><span class="kl">Aulas definidas</span><span class="kv">${defined}<small class="kof"> de ${total}</small></span><span class="kd">no trimestre</span></div>
 </section>
 <div class="utabs rise" style="--d:2" role="tablist">${[['pend','A resolver',todo.length?nMiss+nEsc:0],['cal','Calendário',0],['tur','Turmas',0]].map(x=>`<button role="tab" class="${tab===x[0]?'on':''}" aria-selected="${tab===x[0]}" data-a="kPlanTab" data-v="${x[0]}">${x[1]}${x[2]?`<span class="bdg">${x[2]}</span>`:''}</button>`).join('')}</div>`;
 if(tab==='pend')return head+(todo.length?`<section class="card kz-card rise" style="--d:3">${todo.map(g=>`<div class="kp-g"><div class="kp-gh"><b>${dL(g.d)}</b>${g.d===cur?'<em class="kp-now">Próxima</em>':''}<span class="who">${g.miss.length+g.esc.length} ${g.miss.length+g.esc.length===1?'pendência':'pendências'}</span></div>
   ${g.miss.map(t=>`<div class="kz-row">${tile(t)}<span class="kz-tx2"><b>${esc(t.n)}</b><small>Sem aula definida · ${faixa(t)}</small></span><button class="btn sec sm" data-a="kPlanCell" data-v="${t.id}|${g.d}">Escolher aula</button></div>`).join('')}
   ${g.esc.map(x=>`<div class="kz-row"><span class="kp-ti mute">${ic('calendar',16)}</span><span class="kz-tx2"><b>${K_PER(x.e)} sem escala</b><small>${andJ(x.ts.map(t=>esc(t.n)))}</small></span><button class="btn sec sm" data-a="nav" data-v="kescalas">Ver escalas</button></div>`).join('')}</div>`).join('')}</section>`
  :`<section class="card kz-card rise" style="--d:3"><p class="kz-ok">${ic('check',15,2.4)}Tudo certo nas próximas ${next4.length} datas: todas as turmas têm aula e escala.</p></section>`);
 if(tab==='tur')return head+`<div class="sx-note sm rise" style="--d:3;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><small>A série só preenche as datas vazias, em ordem. O que já está definido não muda.</small></span></div><section class="card kz-card rise" style="--d:4"><div class="kz-list">${T.map(t=>{const s=kRoomOf(t),tm=kTeamOfTurma(t),n=K_SUNDAYS.filter(d=>kAulaOn(t,d)).length,pc=Math.round(n/K_SUNDAYS.length*100);return `<div class="kz-row kp-tr"><span class="kp-tn">${tile(t)}<span class="kz-tx2"><b>${esc(t.n)} <small class="soft">· ${faixa(t)}</small></b><small>${s?esc(s.n):'Sem sala'}${tm?' · '+esc(tm.n):''}</small></span></span>
   <span class="kp-pr"><span class="kpbar"><i style="width:${pc}%"></i></span><small><b>${n}</b> de ${K_SUNDAYS.length} datas com aula</small></span>
   <button class="btn sec sm" data-a="kPlanFill" data-v="${t.id}">Preencher com uma série</button></div>`;}).join('')}</div></section>`;
 const label=month?monthName(ym):fmtD(cols[0])+' a '+fmtD(cols[cols.length-1]);
 return head+`<div class="kp-bar rise" style="--d:3"><div class="fi-mbar fd-tb"><div class="mp"><button class="ibtn" data-a="kPlanOff" data-v="-1" aria-label="${month?'Mês anterior':'Datas anteriores'}" ${atStart?'disabled':''}>${ic('chevL',16,2)}</button>
   <button type="button" class="mp-btn fd-pick" data-a="kPlanToday" title="Voltar para o período atual">${ic('calendar',16)}<b>${label}</b>${isCur?`<em>${month?'mês atual':'a partir de hoje'}</em>`:''}</button>
   <button class="ibtn" data-a="kPlanOff" data-v="1" aria-label="${month?'Próximo mês':'Próximas datas'}" ${atEnd?'disabled':''}>${ic('chevR',16,2)}</button></div></div>
  <div class="segc" role="group" aria-label="Período"><button data-a="kPlanMode" data-v="weeks" aria-pressed="${!month}">4 datas</button><button data-a="kPlanMode" data-v="month" aria-pressed="${month}">Por mês</button></div></div>
 <div class="sx-note sm rise" style="--d:3;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><b>A aula é do dia.</b> <small>Vale para a manhã e para a noite. Toque numa data para escolher ou trocar a aula.</small></span></div>
 <div class="kp-leg rise" style="--d:3"><span><i class="escd ok"></i>Escala confirmada</span><span><i class="escd wait"></i>Aguardando aceite</span><span><i class="escd acao"></i>Em criação</span><span><i class="escd none"></i>Sem escala</span></div>
 <section class="card kpg kp-grid rise" style="--d:4"><div class="kpl" style="grid-template-columns:minmax(170px,200px) repeat(${cols.length},minmax(190px,1fr))">
  <div class="kph"></div>${cols.map(d=>`<div class="kph ${d===cur?'now':''}"><b>${d.slice(8)}</b><span>${wd(d)} · ${MONTHS[+d.slice(5,7)-1].slice(0,3)}</span>${d===cur?'<em>próxima</em>':''}</div>`).join('')}
  ${T.map(t=>`<div class="kpt2">${tile(t)}<span class="kz-tx2"><b>${esc(t.n)}</b><small>${faixa(t)}</small></span></div>${cols.map(d=>`<div class="kpc ${d===cur?'now':''} ${d<cur?'past':''}">${aula(t,d)}<div class="kpe">${escala(t,d)}</div></div>`).join('')}`).join('')}
 </div></section>
 <div class="kp-days">${cols.map((d,i)=>`<section class="card kz-card rise ${d<cur?'past':''}" style="--d:${4+i}"><div class="kp-gh"><b>${dL(d)}</b>${d===cur?'<em class="kp-now">Próxima</em>':''}</div>
  ${T.map(t=>`<div class="kp-dr"><span class="kp-tn">${tile(t)}<span class="kz-tx2"><b>${esc(t.n)}</b><small>${faixa(t)}</small></span></span>${aula(t,d)}<div class="kpe">${escala(t,d)}</div></div>`).join('')}</section>`).join('')}</div>`;
}
function kEscalas(){
 const m=kidsMin();
 return `${kHead('Escalas','Quem serve e quando, no Ministério Kids',`<button class="btn sec" data-a="kGoMin">${ic('users',15)}Abrir no ministério</button>`)}
 <div class="sx-note rise" style="--d:1;--c:var(--brand-text);margin:0">${ic('swap',17,2)}<span><b>São as mesmas escalas da aba Escalas do Ministério Kids.</b> <small>A escala diz quem serve, em qual data e em qual time; a aula prevista vem do <button class="lnk inl" data-a="nav" data-v="kplano">planejamento</button>.</small></span></div>
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
 <div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('info',17,2)}<span><b>Turma é só a faixa etária.</b> <small>As aulas do trimestre são uma Série de Conteúdo, escolhida para a turma em Planejamento.</small></span></div>
 <section class="card pc rise" style="--d:3"><div class="sh"><h2>Faixas etárias</h2><span class="who">0 a ${MAX} anos</span></div>
  <div class="ages"><div class="agax">${Array.from({length:MAX+1},(_,i)=>`<span style="left:${(i+.5)/(MAX+1)*100}%">${i}</span>`).join('')}</div>
  ${TURMAS.slice().sort((a,b)=>a.min-b.min).map((t,i)=>{const rooms=SALAS.filter(s=>s.turma===t.id);return `<div class="agr"><div class="agn"><b>${esc(t.n)}</b><span>${rooms.length?rooms.map(r=>esc(r.n)).join(', '):'<em class="tag warn">Sem sala</em>'}</span></div>
   <div class="agt"><span class="agb" style="left:${t.min/(MAX+1)*100}%;width:${(t.max-t.min+1)/(MAX+1)*100}%;background:var(--tone-${t.cor||kTone(i)});color:var(--tone-${t.cor||kTone(i)}-ink)">${faixa(t)}</span></div>
   <div style="position:relative"><button class="ibtn sm" data-a="kTuMenu" data-v="${t.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="kTuPop-${t.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="kAulas" data-v="${t.id}">${ic('book',16)}Aulas da turma</button><button class="pi" data-a="kTurma" data-v="${t.id}">${ic('pen',16)}Editar turma</button><hr><button class="pi danger" data-a="kTurmaDel" data-v="${t.id}">${ic('x',16)}Excluir turma</button></div></div></div>`;}).join('')}</div>
 </section>`;
}

const pop=id=>{const p=$('#'+id);closePops(p);p.classList.toggle('open');};
const KA={
 kPlanTab:v=>{S.kpTab=v;render();},
 kRemind:(v,b)=>{if(!b||b.disabled)return;b.classList.add('busy');setTimeout(()=>{b.classList.remove('busy');(S.kRem=S.kRem||[]).push(v);b.disabled=true;b.innerHTML=ic('check',13,2.4)+'Lembrete enviado';toast('Lembrete enviado para '+v.split('|')[1].split(' ')[0]);},700);},
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
  openDlg(dlgHead('Aula · '+esc(t.n),wd(iso)+', '+fmtD(iso)+' · vale para a manhã e para a noite')
   +(dc.esc.length?'<div class="fld" style="margin-bottom:10px"><span class="fl">Já está na escala</span>'+dc.esc.map(c=>'<div class="ct1"><span class="cti">'+ic('book',16)+'</span><span class="ctt"><b>'+esc(c.t)+'</b><small>Conteúdo do bloco · '+c.per+'</small></span><button type="button" class="lnk" data-a="mnEscGo" data-v="'+c.x.id+'">Abrir escala</button></div>').join('')+'</div>':'')
   +'<div class="mcp"><div class="mcp-ty">'+TY.map(y=>'<button type="button" data-ty="'+y[0]+'" class="'+(y[0]===type?'on':'')+'"><span class="mc-i t-'+y[2]+'">'+ic(NX_TYPE_IC[y[0]],15,1.8)+'</span>'+y[0]+'<small id="kpN-'+y[0]+'"></small></button>').join('')+'</div>'
   +'<div class="mcp-r"><label class="sbox">'+ic('search',16)+'<input id="kpQ" placeholder="Buscar na biblioteca" autocomplete="off"></label><div class="mtf-list" id="kpL" style="max-height:300px"></div></div></div>'
   +'<label class="tog" style="margin-top:12px"><input type="checkbox" id="kpAll"><span class="sw"></span><span><b>Mesma aula para todas as turmas</b><small>Neste dia, em todas as turmas</small></span></label>'
   +'<p class="kp-new">Não achou na biblioteca? <button type="button" class="lnk inl" data-a="kMatNew" data-v="'+t.id+'|'+iso+'">Enviar material novo</button></p>'
   +'<div class="dfoot">'+(cur?'<button type="button" class="btn sec kp-del" id="kpDel">Retirar aula</button>':'')+'<button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" id="kpOk" disabled>Definir aula</button></div>','lg');
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
  $('#kpOk').onclick=e=>{if(!sel)return;const b=e.currentTarget;b.classList.add('busy');setTimeout(()=>{const ts=turmas();ts.forEach(x=>{kPlanOf(x).aulas[iso]=kItemRef(sel);});closeDlg();render();toast(ts.length>1?'Aula definida em todas as turmas':'Aula definida');},450);};
  const dl=$('#kpDel');if(dl)dl.onclick=()=>{const ts=turmas();confirmDel({title:'Retirar a aula deste dia?',body:`${ts.length>1?'Todas as turmas ficam':esc(t.n)+' fica'} sem aula em ${wd(iso)}, ${fmtD(iso)}. O conteúdo continua na biblioteca.`,label:'Retirar aula',onConfirm:()=>{ts.forEach(x=>{delete kPlanOf(x).aulas[iso];});closeDlg();render();toast('Aula retirada deste dia');}});};},
 kMatNew:v=>{const [tid,iso]=v.split('|'),t=tById(tid);
  openDlg(`${dlgHead('Enviar material novo','Cadastra em Conteúdo › Material de apoio, visível ao Kids, e já liga a '+esc(t.n)+' em '+wd(iso)+' '+fmtD(iso)+'.')}<form class="fgrid one" id="kmatF" novalidate>
   <label class="fld"><span class="fl">Título</span><input name="t" placeholder="Ex.: Aula 4 · Davi e Golias" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Arquivo <small>opcional</small></span><input name="f" type="file"></label>
   <label class="fld"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="d" rows="2"></textarea></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Enviar e ligar</button></div></form>`,'sm');
  const f=$('#kmatF');f.addEventListener('submit',e=>{e.preventDefault();const ti=f.elements.t.value.trim();if(!ti){const fl=f.elements.t.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Dê um título ao material';return;}
   const fl=f.elements.f.files&&f.elements.f.files[0],m=MTR(ti,f.elements.d.value.trim(),NOWD,'outro','',[fl?fl.name:'Material.pdf'],'Kids');MATS.unshift(m);kPlanOf(t).aulas[iso]=kItemRef(m.id);closeDlg();render();toast('Material cadastrado em Conteúdo e ligado a este dia');});},
 kPlanFill:v=>{closePops();const t=tById(v),p=kPlanOf(t);
  openDlg(`${dlgHead('Preencher com uma série',esc(t.n)+' · '+faixa(t))}<form class="fgrid one" id="kfillF" novalidate>
   <label class="fld"><span class="fl">Série</span><span class="selw"><select name="serie">${NX_SERIES.map(s=>`<option value="${s.id}" ${s.id===p.serie?'selected':''}>${esc(s.n)} · ${s.items.length} ${s.items.length===1?'item':'itens'}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">A partir de</span><span class="selw"><select name="start">${K_SUNDAYS.map(d=>`<option value="${d}">${wd(d)} ${fmtD(d)}</option>`).join('')}</select>${ic('updown',14)}</span></label><div class="sx-note sm" style="--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><small>Os itens vão para as datas vazias, em ordem. O que já está definido não muda, e cada data pode ser trocada depois.</small></span></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Preencher</button></div></form>`,'sm');
  $('#kfillF').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target),b=e.target.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{const n=kFill(t,fd.get('serie'),fd.get('start'));closeDlg();render();toast(n?`${n} ${n===1?'data preenchida':'datas preenchidas'}`:'Nenhuma data vazia para preencher');},500);});},
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

