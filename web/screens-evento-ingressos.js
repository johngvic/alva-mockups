/* ================= Eventos: tipos de ingresso e compras adicionais ================= */
let _tkn=0;
function evMoney(e){return !!e.paid||(e.items||[]).some(i=>+i.price>0);}
function evEnsure(e){
 e.items=e.items||[];e.tickets=e.tickets||[];
 e.items.forEach(i=>{if(!i.id)i.id='it'+(++_tkn);});
 if(e.paid&&!e.tickets.length)e.tickets.push({id:'tk'+(++_tkn),n:'Inscrição',desc:'',price:+e.price||0,cap:0,incl:[],per:[],off:false});
 e.tickets.forEach(t=>{if(!t.id)t.id='tk'+(++_tkn);t.incl=t.incl||[];t.per=t.per||[];});
 evSync(e);return e;
}
function evSync(e){const act=(e.tickets||[]).filter(t=>!t.off);if(act.length)e.price=Math.min(...act.map(t=>+t.price||0));}
const tkPrice=(e,t)=>e.paid?(+t.price||0):0;
const tkSold=(e,t)=>e.regs.filter(r=>r.tk===t.id).length;
const tkFull=(e,t)=>!!t.cap&&tkSold(e,t)>=t.cap;
const tkOf=(e,r)=>(e.tickets||[]).find(t=>t.id===r.tk)||null;
const itById=(e,id)=>(e.items||[]).find(i=>i.id===id);
const itLabel=i=>i.n+(i.p?' · '+i.p:'');
const itSold=(e,it)=>e.regs.filter(r=>(r.buy||[]).includes(it.id)).length;
function buyOf(e,r){return (r.buy||[]).map(id=>itById(e,id)).filter(Boolean);}
function regTot(e,r){return (+r.val||0)+buyOf(e,r).reduce((a,i)=>a+(+i.price||0),0);}
function evTop(e){const p=(e.tickets||[]).map(t=>+t.price||0);return p.length?Math.max(...p):(+e.price||0);}
function evFromTxt(e){const act=(e.tickets||[]).filter(t=>!t.off);if(act.length>1){const m=Math.min(...act.map(t=>+t.price||0)),M=Math.max(...act.map(t=>+t.price||0));return m===M?brl(m):'a partir de '+brl(m);}return brl(e.price);}
function evMulti(e){return (e.tickets||[]).filter(t=>!t.off).length>1;}
function tkInclTxt(e,t){return (t.incl||[]).map(id=>itById(e,id)).filter(Boolean).map(itLabel);}

