/* ---------- engine ---------- */
const tabsFor=()=>S.view==='gestao'?gTabs():S.role==='visitante'?TABS.filter(t=>t[0]!=='cursos'):TABS;
const TABS=[['home','home','Início'],['agenda','calendar','Agenda'],['grupos','users','Grupos'],['cursos','book','Cursos'],['mais','dots','Mais']];
const APP=['home','agenda','grupos','cursos','curso','mais'];
let resendTimer=null,playTimer=null,expTimer=null;
const AUTHS=['welcome','login','codeEmail','otp','signupStart','lookup','pickRecord','confirmEmail','noEmail','identity','signupForm'];
function dawnSky(on){
 const ph=$('#phone');if(!ph)return;let bg=$('#authBg');
 if(!bg){bg=document.createElement('div');bg.id='authBg';bg.className='authbg';bg.setAttribute('aria-hidden','true');
  bg.innerHTML='<div class="ab-veil v1"></div><div class="ab-veil v2"></div><div class="ab-veil v3"></div><div class="ab-horizon"></div>';
  ph.insertBefore(bg,$('#view'));}
 ph.classList.toggle('auth-on',on);ph.classList.toggle('auth-wel',on&&S.screen==='welcome');
}
function render(dir){
 clearInterval(playTimer);S.cu.playing=S.screen==='curso'?S.cu.playing:false;
 const out=V[S.screen]();const view=$('#view');
 const AMB={home:'home',agenda:'agenda',grupos:'grupos',cursos:'cursos',curso:'cursos',mais:'mais',church:'church',contribuir:'grupos',aoVivo:'home',quemSomos:'home',meusMin:'cursos',meusEmp:'mais',tarefas:'cursos',inscricoes:'home',assistente:'grupos',secretaria:'agenda',privacidade:'agenda',carteirinha:'mais',documentos:'mais'};
 view.innerHTML=`<div data-amb="${out.amb||AMB[S.screen]||(out.tabs==='mais'?'mais':'auth')}" class="screen ${out.tabs?'has-tabs':''} ${dir==='back'?'enter-back':dir==='none'?'':dir==='tab'?'enter-tab':'enter'}" id="scr">${out.html}</div>`;
 const sbar=$('.statusbar');sbar.style.setProperty('--sb',out.sb||'var(--ink)');sbar.style.setProperty('--sbbg','transparent');const scr=$('#scr');if(out.tabs)scr.addEventListener('scroll',()=>{sbar.style.setProperty('--sbbg',scr.scrollTop>40?'var(--glass)':'transparent');sbar.style.backdropFilter=scr.scrollTop>40?'blur(20px)':'none';},{passive:true});else sbar.style.backdropFilter='none';
 $('#tabbarSlot').innerHTML=out.tabs?`<nav class="tabbar" aria-label="Navegação principal">${tabsFor().map(t=>`<button class="tab" data-a="tab" data-v="${t[0]}" ${out.tabs===t[0]?'aria-current="page"':''}>${ic(t[1],24,out.tabs===t[0]?2.25:1.75)}${t[2]}</button>`).join('')}</nav>`:'';
 dawnSky(AUTHS.includes(S.screen));
 (HOOK[S.screen]||(()=>{}))();
 if(dir!=='none')motionIn();
 tabIndicator();
 railSync();
}
function go(s,opt={}){if(opt.replace)S.hist=[];else S.hist.push(S.screen);S.screen=s;$('#overlay').innerHTML='';render(opt.dir);}
function back(){S.screen=S.hist.pop()||'welcome';$('#overlay').innerHTML='';render('back');}
function softRender(){const sc=$('#scr');const top=sc?sc.scrollTop:0;render('none');const n=$('#scr');if(n)n.scrollTop=top;}
function ensureChurch(){if(!S.church)S.church=CHURCHES[0];}

