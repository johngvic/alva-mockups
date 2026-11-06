/* ---------- disponibilidade: bloqueio por período ---------- */
function blockSheet(){
 const st={y:TODAY.y,m:TODAY.m,a:null,b:null,why:null};
 const grid=()=>{const first=dow(st.y,st.m,1),days=new Date(st.y,st.m,0).getDate();let h=['D','S','T','Q','Q','S','S'].map(d=>`<span class="dow">${d}</span>`).join('');for(let i=0;i<first;i++)h+='<span></span>';
  for(let d=1;d<=days;d++){const k=K(st.y,st.m,d),past=k<todayKey,lo=st.a,hi=st.b||st.a;const inR=lo&&k>=lo&&k<=hi;const ex=blockedAt(k);const esc_=S.escalas.find(x=>K(x.y,x.m,x.d)===k&&x.st!=='recusado');
   h+=`<button type="button" class="rday${inR?' in':''}${k===lo?' lo':''}${k===hi&&st.b?' hi':''}${k===lo&&!st.b?' one':''}${ex?' taken':''}" data-k="${k}" ${past?'disabled':''} aria-label="${d} de ${MONTHS[st.m-1]}${ex?', já bloqueado':''}${esc_?', você está escalado':''}">${d}${esc_?'<i></i>':''}</button>`;}
  return h;};
 const summary=()=>{if(!st.a)return '<span class="callout">Toque no primeiro dia. Para um período, toque também no último.</span>';const b=st.b||st.a,n=daysBetween(st.a,b);
  const conf=S.escalas.filter(x=>{const k=K(x.y,x.m,x.d);return k>=st.a&&k<=b&&x.st!=='recusado';});
  return `<div class="stack g2"><span class="it-title">${st.a===b?fmtK(st.a):fmtK(st.a)+' → '+fmtK(b)}</span><span class="foot">${n} ${n>1?'dias bloqueados':'dia bloqueado'}</span>${conf.length?`<div class="panel" style="padding:14px;gap:6px;animation:none"><div class="ph"><span class="bang">!</span><div><b style="font-size:15px">Você já está escalado nesse período</b><p style="font-size:14px">${conf.map(x=>x.min+' · '+fmtK(K(x.y,x.m,x.d))).join('<br>')}<br>A liderança será avisada do conflito.</p></div></div></div>`:''}</div>`;};
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Bloquear período</h3><p class="callout">Escolha as datas em que você não pode servir.</p></div>
  <div class="rangecal"><div class="row between" style="margin-bottom:8px"><button type="button" class="iconbtn" id="rcPrev" aria-label="Mês anterior">${ic('chevL',18,2.25)}</button><b id="rcM" style="font:700 17px/1 var(--font-display);text-transform:capitalize"></b><button type="button" class="iconbtn" id="rcNext" aria-label="Próximo mês">${ic('chevR',18,2.25)}</button></div><div class="rgrid" id="rcG"></div><p class="foot" style="margin:8px 0 0;display:flex;gap:14px"><span class="row" style="gap:6px"><i class="lg-esc"></i>você está escalado</span><span class="row" style="gap:6px"><i class="lg-blk"></i>já bloqueado</span></p></div>
  <div id="rcSum"></div>
  <div class="stack g2"><span class="eb2">Motivo (opcional)</span><div class="row g2" style="flex-wrap:wrap" id="rcWhy">${['Viagem','Trabalho','Família','Outro'].map(w=>`<button type="button" class="chip" aria-pressed="false" data-v="${w}">${w}</button>`).join('')}</div></div>
  ${field({id:'bNote',label:'Observação para a liderança',ph:'Ex.: volto a tempo do culto de domingo à noite',max:120})}
  <div class="otpmsg" id="rcErr" role="alert" style="min-height:0"></div>
  <button type="button" class="btn primary block" id="rcGo">Bloquear</button></div>`,sh=>{
  const draw=()=>{$('#rcM',sh).textContent=MONTHS[st.m-1]+' '+st.y;$('#rcG',sh).innerHTML=grid();$('#rcSum',sh).innerHTML=summary();$('#rcPrev',sh).disabled=(st.y===TODAY.y&&st.m===TODAY.m);const b=st.b||st.a;$('#rcGo',sh).innerHTML=st.a?`<span>Bloquear</span><span class="meta">${daysBetween(st.a,b)} ${daysBetween(st.a,b)>1?'dias':'dia'}</span>`:'Bloquear';$('#rcGo',sh).classList.toggle('split',!!st.a);$('#rcErr',sh).textContent='';};
  $('#rcPrev',sh).onclick=()=>{st.m--;if(st.m<1){st.m=12;st.y--;}draw();};
  $('#rcNext',sh).onclick=()=>{st.m++;if(st.m>12){st.m=1;st.y++;}draw();};
  $('#rcG',sh).addEventListener('click',e=>{const b=e.target.closest('.rday');if(!b||b.disabled)return;const k=+b.dataset.k;
   if(!st.a||st.b){st.a=k;st.b=null;}else if(k<st.a){st.a=k;}else if(k===st.a){st.b=null;}else st.b=k;draw();});
  $('#rcWhy',sh).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const on=b.getAttribute('aria-pressed')!=='true';$$('#rcWhy button',sh).forEach(x=>x.setAttribute('aria-pressed',x===b&&on));st.why=on?b.dataset.v:null;});
  $('#rcGo',sh).addEventListener('click',async e=>{const err=$('#rcErr',sh);
   if(!st.a){err.textContent='Escolha pelo menos um dia no calendário.';$('#rcG',sh).classList.remove('shake');void sh.offsetWidth;$('#rcG',sh).classList.add('shake');return;}
   const a=st.a,b=st.b||st.a;if(S.blocks.some(x=>a<=x.b&&b>=x.a)){err.textContent='Parte desse período já está bloqueada. Remova o bloqueio antigo ou escolha outras datas.';return;}
   if(daysBetween(a,b)>90){err.textContent='Bloqueios vão até 90 dias. Para afastamentos longos, fale com a liderança.';return;}
   await busy(e.currentTarget,800,null,'Bloqueado');S.blocks.push({id:'b'+Date.now(),a,b,why:st.why,note:val('bNote')});await closeSheet();
   const conf=S.escalas.some(x=>{const k=K(x.y,x.m,x.d);return k>=a&&k<=b&&x.st!=='recusado';});
   toast(conf?'info':'success','Período bloqueado',conf?'Você tinha escala nessas datas; a liderança foi avisada.':'Ninguém vai te escalar nessas datas.');softRender();});
  draw();
 });
}
/* Recusa: o motivo é só um texto livre, escrito pela pessoa (obrigatório, até 200 caracteres); sem lista de motivos */
function reasonSheet(o){
 sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${o.title}</h3><p class="callout">${o.callout}</p></div>
  ${field({id:'rsMsg',label:'Motivo',area:true,ph:o.ph,max:200})}
  <div class="otpmsg" id="rsErr" role="alert" style="min-height:0"></div>
  <div class="stack g3"><button type="button" class="btn primary block" id="rsGo">${o.btn}</button><button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{
  $('#rsMsg',sh).addEventListener('input',()=>{$('#rsErr',sh).textContent='';});
  $('#rsGo',sh).addEventListener('click',async e=>{const why=(($('#rsMsg',sh)||{}).value||'').trim();if(!why){$('#rsErr',sh).textContent='Escreva o motivo para '+o.who+' entender.';return;}
   await busy(e.currentTarget,o.ms||700,null,o.done);await o.run(why);});
 });
}
function refuseSheet(kind,id){
 const x=kind==='escala'?S.escalas.find(e=>e.id===id):S.discs.find(e=>e.id===id);const swap=kind==='escala'&&x.st==='confirmado',who=kind==='escala'?'a liderança de '+x.min:x.who.split(' ')[0];
 reasonSheet({title:kind==='escala'?(swap?'Pedir troca':'Recusar escala'):'Recusar encontro',callout:kind==='escala'?x.min+' · '+x.fn+' · '+fmtK(K(x.y,x.m,x.d)):x.theme+' · '+fmtK(K(x.y,x.m,x.d))+' · '+x.h,
  ph:kind==='escala'?'Ex.: viajo nesse fim de semana; posso trocar com alguém do time?':'Ex.: o horário não funciona para mim; que tal na semana seguinte?',btn:swap?'Pedir troca':'Recusar',who,done:swap?'Troca pedida':'Recusado',
  run:async why=>{x.st='recusado';x.why=why;await closeSheet();$('#agBody').innerHTML=agendaTab();
   toast('info',kind==='escala'?(swap?'Troca pedida':'Escala recusada'):'Encontro recusado',kind==='escala'?(()=>{const u=limUse(x.y,x.m);return 'A liderança de '+x.min+' vai procurar outra pessoa.'+(x.over?' Seu mês segue em '+u.reg+' de '+u.lim+'.':' Uma vaga do seu mês ficou livre ('+u.reg+' de '+u.lim+').');})():x.who.split(' ')[0]+' vai sugerir outro horário.');}});
}

/* ---------- agenda: month swap + swipe ---------- */
function monthSwap(dir){const sc=$('#scr');const top=sc.scrollTop;render('none');const n=$('#scr');n.scrollTop=top;
 if(!dir)return;const g=$('#calGrid'),t=$('#mTitle'),s=$('#mSum');[g,t,s].forEach(el=>{if(!el)return;el.classList.add(dir==='next'?'in-next':'in-prev');});}
HOOK.agenda=function(){const g=$('#cal');if(!g)return;let x0=null,y0=null;
 g.addEventListener('pointerdown',e=>{x0=e.clientX;y0=e.clientY;});
 g.addEventListener('pointerup',e=>{if(x0==null)return;const dx=e.clientX-x0,dy=e.clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){A.month(dx<0?'1':'-1');}});};
/* ---------- motion: stagger, word reveal, tab indicator ---------- */
function splitWords(el){if(el.dataset.split||el.children.length)return;const txt=el.textContent;el.dataset.split='1';el.setAttribute('aria-label',txt);
 const chars=el.classList.contains('wordmark');el.innerHTML=(chars?txt.split(''):txt.split(/(\s+)/)).map((w,i)=>/^\s+$/.test(w)?w:`<span class="w" aria-hidden="true"><span style="--wi:${i}">${esc(w)}</span></span>`).join('');}
function motionIn(){const sc=$('#scr');if(!sc||matchMedia('(prefers-reduced-motion: reduce)').matches)return;sc.classList.add('fresh');
 $$('.big,.t1,.wordmark,.mname',sc).forEach(splitWords);
 const picks=$$(':scope > header > *, :scope > .pad > *, :scope .fbody > *, :scope .dock > *, :scope .list > *, :scope .qgrid > *, :scope .hscroll > *, :scope .carousel > *, :scope .agh > *, :scope .stats > *, :scope #agBody > *, :scope .cal-grid > .day',sc);
 let i=0;picks.forEach(el=>{if(el.closest('.list')&&el.parentElement.children.length>10&&[...el.parentElement.children].indexOf(el)>9)return;el.classList.add('rise');el.style.setProperty('--d',Math.min(i*(el.classList.contains('day')?8:45),520)+'ms');i++;});
 setTimeout(()=>{if(sc.isConnected){sc.classList.remove('fresh');$$('.rise',sc).forEach(el=>el.classList.remove('rise'));}},1300);}
let lastTab=null;
function tabIndicator(){const bar=$('.tabbar');if(!bar)return;const act=$('.tab[aria-current="page"]',bar);if(!act)return;const ind=document.createElement('span');ind.className='tabind';bar.prepend(ind);
 const place=el=>{ind.style.width=el.offsetWidth+'px';ind.style.transform=`translateX(${el.offsetLeft}px)`;};
 const prev=lastTab&&$(`.tab[data-v="${lastTab}"]`,bar);if(prev&&prev!==act){ind.style.transition='none';place(prev);void ind.offsetWidth;ind.style.transition='';act.classList.add('just');}place(act);lastTab=act.dataset.v;}

/* ---------- actions ---------- */
const soon=(what)=>toast('info',what||'Em construção','Esta tela entra na próxima leva do protótipo.');
const LEGAL={termos:['Termos de uso','Regras de uso do app da igreja: o que você pode fazer, o que a igreja faz com o que você publica e como encerrar a conta quando quiser.'],privacidade:['Política de privacidade','Quais dados guardamos (nome, contato, família e participação), quem na igreja pode ver cada um e como pedir cópia ou exclusão.']};
const A={
 identityDocuments:()=>sheet(`<div class="stack g4"><h3 class="t2">Termos e privacidade</h3>${mobileTermsList(false)}<button class="btn primary block" data-a="closeSheet">Fechar</button></div>`),
 identityTerm:(v,el)=>{el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true');const b=$('#identityCreate')||$('#identityAccept');if(b)b.disabled=!mobileTermsAccepted();const msg=$('#identityRefusal');if(msg&&mobileTermsAccepted())msg.hidden=true;},
 identityRefuse:()=>{$$('#sTerms [data-required="true"]').forEach(b=>b.setAttribute('aria-checked','false'));$('#identityAccept').disabled=true;$('#identityRefusal').hidden=false;},
 identityAccept:()=>{if(!mobileTermsAccepted())return;ensureChurch();go('home');toast('success','Termos aceitos','Demonstração');},
 identityExit:()=>go('welcome'),
 go:v=>go(v),back,
 closeSheet:()=>closeSheet(),
 tab:v=>{ensureChurch();closeSheet();if(S.role==='visitante'&&v==='cursos'){toast('info','Cursos são para membros','Depois da integração você tem acesso às jornadas e cursos.');return;}if(S.screen===v)return;S.hist=[];S.screen=v;render('tab');},
 reveal:(v,el)=>{const i=$('#'+v);const show=i.type==='password';i.type=show?'text':'password';el.innerHTML=ic(show?'eyeOff':'eye',el.closest('.bigwrap')?22:20,1.75);el.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');el.setAttribute('aria-pressed',show);const n=i.value.length;i.focus();try{i.setSelectionRange(n,n)}catch(_){}},
 forgot:()=>forgotSheet(),
 resetResendDemo:()=>toast('info','Código reenviado','Demonstração: use 123456.'),
 startSignup:()=>go('signupStart'),
 legal:v=>{const l=LEGAL[v];sheet(`<div class="stack g4"><div class="stack g2"><h3 class="t2">${l[0]}</h3><p class="body">${l[1]}</p><p class="foot">Versão de demonstração. O texto completo fica disponível no app final.</p></div><button class="btn primary block" data-a="closeSheet">Entendi</button></div>`);},
 pickLookup:async(v,el)=>{$$('.selcard').forEach(c=>c.setAttribute('aria-pressed',c===el));S.lookupMode=v;await wait(260);go('lookup');},
 lookupSwap:()=>{S.lookupMode=S.lookupMode==='phone'?'email':'phone';S.screen='lookup';render();},
 pickRec:(v,el)=>{S.su.sel=+v;$$('.rec').forEach((r,i)=>{const on=i===+v;r.setAttribute('aria-checked',on);$('.radio',r).innerHTML=on?ic('check',14,3):'';});},
 confirmRec:()=>go('confirmEmail'),
 sendSignupCode:async(v,el)=>{await busy(el,1000,null,'Código enviado');S.otpCtx='signup';S.su.att=5;S.su.expAt=Date.now()+15*60000;toast('success','Código enviado','Válido por 15 minutos.');go('otp');},
 toIntegration:()=>{S.prefill={found:true,nome:'Rafael',sobre:'Pereira',email:S.su.email};go('signupForm');},
 restart:()=>{S.hist=['welcome'];S.screen='signupStart';S.prefill=null;render('back');},
 newSignup:()=>{S.prefill=null;go('signupForm');},
 toggleTerms:(v,el)=>{el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true');clearErr('sTerms');},
 sw:(v,el)=>el.setAttribute('aria-checked',el.getAttribute('aria-checked')!=='true'),
 resend:async(v,el)=>{el.disabled=true;el.textContent='Enviando…';await wait(900);const was=S.su.att<=0;S.su.att=5;S.su.expAt=Date.now()+15*60000;toast('success','Novo código enviado','O anterior deixou de valer.');if(was){softRender();}else{startResend();}},
 pickChurch:async(v,el)=>{if(el&&el.classList){$$('.chrow').forEach(c=>c.classList.toggle('dim',c!==el));el.classList.add('chosen');await wait(380);}S.church=CHURCHES.find(c=>c.id===v);overlayLoading('Entrando em '+S.church.name+'…');await wait(1000);S.hist=[];S.view='membro';S.screen=canGestao()?'profile':'home';$('#overlay').innerHTML='';render();},
 cancelChurch:()=>{S.hist=[];S.screen='welcome';render('back');toast('info','Acesso cancelado','Você precisa escolher uma igreja para usar o app.');},
 /* home */
 event:v=>eventSheet(v),
 live:()=>toast('info','Lembrete ativado','Avisamos quando o culto de domingo, 18h30, entrar ao vivo.'),
 ministerios:()=>{S.gr.tab='Ministérios';A.tab('grupos');},
 prayer:()=>prayerSheet(),
 whats:()=>toast('info','Abrindo o WhatsApp','No app real, a conversa com o assistente abre aqui.'),
 rsvp:async(v,el)=>{const e=EVENTS.find(x=>x.id===v);await busy(el,700,null,S.rsvp[v]?'Cancelado':(EVENTS.find(x=>x.id===v).sign?'Inscrito':'Confirmado'));S.rsvp[v]=!S.rsvp[v];await closeSheet();
  if(S.rsvp[v])toast('success',e.sign?'Inscrição confirmada':'Presença confirmada',e.sign?'Seu QR Code está em Mais › Inscrições.':e.t+', '+e.d+' de '+MONTHS[e.m-1]+' às '+e.h+'.');else toast('info',e.sign?'Inscrição cancelada':'Presença cancelada','Você pode confirmar de novo quando quiser.');softRender();},
 addCal:()=>toast('success','Adicionado à agenda','O evento está no calendário do seu celular.'),
 shareEv:()=>toast('info','Link copiado','Cole no WhatsApp ou nas redes para convidar alguém.'),
 /* agenda */
 pickDay:v=>{S.ag.sel=+v;S.ag.tab='Eventos';$$('#calGrid .day.sel').forEach(d=>{d.classList.remove('sel');d.removeAttribute('aria-pressed');});const b=$(`#calGrid [data-v="${v}"]`);b.classList.add('sel');b.setAttribute('aria-pressed','true');$$('.utabs button').forEach(x=>x.setAttribute('aria-selected',x.dataset.v==='Eventos'));const body=$('#agBody');body.innerHTML=agendaTab();body.classList.remove('swap');void body.offsetWidth;body.classList.add('swap');const isNow=S.ag.y===TODAY.y&&S.ag.m===TODAY.m&&S.ag.sel===TODAY.d;const nav=$('.mnav'),mt=$('.mtoday');nav.classList.toggle('has-today',!isNow);if(isNow){mt.setAttribute('tabindex','-1');mt.setAttribute('aria-hidden','true');}else{mt.removeAttribute('tabindex');mt.removeAttribute('aria-hidden');}},
 month:v=>{let m=S.ag.m+(+v),y=S.ag.y;if(m<1){m=12;y--;}if(m>12){m=1;y++;}if(y*100+m<202609){toast('error','Sem histórico','A agenda mostra de setembro de 2026 em diante.');return;}S.ag.m=m;S.ag.y=y;S.ag.sel=(y===TODAY.y&&m===TODAY.m)?TODAY.d:1;monthSwap(+v>0?'next':'prev');},
 goToday:()=>{const dir=(S.ag.y*100+S.ag.m)>(TODAY.y*100+TODAY.m)?'prev':'next';const same=S.ag.y===TODAY.y&&S.ag.m===TODAY.m;S.ag.y=TODAY.y;S.ag.m=TODAY.m;S.ag.sel=TODAY.d;S.ag.tab='Eventos';monthSwap(same?null:dir);},
 esSub:v=>{S.ag.esub=v;$('#agBody').innerHTML=agendaTab();},
 agTab:v=>{S.ag.tab=v;$$('.utabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));$('#agBody').innerHTML=agendaTab();},
 limPref:()=>{let v=S.lim.pref||Math.min(2,S.lim.church);const u=limUse(2026,10);const paint=sh=>{$('#lpV',sh).textContent=v;$('#lpM',sh).disabled=v<=1;$('#lpP',sh).classList.toggle('dim',v>=S.lim.church);$('#lpP',sh).setAttribute('aria-disabled',v>=S.lim.church);$('#lpW',sh).hidden=!(v<u.tot);$('#lpH',sh).textContent=v>=S.lim.church?'Esse é o limite da igreja. Para servir mais, fale com seu líder.':v===1?'Uma vez por mês.':'Até '+v+' vezes por mês.';};
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">Quantas vezes você quer servir por mês?</h3><p class="callout">Os líderes veem sua preferência ao montar a escala. O limite da igreja é ${S.lim.church} por mês, somando todos os ministérios.</p></div>
   <div class="lim-step"><button type="button" class="lim-sb" id="lpM" aria-label="Menos">${ic('minus',20,2.4)}</button><div class="stack" style="align-items:center;gap:4px"><b id="lpV">${v}</b><span class="it-sub">por mês</span></div><button type="button" class="lim-sb" id="lpP" aria-label="Mais">${ic('plus',20,2.4)}</button></div>
   <p class="callout" id="lpH" style="text-align:center;margin-top:-8px"></p>
   <div class="lim-note soft" id="lpW" hidden>${ic('info',16,2.2)}<div><b>Você já tem ${u.tot} escalas em outubro</b><span>Elas continuam. A preferência vale para os próximos convites.</span></div></div>
   <div class="stack g3"><button type="button" class="btn primary block" id="lpGo">Salvar preferência</button>${S.lim.pref?'<button type="button" class="tlink" id="lpClr">Remover preferência</button>':'<button type="button" class="tlink" data-a="closeSheet">Agora não</button>'}</div></div>`,sh=>{
   paint(sh);$('#lpM',sh).addEventListener('click',()=>{if(v>1){v--;paint(sh);}});$('#lpP',sh).addEventListener('click',()=>{if(v<S.lim.church){v++;paint(sh);}else toast('info','Esse é o limite da igreja','Para servir mais vezes, fale com o líder do seu ministério.');});
   $('#lpGo',sh).addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Salvo');S.lim.pref=v;await closeSheet();$('#agBody').innerHTML=agendaTab();toast('success','Preferência salva','Até '+v+(v===1?' vez':' vezes')+' por mês. Os líderes veem isso ao te escalar.');});
   const c=$('#lpClr',sh);if(c)c.addEventListener('click',async()=>{S.lim.pref=null;await closeSheet();$('#agBody').innerHTML=agendaTab();toast('info','Preferência removida','Vale só o limite da igreja: '+S.lim.church+' por mês.');});});},
 escalaOk:async(v,el)=>{const x=S.escalas.find(e=>e.id===v);const k=K(x.y,x.m,x.d);if(blockedAt(k)){toast('error','Essa data está bloqueada','Remova o bloqueio em Escalas › Disponibilidade para aceitar.');return;}await busy(el,600,null,'Aceito');x.st='confirmado';$('#agBody').innerHTML=agendaTab();const u=limUse(x.y,x.m);toast('success','Escala aceita',x.over?'Obrigado por topar! Essa foi uma exceção ao seu limite de '+MONTHS[x.m-1]+'.':u.reg>=u.lim&&u.pend===0?x.min+' · '+fmtK(k)+'. Você fechou seu mês: '+u.reg+' de '+u.lim+'.':x.min+' · '+fmtK(k)+' · '+x.h+'.');},
 escalaNo:v=>refuseSheet('escala',v),
 discOk:async(v,el)=>{const x=S.discs.find(e=>e.id===v);await busy(el,600,null,'Aceito');x.st='aceito';$('#agBody').innerHTML=agendaTab();toast('success','Encontro aceito',x.who.split(' ')[0]+' recebeu sua confirmação.');},
 discNo:v=>refuseSheet('disc',v),
 openMap:()=>toast('info','Abrindo o mapa','No app real, abre o endereço no Maps.'),
 joinCall:()=>toast('info','Abrindo a chamada','No app real, o link da reunião abre aqui.'),
 newBlock:()=>blockSheet(),
 goPending:()=>{S.ag.tab=S.escalas.some(x=>x.st==='pendente')?'Escalas':'Discipulado';A.tab('agenda');setTimeout(()=>{const s=$('#scr');if(s)s.scrollTo({top:420,behavior:'smooth'})},80);},
 rmBlock:v=>{const i=S.blocks.findIndex(b=>b.id===v);const b=S.blocks[i];S.blocks.splice(i,1);softRender();toast('info','Bloqueio removido',fmtK(b.a)+(b.a!==b.b?' a '+fmtK(b.b):'')+' voltou a ficar livre.');},
 /* grupos */
 grTab:v=>{S.gr.tab=v;softRender();},
 clearQ:()=>{S.gr.q='';softRender();},
 group:v=>groupSheet(v),mini:v=>miniSheet(v),
 joinGroup:async(v,el)=>{const c=CASAS.find(x=>x.id===v);await busy(el,800,null,S.joined[v]?'Cancelado':(CASAS.find(x=>x.id===v).open?'Pedido enviado':'Na lista'));S.joined[v]=!S.joined[v];await closeSheet();
  if(!S.joined[v])toast('info','Pedido cancelado','');else if(c.open)toast('success','Pedido enviado',c.leader+' vai falar com você pelo WhatsApp.');else toast('info','Você está na lista de espera','Avisamos quando abrir uma vaga na '+c.t+'.');
  if(S.screen==='grupos')$('#casas').innerHTML=casasList();},
 talkLeader:async(v,el)=>{const [k,id]=v.split('|');const who=k==='g'?((CASAS.find(x=>x.id===id)||{}).leader||'o líder'):((MINIS.find(x=>x.id===id)||{}).lead||'o líder');await busy(el,900,null,'Mensagem enviada');toast('success','Pedido enviado',who.split(/ e |,/)[0]+' vai receber seu contato. Em breve definimos o próximo passo.');},
 serve:async(v,el)=>{const m=MINIS.find(x=>x.id===v);const was=!!S.serving[v];await busy(el,800,null,was?'Cancelado':'Enviado');S.serving[v]=!was;const box=$('#serveBox');
  if(box){box.style.height=box.offsetHeight+'px';box.classList.add('svout');await wait(180);box.innerHTML=serveBox(m,!was,was?'Interesse cancelado. Você pode voltar quando quiser.':'');box.classList.remove('svout');box.style.height=box.scrollHeight+'px';box.classList.add('svin');setTimeout(()=>{box.style.height='';box.classList.remove('svin');},420);}
  if(S.screen==='grupos'){const sc=$('#scr');const t=sc.scrollTop;const ov=$('#overlay').innerHTML;render('none');$('#scr').scrollTop=t;}},
 /* cursos */
 cuTab:v=>{S.cu.tab=v;softRender();},
 trStep:async(v,el)=>{const it=S.trail[+v];await busy(el,600,null,'Concluída');it.done=Math.min(it.done+1,it.n);toast('success',it.done>=it.n?'Item concluído':`Etapa ${it.done} concluída`,it.done>=it.n?`${it.t} está concluído.`:`Faltam ${it.n-it.done} para terminar ${it.t}.`);softRender();},
 startCourse:async(v,el)=>{await busy(el,600,null,'Adicionado');COURSES[v].started=true;S.cu.tab='andamento';toast('success','Curso adicionado',COURSES[v].t+' está em Em andamento.');softRender();},
 openCourse:v=>{S.cu.open=v;S.cu.view=null;S.cu.playing=false;if(S.screen==='curso')softRender();else go('curso');},
 play:()=>{S.cu.playing=!S.cu.playing;const b=$('.pbtn');b.innerHTML=ic(S.cu.playing?'pause':'play',28,2.5);b.setAttribute('aria-label',S.cu.playing?'Pausar':'Assistir');if(S.cu.playing)startPlay();else clearInterval(playTimer);},
 completeLesson:async(v,el)=>{const c=COURSES[S.cu.open];await busy(el,700,null,'Concluída');c.done=Math.min(c.done+1,c.lessons.length);S.cu.view=null;S.cu.playing=false;
  if(c.done===c.lessons.length)toast('success','Curso concluído','Parabéns! O certificado chega em Meus documentos.');else toast('success','Aula '+c.done+' concluída','Próxima: '+c.lessons[c.done]+'.');softRender();$('#scr').scrollTo({top:0,behavior:'smooth'});},
 lesson:v=>{const c=COURSES[S.cu.open];const i=+v;if(i>c.done){toast('error','Aula bloqueada','Conclua a aula '+(c.done+1)+' para liberar esta.');return;}S.cu.view=(i===c.done)?null:i;S.cu.playing=false;softRender();$('#scr').scrollTo({top:0,behavior:'smooth'});},
 resumeLesson:()=>{S.cu.view=null;softRender();$('#scr').scrollTo({top:0,behavior:'smooth'});},
 shareCourse:()=>toast('info','Link copiado','Conte para alguém que você concluiu o curso.'),
 /* mais */
 soon:v=>soon(v),notif:()=>notifSheet(),
 notifSw:(v,el)=>{S.notif[v]=!S.notif[v];el.setAttribute('aria-checked',S.notif[v]);flashSaved();},
 nch:(v,el)=>{const on=!S.nch[v];if(!on&&Object.values(S.nch).filter(Boolean).length===1){toast('error','Escolha pelo menos um canal','Senão você não recebe nenhum aviso.');return;}S.nch[v]=on;el.setAttribute('aria-pressed',on);flashSaved();},
 quietSw:(v,el)=>{S.quiet=!S.quiet;el.setAttribute('aria-checked',S.quiet);flashSaved();},
 inscr:()=>inscrSheet(),
 secretaria:()=>toast('info','Secretaria','Seg a sex, 9h às 18h · (11) 3333-4444'),
 switchChurch:()=>churchSheet(),
 setChurch:async v=>{if(S.church.id===v){closeSheet();return;}S.church=CHURCHES.find(c=>c.id===v);await closeSheet();overlayLoading('Trocando para '+S.church.name+'…');await wait(900);$('#overlay').innerHTML='';S.hist=[];S.view='membro';S.screen=canGestao()?'profile':'home';render();},
 admin:()=>S.role==='admin'?toast('info','Abrindo painel admin','O painel web abre no navegador.'):toast('error','Acesso restrito','O painel é só para administradores. Troque o perfil na escolha de igreja (demo).'),
 logout:()=>logoutSheet(),
 doLogout:async()=>{await closeSheet();S.hist=[];S.church=null;S.screen='welcome';render('back');toast('info','Você saiu da conta','Até logo!');}
};
function flashSaved(){const s=$('#nSaved');if(!s)return;s.innerHTML=ic('check',14,2.75)+'Salvo';s.classList.remove('on');void s.offsetWidth;s.classList.add('on');}
/* ---------- form submits ---------- */
const F={
 async login(f){const e=val('lEmail'),p=$('#lPass').value;let ok=true;
  if(!e){setErr('lEmail','Informe seu e-mail.');ok=false;}else if(!EMAIL_RE.test(e)){setErr('lEmail','Digite um e-mail válido, como nome@email.com.');ok=false;}
  if(!p){setErr('lPass','Informe sua senha.');ok=false;}
  if(!ok)return;const btn=$('button[type=submit]',f);await busy(btn,1100);
  if(p.toLowerCase()==='errada'){setErr('lPass','E-mail ou senha incorretos');toast('error','E-mail ou senha incorretos','Tente de novo ou entre com código por e-mail.');return;}
  S.email=e;const u=USERS[e.toLowerCase()];if(u){S.user={first:u.first,name:u.name};S.role=u.role;}else{S.user={first:'Rafael',name:'Rafael Pereira'};S.role='membro';}
  go('church');},
 async sendCode(f){const e=val('cEmail');if(!e){setErr('cEmail','Informe seu e-mail.');return;}if(!EMAIL_RE.test(e)){setErr('cEmail','Digite um e-mail válido, como nome@email.com.');return;}
  await busy($('button[type=submit]',f),1000);S.email=e;S.otpCtx='login';S.su.att=5;S.su.expAt=Date.now()+15*60000;const u=USERS[e.toLowerCase()];if(u){S.user={first:u.first,name:u.name};S.role=u.role;}
  toast('success','Código enviado','Confira a caixa de entrada de '+e+'.');go('otp');},
 async doLookup(f){const ph=S.lookupMode==='phone';const id=ph?'lkPhone':'lkEmail';const v=val(id);$('#lkRes').innerHTML='';
  if(!v){setErr(id,ph?'Digite seu telefone com DDD.':'Digite seu e-mail.');return;}
  if(ph&&v.replace(/\D/g,'').length<10){setErr(id,'Número incompleto. Use DDD + número.');return;}
  if(!ph&&!EMAIL_RE.test(v)){setErr(id,'Esse e-mail parece incompleto. Ex.: nome@email.com');return;}
  await busy($('button[type=submit]',f),1300);
  if(ph)S.phone=v;else S.su.email=v;if(ph&&!S.su.email)S.su.email='rafael.pereira@hotmail.com';
  S.su.sel=0;const sc=S.scn;
  if(sc==='notfound'){$('#lkRes').innerHTML=notFoundPanel();return;}
  if(sc==='multi'){go('pickRecord');return;}
  if(sc==='noemail'&&ph){go('noEmail');return;}
  go('confirmEmail');},
 async createAccount(f){let ok=true;const n=val('sNome'),s=val('sSobre'),e=val('sEmail'),p=$('#sPass').value,t=mobileTermsAccepted();
  if(!n){setErr('sNome','Informe seu nome.');ok=false;}
  if(!s){setErr('sSobre','Informe seu sobrenome.');ok=false;}
  if(!e){setErr('sEmail','Informe seu e-mail.');ok=false;}else if(!EMAIL_RE.test(e)){setErr('sEmail','Digite um e-mail válido, como nome@email.com.');ok=false;}else if(e.toLowerCase()==='teste@example.org'&&!(S.prefill&&S.prefill.found)){setErr('sEmail','Este e-mail já tem conta. Volte e entre com ele.');ok=false;}
  const ph=val('sPhone');if(!ph){setErr('sPhone','Informe seu celular.');ok=false;}else if(ph.replace(/\D/g,'').length<10){setErr('sPhone','Digite o celular com DDD.');ok=false;}
  if(!p){setErr('sPass','Crie uma senha.');ok=false;}else if(p.length<8||!/[a-z]/i.test(p)||!/\d/.test(p)){setErr('sPass','Use 8 caracteres ou mais, com letras e números.');ok=false;}
  if(!t){setErr('sTerms','Aceite os termos para continuar.');ok=false;}
  if(!ok){toast('error','Revise os campos destacados','');return;}
  await busy($('button[type=submit]',f),1300,null,'Conta criada');S.user={first:n,name:n+' '+s};S.email=e;S.role='membro';toast('success','Conta criada','Bem-vindo ao Alva, '+n+'!');go('church');},
 async forgotSend(f){const e=val('fEmail');if(!e){setErr('fEmail','Informe seu e-mail.');return;}if(!EMAIL_RE.test(e)){setErr('fEmail','Digite um e-mail válido, como nome@email.com.');return;}
  S.email=e;await closeSheet();go('resetPassword');},
 resetDemo:()=>go('resetDone')
};
/* ---------- delegation ---------- */
const phone=$('#phone');
phone.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||!phone.contains(el))return;
 if(el.dataset.self&&e.target!==el)return;const fn=A[el.dataset.a];if(!fn)return;e.preventDefault();e.stopPropagation();fn(el.dataset.v,el);});
phone.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-a]')){e.preventDefault();e.target.click();}if(e.key==='Escape'&&$('#overlay .scrim'))closeSheet();});
phone.addEventListener('submit',e=>{const f=e.target;e.preventDefault();const fn=F[f.dataset.submit];if(fn)fn(f);});
phone.addEventListener('input',e=>{if(e.target.id)clearErr(e.target.id);const t=e.target;
 if(t.id==='mCep'&&(($('#mPais')||{}).value||'Brasil')==='Brasil'){const d=t.value.replace(/\D/g,'').slice(0,8);t.value=d.length>5?d.slice(0,5)+'-'+d.slice(5):d;if(d.length===8&&!val('mRua')){[['mRua','Rua das Acácias'],['mBairro','Jardins'],['mCid','São Paulo'],['mUf','SP']].forEach(([i,v])=>{const x=$('#'+i);if(x&&!x.value)x.value=v;});$('#mNum')&&$('#mNum').focus();}}
 if(t.id==='mNasc'||t.id==='fNasc'){const d=t.value.replace(/\D/g,'').slice(0,8);t.value=d.length>4?d.slice(0,2)+'/'+d.slice(2,4)+'/'+d.slice(4):d.length>2?d.slice(0,2)+'/'+d.slice(2):d;}
 if(t.id==='mTel')t.value=maskPhone(t.value);});

