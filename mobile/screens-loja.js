/* ---------- Loja ---------- */
Object.assign(I,{
 bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
 minus:'<path d="M5 12h14"/>',
 shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
 trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
 card:'<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
 qr:'<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>'});
const LJ_CATS=[['books','Livros','book','ceu'],['shirts','Camisetas','shirt','salvia'],['accessories','Acessórios','gift','damasco']];
const LJ_ITEMS=[
 {id:'sh4',n:'Bíblia de estudo',cat:'books',price:12900,stock:12,desc:'Letra grande, capa em couro sintético.',g:'mar'},
 {id:'sh1',n:'Livro · Uma vida com propósito',cat:'books',price:4900,stock:25,desc:'Edição de bolso, capa dura.',g:'aurora'},
 {id:'sh7',n:'Devocional 365 dias',cat:'books',price:5900,stock:20,desc:'Uma leitura curta para cada dia do ano.',g:'vinho'},
 {id:'sh2',n:'Camiseta Alva',cat:'shirts',price:5900,stock:18,desc:'Algodão, modelagem unissex.',sizes:['P','M','G','GG'],g:'brasa'},
 {id:'sh5',n:'Boné Alva',cat:'accessories',price:4500,stock:4,desc:'Ajustável, com bordado.',g:'lima'},
 {id:'sh8',n:'Ecobag Alva',cat:'accessories',price:2900,stock:15,desc:'Lona crua, alça longa.',g:'aurora'}];
