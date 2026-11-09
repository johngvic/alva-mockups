/* ===== Escalas: UM componente para Agenda › Escalas, Kids › Escalas e a ficha do Ministério (Tiago, 08/11/2026) =====
 * "A experiência é a mesma em todo lugar": a lista (chips Todas / Aprovadas / Aguardando aceite / Em criação, busca, check-in de hoje)
 * e a ficha (respostas, datas, blocos, pessoas) são as mesmas nos três pontos de entrada. O app decide e acompanha:
 * Enviar, Aprovar, Marcar como aceito, Substituir e o check-in do dia. Montar a escala (datas, blocos, time, conteúdo) fica na web. */
const SCL_PS={ns:['off','Não enviado'],pe:['warning','Pendente'],re:['danger','Recusou'],ac:['ok','Aceitou'],pr:['ok','Presente'],au:['danger','Ausente']};
const SCL_ST={dr:['info','Em criação'],aw:['warning','Aguardando aceite'],ap:['ok','Aprovada']};
let _sclN=0;
S.scl={f:'todos',back:'',pick:''};
const sclWd=['dom','seg','ter','qua','qui','sex','sáb'];
const sclDate=iso=>sclWd[new Date(iso+'T12:00:00').getDay()]+', '+cuFmt(iso);
const sclMod=()=>S.gmod||'agenda';
const sclTel=n=>cuTel([...String(n)].reduce((a,c)=>a+c.charCodeAt(0),0)%40);
const sclPsT=p=>vsTag(SCL_PS[p.ps][0],SCL_PS[p.ps][1]);
function sclMk(o){const s=Object.assign({desc:''},o);s.dates=o.dates.map(([off,title,time,blocks])=>({id:'sd'+(++_sclN),date:cuISO(off),title,time,blocks:blocks.map(([lbl,team,ppl])=>({id:'sb'+(++_sclN),lbl,team,ppl:ppl.map(([n,role,ps,x])=>Object.assign({n,role,ps},x||{}))}))}));return s;}
const sclAll=s=>s.dates.flatMap(d=>d.blocks.flatMap(b=>b.ppl.map(p=>({p,d,b}))));
function sclCount(s){const a=sclAll(s).map(x=>x.p.ps);return {tot:a.length,ac:a.filter(x=>x==='ac'||x==='pr'||x==='au').length,pe:a.filter(x=>x==='pe').length,re:a.filter(x=>x==='re').length,ns:a.filter(x=>x==='ns').length};}
function sclSit(d){const l=d.blocks.flatMap(b=>b.ppl);if(!l.length)return ['off','Sem ninguém'];if(d.date<cuToday())return ['off','Já aconteceu'];if(l.some(p=>p.ps==='re'))return ['danger','Precisa de ação'];if(l.some(p=>p.ps==='pe'||p.ps==='ns'))return ['warning','Aguardando respostas'];return ['ok','Tudo aceito'];}
const sclStarted=d=>d.date<cuToday()||(d.date===cuToday()&&d.time<=new Date().toTimeString().slice(0,5));
/* escalas de demonstração (as datas andam junto com o dia de hoje) */
const SCL=[
 sclMk({id:'sc1',n:'Escala Kids — Novembro',min:'Infantil',st:'aw',dates:[
  [7,'Culto Kids','09:00',[['Manhã','Berçário — Domingo manhã',[['Cláudia Ferraz','Líder da sala','ac'],['Patrícia Lima','Apoio','pe']]],['Manhã','Maternal — Domingo manhã',[['Mônica Souza','Monitora','ac'],['Giovanna Martins','Monitora','pe']]]]],
  [14,'Culto Kids','09:00',[['Manhã','Berçário — Domingo manhã',[['Cláudia Ferraz','Líder da sala','ac'],['Patrícia Lima','Apoio','pe']]],['Manhã','Kids A — Domingo manhã',[['Henrique Costa','Líder da sala','ac']]]]],
  [21,'Culto Kids','09:00',[['Manhã','Berçário — Domingo manhã',[['Cláudia Ferraz','Líder da sala','pe']]],['Manhã','Kids A — Domingo manhã',[['Giovanna Martins','Monitora','pe']]]]]]}),
 sclMk({id:'sc2',n:'Escala Kids — Início de novembro',min:'Infantil',st:'ap',dates:[
  [-7,'Culto Kids','09:00',[['Manhã','Berçário — Domingo manhã',[['Cláudia Ferraz','Líder da sala','pr'],['Patrícia Lima','Apoio','au']]],['Manhã','Maternal — Domingo manhã',[['Mônica Souza','Monitora','pr']]]]],
  [0,'Culto Kids','09:00',[['Manhã','Berçário — Domingo manhã',[['Cláudia Ferraz','Líder da sala','ac'],['Patrícia Lima','Apoio','ac']]],['Manhã','Maternal — Domingo manhã',[['Mônica Souza','Monitora','ac'],['Giovanna Martins','Monitora','ac']]]]]]}),
 sclMk({id:'sc3',n:'Escala Louvor — Novembro',min:'Louvor',st:'aw',dates:[
  [7,'Culto de Celebração','18:30',[['Noite','Banda',[['Davi Melo','Violão e voz','ac'],['Diego Faria','Bateria','re']]],['Noite','Vocal',[['Ana Costa','Vocal','ac'],['Bia Melo','Vocal','ac']]],['Noite','Técnica',[['Rafael Pereira','Som','pe']]]]],
  [14,'Culto de Celebração','18:30',[['Noite','Banda',[['Davi Melo','Violão e voz','ac'],['Diego Faria','Bateria','pe']]],['Noite','Vocal',[['Ana Costa','Vocal','ac']]]]]]}),
 sclMk({id:'sc4',n:'Escala Cafeteria — Novembro',min:'Cafeteria',st:'dr',dates:[
  [7,'Culto de Celebração','10:00',[['Manhã','Balcão',[['Juliana Reis','Barista','ns'],['Célia Nunes','Atendimento','ns']]]]],
  [14,'Culto de Celebração','10:00',[['Manhã','Balcão',[['Juliana Reis','Barista','ns'],['Célia Nunes','Atendimento','ns']]]]]]}),
 sclMk({id:'sc5',n:'Escala Kids — Dezembro',min:'Infantil',st:'dr',dates:[
  [28,'Culto Kids','09:00',[['Manhã','Berçário — Domingo manhã',[['Cláudia Ferraz','Líder da sala','ns'],['Patrícia Lima','Apoio','ns']]]]],
  [35,'Culto Kids','09:00',[['Manhã','Berçário — Domingo manhã',[]]]]]})
];
SCL.forEach(s=>{Object.defineProperties(s,{
 s:{get(){const c=sclCount(s);return 'Ministério de '+s.min+' · '+(c.tot?c.ac+' de '+c.tot+' aceitaram':'Ninguém escalado');},enumerable:true},
 d:{get(){return [];},enumerable:true}});});
