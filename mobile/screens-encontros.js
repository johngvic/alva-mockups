/* ===== Encontros: UM componente para Discipulado, Acompanhamento, Casas e Redes (Tiago, 08/11/2026) =====
 * "Se é kernel para reuso, a experiência é a mesma em todo lugar": dentro da ficha, a lista Agendados / Realizados / Cancelados,
 * com Agendar, Registrar (a mesma tela da chamada), Concluir um agendado e Cancelar. Busca por nome onde há nomes (mesmo padrão em todas as listas).
 * Também traz a Comunidade do app: Casas de Apascentamento, Redes de casa e Ministérios. */
const MTG_MOD={disc:'cuidado',caso:'cuidado',casa:'comunidade',rede:'comunidade'};
const MTG_OWN={disc:id=>CU_DISC.find(x=>x.id===id),caso:id=>CU_CASES.find(x=>x.id===id),casa:id=>CM_CASAS.find(x=>x.id===id),rede:id=>CM_REDES.find(x=>x.id===id)};
let _mtgId=0;
S.mtg={f:'ag',cur:null};
/* busca na própria lista (linhas com data-q), igual em todo lugar */
const fndBox=(id,ph)=>`<div class="fbox" style="min-height:48px">${ic('search',20)}<input type="search" data-find="${id}" placeholder="${ph}" aria-label="${ph}" autocomplete="off"></div>`;
document.addEventListener('input',e=>{const t=e.target,id=t&&t.dataset&&t.dataset.find;if(!id)return;const box=document.getElementById(id);if(!box)return;const q=norm2(t.value);
 box.querySelectorAll('[data-q]').forEach(el=>{el.style.display=(!q||norm2(el.dataset.q).includes(q))?'':'none';});});

const mtgNeed=k=>k==='disc'||k==='caso';/* conteúdo tratado obrigatório */
const mtgList=r=>r.mtgs||(r.mtgs=[]);
const mtgMk=o=>Object.assign({id:'mt'+(++_mtgId),st:'ag',date:'',time:'19:00',mode:'Presencial',where:'',desc:'',content:'',att:null,inv:null,resp:null,why:''},o);
const mtgPpl=(k,r,m)=>k==='rede'?m.inv.slice():k==='casa'?r.ppl.map(p=>p.n):k==='disc'?[r.n,r.disc]:[r.who,r.resp||'Responsável'];
const mtgNext=r=>mtgList(r).filter(m=>m.st==='ag'&&m.date>=cuToday()).sort((a,b)=>a.date.localeCompare(b.date))[0]||null;
const mtgDone=r=>mtgList(r).filter(m=>m.st==='re');
const mtgLast=r=>{const l=mtgDone(r).map(m=>m.date).sort();return l.length?l[l.length-1]:'';};
const mtgPend=r=>mtgList(r).filter(m=>m.st==='ag'&&m.date<cuToday()).length;/* chamada pendente: o dia passou e ninguém fez a chamada */
const mtgNextRow=r=>{const n=mtgNext(r);return n?[['Próximo encontro',cuFmt(n.date)+' · '+n.time+' · '+n.mode]]:[];};
const mtgSummaryRows=r=>{const l=mtgLast(r),c=mtgDone(r).length;return [['Encontros',c?c+(c===1?' realizado':' realizados')+' · último '+cuFmt(l):'Nenhum ainda'],...mtgNextRow(r)];};
const mtgPct=r=>{const l=mtgDone(r).slice(-4);let p=0,t=0;l.forEach(m=>{Object.values(m.att||{}).forEach(a=>{t++;if(a.p)p++;});});return t?Math.round(p/t*100):null;};
function mtgTag(m){return m.st==='re'?vsTag('ok','Realizado'):m.st==='ca'?vsTag('off','Cancelado'):m.date<cuToday()?vsTag('warning','Chamada pendente'):vsTag('info','Agendado');}
function mtgRow(k,r,m){const pres=m.st==='re'&&m.att?Object.values(m.att).filter(a=>a.p).length+' de '+Object.keys(m.att).length+' presentes':'',w=m.where?(m.where.length>26?m.where.slice(0,26)+'…':m.where):'';
 return `<button class="vr tap" data-a="mtgOpen" data-v="${k}|${r.id}|${m.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${cuFmt(m.date)} · ${m.time}</span><span class="vs">${esc([m.mode+(w?' · '+w:''),pres].filter(Boolean).join(' · '))}</span></span>${mtgTag(m)}</button>`;}
