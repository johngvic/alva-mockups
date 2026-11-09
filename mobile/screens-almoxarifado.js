/* ===== Almoxarifado no app administrativo (Tiago, 08/11/2026) =====
 * Spec `warehouse`: item Ativo/Inativo, de Empréstimo ou Consumível, com mínimo; empréstimo Agendado (solicitação da reserva de sala), Em aberto,
 * Parcialmente devolvido, Encerrado ou Cancelado; a devolução tem resultado por item (devolvido, com dano, perdido, danificado sem conserto).
 * No app: emprestar, registrar devolução, confirmar ou recusar a solicitação da reserva, ajustar o estoque (motivo obrigatório) e consultar.
 * Itens e categorias (cadastro), distribuições, repasses e o feed de devoluções ficam na web. */
const WRH_KIND={emp:'Empréstimo',con:'Consumível'};
const WRH_ITEMS=[
 {id:'wi1',n:'Projetor portátil',sku:'EQ-001',cat:'Equipamentos',kind:'emp',qty:2,min:1,st:'at'},
 {id:'wi2',n:'Caixa de som',sku:'EQ-002',cat:'Equipamentos',kind:'emp',qty:3,min:1,st:'at'},
 {id:'wi3',n:'Microfone sem fio',sku:'EQ-003',cat:'Equipamentos',kind:'emp',qty:6,min:2,st:'at'},
 {id:'wi4',n:'Mesa dobrável',sku:'MB-001',cat:'Mobiliário',kind:'emp',qty:10,min:4,st:'at'},
 {id:'wi5',n:'Cadeiras (lote de 20)',sku:'MB-002',cat:'Mobiliário',kind:'emp',qty:30,min:20,st:'at'},
 {id:'wi6',n:'Copo descartável (pacote)',sku:'CN-001',cat:'Consumíveis',kind:'con',qty:12,min:20,st:'at'},
 {id:'wi7',n:'Café em pó (500 g)',sku:'CN-002',cat:'Consumíveis',kind:'con',qty:6,min:4,st:'at'},
 {id:'wi8',n:'Extensão 10 m',sku:'EL-001',cat:'Elétrica',kind:'emp',qty:3,min:1,st:'in'}];
const wrhItem=n=>WRH_ITEMS.find(x=>x.n===n);
let _wrhN=0;
const wrhMk=o=>Object.assign({id:'wl'+(++_wrhN),st:'ab',q:1,back:0,dmg:0,lost:0,brk:0,note:'',why:'',res:''},o);
const WRH_LOANS=[
 wrhMk({item:'Projetor portátil',who:'Pr. Marcos Lima',q:1,off:-2,tm:'10:00'}),
 wrhMk({item:'Cadeiras (lote de 20)',who:'Ana Costa',q:20,off:3,tm:'18:00'}),
 wrhMk({item:'Microfone sem fio',who:'Davi Melo',q:4,off:1,tm:'12:00',st:'pr',back:2}),
 wrhMk({item:'Projetor portátil',who:'Ana Costa',q:1,off:3,tm:'19:30',st:'ag',res:'Reserva da Sala 3 · dia da reserva'}),
 wrhMk({item:'Caixa de som',who:'Davi Melo',q:2,off:4,tm:'20:00',st:'ag',res:'Reserva do Auditório · Ensaio do Louvor'}),
 wrhMk({item:'Mesa dobrável',who:'Juliana Reis',q:2,off:-9,tm:'18:00',st:'fe',back:2,note:'',res:'Devolvido'}),
 wrhMk({item:'Extensão 10 m',who:'Bia Melo',q:3,off:-5,tm:'18:00',st:'ca',why:'Item inativo no almoxarifado.',res:'Recusado'})];
