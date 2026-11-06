/* =========================================================
   VENDAS · Cafeteria, Restaurante e Loja: visão geral, itens, categorias, vendas, caixa e estoque
   Mesmo molde para os três pontos de venda; o acesso do Gestão decide quais botões aparecem.
   ========================================================= */
const VS_READY=['cafe','rest','shop'],VS_DAY=29,VPAY=['Pix','Cartão','Dinheiro'];
const VSDEF={cafe:{pre:'CF',h:16,cats:[['salg','Salgados','damasco'],['bolo','Bolos','rosado'],['lan','Lanches','lima'],['agua','Água','ceu'],['beb','Bebidas','menta'],['doc','Doces','salvia']],items:[['Coxinha','salg',700,32],['Pão de queijo','salg',500,8],['Bolo de cenoura · fatia','bolo',800,12],['Sanduíche natural','lan',1200,14],['Pipoca · porção','lan',500,0],['Água mineral 500 ml','agua',400,80],['Refrigerante · lata','beb',600,36],['Café expresso','beb',500,45],['Bombom','doc',300,24]]},
 rest:{pre:'RE',h:12,cats:[['alm','Almoço','damasco'],['mar','Marmitas','lima'],['sob','Sobremesas','rosado'],['agua','Água','ceu'],['beb','Bebidas','menta']],items:[['Almoço · prato completo','alm',3900,46],['Marmita completa','mar',2900,18],['Pudim · porção','sob',900,7],['Mousse de maracujá','sob',800,10],['Água mineral 500 ml','agua',400,65],['Refrigerante · lata','beb',600,28],['Suco natural · copo','beb',800,20]]},
 shop:{pre:'LJ',h:10,cats:[['books','Livros','ceu'],['shirts','Camisetas','salvia'],['acc','Acessórios','damasco']],items:[['Livro · Uma vida com propósito','books',4900,25,5],['Camiseta Alva','shirts',5900,18,5],['Caneca Alva','acc',3500,8,3],['Bíblia de estudo','books',8900,6,4],['Ecobag Alva','acc',2500,30,5]]}};
const VS={};
Object.entries(VSDEF).forEach(([k,d])=>{const st=VS[k]={cats:d.cats.map(([id,name,tone])=>({id,name,tone})),sales:[],moves:[],seq:0,mv:0,cash:{open:true,since:'07:30',float:5000}};
 st.items=d.items.map(([name,cat,price,stock,min],i)=>({id:k+i,name,cat,price,stock,min:min||10,active:true}));const n=st.items.length;
 for(let day=1;day<=VS_DAY;day++)for(let t=0;t<3;t++){const a=(day+t)%n,b=(a+(n>5?3:1))%n;
  const lines=[a,b].map((ix,j)=>({item:st.items[ix].id,qty:1+(day+t+j)%3,price:st.items[ix].price}));
  const status=(day===12&&t===0)||(day===21&&t===1)?'cancelled':'completed',total=lines.reduce((x,l)=>x+l.qty*l.price,0);
  st.sales.push({id:d.pre+'-'+String(++st.seq).padStart(4,'0'),day,time:(d.h+t)+':'+String(10+(day%4)*10).padStart(2,'0'),lines,status,method:VPAY[[0,1,0,2][(day+t)%4]],total});}
 st.items.forEach(it=>st.moves.push({id:'m'+(++st.mv),item:it.id,day:25,kind:'entry',qty:20,reason:'Compra / reposição'}));
 st.sales.filter(s=>s.status==='cancelled').forEach(s=>st.moves.push({id:'m'+(++st.mv),item:s.lines[0].item,day:s.day,kind:'refund',qty:s.lines[0].qty,reason:'Venda '+s.id+' cancelada'}));
 st.moves.push({id:'m'+(++st.mv),item:st.items[1].id,day:27,kind:'adjust',qty:-2,reason:'Perda · validade'});});