const sclRows=min=>SCL.filter(s=>!min||s.min===min);
function sclRow(s){const c=sclCount(s),ds=s.dates.map(d=>d.date).sort(),nx=ds.find(x=>x>=cuToday()),ref=nx||ds[ds.length-1];
 return `<button class="vr tap" data-q="${esc(s.n+' '+s.min)}" data-a="sclOpen" data-v="${s.id}|"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(s.n)}</span><span class="vs">Ministério de ${esc(s.min)} · ${s.dates.length} ${s.dates.length===1?'data':'datas'}${ref?' · '+(nx?'próxima ':'última ')+cuFmt(ref):''} · ${c.tot?c.ac+' de '+c.tot+' aceitaram':'Ninguém escalado'}</span></span>${vsTag(SCL_ST[s.st][0],SCL_ST[s.st][1])}</button>`;}
/* lista (a mesma em Agenda, Kids e ficha do ministério) */
function sclBody(min){const all=sclRows(min),f=S.scl.f,l=all.filter(s=>f==='todos'||s.st===f),n=k=>all.filter(s=>k==='todos'||s.st===k).length;
 const hoje=all.filter(s=>s.st==='ap').flatMap(s=>s.dates.filter(d=>d.date===cuToday()).map(d=>({s,d})));
 return (hoje.length?`<div class="stack g2"><p class="eb2">Check-in de hoje</p><div class="vl">${hoje.map(({s,d})=>{const l2=d.blocks.flatMap(b=>b.ppl),pr=l2.filter(p=>p.ps==='pr').length,au=l2.filter(p=>p.ps==='au').length;return `<button class="vr tap" data-a="sclOpen" data-v="${s.id}|"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(s.n)}</span><span class="vs">${esc(d.title)} · ${pr} ${pr===1?'presente':'presentes'} · ${au} ${au===1?'ausente':'ausentes'} · ${l2.length-pr-au} sem registro</span></span></button>`;}).join('')}</div></div>`:'')
  +vsChips('sclF',f,[['todos','Todas',n('todos')],['ap','Aprovadas',n('ap')],['aw','Aguardando aceite',n('aw')],['dr','Em criação',n('dr')]])
  +(all.length?fndBox('sclL','Buscar escala')+`<div class="vl" id="sclL">${l.map(sclRow).join('')||vsEmpty('Nenhuma escala aqui','Troque o filtro para ver outras.')}</div>`:vsEmpty('Nenhuma escala','As escalas são criadas na web.'));}
