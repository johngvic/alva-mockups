/* ================= Financeiro ================= */
const R$=(v,sign)=>`${sign&&v>0?'+':''}${v<0?'−':''}R$ ${Math.abs(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const R0=v=>`R$ ${Math.round(v).toLocaleString('pt-BR')}`;
/* ---------- Plano de contas, centros de custo e contatos (rodada 1 do redesenho · 05/11/2026) ---------- */
/* grupos da DRE, na ordem em que aparecem; 'x' = resultado financeiro (soma entradas e subtrai saídas) */
const DRG=[['rec','Receitas','e'],['ded','Deduções da receita','s'],['cdi','Custos diretos','s'],['pes','Despesas com pessoal','s'],['min','Despesas ministeriais e sociais','s'],['adm','Despesas administrativas','s'],['fin','Resultado financeiro','x']];
/* c = código gerencial; cc = código contábil (a definir com o contador); pr = quando reconhece: 'caixa' no pagamento, 'comp' na competência (provisão); fv = fixa ou variável */
const PLA=(c,n,g,t,tn,o={})=>({c,n,g,t,tn,cc:'',pr:'caixa',fv:t==='s'?'v':'',...o});
const PLANO=[
 PLA('1.01','Dízimos','rec','e','ceu',{cc:'3.1.1.01'}),PLA('1.02','Ofertas','rec','e','menta',{cc:'3.1.1.02'}),PLA('1.03','Doações','rec','e','lima',{cc:'3.1.1.03'}),PLA('1.04','Inscrições','rec','e','salvia',{pr:'comp'}),PLA('1.05','Vendas','rec','e','damasco'),PLA('1.06','Aluguel de espaços','rec','e','lima',{pr:'comp'}),
 PLA('2.01','Taxas de maquininha','ded','s','rosado'),PLA('2.02','Estornos de vendas','ded','s','damasco'),
 PLA('3.01','Custo de eventos','cdi','s','lima',{pr:'comp'}),PLA('3.02','Custo das vendas','cdi','s','salvia'),
 PLA('4.01','Salários','pes','s','ceu',{fv:'f',cc:'4.1.1.01',pr:'comp'}),PLA('4.02','Encargos e benefícios','pes','s','menta',{fv:'f',cc:'4.1.1.02',pr:'comp'}),PLA('4.03','Ajuda de custo pastoral','pes','s','lima',{fv:'f',cc:'4.1.1.03'}),
 PLA('5.01','Missões','min','s','lima'),PLA('5.02','Ministérios','min','s','menta'),PLA('5.03','Ação social','min','s','rosado'),
 PLA('6.01','Estrutura','adm','s','damasco',{fv:'f',cc:'4.2.1.01',pr:'comp'}),PLA('6.02','Manutenção','adm','s','salvia',{cc:'4.2.1.02'}),PLA('6.03','Comunicação','adm','s','rosado',{cc:'4.2.1.03'}),
 PLA('7.01','Rendimentos de aplicação','fin','e','ceu'),PLA('7.02','Tarifas bancárias','fin','s','salvia',{fv:'f'}),PLA('7.03','Juros e multas pagos','fin','s','rosado'),PLA('7.04','Juros e multas recebidos','fin','e','menta')];
const FCATS={};PLANO.forEach(a=>FCATS[a.n]=[a.tn,a.t]);
const catTag=c=>{const t=(FCATS[c]||['salvia'])[0];return `<span class="fi-cat" style="--t:var(--tone-${t});--ti:var(--tone-${t}-ink)">${esc(c)}</span>`;};
const CC0=(id,n,cod='')=>({id,n,cod,on:true});
const CCUSTOS=[CC0('cc1','Geral'),CC0('cc2','Cultos'),CC0('cc3','Cafeteria'),CC0('cc4','Restaurante'),CC0('cc5','Loja'),CC0('cc6','Eventos'),CC0('cc7','Ministério Kids'),CC0('cc8','Missões'),CC0('cc9','Reforma do Templo')];
const CTO=(id,n,doc,tp)=>({id,n,doc,tp});
const CONTATOS=[CTO('ct1','Companhia de Energia','00.111.222/0001-01','f'),CTO('ct2','Gráfica Rápida Ltda','00.111.222/0001-02','f'),CTO('ct3','Imobiliária Central','00.111.222/0001-03','f'),CTO('ct4','NetFácil Telecom','00.111.222/0001-04','f'),CTO('ct5','Seguradora Segura','00.111.222/0001-05','f'),CTO('ct6','Som & Luz Equipamentos','00.111.222/0001-06','f'),CTO('ct7','Distribuidora Limpa Bem','00.111.222/0001-07','f'),CTO('ct8','Associação Esportiva Vida','00.111.222/0001-08','c')];
let _lid=0;const LC=(d,comp,desc,cat,tipo,v,st='ok',who='Rafael Pereira',x={})=>({id:'lc'+(++_lid),d,comp,desc,cat,tipo,v,st,who,cc:'cc1',...x});
const LANCS=[
 LC('2026-09-17','2026-09','Dízimos e Ofertas — Culto Dom','Dízimos','e',12480,'ok','Rafael Pereira',{cc:'cc2'}),
 LC('2026-09-15','2026-09','Pagamento fornecedor gráfica','Comunicação','s',890,'ok','Rafael Pereira',{cc:'cc2',ct:'ct2'}),
 LC('2026-09-14','2026-09','Aluguel do salão','Estrutura','s',3200,'ok','Rafael Pereira',{ct:'ct3'}),
 LC('2026-09-12','2026-09','Campanha Retiro Jovens','Doações','e',5300,'ok','Rafael Pereira',{cc:'cc6'}),
 LC('2026-09-10','2026-09','Material de limpeza','Manutenção','s',340,'ok','Rafael Pereira',{ct:'ct7'}),
 LC('2026-09-07','2026-09','Dízimos e Ofertas — Culto Dom','Dízimos','e',11920,'ok','Rafael Pereira',{cc:'cc2'}),
 LC('2026-09-05','2026-08','Manutenção ar-condicionado','Manutenção','s',1200),
 LC('2026-09-29','2026-09','Oferta missionária — Culto de quarta','Ofertas','e',1860,'pend','Larissa Pires',{cc:'cc8'}),
];
/* exemplo: o resto de setembro e o histórico de abril a agosto, já aprovados, para a DRE ter o que mostrar */
[['2026-09-05','Salários — setembro','Salários','s',6800],['2026-09-05','Ajuda de custo pastoral','Ajuda de custo pastoral','s',4500],['2026-09-20','Encargos e benefícios — setembro','Encargos e benefícios','s',2060],
 ['2026-09-12','Vendas — Cafeteria','Vendas','e',3680,'cc3'],['2026-09-12','Vendas — Loja','Vendas','e',1190,'cc5'],['2026-09-12','Taxas de maquininha','Taxas de maquininha','s',148,'cc3'],
 ['2026-09-14','Ofertas — Culto Dom','Ofertas','e',2140,'cc2'],['2026-09-18','Ação social — cestas básicas','Ação social','s',620],['2026-09-19','Ministério de Louvor — material','Ministérios','s',780,'cc2'],
 ['2026-09-22','Oferta para Missões','Missões','s',1400,'cc8'],['2026-09-30','Tarifas bancárias','Tarifas bancárias','s',89.9],['2026-09-30','Rendimentos da aplicação','Rendimentos de aplicação','e',214.35],
 ['2026-09-20','Custo do Retiro de Jovens','Custo de eventos','s',2150,'cc6'],['2026-09-27','Inscrições — Retiro de Jovens 2026','Inscrições','e',10440,'cc6']
].forEach(r=>LANCS.push(LC(r[0],r[0].slice(0,7),r[1],r[2],r[3],r[4],'ok','Rafael Pereira',{cc:r[5]||'cc1'})));
{let s=7;const r=()=>{s=(s*9301+49297)%233280;return s/233280;},rd=(a,b)=>Math.round((a+(b-a)*r())/10)*10;
 ['2026-04','2026-05','2026-06','2026-07','2026-08'].forEach(ym=>{
  const P=(dia,desc,cat,tipo,v,cc)=>{if(v>0)LANCS.push(LC(`${ym}-${dia}`,ym,desc,cat,tipo,v,'ok','Rafael Pereira',{cc:cc||'cc1'}));};
  const ins=r()<.35?rd(4000,9000):0;
  P('07','Dízimos e Ofertas — Culto Dom','Dízimos','e',rd(10800,12600),'cc2');P('21','Dízimos e Ofertas — Culto Dom','Dízimos','e',rd(10600,12400),'cc2');P('14','Ofertas — Culto Dom','Ofertas','e',rd(1800,2500),'cc2');
  P('18','Campanha','Doações','e',r()<.7?rd(2000,5800):0,'cc9');P('12','Vendas — Cafeteria','Vendas','e',rd(3100,3900),'cc3');P('12','Vendas — Loja','Vendas','e',rd(800,1400),'cc5');
  P('15','Inscrições — retiro','Inscrições','e',ins,'cc6');P('16','Custo do retiro','Custo de eventos','s',ins?Math.round(ins*.3/10)*10:0,'cc6');P('13','Taxas de maquininha','Taxas de maquininha','s',rd(110,160),'cc3');
  P('05','Salários','Salários','s',6800);P('05','Ajuda de custo pastoral','Ajuda de custo pastoral','s',4500);P('20','Encargos e benefícios','Encargos e benefícios','s',2060);
  P('10','Aluguel do salão','Estrutura','s',3200);P('28','Energia elétrica','Estrutura','s',rd(580,720));P('08','Internet e telefonia','Estrutura','s',289);
  P('17','Manutenção','Manutenção','s',rd(200,1400));P('19','Comunicação','Comunicação','s',r()<.6?rd(300,900):0,'cc2');P('22','Missões','Missões','s',r()<.6?rd(800,1800):0,'cc8');
  P('23','Ministérios','Ministérios','s',rd(400,1300),'cc2');P('24','Ação social','Ação social','s',rd(450,900));P('30','Tarifas bancárias','Tarifas bancárias','s',89.9);P('30','Rendimentos da aplicação','Rendimentos de aplicação','e',rd(180,260));});}
/* títulos: contas a pagar e a receber têm contato, emissão, competência, conta do plano, centro de custo e baixas (parciais, com juros e desconto) */
const tPg=t=>(t.baixas||[]).reduce((a,b)=>a+b.v,0),tSd=t=>Math.max(0,Math.round((t.v-tPg(t))*100)/100);
let _pid2=0;const CP=(desc,venc,v,cat,ct,o={})=>({id:'cp'+(++_pid2),desc,venc,v,cat,ct,em:venc,comp:venc.slice(0,7),cc:'cc1',paid:false,baixas:[],...o});
const PAGAR=[
 CP('Energia elétrica','2026-09-28',640,'Estrutura','ct1',{em:'2026-09-10',comp:'2026-09'}),
 CP('Fornecedor gráfica — banners','2026-09-30',890,'Comunicação','ct2',{em:'2026-09-15',comp:'2026-09',cc:'cc2'}),
 CP('Aluguel do salão — Outubro','2026-10-05',3200,'Estrutura','ct3',{em:'2026-09-25'}),
 CP('Internet e telefonia','2026-10-08',289,'Estrutura','ct4',{em:'2026-09-28'}),
 CP('Seguro do prédio','2026-10-20',1150,'Estrutura','ct5',{em:'2026-09-20'}),
 CP('Equipamentos de som — parcela 2 de 3','2026-09-20',2400,'Manutenção','ct6',{em:'2026-08-20',comp:'2026-09',cc:'cc2',baixas:[{d:'2026-09-20',v:1000,j:0,dc:0,ids:[]}]}),
 CP('Material de limpeza','2026-09-10',340,'Manutenção','ct7',{em:'2026-09-01',comp:'2026-09',paid:true,paidAt:'2026-09-10',paidV:340,baixas:[{d:'2026-09-10',v:340,j:0,dc:0,ids:['lc5']}]})];
let _crid=0;const CR=(desc,prev,v,cat,ct,o={})=>({id:'cr'+(++_crid),desc,prev,v,got:0,src:'Cadastro manual',cat,ct,em:prev||'2026-09-01',comp:(prev||'2026-10').slice(0,7),cc:'cc1',baixas:[],...o});
const _insc=LANCS.find(l=>l.desc==='Inscrições — Retiro de Jovens 2026').id;
const RECEB=[
 CR('Inscrições — Retiro de Jovens 2026','2026-09-27',10440,'Inscrições','',{em:'2026-08-15',comp:'2026-09',cc:'cc6',got:10440,recAt:'2026-09-27',recV:10440,baixas:[{d:'2026-09-27',v:10440,j:0,dc:0,ids:[_insc]}]}),
 CR('Campanha Reforma do Templo','',80000,'Doações','',{em:'2026-07-01',comp:'2026-10',cc:'cc9'}),
 CR('Conferência Missões — inscrições','2026-10-09',4800,'Inscrições','',{em:'2026-09-10',comp:'2026-10',cc:'cc8'}),
 CR('Aluguel do salão — Associação Esportiva Vida','2026-09-25',1200,'Aluguel de espaços','ct8',{em:'2026-09-01',comp:'2026-09',got:400,recAt:'2026-09-25',recV:400,baixas:[{d:'2026-09-25',v:400,j:0,dc:0,ids:[]}]})];
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
const okL=()=>LANCS.filter(l=>l.st==='ok'&&!l.tr&&l.comp==='2026-09');
const sumT=(l,t)=>l.filter(x=>x.tipo===t).reduce((a,x)=>a+x.v,0);
const FLOW=[],fFlow=()=>{FLOW.length=0;['2026-04','2026-05','2026-06','2026-07','2026-08','2026-09'].forEach(ym=>{const l=LANCS.filter(x=>x.comp===ym&&x.st==='ok'&&!x.tr);FLOW.push([MONTHS[+ym.slice(5)-1].slice(0,3).replace(/^./,c=>c.toUpperCase()),sumT(l,'e'),sumT(l,'s')]);});};fFlow();
/* ajudas dos formulários: contas do plano, centros de custo e contatos */
const selw=(name,inner)=>`<span class="selw"><select name="${name}">${inner}</select>${ic('updown',14)}</span>`;
const optConta=(tp,sel)=>`<option value="">Escolha a conta…</option>`+DRG.map(g=>{const l=PLANO.filter(a=>a.g===g[0]&&a.t===tp&&(!FINAT.has(a.n)||a.n===sel));return l.length?`<optgroup label="${g[1]}">${l.map(a=>`<option value="${esc(a.n)}" ${a.n===sel?'selected':''}>${a.c} · ${esc(a.n)}</option>`).join('')}</optgroup>`:'';}).join('');
const optCC=sel=>CCUSTOS.filter(c=>c.on||c.id===sel).map(c=>`<option value="${c.id}" ${c.id===sel?'selected':''}>${esc(c.n)}</option>`).join('');
const optCt=(sel,k)=>`<option value="">Sem contato</option>`+CONTATOS.filter(c=>!k||c.tp==='a'||c.tp===k||c.id===sel).map(c=>`<option value="${c.id}" ${c.id===sel?'selected':''}>${esc(c.n)}</option>`).join('');
const ccN=id=>(CCUSTOS.find(c=>c.id===id)||{n:'—'}).n,ctN=id=>(CONTATOS.find(c=>c.id===id)||{n:''}).n,pVal=s=>+String(s).replace(/\./g,'').replace(',','.')||0;
const fHead=(t,lede,act='')=>`<header class="ph rise"><div><p class="eb">Financeiro</p><h1>${t}</h1><p class="lede">${lede}</p></div><div class="pact">${act}</div></header>`;
const dDays=iso=>Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);

/* ---------- Visão geral ---------- */
function fVis(){
 fFlow();const l=okL(),late=PAGAR.filter(p=>!p.paid&&dDays(p.venc)<0),soon=PAGAR.filter(p=>!p.paid&&dDays(p.venc)>=0&&dDays(p.venc)<=7);
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
  <button class="card fv-a wait" data-a="nav" data-v="ffech"><span class="fv-ai">${ic('check',18,2.2)}</span><b class="fv-an">${compTxt(FCLOSED[0][0]).slice(0,3)}</b><span class="fv-at"><b>último mês fechado</b><span>${monthName(FCLOSED[0][0])}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a brand" data-a="nav" data-v="fprev"><span class="fv-ai">${ic('users',18)}</span><b class="fv-an">${R0(pcCom())}</b><span class="fv-at"><b>com as pessoas</b><span>ainda não chegou à conta</span></span>${ic('arrowR',15,2)}</button></div>
 <section class="card fv-flow rise" style="--d:3"><div class="sh"><div><h2>Para onde foi cada real de setembro</h2><p class="who" style="margin:4px 0 0">De ${R0(E)} que entraram, ${R0(Sx)} saíram — o resto ficou no caixa.</p></div><button class="btn ghost sm" data-a="nav" data-v="frel">Ver DRE ${ic('arrowR',13,2)}</button></div>
  <p class="fl fv-lb"><i class="e"></i>Entrou</p><div class="fv-bar">${ent.map(([c,v])=>seg(c,v.e,E,'in')).join('')}</div>
  <div style="height:16px"></div>
  <p class="fl fv-lb"><i class="s"></i>Saiu · e o que ficou</p><div class="fv-bar">${sai.map(([c,v])=>seg(c,v.s,E,'out')).join('')}<span class="fv-sg keep" style="flex:${E-Sx}"><b>Ficou no caixa</b><small>${R0(E-Sx)} · ${Math.round((E-Sx)/E*100)}%</small></span></div>
  <div class="fv-key">${sai.map(([c,v])=>`<span><i style="background:var(--tone-${tone(c)})"></i>${esc(c)} <b>${R0(v.s)}</b></span>`).join('')}</div></section>`;
}
/* ---------- Lançamentos ---------- */
function fLanc(){
 const q=norm(S.lq),mm=S.relM,mn=MONTHS[+mm.slice(5)-1],all=LANCS.filter(x=>x.comp===mm).sort((a,b)=>a.d<b.d?1:-1),l=all.filter(x=>(S.lf==='todos'||(S.lf==='pend'?x.st==='pend':x.tipo===S.lf&&x.st==='ok'))&&(!q||norm(x.desc+' '+x.cat).includes(q))),ok=all.filter(x=>x.st==='ok'&&!x.tr);
 return fHead('Lançamentos',`Entradas e saídas · competência de ${monthName(mm)}`,`${rpBtn('financeiro','lancamentos')}<button class="btn pri" data-a="lcNew">${ic('plus',15,2.2)}Novo lançamento</button>`)
 +`${fMes()}<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Entradas em ${mn}</span><span class="kv" style="color:var(--st-int)">${R$(sumT(ok,'e'))}</span><span class="kd">${ok.filter(x=>x.tipo==='e').length} lançamentos</span></div><div class="k4"><span class="kl">Saídas em ${mn}</span><span class="kv" style="color:var(--st-rec)">${R$(sumT(ok,'s'))}</span><span class="kd">${ok.filter(x=>x.tipo==='s').length} lançamentos</span></div><div class="k4"><span class="kl">Saldo</span><span class="kv">${R$(sumT(ok,'e')-sumT(ok,'s'))}</span><span class="kd">competência ${compTxt(mm)}</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv" style="${all.some(x=>x.st==='pend')?'color:var(--st-sol)':''}">${all.filter(x=>x.st==='pend').length}</span><span class="kd">ainda não contam no saldo</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="lq" placeholder="Buscar descrição ou categoria" value="${esc(S.lq)}" autocomplete="off"></label><div class="chips">${[['todos','Todos'],['e','Entradas'],['s','Saídas'],['pend','Aguardando']].map(c=>`<button class="chipf ${S.lf===c[0]?'on':''}" data-a="lcF" data-v="${c[0]}">${c[0]==='e'?'<i style="background:var(--st-int)"></i>':c[0]==='s'?'<i style="background:var(--st-rec)"></i>':''}${c[1]}</button>`).join('')}</div></div>
  ${l.length?`<div class="trow lc thead"><span>Lançamento</span><span>Categoria</span><span>Competência</span><span>Valor</span><span></span></div>${l.map(x=>`<div class="trow lc ${x.st==='pend'?'pend':''}" tabindex="0" data-a="lcEdit" data-v="${x.id}">
   <span class="tn"><span class="fi-dir ${x.tipo}">${ic(x.tipo==='e'?'arrowDn':'arrowUp',15,2.2)}</span><span class="hn"><b>${esc(x.desc)}</b><span>${dBR(x.d)}${x.cc&&x.cc!=='cc1'?' · '+esc(ccN(x.cc)):''}${x.ct?' · '+esc(ctN(x.ct)):''}${x.rev?' · revertido':''}${x.st==='pend'?` · <span class="fi-pend">${ic('clock',11)}aguardando aprovação</span>`:''}</span></span></span>
   <span class="lc-c">${catTag(x.cat)}</span><span class="lc-m">${compTxt(x.comp)}</span>
   <span class="lc-v ${x.tipo}">${R$(x.tipo==='e'?x.v:-x.v,true)}</span>
   <span class="hact" style="position:relative"><button class="ibtn sm" data-a="lcMenu" data-v="${x.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="lcPop-${x.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="lcEdit" data-v="${x.id}">${ic('pen',16)}Editar</button><button class="pi" data-a="lcDup" data-v="${x.id}">${ic('copy',16)}Duplicar</button><hr>${x.st==='pend'?`<button class="pi danger" data-a="lcDel" data-v="${x.id}">${ic('x',16)}Excluir</button>`:`<button class="pi danger" data-a="lcRev" data-v="${x.id}">${ic('swap',16)}Reverter</button>`}</div></span></div>`).join('')}`:`<div class="mempty"><p>Nenhum lançamento em ${monthName(mm)}.</p><span>${all.length?'Nada corresponde a esse filtro.':'Use o seletor de mês para ver outros meses.'}</span></div>`}
  <div class="tfoot"><span>${l.length} lançamento${l.length===1?'':'s'}</span><span>Saldo do filtro <b>${R$(l.filter(x=>x.st==='ok').reduce((a,x)=>a+(x.tipo==='e'?x.v:-x.v),0))}</b></span></div></section>`;
}
function lcForm(id){const x=id?LANCS.find(y=>y.id===id):null,v=x?{...x}:{tipo:'e',desc:'',cat:'',v:'',comp:S.relM,d:NOWD,cc:'cc1',ct:''};
 openDlg(`${dlgHead(x?'Editar lançamento':'Novo lançamento',x?(x.st==='pend'?'Ainda aguardando aprovação.':`Lançado por ${esc(x.who)}`):'')}
  ${x?'':`<p class="fi-note">${ic('info',14)}<span>Entra como <b>pendente de aprovação</b> e só passa a contar no saldo depois que o Admin aprovar.</span></p>`}
  <form id="lcF" class="fgrid" novalidate>
   <div class="fld wide"><div class="fi-tg"><button type="button" data-tp="e" class="${v.tipo==='e'?'on':''}">${ic('arrowDn',15,2.2)}Entrada</button><button type="button" data-tp="s" class="${v.tipo==='s'?'on':''}">${ic('arrowUp',15,2.2)}Saída</button></div></div>
   <label class="fld wide fi-val"><span class="fl">Valor</span><span class="fi-amt"><em>R$</em><input name="v" inputmode="decimal" value="${v.v?String(v.v).replace('.',','):''}" placeholder="0,00" autocomplete="off"></span></label>
   <label class="fld wide"><span class="fl">Descrição</span><input name="desc" value="${esc(v.desc)}" placeholder="Ex.: Dízimos e ofertas — culto de domingo" autocomplete="off"></label>
   <label class="fld wide"><span class="fl">Conta do plano</span>${selw('cat',optConta(v.tipo,v.cat))}</label>
   <label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC(v.cc||'cc1'))}</label>
   <label class="fld"><span class="fl">Contato <small>opcional</small></span>${selw('ct',optCt(v.ct||''))}</label>
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${v.d}"></label>
   <label class="fld"><span class="fl">Competência</span><input type="month" name="comp" value="${v.comp}"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="lcOk">${x?'Salvar':'Enviar para aprovação'}</button></div></form>`);
 const f=$('#lcF'),ok=$('#lcOk');let tp=v.tipo;
 const val=()=>pVal(f.v.value);
 const chk=()=>{ok.disabled=!(val()>0)||!f.desc.value.trim()||!f.cat.value;f.querySelector('.fi-amt').className='fi-amt '+tp;};
 $$('[data-tp]',f).forEach(b=>b.onclick=()=>{tp=b.dataset.tp;$$('[data-tp]',f).forEach(y=>y.classList.toggle('on',y===b));f.cat.innerHTML=optConta(tp,'');chk();});
 f.addEventListener('input',chk);f.addEventListener('change',chk);chk();setTimeout(()=>f.v.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const o={tipo:tp,v:val(),desc:f.desc.value.trim(),cat:f.cat.value,cc:f.cc.value,ct:f.ct.value,d:f.d.value||NOWD,comp:f.comp.value||'2026-09'};
  if(x){Object.assign(x,o);const a=APROVS.find(a=>a.lid===x.id);if(a)Object.assign(a,{desc:o.desc,v:o.v,tp:o.tipo,cat:o.cat});closeDlg();fRe();toast('Lançamento atualizado');}
  else{const n=LC(o.d,o.comp,o.desc,o.cat,o.tipo,o.v,'pend','Rafael Pereira',{cc:o.cc,ct:o.ct});LANCS.push(n);APROVS.push(AP('lanc',o.desc,o.v,o.d,'Rafael Pereira',{tp:o.tipo,cat:o.cat,lid:n.id}));closeDlg();fRe();toast('Enviado para aprovação',()=>{LANCS.splice(LANCS.indexOf(n),1);APROVS.splice(APROVS.findIndex(a=>a.lid===n.id),1);fRe();});}},600);});}

