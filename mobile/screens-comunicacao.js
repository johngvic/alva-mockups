/* ===== Comunicação no app administrativo (Tiago, 08/11/2026) =====
 * Spec `communication`: notícia Rascunho, Publicada, Expirada ou Retirada; banner Ativo (até 5 ao mesmo tempo); canal de transmissão com "Visível no app"
 * (a live é automática, pela grade); mensagem Agendada, Enviada, Cancelada ou Falhou. MENSAGENS é UM componente: a mesma lista e o mesmo Novo envio em
 * Comunicação, Secretaria, Financeiro e nas fichas da Casa e do Ministério (cada um só vê o que ele mesmo enviou).
 * Notificações (automações e modelos), categorias, criar e editar notícia, banner, canal e a ordem dos banners ficam na web. */
const NW_ST={rs:['info','Rascunho'],pb:['ok','Publicada'],ex:['warning','Expirada'],wd:['off','Retirada']};
const NEWS=[['Conferência Anual 2026','Três noites com preletores convidados.','pb','Eventos','Pública'],['Nova turma de batismo','A classe começa no domingo.','pb','Igreja','Interna'],['Horários de fim de ano','Confira a programação de dezembro.','rs','Igreja','Pública'],['Campanha do agasalho','Recebemos doações até 30 de outubro.','ex','Social','Pública'],['Retiro adiado','Nova data em breve.','wd','Jovens','Interna']].map(([n,s,st,cat,vis],i)=>({id:'nw'+i,n,s:cat+' · '+vis+' · '+s,st,d:[['Categoria',cat],['Visibilidade',vis],['Resumo',s]]}));
const BN=[['Conferência Anual 2026','Abre o evento',1],['Batismo nas Águas','Abre a inscrição',1],['Retiro de Jovens','Abre o evento',0],['Culto ao vivo','Abre a transmissão',1]].map(([n,s,a],i)=>({id:'bn'+i,n,s,st:a?'at':'in',auto:i===3,d:[['Destino',s],['Posição',a?'Carrossel do início do app':'Fora do carrossel']]}));
const CH=[['YouTube','Canal Alva','youtube.com/@alvaigreja','Dom 10h e 18h30 · Qua 20h',1],['Instagram','@alvaigreja','instagram.com/alvaigreja','Sem horário fixo',1],['Facebook','Alva Igreja','facebook.com/alvaigreja','Dom 10h',0]].map(([p,n,l,h,a],i)=>({id:'ch'+i,n:p+' · '+n,s:h,st:a?'at':'in',link:l,d:[['Plataforma',p],['Link',l],['Horários',h]]}));
/* mensagens: UM componente */
const MSG_ST={ag:['info','Agendada'],en:['ok','Enviada'],ca:['off','Cancelada'],fa:['danger','Falhou']};
const MSG_AUD=[['Todos os membros',402],['Líderes',38],['Voluntários',96],['Jovens',64],['Aniversariantes do mês',22]];
let _msgN=0;
S.msg={f:'todas',ch:['Push'],aud:'Todos os membros'};
const msgMk=o=>Object.assign({id:'ms'+(++_msgN),t:'',m:'',aud:'',n:0,ch:['Push'],st:'en',off:-3,tm:'09:00',origin:'Comunicação',auto:false,why:''},o);
const MSGS=[
 msgMk({t:'Culto de domingo muda de horário',m:'Neste domingo o culto da manhã começa às 9h30.',aud:'Todos os membros',n:402,ch:['Push','E-mail'],st:'ag',off:1,tm:'08:00'}),
 msgMk({t:'Lembrete: Noite de Oração',m:'Hoje às 20h, no Auditório.',aud:'Todos os membros',n:402,st:'en',off:-1,tm:'17:00',auto:true}),
 msgMk({t:'Sua escala de domingo foi aprovada',m:'Veja sua escala no app.',aud:'Voluntários',n:96,st:'en',off:-2,tm:'10:00',auto:true}),
 msgMk({t:'Falta pouco para o Retiro',m:'Últimas vagas.',aud:'Jovens',n:64,ch:['Push','E-mail'],st:'fa',off:-4,why:'O serviço de e-mail não respondeu.'}),
 msgMk({t:'Retiro adiado',m:'Nova data em breve.',aud:'Jovens',n:64,st:'ca',off:-6}),
 msgMk({t:'Atualize o seu cadastro',m:'Confira seus dados em Mais › Meus dados.',aud:'Todos os membros',n:380,ch:['Push','E-mail'],st:'en',off:-9,origin:'Secretaria'}),
 msgMk({t:'Prestação de contas do trimestre',m:'O resumo está disponível para os líderes.',aud:'Líderes',n:38,st:'ag',off:3,tm:'09:00',origin:'Financeiro'}),
 msgMk({t:'Estudo desta semana',m:'Leiam Atos 2 antes do encontro.',aud:'Casa Jardins',n:14,st:'en',off:-2,tm:'18:00',origin:'casa:g1'}),
 msgMk({t:'Ensaio extra',m:'Quinta, às 20h, no Auditório.',aud:'Louvor',n:24,st:'ag',off:2,tm:'12:00',origin:'min:Louvor'})];
