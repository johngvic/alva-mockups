/* ================= Cuidado › Pedidos de oração ================= */
let _pid=0;
const PR=(n,text,when,count,o={})=>({id:'p'+(++_pid),n,text,when,count,tone:o.tone||TONES[_pid%6],mine:!!o.mine,st:o.st||'ativo',priv:!!o.priv,who:o.who||[]});
const PRAYERS=[
 PR('Alícia Mendes','Cura e restauração da saúde da minha mãe.',0,12,{mine:true,tone:'rosado',who:['ceu','lima','menta']}),
 PR('Samuel Torres','Sabedoria e direção para mudança de carreira.',1,8,{tone:'ceu',who:['damasco','salvia']}),
 PR('Beatriz Lima','Reconciliação com meu irmão.',2,15,{tone:'lima',priv:true,who:['rosado','ceu','menta']}),
 PR('Fernando Dias','Aprovação no concurso público.',3,6,{tone:'damasco',who:['salvia','lima']}),
 PR('Carla Souza','Um emprego novo depois de meses procurando.',21,19,{tone:'menta',st:'respondido',who:['ceu','rosado','damasco']}),
];
Object.assign(S,{pf:'ativo'});
const whenL=n=>n===0?'Hoje':n===1?'Ontem':`${n} dias atrás`;
function prayerList(){
 const act=PRAYERS.filter(p=>p.st==='ativo'),conf=act.reduce((a,p)=>a+p.count,0),mine=act.filter(p=>p.mine).length;
 const l=PRAYERS.filter(p=>S.pf==='todos'||p.st===S.pf||(S.pf==='pend'&&p.st==='ativo'&&!p.mine));
 return `<header class="ph rise"><div><p class="eb">Cuidado</p><h1>Pedidos de oração</h1><p class="lede">Pedidos enviados pelos membros pelo app</p></div>
  <div class="pact">${rpBtn('oracao','pedidos')}</div></header>
 <section class="card kpis4 k3 rise" style="--d:1">
  <div class="k4"><span class="kl">Pedidos ativos</span><span class="kv">${act.length}</span><span class="kd">${PRAYERS.filter(p=>p.st==='respondido').length} respondido${PRAYERS.filter(p=>p.st==='respondido').length>1?'s':''}</span></div>
  <div class="k4"><span class="kl">Pessoas orando</span><span class="kv">${conf}</span><span class="kd">confirmações “estou orando”</span></div>
  <div class="k4"><span class="kl">Você está orando</span><span class="kv">${mine}<small class="kof"> de ${act.length}</small></span><span class="kmeter"><i style="width:${act.length?Math.round(mine/act.length*100):0}%"></i></span></div>
 </section>
 <div class="chips rise" style="--d:2">${[['ativo','Ativos',act.length],['pend','Sem sua oração',act.filter(p=>!p.mine).length],['respondido','Respondidos',PRAYERS.filter(p=>p.st==='respondido').length],['todos','Todos',PRAYERS.length]].map(c=>`<button class="chipf ${S.pf===c[0]?'on':''}" data-a="pFilter" data-v="${c[0]}">${c[1]}<small>${c[2]}</small></button>`).join('')}</div>
 <div class="pgrid2 rise" style="--d:3">${l.length?l.map(pCard).join(''):`<div class="card mempty" style="grid-column:1/-1"><p>Você está orando por todos.</p><span>Nenhum pedido esperando sua oração.</span></div>`}</div>`;
}
function pCard(p){
 return `<article class="card prc ${p.st}" id="${p.id}">
  <div class="pr1"><span class="av" style="background:var(--tone-${p.tone});color:var(--tone-${p.tone}-ink)">${initials(p.n)}</span><div class="prn"><b>${esc(p.n)}</b><span>${whenL(p.when)}${p.priv?` · <span class="crestr">${ic('lock',11,2.2)}Pedido anônimo</span>`:''}</span></div>
   <div style="position:relative;margin-left:auto"><button class="ibtn sm" data-a="pMenu" data-v="${p.id}" aria-label="Ações">${ic('dots',15)}</button><div class="pop" id="pPop-${p.id}" style="right:0;top:calc(100% + 4px)">${p.st==='ativo'?`<button class="pi" data-a="pAnswer" data-v="${p.id}">${ic('check',16)}Marcar como respondido</button>`:`<button class="pi" data-a="pReopen" data-v="${p.id}">${ic('swap',16)}Reabrir pedido</button>`}<hr><button class="pi danger" data-a="pDel" data-v="${p.id}">${ic('x',16)}Excluir pedido</button></div></div></div>
  <blockquote class="prq">${esc(p.text)}</blockquote>
  <div class="pr3"><span class="prw"><span class="stack sm">${p.who.map(t=>`<span class="av" style="background:var(--tone-${t});color:var(--tone-${t}-ink)"></span>`).join('')}${p.mine?'<span class="av" style="background:var(--brand);color:var(--on-brand)">RP</span>':''}</span><span><b>${p.count}</b> orando</span></span>
   ${p.st==='respondido'?`<span class="stp" style="--c:var(--st-int);--b:var(--st-int-bg)"><i></i>Oração respondida</span>`:`<button class="btn ${p.mine?'sec on':'pri'} sm pray" data-a="pPray" data-v="${p.id}" aria-pressed="${p.mine}">${p.mine?`${ic('check',14,2.4)}Você está orando`:`${ic('hands',15)}Estou orando`}</button>`}</div>
  ${p.mine&&p.st==='ativo'?`<p class="prnote">${ic('bell',13)}${p.n.split(' ')[0]} foi avisada que você está orando</p>`.replace('avisada',p.n.split(' ')[0].endsWith('a')?'avisada':'avisado'):''}
 </article>`;
}
function cuidadoAfter(){
 if(S.case){caseAfter();return;}
 const q=$('#cq');if(q)q.addEventListener('input',e=>{S.cq=e.target.value;$('#crows').innerHTML=cRows();});
}
const CA={
 cexpMenu:()=>{const p=$('#cexpPop');closePops(p);p.classList.toggle('open');},
 pexpMenu:()=>{const p=$('#pexpPop');closePops(p);p.classList.toggle('open');},
 cFilter:v=>{S.cf=v;$$('.chipf[data-a=cFilter]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#crows').innerHTML=cRows();},
 cAddJ:()=>dTrailPick(cById(S.case),undefined,cRe),
 cJSwap:v=>dTrailPick(cById(S.case),+v,cRe),
 cJDel:v=>{const c=cById(S.case),r=dTrail(c)[+v],t=c.trail[+v];confirmDel({title:'Remover este item da trilha?',body:`“${esc(r.n)}” sai da trilha de ${esc(first(c))}. O conteúdo continua existindo em Conteúdo.`,label:'Remover',onConfirm:()=>{c.trail.splice(+v,1);cRe();toast('Item removido da trilha',()=>{c.trail.splice(+v,0,t);cRe();});}});},
 cJGo:v=>{const c=cById(S.case),t=(dTrail(c),c.trail[+v]);if(t.k&&t.k!=='Jornada'){S.case=null;A.nav(MC_PAGE[t.k]);return;}S.jor=t.id;S.jtab='trilha';S.active='jornadas';S.case=null;render();window.scrollTo({top:0});},
 cOpen:v=>{S.careTab='details';S.case=v;render();window.scrollTo({top:0});},
 cBack:()=>{S.case=null;render();},
 cMenu:()=>{const p=$('#cPop');closePops(p);p.classList.toggle('open');},
 cReg:v=>{const c=cById(v);openDlg(`${dlgHead('Registrar encontro',`Caso de ${esc(c.n)}. Para um encontro que já aconteceu e não foi agendado.`)}<form id="crgF" class="fgrid one" novalidate><label class="fld"><span class="fl">Data</span><input type="date" name="d" value="${TODAY.toISOString().slice(0,10)}" max="${TODAY.toISOString().slice(0,10)}"><span class="err"></span></label><label class="fld"><span class="fl">O que foi tratado?</span><textarea class="ta" name="t" rows="4" placeholder="Resumo do encontro. Só quem vê o caso tem acesso."></textarea><span class="err"></span></label><label class="fld wide"><span class="fl">Resultado / próximos passos <small>opcional</small></span><textarea class="ta" name="result" rows="2" placeholder="Encaminhamentos e próximos passos"></textarea></label><label class="fld wide"><span class="fl">Material de apoio <small>opcional</small></span>${atomSel('')}</label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Registrar</button></div></form>`);
  const f=$('#crgF');f.addEventListener('input',e=>e.target.closest('.fld')?.classList.remove('bad'));f.addEventListener('submit',e=>{e.preventDefault();const t=f.t.value.trim(),d=f.d.value;const bad=(n,m)=>{const i=f[n];i.closest('.fld').classList.add('bad');i.closest('.fld').querySelector('.err').textContent=m;};if(!d)return bad('d','Informe a data');if(d>TODAY.toISOString().slice(0,10))return bad('d','Para datas futuras, use Agendar');if(t.length<5)return bad('t','Conte o que foi tratado');const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{careInit(c);const m={d,t,result:f.elements.result.value.trim(),...atomPick(f.elements.mat.value),rid:'care'+(++careSequence)};c.meets.unshift(m);careLog(c,'Encontro registrado',t,m.rid);S.careTab='meetings';c.meets.sort((a,b)=>a.d<b.d?1:-1);closeDlg();cRe();toast('Encontro registrado');},500);});},
 cDel:v=>{closePops();const c=cById(v);setTimeout(()=>confirmDel({title:`Excluir o caso de ${c.n.split(' ')[0]}?`,body:`O caso será inativado: sai das listas, e o histórico e os ${c.meets.length} encontros registrados ficam guardados.`,label:'Excluir caso',onConfirm:()=>{CASES.splice(CASES.indexOf(c),1);S.case=null;render();toast('Caso excluído');}}),50);},
 cAdd:()=>{const cand=MEMBERS.filter(m=>m.tit),st={step:1,pm:null,type:'Visita',desc:'',resp:PASTORS[0][0],restr:'0',urg:false};
  openDlg(`${dlgHead('Adicionar caso','Uma situação que precisa de cuidado pastoral.')}<div class="ca-steps" id="caSt"></div><div id="caB"></div><div class="dfoot" id="caFt"></div>`,'lg ca-dlg');
  const paint=()=>{const m=st.pm&&byId(st.pm);
   $('#caSt').innerHTML=[['1','Pessoa e tipo'],['2','Detalhes']].map((z,i)=>`<span class="${st.step>i+1?'done':st.step===i+1?'on':''}"><i>${st.step>i+1?ic('check',11,3):z[0]}</i>${z[1]}</span>`).join('<b></b>');
   if(st.step===1){$('#caB').innerHTML=`<div class="ca-g"><div class="fld" id="caPm"><span class="fl">Quem precisa de cuidado?</span><label class="sbox" style="margin-bottom:8px">${ic('search',16)}<input id="caq" placeholder="Buscar membro" autocomplete="off"></label><div class="pick" id="capick" style="max-height:232px">${candList(cand,'')}</div><span class="err"></span></div>
     <div class="fld"><span class="fl">Tipo</span><div class="ca-types">${Object.keys(CTYPE).map(t=>`<label><input type="radio" name="catype" value="${t}" ${st.type===t?'checked':''}><span>${ic(CTYPE[t],16)}<b>${t}</b></span></label>`).join('')}</div></div></div>`;
    if(st.pm){const r=$(`#capick input[value="${st.pm}"]`);if(r)r.checked=true;}
    $('#caq').addEventListener('input',e=>{$('#capick').innerHTML=candList(cand,e.target.value);const r=st.pm&&$(`#capick input[value="${st.pm}"]`);if(r)r.checked=true;});
    $('#capick').addEventListener('change',e=>{st.pm=e.target.value;$('#caPm').classList.remove('bad');});
    $$('input[name=catype]').forEach(r=>r.addEventListener('change',()=>st.type=r.value));
    $('#caFt').innerHTML=`<button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="button" class="btn pri" id="caNx">Continuar</button>`;
    $('#caNx').onclick=()=>{if(!st.pm){$('#caPm').classList.add('bad');$('#caPm .err').textContent='Escolha quem precisa de cuidado';return;}st.step=2;paint();setTimeout(()=>$('#caD')?.focus(),40);};}
   else{$('#caB').innerHTML=`<div class="ca-who">${mav(m)}<span class="dkt"><b>${esc(m.n)}</b><span>${ic(CTYPE[st.type],13)} ${st.type}</span></span><button class="lnk" id="caEd">Trocar</button></div>
    <div class="ca-g"><label class="fld" style="grid-column:1/-1"><span class="fl">O que está acontecendo?</span><textarea class="ta" id="caD" rows="3" maxlength="400" placeholder="Situação e do que a pessoa precisa">${esc(st.desc)}</textarea><span class="err"></span></label>
     <label class="fld"><span class="fl">Responsável</span><span class="selw"><select id="caR">${PASTORS.map(p=>`<option ${st.resp===p[0]?'selected':''}>${p[0]}</option>`).join('')}</select>${ic('updown',14)}</span></label>
     <div class="fld"><span class="fl">Quem pode ver</span><div class="segc ca-vis" role="group"><button type="button" data-r="0" aria-pressed="${st.restr==='0'}">Todos os pastores</button><button type="button" data-r="1" aria-pressed="${st.restr==='1'}">${ic('lock',12,2.2)} Restrito</button></div><span class="hint" id="caVh">${st.restr==='1'?'Só o responsável e o Presbitério.':'Qualquer pastor do sistema.'}</span></div>
     <label class="tog" style="grid-column:1/-1"><input type="checkbox" id="caU" ${st.urg?'checked':''}><span class="sw"></span><span><b>Marcar como urgente</b><small>Aparece no topo da lista e no Dashboard</small></span></label></div>`;
    $('#caEd').onclick=()=>{st.desc=$('#caD').value;st.step=1;paint();};
    $('#caD').addEventListener('input',e=>{st.desc=e.target.value;e.target.closest('.fld').classList.remove('bad');});
    $('#caR').addEventListener('change',e=>st.resp=e.target.value);
    $('.ca-vis').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;st.restr=b.dataset.r;$$('.ca-vis button').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#caVh').textContent=st.restr==='1'?'Só o responsável e o Presbitério.':'Qualquer pastor do sistema.';});
    $('#caU').addEventListener('change',e=>st.urg=e.target.checked);
    $('#caFt').innerHTML=`<button type="button" class="btn sec" id="caBk">Voltar</button><button type="button" class="btn pri" id="caGo">Criar caso</button>`;
    $('#caBk').onclick=()=>{st.desc=$('#caD').value;st.step=1;paint();};
    $('#caGo').onclick=e=>{const d=st.desc.trim();if(d.length<10){const f=$('#caD').closest('.fld');f.classList.add('bad');f.querySelector('.err').textContent=d?'Conte um pouco mais':'Descreva a situação';return;}
     const b=e.currentTarget;b.classList.add('busy');setTimeout(()=>{const c=CS(m.n,st.urg?'urgente':'acompanhando',st.type,d,st.resp,{restr:st.restr==='1',tone:m.tone,opened:TODAY.toISOString().slice(0,10)});CASES.unshift(c);closeDlg();S.cf='ativos';S.case=c.id;render();window.scrollTo({top:0});toast(`Caso de ${m.n.split(' ')[0]} criado · ${st.resp} foi avisado`);},700);};}
  };paint();},
 pFilter:v=>{S.pf=v;render();},
 pMenu:v=>{const p=$('#pPop-'+v);closePops(p);p.classList.toggle('open');},
 pPray:(v,b)=>{const p=PRAYERS.find(x=>x.id===v);if(p.mine)return;p.mine=true;p.count+=1;const el=$('#'+v);el.outerHTML=pCard(p);$('#'+v).animate([{transform:'scale(.99)'},{transform:'none'}],{duration:260});
  toast(`${p.n.split(' ')[0]} vai saber que você está orando`);updPrayKpi();},
 pAnswer:v=>{closePops();const p=PRAYERS.find(x=>x.id===v);p.st='respondido';render();toast('Pedido marcado como respondido',()=>{p.st='ativo';render();});},
 pReopen:v=>{closePops();const p=PRAYERS.find(x=>x.id===v);p.st='ativo';render();toast('Pedido reaberto');},
 pDel:v=>{closePops();const p=PRAYERS.find(x=>x.id===v);confirmDel({title:'Excluir este pedido de oração?',body:`O pedido de ${p.n.split(' ')[0]} sai do app para todos. As ${p.count} pessoas que estavam orando deixam de vê-lo.`,label:'Excluir pedido',onConfirm:()=>{PRAYERS.splice(PRAYERS.indexOf(p),1);render();toast('Pedido excluído');}});},
};
function updPrayKpi(){const y=window.scrollY;const act=PRAYERS.filter(p=>p.st==='ativo');const k=$$('.kpis4 .k4');if(!k.length)return;
 k[1].querySelector('.kv').textContent=act.reduce((a,p)=>a+p.count,0);const mine=act.filter(p=>p.mine).length;k[2].querySelector('.kv').innerHTML=`${mine}<small class="kof"> de ${act.length}</small>`;k[2].querySelector('.kmeter i').style.width=Math.round(mine/act.length*100)+'%';window.scrollTo(0,y);}

