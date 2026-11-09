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
const CTO=(id,n,doc,tp,email='',tel='',x={})=>({id,n,doc,tp,email,tel,mb:'',role:'',...x});
const memId=n=>(MEMBERS.find(m=>m.n===n)||{}).id||'';
const CONTATOS=[CTO('ct1','Companhia de Energia','00.111.222/0001-01','f','atendimento@energia.example','(11) 3000-1001'),CTO('ct2','Gráfica Rápida Ltda','00.111.222/0001-02','f','vendas@graficarapida.example','(11) 98800-2002'),CTO('ct3','Imobiliária Central','00.111.222/0001-03','f','contratos@imobcentral.example','(11) 3000-3003'),CTO('ct4','NetFácil Telecom','00.111.222/0001-04','f','empresas@netfacil.example','0800 000 4004'),CTO('ct5','Seguradora Segura','00.111.222/0001-05','f','corretor@segura.example','(11) 3000-5005'),CTO('ct6','Som & Luz Equipamentos','00.111.222/0001-06','f','','(11) 97700-6006'),CTO('ct7','Distribuidora Limpa Bem','00.111.222/0001-07','f','pedidos@limpabem.example','(11) 3000-7007'),CTO('ct8','Associação Esportiva Vida','00.111.222/0001-08','c','diretoria@esportivavida.example','(11) 96600-8008'),CTO('ct9','Daniel Rocha','','u','daniel.rocha@igreja.example','(11) 96655-0009',{role:'Pastor'}),CTO('ct10','Patrícia Oliveira Nunes','','u','patricia.on@email.com','(11) 97800-8823',{role:'Secretária',mb:memId('Patrícia Oliveira Nunes')}),CTO('ct11','João Batista','','u','','(11) 95544-0011',{role:'Zelador'})];
let _lid=0;const LC=(d,comp,desc,cat,tipo,v,st='ok',who='Rafael Pereira',x={})=>({id:'lc'+(++_lid),d,comp,desc,cat,tipo,v,st,who,cc:'cc1',...x});
const LANCS=[
 LC('2026-09-20','2026-09','Transferência de Conta principal','Transferência','e',300,'ok','Rafael Pereira',{tr:true,acc:'Caixa físico',cc:'cc1'}),
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
[['2026-09-05','Salário — Patrícia Oliveira Nunes','Salários','s',4600,'','ct10'],['2026-09-05','Salário — João Batista','Salários','s',2200,'','ct11'],['2026-09-05','Ajuda de custo — Daniel Rocha','Ajuda de custo pastoral','s',4500,'','ct9'],['2026-09-20','Encargos e benefícios — setembro','Encargos e benefícios','s',2060],
 ['2026-09-12','Vendas — Cafeteria','Vendas','e',3680,'cc3'],['2026-09-12','Vendas — Loja','Vendas','e',1190,'cc5'],['2026-09-12','Taxas de maquininha','Taxas de maquininha','s',148,'cc3'],
 ['2026-09-14','Ofertas — Culto Dom','Ofertas','e',2140,'cc2'],['2026-09-18','Ação social — cestas básicas','Ação social','s',620],['2026-09-19','Ministério de Louvor — material','Ministérios','s',780,'cc2'],
 ['2026-09-22','Oferta para Missões','Missões','s',1400,'cc8'],['2026-09-30','Tarifas bancárias','Tarifas bancárias','s',89.9],['2026-09-30','Rendimentos da aplicação','Rendimentos de aplicação','e',214.35],
 ['2026-09-20','Custo do Retiro de Jovens','Custo de eventos','s',2150,'cc6'],['2026-09-27','Inscrições — Retiro de Jovens 2026','Inscrições','e',10440,'cc6']
].forEach(r=>LANCS.push(LC(r[0],r[0].slice(0,7),r[1],r[2],r[3],r[4],'ok','Rafael Pereira',{cc:r[5]||'cc1',ct:r[6]||''})));
{let s=7;const r=()=>{s=(s*9301+49297)%233280;return s/233280;},rd=(a,b)=>Math.round((a+(b-a)*r())/10)*10;
 ['2026-04','2026-05','2026-06','2026-07','2026-08'].forEach(ym=>{
  const P=(dia,desc,cat,tipo,v,cc,ct)=>{if(v>0)LANCS.push(LC(`${ym}-${dia}`,ym,desc,cat,tipo,v,'ok','Rafael Pereira',{cc:cc||'cc1',ct:ct||''}));};
  const ins=r()<.35?rd(4000,9000):0;
  P('07','Dízimos e Ofertas — Culto Dom','Dízimos','e',rd(10800,12600),'cc2');P('21','Dízimos e Ofertas — Culto Dom','Dízimos','e',rd(10600,12400),'cc2');P('14','Ofertas — Culto Dom','Ofertas','e',rd(1800,2500),'cc2');
  P('18','Campanha','Doações','e',r()<.7?rd(2000,5800):0,'cc9');P('12','Vendas — Cafeteria','Vendas','e',rd(3100,3900),'cc3');P('12','Vendas — Loja','Vendas','e',rd(800,1400),'cc5');
  P('15','Inscrições — retiro','Inscrições','e',ins,'cc6');P('16','Custo do retiro','Custo de eventos','s',ins?Math.round(ins*.3/10)*10:0,'cc6');P('13','Taxas de maquininha','Taxas de maquininha','s',rd(110,160),'cc3');
  P('05','Salário — Patrícia Oliveira Nunes','Salários','s',4600,'cc1','ct10');P('05','Salário — João Batista','Salários','s',2200,'cc1','ct11');P('05','Ajuda de custo — Daniel Rocha','Ajuda de custo pastoral','s',4500,'cc1','ct9');P('20','Encargos e benefícios','Encargos e benefícios','s',2060);
  P('10','Aluguel do salão','Estrutura','s',3200,'cc1','ct3');P('28','Energia elétrica','Estrutura','s',rd(580,720),'cc1','ct1');P('08','Internet e telefonia','Estrutura','s',289,'cc1','ct4');P('11','Aluguel do salão — Associação Esportiva Vida','Aluguel de espaços','e',1200,'cc1','ct8');
  P('17','Manutenção','Manutenção','s',rd(200,1400),'cc1','ct7');P('19','Comunicação','Comunicação','s',r()<.6?rd(300,900):0,'cc2','ct2');P('22','Missões','Missões','s',r()<.6?rd(800,1800):0,'cc8');
  P('23','Ministérios','Ministérios','s',rd(400,1300),'cc2');P('24','Ação social','Ação social','s',rd(450,900));P('30','Tarifas bancárias','Tarifas bancárias','s',89.9);P('30','Rendimentos da aplicação','Rendimentos de aplicação','e',rd(180,260));});}
/* comprovante (Tiago, 06/11/2026): anexo OPCIONAL, como nos outros sistemas; a saída sem comprovante vai marcada para quem aprova, que decide. Não se cobra de transferência, tarifa bancária e estorno de venda lançado pelo módulo da loja */
const CPISENTA=new Set(['Tarifas bancárias','Estornos de vendas']),cpReq=l=>l.tipo==='s'&&!l.tr&&!CPISENTA.has(l.cat),cpMiss=l=>cpReq(l)&&!l.cp;
{const sem=['Manutenção ar-condicionado','Ação social — cestas básicas'];LANCS.forEach(l=>{if(l.st==='ok'&&cpReq(l)&&!sem.includes(l.desc))l.cp='comprovante-'+l.d+'.pdf';});}
const cpField=(cur,req)=>`<span class="fl">Comprovante <small>opcional</small></span><label class="cp-pick ${cur?'has':''}"><input type="file" name="cpf" accept=".pdf,image/*"><span class="cp-t">${cur?`${ic('file',16,2)}<b>${esc(cur)}</b><em>Trocar</em>`:`${ic('plus',16,2.2)}<b>Anexar comprovante</b><small>PDF ou imagem</small>`}</span></label>`;
/* títulos: contas a pagar e a receber têm contato, emissão, competência, conta do plano, centro de custo e baixas (parciais, com juros e desconto) */
const tPg=t=>(t.baixas||[]).reduce((a,b)=>a+b.v,0),tSd=t=>Math.max(0,Math.round((t.v-tPg(t))*100)/100);
let _pid2=0;const CP=(desc,venc,v,cat,ct,o={})=>({id:'cp'+(++_pid2),desc,venc,v,cat,ct,em:venc,comp:venc.slice(0,7),cc:'cc1',paid:false,baixas:[],...o});
const PAGAR=[
 CP('Energia elétrica','2026-09-28',640,'Estrutura','ct1',{em:'2026-09-10',comp:'2026-09',rep:1,sid:'sd1',si:1,v0:'2026-09-28',cc:'cc2',rt:[{cc:'cc2',pct:60},{cc:'cc3',pct:25},{cc:'cc5',pct:15}]}),
 CP('Fornecedor gráfica — banners','2026-09-30',890,'Comunicação','ct2',{em:'2026-09-15',comp:'2026-09',cc:'cc2'}),
 CP('Aluguel do salão — Outubro','2026-10-05',3200,'Estrutura','ct3',{em:'2026-09-25',rep:1,sid:'sd2',si:1,v0:'2026-10-05'}),
 CP('Internet e telefonia','2026-10-08',289,'Estrutura','ct4',{em:'2026-09-28',rep:1,sid:'sd3',si:1,v0:'2026-10-08'}),
 CP('Seguro do prédio','2026-10-20',1150,'Estrutura','ct5',{em:'2026-09-20'}),
 CP('Equipamentos de som','2026-08-20',2400,'Manutenção','ct6',{em:'2026-08-20',comp:'2026-08',cc:'cc2',par:1,sid:'sd4',si:1,sn:3,paid:true,paidAt:'2026-08-20',paidV:2400,baixas:[{d:'2026-08-20',v:2400,j:0,dc:0,ids:[]}]}),
 CP('Equipamentos de som','2026-09-20',2400,'Manutenção','ct6',{em:'2026-08-20',comp:'2026-09',cc:'cc2',par:1,sid:'sd4',si:2,sn:3,baixas:[{d:'2026-09-20',v:1000,j:0,dc:0,ids:[]}]}),
 CP('Equipamentos de som','2026-10-20',2400,'Manutenção','ct6',{em:'2026-08-20',comp:'2026-10',cc:'cc2',par:1,sid:'sd4',si:3,sn:3}),
 CP('Reembolso de despesa — material de escritório','2026-10-07',185,'Estrutura','ct10',{em:'2026-09-28',comp:'2026-09'}),
 CP('Material de limpeza','2026-09-10',340,'Manutenção','ct7',{em:'2026-09-01',comp:'2026-09',paid:true,paidAt:'2026-09-10',paidV:340,baixas:[{d:'2026-09-10',v:340,j:0,dc:0,ids:['lc5']}]})];
let _crid=0;const CR=(desc,prev,v,cat,ct,o={})=>({id:'cr'+(++_crid),desc,prev,v,got:0,src:'Cadastro manual',cat,ct,em:prev||'2026-09-01',comp:(prev||'2026-10').slice(0,7),cc:'cc1',baixas:[],...o});
const _insc=LANCS.find(l=>l.desc==='Inscrições — Retiro de Jovens 2026').id;
const RECEB=[
 CR('Inscrições — Retiro de Jovens 2026','2026-09-27',10440,'Inscrições','',{em:'2026-08-15',comp:'2026-09',cc:'cc6',got:10440,recAt:'2026-09-27',recV:10440,baixas:[{d:'2026-09-27',v:10440,j:0,dc:0,ids:[_insc]}]}),
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
const optCt=(sel,k)=>`<option value="">Sem contato</option>`+CONTATOS.filter(c=>!k||c.tp==='a'||c.tp===k||c.id===sel||(k==='f'&&c.tp==='u')).map(c=>`<option value="${c.id}" ${c.id===sel?'selected':''}>${esc(c.n)}</option>`).join('');
const ccN=id=>(CCUSTOS.find(c=>c.id===id)||{n:'—'}).n,ctN=id=>(CONTATOS.find(c=>c.id===id)||{n:''}).n,pVal=s=>+String(s).replace(/\./g,'').replace(',','.')||0;
const fHead=(t,lede,act='')=>`<header class="ph rise"><div><p class="eb">Financeiro</p><h1>${t}</h1><p class="lede">${lede}</p></div><div class="pact">${act}</div></header>`;
const dDays=iso=>Math.round((new Date(iso+'T12:00')-new Date(NOWD+'T12:00'))/864e5);

/* ---------- Visão geral ---------- */
/* Visão geral: os próximos 7 dias e o caixa nos próximos 30 (parcial fácil 1 e 2 · 06/11/2026). Conta vencida entra no dia de hoje; conta a receber sem data prevista fica de fora. */
function fvProj(){const N=30,sal0=fSaldo(),dd=Array(N+1).fill(0);let semData=0,e7=0,s7=0,venc=0,ne=0,ns=0;
 [['p',PAGAR],['r',RECEB]].forEach(([k,L])=>L.forEach(t=>{const v=tSd(t);if(v<=0)return;const dt=tVenc(t,k);if(!dt){semData++;return;}const d=Math.max(0,dDays(dt));if(d>N)return;dd[d]+=k==='r'?v:-v;
  if(d<=7){if(k==='r'){e7+=v;ne++;}else{s7+=v;ns++;if(dDays(dt)<0)venc+=v;}}}));
 const pts=[];let s=sal0;dd.forEach(x=>{s+=x;pts.push(s);});
 const mn=Math.min(...pts),mi=pts.indexOf(mn),lo=Math.min(mn,sal0),hi=Math.max(...pts,sal0),W=600,H=150,sx=i=>i/N*W,sy=v=>H-10-(v-lo)/((hi-lo)||1)*(H-26),sal7=sal0+e7-s7;
 const path=pts.map((v,i)=>(i?'L':'M')+sx(i).toFixed(1)+' '+sy(v).toFixed(1)).join(' ');
 return `<section class="card fv-prj rise" style="--d:2"><div class="sh"><div><h2>Próximos 7 dias</h2><p class="who" style="margin:4px 0 0">O que entra e o que sai até a semana acabar, e como o caixa fica nos próximos 30 dias.</p></div><button class="btn sec sm" data-a="ftkGo" data-v="p">Contas ${ic('arrowR',13,2)}</button></div>
  <div class="fv-pj"><div class="fv-pl"><div><span>Saldo das contas hoje</span><b>${R$(sal0)}</b></div>
   <div><span>A receber <small>${ne} ${ne===1?'conta':'contas'}</small></span><b class="e">${R$(e7,true)}</b></div>
   <div><span>A pagar <small>${ns} ${ns===1?'conta':'contas'}${venc?` · inclui ${R$(venc)} vencido`:''}</small></span><b class="s">${R$(-s7)}</b></div>
   <div class="tot"><span>Saldo projetado em 7 dias</span><b class="${sal7<0?'neg':''}">${R$(sal7)}</b></div></div>
   <div class="fv-pc"><div class="fv-pw"><svg class="fv-pg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><line x1="${sx(7)}" y1="0" x2="${sx(7)}" y2="${H}"/><path d="${path}"/></svg><div class="fv-pd"><i style="left:0;top:${(sy(sal0)/H*100).toFixed(1)}%"></i><i class="mn" style="left:${(sx(mi)/W*100).toFixed(1)}%;top:${(sy(mn)/H*100).toFixed(1)}%"></i></div></div>
    <div class="fv-pa"><span>Hoje</span><span style="margin-left:${(7/N*100-8).toFixed(0)}%">7 dias</span><span style="margin-left:auto">30 dias</span></div>
    <p class="fv-pn">Menor saldo nos próximos 30 dias: <b class="${mn<0?'neg':''}">${R$(mn)}</b>${mi?` em ${dBR(addD(NOWD,mi))}`:' (hoje)'}.${semData?` ${semData} ${semData===1?'conta sem data prevista ficou':'contas sem data prevista ficaram'} de fora.`:''}</p></div></div></section>`;}

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
 ${fvProj()}
 <p class="eb rise" style="--d:2;margin:6px 0 -4px">Precisam de atenção</p>
 <div class="fv-act four rise" style="--d:2">
  <button class="card fv-a ${late.length?'bad':'ok'}" data-a="ftkGo" data-v="p"><span class="fv-ai">${ic('clock',18)}</span><b class="fv-an">${late.length}</b><span class="fv-at"><b>conta${late.length===1?'':'s'} atrasada${late.length===1?'':'s'}</b><span>${late.length?R$(late.reduce((a,p)=>a+p.v,0)):'Tudo em dia'}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a wait" data-a="ftkGo" data-v="p"><span class="fv-ai">${ic('calendar',18)}</span><b class="fv-an">${soon.length}</b><span class="fv-at"><b>vence${soon.length===1?'':'m'} em 7 dias</b><span>${R$(soon.reduce((a,p)=>a+p.v,0))}</span></span>${ic('arrowR',15,2)}</button>
  <button class="card fv-a brand" data-a="nav" data-v="fapr"><span class="fv-ai">${ic('check',18,2.2)}</span><b class="fv-an">${APROVS.length}</b><span class="fv-at"><b>aguardando aprovação</b><span>${APROVS.length?APROVS.map(a=>a.tipo==='imp'?'extrato':'lançamento').join(' + '):'Nada pendente'}</span></span>${ic('arrowR',15,2)}</button>
  ${(()=>{const pe=FEDOCS.filter(d=>d.st==='pend'),old=pe.length?Math.max(...pe.map(d=>-dDays(d.q.slice(0,10)))):0;return `<button class="card fv-a ${pe.length?'wait':'ok'}" data-a="nav" data-v="fent"><span class="fv-ai">${ic('file',18)}</span><b class="fv-an">${pe.length}</b><span class="fv-at"><b>na caixa de entrada</b><span>${pe.length?'esperando lançamento · mais antigo '+(old===0?'de hoje':'há '+old+(old===1?' dia':' dias')):'Nada para tratar'}</span></span>${ic('arrowR',15,2)}</button>`;})()}</div>
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
/* ---------- Caixa de entrada: documentos que chegam por envio manual, e-mail e WhatsApp, para virar despesa (06/11/2026) ---------- */
Object.assign(S,{fet:'pend',feo:'todos'});
const FE_OR={manual:['Envio manual','upload'],email:['E-mail','mail'],zap:['WhatsApp','message']};
const FE_MAIL='financeiro-vida@entrada.alva.app';
let _fed=0;const FD=(nome,orig,de,dt,hh,x={})=>({id:'fd'+(++_fed),nome,orig,de,q:addD(NOWD,dt)+'T'+hh,st:'pend',kb:100,...x});
const FEDOCS=[
 FD('boleto-energia-setembro.pdf','email','faturas@energia.example',0,'09:10',{kb:184}),
 FD('comprovante-pix-grafica.pdf','email','vendas@graficarapida.example',0,'08:40',{kb:96}),
 FD('print-compra-equipamento-som.jpg','zap','Marcos (Louvor) · (11) 97700-0000',-1,'17:22',{kb:812}),
 FD('nota-material-limpeza.pdf','manual','Rafael Pereira',-2,'14:05',{kb:143}),
 FD('recibo-aluguel-salao.pdf','email','contratos@imobcentral.example',-3,'10:31',{kb:121}),
 FD('print-fornecedor-cafeteria.jpg','zap','Lúcia (Cafeteria) · (11) 96600-0000',-4,'19:48',{kb:655}),
 FD('comprovante-material-limpeza.pdf','email','pedidos@limpabem.example',-6,'11:12',{kb:99,st:'lanc'}),
 FD('boleto-internet-setembro.pdf','email','empresas@netfacil.example',-8,'08:03',{kb:130,st:'lanc'}),
 FD('foto-recibo-antigo.jpg','manual','Rafael Pereira',-9,'16:20',{kb:540,st:'arq',nota:'Sem valor fiscal'})
];
const feImg=n=>/\.(jpe?g|png|heic|webp)$/i.test(n);
const feQuando=q=>{const d=q.slice(0,10),h=q.slice(11,16),n=dDays(d);return (n===0?'hoje':n===-1?'ontem':dBR(d).slice(0,5))+' '+h;};
const feRow=d=>`<div class="fe-r ${d.st!=='pend'?'done':''}"><span class="fe-i">${ic(feImg(d.nome)?'camera':'file',18,1.8)}</span><span class="fe-t"><b>${esc(d.nome)}</b><small>${ic(FE_OR[d.orig][1],12,2)} ${FE_OR[d.orig][0]} · ${esc(d.de)} · ${feQuando(d.q)} · ${d.kb} KB</small></span>${d.st==='pend'?`<span class="fe-a"><button class="btn sec sm" data-a="feTreat" data-v="${d.id}">Tratar</button><button class="btn sec sm" data-a="feArq" data-v="${d.id}">Arquivar</button></span>`:`<span class="fe-s">${d.st==='lanc'?'Lançado':'Arquivado'}${d.nota?' · '+esc(d.nota):''}</span>`}</div>`;
function fEnt(){
 const st=S.fet||'pend',o=S.feo||'todos',pend=FEDOCS.filter(d=>d.st==='pend'),hist=FEDOCS.filter(d=>d.st!=='pend'),base=st==='pend'?pend:hist,L=base.filter(d=>o==='todos'||d.orig===o).sort((a,b)=>a.q<b.q?1:-1);
 const old=pend.length?Math.max(...pend.map(d=>-dDays(d.q.slice(0,10)))):0,mes=hist.filter(d=>d.st==='lanc').length;
 return fHead('Caixa de entrada','Comprovantes e documentos que chegaram. Abra um e lance a despesa',`<button class="btn sec" data-a="feCanais">${ic('link',15)}Canais</button><button class="btn pri" data-a="feUp">${ic('upload',15)}Enviar documentos</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Pendentes</span><span class="kv">${pend.length}</span><span class="kd">esperando lançamento</span></div><div class="k4"><span class="kl">Mais antigo</span><span class="kv" style="${old>3?'color:var(--st-rec)':''}">${pend.length?(old===0?'hoje':old+' '+(old===1?'dia':'dias')):'—'}</span><span class="kd">${pend.length?'sem tratar':'nada esperando'}</span></div><div class="k4"><span class="kl">Lançados</span><span class="kv">${mes}</span><span class="kd">viraram despesa</span></div><div class="k4"><span class="kl">Arquivados</span><span class="kv">${hist.filter(d=>d.st==='arq').length}</span><span class="kd">sem lançamento</span></div></section>`
 +sxSeg('fet',[['pend','Pendentes',pend.length],['hist','Histórico',hist.length]],st)
 +`<section class="card mtab rise" style="--d:3"><div class="tbar"><div class="chips">${[['todos','Todos'],['email','E-mail'],['zap','WhatsApp'],['manual','Manual']].map(c=>`<button class="chipf ${o===c[0]?'on':''}" data-a="feO" data-v="${c[0]}">${c[1]}<small class="cnt">${base.filter(d=>c[0]==='todos'||d.orig===c[0]).length}</small></button>`).join('')}</div></div>
  ${L.length?L.map(feRow).join(''):`<div class="mempty"><p>${st==='pend'?'Nada esperando':'Nada no histórico'}</p><span>${st==='pend'?'Os documentos que chegarem por e-mail, WhatsApp ou envio manual aparecem aqui.':'Os documentos lançados ou arquivados ficam aqui.'}</span></div>`}
  <div class="tfoot"><span>${L.length} ${L.length===1?'documento':'documentos'}</span><span>${st==='pend'?'Abra um documento para lançar a despesa ou anexá-lo a um lançamento':'Só para consulta'}</span></div></section>`;}
/* envio manual: vários arquivos de uma vez */
function feAdd(files){const n=[...files].map(f=>FD(f.name,'manual','Rafael Pereira',0,new Date().toTimeString().slice(0,5),{kb:Math.max(1,Math.round((f.size||102400)/1024))}));n.forEach(d=>FEDOCS.push(d));return n;}
/* tratar um documento: despesa já paga, agendar pagamento ou anexar a um lançamento que está sem comprovante */
function feTreat(id){const d=FEDOCS.find(x=>x.id===id);let mode='pago';const nm=d.nome.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ');
 openDlg(`${dlgHead('Tratar documento',esc(d.nome))}
  <div class="fe-pv"><span class="fe-pvi">${ic(feImg(d.nome)?'camera':'file',30,1.5)}</span><div><b>${esc(d.nome)}</b><small>${FE_OR[d.orig][0]} · ${esc(d.de)} · ${feQuando(d.q)} · ${d.kb} KB</small><small class="soft">Aqui aparece a prévia do arquivo. Este protótipo não abre o arquivo.</small></div></div>
  <div class="fi-tg fe-m" id="feM"><button type="button" data-m="pago" class="on">Despesa já paga</button><button type="button" data-m="agenda">Agendar pagamento</button><button type="button" data-m="vinc">Anexar a um lançamento</button></div>
  <form id="feF" class="fgrid" novalidate></form>`,'lg');
 const box=$('#feF');
 const cmn=`<label class="fld wide"><span class="fl">Descrição</span><input name="desc" value="${esc(nm)}" maxlength="80" autocomplete="off"></label>`;
 const tail=(lab,dis)=>`<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" ${dis?'disabled':''}>${lab}</button></div>`;
 const paint=()=>{
  if(mode==='pago')box.innerHTML=`<label class="fld"><span class="fl">Valor</span><span class="fi-amt s"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00" autocomplete="off"></span></label><label class="fld"><span class="fl">Data do pagamento</span><input type="date" name="d" value="${NOWD}"></label>${cmn}<label class="fld wide"><span class="fl">Conta do plano</span>${selw('cat',optConta('s',''))}</label><label class="fld"><span class="fl">Fornecedor <small>opcional</small></span>${selw('ct',optCt('','f'))}</label><label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC('cc1'))}</label><label class="fld wide"><span class="fl">Conta financeira</span>${selw('ac',FCONTAS.map(c=>`<option>${esc(c.n)}</option>`).join(''))}</label><p class="fi-note wide">${ic('info',14)}<span>O documento vira o <b>comprovante</b> e o lançamento já entra <b>aprovado</b>.</span></p>${tail('Lançar despesa',true)}`;
  else if(mode==='agenda')box.innerHTML=`<label class="fld"><span class="fl">Valor</span><span class="fi-amt s"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00" autocomplete="off"></span></label><label class="fld"><span class="fl">Vencimento</span><input type="date" name="venc" value="${addD(NOWD,7)}"></label>${cmn}<label class="fld wide"><span class="fl">Conta do plano</span>${selw('cat',optConta('s',''))}</label><label class="fld"><span class="fl">Fornecedor <small>opcional</small></span>${selw('ct',optCt('','f'))}</label><label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC('cc1'))}</label><p class="fi-note wide">${ic('info',14)}<span>Entra em <b>Contas a pagar</b>. Quando você der baixa, o documento já vem como comprovante.</span></p>${tail('Agendar pagamento',true)}`;
  else{const c=LANCS.filter(l=>cpMiss(l)&&!l.tr).sort((a,b)=>a.d<b.d?1:-1).slice(0,8);
   box.innerHTML=c.length?`<div class="fld wide"><span class="fl">Escolha o lançamento que está sem comprovante</span><div class="fe-pk">${c.map((l,i)=>`<label><input type="radio" name="lc" value="${l.id}" ${i?'':'checked'}><span class="dkt"><b>${esc(l.desc)}</b><small>${dBR(l.d)} · ${esc(l.cat)}${l.st==='pend'?' · aguardando aprovação':''}</small></span><em>${R$(l.v)}</em></label>`).join('')}</div></div>${tail('Anexar como comprovante',false)}`:`<p class="who wide">Nenhum lançamento está sem comprovante. Use "Despesa já paga" ou "Agendar pagamento".</p>${tail('Anexar como comprovante',true)}`;}
  const f=box,ok=f.querySelector('[type=submit]'),chk=()=>{if(mode==='vinc')return;ok.disabled=!(pVal(f.v.value)>0)||!f.cat.value;};
  f.oninput=chk;f.onchange=chk;if(f.v)setTimeout(()=>f.v.focus(),60);};
 $$('#feM button').forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('#feM button').forEach(y=>y.classList.toggle('on',y===b));paint();});
 box.addEventListener('submit',e=>{e.preventDefault();const f=box,ok=f.querySelector('[type=submit]');if(ok.disabled)return;
  if(mode==='pago'){const n=LC(f.d.value||NOWD,(f.d.value||NOWD).slice(0,7),f.desc.value.trim()||nm,f.cat.value,'s',pVal(f.v.value),'ok','Rafael Pereira',{cc:f.cc.value,ct:f.ct.value,acc:f.ac.value,cp:d.nome,orig:'Caixa de entrada'});LANCS.push(n);d.st='lanc';d.lid=n.id;closeDlg();fRe();
   toast('Despesa lançada e aprovada',()=>{LANCS.splice(LANCS.indexOf(n),1);d.st='pend';delete d.lid;fRe();});}
  else if(mode==='agenda'){const t=CP(f.desc.value.trim()||nm,f.venc.value,pVal(f.v.value),f.cat.value,f.ct.value,{em:NOWD,comp:(f.venc.value||NOWD).slice(0,7),cc:f.cc.value,doc:d.nome});PAGAR.push(t);d.st='lanc';d.tid=t.id;closeDlg();fRe();
   toast('Pagamento agendado em Contas a pagar',()=>{PAGAR.splice(PAGAR.indexOf(t),1);d.st='pend';delete d.tid;fRe();});}
  else{const l=LANCS.find(x=>x.id===f.lc.value);if(!l)return;l.cp=d.nome;d.st='lanc';d.lid=l.id;closeDlg();fRe();
   toast('Anexado como comprovante de '+l.desc,()=>{l.cp='';d.st='pend';delete d.lid;fRe();});}});
 paint();}
/* canais: como os documentos chegam */
function feCanais(){const wa=(typeof cnGet==='function'?cnGet('wa'):null),on=!!(wa&&wa.on);
 const row=(ic1,t,s,st,btn)=>`<div class="cn-p"><span class="htile" style="--s:38px;background:var(--brand-soft);color:var(--brand-text)">${ic(ic1,17)}</span><span class="dkt"><b>${t}</b><span>${s}</span></span>${st}${btn||''}</div>`;
 const pill=(t,a)=>`<em style="${a?'color:var(--st-int);background:var(--st-int-bg)':''}">${t}</em>`;
 openDlg(`${dlgHead('Canais da caixa de entrada','Tudo o que chegar por aqui aparece na lista de pendentes.')}<div class="cn-pk" style="margin:0 -24px">
  ${row('upload','Envio manual','Você sobe os arquivos direto na tela, vários de uma vez.',pill('Ativo',true),`<button class="btn sec sm" data-a="feUp">Enviar</button>`)}
  ${row('mail','E-mail',`Peça a fornecedores e líderes para encaminhar os comprovantes para <b>${FE_MAIL}</b>.`,pill('Ativo',true),`<button class="btn sec sm" data-a="feCopy">Copiar</button>`)}
  ${row('message','WhatsApp',on?`Quem mandar foto ou PDF para o número <b>${esc(wa.num)}</b> cai na caixa de entrada.`:'O número de recebimento ainda não foi configurado.',pill(on?'Ativo':'Desligado',on),`<button class="btn sec sm" data-a="feCfg">${on?'Ver conexão':'Configurar'}</button>`)}</div>
  <p class="who" style="margin:12px 0 0">O número do WhatsApp e o endereço do webhook ficam em Administração › Parâmetros do sistema › Conectores, e quem configura é o administrador do sistema.</p>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'lg');}
/* ---------- Lançamentos ---------- */
function fLanc(){
 const q=norm(S.lq),mm=S.relM,mn=MONTHS[+mm.slice(5)-1],all=LANCS.filter(x=>x.comp===mm).sort((a,b)=>a.d<b.d?1:-1),l=all.filter(x=>(S.lf==='todos'||(S.lf==='pend'?x.st==='pend':x.tipo===S.lf&&x.st==='ok'))&&(!q||norm(x.desc+' '+x.cat).includes(q))),ok=all.filter(x=>x.st==='ok'&&!x.tr);
 return fHead('Lançamentos',`Entradas e saídas · competência de ${monthName(mm)}`,`${rpBtn('financeiro','lancamentos')}<button class="btn pri" data-a="lcNew">${ic('plus',15,2.2)}Novo lançamento</button>`)
 +`${fMes()}<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Entradas em ${mn}</span><span class="kv" style="color:var(--st-int)">${R$(sumT(ok,'e'))}</span><span class="kd">${ok.filter(x=>x.tipo==='e').length} lançamentos</span></div><div class="k4"><span class="kl">Saídas em ${mn}</span><span class="kv" style="color:var(--st-rec)">${R$(sumT(ok,'s'))}</span><span class="kd">${ok.filter(x=>x.tipo==='s').length} lançamentos</span></div><div class="k4"><span class="kl">Saldo</span><span class="kv">${R$(sumT(ok,'e')-sumT(ok,'s'))}</span><span class="kd">competência ${compTxt(mm)}</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv" style="${all.some(x=>x.st==='pend')?'color:var(--st-sol)':''}">${all.filter(x=>x.st==='pend').length}</span><span class="kd">ainda não contam no saldo</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="lq" placeholder="Buscar descrição ou categoria" value="${esc(S.lq)}" autocomplete="off"></label><div class="chips">${[['todos','Todos'],['e','Entradas'],['s','Saídas'],['pend','Aguardando']].map(c=>`<button class="chipf ${S.lf===c[0]?'on':''}" data-a="lcF" data-v="${c[0]}">${c[0]==='e'?'<i style="background:var(--st-int)"></i>':c[0]==='s'?'<i style="background:var(--st-rec)"></i>':''}${c[1]}</button>`).join('')}</div></div>
  ${l.length?`<div class="trow lc thead"><span>Lançamento</span><span>Categoria</span><span>Competência</span><span>Valor</span><span></span></div>${l.map(x=>`<div class="trow lc ${x.st==='pend'?'pend':''}" tabindex="0" data-a="lcEdit" data-v="${x.id}">
   <span class="tn"><span class="fi-dir ${x.tipo}">${ic(x.tipo==='e'?'arrowDn':'arrowUp',15,2.2)}</span><span class="hn"><b>${esc(x.desc)}</b><span>${dBR(x.d)}${x.rt&&x.rt.length?' · '+rtTag(x):(x.cc&&x.cc!=='cc1'?' · '+esc(ccN(x.cc)):'')}${x.ct?' · '+esc(ctN(x.ct)):''}${cpMiss(x)?` · <span class="fi-semcp">${ic('alert',11,2.4)}sem comprovante</span>`:x.cp?` · <span class="fi-cpok">${ic('file',11,2)}comprovante</span>`:''}${x.rev?' · revertido':''}${x.corr?' · corrigido':''}${x.st==='pend'?` · <span class="fi-pend">${ic('clock',11)}aguardando aprovação</span>`:''}</span></span></span>
   <span class="lc-c">${catTag(x.cat)}</span><span class="lc-m">${compTxt(x.comp)}</span>
   <span class="lc-v ${x.tipo}">${R$(x.tipo==='e'?x.v:-x.v,true)}</span>
   <span class="hact" style="position:relative"><button class="ibtn sm" data-a="lcMenu" data-v="${x.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="lcPop-${x.id}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="lcEdit" data-v="${x.id}">${ic('pen',16)}${x.st==='ok'?'Corrigir':'Editar'}</button><button class="pi" data-a="lcDup" data-v="${x.id}">${ic('copy',16)}Duplicar</button><hr>${x.st==='pend'?`<button class="pi danger" data-a="lcDel" data-v="${x.id}">${ic('x',16)}Excluir</button>`:`<button class="pi danger" data-a="lcRev" data-v="${x.id}">${ic('swap',16)}Reverter</button>`}</div></span></div>`).join('')}`:`<div class="mempty"><p>Nenhum lançamento em ${monthName(mm)}.</p><span>${all.length?'Nada corresponde a esse filtro.':'Use o seletor de mês para ver outros meses.'}</span></div>`}
  <div class="tfoot"><span>${l.length} lançamento${l.length===1?'':'s'}</span><span>Saldo do filtro <b>${R$(l.filter(x=>x.st==='ok').reduce((a,x)=>a+(x.tipo==='e'?x.v:-x.v),0))}</b></span></div></section>`;
}
/* ---------- Rateio: um lançamento dividido entre centros de custo (Tiago, 07/11/2026; FIN-P-88) ----------
   Modelo de mercado: o lançamento continua UM movimento (a conciliação com o banco não muda); as PARTES (centro e %) alimentam a DRE e os relatórios
   por centro. Em % ou em R$ (os dois campos andam juntos); a soma fecha 100%. Modelos salvos, e a conta que repete herda o rateio. */
const RTMOD=[{id:'rm1',n:'Energia e água',parts:[{cc:'cc2',pct:60},{cc:'cc3',pct:25},{cc:'cc5',pct:15}]},{id:'rm2',n:'Internet e telefonia',parts:[{cc:'cc1',pct:50},{cc:'cc2',pct:50}]}];
let _rtm=2;
/* valor de cada parte; a última leva o centavo que sobrar */
const rtVals=(rt,tot)=>{const t=Math.round(tot*100);let acc=0;return rt.map((p,i)=>{const v=i===rt.length-1?t-acc:Math.round(t*p.pct/100);acc+=v;return {cc:p.cc,pct:p.pct,v:v/100};});};
const lcParts=l=>l.rt&&l.rt.length?rtVals(l.rt,l.v):[{cc:l.cc||'cc1',pct:100,v:l.v}];
const rtTxt=l=>l.rt&&l.rt.length?l.rt.map(p=>`${ccN(p.cc)} ${String(p.pct).replace('.',',')}%`).join(' · '):'';
const rtTag=l=>l.rt&&l.rt.length?`<span class="fi-rt" title="${esc(rtTxt(l))}">${ic('layers',11,2)}Rateado em ${l.rt.length} centros</span>`:'';
function rtField(rt){const on=!!(rt&&rt.length);
 return `<div class="fld wide rt-w"><label class="tog"><input type="checkbox" name="rtOn" ${on?'checked':''}><span class="sw"></span><span><b>Ratear entre centros de custo</b><small>Divide o valor em partes, em porcentagem ou em reais</small></span></label>
  <div class="rt-b" ${on?'':'hidden'}><div class="rt-top"><span class="selw"><select name="rtMod" aria-label="Aplicar modelo"><option value="">Aplicar um modelo…</option>${RTMOD.map(m=>`<option value="${m.id}">${esc(m.n)}</option>`).join('')}</select>${ic('updown',14)}</span></div>
   <div class="rt-rows"></div><div class="rt-foot"><button type="button" class="lnk" data-rt="add">+ Adicionar centro</button><span class="rt-sum" aria-live="polite"></span></div>
   <label class="rt-save"><input type="checkbox" name="rtSv"><span>Salvar como modelo</span><input name="rtNm" maxlength="40" placeholder="Nome do modelo" hidden></label></div></div>`;}
/* liga o campo ao formulário: devolve {ok(), read(), save()}; getTot() é o valor total; onChange() reavalia o botão do formulário */
function rtBind(f,rt,getTot,onChange,ccSel){
 const w=f.querySelector('.rt-w'),b=w.querySelector('.rt-b'),rows=w.querySelector('.rt-rows'),sum=w.querySelector('.rt-sum'),on=()=>f.elements.rtOn.checked;
 let P=(rt&&rt.length?rt.map(p=>({...p})):[{cc:'cc2',pct:50},{cc:'cc1',pct:50}]);
 const opts=sel=>CCUSTOS.filter(c=>c.on||c.id===sel).map(c=>`<option value="${c.id}" ${c.id===sel?'selected':''}>${esc(c.n)}</option>`).join('');
 const money=v=>String(Math.round(v*100)/100).replace('.',',');
 const total=()=>Math.max(0,getTot()||0),pctSum=()=>Math.round(P.reduce((a,p)=>a+(+p.pct||0),0)*100)/100;
 const valid=()=>!on()||(P.length>=2&&Math.abs(pctSum()-100)<0.005&&new Set(P.map(p=>p.cc)).size===P.length&&P.every(p=>p.pct>0));
 const paintSum=()=>{const s=pctSum(),d=Math.round((100-s)*100)/100,dup=new Set(P.map(p=>p.cc)).size!==P.length;sum.className='rt-sum '+(valid()?'ok':'bad');sum.textContent=dup?'Há centros repetidos':Math.abs(d)<0.005?'Soma 100%':d>0?`Faltam ${String(d).replace('.',',')}%`:`Passou ${String(-d).replace('.',',')}%`;};
 const paint=()=>{const t=total();rows.innerHTML=P.map((p,i)=>`<div class="rt-r" data-i="${i}"><span class="selw"><select data-rt="cc" aria-label="Centro de custo">${opts(p.cc)}</select>${ic('updown',14)}</span><label class="rt-n"><input data-rt="pct" inputmode="decimal" value="${String(p.pct).replace('.',',')}" aria-label="Porcentagem"><em>%</em></label><label class="rt-n"><em>R$</em><input data-rt="val" inputmode="decimal" value="${money(t*p.pct/100)}" aria-label="Valor"></label>${P.length>2?`<button type="button" class="ibtn sm" data-rt="del" aria-label="Tirar este centro">${ic('x',13)}</button>`:'<span></span>'}</div>`).join('');paintSum();};
 const sync=()=>{b.hidden=!on();const one=ccSel&&f.elements[ccSel];if(one)one.closest('.fld').hidden=on();onChange&&onChange();};
 f.elements.rtOn.addEventListener('change',()=>{if(on())paint();sync();});
 f.elements.rtMod.addEventListener('change',e=>{const m=RTMOD.find(x=>x.id===e.target.value);if(m){P=m.parts.map(p=>({...p}));paint();onChange&&onChange();}e.target.value='';});
 f.elements.rtSv.addEventListener('change',()=>{f.elements.rtNm.hidden=!f.elements.rtSv.checked;});
 w.addEventListener('input',e=>{const t=e.target,r=t.closest('.rt-r');if(!r)return;const p=P[+r.dataset.i],tot=total();
  if(t.dataset.rt==='pct'){p.pct=Math.round((pVal(t.value)||0)*100)/100;const v=r.querySelector('[data-rt=val]');if(v)v.value=money(tot*p.pct/100);}
  else if(t.dataset.rt==='val'){p.pct=tot>0?Math.round((pVal(t.value)||0)/tot*10000)/100:0;const q=r.querySelector('[data-rt=pct]');if(q)q.value=String(p.pct).replace('.',',');}
  paintSum();onChange&&onChange();});
 w.addEventListener('change',e=>{const t=e.target;if(t.dataset.rt==='cc'){P[+t.closest('.rt-r').dataset.i].cc=t.value;paintSum();onChange&&onChange();}});
 w.addEventListener('click',e=>{const t=e.target.closest('[data-rt]');if(!t)return;if(t.dataset.rt==='add'){const used=new Set(P.map(p=>p.cc)),c=CCUSTOS.find(x=>x.on&&!used.has(x.id));if(!c)return toast('Todos os centros já estão na divisão');P.push({cc:c.id,pct:0});paint();onChange&&onChange();}
  else if(t.dataset.rt==='del'){P.splice(+t.closest('.rt-r').dataset.i,1);paint();onChange&&onChange();}});
 /* quando o valor total muda, os reais de cada parte acompanham */
 f.addEventListener('input',e=>{if(on()&&e.target.name==='v'){rows.querySelectorAll('.rt-r').forEach(r=>{const p=P[+r.dataset.i],v=r.querySelector('[data-rt=val]');if(v&&p)v.value=money(total()*p.pct/100);});}});
 if(on()){paint();sync();}
 return {ok:valid,read:()=>on()&&valid()?P.map(p=>({cc:p.cc,pct:p.pct})):null,
  save:()=>{if(on()&&f.elements.rtSv.checked&&valid()){const n=(f.elements.rtNm.value||'').trim()||('Modelo '+_rtm);RTMOD.push({id:'rm'+(++_rtm),n,parts:P.map(p=>({...p}))});return n;}return '';}};}

/* quem lança é Admin: o lançamento já nasce aprovado ("lançou e aprovou", FIN-P-97). O aprovado se corrige no mês aberto, sem conciliação (FIN-P-98) */
const lcMesFech=ym=>FCLOSED.some(f=>f[0]===ym);
const lcBloq=x=>x.tr?'Transferência não se corrige: reverta e lance de novo.':(x.rev||/^Reversão/.test(x.desc))?'Este lançamento é uma reversão ou já foi revertido, e não se corrige.':(lcMesFech(x.comp)||lcMesFech(x.d.slice(0,7)))?'Mês fechado: reabra o mês para corrigir, ou reverta o lançamento.':x.conc?'Conciliado com o extrato: desfaça a conciliação ou reverta.':'';
function lcForm(id){const x=id?LANCS.find(y=>y.id===id):null,v=x?{...x}:{tipo:'e',desc:'',cat:'',v:'',comp:S.relM,d:NOWD,cc:'cc1',ct:''},blk=x&&x.st==='ok'?lcBloq(x):'',lock=!!(x&&x.st==='ok'&&x.orig==='Baixa de conta'&&!blk);
 openDlg(`${dlgHead(x?(x.st==='ok'?'Corrigir lançamento':'Editar lançamento'):'Novo lançamento',x?(x.st==='pend'?'Ainda aguardando aprovação.':`Lançado por ${esc(x.who)} · a correção fica no histórico, com antes e depois`):'')}
  ${x?(blk?`<p class="fi-note">${ic('alert',14)}<span>${blk}</span></p>`:lock?`<p class="fi-note">${ic('info',14)}<span>Valor, data e conta vêm da baixa. Para mudar, desfaça a baixa na conta a pagar ou a receber.</span></p>`:''):`<p class="fi-note">${ic('info',14)}<span>Como Admin, o lançamento entra <b>já aprovado</b> e passa a contar no saldo. Se quem lança é Editar, ele fica pendente até o Admin aprovar.</span></p>`}
  <form id="lcF" class="fgrid" novalidate>
   <div class="fld wide"><div class="fi-tg ${x?'':'t3'}"><button type="button" data-tp="e" class="${v.tipo==='e'?'on':''}">${ic('arrowDn',15,2.2)}Entrada</button><button type="button" data-tp="s" class="${v.tipo==='s'?'on':''}">${ic('arrowUp',15,2.2)}Saída</button>${x?'':`<button type="button" data-a="lcVerba">${ic('wallet',15,2.2)}Averbação</button>`}</div></div>
   <label class="fld wide fi-val"><span class="fl">Valor</span><span class="fi-amt"><em>R$</em><input name="v" inputmode="decimal" value="${v.v?String(v.v).replace('.',','):''}" placeholder="0,00" autocomplete="off"${lock?' readonly':''}></span></label>
   <label class="fld wide"><span class="fl">Descrição</span><input name="desc" value="${esc(v.desc)}" placeholder="Ex.: Dízimos e ofertas — culto de domingo" autocomplete="off"></label>
   <label class="fld wide"><span class="fl">Conta do plano</span>${selw('cat',optConta(v.tipo,v.cat))}</label>
   <label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC(v.cc||'cc1'))}</label>
   <label class="fld"><span class="fl">Contato <small>opcional</small></span>${selw('ct',optCt(v.ct||''))}</label>
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${v.d}"${lock?' readonly':''}></label>
   <label class="fld"><span class="fl">Competência</span><input type="month" name="comp" value="${v.comp}"></label>
   ${rtField(v.rt)}
   <div class="fld wide" id="cpBox"></div>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="lcOk"${blk?' disabled':''}>${x?(x.st==='ok'?'Corrigir':'Salvar'):'Lançar'}</button></div></form>`);
 const f=$('#lcF'),ok=$('#lcOk');let tp=v.tipo,cp=v.cp||'';
 const need=()=>tp==='s'&&!CPISENTA.has(f.cat.value),paint=()=>{const b=$('#cpBox');b.style.display=tp==='s'?'':'none';b.innerHTML=cpField(cp,need());};
 const val=()=>pVal(f.v.value);
 let RT=null;const chk=()=>{ok.disabled=!!blk||!(val()>0)||!f.desc.value.trim()||!f.cat.value||(RT&&!RT.ok());f.querySelector('.fi-amt').className='fi-amt '+tp;};RT=rtBind(f,v.rt,()=>val(),()=>chk(),'cc');
 $$('[data-tp]',f).forEach(b=>b.onclick=()=>{tp=b.dataset.tp;$$('[data-tp]',f).forEach(y=>y.classList.toggle('on',y===b));f.cat.innerHTML=optConta(tp,'');paint();chk();});
 f.addEventListener('input',chk);f.addEventListener('change',e=>{if(e.target.name==='cpf'&&e.target.files[0])cp=e.target.files[0].name;paint();chk();});paint();chk();setTimeout(()=>f.v.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{const rtv=RT.read(),o={tipo:tp,v:val(),desc:f.desc.value.trim(),cat:f.cat.value,cc:rtv?rtv[0].cc:f.cc.value,rt:rtv,ct:f.ct.value,d:f.d.value||NOWD,comp:f.comp.value||'2026-09',cp:tp==='s'?cp:''};RT.save();
  if(x){if(x.st==='ok'&&(lcMesFech(o.comp)||lcMesFech(o.d.slice(0,7)))){ok.classList.remove('busy');return toast('Mês fechado: reabra o mês para corrigir');}Object.assign(x,o);if(x.st==='ok')x.corr=true;const a=APROVS.find(a=>a.lid===x.id);if(a)Object.assign(a,{desc:o.desc,v:o.v,tp:o.tipo,cat:o.cat});closeDlg();fRe();toast(x.st==='ok'?'Lançamento corrigido. O histórico guarda antes e depois':'Lançamento atualizado');}
  else{const n=LC(o.d,o.comp,o.desc,o.cat,o.tipo,o.v,'ok','Rafael Pereira',{cc:o.cc,ct:o.ct,cp:o.cp,rt:o.rt});LANCS.push(n);closeDlg();fRe();toast(o.rt?'Lançamento registrado e aprovado, rateado em '+o.rt.length+' centros':'Lançamento registrado e aprovado',()=>{LANCS.splice(LANCS.indexOf(n),1);fRe();});}},600);});}

/* ---------- Contas a pagar e a receber (títulos) ---------- */
const tVenc=(t,k)=>k==='p'?t.venc:t.prev,tDd=(t,k)=>tVenc(t,k)?dDays(tVenc(t,k)):999,tSum=l=>l.reduce((a,t)=>a+tSd(t),0);
const MES_N=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const tNextMonth=d=>{const [y,m,dd]=d.split('-').map(Number),last=new Date(Date.UTC(y,m+1,0)).getUTCDate(),n=new Date(Date.UTC(y,m,1));return n.getUTCFullYear()+'-'+String(n.getUTCMonth()+1).padStart(2,'0')+'-'+String(Math.min(dd,last)).padStart(2,'0');};
/* repetição (FIN-P-99) e parcelamento (FIN-P-100) são uma série só. A que repete todo mês é gerada ADIANTADA (12 meses) e se completa ao quitar uma ocorrência; a parcelada nasce inteira, "2 de 3" é calculado. */
const tNextDesc=d=>{const mm=MES_N.find(m=>d.includes(m));return mm?d.replace(mm,MES_N[(MES_N.indexOf(mm)+1)%12]):d;};
const FIN_HOR=12,FIN_PMAX=60,pad2=n=>String(n).padStart(2,'0');let _sid=0;
/* soma n meses mantendo o dia da série; dia 29, 30 ou 31 vira o último dia do mês quando ele não existe */
const tAddM=(d,n,dd)=>{const [y,m]=d.split('-').map(Number),last=new Date(Date.UTC(y,m+n,0)).getUTCDate(),t=new Date(Date.UTC(y,m-1+n,1));return t.getUTCFullYear()+'-'+pad2(t.getUTCMonth()+1)+'-'+pad2(Math.min(dd,last));};
const tBr=k=>k==='r'?RECEB:PAGAR;
const tDescN=(d,j)=>{let s=d;for(let i=0;i<j;i++)s=tNextDesc(s);return s;};
/* completa a janela da série que repete: ao quitar uma ocorrência, cria o que falta até 12 meses à frente (ou até o término) */
function tSerieTop(t,k){if(!t.rep||!t.sid||!t.v0)return;const L=tBr(k),mk=k==='r'?CR:CP,lim=tAddM(NOWD,FIN_HOR,+NOWD.slice(8));
 let last=L.filter(x=>x.sid===t.sid).sort((a,b)=>tVenc(a,k)<tVenc(b,k)?-1:1).pop();
 while(last){const i=last.si+1,v=tAddM(t.v0,i-1,+t.v0.slice(8));if(v>lim||(t.fim&&v.slice(0,7)>t.fim))break;
  const n=mk(tNextDesc(last.desc),v,last.v,last.cat,last.ct,{em:v,comp:v.slice(0,7),cc:last.cc,rt:last.rt,rep:1,sid:t.sid,si:i,v0:t.v0,est:last.est,fim:t.fim,doc:t.doc});L.push(n);last=n;}}
/* "esta e as próximas": nas que repetem muda tudo o que o formulário traz; na parcelada, só descrição, contato, conta do plano e centro (valor e vencimento são de uma parcela só). Quem já tem baixa não muda */
function tPropaga(k,ed,nv){const L=tBr(k),j0=ed.si;L.filter(x=>x.sid===ed.sid&&x.si>j0&&!x.baixas.length).forEach(x=>{Object.assign(x,{cat:nv.cat,ct:nv.ct,cc:nv.cc,rt:nv.rt});if(ed.rep){x.v=nv.v;x.desc=tDescN(nv.desc,x.si-j0);}else x.desc=nv.desc;});}
/* cria a conta, a série que repete ou o parcelamento (total ÷ N, a última leva o centavo; competência de cada parcela = mês do seu vencimento) */
function tCria(k,P,f,o,rv){const b={desc:f.desc.value.trim(),v:pVal(f.v.value),venc:f.venc.value,cat:f.cat.value,ct:f.ct.value},mk=P?CP:CR,L=tBr(k),sid='s'+(++_sid);
 if(rv==='par'){const n=Math.max(2,Math.min(FIN_PMAX,Math.round(+f.np.value||0))),pa=Math.floor(b.v/n*100)/100;
  for(let i=1;i<=n;i++){const v=tAddM(b.venc,i-1,+b.venc.slice(8)),val=i===n?Math.round((b.v-pa*(n-1))*100)/100:pa;L.push(mk(b.desc,v,val,b.cat,b.ct,{...o,comp:v.slice(0,7),par:1,sid,si:i,sn:n}));}return n;}
 if(rv==='rep'){const t=mk(b.desc,b.venc,b.v,b.cat,b.ct,{...o,rep:1,sid,si:1,v0:b.venc,est:f.est&&f.est.checked?1:0,fim:f.fim&&f.fim.value||''});L.push(t);tSerieTop(t,k);return 1;}
 L.push(mk(b.desc,b.venc,b.v,b.cat,b.ct,o));return 1;}
const tSync=(t,k)=>{const b=t.baixas,last=b.length?b[b.length-1].d:null,pg=tPg(t);if(k==='p'){t.paid=tSd(t)<=0&&b.length>0;t.paidAt=t.paid?last:null;t.paidV=pg;}else{t.got=pg;t.recAt=pg?last:null;t.recV=pg;}if(t.rep&&t.sid&&(k==='p'?t.paid:(tSd(t)<=0&&b.length>0)))tSerieTop(t,k);};
const tCk=(t,d)=>d<0?`<span class="fi-ck off" title="Atrasada: dê baixa individual para informar juros e multa">${ic('lock',14,2)}</span>`:`<label class="fi-ck"><input type="checkbox" data-a="tSel" data-v="${t.id}" ${(S.tsel||[]).includes(t.id)?'checked':''} aria-label="Selecionar ${esc(t.desc)}"></label>`;
function titRow(t,k,cls,sel){const d=tDd(t,k),dt=tVenc(t,k),pg=tPg(t),P=k==='p';
 const when=!dt?(P?'sem vencimento':'sem data prevista'):d<0?`${P?'venceu':'previsto'} há ${-d} dia${d===-1?'':'s'}`:d===0?(P?'vence hoje':'previsto para hoje'):`${P?'vence':'previsto'} ${relD(dt)}`;
 return `<div class="fi-bill" id="${t.id}">${sel&&P?tCk(t,d):''}<span class="fi-due ${cls} ${P?'pg':'rc'}">${dt?`<b>${+dt.slice(8)}</b><small>${MONTHS[+dt.slice(5,7)-1].slice(0,3)}</small>`:'<b>—</b><small>s/ data</small>'}</span><span class="dkt"><b>${esc(t.desc)}</b><span>${t.ct?esc(ctN(t.ct))+' · ':''}${esc(t.cat)}${t.rt&&t.rt.length?' · '+rtTag(t):''} · <span class="${cls==='late'?'fi-latetx':''}">${when}</span>${t.rep?` · <button class="lnk fi-rep" data-a="tRepEnd" data-v="${k}|${t.id}" title="Encerrar a repetição">repete todo mês · encerrar</button>`:''}${t.est?' · valor estimado':''}${t.par?` · parcela ${t.si} de ${t.sn}`:''}${pg?` · <b>${R$(pg)}</b> ${P?'pago':'recebido'} de ${R$(t.v)}`:''}</span></span><b class="fi-amt2 ${P?'fi-ds':'fi-de'}">${ic(P?'arrowUp':'arrowDn',13,2.4)}${R$(tSd(t))}</b><span class="fi-bact">${t.baixas.length?'':`<button class="ibtn sm" data-a="tEdit" data-v="${k}|${t.id}" aria-label="Editar ${esc(t.desc)}" title="Editar">${ic('pen',14)}</button>`}<button class="btn sec sm" data-a="tBaixa" data-v="${k}|${t.id}">${ic('check',14,2.4)}Dar baixa</button></span></div>`;}
function titPage(){const k=S.ftk||'p',P=k==='p',Lb=(P?PAGAR:RECEB).filter(t=>(!S.trep||t.rep)&&(!S.tpar||t.par)),FL={late:t=>tDd(t,k)<0,soon:t=>tDd(t,k)>=0&&tDd(t,k)<=7},L=S.tfl?Lb.filter(t=>tSd(t)>0&&FL[S.tfl](t)):Lb,open=L.filter(t=>tSd(t)>0).sort((a,b)=>(tVenc(a,k)||'9999')<(tVenc(b,k)||'9999')?-1:1),late=open.filter(t=>tDd(t,k)<0),wk=open.filter(t=>tDd(t,k)>=0&&tDd(t,k)<=7),lt=open.filter(t=>tDd(t,k)>7),done=L.filter(t=>tSd(t)<=0);
 const side=kk=>{const l=(kk==='p'?PAGAR:RECEB).filter(t=>tSd(t)>0);return {op:l,lt:l.filter(t=>tDd(t,kk)<0)};},sp=side('p'),sr=side('r');
 const grp=(n,l,cls)=>l.length?`<div class="fi-grp ${cls}"><p class="fi-gh"><b>${n}</b><span>${l.length} · ${R$(tSum(l))}</span></p>${l.map(t=>titRow(t,k,cls,true)).join('')}</div>`:'';
 const ag=[['A vencer',open.filter(t=>tDd(t,k)>=0)],['Atrasadas até 30 dias',open.filter(t=>tDd(t,k)<0&&tDd(t,k)>=-30)],['De 31 a 60 dias',open.filter(t=>tDd(t,k)<-30&&tDd(t,k)>=-60)],['Mais de 60 dias',open.filter(t=>tDd(t,k)<-60)]];
 /* chips ao lado da busca: atrasadas e próximos 7 dias (um por vez) e, em contas a pagar, só recorrentes (combina com os outros) */
 const cn=f=>Lb.filter(t=>tSd(t)>0&&FL[f](t)).length,chp=[['late','Atrasadas',cn('late')],['soon','Próximos 7 dias',cn('soon')]].map(c=>`<button class="chipf ${S.tfl===c[0]?'on':''}" data-a="tFl" data-v="${c[0]}" aria-pressed="${S.tfl===c[0]}">${c[1]} <small>${c[2]}</small></button>`).join('')+`<button class="chipf ${S.trep?'on':''}" data-a="tRepOnly" aria-pressed="${!!S.trep}">Só recorrentes <small>${(P?PAGAR:RECEB).filter(t=>t.rep&&tSd(t)>0).length}</small></button><button class="chipf ${S.tpar?'on':''}" data-a="tParOnly" aria-pressed="${!!S.tpar}">Só parceladas <small>${(P?PAGAR:RECEB).filter(t=>t.par&&tSd(t)>0).length}</small></button>`;
 return fHead('Contas a pagar e a receber','O que a igreja precisa pagar e o que espera receber',`${rpBtn('financeiro',P?'pagar':'receber')}<button class="btn pri" data-a="tNew" data-v="${k}">${ic('plus',15,2.2)}${P?'Nova conta a pagar':'Nova conta a receber'}</button>`)
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">A pagar</span><span class="kv">${R0(tSum(sp.op))}</span><span class="kd">${sp.op.length} ${sp.op.length===1?'conta':'contas'} em aberto</span></div><div class="k4"><span class="kl">Atrasadas a pagar</span><span class="kv" style="${sp.lt.length?'color:var(--st-rec)':''}">${sp.lt.length}</span><span class="kd">${sp.lt.length?R$(tSum(sp.lt)):'nenhuma'}</span></div><div class="k4"><span class="kl">A receber</span><span class="kv">${R0(tSum(sr.op))}</span><span class="kd">${sr.op.length} ${sr.op.length===1?'conta':'contas'} em aberto</span></div><div class="k4"><span class="kl">Atrasadas a receber</span><span class="kv" style="${sr.lt.length?'color:var(--st-rec)':''}">${sr.lt.length}</span><span class="kd">${sr.lt.length?R$(tSum(sr.lt)):'nenhuma'}</span></div></section>`
 +sxSeg('ftk',[['p','Contas a pagar',sp.op.length],['r','Contas a receber',sr.op.length]],k)
 +`<p class="fi-note rise" style="--d:2">${ic('info',14)}<span>Cada conta tem <b>contato, competência, conta do plano e centro de custo</b>. Ao dar baixa, ${P?'o pagamento':'o recebimento'} vira um lançamento já aprovado${P?', com o comprovante se você tiver':''}. A baixa pode ser parcial, com juros, multa e desconto.</span></p>
 <section class="card fi-bills rise" style="--d:3"><div class="tbar"><div class="chips">${chp}</div></div><p class="fi-agl">${ag.map(g=>`<span>${g[0]} <b>${R$(tSum(g[1]))}</b></span>`).join('')}${P&&open.some(t=>tDd(t,k)>=0)?'<button class="lnk fi-all" data-a="tSelAll">Selecionar todas em dia</button>':''}</p>${open.length?grp('Atrasadas',late,'late')+grp('Próximos 7 dias',wk,'soon')+grp('Depois',lt,'later'):`<div class="mempty"><p>${P?'Tudo pago':'Nada a receber'}</p><span>Nenhuma conta em aberto.</span></div>`}
  ${done.length?`<details class="fi-paid"><summary>${ic('check',13,2.4)}${done.length} ${P?(done.length===1?'paga':'pagas'):(done.length===1?'recebida':'recebidas')}</summary>${done.map(t=>{const b=t.baixas[t.baixas.length-1];return `<div class="fi-bill done"><span class="fi-due"><b>${tVenc(t,k)?+tVenc(t,k).slice(8):'—'}</b><small>${tVenc(t,k)?MONTHS[+tVenc(t,k).slice(5,7)-1].slice(0,3):''}</small></span><span class="dkt"><b>${esc(t.desc)}</b><span>${t.ct?esc(ctN(t.ct))+' · ':''}${esc(t.cat)}${b?` · baixa em ${dBR(b.d)}`:''}${b&&b.ids&&b.ids.length?' · lançamento criado':''}</span></span><b class="fi-amt2">${R$(t.v)}</b><button class="btn sec sm" data-a="tUndo" data-v="${k}|${t.id}">Desfazer</button></div>`;}).join('')}</details>`:''}${P?tBar():''}</section>`;}
