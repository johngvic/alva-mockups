/* =========================================================
   PARIDADE COM O WEB · telas que o menu do web tem e o app não tinha
   (ou tinha com outro desenho): Zeladoria e Secretaria refeitas, Disciplina,
   Devocional, Distribuições, Transferências, Divergências, Pedidos do app
   e Automações da plataforma.
   ========================================================= */
let vsDiv,vsOrders;
{
const B=t=>(k,l,o)=>Object.assign({k,l,t},o||{});
const tx=B('text'),ar=B('area'),dt=B('date'),tm=B('time'),nu=B('num'),mo=B('money'),tg=B('tog');
const sl=(k,l,opts,o)=>Object.assign({k,l,t:'sel',opts},o||{}),mu=(k,l,opts,o)=>Object.assign({k,l,t:'multi',opts},o||{}),fl=(k,l,o)=>Object.assign({k,l,t:'file'},o||{});
const H=h=>({h});const half=o=>Object.assign({half:1},o||{});
const names=(m,s)=>LSD[m][s].rows.map(r=>r.n);
const PEOPLE=names('pessoas','Membros'),PASTORES=['Pr. Rafael Pereira','Pr. Marcos Lima','Convidado'];
const conv=(f,p)=>{const t=f.t||'text';if(f.pre&&p.startsWith(f.pre))p=p.slice(f.pre.length);
 if(t==='date')return rfIso(p)||'';if(t==='num')return String(parseInt(p.replace(/\./g,''))||'');if(t==='money')return p.replace(/[^\d.,]/g,'');if(t==='multi')return [p];return p;};
/* declara uma seção; as linhas de exemplo viram valores do formulário a partir do subtítulo */
const def=(c)=>{c.rows.forEach(r=>{if(r.v)return;const parts=r.s.split(' · '),v={[c.main]:r.n},n=c.sub.length;
  c.sub.forEach((k,i)=>{const f=c.form.find(y=>y.k===k);if(!f||parts[i]==null)return;v[k]=conv(f,i===n-1?parts.slice(i).join(' · '):parts[i]);});
  Object.assign(v,r.x||{});r.v=v;if(!r.d)r.d=rfDetail(c,v);});return c;};
const rows=(p,a,f)=>a.map((x,i)=>Object.assign({id:p+i},f(x,i)));
const goSec=(m,s)=>{const sc=gMod(m)[5];S.gmod=m;if(!gFewSecs(m,sc)){S.gsec=s;if(S.screen==='gSecao')softRender();else go('gSecao');}else{S.gtab=sc.indexOf(s);softRender();}};
const kpis=a=>`<div class="vk">${a.map(([n,l])=>`<div><b>${n}</b><span>${l}</span></div>`).join('')}</div>`;
const bar=(l,v,max,txt)=>`<div class="vr zb"><span class="grow stack" style="gap:6px;min-width:0"><span class="row between"><span class="vn">${esc(l)}</span><span class="vs">${txt}</span></span><span class="ztrk"><i style="width:${max?Math.max(2,Math.round(v/max*100)):0}%"></i></span></span></div>`;
const sec=(t,b)=>`<section class="stack g3"><p class="eb2">${t}</p>${b}</section>`;
const pend=(t,s,a,fn,v)=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${t}</span><span class="vs">${s}</span></span><button class="btn outline sm" data-a="${fn}" data-v="${v}">${a}</button></div>`;
const R$=n=>'R$ '+n.toLocaleString('pt-BR');

/* ======================= ZELADORIA ======================= */
const ZC=['Ar-condicionado','Pintura','Elétrica','Hidráulica','Portas e portões','Cobertura','Iluminação','Marcenaria','Jardim','Segurança'];
const ZLOC=['Banheiros','Sala de Kids','Salão principal','Hall de entrada','Estacionamento','Sala 3','Anexo','Templo','Cozinha'];
const ZT={pe:['warning','Pedido'],or:['info','Orçamento'],ap:['warning','Aprovação'],ex:['info','Execução'],co:['ok','Concluído']};
const zT=def({noun:'trabalhos',add:'Pedir um trabalho',ST:ZT,main:'n',sub:['local','quem'],
 extra:r=>(r.st==='ex'||r.st==='co')&&can('zeladoria','criar')?`<button class="btn outline md block" data-a="zeDesp" data-v="${r.id}">${ic('camera',18,1.8)}Adicionar despesa</button>`:'',
 acts:[['Avaliar pedido','or',['pe']],['Enviar para aprovação','ap',['or']],['Aprovar e iniciar','ex',['ap']],['Concluir trabalho','co',['ex']]],
 form:[tx('n','O que precisa ser feito',{req:1,ph:'Ex.: Trocar o ar-condicionado'}),sl('local','Onde',ZLOC),tx('quem','Quem pediu',{ph:'Nome'}),
  sl('tipo','Tipo',['Manutenção','Melhoria']),sl('cat','Categoria',ZC),tg('urg','Urgente',{hint:'Avaliar o quanto antes'}),
  mo('prev','Valor previsto'),ar('desc','Detalhes',{ph:'O que está acontecendo'}),fl('foto','Fotos',{multi:1,acc:'image/*',btn:'Anexar fotos'})],
 rows:rows('zt',[
  ['Torneira do banheiro masculino vazando','Banheiros · Pr. Marcos Lima','pe',{cat:'Hidráulica',tipo:'Manutenção',urg:true}],
  ['Consertar a porta da sala de Kids','Sala de Kids · Ana Costa','pe',{cat:'Portas e portões',tipo:'Manutenção'}],
  ['Pintar o salão principal','Salão principal · Bruno Carvalho','or',{cat:'Pintura',tipo:'Melhoria',prev:'4.300'}],
  ['Instalar um bebedouro no hall','Hall de entrada · Josias','or',{cat:'Hidráulica',tipo:'Melhoria',prev:'1.990'}],
  ['Instalar o portão eletrônico do estacionamento','Estacionamento · Bruno Carvalho','ap',{cat:'Portas e portões',tipo:'Melhoria',prev:'11.300'}],
  ['Trocar o ar-condicionado da sala 3','Sala 3 · Bruno Carvalho','ex',{cat:'Ar-condicionado',tipo:'Manutenção',urg:true,prev:'7.300'}],
  ['Reforma do telhado do anexo','Anexo · Bruno Carvalho','ex',{cat:'Cobertura',tipo:'Melhoria',prev:'50.000'}],
  ['Trocar as lâmpadas do corredor do anexo','Anexo · Edson','co',{cat:'Iluminação',tipo:'Manutenção',prev:'340'}],
  ['Consertar a bomba d’água do banheiro','Anexo · Edson','co',{cat:'Hidráulica',tipo:'Manutenção',prev:'2.050'}],
  ['Trocar a fechadura da secretaria','Anexo · Josias','co',{cat:'Segurança',tipo:'Manutenção',prev:'420'}]
 ],([n,s,st,x])=>({n,s,st,x}))});
const zF=def({noun:'fornecedores',add:'Novo fornecedor',ST:{at:['ok','Ativo'],in:['off','Inativo']},acts:[['Desativar','in',['at']],['Reativar','at',['in']]],main:'n',sub:['serv','tel'],
 form:[tx('n','Nome do fornecedor',{req:1,ph:'Empresa ou profissional'}),sl('serv','Serviço',ZC),tx('tel','Telefone',{ph:'(11) 90000-0000',half:1}),tx('email','E-mail',{ph:'contato@empresa.com',half:1}),tx('doc','CNPJ ou CPF'),ar('obs','Observações')],
 rows:rows('zf',[['Frio Total Climatização','Ar-condicionado · (11) 97711-2030','contato@friototal.com.br'],['ClimaSul Instalações','Ar-condicionado · (11) 98822-1544','orcamentos@climasul.com.br'],['RefriMax','Ar-condicionado · (11) 3456-7788','vendas@refrimax.com.br'],['Pinturas Brasil','Pintura · (11) 99455-0192','pinturasbrasil@email.com'],['Portão Fácil','Portas e portões · (11) 3300-4521','atendimento@portaofacil.com.br'],['Cobre Telhas','Cobertura · (11) 98100-7765','obras@cobretelhas.com.br'],['Eletro Lima','Elétrica · (11) 97888-3321','limaeletrica@email.com']],([n,s,e])=>({n,s,st:'at',x:{email:e}}))});
const ZCT=[['Ar-condicionado','6 lançamentos · 3 trabalhos','4.200'],['Pintura','2 lançamentos · 1 trabalho','0'],['Elétrica','3 lançamentos · 2 trabalhos','350'],['Hidráulica','4 lançamentos · 2 trabalhos','2.050'],['Portas e portões','1 lançamento · 1 trabalho','0'],['Cobertura','4 lançamentos · 2 trabalhos','19.500'],['Iluminação','2 lançamentos · 2 trabalhos','332'],['Marcenaria','0 lançamentos · 0 trabalhos','0'],['Jardim','2 lançamentos · 1 trabalho','0'],['Segurança','2 lançamentos · 2 trabalhos','420']];
const zC=def({noun:'categorias',add:'Nova categoria',ST:{at:['ok','Ativa']},acts:[],main:'n',sub:[],empty:'0 lançamentos · 0 trabalhos',
 form:[tx('n','Nome da categoria',{req:1,ph:'Ex.: Marcenaria'}),sl('cor','Cor',['Azul','Verde','Laranja','Rosa','Roxo'])],
 rows:rows('zc',ZCT,([n,s,v])=>({n,s:s+' · R$ '+v+' em 2026',st:'at'}))});
const zeVis=()=>{const t=zT.rows,n=s=>t.filter(r=>r.st===s).length,need=t.filter(r=>r.st==='pe'||r.st==='ap');
 return kpis([[n('pe'),'Pedidos a avaliar'],[n('or')+n('ap'),'Em orçamento ou aprovação'],[n('ex'),'Em execução']])
 +sec('Precisa de você · '+need.length,need.length?`<div class="vl">${need.map(r=>pend(esc(r.n),r.st==='pe'?'Pedido novo · '+esc(r.s):'Aguardando o Financeiro · previsto R$ '+(r.v.prev||'—'),r.st==='pe'?'Avaliar':'Abrir','zeOpen',r.id)).join('')}</div>`:vsEmpty('Nada esperando você','Os pedidos novos e as aprovações aparecem aqui.'))
 +sec('Em execução · '+n('ex'),`<div class="vl">${t.filter(r=>r.st==='ex').map(r=>`<button class="vr tap" data-a="zeOpen" data-v="${r.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.s)}</span></span><span class="vs">R$ ${r.v.prev||'—'}</span></button>`).join('')||vsEmpty('Nada em execução','')}</div>`)
 +sec('Concluídos recentemente · '+n('co'),`<div class="vl">${t.filter(r=>r.st==='co').map(r=>`<button class="vr tap" data-a="zeOpen" data-v="${r.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.v.cat)} · gasto R$ ${r.v.prev}</span></span></button>`).join('')}</div>`);};
const zeAna=()=>{const cats=ZCT.map(([n,,v])=>[n,parseInt(v.replace(/\./g,''))]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]),tot=cats.reduce((n,x)=>n+x[1],0);
 const forn=[['Cobre Telhas',11500],['RefriMax',3100],['Compras diretas, sem fornecedor',9782]],mat=[['Material',9782],['Mão de obra',14600]];
 return kpis([[R$(tot),'Gasto em 2026'],[cats[0][0],'Maior categoria'],['0','Sem comprovante']])
 +sec('Por categoria',`<div class="vl">${cats.map(([n,v])=>bar(n,v,cats[0][1],R$(v))).join('')}</div>`)
 +sec('Por fornecedor',`<div class="vl">${forn.map(([n,v])=>bar(n,v,forn[2][1]>11500?forn[2][1]:11500,R$(v))).join('')}</div>`)
 +sec('Material × mão de obra',`<div class="vl">${mat.map(([n,v])=>bar(n,v,mat[1][1],R$(v))).join('')}</div>`);};
LSD.zeladoria={'Visão geral':{custom:zeVis},'Trabalhos':zT,'Fornecedores':zF,'Categorias':zC,'Análises':{custom:zeAna}};
gMod('zeladoria')[5]=['Visão geral','Trabalhos','Fornecedores'];
GPEND.zeladoria=[['Pedidos a avaliar',2],['Aguardando aprovação',1]];
Object.assign(A,{zeOpen:id=>{closeSheet();goSec('zeladoria','Trabalhos');lsSheet(id);},
 zeDesp:async id=>{const r=lsRow(id);await closeSheet();
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Adicionar despesa</h3><p class="callout">${esc(r.n)}</p></div>${field({id:'zd_v',label:'Valor',ph:'0,00',im:'decimal'})}${field({id:'zd_d',label:'O que foi comprado',ph:'Ex.: Material elétrico'})}<label class="rfadd tap" for="zd_f">${ic('camera',18)}<span>Tirar foto do comprovante</span></label><input id="zd_f" type="file" accept="image/*" capture="environment" hidden><div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="zdOk">Salvar</button></div></div>`,sh=>$('#zdOk',sh).addEventListener('click',()=>{closeSheet();toast('success','Despesa adicionada',r.n+' · lançada no caixa da Zeladoria.');}));}});