WRH_LOANS.forEach(l=>{l.until=cuISO(l.off);});
const wrhOut=it=>WRH_LOANS.filter(l=>l.item===it.n&&(l.st==='ab'||l.st==='pr')).reduce((a,l)=>a+l.q-l.back-l.lost-l.brk,0);
const wrhAvail=it=>it.qty-wrhOut(it);
const wrhLate=l=>(l.st==='ab'||l.st==='pr')&&l.until<cuToday();
const WRH_LST={ab:['info','Em aberto'],pr:['warning','Parcialmente devolvido'],ag:['warning','Solicitação'],fe:['ok','Encerrado'],ca:['off','Cancelado']};
const wrhTag=l=>wrhLate(l)?vsTag('danger','Em atraso'):vsTag(WRH_LST[l.st][0],WRH_LST[l.st][1]);
const WRH_MOV=[['Empréstimo','Projetor portátil','Pr. Marcos Lima emprestou 1','há 6 dias'],['Devolução','Mesa dobrável','Juliana Reis devolveu 2','há 9 dias'],['Ajuste','Extensão 10 m','Ajuste de estoque: baixa por defeito','há 11 dias'],['Item','Café em pó (500 g)','Item cadastrado','há 20 dias']].map(([k,i,t,w])=>({k,i,t,w}));
const wrhMov=(k,i,t)=>WRH_MOV.unshift({k,i,t,w:'agora'});
/* itens */
WRH_ITEMS.forEach(it=>{Object.defineProperties(it,{
 s:{get(){const b=it.qty<it.min;return WRH_KIND[it.kind]+' · '+it.cat+' · '+it.qty+' no estoque'+(it.kind==='emp'?' · '+wrhAvail(it)+' disponíveis':'')+(b?' · Abaixo do mínimo':'');},enumerable:true},
 d:{get(){return [['SKU',it.sku],['Categoria',it.cat],['Tipo',WRH_KIND[it.kind]],['Quantidade',String(it.qty)],...(it.kind==='emp'?[['Emprestado agora',String(wrhOut(it))],['Disponível agora',String(wrhAvail(it))]]:[]),['Mínimo',String(it.min)+(it.qty<it.min?' · abaixo':'')]];},enumerable:true}});});
function wrhItemExtra(it){const ed=can('almox','editar'),l=WRH_LOANS.filter(x=>x.item===it.n&&['ab','pr','ag'].includes(x.st));
 return (ed&&it.st==='at'?`<button class="btn outline md block" data-a="wrhAdj" data-v="${it.id}">Ajustar estoque</button>`:'')
  +(ed&&it.st==='at'&&it.kind==='emp'?`<button class="btn primary md block" data-a="wrhNew" data-v="${it.id}">Emprestar</button>`:'')
  +(l.length?`<div class="stack g2"><p class="eb2">Empréstimos abertos e agendados</p><div class="vl">${l.map(x=>wrhRow(x)).join('')}</div></div>`:'');}
/* empréstimos */
S.wrh={tab:'ab'};
function wrhRow(l){return `<button class="vr tap" data-q="${esc(l.item+' '+l.who)}" data-a="wrhOpen" data-v="${l.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(l.item)} × ${l.q}</span><span class="vs">${esc(l.who)} · devolve ${cuFmt(l.until)}, ${l.tm}${l.st==='pr'?' · devolveu '+l.back:''}</span></span>${wrhTag(l)}</button>`;}
function wrhLoans(){const t=S.wrh.tab,g=k=>WRH_LOANS.filter(l=>k==='ab'?(l.st==='ab'||l.st==='pr'):k==='ag'?l.st==='ag':(l.st==='fe'||l.st==='ca')),l=g(t);
 return (can('almox','editar')?`<button class="btn primary md block" data-a="wrhNew" data-v="">Novo empréstimo</button>`:'')
  +vsChips('wrhT',t,[['ab','Em aberto',g('ab').length],['ag','Solicitações',g('ag').length],['en','Encerrados',g('en').length]])
  +(l.length?fndBox('wrhL','Buscar item ou pessoa')+`<div class="vl" id="wrhL">${l.map(wrhRow).join('')}</div>`:vsEmpty(t==='ag'?'Nenhuma solicitação':'Nada aqui',t==='ag'?'Os pedidos das reservas de sala chegam aqui.':''));}
