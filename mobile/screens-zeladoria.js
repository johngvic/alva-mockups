/* ===== Zeladoria no app administrativo (Tiago, 08/11/2026) =====
 * Spec `maintenance`: o trabalho passa por Pedido, Orçamento, Aprovação, Execução e Concluído (ou Cancelado, até a Aprovação). A aprovação é
 * do Financeiro, na fila de Aprovações (aprovado, o trabalho fica "Aprovado · aguardando o início" até alguém tocar em Iniciar a obra).
 * O app pede o trabalho, avalia, envia para aprovação, inicia, lança despesa com o comprovante, conclui, cancela, troca o responsável e comenta.
 * Orçamento (material e propostas de fornecedor), caixa completo, categorias, fornecedores (cadastro) e análises ficam na web. */
const ZW_ST={pe:['warning','Pedido'],or:['info','Orçamento'],ap:['warning','Aprovação'],ex:['info','Execução'],co:['ok','Concluído'],ca:['off','Cancelado']};
const ZW_TEAM=['Bruno Carvalho','Edson','Josias','Ana Costa','Pr. Marcos Lima'];
const zlR=n=>'R$ '+Math.round(n).toLocaleString('pt-BR');
let _zlN=0;
const zlMk=o=>Object.assign({id:'zw'+(_zlN++),tipo:'Manutenção',local:'',quem:'',st:'pe',urg:false,cats:[],resp:'',exec:'',forn:'',prev:0,verba:0,gasto:0,budget:false,appr:false,late:false,why:'',coms:[],desc:'',foto:''},o);
const ZW=[
 zlMk({n:'Torneira do banheiro masculino vazando',local:'Banheiros',quem:'Pr. Marcos Lima',urg:true,desc:'Vazando há dois dias.'}),
 zlMk({n:'Consertar a porta da sala de Kids',local:'Sala de Kids',quem:'Ana Costa'}),
 zlMk({n:'Pintar o salão principal',tipo:'Melhoria',local:'Salão principal',quem:'Bruno Carvalho',st:'or',resp:'Bruno Carvalho',exec:'fo',prev:4300,budget:true}),
 zlMk({n:'Instalar um bebedouro no hall',tipo:'Melhoria',local:'Hall de entrada',quem:'Josias',st:'or',resp:'Josias',exec:'eq',prev:1990}),
 zlMk({n:'Instalar o portão eletrônico do estacionamento',tipo:'Melhoria',local:'Estacionamento',quem:'Bruno Carvalho',st:'ap',resp:'Bruno Carvalho',exec:'fo',forn:'Portão Fácil',prev:11300,budget:true}),
 zlMk({n:'Substituir o piso do hall',tipo:'Melhoria',local:'Hall de entrada',quem:'Edson',st:'ap',resp:'Edson',exec:'fo',forn:'Pinturas Brasil',prev:8200,budget:true,appr:true}),
 zlMk({n:'Trocar o ar-condicionado da sala 3',local:'Sala 3',quem:'Bruno Carvalho',urg:true,st:'ex',resp:'Bruno Carvalho',exec:'fo',forn:'Frio Total Climatização',cats:['Ar-condicionado'],prev:7300,verba:7300,gasto:4200}),
 zlMk({n:'Reforma do telhado do anexo',tipo:'Melhoria',local:'Anexo',quem:'Bruno Carvalho',st:'ex',resp:'Bruno Carvalho',exec:'fo',forn:'Cobre Telhas',cats:['Cobertura'],prev:50000,verba:50000,gasto:19500,late:true}),
 zlMk({n:'Trocar as lâmpadas do corredor do anexo',local:'Anexo',quem:'Edson',st:'co',resp:'Edson',exec:'eq',cats:['Iluminação'],prev:340,verba:340,gasto:332}),
 zlMk({n:'Consertar a bomba d’água do banheiro',local:'Anexo',quem:'Edson',st:'co',resp:'Edson',exec:'eq',cats:['Hidráulica'],prev:2050,verba:2050,gasto:2050}),
 zlMk({n:'Trocar o carpete da sala 2',tipo:'Melhoria',local:'Sala 2',quem:'Ana Costa',st:'ca',why:'A Sala 2 está inativa; o pedido perdeu o sentido.'})];