/* o bloco que entra na ficha */
function mtgBlock(k,r){const ed=can(MTG_MOD[k],'editar'),f=S.mtg.f,l=mtgList(r),n=s=>l.filter(m=>m.st===s).length;S.mtg.cur={k,id:r.id};
 const list=l.filter(m=>m.st===f).sort((a,b)=>f==='ag'?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
 return `<div class="stack g3"><p class="eb2">Encontros</p>${ed?`<div class="row g3"><button class="btn primary md grow" data-a="mtgSched" data-v="${k}|${r.id}">Agendar</button><button class="btn outline md grow" data-a="mtgReg" data-v="${k}|${r.id}">Registrar</button></div>`:''}
  ${vsChips('mtgF',f,[['ag','Agendados',n('ag')],['re','Realizados',n('re')],['ca','Cancelados',n('ca')]])}
  ${list.length?`<div class="vl">${list.map(m=>mtgRow(k,r,m)).join('')}</div>`:vsEmpty('Nenhum encontro '+({ag:'agendado',re:'realizado',ca:'cancelado'})[f],f==='ag'?'Use Agendar para marcar o próximo.':'')}</div>`;}

/* ---------- regras (testáveis) ---------- */
function mtgSchedSave(k,r,o){if(!o.date||o.date<cuToday())return 'Escolha uma data a partir de hoje.';if(!o.time)return 'Informe a hora.';if(!o.mode)return 'Escolha presencial ou remoto.';
 if(o.mode==='Remoto'&&!/^https?:\/\//.test(o.where||''))return 'Informe o link da reunião (começa com http).';
 if(k==='rede'&&!(o.inv&&o.inv.length))return 'Escolha quem é convocado.';
 if(mtgList(r).some(m=>m.st!=='ca'&&m.date===o.date&&m.time===o.time))return 'Já existe um encontro nesse dia e hora.';
 const m=mtgMk({st:'ag',date:o.date,time:o.time,mode:o.mode,where:o.where||'',desc:o.desc||'',inv:k==='rede'?o.inv.slice():null});
 if(k==='rede'){m.resp={};m.inv.forEach(n=>{m.resp[n]={s:'sr'};});}mtgList(r).push(m);return null;}
function mtgSave(k,r,o){/* registrar um encontro que já aconteceu ou concluir um agendado: a mesma tela, com a chamada */
 const m=o.mid?mtgList(r).find(x=>x.id===o.mid):null,names=m?mtgPpl(k,r,m):(o.names||mtgPpl(k,r,{inv:o.names||[]}));
 if(!m&&(!o.date||o.date>cuToday()))return 'A data não pode ser futura.';
 if(m&&m.date>cuToday())return 'A chamada fica disponível a partir de '+cuFmt(m.date)+'.';
 if(!m&&mtgList(r).some(x=>x.st!=='ca'&&x.date===o.date))return 'Já existe um encontro nessa data.';
 if(mtgNeed(k)&&!o.content)return 'Escreva o conteúdo tratado.';
 if(names.some(n=>!o.att||!o.att[n]))return 'Marque a presença de todos.';
 const att={};names.forEach(n=>{att[n]={p:!!o.att[n].p,why:o.att[n].p?'':(o.att[n].why||'')};});
 if(m){m.st='re';m.content=o.content||'';m.att=att;}else mtgList(r).push(mtgMk({st:'re',date:o.date,time:o.time||'19:00',mode:o.mode||'Presencial',where:o.where||'',content:o.content||'',att,inv:k==='rede'?names.slice():null}));
 const d=m?m.date:o.date;if(k==='disc'&&d>r.lastISO)r.lastISO=d;return null;}
function mtgCancelSave(m,why){if(m.st!=='ag')return 'Só um encontro agendado pode ser cancelado.';m.st='ca';m.why=why||'';return null;}

/* ---------- telas ---------- */
const mtgAttHTML=(names,att)=>`<div class="stack g2"><div class="row between" style="align-items:center"><span class="eb2">Chamada</span><button type="button" class="link" id="mtgAll">Todos presentes</button></div><div class="vl" id="mtgAtt">${names.map((n,i)=>{const a=att&&att[n];return `<div class="vr" data-att="${esc(n)}" style="flex-wrap:wrap;gap:8px"><span class="grow vn">${esc(n)}</span>${cuPickHTML('a'+i,['Presente','Ausente'],a?(a.p?'Presente':'Ausente'):'')}<input class="mtgWhy" placeholder="Motivo da ausência (opcional)" aria-label="Motivo da ausência de ${esc(n)}" style="display:${a&&!a.p?'block':'none'};width:100%" value="${a&&a.why?esc(a.why):''}"></div>`;}).join('')}</div></div>`;
function mtgAttWire(sh){const box=sh.querySelector('#mtgAtt');if(!box)return;
 const sync=row=>{const b=row.querySelector('[aria-pressed="true"]'),w=row.querySelector('.mtgWhy');if(w)w.style.display=b&&b.getAttribute('data-val')==='Ausente'?'block':'none';};
 box.addEventListener('click',e=>{const row=e.target.closest('[data-att]');if(row)sync(row);});
 const all=sh.querySelector('#mtgAll');if(all)all.addEventListener('click',()=>{box.querySelectorAll('[data-att]').forEach(row=>{row.querySelectorAll('[data-val]').forEach(b=>b.setAttribute('aria-pressed',b.getAttribute('data-val')==='Presente'?'true':'false'));sync(row);});});}
function mtgAttRead(sh,names){const att={};for(const row of sh.querySelectorAll('[data-att]')){const n=row.getAttribute('data-att'),b=row.querySelector('[aria-pressed="true"]');if(!b)continue;const p=b.getAttribute('data-val')==='Presente',w=row.querySelector('.mtgWhy');att[n]={p,why:p?'':(w&&w.value||'').trim()};}return att;}
function mtgSheet(k,id,mid){const r=MTG_OWN[k](id),m=mtgList(r).find(x=>x.id===mid),ed=can(MTG_MOD[k],'editar'),ppl=mtgPpl(k,r,m);
 const rows=[['Quando',cuFmt(m.date)+' · '+m.time],['Modalidade',m.mode],...(m.where?[[m.mode==='Remoto'?'Link':'Local',m.where]]:[]),...(m.desc?[[k==='rede'?'Pauta':'Descrição',m.desc]]:[]),...(k==='rede'?[['Convocados',String(m.inv.length)]]:[]),...(m.st==='ca'?[['Motivo',m.why||'Sem motivo informado']]:[])];
 const pres=m.st==='re'?`<div class="stack g2"><p class="eb2">Presença</p><div class="vl">${ppl.map(n=>{const a=(m.att||{})[n]||{p:false};return `<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(n)}</span>${!a.p&&a.why?`<span class="vs">${esc(a.why)}</span>`:''}</span>${vsTag(a.p?'ok':'warning',a.p?'Presente':'Ausente')}</div>`;}).join('')}</div></div>${m.content?`<div class="stack g2"><p class="eb2">${mtgNeed(k)?'Conteúdo tratado':'Como foi'}</p><p class="body">${esc(m.content)}</p></div>`:''}`:'';
 const resp=k==='rede'&&m.st==='ag'&&m.resp?(()=>{const c={ac:0,rec:0,sr:0};Object.values(m.resp).forEach(x=>c[x.s]++);return `<div class="stack g2"><p class="eb2">Respostas</p><p class="vs">${c.ac} aceitaram · ${c.rec} recusaram · ${c.sr} sem resposta</p><div class="vl">${ppl.map(n=>{const x=m.resp[n]||{s:'sr'};return `<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(n)}</span>${x.s==='rec'&&x.why?`<span class="vs">${esc(x.why)}</span>`:''}</span>${vsTag(x.s==='ac'?'ok':x.s==='rec'?'danger':'off',x.s==='ac'?'Aceitou':x.s==='rec'?'Recusou':'Sem resposta')}</div>`;}).join('')}</div></div>`;})():'';
 const can_=m.st==='ag'&&ed,late=m.date>cuToday();
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(r.n||r.who)}</h3>${mtgTag(m)}</div>
  <div class="vl">${rows.map(([l,v])=>`<div class="vr"><span class="vs" style="min-width:104px">${l}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${esc(v)}</span></div>`).join('')}</div>${pres}${resp}
  <div class="stack g3">${can_?(late?`<p class="callout">A chamada fica disponível a partir de ${cuFmt(m.date)}.</p>`:`<button class="btn primary md block" data-a="mtgConc" data-v="${k}|${id}|${mid}">${m.date<cuToday()?'Fazer a chamada':'Concluir encontro'}</button>`)+`<button class="btn outline md block" data-a="mtgCancel" data-v="${k}|${id}|${mid}">Cancelar encontro</button>`:''}<button class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div></div>`);}
const MTG_GRP=r=>[['Líderes das casas da rede',cmRedeLeaders(r)],['Participantes das casas da rede',cmRedePpl(r)]];
function mtgSchedSheet(k,id){const r=MTG_OWN[k](id),g=k==='rede'?MTG_GRP(r):[];
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Agendar encontro</h3><p class="callout">${esc(r.n||r.who)}. ${k==='rede'?'Os convocados recebem o convite no app.':'Quem participa recebe o convite no app.'} A repetição (toda semana) fica na web.</p></div>
  ${field({id:'mtDt',label:'Data',type:'date',val:cuISO(1)})}${field({id:'mtHr',label:'Hora',type:'time',val:'19:30'})}
  <div class="stack g2"><span class="eb2">Modalidade</span>${cuPickHTML('mode',['Presencial','Remoto'],'Presencial')}</div>${field({id:'mtWh',label:'Local ou link',ph:'Ex.: casa da Ana, ou https://…'})}
  ${k==='rede'?`<div class="stack g2"><span class="eb2">Quem é convocado</span><div class="row g2" style="flex-wrap:wrap" data-multi="inv">${g.map(([n,l],i)=>`<button type="button" class="chip" data-i="${i}" aria-pressed="${i===0}">${esc(n)} (${l.length})</button>`).join('')}</div></div>`:''}
  ${field({id:'mtDs',label:k==='rede'?'Pauta (opcional)':'Descrição (opcional)',area:true,ph:'Sobre o que vai ser o encontro',max:1000})}
  <div class="otpmsg" id="mtErr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="mtGo">Agendar</button><button type="button" class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div></div>`,sh=>{cuPickWire(sh);
  sh.querySelectorAll('[data-multi]').forEach(g2=>g2.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true');}));
  $('#mtGo',sh).addEventListener('click',()=>{let inv=[];if(k==='rede'){const on=[...sh.querySelectorAll('[data-multi] [aria-pressed="true"]')].map(b=>+b.getAttribute('data-i'));inv=[...new Set(on.flatMap(i=>g[i][1]))];}
   const e=mtgSchedSave(k,r,{date:cuVal(sh,'mtDt'),time:cuVal(sh,'mtHr'),mode:cuPicked(sh,'mode'),where:cuVal(sh,'mtWh'),desc:cuVal(sh,'mtDs'),inv});if(e){$('#mtErr',sh).textContent=e;return;}
   S.mtg.f='ag';closeSheet().then(()=>{softRender();toast('success','Encontro agendado',cuFmt(mtgNext(r)?mtgNext(r).date:cuToday())+' · convite enviado');A.lsOpen(id);});});});}