/* ---------- Contas a pagar e a receber (títulos) ---------- */
const tVenc=(t,k)=>k==='p'?t.venc:t.prev,tDd=(t,k)=>tVenc(t,k)?dDays(tVenc(t,k)):999,tSum=l=>l.reduce((a,t)=>a+tSd(t),0);
const tSync=(t,k)=>{const b=t.baixas,last=b.length?b[b.length-1].d:null,pg=tPg(t);if(k==='p'){t.paid=tSd(t)<=0&&b.length>0;t.paidAt=t.paid?last:null;t.paidV=pg;}else{t.got=pg;t.recAt=pg?last:null;t.recV=pg;}};
function titRow(t,k,cls){const d=tDd(t,k),dt=tVenc(t,k),pg=tPg(t),P=k==='p';
 const when=!dt?(P?'sem vencimento':'sem data prevista'):d<0?`${P?'venceu':'previsto'} há ${-d} dia${d===-1?'':'s'}`:d===0?(P?'vence hoje':'previsto para hoje'):`${P?'vence':'previsto'} ${relD(dt)}`;
 return `<div class="fi-bill" id="${t.id}"><span class="fi-due ${cls}">${dt?`<b>${+dt.slice(8)}</b><small>${MONTHS[+dt.slice(5,7)-1].slice(0,3)}</small>`:'<b>—</b><small>sem data</small>'}</span><span class="dkt"><b>${esc(t.desc)}</b><span>${t.ct?esc(ctN(t.ct))+' · ':''}${catTag(t.cat)} <span class="${cls==='late'?'fi-latetx':''}">${when}</span>${pg?` · <b>${R$(pg)}</b> ${P?'pago':'recebido'} de ${R$(t.v)}`:''}</span></span><b class="fi-amt2">${R$(tSd(t))}</b><button class="btn ${cls==='late'?'pri':'sec'} sm" data-a="tBaixa" data-v="${k}|${t.id}">${ic('check',14,2.4)}Dar baixa</button></div>`;}
function titPage(k){const P=k==='p',L=P?PAGAR:RECEB,open=L.filter(t=>tSd(t)>0).sort((a,b)=>(tVenc(a,k)||'9999')<(tVenc(b,k)||'9999')?-1:1),late=open.filter(t=>tDd(t,k)<0),wk=open.filter(t=>tDd(t,k)>=0&&tDd(t,k)<=7),lt=open.filter(t=>tDd(t,k)>7),done=L.filter(t=>tSd(t)<=0);
 const grp=(n,l,cls)=>l.length?`<div class="fi-grp ${cls}"><p class="fi-gh"><b>${n}</b><span>${l.length} · ${R$(tSum(l))}</span></p>${l.map(t=>titRow(t,k,cls)).join('')}</div>`:'';
 const ag=[['A vencer',open.filter(t=>tDd(t,k)>=0)],['Atrasadas até 30 dias',open.filter(t=>tDd(t,k)<0&&tDd(t,k)>=-30)],['De 31 a 60 dias de atraso',open.filter(t=>tDd(t,k)<-30&&tDd(t,k)>=-60)],['Mais de 60 dias de atraso',open.filter(t=>tDd(t,k)<-60)]];
 return fHead(P?'Contas a pagar':'Contas a receber',P?'O que a igreja precisa pagar e quando':'O que a igreja espera receber e quando',`${rpBtn('financeiro',P?'pagar':'receber')}<button class="btn pri" data-a="tNew" data-v="${k}">${ic('plus',15,2.2)}${P?'Nova conta':'Nova conta a receber'}</button>`)
 +`<p class="fi-note rise" style="--d:1">${ic('info',14)}<span>Cada conta tem <b>contato, competência, conta do plano e centro de custo</b>. Ao dar baixa, ${P?'o pagamento':'o recebimento'} vira um lançamento pendente em <button class="lnk inl" data-a="nav" data-v="fapr">Aprovações</button>. A baixa pode ser parcial, com juros, multa e desconto.</span></p>
 <section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Em aberto</span><span class="kv">${R$(tSum(open))}</span><span class="kd">${open.length} ${open.length===1?'conta':'contas'}</span></div><div class="k4"><span class="kl">Atrasadas</span><span class="kv" style="${late.length?'color:var(--st-rec)':''}">${late.length}</span><span class="kd">${late.length?R$(tSum(late)):'nenhuma'}</span></div><div class="k4"><span class="kl">Próximos 7 dias</span><span class="kv" style="color:var(--st-sol)">${wk.length}</span><span class="kd">${R$(tSum(wk))}</span></div><div class="k4"><span class="kl">${P?'Pagas':'Recebidas'}</span><span class="kv">${done.length}</span><span class="kd">${R$(done.reduce((a,t)=>a+t.v,0))}</span></div></section>
 <section class="card kpis4 fi-ag rise" style="--d:2">${ag.map((g,i)=>`<div class="k4"><span class="kl">${g[0]}</span><span class="kv" style="${i&&g[1].length?'color:var(--st-rec)':''}">${R$(tSum(g[1]))}</span><span class="kd">${g[1].length} ${g[1].length===1?'conta':'contas'}</span></div>`).join('')}</section>
 <section class="card fi-bills rise" style="--d:3">${open.length?grp('Atrasadas',late,'late')+grp('Próximos 7 dias',wk,'soon')+grp('Depois',lt,'later'):`<div class="mempty"><p>${P?'Tudo pago 🎉':'Nada a receber 🎉'}</p><span>Nenhuma conta em aberto.</span></div>`}
  ${done.length?`<details class="fi-paid"><summary>${ic('check',13,2.4)}${done.length} ${P?(done.length===1?'paga':'pagas'):(done.length===1?'recebida':'recebidas')}</summary>${done.map(t=>{const b=t.baixas[t.baixas.length-1];return `<div class="fi-bill done"><span class="fi-due"><b>${tVenc(t,k)?+tVenc(t,k).slice(8):'—'}</b><small>${tVenc(t,k)?MONTHS[+tVenc(t,k).slice(5,7)-1].slice(0,3):''}</small></span><span class="dkt"><b>${esc(t.desc)}</b><span>${t.ct?esc(ctN(t.ct))+' · ':''}${catTag(t.cat)}${b?` · baixa em ${dBR(b.d)}`:''}${b&&b.ids&&b.ids.length?' · lançamento criado':''}</span></span><b class="fi-amt2">${R$(t.v)}</b><button class="btn ghost sm" data-a="tUndo" data-v="${k}|${t.id}">Desfazer</button></div>`;}).join('')}</details>`:''}</section>`;}