/* barra de pagar selecionados: valor cheio, só contas em dia, uma conta de saída para todas */
function tBar(){const ids=(S.tsel||[]).filter(id=>{const t=PAGAR.find(x=>x.id===id);return t&&tSd(t)>0&&tDd(t,'p')>=0;});S.tsel=ids;if(!ids.length)return '';
 const sel=ids.map(id=>PAGAR.find(x=>x.id===id)),tot=tSum(sel),ac=FCONTAS.find(c=>c.n===S.tac)||FCONTAS[0],sd=ac.atual;
 return `<div class="fi-selbar"><span class="fi-sn"><b>${ids.length} ${ids.length===1?'conta':'contas'}</b> · ${R$(tot)}</span><label class="fi-sa"><small>Conta de saída</small><span class="selw"><select data-ts="ac">${FCONTAS.map(c=>`<option ${c.n===ac.n?'selected':''}>${esc(c.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label><span class="fi-ss ${tot>sd?'neg':''}"><small>Saldo disponível</small><b>${R$(sd)}</b></span><span class="fi-sb"><button class="btn sec" data-a="tSelClr">Limpar</button><button class="btn pri" data-a="tPayMany">${ic('check',14,2.4)}Pagar selecionados</button></span>${tot>sd?`<p class="fi-sw">${ic('alert',13,2)}O saldo da conta não cobre o total. Dá para pagar mesmo assim.</p>`:''}</div>`;}
document.addEventListener('change',e=>{const t=e.target;if(t&&t.dataset&&t.dataset.ts==='ac'){S.tac=t.value;fRe();}});
const fPag=()=>titPage(),fRec=()=>{S.ftk='r';return titPage();};
function titForm(k,id){const P=k==='p',e=P?'s':'e',ed=id?(P?PAGAR:RECEB).find(x=>x.id===id):null,vv=ed?(P?ed.venc:ed.prev)||'':(P?addD(NOWD,7):'');
 openDlg(`${dlgHead(ed?(P?'Editar conta a pagar':'Editar conta a receber'):(P?'Nova conta a pagar':'Nova conta a receber'),ed?'Só dá para editar antes da primeira baixa.':'Ela entra na lista e só vira lançamento quando você der baixa.')}<form id="tF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Descrição</span><input name="desc" value="${esc(ed?ed.desc:'')}" placeholder="${P?'Ex.: Energia elétrica — outubro':'Ex.: Aluguel do salão para evento externo'}" autocomplete="off"></label>
  <label class="fld"><span class="fl" id="vLb">${ed&&ed.par?'Valor desta parcela':'Valor'}</span><span class="fi-amt ${e}"><em>R$</em><input name="v" inputmode="decimal" value="${ed?String(ed.v).replace('.',','):''}" placeholder="0,00"></span></label>
  <label class="fld"><span class="fl">${P?'Fornecedor ou funcionário':'Cliente'} <small>opcional</small></span>${selw('ct',optCt(ed?ed.ct:'',P?'f':'c'))}</label>
  <label class="fld"><span class="fl">Emissão</span><input type="date" name="em" value="${ed?ed.em:NOWD}"></label>
  <label class="fld"><span class="fl">${P?'Vencimento':'Previsão'}${P?'':' <small>opcional</small>'}</span><input type="date" name="venc" value="${vv}"></label>
  <label class="fld"><span class="fl">Competência</span><input type="month" name="comp" value="${ed?ed.comp:NOWD.slice(0,7)}"></label>
  <label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC(ed?ed.cc:'cc1'))}</label>
  <label class="fld wide"><span class="fl">Conta do plano</span>${selw('cat',optConta(e,ed?ed.cat:''))}</label>
  ${rtField(ed?ed.rt:null)}
  ${ed?(ed.sid?`<div class="fld wide"><span class="fl">Alterar</span><div class="yn" role="radiogroup"><label><input type="radio" name="sc" value="one" checked><span>Só esta ${ed.par?'parcela':'conta'}</span></label><label><input type="radio" name="sc" value="next"><span>Esta e as próximas</span></label></div><span class="hint">${ed.par?'Em “esta e as próximas” mudam descrição, contato, conta do plano e centro de custo. Valor e vencimento são sempre de uma parcela só.':'Em “só esta conta”, as outras continuam com os valores antigos.'}</span></div>`:''):`<div class="fld wide"><span class="fl">Repetição</span><div class="yn" role="radiogroup"><label><input type="radio" name="rp" value="no" checked><span>Não repete</span></label><label><input type="radio" name="rp" value="rep"><span>Repete todo mês</span></label><label><input type="radio" name="rp" value="par"><span>Parcelado</span></label></div></div>
  <div class="fld wide" id="rpRep" hidden><label class="tog"><input type="checkbox" name="est"><span class="sw"></span><span><b>Valor estimado</b><small>Para luz e água: o valor muda e você ajusta antes de pagar</small></span></label><label class="fld"><span class="fl">Repetir até <small>opcional</small></span><input type="month" name="fim"></label><span class="hint">Criamos os próximos ${FIN_HOR} meses de uma vez e completamos quando você pagar.</span></div>
  <div class="fld wide" id="rpPar" hidden><label class="fld"><span class="fl">Número de parcelas</span><input name="np" type="number" min="2" max="${FIN_PMAX}" value="3" inputmode="numeric"></label><p class="who" id="rpPv"></p></div>`}
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" ${ed?'':'disabled'}>${ed?'Salvar':P?'Adicionar conta':'Adicionar conta a receber'}</button></div></form>`);
 const f=$('#tF'),ok=f.querySelector('[type=submit]');let RT=null;const rv=()=>{const r=f.elements.rp;return r?r.value:'no';},pv=()=>{const rp=$('#rpRep'),pa=$('#rpPar');if(!rp)return;rp.hidden=rv()!=='rep';pa.hidden=rv()!=='par';$('#vLb').textContent=rv()==='par'?'Valor total':'Valor';const n=+f.np.value,t=pVal(f.v.value);$('#rpPv').textContent=rv()==='par'&&n>=2&&t>0?(()=>{const a=Math.floor(t/n*100)/100,u=Math.round((t-a*(n-1))*100)/100;return n+' parcelas de '+R$(a)+(u!==a?'; a última de '+R$(u):'')+', mês a mês, cada uma com a competência do seu vencimento.';})():'';};const chk=()=>{pv();ok.disabled=!f.desc.value.trim()||!(pVal(f.v.value)>0)||!f.cat.value||((P||rv()!=='no')&&!f.venc.value)||(rv()==='par'&&!(+f.np.value>=2&&+f.np.value<=FIN_PMAX))||(RT&&!RT.ok());};RT=rtBind(f,ed?ed.rt:null,()=>pVal(f.v.value),()=>chk(),'cc');f.addEventListener('input',chk);f.addEventListener('change',chk);setTimeout(()=>f.desc.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;
  const L=tBr(k);
  if(ed){const nv={desc:f.desc.value.trim(),v:pVal(f.v.value),cat:f.cat.value,ct:f.ct.value,em:f.em.value||NOWD,comp:f.comp.value||NOWD.slice(0,7),cc:(RT.read()||[{cc:f.cc.value}])[0].cc,rt:RT.read()},sc=f.elements.sc?f.elements.sc.value:'one',j0=ed.si;
   Object.assign(ed,nv);if(P)ed.venc=f.venc.value;else ed.prev=f.venc.value;
   if(ed.sid&&sc==='next')tPropaga(k,ed,nv);
   closeDlg();fRe();toast(ed.sid&&sc==='next'?'Conta atualizada, e as próximas também':'Conta atualizada');return;}
  const rtv=RT.read(),o={em:f.em.value||NOWD,comp:f.comp.value||NOWD.slice(0,7),cc:rtv?rtv[0].cc:f.cc.value};if(rtv)o.rt=rtv;RT.save();
  const rpv=rv(),n=tCria(k,P,f,o,rpv);
  closeDlg();fRe();toast(rpv==='par'?n+' parcelas adicionadas':rpv==='rep'?'Conta adicionada. Criamos os próximos '+FIN_HOR+' meses':(P?'Conta adicionada':'Conta a receber adicionada'));});}
function tBaixa(v){const [k,id]=v.split('|'),P=k==='p',t=(P?PAGAR:RECEB).find(x=>x.id===id),sd=tSd(t),e=P?'s':'e';
 openDlg(`${dlgHead(P?'Dar baixa na conta':'Dar baixa na conta a receber',`${esc(t.desc)} · saldo ${R$(sd)}`)}
  <p class="fi-note">${ic('info',14)}<span>A baixa cria o lançamento <b>já aprovado</b> (você é Admin) e ele entra no saldo na hora. Baixa parcial mantém o resto em aberto.${P?' Anexe o comprovante se tiver: sem ele, o lançamento fica com a marca.':''}</span></p>
  <form id="tB" class="fgrid" novalidate>
   <label class="fld"><span class="fl">${P?'Pago':'Recebido'} em</span><input type="date" name="d" value="${NOWD}"></label>
   <label class="fld"><span class="fl">Valor baixado</span><span class="fi-amt ${e}"><em>R$</em><input name="v" inputmode="decimal" value="${String(sd).replace('.',',')}"></span></label>
   <label class="fld"><span class="fl">Juros e multa <small>opcional</small></span><span class="fi-amt ${e}"><em>R$</em><input name="j" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld"><span class="fl">Desconto <small>opcional</small></span><span class="fi-amt ${e}"><em>R$</em><input name="dc" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld wide"><span class="fl">Conta financeira</span>${selw('ac',FCONTAS.map(c=>`<option>${esc(c.n)}</option>`).join(''))}</label>
   ${P?'<div class="fld wide" id="cpBox"></div>':''}
   <p class="who wide" id="tBs"></p>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">${ic('check',14,2.4)}Dar baixa</button></div></form>`,'sm');
 let cp=t.doc||'';const f=$('#tB'),ok=f.querySelector('[type=submit]'),calc=()=>{const b=pVal(f.v.value),j=pVal(f.j.value),dc=pVal(f.dc.value),pr=Math.max(0,b-dc);ok.disabled=!(b>0)||b>sd+.001;
  $('#tBs').innerHTML=b>sd+.001?`<span style="color:var(--st-rec)">O valor passa do saldo da conta (${R$(sd)}).</span>`:`Cria ${pr>0?`um lançamento de <b>${R$(pr)}</b> em ${esc(t.cat)}`:'nenhum lançamento de principal'}${j>0?` e outro de <b>${R$(j)}</b> em ${P?'Juros e multas pagos':'Juros e multas recebidos'}`:''}. ${b<sd-.001?`Fica <b>${R$(sd-b)}</b> em aberto.`:'A conta fica quitada.'}`;};
 f.addEventListener('input',calc);const pCp=()=>{const bx=$('#cpBox');if(bx)bx.innerHTML=cpField(cp,true);};f.addEventListener('change',e=>{if(e.target.name==='cpf'&&e.target.files[0]){cp=e.target.files[0].name;pCp();calc();}});pCp();calc();
 f.addEventListener('submit',ev=>{ev.preventDefault();if(ok.disabled)return;const b=pVal(f.v.value),j=pVal(f.j.value),dc=pVal(f.dc.value),pr=Math.max(0,b-dc),d=f.d.value||NOWD,ids=[],made=[];
  const mk=(desc,cat,val)=>{const l=LC(d,t.comp,desc,cat,e,val,'ok','Rafael Pereira',{cc:t.cc,rt:t.rt,ct:t.ct,acc:f.ac.value,orig:'Baixa de conta',cp:P?cp:''});LANCS.push(l);ids.push(l.id);made.push(l);};
  if(pr>0)mk(t.desc,t.cat,pr);if(j>0)mk('Juros e multa — '+t.desc,P?'Juros e multas pagos':'Juros e multas recebidos',j);
  const bx={d,v:b,j,dc,ids,cp:P?cp:''};t.baixas.push(bx);tSync(t,k);closeDlg();fRe();
  toast(`${t.desc} · baixa registrada`,()=>{made.forEach(l=>{LANCS.splice(LANCS.indexOf(l),1);});t.baixas.splice(t.baixas.indexOf(bx),1);tSync(t,k);fRe();});});}
function tUndo(v){const [k,id]=v.split('|'),t=(k==='p'?PAGAR:RECEB).find(x=>x.id===id),b=t.baixas[t.baixas.length-1];if(!b)return;
 const ls=(b.ids||[]).map(i=>LANCS.find(l=>l.id===i)).filter(Boolean),bl=ls.find(l=>l.st==='ok'&&(lcMesFech(l.comp)||lcMesFech(l.d.slice(0,7))||l.conc));if(bl)return toast(lcMesFech(bl.comp)||lcMesFech(bl.d.slice(0,7))?'Mês fechado: reabra o mês ou reverta em Lançamentos':'Lançamento conciliado: reverta em Lançamentos');
 ls.forEach(l=>{LANCS.splice(LANCS.indexOf(l),1);const i=APROVS.findIndex(a=>a.lid===l.id);if(i>=0)APROVS.splice(i,1);});t.baixas.pop();tSync(t,k);fRe();toast('Voltou para em aberto');}

