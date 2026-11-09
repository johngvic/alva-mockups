/* ===== Quadros: UM componente para a ficha do Ministério e a ficha do Evento (Tiago, 08/11/2026) =====
 * Kernel `task-boards`: quadro com colunas e tarefas; a última coluna é "concluída". No app: ver o quadro, Mover (e Concluir),
 * Comentar e Nova tarefa (Editar). Criar, renomear, encerrar, duplicar e excluir quadro, gerenciar colunas e excluir tarefa ficam na web.
 * A Zeladoria usa as mesmas colunas como etapas fixas do trabalho (chips + lista), sem arrastar: ver screens-zeladoria.js. */
let _qdN=0;
S.qd={col:0,back:'',cur:null};
const qdBoard=o=>Object.assign({id:'qb'+(++_qdN),st:'at',cols:['A fazer','Em andamento','Concluído'],tasks:[]},o);
const qdTask=(col,t,o)=>Object.assign({id:'qt'+(++_qdN),col,t,desc:'',min:'',who:'',due:null,coms:[]},o);
const QDB=[
 qdBoard({own:'Louvor',n:'Repertório de dezembro',tasks:[
  qdTask(0,'Escolher as músicas do Natal',{who:'Davi Melo',due:3,desc:'Seis músicas, com tom e arranjo.'}),
  qdTask(1,'Ensaiar a banda',{who:'Davi Melo',due:6}),
  qdTask(1,'Revisar a letra das músicas novas',{who:'Bia Melo',due:-1,coms:[['Bia Melo','Falta conferir a segunda estrofe.','ontem']]}),
  qdTask(2,'Pedir as cifras ao Ministério de Música',{who:'Davi Melo'})]}),
 qdBoard({own:'Infantil',n:'Natal Kids',tasks:[
  qdTask(0,'Comprar materiais da peça',{min:'Infantil',who:'Cláudia Ferraz',due:10}),
  qdTask(1,'Ensaiar com as crianças',{who:'Mônica Souza',due:5}),
  qdTask(2,'Reservar a Sala Kids',{who:'Patrícia Lima'})]}),
 qdBoard({own:'Eventos',n:'Retiro de Jovens: logística',st:'enc',tasks:[qdTask(2,'Fechar o ônibus',{who:'Giovanna Martins'})]}),
 qdBoard({own:'ev1',n:'Preparação da Conferência',cols:['A fazer','Em andamento','Concluído'],tasks:[
  qdTask(0,'Imprimir os crachás',{min:'Secretariado',due:8}),
  qdTask(0,'Confirmar os preletores',{who:'Pr. Marcos Lima',due:-2}),
  qdTask(1,'Montar a sala de recepção',{min:'Cafeteria',who:'Juliana Reis',due:9}),
  qdTask(2,'Reservar o Templo',{who:'Patrícia Oliveira'})]})
];
const qdDay=off=>off==null?'':cuISO(off);
const qdLast=b=>b.cols.length-1;
const qdOver=(b,t)=>t.due!=null&&t.col!==qdLast(b)&&t.due<0;
const qdSoon=(b,t)=>t.due!=null&&t.col!==qdLast(b)&&t.due>=0&&t.due<=3;
const qdWho=t=>[t.who,t.min&&('Ministério '+t.min)].filter(Boolean).join(' · ')||'Sem responsável';
const qdDueTx=t=>t.due==null?'Sem prazo':cuFmt(qdDay(t.due));
function qdRowOf(b){const k=b.tasks.length,late=b.tasks.filter(t=>qdOver(b,t)).length,done=b.tasks.filter(t=>t.col===qdLast(b)).length;
 return `<button class="vr tap" data-q="${esc(b.n)}" data-a="qdOpen" data-v="${b.id}|"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(b.n)}</span><span class="vs">${b.cols.length} colunas · ${k} ${k===1?'tarefa':'tarefas'} · ${done} ${done===1?'concluída':'concluídas'}${late?' · '+late+(late===1?' atrasada':' atrasadas'):''}</span></span>${vsTag(b.st==='at'?'ok':'off',b.st==='at'?'Ativo':'Encerrado')}</button>`;}
