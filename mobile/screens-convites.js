/* ---------- Convites de encontros: Casa e supervisor ---------- */
S.minv=[
 {id:'mi3',kind:'casa',org:'Casa Jardins',lead:'Ana Costa',t:'Encontro de oração e partilha',y:2026,m:9,d:30,h:'19h30',remote:false,place:'Casa da Ana Costa',st:'aceito',tone:'menta'},
 {id:'mi1',kind:'casa',org:'Casa Jardins',lead:'Ana Costa',t:'Encontro da casa · comunhão e estudo',y:2026,m:10,d:7,h:'19h30',remote:false,place:'Casa da Ana Costa',st:'pendente',tone:'menta'},
 {id:'mi2',kind:'sup',org:'Rede Norte',lead:'Rodrigo Alves',t:'Multiplicação de casas',y:2026,m:10,d:6,h:'19h30',remote:true,place:'Google Meet',st:'pendente',tone:'ceu'}];
const invMine=()=>S.role==='visitante'?[]:S.minv.filter(x=>x.kind!=='sup'||['lider','admin'].includes(S.role)).sort((a,b)=>K(a.y,a.m,a.d)-K(b.y,b.m,b.d));
function invPend(){return invMine().filter(x=>x.st==='pendente').length;}
const invDays=x=>Math.round((new Date(x.y,x.m-1,x.d)-new Date(TODAY.y,TODAY.m-1,TODAY.d))/864e5);
function invCard(x,i){const o={y:x.y,m:x.m,d:x.d},off=x.st==='recusado',n=invDays(x);
 return `<article class="ev-c es2 inv ${off?'off':''}" style="--t:var(--tone-${x.tone});--i:${i}">
  <div class="es2-r"><span class="ev-dt"><b>${o.d}</b><small>${WD[dow(o.y,o.m,o.d)].toLowerCase()}</small></span>
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-cat"><i></i>${x.kind==='sup'?'Supervisão · '+esc(x.org):esc(x.org)}<em>· ${x.h}</em></span><span class="ev-t">${esc(x.t)}</span><span class="ev-m">${ic(x.remote?'monitor':'pin',13,2)}<span class="ev-pl">${esc(x.place)}</span></span><span class="inv-by">${x.kind==='sup'?'Convite de '+esc(x.lead)+', supervisor':'Convite de '+esc(x.lead)+', líder da casa'}</span></span>
   ${x.st==='aceito'?ST2('ok','Vou'):off?ST2('mute','Não vou'):ST2('warn','Responder')}</div>
  ${x.st==='pendente'?`<div class="es2-a"><button class="btn primary sm" data-a="invOk" data-v="${x.id}">Aceitar</button><button class="btn ghost2 sm" data-a="invNo" data-v="${x.id}">Recusar</button></div>`
   :`<div class="inv-f">${x.st==='aceito'?`<span>${ic('bell',14,2)}${n===1?'Lembrete enviado: é amanhã':n===0?'É hoje':'Lembrete 1 dia antes'}</span>`:`<span>${ic('info',14,2)}${x.why?esc(x.why):'Sem motivo informado'}</span>`}<span class="row g2">${x.st==='aceito'&&x.remote?`<button class="tlink sm2" data-a="joinCall">${ic('monitor',14,2)}Entrar</button>`:''}<button class="tlink sm2" data-a="invReset" data-v="${x.id}">Mudar resposta</button></span></div>`}
 </article>`;}
function invBody(){const l=invMine(),p=l.filter(x=>x.st==='pendente'),r=l.filter(x=>x.st!=='pendente');
 return `<p class="callout" style="margin:0">Encontros da sua Casa${['lider','admin'].includes(S.role)?' e da supervisão da sua rede':''}. Responda para a liderança se organizar; a presença é marcada no dia.</p>
  ${p.length?`<div class="stack g3"><p class="eb2">Aguardando sua resposta · ${p.length}</p><div class="ev-list">${p.map(invCard).join('')}</div></div>`:''}
  ${r.length?`<div class="stack g3"><p class="eb2">Respondidos</p><div class="ev-list">${r.map(invCard).join('')}</div></div>`:''}
  ${l.length?'':'<div class="ev-none"><span>'+ic('calendar',20)+'</span><div class="stack" style="gap:2px"><b>Nenhum convite</b><span>Quando sua Casa marcar um encontro, ele aparece aqui.</span></div></div>'}`;}
{const base=agendaTab;agendaTab=function(){return S.ag.tab==='Encontros'?invBody():base();};}
function invNoSheet(id){const x=S.minv.find(e=>e.id===id);
 reasonSheet({title:'Recusar encontro',callout:esc(x.t)+' · '+fmtK(K(x.y,x.m,x.d))+' · '+x.h,ph:'Ex.: chego só na próxima semana',btn:'Recusar',who:x.lead.split(' ')[0],done:'Recusado',ms:600,
  run:async why=>{x.st='recusado';x.why=why;await closeSheet();softRender();toast('info','Encontro recusado',x.lead.split(' ')[0]+' vê sua resposta e o motivo.');}});}
Object.assign(A,{
 invOk:async(v,el)=>{const x=S.minv.find(e=>e.id===v);await busy(el,600,null,'Aceito');x.st='aceito';x.why='';softRender();toast('success','Presença confirmada','Você recebe um lembrete 1 dia antes.');},
 invNo:v=>invNoSheet(v),
 invReset:v=>{const x=S.minv.find(e=>e.id===v);x.st='pendente';x.why='';softRender();}});
{const base=A.goPending;A.goPending=()=>{if(!S.escalas.some(x=>x.st==='pendente')&&!S.discs.some(x=>x.st==='pendente')&&invPend()){S.ag.tab='Encontros';A.tab('agenda');return;}base();};}
{const base=A.openNotif;A.openNotif=v=>{const n=S.notifs.find(x=>x.id===v);if(n&&n.go==='encontros'){n.unread=false;S.ag.tab='Encontros';A.tab('agenda');return;}base(v);};}
S.notifs.unshift(
 {id:'nI2',t:'Convite: encontro da Rede Norte com o supervisor',s:'Ter, 6 out · 19h30 · remoto. Rodrigo Alves quer saber se você vai.',when:'Hoje · 10h20',grp:'Hoje',tone:'ceu',i:'calendar',go:'encontros',unread:true,lider:true},
 {id:'nI3',t:'Lembrete: encontro da Casa Jardins amanhã',s:'Qua, 30 set · 19h30 na casa da Ana Costa.',when:'Hoje · 09h30',grp:'Hoje',tone:'menta',i:'bell',go:'encontros',unread:true},
 {id:'nI1',t:'Convite: encontro da Casa Jardins',s:'Qua, 7 out · 19h30. Você vai?',when:'Hoje · 08h40',grp:'Hoje',tone:'menta',i:'calendar',go:'encontros',unread:true});
{const base=V.notifs;V.notifs=()=>{const all=S.notifs;S.notifs=all.filter(n=>!n.lider||['lider','admin'].includes(S.role));try{return base();}finally{S.notifs=all;}};}