/* ---------- Aprovações ---------- */
function fApr(){const k=S.apTab==='c'?'c':S.apTab==='i'?'i':'l';
 if(k==='c')return fHead('Aprovações','Lançamentos, importações e conciliações aguardando o Admin','')+fqAprTabs(k)+fqConcRender();
 return fAprL(fqAprTabs(k),k);}
/* o que cada aba de Aprovações mostra: Lançamentos (manuais, verbas e encerramentos) e Importações (arquivos) */
const apList=k=>k==='i'?APROVS.filter(a=>a.tipo==='imp'):APROVS.filter(a=>a.tipo!=='imp');
function fAprL(tabs,k){const L=apList(k);
 return fHead('Aprovações',k==='i'?'Importações de arquivo aguardando o Admin':'Lançamentos, pedidos de verba e de encerramento aguardando o Admin',L.length>1?`<button class="btn pri" data-a="apAll">${ic('check',15,2.4)}Aprovar todos (${L.length})</button>`:'')+tabs
 +`<p class="fi-note rise" style="--d:1">${ic('shield',15)}<span>${k==='i'?'Todo arquivo importado (extrato do banco, da maquininha ou da carteira) nasce aqui. Só depois de aprovado entra no saldo.':'Todo lançamento manual, pedido de verba e pedido de encerramento de caixa nasce aqui. Só depois de aprovado entra no saldo.'} Só o Admin aprova, inclusive o que ele mesmo lançou.</span></p>
 ${L.length?`<div class="fi-aps rise" style="--d:2">${L.map(a=>`<article class="card fi-ap" id="${a.id}"><div class="fi-aph"><span class="htile" style="--s:42px;background:${a.tipo==='imp'?'var(--st-sol-bg)':'var(--brand-soft)'};color:${a.tipo==='imp'?'var(--st-sol)':'var(--brand-text)'}">${ic(a.tipo==='imp'?'upload':a.tipo==='verba'?'wallet':a.tipo==='enc'?'lock':a.tp==='e'?'arrowDn':'arrowUp',19,2)}</span>
   <span class="dkt"><span class="fi-apt">${a.tipo==='imp'?'Importação de extrato':a.tipo==='enc'?'Pedido de encerramento de caixa':a.tipo==='verba'?'Pedido de verba':'Lançamento manual'}</span><b>${esc(a.desc)}${a.tipo==='imp'?` — ${a.n} lançamentos`:''}</b><span>Enviado por ${esc(a.who)} · ${dBR(a.d)}${a.why?' · '+esc(a.why):''}</span></span>
   ${a.tipo==='imp'?`<span class="fi-apv"><b class="e">+${R0(a.te)}</b><b class="s">−${R0(a.ts)}</b></span>`:a.tipo==='enc'?`<span class="fi-apv"><b>${R$(a.v)}</b></span>`:a.tipo==='verba'?`<span class="fi-apv"><b class="e">${R$(a.v)}</b></span>`:`<span class="fi-apv"><b class="${a.tp}">${R$(a.tp==='e'?a.v:-a.v,true)}</b>${catTag(a.cat)}</span>`}</div>
  ${apCpBlock(a)}
  ${a.tipo==='imp'?`<button class="fi-apx" data-a="apX" data-v="${a.id}">${ic('chevD',14,2)}${S.apOpen===a.id?'Esconder':'Ver'} os lançamentos (${a.ent} entradas, ${a.sai} saídas)</button>${S.apOpen===a.id?`<div class="fi-apr">${a.rows.map(r=>`<div><span>${r[0]}</span><span>${esc(r[1])}</span>${catTag(r[2])}<b class="${r[3]}">${R$(r[3]==='e'?r[4]:-r[4],true)}</b></div>`).join('')}<p class="who">+ ${a.n-a.rows.length} lançamentos · categorias sugeridas automaticamente</p></div>`:''}`:''}
  <footer><button class="btn ghostd sm" data-a="apNo" data-v="${a.id}">Rejeitar</button><button class="btn pri sm" data-a="apOk" data-v="${a.id}"${apFalta(a)?' title="Aprova mesmo sem comprovante"':''}>${ic('check',14,2.4)}Aprovar</button></footer></article>`).join('')}</div>`
 :`<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('check',30,2.6)}</span><h2>Tudo aprovado</h2><p>${k==='i'?'Quando alguém importar um arquivo, aparece aqui.':'Quando alguém lançar algo, pedir uma verba ou o encerramento de um caixa, aparece aqui.'}</p></section>`}`;
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
  <div class="mp-q">${[['Este mês',RELN],['Mês anterior',ymAdd(RELN,-1)],['Mesmo mês em '+(ny-1),ymAdd(RELN,-12)],...(S.active==='zel-vis'?[['Ano inteiro · '+yy,'Y'+yy]]:[])].map(q=>`<button data-a="relM" data-v="${q[1]}" class="${S.relM===q[1]?'on':''}">${q[0]}</button>`).join('')}</div>
  <p class="mp-ft"><span class="mp-fti">${ic('clock',12,2)}</span><span>Histórico desde <b>${monthName(REL0).toLowerCase()}</b></span></p></div>`;}
const fMes=()=>`<div class="fi-mbar rise" style="--d:1"><div class="mp"><button class="ibtn" data-a="relStep" data-v="-1" ${(S.relM[0]==='Y'?+S.relM.slice(1)<=+REL0.slice(0,4):S.relM<=REL0)?'disabled':''} aria-label="${S.relM[0]==='Y'?'Ano anterior':'Mês anterior'}">${ic('chevL',16,2)}</button><div style="position:relative"><button class="mp-btn" data-a="mpMenu">${ic('calendar',16)}<b>${S.relM[0]==='Y'?'Ano de '+S.relM.slice(1):monthName(S.relM)}</b>${S.relM===RELN?'<em>mês atual</em>':''}${ic('chevD',14,2)}</button>${mpick()}</div><button class="ibtn" data-a="relStep" data-v="1" ${(S.relM[0]==='Y'?+S.relM.slice(1)>=+RELN.slice(0,4):S.relM>=RELN)?'disabled':''} aria-label="${S.relM[0]==='Y'?'Próximo ano':'Próximo mês'}">${ic('chevR',16,2)}</button></div>${S.relM!==RELN?`<button class="lnk" data-a="relM" data-v="${RELN}">Voltar para o mês atual</button>`:''}</div>`;
/* ---------- DRE por plano de contas: tabular, vertical e horizontal (rodada 1 · 05/11/2026) ---------- */
const contaOf=n=>PLANO.find(a=>a.n===n);
const relItems=(ym,cc)=>cc?relData(ym).flatMap(x=>x.rt&&x.rt.length?lcParts(x).filter(p=>p.cc===cc).map(p=>({...x,cc:p.cc,v:p.v})):((x.cc||'cc1')===cc?[x]:[])):relData(ym);
function dreRows(months,cc,acc){
 const D=months.map(ym=>{const by={};relItems(ym,cc).forEach(x=>{by[x.cat]=(by[x.cat]||0)+x.v;});return by;});
 if(acc){const t={};acc.forEach(ym=>relItems(ym,cc).forEach(x=>{t[x.cat]=(t[x.cat]||0)+x.v;}));D.push(t);}
 const G=k=>D.map(by=>PLANO.filter(a=>a.g===k).reduce((s,a)=>s+(by[a.n]||0)*(k==='fin'&&a.t==='s'?-1:1),0));
 const sub=(a,...b)=>a.map((v,i)=>b.reduce((s,x)=>s-x[i],v));
 const rec=G('rec'),ded=G('ded'),cdi=G('cdi'),pes=G('pes'),min=G('min'),adm=G('adm'),fin=G('fin'),liq=sub(rec,ded),bruto=sub(liq,cdi),oper=sub(bruto,pes,min,adm),res=oper.map((v,i)=>v+fin[i]),rows=[];
 const grp=(k,n,v)=>{const cs=PLANO.filter(a=>a.g===k&&D.some(by=>by[a.n]));if(!cs.length&&k!=='rec')return;rows.push({t:'grp',l:n,vals:v});cs.forEach(a=>rows.push({t:'leaf',l:a.n,c:a.c,key:a.n,vals:D.map(by=>(by[a.n]||0)*(k==='fin'&&a.t==='s'?-1:1))}));};
 grp('rec','Receitas',rec);grp('ded','(−) Deduções da receita',ded);rows.push({t:'sub',l:'Receita líquida',vals:liq});grp('cdi','(−) Custos diretos',cdi);rows.push({t:'sub',l:'Resultado bruto',vals:bruto});
 grp('pes','(−) Despesas com pessoal',pes);grp('min','(−) Despesas ministeriais e sociais',min);grp('adm','(−) Despesas administrativas',adm);rows.push({t:'sub',l:'Resultado operacional',vals:oper});grp('fin','(+/−) Resultado financeiro',fin);
 rows.push({t:'tot',l:'Superávit ou déficit do período',vals:res});
 return {rows,rec,res};}
function dreHtml(){
 const view=S.dreV||'tab',cc=S.dreCC||'',months=view==='hor'?[-5,-4,-3,-2,-1,0].map(i=>ymAdd(S.relM,i)).filter(m=>m>=REL0):[S.relM],yr=S.relM.slice(0,4),acc=view==='tab'&&S.relM[0]!=='Y'?Array.from({length:+S.relM.slice(5)},(_,k)=>`${yr}-${String(k+1).padStart(2,'0')}`):null,{rows,rec}=dreRows(months,cc,acc),n=months.length,nc=n+(acc?1:0),fm=view==='hor'?R0:R$,rec0=rec[n-1]||0;
 const pc=v=>rec0?Math.round(v/rec0*1000)/10:0;
 const dlt=r=>{if(n<2)return '';const a=r.vals[n-1],b=r.vals[n-2];if(!b)return '<i class="soft">—</i>';const p=Math.round((a-b)/Math.abs(b)*100);return `${p>0?'+':''}${p}%`;};
 const dd=key=>{const l=LANCS.filter(x=>x.cat===key&&x.comp===S.relM&&x.st==='ok'&&!x.tr&&(!cc||lcParts(x).some(p=>p.cc===cc))).sort((a,b)=>a.d<b.d?1:-1);
  return `<div class="dr2-dd">${l.length?l.map(x=>`<div><span>${dBR(x.d)}</span><span>${esc(x.desc)}</span><span>${x.rt&&x.rt.length?esc(rtTxt(x)):esc(ccN(x.cc))}</span><b>${R$(cc&&x.rt&&x.rt.length?(lcParts(x).find(p=>p.cc===cc)||{v:x.v}).v:x.v)}</b></div>`).join(''):'<p>Este mês é histórico resumido, sem os lançamentos um a um.</p>'}</div>`;};
 const head=`<div class="dr2 thead v-${view}" style="--n:${nc}"><span>Conta</span>${months.map(m=>`<span class="r">${compTxt(m)}</span>`).join('')}${acc?`<span class="r">Acumulado ${yr}</span>`:''}${view==='vert'?'<span class="r">% da receita</span>':view==='hor'?'<span class="r">Variação</span>':''}</div>`;
 const body=rows.map(r=>{const lf=r.t==='leaf'&&view!=='hor',open=lf&&S.dreOpen===r.key,v0=r.vals[n-1];
  const cells=r.vals.map(v=>`<span class="r ${(r.t==='tot'||r.t==='sub')&&v<0?'neg':''}">${v?fm(v):'<i class="soft">—</i>'}</span>`).join('');
  const ex=view==='vert'?`<span class="r dr2-p">${v0?pc(v0).toLocaleString('pt-BR')+'%':'—'}<i style="width:${Math.min(100,Math.abs(pc(v0)))}%"></i></span>`:view==='hor'?`<span class="r dr2-d">${dlt(r)}</span>`:'';
  return `<div class="dr2 ${r.t} v-${view} ${open?'op':''}" style="--n:${nc}" ${lf?`data-a="dreOpen" data-v="${esc(r.key)}" tabindex="0"`:''}><span class="dr2-l">${r.c?`<i>${r.c}</i>`:''}${esc(r.l)}${lf?ic('chevD',12,2):''}</span>${cells}${ex}</div>`+(open?dd(r.key):'');}).join('');
 return `<section class="card fi-dre dre2 rise" style="--d:2"><div class="tbar"><div class="chips">${[['tab','Tabular'],['vert','Vertical'],['hor','Horizontal']].map(c=>`<button class="chipf ${view===c[0]?'on':''}" data-a="dreV" data-v="${c[0]}">${c[1]}</button>`).join('')}</div><div class="dre-cc">${selw('dcc','<option value="">Todos os centros de custo</option>'+CCUSTOS.map(c=>`<option value="${c.id}" ${c.id===cc?'selected':''}>${esc(c.n)}</option>`).join(''))}</div></div>
  <div class="dr2-sc">${head}${body}</div>
  <p class="who dr2-ft">${view==='tab'?'Regime de competência. Toque numa conta para ver os lançamentos do mês; a última coluna soma de janeiro até o mês escolhido.':view==='vert'?'Cada linha como parte da receita do mês (análise vertical).':'Seis meses lado a lado e a variação sobre o mês anterior (análise horizontal).'} Nomes como “superávit” e “déficit” seguem as entidades sem fins lucrativos; a confirmar com o contador.</p></section>`;}
function fRel(){
 const k=dreRows([S.relM],S.dreCC||''),e=k.rec[0],r=k.res[0],s=e-r,nRec=k.rows.filter(x=>x.t==='leaf'&&contaOf(x.key).g==='rec').length;
 return fHead('DRE','Resultado do mês por plano de contas, com o fluxo de caixa ao lado',`<button class="btn sec" data-a="nav" data-v="fcont">${ic('arrowR',15)}Exportação contábil</button><button class="btn sec" data-a="export" data-v="o DRE (PDF)">${ic('file',15)}DRE (PDF)</button><button class="btn sec" data-a="export" data-v="o fluxo de caixa (CSV)">Fluxo de caixa (CSV)</button>`)
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
 {id:'maq',n:'Extrato da maquininha',f:'CSV ou planilha do adquirente',ic:'wallet',maq:1,d:'Traz o que o adquirente vai repassar e liga cada linha a uma venda do Alva: valor da venda, taxa e valor a receber, com a data de cada parcela. Só aparece se houver maquininhas cadastradas.'},
 {id:'pag',n:'Extrato do provedor de pagamento',f:'CSV do Asaas',ic:'link',pag:1,d:'Traz as cobranças pagas pelo Asaas (doações com link do Alva e inscrições) e liga cada uma ao que o Alva registrou: valor, taxa e valor a receber. O repasse do Asaas é conferido depois, no extrato do banco.'},
 {id:'plano',n:'Plano de contas do contador',f:'XLSX ou CSV',ic:'clipboard',d:'Traz o plano que o contador usa. Preenche o código contábil das contas que já existem e cria as que faltam. Nada é apagado.'}];
const IMSEEN=new Set(['OFX-20260917-120000']);
const IMHIST=[{tipo:'extrato',file:'extrato-bradesco-ago2026.ofx',when:'2026-09-17',by:'Rafael Pereira',txt:'18 lançamentos enviados para aprovação'}];
const IMPLN=[['3.1.1.01','Dízimos','Receitas'],['3.1.1.03','Doações','Receitas'],['3.1.1.04','Inscrições','Receitas'],['3.1.1.05','Vendas','Receitas'],['3.1.1.06','Aluguel de espaços','Receitas'],['4.1.1.01','Salários','Despesas com pessoal'],['4.1.1.04','Ajuda de custo pastoral','Despesas com pessoal'],['4.3.1.01','Missões','Despesas ministeriais e sociais'],['4.3.1.02','Ministérios','Despesas ministeriais e sociais'],['4.3.1.03','Ação social','Despesas ministeriais e sociais'],['4.2.1.04','Seguros','Despesas administrativas'],['4.2.1.05','Taxas e licenças','Despesas administrativas'],['abc','Despesas diversas','Despesas administrativas']];
const IMST={transf:['swap','Transferência entre contas'],nova:['plus','Nova'],existe:['check','Já existe'],baixa:['link','Baixa de conta'],duplicado:['alert','Possível duplicado'],importada:['check','Já importada'],casa:['link','Preenche o código'],conflito:['alert','Código diferente'],erro:['x','Erro']};
const IMACT={transf:[['transf','Registrar a transferência (só esta ponta)'],['criar','Criar como lançamento comum'],['ignorar','Ignorar']],nova:[['criar','Criar lançamento'],['ignorar','Ignorar']],existe:[['manter','Manter (já lançado)']],baixa:[['baixar','Dar baixa na conta'],['criar','Criar lançamento novo'],['ignorar','Ignorar']],duplicado:[['','Decidir…'],['ignorar','É duplicado: ignorar'],['criar','Não é duplicado: criar']],importada:[['ignorar','Já importada']],casa:[['aplicar','Preencher o código'],['ignorar','Ignorar']],conflito:[['manter','Manter o código atual'],['atualizar','Trocar pelo do arquivo']],erro:[['ignorar','Fora até corrigir o arquivo']]};
const IMDEF={transf:'transf',nova:'criar',existe:'manter',baixa:'baixar',duplicado:'',importada:'ignorar',casa:'aplicar',conflito:'manter',erro:'ignorar'};
const IMSUG=[[/tarifa/,'Tarifas bancárias'],[/rendimento|aplicacao/,'Rendimentos de aplicação'],[/sabesp|energia|aluguel|internet|enel/,'Estrutura'],[/grafica|banner/,'Comunicação'],[/pix recebido|deposito|dizimo/,'Dízimos']];
const imS=()=>(S.im||(S.im={step:0}));
const imTok=s=>norm(s).split(/[^a-z0-9]+/).filter(w=>w.length>3);
const imSim=(a,b)=>{const A=new Set(imTok(a));return imTok(b).some(t=>A.has(t));};
const imDiff=(a,b)=>Math.round((new Date(a+'T12:00')-new Date(b+'T12:00'))/864e5);
const imTitle=m=>m.toLowerCase().replace(/(^|\s)\S/g,c=>c.toUpperCase());
const imRound=v=>Math.round(v*100)/100;
/* ---- Regras inteligentes da linha do banco (FIN-P-90) ---- */
const IMRULES=[];let _imru=0;
const IMNOISE=new Set(['pix','ted','doc','deb','autom','compra','debito','credito','recebido','recebida','enviado','enviada','boleto','pagamento','transferencia','transf']);
const imKey=t=>norm(t).replace(/[0-9]+/g,' ').split(/[^a-z]+/).filter(w=>w.length>3&&!IMNOISE.has(w));
/* histórico: lançamentos já aprovados com descrição parecida; só sugere conta, centro e contato, com o motivo */
function imHist(memo,tp){const K=imKey(memo);if(!K.length)return null;
 const sc=LANCS.filter(x=>x.st==='ok'&&!x.tr&&x.tipo===tp&&x.cat&&PLANO.some(a=>a.n===x.cat&&a.t===tp)).map(x=>({x,k:imKey(x.desc+' '+(x.ct?ctN(x.ct):''))})).filter(o=>K.filter(w=>o.k.includes(w)).length>=Math.min(2,K.length));
 if(!sc.length)return null;const by={};sc.forEach(o=>{by[o.x.cat]=(by[o.x.cat]||0)+1;});const cat=Object.keys(by).sort((a,b)=>by[b]-by[a])[0],mm=sc.filter(o=>o.x.cat===cat).map(o=>o.x),mode=f=>{const q={};mm.forEach(x=>{if(x[f])q[x[f]]=(q[x[f]]||0)+1;});return Object.keys(q).sort((a,b)=>q[b]-q[a])[0]||'';};
 return {cat,n:by[cat],total:sc.length,cc:mode('cc'),ct:mode('ct')};}
const imChip=s=>`<span class="im-st ${s}">${ic(IMST[s][0],13,2.4)}${IMST[s][1]}</span>`;
const imConta=I=>FCONTAS[I.conta]||FCONTAS[0];
const imFileName=I=>I.type==='pag'?'extrato-asaas-set2026.csv':I.type==='maq'?`extrato-${norm(I.adq||'maquininha').replace(/[^a-z0-9]+/g,'-')}-set2026.csv`:I.type==='plano'?'plano-de-contas-contador.xlsx':`extrato-${norm(imConta(I).banco||imConta(I).n).replace(/[^a-z0-9]+/g,'-')}-set2026.ofx`;

/* linhas do arquivo de exemplo: misturam o que já existe, o que dá baixa em conta, um possível duplicado e o que é novo */
function imLines(){const L=[];let n=0;const add=(d,memo,v)=>L.push({id:'x'+(++n),ext:`OFX-${d.replace(/-/g,'')}-${Math.round(Math.abs(v)*100)}`,d,memo,v});
 add('2026-09-12','TED RECEBIDA CAMPANHA RETIRO JOVENS',5300);add('2026-09-14','PIX IMOBILIARIA CENTRAL ALUGUEL',-3200);add('2026-09-15','DEB AUTOM GRAFICA RAPIDA LTDA',-890);
 add('2026-09-10','PIX J SANTOS',-340);add('2026-09-20','TRANSF ENVIADA CAIXA FISICO',-300);add('2026-09-16','PIX RECEBIDO M SOUZA',350);add('2026-09-16','PIX RECEBIDO A C LIMA',500);add('2026-09-17','DEPOSITO DIZIMO CULTO',1200);
 add('2026-09-25','PIX ASSOC ESPORTIVA VIDA',800);add('2026-09-28','BOLETO COMPANHIA DE ENERGIA',-640);add('2026-09-29','PIX SOM E LUZ EQUIPAMENTOS',-700);
 add('2026-09-29','BOLETO SABESP',-212);add('2026-09-29','PIX RECEBIDO R OLIVEIRA',150);add('2026-09-30','COMPRA DEBITO PAPELARIA ABC',-78.4);
 add('2026-09-30','TARIFAS BANCARIAS PACOTE SERVICOS',-89.9);add('2026-09-30','RENDIMENTOS DA APLICACAO CDB',214.35);
 fqBankLines().forEach(g=>{add(g.d,g.memo,g.dep);L[L.length-1].grp=g;});
 return L;}

function imAnalyze(I){
 if(I.type==='maq')return fqAnalyze(I);
 if(I.type==='pag')return fqAnalyzePag(I);
 const out=[],mk=(l,st,x={})=>({...l,st,actions:(I.type==='plano'&&st==='nova')?[['criar','Criar conta'],['ignorar','Ignorar']]:IMACT[st],act:IMDEF[st],cat:'',...x});
 if(I.type==='extrato'){
  const c=imConta(I),ci=FCONTAS.indexOf(c),pool=LANCS.filter(l=>l.st==='ok'&&!l.tr&&(l.acc?l.acc===c.n:ci===0)),used=new Set(),usedT=new Set(),usedTr=new Set();
  I.lines.forEach(l=>{
   if(IMSEEN.has(l.ext))return out.push(mk(l,'importada',{msg:'Esta linha já foi importada antes.'}));
   if(l.grp){const g=l.grp,n=g.ids.length,dif=g.dif;return out.push(mk(l,g.pix?'pix':g.adq==='Dinheiro'?'dep':dif?'rdif':'rec',{grp:g,act:dif?'':'baixarRec',actions:dif?[['','Decidir…'],['baixarRec','Liberar e lançar a diferença como tarifa'],['ignorar','Ignorar']]:[['baixarRec',g.pix?'Conciliar com a venda':g.adq==='Dinheiro'?'Baixar o depósito':'Liberar na carteira e confirmar o repasse'],['criar','Criar como entrada nova'],['ignorar','Ignorar']],msg:g.pix?`Pix de ${R$(g.tot)} casa com a venda ${g.sale} (${dBR(g.d)}): mesmo valor e mesmo dia.`:g.adq==='Dinheiro'?`${n} ${n===1?'venda':'vendas'} em dinheiro do dia ${dBR(g.day)} somam ${R$(g.tot)}. Bate com o depósito.`:`Libera ${n} ${n===1?'recebível':'recebíveis'} de ${g.adq} (${R$(g.tot)}) na Carteira ${g.adq} e confirma a transferência de ${R$(g.dep)} para o banco.${dif?` O repasse veio ${R$(dif)} menor (aluguel da máquina ou tarifa).`:' Bate com a transferência.'}`}));}
   const tp=l.v>0?'e':'s',av=Math.abs(l.v);
   const tm=LANCS.find(x=>x.tr&&x.acc&&x.acc!==c.n&&x.tipo!==tp&&x.v===av&&Math.abs(imDiff(x.d,l.d))<=2&&!usedTr.has(x.id));
   if(tm){usedTr.add(tm.id);return out.push(mk(l,'transf',{match:tm,msg:`Parece a transferência ${tp==='s'?'para':'de'} ${tm.acc}: a outra ponta já está lançada. Registra só esta ponta.`}));}
   const ex=pool.find(x=>x.tipo===tp&&x.v===av&&Math.abs(imDiff(x.d,l.d))<=3&&!used.has(x.id));
   if(ex){used.add(ex.id);return out.push(imSim(l.memo,ex.desc+' '+ctN(ex.ct))?mk(l,'existe',{msg:`Já lançado: ${ex.desc}.`}):mk(l,'duplicado',{msg:`Parece o mesmo que “${ex.desc}” (mesmo valor e data próxima), mas a descrição é outra.`}));}
   const P=l.v<0,ti=(P?PAGAR:RECEB).map(x=>({x,sd:tSd(x)})).find(o=>o.sd>0&&o.sd>=av&&!usedT.has(o.x.id)&&(o.sd===av||imSim(l.memo,o.x.desc+' '+ctN(o.x.ct))));
   if(ti){usedT.add(ti.x.id);return out.push(mk(l,'baixa',{match:{k:P?'p':'r',id:ti.x.id},msg:`Casa com a conta “${ti.x.desc}” (em aberto ${R$(ti.sd)}). ${ti.sd===av?'Quita a conta.':`Baixa parcial: ficam ${R$(imRound(ti.sd-av))} em aberto.`}`}));}
   const sg=(IMSUG.find(x=>x[0].test(norm(l.memo)))||[])[1],ok=sg&&PLANO.some(a=>a.n===sg&&a.t===tp),ru=IMRULES.find(x=>x.tp===tp&&norm(l.memo).includes(x.w)),hh=ru?null:imHist(l.memo,tp);
   out.push(mk(l,'nova',ru?{cat:ru.cat,cc:ru.cc,ct:ru.ct,msg:`Regra criada por você: a descrição contém “${ru.w}”.`}:hh?{cat:hh.cat,cc:hh.cc||'cc1',ct:hh.ct,msg:`Sugestão pelo histórico: ${hh.n} de ${hh.total} ${hh.total===1?'lançamento parecido foi':'lançamentos parecidos foram'} para “${hh.cat}”.`}:{cat:ok?sg:'',msg:'Não existe no Alva.'+(ok?' Conta sugerida por palavra fixa.':'')}));});
  I.extra=imRound(out.filter(r=>['nova','baixa','duplicado','rec','rdif','pix','dep','transf'].includes(r.st)).reduce((s,r)=>s+r.v,0));
  return out;}
 IMPLN.forEach((p,i)=>{const [cod,nome,grp]=p,g=DRG.find(x=>norm(x[1])===norm(grp)),ex=PLANO.find(a=>norm(a.n)===norm(nome)),base={id:'p'+i,n:i+2,memo:nome,cod,grp,g:g&&g[0],t:g?(g[2]==='x'?'e':g[2]):''};
  if(!/^\d+(\.\d+)+$/.test(cod))return out.push(mk(base,'erro',{msg:'Código inválido: use números separados por ponto, como 4.2.1.04.'}));
  if(!g)return out.push(mk(base,'erro',{msg:`O grupo “${grp}” não existe na DRE.`}));
  if(ex)return out.push(ex.cc===cod?mk(base,'existe',{msg:'A conta já tem esse código contábil.'}):!ex.cc?mk(base,'casa',{msg:`Já existe no plano, sem código contábil. Passa a ser ${cod}.`}):mk(base,'conflito',{msg:`Hoje a conta tem o código ${ex.cc}; o arquivo traz ${cod}. Você escolhe qual vale.`}));
  out.push(mk(base,'nova',{msg:`Conta nova em ${grp}, com código contábil ${cod}.`}));});
 return out;}

function imEff(rows){const e={criar:0,baixar:0,baixarRec:0,transf:0,aplicar:0,atualizar:0,manter:0,ignorar:0,dec:0,saldo:0};rows.forEach(r=>{if(!r.act){e.dec++;return;}e[r.act]=(e[r.act]||0)+1;if(r.act==='criar'||r.act==='baixar'||r.act==='baixarRec'||r.act==='transf')e.saldo+=(r.v||0);});e.saldo=imRound(e.saldo);return e;}

function fImp(){
 const I=imS(),head=fHead('Importar e conciliar','Traga o extrato do banco, o da maquininha ou o plano de contas do contador. O Alva compara com o que já existe e você confirma antes de qualquer lançamento.',I.step?`<button class="btn sec" data-a="imReset">${ic('x',15)}Cancelar importação</button>`:'');
 const stp=`<ol class="im-steps rise" style="--d:1" aria-label="Etapas">${['Tipo','Arquivo','Revisão','Resultado'].map((t,i)=>`<li class="${i===I.step?'on':i<I.step?'done':''}"><i>${i<I.step?ic('check',12,3):i+1}</i>${t}</li>`).join('')}</ol>`;
 return head+stp+[imType,fqPg(I)?fqFile:imFile,fqPg(I)?fqReview:imReview,fqPg(I)?fqResult:imResult][I.step](I);}

function imType(){
 return `<div class="im-types rise" style="--d:2">${IMTP.filter(t=>(!t.maq||FQMAQ.length)&&(!t.pag||fqAsaasOn())).map(t=>`<button class="card im-ty ${t.rec?'rec':''}" data-a="imPick" data-v="${t.id}"><span class="htile" style="--s:44px;background:var(--brand-soft);color:var(--brand-text)">${ic(t.ic,21)}</span><span class="dkt"><b>${t.n}</b><small>${t.f}</small></span>${t.rec?'<em class="im-rec">Mais usado</em>':''}<p>${t.d}</p></button>`).join('')}</div>
 <p class="fi-note rise" style="--d:3">${ic('shield',15)}<span><b>Nada entra sem a sua confirmação.</b> O arquivo vira uma fila de revisão: cada linha mostra se já existe, se dá baixa numa conta a pagar ou a receber, se parece duplicada ou se é nova. O que for criado ou baixado nasce em <button class="lnk inl" data-a="nav" data-v="fapr">Aprovações</button> e só entra no saldo depois de aprovado. Reenviar o mesmo arquivo não duplica nada.</span></p>
 <section class="card im-hist rise" style="--d:4"><div class="sh"><h2>Importações anteriores</h2></div>${IMHIST.map(h=>`<div class="im-h"><span class="htile" style="--s:38px;background:var(--surface-2);color:var(--ink-muted)">${ic(h.tipo==='plano'?'clipboard':'building',17)}</span><span class="dkt"><b>${esc(h.file)}</b><span>${dBR(h.when)} · ${esc(h.by)} · ${esc(h.txt)}</span></span></div>`).join('')}</section>
 ${IMRULES.length?`<section class="card im-hist rise" style="--d:4"><div class="sh"><h2>Regras de importação</h2></div>${IMRULES.map(r=>`<div class="im-h"><span class="dkt"><b>Se contém “${esc(r.w)}”</b><span>${esc(r.cat)}${r.cc&&r.cc!=='cc1'?' · '+esc(ccN(r.cc)):''}${r.ct?' · '+esc(ctN(r.ct)):''}</span></span><button class="btn sec sm" data-a="imRuleDel" data-v="${r.id}">Excluir</button></div>`).join('')}</section>`:''}
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
const imIn=(r,k)=>k==='todas'||(k==='novas'&&r.st==='nova')||(k==='ok'&&['existe','baixa','importada','casa','rec','pix','dep','transf'].includes(r.st))||(k==='atencao'&&['duplicado','erro','conflito','rdif'].includes(r.st));
function imReview(I){
 const sel=I.sel=(I.sel||[]).filter(i=>I.rows[i]),rows=I.rows,ex=I.type==='extrato',e=imEff(rows),sm={};rows.forEach(r=>{sm[r.st]=(sm[r.st]||0)+1;});
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
  const xtra=ex&&r.act==='criar'?`<span class="im-x"><label><small>Contato</small><span class="selw"><select data-im="ct" data-i="${i}" aria-label="Contato de ${esc(r.memo)}">${optCt(r.ct||'',r.v>0?'c':'f')}</select>${ic('updown',14)}</span></label><label><small>Centro de custo</small><span class="selw"><select data-im="cc" data-i="${i}" aria-label="Centro de custo de ${esc(r.memo)}">${optCC(r.cc||'cc1')}</select>${ic('updown',14)}</span></label><button type="button" class="lnk rt-ln" data-a="imRt" data-v="${i}">${r.rt?'Rateado em '+r.rt.length+' centros · editar':'Ratear…'}</button><button type="button" class="lnk rt-ln" data-a="imRule" data-v="${i}">Criar regra…</button></span>`:ex&&r.act==='baixar'?`<span class="im-x"><small class="soft">Contato e centro de custo vêm da conta que está sendo baixada.</small></span>`:'';
  return `<div class="im-r ${r.st} ${need?'need':''}"><span class="im-d">${ex?`<label class="fi-ck"><input type="checkbox" data-a="imSel" data-v="${i}" ${sel.includes(i)?'checked':''} aria-label="Selecionar linha"></label>`:''}${c1}</span><span class="im-t"><b>${esc(r.memo)}</b><small>${esc(r.msg)}</small></span><span class="im-v">${c3}</span><span class="im-s">${imChip(r.st)}</span><span class="im-a">${sel}</span><span class="im-c">${c6}</span>${xtra}</div>`;}).join('')||'<p class="im-empty">Nenhuma linha neste filtro.</p>';
 return `${panel}<div class="im-tb rise" style="--d:3"><div class="im-chips">${Object.entries(sm).map(([k,n])=>`<span class="im-cc">${imChip(k)}<b>${n}</b></span>`).join('')}</div><div class="chips">${IMFILT.map(f=>`<button class="chipf ${(I.filter||'todas')===f[0]?'on':''}" data-a="imFilter" data-v="${f[0]}">${f[1]}</button>`).join('')}</div></div>
 ${ex&&sel.length?`<div class="fi-selbar top rise" style="--d:3"><span class="fi-sn"><b>${sel.length} ${sel.length===1?'linha selecionada':'linhas selecionadas'}</b></span><span class="fi-sb"><button class="btn sec" data-a="imSelClr">Limpar</button><button class="btn pri" data-a="imBatch">${ic('pen',14)}Editar em lote</button></span></div>`:''}
 <section class="card im-card rise" style="--d:4"><div class="im-r thead">${head.map((h,j)=>`<span>${ex&&j===0?`<label class="fi-ck"><input type="checkbox" data-a="imSelAll" ${shown.length&&shown.every(r=>sel.includes(rows.indexOf(r)))?'checked':''} aria-label="Selecionar todas as linhas"></label>`:''}${h}</span>`).join('')}</div>${body}</section>
 <div class="im-bar rise" style="--d:5"><span>${ex?`<b>${e.criar}</b> a criar · <b>${e.baixar+e.baixarRec}</b> baixa(s) · <b>${e.ignorar+e.manter}</b> sem mudança`:`<b>${e.aplicar+e.atualizar}</b> código(s) a preencher · <b>${e.criar}</b> conta(s) a criar · <b>${e.ignorar+e.manter}</b> sem mudança`}${e.dec?` · <b class="im-neg">${e.dec} para decidir</b>`:''}</span><button class="btn sec" data-a="imBack">Voltar</button><button class="btn pri" data-a="imConfirm">${ic('check',15,2.4)}Confirmar importação</button></div>`;}

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
 const c=imConta(I),lids=[],tits=[],exts=[],made=[],fqu={rec:[]};
 const mkL=l=>{LANCS.push(l);lids.push(l.id);made.push(l);return l;};
 I.rows.forEach(r=>{
  if(r.act==='ignorar'){res.ignoradas++;return;}
  exts.push(r.ext);
  if(r.act==='manter'){res.mantidas++;return;}
  if(r.act==='baixarRec'){res.baixas++;fqBaixa(r,c,mkL,fqu);return;}
  if(r.act==='transf'){const tp=r.v>0?'e':'s';mkL(LC(r.d,r.d.slice(0,7),`Transferência ${tp==='s'?'para':'de'} ${r.match.acc}`,'Transferência',tp,Math.abs(r.v),'pend','Rafael Pereira',{tr:true,acc:c.n,orig:'Importação de extrato',imp:true}));res.criadas++;return;}
  if(r.act==='criar'){mkL(LC(r.d,r.d.slice(0,7),imTitle(r.memo),r.cat,r.v>0?'e':'s',Math.abs(r.v),'pend','Rafael Pereira',{cc:r.rt?r.rt[0].cc:(r.cc||'cc1'),rt:r.rt||null,ct:r.ct||'',acc:c.n,orig:'Importação de extrato',imp:true}));res.criadas++;return;}
  if(r.act==='baixar'){const P=r.match.k==='p',t=(P?PAGAR:RECEB).find(x=>x.id===r.match.id),val=Math.abs(r.v),l=mkL(LC(r.d,t.comp,t.desc,t.cat,P?'s':'e',val,'pend','Rafael Pereira',{cc:t.cc,rt:t.rt,ct:t.ct,acc:c.n,orig:'Baixa de conta',imp:true})),bx={d:r.d,v:val,j:0,dc:0,ids:[l.id]};t.baixas.push(bx);tSync(t,r.match.k);tits.push([r.match.k,t.id,bx]);res.baixas++;}});
 exts.forEach(x=>IMSEEN.add(x));
 if(I.type==='extrato'&&c.tipo==='Conta bancária'){const ds=I.lines.map(l=>l.d).sort();c.ext={d:ds[ds.length-1]||NOWD,saldo:imRound(c.atual+(I.extra||0))};}
 const ls=made.slice().sort((a,b)=>a.d<b.d?1:-1),sum=t=>made.filter(l=>l.tipo===t).reduce((s,l)=>s+l.v,0);
 APROVS.push(AP('imp',`Extrato ${c.banco||c.n} (OFX)`,null,NOWD,'Rafael Pereira',{n:made.length,ent:made.filter(l=>l.tipo==='e').length,sai:made.filter(l=>l.tipo==='s').length,te:sum('e'),ts:sum('s'),rows:ls.slice(0,5).map(l=>[l.d.slice(8)+'/'+l.d.slice(5,7),l.desc,l.cat,l.tipo,l.v]),lids,tits,exts,fqu}));
 IMHIST.unshift({tipo:'extrato',file:I.file,when:NOWD,by:'Rafael Pereira',txt:`${made.length} lançamentos enviados para aprovação`});
 return res;}
