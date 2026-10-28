/* ================= Agenda: eventos de cerimônia (Apresentação, Batismo, Consagração e Casamento) =================
   Cada um é um TIPO DE EVENTO com data própria, sem vínculo com um culto (pode cair no mesmo dia de um culto, em linhas separadas).
   Dentro do evento há a lista de bebês, pessoas ou casais, com a dinâmica que a apresentação já tinha: Aguardando, Confirmado, Realizada ou Recusado.
   O que foi realizado alimenta Secretaria › Atos (a Secretaria não duplica dado) e é lá que sai a certidão ou o certificado.
   Regra: só dá para confirmar ou adicionar gente enquanto o evento estiver Confirmado (nunca em Previsão). */
const CERT={
 'Apresentação':{k:'apresentacao',un:'bebê',pl:'bebês',tab:'Bebês',ic:'pacifier',add:'Adicionar bebê',srch:'Buscar bebê ou responsável'},
 'Batismo':{k:'batismo',un:'pessoa',pl:'pessoas',tab:'Batizandos',ic:'droplet',add:'Adicionar pessoa',srch:'Buscar pessoa'},
 'Consagração':{k:'consagracao',un:'pessoa',pl:'pessoas',tab:'Consagrandos',ic:'flame',add:'Adicionar pessoa',srch:'Buscar pessoa'},
 'Casamento':{k:'casamento',un:'casal',pl:'casais',tab:'Casais',ic:'heart',add:'Adicionar casal',srch:'Buscar noivo ou noiva'}};
const isCer=e=>!!CERT[e.type];
const evFromLbl=()=>({eventos:'Eventos',cultos:'Cultos',bebes:'Apresentações',batismos:'Batismos',consagracoes:'Consagrações',casamentos:'Casamentos',integracoes:'Integrações'})[S.evFrom]||'Calendário';
const CE_TODAY='2026-09-30';
let _cep=0;
const CEP=[]; /* pessoas (batismo, consagração) e casais (casamento) dos eventos; a apresentação continua em BBP */
const CEP_=(ev,ppl,st,extra)=>Object.assign({id:'cp'+(++_cep),ev,ppl,st,at:CE_TODAY,why:'',obs:''},extra||{});
const ceLog=(a,x,det)=>LOG.unshift({u:'Rafael Pereira',a,e:'Evento de cerimônia',x,det:det||'',d:CE_TODAY,t:new Date().toTimeString().slice(0,5)});

/* apresentação: cada evento do tipo tem uma configuração de vagas (BBD), criada na primeira vez que é usada */
const bbDOf=e=>{let d=BBD.find(x=>x.ev===e.id);if(!d&&e.type==='Apresentação'){d={id:'bd'+(++_cep)+'x',ev:e.id,vagas:e.cap||BBR.vagas,st:'aberta'};BBD.push(d);}return d||null;};
const ceList=e=>e.type==='Apresentação'?BBP.filter(p=>p.d===(bbDOf(e)||{}).id):CEP.filter(x=>x.ev===e.id);
const ceCapOf=e=>e.type==='Apresentação'?((bbDOf(e)||{}).vagas||0):(e.cap||0); /* 0 = sem limite */
const ceUsed=e=>ceList(e).filter(x=>['confirmado','aguardando','realizada'].includes(x.st)).length;
const ceNames=x=>x.bebe?[x.bebe]:x.ppl;
const ceMem=n=>MEMBERS.find(m=>m.n===n&&m.st==='integrado');

function ceBadge(e){
 const T=CERT[e.type],it=ceList(e),cap=ceCapOf(e),used=ceUsed(e),aw=it.filter(x=>x.st==='aguardando').length;
 return `<span class="eib"><b>${used}${cap?`<span class="soft">/${cap}</span>`:''}</b> ${used===1?T.un:T.pl}${cap?`<span class="tr"><i style="width:${Math.min(100,used/cap*100)}%"></i></span>`:''}</span><span class="eip">${aw?`<b class="bd-aw">${aw} aguardando</b>`:used?'Tudo confirmado':'Sem pedidos'}</span>`;
}
function ceKpis(e){
 const T=CERT[e.type],it=ceList(e),c=k=>it.filter(x=>x.st===k).length,cap=ceCapOf(e),used=ceUsed(e);
 return `<div class="ikpi hk"><div><b>${used}${cap?`<small class="kof">/${cap}</small>`:''}</b><span>${cap?'Vagas ocupadas':T.tab}</span></div><div><b>${c('aguardando')}</b><span>Aguardando</span></div><div><b>${c('confirmado')}</b><span>Confirmados</span></div><div><b>${c('realizada')}</b><span>Realizados</span></div></div>`;
}

