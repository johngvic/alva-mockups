const A={
 nav:v=>{S.active=v;S.navOpen={};S.sala=null;S.slTab='dados';S.uEd=null;S.chp=null;S.chpEd=null;S.case=null;S.member=null;S.integ=null;S.disc=null;S.casa=null;S.chamada=null;S.mini=null;S.user=null;S.evt=null;S.bbd=null;S.esc=null;S.preg=null;S.mat=null;S.camp=null;S.jor=null;S.cur=null;S.pw=null;closePops();$('#side').classList.remove('open');render();window.scrollTo({top:0});},
 churchMenu:(v,b)=>{const p=$('#churchPop');closePops(p);p.classList.toggle('open');b.setAttribute('aria-expanded',p.classList.contains('open'));},
 setChurch:v=>{S.church=+v;softSide();toast(`Agora em ${CHURCHES[S.church].n}`);},
 meMenu:()=>{const p=$('#mePop');closePops(p);p.classList.toggle('open');},
 theme:v=>{S.theme=v;try{localStorage.setItem('alva-web-theme',v);}catch(e){}document.documentElement.dataset.theme=v;$$('#mePop .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));},
 soon:v=>{closePops();toast(`${v}: em breve no protótipo`);},
 openMobile:()=>{closePops();window.open(window.ALVA_MOBILE_URL||'https://claude.ai/artifact/NPBFaCUv4QQvtrKt9YsSxU','_blank','noopener');},
 logout:()=>{closePops();S.auth='login';S.authErr=0;render();window.scrollTo({top:0});},
 cmd:()=>cmdOpen(),
 side:()=>$('#side').classList.add('open'),
 navToggle:v=>{const t=$(`.ni.par[data-v=${v}]`).closest('.ntree');const open=!t.classList.contains('open');if(open)$$('.ntree.open').forEach(o=>{if(o===t)return;const k=o.querySelector('.par').dataset.v;S.navOpen[k]=false;o.classList.remove('open');o.querySelector('.par').setAttribute('aria-expanded',false);if(k==='pessoas'&&!TASKS[0].done&&!o.querySelector('.par .cnt'))o.querySelector('.par .chev').insertAdjacentHTML('beforebegin',cntBadge());});S.navOpen[v]=open;t.classList.toggle('open',open);t.querySelector('.par').setAttribute('aria-expanded',open);const cb=t.querySelector('.par .cnt');if(open&&cb)cb.remove();else if(!open&&!cb&&!TASKS[0].done&&v==='pessoas')t.querySelector('.par .chev').insertAdjacentHTML('beforebegin',cntBadge());},
 closeSide:()=>$('#side').classList.remove('open'),
 done:v=>{setDone(v,true);const lab={t1:'Acolhimento',t2:'Escalas'}[v];toast(`${lab} marcado como resolvido`,()=>setDone(v,false));},
 undoAll:()=>TASKS.forEach(t=>t.done&&setDone(t.id,false)),
 goTask:v=>{const t=TASKS.find(x=>x.id===v);A.nav(t.area);},
 remind:(v,b)=>busy(b,1100,'Enviado',()=>toast('Lembrete enviado para Bruno, Clara, Diego e Elisa')),
 team:v=>toast(`Escala de ${v}: detalhes em breve`),
 event:v=>toast(`${NEXT[v].t}: detalhes em breve`),
 day:v=>{S.day=+v;$$('.day').forEach((d,i)=>d.setAttribute('aria-pressed',i===S.day));const n=$('#daynote');n.innerHTML=dayNote();n.animate([{opacity:0,transform:'translateY(3px)'},{opacity:1,transform:'none'}],{duration:260});},
 range:v=>{if(S.range===v)return;S.range=v;$$('.segc button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));$('#chart').innerHTML=chartSVG();bindChart();$('.kpi .kd.up').textContent=v==='12s'?'+14 no período':'+20 no período';},
 bday:(v,b)=>{const x=BDAYS[+v];if(x.sent){toast(`Você já felicitou ${x[0].n.split(' ')[0]}`);return;}x.sent=true;b.classList.add('sent');toast(`Felicitação enviada para ${x[0].n.split(' ')[0]}`,()=>{x.sent=false;b.classList.remove('sent');});},
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');
 if(!e.target.closest('.pop')&&!(b&&/Menu$/.test(b.dataset.a)))closePops();
 if(e.target.closest('.veil'))$('#side').classList.remove('open');
 if(b&&A[b.dataset.a]&&!b.disabled){A[b.dataset.a](b.dataset.v,b,e);}
});
document.addEventListener('keydown',e=>{
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#scrim').classList.contains('open')?cmdClose():cmdOpen();return;}
 if(e.key==='Escape'){cmdClose();closePops();closeDlg();$('#side').classList.remove('open');}
 if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&$('#mq')){e.preventDefault();$('#mq').focus();}
 if(e.key==='Enter'&&document.activeElement.classList.contains('mrow')){PA.open(document.activeElement.dataset.v);}
 if($('#scrim').classList.contains('open')){if(e.key==='ArrowDown'){e.preventDefault();cmdMove(1);}if(e.key==='ArrowUp'){e.preventDefault();cmdMove(-1);}if(e.key==='Enter'){e.preventDefault();cmdPick(sel);}}
});
$('#q').addEventListener('input',e=>cmdList(e.target.value));
$('#res').addEventListener('click',e=>{const b=e.target.closest('.ri');if(b)cmdPick(+b.dataset.i);});
$('#res').addEventListener('mousemove',e=>{const b=e.target.closest('.ri');if(b&&+b.dataset.i!==sel){sel=+b.dataset.i;$$('.ri').forEach(x=>x.classList.toggle('sel',x===b));}});
$('#scrim').addEventListener('click',e=>{if(e.target.id==='scrim')cmdClose();});