/* ======================= CUIDADO › Disciplina (restrita) ======================= */
LSD.cuidado['Disciplina']=def({noun:'registros',add:'Novo registro',av:1,restrict:'admin',ST:{vg:['warning','Em vigor'],rv:['danger','Revisão vencida'],ag:['info','Aguardando a Secretaria'],en:['off','Encerrado']},
 acts:[['Registrar revisão','vg',['rv']],['Encerrar registro','en',['vg','rv','ag']]],main:'n',sub:['tipo','resp'],
 form:[sl('n','Pessoa',PEOPLE,{req:1}),sl('tipo','Tipo',['Admoestação','Afastamento temporário','Desligamento'],{req:1}),sl('resp','Responsável',PASTORES),dt('desde','Desde',{half:1}),dt('rev','Revisão',{half:1}),ar('obs','Motivo (reservado)',{ph:'Fica só neste registro'})],
 rows:rows('dc',[['Juliana Prado','Afastamento temporário · Pr. Marcos Souza','rv'],['Ana Clara Lima','Afastamento temporário · Pr. Rafael Pereira','ag'],['Elisa Moura','Afastamento temporário · Pr. Rafael Pereira','vg'],['Otávio Lins','Admoestação · Pr. Rafael Pereira','vg'],['Marcos Alves','Admoestação · Pr. Marcos Lima','en'],['Paulo Reis','Desligamento · Pr. Rafael Pereira','en']],([n,s,st])=>({n,s,st}))});