const fPag=()=>titPage('p'),fRec=()=>titPage('r');
function titForm(k){const P=k==='p',e=P?'s':'e';
 openDlg(`${dlgHead(P?'Nova conta a pagar':'Nova conta a receber','Ela entra na lista e só vira lançamento quando você der baixa.')}<form id="tF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Descrição</span><input name="desc" placeholder="${P?'Ex.: Energia elétrica — outubro':'Ex.: Aluguel do salão para evento externo'}" autocomplete="off"></label>
  <label class="fld"><span class="fl">Valor</span><span class="fi-amt ${e}"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00"></span></label>
  <label class="fld"><span class="fl">${P?'Fornecedor':'Cliente'} <small>opcional</small></span>${selw('ct',optCt('',P?'f':'c'))}</label>
  <label class="fld"><span class="fl">Emissão</span><input type="date" name="em" value="${NOWD}"></label>
  <label class="fld"><span class="fl">${P?'Vencimento':'Previsão'}${P?'':' <small>opcional</small>'}</span><input type="date" name="venc" value="${P?addD(NOWD,7):''}"></label>
  <label class="fld"><span class="fl">Competência</span><input type="month" name="comp" value="${NOWD.slice(0,7)}"></label>
  <label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC('cc1'))}</label>
  <label class="fld wide"><span class="fl">Conta do plano</span>${selw('cat',optConta(e,''))}</label>
  ${P?`<label class="tog wide"><input type="checkbox" name="rec"><span class="sw"></span><span><b>Repete todo mês</b><small>Criamos a próxima automaticamente quando esta for paga</small></span></label>`:''}
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${P?'Adicionar conta':'Adicionar conta a receber'}</button></div></form>`);
 const f=$('#tF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!f.desc.value.trim()||!(pVal(f.v.value)>0)||!f.cat.value||(P&&!f.venc.value);};f.addEventListener('input',chk);f.addEventListener('change',chk);setTimeout(()=>f.desc.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const o={em:f.em.value||NOWD,comp:f.comp.value||NOWD.slice(0,7),cc:f.cc.value};
  if(P)PAGAR.push(CP(f.desc.value.trim(),f.venc.value,pVal(f.v.value),f.cat.value,f.ct.value,o));else RECEB.push(CR(f.desc.value.trim(),f.venc.value,pVal(f.v.value),f.cat.value,f.ct.value,o));
  closeDlg();fRe();toast(P?'Conta adicionada':'Conta a receber adicionada');});}
function tBaixa(v){const [k,id]=v.split('|'),P=k==='p',t=(P?PAGAR:RECEB).find(x=>x.id===id),sd=tSd(t),e=P?'s':'e';
 openDlg(`${dlgHead(P?'Dar baixa na conta':'Dar baixa na conta a receber',`${esc(t.desc)} · saldo ${R$(sd)}`)}
  <p class="fi-note">${ic('info',14)}<span>A baixa cria o lançamento em <b>Aprovações</b>; só entra no saldo depois de aprovado. Baixa parcial mantém o resto em aberto.</span></p>
  <form id="tB" class="fgrid" novalidate>
   <label class="fld"><span class="fl">${P?'Pago':'Recebido'} em</span><input type="date" name="d" value="${NOWD}"></label>
   <label class="fld"><span class="fl">Valor baixado</span><span class="fi-amt ${e}"><em>R$</em><input name="v" inputmode="decimal" value="${String(sd).replace('.',',')}"></span></label>
   <label class="fld"><span class="fl">Juros e multa <small>opcional</small></span><span class="fi-amt ${e}"><em>R$</em><input name="j" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld"><span class="fl">Desconto <small>opcional</small></span><span class="fi-amt ${e}"><em>R$</em><input name="dc" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld wide"><span class="fl">Conta financeira</span>${selw('ac',FCONTAS.map(c=>`<option>${esc(c.n)}</option>`).join(''))}</label>
   <p class="who wide" id="tBs"></p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">${ic('check',14,2.4)}Dar baixa</button></div></form>`,'sm');
 const f=$('#tB'),ok=f.querySelector('[type=submit]'),calc=()=>{const b=pVal(f.v.value),j=pVal(f.j.value),dc=pVal(f.dc.value),pr=Math.max(0,b-dc);ok.disabled=!(b>0)||b>sd+.001;
  $('#tBs').innerHTML=b>sd+.001?`<span style="color:var(--st-rec)">O valor passa do saldo da conta (${R$(sd)}).</span>`:`Cria ${pr>0?`um lançamento de <b>${R$(pr)}</b> em ${esc(t.cat)}`:'nenhum lançamento de principal'}${j>0?` e outro de <b>${R$(j)}</b> em ${P?'Juros e multas pagos':'Juros e multas recebidos'}`:''}. ${b<sd-.001?`Fica <b>${R$(sd-b)}</b> em aberto.`:'A conta fica quitada.'}`;};
 f.addEventListener('input',calc);calc();
 f.addEventListener('submit',ev=>{ev.preventDefault();if(ok.disabled)return;const b=pVal(f.v.value),j=pVal(f.j.value),dc=pVal(f.dc.value),pr=Math.max(0,b-dc),d=f.d.value||NOWD,ids=[],made=[];
  const mk=(desc,cat,val)=>{const l=LC(d,t.comp,desc,cat,e,val,'pend','Rafael Pereira',{cc:t.cc,ct:t.ct,acc:f.ac.value,orig:'Baixa de conta'});const ap=AP('lanc',desc,val,d,'Rafael Pereira',{tp:e,cat,lid:l.id});LANCS.push(l);APROVS.push(ap);ids.push(l.id);made.push([l,ap]);};
  if(pr>0)mk(t.desc,t.cat,pr);if(j>0)mk('Juros e multa — '+t.desc,P?'Juros e multas pagos':'Juros e multas recebidos',j);
  const bx={d,v:b,j,dc,ids};t.baixas.push(bx);tSync(t,k);closeDlg();fRe();
  toast(`${t.desc} · baixa registrada`,()=>{made.forEach(([l,ap])=>{LANCS.splice(LANCS.indexOf(l),1);APROVS.splice(APROVS.indexOf(ap),1);});t.baixas.splice(t.baixas.indexOf(bx),1);tSync(t,k);fRe();});});}
function tUndo(v){const [k,id]=v.split('|'),t=(k==='p'?PAGAR:RECEB).find(x=>x.id===id),b=t.baixas[t.baixas.length-1];if(!b)return;
 const ls=(b.ids||[]).map(i=>LANCS.find(l=>l.id===i)).filter(Boolean);if(ls.some(l=>l.st==='ok'))return toast('O lançamento já foi aprovado: reverta em Lançamentos');
 ls.forEach(l=>{LANCS.splice(LANCS.indexOf(l),1);const i=APROVS.findIndex(a=>a.lid===l.id);if(i>=0)APROVS.splice(i,1);});t.baixas.pop();tSync(t,k);fRe();toast('Voltou para em aberto');}

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
function relData(ym){const real=LANCS.filter(x=>x.st==='ok'&&!x.tr&&x.comp===ym);if(real.length||ym>=RELN)return real;
 let h=0;for(const ch of ym)h=(h*31+ch.charCodeAt(0))%9973;const r=k=>{h=(h*9301+49297)%233280;return h/233280;};const yr=+ym.slice(0,4),g=1+(yr-2021)*.09,m=+ym.slice(5);
 const L=[['Dízimos','e',(19000+r()*5000)*g*(m===12?1.25:1)],['Ofertas','e',(1800+r()*1400)*g],['Doações','e',r()<.55?(1500+r()*5000)*g:0],['Vendas','e',yr>=2024?(2400+r()*1800)*g:0],['Taxas de maquininha','s',yr>=2024?100+r()*80:0],['Salários','s',4800*g+r()*300],['Encargos e benefícios','s',1500*g],['Ajuda de custo pastoral','s',3200*g],['Estrutura','s',3000*g+r()*400],['Manutenção','s',200+r()*1300],['Comunicação','s',r()<.6?300+r()*900:0],['Missões','s',r()<.5?800+r()*1800:0],['Ministérios','s',400+r()*900],['Ação social','s',300+r()*500],['Tarifas bancárias','s',89.9],['Rendimentos de aplicação','e',100+r()*120]];
 return L.filter(x=>x[2]>0).map(x=>({cat:x[0],tipo:x[1],v:Math.round(x[2]/10)*10}));}
const mpRe=()=>{const o=$('#mpPop');o.outerHTML=mpick();const n=$('#mpPop');n.classList.add('open','mp-in');};
function mpick(){const [y]=(S.relM[0]==='Y'?S.relM.slice(1)+'-01':S.relM).split('-').map(Number),yy=S.mpY||y,ny=+RELN.slice(0,4),oy=+REL0.slice(0,4);
 return `<div class="mp-pop pop" id="mpPop"><div class="mp-yh"><button class="ibtn sm" data-a="mpY" data-v="-1" ${yy<=oy?'disabled':''} aria-label="Ano anterior">${ic('chevL',14,2)}</button><button class="mp-yy" data-a="mpYears">${yy}${ic('chevD',13,2)}</button><button class="ibtn sm" data-a="mpY" data-v="1" ${yy>=ny?'disabled':''} aria-label="Próximo ano">${ic('chevR',14,2)}</button></div>
  ${S.mpYears?`<div class="mp-yrs">${Array.from({length:ny-oy+1},(_,i)=>oy+i).reverse().map(x=>`<button class="${x===yy?'on':''}" data-a="mpPickY" data-v="${x}">${x}</button>`).join('')}</div>`
  :`<div class="mp-grid">${MONTHS.map((n,i)=>{const ym=`${yy}-${String(i+1).padStart(2,'0')}`,dis=ym<REL0||ym>RELN;return `<button class="${ym===S.relM?'on':''} ${ym===RELN?'now':''}" data-a="relM" data-v="${ym}" ${dis?'disabled':''}>${n.slice(0,3)}</button>`;}).join('')}</div>`}
  <div class="mp-q">${[['Este mês',RELN],['Mês anterior',ymAdd(RELN,-1)],['Mesmo mês em '+(ny-1),ymAdd(RELN,-12)],...(S.active==='zel-ana'?[['Ano inteiro · '+yy,'Y'+yy]]:[])].map(q=>`<button data-a="relM" data-v="${q[1]}" class="${S.relM===q[1]?'on':''}">${q[0]}</button>`).join('')}</div>
  <p class="mp-ft"><span class="mp-fti">${ic('clock',12,2)}</span><span>Histórico desde <b>${monthName(REL0).toLowerCase()}</b></span></p></div>`;}
const fMes=()=>`<div class="fi-mbar rise" style="--d:1"><div class="mp"><button class="ibtn" data-a="relStep" data-v="-1" ${(S.relM[0]==='Y'?+S.relM.slice(1)<=+REL0.slice(0,4):S.relM<=REL0)?'disabled':''} aria-label="${S.relM[0]==='Y'?'Ano anterior':'Mês anterior'}">${ic('chevL',16,2)}</button><div style="position:relative"><button class="mp-btn" data-a="mpMenu">${ic('calendar',16)}<b>${S.relM[0]==='Y'?'Ano de '+S.relM.slice(1):monthName(S.relM)}</b>${S.relM===RELN?'<em>mês atual</em>':''}${ic('chevD',14,2)}</button>${mpick()}</div><button class="ibtn" data-a="relStep" data-v="1" ${(S.relM[0]==='Y'?+S.relM.slice(1)>=+RELN.slice(0,4):S.relM>=RELN)?'disabled':''} aria-label="${S.relM[0]==='Y'?'Próximo ano':'Próximo mês'}">${ic('chevR',16,2)}</button></div>${S.relM!==RELN?`<button class="lnk" data-a="relM" data-v="${RELN}">Voltar para o mês atual</button>`:''}</div>`;
/* ---------- DRE por plano de contas: tabular, vertical e horizontal (rodada 1 · 05/11/2026) ---------- */
const contaOf=n=>PLANO.find(a=>a.n===n);
const relItems=(ym,cc)=>relData(ym).filter(x=>!cc||(x.cc||'cc1')===cc);
function dreRows(months,cc){
 const D=months.map(ym=>{const by={};relItems(ym,cc).forEach(x=>{by[x.cat]=(by[x.cat]||0)+x.v;});return by;});
 const G=k=>D.map(by=>PLANO.filter(a=>a.g===k).reduce((s,a)=>s+(by[a.n]||0)*(k==='fin'&&a.t==='s'?-1:1),0));
 const sub=(a,...b)=>a.map((v,i)=>b.reduce((s,x)=>s-x[i],v));
 const rec=G('rec'),ded=G('ded'),cdi=G('cdi'),pes=G('pes'),min=G('min'),adm=G('adm'),fin=G('fin'),liq=sub(rec,ded),bruto=sub(liq,cdi),oper=sub(bruto,pes,min,adm),res=oper.map((v,i)=>v+fin[i]),rows=[];
 const grp=(k,n,v)=>{const cs=PLANO.filter(a=>a.g===k&&D.some(by=>by[a.n]));if(!cs.length&&k!=='rec')return;rows.push({t:'grp',l:n,vals:v});cs.forEach(a=>rows.push({t:'leaf',l:a.n,c:a.c,key:a.n,vals:D.map(by=>(by[a.n]||0)*(k==='fin'&&a.t==='s'?-1:1))}));};
 grp('rec','Receitas',rec);grp('ded','(−) Deduções da receita',ded);rows.push({t:'sub',l:'Receita líquida',vals:liq});grp('cdi','(−) Custos diretos',cdi);rows.push({t:'sub',l:'Resultado bruto',vals:bruto});
 grp('pes','(−) Despesas com pessoal',pes);grp('min','(−) Despesas ministeriais e sociais',min);grp('adm','(−) Despesas administrativas',adm);rows.push({t:'sub',l:'Resultado operacional',vals:oper});grp('fin','(+/−) Resultado financeiro',fin);
 rows.push({t:'tot',l:'Superávit ou déficit do período',vals:res});
 return {rows,rec,res};}
function dreHtml(){
 const view=S.dreV||'tab',cc=S.dreCC||'',months=view==='hor'?[-5,-4,-3,-2,-1,0].map(i=>ymAdd(S.relM,i)).filter(m=>m>=REL0):[S.relM],{rows,rec}=dreRows(months,cc),n=months.length,fm=view==='hor'?R0:R$,rec0=rec[n-1]||0;
 const pc=v=>rec0?Math.round(v/rec0*1000)/10:0;
 const dlt=r=>{if(n<2)return '';const a=r.vals[n-1],b=r.vals[n-2];if(!b)return '<i class="soft">—</i>';const p=Math.round((a-b)/Math.abs(b)*100);return `${p>0?'+':''}${p}%`;};
 const dd=key=>{const l=LANCS.filter(x=>x.cat===key&&x.comp===S.relM&&x.st==='ok'&&!x.tr&&(!cc||(x.cc||'cc1')===cc)).sort((a,b)=>a.d<b.d?1:-1);
  return `<div class="dr2-dd">${l.length?l.map(x=>`<div><span>${dBR(x.d)}</span><span>${esc(x.desc)}</span><span>${esc(ccN(x.cc))}</span><b>${R$(x.v)}</b></div>`).join(''):'<p>Este mês é histórico resumido, sem os lançamentos um a um.</p>'}</div>`;};
 const head=`<div class="dr2 thead v-${view}" style="--n:${n}"><span>Conta</span>${months.map(m=>`<span class="r">${compTxt(m)}</span>`).join('')}${view==='vert'?'<span class="r">% da receita</span>':view==='hor'?'<span class="r">Variação</span>':''}</div>`;
 const body=rows.map(r=>{const lf=r.t==='leaf'&&view!=='hor',open=lf&&S.dreOpen===r.key,v0=r.vals[n-1];
  const cells=r.vals.map(v=>`<span class="r ${(r.t==='tot'||r.t==='sub')&&v<0?'neg':''}">${v?fm(v):'<i class="soft">—</i>'}</span>`).join('');
  const ex=view==='vert'?`<span class="r dr2-p">${v0?pc(v0).toLocaleString('pt-BR')+'%':'—'}<i style="width:${Math.min(100,Math.abs(pc(v0)))}%"></i></span>`:view==='hor'?`<span class="r dr2-d">${dlt(r)}</span>`:'';
  return `<div class="dr2 ${r.t} v-${view} ${open?'op':''}" style="--n:${n}" ${lf?`data-a="dreOpen" data-v="${esc(r.key)}" tabindex="0"`:''}><span class="dr2-l">${r.c?`<i>${r.c}</i>`:''}${esc(r.l)}${lf?ic('chevD',12,2):''}</span>${cells}${ex}</div>`+(open?dd(r.key):'');}).join('');
 return `<section class="card fi-dre dre2 rise" style="--d:2"><div class="tbar"><div class="chips">${[['tab','Tabular'],['vert','Vertical'],['hor','Horizontal']].map(c=>`<button class="chipf ${view===c[0]?'on':''}" data-a="dreV" data-v="${c[0]}">${c[1]}</button>`).join('')}</div><div class="dre-cc">${selw('dcc','<option value="">Todos os centros de custo</option>'+CCUSTOS.map(c=>`<option value="${c.id}" ${c.id===cc?'selected':''}>${esc(c.n)}</option>`).join(''))}</div></div>
  <div class="dr2-sc">${head}${body}</div>
  <p class="who dr2-ft">${view==='tab'?'Regime de competência. Toque numa conta para ver os lançamentos do mês.':view==='vert'?'Cada linha como parte da receita do mês (análise vertical).':'Seis meses lado a lado e a variação sobre o mês anterior (análise horizontal).'} Nomes como “superávit” e “déficit” seguem as entidades sem fins lucrativos; a confirmar com o contador.</p></section>`;}
