/* ---------- APP ---------- */
const upcoming=()=>EVENTS.filter(e=>evKey(e)>=todayKey).sort((a,b)=>evKey(a)-evKey(b));
const poster=e=>`<button class="poster gr-${e.g}" data-a="event" data-v="${e.id}" aria-label="${esc(e.t)}"><div class="top">${tag(e.tone,e.cat,true)}${dateblk(e)}</div><div class="bot"><h4>${esc(e.t)}</h4><div class="meta"><span>${ic('clock',14)}${WD[dow(e.y,e.m,e.d)]} · ${e.h}</span><span>${ic('pin',14)}${esc(e.p)}</span></div>${S.rsvp[e.id]?status('success','Confirmado'):''}</div></button>`;

V.home=()=>{const up=upcoming();const r=ROLES[S.role];return{sb:'var(--ink)',tabs:'home',html:`${appHead(`<div class="row between" style="align-items:center"><div class="stack g2"><p class="eyebrow">${S.church.name}</p><h1 class="t1">${S.role==='visitante'?'Seja bem-vindo!':'Olá, '+esc(S.user.first)+'!'}</h1></div><button class="avatar tap" style="${tone('ceu')};border:0" data-a="tab" data-v="mais" aria-label="Abrir perfil">${initials(S.user.name)}<span class="online"></span></button></div>`)}
 ${S.role==='visitante'?visitorCard():''}${svcHome()}${(()=>{const n=S.role==='visitante'?0:S.escalas.filter(x=>x.st==='pendente').length+S.discs.filter(x=>x.st==='pendente').length+invPend();return n?`<div class="pad" style="margin:-6px 0 20px"><button class="pendpill" data-a="goPending"><span class="pcount">${n}</span><span class="grow">${n>1?n+' respostas pendentes':'1 resposta pendente'} na agenda</span>${ic('chevR',16,2.25)}</button></div>`:'';})()}
 <div class="stack g8">
  <div>
   <div class="carousel" id="car">
    <div class="slide gr-brasa" data-a="event" data-v="e11" role="button" tabindex="0"><span class="eyebrow" style="color:#fff">18 a 20 de outubro</span><h3>Conferência Anual 2026</h3><p>Seja da Partida. Três noites com preletores convidados.</p><button class="btn onmedia sm" data-a="event" data-v="e11">Inscrever-se</button></div>
    <div class="slide gr-mar" data-a="event" data-v="e12" role="button" tabindex="0"><span class="eyebrow" style="color:#c7ebea">Próxima turma · 25 out</span><h3>Batismo nas Águas</h3><p>Quer dar esse passo? A classe começa no domingo.</p><button class="btn onmedia sm" data-a="event" data-v="e12">Quero me batizar</button></div>
    <div class="slide gr-vinho" data-a="live" role="button" tabindex="0"><span class="eyebrow" style="color:#ffcdbd">Domingo · 18h30</span><h3>Culto ao vivo</h3><p>Assista de onde estiver e participe pelo chat.</p><button class="btn onmedia sm" data-a="live">Me lembrar</button></div>
   </div>
   <div class="dots" id="dots"><span class="on"></span><span></span><span></span></div>
  </div>
  <nav class="pad jump" aria-label="Atalhos">
   ${(S.role==='visitante'?[['Agenda','tab','agenda',0],['Casas','tab','grupos',0],['Pregações','sub','nxPregs',0],['Vídeos','sub','nxVideos',0],['Séries','sub','nxSeries',0],['Músicas','sub','nxSongs',0],['Oração','prayer','',0],['Quem somos','sub','quemSomos',0],['Ao vivo','sub','aoVivo','live']]:[['Agenda','tab','agenda',S.escalas.filter(x=>x.st==='pendente').length+S.discs.filter(x=>x.st==='pendente').length+invPend()],['Grupos','tab','grupos',0],['Cursos','tab','cursos',0],['Pregações','sub','nxPregs',0],['Vídeos','sub','nxVideos',0],['Séries','sub','nxSeries',0],['Músicas','sub','nxSongs',0],['Oração','prayer','',0],['Contribuir','give','',0],['Apresentações','sub','bebes',0],['Ao vivo','sub','aoVivo','live']]).map(j=>`<button class="jw" data-a="${j[1]}" data-v="${j[2]}"><span>${j[0]}</span>${j[3]==='live'?'<sup class="jlive" aria-label="ao vivo agora"></sup>':j[3]?`<sup aria-label="${j[3]} pendentes">${j[3]}</sup>`:''}</button>`).join('')}
  </nav>
  <section class="pad stack g3">
   <div class="row g3" style="align-items:stretch">
    ${S.role==='visitante'?`<div class="cta gr-lima grow" style="color:#010f12">${S.igFila?`<div><h3>Você está na fila</h3><p>${S.igFila}º para a próxima integração</p></div><button class="btn dark md" data-a="igLeave">Sair da fila</button>`:`<div><h3>Quero fazer parte</h3><p>Conheça o caminho para ser membro</p></div><button class="btn dark md" data-a="wantMember">Começar</button>`}</div>`:`<div class="cta gr-lima grow" style="color:#010f12"><div><h3>Contribuir</h3><p>Dízimos, ofertas e missões</p></div><button class="btn dark md" data-a="sub" data-v="contribuir">Contribuir</button></div>`}
    <div class="cta gr-vinho grow" style="color:#fff"><div><h3>Pedido de oração</h3><p>Nossa equipe ora por você</p></div><button class="btn onmedia md" data-a="prayer">Pedir oração</button></div>
   </div>
   <div class="card row g3" style="padding:16px;border-radius:var(--r-md)"><span class="iconbox" style="${tone('salvia')}">${ic('message',22)}</span><div class="grow stack" style="gap:2px"><span class="it-title">Assistente no WhatsApp</span><span class="it-sub">Tire dúvidas a qualquer hora</span></div><button class="btn secondary sm" data-a="whats">Conversar</button></div>
  </section>
 </div>`};};

