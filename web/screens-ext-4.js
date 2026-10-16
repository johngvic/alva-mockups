/* ---------- Dashboard: suas tarefas ---------- */
const ME_NAME='Rafael Pereira';
(()=>{const mi=n=>(MINIS.find(m=>m.n===n)||{}).id,fb=n=>BOARDS.find(b=>b.name===n);
 let b=fb('Melhorias do domingo');if(b)bdAddTask(b,0,'Aprovar o roteiro de boas-vindas aos visitantes',{min:mi('Recepção'),who:ME_NAME,due:'2026-09-28',desc:'A Recepção mandou a proposta com o novo trajeto até a sala de café.'});
 b=fb('Repertório de outubro');if(b)bdAddTask(b,1,'Aprovar o repertório final do mês',{min:b.ownerId,who:ME_NAME,due:'2026-10-02'});
 b=fb('Preparação do congresso');if(b){bdAddTask(b,0,'Fechar o orçamento com o Financeiro',{min:mi('Eventos'),who:ME_NAME,due:'2026-10-12'});bdAddTask(b,2,'Aprovar a data com o conselho',{min:mi('Eventos'),who:ME_NAME});}})();
const myTasks=()=>{const td=TODAY.toISOString().slice(0,10),out=[];BOARDS.filter(b=>b.status!=='encerrado').forEach(b=>b.tasks.forEach(t=>{if(t.who===ME_NAME&&!bdDone(b,t))out.push({b,t,late:!!t.due&&t.due<td});}));
 return out.sort((x,y)=>(y.late-x.late)||((x.t.due||'9')>(y.t.due||'9')?1:-1));};
const myDue=t=>{if(!t.due)return '';const d=Math.round((new Date(t.due+'T12:00')-new Date(TODAY.toISOString().slice(0,10)+'T12:00'))/864e5);
 return d<0?['is-late','atrasada · '+fmtD(t.due)]:d===0?['is-soon','vence hoje']:d===1?['is-soon','vence amanhã']:d<=3?['is-soon','em '+d+' dias']:['',fmtD(t.due)];};

/* comentários de demonstração */
(()=>{const f=p=>{for(const b of BOARDS){const t=b.tasks.find(x=>x.t.startsWith(p));if(t)return t;}};
 let t=f('Reservar o auditório');if(t)t.cm=[{by:'Diego Martins',d:'2026-09-28',text:'O auditório está confirmado para os dois dias. Falta só fechar o mapa de salas.'},{by:'Rafael Pereira',d:'2026-09-29',text:'Ótimo. Mandem o mapa até sexta para eu aprovar.'}];
 t=f('Fechar o orçamento');if(t)t.cm=[{by:'Rafael Pereira',d:'2026-09-30',text:'Já pedi as três cotações ao Financeiro.'}];})();
const MYT_DAYS=7;
const myTd=()=>TODAY.toISOString().slice(0,10);
const myUrgent=()=>{const lim=new Date(TODAY.getTime()+MYT_DAYS*864e5).toISOString().slice(0,10);return myTasks().filter(x=>x.t.due&&x.t.due<=lim);};
const myRow=({b,t},cls)=>{const m=t.min&&mnById(t.min),dd=myDue(t),col=(b.cols.find(c=>c.id===t.col)||{}).n;
 return `<button class="${cls}" data-a="myTask" data-v="${b.id}|${t.id}"><span class="mytk-i" ${m?`style="--tc:var(--tone-${m.tone}-ink);--tb:var(--tone-${m.tone})"`:''}>${ic(m?m.icon:'check',16,1.9)}</span><span class="mytk-t"><b>${esc(t.t)}</b><span>${esc(col||'')} · ${esc(b.name)}</span>${dd?`<span class="mytk-d ${dd[0]}">${ic(dd[0]==='is-late'?'alert':'calendar',12,2)}<em>${dd[1]}</em></span>`:''}</span></button>`;};
function myTasksAct(){const all=myTasks(),u=myUrgent(),late=u.filter(x=>x.late).length,shown=u.slice(0,3),rest=all.length-shown.length;
 return `<article class="card act tk" id="tk"><div class="top"><span class="tg" style="background:var(--seq1,var(--brand))"></span>Suas tarefas</div>
  ${u.length?`<div class="hero"><span class="n">${u.length}</span><span class="u">${u.length>1?'tarefas suas vencem':'tarefa sua vence'} em até ${MYT_DAYS} dias${late?` · <b class="tk-late">${late} atrasada${late>1?'s':''}</b>`:''}</span></div>
  <div class="viz tk-l">${shown.map(x=>myRow(x,'tk-r')).join('')}</div>`
  :`<div class="hero"><span class="n">${ic('check',26,2)}</span><span class="u">${all.length?'Nada urgente nos próximos '+MYT_DAYS+' dias':'Você não tem tarefas nos quadros'}</span></div><div class="viz"></div>`}
  <div class="foot">${all.length?`<button class="btn sec" data-a="tkAll">Ver todas${rest>0?` <small class="tk-more">+${rest}</small>`:` <small class="tk-more">${all.length}</small>`}</button>`:''}</div></article>`;}