S.vs={per:'dia',q:'',cat:'all',st:'all',mv:'all',cart:{}};
const vsK=()=>S.gmod,vsS=k=>VS[k],vsItem=(k,id)=>VS[k].items.find(i=>i.id===id),vsCat=(k,id)=>VS[k].cats.find(c=>c.id===id)||{name:'Sem categoria',tone:'salvia'};
const vsMoney=c=>brl(c/100),vsPerOk=s=>S.vs.per==='dia'?s.day===VS_DAY:true;
const vsSalesIn=k=>VS[k].sales.filter(vsPerOk),vsOk=a=>a.filter(s=>s.status==='completed');
const vsSum=a=>{const v=vsOk(a),sold=v.reduce((n,s)=>n+s.total,0);return{sold,count:v.length,units:v.reduce((n,s)=>n+s.lines.reduce((x,l)=>x+l.qty,0),0),ticket:v.length?Math.round(sold/v.length):0};};
const vsStock=it=>!it.active?['Inativo','off']:it.stock<=0?['Sem estoque','danger']:it.stock<=it.min?[it.stock+' un. · baixo','warning']:[it.stock+' un.','ok'];
const vsTag=(t,l)=>`<span class="vtag v-${t}">${l}</span>`;
const vsChips=(act,cur,list)=>`<div class="vchips" role="group">${list.map(([v,l,n])=>`<button type="button" data-a="${act}" data-v="${v}" aria-pressed="${cur===v}">${l}${n!=null?`<small>${n}</small>`:''}</button>`).join('')}</div>`;
const vsPeriod=()=>vsChips('vsPer',S.vs.per,[['dia','Hoje · '+VS_DAY+' set'],['mes','Setembro']]);
const vsHead=(label,btn)=>`<div class="row between" style="align-items:center;gap:12px"><p class="eb2">${label}</p>${btn||''}</div>`;
const vsAdd=(k,act,label)=>can(k,'criar')?`<button class="btn primary sm" data-a="${act}">${ic('plus',16,2.2)}${label}</button>`:'';
const vsEmpty=(t,s)=>`<div class="vempty"><b>${t}</b><span>${s||''}</span></div>`;
const vsSearch=(id,ph,val)=>`<div class="fbox" style="min-height:48px">${ic('search',20)}<input id="${id}" type="search" placeholder="${ph}" value="${esc(val)}" aria-label="${ph}" autocomplete="off"></div>`;

