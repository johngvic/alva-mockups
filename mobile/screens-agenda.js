/* ===== Agenda no app administrativo (Tiago, 08/11/2026) =====
 * Situação do evento: Confirmado ou Previsão. Cerimônia (Apresentação, Batismo, Consagração, Casamento): pessoa Pendente, Confirmado, Realizado, Recusado ou Cancelado.
 * Inscrição: Confirmada, Pendente ou Cancelada, com o pagamento (Pago, Pendente, Gratuita, Reembolso solicitado, Reembolsado) e o check-in.
 * O app decide e opera na porta: confirmar ou recusar pedido, marcar realizado, check-in, marcar como pago, reenviar link, ver as escalas da data.
 * Criar evento, série, local, ingressos, vouchers, publicação, cancelar compra com reembolso e venda de balcão ficam na web. */
const AG_EV_ST={cf:['ok','Confirmado'],tt:['info','Previsão']};
const AG_PS={pe:['warning','Pendente'],cf:['ok','Confirmado'],co:['info','Realizado'],re:['danger','Recusado'],ca:['off','Cancelado']};
const AG_TYPE={ret:'Retiro',conf:'Conferência',esp:'Evento especial',cul:'Culto',apr:'Apresentação',bat:'Batismo',con:'Consagração',cas:'Casamento'};
const AG_BRL=n=>'R$ '+n.toFixed(2).replace('.',',');
const agDay=iso=>sclDate(iso);
/* eventos, cultos e datas de cerimônia (as datas andam junto com o dia de hoje) */
function agMk(o){const e=Object.assign({min:'—',where:'',time:'',rec:'',ppl:[],vagas:0,paid:false,ck:false,prev:''},o);e.date=e.d0==null?'':cuISO(e.d0);e.date2=e.d1==null?'':cuISO(e.d1);return e;}
const AGE=[
 agMk({id:'ev1',n:'Conferência Anual 2026',t:'conf',st:'cf',d0:12,d1:14,time:'19:00',where:'Templo',min:'Eventos',vagas:120,paid:true,ck:true}),
 agMk({id:'ev2',n:'Conferência de Missões',t:'conf',st:'cf',d0:20,time:'09:00',where:'Auditório',min:'Eventos',vagas:60,paid:false,ck:true}),
 agMk({id:'ev3',n:'Retiro de Jovens 2026',t:'ret',st:'tt',prev:'dezembro',min:'Jovens e Adolescentes',vagas:60,paid:true}),
 agMk({id:'cu1',n:'Culto de Celebração',t:'cul',st:'cf',d0:0,time:'10:00 e 18:30',where:'Templo',rec:'Todo domingo'}),
 agMk({id:'cu2',n:'Culto Kids',t:'cul',st:'cf',d0:0,time:'09:00',where:'Sala Kids',min:'Infantil',rec:'Todo domingo'}),
 agMk({id:'cu3',n:'Culto de Jovens',t:'cul',st:'cf',d0:6,time:'19:30',where:'Auditório',min:'Jovens e Adolescentes',rec:'Todo sábado'}),
 agMk({id:'ap1',n:'Apresentação de Crianças',t:'apr',st:'cf',d0:21,time:'10:00',where:'Templo',vagas:6,ppl:[{n:'Helena Pereira',sub:'Rafael e Camila Pereira',st:'pe'},{n:'Miguel Souza',sub:'Gabriel e Isabela Souza',st:'cf'},{n:'Laura Dias',sub:'Henrique e Larissa Dias',st:'pe'}]}),
 agMk({id:'ap2',n:'Apresentação de Crianças',t:'apr',st:'tt',prev:'janeiro',vagas:6}),
 agMk({id:'ba1',n:'Batismo nas Águas',t:'bat',st:'cf',d0:28,time:'16:00',where:'Templo',vagas:20,ppl:[{n:'Carlos Mendes',sub:'Concluiu a classe de batismo',st:'pe'},{n:'Luana Souza',sub:'Concluiu a classe de batismo',st:'cf'},{n:'Paulo Alves',sub:'Falta uma aula da classe',st:'pe'},{n:'Renata Dias',sub:'Concluiu a classe de batismo',st:'cf'}]}),
 agMk({id:'co1',n:'Consagração de Diáconos',t:'con',st:'cf',d0:35,time:'10:00',where:'Templo',vagas:4,ppl:[{n:'Ana Costa',sub:'Diaconato',st:'cf'},{n:'Bruno Reis',sub:'Diaconato',st:'pe'}]}),
 agMk({id:'cs1',n:'Casamento de Tiago e Vera Campos',t:'cas',st:'cf',d0:6,time:'16:00',where:'Templo',vagas:1,ppl:[{n:'Tiago e Vera Campos',sub:'Celebrante: Pr. Marcos Lima',st:'cf'}]}),
 agMk({id:'cs2',n:'Casamento de Bruno e Clara Nunes',t:'cas',st:'cf',d0:34,time:'17:00',where:'Templo',vagas:1,ppl:[{n:'Bruno e Clara Nunes',sub:'Aguardando a documentação',st:'pe'}]})
];
const agOf=id=>AGE.find(e=>e.id===id);
const agOcc=e=>e.ppl.filter(p=>p.st==='cf'||p.st==='co').length;
const agPendN=e=>e.ppl.filter(p=>p.st==='pe').length;
/* inscrições (cada linha é uma compra de ingresso) */
const AGR=[
 {id:'ir1',n:'Carlos Mendes',ev:'ev1',tk:'Inscrição geral',val:80,pay:'pe',st:'pe',ck:'',fm:''},
 {id:'ir2',n:'Luana Souza',ev:'ev1',tk:'Inscrição geral',val:80,pay:'pg',st:'cf',ck:'',fm:'Pix'},
 {id:'ir3',n:'Renata Dias',ev:'ev1',tk:'Estudante',val:40,pay:'pg',st:'cf',ck:'18:42',fm:'Cartão'},
 {id:'ir4',n:'Tiago Lima',ev:'ev1',tk:'Inscrição geral',val:80,pay:'rb',st:'ca',ck:'',fm:'Pix'},
 {id:'ir5',n:'Paulo Alves',ev:'ev1',tk:'Estudante',val:40,pay:'pe',st:'pe',ck:'',fm:''},
 {id:'ir6',n:'Elisa Moura',ev:'ev1',tk:'Inscrição geral',val:80,pay:'pg',st:'cf',ck:'',fm:'Dinheiro (balcão)'},
 {id:'ir7',n:'Clara Nunes',ev:'ev2',tk:'Entrada',val:0,pay:'gr',st:'cf',ck:'',fm:''},
 {id:'ir8',n:'Bruno Reis',ev:'ev2',tk:'Entrada',val:0,pay:'gr',st:'cf',ck:'',fm:''},
 {id:'ir9',n:'Diego Faria',ev:'ev2',tk:'Entrada',val:0,pay:'gr',st:'ca',ck:'',fm:''}];
