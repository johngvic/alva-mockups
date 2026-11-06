/* ================= Inscrições: ingresso, compras adicionais e um QR por código ================= */
{const O=S.insc.open,byId=id=>O.find(e=>e.id===id);
 Object.assign(byId('i1'),{checkin:'inteiro',periods:[],items:[],vouchers:[],tickets:[{id:'t1',n:'Inscrição',desc:'Entrada gratuita.',price:0,incl:[],per:[]}]});
 Object.assign(byId('i2'),{when:'Sex, 9 out',checkin:'inteiro',periods:[],items:[],vouchers:[],tickets:[{id:'t1',n:'Ingresso',desc:'Entrada na conferência.',price:60,incl:[],per:[]}]});
 Object.assign(byId('i3'),{when:'Sáb e dom, 17 e 18 out',price:120,left:12,checkin:'periodo',periods:['Sábado','Domingo'],
  items:[{id:'a1',n:'Almoço',p:'Sábado',price:25},{id:'a2',n:'Almoço',p:'Domingo',price:25}],vouchers:[{code:'RETIRO10',disc:20}],
  tickets:[{id:'t1',n:'Participante',desc:'Hospedagem e programação do retiro.',price:120,incl:[],per:[]},{id:'t2',n:'Participante + almoços',desc:'Programação e os dois almoços.',price:160,incl:['a1','a2'],per:[]}]});
 O.push({id:'i4',t:'Conferência de Mulheres',when:'Sáb, 14 nov',price:80,left:260,g:'vinho',checkin:'inteiro',periods:[],
  items:[{id:'c1',n:'Café da manhã',p:'',price:15},{id:'c2',n:'Almoço',p:'',price:35},{id:'c3',n:'Kit de boas-vindas',p:'',price:20}],vouchers:[{code:'MULHERES10',disc:10},{code:'AMIGA15',type:'pct',disc:15}],
  tickets:[{id:'t1',n:'Normal',desc:'Entrada na conferência.',price:80,incl:[],per:[]},{id:'t2',n:'Com café',desc:'Entrada e café da manhã.',price:95,incl:['c1'],per:[]},{id:'t3',n:'Com café e almoço',desc:'Entrada, café da manhã e almoço.',price:125,incl:['c1','c2'],per:[]},{id:'t4',n:'VIP',desc:'Lugar na frente, café, almoço e kit.',price:180,incl:['c1','c2','c3'],per:[],left:40}]});
}
const rgEv=id=>S.insc.open.find(e=>e.id===id);
const rgTkOf=(e,id)=>e.tickets.find(t=>t.id===id)||e.tickets[0];
const rgItOf=(e,id)=>e.items.find(i=>i.id===id);
const rgFrom=e=>Math.min(...e.tickets.map(t=>t.price));
const rgSlug=t=>String(t).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'').toUpperCase();
const rgLbl=i=>i.n+(i.p?' · '+i.p:'');
function rgNorm(m){const e=rgEv(m.id);if(!m.rid)m.rid='r'+m.id;if(!m.tk)m.tk=e.tickets[0].id;m.buy=m.buy||[];m.ck=m.ck||{};if(m.total==null)m.total=rgTkOf(e,m.tk).price;return m;}
/* códigos de uma inscrição: acesso, itens inclusos e compras */
function rgCodes(m){
 const e=rgEv(m.id),tk=rgTkOf(e,m.tk),num=String(400+S.insc.open.indexOf(e)*37+7);
 const ps=tk.per&&tk.per.length?e.periods.filter(p=>tk.per.includes(p)):e.periods;
 const acc=e.checkin==='inteiro'?[{k:'geral',n:'Entrada geral',tag:'Acesso',code:`ALVA-${num}-ACESSO-GERAL`}]:e.checkin==='periodo'?ps.map(p=>({k:'p:'+p,n:'Entrada · '+p,tag:'Acesso',code:`ALVA-${num}-${rgSlug(p)}`})):[];
 const inc=tk.incl.map(id=>rgItOf(e,id)).filter(Boolean).map(i=>({k:'inc:'+i.id,n:rgLbl(i),tag:'Incluso',code:`ALVA-${num}-${rgSlug(rgLbl(i))}-INC`}));
 const seen={},buy=m.buy.map(id=>rgItOf(e,id)).filter(Boolean).map(i=>{const n=seen[i.id]=(seen[i.id]||0)+1;return {k:'i:'+i.id+(n>1?'#'+n:''),n:rgLbl(i),tag:'Compra',code:`ALVA-${num}-${rgSlug(rgLbl(i))}${n>1?'-'+n:''}`};});
 return e.checkin==='off'?[]:[...acc,...inc,...buy];
}
const rgSt=m=>m.st==='cancelada'?ST2('mute','Cancelada'):m.st==='ok'?ST2('ok','Confirmada'):ST2('warn','Aguardando pagamento');
/* uma inscrição é uma compra: pode ter vários ingressos; o primeiro é da própria pessoa */
const rgTks=m=>[{n:0,id:m.id,tk:m.tk,buy:m.buy||[],ck:m.ck,who:'Você'},...(m.more||[]).map((x,i)=>({n:i+1,id:m.id,tk:x.tk,buy:[],ck:x.ck||(x.ck={}),who:x.who}))];
const rgActive=m=>m.st!=='cancelada';
const rgPayTxt=m=>m.st==='cancelada'?(m.refund==='solicitado'?'Reembolso solicitado':m.refund==='reembolsado'?'Reembolsado':'Sem cobrança'):m.st==='ok'?(m.total?'Pago · '+m.method:'Gratuito'):'Aguardando · '+m.method;
/* cálculo da inscrição em andamento */
function vDiscM(v,price){return v.type==='pct'?Math.min(price,Math.round(price*v.disc)/100):Math.min(price,v.disc);}
function rgCalc(){
 const g=S.rg,e=rgEv(g.ev),units=[];e.tickets.forEach(t=>{for(let k=0;k<(g.q[t.id]||0);k++)units.push(t);});
 const t=units[0]||rgTkOf(e,g.tk),vc=g.vc?(e.vouchers||[]).find(v=>v.code===g.vc):null,tkTot=units.reduce((a,x)=>a+x.price,0),disc=vc?vDiscM(vc,tkTot):0;
 const adds=[];e.items.forEach(i=>{for(let k=0;k<(g.bq[i.id]||0);k++)adds.push(i);});
 const add=adds.reduce((a,i)=>a+i.price,0);
 return {e,t,units,nT:units.length,tkTot,vc,disc,adds,add,total:tkTot-disc+add};
}
/* quantidade de ingresso e de compra adicional, como num carrinho comum */
const rgStep=(k,id,q,mx,dis)=>`<div class="lj-step sm"><button type="button" data-a="rgQ" data-v="${k}|${id}|-1" ${q<=0||dis?'disabled':''} aria-label="Menos">${ic('minus',14,2.25)}</button><b>${q}</b><button type="button" data-a="rgQ" data-v="${k}|${id}|1" ${q>=mx||dis?'disabled':''} aria-label="Mais">${ic('plus',14,2.25)}</button></div>`;
const rgFull=t=>t.left===0;