/* ---- Visão geral ---- */
function vsOverview(k){const st=VS[k],sales=vsSalesIn(k),m=vsSum(sales),v=vsOk(sales),lines=v.flatMap(s=>s.lines);
 const days=Array.from({length:14},(_,i)=>{const d=VS_DAY-13+i;return{d,val:vsOk(st.sales.filter(s=>s.day===d)).reduce((n,s)=>n+s.total,0)};}),mx=Math.max(1,...days.map(x=>x.val));
 const top=st.items.map(it=>{const ls=lines.filter(l=>l.item===it.id),q=ls.reduce((n,l)=>n+l.qty,0);return{it,q,val:ls.reduce((n,l)=>n+l.qty*l.price,0)};}).filter(x=>x.q).sort((a,b)=>b.val-a.val).slice(0,5),tm=Math.max(1,...top.map(x=>x.val));
 const low=st.items.filter(i=>i.active&&i.stock<=i.min).sort((a,b)=>a.stock-b.stock).slice(0,4);
 const pay=VPAY.map(p=>({p,val:v.filter(s=>s.method===p).reduce((n,s)=>n+s.total,0)}));
 return `${vsPeriod()}
 <section class="ovh"><p class="ovh-eb">Vendido no período</p><b class="ovh-n">${vsMoney(m.sold)}</b><p class="ovh-s"><span class="ovh-chip">${m.count} venda${m.count===1?'':'s'}</span><span>Ticket médio ${vsMoney(m.ticket)}</span></p></section>
 <section class="stack g3"><p class="eb2">Últimos 14 dias</p><div class="vbars" role="img" aria-label="Vendas por dia">${days.map(x=>`<i class="${x.d===VS_DAY?'now':''}" style="height:${Math.max(3,x.val/mx*100)}%" title="${x.d} set · ${vsMoney(x.val)}"></i>`).join('')}</div><div class="vbars-l"><span>${days[0].d} set</span><span>hoje</span></div></section>
 <section class="stack g3"><p class="eb2">Meios de pagamento</p>${m.sold?`<div class="vstack">${pay.filter(x=>x.val).map((x,i)=>`<i style="flex:${x.val}" class="p${VPAY.indexOf(x.p)}"></i>`).join('')}</div><div class="vl">${pay.map(x=>`<div class="vr"><span class="vdot p${VPAY.indexOf(x.p)}"></span><span class="grow">${x.p}</span><b>${vsMoney(x.val)}</b></div>`).join('')}</div>`:vsEmpty('Sem vendas no período')}</section>
 <section class="stack g3"><p class="eb2">Mais vendidos</p>${top.length?`<div class="vl">${top.map((x,i)=>`<div class="vr"><span class="vrk">${i+1}</span><span class="grow stack" style="gap:6px;min-width:0"><span class="vn">${esc(x.it.name)}</span><span class="vg"><i style="width:${x.val/tm*100}%"></i></span></span><span class="vq">${x.q} un.</span></div>`).join('')}</div>`:vsEmpty('Sem vendas no período')}</section>
 <section class="stack g3"><p class="eb2">Precisam de atenção</p>${low.length?`<div class="vl">${low.map(i=>`<button class="vr tap" data-a="vsItem" data-v="${i.id}"><span class="grow vn">${esc(i.name)}</span>${vsTag(vsStock(i)[1],vsStock(i)[0])}</button>`).join('')}</div>`:vsEmpty('Tudo em dia','Sem estoque baixo.')}</section>`;}