const msgDate=m=>cuFmt(cuISO(m.off))+', '+m.tm;
const msgScope=sc=>MSGS.filter(m=>sc==='all'?m.origin==='Comunicação':m.origin===sc);
function msgBody(sc,mod){const f=S.msg.f,all=msgScope(sc),l=all.filter(m=>f==='todas'||m.st===f),n=k=>all.filter(m=>k==='todas'||m.st===k).length,adm=can(mod,'aprovar');
 return (adm?`<button class="btn primary md block" data-a="msgNew" data-v="${sc}|${mod}">Novo envio</button>`:'')
  +vsChips('msgF',f,[['ag','Agendadas',n('ag')],['en','Enviadas',n('en')],['ca','Canceladas',n('ca')],['todas','Todas',n('todas')]])
  +(l.length?fndBox('msgL','Buscar mensagem')+`<div class="vl" id="msgL">${l.map(m=>`<button class="vr tap" data-q="${esc(m.t+' '+m.aud)}" data-a="msgOpen" data-v="${m.id}|${sc}|${mod}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(m.t)}</span><span class="vs">${msgDate(m)} · ${esc(m.aud)} · ${m.n} ${m.n===1?'pessoa':'pessoas'} · ${m.ch.join(' e ')}${m.auto?' · Auto':''}</span></span>${vsTag(MSG_ST[m.st][0],MSG_ST[m.st][1])}</button>`).join('')}</div>`:vsEmpty('Nenhuma mensagem aqui','Troque o filtro para ver outras.'));}
function msgSheet(id,sc,mod){const m=MSGS.find(x=>x.id===id),adm=can(mod,'aprovar'),b=[];
 if(adm&&m.st==='ag')b.push(`<button class="btn outline md block" data-a="msgCancel" data-v="${id}|${sc}|${mod}">Cancelar</button>`);
 if(adm&&['en','fa','ca'].includes(m.st)&&!m.auto)b.push(`<button class="btn primary md block" data-a="msgResend" data-v="${id}|${sc}|${mod}">Reenviar</button>`);
 sheet(`<div class="stack g5"><div class="stack g2" style="align-items:flex-start"><h3 class="t2">${esc(m.t)}</h3>${vsTag(MSG_ST[m.st][0],MSG_ST[m.st][1])}</div><p class="body">${esc(m.m)}</p>
  <div class="vl">${[['Quando',msgDate(m)],['Público',m.aud+' · '+m.n+(m.n===1?' pessoa':' pessoas')],['Canais',m.ch.join(' e ')],['Origem',m.auto?'Automática':m.origin.startsWith('casa:')?'Casa':m.origin.startsWith('min:')?'Ministério':m.origin],...(m.st==='fa'?[['Motivo da falha',m.why]]:[])].map(([a,v])=>`<div class="vr"><span class="vs" style="min-width:104px">${a}</span><span class="grow" style="text-align:right;overflow-wrap:anywhere">${esc(v)}</span></div>`).join('')}</div>
  <div class="stack g3">${b.join('')}<button class="tlink" data-a="closeSheet">Fechar</button></div></div>`);}
function msgNewSheet(sc,mod){const fixed=sc!=='all'&&!['Secretaria','Financeiro'].includes(sc);S.msg.ch=['Push'];S.msg.aud=fixed?'':MSG_AUD[0][0];
 const grp=fixed?(sc.startsWith('casa:')?CM_CASAS.find(c=>c.id===sc.slice(5)):CM_MINS.find(x=>x.n===sc.slice(4))):null,fixN=grp?(grp.total||(grp.ppl||[]).length):0,fixName=grp?grp.n:'';
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Novo envio</h3><p class="callout">${fixed?'Para '+esc(fixName)+' ('+fixN+' pessoas).':'Escolha quem recebe.'} Cada pessoa recebe pelos canais que escolher.</p></div>
  <div class="stack g2"><span class="eb2">Canais</span><div class="row g2" id="mgC"><button type="button" class="chip" data-c="Push" aria-pressed="true">Push</button><button type="button" class="chip" data-c="E-mail" aria-pressed="false">E-mail</button></div></div>
  ${fixed?'':`<div class="stack g2"><span class="eb2">Público</span><div class="row g2" style="flex-wrap:wrap" id="mgA">${MSG_AUD.map(([n,k],i)=>`<button type="button" class="chip" data-a2="${esc(n)}" aria-pressed="${i===0}">${esc(n)} (${k})</button>`).join('')}</div></div>`}
  ${field({id:'mgT',label:'Título (obrigatório para e-mail)',ph:'Ex.: Culto muda de horário',max:100})}${field({id:'mgM',label:'Mensagem',area:true,ph:'Escreva a mensagem',max:500})}
  <div class="stack g2"><span class="eb2">Quando</span>${cuPickHTML('when',['Agora','Agendar'],'Agora')}</div>${field({id:'mgD',label:'Data (se agendar)',type:'date',val:cuISO(1)})}${field({id:'mgH',label:'Hora (se agendar)',type:'time',val:'09:00'})}
  <div class="otpmsg" id="mgEr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="mgGo">Enviar</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{cuPickWire(sh);
  sh.querySelectorAll('[data-c]').forEach(b=>b.addEventListener('click',()=>{const k=b.getAttribute('data-c'),on=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',String(!on));S.msg.ch=[...sh.querySelectorAll('[data-c][aria-pressed="true"]')].map(x=>x.getAttribute('data-c'));}));
  sh.querySelectorAll('[data-a2]').forEach(b=>b.addEventListener('click',()=>{S.msg.aud=b.getAttribute('data-a2');sh.querySelectorAll('[data-a2]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
  $('#mgGo',sh).addEventListener('click',()=>{const when=cuPicked(sh,'when'),e=msgSave({sc,t:cuVal(sh,'mgT'),m:cuVal(sh,'mgM'),ch:S.msg.ch,aud:fixed?fixName:S.msg.aud,n:fixed?fixN:(MSG_AUD.find(a=>a[0]===S.msg.aud)||[0,0])[1],when,date:cuVal(sh,'mgD'),time:cuVal(sh,'mgH')});if(e){$('#mgEr',sh).textContent=e;return;}closeSheet().then(()=>{S.msg.f=when==='Agendar'?'ag':'en';softRender();toast('success',when==='Agendar'?'Mensagem agendada':'Mensagem na fila de envio');});});});}
function msgSave(o){if(!o.ch.length)return 'Escolha ao menos um canal.';if(!(o.m||'').trim())return 'Escreva a mensagem.';if(o.ch.includes('E-mail')&&!(o.t||'').trim())return 'O e-mail precisa de um título.';if(!o.aud)return 'Escolha o público.';if(o.n<=0)return 'Esse público não tem ninguém.';
 let off=0,tm=new Date().toTimeString().slice(0,5);if(o.when==='Agendar'){if(!o.date||!o.time)return 'Informe a data e a hora.';if(new Date(o.date+'T'+o.time+':00')<=new Date())return 'Escolha um horário que ainda não passou.';off=Math.round((new Date(o.date+'T12:00:00')-new Date(cuToday()+'T12:00:00'))/864e5);tm=o.time;}
 const origin=o.sc==='all'?'Comunicação':o.sc;MSGS.unshift(msgMk({t:o.t||o.m.slice(0,40),m:o.m,aud:o.aud,n:o.n,ch:o.ch.slice(),st:o.when==='Agendar'?'ag':'en',off,tm,origin}));return null;}
/* bloco "Mensagens" das fichas da Casa e do Ministério */
function msgBlock(sc,mod,label){const l=msgScope(sc).slice(0,3);return `<div class="stack g2"><div class="row between" style="align-items:center"><p class="eb2">Mensagens</p>${can(mod,'aprovar')?`<button class="link" data-a="msgNew" data-v="${sc}|${mod}">Novo envio</button>`:''}</div>${l.length?`<div class="vl">${l.map(m=>`<button class="vr tap" data-a="msgOpen" data-v="${m.id}|${sc}|${mod}"><span class="grow stack" style="gap:2px;min-width:0"><span class="vn">${esc(m.t)}</span><span class="vs">${msgDate(m)} · ${m.n} pessoas</span></span>${vsTag(MSG_ST[m.st][0],MSG_ST[m.st][1])}</button>`).join('')}</div>`:'<p class="vs">Nenhuma mensagem enviada.</p>'}</div>`;}
Object.assign(A,{
 msgF:v=>{S.msg.f=v;softRender();},msgOpen:v=>{const [id,sc,mod]=v.split('|');msgSheet(id,sc,mod);},msgNew:v=>{const [sc,mod]=v.split('|');msgNewSheet(sc,mod);},
 msgCancel:v=>{const [id,sc,mod]=v.split('|'),m=MSGS.find(x=>x.id===id);vsConfirm('Cancelar a mensagem?','“'+esc(m.t)+'” não será enviada.','Cancelar',()=>{m.st='ca';closeSheet().then(()=>{softRender();toast('info','Mensagem cancelada',m.t);});});},
 msgResend:v=>{const [id,sc,mod]=v.split('|'),m=MSGS.find(x=>x.id===id);sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Reenviar a mensagem?</h3><p class="callout">Cria um novo envio para ${esc(m.aud)} (${m.n} pessoas).</p></div><div class="stack g3"><button class="btn primary block" id="mrY">Reenviar</button><button class="tlink" data-a="msgOpen" data-v="${id}|${sc}|${mod}">Voltar</button></div></div>`,sh=>$('#mrY',sh).addEventListener('click',()=>{MSGS.unshift(msgMk({t:m.t,m:m.m,aud:m.aud,n:m.n,ch:m.ch.slice(),st:'en',off:0,tm:new Date().toTimeString().slice(0,5),origin:m.origin}));S.msg.f='en';closeSheet().then(()=>{softRender();toast('success','Mensagem reenviada',m.aud);});}));},
 nwAct:v=>{const [id,st]=v.split('|'),r=LSD.comunicacao['Notícias'].rows.find(x=>x.id===id);r.st=st;closeSheet().then(()=>{softRender();toast('success',{pb:'Notícia publicada',wd:'Notícia retirada'}[st]||'Notícia atualizada',r.n);});},
 bnToggle:id=>{const r=BN.find(x=>x.id===id),on=BN.filter(x=>x.st==='at').length;if(r.auto){toast('info','Banner automático','O banner da live aparece sozinho enquanto há transmissão.');return;}if(r.st==='in'&&on>=5){toast('error','Já são 5 banners ativos','Desative um para ativar este.');return;}r.st=r.st==='at'?'in':'at';r.d[1][1]=r.st==='at'?'Carrossel do início do app':'Fora do carrossel';closeSheet().then(()=>{softRender();toast('success',r.st==='at'?'Banner ativo':'Banner desativado',r.n);});},
 chToggle:id=>{const r=CH.find(x=>x.id===id);r.st=r.st==='at'?'in':'at';closeSheet().then(()=>{softRender();toast('success',r.st==='at'?'Visível no app':'Oculto no app',r.n);});},
 chCopy:id=>{const r=CH.find(x=>x.id===id);try{navigator.clipboard.writeText(r.link);}catch(e){}toast('success','Link copiado',r.link);}
});
/* as seções */
const nwExtra=r=>{const ed=can('comunicacao','editar');if(!ed)return '';const b=[];if(r.st==='rs'||r.st==='wd')b.push(`<button class="btn primary md block" data-a="nwAct" data-v="${r.id}|pb">Publicar</button>`);if(r.st==='pb')b.push(`<button class="btn outline md block" data-a="nwAct" data-v="${r.id}|wd">Retirar</button>`);if(r.st==='ex')b.push(`<button class="btn primary md block" data-a="nwAct" data-v="${r.id}|pb">Renovar e publicar</button>`);return b.length?`<div class="stack g3">${b.join('')}</div>`:'';};
LSD.comunicacao={
 'Notícias':{noun:'notícias',ST:NW_ST,acts:[],extra:nwExtra,rows:NEWS},
 'Mensagens':{custom:()=>msgBody('all','comunicacao'),newFlow:()=>msgNewSheet('all','comunicacao')},
 'Banners':{noun:'banners',ST:{at:['ok','Ativo'],in:['off','Inativo']},acts:[],extra:r=>can('comunicacao','editar')?`<button class="btn ${r.st==='at'?'outline':'primary'} md block" data-a="bnToggle" data-v="${r.id}">${r.auto?'Banner da live (automático)':r.st==='at'?'Desativar':'Ativar'}</button><p class="vs">Ordem de exibição e novo banner ficam na web.</p>`:'',rows:BN},
 'Transmissões':{noun:'canais',ST:{at:['ok','Visível no app'],in:['off','Oculto no app']},acts:[],extra:r=>`<button class="btn outline md block" data-a="chCopy" data-v="${r.id}">Copiar o link</button>${can('comunicacao','editar')?`<button class="btn ${r.st==='at'?'outline':'primary'} md block" data-a="chToggle" data-v="${r.id}">${r.st==='at'?'Ocultar no app':'Mostrar no app'}</button>`:''}<p class="vs">Novo canal e horários ficam na web. A transmissão ao vivo é automática, pela grade.</p>`,rows:CH}};
gMod('comunicacao')[5]=['Notícias','Mensagens','Banners','Transmissões'];
LEDE_DYN['comunicacao|Banners']=()=>BN.filter(b=>b.st==='at').length+' de 5 ativos';
LEDE_DYN['comunicacao|Mensagens']=()=>{const n=msgScope('all').filter(m=>m.st==='ag').length;return n?n+(n===1?' agendada':' agendadas'):'Envios e novo envio';};
Object.defineProperty(GPEND,'comunicacao',{configurable:true,enumerable:true,get:()=>[['Mensagens falharam',MSGS.filter(m=>m.st==='fa'&&m.origin==='Comunicação').length,3],['Notícias em rascunho',NEWS.filter(n=>n.st==='rs').length]].filter(x=>x[1]>0)});