/* ---------- hooks ---------- */
const HOOK={
 otp(){
  const box=$('#otp'),ins=$$('input',box),msg=$('#otpMsg'),att=$('#otpAtt');
  setTimeout(()=>ins[0]&&ins[0].focus({preventScroll:true}),320);
  if(!S.su.expAt)S.su.expAt=Date.now()+15*60000;
  clearInterval(expTimer);const tick=()=>{const e=$('#otpExp');if(!e){clearInterval(expTimer);return;}const left=Math.max(0,Math.round((S.su.expAt-Date.now())/1000));e.textContent='expira em '+Math.floor(left/60)+':'+String(left%60).padStart(2,'0');};tick();expTimer=setInterval(tick,1000);
  const lock=()=>{box.classList.add('locked');ins.forEach(i=>{i.disabled=true});msg.textContent='Tentativas esgotadas. Peça um novo código abaixo.';const r=$('#resend');clearInterval(resendTimer);r.disabled=false;r.textContent='Pedir novo código';};
  if(S.su.att<=0)lock();
  const code=()=>ins.map(i=>i.value).join('');
  const check=async()=>{const c=code();if(c.length<6)return;ins.forEach(i=>i.blur());
   if(c==='000000'){S.su.att--;att.textContent='Tentativas: '+S.su.att+' de 5';att.classList.toggle('warn',S.su.att<=2);box.classList.add('bad');box.classList.remove('shake');void box.offsetWidth;box.classList.add('shake');
    msg.textContent=S.su.att>0?'Código incorreto. Confira o e-mail e tente de novo.':'';
    await wait(900);ins.forEach(i=>{i.value='';i.classList.remove('filled')});box.classList.remove('bad');if(S.su.att<=0){lock();return;}ins[0].focus();return;}
   box.classList.add('ok');msg.textContent='';await wait(550);
   if(S.otpCtx==='signup'){go('identity');}
   else{overlayLoading('Entrando…');await wait(800);go('church');}
  };
  ins.forEach((inp,i)=>{
   inp.addEventListener('input',()=>{const d=inp.value.replace(/\D/g,'');if(d.length>1){d.slice(0,6-i).split('').forEach((ch,k)=>{ins[i+k].value=ch;ins[i+k].classList.add('filled')});ins[Math.min(i+d.length,5)].focus();check();return;}inp.value=d;inp.classList.toggle('filled',!!d);if(d&&i<5)ins[i+1].focus();if(msg.textContent&&S.su.att>0)msg.textContent='';check();});
   inp.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!inp.value&&i>0){ins[i-1].focus();ins[i-1].value='';ins[i-1].classList.remove('filled');}if(e.key==='ArrowLeft'&&i>0)ins[i-1].focus();if(e.key==='ArrowRight'&&i<5)ins[i+1].focus();});
   inp.addEventListener('paste',e=>{const t=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);if(!t)return;e.preventDefault();t.split('').forEach((ch,k)=>{if(ins[k]){ins[k].value=ch;ins[k].classList.add('filled')}});ins[Math.min(t.length,5)].focus();check();});
  });
  if(S.su.att>0)startResend();
 },
 lookup(){const p=$('#lkPhone');if(p)p.addEventListener('input',()=>{p.value=maskPhone(p.value)});},
 signupForm(){const p=$('#sPass'),bar=$('#pwBar'),t=$('#pwTxt');const upd=()=>{const v=p.value;let s=0;if(v.length>=8)s++;if(/[a-z]/i.test(v)&&/\d/.test(v))s++;if(/[^a-z0-9]/i.test(v)||v.length>=12)s++;const L=[['0%','Força da senha','var(--line)'],['34%','Fraca','var(--danger-text)'],['67%','Boa','var(--warning-fill)'],['100%','Forte','var(--accent)']][v?Math.max(s,1):0];bar.style.width=L[0];bar.style.background=L[2];t.textContent=L[1];};p.addEventListener('input',upd);const ph=$('#sPhone');if(ph)ph.addEventListener('input',()=>{ph.value=maskPhone(ph.value)});},
 home(){const car=$('#car'),dots=$$('#dots span');const N=dots.length,DUR=5000;let idx=0,paused=false,t0=Date.now(),left=DUR,timer=null;
  const w=()=>car.children[1].offsetLeft-car.children[0].offsetLeft;
  const mark=i=>{dots.forEach((d,k)=>{d.classList.toggle('on',k===i);d.classList.remove('run');});void car.offsetWidth;dots[i].classList.add('run');};
  const go=i=>{idx=(i+N)%N;car.scrollTo({left:idx*w(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  const sched=ms=>{clearTimeout(timer);t0=Date.now();left=ms;timer=setTimeout(()=>{if(!car.isConnected)return;go(idx+1);},ms);};
  const pause=()=>{if(paused)return;paused=true;clearTimeout(timer);left=Math.max(600,left-(Date.now()-t0));$('#dots').classList.add('paused');};
  const resume=()=>{if(!paused)return;paused=false;$('#dots').classList.remove('paused');sched(left);};
  let st;car.addEventListener('scroll',()=>{clearTimeout(st);st=setTimeout(()=>{const i=Math.round(car.scrollLeft/w());if(i!==idx||!dots[i].classList.contains('run')){idx=i;}mark(idx);if(!paused)sched(DUR);},90);},{passive:true});
  car.addEventListener('pointerenter',pause);car.addEventListener('pointerleave',resume);
  car.addEventListener('touchstart',pause,{passive:true});car.addEventListener('touchend',()=>setTimeout(resume,1500),{passive:true});
  car.addEventListener('focusin',pause);car.addEventListener('focusout',resume);
  dots.forEach((d,k)=>{d.style.cursor='pointer';d.addEventListener('click',()=>go(k));});
  mark(0);sched(DUR);
 },
 grupos(){const q=$('#grQ');if(q)q.addEventListener('input',()=>{S.gr.q=q.value;$('#casas').innerHTML=casasList();});},
 curso(){if(S.cu.playing)startPlay();}
};
function startResend(){clearInterval(resendTimer);let n=60;const b=$('#resend');if(!b)return;b.disabled=true;b.textContent='Reenviar em 1:00';resendTimer=setInterval(()=>{n--;if(!document.body.contains(b)){clearInterval(resendTimer);return;}b.textContent='Reenviar em 0:'+String(n).padStart(2,'0');if(n<=0){clearInterval(resendTimer);b.disabled=false;b.textContent='Reenviar código';}},1000);}
function startPlay(){let t=0;const pp=$('#pp'),pt=$('#pt');clearInterval(playTimer);playTimer=setInterval(()=>{if(!pp){clearInterval(playTimer);return;}t+=4;const pc=Math.min(t/760*100,100);pp.style.width=pc+'%';pt.textContent=Math.floor(t/60)+':'+String(t%60).padStart(2,'0');if(pc>=100)clearInterval(playTimer);},250);}

/* ---------- sheets ---------- */
function eventSheet(id){
 const e=EVENTS.find(x=>x.id===id);const on=S.rsvp[e.id];
 sheet(`<div class="sheet-hero gr-${e.g}" style="margin-top:-10px;border-radius:var(--r-xl) var(--r-xl) 0 0">${tag(e.tone,e.cat,true)}<h3>${esc(e.t)}</h3><div class="row g4" style="font:400 15px/20px var(--font-text);flex-wrap:wrap"><span class="row" style="gap:4px">${ic('calendar',16)}${e.range||WD[dow(e.y,e.m,e.d)]+', '+e.d+' de '+MONTHS[e.m-1]}</span><span class="row" style="gap:4px">${ic('clock',16)}${e.h}</span><span class="row" style="gap:4px">${ic('pin',16)}${esc(e.p)}</span></div></div>
 <div class="stack g5"><p class="body">${DESC[e.cat]||''}</p>
  ${e.sign?`<div class="row between"><span class="callout">${(e.n+(on?1:0))} inscritos</span>${on?status('success','Inscrito'):''}</div>`:''}
  ${apbEvBlock(e)}
  <div class="stack g3">${!e.sign?'':on?(e.id==='e11'?`<button class="btn outline block" data-a="rgFromEv" data-v="i1">Ver minha inscrição</button>`:`<button class="btn outline block" data-a="rsvp" data-v="${e.id}">Cancelar inscrição</button>`)+`<button class="btn secondary block" disabled>Fazer check-in · abre no dia do evento</button>`:`<button class="btn primary block split" data-a="rsvp" data-v="${e.id}"><span>Inscrever-se</span><span class="meta">Gratuito</span></button>`}
  <div class="row g3"><button class="btn secondary md grow" data-a="addCal">Salvar na agenda</button><button class="btn secondary md grow" data-a="shareEv">Compartilhar</button></div></div></div>`);
}
function groupSheet(id){
 const c=CASAS.find(x=>x.id===id);const j=S.joined[id];const st=j?['Pedido enviado','var(--brand-text)']:c.open?['Aberta','var(--mk-lima)']:['Lotada','var(--mk-warn)'];
 const leaders=c.leader.replace(/^(\w+) e (\w+) (\w+)$/,'$1 $3|$2 $3').split('|');
 sheet(`<div class="stack g5">
  <div class="stack" style="gap:6px"><div class="row between"><p class="eb2">Casa de Apascentamento</p><span class="gst"><i style="background:${st[1]}"></i>${st[0]}</span></div><h3 class="gname">${c.t.replace('Casa ','')}</h3>${(c.tags||[]).length?`<div class="row" style="gap:6px;flex-wrap:wrap">${c.tags.map(t=>`<span class="chl">${t}</span>`).join('')}</div>`:''}</div>
  <div class="gfacts"><div><span class="eb2">Quando</span><b>${c.day.replace('-feira','')}</b><small>${c.h}</small></div><div><span class="eb2">Distância</span><b>${c.km}</b><small>km de você</small></div><div><span class="eb2">Membros</span><b>${c.n}</b><small>${c.open?'vagas abertas':'sem vagas'}</small></div></div>
  <div class="chlist">
   <div class="prow"><span class="grow stack" style="gap:2px"><span class="eb2">Endereço</span><span class="pt" style="font-size:16px">${esc(c.addr)}</span></span><button class="link" data-a="openMap">Ver no mapa</button></div>
   <div class="prow"><span class="grow stack" style="gap:6px"><span class="eb2">${leaders.length>1?'Líderes':'Líder'}</span><span class="row g2">${leaders.map((l,k)=>`${pavM(l,['menta','damasco'][k%2],'','width:30px;height:30px;font-size:11px')}`).join('')}<span class="pt" style="font-size:16px">${esc(c.leader)}</span></span></span></div>
  </div>
  ${j?`<button class="btn outline block" data-a="joinGroup" data-v="${id}">Cancelar pedido</button>`:c.open?`<button class="btn primary block split" data-a="joinGroup" data-v="${id}"><span>Quero participar</span><span class="meta">${c.day.slice(0,3)} · ${c.h}</span></button>`:`<button class="btn inverse block" data-a="joinGroup" data-v="${id}">Entrar na lista de espera</button>`}
  <button class="btn secondary block talkbtn" data-a="talkLeader" data-v="g|${id}">${ic('message',18)}Falar com o líder</button>
 </div>`);
}
function serveBox(m,on,note){return on?`<div class="servecard"><span class="svdot"></span><span class="grow stack" style="gap:2px"><b>Interesse enviado</b><span>${m.lead} vai entrar em contato com você.</span></span></div><button class="btn outline block md" data-a="serve" data-v="${m.id}">Cancelar interesse</button>`:`${note?`<p class="svnote">${note}</p>`:''}<button class="btn primary block" data-a="serve" data-v="${m.id}">Quero servir</button>`;}
function miniSheet(id){const m=MINIS.find(x=>x.id===id);const on=S.serving[id];
 sheet(`<div class="stack g5"><div class="row between" style="align-items:flex-start;gap:16px"><div class="stack" style="gap:6px"><p class="eb2">Ministério</p><h3 class="gname" style="font-size:${m.t.length>14?30:40}px;line-height:1">${m.t}</h3></div><span class="mico" style="color:${MK[m.tone]||'var(--tone-'+m.tone+'-ink)'};width:auto;margin-top:18px">${ic(m.i,34,1.5)}</span></div>
  <p class="body" style="color:var(--ink);margin:0">${m.d}</p>
  <div class="gfacts"><div style="grid-column:span 2"><span class="eb2">Quando</span><b style="font-size:17px;line-height:22px;letter-spacing:-.02em">${m.when}</b></div><div><span class="eb2">Equipe</span><b>${m.n}</b><small>voluntários</small></div></div>
  <div class="chlist"><div class="prow"><span class="grow stack" style="gap:2px"><span class="eb2">Liderança</span><span class="pt" style="font-size:16px">${m.lead}</span></span></div><div class="prow" style="align-items:flex-start"><span class="grow stack" style="gap:6px"><span class="eb2">Para servir aqui</span>${m.need.map(n=>`<span class="row g2" style="align-items:flex-start;font:400 15px/20px var(--font-text)"><span class="mico" style="width:auto;color:var(--brand-text);margin-top:2px">${ic('check',14,2.5)}</span>${n}</span>`).join('')}</span></div></div>
  <div class="servebox" id="serveBox">${S.role==='visitante'?`<div class="svc-note" style="margin:0">${ic('info',16,2)}<div><b>Servir é para membros</b><span>Depois da integração você pode servir em qualquer ministério. Enquanto isso, converse com o líder para conhecer.</span></div></div>`:serveBox(m,on)}</div><button class="btn secondary block talkbtn" data-a="talkLeader" data-v="m|${m.id}">${ic('message',18)}Falar com o líder</button></div>`);}
function prayerSheet(){
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Pedido de oração</h3><p class="callout">A equipe de intercessão ora por cada pedido durante a semana.</p></div>
  ${field({id:'pText',label:'Seu pedido',area:true,ph:'Pelo que podemos orar?',hint:'0/500',max:500})}
  <div class="list"><div class="item" style="cursor:default"><span class="grow stack" style="gap:2px"><span class="it-title">Enviar anonimamente</span><span class="it-sub">Só quem administra os pedidos vê seu nome</span></span><button type="button" class="switch" role="switch" aria-checked="false" aria-label="Anônimo" data-a="sw"></button></div></div>
  <button class="btn primary block" id="pGo">Enviar pedido</button></div>`,sh=>{
  const ta=$('#pText',sh);ta.addEventListener('input',()=>{clearErr('pText');$('#f-pText .hint').textContent=ta.value.length+'/500';$('#f-pText .hint').dataset.hint=ta.value.length+'/500';});
  $('#pGo',sh).addEventListener('click',async e=>{const v=ta.value.trim();if(!v){setErr('pText','Escreva seu pedido para enviarmos à equipe.');return;}if(v.length<10){setErr('pText','Conte um pouco mais para a equipe saber como orar.');return;}
   await busy(e.currentTarget,1100,null,'Enviado');await closeSheet();toast('success','Pedido enviado','Nossa equipe de intercessão vai orar por você.');});
 });
}
const NDESC={Eventos:'Cultos, conferências e eventos da sua igreja','Escalas':'Novas escalas e lembretes de confirmação','Pedidos de oração':'Quando alguém orar pelo seu pedido','Cursos':'Novas aulas e lembretes de estudo','Avisos gerais':'Comunicados da secretaria e da liderança','Mensagens de líderes':'Recados dos líderes da sua casa, ministério e escalas'};
function notifSheet(){sheet(`<div class="stack g5"><div class="row between" style="align-items:center"><h3 class="t2">Preferências</h3><span class="saved" id="nSaved" aria-live="polite"></span></div>
 <section class="stack"><p class="eb2" style="margin-bottom:4px">O que avisar</p><div class="chlist">${Object.keys(S.notif).map(k=>`<div class="prow"><span class="grow stack" style="gap:2px"><span class="pt">${k}</span><span class="chm">${NDESC[k]}</span></span><button type="button" class="switch" role="switch" aria-checked="${S.notif[k]}" aria-label="${k}" data-a="notifSw" data-v="${k}"></button></div>`).join('')}</div><p class="chm" style="margin:6px 2px 0">Desligar um tipo tira o alerta no celular e o e-mail, mas o aviso continua na sua caixa de Notificações.</p></section>
 <section class="stack g3"><p class="eb2">Como avisar</p><div class="row g2" style="flex-wrap:wrap">${Object.keys(S.nch).map(k=>k==='WhatsApp'?`<button type="button" class="chip" disabled aria-disabled="true" style="opacity:.55">WhatsApp · em breve</button>`:`<button type="button" class="chip" aria-pressed="${S.nch[k]}" data-a="nch" data-v="${k}">${k}</button>`).join('')}</div></section>
 <div class="chlist"><div class="prow"><span class="grow stack" style="gap:2px"><span class="pt">Silenciar à noite</span><span class="chm">Das 22h às 7h</span></span><button type="button" class="switch" role="switch" aria-checked="${S.quiet}" aria-label="Silenciar à noite" data-a="quietSw"></button></div></div>
</div>`);}
function churchSheet(){sheet(`<div class="stack g4"><h3 class="t2">Trocar de igreja</h3><div class="chlist">${CHURCHES.map(c=>{const cur=S.church&&S.church.id===c.id;return `<button class="chrow ${cur?'current':''}" data-a="setChurch" data-v="${c.id}" ${cur?'aria-current="true"':''}><span class="chdot" style="background:${MK[c.tone==='ceu'?'oceano':c.tone]}"></span><span class="grow stack" style="gap:2px"><span class="row" style="gap:10px;align-items:baseline"><span class="chn">${CH_META[c.id].short}</span>${cur?'<span class="chl">Atual</span>':''}</span><span class="chm">${c.city} · ${c.members} membros</span></span>${cur?`<span class="chk" aria-hidden="true">${ic('check',18,2.5)}</span>`:`<span class="ma" aria-hidden="true">${ic('arrowR',18,2)}</span>`}</button>`;}).join('')}</div></div>`);}
function forgotSheet(){sheet(`<form class="stack g5" data-submit="forgotSend" novalidate><div class="stack g2"><h3 class="t2">Redefinir senha</h3><p class="callout">Enviamos um botão e um código para criar sua nova senha. Botão e código válidos por 1 hora.</p></div>${field({id:'fEmail',label:'E-mail',type:'email',ph:'seu@email.com',val:val('lEmail')||S.email,im:'email'})}<button class="btn primary block" type="submit">Continuar</button></form>`);}
V.loginBlocked=()=>({sb:'var(--ink)',html:flow({pct:50,body:`${head('Entrar','Entrada temporariamente bloqueada','Tente novamente em 14:59 ou escolha outra forma de acesso.')}<p class="foot">Demonstração de bloqueio. O tempo é ilustrativo.</p>`,dock:`<button class="btn primary block" data-a="go" data-v="codeEmail">Entrar com código</button><button class="btn secondary block" data-a="forgot">Redefinir senha</button>`})});
V.resetPassword=()=>({sb:'var(--ink)',html:flow({pct:70,form:'resetDemo',body:`${head('Redefinir senha','Crie sua nova senha','Se houver uma conta para este e-mail, enviamos as instruções. Confira também o spam.')}<div class="stack g4">${field({id:'resetCode',label:'Código de 6 dígitos',ph:'123456',im:'numeric',max:6,ac:'one-time-code'})}${field({id:'resetPass',label:'Nova senha',type:'password',ph:'Crie uma senha',ac:'new-password',reveal:true,hint:'Mínimo de 8 caracteres, com letras e números.'})}<p class="foot">Botão e código válidos por 1 hora. Demonstração: use 123456; nenhum e-mail é enviado.</p></div>`,dock:`<button class="btn primary block" type="submit">Redefinir senha</button><button class="tlink" type="button" data-a="resetResendDemo">Reenviar código</button>`})});
V.resetDone=()=>({sb:'var(--ink)',html:flow({pct:100,body:`${head('','Senha redefinida','As outras sessões foram encerradas. Entre com sua nova senha.')}`,dock:`<button class="btn primary block" data-a="go" data-v="login">Voltar para entrar</button>`})});

function logoutSheet(){sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Sair da conta?</h3><p class="body">Você vai precisar entrar de novo para ver sua agenda, grupos e cursos.</p></div><div class="stack g3"><button class="btn dangerfill block" data-a="doLogout">Sair da conta</button><button class="btn outline block" data-a="closeSheet">Continuar conectado</button></div></div>`);}
function inscrSheet(){const l=EVENTS.filter(e=>S.rsvp[e.id]);sheet(`<div class="stack g5"><h3 class="t2">Minhas inscrições</h3>${l.length?`<div class="list">${l.map(evRow).join('')}</div>`:`<div class="empty"><span class="iconbox">${ic('ticket',22)}</span><span class="it-title" style="color:var(--ink)">Nenhuma inscrição ainda</span><span class="callout">Confirme presença em um evento e ele aparece aqui.</span><button class="btn primary md" data-a="tab" data-v="agenda">Ver agenda</button></div>`}</div>`);}
