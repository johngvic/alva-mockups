/* ================= Financeiro ================= */
const R$=(v,sign)=>`${sign&&v>0?'+':''}${v<0?'−':''}R$ ${Math.abs(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const R0=v=>`R$ ${Math.round(v).toLocaleString('pt-BR')}`;
const FCATS={'Dízimos':['ceu','e'],'Ofertas':['menta','e'],'Doações':['lima','e'],'Inscrições':['salvia','e'],'Estrutura':['damasco','s'],'Comunicação':['rosado','s'],'Manutenção':['salvia','s'],'Missões':['lima','s'],'Ministérios':['menta','s']};
const catTag=c=>{const t=(FCATS[c]||['salvia'])[0];return `<span class="fi-cat" style="--t:var(--tone-${t});--ti:var(--tone-${t}-ink)">${esc(c)}</span>`;};
let _lid=0;const LC=(d,comp,desc,cat,tipo,v,st='ok',who='Rafael Pereira')=>({id:'lc'+(++_lid),d,comp,desc,cat,tipo,v,st,who});
const LANCS=[
 LC('2026-09-17','2026-09','Dízimos e Ofertas — Culto Dom','Dízimos','e',12480),
 LC('2026-09-15','2026-09','Pagamento fornecedor gráfica','Comunicação','s',890),
 LC('2026-09-14','2026-09','Aluguel do salão','Estrutura','s',3200),
 LC('2026-09-12','2026-09','Campanha Retiro Jovens','Doações','e',5300),
 LC('2026-09-10','2026-09','Material de limpeza','Manutenção','s',340),
 LC('2026-09-07','2026-09','Dízimos e Ofertas — Culto Dom','Dízimos','e',11920),
 LC('2026-09-05','2026-08','Manutenção ar-condicionado','Manutenção','s',1200),
 LC('2026-09-29','2026-09','Oferta missionária — Culto de quarta','Ofertas','e',1860,'pend','Larissa Pires'),
];
const FLOW=[['Abr',24800,6100],['Mai',27300,7900],['Jun',24100,5600],['Jul',28900,8200],['Ago',30200,6900],['Set',29700,4430]];
let _pid2=0;const CP=(desc,venc,v,cat,paid=false)=>({id:'cp'+(++_pid2),desc,venc,v,cat,paid});
const PAGAR=[CP('Energia elétrica','2026-09-28',640,'Estrutura'),CP('Fornecedor gráfica — banners','2026-09-30',890,'Comunicação'),CP('Aluguel do salão — Outubro','2026-10-05',3200,'Estrutura'),CP('Internet e telefonia','2026-10-08',289,'Estrutura'),CP('Seguro do prédio','2026-10-20',1150,'Estrutura'),CP('Material de limpeza','2026-09-10',340,'Manutenção',true)];
const RECEB=[{id:'cr1',desc:'Inscrições — Retiro de Jovens 2026',prev:'2026-09-27',v:10440,got:10440,src:'Cadastro manual'},{id:'cr2',desc:'Campanha Reforma do Templo',prev:'',v:80000,got:0,src:'Cadastro manual'},{id:'cr3',desc:'Conferência Missões — inscrições',prev:'2026-10-09',v:4800,got:0,src:'Cadastro manual'}];
let _aid=0;const AP=(tipo,desc,v,d,who,extra={})=>({id:'ap'+(++_aid),tipo,desc,v,d,who,...extra});
const APROVS=[
 AP('imp','Extrato Bradesco (OFX)',null,'2026-09-17','Rafael Pereira',{n:18,ent:14,sai:4,te:21340,ts:3870,rows:[['16/09','PIX recebido — M. Souza','Dízimos','e',350],['16/09','PIX recebido — A. C. Lima','Dízimos','e',500],['15/09','Boleto Enel','Estrutura','s',640],['15/09','TED recebida — campanha','Doações','e',1200],['14/09','Pag. Gráfica Rápida','Comunicação','s',890]]}),
 AP('lanc','Oferta missionária — Culto de quarta',1860,'2026-09-29','Larissa Pires',{tp:'e',cat:'Ofertas',lid:'lc8'}),
];

/* tipo de link, Recibo e caixa das campanhas (ajustes de 24/10/2026) */

/* dados de exemplo: o tipo de link de cada campanha e o caixa */

Object.assign(S,{lf:'todos',lq:'',fbar:5,relM:'2026-09',fbank:'bb',ffile:null,apOpen:null});
const monthName=ym=>{const [y,m]=ym.split('-');return MONTHS[+m-1][0].toUpperCase()+MONTHS[+m-1].slice(1)+'/'+y;};
const compTxt=ym=>{const [y,m]=ym.split('-');return MONTHS[+m-1].slice(0,3).replace(/^./,c=>c.toUpperCase())+'/'+y;};
const okL=()=>LANCS.filter(l=>l.st==='ok'&&l.comp==='2026-09');
const sumT=(l,t)=>l.filter(x=>x.tipo===t).reduce((a,x)=>a+x.v,0);
const fHead=(t,lede,act='')=>`<header class="ph rise"><div><p class="eb">Financeiro</p><h1>${t}</h1><p class="lede">${lede}</p></div><div class="pact">${act}</div></header>`;
const dDays=iso=>Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);

/* ---------- Visão geral ---------- */
function fVis(){
 const l=okL(),late=PAGAR.filter(p=>!p.paid&&dDays(p.venc)<0),soon=PAGAR.filter(p=>!p.paid&&dDays(p.venc)>=0&&dDays(p.venc)<=7);
 const f=FLOW[S.fbar],cur=S.fbar===FLOW.length-1,e=f[1],s=f[2],sal=e-s,prev=FLOW[S.fbar-1],de=prev?Math.round((e/prev[1]-1)*100):null,ds=prev?Math.round((s/prev[2]-1)*100):null;
 const mx=Math.max(...FLOW.map(x=>x[1])),W=600,H=190,bw=W/FLOW.length,sy=v=>H-v/mx*H;
 const pts=FLOW.map((x,i)=>[i*bw+bw/2,sy(x[1]-x[2])]);
 const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
 const cats={};l.forEach(x=>{cats[x.cat]=cats[x.cat]||{e:0,s:0};cats[x.cat][x.tipo]+=x.v;});
 const E=sumT(l,'e'),Sx=sumT(l,'s'),ent=Object.entries(cats).filter(c=>c[1].e).sort((a,b)=>b[1].e-a[1].e),sai=Object.entries(cats).filter(c=>c[1].s).sort((a,b)=>b[1].s-a[1].s);
 const tone=c=>(FCATS[c]||['salvia'])[0];
 const seg=(c,v,tot,kind)=>`<span class="fv-sg ${kind} ${v/tot<.13?'sm':''}" style="flex:${v};--t:var(--tone-${tone(c)});--ti:var(--tone-${tone(c)}-ink)" title="${esc(c)} · ${R0(v)}"><b>${esc(c)}</b><small>${R0(v)} · ${Math.round(v/tot*100)}%</small></span>`;
 const pct=v=>v==null?'':`<small class="${v>=0?'up':'dn'}">${ic(v>=0?'arrowUp':'arrowDn',11,2.4)}${Math.abs(v)}%</small>`;
 return fHead('Visão geral','Como está o caixa da igreja',`<button class="btn sec" data-a="nav" data-v="frel">${ic('file',15)}Relatórios</button><button class="btn pri" data-a="lcNew">${ic('plus',15,2.2)}Novo lançamento</button>`)
 +`<section class="card fv-hero rise" style="--d:1">
  <div class="fv-now"><span class="kl">Saldo de ${MONTHS[['Abr','Mai','Jun','Jul','Ago','Set'].indexOf(f[0])+3]}${cur?' · mês atual':''}</span><b class="fi-big ${sal<0?'neg':''}" id="fvSal">${R$(sal)}</b>
   <div class="fv-io"><div><span><i class="e"></i>Entrou</span><b>${R$(e)}</b>${pct(de)}</div><div><span><i class="s"></i>Saiu</span><b>${R$(s)}</b>${pct(ds)}</div></div>
   <div class="fv-keep"><span class="tr"><i style="width:${Math.max(0,sal/e*100)}%"></i></span><span>Ficaram <b>${Math.round(sal/e*100)}%</b> de cada real que entrou</span></div></div>
  <div class="fv-chart"><div class="fv-ch"><span class="fl">Últimos 6 meses</span><div class="fi-leg"><span><i class="e"></i>Entradas</span><span><i class="s"></i>Saídas</span><span><i class="ln"></i>Saldo</span></div></div>
   <div class="fv-plot"><div class="fv-cols">${FLOW.map((x,i)=>`<button class="fv-col ${i===S.fbar?'on':''}" data-a="fBar" data-v="${i}" aria-label="${x[0]}"><span class="fi-bars"><i class="e" style="height:${x[1]/mx*100}%;--i:${i}"></i><i class="s" style="height:${x[2]/mx*100}%;--i:${i}"></i></span><small>${x[0]}</small></button>`).join('')}</div>
    <svg class="fv-line" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${path}" pathLength="1"/></svg>
    <div class="fv-dots">${pts.map((p,i)=>`<i class="${i===S.fbar?'on':''}" style="left:${p[0]/W*100}%;top:${p[1]/H*100}%"></i>`).join('')}</div></div></div></section>
 <div class="fv-act rise" style="--d:2">
  <button class="card fv-a ${late.length?'bad':'ok'}" data-a="nav" data-v="fpag"><span class="fv-ai">${ic('clock',18)}</span><b class="fv-an">${late.length}</b><span class="fv-at"><b>conta${late.length===1?'':'s'} atrasada${late.length===1?'':'s'}</b><span>${late.length?R$(late.reduce((a,p)=>a+p.v,0)):'Tudo em dia'}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a wait" data-a="nav" data-v="fpag"><span class="fv-ai">${ic('calendar',18)}</span><b class="fv-an">${soon.length}</b><span class="fv-at"><b>vence${soon.length===1?'':'m'} em 7 dias</b><span>${R$(soon.reduce((a,p)=>a+p.v,0))}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a brand" data-a="nav" data-v="fapr"><span class="fv-ai">${ic('check',18,2.2)}</span><b class="fv-an">${APROVS.length}</b><span class="fv-at"><b>aguardando aprovação</b><span>${APROVS.length?APROVS.map(a=>a.tipo==='imp'?'extrato':'lançamento').join(' + '):'Nada pendente'}</span></span>${ic('arrowR',15,2)}</button></div>
 <div class="fv-act rise" style="--d:3">
  <button class="card fv-a ok" data-a="nav" data-v="fcon"><span class="fv-ai">${ic('wallet',18)}</span><b class="fv-an">${R0(fSaldo())}</b><span class="fv-at"><b>saldo das contas</b><span>${FCONTAS.length} contas ativas</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a wait" data-a="fCfgGo" data-v="fech"><span class="fv-ai">${ic('check',18,2.2)}</span><b class="fv-an">${compTxt(FCLOSED[0][0]).slice(0,3)}</b><span class="fv-at"><b>último mês fechado</b><span>${monthName(FCLOSED[0][0])}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a brand" data-a="nav" data-v="fprev"><span class="fv-ai">${ic('users',18)}</span><b class="fv-an">${R0(pcCom())}</b><span class="fv-at"><b>com as pessoas</b><span>ainda não chegou à conta</span></span>${ic('arrowR',15,2)}</button></div>
 <section class="card fv-flow rise" style="--d:3"><div class="sh"><div><h2>Para onde foi cada real de setembro</h2><p class="who" style="margin:4px 0 0">De ${R0(E)} que entraram, ${R0(Sx)} saíram — o resto ficou no caixa.</p></div><button class="btn ghost sm" data-a="nav" data-v="frel">Ver DRE ${ic('arrowR',13,2)}</button></div>
  <p class="fl fv-lb"><i class="e"></i>Entrou</p><div class="fv-bar">${ent.map(([c,v])=>seg(c,v.e,E,'in')).join('')}</div>
  <div style="height:16px"></div>
  <p class="fl fv-lb"><i class="s"></i>Saiu · e o que ficou</p><div class="fv-bar">${sai.map(([c,v])=>seg(c,v.s,E,'out')).join('')}<span class="fv-sg keep" style="flex:${E-Sx}"><b>Ficou no caixa</b><small>${R0(E-Sx)} · ${Math.round((E-Sx)/E*100)}%</small></span></div>
  <div class="fv-key">${sai.map(([c,v])=>`<span><i style="background:var(--tone-${tone(c)})"></i>${esc(c)} <b>${R0(v.s)}</b></span>`).join('')}</div></section>`;
}
/* ---------- Lançamentos ---------- */
function fLanc(){
 const q=norm(S.lq),all=LANCS.slice().sort((a,b)=>a.d<b.d?1:-1),l=all.filter(x=>(S.lf==='todos'||(S.lf==='pend'?x.st==='pend':x.tipo===S.lf&&x.st==='ok'))&&(!q||norm(x.desc+' '+x.cat).includes(q))),ok=okL();
 return fHead('Lançamentos','Entradas e saídas do caixa',`${rpBtn('financeiro','lancamentos')}<button class="btn pri" data-a="lcNew">${ic('plus',15,2.2)}Novo lançamento</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Entradas em setembro</span><span class="kv" style="color:var(--st-int)">${R$(sumT(ok,'e'))}</span><span class="kd">${ok.filter(x=>x.tipo==='e').length} lançamentos</span></div><div class="k4"><span class="kl">Saídas em setembro</span><span class="kv" style="color:var(--st-rec)">${R$(sumT(ok,'s'))}</span><span class="kd">${ok.filter(x=>x.tipo==='s').length} lançamentos</span></div><div class="k4"><span class="kl">Saldo</span><span class="kv">${R$(sumT(ok,'e')-sumT(ok,'s'))}</span><span class="kd">competência set/2026</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv" style="${LANCS.some(x=>x.st==='pend')?'color:var(--st-sol)':''}">${LANCS.filter(x=>x.st==='pend').length}</span><span class="kd">ainda não contam no saldo</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="lq" placeholder="Buscar descrição ou categoria" value="${esc(S.lq)}" autocomplete="off"></label><div class="chips">${[['todos','Todos'],['e','Entradas'],['s','Saídas'],['pend','Aguardando']].map(c=>`<button class="chipf ${S.lf===c[0]?'on':''}" data-a="lcF" data-v="${c[0]}">${c[0]==='e'?'<i style="background:var(--st-int)"></i>':c[0]==='s'?'<i style="background:var(--st-rec)"></i>':''}${c[1]}</button>`).join('')}</div></div>
  ${l.length?`<div class="trow lc thead"><span>Lançamento</span><span>Categoria</span><span>Competência</span><span>Valor</span><span></span></div>${l.map(x=>`<div class="trow lc ${x.st==='pend'?'pend':''}" tabindex="0" data-a="lcEdit" data-v="${x.id}">
   <span class="tn"><span class="fi-dir ${x.tipo}">${ic(x.tipo==='e'?'arrowDn':'arrowUp',15,2.2)}</span><span class="hn"><b>${esc(x.desc)}</b><span>${dBR(x.d)}${x.rev?' · revertido':''}${x.st==='pend'?` · <span class="fi-pend">${ic('clock',11)}aguardando aprovação</span>`:''}</span></span></span>
   <span class="lc-c">${catTag(x.cat)}</span><span class="lc-m">${compTxt(x.comp)}</span>
   <span class="lc-v ${x.tipo}">${R$(x.tipo==='e'?x.v:-x.v,true)}</span>
   <span class="hact" style="position:relative"><button class="ibtn sm" data-a="lcMenu" data-v="${x.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="lcPop-${x.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="lcEdit" data-v="${x.id}">${ic('pen',16)}Editar</button><button class="pi" data-a="lcDup" data-v="${x.id}">${ic('copy',16)}Duplicar</button><hr>${x.st==='pend'?`<button class="pi danger" data-a="lcDel" data-v="${x.id}">${ic('x',16)}Excluir</button>`:`<button class="pi danger" data-a="lcRev" data-v="${x.id}">${ic('swap',16)}Reverter</button>`}</div></span></div>`).join('')}`:'<div class="mempty"><p>Nenhum lançamento aqui.</p><span>Nada corresponde a esse filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} lançamento${l.length===1?'':'s'}</span><span>Saldo do filtro <b>${R$(l.filter(x=>x.st==='ok').reduce((a,x)=>a+(x.tipo==='e'?x.v:-x.v),0))}</b></span></div></section>`;
}
function lcForm(id){const x=id?LANCS.find(y=>y.id===id):null,v=x?{...x}:{tipo:'e',desc:'',cat:'',v:'',comp:'2026-09',d:NOWD};
 openDlg(`${dlgHead(x?'Editar lançamento':'Novo lançamento',x?(x.st==='pend'?'Ainda aguardando aprovação.':`Lançado por ${esc(x.who)}`):'')}
  ${x?'':`<p class="fi-note">${ic('info',14)}<span>Entra como <b>pendente de aprovação</b> e só passa a contar no saldo depois que o Admin aprovar.</span></p>`}
  <form id="lcF" class="fgrid" novalidate>
   <div class="fld wide"><div class="fi-tg"><button type="button" data-tp="e" class="${v.tipo==='e'?'on':''}">${ic('arrowDn',15,2.2)}Entrada</button><button type="button" data-tp="s" class="${v.tipo==='s'?'on':''}">${ic('arrowUp',15,2.2)}Saída</button></div></div>
   <label class="fld wide fi-val"><span class="fl">Valor</span><span class="fi-amt"><em>R$</em><input name="v" inputmode="decimal" value="${v.v?String(v.v).replace('.',','):''}" placeholder="0,00" autocomplete="off"></span></label>
   <label class="fld wide"><span class="fl">Descrição</span><input name="desc" value="${esc(v.desc)}" placeholder="Ex.: Dízimos e ofertas — culto de domingo" autocomplete="off"></label>
   <div class="fld wide"><span class="fl">Categoria</span><div class="fi-cats2" id="lcC"></div></div>
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${v.d}"></label>
   <label class="fld"><span class="fl">Competência</span><input type="month" name="comp" value="${v.comp}"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="lcOk">${x?'Salvar':'Enviar para aprovação'}</button></div></form>`);
 const f=$('#lcF'),ok=$('#lcOk');let tp=v.tipo,cat=v.cat;
 const rc=()=>{$('#lcC').innerHTML=Object.entries(FCATS).filter(c=>c[1][1]===tp).map(([c,t])=>`<button type="button" class="${c===cat?'on':''}" data-c="${esc(c)}" style="--t:var(--tone-${t[0]});--ti:var(--tone-${t[0]}-ink)">${esc(c)}</button>`).join('');$$('#lcC button').forEach(b=>b.onclick=()=>{cat=b.dataset.c;rc();chk();});};
 const val=()=>+String(f.v.value).replace(/\./g,'').replace(',','.')||0;
 const chk=()=>{ok.disabled=!(val()>0)||!f.desc.value.trim()||!cat;f.querySelector('.fi-amt').className='fi-amt '+tp;};
 $$('[data-tp]',f).forEach(b=>b.onclick=()=>{tp=b.dataset.tp;$$('[data-tp]',f).forEach(y=>y.classList.toggle('on',y===b));if(!FCATS[cat]||FCATS[cat][1]!==tp)cat='';rc();chk();});
 f.addEventListener('input',chk);rc();chk();setTimeout(()=>f.v.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={tipo:tp,v:val(),desc:f.desc.value.trim(),cat,d:f.d.value||NOWD,comp:f.comp.value||'2026-09'};
  if(x){Object.assign(x,o);const a=APROVS.find(a=>a.lid===x.id);if(a)Object.assign(a,{desc:o.desc,v:o.v,tp:o.tipo,cat:o.cat});closeDlg();fRe();toast('Lançamento atualizado');}
  else{const n=LC(o.d,o.comp,o.desc,o.cat,o.tipo,o.v,'pend');LANCS.push(n);APROVS.push(AP('lanc',o.desc,o.v,o.d,'Rafael Pereira',{tp:o.tipo,cat:o.cat,lid:n.id}));closeDlg();fRe();toast('Enviado para aprovação',()=>{LANCS.splice(LANCS.indexOf(n),1);APROVS.splice(APROVS.findIndex(a=>a.lid===n.id),1);fRe();});}},600);});}