V.inscricoes=()=>{const I_=S.insc;I_.mine.forEach(rgNorm);const mineIds=I_.mine.filter(rgActive).map(m=>m.id);
 const open=I_.open.filter(e=>!mineIds.includes(e.id));
 /* pedido de batismo ou apresentação aceito vira inscrição (EVT-P-11): aparece aqui e continua em Seus pedidos */
 const cer=[...S.bat.pedidos.filter(p=>p.st==='confirmado').map(p=>({go:'batismo',t:'Batismo',s:p.n+' · '+p.when})),...S.apb.pedidos.filter(p=>p.st==='confirmado').map(p=>({go:'bebes',t:'Apresentação de bebê',s:p.bebe+' · '+p.when}))];
 return sub('Inscrições','',`
  <section class="stack g3"><p class="eb2">Eventos abertos</p>${open.map(e=>{const from=rgFrom(e),multi=e.tickets.length>1;return `<article class="card" style="overflow:hidden"><div class="gr-${e.g}" style="height:10px"></div><div class="stack g3" style="padding:16px 18px 18px"><div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="t3">${e.t}</span><span class="it-sub">${e.when} · ${from?(multi?'a partir de ':'')+brl(from):'Gratuito'}</span></div>${e.left<20?status('warning',e.left+' vagas'):''}</div>${multi||e.items.length?`<p class="it-sub" style="margin:0">${multi?e.tickets.length+' tipos de ingresso':''}${multi&&e.items.length?' · ':''}${e.items.length?'compras adicionais':''}</p>`:''}<button class="btn primary md block ${from?'split':''}" data-a="inscrever" data-v="${e.id}">${from?`<span>Inscrever-se</span><span class="meta">${multi?'a partir de ':''}${brl(from)}</span>`:'Inscrever-se'}</button></div></article>`;}).join('')||'<p class="callout">Você já está inscrito em todos os eventos abertos.</p>'}
   <p class="foot" style="margin:0">Em eventos pagos, a inscrição confirma quando o pagamento cai.</p></section>
  <section class="stack g3"><p class="eb2">Minhas inscrições</p>${I_.mine.length||cer.length?`<div class="list">${I_.mine.map(m=>{const e=rgEv(m.id),n=rgTks(m).length;return `<button class="item" data-a="rgOpen" data-v="${m.rid}"><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${e.t}</span><span class="it-sub">${e.when}</span><span class="it-sub">${n} ${n===1?'ingresso':'ingressos'}${m.buy.length?' · +'+m.buy.length+(m.buy.length===1?' compra':' compras'):''}${m.total?' · '+brl(m.total):''}</span></span>${rgSt(m)}${ic('chevR',16,2.25)}</button>`;}).join('')}${cer.map(c=>`<button class="item" data-a="sub" data-v="${c.go}"><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${c.t}</span><span class="it-sub">${esc(c.s)}</span></span>${status('success','Pedido aceito')}${ic('chevR',16,2.25)}</button>`).join('')}</div>`:`<p class="callout" style="margin:0">Você ainda não tem inscrição em nenhum evento.</p>`}</section>`);};