function fRel(){
 const k=dreRows([S.relM],S.dreCC||''),e=k.rec[0],r=k.res[0],s=e-r,nRec=k.rows.filter(x=>x.t==='leaf'&&contaOf(x.key).g==='rec').length;
 return fHead('DRE','Resultado do mês por plano de contas, com o fluxo de caixa ao lado',`<button class="btn sec" data-a="nav" data-v="fcont">${ic('users',15)}Enviar ao contador</button><button class="btn sec" data-a="export" data-v="o DRE (PDF)">${ic('file',15)}DRE (PDF)</button><button class="btn sec" data-a="export" data-v="o fluxo de caixa (CSV)">Fluxo de caixa (CSV)</button>`)
 +`${fMes()}
 <section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">${r>=0?'Superávit do mês':'Déficit do mês'}</span><span class="kv" style="color:${r>=0?'var(--st-int)':'var(--st-rec)'}">${R$(r)}</span><span class="kd">receitas menos despesas</span></div><div class="k4"><span class="kl">Receitas</span><span class="kv">${R$(e)}</span><span class="kd">${nRec} contas</span></div><div class="k4"><span class="kl">Despesas</span><span class="kv">${R$(s)}</span><span class="kd">${e?Math.round(s/e*100):0}% das receitas</span></div></section>
 ${dreHtml()}`;
}
/* Informe anual: página própria (antes era aba da DRE); só com o módulo Secretaria ligado */
function fInf(){
 return fHead('Informe anual','Total doado por pessoa no ano-calendário, para o imposto de renda')+(typeof sxInforme==='function'&&modOn('secretaria')?sxInforme():`<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('info',30,2.4)}</span><h2>Informe anual indisponível</h2><p>O informe usa o cadastro de membros e o módulo Secretaria, que está desligado.</p></section>`);
}

/* ---------- Importar e conciliar (ajuste de 05/11/2026, a partir do Lucra) ----------
   Nada é lido de verdade: cada tipo gera um arquivo de exemplo com os dados do Financeiro.
   O extrato é comparado com o que já existe; o que for criado ou baixado nasce em Aprovações. */
const IMTP=[
 {id:'extrato',n:'Extrato do banco',f:'OFX ou CSV',ic:'building',rec:1,d:'Traz as movimentações de uma conta e compara com o que já está lançado: reconhece o que já existe, dá baixa em contas a pagar e a receber e cria só o que falta.'},
 {id:'plano',n:'Plano de contas do contador',f:'XLSX ou CSV',ic:'clipboard',d:'Traz o plano que o contador usa. Preenche o código contábil das contas que já existem e cria as que faltam. Nada é apagado.'}];
const IMSEEN=new Set(['OFX-20260917-120000']);
const IMHIST=[{tipo:'extrato',file:'extrato-bradesco-ago2026.ofx',when:'2026-09-17',by:'Rafael Pereira',txt:'18 lançamentos enviados para aprovação'}];
const IMPLN=[['3.1.1.01','Dízimos','Receitas'],['3.1.1.03','Doações','Receitas'],['3.1.1.04','Inscrições','Receitas'],['3.1.1.05','Vendas','Receitas'],['3.1.1.06','Aluguel de espaços','Receitas'],['4.1.1.01','Salários','Despesas com pessoal'],['4.1.1.04','Ajuda de custo pastoral','Despesas com pessoal'],['4.3.1.01','Missões','Despesas ministeriais e sociais'],['4.3.1.02','Ministérios','Despesas ministeriais e sociais'],['4.3.1.03','Ação social','Despesas ministeriais e sociais'],['4.2.1.04','Seguros','Despesas administrativas'],['4.2.1.05','Taxas e licenças','Despesas administrativas'],['abc','Despesas diversas','Despesas administrativas']];
const IMST={nova:['plus','Nova'],existe:['check','Já existe'],baixa:['link','Baixa de conta'],duplicado:['alert','Possível duplicado'],importada:['check','Já importada'],casa:['link','Preenche o código'],conflito:['alert','Código diferente'],erro:['x','Erro']};
const IMACT={nova:[['criar','Criar lançamento'],['ignorar','Ignorar']],existe:[['manter','Manter (já lançado)']],baixa:[['baixar','Dar baixa na conta'],['criar','Criar lançamento novo'],['ignorar','Ignorar']],duplicado:[['','Decidir…'],['ignorar','É duplicado: ignorar'],['criar','Não é duplicado: criar']],importada:[['ignorar','Já importada']],casa:[['aplicar','Preencher o código'],['ignorar','Ignorar']],conflito:[['manter','Manter o código atual'],['atualizar','Trocar pelo do arquivo']],erro:[['ignorar','Fora até corrigir o arquivo']]};
const IMDEF={nova:'criar',existe:'manter',baixa:'baixar',duplicado:'',importada:'ignorar',casa:'aplicar',conflito:'manter',erro:'ignorar'};
const IMSUG=[[/tarifa/,'Tarifas bancárias'],[/rendimento|aplicacao/,'Rendimentos de aplicação'],[/sabesp|energia|aluguel|internet|enel/,'Estrutura'],[/grafica|banner/,'Comunicação'],[/pix recebido|deposito|dizimo/,'Dízimos']];
const imS=()=>(S.im||(S.im={step:0}));
const imTok=s=>norm(s).split(/[^a-z0-9]+/).filter(w=>w.length>3);
const imSim=(a,b)=>{const A=new Set(imTok(a));return imTok(b).some(t=>A.has(t));};
const imDiff=(a,b)=>Math.round((new Date(a+'T12:00')-new Date(b+'T12:00'))/864e5);
const imTitle=m=>m.toLowerCase().replace(/(^|\s)\S/g,c=>c.toUpperCase());
const imRound=v=>Math.round(v*100)/100;
const imChip=s=>`<span class="im-st ${s}">${ic(IMST[s][0],13,2.4)}${IMST[s][1]}</span>`;
const imConta=I=>FCONTAS[I.conta]||FCONTAS[0];
const imFileName=I=>I.type==='plano'?'plano-de-contas-contador.xlsx':`extrato-${norm(imConta(I).banco||imConta(I).n).replace(/[^a-z0-9]+/g,'-')}-set2026.ofx`;

/* linhas do arquivo de exemplo: misturam o que já existe, o que dá baixa em conta, um possível duplicado e o que é novo */
function imLines(){const L=[];let n=0;const add=(d,memo,v)=>L.push({id:'x'+(++n),ext:`OFX-${d.replace(/-/g,'')}-${Math.round(Math.abs(v)*100)}`,d,memo,v});
 add('2026-09-12','TED RECEBIDA CAMPANHA RETIRO JOVENS',5300);add('2026-09-14','PIX IMOBILIARIA CENTRAL ALUGUEL',-3200);add('2026-09-15','DEB AUTOM GRAFICA RAPIDA LTDA',-890);
 add('2026-09-10','PIX J SANTOS',-340);add('2026-09-16','PIX RECEBIDO M SOUZA',350);add('2026-09-16','PIX RECEBIDO A C LIMA',500);add('2026-09-17','DEPOSITO DIZIMO CULTO',1200);
 add('2026-09-25','PIX ASSOC ESPORTIVA VIDA',800);add('2026-09-28','BOLETO COMPANHIA DE ENERGIA',-640);add('2026-09-29','PIX SOM E LUZ EQUIPAMENTOS',-700);
 add('2026-09-29','BOLETO SABESP',-212);add('2026-09-29','PIX RECEBIDO R OLIVEIRA',150);add('2026-09-30','COMPRA DEBITO PAPELARIA ABC',-78.4);
 add('2026-09-30','TARIFAS BANCARIAS PACOTE SERVICOS',-89.9);add('2026-09-30','RENDIMENTOS DA APLICACAO CDB',214.35);
 return L;}

function imAnalyze(I){
 const out=[],mk=(l,st,x={})=>({...l,st,actions:(I.type==='plano'&&st==='nova')?[['criar','Criar conta'],['ignorar','Ignorar']]:IMACT[st],act:IMDEF[st],cat:'',...x});
 if(I.type==='extrato'){
  const c=imConta(I),ci=FCONTAS.indexOf(c),pool=LANCS.filter(l=>l.st==='ok'&&!l.tr&&(l.acc?l.acc===c.n:ci===0)),used=new Set(),usedT=new Set();
  I.lines.forEach(l=>{
   if(IMSEEN.has(l.ext))return out.push(mk(l,'importada',{msg:'Esta linha já foi importada antes.'}));
   const tp=l.v>0?'e':'s',av=Math.abs(l.v);
   const ex=pool.find(x=>x.tipo===tp&&x.v===av&&Math.abs(imDiff(x.d,l.d))<=3&&!used.has(x.id));
   if(ex){used.add(ex.id);return out.push(imSim(l.memo,ex.desc+' '+ctN(ex.ct))?mk(l,'existe',{msg:`Já lançado: ${ex.desc}.`}):mk(l,'duplicado',{msg:`Parece o mesmo que “${ex.desc}” (mesmo valor e data próxima), mas a descrição é outra.`}));}
   const P=l.v<0,ti=(P?PAGAR:RECEB).map(x=>({x,sd:tSd(x)})).find(o=>o.sd>0&&o.sd>=av&&!usedT.has(o.x.id)&&(o.sd===av||imSim(l.memo,o.x.desc+' '+ctN(o.x.ct))));
   if(ti){usedT.add(ti.x.id);return out.push(mk(l,'baixa',{match:{k:P?'p':'r',id:ti.x.id},msg:`Casa com a conta “${ti.x.desc}” (em aberto ${R$(ti.sd)}). ${ti.sd===av?'Quita a conta.':`Baixa parcial: ficam ${R$(imRound(ti.sd-av))} em aberto.`}`}));}
   const sg=(IMSUG.find(x=>x[0].test(norm(l.memo)))||[])[1],ok=sg&&PLANO.some(a=>a.n===sg&&a.t===tp);
   out.push(mk(l,'nova',{cat:ok?sg:'',msg:'Não existe no Alva.'+(ok?' Conta sugerida pelo histórico.':'')}));});
  I.extra=imRound(out.filter(r=>['nova','baixa','duplicado'].includes(r.st)).reduce((s,r)=>s+r.v,0));
  return out;}
 IMPLN.forEach((p,i)=>{const [cod,nome,grp]=p,g=DRG.find(x=>norm(x[1])===norm(grp)),ex=PLANO.find(a=>norm(a.n)===norm(nome)),base={id:'p'+i,n:i+2,memo:nome,cod,grp,g:g&&g[0],t:g?(g[2]==='x'?'e':g[2]):''};
  if(!/^\d+(\.\d+)+$/.test(cod))return out.push(mk(base,'erro',{msg:'Código inválido: use números separados por ponto, como 4.2.1.04.'}));
  if(!g)return out.push(mk(base,'erro',{msg:`O grupo “${grp}” não existe na DRE.`}));
  if(ex)return out.push(ex.cc===cod?mk(base,'existe',{msg:'A conta já tem esse código contábil.'}):!ex.cc?mk(base,'casa',{msg:`Já existe no plano, sem código contábil. Passa a ser ${cod}.`}):mk(base,'conflito',{msg:`Hoje a conta tem o código ${ex.cc}; o arquivo traz ${cod}. Você escolhe qual vale.`}));
  out.push(mk(base,'nova',{msg:`Conta nova em ${grp}, com código contábil ${cod}.`}));});
 return out;}

function imEff(rows){const e={criar:0,baixar:0,aplicar:0,atualizar:0,manter:0,ignorar:0,dec:0,saldo:0};rows.forEach(r=>{if(!r.act){e.dec++;return;}e[r.act]++;if(r.act==='criar'||r.act==='baixar')e.saldo+=(r.v||0);});e.saldo=imRound(e.saldo);return e;}

function fImp(){
 const I=imS(),head=fHead('Importar e conciliar','Traga o extrato do banco ou o plano de contas do contador. O Alva compara com o que já existe e você confirma antes de qualquer lançamento.',I.step?`<button class="btn sec" data-a="imReset">${ic('x',15)}Cancelar importação</button>`:'');
 const stp=`<ol class="im-steps rise" style="--d:1" aria-label="Etapas">${['Tipo','Arquivo','Revisão','Resultado'].map((t,i)=>`<li class="${i===I.step?'on':i<I.step?'done':''}"><i>${i<I.step?ic('check',12,3):i+1}</i>${t}</li>`).join('')}</ol>`;
 return head+stp+[imType,imFile,imReview,imResult][I.step](I);}

function imType(){
 return `<div class="im-types rise" style="--d:2">${IMTP.map(t=>`<button class="card im-ty ${t.rec?'rec':''}" data-a="imPick" data-v="${t.id}"><span class="htile" style="--s:44px;background:var(--brand-soft);color:var(--brand-text)">${ic(t.ic,21)}</span><span class="dkt"><b>${t.n}</b><small>${t.f}</small></span>${t.rec?'<em class="im-rec">Mais usado</em>':''}<p>${t.d}</p></button>`).join('')}</div>
 <p class="fi-note rise" style="--d:3">${ic('shield',15)}<span><b>Nada entra sem a sua confirmação.</b> O arquivo vira uma fila de revisão: cada linha mostra se já existe, se dá baixa numa conta a pagar ou a receber, se parece duplicada ou se é nova. O que for criado ou baixado nasce em <button class="lnk inl" data-a="nav" data-v="fapr">Aprovações</button> e só entra no saldo depois de aprovado. Reenviar o mesmo arquivo não duplica nada.</span></p>
 <section class="card im-hist rise" style="--d:4"><div class="sh"><h2>Importações anteriores</h2></div>${IMHIST.map(h=>`<div class="im-h"><span class="htile" style="--s:38px;background:var(--surface-2);color:var(--ink-muted)">${ic(h.tipo==='plano'?'clipboard':'building',17)}</span><span class="dkt"><b>${esc(h.file)}</b><span>${dBR(h.when)} · ${esc(h.by)} · ${esc(h.txt)}</span></span></div>`).join('')}</section>
 <section class="card fi-exp im-exp rise" style="--d:5"><h2>${ic('arrowDn',16,2)} Exportar</h2><div class="fi-exl">${[['Lançamentos','financeiro|lancamentos',LANCS.length+' registros','layers'],['Contas a pagar','financeiro|pagar',PAGAR.length+' contas','clock'],['Contas a receber','financeiro|receber',RECEB.length+' previsões','wallet'],['DRE do mês','o DRE (PDF)','Setembro/2026','file']].map(x=>`<button class="fi-ex" data-a="${x[1].includes('|')?'rptGo':'export'}" data-v="${x[1]}"><span class="htile" style="--s:38px;background:var(--brand-soft);color:var(--brand-text)">${ic(x[3],17)}</span><span class="dkt"><b>${x[0]}</b><span>${x[2]}</span></span><em>${x[1].includes('PDF')?'PDF':'CSV'}</em><span class="fi-exd">${ic('arrowDn',15,2)}</span></button>`).join('')}</div></section>`;}