AGR.forEach(x=>{Object.defineProperties(x,{
 v:{get(){return {evento:(agOf(x.ev)||{}).n};},enumerable:true},
 s:{get(){const e=agOf(x.ev);return e.n+' · '+x.tk+' · '+agPayTx(x);},enumerable:true},
 d:{get(){const e=agOf(x.ev);return [['Evento',e.n],['Ingresso',x.tk],['Valor',x.val?AG_BRL(x.val):'Gratuito'],['Pagamento',agPayTx(x)],['Check-in',x.ck?'Entrou às '+x.ck:x.st==='ca'?'—':x.st==='pe'?'Aguardando pagamento':'Aguardando']];},enumerable:true}});});
function agPayTx(x){return {pg:'Pago'+(x.fm?' · '+x.fm:''),pe:'Pendente · '+AG_BRL(x.val),gr:'Gratuita',rr:'Reembolso solicitado',rb:'Reembolsado'}[x.pay];}
const agRegs=e=>AGR.filter(x=>x.ev===e.id);
/* linhas do evento / culto / cerimônia no motor de lista */
AGE.forEach(e=>{Object.defineProperties(e,{
 s:{get(){const w=e.st==='tt'?'Previsão para '+e.prev:(e.rec?e.rec+' · '+e.time:agDay(e.date)+(e.date2?' a '+agDay(e.date2):'')+' · '+e.time);
   if(['apr','bat','con','cas'].includes(e.t)){const p=agPendN(e);return w+(e.st==='cf'?' · '+agOcc(e)+' de '+e.vagas+(e.vagas===1?' vaga':' vagas')+(p?' · '+p+(p===1?' pendente':' pendentes'):''):'');}
   if(e.vagas&&e.st==='cf'){const r=agRegs(e).filter(x=>x.st!=='ca').length;return w+' · '+r+' de '+e.vagas+' inscritos';}return w;},enumerable:true},
 d:{get(){return [['Tipo',AG_TYPE[e.t]],['Quando',e.st==='tt'?'Previsão para '+e.prev:(e.rec?e.rec+' · '+e.time:agDay(e.date)+(e.date2?' a '+agDay(e.date2):'')+' · '+e.time)],['Onde',e.where||'A definir ao confirmar a data'],...(e.min!=='—'?[['Ministério',e.min]]:[]),...(e.vagas?[['Vagas',String(e.vagas)]]:[])];},enumerable:true}});});