ZW.forEach(r=>{Object.defineProperties(r,{
 s:{get(){return r.local+' · '+r.quem+(r.urg?' · Urgente':'')+(r.late?' · Atrasada':'');},enumerable:true},
 d:{get(){return [['Tipo',r.tipo],['Onde',r.local],['Quem pediu',r.quem],['Urgência',r.urg?'Urgente':'Normal'],...(r.resp?[['Responsável',r.resp]]:[]),...(r.exec?[['Quem faz',r.exec==='eq'?'A equipe da Zeladoria':'Fornecedor'+(r.forn?': '+r.forn:'')]]:[])];},enumerable:true}});});
const zlRow=id=>ZW.find(x=>x.id===id);
const zlStageTx=r=>r.st==='ap'&&r.appr?'Aprovado · aguardando o início':ZW_ST[r.st][1];
const zlTag=r=>vsTag(r.st==='ap'&&r.appr?'ok':ZW_ST[r.st][0],zlStageTx(r));
S.zl={f:'todos'};
function zlBody(){const f=S.zl.f,n=k=>ZW.filter(r=>k==='todos'?r.st!=='ca':r.st===k).length,l=ZW.filter(r=>f==='todos'?r.st!=='ca':r.st===f);
 return (can('zeladoria','criar')?`<button class="btn primary md block" data-a="zlNew">Pedir um trabalho</button>`:'')
  +vsChips('zlF',f,[['todos','Todos',n('todos')],...['pe','or','ap','ex','co'].map(k=>[k,ZW_ST[k][1],n(k)]),['ca','Cancelados',n('ca')]])
  +(ZW.length?fndBox('zlL','Buscar trabalho')+`<div class="vl" id="zlL">${l.map(r=>`<button class="vr tap" data-q="${esc(r.n+' '+r.local+' '+r.quem)}" data-a="zeOpen" data-v="${r.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.s)}${r.prev?' · previsto '+zlR(r.prev):''}${r.st==='ex'||r.st==='co'?' · gasto '+zlR(r.gasto):''}</span></span>${zlTag(r)}</button>`).join('')||vsEmpty('Nenhum trabalho aqui','Troque o filtro para ver outras etapas.')}</div>`:vsEmpty('Nenhum trabalho','Use Pedir um trabalho.'));}
function zlSheet(id){const r=zlRow(id),ed=can('zeladoria','editar'),mn=['pe','or','ap','ex','co'],i=mn.indexOf(r.st);
 /* cabeçalho: tipo e local em cima, nome, etapa e selos; fechar no canto */
 const head=`<div class="zf-head"><div class="stack g2" style="min-width:0;flex:1"><p class="eyebrow">${esc(r.tipo)} · ${esc(r.local)}</p><h3 class="t2">${esc(r.n)}</h3>${(r.st==='ca'||(r.st==='ap'&&r.appr)||r.urg||r.late)?`<div class="row g2" style="flex-wrap:wrap;margin-top:4px">${r.st==='ca'||(r.st==='ap'&&r.appr)?zlTag(r):''}${r.urg?vsTag('danger','Urgente'):''}${r.late?vsTag('danger','Atrasada'):''}</div>`:''}</div><button type="button" class="iconbtn zf-x" data-a="closeSheet" aria-label="Fechar">${ic('x',18,2.2)}</button></div>`;
 /* andamento pelas cinco etapas (ou o motivo do cancelamento) */
 const steps=r.st==='ca'?`<div class="zf-note bad">${ic('alert',18,2)}<span><b>Trabalho cancelado</b>${esc(r.why)}</span></div>`
  :`<ol class="zf-steps" aria-label="Etapas">${mn.map((k,j)=>`<li class="${j<i?'done':j===i?'now':''}"${j===i?' aria-current="step"':''}><i>${j<i?ic('check',12,3):''}</i><span>${ZW_STEPN[k]}</span></li>`).join('')}</ol>`;
 /* próximo passo logo abaixo do andamento: um botão principal e, em linha, as ações secundárias */
 let main='',note='';const sec=[];
 if(ed){if(r.st==='pe')main=`<button class="btn primary md block" data-a="zlEval" data-v="${id}">Avaliar o pedido</button>`;
  else if(r.st==='or'){if(r.budget)main=`<button class="btn primary md block" data-a="zlSend" data-v="${id}">Enviar para aprovação</button>`;else note='Falta o orçamento: monte o material'+(r.exec==='fo'?' e as propostas dos fornecedores':'')+' na web para poder enviar para aprovação.';}
  else if(r.st==='ap'){if(r.appr)main=`<button class="btn primary md block" data-a="zlStart" data-v="${id}">Iniciar a obra</button>`;else note='Enviado ao Financeiro. A aprovação acontece em Financeiro › Aprovações; se recusarem, o trabalho volta para Orçamento com o motivo.';}
  else if(r.st==='ex'){main=`<button class="btn primary md block" data-a="cxExp" data-v="${cxWorkBox(r).id}">${ic('camera',18,1.8)}Lançar despesa</button>`;sec.push(`<button class="btn outline md" data-a="zlDone" data-v="${id}">Concluir</button>`);}
  if(r.st!=='co'&&r.st!=='ca')sec.push(`<button class="btn outline md" data-a="zlResp" data-v="${id}">${r.resp?'Trocar responsável':'Definir responsável'}</button>`);
  if(['pe','or','ap'].includes(r.st))sec.push(`<button class="btn outline md zf-cancel" data-a="zlCancel" data-v="${id}">Cancelar</button>`);}
 const acts=(note?`<div class="zf-note">${ic('info',18,2)}<span>${note}</span></div>`:'')+main+(sec.length?`<div class="zf-acts${sec.length>1?' two':''}">${sec.join('')}</div>`:'');
 /* detalhes em um cartão: rótulo à esquerda, valor à direita */
 const rows=[['Quem pediu',r.quem],['Responsável',r.resp||'A definir'],...(r.exec?[['Quem faz',r.exec==='eq'?'A equipe da Zeladoria':'Fornecedor'+(r.forn?': '+r.forn:'')]]:[]),...(r.prev&&!['ex','co'].includes(r.st)?[['Previsto',zlR(r.prev)]]:[])];
 const det=`<section class="zf-sec"><p class="eb2">Detalhes</p><div class="zf-card zf-dl">${rows.map(([a,v])=>`<div><span>${a}</span><b>${esc(v)}</b></div>`).join('')}</div></section>`;
 /* o pedido: a foto (MNT-P-21, uma por pedido) e o texto de quem pediu */
 const ped=(r.desc||r.foto)?`<section class="zf-sec"><p class="eb2">O pedido</p><div class="zf-card zf-ped">${r.foto?`<button type="button" class="zf-foto" data-zfoto="1" aria-label="Ver a foto do pedido"><img src="${r.foto}" alt="Foto do pedido"><span>${ic('expand',14,2.2)}</span></button>`:''}${r.desc?`<p>${esc(r.desc)}</p>`:''}</div></section>`:'';
 /* dinheiro da obra: gasto × disponível com a barra da verba */
 const pct=r.verba?Math.min(100,Math.round(r.gasto/r.verba*100)):0;
 const money=['ex','co'].includes(r.st)?`<section class="zf-sec"><p class="eb2">Dinheiro</p><div class="zf-card zf-money"><div class="row between" style="align-items:flex-end"><span class="stack" style="gap:2px"><small>Gasto</small><b>${zlR(r.gasto)}</b></span><span class="stack" style="gap:2px;align-items:flex-end"><small>Disponível</small><b>${zlR(Math.max(0,r.verba-r.gasto))}</b></span></div><span class="ztrk${pct>=90?' hot':''}"><i style="width:${pct}%"></i></span><div class="row between zf-mm"><span>Verba ${zlR(r.verba)}</span><span>Previsto ${zlR(r.prev)}</span></div></div></section>`:'';
 /* comentários em balões; o campo de comentar é uma linha só com o botão de enviar */
 const com=`<section class="zf-sec"><p class="eb2">Comentários${r.coms.length?`<span class="zf-n">${r.coms.length}</span>`:''}</p>${r.coms.length?`<div class="zf-coms">${r.coms.map(c=>`<div class="zf-com">${pavM(c[0],'ceu')}<div class="zf-bub"><div class="row g2" style="align-items:baseline"><b>${esc(c[0])}</b><small>${c[2]}</small></div><p>${esc(c[1])}</p></div></div>`).join('')}</div>`:'<p class="vs">Nenhum comentário ainda.</p>'}${ed?`<div class="zf-cbox"><input id="zlCm" placeholder="Escreva um comentário" maxlength="500" aria-label="Comentar" autocomplete="off" readonly><button type="button" class="zf-send" data-a="zlComment" data-v="${id}" aria-label="Enviar comentário">${ic('send',17,2)}</button></div>`:''}</section>`;
 sheet(`<div class="zf">${head}${steps}${acts?`<div class="stack g3">${acts}</div>`:''}${ped}${det}${money}${['ex','co'].includes(r.st)?cxBlock(r.id,''):''}${com}</div>`,sh=>{
  const f=$('[data-zfoto]',sh);if(f)f.addEventListener('click',()=>photoView(r.foto,r.n));
  const cm=$('#zlCm',sh);if(cm){setTimeout(()=>{cm.readOnly=false;},420);cm.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();A.zlComment(id);}});}});}