/* escolha de ingresso, compras e pagamento */
V.inscCheckout=()=>{const c=rgCalc(),g=S.rg,{e}=c,tks=e.tickets;
 return {sb:'var(--ink)',tabs:null,amb:'home',html:`${subHead(e.t,e.when)}<div class="pad stack g6" style="padding-top:8px">
  <section class="stack g3"><p class="eb2">Ingressos</p><div class="rg-qs">${tks.map(x=>{const q=g.q[x.id]||0,mx=x.left?Math.min(x.left,10):10;return `<div class="rg-q ${q?'on':''} ${rgFull(x)?'off':''}"><span class="grow stack" style="gap:2px;align-items:flex-start"><b>${esc(x.n)}</b><small>${rgFull(x)?'Esgotado':esc(x.desc)}</small>${x.incl.length?`<small class="rg-inc">Inclui ${x.incl.map(id=>esc(rgLbl(rgItOf(e,id)))).join(', ')}</small>`:''}${x.left&&x.left<=40?`<small class="rg-inc">Restam ${x.left}</small>`:''}</span><b class="rg-pr">${x.price?brl(x.price):'Grátis'}</b>${rgStep('t',x.id,q,mx,rgFull(x))}</div>`;}).join('')}</div></section>
  ${e.items.length?`<section class="stack g3"><p class="eb2">Compras adicionais <span class="rg-opt">opcional</span></p><div class="rg-qs">${e.items.map(i=>{const q=g.bq[i.id]||0,inc=c.units.some(u=>u.incl.includes(i.id));return `<div class="rg-q ${q?'on':''}"><span class="grow stack" style="gap:1px;align-items:flex-start"><b>${esc(i.n)}</b><small>${esc(i.p||'Evento inteiro')}</small>${inc?`<small class="rg-inc">Já vem em um dos seus ingressos; compre mais se quiser</small>`:''}</span><b class="rg-pr">${brl(i.price)}</b>${rgStep('i',i.id,q,10,false)}</div>`;}).join('')}</div></section>`:''}
  ${c.tkTot&&(e.vouchers||[]).length?`<section class="stack g3"><p class="eb2">Voucher <span class="rg-opt">opcional</span></p>${c.vc?`<div class="card row g3 rg-vcok" style="padding:12px 16px;border-radius:var(--r-md);align-items:center"><span class="iconbox" style="${tone('menta')}">${ic('ticket',18)}</span><span class="grow stack" style="gap:1px"><b class="mask">${esc(c.vc.code)}</b><span class="it-sub">− ${brl(c.disc)} na compra</span></span><button type="button" class="tlink" data-a="rgVcClear">Remover</button></div>`:`<div class="rg-vcf"><input id="rgVc" placeholder="Código do voucher" value="${esc(g.vcTxt||'')}" autocomplete="off" autocapitalize="characters"><button type="button" class="btn secondary md" data-a="rgVcApply">Aplicar</button></div>`}</section>`:''}
  ${c.total?`<section class="stack g3"><p class="eb2">Pagamento</p><div class="lj-pay" role="radiogroup">${[['pix','Pix','qr','Aprovação na hora'],['card','Cartão de crédito','card','Visa final 4242']].map(([k,l,i,sub])=>`<button type="button" role="radio" aria-checked="${g.pay===k}" data-a="rgPayM" data-v="${k}">${ic(i,20,1.9)}<span class="grow stack" style="gap:1px;align-items:flex-start"><b>${l}</b><small>${sub}</small></span><i class="lj-rd"></i></button>`).join('')}</div></section>`:''}
  <div class="kv">${tks.filter(x=>g.q[x.id]).map(x=>`<div class="kr"><span>${g.q[x.id]} × ${esc(x.n)}</span><span>${x.price?brl(x.price*g.q[x.id]):'Grátis'}</span></div>`).join('')}${c.disc?`<div class="kr"><span>Voucher ${esc(c.vc.code)}</span><span>− ${brl(c.disc)}</span></div>`:''}${c.add?`<div class="kr"><span>${c.adds.length} ${c.adds.length===1?'compra adicional':'compras adicionais'}</span><span>${brl(c.add)}</span></div>`:''}<div class="kr"><span style="color:var(--ink);font-weight:600">Total</span><span>${c.total?brl(c.total):'Grátis'}</span></div></div>
  <button class="btn primary block" data-a="rgGo" ${c.nT?'':'disabled'}>${!c.nT?'Escolha um ingresso':c.total?(g.pay==='pix'?'Pagar com Pix':'Pagar com cartão')+' · '+brl(c.total):'Confirmar inscrição'}</button>
  <p class="foot" style="margin:0">${c.total?'Sua vaga fica reservada por 30 minutos. Os códigos são liberados quando o pagamento confirmar.':'Seus códigos aparecem em Meus ingressos.'}</p></div>`};};