/* agenda */
const MK={petroleo:'var(--mk-menta)',damasco:'var(--mk-warn)',ambar:'var(--mk-warn)',rosado:'var(--mk-rosa)',salvia:'var(--mk-menta)',brasa:'var(--pal-brasa)',menta:'var(--mk-menta)',oceano:'var(--mk-oceano)',vinho:'var(--mk-vinho)',lima:'var(--mk-lima)',laranja:'var(--pal-laranja)',ceu:'var(--mk-oceano)'};
function monthSummary(){const {y,m}=S.ag;const ev=EVENTS.filter(e=>e.y===y&&e.m===m).length;const es=S.escalas.filter(e=>e.y===y&&e.m===m&&e.st!=='recusado').length;const bl=S.blocks.filter(b=>{const A=KD(b.a),B=KD(b.b);return (A.y*100+A.m)<=(y*100+m)&&(B.y*100+B.m)>=(y*100+m);}).length;
 return [ev?ev+(ev>1?' eventos':' evento'):'Nenhum evento',es?es+(es>1?' escalas suas':' escala sua'):'',bl?bl+(bl>1?' bloqueios':' bloqueio'):''].filter(Boolean).join(' · ');}
function calendarHTML(anim){
 const {y,m,sel}=S.ag;const first=dow(y,m,1);const days=new Date(y,m,0).getDate();const prevDays=new Date(y,m-1,0).getDate();
 let cells=['D','S','T','Q','Q','S','S'].map((d,i)=>`<span class="dow${i===0?' sun':''}">${d}</span>`).join('');
 for(let i=first-1;i>=0;i--)cells+=`<span class="day out" aria-hidden="true"><span class="n">${prevDays-i}</span></span>`;
 for(let d=1;d<=days;d++){const k=K(y,m,d);const ev=EVENTS.filter(e=>evKey(e)===k);const esc_=S.escalas.some(x=>K(x.y,x.m,x.d)===k&&x.st!=='recusado');
  const cls=['day',blockedAt(k)?'blocked':'',ev.length?'has':'',k===todayKey?'today':'',d===sel?'sel':'',k<todayKey?'past':'',esc_?'mine':''].join(' ');
  cells+=`<button class="${cls}" data-a="pickDay" data-v="${d}" aria-label="${d} de ${MONTHS[m-1]}${ev.length?', '+ev.length+(ev.length>1?' eventos':' evento'):''}${esc_?', você está escalado':''}${k===todayKey?', hoje':''}" ${d===sel?'aria-pressed="true"':''}><span class="n">${d}</span><span class="mk">${invMine().some(h=>h.y===y&&h.m===m&&h.d===d&&h.st!=='recusado')?'<i style="background:var(--brand)"></i>':''}${ev.slice(0,3).map(e=>`<i style="background:${MK[e.tone]||'var(--ink-muted)'}"></i>`).join('')}</span></button>`;}
 const tot=first+days;const trail=(7-tot%7)%7;for(let d=1;d<=trail;d++)cells+=`<span class="day out" aria-hidden="true"><span class="n">${d}</span></span>`;
 const cats=[...new Map(EVENTS.filter(e=>e.y===y&&e.m===m).map(e=>[e.cat,e.tone])).entries()];
 return `<div class="card cal" id="cal"><div class="cal-grid ${anim||''}" id="calGrid">${cells}</div>
  <div class="cal-foot">${cats.length?cats.map(([c,t])=>`<span class="lg"><i style="background:${MK[t]}"></i>${c}</span>`).join(''):'<span class="lg">Sem eventos neste mês</span>'}<span class="lg"><i class="lg-mine"></i>Sua escala</span></div></div>`;
}

const EVPPL=['Ana Costa','Bruno Reis','Clara Nunes','Diego Faria','Elisa Moura','Felipe Andrade','Helena Duarte','Igor Santana'];
const evAvs=e=>`<span class="ev-avs">${[0,1,2].map(i=>{const n=EVPPL[(e.d+i*3)%EVPPL.length];return `<span style="${tone(['ceu','menta','damasco','lima','rosado'][(e.d+i)%5])}">${initials(n)}</span>`;}).join('')}</span><span class="ev-n">${e.n>999?(e.n/1000).toFixed(1).replace('.',',')+' mil':e.n} vão</span>`;
const evRel=(e,base)=>{const dd=Math.round((new Date(e.y,e.m-1,e.d)-new Date(Math.floor(base/10000),Math.floor(base/100)%100-1,base%100))/864e5);return dd===1?'Amanhã':dd<7?`Em ${dd} dias`:dd<14?'Semana que vem':`Em ${Math.round(dd/7)} semanas`;};
const evWeekLbl=(e,base)=>{const b=new Date(Math.floor(base/10000),Math.floor(base/100)%100-1,base%100),d=new Date(e.y,e.m-1,e.d),sow=x=>{const c=new Date(x);c.setDate(c.getDate()-c.getDay());c.setHours(0,0,0,0);return c.getTime();},w=Math.round((sow(d)-sow(b))/(7*864e5));return w<=0?'Ainda esta semana':w===1?'Próxima semana':'Mais adiante';};
const evCard=(e,base,i)=>`<button class="ev-c ev-min" data-a="event" data-v="${e.id}" style="--t:var(--tone-${e.tone});--i:${i}"><span class="ev-dt"><b>${e.d}</b><small>${WD[dow(e.y,e.m,e.d)].toLowerCase()}</small></span>
 <span class="grow stack" style="gap:3px;min-width:0;align-items:flex-start"><span class="ev-t"><i class="ev-tdot"></i>${esc(e.t)}</span><span class="ev-m">${e.h}<span class="ev-dot"></span><span class="ev-pl">${esc(e.p)}</span></span></span>
 ${S.rsvp[e.id]?`<span class="ev-go">${ic('check',12,3)}Vou</span>`:`<span class="ev-chev">${ic('chevR',16,2)}</span>`}</button>`;