/* rejeitar a importação desfaz os lançamentos, as baixas e as chaves das linhas */
function imUndo(a){fqUndo(a.fqu);(a.lids||[]).forEach(id=>{const i=LANCS.findIndex(x=>x.id===id);if(i>=0)LANCS.splice(i,1);});
 (a.tits||[]).forEach(([k,id,bx])=>{const t=(k==='p'?PAGAR:RECEB).find(x=>x.id===id),i=t?t.baixas.indexOf(bx):-1;if(i>=0){t.baixas.splice(i,1);tSync(t,k);}});
 (a.exts||[]).forEach(x=>IMSEEN.delete(x));}

document.addEventListener('change',e=>{const t=e.target;if(S.active!=='fimp'||!t||!t.dataset)return;const I=imS();
 if(t.name==='imc'){I.conta=+t.value;return;}
 if(t.name==='fqa'){I.adq=t.value;I.file=null;fRe();return;}
 if(t.dataset.im==='act'){I.rows[+t.dataset.i].act=t.value;fRe();}
 else if(t.dataset.im==='cat'){I.rows[+t.dataset.i].cat=t.value;fRe();}
 else if(t.dataset.im==='ct')I.rows[+t.dataset.i].ct=t.value;
 else if(t.dataset.im==='cc')I.rows[+t.dataset.i].cc=t.value;});

/* ---------- Dados de exemplo: contas, fechamento e caixas (só leitura) ---------- */
const FCONTAS=[{n:'Conta principal',tipo:'Conta bancária',banco:'Banco do Brasil',ext:{d:'2026-09-30',saldo:null},ini:40000,atual:57830,desde:'2026-01-01',pend:1},{n:'Caixa físico',tipo:'Caixa físico',banco:'',ini:500,atual:1240,desde:'2026-01-01',pend:0},
 /* carteira de pagamento: o Mercado Pago e o Asaas guardam o dinheiro antes de ele ir ao banco (FIN-P-83) */
 {n:'Carteira Mercado Pago',tipo:'Carteira de pagamento',banco:'',prov:'Mercado Pago',cart:1,ini:412.3,atual:412.3,desde:'2026-01-01',pend:0},
 {n:'Carteira Asaas',tipo:'Carteira de pagamento',banco:'',prov:'Asaas',cart:1,ini:186.5,atual:186.5,desde:'2026-01-01',pend:0}];
const FCLOSED=[['2026-08','Fechado'],['2026-07','Selado'],['2026-06','Selado']];
const fSaldo=()=>FCONTAS.reduce((a,c)=>a+c.atual,0);
const pcVivos=()=>pcUnits().filter(c=>!c.closed||c.in-c.out>0);
const pcCom=()=>pcVivos().reduce((a,c)=>a+c.in-c.out,0);

/* ---------- Maquininhas, totens e conciliação de cartões (06/11/2026) ----------
   OPCIONAL: quem não cadastra maquininha continua só subindo o extrato do banco.
   Três pontas: venda do Alva → linha da maquininha (Importar e conciliar › Extrato da maquininha)
   → depósito no extrato do banco (Importar e conciliar › Extrato do banco, linhas "Recebíveis da maquininha").
   Exemplos: dados de teste; nada é lido de verdade. */
const FQADQ=['Mercado Pago'];
const FQMODN={cafe:'Cafeteria',rest:'Restaurante',shop:'Loja'},FQCC={cafe:'cc3',rest:'cc4',shop:'cc5',fin:'cc2'},FQCCN={cc3:'Cafeteria',cc4:'Restaurante',cc5:'Loja',cc2:'Cultos'};
/* maquininha da igreja (dízimos e ofertas) é do módulo Financeiro; totem e venda só existem nos módulos de venda */
const FQMODM={...FQMODN,fin:'Financeiro'};
const FQMAQ=[
 {id:'mq1',n:'Cafeteria · máquina 1',adq:'Mercado Pago',est:'MP-770121',mod:'cafe',cc:'cc3',conta:'Conta principal'},
 {id:'mq2',n:'Cafeteria · máquina 2',adq:'Mercado Pago',est:'MP-770122',mod:'cafe',cc:'cc3',conta:'Conta principal'},
 {id:'mq3',n:'Cafeteria · máquina 3',adq:'Mercado Pago',est:'MP-770123',mod:'cafe',cc:'cc3',conta:'Conta principal'},
 {id:'mq4',n:'Restaurante · máquina 1',adq:'Mercado Pago',est:'MP-770131',mod:'rest',cc:'cc4',conta:'Conta principal'},
 {id:'mq5',n:'Restaurante · máquina 2',adq:'Mercado Pago',est:'MP-770132',mod:'rest',cc:'cc4',conta:'Conta principal'},
 {id:'mq6',n:'Loja · máquina 1',adq:'Mercado Pago',est:'MP-330181',mod:'shop',cc:'cc5',conta:'Conta principal'},
 {id:'mq7',n:'Loja · máquina 2',adq:'Mercado Pago',est:'MP-330182',mod:'shop',cc:'cc5',conta:'Conta principal'},
 {id:'mq8',n:'Igreja · Dízimos e ofertas',adq:'Mercado Pago',est:'MP-880201',mod:'fin',cc:'cc2',conta:'Conta principal'}];
const FQTOT=[
 {id:'tt1',n:'Totem 1 · Cafeteria',term:'T-CAF-01',prov:'Totify',card:'CARD-CAF',mod:'cafe',cc:'cc3',maq:'mq1'},
 {id:'tt2',n:'Totem 2 · Cafeteria',term:'T-CAF-02',prov:'Totify',card:'CARD-CAF',mod:'cafe',cc:'cc3',maq:'mq2'},
 {id:'tt3',n:'Totem 3 · Cafeteria',term:'T-CAF-03',prov:'Totify',card:'CARD-CAF',mod:'cafe',cc:'cc3',maq:'mq3'},
 {id:'tt4',n:'Totem 1 · Restaurante',term:'T-RES-01',prov:'Totify',card:'CARD-RES',mod:'rest',cc:'cc4',maq:'mq4'},
 {id:'tt5',n:'Totem 2 · Restaurante',term:'T-RES-02',prov:'Totify',card:'CARD-RES',mod:'rest',cc:'cc4',maq:'mq5'}];
const FQST={},FQREC=[];let _fqs=0,_fqm=100,_fqSales=null;
CPISENTA.add('Taxas de maquininha');
const fqR=v=>Math.round(v*100)/100;
const fqAdd=(d,n)=>{const t=new Date(d+'T12:00');t.setDate(t.getDate()+n);return t.toISOString().slice(0,10);};
const fqMq=id=>FQMAQ.find(m=>m.id===id);
const fqCart=adq=>FCONTAS.find(c=>c.cart&&c.prov===adq);
/* o que ainda está a liberar numa carteira (recebíveis conciliados) e a data da próxima liberação */
const fqLib=c=>{const o=FQREC.filter(x=>x.st==='aberto'&&x.adq===c.prov);return {v:fqR(o.reduce((a,x)=>a+x.liq,0)),d:o.length?o.map(x=>x.d).sort()[0]:'',n:o.length};};
const fqCcN=cc=>(CCUSTOS.find(c=>c.id===cc)||{}).n||'';

/* vendas no cartão do módulo de vendas (últimos 7 dias do exemplo) */
function fqSales(){if(_fqSales)return _fqSales;
 const base=FOOD_SALES.filter(s=>s.method==='Cartão'&&s.status==='completed'&&s.date>='2026-09-24'&&s.date<='2026-09-30');
 _fqSales=base.map((s,i)=>{const modal=i%3===0?'Débito':'Crédito';return {id:s.id,i,store:s.store,date:s.date,time:s.time,total:fqR(s.total/100),totem:!!s.totemNo,modal,par:modal==='Crédito'&&i%4===1?3:1,band:['Visa','Mastercard','Elo'][i%3],aut:String(480100+i*37)};});
 _fqSales.forEach((v,i)=>{if(i>=4&&i<=10)fqLink(v,i<7?'id':'aprox');});
 return _fqSales;}
/* vincula a venda a uma linha da maquininha (feito pelo job de conciliação ou desfeito pelo Admin) */
function fqLink(v,how){const o=fqMaqOf(v);if(!o)return false;const tx=fqTaxa(v),liq=fqR(v.total-tx),dt=fqPrev(v),n=dt.length,eb=fqR(v.total/n),el=fqR(liq/n);
 dt.forEach((d,k)=>FQREC.push({id:'rc'+(++_fqs),sale:v.id,adq:o.maq.adq,maq:o.maq.id,cc:o.maq.cc,cat:v.cat,sd:v.date,d,br:k===n-1?fqR(v.total-eb*(n-1)):eb,liq:k===n-1?fqR(liq-el*(n-1)):el,k:k+1,n,st:'aberto'}));
 Object.assign(fqV(v),{st:'maq',bruto:v.total,taxa:tx,liq,maq:o.maq.id,aut:v.aut,how});return true;}
const fqV=v=>FQST[v.id]||(FQST[v.id]={st:'conferir'});
/* de qual maquininha é a venda: pelo totem (terminal) ou, no balcão, uma máquina do módulo */
function fqMaqOf(v){const L=FQMAQ.filter(m=>m.mod===v.store);if(!L.length)return null;
 if(v.totem){const T=FQTOT.filter(t=>t.mod===v.store);if(T.length){const t=T[v.i%T.length];return {maq:fqMq(t.maq)||L[v.i%L.length],tot:t};}}
 return {maq:L[v.i%L.length],tot:null};}
const fqRate=v=>v.modal==='Débito'?.0199:v.par>1?.0499:.0349;
const fqTaxa=(v,total)=>fqR((total==null?v.total:total)*fqRate(v));
const fqPrev=v=>v.modal==='Débito'?[fqAdd(v.date,1)]:Array.from({length:v.par},(_,k)=>fqAdd(v.date,30*(k+1)));
const fqPv=v=>{const p=fqPrev(v).map(d=>dBR(d).slice(0,5));return v.par>1?`${v.par}x · 1ª ${p[0]}`:p[0];};
const fqLbl=v=>`${v.modal}${v.par>1?` ${v.par}x`:''} ${v.band}`;
const FQST_UI={conferir:['clock','A conferir','duplicado'],maq:['link','Conciliada com a maquininha','baixa'],banco:['check','Recebida no banco','existe']};
const fqLabel=(st,f)=>st==='conferir'?'A conferir':st==='banco'?(f==='Dinheiro'?'Depositada no banco':'Recebida no banco'):(f==='Dinheiro'?'Conferida no caixa':f==='Online'?'Conciliada com o Asaas':'Conciliada com a maquininha');
const fqChip=(st,f)=>`<span class="im-st ${FQST_UI[st][2]}">${ic(FQST_UI[st][0],13,2.4)}${fqLabel(st,f)}</span>`;
Object.assign(IMST,{mcasa:['link','Casada com a venda'],mdif:['alert','Valor diferente'],msv:['alert','Linha sem venda'],mvl:['clock','Venda sem linha'],mja:['check','Já conciliada'],rec:['link','Repasse da carteira'],rdif:['alert','Diferença no repasse'],pix:['link','Venda Pix'],dep:['link','Depósito do caixa']});
Object.assign(IMACT,{mcasa:[['conciliar','Conciliar'],['ignorar','Deixar para depois']],mdif:[['','Decidir…'],['conciliar','Conciliar com o valor da maquininha'],['ignorar','Deixar para depois']],msv:[['ignorar','Deixar para investigar']],mvl:[['manter','Continua a conferir']],mja:[['ignorar','Já conciliada']]});
Object.assign(IMDEF,{mcasa:'conciliar',mdif:'',msv:'ignorar',mvl:'manter',mja:'ignorar',rec:'baixarRec',rdif:'',pix:'baixarRec',dep:'baixarRec'});

/* ---- Ponte A: venda do Alva × linha da maquininha ---- */
function fqAnalyze(I){const adq=I.adq,rows=[],mkq=(b,st,x={})=>({...b,st,actions:IMACT[st],act:IMDEF[st],...x});
 const V=fqSales().map(v=>({v,o:fqMaqOf(v)})).filter(x=>x.o&&x.o.maq.adq===adq);
 V.forEach(({v,o},j)=>{const s=fqV(v),tx=fqTaxa(v),org=(o.tot?o.tot.n:'Balcão')+' · '+o.maq.n,
  base={id:'q'+rows.length,sid:v.id,d:v.date,time:v.time,aut:v.aut,maqId:o.maq.id,cc:o.maq.cc,alva:v.total,bruto:v.total,taxa:tx,liq:fqR(v.total-tx),prev:fqPv(v),lbl:`${FQMODN[v.store]} · ${fqLbl(v)} · aut. ${v.aut}`};
  if(s.st!=='conferir')return rows.push(mkq({...base,bruto:s.bruto,taxa:s.taxa,liq:s.liq},'mja',{msg:`${org}. Já foi conciliada antes.`}));
  if(j===1)return rows.push(mkq({...base,bruto:null,taxa:null,liq:null,prev:''},'mvl',{msg:`${org}. A venda existe no Alva, mas não veio linha no arquivo. Continua a conferir.`}));
  if(j===3){const b=fqR(v.total>10?v.total-5:v.total-1),t=fqTaxa(v,b);return rows.push(mkq({...base,bruto:b,taxa:t,liq:fqR(b-t)},'mdif',{msg:`${org}. No Alva a venda é ${R$(v.total)}; a maquininha cobrou ${R$(b)}. Você decide qual vale.`}));}
  rows.push(mkq(base,'mcasa',{msg:`${org}. Bate com a venda do Alva.`}));});
 const f=FQMAQ.find(m=>m.adq===adq);
 if(V.length>=4&&f){const t=fqR(47*.0349);rows.push(mkq({id:'q'+rows.length,sid:null,d:'2026-09-27',time:'18:42',aut:'489901',maqId:f.id,cc:f.cc,alva:null,bruto:47,taxa:t,liq:fqR(47-t),prev:'27/10',lbl:'Cafeteria · Crédito Visa · aut. 489901'},'msv',{msg:`${f.n}. Linha do arquivo sem venda no Alva. Confira no módulo de vendas.`}));}
 return rows.sort((a,b)=>(a.d+a.time)<(b.d+b.time)?-1:1).map((r,i)=>({...r,id:'q'+i}));}

function fqApply(I){const res={conc:0,ign:0,recs:0,taxa:0,liq:0,br:0};
 I.rows.forEach(r=>{if(r.act!=='conciliar'||!r.sid){res.ign++;return;}
  const pg=I.type==='pag',v=pg?fqPays().find(x=>x.id===r.sid):fqSales().find(x=>x.id===r.sid),s=pg?fqStat(v):fqV(v),dt=pg?[fqPayRep(v)]:fqPrev(v),n=dt.length,eb=fqR(r.bruto/n),el=fqR(r.liq/n);
  dt.forEach((d,k)=>FQREC.push({id:'rc'+(++_fqs),sale:v.id,adq:I.adq,maq:r.maqId,cc:r.cc,cat:v.cat,sd:v.date,d,br:k===n-1?fqR(r.bruto-eb*(n-1)):eb,liq:k===n-1?fqR(r.liq-el*(n-1)):el,k:k+1,n,st:'aberto'}));
  Object.assign(s,{st:'maq',bruto:r.bruto,taxa:r.taxa,liq:r.liq,maq:r.maqId,aut:r.aut});
  res.conc++;res.recs+=n;res.taxa=fqR(res.taxa+r.taxa);res.liq=fqR(res.liq+r.liq);res.br=fqR(res.br+r.bruto);});
 IMHIST.unshift({tipo:'maq',file:I.file,when:NOWD,by:'Rafael Pereira',txt:(I.type==='pag'?`${res.conc} ${res.conc===1?'pagamento conciliado':'pagamentos conciliados'} com o Asaas`:`${res.conc} ${res.conc===1?'venda conciliada':'vendas conciliadas'} com ${I.adq}`)});
 return res;}

function fqConfirm(I){const dec=I.rows.filter(r=>!r.act).length,n=I.rows.filter(r=>r.act==='conciliar').length;
 if(dec){I.filter='atencao';fRe();return toast(`Decida ${dec} ${dec===1?'linha com valor diferente':'linhas com valor diferente'} antes de confirmar: o Alva não decide por você.`);}
 if(!n)return toast('Nenhuma venda será conciliada com as ações atuais.');
 openDlg(`${dlgHead('Confirmar conciliação?')}<p class="who" style="margin:0 0 14px">${n} ${n===1?'venda passa':'vendas passam'} a <b>conciliadas com ${I.type==='pag'?'o Asaas':'a maquininha'}</b>, com taxa e valor líquido, e o que cada uma vai render fica previsto por data de recebimento. <b>Nada entra no saldo agora</b>: o dinheiro fica como a liberar na carteira e só vira saldo quando o repasse aparecer no extrato do banco.</p><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" id="imGo">${ic('check',14,2.4)}Confirmar</button></div>`,'sm');
 $('#imGo').onclick=ev=>busy(ev.currentTarget,900,'Conciliado',()=>{I.res=fqApply(I);I.step=3;closeDlg();fGo();});}

/* ---- Ponte B: depósito do extrato do banco × recebíveis da maquininha ---- */
function fqBankLines(){const g={};FQREC.filter(x=>x.st==='aberto'&&x.d<='2026-09-30').forEach(x=>{const k=x.adq+'|'+x.d,o=g[k]||(g[k]={adq:x.adq,d:x.d,day:x.day,ids:[],tot:0});o.ids.push(x.id);o.tot=fqR(o.tot+x.liq);});
 const L=Object.values(g).sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:a.adq<b.adq?-1:1),big=L.reduce((m,x,i)=>x.adq==='Mercado Pago'&&x.tot>(L[m]&&L[m].adq==='Mercado Pago'?L[m].tot:-1)?i:m,0);
 const cards=L.map((x,i)=>{const dif=i===big&&x.adq==='Mercado Pago'&&x.tot>10?fqR(Math.min(12.4,x.tot*.2)):0;return {...x,dif,dep:fqR(x.tot-dif),memo:x.adq==='Asaas'?'ASAAS TRANSFERENCIA':x.adq==='Dinheiro'?'DEPOSITO EM DINHEIRO':'MERCADO PAGO REPASSE'};});
 const nm=['MARINA COSTA','JOSE R LIMA','ANA PAULA S','CARLOS EDUARDO'];
 const pix=FOOD_SALES.filter(s=>s.method==='Pix'&&s.status==='completed'&&s.date>='2026-09-24'&&s.date<='2026-09-30'&&(FQST[s.id]||{st:'conferir'}).st==='conferir').sort((a,b)=>(a.date+a.time)<(b.date+b.time)?-1:1).slice(0,4).map((s,i)=>({adq:'Pix',pix:true,sale:s.id,cc:FQCC[s.store],d:s.date,ids:[],tot:fqR(s.total/100),dif:0,dep:fqR(s.total/100),memo:'PIX RECEBIDO '+nm[i%4]}));
 const cashG={};FOOD_SALES.filter(s=>s.method==='Dinheiro'&&s.status==='completed'&&s.date>='2026-09-24'&&s.date<='2026-09-28'&&(FQST[s.id]||{st:'conferir'}).st==='conferir').forEach(s=>{const k=s.store+'|'+s.date,o=cashG[k]||(cashG[k]={adq:'Dinheiro',cash:true,cc:FQCC[s.store],d:fqAdd(s.date,1),day:s.date,ids:[],tot:0,dif:0,memo:'DEPOSITO EM DINHEIRO'});o.ids.push(s.id);o.tot=fqR(o.tot+s.total/100);});
 const cash=Object.values(cashG).sort((a,b)=>a.d<b.d?-1:1).slice(0,3).map(o=>({...o,dep:o.tot}));
 return [...cards,...pix,...cash];}
function fqSync(){[...new Set(FQREC.map(x=>x.sale))].forEach(id=>{const s=FQST[id];if(!s||s.st==='conferir')return;s.st=FQREC.filter(x=>x.sale===id).every(x=>x.st==='recebido')?'banco':'maq';});}
function fqBaixa(r,c,mkL,fqu){const g=r.grp;
 if(g.pix||g.cash){const ids=g.pix?[g.sale]:g.ids;mkL(LC(r.d,r.d.slice(0,7),`${g.pix?'Recebimento Pix':'Depósito do caixa'} · ${FQCCN[g.cc]||'Vendas'}`,'Vendas','e',g.tot,'pend','Rafael Pereira',{cc:g.cc,acc:c.n,orig:g.pix?'Recebimento de venda Pix':'Depósito do caixa',imp:true}));ids.forEach(id=>{(FQST[id]||(FQST[id]={})).st='banco';(fqu.pix||(fqu.pix=[])).push(id);});return;}
 const recs=FQREC.filter(x=>g.ids.includes(x.id)&&x.st==='aberto'),by={},cw=fqCart(g.adq),dest=cw||c;
 /* com carteira: a liberação (receita e taxa) nasce na carteira, com a competência no mês da venda, e o repasse vira transferência para o banco; sem carteira, vai direto ao banco como antes */
 recs.forEach(x=>{const cm=(x.sd||r.d).slice(0,7),k=x.cc+'|'+(x.cat||'Vendas')+'|'+cm,o=by[k]||(by[k]={cc:x.cc,cat:x.cat||'Vendas',cm,br:0,tx:0});o.br=fqR(o.br+x.br);o.tx=fqR(o.tx+x.br-x.liq);});
 const comp=r.d.slice(0,7),who='Rafael Pereira';
 Object.entries(by).forEach(([k,o])=>{const cc=o.cc,nmc=fqCcN(cc)||'Vendas',ori=g.adq==='Asaas'?'Recebimento de pagamento online':'Recebimento de maquininha',cmp=cw?o.cm:comp;mkL(LC(r.d,cmp,`${g.adq==='Dinheiro'?'Depósito do caixa':'Recebimento '+g.adq} · ${nmc}`,o.cat,'e',o.br,'pend',who,{cc,acc:dest.n,orig:ori,imp:true}));
  if(o.tx>0)mkL(LC(r.d,cmp,`Taxas ${g.adq} · ${nmc}`,g.adq==='Asaas'?'Taxas de pagamento online':'Taxas de maquininha','s',o.tx,'pend',who,{cc,acc:dest.n,orig:ori,imp:true}));});
 if(g.dif>0)mkL(LC(r.d,comp,`Ajuste ${g.adq}: aluguel e tarifas`,'Taxas de maquininha','s',g.dif,'pend',who,{cc:'cc1',acc:dest.n,orig:'Recebimento de maquininha',imp:true}));
 if(cw&&r.v>0){mkL(LC(r.d,comp,`Transferência para ${c.n}`,'Transferência','s',r.v,'pend',who,{tr:true,acc:cw.n,orig:'Repasse da carteira'}));mkL(LC(r.d,comp,`Transferência de ${cw.n}`,'Transferência','e',r.v,'pend',who,{tr:true,acc:c.n,orig:'Repasse da carteira'}));}
 recs.forEach(x=>{x.st='recebido';fqu.rec.push(x.id);});fqSync();}
function fqUndo(u){if(!u)return;(u.pix||[]).forEach(id=>{if(FQST[id])FQST[id].st='conferir';});(u.rec||[]).forEach(id=>{const x=FQREC.find(y=>y.id===id);if(x)x.st='aberto';});fqSync();}

/* ---- Importar e conciliar: tela do extrato da maquininha ---- */
function fqFile(I){if(I.type==='pag')return fqFilePag(I);const adqs=[...new Set(FQMAQ.map(m=>m.adq))];I.adq=adqs.includes(I.adq)?I.adq:adqs[0];
 const mq=FQMAQ.filter(m=>m.adq===I.adq),vs=fqSales().filter(v=>{const o=fqMaqOf(v);return o&&o.maq.adq===I.adq;}).length;
 return `<div class="fi-io rise" style="--d:2"><section class="card fi-imp"><h2>${ic('wallet',16)} Extrato da maquininha</h2>
  <p class="fl">1. Adquirente</p>${selw('fqa',adqs.map(a=>`<option ${a===I.adq?'selected':''}>${esc(a)}</option>`).join(''))}
  <p class="fl">2. Arquivo</p>${I.file?`<div class="ct-file"><span class="mt-ft" style="--s:38px;height:38px;border-radius:10px;background:var(--st-sol-bg);color:var(--st-sol)">CSV</span><span class="dkt"><b>${esc(I.file)}</b><span>${esc(I.adq)} · ${vs} vendas no cartão para conferir</span></span><button class="ibtn sm" data-a="imFileX" aria-label="Remover">${ic('x',13)}</button></div>`:`<div class="ct-drop" data-a="imPickFile">${ic('upload',18)}<span><b>Arraste o arquivo aqui ou clique para escolher</b><small>CSV ou planilha exportada do portal do adquirente</small></span></div>`}
  <p class="who im-sim">${ic('info',13,2)}Neste protótipo o conteúdo do arquivo não é lido: mostramos um exemplo montado com as vendas no cartão do Alva.</p>
  <div class="fi-impf"><button class="btn sec" data-a="imBack">Voltar</button><button class="btn pri" data-a="imRead" ${I.file?'':'disabled'}>Ler e revisar</button></div></section>
  <aside class="card fi-exp"><h2>Como a conciliação funciona</h2><ul class="im-bul"><li>Cada linha do arquivo é ligada a uma venda do Alva pelo estabelecimento, valor e autorização.</li><li>Você vê o <b>valor da venda</b>, a <b>taxa</b> e o <b>valor que vai receber</b>, com a data de cada parcela.</li><li>Venda sem linha e linha sem venda aparecem como diferença para você tratar.</li><li>Nada entra no saldo aqui. O dinheiro fica como a liberar na carteira e só vira saldo quando o repasse for conciliado no extrato do banco.</li></ul><p class="who" style="margin:10px 0 4px">Maquininhas de ${esc(I.adq)} cadastradas</p><ul class="im-bul">${mq.map(m=>`<li>${esc(m.n)} <small class="soft">· ${esc(m.est)}</small></li>`).join('')}</ul></aside></div>`;}

const FQFILT=[['todas','Todas'],['ok','Casadas'],['atencao','Exigem atenção']];
const fqIn=(r,k)=>k==='todas'||(k==='ok'&&['mcasa','mja'].includes(r.st))||(k==='atencao'&&['mdif','msv','mvl'].includes(r.st));
function fqReview(I){const rows=I.rows,sm={};rows.forEach(r=>{sm[r.st]=(sm[r.st]||0)+1;});
 const cn=rows.filter(r=>r.act==='conciliar'),sum=f=>fqR(cn.reduce((s,r)=>s+f(r),0)),dec=rows.filter(r=>!r.act).length,shown=rows.filter(r=>fqIn(r,I.filter||'todas'));
 const body=shown.map(r=>{const i=rows.indexOf(r),need=!r.act,
  opts=r.actions.filter(([k])=>k||!r.act).map(([k,l])=>`<option value="${k}" ${r.act===k?'selected':''}>${l}</option>`).join(''),
  sel=`<span class="selw"><select data-im="act" data-i="${i}" aria-label="Ação para ${esc(r.lbl)}" ${r.actions.length<2?'disabled':''}>${opts}</select>${ic('updown',14)}</span>`,
  vals=r.alva==null&&r.bruto==null?'<span class="soft">—</span>':`${r.alva!=null?`<span>Venda <b>${R$(r.alva)}</b></span>`:'<span>Venda <b>—</b></span>'}${r.bruto!=null&&r.bruto!==r.alva?`<span>Maquininha <b>${R$(r.bruto)}</b></span>`:''}${r.taxa!=null?`<span>Taxa <b>−${R$(r.taxa)}</b></span><span>Recebe <b>${R$(r.liq)}</b></span>`:''}`;
  return `<div class="im-r fq ${r.st} ${need?'need':''}"><span class="im-d">${dBR(r.d)}<small class="soft">${r.time||''}</small></span><span class="im-t"><b>${esc(r.lbl)}</b><small>${esc(r.msg)}</small></span><span class="im-v fq-vals">${vals}</span><span class="im-s">${imChip(r.st)}</span><span class="im-a">${sel}</span><span class="im-c">${r.prev?esc(r.prev):'<span class="soft">—</span>'}</span></div>`;}).join('')||'<p class="im-empty">Nenhuma linha neste filtro.</p>';
 return `<section class="card kpis4 rise" style="--d:2"><div class="k4"><span class="kl">Linhas no arquivo</span><span class="kv">${rows.filter(r=>['mcasa','mdif','msv','mja'].includes(r.st)).length}</span><span class="kd">${esc(I.adq)} · últimos 7 dias</span></div><div class="k4"><span class="kl">Vão ser conciliadas</span><span class="kv">${cn.length}</span><span class="kd">${R$(sum(r=>r.bruto))} vendidos</span></div><div class="k4"><span class="kl">Taxas da adquirente</span><span class="kv">${R$(sum(r=>r.taxa))}</span><span class="kd">descontadas do repasse</span></div><div class="k4"><span class="kl">A receber (líquido)</span><span class="kv">${R$(sum(r=>r.liq))}</span><span class="kd">previsto por data</span></div></section>
 <p class="fi-note ${dec||sm.msv||sm.mvl?'warn':''} rise" style="--d:3">${ic(dec||sm.msv||sm.mvl?'alert':'check',15)}<span>${dec||sm.msv||sm.mvl?`<b>${(sm.mdif||0)+(sm.msv||0)+(sm.mvl||0)} ${(sm.mdif||0)+(sm.msv||0)+(sm.mvl||0)===1?'diferença':'diferenças'}</b> entre o arquivo e as vendas do Alva. O que ficar sem conciliar continua “a conferir”.`:'Todas as linhas batem com as vendas do Alva.'}</span></p>
 <div class="im-tb rise" style="--d:3"><div class="im-chips">${Object.entries(sm).map(([k,n])=>`<span class="im-cc">${imChip(k)}<b>${n}</b></span>`).join('')}</div><div class="chips">${FQFILT.map(f=>`<button class="chipf ${(I.filter||'todas')===f[0]?'on':''}" data-a="imFilter" data-v="${f[0]}">${f[1]}</button>`).join('')}</div></div>
 <section class="card im-card rise" style="--d:4"><div class="im-r fq thead">${['Data',I.type==='pag'?'Cobrança':'Venda e maquininha','Valores','Situação','Ação','Recebe em'].map(h=>`<span>${h}</span>`).join('')}</div>${body}</section>
 <div class="im-bar rise" style="--d:5"><span><b>${cn.length}</b> a conciliar · <b>${rows.length-cn.length-dec}</b> sem mudança${dec?` · <b class="im-neg">${dec} para decidir</b>`:''}</span><button class="btn sec" data-a="imBack">Voltar</button><button class="btn pri" data-a="imConfirm">${ic('check',15,2.4)}Confirmar conciliação</button></div>`;}

function fqResult(I){const r=I.res;
 return `<section class="card cm-done rise" style="--d:2"><span class="cm-ok">${ic('check',30,2.6)}</span><h2>Conciliação concluída</h2><p>${esc(I.file)}</p></section>
 <section class="card kpis4 rise" style="--d:3"><div class="k4"><span class="kl">Vendas conciliadas</span><span class="kv">${r.conc}</span><span class="kd">${R$(r.br)} vendidos</span></div><div class="k4"><span class="kl">Taxas da adquirente</span><span class="kv">${R$(r.taxa)}</span><span class="kd">descontadas do repasse</span></div><div class="k4"><span class="kl">A receber (líquido)</span><span class="kv">${R$(r.liq)}</span><span class="kd">${r.recs} ${r.recs===1?'parcela prevista':'parcelas previstas'}</span></div><div class="k4"><span class="kl">Sem mudança</span><span class="kv">${r.ign}</span><span class="kd">deixadas para depois</span></div></section>
 <p class="fi-note rise" style="--d:4">${ic('info',15)}<span><b>Nada entrou no saldo ainda.</b> As vendas conciliadas estão em <button class="lnk inl" data-a="fqVerCd">Caixas e vendas › Vendas</button>, com o que cada uma vai render por data. Quando o depósito da adquirente aparecer no extrato do banco, importe o extrato: o Alva sugere baixar todos os recebíveis do dia de uma vez.</span></p>
 <div class="im-end rise" style="--d:5"><button class="btn sec" data-a="imAgain">Reenviar o mesmo arquivo (teste)</button><button class="btn sec" data-a="fqVerCd">Ver vendas</button><button class="btn pri" data-a="fqBanco">Importar extrato do banco</button></div>`;}

/* ---- Caixas e vendas › Vendas: detalhe das vendas do mês e o status financeiro de cada uma (06/11/2026) ----
   Toda venda precisa ser conferida; o caminho muda pela forma de pagamento:
   cartão: a conferir → conciliada com a maquininha → recebida no banco
   Pix: a conferir → recebida no banco (casa com a linha do extrato)
   dinheiro: a conferir → conferida no caixa do dia → depositada no banco
   Vendas anteriores a 24/09 já estão conferidas (exemplo). */
const fqStat=s=>s.date<'2026-09-24'?{st:'banco'}:(FQST[s.id]||(FQST[s.id]={st:'conferir'}));
const fqPend=(k,mm)=>FOOD_SALES.filter(s=>s.store===k&&s.date.startsWith(mm)&&s.status==='completed'&&fqStat(s).st==='conferir').length;
function fqRecBlock(){const open=FQREC.filter(x=>x.st==='aberto');if(!open.length)return '';
 const grp={};open.forEach(x=>{const g=grp[x.adq+'|'+x.d]||(grp[x.adq+'|'+x.d]={adq:x.adq,d:x.d,day:x.day,n:0,v:0});g.n++;g.v=fqR(g.v+x.liq);});
 const gl=Object.values(grp).sort((a,b)=>a.d<b.d?-1:1),tot=fqR(open.reduce((a,x)=>a+x.liq,0));
 return `<section class="card pc rise" style="--d:4"><div class="sh"><h2>A receber das maquininhas e do caixa</h2></div><div class="fq-gs">${gl.slice(0,8).map(g=>`<div class="fq-g"><span>${dBR(g.d)}</span><span>${g.adq==='Dinheiro'?`<b>Dinheiro</b> · caixa de ${dBR(g.day)} · ${g.n} ${g.n===1?'venda':'vendas'}`:`<b>${esc(g.adq)}</b> · ${g.n} ${g.n===1?'parcela':'parcelas'}`}</span><b>${R$(g.v)}</b></div>`).join('')}</div><p class="who" style="margin:8px 18px 14px">Total conciliado a receber: <b>${R$(tot)}</b>${gl.length>8?' · mostrando os 8 primeiros dias':''}. A liberação para a carteira e a transferência ao banco entram pelo extrato do banco.</p></section>`;}

function fqVendPage(k){
 const mm=S.relM[0]==='Y'?S.relM.slice(1):S.relM,mn=mm.length===4?'ano '+mm:MONTHS[+mm.slice(5)-1],nm=(FOOD_STORES[k]||{}).name||FQMODN[k],fm=S.fqFm||'todas',sf=S.fqSf||'todas';
 const all=FOOD_SALES.filter(s=>s.store===k&&s.date.startsWith(mm)&&s.status==='completed').map(s=>({s,st:fqStat(s).st}));
 const by=st=>all.filter(x=>x.st===st),sum=a=>fqR(a.reduce((t,x)=>t+x.s.total/100,0));
 const shown=all.filter(x=>(fm==='todas'||x.s.method===fm)&&(sf==='todas'||x.st===sf)).sort((a,b)=>(a.s.date+a.s.time)<(b.s.date+b.s.time)?1:-1);
 const lim=S.fqN||20,vis=shown.slice(0,lim);
 const rows=vis.map(({s,st})=>{const v=s.method==='Cartão'?fqSales().find(y=>y.id===s.id):null,sx=FQST[s.id]||{},conc=v&&st!=='conferir',o=v&&fqMaqOf(v);
  return `<div class="im-r fq5 fq-go" data-a="fqSale" data-v="${s.id}" role="button" tabindex="0"><span class="im-d">${dBR(s.date)}<small class="soft">${s.time}</small></span><span class="im-t"><b>${s.id} · ${s.method}${v?' · '+fqLbl(v):''}</b><small>${foodOrigin(s)}${o?' · '+esc(o.maq.n):''}</small></span><span class="im-v fq-vals"><span><b>${R$(s.total/100)}</b></span>${conc?`<span>Taxa <b>−${R$(sx.taxa||0)}</b></span><span>Recebe <b>${R$(sx.liq||0)}</b></span>`:''}</span><span class="im-s">${fqChip(st,s.method)}</span><span class="im-a">${conc?fqPv(v):'<span class="soft">—</span>'}</span></div>`;}).join('')||'<p class="im-empty">Nenhuma venda neste filtro.</p>';
 const chip=(a,vv,l,n,cur)=>`<button class="chipf ${cur===vv?'on':''}" data-a="${a}" data-v="${vv}">${l}<small>${n}</small></button>`;
 return `<nav class="crumb rise"><span class="soft">Financeiro</span>${ic('chevR',13,2)}<button class="lnk back" data-a="fqVendBack">Caixas e vendas</button>${ic('chevR',13,2)}<span>${esc(nm)}</span></nav>`
 +fHead(nm,`Vendas de ${mn} e o status financeiro de cada uma`)+fMes()
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Vendas no período</span><span class="kv">${all.length}</span><span class="kd">${R$(sum(all))}</span></div><div class="k4"><span class="kl">A conferir</span><span class="kv" style="color:var(--st-sol)">${by('conferir').length}</span><span class="kd">${R$(sum(by('conferir')))}</span></div><div class="k4"><span class="kl">Conferidas</span><span class="kv">${by('maq').length}</span><span class="kd">${R$(sum(by('maq')))} · falta cair no banco</span></div><div class="k4"><span class="kl">Recebidas no banco</span><span class="kv" style="color:var(--st-int)">${by('banco').length}</span><span class="kd">${R$(sum(by('banco')))}</span></div></section>`
 +`<p class="fi-note rise" style="--d:2">${ic('info',15)}<span>Toda venda é conferida. <b>Cartão:</b> conciliada com a maquininha e depois recebida no banco. <b>Pix:</b> recebida no banco, casando com a linha do extrato. <b>Dinheiro:</b> recebida no banco, casando com o depósito do extrato. Clique numa venda para ver o resumo.</span></p>`
 +`<div class="fq-tb rise" style="--d:3"><div class="chips">${[['todas','Todas as formas'],['Cartão','Cartão'],['Pix','Pix'],['Dinheiro','Dinheiro']].map(f=>chip('fqFm',f[0],f[1],f[0]==='todas'?all.length:all.filter(x=>x.s.method===f[0]).length,fm)).join('')}</div>`
 +`<div class="chips">${[['todas','Todos os status',all.length],['conferir','A conferir',by('conferir').length],['maq','Conferidas',by('maq').length],['banco','Recebidas no banco',by('banco').length]].map(f=>chip('fqSf',f[0],f[1],f[2],sf)).join('')}</div></div>`
 +`<section class="card im-card rise" style="--d:3"><div class="im-r fq5 thead">${['Data','Venda','Valor','Situação','Recebe em'].map(h=>`<span>${h}</span>`).join('')}</div>${rows}</section>`
 +(shown.length>lim?`<p class="rise" style="--d:4;text-align:center;margin:14px 0"><button class="btn sec" data-a="fqMais">Ver mais vendas <small>(${shown.length-lim})</small></button></p>`:'')
 +fqRecBlock();}

function fqSaleDlg(id){const s=FOOD_SALES.find(x=>x.id===id);if(!s)return;const f=s.method,x=fqStat(s),v=f==='Cartão'?fqSales().find(y=>y.id===id):null,o=v&&fqMaqOf(v),sx=FQST[id]||{},conc=v&&x.st!=='conferir';
 const steps=f==='Cartão'?['Venda registrada','Conciliada com a maquininha','Recebida no banco']:f==='Pix'?['Venda registrada','Recebida no banco']:['Venda registrada','Depositada no banco'],at=x.st==='conferir'?0:x.st==='maq'?1:steps.length-1;
 const kv=(a,b)=>`<div class="fq-k"><span>${a}</span><b>${b}</b></div>`;
 openDlg(`${dlgHead(`Venda ${s.id}`,`${FQMODN[s.store]} · ${dBR(s.date)} às ${s.time}`)}
  <div class="fq-kvs">${kv('Origem',foodOrigin(s))}${kv('Forma de pagamento',f+(v?' · '+fqLbl(v):''))}${o?kv('Maquininha',esc(o.maq.n)+' · '+esc(o.maq.adq)):''}${kv('Valor da venda',R$(s.total/100))}${conc?kv('Taxa',`−${R$(sx.taxa||0)}`)+kv('Valor a receber',R$(sx.liq||0))+kv('Recebe em',fqPv(v)):''}</div>
  <p class="fl" style="margin:14px 0 6px">Itens</p><div class="fq-kvs">${s.lines.map(l=>`<div class="fq-k"><span>${l.qty}× ${esc(l.name)}</span><b>${foodMoney(l.qty*l.price)}</b></div>`).join('')}</div>
  <p class="fl" style="margin:14px 0 6px">Status financeiro</p><ol class="fq-st">${steps.map((t,i)=>`<li class="${i<=at?'on':''}"><i>${i<=at?ic('check',12,3):''}</i>${t}</li>`).join('')}</ol>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'sm');}