/* ---- Itens ---- */
function vsItemRows(k){const st=VS[k],q=norm2(S.vs.q),l=st.items.filter(i=>(S.vs.cat==='all'||i.cat===S.vs.cat)&&(!q||norm2(i.name).includes(q)));
 return l.length?`<div class="vl">${l.map(i=>{const s=vsStock(i);return `<button class="vr tap ${i.active?'':'dim'}" data-a="vsItem" data-v="${i.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(i.name)}</span><span class="vs">${esc(vsCat(k,i.cat).name)} · ${vsMoney(i.price)}</span></span>${vsTag(s[1],s[0])}</button>`;}).join('')}</div>`:vsEmpty('Nenhum item','Tente outra busca ou categoria.');}
const norm2=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function vsItems(k){const st=VS[k];return `${vsHead(st.items.length+' itens',vsAdd(k,'vsItemNew','Novo item'))}${vsSearch('vsQ','Buscar item',S.vs.q)}${vsChips('vsCat',S.vs.cat,[['all','Todas'],...st.cats.map(c=>[c.id,c.name])])}<div id="vsList">${vsItemRows(k)}</div>`;}

/* ---- Categorias ---- */
function vsCats(k){const st=VS[k];return `${vsHead(st.cats.length+' categorias',vsAdd(k,'vsCatNew','Nova categoria'))}<div class="vl">${st.cats.map(c=>{const n=st.items.filter(i=>i.cat===c.id).length;return `<button class="vr tap" data-a="vsCat1" data-v="${c.id}"><span class="vdot" style="background:var(--tone-${c.tone})"></span><span class="grow vn">${esc(c.name)}</span><span class="vq">${n} ${n===1?'item':'itens'}</span></button>`;}).join('')}</div>`;}

/* ---- Vendas ---- */
const vsDesc=s=>s.lines.map(l=>l.qty+'× '+vsItem(vsK(),l.item).name).join(', ');
function vsSalesRows(k){const q=norm2(S.vs.q),a=vsSalesIn(k).filter(s=>(S.vs.st==='all'||s.status===S.vs.st)&&(!q||norm2(s.id+' '+vsDesc(s)).includes(q))).sort((x,y)=>(y.day*10000+y.time.replace(':','')*1)-(x.day*10000+x.time.replace(':','')*1)),rows=S.vs.rows||20;
 return a.length?`<div class="vl">${a.slice(0,rows).map(s=>`<button class="vr tap ${s.status==='cancelled'?'dim':''}" data-a="vsSale" data-v="${s.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${s.id} · ${s.day===VS_DAY?'hoje':s.day+' set'}, ${s.time}</span><span class="vs">${esc(vsDesc(s))}</span></span><span class="stack" style="gap:4px;align-items:flex-end"><b class="vamt">${vsMoney(s.total)}</b>${s.status==='cancelled'?vsTag('danger','Cancelada'):`<span class="vs">${s.method}</span>`}</span></button>`).join('')}</div>${a.length>rows?`<button class="btn outline md block" data-a="vsMore">Ver mais · ${a.length-rows}</button>`:''}`:vsEmpty('Nenhuma venda','Mude o período ou o filtro.');}
function vsSalesView(k){const all=vsSalesIn(k),n=s=>all.filter(x=>s==='all'||x.status===s).length,m=vsSum(all);
 return `${vsPeriod()}${vsHead(m.count+' vendas · '+vsMoney(m.sold),vsAdd(k,'vsSaleNew','Venda rápida'))}${vsSearch('vsSq','Buscar código ou produto',S.vs.q)}${vsChips('vsSt',S.vs.st,[['all','Todas',n('all')],['completed','Concluídas',n('completed')],['cancelled','Canceladas',n('cancelled')]])}<div id="vsList">${vsSalesRows(k)}</div>`;}

/* ---- Caixa diário ---- */
function vsCash(k){const st=VS[k],c=st.cash,today=st.sales.filter(s=>s.day===VS_DAY),v=vsOk(today),by=p=>v.filter(s=>s.method===p).reduce((n,s)=>n+s.total,0),sold=v.reduce((n,s)=>n+s.total,0);
 return `<div class="row between" style="align-items:center"><div class="stack" style="gap:2px"><p class="eb2">Hoje · ${VS_DAY} set</p><span class="vs">${c.open?'Aberto desde '+c.since:'Fechado às '+c.closed}</span></div>${vsTag(c.open?'ok':'off',c.open?'Aberto':'Fechado')}</div>
 <div class="vk"><div><b>${vsMoney(sold)}</b><span>Vendido</span></div><div><b>${v.length}</b><span>Vendas</span></div><div><b>${vsMoney(c.float+by('Dinheiro'))}</b><span>Em dinheiro</span></div></div>
 <section class="stack g3"><p class="eb2">Por meio de pagamento</p><div class="vl"><div class="vr"><span class="grow">Fundo de caixa</span><b>${vsMoney(c.float)}</b></div>${VPAY.map(p=>`<div class="vr"><span class="vdot p${VPAY.indexOf(p)}"></span><span class="grow">${p}</span><b>${vsMoney(by(p))}</b></div>`).join('')}</div></section>
 ${can(k,'editar')?(c.open?`<button class="btn primary md block" data-a="vsClose">Fechar caixa</button>`:can(k,'excluir')?`<button class="btn outline md block" data-a="vsReopen">Reabrir caixa</button>`:`<p class="callout">Caixa fechado. Só o Admin da área reabre.</p>`):'<p class="callout">Você só pode consultar o caixa.</p>'}`;}

/* ---- Movimentações ---- */
const VMV={entry:['Entrada','ok','+'],sale:['Venda','info','−'],refund:['Estorno','warning','+'],adjust:['Ajuste','off','']};
function vsMoves(k){const st=VS[k],l=st.moves.filter(m=>S.vs.mv==='all'||m.kind===S.vs.mv).sort((a,b)=>b.day-a.day||b.id.localeCompare(a.id,'pt',{numeric:true})).slice(0,40);
 return `${vsHead(st.moves.length+' movimentações',vsAdd(k,'vsMoveNew','Nova'))}${vsChips('vsMv',S.vs.mv,[['all','Todas'],['entry','Entradas'],['sale','Vendas'],['adjust','Ajustes'],['refund','Estornos']])}
 ${l.length?`<div class="vl">${l.map(m=>{const t=VMV[m.kind],it=vsItem(k,m.item),q=m.kind==='sale'?-Math.abs(m.qty):m.qty;return `<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(it?it.name:'Item removido')}</span><span class="vs">${t[0]} · ${m.day===VS_DAY?'hoje':m.day+' set'} · ${esc(m.reason)}</span></span><b class="vamt" style="color:${q<0?'var(--danger-ink,var(--ink))':'var(--ink)'}">${q>0?'+':''}${q}</b></div>`;}).join('')}</div>`:vsEmpty('Nenhuma movimentação')}`;}

/* ---- ponto de entrada (usado pela Gestão) ---- */
function vsBody(k,sec){const M={'Visão geral':vsOverview,'Itens':vsItems,'Categorias':vsCats,'Vendas':vsSalesView,'Caixa diário':vsCash,'Movimentações':vsMoves,'Divergências':vsDiv,'Pedidos do app':vsOrders};return `<div class="stack g5 vs-root">${(M[sec]||vsOverview)(k)}</div>`;}

/* ---- sheets ---- */
const vsDone=(t,m)=>{closeSheet();softRender();toast('success',t,m);};
const vsConfirm=(title,msg,yes,fn)=>sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${title}</h3><p class="callout">${msg}</p></div><div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Voltar</button><button class="btn danger md grow" id="vcY">${yes}</button></div></div>`,sh=>$('#vcY',sh).addEventListener('click',()=>{fn();}));
function vsItemSheet(id){const k=vsK(),it=vsItem(k,id),s=vsStock(it);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${esc(it.name)}</h3><p class="callout">${esc(vsCat(k,it.cat).name)} · ${vsMoney(it.price)}</p></div>
 <div class="vk"><div><b>${it.stock}</b><span>Em estoque</span></div><div><b>${it.min}</b><span>Mínimo</span></div><div>${vsTag(s[1],it.active?(it.stock<=0?'Sem estoque':it.stock<=it.min?'Baixo':'Em dia'):'Inativo')}<span style="margin-top:8px">Situação</span></div></div>
 ${can(k,'editar')?`<div class="row g3"><button class="btn primary md grow" data-a="vsItemEdit" data-v="${id}">Editar</button><button class="btn outline md grow" data-a="vsItemAct" data-v="${id}">${it.active?'Desativar':'Ativar'}</button></div>`:'<p class="callout">Você só pode ver este item.</p>'}
 ${can(k,'excluir')?`<button class="btn danger md block" data-a="vsItemDel" data-v="${id}">Excluir item</button>`:''}</div>`);}