function imFile(I){
 const t=IMTP.find(x=>x.id===I.type),ex=I.type==='extrato',c=imConta(I),n=ex?imLines().length:IMPLN.length;
 const contas=FCONTAS.map((x,i)=>[i,x]).filter(x=>x[1].tipo==='Conta bancária');
 return `<div class="fi-io rise" style="--d:2"><section class="card fi-imp"><h2>${ic(t.ic,16)} ${t.n}</h2>
  ${ex?`<p class="fl">1. Conta do extrato</p>${selw('imc',contas.map(([i,x])=>`<option value="${i}" ${I.conta===i?'selected':''}>${esc(x.n)}${x.banco?' · '+esc(x.banco):''}</option>`).join(''))}`:''}
  <p class="fl">${ex?'2. Arquivo':'1. Arquivo'}</p>${I.file?`<div class="ct-file"><span class="mt-ft" style="--s:38px;height:38px;border-radius:10px;background:var(--st-sol-bg);color:var(--st-sol)">${ex?'OFX':'XLS'}</span><span class="dkt"><b>${esc(I.file)}</b><span>${ex?`${esc(c.banco||c.n)} · ${n} transações encontradas`:`${n} contas encontradas`}</span></span><button class="ibtn sm" data-a="imFileX" aria-label="Remover">${ic('x',13)}</button></div>`:`<div class="ct-drop" data-a="imPickFile">${ic('upload',18)}<span><b>Arraste o arquivo aqui ou clique para escolher</b><small>${t.f}${ex?', exportado do internet banking':', como o contador envia'}</small></span></div>`}
  <p class="who im-sim">${ic('info',13,2)}Neste protótipo o conteúdo do arquivo não é lido: mostramos um exemplo montado com os dados do Financeiro.</p>
  <div class="fi-impf"><button class="btn sec" data-a="imBack">Voltar</button><button class="btn pri" data-a="imRead" ${I.file?'':'disabled'}>Ler e revisar</button></div></section>
  <aside class="card fi-exp"><h2>${ex?'Sobre o extrato':'Como o plano é importado'}</h2>
  <ul class="im-bul">${ex?'<li>Aceita OFX (o padrão dos bancos) e CSV.</li><li>O saldo final do arquivo é comparado com o saldo do Alva, para você ver se falta alguma coisa.</li><li>Linhas que já estão lançadas ficam como estão; só o que falta é criado.</li><li>Se a linha casa com uma conta a pagar ou a receber, o Alva sugere dar baixa em vez de criar outro lançamento.</li><li>Tudo o que for criado ou baixado vai para Aprovações.</li>':'<li>Colunas: <b>código contábil, nome da conta e grupo da DRE</b>.</li><li>O arquivo é <b>mesclado</b> com o plano atual: nada é apagado e conta em uso nunca sai.</li><li>Conta que já existe só recebe o código contábil; se já tinha outro código, você escolhe qual vale.</li><li>Conta que não existe é criada no grupo informado.</li><li>Linha com erro fica de fora; as demais entram.</li>'}</ul></aside></div>`;}

const IMFILT=[['todas','Todas'],['novas','Novas'],['ok','Já existem ou casam'],['atencao','Exigem atenção']];
const imIn=(r,k)=>k==='todas'||(k==='novas'&&r.st==='nova')||(k==='ok'&&['existe','baixa','importada','casa'].includes(r.st))||(k==='atencao'&&['duplicado','erro','conflito'].includes(r.st));
function imReview(I){
 const rows=I.rows,ex=I.type==='extrato',e=imEff(rows),sm={};rows.forEach(r=>{sm[r.st]=(sm[r.st]||0)+1;});
 const shown=rows.filter(r=>imIn(r,I.filter||'todas')),c=imConta(I);
 let panel='';
 if(ex){const now=c.atual,arq=imRound(now+I.extra),dep=imRound(now+e.saldo),diff=imRound(arq-dep);
  panel=`<section class="card kpis4 rise" style="--d:2"><div class="k4"><span class="kl">Saldo no arquivo</span><span class="kv">${R$(arq)}</span><span class="kd">${esc(c.banco||c.n)} · 01/09 a 30/09</span></div><div class="k4"><span class="kl">Saldo no Alva hoje</span><span class="kv">${R$(now)}</span><span class="kd">${esc(c.n)}</span></div><div class="k4"><span class="kl">Depois de aprovar</span><span class="kv">${R$(dep)}</span><span class="kd">com as ações abaixo</span></div><div class="k4"><span class="kl">Diferença</span><span class="kv" style="color:${diff?'var(--st-rec)':'var(--st-int)'}">${diff?R$(diff,true):'Confere'}</span><span class="kd">${diff?'arquivo menos Alva':'o saldo fecha'}</span></div></section>
  <p class="fi-note ${diff?'warn':''} rise" style="--d:3">${ic(diff?'alert':'check',15)}<span>${diff?'O saldo do Alva não vai bater com o arquivo com as ações atuais. Revise o que está sendo ignorado ou marcado como duplicado.':'Com estas ações, o saldo do Alva fecha com o do arquivo, depois que as aprovações forem feitas.'}</span></p>`;}
 else panel=`<p class="fi-note ${sm.erro?'warn':''} rise" style="--d:2">${ic(sm.erro?'alert':'check',15)}<span>${sm.erro?`<b>${sm.erro} linha(s) com erro</b> ficam de fora até o arquivo ser corrigido. As demais podem ser importadas agora.`:'Nenhum erro encontrado.'} A importação <b>mescla</b> com o plano atual: nada é apagado e o grupo da DRE de cada conta nova vem do arquivo.</span></p>`;
 const head=ex?['Data','Descrição no extrato','Valor','Situação','Ação','Conta do plano']:['Linha','Conta no arquivo','Grupo','Situação','Ação','Código contábil'];
 const body=shown.map(r=>{const i=rows.indexOf(r),need=ex&&r.act==='criar'&&!r.cat||!r.act;
  const opts=r.actions.filter(([k])=>k||!r.act).map(([k,l])=>`<option value="${k}" ${r.act===k?'selected':''}>${l}</option>`).join('');
  const sel=`<span class="selw"><select data-im="act" data-i="${i}" aria-label="Ação para ${esc(r.memo)}" ${r.actions.length<2?'disabled':''}>${opts}</select>${ic('updown',14)}</span>`;
  const c1=ex?dBR(r.d):'L'+r.n,c3=ex?`<b class="${r.v>0?'e':'s'}">${R$(r.v,true)}</b>`:esc(r.grp),
   c6=ex?(r.act==='criar'?`<span class="selw"><select data-im="cat" data-i="${i}" aria-label="Conta do plano de ${esc(r.memo)}">${optConta(r.v>0?'e':'s',r.cat)}</select>${ic('updown',14)}</span>`:'<span class="soft">—</span>'):`<code class="im-cod">${esc(r.cod)}</code>`;
  return `<div class="im-r ${r.st} ${need?'need':''}"><span class="im-d">${c1}</span><span class="im-t"><b>${esc(r.memo)}</b><small>${esc(r.msg)}</small></span><span class="im-v">${c3}</span><span class="im-s">${imChip(r.st)}</span><span class="im-a">${sel}</span><span class="im-c">${c6}</span></div>`;}).join('')||'<p class="im-empty">Nenhuma linha neste filtro.</p>';
 return `${panel}<div class="im-tb rise" style="--d:3"><div class="im-chips">${Object.entries(sm).map(([k,n])=>`<span class="im-cc">${imChip(k)}<b>${n}</b></span>`).join('')}</div><div class="chips">${IMFILT.map(f=>`<button class="chipf ${(I.filter||'todas')===f[0]?'on':''}" data-a="imFilter" data-v="${f[0]}">${f[1]}</button>`).join('')}</div></div>
 <section class="card im-card rise" style="--d:4"><div class="im-r thead">${head.map(h=>`<span>${h}</span>`).join('')}</div>${body}</section>
 <div class="im-bar rise" style="--d:5"><span>${ex?`<b>${e.criar}</b> a criar · <b>${e.baixar}</b> baixa(s) · <b>${e.ignorar+e.manter}</b> sem mudança`:`<b>${e.aplicar+e.atualizar}</b> código(s) a preencher · <b>${e.criar}</b> conta(s) a criar · <b>${e.ignorar+e.manter}</b> sem mudança`}${e.dec?` · <b class="im-neg">${e.dec} para decidir</b>`:''}</span><button class="btn sec" data-a="imBack">Voltar</button><button class="btn pri" data-a="imConfirm">${ic('check',15,2.4)}Confirmar importação</button></div>`;}

function imResult(I){
 const r=I.res,ex=I.type==='extrato';
 return `<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('check',30,2.6)}</span><h2>Importação concluída</h2><p>${esc(I.file)}</p></section>
 <section class="card kpis4 k3 rise" style="--d:3">${ex?`<div class="k4"><span class="kl">Lançamentos criados</span><span class="kv">${r.criadas}</span><span class="kd">aguardando aprovação</span></div><div class="k4"><span class="kl">Baixas em contas</span><span class="kv">${r.baixas}</span><span class="kd">a pagar e a receber</span></div><div class="k4"><span class="kl">Sem mudança</span><span class="kv">${r.ignoradas+r.mantidas}</span><span class="kd">já lançadas ou ignoradas</span></div>`:`<div class="k4"><span class="kl">Códigos preenchidos</span><span class="kv">${r.aplicadas}</span><span class="kd">em contas que já existiam</span></div><div class="k4"><span class="kl">Contas criadas</span><span class="kv">${r.criadas}</span><span class="kd">no plano de contas</span></div><div class="k4"><span class="kl">Sem mudança</span><span class="kv">${r.ignoradas+r.mantidas}</span><span class="kd">já iguais ou ignoradas</span></div>`}</section>
 <p class="fi-note rise" style="--d:4">${ic('info',15)}<span>${ex?'Tudo o que foi criado ou baixado está em <b>Aprovações</b> e só entra no saldo depois de aprovado. O arquivo fica no histórico. Reenviar o mesmo arquivo agora mostra as linhas como “já importadas”, sem duplicar nada.':'O plano de contas já está atualizado. O arquivo fica no histórico. Reenviar o mesmo arquivo agora mostra as contas como “já existem”.'}</span></p>
 <div class="im-end rise" style="--d:5">${ex?`<button class="btn sec" data-a="imAgain">Reenviar o mesmo arquivo (teste)</button><button class="btn sec" data-a="nav" data-v="flanc">Ver lançamentos</button><button class="btn pri" data-a="nav" data-v="fapr">${ic('check',15,2.4)}Ir para Aprovações</button>`:`<button class="btn sec" data-a="imAgain">Reenviar o mesmo arquivo (teste)</button><button class="btn pri" data-a="nav" data-v="fplano">Ver o plano de contas</button>`}</div>`;}

/* aplica a importação: extrato vira lançamentos pendentes e baixas pendentes; plano mexe direto no cadastro */
function imApply(I){
 const res={criadas:0,baixas:0,ignoradas:0,mantidas:0,aplicadas:0};
 if(I.type==='plano'){
  I.rows.forEach(r=>{
   if(r.act==='aplicar'||r.act==='atualizar'){PLANO.find(a=>norm(a.n)===norm(r.memo)).cc=r.cod;res.aplicadas++;}
   else if(r.act==='criar'){const gi=DRG.findIndex(x=>x[0]===r.g)+1,seq=Math.max(0,...PLANO.filter(a=>a.g===r.g).map(a=>+a.c.split('.')[1]))+1;PLANO.push(PLA(`${gi}.${String(seq).padStart(2,'0')}`,r.memo,r.g,r.t,'salvia',{cc:r.cod,fv:r.t==='s'?'v':''}));FCATS[r.memo]=['salvia',r.t];res.criadas++;}
   else if(r.act==='manter')res.mantidas++;else res.ignoradas++;});
  IMHIST.unshift({tipo:'plano',file:I.file,when:NOWD,by:'Rafael Pereira',txt:`${res.aplicadas} códigos preenchidos, ${res.criadas} contas criadas`});
  return res;}
 const c=imConta(I),lids=[],tits=[],exts=[],made=[];
 const mkL=l=>{LANCS.push(l);lids.push(l.id);made.push(l);return l;};
 I.rows.forEach(r=>{
  if(r.act==='ignorar'){res.ignoradas++;return;}
  exts.push(r.ext);
  if(r.act==='manter'){res.mantidas++;return;}
  if(r.act==='criar'){mkL(LC(r.d,r.d.slice(0,7),imTitle(r.memo),r.cat,r.v>0?'e':'s',Math.abs(r.v),'pend','Rafael Pereira',{cc:'cc1',acc:c.n,orig:'Importação de extrato',imp:true}));res.criadas++;return;}
  if(r.act==='baixar'){const P=r.match.k==='p',t=(P?PAGAR:RECEB).find(x=>x.id===r.match.id),val=Math.abs(r.v),l=mkL(LC(r.d,t.comp,t.desc,t.cat,P?'s':'e',val,'pend','Rafael Pereira',{cc:t.cc,ct:t.ct,acc:c.n,orig:'Baixa de conta',imp:true})),bx={d:r.d,v:val,j:0,dc:0,ids:[l.id]};t.baixas.push(bx);tSync(t,r.match.k);tits.push([r.match.k,t.id,bx]);res.baixas++;}});
 exts.forEach(x=>IMSEEN.add(x));
 const ls=made.slice().sort((a,b)=>a.d<b.d?1:-1),sum=t=>made.filter(l=>l.tipo===t).reduce((s,l)=>s+l.v,0);
 APROVS.push(AP('imp',`Extrato ${c.banco||c.n} (OFX)`,null,NOWD,'Rafael Pereira',{n:made.length,ent:made.filter(l=>l.tipo==='e').length,sai:made.filter(l=>l.tipo==='s').length,te:sum('e'),ts:sum('s'),rows:ls.slice(0,5).map(l=>[l.d.slice(8)+'/'+l.d.slice(5,7),l.desc,l.cat,l.tipo,l.v]),lids,tits,exts}));
 IMHIST.unshift({tipo:'extrato',file:I.file,when:NOWD,by:'Rafael Pereira',txt:`${made.length} lançamentos enviados para aprovação`});
 return res;}
/* rejeitar a importação desfaz os lançamentos, as baixas e as chaves das linhas */
function imUndo(a){(a.lids||[]).forEach(id=>{const i=LANCS.findIndex(x=>x.id===id);if(i>=0)LANCS.splice(i,1);});
 (a.tits||[]).forEach(([k,id,bx])=>{const t=(k==='p'?PAGAR:RECEB).find(x=>x.id===id),i=t?t.baixas.indexOf(bx):-1;if(i>=0){t.baixas.splice(i,1);tSync(t,k);}});
 (a.exts||[]).forEach(x=>IMSEEN.delete(x));}

