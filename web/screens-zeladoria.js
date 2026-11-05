/* ================= Zeladoria (módulo novo, 05/11/2026) =================
 * Departamento de obras da igreja: pedidos de manutenção, melhoria e instalação viram TRABALHOS que andam por cinco etapas fixas
 * (Pedido → Orçamento → Aprovação → Execução → Concluído; cancelável até começar a execução). Cada trabalho tem o seu caixa:
 * a igreja libera dinheiro (entradas) e a Zeladoria gasta (despesas com comprovante) até o saldo acabar.
 * Menu: Visão geral · Trabalhos (Quadro e Lista) · Fornecedores · Análises. Só web nesta etapa (o app fica para depois).
 * Reaproveita os quadros (bd-*), os cartões de resumo, a ficha com abas (prof/ptabs), o histórico (mh-*) e os pickers do Alva. */
const ZCATS=['Ar-condicionado','Pintura','Elétrica','Hidráulica','Portas e portões','Cobertura','Iluminação','Marcenaria','Jardim','Segurança'];
const ZTIPOS=['Manutenção','Melhoria','Instalação'];
const ZLOCAIS=['Salão principal','Sala 3','Banheiros','Estacionamento','Anexo','Hall de entrada','Sala de Kids','Cozinha','Jardim'];
const ZST=[['pedido','Pedido'],['orcamento','Orçamento'],['aprovacao','Aprovação'],['execucao','Execução'],['concluido','Concluído']];
const ZSTL={pedido:'Aguardando avaliação',orcamento:'Em orçamento',aprovacao:'Aguardando o Financeiro',execucao:'Em execução',concluido:'Concluído',cancelado:'Cancelado'};
const ZPILL={pedido:['--st-sol','--st-sol-bg'],orcamento:['--st-ace','--st-ace-bg'],aprovacao:['--st-sol','--st-sol-bg'],execucao:['--st-int','--st-int-bg'],concluido:['--ink-muted','--surface-2'],cancelado:['--st-rec','--st-rec-bg']};
const ZAPROV=['Rafael Pereira','Daniela Rocha'];
const ZTEAM=(()=>{try{const m=MINIS.find(x=>x.n==='Zeladoria'),l=mnPpl(m).map(p=>p.n||p).filter(Boolean);if(l.length)return l;}catch(e){}return ['Bruno Carvalho','Josias Almeida','Edson Ramos','Sérgio Nunes','Valdir Costa','Luiz Antônio'];})();
const zR=v=>'R$ '+Math.round(v).toLocaleString('pt-BR');
const zR2=v=>'R$ '+(+v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const zPill=s=>`<span class="stp" style="--c:var(${ZPILL[s][0]});--b:var(${ZPILL[s][1]})"><i></i>${ZSTL[s]}</span>`;

let _zfid=0,_zjid=0,_zlid=0;
const ZFORN=[
 ['Frio Total Climatização','Ar-condicionado','(11) 97711-2030','contato@friototal.com.br'],
 ['ClimaSul Instalações','Ar-condicionado','(11) 98822-1544','orcamentos@climasul.com.br'],
 ['RefriMax','Ar-condicionado','(11) 3456-7788','vendas@refrimax.com.br'],
 ['Pinturas Brasil','Pintura','(11) 99455-0192','pinturasbrasil@email.com'],
 ['Portão Fácil','Portas e portões','(11) 3300-4521','atendimento@portaofacil.com.br'],
 ['Cobre Telhas','Cobertura','(11) 98100-7765','obras@cobretelhas.com.br'],
 ['Eletro Lima','Elétrica','(11) 97888-3321','limaeletrica@email.com'],
].map(f=>({id:'zf'+(++_zfid),n:f[0],serv:f[1],tel:f[2],mail:f[3],doc:''}));
const zFn=id=>(ZFORN.find(f=>f.id===id)||{}).n||'';

const ZJOB=o=>Object.assign({fim:'',id:'zj'+(++_zjid),n:'',cat:'',tipo:'Manutenção',local:'',st:'pedido',pedBy:'',pedDate:'2026-09-01',desc:'',urg:'Normal',exec:null,resp:'',mat:[],props:[],apr:null,cx:{in:[],out:[]},hist:[],cm:[],cancel:null,fotos:[]},o);
const zIn=(d,v,obs='')=>({id:'zl'+(++_zlid),d,v,obs});
const zOut=(d,v,nat,desc,forn='',comp='')=>({id:'zl'+(++_zlid),d,v,nat,desc,forn,comp});
const ZJ=[
 ZJOB({n:'Trocar o ar-condicionado da sala 3',cat:'Ar-condicionado',tipo:'Manutenção',local:'Sala 3',st:'execucao',pedBy:'Ana Costa',pedDate:'2026-08-24',desc:'O aparelho da sala 3 parou de gelar e faz barulho. A sala é usada pelos Kids aos domingos.',urg:'Urgente',exec:'terceiro',resp:'Bruno Carvalho',
  mat:[{id:'m1',i:'Gás e tubulação',v:1100}],
  props:[{id:'p1',forn:'zf1',v:6800,prazo:5,arq:['Proposta-A-FrioTotal.pdf'],esc:false},{id:'p2',forn:'zf2',v:7450,prazo:4,arq:['Proposta-B-ClimaSul.pdf','Catalogo-split.pdf'],esc:false},{id:'p3',forn:'zf3',v:6200,prazo:7,arq:['Proposta-C-RefriMax.pdf'],esc:true}],
  apr:{by:'Rafael Pereira',d:'2026-09-18',v:7300},fim:'2026-10-05',
  cx:{in:[zIn('2026-09-20',7300,'Liberado pelo Financeiro')],out:[zOut('2026-09-24',1100,'Material','Gás e tubulação','', 'nota-material-0924.pdf'),zOut('2026-09-29',3100,'Mão de obra','Primeira parcela da instalação','zf3','recibo-refrimax-1.pdf')]},
  hist:[['2026-08-24','Pedido feito por Ana Costa','Ana Costa'],['2026-08-26','Avaliado: será feito por fornecedor','Bruno Carvalho'],['2026-09-10','Proposta C (RefriMax) escolhida','Bruno Carvalho'],['2026-09-18','Aprovado pelo Financeiro: R$ 7.300','Rafael Pereira'],['2026-09-20','Entrada de R$ 7.300 no caixa','Rafael Pereira'],['2026-09-22','Execução iniciada','Bruno Carvalho']]}),
 ZJOB({n:'Pintar o salão principal',cat:'Pintura',tipo:'Melhoria',local:'Salão principal',st:'orcamento',pedBy:'Pr. Marcos Lima',pedDate:'2026-09-12',desc:'A pintura das paredes está desgastada, com manchas perto das janelas. Pensar numa cor mais clara.',exec:'terceiro',resp:'Bruno Carvalho',
  mat:[{id:'m1',i:'Tinta e massa corrida',v:4300}],
  props:[{id:'p1',forn:'zf4',v:12800,prazo:10,arq:['Proposta-PinturasBrasil.pdf'],esc:false},{id:'p2',forn:'zf1',v:14200,prazo:8,arq:['Proposta-B.pptx'],esc:false}],
  hist:[['2026-09-12','Pedido feito por Pr. Marcos Lima','Pr. Marcos Lima'],['2026-09-15','Avaliado: será feito por fornecedor','Bruno Carvalho']]}),
 ZJOB({n:'Torneira do banheiro masculino vazando',cat:'Hidráulica',tipo:'Manutenção',local:'Banheiros',st:'pedido',pedBy:'Pr. Marcos Lima',pedDate:'2026-09-30',desc:'A torneira da pia do meio está pingando o dia todo.',urg:'Urgente',hist:[['2026-09-30','Pedido feito por Pr. Marcos Lima','Pr. Marcos Lima']]}),
 ZJOB({n:'Consertar a porta da sala de Kids',cat:'Portas e portões',tipo:'Manutenção',local:'Sala de Kids',st:'pedido',pedBy:'Ana Costa',pedDate:'2026-09-29',desc:'A porta está raspando no chão e não fecha direito.',hist:[['2026-09-29','Pedido feito por Ana Costa','Ana Costa']]}),
 ZJOB({n:'Instalar o portão eletrônico do estacionamento',cat:'Portas e portões',tipo:'Instalação',local:'Estacionamento',st:'aprovacao',pedBy:'Pr. Rafael Pereira',pedDate:'2026-08-30',desc:'Hoje o portão é aberto à mão, e a segurança pediu automação com controle remoto.',exec:'terceiro',resp:'Bruno Carvalho',
  mat:[{id:'m1',i:'Motor e controles remotos',v:1500}],
  props:[{id:'p1',forn:'zf5',v:9800,prazo:12,arq:['Proposta-PortaoFacil.pdf'],esc:true}],
  hist:[['2026-08-30','Pedido feito por Pr. Rafael Pereira','Pr. Rafael Pereira'],['2026-09-02','Avaliado: será feito por fornecedor','Bruno Carvalho'],['2026-09-26','Proposta escolhida e enviada para aprovação','Bruno Carvalho']]}),
 ZJOB({n:'Instalar um bebedouro no hall',cat:'Hidráulica',tipo:'Instalação',local:'Hall de entrada',st:'orcamento',pedBy:'Daniela Rocha',pedDate:'2026-09-20',desc:'As pessoas pedem água no hall. Já existe ponto de água na parede.',exec:'equipe',resp:'Josias Almeida',
  mat:[{id:'m1',i:'Bebedouro industrial',v:1850},{id:'m2',i:'Registro e mangueira',v:140}],
  hist:[['2026-09-20','Pedido feito por Daniela Rocha','Daniela Rocha'],['2026-09-22','Avaliado: será feito pela equipe da Zeladoria','Bruno Carvalho']]}),
 ZJOB({n:'Trocar as lâmpadas do corredor do anexo',cat:'Iluminação',tipo:'Manutenção',local:'Anexo',st:'concluido',pedBy:'Pr. Marcos Lima',pedDate:'2026-08-28',desc:'Várias lâmpadas queimadas, o corredor fica escuro à noite.',exec:'equipe',resp:'Edson Ramos',
  mat:[{id:'m1',i:'Lâmpadas LED (12)',v:340}],apr:{by:'Rafael Pereira',d:'2026-09-02',v:340},
  cx:{in:[zIn('2026-09-03',340,'Liberado pelo Financeiro')],out:[zOut('2026-09-05',332,'Material','12 lâmpadas LED','', 'nota-lampadas.pdf')]},
  hist:[['2026-08-28','Pedido feito por Pr. Marcos Lima','Pr. Marcos Lima'],['2026-08-30','Avaliado: será feito pela equipe da Zeladoria','Bruno Carvalho'],['2026-09-02','Aprovado pelo Financeiro: R$ 340','Rafael Pereira'],['2026-09-08','Trabalho concluído','Edson Ramos']]}),
 ZJOB({n:'Reforma do telhado do anexo',cat:'Cobertura',tipo:'Melhoria',local:'Anexo',st:'execucao',pedBy:'Pr. Rafael Pereira',pedDate:'2026-07-20',desc:'Goteiras em três pontos do anexo. Trocar as telhas e refazer a calha.',exec:'terceiro',resp:'Bruno Carvalho',
  mat:[{id:'m1',i:'Telhas, calhas e vedação',v:8000}],
  props:[{id:'p1',forn:'zf6',v:42000,prazo:30,arq:['Proposta-CobreTelhas.pdf','Cronograma.pptx'],esc:true}],
  apr:{by:'Rafael Pereira',d:'2026-08-20',v:50000},fim:'2026-09-28',
  cx:{in:[zIn('2026-09-05',20000,'Primeira liberação do Financeiro')],out:[zOut('2026-09-08',8000,'Material','Telhas e calhas','', 'nota-telhas.pdf'),zOut('2026-09-22',11500,'Mão de obra','Primeira etapa da obra','zf6','recibo-cobretelhas-1.pdf')]},
  hist:[['2026-07-20','Pedido feito por Pr. Rafael Pereira','Pr. Rafael Pereira'],['2026-07-25','Avaliado: será feito por fornecedor','Bruno Carvalho'],['2026-08-14','Proposta escolhida','Bruno Carvalho'],['2026-08-20','Aprovado pelo Financeiro: R$ 50.000','Rafael Pereira'],['2026-09-05','Entrada de R$ 20.000 no caixa','Rafael Pereira'],['2026-09-08','Execução iniciada','Bruno Carvalho']]}),
 ZJOB({n:'Podar as árvores do jardim',cat:'Jardim',tipo:'Manutenção',local:'Jardim',st:'cancelado',pedBy:'Daniela Rocha',pedDate:'2026-09-02',desc:'Os galhos estão tocando o fio de energia.',cancel:'Um voluntário do ministério fez a poda sem custo.',
  hist:[['2026-09-02','Pedido feito por Daniela Rocha','Daniela Rocha'],['2026-09-04','Cancelado: um voluntário do ministério fez a poda sem custo.','Bruno Carvalho']]}),
];
[['Consertar a bomba d\'água do banheiro','Hidráulica','Manutenção',1250,800,'2026-08-12','Edson Ramos'],['Trocar a fechadura da secretaria','Segurança','Manutenção',420,0,'2026-08-27','Josias Almeida']].forEach(x=>{
 const o=[];if(x[3])o.push(zOut(x[5],x[3],'Material',x[0]+' (material)','','nota-'+x[5]+'.pdf'));if(x[4])o.push(zOut(x[5],x[4],'Mão de obra',x[0]+' (mão de obra)','zf7','recibo-'+x[5]+'.pdf'));
 ZJ.push(ZJOB({n:x[0],cat:x[1],tipo:x[2],local:'Anexo',st:'concluido',pedBy:'Pr. Marcos Lima',pedDate:x[5],exec:x[4]?'terceiro':'equipe',resp:x[6],mat:[{id:'m1',i:'Material',v:x[3]}],cx:{in:[zIn(x[5],x[3]+x[4],'Liberado pelo Financeiro')],out:o},hist:[[x[5],'Trabalho concluído',x[6]]]}));
});
/* histórico do ano passado, para as Análises (trabalhos concluídos em 2025) */
[['Trocar o ar-condicionado do salão','Ar-condicionado','Manutenção',1800,3600,'2025-03-12'],['Instalar split na sala de reunião','Ar-condicionado','Instalação',2100,1800,'2025-08-20'],['Pintura externa do templo','Pintura','Melhoria',3700,5000,'2025-05-18'],['Trocar o quadro de luz','Elétrica','Manutenção',1500,600,'2025-04-02'],['Consertar a pia da cozinha','Hidráulica','Manutenção',350,1000,'2025-06-14'],['Trocar a porta de entrada','Portas e portões','Melhoria',2800,0,'2025-09-09'],['Calha da lateral','Cobertura','Manutenção',1200,3000,'2025-02-22'],['Lâmpadas do salão','Iluminação','Manutenção',680,0,'2025-10-05'],['Câmeras de segurança','Segurança','Instalação',3400,0,'2025-11-12'],['Poda e adubação','Jardim','Manutenção',300,600,'2025-07-01']].forEach(x=>{
 const o=[];if(x[3])o.push(zOut(x[5],x[3],'Material',x[0]+' (material)'));if(x[4])o.push(zOut(x[5],x[4],'Mão de obra',x[0]+' (mão de obra)'));
 ZJ.push(ZJOB({n:x[0],cat:x[1],tipo:x[2],st:'concluido',pedBy:'Pr. Marcos Lima',pedDate:x[5],exec:x[4]?'terceiro':'equipe',resp:'Bruno Carvalho',cx:{in:[zIn(x[5],x[3]+x[4],'Liberado pelo Financeiro')],out:o},hist:[[x[5],'Trabalho concluído','Bruno Carvalho']],old:true}));
});

/* ---------- cálculos ---------- */
const zSum=a=>a.reduce((s,x)=>s+x.v,0);
const zProp=j=>j.props.find(p=>p.esc);
const zPrevMat=j=>zSum(j.mat);
const zPrevMao=j=>j.exec==='terceiro'&&zProp(j)?zProp(j).v:0;
const zPrev=j=>zPrevMat(j)+zPrevMao(j);
/* O caixa do trabalho é o caixa padrão do Alva (CAIXAS, o mesmo dos ministérios e eventos), com o trabalho como dono. */
const zCx=j=>{let x=CAIXAS.find(c=>c.ownerType==='zel'&&c.ownerId===j.id);
 if(!x){x=cxNew('zel',j.id,'Caixa do trabalho',{main:true});
  (j.cx.in||[]).forEach(e=>cxAdd(x,'in',e.v,e.d,e.obs||'Liberado pelo Financeiro','Aporte da igreja','Rafael Pereira'));
  (j.cx.out||[]).forEach(o=>cxAdd(x,'out',o.v,o.d,o.desc,o.cat||j.cat,'Bruno Carvalho',{file:o.comp||'',nat:o.nat,forn:o.forn||''}));
  if(j.st==='concluido'||j.st==='cancelado'){x.status='encerrado';x.closedAt=j.hist.length?j.hist[j.hist.length-1][0]:NOWD;}}
 return x;};
const zLib=j=>cxIn(zCx(j))/100;
const zGasto=j=>cxOut(zCx(j))/100;
const zSaldo=j=>cxBal(zCx(j))/100;
const zOutsOf=j=>cxValid(zCx(j)).filter(e=>e.t==='out'&&!e.xfer);
const zGastoAno=(y,j)=>(j?[j]:ZJ).reduce((s,x)=>s+zOutsOf(x).filter(e=>e.d.slice(0,4)===String(y)).reduce((a,e)=>a+e.v,0)/100,0);
const zLate=j=>j.st==='execucao'&&j.fim&&j.fim<NOWD;
const zJob=id=>ZJ.find(j=>j.id===id);
const zQuem=j=>j.exec==='terceiro'?'Fornecedor':j.exec==='equipe'?'Equipe da Zeladoria':'A definir';
const zBar=(v,t)=>`<span class="bd-bar"><i style="width:${t>0?Math.min(100,Math.round(v/t*100)):0}%"></i></span>`;
ZJ.forEach(j=>zCx(j));
Object.assign(S,{zj:null,ztab:'resumo',zview:'quadro',zq:'',zst:'todos',zcat:'todas',zano:'2026',zfq:''});

/* ---------- menu e permissões ---------- */
(()=>{
 const g=NAV.find(x=>x[0]==='Gestão')[1],i=g.findIndex(x=>x[0]==='financeiro');
 g.splice(i<0?g.length:i,0,['zeladoria','bucket','Zeladoria',[['zel-vis','Visão geral'],['zel-trab','Trabalhos'],['zel-forn','Fornecedores'],['zel-ana','Análises']]]);
 SAREAS.push(['Zeladoria','bucket']);MODS.push('Zeladoria');
 Object.keys(RPERM).forEach(r=>{RPERM[r].Zeladoria=r==='Administrador'?ACTS.slice():r==='Pastor'?['Ver','Criar','Editar']:[];});
 if(typeof MODMIN!=='undefined')MODMIN.Zeladoria='Zeladoria';
})();

/* ---------- Visão geral ---------- */
function zelVis(){
 const cnt=s=>ZJ.filter(j=>j.st===s&&!j.old).length,urg=ZJ.filter(j=>j.st==='pedido'&&j.urg==='Urgente').length,exec=ZJ.filter(j=>j.st==='execucao');
 const late=exec.filter(zLate),wait=ZJ.filter(j=>j.st==='aprovacao'&&!j.apr).length,sal=exec.reduce((a,j)=>a+zSaldo(j),0),g26=zGastoAno(2026);
 const att=[];
 ZJ.forEach(j=>{
  if(j.st==='pedido')att.push([j,'bell',`Pedido novo de ${j.pedBy}`,j.urg==='Urgente'?'Urgente · avaliar o quanto antes':'Avaliar se a equipe faz ou se precisa de fornecedor','Avaliar']);
  else if(j.st==='orcamento'&&j.exec==='terceiro'&&!zProp(j))att.push([j,'file','Falta escolher a proposta',`${j.props.length} proposta${j.props.length===1?'':'s'} recebida${j.props.length===1?'':'s'}`,'Escolher']);
  else if(j.st==='orcamento'&&j.exec==='equipe'&&!j.mat.length)att.push([j,'file','Falta o orçamento do material','A equipe vai fazer; só falta listar o material','Orçar']);
  else if(j.st==='aprovacao'&&!j.apr)att.push([j,'wallet','Aguardando o Financeiro',`Orçamento de ${zR(zPrev(j))} esperando aprovação`,'Abrir']);
  else if(zLate(j))att.push([j,'clock','Execução atrasada',`Era para terminar em ${fmtD(j.fim)} · ${-inDays(j.fim)} dia${-inDays(j.fim)===1?'':'s'} de atraso`,'Abrir']);
  else if(j.st==='execucao'&&zLib(j)&&zSaldo(j)<=zLib(j)*.1)att.push([j,'alert','Saldo do caixa quase esgotado',`Sobram ${zR(zSaldo(j))} de ${zR(zLib(j))} liberados · previsto ${zR(zPrev(j))}`,'Abrir']);
 });
 return `<header class="ph rise"><div><p class="eb">Zeladoria</p><h1>Visão geral</h1><p class="lede">O que precisa de atenção e como andam as obras</p></div>
  <div class="pact"><button class="btn sec" data-a="nav" data-v="zel-trab">${ic('layers',15)}Ver trabalhos</button><button class="btn pri" data-a="zNew">${ic('plus',15,2.2)}Pedir um trabalho</button></div></header>
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Pedidos a avaliar</span><span class="kv">${cnt('pedido')}</span><span class="kd ${urg?'dn':''}">${urg?urg+' urgente'+(urg>1?'s':''):'nenhum urgente'}</span></div>
  <div class="k4"><span class="kl">Em orçamento ou aprovação</span><span class="kv">${cnt('orcamento')+cnt('aprovacao')}</span><span class="kd">${wait} aguardando o Financeiro</span></div>
  <div class="k4"><span class="kl">Em execução</span><span class="kv">${exec.length}</span><span class="kd ${late.length?'dn':''}">${late.length?late.length+(late.length>1?' atrasadas':' atrasada'):'nenhuma atrasada'}</span></div>
  <div class="k4"><span class="kl">Saldo nos caixas das obras</span><span class="kv">${zR(sal)}</span><span class="kd">gasto em 2026: ${zR(g26)}</span></div>
 </section>
 <div class="pgrid rise" style="--d:2"><div class="col">
  <section class="card pc"><div class="sh"><h2>Precisa de você</h2><span class="who">${att.length} ${att.length===1?'item':'itens'}</span></div>
   ${att.length?`<ul class="zl-att">${att.map(a=>`<li><span class="zl-ai">${ic(a[1],16,2)}</span><span class="zl-at"><b>${esc(a[0].n)}</b><small>${esc(a[2])} · ${esc(a[3])}</small></span><button class="btn sec sm" data-a="zOpen" data-v="${a[0].id}">${a[4]}</button></li>`).join('')}</ul>`:'<div class="mempty"><p>Nada esperando por você.</p><span>Quando chegar um pedido ou faltar algo, aparece aqui.</span></div>'}</section>
 </div><div class="col">
  <section class="card pc"><div class="sh"><h2>Em execução</h2><span class="who">${exec.length}</span></div>
   ${exec.length?`<div class="zl-ex">${exec.map(j=>`<button class="zl-xc" data-a="zOpen" data-v="${j.id}"><b>${esc(j.n)}</b><span class="who">${esc(j.local)} · ${esc(j.resp)}</span><span class="zl-xt">${zLate(j)?'<em class="tag warn">Atrasada</em>':'<em class="tag">No prazo</em>'}${j.fim?`<small>previsão ${fmtD(j.fim)}</small>`:''}</span>${zBar(zGasto(j),zLib(j))}<span class="zl-xn"><b>${zR(zGasto(j))}</b> gastos de ${zR(zLib(j))} liberados<small>previsto ${zR(zPrev(j))}</small></span></button>`).join('')}</div>`:'<div class="mempty"><p>Nenhuma obra em execução.</p></div>'}</section>
  <section class="card pc"><div class="sh"><h2>Concluídos recentemente</h2></div>
   <ul class="zl-att">${ZJ.filter(j=>j.st==='concluido'&&!j.old).map(j=>`<li><span class="zl-ai ok">${ic('check',16,2.4)}</span><span class="zl-at"><b>${esc(j.n)}</b><small>${esc(j.cat)} · gasto ${zR(zGasto(j))}</small></span><button class="btn ghost sm" data-a="zOpen" data-v="${j.id}">Ver</button></li>`).join('')||'<li class="who">Nenhum ainda.</li>'}</ul></section>
 </div></div>`;
}

/* ---------- Trabalhos: cartões de status + abas Quadro | Lista ---------- */
function zCard(j){
 const urg=j.urg==='Urgente',cx=j.st==='execucao'||j.st==='concluido';
 return `<div class="bd-t" tabindex="0" data-a="zOpen" data-v="${j.id}"><b>${esc(j.n)}</b>
  <div class="bd-m"><em class="tag">${esc(j.cat)}</em>${urg?'<em class="tag warn">Urgente</em>':''}${zLate(j)?'<em class="tag warn">Atrasada</em>':''}</div>
  <div class="bd-m"><span class="bd-mn">${ic('pin',11,2)}${esc(j.local)}</span>${j.resp?`<span class="bd-who">${pav(j.resp,'ceu','')}<i>${esc(j.resp.split(' ')[0])}</i></span>`:`<span class="bd-who"><i>${esc(j.pedBy)}</i></span>`}</div>
  ${cx&&zLib(j)?`<div class="zl-cm">${zBar(zGasto(j),zLib(j))}<small>${zR(zGasto(j))} de ${zR(zLib(j))}</small></div>`:zPrev(j)?`<small class="zl-pv">Previsto ${zR(zPrev(j))}</small>`:''}</div>`;
}
function zelTrab(){
 if(S.zj)return zelJob();
 const act=ZJ.filter(j=>!j.old);
 const cards=ZST.map(s=>{const l=act.filter(j=>j.st===s[0]);return `<div class="k4"><span class="kl">${s[1]}</span><span class="kv">${l.length}</span><span class="kd">${l.length?zR(l.reduce((a,j)=>a+zPrev(j),0))+' previsto':'nenhum'}</span></div>`;}).join('');
 const tabs=`<div class="utabs rise" style="--d:2" role="tablist">${[['quadro','Quadro'],['lista','Lista']].map(t=>`<button role="tab" class="${S.zview===t[0]?'on':''}" aria-selected="${S.zview===t[0]}" data-a="zView" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>`;
 let body;
 if(S.zview==='quadro')body=`<section class="card pc bd-board rise" style="--d:3"><p class="bd-note">${ic('info',13,2)}As etapas são fixas. Abra o trabalho para dar o próximo passo.</p><div class="bd-cols">${ZST.map(s=>{const l=act.filter(j=>j.st===s[0]);return `<div class="bd-col"><header class="bd-ch"><b>${s[1]}</b><small>${l.length}</small></header><div class="bd-list">${l.map(zCard).join('')||'<p class="bd-empty">Nenhum trabalho</p>'}</div></div>`;}).join('')}</div></section>`;
 else body=`<section class="card mtab rise" style="--d:3"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="zq" placeholder="Buscar trabalho, categoria ou local" value="${esc(S.zq)}" autocomplete="off"></label>
   <div class="chips">${[['todos','Todos'],...ZST.map(s=>[s[0],s[1]]),['cancelado','Cancelados']].map(c=>`<button class="chipf ${S.zst===c[0]?'on':''}" data-a="zSt" data-v="${c[0]}">${c[1]}</button>`).join('')}</div></div><div id="zrows">${zRows()}</div></section>`;
 return `<header class="ph rise"><div><p class="eb">Zeladoria</p><h1>Trabalhos</h1><p class="lede">Pedidos de manutenção, melhoria e instalação da igreja</p></div><div class="pact"><button class="btn pri" data-a="zNew">${ic('plus',15,2.2)}Pedir um trabalho</button></div></header>
  <section class="card kpis4 k5 rise" style="--d:1">${cards}</section>${tabs}${body}`;
}
function zRows(){
 const q=norm(S.zq||''),l=ZJ.filter(j=>!j.old&&(S.zst==='todos'?j.st!=='cancelado':j.st===S.zst)&&(!q||norm(j.n+' '+j.cat+' '+j.local).includes(q)));
 if(!l.length)return '<div class="mempty"><p>Nenhum trabalho encontrado.</p><span>Tente outra busca ou outra etapa.</span></div>';
 return `<div class="trow zt thead"><span>Trabalho</span><span>Categoria</span><span>Situação</span><span>Responsável</span><span>Previsto</span><span>Gasto</span><span></span></div>
 ${l.map(j=>`<div class="trow zt" tabindex="0" data-a="zOpen" data-v="${j.id}"><span class="tn"><span class="zt-n"><b>${esc(j.n)}</b><span>${esc(j.local)} · pedido por ${esc(j.pedBy)}</span></span></span><span>${esc(j.cat)}</span><span>${zPill(j.st)}</span><span>${esc(j.resp||'A definir')}</span><span class="num">${zPrev(j)?zR(zPrev(j)):'—'}</span><span class="num">${zGasto(j)?zR(zGasto(j)):'—'}</span><span class="tc">${ic('chevR',16)}</span></div>`).join('')}
 <div class="tfoot"><span>${l.length} ${l.length===1?'trabalho':'trabalhos'}</span></div>`;
}

/* ---------- Ficha do trabalho ---------- */
function zNext(j){
 if(j.st==='pedido')return ['zEval','Avaliar o pedido',true];
 if(j.st==='orcamento'){const ok=j.exec==='equipe'?j.mat.length>0:j.exec==='terceiro'&&!!zProp(j);return ['zSend','Enviar para aprovação',ok];}
 if(j.st==='aprovacao')return ['zApprove','Registrar aprovação do Financeiro',true];
 if(j.st==='execucao')return ['zFinish','Concluir o trabalho',true];
 return null;
}
function zelJob(){
 const j=zJob(S.zj);if(!j){S.zj=null;return zelTrab();}
 const nx=zNext(j),tabs=[['resumo','Resumo'],['orc','Orçamento'],['caixa','Caixa'],['com','Comentários'],['hist','Histórico']];
 return `<nav class="crumb rise"><span class="soft">Zeladoria</span>${ic('chevR',13,2)}<button class="lnk back" data-a="zBack">Trabalhos</button>${ic('chevR',13,2)}<span>${esc(j.n)}</span></nav>
 <header class="card prof rise" style="--d:1">
  <div class="pid"><span class="htile" style="--s:64px;background:var(--tone-salvia);color:var(--tone-salvia-ink)">${ic('wrench',30,1.9)}</span><div class="pn"><h1>${esc(j.n)}</h1><p>${esc(j.cat)} · ${esc(j.tipo)} · ${esc(j.local)}</p><div class="ca-tgs">${zPill(j.st)}${j.urg==='Urgente'&&j.st!=='concluido'&&j.st!=='cancelado'?'<em class="tag warn">Urgente</em>':''}</div></div></div>
  <div class="pact">${nx?`<button class="btn pri" data-a="${nx[0]}" data-v="${j.id}" ${nx[2]?'':'disabled'}>${nx[1]}</button>`:''}
   ${j.st!=='concluido'&&j.st!=='cancelado'&&j.st!=='execucao'?`<div style="position:relative"><button class="ibtn" data-a="zMenu" aria-label="Mais ações">${ic('dots',17)}</button><div class="pop" id="zPop" style="right:0;top:calc(100% + 6px)"><button class="pi danger" data-a="zCancel" data-v="${j.id}">${ic('x',16)}Cancelar o trabalho</button></div></div>`:''}</div>
  <div class="ikpi hk"><div><b>${zPrev(j)?zR(zPrev(j)):'—'}</b><span>Previsto</span></div><div><b>${zR(zLib(j))}</b><span>Liberado</span></div><div><b>${zR(zGasto(j))}</b><span>Gasto</span></div><div><b class="${zSaldo(j)<0?'neg':''}">${zR(zSaldo(j))}</b><span>Saldo do caixa</span></div></div>
  <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" class="${S.ztab===t[0]?'on':''}" data-a="zTab" data-v="${t[0]}">${t[1]}${t[0]==='com'&&j.cm.length?`<small>${j.cm.length}</small>`:''}</button>`).join('')}<span class="tind"></span></div>
 </header>
 <div class="rise" style="--d:2">${({resumo:zResumo,orc:zOrc,caixa:zCaixa,com:zCom,hist:zHist})[S.ztab](j)}</div>`;
}
function zResumo(j){
 const steps=ZST.map((s,i)=>{const cur=ZST.findIndex(x=>x[0]===j.st),done=j.st==='cancelado'?false:i<cur||j.st==='concluido',on=i===cur&&j.st!=='cancelado';return `<li class="${done?'done':on?'on':''}"><i>${done?ic('check',12,3):i+1}</i>${s[1]}</li>`;}).join('');
 return `<div class="pgrid"><div class="col">
  <section class="card pc"><div class="sh"><h2>Andamento</h2></div><ol class="cm-steps zl-steps">${steps}</ol>${j.st==='cancelado'?`<p class="bd-note">${ic('x',13,2)}Trabalho cancelado: ${esc(j.cancel||'')}</p>`:''}</section>
  <section class="card pc"><div class="sh"><h2>O pedido</h2></div>
   <p class="ca-desc">${esc(j.desc||'Sem descrição')}</p>
   <dl class="kv grid2"><div><dt>Pedido por</dt><dd>${esc(j.pedBy)}</dd></div><div><dt>Em</dt><dd>${fmtD(j.pedDate)}</dd></div><div><dt>Local</dt><dd>${esc(j.local)}</dd></div><div><dt>Tipo</dt><dd>${esc(j.tipo)}</dd></div></dl></section>
 </div><div class="col">
  <section class="card pc"><div class="sh"><h2>Quem faz</h2></div>
   <dl class="kv grid2"><div><dt>Execução</dt><dd>${j.exec?zQuem(j):'<span class="soft">Ainda não avaliado</span>'}</dd></div><div><dt>Responsável</dt><dd>${j.resp?esc(j.resp):'<span class="soft">A definir</span>'}</dd></div>${j.fim?`<div><dt>Previsão de término</dt><dd>${fmtD(j.fim)}${zLate(j)?' <em class="tag warn">Atrasada</em>':''}</dd></div>`:''}${j.exec==='terceiro'&&zProp(j)?`<div><dt>Fornecedor escolhido</dt><dd>${esc(zFn(zProp(j).forn))}</dd></div><div><dt>Prazo</dt><dd>${zProp(j).prazo} dias</dd></div>`:''}</dl></section>
  <section class="card pc"><div class="sh"><h2>Dinheiro</h2></div>
   <div class="zl-ln"><span>Previsto (material + mão de obra)</span><b>${zPrev(j)?zR(zPrev(j)):'—'}</b></div>
   <div class="zl-ln"><span>Liberado pela igreja</span><b>${zR(zLib(j))}</b></div>
   <div class="zl-ln"><span>Gasto até agora</span><b>${zR(zGasto(j))}</b></div>
   <div class="zl-ln tot"><span>Saldo do caixa</span><b class="${zSaldo(j)<0?'neg':''}">${zR(zSaldo(j))}</b></div>
   ${zLib(j)?zBar(zGasto(j),zLib(j)):''}
   ${j.st==='concluido'?`<p class="bd-note">${ic('circleCheck',13,2)}Prestação de contas: liberado ${zR(zLib(j))}, gasto ${zR(zGasto(j))}, sobra ${zR(zSaldo(j))}.</p>`:''}</section>
 </div></div>`;
}
function zOrc(j){
 const lock=j.st==='concluido'||j.st==='cancelado'||j.st==='execucao';
 const mat=`<section class="card pc"><div class="sh"><h2>Material</h2>${lock?'':`<button class="btn sec sm" data-a="zMatAdd" data-v="${j.id}">${ic('plus',14,2.2)}Adicionar item</button>`}</div>
  ${j.mat.length?`<ul class="zl-lines">${j.mat.map(m=>`<li><span>${esc(m.i)}</span><b>${zR2(m.v)}</b>${lock?'':`<button class="ibtn sm" data-a="zMatDel" data-v="${j.id}|${m.id}" aria-label="Remover item">${ic('x',14)}</button>`}</li>`).join('')}</ul><div class="zl-ln tot"><span>Total do material</span><b>${zR2(zPrevMat(j))}</b></div>`:'<div class="mempty"><p>Nenhum item de material.</p><span>Liste o que precisa ser comprado.</span></div>'}</section>`;
 let mao;
 if(!j.exec)mao=`<section class="card pc"><div class="sh"><h2>Mão de obra</h2></div><div class="mempty"><p>Avalie o pedido primeiro.</p><span>Depois de avaliar, você diz se a equipe faz ou se contrata alguém.</span></div></section>`;
 else if(j.exec==='equipe')mao=`<section class="card pc"><div class="sh"><h2>Mão de obra</h2></div><p class="bd-note">${ic('users',13,2)}Feito pela equipe da Zeladoria. Não há custo de mão de obra: o orçamento é só de material.</p></section>`;
 else mao=`<section class="card pc"><div class="sh"><h2>Mão de obra · propostas</h2>${lock?'':`<button class="btn sec sm" data-a="zPropAdd" data-v="${j.id}">${ic('plus',14,2.2)}Nova proposta</button>`}</div>
  ${j.props.length?`<div class="zl-pps">${j.props.map((p,i)=>`<article class="zl-pp ${p.esc?'esc':''}"><header><b>Proposta ${'ABCDEFG'[i]}</b>${p.esc?'<em class="tag brand">Escolhida</em>':zProp(j)?'<em class="tag">Não escolhida</em>':''}</header>
   <h3>${esc(zFn(p.forn))}</h3><p class="zl-pv2">${zR2(p.v)}<small>prazo de ${p.prazo} dias</small></p>
   <div class="zl-fls">${p.arq.map(a=>`<span class="zl-fl">${ic('file',12,2)}${esc(a)}</span>`).join('')||'<span class="soft">Sem arquivo</span>'}</div>
   ${lock?'':`<footer>${p.esc?'':`<button class="btn sec sm" data-a="zPropPick" data-v="${j.id}|${p.id}">Escolher esta</button>`}<button class="btn ghost sm" data-a="zPropDel" data-v="${j.id}|${p.id}">Remover</button></footer>`}</article>`).join('')}</div>`:'<div class="mempty"><p>Nenhuma proposta ainda.</p><span>Cadastre as propostas dos fornecedores e escolha uma.</span></div>'}</section>`;
 const tot=`<section class="card pc"><div class="sh"><h2>Orçamento total</h2></div>
  <div class="zl-ln"><span>Material</span><b>${zR2(zPrevMat(j))}</b></div><div class="zl-ln"><span>Mão de obra</span><b>${zR2(zPrevMao(j))}</b></div><div class="zl-ln tot"><span>Previsto</span><b>${zR2(zPrev(j))}</b></div></section>`;
 const apr=`<section class="card pc"><div class="sh"><h2>Aprovação do Financeiro</h2></div>${j.apr?`<p class="bd-note ok">${ic('circleCheck',13,2)}Aprovado por ${esc(j.apr.by)} em ${fmtD(j.apr.d)} · valor aprovado ${zR(j.apr.v)}</p>`:j.st==='aprovacao'?`<p class="bd-note">${ic('clock',13,2)}Aguardando a aprovação do Financeiro. Quando aprovarem, registre aqui.</p>`:`<p class="who">Depois de enviar o orçamento, o Financeiro aprova e a aprovação fica registrada aqui.</p>`}</section>`;
 return `<div class="col">${mat}${mao}<div class="pgrid"><div class="col">${tot}</div><div class="col">${apr}</div></div></div>`;
}
/* A aba Caixa é o caixa padrão do Alva (o mesmo dos ministérios e eventos), com o trabalho como dono: saldo, entradas, saídas, busca, lançamentos em tabela única, estorno e comprovante. */
function zCaixa(j){
 const c=zCx(j);S.cx=c.id;if(!S.cxf)S.cxf='all';
 return cxView(c).replace(/<button class="btn sec sm" data-a="cxBack">[\s\S]*?<\/button>/,'').replace(/<button class="btn sec sm" data-a="cxReopen"[^>]*>[^<]*<\/button>/,'');
}
function zCom(j){
 return `<section class="card pc"><div class="sh"><h2>Comentários</h2><span class="who">${j.cm.length}</span></div>
  ${j.cm.length?`<ul class="zl-cms">${j.cm.map(c=>`<li>${pav(c[0],'ceu','')}<div><b>${esc(c[0])}</b><small>${fmtD(c[1])}</small><p>${esc(c[2])}</p></div></li>`).join('')}</ul>`:'<div class="mempty"><p>Nenhum comentário.</p><span>Use para combinar detalhes da obra com a equipe.</span></div>'}
  <form id="zcF" class="zl-cf"><textarea class="ta" name="t" rows="2" maxlength="500" placeholder="Escreva um comentário"></textarea><button class="btn pri sm" type="submit">Comentar</button></form></section>`;
}
function zHist(j){
 const MO=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],ev=j.hist.slice().sort((a,b)=>a[0]<b[0]?1:-1);
 return `<section class="card pc mh"><div class="sh"><h2>Histórico</h2><span class="who">${ev.length} registros · mais recentes primeiro</span></div>
  <ol class="mh-l">${ev.map((x,i)=>`<li class="mh-i ${i===0?'first':''}"><span class="mh-d"><b>${+x[0].slice(8)}</b><small>${MO[+x[0].slice(5,7)-1]} ${x[0].slice(0,4)}</small></span><span class="mh-ic k-int">${ic('check',15,2)}</span><div class="mh-b"><div class="mh-h"><b>${esc(x[1])}</b></div><span class="mh-m">${avN(x[2])}<span>por ${esc(x[2])}</span></span></div></li>`).join('')}</ol></section>`;
}

/* ---------- Fornecedores ---------- */
function zelForn(){
 return `<header class="ph rise"><div><p class="eb">Zeladoria</p><h1>Fornecedores</h1><p class="lede">Empresas e profissionais que fazem propostas e executam trabalhos. Não têm acesso ao sistema.</p></div><div class="pact"><button class="btn pri" data-a="zFornNew">${ic('plus',15,2.2)}Novo fornecedor</button></div></header>
 <section class="card mtab rise" style="--d:2"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="zfq" placeholder="Buscar fornecedor ou serviço" value="${esc(S.zfq)}" autocomplete="off"></label></div><div id="zfrows">${zFornRows()}</div></section>`;
}
function zFornRows(){
 const q=norm(S.zfq||''),l=ZFORN.filter(f=>!q||norm(f.n+' '+f.serv).includes(q));
 if(!l.length)return '<div class="mempty"><p>Nenhum fornecedor encontrado.</p></div>';
 const ws=f=>ZJ.filter(j=>j.props.some(p=>p.forn===f.id&&p.esc)||zOutsOf(j).some(e=>e.forn===f.id)),pago=f=>ZJ.reduce((a,j)=>a+zOutsOf(j).filter(e=>e.forn===f.id&&e.d.slice(0,4)==='2026').reduce((s2,e)=>s2+e.v,0)/100,0);
 return `<div class="trow zf thead"><span>Fornecedor</span><span>Serviço</span><span>Contato</span><span>Trabalhos</span><span>Pago em 2026</span><span></span></div>
 ${l.map(f=>`<div class="trow zf" tabindex="0" data-a="zFornEdit" data-v="${f.id}"><span class="tn"><span class="htile" style="--s:34px;background:var(--tone-salvia);color:var(--tone-salvia-ink)">${ic('building',16,1.9)}</span><span class="zt-n"><b>${esc(f.n)}</b><span>${esc(f.mail||'sem e-mail')}</span></span></span><span>${esc(f.serv)}</span><span>${esc(f.tel||'—')}</span><span class="num">${ws(f).length}</span><span class="num">${pago(f)?zR(pago(f)):'—'}</span><span class="tc">${ic('chevR',16)}</span></div>`).join('')}
 <div class="tfoot"><span>${l.length} ${l.length===1?'fornecedor':'fornecedores'}</span></div>`;
}

/* ---------- Análises ---------- */
function zelAna(){
 const per=S.relM||RELN,isY=per[0]==='Y',lab=isY?'Ano de '+per.slice(1):monthName(per),pp=isY?'Y'+(+per.slice(1)-1):ymAdd(per,-1),plab=isY?pp.slice(1):monthName(pp);
 const inP=(d,p)=>p[0]==='Y'?d.slice(0,4)===p.slice(1):d.slice(0,7)===p;
 const outs=p=>{const a=[];ZJ.forEach(j=>zOutsOf(j).forEach(e=>{if(inP(e.d,p))a.push({j,e,v:e.v/100,cat:e.cat||j.cat,nat:e.nat||'Material'});}));return a;};
 const cur=outs(per),prv=outs(pp),sum=a=>a.reduce((s,x)=>s+x.v,0),tot=sum(cur),ptot=sum(prv);
 const grp=(a,k)=>{const m={};a.forEach(x=>{const key=k(x);m[key]=(m[key]||0)+x.v;});return m;};
 const byCat=grp(cur,x=>x.cat),pCat=grp(prv,x=>x.cat),cats=Object.keys(Object.assign({},byCat,pCat)).sort((a,b)=>(byCat[b]||0)-(byCat[a]||0)),mxC=Math.max(1,...cats.map(c=>Math.max(byCat[c]||0,pCat[c]||0)));
 const byTipo=grp(cur,x=>x.j.tipo),pTipo=grp(prv,x=>x.j.tipo),mxT=Math.max(1,...ZTIPOS.map(t=>Math.max(byTipo[t]||0,pTipo[t]||0)));
 const mat=sum(cur.filter(x=>x.nat==='Material')),mao=sum(cur.filter(x=>x.nat==='Mão de obra'));
 const byForn=grp(cur.filter(x=>x.e.forn),x=>zFn(x.e.forn)),forns=Object.entries(byForn).sort((a,b)=>b[1]-a[1]),direto=sum(cur.filter(x=>!x.e.forn));
 const byJob={};cur.forEach(x=>{byJob[x.j.id]=(byJob[x.j.id]||0)+x.v;});const jobs=Object.entries(byJob).sort((a,b)=>b[1]-a[1]).slice(0,6);
 const semComp=cur.filter(x=>!x.e.file),delta=ptot?Math.round((tot-ptot)/ptot*100):null,nJ=Object.keys(byJob).length;
 const rowC=(label,v,pv,mx)=>`<li><div class="zl-ah"><b>${esc(label)}</b><span>${zR(v)}<small>${pv?zR(pv)+' em '+plab:'sem gasto em '+plab}</small></span></div><span class="bd-bar"><i style="width:${Math.round(v/mx*100)}%"></i></span><span class="bd-bar zl-prev"><i style="width:${Math.round(pv/mx*100)}%"></i></span></li>`;
 return `<header class="ph rise"><div><p class="eb">Zeladoria</p><h1>Análises</h1><p class="lede">Quanto a igreja gasta com as obras, e em quê</p></div></header>
 ${fMes()}
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Gasto em ${lab.toLowerCase()}</span><span class="kv">${zR(tot)}</span><span class="kd ${delta>0?'dn':'up'}">${delta==null?'sem '+plab+' para comparar':(delta>=0?'+':'−')+Math.abs(delta)+'% sobre '+plab}</span></div>
  <div class="k4"><span class="kl">Trabalhos com gasto</span><span class="kv">${nJ}</span><span class="kd">${cur.length} lançamento${cur.length===1?'':'s'}</span></div>
  <div class="k4"><span class="kl">Maior categoria</span><span class="kv zl-kvt">${cats.length&&byCat[cats[0]]?esc(cats[0]):'—'}</span><span class="kd">${cats.length&&byCat[cats[0]]?zR(byCat[cats[0]]):''}</span></div>
  <div class="k4"><span class="kl">Sem comprovante</span><span class="kv ${semComp.length?'dn':''}">${semComp.length}</span><span class="kd">${semComp.length?zR(sum(semComp))+' sem nota ou recibo':'tudo com comprovante'}</span></div>
 </section>
 <div class="pgrid rise" style="--d:2"><div class="col">
  <section class="card pc"><div class="sh"><h2>Por categoria</h2><span class="who">${lab} × ${plab}</span></div>${cats.length&&tot?`<ul class="zl-an">${cats.map(c=>rowC(c,byCat[c]||0,pCat[c]||0,mxC)).join('')}</ul>`:'<div class="mempty"><p>Sem gastos neste período.</p></div>'}</section>
  <section class="card pc"><div class="sh"><h2>Por tipo de trabalho</h2><span class="who">${lab} × ${plab}</span></div>${tot?`<ul class="zl-an">${ZTIPOS.map(t=>rowC(t,byTipo[t]||0,pTipo[t]||0,mxT)).join('')}</ul>`:'<div class="mempty"><p>Sem gastos neste período.</p></div>'}</section>
  <section class="card pc"><div class="sh"><h2>Por fornecedor</h2></div>${forns.length||direto?`<ul class="zl-lines">${forns.map(f=>`<li><span>${esc(f[0])}</span><b>${zR(f[1])}</b></li>`).join('')}${direto?`<li><span>Compras diretas, sem fornecedor cadastrado</span><b>${zR(direto)}</b></li>`:''}</ul>`:'<div class="mempty"><p>Sem gastos neste período.</p></div>'}</section>
 </div><div class="col">
  <section class="card pc"><div class="sh"><h2>Material × mão de obra</h2></div>
   <div class="zl-ln"><span>Material</span><b>${zR(mat)}</b></div><div class="zl-ln"><span>Mão de obra</span><b>${zR(mao)}</b></div>${zBar(mat,mat+mao)}</section>
  <section class="card pc"><div class="sh"><h2>Para conferir com o Financeiro</h2><span class="who">${lab}</span></div>
   <div class="zl-ln"><span>Saídas lançadas</span><b>${zR(tot)}</b></div><div class="zl-ln"><span>Lançamentos</span><b>${cur.length}</b></div><div class="zl-ln"><span>Com comprovante</span><b>${cur.length-semComp.length}</b></div><div class="zl-ln tot"><span>Sem comprovante</span><b class="${semComp.length?'neg':''}">${semComp.length}</b></div>
   ${semComp.length?`<ul class="zl-att" style="margin-top:12px">${semComp.slice(0,5).map(x=>`<li><span class="zl-ai">${ic('alert',16,2)}</span><span class="zl-at"><b>${esc(x.e.desc)}</b><small>${esc(x.j.n)} · ${fmtD(x.e.d)} · ${zR2(x.v)}</small></span><button class="btn ghost sm" data-a="zOpen" data-v="${x.j.id}">Abrir</button></li>`).join('')}</ul>`:''}</section>
  <section class="card pc"><div class="sh"><h2>Maiores trabalhos</h2><span class="who">${lab}</span></div>${jobs.length?`<ul class="zl-att">${jobs.map(([id,v])=>{const j=zJob(id);return `<li><span class="zl-at"><b>${esc(j.n)}</b><small>${esc(j.cat)} · previsto ${zPrev(j)?zR(zPrev(j)):'—'}</small></span><b class="zl-n">${zR(v)}</b></li>`;}).join('')}</ul>`:'<div class="mempty"><p>Sem gastos neste período.</p></div>'}</section>
 </div></div>`;
}

/* ---------- diálogos e ações ---------- */
const zSelOpts=(arr,sel)=>arr.map(o=>`<option ${o===sel?'selected':''}>${esc(o)}</option>`).join('');
const zFile=f=>{const i=f.querySelector('input[type=file]');return i&&i.files&&i.files[0]?i.files[0].name:'';};
const zRe=()=>{const y=window.scrollY;render();window.scrollTo(0,y);};
function zLog(j,t,by){j.hist.push([NOWD,t,by||ME.n]);}
function zFieldMoney(name,label,v=''){return `<label class="fld"><span class="fl">${label}</span><input name="${name}" inputmode="decimal" value="${v}" placeholder="0,00" autocomplete="off"><span class="err"></span></label>`;}
const zNum=s=>{const n=parseFloat(String(s).replace(/\./g,'').replace(',','.'));return isNaN(n)?0:n;};
function zForm(title,sub,body,submit,onOk,cls='sm'){
 openDlg(`${dlgHead(title,sub)}<form id="zF" class="fgrid one" novalidate>${body}<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">${submit}</button></div></form>`,cls);
 const f=$('#zF');f.addEventListener('input',e=>e.target.closest('.fld')&&e.target.closest('.fld').classList.remove('bad'));
 f.addEventListener('submit',e=>{e.preventDefault();onOk(f,(name,msg)=>{const i=f.querySelector('[name='+name+']');if(!i)return;const fl=i.closest('.fld');fl.classList.add('bad');const er=fl.querySelector('.err');if(er)er.textContent=msg;i.focus();});});
 return f;
}
const ZA={
 zOpen:v=>{S.zj=v;S.ztab='resumo';S.active='zel-trab';render();window.scrollTo({top:0});requestAnimationFrame(tabInd);},
 zBack:()=>{S.zj=null;render();window.scrollTo({top:0});},
 zTab:v=>{S.ztab=v;zRe();requestAnimationFrame(tabInd);},
 zView:v=>{S.zview=v;zRe();requestAnimationFrame(tabInd);},
 zSt:v=>{S.zst=v;zRe();},
 zAno:v=>{S.zano=v;zRe();},
 zMenu:()=>{const p=$('#zPop');closePops(p);p.classList.toggle('open');},
 zNew:()=>{
  zForm('Pedir um trabalho','Conte o que precisa ser feito. A Zeladoria avalia e responde.',
   `<label class="fld"><span class="fl">O que precisa ser feito?</span><input name="n" maxlength="90" placeholder="Ex.: Trocar a fechadura da sala 2" autocomplete="off"><span class="err"></span></label>
    <div class="fgrid"><label class="fld"><span class="fl">Categoria</span><span class="selw"><select name="cat">${zSelOpts(ZCATS)}</select>${ic('updown',14)}</span></label>
    <label class="fld"><span class="fl">Tipo</span><span class="selw"><select name="tipo">${zSelOpts(ZTIPOS)}</select>${ic('updown',14)}</span></label></div>
    <div class="fgrid"><label class="fld"><span class="fl">Onde?</span><span class="selw"><select name="local">${zSelOpts(ZLOCAIS)}</select>${ic('updown',14)}</span></label>
    <label class="fld"><span class="fl">Urgência</span><span class="selw"><select name="urg"><option>Normal</option><option>Urgente</option></select>${ic('updown',14)}</span></label></div>
    <label class="fld"><span class="fl">Detalhes <small>opcional</small></span><textarea class="ta" name="desc" rows="3" maxlength="500" placeholder="O que está acontecendo?"></textarea></label>
    <label class="fld"><span class="fl">Foto <small>opcional</small></span><input type="file" name="foto" accept="image/*"></label>`,'Enviar pedido',
   (f,bad)=>{const fd=new FormData(f),n=fd.get('n').trim();if(!n)return bad('n','Diga o que precisa ser feito');
    const j=ZJOB({n,cat:fd.get('cat'),tipo:fd.get('tipo'),local:fd.get('local'),urg:fd.get('urg'),desc:fd.get('desc').trim(),pedBy:ME.n,pedDate:NOWD,hist:[[NOWD,'Pedido feito por '+ME.n,ME.n]]});
    ZJ.unshift(j);closeDlg();S.zj=null;if(S.active!=='zel-trab'&&S.active!=='zel-vis')S.active='zel-trab';render();toast('Pedido enviado para a Zeladoria');});
 },
 zEval:v=>{const j=zJob(v);
  zForm('Avaliar o pedido',esc(j.n),
   `<div class="fld"><span class="fl">Quem vai fazer?</span><div class="cm-when"><label class="on"><input type="radio" name="exec" value="equipe" checked><span class="htile" style="--s:36px;background:var(--brand-soft);color:var(--brand-text)">${ic('users',17)}</span><span><b>A equipe da Zeladoria</b><small>Orçamento só de material</small></span><i class="cm-rd"></i></label>
    <label><input type="radio" name="exec" value="terceiro"><span class="htile" style="--s:36px;background:var(--brand-soft);color:var(--brand-text)">${ic('building',17)}</span><span><b>Um fornecedor</b><small>Material e mão de obra, com propostas</small></span><i class="cm-rd"></i></label></div></div>
    <label class="fld"><span class="fl">Responsável pelo trabalho</span><span class="selw"><select name="resp">${zSelOpts(ZTEAM,ZTEAM[0])}</select>${ic('updown',14)}</span></label>`,'Seguir para o orçamento',
   f=>{const fd=new FormData(f);j.exec=fd.get('exec');j.resp=fd.get('resp');j.st='orcamento';zLog(j,'Avaliado: será feito '+(j.exec==='equipe'?'pela equipe da Zeladoria':'por fornecedor'));closeDlg();ZA.zOpen(j.id);toast('Pedido avaliado');});
  $$('#zF [name=exec]').forEach(r=>r.addEventListener('change',()=>$$('#zF .cm-when label').forEach(l=>l.classList.toggle('on',l.querySelector('input').checked))));},
 zSend:v=>{const j=zJob(v);j.st='aprovacao';zLog(j,'Orçamento enviado para aprovação do Financeiro');zRe();toast('Enviado para aprovação do Financeiro');},
 zApprove:v=>{const j=zJob(v);
  zForm('Aprovação do Financeiro',esc(j.n),
   `<label class="fld"><span class="fl">Quem aprovou?</span><span class="selw"><select name="by">${zSelOpts(ZAPROV)}</select>${ic('updown',14)}</span></label>
    ${zFieldMoney('v','Valor aprovado',String(zPrev(j)).replace('.',','))}<label class="fld"><span class="fl">Data da aprovação</span><input type="date" name="d" value="${NOWD}" max="${NOWD}"></label><label class="fld"><span class="fl">Previsão de término</span><input type="date" name="fim" value="${addDays((zProp(j)?zProp(j).prazo:7)+0)}" min="${NOWD}"><span class="hint">Já vem do prazo da proposta. Dá para ajustar.</span></label>`,'Registrar aprovação',
   (f,bad)=>{const fd=new FormData(f),val=zNum(fd.get('v'));if(!val)return bad('v','Informe o valor aprovado');j.apr={by:fd.get('by'),d:fd.get('d'),v:val};j.fim=fd.get('fim')||'';j.st='execucao';zLog(j,'Aprovado pelo Financeiro: '+zR(val),fd.get('by'));closeDlg();zRe();toast('Aprovação registrada. O trabalho está em execução');});},
 zFinish:v=>{const j=zJob(v);confirmDel({title:'Concluir este trabalho?',body:`Gasto até agora: ${zR(zGasto(j))} de ${zR(zLib(j))} liberados. Depois de concluído, o caixa não recebe mais lançamentos.`,label:'Concluir',onConfirm:()=>{j.st='concluido';const x=zCx(j);x.status='encerrado';x.closedAt=NOWD;zLog(j,'Trabalho concluído');zRe();toast('Trabalho concluído');}});},
 zCancel:v=>{closePops();const j=zJob(v);
  zForm('Cancelar este trabalho?',esc(j.n),`<label class="fld"><span class="fl">Por que cancelar?</span><textarea class="ta" name="why" rows="3" maxlength="300" placeholder="Escreva o motivo"></textarea><span class="err"></span></label>`,'Cancelar o trabalho',
   (f,bad)=>{const why=new FormData(f).get('why').trim();if(!why)return bad('why','Escreva o motivo');j.st='cancelado';j.cancel=why;const x=zCx(j);x.status='encerrado';x.closedAt=NOWD;zLog(j,'Cancelado: '+why);closeDlg();zRe();toast('Trabalho cancelado');});},
 zMatAdd:v=>{const j=zJob(v);zForm('Adicionar item de material',esc(j.n),`<label class="fld"><span class="fl">Item</span><input name="i" maxlength="80" placeholder="Ex.: Tinta branca 18 L" autocomplete="off"><span class="err"></span></label>${zFieldMoney('v','Valor')}`,'Adicionar',
   (f,bad)=>{const fd=new FormData(f),i=fd.get('i').trim(),val=zNum(fd.get('v'));if(!i)return bad('i','Diga o item');if(!val)return bad('v','Informe o valor');j.mat.push({id:'m'+Date.now(),i,v:val});closeDlg();zRe();toast('Item adicionado');});},
 zMatDel:v=>{const [a,b]=v.split('|'),j=zJob(a);j.mat=j.mat.filter(m=>m.id!==b);zRe();},
 zPropAdd:v=>{const j=zJob(v);zForm('Nova proposta',esc(j.n),`<label class="fld"><span class="fl">Fornecedor</span><span class="selw"><select name="forn">${ZFORN.map(f=>`<option value="${f.id}">${esc(f.n)} · ${esc(f.serv)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Não achou? Cadastre em Fornecedores.</span></label>
   ${zFieldMoney('v','Valor da mão de obra')}<label class="fld"><span class="fl">Prazo, em dias</span><input name="prazo" inputmode="numeric" value="7" autocomplete="off"></label>
   <label class="fld"><span class="fl">Arquivo da proposta <small>PDF ou PPT</small></span><input type="file" name="arq" accept=".pdf,.ppt,.pptx"></label>`,'Salvar proposta',
   (f,bad)=>{const fd=new FormData(f),val=zNum(fd.get('v'));if(!val)return bad('v','Informe o valor');const a=zFile(f);j.props.push({id:'p'+Date.now(),forn:fd.get('forn'),v:val,prazo:+fd.get('prazo')||7,arq:a?[a]:[],esc:false});closeDlg();zRe();toast('Proposta salva');});},
 zPropPick:v=>{const [a,b]=v.split('|'),j=zJob(a);j.props.forEach(p=>p.esc=p.id===b);const p=j.props.find(x=>x.id===b);zLog(j,'Proposta escolhida: '+zFn(p.forn));zRe();toast('Proposta escolhida');},
 zPropDel:v=>{const [a,b]=v.split('|'),j=zJob(a);j.props=j.props.filter(p=>p.id!==b);zRe();},
 zFornNew:()=>zFornForm(null),zFornEdit:v=>zFornForm(ZFORN.find(f=>f.id===v)),
};
function zFornForm(f){
 zForm(f?'Editar fornecedor':'Novo fornecedor','Empresa ou profissional. Não tem acesso ao sistema.',
  `<label class="fld"><span class="fl">Nome</span><input name="n" maxlength="80" value="${esc(f?f.n:'')}" placeholder="Ex.: Elétrica Silva" autocomplete="off"><span class="err"></span></label>
   <label class="fld"><span class="fl">Serviço</span><span class="selw"><select name="serv">${zSelOpts(ZCATS,f?f.serv:ZCATS[0])}</select>${ic('updown',14)}</span></label>
   <div class="fgrid"><label class="fld"><span class="fl">Telefone</span><input name="tel" type="tel" value="${esc(f?f.tel:'')}" autocomplete="off"></label><label class="fld"><span class="fl">E-mail <small>opcional</small></span><input name="mail" type="email" value="${esc(f?f.mail:'')}" autocomplete="off"></label></div>
   <label class="fld"><span class="fl">CNPJ ou CPF <small>opcional</small></span><input name="doc" value="${esc(f?f.doc:'')}" autocomplete="off"></label>`,f?'Salvar':'Cadastrar',
  (fm,bad)=>{const fd=new FormData(fm),n=fd.get('n').trim();if(!n)return bad('n','Diga o nome');if(ZFORN.some(x=>x!==f&&norm(x.n)===norm(n)))return bad('n','Já existe um fornecedor com esse nome');
   const o={n,serv:fd.get('serv'),tel:fd.get('tel').trim(),mail:fd.get('mail').trim(),doc:fd.get('doc').trim()};if(f)Object.assign(f,o);else ZFORN.push(Object.assign({id:'zf'+(++_zfid)},o));closeDlg();zRe();toast(f?'Fornecedor atualizado':'Fornecedor cadastrado');});
}
Object.assign(A,ZA);

/* ---------- páginas, comentários e buscas ---------- */
{const _ph=placeholder;placeholder=id=>({'zel-vis':zelVis,'zel-trab':zelTrab,'zel-forn':zelForn,'zel-ana':zelAna})[id]?({'zel-vis':zelVis,'zel-trab':zelTrab,'zel-forn':zelForn,'zel-ana':zelAna})[id]():_ph(id);}
{const _nav=A.nav;A.nav=v=>{S.zj=null;if(v!=='zel-ana'&&String(S.relM)[0]==='Y')S.relM=RELN;_nav(v);};}
{const _r=render;render=function(){_r.apply(this,arguments);
 if(S.active==='zel-trab'&&S.zj)requestAnimationFrame(tabInd);
 const q=$('#zq');if(q&&!q._z){q._z=1;q.addEventListener('input',e=>{S.zq=e.target.value;$('#zrows').innerHTML=zRows();});}
 const fq=$('#zfq');if(fq&&!fq._z){fq._z=1;fq.addEventListener('input',e=>{S.zfq=e.target.value;$('#zfrows').innerHTML=zFornRows();});}
 const cf=$('#zcF');if(cf&&!cf._z){cf._z=1;cf.addEventListener('submit',e=>{e.preventDefault();const t=new FormData(cf).get('t').trim(),j=zJob(S.zj);if(!t||!j)return;j.cm.push([ME.n,NOWD,t]);zRe();});}
};}