/* escalas de uma data (somente leitura aqui; a linha abre a escala) */
function agScales(e){if(e.t!=='cul'&&e.t!=='conf'&&e.t!=='ret'&&e.t!=='esp')return '';
 const l=SCL.filter(s=>s.dates.some(d=>d.title===e.n&&d.date>=cuToday())).map(s=>({s,d:s.dates.filter(d=>d.title===e.n&&d.date>=cuToday()).sort((a,b)=>a.date.localeCompare(b.date))[0]}));
 return `<div class="stack g2"><p class="eb2">Escalas</p>${l.length?`<div class="vl">${l.map(({s,d})=>{const c=sclCount(s);return `<button class="vr tap" data-a="sclOpen" data-v="${s.id}|"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(s.n)}</span><span class="vs">${agDay(d.date)} · ${c.ac} de ${c.tot} aceitaram</span></span>${vsTag(SCL_ST[s.st][0],SCL_ST[s.st][1])}</button>`;}).join('')}</div>`:'<p class="vs">Nenhuma escala para esta data.</p>'}</div>`;}
/* ficha do evento especial: faixa de inscritos e os atalhos da porta */
function agEvExtra(r){const ed=can('agenda','editar');let h='';
 if(r.vagas&&r.st==='cf'){const l=agRegs(r),ins=l.filter(x=>x.st!=='ca'),pg=ins.filter(x=>x.pay==='pg'),pen=ins.filter(x=>x.pay==='pe'),prev=ins.reduce((a,x)=>a+x.val,0),rec=pg.reduce((a,x)=>a+x.val,0);
  h+=`<div class="vk"><div><b>${ins.length}/${r.vagas}</b><span>Inscritos</span></div><div><b>${prev?AG_BRL(rec).replace(',00',''):'Gratuito'}</b><span>${prev?'Arrecadado de '+AG_BRL(prev).replace(',00',''):'Sem valor'}</span></div><div><b>${pen.length}</b><span>Pagamentos pendentes</span></div></div>`;
  if(ed)h+=`<div class="row g3"><button class="btn outline md grow" data-a="evCk" data-v="${r.id}">Check-in</button><button class="btn outline md grow" data-a="evTk" data-v="${r.id}">Ingressos</button></div>`;}
 if(r.st==='tt')h+='<p class="callout">Evento em previsão. Confirmar a data e o local é feito na web.</p>';
 return h+agScales(r)+(r.t==='cul'||r.vagas?qdBlock(r.id,'')+cxBlock(r.id,''):'');}
/* cerimônias: pessoas do dia, com as decisões */
function agCerExtra(r){const ok=r.st==='cf';
 if(!ok)return '<p class="callout">Data em previsão. As pessoas entram quando a data for confirmada, na web.</p>';
 return `<div class="stack g2"><div class="row between" style="align-items:center"><p class="eb2">Pessoas · ${agOcc(r)} de ${r.vagas} ${r.vagas===1?'vaga':'vagas'}</p></div>${r.ppl.length?fndBox('agPl','Buscar pessoa')+`<div class="vl" id="agPl">${r.ppl.map((p,i)=>`<button class="vr tap" data-q="${esc(p.n)}" data-a="agPers" data-v="${r.id}|${i}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(p.n)}</span><span class="vs">${esc(p.sub)}${p.why?' · '+esc(p.why):''}</span></span>${vsTag(AG_PS[p.st][0],AG_PS[p.st][1])}</button>`).join('')}</div>`:vsEmpty('Ninguém ainda','Os pedidos chegam pelo app dos membros.')}</div>`;}
