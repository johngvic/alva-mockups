/* ---------- cenários por tipo de usuário ---------- */
function visitorCard(){return `<div class="pad" style="margin:-4px 0 22px"><div class="vcard gr-aurora"><p class="eb2" style="color:#fff;opacity:.85">Primeira vez por aqui?</p><p class="vtitle">Que bom ter você com a gente.</p><p style="margin:0;font:400 15px/20px var(--font-text);color:rgba(255,255,255,.88)">O melhor jeito de conhecer a Alva é numa Casa de Apascentamento perto de você.</p><div class="row g2" style="margin-top:6px"><button class="btn dark md" data-a="tab" data-v="grupos">Encontrar uma Casa</button><button class="btn onmedia md" data-a="sub" data-v="quemSomos">Quem somos</button></div></div></div>`;}
function roleApply(){if(gSyncRole())return;if(S.role==='visitante'){S.ag.tab='Eventos';if(['cursos','curso','bebes','bebeNovo','meusMin','meusEmp','tarefas','svcTeam','urgentes','contribuir'].includes(S.screen)){S.hist=[];S.screen='home';render('tab');return;}}if(APP.includes(S.screen))softRender();}
const SCN={
 visitante:()=>{S.user={first:'Lucas',name:'Lucas Almeida'};S.role='visitante';S.me.nome='Lucas Almeida';S.ag.tab='Eventos';return 'home';},
 membro:()=>{S.user={first:'Rafael',name:'Rafael Pereira'};S.role='membro';S.me.nome='Rafael Pereira';return 'home';}
};
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Cenários por tipo de usuário</span><div class="rail-nav" id="scnUsers"><button type="button" data-v="visitante">Visitante · primeiro acesso</button><button type="button" data-v="membro">Membro · agenda e escalas</button></div>`;
 sec.parentNode.insertBefore(box,sec);
 $('#scnUsers').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.church=S.church||CHURCHES[0];const scr=SCN[b.dataset.v]();$('#overlay').innerHTML='';S.hist=[];S.screen=scr;render('tab');});
})();

/* ---------- Liderança › Casos urgentes ---------- */
APP.push('urgentes');SUBS.push('urgentes');
const URG=[{id:'u1',who:'Maria Santos',kind:'Hospital',tone:'vinho',d:'16/09/2026',txt:'Internada no Hospital São Paulo. Cirurgia programada para sexta.',resp:'Pr. Marcos Lima',upd:'Atualizado há 2 dias'},
 {id:'u2',who:'Pedro Almeida',kind:'Oração',tone:'ambar',d:'14/09/2026',txt:'Pediu oração pela família depois de perder o emprego. Casa Centro acompanhando.',resp:'Pr. Marcos Lima',upd:'Atualizado há 5 dias'},
 {id:'u3',who:'Joana Ribeiro',kind:'Visita',tone:'oceano',d:'12/09/2026',txt:'Mora sozinha e pediu visita depois da alta médica. Prefere as manhãs.',resp:'Diac. Ana Costa',upd:'Atualizado há 1 semana'}];
S.urgOpen='u1';
V.urgentes=()=>({sb:'var(--ink)',tabs:'mais',html:`${subHead('Acompanhamentos','Casos que você acompanha, urgentes primeiro. Para editar, agendar ou encerrar, use o painel web.')}
 <div class="pad stack g5" style="padding-top:8px">
  <div class="chlist">${URG.map(u=>{const o=S.urgOpen===u.id;return `<div class="urg ${o?'open':''}"><button class="urg-h" data-a="urgToggle" data-v="${u.id}" aria-expanded="${o}"><span class="chdot" style="background:${MK[u.tone]||'var(--ink-muted)'}"></span><span class="grow stack" style="gap:2px"><span class="chn" style="font-size:22px;line-height:26px">${u.who}</span><span class="chm">${u.kind} · ${u.d}</span></span><span class="chev acc-c">${ic('chevR',18,2)}</span></button>
   ${o?`<div class="urg-b"><p class="body" style="color:var(--ink);margin:0">${esc(u.txt)}</p><div class="stack" style="gap:2px"><span class="chm">Responsável: <b style="color:var(--ink)">${u.resp}</b></span><span class="foot">${u.upd}</span></div><button class="btn outline md" style="align-self:flex-start" data-a="admin">Abrir no painel</button></div>`:''}</div>`;}).join('')}</div>
  <p class="foot" style="margin:0;text-align:center">Só líderes e administradores veem esta lista.</p>
 </div>`});
A.urgToggle=v=>{S.urgOpen=S.urgOpen===v?null:v;softRender();};
RAIL.push(['urgentes','Liderança › Acompanhamentos']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
$('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.dataset.s==='urgentes'&&!['lider','admin'].includes(S.role)){S.role='lider';}},true);


/* ================= Escala › presença no dia (o check-in da pessoa já é Presente) ================= */
S.escalas.unshift({id:'s0',min:'Louvor',area:'Ministério de Louvor',fn:'Vocal',y:2026,m:9,d:29,h:'20h',st:'confirmado',what:'Ensaio do Louvor',place:'Templo principal'});
S.svc={now:18*60+40,leader:'Daniela Rocha',
 team:[{n:'Rafael Pereira',fn:'Vocal',me:true},{n:'Elisa Moura',fn:'Vocal',ck:{at:'18h22'},pr:'ok'},{n:'Diego Faria',fn:'Bateria',ck:{at:'18h31'},pr:'ok'},{n:'Igor Santana',fn:'Baixo'},{n:'Clara Nunes',fn:'Teclado',ck:{at:'18h05'},pr:'ok'}]};
const svcHM=m=>`${Math.floor(m/60)}h${String(m%60).padStart(2,'0')}`.replace('h00','h');
const svcEsc=()=>S.escalas.find(x=>x.id==='s0');
const svcWin=()=>{const st=20*60;return {open:st-120,start:st,close:st+120};};
const svcPhase=()=>{const w=svcWin(),n=S.svc.now;return n<w.open?'antes':n>w.close?'fim':'aberto';};
const svcMe=()=>S.svc.team.find(p=>p.me);
const svcOf=p=>p.pr==='ok'?'ok':p.pr==='falta'?'falta':'pend';
function svcStatus(){const x=svcEsc(),me=svcMe(),ph=svcPhase(),w=svcWin(),k=svcOf(me);
 if(!x||x.st==='recusado')return null;
 if(x.st==='pendente')return {k:'conf',t:'Aceite a escala para liberar o check-in',s:'O check-in abre às '+svcHM(w.open)+', 2h antes.',btn:['Aceitar escala','escalaOk','s0']};
 if(k==='ok')return {k:'ok',t:'Você está presente',s:me.manual?'Marcada por '+S.svc.leader.split(' ')[0]+(me.why?' · '+me.why:''):'Check-in às '+me.ck.at};
 if(k==='falta')return {k:'falta',t:'Ausência registrada',s:'Se você esteve lá, fale com '+S.svc.leader.split(' ')[0]+' para corrigir.',btn:['Falar com o líder','svcTalk','']};
 if(ph==='antes')return {k:'antes',t:'Check-in abre às '+svcHM(w.open),s:'Faltam '+svcHM(w.open-S.svc.now).replace('h',' h ').replace(/ $/,'')+'.'};
 if(ph==='fim')return {k:'fim',t:'Check-in encerrado às '+svcHM(w.close),s:'Se você esteve lá, avise '+S.svc.leader.split(' ')[0]+': o líder pode marcar sua presença.',btn:['Avisar o líder','svcTalk','']};
 return {k:'aberto',t:'Check-in aberto até '+svcHM(w.close),s:'Toque para registrar sua presença.',btn:['Fazer check-in','svcStart','']};}
function svcBox(compact){const st=svcStatus();if(!st)return '';const x=svcEsc();
 return `<div class="svc-box ${st.k}"><div class="row g3" style="align-items:center"><span class="svc-ic">${ic(st.k==='ok'?'check':st.k==='falta'?'x':st.k==='conf'?'alert':'pin',18,2.2)}</span><div class="grow stack" style="gap:2px"><span class="svc-t">${st.t}</span><span class="svc-s">${st.s}</span></div></div>${st.btn?`<button type="button" class="btn ${st.k==='aberto'||st.k==='conf'?'primary':'outline'} md block" data-a="${st.btn[1]}" data-v="${st.btn[2]}">${st.k==='aberto'?ic('pin',16,2.2):''}${st.btn[0]}</button>`:''}</div>`;}
function svcHome(){const x=svcEsc();if(!x||x.st==='recusado'||S.role==='visitante')return '';
 const lead=['lider','admin'].includes(S.role),team=S.svc.team,c=k=>team.filter(p=>svcOf(p)===k).length;
 return `<div class="pad" style="margin:-4px 0 22px"><section class="svc-card"><div class="row between" style="align-items:flex-start"><div class="stack" style="gap:3px"><span class="eb2" style="color:inherit;opacity:.8">Hoje você serve</span><span class="svc-h">${x.what}</span><span class="svc-m">${x.min} · ${x.fn} · ${x.h} · ${x.place}</span></div><span class="svc-day"><b>${x.d}</b>${MONTHS[x.m-1].slice(0,3)}</span></div>${svcBox()}</section>
  ${lead?`<button class="scard svc-lead" data-a="svcTeam" style="margin-top:12px"><span class="grow stack" style="gap:4px"><span class="eb2">Você lidera hoje</span><span class="chn" style="font-size:19px">Presença do time</span><span class="chm">${c('ok')} presentes · ${c('pend')} sem check-in</span></span><span class="ring sm" style="--p:${Math.round((c('ok'))/team.length*100)}"><span>${c('ok')}/${team.length}</span></span></button>`:''}</div>`;}
/* tela do líder */
V.svcTeam=()=>{const x=svcEsc(),t=S.svc.team,c=k=>t.filter(p=>svcOf(p)===k).length,ph=svcPhase(),w=svcWin();
 return {sb:'var(--ink)',html:`${subHead('Presença do time',`${x.what} · hoje, ${x.h} · ${x.place}`)}
 <div class="pad stack g5" style="padding-bottom:40px">
  <div class="svc-sum ${ph}"><div class="row g4" style="align-items:center"><span class="ring" style="--p:${Math.round(c('ok')/t.length*100)}"><span><b style="font:700 20px/1 var(--font-display)">${c('ok')}</b><small style="display:block;font-size:10px;opacity:.7">de ${t.length}</small></span></span>
   <div class="grow stack" style="gap:6px"><span class="it-title">${ph==='antes'?'Check-in abre às '+svcHM(w.open):ph==='fim'?'Check-in encerrado às '+svcHM(w.close):'Check-in aberto até '+svcHM(w.close)}</span><div class="svc-cn"><span><b>${c('pend')}</b> sem check-in</span>${c('falta')?`<span class="falta"><b>${c('falta')}</b> ausente${c('falta')===1?'':'s'}</span>`:''}</div></div></div>
   </div>
  <div class="stack g3"><p class="eb2">Time</p><div class="svc-list">${t.map((p,i)=>{const k=svcOf(p);return `<div class="svc-row ${k}">${pavM(p.n,['ceu','menta','lima','damasco','vinho'][i%5],'','width:40px;height:40px;font-size:13px')}
   <div class="grow stack" style="gap:2px;min-width:0"><span class="it-title">${esc(p.n.split(' ')[0])}${p.me?' <span class="it-sub">· você</span>':' '+esc(p.n.split(' ').slice(1).join(' '))}</span><span class="it-sub">${p.fn} · ${k==='ok'?(p.manual?'marcado por você'+(p.why?' · '+p.why:''):'presente · check-in '+p.ck.at):k==='falta'?'ausente':'sem check-in'}</span></div>
   ${k==='pend'?'':status(k==='ok'?'success':'danger',k==='ok'?'Presente':'Ausente')}<button type="button" class="svc-more" data-a="svcPend" data-v="${i}" aria-label="Opções para ${esc(p.n)}">${ic('dots',18,2)}</button></div>`;}).join('')}</div></div>
  <p class="foot" style="text-align:center">O check-in da pessoa já a deixa presente. Quem esqueceu, você marca aqui.</p></div>`};};
APP.push('svcTeam');SUBS.push('svcTeam');
Object.assign(A,{
 svcStart:async(v,el)=>{const ph=svcPhase();if(ph!=='aberto'){toast('error',ph==='antes'?'O check-in ainda não abriu':'O check-in já encerrou',ph==='antes'?'Abre às '+svcHM(svcWin().open)+'.':'Fale com o líder para marcar sua presença.');return;}const m=svcMe();if(el)await busy(el,600,null,'Presente');m.ck={at:svcHM(S.svc.now)};m.pr='ok';softRender();toast('success','Check-in feito às '+m.ck.at,'Você está presente. Bom serviço!');},
 svcTalk:async(v,el)=>{if(el)await busy(el,600,null,'Avisado');toast('success','Aviso enviado para '+S.svc.leader.split(' ')[0],'Ela pode marcar sua presença pelo app.');},
 svcTeam:()=>go('svcTeam'),
 svcUndo:v=>{const p=S.svc.team[+v],o={pr:p.pr,manual:p.manual,why:p.why};delete p.pr;delete p.manual;delete p.why;softRender();toast('info','Presença reaberta',p.n.split(' ')[0]+' volta para “sem check-in”.');},
 svcPend:v=>{const p=S.svc.team[+v],f=p.n.split(' ')[0],w=svcWin(),pre=S.svc.now<w.start,k=svcOf(p);
  sheet(`<div class="stack g5"><div class="stack g2"><h3 class="t2">${esc(p.n)}</h3><p class="callout">${k==='pend'?'Ainda não fez check-in.':k==='ok'?'Está presente.':'Está ausente.'}</p></div>
   ${k==='ok'?'':`<div class="stack g2"><span class="eb2">Motivo <small>opcional</small></span><div class="row g2" style="flex-wrap:wrap" id="svW">${['Esqueceu o celular','Sem internet','Chegou depois'].map(w=>`<button type="button" class="chip" aria-pressed="false" data-v="${w}">${w}</button>`).join('')}</div></div>`}
   <div class="stack g3">${k==='ok'?'':`<button type="button" class="btn primary block" id="svMan">Marcar presente</button>`}${k==='falta'?'':`<button type="button" class="btn outline block" id="svF" ${pre&&k==='pend'?'disabled':''}>Ausente</button>`}${k==='pend'?'':`<button type="button" class="btn outline block" id="svU">Desfazer</button>`}${pre&&k==='pend'?`<p class="foot" style="text-align:center;margin-top:-4px">Ausente só pode ser marcado depois do início (${svcHM(w.start)}).</p>`:''}<button type="button" class="tlink" data-a="closeSheet">Voltar</button></div></div>`,sh=>{
   let why='';const W=$('#svW',sh);if(W)W.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const on=b.getAttribute('aria-pressed')==='true';$$('#svW button',sh).forEach(z=>z.setAttribute('aria-pressed',z===b&&!on));why=on?'':b.dataset.v;});
   const man=$('#svMan',sh);if(man)man.addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Marcado');Object.assign(p,{pr:'ok',manual:true,why});await closeSheet();softRender();toast('success',f+' marcado(a) como presente',why||undefined);});
   const fa=$('#svF',sh);if(fa)fa.addEventListener('click',async e=>{await busy(e.currentTarget,600,null,'Marcado');delete p.manual;delete p.why;p.pr='falta';await closeSheet();softRender();toast('info',f+' marcado(a) como ausente','Dá para desfazer na lista.');});
   const un=$('#svU',sh);if(un)un.addEventListener('click',async()=>{await closeSheet();A.svcUndo(v);});});},
});
/* rail: simulação de horário */
(function(){const nav=$('#demoUsers');if(!nav)return;const sec=nav.closest('.rail-sec');const box=document.createElement('div');box.className='rail-sec';
 box.innerHTML=`<span class="rail-lbl">Check-in de escala · horário</span><div class="rail-chips" id="svcT">${[[16*60+30,'16h30 · antes'],[18*60+40,'18h40 · aberto'],[20*60+25,'20h25 · durante'],[22*60+30,'22h30 · encerrado']].map(t=>`<button type="button" data-v="${t[0]}" aria-pressed="${S.svc.now===t[0]}">${t[1]}</button>`).join('')}</div>`;
 sec.parentNode.insertBefore(box,sec);
 const clock=()=>{const s=$('.statusbar span');if(s)s.textContent=Math.floor(S.svc.now/60)+':'+String(S.svc.now%60).padStart(2,'0');};clock();
 $('#svcT').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.svc.now=+b.dataset.v;$$('#svcT button').forEach(x=>x.setAttribute('aria-pressed',x===b));clock();if(['home','agenda','svcTeam'].includes(S.screen))softRender();});
 RAIL.push(['svcTeam','Líder › Presença do time']);$('#railNav').innerHTML=RAIL.map(r=>`<button type="button" data-s="${r[0]}">${r[1]}</button>`).join('');
 $('#railNav').addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.dataset.s==='svcTeam'&&!['lider','admin'].includes(S.role)){S.role='lider';}},true);
})();