S.lj={cat:'Todos',q:'',pay:'pix'};S.cart=[];S.orders=[{id:'A1027',d:'20 set',items:[{id:'sh1',q:1}],total:4900,pay:'Pix',st:'retirado'}];
const ljR=c=>brl(c/100);
const ljNorm=t=>String(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const ljIt=id=>LJ_ITEMS.find(x=>x.id===id);
const ljCat=id=>LJ_CATS.find(c=>c[0]===id);
const ljCount=()=>S.cart.reduce((a,x)=>a+x.q,0);
const ljTotal=()=>S.cart.reduce((a,x)=>a+ljIt(x.id).price*x.q,0);
const ljInCart=id=>S.cart.filter(x=>x.id===id).reduce((a,x)=>a+x.q,0);
const ljCover=(it,cls='')=>`<span class="lj-cv gr-${it.g} ${cls}">${ic(ljCat(it.cat)[2],cls==='lg'?56:34,1.5)}${it.stock===0?'<span class="lj-bd off">Esgotado</span>':it.stock<=5?`<span class="lj-bd">Últimas ${it.stock}</span>`:''}</span>`;
const ljCartBtn=()=>`<button class="iconbtn lj-cb" data-a="go" data-v="lojaCart" aria-label="Sacola${ljCount()?', '+ljCount()+' itens':''}">${ic('bag',19,1.9)}${ljCount()?`<small>${ljCount()}</small>`:''}</button>`;
const ljScreen=(title,lede,body,right)=>({sb:'var(--ink)',tabs:null,amb:'home',html:`${subHead(title,lede,right)}<div class="pad stack g6 lj-body" style="padding-top:8px">${body}</div>`});
const ljBar=()=>ljCount()?`<button class="lj-bar" data-a="go" data-v="lojaCart"><span class="lj-bn">${ljCount()}</span><span class="grow">Ver sacola</span><b>${ljR(ljTotal())}</b>${ic('chevR',16,2.25)}</button>`:'';
const ljSt=o=>o.st==='cancelado'?ST2('mute','Cancelado'):o.st==='aguardando'?ST2('info','Aguardando pagamento'):o.st==='retirado'?ST2('mute','Retirado'):o.st==='pronto'?ST2('ok','Pronto para retirar'):ST2('warn','Separando');
V.loja=()=>{const q=ljNorm(S.lj.q),l=LJ_ITEMS.filter(x=>(S.lj.cat==='Todos'||ljCat(x.cat)[1]===S.lj.cat)&&(!q||ljNorm(x.n+' '+x.desc).includes(q))),open=S.orders.filter(o=>o.st!=='retirado'&&o.st!=='cancelado');
 return ljScreen('Loja','Livros, camisetas e acessórios da igreja. Pague pelo app e retire no domingo.',`
  ${open.length?`<button class="lj-ord" data-a="ljOrder" data-v="${open[0].id}"><span class="iconbox" style="${tone('lima')}">${ic('bag',20)}</span><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">Pedido #${open[0].id}</span><span class="it-sub">${open[0].st==='aguardando'?'Aguardando o pagamento do Pix':'Código de retirada '+open[0].code}</span></span>${ljSt(open[0])}</button>`:''}
  <label class="lj-search">${ic('search',18,2)}<input id="ljQ" type="search" placeholder="Buscar na loja" value="${esc(S.lj.q)}" autocomplete="off"></label>
  ${nxChips(['Todos',...LJ_CATS.map(c=>c[1])],S.lj.cat,'ljCat')}
  ${l.length?`<div class="lj-grid">${l.map(it=>{const n=ljInCart(it.id);return `<button class="lj-card ${it.stock===0?'off':''}" data-a="ljItem" data-v="${it.id}">${ljCover(it)}<span class="lj-cb2"><span class="lj-n">${esc(it.n)}</span><span class="lj-p">${ljR(it.price)}</span>${n?`<span class="lj-in">${ic('check',12,2.75)}${n} na sacola</span>`:''}</span></button>`;}).join('')}</div>`:'<p class="foot" style="text-align:center">Nada encontrado com esse filtro.</p>'}
  <button class="lj-mine" data-a="go" data-v="lojaOrders"><span class="grow">Meus pedidos</span><span class="foot">${S.orders.length}</span>${ic('chevR',16,2)}</button>
  ${ljBar()}`,ljCartBtn());};
function ljItemSheet(id){const it=ljIt(id);let size=it.sizes?null:'',q=1;
 const paint=sh=>{$('#ljQv',sh).textContent=q;$('#ljAdd',sh).innerHTML=it.stock===0?'Esgotado':'Adicionar · '+ljR(it.price*q);$('#ljMinus',sh).disabled=q<=1;$('#ljPlus',sh).disabled=q>=Math.min(it.stock,9);};
 sheet(`<div class="stack g5">${ljCover(it,'lg')}<div class="stack g2"><span class="eb2">${ljCat(it.cat)[1]}</span><h3 class="t2">${esc(it.n)}</h3><b class="lj-pp">${ljR(it.price)}</b><p class="callout" style="margin:0">${esc(it.desc)}</p></div>
  ${it.sizes?`<div class="stack g2"><span class="eb2">Tamanho</span><div class="row g2" id="ljSz">${it.sizes.map(z=>`<button type="button" class="chip" aria-pressed="false" data-v="${z}">${z}</button>`).join('')}</div><div class="otpmsg" id="ljErr" role="alert" style="min-height:0"></div></div>`:''}
  <div class="row between" style="align-items:center"><div class="stack" style="gap:2px"><span class="eb2">Quantidade</span><span class="foot">${it.stock===0?'Sem estoque no momento':it.stock<=5?'Restam '+it.stock+' unidades':'Em estoque'}</span></div><div class="lj-step"><button type="button" id="ljMinus" aria-label="Menos">${ic('minus',16,2.25)}</button><b id="ljQv">1</b><button type="button" id="ljPlus" aria-label="Mais">${ic('plus',16,2.25)}</button></div></div>
  <button type="button" class="btn primary block" id="ljAdd" ${it.stock===0?'disabled':''}></button></div>`,sh=>{paint(sh);
  const sz=$('#ljSz',sh);if(sz)sz.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;size=b.dataset.v;$$('#ljSz button',sh).forEach(z=>z.setAttribute('aria-pressed',z===b));$('#ljErr',sh).textContent='';});
  $('#ljMinus',sh).onclick=()=>{q=Math.max(1,q-1);paint(sh);};$('#ljPlus',sh).onclick=()=>{q=Math.min(it.stock,9,q+1);paint(sh);};
  $('#ljAdd',sh).onclick=async()=>{if(size===null){$('#ljErr',sh).textContent='Escolha o tamanho';return;}const ex=S.cart.find(x=>x.id===id&&x.size===size);if(ex)ex.q=Math.min(it.stock,ex.q+q);else S.cart.push({id,size,q});await closeSheet();softRender();toast('success','Na sacola',it.n+(size?' · '+size:'')+(q>1?' · '+q+' unidades':''));};});}
V.lojaCart=()=>{const t=ljTotal();
 return ljScreen('Sacola','',S.cart.length?`
  <div class="list">${S.cart.map((x,i)=>{const it=ljIt(x.id);return `<div class="item lj-ci">${ljCover(it,'sm')}<span class="grow stack" style="gap:3px;min-width:0"><span class="it-title" style="font-size:16px">${esc(it.n)}</span><span class="it-sub">${x.size?'Tamanho '+x.size+' · ':''}${ljR(it.price)}</span></span><div class="lj-step sm"><button type="button" data-a="ljQty" data-v="${i}|-1" aria-label="${x.q===1?'Tirar da sacola':'Menos'}">${ic(x.q===1?'trash':'minus',14,2.25)}</button><b>${x.q}</b><button type="button" data-a="ljQty" data-v="${i}|1" aria-label="Mais" ${x.q>=Math.min(it.stock,9)?'disabled':''}>${ic('plus',14,2.25)}</button></div></div>`;}).join('')}</div>
  <section class="stack g3"><p class="eb2">Retirada</p><div class="card row g3" style="padding:16px;border-radius:var(--r-md);align-items:flex-start"><span class="iconbox" style="${tone('menta')}">${ic('pin',20)}</span><span class="grow stack" style="gap:2px"><span class="it-title" style="font-size:16px">Loja · ${esc((S.church&&S.church.name)||'Alva Sede')}</span><span class="it-sub">Domingos, das 9h às 13h. Mostre o código do pedido no balcão.</span></span></div></section>
  <section class="stack g3"><p class="eb2">Pagamento</p><div class="lj-pay" role="radiogroup">${[['pix','Pix','qr','Aprovação na hora'],['card','Cartão de crédito','card','Visa final 4242']].map(([k,l,i,sub])=>`<button type="button" role="radio" aria-checked="${S.lj.pay===k}" data-a="ljPay" data-v="${k}">${ic(i,20,1.9)}<span class="grow stack" style="gap:1px;align-items:flex-start"><b>${l}</b><small>${sub}</small></span><i class="lj-rd"></i></button>`).join('')}</div></section>
  <div class="kv"><div class="kr"><span>Subtotal · ${ljCount()} ${ljCount()>1?'itens':'item'}</span><span>${ljR(t)}</span></div><div class="kr"><span>Retirada</span><span>Grátis</span></div><div class="kr"><span style="color:var(--ink);font-weight:600">Total</span><span>${ljR(t)}</span></div></div>
  <button class="btn primary block" data-a="ljCheckout">${S.lj.pay==='pix'?'Pagar com Pix':'Pagar com cartão'} · ${ljR(t)}</button>`
  :`<div class="card" style="padding:32px 18px;border-radius:var(--r-lg);text-align:center"><span class="iconbox" style="${tone('ceu')};margin:0 auto 10px">${ic('bag',22)}</span><p class="it-title" style="justify-content:center">Sua sacola está vazia</p><p class="foot" style="margin:4px 0 16px">Escolha algo na loja para continuar.</p><button class="btn secondary md" data-a="back">Voltar para a loja</button></div>`);};
function ljPlace(){const code=Math.random().toString(36).slice(2,6).toUpperCase(),id='A'+(1030+S.orders.length);
 S.orders.unshift({id,code,d:'Hoje',items:S.cart.map(x=>({...x})),total:ljTotal(),pay:S.lj.pay==='pix'?'Pix':'Cartão final 4242',st:'separando'});
 S.cart.forEach(x=>{const it=ljIt(x.id);it.stock=Math.max(0,it.stock-x.q);});S.cart=[];S.ljLast=id;go('lojaOk',{replace:false});}
V.lojaOk=()=>{const o=S.orders.find(x=>x.id===S.ljLast);
 return {sb:'var(--ink)',tabs:null,amb:'home',html:`<div class="pad stack g6 lj-ok"><span class="lj-okc">${ic('check',34,2.5)}</span><div class="stack g2" style="text-align:center"><h1 class="t1">Pedido confirmado</h1><p class="callout" style="margin:0">Pagamento aprovado via ${o.pay}. Avisamos quando estiver separado.</p></div>
  <div class="lj-code"><span class="eb2">Código de retirada</span><b>${o.code}</b><span class="foot">Pedido #${o.id} · mostre no balcão da loja</span></div>
  <div class="list">${o.items.map(x=>{const it=ljIt(x.id);return `<div class="item" style="cursor:default"><span class="grow it-title" style="font-size:15.5px">${x.q}× ${esc(it.n)}${x.size?' · '+x.size:''}</span><span class="it-sub">${ljR(it.price*x.q)}</span></div>`;}).join('')}<div class="item" style="cursor:default"><span class="grow it-title" style="font-size:15.5px">Total</span><b>${ljR(o.total)}</b></div></div>
  <div class="stack g3"><button class="btn primary block" data-a="ljDone">Voltar para a loja</button><button class="tlink" data-a="ljGoOrders">Ver meus pedidos</button></div></div>`};};
V.lojaOrders=()=>ljScreen('Meus pedidos','Compras feitas pelo app.',`<div class="list">${S.orders.map(o=>`<button class="item" data-a="ljOrder" data-v="${o.id}"><span class="grow stack" style="gap:3px"><span class="it-title" style="font-size:16px">Pedido #${o.id}</span><span class="it-sub">${o.d} · ${o.items.reduce((a,x)=>a+x.q,0)} ${o.items.reduce((a,x)=>a+x.q,0)>1?'itens':'item'} · ${ljR(o.total)}</span></span>${ljSt(o)}</button>`).join('')||'<p class="foot" style="padding:16px">Nenhum pedido ainda.</p>'}</div>`);
function ljPixOrder(){const code=Math.random().toString(36).slice(2,6).toUpperCase(),id='A'+(1030+S.orders.length);
 S.orders.unshift({id,code,d:'Hoje',items:S.cart.map(x=>({...x})),total:ljTotal(),pay:'Pix',st:'aguardando'});S.cart=[];S.ljLast=id;softRender();ljPixSheet(id);}
function ljConfirmPix(id){const o=S.orders.find(x=>x.id===id);if(!o||o.st!=='aguardando')return;o.st='separando';o.items.forEach(x=>{const it=ljIt(x.id);it.stock=Math.max(0,it.stock-x.q);});S.ljLast=id;go('lojaOk',{replace:false});}
function ljCancelOrder(id){const o=S.orders.find(x=>x.id===id);if(!o||o.st!=='aguardando')return;o.st='cancelado';softRender();toast('info','Pedido cancelado','Nada foi cobrado. Você pode fazer um novo pedido quando quiser.');}
function ljPixSheet(id){const o=S.orders.find(x=>x.id===id),cells=Array.from({length:441},(_,i)=>{const x=i%21,y=Math.floor(i/21),f=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);const edge=f&&(x%14===0||x%14===6||y%14===0||y%14===6||(x%14>=2&&x%14<=4&&y%14>=2&&y%14<=4));return f?(edge?1:0):((x*7+y*13+x*y)%5<2?1:0);});
 sheet(`<div class="stack g5"><div class="row between" style="align-items:center"><h3 class="t2">Pagar com Pix</h3>${ljSt(o)}</div><p class="callout">${ljR(o.total)} · o pedido #${o.id} é confirmado assim que o pagamento cair.</p>
  <div class="lj-qr" aria-label="QR code do Pix (demonstração)">${cells.map(c=>`<i${c?' class="on"':''}></i>`).join('')}</div>
  <button type="button" class="btn secondary block" data-a="copy" data-v="00020126alva-pix-demo">Copiar código Pix</button>
  <div class="stack g3"><button type="button" class="btn primary block" id="ljPaid">Já paguei</button><button type="button" class="btn secondary block" id="ljCancel">Cancelar pedido</button><button type="button" class="tlink" data-a="closeSheet">Pagar depois</button></div></div>`,sh=>{$('#ljPaid',sh).addEventListener('click',async e=>{await busy(e.currentTarget,900,null,'Pagamento recebido');await closeSheet();ljConfirmPix(id);});$('#ljCancel',sh).addEventListener('click',async()=>{await closeSheet();ljCancelOrder(id);});});}
function ljCardSheet(){const t=ljTotal();
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pagar com cartão</h3><p class="callout">${ljR(t)} à vista.</p></div>
  <div class="lj-cardv">${ic('card',22,1.9)}<span class="grow stack" style="gap:1px"><b>Visa final 4242</b><small>Cartão salvo na sua conta</small></span>${ST2('ok','Padrão')}</div>
  <div class="stack g3"><button type="button" class="btn primary block" id="ljCardGo">Pagar ${ljR(t)}</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#ljCardGo',sh).addEventListener('click',async e=>{await busy(e.currentTarget,900,null,'Aprovado');await closeSheet();ljPlace();});});}
Object.assign(A,{
 loja:()=>{ensureChurch();go('loja');},
 ljCat:v=>{S.lj.cat=v;softRender();},
 ljItem:v=>ljItemSheet(v),
 ljQty:v=>{const [i,d]=v.split('|').map(Number),x=S.cart[i];if(!x)return;x.q+=d;if(x.q<=0)S.cart.splice(i,1);softRender();},
 ljPay:v=>{S.lj.pay=v;softRender();},
 ljCheckout:()=>{if(!S.cart.length)return;S.lj.pay==='pix'?ljPixOrder():ljCardSheet();},
 ljDone:()=>{S.hist=S.hist.filter(h=>!['lojaCart','lojaOk'].includes(h));S.screen='loja';render('back');},
 ljGoOrders:()=>{S.hist=S.hist.filter(h=>!['lojaCart','lojaOk'].includes(h));go('lojaOrders');},
 ljOrder:v=>{const o=S.orders.find(x=>x.id===v);sheet(`<div class="stack g5"><div class="row between" style="align-items:center"><h3 class="t2">Pedido #${o.id}</h3>${ljSt(o)}</div>${o.st==='aguardando'?`<p class="callout" style="margin:0">Falta pagar o Pix. O código de retirada aparece quando o pagamento cair.</p>`:o.code&&o.st!=='retirado'&&o.st!=='cancelado'?`<div class="lj-code"><span class="eb2">Código de retirada</span><b>${o.code}</b></div>`:''}<div class="kv">${o.items.map(x=>{const it=ljIt(x.id);return `<div class="kr"><span>${x.q}× ${esc(it.n)}${x.size?' · '+x.size:''}</span><span>${ljR(it.price*x.q)}</span></div>`;}).join('')}<div class="kr"><span>Pagamento</span><span>${o.pay}</span></div><div class="kr"><span style="color:var(--ink);font-weight:600">Total</span><span>${ljR(o.total)}</span></div></div><p class="foot" style="margin:0">Retirada na loja da igreja, domingos das 9h às 13h.</p>${o.st==='aguardando'?`<button class="btn primary block" data-a="ljPixAgain" data-v="${o.id}">Pagar com Pix</button><button class="btn secondary block" data-a="ljCancelOrder" data-v="${o.id}">Cancelar pedido</button>`:''}<button class="btn secondary block" data-a="closeSheet">Fechar</button></div>`);},
 ljPixAgain:async v=>{await closeSheet();ljPixSheet(v);},
 ljCancelOrder:async v=>{await closeSheet();ljCancelOrder(v);}});
document.addEventListener('input',e=>{if(e.target.id!=='ljQ')return;S.lj.q=e.target.value;const pos=e.target.selectionStart;softRender();const i=document.getElementById('ljQ');if(i){i.focus();i.setSelectionRange(pos,pos);}});
{const oh=V.home;V.home=()=>{const r=oh();const card=`<button class="cta lj-home gr-mar" data-a="loja"><span class="lj-hi">${ic('bag',22,1.9)}</span><div><h3>Loja da igreja</h3><p>Livros, camisetas e acessórios. Pague pelo app e retire no domingo.</p></div><span class="btn onmedia md">Ver loja${ljCount()?' · '+ljCount():''}</span></button>`;
 const k=r.html.indexOf('<div class="card row g3" style="padding:16px;border-radius:var(--r-md)"><span class="iconbox" style="'+tone('salvia')+'">');
 if(k>0)r.html=r.html.slice(0,k)+card+r.html.slice(k);return r;};}
SUBS.push('loja','lojaCart','lojaOk','lojaOrders');RAIL.push(['loja','Início › Loja'],['lojaCart','Início › Loja › Sacola']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');