Object.assign(CA,{
 cRenew:v=>A.cSched(S.case+'|renew:'+v),
 cSched:v0=>{const [v,rn0]=String(v0).split('|'),rn=rn0&&rn0.startsWith('renew:')?rn0.slice(6):null,c=cById(v),t=TODAY.toISOString().slice(0,10),Q=qdInit({start:addDays(7)}),qo={min:t,time:qdTime},rp=rn&&qdRenewPreset([...(c.sched||[]),...c.meets],rn);if(rp){Object.assign(Q,rp.q,{f:rp.m0.t||rp.m0.time||'19:30'});qdFix(Q);}openDlg(`${dlgHead(rp?'Renovar para '+rp.q.start.slice(0,4):'Agendar encontro',`Caso de ${esc(c.n)}. O que foi tratado você registra ao concluir.`)}
  <form class="fgrid" id="cschF" novalidate style="grid-template-columns:1fr 1fr">
   <div class="wide" id="qdW">${qdBlock(Q,qo)}</div>
   <div class="fld wide"><span class="fl">Modalidade</span><div class="yn" role="radiogroup" id="cmodeG"><label><input type="radio" name="mode" value="Presencial" checked><span>${ic('pin',15)}&nbsp;Presencial</span></label><label><input type="radio" name="mode" value="Remoto"><span>${ic('monitor',15)}&nbsp;Remoto</span></label></div></div>
   <label class="fld wide" id="cwhereF"><span class="fl">Local <small>opcional</small></span><input name="where" placeholder="Ex.: Gabinete pastoral, visita em casa"></label>
   <label class="fld wide" id="clinkF" hidden><span class="fl">Link da reunião <small>opcional</small></span><input name="link" type="url" placeholder="Meet, Teams, Zoom… pode preencher depois"><span class="err"></span></label>
   <label class="tog wide"><input type="checkbox" name="notify" checked><span class="sw"></span><span><b>Avisar ${esc(c.n.split(' ')[0])} no app</b><small>A pessoa confirma ou recusa em Agenda › Acompanhamento</small></span></label>
   <div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Agendar</button></div></form>`,'lg evs');
  $('#cmodeG').addEventListener('change',e=>{const r=e.target.value==='Remoto';$('#clinkF').hidden=!r;$('#cwhereF').hidden=r;});
  const f=$('#cschF');qdBind(f,Q,()=>{qdFix(Q);$('#qdBox').outerHTML=qdBlock(Q,qo);},t);
  f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),bad=(n,m)=>{const i=f.querySelector(`[name=${n}]`);i.closest('.fld').classList.add('bad');i.nextElementSibling.textContent=m;};
   const r=qdCheck(Q);if(r)return qdShowErr(f,r);if(Q.start<t)return bad('d','A data já passou');
   const lk=fd.get('link');if(lk&&!/^https?:\/\//.test(lk))return bad('link','Link inválido');
   const dates=evOccs(Q).filter(x=>!(c.sched||[]).some(m=>m.d===x&&m.t===Q.f));if(!dates.length)return bad('d','Já existe encontro neste horário');
   const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{c.sched=c.sched||[];careInit(c);const sid=Q.freq==='none'?'':'sr'+Date.now();let first;dates.forEach(x=>{const m={rid:'care'+(++careSequence),d:x,t:Q.f,mode:fd.get('mode'),where:fd.get('where'),link:lk};if(sid){m.ser=sid;m.rep=Q.freq;m.rdays=Q.days.slice();}c.sched.push(m);first=first||m;});if(rn)[...c.sched,...c.meets].forEach(m=>{if(m.ser===rn)m.renewed=true;});
    careLog(c,dates.length>1?'Encontros agendados':'Encontro agendado',dates.length>1?`${dates.length} datas, de ${fmtD(dates[0])} a ${fmtD(dates[dates.length-1])} · ${Q.f}`:`${fmtD(first.d)} · ${first.t}`,first.rid);S.careTab='meetings';c.sched.sort((a,b)=>a.d<b.d?-1:1);closeDlg();cRe();
    toast((dates.length>1?`${dates.length} encontros agendados a partir de ${wd(dates[0])}, ${fmtD(dates[0])}`:`Encontro agendado para ${wd(dates[0])}, ${fmtD(dates[0])} às ${Q.f}`)+(fd.get('notify')?` · ${c.n.split(' ')[0]} foi avisado(a)`:''));},700);});},
 cDone:v=>{const [id,i]=v.split('|'),c=cById(id),m=c.sched[+i];openDlg(`${dlgHead('Concluir encontro',`${esc(c.n)} · ${fmtD(m.d)} às ${m.t}`)}<form id="cdnF" class="fgrid one" novalidate><label class="fld"><span class="fl">O que foi tratado?</span><textarea class="ta" name="t" rows="4" placeholder="Resumo do encontro. Só quem vê o caso tem acesso."></textarea><span class="err"></span></label>
   <label class="fld wide"><span class="fl">Resultado / próximos passos <small>opcional</small></span><textarea class="ta" name="result" rows="2" placeholder="Encaminhamentos e próximos passos"></textarea></label><label class="fld wide"><span class="fl">Material de apoio <small>opcional</small></span>${atomSel('')}</label><div class="dfoot"><button type="button" class="btn sec" data-a="closeDlg">Cancelar</button><button type="submit" class="btn pri">Concluir</button></div></form>`,'sm');
  const f=$('#cdnF');f.addEventListener('submit',e=>{e.preventDefault();const t=f.t.value.trim();if(t.length<5){f.t.closest('.fld').classList.add('bad');f.t.nextElementSibling.textContent='Escreva um resumo do encontro';return;}const b=f.querySelector('[type=submit]');b.classList.add('busy');setTimeout(()=>{careInit(c);c.sched.splice(+i,1);c.meets.unshift({...m,time:m.t,t,result:f.elements.result.value.trim(),...atomPick(f.elements.mat.value)});careLog(c,'Encontro realizado',t,m.rid);S.careTab='meetings';closeDlg();cRe();toast('Encontro concluído e registrado');},500);});},
 cEdit:v=>{const [id,i]=v.split('|'),c=cById(id),m=c.sched[+i];if(!m)return;const fl=m.ser?c.sched.filter(x=>x.ser===m.ser&&x.d>m.d):[];
  qdEditDlg({title:'Editar encontro',sub:'Caso de '+esc(c.n)+' · '+wd(m.d)+', '+fmtD(m.d),vals:{d:m.d,t:m.t,mode:m.mode,where:m.where||'',url:m.link||''},n:fl.length,wherePh:'Ex.: Gabinete pastoral, visita em casa',
   check:q=>c.sched.some(x=>x!==m&&x.d===q.d&&x.t===q.t)?['d','Já existe encontro neste horário']:null,
   run:(q,nx)=>{careInit(c);const tg=nx?[m,...fl]:[m],old=fmtD(m.d)+' · '+m.t;tg.forEach(x=>{x.t=q.t;x.mode=q.mode;x.where=q.where;x.link=q.url;if(x===m)x.d=q.d;});c.sched.sort((a,b)=>a.d<b.d?-1:1);careLog(c,'Encontro alterado',old+' → '+fmtD(m.d)+' · '+m.t+(tg.length>1?' · e os próximos':''),m.rid);cRe();toast((tg.length>1?tg.length+' encontros atualizados':'Encontro atualizado')+' · '+c.n.split(' ')[0]+' foi avisado(a)');}});},
 cUnsched:v=>{const [id,i]=v.split('|'),c=cById(id),m=c.sched[+i];
  if(m.ser){const fl=c.sched.filter(x=>x.ser===m.ser&&x.d>m.d);if(fl.length)return qdScope({title:'Cancelar encontro?',sub:esc(c.n)+' · '+wd(m.d)+', '+fmtD(m.d),body:esc(c.n)+' recebe o aviso do cancelamento.',label:'Cancelar encontro',danger:1,n:fl.length,run:nx=>{careInit(c);const gone=nx?[m,...fl]:[m];gone.forEach(g=>{const j=c.sched.indexOf(g);if(j>=0)c.sched.splice(j,1);c.cancelled.push(g);careLog(c,'Encontro cancelado',fmtD(g.d)+' · '+g.t,g.rid);});cRe();toast(gone.length>1?gone.length+' encontros cancelados':'Encontro cancelado');}});}
  confirmDel({title:'Cancelar este encontro?',body:`${esc(c.n)} recebe o aviso de que o encontro de ${fmtD(m.d)} às ${m.t} foi cancelado.`,label:'Cancelar encontro',onConfirm:()=>{careInit(c);c.sched.splice(+i,1);c.cancelled.push(m);careLog(c,'Encontro cancelado',`${fmtD(m.d)} · ${m.t}`,m.rid);closeDlg();cRe();toast('Encontro cancelado',()=>{c.cancelled.splice(c.cancelled.indexOf(m),1);careLog(c,'Cancelamento desfeito',`${fmtD(m.d)} · ${m.t}`,m.rid);c.sched.splice(+i,0,m);closeDlg();cRe();});}});},
});