/* bloco "Quadros" das fichas (mesma linha em todo lugar) */
function qdBlock(own,back){const l=QDB.filter(b=>b.own===own);
 return `<div class="stack g2"><p class="eb2">Quadros</p>${l.length?`<div class="vl">${l.map(b=>qdRowOf(b).replace('data-v="'+b.id+'|"','data-v="'+b.id+'|'+back+'"')).join('')}</div>`:'<p class="vs">Nenhum quadro. Os quadros são criados na web.</p>'}</div>`;}
function qdSheet(id,back,col){const b=QDB.find(x=>x.id===id);if(!b)return;if(back!=null)S.qd.back=back;S.qd.cur=id;if(col!=null)S.qd.col=col;if(S.qd.col>qdLast(b))S.qd.col=0;
 const ed=can(S.gmod,'editar')&&b.st==='at',c=S.qd.col,l=b.tasks.filter(t=>t.col===c);
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(b.n)}</h3>${vsTag(b.st==='at'?'ok':'off',b.st==='at'?'Ativo':'Encerrado')}${b.st!=='at'?'<span class="vs">Quadro encerrado: só consulta.</span>':''}</div>
  ${vsChips('qdCol',String(c),b.cols.map((n,i)=>[String(i),n,b.tasks.filter(t=>t.col===i).length]))}
  ${ed?`<button class="btn primary md block" data-a="qdNew" data-v="${id}">Nova tarefa</button>`:''}
  ${b.tasks.length?fndBox('qdL','Buscar tarefa ou pessoa'):''}<div class="vl" id="qdL">${l.map(t=>`<button class="vr tap" data-q="${esc(t.t+' '+qdWho(t))}" data-a="qdTask" data-v="${id}|${t.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(t.t)}</span><span class="vs">${esc(qdWho(t))} · ${qdDueTx(t)}</span></span>${qdOver(b,t)?vsTag('danger','Atrasada'):qdSoon(b,t)?vsTag('warning','Vence em breve'):t.col===qdLast(b)?vsTag('ok','Concluída'):''}</button>`).join('')||vsEmpty('Nenhuma tarefa aqui','Mova uma tarefa para esta coluna ou crie uma nova.')}</div>
  <button class="tlink" data-a="qdBack">${S.qd.back?'Voltar':'Fechar'}</button></div>`);}
function qdTaskSheet(id,tid){const b=QDB.find(x=>x.id===id),t=b.tasks.find(x=>x.id===tid),ed=can(S.gmod,'editar')&&b.st==='at',last=t.col===qdLast(b);
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(t.t)}</h3><span class="vs">${esc(b.n)}</span>${vsTag(last?'ok':'info',b.cols[t.col])}</div>
  <div class="vl">${[['Responsável',qdWho(t)],['Prazo',qdDueTx(t)],['Coluna',b.cols[t.col]],...(t.desc?[['Descrição',t.desc]]:[])].map(([a,v])=>`<div class="vr"><span class="vs" style="min-width:104px">${a}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${esc(v)}</span></div>`).join('')}</div>
  <div class="stack g2"><p class="eb2">Comentários</p>${t.coms.length?`<div class="vl">${t.coms.map(c=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(c[0])} <small class="vs">${c[2]}</small></span><span class="vs" style="white-space:normal">${esc(c[1])}</span></span></div>`).join('')}</div>`:'<p class="vs">Nenhum comentário.</p>'}
   ${ed?`${field({id:'qdCm',label:'Comentar',ph:'Escreva um comentário',max:500})}<button class="btn outline md block" data-a="qdComment" data-v="${id}|${tid}">Enviar comentário</button>`:''}</div>
  <div class="stack g3">${ed?(last?`<button class="btn outline md block" data-a="qdMove" data-v="${id}|${tid}|0">Reabrir (voltar para ${esc(b.cols[0])})</button>`:`<button class="btn primary md block" data-a="qdMove" data-v="${id}|${tid}|${qdLast(b)}">Concluir</button>`)+b.cols.map((n,i)=>i===t.col||i===qdLast(b)&&!last?'':`<button class="btn outline md block" data-a="qdMove" data-v="${id}|${tid}|${i}">Mover para ${esc(n)}</button>`).join(''):''}<button class="tlink" data-a="qdRe" data-v="${id}">Voltar ao quadro</button></div></div>`);}
function qdNewSheet(id){const b=QDB.find(x=>x.id===id),pool=dvgInt();S.qd.who='';
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Nova tarefa</h3><p class="callout">${esc(b.n)}. A pessoa responsável é avisada no app.</p></div>
  ${field({id:'qdTt',label:'Título',ph:'Ex.: Imprimir os crachás',max:150})}
  <div class="stack g2"><span class="eb2">Coluna</span><div class="row g2" style="flex-wrap:wrap" id="qdCs">${b.cols.map((n,i)=>`<button type="button" class="chip" data-c="${i}" aria-pressed="${i===0}">${esc(n)}</button>`).join('')}</div></div>
  ${field({id:'qdDt',label:'Prazo (opcional)',type:'date',val:''})}
  <div class="stack g2"><span class="eb2">Responsável (opcional)</span>${fndBox('qdWo','Buscar pelo nome')}<div class="vl" id="qdWo" style="max-height:160px;overflow:auto">${pool.map(n=>`<button type="button" class="vr tap" data-q="${esc(n)}" data-who="${esc(n)}" aria-pressed="false"><span class="grow vn">${esc(n)}</span></button>`).join('')}</div></div>
  ${field({id:'qdDs',label:'Descrição (opcional)',area:true,ph:'O que precisa ser feito',max:1000})}
  <div class="otpmsg" id="qdEr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="qdGo">Criar tarefa</button><button type="button" class="tlink" data-a="qdRe" data-v="${id}">Voltar</button></div></div>`,sh=>{
  let col=0;sh.querySelectorAll('[data-c]').forEach(x=>x.addEventListener('click',()=>{col=+x.getAttribute('data-c');sh.querySelectorAll('[data-c]').forEach(y=>y.setAttribute('aria-pressed',String(y===x)));}));
  sh.querySelectorAll('[data-who]').forEach(x=>x.addEventListener('click',()=>{const on=x.getAttribute('aria-pressed')==='true';S.qd.who=on?'':x.getAttribute('data-who');sh.querySelectorAll('[data-who]').forEach(y=>y.setAttribute('aria-pressed',String(!on&&y===x)));}));
  $('#qdGo',sh).addEventListener('click',()=>{const e=qdCreate(id,{t:cuVal(sh,'qdTt'),col,date:cuVal(sh,'qdDt'),who:S.qd.who,desc:cuVal(sh,'qdDs')});if(e){$('#qdEr',sh).textContent=e;return;}closeSheet().then(()=>{softRender();toast('success','Tarefa criada',cuVal(sh,'qdTt')||'');qdSheet(id,null,col);});});});}