/* ---------- aba da lista (bebês, batizandos, consagrandos ou casais) ---------- */
function ceRow(x,e){
 const T=CERT[e.type],names=ceNames(x),cas=e.type==='Casamento',ms=names.map(ceMem),ov=false;
 const sub=cas?(ms.every(Boolean)?'Os dois são membros':ms.some(Boolean)?'Um deles não tem ficha':'Sem ficha na igreja'):(ms[0]?'Membro'+(e.type==='Batismo'&&ms[0].bap?' · já consta como batizado(a)':''):'Sem ficha na igreja');
 const act=x.st==='aguardando'?`<button class="btn pri sm" data-a="ceOk" data-v="${x.id}">Confirmar</button>`:x.st==='confirmado'&&(past(e)||e.d===CKDAY)?`<button class="btn sec sm" data-a="ceDone" data-v="${x.id}">Marcar realizado</button>`:'';
 return `<div class="trow bb" tabindex="0" data-a="ceOpen" data-v="${x.id}">
   <span class="tn"><span class="ce-av">${names.map(n=>sxAv(n)).join('')}</span><span class="hn"><b>${names.map(esc).join(cas?' & ':'')}</b><span>${sub}</span></span></span>
   <span class="bb-pa">${x.obs?esc(x.obs):`Pedido em ${dBR(x.at)}`}</span><span class="bb-cu"></span>
   <span class="ts">${bbPill(x.st)}${x.st==='realizada'?`<span class="bb-cs ok">${ic('check',11,2.4)}Em Secretaria › Atos</span>`:''}</span>
   <span class="bb-ac">${act}${ic('chevR',16)}</span></div>`;
}
function cerTab(e){
 const T=CERT[e.type],items=ceList(e),q=norm(S.bbq),c=k=>items.filter(x=>x.st===k).length,cap=ceCapOf(e),used=ceUsed(e),free=cap?cap-used:Infinity,full=!!cap&&free<=0,pst=past(e);
 if(e.st==='previsao')return `<section class="card pc rise"><div class="soft-empty"><p>Ainda é uma previsão.</p><span class="who">Só dá para receber, adicionar e confirmar ${T.pl} depois que a data do evento for confirmada.</span><button class="btn pri" data-a="evConfirm" data-v="${e.id}">Confirmar data</button></div></section>`;
 const why=pst?`Esta data já aconteceu e não recebe novos ${T.pl}.`:full?'Vagas esgotadas. Aumente as vagas para adicionar mais.':cap?`${free} ${free===1?'vaga livre':'vagas livres'}.`:'Sem limite de vagas.';
 const l=items.filter(x=>(S.bbf==='todos'||x.st===S.bbf)&&(!q||norm(ceNames(x).join(' ')+' '+(x.pais||[]).join(' ')).includes(q))).sort((a,b)=>a.at<b.at?-1:1);
 const act=items.filter(x=>x.st!=='recusado');
 const apres=e.type==='Apresentação';
 return `${cap?`<section class="card bb-sr rise" style="--d:1"><div class="bb-seats">${Array.from({length:Math.min(cap,40)},(_,i)=>{const p=act[i];return `<i class="${p?p.st:''}" title="${p?esc(ceNames(p).join(' e ')):'Vaga livre'}">${p?ic(T.ic,12,2):''}</i>`;}).join('')}</div><span class="who">${why}</span></section>`:''}
 <section class="card mtab rise" style="--d:2"><div class="tbar"><span class="who" style="margin-right:auto"><b style="color:var(--ink)">${used}</b>${cap?` de ${cap} vagas`:` ${used===1?T.un:T.pl}`}${cap?'':` · ${why}`}</span>
   ${apres?`<button class="btn sec sm" data-a="bbRules">${ic('sliders',14)}Regras</button>`:''}<button class="btn sec sm" data-a="ceCap" data-v="${e.id}">${ic('sliders',14)}Vagas</button><button class="btn pri sm" data-a="ceAdd" data-v="${e.id}" ${full||pst?'disabled':''} title="${esc(why)}">${ic('plus',14,2.2)}${T.add}</button></div>
  <div class="tbar"><label class="sbox">${ic('search',16)}<input id="bbq" placeholder="${T.srch}" value="${esc(S.bbq)}" autocomplete="off"></label>
   <div class="chips">${[['todos','Todos',items.length],['aguardando','Aguardando',c('aguardando')],['confirmado','Confirmados',c('confirmado')],['realizada','Realizados',c('realizada')],['recusado','Recusados',c('recusado')]].map(x=>`<button class="chipf ${S.bbf===x[0]?'on':''}" data-a="bbF" data-v="${x[0]}">${x[0]!=='todos'?`<i style="background:${BBST[x[0]][1]}"></i>`:''}${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow bb thead"><span>${apres?'Bebê':e.type==='Casamento'?'Casal':'Pessoa'}</span><span>${apres?'Responsáveis':'Pedido'}</span><span></span><span>Status</span><span></span></div>${l.map(x=>apres?bbRow(x):ceRow(x,e)).join('')}`
  :`<div class="mempty"><p>${items.length?'Nada neste filtro.':`Nenhum${T.un==='casal'?'':'a'} ${T.un} ainda.`}</p><span>${items.length?'Tente outro filtro ou outra busca.':pst?'':apres?'Os pedidos chegam pelo app. Você também pode adicionar um bebê aqui.':`Use “${T.add}” para incluir e confirmar.`}</span></div>`}
  <div class="tfoot"><span>${l.length} ${l.length===1?T.un:T.pl}</span><span class="who">${why}</span></div></section>`;
}

/* ---------- aba Detalhes das cerimônias ---------- */
function cerDet(e){
 const T=CERT[e.type],base=`<div class="pgrid"><div class="col"><section class="card pc evi"><div class="sh"><h2>Informações</h2><button class="btn sec sm" data-a="evEdit">${ic('pen',14)}Editar</button></div><div class="evi-g">${evInfoRows(e)}</div></section></div>`;
 if(e.st==='previsao')return base+`<div class="col"><section class="card pc"><div class="soft-empty"><p>Ainda é uma previsão.</p><span class="who">A lista de ${T.pl} abre quando a data for confirmada.</span><button class="btn pri" data-a="evConfirm" data-v="${e.id}">Confirmar data</button></div></section></div></div>`;
 const how={
  'Apresentação':['As famílias pedem pelo app e a secretaria confirma. Pelo menos um responsável precisa ser membro ativo, e o bebê precisa estar dentro da idade da regra.','Depois de realizada, a apresentação vira ato em Secretaria, onde o certificado é emitido.'],
  'Batismo':['A secretaria adiciona quem vai ser batizado e confirma cada pessoa.','Quem for marcado como realizado passa a constar como batizado na ficha e vira ato em Secretaria, onde sai a certidão.'],
  'Consagração':['A secretaria adiciona quem vai ser consagrado e confirma cada pessoa.','Depois de realizada, a consagração vira ato em Secretaria, onde sai o certificado.'],
  'Casamento':['Cada casal é adicionado na lista. Pode haver vários casais na mesma data, como num casamento coletivo.','Cada casal realizado vira um ato em Secretaria, onde sai a certidão de casamento.']}[e.type];
 return base+`<div class="col"><section class="card pc"><div class="sh"><h2>Como funciona</h2></div><ul class="ce-how">${how.map(t=>`<li>${ic('check',14,2.4)}<span>${t}</span></li>`).join('')}<li>${ic('lock',14,2.2)}<span>Só dá para adicionar e confirmar ${T.pl} com o evento <b>Confirmado</b>, nunca em previsão.</span></li></ul>
  <div class="ce-go"><button class="btn sec" data-a="ceGoTab">${ic(T.ic,15)}Ver ${T.pl}</button>${e.type==='Apresentação'?`<button class="btn sec" data-a="bbRules">${ic('sliders',15)}Regras da apresentação</button>`:''}</div></section></div></div>`;
}
{const _d=evDet;evDet=function(e){return isCer(e)?cerDet(e):_d(e);};}
{const _a=agAfter;agAfter=function(){_a();bbAfter();};}
const ceSubForm=(F,capT)=>`<div class="evs-g evs-sub"><label class="fld"><span class="fl">Vagas <small>opcional</small></span><input data-k="cap" type="number" min="1" inputmode="numeric" value="${esc(F.cap)}" placeholder="${capT?`Até ${capT} lugares`:'Sem limite'}"></label>
 <p class="hint wide">${ic('info',13,2)} ${({'Apresentação':'Os pedidos das famílias chegam pelo app e a secretaria confirma. Sem vagas definidas, vale o padrão das Regras da apresentação.','Batismo':'A secretaria adiciona e confirma quem vai ser batizado, dentro do evento.','Consagração':'A secretaria adiciona e confirma quem vai ser consagrado, dentro do evento.','Casamento':'Cada casal é adicionado dentro do evento. Pode haver vários casais na mesma data.'})[F.type]}</p></div>`;

/* ---------- ações ---------- */
const ceFind=id=>CEP.find(z=>z.id===id);
const cePersonField=(i,label,ms,def)=>sxF(label,sxSel('m'+i,[['__','Escolha o membro…'],['','Pessoa sem ficha na igreja'],...ms.map(m=>[m.id,m.n])],def||'__')+`<input name="x${i}" placeholder="Nome completo de quem não tem ficha" autocomplete="off" hidden style="margin-top:8px">`);
Object.assign(A,{
 ceGoTab:()=>{S.etab='cer';render();},
 ceAdd:v=>{const e=eById(v),T=CERT[e.type];
  if(e.type==='Apresentação'){A.bbAdd(bbDOf(e).id);return;}
  if(e.st!=='confirmado'){toast('Confirme a data do evento antes de adicionar '+T.pl+'.');return;}
  if(past(e)){toast('Este evento já aconteceu.');return;}
  const cap=ceCapOf(e);if(cap&&ceUsed(e)>=cap){toast('Sem vagas. Aumente as vagas para adicionar.');return;}
  const cas=e.type==='Casamento',ms=sxInteg().filter(m=>sxSitOf(m)==='ativo'&&(e.type!=='Batismo'||!m.bap));
  sxDlg(T.add,esc(e.t)+' · '+dBR(e.d)+(cap?' · '+(cap-ceUsed(e))+' vagas livres':''),
   (cas?cePersonField(1,'Noivo(a) 1',ms)+cePersonField(2,'Noivo(a) 2',ms):cePersonField(1,e.type==='Batismo'?'Quem vai ser batizado(a)':'Quem vai ser consagrado(a)',ms))
   +sxF('Observação <small>opcional</small>','<input name="obs" maxlength="120" autocomplete="off">',e.type==='Batismo'?'A lista só mostra quem ainda não consta como batizado(a).':''),sxOk(cas?'Adicionar casal':'Adicionar e confirmar'));
  const f=$('#sxF'),np=cas?2:1;
  for(let i=1;i<=np;i++){const s=f['m'+i];s.onchange=()=>{f['x'+i].hidden=s.value!=='';if(s.value==='')f['x'+i].focus();};}
  f.onsubmit=ev=>{ev.preventDefault();sxClr(f);const names=[];
   for(let i=1;i<=np;i++){const v=f['m'+i].value;if(v==='__')return sxErr(f,'m'+i,'Escolha a pessoa');if(v===''){const n=f['x'+i].value.trim();if(!n)return sxErr(f,'x'+i,'Informe o nome');names.push(n);}else names.push(byId(v).n);}
   if(cas&&norm(names[0])===norm(names[1]))return sxErr(f,'m2','Os dois noivos precisam ser pessoas diferentes');
   if(ceList(e).some(x=>x.st!=='recusado'&&x.ppl.some(n=>names.some(z=>norm(z)===norm(n)))))return sxErr(f,'m1','Já está na lista deste evento');
   if(cap&&ceUsed(e)>=cap)return sxErr(f,'m1','As vagas acabaram enquanto você preenchia');
   CEP.push(CEP_(e.id,names,'confirmado',{obs:f.obs.value.trim()}));ceLog('Adicionou',names.join(' & '),e.type+' · '+dBR(e.d));
   closeDlg();rerEv();toast(cas?'Casal adicionado e confirmado em '+dBR(e.d):names[0].split(' ')[0]+' adicionado(a) e confirmado(a) em '+dBR(e.d));};},
 ceCap:v=>{const e=eById(v);if(e.type==='Apresentação'){A.bbVagas(bbDOf(e).id);return;}const u=ceUsed(e);
  sxDlg('Vagas deste evento',esc(e.t)+' · '+dBR(e.d),sxF('Vagas <small>opcional</small>','<input type="number" name="n" min="'+Math.max(1,u)+'" max="500" value="'+(e.cap||'')+'" placeholder="Sem limite">','Deixe em branco para não limitar. Não pode ser menor que as '+u+' já ocupadas.'),sxOk('Salvar'));
  const f=$('#sxF');f.onsubmit=ev=>{ev.preventDefault();sxClr(f);const raw=f.n.value.trim(),n=raw?parseInt(raw,10):0;
   if(raw&&!(n>=Math.max(1,u)&&n<=500))return sxErr(f,'n','Use um número entre '+Math.max(1,u)+' e 500, ou deixe em branco');
   e.cap=n;closeDlg();rerEv();toast(n?'Vagas deste evento: '+n:'Sem limite de vagas');};},
 ceOk:v=>{const x=ceFind(v),e=eById(x.ev),T=CERT[e.type];if(e.st!=='confirmado'){toast('Confirme a data do evento antes de confirmar '+T.pl+'.');return;}
  x.st='confirmado';ceLog('Confirmou',ceNames(x).join(' & '),e.type+' · '+dBR(e.d));closeDlg();rerEv();toast((x.ppl.length>1?'Casal confirmado':ceNames(x)[0].split(' ')[0]+' confirmado(a)'),()=>{x.st='aguardando';rerEv();});},
 ceNo:v=>{const x=ceFind(v);sxDlg('Recusar o pedido',esc(ceNames(x).join(' e ')),sxF('Motivo','<input name="w" placeholder="Ex.: data cheia; vamos marcar no próximo evento" autocomplete="off">',eById(x.ev).type==='Batismo'?'A pessoa recebe o motivo por e-mail e no app.':'A pessoa recebe o motivo por e-mail.'),sxOk('Recusar pedido'));
  const f=$('#sxF');f.onsubmit=ev=>{ev.preventDefault();sxClr(f);if(!f.w.value.trim())return sxErr(f,'w','Informe o motivo');x.st='recusado';x.why=f.w.value.trim();closeDlg();rerEv();toast('Pedido recusado',()=>{x.st='aguardando';x.why='';rerEv();});};},
 ceDone:v=>{const x=ceFind(v),e=eById(x.ev);x.st='realizada';if(e.type==='Batismo')x.ppl.forEach(n=>{const m=ceMem(n);if(m)m.bap=true;});
  ceLog('Registrou',ceNames(x).join(' & '),e.type+' realizado');closeDlg();rerEv();toast('Registrado. Já aparece em Secretaria › Atos'+(e.type==='Batismo'?' e na ficha como batizado(a)':'')+'.');},
 ceCancel:v=>{const x=ceFind(v);confirmDel({title:'Cancelar '+(x.ppl.length>1?'o casal':'a participação')+'?',body:'Quem foi confirmado é avisado e a vaga volta a ficar livre.',label:'Cancelar participação',onConfirm:()=>{x.st='recusado';x.why='Cancelado pela secretaria';closeDlg();rerEv();toast('Participação cancelada',()=>{x.st='confirmado';x.why='';rerEv();});}});},
 ceOpen:(v,b,ev)=>{if(ev&&ev.target.closest('[data-a=ceOk],[data-a=ceDone]'))return;const x=ceFind(v),e=eById(x.ev),T=CERT[e.type],names=ceNames(x),cas=e.type==='Casamento';
  openDlg(`${dlgHead(cas?'Casal':e.type==='Batismo'?'Batismo':'Consagração',`${esc(e.t)} · ${dBR(e.d)}`)}
   <div class="bb-head"><span class="ce-av">${names.map(n=>sxAv(n)).join('')}</span><div class="dkt"><b>${names.map(esc).join(cas?' & ':'')}</b><span>${cas?'Casal':'Pessoa'} · pedido em ${dBR(x.at)}</span></div>${bbPill(x.st)}</div>
   <dl class="bb-dl"><div><dt>Evento</dt><dd>${esc(e.t)} · ${wd(e.d)}, ${dBR(e.d)} · ${e.time}</dd></div>${names.map(n=>{const m=ceMem(n);return `<div><dt>${cas?'Noivo(a)':'Pessoa'}</dt><dd>${esc(n)} ${m?`<span class="bb-mb">${ic('check',10,3)}membro</span>`:'<span class="who">sem ficha na igreja</span>'}</dd></div>`;}).join('')}${x.obs?`<div><dt>Observação</dt><dd>${esc(x.obs)}</dd></div>`:''}${x.why?`<div><dt>Motivo da recusa</dt><dd>${esc(x.why)}</dd></div>`:''}</dl>
   ${e.st!=='confirmado'?`<p class="lm-w bad" style="margin:12px 0 0">${ic('alert',14,2.2)}<span>O evento ainda não está confirmado. Só dá para confirmar ${T.pl} com o evento Confirmado.</span></p>`:''}
   <div class="dfoot bb-ft">${x.st==='aguardando'?`<button class="btn sec" data-a="ceNo" data-v="${x.id}">Recusar</button><button class="btn pri" data-a="ceOk" data-v="${x.id}" ${e.st!=='confirmado'?'disabled':''}>Confirmar</button>`:x.st==='confirmado'?`<button class="btn sec" data-a="ceCancel" data-v="${x.id}">Cancelar participação</button>${past(e)||e.d===CKDAY?`<button class="btn pri" data-a="ceDone" data-v="${x.id}">Marcar realizado</button>`:`<button class="btn pri" data-a="closeDlg">Fechar</button>`}`:x.st==='realizada'?`<button class="btn sec" data-a="closeDlg">Fechar</button><button class="btn pri" data-a="ceGoAtos">Abrir em Secretaria › Atos</button>`:`<button class="btn sec" data-a="closeDlg">Fechar</button>`}</div>`,'sm');},
 ceGoAtos:()=>{closeDlg();A.nav('sec-atos');}
});

/* ao clicar em Eventos no menu, o filtro de tipo volta para Todos */
{const _n=A.nav;A.nav=function(v){if(v==='eventos')S.etype='todos';S.bbq='';S.bbdf='prox';return _n.call(this,v);};}

/* ---------- submenus por tipo: Apresentações, Batismos, Consagrações e Casamentos ----------
   Mesma tela que a Apresentação já tinha: números no alto, lista de datas (Próximas, Realizadas, Todas) com vagas e pedidos, e a data abre o evento com a lista de pessoas.
   "Eventos" continua sendo a lista geral, onde dá para criar qualquer tipo. */
const CERPG={bebes:'Apresentação',batismos:'Batismo',consagracoes:'Consagração',casamentos:'Casamento'};
const EVLISTS=['eventos','cultos','integracoes',...Object.keys(CERPG)];
const CERPG_T={bebes:['Apresentações','Bebês apresentados ao Senhor, com a igreja reunida · <em class="bb-ref">Lucas 2:22</em>'],batismos:['Batismos','Pessoas que vão ser batizadas nas águas. Cada data é um evento, com a lista de quem será batizado.'],consagracoes:['Consagrações','Obreiros e líderes consagrados. Cada data é um evento, com a lista de quem será consagrado.'],casamentos:['Casamentos','Casais que vão se casar na igreja. Pode haver vários casais na mesma data.']};
const ceSt=e=>e.st==='previsao'?stpill('var(--ink-muted)','var(--surface-2)','Previsão'):past(e)?stpill('var(--ink-muted)','var(--surface-2)','Realizada'):(ceCapOf(e)&&ceUsed(e)>=ceCapOf(e))?stpill('var(--st-rec)','var(--st-rec-bg)','Esgotada'):stpill('var(--st-int)','var(--st-int-bg)','Aberta');
const CE_DOC={batismo:'Certidão de batismo',consagracao:'Certificado de consagração',casamento:'Certidão de casamento'};
/* quantos já aconteceram e ainda esperam a certidão ou o certificado da Secretaria */
const ceCertPend=type=>{const T=CERT[type];if(type==='Apresentação')return BBP.filter(p=>p.st==='realizada'&&!bbDoc(p)).length;
 const has=n=>{const m=ceMem(n);return !!m&&SX_DOCS.some(d=>d.mid===m.id&&d.t===CE_DOC[T.k]&&d.st==='valido');};
 return sxEvAtos().filter(a=>a.t===T.k).reduce((n,a)=>n+(a.t==='casamento'?(a.ppl.some(has)?0:1):a.ppl.filter(x=>!has(x)).length),0);};
const ceCapHead=type=>'Participação';
function cerPage(act){
 const type=CERPG[act],T=CERT[type],[title,lede]=CERPG_T[act],apres=type==='Apresentação';
 const evs=EVTS.filter(e=>e.type===type&&(e.d||e.st==='previsao')),q=norm(S.bbq),f=S.bbdf,isP=e=>e.st!=='previsao'&&past(e);
 const all=evs.flatMap(e=>ceList(e)),cnt=k=>all.filter(x=>x.st===k).length,done=cnt('realizada');
 const hit=e=>!q||norm(e.t+' '+ceList(e).map(x=>ceNames(x).join(' ')+' '+(x.pais||[]).join(' ')).join(' ')).includes(q);
 const nP=evs.filter(e=>!isP(e)).length;
 const l=evs.filter(e=>(f==='todas'||(f==='real'?isP(e):!isP(e)))&&hit(e)).sort((a,b)=>{const x=a.d||'9'+a.prev,y=b.d||'9'+b.prev;return f==='prox'?(x<y?-1:1):(x<y?1:-1);});
 const pend=ceCertPend(type);
 return `<header class="ph rise"><div><p class="eb">Agenda</p><h1>${title}</h1><p class="lede">${lede}</p></div>
  <div class="pact">${rpBtn('agenda','eventos')}${apres?`<button class="btn sec" data-a="bbRules">${ic('sliders',15)}Regras</button>`:''}<button class="btn pri" data-a="ceNew" data-v="${type}">${ic('plus',15,2.2)}Abrir data</button></div></header>
 <section class="card kpis4 rise" style="--d:1">
  <div class="k4"><span class="kl">Aguardando confirmação</span><span class="kv" style="color:var(--st-sol)">${cnt('aguardando')}</span><span class="kd">${apres?'pedidos de famílias':'pedidos para confirmar'}</span></div>
  <div class="k4"><span class="kl">Confirmados</span><span class="kv" style="color:var(--st-int)">${cnt('confirmado')}</span><span class="kd">nas próximas datas</span></div>
  <div class="k4"><span class="kl">${apres?'Certificados':'Certidões'} na secretaria</span><span class="kv" style="color:${pend?'var(--brand-text)':'inherit'}">${pend}</span><span class="kd">a emitir em Secretaria › Atos</span></div>
  <div class="k4"><span class="kl">${apres?'Apresentados':type==='Casamento'?'Casais casados':type==='Batismo'?'Batizados':'Consagrados'}</span><span class="kv">${done}</span><span class="kd">${apres?'bebês ao Senhor':'já realizados'}</span></div>
 </section>
 <section class="card mtab rise" style="--d:3"><div class="tbar"><label class="sbox">${ic('search',16)}<input id="bbq" placeholder="Buscar data, ${T.un} ou responsável" value="${esc(S.bbq)}" autocomplete="off"></label>
  <div class="chips">${[['prox','Próximas',nP],['real','Realizadas',evs.length-nP],['todas','Todas',evs.length]].map(x=>`<button class="chipf ${f===x[0]?'on':''}" data-a="ceDF" data-v="${x[0]}">${x[1]}<small>${x[2]}</small></button>`).join('')}</div></div>
  ${l.length?`<div class="trow bd thead"><span>Evento</span><span>${ceCapHead(type)}</span><span>Pedidos</span><span>Situação</span><span></span></div>${l.map(e=>{const it=ceList(e),n=k=>it.filter(x=>x.st===k).length,cap=ceCapOf(e),u=ceUsed(e),parts=[n('aguardando')?`<b class="bd-aw">${n('aguardando')} aguardando</b>`:'',n('confirmado')?`${n('confirmado')} ${n('confirmado')>1?'confirmados':'confirmado'}`:'',n('realizada')?`${n('realizada')} ${n('realizada')>1?'realizados':'realizado'}`:''].filter(Boolean);
   return `<div class="trow bd ${isP(e)?'off':''}" tabindex="0" data-a="evOpen" data-v="${e.id}">
   <span class="tn">${dTile(e)}<span class="hn"><b>${esc(e.t)}</b><span>${e.st==='previsao'?`Previsto para ${esc(e.prev)}`:`${wd(e.d)}, ${dBR(e.d)} · ${e.time}`}</span></span></span>
   <span class="bd-v">${e.st==='previsao'?`<button class="btn sec sm" data-a="evConfirm" data-v="${e.id}">Confirmar data</button>`:cap?`<span><b>${u}</b> de ${cap} vagas</span><span class="tr"><i style="width:${Math.min(100,u/cap*100)}%"></i></span>`:`<span><b>${u}</b> ${u===1?T.un:T.pl}</span>`}</span>
   <span class="bd-p">${parts.join(' · ')||'<span class="soft">Nenhum pedido</span>'}</span><span class="ts">${ceSt(e)}</span><span class="tc">${ic('chevR',16)}</span></div>`;}).join('')}`
  :`<div class="mempty"><p>${evs.length?'Nenhuma data por aqui.':'Nenhuma data aberta.'}</p><span>${q?'Nada corresponde à busca.':f==='prox'?'Use “Abrir data” para criar o evento.':'Troque o filtro para ver outras datas.'}</span></div>`}
  <div class="tfoot"><span>${l.length} ${l.length===1?'data':'datas'}</span><span class="who">${apres?'Pedidos chegam pelo app (Mais › Apresentações)':'A secretaria adiciona e confirma dentro de cada data'}</span></div></section>`;
}
Object.assign(A,{
 ceDF:v=>{S.bbdf=v;render();},
 ceNew:v=>evForm('evento',{type:v})
});

/* ---------- dados de demonstração ---------- */
(function ceSeed(){
 const push=o=>{const e=EV(o);EVTS.push(e);return e;};
 /* batismo de 18/10: antes era "Culto + Batismo", com uma inscrição solta */
 const bt=EVTS.find(x=>x.t==='Culto + Batismo');if(bt){Object.assign(bt,{t:'Batismo nas águas',regs:[],of:'Pr. Marcos Souza'});
  CEP.push(CEP_(bt.id,['Juliana Costa Ferreira'],'confirmado',{at:'2026-09-20'}),CEP_(bt.id,['Pedro Costa Ferreira'],'confirmado',{at:'2026-09-20'}),CEP_(bt.id,['Elisa Moura'],'aguardando',{at:'2026-09-28'}));}
 /* cerimônias que já aconteceram (viram atos em Secretaria) */
 const b0=push({t:'Batismo nas águas',type:'Batismo',d:'2026-06-14',time:'16h',place:'Chácara Alva',of:'Pr. Marcos Souza'});
 ['Ana Clara Lima','Helena Duarte','Larissa Pires'].forEach(n=>CEP.push(CEP_(b0.id,[n],'realizada',{at:'2026-06-01',obs:n==='Ana Clara Lima'?'Batismo nas águas, domingo à tarde.':''})));
 const c0=push({t:'Casamento coletivo',type:'Casamento',d:'2026-05-09',time:'11h',place:'Templo',of:'Pr. Marcos Souza'});
 CEP.push(CEP_(c0.id,['Thiago Barros','Renata Campos'],'realizada',{at:'2026-04-10'}),CEP_(c0.id,['Bruno Reis','Daniela Rocha'],'realizada',{at:'2026-04-12'}));
 const s0=push({t:'Consagração de diáconos',type:'Consagração',d:'2026-04-12',time:'10h',place:'Templo',of:'Pr. Marcos Souza'});
 CEP.push(CEP_(s0.id,['Larissa Pires'],'realizada',{at:'2026-03-20',obs:'Consagração ao diaconato.'}));
 /* quem vai ser batizado ainda não consta como batizado na ficha */
 ['Juliana Costa Ferreira','Pedro Costa Ferreira','Elisa Moura'].forEach(n=>{const m=ceMem(n);if(m)m.bap=false;});
 /* próximas */
 const s1=push({t:'Consagração de líderes',type:'Consagração',d:'2026-11-08',time:'10h',place:'Templo'});
 CEP.push(CEP_(s1.id,['Marina Costa'],'aguardando',{at:'2026-09-29'}),CEP_(s1.id,['Felipe Andrade'],'confirmado',{at:'2026-09-25'}));
 /* casamento: um coletivo (vários casais na mesma data) e um unitário, para mostrar como os casais entram */
 const c1=push({t:'Casamento coletivo',type:'Casamento',d:'2026-11-14',time:'11h',place:'Templo'});
 CEP.push(CEP_(c1.id,['Pedro Costa Ferreira','Helena Duarte'],'confirmado',{at:'2026-09-18'}),CEP_(c1.id,['Rafael Moreira','Camila Duarte'],'aguardando',{at:'2026-09-27',obs:'Nenhum dos dois tem ficha na igreja.'}),CEP_(c1.id,['Gustavo Nunes','Sofia Barros'],'aguardando',{at:'2026-09-29'}));
 const c2=push({t:'Casamento de Marcos e Beatriz',type:'Casamento',d:'2026-12-12',time:'16h',place:'Templo'});
 CEP.push(CEP_(c2.id,['Marcos Vinícius','Beatriz Almeida'],'confirmado',{at:'2026-09-22'}));
 /* previsão existe para todos os tipos: a data ainda não foi confirmada e a lista só abre depois */
 push({t:'Casamento coletivo 2027',type:'Casamento',st:'previsao',prev:'Mar/2027',d:''});
 push({t:'Batismo de verão',type:'Batismo',st:'previsao',prev:'Jan/2027',d:''});
 push({t:'Consagração de obreiros 2027',type:'Consagração',st:'previsao',prev:'Fev/2027',d:''});
 push({t:'Apresentação de bebês',type:'Apresentação',st:'previsao',prev:'Nov/2026',d:''});
 push({t:'Culto de Natal',type:'Culto',kind:'culto',st:'previsao',prev:'Dez/2026',d:'',min:'Louvor'});
 /* apresentações: agora são eventos do tipo Apresentação, com data própria (antes eram cultos com vagas) */
 [['bd0','2026-09-27'],['bd1','2026-10-04'],['bd2','2026-10-11']].forEach(([id,d])=>{const e=push({t:'Apresentação de bebês',type:'Apresentação',d,time:'10h',place:'Templo principal',of:'Pr. Marcos Souza'}),b=BBD.find(x=>x.id===id);b.ev=e.id;e.cap=b.vagas;});
})();