function vsItemForm(id){const k=vsK(),st=VS[k],it=id?vsItem(k,id):null;S.vs.fcat=it?it.cat:st.cats[0].id;
 sheet(`<div class="stack g5"><h3 class="t2">${it?'Editar item':'Novo item'}</h3>${field({id:'viN',label:'Nome',val:it?it.name:'',ph:'Ex.: Pão de queijo'})}${field({id:'viP',label:'Preço (R$)',val:it?(it.price/100).toFixed(2).replace('.',','):'',ph:'0,00',im:'decimal'})}
 <div class="field"><label>Categoria</label>${vsChips('vsFcat',S.vs.fcat,st.cats.map(c=>[c.id,c.name]))}</div>
 <div class="row g3">${field({id:'viS',label:it?'Estoque':'Estoque inicial',val:it?it.stock:'0',im:'numeric'})}${field({id:'viM',label:'Mínimo',val:it?it.min:'10',im:'numeric'})}</div>
 <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="viOk">Salvar</button></div></div>`,sh=>$('#viOk',sh).addEventListener('click',()=>{
  const n=val('viN'),p=Math.round(parseFloat(val('viP').replace(',','.'))*100),s=parseInt(val('viS'),10),m=parseInt(val('viM'),10);let bad=false;
  if(!n){setErr('viN','Dê um nome ao item.');bad=true;}if(!(p>0)){setErr('viP','Informe um preço maior que zero.');bad=true;}if(isNaN(s)){setErr('viS','Número inválido.');bad=true;}if(bad)return;
  if(it){Object.assign(it,{name:n,price:p,cat:S.vs.fcat,stock:s,min:isNaN(m)?it.min:m});}else st.items.push({id:k+Date.now(),name:n,cat:S.vs.fcat,price:p,stock:s,min:isNaN(m)?10:m,active:true});
  vsDone(it?'Item atualizado':'Item criado',n);}));}