gMod('cuidado')[5]=['Discipulado','Acompanhamento','Pedidos de oração'];

/* PESSOAS › Devocional: no app é só consulta; a definição fica em screens-pessoas.js (o formulário de criar e editar é da web) */
gMod('pessoas')[5]=['Integração','Membros','Devocional'];

/* ======================= ADMINISTRAÇÃO › Automações da plataforma ======================= */
const JOBS=[['Entrega de notificações','Envia e-mail e push da fila e reenvia o que falhou','A cada minuto','at'],['Lembretes e compromissos','Dispara os lembretes dos compromissos publicados pelos domínios','A cada 5 minutos','at'],['Aniversário e boas-vindas','Felicita quem faz aniversário na hora local de cada igreja','A cada hora','at'],['Transmissão ao vivo (grade)','Gera os compromissos das próximas 24 horas da grade dos canais','A cada hora','at'],['Alertas da equipe','Detecta o que está vencendo e avisa quem cuida, em todos os módulos','A cada hora','at'],['Alertas de estoque','Avisa o estoque abaixo do mínimo de Cafeteria, Restaurante e Loja','A cada hora','ds'],['Pagamentos','Reconcilia, reenvia, expira e lembra o prazo de pagamentos','A cada 10 minutos','at'],['Pedidos do provedor de comércio','Refaz a venda dos pedidos que falharam e aplica cancelamentos pendentes','A cada 5 minutos','fa'],['Sincronização de itens com o provedor','Envia ao provedor os itens que mudaram, com nova tentativa crescente','A cada 5 minutos','fa'],['Sincronização completa','Reenvia o estado de todos os itens vinculados ao provedor','Todo dia, 03:00','at'],['Exportação de dados e exclusão de conta','Gera o arquivo “Baixar meus dados” e conclui a exclusão de conta','A cada 5 minutos','at'],['Retenção e expurgo','Apaga o que passou do prazo de guarda, uma política por origem','Todo dia, 03:00','at'],['Entrega durável de eventos','Reentrega aos consumidores os eventos pendentes ou que falharam','A cada minuto','at'],['Detecção de cadastros duplicados','Compara os cadastros de cada igreja e deixa prontos os pares duplicados','Todo dia, 03:00','at'],['Sincronização com o provedor externo','Importa o que o provedor tem, compara os dois lados e registra divergências','Todo dia, 04:00','at']];
LSD.admin['Automações']={noun:'jobs',noAdd:1,ro:1,ST:{at:['ok','Ativo'],ds:['off','Desativado'],fa:['danger','Falhou']},acts:[['Tentar de novo','at',['fa']],['Desativar','ds',['at','fa']],['Ativar','at',['ds']]],
 rows:rows('jb',JOBS,([n,d,r,st],i)=>({n,s:r+(st==='fa'?' · falhou na última execução':st==='ds'?' · não roda':' · última: concluída hoje'),st,d:[['O que faz',d],['Recorrência',r],['Última execução',st==='ds'?'—':st==='fa'?'Falhou hoje, 14:20':'Concluída hoje, 14:'+String(10+i*2).padStart(2,'0')],['Fuso','Horário de Brasília']]}))};
{const a=gMod('admin');a[5]=['Usuários e permissões'];}