function agPersSheet(id,i){const r=agOf(id),p=r.ppl[i],ed=can('agenda','editar'),btns=[];
 if(ed&&r.st==='cf'){
  if(p.st==='pe'){btns.push(`<button class="btn primary md block" data-a="agPAct" data-v="${id}|${i}|cf">Confirmar</button>`,`<button class="btn outline md block" data-a="agPAct" data-v="${id}|${i}|re">Recusar</button>`);}
  if(p.st==='cf'){if(r.date<=cuToday())btns.push(`<button class="btn primary md block" data-a="agPAct" data-v="${id}|${i}|co">Marcar como realizado</button>`);btns.push(`<button class="btn outline md block" data-a="agPAct" data-v="${id}|${i}|ca">Cancelar</button>`);}}
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(p.n)}</h3><span class="vs">${esc(r.n)} · ${agDay(r.date)} · ${r.time}</span><span class="vs">${esc(p.sub)}</span>${vsTag(AG_PS[p.st][0],AG_PS[p.st][1])}</div>
  ${p.st==='re'&&p.why?`<p class="callout">Motivo: ${esc(p.why)}</p>`:''}${p.st==='pe'&&agOcc(r)>=r.vagas?'<p class="callout">Todas as vagas desta data estão ocupadas.</p>':''}
  <div class="stack g3">${btns.join('')}<button class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div></div>`);}
/* inscrições: ficha com check-in e pagamento */
function agRegExtra(r){const ed=can('agenda','editar'),e=agOf(r.ev);if(!ed||r.st==='ca')return '';const b=[];
 if(r.st==='cf')b.push(r.ck?`<button class="btn outline md block" data-a="agRegCk" data-v="${r.id}">Desfazer check-in</button>`:`<button class="btn primary md block" data-a="agRegCk" data-v="${r.id}">Fazer check-in</button>`);
 if(r.pay==='pe')b.push(`<button class="btn primary md block" data-a="agRegPay" data-v="${r.id}">Marcar como pago</button>`,`<button class="btn outline md block" data-a="agRegLink" data-v="${r.id}">Reenviar link de pagamento</button>`);
 return b.length?`<div class="stack g3">${b.join('')}</div>`:'';}
Object.assign(A,{
 agPers:v=>{const [id,i]=v.split('|');agPersSheet(id,+i);},
 agPAct:v=>{const [id,i,act]=v.split('|'),r=agOf(id),p=r.ppl[+i];
  if(act==='cf'){if(agOcc(r)>=r.vagas){toast('error','Sem vagas','Todas as vagas desta data estão ocupadas.');return;}p.st='cf';closeSheet().then(()=>{softRender();toast('success','Confirmado',p.n.split(' ')[0]+' recebe o aviso por e-mail e no app.');A.lsOpen(id);});return;}
  if(act==='co'){p.st='co';closeSheet().then(()=>{softRender();toast('success','Marcado como realizado',p.n);A.lsOpen(id);});return;}
  if(act==='ca'){vsConfirm('Cancelar '+esc(p.n.split(' ')[0])+'?',esc(p.n)+' deixa a lista e a vaga volta a ficar livre.','Cancelar',()=>{p.st='ca';closeSheet().then(()=>{softRender();toast('info','Cancelado',p.n);A.lsOpen(id);});});return;}
  reasonSheet({title:'Recusar pedido',callout:esc(p.n)+' · '+esc(r.n)+' · '+agDay(r.date),ph:'Ex.: faltam documentos; que tal a próxima data?',btn:'Recusar',who:p.n.split(' ')[0],done:'Recusado',run:async why=>{p.st='re';p.why=why;await closeSheet();softRender();toast('info','Pedido recusado',p.n.split(' ')[0]+' vê o motivo no app.');A.lsOpen(id);}});},
 agRegCk:id=>{const x=AGR.find(y=>y.id===id);x.ck=x.ck?'':new Date().toTimeString().slice(0,5);closeSheet().then(()=>{softRender();toast('success',x.ck?'Check-in feito':'Check-in desfeito',x.n);A.lsOpen(id);});},
 agRegPay:id=>{const x=AGR.find(y=>y.id===id);
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Marcar como pago</h3><p class="callout">${esc(x.n)} · ${esc(x.tk)} · ${AG_BRL(x.val)}</p></div>
   <div class="vl">${['Pix','Cartão','Dinheiro'].map(f=>`<button class="vr tap" data-a="agRegPayGo" data-v="${id}|${f}"><span class="grow vn">${f}</span><span class="vs">Pago no balcão</span></button>`).join('')}</div><button class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div>`);},
 agRegPayGo:v=>{const [id,f]=v.split('|'),x=AGR.find(y=>y.id===id);x.pay='pg';x.st='cf';x.fm=f+' (balcão)';closeSheet().then(()=>{softRender();toast('success','Pagamento registrado',x.n.split(' ')[0]+' · '+f);A.lsOpen(id);});},
 agRegLink:id=>{const x=AGR.find(y=>y.id===id);toast('success','Link reenviado',x.n.split(' ')[0]+' recebe o link de pagamento.');}
});
/* calendário: o que acontece nos próximos dias (consulta) */
/* Agenda da Gestão: o mesmo calendário do membro (toca no dia, aparece embaixo), com os eventos, cultos e cerimônias da igreja */
const agcSt=()=>{if(!S.agc){const t=new Date();S.agc={y:t.getFullYear(),m:t.getMonth()+1,sel:t.getDate()};}return S.agc;};
const agcIso=(y,m,d)=>y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
const agcKind=e=>e.t==='cul'?'cu':['apr','bat','con','cas'].includes(e.t)?'ce':'ev';
const agcTone={ev:'laranja',cu:'menta',ce:'oceano'};
function agcDay(y,m,d){const iso=agcIso(y,m,d),wd=new Date(iso+'T12:00:00').getDay(),out=[];
 AGE.filter(e=>e.st==='cf'&&e.date).forEach(e=>{const hit=e.rec?new Date(e.date+'T12:00:00').getDay()===wd:e.date2?(iso>=e.date&&iso<=e.date2):iso===e.date;
  if(hit)out.push({n:e.n,time:e.time,k:agcKind(e),t:e.t,where:e.where});});
 return out.sort((p,q)=>p.time.localeCompare(q.time));}
