/* ================= Eventos: check-in (acompanhamento), financeiro, VEM e Inscrições completas ================= */
Object.assign(S,{eif:'todos',eiq:'',iqe:'todos',iqc:'todos',iqt:'todos'});
const brl2=v=>'R$ '+(+v||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
/* formas de pagamento e taxas: valores de exemplo; a tabela real vem da configuração de pagamentos da igreja (Assinaturas) */
const PAYFEE={pix:{n:'Pix',pct:.0099,fix:0},cartao:{n:'Cartão',pct:.0399,fix:.49}};
const payM=r=>r.n.length%3===0?'cartao':'pix';
const regFee=(e,r)=>{const t=regTot(e,r);if(!t)return 0;const f=PAYFEE[payM(r)];return Math.round((t*f.pct+f.fix)*100)/100;};
const stpill=(c,b,t)=>`<span class="stp" style="--c:${c};--b:${b}"><i></i>${t}</span>`;

/* ---------- Check-in: só acompanhamento ---------- */
function eiData(e){
 const rows=[];
 e.regs.forEach(r=>{r.ck=r.ck||{};const blocked=evMoney(e)&&r.pay==='pendente',tk=tkOf(e,r);
  tickets(e,r).forEach(t=>{if(t.tag==='Inscrição')return;rows.push({r,t,blocked,tk:tk?tk.n:'',at:r.ck[t.k]||''});});});
 const acc=rows.filter(x=>x.t.tag==='Acesso'),ok=acc.filter(x=>!x.blocked),done=ok.filter(x=>x.at);
 const grp=(list,key)=>{const m=new Map();list.forEach(x=>{const k=key(x),g=m.get(k)||{k,n:0,d:0};g.n++;if(x.at)g.d++;m.set(k,g);});return [...m.values()];};
 return {rows,acc,ok,done,blocked:acc.filter(x=>x.blocked),
  byPer:grp(ok,x=>x.t.n.replace('Entrada · ','').replace('Entrada geral','Evento inteiro')),
  byTk:grp(ok,x=>x.tk||'Inscrição'),
  byItem:grp(rows.filter(x=>x.t.tag!=='Acesso'&&!x.blocked),x=>x.t.n),
  last:rows.filter(x=>x.at).sort((a,b)=>a.at<b.at?1:-1)};
}
const eiDone=e=>e.checkin==='off'?0:eiData(e).done.length;
function eiBar(g){const p=g.n?Math.round(g.d/g.n*100):0;return `<div class="ei-b"><div class="ei-bh"><span>${esc(g.k)}</span><b>${g.d}<small>/${g.n}</small></b></div><span class="ei-tr" role="img" aria-label="${p}%"><i style="width:${p}%"></i></span></div>`;}
function eiRows(e){
 const d=eiData(e),q=norm(S.eiq),f=S.eif,sig=e.id+'|'+S.eiq+'|'+S.eif;if(S.eiSig!==sig){S.eiSig=sig;S.eipg=1;}
 const wait=x=>!x.at&&!x.blocked;
 const l=d.rows.filter(x=>(f==='todos'||(f==='in'?x.at:f==='wait'?wait(x):x.blocked&&!x.at))&&(!q||norm(x.r.n+' '+x.t.n).includes(q))).sort((a,b)=>a.at&&b.at?(a.at<b.at?1:-1):a.at?-1:b.at?1:a.r.n<b.r.n?-1:1);
 if(!l.length)return `<div class="mempty"><p>Nada por aqui.</p><span>Nenhum código corresponde a esses filtros.</span></div>`;
 return `<div class="trow ei thead"><span>Pessoa</span><span>Código</span><span>Ingresso</span><span>Situação</span></div>${(()=>{const pp=8,pages=Math.max(1,Math.ceil(l.length/pp));S.eipg=Math.min(Math.max(1,S.eipg||1),pages);S._eiPages=pages;S._eiTot=l.length;return l.slice((S.eipg-1)*pp,S.eipg*pp);})().map(x=>`<div class="trow ei" tabindex="0" data-a="rgView" data-v="${x.r.id}"><span class="tn"><span class="av" style="background:var(--tone-${TONES[x.r.n.length%6]});color:var(--tone-${TONES[x.r.n.length%6]}-ink)">${initials(x.r.n)}</span><span class="hn"><b>${esc(x.r.n)}</b></span></span>
  <span class="ec">${esc(x.t.n)}<small>${x.t.tag}</small></span><span class="eg">${esc(x.tk||'—')}</span>
  <span class="ts">${x.at?stpill('var(--st-int)','var(--st-int-bg)','Entrou às '+x.at):x.blocked?stpill('var(--st-sol)','var(--st-sol-bg)','Aguardando pagamento'):stpill('var(--ink-muted)','var(--surface-2)','Aguardando')}</span></div>`).join('')}<div class="tfoot"><span>${(()=>{const pp=8,a=(S.eipg-1)*pp+1,b=Math.min(l.length,S.eipg*pp);return S._eiPages>1?`${a}–${b} de ${l.length} códigos`:`${l.length} ${l.length===1?'código':'códigos'}`;})()}</span>${(()=>{const P=S._eiPages,c=S.eipg;if(P<2)return '';const n=[];for(let i=1;i<=P;i++){if(i===1||i===P||Math.abs(i-c)<=1)n.push(i);else if(n[n.length-1]!=='…')n.push('…');}
  return `<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="eiPg" data-v="${c-1}" ${c===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${n.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===c?'on':''}" data-a="eiPg" data-v="${i}" aria-current="${i===c?'page':'false'}">${i}</button>`).join('')}<button class="ibtn sm" data-a="eiPg" data-v="${c+1}" ${c===P?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`;})()}</div>`;
}
function eiTab(e){
 evEnsure(e);const d=eiData(e),pct=d.ok.length?Math.round(d.done.length/d.ok.length*100):0,last=d.last[0],nWait=d.rows.filter(x=>!x.at&&!x.blocked).length,nBlk=d.rows.filter(x=>x.blocked&&!x.at).length,nIn=d.rows.filter(x=>x.at).length;
 const items=d.byItem.length?`<section class="card pc"><div class="sh"><h2>Itens retirados</h2><span class="who">almoço, café, kit…</span></div>${d.byItem.map(eiBar).join('')}</section>`:'';
 return `<div class="ei-note">${ic('shield',16)}<span><b>O check-in é feito pela equipe, no app do VEM.</b> Leitor de QR, totem ou busca manual. Aqui você só acompanha.</span><button class="btn sec sm" data-a="vemOpen">${ic('share',14)}Abrir no VEM</button></div>
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Entradas</span><span class="kv">${d.done.length}<small class="kof">/${d.ok.length}</small></span><span class="kd">${pct}% dos códigos liberados</span></div>
  <div class="k4"><span class="kl">Faltam entrar</span><span class="kv">${d.ok.length-d.done.length}</span><span class="kd">códigos liberados</span></div>
  <div class="k4"><span class="kl">Aguardando pagamento</span><span class="kv" style="${d.blocked.length?'color:var(--st-sol)':''}">${d.blocked.length}</span><span class="kd">${d.blocked.length?'libera depois de pagar':'nenhum código travado'}</span></div>
  <div class="k4"><span class="kl">Último check-in</span><span class="kv">${last?last.at:'—'}</span><span class="kd">${last?esc(last.r.n):'ninguém entrou ainda'}</span></div></section>
 <div class="eic">
 <section class="card mtab eic-t"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="eiq" placeholder="Buscar pessoa ou código" value="${esc(S.eiq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todos',d.rows.length],['in','Entraram',nIn],['wait','Aguardando',nWait],...(nBlk?[['blk','Sem pagamento',nBlk]]:[])].map(c=>`<button class="chipf ${S.eif===c[0]?'on':''}" data-a="eiF" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
  <div id="eirows">${eiRows(e)}</div></section>
 <aside class="card pc eis"><div class="sh"><h2>Andamento</h2></div>
  <div class="eis-s"><h3>${ic('calendar',14,2)}${e.checkin==='periodo'?'Por período':'Entrada'}</h3>${d.byPer.length?d.byPer.map(eiBar).join(''):'<p class="who" style="margin:0">Nenhum código liberado ainda.</p>'}</div>
  ${e.tickets.length>1?`<div class="eis-s"><h3>${ic('ticket',14,2)}Por ingresso</h3>${d.byTk.map(eiBar).join('')}</div>`:''}
  ${d.byItem.length?`<div class="eis-s"><h3>${ic('box',14,2)}Itens retirados</h3>${d.byItem.map(eiBar).join('')}</div>`:''}
 </aside></div>`;
}

/* ---------- Financeiro do evento: três números em Detalhes; o detalhamento está em Relatórios › Agenda e eventos ---------- */
function evFinSum(e){
 evEnsure(e);const paid=e.regs.filter(r=>r.pay==='pago'),pend=e.regs.filter(r=>r.pay==='pendente');
 const gross=paid.reduce((a,r)=>a+regTot(e,r),0),fees=paid.reduce((a,r)=>a+regFee(e,r),0);
 return {paid,pend,gross,fees,net:gross-fees,toRec:pend.reduce((a,r)=>a+regTot(e,r),0)};
}
function evFinDet(e){
 if(!evMoney(e))return '';const f=evFinSum(e);
 return `<section class="card pc"><div class="sh"><h2>Financeiro</h2><button class="btn sec sm" data-a="evFinRep" data-v="${e.id}">${ic('clipboard',14)}Detalhamento</button></div>
  <div class="ef3"><div><span>Arrecadado</span><b>${brl2(f.gross)}</b><small>${f.paid.length} ${f.paid.length===1?'pagamento confirmado':'pagamentos confirmados'}</small></div>
   <div><span>Líquido</span><b style="color:var(--st-int)">${brl2(f.net)}</b><small>depois das taxas de pagamento</small></div>
   <div><span>A receber</span><b style="${f.toRec?'color:var(--st-sol)':''}">${brl2(f.toRec)}</b><small>${f.pend.length} ${f.pend.length===1?'pendente':'pendentes'}</small></div></div>
  <div class="ef-fin">${ic(past(e)?'check':'mail',16)}<span>${past(e)?`Líquido de <b>${brl2(f.net)}</b> lançado em Receitas após o evento.`:`O líquido entra em Receitas depois do evento${e.d?`, previsto para ${dBR(e.d)}`:''}.`}</span></div>
  <p class="who" style="margin:12px 0 0">O detalhe por ingresso, compra adicional, forma de pagamento e desconto está em <button class="lnk" data-a="evFinRep" data-v="${e.id}">Relatórios › Agenda e eventos</button>.</p></section>`;
}
/* linhas do relatório: cada recorte (ingresso, compra, forma de pagamento, desconto) mostra o mesmo dinheiro por um ângulo; a taxa de cada pagamento é repartida entre o ingresso e as compras dele */
function evFinRepRows(){
 const out=[];
 EVTS.filter(e=>e.st==='confirmado'&&evMoney(e)&&e.regs.length).forEach(e=>{
  evEnsure(e);const acc={};
  const add=(g,id,lab,o)=>{const k=g+'|'+id,x=acc[k]||(acc[k]={e,g,lab,q:0,gross:0,fee:0,rec:0});x.q+=o.q||0;x.gross+=o.gross||0;x.fee+=o.fee||0;x.rec+=o.rec||0;};
  e.regs.forEach(r=>{
   const tk=tkOf(e,r),parts=[{g:'ing',id:tk?tk.id:'base',lab:tk?tk.n:'Inscrição',v:+r.val||0},...buyOf(e,r).map(i=>({g:'buy',id:i.id,lab:itLabel(i),v:itPx(e,i,tk)}))],tot=regTot(e,r);
   if(r.pay==='pago'){
    let left=regFee(e,r);
    parts.forEach((p,i)=>{const fee=i===parts.length-1?left:Math.round(regFee(e,r)*(tot?p.v/tot:0)*100)/100;left=Math.round((left-fee)*100)/100;add(p.g,p.id,p.lab,{q:1,gross:p.v,fee});});
    const m=payM(r);add('pay',m,PAYFEE[m].n,{q:1,gross:tot,fee:regFee(e,r)});
   }else if(r.pay==='pendente'){parts.forEach(p=>add(p.g,p.id,p.lab,{rec:p.v}));const m=payM(r);add('pay',m,PAYFEE[m].n,{rec:tot});}
  });
  e.vouchers.forEach(v=>{const rs=e.regs.filter(r=>r.vch===v.code);if(!rs.length)return;
   const dsc=rs.reduce((a,r)=>{const t=tkOf(e,r);return a+Math.max(0,(t?tkPrice(e,t):(+e.price||0))-(+r.val||0));},0);add('dsc',v.code,'Voucher '+v.code,{q:rs.length,gross:-dsc});});
  Object.values(acc).forEach(x=>{x.fee=Math.round(x.fee*100)/100;out.push(x);});
 });
 const ord={ing:0,buy:1,pay:2,dsc:3};
 return out.sort((a,b)=>a.e.d<b.e.d?1:a.e.d>b.e.d?-1:ord[a.g]-ord[b.g]);
}

/* ---------- Divulgação no VEM ---------- */
const VEMCATS=['Conferência','Retiro','Congresso','Curso','Encontro','Show','Culto','Outro'];
function vemOf(e){if(!e.vem)e.vem={on:e.kind==='evento'&&e.st==='confirmado'&&!!(e.paid||e.regs.length),cat:VEMCATS.includes(e.type)?e.type:e.type==='Evento especial'?'Encontro':'Outro',city:'São Paulo',uf:'SP',desc:'',cover:''};return e.vem;}
const vemMiss=v=>[!v.cover&&'capa',!(v.desc||'').trim()&&'descrição',!(v.city||'').trim()&&'cidade',!/^[A-Za-z]{2}$/.test(v.uf||'')&&'UF'].filter(Boolean);
const vemPill=e=>{if(e.kind==='culto'||isCer(e)||e.st==='previsao')return '';const v=vemOf(e);return !v.on?'':vemMiss(v).length?stpill('var(--st-sol)','var(--st-sol-bg)','VEM · incompleto'):stpill('var(--st-int)','var(--st-int-bg)','No VEM');};
function vemStHtml(e){const v=vemOf(e),m=vemMiss(v);return m.length?`<div class="rgwarn">${ic('alert',14,2)}Falta ${m.join(', ')}. Enquanto isso o evento não aparece no VEM.</div>`:`<div class="vem-ok">${ic('check',14,2.4)}<span>Publicado no VEM. As inscrições feitas lá aparecem aqui, na aba Inscrições.</span></div>`;}
function vemCard(e){
 if(e.kind==='culto'||isCer(e)||e.st==='previsao')return '';const v=vemOf(e);
 return `<section class="card pc"><div class="sh"><h2>Divulgar no VEM</h2>${vemPill(e)}</div>
  <p class="who" style="margin:-6px 0 12px">O VEM é o app de inscrições. Com a chave ligada, o evento aparece lá para qualquer pessoa, e as vendas voltam para este evento.</p>
  <label class="tog"><input type="checkbox" id="vemOn" ${v.on?'checked':''}><span class="sw"></span><span><b>Mostrar este evento no VEM</b><small>${v.on?'Visível para quem usa o VEM':'Só quem tem o link se inscreve'}</small></span></label>
  ${v.on?`<form class="fgrid vem-f" id="vemF" novalidate style="grid-template-columns:1fr 1fr;margin-top:16px">
   <label class="fld wide"><span class="fl">Categoria</span><span class="selw"><select name="cat">${VEMCATS.map(c=>`<option ${v.cat===c?'selected':''}>${c}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Cidade</span><input name="city" value="${esc(v.city)}" autocomplete="off"></label>
   <label class="fld"><span class="fl">UF</span><input name="uf" value="${esc(v.uf)}" maxlength="2" style="text-transform:uppercase" autocomplete="off"></label>
   <label class="fld wide"><span class="fl">Descrição</span><textarea name="desc" rows="3" placeholder="O que a pessoa precisa saber para se inscrever">${esc(v.desc)}</textarea></label>
   <div class="fld wide"><span class="fl">Capa</span>${v.cover?`<div class="vem-cv"><span class="vem-th"></span><span class="mono">${esc(v.cover)}</span><button type="button" class="btn sec sm" data-a="vemCoverDel">Remover</button></div>`:`<button type="button" class="btn sec" data-a="vemCover">${ic('plus',14,2.2)}Escolher imagem</button>`}</div>
   <div class="wide" id="vemSt" style="grid-column:1/-1">${vemStHtml(e)}</div></form>`:''}</section>`;
}

/* ---------- Inscrições (todas) ---------- */
function insCk(e,r){
 if(e.checkin==='off')return {k:'nock',d:0,t:0};
 const acc=tickets(e,r).filter(t=>t.tag==='Acesso'),d=acc.filter(t=>(r.ck||{})[t.k]).length;
 return {k:d===0?'wait':d===acc.length?'in':'part',d,t:acc.length};
}
const insCkPill=c=>c.k==='nock'?'<span class="soft">Sem check-in</span>':c.k==='in'?stpill('var(--st-int)','var(--st-int-bg)',c.t>1?`Entrou · ${c.d}/${c.t}`:'Entrou'):c.k==='part'?stpill('var(--st-sol)','var(--st-sol-bg)',`Parcial · ${c.d}/${c.t}`):stpill('var(--ink-muted)','var(--surface-2)','Aguardando');
inscPage=function(){
 const rows=EVTS.flatMap(e=>{evEnsure(e);return e.regs.map(r=>({...r,e,_r:r}));}),q=norm(S.iq);
 const evs=EVTS.filter(e=>e.regs.length),scope=S.iqe==='todos'?rows:rows.filter(r=>r.e.id===S.iqe);
 const tkNames=[...new Set(scope.map(r=>{const t=tkOf(r.e,r);return t&&r.e.tickets.length>1?t.n:null;}).filter(Boolean))];
 if(S.iqt!=='todos'&&!tkNames.includes(S.iqt))S.iqt='todos';
 const l=rows.filter(r=>(S.iqf==='todos'||(S.iqf==='pago'?r.pay==='pago':S.iqf==='pendente'?r.pay==='pendente':r.pay==='—'))
  &&(S.iqe==='todos'||r.e.id===S.iqe)&&(S.iqt==='todos'||(tkOf(r.e,r)||{}).n===S.iqt)&&(S.iqc==='todos'||insCk(r.e,r._r).k===S.iqc)
  &&(!q||norm(r.n+' '+r.e.t).includes(q))).sort((a,b)=>a.d<b.d?1:-1);
 const pend=rows.filter(r=>r.pay==='pendente');
 const sel=(id,val,opts)=>`<span class="selw"><select id="${id}" aria-label="${id}">${opts.map(([v,t])=>`<option value="${esc(v)}" ${val===v?'selected':''}>${esc(t)}</option>`).join('')}</select>${ic('updown',14)}</span>`;
 return `<header class="ph rise"><div><p class="eb">Agenda</p><h1>Inscrições</h1><p class="lede">Todas as inscrições em cultos e eventos</p></div><div class="pact">${rpBtn('agenda','inscricoes')}</div></header>
 ${insSum(rows,pend)}
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="iq2" placeholder="Buscar pessoa ou evento" value="${esc(S.iq)}" autocomplete="off"></label>
  <div class="chips">${[['todos','Todas'],['pendente','Pendentes'],['pago','Pagas'],['gratis','Gratuitas']].map(c=>`<button class="chipf ${S.iqf===c[0]?'on':''}" data-a="iqF" data-v="${c[0]}">${c[1]}</button>`).join('')}</div>
  <div class="ins-fil">${sel('iqE',S.iqe,[['todos','Todos os eventos'],...evs.map(e=>[e.id,e.t])])}${tkNames.length?sel('iqT',S.iqt,[['todos','Todos os ingressos'],...tkNames.map(n=>[n,n])]):''}${sel('iqC',S.iqc,[['todos','Qualquer check-in'],['in','Entrou'],['part','Parcial'],['wait','Aguardando'],['nock','Evento sem check-in']])}</div></div>
  ${l.length?`<div class="trow ax2 thead"><span>Pessoa</span><span>Evento e ingresso</span><span>Pagamento</span><span>Check-in</span><span>Data</span></div>${l.map(r=>{const tk=tkOf(r.e,r),nb=buyOf(r.e,r).length,tot=regTot(r.e,r),ck=insCk(r.e,r._r);return `<div class="trow ax2" tabindex="0" data-a="insView" data-v="${r.e.id}|${r.id}"><span class="tn"><span class="av" style="background:var(--tone-${TONES[r.n.length%6]});color:var(--tone-${TONES[r.n.length%6]}-ink)">${initials(r.n)}</span><span class="hn"><b>${esc(r.n)}</b>${r.vch?`<span class="mono vtag">${ic('ticket',11)}${esc(r.vch)}</span>`:''}</span></span>
   <span class="aev"><b>${esc(r.e.t)}</b><small>${[tk&&r.e.tickets.length>1?esc(tk.n):'',nb?`+${nb} ${nb===1?'compra':'compras'}`:''].filter(Boolean).join(' · ')||'&nbsp;'}</small></span>
   <span class="ts">${r.pay==='pago'?stpill('var(--st-int)','var(--st-int-bg)','Pago · '+(tot?brl(tot):'bolsa')):r.pay==='pendente'?stpill('var(--st-sol)','var(--st-sol-bg)','Pendente · '+brl(tot)):'<span class="soft">Gratuita</span>'}</span>
   <span class="ack">${insCkPill(ck)}</span><span class="rdt">${dBR(r.d)}</span></div>`;}).join('')}`:'<div class="mempty"><p>Nada encontrado.</p><span>Tente outros filtros.</span></div>'}
  <div class="tfoot"><span>${l.length} inscrições</span></div></section>`;
};

/* ---------- ações ---------- */
Object.assign(A,{
 eiF:v=>{S.eif=v;rerEv();},
 insView:v=>{const [eid,rid]=v.split('|'),e=eById(eid);if(e)rgDlg(e,rid);},
 vemOpen:()=>toast('Abre o app do VEM neste evento'),
 vemCover:()=>{const e=eById(S.evt),v=vemOf(e);v.cover='capa-'+norm(e.t).replace(/[^a-z0-9]+/g,'-')+'.jpg';rerEv();toast('Capa adicionada');},
 vemCoverDel:()=>{const e=eById(S.evt);vemOf(e).cover='';rerEv();},
 rgCk:v=>{const [rid,k]=v.split('|'),e=eById(S.rgE||S.evt),r=e.regs.find(x=>x.id===rid);r.ck=r.ck||{};
  if(r.ck[k]){const old=r.ck[k];delete r.ck[k];rerEv();rgDlg(e,rid);toast('Check-in desfeito',()=>{r.ck[k]=old;rerEv();rgDlg(e,rid);});return;}
  r.ck[k]=new Date().toTimeString().slice(0,5);rerEv();rgDlg(e,rid);toast(`Check-in de ${r.n.split(' ')[0]} registrado`);},
 rgLinkD:v=>{const r=eById(S.rgE||S.evt).regs.find(x=>x.id===v);toast(`Link de pagamento reenviado para ${r.n.split(' ')[0]}`);},
});
{const _ag=agAfter;agAfter=function(){_ag();
 ['iqE:iqe','iqC:iqc','iqT:iqt'].forEach(p=>{const [id,k]=p.split(':'),el=$('#'+id);if(el)el.addEventListener('change',()=>{S[k]=el.value;if(k==='iqe')S.iqt='todos';render();});});
 const e=S.evt&&eById(S.evt);if(!e)return;
 const q=$('#eiq');if(q)q.addEventListener('input',x=>{S.eiq=x.target.value;$('#eirows').innerHTML=eiRows(e);});
 const on=$('#vemOn');if(on)on.addEventListener('change',()=>{vemOf(e).on=on.checked;rerEv();toast(on.checked?'Evento será divulgado no VEM':'Evento fora do VEM');});
 const vf=$('#vemF');if(vf){const sync=()=>{const v=vemOf(e);v.cat=vf.cat.value;v.city=vf.city.value;v.uf=vf.uf.value.toUpperCase();v.desc=vf.desc.value;const st=$('#vemSt');if(st)st.innerHTML=vemStHtml(e);};vf.addEventListener('input',sync);vf.addEventListener('change',()=>{sync();rerEv();});}
};}

/* dados de demonstração: divulgação no VEM e check-ins */
(function ev2Seed(){
 const rj0=EVTS.find(x=>x.t==='Retiro de Jovens 2026');if(rj0&&!rj0.vouchers.some(v=>v.code==='JOVEM15'))rj0.vouchers.push({code:'JOVEM15',type:'pct',disc:15,exp:'',mode:'liberado',email:'',uses:2});
 const rj=EVTS.find(x=>x.t==='Retiro de Jovens 2026'),cms=EVTS.find(x=>x.t==='Conferência Missões'),cmu=EVTS.find(x=>x.t==='Conferência de Mulheres');
 Object.assign(vemOf(rj),{desc:'Dois dias de retiro para jovens na Chácara Alva: louvor, estudos e comunhão. Vagas limitadas.',cover:'capa-retiro-de-jovens-2026.jpg'});
 Object.assign(vemOf(cmu),{desc:'Uma manhã de conferência para mulheres, com palestras, louvor e comunhão. Escolha o ingresso com café, almoço ou VIP.',cover:'capa-conferencia-de-mulheres.jpg'});
 Object.assign(vemOf(cms),{desc:'Noite de conferência sobre missões, com missionários convidados.'});
 const ck=(e,nm,k,at)=>{const r=e.regs.find(x=>x.n===nm);if(r){r.ck=r.ck||{};r.ck[k]=at;}};
 const aS=rj.items[0];
 ck(rj,'Giovanna Martins','p:Sábado','08:12');ck(rj,'Camila Sousa','p:Sábado','08:20');ck(rj,'Camila Sousa','inc:'+aS.id,'12:05');ck(rj,'Marcos Vieira','p:Sábado','08:05');ck(rj,'Giovanna Martins','p:Domingo','08:31');
 ck(cms,'Felipe Andrade','geral','19:41');
})();