/* Registrar (encontro novo, que já aconteceu) e Concluir (um agendado) são a MESMA tela: data, como foi, itens/conteúdo e a chamada */
function mtgRegSheet(k,id,mid){const r=MTG_OWN[k](id),m=mid?mtgList(r).find(x=>x.id===mid):null,names=m?mtgPpl(k,r,m):(k==='rede'?cmRedeLeaders(r):mtgPpl(k,r,{inv:[]}));
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${m?'Concluir encontro':'Registrar encontro'}</h3><p class="callout">${esc(r.n||r.who)}${m?' · '+cuFmt(m.date)+' às '+m.time:' · um encontro que já aconteceu'}. A chamada é obrigatória.</p></div>
  ${m?'':field({id:'mtDt',label:'Data',type:'date',val:cuToday()})}
  ${field({id:'mtTx',label:mtgNeed(k)?'Conteúdo tratado':'Como foi o encontro? (opcional)',area:true,ph:mtgNeed(k)?'O que foi conversado ou estudado':'Um resumo do encontro',max:4000})}
  ${names.length?mtgAttHTML(names,null):'<p class="callout">Não há participantes para a chamada.</p>'}
  <div class="otpmsg" id="mtErr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="mtGo">${m?'Concluir':'Registrar'}</button><button type="button" class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div></div>`,sh=>{cuPickWire(sh);mtgAttWire(sh);
  $('#mtGo',sh).addEventListener('click',()=>{const e=mtgSave(k,r,{mid,names,date:m?'':cuVal(sh,'mtDt'),content:cuVal(sh,'mtTx'),att:mtgAttRead(sh,names)});if(e){$('#mtErr',sh).textContent=e;return;}
   S.mtg.f='re';closeSheet().then(()=>{softRender();toast('success',m?'Encontro concluído':'Encontro registrado',(r.n||r.who));A.lsOpen(id);});});});}
