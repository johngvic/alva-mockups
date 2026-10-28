/* ================= Agenda: Cultos, Eventos, Calendário, Inscrições ================= */
const ETYPES=['Culto','Apresentação','Batismo','Consagração','Casamento','Retiro','Conferência','Evento especial','Integração'];
/* só estes três têm inscrição, ingresso, voucher, pagamento e check-in; culto e cerimônias não */
const SPECIAL=['Retiro','Conferência','Evento especial'];
const ETONE={Culto:'ceu',Apresentação:'laranja',Batismo:'menta',Consagração:'salvia',Casamento:'rosado',Retiro:'lima',Conferência:'damasco','Evento especial':'rosado',Integração:'ceu'};/* Integração: dia da integração, criado pela ficha da Integração, nunca público */
let _eid=0;
const R=(n,d,pay,val,vch)=>({id:'rg'+Math.random().toString(36).slice(2,8),n,d,pay,val,vch:vch||''});
const EV=(o)=>Object.assign({id:'ev'+(++_eid),kind:'evento',st:'confirmado',time:'19h',place:'Templo principal',min:'',paid:false,price:0,cap:0,regs:[],vouchers:[],checkin:'off',periods:[],items:[],tickets:[],rep:'none',prev:''},o);
const EVTS=[
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-09-27',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-10-04',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-10-11',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Jovens',type:'Culto',d:'2026-10-03',time:'19h30',min:'Jovens e Adolescentes',rep:'semanal',place:'Auditório'}),
 EV({t:'Retiro de Jovens 2026',type:'Retiro',d:'2026-10-17',time:'08h',place:'Chácara Alva',min:'Jovens e Adolescentes',paid:true,price:120,cap:100,checkin:'periodo',periods:['Sábado','Domingo'],items:[{n:'Almoço',price:25,p:'Sábado'},{n:'Almoço',price:25,p:'Domingo'}],
  regs:[R('Giovanna Martins','2026-09-10','pago',120),R('Renan Ferreira','2026-09-11','pendente',120),R('Camila Sousa','2026-09-12','pago',120),R('Thiago Mendes','2026-09-13','pendente',100,'RETIRO10'),R('Larissa Pinto Rocha','2026-09-14','pago',0,'BOLSA-INTEGRAL-LARISSA')],
  vouchers:[{code:'RETIRO10',disc:20,exp:'2026-09-30',mode:'liberado',email:'',uses:4},{code:'BOASVINDAS-GIOVANNA',disc:30,exp:'',mode:'especifico',email:'giovanna.martins@email.com',uses:0},{code:'BOLSA-INTEGRAL-LARISSA',disc:120,exp:'',mode:'especifico',email:'larissa.pr@email.com',uses:1}]}),
 EV({t:'Culto + Batismo',type:'Batismo',d:'2026-10-18',time:'16h',place:'Chácara Alva',regs:[R('Ana Lima','2026-09-20','—',0)]}),
 EV({t:'Conferência Missões',type:'Conferência',d:'2026-10-09',time:'19h30',place:'Auditório',paid:true,price:60,cap:150,checkin:'inteiro',regs:[R('Felipe Andrade','2026-09-18','pago',60),R('Diego Faria','2026-09-22','pendente',60)]}),
 EV({t:'Convergir 2027',type:'Conferência',st:'previsao',prev:'Fev/2027',d:''}),
 EV({t:'Congresso de Mulheres 2027',type:'Conferência',st:'previsao',prev:'Mar/2027',d:''}),
 EV({t:'12 Horas de Oração',type:'Evento especial',d:'2026-10-24',time:'05h às 17h',min:'Intercessão',regs:[R('Renata Campos','2026-09-25','—',0),R('Elisa Moura','2026-09-26','—',0)]}),
 (++_eid,null),/* o ensaio do louvor (ev11) saiu do mock; o id fica reservado para os seguintes não mudarem */
 EV({kind:'culto',t:'Culto de Quarta',type:'Culto',d:'2026-09-30',time:'19h30',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-10-18',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto de Celebração',type:'Culto',d:'2026-10-25',time:'10h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto da Noite',type:'Culto',d:'2026-10-04',time:'19h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto da Noite',type:'Culto',d:'2026-10-11',time:'19h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto da Noite',type:'Culto',d:'2026-10-18',time:'19h',min:'Louvor',rep:'semanal'}),
 EV({kind:'culto',t:'Culto da Noite',type:'Culto',d:'2026-10-25',time:'19h',min:'Louvor',rep:'semanal'})
].filter(Boolean);
/* Culto Kids: evento do ministério Kids (manhã e noite, todo domingo); reserva as salas do Kids em Espaços */
(()=>{const rooms=['s7','s8','s9','s4'],place='Sala Berçário + Sala Maternal + Sala Jardim + Sala Kids';
 [['10h','12:00','srK1','manhã'],['19h','21:00','srK2','noite']].forEach(([time,end,ser,l])=>{for(let i=0;i<13;i++){const x=new Date(2026,9,4+7*i),d=x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');EVTS.push(EV({kind:'culto',t:'Culto Kids · '+l,type:'Culto',d,time,end,min:'Kids',place,rooms,rep:'semanal',recTxt:'Todo domingo',ser}));}});})();
const MYESC=[{t:'Louvor · Culto de Celebração',min:'Louvor',d:'2026-10-04',role:'Vocal'},{t:'Louvor · Culto de Celebração',min:'Louvor',d:'2026-10-18',role:'Vocal'},{t:'Recepção · Conferência Missões',min:'Recepção',d:'2026-10-09',role:'Porta principal'}].sort((a,b)=>a.d<b.d?-1:1);
const BLOCKS=[{id:'b1',from:'2026-10-24',to:'2026-10-26',why:'Viagem em família'}];
Object.assign(S,{evt:null,etab:'det',eq:'',ef:'todos',etype:'todos',calM:'2026-10',calSel:null,caltab:'igreja',iqf:'todos',iq:''});
const eById=id=>EVTS.find(e=>e.id===id);
const brl=v=>v?`R$ ${(+v).toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:2})}`:'Gratuito';
const raised=e=>e.regs.filter(r=>r.pay==='pago').reduce((a,r)=>a+regTot(e,r),0);
const past=e=>e.d&&inDays(e.d)<0;
const tTag=t=>`<span class="stp" style="--c:var(--tone-${ETONE[t]}-ink);--b:color-mix(in srgb,var(--tone-${ETONE[t]}) 55%,transparent)"><i></i>${t}</span>`;
const sPill=e=>e.st==='previsao'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Previsão</span>':past(e)?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Realizado</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Confirmado</span>';
const dTile=e=>e.st==='previsao'?`<span class="edt prev"><small>prev.</small><b>${e.prev.split('/')[0]}</b><small>${e.prev.split('/')[1]}</small></span>`:`<span class="edt ${past(e)?'past':''}"><small>${wd(e.d)}</small><b>${+e.d.slice(8)}</b><small>${MONTHS[+e.d.slice(5,7)-1].slice(0,3)}</small></span>`;
const minOpts=v=>`<option value="">Nenhum · evento geral da igreja</option>${MINIS.filter(m=>m.active).map(m=>`<option value="${esc(m.n)}" ${v===m.n?'selected':''}>Ministério de ${esc(m.n)}</option>`).join('')}`;

/* ---------- list ---------- */
function evList(kind){
 /* Eventos lista só Retiro, Conferência e Evento especial (filtrável por Tipo); cultos e cerimônias têm menu próprio */
 const only=kind==='cultos'?'Culto':'',all=EVTS.filter(e=>only?e.type===only:SPECIAL.includes(e.type)),conf=all.filter(e=>e.st==='confirmado'&&!past(e)),regs=all.reduce((a,e)=>a+e.regs.length,0),paid=all.filter(e=>e.paid);
 return `<header class="ph rise"><div><p class="eb">Agenda</p><h1>${only?'Cultos':'Eventos'}</h1><p class="lede">${only?'Cultos recorrentes da igreja':'Retiros, conferências e eventos especiais. Filtre pelo tipo.'}</p></div>
  <div class="pact">${rpBtn('agenda','eventos')}${S.etype==='Apresentação'?`<button class="btn sec" data-a="bbRules">${ic('sliders',15)}Regras da apresentação</button>`:''}<button class="btn sec" data-a="export" data-v="o calendário (.ics)">Calendário (.ics)</button>
  <button class="btn pri" data-a="evAdd" data-v="${only?'culto':'evento'}">${ic('plus',15,2.2)}${only?'Novo culto':'Novo evento'}</button></div></header>
 <section class="card kpis4 k3 ${only?'k1 ':''}rise" style="--d:1">
  <div class="k4"><span class="kl">Próximos confirmados</span><span class="kv">${conf.length}</span><span class="kd">${all.filter(e=>e.st==='previsao').length} em previsão</span></div>
  ${only?'':`<div class="k4"><span class="kl">Inscritos</span><span class="kv">${regs}</span><span class="kd">em ${all.filter(e=>e.regs.length).length} eventos</span></div>
  <div class="k4"><span class="kl">Arrecadado</span><span class="kv">${brl(paid.reduce((a,e)=>a+raised(e),0))}</span><span class="kd">${paid.length} eventos pagos</span></div>`}
 </section>
 ${qdRenewBanner(evRenewable(!!only),'evRenew')}
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="eq" placeholder="Buscar por título" value="${esc(S.eq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos'],['confirmado','Confirmados'],['previsao','Previsão']].map(c=>`<button class="chipf ${S.ef===c[0]?'on':''}" data-a="evF" data-v="${c[0]}">${c[1]}<small>${c[0]==='todos'?all.length:all.filter(e=>e.st===c[0]).length}</small></button>`).join('')}</div>
  ${only?'':`<div style="position:relative"><button class="btn sec sel" data-a="etMenu">${S.etype==='todos'?'Todos os tipos':S.etype}${ic('updown',14)}</button><div class="pop" id="etPop" style="right:0;top:calc(100% + 6px)">${['todos',...SPECIAL].map(t=>`<button class="pi" data-a="evT" data-v="${t}">${t==='todos'?'Todos os tipos':t}${S.etype===t?`<span class="ck">${ic('check',16,2.25)}</span>`:''}</button>`).join('')}</div></div>`}</div>
  <div id="erows">${evRows(all,!!only)}</div></section>`;
}
function evRows(all,fixed){
 const q=norm(S.eq),l=all.filter(e=>(S.ef==='todos'||e.st===S.ef)&&(fixed||S.etype==='todos'||e.type===S.etype)&&(!q||norm(e.t).includes(q))).sort((a,b)=>(a.d||'9'+a.prev)<(b.d||'9'+b.prev)?-1:1);
 if(!l.length)return `<div class="mempty"><p>Nada por aqui.</p><span>Nenhum item corresponde a esses filtros.</span></div>`;
 return `${fixed?`<div class="trow ev e1 thead"><span>Evento</span><span>Situação</span><span></span></div>`:`<div class="trow ev e2 thead"><span>Evento</span><span>Tipo</span><span>Participação</span><span>Situação</span><span></span></div>`}${l.map(e=>`<div class="trow ev ${fixed?'e1':'e2'} ${past(e)?'off':''}" tabindex="0" data-a="evOpen" data-v="${e.id}">
  <span class="tn">${dTile(e)}<span class="hn"><b>${esc(e.t)}</b><span>${e.st==='previsao'?`Previsto para ${e.prev}`:`${e.time} · ${esc(e.place)}`}${e.min?` · ${esc(e.min)}`:''}${e.rep!=='none'?` · ${ic('swap',11,2)} semanal`:''}</span></span></span>
  ${fixed?'':`<span class="ety">${tTag(e.type)}</span>`}<span class="ts">${sPill(e)}</span>
  <span class="ein">${e.st==='previsao'?`<button class="btn sec sm" data-a="evConfirm" data-v="${e.id}">Confirmar data</button>`:fixed?'':isCer(e)?ceBadge(e):`<span class="eib"><b>${e.regs.length}${e.cap?`<span class="soft">/${e.cap}</span>`:''}</b> ${e.regs.length===1?'inscrito':'inscritos'}${e.cap?`<span class="tr"><i style="width:${Math.min(100,e.regs.length/e.cap*100)}%"></i></span>`:''}</span><span class="eip">${e.paid?evFromTxt(e):'Gratuito'}</span>`}</span>
  <span class="tc">${ic('chevR',16)}</span></div>`).join('')}<div class="tfoot"><span>${l.length} ${l.length===1?'item':'itens'}</span></div>`;
}

/* ---------- detail ---------- */
function evDetail(){
 const e=eById(S.evt);if(!e){S.evt=null;return calPage();}
 const pg=e.paid,cnt=e.regs.length,pd=e.regs.filter(r=>r.pay==='pago').length,cer=isCer(e),sp=SPECIAL.includes(e.type);
 /* cerimônia (apresentação, batismo, consagração, casamento): no lugar de inscrições, a lista de bebês, pessoas ou casais */
 const tabs=cer?[['det','Detalhes'],['cer',CERT[e.type].tab,ceList(e).length],['esc','Escalas',esOfEvt(e).length],['quad','Quadros',nxBdCount('evt',e.id)],['cx','Caixas',cxCount('evt',e.id)]]:e.type==='Integração'?[['det','Detalhes'],['igi','Inscritos',igiCount(e)],['esc','Escalas',esOfEvt(e).length],['quad','Quadros',nxBdCount('evt',e.id)],['cx','Caixas',cxCount('evt',e.id)]]:!sp?[['det','Detalhes'],['esc','Escalas',esOfEvt(e).length],['quad','Quadros',nxBdCount('evt',e.id)],['cx','Caixas',cxCount('evt',e.id)]]:[['det','Detalhes'],['ins','Inscrições',cnt],...(e.checkin!=='off'&&e.st==='confirmado'?[['eic','Check-in',eiDone(e)]]:[]),...(pg?[['vch','Vouchers',e.vouchers.length]]:[]),['esc','Escalas',esOfEvt(e).length],['quad','Quadros',nxBdCount('evt',e.id)],['cx','Caixas',cxCount('evt',e.id)]];
 if(!tabs.some(t=>t[0]===S.etab))S.etab='det';
 return `<nav class="crumb rise"><span class="soft">Agenda</span>${ic('chevR',13,2)}<button class="lnk back" data-a="evBack">${evFromLbl()}</button>${ic('chevR',13,2)}<span>${esc(e.t)}</span></nav>
 <header class="card prof rise" style="--d:1"><div class="pid">${dTile(e)}<div class="pn"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><h1>${esc(e.t)}</h1>${tTag(e.type)}${e.type==='Integração'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Não público</span>':''}${sPill(e)}${vemPill(e)}</div><p>${e.st==='previsao'?`Previsto para ${e.prev}`:`${wd(e.d)}, ${dBR(e.d)} · ${e.time} · ${esc(e.place)}`}${e.min?` · Ministério de ${esc(e.min)}`:''}</p></div></div>
  <div class="pact">${e.st==='previsao'?`<button class="btn pri" data-a="evConfirm" data-v="${e.id}">Confirmar data</button>`:e.type==='Integração'?`<button class="btn sec" data-a="igGoto" data-v="${e.ig}">${ic('users',15)}Abrir integração</button>`:`<button class="btn sec" data-a="copy" data-v="https://alva.app/e/${e.id}">${ic('share',15)}Copiar link</button>`}<div style="position:relative"><button class="ibtn" data-a="evMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="evPop" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="evDup" data-v="${e.id}">${ic('layers',17)}Duplicar</button><hr><button class="pi danger" data-a="evDel" data-v="${e.id}">${ic('x',17)}Excluir ${e.kind==='culto'?'culto':'evento'}</button></div></div></div>
  ${e.st==='previsao'?'':cer?ceKpis(e):!sp?'':`<div class="ikpi hk"><div><b>${cnt}${e.cap?`<small class="kof">/${e.cap}</small>`:''}</b><span>Inscritos</span></div>${evMoney(e)?`<div><b>R$ ${raised(e).toLocaleString('pt-BR')}</b><span>Arrecadado · ${pd} pagos</span></div><div><b>${cnt-pd}</b><span>Pagamentos pendentes</span></div>`:`<div><b>Gratuito</b><span>Inscrição</span></div>`}<div><b>${{off:'Sem check-in',inteiro:'1 código',periodo:e.periods.length+' códigos'}[e.checkin]}</b><span>Check-in</span></div></div>`}
  <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" class="${S.etab===t[0]?'on':''}" data-a="evTab" data-v="${t[0]}">${t[1]}${t[2]?`<small>${t[2]}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div id="etb" class="rise" style="--d:2">${({det:evDet,cer:cerTab,igi:igiTab,ins:evIns,eic:eiTab,vch:evVch,esc:evEsc,quad:e=>bdTab('evt',e.id),cx:e=>cxTab('evt',e.id)})[S.etab](e)}</div>`;
}
function evInfoRows(e){const rooms=(e.rooms||[]).map(slById).filter(Boolean),rec=e.rep&&e.rep!=='none'?(e.recTxt?e.recTxt.split(',')[0]:'Toda '+DOWF(dow(e.d))):'';
 const row=(step,icn,tone,l,main,sub)=>`<button class="evi-r" data-a="evEditAt" data-v="${step}" title="Editar ${l.toLowerCase()}"><span class="htile" style="--s:38px;background:var(--tone-${tone});color:var(--tone-${tone}-ink)">${ic(icn,17)}</span><span class="dkt"><span class="evi-l">${l}</span><b>${main}</b>${sub?`<span>${sub}</span>`:''}</span><span class="evi-e">${ic('pen',13)}</span></button>`;
 return [e.st==='previsao'?row('prev','calendar','ceu','Quando',`Previsto para ${esc(e.prev)}`,'Data ainda não definida'):row('when','calendar','ceu','Quando',`${DOWF(dow(e.d)).replace(/^./,c=>c.toUpperCase())}, ${dBR(e.d)}`,`${e.time}${e.end?' – '+hm(e.end):''} · ${rec?esc(rec.toLowerCase()):'data única'}${e.exc?' · alterado só nesta data':''}`),
  e.st==='previsao'?row('about','pin','menta','Onde','A definir','Escolhido ao confirmar a data'):row('where','pin','menta','Onde',esc(e.place||'—'),rooms.length?`${rooms.reduce((a,x)=>a+x.cap,0)} lugares · reservado em Espaços`:'Sem sala de Espaços vinculada'),
  row('about','ticket','damasco','Tipo',esc(e.type),isCer(e)?'A lista de '+CERT[e.type].pl+' fica no próprio evento':e.type==='Integração'?'Dia da integração · não público':e.kind==='culto'?'Culto da igreja':'Evento especial'),
  row('about','users','lima','Ministério',e.min?'Ministério de '+esc(e.min):'Evento geral da igreja',e.min?'Responsável pela organização':'Sem ministério responsável')].join('');}
function evDet(e){return '';}/* substituída por evDet no fim do arquivo */
function evIns(e){
 const pd=e.regs.filter(r=>r.pay==='pago').length;
 return `<section class="card mtab"><div class="tbar"><span class="who" style="margin-right:auto"><b style="color:var(--ink)">${e.regs.length}</b>${e.cap?` de ${e.cap} vagas`:' inscritos'}${e.paid?` · ${pd} pagos · ${brl(raised(e))}`:''}</span><button class="btn pri sm" data-a="evReg">${ic('plus',14,2.2)}Adicionar inscrição</button></div>
  ${e.regs.length?`<div class="trow rg thead"><span>Nome</span><span>Inscrição</span>${e.paid?'<span>Pagamento</span><span>Valor</span>':''}<span></span></div>${e.regs.map(r=>`<div class="trow rg ${e.paid?'':'free'} ${S.rgHi===r.id?'hi':''}" id="rg-${r.id}" tabindex="0" data-a="rgView" data-v="${r.id}" style="cursor:pointer"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span class="hn"><b>${esc(r.n)}</b>${r.vch?`<span class="mono vtag">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</span></span>
   <span class="rdt">${dBR(r.d)}</span>${e.paid?`<span class="ts">${r.pay==='pago'?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago</span>':'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente</span>'}</span><span class="rv mono">${r.val?brl(r.val):'Bolsa'}</span>`:''}
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="rgMenu" data-v="${r.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="rgPop-${r.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="rgView" data-v="${r.id}">${ic('eye',16)}Ver inscrição</button><hr>${e.paid&&r.pay!=='pago'?`<button class="pi" data-a="rgPaid" data-v="${r.id}">${ic('check',16)}Marcar como pago</button><button class="pi" data-a="rgLink" data-v="${r.id}">${ic('mail',16)}Reenviar link de pagamento</button><hr>`:''}<button class="pi danger" data-a="rgDel" data-v="${r.id}">${ic('x',16)}Cancelar compra</button></div></div></span></div>`).join('')}`
  :`<div class="mempty"><p>Ninguém inscrito ainda.</p><span>Compartilhe o link do evento ou adicione alguém manualmente.</span></div>`}</section>`;
}
function evVch(e){
 return `<section class="card mtab"><div class="tbar"><span class="who" style="margin-right:auto">Códigos de desconto válidos só para este evento.</span><button class="btn pri sm" data-a="vAdd">${ic('plus',14,2.2)}Novo voucher</button></div>
  ${e.vouchers.length?`<div class="vgrid">${e.vouchers.map((v,i)=>{const exp=v.exp&&inDays(v.exp)<0;return `<article class="vc ${exp?'exp':''}"><div class="vc1"><span class="mono vcode">${esc(v.code)}</span><button class="ibtn sm" data-a="vDel" data-v="${i}" aria-label="Excluir voucher">${ic('x',14)}</button></div>
   <div class="vc2"><b>${v.disc>=e.price?'100%':'− '+brl(v.disc)}</b><span>${v.disc>=e.price?'bolsa integral':`paga ${brl(Math.max(0,e.price-v.disc))}`}</span></div>
   <div class="vc3"><span>${v.mode==='liberado'?`${ic('users',13)}Qualquer pessoa`:`${ic('lock',13)}${esc(v.email)}`}</span><span>${v.uses} ${v.uses===1?'uso':'usos'}</span></div>
   <div class="vc4 ${exp?'bad':''}">${v.exp?(exp?`Expirou em ${dBR(v.exp)}`:`Vale até ${dBR(v.exp)}`):'Nunca expira'}</div></article>`;}).join('')}</div>`:`<div class="mempty"><p>Nenhum voucher.</p><span>Crie códigos de desconto ou bolsas para este evento.</span></div>`}</section>`;
}

const codeOf=(e,p)=>{e.codes=e.codes||{};if(!e.codes[p]){const a='ABCDEFGHJKMNPQRSTUVWXYZ23456789';let h=0;for(const c of e.id+p+(e.seed||''))h=(h*31+c.charCodeAt(0))>>>0;let o='';for(let k=0;k<6;k++){o+=a[h%a.length];h=Math.floor(h/a.length)+k*7919;}e.codes[p]=o.slice(0,3)+'-'+o.slice(3);}return e.codes[p];};
function tickets(e,r){
 const num=String(400+EVTS.indexOf(e)*37+e.regs.indexOf(r)+1),slug=t=>norm(t).replace(/[^a-z0-9]+/g,'-').toUpperCase();
 const acc=e.checkin==='off'?[{k:'insc',n:'Inscrição',tag:'Inscrição',code:''}]:e.checkin==='inteiro'?[{k:'geral',n:'Entrada geral',tag:'Acesso',code:`ALVA-${num}-ACESSO-GERAL`}]:e.periods.map(p=>({k:'p:'+p,n:'Entrada · '+p,tag:'Acesso',code:`ALVA-${num}-${slug(p)}`}));
 if(r.buy===undefined)r.buy=e.items.map((_,i)=>i).filter(i=>(r.n.length+i)%2===0&&r.pay!=='pendente');
 const its=r.buy.filter(i=>e.items[i]).map(i=>{const it=e.items[i];return {k:'i:'+i,n:it.n+(it.p?' · '+it.p:''),tag:'Compra',price:it.price,code:e.checkin==='off'?'':`ALVA-${num}-${slug(it.n+(it.p?'-'+it.p:''))}`};});
 return [...acc,...its];
}
function rgDlg(e,rid){
 const r=e.regs.find(x=>x.id===rid);if(!r)return;r.ck=r.ck||{};
 const mail=(MEMBERS.find(m=>m.n===r.n)||{}).e||norm(r.n).replace(/\s+/g,'.')+'@email.com';
 const tk=tickets(e,r),tot=(+r.val||0)+tk.filter(t=>t.price).reduce((a,t)=>a+t.price,0),done=tk.filter(t=>r.ck[t.k]).length,blocked=e.paid&&r.pay!=='pago';
 openDlg(`<div class="dh"><div class="drh"><span class="av lg" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><div><h3>${esc(r.n)}</h3><p>${esc(e.t)}</p></div></div><button class="ibtn sm" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>
  <dl class="kv grid2 rgkv"><div><dt>E-mail</dt><dd><span class="cp" data-a="copy" data-v="${esc(mail)}">${esc(mail)}</span></dd></div><div><dt>Inscrição</dt><dd>${dBR(r.d)}</dd></div>
   ${e.paid?`<div><dt>Pagamento</dt><dd>${r.pay==='pago'?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago</span>':'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente</span>'}</dd></div><div><dt>Total</dt><dd class="mono">${tot?brl(tot):'Bolsa integral'}${r.vch?` <span class="vtag mono">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</dd></div>`:''}</dl>
  <div class="sh" style="margin:20px 0 10px"><span class="fl">Ingressos e compras</span><span class="who">${e.checkin==='off'?'check-in desabilitado':`${done} de ${tk.length} com check-in`}</span></div>
  ${blocked?`<div class="rgwarn">${ic('alert',14,2)}O check-in libera quando o pagamento for confirmado.</div>`:''}
  <div class="tks">${tk.map(t=>{const c=r.ck[t.k];return `<div class="tk ${c?'in':''}"><div class="tkl"><div class="tk1"><b>${esc(t.n)}</b><span class="stp" style="--c:${t.tag==='Compra'?'var(--st-ace)':'var(--st-int)'};--b:${t.tag==='Compra'?'var(--st-ace-bg)':'var(--st-int-bg)'}"><i></i>${t.tag}</span>${t.price?`<span class="mono who">${brl(t.price)}</span>`:''}</div>${t.code?`<span class="mono tkc">${t.code}</span>`:''}</div>
   ${e.checkin==='off'?'':c?`<button class="tks-st ok" data-a="rgCk" data-v="${r.id}|${t.k}" title="Desfazer check-in">${ic('check',13,2.6)}Entrou às ${c}</button>`:`<button class="tks-st" data-a="rgCk" data-v="${r.id}|${t.k}" ${blocked?'disabled':''}>Aguardando · fazer check-in</button>`}</div>`;}).join('')}</div>
  <div class="dfoot" style="justify-content:space-between;margin-top:18px">${e.paid&&r.pay!=='pago'?`<button class="btn sec" data-a="rgLinkD" data-v="${r.id}">${ic('mail',15)}Reenviar link</button>`:'<span></span>'}<button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'');
}
/* ---------- calendário ---------- */
function calPage(){
 return `<header class="ph rise"><div><p class="eb">Agenda</p><h1>Calendário</h1><p class="lede">${S.caltab==='igreja'?'Todos os cultos e eventos da igreja':'Suas escalas e os períodos em que você não pode servir'}</p></div><div class="pact">${S.caltab==='igreja'?`<button class="btn sec" data-a="export" data-v="o calendário (.ics)">Calendário (.ics)</button>${rpBtn('agenda','eventos')}<button class="btn pri" data-a="evAdd" data-v="evento">${ic('plus',15,2.2)}Adicionar evento</button>`:`<button class="btn pri" data-a="blkAdd">${ic('plus',15,2.2)}Bloquear período</button>`}</div></header>
 <div class="utabs rise" style="--d:1">${[['igreja','Calendário da igreja'],['minha','Minha agenda']].map(t=>`<button class="${S.caltab===t[0]?'on':''}" data-a="calTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
 <div class="rise" style="--d:2">${S.caltab==='igreja'?calGrid():myAgenda()}</div>`;
}
function calGrid(){
 const [y,m]=S.calM.split('-').map(Number),first=new Date(y,m-1,1),days=new Date(y,m,0).getDate(),off=first.getDay();
 const iso=d=>`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
 const on=d=>EVTS.filter(e=>e.d===iso(d)),mine=d=>MYESC.filter(x=>x.d===iso(d)),blk=d=>BLOCKS.some(b=>iso(d)>=b.from&&iso(d)<=b.to);
 const sel=S.calSel&&S.calSel.startsWith(S.calM)?S.calSel:null;
 const cells=[];for(let i=0;i<off;i++)cells.push('<span class="cd0"></span>');
 for(let d=1;d<=days;d++){const es=on(d),me=mine(d),td=iso(d)==='2026-10-01';cells.push(`<button class="cdy ${td?'today':''} ${sel===iso(d)?'sel':''}" data-a="calDay" data-v="${iso(d)}"><span class="cn">${d}</span>${CASAS.some(c=>(c.ppl.some(p=>p.n===ME.n)||c===CASAS[0])&&c.meets.some(m=>m.scheduled&&!m.cancelled&&!m.done&&m.d===iso(d)))?'<span class="cev" style="--t:var(--brand-soft);--ti:var(--brand-text)">Casa</span>':''}${es.slice(0,2).map(e=>`<span class="cev" style="--t:var(--tone-${ETONE[e.type]});--ti:var(--tone-${ETONE[e.type]}-ink)">${esc(e.t)}</span>`).join('')}${es.length>2?`<span class="cmore">+${es.length-2}</span>`:''}</button>`);}
 const list=sel?[...on(+sel.slice(8))]:EVTS.filter(e=>e.d&&e.d.startsWith(S.calM)).sort((a,b)=>a.d<b.d?-1:1);
 return `<div class="calw"><section class="card pc cal"><div class="sh"><h2>${MONTHS[m-1][0].toUpperCase()+MONTHS[m-1].slice(1)} ${y}</h2><div class="row2"><button class="ibtn sm" data-a="calM" data-v="-1" aria-label="Mês anterior">${ic('chevL',15,2)}</button><button class="btn sec sm" data-a="calM" data-v="0">Hoje</button><button class="ibtn sm" data-a="calM" data-v="1" aria-label="Próximo mês">${ic('chevR',15,2)}</button></div></div>
  <div class="cgrid">${['dom','seg','ter','qua','qui','sex','sáb'].map(x=>`<span class="cwd">${x}</span>`).join('')}${cells.join('')}</div>
  <div class="cleg">${ETYPES.map(t=>`<span><i class="lt" style="background:var(--tone-${ETONE[t]})"></i>${t}</span>`).join('')}</div></section>
  <section class="card pc"><div class="sh"><h2>${sel?`${wd(sel)}, ${fmtD(sel)}`:'Neste mês'}</h2>${sel?'<button class="lnk" data-a="calDay" data-v="">Ver o mês</button>':''}</div>
   ${list.length?`<div class="clist">${list.map(e=>`<button class="dk" data-a="evOpen" data-v="${e.id}">${dTile(e)}<span class="dkt"><b>${esc(e.t)}</b><span>${e.time} · ${esc(e.place)}</span></span>${tTag(e.type)}</button>`).join('')}</div>`:'<p class="who" style="margin:0">Nada marcado.</p>'}
   ${!sel&&EVTS.some(e=>e.st==='previsao')?`<p class="fl" style="margin:16px 0 8px">Em previsão</p><div class="clist">${EVTS.filter(e=>e.st==='previsao').map(e=>`<button class="dk" data-a="evOpen" data-v="${e.id}">${dTile(e)}<span class="dkt"><b>${esc(e.t)}</b><span>Data a confirmar</span></span></button>`).join('')}</div>`:''}</section></div>`;
}
function myAgenda(){
 return `<div class="pgrid"><section class="card pc"><div class="sh"><h2>Minhas escalas</h2><span class="who">${MYESC.filter(x=>!x.off).length} confirmadas</span></div>${myLimit()}
  <div class="clist">${MYESC.map((x,i)=>`<div class="dk" style="cursor:default${x.off?';opacity:.55':''}"><span class="edt"><small>${wd(x.d)}</small><b>${+x.d.slice(8)}</b><small>${MONTHS[+x.d.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(x.t)}</b><span>${esc(x.role)} · ${inDays(x.d)<=7?'<b style="color:var(--st-sol)">em '+inDays(x.d)+' dias</b>':'em '+inDays(x.d)+' dias'}</span></span>${x.off?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Recusado</span>':`<button class="btn sec sm" data-a="escSwap" data-v="${i}">Pedir troca</button>`}</div>`).join('')}</div></section>
 <section class="card pc"><div class="sh"><h2>Meus bloqueios</h2><span class="who">${BLOCKS.length}</span></div>
  <p class="who" style="margin:-6px 0 14px">Nesses dias você não é sugerido em nenhuma escala: Louvor, Kids, Recepção ou qualquer outro ministério.</p>
  ${BLOCKS.length?`<div class="clist">${BLOCKS.map((b,i)=>`<div class="dk blkr" style="cursor:default"><span class="kfi" style="flex:none">${ic('pause',15)}</span><span class="dkt"><b>${b.from===b.to?fmtD(b.from):`${fmtD(b.from)} a ${fmtD(b.to)}`}</b><span>${esc(b.why||'Sem motivo informado')}</span></span><button class="ibtn sm" data-a="blkDel" data-v="${i}" aria-label="Remover bloqueio">${ic('x',14)}</button></div>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhum período bloqueado.</p>'}</section></div>`;
}

/* ---------- inscrições (todas) ---------- */
function insSum(rows,pend){
 const v=r=>regTot(r.e||EVTS.find(z=>z.regs.includes(r)),r),rec=rows.filter(r=>r.pay==='pago').reduce((a,r)=>a+v(r),0),aR=pend.reduce((a,r)=>a+v(r),0),tot=rec+aR,pct=tot?Math.round(rec/tot*100):0,paid=rows.filter(r=>r.pay==='pago'),tk=paid.filter(r=>v(r)>0);
 const evs=EVTS.filter(e=>evMoney(e)&&e.regs.length).map(e=>({e,r:e.regs.filter(x=>x.pay==='pago').reduce((a,x)=>a+v(x),0),p:e.regs.filter(x=>x.pay==='pendente').reduce((a,x)=>a+v(x),0)})).sort((a,b)=>(b.r+b.p)-(a.r+a.p)),mx=Math.max(1,...evs.map(x=>x.r+x.p));
 const m=n=>`<small>R$</small>${n.toLocaleString('pt-BR')}`;
 return `<section class="card insum rise" style="--d:1">
  <div class="ism"><span class="kl">Arrecadado</span><b class="ismv">${m(rec)}</b><span class="kd">de <b>R$ ${tot.toLocaleString('pt-BR')}</b> previstos · ${pct}% recebido</span>
   <div class="isbar" role="img" aria-label="${pct}% recebido"><i style="width:${pct}%"></i><em style="width:${100-pct}%"></em></div>
   <div class="islg"><span><i class="r"></i>Recebido<b>R$ ${rec.toLocaleString('pt-BR')}</b></span><span><i class="p"></i>A receber<b style="color:var(--st-sol)">R$ ${aR.toLocaleString('pt-BR')}</b></span></div></div>
  <div class="isev"><span class="kl">Por evento</span>${evs.map(x=>`<button class="isr" data-a="evOpenIns" data-v="${x.e.id}"><span class="isn">${esc(x.e.t)}</span><span class="isb"><i style="width:${x.r/mx*100}%"></i><em style="width:${x.p/mx*100}%"></em></span><span class="isvv">R$ ${x.r.toLocaleString('pt-BR')}${x.p?`<small>+${x.p.toLocaleString('pt-BR')}</small>`:''}</span></button>`).join('')}${pend.length?`<div class="isfoot"><span>${ic('alert',14,2)}<b>${pend.length}</b> pagamento${pend.length===1?'':'s'} pendente${pend.length===1?'':'s'} · R$ ${aR.toLocaleString('pt-BR')}</span></div>`:''}</div>
  <div class="isct">
   <div><b>${rows.length}</b><span>Inscrições<small>em ${EVTS.filter(e=>e.regs.length).length} eventos</small></span></div>
   <div><b style="${pend.length?'color:var(--st-sol)':''}">${pend.length}</b><span>Pendentes<small>sem pagar ainda</small></span></div>
   <div><b>${tk.length?'R$ '+Math.round(tk.reduce((a,r)=>a+v(r),0)/tk.length):'—'}</b><span>Ticket médio<small>só inscrições pagas</small></span></div>
  </div></section>`;
}

function inscPage(){
 const rows=EVTS.flatMap(e=>e.regs.map(r=>({...r,e}))),q=norm(S.iq);
 const l=rows.filter(r=>(S.iqf==='todos'||(S.iqf==='pago'?r.pay==='pago':S.iqf==='pendente'?r.pay==='pendente':r.pay==='—'))&&(!q||norm(r.n+' '+r.e.t).includes(q))).sort((a,b)=>a.d<b.d?1:-1);
 const pend=rows.filter(r=>r.pay==='pendente');
 return `<header class="ph rise"><div><p class="eb">Agenda</p><h1>Inscrições</h1><p class="lede">Todas as inscrições dos eventos</p></div><div class="pact">${rpBtn('agenda','inscricoes')}</div></header>
 ${insSum(rows,pend)}
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="iq2" placeholder="Buscar pessoa ou evento" value="${esc(S.iq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todas'],['pendente','Pendentes'],['pago','Pagas'],['gratis','Gratuitas']].map(c=>`<button class="chipf ${S.iqf===c[0]?'on':''}" data-a="iqF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div>
  ${l.length?`<div class="trow ai thead"><span>Pessoa</span><span>Evento</span><span>Pagamento</span><span>Data</span></div>${l.map(r=>`<div class="trow ai" tabindex="0" data-a="evOpenIns" data-v="${r.e.id}|${r.id}"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span><b>${esc(r.n)}</b></span></span><span class="aev">${esc(r.e.t)}</span><span class="ts">${r.pay==='pago'?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago · ${regTot(r.e,r)?brl(regTot(r.e,r)):'bolsa'}</span>`:r.pay==='pendente'?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente · ${brl(regTot(r.e,r))}</span>`:'<span class="soft">Gratuita</span>'}</span><span class="rdt">${dBR(r.d)}</span></div>`).join('')}`:'<div class="mempty"><p>Nada encontrado.</p></div>'}
  <div class="tfoot"><span>${l.length} inscrições</span></div></section>`;
}

/* ---------- behaviour ---------- */
function agAfter(){
 requestAnimationFrame(tabInd);
 const q=$('#eq');if(q)q.addEventListener('input',x=>{S.eq=x.target.value;$('#erows').innerHTML=evRows(S.active==='cultos'?EVTS.filter(e=>e.type==='Culto'):EVTS.filter(e=>SPECIAL.includes(e.type)),S.active==='cultos');});
 const q2=$('#iq2');if(q2)q2.addEventListener('input',x=>{S.iq=x.target.value;const p=x.target.selectionStart;render();const n=$('#iq2');n.focus();n.setSelectionRange(p,p);});
 const e=S.evt&&eById(S.evt);if(!e)return;
 const f=$('#eiF');if(f)f.addEventListener('submit',x=>{x.preventDefault();const fd=new FormData(f),t=fd.get('t').trim();if(!t){const i=f.t;i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent='Informe o título';i.focus();return;}
  if(f.d&&!f.d.value){f.d.closest('.fld').classList.add('bad');f.d.nextElementSibling.textContent='Escolha a data';return;}f.querySelector('[type=submit]').classList.add('busy');
  setTimeout(()=>{e.t=t;['d','time','place','type','min','prev'].forEach(k=>{if(fd.has(k))e[k]=fd.get(k);});S.eedit=false;render();toast('Informações atualizadas');},600);});
 const pg=$('#payG');if(pg)pg.addEventListener('change',x=>{e.paid=x.target.value==='1';if(e.paid&&!e.price)e.price=50;rerEv();toast(e.paid?'Inscrição agora é paga':'Inscrição agora é gratuita');});
 const pr=$('#ePrice');if(pr)pr.addEventListener('change',()=>{const v=+pr.value;if(v>0){e.price=v;toast(`Valor alterado para ${brl(v)}`);rerEv();}else pr.value=e.price;});
 const cp=$('#eCap');if(cp)cp.addEventListener('change',()=>{const v=+cp.value;if(cp.value&&v<e.regs.length){toast(`Já há ${e.regs.length} inscritos; as vagas não podem ser menos que isso`);cp.value=e.cap||'';return;}e.cap=v||0;toast(v?`${v} vagas`:'Sem limite de vagas');rerEv();});
 const ck=$('#ckG');if(ck)ck.addEventListener('change',x=>{e.checkin=x.target.value;rerEv();toast({off:'Check-in desabilitado',inteiro:'Um código para o evento inteiro',periodo:'Um código por período'}[e.checkin]);});
 const pf=$('#perF');if(pf)pf.addEventListener('submit',x=>{x.preventDefault();const i=pf.querySelector('input'),v=i.value.trim();if(!v)return i.focus();if(e.periods.some(p=>norm(p)===norm(v))){toast('Esse período já existe');return;}e.periods.push(v);rerEv();$('#perF input')?.focus();});
 const it=$('#itF');if(it)it.addEventListener('submit',x=>{x.preventDefault();const fd=new FormData(it),n=fd.get('n').trim(),p=+fd.get('p');if(!n){it.n.focus();return;}if(!(p>0)){it.p.focus();toast('Informe o preço do item');return;}e.items.push({n,price:p,p:fd.get('per')||''});rerEv();toast(`${n} adicionado`);});
}
function rerEv(){const y=window.scrollY;render();window.scrollTo(0,y);}
/* locais do evento = salas de Espaços; disponibilidade calculada com reservas e uso fixo */
function evOcc(d,rep){if(!d)return [];if(rep==='semanal')return Array.from({length:8},(_,i)=>addD(d,i*7));if(rep==='mensal'){const out=[d];let x=d;for(let i=0;i<60&&out.length<6;i++){x=addD(x,7);if(dow(x)===dow(d)&&nthOf(x)===nthOf(d)&&x.slice(5,7)!==out[out.length-1].slice(5,7))out.push(x);}return out;}return [d];}
function evRoomSt(sp,d,f,t,rep){if(!sp.act)return {k:'off',txt:sp.desc||'Indisponível'};if(!d||!f||!t||mm(t)<=mm(f))return {k:'idle',txt:`${sp.cap} lugares · ${sp.loc}`};
 const occ=evOcc(d,rep),hits=occ.map(x=>({x,c:conflict(sp.id,x,mm(f),mm(t))})).filter(z=>z.c);
 if(!hits.length)return {k:'ok',txt:occ.length>1?`Livre nas próximas ${occ.length} datas`:'Livre nesse horário'};
 const c=hits[0].c,when=`${tt(c.f).replace(':00','h').replace(':','h')}–${tt(c.t).replace(':00','h').replace(':','h')}`;
 return {k:'bad',txt:occ.length>1?`Ocupada em ${hits.length} de ${occ.length} datas · ${c.l}`:`Ocupada ${when} · ${c.l}`};}
const DOWF=w=>DOWN[w]+(w>0&&w<6?'-feira':'');
const EVTODAY='2026-10-08';
/* datas geradas pela programação (mesma regra do uso fixo das salas) */
function evRule(F){return UF(F.t||'Evento',F.f,F.to,F.freq,{days:F.days,mode:F.mmode,date:F.start,from:F.start,to:F.endK==='data'?F.endD:''});}
function evOccs(F,limit=1e9){if(!F.start)return [];if(F.freq==='none')return [F.start];if((F.freq==='semanal'||F.freq==='quinzenal')&&!F.days.length)return [];
 const ye=qdYE(F.start),end=F.endK==='data'&&F.endD&&F.endD<ye?F.endD:ye,max=Math.min(limit,F.endK==='vezes'?(+F.endN||1):1e9),u=evRule(F),out=[];let d=F.start;for(let i=0;i<400&&out.length<max;i++){if(d>end)break;if(ruleOn(u,d))out.push(d);d=addD(d,1);}return out;}
function evRecTxt(F,withEnd=true){if(!F.start&&F.freq==='none')return 'Escolha a data';const h=F.f&&F.to?`, das ${hm(F.f)} às ${hm(F.to)}`:'';let t='';
 if(F.freq==='none')t=`Uma vez, ${wd(F.start)} ${dBR(F.start)}`;
 else if(F.freq==='semanal')t=!F.days.length?'Escolha os dias da semana':F.days.length===1?(F.days[0]===0||F.days[0]===6?'Todo ':'Toda ')+DOWF(F.days[0]):'Toda semana: '+F.days.slice().sort().map(w=>DOWS[w]).join(', ');
 else if(F.freq==='quinzenal')t=!F.days.length?'Escolha os dias da semana':'A cada 2 semanas, '+F.days.slice().sort().map(w=>DOWF(w)).join(' e ');
 else if(F.freq==='mensal')t=!F.start?'Escolha a primeira data':F.mmode==='dia'?`Todo dia ${+F.start.slice(8)} do mês`:`${ORD(nthOf(F.start)).replace(/^./,c=>c.toUpperCase())} ${DOWF(dow(F.start))} de cada mês`;
 const end=F.freq==='none'||!withEnd?'':F.endK==='data'&&F.endD?` · até ${dBR(F.endD)}`:F.endK==='vezes'?` · ${F.endN} vezes`:'';
 return t+h+end;}
function evConf(sid,d,f,t,own){return busyOn(sid,d).find(b=>f<b.t&&t>b.f&&!(own&&((b.r&&own.ids.includes(b.r.ev))||(b.u&&(own.ids.includes(b.u.ev)||norm(b.u.l)===norm(own.t))))));}
function evRoomSt2(sp,F){if(!sp.act)return {k:'off',txt:sp.desc||'Indisponível'};const occ=evOccs(F,8);if(!occ.length||!F.f||!F.to||mm(F.to)<=mm(F.f))return {k:'idle',txt:`${sp.cap} lugares · ${sp.loc}`};
 const hits=occ.map(x=>({x,c:evConf(sp.id,x,mm(F.f),mm(F.to),F.own)})).filter(z=>z.c);if(!hits.length)return {k:'ok',txt:occ.length>1?`Livre nas próximas ${occ.length} datas`:'Livre nesse horário'};
 const c=hits[0].c;return {k:'bad',txt:occ.length>1?`Ocupada em ${hits.length} de ${occ.length} datas · ${c.l}`:`Ocupada ${hm(tt(c.f))}–${hm(tt(c.t))} · ${c.l}`,hits};}
/* ---------- bloco "Quando" (FND-M-27): o mesmo no evento e em todo encontro (casa, discipulado, caso pastoral, supervisor) ---------- */
const QD_FREQS=[['none','Uma vez','Data única'],['semanal','Toda semana','Em dias da semana'],['quinzenal','A cada 2 semanas','Semana sim, semana não'],['mensal','Todo mês','Uma vez por mês']];
const qdYE=s=>s?s.slice(0,4)+'-12-31':'';/* teto: 31/12 do ano da primeira data */
const qdInit=o=>Object.assign({freq:'none',days:[],start:'',mmode:'semana',endK:'data',endD:'',endN:8,f:'19:30',to:''},o||{});
function qdFix(Q){if(!Q.start||Q.freq==='none')return;const ye=qdYE(Q.start);if(Q.endK==='data'&&(!Q.endD||Q.endD>ye||Q.endD.slice(0,4)!==Q.start.slice(0,4)))Q.endD=ye;}
const qdOver=Q=>Q.freq!=='none'&&Q.endK==='vezes'&&evOccs(Q).length<(+Q.endN||1);
const qdNext=(days,today)=>{let d=today||EVTODAY;for(let i=0;i<14;i++){if(days.includes(dow(d)))return d;d=addD(d,1);}return today||EVTODAY;};
const qdTime=Q=>'<div class="evs-row"><label class="fld"><span class="fl">Horário</span><input type="time" name="t" data-k="f" value="'+Q.f+'"><span class="err"></span></label></div>';
function qdPreview(Q){const occ=evOccs(Q),show=occ.slice(0,6),over=qdOver(Q);
 return `<div class="evp-h">${ic('calendar',15,2)}<b>${esc(evRecTxt(Q))}</b></div>
  ${show.length?`<div class="evp-l">${show.map((d,i)=>`<span class="evp-d ${i===0?'first':''}"><small>${wd(d)}</small><b>${+d.slice(8)}</b><small>${MONTHS[+d.slice(5,7)-1].slice(0,3)}</small></span>`).join('')}${occ.length>6?`<span class="evp-more">+${occ.length-6}</span>`:''}</div>
  <p class="evp-f">${Q.freq==='none'?'Entra no calendário nesse dia.':`${occ.length} ${occ.length===1?'data entra':'datas entram'} no calendário, da primeira em ${dBR(occ[0])} até ${dBR(occ[occ.length-1])}.`}${over?` <b style="color:var(--st-rec)">Passa de 31/12: reduza o número de vezes.</b>`:''}</p>`:`<p class="evp-f">As datas aparecem aqui conforme você preenche.</p>`}`;}
function qdBlock(Q,o={}){const rec=Q.freq!=='none',ye=qdYE(Q.start||o.min||EVTODAY),yr=ye.slice(0,4),over=qdOver(Q),last=evOccs(Q).slice(-1)[0];
 return `<div class="evs-2" id="qdBox"><div class="evs-g one">
  ${o.scope||''}${o.noFreq?'':`<div class="fld"><span class="fl">Com que frequência?</span><div class="evq">${QD_FREQS.map(([v,l,sm])=>`<button type="button" class="evq-o ${Q.freq===v?'on':''}" data-set="freq|${v}"><b>${l}</b><small>${sm}</small></button>`).join('')}</div></div>`}
  ${Q.freq==='semanal'||Q.freq==='quinzenal'?`<div class="fld"><span class="fl">Em quais dias?</span><div class="evw">${[1,2,3,4,5,6,0].map(w=>`<button type="button" class="evw-d ${Q.days.includes(w)?'on':''}" data-day="${w}" title="${DOWF(w)}">${DOWS[w]}</button>`).join('')}</div><span class="err" id="evDaysErr"></span></div>`:''}
  <div class="evs-row"><label class="fld"><span class="fl">${rec?'Começa em':'Data'}</span><input type="date" name="d" data-k="start" value="${Q.start}" min="${o.min||EVTODAY}"><span class="err"></span></label>
   ${Q.freq==='mensal'&&Q.start?`<div class="fld"><span class="fl">Repete</span><div class="yn"><label><input type="radio" name="mmode" value="semana" ${Q.mmode==='semana'?'checked':''}><span>${ORD(nthOf(Q.start))} ${DOWS[dow(Q.start)]}</span></label><label><input type="radio" name="mmode" value="dia" ${Q.mmode==='dia'?'checked':''}><span>Dia ${+Q.start.slice(8)}</span></label></div></div>`:''}</div>
  ${typeof o.time==='function'?o.time(Q):o.time||''}
  ${rec?`<div class="fld"><span class="fl">Até quando?</span><div class="evq">${[['data','Até uma data'],['vezes','Número de vezes']].map(([v,l])=>`<button type="button" class="evq-o sm ${Q.endK===v?'on':''}" data-set="endK|${v}"><b>${l}</b></button>`).join('')}</div>
   ${Q.endK==='data'?`<label class="fld" style="margin-top:10px"><input type="date" data-k="endD" value="${Q.endD}" min="${Q.start||o.min||EVTODAY}" max="${ye}" aria-label="Última data"><span class="err"></span><span class="hint">Vai no máximo até 31/12 de ${yr}.</span></label>`:`<span class="ax-step evs-n"><button type="button" data-n="-1">${ic('minus',14,2.4)}</button><input data-k="endN" type="number" min="1" max="366" value="${Q.endN}"><button type="button" data-n="1">${ic('plus',14,2.4)}</button></span><span class="hint" style="display:block;margin-top:6px;${over?'color:var(--st-rec)':''}">${over?`Passa de 31/12 de ${yr}: reduza o número de vezes.`:last?`A última será em ${dBR(last)}.`:''}</span>`}</div>`:''}
  </div><aside class="evp" id="evPrev">${qdPreview(Q)}</aside></div>`;}
/* liga o bloco num diálogo de encontro: guarda o estado em Q e redesenha só o bloco */
function qdBind(root,Q,paint,today){
 root.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||!root.contains(t))return;
  if(t.dataset.set){const [k,v]=t.dataset.set.split('|');Q[k]=v;if(k==='freq'){const wk=v==='semanal'||v==='quinzenal';if(wk&&!Q.days.length&&Q.start)Q.days=[dow(Q.start)];if(wk&&Q.days.length&&!Q.start)Q.start=qdNext(Q.days,today);}paint();return;}
  if(t.dataset.day!=null){const w=+t.dataset.day;Q.days=Q.days.includes(w)?Q.days.filter(x=>x!==w):[...Q.days,w];if(Q.days.length&&(!Q.start||!Q.days.includes(dow(Q.start))))Q.start=qdNext(Q.days,today);paint();return;}
  if(t.dataset.n){Q.endN=Math.max(1,Math.min(366,(+Q.endN||1)+ +t.dataset.n));paint();}});
 root.addEventListener('change',e=>{const t=e.target;if(t.name==='mmode'){Q.mmode=t.value;paint();return;}
  const k=t.dataset&&t.dataset.k;if(!k)return;Q[k]=t.value;
  if(k==='start'&&t.value&&(Q.freq==='semanal'||Q.freq==='quinzenal')&&!Q.days.includes(dow(t.value)))Q.days=[...Q.days,dow(t.value)];
  if(['start','endD','endN'].includes(k))paint();});}
/* confere o bloco antes de salvar; devolve a mensagem (ou '') e o campo */
function qdCheck(Q){if(!Q.start)return ['[data-k=start]','Escolha a data'];if(Q.freq==='none')return null;
 if((Q.freq==='semanal'||Q.freq==='quinzenal')&&!Q.days.length)return ['#evDaysErr','Escolha pelo menos um dia'];
 if(Q.endK==='data'&&(!Q.endD||Q.endD<Q.start))return ['[data-k=endD]','Escolha uma data depois do início'];
 if(qdOver(Q))return ['[data-k=endN]','Passa de 31/12 de '+Q.start.slice(0,4)+': reduza o número de vezes'];
 if(!evOccs(Q).length)return ['[data-k=start]','Nenhuma data cai nessa programação'];return null;}
function qdShowErr(root,r){if(r[0][0]==='#'){const e=root.querySelector(r[0]);if(e)e.textContent=r[1];return;}const i=root.querySelector(r[0]);if(!i)return;const fl=i.closest('.fld');fl.classList.add('bad');const er=fl.querySelector('.err');if(er)er.textContent=r[1];i.focus&&i.focus();}
/* Renovar para o próximo ano: janela de fim de ano (parâmetro system.seriesRenewalWindowMonths) */
const qdWinM=()=>{const p=typeof SPAR!=='undefined'&&SPAR.find(x=>x.k==='system.seriesRenewalWindowMonths');return p?+p.val:1;};
const qdInWin=today=>+today.slice(5,7)>=13-qdWinM();
function qdRenewBanner(list,action,yearOf){if(!list.length)return '';const y=+EVTODAY.slice(0,4)+1;
 return `<section class="card pc rise" style="--d:1;margin-bottom:16px"><div class="sh"><h2>${list.length} ${list.length>1?'séries terminam':'série termina'} em 31/12</h2><span class="who">Renove para ${y} sem montar tudo de novo</span></div>${list.map(s=>`<div class="care-meeting"><span class="grow"><b>${esc(s.t)}</b><p class="who">${esc(s.txt)} · última data ${dBR(s.last)}</p></span><button class="btn pri sm" data-a="${action}" data-v="${s.id}">Renovar para ${y}</button></div>`).join('')}</section>`;}
/* Encontros em série (discipulado, caso, supervisor e ministério): aviso de renovação e escopo "só este / este e os próximos", iguais aos da casa */
const qdSerKey=m=>m.ser||m.series;
const qdSeriesOf=items=>{const g={};items.filter(x=>qdSerKey(x)&&!x.cancelled).forEach(x=>{(g[qdSerKey(x)]=g[qdSerKey(x)]||[]).push(x);});return Object.values(g).map(a=>a.sort((p,q)=>p.d<q.d?-1:1));};
function qdRenewFor(items,o){if(!qdInWin(EVTODAY))return '';const y=EVTODAY.slice(0,4);
 return qdRenewBanner(qdSeriesOf(items).filter(a=>a[a.length-1].d.slice(0,4)===y&&!a.some(x=>x.renewed)).map(a=>({id:(o.pre||'')+qdSerKey(a[0]),t:o.title(a[0]),txt:a[0].rep==='quinzenal'?'A cada 2 semanas':a[0].rep==='mensal'?'Todo mês':'Toda semana',last:a[a.length-1].d})),o.act);}
function qdRenewPreset(items,sid){const l=qdSeriesOf(items).find(a=>qdSerKey(a[0])===sid);if(!l)return null;const m0=l[l.length-1],y=+m0.d.slice(0,4)+1,days=m0.rdays||[...new Set(l.map(m=>dow(m.d)))].sort(),rp=m0.rep||'semanal',u=UF('x','00:00','01:00',rp,{days,mode:'semana',date:m0.d,from:m0.d});let d0=y+'-01-01';for(let i=0;i<400&&!ruleOn(u,d0);i++)d0=addD(d0,1);return {m0,q:{freq:rp,days,start:d0,mmode:'semana',endK:'data',endD:y+'-12-31'}};}
function qdScope(o){openDlg(dlgHead(o.title,o.sub||'')+'<form id="qdScF" class="fgrid one" novalidate><div class="fld"><div class="yn" role="radiogroup"><label><input type="radio" name="sc" value="one" checked><span>Só este encontro</span></label><label><input type="radio" name="sc" value="next"><span>Este e os próximos ('+o.n+')</span></label></div></div><p class="hint" style="margin:0">'+o.body+'</p><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Voltar</button><button type="submit" class="btn pri'+(o.danger?' danger':'')+'">'+o.label+'</button></div></form>','sm');
 $('#qdScF').onsubmit=e=>{e.preventDefault();const next=new FormData($('#qdScF')).get('sc')==='next';closeDlg();o.run(next);};}
function qdEditDlg(o){const v=o.vals,t=TODAY.toISOString().slice(0,10);
 openDlg(dlgHead(o.title,o.sub||'')+'<form class="fgrid" id="qdEdF" novalidate style="grid-template-columns:1fr 1fr">'
  +'<label class="fld"><span class="fl">Data</span><input type="date" name="d" min="'+(v.d<t?v.d:t)+'" value="'+v.d+'"><span class="err"></span></label>'
  +'<label class="fld"><span class="fl">Horário</span><input type="time" name="t" value="'+v.t+'"><span class="err"></span></label>'
  +'<div class="fld wide"><span class="fl">Modalidade</span><div class="yn" role="radiogroup"><label><input type="radio" name="mode" value="Presencial"'+(v.mode!=='Remoto'?' checked':'')+'><span>'+ic('pin',15)+'&nbsp;Presencial</span></label><label><input type="radio" name="mode" value="Remoto"'+(v.mode==='Remoto'?' checked':'')+'><span>'+ic('monitor',15)+'&nbsp;Remoto</span></label></div></div>'
  +'<label class="fld wide" data-w="p"><span class="fl">Local <small>opcional</small></span><input name="where" value="'+esc(v.where||'')+'" placeholder="'+esc(o.wherePh||'Ex.: Café da igreja, sala 2')+'"></label>'
  +'<label class="fld wide" data-w="r" hidden><span class="fl">Link da reunião <small>opcional</small></span><input name="link" type="url" value="'+esc(v.url||'')+'" placeholder="Meet, Teams, Zoom…"><span class="err"></span></label>'
  +(o.n?'<div class="fld wide"><span class="fl">Alterar</span><div class="yn" role="radiogroup"><label><input type="radio" name="sc" value="one" checked><span>Só este encontro</span></label><label><input type="radio" name="sc" value="next"><span>Este e os próximos ('+o.n+')</span></label></div><span class="hint">A data só muda neste encontro. Horário, modalidade, local e link valem também para os próximos, se você escolher.</span></div>':'')
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Salvar</button></div></form>');
 const f=$('#qdEdF'),bad=(n,m)=>{const i=f.elements[n],fl=i.closest('.fld');fl.classList.add('bad');const e=fl.querySelector('.err');if(e)e.textContent=m;i.focus();},sync=()=>{const r=f.elements.mode.value==='Remoto';f.querySelector('[data-w=r]').hidden=!r;f.querySelector('[data-w=p]').hidden=r;};sync();
 f.addEventListener('change',sync);f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),md=fd.get('mode'),lk=(fd.get('link')||'').trim(),d=fd.get('d'),tm=fd.get('t');
  if(!d)return bad('d','Escolha a data');if(!tm)return bad('t','Informe o horário');
  if(md==='Remoto'&&lk&&!/^https?:\/\/\S+/i.test(lk))return bad('link','Link inválido');
  const q={d,t:tm,mode:md,where:md==='Presencial'?(fd.get('where')||'').trim():'',url:md==='Remoto'?lk:''};
  if(o.check){const r=o.check(q);if(r)return bad(r[0],r[1]);}
  closeDlg();o.run(q,fd.get('sc')==='next');});}
function evRenewable(only){if(!qdInWin(EVTODAY))return [];const y=EVTODAY.slice(0,4),m={};
 EVTS.filter(e=>e.ser&&e.d&&e.st==='confirmado'&&(only?e.type==='Culto':SPECIAL.includes(e.type))).forEach(e=>{(m[e.ser]=m[e.ser]||[]).push(e);});
 return Object.values(m).map(l=>l.sort((a,b)=>a.d<b.d?-1:1)).filter(l=>l[l.length-1].d.slice(0,4)===y&&!l.some(e=>e.renewed)).map(l=>({id:l[0].ser,t:l[0].t,txt:l[0].recTxt||'Toda semana',last:l[l.length-1].d}));}
function evForm(kind,pre){
 const conf=!!pre?.confirm,c0=(pre?.type||(kind==='culto'?'Culto':''))==='Culto';
 const F={st:pre?.st||'confirmado',t:pre?.t||'',type:pre?.type||(c0?'Culto':'Retiro'),min:pre?.min||'',freq:c0?'semanal':'none',days:c0?[0]:[],mmode:'semana',start:'',f:pre?.f||(c0?'10:00':'19:30'),to:pre?.to||(c0?'12:00':'21:30'),endK:'data',endD:'',endN:8,rooms:pre?.rooms||(c0?['s1']:[]),other:false,addr:'',pay:!!pre?.pay,price:pre?.price||'',cap:pre?.cap||'',prev:'',ig:(igOpenList()[0]||{}).id||''};
 const ed=pre?.edit?eById(pre.edit):null;let series=[],scope='one';
 if(ed){series=(ed.ser?EVTS.filter(x=>x.ser===ed.ser):ed.rep&&ed.rep!=='none'?EVTS.filter(x=>x.kind===ed.kind&&x.t===ed.t&&x.rep===ed.rep&&x.d):[ed]).filter(x=>x===ed||(x.d&&ed.d&&x.d>ed.d)).sort((a,b)=>a===ed?-1:b===ed?1:a.d<b.d?-1:1);if(!series.includes(ed))series.unshift(ed);
  const tm0=ckMin(ed.time),linked=(ed.rooms||[]).filter(id=>slById(id)),guess=linked.length?linked:ESPS.filter(sp=>norm(sp.n)===norm(ed.place||'')).map(sp=>sp.id),rr=guess.length?guess:/templo|auditório/i.test(ed.place||'')?['s1']:[];
  Object.assign(F,{st:ed.st,t:ed.t,type:ed.type,min:ed.min||'',prev:ed.prev||'',start:ed.d||'',f:tt(tm0),to:ed.end||tt(Math.min(1439,tm0+120)),freq:'none',days:ed.d?[dow(ed.d)]:[],rooms:rr,other:!rr.length&&!!ed.place&&ed.place!=='A definir',addr:!rr.length&&ed.place!=='A definir'?(ed.place||''):'',pay:ed.paid,price:ed.price||'',cap:ed.cap||''});
  F.serFreq=['semanal','quinzenal','mensal'].includes(ed.rep)?ed.rep:'semanal';scope=series.length>1?'next':'one';if(scope==='next')F.freq=F.serFreq;
  F.own={ids:series.map(x=>x.id),t:ed.t};if(scope==='next'){F.endK='data';F.endD=series[series.length-1].d;}}
 const nextOn=days=>{let d=EVTODAY;for(let i=0;i<14;i++){if(days.includes(dow(d)))return d;d=addD(d,1);}return EVTODAY;};
 if(c0&&!ed)F.start=nextOn(F.days);
 if(pre?.renew)Object.assign(F,pre.renew);qdFix(F);
 let cur=0,reach=ed?9:0;
 const steps=()=>ed?(F.st==='previsao'?[['about','Sobre'],['prev','Quando']]:[['about','Sobre'],['when','Quando'],['where','Local']]):conf?[['when','Programação'],['where','Local'],((F.type==='Culto'||F.type==='Integração')?['rev','Revisão']:['sub',CERT[F.type]?'Vagas':'Inscrição'])]:F.st==='previsao'?[['about','Sobre'],['prev','Quando'],['rev','Revisão']]:[['about','Sobre'],['when','Programação'],['where','Local'],((F.type==='Culto'||F.type==='Integração')?['rev','Revisão']:['sub',CERT[F.type]?'Vagas':'Inscrição'])];
 if(ed&&pre.step){const i=steps().findIndex(x=>x[0]===pre.step);if(i>0)cur=i;}
 const scopeUI=()=>ed&&series.length>1?`<div class="fld"><span class="fl">Aplicar alterações a</span><div class="evq">${[['one','Só esta data',`${wd(ed.d)} ${dBR(ed.d).slice(0,5)}`],['next','Esta e as próximas',`${series.length} datas da série`]].map(([v,l,sm])=>`<button type="button" class="evq-o ${scope===v?'on':''}" data-scope="${v}"><b>${l}</b><small>${sm}</small></button>`).join('')}</div></div>`:'';
 const durTxt=()=>{if(!F.f||!F.to)return '';const m=mm(F.to)-mm(F.f);return m<=0?'termina antes de começar':`${Math.floor(m/60)?Math.floor(m/60)+'h':''}${m%60?String(m%60).padStart(Math.floor(m/60)?2:1,'0')+(Math.floor(m/60)?'':'min'):''}`;};
 const body=k=>{
  if(k==='about')return `<div class="evs-g">
   ${ed?'':`<div class="fld wide"><span class="fl">Situação</span><div class="vis two"><label><input type="radio" name="st" value="confirmado" ${F.st==='confirmado'?'checked':''}><span><b>Confirmado</b><small>Data definida. Reserva o local e abre inscrições.</small></span></label><label><input type="radio" name="st" value="previsao" ${F.st==='previsao'?'checked':''}><span><b>Previsão</b><small>Ainda sem data. Só marca o mês no planejamento.</small></span></label></div></div>`}
   <label class="fld wide"><span class="fl">Título</span><input data-k="t" value="${esc(F.t)}" placeholder="${F.type==='Culto'?'Ex.: Culto de Quarta':CERT[F.type]?'Ex.: '+({'Apresentação':'Apresentação de bebês','Batismo':'Batismo nas águas','Consagração':'Consagração de diáconos','Casamento':'Casamento coletivo'})[F.type]:'Ex.: Retiro de Casais'}" autocomplete="off"><span class="err"></span></label>
   ${SPECIAL.includes(F.type)||(F.type==='Integração'&&!ed)?`<div class="fld wide"><span class="fl">Tipo</span><div class="evty" role="radiogroup">${(ed?SPECIAL:[...SPECIAL,'Integração']).map(t=>{const m={'Culto':['church','Encontro da igreja reunida'],'Apresentação':['pacifier','Bebês apresentados ao Senhor'],'Batismo':['droplet','Celebração de batismos'],'Consagração':['flame','Obreiros e líderes'],'Casamento':['heart','Um ou mais casais'],'Retiro':['sunrise','Dias fora, com hospedagem'],'Conferência':['mic','Palestras e louvor'],'Evento especial':['sparkle','Qualquer outro encontro'],'Integração':['userplus','Dia da integração, não público']}[t]||['calendar',''];return `<label><input type="radio" name="etype" data-k="type" value="${t}" ${F.type===t?'checked':''}><span class="evty-i">${ic(m[0],17,2)}</span><span class="evty-t"><b>${t}</b><small>${m[1]}</small></span></label>`;}).join('')}</div></div>`:''}
   ${F.type==='Integração'&&!ed?igPick(F):''}
   <label class="fld wide"><span class="fl">Ministério responsável <small>opcional</small></span><span class="selw"><select data-k="min">${minOpts(F.min)}</select>${ic('updown',14)}</span></label></div>`;
  if(k==='prev')return `<div class="evs-g"><label class="fld wide"><span class="fl">Previsto para</span><input data-k="prev" value="${esc(F.prev)}" placeholder="Ex.: Fev/2027" autocomplete="off"><span class="err"></span></label><p class="hint wide">Quando a data for definida, use “Confirmar data” no evento para escolher programação e local.</p></div>`;
  if(k==='when')return qdBlock(F,{scope:scopeUI(),noFreq:(ed&&scope==='one')||F.type==='Integração',min:EVTODAY,time:`<div class="evs-row t"><label class="fld"><span class="fl">Início</span><input type="time" data-k="f" value="${F.f}"></label><label class="fld"><span class="fl">Término</span><input type="time" data-k="to" value="${F.to}"><span class="err"></span></label><span class="evs-dur ${F.f&&F.to&&mm(F.to)<=mm(F.f)?'bad':''}">${durTxt()}</span></div>`});
  if(k==='where'){const occ=evOccs(F,8);return `<p class="evs-ctx">${ic('calendar',14,2)}${esc(evRecTxt(F,false))}${occ.length>1?` · disponibilidade nas próximas ${occ.length} datas`:''}</p>
   <div class="evf-rooms">${ESPS.map(sp=>{const r=evRoomSt2(sp,F);return `<label class="evr ${sp.act?'':'off'}" data-k="${r.k}"><input type="checkbox" data-room="${sp.id}" ${F.rooms.includes(sp.id)?'checked':''} ${sp.act?'':'disabled'}><span class="htile" style="--s:36px;background:var(--tone-${sp.tone});color:var(--tone-${sp.tone}-ink)">${ic(sp.icon,16)}</span><span class="dkt"><b>${esc(sp.n)}</b><span class="evr-st">${esc(r.txt)}</span></span><i class="evr-ck">${ic('check',12,2.6)}</i></label>`;}).join('')}
    <label class="evr other"><input type="checkbox" data-other ${F.other?'checked':''}><span class="htile" style="--s:36px;background:var(--surface-2);color:var(--ink-muted)">${ic('pin',16)}</span><span class="dkt"><b>Outro endereço</b><span>Fora da igreja</span></span><i class="evr-ck">${ic('check',12,2.6)}</i></label></div>
   ${F.other?`<label class="fld" style="margin-top:10px"><input data-k="addr" value="${esc(F.addr)}" placeholder="Ex.: Chácara Alva, Estrada do Sol, 120 — Mairiporã" autocomplete="off"><span class="err"></span></label>`:''}
   <div id="evSum2">${whereSum()}</div>`;}
  if(k==='sub'||k==='rev'){const capT=F.rooms.reduce((a,id)=>a+slById(id).cap,0),place=evPlace();return `${k==='sub'?(CERT[F.type]?ceSubForm(F,capT):`<div class="evs-g evs-sub">
   <div class="fld"><span class="fl">Inscrição</span><div class="yn"><label><input type="radio" name="pay" value="0" ${F.pay?'':'checked'}><span>Gratuita</span></label><label><input type="radio" name="pay" value="1" ${F.pay?'checked':''}><span>Paga</span></label></div></div>
   ${F.pay?`<label class="fld"><span class="fl">Valor do ingresso</span><span class="mpre"><em>R$</em><input data-k="price" type="number" min="1" inputmode="decimal" value="${esc(F.price)}"></span><span class="err"></span><span class="hint">Depois você cria outros tipos de ingresso na página do evento.</span></label>`:''}
   <label class="fld"><span class="fl">Vagas <small>opcional</small></span><input data-k="cap" type="number" min="1" inputmode="numeric" value="${esc(F.cap)}" placeholder="${capT?`Até ${capT} lugares`:'Sem limite'}"></label>
   <p class="evf-cap wide" id="evCap" ${F.cap&&capT&&+F.cap>capT?'':'hidden'}>${ic('alert',13,2)}${F.cap} vagas é mais do que cabe no local (${capT} lugares).</p></div>`):''}
   <div class="evrv"><p class="fl">Revisão</p>
    ${[[ 'Título',esc(F.t||pre?.t||'—'),conf?null:'about'],F.st==='previsao'?['Quando','Previsto para '+esc(F.prev),'prev']:['Programação',esc(evRecTxt(F)),'when'],F.st==='previsao'?null:['Local',esc(place||'—'),'where'],F.st==='previsao'?null:CERT[F.type]?['Vagas',F.cap?F.cap+' vagas':'Sem limite',null]:(F.type==='Culto'||F.type==='Integração')?null:['Inscrição',F.pay?`Paga · R$ ${esc(F.price||'—')}`:'Gratuita'+(F.cap?` · ${F.cap} vagas`:''),null]].filter(Boolean).map(([l,v,go])=>`<div class="evrv-r"><span>${l}</span><b>${v}</b>${go?`<button type="button" class="lnk" data-jump="${go}">Editar</button>`:''}</div>`).join('')}
    ${F.st!=='previsao'&&F.rooms.length?`<p class="evrv-n">${ic('check',13,2.4)}${F.freq==='none'?'A reserva das salas é criada em Espaços.':'As salas recebem um uso fixo com essa programação em Espaços.'}</p>`:''}</div>`;}
  return '';};
 const evPlace=()=>[...F.rooms.map(id=>slById(id).n),...(F.other?[F.addr.trim()||'Outro endereço']:[])].join(' + ');
 const whereSum=()=>{const bad=F.rooms.map(id=>slById(id)).filter(sp=>evRoomSt2(sp,F).k==='bad');const place=evPlace();
  if(!place)return `<div class="evf-sum idle">${ic('pin',15,2)}<span><b>Onde vai ser?</b><small>Escolha uma ou mais salas, ou um endereço fora da igreja.</small></span></div>`;
  if(bad.length){const o=evOccs(F,1)[0],nf=F.freq==='none'&&o?nextFree(bad[0].id,o,mm(F.f),mm(F.to)):null;return `<div class="evf-sum bad">${ic('alert',15,2)}<span><b>${esc(bad.map(x=>x.n).join(' e '))} ${bad.length>1?'estão ocupadas':'está ocupada'}</b><small>${nf!=null?`Fica livre a partir de ${hm(tt(nf))}. `:''}Volte e mude o horário, ou escolha outra sala.</small></span></div>`;}
  return `<div class="evf-sum ok">${ic('check',15,2)}<span><b>${esc(place)}</b><small>${F.rooms.length?(F.freq==='none'?'A sala fica reservada para o evento.':'A sala fica reservada em todas as datas da programação.'):'Fora da igreja: nenhuma sala é reservada.'}</small></span></div>`;};
 openDlg(`<div id="evsW"></div>`,'lg evs');
 const W=$('#evsW');
 const draw=()=>{qdFix(F);const st=steps();cur=Math.min(cur,st.length-1);const k=st[cur][0],last=cur===st.length-1;
  const HINT={about:'Nome e quem organiza',prev:'Mês em que deve acontecer',rev:'Confira antes de salvar',when:'Quando acontece e se repete',where:'Onde acontece, com a disponibilidade das salas',sub:'Inscrição e revisão final'};
  W.innerHTML=`${dlgHead(ed?'Editar evento':conf?`Confirmar ${esc(pre.t)}`:'Novo evento',ed?(ed.d?`${esc(ed.t)} · ${wd(ed.d)} ${dBR(ed.d)}`:esc(ed.t)):HINT[k])}
   <div class="evs-steps">${st.map(([,l],i)=>`<button type="button" class="evs-st ${i<cur?'done':''} ${i===cur?'on':''}" data-go="${i}" ${i>reach?'disabled':''}><span>${i<cur?ic('check',11,3):i+1}</span><em>${l}</em></button>`).join('<i class="evs-ln"></i>')}</div>
   <div class="evs-body">${body(k)}</div>
   <div class="dfoot evs-foot"><button type="button" class="btn sec" ${cur?'data-back':'data-a="closeDlg"'}>${cur?ic('chevL',14,2)+'Voltar':'Cancelar'}</button>${ed&&!last?`<span class="evs-fr"><button type="button" class="btn sec" data-next>Próximo${ic('arrowR',14,2)}</button><button type="button" class="btn pri" data-save>Salvar alterações</button></span>`:''}<button type="button" class="btn pri" data-next ${ed&&!last?'hidden':''}>${last?(ed?'Salvar alterações':conf?'Confirmar data':'Criar evento'):'Continuar'+ic('arrowR',14,2)}</button></div>`;};
 const err=(sel,m)=>{const i=W.querySelector(sel);if(!i)return;const fl=i.closest('.fld');fl.classList.add('bad');const e=fl.querySelector('.err');if(e)e.textContent=m;i.focus&&i.focus();};
 const valid0=k=>{if(k==='about')return !!F.t.trim()&&(F.type!=='Integração'||!!ed||igOpenList().some(g=>g.id===F.ig));if(k==='prev')return /^[A-Za-zç]{3}\/\d{4}$/.test(F.prev.trim());if(k==='when')return !!F.start&&!!F.f&&!!F.to&&mm(F.to)>mm(F.f)&&evOccs(F).length>0&&!qdOver(F);if(k==='where')return (F.rooms.length||F.other&&F.addr.trim())&&!F.rooms.some(id=>evRoomSt2(slById(id),F).k==='bad');return true;};
 const valid=k=>{if(k==='about'){if(!F.t.trim()){err('[data-k=t]','Informe o título');return false;}
   if(F.type==='Integração'&&!ed&&!igOpenList().some(g=>g.id===F.ig)){toast('Escolha uma integração que ainda não tenha evento');return false;}}
  if(k==='prev'){if(!/^[A-Za-zç]{3}\/\d{4}$/.test(F.prev.trim())){err('[data-k=prev]','Use mês/ano, ex.: Fev/2027');return false;}}
  if(k==='when'){if((F.freq==='semanal'||F.freq==='quinzenal')&&!F.days.length){$('#evDaysErr').textContent='Escolha pelo menos um dia';return false;}
   if(!F.start){err('[data-k=start]','Escolha a data');return false;}if(!F.f||!F.to||mm(F.to)<=mm(F.f)){err('[data-k=to]','Termina antes de começar');return false;}
   if(F.freq!=='none'&&F.endK==='data'&&(!F.endD||F.endD<F.start)){err('[data-k=endD]','Escolha uma data depois do início');return false;}
   if(qdOver(F)){err('[data-k=endN]','Passa de 31/12 de '+F.start.slice(0,4)+': reduza o número de vezes');return false;}
   if(!evOccs(F).length){err('[data-k=start]','Nenhuma data cai nessa programação');return false;}}
  if(k==='where'){if(!F.rooms.length&&!F.other){toast('Escolha onde vai ser');return false;}if(F.other&&!F.addr.trim()){err('[data-k=addr]','Informe o endereço');return false;}
   if(F.rooms.some(id=>evRoomSt2(slById(id),F).k==='bad')){const sm=W.querySelector('.evf-sum');sm.classList.remove('shk');void sm.offsetWidth;sm.classList.add('shk');return false;}}
  if(k==='sub'){if(F.pay&&!(+F.price>0)){err('[data-k=price]','Informe o valor');return false;}}
  return true;};
 const evSaveEdit=()=>{const prev=F.st==='previsao',place=prev?'A definir':evPlace(),about={t:F.t.trim(),type:F.type,kind:F.type==='Culto'?'culto':'evento',min:F.min};let msg='Alterações salvas',first=ed;
  if(prev){Object.assign(ed,about,{st:'previsao',prev:F.prev.trim()});}
  else if(scope==='one'&&F.freq==='none'){Object.assign(ed,about,{st:'confirmado',prev:'',d:F.start,time:hm(F.f),end:F.to,place,rooms:F.rooms.slice()});
   for(let i=RESERVAS.length-1;i>=0;i--)if(RESERVAS[i].ev===ed.id)RESERVAS.splice(i,1);
   if(series.length<=1)ESPS.forEach(sp=>{sp.uso=sp.uso.filter(u=>u.ev!==ed.id);});
   F.rooms.forEach(id=>RESERVAS.push(Object.assign(RV(id,F.start,F.f,F.to,ed.cap||0,'Evento · '+(F.min||'Igreja'),about.t),{ev:ed.id})));
   if(series.length>1){ed.exc=true;msg=`Alterado só em ${dBR(F.start)}`;}}
  else{const occ=evOccs(F),ser=ed.ser||'sr'+Date.now(),recTxt=evRecTxt(F),ids=series.map(x=>x.id),pool=series.slice(),used=[];
   ESPS.forEach(sp=>{sp.uso=sp.uso.filter(u=>!ids.includes(u.ev));});for(let i=RESERVAS.length-1;i>=0;i--)if(ids.includes(RESERVAS[i].ev))RESERVAS.splice(i,1);
   occ.forEach(d=>{let x=pool.shift();if(!x){x=EV({kind:ed.kind,type:ed.type,paid:ed.paid,price:ed.price,cap:ed.cap});EVTS.push(x);}Object.assign(x,about,{st:'confirmado',prev:'',d,time:hm(F.f),end:F.to,place,rooms:F.rooms.slice(),rep:F.freq,recTxt:F.freq==='none'?'':recTxt,ser:F.freq==='none'?'':ser,exc:false});used.push(x);});
   pool.forEach(x=>{if(!ESCALAS.some(es=>es.dates.some(dt=>dt.ev===x.id))){const i=EVTS.indexOf(x);if(i>=0)EVTS.splice(i,1);}});
   F.rooms.forEach(id=>{const sp=slById(id);if(F.freq==='none')RESERVAS.push(Object.assign(RV(id,occ[0],F.f,F.to,ed.cap||0,'Evento · '+(F.min||'Igreja'),about.t),{ev:used[0].id}));else sp.uso.push(Object.assign(UF(about.t,F.f,F.to,F.freq,{days:F.days,mode:F.mmode,date:F.start,from:F.start,to:F.endK==='data'?F.endD:F.endK==='vezes'?occ[occ.length-1]:''}),{ev:used[0].id}));});
   first=used[0];msg=F.freq==='none'?'Alterações salvas':`${occ.length} datas atualizadas · ${recTxt.split(',')[0].toLowerCase()}`;}
  closeDlg();S.evt=first.id;S.eedit=false;render();toast(msg);};
 const save=bt=>{bt.classList.add('busy');setTimeout(()=>{if(ed)return evSaveEdit();const prev=F.st==='previsao',occ=prev?[]:evOccs(F),tm=hm(F.f),ser='sr'+Date.now(),recTxt=prev?'':evRecTxt(F),place=prev?'A definir':evPlace(),rep=F.freq;
   const base={t:F.t.trim()||pre?.t,type:F.type,kind:F.type==='Culto'?'culto':'evento',min:F.min,st:prev?'previsao':'confirmado',prev:prev?F.prev.trim():'',time:tm,end:F.to,place,rooms:prev?[]:F.rooms.slice(),paid:!prev&&F.pay,price:+F.price||0,cap:+F.cap||0,rep,recTxt,ser:rep!=='none'?ser:'',ig:F.type==='Integração'?F.ig:''};
   let e;if(conf){e=eById(pre.id);Object.assign(e,base,{t:e.t,type:e.type,d:occ[0],st:'confirmado',prev:''});occ.slice(1).forEach(d=>EVTS.push(EV({kind,...base,t:e.t,type:e.type,d})));}
   else if(prev){e=EV({kind,...base,d:''});EVTS.push(e);}
   else{occ.forEach((d,i)=>{const x=EV({kind,...base,d});EVTS.push(x);if(!i)e=x;});}
   if(F.type==='Integração'&&e&&ibyId(F.ig))ibyId(F.ig).ev=e.id;/* um evento ativo por integração */
   if(!prev)F.rooms.forEach(id=>{const sp=slById(id);if(rep==='none')RESERVAS.push(Object.assign(RV(id,occ[0],F.f,F.to,base.cap||0,'Evento · '+(F.min||'Igreja'),base.t),{ev:e.id}));else sp.uso.push(Object.assign(UF(base.t,F.f,F.to,rep,{days:F.days,mode:F.mmode,date:F.start,from:F.start,to:F.endK==='data'?F.endD:F.endK==='vezes'?occ[occ.length-1]:''}),{ev:e.id}));});
   if(pre?.renewOf)EVTS.forEach(x=>{if(x.ser===pre.renewOf)x.renewed=true;});
   closeDlg();if(pre?.back){S.active=pre.back;}else{S.evt=e.id;S.etab='det';S.active='calendario';}render();window.scrollTo({top:0});
   toast(prev?`${base.t} salvo como previsão`:rep==='none'?`${base.t} criado${F.rooms.length?' · sala reservada':''}`:`${base.t} criado · ${occ.length} datas no calendário${F.endK==='nunca'?', a partir de '+dBR(occ[0]):''}`);},700);};
 W.addEventListener('click',e=>{const t=e.target.closest('button,[data-room],[data-other]');if(!t)return;
  if(t.dataset.set){const [k,v]=t.dataset.set.split('|');F[k]=v;if(k==='freq'){if((v==='semanal'||v==='quinzenal')&&!F.days.length&&F.start)F.days=[dow(F.start)];if((v==='semanal'||v==='quinzenal')&&F.days.length&&!F.start)F.start=nextOn(F.days);}draw();return;}
  if(t.dataset.day!=null){const w=+t.dataset.day;F.days=F.days.includes(w)?F.days.filter(x=>x!==w):[...F.days,w];if(F.days.length&&(!F.start||!F.days.includes(dow(F.start))))F.start=nextOn(F.days);draw();return;}
  if(t.dataset.n){F.endN=Math.max(1,Math.min(366,(+F.endN||1)+ +t.dataset.n));draw();return;}
  if(t.dataset.scope){scope=t.dataset.scope;F.freq=scope==='one'?'none':F.serFreq;if(scope==='one'&&series[0])F.start=series[0].d;if(scope==='next'&&!F.days.length&&F.start)F.days=[dow(F.start)];if(scope==='next'){F.endK='data';F.endD=series[series.length-1].d;}draw();return;}
  if(t.dataset.go!=null){cur=+t.dataset.go;draw();return;}
  if(t.dataset.jump){cur=steps().findIndex(x=>x[0]===t.dataset.jump);draw();return;}
  if(t.hasAttribute('data-back')){cur--;draw();return;}
  if(t.hasAttribute('data-save')){const st=steps();if(!valid(st[cur][0]))return;for(const k of st.map(x=>x[0])){if(k===st[cur][0])continue;if(!valid0(k)){cur=st.findIndex(x=>x[0]===k);draw();valid(k);return;}}return save(t);}
  if(t.hasAttribute('data-next')){const st=steps();if(!valid(st[cur][0]))return;if(cur===st.length-1)return save(t);cur++;reach=Math.max(reach,cur);draw();W.closest('.dlg').scrollTop=0;return;}});
 W.addEventListener('change',e=>{const t=e.target;
  if(t.name==='st'){F.st=t.value;reach=0;draw();return;}
  if(t.name==='mmode'){F.mmode=t.value;draw();return;}
  if(t.name==='pay'){F.pay=t.value==='1';draw();return;}
  if(t.dataset.room){F.rooms=t.checked?[...F.rooms,t.dataset.room]:F.rooms.filter(x=>x!==t.dataset.room);draw();return;}
  if(t.hasAttribute('data-other')){F.other=t.checked;draw();return;}
  if(t.dataset.k){const k=t.dataset.k;
   if(k==='type'&&!ed){const was=F.type==='Culto',now=t.value==='Culto';if(now&&!was){Object.assign(F,{freq:'semanal',days:[0],f:'10:00',to:'12:00',rooms:F.rooms.length?F.rooms:['s1']});F.start=nextOn(F.days);}else if(was&&!now){Object.assign(F,{freq:'none',days:[],f:'19:30',to:'21:30'});}}
   if(k==='f'&&F.f&&F.to){const dur=mm(F.to)-mm(F.f);F.f=t.value;if(dur>0&&t.value)F.to=tt(Math.min(1439,mm(t.value)+dur));}else F[k]=t.value;
   if(k==='start'&&t.value&&(F.freq==='semanal'||F.freq==='quinzenal')&&!F.days.includes(dow(t.value)))F.days=[...F.days,dow(t.value)];
   if(['start','f','to','endD','endN','type','min'].includes(k))draw();}});
 W.addEventListener('input',e=>{const t=e.target;if(!t.dataset.k)return;F[t.dataset.k]=t.value;t.closest('.fld')?.classList.remove('bad');
  if(t.dataset.k==='addr'){const s2=$('#evSum2');if(s2)s2.innerHTML=whereSum();}
  if(t.dataset.k==='cap'){const capT=F.rooms.reduce((a,id)=>a+slById(id).cap,0),cp=$('#evCap');if(cp){cp.hidden=!(+F.cap&&capT&&+F.cap>capT);cp.innerHTML=`${ic('alert',13,2)}${F.cap} vagas é mais do que cabe no local (${capT} lugares).`;}}});
 draw();setTimeout(()=>W.querySelector('[data-k=t]')?.focus(),80);
}
const GA={
 evRenew:v=>{const l=EVTS.filter(e=>e.ser===v&&e.d).sort((a,b)=>a.d<b.d?-1:1),e0=l[0],last=l[l.length-1],y=+last.d.slice(0,4)+1,days=[...new Set(l.map(e=>dow(e.d)))].sort(),rep=e0.rep&&e0.rep!=='none'?e0.rep:'semanal',
  u=UF(e0.t,'00:00','01:00',rep,{days,mode:'semana',date:last.d,from:last.d});let d=y+'-01-01';for(let i=0;i<400&&!ruleOn(u,d);i++)d=addD(d,1);
  const tm=ckMin(e0.time);evForm(e0.kind,{t:e0.t,type:e0.type,min:e0.min,rooms:(e0.rooms||[]).slice(),f:tt(tm),to:e0.end||tt(Math.min(1439,tm+120)),pay:e0.paid,price:e0.price||'',cap:e0.cap||'',renewOf:v,renew:{freq:rep,days,mmode:'semana',start:d,endK:'data',endD:y+'-12-31'}});},
 gexpMenu:()=>{const p=$('#gexpPop');closePops(p);p.classList.toggle('open');},
 etMenu:()=>{const p=$('#etPop');closePops(p);p.classList.toggle('open');},
 evMenu:()=>{const p=$('#evPop');closePops(p);p.classList.toggle('open');},
 rgView:(v,b,x)=>{if(x&&x.target.closest('.hact'))return;closePops();rgDlg(eById(S.evt),v);},
 rgCk:v=>{const [rid,k]=v.split('|'),e=eById(S.evt),r=e.regs.find(x=>x.id===rid);r.ck=r.ck||{};if(r.ck[k]){const old=r.ck[k];delete r.ck[k];rgDlg(e,rid);toast('Check-in desfeito',()=>{r.ck[k]=old;rgDlg(e,rid);});return;}r.ck[k]=new Date().toTimeString().slice(0,5);rgDlg(e,rid);toast(`Check-in de ${r.n.split(' ')[0]} registrado`);},
 rgMenu:v=>{const p=$('#rgPop-'+v);closePops(p);p.classList.toggle('open');},
 evF:v=>{S.ef=v;render();},
 evT:v=>{S.etype=v;closePops();render();},
 evOpen:(v,b,x)=>{if(x&&x.target.closest('[data-a=evConfirm]'))return;const e=eById(v);S.bbf='todos';S.bbq='';S.evFrom=S.active==='calendario'&&!S.evt?'calendario':S.evFrom&&S.evt?S.evFrom:S.active;S.active=EVLISTS.includes(S.active)?S.active:'calendario';S.evt=v;S.etab=isCer(e)&&CERPG[S.active]?'cer':'det';S.eedit=false;render();window.scrollTo({top:0});},
 evOpenIns:v=>{const [eid,rid]=v.split('|');GA.evOpen(eid);S.etab='ins';S.rgHi=rid||null;render();if(rid)setTimeout(()=>{const el=document.getElementById('rg-'+rid);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.focus({preventScroll:true});}setTimeout(()=>{S.rgHi=null;el&&el.classList.remove('hi');},2600);},80);},
 evBack:()=>{const to=EVLISTS.includes(S.evFrom)?S.evFrom:'calendario';S.evt=null;S.active=to;render();window.scrollTo({top:0});},
 evTab:v=>{S.etab=v;S.eedit=false;render();},
 evEdit:()=>{const e=eById(S.evt);evForm(e.kind,{edit:e.id});},
 evEditAt:v=>{const e=eById(S.evt);evForm(e.kind,{edit:e.id,step:v});},
 evCancel:()=>{S.eedit=false;rerEv();},
 evAdd:v=>evForm(v),
 evConfirm:(v,b,x)=>{x&&x.stopPropagation();const e=eById(v);
  openDlg(`${dlgHead('Confirmar evento',`Defina a data de <b>${esc(e.t)}</b> (previsto para ${e.prev})${isCer(e)?'.':' e se a inscrição é gratuita ou paga.'}`)}
  <form class="fgrid" id="cfF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">Data confirmada</span><input name="d" type="date" min="2026-10-01"><span class="err"></span></label>
   <label class="fld"><span class="fl">Horário</span><input name="time" type="time" value="19:30"></label>
   ${isCer(e)?'':`<div class="fld wide"><span class="fl">Inscrição</span><div class="yn" id="cfP" style="max-width:280px"><label><input type="radio" name="pay" value="0" checked><span>Gratuita</span></label><label><input type="radio" name="pay" value="1"><span>Paga</span></label></div></div>`}
   <label class="fld" id="cfV" hidden><span class="fl">Valor da taxa</span><span class="mpre"><em>R$</em><input name="price" type="number" min="1" inputmode="decimal"></span><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Confirmar evento</button></div></form>`,'sm');
  const f=$('#cfF'),mo=()=>{const p=f.querySelector('[name=pay]:checked').value==='1';$('#cfV').hidden=!p;if(p)setTimeout(()=>f.price.focus(),30);};
  if($('#cfP'))$('#cfP').addEventListener('change',mo);f.addEventListener('input',z=>z.target.closest('.fld')?.classList.remove('bad'));setTimeout(()=>f.d.focus(),80);
  f.addEventListener('submit',z=>{z.preventDefault();const fd=new FormData(f),bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;i.focus();};
   if(!fd.get('d'))return bad('d','Escolha a data');const paid=fd.get('pay')==='1';if(paid&&!(+fd.get('price')>0))return bad('price','Informe o valor');
   f.querySelector('[type=submit]').classList.add('busy');setTimeout(()=>{Object.assign(e,{st:'confirmado',prev:'',d:fd.get('d'),time:(fd.get('time')||'19:30').replace(':00','h').replace(':','h').replace(/^0/,''),paid,price:paid?+fd.get('price'):0,cap:0});closeDlg();S.evFrom=S.active;S.active='calendario';S.evt=e.id;S.etab='det';render();window.scrollTo({top:0});toast(`${e.t} confirmado para ${dBR(e.d)}`);},700);});},
 ckRegen:v=>{const e=eById(S.evt),old=codeOf(e,v);confirmDel({title:'Gerar um novo código?',body:`O código atual <b class="mono">${old}</b> deixa de funcionar na hora. Quem já fez check-in não é afetado.`,label:'Gerar novo código',onConfirm:()=>{e.seed=(e.seed||0)+1;delete e.codes[v];rerEv();toast(`Novo código: ${codeOf(e,v)}`,()=>{e.codes[v]=old;rerEv();});}});},
 evDup:v=>{closePops();const e=eById(v),c=EV({...JSON.parse(JSON.stringify(e)),id:undefined,t:e.t+' (cópia)',regs:[],vouchers:[]});c.id='ev'+(++_eid);EVTS.push(c);S.evt=c.id;render();toast('Duplicado sem inscrições');},
 evDel:v=>{closePops();const e=eById(v);confirmDel({title:`Excluir ${e.t}?`,body:`${isCer(e)&&ceList(e).length?`${ceList(e).length} ${CERT[e.type].pl} deixam de constar neste evento e quem já foi confirmado é avisado. `:''}${e.regs.length?`As ${e.regs.length} inscrições serão canceladas e os inscritos avisados.${e.paid&&raised(e)?` Os reembolsos de ${brl(raised(e))} precisam ser combinados com a tesouraria.`:''} `:''}Esta ação não pode ser desfeita.`,label:'Excluir',typed:e.regs.length?e.t:null,onConfirm:()=>{EVTS.splice(EVTS.indexOf(e),1);INTEGS.forEach(g=>{if(g.ev===e.id)g.ev=null;});S.evt=null;render();toast(`${e.t} excluído`);}});},
 evPerDel:v=>{const e=eById(S.evt),p=e.periods[+v],used=e.items.some(i=>i.p===p);confirmDel({title:`Remover o período ${p}?`,body:`O código de check-in de ${p} deixa de valer.${used?' Os itens vinculados a ele passam a valer para o evento inteiro.':''}`,label:'Remover',onConfirm:()=>{e.periods.splice(+v,1);e.items.forEach(i=>{if(i.p===p)i.p='';});(e.tickets||[]).forEach(t=>{t.per=(t.per||[]).filter(x=>x!==p);});rerEv();toast('Período removido');}});},
 evItemDel:v=>{const e=eById(S.evt),it=e.items[+v];confirmDel({title:`Remover ${it.n}${it.p?' · '+it.p:''}?`,body:'Quem já comprou continua com o item; ele só deixa de ser vendido.',label:'Remover item',onConfirm:()=>{e.items.splice(+v,1);rerEv();toast('Item removido',()=>{e.items.splice(+v,0,it);rerEv();});}});},
 evReg:()=>{const e=eById(S.evt);if(e.cap&&e.regs.length>=e.cap){toast('Vagas esgotadas. Aumente as vagas para inscrever mais pessoas.');return;}const cand=MEMBERS.filter(m=>!e.regs.some(r=>r.n===m.n));
  openDlg(`${dlgHead('Adicionar inscrição',esc(e.t))}<label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="rq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="rpk" style="max-height:200px">${candList(cand,'')}</div>
   ${e.paid?`<label class="fld" style="margin-top:14px"><span class="fl">Voucher <small>opcional</small></span><input id="rv" class="mono" placeholder="Ex.: RETIRO10" autocomplete="off" style="text-transform:uppercase"><span class="err"></span></label><p class="rtot" id="rtot">Valor da inscrição: <b>${brl(e.price)}</b></p>`:''}
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="evRegDo">Inscrever</button></div>`,'sm');
  $('#rq').addEventListener('input',x=>{$('#rpk').innerHTML=candList(cand,x.target.value);});
  const rv=$('#rv');if(rv)rv.addEventListener('input',()=>{const c=rv.value.trim().toUpperCase(),fl=rv.closest('.fld');fl.classList.remove('bad');if(!c){$('#rtot').innerHTML=`Valor da inscrição: <b>${brl(e.price)}</b>`;return;}const v=e.vouchers.find(x=>x.code===c);
   if(!v){$('#rtot').innerHTML=`Valor da inscrição: <b>${brl(e.price)}</b>`;return;}if(v.exp&&inDays(v.exp)<0){fl.classList.add('bad');fl.querySelector('.err').textContent=`Expirou em ${dBR(v.exp)}`;return;}
   $('#rtot').innerHTML=`<s>${brl(e.price)}</s> → <b>${brl(Math.max(0,e.price-v.disc))}</b> com ${v.code}${v.mode==='especifico'?` · só para ${esc(v.email)}`:''}`;});},
 evRegDo:(v,b)=>{const e=eById(S.evt),s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const m=byId(s.value);let val=e.paid?e.price:0,code='';const rv=$('#rv');
  if(rv&&rv.value.trim()){code=rv.value.trim().toUpperCase();const vc=e.vouchers.find(x=>x.code===code);const fl=rv.closest('.fld');if(!vc){fl.classList.add('bad');fl.querySelector('.err').textContent='Voucher não encontrado neste evento';return;}if(vc.exp&&inDays(vc.exp)<0){fl.classList.add('bad');fl.querySelector('.err').textContent=`Expirou em ${dBR(vc.exp)}`;return;}if(vc.mode==='especifico'&&vc.email!==m.e){fl.classList.add('bad');fl.querySelector('.err').textContent=`Este voucher é só para ${vc.email}`;return;}val=Math.max(0,e.price-vc.disc);vc.uses++;}
  b.classList.add('busy');setTimeout(()=>{e.regs.push(R(m.n,'2026-10-01',e.paid?(val===0?'pago':'pendente'):'—',val,code));closeDlg();rerEv();toast(e.paid&&val>0?`${m.n.split(' ')[0]} inscrito(a) · link de pagamento enviado`:`${m.n.split(' ')[0]} inscrito(a)`);},600);},
 rgPaid:v=>{closePops();const e=eById(S.evt),r=e.regs.find(x=>x.id===v),base=regTot(e,r),st={m:'Pix',dt:'value',dv:0};
  openDlg(`${dlgHead('Marcar como pago',esc(r.n)+' · '+brl(base))}<div id="rgPW">${posPayHtml(st)}<div id="posTot" class="pos-tot" style="margin-top:14px"></div><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="rgPaidDo" data-v="${r.id}">Confirmar pagamento</button></div></div>`,'sm');
  const paint=()=>{const d=posDisc(st,base);$('#posTot').innerHTML=`<div><span>Valor da compra</span><b>${brl(base)}</b></div>${d?`<div><span>Desconto</span><b>− ${brl(d)}</b></div>`:''}<div class="big"><span>Total · ${st.m}</span><b>${brl(base-d)}</b></div>`;};
  const W=$('#rgPW');W._st=st;W._base=base;posWire('#rgPW',st,paint);paint();},
 rgPaidDo:v=>{const e=eById(S.evt),r=e.regs.find(x=>x.id===v),W=$('#rgPW'),st=W._st,d=posDisc(st,W._base);
  if(W._base>0&&d>=W._base){toast('O desconto não pode ser igual ao total. Para cortesia, use um voucher de bolsa integral.');return;}
  const was={pay:r.pay,cm:r.cm,cd:r.cd};r.pay='pago';r.cm=st.m;r.cd=d||undefined;closeDlg();rerEv();toast(`Pagamento de ${r.n.split(' ')[0]} registrado`,()=>{r.pay=was.pay;r.cm=was.cm;r.cd=was.cd;rerEv();});},
 rgLinkD:v=>{const r=eById(S.evt).regs.find(x=>x.id===v);toast(`Link de pagamento reenviado para ${r.n.split(' ')[0]}`);},
 rgLink:v=>{closePops();const r=eById(S.evt).regs.find(x=>x.id===v);toast(`Link de pagamento reenviado para ${r.n.split(' ')[0]}`);},
 rgDel:v=>{closePops();const e=eById(S.evt),i=e.regs.findIndex(x=>x.id===v),r=e.regs[i],f=r.n.split(' ')[0],gr=r.sale?e.regs.filter(x=>x.sale===r.sale):[r],gt=gr.reduce((a,x)=>a+regTot(e,x),0),paid=r.pay==='pago'&&gt>0;
  if(!paid){confirmDel({title:`Cancelar a compra de ${f}?`,body:`${r.pay==='pendente'?'Compra pendente: nada é cobrado. ':''}A compra inteira é cancelada, com todos os ingressos e itens, e a vaga fica livre.`,label:'Cancelar compra',onConfirm:()=>{const was=gr.map(x=>({x,st:x.st,pay:x.pay}));gr.forEach(x=>{x.st='cancelada';if(x.pay==='pendente')x.pay='cancelado';});rerEv();toast('Compra cancelada',()=>{was.forEach(w=>{w.x.st=w.st;w.x.pay=w.pay;});rerEv();});}});return;}
  openDlg(`${dlgHead(`Cancelar a compra de ${esc(f)}?`,'O cancelamento é da compra inteira, com todos os ingressos e itens. A vaga fica livre.')}<form id="rgCxF" class="fgrid one" novalidate>
   <label class="fld"><span class="fl">Percentual a reembolsar</span><span class="sp-unit"><input name="p" type="number" min="0" max="100" value="100"><em>%</em></span><span class="hint">Total da compra: ${brl(gt)}. O reembolso é solicitado ao provedor de pagamento.</span><span class="err"></span></label>
   <label class="fld"><span class="fl">Motivo</span><input name="why" placeholder="Ex.: pediu o cancelamento" autocomplete="off"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Voltar</button><button type="submit" class="btn pri">Cancelar compra</button></div></form>`,'sm');
  const fm=$('#rgCxF');fm.addEventListener('submit',ev=>{ev.preventDefault();const p=+fm.p.value,bad=(el,m)=>{const fl=el.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;};
   if(!(p>=0&&p<=100))return bad(fm.p,'Use um percentual de 0 a 100');if(!fm.why.value.trim())return bad(fm.why,'Informe o motivo');
   gr.forEach(x=>{x.st='cancelada';x.pay=p>0?'reembolso':'pago';x.cxWhy=fm.why.value.trim();x.cxPct=p;});closeDlg();rerEv();toast(p>0?`Compra cancelada · reembolso de ${p}% solicitado`:'Compra cancelada sem reembolso');});},
 vAdd:()=>{const e=eById(S.evt);evEnsure(e);openDlg(`${dlgHead('Novo voucher',`Desconto no ${esc(e.t)} (${brl(evTop(e))})`)}<form class="fgrid" id="vF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld wide"><span class="fl">Código</span><input name="code" class="mono" placeholder="Ex.: RETIRO10" autocomplete="off" style="text-transform:uppercase"><span class="err"></span></label>
   <div class="fld"><span class="fl">Desconto</span><div class="pos-disc"><div class="segc"><button type="button" data-vt="val" aria-pressed="true">R$</button><button type="button" data-vt="pct" aria-pressed="false">%</button></div><input name="disc" type="number" min="1" max="${evTop(e)}" inputmode="decimal" placeholder="0"></div><input type="hidden" name="vt" value="val"><span class="hint" id="vH">Até ${brl(evTop(e))} (bolsa integral)</span><span class="err"></span></div>
   <label class="fld"><span class="fl">Expira em <small>opcional</small></span><input name="exp" type="date" min="2026-10-01"></label>
   <div class="fld wide"><span class="fl">Quem pode usar</span><div class="vis two" id="vmG"><label><input type="radio" name="mode" value="liberado" checked><span><b>Qualquer pessoa</b><small>Quem tiver o código.</small></span></label><label><input type="radio" name="mode" value="especifico"><span><b>Uma pessoa</b><small>Só um e-mail autorizado.</small></span></label></div></div>
   <label class="fld wide" id="vEm" hidden><span class="fl">E-mail autorizado</span><input name="email" type="email" placeholder="pessoa@email.com"><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="vOk" disabled>Criar voucher</button></div></form>`,'sm');
  const f=$('#vF'),chk=()=>{const sp=f.mode.value==='especifico',pc=f.vt.value==='pct';$('#vEm').hidden=!sp;f.disc.max=pc?100:evTop(e);const d=+f.disc.value;$('#vH').textContent=pc?(d>=100?'Bolsa integral: a inscrição fica gratuita':d>0?`${d}% de desconto no ingresso`:'De 1% a 100% do valor do ingresso'):d>0?(d>=evTop(e)?'Bolsa integral: a inscrição fica gratuita':`${evMulti(e)?brl(d)+' de desconto no ingresso':'Paga '+brl(evTop(e)-d)}`):`Até ${brl(evTop(e))} (bolsa integral)`;$('#vOk').disabled=!(f.code.value.trim().length>=3&&d>0&&(!sp||/^\S+@\S+\.\S+$/.test(f.email.value)));};
  f.addEventListener('input',x=>{x.target.closest('.fld')?.classList.remove('bad');if(x.target.name==='code')x.target.value=x.target.value.toUpperCase().replace(/\s/g,'-');chk();});f.addEventListener('change',chk);f.addEventListener('click',x=>{const b=x.target.closest('[data-vt]');if(!b)return;f.vt.value=b.dataset.vt;$$('#vF .segc button').forEach(y=>y.setAttribute('aria-pressed',y===b));chk();});
  f.addEventListener('submit',x=>{x.preventDefault();const c=f.code.value.trim();if(e.vouchers.some(v=>v.code===c)){f.code.closest('.fld').classList.add('bad');f.code.nextElementSibling.textContent='Esse código já existe neste evento';f.code.focus();return;}const pcv=f.vt.value==='pct';if(+f.disc.value>(pcv?100:evTop(e))){f.disc.closest('.fld').classList.add('bad');f.disc.closest('.fld').querySelector('.err').textContent=pcv?'No máximo 100%':`No máximo ${brl(evTop(e))}`;return;}
   $('#vOk').classList.add('busy');setTimeout(()=>{e.vouchers.push({code:c,type:f.vt.value,disc:f.vt.value==='pct'?Math.min(+f.disc.value,100):Math.min(+f.disc.value,evTop(e)),exp:f.exp.value,mode:f.mode.value,email:f.mode.value==='especifico'?f.email.value.trim():'',uses:0});closeDlg();rerEv();toast(`Voucher ${c} criado`);},500);});},
 vDel:v=>{const e=eById(S.evt),c=e.vouchers[+v];confirmDel({title:`Excluir o voucher ${c.code}?`,body:`${c.uses?`Ele já foi usado ${c.uses} ${c.uses===1?'vez':'vezes'}; essas inscrições mantêm o desconto. `:''}Ninguém mais consegue usar o código.`,label:'Excluir voucher',onConfirm:()=>{e.vouchers.splice(+v,1);rerEv();toast('Voucher excluído',()=>{e.vouchers.splice(+v,0,c);rerEv();});}});},
 calTab:v=>{S.caltab=v;render();},
 calM:v=>{if(v==='0'){S.calM='2026-10';S.calSel='2026-10-01';}else{let [y,m]=S.calM.split('-').map(Number);m+=+v;if(m<1){m=12;y--;}if(m>12){m=1;y++;}S.calM=`${y}-${String(m).padStart(2,'0')}`;S.calSel=null;}render();},
 calDay:v=>{S.calSel=v||null;render();},
 escSwap:v=>{const x=MYESC[+v];if(!x)return;
  openDlg(`${dlgHead('Pedir troca',`${esc(x.t)} · ${wd(x.d)} ${fmtD(x.d)}`)}<form class="fgrid one" id="swF" novalidate><p class="hint" style="margin:0">Você deixa de estar nesta escala e a liderança de ${esc(x.min)} procura outra pessoa.</p>
   <label class="fld"><span class="fl">Motivo</span><textarea class="ta" name="m" rows="3" maxlength="200" placeholder="Ex.: viajo nesse fim de semana; posso trocar com alguém do time?"></textarea><span class="err"></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Voltar</button><button type="submit" class="btn pri">Pedir troca</button></div></form>`,'sm');
  const f=$('#swF');f.m.addEventListener('input',()=>f.m.closest('.fld').classList.remove('bad'));
  f.addEventListener('submit',e=>{e.preventDefault();const why=f.m.value.trim();if(!why){const fl=f.m.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Informe o motivo';return;}
   x.off=true;x.why=why;closeDlg();render();toast('Troca pedida · a liderança de '+x.min+' vai procurar outra pessoa');});},
 blkAdd:()=>{openDlg(`${dlgHead('Bloquear período','Você não será sugerido em escalas nesses dias.')}<form class="fgrid" id="bF" novalidate style="grid-template-columns:1fr 1fr">
   <label class="fld"><span class="fl">De</span><input name="from" type="date" min="2026-10-01"><span class="err"></span></label><label class="fld"><span class="fl">Até</span><input name="to" type="date" min="2026-10-01"><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Motivo <small>opcional, só a liderança vê</small></span><input name="why" placeholder="Ex.: Viagem"></label><p class="hint wide" id="bH" style="margin:-6px 0 0"></p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Bloquear</button></div></form>`,'sm');
  const f=$('#bF'),hint=()=>{if(!f.from.value)return;if(!f.to.value||f.to.value<f.from.value)f.to.value=f.from.value;const c=MYESC.filter(x=>!x.off&&x.d>=f.from.value&&x.d<=f.to.value);$('#bH').innerHTML=c.length?`<span style="color:var(--st-sol)">Você já está escalado em ${c.map(x=>fmtD(x.d)).join(', ')}. Peça troca ao líder.</span>`:'';};
  f.addEventListener('change',hint);f.addEventListener('submit',x=>{x.preventDefault();if(!f.from.value){f.from.closest('.fld').classList.add('bad');f.from.nextElementSibling.textContent='Escolha o início';return;}
   BLOCKS.push({id:'b'+Date.now(),from:f.from.value,to:f.to.value||f.from.value,why:f.why.value.trim()});BLOCKS.sort((a,b)=>a.from<b.from?-1:1);closeDlg();if(S.active!=='calendario'){S.active='calendario';}S.caltab='minha';render();toast('Período bloqueado');});},
 blkDel:v=>{const b=BLOCKS[+v];confirmDel({title:'Remover este bloqueio?',body:`Você volta a poder ser escalado ${b.from===b.to?'em '+fmtD(b.from):`de ${fmtD(b.from)} a ${fmtD(b.to)}`}.`,label:'Remover',onConfirm:()=>{BLOCKS.splice(+v,1);render();toast('Bloqueio removido',()=>{BLOCKS.splice(+v,0,b);render();});}});},
 iqF:v=>{S.iqf=v;render();},
};

