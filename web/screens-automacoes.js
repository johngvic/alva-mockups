/* Automações e jobs (Administração › Automações). Protótipo da visão cross dos jobs da plataforma:
 * spec em doc_alva/spec/domains/automation (AUT-WEB-01 e 02). Só SuperAdmin e SuperOperator, com os mesmos poderes.
 * Só mostra que existe: os dados de exemplo são gerados na carga e nada é guardado. */
const ATM_NOW=Date.UTC(2026,9,28,17,40);               // 28/10/2026, 14:40 em Brasília
const ATM_Z={'UTC':0,'America/Sao_Paulo':-180,'America/Manaus':-240};
const ATM_ZL={'UTC':'UTC','America/Sao_Paulo':'Brasília','America/Manaus':'Manaus'};
const ATM_DAYS=['segunda','terça','quarta','quinta','sexta','sábado','domingo'];
const ATM_ORGS=[{id:'o1',n:'Rede Alva',ch:[['c1','Alva Sede'],['c2','Alva Norte'],['c3','Alva Jardins']]},{id:'o2',n:'Comunidade Esperança',ch:[['c4','Esperança Centro'],['c5','Esperança Leste']]},{id:'o3',n:'Igreja da Cidade',ch:[['c6','Cidade Vila Nova']]}];
const ATM_CH=ATM_ORGS.flatMap(o=>o.ch.map(c=>({id:c[0],n:c[1],o:o.id})));
const ATM_ST={Succeeded:['Concluída','ok'],PartiallyFailed:['Concluída com falhas','warn'],Failed:['Falhou','bad'],Running:['Em andamento','run']};
const ATM_RES={Succeeded:['Feito','ok'],Failed:['Falhou','bad'],Skipped:['Pulado','off']};
const ATM_TRIG={Schedule:'Relógio',Manual:'Manual',Retry:'Retentativa'};
// ação -> [resultado, frase só com identificadores, código do erro, retentável quando pulado, ação que dá certo na retentativa]
const ATM_ACT={
 'email.sent':['Succeeded',(a,b)=>`E-mail enviado ao destinatário #${a} do envio #${b}`],
 'push.sent':['Succeeded',(a,b)=>`Push enviado ao destinatário #${a} do envio #${b}`],
 'delivery.skipped':['Skipped',a=>`Entrega adiada para o destinatário #${a} (janela de silêncio)`],
 'delivery.failed':['Failed',(a,b)=>`Falha ao entregar ao destinatário #${a} do envio #${b}`,'PROVIDER_UNAVAILABLE',0,'email.sent'],
 'reminder.queued':['Succeeded',(a,b)=>`Lembrete do compromisso #${a} enfileirado para o participante #${b}`],
 'reminder.skipped':['Skipped',a=>`Lembrete do compromisso #${a} descartado: o compromisso já passou`],
 'reminder.failed':['Failed',a=>`Falha ao enfileirar o lembrete do compromisso #${a}`,'DB_TIMEOUT',0,'reminder.queued'],
 'birthday.queued':['Succeeded',a=>`Parabéns enfileirado para a pessoa #${a}`],
 'birthday.failed':['Failed',a=>`Falha ao enfileirar o parabéns da pessoa #${a}`,'DB_TIMEOUT',0,'birthday.queued'],
 'liveSlot.created':['Succeeded',(a,b)=>`Ocorrência #${a} do canal #${b} criada na grade`],
 'liveSlot.cancelled':['Succeeded',(a,b)=>`Ocorrência #${a} do canal #${b} cancelada: horário removido`],
 'pending.opened':['Succeeded',a=>`Pendência #${a} aberta para a equipe`],
 'pending.closed':['Succeeded',a=>`Pendência #${a} fechada: a causa foi resolvida`],
 'alert.queued':['Succeeded',a=>`Aviso da pendência #${a} enfileirado para a equipe`],
 'alert.failed':['Failed',a=>`Falha ao avisar sobre a pendência #${a}`,'DB_TIMEOUT',0,'alert.queued'],
 'stock.alerted':['Succeeded',a=>`Aviso de estoque baixo do item #${a} enfileirado`],
 'stock.cleared':['Succeeded',a=>`Aviso do item #${a} fechado: o estoque voltou ao mínimo`],
 'payment.reconciled':['Succeeded',a=>`Pagamento #${a} reconciliado com o provedor`],
 'payment.confirmed':['Succeeded',(a,b)=>`Compra #${b} confirmada pelo pagamento #${a}`],
 'payment.expired':['Succeeded',(a,b)=>`Pagamento #${a} cancelado no provedor e compra #${b} expirada`],
 'payment.resent':['Succeeded',a=>`Pagamento #${a} reenviado ao provedor`],
 'refund.followed':['Succeeded',a=>`Reembolso do pagamento #${a} acompanhado até o resultado`],
 'payment.failed':['Failed',a=>`Falha ao reconciliar o pagamento #${a}`,'PROVIDER_UNAVAILABLE',0,'payment.reconciled'],
 'order.processed':['Succeeded',a=>`Pedido #${a} registrado como venda no módulo`],
 'order.failed':['Failed',a=>`Falha ao registrar o pedido #${a} no módulo`,'MODULE_TECHNICAL_ERROR',0,'order.processed'],
 'order.unassigned':['Skipped',a=>`Pedido #${a} sem módulo: aguardando atribuição`,'ORDER_UNASSIGNED',1,'order.processed'],
 'link.synced':['Succeeded',a=>`Vínculo #${a} enviado ao provedor`],
 'link.failed':['Failed',a=>`Falha ao enviar o vínculo #${a}`,'PROVIDER_REJECTED',0,'link.synced'],
 'export.generated':['Succeeded',a=>`Arquivo do pedido #${a} gerado e link enviado`],
 'account.deleted':['Succeeded',a=>`Conta #${a} excluída e evento publicado`],
 'export.failed':['Failed',a=>`Falha ao gerar o arquivo do pedido #${a}`,'FILES_UNAVAILABLE',0,'export.generated'],
 'event.redelivered':['Succeeded',a=>`Evento #${a} reentregue ao consumidor`],
 'event.deliveryFailed':['Failed',a=>`Falha ao reentregar o evento #${a}`,'CONSUMER_ERROR',0,'event.redelivered'],
 'duplicates.detected':['Succeeded',a=>{const n=parseInt(a.slice(0,2),16)%5,m=parseInt(a.slice(2,4),16)%4;return `${n} par${n===1?'':'es'} novo${n===1?'':'s'}, ${m} atualizado${m===1?'':'s'}`;}],
 'duplicates.failed':['Failed',a=>`Falha ao detectar duplicados da igreja #${a}`,'DB_TIMEOUT',0,'duplicates.detected'],
};
const ATM_PURGE=[['audit.logEntries','audit'],['connectors.calls','connectors'],['communication.inbox','communication'],['pastoral.prayerTexts','pastoral'],['financial.importDrafts','financial'],['identity.controlData','identity'],['files.unused','files'],['files.purge','files'],['automation.runs','automation']];
// s: k = m (a cada N minutos), h (a cada N horas), d (diária), w (semanal); i = intervalo; t = horário; days = dias (0 = segunda); z = fuso
const ATM_JOBS=[
 {k:'notifications.deliver',n:'Entrega de notificações',d:'Envia e-mail e push da fila e reenvia o que falhou',opt:0,s:{k:'m',i:1,z:'UTC'},cap:10,t:[['communication','notification_recipient','email.sent'],['communication','notification_recipient','push.sent'],['communication','notification_recipient','delivery.skipped']],f:['communication','notification_recipient','delivery.failed']},
 {k:'reminders.fire',n:'Lembretes e compromissos',d:'Dispara os lembretes dos compromissos publicados pelos domínios',opt:1,s:{k:'m',i:5,z:'UTC'},cap:6,t:[['communication','commitment_reminder','reminder.queued'],['communication','commitment_reminder','reminder.skipped']],f:['communication','commitment_reminder','reminder.failed']},
 {k:'dates.automations',n:'Aniversário e boas-vindas',d:'Felicita quem faz aniversário na hora local de cada igreja',opt:1,s:{k:'h',i:1,z:'UTC'},cap:5,t:[['communication','person','birthday.queued']],f:['communication','person','birthday.failed']},
 {k:'stream.schedule',n:'Transmissão ao vivo (grade)',d:'Gera os compromissos das próximas 24 horas da grade dos canais',opt:1,s:{k:'h',i:1,z:'UTC'},cap:4,t:[['communication','scheduled_commitment','liveSlot.created'],['communication','scheduled_commitment','liveSlot.cancelled']],f:null},
 {k:'team.alerts',n:'Alertas da equipe',d:'Detecta o que está vencendo e avisa quem cuida, em todos os módulos',opt:1,s:{k:'h',i:1,z:'UTC'},cap:8,t:[['finance','pending_item','pending.opened'],['scheduling','pending_item','pending.opened'],['warehouse','pending_item','pending.opened'],['pastoral','pending_item','pending.closed'],['shop','pending_item','alert.queued']],f:['finance','pending_item','alert.failed']},
 {k:'stock.alerts',n:'Alertas de estoque',d:'Avisa o estoque abaixo do mínimo de Cafeteria, Restaurante e Loja',opt:1,s:{k:'h',i:1,z:'UTC'},cap:4,t:[['cafeteria','inventory_item','stock.alerted'],['restaurant','inventory_item','stock.alerted'],['shop','inventory_item','stock.cleared']],f:null,off:1},
 {k:'payments.reconcile',n:'Pagamentos',d:'Reconcilia, reenvia, expira e lembra o prazo de pagamentos de todos os módulos',opt:0,s:{k:'m',i:10,z:'UTC'},cap:9,t:[['connectors','payment','payment.reconciled'],['events','registration_purchase','payment.confirmed'],['shop','app_order','payment.expired'],['donations','contribution','payment.reconciled'],['events','payment','refund.followed'],['connectors','payment','payment.resent']],f:['connectors','payment','payment.failed'],lastBad:'PartiallyFailed'},
 {k:'orders.inbound',n:'Pedidos do provedor de comércio',d:'Refaz a venda dos pedidos que falharam e aplica cancelamentos pendentes',opt:0,s:{k:'m',i:5,z:'UTC'},cap:4,t:[['connectors','inbound_order','order.processed']],f:['connectors','inbound_order','order.failed'],extra:['connectors','inbound_order','order.unassigned'],lastBad:'PartiallyFailed'},
 {k:'catalog.sync',n:'Sincronização de itens com o provedor',d:'Envia ao provedor os itens que mudaram, com nova tentativa crescente',opt:0,s:{k:'m',i:5,z:'UTC'},cap:6,t:[['connectors','product_link','link.synced']],f:['connectors','product_link','link.failed']},
 {k:'catalog.fullSync',n:'Sincronização completa',d:'Reenvia o estado de todos os itens vinculados ao provedor',opt:0,s:{k:'d',i:1,t:'03:00',z:'UTC'},cap:14,t:[['connectors','product_link','link.synced']],f:['connectors','product_link','link.failed']},
 {k:'data.requests',n:'Exportação de dados e exclusão de conta',d:'Gera o arquivo "Baixar meus dados" e conclui a exclusão de conta',opt:0,s:{k:'m',i:5,z:'UTC'},cap:2,t:[['identity','data_export','export.generated'],['identity','user','account.deleted']],f:['identity','data_export','export.failed']},
 {k:'retention.purge',n:'Retenção e expurgo',d:'Apaga o que passou do prazo de guarda, uma política por origem',opt:0,s:{k:'d',i:1,t:'03:00',z:'UTC'},cap:9,t:null,f:null,purge:1},
 {k:'events.redeliver',n:'Entrega durável de eventos',d:'Reentrega aos consumidores os eventos pendentes ou que falharam',opt:0,s:{k:'m',i:1,z:'UTC'},cap:6,t:[['communication','event_delivery','event.redelivered'],['donations','event_delivery','event.redelivered'],['shop','event_delivery','event.redelivered']],f:['communication','event_delivery','event.deliveryFailed']},
 {k:'members.duplicates',n:'Detecção de cadastros duplicados',d:'Compara os cadastros de cada igreja e deixa prontos os pares que parecem a mesma pessoa',opt:0,s:{k:'d',i:1,t:'03:00',z:'UTC'},cap:4,t:[['membership','church','duplicates.detected']],f:['membership','church','duplicates.failed']},
];
let atmSeed=20261028,atmIC=0;
const atmR=()=>{atmSeed=(atmSeed*1664525+1013904223)>>>0;return atmSeed/4294967296;};
const atmPick=a=>a[Math.floor(atmR()*a.length)];
const atmHex=n=>{let s='';for(let i=0;i<n;i++)s+='0123456789abcdef'[Math.floor(atmR()*16)];return s;};
const atmIv=s=>s.k==='m'?s.i:s.k==='h'?s.i*60:s.k==='d'?1440:10080;
const ATM_RUNS=[];
function atmItem(run,o,k,f,orig,kind,act,n){
 const a=ATM_ACT[act],id=atmHex(6),id2=atmHex(5),pf=o.purge;
 const ch=orig==='audit'||orig==='files'||orig==='automation'||(o.k==='events.redeliver'&&atmR()<.3)?null:atmPick(ATM_CH);
 const it={id:'i'+(++atmIC),run:run.id,job:o.k,org:ch?ch.o:null,ch:ch?ch.id:null,orig,kind,act,res:a[0],err:a[0]==='Succeeded'?null:a[2]||null,tid:pf?null:id,sum:a[1](id,id2),at:run.s+n*2500,att:1,rt:a[0]==='Failed'||(a[0]==='Skipped'&&a[3]===1)};
 return it;
}
function atmMkRun(o,start,isLast,trig){
 const run={id:'r'+(++atmIC),job:o.k,trig:trig||(atmR()<.05?'Manual':'Schedule'),by:null,st:'Succeeded',s:start,e:start+Math.floor(1000+atmR()*38000),items:[],err:null,from:null};
 if(run.trig==='Manual')run.by=atmPick(['André Rocha','Tiago Borges']);
 const r=atmR();let st=r<.80?'Succeeded':r<.93?'PartiallyFailed':'Failed';
 if(!o.f&&!o.extra&&st==='PartiallyFailed')st='Succeeded';
 if(isLast&&o.lastBad)st=o.lastBad;
 if(isLast&&!o.lastBad)st='Succeeded';
 run.st=st;
 if(st==='Failed'){run.err='DB_TIMEOUT';run.e=start+Math.floor(30000+atmR()*30000);}
 else if(o.purge){
  ATM_PURGE.forEach((p,i)=>{const n=Math.floor(atmR()*400);if(n>0||i<4){const it={id:'i'+(++atmIC),run:run.id,job:o.k,org:null,ch:null,orig:p[1],kind:'policy',act:'purge.'+p[0],res:'Succeeded',err:null,tid:null,sum:`${n} registro${n===1?'':'s'} removido${n===1?'':'s'} pela política ${p[0]}`,at:start+i*2500,att:1,rt:false};run.items.push(it);}});
 }else{
  let n=atmR()<.15?0:Math.max(1,Math.floor(atmR()*o.cap));
  for(let i=0;i<n;i++){const t=atmPick(o.t);run.items.push(atmItem(run,o,0,0,t[0],t[1],t[2],i));}
  if(st==='PartiallyFailed'){const nf=1+Math.floor(atmR()*3);for(let i=0;i<nf;i++)run.items.push(atmItem(run,o,0,0,o.f[0],o.f[1],o.f[2],n+i));if(o.extra)run.items.push(atmItem(run,o,0,0,o.extra[0],o.extra[1],o.extra[2],n+nf));}
  run.items.sort((x,y)=>x.at-y.at);
 }
 return run;
}
function atmBuild(){
 ATM_JOBS.forEach(j=>{
  j.on=!j.off;j.def={...j.s,days:[...(j.s.days||[])]};j.s.days=j.s.days||[];j.from=null;
  if(j.off){j.dis={by:'André Rocha',at:ATM_NOW-2*864e5-3600e3*5};}
  const iv=atmIv(j.s),n=iv<=60?28:iv<=1440?22:10;
  let t=ATM_NOW-Math.floor((.2+atmR()*.6)*iv*60000);
  for(let i=0;i<n;i++){ATM_RUNS.push(atmMkRun(j,t,i===0));t-=iv*60000+Math.floor((atmR()-.5)*iv*4000);}
 });
 ATM_RUNS.sort((a,b)=>b.s-a.s);
}
atmBuild();
const atmJob=k=>ATM_JOBS.find(j=>j.k===k);
const atmRuns=k=>ATM_RUNS.filter(r=>r.job===k);
const atmLast=j=>atmRuns(j.k)[0]||null;
const atmLoc=ms=>new Date(ms-180*60000);
const atm2=n=>String(n).padStart(2,'0');
function atmFmt(ms){const d=atmLoc(ms),hm=atm2(d.getUTCHours())+':'+atm2(d.getUTCMinutes()),dk=d.toISOString().slice(0,10),nk=atmLoc(ATM_NOW).toISOString().slice(0,10),yk=atmLoc(ATM_NOW-864e5).toISOString().slice(0,10),tk=atmLoc(ATM_NOW+864e5).toISOString().slice(0,10);
 if(dk===nk)return 'hoje, '+hm;if(dk===yk)return 'ontem, '+hm;if(dk===tk)return 'amanhã, '+hm;return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0,3).toLowerCase()}, ${hm}`;}
const atmUtc=ms=>new Date(ms).toISOString().replace('T',' ').slice(0,16)+' UTC';
const atmT=ms=>`<span title="${atmUtc(ms)}">${atmFmt(ms)}</span>`;
const atmDur=r=>{if(!r.e||r.st==='Running')return '—';const s=Math.round((r.e-r.s)/1000);return s<60?s+' s':Math.floor(s/60)+' min '+atm2(s%60)+' s';};
function atmRec(s){
 const z=ATM_ZL[s.z]||s.z,tz=s.z==='UTC'?'UTC':z;
 if(s.k==='m')return s.i===1?'A cada minuto':`A cada ${s.i} minutos`;
 if(s.k==='h')return s.i===1?'A cada hora':`A cada ${s.i} horas`;
 if(s.k==='d')return `Todo dia às ${s.t} (${tz})`;
 const ds=s.days.slice().sort((a,b)=>a-b).map(d=>ATM_DAYS[d]);const lst=ds.length>1?ds.slice(0,-1).join(', ')+' e '+ds[ds.length-1]:ds[0]||'—';
 return `Toda ${lst} às ${s.t} (${tz})`;
}
function atmNext(j){
 if(!j.on)return null;const s=j.s;
 if(s.k==='m'||s.k==='h'){const iv=atmIv(s)*60000,lr=atmLast(j);let t=(j.from!=null?j.from:(lr?lr.s:ATM_NOW))+iv;while(t<=ATM_NOW)t+=iv;return t;}
 const [h,mi]=(s.t||'03:00').split(':').map(Number),off=ATM_Z[s.z]||0,z=new Date(ATM_NOW+off*60000),y=z.getUTCFullYear(),m=z.getUTCMonth(),d=z.getUTCDate();
 for(let k=0;k<9;k++){const c=Date.UTC(y,m,d+k,h,mi)-off*60000;if(c<=ATM_NOW)continue;if(s.k==='d')return c;const wd=(new Date(Date.UTC(y,m,d+k)).getUTCDay()+6)%7;if(s.days.includes(wd))return c;}
 return null;
}
const atmPill=(st)=>`<span class="atm-p ${ATM_ST[st][1]}">${ATM_ST[st][0]}</span>`;
const atmResP=(r)=>`<span class="atm-p ${ATM_RES[r][1]}">${ATM_RES[r][0]}</span>`;
const atmCnt=r=>({n:r.items.length,ok:r.items.filter(i=>i.res==='Succeeded').length,fail:r.items.filter(i=>i.res==='Failed').length,skip:r.items.filter(i=>i.res==='Skipped').length});
function atmSum(r){if(!r)return 'Ainda não rodou';if(r.st==='Running')return 'Em andamento';if(r.st==='Failed')return 'Falhou: '+r.err;const c=atmCnt(r);if(!c.n)return 'Sem atos nesta rodada';return `${c.n} ${c.n===1?'ato':'atos'}${c.fail?` · ${c.fail} ${c.fail===1?'falha':'falhas'}`:''}`;}
const atmOrg=id=>ATM_ORGS.find(o=>o.id===id),atmChurch=id=>ATM_CH.find(c=>c.id===id);
const atmWhere=it=>it.ch?`${esc(atmOrg(it.org).n)} · ${esc(atmChurch(it.ch).n)}`:'<span class="soft">Plataforma</span>';
const atmSw=(j,big)=>`<button class="atm-sw ${j.on?'on':''}" role="switch" aria-checked="${j.on}" aria-label="Ativar o job ${esc(j.n)}" data-a="atmToggle" data-v="${j.k}"><i></i>${big?`<span>${j.on?'Ativo':'Desativado'}</span>`:''}</button>`;
function atmFail(j){const r=atmLast(j);return !!r&&(r.st==='PartiallyFailed'||r.st==='Failed');}
const atmRunning=()=>ATM_RUNS.filter(r=>r.st==='Running').length;
// ---------- estado e filtros
S.atmJob=null;S.atmTab='exec';
S.atmL={st:'todos',q:''};
const atmF0=()=>({st:'todos',tr:'todos',org:'',ch:'',per:'todos',q:'',res:'todos',orig:'',act:''});
S.atmF=atmF0();
const ATM_PER={todos:['Todo o período',Infinity],'24h':['Últimas 24 horas',864e5],'7d':['Últimos 7 dias',7*864e5],'30d':['Últimos 30 dias',30*864e5]};
function atmSel(id,label,opts,cur,scope,key){
 return `<div style="position:relative"><button class="btn sec sel" data-a="atmMenu" data-v="${id}" aria-haspopup="menu">${esc(label)}${ic('updown',14)}</button><div class="pop" id="atmP-${id}" role="menu" style="left:0;top:calc(100% + 6px);max-height:300px;overflow:auto">${opts.map(o=>`<button class="pi" data-a="atmSet" data-v="${scope}|${key}|${o[0]}">${esc(o[1])}${String(cur)===String(o[0])?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>`;
}
const atmChurchOpts=org=>[['','Todas as igrejas'],...ATM_CH.filter(c=>!org||c.o===org).map(c=>[c.id,c.n])];
const atmOrgOpts=()=>[['','Todas as organizações'],...ATM_ORGS.map(o=>[o.id,o.n])];
// ---------- lista
function atmListRows(){
 const f=S.atmL,q=norm(f.q||'');
 const list=ATM_JOBS.filter(j=>(f.st==='todos'||(f.st==='ativos'&&j.on)||(f.st==='desativados'&&!j.on)||(f.st==='falha'&&atmFail(j)))&&(!q||norm(j.n+' '+j.d+' '+j.k).includes(q)));
 if(!list.length)return `<div class="mempty"><p>Nenhum job por aqui.</p><span>Nenhum job corresponde a esses filtros.</span><button class="lnk" data-a="atmSet" data-v="L|st|todos">Limpar filtros</button></div>`;
 return `<div class="trow thead atm-j" role="row"><span>Job</span><span>Recorrência</span><span>Última execução</span><span>Próxima execução</span><span>Resumo</span><span>Ativo</span></div>`+list.map(j=>{const r=atmLast(j),nx=atmNext(j);
  return `<div class="trow atm-j" role="row" tabindex="0" data-a="atmOpen" data-v="${j.k}"><div class="atm-n"><b>${esc(j.n)}</b><small>${esc(j.d)}</small>${j.opt?`<em class="atm-opt">${ic('home',12,2)}A igreja pode desligar</em>`:''}</div>
   <div class="atm-c" data-l="Recorrência">${esc(atmRec(j.s))}</div>
   <div class="atm-c" data-l="Última execução">${r?`${atmPill(r.st)}<small>${atmT(r.s)}</small>`:'—'}</div>
   <div class="atm-c" data-l="Próxima execução">${j.on&&nx?atmT(nx):'<span class="soft">Desativado</span>'}</div>
   <div class="atm-c" data-l="Resumo"><small>${esc(atmSum(r))}</small></div>
   <div class="atm-sw-c">${atmSw(j)}</div></div>`;}).join('');
}
function atmList(){
 const on=ATM_JOBS.filter(j=>j.on).length,off=ATM_JOBS.length-on,bad=ATM_JOBS.filter(atmFail).length,run=atmRunning(),f=S.atmL;
 const chip=(k,l,n)=>`<button role="tab" class="chipf ${f.st===k?'on':''}" data-a="atmSet" data-v="L|st|${k}" aria-selected="${f.st===k}">${l}<small>${n}</small></button>`;
 return `<header class="ph rise"><div><p class="eb">Administração</p><h1>Automações</h1><p class="lede">${ATM_JOBS.length} jobs da plataforma · ${on} ativos${bad?` · ${bad} com falha na última execução`:''}</p></div></header>
 <section class="card kpis4 rise" style="--d:1" aria-label="Resumo">
  <div class="k4"><span class="kl">Ativos</span><span class="kv">${on}</span><span class="kd">rodando pela recorrência</span></div>
  <div class="k4"><span class="kl">Desativados</span><span class="kv">${off}</span><span class="kd">não rodam em nenhuma igreja</span></div>
  <div class="k4"><span class="kl">Em execução agora</span><span class="kv">${run}</span><span class="kd">${run?'rodando neste momento':'nenhum no momento'}</span></div>
  <div class="k4"><span class="kl">Com falha na última execução</span><span class="kv">${bad}</span><span class="kd">${bad?'abra o job para retentar':'tudo em dia'}</span></div>
 </section>
 <section class="card mtab rise" style="--d:2" aria-label="Lista de jobs">
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="atmq" placeholder="Pesquisar job" value="${esc(f.q)}" autocomplete="off"></label>
   <div class="chips" role="tablist" aria-label="Situação">${chip('todos','Todos',ATM_JOBS.length)}${chip('ativos','Ativos',on)}${chip('desativados','Desativados',off)}${chip('falha','Com falha',bad)}</div></div>
  <div id="atmrows">${atmListRows()}</div>
 </section>
 <p class="hint rise" style="--d:3;margin:12px 4px 0">Os horários aparecem no fuso de Brasília; passe o mouse para ver o UTC. Só SuperAdmin e SuperOperator veem esta tela, e a igreja só escolhe se quer receber os avisos, na Comunicação.</p>`;
}
// ---------- ficha do job
function atmRunRows(j){
 const f=S.atmF,lim=ATM_PER[f.per][1];
 let list=atmRuns(j.k).filter(r=>ATM_NOW-r.s<=lim&&(f.st==='todos'||(f.st==='ok'&&r.st==='Succeeded')||(f.st==='falha'&&(r.st==='PartiallyFailed'))||(f.st==='erro'&&r.st==='Failed')||(f.st==='run'&&r.st==='Running'))&&(f.tr==='todos'||r.trig===f.tr));
 const tenant=f.org||f.ch;let match={};
 if(tenant){list=list.filter(r=>{const m=r.items.filter(i=>(!f.ch||i.ch===f.ch)&&(!f.org||i.org===f.org)).length;match[r.id]=m;return m>0;});}
 if(!list.length)return `<div class="mempty"><p>Nada por aqui.</p><span>${atmRuns(j.k).length?'Nenhuma execução corresponde a esses filtros.':'Este job ainda não rodou.'}</span>${atmRuns(j.k).length?`<button class="lnk" data-a="atmClear">Limpar filtros</button>`:''}</div>`;
 return `<div class="trow thead atm-r" role="row"><span>Início</span><span>Origem</span><span>Estado</span><span>Duração</span><span>Atos</span><span>Falhas</span></div>`+list.map(r=>{const c=atmCnt(r);
  return `<div class="trow atm-r" role="row" tabindex="0" data-a="atmRunView" data-v="${r.id}"><div class="atm-n"><b>${atmT(r.s)}</b>${r.trig==='Retry'?'<small>Retentativa de uma execução anterior</small>':''}</div>
   <div class="atm-c" data-l="Origem">${ATM_TRIG[r.trig]}${r.by?`<small>${esc(r.by)}</small>`:''}</div>
   <div class="atm-c" data-l="Estado">${atmPill(r.st)}</div>
   <div class="atm-c" data-l="Duração">${atmDur(r)}</div>
   <div class="atm-c" data-l="Atos">${tenant?`${match[r.id]} <small>de ${c.n}</small>`:c.n}</div>
   <div class="atm-c" data-l="Falhas">${r.st==='Failed'?'—':c.fail?`<b class="atm-bad">${c.fail}</b>`:'0'}</div></div>`;}).join('');
}
function atmItemRows(j){
 const f=S.atmF,lim=ATM_PER[f.per][1],q=norm(f.q||'');
 let list=ATM_RUNS.filter(r=>r.job===j.k).flatMap(r=>r.items).filter(i=>ATM_NOW-i.at<=lim&&(f.res==='todos'||i.res===f.res)&&(!f.org||i.org===f.org)&&(!f.ch||i.ch===f.ch)&&(!f.orig||i.orig===f.orig)&&(!f.act||i.act===f.act)&&(!q||norm(i.sum+' '+(i.tid||'')+' '+i.act).includes(q))).sort((a,b)=>b.at-a.at);
 if(!list.length)return `<div class="mempty"><p>Nada encontrado.</p><span>Nenhum ato corresponde a esses filtros.</span><button class="lnk" data-a="atmClear">Limpar filtros</button></div>`;
 return `<div class="trow thead atm-i" role="row"><span>Quando</span><span>Organização e igreja</span><span>Ato</span><span>Resultado</span><span></span></div>`+list.map(i=>`<div class="trow atm-i" role="row">
   <div class="atm-n"><b>${atmT(i.at)}</b><small>${esc(i.sum)}</small></div>
   <div class="atm-c" data-l="Organização e igreja">${atmWhere(i)}<small>origem: ${esc(i.orig)}</small></div>
   <div class="atm-c" data-l="Ato"><code>${esc(i.act)}</code><small>${esc(i.kind)}${i.tid?' #'+i.tid:''}</small></div>
   <div class="atm-c" data-l="Resultado">${atmResP(i.res)}${i.err?`<small>${esc(i.err)}</small>`:''}</div>
   <div class="atm-c atm-ac">${i.tid?`<button class="ibtn sm" data-a="atmCopy" data-v="${i.tid}" aria-label="Copiar o identificador ${i.tid}">${ic('clipboard',15)}</button>`:''}${i.rt?`<button class="btn sec sm" data-a="atmRetryItem" data-v="${i.id}" ${j.on?'':'disabled'} aria-label="Retentar o ato ${esc(i.act)} #${i.tid}">${ic('swap',14)}Retentar</button>`:''}</div></div>`).join('');
}
function atmToolbar(j){
 const f=S.atmF,isI=S.atmTab==='itens';
 const chip=(k,l)=>`<button role="tab" class="chipf ${f[isI?'res':'st']===k?'on':''}" data-a="atmSet" data-v="F|${isI?'res':'st'}|${k}" aria-selected="${f[isI?'res':'st']===k}">${l}</button>`;
 const chips=isI?[['todos','Todos'],['Failed','Falharam'],['Skipped','Pulados'],['Succeeded','Feitos']]:[['todos','Todas'],['ok','Concluídas'],['falha','Com falhas'],['erro','Falharam']];
 const origs=[...new Set(ATM_RUNS.filter(r=>r.job===j.k).flatMap(r=>r.items.map(i=>i.orig)))].sort();
 const acts=[...new Set(ATM_RUNS.filter(r=>r.job===j.k).flatMap(r=>r.items.map(i=>i.act)))].sort();
 const orgL=f.org?atmOrg(f.org).n:'Todas as organizações',chL=f.ch?atmChurch(f.ch).n:'Todas as igrejas';
 return `<div class="tbar">${isI?`<label class="sbox">${ic('search',16)}<input id="atmiq" placeholder="Buscar por identificador ou texto" value="${esc(f.q)}" autocomplete="off"></label>`:''}
  <div class="chips" role="tablist" aria-label="${isI?'Resultado':'Estado'}">${chips.map(c=>chip(c[0],c[1])).join('')}</div>
  ${!isI?atmSel('tr',f.tr==='todos'?'Qualquer origem':ATM_TRIG[f.tr],[['todos','Qualquer origem'],['Schedule','Relógio'],['Manual','Manual'],['Retry','Retentativa']],f.tr,'F','tr'):''}
  ${atmSel('org',orgL,atmOrgOpts(),f.org,'F','org')}${atmSel('ch',chL,atmChurchOpts(f.org),f.ch,'F','ch')}${atmSel('per',ATM_PER[f.per][0],Object.entries(ATM_PER).map(([k,v])=>[k,v[0]]),f.per,'F','per')}
  ${isI?atmSel('orig',f.orig||'Qualquer origem',[['','Qualquer origem'],...origs.map(o=>[o,o])],f.orig,'F','orig')+atmSel('act',f.act||'Qualquer ato',[['','Qualquer ato'],...acts.map(a=>[a,a])],f.act,'F','act'):''}</div>`;
}
function atmRecForm(j){
 const s=j.s,days=s.days,kinds=[['m','A cada N minutos'],['h','A cada N horas'],['d','Diária'],['w','Semanal']];
 const nx=atmNext(j);
 return `<section class="card rise atm-rec" style="--d:2" aria-label="Recorrência do job">
  <div class="atm-rh"><div><h3>Recorrência</h3><p class="hint" style="margin:2px 0 0">Vale na hora: ao salvar, a próxima execução é recalculada a partir de agora. O horário de cada igreja (como o aviso das 8h) continua configuração da Comunicação.</p></div><span class="atm-p off">${ic('clock',13,2)}${esc(atmRec(j.s))}</span></div>
  <div class="atm-form">
   <div class="fld"><span class="fl">Tipo</span><div class="chips" role="radiogroup" aria-label="Tipo de recorrência">${kinds.map(k=>`<button class="chipf ${s.k===k[0]?'on':''}" role="radio" aria-checked="${s.k===k[0]}" data-a="atmKind" data-v="${k[0]}">${k[1]}</button>`).join('')}</div></div>
   ${s.k==='m'||s.k==='h'?`<label class="fld"><span class="fl">${s.k==='m'?'A cada quantos minutos (1 a 1440)':'A cada quantas horas (1 a 168)'}</span><input id="atmInt" type="number" min="1" max="${s.k==='m'?1440:168}" value="${s.i}"><span class="err" id="atmErr"></span></label>`:''}
   ${s.k==='d'||s.k==='w'?`<label class="fld"><span class="fl">Horário</span><input id="atmTime" type="time" value="${s.t||'03:00'}"></label>`:''}
   ${s.k==='w'?`<div class="fld"><span class="fl">Dias da semana</span><div class="chips" role="group" aria-label="Dias da semana">${ATM_DAYS.map((d,i)=>`<button class="chipf ${days.includes(i)?'on':''}" role="checkbox" aria-checked="${days.includes(i)}" data-a="atmDay" data-v="${i}">${d.slice(0,3)}</button>`).join('')}</div><span class="err" id="atmErr"></span></div>`:''}
   ${s.k==='d'||s.k==='w'?`<div class="fld"><span class="fl">Fuso do horário</span><div class="chips" role="radiogroup" aria-label="Fuso">${Object.keys(ATM_Z).map(z=>`<button class="chipf ${s.z===z?'on':''}" role="radio" aria-checked="${s.z===z}" data-a="atmZone" data-v="${z}">${ATM_ZL[z]}</button>`).join('')}</div></div>`:''}
  </div>
  <div class="atm-nx">${j.on?`Próxima execução: <b>${nx?atmT(nx):'—'}</b>`:'O job está desativado: não há próxima execução.'}</div>
  <div class="dfoot atm-ft"><button class="btn sec" data-a="atmReset">Restaurar padrão</button><button class="btn pri" data-a="atmSave">Salvar recorrência</button></div>
 </section>`;
}
function atmDetail(){
 const j=atmJob(S.atmJob);if(!j){S.atmJob=null;return atmList();}
 const r=atmLast(j),nx=atmNext(j),runs=atmRuns(j.k),tab=S.atmTab;
 const items24=runs.flatMap(x=>x.items).filter(i=>ATM_NOW-i.at<=864e5).length;
 const head=joHead(j,`<span class="soft">Administração</span>${ic('chevR',13,2)}<button class="lnk back" data-a="atmBack">Automações</button>${ic('chevR',13,2)}<span>${esc(j.n)}</span>`,esc(j.n),esc(j.d)+(j.opt?' · a igreja pode desligar':''),
  [[esc(atmRec(j.s)),'Recorrência'],[j.on&&nx?atmFmt(nx):'—','Próxima execução'],[r?atmFmt(r.s):'—','Última execução'],[String(items24),'Atos nas últimas 24 h']],
  [['exec','Execuções','atmTab',runs.length],['itens','Atividade','atmTab'],['rec','Recorrência','atmTab']],tab,
  `<span class="atm-hact">${atmSw(j,1)}<button class="btn sec sm" data-a="atmRunNow" data-v="${j.k}" ${j.on?'':'disabled'} aria-label="Rodar o job agora">${ic('play',14)}Rodar agora</button></span>`);
 const banner=!j.on?`<div class="dupn rise" style="--d:2"><span class="dd"></span><span><b>Desativado por ${esc(j.dis?j.dis.by:'um superusuário')}${j.dis?' em '+atmFmt(j.dis.at):''}.</b> Não roda em nenhuma igreja; Rodar agora e Retentar ficam desabilitados até ativar.</span></div>`:'';
 const body=tab==='rec'?atmRecForm(j):`<section class="card mtab rise" style="--d:3" aria-label="${tab==='itens'?'Atividade':'Execuções'}">${atmToolbar(j)}<div id="atmrows">${tab==='itens'?atmItemRows(j):atmRunRows(j)}</div></section>`;
 return head+banner+body;
}
// ---------- execuções e retentativas
function atmRunDrawer(r){
 const j=atmJob(r.job),c=atmCnt(r),retr=r.items.filter(i=>i.rt);
 const org=r.from?ATM_RUNS.find(x=>x.id===r.from):null;
 openDlg(`${dlgHead('Execução de '+atmFmt(r.s),esc(j.n))}
  <div class="atm-dg"><div><span>Estado</span>${atmPill(r.st)}</div><div><span>Origem</span><b>${ATM_TRIG[r.trig]}${r.by?' · '+esc(r.by):''}</b></div><div><span>Duração</span><b>${atmDur(r)}</b></div><div><span>Atos</span><b>${c.n}</b></div><div><span>Feitos</span><b>${c.ok}</b></div><div><span>Falhas</span><b class="${c.fail?'atm-bad':''}">${c.fail}</b></div>${c.skip?`<div><span>Pulados</span><b>${c.skip}</b></div>`:''}${r.err?`<div><span>Erro</span><code>${esc(r.err)}</code></div>`:''}${org?`<div><span>Retentativa de</span><button class="lnk" data-a="atmRunView" data-v="${org.id}">${atmFmt(org.s)}</button></div>`:''}</div>
  ${r.items.length?`<div class="atm-di">${r.items.slice(0,8).map(i=>`<div class="atm-dr"><div>${atmResP(i.res)}<code>${esc(i.act)}</code></div><small>${esc(i.sum)}</small><small>${i.ch?esc(atmOrg(i.org).n)+' · '+esc(atmChurch(i.ch).n):'Plataforma'}</small></div>`).join('')}${r.items.length>8?`<p class="hint" style="margin:6px 2px 0">Mais ${r.items.length-8} atos: veja a aba Atividade do job.</p>`:''}</div>`:`<p class="hint" style="margin:10px 2px">${r.st==='Failed'?'A execução falhou antes de registrar algum ato.':'Esta rodada não fez nada (sem atos).'}</p>`}
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button>${retr.length?`<button class="btn pri" data-a="atmRetryRun" data-v="${r.id}" ${j.on?'':'disabled'}>${ic('swap',15)}Retentar ${retr.length===1?'o item':'os '+retr.length+' itens'}</button>`:''}${r.st==='Failed'&&!retr.length?`<button class="btn pri" data-a="atmRetryRun" data-v="${r.id}" ${j.on?'':'disabled'}>${ic('swap',15)}Retentar a execução</button>`:''}</div>`,'lg');
}
function atmRetryRun(src,items){
 const j=atmJob(src.job),run={id:'r'+(++atmIC),job:j.k,trig:'Retry',by:'André Rocha',st:'Running',s:ATM_NOW,e:null,items:[],err:null,from:src.id};
 ATM_RUNS.unshift(run);
 setTimeout(()=>{
  items.forEach((i,n)=>{const a=ATM_ACT[i.act],ok=a[4]||i.act,b=ATM_ACT[ok],ni={...i,id:'i'+(++atmIC),run:run.id,act:ok,res:'Succeeded',err:null,sum:b[1](i.tid,atmHex(5)),at:ATM_NOW+n*1500,att:i.att+1,rt:false};run.items.push(ni);});
  run.st='Succeeded';run.e=ATM_NOW+1500*items.length+2000;
  if(S.active==='automacoes')render();
 },2200);
 return run;
}
// ---------- ações
A.atmOpen=v=>{S.atmJob=v;S.atmTab='exec';S.atmF=atmF0();render();window.scrollTo(0,0);};
A.atmBack=()=>{S.atmJob=null;render();window.scrollTo(0,0);};
A.atmTab=v=>{S.atmTab=v;S.atmF=atmF0();render();};
A.atmClear=()=>{S.atmF=atmF0();render();};
A.atmMenu=v=>{const p=$('#atmP-'+v);closePops(p);if(p)p.classList.toggle('open');};
A.atmSet=v=>{const [sc,k,val]=String(v).split('|');const o=sc==='L'?S.atmL:S.atmF;o[k]=val;if(sc==='F'&&k==='org'&&o.ch&&val&&atmChurch(o.ch).o!==val)o.ch='';if(sc==='F'&&k==='ch'&&val)o.org=atmChurch(val).o;closePops();render();};
A.atmToggle=v=>{const j=atmJob(v);
 if(j.on){confirmDel({title:`Desativar “${j.n}”?`,body:'O job deixa de rodar em todas as igrejas e organizações. A execução em andamento termina; as próximas não acontecem. Rodar agora e Retentar ficam desabilitados.',label:'Desativar',onConfirm:()=>{j.on=false;j.dis={by:'André Rocha',at:ATM_NOW};render();toast('Job desativado para a plataforma toda');}});}
 else{j.on=true;j.dis=null;j.from=ATM_NOW;render();toast('Job ativado: a próxima execução foi calculada a partir de agora');}};
A.atmRunNow=v=>{const j=atmJob(v);if(!j.on){toast('Ative o job antes de rodar');return;}
 if(ATM_RUNS.some(r=>r.job===v&&r.st==='Running')){toast('Já há uma execução em curso');return;}
 openDlg(`${dlgHead('Rodar “'+esc(j.n)+'” agora?','Roda uma vez, para todas as igrejas, sem mudar a próxima execução agendada.')}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="atmRunGo" data-v="${v}">${ic('play',15)}Rodar agora</button></div>`,'sm');};
A.atmRunGo=v=>{const j=atmJob(v);closeDlg();
 const run={id:'r'+(++atmIC),job:v,trig:'Manual',by:'André Rocha',st:'Running',s:ATM_NOW,e:null,items:[],err:null,from:null};ATM_RUNS.unshift(run);S.atmTab='exec';S.atmF=atmF0();render();toast('Execução iniciada');
 setTimeout(()=>{const n=j.t?1+Math.floor(atmR()*Math.min(4,j.cap)):0;for(let i=0;i<n;i++){const t=atmPick(j.t);run.items.push(atmItem(run,j,0,0,t[0],t[1],t[2],i));}
  if(j.purge)ATM_PURGE.slice(0,3).forEach((p,i)=>run.items.push({id:'i'+(++atmIC),run:run.id,job:j.k,org:null,ch:null,orig:p[1],kind:'policy',act:'purge.'+p[0],res:'Succeeded',err:null,tid:null,sum:`${Math.floor(atmR()*90)} registros removidos pela política ${p[0]}`,at:ATM_NOW+i*2500,att:1,rt:false}));
  run.st='Succeeded';run.e=ATM_NOW+9000;if(S.active==='automacoes')render();},2200);};
A.atmRunView=v=>{const r=ATM_RUNS.find(x=>x.id===v);if(r)atmRunDrawer(r);};
A.atmRetryRun=v=>{const r=ATM_RUNS.find(x=>x.id===v),j=atmJob(r.job);if(!j.on){toast('Ative o job antes de retentar');return;}
 if(ATM_RUNS.some(x=>x.job===r.job&&x.st==='Running')){toast('Já há uma execução em curso');return;}
 const items=r.items.filter(i=>i.rt);closeDlg();
 if(!items.length){const run=atmRetryRun(r,[]);toast('Retentativa iniciada');S.atmTab='exec';render();return;}
 atmRetryRun(r,items);S.atmTab='exec';S.atmF=atmF0();render();toast('Retentativa iniciada: só o que falhou');};
A.atmRetryItem=v=>{const it=ATM_RUNS.flatMap(r=>r.items).find(i=>i.id===v),j=atmJob(it.job);if(!j.on){toast('Ative o job antes de retentar');return;}
 if(ATM_RUNS.some(x=>x.job===it.job&&x.st==='Running')){toast('Já há uma execução em curso');return;}
 const src=ATM_RUNS.find(r=>r.id===it.run);atmRetryRun(src,[it]);S.atmTab='exec';S.atmF=atmF0();render();toast('Retentativa do item iniciada');};
A.atmCopy=v=>{try{navigator.clipboard&&navigator.clipboard.writeText(v);}catch(e){}toast('Identificador copiado');};
A.atmKind=v=>{const j=atmJob(S.atmJob);j.s.k=v;if(v==='m'&&!(j.s.i>=1&&j.s.i<=1440))j.s.i=5;if(v==='h'&&!(j.s.i>=1&&j.s.i<=168))j.s.i=1;if((v==='d'||v==='w')&&!j.s.t)j.s.t='03:00';if(v==='w'&&!j.s.days.length)j.s.days=[0];render();};
A.atmDay=v=>{const j=atmJob(S.atmJob),d=Number(v),i=j.s.days.indexOf(d);if(i>=0)j.s.days.splice(i,1);else j.s.days.push(d);render();};
A.atmZone=v=>{atmJob(S.atmJob).s.z=v;render();};
A.atmSave=()=>{const j=atmJob(S.atmJob),s=j.s,err=$('#atmErr');
 if(s.k==='m'||s.k==='h'){const n=Number($('#atmInt').value),mx=s.k==='m'?1440:168;if(!Number.isInteger(n)||n<1||n>mx){if(err)err.textContent=`Informe um número inteiro de 1 a ${mx}.`;return;}s.i=n;}
 if(s.k==='d'||s.k==='w'){const t=$('#atmTime').value;if(!t){return;}s.t=t;}
 if(s.k==='w'&&!s.days.length){if(err)err.textContent='Escolha pelo menos um dia da semana.';return;}
 j.from=ATM_NOW;render();toast('Recorrência salva: vale a partir de agora');};
A.atmReset=()=>{const j=atmJob(S.atmJob);j.s={...j.def,days:[...(j.def.days||[])]};j.from=ATM_NOW;render();toast('Recorrência padrão restaurada');};
// ---------- depois de desenhar
function atmAfter(){
 const q=$('#atmq');if(q)q.addEventListener('input',e=>{S.atmL.q=e.target.value;$('#atmrows').innerHTML=atmListRows();});
 const iq=$('#atmiq');if(iq)iq.addEventListener('input',e=>{S.atmF.q=e.target.value;const j=atmJob(S.atmJob);$('#atmrows').innerHTML=atmItemRows(j);});
}