function mtgCancelSheet(k,id,mid){const r=MTG_OWN[k](id),m=mtgList(r).find(x=>x.id===mid);
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Cancelar encontro?</h3><p class="callout">${cuFmt(m.date)} às ${m.time}. Quem foi convidado é avisado. Esta tela cancela só este encontro; cancelar a série fica na web.</p></div>
  ${field({id:'mtWy',label:'Motivo (opcional)',area:true,ph:'Ex.: o anfitrião viajou',max:300})}
  <div class="row g3"><button type="button" class="btn outline md grow" data-a="mtgOpen" data-v="${k}|${id}|${mid}">Voltar</button><button type="button" class="btn danger md grow" id="mtGo">Cancelar encontro</button></div></div>`,sh=>{
  $('#mtGo',sh).addEventListener('click',()=>{mtgCancelSave(m,cuVal(sh,'mtWy'));S.mtg.f='ca';closeSheet().then(()=>{softRender();toast('info','Encontro cancelado',cuFmt(m.date));A.lsOpen(id);});});});}
Object.assign(A,{
 mtgF:v=>{S.mtg.f=v;if(S.mtg.cur)A.lsOpen(S.mtg.cur.id);},
 mtgOpen:v=>{const [k,id,mid]=v.split('|');mtgSheet(k,id,mid);},
 mtgSched:v=>{const [k,id]=v.split('|');mtgSchedSheet(k,id);},
 mtgReg:v=>{const [k,id]=v.split('|');mtgRegSheet(k,id,'');},
 mtgConc:v=>{const [k,id,mid]=v.split('|');mtgRegSheet(k,id,mid);},
 mtgCancel:v=>{const [k,id,mid]=v.split('|');mtgCancelSheet(k,id,mid);}
});

/* ---------- semente dos encontros (dados de demonstração) ---------- */
function mtgSeedList(k,r,spec){spec.forEach(([st,off,time,mode,where,desc,content,absent])=>{const m=mtgMk({st,date:cuISO(off),time,mode,where,desc,content:content||''});
 if(k==='rede')m.inv=cmRedeLeaders(r);
 if(st==='re'){const ppl=mtgPpl(k,r,m);m.att={};ppl.forEach((n,i)=>{const ab=(absent||[]).includes(i);m.att[n]={p:!ab,why:ab?'Trabalho':''};});}
 if(st==='ca')m.why='Imprevisto';
 if(k==='rede'&&st==='ag'){m.resp={};m.inv.forEach((n,i)=>{m.resp[n]=i%3===2?{s:'sr'}:i%4===3?{s:'rec',why:'Viagem'}:{s:'ac'};});}
 mtgList(r).push(m);});}
/* ===== Comunidade: Casas de Apascentamento, Redes de casa e Ministérios ===== */
const CM_PO=['Larissa Campos','Murilo Santos','Natália Vieira','Orlando Reis','Priscila Moraes','Quésia Almeida','Rafael Bastos','Sabrina Lima','Tales Ferreira','Úrsula Gomes','Vitor Hugo Dias','Yasmin Costa','Zeca Barbosa','Amanda Peixoto','Ana Beatriz Lopes','Caio Martins','Débora Nascimento','Eduardo Pires','Fabiana Rocha','Gabriel Tavares','Heloísa Ramos','Ícaro Mendes','Jéssica Farias','Kleber Duarte','Bruno Reis','Clara Nunes','Diego Faria','Elisa Moura','Otávio Lins','Marina Costa','Felipe Andrade','Daniela Rocha','Patrícia Oliveira Nunes','Juliana Costa Ferreira','Marcos Souza Ramos','Ana Clara Lima'];
const cmTel=i=>'(11) 9'+(7000+i*211)+'-'+(2000+i*73);
function cmCasaMk(o){const r=Object.assign({tel:'',desc:'',tags:[],ministerio:'',rede:'',reqs:[],cap:0,st:'at',mtgs:[]},o);
 const pool=CM_PO.filter(n=>!r.leaders.includes(n)),extra=Math.max(0,r.count-r.leaders.length);
 r.ppl=[...r.leaders.map(n=>({n,role:n===r.host?'Anfitrião e líder':'Líder',since:'2024'})),...pool.slice(o.off||0,(o.off||0)+extra).map((n,i)=>({n,role:n===r.host?'Anfitrião':'Participante',since:String(2022+i%4)}))];
 if(r.host&&!r.ppl.some(p=>p.n===r.host))r.ppl.push({n:r.host,role:'Anfitrião',since:'2023'});
 Object.defineProperties(r,{
  lotada:{get(){return r.cap>0&&r.ppl.length>=r.cap;}},
  s:{get(){const l=mtgLast(r),sel=[r.leaders.length?r.leaders.join(' e '):'Sem líder',r.ppl.length+(r.ppl.length===1?' participante':' participantes')];if(r.lotada)sel.push('Lotada');if(r.reqs.length)sel.push('+'+r.reqs.length+(r.reqs.length===1?' pedido':' pedidos'));sel.push(l?'último encontro '+cuAgo(cuDays(l)):'sem encontros');return sel.join(' · ');},enumerable:true},
  d:{get(){const p=mtgPct(r),l=mtgLast(r);return [['Líderes',r.leaders.length?r.leaders.join(' e '):'Sem líder: nenhum encontro será conduzido até alguém assumir'],['Anfitrião',r.host||'—'],['Ministério',r.ministerio||'Casa geral'],['Local',r.addr],['Telefone',r.tel||'—'],['Participantes',r.ppl.length+(r.cap?' de '+r.cap:'')],...(r.tags.length?[['Tags',r.tags.join(', ')]]:[]),['Rede',r.rede?(CM_REDES.find(x=>x.id===r.rede)||{n:'—'}).n:'Sem rede'],['Presença média',p===null?'—':p+'%'],['Último encontro',l?cuAgo(cuDays(l)):'—'],...mtgNextRow(r)];},enumerable:true}});
 return r;}
const CM_CASAS=[
 cmCasaMk({id:'g1',n:'Casa Jardins',leaders:['Ana Costa','Paulo Costa'],host:'Ana Costa',count:14,addr:'Rua das Acácias, 120 · Jardins',tel:cmTel(1),desc:'Casa aberta para famílias e casais.',cap:16,rede:'r1',reqs:[['Larissa Campos','há 2 dias'],['Murilo Santos','há 4 dias']],off:2}),
 cmCasaMk({id:'g2',n:'Casa Centro',leaders:['Marcos Lima'],host:'Marcos Lima',count:9,addr:'Av. São João, 800 · Centro',tel:cmTel(2),desc:'Encontro de homens, depois do trabalho.',cap:12,tags:['Homens'],rede:'r1',off:8}),
 cmCasaMk({id:'g3',n:'Casa Pinheiros',leaders:['Juliana Reis'],host:'Juliana Reis',count:11,addr:'Rua dos Pinheiros, 455 · Pinheiros',tel:cmTel(3),desc:'Mulheres que oram e partilham a vida.',cap:11,tags:['Mulheres'],rede:'r2',reqs:[['Natália Vieira','ontem']],off:14}),
 cmCasaMk({id:'g4',n:'Casa Jovens SP',leaders:['Davi Melo'],host:'Davi Melo',count:18,addr:'Rua Augusta, 1500 · Consolação',tel:cmTel(4),desc:'Jovens de 18 a 29 anos.',cap:18,tags:['Connect','Jovens'],ministerio:'Jovens e Adolescentes',rede:'r3',reqs:[['Yasmin Costa','há 1 dia']],off:4}),
 cmCasaMk({id:'g5',n:'Casa Lapa',leaders:[],host:'',count:0,addr:'Rua Catão, 300 · Lapa',tel:'',desc:'Em formação.',cap:10,st:'in',off:20})
];
const CM_REDES=[
 (()=>{const r={id:'r1',n:'Rede Centro',sup:'Pr. Marcos Lima',casas:['g2','g1'],st:'at',tel:cmTel(11),mtgs:[]};return r;})(),
 (()=>{const r={id:'r2',n:'Rede Sul',sup:'Diac. Ana Costa',casas:['g3'],st:'at',tel:cmTel(12),mtgs:[]};return r;})(),
 (()=>{const r={id:'r3',n:'Rede Jovens',sup:'Davi Melo',casas:['g4'],st:'at',tel:cmTel(13),mtgs:[]};return r;})()];
const cmCasasOf=r=>r.casas.map(id=>CM_CASAS.find(c=>c.id===id)).filter(Boolean);
function cmRedeLeaders(r){return [...new Set(cmCasasOf(r).flatMap(c=>c.leaders))];}
function cmRedePpl(r){return [...new Set(cmCasasOf(r).flatMap(c=>c.ppl.map(p=>p.n)))];}
CM_REDES.forEach(r=>{Object.defineProperties(r,{
 s:{get(){const c=cmCasasOf(r);return 'Supervisão de '+r.sup+' · '+c.length+(c.length===1?' casa':' casas')+' · '+cmRedePpl(r).length+' pessoas';},enumerable:true},
 d:{get(){return [['Supervisor',r.sup],['Telefone',r.tel],['Casas',cmCasasOf(r).map(c=>c.n).join(', ')||'Nenhuma'],['Pessoas',String(cmRedePpl(r).length)],...mtgNextRow(r)];},enumerable:true}});});
/* ministérios */
const CM_TIMES={m8:[['Banda','Davi Melo',8],['Vocal','Bia Melo',9],['Técnica','Rafael Pereira',7]],m4:[['Balcão','Juliana Reis',10],['Cozinha','Célia Nunes',8]],m1:[['Banda jovem','Davi Melo',12],['Recepção','Bia Melo',10]]};
const CM_MINS=[...MINIS.map((m,i)=>{const lider=m.lead;const r={id:'mn'+m.id,n:m.t,lead:lider,total:m.n,desc:m.d,when:m.when,need:m.need,st:'at',tel:cmTel(30+i),times:CM_TIMES[m.id]||[['Equipe geral',lider,m.n]],ppl:[{n:lider,role:'Líder'},...CM_PO.slice(i,i+Math.min(9,Math.max(0,m.n-1))).map((n,j)=>({n,role:'Membro'}))]};return r;}),
 {id:'mn99',n:'Teatro',lead:'',total:0,desc:'Ministério pausado.',when:'—',need:[],st:'in',tel:'',times:[],ppl:[]}];
CM_MINS.forEach(r=>{Object.defineProperties(r,{
 s:{get(){return (r.lead||'Sem líder')+' · '+r.total+(r.total===1?' membro':' membros')+' · '+r.times.length+(r.times.length===1?' time':' times');},enumerable:true},
 d:{get(){return [['Líder',r.lead||'Sem líder'],['Quando serve',r.when],...(r.need.length?[['Para servir',r.need.join('; ')]]:[]),['Membros',String(r.total)],['Times',String(r.times.length)],['Descrição',r.desc]];},enumerable:true}});});
/* encontros de demonstração */
CU_DISC.forEach(r=>{const dd=cuDays(r.lastISO);mtgSeedList('disc',r,[['re',-dd,'19:00','Presencial','Café Aroma','','Estudamos Fundamentos da fé e combinamos a próxima leitura.'],...(r.id==='cd4'?[['ag',4,'19:30','Presencial','Casa da Larissa','',''],['ag',11,'19:30','Remoto','https://meet.example/disc','','']]:r.id==='cd1'?[['ag',2,'20:00','Remoto','https://meet.example/isa','','']]:r.id==='cd3'?[['ag',-1,'19:00','Presencial','Padaria da esquina','','']]:r.id==='cd2'?[['ca',-12,'19:00','Presencial','','','']]:r.id==='cd0'?[['ag',9,'19:00','Presencial','Café Aroma','','']]:[])]);});
CU_CASES.forEach(r=>{if(r.st==='nv')return;const off={cau1:-2,cau2:-5,cau3:-7,ca9:-25,ca10:-49,ca11:-9}[r.id];mtgSeedList('caso',r,[['re',off===undefined?-6:off,'15:00','Presencial','Visita','','Conversamos e oramos juntos.'],...(r.id==='cau1'?[['ag',3,'10:00','Presencial','Hospital São Paulo','','']]:[])]);});
CM_CASAS.filter(c=>c.st==='at').forEach((c,i)=>{const dow=[3,4,5,2][i]||3;
 mtgSeedList('casa',c,[['re',-(i*2+3),'19:30','Presencial',c.addr.split(' · ')[0],'','Estudo e partilha.',[1,5]],['re',-(i*2+10),'19:30','Presencial',c.addr.split(' · ')[0],'','Oração e comunhão.',[3]],['ag',4-i,'19:30','Presencial',c.addr.split(' · ')[0],'Encontro da semana',''],...(i===1?[['ag',-1,'19:30','Presencial',c.addr.split(' · ')[0],'','']]:[]),...(i===2?[['ca',-4,'19:30','Presencial','','','']]:[])]);});
CM_REDES.forEach((r,i)=>{mtgSeedList('rede',r,[['re',-(12+i),'20:00','Presencial','Sala da secretaria','Alinhamento das casas','Revisamos presença e pedidos.',[1]],['ag',6+i,'20:00','Presencial','Sala da secretaria','Planejamento do trimestre','']]);});

/* ---------- Casas: ficha ---------- */
function cmCasaExtra(r){const ed=can('comunidade','editar'),leaderTel=r.tel;
 const pend=r.reqs.length?`<div class="stack g2"><p class="eb2">Pedidos para entrar</p><div class="vl">${r.reqs.map((q,i)=>`<div class="vr" style="flex-wrap:wrap;gap:8px"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(q[0])}</span><span class="vs">pediu ${q[1]}</span></span>${ed?`<span class="row g2"><button class="btn primary sm" data-a="cmReqOk" data-v="${r.id}|${i}">Aceitar</button><button class="btn outline sm" data-a="cmReqNo" data-v="${r.id}|${i}">Recusar</button></span>`:''}</div>`).join('')}</div></div>`:'';
 const maps=`<a class="btn outline md block" href="https://maps.google.com/?q=${encodeURIComponent(r.addr)}" target="_blank" rel="noopener">Ver no mapa</a>`;
 const ppl=`<div class="stack g2"><div class="row between" style="align-items:center"><p class="eb2">Participantes${r.lotada?' · lotada':''}</p>${ed?`<button class="link" data-a="cmAddP" data-v="${r.id}">Adicionar</button>`:''}</div>${fndBox('cmPl','Buscar participante')}<div class="vl" id="cmPl">${r.ppl.map((p,i)=>`<div class="vr" data-q="${esc(p.n)}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(p.n)}</span><span class="vs">desde ${p.since}</span></span>${p.role!=='Participante'?vsTag('info',p.role):''}${ed&&p.role==='Participante'?`<button class="link" data-a="cmRmP" data-v="${r.id}|${i}" aria-label="Tirar ${esc(p.n)}">Tirar</button>`:''}</div>`).join('')}</div></div>`;
 return (leaderTel?cuBtns(leaderTel):'')+maps+pend+mtgBlock('casa',r)+msgBlock('casa:'+r.id,'comunidade')+ppl;}
function cmAddPSheet(id){const r=CM_CASAS.find(x=>x.id===id),pool=dvgInt().filter(n=>!r.ppl.some(p=>p.n===n));
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Adicionar participante</h3><p class="callout">${r.lotada?esc(r.n)+' está lotada ('+r.ppl.length+' de '+r.cap+'). Dá para adicionar mesmo assim. ':''}Só entram membros integrados.</p></div>${fndBox('cmAp','Buscar pelo nome')}<div class="vl" id="cmAp">${pool.map(n=>`<button class="vr tap" data-q="${esc(n)}" data-a="cmAddPGo" data-v="${id}|${esc(n)}"><span class="grow vn">${esc(n)}</span><span class="vs">Adicionar</span></button>`).join('')||vsEmpty('Ninguém para adicionar','Todos os membros integrados já participam.')}</div><button class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div>`);}
Object.assign(A,{
 cmReqOk:v=>{const [id,i]=v.split('|'),r=CM_CASAS.find(x=>x.id===id),q=r.reqs.splice(+i,1)[0];r.ppl.push({n:q[0],role:'Participante',since:String(new Date().getFullYear())});closeSheet().then(()=>{softRender();toast('success',q[0].split(' ')[0]+' agora participa',r.n);A.lsOpen(id);});},
 cmReqNo:v=>{const [id,i]=v.split('|'),r=CM_CASAS.find(x=>x.id===id),q=r.reqs[+i];reasonSheet({title:'Recusar pedido',callout:esc(q[0])+' · pedido para entrar em '+esc(r.n),ph:'Ex.: a casa está sem vaga no momento',btn:'Recusar',who:q[0].split(' ')[0],done:'Recusado',ms:600,
  run:async why=>{r.reqs.splice(+i,1);await closeSheet();softRender();toast('info','Pedido recusado',q[0].split(' ')[0]+' vê o motivo no app.');A.lsOpen(id);}});},
 cmAddP:id=>cmAddPSheet(id),
 cmAddPGo:v=>{const [id,n]=v.split('|'),r=CM_CASAS.find(x=>x.id===id);if(r.ppl.some(p=>p.n===n))return;r.ppl.push({n,role:'Participante',since:String(new Date().getFullYear())});closeSheet().then(()=>{softRender();toast('success','Participante adicionado',n);A.lsOpen(id);});},
 cmRmP:v=>{const [id,i]=v.split('|'),r=CM_CASAS.find(x=>x.id===id),p=r.ppl[+i];vsConfirm('Tirar '+esc(p.n.split(' ')[0])+' da casa?',esc(p.n)+' sai da lista de participantes. O histórico de presença é mantido.','Tirar',()=>{r.ppl.splice(+i,1);softRender();closeSheet().then(()=>{toast('success','Participante tirado',p.n);A.lsOpen(id);});});},
 cmGoCasa:id=>{closeSheet().then(()=>{S.gmod='comunidade';A.ovGo('Casas de Apascentamento');setTimeout(()=>A.lsOpen(id),350);});}
});
/* ---------- Redes: ficha ---------- */
function cmRedeExtra(r){return cuBtns(r.tel)+`<div class="stack g2"><p class="eb2">Casas da rede</p><div class="vl">${cmCasasOf(r).map(c=>`<button class="vr tap" data-a="cmGoCasa" data-v="${c.id}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(c.n)}</span><span class="vs">${esc(c.leaders.join(' e ')||'Sem líder')} · ${c.ppl.length} pessoas${mtgPct(c)!==null?' · presença '+mtgPct(c)+'%':''}</span></span>${vsTag(c.st==='at'?'ok':'off',c.st==='at'?'Ativa':'Inativa')}</button>`).join('')}</div></div>`+mtgBlock('rede',r);}
/* ---------- Ministérios: ficha ---------- */
function cmMinExtra(r){const ed=can('comunidade','editar');
 return (r.tel?cuBtns(r.tel):'')+`<div class="stack g2"><div class="row between" style="align-items:center"><p class="eb2">Membros</p>${ed&&r.st==='at'?`<button class="link" data-a="cmAddM" data-v="${r.id}">Adicionar</button>`:''}</div>${fndBox('cmMl','Buscar membro')}<div class="vl" id="cmMl">${r.ppl.map((p,i)=>`<div class="vr" data-q="${esc(p.n+' '+p.role)}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(p.n)}</span><span class="vs">${esc(p.role)}</span></span>${ed&&p.role!=='Líder'?`<button class="link" data-a="cmRmM" data-v="${r.id}|${i}" aria-label="Tirar ${esc(p.n)}">Tirar</button>`:''}</div>`).join('')||vsEmpty('Nenhum membro','Use Adicionar para incluir alguém.')}</div>${r.total>r.ppl.length?`<p class="vs">Mostrando ${r.ppl.length} de ${r.total}. A lista completa fica na web.</p>`:''}</div>`
  +sclMinBlock(r)+qdBlock(r.n,'min:'+r.id)+cxBlock(r.n,'min:'+r.id)+msgBlock('min:'+r.n,'comunidade')+(r.times.length?`<div class="stack g2"><p class="eb2">Times</p><div class="vl">${r.times.map(t=>`<div class="vr"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(t[0])}</span><span class="vs">líder ${esc(t[1])} · ${t[2]} pessoas</span></span></div>`).join('')}</div></div>`:'');}