const evHero=e=>`<button class="ev-hero" data-a="event" data-v="${e.id}" style="--t:var(--tone-${e.tone});--ti:var(--tone-${e.tone}-ink)"><span class="ev-hc"><span class="ev-cat light"><i></i>${esc(e.cat)}</span><span class="ev-ht">${esc(e.t)}</span><span class="ev-hm">${ic('clock',14,2)}${e.h}<span class="ev-dot"></span>${ic('pin',14,2)}${esc(e.p)}</span></span>
 <span class="ev-hf">${evAvs(e)}<span class="ev-hb">${S.rsvp[e.id]?`${ic('check',14,3)}Você vai`:`Ver detalhes${ic('arrowR',14,2)}`}</span></span></button>`;
const apbFor=e=>typeof S!=='undefined'&&S.apb?S.apb.datas.find(d=>d.y===e.y&&d.m===e.m&&d.d===e.d):null;
const apbOpen=d=>d&&d.used<d.vagas&&apbDays(d)>=S.apb.prazo;
const apbChip=e=>{const d=apbFor(e);if(!d||S.role==='visitante')return '';const l=d.vagas-d.used;return `<span class="ev-apb ${apbOpen(d)?'':'off'}">${ic('pacifier',12,2)}Apresentações · ${apbOpen(d)?(l===1?'1 vaga':l+' vagas'):d.used>=d.vagas?'esgotado':'encerrado'}</span>`;};
const apbEvBlock=e=>{const d=apbFor(e);if(!d||S.role==='visitante')return '';const ok=apbOpen(d),l=d.vagas-d.used;return `<div class="apb-evb"><span class="apb-av">${ic('pacifier',18,1.8)}</span><div class="grow stack" style="gap:2px"><span class="it-title">Apresentação de bebês</span><span class="it-sub">${ok?`Neste culto · ${l===1?'1 vaga':l+' vagas'}`:d.used>=d.vagas?'Vagas esgotadas neste culto':'Pedidos encerrados para este culto'}</span></div>${ok?`<button class="btn primary sm" data-a="apbFromEv" data-v="${d.id}">Agendar</button>`:''}</div>`;};
const evRow=e=>`<button class="item" data-a="event" data-v="${e.id}">${dateblk(e,true)}<span class="grow stack" style="gap:2px"><span class="it-title">${esc(e.t)}</span><span class="it-sub">${e.h} · ${esc(e.p)}</span></span>${S.rsvp[e.id]?status('success','Vou'):tag(e.tone,e.cat,true)}</button>`;
function limUse(y,m){const l=S.escalas.filter(x=>x.y===y&&x.m===m&&x.st!=='recusado'),reg=l.filter(x=>!x.over).length,ex=l.filter(x=>x.over).length,pend=l.filter(x=>x.st==='pendente').length;return {reg,ex,pend,tot:l.length,lim:S.lim.church,pref:S.lim.pref};}
function limCard(){const y=2026,m=10,u=limUse(y,m),full=u.reg>=u.lim,mon=MONTHS[m-1];const cap=u.pref&&u.pref<u.lim?u.pref:u.lim;
 const sub=u.ex?`Você chegou no limite. ${u.ex===1?'1 convite chegou':u.ex+' convites chegaram'} como exceção: tudo bem recusar.`:full?'Você chegou no limite. Novos convites só chegam como exceção, com aviso.':u.lim-u.reg===1?'Falta 1 para o seu limite do mês.':`Cabem mais ${u.lim-u.reg} neste mês.`;
 return `<section class="lim-card ${u.ex?'ov':full?'full':''}" aria-label="Seu mês servindo"><div class="row between g3"><span class="eb2" style="color:inherit;opacity:.8">Seu mês servindo</span><span class="lim-mo">${mon}</span></div>
  <div class="row g3" style="align-items:flex-end"><span class="lim-big">${u.reg}<small>/${u.lim}</small></span><div class="lim-dots" aria-hidden="true">${Array.from({length:Math.max(u.lim,u.tot)},(_,i)=>`<i class="${i<u.reg?'on':i<u.lim?'':'ex'}${i>=cap&&i<u.lim?' pf':''}"></i>`).join('')}</div></div>
  <p class="lim-sub">${sub}</p>
  <div class="lim-foot"><span>${ic('users',14,2)}Limite da igreja: ${u.lim} por mês</span><button type="button" class="lim-pref" data-a="limPref">${ic('heart',14,2)}${u.pref?'Prefiro até '+u.pref:'Definir preferência'}</button></div></section>`;}

