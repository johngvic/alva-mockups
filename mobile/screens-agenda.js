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
function agCalBody(){const f=(S.ag&&S.ag.cf)||'todos',out=[];
 AGE.filter(e=>e.st==='cf').forEach(e=>{const k=e.t==='cul'?'cu':['apr','bat','con','cas'].includes(e.t)?'ce':'ev';
  if(e.rec){for(let n=0;n<3;n++){const iso=cuISO(e.d0+n*7);out.push({iso,time:e.time,n:e.n,k,t:e.t});}}
  else out.push({iso:e.date,time:e.time,n:e.n,k,t:e.t});});
 const l=out.filter(x=>x.iso>=cuToday()&&(f==='todos'||x.k===f)).sort((a,b)=>a.iso.localeCompare(b.iso)||a.time.localeCompare(b.time)).slice(0,24);
 const g={};l.forEach(x=>{(g[x.iso]=g[x.iso]||[]).push(x);});
 return vsChips('agCf',f,[['todos','Todos'],['ev','Eventos'],['cu','Cultos'],['ce','Cerimônias']])+fndBox('agCl','Buscar na agenda')
  +`<div class="stack g4" id="agCl">${Object.keys(g).map(d=>`<section class="stack g2"><p class="eb2">${agDay(d)}${d===cuToday()?' · hoje':''}</p><div class="vl">${g[d].map(x=>`<div class="vr" data-q="${esc(x.n)}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(x.n)}</span><span class="vs">${x.time}</span></span>${vsTag(x.k==='cu'?'ok':x.k==='ce'?'info':'warning',AG_TYPE[x.t])}</div>`).join('')}</div></section>`).join('')||vsEmpty('Nada marcado','Não há compromissos confirmados nos próximos dias.')}</div>`;}
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