function cmAddMSheet(id){const r=CM_MINS.find(x=>x.id===id),pool=dvgInt().filter(n=>!r.ppl.some(p=>p.n===n));
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Adicionar ao ministério</h3><p class="callout">${esc(r.n)}. Só entram membros integrados.</p></div>${field({id:'cmFn',label:'Função',val:'Membro',ph:'Ex.: Voz, Recepção'})}${fndBox('cmAm','Buscar pelo nome')}<div class="vl" id="cmAm">${pool.map(n=>`<button class="vr tap" data-q="${esc(n)}" data-a="cmAddMGo" data-v="${id}|${esc(n)}"><span class="grow vn">${esc(n)}</span><span class="vs">Adicionar</span></button>`).join('')||vsEmpty('Ninguém para adicionar','Todos os membros integrados já estão no ministério.')}</div><button class="tlink" data-a="lsOpen" data-v="${id}">Voltar</button></div>`);}
Object.assign(A,{
 cmAddM:id=>cmAddMSheet(id),
 cmAddMGo:v=>{const [id,n]=v.split('|'),r=CM_MINS.find(x=>x.id===id);if(r.ppl.some(p=>p.n===n))return;const fn=(($('#cmFn')||{}).value||'').trim()||'Membro';r.ppl.push({n,role:fn});r.total++;closeSheet().then(()=>{softRender();toast('success','Adicionado ao ministério',n.split(' ')[0]+' · '+fn);A.lsOpen(id);});},
 cmRmM:v=>{const [id,i]=v.split('|'),r=CM_MINS.find(x=>x.id===id),p=r.ppl[+i];vsConfirm('Tirar '+esc(p.n.split(' ')[0])+' do ministério?',esc(p.n)+' sai de '+esc(r.n)+' e dos times do ministério.','Tirar',()=>{r.ppl.splice(+i,1);r.total=Math.max(0,r.total-1);softRender();closeSheet().then(()=>{toast('success','Tirado do ministério',p.n);A.lsOpen(id);});});}
});
/* ---------- as seções ---------- */
LSD.comunidade={
 'Casas de Apascentamento':{noun:'casas',av:1,ST:{at:['ok','Ativa'],in:['off','Inativa']},acts:[],extra:r=>cmCasaExtra(r),rows:[]},
 'Redes de casa':{noun:'redes',av:1,ST:{at:['ok','Ativa'],in:['off','Inativa']},acts:[],extra:r=>cmRedeExtra(r),rows:[]},
 'Ministérios':{noun:'ministérios',av:1,ST:{at:['ok','Ativo'],in:['off','Inativo']},acts:[],extra:r=>cmMinExtra(r),rows:[]}};
LSD.comunidade['Casas de Apascentamento'].rows=CM_CASAS;LSD.comunidade['Redes de casa'].rows=CM_REDES;LSD.comunidade['Ministérios'].rows=CM_MINS;
/* pendências do módulo saem dos dados */
Object.defineProperty(GPEND,'comunidade',{configurable:true,enumerable:true,get:()=>[['Pedidos para entrar nas casas',CM_CASAS.reduce((a,c)=>a+c.reqs.length,0)],['Chamadas pendentes',[...CM_CASAS,...CM_REDES].reduce((a,r)=>a+mtgPend(r),0)]].filter(x=>x[1]>0)});