/* ======================= LOJA, CAFETERIA, RESTAURANTE › Divergências e Pedidos do app ======================= */

gMod('shop')[5]=['Visão geral','Itens','Vendas','Pedidos do app','Caixa diário','Movimentações','Resultados'];
const DV={cafe:[['n','Bolo de cenoura · fatia ficou com saldo −2','Vendas do totem e do balcão passaram do estoque. Ajuste o saldo.'],['l','Suco de uva 300 ml (pedido do totem T-2033)','O totem vendeu uma linha que não existe no cadastro. Código do produto no totem: T3301.'],['p','Pipoca · porção: R$ 7,00 no totem, R$ 5,00 no cadastro','O preço da venda difere do preço do item. Confira qual vale.']],rest:[['n','Marmita executiva ficou com saldo −3','As vendas passaram do estoque. Ajuste o saldo.'],['p','Suco natural: R$ 9,00 no totem, R$ 8,00 no cadastro','O preço da venda difere do preço do item. Confira qual vale.']],shop:[['n','Camiseta Alva (G) ficou com saldo −1','Um pedido do app passou do estoque. Ajuste o saldo.']]};
const DVK={n:['danger','Estoque negativo'],l:['warning','Linha sem item'],p:['info','Preço diferente']};
const VSX={};Object.keys(DV).forEach(k=>{VSX[k]={div:DV[k].map(([t,a,b],i)=>({id:k+'d'+i,t,a,b}))};});
VSX.shop.orders=[['K9QX','#A1036','Mariana Costa','30/09 · 08:12','1× Camiseta Alva (M), 1× Devocional 365 dias',118,'sep'],['T4ME','#A1035','Felipe Andrade','29/09 · 21:40','1× Bíblia de estudo',129,'sep'],['B7RA','#A1034','Juliana Prado','29/09 · 19:05','2× Boné Alva',90,'pro'],['Z2LD','#A1033','Otávio Lins','28/09 · 12:30','1× Ecobag Alva, 1× Livro · Uma vida com propósito',78,'pro'],['H5PN','#A1032','Ana Clara Lima','27/09 · 17:48','2× Camiseta Alva (P)',118,'ret'],['M8CT','#A1031','Rafael Pereira','27/09 · 10:02','1× Caneca Alva',35,'ret']].map(([code,num,n,when,l,t,st],i)=>({id:'o'+i,code,num,n,when,l,t,st}));
Object.defineProperty(GPEND,'shop',{configurable:true,enumerable:true,get:()=>[['Pedidos do app a separar',VSX.shop.orders.filter(x=>x.st==='sep').length]].filter(x=>x[1]>0)});
vsDiv=function(k){const d=VSX[k].div,n=t=>d.filter(x=>x.t===t).length;
 return kpis([[d.length,'Abertas'],[d.filter(x=>x.k==='n').length||0,'Estoque negativo'],[d.filter(x=>x.k!=='n').length,'Cadastro']].map(x=>x))
 +'<p class="callout">O que a venda trouxe e o cadastro ainda não acompanha.</p>'
 +(d.length?`<div class="vl">${d.map(x=>`<div class="dvc"><div class="row between" style="align-items:flex-start;gap:12px"><span class="vn">${esc(x.t)}</span>${vsTag(DVK[x.k][0],DVK[x.k][1])}</div><span class="vs">${esc(x.b)}</span><div class="row g3">${x.k==='l'?`<button class="btn outline sm" data-a="dvFix" data-v="${k}|${x.id}|Vinculado">Vincular a existente</button><button class="btn primary sm" data-a="dvFix" data-v="${k}|${x.id}|Item criado">Criar item</button>`:`<button class="btn primary sm" data-a="dvFix" data-v="${k}|${x.id}|Ajustado">Ajustar</button>`}</div></div>`).join('')}</div>`:vsEmpty('Nenhuma divergência','Tudo o que foi vendido está de acordo com o cadastro.'));}