/* um ingresso: os códigos (QR) dele; a compra inteira fica na tela da inscrição */
V.ingresso=()=>{const m=S.insc.mine.find(x=>x.rid===S.tkReg);if(!m)return sub('Ingresso','','<p class="callout">Ingresso não encontrado.</p>');rgNorm(m);
 const l=rgTks(m),tt=l[S.tkN||0]||l[0],e=rgEv(m.id),tk=rgTkOf(e,tt.tk),codes=rgCodes(tt),locked=m.st!=='ok';
 return sub(e.t,e.when+' · '+tk.n,`
  ${locked?`<div class="svc-note"><span>${ic('alert',16,2)}</span><div><b>${m.st==='cancelada'?'Inscrição cancelada':'Aguardando pagamento'}</b><span>${m.st==='cancelada'?'Estes códigos não valem mais.':'Os códigos são liberados quando o '+(m.method||'pagamento')+' confirmar.'}</span></div></div>`:''}
  <div class="kv"><div class="kr"><span>Ingresso</span><span>${esc(tk.n)}</span></div><div class="kr"><span>Titular</span><span>${esc(tt.who)}</span></div>${tt.buy.length?`<div class="kr stack2"><span>Compras adicionais</span><span>${tt.buy.map(id=>esc(rgLbl(rgItOf(e,id)))).join(', ')}</span></div>`:''}</div>
  ${codes.length?`<section class="stack g4"><p class="eb2">${codes.length} ${codes.length===1?'código':'códigos'} · mostre cada um no momento certo</p>${codes.map(c=>{const at=tt.ck[c.k];return `<article class="card rg-code ${at?'used':''} ${locked?'locked':''}"><div class="row between g3" style="align-items:flex-start"><div class="stack" style="gap:2px"><span class="it-title" style="font-size:16px">${esc(c.n)}</span><span class="it-sub">${c.tag==='Acesso'?'Entrada':c.tag==='Incluso'?'Incluso no ingresso':'Compra adicional'}</span></div>${at?ST2('mute','Usado às '+at):locked?ST2('warn','Bloqueado'):ST2('ok','Válido')}</div>
   <div class="qr rgq">${locked?`<span class="rg-lock">${ic('lock',28,1.9)}</span>`:qrSVG(c.code)}</div><p class="mask" style="margin:0;text-align:center">${c.code}</p></article>`;}).join('')}
   <p class="foot" style="margin:0">A equipe confirma a entrada lendo o QR no app do VEM. Os códigos funcionam sem internet.</p>
   ${locked?'':`<button type="button" class="tlink" data-a="rgSim">Demonstração: simular leitura do QR</button>`}</section>`:`<div class="card" style="padding:20px 18px;border-radius:var(--r-lg)"><p class="it-title">Inscrição confirmada</p><p class="foot" style="margin:4px 0 0">Este evento não tem controle de entrada por QR.</p></div>`}
  <button type="button" class="tlink" data-a="rgToCompra">Ver a inscrição completa</button>`);};