/* ---- Caixas e vendas › Caixas: unidades reais (ministério, evento, obra), lançamentos do líder e pagamentos online (06/11/2026) ---- */
const PCAMP=[{g:'Campanhas',n:'Campanha Reforma do Templo',in:34200,out:0,ret:0}];
function pcUnits(){
 if(typeof ZJ!=='undefined'&&typeof zCx==='function')ZJ.forEach(j=>zCx(j));
 const U=[],seen=new Set();
 CAIXAS.forEach(c=>{const k=c.ownerType+'|'+c.ownerId;if(seen.has(k))return;seen.add(k);
  const all=cxUnitAll(c),m=all.find(x=>x.main)||all[0],s=f=>fqR(all.reduce((a,x)=>a+f(x),0)/100);
  const ret=fqR(all.reduce((a,x)=>a+cxValid(x).filter(e=>e.t==='out'&&(e.cat==='Repasse'||e.cat==='Devolução à igreja')).reduce((q,e)=>q+e.v,0),0)/100);
  U.push({key:k,cx:m,ini:fqR((m.ini?m.ini.v:0)/100),kind:cxKind(m),g:c.ownerType==='min'?'Ministérios':c.ownerType==='zel'?'Obras':cxOwnerKind(m)==='Culto'?'Cultos':'Eventos',n:cxOwnerName(m),in:fqR(s(cxIn)+(m.ini?m.ini.v/100:0)),out:s(cxOut),ret,closed:m.status==='encerrado',verba:fqR(cxVerbaOk(m)/100)});});
 return U.concat(PCAMP.map(c=>({...c,key:'camp|'+c.n,kind:'camp',closed:false,verba:0})));}
const pcuGet=k=>pcUnits().find(u=>u.key===k);
const pcLcs=u=>u.cx?cxUnitAll(u.cx).flatMap(x=>x.entries.filter(e=>!e.xfer&&!e.est&&!e.rev).map(e=>({c:x,e}))):[];
const pcPend=u=>(u.cx?pcLcs(u).filter(({e})=>['conferir','pend'].includes(cxStat(e))).length:0)+fqCxLine(u).filter(p=>fqStat(p).st==='conferir'&&!(p.rf&&p.rf.s==='done')).length;
const pcPendCell=(n,w)=>`<span class="pv-c pv-c4" style="color:${n?'var(--st-sol)':'var(--ink-muted)'}">${n?(w?n+' '+(n===1?'item':'itens'):n):'—'}</span>`;
const pcZj=u=>u.cx&&u.cx.ownerType==='zel'&&typeof zJob==='function'?zJob(u.cx.ownerId):null;
const pcPendTxt=u=>(u.closed?'<small>Encerrado com saldo</small>':'')+(pcZj(u)&&pcZj(u).st==='concluido'&&!pcZj(u).enc?'<small>Prestação de contas</small>':'');
const fqRfChip=p=>p.rf?(p.rf.s==='done'?'<span class="im-st mdif">'+ic('undo',12,2.4)+(p.rf.pct>=100?'Reembolsada':'Reembolso de '+p.rf.pct+'%')+'</span>':'<span class="im-st msv">'+ic('clock',12,2.4)+'Reembolso solicitado</span>'):'';
const fqCxLine=u=>fqPays().filter(p=>u.kind==='camp'?(p.tipo==='Doação'&&'Campanha '+p.caixa===u.n):(p.tipo==='Inscrição'&&p.caixa===u.n));
function fqOnRows(u){const q=norm(S.fqCq||''),fm=S.fqFm||'todas',sf=S.fqSf||'todas',lim=S.fqN||30;
 const all=fqCxLine(u).map(p=>({p,st:fqStat(p).st}));
 const shown=all.filter(x=>(fm==='todas'||x.p.forma===fm)&&(sf==='todas'||x.st===sf)&&(!q||norm(x.p.quem).includes(q))).sort((a,b)=>a.p.date<b.p.date?1:a.p.date>b.p.date?-1:a.p.id<b.p.id?-1:1);
 const rows=shown.slice(0,lim).map(({p,st})=>{const conc=st!=='conferir',sx=FQST[p.id]||{},tx=sx.taxa!=null?sx.taxa:fqPayTaxa(p),lq=sx.liq!=null?sx.liq:fqR(p.total-tx);
  return `<div class="im-r fq5 fq-go" data-a="fqPay" data-v="${p.id}" role="button" tabindex="0"><span class="im-d">${dBR(p.date)}</span><span class="im-t"><b>${esc(p.quem)}</b><small>${p.tipo} · ${p.forma}</small></span><span class="im-v fq-vals"><span><b>${R$(p.total)}</b></span>${conc?`<span>Taxa <b>−${R$(tx)}</b></span><span>Recebe <b>${R$(lq)}</b></span>`:''}</span><span class="im-s">${fqRfChip(p)||fqChip(st,'Online')}</span><span class="im-a">${conc?dBR(fqPayRep(p)).slice(0,5):'<span class="soft">—</span>'}</span></div>`;}).join('')||'<p class="im-empty">Nenhum pagamento neste filtro.</p>';
 return fqRowsWrap(['Data','Pagamento','Valor','Situação','Recebe em'],rows,shown.length,lim,'pagamentos');}
function fqRowsWrap(heads,rows,n,lim,what){return `<section class="card im-card rise" style="--d:3"><div class="im-r ${heads.length===4?'fq4':'fq5'} thead">${heads.map(h=>`<span>${h}</span>`).join('')}</div>${rows}</section>`
 +`<p class="who" style="text-align:center;margin:12px 0 0">Mostrando ${Math.min(lim,n)} de ${n}</p>`
 +(n>lim?`<p style="text-align:center;margin:10px 0 14px"><button class="btn sec" data-a="fqMais">Ver mais ${what} <small>(${n-lim})</small></button></p>`:'');}
function fqLcRows(u){const q=norm(S.fqCq||''),sf=S.fqSf||'todas',lim=S.fqN||30;
 const shown=pcLcs(u).filter(({e})=>(sf==='todas'||cxStat(e)===sf)&&(!q||norm(e.desc+' '+e.by).includes(q))).sort((a,b)=>a.e.d<b.e.d?1:a.e.d>b.e.d?-1:0);
 const rows=shown.slice(0,lim).map(({c,e})=>`<div class="im-r fq4 fq-go" data-a="fqLc" data-v="${c.id}|${e.id}" role="button" tabindex="0"><span class="im-d">${dBR(e.d)}</span><span class="im-t"><b>${esc(e.desc)}</b><small>${esc(c.name)} · ${esc(e.by)}${e.pay==='bolso'?' · pagou do bolso':''} · ${esc(e.cat)}</small></span><span class="im-v fq-vals"><span><b class="${e.t==='in'?'e':'s'}">${e.t==='in'?'+':'−'}${cxMoney(e.v).replace('−','')}</b></span></span><span class="im-s">${cxChipD(e)||'<span class="soft">—</span>'}</span></div>`).join('')||'<p class="im-empty">Nenhum lançamento neste filtro.</p>';
 return fqRowsWrap(['Data','Lançamento','Valor','Situação'],rows,shown.length,lim,'lançamentos');}
const fqCxRows=u=>(S.fqCt||'lc')==='on'?fqOnRows(u):fqLcRows(u);
function fqCaixaPage(key){const u=pcuGet(key);if(!u)return '';
 const on=fqCxLine(u).map(p=>({p,st:fqStat(p).st})),lcs=u.cx?pcLcs(u):[],hasLc=!!u.cx,tab=hasLc&&on.length?(S.fqCt||(lcs.length?'lc':'on')):hasLc?'lc':'on';S.fqCt=tab;
 const live=on.filter(x=>!(x.p.rf&&x.p.rf.s==='done'&&x.p.rf.pct>=100)),by=st=>live.filter(x=>x.st===st),sum=a=>fqR(a.reduce((t,x)=>t+x.p.total,0)),fm=S.fqFm||'todas',sf=S.fqSf||'todas';
 const chip=(a,vv,l,n,cur)=>`<button class="chipf ${cur===vv?'on':''}" data-a="${a}" data-v="${vv}">${l}<small>${n}</small></button>`;
 const bal=fqR(u.in-u.out),V=u.verba||0,pend=lcs.filter(({e})=>['conferir','pend'].includes(cxStat(e))),zj=pcZj(u),prest=!!(zj&&zj.st==='concluido'&&!zj.enc),nre=lcs.filter(({e})=>cxStat(e)==='areemb').length;
 const sub=u.kind==='camp'?'Campanha · destino prometido ao doador':`${u.g}${u.closed?' · encerrado com saldo':''}${u.kind==='perm'?' · fundo permanente':' · fundo de projeto'}`;
 const acts=(prest?`<button class="btn pri" data-a="fqZEnc" data-v="${u.key}" ${pend.length?'disabled title="Faltam lançamentos a conferir"':''}>${ic('check',15,2.4)}Encerrar obra</button>`:'')+(u.kind==='proj'&&!u.closed&&!prest?`<button class="btn sec" data-a="fqVerba" data-v="${u.key}">${ic('plus',15,2.2)}Averbar</button>`:'')+(u.kind==='proj'&&!u.closed&&!prest&&hasLc?`<button class="btn sec" data-a="fqAdv" data-v="${u.key}">${ic('wallet',15,2.2)}Lançar adiantamento</button>`:'')+(fqAsaasOn()&&by('conferir').length?`<button class="btn sec" data-a="fqImpPag">${ic('upload',15)}Importar extrato do Asaas</button>`:'');
 const head=`<nav class="crumb rise"><span class="soft">Financeiro</span>${ic('chevR',13,2)}<button class="lnk back" data-a="fqCxBack">Caixas e vendas</button>${ic('chevR',13,2)}<span>${esc(u.n)}</span></nav>`+fHead(esc(u.n),sub,acts);
 const k4=(l,v,d,col)=>`<div class="k4"><span class="kl">${l}</span><span class="kv"${col?` style="color:${col}"`:''}>${v}</span><span class="kd">${d}</span></div>`;
 const kp=!hasLc?(on.length?k4('Pagamentos online',live.length,R$(sum(live)))+k4('A conferir',by('conferir').length,R$(sum(by('conferir'))),'var(--st-sol)')+k4('Conciliados com o Asaas',by('maq').length,R$(sum(by('maq')))+' · falta cair no banco')+k4('Recebidos no banco',by('banco').length,R$(sum(by('banco'))),'var(--st-int)'):'')
  :u.kind==='perm'?k4('No caixa do ministério',R$(bal),'dinheiro real')+k4('Entradas',R$(u.in),u.ini?'inclui saldo inicial de '+R$(u.ini):'receitas lançadas')+k4('Saídas',R$(u.out),u.ret?`inclui ${R$(u.ret)} devolvidos à igreja`:'despesas lançadas')+k4('A conferir',pend.length,`${R$(fqR(pend.reduce((t,{e})=>t+e.v/100,0)))} sem conferência`,pend.length?'var(--st-sol)':'')
  :k4('Verba aprovada',R$(V),'autorizada, não é dinheiro')+k4('Receitas',R$(u.in),'inscrições e vendas')+k4('Gasto',R$(u.out),'todos os caixas')+k4('Limite restante',R$(fqR(cxLimit(u.cx)/100)),cxLimit(u.cx)<0?'gasto acima do limite':(cxRecLibera(u.cx)?'verba + receitas − gasto':'verba − gasto')+(cxAdvOpen(u.cx)?' − adiantamento':''),cxLimit(u.cx)<0?'var(--st-rec)':'var(--st-int)');
 const kp2=hasLc&&u.kind==='proj'?k4('Dinheiro no caixa',R$(fqR(cxCash(u.cx)/100)),'o que está com o responsável')+k4('Adiantamento em aberto',R$(fqR(cxAdvOpen(u.cx)/100)),cxAdvLate(u.cx)?'vencido, falta prestar contas':cxAdvOpen(u.cx)?'falta prestar contas':'nenhum pendente',cxAdvLate(u.cx)?'var(--st-rec)':cxAdvOpen(u.cx)?'var(--st-sol)':''):'';
 const advs=hasLc&&u.kind==='proj'?cxAdvs(u.cx).filter(v=>v.st==='aberto'):[];
 const ped=u.cx?cxVerbas(u.cx).filter(v=>v.st==='pedida'):[],ini=u.cx&&u.cx.ini&&u.cx.ini.st==='declarado'?u.cx.ini:null;
 const tabs=hasLc&&on.length?`<div class="utabs rise" style="--d:2" role="tablist">${[['lc','Lançamentos do caixa',lcs.length],['on','Pagamentos online',on.length]].map(t=>`<button role="tab" class="${tab===t[0]?'on':''}" aria-selected="${tab===t[0]}" data-a="fqCxTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>`:'';
 if(!hasLc&&!on.length)return head+`<section class="card rise" style="--d:2"><div class="mempty"><p>Sem movimentação ainda.</p></div></section>`;
 const note=tab==='lc'?(u.kind==='perm'?'Dinheiro real do ministério. O que o líder lança já abate o saldo; aqui você confere a nota e a forma de pagamento. Quem pagou do bolso vira reembolso a pagar. Clique num lançamento para conferir.':'Verba autoriza o gasto e a despesa já é execução: o líder lança, o saldo abate e você confere a nota depois. A receita própria é usada primeiro; a verba cobre só o que faltar. Clique num lançamento para conferir.'):'Todo pagamento é conferido. O Asaas confirma a cobrança e depois o repasse cai no extrato do banco. Entrada em dinheiro, link externo ou lançada à mão não tem rastreio aqui. Clique num pagamento para ver o resumo.';
 const chips=tab==='lc'?[['todas','Todos',lcs.length],['conferir','A conferir',lcs.filter(({e})=>cxStat(e)==='conferir').length],['pend','Com pendência',lcs.filter(({e})=>cxStat(e)==='pend').length],['areemb','A reembolsar',lcs.filter(({e})=>cxStat(e)==='areemb').length]]:[['todas','Todos os status',on.length],['conferir','A conferir',by('conferir').length],['maq','Conciliados',by('maq').length],['banco','Recebidos no banco',by('banco').length]];
 const fms=['Pix','Cartão','Boleto'].filter(f=>on.some(x=>x.p.forma===f));
 return head+(kp2?`<p class="kgl rise">O que foi autorizado</p>`:'')+(kp?`<section class="card kpis4 rise" style="--d:1">${kp}</section>`:'')+(kp2?`<p class="kgl rise">O dinheiro de verdade</p><section class="card kpis4 k2 rise" style="--d:1">${kp2}</section>`:'')
 +advs.map(v=>`<p class="fi-note rise" style="--d:2">${ic(v.due&&v.due<NOWD?'alert':'wallet',15)}<span>Adiantamento de <b>${R$(v.v/100)}</b> para <b>${esc(v.who)}</b> em ${dBR(v.d)}. ${v.due&&v.due<NOWD?`<b>Venceu em ${dBR(v.due)}</b>: falta prestar contas.`:`Prestar contas até <b>${dBR(v.due)}</b>.`} <button class="btn sec sm" data-a="fqAdvOk" data-v="${u.key}|${v.id}" style="margin-left:8px">Dar baixa</button></span></p>`).join('')
 +(ini?`<p class="fi-note rise" style="--d:2">${ic('clock',15)}<span>${esc(ini.by)} declarou o <b>saldo inicial de ${R$(ini.v/100)}</b> deste ministério. Confirme se o valor confere com o que está na conta da igreja ou com o líder. <button class="btn sec sm" data-a="fqIniOk" data-v="${u.key}" style="margin-left:8px">Confirmar saldo inicial</button></span></p>`:'')
 +(prest?`<p class="fi-note rise" style="--d:2">${ic('clock',15)}<span><b>Obra concluída: prestação de contas.</b> ${pend.length?`Faltam <b>${pend.length}</b> ${pend.length===1?'lançamento a conferir':'lançamentos a conferir'} para poder encerrar a obra.`:'Tudo conferido: você já pode encerrar a obra.'}${nre?` Há ${nre} ${nre===1?'reembolso':'reembolsos'} a pagar ao líder (não bloqueia o encerramento).`:''}</span></p>`:'')
 +(u.cx&&u.cx.closeReq?`<p class="fi-note rise" style="--d:2">${ic('clock',15)}<span><b>Encerramento do caixa pedido pelo líder.</b> Está em <b>Aprovações</b> para você conferir e aprovar ou recusar. Enquanto isso o caixa não recebe lançamentos novos.</span></p>`:'')
 +(ped.length?`<p class="fi-note rise" style="--d:2">${ic('clock',15)}<span>Há ${ped.length===1?'um pedido':ped.length+' pedidos'} de verba (${R$(ped.reduce((t,v)=>t+v.v/100,0))}) aguardando você em <b>Aprovações</b>.</span></p>`:'')
 +tabs+`<p class="fi-note rise" style="--d:2">${ic('info',15)}<span>${note}</span></p>`
 +`<div class="fq-tb rise" style="--d:3"><label class="sbox">${ic('search',15)}<input data-fqq placeholder="${tab==='lc'?'Buscar lançamento ou pessoa':'Buscar pessoa'}" value="${esc(S.fqCq||'')}" autocomplete="off" aria-label="Buscar"></label>`
 +(tab==='on'?`<div class="chips">${[['todas','Todas as formas',on.length],...fms.map(f=>[f,f,on.filter(x=>x.p.forma===f).length])].map(f=>chip('fqFm',f[0],f[1],f[2],fm)).join('')}</div>`:'')
 +`<div class="chips">${chips.map(f=>chip('fqSf',f[0],f[1],f[2],sf)).join('')}</div></div><div id="fqCxL">${fqCxRows(u)}</div>`;}
if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('input',e=>{const t=e.target;if(!t||!t.matches||!t.matches('[data-fqq]'))return;S.fqCq=t.value;S.fqN=30;const u=pcuGet(S.fqCxI),w=document.getElementById('fqCxL');if(u&&w)w.innerHTML=fqCxRows(u);});
/* conferência de um lançamento do líder */
function fqLcDlg(v){const [cid,eid]=v.split('|'),c=CAIXAS.find(x=>x.id===cid),e=c&&c.entries.find(x=>x.id===eid);if(!e)return;
 const st=cxStat(e),out=e.t==='out',kv=(a,b)=>`<div class="fq-k"><span>${a}</span><b>${b}</b></div>`,unit=cxOwnerName(c);
 const steps=out?(e.pay==='bolso'?['Lançada pelo líder','Conferida','Reembolso pago']:['Lançada pelo líder','Conferida']):['Lançada pelo líder','Conciliada','Recebida no banco'],at=out?(st==='ok'||st==='reemb'||!st?steps.length-1:st==='areemb'?1:0):(st==='banco'||!st?2:st==='conc'?1:0);
 const todo=out?['conferir','pend'].includes(st):st==='conferir';
 openDlg(`${dlgHead(esc(e.desc),`${esc(unit)} · ${esc(c.name)} · ${dBR(e.d)}`)}
  <div class="fq-kvs">${kv('Valor',(out?'−':'+')+cxMoney(e.v).replace('−',''))}${kv('Lançado por',esc(e.by))}${kv('Categoria',esc(e.cat))}${out?kv('Pagou com',e.pay==='bolso'?'O bolso do líder (reembolsar)':'Dinheiro do caixa'):kv('Como entrou',esc(e.fm||'—'))}${kv('Comprovante',e.file?esc(e.file):'<span class="soft">sem comprovante</span>')}${e.why?kv('Pendência',esc(e.why)):''}</div>
  <p class="fl" style="margin:14px 0 6px">Situação</p><ol class="fq-st">${steps.map((t,i)=>`<li class="${i<=at?'on':''}"><i>${i<=at?ic('check',12,3):''}</i>${t}</li>`).join('')}</ol>
  ${todo&&out?`<label class="fld" style="margin-top:12px"><span class="fl">Motivo <small>para devolver ou recusar</small></span><textarea class="ta" id="lcWhy" rows="2" maxlength="160" placeholder="Ex.: falta a nota fiscal"></textarea></label><p class="err" id="lcErr" style="margin:4px 0 0"></p>`:''}
  <div class="dfoot">${todo&&out?'<button class="btn ghostd" id="lcNo">Recusar</button><button class="btn sec" id="lcPend">Devolver</button><button class="btn pri" id="lcOk">Aceitar</button>':todo?'<button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" id="lcRec">Confirmar recebimento</button>':'<button class="btn sec" data-a="closeDlg">Fechar</button>'}</div>`,'sm');
 if(todo&&out){const why=()=>($('#lcWhy').value||'').trim(),need=()=>{if(why())return true;$('#lcErr').textContent='Escreva o motivo.';return false;};
  $('#lcOk').onclick=()=>fqLcDo(c,e,'ok','');
  $('#lcPend').onclick=()=>{if(need())fqLcDo(c,e,'pend',why());};
  $('#lcNo').onclick=()=>{if(need())fqLcDo(c,e,'no',why());};}
 if(todo&&!out)$('#lcRec').onclick=()=>fqLcDo(c,e,'rec','');}
function fqLcDo(c,e,how,why){const unit=cxOwnerName(c),fin=m=>{closeDlg();fRe();toast(m);};
 if(how==='ok'){if(e.pay==='bolso'){const base=(typeof PAGAR!=='undefined'&&PAGAR[0])?PAGAR[0].cat:'Material',cp=CP('Reembolso · '+e.by+' · '+unit,fqAdd(NOWD,7),e.v/100,base,'',{cc:'cc1',orig:'Reembolso de caixa'});PAGAR.push(cp);e.cpid=cp.id;e.st='areemb';e.why='';return fin('Aceita · reembolso de '+cxMoney(e.v)+' criado em Contas a pagar');}
  e.st='ok';e.why='';return fin('Despesa conferida');}
 if(how==='pend'){e.st='pend';e.why=why;return fin('Devolvida ao líder com a pendência');}
 if(how==='no'){e.rev=true;e.why=why;c.entries.push({id:'ce'+(++_cxe),t:'in',v:e.v,d:myTd(),desc:'Recusada: '+e.desc,cat:'Estorno',by:'Rafael Pereira',est:true,of:e.id});return fin('Despesa recusada e fora do caixa');}
 if(how==='rec'){e.st='banco';return fin('Recebimento confirmado');}}
/* Adiantamento (07/11/2026): dinheiro real da igreja para o responsável do caixa; reserva a verba até a prestação de contas e fica fora da DRE */
const fqAddDays=(d,n)=>{const x=new Date(d+'T12:00');x.setDate(x.getDate()+n);return x.toISOString().slice(0,10);};
function fqAdvForm(key){const u=pcuGet(key);if(!u||!u.cx)return;const c=u.cx,days=cxPar('cashboxes.advance.settleDays')||30;
 if(cxAdvLate(c)){toast('Há adiantamento vencido neste caixa: dê baixa antes de lançar outro');return;}
 openDlg(`${dlgHead('Lançar adiantamento',esc(u.n)+' · limite restante '+R$(cxLimit(c)/100))}<form id="adF" class="fgrid" novalidate>
  <label class="fld wide fi-val"><span class="fl">Valor</span><span class="fi-amt"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00" autocomplete="off"></span><span class="err"></span></label>
  <label class="fld wide"><span class="fl">Quem recebe o dinheiro</span><input name="who" maxlength="60" autocomplete="off" placeholder="Ex.: Diego Martins"><span class="err"></span></label>
  <p class="who wide" style="margin:0">O dinheiro sai da igreja para o responsável e fica reservado na verba até ele prestar contas, em até ${days} dias. Não é receita nem despesa e não aparece na DRE.</p>
  <div class="dfoot wide"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Lançar adiantamento</button></div></form>`,'sm');
 const f=$('#adF'),bad=(n,m)=>{const i=f.elements[n],fl=i.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=m;i.focus();};
 f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();const v=pVal(f.v.value);if(!(v>0))return bad('v','Informe um valor maior que zero');if(!f.who.value.trim())return bad('who','Diga quem recebe');
  if(cxLimited(c)&&Math.round(v*100)>cxLimit(c)&&cxOverMode()==='block')return bad('v','O limite restante é '+R$(Math.max(0,cxLimit(c))/100)+'. Aprove um reforço de verba antes');
  cxAdvs(c).push({id:'ad'+Date.now(),v:Math.round(v*100),d:NOWD,by:'Rafael Pereira',who:f.who.value.trim(),due:fqAddDays(NOWD,days),st:'aberto',used:0});closeDlg();fRe();toast('Adiantamento de '+R$(v)+' lançado para '+f.who.value.trim());});}
/* Averbação: o financeiro autoriza a verba de um evento ou obra sem entrar no caixa deles */
function fqVerbaForm(pre){pcUnits();const L=CAIXAS.filter(x=>x.main&&cxKind(x)==='proj'&&x.status!=='encerrado'&&!(x.ownerType==='evt'&&((eById(x.ownerId)||{}).kind==='culto'))).sort((a,b)=>cxOwnerName(a).localeCompare(cxOwnerName(b)));
 if(!L.length){toast('Nenhum evento ou obra aberto para averbar');return;}
 openDlg(`${dlgHead('Nova averbação','Autoriza o gasto de um evento ou de uma obra. Não é receita nem despesa e não aparece na DRE.')}<form id="vbF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Evento ou obra</span>${selw('cx',L.map(x=>`<option value="${x.id}" ${pre&&(x.ownerType+'|'+x.ownerId)===pre?'selected':''}>${cxOwnerKind(x)} · ${esc(cxOwnerName(x))}</option>`).join(''))}</label>
  <label class="fld wide fi-val"><span class="fl">Valor da verba</span><span class="fi-amt"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00" autocomplete="off"></span></label>
  <label class="fld wide"><span class="fl">Observação <small>opcional</small></span><input name="why" maxlength="120" autocomplete="off" placeholder="Ex.: orçamento aprovado em reunião"></label>
  <p class="who wide" style="margin:0">Aprova na hora, porque quem averba é o financeiro. A verba só cobre o que o próprio projeto não arrecadar. O que não for usado expira no encerramento.</p>
  <div class="dfoot wide"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="vbOk" disabled>Averbar</button></div></form>`,'sm');
 const f=$('#vbF'),ok=$('#vbOk');f.addEventListener('input',()=>{ok.disabled=!(pVal(f.v.value)>0);});
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const x=CAIXAS.find(y=>y.id===f.cx.value),v=pVal(f.v.value);cxVerbaAdd(x,v,NOWD,'Rafael Pereira','aprovada',f.why.value.trim());closeDlg();fRe();toast('Verba de '+R$(v)+' aprovada para '+cxOwnerName(x));});}
function cxVerbaDecide(a,st){if(a.zjob&&typeof zJob==='function'){const j=zJob(a.zjob);if(j&&st==='aprovada')zApproved(j,a.v,'Financeiro',NOWD);if(j&&st==='recusada')zRejected(j,a.reason);return;}const c=CAIXAS.find(x=>x.id===a.cxid),v=c&&cxVerbas(c).find(y=>y.id===a.vid);if(v){v.st=st;v.appr=st==='aprovada'?'Rafael Pereira':'';}}
function fqPayDlg(id){const p=fqPays().find(x=>x.id===id);if(!p)return;const st=fqStat(p).st,sx=FQST[p.id]||{},tx=sx.taxa!=null?sx.taxa:fqPayTaxa(p),lq=sx.liq!=null?sx.liq:fqR(p.total-tx),conc=st!=='conferir';
 const steps=['Cobrança registrada','Conciliada com o Asaas','Recebida no banco'],at=st==='conferir'?0:st==='maq'?1:2,kv=(a,b)=>`<div class="fq-k"><span>${a}</span><b>${b}</b></div>`;
 openDlg(`${dlgHead(esc(p.quem),`${esc(p.caixa)} · ${dBR(p.date)}`)}
  <div class="fq-kvs">${kv('Origem',p.tipo+' · '+esc(p.destino))}${kv('Forma de pagamento',p.forma)}${kv('Valor pago',R$(p.total))}${conc?kv('Taxa do Asaas',`−${R$(tx)}`)+kv('Valor a receber',R$(lq))+kv('Repasse previsto',dBR(fqPayRep(p))):''}</div>
  <p class="fl" style="margin:14px 0 6px">Status financeiro</p><ol class="fq-st">${steps.map((t,i)=>`<li class="${i<=at?'on':''}"><i>${i<=at?ic('check',12,3):''}</i>${t}</li>`).join('')}</ol>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>`,'sm');}

/* ---- Pagamentos online (Asaas): doações com link do Alva e inscrições de evento (06/11/2026) ----
   Só o que tem identificador do provedor se concilia. Link externo, anônimo sem rastreio e dinheiro: "sem rastreio".
   Extrato do Asaas (Importar e conciliar) liga cada cobrança a uma doação ou inscrição; o repasse do Asaas é baixado no extrato do banco. */
PLANO.push(PLA('2.03','Taxas de pagamento online','ded','s','rosado'));FCATS['Taxas de pagamento online']=['rosado','s'];CPISENTA.add('Taxas de pagamento online');
/* inscrições anteriores a 24/09 (já conferidas): dão volume às listas de evento (um retiro tem centenas de inscritos) */
const FQNH=['João','Paulo','Rogério','Carlos','André','Marcos','Lucas','Tiago','Daniel','Felipe','Rafael','Gustavo','Eduardo','Samuel','Pedro','Mateus','Henrique','Ricardo','Fábio','Sérgio'],FQNX=['Luciana','Marta','Ana','Beatriz','Camila','Débora','Elisa','Fernanda','Gabriela','Helena'],FQS1=['Silva','Souza','Oliveira','Santos','Lima','Pereira','Costa','Ribeiro','Almeida','Carvalho','Gomes','Martins','Araújo','Rocha','Barbosa'],FQS2=['Neto','Dias','Reis','Prado','Moraes','Teixeira','Nunes','Freitas','Cardoso','Mendes','Vieira','Lopes'];
function fqOldIns(){const L=[];[['Retiro de Jovens 2026',180,98,FQNH.concat(FQNX)],['Conferência Missões',95,94,FQNH.concat(FQNX,FQNX)]].forEach(([dest,val,n,nm],k)=>{for(let i=0;i<n;i++)L.push({id:'in:o'+k+'-'+i,destino:dest,caixa:dest,quem:`${nm[(i*7+k)%nm.length]} ${FQS1[(i*5+k)%FQS1.length]} ${FQS2[(i*3+i%4)%FQS2.length]}`,date:fqAdd('2026-08-03',(i*11+k*5)%49),total:val,forma:['Pix','Pix','Cartão',k?'Boleto':'Pix','Pix'][i%5],...(i%37===5?{rf:{s:'done',pct:100,d:fqAdd(fqAdd('2026-08-03',(i*11+k*5)%49),6)}}:{})});});return L;}
const FQINS=[
 {id:'in:1',destino:'Retiro de Jovens 2026',caixa:'Retiro de Jovens 2026',quem:'João Batista Rocha',date:'2026-09-24',total:180,forma:'Pix'},
 {id:'in:2',destino:'Retiro de Jovens 2026',caixa:'Retiro de Jovens 2026',quem:'Paulo Henrique Dias',date:'2026-09-25',total:180,forma:'Cartão'},
 {id:'in:3',destino:'Retiro de Jovens 2026',caixa:'Retiro de Jovens 2026',quem:'Rogério Alves Neto',date:'2026-09-26',total:180,forma:'Pix',rf:{s:'req',pct:100}},
 {id:'in:4',destino:'Conferência Missões',caixa:'Conferência Missões',quem:'Luciana Prado',date:'2026-09-27',total:95,forma:'Boleto',rf:{s:'done',pct:100,d:'2026-09-29'}},
 {id:'in:5',destino:'Conferência Missões',caixa:'Conferência Missões',quem:'Marta Oliveira Reis',date:'2026-09-28',total:95,forma:'Pix',rf:{s:'done',pct:50,d:'2026-09-30'}},
 {id:'in:6',destino:'Retiro de Jovens 2026',caixa:'Retiro de Jovens 2026',quem:'Davi Souza Lima',date:'2026-09-29',total:180,forma:'Pix'}];
const FQCAMPCC={'Retiro de Jovens 2026':'cc6','Reforma do Templo':'cc9','Missões 2026':'cc8','Natal Solidário':'cc1'};
const fqAsaasOn=()=>typeof CN_LIST!=='undefined'?CN_LIST.some(c=>c.cap==='Pagamento'&&c.on):true;
const fqTraceable=c=>c.lt==='person'||(c.lt==='fixed'&&c.src==='alva');
let _fqp=null;
function fqPays(){if(_fqp)return _fqp;const L=[];
 CAMPS.forEach(c=>{if(!fqTraceable(c))return;c.donors.forEach((d,i)=>{if(d[6])return;L.push({id:'dn:'+c.id+':'+i,tipo:'Doação',destino:c.n,caixa:c.n,quem:d[0]==='Anônimo'?'Anônimo (link fixo)':d[0],date:d[2],total:d[1],forma:d[3]==='PIX'?'Pix':d[3],cc:FQCAMPCC[c.n]||'cc1',cat:'Doações'});});});
 FQINS.concat(fqOldIns()).forEach(p=>L.push({...p,tipo:'Inscrição',cat:'Inscrições',cc:'cc6'}));
 _fqp=L.sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:a.id<b.id?-1:1).map((p,i)=>({...p,i}));return _fqp;}
const fqPayTaxa=(p,total)=>{const t=total==null?p.total:total;return p.forma==='Cartão'?fqR(t*.0299+.49):1.99;};
const fqPayRep=p=>fqAdd(p.date,p.forma==='Cartão'?31:p.forma==='Boleto'?2:1);
function fqDonSt(c,i){const d=c.donors[i];if(!d||d[6]||!fqTraceable(c))return null;return fqStat({id:'dn:'+c.id+':'+i,date:d[2]}).st;}
const fqDonChip=(c,i)=>{const st=fqDonSt(c,i);return st?' '+fqChip(st,'Online'):(c.lt==='fixed'&&c.src==='ext'?' <small class="soft">sem rastreio</small>':'');};
function fqAnalyzePag(I){I.adq='Asaas';const rows=[],mkq=(b,st,x={})=>({...b,st,actions:IMACT[st],act:IMDEF[st],...x});
 const P=fqPays().filter(p=>p.date>='2026-09-24'&&!(p.rf&&p.rf.s==='done'));
 P.forEach((p,j)=>{const s=fqStat(p),tx=fqPayTaxa(p),org=p.quem,
  base={id:'q'+rows.length,sid:p.id,d:p.date,time:'',aut:'',maqId:'asaas',cc:p.cc,alva:p.total,bruto:p.total,taxa:tx,liq:fqR(p.total-tx),prev:dBR(fqPayRep(p)).slice(0,5),lbl:`${p.tipo} · ${p.destino} · ${p.forma}`};
  if(s.st!=='conferir')return rows.push(mkq({...base,bruto:s.bruto,taxa:s.taxa,liq:s.liq},'mja',{msg:`${org}. Já foi conciliada antes.`}));
  if(j===1)return rows.push(mkq({...base,bruto:null,taxa:null,liq:null,prev:''},'mvl',{msg:`${org}. O Alva registrou o pagamento, mas ele não veio no extrato do Asaas. Continua a conferir.`}));
  rows.push(mkq(base,'mcasa',{msg:`${org}. Bate com a cobrança do Asaas (mesmo valor e dia).`}));});
 if(P.length>=3){const t=1.99;rows.push(mkq({id:'q'+rows.length,sid:null,d:'2026-09-26',time:'',aut:'',maqId:'asaas',cc:'cc1',alva:null,bruto:90,taxa:t,liq:fqR(90-t),prev:'28/09',lbl:'Cobrança avulsa · Pix'},'msv',{msg:'Cobrança do Asaas sem doação ou inscrição no Alva. Confira com o provedor.'}));}
 return rows.sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0).map((r,i)=>({...r,id:'q'+i}));}