function agCalBody(){const c=agcSt(),{y,m,sel}=c,first=new Date(y,m-1,1).getDay(),days=new Date(y,m,0).getDate(),prev=new Date(y,m-1,0).getDate(),t=new Date(),todayIso=agcIso(t.getFullYear(),t.getMonth()+1,t.getDate());
 let cells=['D','S','T','Q','Q','S','S'].map((d,i)=>'<span class="dow'+(i===0?' sun':'')+'">'+d+'</span>').join('');
 for(let i=first-1;i>=0;i--)cells+='<span class="day out" aria-hidden="true"><span class="n">'+(prev-i)+'</span></span>';
 for(let d=1;d<=days;d++){const ev=agcDay(y,m,d),iso=agcIso(y,m,d);
  cells+='<button class="day'+(ev.length?' has':'')+(iso===todayIso?' today':'')+(d===sel?' sel':'')+(iso<todayIso?' past':'')+'" data-a="agcPick" data-v="'+d+'" aria-label="'+d+' de '+MONTHS[m-1]+(ev.length?', '+ev.length+(ev.length>1?' compromissos':' compromisso'):'')+'"'+(d===sel?' aria-pressed="true"':'')+'><span class="n">'+d+'</span><span class="mk">'+ev.slice(0,3).map(x=>'<i style="background:'+(MK[agcTone[x.k]]||'var(--ink-muted)')+'"></i>').join('')+'</span></button>';}
 const trail=(7-(first+days)%7)%7;for(let d=1;d<=trail;d++)cells+='<span class="day out" aria-hidden="true"><span class="n">'+d+'</span></span>';
 const dayEv=agcDay(y,m,sel),isNow=y===t.getFullYear()&&m===t.getMonth()+1&&sel===t.getDate(),selIso=agcIso(y,m,sel);
 const nxt=[];for(let n=1;n<=14&&nxt.length<6;n++){const d=new Date(y,m-1,sel+n);agcDay(d.getFullYear(),d.getMonth()+1,d.getDate()).forEach(x=>nxt.push(Object.assign({iso:agcIso(d.getFullYear(),d.getMonth()+1,d.getDate())},x)));}
 const tag_=x=>vsTag(x.k==='cu'?'ok':x.k==='ce'?'info':'warning',AG_TYPE[x.t]);
 const li=x=>'<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">'+esc(x.n)+'</span><span class="vs">'+x.time+(x.where?' · '+esc(x.where):'')+'</span></span>'+tag_(x)+'</div>';
 return '<div class="row between"><b class="t2">'+MONTHS[m-1]+' de '+y+'</b><div class="row g2">'+(isNow?'':'<button class="tlink" data-a="agcToday">Hoje</button>')+'<button class="iconbtn" data-a="agcMonth" data-v="-1" aria-label="Mês anterior">'+ic('chevL',18,2.25)+'</button><button class="iconbtn" data-a="agcMonth" data-v="1" aria-label="Próximo mês">'+ic('chevR',18,2.25)+'</button></div></div>'
  +'<div class="card cal"><div class="cal-grid" id="calGrid">'+cells+'</div><div class="cal-foot"><span class="lg"><i style="background:'+MK.laranja+'"></i>Eventos</span><span class="lg"><i style="background:'+MK.menta+'"></i>Cultos</span><span class="lg"><i style="background:'+MK.oceano+'"></i>Cerimônias</span></div></div>'
  +'<section class="stack g2"><p class="eb2">'+(isNow?'Hoje · ':'')+agDay(selIso)+'</p>'+(dayEv.length?'<div class="vl">'+dayEv.map(li).join('')+'</div>':vsEmpty('Dia livre','Nada marcado para este dia.'))+'</section>'
  +(nxt.length?'<section class="stack g2"><p class="eb2">Nos próximos dias</p><div class="vl">'+nxt.map(x=>'<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">'+esc(x.n)+'</span><span class="vs">'+agDay(x.iso)+' · '+x.time+'</span></span>'+tag_(x)+'</div>').join('')+'</div></section>':'');}