function tkAllDlg(){const all=myTasks(),lim=new Date(TODAY.getTime()+MYT_DAYS*864e5).toISOString().slice(0,10);
 const G=[['Atrasadas',all.filter(x=>x.late)],['Nos próximos '+MYT_DAYS+' dias',all.filter(x=>!x.late&&x.t.due&&x.t.due<=lim)],['Depois',all.filter(x=>x.t.due&&x.t.due>lim)],['Sem prazo',all.filter(x=>!x.t.due)]].filter(g=>g[1].length);
 openDlg(dlgHead('Suas tarefas',all.length+(all.length===1?' tarefa atribuída a você nos quadros':' tarefas atribuídas a você nos quadros'))+`<div class="tkd">${G.map(([h,l])=>`<p class="eh">${h}<small>${l.length}</small></p><div class="tkd-l">${l.map(x=>myRow(x,'mytk-r')).join('')}</div>`).join('')||'<p class="who">Nenhuma tarefa sua em aberto.</p>'}</div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'lg');}
Object.assign(A,{tkAll:()=>tkAllDlg(),myTask:v=>{closeDlg();const [bid,tid]=v.split('|'),b=BOARDS.find(x=>x.id===bid),t=b&&b.tasks.find(x=>x.id===tid);if(!t)return;
 if(b.ownerType==='min'){S.active='ministerios';S.mini=b.ownerId;S.mtab='quad';}else{const e=eById(b.ownerId);S.active=e&&e.kind==='culto'?'cultos':'eventos';S.evt=b.ownerId;S.etab='quad';}
 S.bd=b.id;render();window.scrollTo(0,0);setTimeout(()=>bdTaskDlg(b.id,t.col,t.id),80);}});

/* Como estou me sentindo: só para quem tem acesso ao módulo Cuidado */
const feelOK=()=>{const u=USERS.find(x=>x.n==='Rafael Pereira');return !!(u&&((u.perm||{}).Cuidado||[]).includes('Ver'));};
{const _sb=sidebar;sidebar=function(){const g=NAV.find(x=>x[0]==='Geral')[1].find(i=>i[0]==='cuidado')[3],i=g.findIndex(x=>x[0]==='sentimentos');let rm=null;if(!feelOK()&&i>=0)rm=g.splice(i,1)[0];try{return _sb();}finally{if(rm)g.splice(i,0,rm);}};
 const _fl=feelList;feelList=function(){if(!feelOK())return '<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Como estou me sentindo</h1></div></header><section class="card mempty rise" style="--d:1"><p>Sem acesso a esta página.</p><span>Ela aparece só para quem tem acesso ao módulo Cuidado.</span></section>';return _fl();};}

/* ---------- Encontros: lista e modal ---------- */
const encPost=h=>h.replace(/presença (\d+)\/(\d+)/g,(_,x,y)=>'<span class="epr"><i style="--p:'+Math.round(x/y*100)+'%"></i>'+x+' de '+y+' presentes</span>')
 .replace(/<p class="eh">(Agendados|Realizados|Cancelados)<\/p><ol class="elist">([\s\S]*?)<\/ol>/g,(_,l,b)=>'<p class="eh">'+l+'<small>'+(b.match(/<li class=/g)||[]).length+'</small></p><ol class="elist">'+b+'</ol>');
{const _h=hEnc;hEnc=function(){return encPost(_h.apply(this,arguments));};
 const _c=careMeetings;careMeetings=function(){return encPost(_c.apply(this,arguments));};
 const _d=dEnc;dEnc=function(){return encPost(_d.apply(this,arguments));};
 const _s=seEncounters;seEncounters=function(){return encPost(_s.apply(this,arguments));};}
function meetView(o){
 const fact=(i,t)=>t?'<span class="mv-f">'+ic(i,14,1.9)+esc(t)+'</span>':'';
 const pp=o.people,ny=pp?pp.yes.length:0,nt=pp?ny+pp.no.length:0,pct=nt?Math.round(ny/nt*100):0;
 const chip=p=>'<span class="mv-p">'+avN(p.n)+'<span><b>'+esc(p.n)+'</b>'+(p.why?'<small>'+esc(p.why)+'</small>':'')+'</span></span>';
 const blocks=(o.blocks||[]).filter(b=>b[1]).map(b=>'<section class="mv-b"><h3>'+b[0]+'</h3><p>'+esc(b[1])+'</p></section>').join('');
 openDlg(dlgHead(o.title,o.sub)+'<div class="mv">'
  +'<div class="mv-sum'+(o.state?' '+o.state:'')+'"><span class="mv-d"><b>'+fmtD(o.d).split(' ')[0]+'</b><span>'+fmtD(o.d).split(' ')[1]+'</span></span><div class="mv-fs"><b class="mv-st">'+o.stateL+'</b><div class="mv-fl">'+fact('calendar',wd(o.d))+fact('clock',o.time)+fact(o.mode==='Remoto'?'video':'pin',[o.mode,o.where].filter(Boolean).join(' · '))+'</div></div>'
  +(pp&&nt&&!pp.yesL?'<div class="mv-ring" style="--p:'+pct+'"><span><b>'+ny+'</b><small>de '+nt+'</small></span></div>':'')+'</div>'
  +blocks+(o.extra||'')
  +(o.note?'<section class="mv-b mv-note"><h3>'+ic('lock',13,2)+'Anotação pessoal <small>só você vê</small></h3><p>'+esc(o.note)+'</p></section>':'')
  +(pp?'<section class="mv-b"><div class="mv-bh"><h3>'+(pp.label||'Chamada')+'</h3>'+(pp.no.length||pp.showPct?'<span class="who">'+ny+' de '+nt+' presentes · '+pct+'%</span>':'')+'</div>'
   +'<div class="mv-cols'+(pp.no.length?'':' one')+'"><div><p class="eh">'+(pp.yesL||'Presentes')+'<small>'+ny+'</small></p><div class="mv-pl">'+(pp.yes.map(chip).join('')||'<span class="who">Ninguém</span>')+'</div></div>'
   +(pp.no.length?'<div><p class="eh">Ausentes<small>'+pp.no.length+'</small></p><div class="mv-pl abs">'+pp.no.map(chip).join('')+'</div></div>':'')+'</div></section>':'')
  +(o.log&&o.log.length?'<section class="mv-b"><h3>Registros do encontro</h3><ol class="mini-tl">'+o.log.map(e=>'<li><b>'+esc(e.t)+'</b><span>'+fmtD(e.d)+' · '+esc(e.by)+'</span></li>').join('')+'</ol></section>':'')
  +'</div><div class="dfoot">'+(o.edit||'')+'<button class="btn sec" data-a="closeDlg">Fechar</button>'+(o.primary||'')+'</div>','lg mvd');}
hViewMeet=function(id){const c=hById(S.casa),m=c.meets.find(x=>x.id===id);if(!m)return;
 meetView({title:'Encontro realizado',sub:esc(c.n),d:m.d,state:'done',stateL:'Realizado',time:nxEncTime(m.start,m.end),mode:m.mode,where:m.mode==='Presencial'?m.where:'',
  blocks:[['O que foi tratado',m.desc],['Material de apoio',m.mat]],
  people:{yes:c.ppl.filter(p=>m.pres&&m.pres[p.id]).map(p=>({n:p.n})),no:c.ppl.filter(p=>!(m.pres&&m.pres[p.id])).map(p=>({n:p.n,why:(m.why||{})[p.id]||'Sem motivo informado'}))},
  log:m.entries||[{d:m.d,t:'Encontro realizado e chamada registrada',by:c.leader}],
  edit:'<button class="btn sec" data-a="hEditMeet" data-v="'+m.id+'" style="margin-right:auto">'+ic('pen',14)+'Editar registro e chamada</button>'});};
dViewMeet=function(id){const d=dById(S.disc),m=d.meets.find(x=>x.id===id);if(!m)return;
 meetView({title:'Encontro realizado',sub:esc(d.n),d:m.d,state:'done',stateL:'Realizado',time:(m.time||'').replace(':00','h'),mode:m.mode,
  blocks:[['Conteúdo tratado',m.content],['Material de apoio',m.mat]],note:m.note,
  people:{label:'Participantes',yesL:'Participaram',yes:(m.parts||partsOf(d)).map(n=>({n})),no:[]}});};
careMeet=function(id){const c=cById(S.case);careInit(c);const m=[...c.meets,...c.sched,...c.cancelled].find(x=>x.rid===id);if(!m)return;const done=c.meets.includes(m),cancel=c.cancelled.includes(m);
 meetView({title:cancel?'Encontro cancelado':done?'Encontro realizado':'Encontro agendado',sub:esc(c.n),d:m.d,state:cancel?'cancel':done?'done':'sched',stateL:cancel?'Cancelado':done?'Realizado':'Agendado · '+nxEncWhen(m.d),
  time:nxEncTime(done?m.time:m.t),mode:m.mode||'Pastoral',where:m.where,
  blocks:done?[['Conteúdo tratado',m.t],['Resultado e próximos passos',m.result]]:[['Situação',cancel?'Este encontro foi cancelado.':'Ainda não aconteceu. Ao concluir, registre o que foi tratado e os próximos passos.']]});};
Object.assign(A,{hViewMeet,dViewMeet,careMeet,
 seView:v=>{const {k,o,m}=SE_PARSE(v),leaders=seLeaders(k,o);
  meetView({title:'Encontro realizado',sub:esc(o.n),d:m.d,state:'done',stateL:'Realizado',time:nxEncTime(m.start),mode:m.mode,where:m.mode==='Presencial'?m.where:'',
   blocks:[['O que foi tratado',m.notes]],people:{label:'Líderes',yes:leaders.filter(n=>m.pres&&m.pres[n]).map(n=>({n})),no:leaders.filter(n=>!(m.pres&&m.pres[n])).map(n=>({n}))}});}});

/* ---------- Convites e respostas ---------- */
const RS_L={sim:'Aceitou',nao:'Recusou','':'Sem resposta'};
const NET_PPL={g1:[['Ana Clara Lima','Líder de louvor'],['Diego Martins','Líder de eventos'],['Juliana Reis','Líder de recepção']],g2:[['Felipe Andrade','Líder de jovens'],['Renata Campos','Líder de intercessão']],g3:[['Bruno Carvalho','Líder de casas'],['Larissa Moura','Líder de kids']]};
function sePool(k,o){const out=[],seen=new Set(),add=(n,from,role)=>{if(n&&!seen.has(n)){seen.add(n);out.push({n,from,role});}};
 if(k==='net')netChurches(o).forEach(g=>{add(g.lead,g.n,'Líder da igreja');(NET_PPL[g.id]||[]).forEach(([n,r])=>add(n,g.n,r));});
 else o.casas.map(hById).filter(Boolean).forEach(c=>{add(c.leader,c.n,'Líder da casa');c.ppl.filter(p=>p.n!==c.leader).slice(0,5).forEach(p=>add(p.n,c.n,'Participante'));});
 return out;}
const SE_SEED_R=['sim','sim','','nao','sim','','sim'];
function seInv(k,o,m){if(m.inv)return m.inv;const pool=sePool(k,o),lead=seLeaders(k,o);
 m.inv=(m.done?pool.filter(p=>lead.includes(p.n)):pool.slice(0,7)).map((p,i)=>{const r=m.done?(m.pres&&m.pres[p.n]?'sim':(i%2?'nao':'')):SE_SEED_R[i%SE_SEED_R.length];return {n:p.n,from:p.from,role:p.role,r,why:r==='nao'?(i%2?'Viagem a trabalho':'Compromisso familiar'):''};});return m.inv;}
const seCanSee=o=>{const u=USERS.find(x=>x.n===ME_NAME);return o.sup===ME_NAME||!!(u&&(u.role==='Administrador'||((u.perm||{}).Comunidade||[]).includes('Editar')));};
const rsCount=l=>({ok:l.filter(x=>x.r==='sim').length,no:l.filter(x=>x.r==='nao').length,pe:l.filter(x=>!x.r).length});
const rsSum=(l,act,v)=>{const c=rsCount(l);return '<button type="button" class="rsum" data-a="'+act+'" data-v="'+v+'" title="Ver respostas"><span class="r-ok">'+ic('check',11,2.6)+c.ok+' aceit'+(c.ok===1?'ou':'aram')+'</span>'+(c.no?'<span class="r-no">'+ic('x',11,2.6)+c.no+' recus'+(c.no===1?'ou':'aram')+'</span>':'')+(c.pe?'<span class="r-pe">'+c.pe+' sem resposta</span>':'')+'</button>';};
function rsBlock(l,o={}){const c=rsCount(l),t=l.length||1,chip=p=>'<span class="mv-p">'+avN(p.n)+'<span><b>'+esc(p.n)+'</b><small>'+esc(p.why||p.sub||'')+'</small></span></span>';
 const col=(lbl,cls,arr)=>'<div><p class="eh">'+lbl+'<small>'+arr.length+'</small></p><div class="mv-pl one '+cls+'">'+(arr.map(chip).join('')||'<span class="who">Ninguém</span>')+'</div></div>';
 return '<section class="mv-b"><div class="mv-bh"><h3>'+(o.title||'Respostas ao convite')+'</h3><span class="who">'+(c.ok+c.no)+' de '+l.length+' responderam</span></div>'
  +'<div class="rs-bar"><i class="ok" style="width:'+c.ok/t*100+'%"></i><i class="no" style="width:'+c.no/t*100+'%"></i></div>'
  +'<div class="rs-cols">'+col('Aceitaram','ok',l.filter(x=>x.r==='sim'))+col('Recusaram','abs',l.filter(x=>x.r==='nao').map(x=>({...x,why:x.why||'Sem motivo informado'})))+col('Sem resposta','pend',l.filter(x=>!x.r))+'</div>'
  +(o.note?'<p class="rs-note">'+ic('info',13,2)+o.note+'</p>':'')+'</section>';}
/* --- supervisor --- */
seEncounters=function(k,o){
 const all=o.meets,by=(a,b)=>(a.d+(a.start||'')).localeCompare(b.d+(b.start||'')),sched=all.filter(m=>!m.done&&!m.cancelled).sort(by),done=all.filter(m=>m.done&&!m.cancelled).sort((a,b)=>by(b,a)),canc=all.filter(m=>m.cancelled).sort((a,b)=>by(b,a));
 const btns='<button class="btn sec" data-a="seReg" data-v="'+seKey(k,o)+'">Registrar encontro</button><button class="btn pri" data-a="seSched" data-v="'+seKey(k,o)+'">Agendar encontro</button>';
 if(!all.length)return nxEncEmpty(btns);
 const item=(m,kind)=>{const key=seKey(k,o,m),inv=seInv(k,o,m),n=inv.filter(x=>m.pres&&m.pres[x.n]).length;
  const title=kind==='done'?'<button class="lnk record-title" data-a="seView" data-v="'+key+'">'+esc(m.topic||'Encontro realizado')+'</button>':kind==='sched'?'<button class="lnk record-title" data-a="seInvView" data-v="'+key+'">'+esc(m.topic||'Encontro com os convocados')+'</button>':esc(m.topic||'Encontro cancelado');
  const meta=[wd(m.d),nxEncTime(m.start),m.mode,m.mode==='Presencial'&&m.where?esc(m.where):'',kind==='sched'?nxEncWhen(m.d):kind==='done'?'presença '+n+'/'+inv.length:'cancelado'].filter(Boolean).join(' · ');
  let act='';
  if(kind==='sched')act=(m.mode==='Remoto'&&m.url?'<button class="btn sec sm" data-a="copy" data-v="'+esc(m.url)+'">Copiar link</button>':'')+'<button class="ibtn sm" data-a="seSched" data-v="'+key+'" aria-label="Editar encontro" title="Editar encontro">'+ic('pen',14)+'</button><button class="btn pri sm" data-a="seCall" data-v="'+key+'">Registrar</button><button class="ibtn sm" data-a="seCancel" data-v="'+key+'" aria-label="Cancelar encontro" title="Cancelar encontro">'+ic('x',14)+'</button>';
  else act='<button class="ibtn sm" data-a="seDel" data-v="'+key+'" aria-label="Excluir encontro" title="Excluir encontro">'+ic('x',14)+'</button>';
  return '<li class="'+(kind==='canc'?'cancel':kind)+'">'+nxEncDate(m.d)+'<div class="eb2"><div class="et"><div><b>'+title+'</b><span class="who">'+meta+'</span>'+(kind==='sched'?rsSum(inv,'seInvView',key):'')+'</div><div class="ea">'+act+'</div></div></div></li>';};
 return '<section class="card pc"><div class="sh"><h2>Encontros</h2><div class="row2"><button class="btn sec sm" data-a="seReg" data-v="'+seKey(k,o)+'">Registrar</button><button class="btn pri sm" data-a="seSched" data-v="'+seKey(k,o)+'">Agendar</button></div></div>'
  +nxEncList('Agendados',sched.map(m=>item(m,'sched')))+nxEncList('Realizados',done.map(m=>item(m,'done')))+nxEncList('Cancelados',canc.map(m=>item(m,'canc')))+'</section>';};
{const _s=seEncounters;seEncounters=function(){return encPost(_s.apply(this,arguments));};}
seDetail=function(){
 const k=S.seK,o=SE_O(k,S.seId);if(!o){S.seK=null;S.seId=null;return k==='net'?multiList():redesList();}
 const isNet=k==='net',pool=sePool(k,o),units=isNet?netChurches(o).length:o.casas.length,unitL=isNet?(units===1?'igreja':'igrejas'):(units===1?'casa':'casas');
 const crumb='<nav class="crumb rise" aria-label="Você está em"><span class="soft">'+(isNet?'Administração':'Comunidade')+'</span>'+ic('chevR',13,2)+'<button class="lnk back" data-a="seBack">'+(isNet?'Multi-igreja':'Redes de célula')+'</button>'+ic('chevR',13,2)+'<span>'+esc(o.n)+'</span></nav>';
 if(!seCanSee(o))return crumb+'<section class="card mempty rise"><p>Sem acesso aos encontros desta rede.</p><span>Só o supervisor e quem tem Editar ou Admin na rede veem os encontros e as respostas.</span></section>';
 o.meets.forEach(m=>seInv(k,o,m));
 const done=o.meets.filter(m=>m.done&&!m.cancelled),sched=o.meets.filter(m=>!m.done&&!m.cancelled).sort((a,b)=>a.d.localeCompare(b.d)),nx=sched[0];
 const tp=done.reduce((a,m)=>a+m.inv.length,0),avg=tp?Math.round(done.reduce((a,m)=>a+m.inv.filter(x=>m.pres&&m.pres[x.n]).length,0)/tp*100):0;
 const c=nx?rsCount(nx.inv):null;
 return crumb
  +'<header class="ph rise"><div><p class="eb">Encontros do supervisor</p><h1>'+esc(o.n)+'</h1><p class="lede">'+(o.sup?'Supervisor: '+esc(o.sup):'Sem supervisor definido')+' · '+units+' '+unitL+' · '+pool.length+' pessoas que podem ser convocadas</p></div></header>'
  +'<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Realizados</span><span class="kv">'+done.length+'</span><span class="kd">encontros da rede</span></div><div class="k4"><span class="kl">Agendados</span><span class="kv">'+sched.length+'</span><span class="kd">'+(nx?'próximo em '+fmtD(nx.d):'nenhum marcado')+'</span></div><div class="k4"><span class="kl">Presença média</span><span class="kv">'+(done.length?avg+'%':'—')+'</span><span class="kd">dos convocados nos encontros</span></div></section>'
  +(nx?'<section class="card pc rise se-next" style="--d:2"><div class="sh"><div><h2>Próximo encontro · respostas</h2><span class="who">'+esc(nx.topic||'Encontro com os convocados')+' · '+wd(nx.d)+', '+fmtD(nx.d)+(nx.start?' · '+nxEncTime(nx.start):'')+'</span></div><button class="btn sec sm" data-a="seInvView" data-v="'+seKey(k,o,nx)+'">Ver respostas</button></div>'
   +'<div class="se-rs"><div class="se-k ok"><b>'+c.ok+'</b><span>aceitaram</span></div><div class="se-k no"><b>'+c.no+'</b><span>recusaram</span></div><div class="se-k pe"><b>'+c.pe+'</b><span>sem resposta</span></div><div class="se-av">'+nx.inv.slice(0,8).map(x=>'<span class="se-a '+(x.r==='sim'?'ok':x.r==='nao'?'no':'pe')+'" title="'+esc(x.n+' · '+RS_L[x.r])+'">'+avN(x.n)+'</span>').join('')+(nx.inv.length>8?'<small>+'+(nx.inv.length-8)+'</small>':'')+'</div></div>'
   +'<p class="rs-note">'+ic('lock',13,2)+'Visível ao supervisor e a quem tem Editar ou Admin nesta rede.</p></section>':'')
  +'<div class="rise" style="--d:3">'+seEncounters(k,o)+'</div>';};
function seConvPicker(k,o,sel){const pool=sePool(k,o),groups={};pool.forEach(p=>{(groups[p.from]=groups[p.from]||[]).push(p);});
 return '<div class="fld wide scv" id="seCv"><span class="fl">Convocados <em id="seCn"></em></span><div class="scv-bar"><label class="sbox">'+ic('search',15)+'<input id="seQ" placeholder="Buscar pessoa, '+(k==='net'?'igreja':'casa')+' ou função" autocomplete="off"></label><button type="button" class="btn sec sm" id="seAllL">'+ic('users',14)+'Todos os líderes</button></div>'
  +'<div class="scv-list">'+Object.entries(groups).map(([g,l],gi)=>'<div class="scv-g" data-g="'+gi+'"><div class="scv-gh"><b>'+ic(k==='net'?'church':'home',13,2)+esc(g)+'</b><button type="button" class="lnk" data-gall="'+gi+'">Marcar todos</button></div>'
   +l.map(p=>'<label class="scv-p" data-q="'+esc(norm(p.n+' '+g+' '+p.role))+'"><input type="checkbox" name="cv" value="'+esc(p.n)+'" data-from="'+esc(g)+'" data-role="'+esc(p.role)+'" data-lead="'+(/^Líder da/.test(p.role)?1:0)+'"'+(sel.includes(p.n)?' checked':'')+'>'+avN(p.n)+'<span><b>'+esc(p.n)+'</b><small>'+esc(p.role)+'</small></span><i class="cb">'+ic('check',12,2.8)+'</i></label>').join('')+'</div>').join('')+'</div><span class="err"></span><span class="hint">Cada convocado recebe o convite na Agenda do app e responde se vai.</span></div>';}
seForm=function(k,oid,mid){
 const o=SE_O(k,oid),m=mid&&o.meets.find(x=>x.id===mid);if(m)seInv(k,o,m);
 nxSchedDlg({id:'seF',title:m?'Editar encontro':'Agendar encontro',sub:esc(o.n)+'. Escolha quem será convocado.',vals:m?{d:m.d,start:m.start,mode:m.mode,where:m.where,url:m.url}:null,linkReq:true,noPast:!m,submit:m?'Salvar':'Agendar e convidar',wherePh:'Ex.: Sala 3 da igreja sede',
  onSubmit:q=>{const f=$('#seF'),ch=$$('[name=cv]:checked',f);if(!ch.length){const fl=$('#seCv');fl.classList.add('bad');fl.querySelector('.err').textContent='Convoque pelo menos uma pessoa';return;}
   const topic=f.elements.topic.value.trim(),old=m?m.inv:[],inv=ch.map(i=>old.find(x=>x.n===i.value)||{n:i.value,from:i.dataset.from,role:i.dataset.role,r:'',why:''});
   const added=inv.filter(x=>!old.includes(x)).length;
   if(m)Object.assign(m,q,{topic,inv});else{const x=seM(0,'','',{});Object.assign(x,q,{topic,inv});o.meets.push(x);}closeDlg();admRe();toast(m?(added?'Encontro atualizado · '+added+' novo'+(added>1?'s':'')+' convite'+(added>1?'s':''):'Encontro atualizado'):'Encontro agendado · '+inv.length+' convite'+(inv.length>1?'s':'')+' enviado'+(inv.length>1?'s':''));}});
 const f=$('#seF');f.closest('.dlg').classList.add('lg');
 f.querySelector('.fld').insertAdjacentHTML('beforebegin','<label class="fld wide"><span class="fl">Pauta</span><input name="topic" maxlength="80" value="'+esc(m?m.topic:'')+'" placeholder="Ex.: Multiplicação de casas"></label>');
 f.querySelector('.dfoot').insertAdjacentHTML('beforebegin',seConvPicker(k,o,m?m.inv.map(x=>x.n):[]));
 const cnt=()=>{const n=$$('[name=cv]:checked',f).length;$('#seCn').textContent=n?n+' selecionad'+(n>1?'os':'o'):'';$('#seCv').classList.remove('bad');};cnt();
 f.addEventListener('change',e=>{if(e.target.name==='cv')cnt();});
 $('#seQ').addEventListener('input',e=>{const q=norm(e.target.value);$$('.scv-p',f).forEach(l=>l.hidden=q&&!l.dataset.q.includes(q));$$('.scv-g',f).forEach(g=>g.hidden=![...g.querySelectorAll('.scv-p')].some(l=>!l.hidden));});
 $('#seAllL').onclick=()=>{$$('[name=cv][data-lead="1"]',f).forEach(i=>i.checked=true);cnt();};
 f.addEventListener('click',e=>{const b=e.target.closest('[data-gall]');if(!b)return;const ins=$$('.scv-g[data-g="'+b.dataset.gall+'"] [name=cv]',f),all=ins.every(i=>i.checked);ins.forEach(i=>i.checked=!all);cnt();});};
seCallDlg=function(k,oid,mid){
 const o=SE_O(k,oid),m=mid&&o.meets.find(x=>x.id===mid),list=m?seInv(k,o,m):sePool(k,o),t=TODAY.toISOString().slice(0,10);
 openDlg(dlgHead('Registrar encontro',esc(o.n)+(m?' · '+fmtD(m.d):'. Para um encontro que já aconteceu e não foi agendado.'))+'<form id="seC" class="fgrid one" novalidate>'
  +(m?'':'<label class="fld"><span class="fl">Data</span><input type="date" name="d" value="'+t+'" max="'+t+'"><span class="err"></span></label><label class="fld"><span class="fl">Pauta <small>opcional</small></span><input name="topic" maxlength="80"></label>')
  +'<div class="fld"><span class="fl">'+(m?'Chamada dos convocados':'Quem participou')+'</span><div class="cpick">'+(list.length?list.map(p=>'<label><input type="checkbox" name="p" value="'+esc(p.n)+'"'+(m&&(m.pres?m.pres[p.n]:p.r==='sim')?' checked':'')+'>'+avN(p.n)+'<span><b>'+esc(p.n)+'</b><small>'+esc((p.from||'')+(m?' · '+RS_L[p.r||'']:''))+'</small></span><i class="cb">'+ic('check',12,2.8)+'</i></label>').join(''):'<p class="who">Ninguém disponível nesta rede.</p>')+'</div>'+(m?'<span class="hint">Quem aceitou já vem marcado. A presença é o que conta no histórico.</span>':'')+'</div>'
  +'<label class="fld"><span class="fl">O que foi tratado <small>opcional</small></span><textarea class="ta" name="notes" rows="3" maxlength="500" placeholder="Resumo do encontro">'+esc(m?m.notes:'')+'</textarea></label>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Salvar encontro</button></div></form>');
 const f=$('#seC');f.onsubmit=e=>{e.preventDefault();const pres={};list.forEach(p=>{pres[p.n]=false;});$$('[name=p]:checked',f).forEach(i=>{pres[i.value]=true;});const notes=f.elements.notes.value.trim();
  if(m){m.done=true;m.pres=pres;m.notes=notes;}else{const d=f.elements.d.value;if(!d){const fl=f.elements.d.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escolha a data';return;}const x=seM(0,'','',{});x.d=d;x.done=true;x.pres=pres;x.notes=notes;x.topic=f.elements.topic.value.trim();x.inv=list.filter(p=>pres[p.n]).map(p=>({...p,r:'sim',why:''}));o.meets.push(x);}
  closeDlg();admRe();toast('Encontro registrado');};};
Object.assign(A,{
 seInvView:v=>{const {k,o,m}=SE_PARSE(v),inv=seInv(k,o,m),key=v;
  meetView({title:'Encontro agendado',sub:esc(o.n),d:m.d,state:'sched',stateL:'Agendado · '+nxEncWhen(m.d),time:nxEncTime(m.start),mode:m.mode,where:m.mode==='Presencial'?m.where:'',blocks:[['Pauta',m.topic]],
   extra:rsBlock(inv.map(x=>({...x,sub:x.from})),{title:'Convocados',note:'Visível ao supervisor e a quem tem Editar ou Admin nesta rede. O convite chega na Agenda do app de cada convocado.'}),
   edit:'<button class="btn sec" data-a="seSchedFromView" data-v="'+key+'" style="margin-right:auto">'+ic('users',14)+'Editar convocados</button>'+(rsCount(inv).pe?'<button class="btn sec" data-a="seNudge" data-v="'+key+'">'+ic('bell',14)+'Lembrar quem não respondeu</button>':'')});},
 seSchedFromView:v=>{closeDlg();setTimeout(()=>A.seSched(v),60);},
 seNudge:v=>{const {k,o,m}=SE_PARSE(v),n=rsCount(seInv(k,o,m)).pe;toast('Lembrete enviado para '+n+' pessoa'+(n>1?'s':''));},
 seView:v=>{const {k,o,m}=SE_PARSE(v),inv=seInv(k,o,m);
  meetView({title:'Encontro realizado',sub:esc(o.n),d:m.d,state:'done',stateL:'Realizado',time:nxEncTime(m.start),mode:m.mode,where:m.mode==='Presencial'?m.where:'',blocks:[['Pauta',m.topic],['O que foi tratado',m.notes]],
   people:{label:'Chamada',yes:inv.filter(x=>m.pres&&m.pres[x.n]).map(x=>({n:x.n})),no:inv.filter(x=>!(m.pres&&m.pres[x.n])).map(x=>({n:x.n,why:x.r==='nao'?'Recusou o convite'+(x.why?' · '+x.why:''):''}))}});}});
/* --- casas --- */
const H_SEED_R=['sim','sim','sim','','nao','sim','','sim','sim','','sim','nao','sim','','sim','sim','','sim'];
function hRsvp(c,m){if(!m.rsvp){m.rsvp={};c.ppl.forEach((p,i)=>{const r=m.done?(m.pres&&m.pres[p.id]?'sim':(i%3?'':'nao')):H_SEED_R[i%H_SEED_R.length];m.rsvp[p.id]={r,why:r==='nao'?(i%2?'Viagem a trabalho':'Plantão no hospital'):''};});}return c.ppl.map(p=>({n:p.n,id:p.id,...(m.rsvp[p.id]||{r:'',why:''})}));}
{const _h=hEnc;hEnc=function(c){const h=_h.apply(this,arguments);
 return h.replace(/<li class="sched">([\s\S]*?)<\/li>/g,(li,body)=>{const id=(body.match(/data-a="nxHouseRegister" data-v="([^"]+)"/)||[])[1];const m=id&&c.meets.find(x=>x.id===id);if(!m)return li;
  return li.replace(/(<div class="et"><div>)<b>([^<]*)<\/b>/,(m,a,t)=>a+'<b><button class="lnk record-title" data-a="hInvView" data-v="'+id+'">'+t+'</button></b>').replace('</span></div><div class="ea">','</span>'+rsSum(hRsvp(c,m),'hInvView',id)+'</div><div class="ea">');});};}
hViewMeet=function(id){const c=hById(S.casa),m=c.meets.find(x=>x.id===id);if(!m)return;const rs=hRsvp(c,m);
 meetView({title:'Encontro realizado',sub:esc(c.n),d:m.d,state:'done',stateL:'Realizado',time:nxEncTime(m.start,m.end),mode:m.mode,where:m.mode==='Presencial'?m.where:'',
  blocks:[['O que foi tratado',m.desc],['Material de apoio',m.mat]],
  people:{yes:c.ppl.filter(p=>m.pres&&m.pres[p.id]).map(p=>({n:p.n})),no:c.ppl.filter(p=>!(m.pres&&m.pres[p.id])).map(p=>({n:p.n,why:(m.why||{})[p.id]||'Sem motivo informado'}))},
  extra:'',log:m.entries||[{d:m.d,t:'Encontro realizado e chamada registrada',by:c.leader}],
  edit:'<button class="btn sec" data-a="hEditMeet" data-v="'+m.id+'" style="margin-right:auto">'+ic('pen',14)+'Editar registro e chamada</button>'});
 const ch=$$('.mvd .mv-b').find(x=>/Chamada/.test(x.textContent));if(ch)ch.insertAdjacentHTML('afterend',rsBlock(rs,{title:'Respostas ao convite pelo app',note:'Resposta antes do encontro. A presença vem da chamada, não do convite.'}));};
Object.assign(A,{hViewMeet,
 hInvView:id=>{const c=hById(S.casa),m=c.meets.find(x=>x.id===id);if(!m)return;
  meetView({title:'Encontro agendado',sub:esc(c.n),d:m.d,state:'sched',stateL:'Agendado · '+nxEncWhen(m.d),time:nxEncTime(m.start,m.end),mode:m.mode,where:m.mode==='Presencial'?m.where:'',blocks:[['Pauta',m.desc],['Material de apoio',m.mat]],
   extra:rsBlock(hRsvp(c,m),{note:'Os participantes respondem na Agenda do app e recebem lembrete 1 dia antes. A presença é registrada depois, na chamada.'}),
   edit:'<button class="btn sec" data-a="hInvEdit" data-v="'+id+'" style="margin-right:auto">'+ic('pen',14)+'Editar encontro</button>',primary:'<button class="btn pri" data-a="hInvReg" data-v="'+id+'">Fazer chamada</button>'});},
 hInvEdit:id=>{closeDlg();setTimeout(()=>A.nxHouseSchedule(id),60);},
 hInvReg:id=>{closeDlg();setTimeout(()=>A.nxHouseRegister(id),60);}});

/* ---------- Séries: progresso em todas, ordem livre ---------- */
const ctCanEdit=()=>{const u=USERS.find(x=>x.n===ME_NAME);return !!(u&&(u.role==='Administrador'||((u.perm||{})['Conteúdo']||[]).includes('Editar')));};
{const sm=NX_SERIES.find(x=>x.id==='sm1');if(sm&&!sm.people.length)sm.people=[{n:'Rafael Pereira',ids:[sm.items[0],sm.items[2]]},{n:'Ana Lima',ids:[sm.items[1]]},{n:'Juliana Prado',ids:sm.items.slice()}];
 NX_SERIES.forEach(x=>x.people.forEach((p,i)=>{if(!p.ids){const n=Math.min(p.done||0,x.items.length);p.ids=n>=x.items.length||i%2===0?x.items.slice(0,n):x.items.slice(x.items.length-n);}}));}
const nxSerSync=x=>x.people.forEach(p=>{p.done=p.ids.filter(id=>x.items.includes(id)).length;});
{const _l=nxSeriesList;nxSeriesList=function(){NX_SERIES.forEach(nxSerSync);return _l();};}
nxSeriesPage=function(){
 nxSyncSr();
 const s=nxSerCur();if(!s)return nxSeriesList();nxSerSync(s);
 const idx=NX_SERIES.indexOf(s),ti=NX_TYPE_IC[s.type],can=ctCanEdit(),n=s.items.length,total=nxSerTotal(s),one=NX_TYPE_LO[s.type],many=NX_TYPE_PL[s.type];
 const pct=i=>s.people.length?Math.round(s.people.filter(p=>p.ids.includes(s.items[i])).length/s.people.length*100):0;
 const avg=n&&s.people.length?Math.round(s.people.reduce((a,p)=>a+p.done/n,0)/s.people.length*100):0;
 const tab=can&&S.nxSeriesTab==='progress'?'progress':'items';
 const kp=[[n,'Itens'],[total?nxMin(total):'—','Duração']].concat(can?[[s.people.length,'Inscritos'],[avg+'<small class="kof">%</small>','Progresso médio']]:[]);
 const tabs=[['items','Itens','nxSeriesTab',n]].concat(can?[['progress','Progresso','nxSeriesTab',s.people.length]]:[]);
 const head=joHead(s,'<span class="soft">Conteúdo</span>'+ic('chevR',13,2)+'<button class="lnk back" data-a="nxSeriesBack">Séries</button>'+ic('chevR',13,2)+'<span>'+esc(s.n)+'</span>',
  '<span class="nx-sh"><span class="nx-si" style="background:'+thumbBg(idx%6)+(s.cover?";background-image:url('"+s.cover+"');background-size:cover;background-position:center":'')+'">'+ic(ti,22)+'</span>'+esc(s.n)+'</span>',
  'Série de '+many+(s.desc?' · '+esc(s.desc):''),kp,tabs,tab,nxBadge(s)+'<button class="btn sec sm" data-a="nxSeriesEdit" data-v="'+s.id+'">'+ic('pen',14)+'Editar série</button>');
 let body;
 if(tab==='progress'){
  body='<p class="sr-note">'+ic('info',14,2)+'Ordem livre: cada pessoa marca '+(s.type==='Música'?'as faixas como concluídas':'os itens como concluídos')+' na ordem que quiser. Esta aba aparece só para quem tem Editar ou Admin em Conteúdo.</p>'
   +'<section class="card mtab"><div class="trow pp thead"><span>Pessoa</span><span>Progresso</span><span>'+(s.type==='Música'?'Faixas concluídas':'Itens concluídos')+'</span><span>Situação</span></div>'+(s.people.length?s.people.map(p=>{const pr=n?Math.round(p.done/n*100):0;
   return '<div class="trow pp"><span class="tn">'+avN(p.n)+'<b>'+esc(p.n)+'</b></span><span class="ct-pg"><span class="tr '+(pr===100?'done':'')+'"><i style="width:'+pr+'%"></i></span><b>'+pr+'%</b></span><span class="ct-where"><span class="sr-dots">'+s.items.map((id,i)=>{const d=p.ids.includes(id),f=nxItemInfo(s.type,nxItemObj(s.type,id));return '<i class="'+(d?'on':'')+'" title="'+(i+1)+'. '+esc(f.t)+(d?' · concluído':' · pendente')+'">'+(d?ic('check',10,3):i+1)+'</i>';}).join('')+'</span><small>'+p.done+' de '+n+'</small></span><span class="ts">'+(pr===100?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Concluída</span>':p.done?'<span class="soft">Faltam '+(n-p.done)+'</span>':'<span class="soft">Não começou</span>')+'</span></div>';}).join(''):'<div class="tfoot"><span>Ninguém começou ainda.</span></div>')+'</section>';
 }else{
  body='<section class="card ct-trail"><div class="sh"><p class="who" style="margin:0">'+ic('grip',13,2)+' Arraste para mudar a ordem de exibição. Quem acompanha pode concluir '+(s.type==='Música'?'as faixas':'os itens')+' em qualquer ordem.</p><button class="btn pri sm" data-a="nxSeriesAdd">'+ic('plus',14,2.2)+'Adicionar '+one+'</button></div>'
   +'<ol class="ct-tl" id="nxSerList">'+s.items.map((id,i)=>{const f=nxItemInfo(s.type,nxItemObj(s.type,id));
    return '<li data-id="'+id+'"><span class="ct-node">'+(i+1)+'</span><div class="ct-cc" tabindex="0" data-a="nxSeriesItem" data-v="'+id+'"><span class="cm-grip" title="Arraste para reordenar">'+ic('grip',14,2)+'</span><div class="ct-ccb"><b>'+esc(f.t)+'</b><span>'+esc(f.sub)+'</span></div><span class="ct-ccm">'+(f.dur?'<b>'+nxMin(f.dur)+'</b>':'')+'</span>'
     +(can?'<span class="ct-ccp"><span class="tr"><i style="width:'+pct(i)+'%"></i></span><small>'+pct(i)+'% concluíram</small></span>':'<span class="ct-ccp"></span>')
     +'<button type="button" class="ibtn sm" data-a="nxSeriesRemove" data-v="'+i+'" aria-label="Remover da série" title="Remover da série">'+ic('x',14)+'</button>'+ic('chevR',16)+'</div></li>';}).join('')
   +'<li class="ct-addn"><span class="ct-node add">'+ic('plus',14,2.2)+'</span><button class="ct-cc add" data-a="nxSeriesAdd"><b>Adicionar '+one+'</b><span>Escolha na biblioteca de '+many+'</span></button></li></ol></section>';
 }
 return head+'<div class="rise" style="--d:2">'+body+'</div>';
};

if(!FOOD_STORES.shop.items.some(x=>x.id==='sh7'))FOOD_STORES.shop.items.push({id:'sh7',sku:'L003',name:'Devocional 365 dias',cat:'books',price:5900,stock:20,min:5,active:true,desc:'Uma leitura curta para cada dia do ano.',app:true},{id:'sh8',sku:'A003',name:'Ecobag Alva',cat:'accessories',price:2900,stock:15,min:5,active:true,desc:'Lona crua, alça longa.',app:true});

/* ---------- Loja: detalhe da venda ---------- */
nxSaleDetail=function(id){const s=FOOD_SALES.find(x=>x.id===id);if(!s)return;const p=FOOD_PAY[s.method]||FOOD_PAY.Pix,gross=s.lines.reduce((n,l)=>n+l.qty*l.price,0),units=s.lines.reduce((n,l)=>n+l.qty,0),ok=s.status==='completed',who=s.who||'Rafael Pereira',pct=gross&&s.discount?Math.round(s.discount/gross*100):0;
 const fact=(icn,lbl,val)=>'<div class="svd-f"><span class="svd-fi">'+icn+'</span><span><small>'+lbl+'</small><b>'+val+'</b></span></div>';
 openDlg(dlgHead('Venda '+s.id,'Loja · balcão')
  +'<div class="svd">'
  +'<div class="svd-hero '+(ok?'':'off')+'"><div class="svd-tot"><small>Total da venda</small><b>'+foodMoney(s.total)+'</b>'+(ok?foodPill('Concluída','ok'):foodPill('Cancelada','off'))+'</div>'
   +'<div class="svd-fs">'+fact(ic('calendar',15,1.9),'Data',dBR(s.date)+' · '+s.time)+fact('<span class="ax-kt" style="--k:'+p[1]+';--s:28px">'+ic(p[0],13)+'</span>','Pagamento',esc(s.method||'Pix'))+fact(avN(who),'Vendido por',esc(who.split(' ').slice(0,2).join(' ')))+(s.buyer?fact(avN(s.buyer),'Comprador',esc(s.buyer)):'')+fact(ic('bag',15,1.9),'Itens',units+' unidade'+(units>1?'s':''))+'</div></div>'
  +(ok?'':'<div class="svd-cancel">'+ic('undo',15,2)+'<div><b>Venda cancelada'+(s.reason?' · '+esc(s.reason):'')+'</b><span>O estoque voltou e o estorno foi lançado no Financeiro.</span></div></div>')
  +'<section class="svd-box"><div class="svd-bh"><h3>Itens</h3><span class="who">'+s.lines.length+' produto'+(s.lines.length>1?'s':'')+' · '+units+' un.</span></div>'
   +s.lines.map(l=>{const i=foodItem('shop',l.item),c=foodCat('shop',l.cat);return '<div class="svd-ln">'+(i?shThumb(i,c,40):kTile(foodCatK(c),40))+'<span class="svd-lt"><b>'+esc(l.name)+'</b><small>'+(i&&i.sku?esc(i.sku)+' · ':'')+l.qty+' × '+foodMoney(l.price)+'</small></span><b class="svd-lv">'+foodMoney(l.qty*l.price)+'</b></div>';}).join('')
   +'<div class="svd-sum">'+(s.discount?'<div><span>Subtotal</span><span>'+foodMoney(gross)+'</span></div><div><span>Desconto'+(pct?' <em>'+pct+'%</em>':'')+'</span><span class="neg">− '+foodMoney(s.discount)+'</span></div>':'')+'<div class="big"><span>Total</span><b>'+foodMoney(s.total)+'</b></div></div></section>'
  +'</div><div class="dfoot">'+(ok?'<button class="btn sec dang-t" data-a="nxSaleCancel" data-v="'+s.id+'" style="margin-right:auto">'+ic('undo',14,2)+'Cancelar venda</button>':'')+'<button class="btn sec" data-a="sdReceipt" data-v="'+s.id+'">'+ic('file',14)+'Recibo</button><button class="btn pri" data-a="closeDlg">Fechar</button></div>','svdd');};
Object.assign(A,{nxSaleOpen:nxSaleDetail,sdReceipt:v=>toast('Recibo da venda '+v+' gerado em PDF')});

/* ---------- Loja: pedidos do app ---------- */
const AO_ST={separando:['Separando','sol'],pronto:['Pronto para retirar','int'],retirado:['Retirado','mute'],cancelado:['Cancelado','rec']};
const aoIt=id=>FOOD_STORES.shop.items.find(x=>x.id===id);
const AO=(id,code,who,d,time,lines,pay,st,o={})=>{const ls=lines.map(([item,qty,size])=>{const i=aoIt(item);return {item,name:i.name,cat:i.cat,qty,price:i.price,size:size||''};});return Object.assign({id,code,who,d,time,lines:ls,total:ls.reduce((n,l)=>n+l.qty*l.price,0),pay,st},o);};
const APP_ORDERS=[
 AO('A1036','K9QX','Mariana Costa','2026-09-30','08:12',[['sh2',1,'M'],['sh7',1]],'Pix','separando'),
 AO('A1035','T4ME','Felipe Andrade','2026-09-29','21:40',[['sh4',1]],'Cartão','separando'),
 AO('A1034','B7RA','Juliana Prado','2026-09-29','19:05',[['sh5',2]],'Pix','pronto',{readyAt:'2026-09-30 09:20',readyBy:'Rafael Pereira'}),
 AO('A1033','Z2LD','Otávio Lins','2026-09-28','12:30',[['sh8',1],['sh1',1]],'Pix','pronto',{readyAt:'2026-09-29 10:05',readyBy:'Lucas Mendes'}),
 AO('A1032','H5PN','Ana Clara Lima','2026-09-27','17:48',[['sh2',2,'P']],'Cartão','retirado',{readyAt:'2026-09-27 18:30',readyBy:'Lucas Mendes',pickedAt:'2026-09-28 10:42',pickedBy:'Lucas Mendes'}),
 AO('A1030','R8VC','Bruno Reis','2026-09-25','20:15',[['sh7',1]],'Pix','cancelado',{why:'Pedido em duplicidade'}),
 AO('A1027','M3TS','Rafael Pereira','2026-09-20','11:02',[['sh1',1]],'Pix','retirado',{readyAt:'2026-09-20 12:00',readyBy:'Lucas Mendes',pickedAt:'2026-09-21 09:30',pickedBy:'Lucas Mendes'})];
APP_ORDERS.forEach(o=>{if(FOOD_SALES.some(x=>x.id===o.id))return;FOOD_SALES.push({id:o.id,store:'shop',date:o.d,time:o.time,status:o.st==='cancelado'?'cancelled':'completed',reason:o.why||'',lines:o.lines.map(l=>({item:l.item,name:l.name,cat:l.cat,qty:l.qty,price:l.price})),total:o.total,discount:0,method:o.pay,who:'App',app:o.id});});
const aoNow=()=>TODAY.toISOString().slice(0,10)+' '+new Date().toTimeString().slice(0,5);
const aoWhen=t=>{const [d,h]=t.split(' ');return dBR(d).slice(0,5)+' às '+h;};
const aoPill=o=>{const [l,k]=AO_ST[o.st];return '<span class="stp" style="--c:var(--st-'+(k==='mute'?'x':k)+',var(--ink-muted));--b:var(--st-'+(k==='mute'?'x':k)+'-bg,var(--surface-2))"><i></i>'+l+'</span>';};
const aoUnits=o=>o.lines.reduce((n,l)=>n+l.qty,0);
const aoOpen=()=>APP_ORDERS.filter(o=>o.st==='separando'||o.st==='pronto');
function aoCard(o){const p=FOOD_PAY[o.pay]||FOOD_PAY.Pix;
 return '<article class="ao-c '+o.st+'" tabindex="0" data-a="aoOpen" data-v="'+o.id+'"><div class="ao-ch"><span class="ao-code">'+o.code+'</span><span class="who">#'+o.id+'</span></div>'
  +'<div class="ao-who">'+avN(o.who)+'<span><b>'+esc(o.who)+'</b><small>'+dBR(o.d).slice(0,5)+' · '+o.time+'</small></span></div>'
  +'<p class="ao-it">'+o.lines.map(l=>l.qty+'× '+esc(l.name)+(l.size?' ('+l.size+')':'')).join(', ')+'</p>'
  +'<div class="ao-cf"><span class="ao-pay"><span class="ax-kt" style="--k:'+p[1]+';--s:22px">'+ic(p[0],11)+'</span>'+foodMoney(o.total)+'</span>'
  +(o.st==='separando'?'<button class="btn pri sm" data-a="aoReady" data-v="'+o.id+'">Marcar como pronto</button>':o.st==='pronto'?'<button class="btn pri sm" data-a="aoPick" data-v="'+o.id+'">Confirmar retirada</button>':o.st==='retirado'?'<span class="who">Retirado '+aoWhen(o.pickedAt)+'</span>':'<span class="who">'+esc(o.why||'Cancelado')+'</span>')+'</div></article>';}
function aoPage(){const sep=APP_ORDERS.filter(o=>o.st==='separando'),rdy=APP_ORDERS.filter(o=>o.st==='pronto'),done=APP_ORDERS.filter(o=>o.st==='retirado'),canc=APP_ORDERS.filter(o=>o.st==='cancelado'),openV=aoOpen().reduce((n,o)=>n+o.total,0);
 const col=(t,k,l,empty)=>'<section class="ao-col '+k+'"><header><span class="ao-dot"></span><b>'+t+'</b><small>'+l.length+'</small></header><div class="ao-list">'+(l.map(aoCard).join('')||'<p class="ao-empty">'+empty+'</p>')+'</div></section>';
 return '<header class="ph rise"><div><p class="eb">Loja</p><h1>Pedidos do app</h1><p class="lede">Compras pagas pelo app. Separe, avise o comprador e entregue conferindo o código de retirada.</p></div><div class="pact"><button class="btn pri" data-a="aoPick">'+ic('check',15,2.2)+'Confirmar retirada</button></div></header>'
  +'<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Para separar</span><span class="kv" style="'+(sep.length?'color:var(--st-sol)':'')+'">'+sep.length+'</span><span class="kd">pagos e aguardando a equipe</span></div><div class="k4"><span class="kl">Prontos para retirar</span><span class="kv" style="color:var(--st-int)">'+rdy.length+'</span><span class="kd">comprador já foi avisado</span></div><div class="k4"><span class="kl">Retirados</span><span class="kv">'+done.length+'</span><span class="kd">entregues com o código</span></div><div class="k4"><span class="kl">Em aberto</span><span class="kv" style="font-size:24px">'+foodMoney(openV)+'</span><span class="kd">pago, ainda na loja</span></div></section>'
  +'<form class="card ao-find rise" style="--d:2" id="aoFind" novalidate><span class="ao-fi">'+ic('ticket',18,2)+'</span><div class="ao-ft"><b>Buscar pelo código de retirada</b><span class="who">O comprador mostra o código no app. Também dá para buscar pelo nome ou número do pedido.</span></div><div class="ao-qg"><label class="sbox ao-q">'+ic('search',16)+'<input id="aoQ" maxlength="40" placeholder="Código, nome ou pedido" autocomplete="off" aria-label="Buscar pedido"></label><button class="btn pri" type="submit">Buscar</button></div></form>'
  +'<div class="ao-board rise" style="--d:3">'+col('Separando','sep',sep,'Nada para separar.')+col('Pronto para retirar','rdy',rdy,'Nenhum pedido esperando.')+col('Retirados','done',done.slice(0,6),'Nenhum pedido retirado ainda.')+'</div>'
  +(canc.length?'<p class="eh" style="margin-top:20px">Cancelados<small>'+canc.length+'</small></p><div class="ao-canc">'+canc.map(aoCard).join('')+'</div>':'');}
function aoDetail(id){const o=APP_ORDERS.find(x=>x.id===id);if(!o)return;const p=FOOD_PAY[o.pay]||FOOD_PAY.Pix,steps=[['Pago',o.d+' '+o.time,'App'],['Pronto para retirar',o.readyAt,o.readyBy],['Retirado',o.pickedAt,o.pickedBy]],cur=o.st==='retirado'?2:o.st==='pronto'?1:0;
 openDlg(dlgHead('Pedido #'+o.id,'Loja · pedido pelo app')
  +'<div class="svd"><div class="ao-hero '+o.st+'"><div><small>Código de retirada</small><b>'+o.code+'</b>'+aoPill(o)+'</div><div class="ao-buyer">'+avN(o.who)+'<span><b>'+esc(o.who)+'</b><small>Comprador · '+aoUnits(o)+' unidade'+(aoUnits(o)>1?'s':'')+'</small></span></div></div>'
  +(o.st==='cancelado'?'<div class="svd-cancel">'+ic('undo',15,2)+'<div><b>Pedido cancelado'+(o.why?' · '+esc(o.why):'')+'</b><span>O valor foi estornado para o comprador e o estoque voltou.</span></div></div>'
   :'<ol class="ao-steps">'+steps.map((s,i)=>'<li class="'+(i<=cur?'on':'')+(i===cur?' cur':'')+'"><span class="ao-sd">'+(i<cur||(i===cur&&o.st==='retirado')?ic('check',11,3):i+1)+'</span><b>'+s[0]+'</b><small>'+(i<=cur&&s[1]?aoWhen(s[1])+(s[2]?' · '+esc(s[2].split(' ')[0]):''):i===1?'Avisa o comprador no app':'Com o código no balcão')+'</small></li>').join('')+'</ol>')
  +'<section class="svd-box"><div class="svd-bh"><h3>Itens</h3><span class="who">'+o.lines.length+' produto'+(o.lines.length>1?'s':'')+'</span></div>'+o.lines.map(l=>{const i=aoIt(l.item),c=foodCat('shop',l.cat);return '<div class="svd-ln">'+(i?shThumb(i,c,40):'')+'<span class="svd-lt"><b>'+esc(l.name)+(l.size?' · tamanho '+l.size:'')+'</b><small>'+l.qty+' × '+foodMoney(l.price)+'</small></span><b class="svd-lv">'+foodMoney(l.qty*l.price)+'</b></div>';}).join('')
  +'<div class="svd-sum"><div><span>Pagamento</span><span class="ao-pay"><span class="ax-kt" style="--k:'+p[1]+';--s:22px">'+ic(p[0],11)+'</span>'+o.pay+' · aprovado</span></div><div class="big"><span>Total pago</span><b>'+foodMoney(o.total)+'</b></div></div></section></div>'
  +'<div class="dfoot">'+(o.st==='separando'||o.st==='pronto'?'<button class="btn sec dang-t" data-a="aoCancel" data-v="'+o.id+'" style="margin-right:auto">'+ic('undo',14,2)+'Cancelar e estornar</button>':'')+'<button class="btn sec" data-a="closeDlg">Fechar</button>'
  +(o.st==='separando'?'<button class="btn pri" data-a="aoReady" data-v="'+o.id+'">Marcar como pronto</button>':o.st==='pronto'?'<button class="btn pri" data-a="aoPick" data-v="'+o.id+'">Confirmar retirada</button>':'')+'</div>','svdd');}
function aoPickDlg(id){const o=id&&APP_ORDERS.find(x=>x.id===id);
 openDlg(dlgHead('Confirmar retirada',o?'Pedido #'+o.id+' · '+esc(o.who):'Digite o código que o comprador mostra no app.')+'<form id="aoPF" class="fgrid one" novalidate><label class="fld"><span class="fl">Código de retirada</span><input name="c" class="ao-cin" maxlength="4" autocomplete="off" placeholder="····" style="text-transform:uppercase"><span class="err"></span><span class="hint">'+(o?'Peça para '+esc(o.who.split(' ')[0])+' mostrar o código na tela do pedido.':'Só pedidos prontos para retirar podem ser entregues.')+'</span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Entregar pedido</button></div></form>','sm');
 const f=$('#aoPF'),i=f.elements.c;setTimeout(()=>i.focus(),60);i.addEventListener('input',()=>{i.value=i.value.toUpperCase().replace(/[^A-Z0-9]/g,'');i.closest('.fld').classList.remove('bad');});
 f.onsubmit=e=>{e.preventDefault();const v=i.value.trim(),bad=m=>{const fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;i.focus();};
  const x=o?(o.code===v?o:null):APP_ORDERS.find(y=>y.code===v);
  if(v.length<4)return bad('O código tem 4 caracteres');if(!x)return bad(o?'Código não confere com este pedido':'Nenhum pedido com esse código');
  if(x.st==='separando')return bad('Este pedido ainda está sendo separado');if(x.st==='retirado')return bad('Pedido já retirado em '+aoWhen(x.pickedAt));if(x.st==='cancelado')return bad('Pedido cancelado');
  x.st='retirado';x.pickedAt=aoNow();x.pickedBy=ME_NAME;closeDlg();render();toast('Pedido #'+x.id+' entregue para '+x.who.split(' ')[0]);};}
Object.assign(A,{
 aoOpen:v=>aoDetail(v),
 aoReady:(v,el,e)=>{if(e)e.stopPropagation();const o=APP_ORDERS.find(x=>x.id===v);o.st='pronto';o.readyAt=aoNow();o.readyBy=ME_NAME;closeDlg();render();toast('Pedido #'+o.id+' pronto · '+o.who.split(' ')[0]+' foi avisado no app');},
 aoPick:(v,el,e)=>{if(e)e.stopPropagation();closeDlg(true);setTimeout(()=>aoPickDlg(v),30);},
 aoCancel:v=>{const o=APP_ORDERS.find(x=>x.id===v);closeDlg();setTimeout(()=>confirmDel({title:'Cancelar o pedido #'+o.id+'?',body:'O valor de '+foodMoney(o.total)+' é estornado para '+esc(o.who)+' e os itens voltam ao estoque.',label:'Cancelar e estornar',onConfirm:()=>{o.st='cancelado';o.why='Cancelado pela loja';const sl=FOOD_SALES.find(x=>x.id===o.id);if(sl){sl.status='cancelled';sl.reason='Cancelado pela loja';}render();toast('Pedido cancelado e estornado');}}),50);}});
document.addEventListener('submit',e=>{if(e.target.id!=='aoFind')return;e.preventDefault();const q=norm($('#aoQ').value.trim());if(!q)return;const o=APP_ORDERS.find(x=>norm(x.code)===q)||APP_ORDERS.find(x=>norm(x.id)===q||norm('#'+x.id)===q)||APP_ORDERS.find(x=>norm(x.who).includes(q));if(o)aoDetail(o.id);else toast('Nenhum pedido encontrado');});
{const g=NAV.flatMap(x=>x[1]).find(i=>i[0]==='shop');if(g&&!g[3].some(x=>x[0]==='shop-orders'))g[3].splice(g[3].findIndex(x=>x[0]==='shop-sales')+1,0,['shop-orders','Pedidos do app']);}
{const base=foodPage;foodPage=function(){return S.active==='shop-orders'?aoPage():base.apply(this,arguments);};}
{const base=nxShopOverview;nxShopOverview=function(){const h=base.apply(this,arguments),sep=APP_ORDERS.filter(o=>o.st==='separando').length,rdy=APP_ORDERS.filter(o=>o.st==='pronto').length;
 const card='<section class="card ao-ov rise" style="--d:1"><span class="ao-ovi">'+ic('bag',20,1.9)+'</span><div class="ao-ft"><b>Pedidos do app</b><span class="who">'+(sep||rdy?(sep?sep+' para separar':'')+(sep&&rdy?' · ':'')+(rdy?rdy+' pronto'+(rdy>1?'s':'')+' para retirar':''):'Nenhum pedido em aberto')+'</span></div><div class="ao-ovk">'+(sep?'<span class="ao-pk sep">'+sep+'</span>':'')+(rdy?'<span class="ao-pk rdy">'+rdy+'</span>':'')+'</div><button class="btn sec sm" data-a="nav" data-v="shop-orders">Ver pedidos'+ic('arrowR',14,2)+'</button></section>';
 const k=h.indexOf('</header>');return k<0?card+h:h.slice(0,k+9)+card+h.slice(k+9);};}
{const base=nxSaleRows;nxSaleRows=function(){return base.apply(this,arguments).replace(/por App</g,'pelo app<');};}
{const base=nxSaleDetail;nxSaleDetail=function(id){const s=FOOD_SALES.find(x=>x.id===id);if(s&&s.app){aoDetail(s.app);return;}return base(id);};Object.assign(A,{nxSaleOpen:nxSaleDetail});}

/* ---- Discipulado e Acompanhamento: o encontro agendado mostra a resposta da pessoa convidada (como as Casas, mas com uma pessoa só) ---- */
const RS1_L={sim:'Aceitou',nao:'Recusou','':'Aguardando resposta'};
let _rs1=0;
const rsOne=m=>{if(!m.rsvp){const r=['','sim','nao'][(_rs1++)%3];m.rsvp={r,why:r==='nao'?'Compromisso de trabalho nesse horário':''};}return m.rsvp;};
const rsOneCls=r=>r==='sim'?'r-ok':r==='nao'?'r-no':'r-pe';
const rsOneChip=(m,act,key)=>{const r=rsOne(m).r;return '<button type="button" class="rsum rsone" data-a="'+act+'" data-v="'+key+'" title="Ver resposta"><span class="'+rsOneCls(r)+'">'+(r==='sim'?ic('check',11,2.6):r==='nao'?ic('x',11,2.6):ic('clock',11,2.2))+RS1_L[r]+'</span></button>';};
const rsOneBlock=(m,name,sub)=>{const x=rsOne(m);
 return '<section class="mv-b"><div class="mv-bh"><h3>Resposta ao convite</h3></div><div class="rs1">'+avN(name)+'<span class="dkt"><b>'+esc(name)+'</b><small>'+esc(sub)+'</small></span><span class="rs1-st '+rsOneCls(x.r)+'">'+RS1_L[x.r]+'</span></div>'
  +(x.r==='nao'?'<p class="rs1-why"><b>Motivo:</b> '+esc(x.why||'Sem motivo informado')+'</p>':'')
  +'<p class="rs-note">'+ic('info',13,2)+'A pessoa responde na Agenda do app e recebe um lembrete antes do encontro. A presença é registrada depois, ao concluir o encontro.</p></section>';};
const rsOneNudge=(m,name)=>!rsOne(m).r?'<button class="btn sec" data-a="rsOneNudge" data-v="'+esc(name)+'" style="margin-right:auto">'+ic('bell',14)+'Lembrar '+esc(name.split(' ')[0])+'</button>':'';
const rsOneInject=(h,find)=>h.replace(/<li class="sched">([\s\S]*?)<\/li>/g,(li,body)=>{const f=find(body);if(!f)return li;
 return li.replace(/(<div class="et"><div>)<b>([^<]*)<\/b>/,(m,a,t)=>a+'<b><button class="lnk record-title" data-a="'+f.act+'" data-v="'+f.key+'">'+t+'</button></b>')
  .replace(/(<span class="who">[^<]*<\/span>)(<\/div>\s*<div class="ea">)/,(m,a,b)=>a+rsOneChip(f.m,f.act,f.key)+b);});
{const _d=dEnc;dEnc=function(d){const h=_d.apply(this,arguments);
 return rsOneInject(h,body=>{const id=(body.match(/data-a="dConclude" data-v="([^"]+)"/)||[])[1],m=id&&d.meets.find(x=>x.id===id);return m?{m,act:'dInvView',key:id}:null;});};}
{const _c=careMeetings;careMeetings=function(c){const h=_c.apply(this,arguments);
 return rsOneInject(h,body=>{const k=(body.match(/data-a="cDone" data-v="([^"]+)"/)||[])[1],i=k&&+k.split('|')[1],m=k&&c.sched[i];return m?{m,act:'careInvView',key:k}:null;});};}
Object.assign(A,{
 dInvView:id=>{const d=dById(S.disc),m=d.meets.find(x=>x.id===id);if(!m)return;
  meetView({title:'Encontro agendado',sub:esc(d.n),d:m.d,state:'sched',stateL:'Agendado · '+nxEncWhen(m.d),time:(m.time||'').replace(':00','h'),mode:m.mode,where:m.mode==='Presencial'?m.where:'',blocks:[['Pauta',m.content],['Material de apoio',m.mat]],
   extra:rsOneBlock(m,d.n,d.role||'Discipulado'),edit:rsOneNudge(m,d.n),primary:'<button class="btn pri" data-a="dInvDone" data-v="'+id+'">Concluir encontro</button>'});},
 dInvDone:id=>{closeDlg();setTimeout(()=>A.dConclude(id),60);},
 careInvView:k=>{const [cid,i]=k.split('|'),c=cById(cid),m=c&&c.sched[+i];if(!m)return;
  meetView({title:'Encontro agendado',sub:esc(c.n),d:m.d,state:'sched',stateL:'Agendado · '+nxEncWhen(m.d),time:nxEncTime(m.t),mode:m.mode||'Pastoral',where:m.where,blocks:[['Situação','Ainda não aconteceu. Ao concluir, registre o que foi tratado e os próximos passos.']],
   extra:rsOneBlock(m,c.n,'Acompanhamento pastoral'),edit:rsOneNudge(m,c.n),primary:'<button class="btn pri" data-a="careInvDone" data-v="'+k+'">Concluir encontro</button>'});},
 careInvDone:k=>{closeDlg();setTimeout(()=>A.cDone(k),60);},
 rsOneNudge:v=>toast('Lembrete enviado para '+v.split(' ')[0])});

/* ---- Caixas de ministério e de evento: entradas, saídas e saldo (só na web, não aparece no app) ---- */
let _cxid=0,_cxe=0;
const CAIXAS=[];
const cxMoney=c=>R$(c/100);
const cxValid=x=>x.entries.filter(e=>!e.rev&&!e.est);
const cxIn=x=>cxValid(x).filter(e=>e.t==='in'&&!e.xfer).reduce((a,e)=>a+e.v,0);
const cxOut=x=>cxValid(x).filter(e=>e.t==='out'&&!e.xfer).reduce((a,e)=>a+e.v,0);
const cxXf=x=>cxValid(x).filter(e=>e.xfer).reduce((a,e)=>a+(e.t==='in'?e.v:-e.v),0);
const cxBal=x=>cxIn(x)-cxOut(x)+cxXf(x);
const cxXfer=(from,to,v,d,by)=>{const k=to.main?'Repasse':from.main?'Aporte':'Transferência';cxAdd(from,'out',v,d,k+' para '+to.name,k,by,{xfer:true});cxAdd(to,'in',v,d,k+(from.main?' do ':' de ')+from.name,k,by,{xfer:true});};
const cxOwnerName=x=>x.ownerType==='min'?'Ministério de '+((mnById(x.ownerId)||{}).n||'—'):((eById(x.ownerId)||{}).t||'Evento');
const cxOwnerKind=x=>x.ownerType==='min'?'Ministério':((eById(x.ownerId)||{}).kind==='culto'?'Culto':'Evento');
const cxNew=(type,id,name,o={})=>{const x={id:'cx'+(++_cxid),ownerType:type,ownerId:id,name,main:!!o.main,status:o.status||'aberto',closedAt:o.closedAt||'',entries:[]};CAIXAS.push(x);return x;};
const cxAdd=(x,t,v,d,desc,cat,by,o={})=>{x.entries.push(Object.assign({id:'ce'+(++_cxe),t,v:Math.round(v*100),d,desc,cat,by:by||'Rafael Pereira'},o));return x;};
const cxOwn=(type,id)=>{if(!CAIXAS.some(x=>x.ownerType===type&&x.ownerId===id&&x.main))cxNew(type,id,'Caixa principal',{main:true});
 return CAIXAS.filter(x=>x.ownerType===type&&x.ownerId===id).sort((a,b)=>(b.main-a.main)||((a.status==='encerrado')-(b.status==='encerrado'))||a.id.localeCompare(b.id,undefined,{numeric:true}));};
const cxCount=(type,id)=>cxOwn(type,id).length;
const cxPill=x=>x.status==='encerrado'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Encerrado</span>':x.main?'<span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>Principal</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Aberto</span>';
const CX_CATS={in:['Oferta ou doação','Inscrição','Venda','Aporte da igreja','Outros'],out:['Material','Alimentação','Transporte','Hospedagem','Serviços','Outros']};
function cxTab(type,id){
 const all=cxOwn(type,id),multi=true;
 const c=S.cx&&all.find(x=>x.id===S.cx);if(c)return cxView(c);S.cx=null;
 const v=multi&&S.cxv==='encerrado'?'encerrado':'aberto',list=multi?all.filter(x=>(x.status==='encerrado')===(v==='encerrado')):all;
 const nOpen=all.filter(x=>x.status!=='encerrado').length,nClosed=all.length-nOpen;
 const card=x=>'<article class="card bd-c cx-c" tabindex="0" data-a="cxOpen" data-v="'+x.id+'"><div class="bd-ct"><b>'+esc(x.name)+'</b>'+cxPill(x)+'</div><span class="cx-bal'+(cxBal(x)<0?' neg':'')+'">'+cxMoney(cxBal(x))+'</span><span class="who">Entradas <b class="cx-in">'+cxMoney(cxIn(x))+'</b> · Saídas <b class="cx-out">'+cxMoney(cxOut(x))+'</b></span><span class="who">'+cxValid(x).length+' lançamento'+(cxValid(x).length===1?'':'s')+(x.status==='encerrado'&&x.closedAt?' · encerrado em '+dBR(x.closedAt):'')+'</span></article>';
 return '<section class="card pc"><div class="sh"><div><h2>'+(multi?'Caixas':'Caixa')+'</h2><p class="who" style="margin:4px 0 0">'+(multi?'Controle o dinheiro do ministério. Há sempre o caixa principal; abra outros para separar o dinheiro de um retiro ou de uma campanha e encerre quando acabar.':'O dinheiro deste '+((eById(id)||{}).kind==='culto'?'culto':'evento')+'. Há sempre o caixa principal; abra outros para cada frente, como comida, recepção ou equipamento, e passe dinheiro entre eles.')+'</p></div>'+(multi?'<button class="btn pri sm" data-a="cxNewDlg" data-v="'+type+'|'+id+'">'+ic('plus',14,2.2)+'Novo caixa</button>':'')+'</div>'
  +'<p class="bd-note">'+ic('lock',13,2)+'Área restrita da web. Os caixas não aparecem no app.</p>'
  +(multi?'<div class="bd-seg"><div class="segc" role="group" aria-label="Situação dos caixas"><button data-a="cxV" data-v="aberto" aria-pressed="'+(v==='aberto')+'">Abertos<small>'+nOpen+'</small></button><button data-a="cxV" data-v="encerrado" aria-pressed="'+(v==='encerrado')+'">Encerrados<small>'+nClosed+'</small></button></div></div>':'')
  +(list.length?'<div class="bd-g">'+list.map(card).join('')+'</div>':'<div class="soft-empty"><p>Nenhum caixa encerrado.</p><span class="who">Os caixas encerrados ficam aqui, só para consulta, e podem ser reabertos.</span></div>')+'</section>';
}
function cxRows(c){
 const q=norm(S.cxq||''),f=S.cxf||'all',closed=c.status==='encerrado';
 const l=c.entries.filter(e=>(f==='all'||e.t===f)&&(!q||norm(e.desc+' '+e.cat+' '+e.by).includes(q))).slice().sort((a,b)=>b.d.localeCompare(a.d)||b.id.localeCompare(a.id,undefined,{numeric:true}));
 if(!l.length)return '<div class="soft-empty" style="padding:28px 16px"><p>'+(c.entries.length?'Nenhum lançamento corresponde ao filtro.':'Nenhum lançamento ainda.')+'</p>'+(c.entries.length||closed?'':'<span class="who">Registre a primeira entrada ou saída deste caixa.</span>')+'</div>';
 return '<div class="trow cx-r thead"><span>Lançamento</span><span>Categoria</span><span>Registrado por</span><span>Valor</span><span></span></div>'+l.map(e=>{
  const [y,m,d]=e.d.split('-'),sign=e.t==='in'?1:-1;
  return '<div class="trow cx-r'+(e.rev?' rev':'')+(e.est?' est':'')+'"><span class="tn"><span class="fd-dt"><b>'+(+d)+'</b><small>'+MONTHS[+m-1].slice(0,3)+'</small></span><span class="hn"><b>'+esc(e.desc)+'</b><span>'+dBR(e.d)+(e.file?' · '+ic('file',11,2)+' '+esc(e.file):'')+(e.rev?' · <em>estornado</em>':'')+'</span></span></span><span class="te">'+(e.xfer?ic('arrowRL',12,2)+' ':'')+esc(e.cat)+'</span><span class="tp">'+esc(e.by)+'</span><span class="ts cx-v '+(e.xfer?'xf':e.t)+'">'+(e.t==='in'?'+':'−')+cxMoney(e.v).replace('−','')+'</span><span class="cx-act">'+(!closed&&!e.rev&&!e.est&&!e.xfer?'<button class="ibtn sm" data-a="cxRev" data-v="'+c.id+'|'+e.id+'" aria-label="Estornar lançamento" title="Estornar lançamento">'+ic('undo',14)+'</button>':'')+'</span></div>';}).join('');}
function cxView(c){
 const closed=c.status==='encerrado',bal=cxBal(c),all=c.entries,others=cxOwn(c.ownerType,c.ownerId).filter(x=>x.id!==c.id&&x.status!=='encerrado'),canXfer=!closed&&(c.main?others.some(x=>!x.main):true);
 const chip=(v,l,n)=>'<button class="chipf '+((S.cxf||'all')===v?'on':'')+'" data-a="cxF" data-v="'+v+'">'+l+'<small>'+n+'</small></button>';
 const nIn=all.filter(e=>e.t==='in').length,nOut=all.filter(e=>e.t==='out').length;
 return '<section class="card pc cx-board"><div class="bd-top"><button class="btn sec sm" data-a="cxBack">'+ic('chevL',14,2)+'Caixas</button><div class="bd-tt"><h2>'+esc(c.name)+'</h2><span class="who">'+cxOwnerKind(c)+': '+esc(cxOwnerName(c))+(closed&&c.closedAt?' · encerrado em '+dBR(c.closedAt):'')+'</span></div>'+cxPill(c)
  +'<div class="pact">'+(canXfer?'<button class="btn sec sm" data-a="cxXfer" data-v="'+c.id+'">'+ic('arrowRL',14,2)+(c.main?'Enviar a um caixa':'Devolver ao principal')+'</button>':'')+(closed?'':'<button class="btn sec sm" data-a="cxEntry" data-v="'+c.id+'|out">'+ic('minus',14,2.2)+'Saída</button><button class="btn pri sm" data-a="cxEntry" data-v="'+c.id+'|in">'+ic('plus',14,2.2)+'Entrada</button>')
  +(closed?'<button class="btn sec sm" data-a="cxReopen" data-v="'+c.id+'">Reabrir caixa</button>':(c.main?'':'<button class="btn sec sm" data-a="cxClose" data-v="'+c.id+'">Encerrar caixa</button>'))
  +(c.main?'':'<span style="position:relative"><button class="ibtn" data-a="cxMenu" data-v="'+c.id+'" aria-label="Mais ações">'+ic('dots',17)+'</button><div class="pop" id="cxPop-'+c.id+'" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="cxRen" data-v="'+c.id+'">'+ic('pen',16)+'Renomear caixa</button><hr><button class="pi danger" data-a="cxDel" data-v="'+c.id+'">'+ic('x',16)+'Excluir caixa</button></div></span>')+'</div></div>'
  +(closed?'<p class="bd-note">'+ic('lock',13,2)+'Caixa encerrado: só para consulta. Reabra para fazer novos lançamentos.</p>':'')
  +'<div class="cx-kp"><div class="cx-k main"><span>Saldo</span><b class="'+(bal<0?'neg':'')+'">'+cxMoney(bal)+'</b>'+(bal<0?'<small>Saldo negativo: saiu mais do que entrou.</small>':'')+'</div><div class="cx-k"><span>Entradas</span><b class="cx-in">'+cxMoney(cxIn(c))+'</b></div><div class="cx-k"><span>Saídas</span><b class="cx-out">'+cxMoney(cxOut(c))+'</b></div><div class="cx-k"><span>Aportes e repasses</span><b class="cx-xf">'+(cxXf(c)>0?'+':'')+cxMoney(cxXf(c))+'</b><small class="cx-sub">'+(c.main?'Enviado e devolvido pelos outros caixas':'Recebido do principal, menos o devolvido')+'</small></div></div>'
  +'<div class="tbar cx-tb"><label class="sbox">'+ic('search',16)+'<input id="cxQ" placeholder="Buscar lançamento, categoria ou pessoa" value="'+esc(S.cxq||'')+'" autocomplete="off"></label><div class="chips">'+chip('all','Todos',all.length)+chip('in','Entradas',nIn)+chip('out','Saídas',nOut)+'</div></div>'
  +'<div class="cx-list" id="cxRows">'+cxRows(c)+'</div></section>';
}
function cxEntryDlg(cid,t){
 const c=CAIXAS.find(x=>x.id===cid);if(!c||c.status==='encerrado')return;
 openDlg(dlgHead('Novo lançamento',esc(c.name)+' · saldo '+cxMoney(cxBal(c)))+'<form id="cxF" class="fgrid" novalidate style="grid-template-columns:1fr 1fr">'
  +'<div class="fld wide"><span class="fl">Tipo</span><div class="yn" role="radiogroup"><label><input type="radio" name="t" value="in"'+(t==='in'?' checked':'')+'><span>'+ic('plus',14,2.2)+'&nbsp;Entrada</span></label><label><input type="radio" name="t" value="out"'+(t==='out'?' checked':'')+'><span>'+ic('minus',14,2.2)+'&nbsp;Saída</span></label></div></div>'
  +'<label class="fld"><span class="fl">Valor (R$)</span><input name="v" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0,00"><span class="err"></span></label>'
  +'<label class="fld"><span class="fl">Data</span><input type="date" name="d" value="'+myTd()+'" max="'+myTd()+'"><span class="err"></span></label>'
  +'<label class="fld wide"><span class="fl">Descrição</span><input name="desc" maxlength="80" autocomplete="off" placeholder="Ex.: Compra de cordas"><span class="err"></span></label>'
  +'<label class="fld"><span class="fl">Categoria</span><span class="selw"><select name="cat"></select>'+ic('updown',14)+'</span></label>'
  +'<label class="fld"><span class="fl">Comprovante <small>opcional</small></span><input type="file" name="file" accept="image/*,application/pdf"></label>'
  +'<p class="hint wide" id="cxH"></p>'
  +'<div class="dfoot wide"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Lançar</button></div></form>','sm');
 const f=$('#cxF'),typ=()=>f.elements.t.value,paint=()=>{const k=typ();f.elements.cat.innerHTML=CX_CATS[k].map(x=>'<option>'+x+'</option>').join('');
  const v=Math.round((+f.elements.v.value||0)*100);$('#cxH').textContent=k==='out'&&v>cxBal(c)?'Atenção: esta saída é maior que o saldo e deixa o caixa negativo.':'';};
 paint();f.addEventListener('change',e=>{if(e.target.name==='t')paint();});f.addEventListener('input',e=>{e.target.closest('.fld')?.classList.remove('bad');if(e.target.name==='v')paint();});
 f.onsubmit=e=>{e.preventDefault();const q=f.elements,bad=(n,m)=>{const i=q[n],fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;i.focus();};
  const v=+q.v.value;if(!(v>0))return bad('v','Informe um valor maior que zero');if(!q.d.value)return bad('d','Escolha a data');if(!q.desc.value.trim())return bad('desc','Descreva o lançamento');
  cxAdd(c,typ(),v,q.d.value,q.desc.value.trim(),q.cat.value,ME_NAME,{file:q.file.files&&q.file.files[0]?q.file.files[0].name:''});
  closeDlg();bdRe();toast((typ()==='in'?'Entrada':'Saída')+' de '+cxMoney(Math.round(v*100))+' lançada');};
}
function cxXferDlg(cid){
 const c=CAIXAS.find(x=>x.id===cid);if(!c||c.status==='encerrado')return;
 const all=cxOwn(c.ownerType,c.ownerId).filter(x=>x.id!==c.id&&x.status!=='encerrado'),dests=c.main?all.filter(x=>!x.main):all.filter(x=>x.main),bal=cxBal(c);
 if(!dests.length){toast('Crie outro caixa para passar dinheiro entre eles');return;}
 openDlg(dlgHead(c.main?'Enviar a um caixa':'Devolver ao caixa principal',(c.main?'Aporte do ':'Repasse de ')+esc(c.name)+' · saldo '+cxMoney(bal))+'<form id="cxX" class="fgrid one" novalidate>'
  +'<label class="fld"><span class="fl">'+(c.main?'Para qual caixa?':'Devolver para')+'</span><span class="selw"><select name="to"'+(c.main?'':' disabled')+'>'+dests.map(x=>'<option value="'+x.id+'">'+esc(x.name)+'</option>').join('')+'</select>'+(c.main?ic('updown',14):'')+'</span></label>'
  +'<label class="fld"><span class="fl">Valor (R$)</span><input name="v" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0,00"><span class="err"></span><span class="hint">Disponível neste caixa: '+cxMoney(bal)+'. Não dá para enviar mais do que o saldo.</span></label>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">'+(c.main?'Enviar':'Devolver')+'</button></div></form>','sm');
 const f=$('#cxX');f.addEventListener('input',()=>f.elements.v.closest('.fld').classList.remove('bad'));
 f.onsubmit=e=>{e.preventDefault();const v=Math.round((+f.elements.v.value||0)*100),fl=f.elements.v.closest('.fld'),bad=m=>{fl.classList.add('bad');fl.querySelector('.err').textContent=m;f.elements.v.focus();};
  if(!(v>0))return bad('Informe um valor maior que zero');if(v>bal)return bad('O saldo deste caixa é '+cxMoney(bal));
  const to=CAIXAS.find(x=>x.id===(c.main?f.elements.to.value:dests[0].id));cxXfer(c,to,v/100,myTd(),ME_NAME);closeDlg();bdRe();toast((c.main?'Aporte':'Repasse')+' de '+cxMoney(v)+' para '+to.name);};
}
function cxCloseDlg(cid){
 const c=CAIXAS.find(x=>x.id===cid);if(!c||c.main)return;const bal=cxBal(c),others=cxOwn(c.ownerType,c.ownerId).filter(x=>x.id!==c.id&&x.status!=='encerrado');
 openDlg(dlgHead('Encerrar este caixa?','O caixa fica só para consulta e pode ser reaberto.')+'<form id="cxC" class="fgrid one" novalidate>'
  +(bal>0?'<div class="fld"><span class="fl">O que fazer com o saldo de '+cxMoney(bal)+'?</span><span class="selw"><select name="dest">'+others.map(x=>'<option value="to:'+x.id+'">'+(x.main?'Devolver ao “'+esc(x.name)+'”':'Transferir para “'+esc(x.name)+'”')+'</option>').join('')+'<option value="church">Repassar à igreja</option><option value="keep">Deixar o saldo neste caixa encerrado</option></select>'+ic('updown',14)+'</span></div>':'<p class="who" style="margin:0">'+(bal<0?'O saldo está negativo ('+cxMoney(bal)+'). Ele será mantido no caixa encerrado.':'O saldo é zero. Nada a transferir.')+'</p>')
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Encerrar caixa</button></div></form>','sm');
 $('#cxC').onsubmit=e=>{e.preventDefault();const dest=bal>0?e.target.elements.dest.value:'keep',t=myTd();
  if(dest.startsWith('to:')){const to=CAIXAS.find(x=>x.id===dest.slice(3));cxXfer(c,to,bal/100,t,ME_NAME);}
  else if(dest==='church')cxAdd(c,'out',bal/100,t,'Repasse à igreja no encerramento','Repasse',ME_NAME);
  c.status='encerrado';c.closedAt=t;closeDlg();S.cxv='encerrado';bdRe();toast('Caixa encerrado');};
}
Object.assign(A,{
 cxOpen:v=>{S.cx=v;S.cxf='all';S.cxq='';bdRe();},cxBack:()=>{S.cx=null;bdRe();},cxV:v=>{S.cxv=v;bdRe();},cxF:v=>{S.cxf=v;bdRe();},
 cxMenu:v=>{const p=$('#cxPop-'+v);closePops(p);p.classList.toggle('open');},
 cxEntry:v=>{const [id,t]=v.split('|');cxEntryDlg(id,t);},
 cxClose:v=>cxCloseDlg(v),cxXfer:v=>cxXferDlg(v),
 cxReopen:v=>{const c=CAIXAS.find(x=>x.id===v);c.status='aberto';c.closedAt='';S.cxv='aberto';bdRe();toast('Caixa reaberto');},
 cxNewDlg:v=>{const [type,id]=v.split('|');nxNameDlg('Novo caixa','Um caixa separado, por exemplo para um retiro ou uma campanha.','','Ex.: Retiro de jovens 2027',x=>{if(!x)return 'Dê um nome';const n=cxNew(type,id,x);S.cx=n.id;S.cxv='aberto';S.cxf='all';S.cxq='';closeDlg();bdRe();toast('Caixa criado');});},
 cxRen:v=>{closePops();const c=CAIXAS.find(x=>x.id===v);nxNameDlg('Renomear caixa','',c.name,'Nome do caixa',x=>{if(!x)return 'Dê um nome';c.name=x;closeDlg();bdRe();toast('Caixa renomeado');});},
 cxDel:v=>{closePops();const c=CAIXAS.find(x=>x.id===v),n=c.entries.length;confirmDel({title:'Excluir '+esc(c.name)+'?',body:(n?'Os '+n+' lançamentos serão apagados. ':'')+'Para guardar o histórico do dinheiro, prefira encerrar o caixa.',typed:n?c.name:null,onConfirm:()=>{CAIXAS.splice(CAIXAS.indexOf(c),1);S.cx=null;bdRe();toast('Caixa excluído');}});},
 cxRev:v=>{const [cid,eid]=v.split('|'),c=CAIXAS.find(x=>x.id===cid),e=c&&c.entries.find(x=>x.id===eid);if(!e)return;
  confirmDel({title:'Estornar este lançamento?',body:'“'+esc(e.desc)+'” ('+(e.t==='in'?'entrada':'saída')+' de '+cxMoney(e.v)+') continua na lista, marcado como estornado, e um lançamento contrário desfaz o efeito no saldo. Nada é apagado.',label:'Estornar',onConfirm:()=>{e.rev=true;c.entries.push({id:'ce'+(++_cxe),t:e.t==='in'?'out':'in',v:e.v,d:myTd(),desc:'Estorno: '+e.desc,cat:'Estorno',by:ME_NAME,est:true,of:e.id});bdRe();toast('Lançamento estornado');}});}
});
document.addEventListener('input',e=>{if(e.target.id!=='cxQ')return;S.cxq=e.target.value;const c=CAIXAS.find(x=>x.id===S.cx),box=$('#cxRows');if(c&&box)box.innerHTML=cxRows(c);});
for(const k of ['nav','mnOpen','mnTab','evOpen','evTab']){const base=A[k];if(base)A[k]=function(){S.cx=null;S.cxv='aberto';S.cxf='all';S.cxq='';return base.apply(this,arguments);};}
/* dados de demonstração */
(()=>{const mi=n=>(MINIS.find(m=>m.n===n)||{}).id;
 const lo=mi('Louvor');if(lo){const p=cxNew('min',lo,'Caixa principal',{main:true});
  cxAdd(p,'in',2500,'2026-07-05','Aporte da igreja · 3º trimestre','Aporte da igreja','Rafael Pereira');
  cxAdd(p,'out',386.9,'2026-07-18','Cordas e palhetas','Material','Ana Clara Lima',{file:'nota-cordas.pdf'});
  cxAdd(p,'out',420,'2026-08-02','Manutenção do teclado','Serviços','Ana Clara Lima',{file:'recibo-teclado.jpg'});
  cxAdd(p,'in',340,'2026-08-16','Venda de CDs do ministério','Venda','Rafael Pereira');
  cxAdd(p,'out',128.5,'2026-09-12','Lanche do ensaio geral','Alimentação','Ana Clara Lima');
  const bad=cxAdd(p,'out',64,'2026-09-19','Impressão de cifras (valor errado)','Material','Ana Clara Lima');const bi=bad.entries[bad.entries.length-1];bi.rev=true;
  cxAdd(p,'in',64,'2026-09-19','Estorno: Impressão de cifras (valor errado)','Estorno','Rafael Pereira',{est:true,of:bi.id});
  cxAdd(p,'out',46,'2026-09-19','Impressão de cifras','Material','Ana Clara Lima');
  cxAdd(p,'in',600,'2026-09-27','Oferta para o ministério','Oferta ou doação','Rafael Pereira');
  const r=cxNew('min',lo,'Retiro de Louvor 2026');
  cxAdd(r,'in',4800,'2026-09-01','Inscrições do retiro (24 pessoas)','Inscrição','Rafael Pereira');
  cxAdd(r,'out',1500,'2026-09-05','Sinal da chácara','Hospedagem','Ana Clara Lima',{file:'contrato-chacara.pdf'});
  cxAdd(r,'out',612.3,'2026-09-26','Compras do mercado','Alimentação','Ana Clara Lima');
  cxXfer(p,r,1000,'2026-09-02','Rafael Pereira');cxXfer(r,p,200,'2026-09-29','Ana Clara Lima');
  const n=cxNew('min',lo,'Cantata de Natal 2025',{status:'encerrado',closedAt:'2026-01-10'});
  cxAdd(n,'in',1800,'2025-11-20','Aporte da igreja para a cantata','Aporte da igreja','Rafael Pereira');
  cxAdd(n,'out',950,'2025-12-10','Figurinos e cenário','Material','Ana Clara Lima');
  cxAdd(n,'out',310,'2025-12-21','Lanche da apresentação','Alimentação','Ana Clara Lima');
  cxAdd(n,'out',540,'2026-01-10','Repasse à igreja no encerramento','Repasse','Rafael Pereira');}
 const re=mi('Recepção');if(re){const p=cxNew('min',re,'Caixa principal',{main:true});
  cxAdd(p,'in',800,'2026-08-10','Aporte da igreja · materiais','Aporte da igreja','Rafael Pereira');
  cxAdd(p,'out',214.8,'2026-08-24','Crachás e cordões','Material','Juliana Reis',{file:'nota-crachas.pdf'});}
 const cm=EVTS.find(e=>e.t==='Congresso de Mulheres 2027');if(cm){const p=cxNew('evt',cm.id,'Caixa principal',{main:true});
  cxAdd(p,'in',5000,'2026-09-02','Aporte inicial da igreja','Aporte da igreja','Rafael Pereira');
  cxAdd(p,'in',3000,'2026-09-15','Patrocínio · Livraria Esperança','Oferta ou doação','Diego Martins');
  cxAdd(p,'out',2000,'2026-09-20','Sinal do auditório','Serviços','Diego Martins',{file:'contrato-auditorio.pdf'});
  cxAdd(p,'out',380,'2026-09-24','Arte e impressão dos crachás','Material','Diego Martins');
  cxAdd(p,'out',1200,'2026-09-28','Contratação de som','Serviços','Diego Martins',{file:'orcamento-som.pdf'});
  const al=cxNew('evt',cm.id,'Alimentação'),rc=cxNew('evt',cm.id,'Recepção');
  cxXfer(p,al,1500,'2026-09-29','Rafael Pereira');cxXfer(p,rc,600,'2026-09-29','Rafael Pereira');
  cxAdd(al,'out',520,'2026-09-30','Coffee break · sinal ao buffet','Alimentação','Juliana Reis',{file:'sinal-buffet.pdf'});
  cxAdd(rc,'out',140,'2026-09-30','Cordões e porta-crachás','Material','Juliana Reis');}
})();