function fqFilePag(I){I.adq='Asaas';const n=fqPays().filter(p=>p.date>='2026-09-24'&&fqStat(p).st==='conferir').length;
 return `<div class="fi-io rise" style="--d:2"><section class="card fi-imp"><h2>${ic('link',16)} Extrato do Asaas</h2>
  <p class="fl">1. Provedor</p>${selw('fqa','<option>Asaas</option>')}
  <p class="fl">2. Arquivo</p>${I.file?`<div class="ct-file"><span class="mt-ft" style="--s:38px;height:38px;border-radius:10px;background:var(--st-sol-bg);color:var(--st-sol)">CSV</span><span class="dkt"><b>${esc(I.file)}</b><span>Asaas · ${n} pagamentos online para conferir</span></span><button class="ibtn sm" data-a="imFileX" aria-label="Remover">${ic('x',13)}</button></div>`:`<div class="ct-drop" data-a="imPickFile">${ic('upload',18)}<span><b>Arraste o arquivo aqui ou clique para escolher</b><small>CSV exportado do painel do Asaas</small></span></div>`}
  <p class="who im-sim">${ic('info',13,2)}Neste protótipo o conteúdo do arquivo não é lido: mostramos um exemplo montado com as doações e inscrições pagas online.</p>
  <div class="fi-impf"><button class="btn sec" data-a="imBack">Voltar</button><button class="btn pri" data-a="imRead" ${I.file?'':'disabled'}>Ler e revisar</button></div></section>
  <aside class="card fi-exp"><h2>Como a conciliação funciona</h2><ul class="im-bul"><li>Cada cobrança paga é ligada a uma <b>doação</b> (link do Alva) ou a uma <b>inscrição</b> pelo identificador do pagamento.</li><li>Você vê o valor pago, a <b>taxa do Asaas</b> e o <b>valor a receber</b>, com a data do repasse.</li><li>Doação por link externo, anônima sem rastreio e dinheiro <b>não entram aqui</b>: o Alva não sabe que existiram.</li><li>Nada entra no saldo. O dinheiro só entra quando o repasse do Asaas for conciliado no extrato do banco.</li></ul></aside></div>`;}

/* ---------- Aprovações › Conciliação (07/11/2026) ----------
   O job de conciliação confere as cobranças da adquirente com as vendas do módulo.
   Com identificador do pagamento, ou com um único candidato em maquininha de módulo, vincula sozinho (sem avisar).
   Maquininha da igreja (módulo Financeiro): TODA cobrança é dízimo ou oferta; o Alva só SUGERE o destino (o culto do
   horário) e o Admin confirma, uma por vez. O que não tem par vira exceção, e toda exceção tem saída:
   vincular à mão, lançar/classificar ou ignorar (com motivo). Só sugestões e exceções entram na contagem. Exemplos: dados de teste. */
const FQCULTOS=['Culto de domingo · manhã','Culto de domingo · noite','Culto de quarta · noite'];
const FQCS=[
 {id:'cs1',store:'fin',date:'2026-09-27',time:'09:48',total:50,modal:'Débito',par:1,band:'Visa',aut:'480610',culto:'Culto de 27/09 · manhã'},
 {id:'cs2',store:'fin',date:'2026-09-27',time:'09:52',total:120,modal:'Crédito',par:1,band:'Mastercard',aut:'480611',culto:'Culto de 27/09 · manhã'},
 {id:'cs3',store:'fin',date:'2026-09-27',time:'10:03',total:30,modal:'Débito',par:1,band:'Elo',aut:'480612',culto:'Culto de 27/09 · manhã'},
 {id:'cs4',store:'fin',date:'2026-09-27',time:'19:41',total:60,modal:'Crédito',par:3,band:'Visa',aut:'480613',culto:'Culto de 27/09 · noite'},
 {id:'cs5',store:'fin',date:'2026-09-22',time:'14:20',total:100,modal:'Débito',par:1,band:'Visa',aut:'478802',st:'no',why:'sem culto'}];
const FQCX={};/* saída das exceções fixas: {st:'ign'|'link', why, sale, it} */
const FQCHURCH='Igreja · Dízimos e ofertas';
function fqExc(){const v=fqSales()[1],o=v&&fqMaqOf(v);
 const base=[
  {id:'ce1',kind:'Cobrança sem venda',store:'cafe',date:'2026-09-27',time:'18:42',total:47,modal:'Crédito',par:1,band:'Visa',aut:'489901',mq:(FQMAQ[0]||{}).n||'',msg:'A maquininha cobrou e o módulo não tem venda neste horário e valor.',acts:['link','ign']},
  v?{...v,id:'ce2',kind:'Venda sem cobrança',mq:o?o.maq.n:'',msg:'A venda está no cartão, mas não veio cobrança da maquininha. Pode ter sido paga de outro jeito ou não aprovada.',acts:['ign']}:null].filter(Boolean).filter(x=>!FQCX[x.id]);
 const igr=FQCS.filter(c=>c.st==='no').map(c=>({...c,kind:c.why==='sem culto'?'Cobrança da igreja sem culto no horário':'Destino recusado',mq:FQCHURCH,msg:c.why==='sem culto'?'Nenhum culto ou evento da igreja naquele horário. Escolha o culto ou classifique como oferta avulsa.':'O culto sugerido não era esse. Escolha o culto ou classifique como oferta avulsa.',acts:['culto','avulsa','ign']}));
 return [...base,...igr];}
const fqIgn=()=>[...Object.entries(FQCX).filter(([k,x])=>x.st==='ign').map(([k,x])=>({...x.it,why2:x.why,key:k})),...FQCS.filter(c=>c.st==='ign').map(c=>({...c,why2:c.igWhy,key:c.id}))];
const fqConcN=()=>FQCS.filter(c=>!c.st).length+fqExc().length;
const fqCttl=c=>`${c.store==='fin'?'Dízimos e ofertas':FQMODN[c.store]||'—'} · ${fqLbl(c)} · aut. ${c.aut}`;
const fqCvals=c=>{const tx=fqTaxa(c);return `<span>Valor <b>${R$(c.total)}</b></span><span>Taxa <b>−${R$(tx)}</b></span><span>Recebe <b>${R$(fqR(c.total-tx))}</b></span>`;};
const fqCrow=(c,sub,act)=>`<div class="cc-r"><span class="cc-d">${dBR(c.date).slice(0,5)}<small>${c.time}</small></span><span class="cc-t"><b>${esc(fqCttl(c))}</b><small>${sub}</small></span><span class="cc-v">${fqCvals(c)}</span><span class="cc-a">${act}</span></div>`;
const CC_BTN={link:id=>`<button type="button" class="btn sec sm" data-a="ccLink" data-v="${id}">Vincular a uma venda…</button>`,culto:id=>`<button type="button" class="btn sec sm" data-a="ccCulto" data-v="${id}">Escolher o culto…</button>`,avulsa:id=>`<button type="button" class="btn sec sm" data-a="ccAvulsa" data-v="${id}">Oferta avulsa</button>`,ign:id=>`<button type="button" class="btn ghostd sm" data-a="ccIgn" data-v="${id}">Ignorar</button>`};
function fqConcRender(){
 const sug=FQCS.filter(c=>!c.st),exc=fqExc(),ign=fqIgn(),aut=[...fqSales().filter(v=>(FQST[v.id]||{}).how&&FQST[v.id].st==='maq').map(v=>({c:v,how:FQST[v.id].how,mq:(fqMaqOf(v)||{maq:{n:''}}).maq.n,id:v.id})),...FQCS.filter(c=>c.st==='ok').map(c=>({c,how:'conf',mq:FQCHURCH+(c.culto?' · '+c.culto:''),id:c.id}))];
 const HOW={id:'Pelo identificador do pagamento',aprox:'Por aproximação: único candidato',conf:'Confirmada por Rafael Pereira',manual:'Vinculada por Rafael Pereira'};
 const blk=(title,n,hint,body,empty,extra='')=>`<section class="card cc-b rise" style="--d:3"><header><span class="dkt"><b>${title}</b><span>${hint}</span></span><span class="cc-n">${n}</span>${extra}</header>${body||`<p class="cc-e">${empty}</p>`}</section>`;
 return `<p class="fi-note rise" style="--d:2">${ic('link',15)}<span>O Alva confere sozinho as cobranças das maquininhas. O que tem identificador ou um único candidato é vinculado sem avisar. Na maquininha da igreja, toda cobrança é dízimo ou oferta: o Alva sugere o culto do horário e você confirma. Tudo o que não tem par tem saída: vincular, classificar ou ignorar com motivo. <b>Só sugestões e exceções entram na contagem.</b></span></p>
 <div class="fi-aps">
 ${blk('Sugestões',sug.length,'Maquininha da igreja: o Alva liga a cobrança ao culto do horário e a classifica como oferta. Confirme ou escolha outro destino.',sug.map(c=>fqCrow(c,`${FQCHURCH} · sugestão: lançar como <b>Oferta do ${esc(c.culto)}</b>, centro de custo Cultos`,`<button type="button" class="btn ghostd sm" data-a="ccNo" data-v="${c.id}">Outro destino</button><button type="button" class="btn pri sm" data-a="ccOk" data-v="${c.id}">${ic('check',14,2.4)}Confirmar</button>`)).join(''),'Nenhuma sugestão esperando.',sug.length>1?`<button type="button" class="btn pri sm" data-a="ccAll">${ic('check',14,2.4)}Confirmar todas (${sug.length})</button>`:'')}
 ${blk('Exceções',exc.length,'Sem par. Cada uma tem saída: vincular à mão, classificar ou ignorar com um motivo.',exc.map(c=>fqCrow(c,`<b>${esc(c.kind)}</b> · ${esc(c.mq)}. ${esc(c.msg)}`,(c.acts||[]).map(a=>CC_BTN[a](c.id)).join(''))).join(''),'Nenhuma exceção.')}
 ${blk('Vinculadas automaticamente',aut.length,'O Alva vinculou sozinho (ou você confirmou). Não precisa de aprovação; dá para desfazer.',aut.map(x=>fqCrow(x.c,`${esc(x.mq)} · ${HOW[x.how]||''}`,`<button type="button" class="btn sec sm" data-a="ccUndo" data-v="${x.id}">Desfazer</button>`)).join(''),'Nada vinculado ainda.')}
 ${ign.length?blk('Ignoradas',ign.length,'Ficam guardadas com o motivo. Não contam como pendência.',ign.map(c=>fqCrow(c,`<b>${esc(c.kind)}</b> · motivo: ${esc(c.why2||'—')}`,`<button type="button" class="btn sec sm" data-a="ccUnIgn" data-v="${c.key}">Desfazer</button>`)).join(''),''):''}
 </div>`;}
const fqAprTabs=k=>`<div class="utabs rise" style="--d:2" role="tablist">${[['l','Lançamentos',apList('l').length],['i','Importações',apList('i').length],['c','Conciliação',fqConcN()]].map(t=>`<button role="tab" class="${k===t[0]?'on':''}" aria-selected="${k===t[0]}" data-a="apTab" data-v="${t[0]}">${t[1]}${t[2]?`<span class="cnt">${t[2]}</span>`:''}</button>`).join('')}</div>`;

const fqPg=I=>I.type==='maq'||I.type==='pag';
/* ---- Cadastro: Contas financeiras › Maquininhas e Totens ---- */
const fqAct=k=>k==='m'?`<button class="btn pri" data-a="fqMaqNew">${ic('plus',15,2.2)}Nova maquininha</button>`:k==='t'?`<button class="btn pri" data-a="fqTotNew">${ic('plus',15,2.2)}Novo totem</button>`:`<button class="btn sec" data-a="fTransf">${ic('swap',15)}Transferir</button><button class="btn pri" data-a="fcNew">${ic('plus',15,2.2)}Nova conta</button>`;
function fqMaqTab(){
 const note=`<p class="fi-note rise" style="--d:2">${ic('info',15)}<span><b>Opcional.</b> As maquininhas servem para saber de onde veio cada venda no cartão e conferir o que a adquirente repassa. Quem não concilia cartões continua só subindo o extrato do banco, como sempre.</span></p>`;
 if(!FQMAQ.length)return note+`<section class="card cm-done rise" style="--d:3"><span class="cm-ok">${ic('wallet',30,2)}</span><h2>Nenhuma maquininha cadastrada</h2><p>Cadastre as máquinas de cada módulo para conciliar as vendas no cartão.</p><button class="btn pri" data-a="fqMaqNew">${ic('plus',15,2.2)}Nova maquininha</button></section>`;
 return note+`<section class="card mtab rise" style="--d:3"><div class="fq-r thead"><span>Maquininha</span><span>Adquirente</span><span>Módulo e centro</span><span>Conta</span><span></span></div>${FQMAQ.map(m=>{const nt=FQTOT.filter(t=>t.maq===m.id).length;return `<div class="fq-r"><span><b>${esc(m.n)}</b><small>Estabelecimento ${esc(m.est)}${nt?` · ${nt} ${nt===1?'totem':'totens'}`:''}</small></span><span>${esc(m.adq)}</span><span>${FQMODM[m.mod]}<small>${esc(fqCcN(m.cc))}</small></span><span>${esc(m.conta)}</span><span class="fq-a"><button class="btn sec sm" data-a="fqMaqEdit" data-v="${m.id}">${ic('pen',14)}Editar</button><button class="btn sec sm" data-a="fqMaqDel" data-v="${m.id}" aria-label="Excluir ${esc(m.n)}">${ic('x',14)}</button></span></div>`;}).join('')}</section>`;}
function fqTotTab(){
 const note=`<p class="fi-note rise" style="--d:2">${ic('info',15)}<span><b>Opcional.</b> O código do terminal e o do cardápio (o centro de custo no sistema do totem) vêm em cada venda. Aqui você liga os dois ao módulo e ao centro de custo do Alva. Loja não precisa de totem: só de maquininha.</span></p>`;
 if(!FQTOT.length)return note+`<section class="card cm-done rise" style="--d:3"><span class="cm-ok">${ic('building',30,2)}</span><h2>Nenhum totem cadastrado</h2><p>Cadastre os totens da cafeteria e do restaurante para saber de onde veio cada venda.</p><button class="btn pri" data-a="fqTotNew">${ic('plus',15,2.2)}Novo totem</button></section>`;
 return note+`<section class="card mtab rise" style="--d:3"><div class="fq-r thead"><span>Totem</span><span>Cardápio e provedor</span><span>Módulo e centro</span><span>Maquininha</span><span></span></div>${FQTOT.map(t=>{const m=fqMq(t.maq);return `<div class="fq-r"><span><b>${esc(t.n)}</b><small>Terminal ${esc(t.term)}</small></span><span>${esc(t.card)}<small>${esc(t.prov||'')}</small></span><span>${FQMODN[t.mod]}<small>${esc(fqCcN(t.cc))}</small></span><span>${m?esc(m.n):'<span class="soft">Nenhuma</span>'}</span><span class="fq-a"><button class="btn sec sm" data-a="fqTotEdit" data-v="${t.id}">${ic('pen',14)}Editar</button><button class="btn sec sm" data-a="fqTotDel" data-v="${t.id}" aria-label="Excluir ${esc(t.n)}">${ic('x',14)}</button></span></div>`;}).join('')}</section>`;}
function fqMaqForm(id){const ed=id?fqMq(id):null,bank=FCONTAS.filter(c=>c.tipo==='Conta bancária'),m0=ed?ed.mod:'cafe';
 openDlg(`${dlgHead(ed?'Editar maquininha':'Nova maquininha','Cada maquininha é de um só módulo e usa o centro de custo dele. A da igreja, de dízimos e ofertas, é do módulo Financeiro. O código do estabelecimento é o que vem no extrato do adquirente.')}<form id="fqF" class="fgrid fq-f" novalidate>
  <label class="fld wide"><span class="fl">Apelido</span><input name="n" value="${esc(ed?ed.n:'')}" placeholder="Ex.: Cafeteria · máquina 4" maxlength="40" autocomplete="off"></label>
  <label class="fld wide"><span class="fl">Adquirente</span>${selw('adq',FQADQ.map(a=>`<option ${ed&&ed.adq===a?'selected':''}>${a}</option>`).join(''))}</label>
  <label class="fld wide"><span class="fl">Código do estabelecimento</span><input name="est" value="${esc(ed?ed.est:'')}" placeholder="Ex.: MP-770124" maxlength="20" autocomplete="off"></label>
  <label class="fld"><span class="fl">Módulo</span>${selw('mod',Object.entries(FQMODM).map(([k,n])=>`<option value="${k}" ${k===m0?'selected':''}>${n}</option>`).join(''))}</label>
  <label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC(ed?ed.cc:FQCC[m0]))}</label>
  <label class="fld wide"><span class="fl">Conta do banco que recebe o repasse</span>${selw('conta',bank.map(c=>`<option ${ed&&ed.conta===c.n?'selected':''}>${esc(c.n)}</option>`).join(''))}</label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${ed?'Salvar':'Cadastrar maquininha'}</button></div></form>`,'sm');
 const f=$('#fqF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!(f.n.value.trim()&&f.est.value.trim());};
 f.addEventListener('input',chk);f.addEventListener('change',chk);chk();
 f.mod.addEventListener('change',()=>{f.cc.value=FQCC[f.mod.value];});
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const est=f.est.value.trim();
  if(FQMAQ.some(m=>m.id!==id&&norm(m.est)===norm(est)))return toast('Já existe uma maquininha com esse código de estabelecimento');
  const o={n:f.n.value.trim(),adq:f.adq.value,est,mod:f.mod.value,cc:f.cc.value,conta:f.conta.value};
  if(ed){Object.assign(ed,o);FQTOT.forEach(t=>{if(t.maq===ed.id&&t.mod!==ed.mod)t.maq='';});}else FQMAQ.push({id:'mq'+(++_fqm),...o});
  closeDlg();fRe();toast(ed?'Maquininha atualizada':'Maquininha cadastrada');});}
function fqTotForm(id){const ed=id?FQTOT.find(t=>t.id===id):null,m0=ed?ed.mod:'cafe';
 const mo=(mod,sel)=>'<option value="">Nenhuma</option>'+FQMAQ.filter(m=>m.mod===mod).map(m=>`<option value="${m.id}" ${m.id===sel?'selected':''}>${esc(m.n)}</option>`).join('');
 openDlg(`${dlgHead(ed?'Editar totem':'Novo totem','Liga o terminal e o cardápio do provedor ao módulo e ao centro de custo do Alva.')}<form id="fqF" class="fgrid fq-f" novalidate>
  <label class="fld wide"><span class="fl">Apelido</span><input name="n" value="${esc(ed?ed.n:'')}" placeholder="Ex.: Totem 4 · Cafeteria" maxlength="40" autocomplete="off"></label>
  <label class="fld wide"><span class="fl">Provedor do totem</span>${selw('prov',(CN_PROV.Comércio||[]).map(p=>`<option ${ed&&ed.prov===p?'selected':''}>${esc(p)}</option>`).join(''))}</label>
  <label class="fld"><span class="fl">Código do terminal</span><input name="term" value="${esc(ed?ed.term:'')}" placeholder="Ex.: T-CAF-04" maxlength="20" autocomplete="off"></label>
  <label class="fld"><span class="fl">Código do cardápio</span><input name="card" value="${esc(ed?ed.card:'')}" placeholder="Ex.: CARD-CAF" maxlength="20" autocomplete="off"></label>
  <label class="fld"><span class="fl">Módulo</span>${selw('mod',Object.entries(FQMODN).filter(([k])=>k!=='shop').map(([k,n])=>`<option value="${k}" ${k===m0?'selected':''}>${n}</option>`).join(''))}</label>
  <label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC(ed?ed.cc:FQCC[m0]))}</label>
  <label class="fld wide"><span class="fl">Maquininha do totem <small>opcional</small></span>${selw('maq',mo(m0,ed?ed.maq:''))}</label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${ed?'Salvar':'Cadastrar totem'}</button></div></form>`,'sm');
 const f=$('#fqF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!(f.n.value.trim()&&f.term.value.trim()&&f.card.value.trim());};
 f.addEventListener('input',chk);f.addEventListener('change',chk);chk();
 f.mod.addEventListener('change',()=>{f.cc.value=FQCC[f.mod.value];f.maq.innerHTML=mo(f.mod.value,'');});
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const term=f.term.value.trim();
  if(FQTOT.some(t=>t.id!==id&&norm(t.term)===norm(term)))return toast('Já existe um totem com esse código de terminal');
  const o={n:f.n.value.trim(),term,prov:f.prov.value,card:f.card.value.trim(),mod:f.mod.value,cc:f.cc.value,maq:f.maq.value};
  if(ed)Object.assign(ed,o);else FQTOT.push({id:'tt'+(++_fqm),...o});
  closeDlg();fRe();toast(ed?'Totem atualizado':'Totem cadastrado');});}
function fqMaqDel(id){const m=fqMq(id);if(!m)return;
 if(FQREC.some(x=>x.maq===id)||Object.values(FQST).some(s=>s.maq===id))return toast('Esta maquininha já tem vendas conciliadas: não dá para excluir.');
 confirmDel({title:`Excluir ${m.n}?`,body:'Os totens ligados a ela ficam sem maquininha.',label:'Excluir',onConfirm:()=>{FQMAQ.splice(FQMAQ.indexOf(m),1);FQTOT.forEach(t=>{if(t.maq===id)t.maq='';});fRe();toast('Maquininha excluída');}});}
function fqTotDel(id){const t=FQTOT.find(x=>x.id===id);if(!t)return;
 confirmDel({title:`Excluir ${t.n}?`,body:'As vendas já feitas não mudam. Novas vendas desse terminal ficam sem origem até o totem ser cadastrado de novo.',label:'Excluir',onConfirm:()=>{FQTOT.splice(FQTOT.indexOf(t),1);fRe();toast('Totem excluído');}});}

/* ---------- Contas financeiras ---------- */
const fPendConta=(c,i)=>LANCS.filter(l=>l.st==='pend'&&(l.acc?l.acc===c.n:i===0)).length;
const fApply=l=>{if(l&&(l.tr||l.imp)){const c=FCONTAS.find(x=>x.n===l.acc);if(c)c.atual+=l.tipo==='e'?l.v:-l.v;}};
function fCon(){
 if(S.fcx!=null&&FCONTAS[S.fcx])return fExtrato(S.fcx);
 const fk=S.fck||'c';
 return fHead('Contas financeiras','Onde está o dinheiro da igreja',fqAct(fk))
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Saldo total</span><span class="kv">${R$(fSaldo())}</span><span class="kd">somando todas as contas</span></div><div class="k4"><span class="kl">Contas ativas</span><span class="kv">${FCONTAS.length}</span><span class="kd">bancárias, caixas e carteiras</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv">${APROVS.length}</span><span class="kd">ainda não contam no saldo</span></div></section>
 ${sxSeg('fckT',[['c','Contas',FCONTAS.length],['m','Maquininhas',FQMAQ.length],['t','Totens',FQTOT.length]],fk)}
 ${fk==='m'?fqMaqTab():fk==='t'?fqTotTab():`<div class="fc-grid rise" style="--d:2">${FCONTAS.map((c,i)=>{const pn=fPendConta(c,i),tot=fSaldo(),pc=tot>0?Math.round(Math.max(0,c.atual)/tot*100):0;return `<article class="card fc-acc"><header><span class="fc-ai ${c.banco?'b':'c'}">${ic(c.banco?'building':'wallet',18,2)}</span><span class="fc-an"><b>${esc(c.n)}</b><small>${esc(c.tipo)}${c.banco?' · '+esc(c.banco):''}${c.prov?' · '+esc(c.prov):''}</small></span>${pn?`<span class="stp" style="--c:var(--st-sol);--b:var(--st-sol-bg)"><i></i>${pn} pendente${pn===1?'':'s'}</span>`:''}</header>
  <div class="fc-av"><b>${R$(c.atual)}</b><small>${c.cart?'disponível · ':''}${pc}% do saldo total</small></div><span class="fc-bar"><i style="width:${pc}%"></i></span>
  ${(()=>{if(!c.cart)return '';const l=fqLib(c);return `<p class="fc-lib"><span>A liberar <b>${R$(l.v)}</b>${l.n?` · ${l.n} ${l.n===1?'parcela':'parcelas'}`:''}</span>${l.d?`<span>Próxima liberação <b>${dBR(l.d).slice(0,5)}</b></span>`:'<span class="soft">Nada a liberar</span>'}</p><p class="fc-aut">${ic('link',12,2)}Criada sozinha com a conexão do ${esc(c.prov)}, em Parâmetros › Conectores. Não se cria nem se exclui à mão.</p>`;})()}
  <footer><span>Saldo inicial <b>${R$(c.ini)}</b> em ${dBR(c.desde)}</span><span class="fq-a">${c.cart?`<button class="btn sec sm" data-a="fTransf" data-v="${i}">${ic('swap',14)}Transferir para o banco</button>`:''}<button class="btn sec sm" data-a="fcxOpen" data-v="${i}">Ver extrato</button></span></footer></article>`;}).join('')}</div>`}`;
}

/* ---------- Extrato de uma conta financeira, com o saldo depois de cada linha (parcial fácil 3 · 06/11/2026) ---------- */
/* o saldo corre de trás para a frente a partir do saldo atual da conta, então a última linha sempre fecha com ele */
function fExtrato(i){const c=FCONTAS[i],all=LANCS.filter(l=>l.st==='ok'&&(l.acc?l.acc===c.n:i===0)).sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0);
 const after=new Map();let s=c.atual;for(let k=all.length-1;k>=0;k--){after.set(all[k],s);s=imRound(s-(all[k].tipo==='e'?all[k].v:-all[k].v));}
 const ym=S.relM[0]==='Y'?RELN:S.relM,L=all.filter(l=>l.d.slice(0,7)===ym),ant=L.length?imRound(after.get(L[0])-(L[0].tipo==='e'?L[0].v:-L[0].v)):(()=>{const prev=all.filter(l=>l.d.slice(0,7)<ym).pop();return prev?after.get(prev):s;})();
 const E=L.filter(l=>l.tipo==='e').reduce((a,l)=>a+l.v,0),Sx=L.filter(l=>l.tipo==='s').reduce((a,l)=>a+l.v,0),pend=LANCS.filter(l=>l.st==='pend'&&(l.acc?l.acc===c.n:i===0)).length;
 return `<nav class="crumb rise"><span class="soft">Financeiro</span>${ic('chevR',13,2)}<button class="lnk back" data-a="fcxBack">Contas financeiras</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span></nav>`
 +fHead(esc(c.n),`${esc(c.tipo)}${c.banco?' · '+esc(c.banco):''} · extrato com o saldo depois de cada movimento`,`<button class="btn sec" data-a="fTransf" data-v="${i}">${ic('swap',15)}Transferir</button><button class="btn sec" data-a="nav" data-v="fimp">${ic('upload',15)}Importar extrato</button><button class="btn pri" data-a="lcNew">${ic('plus',15,2.2)}Novo lançamento</button>`)
 +fMes()
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Saldo atual</span><span class="kv">${R$(c.atual)}</span><span class="kd">${esc(c.n)}</span></div><div class="k4"><span class="kl">Entradas em ${MONTHS[+ym.slice(5)-1]}</span><span class="kv" style="color:var(--st-int)">${R$(E)}</span><span class="kd">${L.filter(l=>l.tipo==='e').length} movimentos</span></div><div class="k4"><span class="kl">Saídas em ${MONTHS[+ym.slice(5)-1]}</span><span class="kv" style="color:var(--st-rec)">${R$(Sx)}</span><span class="kd">${L.filter(l=>l.tipo==='s').length} movimentos</span></div><div class="k4"><span class="kl">Aguardando aprovação</span><span class="kv" style="${pend?'color:var(--st-sol)':''}">${pend}</span><span class="kd">ainda não contam no saldo</span></div></section>
 <section class="card mtab rise" style="--d:2"><div class="ex-r thead"><span>Data</span><span>Descrição</span><span>Entrada</span><span>Saída</span><span>Saldo</span></div>
  <div class="ex-r ant"><span>${dBR(ymAdd(ym,0)+'-01')}</span><span class="ex-t"><b>Saldo anterior</b></span><span></span><span></span><span class="ex-s">${R$(ant)}</span></div>
  ${L.length?L.map(l=>`<div class="ex-r"><span class="ex-d">${dBR(l.d)}</span><span class="ex-t"><b>${esc(l.desc)}</b><small>${esc(l.cat)}${l.rt&&l.rt.length?' · '+rtTag(l):(l.cc&&l.cc!=='cc1'?' · '+esc(ccN(l.cc)):'')}${l.ct?' · '+esc(ctN(l.ct)):''}${l.tr?' · transferência':''}</small></span><span class="ex-e">${l.tipo==='e'?R$(l.v):''}</span><span class="ex-o">${l.tipo==='s'?R$(l.v):''}</span><span class="ex-s">${R$(after.get(l))}</span></div>`).join(''):`<div class="mempty"><p>Sem movimento em ${monthName(ym)}</p><span>Use o seletor de mês para ver outros meses.</span></div>`}
  <div class="tfoot"><span>${L.length} ${L.length===1?'movimento':'movimentos'}</span><span>Saldo no fim do mês <b>${R$(L.length?after.get(L[L.length-1]):ant)}</b></span></div></section>`;}

