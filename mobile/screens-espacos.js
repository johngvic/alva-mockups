/* ===== Espaços no app administrativo (Tiago, 08/11/2026) =====
 * Spec: a sala é Ativa ou Inativa; a reserva nasce Confirmada e fica Confirmada ou Cancelada (não existe aprovação). O estado de tempo
 * (Próxima, Em andamento, Realizada) é calculado. Quem só consulta vê "Reserva" e "Detalhes restritos".
 * O app consulta a agenda e as salas, reserva, remarca e cancela. Cadastro da sala, uso fixo, itens do almoxarifado na reserva,
 * desativar e histórico ficam na web. */
const SPC_ST={at:['ok','Ativa'],in:['off','Inativa']};
const SPC=[
 {id:'sp1',n:'Templo',cap:800,loc:'Térreo',st:'at',feat:['Som','Projetor','Ar-condicionado'],fixed:[[0,'10:00','12:00','Culto de Celebração'],[0,'18:00','20:30','Culto de Celebração']]},
 {id:'sp2',n:'Auditório',cap:200,loc:'1º andar',st:'at',feat:['Som','Projetor'],fixed:[[6,'19:00','22:00','Culto de Jovens']]},
 {id:'sp3',n:'Sala 1',cap:30,loc:'Térreo',st:'at',feat:['Projetor'],fixed:[[0,'09:00','10:00','Classe de batismo']]},
 {id:'sp4',n:'Sala 2',cap:30,loc:'Térreo',st:'in',feat:['Quadro branco'],fixed:[]},
 {id:'sp5',n:'Sala 3',cap:24,loc:'1º andar',st:'at',feat:['Quadro branco','TV'],fixed:[]},
 {id:'sp6',n:'Sala Berçário',cap:15,loc:'Anexo',st:'at',feat:['Ar-condicionado'],fixed:[[0,'09:00','12:00','Culto Kids']]},
 {id:'sp7',n:'Sala Maternal',cap:20,loc:'Anexo',st:'at',feat:['Ar-condicionado'],fixed:[[0,'09:00','12:00','Culto Kids']]},
 {id:'sp8',n:'Sala Jardim',cap:22,loc:'Anexo',st:'at',feat:['Ar-condicionado'],fixed:[[0,'09:00','12:00','Culto Kids']]},
 {id:'sp9',n:'Sala Kids',cap:25,loc:'Anexo',st:'at',feat:['TV','Ar-condicionado'],fixed:[[0,'09:00','12:00','Culto Kids']]}];
const spcSp=id=>SPC.find(x=>x.id===id);
let _spcN=0;
const spcMk=o=>Object.assign({id:'rs'+(++_spcN),sp:'sp5',who:'',purpose:'',off:1,from:'19:00',to:'21:00',people:0,items:[],st:'cf',why:''},o);
const RSV=[
 spcMk({sp:'sp5',who:'Ana Costa',purpose:'Encontro da Casa Jardins',off:3,from:'19:30',to:'21:30',people:18,items:[['Projetor portátil',1,'ok','']]}),
 spcMk({sp:'sp2',who:'Davi Melo',purpose:'Ensaio do Louvor',off:4,from:'20:00',to:'22:00',people:12,items:[['Microfone sem fio',4,'ok',''],['Caixa de som',2,'re','Sem estoque: está emprestada até domingo']]}),
 spcMk({sp:'sp3',who:'Patrícia Oliveira',purpose:'Classe de batismo',off:2,from:'19:30',to:'21:00',people:14}),
 spcMk({sp:'sp1',who:'Tiago Campos',purpose:'Casamento de Tiago e Vera Campos',off:6,from:'16:00',to:'18:00',people:250}),
 spcMk({sp:'sp5',who:'Marcos Lima',purpose:'Treinamento de líderes',off:-4,from:'20:00',to:'22:00',people:20}),
 spcMk({sp:'sp2',who:'Bia Melo',purpose:'Reunião do Louvor',off:8,from:'19:00',to:'20:30',people:10,st:'ca',why:'Reunião adiada'}),
 spcMk({sp:'sp5',who:'Juliana Reis',purpose:'Estudo da Casa Pinheiros',off:0,from:'07:00',to:'23:00',people:10})];