function vsCatForm(id){const k=vsK(),st=VS[k],c=id?st.cats.find(x=>x.id===id):null,n=c?st.items.filter(i=>i.cat===c.id).length:0;
 sheet(`<div class="stack g5"><h3 class="t2">${c?'Editar categoria':'Nova categoria'}</h3>${field({id:'vcN',label:'Nome',val:c?c.name:'',ph:'Ex.: Salgados'})}
 <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button>${can(k,'editar')?`<button class="btn primary md grow" id="vcOk">Salvar</button>`:''}</div>
 ${c&&can(k,'excluir')?(n?`<p class="callout">Para excluir, mova antes os ${n} itens desta categoria.</p>`:`<button class="btn danger md block" id="vcDel">Excluir categoria</button>`):''}</div>`,sh=>{
  const ok=$('#vcOk',sh);ok&&ok.addEventListener('click',()=>{const nm=val('vcN');if(!nm){setErr('vcN','Dê um nome à categoria.');return;}if(c)c.name=nm;else st.cats.push({id:'c'+Date.now(),name:nm,tone:['damasco','rosado','lima','ceu','menta','salvia'][st.cats.length%6]});vsDone(c?'Categoria atualizada':'Categoria criada',nm);});
  const d=$('#vcDel',sh);d&&d.addEventListener('click',()=>vsConfirm('Excluir categoria?','“'+esc(c.name)+'” some da lista. Isso não pode ser desfeito.','Excluir',()=>{st.cats.splice(st.cats.indexOf(c),1);vsDone('Categoria excluída',c.name);}));});}
