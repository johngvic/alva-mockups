/* ---- Quadros de tarefas (estilo Trello) em Ministérios, Eventos e Cultos ---- */
if(!MINIS.some(m=>m.n==='Almoxarifado'))MINIS.push(MN('Almoxarifado','Bruno Carvalho',5,1,{icon:'box',tone:'salvia'}));
let _bdid=0,_tkid=0;
const BOARDS=[];
const BD_STD=['A fazer','Fazendo','Feito'];
const bdNewBoard=(ownerType,ownerId,name,o={})=>{const b={id:'bd'+(++_bdid),ownerType,ownerId,name,status:o.status||'aberto',cols:BD_STD.map((n,i)=>({id:'c'+(i+1),n})),tasks:[]};BOARDS.push(b);return b;};
const bdAddTask=(b,col,t,o={})=>{const x={id:'tk'+(++_tkid),col:b.cols[col].id,t,desc:o.desc||'',min:o.min||'',who:o.who||'',due:o.due||''};b.tasks.push(x);return x;};
const bdDone=(b,t)=>t.col===b.cols[b.cols.length-1].id;
const bdOwnerName=b=>b.ownerType==='min'?'Ministério de '+((mnById(b.ownerId)||{}).n||'—'):((eById(b.ownerId)||{}).t||'Evento');
const bdOwnerKind=b=>b.ownerType==='min'?'Ministério':((eById(b.ownerId)||{}).kind==='culto'?'Culto':'Evento');
const bdRestricted=b=>S.active==='ministerios'&&!!S.mini&&!(b.ownerType==='min'&&b.ownerId===S.mini);
const bdShared=(type,id)=>type==='min'?BOARDS.filter(b=>!(b.ownerType==='min'&&b.ownerId===id)&&b.tasks.some(t=>t.min===id)):[];
const bdOwn=(type,id)=>BOARDS.filter(b=>b.ownerType===type&&b.ownerId===id);
const bdVisible=(b,type,id)=>(b.ownerType===type&&b.ownerId===id)||bdShared(type,id).includes(b);
const nxBdCount=(type,id)=>bdOwn(type,id).length+bdShared(type,id).length||null;
const bdPill=b=>b.status==='encerrado'?'<span class="stp" style="--c:var(--ink-muted);--b:var(--surface-2)"><i></i>Encerrado</span>':'<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Aberto</span>';
function bdRe(){const y=window.scrollY;if(S.active==='ministerios'&&S.mini)reMn();else render();window.scrollTo(0,y);}
function bdTab(type,id){
 let b=S.bd&&BOARDS.find(x=>x.id===S.bd);if(b&&!bdVisible(b,type,id))b=null;
 if(b)return bdView(b);S.bd=null;
 const v=S.bdv==='encerrado'?'encerrado':'aberto',st=x=>(x.status==='encerrado')===(v==='encerrado');
 const ownAll=bdOwn(type,id),sharedAll=bdShared(type,id),own=ownAll.filter(st),shared=sharedAll.filter(st);
 const nOpen=[...ownAll,...sharedAll].filter(x=>x.status!=='encerrado').length,nClosed=ownAll.length+sharedAll.length-nOpen;
 const card=(b,sh)=>{const ts=sh?b.tasks.filter(t=>t.min===id):b.tasks,dn=ts.filter(t=>bdDone(b,t)).length,pct=ts.length?Math.round(dn/ts.length*100):0,nm=new Set(b.tasks.map(t=>t.min).filter(Boolean)).size;
  return '<article class="card bd-c" tabindex="0" data-a="bdOpen" data-v="'+b.id+'"><div class="bd-ct"><b>'+esc(b.name)+'</b>'+bdPill(b)+'</div>'+(sh?'<span class="who">'+bdOwnerKind(b)+': '+esc(bdOwnerName(b))+'</span>':'')+'<span class="bd-bar"><i style="width:'+pct+'%"></i></span><span class="who"><b>'+dn+'</b> de '+ts.length+(sh?' tarefas suas':' tarefa'+(ts.length===1?'':'s'))+' feita'+(dn===1?'':'s')+(!sh&&nm?' · '+nm+' ministério'+(nm===1?'':'s'):'')+'</span></article>';};
 const empty=v==='encerrado'?'<div class="soft-empty"><p>Nenhum quadro encerrado.</p><span class="who">Os quadros encerrados ficam aqui, só para consulta, e podem ser reabertos.</span></div>':'<div class="soft-empty"><p>Nenhum quadro aberto.</p><span class="who">Crie um quadro para começar a distribuir tarefas.</span></div>';
 return '<section class="card pc"><div class="sh"><div><h2>Quadros de tarefas</h2><p class="who" style="margin:4px 0 0">'+(type==='min'?'Organize o trabalho do ministério. Você pode ter vários quadros, encerrar um e abrir outro.':'Distribua as tarefas entre ministérios e pessoas. Cada ministério vê o quadro com as tarefas dele.')+'</p></div><button class="btn pri sm" data-a="bdNew" data-v="'+type+'|'+id+'">'+ic('plus',14,2.2)+'Novo quadro</button></div>'
  +'<div class="bd-seg"><div class="segc" role="group" aria-label="Situação dos quadros"><button data-a="bdV" data-v="aberto" aria-pressed="'+(v==='aberto')+'">Abertos<small>'+nOpen+'</small></button><button data-a="bdV" data-v="encerrado" aria-pressed="'+(v==='encerrado')+'">Encerrados<small>'+nClosed+'</small></button></div></div>'
  +(own.length?'<div class="bd-g">'+own.map(x=>card(x,false)).join('')+'</div>':empty)+'</section>'
  +(shared.length?'<section class="card pc" style="margin-top:16px"><div class="sh"><div><h2>Tarefas deste ministério em outros quadros</h2><p class="who" style="margin:4px 0 0">Quadros de eventos, cultos e outros ministérios com tarefas entregues a este ministério. As demais tarefas ficam bloqueadas.</p></div></div><div class="bd-g">'+shared.map(x=>card(x,true)).join('')+'</div></section>':'');
}
function bdCard(b,t,R,mine,closed){
 const m=t.min&&mnById(t.min),own=!R||t.min===mine,done=bdDone(b,t),late=t.due&&!done&&t.due<TODAY.toISOString().slice(0,10);
 const meta=(m?'<span class="bd-mn">'+mTile(m,18)+esc(m.n)+'</span>':'')+(t.who?'<span class="bd-who">'+avN(t.who)+'<i>'+esc(t.who.split(' ')[0])+'</i></span>':'')+(t.due?'<span class="bd-due'+(late?' late':'')+'">'+ic('calendar',11,2)+fmtD(t.due)+'</span>':'');
 if(!own)return '<div class="bd-t lock" title="'+esc(m?'Tarefa do Ministério de '+m.n:'Tarefa sem ministério')+'"><div class="bd-lt">'+ic('lock',12,2)+'<b>'+esc(t.t)+'</b></div>'+(meta?'<div class="bd-m">'+meta+'</div>':'')+'</div>';
 return '<div class="bd-t'+(done?' done':'')+'" data-tk="'+t.id+'"'+(!closed?' draggable="true"':'')+' tabindex="0" data-a="bdTask" data-v="'+b.id+'|'+t.col+'|'+t.id+'"><b>'+esc(t.t)+'</b>'+(meta||(t.cm||[]).length?'<div class="bd-m">'+meta+((t.cm||[]).length?'<span class="bd-cm">'+ic('message',11,2)+t.cm.length+'</span>':'')+'</div>':'')+'</div>';
}
function bdView(b){
 const R=bdRestricted(b),mine=R?S.mini:null,closed=b.status==='encerrado',canEdit=!R&&!closed,total=b.tasks.length,done=b.tasks.filter(t=>bdDone(b,t)).length,mt=R?b.tasks.filter(t=>t.min===mine).length:0;
 const cols=b.cols.map(c=>{const ts=b.tasks.filter(t=>t.col===c.id);
  return '<div class="bd-col" data-col="'+c.id+'"><header class="bd-ch"><b>'+esc(c.n)+'</b><small>'+ts.length+'</small>'+(canEdit?'<span style="position:relative;margin-left:auto"><button class="ibtn sm" data-a="bdColMenu" data-v="'+c.id+'" aria-label="Ações da coluna">'+ic('dots',14)+'</button><div class="pop" id="bdcPop-'+c.id+'" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="bdColRen" data-v="'+b.id+'|'+c.id+'">'+ic('pen',16)+'Renomear coluna</button><hr><button class="pi danger" data-a="bdColDel" data-v="'+b.id+'|'+c.id+'">'+ic('x',16)+'Excluir coluna</button></div></span>':'')+'</header>'
   +'<div class="bd-list">'+ts.map(t=>bdCard(b,t,R,mine,closed)).join('')+(ts.length?'':'<p class="bd-empty">Nenhuma tarefa</p>')+'</div>'+(canEdit?'<button class="bd-add" data-a="bdTask" data-v="'+b.id+'|'+c.id+'">'+ic('plus',13,2.2)+'Adicionar tarefa</button>':'')+'</div>';}).join('')
  +(canEdit?'<button class="bd-colnew" data-a="bdColAdd" data-v="'+b.id+'">'+ic('plus',14,2.2)+'Nova coluna</button>':'');
 return '<section class="card pc bd-board"><div class="bd-top"><button class="btn sec sm" data-a="bdBack">'+ic('chevL',14,2)+'Quadros</button><div class="bd-tt"><h2>'+esc(b.name)+'</h2><span class="who">'+bdOwnerKind(b)+': '+esc(bdOwnerName(b))+' · '+done+' de '+total+' feitas</span></div>'+bdPill(b)
  +'<div class="pact">'+(canEdit?'<button class="btn pri sm" data-a="bdTask" data-v="'+b.id+'|'+b.cols[0].id+'">'+ic('plus',14,2.2)+'Nova tarefa</button>':'')
  +(R?'':(closed?'<button class="btn sec sm" data-a="bdReopen" data-v="'+b.id+'">Reabrir quadro</button>':'<button class="btn sec sm" data-a="bdClose" data-v="'+b.id+'">Encerrar quadro</button>')+'<span style="position:relative"><button class="ibtn" data-a="bdMenu" data-v="'+b.id+'" aria-label="Mais ações">'+ic('dots',17)+'</button><div class="pop" id="bdPop-'+b.id+'" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="bdRen" data-v="'+b.id+'">'+ic('pen',16)+'Renomear quadro</button><button class="pi" data-a="bdDup" data-v="'+b.id+'">'+ic('copy',16)+'Duplicar quadro</button><hr><button class="pi danger" data-a="bdDel" data-v="'+b.id+'">'+ic('x',16)+'Excluir quadro</button></div></span>')+'</div></div>'
  +(R?'<p class="bd-note">'+ic('lock',13,2)+'Este quadro é d'+(b.ownerType==='min'?'o ':'')+esc(bdOwnerName(b))+'. Você vê as tarefas do seu ministério ('+mt+') e as demais ficam bloqueadas.</p>':'')
  +(closed?'<p class="bd-note">'+ic('lock',13,2)+'Quadro encerrado: só para consulta. Reabra para mexer nas tarefas.</p>':'')
  +'<div class="bd-cols">'+cols+'</div></section>';
}
function bdTaskDlg(bid,col,tid){
 const b=BOARDS.find(x=>x.id===bid),t=tid?b.tasks.find(x=>x.id===tid):null,R=bdRestricted(b),closed=b.status==='encerrado',m=t&&t.min&&mnById(t.min),cn=c=>(b.cols.find(x=>x.id===c)||{}).n;
 if(t&&(closed||R)){bdTaskView(b,t,R,closed);return;}
 const people=[...new Set([...(t&&t.who?[t.who]:[]),...MEMBERS.filter(x=>x.tit).map(x=>x.n)])].slice(0,40);
 openDlg(dlgHead(t?'Editar tarefa':'Nova tarefa',esc(b.name))+'<form id="bdF" class="fgrid" novalidate style="grid-template-columns:1fr 1fr">'
  +'<label class="fld wide"><span class="fl">Tarefa</span><input name="t" value="'+esc(t?t.t:'')+'" maxlength="90" autocomplete="off" placeholder="Ex.: Montar a escala de recepção"><span class="err"></span></label>'
  +'<label class="fld wide"><span class="fl">Descrição <small>opcional</small></span><textarea class="ta" name="desc" rows="3" maxlength="400">'+esc(t?t.desc:'')+'</textarea></label>'
  +'<label class="fld"><span class="fl">Ministério responsável <small>opcional</small></span><span class="selw"><select name="min"><option value="">Nenhum</option>'+MINIS.map(x=>'<option value="'+x.id+'"'+(t&&t.min===x.id?' selected':'')+'>'+esc(x.n)+'</option>').join('')+'</select>'+ic('updown',14)+'</span></label>'
  +'<label class="fld"><span class="fl">Pessoa responsável <small>opcional</small></span><span class="selw"><select name="who"><option value="">Ninguém</option>'+people.map(n=>'<option'+(t&&t.who===n?' selected':'')+'>'+esc(n)+'</option>').join('')+'</select>'+ic('updown',14)+'</span></label>'
  +'<label class="fld"><span class="fl">Prazo <small>opcional</small></span><input type="date" name="due" value="'+(t?t.due:'')+'"></label>'
  +'<label class="fld"><span class="fl">Coluna</span><span class="selw"><select name="col">'+b.cols.map(c=>'<option value="'+c.id+'"'+((t?t.col:col)===c.id?' selected':'')+'>'+esc(c.n)+'</option>').join('')+'</select>'+ic('updown',14)+'</span></label>'
  +(t?'<div class="wide">'+bdCmBar(b,t,true)+'</div>':'')+'<div class="dfoot wide">'+(t?'<button type="button" class="btn dang sm" data-a="bdTaskDel" data-v="'+b.id+'|'+t.id+'" style="margin-right:auto">Excluir tarefa</button>':'')+'<button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">'+(t?'Salvar':'Adicionar')+'</button></div></form>');
 const f=$('#bdF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
 f.onsubmit=e=>{e.preventDefault();const q=f.elements,title=q.t.value.trim();if(!title){const fl=q.t.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Dê um nome à tarefa';q.t.focus();return;}
  const data={t:title,desc:q.desc.value.trim(),min:q.min.value,who:q.who.value,due:q.due.value,col:q.col.value};
  if(t)Object.assign(t,data);else b.tasks.push(Object.assign({id:'tk'+(++_tkid)},data));closeDlg();bdRe();toast(t?'Tarefa atualizada':'Tarefa adicionada');};
}
/* detalhe só de leitura da tarefa (quadro encerrado ou tarefa do meu ministério em quadro de outro dono) + comentários */
const bdCm=t=>t.cm||(t.cm=[]);
function bdCmBar(b,t,can){const n=bdCm(t).length,k=b.id+'|'+t.id;
 return '<div class="bd-cmbar"><button type="button" class="bd-cmv" data-a="bdCmList" data-v="'+k+'">'+ic('message',15,1.9)+'Ver comentários<small>'+n+'</small></button>'+(can?'<button type="button" class="btn sec sm" data-a="bdCmAdd" data-v="'+k+'">'+ic('plus',14,2.2)+'Adicionar comentário</button>':'')+'</div>';}
function bdTaskView(b,t,R,closed){
 const m=t.min&&mnById(t.min),col=(b.cols.find(x=>x.id===t.col)||{}).n,done=bdDone(b,t),dd=t.due&&!done?myDue(t):null;
 const F=(l,h)=>'<div class="tkv-f"><span>'+l+'</span><div>'+h+'</div></div>';
 openDlg(dlgHead(t.t,esc(b.name)+' · '+bdOwnerKind(b)+': '+esc(bdOwnerName(b)))+'<div class="tkv">'
  +'<div class="tkv-top"><span class="tkv-col'+(done?' ok':'')+'">'+(done?ic('check',12,2.4):'<i></i>')+esc(col||'')+'</span>'+(dd?'<span class="mytk-d '+dd[0]+'">'+ic(dd[0]==='is-late'?'alert':'calendar',12,2)+'<em>'+dd[1]+'</em></span>':'')+'</div>'
  +'<div class="tkv-g">'+F('Ministério',m?mTile(m,28)+'<b>'+esc(m.n)+'</b>':'<span class="soft">Sem ministério</span>')+F('Responsável',t.who?avN(t.who)+'<b>'+esc(t.who)+'</b>':'<span class="soft">Sem pessoa</span>')+F('Prazo',t.due?'<span class="tkv-ic">'+ic('calendar',15,1.9)+'</span><b>'+fmtDate(t.due)+'</b>':'<span class="soft">Sem prazo</span>')+'</div>'
  +'<section class="tkv-d"><h3>Descrição</h3>'+(t.desc?'<p>'+esc(t.desc)+'</p>':'<p class="soft">Sem descrição.</p>')+'</section>'
  +bdCmBar(b,t,!closed)
  +'<p class="tkv-n">'+ic('lock',13,2)+(closed?'Quadro encerrado: só para consulta. Reabra o quadro para mexer nas tarefas.':'Para mudar a situação, arraste a tarefa entre as colunas. O resto é de quem criou o quadro.')+'</p></div>'
  +'<div class="dfoot"><button class="btn sec" data-a="closeDlg">Fechar</button></div>');}
function bdCmList(bid,tid){const b=BOARDS.find(x=>x.id===bid),t=b&&b.tasks.find(x=>x.id===tid);if(!t)return;closeDlg(true);
 const l=bdCm(t),closed=b.status==='encerrado',k=bid+'|'+tid;
 openDlg(dlgHead('Comentários',esc(t.t))+'<div class="bdc">'+(l.length?l.map(c=>'<article class="bdc-i">'+avN(c.by)+'<div><header><b>'+esc(c.by)+'</b><span>'+fmtDate(c.d)+'</span></header><p>'+esc(c.text)+'</p></div></article>').join(''):'<p class="soft" style="margin:6px 0">Nenhum comentário ainda.</p>')+'</div>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="bdCmBack" data-v="'+k+'">Voltar à tarefa</button>'+(closed?'':'<button type="button" class="btn pri" data-a="bdCmAdd" data-v="'+k+'">'+ic('plus',14,2.2)+'Adicionar comentário</button>')+'</div>','sm');
 const el=$('.bdc');if(el)el.scrollTop=el.scrollHeight;}
function bdCmAdd(bid,tid){const b=BOARDS.find(x=>x.id===bid),t=b&&b.tasks.find(x=>x.id===tid);if(!t||b.status==='encerrado')return;closeDlg(true);
 openDlg(dlgHead('Novo comentário',esc(t.t))+'<form id="bdCF" class="fgrid one" novalidate><label class="fld"><span class="fl">Comentário</span><textarea class="ta" name="c" rows="4" maxlength="400" placeholder="Escreva uma atualização ou um recado para quem trabalha nesta tarefa"></textarea><span class="err"></span></label>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="bdCmList" data-v="'+bid+'|'+tid+'">Cancelar</button><button type="submit" class="btn pri">Comentar</button></div></form>','sm');
 const f=$('#bdCF');f.addEventListener('input',()=>f.elements.c.closest('.fld').classList.remove('bad'));
 f.onsubmit=e=>{e.preventDefault();const x=f.elements.c.value.trim();if(!x){const fl=f.elements.c.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Escreva o comentário';return;}
  bdCm(t).push({by:ME_NAME,d:myTd(),text:x});bdRe();toast('Comentário adicionado');bdCmList(bid,tid);};}
Object.assign(A,{
 bdV:v=>{S.bdv=v;bdRe();},bdCmList:v=>{const [b,t]=v.split('|');bdCmList(b,t);},bdCmAdd:v=>{const [b,t]=v.split('|');bdCmAdd(b,t);},bdCmBack:v=>{const [b,t]=v.split('|'),x=BOARDS.find(y=>y.id===b),k=x&&x.tasks.find(y=>y.id===t);closeDlg(true);if(k)bdTaskDlg(b,k.col,t);},
 bdOpen:v=>{S.bd=v;bdRe();},bdBack:()=>{S.bd=null;bdRe();},
 bdMenu:v=>{const p=$('#bdPop-'+v);closePops(p);p.classList.toggle('open');},
 bdColMenu:v=>{const p=$('#bdcPop-'+v);closePops(p);p.classList.toggle('open');},
 bdTask:v=>{const [bid,col,tid]=v.split('|');bdTaskDlg(bid,col,tid);},
 bdTaskDel:v=>{const [bid,tid]=v.split('|'),b=BOARDS.find(x=>x.id===bid),t=b.tasks.find(x=>x.id===tid);closeDlg();setTimeout(()=>confirmDel({title:'Excluir esta tarefa?',body:'“'+esc(t.t)+'” sai do quadro.',onConfirm:()=>{b.tasks.splice(b.tasks.indexOf(t),1);bdRe();toast('Tarefa excluída');}}),50);},
 bdNew:v=>{const [type,id]=v.split('|'),prev=bdOwn(type,id);
  openDlg(dlgHead('Novo quadro',type==='min'?'Um quadro de tarefas do ministério.':'Um quadro de tarefas deste '+(((eById(id)||{}).kind==='culto')?'culto':'evento')+'.')+'<form id="bdNF" class="fgrid one" novalidate><label class="fld"><span class="fl">Nome do quadro</span><input name="n" maxlength="60" autocomplete="off" placeholder="Ex.: Preparação do congresso"><span class="err"></span></label>'
   +(prev.length?'<label class="fld"><span class="fl">Começar de</span><span class="selw"><select name="from"><option value="">Quadro em branco</option>'+prev.map(x=>'<option value="'+x.id+'">Copiar “'+esc(x.name)+'” (as tarefas voltam para a primeira coluna)</option>').join('')+'</select>'+ic('updown',14)+'</span></label>':'')
   +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Criar quadro</button></div></form>','sm');
  const f=$('#bdNF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));
  f.onsubmit=e=>{e.preventDefault();const n=f.elements.n.value.trim();if(!n){const fl=f.elements.n.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Dê um nome ao quadro';return;}
   const nb=bdNewBoard(type,id,n),src=f.elements.from&&f.elements.from.value&&BOARDS.find(x=>x.id===f.elements.from.value);
   if(src){nb.cols=src.cols.map(c=>({id:c.id,n:c.n}));src.tasks.forEach(t=>nb.tasks.push(Object.assign({},t,{id:'tk'+(++_tkid),col:nb.cols[0].id,cm:[]})));}
   S.bd=nb.id;closeDlg();bdRe();toast('Quadro criado');};},
 bdRen:v=>{closePops();const b=BOARDS.find(x=>x.id===v);nxNameDlg('Renomear quadro','',b.name,'Nome do quadro',x=>{if(!x)return 'Dê um nome';b.name=x;closeDlg();bdRe();toast('Quadro renomeado');});},
 bdDup:v=>{closePops();const b=BOARDS.find(x=>x.id===v),nb=bdNewBoard(b.ownerType,b.ownerId,b.name+' (cópia)');nb.cols=b.cols.map(c=>({id:c.id,n:c.n}));b.tasks.forEach(t=>nb.tasks.push(Object.assign({},t,{id:'tk'+(++_tkid),col:nb.cols[0].id,cm:[]})));S.bd=nb.id;bdRe();toast('Quadro duplicado; as tarefas voltaram para a primeira coluna');},
 bdDel:v=>{closePops();const b=BOARDS.find(x=>x.id===v);confirmDel({title:'Excluir '+esc(b.name)+'?',body:'As '+b.tasks.length+' tarefas do quadro serão apagadas. Para guardar o histórico, prefira encerrar o quadro.',typed:b.tasks.length?b.name:null,onConfirm:()=>{BOARDS.splice(BOARDS.indexOf(b),1);S.bd=null;bdRe();toast('Quadro excluído');}});},
 bdClose:v=>{const b=BOARDS.find(x=>x.id===v),open=b.tasks.filter(t=>!bdDone(b,t)).length;confirmDel({title:'Encerrar este quadro?',body:(open?open+' tarefa'+(open===1?' ainda não está':'s ainda não estão')+' em “'+esc(b.cols[b.cols.length-1].n)+'”. ':'')+'O quadro fica só para consulta e você pode reabri-lo. Para continuar o trabalho, abra um novo quadro.',label:'Encerrar quadro',onConfirm:()=>{b.status='encerrado';bdRe();toast('Quadro encerrado',()=>{b.status='aberto';bdRe();});}});},
 bdReopen:v=>{BOARDS.find(x=>x.id===v).status='aberto';bdRe();toast('Quadro reaberto');},
 bdColAdd:v=>{const b=BOARDS.find(x=>x.id===v);nxNameDlg('Nova coluna','Entra depois da última. A última coluna conta como tarefa feita.','','Ex.: Em revisão',x=>{if(!x)return 'Dê um nome';b.cols.splice(b.cols.length-1,0,{id:'c'+Date.now(),n:x});closeDlg();bdRe();toast('Coluna adicionada antes de “'+b.cols[b.cols.length-1].n+'”');});},
 bdColRen:v=>{closePops();const [bid,cid]=v.split('|'),b=BOARDS.find(x=>x.id===bid),c=b.cols.find(x=>x.id===cid);nxNameDlg('Renomear coluna','',c.n,'Nome da coluna',x=>{if(!x)return 'Dê um nome';c.n=x;closeDlg();bdRe();});},
 bdColDel:v=>{closePops();const [bid,cid]=v.split('|'),b=BOARDS.find(x=>x.id===bid),c=b.cols.find(x=>x.id===cid),n=b.tasks.filter(t=>t.col===cid).length;
  if(b.cols.length<=2){toast('O quadro precisa de pelo menos duas colunas');return;}if(n){toast('Mova as '+n+' tarefas para outra coluna antes de excluir');return;}b.cols.splice(b.cols.indexOf(c),1);bdRe();toast('Coluna excluída');}
});
/* arrastar tarefa entre colunas */
document.addEventListener('dragstart',e=>{const t=e.target.closest&&e.target.closest('.bd-t[draggable=true]');if(!t)return;e.dataTransfer.setData('text/plain',t.dataset.tk);e.dataTransfer.effectAllowed='move';t.classList.add('drag');});
document.addEventListener('dragend',e=>{$$('.bd-t.drag').forEach(x=>x.classList.remove('drag'));$$('.bd-col.over').forEach(x=>x.classList.remove('over'));});
document.addEventListener('dragover',e=>{const c=e.target.closest&&e.target.closest('.bd-col');if(!c)return;e.preventDefault();if(!c.classList.contains('over')){$$('.bd-col.over').forEach(x=>x.classList.remove('over'));c.classList.add('over');}});
document.addEventListener('drop',e=>{const c=e.target.closest&&e.target.closest('.bd-col');if(!c||!S.bd)return;e.preventDefault();const b=BOARDS.find(x=>x.id===S.bd),id=e.dataTransfer.getData('text/plain'),t=b&&b.tasks.find(x=>x.id===id);if(!t||b.status==='encerrado')return;
 if(bdRestricted(b)&&t.min!==S.mini)return;const old=t.col,to=c.dataset.col;if(old===to)return;t.col=to;bdRe();toast('Movida para '+b.cols.find(x=>x.id===to).n,()=>{t.col=old;bdRe();});});
/* abas e reinício do quadro aberto ao trocar de ministério, evento ou aba */
for(const k of ['nav','mnOpen','mnTab','evOpen','evTab']){const base=A[k];if(base)A[k]=function(){S.bd=null;S.bdv='aberto';return base.apply(this,arguments);};}
/* dados de demonstração */
(()=>{const mi=n=>(MINIS.find(m=>m.n===n)||{}).id,ev=(t,d)=>EVTS.find(e=>e.t===t&&(!d||e.d===d));
 const cm=ev('Congresso de Mulheres 2027');
 if(cm){const b=bdNewBoard('evt',cm.id,'Preparação do congresso');
  bdAddTask(b,0,'Reservar o auditório e montar o mapa de salas',{min:mi('Eventos'),who:'Diego Martins',due:'2027-01-20'});
  bdAddTask(b,0,'Separar caixas de som, cadeiras e mesas extras',{min:mi('Almoxarifado'),who:'Bruno Carvalho',due:'2027-02-25'});
  bdAddTask(b,0,'Escala de recepção e credenciamento das inscritas',{min:mi('Recepção'),who:'Felipe Andrade',due:'2027-02-28'});
  bdAddTask(b,0,'Sala de oração e escala de intercessoras',{min:mi('Intercessão'),who:'Renata Campos',due:'2027-02-28'});
  bdAddTask(b,1,'Repertório e ensaio do louvor',{min:mi('Louvor'),who:'Ana Clara Lima',due:'2027-02-15',desc:'Definir as músicas com a pregadora convidada.'});
  bdAddTask(b,1,'Identidade visual, telão e transmissão',{min:mi('Mídia'),who:'Diego Faria',due:'2027-02-10'});
  bdAddTask(b,2,'Definir a data e o local',{min:mi('Eventos'),who:'Diego Martins'});
  bdAddTask(b,2,'Convidar a pregadora',{min:mi('Eventos'),who:'Diego Martins'});}
 const cu=ev('Culto de Celebração','2026-10-11');
 if(cu){const b=bdNewBoard('evt',cu.id,'Melhorias do domingo');
  bdAddTask(b,0,'Sinalizar o estacionamento para visitantes',{min:mi('Recepção'),due:addDays(10)});
  bdAddTask(b,1,'Revisar o repertório da semana',{min:mi('Louvor'),who:'Ana Clara Lima',due:addDays(3)});
  bdAddTask(b,2,'Testar o som do templo',{min:mi('Mídia'),who:'Diego Faria'});}
 const lv=mi('Louvor');
 if(lv){const b=bdNewBoard('min',lv,'Repertório de outubro');
  bdAddTask(b,0,'Escolher as músicas do culto de jovens',{min:lv,who:'Lucas Mendes',due:addDays(6)});
  bdAddTask(b,1,'Passar a cifra para o time',{min:lv,who:'Ana Clara Lima',due:addDays(2)});
  bdAddTask(b,2,'Ensaio geral de domingo',{min:lv});
  const o=bdNewBoard('min',lv,'Repertório de setembro',{status:'encerrado'});bdAddTask(o,2,'Escolher as músicas do mês',{min:lv});bdAddTask(o,2,'Ensaio geral',{min:lv});}
})();

/* Almoxarifado: Distribuições e Transferências voltam ao menu (as páginas já existiam) */
const nxAlmoxNav=NAV.find(g=>g[0]==='Operação')[1].find(i=>i[0]==='almox')[3];
if(!nxAlmoxNav.some(c=>c[0]==='adist')){const k=nxAlmoxNav.findIndex(c=>c[0]==='amov');nxAlmoxNav.splice(k<0?nxAlmoxNav.length:k,0,['adist','Distribuições'],['atrf','Transferências']);}
/* ---- Almoxarifado › Distribuições no mesmo desenho dos Empréstimos, mas sem prazo e com devolução parcial ---- */
if(!ICATS.some(c=>c.id==='k6'))ICATS.push({id:'k6',n:'Consumíveis',c:'#0f8b8d',ic:'droplet'});
if(!ITEMS.some(i=>i.tipo==='cons')){
 const agua=IT('Garrafa de água 500 ml','cons','k6',120,'CO-AGU-500'),copo=IT('Copo descartável 200 ml','cons','k6',300,'CO-COP-200'),papel=IT('Papel A4 (resma)','cons','k6',40,'CO-PAP-A4'),cafe=IT('Café em pó (pacote 500 g)','cons','k6',20,'CO-CAF-500');
 ITEMS.push(agua,copo,papel,cafe);
 DISTS.push(DS(agua.id,'Conferência Missões',40,'2026-09-28'),DS(agua.id,'Jovens e Adolescentes',24,'2026-09-18',[{qty:6,to:'Retiro de Jovens',date:'2026-09-22'}]),DS(copo.id,'Cafeteria',100,'2026-09-15'),DS(papel.id,'Recepção',10,'2026-09-10'));
 DISTS[0].back.push([10,'2026-09-30']);DISTS[0].note='Sobraram 10 garrafas do evento';
}
const dsBackQ=d=>d.back.reduce((a,b)=>a+b[0],0);
const dsHeld=d=>d.qty-d.tr.reduce((a,t)=>a+t.qty,0)-dsBackQ(d);
const dsDests=()=>[...new Set([...DISTS.flatMap(d=>[d.dest,...d.tr.map(t=>t.to)]),'Recepção','Cafeteria','Cozinha','Conferência Missões','Retiro de Jovens',...MINIS.map(m=>m.n)])].sort((a,b)=>a.localeCompare(b));
axDists=function(){
 const all=DISTS.slice().sort((a,b)=>a.date<b.date?1:a.date>b.date?-1:0),act=all.filter(d=>dsHeld(d)>0),done=all.filter(d=>dsHeld(d)<=0),sent=DISTS.reduce((a,d)=>a+d.qty,0),back=DISTS.reduce((a,d)=>a+dsBackQ(d),0),dn=new Set(DISTS.map(d=>d.dest)).size;
 const card=d=>{const it=itm(d.item),c=icat(it.cat),held=dsHeld(d),bq=dsBackQ(d),trq=d.tr.reduce((a,t)=>a+t.qty,0),pct=d.qty?Math.round(held/d.qty*100):0;
  const pill=held<=0?axPill('ok','Encerrada'):bq>0?axPill('part','Devolução parcial'):axPill('ok','Com o destino');
  return '<article class="card ax-lc '+(held<=0?'done':'')+'"><div class="ax-lch">'+kTile(c,42)+'<div class="dkt"><b>'+esc(it.n)+'</b><span>'+held+(held!==d.qty?' de '+d.qty:'')+' unidade'+(held===1?'':'s')+(bq?' · '+bq+' devolvida'+(bq>1?'s':''):'')+'</span></div>'+pill+'</div>'
   +'<div class="ax-who">'+avN(d.dest)+'<span class="dkt"><b>'+esc(d.dest)+'</b><span>desde '+dBR(d.date)+(trq?' · repassou '+trq:'')+'</span></span></div>'
   +'<div class="ax-tl"><span class="ax-tlb"><i style="width:'+pct+'%"></i></span><span class="ax-tlt"><span>enviadas '+d.qty+'</span><b>'+held+' com o destino</b><span>sem prazo</span></span></div>'
   +'<footer>'+(held>0?'<button class="btn ghost sm" data-a="trNew" data-v="'+esc(d.dest)+'|'+d.item+'">'+ic('arrowRL',13,2)+'Transferir</button>':'<span></span>')+(held>0?'<button class="btn sec sm" data-a="dsBack" data-v="'+d.id+'">'+ic('undo',13,2)+'Registrar devolução</button>':'')+'</footer></article>';};
 return axHead('Distribuições','O que foi enviado e para onde. Sem prazo: normalmente vai definitivo, mas pode voltar','<button class="btn pri" data-a="dsNew">'+ic('plus',15,2.2)+'Nova distribuição</button>')
  +'<section class="card kpis4 k3 rise" style="--d:1"><div class="k4"><span class="kl">Com destinos</span><span class="kv">'+act.length+'</span><span class="kd">distribuições em andamento</span></div><div class="k4"><span class="kl">Unidades enviadas</span><span class="kv">'+sent+'</span><span class="kd">para '+dn+' destino'+(dn===1?'':'s')+'</span></div><div class="k4"><span class="kl">Devolvidas</span><span class="kv" style="color:var(--st-sol)">'+back+'</span><span class="kd">voltaram ao estoque central</span></div></section>'
  +(all.length?'<div class="ax-lg rise" style="--d:3">'+act.map(card).join('')+done.map(card).join('')+'</div>':'<section class="card ax-empty rise" style="--d:2"><div class="ax-eill"><span>'+ic('truck',20)+'</span><i></i><span>'+ic('truck',20)+'</span></div><h2>Nenhuma distribuição ainda</h2><p>Envie um item consumível do estoque central para um destino.</p><button class="btn pri" data-a="dsNew">'+ic('plus',15,2.2)+'Nova distribuição</button></section>');
};
dsForm=function(itemId){
 const cs=ITEMS.filter(i=>i.tipo==='cons'&&avOf(i)>0);
 if(!cs.length){toast('Nenhum item consumível com saldo para distribuir');return;}
 const sel=itemId&&cs.some(i=>i.id===itemId)?itemId:cs[0].id;
 openDlg(dlgHead('Nova distribuição','Não tem prazo de devolução: normalmente vai definitivo, mas o destino pode devolver depois.')+'<form id="dsF" class="fgrid" novalidate>'
  +'<label class="fld wide"><span class="fl">Item</span><span class="selw"><select name="it">'+cs.map(i=>'<option value="'+i.id+'"'+(i.id===sel?' selected':'')+'>'+esc(i.n)+' — '+avOf(i)+' disponíve'+(avOf(i)>1?'is':'l')+'</option>').join('')+'</select>'+ic('updown',14)+'</span></label>'
  +'<label class="fld wide"><span class="fl">Para onde vai</span><span class="selw"><select name="dest"><option value="">Escolha o destino…</option>'+dsDests().map(d=>'<option>'+esc(d)+'</option>').join('')+'<option value="__new">Outro destino…</option></select>'+ic('updown',14)+'</span></label>'
  +'<label class="fld wide" id="dsNewW" hidden><span class="fl">Nome do destino</span><input name="dnew" placeholder="Ex.: Sala de oração" autocomplete="off" maxlength="60"></label>'
  +'<label class="fld"><span class="fl">Quantidade</span><span class="ax-step"><button type="button" data-st="-1">'+ic('minus',14,2.4)+'</button><input name="q" type="number" min="1" value="1" inputmode="numeric"><button type="button" data-st="1">'+ic('plus',14,2.4)+'</button></span><span class="hint" id="dsMax"></span></label>'
  +'<div class="fld"><span class="fl">Data do envio</span><input type="date" name="d" value="'+NOWD+'" max="'+NOWD+'"><div class="ax-qd">'+[[0,'Hoje'],[-1,'Ontem'],[-3,'3 dias atrás']].map(x=>'<button type="button" data-d="'+x[0]+'" class="'+(x[0]===0?'on':'')+'">'+x[1]+'</button>').join('')+'</div></div>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="dsOk">Confirmar distribuição</button></div></form>');
 const f=$('#dsF'),ok=$('#dsOk'),mx=()=>avOf(itm(f.it.value)),dest=()=>f.dest.value==='__new'?f.dnew.value.trim():f.dest.value;
 const chk=()=>{const q=+f.q.value||0,m=mx();$('#dsNewW').hidden=f.dest.value!=='__new';$('#dsMax').innerHTML=q>m?'<span class="sp-bad">Só há '+m+' disponíve'+(m>1?'is':'l')+'</span>':'Até '+m+' disponíve'+(m>1?'is':'l')+' · ficam '+(m-q)+' no estoque central';ok.disabled=!dest()||q<1||q>m||!f.d.value;$$('[data-d]',f).forEach(b=>b.classList.toggle('on',f.d.value===addD(NOWD,+b.dataset.d)));};
 $$('[data-st]',f).forEach(b=>b.onclick=()=>{f.q.value=Math.min(mx(),Math.max(1,(+f.q.value||0)+ +b.dataset.st));chk();});
 $$('[data-d]',f).forEach(b=>b.onclick=()=>{f.d.value=addD(NOWD,+b.dataset.d);chk();});
 f.addEventListener('input',chk);f.addEventListener('change',chk);chk();
 f.addEventListener('submit',e=>{e.preventDefault();if(ok.disabled)return;ok.classList.add('busy');setTimeout(()=>{DISTS.push(DS(f.it.value,dest(),+f.q.value,f.d.value));closeDlg();axRe();toast(f.q.value+' enviada'+(+f.q.value>1?'s':'')+' para '+dest());},600);});
};
function dsBackForm(id){const d=DISTS.find(x=>x.id===id),it=itm(d.item),op=dsHeld(d);if(op<=0){toast('Não há mais nada com este destino');return;}
 openDlg(dlgHead('Registrar devolução',esc(it.n)+' · com '+esc(d.dest))+'<form id="rbF" class="fgrid one" novalidate>'
  +'<div class="fld"><span class="fl">Quantas voltaram?</span><div class="ax-rb">'+Array.from({length:Math.min(op,12)},(_,i)=>'<button type="button" class="'+(i<op?'on':'')+'" data-u="'+(i+1)+'"></button>').join('')+(op>12?'<span class="soft">+'+(op-12)+'</span>':'')+'</div><span class="ax-step" style="max-width:180px"><button type="button" data-st="-1">'+ic('minus',14,2.4)+'</button><input name="q" type="number" min="1" max="'+op+'" value="'+Math.max(1,Math.floor(op/2))+'"><button type="button" data-st="1">'+ic('plus',14,2.4)+'</button></span><span class="hint" id="rbH"></span></div>'
  +'<label class="fld"><span class="fl">Observação <small>opcional</small></span><input name="note" placeholder="Ex.: sobraram do evento" autocomplete="off"></label>'
  +'<div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri" id="rbOk">Confirmar devolução</button></div></form>','sm');
 const f=$('#rbF'),ok=$('#rbOk');const up=()=>{const q=Math.min(op,Math.max(1,+f.q.value||1));$$('.ax-rb [data-u]').forEach(b=>b.classList.toggle('on',+b.dataset.u<=q));$('#rbH').innerHTML=q===op?ic('check',12,2.4)+' Devolução total: nada mais fica com '+esc(d.dest):'Parcial: '+(op-q)+' continua'+(op-q>1?'m':'')+' com '+esc(d.dest)+'; '+q+' volta'+(q>1?'m':'')+' ao estoque central';ok.textContent=q===op?'Confirmar devolução total':'Confirmar devolução parcial';};
 $$('[data-st]',f).forEach(b=>b.onclick=()=>{f.q.value=Math.min(op,Math.max(1,(+f.q.value||0)+ +b.dataset.st));up();});$$('.ax-rb [data-u]').forEach(b=>b.onclick=()=>{f.q.value=b.dataset.u;up();});f.addEventListener('input',up);up();
 f.addEventListener('submit',e=>{e.preventDefault();const q=Math.min(op,Math.max(1,+f.q.value||1));ok.classList.add('busy');setTimeout(()=>{d.back.push([q,NOWD]);const old=d.note;if(f.note.value.trim())d.note=f.note.value.trim();closeDlg();axRe();toast(q+' de '+op+' voltou'+(q>1?'ram':'')+' ao estoque central',()=>{d.back.pop();d.note=old;axRe();});},600);});}
Object.assign(A,{dsBack:v=>dsBackForm(v)});

/* ---------- Ministérios: membros e times com pessoas ---------- */
const MN_POOL=[...new Set([...MEMBERS.map(x=>x.n),...HPOOL])];
const MN_ROLES={Louvor:['Vocal','Violão','Teclado','Bateria','Baixo','Guitarra','Técnico de som'],Kids:['Professor(a)','Auxiliar','Recepção Kids','Coordenação'],Mídia:['Câmera','Transmissão','Projeção','Fotografia','Redes sociais'],Recepção:['Porta principal','Boas-vindas','Estacionamento']};
const mnTone=n=>TONES[[...n].reduce((a,c)=>a+c.charCodeAt(0),0)%6];
const mnAv=(n,cls='')=>`<span class="av ${cls}" style="background:var(--tone-${mnTone(n)});color:var(--tone-${mnTone(n)}-ink)">${initials(n)}</span>`;
function mnPpl(m){if(!m.ppl){const k=MINIS.indexOf(m),n=Math.max(4,Math.min(m.mem,14)),roles=MN_ROLES[m.n]||['Equipe','Apoio','Coordenação'];const own=MEMBERS.filter(x=>x.tit&&x.min.includes(m.n)).map(x=>x.n);const names=[m.lead,...own,...Array.from({length:HPOOL.length},(_,i)=>HPOOL[(k*5+i*3)%HPOOL.length])].filter((x,i,a)=>a.indexOf(x)===i).slice(0,n);
  m.ppl=names.map((x,i)=>({n:x,role:i===0?'Líder do ministério':roles[(i+k)%roles.length],since:['2019','2021','2022','2023','2024','2025'][(i+k)%6]}));
  m.teams.forEach((t,ti)=>{if(t.ppl)return;const ps=names.filter((x,i)=>i&&(i+ti)%Math.max(2,m.teams.length)===0).slice(0,Math.max(2,Math.min(t.m,6)));if(!names.includes(t.lead)){m.ppl.push({n:t.lead,role:'Líder de time',since:'2023'});names.push(t.lead);}t.ppl=[t.lead,...ps.filter(x=>x!==t.lead)];t.m=t.ppl.length;});m.ppl.forEach(p=>mnLinkMember(p.n,m.n,true));m.mem=m.ppl.length;}
 return m.ppl;}
function mnLinkMember(n,min,on){const x=MEMBERS.find(y=>y.tit&&y.n===n);if(!x)return;if(on&&!x.min.includes(min))x.min.push(min);if(!on)x.min=x.min.filter(z=>z!==min);}
const mnTeamsOf=(m,n)=>m.teams.filter(t=>(t.ppl||[]).includes(n));
Object.assign(S,{mnmq:'',mnmt:'all'});
function mnMembers(m){const ppl=mnPpl(m),q=norm(S.mnmq),noTeam=ppl.filter(p=>!mnTeamsOf(m,p.n).length).length;
 const l=ppl.filter(p=>(!q||norm(p.n+' '+p.role).includes(q))&&(S.mnmt==='all'||(S.mnmt==='none'?!mnTeamsOf(m,p.n).length:mnTeamsOf(m,p.n).some(t=>t.n===S.mnmt))));
 return `<section class="card mtab"><div class="sh mnm-h"><div><h2>Membros</h2><p class="who" style="margin:4px 0 0">Quem serve no ministério e em quais times está</p></div><button class="btn sec sm" data-a="mnAddPpl">${ic('userplus',14)}Adicionar membros</button></div>
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="mnmq" placeholder="Buscar pessoa ou função" value="${esc(S.mnmq)}" autocomplete="off"></label><div class="chips">${[['all','Todos',ppl.length],...m.teams.map(t=>[t.n,t.n,t.ppl.length]),...(noTeam?[['none','Sem time',noTeam]]:[])].map(([v,lb,n])=>`<button class="chipf ${S.mnmt===v?'on':''}" data-a="mnMemF" data-v="${esc(v)}">${esc(lb)}<small>${n}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow mnp thead"><span>Pessoa</span><span>Função</span><span>Times</span><span>Desde</span><span></span></div>${l.map(p=>{const ts=mnTeamsOf(m,p.n);return `<div class="trow mnp"><span class="tn">${mnAv(p.n)}<span class="hn"><b>${esc(p.n)}</b><span>${p.n===m.lead?'Líder do ministério':ts.some(t=>t.lead===p.n)?'Líder de '+esc(ts.find(t=>t.lead===p.n).n):'Membro'}</span></span></span><span class="mnp-c">${esc(p.role)}</span><span class="mnp-c mnp-t">${ts.length?ts.map(t=>`<button class="mnp-tag" data-a="mnTeamView" data-v="${m.id}|${m.teams.indexOf(t)}">${esc(t.n)}</button>`).join(''):'<span class="soft">Sem time</span>'}</span><span class="mnp-c soft">${p.since}</span><span class="ax-act">${p.n===m.lead?'':`<button class="ibtn sm" data-a="mnRmPpl" data-v="${esc(p.n)}" aria-label="Tirar ${esc(p.n)} do ministério" title="Tirar do ministério">${ic('x',13)}</button>`}</span></div>`;}).join('')}`:'<div class="mempty"><p>Ninguém encontrado.</p><span>Ajuste a busca ou o filtro.</span></div>'}
  <div class="tfoot"><span>${l.length} de ${ppl.length} pessoas</span></div></section>`;}
mnTimes=function(m){mnPpl(m);return `<section class="card pc"><div class="sh"><div><h2>Times</h2><p class="who" style="margin:4px 0 0">Grupos do ministério usados para montar as escalas</p></div><button class="btn sec sm" data-a="mnAddTeam">${ic('plus',14,2.2)}Novo time</button></div>
 ${m.teams.length?`<div class="mnt-g">${m.teams.map((t,i)=>`<article class="mnt-c" data-a="mnTeamView" data-v="${m.id}|${i}" tabindex="0"><div class="mnt-h"><div class="dkt"><b>${esc(t.n)}</b><span>${t.ppl.length} ${t.ppl.length===1?'pessoa':'pessoas'}</span></div><span style="position:relative"><button class="ibtn sm" data-a="mnTeamMenu" data-v="${i}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="mntPop-${i}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="mnTeamEdit" data-v="${i}">${ic('pen',16)}Editar time</button><hr><button class="pi danger" data-a="mnDelTeam" data-v="${i}">${ic('x',16)}Excluir time</button></div></span></div>
  <div class="mnt-l">${mnAv(t.lead)}<span><small>Líder</small><b>${esc(t.lead)}</b></span></div>
  <div class="mnt-p"><span class="avs">${t.ppl.filter(x=>x!==t.lead).slice(0,6).map(x=>mnAv(x)).join('')}${t.ppl.length-1>6?`<span class="av more">+${t.ppl.length-7}</span>`:''}</span><span class="mnt-n">${t.ppl.filter(x=>x!==t.lead).slice(0,2).map(x=>esc(x.split(' ')[0])).join(', ')}${t.ppl.length>3?` e mais ${t.ppl.length-3}`:''}</span></div></article>`).join('')}
  <button class="mnt-add" data-a="mnAddTeam"><span>${ic('plus',18,2)}</span><b>Novo time</b><small>Nome, líder e pessoas</small></button></div>`:mnEmpty('Nenhum time ainda.','Divida o ministério em times para montar escalas por função.','users','mnAddTeam')}</section>`;};
function mnTeamForm(i,mid){const m=mnById(mid||S.mini),ppl=mnPpl(m),t=i!=null?m.teams[i]:null;let sel=new Set(t?t.ppl:[]),lead=t?t.lead:'',q='';
 openDlg(`${dlgHead(t?'Editar time':'Novo time',`Ministério de ${esc(m.n)}`)}<form id="tF" class="mtf" novalidate><div class="mtf-l">
  <label class="fld"><span class="fl">Nome do time</span><input name="n" value="${esc(t?t.n:'')}" placeholder="Ex.: Domingo manhã" autocomplete="off"><span class="err"></span></label>
  <div class="fld"><span class="fl">Líder do time</span><div id="mtfLead" class="mtf-lead"></div><span class="hint">Escolha entre as pessoas selecionadas ao lado.</span></div>
  <div class="mtf-sum"><p class="fl">No time <b id="mtfN">0</b></p><div id="mtfSel" class="mtf-sel"></div></div></div>
  <div class="mtf-r"><p class="fl">Pessoas do ministério</p><label class="sbox">${ic('search',16)}<input id="mtfQ" placeholder="Buscar pessoa" autocomplete="off"></label><div class="mtf-list" id="mtfList"></div><p class="hint">Não encontrou? Adicione a pessoa ao ministério na aba Membros.</p></div>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit" id="mtfOk">${t?'Salvar':'Criar time'}</button></div></form>`,'lg');
 const paint=()=>{const ql=norm(q),l=ppl.filter(p=>!ql||norm(p.n+' '+p.role).includes(ql));
  $('#mtfList').innerHTML=l.length?l.map(p=>{const on=sel.has(p.n),others=mnTeamsOf(m,p.n).filter(x=>x!==t);return `<button type="button" class="mtf-p ${on?'on':''}" data-p="${esc(p.n)}">${mnAv(p.n)}<span class="dkt"><b>${esc(p.n)}</b><span>${esc(p.role)}${others.length?' · '+others.map(x=>esc(x.n)).join(', '):''}</span></span><i class="mtf-ck">${ic('check',12,2.6)}</i></button>`;}).join(''):'<p class="who" style="padding:10px">Ninguém encontrado.</p>';
  const arr=ppl.filter(p=>sel.has(p.n)).map(p=>p.n);if(lead&&!sel.has(lead))lead='';if(!lead&&arr.length)lead=arr[0];
  $('#mtfN').textContent=arr.length;if(lead)arr.splice(0,arr.length,lead,...arr.filter(x=>x!==lead));
  $('#mtfSel').innerHTML=arr.length?arr.map(n=>`<span class="mtf-chip">${mnAv(n)}${esc(n.split(' ').slice(0,2).join(' '))}${n===lead?'<em>líder</em>':''}<button type="button" data-rm="${esc(n)}" aria-label="Tirar ${esc(n)}">${ic('x',11,2.4)}</button></span>`).join(''):`<div class="mtf-empty">${ic('users',18)}<span>Toque nas pessoas ao lado para colocar no time.</span></div>`;
  $('#mtfLead').innerHTML=arr.length?`<span class="selw"><select id="mtfLeadS">${arr.map(n=>`<option ${n===lead?'selected':''}>${esc(n)}</option>`).join('')}</select>${ic('updown',14)}</span>`:'<span class="mtf-nolead">Selecione pessoas primeiro</span>';
  const ls=$('#mtfLeadS');if(ls)ls.onchange=e=>{lead=e.target.value;paint();};};
 const f=$('#tF');f.addEventListener('click',e=>{const p=e.target.closest('[data-p]'),r=e.target.closest('[data-rm]');if(p){const n=p.dataset.p;sel.has(n)?sel.delete(n):sel.add(n);paint();}if(r){sel.delete(r.dataset.rm);paint();}});
 $('#mtfQ').addEventListener('input',e=>{q=e.target.value;paint();});paint();setTimeout(()=>f.elements.n.focus(),60);
 f.addEventListener('submit',e=>{e.preventDefault();const n=f.elements.n.value.trim(),bad=(msg)=>{const fl=f.elements.n.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent=msg;f.elements.n.focus();};
  if(!n)return bad('Dê um nome ao time');if(m.teams.some(x=>x!==t&&norm(x.n)===norm(n)))return bad('Já existe um time com esse nome');if(!sel.size){const s2=$('#mtfSel');s2.classList.remove('shk');void s2.offsetWidth;s2.classList.add('shk');toast('Coloque pelo menos uma pessoa no time');return;}
  const arr=ppl.filter(p=>sel.has(p.n)).map(p=>p.n),list=[lead,...arr.filter(x=>x!==lead)];$('#mtfOk').classList.add('busy');
  setTimeout(()=>{if(t)Object.assign(t,{n,lead,ppl:list,m:list.length});else m.teams.push({n,lead,ppl:list,m:list.length});closeDlg();render();toast(t?`Time ${n} atualizado`:`Time ${n} criado com ${list.length} ${list.length===1?'pessoa':'pessoas'}`);},450);});}
function mnPplForm(){const m=mnById(S.mini),inM=new Set(mnPpl(m).map(p=>p.n)),cand=MN_POOL.filter(n=>!inM.has(n));let sel=new Set(),q='';const roles=MN_ROLES[m.n]||['Equipe','Apoio','Coordenação'];
 openDlg(`${dlgHead('Adicionar membros',`Ministério de ${esc(m.n)}`)}<div class="fgrid one"><label class="sbox">${ic('search',16)}<input id="mpQ" placeholder="Buscar pessoa cadastrada" autocomplete="off"></label><div class="mtf-list" id="mpL" style="max-height:300px"></div>
  <label class="fld"><span class="fl">Função no ministério</span><input id="mpR" list="mpRl" value="${esc(roles[0])}" autocomplete="off"><datalist id="mpRl">${roles.map(r=>`<option value="${esc(r)}">`).join('')}</datalist></label></div>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" id="mpOk" disabled>Adicionar</button></div>`);
 const paint=()=>{const ql=norm(q);$('#mpL').innerHTML=cand.filter(n=>!ql||norm(n).includes(ql)).map(n=>`<button type="button" class="mtf-p ${sel.has(n)?'on':''}" data-p="${esc(n)}">${mnAv(n)}<span class="dkt"><b>${esc(n)}</b><span>${MINIS.filter(x=>x!==m&&x.ppl&&x.ppl.some(p=>p.n===n)).map(x=>x.n).join(', ')||'Membro da igreja'}</span></span><i class="mtf-ck">${ic('check',12,2.6)}</i></button>`).join('')||'<p class="who" style="padding:10px">Ninguém encontrado.</p>';const ok=$('#mpOk');ok.disabled=!sel.size;ok.textContent=sel.size?`Adicionar ${sel.size} ${sel.size===1?'pessoa':'pessoas'}`:'Adicionar';};
 $('#mpL').addEventListener('click',e=>{const p=e.target.closest('[data-p]');if(!p)return;const n=p.dataset.p;sel.has(n)?sel.delete(n):sel.add(n);paint();});$('#mpQ').addEventListener('input',e=>{q=e.target.value;paint();});paint();
 $('#mpOk').onclick=()=>{const role=$('#mpR').value.trim()||roles[0];sel.forEach(n=>{m.ppl.push({n,role,since:'2026'});mnLinkMember(n,m.n,true);});m.mem=m.ppl.length;closeDlg();render();toast(`${sel.size} ${sel.size===1?'pessoa adicionada':'pessoas adicionadas'} ao ministério`);};}
Object.assign(A,{mnAddTeam:()=>mnTeamForm(null),mnTeamEdit:(v,b,e)=>{if(e&&e.target.closest('[data-a=mnTeamMenu],.pop'))return;closePops();mnTeamForm(+v);},mnTeamMenu:v=>{const p=$('#mntPop-'+v);closePops(p);p.classList.toggle('open');},
 mnDelTeam:v=>{closePops();const m=mnById(S.mini),t=m.teams[+v];confirmDel({title:`Excluir o time ${t.n}?`,body:`As ${t.ppl.length} pessoas continuam no ministério, mas saem das escalas deste time.`,label:'Excluir time',onConfirm:()=>{m.teams.splice(+v,1);render();toast('Time excluído',()=>{m.teams.splice(+v,0,t);render();});}});},
 mnMemF:v=>{S.mnmt=v;reMn();},mnAddPpl:()=>mnPplForm(),
 mnRmPpl:v=>{const m=mnById(S.mini),p=m.ppl.find(x=>x.n===v),ts=mnTeamsOf(m,v);confirmDel({title:`Tirar ${v.split(' ')[0]} do ministério?`,body:ts.length?`${v} também sai ${ts.length>1?'dos times':'do time'} ${ts.map(t=>t.n).join(', ')}.`:`${v} deixa de aparecer nas escalas do ministério.`,label:'Tirar do ministério',onConfirm:()=>{const i=m.ppl.indexOf(p);m.ppl.splice(i,1);mnLinkMember(v,m.n,false);const back=ts.map(t=>[t,t.ppl.indexOf(v)]);ts.forEach(t=>{t.ppl=t.ppl.filter(x=>x!==v);if(t.lead===v)t.lead=t.ppl[0]||'';t.m=t.ppl.length;});m.mem=m.ppl.length;render();toast(`${v.split(' ')[0]} saiu do ministério`);}});}});
{const ra=rmAfter;rmAfter=function(){ra();const q=$('#mnmq');if(q)q.addEventListener('input',e=>{S.mnmq=e.target.value;const p=e.target.selectionStart;reMn();const n=$('#mnmq');n.focus();n.setSelectionRange(p,p);});};}
{const nav=A.mnOpen;A.mnOpen=v=>{S.mnmq='';S.mnmt='all';nav(v);};}

/* ---------- Times: visualização, exclusão com impacto e tela do membro ---------- */
const mnTeamEsc=(m,t)=>ESCALAS.filter(x=>x.min===m.n).flatMap(x=>x.dates.flatMap(d=>d.blocks.filter(b=>b.team===t.n).map(b=>({x,d,b,e:eById(d.ev)})))).filter(z=>z.e&&z.e.d&&z.e.d>=NOWD).sort((a,b)=>a.e.d<b.e.d?-1:1);
function mnTeamView(mid,i){const m=mnById(mid),t=m&&m.teams[i];if(!t)return;mnPpl(m);const esc2=mnTeamEsc(m,t),role=n=>(m.ppl.find(p=>p.n===n)||{}).role||'Membro';
 openDlg(`<div class="mtv-h"><span class="mtv-i">${ic('users',18)}</span><div class="dkt"><h2>${esc(t.n)}</h2><span>Time do Ministério de ${esc(m.n)} · ${t.ppl.length} ${t.ppl.length===1?'pessoa':'pessoas'}</span></div><button class="ibtn" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>
  <div class="mtv-lead">${mnAv(t.lead)}<span class="dkt"><small>Líder do time</small><b>${esc(t.lead)}</b><span>${esc(role(t.lead))}</span></span></div>
  <div class="mtv-sec"><p class="fl">Pessoas no time</p><div class="mtv-list">${t.ppl.filter(x=>x!==t.lead).map(n=>`<div class="mtv-p">${mnAv(n)}<span class="dkt"><b>${esc(n)}</b><span>${esc(role(n))}</span></span>${(()=>{const mm=MEMBERS.find(y=>y.tit&&y.n===n);return mm?`<button class="lnk" data-a="mnGoMember" data-v="${mm.id}">Ver cadastro</button>`:'';})()}</div>`).join('')||'<p class="who" style="margin:0">Só o líder por enquanto.</p>'}</div></div>
  <div class="mtv-sec"><p class="fl">Próximas escalas deste time</p>${esc2.length?`<div class="mtv-list">${esc2.slice(0,4).map(z=>`<button class="mtv-e" data-a="mnGoEsc" data-v="${z.x.id}">${dTile(z.e)}<span class="dkt"><b>${esc(z.e.t)}</b><span>${esc(z.b.label)} · ${z.b.members.length} escalados</span></span>${ic('chevR',14,2)}</button>`).join('')}</div>`:'<p class="who" style="margin:0">Nenhuma escala futura usa este time.</p>'}</div>
  <div class="dfoot"><button class="btn sec dang-t" data-a="mnDelTeam" data-v="${m.id}|${i}" style="margin-right:auto">${ic('x',14)}Excluir time</button><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="mnTeamEdit" data-v="${m.id}|${i}">${ic('pen',14)}Editar time</button></div>`,'mtv');}
const mnRef=v=>{const p=String(v).split('|');return p.length>1?{m:mnById(p[0]),i:+p[1]}:{m:mnById(S.mini),i:+p[0]};};
Object.assign(A,{mnTeamView:(v,b,e)=>{if(e&&e.target.closest('[data-a=mnTeamMenu],.pop'))return;closePops();const r=mnRef(v);mnTeamView(r.m.id,r.i);},
 mnTeamEdit:(v,b,e)=>{if(e&&e.target.closest('[data-a=mnTeamMenu],.pop')&&b.dataset.a!=='mnTeamEdit')return;closePops();const r=mnRef(v);mnTeamForm(r.i,r.m.id);},
 mnDelTeam:v=>{closePops();const r=mnRef(v),m=r.m,t=m.teams[r.i],es=mnTeamEsc(m,t);
  confirmDel({title:`Excluir o time ${t.n}?`,body:`${t.ppl.length} ${t.ppl.length===1?'pessoa continua':'pessoas continuam'} no Ministério de ${esc(m.n)}, só deixam de estar neste time.${es.length?` ${es.length} ${es.length===1?'bloco de escala futura usa':'blocos de escalas futuras usam'} este time: as pessoas já escaladas ficam, mas o bloco perde o vínculo com o time.`:''}`,label:'Excluir time',onConfirm:()=>{const ix=m.teams.indexOf(t);m.teams.splice(ix,1);es.forEach(z=>z.b.team='');closeDlg();render();toast(`Time ${t.n} excluído`,()=>{m.teams.splice(ix,0,t);es.forEach(z=>z.b.team=t.n);render();});}});},
 mnGoMember:v=>{closeDlg();S.active='membros';S.member=v;S.tab='min';S.mini=null;render();window.scrollTo({top:0});},
 mnGoEsc:v=>{closeDlg();S.active='escalas';S.esc=v;S.estab='datas';S.mini=null;render();window.scrollTo({top:0});},
 mnGoMin:v=>{S.active='ministerios';S.mini=v;S.mtab='times';S.member=null;render();window.scrollTo({top:0});}});
/* tela do membro: ministérios com função e times */
tMin=function(p){MINIS.forEach(mnPpl);p.min.forEach(n=>{const mn=MINIS.find(x=>x.n===n);if(mn&&!mn.ppl.some(q=>q.n===p.n)){mn.ppl.push({n:p.n,role:p.role||'Equipe',since:'2026'});mn.mem=mn.ppl.length;}});
 const mins=p.min.map(n=>MINIS.find(x=>x.n===n)).filter(Boolean),pres=p.attend.filter(Boolean).length;
 return `<section class="card pc"><div class="sh"><div><h2>Ministérios e times</h2><p class="who" style="margin:4px 0 0">Onde ${esc(p.n.split(' ')[0])} serve e em quais times está</p></div><button class="btn sec sm" data-a="addMin">${ic('plus',14,2.2)}Vincular</button></div>
  ${mins.length?`<div class="pmn">${mins.map(mn=>{const me=mn.ppl.find(q=>q.n===p.n)||{},ts=mn.teams.filter(t=>t.ppl.includes(p.n)),idx=p.min.indexOf(mn.n);return `<article class="pmn-c"><div class="pmn-h">${mTile(mn,36)}<span class="dkt"><button class="lnk pmn-n" data-a="mnGoMin" data-v="${mn.id}">Ministério de ${esc(mn.n)}</button><span>${esc(me.role||p.role)} · desde ${esc(me.since||p.since)}</span></span>
   <div style="position:relative"><button class="ibtn sm" data-a="minMenu" data-v="${idx}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="minPop${idx}" style="right:0;top:calc(100% + 4px)"><button class="pi" data-a="pmnTeams" data-v="${mn.id}">${ic('users',16)}Escolher times</button><hr><button class="pi danger" data-a="unMin" data-v="${idx}">${ic('x',16)}Remover do ministério</button></div></div></div>
   <div class="pmn-t"><span class="pmn-l">Times</span>${ts.length?ts.map(t=>`<button class="pmn-tag ${t.lead===p.n?'lead':''}" data-a="mnTeamView" data-v="${mn.id}|${mn.teams.indexOf(t)}">${esc(t.n)}${t.lead===p.n?'<em>líder</em>':''}</button>`).join(''):'<span class="soft">Ainda em nenhum time</span>'}<button class="pmn-add" data-a="pmnTeams" data-v="${mn.id}">${ic(ts.length?'pen':'plus',12,2.2)}${ts.length?'Alterar':'Colocar em um time'}</button></div>
   <div class="pmn-f"><div class="attd">${p.attend.map(a=>`<i class="${a?'':'off'}"></i>`).join('')}</div><span><b>${pres}</b> de ${p.attend.length} últimas escalas</span></div></article>`;}).join('')}</div>`
  :`<div class="soft-empty"><p>Sem ministérios por enquanto.</p><button class="btn pri" data-a="addMin">${ic('plus',14,2.2)}Vincular a um ministério</button></div>`}</section>`;};
function pmnTeamsForm(mid){const p=byId(S.member),mn=mnById(mid);mnPpl(mn);let sel=new Set(mn.teams.filter(t=>t.ppl.includes(p.n)).map(t=>t.n));
 openDlg(`${dlgHead('Times de '+esc(p.n.split(' ')[0]),'Ministério de '+esc(mn.n))}<div class="mtf-list" id="ptL" style="max-height:340px">${mn.teams.map(t=>`<button type="button" class="mtf-p ${sel.has(t.n)?'on':''}" data-t="${esc(t.n)}" ${t.lead===p.n?'disabled title="É o líder deste time"':''}><span class="mtv-i sm">${ic('users',14)}</span><span class="dkt"><b>${esc(t.n)}</b><span>Líder: ${esc(t.lead)} · ${t.ppl.length} pessoas${t.lead===p.n?' · você lidera':''}</span></span><i class="mtf-ck">${ic('check',12,2.6)}</i></button>`).join('')||'<p class="who">Este ministério ainda não tem times.</p>'}</div>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" id="ptOk">Salvar</button></div>`,'sm');
 $('#ptL').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b||b.disabled)return;const n=b.dataset.t;sel.has(n)?sel.delete(n):sel.add(n);b.classList.toggle('on',sel.has(n));});
 $('#ptOk').onclick=()=>{mn.teams.forEach(t=>{if(t.lead===p.n)return;const has=t.ppl.includes(p.n);if(sel.has(t.n)&&!has)t.ppl.push(p.n);if(!sel.has(t.n)&&has)t.ppl=t.ppl.filter(x=>x!==p.n);t.m=t.ppl.length;});closeDlg();render();toast('Times atualizados');};}
Object.assign(A,{pmnTeams:v=>{closePops();pmnTeamsForm(v);},
 unMin:v=>{closePops();const p=byId(S.member),x=p.min[+v],mn=MINIS.find(y=>y.n===x),ts=mn?mn.teams.filter(t=>t.ppl.includes(p.n)):[];confirmDel({title:`Remover ${p.n.split(' ')[0]} de ${x}?`,body:`${ts.length?`Sai também ${ts.length>1?'dos times':'do time'} ${ts.map(t=>t.n).join(', ')}. `:''}Deixa de aparecer nas próximas escalas deste ministério; o histórico de participação é mantido.`,label:'Remover',onConfirm:()=>{p.min.splice(+v,1);if(mn){mn.ppl=mn.ppl.filter(q=>q.n!==p.n);ts.forEach(t=>{t.ppl=t.ppl.filter(y=>y!==p.n);if(t.lead===p.n)t.lead=t.ppl[0]||'';t.m=t.ppl.length;});mn.mem=mn.ppl.length;}render();toast(`Removido(a) de ${x}`);}});}});

/* ---------- Ministérios: Responsabilidades e Conteúdo ---------- */
const MR_FREQ=[['semanal','Toda semana','calendar'],['mensal','Todo mês','cal2'],['evento','Por evento','ticket'],['continua','Contínua','swap']];
const MR_SEED={Louvor:[['Ministração nos cultos de domingo','Escolher o repertório, ensaiar e conduzir o louvor nos cultos da manhã e da noite.','semanal'],['Ensaio geral','Ensaio com banda e vocais antes de cada culto.','semanal'],['Manutenção dos instrumentos','Conferir cordas, cabos e afinação; avisar o almoxarifado sobre reposições.','mensal']],
 Kids:[['Aulas do Zelo Kids','Receber as crianças e dar a aula do dia em cada sala.','semanal'],['Check-in e segurança','Controlar entrada e saída das crianças com a etiqueta do responsável.','semanal'],['Preparação de material','Separar apostilas e materiais da aula do mês.','mensal']],
 Mídia:[['Transmissão ao vivo','Transmitir os cultos de domingo no YouTube.','semanal'],['Projeção','Letras e avisos no telão durante os cultos.','semanal'],['Cobertura de eventos','Fotos e vídeos dos eventos especiais.','evento']],
 Recepção:[['Boas-vindas na porta','Receber as pessoas e indicar lugares.','semanal'],['Cadastro de visitantes','Preencher o cartão de visitante e passar para a Integração.','semanal']]};
const MC_PAGE={Curso:'cursos',Pregação:'pregacoes',Música:'musicas',Material:'material'};
const MC_SEED={Louvor:[['Música','Grande é o Senhor'],['Música','Aclame ao Senhor'],['Material','Guia do líder de célula jovem']],Kids:[['Material','Apostila de integração']]};
function mnNorm(m){if(m._rc)return;m._rc=1;mnPpl(m);
 if(!m.resp.length&&MR_SEED[m.n])m.resp=MR_SEED[m.n].map(x=>x.slice());
 m.resp=m.resp.map((r,i)=>typeof r==='string'||Array.isArray(r)?(()=>{const [t,desc,freq]=Array.isArray(r)?r:[r,'',['semanal','evento','continua'][i%3]],tm=m.teams[i%Math.max(1,m.teams.length)];return {id:'rs'+(++_rsid),t,desc:desc||'',freq,team:tm?tm.n:'',owner:tm?tm.lead:m.lead};})():r);
 if(!m.content.length&&MC_SEED[m.n])m.content=MC_SEED[m.n].map(x=>x.slice());
 m.content=m.content.map((c,i)=>Array.isArray(c)?{id:'ct'+(++_rsid),type:c[0],t:c[1],note:'',teams:i===0&&m.teams[0]?[m.teams[0].n]:[],req:i===0,at:['12/08/2026','03/09/2026','21/09/2026'][i%3]}:c);}
let _rsid=0;
const mrFreq=k=>MR_FREQ.find(f=>f[0]===k)||MR_FREQ[0];
mnResp=function(m){mnNorm(m);const l=m.resp;
 return `<section class="card pc"><div class="sh"><div><h2>Responsabilidades</h2><p class="who" style="margin:4px 0 0">O que o ministério assume na igreja e quem cuida de cada coisa</p></div>${l.length?`<button class="btn sec sm" data-a="mrNew">${ic('plus',14,2.2)}Nova responsabilidade</button>`:''}</div>
  ${l.length?`<div class="mr-l">${l.map((r,i)=>{const f=mrFreq(r.freq);return `<article class="mr-r" data-a="mrView" data-v="${i}" tabindex="0"><span class="mr-n">${i+1}</span><span class="dkt"><b>${esc(r.t)}</b><span>${r.desc?esc(r.desc):'<span class="soft">Sem descrição</span>'}</span></span>
   <span class="mr-meta"><span class="mr-f">${ic(f[2],12,2)}${f[1]}</span>${r.team?`<span class="mr-tm">${ic('users',12,2)}${esc(r.team)}</span>`:''}</span><span class="mr-ow">${mnAv(r.owner||m.lead)}<span><small>Responsável</small><b>${esc((r.owner||m.lead).split(' ').slice(0,2).join(' '))}</b></span></span>
   <span style="position:relative"><button class="ibtn sm" data-a="mrMenu" data-v="${i}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="mrPop-${i}" style="right:0;top:calc(100% + 6px)"><button class="pi" data-a="mrEdit" data-v="${i}">${ic('pen',16)}Editar</button>${i?`<button class="pi" data-a="mrMove" data-v="${i}|-1">${ic('chevL',16,2)}Subir</button>`:''}${i<l.length-1?`<button class="pi" data-a="mrMove" data-v="${i}|1">${ic('chevR',16,2)}Descer</button>`:''}<hr><button class="pi danger" data-a="mrDel" data-v="${i}">${ic('x',16)}Excluir</button></div></span></article>`;}).join('')}</div>`
  :mnEmpty('Nenhuma responsabilidade ainda.','Liste o que o ministério assume na igreja, como “Montagem do culto de domingo”.','clipboard','mrNew')}</section>`;};
function mrForm(i){const m=mnById(S.mini);mnNorm(m);const r=i!=null?m.resp[i]:null,v=r||{t:'',desc:'',freq:'semanal',team:'',owner:m.lead};let freq=v.freq;
 openDlg(`${dlgHead(r?'Editar responsabilidade':'Nova responsabilidade',`Ministério de ${esc(m.n)}`)}<form id="mrF" class="fgrid mr-form" novalidate>
  <label class="fld wide"><span class="fl">O que é</span><input name="t" value="${esc(v.t)}" placeholder="Ex.: Montagem do culto de domingo" autocomplete="off"><span class="err"></span></label>
  <label class="fld wide"><span class="fl">Como funciona <small>opcional</small></span><textarea class="ta" name="desc" rows="3" placeholder="O que precisa ser feito, quando e com quem falar.">${esc(v.desc)}</textarea></label>
  <div class="fld wide"><span class="fl">Com que frequência</span><div class="mr-fq">${MR_FREQ.map(([k,l,icn])=>`<button type="button" class="${k===freq?'on':''}" data-fq="${k}">${ic(icn,14,2)}${l}</button>`).join('')}</div></div>
  <label class="fld"><span class="fl">Time <small>opcional</small></span><span class="selw"><select name="team"><option value="">Ministério inteiro</option>${m.teams.map(t=>`<option ${t.n===v.team?'selected':''}>${esc(t.n)}</option>`).join('')}</select>${ic('updown',14)}</span></label>
  <label class="fld"><span class="fl">Responsável</span><span class="selw"><select name="owner">${m.ppl.map(p=>`<option ${p.n===v.owner?'selected':''}>${esc(p.n)}</option>`).join('')}</select>${ic('updown',14)}</span><span class="hint">Quem responde por ela.</span></label>
  <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" type="submit">${r?'Salvar':'Adicionar'}</button></div></form>`);
 const f=$('#mrF');f.querySelectorAll('[data-fq]').forEach(b=>b.onclick=()=>{freq=b.dataset.fq;f.querySelectorAll('[data-fq]').forEach(x=>x.classList.toggle('on',x===b));});
 f.elements.team.onchange=e=>{const t=m.teams.find(x=>x.n===e.target.value);if(t)f.elements.owner.value=t.lead;};
 setTimeout(()=>f.elements.t.focus(),60);
 f.onsubmit=e=>{e.preventDefault();const t=f.elements.t.value.trim();if(!t){const fl=f.elements.t.closest('.fld');fl.classList.add('bad');fl.querySelector('.err').textContent='Diga qual é a responsabilidade';return;}
  const d={t,desc:f.elements.desc.value.trim(),freq,team:f.elements.team.value,owner:f.elements.owner.value};if(r)Object.assign(r,d);else m.resp.push({id:'rs'+(++_rsid),...d});closeDlg();render();toast(r?'Responsabilidade atualizada':'Responsabilidade adicionada');};}
function mrView(i){const m=mnById(S.mini);mnNorm(m);const r=m.resp[i],f=mrFreq(r.freq),own=m.ppl.find(p=>p.n===r.owner);
 openDlg(`<div class="mtv-h"><span class="mtv-i">${ic('clipboard',18)}</span><div class="dkt"><h2>${esc(r.t)}</h2><span>Responsabilidade do Ministério de ${esc(m.n)}</span></div><button class="ibtn" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>
  ${r.desc?`<p class="mr-desc">${esc(r.desc)}</p>`:'<p class="mr-desc soft">Sem descrição.</p>'}
  <div class="mr-kv"><div><small>Frequência</small><b>${ic(f[2],14,2)}${f[1]}</b></div><div><small>Time</small><b>${r.team?`<button class="lnk" data-a="mnTeamView" data-v="${m.id}|${m.teams.findIndex(t=>t.n===r.team)}">${esc(r.team)}</button>`:'Ministério inteiro'}</b></div></div>
  <div class="mtv-lead" style="margin-top:12px">${mnAv(r.owner||m.lead)}<span class="dkt"><small>Responsável</small><b>${esc(r.owner||m.lead)}</b><span>${esc(own?own.role:'')}</span></span></div>
  <div class="dfoot"><button class="btn sec dang-t" data-a="mrDel" data-v="${i}" style="margin-right:auto">${ic('x',14)}Excluir</button><button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="mrEdit" data-v="${i}">${ic('pen',14)}Editar</button></div>`,'mtv');}
/* conteúdo */
Object.assign(S,{mcType:'all'});
mnCont=function(m){mnNorm(m);const l=m.content,types=Object.keys(CONTENT),list=l.filter(c=>S.mcType==='all'||c.type===S.mcType);
 return `<section class="card pc"><div class="sh"><div><h2>Conteúdo do ministério</h2><p class="who" style="margin:4px 0 0">Cursos, pregações, músicas e materiais que o ministério usa. Eles ficam cadastrados em Conteúdo; aqui você vincula e diz para quem é.</p></div>${l.length?`<button class="btn sec sm" data-a="mcNew">${ic('plus',14,2.2)}Vincular conteúdo</button>`:''}</div>
  ${l.length?`<div class="chips mc-f">${[['all','Todos',l.length],...types.map(t=>[t,t,l.filter(c=>c.type===t).length]).filter(x=>x[2])].map(([v,lb,n])=>`<button class="chipf ${S.mcType===v?'on':''}" data-a="mcF" data-v="${v}">${v==='all'?'':ic(CTYPE_IC[v],13,2)}${lb}<small>${n}</small></button>`).join('')}</div>
   <div class="mc-g">${list.map(c=>{const i=l.indexOf(c);return `<article class="mc-c" data-a="mcView" data-v="${i}" tabindex="0"><div class="mc-h"><span class="mc-i t-${MC_PAGE[c.type]}">${ic(CTYPE_IC[c.type],15,1.8)}</span><span class="dkt"><small>${c.type}</small><b>${esc(c.t)}</b></span>${c.req?'<span class="mc-req">Obrigatório</span>':''}</div>
    <div class="mc-for">${c.teams.length?`<span class="pmn-l">Para</span>${c.teams.map(t=>`<span class="mnp-tag">${esc(t)}</span>`).join('')}`:'<span class="soft">Para todo o ministério</span>'}</div><div class="mc-ft"><span>Vinculado em ${c.at}</span>${ic('chevR',14,2)}</div></article>`;}).join('')}</div>`
  :mnEmpty('Nenhum conteúdo vinculado.','Vincule um curso, pregação, música ou material.','book','mcNew')}</section>`;};
function mcPick(){const m=mnById(S.mini);mnNorm(m);const have=new Set(m.content.map(c=>c.type+'|'+c.t));let type=Object.keys(CONTENT)[0],sel=new Set(),teams=new Set(),req=false,q='';
 openDlg(`${dlgHead('Vincular conteúdo',`Ministério de ${esc(m.n)}`)}<div class="mcp">
  <div class="mcp-ty">${Object.keys(CONTENT).map(t=>`<button type="button" data-ty="${t}" class="${t===type?'on':''}"><span class="mc-i t-${MC_PAGE[t]}">${ic(CTYPE_IC[t],15,1.8)}</span>${t}<small id="mcpN-${t}"></small></button>`).join('')}</div>
  <div class="mcp-r"><label class="sbox">${ic('search',16)}<input id="mcpQ" placeholder="Buscar na biblioteca" autocomplete="off"></label><div class="mtf-list" id="mcpL" style="max-height:260px"></div>
   <p class="fl" style="margin:12px 0 8px">Para quem</p><div class="mcp-teams"><button type="button" class="chipf on" data-tm="">Todo o ministério</button>${m.teams.map(t=>`<button type="button" class="chipf" data-tm="${esc(t.n)}">${esc(t.n)}</button>`).join('')}</div>
   <label class="tog fd-tog sm" style="margin-top:12px"><input type="checkbox" id="mcpReq"><span class="sw"></span><span><b>Obrigatório</b><small>Quem é do ministério precisa concluir ou conhecer</small></span></label></div></div>
  <div class="dfoot"><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" id="mcpOk" disabled>Vincular</button></div>`,'lg');
 const paint=()=>{const ql=norm(q),l=CONTENT[type].filter(x=>!ql||norm(x).includes(ql));
  $('#mcpL').innerHTML=l.map(x=>{const k=type+'|'+x,had=have.has(k);return `<button type="button" class="mtf-p ${sel.has(k)?'on':''}" data-k="${esc(k)}" ${had?'disabled':''}><span class="mc-i t-${MC_PAGE[type]}">${ic(CTYPE_IC[type],14,1.8)}</span><span class="dkt"><b>${esc(x)}</b><span>${had?'Já vinculado':type}</span></span><i class="mtf-ck">${ic('check',12,2.6)}</i></button>`;}).join('')||'<p class="who" style="padding:10px">Nada encontrado.</p>';
  Object.keys(CONTENT).forEach(t=>{const n=[...sel].filter(k=>k.startsWith(t+'|')).length;$('#mcpN-'+t).textContent=n||'';});
  const ok=$('#mcpOk');ok.disabled=!sel.size;ok.textContent=sel.size?`Vincular ${sel.size} ${sel.size===1?'conteúdo':'conteúdos'}`:'Vincular';};
 const D=$('.mcp');D.addEventListener('click',e=>{const t=e.target.closest('[data-ty],[data-k],[data-tm]');if(!t||t.disabled)return;
  if(t.dataset.ty){type=t.dataset.ty;D.querySelectorAll('[data-ty]').forEach(x=>x.classList.toggle('on',x===t));paint();}
  if(t.dataset.k){const k=t.dataset.k;sel.has(k)?sel.delete(k):sel.add(k);paint();}
  if(t.dataset.tm!=null){const n=t.dataset.tm;if(!n)teams.clear();else teams.has(n)?teams.delete(n):teams.add(n);D.querySelectorAll('[data-tm]').forEach(x=>x.classList.toggle('on',x.dataset.tm?teams.has(x.dataset.tm):!teams.size));}});
 $('#mcpQ').addEventListener('input',e=>{q=e.target.value;paint();});$('#mcpReq').onchange=e=>req=e.target.checked;paint();
 $('#mcpOk').onclick=()=>{sel.forEach(k=>{const [ty,t]=k.split('|');m.content.push({id:'ct'+(++_rsid),type:ty,t,note:'',teams:[...teams],req,at:'10/10/2026'});});closeDlg();render();toast(`${sel.size} ${sel.size===1?'conteúdo vinculado':'conteúdos vinculados'}`);};}
function mcView(i){const m=mnById(S.mini);mnNorm(m);const c=m.content[i];let teams=new Set(c.teams),req=c.req;
 openDlg(`<div class="mtv-h"><span class="mc-i lg t-${MC_PAGE[c.type]}">${ic(CTYPE_IC[c.type],18,1.8)}</span><div class="dkt"><h2>${esc(c.t)}</h2><span>${c.type} · vinculado em ${c.at}</span></div><button class="ibtn" data-a="closeDlg" aria-label="Fechar">${ic('x',16)}</button></div>
  <div class="mcv"><p class="fl" style="margin:0 0 8px">Para quem</p><div class="mcp-teams"><button type="button" class="chipf ${teams.size?'':'on'}" data-tm="">Todo o ministério</button>${m.teams.map(t=>`<button type="button" class="chipf ${teams.has(t.n)?'on':''}" data-tm="${esc(t.n)}">${esc(t.n)}</button>`).join('')}</div>
   <label class="tog fd-tog sm" style="margin-top:12px"><input type="checkbox" id="mcvReq" ${req?'checked':''}><span class="sw"></span><span><b>Obrigatório</b><small>Quem é do ministério precisa concluir ou conhecer</small></span></label>
   <label class="fld" style="margin-top:12px"><span class="fl">Observação <small>opcional</small></span><textarea class="ta" id="mcvNote" rows="2" placeholder="Ex.: Usar no ensaio de quinta">${esc(c.note)}</textarea></label>
   <button type="button" class="lnk mcv-go" data-a="mcOpen" data-v="${c.type}">${ic('arrowR',13)}Abrir em Conteúdo › ${c.type==='Material'?'Material de apoio':c.type==='Música'?'Músicas':c.type==='Pregação'?'Pregações':'Cursos'}</button></div>
  <div class="dfoot"><button class="btn sec dang-t" data-a="mcDel" data-v="${i}" style="margin-right:auto">${ic('x',14)}Desvincular</button><button class="btn sec" data-a="closeDlg">Cancelar</button><button class="btn pri" id="mcvOk">Salvar</button></div>`,'mtv');
 const D=$('.mcv');D.addEventListener('click',e=>{const t=e.target.closest('[data-tm]');if(!t)return;const n=t.dataset.tm;if(!n)teams.clear();else teams.has(n)?teams.delete(n):teams.add(n);D.querySelectorAll('[data-tm]').forEach(x=>x.classList.toggle('on',x.dataset.tm?teams.has(x.dataset.tm):!teams.size));});
 $('#mcvOk').onclick=()=>{Object.assign(c,{teams:[...teams],req:$('#mcvReq').checked,note:$('#mcvNote').value.trim()});closeDlg();render();toast('Conteúdo atualizado');};}
Object.assign(A,{mrNew:()=>mrForm(null),mnAddResp:()=>mrForm(null),mrView:(v,b,e)=>{if(e&&e.target.closest('[data-a=mrMenu],.pop'))return;closePops();mrView(+v);},mrEdit:v=>{closePops();mrForm(+v);},
 mrMenu:v=>{const p=$('#mrPop-'+v);closePops(p);p.classList.toggle('open');},
 mrMove:v=>{closePops();const m=mnById(S.mini),[i,d]=v.split('|').map(Number),j=i+d;[m.resp[i],m.resp[j]]=[m.resp[j],m.resp[i]];reMn();},
 mrDel:v=>{closePops();const m=mnById(S.mini),i=+v,r=m.resp[i];confirmDel({title:'Excluir esta responsabilidade?',body:`“${esc(r.t)}” deixa de aparecer no ministério${r.owner?` e ${esc(r.owner.split(' ')[0])} deixa de ser o responsável`:''}.`,label:'Excluir',onConfirm:()=>{m.resp.splice(i,1);closeDlg();render();toast('Responsabilidade excluída',()=>{m.resp.splice(i,0,r);render();});}});},
 mcNew:()=>mcPick(),mnAddCont:()=>mcPick(),mcF:v=>{S.mcType=v;reMn();},mcView:v=>mcView(+v),
 mcDel:v=>{const m=mnById(S.mini),i=+v,c=m.content[i];confirmDel({title:`Desvincular ${esc(c.t)}?`,body:'O conteúdo continua na biblioteca em Conteúdo, só deixa de aparecer neste ministério.',label:'Desvincular',onConfirm:()=>{m.content.splice(i,1);closeDlg();render();toast('Conteúdo desvinculado',()=>{m.content.splice(i,0,c);render();});}});},
 mcOpen:v=>{closeDlg();S.mini=null;A.nav(MC_PAGE[v]);}});
{const md=miniDetail;miniDetail=function(){const m=mnById(S.mini);if(m)mnNorm(m);return md();};}
{const t=A.mnTab;A.mnTab=v=>{if(v==='cont')S.mcType='all';t(v);};}