/* ---------- Contas a pagar ---------- */
function fPag(){
 const open=PAGAR.filter(p=>!p.paid).sort((a,b)=>a.venc<b.venc?-1:1),late=open.filter(p=>dDays(p.venc)<0),wk=open.filter(p=>dDays(p.venc)>=0&&dDays(p.venc)<=7),lt=open.filter(p=>dDays(p.venc)>7),paid=PAGAR.filter(p=>p.paid);
 const grp=(t,l,cls)=>l.length?`<div class="fi-grp ${cls}"><p class="fi-gh"><b>${t}</b><span>${l.length} · ${R$(l.reduce((a,p)=>a+p.v,0))}</span></p>${l.map(p=>{const d=dDays(p.venc);return `<div class="fi-bill" id="${p.id}"><span class="fi-due ${cls}"><b>${+p.venc.slice(8)}</b><small>${MONTHS[+p.venc.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(p.desc)}</b><span>${catTag(p.cat)} <span class="${cls==='late'?'fi-latetx':''}">${d<0?`venceu há ${-d} dia${d===-1?'':'s'}`:d===0?'vence hoje':`vence ${relD(p.venc)}`}</span></span></span><b class="fi-amt2">${R$(p.v)}</b><button class="btn ${cls==='late'?'pri':'sec'} sm" data-a="cpPay" data-v="${p.id}">${ic('check',14,2.4)}Dar baixa</button></div>`;}).join('')}</div>`:'';
 return fHead('Contas a pagar','O que a igreja precisa pagar e quando',`${rpBtn('financeiro','pagar')}<button class="btn pri" data-a="cpNew">${ic('plus',15,2.2)}Nova conta</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Em aberto</span><span class="kv">${R$(open.reduce((a,p)=>a+p.v,0))}</span><span class="kd">${open.length} contas</span></div><div class="k4"><span class="kl">Atrasadas</span><span class="kv" style="${late.length?'color:var(--st-rec)':''}">${late.length}</span><span class="kd">${late.length?R$(late.reduce((a,p)=>a+p.v,0)):'nenhuma'}</span></div><div class="k4"><span class="kl">Próximos 7 dias</span><span class="kv" style="color:var(--st-sol)">${wk.length}</span><span class="kd">${R$(wk.reduce((a,p)=>a+p.v,0))}</span></div><div class="k4"><span class="kl">Pagas no mês</span><span class="kv">${paid.length}</span><span class="kd">${R$(paid.reduce((a,p)=>a+p.v,0))}</span></div></section>
 <section class="card fi-bills rise" style="--d:2">${open.length?grp('Atrasadas',late,'late')+grp('Próximos 7 dias',wk,'soon')+grp('Depois',lt,'later'):'<div class="mempty"><p>Tudo pago 🎉</p><span>Nenhuma conta em aberto.</span></div>'}
  ${paid.length?`<details class="fi-paid"><summary>${ic('check',13,2.4)}${paid.length} paga${paid.length===1?'':'s'} este mês</summary>${paid.map(p=>`<div class="fi-bill done"><span class="fi-due"><b>${+p.venc.slice(8)}</b><small>${MONTHS[+p.venc.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(p.desc)}</b><span>${catTag(p.cat)}${p.paidAt?` · baixa em ${dBR(p.paidAt)}`:''}${p.link?' · vinculada a um lançamento':''}</span></span><b class="fi-amt2">${R$(p.paidV||p.v)}</b><button class="btn ghost sm" data-a="cpUnpay" data-v="${p.id}">Desfazer</button></div>`).join('')}</details>`:''}</section>`;
}
function cpForm(){openDlg(`${dlgHead('Nova conta a pagar','Ela aparece na lista e avisamos 2 dias antes do vencimento.')}<form id="cpF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Descrição</span><input name="desc" placeholder="Ex.: Energia elétrica — outubro" autocomplete="off"></label>
  <label class="fld"><span class="fl">Valor</span><span class="fi-amt s"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00"></span></label>
  <label class="fld"><span class="fl">Vencimento</span><input type="date" name="venc" value="${addD(NOWD,7)}"></label>
  <label class="fld wide"><span class="fl">Categoria</span><span class="selw"><select name="cat">${Object.entries(FCATS).filter(c=>c[1][1]==='s').map(c=>`<option>${c[0]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <label class="tog wide"><input type="checkbox" name="rec"><span class="sw"></span><span><b>Repete todo mês</b><small>Criamos a próxima automaticamente quando esta for paga</small></span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Adicionar conta</button></div></form>`);
 const f=$('#cpF'),ok=f.querySelector('[type=submit]'),val=()=>+String(f.v.value).replace(/\./g,'').replace(',','.')||0;f.addEventListener('input',()=>ok.disabled=!f.desc.value.trim()||!(val()>0)||!f.venc.value);setTimeout(()=>f.desc.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;PAGAR.push(CP(f.desc.value.trim(),f.venc.value,val(),f.cat.value));closeDlg();fRe();toast('Conta adicionada');});}

/* ---------- Contas a receber ---------- */
function fRec(){
 const tot=RECEB.reduce((a,r)=>a+r.v,0),got=RECEB.filter(r=>r.got>=r.v).reduce((a,r)=>a+r.v,0);
 return fHead('Contas a receber','Valores previstos de entrada, cadastrados à mão',`${rpBtn('financeiro','receber')}`)
 +`<p class="fi-note rise" style="--d:1">${ic('info',14)}<span>Previsão manual: <b>não lança</b> no livro caixa. Serve para ter previsibilidade do que vai entrar.</span></p>
 <section class="card fi-rh rise" style="--d:1"><div><span class="kl">Já recebido</span><b class="fi-big">${R$(got)}</b><span class="kd">de ${R$(tot)} previstos</span></div><div class="fi-two"><div><span><i class="e"></i>Recebido</span><b>${R$(got)}</b></div><div><span><i class="w"></i>Falta receber</span><b>${R$(tot-got)}</b></div><div><span>Recebidas</span><b>${RECEB.filter(r=>r.got>=r.v).length} de ${RECEB.length}</b></div></div></section>
 <div class="fi-recs rise" style="--d:2">${RECEB.map(r=>{const done=r.got>=r.v;return `<article class="card fi-rc"><div class="fi-rch"><span class="dkt"><b>${esc(r.desc)}</b><span>${esc(r.src)}</span></span>${done?'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Recebida</span>':'<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>Prevista</span>'}</div>
  <div class="fi-rcv"><b>${R$(r.v)}</b><span>${done?'recebida':'prevista'}</span></div>
  <footer><span>${r.prev?`${ic('calendar',12)}Previsão ${dBR(r.prev)}`:`${ic('clock',12)}Sem data prevista`}</span></footer></article>`;}).join('')}</div>`;
}

/* ---------- Aprovações ---------- */
function fApr(){
 return fHead('Aprovações','Lançamentos e importações aguardando o Admin',APROVS.length>1?`<button class="btn pri" data-a="apAll">${ic('check',15,2.4)}Aprovar todos (${APROVS.length})</button>`:'')
 +`<p class="fi-note rise" style="--d:1">${ic('shield',15)}<span>Todo lançamento manual e toda importação de extrato nasce aqui. Só depois de aprovado entra no saldo. Só o Admin aprova, inclusive o que ele mesmo lançou.</span></p>
 ${APROVS.length?`<div class="fi-aps rise" style="--d:2">${APROVS.map(a=>`<article class="card fi-ap" id="${a.id}"><div class="fi-aph"><span class="htile" style="--s:42px;background:${a.tipo==='imp'?'var(--st-sol-bg)':'var(--brand-soft)'};color:${a.tipo==='imp'?'var(--st-sol)':'var(--brand-text)'}">${ic(a.tipo==='imp'?'upload':a.tp==='e'?'arrowDn':'arrowUp',19,2)}</span>
   <span class="dkt"><span class="fi-apt">${a.tipo==='imp'?'Importação de extrato':'Lançamento manual'}</span><b>${esc(a.desc)}${a.tipo==='imp'?` — ${a.n} lançamentos`:''}</b><span>Enviado por ${esc(a.who)} · ${dBR(a.d)}</span></span>
   ${a.tipo==='imp'?`<span class="fi-apv"><b class="e">+${R0(a.te)}</b><b class="s">−${R0(a.ts)}</b></span>`:`<span class="fi-apv"><b class="${a.tp}">${R$(a.tp==='e'?a.v:-a.v,true)}</b>${catTag(a.cat)}</span>`}</div>
  ${a.tipo==='imp'?`<button class="fi-apx" data-a="apX" data-v="${a.id}">${ic('chevD',14,2)}${S.apOpen===a.id?'Esconder':'Ver'} os lançamentos (${a.ent} entradas, ${a.sai} saídas)</button>${S.apOpen===a.id?`<div class="fi-apr">${a.rows.map(r=>`<div><span>${r[0]}</span><span>${esc(r[1])}</span>${catTag(r[2])}<b class="${r[3]}">${R$(r[3]==='e'?r[4]:-r[4],true)}</b></div>`).join('')}<p class="who">+ ${a.n-a.rows.length} lançamentos · categorias sugeridas automaticamente</p></div>`:''}`:''}
  <footer><button class="btn ghostd sm" data-a="apNo" data-v="${a.id}">Rejeitar</button><button class="btn pri sm" data-a="apOk" data-v="${a.id}">${ic('check',14,2.4)}Aprovar</button></footer></article>`).join('')}</div>`
 :`<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('check',30,2.6)}</span><h2>Tudo aprovado</h2><p>Quando alguém lançar algo ou importar um extrato, aparece aqui.</p></section>`}`;
}

/* ---------- Relatórios ---------- */
const REL0='2021-03',RELN='2026-09';
const ymAdd=(ym,n)=>{let [y,m]=ym.split('-').map(Number);m+=n;y+=Math.floor((m-1)/12);m=((m-1)%12+12)%12+1;return `${y}-${String(m).padStart(2,'0')}`;};
function relData(ym){const real=LANCS.filter(x=>x.st==='ok'&&x.comp===ym);if(real.length||ym>=RELN)return real;
 let h=0;for(const ch of ym)h=(h*31+ch.charCodeAt(0))%9973;const r=k=>{h=(h*9301+49297)%233280;return h/233280;};const yr=+ym.slice(0,4),g=1+(yr-2021)*.09,m=+ym.slice(5);
 const L=[['Dízimos','e',(19000+r()*5000)*g*(m===12?1.25:1)],['Ofertas','e',(1800+r()*1400)*g],['Doações','e',r()<.55?(1500+r()*5000)*g:0],['Estrutura','s',3000*g+r()*400],['Manutenção','s',200+r()*1300],['Comunicação','s',r()<.6?300+r()*900:0],['Missões','s',r()<.5?800+r()*1800:0],['Ministérios','s',400+r()*900]];
 return L.filter(x=>x[2]>0).map(x=>({cat:x[0],tipo:x[1],v:Math.round(x[2]/10)*10}));}
const mpRe=()=>{const o=$('#mpPop');o.outerHTML=mpick();const n=$('#mpPop');n.classList.add('open','mp-in');};
function mpick(){const [y]=S.relM.split('-').map(Number),yy=S.mpY||y,ny=+RELN.slice(0,4),oy=+REL0.slice(0,4);
 return `<div class="mp-pop pop" id="mpPop"><div class="mp-yh"><button class="ibtn sm" data-a="mpY" data-v="-1" ${yy<=oy?'disabled':''} aria-label="Ano anterior">${ic('chevL',14,2)}</button><button class="mp-yy" data-a="mpYears">${yy}${ic('chevD',13,2)}</button><button class="ibtn sm" data-a="mpY" data-v="1" ${yy>=ny?'disabled':''} aria-label="Próximo ano">${ic('chevR',14,2)}</button></div>
  ${S.mpYears?`<div class="mp-yrs">${Array.from({length:ny-oy+1},(_,i)=>oy+i).reverse().map(x=>`<button class="${x===yy?'on':''}" data-a="mpPickY" data-v="${x}">${x}</button>`).join('')}</div>`
  :`<div class="mp-grid">${MONTHS.map((n,i)=>{const ym=`${yy}-${String(i+1).padStart(2,'0')}`,dis=ym<REL0||ym>RELN;return `<button class="${ym===S.relM?'on':''} ${ym===RELN?'now':''}" data-a="relM" data-v="${ym}" ${dis?'disabled':''}>${n.slice(0,3)}</button>`;}).join('')}</div>`}
  <div class="mp-q">${[['Este mês',RELN],['Mês anterior',ymAdd(RELN,-1)],['Mesmo mês em '+(ny-1),ymAdd(RELN,-12)]].map(q=>`<button data-a="relM" data-v="${q[1]}" class="${S.relM===q[1]?'on':''}">${q[0]}</button>`).join('')}</div>
  <p class="mp-ft">${ic('clock',12)}Histórico desde ${monthName(REL0).toLowerCase()}</p></div>`;}
function fRel(){
 const l=relData(S.relM),cats={};l.forEach(x=>{cats[x.cat]=cats[x.cat]||{e:0,s:0};cats[x.cat][x.tipo]+=x.v;});
 const rows=Object.entries(cats).map(([c,v])=>[c,v.e,v.s,v.e-v.s]).sort((a,b)=>b[3]-a[3]),mx=Math.max(1,...rows.map(r=>Math.abs(r[3]))),e=sumT(l,'e'),s=sumT(l,'s');
 const ms=['2026-07','2026-08','2026-09'];
 return fHead('Relatórios','DRE por categoria e fluxo de caixa',`<button class="btn sec" data-a="export" data-v="o DRE (PDF)">${ic('file',15)}DRE (PDF)</button><button class="btn sec" data-a="export" data-v="o fluxo de caixa (CSV)">Fluxo de caixa (CSV)</button>`)
 +`<div class="fi-mbar rise" style="--d:1"><div class="mp"><button class="ibtn" data-a="relStep" data-v="-1" ${S.relM<=REL0?'disabled':''} aria-label="Mês anterior">${ic('chevL',16,2)}</button><div style="position:relative"><button class="mp-btn" data-a="mpMenu">${ic('calendar',16)}<b>${monthName(S.relM)}</b>${S.relM===RELN?'<em>mês atual</em>':''}${ic('chevD',14,2)}</button>${mpick()}</div><button class="ibtn" data-a="relStep" data-v="1" ${S.relM>=RELN?'disabled':''} aria-label="Próximo mês">${ic('chevR',16,2)}</button></div>${S.relM!==RELN?`<button class="lnk" data-a="relM" data-v="${RELN}">Voltar para o mês atual</button>`:''}</div>
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Resultado do mês</span><span class="kv" style="color:${e-s>=0?'var(--st-int)':'var(--st-rec)'}">${R$(e-s)}</span><span class="kd">receitas menos despesas</span></div><div class="k4"><span class="kl">Receitas</span><span class="kv">${R$(e)}</span><span class="kd">${rows.filter(r=>r[1]).length} categorias</span></div><div class="k4"><span class="kl">Despesas</span><span class="kv">${R$(s)}</span><span class="kd">${e?Math.round(s/e*100):0}% das receitas</span></div></section>
 <section class="card fi-dre rise" style="--d:2"><div class="sh"><h2>DRE por categoria · ${monthName(S.relM)}</h2></div>
  ${rows.length?`<div class="fi-dr thead"><span>Categoria</span><span>Entradas</span><span>Saídas</span><span>Resultado</span></div>${rows.map(r=>`<div class="fi-dr"><span>${catTag(r[0])}</span><span class="e">${r[1]?R$(r[1]):'—'}</span><span class="s">${r[2]?R$(r[2]):'—'}</span><span class="fi-net"><span class="fi-dv"><i class="${r[3]>=0?'p':'n'}" style="width:${Math.abs(r[3])/mx*50}%"></i></span><b class="${r[3]>=0?'e':'s'}">${R$(r[3],true)}</b></span></div>`).join('')}
  <div class="fi-dr tot"><span>Total</span><span class="e">${R$(e)}</span><span class="s">${R$(s)}</span><span class="fi-net"><span></span><b>${R$(e-s,true)}</b></span></div>`:'<div class="mempty"><p>Sem lançamentos aprovados neste mês.</p><span>Os dados de exemplo estão em setembro.</span></div>'}</section>
 ${modOn('secretaria')?`<p class="fi-note rise" style="--d:3">${ic('file',14)}<span>O <b>informe anual de doações</b> é emitido pela Secretaria. <button class="lnk" data-a="nav" data-v="sec-docs">Abrir Documentos</button></span></p>`:''}`;
}

/* ---------- Importar/Exportar ---------- */
const BANKS=[['bb','Banco do Brasil','#f8d117','#1b3d8f'],['brad','Bradesco','#cc092f','#fff'],['itau','Itaú','#ec7000','#fff'],['cef','Caixa','#005ca9','#fff'],['nu','Nubank','#820ad1','#fff'],['outro','Outro banco','var(--surface-2)','var(--ink-muted)']];
function fImp(){const b=BANKS.find(x=>x[0]===S.fbank);
 return fHead('Importar e exportar','Extratos bancários entram para aprovação; relatórios saem em CSV')
 +`<div class="fi-io rise" style="--d:1"><section class="card fi-imp"><h2>${ic('upload',16)} Importar extrato</h2>
   <p class="fl">1. Banco</p><div class="fi-banks">${BANKS.map(x=>`<button class="${S.fbank===x[0]?'on':''}" data-a="fBank" data-v="${x[0]}"><span style="background:${x[2]};color:${x[3]}">${x[0]==='outro'?ic('building',14):x[1][0]}</span>${x[1]}</button>`).join('')}</div>
   <p class="fl">2. Arquivo</p>${S.ffile?`<div class="ct-file"><span class="mt-ft" style="--s:38px;height:38px;border-radius:10px;background:var(--st-sol-bg);color:var(--st-sol)">OFX</span><span class="dkt"><b>${esc(S.ffile)}</b><span>${b[1]} · 23 transações encontradas</span></span><button class="ibtn sm" data-a="fFileX" aria-label="Remover">${ic('x',13)}</button></div>`:`<div class="ct-drop" data-a="fFile">${ic('upload',18)}<span><b>Arraste o extrato aqui ou clique para escolher</b><small>OFX ou CSV exportado do internet banking</small></span></div>`}
   <div class="fi-impf"><span class="who">${ic('shield',13)} Entra como pendente em <button class="lnk" data-a="nav" data-v="fapr">Aprovações</button>. Lançamentos repetidos são ignorados.</span><button class="btn pri" data-a="fImport" ${S.ffile?'':'disabled'}>Importar</button></div></section>
  <section class="card fi-exp"><h2>${ic('arrowDn',16,2)} Exportar</h2>${[['Lançamentos','financeiro|lancamentos',LANCS.length+' registros','layers'],['Contas a pagar','financeiro|pagar',PAGAR.length+' contas','clock'],['Contas a receber','financeiro|receber',RECEB.length+' previsões','wallet'],['DRE do mês','o DRE (PDF)','Setembro/2026','file']].map(x=>`<button class="fi-ex" data-a="${x[1].includes('|')?'rptGo':'export'}" data-v="${x[1]}"><span class="htile" style="--s:38px;background:var(--brand-soft);color:var(--brand-text)">${ic(x[3],17)}</span><span class="dkt"><b>${x[0]}</b><span>${x[2]}</span></span><em>${x[1].includes('PDF')?'PDF':'CSV'}</em></button>`).join('')}</section></div>`;
}

/* ---------- Dados de exemplo: contas, fechamento e caixas (só leitura) ---------- */
const FCONTAS=[{n:'Conta principal',tipo:'Conta bancária',banco:'Banco do Brasil',ini:40000,atual:57830,desde:'2026-01-01',pend:1},{n:'Caixa físico',tipo:'Caixa físico',banco:'',ini:500,atual:1240,desde:'2026-01-01',pend:0}];
const FCLOSED=[['2026-08','Fechado'],['2026-07','Selado'],['2026-06','Selado']];
const PCAIXAS=[
 {g:'Eventos',n:'Retiro de Homens 2026',in:18400,out:6200,ret:0},
 {g:'Eventos',n:'Conferência Missões',in:9200,out:3100,ret:2000},
 {g:'Eventos',n:'Retiro de Jovens 2025',in:12000,out:9500,ret:0,closed:true},
 {g:'Ministérios',n:'Ministério Kids · Caixa principal',in:5600,out:2100,ret:0},
 {g:'Ministérios',n:'Ministério de Louvor · Caixa principal',in:4200,out:1850,ret:0},
 {g:'Cultos',n:'Culto de Domingo',in:3200,out:800,ret:0},
 {g:'Campanhas',n:'Campanha Reforma do Templo',in:34200,out:0,ret:0}];
const fSaldo=()=>FCONTAS.reduce((a,c)=>a+c.atual,0);
const pcVivos=()=>PCAIXAS.filter(c=>!c.closed||c.in-c.out>0);
const pcCom=()=>pcVivos().reduce((a,c)=>a+c.in-c.out,0);

/* ---------- Contas financeiras ---------- */
function fCon(){
 return fHead('Contas financeiras','Onde está o dinheiro da igreja',`<button class="btn sec" data-a="fTransf">${ic('swap',15)}Transferir</button>`)
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Saldo total</span><span class="kv">${R$(fSaldo())}</span><span class="kd">somando todas as contas</span></div><div class="k4"><span class="kl">Contas ativas</span><span class="kv">${FCONTAS.length}</span><span class="kd">uma conta bancária e um caixa físico</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv">${APROVS.length}</span><span class="kd">ainda não contam no saldo</span></div></section>
 <section class="card fi-bills rise" style="--d:2">${FCONTAS.map(c=>`<div class="fi-bill"><span class="htile" style="--s:42px;background:var(--brand-soft);color:var(--brand-text)">${ic(c.banco?'building':'wallet',19,2)}</span><span class="dkt"><b>${esc(c.n)}</b><span>${esc(c.tipo)}${c.banco?' · '+esc(c.banco):''} · saldo inicial ${R$(c.ini)} em ${dBR(c.desde)}${c.pend?` · ${c.pend} pendente`:''}</span></span><b class="fi-amt2">${R$(c.atual)}</b></div>`).join('')}</section>`;
}

/* ---------- Previsibilidade (só leitura) ---------- */
function fPrev(){
 const tab=S.fpv||'cx',vw=S.fpvC||'ab',mes=FOOD_DATE.slice(0,7),ant=ymAdd(mes,-1);
 const list=PCAIXAS.filter(c=>vw==='ab'?!c.closed:(c.closed&&c.in-c.out>0)),com=pcCom(),ret=pcVivos().reduce((a,c)=>a+c.ret,0);
 const vd=(k,f)=>foodSummary(FOOD_SALES.filter(s=>s.store===k&&f(s.date))),stores=Object.entries(FOOD_STORES).filter(([k])=>['cafe','rest','shop'].includes(k));
 const rows=stores.map(([k,st])=>({n:st.name,h:vd(k,d=>d===FOOD_DATE),m:vd(k,d=>d.startsWith(mes)),a:vd(k,d=>d.startsWith(ant))}));
 const vm=rows.reduce((a,r)=>a+r.m.sold,0)/100;
 const cell=m=>`<span>${brl2(m.sold/100)}<small class="who" style="display:block">${m.count} ${m.count===1?'venda':'vendas'}</small></span>`;
 const caixas=()=>{const gs=['Eventos','Ministérios','Cultos','Campanhas'].map(g=>[g,list.filter(c=>c.g===g)]).filter(x=>x[1].length);
  if(!gs.length)return '<div class="mempty"><p>Nenhum caixa aqui.</p><span>Não há caixa encerrado com saldo.</span></div>';
  const tot=list.reduce((a,c)=>a+c.in-c.out,0);
  return `<div class="fi-dr thead"><span>Caixa</span><span>Entradas</span><span>Saídas</span><span>No caixa</span></div>`
  +gs.map(([g,l])=>`<div class="fi-grp later"><p class="fi-gh"><b>${g}</b><span>${l.length} · ${R$(l.reduce((a,c)=>a+c.in-c.out,0))}</span></p>${l.map(c=>`<div class="fi-dr"><span><b>${esc(c.n)}</b>${c.closed?' <span class="who">· encerrado</span>':''}<small class="who" style="display:block">${c.ret?`já devolvido à igreja ${R$(c.ret)}`:'nada devolvido à igreja ainda'}</small></span><span class="e">${R$(c.in)}</span><span class="s">${R$(c.out)}</span><span class="fi-net"><span></span><b>${R$(c.in-c.out)}</b></span></div>`).join('')}</div>`).join('')
  +`<div class="fi-dr tot"><span>Total com as pessoas</span><span></span><span></span><span class="fi-net"><span></span><b>${R$(tot)}</b></span></div>`;};
 const vendas=()=>`<div class="fi-dr thead"><span>Estabelecimento</span><span>Hoje</span><span>Neste mês</span><span>Mês anterior</span></div>`
  +rows.map(r=>`<div class="fi-dr"><span><b>${esc(r.n)}</b></span>${cell(r.h)}${cell(r.m)}${cell(r.a)}</div>`).join('')
  +`<div class="fi-dr tot"><span>Total</span><span>${brl2(rows.reduce((a,r)=>a+r.h.sold,0)/100)}</span><span>${brl2(vm)}</span><span>${brl2(rows.reduce((a,r)=>a+r.a.sold,0)/100)}</span></div>`;
 return fHead('Previsibilidade','O dinheiro que ainda não chegou à conta da igreja')
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Com as pessoas</span><span class="kv">${R$(com)}</span><span class="kd">nos caixas abertos e nos encerrados com saldo</span></div><div class="k4"><span class="kl">Já devolvido à igreja</span><span class="kv">${R$(ret)}</span><span class="kd">saídas de devolução dos caixas</span></div><div class="k4"><span class="kl">Vendido no mês</span><span class="kv">${R$(vm)}</span><span class="kd">Cafeteria, Restaurante e Loja (bruto)</span></div></section>`
 +sxSeg('fpvTab',[['cx','Caixas'],['vd','Vendas']],tab)
 +`<section class="card mtab rise" style="--d:3">${tab==='cx'
  ?`<div class="tbar"><div class="chips">${[['ab','Abertos'],['en','Encerrados com saldo']].map(c=>`<button class="chipf ${vw===c[0]?'on':''}" data-a="fpvC" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div><p class="fi-note">${ic('info',14)}<span>Dinheiro que ainda não chegou à conta da igreja. É só leitura: a baixa é feita em cada caixa.</span></p>${caixas()}`
  :`<p class="fi-note">${ic('info',14)}<span>Só leitura: o que as vendas rendem entra na conta pelo extrato, e nada aqui vira lançamento.</span></p>${vendas()}`}</section>`;
}

/* ---------- Configurar ---------- */
function fCfg(){
 const tab=S.fcfg||'cat';
 const cat=()=>`<div class="fi-bills">${Object.entries(FCATS).map(([c,t])=>`<div class="fi-bill"><span class="dkt"><b>${catTag(c)}</b><span>${t[1]==='e'?'Entrada':'Saída'}</span></span></div>`).join('')}</div>`;
 const stp=(l,c,b)=>`<span class="stp" style="--c:${c};--b:${b}"><i></i>${l}</span>`;
 const fech=()=>`<div class="fi-bills">${FCLOSED.map(([ym,s])=>`<div class="fi-bill"><span class="dkt"><b>${monthName(ym)}</b><span>${s==='Fechado'?'Último mês fechado: ainda pode ser reaberto pelo Admin':'Selado: não pode mais ser reaberto'}</span></span>${s==='Fechado'?stp('Fechado','var(--st-int)','var(--st-int-bg)'):stp('Selado','var(--ink-muted)','var(--surface-2)')}</div>`).join('')}
  <div class="fi-bill"><span class="dkt"><b>${monthName('2026-09')}</b><span>${APROVS.length} ${APROVS.length===1?'item aguardando aprovação impede':'itens aguardando aprovação impedem'} o fechamento</span></span><button class="btn sec sm" disabled>Fechar setembro</button></div></div>`;
 return fHead('Configurar','Categorias e fechamento do mês')
 +sxSeg('fCfgTab',[['cat','Categorias',Object.keys(FCATS).length],['fech','Fechamento']],tab)
 +`<section class="card mtab rise" style="--d:3">${tab==='cat'?cat():fech()}</section>`;
}

function fAfter(){
 const q=$('#lq');if(q)q.addEventListener('input',e=>{S.lq=e.target.value;const c=e.target.selectionStart;fRe();const n=$('#lq');n.focus();n.setSelectionRange(c,c);});
}
const fGo=()=>{render();window.scrollTo({top:0});};
const fRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const FIA={
 fBar:v=>{S.fbar=+v;fRe();},
 lcNew:()=>lcForm(),lcEdit:(v,b,e)=>{if(e&&e.target.closest('.hact')&&!e.target.closest('.pi'))return;closePops();lcForm(v);},lcF:v=>{S.lf=v;fRe();},
 lcMenu:v=>{const p=$('#lcPop-'+v);closePops(p);p.classList.toggle('open');},
 lcDup:v=>{closePops();const x=LANCS.find(y=>y.id===v);lcForm();setTimeout(()=>{const f=$('#lcF');f.desc.value=x.desc;f.v.value=String(x.v).replace('.',',');$(`[data-tp=${x.tipo}]`).click();setTimeout(()=>{const b=$(`#lcC [data-c="${x.cat}"]`);b&&b.click();},20);},30);},
 lcDel:v=>{closePops();const x=LANCS.find(y=>y.id===v);confirmDel({title:'Excluir este lançamento?',body:`“${esc(x.desc)}” · ${R$(x.v)}. ${x.st==='ok'?'O saldo do mês será recalculado.':'Ele também sai das aprovações.'}`,onConfirm:()=>{const i=LANCS.indexOf(x),ai=APROVS.findIndex(a=>a.lid===x.id),ap=ai>=0?APROVS.splice(ai,1)[0]:null;LANCS.splice(i,1);fRe();toast('Lançamento excluído',()=>{LANCS.splice(i,0,x);if(ap)APROVS.splice(ai,0,ap);fRe();});}});},
 cpNew:()=>cpForm(),
 cpPay:v=>{const p=PAGAR.find(x=>x.id===v),ls=LANCS.filter(l=>l.tipo==='s'&&l.st==='ok');
  openDlg(`${dlgHead('Dar baixa na conta',`${esc(p.desc)} · previsto ${R$(p.v)}`)}
  <p class="fi-note">${ic('info',14)}<span>Dar baixa <b>não lança</b> no livro caixa. Para registrar a saída, faça um lançamento ou importe o extrato.</span></p>
  <form id="cpB" class="fgrid" novalidate>
   <label class="fld"><span class="fl">Pago em</span><input type="date" name="d" value="${NOWD}"></label>
   <label class="fld"><span class="fl">Valor pago <small>opcional</small></span><span class="fi-amt s"><em>R$</em><input name="v" inputmode="decimal" placeholder="${String(p.v).replace('.',',')}"></span></label>
   <label class="fld wide"><span class="fl">Vincular a um lançamento <small>opcional</small></span><span class="selw"><select name="l"><option value="">Sem vínculo</option>${ls.map(l=>`<option value="${l.id}">${esc(l.desc)} · ${R$(l.v)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">${ic('check',14,2.4)}Dar baixa</button></div></form>`,'sm');
  $('#cpB').addEventListener('submit',e=>{e.preventDefault();const f=e.target,pv=+String(f.v.value).replace(/\./g,'').replace(',','.')||p.v,el=document.getElementById(v);closeDlg();if(el)el.classList.add('fi-gone');
   setTimeout(()=>{Object.assign(p,{paid:true,paidAt:f.d.value||NOWD,paidV:pv,link:f.l.value||null});fRe();toast(`${p.desc} baixada · não lança no livro caixa`,()=>{p.paid=false;fRe();});},350);});},
 lcRev:v=>{closePops();const x=LANCS.find(y=>y.id===v);
  openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Reverter este lançamento?',`“${esc(x.desc)}” · ${R$(x.v)}. Em vez de apagar, o Alva cria o lançamento inverso e o original continua no histórico.`)}</div><label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="rvWhy" rows="2" placeholder="Ex.: valor lançado em duplicidade"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="rvOk" disabled>Reverter</button></div>`,'sm del');
  const w=$('#rvWhy'),b=$('#rvOk');w.addEventListener('input',()=>{b.disabled=!w.value.trim();});
  b.onclick=()=>{const n=LC(NOWD,x.comp,'Reversão: '+x.desc,x.cat,x.tipo==='e'?'s':'e',x.v,'ok','Rafael Pereira');LANCS.push(n);x.rev=true;closeDlg();fRe();toast('Lançamento revertido',()=>{LANCS.splice(LANCS.indexOf(n),1);x.rev=false;fRe();});};},
 fTransf:()=>toast('Transferir gera uma saída na origem e uma entrada no destino; entra como pendente em Aprovações'),
 fpvTab:v=>{S.fpv=v;fRe();},fpvC:v=>{S.fpvC=v;fRe();},fCfgTab:v=>{S.fcfg=v;fRe();},fCfgGo:v=>{S.fcfg=v;A.nav('fcfg');},
 cpUnpay:v=>{PAGAR.find(x=>x.id===v).paid=false;fRe();toast('Voltou para em aberto');},
 apX:v=>{S.apOpen=S.apOpen===v?null:v;fRe();},
 apOk:(v,b)=>{const a=APROVS.find(x=>x.id===v);busy(b,600,'Aprovado',()=>{document.getElementById(v).classList.add('fi-gone');setTimeout(()=>{APROVS.splice(APROVS.indexOf(a),1);if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l)l.st='ok';}fRe();toast(a.tipo==='imp'?`${a.n} lançamentos importados`:'Lançamento aprovado · já conta no saldo');},350);});},
 apNo:v=>{const a=APROVS.find(x=>x.id===v);openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Rejeitar?',`“${esc(a.desc)}” não entra no caixa. ${esc(a.who.split(' ')[0])} recebe o motivo.`)}</div><label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="apWhy" rows="2" placeholder="Ex.: valor diferente do comprovante"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="apNoOk">Rejeitar</button></div>`,'sm del');
  $('#apNoOk').onclick=()=>{APROVS.splice(APROVS.indexOf(a),1);if(a.lid){const i=LANCS.findIndex(x=>x.id===a.lid);if(i>=0)LANCS.splice(i,1);}closeDlg();fRe();toast('Rejeitado · motivo enviado');};},
 apAll:(v,b)=>busy(b,800,'Aprovados',()=>{const n=APROVS.length;APROVS.forEach(a=>{if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l)l.st='ok';}});APROVS.length=0;setTimeout(fRe,300);toast(`${n} itens aprovados`);}),
 relM:v=>{S.relM=v;S.mpY=null;S.mpYears=false;closePops();fRe();},
 relStep:v=>{const n=ymAdd(S.relM,+v);if(n<REL0||n>RELN)return;S.relM=n;S.mpY=null;fRe();},
 mpMenu:()=>{const p=$('#mpPop');const o=!p.classList.contains('open');closePops();if(o)p.classList.add('open');},
 mpY:(v,b,e)=>{e&&e.stopPropagation();S.mpY=(S.mpY||+S.relM.slice(0,4))+ +v;mpRe();},
 mpYears:(v,b,e)=>{e&&e.stopPropagation();S.mpYears=!S.mpYears;mpRe();},
 mpPickY:(v,b,e)=>{e&&e.stopPropagation();S.mpY=+v;S.mpYears=false;mpRe();},
 fBank:v=>{S.fbank=v;fRe();},fFile:()=>{S.ffile=`extrato-${S.fbank}-set2026.ofx`;fRe();},fFileX:()=>{S.ffile=null;fRe();},
 fImport:(v,b)=>busy(b,1000,'Importado',()=>{const bk=BANKS.find(x=>x[0]===S.fbank)[1];APROVS.push(AP('imp',`Extrato ${bk} (OFX)`,null,NOWD,'Rafael Pereira',{n:23,ent:17,sai:6,te:18420,ts:4210,rows:[['30/09','PIX recebido — J. Prado','Dízimos','e',300],['29/09','Boleto Sabesp','Estrutura','s',212],['29/09','PIX recebido — campanha','Doações','e',150]]}));S.ffile=null;setTimeout(fRe,400);toast('Extrato enviado para aprovação',null);}),
 
 
 
 
 
 
};