/* a inscrição (compra): ingressos, itens, pagamento e cancelamento da compra inteira */
V.compra=()=>{const m=S.insc.mine.find(x=>x.rid===S.tkReg);if(!m)return sub('Inscrição','','<p class="callout">Inscrição não encontrada.</p>');rgNorm(m);
 const e=rgEv(m.id),l=rgTks(m),canc=m.st==='cancelada',wait=m.st==='wait',used=l.some(x=>Object.keys(x.ck).length),paid=m.st==='ok'&&m.total>0;
 return sub(e.t,e.when,`
  ${canc?`<div class="svc-note"><span>${ic('x',16,2)}</span><div><b>Inscrição cancelada</b><span>${m.refund==='solicitado'?'Reembolso de '+brl(m.total)+' solicitado ao provedor. Ele volta pelo mesmo meio de pagamento.':m.refund==='reembolsado'?'Reembolso de '+brl(m.total)+' concluído.':'Nada foi cobrado.'}</span></div></div>`:wait?`<div class="svc-note"><span>${ic('alert',16,2)}</span><div><b>Aguardando pagamento</b><span>Os códigos são liberados quando o ${m.method||'pagamento'} confirmar.</span></div></div>`:''}
  <section class="stack g3"><p class="eb2">${l.length} ${l.length===1?'ingresso':'ingressos'}</p><div class="list">${l.map((x,i)=>{const tk=rgTkOf(e,x.tk),n=rgCodes(x).length,u=Object.keys(x.ck).length;return `<button class="item" data-a="rgTkOpen" data-v="${i}" ${canc?'disabled':''}><span class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${esc(tk.n)}</span><span class="it-sub">${esc(x.who)}${n?' · '+n+(n===1?' código':' códigos'):''}</span></span>${canc?'':u?ST2('mute','Usado'):wait?ST2('warn','Bloqueado'):n?ST2('ok','Ver código'):''}${canc?'':ic('chevR',16,2.25)}</button>`;}).join('')}</div></section>
  ${m.buy.length?`<section class="stack g3"><p class="eb2">Compras adicionais</p><div class="kv">${m.buy.map(id=>{const i=rgItOf(e,id);return `<div class="kr"><span>${esc(rgLbl(i))}</span><span>${brl(i.price)}</span></div>`;}).join('')}</div></section>`:''}
  <div class="kv"><div class="kr"><span>Pagamento</span><span>${rgPayTxt(m)}</span></div>${m.vch?`<div class="kr"><span>Voucher</span><span class="mask">${esc(m.vch)}</span></div>`:''}<div class="kr"><span style="color:var(--ink);font-weight:600">Total</span><span>${m.total?brl(m.total):'Grátis'}</span></div></div>
  ${canc?'':used?`<p class="foot" style="margin:0">Já houve check-in em um dos ingressos, então a inscrição não pode mais ser cancelada.</p>`:`<div class="stack g2"><button type="button" class="btn outline block" data-a="rgCancel">Cancelar compra</button><p class="foot" style="margin:0">O cancelamento é da compra inteira, com todos os ingressos${m.buy.length?' e as compras adicionais':''}.</p></div>`}`);};