VSX.cafe.div.forEach((x,i)=>x.k=['n','l','p'][i]);VSX.rest.div.forEach((x,i)=>x.k=['n','p'][i]);VSX.shop.div.forEach(x=>x.k='n');
const OST={sep:['warning','Separando'],pro:['info','Pronto para retirar'],ret:['ok','Retirado']};
vsOrders=function(k){const o=VSX[k].orders,n=s=>o.filter(x=>x.st===s).length;
 const g=(s,l)=>o.some(x=>x.st===s)?`<p class="eb2" style="padding:14px 0 6px">${l} · ${n(s)}</p><div class="vl">${o.filter(x=>x.st===s).map(x=>`<div class="vr" data-n="${esc(norm2(x.code+' '+x.num+' '+x.n))}" style="align-items:flex-start"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(x.n)}</span><span class="vs">${x.num} · ${x.when}</span><span class="vs" style="white-space:normal">${esc(x.l)}</span><span class="vs"><b>${vsMoney(x.t)}</b></span></span>${x.st==='sep'?`<button class="btn outline sm" data-a="odPro" data-v="${x.id}">Marcar como pronto</button>`:x.st==='pro'?`<button class="btn primary sm" data-a="odRet" data-v="${x.id}">Confirmar retirada</button>`:vsTag('ok','Retirado')}</span></div>`).join('')}</div>`:'';
 return kpis([[n('sep'),'Para separar'],[n('pro'),'Prontos para retirar'],[n('ret'),'Retirados']])
 +vsSearch('vsOq','Buscar pelo código de retirada, nome ou pedido','')
 +`<div id="odList">${g('sep','Separando')+g('pro','Pronto para retirar')+g('ret','Retirados')}</div>`;}