Object.assign(A,{agcPick:v=>{agcSt().sel=+v;softRender();},agcMonth:v=>{const c=agcSt();let m=c.m+(+v),y=c.y;if(m<1){m=12;y--;}if(m>12){m=1;y++;}c.m=m;c.y=y;const t=new Date();c.sel=(y===t.getFullYear()&&m===t.getMonth()+1)?t.getDate():1;softRender();},agcToday:()=>{S.agc=null;agcSt();softRender();}});
Object.assign(A,{agCf:v=>{S.ag=S.ag||{};S.ag.cf=v;softRender();}});
/* as seções */
{const ofT=(...ts)=>AGE.filter(e=>ts.includes(e.t));
 Object.assign(LSD.agenda,{
  'Eventos':{noun:'eventos',ST:AG_EV_ST,acts:[],extra:agEvExtra,rows:ofT('ret','conf','esp')},
  'Cultos':{noun:'cultos',ST:{cf:AG_EV_ST.cf},acts:[],extra:agEvExtra,rows:ofT('cul')},
  'Apresentações':{noun:'datas',ST:AG_EV_ST,acts:[],extra:agCerExtra,rows:ofT('apr')},
  'Batismos':{noun:'datas',ST:AG_EV_ST,acts:[],extra:agCerExtra,rows:ofT('bat')},
  'Consagrações':{noun:'datas',ST:AG_EV_ST,acts:[],extra:agCerExtra,rows:ofT('con')},
  'Casamentos':{noun:'datas',ST:AG_EV_ST,acts:[],extra:agCerExtra,rows:ofT('cas')},
  'Calendário':{custom:agCalBody},
  'Inscrições':{noun:'inscrições',av:1,ST:{cf:['ok','Confirmada'],pe:['warning','Pendente'],ca:['off','Cancelada']},acts:[],extra:agRegExtra,rows:AGR}});
 delete LSD.agenda['Integrações'];}