function wrhSheet(id){const l=WRH_LOANS.find(x=>x.id===id),ed=can('almox','editar'),it=wrhItem(l.item);
 const b=[];
 if(ed&&(l.st==='ab'||l.st==='pr'))b.push(`<button class="btn primary md block" data-a="wrhRet" data-v="${id}">Registrar devolução</button>`);
 if(ed&&l.st==='ag')b.push(`<button class="btn primary md block" data-a="wrhOk" data-v="${id}">Confirmar entrega</button>`,`<button class="btn outline md block" data-a="wrhNo" data-v="${id}">Recusar</button>`);
 const rows=[['Item',l.item+' × '+l.q],['Quem',l.who],['Devolve até',cuFmt(l.until)+', '+l.tm],...(l.st==='pr'?[['Já devolvido',String(l.back)]]:[]),...(l.res?[['Origem / resultado',l.res]]:[]),...(l.st==='ca'&&l.why?[['Motivo',l.why]]:[]),...(l.st==='ag'&&it?[['Disponível agora',wrhAvail(it)+' de '+it.qty]]:[]),...(l.note?[['Observação',l.note]]:[])];
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(l.item)}</h3>${wrhTag(l)}</div><div class="vl">${rows.map(([a,v])=>`<div class="vr"><span class="vs" style="min-width:104px">${a}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${esc(v)}</span></div>`).join('')}</div>
  ${l.st==='ag'&&it&&wrhAvail(it)<l.q?'<p class="callout">Não há disponibilidade suficiente para entregar agora.</p>':''}
  <div class="stack g3">${b.join('')}<button class="tlink" data-a="closeSheet">Fechar</button></div></div>`);}
const wrhCtr=(k,l,max)=>`<div class="vr"><span class="grow vn">${l}</span><span class="row g2"><button type="button" class="btn outline sm" data-ctr="${k}" data-d="-1" aria-label="Menos ${l}">−</button><b id="wc_${k}" style="min-width:24px;text-align:center">0</b><button type="button" class="btn outline sm" data-ctr="${k}" data-d="1" aria-label="Mais ${l}">+</button></span></div>`;
function wrhRetSheet(id){const l=WRH_LOANS.find(x=>x.id===id),rest=l.q-l.back;
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Registrar devolução</h3><p class="callout">${esc(l.item)} × ${l.q} · ${esc(l.who)}. Resta devolver <b id="wRest">${rest}</b>.</p></div>
  <div class="vl">${wrhCtr('ok','Devolvido',rest)}${wrhCtr('dmg','Devolvido com dano',rest)}${wrhCtr('lost','Perdido',rest)}${wrhCtr('brk','Danificado sem conserto',rest)}</div>
  ${field({id:'wrN',label:'Observação (obrigatória se houver dano ou perda)',area:true,ph:'O que aconteceu',max:200})}
  <div class="otpmsg" id="wrEr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="wrGo">Registrar devolução</button><button type="button" class="tlink" data-a="wrhOpen" data-v="${id}">Voltar</button></div></div>`,sh=>{
  const c={ok:0,dmg:0,lost:0,brk:0},sum=()=>c.ok+c.dmg+c.lost+c.brk;
  sh.querySelectorAll('[data-ctr]').forEach(b=>b.addEventListener('click',()=>{const k=b.getAttribute('data-ctr'),d=+b.getAttribute('data-d');if(d>0&&sum()>=rest)return;if(d<0&&c[k]<=0)return;c[k]+=d;$('#wc_'+k,sh).textContent=c[k];$('#wRest',sh).textContent=rest-sum();}));
  $('#wrGo',sh).addEventListener('click',()=>{const e=wrhReturn(id,c,cuVal(sh,'wrN'));if(e){$('#wrEr',sh).textContent=e;return;}closeSheet().then(()=>{softRender();toast('success','Devolução registrada',l.item);});});});}