/* ---------- Previsibilidade (só leitura) ---------- */
/* exemplo: quanto do vendido de cada mês já foi reconhecido; o mês mais antigo está mais reconhecido (a regra real é a FIN-P-64) */
const RECB={cafe:.72,rest:.55,shop:.9};
const mDiff=(a,b)=>(+a.slice(0,4)-+b.slice(0,4))*12+(+a.slice(5,7)-+b.slice(5,7));
const recFrac=(k,ym)=>Math.min(1,(RECB[k]||0)+.2*Math.max(0,mDiff(FOOD_DATE.slice(0,7),ym)));
function fPrev(){
 if(S.fqSt)return fqVendPage(S.fqSt);
 if(S.fqCxI!=null)return fqCaixaPage(S.fqCxI);
 if(S.fpv==='cd')S.fpv='vd';
 const tab=S.fpv||'cx',vw=S.fpvC||'ab',cur=FOOD_DATE.slice(0,7),mm=S.relM,mn=MONTHS[+mm.slice(5)-1],isCur=mm===cur;
 const PU=pcUnits(),list=PU.filter(c=>vw==='ab'?!c.closed:(c.closed&&c.in-c.out>0)),com=pcCom(),ret=pcVivos().reduce((a,c)=>a+c.ret,0);
 const stores=Object.entries(FOOD_STORES).filter(([k])=>['cafe','rest','shop'].includes(k)),sm=(k,f)=>foodSummary(FOOD_SALES.filter(s=>s.store===k&&f(s.date)));
 const rows=stores.map(([k,st])=>{const m=sm(k,d=>d.startsWith(mm));return {k,n:st.name,cf:fqPend(k,mm),h:isCur?sm(k,d=>d===FOOD_DATE):null,m,r:Math.round(m.sold*recFrac(k,mm))};});
 const vm=rows.reduce((a,r)=>a+r.m.sold,0)/100,cv=m=>`${brl2(m.sold/100)}<small>${m.count} ${m.count===1?'venda':'vendas'}</small>`;
 const pendTot=stores.reduce((a,[k])=>a+[...new Set(FOOD_SALES.filter(s=>s.store===k).map(s=>s.date.slice(0,7)))].reduce((q,ym)=>{const m=sm(k,d=>d.startsWith(ym));return q+m.sold-Math.round(m.sold*recFrac(k,ym));},0),0)/100;
 const caixas=()=>{const gs=['Eventos','Ministérios','Cultos','Obras','Campanhas'].map(g=>[g,list.filter(c=>c.g===g)]).filter(x=>x[1].length);
  if(!gs.length)return '<div class="mempty"><p>Nenhum caixa aqui.</p><span>Não há caixa encerrado com saldo.</span></div>';
  const tot=list.reduce((a,c)=>a+c.in-c.out,0);
  return `<div class="trow pv thead"><span class="pv-n">Caixa</span><span class="pv-c pv-c1">Entradas</span><span class="pv-c pv-c2">Saídas</span><span class="pv-c pv-c3">Devolvido à igreja</span><span class="pv-t">No caixa</span><span class="pv-c pv-c4">A conferir</span></div>`
  +gs.map(([g,l])=>`<div class="trow pv pv-gh"><span class="pv-n"><b>${g}<em>${l.length} ${l.length===1?'caixa':'caixas'}</em></b></span><span class="pv-t">${R$(l.reduce((a,c)=>a+c.in-c.out,0))}</span>${pcPendCell(l.reduce((a,c)=>a+pcPend(c),0))}</div>`+l.map(c=>`<div class="trow pv fq-go" data-a="fqCx" data-v="${c.key}" role="button" tabindex="0"><span class="pv-n"><b>${esc(c.n)}</b>${pcPendTxt(c)}</span><span class="pv-c pv-c1">${R$(c.in)}</span><span class="pv-c pv-c2">${R$(c.out)}</span><span class="pv-c pv-c3">${R$(c.ret)}</span><span class="pv-t">${R$(c.in-c.out)}</span>${pcPendCell(pcPend(c),true)}<span class="pv-s">Entradas ${R$(c.in)} · Saídas ${R$(c.out)} · Devolvido à igreja ${R$(c.ret)}${pcPend(c)?` · ${pcPend(c)} a conferir`:''}</span></div>`).join('')).join('')
  +`<div class="trow pv tot"><span class="pv-n"><b>Total com as pessoas</b></span><span class="pv-t">${R$(tot)}</span>${pcPendCell(list.reduce((a,c)=>a+pcPend(c),0))}</div>`;};
 const vendas=()=>`<div class="trow pv vd thead"><span class="pv-n">Estabelecimento</span><span class="pv-c pv-c1">Hoje</span><span class="pv-c pv-c2">Vendido em ${mn}</span><span class="pv-c pv-c3">A conferir</span></div>`
  +rows.map(r=>`<div class="trow pv vd fq-go" data-a="fqVend" data-v="${r.k}" role="button" tabindex="0"><span class="pv-n"><b>${esc(r.n)}</b><small>${r.m.count} ${r.m.count===1?'venda':'vendas'} em ${mn}</small></span><span class="pv-c pv-c1">${r.h?cv(r.h):'—'}</span><span class="pv-c pv-c2">${cv(r.m)}</span><span class="pv-c pv-c3" style="color:${r.cf?'var(--st-sol)':'var(--ink-muted)'}">${r.cf?r.cf+' '+(r.cf===1?'venda':'vendas'):'—'}</span><span class="pv-t">${brl2(r.m.sold/100)}</span><span class="pv-s">${r.h?`Hoje ${brl2(r.h.sold/100)} · `:''}${r.cf?`${r.cf} a conferir`:'Tudo conferido'}</span></div>`).join('')
  +`<div class="trow pv vd tot"><span class="pv-n"><b>Total</b></span><span class="pv-c pv-c1">${isCur?brl2(rows.reduce((a,r)=>a+r.h.sold,0)/100):'—'}</span><span class="pv-c pv-c2">${brl2(vm)}</span><span class="pv-c pv-c3">${rows.reduce((a,r)=>a+r.cf,0)||'—'}</span><span class="pv-t">${brl2(vm)}</span></div>`;
 return fHead('Caixas e vendas','O dinheiro que ainda não chegou à conta da igreja',tab==='vd'&&FQMAQ.length?`<button class="btn sec" data-a="fqImp">${ic('upload',15)}Importar extrato da maquininha</button>`:'')
 +`<section class="card kpis4 rise" style="--d:1"><div class="k4"><span class="kl">Com as pessoas</span><span class="kv">${R$(com)}</span><span class="kd">caixas abertos e encerrados com saldo${(()=>{const vb=PU.reduce((a,c)=>a+(c.verba||0),0);return vb?' · verbas aprovadas '+R$(vb):'';})()}</span></div><div class="k4"><span class="kl">Já devolvido à igreja</span><span class="kv">${R$(ret)}</span><span class="kd">devoluções dos caixas</span></div><div class="k4"><span class="kl">Vendido em ${mn}</span><span class="kv">${R$(vm)}</span><span class="kd">Cafeteria, Restaurante e Loja · bruto</span></div><div class="k4"><span class="kl">A conferir</span><span class="kv" style="color:var(--st-sol)">${rows.reduce((a,r)=>a+r.cf,0)}</span><span class="kd">vendas de ${mn} ainda sem conciliação</span></div></section>`
 +(tab==='cx'?`<div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><b>Só leitura.</b> <small>Dinheiro que ainda não chegou à conta da igreja; a baixa é feita em cada caixa.</small></span></div>`
  :`<div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><b>Só leitura: nada aqui vira lançamento.</b> <small>Clique num estabelecimento para ver as vendas do mês e o status financeiro de cada uma.</small></span></div>`)
 +`<div class="utabs rise" style="--d:2" role="tablist">${[['cx','Caixas'],['vd','Vendas']].map(t=>`<button role="tab" class="${tab===t[0]?'on':''}" aria-selected="${tab===t[0]}" data-a="fpvTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>`
 +(tab==='vd'?fMes():'')
 +`<section class="card mtab pv-card lp-no rise" style="--d:3">${tab==='cx'
  ?`<div class="tbar"><div class="chips">${[['ab','Abertos',PU.filter(c=>!c.closed).length],['en','Encerrados com saldo',PU.filter(c=>c.closed&&c.in-c.out>0).length]].map(c=>`<button class="chipf ${vw===c[0]?'on':''}" data-a="fpvC" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>${caixas()}`
  :vendas()}</section>`+(tab==='vd'?fqRecBlock():'');
}

/* ---------- Plano de contas (hierárquico, com código contábil) ---------- */
const FTONES=['ceu','menta','lima','salvia','damasco','rosado'],FINAT=new Set();
const catUso=c=>LANCS.filter(l=>l.cat===c).length+PAGAR.filter(p=>p.cat===c).length+RECEB.filter(r=>r.cat===c).length;
const prTxt=p=>p==='comp'?'Na competência':'No pagamento';
function fPlanoTab(){
 const sem=PLANO.filter(a=>!a.cc).length,at=PLANO.filter(a=>!FINAT.has(a.n)).length,ct=!!S.plCt,emUso=PLANO.filter(a=>catUso(a.n)>0&&!FINAT.has(a.n)).length;
 return fHead('Plano de contas','A estrutura dos lançamentos, das contas a pagar e a receber e da DRE',`<button class="btn sec" data-a="plCt">${ic('clipboard',15)}${ct?'Ocultar dados contábeis':'Dados contábeis'}</button><button class="btn sec" data-a="export" data-v="o plano de contas (CSV)">${ic('arrowDn',15,2)}Exportar</button><button class="btn pri" data-a="catNew">${ic('plus',15,2.2)}Nova conta</button>`)
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Contas ativas</span><span class="kv">${at}</span><span class="kd">em ${DRG.length} grupos da DRE</span></div>${ct?'':`<div class="k4"><span class="kl">Em uso</span><span class="kv">${emUso}</span><span class="kd">com lançamentos ou contas</span></div><div class="k4"><span class="kl">Inativas</span><span class="kv">${PLANO.length-at}</span><span class="kd">não aparecem nas escolhas</span></div>`}${ct?`<div class="k4"><span class="kl">Com código contábil</span><span class="kv">${PLANO.length-sem} de ${PLANO.length}</span><span class="kd">${sem?`${sem} faltam: o contador informa`:'todas vinculadas'}</span></div><div class="k4"><span class="kl">Reconhecem na competência</span><span class="kv">${PLANO.filter(a=>a.pr==='comp').length}</span><span class="kd">as outras, no pagamento</span></div>`:''}</section>
 <section class="card mtab pl-card ${ct?'':'nocc'} rise" style="--d:2"><div class="trow pl thead"><span>Conta</span><span>Natureza</span>${ct?'<span>Código contábil</span><span>Reconhece</span>':'<span></span><span></span>'}<span>Uso</span><span></span></div>`
 +DRG.map((g,gi)=>{const l=PLANO.filter(a=>a.g===g[0]);return `<div class="trow pl pl-gh"><span class="pl-n"><b>${gi+1} · ${g[1]}<em>${l.length} ${l.length===1?'conta':'contas'}</em></b></span></div>`+l.map(a=>{const u=catUso(a.n),off=FINAT.has(a.n),nt=`${a.t==='e'?'Entrada':'Saída'}${a.fv?` · ${a.fv==='f'?'fixa':'variável'}`:''}`;
  return `<div class="trow pl ${off?'off':''}"><span class="pl-n"><i>${a.c}</i>${catTag(a.n)}${off?'<em class="pc-off">Inativa</em>':''}</span><span class="pl-t">${nt}</span><span class="pl-c">${a.cc?`<b>${esc(a.cc)}</b>`:'<i class="soft">a definir</i>'}</span><span class="pl-p">${prTxt(a.pr)}</span><span class="pl-u">${u?`${u} ${u===1?'item':'itens'}`:'não usada'}</span><span class="pl-a"><button class="btn sec sm" data-a="catEdit" data-v="${esc(a.n)}">${ic('pen',14)}Editar</button><button class="btn sec sm" data-a="catOff" data-v="${esc(a.n)}">${off?'Reativar':'Inativar'}</button></span><span class="pl-s">${nt}${ct?` · ${a.cc?'cód. '+esc(a.cc):'sem código contábil'} · ${prTxt(a.pr)}`:''}</span></div>`;}).join('');}).join('')+`</section>`;}
function catForm(name){const ed=name?contaOf(name):null,used=name?catUso(name):0;let tp=ed?ed.t:'s',tn=ed?ed.tn:FTONES[0],fv=ed?ed.fv||'v':'v';const gk0=ed?ed.g:'adm';
 openDlg(`${dlgHead(ed?'Editar conta':'Nova conta',ed?'Renomear atualiza tudo que já usa a conta.':'Aparece nos lançamentos, nas contas a pagar e a receber e na DRE.')}<form id="pcF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(name||'')}" maxlength="40" autocomplete="off" placeholder="Ex.: Eventos"></label>
  <label class="fld wide"><span class="fl">Grupo da DRE</span>${selw('g',DRG.map(g=>`<option value="${g[0]}" ${g[0]===gk0?'selected':''}>${g[1]}</option>`).join(''))}</label>
  <div class="fld wide" id="pcN"><span class="fl">Natureza</span><div class="fi-tg"><button type="button" data-tp="e" class="${tp==='e'?'on':''}" ${used?'disabled':''}>${ic('arrowDn',15,2.2)}Entrada</button><button type="button" data-tp="s" class="${tp==='s'?'on':''}" ${used?'disabled':''}>${ic('arrowUp',15,2.2)}Saída</button></div></div>
  <div class="fld wide" id="pcF2"><span class="fl">Comportamento</span><div class="fi-tg"><button type="button" data-fv="f" class="${fv==='f'?'on':''}">Fixa</button><button type="button" data-fv="v" class="${fv==='v'?'on':''}">Variável</button></div></div>
  <details class="fld wide cn-adv" ${ed&&(ed.cc||ed.pr==='comp')?'open':''}><summary>${ic('clipboard',15)}Para o contador <small>opcional</small>${ic('chevD',14,2)}</summary><div class="cn-adv-b">
   <label class="fld"><span class="fl">Código contábil</span><input name="cc" value="${esc(ed?ed.cc:'')}" maxlength="20" autocomplete="off" placeholder="Ex.: 4.2.1.05"></label>
   <label class="fld"><span class="fl">Reconhece</span>${selw('pr',`<option value="caixa" ${(!ed||ed.pr==='caixa')?'selected':''}>No pagamento</option><option value="comp" ${ed&&ed.pr==='comp'?'selected':''}>Na competência (provisão)</option>`)}</label></div></details>
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

/* ---------- Plano de contas e centros de custo: uma página só, cada um na sua aba ---------- */
function fPlano(){const k=S.fpk||'pl',h=k==='cc'?fCCTab():fPlanoTab(),act=(h.match(/<div class="pact">([\s\S]*?)<\/div><\/header>/)||[])[1]||'';
 const r=h.replace(/<header class="ph rise">[\s\S]*?<\/header>/,fHead('Plano de contas e centros de custo','A estrutura da DRE e de onde vem e para onde vai o dinheiro',act)),i=r.indexOf('</section>')+10;
 return r.slice(0,i)+sxSeg('fpk',[['pl','Plano de contas',PLANO.filter(a=>!FINAT.has(a.n)).length],['cc','Centros de custo',CCUSTOS.filter(c=>c.on).length]],k)+r.slice(i);}
const fCC=()=>{S.fpk='cc';return fPlano();};
/* ---------- Centros de custo ---------- */
const ccUso=id=>LANCS.filter(l=>lcParts(l).some(p=>p.cc===id)).length+PAGAR.filter(p=>lcParts({...p,v:1}).some(q=>q.cc===id)).length+RECEB.filter(r=>lcParts({...r,v:1}).some(q=>q.cc===id)).length;
function fCCTab(){
 const mv=id=>{const l=LANCS.filter(x=>x.comp===RELN&&x.st==='ok'&&!x.tr).flatMap(x=>lcParts(x).filter(p=>p.cc===id).map(p=>({...x,v:p.v})));return [sumT(l,'e'),sumT(l,'s')];};
 return fHead('Centros de custo','De onde vem e para onde vai o dinheiro: cultos, cafeteria, eventos, ministérios',`<button class="btn pri" data-a="ccNew">${ic('plus',15,2.2)}Novo centro de custo</button>`)
 +`<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Centros ativos</span><span class="kv">${CCUSTOS.filter(c=>c.on).length}</span><span class="kd">aparecem nas escolhas</span></div><div class="k4"><span class="kl">Com movimento em ${MONTHS[+RELN.slice(5)-1]}</span><span class="kv">${CCUSTOS.filter(c=>c.on&&(mv(c.id)[0]+mv(c.id)[1])>0).length}</span><span class="kd">entradas ou saídas no mês</span></div><div class="k4"><span class="kl">Sem uso</span><span class="kv">${CCUSTOS.filter(c=>ccUso(c.id)===0).length}</span><span class="kd">nenhum item ainda</span></div></section>
 <p class="fi-note rise" style="--d:2">${ic('info',14)}<span>O centro de custo diz <b>onde</b> o valor aconteceu; a conta do plano diz <b>o quê</b>. A DRE pode ser filtrada por centro em <button class="lnk inl" data-a="nav" data-v="frel">Relatórios</button>. Um lançamento ou uma conta pode ser <b>dividido entre centros</b> (rateio): marque <b>Ratear</b> ao lançar.</span></p>
 <section class="card pc-col rise" style="--d:2"><header class="pc-h"><span class="pc-hi e">${ic('layers',16,2.2)}</span><div><h2>Centros de custo</h2><small>${CCUSTOS.filter(c=>c.on).length} ativos</small></div></header><div class="pc-list">${CCUSTOS.map(c=>{const m=mv(c.id),u=ccUso(c.id);return `<div class="pc-r ${c.on?'':'off'}"><span class="pc-n"><b>${esc(c.n)}</b>${c.cod?`<small class="who">cód. ${esc(c.cod)}</small>`:''}${c.on?'':'<em class="pc-off">Inativo</em>'}</span><span class="pc-u">${monthName(RELN)}: entradas ${R$(m[0])} · saídas ${R$(m[1])} · ${u} ${u===1?'item':'itens'}</span><span class="pc-a"><button class="btn sec sm" data-a="ccEdit" data-v="${c.id}">${ic('pen',14)}Editar</button><button class="btn sec sm" data-a="ccOff" data-v="${c.id}" ${c.id==='cc1'?'disabled':''}>${c.on?'Inativar':'Reativar'}</button></span></div>`;}).join('')}</div></section>`;}
function ccForm(id){const c=id?CCUSTOS.find(x=>x.id===id):null;
 openDlg(`${dlgHead(c?'Editar centro de custo':'Novo centro de custo','Aparece nos lançamentos e nas contas a pagar e a receber.')}<form id="ccF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(c?c.n:'')}" maxlength="40" autocomplete="off" placeholder="Ex.: Retiro de Casais"></label>
  <details class="fld wide cn-adv" ${c&&c.cod?'open':''}><summary>${ic('clipboard',15)}Para o contador <small>opcional</small>${ic('chevD',14,2)}</summary><div class="cn-adv-b"><label class="fld"><span class="fl">Código contábil</span><input name="cod" value="${esc(c?c.cod:'')}" maxlength="20" autocomplete="off" placeholder="Informado pelo contador"></label></div></details>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${c?'Salvar':'Criar centro de custo'}</button></div></form>`,'sm');
 const f=$('#ccF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!f.n.value.trim();};f.addEventListener('input',chk);chk();setTimeout(()=>f.n.focus(),80);
 f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(CCUSTOS.some(x=>x!==c&&norm(x.n)===norm(n)))return toast('Já existe um centro de custo com esse nome');
  if(c)Object.assign(c,{n,cod:f.cod.value.trim()});else CCUSTOS.push(CC0('cc'+(CCUSTOS.length+1+Date.now()%1000),n,f.cod.value.trim()));closeDlg();fRe();toast(c?'Centro de custo atualizado':'Centro de custo criado');});}

/* ---------- Contatos (fornecedores e clientes) ---------- */
const CTTP={f:'Fornecedor',c:'Cliente',a:'Fornecedor e cliente',u:'Funcionário'};
/* soma em aberto de cada contato: a pagar e a receber */
const ctAb=id=>[PAGAR.filter(p=>p.ct===id).reduce((a,p)=>a+tSd(p),0),RECEB.filter(r=>r.ct===id).reduce((a,r)=>a+tSd(r),0)];
const ctChip=tp=>`<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)">${CTTP[tp]}</span>`;
const ctEmTit=id=>[...PAGAR.map(t=>['p',t]),...RECEB.map(t=>['r',t])].filter(x=>x[1].ct===id&&tSd(x[1])>0);
const ctHist=id=>LANCS.filter(l=>l.ct===id&&l.st==='ok'&&!l.tr).sort((a,b)=>a.d<b.d?1:-1);
const ctHRow=l=>`<div class="ct-hr"><span class="fi-dir ${l.tipo}">${ic(l.tipo==='e'?'arrowDn':'arrowUp',15,2.2)}</span><span class="hn"><b>${esc(l.desc)}</b><span>${dBR(l.d)} · ${catTag(l.cat)}${l.cc&&l.cc!=='cc1'?' · '+esc(ccN(l.cc)):''}${l.st==='pend'?` · <span class="fi-pend">${ic('clock',11)}aguardando aprovação</span>`:''}</span></span><span class="ct-cp">${l.tipo==='s'?(l.cp?`<span class="fi-cpok">${ic('file',12,2)}${esc(l.cp)}</span>`:cpReq(l)?`<span class="fi-semcp">${ic('alert',11,2.4)}sem comprovante</span>`:''):''}</span><span class="lc-v ${l.tipo}">${R$(l.tipo==='e'?l.v:-l.v,true)}</span></div>`;
const ctAnoAtras=()=>addD(NOWD,-365);
const ctMov=(id,t)=>{const h=ctHist(id).filter(l=>l.tipo===t);return {tot:h.filter(l=>l.d>=ctAnoAtras()).reduce((a,l)=>a+l.v,0),last:h[0]?h[0].d:''};};
function fCto(){
 if(S.fct)return fctPage();
 const kk=S.fctK||'f',F=kk==='f',U=kk==='u',Pg=kk!=='c',L=CONTATOS.filter(c=>c.tp===kk||(c.tp==='a'&&!U)),nF=CONTATOS.filter(c=>c.tp==='f'||c.tp==='a').length,nC=CONTATOS.filter(c=>c.tp==='c'||c.tp==='a').length,nU=CONTATOS.filter(c=>c.tp==='u').length,tp=Pg?'s':'e',quem=F?'fornecedor':U?'funcionário':'cliente';
 const row=c=>{const ab=ctAb(c.id)[Pg?0:1],m=ctMov(c.id,tp);return `<div class="trow ct" tabindex="0" data-a="fctOpen" data-v="${c.id}"><span class="ct-n"><b>${esc(c.n)}</b><small>${U?`${esc(c.role||'Funcionário')} · ${c.mb?'membro da igreja':'não é membro'}`:`${c.doc?esc(c.doc):'sem CPF ou CNPJ'}${c.tp==='a'?` · também é ${F?'cliente':'fornecedor'}`:''}`}</small></span><span class="ct-c">${c.email?`<small>${ic('mail',12,2)} ${esc(c.email)}</small>`:''}${c.tel?`<small>${ic('phone',12,2)} ${esc(c.tel)}</small>`:''}${!c.email&&!c.tel?'<small class="mute">sem e-mail nem telefone</small>':''}</span><span class="ct-v" data-l="${Pg?'A pagar':'A receber'}">${ab?R$(ab):'—'}</span><span class="ct-v" data-l="${Pg?'Pago em 12 meses':'Recebido em 12 meses'}">${m.tot?R$(m.tot):'—'}</span><span class="ct-v" data-l="${Pg?'Último pagamento':'Último recebimento'}">${m.last?dBR(m.last):'—'}</span><span class="pc-a"><button class="btn sec sm" data-a="ctEdit" data-v="${c.id}">${ic('pen',14)}Editar</button></span></div>`;};
 return fHead('Contatos','Fornecedores, clientes e funcionários · toque num contato para ver o que já foi pago, recebido e o que está pendente',`<button class="btn pri" data-a="ctNew">${ic('plus',15,2.2)}Novo contato</button>`)
 +sxSeg('fctK',[['f','Fornecedores',nF],['c','Clientes',nC],['u','Funcionários',nU]],kk)
 +`<p class="fi-note rise" style="--d:2">${ic('info',14)}<span>${U?'Aqui ficam <b>as pessoas que a igreja paga como equipe</b> (salário, ajuda de custo, adiantamento, reembolso). O funcionário pode ou não ser membro: o vínculo com Pessoas é opcional.':'Aqui ficam <b>quem a igreja paga e de quem recebe</b> (com CPF ou CNPJ, que o contador pede). Membros, dízimos e ofertas continuam em Pessoas e nas Doações.'}</span></p>
 <section class="card mtab rise" style="--d:3">
  <div class="trow ct thead"><span>${F?'Fornecedor':U?'Funcionário':'Cliente'}</span><span>E-mail e telefone</span><span>${Pg?'A pagar':'A receber'}</span><span>${Pg?'Pago em 12 meses':'Recebido em 12 meses'}</span><span>${Pg?'Último pagamento':'Último recebimento'}</span><span></span></div>
  ${L.length?L.map(row).join(''):`<div class="mempty"><p>Nenhum ${quem} ainda</p><span>Use Novo contato para cadastrar.</span></div>`}
  <div class="tfoot"><span>${L.length} ${F?(L.length===1?'fornecedor':'fornecedores'):U?(L.length===1?'funcionário':'funcionários'):(L.length===1?'cliente':'clientes')}</span><span>${Pg?'A pagar':'A receber'} <b>${R$(L.reduce((a,c)=>a+ctAb(c.id)[Pg?0:1],0))}</b></span></div></section>`;}
/* ficha do contato: pendentes e histórico de tudo que já foi pago ou recebido */
function fctPage(){const c=CONTATOS.find(x=>x.id===S.fct);if(!c){S.fct=null;return fCto();}
 const [aP,aR]=ctAb(c.id),H=ctHist(c.id),yr=addD(NOWD,-365),pago=H.filter(l=>l.tipo==='s'&&l.d>=yr).reduce((a,l)=>a+l.v,0),rec=H.filter(l=>l.tipo==='e'&&l.d>=yr).reduce((a,l)=>a+l.v,0);
 const T=ctEmTit(c.id),AG=LANCS.filter(l=>l.ct===c.id&&l.st==='pend'),tab=S.fctTab||'pend',hf=S.fctH||'todos';
 const kp=[];if(c.tp!=='c'){kp.push([R$(aP),'A pagar em aberto']);}if(c.tp!=='f'){kp.push([R$(aR),'A receber em aberto']);}if(c.tp!=='c')kp.push([R$(pago),'Pago em 12 meses']);if(c.tp!=='f')kp.push([R$(rec),'Recebido em 12 meses']);
 const head=joHead(null,`<span class="soft">Financeiro</span>${ic('chevR',13,2)}<button class="lnk back" data-a="fctBack">Contatos</button>${ic('chevR',13,2)}<span>${esc(c.n)}</span>`,esc(c.n),`${ctChip(c.tp)} · ${c.tp==='u'?`${c.role?esc(c.role)+' · ':''}${c.mb?'membro da igreja':'não é membro'}`:(c.doc?esc(c.doc):'sem CPF ou CNPJ')}${c.email?' · '+esc(c.email):''}${c.tel?' · '+esc(c.tel):''}`,kp,[['pend','Pendentes','fctTab',T.length+AG.length],['hist','Histórico','fctTab',H.length]],tab,`<button class="btn sec sm" data-a="ctEdit" data-v="${c.id}">${ic('pen',14)}Editar</button>`);
 const g=(n,l,cls)=>l.length?`<div class="fi-grp ${cls}"><p class="fi-gh"><b>${n}</b><span>${l.length} · ${R$(l.reduce((a,x)=>a+tSd(x[1]),0))}</span></p>${l.map(x=>titRow(x[1],x[0],cls)).join('')}</div>`:'';
 let body;
 if(tab==='pend'){const late=T.filter(x=>tDd(x[1],x[0])<0),wk=T.filter(x=>tDd(x[1],x[0])>=0&&tDd(x[1],x[0])<=7),lt=T.filter(x=>tDd(x[1],x[0])>7);
  body=T.length||AG.length?`<section class="card fi-bills rise" style="--d:2">${g('Atrasadas',late,'late')}${g('Próximos 7 dias',wk,'soon')}${g('Depois',lt,'later')}${AG.length?`<div class="fi-grp later"><p class="fi-gh"><b>Aguardando aprovação</b><span>${AG.length}</span></p>${AG.map(ctHRow).join('')}</div>`:''}</section>`:`<section class="card rise" style="--d:2"><div class="mempty"><p>Nada pendente com ${esc(c.n)}</p><span>Nenhuma conta em aberto e nada aguardando aprovação.</span></div></section>`;}
 else{const L=H.filter(l=>hf==='todos'||l.tipo===hf);
  body=`<section class="card mtab rise" style="--d:2">${c.tp==='a'?`<div class="tbar"><div class="chips">${[['todos','Tudo'],['s','Pagamentos'],['e','Recebimentos']].map(x=>`<button class="chipf ${hf===x[0]?'on':''}" data-a="fctH" data-v="${x[0]}">${x[1]}</button>`).join('')}</div></div>`:''}
   ${L.length?L.map(ctHRow).join('')+`<div class="tfoot"><span>${L.length} ${L.length===1?'movimento':'movimentos'}</span><span>${c.tp!=='c'&&hf!=='e'?`Pago <b>${R$(L.filter(l=>l.tipo==='s').reduce((a,l)=>a+l.v,0))}</b>`:''}${c.tp==='a'&&hf==='todos'?' · ':''}${c.tp!=='f'&&hf!=='s'?`Recebido <b>${R$(L.filter(l=>l.tipo==='e').reduce((a,l)=>a+l.v,0))}</b>`:''}</span></div>`:'<div class="mempty"><p>Ainda não há movimento com este contato</p><span>Pagamentos e recebimentos aprovados aparecem aqui.</span></div>'}</section>`;}
 return head+body;}
function ctForm(id){const c=id?CONTATOS.find(x=>x.id===id):null;let tp=c?c.tp:'f';
 openDlg(`${dlgHead(c?'Editar contato':'Novo contato','Fornecedor, cliente ou funcionário.')}<form id="ctF" class="fgrid" novalidate>
  <label class="fld wide"><span class="fl">Nome</span><input name="n" value="${esc(c?c.n:'')}" maxlength="60" autocomplete="off" placeholder="Ex.: Padaria Pão Quente"></label>
  <label class="fld wide"><span class="fl">CPF ou CNPJ <small>opcional</small></span><input name="doc" value="${esc(c?c.doc:'')}" maxlength="18" autocomplete="off" placeholder="Somente números"></label>
  <label class="fld"><span class="fl">E-mail <small>opcional</small></span><input name="email" type="email" value="${esc(c?c.email:'')}" maxlength="80" autocomplete="off"></label>
  <label class="fld"><span class="fl">Telefone <small>opcional</small></span><input name="tel" value="${esc(c?c.tel:'')}" maxlength="20" autocomplete="off"></label>
  <div class="fld wide"><span class="fl">Tipo</span><div class="fi-tg">${[['f','Fornecedor'],['c','Cliente'],['a','Os dois'],['u','Funcionário']].map(t=>`<button type="button" data-tp="${t[0]}" class="${tp===t[0]?'on':''}">${t[1]}</button>`).join('')}</div></div>
  <div class="fld wide ctu" id="ctU" ${tp==='u'?'':'hidden'}><label class="fld"><span class="fl">Cargo ou função <small>opcional</small></span><input name="role" value="${esc(c?c.role:'')}" maxlength="40" autocomplete="off" placeholder="Ex.: Secretária"></label><label class="fld"><span class="fl">Vínculo com a igreja</span>${selw('mb','<option value="">Não é membro</option>'+[...new Map(MEMBERS.filter(m=>m.st==='integrado').map(m=>[m.n,m])).values()].map(m=>`<option value="${m.id}" ${c&&c.mb===m.id?'selected':''}>Membro: ${esc(m.n)}</option>`).join(''))}</label></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>${c?'Salvar':'Criar contato'}</button></div></form>`,'sm');
 const f=$('#ctF'),ok=f.querySelector('[type=submit]'),chk=()=>{ok.disabled=!f.n.value.trim();};f.addEventListener('input',chk);chk();setTimeout(()=>f.n.focus(),80);
 $$('[data-tp]',f).forEach(b=>b.onclick=()=>{tp=b.dataset.tp;$$('[data-tp]',f).forEach(y=>y.classList.toggle('on',y===b));f.querySelector('#ctU').hidden=tp!=='u';});
 f.addEventListener('submit',e=>{e.preventDefault();const o={n:f.n.value.trim(),doc:f.doc.value.trim(),email:f.email.value.trim(),tel:f.tel.value.trim(),tp,role:tp==='u'?f.role.value.trim():'',mb:tp==='u'?f.mb.value:''};if(c)Object.assign(c,o);else CONTATOS.push(CTO('ct'+Date.now(),o.n,o.doc,tp,o.email,o.tel,{role:o.role,mb:o.mb}));closeDlg();fRe();toast(c?'Contato atualizado':'Contato criado');});}

/* ---------- Contador: o pacote do mês e o acesso de quem faz a contabilidade ---------- */
function fCont(){
 const ym=S.relM,fech=FCLOSED.some(x=>x[0]===ym),pend=LANCS.filter(l=>l.st==='pend'&&l.comp===ym).length,usadas=[...new Set(relItems(ym).map(x=>x.cat))].filter(n=>contaOf(n)),falta=usadas.filter(n=>!contaOf(n).cc),ls=LANCS.filter(l=>l.comp===ym&&l.st==='ok'&&!l.tr).sort((a,b)=>a.d<b.d?-1:1),semcp=ls.filter(cpMiss).length;
 const chk=(ok,t,s,go)=>`<div class="cn-ck ${ok?'ok':'no'}"><span class="cn-ci">${ic(ok?'check':'alert',14,2.4)}</span><span class="dkt"><b>${t}</b><span>${s}</span></span>${go&&!ok?`<button class="btn sec sm" data-a="nav" data-v="${go[0]}">${go[1]}</button>`:''}</div>`;
const exp=`os lançamentos de ${monthName(ym)} no layout genérico (CSV)${S.excp?' e os comprovantes das saídas (ZIP)':''}`;
 const cod=a=>a&&a.cc?`<b>${esc(a.cc)}</b>`:'<i class="soft">a definir</i>';
 return fHead('Exportação contábil','Os lançamentos do mês no formato do sistema contábil do contador',rpBtn('financeiro','lancamentos','Relatórios do Financeiro'))
 +fMes()
 +`<section class="card cn-card rise" style="--d:1"><div class="sh"><h2>Antes de exportar · ${monthName(ym)}</h2></div>
  ${chk(fech,fech?'Mês fechado':'Mês ainda aberto',fech?'Os lançamentos do mês não mudam mais.':'Feche o mês antes de exportar, para o arquivo não mudar depois.',['ffech','Ir para Fechamentos'])}
  ${chk(!pend,pend?`${pend} ${pend===1?'lançamento aguardando':'lançamentos aguardando'} aprovação`:'Nada aguardando aprovação',pend?'Só o que foi aprovado entra no pacote.':'Todos os lançamentos do mês estão aprovados.',['fapr','Ver aprovações'])}
  ${chk(!falta.length,falta.length?`${falta.length} ${falta.length===1?'conta usada sem':'contas usadas sem'} código contábil`:'Todas as contas usadas têm código contábil',falta.length?esc(falta.join(', '))+'. O contador informa os códigos.':'O arquivo sai pronto para importar.',['fplano','Abrir plano de contas'])}
  ${chk(!semcp,semcp?`${semcp} ${semcp===1?'saída sem':'saídas sem'} comprovante`:'Todas as saídas têm comprovante',semcp?'Só um aviso: dá para exportar assim.':'Dá para levar os comprovantes junto, em um ZIP.',['flanc','Ver lançamentos'])}</section>
 <section class="card cn-card rise" style="--d:2"><div class="sh"><h2>Sistema contábil</h2></div><p class="who" style="padding:0 20px 10px">Cada sistema contábil tem o seu formato de arquivo. O contador importa o arquivo no sistema dele.</p><div class="cn-pk"><div class="cn-p"><span class="htile" style="--s:38px;background:var(--brand-soft);color:var(--brand-text)">${ic('layers',17)}</span><span class="dkt"><b>Layout genérico</b><span>Colunas padrão, com conta de débito e de crédito. Serve para conferir e para sistemas que ainda não têm formato próprio.</span></span><em>CSV</em><button class="btn pri sm" data-a="export" data-v="${esc(exp)}">${ic('arrowDn',14,2)}Exportar</button></div><div class="cn-p off"><span class="htile" style="--s:38px;background:var(--surface-2);color:var(--ink-soft)">${ic('clipboard',17)}</span><span class="dkt"><b>Sistema do seu contador</b><span>Cada sistema contábil terá o seu formato. Os que forem pedidos entram aqui.</span></span><em>Em breve</em></div></div><div class="cn-zip"><button class="chipf ${S.excp?'on':''}" data-a="exCp">${ic('check',13,2.4)}Levar os comprovantes das saídas (ZIP)</button><small>Um arquivo por saída, com o nome do lançamento</small></div></section>
 <section class="card mtab cn-card rise" style="--d:3"><div class="sh" style="padding:18px 20px 6px"><h2>Prévia da exportação contábil</h2></div><p class="who" style="padding:0 20px 10px">Cada lançamento aprovado vira uma linha com débito e crédito. Código “a definir” = falta o contador informar.</p>
  <div class="trow cn thead"><span>Data</span><span>Histórico</span><span>Débito</span><span>Crédito</span><span>Valor</span></div>
  ${ls.length?ls.flatMap(x=>lcParts(x).map(p=>({...x,cc:p.cc,v:p.v,rtp:x.rt&&x.rt.length}))).slice(0,8).map(x=>{const a=contaOf(x.cat),bk='<i class="soft">banco · a definir</i>';return `<div class="trow cn"><span class="cn-d">${dBR(x.d)}</span><span class="cn-h"><b>${esc(x.desc)}</b><small>${esc(x.cat)} · ${esc(ccN(x.cc))}${x.rtp?' (parte do rateio)':''} · ${a?prTxt(a.pr).toLowerCase():''}</small></span><span class="cn-c">${x.tipo==='s'?cod(a):bk}</span><span class="cn-c">${x.tipo==='s'?bk:cod(a)}</span><span class="cn-v">${R$(x.v)}</span></div>`;}).join('')+`<div class="tfoot"><span>${ls.length>8?`Mostrando 8 de ${ls.length} linhas`:`${ls.length} ${ls.length===1?'linha':'linhas'}`}</span><span>${ls.length} lançamentos no mês</span></div>`:'<div class="mempty"><p>Nenhum lançamento aprovado neste mês.</p><span>Escolha outro mês no seletor.</span></div>'}</section>
 <div class="sx-note rise" style="--d:4;--c:var(--brand-text)">${ic('info',13,2)}<span><b>Outras listas:</b> <small>DRE, plano de contas, contas em aberto, contatos e as demais listas do Financeiro estão em Relatórios › Financeiro, com filtro e download. A confirmar com o contador: o sistema que ele usa, o arquivo que ele importa e se há campanhas com dinheiro que só pode ser gasto na finalidade.</small></span></div>`;}

/* ---------- Revisão do fechamento (obrigatória; Tiago, 07/11/2026, FIN-P-92) ----------
   Fechar o mês nunca é direto: o Admin vê a revisão e dá o ok. O que BLOQUEIA precisa estar em ordem; o que AVISA fica registrado no fechamento. */
const fLastDay=ym=>{const [y,m]=ym.split('-').map(Number);return ym+'-'+String(new Date(y,m,0).getDate()).padStart(2,'0');};
/* saldo da conta na data (o saldo de hoje menos o que foi aprovado depois) */
const fSaldoEm=(c,d)=>{const i=FCONTAS.indexOf(c);return imRound(c.atual-LANCS.filter(l=>l.st==='ok'&&(l.acc?l.acc===c.n:i===0)&&l.d>d).reduce((a,l)=>a+(l.tipo==='e'?l.v:-l.v),0));};
function fRevisao(ym){const last=fLastDay(ym),L=[];
 const ap=APROVS.length;L.push({k:'apr',blk:1,ok:!ap,t:'Nada aguardando aprovação',d:ap?`${ap} ${ap===1?'item aguarda':'itens aguardam'} o Admin.`:'Todos os lançamentos e importações estão aprovados.',go:['fapr','Ver aprovações']});
 const cn=fqConcN();L.push({k:'conc',blk:1,ok:!cn,t:'Conciliação em dia',d:cn?`${cn} ${cn===1?'sugestão ou exceção aberta':'sugestões e exceções abertas'} em Aprovações › Conciliação.`:'Nenhuma sugestão nem exceção aberta.',go:['fapr','Ver a Conciliação']});
 FCONTAS.filter(x=>x.tipo==='Conta bancária'||x.tipo==='Carteira de pagamento').forEach(x=>{const e=x.ext,fresh=e&&e.d>=last;
  if(!fresh){L.push({k:'sal'+x.n,blk:0,ok:false,t:`Saldo de ${x.n} sem extrato do fim do mês`,d:e?`O último extrato vai até ${dBR(e.d)}. Importe o extrato até ${dBR(last)} para conferir o saldo.`:'Nenhum extrato importado. Importe o extrato para conferir o saldo.',go:['fimp','Importar extrato']});return;}
  const al=fSaldoEm(x,last),ex=e.saldo==null?al:e.saldo,df=imRound(al-ex);L.push({k:'sal'+x.n,blk:1,ok:Math.abs(df)<.01,t:`Saldo de ${x.n} bate com o extrato`,d:Math.abs(df)<.01?`O saldo em ${dBR(last)} é ${R$(al)}, igual ao do extrato.`:`Em ${dBR(last)} o Alva tem ${R$(al)} e o extrato ${R$(ex)}: diferença de ${R$(Math.abs(df))}.`,go:['fimp','Importar e conciliar']});});
 const venc=PAGAR.filter(t=>tSd(t)>0&&t.venc&&t.venc<=last).length;L.push({k:'venc',blk:0,ok:!venc,t:'Contas vencidas sem baixa',d:venc?`${venc} ${venc===1?'conta a pagar vencida':'contas a pagar vencidas'} até o fim do mês.`:'Nenhuma conta vencida em aberto.',go:['fpag','Ver contas a pagar']});
 const scp=LANCS.filter(l=>l.st==='ok'&&l.comp===ym&&cpMiss(l)&&!l.tr).length;L.push({k:'cp',blk:0,ok:!scp,t:'Saídas sem comprovante',d:scp?`${scp} ${scp===1?'saída':'saídas'} do mês sem comprovante.`:'Todas as saídas do mês têm comprovante.',go:['flanc','Ver lançamentos']});
 const cxc=CAIXAS.flatMap(x=>x.entries||[]).filter(e=>e.t==='out'&&['conferir','pend'].includes(cxStat(e))&&(e.d||'').slice(0,7)===ym).length;L.push({k:'cx',blk:0,ok:!cxc,t:'Caixas com despesa a conferir',d:cxc?`${cxc} ${cxc===1?'despesa':'despesas'} de caixas de ministério, evento ou obra ainda a conferir.`:'Nenhuma despesa de caixa a conferir.',go:['fprev','Ver Caixas e vendas']});
 const adl=CAIXAS.filter(x=>x.main&&cxKind(x)==='proj'&&x.status!=='encerrado'&&cxAdvs(x).some(v=>v.st==='aberto'&&v.due&&v.due<=last)&&cxAdvOpen(x)>0).length;L.push({k:'adv',blk:0,ok:!adl,t:'Adiantamentos sem prestação de contas',d:adl?`${adl} ${adl===1?'caixa tem':'caixas têm'} adiantamento vencido sem prestação de contas.`:'Nenhum adiantamento vencido em aberto.',go:['fprev','Ver Caixas e vendas']});
 const sc=[...new Set(relItems(ym).map(x=>x.cat))].filter(n=>{const a=contaOf(n);return a&&!a.cc;}).length;L.push({k:'cod',blk:0,ok:!sc,t:'Contas do plano sem código contábil',d:sc?`${sc} ${sc===1?'conta usada no mês está':'contas usadas no mês estão'} sem código. O pacote do contador sai incompleto.`:'Todas as contas usadas têm código contábil.',go:['fplano','Abrir plano de contas']});
 return L;}
function fRevDlg(){const next=ymAdd(FCLOSED[0][0],1),mn=MONTHS[+next.slice(5)-1];
 if(!(next<NOWD.slice(0,7)))return toast('O mês ainda não terminou');
 const L=fRevisao(next),blk=L.filter(x=>x.blk&&!x.ok),av=L.filter(x=>!x.blk&&!x.ok),row=x=>`<div class="rv-r ${x.ok?'ok':x.blk?'bad':'warn'}"><span class="rv-i">${ic(x.ok?'check':'alert',15,2.4)}</span><span class="rv-t"><b>${esc(x.t)}</b><small>${esc(x.d)}</small></span>${x.ok?'':`<button type="button" class="btn sec sm" data-a="fRevGo" data-v="${x.go[0]}">${esc(x.go[1])}</button>`}</div>`;
 openDlg(`${dlgHead(`Revisão de ${monthName(next)}`,'Confira antes de fechar. Depois de fechado, ninguém lança, edita nem aprova lançamentos desse mês. O Admin pode reabrir até o próximo fechamento.')}
  <p class="rv-h">Precisa estar em ordem</p><div class="rv-l">${L.filter(x=>x.blk).map(row).join('')}</div>
  <p class="rv-h">Só avisos <small>não impedem o fechamento e ficam registrados nele</small></p><div class="rv-l">${L.filter(x=>!x.blk).map(row).join('')}</div>
  <div class="dfoot"><span class="who rv-s">${blk.length?`${blk.length} ${blk.length===1?'item impede':'itens impedem'} o fechamento.`:av.length?`${av.length} ${av.length===1?'aviso':'avisos'} vão ficar registrados.`:'Tudo em ordem.'}</span><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" id="fcOk" ${blk.length?'disabled':''}>${ic('lock',15,2)}${av.length?`Fechar ${mn} com ${av.length} ${av.length===1?'aviso':'avisos'}`:`Fechar ${mn}`}</button></div>`,'lg');
 $('#fcOk').onclick=()=>{if(blk.length)return;fFecha(next,av.length);};}
/* fecha o mês depois da revisão: o mês anterior passa a Selado e o fechamento guarda quem fechou e com quantos avisos */
function fFecha(next,av){if(!fRevisao(next).every(x=>x.ok||!x.blk))return false;FCLOSED[0][1]='Selado';FCLOSED.unshift([next,'Fechado',{by:'Rafael Pereira',av,at:NOWD}]);closeDlg();fRe();toast(`${monthName(next)} fechado${av?' com '+av+(av===1?' aviso':' avisos'):''}`);return true;}
/* ---------- Fechamentos ---------- */
function fFech(){
 const pend=APROVS.length,next=ymAdd(FCLOSED[0][0],1),ended=next<NOWD.slice(0,7),can=!pend&&ended,st=!ended?'wait':pend?'block':'ok';
 const stp=(l,c,b)=>`<span class="stp" style="--c:${c};--b:${b}"><i></i>${l}</span>`;
 return fHead('Fechamentos','Mês fechado trava os lançamentos daquele mês')
 +`<section class="card fc-next ${st} rise" style="--d:1"><div class="fc-nh"><span class="fc-ni">${ic(st==='ok'?'check':st==='block'?'alert':'clock',18,2)}</span><div class="fc-nt"><small>Próximo a fechar</small><b>${monthName(next)}</b><span>${st==='wait'?'O mês ainda não terminou.':st==='block'?`${pend} ${pend===1?'item aguardando aprovação impede':'itens aguardando aprovação impedem'} o fechamento.`:'Tudo aprovado: pode fechar.'}</span></div></div>
  <div class="fc-na">${pend?`<button class="btn sec" data-a="nav" data-v="fapr">Ver aprovações${stp(String(pend),'var(--st-sol)','var(--st-sol-bg)')}</button>`:''}<button class="btn pri" data-a="fechaMes" ${ended?'':'disabled'}>${ic('lock',15,2)}Revisar e fechar ${MONTHS[+next.slice(5)-1]}</button></div></section>
 <div class="sx-note rise" style="--d:2;--c:var(--brand-text);margin:0">${ic('info',13,2)}<span><b>Fechado</b> <small>trava os lançamentos e ainda pode ser reaberto pelo Admin.</small> <b>Selado</b> <small>não pode mais ser reaberto.</small></span></div>
 <section class="card fc-list rise" style="--d:3"><div class="fc-lh"><h2>Meses fechados</h2><span class="who">${FCLOSED.length} ${FCLOSED.length===1?'mês':'meses'}</span></div>
  ${FCLOSED.map(([ym,s,x])=>`<div class="fc-r"><span class="fc-ri ${s==='Fechado'?'f':'s'}">${ic(s==='Fechado'?'check':'lock',14,2.2)}</span><b>${monthName(ym)}${x?`<small class="fc-by">por ${esc(x.by)}${x.av?' · fechado com '+x.av+(x.av===1?' aviso':' avisos'):' · sem avisos'}</small>`:''}</b><span class="fc-st">${s==='Fechado'?stp('Fechado','var(--st-int)','var(--st-int-bg)'):stp('Selado','var(--ink-muted)','var(--surface-2)')}</span><span class="fc-ac">${s==='Fechado'?'<button class="btn sec sm" data-a="fechaRe">Reabrir</button>':''}</span></div>`).join('')}</section>`;
}


function fAfter(){
 const q=$('#lq');if(q)q.addEventListener('input',e=>{S.lq=e.target.value;const c=e.target.selectionStart;fRe();const n=$('#lq');n.focus();n.setSelectionRange(c,c);});
 const d=$('[name=dcc]');if(d)d.addEventListener('change',()=>{S.dreCC=d.value;S.dreOpen=null;fRe();});
}
const fGo=()=>{render();window.scrollTo({top:0});};
const fRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
const apFalta=a=>a.lid?(cpMiss(LANCS.find(x=>x.id===a.lid)||{})?1:0):(a.lids||[]).filter(id=>cpMiss(LANCS.find(x=>x.id===id)||{})).length;
const apCpBlock=a=>{if(a.tipo==='imp'){const n=apFalta(a);return n?`<p class="fi-cpw"><span>${ic('alert',14,2.2)}<b>${n} ${n===1?'saída sem comprovante':'saídas sem comprovante'}.</b> Dá para anexar em <button class="lnk inl" data-a="apGoCp">Lançamentos › Aguardando</button> ou aprovar assim mesmo.</span></p>`:'';}
 const l=LANCS.find(x=>x.id===a.lid);if(!l||!cpReq(l))return '';
 return l.cp?`<p class="fi-cpw ok"><span>${ic('file',14,2)}Comprovante <b>${esc(l.cp)}</b></span></p>`:`<div class="fi-cpw"><span>${ic('alert',14,2.2)}<b>Sem comprovante.</b> Você pode anexar agora ou aprovar assim mesmo.</span><label class="cp-pick sm"><input type="file" data-apcp="${l.id}" accept=".pdf,image/*"><span class="cp-t">${ic('plus',14,2.2)}<b>Anexar</b></span></label></div>`;};
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.dataset||!t.dataset.apcp||!t.files||!t.files[0])return;const l=LANCS.find(x=>x.id===t.dataset.apcp);if(l){l.cp=t.files[0].name;fRe();toast('Comprovante anexado');}});
const FIA={
 fBar:v=>{S.fbar=+v;fRe();},
 lcNew:()=>lcForm(),lcEdit:(v,b,e)=>{if(e&&e.target.closest('.hact')&&!e.target.closest('.pi'))return;closePops();lcForm(v);},lcF:v=>{S.lf=v;fRe();},
 lcMenu:v=>{const p=$('#lcPop-'+v);closePops(p);p.classList.toggle('open');},
 lcDup:v=>{closePops();const x=LANCS.find(y=>y.id===v);lcForm();setTimeout(()=>{const f=$('#lcF');f.desc.value=x.desc;f.v.value=String(x.v).replace('.',',');$('#lcF [data-tp='+x.tipo+']').click();f.cat.value=x.cat;f.cc.value=x.cc||'cc1';f.ct.value=x.ct||'';f.dispatchEvent(new Event('input'));},30);},
 lcDel:v=>{closePops();const x=LANCS.find(y=>y.id===v);confirmDel({title:'Excluir este lançamento?',body:`“${esc(x.desc)}” · ${R$(x.v)}. ${x.st==='ok'?'O saldo do mês será recalculado.':'Ele também sai das aprovações.'}`,onConfirm:()=>{const i=LANCS.indexOf(x),ai=APROVS.findIndex(a=>a.lid===x.id),ap=ai>=0?APROVS.splice(ai,1)[0]:null;LANCS.splice(i,1);fRe();toast('Lançamento excluído',()=>{LANCS.splice(i,0,x);if(ap)APROVS.splice(ai,0,ap);fRe();});}});},
 tFl:v=>{S.tfl=S.tfl===v?'':v;fRe();},tRepOnly:()=>{S.trep=!S.trep;fRe();},tParOnly:()=>{S.tpar=!S.tpar;fRe();},tRepEnd:v=>{const [k,id]=v.split('|'),L=tBr(k),t=L.find(x=>x.id===id);if(!t||!t.sid)return;const gone=L.filter(x=>x.sid===t.sid&&x.si>t.si&&!x.baixas.length),fim0=t.fim;gone.forEach(x=>L.splice(L.indexOf(x),1));L.filter(x=>x.sid===t.sid).forEach(x=>{x.fim=t.comp;});fRe();toast('Repetição encerrada. Esta é a última conta',()=>{gone.forEach(x=>L.push(x));L.filter(x=>x.sid===t.sid).forEach(x=>{x.fim=fim0;});fRe();});},
 cpNew:()=>titForm('p'),tNew:v=>titForm(v),
 imRule:v=>{const I=imS(),r=I.rows[+v];if(!r)return;const tp=r.v>0?'e':'s',w0=imKey(r.memo)[0]||'';
  openDlg(`${dlgHead('Criar regra','Toda linha futura que combinar vai receber estes dados. A regra vale mais que o histórico.')}<form id="irF" class="fgrid" novalidate><label class="fld wide"><span class="fl">Se a descrição contém</span><input name="w" value="${esc(w0)}" maxlength="40" autocomplete="off"><span class="err"></span></label><label class="fld wide"><span class="fl">Conta do plano</span>${selw('cat',optConta(tp,r.cat||''))}</label><label class="fld"><span class="fl">Centro de custo</span>${selw('cc',optCC(r.cc||'cc1'))}</label><label class="fld"><span class="fl">Contato <small>opcional</small></span>${selw('ct',optCt(r.ct||'',tp==='e'?'c':'f'))}</label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Criar regra</button></div></form>`,'sm');
  const f=$('#irF');f.addEventListener('submit',e=>{e.preventDefault();const w=norm(f.w.value.trim());if(w.length<3){const fl=f.w.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Use pelo menos 3 letras';return;}if(!f.cat.value)return toast('Escolha a conta do plano');
   IMRULES.push({id:'ir'+(++_imru),w,tp,cat:f.cat.value,cc:f.cc.value,ct:f.ct.value});let n=0;I.rows.forEach(x=>{if(x.st==='nova'&&(x.v>0?'e':'s')===tp&&norm(x.memo).includes(w)){x.cat=f.cat.value;x.cc=f.cc.value;x.ct=f.ct.value;x.msg=`Regra criada por você: a descrição contém “${w}”.`;n++;}});closeDlg();fGo();toast(`Regra criada${n?' · aplicada a '+n+(n===1?' linha':' linhas'):''}`);});},
 imRuleDel:v=>{const i=IMRULES.findIndex(x=>x.id===v);if(i<0)return;const r=IMRULES.splice(i,1)[0];fGo();toast('Regra excluída',()=>{IMRULES.push(r);fGo();});},
 imRt:v=>{const I=imS(),r=I.rows[+v];if(!r)return;openDlg(`${dlgHead('Ratear esta linha',esc(imTitle(r.memo))+' · '+R$(Math.abs(r.v)))}<form id="rtF" class="fgrid" novalidate>${rtField(r.rt||RTMOD[0].parts)}<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">Aplicar</button></div></form>`,'sm');const f=$('#rtF');let RT=null;RT=rtBind(f,r.rt||RTMOD[0].parts,()=>Math.abs(r.v),()=>{const b=f.querySelector('[type=submit]');if(b&&RT)b.disabled=!RT.ok();},null);f.addEventListener('submit',e=>{e.preventDefault();const p=RT.read();if(!p)return toast('A soma precisa fechar 100%');r.rt=p;r.cc=p[0].cc;RT.save();closeDlg();fGo();toast('Linha rateada em '+p.length+' centros');});},tEdit:v=>{const [k,id]=v.split('|');titForm(k,id);},tBaixa:v=>tBaixa(v),tUndo:v=>tUndo(v),
 lcRev:v=>{closePops();const x=LANCS.find(y=>y.id===v);
  openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Reverter este lançamento?',`“${esc(x.desc)}” · ${R$(x.v)}. Em vez de apagar, o Alva cria o lançamento inverso e o original continua no histórico.`)}</div><label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="rvWhy" rows="2" placeholder="Ex.: valor lançado em duplicidade"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="rvOk" disabled>Reverter</button></div>`,'sm del');
  const w=$('#rvWhy'),b=$('#rvOk');w.addEventListener('input',()=>{b.disabled=!w.value.trim();});
  b.onclick=()=>{const n=LC(NOWD,x.comp,'Reversão: '+x.desc,x.cat,x.tipo==='e'?'s':'e',x.v,'ok','Rafael Pereira',{cc:x.cc,ct:x.ct});LANCS.push(n);x.rev=true;closeDlg();fRe();toast('Lançamento revertido',()=>{LANCS.splice(LANCS.indexOf(n),1);x.rev=false;fRe();});};},
 fcNew:()=>{openDlg(`${dlgHead('Nova conta financeira','Conta bancária ou caixa físico. O saldo inicial vale a partir da data informada. As carteiras de pagamento (Mercado Pago e Asaas) não se criam aqui: nascem sozinhas quando você configura a conexão, em Parâmetros › Conectores.')}<form id="fcF" class="fgrid" novalidate>
   <label class="fld wide"><span class="fl">Nome</span><input name="n" placeholder="Ex.: Conta da cantina" autocomplete="off" maxlength="40"></label>
   <div class="fld wide"><span class="fl">Tipo</span><input type="hidden" name="t" value="Conta bancária"><div class="fi-tg fc-tp">${[['Conta bancária','building'],['Caixa físico','wallet']].map((x,i)=>`<button type="button" data-t="${x[0]}" class="${i?'':'on'}">${ic(x[1],15,2)}${x[0]}</button>`).join('')}</div></div>
   <div class="igr-fold open wide" id="fcBk"><div><label class="fld" style="padding-bottom:2px"><span class="fl">Banco <small>opcional</small></span><input name="b" placeholder="Ex.: Itaú" autocomplete="off"></label></div></div>
   <label class="fld"><span class="fl">Saldo inicial</span><span class="fi-amt e"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld"><span class="fl">Saldo em</span><input type="date" name="d" value="${NOWD}"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Cadastrar conta</button></div></form>`,'sm');
  const f=$('#fcF'),ok=f.querySelector('[type=submit]');f.addEventListener('input',()=>{ok.disabled=!f.n.value.trim();});setTimeout(()=>f.n.focus(),80);
  $$('.fc-tp button',f).forEach(b=>b.onclick=()=>{f.t.value=b.dataset.t;$$('.fc-tp button',f).forEach(y=>y.classList.toggle('on',y===b));const bk=$('#fcBk'),on=b.dataset.t==='Conta bancária';bk.classList.toggle('open',on);bk.toggleAttribute('inert',!on);});
  f.addEventListener('submit',e=>{e.preventDefault();const n=f.n.value.trim();if(FCONTAS.some(c=>norm(c.n)===norm(n)))return toast('Já existe uma conta com esse nome');const v=+String(f.v.value).replace(/\./g,'').replace(',','.')||0;const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{FCONTAS.push({n,tipo:f.t.value,banco:f.t.value==='Caixa físico'?'':f.b.value.trim(),ini:v,atual:v,desde:f.d.value||NOWD});closeDlg();fRe();toast('Conta cadastrada');},450);});},
 fTransf:(v)=>{const a0=(v!=null&&v!==''&&FCONTAS[+v])?+v:0,b0=a0===0?Math.min(1,FCONTAS.length-1):0,opt=sel=>FCONTAS.map((c,i)=>`<option value="${i}" ${i===sel?'selected':''}>${esc(c.n)} · ${R$(c.atual)}</option>`).join('');
  openDlg(`${dlgHead('Transferir entre contas','Gera uma saída na origem e uma entrada no destino; entra como pendente em Aprovações.')}<form id="ftF" class="fgrid" novalidate>
   <label class="fld"><span class="fl">De</span><span class="selw"><select name="a">${opt(a0)}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Para</span><span class="selw"><select name="b">${opt(b0)}</select>${ic('updown',14)}</span></label>
   <label class="fld"><span class="fl">Valor</span><span class="fi-amt s"><em>R$</em><input name="v" inputmode="decimal" placeholder="0,00"></span></label>
   <label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${NOWD}"></label>
   <label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><input name="t" placeholder="Ex.: Reforço do caixa da cantina" autocomplete="off"></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Transferir</button></div></form>`,'sm');
  const f=$('#ftF'),ok=f.querySelector('[type=submit]'),val=()=>+String(f.v.value).replace(/\./g,'').replace(',','.')||0,chk=()=>{ok.disabled=!(val()>0)||f.a.value===f.b.value;};f.addEventListener('input',chk);f.addEventListener('change',chk);
  f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const a=FCONTAS[+f.a.value],b=FCONTAS[+f.b.value],v=val(),d=f.d.value||NOWD,t=f.t.value.trim();
   const mk=(acc,tipo,desc)=>{const l=LC(d,d.slice(0,7),desc,'Transferência',tipo,v,'ok','Rafael Pereira');l.tr=true;l.acc=acc;LANCS.push(l);};
   mk(a.n,'s',`Transferência para ${b.n}${t?' · '+t:''}`);mk(b.n,'e',`Transferência de ${a.n}${t?' · '+t:''}`);closeDlg();fRe();toast('Transferência registrada e aprovada');});},
 relTab:v=>{S.relTab=v;fRe();}, fpvTab:v=>{S.fpv=v;S.fqSt=null;S.fqCxI=null;fRe();},fpvC:v=>{S.fpvC=v;fRe();},
 catNew:()=>catForm(),catEdit:v=>catForm(v),
 catOff:v=>{const was=FINAT.has(v);if(was)FINAT.delete(v);else FINAT.add(v);fRe();toast(was?`${v} reativada`:`${v} inativada: sai das escolhas, o histórico continua`,()=>{if(was)FINAT.add(v);else FINAT.delete(v);fRe();});},
 fechaMes:()=>fRevDlg(),fRevGo:v=>{closeDlg();A.nav(v);},
 fechaRe:()=>{openDlg(`${dlgHead('Reabrir o último mês fechado?',`${monthName(FCLOSED[0][0])} volta a aceitar lançamentos. Fica registrado quem reabriu e o motivo.`)}<label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="frWhy" rows="2" placeholder="Ex.: faltou lançar uma oferta de domingo"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" id="frOk" disabled>Reabrir</button></div>`,'sm');
  const w=$('#frWhy'),b=$('#frOk');w.addEventListener('input',()=>{b.disabled=!w.value.trim();});b.onclick=()=>{const m=FCLOSED.shift();closeDlg();fRe();toast(`${monthName(m[0])} reaberto`);};},
 crNew:()=>titForm('r'),
 dreV:v=>{S.dreV=v;S.dreOpen=null;fRe();},dreOpen:v=>{S.dreOpen=S.dreOpen===v?null:v;fRe();},
 ccNew:()=>ccForm(),ccEdit:v=>ccForm(v),ccOff:v=>{const c=CCUSTOS.find(x=>x.id===v);c.on=!c.on;fRe();toast(c.on?`${c.n} reativado`:`${c.n} inativado: sai das escolhas, o histórico continua`,()=>{c.on=!c.on;fRe();});},
 ctNew:()=>ctForm(),ctEdit:v=>ctForm(v),
 exCp:()=>{S.excp=!S.excp;fRe();},
 fet:v=>{S.fet=v;fRe();},feO:v=>{S.feo=v;fRe();},feTreat:v=>feTreat(v),feCanais:()=>feCanais(),
 feArq:v=>{const d=FEDOCS.find(x=>x.id===v);d.st='arq';fRe();toast('Documento arquivado',()=>{d.st='pend';fRe();});},
 feCopy:()=>{try{navigator.clipboard&&navigator.clipboard.writeText(FE_MAIL);}catch(e){}toast('Endereço copiado');},
 feCfg:()=>{closeDlg();S.spTab='conectores';A.nav('parametros');},
 feUp:()=>{openDlg(`${dlgHead('Enviar documentos','PDF ou imagem. Pode escolher vários de uma vez e tratar depois.')}<label class="cp-pick"><input type="file" id="feFiles" multiple accept=".pdf,image/*"><span class="cp-t">${ic('upload',18,2)}<b>Escolher arquivos</b><small>ou arraste para cá</small></span></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button></div>`,'sm');
  $('#feFiles').onchange=e=>{const n=feAdd(e.target.files);closeDlg();S.fet='pend';fRe();toast(`${n.length} ${n.length===1?'documento':'documentos'} na caixa de entrada`);};},fpk:v=>{S.fpk=v;fRe();},plCt:()=>{S.plCt=!S.plCt;fRe();},
 fcxOpen:v=>{S.fcx=+v;fGo();},fcxBack:()=>{S.fcx=null;fGo();},
 fctOpen:(v,b,e)=>{if(e&&e.target.closest('.pc-a'))return;S.fct=v;S.fctTab='pend';S.fctH='todos';fGo();},fctBack:()=>{S.fct=null;fGo();},fctTab:v=>{S.fctTab=v;fRe();},fctH:v=>{S.fctH=v;fRe();},fctK:v=>{S.fctK=v;fRe();},ftk:v=>{S.ftk=v;S.tsel=[];fRe();},ftkGo:v=>{S.ftk=v;S.tsel=[];A.nav('fpag');},
 tSel:v=>{const a=S.tsel||(S.tsel=[]),i=a.indexOf(v);if(i<0)a.push(v);else a.splice(i,1);fRe();},
 tSelAll:()=>{S.tsel=PAGAR.filter(t=>tSd(t)>0&&tDd(t,'p')>=0).map(t=>t.id);fRe();},tSelClr:()=>{S.tsel=[];fRe();},
 tPayMany:()=>{const ids=(S.tsel||[]).slice(),ac=(FCONTAS.find(c=>c.n===S.tac)||FCONTAS[0]).n,done=[];
  ids.forEach(id=>{const t=PAGAR.find(x=>x.id===id);if(!t||tSd(t)<=0||tDd(t,'p')<0)return;const v=tSd(t),l=LC(NOWD,t.comp,t.desc,t.cat,'s',v,'ok','Rafael Pereira',{cc:t.cc,rt:t.rt,ct:t.ct,acc:ac,orig:'Baixa de conta',cp:t.doc||''}),bx={d:NOWD,v,j:0,dc:0,ids:[l.id],cp:t.doc||''};LANCS.push(l);t.baixas.push(bx);tSync(t,'p');done.push([t,l,bx]);});
  S.tsel=[];fRe();toast(`${done.length} ${done.length===1?'conta paga':'contas pagas'} · ${R$(done.reduce((a,x)=>a+x[2].v,0))} aprovados`,()=>{done.forEach(([t,l,bx])=>{LANCS.splice(LANCS.indexOf(l),1);t.baixas.splice(t.baixas.indexOf(bx),1);tSync(t,'p');});fRe();});},
 apX:v=>{S.apOpen=S.apOpen===v?null:v;fRe();},
 ccIgn:v=>{const it=v.slice(0,2)==='cs'?FQCS.find(x=>x.id===v):fqExc().find(x=>x.id===v);if(!it)return;
  openDlg(`${dlgHead('Ignorar esta linha?','Ela sai das pendências e fica guardada com o motivo. Dá para desfazer.')}<form id="ciF" class="fgrid one" novalidate><label class="fld"><span class="fl">Motivo</span><textarea class="ta" name="w" rows="3" maxlength="200" placeholder="Ex.: estorno já tratado, teste da maquininha, venda paga em dinheiro"></textarea><span class="err"></span></label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Ignorar</button></div></form>`,'sm');
  const f=$('#ciF');f.addEventListener('submit',e=>{e.preventDefault();const w=f.w.value.trim();if(w.length<3){const fl=f.w.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Diga o motivo';return;}
   if(v.slice(0,2)==='cs'){it.st='ign';it.igWhy=w;}else FQCX[v]={st:'ign',why:w,it:{...it}};closeDlg();fRe();toast('Linha ignorada',()=>{A.ccUnIgn(v);});});},
 ccUnIgn:v=>{if(v.slice(0,2)==='cs'){const c=FQCS.find(x=>x.id===v);if(c){c.st='no';delete c.igWhy;}}else delete FQCX[v];fRe();},
 ccLink:v=>{const it=fqExc().find(x=>x.id===v);if(!it)return;const L=fqSales().filter(x=>fqV(x).st==='conferir'&&fqMaqOf(x)&&fqMaqOf(x).maq.mod===it.store).sort((p,q)=>Math.abs(p.total-it.total)-Math.abs(q.total-it.total)).slice(0,6);
  openDlg(`${dlgHead('Vincular a uma venda','Escolha a venda do módulo que corresponde a esta cobrança.')}<form id="clF" class="fgrid one" novalidate>${L.length?`<div class="pick">${L.map((x,i)=>`<label class="pk"><input type="radio" name="s" value="${x.id}" ${i===0?'checked':''}><span><b>${R$(x.total)} · ${fqLbl(x)}</b><small>${dBR(x.date).slice(0,5)} ${x.time}</small></span></label>`).join('')}</div>`:'<p class="who">Não há venda do módulo esperando conferência.</p>'}<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" ${L.length?'':'disabled'}>Vincular</button></div></form>`,'sm');
  const f=$('#clF');f.addEventListener('submit',e=>{e.preventDefault();const id=(f.querySelector('[name=s]:checked')||{}).value,sv=fqSales().find(x=>x.id===id);if(!sv)return;fqLink(sv,'manual');FQCX[v]={st:'link',sale:id,it:{...it}};closeDlg();fRe();toast('Cobrança vinculada à venda',()=>{A.ccUndo(id);});});},
 ccCulto:v=>{const c=FQCS.find(x=>x.id===v);if(!c)return;
  openDlg(`${dlgHead('Escolher o culto','Em qual culto esta oferta foi dada?')}<form id="ccF" class="fgrid one" novalidate><div class="pick">${FQCULTOS.map((u,i)=>`<label class="pk"><input type="radio" name="u" value="${esc(u)}" ${i===0?'checked':''}><span><b>${esc(u)}</b></span></label>`).join('')}</div><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Classificar como oferta</button></div></form>`,'sm');
  const f=$('#ccF');f.addEventListener('submit',e=>{e.preventDefault();c.st='ok';c.culto=(f.querySelector('[name=u]:checked')||{}).value;closeDlg();fRe();toast('Classificada como oferta do culto',()=>{c.st='no';delete c.culto;fRe();});});},
 ccAvulsa:v=>{const c=FQCS.find(x=>x.id===v);if(!c)return;c.st='ok';c.culto='Oferta avulsa (sem culto)';fRe();toast('Classificada como oferta avulsa',()=>{c.st='no';delete c.culto;fRe();});},
 apTab:v=>{S.apTab=v==='c'?'c':v==='i'?'i':'l';fRe();},
 ccOk:v=>{const c=FQCS.find(x=>x.id===v);if(!c)return;c.st='ok';fRe();toast('Vínculo confirmado · cobrança ligada à receita',()=>{delete c.st;fRe();});},
 ccNo:v=>{const c=FQCS.find(x=>x.id===v);if(!c)return;c.st='no';fRe();toast('Foi para as exceções',()=>{delete c.st;fRe();});},
 ccAll:(v,b)=>busy(b,700,'Confirmadas',()=>{const L=FQCS.filter(c=>!c.st);L.forEach(c=>{c.st='ok';});fRe();toast(`${L.length} vínculos confirmados`,()=>{L.forEach(c=>{delete c.st;});fRe();});}),
 ccUndo:v=>{const c=FQCS.find(x=>x.id===v);if(c){delete c.st;fRe();return toast('Vínculo desfeito · voltou a ser sugestão',()=>{c.st='ok';fRe();});}
  const sv=fqSales().find(x=>x.id===v),s0=sv&&FQST[v];if(!s0||s0.st!=='maq')return toast('Esta venda já foi recebida no banco: não dá para desfazer aqui');
  const how=s0.how;for(let i=FQREC.length-1;i>=0;i--)if(FQREC[i].sale===v)FQREC.splice(i,1);FQST[v]={st:'conferir'};Object.keys(FQCX).forEach(k=>{if(FQCX[k].st==='link'&&FQCX[k].sale===v)delete FQCX[k];});fRe();toast('Vínculo desfeito · a venda voltou para a conferir',()=>{fqLink(sv,how);fRe();});},
 apOk:(v,b)=>{const a=APROVS.find(x=>x.id===v);busy(b,600,'Aprovado',()=>{document.getElementById(v).classList.add('fi-gone');setTimeout(()=>{APROVS.splice(APROVS.indexOf(a),1);if(a.tipo==='verba')cxVerbaDecide(a,'aprovada');if(a.tipo==='enc')cxEncApprove(a);if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l){l.st='ok';fApply(l);}}(a.lids||[]).forEach(id=>{const l=LANCS.find(x=>x.id===id);if(l){l.st='ok';fApply(l);}});fRe();toast(a.tipo==='imp'?`${a.n} lançamentos importados`:a.tipo==='enc'?'Encerramento aprovado · caixa fechado e sobra destinada':a.tipo==='verba'?'Verba aprovada · já aparece no caixa':'Lançamento aprovado · já conta no saldo');},350);});},
 apNo:v=>{const a=APROVS.find(x=>x.id===v);openDlg(`<div class="cdel"><span class="cdi">${ic('alert',20,2)}</span>${dlgHead('Rejeitar?',`“${esc(a.desc)}” não entra no caixa. ${esc(a.who.split(' ')[0])} recebe o motivo.`)}</div><label class="fld"><span class="fl">Motivo</span><textarea class="ta" id="apWhy" rows="2" placeholder="Ex.: valor diferente do comprovante"></textarea></label><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn dang" id="apNoOk">Rejeitar</button></div>`,'sm del');
  $('#apNoOk').onclick=()=>{APROVS.splice(APROVS.indexOf(a),1);if(a.tipo==='enc'){a.reason=(($('#apWhy')||{}).value||'').trim();cxEncReject(a,a.reason);}if(a.tipo==='verba'){a.reason=(($('#apWhy')||{}).value||'').trim();cxVerbaDecide(a,'recusada');}imUndo(a);if(a.lid){const i=LANCS.findIndex(x=>x.id===a.lid);if(i>=0)LANCS.splice(i,1);}closeDlg();fRe();toast('Rejeitado · motivo enviado');};},
 apAll:(v,b)=>busy(b,800,'Aprovados',()=>{const LL=apList(S.apTab==='i'?'i':'l'),n=LL.length,sem=LL.reduce((x,a)=>x+apFalta(a),0);LL.forEach(a=>{if(a.tipo==='verba')cxVerbaDecide(a,'aprovada');if(a.tipo==='enc')cxEncApprove(a);if(a.lid){const l=LANCS.find(x=>x.id===a.lid);if(l){l.st='ok';fApply(l);}}(a.lids||[]).forEach(id=>{const l=LANCS.find(x=>x.id===id);if(l){l.st='ok';fApply(l);}});});LL.forEach(a=>APROVS.splice(APROVS.indexOf(a),1));setTimeout(fRe,300);toast(sem?`${n} itens aprovados · ${sem} ${sem===1?'saída sem comprovante':'saídas sem comprovante'}`:`${n} itens aprovados`);}),
 apGoCp:()=>{S.lf='pend';A.nav('flanc');},
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
 imSel:v=>{const I=imS(),a=I.sel||(I.sel=[]),i=a.indexOf(+v);if(i<0)a.push(+v);else a.splice(i,1);fRe();},
 imSelAll:()=>{const I=imS(),sh=I.rows.map((r,i)=>[r,i]).filter(x=>imIn(x[0],I.filter||'todas')).map(x=>x[1]),all=sh.length&&sh.every(i=>(I.sel||[]).includes(i));I.sel=all?(I.sel||[]).filter(i=>!sh.includes(i)):[...new Set([...(I.sel||[]),...sh])];fRe();},
 imSelClr:()=>{imS().sel=[];fRe();},
 imBatch:()=>{const I=imS(),idx=(I.sel||[]).filter(i=>I.rows[i]);if(!idx.length)return;const R=idx.map(i=>I.rows[i]),ent=R.every(r=>r.v>0),sai=R.every(r=>r.v<0),mixed=!ent&&!sai,N=R.length;
  const row=(k,l,inner,dis)=>`<div class="fld im-bf"><label class="im-bk"><input type="checkbox" data-f="${k}" ${dis?'disabled':''}><span>${l}</span></label>${inner}</div>`,sw=(n,o)=>`<span class="selw"><select name="${n}" disabled>${o}</select>${ic('updown',14)}</span>`;
  openDlg(`${dlgHead('Editar em lote',`${N} ${N===1?'linha selecionada':'linhas selecionadas'}`)}<p class="who" style="margin:0 0 12px">Marque o que quer trocar. O que ficar desmarcado continua como está em cada linha.</p><form id="imB" class="fgrid one" novalidate>${row('act','Ação',sw('act','<option value="criar">Criar lançamento</option><option value="ignorar">Ignorar</option>'))}${row('cat','Conta do plano',mixed?'<small class="who">Marque só entradas ou só saídas para trocar a conta.</small>':sw('cat',optConta(ent?'e':'s','')),mixed)}${row('ct','Contato',sw('ct',optCt('',ent?'c':sai?'f':'')))}${row('cc','Centro de custo',sw('cc',optCC('cc1')))}<p class="fi-note">${ic('info',14)}<span>Conta, contato e centro só valem para as linhas que vão <b>criar lançamento</b>; as de baixa herdam da conta que está sendo baixada. Aplicar <b>não confirma</b> a importação.</span></p><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" disabled>Aplicar às ${N} ${N===1?'linha':'linhas'}</button></div></form>`,'sm');
  const fm=$('#imB'),ok=fm.querySelector('[type=submit]'),chk=()=>{const on=[...fm.querySelectorAll('[data-f]')].filter(c=>c.checked);ok.disabled=!on.length||on.some(c=>c.dataset.f==='cat'&&!fm.cat.value);};
  fm.addEventListener('change',e=>{const c=e.target;if(c.dataset&&c.dataset.f&&fm.elements[c.dataset.f])fm.elements[c.dataset.f].disabled=!c.checked;chk();});
  fm.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;const on=k=>{const c=fm.querySelector('[data-f="'+k+'"]');return c&&c.checked;};let skip=0;
   R.forEach(r=>{if(on('act')){if(r.actions.some(a=>a[0]===fm.act.value))r.act=fm.act.value;else skip++;}if(r.act==='criar'){if(on('cat'))r.cat=fm.cat.value;if(on('ct'))r.ct=fm.ct.value;if(on('cc'))r.cc=fm.cc.value;}});
   I.sel=[];closeDlg();fRe();toast(`Aplicado a ${N-(on('act')?skip:0)} ${N-(on('act')?skip:0)===1?'linha':'linhas'}${skip&&on('act')?` · ${skip} não aceitam essa ação`:''}`);});},
 fckT:v=>{S.fck=v;fRe();},
 fqVend:v=>{S.fqSt=v;S.fqFm='todas';S.fqSf='todas';S.fqN=20;fGo();},fqVendBack:()=>{S.fqSt=null;fGo();},
 fqFm:v=>{S.fqFm=v;S.fqN=20;fRe();},fqSf:v=>{S.fqSf=v;S.fqN=20;fRe();},fqMais:()=>{S.fqN=(S.fqN||20)+20;fRe();},
 fqSale:v=>fqSaleDlg(v),fqCx:v=>{S.fqCxI=v;S.fqCt=null;S.fqFm='todas';S.fqSf='todas';S.fqN=30;S.fqCq='';fGo();},fqCxTab:v=>{S.fqCt=v;S.fqFm='todas';S.fqSf='todas';S.fqN=30;S.fqCq='';fRe();},fqLc:v=>fqLcDlg(v),fqZEnc:v=>{const u=pcuGet(v),j=u&&u.cx&&typeof zJob==='function'?zJob(u.cx.ownerId):null;if(!j||pcPend(u))return;j.enc={by:'Financeiro',d:NOWD};cxUnitAll(u.cx).forEach(y=>{y.status='encerrado';y.closedAt=NOWD;});zLog(j,'Obra encerrada pelo Financeiro','Financeiro');S.fqCxI=null;fGo();toast('Obra encerrada. Ela sai do quadro e fica em Encerradas');},fqIniOk:v=>{const u=pcuGet(v);if(u&&u.cx&&u.cx.ini){u.cx.ini.st='confirmado';fRe();toast('Saldo inicial confirmado');}},fqVerba:v=>fqVerbaForm(v),fqAdv:v=>fqAdvForm(v),fqAdvOk:v=>{const [k,id]=v.split('|'),u=pcuGet(k),a=u&&u.cx&&cxAdvs(u.cx).find(y=>y.id===id);if(!a)return;const ret=cxAdvSettle(u.cx,a);fRe();toast(ret>0?'Baixa dada. '+R$(ret/100)+' sem justificativa voltam para a igreja':'Baixa dada: tudo justificado');},lcVerba:()=>{closeDlg();setTimeout(()=>fqVerbaForm(),60);},fqCxBack:()=>{S.fqCxI=null;fGo();},fqPay:v=>fqPayDlg(v),
 fqMaqNew:()=>fqMaqForm(),fqMaqEdit:v=>fqMaqForm(v),fqMaqDel:v=>fqMaqDel(v),
 fqTotNew:()=>fqTotForm(),fqTotEdit:v=>fqTotForm(v),fqTotDel:v=>fqTotDel(v),
 fqImp:()=>{S.im={step:1,type:'maq',conta:0,file:null,filter:'todas',adq:(FQMAQ[0]||{}).adq};A.nav('fimp');},
 fqImpPag:()=>{S.im={step:1,type:'pag',conta:0,file:null,filter:'todas',adq:'Asaas'};A.nav('fimp');},
 fqVerCd:()=>{S.fpv='vd';A.nav('fprev');},
 fqBanco:()=>{S.im={step:1,type:'extrato',conta:Math.max(0,FCONTAS.findIndex(c=>c.tipo==='Conta bancária')),file:null,filter:'todas'};A.nav('fimp');},
 imAgain:()=>{const I=imS();I.rows=imAnalyze(I);I.step=2;I.filter='todas';fGo();},
 imConfirm:()=>{const I=imS();if(fqPg(I))return fqConfirm(I);const e=imEff(I.rows),ex=I.type==='extrato';
  if(e.dec){I.filter='atencao';fRe();return toast(`Decida ${e.dec} possível(is) duplicado(s) antes de confirmar: o Alva nunca decide por você.`);}
  if(ex&&I.rows.some(r=>r.act==='criar'&&!r.cat)){I.filter='todas';fRe();return toast('Escolha a conta do plano das linhas novas antes de confirmar.');}
  if(!(e.criar+e.baixar+e.baixarRec+e.aplicar+e.atualizar))return toast('Nenhuma linha será importada com as ações atuais.');
  openDlg(`${dlgHead('Confirmar importação?')}<p class="who" style="margin:0 0 14px">${ex?`Serão ${e.criar} lançamento(s) criado(s) e ${e.baixar+e.baixarRec} baixa(s) de conta a pagar, a receber ou de recebíveis da maquininha. Tudo vai para <b>Aprovações</b>; o efeito no saldo é ${R$(e.saldo,true)} depois de aprovado.`:`Serão ${e.aplicar+e.atualizar} código(s) contábil(is) preenchido(s) e ${e.criar} conta(s) criada(s). Nada é apagado.`}</p><div class="dfoot"><button class="btn sec" data-a="closeDlg">Voltar</button><button class="btn pri" id="imGo">${ic('check',14,2.4)}Confirmar</button></div>`,'sm');
  $('#imGo').onclick=ev=>busy(ev.currentTarget,900,'Importado',()=>{I.res=imApply(I);I.step=3;closeDlg();fGo();});},
 
 
 
 
 
 
};

/* Melhoria 3 (reunião com líderes, 05/11/2026): página Mensagens do Financeiro — o mesmo componente das abas Mensagens, em nome do setor. */
function fMsg(){return fHead('Mensagens','O que o Financeiro já mandou à igreja e o que está na fila',msgBtn('free|Financeiro|','btn pri'))+msgTabHtml('fin');}
{const _phf=placeholder;placeholder=id=>id==='fmsg'?fMsg():_phf(id);}
{const _phc=placeholder;placeholder=id=>id==='fent'?fEnt():id==='fcc'?fCC():id==='fcto'?fCto():id==='fcont'?fCont():_phc(id);}