/* ---------- detalhe do evento ---------- */
evDet=function(e){
 evEnsure(e);
 const base=`<div class="pgrid"><div class="col">
  <section class="card pc evi"><div class="sh"><h2>Informações</h2><button class="btn sec sm" data-a="evEdit">${ic('pen',14)}Editar</button></div><div class="evi-g">${evInfoRows(e)}</div></section>`;
 if(e.st==='previsao')return base+`<section class="card pc"><div class="soft-empty"><p>Ainda é uma previsão.</p><span class="who">Inscrições, pagamento e check-in ficam disponíveis quando a data for confirmada.</span><button class="btn pri" data-a="evConfirm" data-v="${e.id}">Confirmar data</button></div></section></div><div class="col"></div></div>`;
 const tks=e.tickets,act=tks.filter(t=>!t.off);
 const tkCard=`<section class="card pc"><div class="sh"><h2>Ingressos</h2><button class="btn sec sm" data-a="tkNew">${ic('plus',14,2.2)}Novo ingresso</button></div>
  <p class="who" style="margin:-6px 0 12px">${tks.length?'Os tipos que a pessoa escolhe ao se inscrever.':'Hoje a inscrição é uma só. Crie tipos de ingresso se precisar separar, por exemplo, participante e equipe.'}</p>
  ${tks.length?`<div class="tg-list">${tks.map(t=>{const sold=tkSold(e,t),inc=tkInclTxt(e,t),pr=tkPrice(e,t);return `<div class="tg-r ${t.off?'off':''}" tabindex="0" data-a="tkEdit" data-v="${t.id}">
   <span class="tg-main"><span class="tg-t"><b>${esc(t.n)}</b>${t.off?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Vendas pausadas</span>':tkFull(e,t)?'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Esgotado</span>':''}</span>${t.desc?`<small>${esc(t.desc)}</small>`:''}
    ${inc.length||(t.per||[]).length?`<span class="tg-chips">${inc.map(x=>`<i>${ic('check',10,3)}${esc(x)}</i>`).join('')}${(t.per||[]).length?`<i class="per">${ic('calendar',10,2.4)}${esc(t.per.join(' + '))}</i>`:''}</span>`:''}</span>
   <span class="tg-pr"><b class="mono">${brl(pr)}</b><small>${sold}${t.cap?'/'+t.cap:''} ${sold===1?'inscrito':'inscritos'}</small>${t.cap?`<span class="tr"><i style="width:${Math.min(100,sold/t.cap*100)}%"></i></span>`:''}</span>
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="tkMenu" data-v="${t.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="tgPop-${t.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="tkEdit" data-v="${t.id}">${ic('pen',16)}Editar</button><button class="pi" data-a="tkPause" data-v="${t.id}">${ic(t.off?'check':'pause',16)}${t.off?'Retomar vendas':'Pausar vendas'}</button><hr><button class="pi danger" data-a="tkDel" data-v="${t.id}">${ic('x',16)}Excluir ingresso</button></div></div></span></div>`;}).join('')}</div>`:`<button class="btn sec" data-a="tkNew">${ic('plus',14,2.2)}Criar tipos de ingresso</button>`}
  ${e.paid&&!act.length?`<div class="rgwarn" style="margin-top:12px">${ic('alert',14,2)}Nenhum ingresso à venda. Retome ou crie um ingresso.</div>`:''}</section>`;
 const insc=`<section class="card pc"><div class="sh"><h2>Inscrição</h2></div>
   <div class="yn" style="max-width:280px" id="payG"><label><input type="radio" name="pay" value="0" ${!e.paid?'checked':''}><span>Gratuita</span></label><label><input type="radio" name="pay" value="1" ${e.paid?'checked':''}><span>Paga</span></label></div>
   ${e.paid?`<p class="hint" style="margin:12px 0 0">${ic('shield',13,2)} Pix e cartão. Taxas e repasse seguem a configuração de pagamentos da sua igreja no Alva.</p>`:''}</section>`;
 const its=e.items;
 const itCard=`<section class="card pc"><div class="sh"><h2>Compras adicionais</h2><span class="who">almoço, café, camiseta…</span></div>
   <p class="who" style="margin:-6px 0 12px">Itens que a pessoa pode comprar junto com o ingresso${e.checkin==='off'?'. Sem check-in, o item é cobrado mas não gera código':''}.</p>
   ${its.length?`<div class="eitems">${its.map(it=>{const n=itSold(e,it),inTk=e.tickets.filter(t=>t.incl.includes(it.id));return `<div class="eit ${it.off?'off':''}"><span><b>${esc(it.n)}</b><small>${it.p||'Evento inteiro'}${n?` · ${n} ${n===1?'comprou':'compraram'}`:''}${inTk.length?` · incluso em ${inTk.map(t=>esc(t.n)).join(', ')}`:''}${it.off?' · venda encerrada':''}</small></span><b class="mono">${brl(it.price)}</b><button class="ibtn sm" data-a="evItemDel" data-v="${it.id}" aria-label="${it.off?'Retomar':'Remover'}" title="${it.off?'Retomar venda':'Remover'}">${ic(it.off?'check':'x',14)}</button></div>`;}).join('')}</div>`:'<p class="who" style="margin:0 0 12px">Nenhum item ainda.</p>'}
   <form class="itF ${e.checkin==='periodo'&&e.periods.length?'wp':''}" id="itF2"><input name="n" placeholder="Ex.: Almoço" aria-label="Item" autocomplete="off"><span class="mpre sm"><em>R$</em><input name="p" type="number" min="1" step="0.01" placeholder="0" aria-label="Preço"></span>${e.checkin==='periodo'&&e.periods.length?`<span class="selw"><select name="per" aria-label="Vale para"><option value="">Evento inteiro</option>${e.periods.map(p=>`<option>${esc(p)}</option>`).join('')}</select>${ic('updown',13)}</span>`:''}<button class="btn sec sm" type="submit">${ic('plus',13,2.2)}Adicionar item</button></form></section>`;
 const ckCard=`<section class="card pc"><div class="sh"><h2>Check-in</h2></div><p class="who" style="margin:-6px 0 12px">Escolha de quem monta o evento, independe de ser gratuito ou pago. A entrada é confirmada pela equipe no app do VEM.</p>
   <div class="vis" id="ckG">${[['off','Desabilitado','Sem controle de entrada.'],['inteiro','Evento inteiro','Um código vale para o evento todo.'],['periodo','Por período','Um código por dia ou turno.']].map(o=>`<label><input type="radio" name="ck" value="${o[0]}" ${e.checkin===o[0]?'checked':''}><span><b>${o[1]}</b><small>${o[2]}</small></span></label>`).join('')}</div>
   ${e.checkin==='inteiro'?`<div class="fld ckc"><span class="fl">Código de acesso</span><div class="ccode"><span class="mono">${codeOf(e,'*')}</span><button class="btn sec sm" data-a="copy" data-v="${codeOf(e,'*')}">Copiar</button><button class="ibtn sm" data-a="ckRegen" data-v="*" aria-label="Gerar novo código" title="Gerar novo código">${ic('swap',14)}</button></div><span class="hint">Vale do início ao fim do evento. Use no totem ou no app de check-in.</span></div>`:''}
   ${e.checkin==='periodo'?`<div class="fld ckc"><span class="fl">Períodos <small>cada um gera seu próprio código</small></span>
    ${e.periods.length?`<div class="pers">${e.periods.map((p,i)=>`<div class="per"><span class="pn">${esc(p)}</span><span class="mono">${codeOf(e,p)}</span><button class="ibtn sm" data-a="copy" data-v="${codeOf(e,p)}" aria-label="Copiar código de ${esc(p)}" title="Copiar">${ic('clipboard',14)}</button><button class="ibtn sm" data-a="evPerDel" data-v="${i}" aria-label="Remover ${esc(p)}" title="Remover">${ic('x',14)}</button></div>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhum período ainda. Adicione o primeiro, ex.: Sábado.</p>'}
    <form class="perF" id="perF"><input placeholder="Ex.: Sábado" aria-label="Novo período" autocomplete="off"><button class="btn sec sm" type="submit">${ic('plus',13,2.2)}Adicionar período</button></form></div>`:''}</section>`;
 return base+tkCard.replace('<h2>Ingressos</h2>','<h2>Inscrição e ingressos</h2>').replace('</div>',`</div><div class="evpay"><div class="yn" id="payG"><label><input type="radio" name="pay" value="0" ${!e.paid?'checked':''}><span>Gratuita</span></label><label><input type="radio" name="pay" value="1" ${e.paid?'checked':''}><span>Paga</span></label></div><span class="evpay-h">${ic(e.paid?'shield':'check',14,2)}${e.paid?'Pix e cartão. Taxas e repasse seguem a configuração de pagamentos da igreja.':'Sem cobrança. A pessoa só confirma a inscrição.'}</span></div>`)+evFinDet(e)+`</div><div class="col">${ckCard}${itCard}${vemCard(e)}</div></div>`;
};

/* ---------- inscrições do evento ---------- */
evIns=function(e){
 evEnsure(e);const mny=evMoney(e),pd=e.regs.filter(r=>r.pay==='pago').length;
 const chips=e.tickets.length>1?`<div class="tg-sumbar">${e.tickets.map(t=>`<span><b>${tkSold(e,t)}</b> ${esc(t.n)}</span>`).join('')}</div>`:'';
 return `<section class="card mtab"><div class="tbar"><span class="who" style="margin-right:auto"><b style="color:var(--ink)">${e.regs.length}</b>${e.cap?` de ${e.cap} vagas`:' inscritos'}${mny?` · ${pd} pagos · ${brl(raised(e))}`:''}</span><button class="btn pri sm" data-a="evReg">${ic('plus',14,2.2)}Adicionar inscrição</button></div>${chips}
  ${e.regs.length?`<div class="trow rg thead"><span>Nome</span><span>Inscrição</span>${mny?'<span>Pagamento</span><span>Valor</span>':''}<span></span></div>${e.regs.map(r=>{const tk=tkOf(e,r),nb=buyOf(e,r).length,tot=regTot(e,r);return `<div class="trow rg ${mny?'':'free'} ${S.rgHi===r.id?'hi':''}" id="rg-${r.id}" tabindex="0" data-a="rgView" data-v="${r.id}" style="cursor:pointer"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span class="hn"><b>${esc(r.n)}</b>${tk&&e.tickets.length>1||nb?`<span class="tg-sub">${tk&&e.tickets.length>1?esc(tk.n):''}${nb?`${tk&&e.tickets.length>1?' · ':''}+${nb} ${nb===1?'compra':'compras'}`:''}</span>`:''}${r.vch?`<span class="mono vtag">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</span></span>
   <span class="rdt">${dBR(r.d)}</span>${mny?`<span class="ts">${r.pay==='pago'?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago</span>':r.pay==='pendente'?'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente</span>':'<span class="soft">Gratuita</span>'}</span><span class="rv mono">${r.pay==='—'?'—':tot?brl(tot):'Bolsa'}</span>`:''}
   <span class="hact"><div style="position:relative"><button class="ibtn sm" data-a="rgMenu" data-v="${r.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="rgPop-${r.id}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="rgView" data-v="${r.id}">${ic('eye',16)}Ver inscrição</button><hr>${mny&&r.pay==='pendente'?`<button class="pi" data-a="rgPaid" data-v="${r.id}">${ic('check',16)}Marcar como pago</button><button class="pi" data-a="rgLink" data-v="${r.id}">${ic('mail',16)}Reenviar link de pagamento</button><hr>`:''}<button class="pi danger" data-a="rgDel" data-v="${r.id}">${ic('x',16)}Cancelar inscrição</button></div></div></span></div>`;}).join('')}`
  :`<div class="mempty"><p>Ninguém inscrito ainda.</p><span>Compartilhe o link do evento ou adicione alguém manualmente.</span></div>`}</section>`;
};

/* ---------- ingressos e compras de uma inscrição ---------- */
tickets=function(e,r){
 const num=String(400+EVTS.indexOf(e)*37+e.regs.indexOf(r)+1),slug=t=>norm(t).replace(/[^a-z0-9]+/g,'-').toUpperCase(),tk=tkOf(e,r);
 const ps=tk&&tk.per&&tk.per.length?e.periods.filter(p=>tk.per.includes(p)):e.periods;
 const acc=e.checkin==='off'?[{k:'insc',n:'Inscrição'+(tk&&e.tickets.length>1?' · '+tk.n:''),tag:'Inscrição',code:''}]:e.checkin==='inteiro'?[{k:'geral',n:'Entrada geral',tag:'Acesso',code:`ALVA-${num}-ACESSO-GERAL`}]:ps.map(p=>({k:'p:'+p,n:'Entrada · '+p,tag:'Acesso',code:`ALVA-${num}-${slug(p)}`}));
 const inc=(tk?tk.incl:[]).map(id=>itById(e,id)).filter(Boolean).map(it=>({k:'inc:'+it.id,n:itLabel(it),tag:'Incluso',price:0,code:e.checkin==='off'?'':`ALVA-${num}-${slug(it.n+(it.p?'-'+it.p:''))}-INC`}));
 const its=buyOf(e,r).map(it=>({k:'i:'+it.id,n:itLabel(it),tag:'Compra',price:it.price,code:e.checkin==='off'?'':`ALVA-${num}-${slug(it.n+(it.p?'-'+it.p:''))}`}));
 return [...acc,...inc,...its];
};
rgDlg=function(e,rid){
 const r=e.regs.find(x=>x.id===rid);if(!r)return;r.ck=r.ck||{};evEnsure(e);S.rgE=e.id;
 const mail=(MEMBERS.find(m=>m.n===r.n)||{}).e||norm(r.n).replace(/\s+/g,'.')+'@email.com',mny=evMoney(e);
 const tk=tickets(e,r),tkt=tkOf(e,r),tot=regTot(e,r),done=tk.filter(t=>r.ck[t.k]).length,blocked=mny&&r.pay==='pendente';
 openDlg(`<div class="dh"><div class="drh"><span class="av lg" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><div><h3>${esc(r.n)}</h3><p>${esc(e.t)}</p></div></div><button class="ibtn sm" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>
  <dl class="kv grid2 rgkv"><div><dt>E-mail</dt><dd><span class="cp" data-a="copy" data-v="${esc(mail)}">${esc(mail)}</span></dd></div><div><dt>Inscrição</dt><dd>${dBR(r.d)}</dd></div>
   ${tkt?`<div><dt>Ingresso</dt><dd>${esc(tkt.n)}</dd></div>`:''}
   ${mny?`<div><dt>Pagamento</dt><dd>${r.pay==='pago'?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Pago</span>':r.pay==='pendente'?'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Pendente</span>':'<span class="soft">Gratuita</span>'}</dd></div><div><dt>Total</dt><dd class="mono">${tot?brl(tot):r.pay==='—'?'—':'Bolsa integral'}${r.vch?` <span class="vtag mono">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</dd></div>`:''}</dl>
  <div class="sh" style="margin:20px 0 10px"><span class="fl">Ingressos e compras</span><span class="who">${e.checkin==='off'?'check-in desabilitado':`${done} de ${tk.length} com check-in`}</span></div>
  ${blocked?`<div class="rgwarn">${ic('alert',14,2)}O check-in libera quando o pagamento for confirmado.</div>`:''}
  <div class="tks">${tk.map(t=>{const c=r.ck[t.k],alt=t.tag==='Compra'||t.tag==='Incluso';return `<div class="tk ${c?'in':''}"><div class="tkl"><div class="tk1"><b>${esc(t.n)}</b><span class="stp" style="--c:${alt?'var(--st-ace)':'var(--st-int)'};--b:${alt?'var(--st-ace-bg)':'var(--st-int-bg)'}"><i></i>${t.tag}</span>${t.price?`<span class="mono who">${brl(t.price)}</span>`:''}</div>${t.code?`<span class="mono tkc">${t.code}</span>`:''}</div>
   ${e.checkin==='off'?'':c?`<button class="tks-st ok" data-a="rgCk" data-v="${r.id}|${t.k}" title="Desfazer check-in">${ic('check',13,2.6)}Entrou às ${c}</button>`:`<button class="tks-st" data-a="rgCk" data-v="${r.id}|${t.k}" ${blocked?'disabled':''}>Aguardando · fazer check-in</button>`}</div>`;}).join('')}</div>
  <div class="dfoot" style="justify-content:space-between;margin-top:18px">${mny&&r.pay==='pendente'?`<button class="btn sec" data-a="rgLinkD" data-v="${r.id}">${ic('mail',15)}Reenviar link</button>`:'<span></span>'}<button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'');
};

/* ---------- vouchers com vários ingressos ---------- */
evVch=function(e){
 evEnsure(e);const one=e.tickets.filter(t=>!t.off).length<2,ref=e.tickets.length?Math.min(...e.tickets.map(t=>+t.price||0)):e.price;
 return `<section class="card mtab"><div class="tbar"><span class="who" style="margin-right:auto">Códigos de desconto válidos só para este evento.${one?'':' O desconto vale para qualquer ingresso, sem passar do valor dele.'}</span><button class="btn pri sm" data-a="vAdd">${ic('plus',14,2.2)}Novo voucher</button></div>
  ${e.vouchers.length?`<div class="vgrid">${e.vouchers.map((v,i)=>{const exp=v.exp&&inDays(v.exp)<0,pct=v.type==='pct',full=pct?v.disc>=100:one&&v.disc>=ref;return `<article class="vc ${exp?'exp':''}"><div class="vc1"><span class="mono vcode">${esc(v.code)}</span><button class="ibtn sm" data-a="vDel" data-v="${i}" aria-label="Excluir voucher">${ic('x',14)}</button></div>
   <div class="vc2"><b>${full?'100%':pct?v.disc+'%':'− '+brl(v.disc)}</b><span>${full?'bolsa integral':pct?'de desconto no ingresso':one?`paga ${brl(Math.max(0,ref-v.disc))}`:'de desconto no ingresso'}</span></div>
   <div class="vc3"><span>${v.mode==='liberado'?`${ic('users',13)}Qualquer pessoa`:`${ic('lock',13)}${esc(v.email)}`}</span><span>${v.uses} ${v.uses===1?'uso':'usos'}</span></div>
   <div class="vc4 ${exp?'bad':''}">${v.exp?(exp?`Expirou em ${dBR(v.exp)}`:`Vale até ${dBR(v.exp)}`):'Nunca expira'}</div></article>`;}).join('')}</div>`:`<div class="mempty"><p>Nenhum voucher.</p><span>Crie códigos de desconto ou bolsas para este evento.</span></div>`}</section>`;
};

/* ---------- diálogo de ingresso ---------- */
function tkDlg(tid){
 const e=eById(S.evt);evEnsure(e);const t=tid?e.tickets.find(x=>x.id===tid):null,sold=t?tkSold(e,t):0,money=e.paid,per=e.checkin==='periodo'&&e.periods.length;
 const shown=e.items.filter(i=>!i.off||(t&&t.incl.includes(i.id)));
 openDlg(`${dlgHead(t?'Editar ingresso':'Novo ingresso',esc(e.t))}<form class="fgrid" id="tgF" novalidate style="grid-template-columns:1fr 1fr">
  <label class="fld wide"><span class="fl">Nome</span><input name="n" placeholder="Ex.: VIP" value="${esc(t?t.n:'')}" autocomplete="off"><span class="err"></span></label>
  <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><input name="desc" placeholder="Ex.: Lugar na frente e kit de boas-vindas" value="${esc(t?t.desc||'':'')}" autocomplete="off"></label>
  ${money?`<label class="fld"><span class="fl">Valor</span><span class="mpre"><em>R$</em><input name="price" type="number" min="0" step="0.01" inputmode="decimal" value="${t?t.price:''}" placeholder="0,00"></span><span class="err"></span></label>`:''}
  <label class="fld ${money?'':'wide'}"><span class="fl">Vagas <small>opcional</small></span><input name="cap" type="number" min="1" inputmode="numeric" value="${t&&t.cap?t.cap:''}" placeholder="Sem limite"><span class="err"></span>${sold?`<span class="hint">${sold} ${sold===1?'inscrito':'inscritos'} neste ingresso</span>`:''}</label>
  ${per?`<div class="fld wide"><span class="fl">Vale para <small>sem marcar, vale para o evento todo</small></span><div class="tg-inc">${e.periods.map(p=>`<label class="tg-ic"><input type="checkbox" name="per" value="${esc(p)}" ${t&&t.per.includes(p)?'checked':''}><span><b>${esc(p)}</b></span></label>`).join('')}</div></div>`:''}
  <div class="fld wide"><span class="fl">O que já vem incluso <small>opcional</small></span>
   ${shown.length?`<div class="tg-inc">${shown.map(i=>`<label class="tg-ic"><input type="checkbox" name="inc" value="${i.id}" ${t&&t.incl.includes(i.id)?'checked':''}><span><b>${esc(i.n)}</b><small>${i.p||'Evento inteiro'} · ${brl(i.price)} à parte</small></span></label>`).join('')}</div><span class="hint">Cada item incluso gera o próprio código de acesso.</span>`:`<p class="who" style="margin:0">Nenhum item cadastrado. Crie almoço, café ou kit em “Compras adicionais” e volte aqui para incluí-los.</p>`}</div>
  <div class="dfoot" style="grid-column:1/-1"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${t?'Salvar':'Criar ingresso'}</button></div></form>`,'sm');
 const f=$('#tgF'),bad=(n,m)=>{const el=f.elements[n],fl=el.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;el.focus();};
 f.addEventListener('input',x=>x.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',x=>{x.preventDefault();const n=f.elements.n.value.trim();
  if(!n)return bad('n','Informe o nome');
  if(e.tickets.some(o=>o!==t&&norm(o.n)===norm(n)))return bad('n','Já existe um ingresso com esse nome');
  let price=t?t.price:0;if(money){if(f.elements.price.value==='')return bad('price','Informe o valor (0 para gratuito)');price=+f.elements.price.value;if(!(price>=0))return bad('price','Valor inválido');}
  const cap=+f.elements.cap.value||0;if(cap&&cap<sold)return bad('cap',`Já há ${sold} inscritos; as vagas não podem ser menos que isso`);
  const incl=[...f.querySelectorAll('input[name=inc]:checked')].map(i=>i.value),pers=[...f.querySelectorAll('input[name=per]:checked')].map(i=>i.value);
  const d={n,desc:f.elements.desc.value.trim(),price,cap,incl,per:pers};
  if(t)Object.assign(t,d);else e.tickets.push({id:'tk'+(++_tkn),off:false,...d});
  evSync(e);closeDlg();rerEv();toast(t?`${n} atualizado`:`${n} criado`);});
 setTimeout(()=>f.elements.n.focus(),80);
}

/* ---------- inscrição manual com ingresso, compras e voucher ---------- */
/* desconto do voucher sobre o valor do ingresso: valor fixo (padrão) ou percentual; nunca passa do ingresso */
function vDisc(v,price){return v.type==='pct'?Math.min(price,Math.round(price*v.disc)/100):Math.min(price,v.disc);}
function regCalc(e,st,m){
 const t=e.tickets.find(x=>x.id===st.tk),base=t?tkPrice(e,t):0,code=(st.vc||'').trim().toUpperCase(),vc=code?e.vouchers.find(x=>x.code===code):null;
 let err='',disc=0;
 if(code&&!vc)err='Voucher não encontrado neste evento';
 else if(vc&&vc.exp&&inDays(vc.exp)<0)err=`Expirou em ${dBR(vc.exp)}`;
 else if(vc&&vc.mode==='especifico'&&m&&vc.email!==m.e)err=`Este voucher é só para ${vc.email}`;
 else if(vc)disc=vDisc(vc,base);
 const adds=[...st.buy].map(id=>itById(e,id)).filter(i=>i&&!(t&&t.incl.includes(i.id))),add=adds.reduce((a,i)=>a+(+i.price||0),0);
 return {t,base,vc,code,disc,err,adds,add,val:base-disc,tot:base-disc+add};
}
function regTotHtml(e,c){
 if(!evMoney(e)&&!c.add)return '';
 const rows=[];if(c.t&&e.paid)rows.push(`<span>${esc(c.t.n)}</span><b>${brl(c.base)}</b>`);
 if(c.disc)rows.push(`<span>Voucher ${esc(c.code)}${c.vc&&c.vc.type==='pct'?' ('+c.vc.disc+'%)':''}</span><b>− ${brl(c.disc)}</b>`);
 if(c.add)rows.push(`<span>${c.adds.length} ${c.adds.length===1?'compra adicional':'compras adicionais'}</span><b>${brl(c.add)}</b>`);
 return `<div class="tg-tot">${rows.map(r=>`<div>${r}</div>`).join('')}<div class="tt"><span>Total</span><b>${c.tot?brl(c.tot):'Gratuito'}</b></div></div>`;
}
Object.assign(A,{
 tkNew:()=>tkDlg(),
 tkEdit:(v,b,x)=>{if(x&&x.target.closest('.hact'))return;closePops();tkDlg(v);},
 tkMenu:v=>{const p=$('#tgPop-'+v);closePops(p);p.classList.toggle('open');},
 tkPause:v=>{closePops();const e=eById(S.evt),t=e.tickets.find(x=>x.id===v);t.off=!t.off;evSync(e);rerEv();toast(t.off?`Vendas de ${t.n} pausadas`:`Vendas de ${t.n} retomadas`,()=>{t.off=!t.off;evSync(e);rerEv();});},
 tkDel:v=>{closePops();const e=eById(S.evt),i=e.tickets.findIndex(x=>x.id===v),t=e.tickets[i],sold=tkSold(e,t);
  if(sold){toast(`${sold} ${sold===1?'pessoa já está inscrita':'pessoas já estão inscritas'} em ${t.n}. Pause as vendas em vez de excluir.`);return;}
  if(e.paid&&e.tickets.length<2){toast('Um evento pago precisa de pelo menos um ingresso');return;}
  confirmDel({title:`Excluir o ingresso ${t.n}?`,body:'Ele deixa de ser oferecido na inscrição.',label:'Excluir ingresso',onConfirm:()=>{e.tickets.splice(i,1);evSync(e);rerEv();toast('Ingresso excluído',()=>{e.tickets.splice(i,0,t);evSync(e);rerEv();});}});},
 evItemDel:v=>{const e=eById(S.evt),it=itById(e,v);if(!it)return;
  if(it.off){it.off=false;rerEv();toast(`${it.n} voltou a ser vendido`);return;}
  const inTk=e.tickets.filter(t=>t.incl.includes(it.id));if(inTk.length){toast(`${it.n} está incluso em ${inTk.map(t=>t.n).join(', ')}. Tire de lá antes de remover.`);return;}
  const n=itSold(e,it);
  confirmDel({title:`Remover ${itLabel(it)}?`,body:n?`${n} ${n===1?'pessoa já comprou':'pessoas já compraram'}; o item continua valendo para ${n===1?'ela':'elas'} e só deixa de ser vendido.`:'Ele deixa de ser oferecido na inscrição.',label:n?'Parar de vender':'Remover item',onConfirm:()=>{if(n){it.off=true;rerEv();toast(`${it.n} não é mais vendido`,()=>{it.off=false;rerEv();});}else{const i=e.items.indexOf(it);e.items.splice(i,1);rerEv();toast('Item removido',()=>{e.items.splice(i,0,it);rerEv();});}}});},
 evReg:()=>{const e=eById(S.evt);evEnsure(e);
  if(e.cap&&e.regs.length>=e.cap){toast('Vagas esgotadas. Aumente as vagas para inscrever mais pessoas.');return;}
  const tks=e.tickets.filter(t=>!t.off);if(e.paid&&!tks.length){toast('Nenhum ingresso à venda. Crie ou retome um ingresso primeiro.');return;}
  const cand=MEMBERS.filter(m=>!e.regs.some(r=>r.n===m.n)),adds=e.items.filter(i=>!i.off),st={tk:tks.length?(tks.find(t=>!tkFull(e,t))||tks[0]).id:'',buy:new Set(),vc:''},mny=evMoney(e);
  openDlg(`${dlgHead('Adicionar inscrição',esc(e.t))}<div id="rgW"><label class="sbox" style="margin-bottom:10px">${ic('search',16)}<input id="rq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="rpk" style="max-height:170px">${candList(cand,'')}</div>
   ${tks.length?`<p class="fl tg-h">Ingresso</p><div class="tg-opts">${tks.map(t=>`<label class="tg-o ${tkFull(e,t)?'off':''}"><input type="radio" name="tk" value="${t.id}" ${st.tk===t.id?'checked':''} ${tkFull(e,t)?'disabled':''}><span><b>${esc(t.n)}</b><small>${tkFull(e,t)?'Esgotado':esc([t.desc,tkInclTxt(e,t).length?'Inclui '+tkInclTxt(e,t).join(', '):''].filter(Boolean).join(' · '))||'&nbsp;'}</small></span><b class="mono">${brl(tkPrice(e,t))}</b></label>`).join('')}</div>`:''}
   ${adds.length?`<p class="fl tg-h">Compras adicionais <small>opcional</small></p><div class="tg-opts" id="rgAd">${adds.map(i=>`<label class="tg-o"><input type="checkbox" value="${i.id}"><span><b>${esc(i.n)}</b><small>${i.p||'Evento inteiro'}</small></span><b class="mono">${brl(i.price)}</b></label>`).join('')}</div>`:''}
   ${e.paid&&e.vouchers.length?`<label class="fld" style="margin-top:14px"><span class="fl">Voucher <small>opcional</small></span><input id="rv" class="mono" placeholder="Ex.: ${esc(e.vouchers[0].code)}" autocomplete="off" style="text-transform:uppercase"><span class="err"></span></label>`:''}
   <div id="rtot"></div>
   <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" data-a="evRegDo">Inscrever</button></div></div>`,'sm');
  const W=$('#rgW'),member=()=>{const s=$('input[name=pm]:checked');return s?byId(s.value):null;},paint=()=>{const c=regCalc(e,st,member());$('#rtot').innerHTML=regTotHtml(e,c);const rv=$('#rv');if(rv){const fl=rv.closest('.fld');fl.classList.toggle('bad',!!c.err&&!!c.code);fl.querySelector('.err').textContent=c.code?c.err:'';}
   W.querySelectorAll('#rgAd input').forEach(i=>{const inc=c.t&&c.t.incl.includes(i.value),lb=i.closest('.tg-o');lb.classList.toggle('off',!!inc);i.disabled=!!inc;if(inc){i.checked=false;st.buy.delete(i.value);lb.querySelector('small').textContent='Já incluso neste ingresso';}});};
  $('#rq').addEventListener('input',x=>{$('#rpk').innerHTML=candList(cand,x.target.value);});
  W.addEventListener('change',x=>{const t=x.target;if(t.name==='tk')st.tk=t.value;else if(t.closest('#rgAd')){t.checked?st.buy.add(t.value):st.buy.delete(t.value);}paint();});
  const rv=$('#rv');if(rv)rv.addEventListener('input',()=>{st.vc=rv.value;paint();});
  W._st=st;paint();},
 evRegDo:(v,b)=>{const e=eById(S.evt),s=$('input[name=pm]:checked');if(!s){toast('Escolha um membro');return;}const m=byId(s.value),W=$('#rgW'),st=W._st;
  const c=regCalc(e,st,m),rv=$('#rv');
  if(c.code&&c.err){const fl=rv.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=c.err;return;}
  if(c.t&&tkFull(e,c.t)){toast(`${c.t.n} esgotado`);return;}
  b.classList.add('busy');
  setTimeout(()=>{const money=evMoney(e),pay=money?(c.tot>0?'pendente':(e.paid?'pago':'—')):'—',r=R(m.n,'2026-10-01',pay,c.val,c.vc?c.code:'');
   if(c.vc)c.vc.uses++;if(c.t)r.tk=c.t.id;r.buy=c.adds.map(i=>i.id);e.regs.push(r);closeDlg();rerEv();
   toast(c.tot>0?`${m.n.split(' ')[0]} inscrito(a) · link de pagamento enviado`:`${m.n.split(' ')[0]} inscrito(a)`);},600);},
});
{const _ag=agAfter;agAfter=function(){_ag();const e=S.evt&&eById(S.evt);if(!e)return;
 const it=$('#itF2');if(it)it.addEventListener('submit',x=>{x.preventDefault();const fd=new FormData(it),n=fd.get('n').trim(),p=+fd.get('p'),per=fd.get('per')||'';if(!n){it.n.focus();return;}if(!(p>0)){it.p.focus();toast('Informe o preço do item');return;}
  if(e.items.some(i=>norm(i.n)===norm(n)&&(i.p||'')===per)){toast('Esse item já existe');return;}
  e.items.push({id:'it'+(++_tkn),n,price:p,p:per});rerEv();toast(`${n} adicionado`);});};}

/* dados de demonstração */
(function evSeed(){
 const buyRule=(e,r)=>{const tk=tkOf(e,r);r.buy=r.buy||e.items.filter((_,i)=>(r.n.length+i)%2===0&&r.pay!=='pendente'&&!(tk&&tk.incl.includes(e.items[i].id))).map(i=>i.id);};
 // Retiro de Jovens: três ingressos, almoço por dia
 const rj=EVTS.find(x=>x.t==='Retiro de Jovens 2026');evEnsure(rj);
 const [aS,aD]=rj.items;
 rj.tickets=[{id:'tkRJa',n:'Participante',desc:'Hospedagem e programação do retiro.',price:120,cap:0,incl:[],per:[]},
  {id:'tkRJb',n:'Participante + almoços',desc:'Programação e os dois almoços.',price:160,cap:40,incl:[aS.id,aD.id],per:[]},
  {id:'tkRJc',n:'Equipe de serviço',desc:'Para quem serve no retiro.',price:80,cap:20,incl:[],per:[]}];
 rj.regs.forEach(r=>{r.tk='tkRJa';});
 const cam=rj.regs.find(r=>r.n==='Camila Sousa');cam.tk='tkRJb';cam.val=160;
 rj.regs.push(Object.assign(R('Marcos Vieira','2026-09-15','pago',80),{tk:'tkRJc'}),Object.assign(R('Beatriz Nunes','2026-09-16','pendente',120),{tk:'tkRJa',buy:[aS.id]}));
 rj.regs.forEach(r=>buyRule(rj,r));evSync(rj);
 // Conferência Missões: ingresso único
 const cm=EVTS.find(x=>x.t==='Conferência Missões');evEnsure(cm);cm.regs.forEach(r=>{r.tk=cm.tickets[0].id;buyRule(cm,r);});
 // Conferência de Mulheres: quatro ingressos e três compras
 const cafe={id:'itMc',n:'Café da manhã',price:15,p:''},alm={id:'itMa',n:'Almoço',price:35,p:''},kit={id:'itMk',n:'Kit de boas-vindas',price:20,p:''};
 const cmu=EV({t:'Conferência de Mulheres',type:'Conferência',d:'2026-11-14',time:'08h30',place:'Auditório',min:'Eventos',paid:true,price:80,cap:300,checkin:'inteiro',items:[cafe,alm,kit],
  tickets:[{id:'tkMa',n:'Normal',desc:'Entrada na conferência.',price:80,cap:0,incl:[],per:[]},{id:'tkMb',n:'Com café',desc:'Entrada e café da manhã.',price:95,cap:0,incl:['itMc'],per:[]},{id:'tkMc',n:'Com café e almoço',desc:'Entrada, café da manhã e almoço.',price:125,cap:0,incl:['itMc','itMa'],per:[]},{id:'tkMd',n:'VIP',desc:'Lugar na frente, café, almoço e kit.',price:180,cap:40,incl:['itMc','itMa','itMk'],per:[]}],
  vouchers:[{code:'MULHERES10',disc:10,exp:'2026-11-10',mode:'liberado',email:'',uses:2}],
  regs:[Object.assign(R('Juliana Reis','2026-10-02','pago',80),{tk:'tkMa',buy:['itMa']}),Object.assign(R('Patrícia Gomes','2026-10-02','pago',95),{tk:'tkMb',buy:[]}),Object.assign(R('Débora Alves','2026-10-03','pago',125),{tk:'tkMc',buy:['itMk']}),Object.assign(R('Helena Costa','2026-10-03','pago',180),{tk:'tkMd',buy:[]}),Object.assign(R('Sandra Lopes','2026-10-04','pendente',70,'MULHERES10'),{tk:'tkMa',buy:['itMc','itMa']}),Object.assign(R('Rebeca Dias','2026-10-04','pago',115,'MULHERES10'),{tk:'tkMb',buy:[]}),Object.assign(R('Marta Silveira','2026-10-05','pendente',125),{tk:'tkMc',buy:[]}),Object.assign(R('Aline Barros','2026-10-05','pago',80),{tk:'tkMa',buy:[]})]});
 EVTS.push(cmu);evEnsure(cmu);
})();