RSV.forEach(r=>{r.date=cuISO(r.off);});
const spcWho=r=>can('espacos','editar')?r.who:'';
const spcLabel=r=>can('espacos','editar')?r.purpose:'Reserva';
const spcAt=(r,t)=>new Date(r.date+'T'+(t==='s'?r.from:r.to)+':00');
function spcTemporal(r){const n=new Date();return n<spcAt(r,'s')?['info','Próxima']:n<spcAt(r,'e')?['warning','Em andamento']:['off','Realizada'];}
const spcTag=r=>r.st==='ca'?vsTag('off','Cancelada'):(t=>vsTag(t[0],t[1]))(spcTemporal(r));
const spcMin=t=>+t.slice(0,2)*60+ +t.slice(3);
/* disponibilidade: reservas confirmadas e usos fixos da sala naquele dia */
function spcConflict(spId,date,from,to,except){const dow=new Date(date+'T12:00:00').getDay(),sp=spcSp(spId);
 for(const f of sp.fixed)if(f[0]===dow&&spcMin(from)<spcMin(f[2])&&spcMin(to)>spcMin(f[1]))return 'Ocupada '+f[1]+'–'+f[2]+' · '+f[3]+' (uso fixo)';
 const c=RSV.find(r=>r.id!==except&&r.sp===spId&&r.st==='cf'&&r.date===date&&spcMin(from)<spcMin(r.to)&&spcMin(to)>spcMin(r.from));
 return c?'Ocupada '+c.from+'–'+c.to+' · '+spcLabel(c):'';}
function spcSave(o,except){const sp=spcSp(o.sp);
 if(!sp||sp.st!=='at')return 'Esta sala está inativa.';
 if(!o.who)return 'Escolha o solicitante.';
 if(!o.date||!o.from||!o.to)return 'Informe o dia e o horário.';
 if(spcMin(o.to)<=spcMin(o.from))return 'O término precisa ser depois do início.';
 if(new Date(o.date+'T'+o.from+':00')<=new Date())return 'Escolha um horário que ainda não começou.';
 if(!(o.people>0))return 'Informe quantas pessoas são esperadas.';
 if(o.people>sp.cap)return 'A sala comporta '+sp.cap+' pessoas.';
 const c=spcConflict(o.sp,o.date,o.from,o.to,except);if(c)return c+'. Escolha outro horário ou outra sala.';
 if(except)Object.assign(RSV.find(x=>x.id===except),o);else{const n=spcMk(o);n.date=o.date;RSV.push(n);}
 return null;}
/* salas: ficha */
SPC.forEach(r=>{Object.defineProperties(r,{
 s:{get(){return 'Comporta '+r.cap+' · '+r.loc+(r.feat.length?' · '+r.feat.join(', '):'');},enumerable:true},
 d:{get(){const nx=spcNextOf(r);return [['Capacidade',r.cap+' pessoas'],['Localização',r.loc],['Características',r.feat.join(', ')||'—'],['Próxima reserva',nx?agDay(nx.date)+' · '+nx.from+'–'+nx.to+' · '+spcLabel(nx):'Sem reservas'],['Usos fixos',r.fixed.length?r.fixed.map(f=>sclWd[f[0]]+' '+f[1]+'–'+f[2]+' · '+f[3]).join('; '):'Nenhum']];},enumerable:true}});});