const ST2=(k,t)=>`<span class="st2 ${k}"><i></i>${t}</span>`;
const MINTONE={Louvor:'laranja','Recepção':'menta',Infantil:'ambar',Kids:'ambar',Jovens:'lima',Intercessão:'vinho'};
function escCard(x,i){const k=K(x.y,x.m,x.d),bl=blockedAt(k),o=KD(k),tn=MINTONE[x.min]||'ceu',off=x.st==='recusado';
 return `<article class="ev-c es2 ${off?'off':''} ${x.over&&!off?'lim-ov':''}" style="--t:var(--tone-${tn});--i:${i}">
  <div class="es2-r"><span class="ev-dt"><b>${o.d}</b><small>${WD[dow(o.y,o.m,o.d)].toLowerCase()}</small></span>
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-cat"><i></i>${esc(x.min)}<em>· ${x.h}</em></span><span class="ev-t">${esc(x.fn)}</span><span class="ev-m">${esc(x.what||x.area)}</span></span>
   ${x.st==='confirmado'?ST2('ok','Aceito'):off?ST2('mute','Recusado'):ST2('warn','Pendente')}</div>
  ${x.id==='s0'?svcBox():''}
  ${x.over&&!off?`<div class="lim-note">${ic('alert',16,2.2)}<div><b>Acima do seu limite do mês</b><span>${x.st==='confirmado'?'Você topou servir além do limite. Obrigado!':`O líder pediu mesmo assim${x.why?': “'+esc(x.why)+'”':''}. Tudo bem recusar.`}</span></div></div>`:''}
  ${bl&&!off?`<div class="es2-warn">${ic('alert',14,2)}Conflita com seu bloqueio de ${fmtK(bl.a)}${bl.a!==bl.b?' a '+fmtK(bl.b):''}</div>`:''}
  ${x.st==='pendente'?`<div class="es2-a"><button class="btn primary sm" data-a="escalaOk" data-v="${x.id}">Aceitar</button><button class="btn ghost2 sm" data-a="escalaNo" data-v="${x.id}">Recusar</button></div>`:x.st==='confirmado'?`<div class="es2-a"><button class="tlink sm2" data-a="escalaNo" data-v="${x.id}">Pedir troca</button></div>`:''}
 </article>`;}
function discCard(x,i){const k=K(x.y,x.m,x.d),o=KD(k),off=x.st==='recusado';
 return `<article class="ev-c es2 ${off?'off':''}" style="--t:var(--tone-${x.tone||'ceu'});--i:${i}">
  <div class="es2-r"><span class="ev-dt"><b>${o.d}</b><small>${WD[dow(o.y,o.m,o.d)].toLowerCase()}</small></span>
   <span class="grow stack" style="gap:4px;min-width:0;align-items:flex-start"><span class="ev-cat"><i></i>${esc(x.who.split(' ').slice(0,2).join(' '))}<em>· ${x.h}</em></span><span class="ev-t">${esc(x.theme)}</span><span class="ev-m">${ic(x.remote?'monitor':'pin',13,2)}<span class="ev-pl">${esc(x.place)}</span></span></span>
   ${x.st==='aceito'?ST2('ok','Aceito'):off?ST2('mute','Recusado'):ST2('warn','Aguardando')}</div>
  ${x.st==='pendente'?`<div class="es2-a"><button class="btn primary sm" data-a="discOk" data-v="${x.id}">Aceitar</button><button class="btn ghost2 sm" data-a="discNo" data-v="${x.id}">Recusar</button></div>`:x.st==='aceito'&&x.remote?`<div class="es2-a"><button class="tlink sm2" data-a="joinCall">${ic('monitor',14,2)}Entrar na chamada</button></div>`:''}
 </article>`;}