function vsSaleSheet(id){const k=vsK(),s=VS[k].sales.find(x=>x.id===id),can2=can(k,'editar')&&s.status==='completed';
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Venda ${s.id}</h3><p class="callout">${s.day===VS_DAY?'Hoje':s.day+' set'}, ${s.time} · ${s.method}</p></div>
 <div class="vl">${s.lines.map(l=>`<div class="vr"><span class="grow vn">${l.qty}× ${esc(vsItem(k,l.item).name)}</span><b>${vsMoney(l.qty*l.price)}</b></div>`).join('')}<div class="vr"><span class="grow"><b>Total</b></span><b class="vamt">${vsMoney(s.total)}</b></div></div>
 ${s.status==='cancelled'?`<p class="callout">Venda cancelada. O estoque foi devolvido.</p>`:''}
 ${can2?`<button class="btn danger md block" data-a="vsSaleCancel" data-v="${id}">Cancelar venda</button>`:s.status==='completed'?'<p class="callout">Você só pode consultar esta venda.</p>':''}</div>`);}
function vsSaleNew(){const k=vsK(),st=VS[k];if(!st.cash.open){toast('error','Caixa fechado','Reabra o caixa para vender.');return;}S.vs.cart={};S.vs.pay='Pix';
 sheet(`<div class="stack g5"><h3 class="t2">Venda rápida</h3>${st.items.length>4?vsSearch('vsRq','Buscar item',''):''}<div class="vl vsel" id="vsRl">${st.items.filter(i=>i.active&&i.stock>0).map(i=>`<div class="vr" data-n="${esc(norm2(i.name))}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(i.name)}</span><span class="vs">${vsMoney(i.price)} · ${i.stock} un.</span></span><span class="vstep"><button type="button" data-a="vsQty" data-v="${i.id}|-1" aria-label="Menos">−</button><b id="q-${i.id}">0</b><button type="button" data-a="vsQty" data-v="${i.id}|1" aria-label="Mais">+</button></span></div>`).join('')}</div>
 ${vsChips('vsPay','Pix',VPAY.map(p=>[p,p]))}<div class="row between" style="align-items:center"><span class="callout">Total</span><b class="t2" id="vsTot">R$ 0,00</b></div>
 <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="vsOk" disabled>Confirmar</button></div></div>`,sh=>{const rq=$('#vsRq',sh);if(rq)rq.addEventListener('input',()=>{const q=norm2(rq.value);let n=0;sh.querySelectorAll('#vsRl .vr').forEach(r=>{const h=!!q&&!r.dataset.n.includes(q);r.hidden=h;if(!h)n++;});let e=$('#vsRe',sh);if(!n&&!e){e=document.createElement('p');e.id='vsRe';e.className='callout';e.textContent='Nenhum item encontrado.';$('#vsRl',sh).after(e);}else if(n&&e)e.remove();});$('#vsOk',sh).addEventListener('click',()=>{
  const ls=Object.entries(S.vs.cart).filter(x=>x[1]>0).map(([id,q])=>({item:id,qty:q,price:vsItem(k,id).price}));if(!ls.length)return;
  const pre=VSDEF[k].pre,total=ls.reduce((n,l)=>n+l.qty*l.price,0),t=new Date();
  st.sales.push({id:pre+'-'+String(++st.seq).padStart(4,'0'),day:VS_DAY,time:'18:'+String(20+st.seq%40).padStart(2,'0'),lines:ls,status:'completed',method:S.vs.pay,total});
  ls.forEach(l=>{vsItem(k,l.item).stock-=l.qty;st.moves.push({id:'m'+(++st.mv),item:l.item,day:VS_DAY,kind:'sale',qty:l.qty,reason:'Venda '+pre+'-'+String(st.seq).padStart(4,'0')});});
  vsDone('Venda registrada',vsMoney(total)+' · '+S.vs.pay);});});}
function vsMoveNew(){const k=vsK(),st=VS[k];S.vs.mk='entry';S.vs.mi=st.items[0].id;
 sheet(`<div class="stack g5"><h3 class="t2">Nova movimentação</h3><div class="field"><label for="vmI">Item</label><select id="vmI" class="rail-sel">${st.items.map(i=>`<option value="${i.id}">${esc(i.name)}</option>`).join('')}</select></div>
 <div class="field"><label>Tipo</label>${vsChips('vsMk','entry',[['entry','Entrada'],['out','Saída'],['adjust','Ajuste']])}</div>
 ${field({id:'vmQ',label:'Quantidade',val:'',ph:'0',im:'numeric'})}${field({id:'vmR',label:'Motivo',val:'',ph:'Ex.: Compra, perda, contagem'})}
 <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="vmOk">Salvar</button></div></div>`,sh=>$('#vmOk',sh).addEventListener('click',()=>{
  const q=parseInt(val('vmQ'),10),r=val('vmR'),it=vsItem(k,$('#vmI',sh).value);let bad=false;if(!(q>0)){setErr('vmQ','Informe uma quantidade maior que zero.');bad=true;}if(!r){setErr('vmR','Conte o motivo.');bad=true;}if(bad)return;
  const kind=S.vs.mk==='entry'?'entry':'adjust',d=S.vs.mk==='entry'?q:-q;it.stock+=d;st.moves.push({id:'m'+(++st.mv),item:it.id,day:VS_DAY,kind,qty:d,reason:r});vsDone('Movimentação salva',it.name+' · '+(d>0?'+':'')+d);}));}

Object.assign(A,{
 vsPer:v=>{S.vs.per=v;S.vs.rows=20;softRender();},vsCat:v=>{S.vs.cat=v;softRender();},vsSt:v=>{S.vs.st=v;S.vs.rows=20;softRender();},vsMv:v=>{S.vs.mv=v;softRender();},vsMore:()=>{S.vs.rows=(S.vs.rows||20)+20;softRender();},
 vsItem:id=>vsItemSheet(id),vsItemNew:()=>vsItemForm(),vsItemEdit:id=>vsItemForm(id),
 vsItemAct:id=>{const it=vsItem(vsK(),id);it.active=!it.active;vsDone(it.active?'Item ativado':'Item desativado',it.name);},
 vsItemDel:id=>{const k=vsK(),it=vsItem(k,id);vsConfirm('Excluir item?','“'+esc(it.name)+'” sai do catálogo. O histórico de vendas fica.','Excluir',()=>{VS[k].items.splice(VS[k].items.indexOf(it),1);vsDone('Item excluído',it.name);});},
 vsCatNew:()=>vsCatForm(),vsCat1:id=>vsCatForm(id),
 vsFcat:v=>{S.vs.fcat=v;$$('.sheet .vchips button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));},
 vsSale:id=>vsSaleSheet(id),vsSaleNew:()=>vsSaleNew(),
 vsSaleCancel:id=>{const k=vsK(),s=VS[k].sales.find(x=>x.id===id);vsConfirm('Cancelar a venda '+s.id+'?','O valor de '+vsMoney(s.total)+' sai do caixa e os itens voltam ao estoque.','Cancelar venda',()=>{s.status='cancelled';s.lines.forEach(l=>{vsItem(k,l.item).stock+=l.qty;VS[k].moves.push({id:'m'+(++VS[k].mv),item:l.item,day:VS_DAY,kind:'refund',qty:l.qty,reason:'Venda '+s.id+' cancelada'});});vsDone('Venda cancelada',s.id);});},
 vsQty:v=>{const [id,d]=v.split('|'),it=vsItem(vsK(),id),n=Math.max(0,Math.min(it.stock,(S.vs.cart[id]||0)+ +d));S.vs.cart[id]=n;$('#q-'+id).textContent=n;const t=Object.entries(S.vs.cart).reduce((a,[i,q])=>a+q*vsItem(vsK(),i).price,0);$('#vsTot').textContent=vsMoney(t);$('#vsOk').disabled=t===0;},
 vsPay:v=>{S.vs.pay=v;$$('.sheet .vchips button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));},
 vsMk:v=>{S.vs.mk=v;$$('.sheet .vchips button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));},
 vsMoveNew:()=>vsMoveNew(),
 vsClose:()=>vsConfirm('Fechar o caixa de hoje?','Depois de fechado, não dá para registrar vendas até um Admin da área reabrir.','Fechar caixa',()=>{VS[vsK()].cash.open=false;VS[vsK()].cash.closed='19:05';vsDone('Caixa fechado','Hoje, '+VS_DAY+' set');}),
 vsReopen:()=>{VS[vsK()].cash.open=true;vsDone('Caixa reaberto','Já dá para vender.');}
});
phone.addEventListener('input',e=>{if(e.target.id!=='vsQ'&&e.target.id!=='vsSq')return;S.vs.q=e.target.value;const l=$('#vsList');if(l)l.innerHTML=e.target.id==='vsQ'?vsItemRows(vsK()):vsSalesRows(vsK());});