const spcNextOf=sp=>RSV.filter(r=>r.sp===sp.id&&r.st==='cf'&&spcTemporal(r)[1]!=='Realizada').sort((a,b)=>(a.date+a.from).localeCompare(b.date+b.from))[0]||null;
function spcSalaExtra(r){const ed=can('espacos','editar'),l=RSV.filter(x=>x.sp===r.id&&x.st==='cf'&&spcTemporal(x)[1]!=='Realizada').sort((a,b)=>(a.date+a.from).localeCompare(b.date+b.from)).slice(0,4);
 return (ed&&r.st==='at'?`<button class="btn primary md block" data-a="spcNew" data-v="${r.id}">Reservar</button>`:'')
  +(l.length?`<div class="stack g2"><p class="eb2">Próximas reservas</p><div class="vl">${l.map(x=>`<button class="vr tap" data-a="spcOpen" data-v="${x.id}|sala:${r.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${agDay(x.date)} · ${x.from}–${x.to}</span><span class="vs">${esc(spcLabel(x))}</span></span>${spcTag(x)}</button>`).join('')}</div></div>`:'');}
/* reservas: agenda do dia e listas */
S.spc={v:'dia',day:cuToday()};
function spcBlocks(day){const dow=new Date(day+'T12:00:00').getDay(),out=[];
 SPC.filter(s=>s.st==='at').forEach(s=>{const b=[];s.fixed.filter(f=>f[0]===dow).forEach(f=>b.push({from:f[1],to:f[2],lbl:f[3],fx:true}));
  RSV.filter(r=>r.sp===s.id&&r.st==='cf'&&r.date===day).forEach(r=>b.push({from:r.from,to:r.to,lbl:spcLabel(r),rid:r.id}));
  if(b.length)out.push([s,b.sort((a,c)=>a.from.localeCompare(c.from))]);});return out;}
function spcResRow(r){return `<button class="vr tap" data-q="${esc(spcSp(r.sp).n+' '+spcLabel(r)+' '+spcWho(r))}" data-a="spcOpen" data-v="${r.id}|"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(spcSp(r.sp).n)}</span><span class="vs">${agDay(r.date)} · ${r.from}–${r.to} · ${esc(spcLabel(r))}</span></span>${spcTag(r)}</button>`;}
function spcResBody(){const v=S.spc.v,ed=can('espacos','editar'),cnt=k=>RSV.filter(r=>spcView(r,k)).length;
 const chips=vsChips('spcV',v,[['dia','Agenda do dia'],['prox','Próximas',cnt('prox')],['pass','Passadas',cnt('pass')],['canc','Canceladas',cnt('canc')],['todas','Todas',RSV.length]]);
 const nov=ed?`<button class="btn primary md block" data-a="spcNew" data-v="">Nova reserva</button>`:'';
 if(v==='dia'){const d=S.spc.day,bl=spcBlocks(d);
  return nov+`<div class="row between" style="align-items:center"><button class="btn outline sm" data-a="spcDay" data-v="-1" aria-label="Dia anterior">‹</button><span class="grow" style="text-align:center"><b>${agDay(d)}</b>${d===cuToday()?' · hoje':''}</span><button class="btn outline sm" data-a="spcDay" data-v="1" aria-label="Próximo dia">›</button></div>`+chips
   +(bl.length?bl.map(([s,b])=>`<section class="stack g2"><p class="eb2">${esc(s.n)} · ${s.cap} lugares</p><div class="vl">${b.map(x=>x.rid?`<button class="vr tap" data-a="spcOpen" data-v="${x.rid}|"><span class="vs" style="min-width:92px">${x.from}–${x.to}</span><span class="grow vn">${esc(x.lbl)}</span>${vsTag('info','Reserva')}</button>`:`<div class="vr"><span class="vs" style="min-width:92px">${x.from}–${x.to}</span><span class="grow vn">${esc(x.lbl)}</span>${vsTag('off','Uso fixo')}</div>`).join('')}</div></section>`).join(''):vsEmpty('Tudo livre','Nenhuma reserva nem uso fixo neste dia.'))
   +`<p class="vs">Salas sem bloco ficam livres o dia todo.</p>`;}
 const l=RSV.filter(r=>spcView(r,v)).sort((a,b)=>(v==='pass'?-1:1)*(a.date+a.from).localeCompare(b.date+b.from));
 return nov+chips+(l.length?fndBox('spcL','Buscar sala ou finalidade')+`<div class="vl" id="spcL">${l.map(spcResRow).join('')}</div>`:vsEmpty('Nada aqui','Troque o filtro para ver outras reservas.'));}
function spcView(r,k){const t=spcTemporal(r)[1];return k==='todas'||(k==='canc'&&r.st==='ca')||(k==='prox'&&r.st==='cf'&&t!=='Realizada')||(k==='pass'&&r.st==='cf'&&t==='Realizada');}
/* detalhe da reserva */
function spcResSheet(id,back){const r=RSV.find(x=>x.id===id),sp=spcSp(r.sp),ed=can('espacos','editar'),t=spcTemporal(r),started=t[1]!=='Próxima';S.spc.back=back==null?S.spc.back:back;
 const itens=ed&&r.items.length?`<div class="stack g2"><p class="eb2">Itens do almoxarifado</p><div class="vl">${r.items.map(i=>`<div class="vr" style="flex-wrap:wrap"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(i[0])} × ${i[1]}</span>${i[2]==='re'?`<span class="vs" style="white-space:normal">Recusado: ${esc(i[3])}</span>`:''}</span>${vsTag(i[2]==='re'?'danger':'ok',i[2]==='re'?'Recusado':'Ativo')}</div>`).join('')}</div>${r.items.some(i=>i[2]==='re')?'<p class="callout">Um item foi recusado. Decida: manter a reserva sem o item, remarcar ou cancelar.</p>':''}</div>`:'';
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(sp.n)}</h3>${spcTag(r)}</div>
  <div class="vl">${[['Quando',agDay(r.date)+' · '+r.from+'–'+r.to],['Solicitante',ed?r.who:'Detalhes restritos'],['Finalidade',ed?r.purpose:'Detalhes restritos'],['Pessoas esperadas',ed?String(r.people):'—'],...(r.st==='ca'&&r.why?[['Motivo do cancelamento',r.why]]:[])].map(([a,b])=>`<div class="vr"><span class="vs" style="min-width:104px">${a}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${esc(b)}</span></div>`).join('')}</div>
  ${itens}
  <div class="stack g3">${ed&&r.st==='cf'&&!started?`<button class="btn primary md block" data-a="spcEdit" data-v="${id}">Remarcar</button><button class="btn outline md block" data-a="spcCancel" data-v="${id}">Cancelar reserva</button>`:ed&&r.st==='cf'?'<p class="callout">A reserva já começou: só consulta.</p>':''}<button class="tlink" data-a="spcBack">${S.spc.back?'Voltar':'Fechar'}</button></div></div>`);}
/* formulário: Nova reserva e Remarcar (a mesma tela) */
function spcForm(sid,rid){const r=rid?RSV.find(x=>x.id===rid):null,act=SPC.filter(s=>s.st==='at'),pool=dvgInt();S.spc.who=r?r.who:'';S.spc.sp=r?r.sp:(sid||act[0].id);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${r?'Remarcar reserva':'Nova reserva'}</h3><p class="callout">A reserva nasce confirmada. O app confere a disponibilidade e a capacidade. Os itens do almoxarifado são pedidos na web.</p></div>
  <div class="stack g2"><span class="eb2">Sala</span><div class="row g2" style="flex-wrap:wrap" id="spF">${act.map(s=>`<button type="button" class="chip" data-sp="${s.id}" aria-pressed="${s.id===S.spc.sp}">${esc(s.n)}</button>`).join('')}</div></div>
  ${field({id:'spDt',label:'Data',type:'date',val:r?r.date:cuISO(1)})}<div class="row g3">${field({id:'spFr',label:'Início',type:'time',val:r?r.from:'19:00'})}${field({id:'spTo',label:'Término',type:'time',val:r?r.to:'21:00'})}</div>
  <div class="stack g2"><span class="eb2">Solicitante</span>${fndBox('spWho','Buscar pelo nome (mín. 3 letras)')}<div class="vl" id="spWho" style="max-height:180px;overflow:auto">${pool.map(n=>`<button type="button" class="vr tap" data-q="${esc(n)}" data-who="${esc(n)}" aria-pressed="${n===S.spc.who}"><span class="grow vn">${esc(n)}</span></button>`).join('')}</div></div>
  ${field({id:'spPu',label:'Finalidade',ph:'Ex.: Encontro da Casa Jardins',val:r?r.purpose:'',max:150})}${field({id:'spPe',label:'Pessoas esperadas',ph:'20',im:'numeric',val:r?String(r.people):''})}
  <div class="otpmsg" id="spEr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="spGo">${r?'Salvar':'Confirmar reserva'}</button><button type="button" class="tlink" id="spBk">Voltar</button></div></div>`,sh=>{
  sh.querySelectorAll('[data-sp]').forEach(b=>b.addEventListener('click',()=>{S.spc.sp=b.getAttribute('data-sp');sh.querySelectorAll('[data-sp]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  sh.querySelectorAll('[data-who]').forEach(b=>b.addEventListener('click',()=>{S.spc.who=b.getAttribute('data-who');sh.querySelectorAll('[data-who]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  $('#spBk',sh).addEventListener('click',()=>{if(r)spcResSheet(rid);else if(sid)A.lsOpen(sid);else closeSheet();});
  $('#spGo',sh).addEventListener('click',()=>{const e=spcSave({sp:S.spc.sp,who:S.spc.who,date:cuVal(sh,'spDt'),from:cuVal(sh,'spFr'),to:cuVal(sh,'spTo'),purpose:cuVal(sh,'spPu')||'Reserva',people:parseInt(cuVal(sh,'spPe'),10)||0},rid||null);
   if(e){$('#spEr',sh).textContent=e;return;}closeSheet().then(()=>{softRender();toast('success',r?'Reserva remarcada':'Reserva confirmada',spcSp(S.spc.sp).n);});});});}
Object.assign(A,{
 spcV:v=>{S.spc.v=v;softRender();},
 spcDay:v=>{const d=new Date(S.spc.day+'T12:00:00');d.setDate(d.getDate()+ +v);S.spc.day=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');softRender();},
 spcOpen:v=>{const [id,back]=v.split('|');spcResSheet(id,back||'');},
 spcBack:()=>{const b=S.spc.back;if(b&&b.startsWith('sala:'))A.lsOpen(b.slice(5));else closeSheet();},
 spcNew:sid=>spcForm(sid||'',''),
 spcEdit:id=>spcForm('',id),
 spcCancel:id=>{const r=RSV.find(x=>x.id===id);
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Cancelar a reserva?</h3><p class="callout">${esc(spcSp(r.sp).n)} · ${agDay(r.date)} · ${r.from}–${r.to}. Não há como restaurar: para voltar, é preciso reservar de novo.</p></div>${field({id:'spWy',label:'Motivo (opcional)',area:true,ph:'Ex.: reunião adiada',max:200})}
   <div class="row g3"><button type="button" class="btn outline md grow" data-a="spcOpen" data-v="${id}|">Voltar</button><button type="button" class="btn danger md grow" id="spCy">Cancelar reserva</button></div></div>`,sh=>$('#spCy',sh).addEventListener('click',()=>{r.st='ca';r.why=cuVal(sh,'spWy');closeSheet().then(()=>{softRender();toast('info','Reserva cancelada',spcSp(r.sp).n);});}));}
});
/* as seções */
LSD.espacos={
 'Salas':{noun:'salas',ST:SPC_ST,acts:[],extra:spcSalaExtra,rows:SPC},
 'Reservas':{custom:spcResBody,newFlow:()=>A.spcNew('')}};
Object.defineProperty(GPEND,'espacos',{configurable:true,enumerable:true,get:()=>[]});
LEDE_DYN['espacos|Reservas']=()=>{const n=RSV.filter(r=>r.date===cuToday()&&r.st==='cf').length;return n?n+(n===1?' reserva hoje':' reservas hoje'):'Nenhuma reserva hoje';};
LEDE_DYN['espacos|Salas']=()=>{const a=SPC.filter(s=>s.st==='at');return a.length+' salas ativas · '+a.reduce((n,s)=>n+s.cap,0)+' lugares';};