/* pendências saem dos dados */
Object.defineProperty(GPEND,'agenda',{configurable:true,enumerable:true,get:()=>[['Pedidos de cerimônia para decidir',AGE.reduce((a,e)=>a+(e.st==='cf'?agPendN(e):0),0)],['Pessoas sem resposta nas escalas',SCL.filter(s=>s.st==='aw').reduce((a,s)=>a+sclCount(s).pe,0)],['Escalas para aprovar',SCL.filter(s=>s.st==='aw'&&sclApprovable(s)).length,3],['Pagamentos de inscrição pendentes',AGR.filter(x=>x.pay==='pe'&&x.st!=='ca').length]].filter(x=>x[1]>0)});

/* ===== Visão geral das páginas de Eventos e cultos (cartões do web; alertas dos dados do módulo) ===== */
const avgOf=(...ts)=>AGE.filter(e=>ts.includes(e.t));
const avgBrl=n=>'R$ '+Math.round(n).toLocaleString('pt-BR');
const avgTodayIso=()=>cuToday();
function avgEv(only){const all=avgOf('ret','conf','esp'),td=avgTodayIso(),conf=all.filter(e=>e.st==='cf'&&(e.date2||e.date)>=td),prev=all.filter(e=>e.st==='tt');
 const regs=AGR.filter(x=>x.st!=='ca'),evs=new Set(regs.map(x=>x.ev)).size,rec=AGR.filter(x=>x.pay==='pg').reduce((a,x)=>a+x.val,0),paid=new Set(AGR.filter(x=>agOf(x.ev)&&agOf(x.ev).paid).map(x=>x.ev)).size;
 const items=prev.map(e=>rsAtt('info',esc(e.n),'Em previsão'+(e.prev?' · '+esc(e.prev):'')+' · falta confirmar a data','pgOpen','agenda|Eventos|'+e.id));
 if(only)return items;
 return pgK([[conf.length,'Próximos confirmados',prev.length+' em previsão'],[regs.length,'Inscritos','em '+evs+(evs===1?' evento':' eventos')],[avgBrl(rec),'Arrecadado',paid+(paid===1?' evento pago':' eventos pagos')]])+pgAtt(items);}
function avgCul(){const cs=avgOf('cul'),conf=cs.filter(e=>e.st==='cf'),prev=cs.filter(e=>e.st==='tt');
 return pgK([[conf.length,'Próximos confirmados',prev.length+' em previsão']])+pgAtt([]);}
function avgRito(t,sec,done,only){const rows=avgOf(t),cf=rows.filter(e=>e.st==='cf'),wait=cf.reduce((a,e)=>a+agPendN(e),0),n=rows.reduce((a,e)=>a+e.ppl.filter(p=>p.st==='co').length,0),cert=secAtos.filter(a=>a.t===AG_TYPE[t]&&a.st==='re'&&a.cert!=='Emitido').length;
 const items=cf.filter(e=>agPendN(e)).map(e=>rsAtt('warn',esc(e.n)+': '+agPendN(e)+(agPendN(e)===1?' pedido para decidir':' pedidos para decidir'),agDay(e.date)+' · '+e.time+' · '+agOcc(e)+' de '+e.vagas+' vagas','pgOpen','agenda|'+sec+'|'+e.id));
 if(only)return items;
 return pgK([[wait,'Aguardando confirmação',t==='apr'?'pedidos de famílias':'pedidos para confirmar'],[cf.length,'Confirmados','nas próximas datas'],[cert,(t==='apr'?'Certificados':'Certidões')+' na secretaria','a emitir em Secretaria › Atos'],[n,done,t==='apr'?'bebês ao Senhor':'já realizados']])+pgAtt(items);}
function avgScl(only){const ap=SCL.filter(s=>s.st==='ap').length,aw=SCL.filter(s=>s.st==='aw'),dr=SCL.filter(s=>s.st==='dr').length,sem=aw.reduce((a,s)=>a+sclCount(s).pe,0),pronta=aw.filter(sclApprovable);
 const items=[...pronta.map(s=>rsAtt('warn',esc(s.n)+' pronta para aprovar','Todos responderam e ninguém recusou','pgGo','agenda|Escalas')),sem?rsAtt('warn',sem+(sem===1?' pessoa sem resposta nas escalas':' pessoas sem resposta nas escalas'),'Aguardando aceite','pgGo','agenda|Escalas'):''];
 if(only)return items;
 return pgK([[ap,'Aprovadas','todos aceitaram'],[aw.length,'Aguardando aceite',sem+' pessoas sem resposta'],[dr,'Em criação','ainda não enviadas']])+pgAtt(items);}