const ZW_STEPN={pe:'Pedido',or:'Orçamento',ap:'Aprovação',ex:'Execução',co:'Concluído'};
function zlPick(title,callout,list,cur,okTxt,fn,extra){sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${title}</h3><p class="callout">${callout}</p></div>${extra||''}<div class="vl">${list.map(n=>`<button type="button" class="vr tap" data-zp="${esc(n)}" aria-pressed="${n===cur}"><span class="grow vn">${esc(n)}</span></button>`).join('')}</div><div class="otpmsg" id="zlEr" role="alert" style="min-height:0"></div><div class="stack g3"><button type="button" class="btn primary block" id="zlGo">${okTxt}</button><button type="button" class="tlink" data-a="zeOpen" data-v="${S.zl.cur}">Voltar</button></div></div>`,sh=>{let pick=cur;
  sh.querySelectorAll('[data-ex]').forEach(b=>b.addEventListener('click',()=>{S.zl.exec=b.getAttribute('data-ex');sh.querySelectorAll('[data-ex]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  sh.querySelectorAll('[data-zp]').forEach(b=>b.addEventListener('click',()=>{pick=b.getAttribute('data-zp');sh.querySelectorAll('[data-zp]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  $('#zlGo',sh).addEventListener('click',()=>{const e=fn(pick,sh);if(e)$('#zlEr',sh).textContent=e;});});}
Object.assign(A,{
 zlF:v=>{S.zl.f=v;softRender();},
 zeOpen:id=>{S.zl.cur=id;zlSheet(id);},
 zlNew:()=>{S.zl.cur='';delete PF.zwF;sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pedir um trabalho</h3><p class="callout">A Zeladoria recebe, avalia e orça. A categoria é escolhida em cada despesa, não aqui.</p></div>
   ${field({id:'zwN',label:'O que precisa ser feito',ph:'Ex.: Trocar o ar-condicionado',max:150})}
   <div class="stack g2"><span class="eb2">Tipo</span>${cuPickHTML('tipo',['Manutenção','Melhoria'],'Manutenção')}<p class="vs">Manutenção conserta o que existe; Melhoria cria ou muda algo.</p></div>
   ${field({id:'zwL',label:'Onde',ph:'Ex.: Banheiros, Sala 3, outro lugar'})}
   <div class="stack g2"><span class="eb2">Urgência</span>${cuPickHTML('urg',['Normal','Urgente'],'Normal')}</div>
   ${field({id:'zwD',label:'Detalhes (opcional)',area:true,ph:'O que está acontecendo',max:1000})}${photoField({id:'zwF',hint:'Uma foto ajuda a Zeladoria a entender o problema. JPG, PNG ou WEBP, até 5 MB.'})}
   <div class="otpmsg" id="zlEr" role="alert" style="min-height:0"></div>
   <div class="stack g3"><button type="button" class="btn primary block" id="zlGo">Enviar pedido</button><button type="button" class="tlink" data-a="closeSheet">Cancelar</button></div></div>`,sh=>{cuPickWire(sh);photoWire(sh);
   $('#zlGo',sh).addEventListener('click',()=>{const n=cuVal(sh,'zwN'),l=cuVal(sh,'zwL');if(!n){$('#zlEr',sh).textContent='Diga o que precisa ser feito.';return;}if(!l){$('#zlEr',sh).textContent='Diga onde fica.';return;}
    ZW.push(zlMk({n,tipo:cuPicked(sh,'tipo'),local:l,quem:'Você',urg:cuPicked(sh,'urg')==='Urgente',desc:cuVal(sh,'zwD'),foto:PF.zwF||''}));delete PF.zwF;S.zl.f='pe';closeSheet().then(()=>{softRender();toast('success','Pedido enviado para a Zeladoria',n);});});});},
 zlEval:id=>{const r=zlRow(id);S.zl.cur=id;S.zl.exec='eq';
  zlPick('Avaliar o pedido',esc(r.n)+'. Quem vai fazer e quem acompanha.',ZW_TEAM,ZW_TEAM[0],'Avaliar',(pick,sh)=>{r.exec=S.zl.exec;r.resp=pick;r.st='or';closeSheet().then(()=>{softRender();toast('success','Pedido avaliado',r.n);zlSheet(id);});return '';},
   `<div class="stack g2"><span class="eb2">Quem vai fazer</span><div class="row g2" id="zlEx"><button type="button" class="chip" data-ex="eq" aria-pressed="true">A equipe</button><button type="button" class="chip" data-ex="fo" aria-pressed="false">Um fornecedor</button></div><p class="vs">A equipe faz sem custo de mão de obra; com fornecedor, as propostas são montadas na web.</p></div>`);},
 zlSend:id=>{const r=zlRow(id);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Enviar para aprovação?</h3><p class="callout">O pedido de verba de ${zlR(r.prev)} vai para a fila de Aprovações do Financeiro. Se recusarem, o trabalho volta para Orçamento com o motivo.</p></div><div class="stack g3"><button class="btn primary md block" id="zlY">Enviar para aprovação</button><button class="tlink" data-a="zeOpen" data-v="${id}">Voltar</button></div></div>`,sh=>$('#zlY',sh).addEventListener('click',()=>{r.st='ap';r.appr=false;closeSheet().then(()=>{softRender();toast('success','Enviado para aprovação do Financeiro',r.n);zlSheet(id);});}));},
 zlStart:id=>{const r=zlRow(id);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Iniciar a obra</h3><p class="callout">${esc(r.n)}. Verba aprovada de ${zlR(r.prev)}. A previsão já vem do prazo da proposta.</p></div>${field({id:'zsI',label:'Início',type:'date',val:cuToday()})}${field({id:'zsF',label:'Previsão de término',type:'date',val:cuISO(14)})}<div class="otpmsg" id="zlEr" role="alert" style="min-height:0"></div><div class="stack g3"><button class="btn primary block" id="zlGo">Iniciar a obra</button><button class="tlink" data-a="zeOpen" data-v="${id}">Voltar</button></div></div>`,sh=>$('#zlGo',sh).addEventListener('click',()=>{const f=cuVal(sh,'zsF');if(!f||f<cuToday()){$('#zlEr',sh).textContent='A previsão de término precisa ser hoje ou depois.';return;}r.st='ex';r.verba=r.prev;cxWorkBox(r);closeSheet().then(()=>{softRender();toast('success','Obra iniciada',r.n);zlSheet(id);});}));},
 zlDone:id=>{const r=zlRow(id);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Concluir o trabalho?</h3><p class="callout">Gasto ${zlR(r.gasto)} de ${zlR(r.verba)} liberados. Depois de concluído, o caixa não recebe mais lançamentos.</p></div><div class="stack g3"><button class="btn primary md block" id="zlY">Concluir o trabalho</button><button class="tlink" data-a="zeOpen" data-v="${id}">Voltar</button></div></div>`,sh=>$('#zlY',sh).addEventListener('click',()=>{r.st='co';cxWorkBox(r).st='en';closeSheet().then(()=>{softRender();toast('success','Trabalho concluído',r.n);zlSheet(id);});}));},
 zlCancel:id=>{const r=zlRow(id);reasonSheet({title:'Cancelar o trabalho',callout:esc(r.n)+'. Só dá para cancelar até a Aprovação.',ph:'Ex.: o pedido perdeu o sentido',btn:'Cancelar o trabalho',who:r.quem.split(' ')[0],done:'Cancelado',run:async why=>{r.st='ca';r.why=why;await closeSheet();softRender();toast('info','Trabalho cancelado',r.n);zlSheet(id);}});},
 zlResp:id=>{const r=zlRow(id);S.zl.cur=id;zlPick(r.resp?'Trocar o responsável':'Definir o responsável',esc(r.n),ZW_TEAM,r.resp,'Salvar',pick=>{if(!pick)return 'Escolha alguém da equipe.';r.resp=pick;closeSheet().then(()=>{softRender();toast('success','Responsável definido',pick);zlSheet(id);});return '';});},
 zlComment:id=>{const tx=(($('#zlCm')||{}).value||'').trim();if(!tx){toast('error','Escreva o comentário.');return;}zlRow(id).coms.push(['Você',tx,'agora']);zlSheet(id);}
});
/* visão geral */
function zlVis(){const n=k=>ZW.filter(r=>r.st===k).length,need=ZW.filter(r=>r.st==='pe'||(r.st==='ap'&&r.appr)),ex=ZW.filter(r=>r.st==='ex');
 return `<div class="vk"><div><b>${n('pe')}</b><span>Pedidos a avaliar</span></div><div><b>${n('or')+n('ap')}</b><span>Em orçamento ou aprovação</span></div><div><b>${n('ex')}</b><span>Em execução</span></div></div>`
  +`<section class="stack g3"><p class="eb2">Precisam de atenção · ${need.length}</p>${need.map(r=>rsAtt(r.st==='pe'?'warn':'info',esc(r.n),r.st==='pe'?'Pedido novo · '+esc(r.s):'Aprovado pelo Financeiro, falta iniciar a obra · '+zlR(r.prev),'zeOpen',r.id)).join('')||rsOk('Nada esperando você','Os pedidos novos e as obras aprovadas aparecem aqui.')}</section>`
  +`<section class="stack g3"><p class="eb2">Em execução · ${ex.length}</p><div class="vl">${ex.map(r=>`<button class="vr tap" data-a="zeOpen" data-v="${r.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(r.n)}</span><span class="vs">${esc(r.local)} · gasto ${zlR(r.gasto)} de ${zlR(r.verba)}</span></span>${r.late?vsTag('danger','Atrasada'):''}</button>`).join('')||vsEmpty('Nada em execução','')}</div></section>`;}
Object.assign(LSD.zeladoria,{'Visão geral':{custom:zlVis},'Trabalhos':{custom:zlBody,newFlow:()=>A.zlNew()}});
Object.defineProperty(GPEND,'zeladoria',{configurable:true,enumerable:true,get:()=>[['Pedidos a avaliar',ZW.filter(r=>r.st==='pe').length],['Obras aprovadas para iniciar',ZW.filter(r=>r.st==='ap'&&r.appr).length]].filter(x=>x[1]>0)});