/* ficha da escala */
function sclSheet(id,back){const s=SCL.find(x=>x.id===id);if(!s)return;if(back!=null)S.scl.back=back;
 const c=sclCount(s),mod=sclMod(),ed=can(mod,'editar'),ad=can(mod,'aprovar');
 const why=s.st==='aw'?(c.re?'Há '+c.re+(c.re===1?' recusa':' recusas')+' para resolver (substitua a pessoa).':c.pe?'Faltam '+c.pe+(c.pe===1?' resposta':' respostas')+'.':''):'';
 const prim=s.st==='dr'?(ed?(c.tot?`<button class="btn primary md block" data-a="sclSend" data-v="${id}">Enviar para os escalados</button>`:'<p class="callout">Ninguém foi escalado ainda. A montagem fica na web.</p>'):''):s.st==='aw'?(ad?`<button class="btn primary md block" data-a="sclApprove" data-v="${id}"${why?' disabled':''}>Aprovar escala</button>${why?`<p class="vs">${why}</p>`:''}`:''):'';
 const bar=c.tot?`<div class="row g2" style="flex-wrap:wrap">${vsTag('ok',c.ac+' aceitaram')}${c.pe?vsTag('warning',c.pe+(c.pe===1?' pendente':' pendentes')):''}${c.re?vsTag('danger',c.re+(c.re===1?' recusou':' recusaram')):''}${c.ns?vsTag('off',c.ns+' não enviados'):''}</div>`:'';
 const dates=s.dates.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(d=>{const sit=sclSit(d);
  return `<div class="stack g2"><div class="row between" style="align-items:center;gap:8px"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${sclDate(d.date)} · ${d.time}</span><span class="vs">${esc(d.title)}</span></span>${vsTag(sit[0],sit[1])}</div>${d.blocks.map(b=>`<div class="stack g2"><p class="vs" style="font-weight:600">${esc(b.lbl)}${b.team?' · '+esc(b.team):''}</p><div class="vl">${b.ppl.map(p=>`<button class="vr tap" data-q="${esc(p.n)}" data-a="sclPerson" data-v="${id}|${d.id}|${b.id}|${esc(p.n)}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(p.n)}</span><span class="vs">${esc(p.role)}${p.sub?' · no lugar de '+esc(p.sub):''}</span></span>${sclPsT(p)}</button>`).join('')||'<p class="vs">Ninguém neste bloco.</p>'}</div></div>`).join('')}</div>`;}).join('');
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(s.n)}</h3><span class="vs">Ministério de ${esc(s.min)}</span>${vsTag(SCL_ST[s.st][0],SCL_ST[s.st][1])}</div>
  ${bar}${prim}
  ${c.tot?fndBox('sclPl','Buscar pessoa'):''}<div class="stack g4" id="sclPl">${dates||vsEmpty('Nenhuma data ainda','Escolha o culto ou evento na web.')}</div>
  <button class="tlink" data-a="sclBack">${S.scl.back?'Voltar':'Fechar'}</button></div>`);}
const sclAsk=(title,msg,yes,fn)=>sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${title}</h3><p class="callout">${msg}</p></div><div class="stack g3"><button class="btn primary md block" id="scY">${yes}</button><button class="tlink" id="scN">Voltar</button></div></div>`,sh=>{$('#scY',sh).addEventListener('click',fn);$('#scN',sh).addEventListener('click',()=>{sclSheet(S.scl.cur);});});
/* ficha da pessoa dentro da escala */
function sclPerson(sid,did,bid,name){const s=SCL.find(x=>x.id===sid),d=s.dates.find(x=>x.id===did),b=d.blocks.find(x=>x.id===bid),p=b.ppl.find(x=>x.n===name);if(!p)return;S.scl.cur=sid;
 const ed=can(sclMod(),'editar'),tel=sclTel(p.n).replace(/\D/g,''),fut=d.date>=cuToday(),started=sclStarted(d);
 const btns=[];
 if(ed&&s.st==='aw'&&p.ps==='pe')btns.push(`<button class="btn primary md block" data-a="sclAccept" data-v="${sid}|${did}|${bid}|${esc(name)}">Marcar como aceito</button>`);
 if(ed&&s.st==='ap'&&d.date<=cuToday()&&['ac','pr','au'].includes(p.ps)){
  if(p.ps!=='pr')btns.push(`<button class="btn primary md block" data-a="sclMark" data-v="${sid}|${did}|${bid}|${esc(name)}|pr">Marcar presente</button>`);
  if(p.ps!=='au')btns.push(started?`<button class="btn outline md block" data-a="sclMark" data-v="${sid}|${did}|${bid}|${esc(name)}|au">Marcar ausente</button>`:'<p class="vs">A ausência só pode ser marcada depois do início.</p>');
  if(p.ps!=='ac')btns.push(`<button class="btn outline md block" data-a="sclMark" data-v="${sid}|${did}|${bid}|${esc(name)}|ac">Desfazer</button>`);}
 if(ed&&fut&&['pe','re','ac','ns'].includes(p.ps))btns.push(`<button class="btn outline md block" data-a="sclSwap" data-v="${sid}|${did}|${bid}|${esc(name)}">Substituir</button>`);
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(p.n)}</h3><span class="vs">${esc(p.role)} · ${esc(b.lbl)}${b.team?' · '+esc(b.team):''} · ${sclDate(d.date)} · ${d.time}</span>${sclPsT(p)}</div>
  ${p.ps==='re'?'<p class="callout">Recusou o convite. Substitua a pessoa para a escala poder ser aprovada.</p>':''}
  <div class="row g3"><a class="btn outline md grow" href="tel:+55${tel}">Ligar</a><a class="btn outline md grow" href="https://wa.me/55${tel}" target="_blank" rel="noopener">WhatsApp</a></div>
  <div class="stack g3">${btns.join('')}<button class="tlink" data-a="sclRe" data-v="${sid}">Voltar à escala</button></div></div>`);}
/* substituir: quem sai, quem entra, motivo opcional em texto livre */
function sclSwapSheet(sid,did,bid,name){const s=SCL.find(x=>x.id===sid),d=s.dates.find(x=>x.id===did),b=d.blocks.find(x=>x.id===bid),p=b.ppl.find(x=>x.n===name);if(!p)return;S.scl.pick='';
 const pool=dvgInt().filter(n=>n!==name&&!b.ppl.some(x=>x.n===n));
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Substituir ${esc(name.split(' ')[0])}</h3><p class="callout">${esc(p.role)} · ${esc(b.lbl)} · ${sclDate(d.date)}. ${s.st==='dr'?'Quem entra ainda não recebeu o pedido.':esc(name.split(' ')[0])+' é avisado(a) de que não precisa mais servir, e quem entra recebe o convite.'}</p></div>
  ${fndBox('sclSw','Buscar pelo nome')}<div class="vl" id="sclSw">${pool.map(n=>`<button class="vr tap" data-q="${esc(n)}" data-pick="${esc(n)}" aria-pressed="false"><span class="grow vn">${esc(n)}</span></button>`).join('')||vsEmpty('Ninguém disponível','Todos os membros integrados já estão neste bloco.')}</div>
  ${field({id:'scWy',label:'Motivo (opcional)',area:true,ph:'Ex.: imprevisto de saúde',max:200})}
  <div class="otpmsg" id="scEr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="scGo">Substituir</button><button type="button" class="tlink" id="scBk">Voltar</button></div></div>`,sh=>{
  sh.querySelectorAll('[data-pick]').forEach(bt=>bt.addEventListener('click',()=>{S.scl.pick=bt.getAttribute('data-pick');sh.querySelectorAll('[data-pick]').forEach(x=>x.setAttribute('aria-pressed',String(x===bt)));$('#scEr',sh).textContent='';}));
  $('#scBk',sh).addEventListener('click',()=>sclPerson(sid,did,bid,name));
  $('#scGo',sh).addEventListener('click',()=>{if(!S.scl.pick){$('#scEr',sh).textContent='Escolha quem entra no lugar.';return;}sclSwapDo(sid,did,bid,name,S.scl.pick,cuVal(sh,'scWy'));});});}
