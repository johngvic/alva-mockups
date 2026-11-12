/* ================= App administrativo › Vouchers da Loja, Cafeteria e Restaurante =================
   Aba "Vouchers" em cada módulo de venda: consultar, criar e pausar. Quem tem Admin do módulo cria e pausa
   (decisão de Tiago, 09/11/2026: dá para criar pelo celular, por exemplo num saldão). Quem só vende (Editar) consulta.
   O Mercado Social não existe no app administrativo (só web e PDV). Os dados espelham o web (dados de exemplo). */
const VM_TODAY='2026-09-29';
Object.assign(I,{cart:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>'});
const VCHM={cafe:[],rest:[],shop:[],social:[]};
const VM_ROW=(k,n,code,name,type,value,from,to,limit,uses,paused)=>VCHM[k].push({id:k+'-v'+n,code,name,type,value,from,to,limit,uses,paused:!!paused});
VM_ROW('shop',1,'BEMVINDO10','Boas-vindas · 10%','p',10,'2026-08-01','2026-12-31',null,12);
VM_ROW('shop',2,'LIVRO5','Campanha do livro · R$ 5','v',500,'2026-09-01','2026-10-09',null,31);
VM_ROW('shop',3,'VOLUNTARIO20','Voluntários · 20%','p',20,'2026-07-01','2027-01-31',null,4);
VM_ROW('shop',4,'NATAL15','Natal · 15%','p',15,'2025-12-01','2026-09-27',null,60);
VM_ROW('shop',5,'PAUSADO30','Promoção pausada · 30%','p',30,'2026-09-01','2026-12-31',null,0,true);
VM_ROW('shop',6,'UNICO50','Cortesia · R$ 50 (1 uso)','v',5000,'2026-09-10','2026-10-30',1,1);
VM_ROW('social',1,'SOCIAL5','Mercado · R$ 5','v',500,'2026-09-01','2026-10-20',null,8);
VM_ROW('social',2,'CESTA10','Cesta básica · 10%','p',10,'2026-09-15','2026-12-15',200,41);
VM_ROW('cafe',1,'CAFE2','Segunda do café · R$ 2','v',200,'2026-09-01','2026-12-31',null,27);
VM_ROW('cafe',2,'EQUIPE15','Equipe · 15%','p',15,'2026-06-01','2027-06-01',null,9);
VM_ROW('rest',1,'ALMOCO10','Almoço da família · 10%','p',10,'2026-09-01','2026-11-30',null,18);
VM_ROW('rest',2,'VOLUNTARIO','Voluntários do culto · 25%','p',25,'2026-07-01','2027-01-31',null,14);
const vmStat=v=>v.paused?['Pausado','off']:(v.to&&v.to<VM_TODAY)?['Vencido','danger']:(v.limit!=null&&v.uses>=v.limit)?['Esgotado','warning']:v.from>VM_TODAY?['Agendado','info']:['Ativo','ok'];
const vmVal=v=>v.type==='p'?v.value+'%':vsMoney(v.value);
const vmAdmin=k=>lvlOf(k)>=3&&S.subs!=='suspensa';
const vmDate=d=>d.slice(8,10)+'/'+d.slice(5,7)+'/'+d.slice(0,4);
const vmFilter=(k)=>{const q=norm2(S.vs.vq||''),st=S.vs.vst||'all';return VCHM[k].filter(v=>{const s=vmStat(v)[0];return (st==='all'||(st==='ativo'&&s==='Ativo')||(st==='pausado'&&v.paused)||(st==='vencido'&&(s==='Vencido'||s==='Esgotado')))&&(!q||norm2(v.code+' '+v.name).includes(q));});};
const vmRows=k=>{const l=vmFilter(k);return l.length?`<div class="vl">${l.map(v=>{const s=vmStat(v);return `<button class="vr tap ${v.paused?'dim':''}" data-a="vsVch" data-v="${k}|${v.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(v.code)}</span><span class="vs">${esc(v.name)} · ${vmVal(v)}</span></span>${vsTag(s[1],s[0])}</button>`;}).join('')}</div>`:vsEmpty('Nenhum voucher','Nada corresponde ao filtro.');};
function vsVouchers(k){const all=VCHM[k],n=x=>all.filter(v=>{const s=vmStat(v)[0];return x==='all'||(x==='ativo'&&s==='Ativo')||(x==='pausado'&&v.paused)||(x==='vencido'&&(s==='Vencido'||s==='Esgotado'));}).length;
 return `${vsHead(all.length+' vouchers',vmAdmin(k)?`<button class="btn primary sm" data-a="vsVchNew">${ic('plus',16,2.2)}Novo voucher</button>`:'')}
 <p class="callout">Códigos de desconto do caixa${k==='shop'?', do PDV e do pedido pelo app':' e do PDV'}. Um voucher por venda, antes do desconto manual.</p>
 ${vsSearch('vsVq','Buscar código ou campanha',S.vs.vq||'')}${vsChips('vsVst',S.vs.vst||'all',[['all','Todos',n('all')],['ativo','Ativos',n('ativo')],['pausado','Pausados',n('pausado')],['vencido','Vencidos',n('vencido')]])}
 <div id="vsVw">${vmRows(k)}</div>${vmAdmin(k)?'':'<p class="callout">Criar e pausar voucher é com o Admin do módulo.</p>'}`;}
function vsVchSheet(v){const [k,id]=v.split('|'),x=VCHM[k].find(y=>y.id===id),s=vmStat(x);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${esc(x.code)}</h3><p class="callout">${esc(x.name)}</p></div>
  <div class="vk"><div><b>${vmVal(x)}</b><span>Desconto</span></div><div><b>${x.uses}${x.limit!=null?'/'+x.limit:''}</b><span>Usos</span></div><div>${vsTag(s[1],s[0])}<span style="margin-top:8px">Situação</span></div></div>
  <div class="vl"><div class="vr"><span class="vs" style="min-width:104px">Vale de</span><span class="grow" style="text-align:right">${vmDate(x.from)}</span></div><div class="vr"><span class="vs" style="min-width:104px">Vale até</span><span class="grow" style="text-align:right">${x.to?vmDate(x.to):'sem data final'}</span></div></div>
  ${vmAdmin(k)?`<button class="btn ${x.paused?'primary':'outline'} md block" data-a="vsVchTog" data-v="${v}">${x.paused?'Ativar voucher':'Pausar voucher'}</button>`:'<p class="callout">Você só pode consultar este voucher.</p>'}<p class="vs">Editar a campanha e a validade é na web.</p></div>`);}
function vsVchForm(){const k=vsK();S.vs.vtp='p';
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Novo voucher</h3><p class="callout">Vale só ${k==='shop'?'na Loja':k==='social'?'no Mercado Social':k==='cafe'?'na Cafeteria':'no Restaurante'}. Já vale no PDV depois da próxima sincronização.</p></div>
  ${field({id:'vcC',label:'Código',val:'',ph:'Ex.: SALDAO20'})}${field({id:'vcN',label:'Campanha',val:'',ph:'Ex.: Saldão · 20%'})}
  <div class="field"><label>Tipo de desconto</label>${vsChips('vsVtp','p',[['p','Percentual (%)'],['v','Valor fixo (R$)']])}</div>
  <div class="row g3">${field({id:'vcV',label:'Valor',val:'',ph:'20',im:'decimal'})}${field({id:'vcL',label:'Limite de usos (opcional)',val:'',ph:'Sem limite',im:'numeric'})}</div>
  <div class="row g3">${field({id:'vcF',label:'Vale a partir de',type:'date',val:VM_TODAY})}${field({id:'vcU',label:'Vale até (opcional)',type:'date',val:''})}</div>
  <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="vcOk">Criar voucher</button></div></div>`,sh=>$('#vcOk',sh).addEventListener('click',()=>{
   const code=val('vcC').toUpperCase().replace(/\s+/g,''),nome=val('vcN'),tp=S.vs.vtp,raw=parseFloat(val('vcV').replace(',','.')),from=val('vcF'),until=val('vcU'),lim=val('vcL')?parseInt(val('vcL'),10):null;let bad=false;
   if(!/^[A-Z0-9]{3,20}$/.test(code)){setErr('vcC','3 a 20 letras ou números, sem espaço.');bad=true;}else if(VCHM[k].some(v=>v.code===code)){setErr('vcC','Já existe um voucher com esse código.');bad=true;}
   if(!nome){setErr('vcN','Informe a campanha.');bad=true;}if(!(raw>0)||(tp==='p'&&raw>100)){setErr('vcV',tp==='p'?'De 1 a 100.':'Informe o valor.');bad=true;}
   if(!from){setErr('vcF','Informe a data.');bad=true;}else if(until&&until<from){setErr('vcU','Antes do início.');bad=true;}
   if(val('vcL')&&!(lim>0)){setErr('vcL','Maior que zero.');bad=true;}if(bad)return;
   VCHM[k].unshift({id:k+'-v'+Date.now(),code,name:nome,type:tp,value:tp==='p'?Math.round(raw):Math.round(raw*100),from,to:until||'',limit:lim,uses:0,paused:false});vsDone('Voucher criado',code);}));}
Object.assign(A,{vsVch:v=>vsVchSheet(v),vsVchNew:()=>vsVchForm(),
 vsVst:v=>{S.vs.vst=v;softRender();},
 vsVtp:v=>{S.vs.vtp=v;$$('.sheet .vchips button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));},
 vsVchTog:v=>{const [k,id]=v.split('|'),x=VCHM[k].find(y=>y.id===id);x.paused=!x.paused;vsDone(x.paused?'Voucher pausado':'Voucher ativado',x.code);}});
phone.addEventListener('input',e=>{if(e.target.id!=='vsVq')return;S.vs.vq=e.target.value;const w=$('#vsVw');if(w)w.innerHTML=vmRows(vsK());});

/* dados de exemplo das vendas feitas no PDV: origem, pagamento dividido, voucher e divergência */
['shop','social'].forEach(kk=>{const vch=VCHM[kk][0];
 VS[kk].sales.forEach((s,i)=>{if(s.or!=='Balcão'||s.status!=='completed')return;
  if(i%2===0){s.or='PDV';s.pdv=kk==='shop'?'PDV-SEDE-01':'PDV-SOCIAL-01';
   if(i%10===2){s.voucher={code:vch.code};s.vd=Math.round(s.total*vch.value/100);s.total-=s.vd;}
   if(i%6===0&&s.method!=='Dinheiro'&&s.total>=1000){const a=Math.round(s.total*.4/10)*10;s.pays=[{method:'Dinheiro',amount:a},{method:s.method,amount:s.total-a}];s.method='Misto';}
   if(i%14===4)s.divs=['Preço alterado à mão no PDV.'];}});});
const vsBy=(v,p)=>v.reduce((n,s)=>n+(s.pays?s.pays.filter(x=>x.method===p).reduce((a,x)=>a+x.amount,0):(s.method===p?s.total:0)),0);

/* ================= Vouchers de EVENTOS no app administrativo =================
   Na página do evento (Agenda › Eventos): consultar, criar e pausar. O Admin da Agenda cria e pausa (como nos módulos de venda). */
const EVV={ev1:[],ev2:[],ev3:[]};
const EVV_ROW=(e,n,code,type,value,from,to,limit,uses,mode,email,paused)=>EVV[e].push({id:e+'-v'+n,code,type,value,from,to,limit,uses,mode:mode||'liberado',email:email||'',paused:!!paused});
EVV_ROW('ev1',1,'ANUAL10','p',10,'2026-08-01','2026-10-10',null,12);
EVV_ROW('ev1',2,'MEMBRO20','v',2000,'2026-08-01','',null,7);
EVV_ROW('ev2',1,'MISSOES10','p',10,'2026-09-01','2026-10-18',null,3);
EVV_ROW('ev3',1,'JOVEM15','p',15,'2026-09-15','',null,9);
EVV_ROW('ev3',2,'RETIRO10','v',2000,'2026-09-01','2026-09-30',null,4);
EVV_ROW('ev3',3,'BOASVINDAS-GIOVANNA','v',3000,'2026-09-20','',1,0,'especifico','giovanna.martins@email.com');
const evVchAdmin=()=>lvlOf('agenda')>=3&&S.subs!=='suspensa';
function evVchSheet(id){const r=agOf(id),l=EVV[id]||(EVV[id]=[]),adm=evVchAdmin();
 sheet(`<div class="stack g5"><div class="row between" style="align-items:center;gap:12px"><div class="stack g2" style="min-width:0"><h3 class="t2">Vouchers</h3><p class="callout">${esc(r.n)}</p></div>${adm?`<button class="btn primary sm" data-a="evVchNew" data-v="${id}">${ic('plus',16,2.2)}Novo</button>`:''}</div>
  ${l.length?`<div class="vl">${l.map(v=>{const s=vmStat(v);return `<button class="vr tap ${v.paused?'dim':''}" data-a="evVchOpen" data-v="${id}|${v.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(v.code)}</span><span class="vs">${vmVal(v)} · ${v.mode==='especifico'?esc(v.email):'qualquer pessoa'}</span></span>${vsTag(s[1],s[0])}</button>`;}).join('')}</div>`:vsEmpty('Nenhum voucher','Crie códigos de desconto ou bolsas para este evento.')}
  ${adm?'':'<p class="callout">Criar e pausar voucher é com o Admin da Agenda.</p>'}</div>`);}
function evVchOpen(v){const [e,id]=v.split('|'),x=EVV[e].find(y=>y.id===id),s=vmStat(x);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${esc(x.code)}</h3><p class="callout">${x.mode==='especifico'?'Só para '+esc(x.email):'Qualquer pessoa que tiver o código'}</p></div>
  <div class="vk"><div><b>${vmVal(x)}</b><span>Desconto</span></div><div><b>${x.uses}${x.limit!=null?'/'+x.limit:''}</b><span>Usos</span></div><div>${vsTag(s[1],s[0])}<span style="margin-top:8px">Situação</span></div></div>
  <div class="vl"><div class="vr"><span class="vs" style="min-width:104px">Vale de</span><span class="grow" style="text-align:right">${vmDate(x.from)}</span></div><div class="vr"><span class="vs" style="min-width:104px">Vale até</span><span class="grow" style="text-align:right">${x.to?vmDate(x.to):'sem data final'}</span></div></div>
  ${evVchAdmin()?`<button class="btn ${x.paused?'primary':'outline'} md block" data-a="evVchTog" data-v="${v}">${x.paused?'Ativar voucher':'Pausar voucher'}</button>`:'<p class="callout">Você só pode consultar este voucher.</p>'}<p class="vs">Editar e excluir voucher é na web.</p></div>`);}
function evVchForm(e){S.vs.vtp='p';S.vs.vwho='liberado';const r=agOf(e);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Novo voucher</h3><p class="callout">Desconto no ${esc(r.n)}.</p></div>
  ${field({id:'ecC',label:'Código',val:'',ph:'Ex.: RETIRO10'})}
  <div class="field"><label>Tipo de desconto</label>${vsChips('vsVtp','p',[['p','Percentual (%)'],['v','Valor fixo (R$)']])}</div>
  <div class="row g3">${field({id:'ecV',label:'Valor',val:'',ph:'10',im:'decimal'})}<div id="ecLw" style="flex:1;min-width:0">${field({id:'ecL',label:'Limite de usos (opcional)',val:'',ph:'Sem limite',im:'numeric'})}</div></div>
  <div class="row g3">${field({id:'ecF',label:'Vale a partir de',type:'date',val:VM_TODAY})}${field({id:'ecU',label:'Vale até (opcional)',type:'date',val:''})}</div>
  <div class="field"><label>Quem pode usar</label>${vsChips('evVwho','liberado',[['liberado','Qualquer pessoa'],['especifico','Uma pessoa']])}</div>
  <div id="ecEw" hidden>${field({id:'ecE',label:'E-mail autorizado',val:'',ph:'pessoa@email.com',type:'email'})}</div>
  <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="ecOk">Criar voucher</button></div></div>`,sh=>$('#ecOk',sh).addEventListener('click',()=>{
   const code=val('ecC').toUpperCase().replace(/\s+/g,'-'),tp=S.vs.vtp,raw=parseFloat(val('ecV').replace(',','.')),from=val('ecF'),until=val('ecU'),who=S.vs.vwho,em=val('ecE'),lim=who==='especifico'?1:(val('ecL')?parseInt(val('ecL'),10):null);let bad=false;
   if(code.length<3){setErr('ecC','Mínimo de 3 caracteres.');bad=true;}else if(EVV[e].some(v=>v.code===code)){setErr('ecC','Esse código já existe neste evento.');bad=true;}
   if(!(raw>0)||(tp==='p'&&raw>100)){setErr('ecV',tp==='p'?'De 1 a 100.':'Informe o valor.');bad=true;}
   if(!from){setErr('ecF','Informe a data.');bad=true;}else if(until&&until<from){setErr('ecU','Antes do início.');bad=true;}
   if(who==='liberado'&&val('ecL')&&!(lim>0)){setErr('ecL','Maior que zero.');bad=true;}
   if(who==='especifico'&&!/^\S+@\S+\.\S+$/.test(em)){setErr('ecE','E-mail inválido.');bad=true;}if(bad)return;
   EVV[e].unshift({id:e+'-v'+Date.now(),code,type:tp,value:tp==='p'?Math.round(raw):Math.round(raw*100),from,to:until||'',limit:lim,uses:0,mode:who,email:who==='especifico'?em:'',paused:false});closeSheet();softRender();toast('success','Voucher criado',code);}));}
Object.assign(A,{evVch:id=>evVchSheet(id),evVchOpen:v=>evVchOpen(v),evVchNew:id=>evVchForm(id),
 evVchTog:v=>{const [e,id]=v.split('|'),x=EVV[e].find(y=>y.id===id);x.paused=!x.paused;closeSheet();softRender();toast('success',x.paused?'Voucher pausado':'Voucher ativado',x.code);},
 evVwho:v=>{S.vs.vwho=v;$$('.sheet .vchips').forEach(c=>{if(c.querySelector('[data-a="evVwho"]'))$$('button',c).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));});const em=$('#ecEw'),lw=$('#ecLw');if(em)em.hidden=v!=='especifico';if(lw)lw.style.display=v==='especifico'?'none':'';}});