function avgInsc(only){const l=AGR,cf=l.filter(x=>x.st==='cf').length,pe=l.filter(x=>x.st==='pe').length,ca=l.filter(x=>x.st==='ca').length,pend=l.filter(x=>x.pay==='pe'&&x.st!=='ca'),vl=pend.reduce((a,x)=>a+x.val,0);
 const items=[pend.length?rsAtt('warn',pend.length+(pend.length===1?' pagamento pendente':' pagamentos pendentes')+' · '+AG_BRL(vl),'Reenviar o link ou marcar como pago','pgGo','agenda|Inscrições'):''];
 if(only)return items;
 return pgK([[cf,'Confirmadas'],[pe,'Pendentes'],[ca,'Canceladas']])+pgAtt(items);}
function avgInscRes(){const ok=AGR.filter(x=>x.st!=='ca'),prev=ok.reduce((a,x)=>a+x.val,0),rec=ok.filter(x=>x.pay==='pg').reduce((a,x)=>a+x.val,0),pct=rsPct(rec,prev),pend=ok.filter(x=>x.pay==='pe');
 const evs=[...new Set(ok.filter(x=>agOf(x.ev)&&agOf(x.ev).paid).map(x=>x.ev))].map(id=>{const e=agOf(id),l=ok.filter(x=>x.ev===id),t=l.reduce((a,x)=>a+x.val,0),r=l.filter(x=>x.pay==='pg').reduce((a,x)=>a+x.val,0);return {n:e.n,t,r};}).sort((a,b)=>b.t-a.t),mx=Math.max(1,...evs.map(x=>x.t));
 return rsCard('Arrecadado',rsBars([{l:'Recebido',v:AG_BRL(rec),w:pct,s:pct+'% do previsto ('+AG_BRL(prev)+')'},{l:'A receber',v:AG_BRL(prev-rec),w:100-pct,c:'var(--tone-ambar)'}]),pend.length?pend.length+(pend.length===1?' pagamento pendente':' pagamentos pendentes'):'')
  +rsCard('Por evento',rsBars(evs.map(x=>({l:esc(x.n),v:AG_BRL(x.t),w:rsPct(x.t,mx),s:'Recebido '+AG_BRL(x.r)+' · A receber '+AG_BRL(x.t-x.r)}))));}
Object.assign(LSD.agenda,{
 'Visão geral · Eventos':{noun:'',ST:{},rows:[],custom:()=>avgEv()},
 'Visão geral · Cultos':{noun:'',ST:{},rows:[],custom:()=>avgCul()},
 'Visão geral · Apresentações':{noun:'',ST:{},rows:[],custom:()=>avgRito('apr','Apresentações','Apresentados')},
 'Visão geral · Batismos':{noun:'',ST:{},rows:[],custom:()=>avgRito('bat','Batismos','Batizados')},
 'Visão geral · Consagrações':{noun:'',ST:{},rows:[],custom:()=>avgRito('con','Consagrações','Consagrados')},
 'Visão geral · Casamentos':{noun:'',ST:{},rows:[],custom:()=>avgRito('cas','Casamentos','Casais casados')},
 'Visão geral · Escalas':{noun:'',ST:{},rows:[],custom:()=>avgScl()},
 'Visão geral · Inscrições':{noun:'',ST:{},rows:[],custom:()=>avgInsc()},
 'Resultados · Inscrições':{noun:'',ST:{},rows:[],custom:()=>avgInscRes()}});
gMod('agenda')[5]=['Visão geral · Eventos','Eventos','Visão geral · Cultos','Cultos','Visão geral · Apresentações','Apresentações','Visão geral · Batismos','Batismos','Visão geral · Consagrações','Consagrações','Visão geral · Casamentos','Casamentos','Calendário','Visão geral · Escalas','Escalas','Visão geral · Inscrições','Inscrições','Resultados · Inscrições'];