function sclSwapDo(sid,did,bid,name,nw,why){const s=SCL.find(x=>x.id===sid),b=s.dates.find(x=>x.id===did).blocks.find(x=>x.id===bid),i=b.ppl.findIndex(x=>x.n===name);if(i<0||b.ppl.some(x=>x.n===nw))return 'Essa pessoa já está no bloco.';
 const old=b.ppl[i];b.ppl[i]={n:nw,role:old.role,ps:s.st==='dr'?'ns':'pe',sub:name,why:why||''};
 closeSheet().then(()=>{softRender();toast('success','Substituição feita',s.st==='dr'?nw.split(' ')[0]+' entra no lugar de '+name.split(' ')[0]:nw.split(' ')[0]+' recebeu o convite');sclSheet(sid);});return null;}
function sclSendDo(s){sclAll(s).forEach(x=>{if(x.p.ps==='ns')x.p.ps='pe';});s.st='aw';}
const sclApprovable=s=>{const c=sclCount(s);return c.tot>0&&!c.pe&&!c.re&&!c.ns;};
Object.assign(A,{
 sclF:v=>{S.scl.f=v;softRender();},
 sclOpen:v=>{const [id,back]=v.split('|');S.scl.cur=id;sclSheet(id,back||'');},
 sclRe:id=>sclSheet(id),
 sclBack:()=>{const b=S.scl.back;if(b&&b.startsWith('min:'))A.lsOpen(b.slice(4));else closeSheet();},
 sclPerson:v=>{const [sid,did,bid,n]=v.split('|');sclPerson(sid,did,bid,n);},
 sclSend:id=>{const s=SCL.find(x=>x.id===id),c=sclCount(s),vz=s.dates.reduce((a,d)=>a+d.blocks.filter(b=>!b.ppl.length).length,0);
  sclAsk('Enviar para os escalados?',c.tot+(c.tot===1?' pessoa recebe':' pessoas recebem')+' o pedido de aceite no app.'+(vz?' '+vz+(vz===1?' bloco está':' blocos estão')+' sem ninguém.':''),'Enviar',()=>{sclSendDo(s);closeSheet().then(()=>{softRender();toast('success','Pedidos enviados',c.tot+(c.tot===1?' pessoa convidada':' pessoas convidadas'));sclSheet(id);});});},
 sclApprove:id=>{const s=SCL.find(x=>x.id===id);if(!sclApprovable(s))return;sclAsk('Aprovar a escala?','Todos aceitaram. A escala de '+esc(s.min)+' fica aprovada e entra no check-in do dia.','Aprovar',()=>{s.st='ap';closeSheet().then(()=>{softRender();toast('success','Escala aprovada',s.n);sclSheet(id);});});},
 sclAccept:v=>{const [sid,did,bid,n]=v.split('|'),s=SCL.find(x=>x.id===sid),p=s.dates.find(x=>x.id===did).blocks.find(x=>x.id===bid).ppl.find(x=>x.n===n);if(!p||p.ps!=='pe')return;p.ps='ac';softRender();toast('success','Marcado como aceito',n.split(' ')[0]);sclSheet(sid);},
 sclMark:v=>{const [sid,did,bid,n,ps]=v.split('|'),s=SCL.find(x=>x.id===sid),p=s.dates.find(x=>x.id===did).blocks.find(x=>x.id===bid).ppl.find(x=>x.n===n);if(!p)return;p.ps=ps;softRender();toast('success',ps==='pr'?'Presença marcada':ps==='au'?'Ausência marcada':'Registro desfeito',n.split(' ')[0]);sclSheet(sid);},
 sclSwap:v=>{const [sid,did,bid,n]=v.split('|');sclSwapSheet(sid,did,bid,n);}
});
/* a ficha do ministério lista as escalas dele, com a mesma linha da lista */
function sclMinBlock(r){const l=SCL.filter(s=>s.min===r.n);if(!l.length)return '';
 return `<div class="stack g2"><p class="eb2">Escalas</p><div class="vl">${l.map(s=>sclRow(s).replace('data-v="'+s.id+'|"','data-v="'+s.id+'|min:'+r.id+'"')).join('')}</div></div>`;}
/* as seções */
Object.assign(LSD.agenda['Escalas'],{noun:'escalas',ST:{ap:['ok','Aprovada'],aw:['warning','Aguardando aceite'],dr:['info','Em criação']},acts:[],rows:SCL,custom:()=>sclBody(null)});
delete LSD.agenda['Escalas'].add;delete LSD.agenda['Escalas'].fields;
LSD.kids['Escalas']={noun:'escalas',ST:LSD.agenda['Escalas'].ST,acts:[],rows:SCL,custom:()=>sclBody('Infantil')};