phone.addEventListener('input',e=>{if(e.target.id!=='vsOq')return;const q=norm2(e.target.value);document.querySelectorAll('#odList .vr').forEach(r=>{r.hidden=!!q&&!r.dataset.n.includes(q);});});
Object.assign(A,{
 dvFix:v=>{const [k,id,t]=v.split('|'),a=VSX[k].div,i=a.findIndex(x=>x.id===id),x=a[i];a.splice(i,1);softRender();toast('success',t,x.t);},
 odPro:id=>{const x=VSX.shop.orders.find(y=>y.id===id);x.st='pro';softRender();toast('success','Pronto para retirar','O comprador foi avisado · '+x.num);},
 odRet:id=>{const x=VSX.shop.orders.find(y=>y.id===id);
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Confirmar retirada</h3><p class="callout">${esc(x.n)} · ${x.num}. Peça o código que aparece no app do comprador.</p></div>${field({id:'odCode',label:'Código de retirada',ph:'Ex.: K9QX'})}
  <div class="row g3"><button class="btn outline md grow" data-a="closeSheet">Cancelar</button><button class="btn primary md grow" id="odOk">Confirmar</button></div></div>`,sh=>$('#odOk',sh).addEventListener('click',()=>{if(val('odCode').toUpperCase()!==x.code){setErr('odCode','O código não confere.');return;}x.st='ret';closeSheet();softRender();toast('success','Retirada confirmada',x.n);}));}
});
}