function qdCreate(id,o){const b=QDB.find(x=>x.id===id);if(b.st!=='at')return 'Quadro encerrado: só consulta.';if(!o.t)return 'Dê um título à tarefa.';
 let due=null;if(o.date){due=Math.round((new Date(o.date+'T12:00:00')-new Date(cuToday()+'T12:00:00'))/864e5);}
 b.tasks.push(qdTask(o.col,o.t,{who:o.who,due,desc:o.desc}));return null;}
function qdMoveTo(id,tid,col){const b=QDB.find(x=>x.id===id),t=b.tasks.find(x=>x.id===tid);if(b.st!=='at')return 'Quadro encerrado: só consulta.';if(col<0||col>qdLast(b))return 'Coluna inválida.';t.col=col;return null;}
Object.assign(A,{
 qdOpen:v=>{const [id,back]=v.split('|');qdSheet(id,back||'',0);},
 qdCol:v=>{qdSheet(S.qd.cur,null,+v);},
 qdBack:()=>{const b=S.qd.back;if(b&&b.startsWith('min:'))A.lsOpen(b.slice(4));else closeSheet();},
 qdRe:id=>qdSheet(id),
 qdTask:v=>{const [id,tid]=v.split('|');qdTaskSheet(id,tid);},
 qdNew:id=>qdNewSheet(id),
 qdMove:v=>{const [id,tid,col]=v.split('|'),e=qdMoveTo(id,tid,+col);if(e){toast('error',e);return;}const b=QDB.find(x=>x.id===id),t=b.tasks.find(x=>x.id===tid);softRender();toast('success',+col===qdLast(b)?'Tarefa concluída':'Tarefa movida',t.t);qdSheet(id,null,+col);},
 qdComment:v=>{const [id,tid]=v.split('|'),tx=(($('#qdCm')||{}).value||'').trim();if(!tx){toast('error','Escreva o comentário.');return;}const t=QDB.find(x=>x.id===id).tasks.find(x=>x.id===tid);t.coms.push(['Você',tx,'agora']);qdTaskSheet(id,tid);}
});