document.addEventListener('change',e=>{const t=e.target;if(S.active!=='fimp'||!t||!t.dataset)return;const I=imS();
 if(t.name==='imc'){I.conta=+t.value;return;}
 if(t.dataset.im==='act'){I.rows[+t.dataset.i].act=t.value;fRe();}
 else if(t.dataset.im==='cat'){I.rows[+t.dataset.i].cat=t.value;fRe();}});

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
const fPendConta=(c,i)=>LANCS.filter(l=>l.st==='pend'&&(l.acc?l.acc===c.n:i===0)).length;
const fApply=l=>{if(l&&(l.tr||l.imp)){const c=FCONTAS.find(x=>x.n===l.acc);if(c)c.atual+=l.tipo==='e'?l.v:-l.v;}};
function fCon(){
 return fHead('Contas financeiras','Onde está o dinheiro da igreja',`<button class="btn sec" data-a="fTransf">${ic('swap',15)}Transferir</button><button class="btn pri" data-a="fcNew">${ic('plus',15,2.2)}Nova conta</button>`)
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Saldo total</span><span class="kv">${R$(fSaldo())}</span><span class="kd">somando todas as contas</span></div><div class="k4"><span class="kl">Contas ativas</span><span class="kv">${FCONTAS.length}</span><span class="kd">bancárias e caixas físicos</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv">${APROVS.length}</span><span class="kd">ainda não contam no saldo</span></div></section>
 <div class="fc-grid rise" style="--d:2">${FCONTAS.map((c,i)=>{const pn=fPendConta(c,i),tot=fSaldo(),pc=tot>0?Math.round(Math.max(0,c.atual)/tot*100):0;return `<article class="card fc-acc"><header><span class="fc-ai ${c.banco?'b':'c'}">${ic(c.banco?'building':'wallet',18,2)}</span><span class="fc-an"><b>${esc(c.n)}</b><small>${esc(c.tipo)}${c.banco?' · '+esc(c.banco):''}</small></span>${pn?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>${pn} pendente${pn===1?'':'s'}</span>`:''}</header>
  <div class="fc-av"><b>${R$(c.atual)}</b><small>${pc}% do saldo total</small></div><span class="fc-bar"><i style="width:${pc}%"></i></span>
  <footer>Saldo inicial <b>${R$(c.ini)}</b> em ${dBR(c.desde)}</footer></article>`;}).join('')}</div>`;
}

/* ---------- Previsibilidade (só leitura) ---------- */
/* exemplo: quanto do vendido de cada mês já foi reconhecido; o mês mais antigo está mais reconhecido (a regra real é a FIN-P-64) */
const RECB={cafe:.72,rest:.55,shop:.9};
const mDiff=(a,b)=>(+a.slice(0,4)-+b.slice(0,4))*12+(+a.slice(5,7)-+b.slice(5,7));
const recFrac=(k,ym)=>Math.min(1,(RECB[k]||0)+.2*Math.max(0,mDiff(FOOD_DATE.slice(0,7),ym)));
function fPrev(){
 const tab=S.fpv||'cx',vw=S.fpvC||'ab',cur=FOOD_DATE.slice(0,7),mm=S.relM,mn=MONTHS[+mm.slice(5)-1],isCur=mm===cur;
 const list=PCAIXAS.filter(c=>vw==='ab'?!c.closed:(c.closed&&c.in-c.out>0)),com=pcCom(),ret=pcVivos().reduce((a,c)=>a+c.ret,0);
 const stores=Object.entries(FOOD_STORES).filter(([k])=>['cafe','rest','shop'].includes(k)),sm=(k,f)=>foodSummary(FOOD_SALES.filter(s=>s.store===k&&f(s.date)));
 const rows=stores.map(([k,st])=>{const m=sm(k,d=>d.startsWith(mm));return {n:st.name,h:isCur?sm(k,d=>d===FOOD_DATE):null,m,r:Math.round(m.sold*recFrac(k,mm))};});
 const vm=rows.reduce((a,r)=>a+r.m.sold,0)/100,cv=m=>`${brl2(m.sold/100)}<small>${m.count} ${m.count===1?'venda':'vendas'}</small>`;
 const pendTot=stores.reduce((a,[k])=>a+[...new Set(FOOD_SALES.filter(s=>s.store===k).map(s=>s.date.slice(0,7)))].reduce((q,ym)=>{const m=sm(k,d=>d.startsWith(ym));return q+m.sold-Math.round(m.sold*recFrac(k,ym));},0),0)/100;
 const caixas=()=>{const gs=['Eventos','Ministérios','Cultos','Campanhas'].map(g=>[g,list.filter(c=>c.g===g)]).filter(x=>x[1].length);
  if(!gs.length)return '<div class="mempty"><p>Nenhum caixa aqui.</p><span>Não há caixa encerrado com saldo.</span></div>';
  const tot=list.reduce((a,c)=>a+c.in-c.out,0);
  return `<div class="trow pv thead"><span class="pv-n">Caixa</span><span class="pv-c pv-c1">Entradas</span><span class="pv-c pv-c2">Saídas</span><span class="pv-c pv-c3">Devolvido à igreja</span><span class="pv-t">No caixa</span></div>`
  +gs.map(([g,l])=>`<div class="trow pv pv-gh"><span class="pv-n"><b>${g}<em>${l.length} ${l.length===1?'caixa':'caixas'}</em></b></span><span class="pv-t">${R$(l.reduce((a,c)=>a+c.in-c.out,0))}</span></div>`+l.map(c=>`<div class="trow pv"><span class="pv-n"><b>${esc(c.n)}</b>${c.closed?'<small>Encerrado com saldo</small>':''}</span><span class="pv-c pv-c1">${R$(c.in)}</span><span class="pv-c pv-c2">${R$(c.out)}</span><span class="pv-c pv-c3">${R$(c.ret)}</span><span class="pv-t">${R$(c.in-c.out)}</span><span class="pv-s">Entradas ${R$(c.in)} · Saídas ${R$(c.out)} · Devolvido à igreja ${R$(c.ret)}</span></div>`).join('')).join('')
  +`<div class="trow pv tot"><span class="pv-n"><b>Total com as pessoas</b></span><span class="pv-t">${R$(tot)}</span></div>`;};
 const vendas=()=>`<div class="trow pv vd thead"><span class="pv-n">Estabelecimento</span><span class="pv-c pv-c1">Hoje</span><span class="pv-c pv-c2">Vendido em ${mn}</span><span class="pv-c pv-c3">Reconhecido</span><span class="pv-c pv-c4">A reconhecer</span></div>`
  +rows.map(r=>`<div class="trow pv vd"><span class="pv-n"><b>${esc(r.n)}</b><small>${r.m.count} ${r.m.count===1?'venda':'vendas'} em ${mn}</small></span><span class="pv-c pv-c1">${r.h?cv(r.h):'—'}</span><span class="pv-c pv-c2">${cv(r.m)}</span><span class="pv-c pv-c3" style="color:var(--st-int)">${brl2(r.r/100)}</span><span class="pv-c pv-c4" style="color:var(--st-sol)">${brl2((r.m.sold-r.r)/100)}</span><span class="pv-t">${brl2(r.m.sold/100)}</span><span class="pv-s">${r.h?`Hoje ${brl2(r.h.sold/100)} · `:''}Reconhecido ${brl2(r.r/100)} · A reconhecer ${brl2((r.m.sold-r.r)/100)}</span></div>`).join('')
  +`<div class="trow pv vd tot"><span class="pv-n"><b>Total</b></span><span class="pv-c pv-c1">${isCur?brl2(rows.reduce((a,r)=>a+r.h.sold,0)/100):'—'}</span><span class="pv-c pv-c2">${brl2(vm)}</span><span class="pv-c pv-c3">${brl2(rows.reduce((a,r)=>a+r.r,0)/100)}</span><span class="pv-c pv-c4">${brl2(rows.reduce((a,r)=>a+r.m.sold-r.r,0)/100)}</span><span class="pv-t">${brl2(vm)}</span></div>`;
 return fHead('Caixas e vendas','O dinheiro que ainda não chegou à conta da igreja')
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Com as pessoas</span><span class="kv">${R$(com)}</span><span class="kd">caixas abertos e encerrados com saldo</span></div><div class="k4"><span class="kl">Já devolvido à igreja</span><span class="kv">${R$(ret)}</span><span class="kd">devoluções dos caixas</span></div><div class="k4"><span class="kl">Vendido em ${mn}</span><span class="kv">${R$(vm)}</span><span class="kd">Cafeteria, Restaurante e Loja · bruto</span></div><div class="k4"><span class="kl">A reconhecer no total</span><span class="kv" style="color:var(--st-sol)">${R$(pendTot)}</span><span class="kd">vendas ainda não reconhecidas · exemplo</span></div></section>`
 +(tab==='cx'?`<div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><b>Só leitura.</b> <small>Dinheiro que ainda não chegou à conta da igreja; a baixa é feita em cada caixa.</small></span></div>`
  :`<div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><b>Só leitura: nada aqui vira lançamento.</b> <small>Reconhecido é o que do mês já entrou na conta, com as taxas; a reconhecer é o que falta. Valores de exemplo.</small></span></div>`)
 +`<div class="utabs rise" style="--d:2" role="tablist">${[['cx','Caixas'],['vd','Vendas']].map(t=>`<button role="tab" class="${tab===t[0]?'on':''}" aria-selected="${tab===t[0]}" data-a="fpvTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>`
 +(tab==='vd'?fMes():'')
 +`<section class="card mtab pv-card rise" style="--d:3">${tab==='cx'
  ?`<div class="tbar"><div class="chips">${[['ab','Abertos',PCAIXAS.filter(c=>!c.closed).length],['en','Encerrados com saldo',PCAIXAS.filter(c=>c.closed&&c.in-c.out>0).length]].map(c=>`<button class="chipf ${vw===c[0]?'on':''}" data-a="fpvC" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>${caixas()}`
  :vendas()}</section>`;
}

/* ---------- Plano de contas (hierárquico, com código contábil) ---------- */
const FTONES=['ceu','menta','lima','salvia','damasco','rosado'],FINAT=new Set();
const catUso=c=>LANCS.filter(l=>l.cat===c).length+PAGAR.filter(p=>p.cat===c).length+RECEB.filter(r=>r.cat===c).length;
const prTxt=p=>p==='comp'?'Na competência':'No pagamento';
function fPlano(){
 const sem=PLANO.filter(a=>!a.cc).length,at=PLANO.filter(a=>!FINAT.has(a.n)).length;
 return fHead('Plano de contas','A estrutura dos lançamentos, das contas a pagar e a receber e da DRE',`<button class="btn sec" data-a="export" data-v="o plano de contas (CSV)">${ic('arrowDn',15,2)}Exportar</button><button class="btn pri" data-a="catNew">${ic('plus',15,2.2)}Nova conta</button>`)
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Contas ativas</span><span class="kv">${at}</span><span class="kd">em ${DRG.length} grupos da DRE</span></div><div class="k4"><span class="kl">Com código contábil</span><span class="kv">${PLANO.length-sem} de ${PLANO.length}</span><span class="kd">${sem?`${sem} faltam: o contador informa`:'todas vinculadas'}</span></div><div class="k4"><span class="kl">Reconhecem na competência</span><span class="kv">${PLANO.filter(a=>a.pr==='comp').length}</span><span class="kd">as outras, no pagamento</span></div></section>
 <section class="card mtab pl-card rise" style="--d:2"><div class="trow pl thead"><span>Conta</span><span>Natureza</span><span>Código contábil</span><span>Reconhece</span><span>Uso</span><span></span></div>`
 +DRG.map((g,gi)=>{const l=PLANO.filter(a=>a.g===g[0]);return `<div class="trow pl pl-gh"><span class="pl-n"><b>${gi+1} · ${g[1]}<em>${l.length} ${l.length===1?'conta':'contas'}</em></b></span></div>`+l.map(a=>{const u=catUso(a.n),off=FINAT.has(a.n),nt=`${a.t==='e'?'Entrada':'Saída'}${a.fv?` · ${a.fv==='f'?'fixa':'variável'}`:''}`;
  return `<div class="trow pl ${off?'off':''}"><span class="pl-n"><i>${a.c}</i>${catTag(a.n)}${off?'<em class="pc-off">Inativa</em>':''}</span><span class="pl-t">${nt}</span><span class="pl-c">${a.cc?`<b>${esc(a.cc)}</b>`:'<i class="soft">a definir</i>'}</span><span class="pl-p">${prTxt(a.pr)}</span><span class="pl-u">${u?`${u} ${u===1?'item':'itens'}`:'não usada'}</span><span class="pl-a"><button class="btn sec sm" data-a="catEdit" data-v="${esc(a.n)}">${ic('pen',14)}Editar</button><button class="btn sec sm" data-a="catOff" data-v="${esc(a.n)}">${off?'Reativar':'Inativar'}</button></span><span class="pl-s">${nt} · ${a.cc?'cód. '+esc(a.cc):'sem código contábil'} · ${prTxt(a.pr)}</span></div>`;}).join('');}).join('')+`</section>`;}
function catForm(name){const ed=name?contaOf(name):null,used=name?catUso(name):0;let tp=ed?ed.t:'s',tn=ed?ed.tn:FTONES[0],fv=ed?ed.fv||'v':'v';const gk0=ed?ed.g:'adm';
 openDlg(`${dlgHead(ed?'Editar conta':'Nova conta',ed?'Renomear atualiza tudo que já usa a conta.':'Aparece nos lançamentos, nas contas a pagar e a receber e na DRE.')}<form id="pcF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(name||'')}" maxlength="40" autocomplete="off" placeholder="Ex.: Eventos"></label>
  <label class="fld wide"><span class="fl">Grupo da DRE</span>${selw('g',DRG.map(g=>`<option value="${g[0]}" ${g[0]===gk0?'selected':''}>${g[1]}</option>`).join(''))}</label>
  <div class="fld wide" id="pcN"><span class="fl">Natureza</span><div class="fi-tg"><button type="button" data-tp="e" class="${tp==='e'?'on':''}" ${used?'disabled':''}>${ic('arrowDn',15,2.2)}Entrada</button><button type="button" data-tp="s" class="${tp==='s'?'on':''}" ${used?'disabled':''}>${ic('arrowUp',15,2.2)}Saída</button></div></div>
  <div class="fld wide" id="pcF2"><span class="fl">Comportamento</span><div class="fi-tg"><button type="button" data-fv="f" class="${fv==='f'?'on':''}">Fixa</button><button type="button" data-fv="v" class="${fv==='v'?'on':''}">Variável</button></div></div>
  <label class="fld"><span class="fl">Código contábil <small>opcional</small></span><input name="cc" value="${esc(ed?ed.cc:'')}" maxlength="20" autocomplete="off" placeholder="Ex.: 4.2.1.05"></label>
  <label class="fld"><span class="fl">Reconhece</span>${selw('pr',`<option value="caixa" ${(!ed||ed.pr==='caixa')?'selected':''}>No pagamento</option><option value="comp" ${ed&&ed.pr==='comp'?'selected':''}>Na competência (provisão)</option>`)}</label>
  <div class="fld wide"><span class="fl">Cor</span><div class="fi-cats2 pc-sws" id="pcT">${FTONES.map(t=>`<button type="button" data-t="${t}" class="${t===tn?'on':''}" style="--t:var(--tone-${t});--ti:var(--tone-${t}-ink)" aria-label="${t[0].toUpperCase()+t.slice(1)}"><i></i><span>${t[0].toUpperCase()+t.slice(1)}</span></button>`).join('')}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${ed?'Salvar':'Criar conta'}</button></div></form>`,'sm');
 const f=$('#pcF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!f.n.value.trim();},lay=()=>{const g=f.g.value;if(g==='rec')tp='e';else if(g!=='fin')tp='s';$('#pcN').hidden=g!=='fin';$('#pcF2').hidden=tp!=='s';$$('[data-tp]',f).forEach(y=>y.classList.toggle('on',y.dataset.tp===tp));};
 $$('[data-tp]',f).forEach(b=>b.onclick=()=>{if(used)return;tp=b.dataset.tp;lay();});
 $$('[data-fv]',f).forEach(b=>b.onclick=()=>{fv=b.dataset.fv;$$('[data-fv]',f).forEach(y=>y.classList.toggle('on',y===b));});
 $$('#pcT button').forEach(b=>b.onclick=()=>{tn=b.dataset.t;$$('#pcT button').forEach(y=>y.classList.toggle('on',y===b));});
 f.g.addEventListener('change',lay);f.addEventListener('input',chk);lay();chk();setTimeout(()=>f.n.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(n!==name&&PLANO.some(a=>norm(a.n)===norm(n)))return toast('Já existe uma conta com esse nome');
  const g=f.g.value,o={n,g,t:tp,tn,fv:tp==='s'?fv:'',cc:f.cc.value.trim(),pr:f.pr.value};
  const code=()=>{const gi=DRG.findIndex(x=>x[0]===g)+1,seq=Math.max(0,...PLANO.filter(a=>a.g===g&&a!==ed).map(a=>+a.c.split('.')[1]))+1;return `${gi}.${String(seq).padStart(2,'0')}`;};
  if(ed){if(n!==name){delete FCATS[name];LANCS.forEach(l=>{if(l.cat===name)l.cat=n;});PAGAR.forEach(p=>{if(p.cat===name)p.cat=n;});RECEB.forEach(r=>{if(r.cat===name)r.cat=n;});APROVS.forEach(a=>{if(a.cat===name)a.cat=n;});if(FINAT.has(name)){FINAT.delete(name);FINAT.add(n);}}
   if(g!==ed.g)o.c=code();Object.assign(ed,o);}
  else PLANO.push(PLA(code(),n,g,tp,tn,{fv:o.fv,cc:o.cc,pr:o.pr}));
  FCATS[n]=[tn,tp];closeDlg();fRe();toast(ed?'Conta atualizada':'Conta criada');});}

/* ---------- Centros de custo ---------- */
const ccUso=id=>LANCS.filter(l=>l.cc===id).length+PAGAR.filter(p=>p.cc===id).length+RECEB.filter(r=>r.cc===id).length;
function fCC(){
 const mv=id=>{const l=LANCS.filter(x=>x.cc===id&&x.comp===RELN&&x.st==='ok'&&!x.tr);return [sumT(l,'e'),sumT(l,'s')];};
 return fHead('Centros de custo','De onde vem e para onde vai o dinheiro: cultos, cafeteria, eventos, ministérios',`<button class="btn pri" data-a="ccNew">${ic('plus',15,2.2)}Novo centro de custo</button>`)
 +`<p class="fi-note rise" style="--d:1">${ic('info',14)}<span>O centro de custo diz <b>onde</b> o valor aconteceu; a conta do plano diz <b>o quê</b>. A DRE pode ser filtrada por centro em <button class="lnk inl" data-a="nav" data-v="frel">Relatórios</button>. Dividir um lançamento entre centros (rateio) vem na próxima etapa.</span></p>
 <section class="card pc-col rise" style="--d:2"><header class="pc-h"><span class="pc-hi e">${ic('layers',16,2.2)}</span><div><h2>Centros de custo</h2><small>${CCUSTOS.filter(c=>c.on).length} ativos</small></div></header><div class="pc-list">${CCUSTOS.map(c=>{const m=mv(c.id),u=ccUso(c.id);return `<div class="pc-r ${c.on?'':'off'}"><span class="pc-n"><b>${esc(c.n)}</b>${c.cod?`<small class="who">cód. ${esc(c.cod)}</small>`:''}${c.on?'':'<em class="pc-off">Inativo</em>'}</span><span class="pc-u">${monthName(RELN)}: entradas ${R$(m[0])} · saídas ${R$(m[1])} · ${u} ${u===1?'item':'itens'}</span><span class="pc-a"><button class="btn sec sm" data-a="ccEdit" data-v="${c.id}">${ic('pen',14)}Editar</button><button class="btn sec sm" data-a="ccOff" data-v="${c.id}" ${c.id==='cc1'?'disabled':''}>${c.on?'Inativar':'Reativar'}</button></span></div>`;}).join('')}</div></section>`;}
function ccForm(id){const c=id?CCUSTOS.find(x=>x.id===id):null;
 openDlg(`${dlgHead(c?'Editar centro de custo':'Novo centro de custo','Aparece nos lançamentos e nas contas a pagar e a receber.')}<form id="ccF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(c?c.n:'')}" maxlength="40" autocomplete="off" placeholder="Ex.: Retiro de Casais"></label>
  <label class="fld wide"><span class="fl">Código contábil <small>opcional</small></span><input name="cod" value="${esc(c?c.cod:'')}" maxlength="20" autocomplete="off" placeholder="Informado pelo contador"></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${c?'Salvar':'Criar centro de custo'}</button></div></form>`,'sm');
 const f=$('#ccF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!f.n.value.trim();};f.addEventListener('input',chk);chk();setTimeout(()=>f.n.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(CCUSTOS.some(x=>x!==c&&norm(x.n)===norm(n)))return toast('Já existe um centro de custo com esse nome');
  if(c)Object.assign(c,{n,cod:f.cod.value.trim()});else CCUSTOS.push(CC0('cc'+(CCUSTOS.length+1+Date.now()%1000),n,f.cod.value.trim()));closeDlg();fRe();toast(c?'Centro de custo atualizado':'Centro de custo criado');});}

/* ---------- Contatos (fornecedores e clientes) ---------- */
const CTTP={f:'Fornecedor',c:'Cliente',a:'Fornecedor e cliente'};
function fCto(){
 const ab=id=>PAGAR.filter(p=>p.ct===id).reduce((a,p)=>a+tSd(p),0)+RECEB.filter(r=>r.ct===id).reduce((a,r)=>a+tSd(r),0),uso=id=>PAGAR.filter(p=>p.ct===id).length+RECEB.filter(r=>r.ct===id).length+LANCS.filter(l=>l.ct===id).length;
 return fHead('Contatos','Fornecedores e clientes das contas a pagar e a receber',`<button class="btn pri" data-a="ctNew">${ic('plus',15,2.2)}Novo contato</button>`)
 +`<p class="fi-note rise" style="--d:1">${ic('info',14)}<span>Aqui ficam <b>quem a igreja paga e de quem recebe</b> (com CPF ou CNPJ, que o contador pede). Membros, dízimos e ofertas continuam em Pessoas e nas Doações.</span></p>
 <section class="card pc-col rise" style="--d:2"><header class="pc-h"><span class="pc-hi s">${ic('users',16,2.2)}</span><div><h2>Contatos</h2><small>${CONTATOS.length} cadastrados</small></div></header><div class="pc-list">${CONTATOS.map(c=>{const a=ab(c.id),u=uso(c.id);return `<div class="pc-r"><span class="pc-n"><b>${esc(c.n)}</b><small class="who">${esc(CTTP[c.tp])}</small></span><span class="pc-u">${c.doc?esc(c.doc):'sem CPF ou CNPJ'} · ${u} ${u===1?'item':'itens'}${a?` · em aberto ${R$(a)}`:''}</span><span class="pc-a"><button class="btn sec sm" data-a="ctEdit" data-v="${c.id}">${ic('pen',14)}Editar</button></span></div>`;}).join('')}</div></section>`;}
function ctForm(id){const c=id?CONTATOS.find(x=>x.id===id):null;let tp=c?c.tp:'f';
 openDlg(`${dlgHead(c?'Editar contato':'Novo contato','Fornecedor ou cliente.')}<form id="ctF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(c?c.n:'')}" maxlength="60" autocomplete="off" placeholder="Ex.: Padaria Pão Quente"></label>
  <label class="fld wide"><span class="fl">CPF ou CNPJ <small>opcional</small></span><input name="doc" value="${esc(c?c.doc:'')}" maxlength="18" autocomplete="off" placeholder="Somente números"></label>
  <div class="fld wide"><span class="fl">Tipo</span><div class="fi-tg">${[['f','Fornecedor'],['c','Cliente'],['a','Os dois']].map(t=>`<button type="button" data-tp="${t[0]}" class="${tp===t[0]?'on':''}">${t[1]}</button>`).join('')}</div></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${c?'Salvar':'Criar contato'}</button></div></form>`,'sm');
 const f=$('#ctF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!f.n.value.trim();};f.addEventListener('input',chk);chk();setTimeout(()=>f.n.focus(),80);
 $$('[data-tp]',f).forEach(b=>b.onclick=()=>{tp=b.dataset.tp;$$('[data-tp]',f).forEach(y=>y.classList.toggle('on',y===b));});
 f.addEventListener('submit',e=>{e.preventDefault();const o={n:f.n.value.trim(),doc:f.doc.value.trim(),tp};if(c)Object.assign(c,o);else CONTATOS.push(CTO('ct'+Date.now(),o.n,o.doc,tp));closeDlg();fRe();toast(c?'Contato atualizado':'Contato criado');});}

/* ---------- Contador: o pacote do mês e o acesso de quem faz a contabilidade ---------- */
const CONTADORES=[];
function fCont(){
 const ym=S.relM,fech=FCLOSED.some(x=>x[0]===ym),pend=LANCS.filter(l=>l.st==='pend'&&l.comp===ym).length,usadas=[...new Set(relItems(ym).map(x=>x.cat))].filter(n=>contaOf(n)),falta=usadas.filter(n=>!contaOf(n).cc),ls=LANCS.filter(l=>l.comp===ym&&l.st==='ok'&&!l.tr).sort((a,b)=>a.d<b.d?-1:1);
 const chk=(ok,t,s,go)=>`<div class="cn-ck ${ok?'ok':'no'}"><span class="cn-ci">${ic(ok?'check':'alert',14,2.4)}</span><span class="dkt"><b>${t}</b><span>${s}</span></span>${go&&!ok?`<button class="btn sec sm" data-a="nav" data-v="${go[0]}">${go[1]}</button>`:''}</div>`;
 const pk=[['o DRE (PDF)','DRE do mês','PDF','file','Estruturada por grupo, com superávit ou déficit'],['os lançamentos do período (CSV)','Lançamentos do período','CSV','layers','Com conta de débito e de crédito. Layout genérico; o do sistema do contador entra depois'],['o plano de contas (CSV)','Plano de contas com códigos','CSV','clipboard','Códigos gerenciais e contábeis, e quando cada conta reconhece'],['as contas em aberto (CSV)','Contas a pagar e a receber em aberto','CSV','clock','Com contato, vencimento e competência']];
 const cod=a=>a&&a.cc?`<b>${esc(a.cc)}</b>`:'<i class="soft">a definir</i>';
 return fHead('Contador','O pacote do mês para quem faz a contabilidade da igreja',`<button class="btn pri" data-a="cnInvite">${ic('plus',15,2.2)}Convidar contador</button>`)
 +fMes()
 +`<section class="card cn-card rise" style="--d:1"><div class="sh"><h2>Pronto para enviar? · ${monthName(ym)}</h2></div>
  ${chk(fech,fech?'Mês fechado':'Mês ainda aberto',fech?'Os lançamentos do mês não mudam mais.':'Feche o mês antes de mandar, para o contador receber números que não mudam.',['ffech','Ir para Fechamentos'])}
  ${chk(!pend,pend?`${pend} ${pend===1?'lançamento aguardando':'lançamentos aguardando'} aprovação`:'Nada aguardando aprovação',pend?'Só o que foi aprovado entra no pacote.':'Todos os lançamentos do mês estão aprovados.',['fapr','Ver aprovações'])}
  ${chk(!falta.length,falta.length?`${falta.length} ${falta.length===1?'conta usada sem':'contas usadas sem'} código contábil`:'Todas as contas usadas têm código contábil',falta.length?esc(falta.join(', '))+'. O contador informa os códigos.':'O arquivo sai pronto para importar.',['fplano','Abrir plano de contas'])}</section>
 <section class="card cn-card rise" style="--d:2"><div class="sh"><h2>Pacote do mês</h2></div><div class="cn-pk">${pk.map(p=>`<div class="cn-p"><span class="htile" style="--s:38px;background:var(--brand-soft);color:var(--brand-text)">${ic(p[3],17)}</span><span class="dkt"><b>${p[1]}</b><span>${p[4]}</span></span><em>${p[2]}</em><button class="btn sec sm" data-a="export" data-v="${p[0]}">${ic('arrowDn',14,2)}Baixar</button></div>`).join('')}</div></section>
 <section class="card mtab cn-card rise" style="--d:3"><div class="sh" style="padding:18px 20px 6px"><h2>Prévia da exportação contábil</h2></div><p class="who" style="padding:0 20px 10px">Cada lançamento aprovado vira uma linha com débito e crédito. Código “a definir” = falta o contador informar.</p>
  <div class="trow cn thead"><span>Data</span><span>Histórico</span><span>Débito</span><span>Crédito</span><span>Valor</span></div>
  ${ls.length?ls.slice(0,8).map(x=>{const a=contaOf(x.cat),bk='<i class="soft">banco · a definir</i>';return `<div class="trow cn"><span class="cn-d">${dBR(x.d)}</span><span class="cn-h"><b>${esc(x.desc)}</b><small>${esc(x.cat)} · ${esc(ccN(x.cc))} · ${a?prTxt(a.pr).toLowerCase():''}</small></span><span class="cn-c">${x.tipo==='s'?cod(a):bk}</span><span class="cn-c">${x.tipo==='s'?bk:cod(a)}</span><span class="cn-v">${R$(x.v)}</span></div>`;}).join('')+`<div class="tfoot"><span>${ls.length>8?`Mostrando 8 de ${ls.length} linhas`:`${ls.length} ${ls.length===1?'linha':'linhas'}`}</span><span>${ls.length} lançamentos no mês</span></div>`:'<div class="mempty"><p>Nenhum lançamento aprovado neste mês.</p><span>Escolha outro mês no seletor.</span></div>'}</section>
 <section class="card cn-card rise" style="--d:4"><div class="sh"><h2>Acesso do contador</h2></div>${CONTADORES.length?CONTADORES.map((c,i)=>`<div class="cn-p"><span class="htile" style="--s:38px;background:var(--surface-2);color:var(--ink-muted)">${ic('user',17)}</span><span class="dkt"><b>${esc(c.n)}</b><span>${esc(c.email)} · convite enviado em ${dBR(NOWD)}</span></span><button class="btn ghost sm" data-a="cnDel" data-v="${i}">Remover</button></div>`).join(''):`<p class="who" style="padding:0 20px 4px">Ninguém convidado ainda. O contador entra só para <b>ler</b>: vê a DRE, os lançamentos, o plano de contas e baixa o pacote. Não lança, não aprova e não mexe em outros módulos.</p>`}
  <div class="sx-note" style="--c:var(--brand-text);margin:14px 20px 18px">${ic('info',13,2)}<span><b>A confirmar com o contador:</b> <small>o plano de contas dele, o formato do arquivo que o sistema contábil importa e se há campanhas com dinheiro que só pode ser gasto na finalidade.</small></span></div></section>`;}

/* ---------- Fechamentos ---------- */
function fFech(){
 const pend=APROVS.length,next=ymAdd(FCLOSED[0][0],1),ended=next<NOWD.slice(0,7),can=!pend&&ended,st=!ended?'wait':pend?'block':'ok';
 const stp=(l,c,b)=>`<span class="stp" style="--c:${c};--b:${b}"><i></i>${l}</span>`;
 return fHead('Fechamentos','Mês fechado trava os lançamentos daquele mês')
 +`<section class="card fc-next ${st} rise" style="--d:1"><div class="fc-nh"><span class="fc-ni">${ic(st==='ok'?'check':st==='block'?'alert':'clock',18,2)}</span><div class="fc-nt"><small>Próximo a fechar</small><b>${monthName(next)}</b><span>${st==='wait'?'O mês ainda não terminou.':st==='block'?`${pend} ${pend===1?'item aguardando aprovação impede':'itens aguardando aprovação impedem'} o fechamento.`:'Tudo aprovado: pode fechar.'}</span></div></div>
  <div class="fc-na">${pend?`<button class="btn sec" data-a="nav" data-v="fapr">Ver aprovações${stp(String(pend),'var(--st-sol)','var(--st-sol-bg)')}</button>`:''}<button class="btn pri" data-a="fechaMes" ${can?'':'disabled'}>${ic('lock',15,2)}Fechar ${MONTHS[+next.slice(5)-1]}</button></div></section>
 <div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><b>Fechado</b> <small>trava os lançamentos e ainda pode ser reaberto pelo Admin.</small> <b>Selado</b> <small>não pode mais ser reaberto.</small></span></div>
 <section class="card fc-list rise" style="--d:3"><div class="fc-lh"><h2>Meses fechados</h2><span class="who">${FCLOSED.length} ${FCLOSED.length===1?'mês':'meses'}</span></div>
  ${FCLOSED.map(([ym,s])=>`<div class="fc-r"><span class="fc-ri ${s==='Fechado'?'f':'s'}">${ic(s==='Fechado'?'check':'lock',14,2.2)}</span><b>${monthName(ym)}</b><span class="fc-st">${s==='Fechado'?stp('Fechado','var(--st-int)','var(--st-int-bg)'):stp('Selado','var(--ink-muted)','var(--surface-2)')}</span><span class="fc-ac">${s==='Fechado'?'<button class="btn sec sm" data-a="fechaRe">Reabrir</button>':''}</span></div>`).join('')}</section>`;
}


function fAfter(){
 const q=$('#lq');if(q)q.addEventListener('input',e=>{S.lq=e.target.value;const c=e.target.selectionStart;fRe();const n=$('#lq');n.focus();n.setSelectionRange(c,c);});
 const d=$('[name=dcc]');if(d)d.addEventListener('change',()=>{S.dreCC=d.value;S.dreOpen=null;fRe();});
}
const fGo=()=>{render();window.scrollTo({top:0});};
const fRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const FIA={
 fBar:v=>{S.fbar=+v;fRe();},
 lcNew:()=>lcForm(),lcEdit:(v,b,e)=>{if(e&&e.target.closest('.hact')&&!e.target.closest('.pi'))return;closePops();lcForm(v);},lcF:v=>{S.lf=v;fRe();},
 lcMenu:v=>{const p=$('#lcPop-'+v);closePops(p);p.classList.toggle('open');},
 lcDup:v=>{closePops();const x=LANCS.find(y=>y.id===v);lcForm();setTimeout(()=>{const f=$('#lcF');f.desc.value=x.desc;f.v.value=String(x.v).replace('.',',');$('#lcF [data-tp='+x.tipo+']').click();f.cat.value=x.cat;f.cc.value=x.cc||'cc1';f.ct.value=x.ct||'';f.dispatchEvent(new Event('input'));},30);},
 lcDel:v=>{closePops();const x=LANCS.find(y=>y.id===v);confirmDel({title:'Excluir este lançamento?',body:`“${esc(x.desc)}” · ${R$(x.v)}. ${x.st==='ok'?'O saldo do mês será recalculado.':'Ele também sai das aprovações.'}`,onConfirm:()=>{const i=LANCS.indexOf(x),ai=APROVS.findIndex(a=>a.lid===x.id),ap=ai>=0?APROVS.splice(ai,1)[0]:null;LANCS.splice(i,1);fRe();toast('Lançamento excluído',()=>{LANCS.splice(i,0,x);if(ap)APROVS.splice(ai,0,ap);fRe();});}});},
 cpNew:()=>titForm('p'),tNew:v=>titForm(v),tBaixa:v=>tBaixa(v),tUndo:v=>tUndo(v),
 lcRev:v=>{closePops();const x=LANCS.find(y=>y.id===v);
  openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Reverter este lançamento?',`“${esc(x.desc)}” · ${R$(x.v)}. Em vez de apagar, o Alva cria o lançamento inverso e o original continua no histórico.`)}</div><label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="rvWhy" rows="2" placeholder="Ex.: valor lançado em duplicidade"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="rvOk" disabled>Reverter</button></div>`,'sm del');
  const w=$('#rvWhy'),b=$('#rvOk');w.addEventListener('input',()=>{b.disabled=!w.value.trim();});
  b.onclick=()=>{const n=LC(NOWD,x.comp,'Reversão: '+x.desc,x.cat,x.tipo==='e'?'s':'e',x.v,'ok','Rafael Pereira',{cc:x.cc,ct:x.ct});LANCS.push(n);x.rev=true;closeDlg();fRe();toast('Lançamento revertido',()=>{LANCS.splice(LANCS.indexOf(n),1);x.rev=false;fRe();});};},
 fcNew:()=>{openDlg(`${dlgHead('Nova conta financeira','Conta bancária ou caixa físico. O saldo inicial vale a partir da data informada.')}<form id="fcF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Conta da cantina" autocomplete="off" maxlength="40"></label>
   <div class="fld wide"><span class="fl">Tipo</span><input type="hidden" name="t" value="Conta bancária"><div class="fi-tg fc-tp">${[['Conta bancária','building'],['Caixa físico','wallet']].map((x,i)=>`<button type="button" data-t="${x[0]}" class="${i?'':'on'}">${ic(x[1],15,2)}${x[0]}</button>`).join('')}</div></div>
   <div class="igr-fold open wide" id="fcBk"><div><label class="fld" style="padding-bottom:2px"><span class="fl">Banco <small>opcional</small></span><input name="b" placeholder="Ex.: Itaú" autocomplete="off"></label></div></div>
   <label class="fld"><span class="fl">Saldo inicial</span><span class="fi-amt e"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld"><span class="fl">Saldo em</span><input type="date" name="d" value="${NOWD}"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Cadastrar conta</button></div></form>`,'sm');
  const f=$('#fcF'),ok=f.querySelector('[type=submit]');f.addEventListener('input',()=>{ok.disabled=!f.n.value.trim();});setTimeout(()=>f.n.focus(),80);
  $$('.fc-tp button',f).forEach(b=>b.onclick=()=>{f.t.value=b.dataset.t;$$('.fc-tp button',f).forEach(y=>y.classList.toggle('on',y===b));const bk=$('#fcBk'),on=b.dataset.t==='Conta bancária';bk.classList.toggle('open',on);bk.toggleAttribute('inert',!on);});
  f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(FCONTAS.some(c=>norm(c.n)===norm(n)))return toast('Já existe uma conta com esse nome');const v=+String(f.v.value).replace(/\./g,'').replace(',','.')||0;const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{FCONTAS.push({n,tipo:f.t.value,banco:f.t.value==='Caixa físico'?'':f.b.value.trim(),ini:v,atual:v,desde:f.d.value||NOWD});closeDlg();fRe();toast('Conta cadastrada');},450);});},
 fTransf:()=>{const opt=sel=>FCONTAS.map((c,i)=>`<option value="${i}" ${i===sel?'selected':''}>${esc(c.n)} · ${R$(c.atual)}</option>`).join('');
  openDlg(`${dlgHead('Transferir entre contas','Gera uma saída na origem e uma entrada no destino; entra como pendente em Aprovações.')}<form id="ftF" class="fgrid" novalidate>
   <label class="fld"><span class="fl">De</span><span class="selw"><select name="a">${opt(0)}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Para</span><span class="selw"><select name="b">${opt(Math.min(1,FCONTAS.length-1))}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Valor</span><span class="fi-amt s"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${NOWD}"></label>
   <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><input name="t" placeholder="Ex.: Reforço do caixa da cantina" autocomplete="off"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Enviar para aprovação</button></div></form>`,'sm');
  const f=$('#ftF'),ok=f.querySelector('[type=submit]'),val=()=>+String(f.v.value).replace(/\./g,'').replace(',','.')||0,chk=()=>{ok.disabled=!(val()>0)||f.a.value===f.b.value;};f.addEventListener('input',chk);f.addEventListener('change',chk);
  f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const a=FCONTAS[+f.a.value],b=FCONTAS[+f.b.value],v=val(),d=f.d.value||NOWD,t=f.t.value.trim();
   const mk=(acc,tipo,desc)=>{const l=LC(d,d.slice(0,7),desc,'Transferência',tipo,v,'pend','Rafael Pereira');l.tr=true;l.acc=acc;LANCS.push(l);APROVS.push(AP('lanc',desc,v,d,'Rafael Pereira',{tp:tipo,cat:'Transferência',lid:l.id}));};
   mk(a.n,'s',`Transferência para ${b.n}${t?' · '+t:''}`);mk(b.n,'e',`Transferência de ${a.n}${t?' · '+t:''}`);closeDlg();fRe();toast('Transferência enviada para aprovação');});},
 relTab:v=>{S.relTab=v;fRe();}, fpvTab:v=>{S.fpv=v;fRe();},fpvC:v=>{S.fpvC=v;fRe();},
 catNew:()=>catForm(),catEdit:v=>catForm(v),
 catOff:v=>{const was=FINAT.has(v);if(was)FINAT.delete(v);else FINAT.add(v);fRe();toast(was?`${v} reativada`:`${v} inativada: sai das escolhas, o histórico continua`,()=>{if(was)FINAT.add(v);else FINAT.delete(v);fRe();});},
 fechaMes:()=>{const next=ymAdd(FCLOSED[0][0],1);openDlg(`${dlgHead(`Fechar ${MONTHS[+next.slice(5)-1]}?`,'Depois de fechado, ninguém lança, edita nem aprova lançamentos desse mês. O Admin pode reabrir até o próximo fechamento.')}<div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" id="fcOk">Fechar ${MONTHS[+next.slice(5)-1]}</button></div>`,'sm');
  $('#fcOk').onclick=()=>{FCLOSED[0][1]='Selado';FCLOSED.unshift([next,'Fechado']);closeDlg();fRe();toast(`${monthName(next)} fechado`);};},
 fechaRe:()=>{openDlg(`${dlgHead('Reabrir o último mês fechado?',`${monthName(FCLOSED[0][0])} volta a aceitar lançamentos. Fica registrado quem reabriu e o motivo.`)}<label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="frWhy" rows="2" placeholder="Ex.: faltou lançar uma oferta de domingo"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" id="frOk" disabled>Reabrir</button></div>`,'sm');
  const w=$('#frWhy'),b=$('#frOk');w.addEventListener('input',()=>{b.disabled=!w.value.trim();});b.onclick=()=>{const m=FCLOSED.shift();closeDlg();fRe();toast(`${monthName(m[0])} reaberto`);};},
 crNew:()=>titForm('r'),
 dreV:v=>{S.dreV=v;S.dreOpen=null;fRe();},dreOpen:v=>{S.dreOpen=S.dreOpen===v?null:v;fRe();},
 ccNew:()=>ccForm(),ccEdit:v=>ccForm(v),ccOff:v=>{const c=CCUSTOS.find(x=>x.id===v);c.on=!c.on;fRe();toast(c.on?`${c.n} reativado`:`${c.n} inativado: sai das escolhas, o histórico continua`,()=>{c.on=!c.on;fRe();});},
 ctNew:()=>ctForm(),ctEdit:v=>ctForm(v),
 cnInvite:()=>{openDlg(`${dlgHead('Convidar o contador','Ele entra só para ler e baixar o pacote do mês.')}<form id="cnF" class="fgrid" novalidate><label class="fld wide"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Carlos Mendes" autocomplete="off"></label><label class="fld wide"><span class="fl">E-mail</span><input name="e" type="email" placeholder="contador@escritorio.com.br" autocomplete="off"></label><p class="who wide">Acesso somente leitura: DRE, lançamentos, plano de contas e exportações. Não lança, não aprova e não vê os outros módulos.</p><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Enviar convite</button></div></form>`,'sm');
  const f=$('#cnF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!f.n.value.trim()||!/.+@.+\..+/.test(f.e.value);};f.addEventListener('input',chk);setTimeout(()=>f.n.focus(),80);
  f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;CONTADORES.push({n:f.n.value.trim(),email:f.e.value.trim()});closeDlg();fRe();toast('Convite enviado ao contador');});},
 cnDel:v=>{const c=CONTADORES.splice(+v,1)[0];fRe();toast('Acesso removido',()=>{CONTADORES.splice(+v,0,c);fRe();});},
 apX:v=>{S.apOpen=S.apOpen===v?null:v;fRe();},
 apOk:(v,b)=>{const a=APROVS.find(x=>x.id===v);busy(b,600,'Aprovado',()=>{document.getElementById(v).classList.add('fi-gone');setTimeout(()=>{APROVS.splice(APROVS.indexOf(a),1);if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l){l.st='ok';fApply(l);}}(a.lids||[]).forEach(id=>{const l=LANCS.find(x=>x.id===id);if(l){l.st='ok';fApply(l);}});fRe();toast(a.tipo==='imp'?`${a.n} lançamentos importados`:'Lançamento aprovado · já conta no saldo');},350);});},
 apNo:v=>{const a=APROVS.find(x=>x.id===v);openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Rejeitar?',`“${esc(a.desc)}” não entra no caixa. ${esc(a.who.split(' ')[0])} recebe o motivo.`)}</div><label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="apWhy" rows="2" placeholder="Ex.: valor diferente do comprovante"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="apNoOk">Rejeitar</button></div>`,'sm del');
  $('#apNoOk').onclick=()=>{APROVS.splice(APROVS.indexOf(a),1);imUndo(a);if(a.lid){const i=LANCS.findIndex(x=>x.id===a.lid);if(i>=0)LANCS.splice(i,1);}closeDlg();fRe();toast('Rejeitado · motivo enviado');};},
 apAll:(v,b)=>busy(b,800,'Aprovados',()=>{const n=APROVS.length;APROVS.forEach(a=>{if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l){l.st='ok';fApply(l);}}(a.lids||[]).forEach(id=>{const l=LANCS.find(x=>x.id===id);if(l){l.st='ok';fApply(l);}});});APROVS.length=0;setTimeout(fRe,300);toast(`${n} itens aprovados`);}),
 relM:v=>{S.relM=v;S.mpY=null;S.mpYears=false;closePops();fRe();},
 relStep:v=>{if(S.relM[0]==='Y'){const y=+S.relM.slice(1)+ +v;if(y<+REL0.slice(0,4)||y>+RELN.slice(0,4))return;S.relM='Y'+y;fRe();return;}const n=ymAdd(S.relM,+v);if(n<REL0||n>RELN)return;S.relM=n;S.mpY=null;fRe();},
 mpMenu:()=>{const p=$('#mpPop');const o=!p.classList.contains('open');closePops();if(o)p.classList.add('open');},
 mpY:(v,b,e)=>{e&&e.stopPropagation();S.mpY=(S.mpY||+S.relM.slice(0,4))+ +v;mpRe();},
 mpYears:(v,b,e)=>{e&&e.stopPropagation();S.mpYears=!S.mpYears;mpRe();},
 mpPickY:(v,b,e)=>{e&&e.stopPropagation();S.mpY=+v;S.mpYears=false;mpRe();},
 imPick:v=>{S.im={step:1,type:v,conta:Math.max(0,FCONTAS.findIndex(c=>c.tipo==='Conta bancária')),file:null,filter:'todas'};fGo();},
 imBack:()=>{const I=imS();I.step=Math.max(0,I.step-1);if(!I.step)S.im={step:0};fGo();},
 imReset:()=>{S.im={step:0};fGo();},
 imPickFile:()=>{const I=imS();I.file=imFileName(I);if(I.type==='extrato')I.lines=imLines();fRe();},
 imFileX:()=>{imS().file=null;fRe();},
 imRead:(v,b)=>busy(b,900,'Lido',()=>{const I=imS();if(I.type==='extrato'){I.file=imFileName(I);I.lines=imLines();}I.rows=imAnalyze(I);I.step=2;I.filter='todas';fGo();}),
 imFilter:v=>{imS().filter=v;fRe();},
 imAgain:()=>{const I=imS();I.rows=imAnalyze(I);I.step=2;I.filter='todas';fGo();},
 imConfirm:()=>{const I=imS(),e=imEff(I.rows),ex=I.type==='extrato';
  if(e.dec){I.filter='atencao';fRe();return toast(`Decida ${e.dec} possível(is) duplicado(s) antes de confirmar: o Alva nunca decide por você.`);}
  if(ex&&I.rows.some(r=>r.act==='criar'&&!r.cat)){I.filter='todas';fRe();return toast('Escolha a conta do plano das linhas novas antes de confirmar.');}
  if(!(e.criar+e.baixar+e.aplicar+e.atualizar))return toast('Nenhuma linha será importada com as ações atuais.');
  openDlg(`${dlgHead('Confirmar importação?')}<p class="who" style="margin:0 0 14px">${ex?`Serão ${e.criar} lançamento(s) criado(s) e ${e.baixar} baixa(s) de conta a pagar ou a receber. Tudo vai para <b>Aprovações</b>; o efeito no saldo é ${R$(e.saldo,true)} depois de aprovado.`:`Serão ${e.aplicar+e.atualizar} código(s) contábil(is) preenchido(s) e ${e.criar} conta(s) criada(s). Nada é apagado.`}</p><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" id="imGo">${ic('check',14,2.4)}Confirmar</button></div>`,'sm');
  $('#imGo').onclick=ev=>busy(ev.currentTarget,900,'Importado',()=>{I.res=imApply(I);I.step=3;closeDlg();fGo();});},
 
 
 
 
 
 
};

/* Melhoria 3 (reunião com líderes, 05/11/2026): página Mensagens do Financeiro — o mesmo componente das abas Mensagens, em nome do setor. */
function fMsg(){return fHead('Mensagens','O que o Financeiro já mandou à igreja e o que está na fila',msgBtn('free|Financeiro|','btn pri'))+msgTabHtml('fin');}
{const _phf=placeholder;placeholder=id=>id==='fmsg'?fMsg():_phf(id);}
{const _phc=placeholder;placeholder=id=>id==='fcc'?fCC():id==='fcto'?fCto():id==='fcont'?fCont():_phc(id);}