/* pagamento simulado */
function rgPaySheet(total,kind,onPaid){
 if(kind==='card'){sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pagar com cartão</h3><p class="callout">${brl(total)} à vista.</p></div><div class="lj-cardv">${ic('card',22,1.9)}<span class="grow stack" style="gap:1px"><b>Visa final 4242</b><small>Cartão salvo na sua conta</small></span>${ST2('ok','Padrão')}</div><div class="stack g3"><button type="button" class="btn primary block" id="rgPaid">Pagar ${brl(total)}</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#rgPaid',sh).addEventListener('click',async e=>{await busy(e.currentTarget,900,null,'Aprovado');await closeSheet();onPaid();});});return;}
 const cells=Array.from({length:441},(_,i)=>{const x=i%21,y=Math.floor(i/21),f=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);const edge=f&&(x%14===0||x%14===6||y%14===0||y%14===6||(x%14>=2&&x%14<=4&&y%14>=2&&y%14<=4));return f?(edge?1:0):((x*7+y*13+x*y)%5<2?1:0);});
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pagar com Pix</h3><p class="callout">${brl(total)} · a inscrição confirma assim que o pagamento cair.</p></div><div class="lj-qr" aria-label="QR code do Pix (demonstração)">${cells.map(c=>`<i${c?' class="on"':''}></i>`).join('')}</div><button type="button" class="btn secondary block" data-a="copy" data-v="00020126alva-pix-demo">Copiar código Pix</button><div class="stack g3"><button type="button" class="btn primary block" id="rgPaid">Já paguei</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#rgPaid',sh).addEventListener('click',async e=>{await busy(e.currentTarget,900,null,'Reservado');await closeSheet();onPaid();});});
}
function rgPlace(){
 const c=rgCalc(),g=S.rg,e=c.e,u=c.units,rec={id:e.id,rid:'r'+Date.now(),st:c.total?'wait':'ok',method:c.total?(g.pay==='pix'?'Pix':'Cartão'):'-',tk:u[0].id,buy:c.adds.map(i=>i.id),vch:c.vc?c.vc.code:'',total:c.total,ck:{},more:u.slice(1).map(t=>({tk:t.id,who:'A definir',ck:{}}))};
 S.insc.mine.push(rec);e.left=Math.max(0,e.left-u.length);u.forEach(t=>{if(t.left)t.left=Math.max(0,t.left-1);});S.tkReg=rec.rid;S.screen='compra';$('#overlay').innerHTML='';render();
 if(c.total){toast('info','Aguardando pagamento','Assim que o '+rec.method+' cair, seus códigos são liberados.');setTimeout(()=>{rec.st='ok';if(['ingresso','compra','inscricoes'].includes(S.screen))softRender();toast('success','Pagamento confirmado','Inscrição em '+e.t+' garantida.');},3500);}
 else toast('success','Inscrição confirmada','Seus ingressos estão em Mais › Inscrições.');
}
Object.assign(A,{
 inscrever:async(v,el)=>{const e=rgEv(v),t=e.tickets[0];
  if(e.tickets.length===1&&!t.price&&!e.items.length){await busy(el,700,null,'Inscrito');const rec={id:v,rid:'r'+v,st:'ok',method:'-',tk:t.id,buy:[],vch:'',total:0,ck:{}};S.insc.mine.push(rec);e.left=Math.max(0,e.left-1);S.tkReg=rec.rid;softRender();toast('success','Inscrição confirmada','Seus ingressos estão em Mais › Inscrições.');return;}
  const t0=(e.tickets.find(x=>!rgFull(x))||t).id;S.rg={ev:v,tk:t0,q:{[t0]:1},bq:{},vc:'',vcTxt:'',pay:'pix'};go('inscCheckout');},
 rgQ:v=>{const [k,id,d]=v.split('|'),g=S.rg,m=k==='t'?g.q:g.bq;m[id]=Math.max(0,(m[id]||0)+(+d));if(!m[id])delete m[id];softRender();},
 rgVcApply:()=>{const g=S.rg,e=rgEv(g.ev),code=(($('#rgVc')||{}).value||'').trim().toUpperCase();if(!code){toast('error','Digite o código','Informe o voucher que você recebeu.');return;}
  if(!(e.vouchers||[]).some(v=>v.code===code)){g.vcTxt=code;toast('error','Voucher não encontrado','Confira o código e tente de novo.');return;}
  g.vc=code;g.vcTxt='';softRender();toast('success','Voucher aplicado','O desconto já está no total.');},
 rgVcClear:()=>{S.rg.vc='';softRender();},
 rgPayM:v=>{S.rg.pay=v;softRender();},
 rgGo:()=>{const c=rgCalc();if(!c.total){rgPlace();return;}rgPaySheet(c.total,S.rg.pay,rgPlace);},
 rgOpen:v=>{S.tkReg=v;S.tkN=0;go('compra');},
 rgTkOpen:v=>{S.tkN=+v;go('ingresso');},
 rgToCompra:()=>{go('compra');},
 rgFromEv:async v=>{let m=S.insc.mine.find(x=>x.id===v&&rgActive(x));if(!m){const e=rgEv(v),tk=e.tickets[0];m={id:v,rid:'r'+v,st:'ok',method:'-',tk:tk.id,buy:[],vch:'',total:0,ck:{}};S.insc.mine.push(m);}S.tkReg=m.rid;await closeSheet();go('compra');},
 rgSim:()=>{const m=S.insc.mine.find(x=>x.rid===S.tkReg),tt=rgTks(m)[S.tkN||0],c=rgCodes(tt).find(x=>!tt.ck[x.k]);if(!c){toast('info','Todos os códigos já foram usados','');return;}tt.ck[c.k]=new Date().toTimeString().slice(0,5);softRender();toast('success','Leitura simulada',c.n+' marcado como usado.');},
 rgCancel:()=>{const m=S.insc.mine.find(x=>x.rid===S.tkReg),n=rgTks(m).length,pay=m.st==='ok'&&m.total>0;
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Cancelar a compra?</h3><p class="callout">Cancela a compra inteira: ${n} ${n===1?'ingresso':'ingressos'}${m.buy.length?' e as compras adicionais':''}. Não dá para cancelar só um ingresso.</p></div>
   ${pay?`<div class="kv"><div class="kr"><span>Política do evento</span><span>100% até 24 h antes</span></div><div class="kr"><span style="color:var(--ink);font-weight:600">Você recebe de volta</span><span>${brl(m.total)}</span></div></div><p class="foot" style="margin:0">O reembolso é pedido ao provedor e volta pelo mesmo meio de pagamento (${m.method}).</p>`:`<p class="foot" style="margin:0">${m.st==='ok'?'A inscrição é gratuita: só deixa de valer e a vaga é liberada.':'Como o pagamento ainda não caiu, nada será cobrado.'}</p>`}
   <div class="stack g3"><button type="button" class="btn primary block danger" id="rgCx">Cancelar compra</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{$('#rgCx',sh).addEventListener('click',async ev=>{await busy(ev.currentTarget,700,null,'Cancelada');
   m.st='cancelada';m.refund=pay?'solicitado':'';const e=rgEv(m.id);e.left+=1;if(m.id==='i1')S.rsvp.e11=false;await closeSheet();softRender();toast('info','Compra cancelada',pay?'Reembolso de '+brl(m.total)+' solicitado.':'Sua vaga foi liberada.');
   if(pay)setTimeout(()=>{m.refund='reembolsado';if(S.screen==='compra'||S.screen==='inscricoes')softRender();},4000);});});},
 showQR:v=>{const m=S.insc.mine.find(x=>x.id===v&&rgActive(x));if(m){S.tkReg=m.rid;go('compra');}},
});
document.addEventListener('input',e=>{if(e.target.id==='rgVc'&&S.rg)S.rg.vcTxt=e.target.value;});
S.rg=null;S.tkReg=null;
APP.push('inscCheckout','ingresso','compra');SUBS.push('inscCheckout','ingresso','compra');
[['inscricoes','Mais › Inscrições'],['inscCheckout','Mais › Inscrições › Ingresso'],['compra','Mais › Inscrições › Inscrição (compra)'],['ingresso','Mais › Inscrições › Ingresso']].forEach(r=>{if(!RAIL.some(x=>x[0]===r[0]))RAIL.push(r);});
$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
/* demonstração: duas inscrições já feitas */
S.insc.mine.push({id:'i3',rid:'r-i3',st:'ok',method:'Cartão',tk:'t2',buy:[],vch:'RETIRO10',total:140,ck:{}});
S.insc.mine.push({id:'i4',rid:'r-i4',st:'ok',method:'Pix',tk:'t3',buy:['c3'],vch:'',total:240,ck:{},more:[{tk:'t2',who:'Ana Lima',ck:{}}]});

showSplash();