function wrhReturn(id,c,note){const l=WRH_LOANS.find(x=>x.id===id),rest=l.q-l.back,sum=c.ok+c.dmg+c.lost+c.brk;
 if(sum<=0)return 'Informe quantos itens voltaram.';if(sum>rest)return 'Só restam '+rest+' para devolver.';
 if((c.dmg+c.lost+c.brk)>0&&!(note||'').trim())return 'Conte o que aconteceu com os itens com dano, perdidos ou sem conserto.';
 const it=wrhItem(l.item);l.back+=c.ok+c.dmg;l.lost+=c.lost;l.brk+=c.brk;l.dmg+=c.dmg;if(note)l.note=note;if(it)it.qty-=c.lost+c.brk;
 const left=l.q-l.back-l.lost-l.brk;l.st=left<=0?'fe':'pr';
 if(l.st==='fe')l.res='Devolvido'+(c.dmg?' com dano':'')+(c.lost?' · perdido '+c.lost:'')+(c.brk?' · sem conserto '+c.brk:'');
 wrhMov('Devolução',l.item,l.who+' devolveu '+(c.ok+c.dmg)+(c.lost?' · perdido '+c.lost:'')+(c.brk?' · sem conserto '+c.brk:''));return null;}
/* novo empréstimo */
function wrhNewSheet(itemId){const emp=WRH_ITEMS.filter(i=>i.st==='at'&&i.kind==='emp'),pool=dvgInt();S.wrh.item=itemId||emp[0].id;S.wrh.who='';
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Novo empréstimo</h3><p class="callout">A pessoa é avisada no app. Só item de empréstimo, com disponibilidade.</p></div>
  <div class="stack g2"><span class="eb2">Item</span><div class="vl" id="wnI">${emp.map(i=>`<button type="button" class="vr tap" data-it="${i.id}" aria-pressed="${i.id===S.wrh.item}"><span class="grow vn">${esc(i.n)}</span><span class="vs">até ${wrhAvail(i)} disponíveis</span></button>`).join('')}</div></div>
  <div class="stack g2"><span class="eb2">Quem pega</span>${fndBox('wnP','Buscar pelo nome (mín. 3 letras)')}<div class="vl" id="wnP" style="max-height:170px;overflow:auto">${pool.map(n=>`<button type="button" class="vr tap" data-q="${esc(n)}" data-who="${esc(n)}" aria-pressed="false"><span class="grow vn">${esc(n)}</span></button>`).join('')}</div></div>
  ${field({id:'wnQ',label:'Quantidade',ph:'1',im:'numeric',val:'1'})}
  <div class="stack g2"><span class="eb2">Devolve até</span><div class="row g2" style="flex-wrap:wrap" id="wnD">${[['3 dias',3],['1 semana',7],['2 semanas',14],['1 mês',30]].map(([t,d],i)=>`<button type="button" class="chip" data-days="${d}" aria-pressed="${i===1}">${t}</button>`).join('')}</div></div>
  <div class="otpmsg" id="wnEr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="wnGo">Emprestar</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{let days=7;
  sh.querySelectorAll('[data-it]').forEach(b=>b.addEventListener('click',()=>{S.wrh.item=b.getAttribute('data-it');sh.querySelectorAll('[data-it]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  sh.querySelectorAll('[data-who]').forEach(b=>b.addEventListener('click',()=>{S.wrh.who=b.getAttribute('data-who');sh.querySelectorAll('[data-who]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  sh.querySelectorAll('[data-days]').forEach(b=>b.addEventListener('click',()=>{days=+b.getAttribute('data-days');sh.querySelectorAll('[data-days]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  $('#wnGo',sh).addEventListener('click',()=>{const e=wrhLend(S.wrh.item,S.wrh.who,parseInt(cuVal(sh,'wnQ'),10)||0,days);if(e){$('#wnEr',sh).textContent=e;return;}closeSheet().then(()=>{S.wrh.tab='ab';softRender();toast('success','Emprestado para '+S.wrh.who.split(' ')[0],'devolve '+cuFmt(cuISO(days)));});});});}
function wrhLend(itemId,who,q,days){const it=WRH_ITEMS.find(x=>x.id===itemId);if(!it||it.st!=='at')return 'Item inativo.';if(it.kind!=='emp')return 'Só item de empréstimo pode ser emprestado.';if(!who)return 'Escolha quem pega o item.';if(!(q>0))return 'Informe a quantidade.';
 if(q>wrhAvail(it))return 'Só há '+wrhAvail(it)+' disponíveis.';const l=wrhMk({item:it.n,who,q,off:days,tm:'18:00'});l.until=cuISO(days);WRH_LOANS.unshift(l);wrhMov('Empréstimo',it.n,who+' pegou '+q);return null;}
function wrhAdjSheet(id){const it=WRH_ITEMS.find(x=>x.id===id);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Ajustar estoque</h3><p class="callout">${esc(it.n)}. Hoje: ${it.qty} no estoque${it.kind==='emp'?', '+wrhOut(it)+' emprestados':''}.</p></div>${field({id:'waQ',label:'Quantidade nova',ph:String(it.qty),im:'numeric',val:String(it.qty)})}${field({id:'waM',label:'Motivo (obrigatório)',area:true,ph:'Ex.: contagem do mês, perda, doação',max:200})}<div class="otpmsg" id="waEr" role="alert" style="min-height:0"></div><div class="stack g3"><button type="button" class="btn primary block" id="waGo">Ajustar</button><button type="button" class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div></div>`,sh=>$('#waGo',sh).addEventListener('click',()=>{const e=wrhAdjust(id,cuVal(sh,'waQ'),cuVal(sh,'waM'));if(e){$('#waEr',sh).textContent=e;return;}closeSheet().then(()=>{softRender();toast('success','Estoque ajustado',it.n);});}));}
function wrhAdjust(id,q,why){const it=WRH_ITEMS.find(x=>x.id===id),n=parseInt(q,10);if(isNaN(n)||n<0)return 'Informe uma quantidade válida.';if(!(why||'').trim())return 'Conte o motivo do ajuste.';
 if(it.kind==='emp'&&n<wrhOut(it))return 'Não pode ficar abaixo do que está emprestado ('+wrhOut(it)+').';wrhMov('Ajuste',it.n,'Ajuste de estoque: '+it.qty+' para '+n+' · '+why);it.qty=n;return null;}
Object.assign(A,{
 wrhT:v=>{S.wrh.tab=v;softRender();},
 wrhOpen:id=>wrhSheet(id),
 wrhRet:id=>wrhRetSheet(id),
 wrhNew:id=>wrhNewSheet(id||''),
 wrhAdj:id=>wrhAdjSheet(id),
 wrhOk:id=>{const l=WRH_LOANS.find(x=>x.id===id),it=wrhItem(l.item);if(wrhAvail(it)<l.q){toast('error','Sem disponibilidade','Só há '+wrhAvail(it)+' disponíveis.');return;}l.st='ab';l.res='Reserva de sala';wrhMov('Empréstimo',l.item,l.who+' recebeu '+l.q+' (reserva de sala)');closeSheet().then(()=>{softRender();toast('success','Entrega confirmada',l.who.split(' ')[0]+' · '+l.item);});},
 wrhNo:id=>{const l=WRH_LOANS.find(x=>x.id===id);reasonSheet({title:'Recusar o pedido',callout:esc(l.item)+' × '+l.q+' · '+esc(l.who)+'. A reserva da sala não é cancelada; '+esc(l.who.split(' ')[0])+' será avisado(a).',ph:'Ex.: o item está em manutenção',btn:'Recusar',who:l.who.split(' ')[0],done:'Recusado',run:async why=>{l.st='ca';l.why=why;l.res='Recusado';await closeSheet();softRender();toast('info','Pedido recusado',l.who.split(' ')[0]+' vê o motivo.');}});}
});
/* movimentações (consulta) e visão geral */
S.wrhM='todas';
function wrhMovBody(){const f=S.wrhM,ks=['Empréstimo','Devolução','Distribuição','Repasse','Ajuste','Item'],l=WRH_MOV.filter(m=>f==='todas'||m.k===f);
 return vsChips('wrhMf',f,[['todas','Todas',WRH_MOV.length],...ks.map(k=>[k,k,WRH_MOV.filter(m=>m.k===k).length]).filter(x=>x[2]>0)])+fndBox('wrhMl','Buscar item ou pessoa')+`<div class="vl" id="wrhMl">${l.map(m=>`<div class="vr" data-q="${esc(m.i+' '+m.t)}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(m.i)}</span><span class="vs" style="white-space:normal">${esc(m.t)} · ${m.w}</span></span>${vsTag('info',m.k)}</div>`).join('')||vsEmpty('Nada aqui','')}</div>`;}
function wrhVis(){const at=WRH_ITEMS.filter(i=>i.st==='at'),late=WRH_LOANS.filter(wrhLate),low=at.filter(i=>i.qty<i.min),ag=WRH_LOANS.filter(l=>l.st==='ag'),out=WRH_LOANS.filter(l=>l.st==='ab'||l.st==='pr');
 return `<div class="vk"><div><b>${at.length}</b><span>Itens ativos</span></div><div><b>${out.length}</b><span>Emprestados agora</span></div><div><b>${late.length}</b><span>Em atraso</span></div></div>`
  +rsSec('Precisam de atenção',[...late.map(l=>rsAtt('bad','Em atraso: '+esc(l.item)+' × '+l.q,esc(l.who)+' · devolve '+cuFmt(l.until),'wrhOpen',l.id)),...ag.map(l=>rsAtt('warn','Solicitação da reserva: '+esc(l.item)+' × '+l.q,esc(l.who)+' · '+esc(l.res),'wrhOpen',l.id)),...low.map(i=>rsAtt('warn','Abaixo do mínimo: '+esc(i.n),i.qty+' no estoque, mínimo '+i.min+': faltam '+(i.min-i.qty),'wrhItemGo',i.id))].join('')||rsOk('Tudo em dia','Nenhum atraso, solicitação ou item abaixo do mínimo.'));}
Object.assign(A,{wrhMf:v=>{S.wrhM=v;softRender();},wrhItemGo:id=>{S.gmod='almox';A.ovGo('Itens');setTimeout(()=>A.lsOpen(id),350);}});
/* as seções */
LSD.almox={
 'Visão geral':{custom:wrhVis},
 'Itens':{noun:'itens',ST:{at:['ok','Ativo'],in:['off','Inativo']},acts:[],extra:wrhItemExtra,rows:WRH_ITEMS},
 'Empréstimos':{custom:wrhLoans,newFlow:()=>A.wrhNew('')},
 'Movimentações':{custom:wrhMovBody}};
gMod('almox')[5]=['Visão geral','Itens','Empréstimos','Movimentações'];
Object.defineProperty(GPEND,'almox',{configurable:true,enumerable:true,get:()=>[['Empréstimos em atraso',WRH_LOANS.filter(wrhLate).length],['Solicitações das reservas',WRH_LOANS.filter(l=>l.st==='ag').length],['Itens abaixo do mínimo',WRH_ITEMS.filter(i=>i.st==='at'&&i.qty<i.min).length]].filter(x=>x[1]>0)});