function agendaTab(){
 const t=S.ag.tab;
 if(t==='Eventos'){const {y,m,sel}=S.ag;const k=y*10000+m*100+sel;const day=EVENTS.filter(e=>evKey(e)===k);const nxt=EVENTS.filter(e=>evKey(e)>Math.max(k,todayKey-1)&&evKey(e)!==k).sort((a,b)=>evKey(a)-evKey(b)).slice(0,6);
  const grp={};nxt.forEach(e=>{const g=evWeekLbl(e,k);(grp[g]=grp[g]||[]).push(e);});
  return `<div class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">${k===todayKey?'Hoje · ':''}${WD[dow(y,m,sel)].toLowerCase()}, ${sel} de ${MONTHS[m-1]}</p>${dvEv(k)}${day.length?day.map(evHero).join(''):dvHasK(k)?'':`<div class="ev-none"><span>${ic('calendar',20)}</span><div class="stack" style="gap:2px"><b>Dia livre</b><span>Nada marcado. Que tal descansar ou chamar alguém para um café?</span></div></div>`}</div>
   ${nxt.length?Object.entries(grp).map(([g,l])=>`<div class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">${g}</p><div class="ev-list">${l.map((e,i)=>evCard(e,k,i)).join('')}</div></div>`).join(''):'<p class="callout">Nenhum evento depois desta data.</p>'}`;}
 if(t==='Escalas'){const seg=`<div class="utabs ul esub" role="tablist">${[['minhas','Minhas escalas'],['disp','Disponibilidade']].map(z=>`<button type="button" aria-selected="${(S.ag.esub||'minhas')===z[0]}" data-a="esSub" data-v="${z[0]}">${z[1]}${z[0]==='disp'&&S.blocks.length?`<small>${S.blocks.length}</small>`:''}</button>`).join('')}</div>`;if(S.ag.esub==='disp')return seg+dispoHTML();return `${seg}${limCard()}<div class="stack g3"><p class="eb2">Minhas escalas de serviço</p>${S.escalas.map(escCard).join('')}</div>`;}
 if(t==='Discipulado'){return `<div class="stack g3"><p class="eb2">Encontros de discipulado</p><div class="ev-list">${S.discs.map(discCard).join('')}</div></div>`;}
 if(t==='Devocional')return dvTab();
 if(t==='Acompanhamento')return careBody();
 return dispoHTML();
}
function dispoHTML(){
 const bl=[...S.blocks].sort((p,q)=>p.a-q.a);
 return `<div class="stack g5"><p class="callout" style="margin:0">Bloqueie os períodos em que você não pode ser escalado. Vale para qualquer ministério (Louvor, Kids, Recepção, Estacionamento…). Quem monta a escala verá o conflito.</p>
  <button class="btn primary block" data-a="newBlock">Bloquear período</button>
  <div class="stack g3"><p class="eb2">Meus bloqueios${bl.length?' · '+bl.length:''}</p>
  ${bl.length?bl.map(x=>{const n=daysBetween(x.a,x.b);const A=KD(x.a),B=KD(x.b);return `<article class="card row g4" style="padding:16px 18px;border-radius:var(--r-lg);align-items:center"><div class="blkdate"><b>${A.d}${x.a!==x.b?'–'+B.d:''}</b><small>${MON3[A.m-1]}${A.m!==B.m?'/'+MON3[B.m-1]:''}</small></div><div class="grow stack" style="gap:3px"><span class="it-title">${x.a===x.b?fmtK(x.a):fmtK(x.a)+' a '+fmtK(x.b)}</span><span class="it-sub">${n} ${n>1?'dias':'dia'}${x.note?' · '+esc(x.note):''}</span>${x.why?`<span>${tag(x.why==='Viagem'?'ceu':x.why==='Trabalho'?'ambar':x.why==='Família'?'rosado':'salvia',x.why,true)}</span>`:''}</div><button class="tlink" data-a="rmBlock" data-v="${x.id}" aria-label="Remover bloqueio">Remover</button></article>`;}).join('')
  :`<div class="card" style="padding:28px 18px;border-radius:var(--r-lg);text-align:center"><p class="callout" style="margin:0">Nenhum período bloqueado.</p><p class="foot" style="margin:4px 0 0">Você pode ser escalado em qualquer data.</p></div>`}</div></div>`;
}
V.agenda=()=>{const {y,m}=S.ag;const isNow=y===TODAY.y&&m===TODAY.m&&S.ag.sel===TODAY.d;return{sb:'var(--ink)',tabs:'agenda',html:`${appHead(`<div class="agh"><div class="row between" style="min-height:48px"><p class="eyebrow">Agenda</p><div class="mnav ${isNow?'':'has-today'}" role="group" aria-label="Trocar mês"><button data-a="month" data-v="-1" aria-label="Mês anterior" ${y*100+m<=202609?'disabled':''}>${ic('chevL',18,2.5)}</button><span></span><button class="mtoday" data-a="goToday" ${isNow?'tabindex="-1" aria-hidden="true"':''}>Hoje</button><span class="s2"></span><button data-a="month" data-v="1" aria-label="Próximo mês">${ic('chevR',18,2.5)}</button></div></div><h1 class="mtitle" id="mTitle"><span class="mname">${MONTHS[m-1]}</span> <span class="myear">${y}</span></h1>
  <p class="msum" id="mSum">${monthSummary()}</p></div>`,['#07486e','#6da8a7'])}
 <div class="pad stack g5">${calendarHTML()}
  ${S.role==='visitante'?'':`${agTabsHTML()}`}
  <div class="stack g6" id="agBody">${agendaTab()}</div>
 </div>`};};

/* grupos */
function casasList(){const q=S.gr.q.toLowerCase();const l=CASAS.filter(c=>!q||(c.t+' '+c.addr+' '+(c.tags||[]).join(' ')).toLowerCase().includes(q));
 if(!l.length)return `<div class="empty"><span class="it-title" style="color:var(--ink)">Nenhuma Casa encontrada</span><span class="callout">Tente outro bairro ou limpe a busca.</span><button class="link" data-a="clearQ">Limpar busca</button></div>`;
 return `<div class="chlist">${l.map(c=>{const st=S.joined[c.id]?['Pedido enviado','var(--brand-text)']:c.open?null:['Lotada','var(--mk-warn)'];return `<button class="chrow" data-a="group" data-v="${c.id}"><span class="chdot" style="background:${c.open?'var(--mk-lima)':'var(--mk-warn)'}"></span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${c.t.replace('Casa ','')}</span>${st?`<span class="chl" style="color:${st[1]}">${st[0]}</span>`:''}</span><span class="chm">${c.day.replace('-feira','')} · ${c.h} · ${c.km} km · ${c.n} membros</span>${(c.tags||[]).length?`<span class="row" style="gap:6px;flex-wrap:wrap;margin-top:4px">${c.tags.map(t=>`<span class="chl">${t}</span>`).join('')}</span>`:''}</span><span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span></button>`;}).join('')}</div>`;}
V.grupos=()=>({sb:'var(--ink)',tabs:'grupos',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Comunhão</p><h1 class="t1">Grupos</h1><p class="callout">Casas de Apascentamento e ministérios para você pertencer e servir.</p></div>`,['#008582','#b1e454'])}
 <div class="pad stack g5">
  <div class="utabs ul" role="tablist">${[['Casas','Casas'],['Ministérios','Ministérios']].map(t=>`<button role="tab" aria-selected="${S.gr.tab===t[0]}" data-a="grTab" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
  ${S.gr.tab==='Casas'?`<div class="fbox" style="min-height:48px">${ic('search',20)}<input id="grQ" type="search" placeholder="Buscar por bairro, endereço ou tag" value="${esc(S.gr.q)}" aria-label="Buscar Casa"></div>
   <div class="stack g2"><p class="eb2">Casas de Apascentamento · ${CASAS.length}</p><div id="casas">${casasList()}</div></div>`
  :`<div class="stack g2"><p class="eb2">Ministérios · ${MINIS.length}</p><div class="chlist">${MINIS.map(mi=>`<button class="chrow" data-a="mini" data-v="${mi.id}"><span class="mico" style="color:${MK[mi.tone]||'var(--tone-'+mi.tone+'-ink)'}">${ic(mi.i,24,1.6)}</span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${mi.t}</span>${S.serving[mi.id]?'<span class="chl">Interesse enviado</span>':''}</span><span class="chm">${mi.s}</span></span><span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span></button>`).join('')}</div></div>`}
 </div>`});

/* cursos */
const pct=c=>Math.round(c.done/c.lessons.length*100);
/* minhas trilhas (discipulado): mesmos cartões dos cursos; tudo em etapas; quem conclui é o próprio discípulo */
S.trail=[
 {k:'Jornada',t:'Primeiros passos',courses:['fund','oracao'],g:'mar'},
 {k:'Curso',t:'Liderança Cristã',course:'lider',g:'vinho'},
 {k:'Pregação',t:'Série: Frutos do Espírito',n:3,done:1,g:'brasa'},
 {k:'Música',t:'Grande é o Senhor',n:1,done:0,g:'lima',note:'Ouvir antes do nosso próximo encontro'},
 {k:'Curso',t:'Evangelismo na Prática',course:'evang',g:'brasa',from:'Acompanhamento'}
];
const trProg=it=>it.courses?{n:it.courses.length,done:it.courses.filter(id=>COURSES[id].done===COURSES[id].lessons.length).length}:it.course?{n:COURSES[it.course].lessons.length,done:COURSES[it.course].done}:{n:it.n,done:it.done};
const trailHtml=()=>`<div class="stack g4"><p class="callout">Itens que o seu discipulador ou quem acompanha você separou, na ordem. Cada um é contado em etapas.</p>${S.trail.map((it,i)=>{const {n,done}=trProg(it),p=Math.round(done/n*100),fin=done>=n;
 return `<article class="card" style="overflow:hidden"><div class="course-top gr-${it.g}" style="${it.g==='lima'?'color:#010f12':''}"><span class="eyebrow" style="color:inherit;opacity:.85">${it.k} · ${i+1} de ${S.trail.length}${it.from?' · '+it.from:''}</span><h3 class="t2" style="text-transform:uppercase;font-weight:800;letter-spacing:-.03em">${esc(it.t)}</h3></div>
 <div class="stack g3" style="padding:16px"><div class="row between"><span class="callout">${fin?'Todas as etapas concluídas':`${done} de ${n} ${n===1?'etapa':'etapas'}`}</span><b style="font-variant-numeric:tabular-nums">${p}%</b></div><div class="bar"><i style="width:${p}%"></i></div>
 ${it.courses?`<div class="stack" style="gap:4px">${it.courses.map(id=>{const c=COURSES[id],f=c.done===c.lessons.length;return `<span class="callout" style="display:flex;gap:8px;align-items:center"><span style="width:16px;text-align:center">${f?ic('check',13,2.6):'○'}</span>${esc(c.t)}</span>`;}).join('')}</div>`:''}
 ${it.note?`<p class="callout" style="font-style:italic;margin:0">${esc(it.note)}</p>`:''}
 ${it.courses?`<button type="button" class="tlink" data-a="cmtSheet" data-v="journey:${esc(it.t)}">Comentários (${(S.cmts['journey:'+it.t]||[]).length})</button>`:''}
 ${fin?`<div class="row between">${status('success','Concluído')}</div>`
  :it.courses||it.course?`<button class="btn primary block md split" data-a="openCourse" data-v="${it.course||it.courses.find(id=>COURSES[id].done<COURSES[id].lessons.length)}"><span>${done?'Continuar':'Começar'}</span><span class="meta">Etapa ${done+1}</span></button>`
  :`<button class="btn primary block md" data-a="trStep" data-v="${i}">${done?'Continuar':'Abrir'}</button>`}</div></article>`;}).join('')}</div>`;
V.cursos=()=>{const act=Object.values(COURSES).filter(c=>c.started),cat=Object.values(COURSES).filter(c=>!c.started);return{sb:'var(--ink)',tabs:'cursos',html:`${appHead(`<div class="stack g2"><p class="eyebrow">Formação</p><h1 class="t1">Cursos e jornadas</h1><p class="callout">Crescimento espiritual no seu ritmo.</p></div>`,['#07486e','#a9c8da'])}
 <div class="pad stack g5">
  <div class="utabs ul" role="tablist">${[['andamento','Em andamento'],['catalogo','Catálogo'],['trilhas','Minhas trilhas']].map(t=>`<button role="tab" aria-selected="${S.cu.tab===t[0]}" data-a="cuTab" data-v="${t[0]}" style="font-size:14px">${t[1]}</button>`).join('')}</div>
  ${S.cu.tab==='trilhas'?trailHtml():S.cu.tab==='andamento'?(act.length?act.map(c=>{const p=pct(c),fin=c.done===c.lessons.length;return `<article class="card" style="overflow:hidden"><div class="course-top gr-${c.g}" style="${c.g==='lima'?'color:#010f12':''}"><span class="eyebrow" style="color:inherit;opacity:.85">${c.cat}</span><h3 class="t2" style="text-transform:uppercase;font-weight:800;letter-spacing:-.03em">${c.t}</h3></div><div class="stack g3" style="padding:16px"><div class="row between"><span class="callout">${fin?'Todas as aulas concluídas':`Aula ${c.done} de ${c.lessons.length}`}</span><b style="font-variant-numeric:tabular-nums">${p}%</b></div><div class="bar"><i style="width:${p}%"></i></div>${fin?`<div class="row between">${status('success','Concluído')}<button class="btn secondary md" data-a="openCourse" data-v="${c.id}">Rever curso</button></div>`:`<button class="btn primary block md split" data-a="openCourse" data-v="${c.id}"><span>${c.done?'Continuar':'Começar'}</span><span class="meta">Aula ${c.done+1}</span></button>`}</div></article>`;}).join(''):'')
  :(cat.length?`<div class="list">${cat.map(c=>`<div class="item" style="cursor:default"><span class="gr-${c.g}" style="width:56px;height:56px;border-radius:var(--r-sm);flex:none"></span><span class="grow stack" style="gap:2px"><span class="it-title">${c.t}</span><span class="it-sub">${c.cat} · ${c.lessons.length} aulas</span></span><button class="btn secondary sm" data-a="startCourse" data-v="${c.id}">Iniciar</button></div>`).join('')}</div>`:`<div class="empty"><span class="iconbox">${ic('award',22)}</span><span class="it-title" style="color:var(--ink)">Você já começou todos os cursos</span><span class="callout">Novos cursos aparecem aqui assim que forem publicados.</span></div>`)}
 </div>`};};

V.curso=()=>{const c=COURSES[S.cu.open];const total=c.lessons.length,fin=c.done===total,p=pct(c);const cur=S.cu.view!=null?S.cu.view:Math.min(c.done,total-1);const lt=c.lessons[cur],li=lessonInfo(lt);const isReview=cur<c.done;
 return{sb:'var(--ink)',tabs:'cursos',html:`${appHead(`<button class="iconbtn" data-a="back" aria-label="Voltar para Cursos">${ic('chevL',20,2.25)}</button><div class="stack g2" style="margin-top:8px"><p class="eyebrow">${c.cat}</p><h1 class="t1">${c.t}</h1><div class="row g3" style="margin-top:6px"><div class="bar grow"><i style="width:${p}%"></i></div><b style="font:700 13px/1 var(--font-text);font-variant-numeric:tabular-nums">${p}%</b></div></div>`,['#07486e','#b1e454'])}
 <div class="pad stack g6">
  ${fin&&S.cu.view==null?`<div class="cta gr-lima" style="color:#010f12;min-height:0;gap:10px;padding:24px">${ic('award',32,1.75)}<p class="serif" style="margin:0;font-size:40px;line-height:40px">Curso concluído</p><p style="margin:0;font:400 15px/20px var(--font-text)">Você assistiu às ${total} aulas de ${c.t}. Que caminhada.</p><div class="row g2" style="margin-top:6px"><button class="btn dark md" data-a="sub" data-v="documentos">Ver certificado</button><button class="btn md" style="background:rgba(1,15,18,.1);color:#010f12" data-a="shareCourse">Compartilhar</button></div></div>`
  :`<div class="stack g4">
   <div class="player gr-${c.g}" id="player"><span class="ttl">${esc(lt)}</span><button class="pbtn" data-a="play" aria-label="${S.cu.playing?'Pausar':'Assistir'}">${ic(S.cu.playing?'pause':'play',28,2.5)}</button><div class="pbar"><span id="pt">0:00</span><div class="bar"><i id="pp" style="width:0"></i></div><span>12:40</span></div></div>
   <div class="stack g2"><p class="eyebrow">Aula ${cur+1} de ${total}${isReview?' · revisão':''}</p><h2 class="t2">${esc(lt)}</h2><p class="body">${esc(li.d)}</p></div>
   <div class="verse"><div class="orb gr-aurora"></div><p>${esc(li.v)}</p><div class="ref">${li.r}</div></div>
   ${isReview?`<button class="btn secondary block" data-a="resumeLesson">Voltar para a aula ${Math.min(c.done+1,total)}</button>`:`<button class="btn primary block split" data-a="completeLesson"><span>Concluir aula</span><span class="meta">${cur+1<total?'Próxima: '+(cur+2):'Última'}</span></button>`}
  </div>`}
  ${fin&&S.cu.view==null?'':cmtHtml('lesson:'+c.id+':'+cur,'Comentários da aula')}
  <section class="stack g3"><p class="eyebrow" style="color:var(--ink-muted)">Aulas do curso</p>
   <div class="list">${c.lessons.map((l,i)=>{const st=i<c.done?'done':i===c.done?'cur':'lock';return `<button class="lesson ${st}" data-a="lesson" data-v="${i}"><span class="ck">${st==='done'?ic('check',14,3):st==='lock'?ic('lock',12,2.25):i+1}</span><span class="grow">${esc(l)}</span>${S.cu.view===i?'<span class="foot">vendo</span>':''}</button>`;}).join('')}</div>
  </section>
 ${cmtHtml('course:'+S.cu.open,'Comentários do curso')}
 </div>`};};

/* mais */
const MAIS_ITEMS=[['Meus dados','user','damasco','meusDados'],['Notificações','bell','ambar','notifs'],['Quem somos','church','brasa','quemSomos'],['Acompanhamento','care','rosado','cuidado'],['Contribuir','gift','lima','contribuir'],['Inscrições','ticket','laranja','inscricoes'],['Ao vivo','radio','brasa','aoVivo'],['Meus ministérios','flame','laranja','meusMin'],['Pedidos de oração','hands','vinho','oracao'],['Fale com a secretaria','phone','ceu','secretaria'],['Assistente no WhatsApp','message','salvia','assistente'],['Privacidade e dados','lock','oceano','privacidade']];
V.mais=()=>{const nN=S.notifs.filter(n=>n.unread).length,miss=ME_MISS(S.me).length,ins=S.insc.mine.filter(m=>m.st!=='cancelada').length,prW=S.prayers.filter(p=>p.st==='aguardando').length,care=S.care.next&&S.care.next.st==='pendente';
 const row=(label,v,meta,hot)=>`<button class="mrow" data-a="sub" data-v="${v}"><span class="mt">${label}</span>${meta?`<span class="mm ${hot?'hot':''}">${meta}</span>`:''}<span class="ma" aria-hidden="true">${ic('arrowR',16,2)}</span></button>`;
 const grp=(t,rows)=>`<section class="mgrp"><p class="eb2">${t}</p>${rows}</section>`;
 return{sb:'var(--ink)',tabs:'mais',html:`${appHead(`<button class="mhead" data-a="sub" data-v="meusDados">${pavM(S.user.name,'ceu','lg')}<span class="stack" style="align-items:flex-start;gap:2px"><span class="t2">${esc(S.user.name)}</span><span class="callout">${S.church.name}</span></span></button>`)}
 <div class="pad stack g8" style="padding-top:16px">
  ${canGestao()?vswitch('gestao'):''}
  ${S.role==='visitante'?'':ccMini()}
  ${grp('Você',row('Meus dados','meusDados',miss?miss+' dados faltando':'')+row('Notificações','notifs',nN?nN+(nN>1?' novas':' nova'):'',nN>0)+row('Privacidade e dados','privacidade',''))}
  ${grp('Sua caminhada',(S.role==='visitante'?row('Quero ser membro','secretaria',S.igFila?'Na fila · '+S.igFila+'º':'Primeiros passos'):row('Meus documentos','documentos',MYDOCS.length+(MYDOCS.length>1?' documentos':' documento'))+row('Meus ministérios','meusMin',MYMIN.length+' ministérios')+row('Minhas tarefas','tarefas',(()=>{const o=tkOpen(),l=o.filter(x=>(tkDue(x)||[])[0]==='danger').length;return o.length?o.length+(o.length>1?' em aberto':' em aberto'):'';})(),tkOpen().some(x=>(tkDue(x)||[])[0]==='danger')))+row('Meus empréstimos','meusEmp',MYLOANS.length+(MYLOANS.length>1?' itens':' item'),MYLOANS.some(lnLate))+row('Inscrições','inscricoes',ins?ins+(ins>1?' ativas':' ativa'):'')+row('Pedidos de oração','oracao',prW?prW+' aguardando':'')+(S.role==='visitante'?'':row('Apresentações','bebes',S.apb.pedidos.some(p=>p.st==='aguardando')?'Aguardando':'')+row('Batismo','batismo',S.bat.pedidos.some(p=>p.st==='aguardando')?'Aguardando':'')))}
  ${grp('Conteúdo',row('Pregações','nxPregs','')+row('Músicas','nxSongs','')+row('Material de apoio','nxMats',''))}
  ${['lider','admin'].includes(S.role)?grp('Liderança',row('Acompanhamentos','urgentes',URG.length+' urgentes',true)):''}
  ${grp('A igreja',row('Quem somos','quemSomos','')+row('Fale com a secretaria','secretaria','Seg a sex')+row('Assistente no WhatsApp','assistente',''))}
  <section class="stack g3">
   <section class="mgrp"><p class="eb2" style="margin-bottom:4px">Conta</p>
    <button class="mrow" data-a="switchChurch"><span class="chdot" style="background:${MK[S.church.tone==='ceu'?'oceano':S.church.tone]}"></span><span class="grow stack" style="gap:1px"><span class="chm">Igreja atual</span><span class="mt">${S.church.name.replace('Alva ','')}</span></span><span class="mm hotline">Trocar</span><span class="ma" aria-hidden="true">${ic('swap',16,2)}</span></button>
    
   </section>
   <button class="btn danger block md" data-a="logout">Sair da conta</button>
   <p class="foot" style="text-align:center;margin:4px 0 0">alva v2.0.0</p>
  </section>
 </div>`};};

