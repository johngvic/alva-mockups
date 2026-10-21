/* ---------- Agenda: paginação em Eventos e Escalas, datas em previsão, casas no calendário e modal de música ---------- */

/* paginação que cabe na tela (lê as linhas do DOM, como em Lojas) */
const AGPG=[
 {key:'ev',root:()=>$('#erows'),noun:['item','itens'],sig:()=>[S.active,S.eq,S.ef,S.etype].join('|')},
 {key:'es',root:()=>{const q=$('#esq');return q?q.closest('.mtab'):null;},noun:['escala','escalas'],sig:()=>[S.esq,S.esf].join('|')}
];
function agPaginate(only){AGPG.forEach(c=>{if(only&&c.key!==only)return;const box=c.root();if(!box)return;const rows=[...box.querySelectorAll('.trow:not(.thead)')];if(!rows.length)return;
 const sig=c.sig()+'|'+rows.length;if(S['agsig_'+c.key]!==sig){S['agsig_'+c.key]=sig;S['agpg_'+c.key]=1;}
 rows.forEach(r=>r.style.display='');const rh=rows[0].offsetHeight||64,top=rows[0].getBoundingClientRect().top+window.scrollY;
 const pp=Math.max(4,Math.min(30,Math.floor((window.innerHeight-Math.min(top,window.innerHeight*.55)-52-28)/rh))),P=Math.max(1,Math.ceil(rows.length/pp));
 const cur=S['agpg_'+c.key]=Math.min(Math.max(1,S['agpg_'+c.key]||1),P);
 rows.forEach((r,i)=>{r.style.display=i>=(cur-1)*pp&&i<cur*pp?'':'none';});
 const n=[];for(let i=1;i<=P;i++){if(i===1||i===P||Math.abs(i-cur)<=1)n.push(i);else if(n[n.length-1]!=='…')n.push('…');}
 let f=box.querySelector(':scope > .tfoot');if(!f){f=document.createElement('div');f.className='tfoot';box.appendChild(f);}
 const mark=f.querySelector('.who'),extra=mark?mark.outerHTML:'';
 f.innerHTML=`<span>${P>1?`${(cur-1)*pp+1}–${Math.min(rows.length,cur*pp)} de ${rows.length} ${c.noun[1]}`:`${rows.length} ${rows.length===1?c.noun[0]:c.noun[1]}`}</span>${extra}${P>1?`<div class="mpg" role="navigation" aria-label="Páginas"><button class="ibtn sm" data-a="agPg" data-v="${c.key}|${cur-1}" ${cur===1?'disabled':''} aria-label="Página anterior">${ic('chevL',14,2)}</button>${n.map(i=>i==='…'?'<span class="mpg-e">…</span>':`<button class="mpg-n ${i===cur?'on':''}" data-a="agPg" data-v="${c.key}|${i}" aria-current="${i===cur?'page':'false'}">${i}</button>`).join('')}<button class="ibtn sm" data-a="agPg" data-v="${c.key}|${cur+1}" ${cur===P?'disabled':''} aria-label="Próxima página">${ic('chevR',14,2)}</button></div>`:''}`;});}
Object.assign(A,{agPg:v=>{const[k,n]=v.split('|');S['agpg_'+k]=+n;agPaginate(k);const c=AGPG.find(x=>x.key===k),b=c&&c.root();if(b)(b.closest('.mtab')||b).scrollIntoView({block:'nearest',behavior:'smooth'});}});
{const base=render;render=function(){const x=base.apply(this,arguments);requestAnimationFrame(()=>agPaginate());return x;};}
window.addEventListener('resize',()=>{clearTimeout(window._agT);window._agT=setTimeout(()=>agPaginate(),150);});
document.addEventListener('input',e=>{if(e.target&&(e.target.id==='eq'||e.target.id==='esq'))requestAnimationFrame(()=>agPaginate());});

/* ---------- Calendário: encontros das casas junto dos eventos, na mesma lista ---------- */
function agHouseList(){const month=S.calM||'2026-10';return CASAS.filter(c=>c.ppl.some(p=>p.n===ME.n)||c===CASAS[0]).flatMap(c=>c.meets.filter(m=>m.scheduled&&!m.cancelled&&!m.done&&m.d.startsWith(month)&&(!S.calSel||S.calSel===m.d)).map(m=>({c,m})));}
const agHouseRow=({c,m})=>`<button class="dk" data-a="nxHouseOpen" data-v="${c.id}|${m.id}"><span class="edt"><small>${wd(m.d)}</small><b>${+m.d.slice(8)}</b><small>${MONTHS[+m.d.slice(5,7)-1].slice(0,3)}</small></span><span class="dkt"><b>${esc(c.n)}</b><span>${m.start}${m.end?'–'+m.end:''} · ${m.mode}</span></span><span class="stp" style="--c:var(--brand-text);--b:var(--brand-soft)"><i></i>Casa</span></button>`;
nxHouseAgenda=function(){return '';};
{const b=calGrid;calGrid=function(){const h=b.apply(this,arguments),hs=agHouseList();if(!hs.length)return h;
 const sel=S.calSel&&S.calSel.startsWith(S.calM)?S.calSel:null,evs=sel?EVTS.filter(e=>e.d===sel):EVTS.filter(e=>e.d&&e.d.startsWith(S.calM));
 const items=[...evs.map(e=>({d:e.d,h:`<button class="dk" data-a="evOpen" data-v="${e.id}">${dTile(e)}<span class="dkt"><b>${esc(e.t)}</b><span>${e.time} · ${esc(e.place)}</span></span>${tTag(e.type)}</button>`})),...hs.map(x=>({d:x.m.d,h:agHouseRow(x)}))].sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0);
 const list=`<div class="clist">${items.map(x=>x.h).join('')}</div>`;
 return h.includes('<div class="clist">')?h.replace(/<div class="clist">[\s\S]*?<\/div>/,list):h.replace('<p class="who" style="margin:0">Nada marcado.</p>',list);};}
{const b=myAgenda;myAgenda=function(){const h=b.apply(this,arguments),hs=agHouseList();if(!hs.length)return h;
 return h.replace('</section>',`<p class="fl" style="margin:16px 0 8px">Encontros das suas casas</p><div class="clist">${hs.map(agHouseRow).join('')}</div></section>`);};}

/* ---------- Música: seletor de tom em grade e alternância maior/menor ---------- */
{const o=sgForm;sgForm=function(){o.apply(this,arguments);const f=$('#sgF');if(!f)return;f.classList.add('sg-form');f.querySelectorAll('.ct-keys button.sh').forEach(b=>{b.classList.remove('sh');b.classList.add('sk');});
 const lab=f.querySelector('.ct-min2');if(lab){const cb=lab.querySelector('input'),seg=document.createElement('div');seg.className='cm-q sg-mode';
  seg.innerHTML=`<button type="button" data-m="0" class="${cb.checked?'':'on'}">Maior</button><button type="button" data-m="1" class="${cb.checked?'on':''}">Menor</button>`;
  seg.onclick=e=>{const b=e.target.closest('button');if(!b)return;cb.checked=b.dataset.m==='1';cb.dispatchEvent(new Event('change',{bubbles:true}));seg.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));};
  lab.style.display='none';lab.closest('.fld').querySelector('.fl').after(seg);}
 };}
